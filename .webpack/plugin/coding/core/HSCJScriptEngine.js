/**
 * 核酸自动化采样脚本
 */
class HSCJScriptEngine{

    static debug(msg){}
    static warn (msg){}
    static speak(msg,enque,rate,pitch){}

    /*试管容量*/
    static getCapacityEle     (){ }
    /*试管编号*/
    static getBarcodeEle      (){ }
    /*居民码*/
    static getPeopleEle       (){ }
    /*证件类型*/
    static getIdTypeEle       (){ }
    /*证件号*/
    static getIdNoEle         (){ }
    /*证件读取按钮*/
    static getReadIdBtn       (){ }
    /*姓名*/
    static getNameEle         (){ }
    /*手机号码*/
    static getPhoneEle        (){ }
    /*镇*/
    static getTownEle         (){ }
    /*村*/
    static getVillageEle      (){ }
    /*小区*/
    static getCommunityEle    (){ }
    /*人员类别*/
    static getOccupationEle   (){ }
    /*采样点*/
    static getSamplingSiteEle (){ }
    /*采样时间*/
    static getSamplingTimeEle (){ }
    /*同试管已采样人数*/
    static getSamplingCountEle(){ }
    /*住址*/
    static getAddressEle      (){ }
    /*附加说明*/
    static getMarkEle         (){ }

    /*设置试管已采样数量*/
    static setTubCountDisplay (num){}
    /*获取采样url*/
    static getSamplingPage    (){}
    /*是否是采样页面*/
    static isSamplingPage     (){}
    /*读取身份证*/
    static click2ReadIdCard   (){ DOMUtils.click(HSCJScriptEngine.getReadIdBtn()); }
    /* 重置核酸输入信息（保留条码） */
    static resetHSCJInput     (){}
    /* 清空核酸输入信息 */
    static clearHSCJInput     (){}

    /*移除条码长度过长警告*/
    static clearBarcodeWarnMessage (){ }
    /*移除读卡失败警告*/
    static clearReadIdWarnMessage  (){ }
    /*移除采样满弹窗*/
    static closeBarcodeFullDialog  (){ }

    /* 播报扫描健康码 */
    static playScanMusic(){ MessageManager.Content.playScanMusic(); }
    /* 播报开始提交采样音乐 */
    static playConfirmMusic(){ MessageManager.Content.playConfirmMusic(); }
    /* 播放错误音乐 */
    static playErrorMusic(){ MessageManager.Content.playErrorMusic(); }

    /* 服务响应后与脚本同步 */
    static setWaitResponseFlag(isWait){ HSCJScriptEngine.bWaitResponseFlag = isWait; };
    static isWaitResponseFlag(){ return HSCJScriptEngine.bWaitResponseFlag === true; };
    /* 已录入的试管编号 */
    static setLastInputBarcode(barcode){ HSCJScriptEngine.sLastInputBarcode = barcode; }
    static getLastInputBarcode(){ return HSCJScriptEngine.sLastInputBarcode??""; };
    /* 当前正在处理的健康码 */
    static setLastHealthQRCode(code){ HSCJScriptEngine.sLastHealthQRCode = code; }
    static getLastHealthQRCode(){ return HSCJScriptEngine.sLastHealthQRCode??""; }
    /* 当前正在处理的身份号 */
    static setLastInputIdNo(id){ HSCJScriptEngine.sLastInputIdNo = id?.toUpperCase(); }
    static getLastInputIdNo(){ return HSCJScriptEngine.sLastInputIdNo??""; }
    /* 同一个身份证占据输入框的时间 */
    static setLastStartInputIdNoTimestamp(time){ HSCJScriptEngine.lLastStartInputIdNoTimestamp = time; }
    static getLastStartInputIdNoTimestamp(){ return HSCJScriptEngine.lLastStartInputIdNoTimestamp??0; }
    /* 上次提交采样的身份号 */
    static setLastConfirmedIdNo(idNo){ HSCJScriptEngine.sLastConfirmedIdNo = idNo; }
    static getLastConfirmedIdNo(){ return HSCJScriptEngine.sLastConfirmedIdNo??""; }
    /* 响应身份号信息的控制器 */
    static setFindPeopleController(controller){ HSCJScriptEngine.oFindPeopleController = controller; }
    static getFindPeopleController(){ return HSCJScriptEngine.oFindPeopleController??{}; }
    /* 响应健康码信息的控制器 */
    static setFindHealthQRInfoController(controller){ HSCJScriptEngine.oFindHealthQRInfoController = controller; }
    static getFindHealthQRInfoController(){ return HSCJScriptEngine.oFindHealthQRInfoController??{}; }
    /* 响应提交采样信息的控制器 */
    static setConfirmController(controller){ HSCJScriptEngine.oConfirmController = controller; }
    static getConfirmController(){ return HSCJScriptEngine.oConfirmController??{}; }

    /* 设置手动录入 */
    static setManualInput(isManual){ HSCJScriptEngine.ManualInputState = isManual; }
    /* 判断手动录入 */
    static isManualInput(){ return HSCJScriptEngine.ManualInputState === true; }

    /* 启动脚本 */
    static startScript(){ HSCJScriptEngine.setScriptState(true); }
    /* 停止脚本 */
    static stopScript(){ HSCJScriptEngine.setScriptState(false); }
    /* 设置脚本启动状态 */
    static setScriptState(run){ HSCJScriptEngine.runScript(run); }
    /* 状态变化监听 */
    static onScriptStateChanged(run){}
    /* 判断脚本是否已启动 */
    static isScriptRunning(){ return HSCJScriptEngine.scriptRunningState === true; }
    /* 启停脚本 */
    static runScript(run){}
    /* 脚本：自动填充试管容量 */
    static autoFillCapacity(){}
    /* 脚本：条码空事件 */
    static onBarcodeEmpty(){}
    /* 脚本：输入条码事件 */
    static onInputBarcode(){}
    /* 脚本：验证扫描条码事件 */
    static onBarcodeCheck(){}
    /* 脚本：验证条码事件 */
    static onVerifyBarcode(){}
    /* 脚本：健康码解析请求保障，防止未请求或已请求未更新UI, onblur */
    static onBlurPeopleIDEle(){}
    /* 脚本：验证健康码事件 */
    static onVerifyHealthQRCode(){}
    /* 脚本：证件号重复检测事件 */
    static onIdNoSameChecking(){}
    /* 脚本：身份号请求保障，防止未请求或已请求不更新UI, onblur */
    static onBlurIdEle(){}
    /* 脚本：验证证件号事件 */
    static onVerifyIdNo(){}
    /* 脚本：等待用户信息事件 */
    static onWaitingPeopleInfo(){}
    /* 脚本：手动录入事件 */
    static onManualInput(){}
    /* 脚本：验证姓名事件 */
    static onVerifyName(){}
    /* 脚本：验证手机号码事件 */
    static onVerifyPhone(){}
    /* 脚本：采样事件 */
    static onConfirm(){}
    /* 脚本：自动等待接口响应信息 */
    static onAutoWaitResponse(){}

    /* 提交采样记录 */
    static click2CommitSampling(){}

    /* 读卡设备读卡回调 */
    static onReadIdCard(idCard){}
    /* 摄像头图片文本识别回调 */
    static onOCRCallback(idCard){}
    /* 摄像头二维码识别回调 */
    static onQRCodeCallback(code){}
    /* 摄像头条码识别回调 */
    static onBarcodeCallback(code){}

    /* API消息处理 */
    static handleApiMessage(message){}
    /* 采样试管已满 */
    static onBarcodeFull(){}
    /* 采样试管按回车 */
    static onBarcodeEnter(){}

