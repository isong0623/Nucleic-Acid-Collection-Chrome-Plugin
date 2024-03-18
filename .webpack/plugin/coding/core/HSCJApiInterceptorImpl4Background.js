/**
 * 网络接口拦截background实现
 */

HSCJApiInterceptor.debug = function (msg) {
    LogUtils.log(msg,"Background.HSCJApiInterceptor");
};

/* 监听chrome.debugger.onEvent中已注册监听的网络事件 */
HSCJApiInterceptor.handleInterceptEvent = async function (debuggee,method,params){
    if(!method?.startsWith("F")) return false;
    if(method !== 'Fetch.requestPaused') return true;

    try {
        params.requestInfo = JSON.parseBody(params.request?.postData ?? params.request.url);
    } catch (e) {
        params.requestInfo = {};
    }

    HSCJApiInterceptor.debug("handleInterceptEvent["+params.request.url+"]!"+JSON.stringify({requestInfo:params.requestInfo}));

    let process = false;
    await new Promise(async (resolve, reject)=>{
        try {
            if (params.request.headers["HSCJ-Plugin-Offline-Mode"]?.toString() === true.toString()) {
                HSCJApiInterceptor.debug("handleInterceptEvent[" + params.request.url + "] offline!");
                reject();
                return;
            }

            HSCJApiInterceptor.interceptMap[params.requestId] = {
                resolve: (data) => resolve(data),
                reject: (err) => reject(err)
            };

            /* 获取试管已采样信息 */
            if (params.request.url.indexOf("getTestedListByTubeNum") > -1) {
                await FunctionUtils.sleep(500);
                await HSCJApiInterceptor.onInterceptTubInfo(resolve, reject, params);
                return;
            }
            /* 获取本地缓存信息 */
            if (params.request.url.indexOf("findPeopleListForInput") > -1) {
                await HSCJApiInterceptor.onInterceptUserInfo(resolve, reject, params);
                return;
            }
            /* 匹配健康码 */
            if (params.request.url.indexOf("decryptHealthQr") > -1) {
                await HSCJApiInterceptor.onInterceptHealthQRCode(resolve, reject, params);
                return;
            }
            /* 提交采样记录 */
            if (params.request.url.indexOf("confirmed") > -1) {
                await HSCJApiInterceptor.onInterceptConfirmSampling(resolve, reject, params);
                return;
            }
            /* 获取用户身份信息 */
            if (params.request.url.indexOf("findGridsByParentId") > -1) {
                await HSCJApiInterceptor.onInterceptGridInfo(resolve, reject, params);
                return;
            }
            /* 核酸采样页面加载 */
            if(params.request.url === "https://hsjc.qingdao.gov.cn/"){
                await HSCJApiInterceptor.onInterceptHSCJPage(resolve, reject, params);
                setTimeout(()=>{
                    if(process) return;
                    resolve(`等待离线采样页面加载完毕...`);
                },10000);
                setTimeout(()=>{
                    if(process) return;
                    MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine"});
                },12000);
                return;
            }
            /* 获取读卡设备信息 */
            if (params.request.url.indexOf("findSiteDevice") > -1) {
                await FunctionUtils.sleep(3000);
                await HSCJApiInterceptor.onInterceptDeviceInfo(resolve, reject, params);
                return;
            }

            try {delete HSCJApiInterceptor.interceptMap[params.requestId];} catch (e) {}
            reject();
        }
        catch (e) {
            LogUtils.warn(e);
        }
        finally {
            setTimeout(()=>reject(),35000);
        }
    })
        .then(async (body)=>{
            if(process) return;
            process = true;

            HSCJApiInterceptor.debug("intercept resolve at["+params.request.url+"]!");
            try {
                chrome.debugger.sendCommand(
                    debuggee,
                    'Fetch.fulfillRequest',
                    {
                        requestId: params.requestId,
                        responseCode: 200,
                        responseHeaders:[
                            {name:"Content-Type",value:"application/json;charset=UTF-8"},
                            {name:"HSCJ-Plugin-Cached",value:"true"}
                        ],
                        body: Base64Utils.encodeB64Str(JSON.stringify(body)),
                    }
                );
            } catch (e) {
                HSCJApiInterceptor.debug(e);
            }
        })
        .catch(async ()=>{
            if(process) return;
            process = true;

            HSCJApiInterceptor.debug("intercept reject at["+params.request.url+"]!");
            const headers = [];
            const json = JSON.parse(JSON.stringify(params.request.headers));
            Object.entries(json).forEach((k,v,p)=>{if(k[0].toString().toLowerCase().trim() !== "cookie") headers.push({name:k[0],value:k[1]});})

            try {
                chrome.debugger.sendCommand(
                    debuggee,
                    'Fetch.continueRequest',
                    {
                        requestId: params.requestId,
                        headers  : headers
                    }
                );
            } catch (e) {
                HSCJApiInterceptor.debug(e);
            }
        });

    return true;
}

/* 监听content发给background消息的回调 */
HSCJApiInterceptor.onInterceptCallback        = function(message){
    const type      = message.type;
    if(type !== HSCJApiInterceptor.Message.onApiInterceptCallback.key) return false;
    const requestId = message.requestId;
    const result    = message.result;
    const data      = message.data;
    const executor  = HSCJApiInterceptor.interceptMap[requestId];

    HSCJApiInterceptor.debug("onInterceptCallback:"+JSON.stringify({type,requestId,result,data,executor}));

    if(FunctionUtils.isNull(executor)) return true;
    if(executor.process === true) return true;
    executor.process = true;

    new Promise(async (resolve, reject) => {
        HSCJApiInterceptor.debug("intercept callback received begin processing");
        if(result === true){
            try {await executor.resolve(data);} catch (e) {LogUtils.warn(e)}
        }
        else{
            try {await executor.reject(data);} catch (e) {LogUtils.warn(e)}
        }
        HSCJApiInterceptor.debug("intercept callback received end processing");
        try {delete HSCJApiInterceptor.interceptMap[requestId];} catch (e) {}
        resolve();
    })
        .then(()=>{})
        .catch(()=>{});

    return true;
};

HSCJApiInterceptor.onInterceptTubInfo         = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptTubInfo,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptUserInfo        = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptUserInfo,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptHealthQRCode    = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptHealthQRCode,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptConfirmSampling = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptConfirmSampling,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptGridInfo        = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptGridInfo,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptDeviceInfo      = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptDeviceInfo,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.onInterceptHSCJPage        = async function(resolve, reject, params){
    MessageManager.sendMessageFromBackgroundToContent({
        type:HSCJApiInterceptor.Message.onApiIntercepted.key,
        method:HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptHSCJPage,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};

HSCJApiInterceptor.interceptMap = new Map();
