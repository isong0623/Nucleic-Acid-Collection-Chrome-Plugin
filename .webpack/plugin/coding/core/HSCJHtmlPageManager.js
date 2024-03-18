/**
 * 核酸采集页面控制器
 *
 * 负责核酸功能的耦合，核酸页面的整体控制
 */
class HSCJHtmlPageManager{
    /* 根据配置获取相应控件 */
    static eleOf (index) {
        const configs = HSCJLocalSettingManager.isBreakLineMode()?
                        HSCJLocalSettingManager.defaultOfElementsRule:
                        HSCJLocalSettingManager.configOfElementsRule;

        if((configs?.length??0)<=index) return null;
        return DOMUtils.getEleByConfig(configs[index])
    }
/********************************************************* 页面配置 *************************************************************/
    /*主页*/
    static getIndexPage   (){ return "https://hsjc.qingdao.gov.cn" }
    /*登录页面*/
    static getLoginPage   (){ return "https://hsjc.qingdao.gov.cn/#/login" }
    /*采样页面*/
    static getSamplingPage(){ return "https://hsjc.qingdao.gov.cn/#/check/scancheck" }
    /*历史记录页面*/
    static getHistoryPage (){ return "https://hsjc.qingdao.gov.cn/#/check/record" }
    /*转运页面*/
    static getTransferPage(){ return "https://hsjc.qingdao.gov.cn/#/check/transshipment" }

    /* 判断是否是采样页面 */
    static isSamplingPage(){}
/*********************************************************** DOM元素获取 ***********************************************************/
    /*试管容量*/
    static getCapacityEle         (){ return HSCJHtmlPageManager.eleOf(0 ); }
    /*试管编号*/
    static getBarcodeEle          (){ return HSCJHtmlPageManager.eleOf(1 ); }
    /*居民码*/
    static getPeopleEle           (){ return HSCJHtmlPageManager.eleOf(2 ); }
    /*证件类型*/
    static getIdTypeEle           (){ return HSCJHtmlPageManager.eleOf(3 ); }
    /*证件号*/
    static getIdNoEle             (){ return HSCJHtmlPageManager.eleOf(4 ); }
    /*证件读取按钮*/
    static getReadIdBtn           (){ return HSCJHtmlPageManager.eleOf(5 ); }
    /*姓名*/
    static getNameEle             (){ return HSCJHtmlPageManager.eleOf(6 ); }
    /*手机号码*/
    static getPhoneEle            (){ return HSCJHtmlPageManager.eleOf(7 ); }
    /*镇*/
    static getTownEle             (){ return HSCJHtmlPageManager.eleOf(8 ); }
    /*村*/
    static getVillageEle          (){ return HSCJHtmlPageManager.eleOf(9 ); }
    /*小区*/
    static getCommunityEle        (){ return HSCJHtmlPageManager.eleOf(10); }
    /*人员类别*/
    static getOccupationEle       (){ return HSCJHtmlPageManager.eleOf(11); }
    /*采样点*/
    static getSamplingSiteEle     (){ return HSCJHtmlPageManager.eleOf(12); }
    /*采样时间*/
    static getSamplingTimeEle     (){ return HSCJHtmlPageManager.eleOf(13); }
    /*同试管已采样人数*/
    static getSamplingCountEle    (){ return HSCJHtmlPageManager.eleOf(14); }
    /*住址*/
    static getAddressEle          (){ return HSCJHtmlPageManager.eleOf(15); }
    /*附加说明*/
    static getMarkEle             (){ return HSCJHtmlPageManager.eleOf(16); }
    /*确认采样按钮*/
    static getConfirmSamplingBtn  (){ return HSCJHtmlPageManager.eleOf(17); }
    /*重置采样按钮*/
    static getResetSamplingBtn    (){ return HSCJHtmlPageManager.eleOf(18); }
    /*条码警告弹窗确认按钮*/
    static getBarcodeWarnEle      (){ return HSCJHtmlPageManager.eleOf(19); }
    /*试管采样已满确认按钮*/
    static getBarcodeFullEle      (){ return HSCJHtmlPageManager.eleOf(20); }
    /*读卡警告吐司列表*/
    static getReadCardWarnListEle (){ return HSCJHtmlPageManager.eleOf(21); }

/*********************************************************** DOM元素操作 ***********************************************************/
    /*提交采样*/
    static click2CommitSampling    (){ DOMUtils.click(HSCJHtmlPageManager.getConfirmSamplingBtn()) }
    /*移除条码长度过长警告*/
    static clearBarcodeWarnMessage (){ DOMUtils.click(HSCJHtmlPageManager.getBarcodeWarnEle()) }
    /*移除读卡失败警告*/
    static async clearReadIdWarnMessage  (){ DOMUtils.remove(HSCJHtmlPageManager.getReadCardWarnListEle()) }
    /*移除采样满弹窗*/
    static closeBarcodeFullDialog  (){ DOMUtils.click(HSCJHtmlPageManager.getBarcodeFullEle()) }

