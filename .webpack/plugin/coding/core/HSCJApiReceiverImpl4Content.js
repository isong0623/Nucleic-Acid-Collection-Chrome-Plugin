
HSCJApiReceiver.debug = function (msg) {
    LogUtils.log(msg,"Content.HSCJApiReceiver");
};

HSCJApiReceiver.handleNetworkEvent          = async function (message) {
    const type       = message.type;
    if(type !== HSCJApiReceiver.Message.onApiReceived.key) return false;
    const method     = message.method;
    let requestInfo  = message.requestInfo;
    let responseInfo = message.responseInfo;

    HSCJApiReceiver.debug("handleNetworkEvent:"+JSON.stringify({type,method,requestInfo,responseInfo}));

    const requestId    = responseInfo.pluginRequestId;
    if(!FunctionUtils.isNull(requestId)){
        while(true){
            const apiInfo = HSCJApiProvider.queryApiInfo(requestId);
            HSCJApiReceiver.debug("handleNetworkEvent => ["+requestId+"] matching requestInfo!");
            if(!FunctionUtils.isNull(apiInfo)){
                let reqInfo = apiInfo.requestInfo;
                let resInfo = apiInfo.responseInfo;
                if(!FunctionUtils.isNull(reqInfo) && !FunctionUtils.isNull(resInfo)){
                    requestInfo  = reqInfo;
                    responseInfo = resInfo;
                    try {responseInfo = JSON.parseBody(resInfo);} catch (e) {}

                    HSCJApiReceiver.debug("handleNetworkEvent => ["+requestId+"] matched requestInfo:"+JSON.stringify(requestInfo??{}));
                    break;
                }
            }
            await FunctionUtils.sleep(10);
        }
    }

    switch (method) {
        case HSCJApiReceiver.Message.onApiReceived.methods.onLoginApiReceived:
            HSCJApiReceiver.onLoginApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onGetTubInfoApiReceived:
            HSCJApiReceiver.onGetTubInfoApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onGetIdCardInfoApiReceived:
            HSCJApiReceiver.onGetIdCardInfoApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onGetGridInfoApiReceived:
            HSCJApiReceiver.onGetGridInfoApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onCommitSamplingApiReceived:
            HSCJApiReceiver.onCommitSamplingApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onHealthQRInfoApiReceived:
            HSCJApiReceiver.onHealthQRInfoApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onDeleteSamplingApiReceived:
            HSCJApiReceiver.onDeleteSamplingApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onQueryHistoryApiReceived:
            HSCJApiReceiver.onQueryHistoryApiReceived(requestInfo,responseInfo);
            return true;
        case HSCJApiReceiver.Message.onApiReceived.methods.onFindSiteDeviceApiReceived:
            HSCJApiReceiver.onFindSiteDeviceApiReceived(requestInfo,responseInfo);
            return true;
        default:
            return false;
    }
}

HSCJApiReceiver.onLoginApiReceived          = function (requestInfo, responseInfo){
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    const status= responseInfo.status;
    if(code===0 && datas !== null){
        setTimeout(()=>document.location = HSCJHtmlPageManager.getSamplingPage(), HSCJLocalSettingManager.configOfSyncInternal);
    }
    else{
        /* {"code":-1,"msg":"用户名或密码错误","data":null} */
    }
};

HSCJApiReceiver.onGetTubInfoApiReceived     = function (requestInfo, responseInfo){
    HSCJHtmlPageManager.handleApiMessage({
        type:HSCJHtmlPageManager.Message.types.onTubInfoNotify,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });
};