    /* 快捷键响应控制脚本 */
    static onControlScript(){}
    /* 试管信息API通知 */
    static onTubInfoNotify(){}
    /* 获取身份信息API通知 */
    static onIdNoInfoNotify(){}
    /* 解码健康码API通知 */
    static onHealthQRInfoNotify(){}
    /* 采样结果API通知 */
    static onSamplingResultNotify(){}

}
HSCJScriptEngine.sLastInputBarcode = "";
HSCJScriptEngine.sLastHealthQRCode = "";
HSCJScriptEngine.sLastInputIdNo    = "";
HSCJScriptEngine.lLastStartInputIdNoTimestamp = 0;
HSCJScriptEngine.sLastConfirmedIdNo = "";
HSCJScriptEngine.oFindPeopleController = {};
HSCJScriptEngine.oConfirmController = {};

HSCJScriptEngine.lSpeakBarcodeTimestamp = 0;
HSCJScriptEngine.lSyncIdNoTimestamp = 0;
HSCJScriptEngine.lStartInputHQRTimestamp = 0;
HSCJScriptEngine.lSpeakBarcodeTimestamp = 0;

HSCJScriptEngine.scriptRunningState = false;
HSCJScriptEngine.tag = "ScriptEngine";
HSCJScriptEngine.Message = {
    params:{
        code:"code",
        msg :"msg",
        data:"data"
    },
    types:{
        onControlScript       :"onControlScript",
        onTubInfoNotify       :"onTubInfoNotify",
        onIdNoInfoNotify      :"onIdNoInfoNotify",
        onHealthQRInfoNotify  :"onHealthQRInfoNotify",
        onSamplingResultNotify:"onSamplingResultNotify",
    }
};

HSCJScriptEngine.debug = function (msg) {
    if(msg == null) return;
    LogUtils.log(msg,HSCJScriptEngine.tag);
};
HSCJScriptEngine.warn  = function (msg) {
    if(msg == null) return;
    LogUtils.warn(msg,HSCJScriptEngine.tag);
};

HSCJScriptEngine.speak = MessageManager.Content.speak;

HSCJScriptEngine.resetHSCJInput = async function(){
    HSCJScriptEngine.debug("重置采样数据界面UI");

    HSCJScriptEngine.setManualInput(false);
    HSCJScriptEngine.closeBarcodeFullDialog();

    const eBarcode = HSCJScriptEngine.getBarcodeEle();
    let barcode = DOMUtils.read(eBarcode);
    if((barcode?.trim()?.length??0) === 0){
        barcode = HSCJScriptEngine.getLastInputBarcode();
    }

    HSCJScriptEngine.clearHSCJInput();
    await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);

    DOMUtils.focus(eBarcode);
    DOMUtils.write(eBarcode,"");

    if((barcode?.length??0) > 0){
        DOMUtils.write(eBarcode,barcode);
        DOMUtils.input(eBarcode,barcode);
        await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
        DOMUtils.blur(eBarcode);
        DOMUtils.focus(HSCJScriptEngine.getIdNoEle());
    }

    /*
    [
        HSCJScriptEngine.getPeopleEle(),
        HSCJScriptEngine.getIdNoEle(),
        HSCJScriptEngine.getNameEle(),
        HSCJScriptEngine.getAddressEle(),
        HSCJScriptEngine.getPhoneEle()
    ].forEach(ele => {
        DOMUtils.write(ele,"");
        DOMUtils.deleteHSCJ(ele);
    });
    */
}

HSCJScriptEngine.autoFillCapacity = function () {
    const eCapacity = HSCJScriptEngine.getCapacityEle();
    const capacity = parseInt(DOMUtils.read(eCapacity)??"0");
    const target   = parseInt(HSCJLocalSettingManager.getBarcodeCommitNum());
    if(capacity === target) return;
    DOMUtils.focus(eCapacity);
    DOMUtils.deleteHSCJ(eCapacity);
    DOMUtils.write(eCapacity,target);
    DOMUtils.copyHSCJ(eCapacity);
    DOMUtils.change(eCapacity);
    DOMUtils.blur(eCapacity);
}

HSCJScriptEngine.onBarcodeEmpty = function (eBar) {
    HSCJScriptEngine.setLastInputBarcode("");
    HSCJScriptEngine.setManualInput(false);
    DOMUtils.focus(eBar);

    HSCJScriptEngine.debug("\t等待试管条码输入或扫描...");

    const time = HSCJScriptEngine.lSpeakBarcodeTimestamp??0;
    const now  = new Date().getTime();
    if(now - time> 5000){
        HSCJScriptEngine.lSpeakBarcodeTimestamp = now;
        HSCJScriptEngine.speak("等待更换试管！");
    }
    return false;
}

HSCJScriptEngine.onInputBarcode = function (eBar) {
    const barcode = DOMUtils.read(eBar);
    /*如果是扫描条码且是非法的条码长度（扫到身份证或扫了两次条码）*/
    if(HSCJScriptEngine.getLastInputBarcode().length===0 && barcode.length>5){
        DOMUtils.blur(eBar);
        HSCJScriptEngine.debug("\t检测到条码录入完毕！");
        return false;
    }

    const time = HSCJScriptEngine.lSpeakBarcodeTimestamp??0;
    const now  = new Date().getTime();
    if(now - time> 5000){
        HSCJScriptEngine.lSpeakBarcodeTimestamp = now;
        HSCJScriptEngine.speak("等待试管录入！");
    }
    HSCJScriptEngine.setLastInputBarcode(barcode);
    HSCJScriptEngine.debug("\t等待试管条码编号输入完毕...");
    return false;
}

HSCJScriptEngine.onBarcodeCheck = async function (eBar) {
    const barcode = DOMUtils.read(eBar);
    HSCJScriptEngine.setLastInputBarcode(barcode);

    let bIsInvalidBarcode = true;
    if(HSCJLocalSettingManager.configOfBarcodeMatchRule.length === 0){
        bIsInvalidBarcode = barcode.length !== HSCJLocalSettingManager.configOfBarcodeLength;
    }
    else{
        const bIsMatchRule = CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfBarcodeMatchRule,barcode);
        if(!bIsMatchRule){
            bIsInvalidBarcode = barcode.length !== HSCJLocalSettingManager.configOfBarcodeLength;
        }
    }
    HSCJScriptEngine.debug("\t验证条码编号["+barcode+"]合法性:"+!bIsInvalidBarcode);
    if(bIsInvalidBarcode){
        DOMUtils.write(eBar,"");
        HSCJScriptEngine.debug("\t条码非法，等待重新输入条码！");
        HSCJScriptEngine.speak("条码非法，请重新输入条码！");
        HSCJScriptEngine.setLastInputBarcode("");
        DOMUtils.focus(eBar);
        return false;
    }

    const eBarcode = HSCJScriptEngine.getBarcodeEle();
    if((eBarcode?.parentNode?.parentNode?.parentNode?.className?.indexOf("error")??-1)>-1){
        HSCJScriptEngine.debug("\t检测到该条码未触发请求！");
        const oLast = HSCJScriptEngine.onBarcodeCheck.oLastProcessInfo??{};
        if(oLast.barcode === barcode) return true;

        HSCJScriptEngine.onBarcodeCheck.oLastProcessInfo = {barcode:barcode};

        DOMUtils.focus(eBarcode);
        DOMUtils.deleteHSCJ(eBarcode);
        DOMUtils.write(eBarcode,barcode);
        DOMUtils.copyHSCJ(eBarcode);
        DOMUtils.blur(eBarcode);
        DOMUtils.change(eBarcode);
        return false;
    }
    return true;
}