    /*插件控制面板DOM*/
    static getControlDOM   (){}
    /*摄像头相关DOM*/
    static getCameraDOM    (){}
    /* 显示或隐藏相机 */
    static setCameraVisible(visible){}
    /* 摄像头整个组件包括canvas */
    static getCameraPanel  (){ return document.getElementById("idOfHscjCameraPanel"); }
    /*摄像头播放流Video*/
    static getCameraEle    (){ return document.getElementById("hscj_camera_video"); }
    /*摄像头流画布Canvas*/
    static getCanvasEle    (){ return document.getElementById("hscj_camera_canvas"); }
    /*试管人数水印DOM*/
    static getTubCountDOM  (){ }
    /*试管人数水印*/
    static getTubCountEle  (){ return document.getElementById("idOfBarcodeNumbersOfSampling"); }
    /*设置水印试管人数*/
    static setTubCountDisplay(num){ DOMUtils.innerHTML(HSCJHtmlPageManager.getTubCountEle(),num); }
    /* 清空证件号的按钮 */
    static getClearInputIdCardDOM(){}
    /* 清空证件号的按钮 */
    static getClearInputIdCardEle(){ return document.getElementById("idOfClearInputIdCard");}

    /* 查询历史记录页面自动选择查询日期 */
    static autoSelectDate  (){}
    /* 自动加载控制面板UI */
    static autoAddPluginDOM(){}
/*********************************************************** 功能性操作 ***********************************************************/
    /*刷新设置参数*/
    static refreshSettings(){ HSCJLocalSettingManager.restore_options() }
    
    /* Api消息 */
    static handleApiMessage(message){}

    /*数据改动回调*/
    static onDataChanged(){}
}
HSCJHtmlPageManager.tag = "PageManager";
HSCJHtmlPageManager.Message = HSCJScriptEngine.Message;

HSCJHtmlPageManager.getTubCountDOM = function (){
    return DOMUtils.createSingleEleByString(`
        <div id="idOfHscjTubCountMask" style="pointer-events: none; color: rgb(255, 0, 0); text-align: center; display: table; opacity: 0.3; position: absolute; left: 25%; top: 20%; overflow: hidden; z-index: 9999;width:100%;height:100%;">
            <span id="idOfBarcodeNumbersOfSampling" style="font-weight: bold; font-size: 250px;color:#FF1744">
            </span>
        </div>
    `);
};

HSCJHtmlPageManager.getClearInputIdCardDOM = function (){
    return DOMUtils.createSingleEleByString(`
        <div style = "width:calc(100% - 80px);padding-right: 26px;position:absolute;top:2px;left:0;">
            <img id="idOfClearInputIdCard" style="max-height: 25px;max-width: 25px;margin-left: 100%;opacity: 0.6" src="data:image/png;base64,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" title="清空证件号"/>
        </div>
    `);
};

HSCJHtmlPageManager.getCameraDOM = function () {
    return DOMUtils.createSingleEleByString(`
         <div id="idOfHscjCameraPanel" onclick="null" style="width: 320px; height: 240px; position: absolute; left: 0px; top: 0px; margin-left: calc(50% - 160px); margin-top: 400px; z-index: 9999;">
            <div style="width:100%;height:100%;border:solid;border-width:3px 3px 3px 3px;opacity:0.5;">
                <video id="hscj_camera_video" style="width:100%;height:100%;" autoplay="">
                </video>
            </div>
            <canvas id="hscj_camera_canvas" width="800" height="600" style="opacity:0;width: 800px; height: 600px;position:absolute;top:-2000px;left:-2000px;">
            </canvas>
        </div>
    `);
};

