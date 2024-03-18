/**
 * 离线记录上传引擎
 */
class HSCJOfflineEngine{
    /* 获取采样页面url */
    static getSamplingPage(){}
    /* 启动离线采样模式 */
    static startOffline(){ HSCJOfflineEngine.setOfflineState(true); }
    /* 停止离线采样模式 */
    static stopOffline(){ HSCJOfflineEngine.setOfflineState(false); }
    /* 设置离线采样启动状态 */
    static setOfflineState(run){  }
    /* 判断是否启动离线模式 */
    static isInOfflineMode(){ return HSCJLocalSettingManager.isOfflineMode(); }
    /* 状态变化监听 */
    static onOfflineStateChanged(run){}
    /* 设置当前处理的条码编号 */
    static setCurrentProcessingOfflineTubNo(tubNo){ HSCJOfflineEngine.mCurrentProcessingOfflineTubNo = tubNo; }
    /* 获取正在处理的离线条码编号 */
    static getCurrentProcessingOfflineTubNo(){ return HSCJOfflineEngine.mCurrentProcessingOfflineTubNo; }

    /* 数据更新回调 */
    static onDataChanged(){};

    /* 启动离线记录自动化上传引擎 */
    static runOfflineAutomatically(){}
}
HSCJOfflineEngine.tag = "OfflineEngine";

HSCJOfflineEngine.debug = function (msg) {
    LogUtils.log(msg,HSCJOfflineEngine.tag);
}

HSCJOfflineEngine.setOfflineState = function (run){
    if(HSCJLocalSettingManager.isBreakLineMode()){
        document.location = HSCJOfflineEngine.getSamplingPage();
        return;
    }
    HSCJOfflineEngine.onOfflineStateChanged(run);
    MessageManager.Content.speak(run?"启动离线模式":"停止离线模式",false);
    HSCJLocalSettingManager.setOfflineMode(run);
};