HSCJScriptEngine.onVerifyBarcode = async function () {
    await HSCJScriptEngine.onAutoWaitResponse();
    const eBar   = HSCJScriptEngine.getBarcodeEle();
    const barcode= DOMUtils.read(eBar);

    HSCJScriptEngine.debug("\t读取试管编号："+barcode+" 长度："+(barcode?.length??0));
    /*条码为空*/
    if((barcode?.length??0) === 0){
        if(!HSCJScriptEngine.onBarcodeEmpty(eBar)) return false;
    }

    /*条码正在输入*/
    if(DOMUtils.isFocused(eBar)) {
        if(!HSCJScriptEngine.onInputBarcode(eBar)) return false;
    }

    if(!await HSCJScriptEngine.onBarcodeCheck(eBar)) return false;

    HSCJScriptEngine.debug("\t条码验证通过！");
    return true;
}

HSCJScriptEngine.onBlurPeopleIDEle = async function (){
    const sLastHQCode = HSCJScriptEngine.getLastHealthQRCode();
    if(!CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfHealthyRule,sLastHQCode)) return;

    const now   = new Date().getTime();
    HSCJScriptEngine.lStartInputHQRTimestamp = now;
    const eLast = HSCJScriptEngine.getFindHealthQRInfoController();
    HSCJScriptEngine.debug("健康码解析试拒："+JSON.stringify({code:sLastHQCode,last:eLast}));
    if(!FunctionUtils.isNull(eLast?.resolve)){
        if(eLast.qrcode === sLastHQCode){
            if(now - eLast.time < 10000) return;
        }
        HSCJScriptEngine.debug("健康码解析拒绝！");
        try {eLast.reject("获取健康码超时！");} catch (e) {}
    }
    if(!CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfHealthyRule,sLastHQCode)) return;
    if(!HSCJScriptEngine.isScriptRunning()) return;

    const ePeopleId  = HSCJScriptEngine.getPeopleEle();
    const qrcode     = DOMUtils.read(ePeopleId);
    if((qrcode?.trim()?.length??0) === 0) return;
    if(!CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfHealthyRule,qrcode)) return;

    HSCJScriptEngine.debug("健康码请求解析："+JSON.stringify({code:qrcode, time:new Date(now).Format("yyyy-MM-dd hh:mm:ss")}));
    const oRequestHealthQRCodeController = {
        executor: async (resolve, reject) => {
            oRequestHealthQRCodeController.resolve = resolve;
            oRequestHealthQRCodeController.reject = reject;
            const oResult = HSCJScriptEngine.onHealthQRInfoNotify.oResult;
            const lastHQ  = oResult?.info?.healthCode;
            if(lastHQ === qrcode){
                if(oResult.code === 0){
                    try {resolve(oResult.datas);} catch (e) {}
                }
                else{
                    try {reject(oResult.err);} catch (e) {}
                }
                return;
            }

            setTimeout(()=>{
                try {oRequestHealthQRCodeController.reject("获取健康码超时！");} catch (e) {}
            },15000);
        },
        qrcode  : qrcode,
        time    : now
    };
    HSCJScriptEngine.setFindHealthQRInfoController(oRequestHealthQRCodeController);
    new Promise( async (resolve, reject) => oRequestHealthQRCodeController.executor(resolve, reject))
        .then(async(datas)=>{
            if(HSCJScriptEngine.getLastHealthQRCode() !== oRequestHealthQRCodeController.qrcode) return;
            if(oRequestHealthQRCodeController.process === true) return;
            oRequestHealthQRCodeController.process = true;

            try {
                await HSCJScriptEngine.onAutoWaitResponse();
                HSCJScriptEngine.setWaitResponseFlag(true);

                HSCJScriptEngine.playScanMusic();
                HSCJScriptEngine.debug("健康码解析返回成功信息！");
                HSCJScriptEngine.setLastHealthQRCode("");
                DOMUtils.write(HSCJScriptEngine.getPeopleEle(), "");

                if(Object.keys(datas??{}).length<1) {
                    HSCJScriptEngine.debug("健康码无效！");
                    HSCJScriptEngine.speak("健康码无效！",true,1.7);
                    return;
                }

                const data = datas;

                const eIdNo = HSCJScriptEngine.getIdNoEle();
                if (DOMUtils.isEmpty(eIdNo)) {
                    HSCJScriptEngine.debug("健康码解析补全身份号信息！");
                    DOMUtils.focus(eIdNo);
                    DOMUtils.write(eIdNo, data.idCard?.toUpperCase() ?? "");
                    await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                    DOMUtils.blur(eIdNo);
                }

                const eName = HSCJScriptEngine.getNameEle();
                if (DOMUtils.isEmpty(eName)) {
                    HSCJScriptEngine.debug("健康码解析补全姓名信息！");
                    DOMUtils.focus(eName);
                    DOMUtils.write(eName, data.fullName ?? "");
                    await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                    DOMUtils.blur(eName);
                }

                const ePhone = HSCJScriptEngine.getPhoneEle();
                if (DOMUtils.isEmpty(ePhone)) {
                    HSCJScriptEngine.debug("健康码解析补全手机号信息！");
                    DOMUtils.focus(ePhone);
                    DOMUtils.write(ePhone, data.mobile ?? "");
                    await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                    DOMUtils.blur(ePhone);
                }
                HSCJScriptEngine.debug("健康码解析处理完毕！");
            } finally {
                HSCJScriptEngine.setWaitResponseFlag(false);
            }
        })
        .catch(async (err)=>{
            if(HSCJScriptEngine.getLastHealthQRCode()!==oRequestHealthQRCodeController.qrcode) return;
            if(oRequestHealthQRCodeController.process === true) return;
            oRequestHealthQRCodeController.process = true;

            try {
                if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
                HSCJScriptEngine.setWaitResponseFlag(true);

                HSCJScriptEngine.debug("健康码解析返回错误信息:"+err);
                HSCJScriptEngine.playErrorMusic();
                HSCJScriptEngine.speak(err,true,1.7);
                DOMUtils.write(HSCJScriptEngine.getPeopleEle(), "");
                HSCJScriptEngine.setLastHealthQRCode("");
                HSCJScriptEngine.debug("健康码解析处理完毕！");
            } finally {
                HSCJScriptEngine.setWaitResponseFlag(false);
            }
        });
};

HSCJScriptEngine.onVerifyHealthQRCode = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    HSCJScriptEngine.debug("\t开始验证健康码信息...");
    const ePeople = HSCJScriptEngine.getPeopleEle();

    /*健康码等待服务返回数据*/
    const peopleIdText = DOMUtils.read(HSCJScriptEngine.getPeopleEle());
    if(peopleIdText?.trim()?.length === 0) {
        HSCJScriptEngine.debug("\t健康码为空！");
        return true;
    }

    const sLastHQR = HSCJScriptEngine.getLastHealthQRCode();
    const now  = new Date().getTime();
    if(sLastHQR === peopleIdText){
        const time = HSCJScriptEngine.lStartInputHQRTimestamp??0;
        if(now - time >= HSCJLocalSettingManager.configOfIDExpired){
            HSCJScriptEngine.lStartInputHQRTimestamp = now;
            DOMUtils.write(HSCJScriptEngine.getIdNoEle(),"");
            DOMUtils.write(HSCJScriptEngine.getPeopleEle(),"");
            HSCJScriptEngine.setManualInput(false);
            DOMUtils.focus(HSCJScriptEngine.getIdNoEle());
            HSCJScriptEngine.playErrorMusic();
            HSCJScriptEngine.speak("健康码无效！",true,1.7);
            HSCJScriptEngine.debug("\t健康码无效，本地超时！");
        }
    }
    else{
        HSCJScriptEngine.lStartInputHQRTimestamp = now;
        HSCJScriptEngine.setLastHealthQRCode(peopleIdText);
        HSCJScriptEngine.debug("\t健康码等待验证："+peopleIdText);
    }
    return false;
}