HSCJHtmlPageManager.autoSelectDate = function () {
    /*模拟选择今日的采样*/
    new Promise(async (resolve) => {
        try {
            let inputs = null;
            LogUtils.log("用户跳转查询历史记录！", HSCJHtmlPageManager.tag);
            while (true) {
                LogUtils.log("等待查询历史记录页面加载完毕", HSCJHtmlPageManager.tag);
                await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                if (!document.URL.endsWith("/check/record")) continue;
                inputs = document.getElementsByClassName("el-range-input");
                if (inputs === null) continue;
                if (inputs[0] === undefined) continue;
                if (inputs[1] === undefined) continue;
                break;
            }

            const startDate = inputs[0];
            /*const endDate = inputs[1];*/

            LogUtils.log("开始自动选择日期！", HSCJHtmlPageManager.tag);
            DOMUtils.click(startDate);
            let dateTables = null;
            while (true) {
                await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                dateTables = document.getElementsByClassName("el-date-table");
                if (dateTables === null) continue;
                if (dateTables[0] === undefined) continue;
                if (dateTables[1] === undefined) continue;
                break;
            }

            /* 2022-10-29 00:00:00 */
            const date = new Date();

            const s1 = date.Format("yyyy-MM-dd");

            const m1 = date.getMonth() + 1;
            const d1 = date.getDate();
            date.setTime(date.getTime() + 3600 * 24 * 1000);
            const s2 = date.Format("yyyy-MM-dd");

            const m2 = date.getMonth() + 1;
            const d2 = date.getDate();
            LogUtils.log("计算要选择的日期：" + s1 + "~" + s2, HSCJHtmlPageManager.tag);
            const rowsLeft = dateTables[0].firstElementChild.getElementsByClassName("el-date-table__row");

            LogUtils.log("开始选择‘起始日期’！", HSCJHtmlPageManager.tag);
            let isFound = false;
            while (!isFound) {
                for (let i = 0, ni = rowsLeft.length; i < ni && !isFound; ++i) {
                    const row = rowsLeft[i];
                    const columns = row.getElementsByClassName("available");

                    for (let j = 0, nj = columns.length; j < nj && !isFound; ++j) {
                        const eDay = columns[j]?.firstElementChild?.firstElementChild;
                        if (d1.toString() === eDay?.innerText?.trim()) {
                            DOMUtils.click(columns[j]);
                            isFound = true;
                            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                        }
                    }
                }
            }

            LogUtils.log("开始选择‘截止日期’！", HSCJHtmlPageManager.tag);
            isFound = false;
            if (m1 === m2) {
                for (let i = 0, ni = rowsLeft.length; i < ni && !isFound; ++i) {
                    const row = rowsLeft[i];
                    const columns = row.getElementsByClassName("available");

                    for (let j = 0, nj = columns.length; j < nj && !isFound; ++j) {
                        const eDay = columns[j]?.firstElementChild?.firstElementChild;
                        if (d2.toString() === eDay?.innerText?.trim()) {
                            DOMUtils.click(columns[j]);
                            isFound = true;
                            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                        }
                    }
                }
            } else {
                const rowsRight = dateTables[1].firstElementChild.getElementsByClassName("el-date-table__row");
                for (let i = 0, ni = rowsRight.length; i < ni && !isFound; ++i) {
                    const row = rowsRight[i];
                    const columns = row.getElementsByClassName("available");

                    for (let j = 0, nj = columns.length; j < nj && !isFound; ++j) {
                        const eDay = columns[j]?.firstElementChild?.firstElementChild;
                        if (d2.toString() === eDay?.innerText?.trim()) {
                            DOMUtils.click(columns[j]);
                            isFound = true;
                            await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal);
                        }
                    }
                }
            }

            const clickBtn = document.getElementsByClassName("el-button el-picker-panel__link-btn el-button--default el-button--mini is-plain")[0];
            DOMUtils.click(clickBtn);
            LogUtils.log("日期选择完毕！", HSCJHtmlPageManager.tag);
        } catch (e) {
        }finally {
            resolve();
        }
    })
        .then(()=>{});
};

