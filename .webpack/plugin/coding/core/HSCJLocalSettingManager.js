/**
 * 本地数据存储器
 */
class HSCJLocalSettingManager{
    static save_options() {
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeLength   , HSCJLocalSettingManager.configOfBarcodeLength   );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeMatchRule, HSCJLocalSettingManager.configOfBarcodeMatchRule);
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfOnlyInputIDCard , HSCJLocalSettingManager.configOfOnlyInputIDCard );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfInputIDRule     , HSCJLocalSettingManager.configOfInputIDRule     );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfIDExpired       , HSCJLocalSettingManager.configOfIDExpired       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfReadIDInterval  , HSCJLocalSettingManager.configOfReadIDInterval  );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfTaskInterval    , HSCJLocalSettingManager.configOfTaskInterval    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfSyncInternal    , HSCJLocalSettingManager.configOfSyncInternal    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfHealthyRule     , HSCJLocalSettingManager.configOfHealthyRule     );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfElementsRule    , JSON.stringify(HSCJLocalSettingManager.configOfElementsRule));
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfReadIDMCC       , HSCJLocalSettingManager.configOfReadIDMCC       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfCameraEnable    , HSCJLocalSettingManager.configOfCameraEnable    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeEnable   , HSCJLocalSettingManager.configOfBarcodeEnable   );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfQRCodeEnable    , HSCJLocalSettingManager.configOfQRCodeEnable    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfOCREnable       , HSCJLocalSettingManager.configOfOCREnable       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeCapacity , HSCJLocalSettingManager.configOfBarcodeCapacity );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeCommitNum, HSCJLocalSettingManager.configOfBarcodeCommitNum);
    }

    static restore_options() {
        HSCJLocalSettingManager.configOfBarcodeLength    = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfBarcodeLength   , HSCJLocalSettingManager.defaultOfBarcodeLength   );
        HSCJLocalSettingManager.configOfBarcodeMatchRule = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfBarcodeMatchRule, HSCJLocalSettingManager.defaultOfBarcodeMatchRule);
        HSCJLocalSettingManager.configOfOnlyInputIDCard  = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfOnlyInputIDCard , HSCJLocalSettingManager.defaultOfOnlyInputIDCard );
        HSCJLocalSettingManager.configOfInputIDRule      = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfInputIDRule     , HSCJLocalSettingManager.defaultOfInputIDRule     );
        HSCJLocalSettingManager.configOfIDExpired        = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfIDExpired       , HSCJLocalSettingManager.defaultOfIDExpired       );
        HSCJLocalSettingManager.configOfReadIDInterval   = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfReadIDInterval  , HSCJLocalSettingManager.defaultOfReadIDInterval  );
        HSCJLocalSettingManager.configOfTaskInterval     = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfTaskInterval    , HSCJLocalSettingManager.defaultOfTaskInterval    );
        HSCJLocalSettingManager.configOfSyncInternal     = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfSyncInternal    , HSCJLocalSettingManager.defaultOfSyncInternal    );
        HSCJLocalSettingManager.configOfHealthyRule      = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfHealthyRule     , HSCJLocalSettingManager.defaultOfHealthyRule     );
        HSCJLocalSettingManager.configOfReadIDMCC        = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfReadIDMCC       , HSCJLocalSettingManager.defaultOfReadIDMCC       );
        HSCJLocalSettingManager.configOfCameraEnable     = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfCameraEnable    , HSCJLocalSettingManager.defaultOfCameraEnable    );
        HSCJLocalSettingManager.configOfBarcodeEnable    = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfBarcodeEnable   , HSCJLocalSettingManager.defaultOfBarcodeEnable   );
        HSCJLocalSettingManager.configOfQRCodeEnable     = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfQRCodeEnable    , HSCJLocalSettingManager.defaultOfQRCodeEnable    );
        HSCJLocalSettingManager.configOfOCREnable        = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfOCREnable       , HSCJLocalSettingManager.defaultOfOCREnable       );
        HSCJLocalSettingManager.configOfElementsRule     = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfElementsRule    , HSCJLocalSettingManager.defaultOfElementsRule    );
        HSCJLocalSettingManager.configOfBarcodeCapacity  = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfBarcodeCapacity , HSCJLocalSettingManager.defaultOfBarcodeCapacity );
        HSCJLocalSettingManager.configOfBarcodeCommitNum = HSCJLocalSettingManager.readStorage(HSCJLocalSettingManager.keyOfBarcodeCommitNum, HSCJLocalSettingManager.defaultOfBarcodeCommitNum);

        try {
            HSCJLocalSettingManager.configOfElementsRule = JSON.parse(HSCJLocalSettingManager.configOfElementsRule);
        }
        catch (e) {
            try {HSCJLocalSettingManager.configOfElementsRule = JSON.parse(HSCJLocalSettingManager.defaultOfElementsRule);} catch (e) {}
        }
        LogUtils.log("restore_options:"+JSON.stringify(HSCJLocalSettingManager.toJSON()),"LocalSettingManager");
    }

    static reset_options(){
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeLength   , HSCJLocalSettingManager.defaultOfBarcodeLength   );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeMatchRule, HSCJLocalSettingManager.defaultOfBarcodeMatchRule);
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfOnlyInputIDCard , HSCJLocalSettingManager.defaultOfOnlyInputIDCard );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfInputIDRule     , HSCJLocalSettingManager.defaultOfInputIDRule     );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfIDExpired       , HSCJLocalSettingManager.defaultOfIDExpired       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfReadIDInterval  , HSCJLocalSettingManager.defaultOfReadIDInterval  );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfTaskInterval    , HSCJLocalSettingManager.defaultOfTaskInterval    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfSyncInternal    , HSCJLocalSettingManager.defaultOfSyncInternal    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfHealthyRule     , HSCJLocalSettingManager.defaultOfHealthyRule     );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfElementsRule    , HSCJLocalSettingManager.defaultOfElementsRule    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfReadIDMCC       , HSCJLocalSettingManager.defaultOfReadIDMCC       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfCameraEnable    , HSCJLocalSettingManager.defaultOfCameraEnable    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeEnable   , HSCJLocalSettingManager.defaultOfBarcodeEnable   );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfQRCodeEnable    , HSCJLocalSettingManager.defaultOfQRCodeEnable    );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfOCREnable       , HSCJLocalSettingManager.defaultOfOCREnable       );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeCapacity , HSCJLocalSettingManager.defaultOfBarcodeCapacity );
        HSCJLocalSettingManager.writeStorage(HSCJLocalSettingManager.keyOfBarcodeCommitNum, HSCJLocalSettingManager.defaultOfBarcodeCommitNum);
        HSCJLocalSettingManager.restore_options();
    }

	static restoreFromJSON(config){
		HSCJLocalSettingManager.configOfBarcodeLength    = config.configOfBarcodeLength   ;
		HSCJLocalSettingManager.configOfBarcodeMatchRule = config.configOfBarcodeMatchRule;
		HSCJLocalSettingManager.configOfOnlyInputIDCard  = config.configOfOnlyInputIDCard ;
		HSCJLocalSettingManager.configOfInputIDRule      = config.configOfInputIDRule     ;
		HSCJLocalSettingManager.configOfIDExpired        = config.configOfIDExpired       ;
		HSCJLocalSettingManager.configOfReadIDInterval   = config.configOfReadIDInterval  ;
		HSCJLocalSettingManager.configOfTaskInterval     = config.configOfTaskInterval    ;
		HSCJLocalSettingManager.configOfSyncInternal     = config.configOfSyncInternal    ;
		HSCJLocalSettingManager.configOfHealthyRule      = config.configOfHealthyRule     ;
		HSCJLocalSettingManager.configOfElementsRule     = JSON.parse(Base64Utils.decodeB64Str(config.configOfElementsRule));
		HSCJLocalSettingManager.configOfReadIDMCC        = config.configOfReadIDMCC       ;
		HSCJLocalSettingManager.configOfCameraEnable     = config.configOfCameraEnable    ;
		HSCJLocalSettingManager.configOfBarcodeEnable    = config.configOfBarcodeEnable   ;
		HSCJLocalSettingManager.configOfQRCodeEnable     = config.configOfQRCodeEnable    ;
		HSCJLocalSettingManager.configOfOCREnable        = config.configOfOCREnable       ;
		HSCJLocalSettingManager.configOfBarcodeCapacity  = config.configOfBarcodeCapacity ;
		HSCJLocalSettingManager.configOfBarcodeCommitNum = config.configOfBarcodeCommitNum;
        HSCJLocalSettingManager.save_options();
        LogUtils.log("restoreFromJSON:"+JSON.stringify(HSCJLocalSettingManager.toJSON()),env);
	}

    static toJSON(){
        return {
			configOfBarcodeLength   : HSCJLocalSettingManager.configOfBarcodeLength   ,
			configOfBarcodeMatchRule: HSCJLocalSettingManager.configOfBarcodeMatchRule,
			configOfOnlyInputIDCard : HSCJLocalSettingManager.configOfOnlyInputIDCard ,
			configOfInputIDRule     : HSCJLocalSettingManager.configOfInputIDRule     ,
			configOfIDExpired       : HSCJLocalSettingManager.configOfIDExpired       ,
			configOfReadIDInterval  : HSCJLocalSettingManager.configOfReadIDInterval  ,
			configOfTaskInterval    : HSCJLocalSettingManager.configOfTaskInterval    ,
			configOfSyncInternal    : HSCJLocalSettingManager.configOfSyncInternal    ,
			configOfHealthyRule     : HSCJLocalSettingManager.configOfHealthyRule     ,
			configOfElementsRule    : Base64Utils.encodeB64Str(JSON.stringify(HSCJLocalSettingManager.configOfElementsRule))    ,
			configOfReadIDMCC       : HSCJLocalSettingManager.configOfReadIDMCC       ,
			configOfCameraEnable    : HSCJLocalSettingManager.configOfCameraEnable    ,
			configOfBarcodeEnable   : HSCJLocalSettingManager.configOfBarcodeEnable   ,
			configOfQRCodeEnable    : HSCJLocalSettingManager.configOfQRCodeEnable    ,
			configOfOCREnable       : HSCJLocalSettingManager.configOfOCREnable       ,
			configOfBarcodeCapacity : HSCJLocalSettingManager.configOfBarcodeCapacity ,
			configOfBarcodeCommitNum: HSCJLocalSettingManager.configOfBarcodeCommitNum
        };
    }

    /**
     * @param data:
        {
            "id": 2,
            "deviceName": "身份证阅读机具",
            "factory": "深圳华视电子读写设备",
            "modelNum": "CVR-100UC"
        }
     */
    static setOfflineDevice(data){
        try {
            localStorage["_hscj_offline_device__"] = JSON.stringify(data);
        } catch (e) {
            localStorage["_hscj_offline_device__"] = "{}";
        }
    }

    static getOfflineDevice(){
        const dev = localStorage["_hscj_offline_device__"];
        if((dev?.trim()?.length??0) === 0) return {};
        try {
            return JSON.parse(dev);
        } catch (e) {
            return {};
        }
    }

    static _isOfflineMode = false;
    static setOfflineMode(run){
        this._isOfflineMode = run;
    }

    static isOfflineMode(){
        return this._isOfflineMode;
    }

    static _isBreakLineMode = false;
    static setBreakLineMode(run){
        this._isBreakLineMode = run;
    }

    static isBreakLineMode(){
        return this._isBreakLineMode;
    }

    static _breakLineLoginData = {
        username:"",
        password:"",
        isLogin :false,
        msg     :"未登录",
    };
    static setBreakLineLoginData(data){
        this._breakLineLoginData = data;
    }
    static getBreakLineLoginData(){
        return this._breakLineLoginData;
    }
    static isBreakLineLogin(){
        return this._breakLineLoginData?.isLogin === true;
    }

    static setCameraVisible(visible){
        localStorage["_hscj_camera_visible__"] = visible;
    }

    static isCameraVisible(){
        const visible = localStorage["_hscj_camera_visible__"];
        if(visible === null || visible === undefined) return true;
        if(visible === true) return true;
        if(visible === "true") return true;
        return false;
    }

    static getBarcodeCommitNum(){
        return this.configOfBarcodeCapacity;
    }

    static async handleMessage(message){
        const type = message.type;
        if(type === 'onSettingChanged'){
            let settings = "";
            try {settings = JSON.stringify(message.settings);} catch (e) {}
            LogUtils.log("监听到参数变化：" + settings, tag);
            HSCJLocalSettingManager.restoreFromJSON(message.settings);
            return true;
        }

        if(type === "requestDeviceInfo"){
            LogUtils.log("监听到请求参数！", tag);
            MessageManager.Content.sendDeviceInfoToOptions();
            return true;
        }

        if(type === "onDeviceChanged"){
            const data = message.data;
            let json = {};
            try {json = JSON.parse(Base64Utils.decodeB64Str(data));} catch (e) {}
            LogUtils.log("监听到默认设备发生变化！\t"+JSON.stringify(json),tag);
            HSCJLocalSettingManager.setOfflineDevice(json);
            return true;
        }
        return false;
    }
}