HSCJApiReceiver.onGetIdCardInfoApiReceived  = function (requestInfo, responseInfo){
    try {responseInfo.datas.result[0].idCard = responseInfo.datas.result[0].idCard.toUpperCase();} catch (e) {}
    try {requestInfo.idCard = requestInfo.idCard.toUpperCase();} catch (e) {}

    HSCJHtmlPageManager.handleApiMessage({
        type:HSCJHtmlPageManager.Message.types.onIdNoInfoNotify,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });

    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        if((datas?.result?.length??0)>0){
            const item = datas.result[0];
            HSCJApiReceiver.debug("onGetIdCardInfoApiReceived => LocalUserInfoManager.autoAddUser!");
            LocalUserInfoManager.autoAddUser(item,{
                onSuccess : ()=>{
                    HSCJApiReceiver.debug("onGetIdCardInfoApiReceived => LocalUserInfoManager.autoAddUser.onSuccess():"+JSON.stringify(item??{}));
                },
                onFailure : (err)=>{
                    HSCJApiReceiver.debug("onGetIdCardInfoApiReceived => LocalUserInfoManager.autoAddUser.onFailure():"+err);
                }
            });
        }
    }
};

HSCJApiReceiver.onGetGridInfoApiReceived    = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        const parentId = requestInfo["parentId"];
        HSCJApiReceiver.debug("onGetGridInfoApiReceived => LocalGridManager.autoAdd!");
        LocalGridManager.autoAdd(parentId,datas);
    }
};

HSCJApiReceiver.onCommitSamplingApiReceived = function (requestInfo, responseInfo){
    try {responseInfo.datas.idCard = responseInfo.datas.idCard.toUpperCase();} catch (e) {}

    HSCJHtmlPageManager.handleApiMessage({
        type:HSCJHtmlPageManager.Message.types.onSamplingResultNotify,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });

    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;

    if(!FunctionUtils.isNull(datas?.value) && Object.keys(requestInfo??{}).length>0){
        const data = requestInfo;
        HSCJApiReceiver.debug("onCommitSamplingApiReceived => LocalSamplingRecordManager.addRecord!");
        LocalSamplingRecordManager.addRecord(data,{
            onSuccess : ()=>{
                HSCJApiReceiver.debug("onCommitSamplingApiReceived => LocalSamplingRecordManager.addRecord.onSuccess():"+datas);
            },
            onFailure : (err)=>{
                HSCJApiReceiver.debug("onCommitSamplingApiReceived => LocalSamplingRecordManager.addRecord.onFailure():"+err);
            }
        });

        HSCJApiReceiver.debug("onCommitSamplingApiReceived => OfflineSamplingManager.markSamplingResult!");
        OfflineSamplingManager.markSamplingResult(data.idType??1,data.idCard,2,{
            onSuccess:()=>{
                HSCJApiReceiver.debug("onCommitSamplingApiReceived => OfflineSamplingManager.markSamplingResult.onSuccess()");
            },
            onFailure:(err)=>{
                HSCJApiReceiver.debug("onCommitSamplingApiReceived => OfflineSamplingManager.markSamplingResult.onFailure():"+err);
            }
        });
    }
};

HSCJApiReceiver.onHealthQRInfoApiReceived   = function (requestInfo, responseInfo){
    try {responseInfo.datas.idCard = responseInfo.datas.idCard.toUpperCase();} catch (e) {}

    HSCJHtmlPageManager.handleApiMessage({
        type:HSCJHtmlPageManager.Message.types.onHealthQRInfoNotify,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });

    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;

    const healthCode = requestInfo["healthCode"];
    if(code !== 0) return;

    HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.autoAddUser!");
    LocalUserInfoManager.autoAddUser(datas,{
        onSuccess : ()=>{
            HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.autoAddUser.onSuccess():"+JSON.stringify(datas??{}));
            HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.updateHealthyCode!");
            LocalUserInfoManager.updateHealthyCode("1",datas.idCard,healthCode,{
                onSuccess : ()=>{
                    HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.updateHealthyCode.onSuccess():"+healthCode);
                },
                onFailure : (err)=>{
                    HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.updateHealthyCode.onFailure():"+err);
                }
            });
        },
        onFailure : (err)=>{
            HSCJApiReceiver.debug("onHealthQRInfoApiReceived => LocalUserInfoManager.autoAddUser.onFailure():"+err);
        }
    });
};