HSCJHtmlPageManager.autoAddPluginDOM = async function () {
    LogUtils.log("开始自动加载插件DOM控件！",HSCJHtmlPageManager.tag);
    while (true) {
        LogUtils.log("等待采样页面加载完毕！",HSCJHtmlPageManager.tag);
        await FunctionUtils.sleep(HSCJLocalSettingManager.configOfSyncInternal??500);
        if (!HSCJScriptEngine.isSamplingPage()) continue;
        if(!FunctionUtils.isNull(HSCJHtmlPageManager.getClearInputIdCardEle())) {
            LogUtils.log("DOM控件已置入，无需加载！",HSCJHtmlPageManager.tag);
            return;
        }
        const lstFooter = document.body.getElementsByClassName("dialogList");
        if (lstFooter?.length === 0 || lstFooter[0].appendChild === null) continue;
        break;
    }

    LogUtils.log("开始加载插件DOM控件！",HSCJHtmlPageManager.tag);
    const lstFooter = document.body.getElementsByClassName("dialogList");
    if(lstFooter?.length===0 || lstFooter[0].appendChild === null) return;

    /* 添加摄像头 */
    if(document.getElementById("hscj_camera_video") == null){
        LogUtils.log("开始加载摄像头DOM控件！",HSCJHtmlPageManager.tag);
        const cameraEle = HSCJHtmlPageManager.getCameraDOM();
        document.body.appendChild(cameraEle);
    }

    setTimeout(()=>{
        if(HSCJLocalSettingManager.configOfCameraEnable){
            HSCJHtmlPageManager.setCameraVisible(HSCJHtmlPageManager.isSamplingPage()&&HSCJLocalSettingManager.isCameraVisible());
            CameraUtils.openCamera(HSCJHtmlPageManager.getCameraEle(),HSCJHtmlPageManager.getCanvasEle());
        }
        else{
            CameraUtils.closeCamera(HSCJHtmlPageManager.getCameraEle());
            HSCJHtmlPageManager.setCameraVisible(false);
        }
    },1000);

    /* 添加控制面板 */
    if(document.getElementById("idOfHscjControlPanelParent") === null){
        LogUtils.log("开始加载控制面板DOM控件！",HSCJHtmlPageManager.tag);
        const controlEle = HSCJHtmlPageManager.getControlDOM();
        lstFooter[0].appendChild(controlEle);
        document.getElementsByClassName("dialog-footer")[0].style="position:relative;top:-270px;";
    }

    /*添加试管人数水印*/
    if(document.getElementById("idOfHscjTubCountMask") === null) {
        LogUtils.log("开始加载试管人数水印DOM控件！",HSCJHtmlPageManager.tag);
        const tubCountEle = HSCJHtmlPageManager.getTubCountDOM();
        lstFooter[0].appendChild(tubCountEle);
    }

    if(HSCJLocalSettingManager.isBreakLineMode() === true){
        HSCJHtmlPageManager.getControlDOM();

        const ePanelLogin   = document.getElementById("idOfLoginButton");
        const eLoginAccount = document.getElementById("idOfLoginAccount");
        eLoginAccount.style.display = FunctionUtils.isNull(HSCJLocalSettingManager.getBreakLineLoginData()?.username) ? "none" : null;
        const eAccountName  = eLoginAccount.getElementsByTagName("span")[0];
        eAccountName.innerText = HSCJLocalSettingManager.getBreakLineLoginData()?.username??"";

        const eLogin     = document.getElementById("idOfBreakLineLogin");
        const eUserName  = eLogin.getElementsByTagName("input")[0];
        const ePassword  = eLogin.getElementsByTagName("input")[1];
        const eLoginBtn  = eLogin.getElementsByTagName("button")[0];
        const eVisible   = eLogin.getElementsByTagName("use")[2];
        eVisible.onclick = function () {
            if(ePassword.type === "password"){
                ePassword.type = "text";
                eVisible.href.baseVal = "#icon-eye-open";
            }
            else{
                eVisible.href.baseVal = "#icon-eye";
                ePassword.type = "password";
            }
        };

        eLoginBtn.onclick = function () {
            MessageManager.Content.speak("请确保账号及密码正确，登录结果请随时参见控制面板！");
            const username = eUserName.value;
            const password = ePassword.value;
            const breakLineLoginData = {
                username,
                password,
                isLogin: false,
                msg:"自动登录中"
            };
            HSCJLocalSettingManager.setBreakLineLoginData(breakLineLoginData);
            eLogin.style.display = "none";
            eAccountName.innerText = breakLineLoginData?.username??"";
            eLoginAccount.style.display = FunctionUtils.isNull(breakLineLoginData?.username) ? "none" : null;
        };
        ePanelLogin.onclick = function () {
            eLogin.style.display = null;
        };

        const eBar       = HSCJHtmlPageManager.getBarcodeEle();
        const ePeople    = HSCJHtmlPageManager.getPeopleEle();
        const eIdType    = HSCJHtmlPageManager.getIdTypeEle();
        const eRead      = HSCJHtmlPageManager.getReadIdBtn();
        const eIdNo      = HSCJHtmlPageManager.getIdNoEle();
        const eName      = HSCJHtmlPageManager.getNameEle();
        const ePhone     = HSCJHtmlPageManager.getPhoneEle();
        const confirmEle = HSCJHtmlPageManager.getConfirmSamplingBtn();
        const resetEle   = HSCJHtmlPageManager.getResetSamplingBtn();

        const eIdTypeSelector = document.getElementById("idOfSelectIdType");
        const eIdTypes        = eIdTypeSelector.firstElementChild.firstElementChild.firstElementChild.getElementsByTagName("li");
        const eTypeOfIdCard   = eIdTypes[0];
        const eTypeOfPassport = eIdTypes[1];
        const eTypeOfOthers   = eIdTypes[2];
        eIdType.onclick = ()=>{
            eIdTypeSelector.style.display = null;
        };
        [eTypeOfIdCard,eTypeOfPassport,eTypeOfOthers].forEach((ele,index)=>{
            ele.onclick = ()=>{
                eIdType.index = index+1;
                DOMUtils.write(eIdType,ele.innerText);
                eIdTypeSelector.style.display = "none";
            };
        });
        eTypeOfIdCard.onclick(null);

        const TYPE_BARCODE   = "barcode";
        const TYPE_PEOPLE_ID = "people id";
        const TYPE_ID_NO     = "id no";

        const onKeydown = function (type, event) {
            if(event.keyCode !== 13) return;
            if(TYPE_BARCODE === type){
                (event.srcElement??event.target??eBar)?.blur();
                return;
            }
            if(TYPE_PEOPLE_ID === type){
                (event.srcElement??event.target??ePeople)?.blur();
                return;
            }
            if(TYPE_ID_NO === type){
                (event.srcElement??event.target??eIdNo)?.blur();
                return;
            }
        };
        const onBlur = function (type) {
            if(TYPE_BARCODE === type){
                const barcode = DOMUtils.read(eBar);
                if((barcode?.trim()?.length??0) === 0) return;
                HSCJApiProvider.tubInfo(barcode,{
                    onSuccess:(code,msg,datas ) =>{},
                    onFailure:(code,msg,status) =>{}
                });
                return;
            }
            if(TYPE_PEOPLE_ID === type){
                const code = DOMUtils.read(ePeople);
                if((code?.trim()?.length??0)===0) return;
                HSCJApiProvider.healthyQrCodeInfo(code,{
                    onSuccess:(code,msg,datas)=>{},
                    onFailure:(code,msg,status)=>{}
                });
                return;
            }
            if(TYPE_ID_NO === type){
                const id = DOMUtils.read(eIdNo);
                if((id?.trim()?.length??0)===0) return;
                HSCJApiProvider.cardNoInfo(id,{
                    onSuccess:(code,msg,datas)=>{},
                    onFailure:(code,msg,status)=>{}
                });
                return;
            }
        };

        eBar.onkeydown = (event)=>onKeydown(TYPE_BARCODE,event);
        eBar.onblur = ()=>onBlur(TYPE_BARCODE);

        eIdNo.onkeydown = (event)=>onKeydown(TYPE_ID_NO,event);
        eIdNo.onblur = ()=>onBlur(TYPE_ID_NO);

        ePeople.onkeydown = (event)=>onKeydown(TYPE_PEOPLE_ID,event);
        ePeople.onblur = ()=>onBlur(TYPE_PEOPLE_ID);

        DeviceManager.initDevice();
        eRead.onclick = async function(){
            DeviceManager.readIdCard();
            DOMUtils.focus(eIdNo);
        };

        confirmEle.onclick = function () {
            const barcode = DOMUtils.read(eBar);
            if((barcode?.trim()?.length??0) === 0){
                MessageManager.Content.speak("请输入条码！",false);
                eBar.focus();
                return;
            }
            const id      = DOMUtils.read(eIdNo);
            if((id?.trim()?.length??0) === 0){
                MessageManager.Content.speak("请输入证件号！",false);
                eIdNo.focus();
                return;
            }
            const name    = DOMUtils.read(eName);
            if((name?.trim()?.length??0) === 0){
                MessageManager.Content.speak("请输入姓名！",false);
                eName.focus();
                return;
            }
            const phone   = DOMUtils.read(ePhone);
            if((phone?.trim()?.length??0) === 0){
                MessageManager.Content.speak("请输入手机号！",false);
                ePhone.focus();
                return;
            }
            const commitData = {
                testNum:barcode,
                idType:eIdType.index,
                idCard:id,
                fullName:name,
                mobile:phone,
                mode:1
            };

            OfflineSamplingManager.addOfflineRecord(commitData,{
                onSuccess:()=>{
                    HSCJScriptEngine.onSamplingResultNotify(commitData,0,"操作成功",{testNum:barcode,capacity:"20"})
                },
                onFailure:(e)=>{
                    commitData.code = -1;
                    commitData.msg  = "离线采样失败！"+e;
                    HSCJScriptEngine.onSamplingResultNotify(commitData,-1,"离线采样失败",null);
                }
            });
        };

        resetEle.onclick = function () {
            eTypeOfIdCard.onclick(null);

            [eBar,ePeople,eIdNo,eName,ePhone].forEach(ele=>{
                DOMUtils.write(ele,"");
                DOMUtils.deleteHSCJ(ele);
            });
        };
    }

    /* 添加证件号清空按钮 */
    if(FunctionUtils.isNull(HSCJHtmlPageManager.getClearInputIdCardEle())){
        LogUtils.log("开始加载证件号清空按钮DOM控件！",HSCJHtmlPageManager.tag);
        const clearIdCardButtonEle = HSCJHtmlPageManager.getClearInputIdCardDOM();
        const eIdNo = HSCJHtmlPageManager.getIdNoEle();
        eIdNo.parentNode.appendChild(clearIdCardButtonEle);
        clearIdCardButtonEle.onclick = ()=>{
            const eIdNo = HSCJHtmlPageManager.getIdNoEle();
            eIdNo.value = "";
            DOMUtils.focus(eIdNo);
            DOMUtils.deleteHSCJ(eIdNo);
        }
    }

    LogUtils.log("DOM控件加载完毕！",HSCJHtmlPageManager.tag);
    /*
    const eBarcode = HSCJHtmlPageManager.getBarcodeEle();
    if(!FunctionUtils.isNull(eBarcode)){
        if(FunctionUtils.isNull(eBarcode.style)) eBarcode.style = new CSSStyleDeclaration();
        eBarcode.style["ime-mode"] = "active";
    }

    const eIdNo    = HSCJHtmlPageManager.getIdNoEle();
    if(!FunctionUtils.isNull(eIdNo)){
        if(FunctionUtils.isNull(eIdNo.style)) eIdNo.style = new CSSStyleDeclaration();
        eIdNo.style["ime-mode"] = "active";
    }

    const ePeople = HSCJHtmlPageManager.getPeopleEle();
    if(!FunctionUtils.isNull(ePeople)){
        if(FunctionUtils.isNull(ePeople.style)) ePeople.style = new CSSStyleDeclaration();
        ePeople.style["ime-mode"] = "active";
    }
    */
};