HSCJScriptEngine.onIdNoSameChecking = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    const now        = new Date().getTime();
    const eIdNo      = HSCJScriptEngine.getIdNoEle();
    const sLastIdNo  = HSCJScriptEngine.getLastConfirmedIdNo();
    const sIdNo      = DOMUtils.read(eIdNo);
    const isReadSame = sLastIdNo.length>0 && sIdNo.trim()===sLastIdNo && (now - (HSCJScriptEngine.lSameCheckingIdNoTimestamp??0) < 5000);
    const isIdEmpty  = (sIdNo?.trim()?.length??0)===0;

    HSCJScriptEngine.debug("\t正在验证身份号重复性！"+JSON.stringify({lastConfirmedIdNo:sLastIdNo,idNo:sIdNo,isSame:isReadSame,isIdEmpty}));

    if(isIdEmpty || isReadSame){
        if(isReadSame){
            HSCJScriptEngine.lSameCheckingIdNoTimestamp = now;
            HSCJScriptEngine.debug("\t检测到同一个身份信息！");
            await HSCJScriptEngine.resetHSCJInput();
            return false;
        }

        HSCJScriptEngine.debug("\t尝试让读卡器读取身份信息...");
        HSCJScriptEngine.setManualInput(false);

        let configOfReadIDMaximumContinuousCount = HSCJLocalSettingManager.configOfReadIDMCC??1;
        if(configOfReadIDMaximumContinuousCount<1) configOfReadIDMaximumContinuousCount = HSCJLocalSettingManager.configOfReadIDMCC = 1;
        for(let j =0;j<configOfReadIDMaximumContinuousCount;++j){
            if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
            if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;
            HSCJScriptEngine.debug("\t开始第["+(j+1)+"]次读卡！");
            HSCJScriptEngine.click2ReadIdCard();
            DOMUtils.focus(eIdNo);
            const idText = DOMUtils.read(eIdNo);
            if((idText?.length??0)>0) {
                HSCJScriptEngine.debug("\t读取到身份号：["+idText+"]！停止读卡循环！");
                break;
            }
            if(j%2 === 1) HSCJScriptEngine.clearReadIdWarnMessage();
            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfReadIDInterval);
        }

        return false;
    }

    return true;
}

HSCJScriptEngine.onBlurIdEle = async ()=>{
    const sLastIdNo  = HSCJScriptEngine.getLastInputIdNo();
    const isValidIdCard = CheckUtils.isValidIdCard(sLastIdNo);
    const isMatchIdRule = CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfInputIDRule,sLastIdNo);
    if(!(isValidIdCard || isMatchIdRule)) return;

    const now   = new Date().getTime();
    const eLast = HSCJScriptEngine.getFindPeopleController();
    HSCJScriptEngine.debug("身份号信息解析试拒："+JSON.stringify({lastIdNo:sLastIdNo, isValidIdCard, isMatchIdRule, eLast}));
    if(!FunctionUtils.isNull(eLast?.reject)){
        if(eLast?.idNo === HSCJScriptEngine.getLastInputIdNo()){
            if(now - eLast.time <= 10000) return;
        }
        HSCJScriptEngine.debug("身份号解析拒绝！");
        try {eLast.reject();} catch (e) {}
    }

    if(!HSCJScriptEngine.isScriptRunning()) return;

    const eId  = HSCJScriptEngine.getIdNoEle();
    const idNo = DOMUtils.read(eId)?.toUpperCase();
    if((idNo?.trim()?.length??0)===0) return;

    HSCJScriptEngine.debug("身份号信息请求解析："+JSON.stringify({idNo,time:new Date(now).Format("yyyy-MM-dd hh:mm:ss")}));
    const oRequestPeopleInfoController = {
        executor: async (resolve, reject) => {
            oRequestPeopleInfoController.resolve = resolve;
            oRequestPeopleInfoController.reject = reject;
            const oResult = HSCJScriptEngine.onIdNoInfoNotify.oResult;
            const resultIdNo = oResult?.info?.idCard?.toUpperCase();
            if(resultIdNo === idNo){
                if(oResult.code === 0){
                    resolve(oResult.datas);
                }
                else{
                    reject(oResult.msg??"网络错误");
                }
                return;
            }
            setTimeout(()=>{
                try {oRequestPeopleInfoController.reject("获取人员信息超时！");} catch (e) {}
            },15000);
        },
        idNo    : idNo,
        time    : now
    };

    HSCJScriptEngine.setFindPeopleController(oRequestPeopleInfoController);
    new Promise(async (resolve, reject) => oRequestPeopleInfoController.executor(resolve, reject))
        .then(async (datas)=>{
            if((HSCJScriptEngine.getLastInputIdNo()?.toUpperCase()) !== idNo) return;
            if(oRequestPeopleInfoController.process === true) return;
            oRequestPeopleInfoController.process = true;

            try {
                await HSCJScriptEngine.onAutoWaitResponse();
                HSCJScriptEngine.setWaitResponseFlag(true);

                HSCJScriptEngine.debug("身份号解析返回成功信息！");
                DOMUtils.focus(HSCJScriptEngine.getNameEle());
                if ((datas?.result?.length ?? 0) === 0) {
                    HSCJScriptEngine.playErrorMusic();
                    HSCJScriptEngine.speak("需要手动输入！");
                    HSCJScriptEngine.debug("\t无此身份号信息，需要手动录入！");
                    return;
                }

                /* 自动补填身份数据 */
                setTimeout(async () => {
                    if(idNo !== DOMUtils.read(eId)?.toUpperCase()) return;

                    try {
                        await HSCJScriptEngine.onAutoWaitResponse();
                        HSCJScriptEngine.setWaitResponseFlag(true);

                        const data = datas.result[0];
                        if (DOMUtils.isEmpty(HSCJScriptEngine.getIdNoEle())) return;
                        const eName = HSCJScriptEngine.getNameEle();
                        if (DOMUtils.isEmpty(eName)) {
                            HSCJScriptEngine.debug("\t开始补填姓名信息！");
                            DOMUtils.focus(eName);
                            DOMUtils.write(eName, data.fullName ?? "");
                            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                            DOMUtils.blur(eName);
                        }

                        const ePhone = HSCJScriptEngine.getPhoneEle();
                        if (DOMUtils.isEmpty(ePhone)) {
                            HSCJScriptEngine.debug("\t开始补填手机号信息！");
                            DOMUtils.focus(ePhone);
                            DOMUtils.write(ePhone, data.mobile ?? data.phone ?? "");
                            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                            DOMUtils.blur(ePhone);
                        }

                        HSCJScriptEngine.debug("\t身份号解析处理完毕！");
                    } finally {
                        HSCJScriptEngine.setWaitResponseFlag(false);
                    }
                }, HSCJLocalSettingManager.configOfSyncInternal * 3);
            } finally {
                HSCJScriptEngine.setWaitResponseFlag(false);
            }
        })
        .catch(async (err)=>{
            if((HSCJScriptEngine.getLastInputIdNo()?.toUpperCase()) !== idNo) return;
            if(oRequestPeopleInfoController.process === true) return;
            oRequestPeopleInfoController.process = true;

            try {
                await HSCJScriptEngine.onAutoWaitResponse();
                HSCJScriptEngine.setWaitResponseFlag(true);

                HSCJScriptEngine.debug("身份号解析返回错误信息！");
                HSCJScriptEngine.playErrorMusic();
                HSCJScriptEngine.speak("采集失败！")
                document.location = HSCJScriptEngine.getSamplingPage();
                await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                await HSCJScriptEngine.resetHSCJInput();
                HSCJScriptEngine.debug("\t身份号解析处理完毕！");
            } finally {
                HSCJScriptEngine.setWaitResponseFlag(false);
            }
        });
}