HSCJOfflineEngine.runOfflineAutomatically = async function () {
    let requestOfflineInfo;
    let requestOfflineTubInfo;

    let autoLogin = async function(callback){
        const loginData = HSCJLocalSettingManager.getBreakLineLoginData();
        if(loginData?.isLogin === true) {
            HSCJOfflineEngine.debug("\t检测到已登录，跳过！");
            if(callback.process === true) return;
            callback.process = true;
            callback.onSuccess();
            return;
        }

        if((loginData?.username?.trim()?.length??0) === 0 || (loginData?.password?.trim()?.length??0) === 0) {
            HSCJOfflineEngine.debug("\t检测到未托管登录信息，跳过！");
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
            return;
        }

        HSCJApiProvider.login(loginData.username,loginData.password,{
            onSuccess:(code,msg,datas)=>{
                HSCJOfflineEngine.debug("\tlogin.onSuccess()！");
                if(callback.process === true) return;
                callback.process = true;
                if(code ===0){
                    HSCJOfflineEngine.debug("\t检测到登录成功！");
                    document.cookie = "vue_admin_template_token=Bearer "+datas["token"];
                    document.cookie = "siteName="+(datas["siteName"]?.trim()??"本采样点");
                    loginData.msg = "已登录";
                    loginData.isLogin = true;
                    callback.onSuccess();
                }
                else{
                    HSCJOfflineEngine.debug("\t检测到登录失败，"+msg);
                    loginData.msg = msg;
                    loginData.code = code;
                    loginData.isLogin = false;
                    callback.onFailure();
                }
            },
            onFailure:(code,msg,status)=>{
                HSCJOfflineEngine.debug("\tlogin.onFailure()！");
                if(callback.process === true) return;
                callback.process = true;
                HSCJOfflineEngine.debug("\t检测到登录失败，"+msg);
                loginData.code = code;
                loginData.msg = msg;
                loginData.status = status;
                loginData.isLogin = false;
                callback.onFailure();
            }
        });
    };

    let samplingRecord = async function(resolve,reject,datas,testNum){
        let samplingResult = false;
        let serverUnavailable = false;
        const data = (datas??{})[0]??datas??{};
        HSCJOfflineEngine.debug("开始上传离线采样记录："+JSON.stringify(data));

        for(let i=0;i<3 && !samplingResult ;++i){
            HSCJOfflineEngine.debug("正在尝试第["+(i+1)+"]次上传！");
            await new Promise((resolve1, reject1) => {
                setTimeout(reject1,30000);
                HSCJApiProvider.samplingRecord(testNum,data,{
                    onSuccess:(code, msg, data)=>{
                        samplingResult = true;
                        HSCJOfflineEngine.debug("离线记录上传成功！");
                        resolve1(code, msg, data);
                    },
                    onFailure:(code, msg,status)=>{
                        HSCJOfflineEngine.debug("离线记录上传失败："+JSON.stringify({code,msg,status}));
                        if(code === -1){
                            i = 3;
                        }
                        if(status>=400){
                            serverUnavailable = true;
                        }
                        reject1(code,msg,status);
                    }
                },true);
            })
                .then((code, msg, data)=>{})
                .catch((code, msg,status)=>{});

            if(!samplingResult){
                const avgPing = HSCJApiProvider.getPingAVG();
                const sleep = avgPing<1 ? 10000 : (avgPing*1.5);
                await FunctionUtils.sleep(sleep+sleep);
            }
        }

        if(serverUnavailable){
            reject();
        }
        else{
            HSCJOfflineEngine.debug("离线记录开始同步操作状态！");
            OfflineSamplingManager.markSamplingResult(datas.idType,datas.idCard,samplingResult?2:1,{
                onSuccess:()=>{
                    HSCJOfflineEngine.debug("操作状态同步成功！");
                    resolve();
                },
                onFailure:()=>{
                    HSCJOfflineEngine.debug("操作状态同步成功！");
                    reject();
                }
            });
        }
    };

    /* 查询待处理的试管信息 */
    requestOfflineTubInfo = function (tubNo, resolve, reject) {
        if((tubNo?.length??0) === 0) {
            reject();
            HSCJOfflineEngine.setCurrentProcessingOfflineTubNo("");
            return;
        }
        HSCJOfflineEngine.debug("开始查询["+tubNo+"]内的离线采样待上传记录！");
        OfflineSamplingManager.listProcessingOffline(tubNo,{
            onSuccess: async (datas)=>{
                if((datas?.length??0) === 0){
                    HSCJOfflineEngine.setCurrentProcessingOfflineTubNo("");
                    HSCJOfflineEngine.debug("试管["+tubNo+"]内无待上传离线记录！");
                    requestOfflineInfo(resolve, reject);
                }
                else{
                    const data = datas[0]??{};
                    const mode = data.mode;
                    const idCard = data.idCard;
                    if(parseInt(mode) === 1){
                        HSCJOfflineEngine.debug("开始查询离线记录身份信息！"+idCard);
                        HSCJApiProvider.cardNoInfo(idCard,{
                            onSuccess:(code,msg,datas)=>{
                                const data = ((datas??{}).result??[])[0]??{};
                                samplingRecord(resolve, reject, data,tubNo);
                            },
                            onFailure:(code,msg,status)=>{
                                reject();
                            }
                        });
                    }
                    else{
                        HSCJOfflineEngine.debug("开始上传离线记录！"+idCard);
                        await samplingRecord(resolve, reject, data,tubNo);
                    }
                }
            },
            onFailure:(err)=>{
                HSCJOfflineEngine.debug("离线待上传记录查询失败！");
                reject();
            }
        });
    };

    /* 查询待处理的所有试管 */
    requestOfflineInfo = function (resolve, reject){
        HSCJOfflineEngine.debug("开始查询待上传试管编号！");
        OfflineSamplingManager.listProcessingTubNo({
            onSuccess:(datas)=>{
                if((datas?.length??0) === 0){
                    HSCJOfflineEngine.debug("无可上传离线试管！");
                    resolve({});
                }
                else{
                    const tubNo = datas[0].testNum;
                    HSCJOfflineEngine.debug("查询到待处理试管编号["+tubNo+"]");
                    HSCJOfflineEngine.setCurrentProcessingOfflineTubNo(tubNo);
                    requestOfflineTubInfo(tubNo, resolve, reject);
                }
            },
            onFailure:(err)=>{
                HSCJOfflineEngine.debug("查询离线试管编号失败！");
                reject();
            }
        })
    };

    while(true){
        HSCJOfflineEngine.debug("watchdog running");
        try {
            let isLogin = false;
            await new Promise(async (resolve, reject) => {
                setTimeout(reject,60000);
                if(HSCJLocalSettingManager.isBreakLineMode()){
                    HSCJLocalSettingManager.setOfflineMode(true);
                    isLogin = HSCJLocalSettingManager.getBreakLineLoginData().isLogin??false;
                    if(!isLogin){
                        HSCJOfflineEngine.debug("开始自动登录...");
                        await new Promise(async (resolve,reject)=>{
                            await autoLogin({
                                onSuccess:()=>{
                                    resolve();
                                },
                                onFailure:()=>{
                                    reject();
                                }
                            });
                        })
                            .then(()=>{isLogin = true;})
                            .catch(()=>{});
                    }
                    if(!isLogin){
                        reject();
                        return;
                    }
                }
                else{
                    if(!HSCJApiProvider.isLogin()){
                        reject();
                        return;
                    }
                    isLogin = true;
                }

                HSCJOfflineEngine.debug("开始处理离线采样记录...");
                let sCurrentProcessingOfflineTubNo = HSCJOfflineEngine.getCurrentProcessingOfflineTubNo();
                HSCJOfflineEngine.debug("当前处理试管编号："+sCurrentProcessingOfflineTubNo);
                if((sCurrentProcessingOfflineTubNo?.length??0) > 0)
                    requestOfflineTubInfo(resolve, reject, sCurrentProcessingOfflineTubNo);
                else
                    requestOfflineInfo(resolve, reject);
            })
            .then(async data=>{
                HSCJOfflineEngine.debug("同步更新控制台离线显示信息！");
                HSCJOfflineEngine.onDataChanged();
            })
            .catch(async err=>{});


            if(!isLogin){
                await FunctionUtils.sleep(30000);
                HSCJOfflineEngine.debug("等待登录！");
            }

            const avgPing = HSCJApiProvider.getPingAVG();
            let sleep = avgPing<1 ? 10000 : (avgPing*1.5);
            sleep = sleep < 500 ? 500 : sleep;
            const sCurrentProcessingOfflineTubNo = HSCJOfflineEngine.getCurrentProcessingOfflineTubNo();
            if((sCurrentProcessingOfflineTubNo?.trim()?.length??0) === 0){
                sleep = sleep < 3000 ? 3000 : sleep;
            }
            HSCJOfflineEngine.debug("等待继续处理离线采样记录["+sleep+"]ms");
            await FunctionUtils.sleep(sleep);
        }catch (e) {}
    }
    HSCJOfflineEngine.runOfflineAutomatically();
}

HSCJOfflineEngine.runOfflineAutomatically();