HSCJHtmlPageManager.getControlDOM    = HSCJControlPanel.getDOM;
HSCJHtmlPageManager.onDataChanged    = HSCJControlPanel.onDataChanged;
HSCJHtmlPageManager.setCameraVisible = HSCJControlPanel.setCameraVisible;
HSCJHtmlPageManager.isSamplingPage   = function () { return HSCJLocalSettingManager.isBreakLineMode() === true || DOMUtils.isUrl(HSCJHtmlPageManager.getSamplingPage()); }
HSCJHtmlPageManager.handleApiMessage = async function (message) {
    const type = message.type;

    if(await HSCJScriptEngine.handleApiMessage(message)) return true;

    if(type === "onBreakLine"){
        LogUtils.log("检测到需要加载离线页面！",HSCJHtmlPageManager.tag);
        let username = message.username;
        if((username?.trim()?.length??0) > 0){
            username = CryptUtils.decryptLogin(username);
        }
        let password = message.password;
        if((password?.trim()?.length??0) > 0){
            password = CryptUtils.decryptLogin(password);
        }

        const _api = new Api()
            .getRequest()
            .responseType("document")
            .host(chrome.runtime.getURL("offline/hscj.offline.index.html"))
            .getParent();

        const _req = _api.getRequest();

        _req.doGet((response)=>{
            const offlineDoc = response.doc;
            const offlineHead = offlineDoc.head;
            const offlineBody = offlineDoc.body;

            while(document.head.firstElementChild){
                document.head.removeChild(document.head.firstElementChild);
            }
            while(offlineHead.firstElementChild){
                let child = offlineHead.firstElementChild;
                offlineHead.removeChild(child);
                if(child.tagName.toUpperCase() === "LINK"){
                    const _child = DOMUtils.createSingleEleByString(child.outerHTML);
                    if((_child?.href?.toString()?.indexOf("https://hsjc.qingdao.gov.cn")??-1)>-1){
                        child = _child;
                        child.href = chrome.runtime.getURL(child.href.toString().replace("https://hsjc.qingdao.gov.cn","offline/"));
                    }
                }
                if(child.tagName.toUpperCase() === "STYLE"){
                    const _child = DOMUtils.createSingleEleByString(child.outerHTML);
                    if((_child?.src?.toString()?.indexOf("https://hsjc.qingdao.gov.cn")??-1)>-1){
                        child = _child;
                        child.src = chrome.runtime.getURL(child.src.toString().replace("https://hsjc.qingdao.gov.cn","offline/"));
                    }
                }
                document.head.appendChild(child);
            }
            while(document.body.firstElementChild){
                document.body.removeChild(document.body.firstElementChild);
            }
            while(offlineBody.firstElementChild){
                const child = offlineBody.firstElementChild;
                offlineBody.removeChild(child);
                document.body.appendChild(child);
            }
            document.body.style = "padding:0;margin:0;background:#f5f7fa;overflow-y:hidden;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;";
            document.body.onselectstart="return false";
            HSCJLocalSettingManager.setBreakLineMode(true);
            HSCJLocalSettingManager.setBreakLineLoginData({
                username,
                password,
                isLogin:false,
                msg:"未登录"
            });
            if(!((username?.trim()?.length??0) > 0 && (password?.trim()?.length??0) > 0)){
                const eLoginPanel = document.getElementById("idOfBreakLineLogin");
                eLoginPanel.style.display = null;
                HSCJLocalSettingManager.getBreakLineLoginData().msg = "自动登陆中";
            }
            HSCJHtmlPageManager.autoAddPluginDOM();
        });
        return true;
    }

    if(type === "autoAddComponent"){
        HSCJHtmlPageManager.autoAddPluginDOM();
        return true;
    }

    if(type === "onDataChanged"){
        HSCJHtmlPageManager.onDataChanged();
        return true;
    }

    if(type === "jumpHistQuery"){
        HSCJHtmlPageManager.autoSelectDate();
        return true;
    }
};

