
HSCJApiReceiver.debug = function (msg) {
    LogUtils.log(msg,"Background.HSCJApiReceiver");
};

/* pluginRequestId : chromeRequestId */
HSCJApiReceiver.requestIdMapper = new Map();
/* chromeRequestId:{pluginRequestId,timestamp} */
HSCJApiReceiver.reverseIdMapper = new Map();

HSCJApiReceiver.lastAutoDelTime = 0;

HSCJApiReceiver.markPluginRequestInfo = function (pluginRequestId, chromeRequestId, url, isOfflineRequest){
    const now = new Date().getTime();
    HSCJApiReceiver.requestIdMapper[pluginRequestId] = chromeRequestId;
    HSCJApiReceiver.reverseIdMapper[chromeRequestId] = {
        pluginRequestId:pluginRequestId,
        timestamp      : now,
        url            : url,
        offline        : isOfflineRequest
    };

    const lastAutoDelTime = HSCJApiReceiver.lastAutoDelTime ?? 0;
    if(now - lastAutoDelTime<30000){
        return;
    }
    HSCJApiReceiver.lastAutoDelTime = now;

    Object.keys(HSCJApiReceiver.reverseIdMapper).forEach((value, index, array) => {
       const reverseInfo = HSCJApiReceiver.reverseIdMapper[value];
       if(FunctionUtils.isNull(reverseInfo)) return;
       if(now - reverseInfo.timestamp >60000){
           delete HSCJApiReceiver.reverseIdMapper[value];
       }
    });
};

HSCJApiReceiver.getPluginRequestId = function (chromeRequestId) {
    return HSCJApiReceiver.reverseIdMapper[chromeRequestId]?.pluginRequestId;
};

HSCJApiReceiver.getPluginRequestUrl = function (chromeRequestId) {
    return HSCJApiReceiver.reverseIdMapper[chromeRequestId]?.url;
};

HSCJApiReceiver.isRequestOffline    = function (chromeRequestId) {
    return HSCJApiReceiver.reverseIdMapper[chromeRequestId]?.offline === true;
};