HSCJScriptEngine.onVerifyIdNo = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    HSCJScriptEngine.debug("开始验证身份号信息...");
    const eIdNo  = HSCJScriptEngine.getIdNoEle();

    /*判断是否正在输入身份号*/
    if(DOMUtils.isFocused(eIdNo)){
        const idText = DOMUtils.read(eIdNo);
        const isValidIdCard = CheckUtils.isValidIdCard(idText);
        /*粘贴或扫码*/
        if(isValidIdCard || CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfInputIDRule,idText)){
            HSCJScriptEngine.debug("检测到有效身份号："+idText);
            HSCJScriptEngine.setLastInputIdNo(idText);
            DOMUtils.blur(eIdNo);
            return true;
        }

        /* 判断是否是健康码 */
        if(CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfHealthyRule,idText)){
            HSCJScriptEngine.debug("检测到匹配健康码规则！");
            HSCJScriptEngine.setLastInputIdNo("");
            DOMUtils.write(eIdNo,"");
            DOMUtils.blur(eIdNo);
            if(CheckUtils.isRegexMatch("[0-9A-Za-z:]*::$",idText)){
                HSCJScriptEngine.debug("检测到健康码！");
                HSCJScriptEngine.speak("健康码",true,1.7);
            }
            if(CheckUtils.isRegexMatch("[a-zA-Z0-9]{0,5}#[a-zA-Z0-9+/]*={0,2}$",idText)){
                HSCJScriptEngine.debug("检测到一码通！");
                HSCJScriptEngine.speak("一码通",true,1.7);
            }
            const ePeople = HSCJScriptEngine.getPeopleEle();
            DOMUtils.focus(ePeople);
            DOMUtils.deleteHSCJ(ePeople);
            DOMUtils.write(ePeople,idText);
            HSCJScriptEngine.setLastHealthQRCode(idText);
            DOMUtils.copyHSCJ(ePeople);
            DOMUtils.change(ePeople);
            DOMUtils.blur(ePeople);
            HSCJScriptEngine.onBlurPeopleIDEle();
            return false;
        }

        /*手动输入*/
        HSCJScriptEngine.debug("正在输入身份号...");
        HSCJScriptEngine.setManualInput(true);
        HSCJScriptEngine.setLastInputIdNo(idText);
        HSCJScriptEngine.setLastStartInputIdNoTimestamp(new Date().getTime());
        return false;
    }

    const eIdNumber = HSCJScriptEngine.getIdNoEle();
    if((eIdNumber?.parentNode?.parentNode?.parentNode?.className?.indexOf("error")??-1) > -1){
        HSCJScriptEngine.debug("\t检测到该身份号未触发请求！");
        const idText = DOMUtils.read(eIdNumber).toUpperCase();
        const oLast  = HSCJScriptEngine.onVerifyIdNo.oLastProcessInfo??{};
        const now    = new Date().getTime();
        if(oLast.idNo === idText && now - oLast.time < 5000) return true;

        HSCJScriptEngine.onVerifyIdNo.oLastProcessInfo = {idNo:idText,time:now};

        eIdNumber.focus();
        DOMUtils.deleteHSCJ(eIdNumber);
        DOMUtils.write(eIdNumber,idText);
        DOMUtils.copyHSCJ(eIdNumber);
        HSCJScriptEngine.setLastInputIdNo(idText);
        DOMUtils.blur(eIdNumber);
        DOMUtils.change(eIdNumber);
        return false;
    }

    HSCJScriptEngine.debug("身份验证通过！");
    return true;
}

HSCJScriptEngine.onWaitingPeopleInfo = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;
    HSCJScriptEngine.onBlurIdEle();

    HSCJScriptEngine.debug("\t等待身份号信息返回...");
    let result = false;

    await FunctionUtils.sleep(HSCJApiProvider.getPingAVG()*1.5);

    if(!result && HSCJScriptEngine.getFindHealthQRInfoController()?.process === true){
        const oResult = HSCJScriptEngine.onHealthQRInfoNotify.oResult;
        const idNo    = oResult?.datas?.idCard?.toUpperCase();
        const currIdNo= DOMUtils.read(HSCJScriptEngine.getIdNoEle())?.toUpperCase();
        if(!FunctionUtils.isNull(idNo) && idNo === currIdNo){
            result = true;
            HSCJScriptEngine.debug("\t检测到身份信息返回来自健康码！");
        }
    }

    if(!result && HSCJScriptEngine.getFindPeopleController()?.process === true){
        const oResult = HSCJScriptEngine.onIdNoInfoNotify.oResult;
        const idNo    = (oResult?.datas?.result??{})[0]?.idCard?.toUpperCase();
        if(!FunctionUtils.isNull(idNo) && idNo === (HSCJScriptEngine.getLastInputIdNo()?.toUpperCase())){
            result = true;
            HSCJScriptEngine.debug("\t检测到身份信息返回来自身份号！");
        }
    }

    if(result){
        HSCJScriptEngine.debug("\t身份号信息已返回！");
    }

    return result;
}