HSCJApiReceiver.onDeleteSamplingApiReceived = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        const ids = requestInfo["ids"];
        const delLocal = ()=>{
            HSCJApiReceiver.debug("onDeleteSamplingApiReceived => LocalSamplingRecordManager.delRecordByIds!");
            LocalSamplingRecordManager.delRecordByIds(ids,{
                onSuccess : ()=>{
                    HSCJApiReceiver.debug("onDeleteSamplingApiReceived => LocalSamplingRecordManager.delRecordByIds.onSuccess():"+ids);
                },
                onFailure : (err)=>{
                    HSCJApiReceiver.debug("onDeleteSamplingApiReceived => LocalSamplingRecordManager.delRecordByIds.onFailure():"+err);
                }
            });
        };

        HSCJApiReceiver.debug("onDeleteSamplingApiReceived =>");
        LocalSamplingRecordManager.queryUserByDeleteIds(ids,{
            onSuccess : (datas)=>{
                HSCJApiReceiver.debug("onDeleteSamplingApiReceived => LocalSamplingRecordManager.queryUserByDeleteIds.onSuccess():"+ids);
                if(FunctionUtils.isNull(datas) || datas.length === 0){
                    delLocal();
                    return;
                }
                const data = datas[0];
                delLocal();
                HSCJApiReceiver.debug("onDeleteSamplingApiReceived => OfflineSamplingManager.delOfflineRecord!");
                OfflineSamplingManager.delOfflineRecord(data.idType??1,data.idNo??data.idCard??"",{
                    onSuccess : ()=>{
                        HSCJApiReceiver.debug("onDeleteSamplingApiReceived => OfflineSamplingManager.delOfflineRecord.onSuccess():"+ids);
                    },
                    onFailure : (err)=>{
                        HSCJApiReceiver.debug("onDeleteSamplingApiReceived => OfflineSamplingManager.delOfflineRecord.onFailure():"+err);
                    }
                });
            },
            onFailure : (err)=>{
                HSCJApiReceiver.debug("onDeleteSamplingApiReceived => LocalSamplingRecordManager.queryUserByDeleteIds.onFailure():"+err);
                delLocal();
            }
        });
    }
};

HSCJApiReceiver.onQueryHistoryApiReceived   = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        for(let i=0,ni=datas?.result?.length??0;i<ni;++i){
            const item = datas.result[i];
            const deleteId = item.id;
            const peopleId = item.peopleId;
            HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalUserInfoManager.queryUserById!");
            LocalUserInfoManager.queryUserById(peopleId,{
                onSuccess:(data)=>{
                    HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalUserInfoManager.queryUserById.onSuccess():"+peopleId);
                    HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalSamplingRecordManager.updateDelFlag!");
                    LocalSamplingRecordManager.updateDelFlag("1",data.idCard,deleteId,{
                        onSuccess:(data)=> {
                            HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalSamplingRecordManager.updateDelFlag.onSuccess():" + peopleId);
                        },
                        onFailure:(err)=>{
                            HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalSamplingRecordManager.updateDelFlag.onFailure():"+err);
                        }
                    });
                },
                onFailure:(err)=>{
                    HSCJApiReceiver.debug("onQueryHistoryApiReceived => LocalUserInfoManager.queryUserById.onFailure():"+err);
                }
            });
        }
    }
};

HSCJApiReceiver.onFindSiteDeviceApiReceived = function (requestInfo, responseInfo) {
    if (responseInfo.cached) return;
    const code = responseInfo.code;
    const msg = responseInfo.msg;
    const datas = responseInfo.datas;
    if (code === 0 && datas !== null && datas !== undefined) {
        HSCJApiReceiver.debug("onFindSiteDeviceApiReceived => HSCJLocalSettingManager.setOfflineDevice!");
        HSCJLocalSettingManager.setOfflineDevice(datas);
        MessageManager.Content.sendDeviceInfoToOptions();
    }
}