HSCJApiReceiver.handleNetworkEvent          = async function (debuggee, method, params){
    if(!method?.startsWith("N")) return false;
    const debugUrl =  params?.request?.url ?? params?.response?.url ?? HSCJApiReceiver.getPluginRequestUrl(params.requestId) ?? "";
    /*alert("handleNetworkEvent => "+JSON.stringify({method,params}));/**/
    /* stylesheet:css script:js document:html image:img other:other */
    const type = (params?.type??params?.initiator?.type)?.toLowerCase()?.trim()??"";
    /* Network.loadingFailed => '{"canceled":true,"errorText":"net::ERR_ABORTED","requestId":"7FFCAAD5B018713D0EEEE7E1A10EB0EC","timestamp":69867.803288,"type":"Document"}' */
    /*
    if(type === "document" && debugUrl.indexOf("hsjc.qingdao.gov.cn")>-1){
        if(debugUrl !== "https://hsjc.qingdao.gov.cn/") return true;
        if(method === 'Network.requestWillBeSent'){
            HSCJApiReceiver.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, false);
        }
        else if(method === "Network.loadingFailed"){
            if(HSCJApiReceiver.isRequestOffline(params.requestId)) return true;
            HSCJApiInterceptor.debug("loadingFailed => "+debugUrl);
            MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine"});
        }
        else if(method === 'Network.responseReceived'){
            HSCJApiReceiver.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, true);
        }
        return true;
    }
    */
    if(type !== "xhr") return true;

    const isLocalHost = debugUrl.indexOf("localhost")>-1 || debugUrl.indexOf("127.0.0.1")>-1 || debugUrl.indexOf("0.0.0.0")>-1;
    const isHSCJHost  = debugUrl.indexOf("hsjc.qingdao.gov.cn")>-1;

    /*服务器异常*/
    if(method === 'Network.loadingFailed'){
        if(isHSCJHost && !isLocalHost){
            LogUtils.log(debugUrl+"\n"+JSON.stringify({params}));
            /*
            {
                "params":{
                    "canceled":false,
                    "errorText":"net::ERR_INTERNET_DISCONNECTED",
                    "requestId":"29156.54",
                    "timestamp":526596.344074,
                    "type":"XHR"
                }
            }
            */
            MessageManager.sendMessageFromBackgroundToContent({type:"submitApiPing",timestamp:new Date().getTime(), interval:60000});
            if(debugUrl.indexOf("login")>0){
                let requestInfo = {};
                try {requestInfo = JSON.parseBody(url);} catch (e) {}
                MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine",username:requestInfo.username,password:requestInfo.password});
            }
        }
        return true;
    }

    if(method === 'Network.requestWillBeSent'){
        const pluginRequestId  = params?.request?.headers["HSCJ-Plugin-Request-ID"];
        const isOfflineRequest = params?.request?.headers["HSCJ-Plugin-Offline-Mode"] === "true";
        if(!FunctionUtils.isNull(pluginRequestId)){
            HSCJApiReceiver.markPluginRequestInfo(pluginRequestId, params.requestId, debugUrl, isOfflineRequest);
        }
        else if(!isLocalHost && isHSCJHost){
            HSCJApiReceiver.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, isOfflineRequest);
        }

        return true;
    }

    if(method !== 'Network.responseReceived') return true;
    if(isLocalHost) return true;
    if(!isHSCJHost) return true;

    const isOffline = HSCJApiReceiver.isRequestOffline(params.requestId);
    const isCached  = params?.response?.headers["HSCJ-Plugin-Cached"] === "true";
    const isPing    = !FunctionUtils.isNull(params?.response?.headers["HSCJ-Plugin-Ping-Request-Description"]);
    if(isPing) return true;

    const url                  = debugUrl;
    const isLoginUrl           = url.indexOf("login")>-1;
    const isUserInfoUrl        = url.indexOf("getUserToken")>-1;
    const isTubInfoUrl         = url.indexOf("getTestedListByTubeNum")>-1;
    const isIdCardInfoUrl      = url.indexOf("findPeopleListForInput")>-1;
    const isGridInfoUrl        = url.indexOf("findGridsByParentId")>-1;
    const isHealthyQRInfoUrl   = url.indexOf("decryptHealthQr")>-1;
    const isSamplingConfirmUrl = url.indexOf("confirmed")>-1;
    const isDeleteSamplingUrl  = url.indexOf("delTestResult")>-1;
    const isQueryHistoryUrl    = url.indexOf("findTestResult")>-1;
    const isFindSiteDeviceUrl  = url.indexOf("findSiteDevice")>-1;

    HSCJApiReceiver.debug("handleNetworkEvent:"+JSON.stringify({url,isCached,isLocalHost,isHSCJHost,status:params?.response?.status??0,params}));

    if(isUserInfoUrl && (params?.response?.status??0) >= 400){
        MessageManager.sendMessageFromBackgroundToContent({type:"reLogin"});
        return true;
    }

    const isSamplingPageUrl = isTubInfoUrl || isHealthyQRInfoUrl || isSamplingConfirmUrl || isGridInfoUrl || isIdCardInfoUrl;
    if(isSamplingPageUrl){
        MessageManager.sendMessageFromBackgroundToContent({type:'autoAddComponent'});
    }

    /* 提交PING值 */
    let canSubmitPing = HSCJLocalSettingManager.isOfflineMode() ? (!isCached) : true;
    if(canSubmitPing){
        const requestTime = params?.response?.timing?.requestTime??params?.response?.timing?.connectStart??0;
        const responseTime = params?.timestamp??0;
        const interval = (responseTime - requestTime)*1000;
        if(interval>0){
            MessageManager.sendMessageFromBackgroundToContent({type:"submitApiPing",timestamp:new Date().getTime() - interval, interval:interval});
        }
    }

    const isReceiverUrl = isLoginUrl || isTubInfoUrl || isIdCardInfoUrl || isGridInfoUrl || isHealthyQRInfoUrl || isSamplingConfirmUrl || isDeleteSamplingUrl || isQueryHistoryUrl || isFindSiteDeviceUrl;
    if(!isReceiverUrl) return true;
    let requestInfo = {};
    let responseInfo = {};
    const onApiReceived = function () {
        HSCJApiReceiver.debug("onApiReceived => "+url+"\t"+JSON.stringify({requestInfo,responseInfo}));

        if (isTubInfoUrl) {
            HSCJApiReceiver.onGetTubInfoApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isIdCardInfoUrl) {
            HSCJApiReceiver.onGetIdCardInfoApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isGridInfoUrl) {
            HSCJApiReceiver.onGetGridInfoApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isSamplingConfirmUrl) {
            HSCJApiReceiver.onCommitSamplingApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isHealthyQRInfoUrl) {
            HSCJApiReceiver.onHealthQRInfoApiReceived(requestInfo, responseInfo);
            return true;
        }

        if(isFindSiteDeviceUrl){
            HSCJApiReceiver.onFindSiteDeviceApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isDeleteSamplingUrl) {
            HSCJApiReceiver.onDeleteSamplingApiReceived(requestInfo, responseInfo);
            return true;
        }

        if (isQueryHistoryUrl) {
            HSCJApiReceiver.onQueryHistoryApiReceived(requestInfo, responseInfo);
            return true;
        }

        if(isLoginUrl){
            HSCJApiReceiver.onLoginApiReceived(requestInfo, responseInfo);
            return true;
        }
    }

    const pluginRequestId = HSCJApiReceiver.getPluginRequestId(params.requestId);
    if(!FunctionUtils.isNull(pluginRequestId) && params.requestId !== pluginRequestId){
        responseInfo.pluginRequestId = pluginRequestId;
        responseInfo.chromeRequestId = params.requestId;
        onApiReceived();
        return true;
    }

    try {
        chrome.debugger.sendCommand(debuggee, "Network.getResponseBody", {requestId: params.requestId}, async function (responseBody) {
            const base64Encoded = responseBody?.base64Encoded??false;
            const body = responseBody?.body??"{}";
            const data = JSON.parse(base64Encoded ? Base64Utils.decodeB64Str(body) : body);

            HSCJApiReceiver.debug("getResponseBody => "+url+"\t"+JSON.stringify({data:data,responseBody:responseBody,isCached:isCached}));

            responseInfo = {
                code   : data.code,
                msg    : data.msg,
                datas  : data.data,
                cached : isCached
            };

            if (isLoginUrl) {
                requestInfo = {};
                try {requestInfo = JSON.parseBody(url);} catch (e) {}
                onApiReceived();
                if((data.code??400)>=400){
                    MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine",username:requestInfo.username,password:requestInfo.password});
                }
                return true;
            }

            if(isFindSiteDeviceUrl) {
                onApiReceived();
                return true;
            }

            try {
                chrome.debugger.sendCommand(debuggee, "Network.getRequestPostData", {requestId: params.requestId}, async function (requestData) {
                    try {requestInfo = JSON.parseBody(requestData?.postData ?? url);} catch (e) {}

                    HSCJApiReceiver.debug("getRequestPostData => "+url+"\t"+JSON.stringify({requestInfo,requestData:requestData}));

                    onApiReceived();
                });
            } catch (e) {
                HSCJApiReceiver.debug(e);
            }
        });
    } catch (e) {
        HSCJApiReceiver.debug(e);
    }

    return true;
}

HSCJApiReceiver.onLoginApiReceived          = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onLoginApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onGetTubInfoApiReceived     = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onGetTubInfoApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onGetIdCardInfoApiReceived  = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onGetIdCardInfoApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onGetGridInfoApiReceived    = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onGetGridInfoApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onCommitSamplingApiReceived = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onCommitSamplingApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onHealthQRInfoApiReceived   = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onHealthQRInfoApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onDeleteSamplingApiReceived = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onDeleteSamplingApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onQueryHistoryApiReceived   = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onQueryHistoryApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

HSCJApiReceiver.onFindSiteDeviceApiReceived = function (requestInfo, responseInfo){
    MessageManager.sendMessageFromBackgroundToContent({
        type        : HSCJApiReceiver.Message.onApiReceived.key,
        method      : HSCJApiReceiver.Message.onApiReceived.methods.onFindSiteDeviceApiReceived,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