HSCJScriptEngine.onManualInput = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    HSCJScriptEngine.debug("\t开始验证手动输入...");

    if(!HSCJScriptEngine.isManualInput()) {
        HSCJScriptEngine.debug("\t手动输入验证通过！");
        return true;
    }
    const eIdNo  = HSCJScriptEngine.getIdNoEle();
    const idText = DOMUtils.read(eIdNo);
    const isValidIdText = CheckUtils.isValidIdCard(idText) || CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfInputIDRule,idText);
    const eName  = HSCJScriptEngine.getNameEle();
    const ePhone = HSCJScriptEngine.getPhoneEle();

    /*手动输入完毕并且网络有该人员信息*/
    if(
        isValidIdText
        &&!DOMUtils.isFocused(eName)
        &&DOMUtils.read(eName)?.length > 0
        &&!DOMUtils.isFocused(ePhone)
        &&DOMUtils.read(eName)?.length > 0
    ){
        HSCJScriptEngine.debug("\t成员信息录入完毕...");
        HSCJScriptEngine.setManualInput(false);
    }
    else{
        if(DOMUtils.isFocused(eIdNo)){
            if(idText?.length === 17 && CheckUtils.isValidIdCard(idText+"X")){
                DOMUtils.write(eIdNo,idText+"X");
                HSCJScriptEngine.setLastInputIdNo(idText+"X");
                return false;
            }

            /*剔除身份证号尾部多余的X*/
            let id  = idText.toUpperCase();
            let chg = false;
            while(id.endsWith("XX")){
                chg = true;
                id = id.substring(0,id.length-1);
            }
            if(chg && CheckUtils.isValidIdCard(id)){
                DOMUtils.write(eIdNo,id);
                return false;
            }

            /*判断是否已经是合法的证件号*/
            const isValidIdCard = CheckUtils.isValidIdCard(idText);
            if(isValidIdCard || CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfInputIDRule,idText)){
                let idNo = idText;
                if(isValidIdCard){
                    idNo = idNo.toUpperCase();
                }
                HSCJScriptEngine.setManualInput(false);
                HSCJScriptEngine.setLastInputIdNo(idNo);
                DOMUtils.deleteHSCJ(eIdNo);
                DOMUtils.write(eIdNo,idNo);
                DOMUtils.copyHSCJ(eIdNo);
                HSCJScriptEngine.setLastInputIdNo(idNo);
                DOMUtils.blur(eIdNo);
                DOMUtils.change(eIdNo);
                return true;
            }

            /*判断已录入的证件号是否超时*/
            if(HSCJScriptEngine.getLastInputIdNo() === idText){
                const now = new Date().getTime();
                if(now - HSCJScriptEngine.getLastStartInputIdNoTimestamp() >= HSCJLocalSettingManager.configOfIDExpired){
                    DOMUtils.write(eIdNo,"");
                    HSCJScriptEngine.setManualInput(false);
                    return false;
                }
            }
            else{
                HSCJScriptEngine.setLastInputIdNo(idText);
                HSCJScriptEngine.setLastStartInputIdNoTimestamp(new Date().getTime());
            }

            HSCJScriptEngine.debug("\t等待身份号输入完毕...");
        }
        else if(DOMUtils.isFocused(eName)){
            const sNameText = DOMUtils.read(eName);
            const sFormat   = sNameText.replaceAll(/[\\u4e00-\\u9fa5`~!@#$%^&*()_\-+=<>?: "{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig,"");
            if(sNameText.length !== sFormat.length){
                DOMUtils.write(eName,sFormat);
            }
            HSCJScriptEngine.debug("\t等待姓名输入完毕...");
        }
        else if(DOMUtils.isFocused(ePhone)){
            HSCJScriptEngine.debug("\t等待手机号输入完毕...");
        }
        return false;
    }

    HSCJScriptEngine.debug("\t手动输入验证通过！");
    return true;
};

HSCJScriptEngine.onVerifyName = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    HSCJScriptEngine.debug("\t开始验证姓名信息...");

    const eName = HSCJScriptEngine.getNameEle();
    if((DOMUtils.read(eName)?.length??0) === 0){
        HSCJScriptEngine.debug("\t等待输入姓名...");
        HSCJScriptEngine.setManualInput(true);
        DOMUtils.focus(eName);
        return false;
    }
    HSCJScriptEngine.debug("\t姓名信息验证通过！");
    return true;
};

HSCJScriptEngine.onVerifyPhone = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    HSCJScriptEngine.debug("\t开始验证手机号信息...");

    const ePhone = HSCJScriptEngine.getPhoneEle();
    if((DOMUtils.read(ePhone)?.length??0) === 0){
        HSCJScriptEngine.debug("\t等待输入手机号...");
        HSCJScriptEngine.setManualInput(true);
        DOMUtils.focus(ePhone);
        return false;
    }
    HSCJScriptEngine.debug("\t手机号信息验证通过！");
    return true;
};

HSCJScriptEngine.onConfirm = async function () {
    if(!await HSCJScriptEngine.onAutoWaitResponse()) return false;
    if(DOMUtils.isFocused(HSCJScriptEngine.getBarcodeEle())) return false;

    const eLast = HSCJScriptEngine.getConfirmController();
    if(!FunctionUtils.isNull(eLast?.reject)){
        try {eLast.reject();} catch (e) {}
    }

    if(DOMUtils.isEmpty(HSCJScriptEngine.getIdNoEle()) && DOMUtils.isEmpty(HSCJScriptEngine.getPhoneEle()) && DOMUtils.isEmpty(HSCJScriptEngine.getNameEle())){
        return true;
    }

    const eId  = HSCJScriptEngine.getIdNoEle();
    const idNo = DOMUtils.read(eId)?.toUpperCase();
    const now = new Date().getTime();
    if((!FunctionUtils.isNull(idNo)) && (HSCJScriptEngine.getLastConfirmedIdNo()?.toUpperCase()) === idNo){
        if(now - (HSCJScriptEngine.lSyncIdNoTimestamp??0) < 5000){
            DOMUtils.write(eId,"");
            DOMUtils.focus(eId);
            HSCJScriptEngine.setManualInput(false);
            return false;
        }
    }
    HSCJScriptEngine.lSyncIdNoTimestamp = now;

    HSCJScriptEngine.debug("\t开始提交采样信息...");
    HSCJScriptEngine.playConfirmMusic();
    HSCJScriptEngine.setLastConfirmedIdNo(idNo);
    const oConfirmController = {
        executor: async (resolve, reject) => {
            oConfirmController.resolve = resolve;
            oConfirmController.reject = reject;

            const oResult = HSCJScriptEngine.onSamplingResultNotify.oResult;
            const resultIdNo = oResult?.info?.idCard?.toUpperCase();
            if(!FunctionUtils.isNull(idNo) && resultIdNo === idNo){
                if(oResult.code === 0){
                    resolve(oResult.datas);
                }
                else{
                    reject();
                }
                return;
            }

            setTimeout(()=>{
                if(oConfirmController.process !== true){
                    oConfirmController.process = true;
                    oConfirmController.reject("采样失败，请求超时！");
                }
            },15000);
        },
        idNo    : idNo,
        time    : now
    };
    HSCJScriptEngine.setConfirmController(oConfirmController);
    HSCJScriptEngine.click2CommitSampling();
    await new Promise(async (resolve, reject) => oConfirmController.executor(resolve,reject))
        .then((datas)=>{
            HSCJScriptEngine.setLastInputIdNo("");
        })
        .catch(()=>{
            /* 添加则已采样会一直报错 */
            /* HSCJScriptEngine.setLastConfirmedIdNo(""); */
        });
};

HSCJScriptEngine.onAutoWaitResponse = async function(){
    if(!HSCJScriptEngine.isScriptRunning()) return false;

    let result = true;
    while(HSCJScriptEngine.isWaitResponseFlag()){
        result = false;
        HSCJScriptEngine.debug("等待响应处理完毕！");
        await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
    }

    return result;
};

HSCJScriptEngine.runScript = async function (run) {
    const timestamp = HSCJScriptEngine.callRunScriptTimestamp ?? 0;
    const now = new Date().getTime();
    if(now - timestamp < 1000) return;
    HSCJScriptEngine.callRunScriptTimestamp = now;

    HSCJScriptEngine.speak(run?"启动脚本":"停止脚本",false);

    if(run === HSCJScriptEngine.scriptRunningState) return;

    HSCJScriptEngine.onScriptStateChanged(run);

    HSCJScriptEngine.scriptRunningState = run;

    if(!run) return;

    HSCJScriptEngine.speak("请确保英文输入法！",true,2.0);

    await HSCJScriptEngine.resetHSCJInput();
    HSCJScriptEngine.setWaitResponseFlag(false);

    while(HSCJScriptEngine.isScriptRunning()){
        try{
            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfTaskInterval);

            if(!HSCJScriptEngine.isSamplingPage()){
                HSCJScriptEngine.debug("runScript：等待切换到采样页面...");
                continue;
            }

            /* 1、清空所有的弹窗 */
            HSCJScriptEngine.debug("runScript：1、开始清空弹窗！");
            HSCJScriptEngine.closeBarcodeFullDialog();
            HSCJScriptEngine.clearReadIdWarnMessage();
            HSCJScriptEngine.closeBarcodeFullDialog();

            /* 2、验证脚本运行状态，防止在这段时间内停止脚本 */
            HSCJScriptEngine.debug("runScript：2、验证启动状态！");
            if(!HSCJScriptEngine.isScriptRunning()) break;

            /* 3、验证条码合法性 */
            HSCJScriptEngine.debug("runScript：3、验证条码合法性！");
            if(!await HSCJScriptEngine.onVerifyBarcode()) continue;

            HSCJScriptEngine.autoFillCapacity();

            /* 4、验证健康码合法性 */
            HSCJScriptEngine.debug("runScript：4、验证健康码合法性！");
            if(!await HSCJScriptEngine.onVerifyHealthQRCode()) continue;

            /* 5、证件号重复性检测 */
            HSCJScriptEngine.debug("runScript：5、证件号重复性检测！");
            if(!await HSCJScriptEngine.onIdNoSameChecking()) continue;

            /* 6、手动录入验证 */
            HSCJScriptEngine.debug("runScript：6、手动录入验证！");
            if(!await HSCJScriptEngine.onManualInput()) continue;

            /* 7、验证证件号合法性 */
            HSCJScriptEngine.debug("runScript：7、验证证件号合法性！");
            if(!await HSCJScriptEngine.onVerifyIdNo()) continue;

            /* 8、等待网络返回数据 */
            HSCJScriptEngine.debug("runScript：8、等待网络返回数据 ！");
            if(!await HSCJScriptEngine.onWaitingPeopleInfo()) continue;

            /* 9、姓名验证 */
            HSCJScriptEngine.debug("runScript：9、姓名验证！");
            if(!await HSCJScriptEngine.onVerifyName()) continue;

            /* 10、手机号验证 */
            HSCJScriptEngine.debug("runScript：10、手机号验证！");
            if(!await HSCJScriptEngine.onVerifyPhone()) continue;

            /* 11、提交及等待结果 */
            HSCJScriptEngine.debug("runScript：11、提交及等待结果！");
            await HSCJScriptEngine.onConfirm();
        }
        catch (e) {
            HSCJScriptEngine.warn(e);
        }
    }
}

HSCJScriptEngine.onReadIdCard = async function(idCard){
    HSCJScriptEngine.debug("onDeviceReadIdCard => "+ idCard);

    const now   = new Date().getTime();
    const oLast = HSCJScriptEngine.onReadIdCard.oLastProcessInfo??{};
    if(oLast.idCard === idCard && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;

    HSCJScriptEngine.onReadIdCard.oLastProcessInfo = {idCard,time:now};

    const eIdNo = HSCJScriptEngine.getIdNoEle();
    if(DOMUtils.isFocused(eIdNo) && DOMUtils.isEmpty(eIdNo)){
        HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo = {idCard:idCard,result:true,time:now};
        try {
            await HSCJScriptEngine.onAutoWaitResponse();
            HSCJScriptEngine.setWaitResponseFlag(true);

            DOMUtils.deleteHSCJ(eIdNo);
            DOMUtils.write(eIdNo,idCard.toUpperCase());
            DOMUtils.copyHSCJ(eIdNo);
            DOMUtils.change(eIdNo);
        }
        finally {
            HSCJScriptEngine.setWaitResponseFlag(false);
        }

        return true;
    }

    return false;
}

HSCJScriptEngine.onQRCodeCallback = async function (code){
    HSCJScriptEngine.debug("onCameraCallback => "+ code);

    const now   = new Date().getTime();
    const oLast = HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo??{};
    if(oLast.code === code && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;

    const eBar  = HSCJScriptEngine.getBarcodeEle();
    if(DOMUtils.isFocused(eBar) && DOMUtils.isEmpty(eBar)){
        const barcode = code;
        let bIsInvalidBarcode = true;
        if(HSCJLocalSettingManager.configOfBarcodeMatchRule.length === 0){
            bIsInvalidBarcode = barcode.length !== HSCJLocalSettingManager.configOfBarcodeLength;
        }
        else{
            const bIsMatchRule = CheckUtils.isRegexMatch(HSCJLocalSettingManager.configOfBarcodeMatchRule,barcode);
            if(!bIsMatchRule){
                bIsInvalidBarcode = barcode.length !== HSCJLocalSettingManager.configOfBarcodeLength;
            }
        }
        if(bIsInvalidBarcode) {
            HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo = {code,result:true,time:now};
            return false;
        }

        HSCJScriptEngine.playScanMusic();
        HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo = {code,result:true,time:now};
        try {
            await HSCJScriptEngine.onAutoWaitResponse();
            HSCJScriptEngine.setWaitResponseFlag(true);

            DOMUtils.deleteHSCJ(eBar);
            DOMUtils.write(eBar,code);
            DOMUtils.copyHSCJ(eBar);
            DOMUtils.blur(eBar);
            DOMUtils.change(eBar);
        }
        finally {
            HSCJScriptEngine.setWaitResponseFlag(false);
        }
        return true;
    }

    const eIdNo = HSCJScriptEngine.getIdNoEle();
    if(DOMUtils.isFocused(eIdNo) && DOMUtils.isEmpty(eIdNo)){
        HSCJScriptEngine.playScanMusic();
        HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo = {code,result:true,time:now};
        try {
            await HSCJScriptEngine.onAutoWaitResponse();
            HSCJScriptEngine.setWaitResponseFlag(true);

            DOMUtils.deleteHSCJ(eIdNo);
            DOMUtils.write(eIdNo,code);
            DOMUtils.copyHSCJ(eIdNo);
            DOMUtils.change(eIdNo);
        }
        finally {
            HSCJScriptEngine.setWaitResponseFlag(false);
        }

        return true;
    }

    return false;
}
HSCJScriptEngine.onQRCodeCallback.oLastProcessInfo = {};

HSCJScriptEngine.onOCRCallback    = HSCJScriptEngine.onQRCodeCallback

HSCJScriptEngine.onBarcodeCallback = async function(code){
    HSCJScriptEngine.debug("onCameraCallback => "+ code);

    const now   = new Date().getTime();
    const oLast = HSCJScriptEngine.onBarcodeCallback.oLastProcessInfo??{};
    if(oLast.code === code && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;

    const eBar = HSCJScriptEngine.getBarcodeEle();
    if(DOMUtils.isFocused(eBar) && DOMUtils.isEmpty(eBar)){
        HSCJScriptEngine.playScanMusic();
        HSCJScriptEngine.onBarcodeCallback.oLastProcessInfo = {code,result:true,time:now};
        try {
            await HSCJScriptEngine.onAutoWaitResponse();
            HSCJScriptEngine.setWaitResponseFlag(true);

            DOMUtils.deleteHSCJ(eBar);
            DOMUtils.write(eBar,code);
            DOMUtils.copyHSCJ(eBar);
            DOMUtils.blur(eBar);
            DOMUtils.change(eBar);
        }
        finally {
            HSCJScriptEngine.setWaitResponseFlag(false);
        }
        return true;
    }

    return false;
}
HSCJScriptEngine.onBarcodeCallback.oLastProcessInfo = {};

HSCJScriptEngine.handleApiMessage = async function (message) {
    const type = message.type;

    const requestInfo  = message.requestInfo??{};
    const responseInfo = message.responseInfo??{};

    const code = responseInfo?.code;
    const msg  = responseInfo?.msg;
    const data = responseInfo?.datas;

    switch (type) {
        case HSCJScriptEngine.Message.types.onTubInfoNotify:
            HSCJScriptEngine.onTubInfoNotify(requestInfo,code,msg,data);
            return true;
        case HSCJScriptEngine.Message.types.onIdNoInfoNotify:
            HSCJScriptEngine.onIdNoInfoNotify(requestInfo,code,msg,data);
            return true;
        case HSCJScriptEngine.Message.types.onHealthQRInfoNotify:
            HSCJScriptEngine.onHealthQRInfoNotify(requestInfo,code,msg,data);
            return true;
        case HSCJScriptEngine.Message.types.onSamplingResultNotify:
            HSCJScriptEngine.onSamplingResultNotify(requestInfo,code,msg,data);
            return true;
        case HSCJScriptEngine.Message.types.onControlScript:
            HSCJScriptEngine.onControlScript();
            return true;
        default:
            return false;
    }
}

HSCJScriptEngine.onControlScript = async function (){
    if(!HSCJScriptEngine.isSamplingPage()) {
        MessageManager.Content.speak("在录入页面才能启停脚本!");
    }

    if(HSCJScriptEngine.isScriptRunning()){
        HSCJScriptEngine.setScriptState(false);
    }
    else{
        HSCJScriptEngine.setScriptState(true);
    }
}

HSCJScriptEngine.onTubInfoNotify = async function (info, code, msg, datas){
    if(!HSCJScriptEngine.isSamplingPage()) return;
    if(code === 0){
        let tubeNum= info["tubeNum"]??"";
        let tubeCnt= datas?.length??0;
        let isLastConfirmed = HSCJApiReceiver.isConfirmed;
        HSCJScriptEngine.isConfirmed = false;
        HSCJScriptEngine.setTubCountDisplay(tubeCnt);
        if(HSCJLocalSettingManager.isBreakLineMode()){
            DOMUtils.write(HSCJScriptEngine.getSamplingCountEle(),tubeCnt);
        }
        let speakText = "";
        let speakRate = 1.4;

        if (tubeCnt === 0) {
            const lastSpeak = HSCJScriptEngine.onTubInfoNotify.sLastSpeakBarcode ??"";
            if(lastSpeak !== tubeNum){
                /*误扫入健康码*/
                if((tubeNum?.trim()?.length??0)<20){
                    speakText = tubeNum;
                    speakRate = 2.0;
                    await HSCJScriptEngine.resetHSCJInput();
                }
                HSCJScriptEngine.onTubInfoNotify.sLastSpeakBarcode = tubeNum;
            }

            HSCJScriptEngine.setLastInputBarcode(tubeNum);
            DOMUtils.focus(HSCJScriptEngine.getIdNoEle());
        } else if (tubeCnt === HSCJLocalSettingManager.configOfBarcodeCapacity) {
            speakText = HSCJLocalSettingManager.configOfBarcodeCapacity.toString();
            HSCJScriptEngine.setLastInputBarcode("");
            if (isLastConfirmed) {
                speakText = speakText + "换";
                HSCJScriptEngine.onBarcodeFull();
            }
        } else {
            speakText = tubeCnt+"";
            HSCJScriptEngine.setLastInputBarcode(tubeNum);
            DOMUtils.focus(HSCJScriptEngine.getIdNoEle());
        }
        HSCJScriptEngine.speak(speakText,true,speakRate);
    }
}

HSCJScriptEngine.onHealthQRInfoNotify = async function (info, code, msg, datas){
    if(!HSCJScriptEngine.isScriptRunning()) return;
    HSCJScriptEngine.debug("--->检测到健康码信息返回！");
    let err = "";
    if(msg!=null && msg.constructor === String && msg.trim().length>0){
        err = msg;
    }
    else{
        err = "健康码无效！";
    }

    HSCJScriptEngine.onHealthQRInfoNotify.oResult = {info, code, msg, datas,err};
    const controller = HSCJScriptEngine.getFindHealthQRInfoController();
    if(!FunctionUtils.isNull(controller?.resolve) && FunctionUtils.isNull(controller.process)) {
        HSCJScriptEngine.debug("--->开始与脚本同步健康码信息");
        if(code === 0){
            controller.resolve(datas);
        }
        else{
            controller.reject(err);
        }
        HSCJScriptEngine.debug("--->健康码信息同步成功！");
        return;
    }
    HSCJScriptEngine.debug("--->健康码信息同步失败！");
}

HSCJScriptEngine.onIdNoInfoNotify = async function (info, code,msg,datas){
    HSCJScriptEngine.isConfirmed = true;
    const idNo = (datas?.result??[])[0]?.idCard?.trim()?.toUpperCase();

    /* 防止离线采样播报两次 */
    HSCJScriptEngine.currentIdNo = idNo;
    HSCJScriptEngine.bSamplingNotifyFlag = true;

    if(!HSCJScriptEngine.isScriptRunning()) return;

    HSCJScriptEngine.debug("--->检测到身份信息返回！");
    HSCJScriptEngine.onIdNoInfoNotify.oResult = {info,code,msg,datas};

    const controller = HSCJScriptEngine.getFindPeopleController();
    if(!FunctionUtils.isNull(controller?.resolve) && FunctionUtils.isNull(controller.process)) {
        HSCJScriptEngine.debug("--->开始与脚本同步身份信息");
        if(code === 0){
            try {controller.resolve(datas);} catch (e) {}
        }
        else{
            try {controller.reject();} catch (e) {}
        }
        HSCJScriptEngine.debug("--->身份信息同步成功！");
        return;
    }
    HSCJScriptEngine.debug("--->身份信息同步失败！");
}

HSCJScriptEngine.onSamplingResultNotify = async function (info, code, msg, datas){
    const idNo = info?.idCard?.toString()?.toUpperCase()?.trim();
    /* 离线采样也会收到通知 */
    if(HSCJScriptEngine.currentIdNo !== idNo) return;
    /* 离线采样拦截一次，真实提交一次 */
    if(!HSCJScriptEngine.bSamplingNotifyFlag) return;
    HSCJScriptEngine.bSamplingNotifyFlag = false;

    if(code === 0 || !FunctionUtils.isNull(datas?.value)){
        let name = info.fullName;
        name = name.replaceAll(/[\\u4e00-\\u9fa5`~!@#$%^&*()_\-+=<>?: "{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig,"");
        HSCJApiReceiver.isConfirmed = true;
        HSCJScriptEngine.speak(name,true,1.5);
        HSCJScriptEngine.closeBarcodeFullDialog();
        HSCJScriptEngine.setManualInput(false);
    }
    else{
        HSCJScriptEngine.resetHSCJInput();
        HSCJScriptEngine.playErrorMusic();
        HSCJScriptEngine.speak(msg??"采样失败，请稍后！",true,1.7);
    }

    HSCJScriptEngine.onSamplingResultNotify.oResult = {info, code,msg,datas};

    HSCJScriptEngine.debug("--->检测到采样提交结果返回");
    const controller = HSCJScriptEngine.getConfirmController();
    if(!FunctionUtils.isNull(controller?.resolve)) {
        HSCJScriptEngine.debug("--->开始与脚本同步采样提交结果");
        if(code === 0 || !FunctionUtils.isNull(datas?.value)){
            try {controller.resolve(datas);} catch (e) {}
        }
        else{
            try {controller.reject();} catch (e) {}
        }
        HSCJScriptEngine.debug("--->采样提交结果同步成功！");
        return;
    }
    HSCJScriptEngine.debug("--->采样提交结果同步失败！");
}

HSCJScriptEngine.onBarcodeFull = async function (){
    HSCJScriptEngine.closeBarcodeFullDialog();
}

HSCJScriptEngine.onBarcodeEnter = async function (){
    DOMUtils.focus(HSCJScriptEngine.getIdNoEle());
}
