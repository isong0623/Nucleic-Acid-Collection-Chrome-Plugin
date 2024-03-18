/**
 * 接口请求调用封装
 */
class HSCJApiProvider{
    static debug(msg){
        LogUtils.log(msg,"HSCJApiProvider");
    }

    /**
     * 提交一次接口请求延迟信息
     * @param timestamp
     * @param useage
     * @returns {Promise<void>}
     */
    static async submitApiPing(timestamp, useage){
        HSCJApiProvider.debug("submitApiPing:"+timestamp+" => "+useage);
        const now = new Date().getTime();
        const exp = now - HSCJApiProvider.maxExpiredRange;
        if(timestamp<=exp) return;

        let usages = HSCJApiProvider.pingHolder[timestamp];
        if(usages === undefined){
            usages = [useage];
            HSCJApiProvider.pingHolder[timestamp] = usages;
        }
        else{
            usages.push(useage);
        }

        while(HSCJApiProvider.pingHolder.size>0){
            const time = parseInt(Object.entries(HSCJApiProvider.pingHolder)[0][0]);
            if(time < exp){
                HSCJApiProvider.pingHolder.delete(time);
                continue;
            }
            break;
        }
    }

    /**
     * 获取过去一段时间内的接口延迟
     * @param range
     * @returns {number}
     */
    static getPingAVG(range = 5*60*1000){
        if(range>=HSCJApiProvider.maxExpiredRange) return -1;
        const now = new Date().getTime();
        const exp = now - range;
        let avg   = 0;
        let count = 0;

        for(let key in HSCJApiProvider.pingHolder){
            const time = parseInt(key);
            if(time<exp) continue;
            const usages = HSCJApiProvider.pingHolder[key] ?? [];
            for(let i=0,ni=usages.length??0;i<ni;++i){
                const usage = usages[i];
                avg += usage;
                ++count;
            }
        }
        if(count === 0) return -1;
        return avg/count;
    }

    /**
     * 获取核酸服务器延迟并记录
     * 每两分钟最多执行一次
     * 注意此项会被重复提交延迟记录，也用于强化延迟比重
     */
    static pingHSCJServer(callback = null){
        const lastPingTimestamp = HSCJApiProvider.lLastPingTimestamp??0;
        let start = new Date().getTime();
        if(start - lastPingTimestamp < 120000 && FunctionUtils.isNull(callback)){
            return;
        }
        HSCJApiProvider.lLastPingTimestamp = start;
        if(!FunctionUtils.isNull(callback)){
            setTimeout(()=>callback(60000),15000);
        }

        const api = new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/bill/findBillList")
            .headers("HSCJ-Plugin-Ping-Request-Description",
                "Each device will request once in two minute, it used to determine if the nucleic acid system has crashed. " +
                "Please don't change this response for make browser plugin offline mode work well. " +
                "For more information see [https://weibo.com/u/7711875625],thanks."
            )
            .body(JSON.stringify({"pageNum":1,"pageSize":10,"plateNumber":"","testSiteId":"","signStatus":null,"regionCode":null,"lastGridId":null}))
            .getParent();
        const req = api.getRequest();

        HSCJApiProvider.debug("ping => started  at "+new Date(start).Format("yyyy-MM-dd hh:mm:ss:S"));
        req.doPost((response) => {
            if(this.process === true) return;
            this.process = true;
            const end = new Date().getTime();
            HSCJApiProvider.debug('ping => finished at '+new Date(end).Format("yyyy-MM-dd hh:mm:ss:S"));
            const datas = JSON.parseBody(response);
            const code  = datas["code"];
            const status = response.status;
            if(status ===200 || status === 401 || code === 401){
                const interval = end - start;
                HSCJApiProvider.debug('ping => success in '+interval +"ms");
                if(!FunctionUtils.isNull(callback)) callback(interval);
                HSCJApiProvider.submitApiPing(end,interval);
            }
            else{
                HSCJApiProvider.debug('ping => failure!');
                if(!FunctionUtils.isNull(callback)) callback(60000);
                HSCJApiProvider.submitApiPing(end,60000);
            }
        }, false);
    }

    static requestIdCounter = 0;
    static lastAutoDelTime  = 0;
    static nextRequestId(){
        return ++HSCJApiProvider.requestIdCounter;
    }

    static apiInfo = new Map();
    static updateApiInfo(requestId,requestInfo,responseInfo){
        const info = this.apiInfo[requestId];
        const now  = new Date().getTime();

        if(FunctionUtils.isNull(info)){
            this.apiInfo[requestId] = {
                requestInfo : requestInfo ,
                responseInfo: responseInfo,
                timestamp   : now
            };
        }
        else{
            info.requestInfo  = requestInfo;
            info.responseInfo = responseInfo;
            info.timestamp    = now;
        }

        const lastAutoDelTime = HSCJApiProvider.lastAutoDelTime ?? 0;
        if(now - lastAutoDelTime<30000){
            return;
        }
        HSCJApiProvider.lastAutoDelTime = now;

        Object.keys(this.apiInfo).forEach((value, index, array) => {
            const info = this.apiInfo[value];
            if(FunctionUtils.isNull(info)) return;
            const time = info.timestamp;
            if(now - time >60000){
                delete this.apiInfo[value];
            }
        });
    }

    static queryApiInfo(requestId){
        return this.apiInfo[requestId];
    }