/* 注意：所有的函数关联在此脚本里指定 */

HSCJScriptEngine.getCapacityEle          = HSCJHtmlPageManager.getCapacityEle         ;
HSCJScriptEngine.getBarcodeEle           = HSCJHtmlPageManager.getBarcodeEle          ;
HSCJScriptEngine.getPeopleEle            = HSCJHtmlPageManager.getPeopleEle           ;
HSCJScriptEngine.getIdTypeEle            = HSCJHtmlPageManager.getIdTypeEle           ;
HSCJScriptEngine.getIdNoEle              = HSCJHtmlPageManager.getIdNoEle             ;
HSCJScriptEngine.getReadIdBtn            = HSCJHtmlPageManager.getReadIdBtn           ;
HSCJScriptEngine.getNameEle              = HSCJHtmlPageManager.getNameEle             ;
HSCJScriptEngine.getPhoneEle             = HSCJHtmlPageManager.getPhoneEle            ;
HSCJScriptEngine.getTownEle              = HSCJHtmlPageManager.getTownEle             ;
HSCJScriptEngine.getVillageEle           = HSCJHtmlPageManager.getVillageEle          ;
HSCJScriptEngine.getCommunityEle         = HSCJHtmlPageManager.getCommunityEle        ;
HSCJScriptEngine.getOccupationEle        = HSCJHtmlPageManager.getOccupationEle       ;
HSCJScriptEngine.getSamplingSiteEle      = HSCJHtmlPageManager.getSamplingSiteEle     ;
HSCJScriptEngine.getSamplingTimeEle      = HSCJHtmlPageManager.getSamplingTimeEle     ;
HSCJScriptEngine.getSamplingCountEle     = HSCJHtmlPageManager.getSamplingCountEle    ;
HSCJScriptEngine.getAddressEle           = HSCJHtmlPageManager.getAddressEle          ;
HSCJScriptEngine.getMarkEle              = HSCJHtmlPageManager.getMarkEle             ;
HSCJScriptEngine.clearBarcodeWarnMessage = HSCJHtmlPageManager.clearBarcodeWarnMessage;
HSCJScriptEngine.clearReadIdWarnMessage  = HSCJHtmlPageManager.clearReadIdWarnMessage ;
HSCJScriptEngine.closeBarcodeFullDialog  = HSCJHtmlPageManager.closeBarcodeFullDialog ;
HSCJScriptEngine.click2CommitSampling    = HSCJHtmlPageManager.click2CommitSampling         ;
HSCJScriptEngine.clearHSCJInput          = function () { DOMUtils.click(HSCJHtmlPageManager.getResetSamplingBtn()); }
HSCJScriptEngine.isSamplingPage          = HSCJHtmlPageManager.isSamplingPage         ;
HSCJScriptEngine.onScriptStateChanged    = HSCJControlPanel.setScriptBtnEnabled       ;
HSCJScriptEngine.setTubCountDisplay      = HSCJHtmlPageManager.setTubCountDisplay            ;
HSCJScriptEngine.getSamplingPage         = HSCJHtmlPageManager.getSamplingPage        ;