HSCJLocalSettingManager.keyOfBarcodeLength    = "__k_0_";
HSCJLocalSettingManager.keyOfBarcodeMatchRule = "__k_1_";
HSCJLocalSettingManager.keyOfOnlyInputIDCard  = "__k_2_";
HSCJLocalSettingManager.keyOfInputIDRule      = "__k_3_";
HSCJLocalSettingManager.keyOfIDExpired        = "__k_4_";
HSCJLocalSettingManager.keyOfReadIDInterval   = "__k_5_";
HSCJLocalSettingManager.keyOfTaskInterval     = "__k_6_";
HSCJLocalSettingManager.keyOfSyncInternal     = "__k_7_";
HSCJLocalSettingManager.keyOfHealthyRule      = "__k_8_";
HSCJLocalSettingManager.keyOfElementsRule     = "__k_9_";
HSCJLocalSettingManager.keyOfReadIDMCC        = "__k_A_";
HSCJLocalSettingManager.keyOfCameraEnable     = "__k_B_";
HSCJLocalSettingManager.keyOfBarcodeEnable    = "__k_C_";
HSCJLocalSettingManager.keyOfQRCodeEnable     = "__k_D_";
HSCJLocalSettingManager.keyOfOCREnable        = "__k_E_";
HSCJLocalSettingManager.keyOfBarcodeCapacity  = "__k_F_";
HSCJLocalSettingManager.keyOfBarcodeCommitNum = "__k_G_";