    static _doPostInternal(request,callback,offline=false,sync=false){
        callback.process = false;
        const requestId = this.nextRequestId();
        const requestBody = request.request.body;
        const requestUrl  = request.composeParams(request.getHost());
        const requestInfo = JSON.parseBody(requestBody??requestUrl);
        this.updateApiInfo(requestId,requestInfo,null);

        if(offline === true){
            request.headers("HSCJ-Plugin-Offline-Mode","true");
        }
        request.headers("HSCJ-Plugin-Request-ID",requestId);
        try {
            request.doPost((response) => {
                const status = response.status;
                if(FunctionUtils.isNull(response)){
                    if (callback.process === true) return;
                    callback.process = true;
                    this.updateApiInfo(requestId,requestInfo,{code:status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(status ?? 500, "请求失败，错误代码" + status, status);
                    return;
                }

                if (callback.process === true) return;
                callback.process = true;
                const datas = response ?? {};
                const code = datas["code"];

                const msg = datas["msg"];
                const data = datas["data"];
                if (status === 200 && (code === 0 || code?.toString()?.trim() === "0")) {
                    this.updateApiInfo(requestId,requestInfo,{code,msg,datas:data});
                    callback.onSuccess(code, msg, data);
                } else {
                    this.updateApiInfo(requestId,requestInfo,{code:code ?? status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(code ?? status ?? 500, msg ?? "请求失败，错误代码" + status, status);
                }
            }, sync);
        } catch (e) {
            if (callback.process === true) return;
            callback.process = true;
            callback.onFailure(500, e ?? "请求失败!",500);
            this.updateApiInfo(requestId,requestInfo,{code:500,msg:"请求失败，错误代码!",status:500});
        }
    }

    static _doGetInternal(request,callback,offline=false,sync=false){
        callback.process = false;
        const requestId = this.nextRequestId();
        const requestBody = request.request.body;
        const requestUrl  = request.composeParams(request.getHost());
        const requestInfo = JSON.parseBody(requestBody??requestUrl);
        this.updateApiInfo(requestId,requestInfo,null);

        if(offline === true){
            request.headers("HSCJ-Plugin-Offline-Mode","true");
        }
        request.headers("HSCJ-Plugin-Request-ID",requestId);
        try {
            request.doGet((response) => {
                const status = response.status;
                if(FunctionUtils.isNull(response)){
                    if (callback.process === true) return;
                    callback.process = true;
                    this.updateApiInfo(requestId,requestInfo,{code:status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(status ?? 500, "请求失败，错误代码" + status, status);
                    return;
                }

                if (callback.process === true) return;
                callback.process = true;
                const datas = response ?? {};
                const code = datas["code"];

                const msg = datas["msg"];
                const data = datas["data"];
                if (status === 200 && (code === 0 || code?.toString()?.trim() === "0")) {
                    this.updateApiInfo(requestId,requestInfo,{code,msg,datas:data});
                    callback.onSuccess(code, msg, data);
                } else {
                    this.updateApiInfo(requestId,requestInfo,{code:code ?? status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(code ?? status ?? 500, msg ?? "请求失败，错误代码" + status, status);
                }
            }, sync);
        } catch (e) {
            if (callback.process === true) return;
            callback.process = true;
            callback.onFailure(500, e ?? "请求失败!",500);
            this.updateApiInfo(requestId,requestInfo,{code:500,msg:"请求失败，错误代码!",status:500});
        }
    }

    static login(username,password,callback,sync=false){
        const api = ApiProviderInstance.login(username,password);
        const req = api.getRequest();
        this._doPostInternal(req,callback,false,sync);
    }

    static tubInfo(tubNo,callback,offline=false,sync=false){
        const api = ApiProviderInstance.tubInfo(tubNo);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static samplingRecord(tubNo,data,callback,offline=false,sync=false){
        const api = ApiProviderInstance.samplingRecordByData(tubNo,data);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static cardNoInfo(cardNo,callback,offline=false,sync=false){
        const api = ApiProviderInstance.cardNoInfo(cardNo);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static delSampling(ids,reason,callback,offline=false,sync=false){
        const api = ApiProviderInstance.delSampling(ids,reason);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static histSampling(idCard,testNum,startTime,endTime,testStatus,pageNum,pageSize,callback,offline=false,sync=false){
        const api = ApiProviderInstance.histSampling(idCard,testNum,startTime,endTime,testStatus,pageNum,pageSize);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static healthyQrCodeInfo(healthyQrCode,callback,offline=false,sync=false){
        const api = ApiProviderInstance.healthyQrCodeInfo(healthyQrCode);
        const req = api.getRequest();
        this._doPostInternal(req,callback,offline,sync);
    }

    static isLogin(){
        const token = (()=>{
            try {
                return decodeURI(document.cookie.split(";").filter((value)=>{return value.trim().startsWith("vue_admin_template_token")})[0].trim().replace("vue_admin_template_token=",""));
            } catch (e) {
                return null;
            }
        })();
        return token!==null && (token?.toString()?.trim()?.length??0) > 0;
    }
}
HSCJApiProvider.tag = "HSCJApiProvider";

/* {sort:{timestamp:[reqId]},request:{reqId:timestamp}} */
HSCJApiProvider.requestMapper = new Map();
HSCJApiProvider.requestMapper.sort = new Map();
HSCJApiProvider.requestMapper.request = new Map();

/* {timestamp:[interval]} */
HSCJApiProvider.pingHolder = new Map();

HSCJApiProvider.maxExpiredRange = 10*60*1000;