HSCJOfflineEngine.onOfflineStateChanged  = HSCJControlPanel.setOfflineBtnEnabled      ;
HSCJOfflineEngine.onDataChanged          = HSCJControlPanel.onDataChanged             ;
HSCJOfflineEngine.getSamplingPage        = HSCJHtmlPageManager.getSamplingPage()      ;

HSCJControlPanel.getCameraPanel     = HSCJHtmlPageManager.getCameraPanel  ;
HSCJControlPanel.getCameraEle       = HSCJHtmlPageManager.getCameraEle    ;
HSCJControlPanel.getCanvasEle       = HSCJHtmlPageManager.getCanvasEle    ;
HSCJControlPanel.isSamplingPage     = HSCJHtmlPageManager.isSamplingPage  ;
HSCJControlPanel.isScriptRunning    = HSCJScriptEngine   .isScriptRunning ;
HSCJControlPanel.isOfflineMode      = HSCJOfflineEngine  .isInOfflineMode ;
HSCJControlPanel.setTubCountDisplay = HSCJHtmlPageManager.setTubCountDisplay     ;
HSCJControlPanel.pingServer         = HSCJApiProvider.pingHSCJServer;
HSCJControlPanel.getCurrentProcessingOfflineTubNo = HSCJOfflineEngine.getCurrentProcessingOfflineTubNo;
HSCJControlPanel.setCurrentProcessingOfflineTubNo = HSCJOfflineEngine.setCurrentProcessingOfflineTubNo;
HSCJControlPanel.onScriptControlClicked  = function () { HSCJScriptEngine.setScriptState(!HSCJControlPanel.isScriptRunning()); }
HSCJControlPanel.onOfflineControlClicked = function () { HSCJOfflineEngine.setOfflineState(!HSCJOfflineEngine.isInOfflineMode()); }
HSCJControlPanel.getCurrentBarcode       = function () { return DOMUtils.read(HSCJHtmlPageManager.getBarcodeEle()); }

OCRUtils.onOCRCallback        = HSCJScriptEngine.onOCRCallback;
QRCodeUtils.onQRCodeCallback  = HSCJScriptEngine.onQRCodeCallback;
QRCodeUtils.onBarcodeCallback = HSCJScriptEngine.onBarcodeCallback;
DeviceManager.onReadIdCard    = HSCJScriptEngine.onReadIdCard;