HSCJLocalSettingManager.defaultOfBarcodeLength    = 12;
HSCJLocalSettingManager.defaultOfBarcodeMatchRule = "";
HSCJLocalSettingManager.defaultOfOnlyInputIDCard  = true;
HSCJLocalSettingManager.defaultOfInputIDRule      = "";
HSCJLocalSettingManager.defaultOfIDExpired        = 3000;
HSCJLocalSettingManager.defaultOfReadIDInterval   = 400;
HSCJLocalSettingManager.defaultOfTaskInterval     = 250;
HSCJLocalSettingManager.defaultOfSyncInternal     = 150;
HSCJLocalSettingManager.defaultOfHealthyRule      = "[0-9A-Za-z:]*::$\n[a-zA-Z0-9]{0,5}#[a-zA-Z0-9+/]*={0,2}$";
HSCJLocalSettingManager.defaultOfElementsRule     = JSON.stringify([
    {
        no:0,
        bind:"试管容量",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,0]
    },
    {
        no:1,
        bind:"试管编号",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,1]
    },
    {
        no:2,
        bind:"居民码",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,2]
    },
    {
        no:3,
        bind:"证件类型",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,3]
    },
    {

        no:4,
        bind:"证件号",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,4]
    },
    {
        no:5,
        bind:"证件读取按钮",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,5]
    },
    {
        no:6,
        bind:"姓名",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,6]
    },
    {
        no:7,
        bind:"手机号",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,7]
    },
    {
        no:8,
        bind:"街道(镇)",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,8]
    },
    {
        no:9,
        bind:"居委会(村)",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,9]
    },
    {
        no:10,
        bind:"所属小区",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,10]
    },
    {
        no:11,
        bind:"人员类别",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,11]
    },
    {
        no:12,
        bind:"采样单位",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,12]
    },
    {
        no:13,
        bind:"采样日期",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,13]
    },
    {
        no:14,
        bind:"已取样数",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,14]
    },
    {
        no:15,
        bind:"现住址",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,15]
    },
    {
        no:16,
        bind:"附加说明",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-form",
        indexes:[0,16]
    },
    {
        no:17,
        bind:"确认采样",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-button el-button--success el-button--medium",
        indexes:[0]
    },
    {
        no:18,
        bind:"重置采样",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-button el-button--danger el-button--medium",
        indexes:[0]
    },
    {
        no:19,
        bind:"试管警告",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"el-button el-button--default el-button--small el-button--primary",
        indexes:[0]
    },
    {
        no:20,
        bind:"试管更换",
        type:"document.body.getElementsByClassName",
        id:"",
        class:"van-button van-button--default van-button--large van-dialog__confirm",
        indexes:[0]
    },
    {
        no:21,
        bind:"证件号读取警告",
        type:"document.getElementsByClassName",
        id:"",
        class:"el-message el-message--warning",
        indexes:[]
    }
]);
HSCJLocalSettingManager.defaultOfReadIDMCC        = 8;
HSCJLocalSettingManager.defaultOfCameraEnable     = true;
HSCJLocalSettingManager.defaultOfBarcodeEnable    = true;
HSCJLocalSettingManager.defaultOfQRCodeEnable     = true;
HSCJLocalSettingManager.defaultOfOCREnable        = true;
HSCJLocalSettingManager.defaultOfBarcodeCapacity  = 20;
HSCJLocalSettingManager.defaultOfBarcodeCommitNum = 0;

