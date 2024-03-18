/**
 * 网络接口拦截content实现
 */

HSCJApiInterceptor.debug = function (msg) {
    LogUtils.log(msg,"Content.HSCJApiInterceptor");
};

HSCJApiInterceptor.handleInterceptEvent       = async function (message){
    const type   = message.type;
    if(type !== HSCJApiInterceptor.Message.onApiIntercepted.key) return false;

    const method      = message[HSCJApiInterceptor.Message.onApiIntercepted.params.method];
    const requestInfo = message[HSCJApiInterceptor.Message.onApiIntercepted.params.requestInfo];
    const requestId   = message[HSCJApiInterceptor.Message.onApiIntercepted.params.requestId];
    const params      = { requestInfo:requestInfo };

    HSCJApiInterceptor.debug("HSCJApiInterceptor.handleInterceptEvent => ["+requestId+"]:"+JSON.stringify({method,requestInfo}));

    return await new Promise((resolve, reject) => {
        switch (method){
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptGridInfo:
                HSCJApiInterceptor.onInterceptGridInfo(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptTubInfo:
                HSCJApiInterceptor.onInterceptTubInfo(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptHealthQRCode:
                HSCJApiInterceptor.onInterceptHealthQRCode(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptUserInfo:
                HSCJApiInterceptor.onInterceptUserInfo(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptConfirmSampling:
                HSCJApiInterceptor.onInterceptConfirmSampling(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptDeviceInfo:
                HSCJApiInterceptor.onInterceptDeviceInfo(resolve, reject,params);
                return true;
            case HSCJApiInterceptor.Message.onApiIntercepted.methods.onInterceptHSCJPage:
                HSCJApiInterceptor.onInterceptHSCJPage(resolve, reject,params);
                return true;
            default:
                return false;
        }
    })
        .then((data)=>{
            HSCJApiInterceptor.debug("HSCJApiInterceptor.handleInterceptEvent => ["+requestId+"] resolved");
            MessageManager.sendMessageFromContentToBackground({
                type: HSCJApiInterceptor.Message.onApiInterceptCallback.key,
                requestId:requestId,
                result:true,
                data:data,
            });
        })
        .catch((err)=>{
            HSCJApiInterceptor.debug("HSCJApiInterceptor.handleInterceptEvent => ["+requestId+"] rejected");
            MessageManager.sendMessageFromContentToBackground({
                type: HSCJApiInterceptor.Message.onApiInterceptCallback.key,
                requestId:requestId,
                result:false,
                data:err,
            });
        });
}

HSCJApiInterceptor.onInterceptTubInfo         = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const tubNo       = requestInfo["tubeNum"];
    HSCJApiInterceptor.debug("");
    if((tubNo?.length??0) === 0) {
        reject();
        return;
    }
    const ids = new Set();
    const items = [];
    const addItems = (datas)=>{
        if((datas?.length??0) === 0) return;
        for(let i=0,ni=datas?.length??0;i<ni;++i){
            const data = datas[i];
            const item = {
                "peopleId":data["peopleId"]??"",
                "fullName":data["fullName"]??data["name"]??"",
                "address":data["address"]??"",
                "mobile":data["mobile"]??data["phone"]??"",
                "idCard":data["idCard"]??data["idNo"]??"",
                "testNum":tubNo,
                "testSiteName":data["testSiteName"]??"",
                "testSiteId":data["testSiteId"]??"",
                "testStatus":data["testStatus"]??0,
                "capacity":data["capacity"]??20,
                "testResultId":data["testResultId"]??"",
                "timestamp":parseInt(data["optTime"]??data["samplingTime"]??0)
            };
            if(ids.has(item.idCard)) continue;
            ids.add(item.idCard);
            items.push(item);
        }
    };

    LocalSamplingRecordManager.getTubInfo(tubNo,{
        onSuccess : function (datas) {
            addItems(datas);
            OfflineSamplingManager.listOffline(tubNo,{
                onSuccess:function (datas) {
                    addItems(datas);
                    if(items.length>0){
                        resolve({
                            "code":0,
                            "msg":"操作成功",
                            "data":items.sort((o1, o2) => {
                                let a = isNaN(o1.timestamp) ? 0 : o1.timestamp;
                                let b = isNaN(o2.timestamp) ? 0 : o2.timestamp;
                                return a < b ? 1 : (a===b? 0 : -1);
                            })
                        });
                    }
                    else{
                        /* 离线模式 */
                        if(HSCJLocalSettingManager.isOfflineMode()){
                            if(!HSCJApiProvider.isLogin() || HSCJApiProvider.getPingAVG()>2000){
                                resolve({
                                    "code":0,
                                    "msg":"操作成功",
                                    "data":[]
                                });
                                return;
                            }
                        }
                        reject();
                    }
                },
                onFailure:function (error) {
                    reject(error);
                }
            });
        },
        onFailure : function (err) { reject(err); }
    });
}

HSCJApiInterceptor.onInterceptUserInfo        = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const idCard  = requestInfo["idCard"];
    const idType  = requestInfo["idType"] ?? 1;

    HSCJApiInterceptor.debug("onInterceptUserInfo => LocalUserInfoManager.queryUser("+idType+","+idCard+")");
    LocalUserInfoManager.queryUser(idType,idCard,{
        onSuccess : function (datas){
            if(FunctionUtils.isNull(datas)) {
                if(HSCJLocalSettingManager.isOfflineMode()){
                    if(!HSCJApiProvider.isLogin() || HSCJApiProvider.getPingAVG()>2000){
                        resolve({
                            "code":0,
                            "msg":"操作成功",
                            "mode":1,
                            "data":{
                                "pageNum":1,
                                "pageSize":30,
                                "total":"0",
                                "pages":0,
                                "orderBy":null,
                                "result":[]
                            }
                        });
                        return;
                    }
                }
                reject();
                return;
            }
            HSCJApiInterceptor.debug("onInterceptUserInfo => LocalUserInfoManager.queryUser.onSuccess():"+JSON.stringify(datas??{}));
            const data = datas;
            resolve(
                {
                    "code":0,
                    "msg":"操作成功",
                    "data":{
                        "pageNum":1,
                        "pageSize":30,
                        "total":"1",
                        "pages":1,
                        "orderBy":null,
                        "result":[
                            {
                                "id":data["id"]??"",
                                "fullName":data["fullName"]??"",
                                "idCard":data["idCard"]??"",
                                "mobile":data["mobile"]??"",
                                "category":data["category"],
                                "primaryId":data["primaryId"]??"",
                                "secondaryId":data["secondaryId"]??"",
                                "thirdId":data["thirdId"],
                                "regionCode":data["regionCode"]??"",
                                "address":data["address"]??"",
                                "remark":data["remark"],
                                "source":data["source"]??0,
                                "createdTime":data["createdTime"]??"",
                                "updatedTime":data["updatedTime"]??"",
                                "openId":data["openId"],
                                "status":data["status"],
                                "delFlag":data["delFlag"]??false,
                                "checkStatus":data["checkStatus"]??1,
                                "sex":data["sex"]??1,
                                "idType":data["idType"]??1,
                                "createdBy":data["createdBy"],
                                "updatedBy":data["updatedBy"]??"",
                                "regionName":data["regionName"],
                                "gridName":data["gridName"]??"",
                                "secondGridName":data["secondGridName"]??"",
                                "thirdGridName":data["thirdGridName"],
                                "gridCode":data["gridCode"],
                                "secondGridCode":data["secondGridCode"],
                                "thirdGridCode":data["thirdGridCode"],
                                "isNew":data["isNew"],
                                "isPc":data["isPc"],
                                "testNum":null
                            }
                        ]
                    }
                }
            );
        },
        onFailure : function (err){
            HSCJApiInterceptor.debug("onInterceptUserInfo => LocalUserInfoManager.queryUser.onFailure():"+err);
            reject(err);
        }
    });
};

HSCJApiInterceptor.onInterceptHealthQRCode    = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    let healthCode = requestInfo["healthCode"];

    if((healthCode?.length??0) === 0) {
        reject();
        return;
    }

    HSCJApiInterceptor.debug("onInterceptHealthQRCode => LocalUserInfoManager.queryUserByHealthyCode("+healthCode+")");
    LocalUserInfoManager.queryUserByHealthyCode(healthCode, {
        onSuccess : function (datas){
            const data = (datas??{})[0];
            if(FunctionUtils.isNull(data)) {
                reject();
                return;
            }

            HSCJApiInterceptor.debug("onInterceptHealthQRCode => LocalUserInfoManager.queryUserByHealthyCode.onSuccess():"+JSON.stringify(data??{}));
            resolve(
                {
                    "code":0,
                    "msg":"操作成功",
                    "data":{
                        "id":data["id"]??"",
                        "fullName":data["fullName"]??"",
                        "idCard":data["idCard"]??"",
                        "mobile":data["mobile"]??"",
                        "category":data["category"],
                        "primaryId":data["primaryId"]??"",
                        "secondaryId":data["secondaryId"]??"",
                        "thirdId":data["thirdId"],
                        "regionCode":data["regionCode"]??"",
                        "address":data["address"]??"",
                        "remark":data["remark"],
                        "source":data["source"]??0,
                        "createdTime":data["createdTime"]??"",
                        "updatedTime":data["updatedTime"]??"",
                        "openId":data["openId"],
                        "status":data["status"],
                        "delFlag":data["delFlag"]??false,
                        "checkStatus":data["checkStatus"]??1,
                        "sex":data["sex"]??1,
                        "idType":data["idType"]??1,
                        "createdBy":data["createdBy"],
                        "updatedBy":data["updatedBy"]??"",
                        "regionName":data["regionName"],
                        "gridName":data["gridName"]??"",
                        "secondGridName":data["secondGridName"]??"",
                        "thirdGridName":data["thirdGridName"],
                        "gridCode":data["gridCode"],
                        "secondGridCode":data["secondGridCode"],
                        "thirdGridCode":data["thirdGridCode"],
                        "isNew":data["isNew"],
                        "isPc":data["isPc"],
                        "testNum":null
                    }
                }
            );
        },
        onFailure : function (err){
            HSCJApiInterceptor.debug("onInterceptHealthQRCode => LocalUserInfoManager.queryUserByHealthyCode.onFailure():"+err);
            reject(err);
        }
    });

};

HSCJApiInterceptor.onInterceptConfirmSampling = function (resolve, reject, params){
    if(HSCJApiInterceptor.onInterceptConfirmSampling.getTestSiteName === undefined){
        HSCJApiInterceptor.onInterceptConfirmSampling.getTestSiteName = function (){
            try {
                return decodeURI(document.cookie.split(";").filter((value) => {
                    return value.trim().startsWith("siteName");
                })[0].trim().replace("siteName=", "")).trim();
            } catch (e) {
                return "本采样点";
            }
        }
    }

    const data   = params.requestInfo;

    const idType = data["idType"]??1;
    const idCard = data["idCard"];
    const tubNo  = data["testNum"];

    const code   = data["code"];
    const msg    = data["msg"];
    if(!FunctionUtils.isNull(code)){
        HSCJApiInterceptor.debug("onInterceptConfirmSampling => break line resolved!");
        resolve({
           code,
           msg,
           data:null
        });
        return;
    }

    if(((idType?.length??0) === 0 )||((idCard?.length??0) === 0)){
        reject();
        return;
    }

    HSCJApiInterceptor.debug("onInterceptConfirmSampling => LocalSamplingRecordManager.queryUser("+idType+","+idCard+")");
    LocalSamplingRecordManager.queryUser(idType,idCard,{
        onSuccess: function (datas){
            HSCJApiInterceptor.debug("onInterceptConfirmSampling => LocalSamplingRecordManager.queryUser.onSuccess():"+JSON.stringify(datas??{}));
            if((datas?.length??0) > 0){
                resolve(
                    {
                        "code":-1,
                        "msg":"该人员已经在" + HSCJApiInterceptor.onInterceptConfirmSampling.getTestSiteName() + "检测过,处于检测未完成状态",
                        "data":null
                    }
                );
                return;
            }

            HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.queryUserRecord("+idType+","+idCard+")");
            OfflineSamplingManager.queryUserRecord(idType,idCard,{
                onSuccess: function (datas) {
                    HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.queryUserRecord.onSuccess():"+JSON.stringify(datas??{}));
                    if((datas?.length??0) > 0){
                        const data = datas[0];
                        const err  = data["err"]??0;
                        const state = err===1?"上传失败": err===2?"上传完成":"等待上传";
                        resolve(
                            {
                                "code":-1,
                                "msg":"该人员已经在" + HSCJApiInterceptor.onInterceptConfirmSampling.getTestSiteName() + "检测过,处于离线"+ state +"状态",
                                "data":null
                            }
                        );
                        return;
                    }

                    if(HSCJLocalSettingManager.isOfflineMode()){
                        HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.addOfflineRecord()");
                        OfflineSamplingManager.addOfflineRecord(params.requestInfo,{
                            onSuccess: function () {
                                HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.addOfflineRecord.onSuccess()");
                                resolve(
                                    {
                                        code:0,
                                        msg:"操作成功",
                                        data:{testNum:tubNo,capacity:"20"}
                                    }
                                );
                            },
                            onFailure:function (err){
                                HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.addOfflineRecord.onFailure():"+err);
                                reject(err);
                            }
                        });
                        return;
                    }
                    reject();
                },
                onFailure: function (err){
                    HSCJApiInterceptor.debug("onInterceptConfirmSampling => OfflineSamplingManager.queryUserRecord.onFailure():"+err);
                    reject(err);
                }
            });
        },
        onFailure: function (err){
            HSCJApiInterceptor.debug("onInterceptConfirmSampling => LocalSamplingRecordManager.queryUser.onFailure():"+err);
            reject(err);
        }
    });
};

HSCJApiInterceptor.onInterceptGridInfo        = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const id   = requestInfo["parentId"];
    const result = LocalGridManager.query(id);
    HSCJApiInterceptor.debug("onInterceptGridInfo => LocalGridManager.query("+id+"):"+JSON.stringify(result??{}));
    if((result?.result?.length??0)>0){
        resolve({
            "code": 0,
            "msg": "操作成功",
            "data": result
        });
        return;
    }
    reject();
};

HSCJApiInterceptor.onInterceptDeviceInfo      = function (resolve, reject, params){
    const devInfo = HSCJLocalSettingManager.getOfflineDevice();
    HSCJApiInterceptor.debug("onInterceptDeviceInfo => HSCJLocalSettingManager.getOfflineDevice():"+JSON.stringify(devInfo??{}));
    if(Object.keys(devInfo).length>0){
        resolve({
            "code": 0,
            "msg": "操作成功",
            "data": devInfo
        });
        return;
    }
    reject();
};

HSCJApiInterceptor.onInterceptHSCJPage = function (resolve, reject, params){
    const callback = {
        onSuccess:()=>{
            if(callback.process === true) return;
            callback.process = true;
            HSCJApiInterceptor.debug("onInterceptHSCJPage => onSuccess");
            reject();
        },
        onFailure:()=>{
            if(callback.process === true) return;
            callback.process = true;
            HSCJApiInterceptor.debug("onInterceptHSCJPage => onFailure");
            MessageManager.sendMessageFromContentToBackground({type:"onBreakLine"});
            setTimeout(()=>resolve(`等待离线采样页面加载完毕...`),1000);
        }
    };

    HSCJApiProvider.pingHSCJServer((result)=>{
        let ping = parseInt(result??0);
        if(isNaN(ping) || ping < 1) ping = 50000;
        if(ping>30000) {
            callback.onFailure();
        }
        else{
            callback.onSuccess();
        }
    });
}
