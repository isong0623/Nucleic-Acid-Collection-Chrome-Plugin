/**
 * Base64加解密
 */
class Base64Utils{
    static v1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    static v2 = [];
    /**
     * 对字节数组进行Base64加密
     * @param toEncodeBytes
     * @returns {string}
     */
    static fq(toEncodeBytes){
        let sEncode = "", ch1,ch2,ch3;
        for (let i = 0, ni = toEncodeBytes.length; i+2<ni; i+=3) {
            ch1 = toEncodeBytes[i  ];
            ch2 = toEncodeBytes[i+1];
            ch3 = toEncodeBytes[i+2];
            sEncode += Base64Utils.v1[(ch1 >> 2)];
            sEncode += Base64Utils.v1[((ch1 << 4) | (ch2 >> 4)) & 0x3F];
            sEncode += Base64Utils.v1[((ch2 << 2) | (ch3 >> 6)) & 0x3F];
            sEncode += Base64Utils.v1[ch3 & 0x3F];
        }
        switch(toEncodeBytes.length % 3){
            case 1:
                ch1 = toEncodeBytes[toEncodeBytes.length - 1];
                sEncode += Base64Utils.v1[(ch1 & 0xFC) >> 2];
                sEncode += Base64Utils.v1[(ch1 & 0x03) << 4];
                sEncode += "==";
                break;
            case 2:
                ch1 = toEncodeBytes[toEncodeBytes.length-2];
                ch2 = toEncodeBytes[toEncodeBytes.length-1];
                sEncode += Base64Utils.v1[(ch1 & 0xFC) >> 2];
                sEncode += Base64Utils.v1[((ch1 & 0x03) << 4) | ((ch2 & 0xF0) >> 4)];
                sEncode += Base64Utils.v1[((ch2 & 0x0F) << 2)];
                sEncode += "=";
                break;
        }
        return sEncode;
    }
    /**
     * 解密Base64
     * @param toDecode
     * @returns {Number[]}
     */
    static fr(toDecode){
        const lstDecode = [];
        for(let i=0,v,ni=toDecode.length;i<ni;){
            v  = Base64Utils.v2[toDecode.charCodeAt(i++)] << 18;
            v += Base64Utils.v2[toDecode.charCodeAt(i++)] << 12;
            lstDecode.push((v & 0x00FF0000) >> 16);
            if(i>=ni || toDecode.charCodeAt(i) === Base64Utils.v1.charCodeAt(64)) break;
            v += Base64Utils.v2[toDecode.charCodeAt(i++)] << 6;
            lstDecode.push((v & 0x0000FF00) >> 8);
            if(i>=ni || toDecode.charCodeAt(i) === Base64Utils.v1.charCodeAt(64)) break;
            v += Base64Utils.v2[toDecode.charCodeAt(i++)];
            lstDecode.push( v & 0x000000FF);
        }
        return lstDecode;
    }
    /**
     * 加密Base64字符串
     * @param toEncode
     * @returns {string}
     */
    static fw(toEncode){
        if(toEncode === null || toEncode === undefined) return "";
        const encodeBytes = Base64Utils.fs(toEncode)
        return Base64Utils.fq(encodeBytes);
    }
    /**
     * 解密Base64
     * @param toDecode
     * @returns {string}
     */
    static fx(toDecode){
        const decodeBytes = Base64Utils.fr(toDecode);
        return Base64Utils.fu(decodeBytes);
    }
    static fs(string){
        string = string.replace(/\r\n/g,"\n");
        const uft8Bytes = [];
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                uft8Bytes.push(c);
            } else if((c > 127) && (c < 2048)) {
                uft8Bytes.push((c >> 6) | 192);
                uft8Bytes.push((c & 63) | 128);
            } else {
                uft8Bytes.push((c >> 12) | 224);
                uft8Bytes.push(((c >> 6) & 63) | 128);
                uft8Bytes.push((c & 63) | 128);
            }
        }
        return uft8Bytes;
    }
    static ft = function (string) {
        string = string.replace(/\r\n/g,"\n");
        let utf8Text = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utf8Text += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utf8Text += String.fromCharCode((c >> 6) | 192);
                utf8Text += String.fromCharCode((c & 63) | 128);
            } else {
                utf8Text += String.fromCharCode((c >> 12) | 224);
                utf8Text += String.fromCharCode(((c >> 6) & 63) | 128);
                utf8Text += String.fromCharCode((c & 63) | 128);
            }
        }
        return utf8Text;
    }
    static fu = function (bytes) {
        let string = "";
        let i = 0;
        let c = 0,c1 = 0,c2 = 0, c3=0;
        while ( i < bytes.length ) {
            c = bytes[i];
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = bytes[i+1];
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = bytes[i+1];
                c3 = bytes[i+2];
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
    static fv = function (text) {
        let string = "";
        let i = 0;
        let c = 0,c1 = 0,c2 = 0, c3=0;
        while ( i < text.length ) {
            c = text.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = text.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = text.charCodeAt(i+1);
                c3 = text.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
for(let i=0,ni=64;i<ni;++i){
    Base64Utils.v2[Base64Utils.v1.charCodeAt(i)] = i;
}

JSON.parseBody = function (body) {
    let bodyJson = {};
    if(body === null || body === undefined) return bodyJson;
    if(body.constructor === String){
        if(body.trim().startsWith("{")){
            try{bodyJson = JSON.parse(body);}catch (e){}
        }
        if ((Object.keys(bodyJson).length === 0) && ((body?.length ?? 0) !== 0) && body.trim().startsWith("http") === true) {
            const index = body.indexOf("?");
            if (index > -1) {
                const url = fA(body.substring(index + 1));
                url.split("&").map((data) => {
                    let index = data.indexOf("=");
                    if (index < 0) return;
                    let key = data.substring(0, index);
                    let value = data.substring(index + 1);
                    bodyJson[key] = value;
                });
            }
        }
        if ((Object.keys(bodyJson).length === 0) && ((body?.length ?? 0) !== 0)) {
            body.split(",").map((data) => {
                let index = data.indexOf("=");
                if (index < 0) return;
                let key = data.substring(0, index);
                let value = data.substring(index + 1);
                bodyJson[key] = value;
            });
        }
    }
    else{
        try {bodyJson = JSON.parse(JSON.stringify(body));} catch (e) {}
    }
    return bodyJson;
}
function fA(zipStr){
    let uzipStr = '';
    for (let i = 0; i < zipStr.length; i += 1) {
        let chr = zipStr.charAt(i);
        if (chr === '+') {
            uzipStr += ' ';
        } else if (chr === '%') {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt('0x' + asc) > 0x7f) {
                uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i+3, i+9).toString());
                i += 8;
            }else{
                uzipStr += fC(parseInt('0x' + asc));
                i += 2;
            }
        }else{
            uzipStr += chr;
        }
    }
    return uzipStr;
}
function fB(str){
    return str.charCodeAt(0).toString(16);
}
function fC(asccode){
    return String.fromCharCode(asccode);
}
class FunctionUtils{
    static sleep(millis){
        return new Promise(resolve => setTimeout(resolve,millis));
    }
    static isNull(obj){
        return obj === null || obj === undefined;
    }
}

Date.prototype.Format = function (fmt) { /*author: meizz */
    var o = {
        "M+": this.getMonth() + 1, /*月份 */
        "d+": this.getDate(), /*日 */
        "h+": this.getHours(), /*小时 */
        "m+": this.getMinutes(), /*分 */
        "s+": this.getSeconds(), /*秒 */
        "q+": Math.floor((this.getMonth() + 3) / 3), /*季度 */
        "S": this.getMilliseconds() /*毫秒 */
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
};
class TimeUtils{
    static fD(timestamp){
        let date = timestamp;
        if(date.constructor != Number){
            try{date = parseInt(date);}catch (e) {}
        }
        const time  = new Date();
        time.setTime(date);
        const year  = time.getFullYear();
        const month = time.getMonth()+1;
        const day   = time.getDate();
        return year + "_" + (month<10?"0":"")+month + "_" +(day<10?"0":"") + day;
    }
    static fE(timestamp){
        let date = timestamp;
        if(date.constructor != Number){
            try{date = parseInt(date);}catch (e) {}
        }
        const time  = new Date();
        time.setTime(date);
        const year  = time.getFullYear();
        const month = time.getMonth()+1;
        const day   = time.getDate();
        return year + "年" + (month<10?"0":"")+month + "月" +(day<10?"0":"") + day+"日";
    }
}

class LogUtils{
    /**
     * 控制台日志-console.log
     * @param msg 要打印的对象
     * @param tag 是否要打印TAG，如果msg是String或obj=false&&JSON.stringify(msg)!=""则打印标签
     * @param obj 是否要对msg格式化成JSON,true不格式化，false格式化
     */
    static log(msg,tag="",obj=true){
        try{
           if(msg == null) return;
           if(msg.constructor === String){
               if(tag!=null && tag?.length>0){
                   console.log(tag+"->"+msg);
               }
               else{
                   console.log(msg);
               }
           }
           else{
               if(obj){
                    console.log(msg);
               }
               else{
                   try {
                       const json = JSON.stringify(msg);
                       if(json.length>0){
                           if(tag!=null && tag?.length>0){
                               console.log(tag+"->"+json);
                           }
                           else{
                               console.log(json);
                           }
                       }
                       else{
                           let str = msg?.toString();
                           console.log(str.length>0?str:msg);
                       }
                   } catch (e) {
                       console.log(msg);
                   }
               }
           }
        }
        catch(e){}
    }
    /**
     * 控制台日志-console.warn
     * @param msg
     * @param tag
     * @param obj
     */
    static warn(msg,tag="",obj=true){
        try{
            if(msg == null) return;
            if(msg.constructor === String){
                if(tag!=null && tag?.length>0){
                    console.warn(tag+"->"+msg);
                }
                else{
                    console.warn(msg);
                }
            }
            else{
                if(obj){
                    console.warn(msg);
                }
                else{
                    try {
                        const json = JSON.stringify(msg);
                        if(json.length>0){
                            if(tag!=null && tag?.length>0){
                                console.warn(tag+"->"+json);
                            }
                            else{
                                console.warn(json);
                            }
                        }
                        else{
                            console.warn(msg);
                        }
                    } catch (e) {
                        console.warn(msg);
                    }
                }
            }
        }
        catch(e){}
    }
}

class HSCJTTSEngine{
    static speak(msg,enqueue=true,rate,pitch){
        const speakText = msg?.toString()??"";
        if((speakText?.length??0) === 0) return;
        let speaked = false;
        /*
        try {
            if (HSCJTTSEngine.voices !== undefined && HSCJTTSEngine.voices.length > 0) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.voice = HSCJTTSEngine.voices[0];
                utterance.volume = 1;
                utterance.rate = 1.25;
                utterance.pitch = 1;
                utterance.text = speakText;
                try {if (!enqueue) speechSynthesis.cancel();} catch (e) {}
                speechSynthesis.speak(utterance);
                speaked = true;
            }
        } catch (e) {}
        */
        if(!speaked){
            try {chrome?.tts?.speak(speakText, {enqueue: enqueue===true,rate,pitch});} catch (e) {}
        }
    }
}
/*
if(speechSynthesis !== undefined){
    HSCJTTSEngine.voices = speechSynthesis.getVoices();
}
*/

class MessageManager{
    static f3H(msg){
        try{chrome?.runtime?.sendMessage(msg);}catch (e) {}
    }
    static f3I = MessageManager.f3H;
    static f3J = MessageManager.f3H;
    static f3K = MessageManager.f3H;
    /*不确定 目前也用不到 90%应该是*/
    static f3L = MessageManager.f3H;
    static f3M(msg){
        if(MessageManager.f3P.vM===null || MessageManager.f3P.vM === undefined) return;
        try {chrome?.tabs?.sendMessage(MessageManager.f3P.vM.tabId, msg);} catch (e) {}
    }
    static f3N(msg){
        MessageManager.f3K({type:"m4",msg:msg});
    };
    static f3O(msg){
        MessageManager.f3L({type:"m4",msg:msg});
    };
}
/* 包含在background里执行的消息 */
MessageManager.f3P = {
    speak: function (msg,enqueue,rate,pitch) {
        HSCJTTSEngine.speak(msg,enqueue,rate,pitch);
    },
    speakDelay:function (msg,enqueue=true,delay=0) {
        setTimeout(()=>MessageManager.f3P.speak(msg,enqueue),delay);
    },
    speakInCommand: function (msg,enqueue) {
        MessageManager.f3M({type:"speak",msg:{msg:msg,enqueue:enqueue}});
    },
    f2u: function (){
        MessageManager.f3M({type:"f2u"});
    },
    vM:null,
};
/* 包含在content里执行的消息 */
MessageManager.f3Q = {
    speak: function (msg,enqueue=true,rate,pitch) {
        MessageManager.f3H({type:enqueue===true?"speak":"speak2", msg:msg,rate,pitch});
    },
    f2N:()=>{
        MessageManager.f3H({type:"f2N"});
    },
    f2M:()=>{
        MessageManager.f3H({type:"f2M"});
    },
    f2L:()=>{
        MessageManager.f3H({type:"f2L"});
    },
    f3X:()=>{
        MessageManager.f3J({type:"onDeviceInit",data:Base64Utils.fw(JSON.stringify(c6.getOfflineDevice()))});
    }
};
/* 包含在options里执行的消息 */
MessageManager.f3R = {
    speak: MessageManager.f3P.speak,
    onSettingChanged:()=>{
        const settings = c6.toJSON();
        const msg = {
            type:"onSettingChanged",
            settings:settings
        };
        MessageManager.f3N(msg);
        MessageManager.f3K(msg);
    },
    m5:()=>{
        MessageManager.f3N({type:"m5"});
    },
    m6:()=>{
        MessageManager.f3N({type:"onDeviceInit",data:Base64Utils.fw(JSON.stringify(c6.getOfflineDevice()))});
    }
};
/* 包含在devtools执行的消息 */
MessageManager.f3S = {
};

/**
 * 本地数据存储器
 */
class c6{
    static save_options() {
        c6.f2v(c6.v3   , c6.vx   );
        c6.f2v(c6.v4, c6.vy);
        c6.f2v(c6.v5 , c6.vz );
        c6.f2v(c6.v6     , c6.vA     );
        c6.f2v(c6.v7       , c6.vB       );
        c6.f2v(c6.v8  , c6.vC  );
        c6.f2v(c6.v9    , c6.vD    );
        c6.f2v(c6.va    , c6.vE    );
        c6.f2v(c6.vb     , c6.vF     );
        c6.f2v(c6.vc    , JSON.stringify(c6.vG));
        c6.f2v(c6.vd       , c6.vH       );
        c6.f2v(c6.ve    , c6.vI    );
        c6.f2v(c6.vf   , c6.vJ   );
        c6.f2v(c6.vg    , c6.vK    );
        c6.f2v(c6.vh       , c6.vL       );
        c6.f2v(c6.keyOfBarcodeCapacity , c6.configOfBarcodeCapacity );
        c6.f2v(c6.keyOfBarcodeCommitNum, c6.configOfBarcodeCommitNum);
    }
    static restore_options() {
        c6.vx    = c6.f2w(c6.v3   , c6.vi   );
        c6.vy = c6.f2w(c6.v4, c6.vj);
        c6.vz  = c6.f2w(c6.v5 , c6.vk );
        c6.vA      = c6.f2w(c6.v6     , c6.vl     );
        c6.vB        = c6.f2w(c6.v7       , c6.vm       );
        c6.vC   = c6.f2w(c6.v8  , c6.vn  );
        c6.vD     = c6.f2w(c6.v9    , c6.vo    );
        c6.vE     = c6.f2w(c6.va    , c6.vp    );
        c6.vF      = c6.f2w(c6.vb     , c6.vq     );
        c6.vH        = c6.f2w(c6.vd       , c6.vs       );
        c6.vI     = c6.f2w(c6.ve    , c6.vt    );
        c6.vJ    = c6.f2w(c6.vf   , c6.vu   );
        c6.vK     = c6.f2w(c6.vg    , c6.vv    );
        c6.vL        = c6.f2w(c6.vh       , c6.vw       );
        c6.vG     = c6.f2w(c6.vc    , c6.vr    );
        c6.configOfBarcodeCapacity  = c6.f2w(c6.keyOfBarcodeCapacity , c6.defaultOfBarcodeCapacity );
        c6.configOfBarcodeCommitNum = c6.f2w(c6.keyOfBarcodeCommitNum, c6.defaultOfBarcodeCommitNum);
        try {
            c6.vG = JSON.parse(c6.vG);
        }
        catch (e) {
            try {c6.vG = JSON.parse(c6.vr);} catch (e) {}
        }
    }
    static reset_options(){
        c6.f2v(c6.v3   , c6.vi   );
        c6.f2v(c6.v4, c6.vj);
        c6.f2v(c6.v5 , c6.vk );
        c6.f2v(c6.v6     , c6.vl     );
        c6.f2v(c6.v7       , c6.vm       );
        c6.f2v(c6.v8  , c6.vn  );
        c6.f2v(c6.v9    , c6.vo    );
        c6.f2v(c6.va    , c6.vp    );
        c6.f2v(c6.vb     , c6.vq     );
        c6.f2v(c6.vc    , c6.vr    );
        c6.f2v(c6.vd       , c6.vs       );
        c6.f2v(c6.ve    , c6.vt    );
        c6.f2v(c6.vf   , c6.vu   );
        c6.f2v(c6.vg    , c6.vv    );
        c6.f2v(c6.vh       , c6.vw       );
        c6.f2v(c6.keyOfBarcodeCapacity , c6.defaultOfBarcodeCapacity );
        c6.f2v(c6.keyOfBarcodeCommitNum, c6.defaultOfBarcodeCommitNum);
        c6.restore_options();
    }
	static restoreFromJSON(config){
		c6.vx    = config.vx   ;
		c6.vy = config.vy;
		c6.vz  = config.vz ;
		c6.vA      = config.vA     ;
		c6.vB        = config.vB       ;
		c6.vC   = config.vC  ;
		c6.vD     = config.vD    ;
		c6.vE     = config.vE    ;
		c6.vF      = config.vF     ;
		c6.vG     = JSON.parse(Base64Utils.fx(config.vG));
		c6.vH        = config.vH       ;
		c6.vI     = config.vI    ;
		c6.vJ    = config.vJ   ;
		c6.vK     = config.vK    ;
		c6.vL        = config.vL       ;
		c6.configOfBarcodeCapacity  = config.configOfBarcodeCapacity ;
		c6.configOfBarcodeCommitNum = config.configOfBarcodeCommitNum;
        c6.save_options();
	}
    static toJSON(){
        return {
			vx   : c6.vx   ,
			vy: c6.vy,
			vz : c6.vz ,
			vA     : c6.vA     ,
			vB       : c6.vB       ,
			vC  : c6.vC  ,
			vD    : c6.vD    ,
			vE    : c6.vE    ,
			vF     : c6.vF     ,
			vG    : Base64Utils.fw(JSON.stringify(c6.vG))    ,
			vH       : c6.vH       ,
			vI    : c6.vI    ,
			vJ   : c6.vJ   ,
			vK    : c6.vK    ,
			vL       : c6.vL       ,
			configOfBarcodeCapacity : c6.configOfBarcodeCapacity ,
			configOfBarcodeCommitNum: c6.configOfBarcodeCommitNum
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
    static _f1y = false;
    static setOfflineMode(run){
        this._f1y = run;
    }
    static f1y(){
        return this._f1y;
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
    static f2h(visible){
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
    static async f3W(message){
        const type = message.type;
        if(type === 'onSettingChanged'){
            let settings = "";
            try {settings = JSON.stringify(message.settings);} catch (e) {}
            c6.restoreFromJSON(message.settings);
            return true;
        }
        if(type === "m5"){
            MessageManager.f3Q.f3X();
            return true;
        }
        if(type === "m6"){
            const data = message.data;
            let json = {};
            try {json = JSON.parse(Base64Utils.fx(data));} catch (e) {}
            c6.setOfflineDevice(json);
            return true;
        }
        return false;
    }
}
c6.v3    = "__k_0_";
c6.v4 = "__k_1_";
c6.v5  = "__k_2_";
c6.v6      = "__k_3_";
c6.v7        = "__k_4_";
c6.v8   = "__k_5_";
c6.v9     = "__k_6_";
c6.va     = "__k_7_";
c6.vb      = "__k_8_";
c6.vc     = "__k_9_";
c6.vd        = "__k_A_";
c6.ve     = "__k_B_";
c6.vf    = "__k_C_";
c6.vg     = "__k_D_";
c6.vh        = "__k_E_";
c6.keyOfBarcodeCapacity  = "__k_F_";
c6.keyOfBarcodeCommitNum = "__k_G_";
c6.vi    = 12;
c6.vj = "";
c6.vk  = true;
c6.vl      = "";
c6.vm        = 3000;
c6.vn   = 400;
c6.vo     = 250;
c6.vp     = 150;
c6.vq      = "[0-9A-Za-z:]*::$\n[a-zA-Z0-9]{0,5}#[a-zA-Z0-9+/]*={0,2}$";
c6.vr     = JSON.stringify([
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
c6.vs        = 8;
c6.vt     = true;
c6.vu    = true;
c6.vv     = true;
c6.vw        = true;
c6.defaultOfBarcodeCapacity  = 20;
c6.defaultOfBarcodeCommitNum = 0;
c6.f2w = function (key,defaultValue){
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
c6.f2v = function(key,value){
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
c6.choseCheckDisplay = function(wordId1, wordType) {
    if (wordType === true || wordType === "true") {
        document.getElementById(wordId1).className = 'checked';
        document.getElementById(wordId1).check = true;
    } else {
        document.getElementById(wordId1).className = 'uncheck';
        document.getElementById(wordId1).check = false;
    }
}
c6.restore_options();
c6.setOfflineMode(false);

/**
 * 网络请求拦截器
 *
 * 实现逻辑：
 *      background: chrome.debugger.onEvent
 *      background: c1.f1
 *      background: c1.onInterceptXXXX -> f3M({type:"onApiIntercepted",method:"onInterceptXXXX",params:{requestInfo:{},requestId:""}})
 *      content   : onMessage(msg) -> c1.f1
 *      content   : c1.onInterceptXXXX -> f3H({type:"onApiInterceptCallback",requestId:"",result:true,data:{}});
 *      background: onMessage(msg) -> c1.f2
 *
 * 注意：网络拦截消息是异步阻塞的
 */
class c1 {
    static async f1(debuggee,method,params){}
    /**
     * 拦截获取试管信息
     *
     * 若本地为0则允许通过
     * @param resolve
     * @param reject
     * @param params
     */
    static f3        (resolve, reject, params){}
    /**
     * 拦截请求用户信息
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static f4       (resolve, reject, params){}
    /**
     * 拦截请求健康码信息
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static f5   (resolve, reject, params){}
    /**
     * 拦截提交采样数据
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static f6(resolve, reject, params){}
    /**
     * 拦截请求网格地点信息
     * @param resolve
     * @param reject
     * @param params
     */
    static f7       (resolve, reject, params){}
    /**
     * 拦截请求读卡设备信息
     * @param resolve
     * @param reject
     * @param params
     */
    static f8     (resolve, reject, params){}
    /**
     * 拦截核酸采集页面
     * 用于判断是否核酸那系统是否崩溃
     * @param resolve
     * @param reject
     * @param params
     */
    static f9       (resolve, reject, params){}
}
c1.tag = "c1";
c1.Message = {
    onApiIntercepted:{
        key:"onApiIntercepted",
        params:{
            method:"method",
            requestInfo:"requestInfo",
            requestId:"requestId"
        },
        methods:{
            f3:"f3",
            f4:"f4",
            f5:"f5",
            f6:"f6",
            f7:"f7",
            f8:"f8",
            f9:"f9",
        }
    },
    onApiInterceptCallback:{
        key:"onApiInterceptCallback",
        params: {
            requestId:"requestId",
            result:"result",
            data:"data",
        }
    }
};

/**
 * 网络接口拦截background实现
 */
c1.debug = function (msg) {
    LogUtils.log(msg,"Background.c1");
};
/* 监听chrome.debugger.onEvent中已注册监听的网络事件 */
c1.f1 = async function (debuggee,method,params){
    if(!method?.startsWith("F")) return false;
    if(method !== 'Fetch.requestPaused') return true;
    try {
        params.requestInfo = JSON.parseBody(params.request?.postData ?? params.request.url);
    } catch (e) {
        params.requestInfo = {};
    }
    let process = false;
    await new Promise(async (resolve, reject)=>{
        try {
            if (params.request.headers["HSCJ-Plugin-Offline-Mode"]?.toString() === true.toString()) {
                reject();
                return;
            }
            c1.interceptMap[params.requestId] = {
                resolve: (data) => resolve(data),
                reject: (err) => reject(err)
            };
            /* 获取试管已采样信息 */
            if (params.request.url.indexOf("getTestedListByTubeNum") > -1) {
                await FunctionUtils.sleep(500);
                await c1.f3(resolve, reject, params);
                return;
            }
            /* 获取本地缓存信息 */
            if (params.request.url.indexOf("findPeopleListForInput") > -1) {
                await c1.f4(resolve, reject, params);
                return;
            }
            /* 匹配健康码 */
            if (params.request.url.indexOf("decryptHealthQr") > -1) {
                await c1.f5(resolve, reject, params);
                return;
            }
            /* 提交采样记录 */
            if (params.request.url.indexOf("confirmed") > -1) {
                await c1.f6(resolve, reject, params);
                return;
            }
            /* 获取用户身份信息 */
            if (params.request.url.indexOf("findGridsByParentId") > -1) {
                await c1.f7(resolve, reject, params);
                return;
            }
            /* 核酸采样页面加载 */
            if(params.request.url === "https://hsjc.qingdao.gov.cn/"){
                await c1.f9(resolve, reject, params);
                setTimeout(()=>{
                    if(process) return;
                    resolve(`等待离线采样页面加载完毕...`);
                },10000);
                setTimeout(()=>{
                    if(process) return;
                    MessageManager.f3M({type:"m2"});
                },12000);
                return;
            }
            /* 获取读卡设备信息 */
            if (params.request.url.indexOf("findSiteDevice") > -1) {
                await FunctionUtils.sleep(3000);
                await c1.f8(resolve, reject, params);
                return;
            }
            try {delete c1.interceptMap[params.requestId];} catch (e) {}
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
                        body: Base64Utils.fw(JSON.stringify(body)),
                    }
                );
            } catch (e) {
                c1.debug(e);
            }
        })
        .catch(async ()=>{
            if(process) return;
            process = true;
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
                c1.debug(e);
            }
        });
    return true;
}
/* 监听content发给background消息的回调 */
c1.f2        = function(message){
    const type      = message.type;
    if(type !== c1.Message.onApiInterceptCallback.key) return false;
    const requestId = message.requestId;
    const result    = message.result;
    const data      = message.data;
    const executor  = c1.interceptMap[requestId];
    if(FunctionUtils.isNull(executor)) return true;
    if(executor.process === true) return true;
    executor.process = true;
    new Promise(async (resolve, reject) => {
        if(result === true){
            try {await executor.resolve(data);} catch (e) {LogUtils.warn(e)}
        }
        else{
            try {await executor.reject(data);} catch (e) {LogUtils.warn(e)}
        }
        try {delete c1.interceptMap[requestId];} catch (e) {}
        resolve();
    })
        .then(()=>{})
        .catch(()=>{});
    return true;
};
c1.f3         = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f3,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f4        = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f4,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f5    = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f5,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f6 = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f6,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f7        = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f7,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f8      = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f8,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.f9        = async function(resolve, reject, params){
    MessageManager.f3M({
        type:c1.Message.onApiIntercepted.key,
        method:c1.Message.onApiIntercepted.methods.f9,
        requestInfo:params.requestInfo,
        requestId:params.requestId
    });
};
c1.interceptMap = new Map();

/**
 * 核酸网络请求监听
 *
 * 实现原理：
 *      background: chrome.debugger.onEvent
 *      background: c1.fg
 *      background: onXXXXApiReceived -> f3M({type:"onApiReceived",method:"onXXXApiReceived",requestInfo:{},responseInfo:{}});
 *      content   : onMessage(msg) -> c1.fg
 *      content   : onXXXXApiReceived()
 */
class c3{
    static async fg(debuggee, method, params){}
    /**
     * 监听到请求登录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fh          = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求试管信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fi     = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求身份信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fj  = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求网格街道信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fk    = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求提交采样接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fl = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求健康码信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fm   = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求删除采样记录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fn = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求查询采样记录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fo   = function (requestInfo, responseInfo) {}
    /**
     * 监听到请求查询设备信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static fp = function (requestInfo, responseInfo) {}
}
c3.tag = "c3";
c3.Message = {
    onApiReceived:{
        key:"onApiReceived",
        params:{
            method      :"method",
            requestInfo :"requestInfo",
            responseInfo:"responseInfo"
        },
        methods: {
            fh         :"fh",
            fi    :"fi",
            fj :"fj",
            fk   :"fk",
            fl:"fl",
            fm  :"fm",
            fn:"fn",
            fo  :"fo",
            fp:"fp"
        }
    }
};

c3.debug = function (msg) {
    LogUtils.log(msg,"Background.c3");
};
/* pluginRequestId : chromeRequestId */
c3.requestIdMapper = new Map();
/* chromeRequestId:{pluginRequestId,timestamp} */
c3.reverseIdMapper = new Map();
c3.lastAutoDelTime = 0;
c3.markPluginRequestInfo = function (pluginRequestId, chromeRequestId, url, isOfflineRequest){
    const now = new Date().getTime();
    c3.requestIdMapper[pluginRequestId] = chromeRequestId;
    c3.reverseIdMapper[chromeRequestId] = {
        pluginRequestId:pluginRequestId,
        timestamp      : now,
        url            : url,
        offline        : isOfflineRequest
    };
    const lastAutoDelTime = c3.lastAutoDelTime ?? 0;
    if(now - lastAutoDelTime<30000){
        return;
    }
    c3.lastAutoDelTime = now;
    Object.keys(c3.reverseIdMapper).forEach((value, index, array) => {
       const reverseInfo = c3.reverseIdMapper[value];
       if(FunctionUtils.isNull(reverseInfo)) return;
       if(now - reverseInfo.timestamp >60000){
           delete c3.reverseIdMapper[value];
       }
    });
};
c3.getPluginRequestId = function (chromeRequestId) {
    return c3.reverseIdMapper[chromeRequestId]?.pluginRequestId;
};
c3.getPluginRequestUrl = function (chromeRequestId) {
    return c3.reverseIdMapper[chromeRequestId]?.url;
};
c3.isRequestOffline    = function (chromeRequestId) {
    return c3.reverseIdMapper[chromeRequestId]?.offline === true;
};
c3.fg          = async function (debuggee, method, params){
    if(!method?.startsWith("N")) return false;
    const debugUrl =  params?.request?.url ?? params?.response?.url ?? c3.getPluginRequestUrl(params.requestId) ?? "";
    /*alert("fg => "+JSON.stringify({method,params}));/**/
    /* stylesheet:css script:js document:html image:img other:other */
    const type = (params?.type??params?.initiator?.type)?.toLowerCase()?.trim()??"";
    /* Network.loadingFailed => '{"canceled":true,"errorText":"net::ERR_ABORTED","requestId":"7FFCAAD5B018713D0EEEE7E1A10EB0EC","timestamp":69867.803288,"type":"Document"}' */
    /*
    if(type === "document" && debugUrl.indexOf("hsjc.qingdao.gov.cn")>-1){
        if(debugUrl !== "https://hsjc.qingdao.gov.cn/") return true;
        if(method === 'Network.requestWillBeSent'){
            c3.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, false);
        }
        else if(method === "Network.loadingFailed"){
            if(c3.isRequestOffline(params.requestId)) return true;
            MessageManager.f3M({type:"m2"});
        }
        else if(method === 'Network.responseReceived'){
            c3.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, true);
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
            MessageManager.f3M({type:"fa",timestamp:new Date().getTime(), interval:60000});
            if(debugUrl.indexOf("login")>0){
                let requestInfo = {};
                try {requestInfo = JSON.parseBody(url);} catch (e) {}
                MessageManager.f3M({type:"m2",username:requestInfo.username,password:requestInfo.password});
            }
        }
        return true;
    }
    if(method === 'Network.requestWillBeSent'){
        const pluginRequestId  = params?.request?.headers["HSCJ-Plugin-Request-ID"];
        const isOfflineRequest = params?.request?.headers["HSCJ-Plugin-Offline-Mode"] === "true";
        if(!FunctionUtils.isNull(pluginRequestId)){
            c3.markPluginRequestInfo(pluginRequestId, params.requestId, debugUrl, isOfflineRequest);
        }
        else if(!isLocalHost && isHSCJHost){
            c3.markPluginRequestInfo(params.requestId, params.requestId, debugUrl, isOfflineRequest);
        }
        return true;
    }
    if(method !== 'Network.responseReceived') return true;
    if(isLocalHost) return true;
    if(!isHSCJHost) return true;
    const isOffline = c3.isRequestOffline(params.requestId);
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
    if(isUserInfoUrl && (params?.response?.status??0) >= 400){
        MessageManager.f3M({type:"m1"});
        return true;
    }
    const f1OUrl = isTubInfoUrl || isHealthyQRInfoUrl || isSamplingConfirmUrl || isGridInfoUrl || isIdCardInfoUrl;
    if(f1OUrl){
        MessageManager.f3M({type:'autoAddComponent'});
    }
    /* 提交PING值 */
    let canSubmitPing = c6.f1y() ? (!isCached) : true;
    if(canSubmitPing){
        const requestTime = params?.response?.timing?.requestTime??params?.response?.timing?.connectStart??0;
        const responseTime = params?.timestamp??0;
        const interval = (responseTime - requestTime)*1000;
        if(interval>0){
            MessageManager.f3M({type:"fa",timestamp:new Date().getTime() - interval, interval:interval});
        }
    }
    const isReceiverUrl = isLoginUrl || isTubInfoUrl || isIdCardInfoUrl || isGridInfoUrl || isHealthyQRInfoUrl || isSamplingConfirmUrl || isDeleteSamplingUrl || isQueryHistoryUrl || isFindSiteDeviceUrl;
    if(!isReceiverUrl) return true;
    let requestInfo = {};
    let responseInfo = {};
    const onApiReceived = function () {
        if (isTubInfoUrl) {
            c3.fi(requestInfo, responseInfo);
            return true;
        }
        if (isIdCardInfoUrl) {
            c3.fj(requestInfo, responseInfo);
            return true;
        }
        if (isGridInfoUrl) {
            c3.fk(requestInfo, responseInfo);
            return true;
        }
        if (isSamplingConfirmUrl) {
            c3.fl(requestInfo, responseInfo);
            return true;
        }
        if (isHealthyQRInfoUrl) {
            c3.fm(requestInfo, responseInfo);
            return true;
        }
        if(isFindSiteDeviceUrl){
            c3.fp(requestInfo, responseInfo);
            return true;
        }
        if (isDeleteSamplingUrl) {
            c3.fn(requestInfo, responseInfo);
            return true;
        }
        if (isQueryHistoryUrl) {
            c3.fo(requestInfo, responseInfo);
            return true;
        }
        if(isLoginUrl){
            c3.fh(requestInfo, responseInfo);
            return true;
        }
    }
    const pluginRequestId = c3.getPluginRequestId(params.requestId);
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
            const data = JSON.parse(base64Encoded ? Base64Utils.fx(body) : body);
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
                    MessageManager.f3M({type:"m2",username:requestInfo.username,password:requestInfo.password});
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
                    onApiReceived();
                });
            } catch (e) {
                c3.debug(e);
            }
        });
    } catch (e) {
        c3.debug(e);
    }
    return true;
}
c3.fh          = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fh,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fi     = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fi,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fj  = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fj,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fk    = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fk,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fl = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fl,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fm   = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fm,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fn = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fn,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fo   = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fo,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};
c3.fp = function (requestInfo, responseInfo){
    MessageManager.f3M({
        type        : c3.Message.onApiReceived.key,
        method      : c3.Message.onApiReceived.methods.fp,
        requestInfo : requestInfo,
        responseInfo: responseInfo
    });
};

const tag = "Background";
const env = "Background";
const workupTimestamp = new Date().getTime();
const proxyLog = console.log;
console.log = function (msg) {
    proxyLog(msg);
    MessageManager.f3M({type:"console.log",msg:msg});
}
const proxyWarn = console.warn;
console.warn = function (msg){
    proxyWarn(msg);
    MessageManager.f3M({type:"console.warn",msg:msg});
}
chrome.tabs.onRemoved.addListener(function(tabId, removed) {
    if(MessageManager.f3P.vM?.tabId === tabId){
        chrome.debugger.detach({tabId:tabId},()=>{
            MessageManager.f3P.vM = null;
            MessageManager.f3P.speak("插件已停止！",false);
        });
    }
});
async function f3T(tabId){
    let isServerOk = false;
    await new Promise((resolve, reject) => {
        try {
            const req = new XMLHttpRequest();
            req.responseType = 'document';
            req.onload = () => {
                if (req.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            };
            req.open('get', "https://hsjc.qingdao.gov.cn/");
            try{req.send();}catch(e){}
        } catch (e) {
            reject();
        }
        setTimeout(reject,5000);
    })
        .then(()=>{isServerOk = true;})
        .catch(()=>{isServerOk = false;});
    if(!isServerOk){
        try {chrome.tabs.reload(tabId, {bypassCache: true});} catch (e) {}
    }
}
async function f3U(tab){
    let isHSCJPage = (tab?.pendingUrl??"").indexOf("hsjc.qingdao.gov.cn")>-1 || (tab?.url??"").indexOf("hsjc.qingdao.gov.cn")>-1;
    if(!isHSCJPage) return;
    if(MessageManager.f3P.vM?.tabId === tab.id) return;
    /*确保只打开一个核酸采样系统*/
    if(MessageManager.f3P.vM != null){
        try {
            await chrome.tabs.remove(tab.id);
            if (tab.windowId != null && MessageManager.f3P.vM != null) {
                if (tab.windowId !== MessageManager.f3P.vM.windowId) {
                    await chrome.windows.update(tab.windowId, {focused: false});
                    await chrome.windows.update(MessageManager.f3P.vM.windowId, {focused: true});
                }
            }
            await chrome.tabs.update(MessageManager.f3P.vM.tabId, {active: true});
        } catch (e) {}
        return;
    }
    /* 经webpack打包后需要一段时间整个background加载完毕需要等待一段时间 */
    let delay = new Date().getTime() - workupTimestamp;
    delay = delay>3000? 1000 : (4000-delay);
    setTimeout(()=>MessageManager.f3P.speak("插件已运行！",false),delay);
    /*注入调试器拦截和监听网络*/
    const debuggee = {tabId : tab.id};
    MessageManager.f3P.vM = {tabId:tab.id,windowId:tab.windowId };
    chrome.debugger.attach(debuggee, '1.3', async () => {
        chrome.debugger.onEvent.addListener(async (source, method, params) => {
            if(source.tabId !== tab.id) return;
            if(await c3.fg(debuggee,method,params)) return;
            if(await c1.f1(debuggee,method,params)) return;
        });
        await chrome.debugger.sendCommand(debuggee,'Network.enable');
        await chrome.debugger.sendCommand(debuggee, 'Fetch.enable', {
            patterns: [
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/caiyang/findSiteDevice*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/caiyang/getTestedListByTubeNum*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/caiyang/findPeopleListForInput*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/people/decryptHealthQr*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/caiyang/confirmed*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: '*hsjc.qingdao.gov.cn/api/caiyang/findGridsByParentId*',
                    resourceType: 'XHR',
                },
                {
                    urlPattern: 'https://hsjc.qingdao.gov.cn/',
                    resourceType: "Document"
                }
            ],
        });
        await f3T(tab.id);
    });
}
chrome.tabs.onCreated.addListener((tab)=>{
    /*查询当前页面的url*/
    chrome.tabs.get(tab.id,async (tab)=>{
        await f3U(tab);
    });
});
chrome.debugger.onDetach.addListener((source, reason) => {
    /* 当前调试页面已关闭 */
    if(MessageManager.f3P.vM === null || MessageManager.f3P.vM === undefined) return;
    /* 用户关闭顶部调试提示 */
    MessageManager.f3P.vM = null;
    MessageManager.f3P.speak("插件已停止！",false);
    chrome.tabs.get(source.tabId,async (tab)=>{
        await f3U(tab);
    });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo?.status === "complete"){
        const url = tab.url;
        if(url === null) return;
        MessageManager.f3P.f2u();
        if(url.trim().endsWith("hsjc.qingdao.gov.cn/#/check/record")){
            MessageManager.f3M({type:"jumpHistQuery"});
            return;
        }
        if(url.trim().endsWith("hsjc.qingdao.gov.cn/#/check/scancheck")){
            MessageManager.f3M({type:"autoAddComponent"});
        }
    }
});
chrome.commands.onCommand.addListener((command) => {
    if(command === 'start_script'){
        MessageManager.f3M({type:'f3C'});
        return true;
    }
});
chrome.runtime.onMessage.addListener(async (request, sender, senderResponse) => {
	if(request.type === "speak"){
        MessageManager.f3P.speak(request.msg,true,request.rate,request.pitch);
		return true;
	}
	if(request.type === "speak2"){
        MessageManager.f3P.speak(request.msg,false,request.rate,request.pitch);
        return true;
    }
	/* 不能阻塞消息，否则后续消息无法接受及处理 */
	if(c1.f2(request)) return true;
	if(request.type === "m2"){
	    setTimeout(()=>MessageManager.f3M(request),3000);
	    return true;
    }
	if(request.type === "Jump2BreakLine"){
	    if(MessageManager.f3P.vM === null){
	        chrome.tabs.create({
                url:"https://hsjc.qingdao.gov.cn/",
                active:true
            });
            setTimeout(()=>MessageManager.f3M({type:"m2"}),3000);
            return true;
        }
	    chrome.tabs.query({active:true,currentWindow:true},async (tabs)=>{
	        const tab = tabs[0];
	        if(tab === undefined) return;
	        if(tab.windowId != MessageManager.f3P.vM.windowId){
                await chrome.windows.update(MessageManager.f3P.vM, {focused: true});
            }
            await chrome.tabs.update(MessageManager.f3P.vM.tabId, {active: true});
            MessageManager.f3M({type:"m2"});
        });
	    return true;
    }
    /*个人信息获取成功*/
    if(request.type === "f2M"){
        const player = document.createElement('audio');
        player.src=chrome.runtime.getURL('./static/audio/1778.wav');
        player.play();
        return true;
    }
    /*健康码扫描识别成功*/
    if(request.type === "f2L"){
        const player = document.createElement('audio');
        player.src = chrome.runtime.getURL('./static/audio/13193.wav');
        player.play();
        return true;
    }
    /* 采样失败或扫码失败 */
    if(request.type === "f2N"){
        const player = document.createElement('audio');
        player.src = chrome.runtime.getURL('./static/audio/13478.wav');
        player.play();
        return true;
    }
    if(request.type === "m3"){
        MessageManager.f3M({type:"onSettingChanged",settings:c6.toJSON()});
        return true;
    }
    if(request.type === 'onSettingChanged'){
        c6.restoreFromJSON(request.settings);
        MessageManager.f3M({type:"onSettingChanged",settings:c6.toJSON()});
        return true;
    }
    if(request.type === "m4"){
        MessageManager.f3M(request.msg);
        return true;
    }
});
chrome.browserAction.onClicked.addListener(function (tab){
    window.open('https://hsjc.qingdao.gov.cn/');
    return;
    if(tab == null || tab.url == null || tab.url.toLowerCase().startsWith('http')){
        window.open('https://hsjc.qingdao.gov.cn/');
    }
    else{
        MessageManager.f3P.speak("哎呀，出幺蛾子了！");
        /*无法跳转*/
        window.location.href = 'https://hsjc.qingdao.gov.cn/';
        window.open('https://hsjc.qingdao.gov.cn/','_self');
    }
});
chrome.tabs.query({active:true,currentWindow:true},async (tabs)=>{
    try {
        await tabs?.forEach(async tab => {
            await f3U(tab);
        });
    } catch (e) {}
});
/*可能不会播报，用于初始化语音引擎*/
MessageManager.f3P.speak("插件已加载！");