HSCJLocalSettingManager.readStorage = function (key,defaultValue){
    if(key == null) return defaultValue;
    if(key.constructor !== String) return defaultValue;
    const result = localStorage[key];
    if(result === null || result === undefined) return defaultValue;
    if(defaultValue === null || defaultValue === undefined) return result;
    try {
        switch (defaultValue.constructor) {
            case String:
                return result;
            case Number:
                return parseInt(result);
            case Boolean:
                let num = null;
                try {num = parseInt(result);} catch (e) {}

                const f = result === false || result === "false";
                if(f) return false;
                return result === "true" || result === true || num!==null && num!==undefined&&!isNaN(num)&&num!==0;
            case JSON:
                return JSON.parse(result);
        }
    } catch (e) {}
    return result;
}

HSCJLocalSettingManager.writeStorage = function(key,value){
    if(FunctionUtils.isNull(value)){
        try{localStorage[key] = value;}catch(e){}
        return;
    }

    let save = null;
    try {
        switch (value.constructor) {
            case Number:
            case String:
            case Boolean:
                save = value;
                break;
            case JSON:
                save = JSON.stringify(value);
                break;
            default:
                save = value.toString();
        }
    } catch (e) {
        save = value;
    }
    try{localStorage[key] = save;}catch(e){}
}

HSCJLocalSettingManager.choseCheckDisplay = function(wordId1, wordType) {
    if (wordType === true || wordType === "true") {
        document.getElementById(wordId1).className = 'checked';
        document.getElementById(wordId1).check = true;
    } else {
        document.getElementById(wordId1).className = 'uncheck';
        document.getElementById(wordId1).check = false;
    }
}

HSCJLocalSettingManager.restore_options();
HSCJLocalSettingManager.setOfflineMode(false);
