class CryptUtils{
    static fy(text, key = "TheKeyOfmyDatadx") {
        if (typeof text !== 'string') {
            text = JSON.stringify(text);
        }
        const _key = CryptoJS.enc.Utf8.parse(key);
        const srcs = CryptoJS.enc.Utf8.parse(text);
        const encrypted = CryptoJS.AES.encrypt(srcs, _key, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    static fz(text, key="TheKeyOfmyDatadx") {
        if (typeof text !== 'string') {
            text = JSON.stringify(text);
        }
        const _key = CryptoJS.enc.Utf8.parse(key);
        const decrypt = CryptoJS.AES.decrypt(text, _key, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}

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

/**
 * 校验类
 */
class CheckUtils{
    static isValidIdCard(idNo){
        if(idNo == null) return false;
        const id = idNo.replace(RegExp("[^0-9xX]*"),"").toUpperCase();
        if(id.length !== 18) return false;
        const sfz_power  = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const sfz_verify = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let sum = 0;
        for(let i=0;i<18;++i){
            const ch = id[i];
            if(i<17) sum = sum + sfz_power[i]*(ch - '0');
            if(ch>='0' && ch <='9') continue;
            if(ch==='X'&&i===17)continue;
            return false;
        }
        return id[17] === sfz_verify[sum % 11][0];
    }
    static isRegexMatch(regex,toMatch){
        const rules = regex?.split("\n")??[];
        for(let i=0,ni=rules.length;i<ni;++i){
            const rule = rules[i];
            if(rule.trim().length===0) continue;
            const reg = new RegExp(rule, "ig");
            if((toMatch?.replace(reg,"")?.length??-1) === 0){
                return true;
            }
        }
        return false;
    }
}

/**
 * 二维码识别工具类
 */
class QRCodeUtils{
    static fP(imageData,ctx2d){
        return qrcode.decode(imageData,ctx2d);
    }
    static fQ(image){
        BarcodeReader.DecodeImage(image);
    }
    static async fR(result){
        if((result?.length??0) === 0) return false;
        /* '[{"Format":"Code128","Value":"123456789012"}]' */
        for(let i=0,ni=result.length;i<ni;++i){
            const code = result[i].Value;
            if((code?.length??0)===0) continue;
            for(let j=0;j<5;++j){
                if(await QRCodeUtils.f3y(code)) return true;
                await FunctionUtils.sleep(1000);
            }
        }
        return false;
    };
    static async fS(code){
        if((code?.length??0) === 0) return false;
        /*'EA602833EAF04C10C2A9ACA573C0A015F85' */
        for(let j=0;j<5;++j){
            if(await QRCodeUtils.f3x(code)) {
                return true;
            }
            await FunctionUtils.sleep(1000);
        }
        return false;
    }
    static f3y(code){}
    static f3x(code){}
}
BarcodeReader.Init();
BarcodeReader.SetImageCallback(function(result) {
    QRCodeUtils.fR(result);
});

/**
 * 图片文本检测工具
 */
class OCRUtils{
    static fN(callback){
        const formData = new FormData();
        formData.append("img","data:image/jpeg;base64,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ERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/Z");
        const xhr = new XMLHttpRequest();
        xhr.timeout = 3000;
        xhr.responseType = "json";
        xhr.onloadend = function () {
            if(callback.process === true) return ;
            callback.process = true;
            if(xhr.response==null) {
                callback.onFailure();
                return;
            }
            if(xhr.status == 200){
                callback.onSuccess();
                return;
            }
            callback.onFailure();
        };
        try {xhr.open("post", "http://localhost:3000");} catch (e) {callback.onFailure();}
        try {xhr.send(formData);} catch (e) {callback.onFailure();}
    }
    static async fO(imageData){
        let resolved = false;
        await new Promise((resolve, reject) => {
            const callback = {
                onSuccess:async (datas)=>{
                    /* '[{"box":[[73,95],[453,13],[471,95],[91,177]],"score":0.8304341435432434,"text":"牛黄解毒片"}]' */
                    for(let i=0,ni=datas.length??0;i<ni;++i){
                        const text = datas[i].text;
                        if(FunctionUtils.isNull(text)) continue;
                        if(!CheckUtils.isValidIdCard(text)) continue;
                        for(let j=0;j<5;++j){
                            if(await OCRUtils.f3w(text)) {
                                resolve();
                                return;
                            }
                            await FunctionUtils.sleep(1000);
                        }
                    }
                    reject();
                },
                onFailure:(err)=>{
                    reject();
                }
            };
            const formData = new FormData();
            const canvas = document.createElement("canvas");
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            canvas.getContext("2d").putImageData(imageData,0,0);
            const imageB64Data = canvas.toDataURL('image/jpeg');
            formData.append("img",imageB64Data);
            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000;
            xhr.responseType = "json";
            xhr.onloadend = async function () {
                if(callback.process === true) return ;
                callback.process = true;
                if(xhr.response===null || xhr.status!==200) return callback.onFailure();
                const response = JSON.parse(JSON.stringify(xhr?.response??{}));
                if(response == null) return callback.onFailure();
                if(response.code === 100 && response.data!=null){
                    callback.onSuccess(response.data);
                    return true;
                }
                callback.onFailure();
                return false;
            };
            try {
                xhr.open("post", "http://localhost:3000/");
                xhr.send(formData);
            } catch (e) {
                if(callback.process === true) return ;
                callback.process = true;
                callback.onFailure();
            }
        })
            .then(()=>{resolved = true;})
            .catch(()=>{});
    }
    static f3w(){}
}

/**
 * 事件类
 */
class DOMUtils {
    static copyHSCJ(ele){
        if(ele === null || ele === undefined) return;
        try{
            const eInput = new InputEvent('input', {bubbles: true,cancelable: false,inputType:"insertFromPaste",isComposing:false,composed:true});
            ele.dispatchEvent(eInput);
        }catch (e){}
    }
    static deleteHSCJ(ele){
        if(ele === null || ele === undefined) return;
        try{
            const eInput = new InputEvent('input', {bubbles: true,cancelable: false,inputType:"deleteByCut",isComposing:false,composed:true});
            ele.value = "";
            ele.dispatchEvent(eInput);
        }catch (e){}
    }
    /*判断地址*/
    static isUrl(url){
        return url === document.URL.trim();
    }
    /*移除焦点*/
    static blur(ele){
        if(ele === null || ele === undefined) return;
        ele.blur();
    }
    /*获取焦点*/
    static focus(ele){
        if(ele === null || ele === undefined) return;
        ele.focus();
    }
    /*是否已获取焦点*/
    static isFocused(ele){
        if(document == null) return false
        return document.activeElement === ele;
    }
    /*模拟点击事件*/
    static click(ele){
        try {
            const eClick = document.createEvent("mouseevents");
            eClick.initEvent("click", true, false);
            ele.dispatchEvent(eClick);
        } catch (e) {}
    }
    /* 模拟文本变化 */
    static change(ele){
        try{
            const eChange = document.createEvent("HTMLEvents");
            eChange.initEvent("change",false,true);
            ele.dispatchEvent(eChange);
        }
        catch(e){}
    }
    static innerHTML(ele,html){
        if(ele?.innerHTML === null) return;
        ele.innerHTML = html;
    }
    /*获取控件内容*/
    static read(ele){
        try {
            return ele?.value??"";
        } catch (e) {
            return ""
        }
    }
    /*写入控件内容*/
    static write(ele,text){
        if(ele === null || ele === undefined) return;
        ele.value = text;
    }
    /*模拟文本数据事件*/
    static input(ele,input){
        if(ele === null || ele === undefined) return;
        try{
            const eInput = new InputEvent('input', {bubbles: true,cancelable: false, data: input});
            ele.dispatchEvent(eInput);
        }catch (e){}
    }
    /*清除控件内容*/
    static clear(ele){
        if(ele === null || ele === undefined) return;
        ele.value = ""
    }
    /*删除控件列表*/
    static remove(eles){
        while(true){
            try{
                const warn = eles;
                if((warn?.length??0) === 0) break;
                warn[0].remove();
            } catch(e){
                console.warn(e);
            }
        }
    }
    /*判断文字内容为空*/
    static isEmpty(ele){
        return (DOMUtils.read(ele)?.length??0) === 0;
    }
    /* 根据配置定位控件位置 */
    static getEleByConfig(config){
        /*
            {
                no:5,
                bind:"证件读取按钮",
                type:"document.body.getElementsByClassName",
                id:"",
                class:"el-form",
                indexes:[0,5]
            }
        */
        if(config === null) return null;
        const json = config.constructor===String ? JSON.parse(config) : config;
        const type    = json["type"];
        const clazz   = json["class"];
        const id      = json["id"];
        const indexes = json["indexes"];
        let ele = null;
        if(type === "document.body.getElementsByClassName"){
            ele = document.body.getElementsByClassName(clazz);
        }
        else if(type === "document.getElementsByClassName"){
            ele = document.getElementsByClassName(clazz);
        }
        else if(type === "document.getElementById"){
            ele = document.getElementById(id);
        }
        else if(type === "document.getElementsByTagName"){
            ele = document.getElementsByTagName(id);
        }
        else if(type === "document.body.getElementsByTagName"){
            ele = document.body.getElementsByTagName(id);
        }
        if(ele === null) return null;
        for(let i =0,ni=indexes.length??0; i<ni; ++i){
            const index = indexes[i];
            if((ele.length??0)<index) return null;
            ele = ele[index];
            if(ele === null) return null;
        }
        return ele;
    }
    /* 使用字符串创建HTML DOM元素 */
    static createSingleEleByString(str){
        const div = document.createElement("div");
        div.innerHTML = str;
        const child = div.firstElementChild;
        div.removeChild(child);
        return child;
    }
    /* 清除所有cookie */
    static clearAllCookie() {
        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if(keys) {
            for(let i = keys.length; i--;){
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
            }
        }
    }
    static copyStyle(eSrc,eDst){
        if(eSrc===null || eSrc===undefined) return;
        if(eDst.style===null || eDst.style===undefined) eDst.style = "";
        const src = getComputedStyle(eSrc)??{};
        const dst = getComputedStyle(eDst)??{};
        for (let i in src) {
            try {if (dst[i] !== src[i]) eDst.style[i] = src[i];} catch (e) {}
        }
    }
}

class CameraUtils{
    static log(msg){
        /*LogUtils.log(msg,"CameraUtils");/**/
    }
    static isCameraOpen(video){
        if(FunctionUtils.isNull(video)) return false;
        const videoInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(videoInfo)) return false;
        return videoInfo?.stream?.active === true;
    }
    static delVideo(video){
        if(FunctionUtils.isNull(video)) return null;
        const id = CameraUtils.findVideo(video);
        if(FunctionUtils.isNull(id)) return;
        CameraUtils.queues[id] = null;
    }
    static async insertVideo(video,canvas,stream){
        if(FunctionUtils.isNull(video)) return;
        while(true){
            const timestamp = new Date().getTime();
            if(!FunctionUtils.isNull(CameraUtils.queues[timestamp])) {
                await FunctionUtils.sleep(1);
                continue;
            }
            CameraUtils.queues[timestamp] = {
                video:video,
                canvas:canvas,
                stream:stream
            };
            break;
        }
    }
    static getVideoInfo(video){
        if(FunctionUtils.isNull(video)) return null;
        const id = CameraUtils.findVideo(video);
        if(FunctionUtils.isNull(id)) return;
        return CameraUtils.queues[id]??null;
    }
    static findVideo(video){
        if(FunctionUtils.isNull(video)) return null;
        let result = null;
        const keys = Object.keys(CameraUtils.queues);
        for(let i=0,ni=keys.length;i<ni;++i){
            const timestamp = keys[i];
            if(CameraUtils.queues[timestamp]?.video === video) {
                result = timestamp;
                break;
            }
        }
        return result;
    }
    static async openCamera(video,canvas,reopen=true){
        if(FunctionUtils.isNull(video)) return false;
        const lastVideoInfo = CameraUtils.getVideoInfo(video);
        if(!FunctionUtils.isNull(lastVideoInfo)){
            if(!reopen){
                const stream = lastVideoInfo.stream;
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = function (e) {video.play();};
                return;
            }
            this.closeCamera(video)
        }
        let constraints = {audio:false,video:true};
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
                navigator.mediaDevices.enumerateDevices().then(function(b) {
                    b.forEach(function(deviceInfo) {
                        if("videoinput" === deviceInfo.kind && -1 < deviceInfo.label.toLowerCase().search("back")){
                            constraints.video = {
                                deviceId: {
                                    exact: deviceInfo.deviceId
                                },
                                facingMode: "environment"
                            }
                        }
                    });
                })
            }
        } catch (b) {
            CameraUtils.log(b);
        }
        let successFlag = false;
        const onOpenSuccess = function (stream) {
            const lastVideoInfo = CameraUtils.getVideoInfo(video);
            if(FunctionUtils.isNull(lastVideoInfo)){
                CameraUtils.insertVideo(video,canvas,stream);
            }
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {video.play();};
            successFlag = true;
        };
        const onOpenFailure = function (err){
            CameraUtils.log('摄像头打开失败，'+err);
        };
        if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
            try {
                await navigator.mediaDevices.getUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.getUserMedia){
            try {
                await navigator.getUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.webkitGetUserMedia){
            try {
                await navigator.webkitGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.mozGetUserMedia){
            try {
                await navigator.mozGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.msGetUserMedia){
            try {
                await navigator.msGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        onOpenFailure("推荐使用最新版QQ浏览器！");
    }
    static closeCamera(video){
        if(FunctionUtils.isNull(video)) return true;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return true;
        try {
            if (video.close) {
                video.close();
            }
        } catch (e) {}
        const stream = cameraInfo.stream;
        const tracks = stream.getTracks();
        for(let i=0,ni=tracks?.length??0;i<ni;++i){
            try {tracks[i]?.stop();} catch (e) {}
        }
        /*只读属性*/
        try {cameraInfo.stream.active = false;} catch (e) {}
        CameraUtils.delVideo(video);
        return true;
    }
    static takeImageData(video){
        if(FunctionUtils.isNull(video)) return null;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return null;
        const canvas = cameraInfo.canvas;
        if(FunctionUtils.isNull(canvas)) return null;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0);
        return context.getImageData(0, 0, canvas.width, canvas.height);
    }
    static takeImage(video){
        if(FunctionUtils.isNull(video)) return null;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return null;
        const canvas = cameraInfo.canvas;
        if(FunctionUtils.isNull(canvas)) return null;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0);
        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }
    static autoStartCaptureEngine(){}
}
CameraUtils.tag = "CameraUtils";
/* {timestamp:{video:video,canvas:canvas,stream:stream}} */
CameraUtils.queues = {};
CameraUtils.autoStartCaptureEngine = async function () {
    while(true){
        try {
            await FunctionUtils.sleep(1000);
            const keys = Object.keys(CameraUtils.queues);
            if(c6.vI === false) continue;
            for (let i = 0, ni = keys.length; i < ni; ++i) {
                const cameraInfo = CameraUtils.queues[keys[i]];
                if (FunctionUtils.isNull(cameraInfo)) continue;
                const video = cameraInfo["video"];
                if (FunctionUtils.isNull(video)) continue;
                const canvas = cameraInfo["canvas"];
                if(FunctionUtils.isNull(canvas)) continue;
                let context2D = canvas.getContext("2d");
                const OCREnable    = c6.vL;
                const QRCodeEnable = c6.vK;
                const BarcodeEnable= c6.vJ;
                if(OCREnable || QRCodeEnable){
                    const imageData = CameraUtils.takeImageData(video);
                    if(QRCodeEnable){
                        try {
                            const decodeResult = QRCodeUtils.fP(imageData, context2D);
                            if(await QRCodeUtils.fS(decodeResult)) continue;
                        } catch (e) {}
                    }
                    if(OCREnable){
                        if(await OCRUtils.fO(imageData)) continue;
                    }
                }
                if(BarcodeEnable){
                    QRCodeUtils.fQ(CameraUtils.takeImage(video));
                }
            }
        } catch (e) {
            CameraUtils.log(e);
        }
    }
    CameraUtils.autoStartCaptureEngine();
}
CameraUtils.autoStartCaptureEngine();

class WebSQLUtils{
    static fF(arr){
        if(arr === null || arr === undefined) return[];
        const result = [];
        for(let i=0,ni=arr.length;i<ni;++i){
            const value = arr[i];
            if(value === undefined || value === null){
                result.push(null);
            }
            else{
                result.push(value.toString());
            }
        }
        return result;
    }
    static fG(rs){
        let rows;
        if(!FunctionUtils.isNull(rs.rows)){
            rows = rs.rows;
        }
        else{
            rows = rs;
        }
        return rows;
    }
    static fH(resultSet){
        try{
            return resultSet.insertId > 0;
        }
        catch (e){
            return false;
        }
    }
    static fI(resultSet){
        return this.fJ(resultSet) > 0
    }
    static fJ(resultSet){
        return resultSet?.rowsAffected??0;
    }
    static fK(rs){
        let rows;
        if(!FunctionUtils.isNull(rs.rows)){
            rows = rs.rows;
        }
        else{
            rows = rs;
        }
        if((rows?.length??0) <= 0) return 0;
        const item = rows[0];
        return item[0];
    }
    static fL(db,tableName,callback){
        db.transaction((t)=>{
            t.executeSql("DROP TABLE "+tableName +";",[],callback.onSuccess,callback.onFailure);
        });
        setTimeout(callback.onFailure,10000);
    }
    /**
     * 删除当前系统时钟15天前的数据，保证一定保留14天内的。
     * @param dbPrefix
     * @param tableName
     * @returns {Promise<void>}
     */
    static async fM(dbPrefix,tableName){
        const now = new Date().getTime();
        const end = now - 15*24*3600*1000;
        const tag = "_the_last_drop_timestamp_of_"+dbPrefix;
        /*最早的时间是2022年11月15号*/
        let start = parseInt(localStorage[tag]??1668998640000);
        while(start<end){
            const yyyy_MM_dd = new Date(start).Format("yyyy_MM_dd");
            const dbName = dbPrefix + yyyy_MM_dd;
            const version = "1.0";
            const displayName = "";
            const db = await window.openDatabase(dbName, version, displayName,10*1024*1024,(db)=>{});
            for(let i=0;i<10;++i){
                await new Promise((resolve, reject) => {
                    this.fL(db,tableName,{
                        onSuccess:()=>{
                            resolve();
                        },
                        onFailure:()=>{
                            reject();
                        }
                    })
                })
                    .then(async ()=>{
                        i=10;
                    })
                    .catch(async ()=>{});
            }
            localStorage[tag] = start;
            start += 24*3600*1000;
        }
    }
}

/**
 * 本地网格街道信息缓存
 */
class LocalGridManager {
    static expiredKeyOfParentId(parentId){
        return "local_grid_exp_of_"+parentId;
    }
    static setParentIdExpired(parentId){
        const key   = LocalGridManager.expiredKeyOfParentId(parentId);
        const exp   = new Date().getTime() + 3600*1000*24;
        localStorage[key] = exp;
    }
    static isParentIdExpired(parentId){
        const key   = LocalGridManager.expiredKeyOfParentId(parentId);
        const value = localStorage[key] ?? 0;
        let time = 0;
        try {time = parseInt(value);} catch (e) {}
        return time < new Date().getTime();
    }
    static autoAdd(parentId, data){
        LocalGridManager.dataHolder[parentId] = data;
        LocalGridManager.setParentIdExpired(parentId);
    }
    static query(parentId){
        if(LocalGridManager.isParentIdExpired(parentId)){
            return {};
        }
        return LocalGridManager.dataHolder[parentId];
    }
}
LocalGridManager.dataHolder = {};

/**
 * 本地采样记录
 */
class LocalSamplingRecordManager {
    /**
     * 添加记录
     * @param data
     * @param callback
     */
    static addRecord(data,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(*) as \`0\` FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.fF([data.idType??1,data.idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    if(WebSQLUtils.fK(rs)>0){
                        callback.process = true;
                        callback.onSuccess();
                    }
                    else{
                        t.executeSql(
                            `
                                INSERT INTO sampling_record(
                                    idType,
                                    idNo,
                                    name,
                                    phone,
                                    tubNo,
                                    address,
                                    samplingTime,
                                    ids
                                )
                                VALUES(
                                    ?,?,?,?,?,?,?,?
                                );
                            `,
                            WebSQLUtils.fF([
                                data["idType"],
                                data["idCard"],
                                data["fullName"],
                                data["mobile"],
                                data["testNum"],
                                data["address"],
                                new Date().getTime(),
                                ""
                            ]),
                            (t,rs)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(WebSQLUtils.fH(rs)){
                                    callback.onSuccess();
                                }
                                else{
                                    callback.onFailure();
                                }
                            },
                            (t,e)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                            }
                        );
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 删除采样记录
     * @param idType
     * @param idCard
     * @param callback
     */
    static delRecord(idType,idCard,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.fF([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if(WebSQLUtils.fI(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 依据id删除采样记录
     * @param ids 删除id
     * @param callback
     */
    static delRecordByIds(ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE ids = ?;
                `,
                WebSQLUtils.fF([ids]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if(WebSQLUtils.fI(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 获取所有采样试管编号
     * @param callback
     */
    static listTubs(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT tubNo, COUNT(DISTINCT(tubNo)) as tubCount FROM sampling_record GROUP BY tubNo ;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 获取所有成员记录
     * @param callback
     */
    static listRecords(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT idType, idNo as tubCount FROM sampling_record;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 获取试管内采样记录
     * @param tubNo
     * @param callback
     */
    static getTubInfo(tubNo,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE tubNo = ? ORDER BY samplingTime ASC;
                `,
                WebSQLUtils.fF([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    static localSamplingInfo(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(DISTINCT(tubNo)) as tubCount, COUNT(*) as recordCount FROM sampling_record;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 列出所有已采集的记录
     * @param callback
     */
    static listAll(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record ORDER BY samplingTime DESC;
                `,
                WebSQLUtils.fF([]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rows));
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(err));
                }
            );
        });
    }
    /**
     * 获取用户采样信息
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUser(idType,idCard,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.fF([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 获取用户采样信息
     * @param ids
     * @param callback
     */
    static queryUserByDeleteIds(ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE ids = ?;
                `,
                WebSQLUtils.fF([ids]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 更新删除标记
     */
    static updateDelFlag(idType,idCard,ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET ids = ? WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.fF([ids,idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if(WebSQLUtils.fI(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
    static clear(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
}
LocalSamplingRecordManager.time  = new Date();
LocalSamplingRecordManager.yyyy_MM_dd = LocalSamplingRecordManager.time.Format("yyyy_MM_dd");
LocalSamplingRecordManager.dbName = "local_sampling_record_" + LocalSamplingRecordManager.yyyy_MM_dd;
LocalSamplingRecordManager.version = "1.0";
LocalSamplingRecordManager.displayName = "HSCJ.SamplingRecord" + LocalSamplingRecordManager.yyyy_MM_dd;
LocalSamplingRecordManager.db = window.openDatabase(LocalSamplingRecordManager.dbName,LocalSamplingRecordManager.version,LocalSamplingRecordManager.displayName,10*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            idType,
                            idNo,
                            name,
                            phone,
                            tubNo,
                            address,
                            samplingTime,
                            ids
                        );
                    `,
            WebSQLUtils.fF([]),
            (t,r)=>{
            },
            (t,e)=>{
                alert("采样记录数据库创建失败！\n\n"+LocalSamplingRecordManager.errorCallback());
            }
        );
    });
});
LocalSamplingRecordManager.db.transaction((t)=>{
    t.executeSql(
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            idType,
                            idNo,
                            name,
                            phone,
                            tubNo,
                            address,
                            samplingTime,
                            ids
                        );
                    `,
        WebSQLUtils.fF([]),
        (t,r)=>{},
        (t,e)=>{}
    );
});
/*
LocalSamplingRecordManager.db.transaction((t)=>{
   t.executeSql("delete from sampling_record" );
});
/**/
LocalSamplingRecordManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;
    LogUtils.warn(message);
    return message;
};
try {WebSQLUtils.fM("local_sampling_record_", "sampling_record");} catch (e) {}

/**
 * 本地用户缓存记录
 */
class LocalUserInfoManager {
    
    /**
     * 添加用户
     *
     * @param data
     * @param callback
     */
    static autoAddUser(data,callback){
        if(
            FunctionUtils.isNull(data) ||
            FunctionUtils.isNull(data.fullName) ||
            FunctionUtils.isNull(data.idCard) ||
            FunctionUtils.isNull(data.mobile) ||
            FunctionUtils.isNull(data.id)
        ) {
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(1) as \`0\` FROM sampling_record WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.fF([data.idType??1,data.idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    const item = resultSet.rows.item(0);
                    if(item === null || item === undefined || item.length <1 || item[0]<1){
                        transaction.executeSql(
                            `
                                INSERT INTO sampling_record(
                                    id            ,
                                    healthCode    ,
                                    passCode      ,
                                    fullName      ,
                                    idCard        ,
                                    idType        ,
                                    mobile        ,
                                    streetId      ,
                                    communityId   ,
                                    zoneId        ,
                                    category      ,
                                    address       ,
                                    remark        ,
                                    gridName      ,
                                    secondGridName,
                                    thirdGridName ,
                                    testNum       ,
                                    status        ,
                                    primaryId     ,
                                    secondaryId   ,
                                    thirdId       ,
                                    isNew         ,
                                    isPc          
                                ) values(
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?
                                );
                            `,
                            WebSQLUtils.fF([
                                data["id"            ],
                                data["healthCode"    ],
                                data["passCode"      ],
                                data["fullName"      ],
                                data["idCard"        ],
                                data["idType"        ]??1,
                                data["mobile"        ],
                                data["streetId"      ],
                                data["communityId"   ],
                                data["zoneId"        ],
                                data["category"      ],
                                data["address"       ],
                                data["remark"        ],
                                data["gridName"      ],
                                data["secondGridName"],
                                data["thirdGridName" ],
                                data["testNum"       ],
                                data["status"        ],
                                data["primaryId"     ],
                                data["secondaryId"   ],
                                data["thirdId"       ],
                                data["isNew"         ],
                                data["isPc"          ],
                            ]),
                            (transaction, resultSet)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(resultSet.insertId === undefined){
                                    callback.onFailure();
                                }
                                else{
                                    callback.onSuccess();
                                }
                            },
                            (SQLTransaction, SQLError) => {
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalUserInfoManager.errorCallback(e));
                            }
                        )
                    }
                    else{
                        transaction.executeSql(
                            `
                                UPDATE sampling_record 
                                SET
                                    id             = ?,
                                    fullName       = ?,
                                    idCard         = ?,
                                    idType         = ?,
                                    mobile         = ?,
                                    streetId       = ?,
                                    communityId    = ?,
                                    zoneId         = ?,
                                    category       = ?,
                                    address        = ?,
                                    remark         = ?,
                                    gridName       = ?,
                                    secondGridName = ?,
                                    thirdGridName  = ?,
                                    testNum        = ?,
                                    status         = ?,
                                    primaryId      = ?,
                                    secondaryId    = ?,
                                    thirdId        = ?,
                                    isNew          = ?,
                                    isPc           = ?
								WHERE 
									idType = ? AND idCard = ? ;
                            `,
                            WebSQLUtils.fF([
                                data["id"            ],
                                data["fullName"      ],
                                data["idCard"        ],
                                data["idType"        ]??1,
                                data["mobile"        ],
                                data["streetId"      ],
                                data["communityId"   ],
                                data["zoneId"        ],
                                data["category"      ],
                                data["address"       ],
                                data["remark"        ],
                                data["gridName"      ],
                                data["secondGridName"],
                                data["thirdGridName" ],
                                data["testNum"       ],
                                data["status"        ],
                                data["primaryId"     ],
                                data["secondaryId"   ],
                                data["thirdId"       ],
                                data["isNew"         ],
                                data["isPc"          ],
                                data["idType"        ]??1,
                                data["idCard"        ],
                            ]),
                            (transaction, resultSet)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(resultSet.rowsAffected === undefined){
                                    callback.onFailure();
                                }
                                else{
                                    callback.onSuccess();
                                }
                            },
                            (t,e) => {
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalUserInfoManager.errorCallback(e));
                            }
                        )
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 匹配id
     *
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUser(idType,idCard,callback){
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record 
                        WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.fF([idType,idCard]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(rows.rows.item(0));
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }
    /**
     * 匹配id
     * @param callback
     */
    static queryUserById(id,callback){
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE id = ?;
                `,
                WebSQLUtils.fF([id]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.fG(rows));
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }
    static parse2HealthCode(code){
        let c = code;
        if((c?.indexOf(":")??-1)>-1){
            c = c.substring(0,c.indexOf(":"))
            return c;
        }
        return null;
    }
    static enablePassCode = true;
    static parse2Passcode(code){
        let c = code;
        if(!LocalUserInfoManager.enablePassCode || c.indexOf("#")<0){
            return null;
        }
        c = c.substring(c.indexOf("#")+1,c.length);
        c = c.substring(0,56);
        let bytes = Base64Utils.fr(c);
        for(let i=bytes.length-1;i>31;--i){
            delete(bytes[i]);
        }
        bytes.length = 32;
        c = Base64Utils.fq(bytes);
        return c;
    }
    /**
     * 匹配健康码
     *
     * @param code
     * @param callback
     */
    static queryUserByHealthyCode(code,callback){
        let c = LocalUserInfoManager.parse2HealthCode(code);
        if(FunctionUtils.isNull(c)){
            LocalUserInfoManager.queryUserInfoByPassCode(code,callback);
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE healthCode = ?;
                `,
                WebSQLUtils.fF([c]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.fG(rows));
                    }
                    else{
                        callback.onSuccess([]);
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }
    /**
     * 更新健康码
     *
     * @param idType
     * @param idCard
     * @param healthyCode
     */
    static updateHealthyCode(idType, idCard, healthyCode, callback){
        let c = LocalUserInfoManager.parse2HealthCode(healthyCode);
        if(FunctionUtils.isNull(c)){
            LocalUserInfoManager.updatePassCode(idType,idCard,healthyCode,callback);
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET healthCode = ? WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.fF([c,idType,idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (SQLTransaction, SQLError) => {
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(SQLError));
                }
            )
        });
    }
    static updatePassCode(idType,idCard,passCode,callback){
        const c = LocalUserInfoManager.parse2Passcode(passCode);
        if(FunctionUtils.isNull(c)){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure("不是健康码，存储失败！");
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET passCode = ? WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.fF([c,idType,idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (SQLTransaction, SQLError) => {
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(SQLError));
                }
            );
        })
    };
    static queryUserInfoByPassCode(passCode,callback){
        const c = LocalUserInfoManager.parse2Passcode(passCode);
        if(FunctionUtils.isNull(c)){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure("不是健康码，存储失败！");
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE passCode = ?;
                `,
                WebSQLUtils.fF([c]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.fG(rows));
                    }
                    else{
                        callback.onSuccess([]);
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        });
    }
}
LocalUserInfoManager.dbName = "local_user_info";
LocalUserInfoManager.version = "1.0";
LocalUserInfoManager.displayName = "HSCJ.LocalUserInfo";
LocalUserInfoManager.db = window.openDatabase(LocalUserInfoManager.dbName, LocalUserInfoManager.version, LocalUserInfoManager.displayName,100*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            id            ,
                            healthCode    ,
                            passCode      ,
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
							PRIMARY KEY(idCard,idType)
                        );
                    `,
            WebSQLUtils.fF([]),
            (t,r)=>{
            },
            (t,e)=>{
                alert("本地缓存数据库创建失败！\n\n"+LocalUserInfoManager.errorCallback());
            }
        )
    })
});
LocalUserInfoManager.db.transaction((t)=>{
    t.executeSql(
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            id            ,
                            healthCode    ,
                            passCode      ,
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
							PRIMARY KEY(idCard,idType)
                        );
                    `,
        WebSQLUtils.fF([]),
        (t,r)=>{
        },
        (t,e)=>{
        }
    );
});
/*
LocalUserInfoManager.db.transaction(t=>{
    t.executeSql("alter table sampling_record add column passCode");
});
*/
/*
 LocalUserInfoManager.db.transaction(t=>{
    t.executeSql("delete from sampling_record");
});
 /**/
LocalUserInfoManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;
    LogUtils.warn(message);
    return message;
};

/**
 * 离线采样记录
 */
class OfflineSamplingManager {
    /**
     * 添加离线采样记录
     *
     * @param data
     * @param callback
     */
    static addOfflineRecord(data = new SamplingRequestEntity([]),callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "SELECT COUNT(*) as \`0\` FROM sampling_record WHERE idType = ? AND idCard = ?;",
                WebSQLUtils.fF([data.idType??1,data.idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    if(WebSQLUtils.fK(rs)>0){
                        callback.process = true;
                        callback.onFailure("该用户已加入离线采样记录！");
                    }
                    else{
                        t.executeSql(
                            `
                                INSERT INTO sampling_record(
                                        fullName      ,
                                        idCard        ,
                                        idType        ,
                                        mobile        ,
                                        streetId      ,
                                        communityId   ,
                                        zoneId        ,
                                        category      ,
                                        address       ,
                                        remark        ,
                                        gridName      ,
                                        secondGridName,
                                        thirdGridName ,
                                        testNum       ,
                                        status        ,
                                        primaryId     ,
                                        secondaryId   ,
                                        thirdId       ,
                                        isNew         ,
                                        isPc          ,
                                        optTime       ,
                                        err           ,
                                        mode
                                )
                                VALUES(
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?
                                );
                            `,
                            WebSQLUtils.fF([
                                data.fullName      ,
                                data.idCard        ,
                                data.idType        ??1,
                                data.mobile        ,
                                data.streetId      ,
                                data.communityId   ,
                                data.zoneId        ,
                                data.category      ,
                                data.address       ,
                                data.remark        ,
                                data.gridName      ,
                                data.secondGridName,
                                data.thirdGridName ,
                                data.testNum       ,
                                data.status        ,
                                data.primaryId     ,
                                data.secondaryId   ,
                                data.thirdId       ,
                                data.isNew         ,
                                data.isPc          ,
                                new Date().getTime(),
                                0,
                                data.mode
                            ]),
                            (t,rs)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(WebSQLUtils.fH(rs)){
                                    callback.onSuccess();
                                }
                                else{
                                    callback.onFailure("离线记录保存失败！");
                                }
                            },
                            (t,e)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(OfflineSamplingManager.errorCallback(e));
                            }
                        )
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }
    /**
     * 判断用户是否在离线采样记录中
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUserRecord(idType,idCard,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE idType=? AND idCard=?;
                `,
                WebSQLUtils.fF([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 删除离线采样记录
     * @param idType
     * @param idCard
     * @param callback
     */
    static delOfflineRecord(idType,idCard,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.fF([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if(WebSQLUtils.fI(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 获取离线采样试管记录
     * @param callback
     */
    static listTubNo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        DISTINCT(testNum), 
                        SUM(
                            CASE 
                                WHEN err = '2' THEN 1 
                                ELSE 0
                            END
                        ) as successNum,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 1 
                                ELSE 0
                            END
                        ) as failureNum,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 0
                                WHEN err = '2' THEN 0
                                ELSE 1
                            END
                        ) as samplingNum
                    FROM sampling_record
                    GROUP BY testNum;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 获取所有的离线记录以供查看
     * @param callback
     */
    static listAll(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT *
                    FROM sampling_record
                    ORDER BY optTime DESC;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 获取离线试管采样信息
     * @param tubNo
     * @param callback
     */
    static listOffline(tubNo,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT * FROM sampling_record WHERE testNum = ? ORDER BY optTime ASC;`,
                WebSQLUtils.fF([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    rs.rows
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 控制面板——查询整体进度信息
     *
     * 返回 剩余管数，剩余人数； 失败管数，失败人数
     * @param callback
     */
    static displayOfflineInfo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(restOfTubs)  as restOfTubs,
                        SUM(restOfNums)  as restOfNums,
                        SUM(failureTubs) as failureTubs,
                        SUM(failureNums) as failureNums
                    FROM
                        (
                            SELECT COUNT(DISTINCT(testNum)) as failureTubs, COUNT(*) as failureNums,                       0 as restOfTubs,        0 as restOfNums FROM sampling_record WHERE err = '1' UNION
                            SELECT                        0 as failureTubs,        0 as failureNums,COUNT(DISTINCT(testNum)) as restOfTubs, COUNT(*) as restOfNums FROM sampling_record WHERE err != '1' AND err !='2'
                        )
                    ;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }
    /**
     * 控制面板——查询试管进度信息
     * @param tubNo
     * @param callback
     */
    static displayTubNoInfo(tubNo, callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(
                            CASE 
                                WHEN err = '2' THEN 1 
                                ELSE 0
                            END
                        ) as successCount,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 1 
                                ELSE 0
                            END
                        ) as failureCount,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 0
                                WHEN err = '2' THEN 0
                                ELSE 1
                            END
                        ) as samplingCount
                    FROM sampling_record WHERE testNum = ?;
                `,
                WebSQLUtils.fF([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }
    static displaySummery(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        COUNT(DISTINCT(testNum)) as tubsCount, 
                        COUNT(*) as allCount
                    FROM sampling_record where err != '1';
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        })
    }
    static displaySummeryTubs(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT DISTINCT(testNum) as testNum FROM sampling_record where err != '1' group by testNum;`,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 获取离线采样整体进度信息
     * @param callback
     */
    static queryOfflineInfo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(tubsCount    ) as tubsCount, 
                        SUM(successCount ) as successCount,
                        SUM(failureCount ) as failureCount,
                        SUM(samplingCount) as samplingCount,
                        SUM(allCount     ) as allCount
                    FROM
                        (
                            SELECT                        0 as tubsCount,        0 as allCount,        0 as successCount, COUNT(*) as failureCount,        0 as samplingCount FROM sampling_record WHERE err = '1' UNION
                            SELECT                        0 as tubsCount,        0 as allCount, COUNT(*) as successCount,        0 as failureCount,        0 as samplingCount FROM sampling_record WHERE err = '2' UNION
                            SELECT                        0 as tubsCount,        0 as allCount,        0 as successCount,        0 as failureCount, COUNT(*) as samplingCount FROM sampling_record WHERE err != '1' AND err != '2' UNION
                            SELECT COUNT(DISTINCT(testNum)) as tubsCount, COUNT(*) as allCount,        0 as successCount,        0 as failureCount,        0 as samplingCount FROM sampling_record
                        )
                    ;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        });
    }
    /**
     * 标记采样结果
     * @param idType
     * @param idCard
     * @param result
     * @param callback
     */
    static markSamplingResult(idType,idCard, result,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "UPDATE sampling_record SET err = ? WHERE idCard = ? AND idType = ?;",
                WebSQLUtils.fF([result, idCard, idType]),
                (t,r)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if(WebSQLUtils.fI(r)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 列出处理队列试管列表
     * @param callback
     */
    static listProcessingTubNo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        testNum, 
                        MAX(optTime) as optTime
                    FROM (
                        SELECT * FROM sampling_record WHERE err != '1' AND err != '2'
                    )
                    GROUP BY testNum ORDER BY optTime;
                `,
                WebSQLUtils.fF([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 获取试管中待上传的离线记录
     * @param tubNo
     * @param callback
     */
    static listProcessingOffline(tubNo,callback){
        if(tubNo==null || tubNo.length === 0){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
        }
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT * FROM sampling_record WHERE testNum = ? AND err != '1' AND err != '2' ORDER BY optTime ASC;`,
                WebSQLUtils.fF([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    rs.rows
                    callback.onSuccess(WebSQLUtils.fG(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }
    /**
     * 清空数据库
     * @param callback
     */
    static clearDB(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "DELETE FROM sampling_record",
                WebSQLUtils.fF([]),
                (t,r)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    };
}
OfflineSamplingManager.createTime = new Date();
OfflineSamplingManager.yyyy_MM_dd = OfflineSamplingManager.createTime.Format("yyyy_MM_dd");
OfflineSamplingManager.dbName = "offline_sampling_record_" + OfflineSamplingManager.yyyy_MM_dd;
OfflineSamplingManager.version = "1.0";
OfflineSamplingManager.displayName = "HSCJ.OfflineRecord" + OfflineSamplingManager.yyyy_MM_dd;
OfflineSamplingManager.db = window.openDatabase(OfflineSamplingManager.dbName, OfflineSamplingManager.version, OfflineSamplingManager.displayName,10*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            /* err: 1：采样失败 2： 已采样 其他：等待采样 */
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
						    optTime       ,
							err           ,
							mode          
                        );
                    `,
            WebSQLUtils.fF([]),
            (t,r)=>{
            },
            (t,e)=>{
                alert("离线采样数据库创建失败！\n\n"+OfflineSamplingManager.errorCallback());
            }
        )
    })
});
OfflineSamplingManager.db.transaction((t)=>{
    t.executeSql(
        /* err: 1：采样失败 2： 已采样 其他：等待采样 */
        /* mode: 1:离线记录 其他:本地记录或网络记录 */
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
						    optTime       ,
							err           ,
							mode          
                        );
                    `,
        WebSQLUtils.fF([]),
        (t,r)=>{
        },
        (t,e)=>{
        }
    )
})
/*
OfflineSamplingManager.db.transaction((t)=>{
    t.executeSql("delete from sampling_record" );
});
*/
OfflineSamplingManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;
    LogUtils.warn(message);
    return message;
};
try {WebSQLUtils.fM("offline_sampling_record_", "sampling_record");} catch (e) {}

class ApiRequest{
    constructor(request, parent) {
        this.parent = parent;
        this.api    = parent.api;
        this.request = request;
        this.request.params = {};
        this.request.headers = {};
    }
    getHost(){ return this.request["host"]; }
    getMethod(){ return this.request["method"]; }
    getParams(){ return this.request["params"]; }
    getBody(){ return this.request["body"]; }
    getHeaders(){return this.request["headers"];}
    getParent(){ return this.parent; }
    host(url){
        this.request.host = url;
        return this;
    }
    headers(key,value){
        if(value === null ||value === undefined){
            try {delete this.request.headers[key];} catch (e) {}
        }
        else{
            this.request.headers[key] = value;
        }
        return this;
    }
    composeParams(url){
        if(this.request.params == null || this.request.params.length === 0) return url;
        let result = url;
        let compose = "?";
        Object.keys(this.request.params).forEach(
            (key, index, parent)=>{
                const value = this.request.params[key];
                if(compose !== "?"){
                    compose = compose + "&";
                }
                compose = compose + key + "=" + encodeURIComponent(value);
            }
        );
        return result + compose;
    }
    params(key,value){
        if(value == null) {
            try {delete this.request.params[key];} catch (e) {}
        }
        else{
            this.request.params[key] = value;
        }
        return this;
    }
    body(body){
        this.request.body = body;
        return this;
    }
    fields(fields){
        this.request.fields = fields;
        return this;
    }
    /**
     *   “”	                        将 responseType 设为空字符串与设置为"text"相同， 是默认类型 （实际上是 DOMString）。
     *   “arraybuffer”	            response 是一个包含二进制数据的 JavaScript ArrayBuffer 。
     *   “blob”	                    response 是一个包含二进制数据的 Blob 对象 。
     *   “document”	                response 是一个 HTML Document 或 XML XMLDocument ，这取决于接收到的数据的 MIME 类型。请参阅 HTML in XMLHttpRequest 以了解使用 XHR 获取 HTML 内容的更多信息。
     *   “json”	                    response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
     *   “text”	                    response 是包含在 DOMString 对象中的文本。
     *   “moz-chunked-arraybuffer”	与"arraybuffer"相似，但是数据会被接收到一个流中。
     *                              使用此响应类型时，响应中的值仅在 progress 事件的处理程序中可用，
     *                              并且只包含上一次响应 progress 事件以后收到的数据，而不是自请求发送以来收到的所有数据。
     *                              在 progress 事件处理时访问 response 将返回到目前为止收到的数据。
     *                              在 progress 事件处理程序之外访问， response 的值会始终为 null 。
     *   “ms-stream”	            response 是下载流的一部分；此响应类型仅允许下载请求，并且仅受Internet Explorer支持。
     *
     * @param type
     * @returns {ApiRequest}
     */
    responseType(type){
        this.request.responseType = type;
        return this;
    }
    doGet(callback,sync = false){
        this.request.method = "get";
        this.request.sync = sync;
        let response = {};
        this.api.onload = ()=>{
            response = this.api.response ?? {};
            response.status = this.api.status??500;
            if(this.request.responseType === "document"){
                response.doc  = this.api.responseXML;
            }
            else if(this.request.responseType === "text"){
                response.text = this.api.responseText;
            }
            callback(response);
        }
        this.api.responseType = this.request.responseType ?? "json";
        this.api.open("get",this.composeParams(this.request.host),!sync);
        Object.keys(this.request.headers).forEach((key, index, parent)=>{
            const value = this.request.headers[key];
            this.api.setRequestHeader(key,value);
        });
        this.api.send();
        if(sync){
            return response;
        }
    }
    doPost(callback,sync = false){
        this.request.method = "post";
        this.request.sync = sync;
        let response = {};
        this.api.onload = ()=>{
            response = this.api.response ?? {};
            response.status = this.api.status??500;
            callback(response);
        }
        this.api.responseType = this.request.responseType ?? "json";
        this.api.open("post",this.composeParams(this.request.host),!sync);
        Object.keys(this.request.headers).forEach((key, index, parent)=>{
            const value = this.request.headers[key];
            this.api.setRequestHeader(key,value);
        });
        if(this.request.body != null){
            this.api.send(this.request.body);
        }
        else{
            this.api.send();
        }
        if(sync){
            return response;
        }
    }
}

class ApiResponse{
    constructor(response, parent) {
        this.response = response;
        this.parent   = parent;
    }
    getStatus(){return this.parent.api.status;}
    getResponse(){return this.response.response;}
    getCode(){return this.response.response["code"];}
    getMessage(){return this.response.response["msg"];}
    getData(){return this.response.response["data"];}
    fields(fields){
        this.response.fields = fields;
        return this;
    }
    getParent(){ return this.parent; }
}

class Api{
    constructor() {
        this.api = new XMLHttpRequest();
        this.mRequest  = {};
        this.mResponse = {};
        this.request  = new ApiRequest (this.mRequest ,this);
        this.response = new ApiResponse(this.mResponse,this);
    }
    getRequest (){ return this.request ; }
    getResponse(){ return this.response; }
};

/**
 * 接口Api暴露
 */
class ApiProvider{
    constructor() {
        this.token = function (){
            try {
                return decodeURI(document.cookie.split(";").filter((value)=>{return value.trim().startsWith("vue_admin_template_token")})[0].trim().replace("vue_admin_template_token=",""));
            } catch (e) {
                return null;
            }
        };
    }
    login(username,password){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/login")
            .params("password",CryptUtils.fy(password))
            .params("username",CryptUtils.fy(username))
            .params("verifyCode","")
            .params("captcha","")
            .params("point","1")
            .params("appId","A424625631078450")
            .params("skey",CryptUtils.fy("A424625631078450;"+new Date().getTime()))
            .fields(
                [
                    ["username", "STRING" , "登录账号", "NOEMPTY"],
                    ["password", "STRING" , "登录密码", "NOEMPTY"],
                    ["point"   , "INTEGER", ""       , "1"],
                    ["appId"   , "STRING" , "设备号" ,  "A424625631078450" ],
                    ["skey"    , "STRING" , ""       , "AH7KqML9YtSSESUxROPTnjczbxNsDcW4Up2/+6evFEk="]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["token"     , "STRING"                  , "令牌"       , ""],
                    ["expireAt"  , "DATE:yyyy-MM-dd HH:mm:ss", "到期时间"    , ""],
                    ["username"  , "STRING"                  , "登录用户名"  , ""],
                    ["isAdmin"   , "BOOL"                    , "管理权限"    , ""],
                    ["fullName"  , "STRING"                  , "管理员"      , ""],
                    ["mobile"    , "STRING"                  , "管理员手机号" , ""],
                    ["regionCode", "STRING"                  , "市区号"      , ""],
                    ["regionName", "STRING"                  , "市区"        , ""],
                    ["gridId"    , "STRING"                  , "乡镇号"      , ""],
                    ["gridName"  , "STRING"                  , "乡镇"        , ""],
                    ["siteCode"  , "STRING"                  , "采样点ID"    , ""],
                    ["siteName"  , "STRING"                  , "采样点"      , ""],
                    ["testSiteId", "STRING"                  , "测试点ID"    , ""]
                ]
            )
            .getParent()
    }
    /**
     * 获取试管采样信息
     *
     * @param tubNo
     * @returns {Api}
     */
    tubInfo(tubNo){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/getTestedListByTubeNum")
            .headers("Authorization",this.token())
            .params("tubeNum",tubNo)
            .fields(
                [
                    ["tubeNum", "STRING", "采样管ID", "NOEMPTY", "" , "INPUT"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    [
                        ["peopleId"    , "STRING" , "用户ID"    , ""],
                        ["idCard"      , "STRING" , "身份号"    , ""],
                        ["fullName"    , "STRING" , "姓名"      , ""],
                        ["address"     , "STRING" , "地址"      , ""],
                        ["mobile"      , "STRING" , "手机"      , ""],
                        ["testSiteId"  , "STRING" , "采集点ID"  , ""],
                        ["testSiteName", "STRING" , "采集点名称" , ""],
                        ["testStatus"  , "INTEGER", "采集状态"   , "", "{\"0\":\"待送检\",\"1\":\"已送检\",\"2\":\"已送检\",\"3\":\"已完成\"}"]
                    ]
                ]
            )
            .getParent()
    }
    /**
     * 提交采样记录
     * @param tubNo
     * @param data
     * @returns {*}
     */
    samplingRecordByData(tubNo, data){
        data["testNum"] = tubNo;
        return this.samplingRecord(
            tubNo??data["testNum"],
            data["fullName"],
            data["idCard"],
            data["mobile"],
            data["idType"],
            data["tubeCapacity"],
            data["streetId"],
            data["communityId"],
            data["zoneId"],
            data["category"],
            data["address"],
            data["remark"],
            data["gridName"],
            data["secondGridName"],
            data["thirdGridName"],
            data["status"],
            data["primaryId"],
            data["secondaryId"],
            data["thirdId"],
            data["isNew"],
            data["isPc"]
        )
    }
    /**
     * 提交采样记录
     * @param testNum
     * @param fullName
     * @param idCard
     * @param mobile
     * @param idType
     * @param tubeCapacity
     * @param streetId
     * @param communityId
     * @param zoneId
     * @param category
     * @param address
     * @param remark
     * @param gridName
     * @param secondGridName
     * @param thirdGridName
     * @param status
     * @param primaryId
     * @param secondaryId
     * @param thirdId
     * @param isNew
     * @param isPc
     * @returns {*}
     */
    samplingRecord(testNum,fullName,idCard,mobile,idType,tubeCapacity,streetId,communityId,zoneId,category,address,remark,gridName,secondGridName,thirdGridName,status,primaryId,secondaryId,thirdId,isNew,isPc){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/confirmed")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                fullName      : fullName                 ,
                idCard        : idCard                   ,
                idType        : idType         ?? "1"    ,
                mobile        : mobile                   ,
                tubeCapacity  : tubeCapacity   ?? c6.getBarcodeCommitNum() ,
                streetId      : streetId       ?? ""     ,
                communityId   : communityId    ?? ""     ,
                zoneId        : zoneId         ?? null   ,
                category      : category       ?? "null" ,
                address       : address        ?? ""     ,
                remark        : remark         ?? ""     ,
                gridName      : gridName       ?? ""     ,
                secondGridName: secondGridName ?? ""     ,
                thirdGridName : thirdGridName  ?? ""     ,
                testNum       : testNum                  ,
                status        : status         ?? null   ,
                primaryId     : primaryId      ?? ""     ,
                secondaryId   : secondaryId    ?? ""     ,
                thirdId       : thirdId        ?? ""     ,
                isNew         : isNew          ?? "1"    ,
                isPc          : parseInt(isPc           ?? "0")    ,
            }))
            .fields(
                [
                    ["fullName"      , "STRING", "姓名"      , "NOEMPTY"],
                    ["idCard"        , "STRING", "身份号"    , "NOEMPTY"],
                    ["idType"        , "STRING", "认证类型"  , "1"       ],
                    ["mobile"        , "STRING", "电话"      , "NOEMPTY"],
                    ["tubeCapacity"  , "STRING", "试管容量"   , "20"     ],
                    ["streetId"      , "STRING", "街道（镇）" , ""       ],
                    ["communityId"   , "STRING", "社区ID"     , ""       ],
                    ["zoneId"        , "STRING", "?"         , "null"   ],
                    ["category"      , "STRING", "人员类别"   , "nullstr"],
                    ["address"       , "STRING", "地址"       , ""       ],
                    ["remark"        , "STRING", "附加说明"   , ""       ],
                    ["gridName"      , "STRING", "街道"       , ""       ],
                    ["secondGridName", "STRING", "居委会"     , ""       ],
                    ["thirdGridName" , "STRING", "小区"       , "null"   ],
                    ["testNum"       , "STRING", "采样试管编号", ""       ,"" , "INPUT"],
                    ["status"        , "STRING", "状态"       , "null"   ],
                    ["primaryId"     , "STRING", "?"          , ""       ],
                    ["secondaryId"   , "STRING", "?"          , ""       ],
                    ["thirdId"       , "STRING", "?"          , ""       ],
                    ["isNew"         , "STRING", "?"          , "1"      ],
                    ["isPc"          , "INTEGER", "是否是PC"  , "0"       ]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["testNum", "STRING", "试管编号", ""],
                    ["value"  , "STRING", "状态"    , ""]
                ]
            )
            .getParent()
    }
    /**
     * 获取身份证信息
     * @param idCard
     * @param pageNum
     * @param pageSize
     * @returns {*}
     */
    cardNoInfo(idCard,pageNum,pageSize){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/findPeopleListForInput")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                idCard:idCard,
                pageNum:parseInt(pageNum?.toString()??"1"),
                pageSize:parseInt(pageSize?.toString()??"30")
            }))
            .fields(
                [
                    ["idCard"  , "STRING" , "身份号", "NOEMPTY"],
                    ["pageNum" , "INTEGER", "页号"  , "1" ],
                    ["pageSize", "INTEGER", "页数"  , "30"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["id"            , "STRING"                  , "id"     , ""    ],
                    ["fullName"      , "STRING"                  , "姓名"    , ""    ],
                    ["idCard"        , "STRING"                  , "身份号"  , ""    ],
                    ["mobile"        , "STRING"                  , "手机"    , ""    ],
                    ["category"      , "STRING"                  , "类别"    , "null"],
                    ["primaryId"     , "STRING"                  , "街道id"  , "null"],
                    ["secondaryId"   , "STRING"                  , "社区id"  , "null"],
                    ["thirdId"       , "STRING"                  , "?"       , "null"],
                    ["regionCode"    , "STRING"                  , "区域码"   , ""    ],
                    ["address"       , "STRING"                  , "地址"     , ""    ],
                    ["remark"        , "STRING"                  , "备注"     , "null"],
                    ["source"        , "INTEGER"                 , "?"        , "0"   ],
                    ["createdTime"   , "DATE:yyyy-MM-dd HH:mm:ss", "创建时间" , ""    ],
                    ["updatedTime"   , "DATE:yyyy-MM-dd HH:mm:ss", "更新时间" , ""    ],
                    ["openId"        , "STRING"                  , "?"        , "null"],
                    ["status"        , "STRING"                  , "?"        , "null"],
                    ["delFlag"       , "BOOL"                    , "?"        , ""    ],
                    ["checkStatus"   , "INTEGER"                 , "?"        , ""    ],
                    ["sex"           , "INTEGER"                 , "性别1男"  , ""    ],
                    ["idType"        , "INTEGER"                 , "认证类型" , ""   ],
                    ["createdBy"     , "STRING"                  , "创建人员" , "null"],
                    ["updatedBy"     , "STRING"                  , "更新人员" , "null"],
                    ["regionName"    , "STRING"                  , "区域"     , "null"],
                    ["gridName"      , "STRING"                  , "街道"     , ""    ],
                    ["secondGridName", "STRING"                  , "居委会"   , ""    ],
                    ["thirdGridName" , "STRING"                  , "小区"     , ""    ],
                    ["gridCode"      , "STRING"                  , "街道号"   , ""    ],
                    ["secondGridCode", "STRING"                  , "居委会号" , ""    ],
                    ["thirdGridCode" , "STRING"                  , "小区号"   , ""    ],
                    ["isNew"         , "STRING"                  , "是否新建" , "1"   ],
                    ["isPc"          , "STRING"                  , "电脑录入" , "0"   ],
                    ["testNum"       , "STRING"                  , "试管编号" , "null"]
                ]
            )
            .getParent()
    }
    /**
     * 删除采样记录
     * @param ids
     * @param reason
     * @returns {*}
     */
    delSampling(ids,reason){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/testResult/delTestResult")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                ids: ids,
                reason:reason??""
            }))
            .fields(
                [
                    ["ids"    , "STRING", "采样ID"    , "NOEMPTY" , "" , "Api[6][\"id\"]"],
                    ["reason" , "STRING", "认证类型"  , ""         , "" , "INPUT" ]
                ]
            )
            .getParent()
    }
    /**
     * 获取历史采样记录
     * @param idCard
     * @param testNum
     * @param startTime
     * @param endTime
     * @param testStatus
     * @param pageNum
     * @param pageSize
     * @returns {*}
     */
    histSampling(idCard,testNum,startTime,endTime,testStatus,pageNum,pageSize){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/testResult/findTestResult")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                pageNum:parseInt(pageNum??1),
                pageSize:parseInt(pageSize??30),
                idCard:idCard??null,
                startTime:startTime??null,
                endTime:endTime??null,
                testNum:testNum??null,
                testStatus:testStatus??null
            }))
            .fields(
                [
                    ["pageNum"     , "INTEGER"                  , "查询页号", "1"   , "{\"String.format\":\"第%d页\"}"                                     ,"INPUT"],
                    ["pageSize"    , "INTEGER"                  , "分页页数", "30"  , "{\"String.format\":\"共%d页\"}"                                     ,"INPUT"],
                    ["idCard"      , "STRING"                   , "身份号"  , "null", ""                                                                  ,"INPUT","datablock@idCard"],
                    ["startTime"   , "DATE:yyyy-MM-dd HH:mm:ss" , "开始时间", "null", ""                                                                   ,"INPUT"],
                    ["endTime"     , "DATE:yyyy-MM-dd HH:mm:ss" , "结束时间", "null", ""                                                                   ,"INPUT"],
                    ["testNum"     , "STRING"                   , "试管编号", "null", ""                                                                   ,"INPUT"],
                    ["testStatus"  , "STRING"                   , "采集状态", "null", "{\"0\":\"待送检\",\"1\":\"已送检\",\"2\":\"已送检\",\"3\":\"已完成\"}"   ,"INPUT"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["id"              , "STRING", "采样ID"     , ""],
                    ["peopleId"        , "STRING", "人员ID"     , ""],
                    ["fullName"        , "STRING", "姓名"       , ""],
                    ["address"         , "STRING", "地址"       , ""],
                    ["mobile"          , "STRING", "手机号"     , ""],
                    ["idCard"          , "STRING", "身份号"     , ""],
                    ["testNum"         , "STRING", "试管编号"   , ""],
                    ["gatheringTime"   , "STRING", "采集时间"    , ""],
                    ["testOrgId"       , "STRING", "采样组织编号", ""],
                    ["testOrgName"     , "STRING", "采样组织名称", ""],
                    ["testSiteId"      , "STRING", "采样点编号"  , ""],
                    ["testSiteName"    , "STRING", "采样点名称"  , ""]
                ]
            )
            .getParent()
    }
    /**
     * 获取健康码信息
     * @param healthyQrCode
     * @returns {*}
     */
    healthyQrCodeInfo(healthyQrCode){
        const formData = new FormData();
        formData.append("healthCode",healthyQrCode);
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/people/decryptHealthQr")
            .headers("Authorization",this.token())
            .body(formData)
            .getParent()
    }
}
const ApiProviderInstance = new ApiProvider();

class DeCardDevice{
    static debug(msg){
        LogUtils.log(msg,"DeCardDevice");
    }
    static sendMessage(msg){
        DeCardDevice.socketHolder?.send(msg);
    }
    static async readIdCard(){
        DeCardDevice.sendMessage('{"func":"iReadIdentityCard","in":["1","0"]}');
    }
    static f3v(deviceType,idCard,idName){}
    static enabled = true;
    static setEnable(enable){
        DeCardDevice.enabled = enable;
    }
    static initFlag = false;
    static initDevice(){
        if(!DeCardDevice.enabled) return;
        if(DeCardDevice.initFlag) return;
        DeCardDevice.initFlag = true;
        try {
            const now = new Date().getTime();
            const lastInit = DeCardDevice.lLastInitTimestamp ?? 0;
            if (now - lastInit < 15000) {
                setTimeout(DeCardDevice.initDevice, 15000 - (now - lastInit));
                return;
            }
            DeCardDevice.lLastInitTimestamp = now;
            try {DeCardDevice.socketHolder?.close();} catch (e) {}
            try {
                const h = DeCardDevice.socketHolder = new WebSocket("ws://127.0.0.1:47903");
                h.onopen = function (t) {
                }
                h.onclose = function (t) {
                    DeCardDevice.initDevice();
                }
                h.onmessage = function (e) {
                    const message = JSON.parseBody(e?.data ?? {});
                    const idCardInfo = (message?.out ?? {})[0]?.split("|") ?? [];
                    if ("设备连接失败" === idCardInfo[0]) return;
                    const idCard = idCardInfo[5];
                    const fullName = idCardInfo[0];
                    if (idCard === null || idCard === undefined) return;
                    new Promise(async (resolve, reject) => {
                        try {
                            for (let i = 0; i < 5; ++i) {
                                if (await DeCardDevice.f3v("DeCard",idCard,fullName)) return;
                                await FunctionUtils.sleep(1000);
                            }
                        } finally {
                            try {resolve();} catch (e) {}
                        }
                    })
                        .then(() => {})
                        .catch(() => {});
                }
                h.onerror = function (e) {
                    DeCardDevice.initDevice();
                }
            } catch (e) {
                DeCardDevice.initDevice();
            }
        } catch (e) {
            DeCardDevice.initFlag = false;
        }
    }
}

class HuaShiDevice{
    static debug(msg){
        LogUtils.log(msg,"HuaShiDevice");
    }
    static async openDevice(callback){
        const api = new Api()
            .getRequest()
            .host("http://127.0.0.1:19196/OpenDevice")
            .getParent();
        const req = api.getRequest();
        req.doGet((response)=> {
            const data = JSON.parseBody(response?.data ?? {});
            if(callback.process === true) return;
            callback.process = true;
            if (0 !== data.resultFlag) {
                callback.onFailure();
                return;
            }
            callback.onSuccess();
        });
    }
    static async readIdCard(){
        const now = new Date().getTime();
        if(now - (HuaShiDevice.oDeviceOpenInfo?.time??0) < 30000){
            await HuaShiDevice._readIdCard2();
        }
        else{
            await HuaShiDevice._readIdCard1();
        }
    }
    static async _readIdCard1(){
        await HuaShiDevice.openDevice({
            onSuccess:()=>{
                HuaShiDevice.oDeviceOpenInfo = {
                    time: new Date().getTime()
                };
                HuaShiDevice._readIdCard2();
            },
            onFailure:()=>{
                setTimeout(()=>HuaShiDevice._readIdCard1(),5000);
            }
        });
    }
    static async _readIdCard2(){
        const api = new Api()
            .getRequest()
            .host("http://127.0.0.1:19196/readcard")
            .getParent();
        const req = api.getRequest();
        req.doGet((response)=>{
            const data = JSON.parseBody(response?.data??{});
            if(0 !== data?.resultFlag) return;
            const idCard   = data?.certNumber;
            const fullName = data?.partyName;
            if(idCard === null || idCard === undefined) return;
            new Promise(async (resolve, reject) => {
                try {
                    for (let i = 0; i < 5; ++i) {
                        if(await HuaShiDevice.f3v("HuaShi",idCard,fullName)) return;
                        await FunctionUtils.sleep(1000);
                    }
                } finally {
                    try {resolve();} catch (e) {}
                }
            })
                .then(()=>{})
                .catch(()=>{});
        });
    }
    static f3v(deviceType,idCard,idName){}
}

class ShenSiDevice{
    static debug(msg){
        LogUtils.log(msg,"ShenSiDevice");
    }
    static sendMessage(msg){
        try {
            ShenSiDevice.socketHolder?.send(msg);
        } catch (e) {
        }
    }
    static async readIdCard(){
        ShenSiDevice.sendMessage('{"Method":"IdReadCard","CardType":"0","InfoEncoding":"1","TimeOutMs":"0"}');
    }
    static f3v(deviceType,idCard,idName){}
    static enabled = true;
    static setEnable(enable){
        ShenSiDevice.enabled = enable;
    }
    static initFlag = false;
    static initDevice(){
        if(!ShenSiDevice.enabled) return;
        if(ShenSiDevice.initFlag) return;
        ShenSiDevice.initFlag = true;
        try {
            const now = new Date().getTime();
            const lastInit = ShenSiDevice.lLastInitTimestamp ?? 0;
            if (now - lastInit < 15000) {
                setTimeout(ShenSiDevice.initDevice, 15000 - (now - lastInit));
                return;
            }
            ShenSiDevice.lLastInitTimestamp = now;
            try {ShenSiDevice.socketHolder?.close();} catch (e) {}
            try {
                const g = ShenSiDevice.socketHolder = new WebSocket("ws://127.0.0.1:9000");
                g.onopen = function (e) {
                    ShenSiDevice.sendMessage('{"Method":"OpenDevice","PortType":"AUTO","PortPara":"","ExtendPara":""}');
                };
                g.onclose = function (t) {
                    ShenSiDevice.initDevice();
                };
                g.onmessage = function (e) {
                    const message = JSON.parseBody(e?.data ?? {});
                    if ("IdReadCard" !== message?.Method) return;
                    if (0 !== parseInt(message?.RetCode ?? -1)) return;
                    const cardInfos = message?.IdCardInfo?.split(":") ?? [];
                    const idCardNo = cardInfos[9];
                    const fullName = cardInfos[5];
                    if (idCardNo === null || idCardNo === undefined) return;
                    new Promise(async (resolve, reject) => {
                        try {
                            for (let i = 0; i < 5; ++i) {
                                if (await ShenSiDevice.f3v("ShenSi",idCardNo,fullName)) return;
                                await FunctionUtils.sleep(1000);
                            }
                        } finally {
                            try {resolve();} catch (e) {}
                        }
                    })
                        .then(() => {})
                        .catch(() => {});
                };
                g.onerror = function (e) {
                    ShenSiDevice.initDevice();
                };
            } catch (e) {
                ShenSiDevice.initDevice();
            }
        } finally {
            ShenSiDevice.initFlag = false;
        }
    }
}

class DeviceManager{
    static f3v(idCard){}
    static _availableDevice = null;
    static _lLastAvailabelTime = 0;
    static _f3v = (deviceType,idCard,idName) => {
        DeviceManager._availableDevice = deviceType;
        DeviceManager._lLastAvailabelTime = new Date().getTime();
        DeviceManager.f3v(idCard);
    }
    static readIdCard(){
        if(new Date().getTime() - this._lLastAvailabelTime<30000){
            if(DeviceManager._availableDevice === "DeCard"){
                DeCardDevice.readIdCard();
                return;
            }
            if(DeviceManager._availableDevice === "ShenSi"){
                ShenSiDevice.readIdCard();
                return;
            }
            if(DeviceManager._availableDevice === "HuaShi"){
                HuaShiDevice.readIdCard();
                return;
            }
        }
        DeCardDevice.readIdCard();
        HuaShiDevice.readIdCard();
        ShenSiDevice.readIdCard();
    }
    static initDevice(){
        DeCardDevice.initDevice();
        ShenSiDevice.initDevice();
        HuaShiDevice.openDevice({onSuccess:()=>{},onFailure:()=>{}});
    }
}
DeCardDevice.f3v = DeviceManager._f3v;
HuaShiDevice.f3v = DeviceManager._f3v;
ShenSiDevice.f3v = DeviceManager._f3v;

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
 * 接口请求调用封装
 */
class c2{
    static debug(msg){
        LogUtils.log(msg,"c2");
    }
    /**
     * 提交一次接口请求延迟信息
     * @param timestamp
     * @param useage
     * @returns {Promise<void>}
     */
    static async fa(timestamp, useage){
        const now = new Date().getTime();
        const exp = now - c2.maxExpiredRange;
        if(timestamp<=exp) return;
        let usages = c2.pingHolder[timestamp];
        if(usages === undefined){
            usages = [useage];
            c2.pingHolder[timestamp] = usages;
        }
        else{
            usages.push(useage);
        }
        while(c2.pingHolder.size>0){
            const time = parseInt(Object.entries(c2.pingHolder)[0][0]);
            if(time < exp){
                c2.pingHolder.delete(time);
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
    static fb(range = 5*60*1000){
        if(range>=c2.maxExpiredRange) return -1;
        const now = new Date().getTime();
        const exp = now - range;
        let avg   = 0;
        let count = 0;
        for(let key in c2.pingHolder){
            const time = parseInt(key);
            if(time<exp) continue;
            const usages = c2.pingHolder[key] ?? [];
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
    static fc(callback = null){
        const lastPingTimestamp = c2.lLastPingTimestamp??0;
        let start = new Date().getTime();
        if(start - lastPingTimestamp < 120000 && FunctionUtils.isNull(callback)){
            return;
        }
        c2.lLastPingTimestamp = start;
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
        req.doPost((response) => {
            if(this.process === true) return;
            this.process = true;
            const end = new Date().getTime();
            c2.debug('ping => finished at '+new Date(end).Format("yyyy-MM-dd hh:mm:ss:S"));
            const datas = JSON.parseBody(response);
            const code  = datas["code"];
            const status = response.status;
            if(status ===200 || status === 401 || code === 401){
                const interval = end - start;
                c2.debug('ping => success in '+interval +"ms");
                if(!FunctionUtils.isNull(callback)) callback(interval);
                c2.fa(end,interval);
            }
            else{
                c2.debug('ping => failure!');
                if(!FunctionUtils.isNull(callback)) callback(60000);
                c2.fa(end,60000);
            }
        }, false);
    }
    static requestIdCounter = 0;
    static lastAutoDelTime  = 0;
    static fd(){
        return ++c2.requestIdCounter;
    }
    static apiInfo = new Map();
    static fe(requestId,requestInfo,responseInfo){
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
        const lastAutoDelTime = c2.lastAutoDelTime ?? 0;
        if(now - lastAutoDelTime<30000){
            return;
        }
        c2.lastAutoDelTime = now;
        Object.keys(this.apiInfo).forEach((value, index, array) => {
            const info = this.apiInfo[value];
            if(FunctionUtils.isNull(info)) return;
            const time = info.timestamp;
            if(now - time >60000){
                delete this.apiInfo[value];
            }
        });
    }
    static ff(requestId){
        return this.apiInfo[requestId];
    }
    static _doPostInternal(request,callback,offline=false,sync=false){
        callback.process = false;
        const requestId = this.fd();
        const requestBody = request.request.body;
        const requestUrl  = request.composeParams(request.getHost());
        const requestInfo = JSON.parseBody(requestBody??requestUrl);
        this.fe(requestId,requestInfo,null);
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
                    this.fe(requestId,requestInfo,{code:status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
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
                    this.fe(requestId,requestInfo,{code,msg,datas:data});
                    callback.onSuccess(code, msg, data);
                } else {
                    this.fe(requestId,requestInfo,{code:code ?? status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(code ?? status ?? 500, msg ?? "请求失败，错误代码" + status, status);
                }
            }, sync);
        } catch (e) {
            if (callback.process === true) return;
            callback.process = true;
            callback.onFailure(500, e ?? "请求失败!",500);
            this.fe(requestId,requestInfo,{code:500,msg:"请求失败，错误代码!",status:500});
        }
    }
    static _doGetInternal(request,callback,offline=false,sync=false){
        callback.process = false;
        const requestId = this.fd();
        const requestBody = request.request.body;
        const requestUrl  = request.composeParams(request.getHost());
        const requestInfo = JSON.parseBody(requestBody??requestUrl);
        this.fe(requestId,requestInfo,null);
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
                    this.fe(requestId,requestInfo,{code:status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
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
                    this.fe(requestId,requestInfo,{code,msg,datas:data});
                    callback.onSuccess(code, msg, data);
                } else {
                    this.fe(requestId,requestInfo,{code:code ?? status ?? 500,msg:msg ?? "请求失败，错误代码" + status,status:status});
                    callback.onFailure(code ?? status ?? 500, msg ?? "请求失败，错误代码" + status, status);
                }
            }, sync);
        } catch (e) {
            if (callback.process === true) return;
            callback.process = true;
            callback.onFailure(500, e ?? "请求失败!",500);
            this.fe(requestId,requestInfo,{code:500,msg:"请求失败，错误代码!",status:500});
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
c2.tag = "c2";
/* {sort:{timestamp:[reqId]},request:{reqId:timestamp}} */
c2.requestMapper = new Map();
c2.requestMapper.sort = new Map();
c2.requestMapper.request = new Map();
/* {timestamp:[interval]} */
c2.pingHolder = new Map();
c2.maxExpiredRange = 10*60*1000;

/**
 * 核酸自动化采样脚本
 */
class c8{
    static debug(msg){}
    static warn (msg){}
    static speak(msg,enque,rate,pitch){}
    /*试管容量*/
    static f1P     (){ }
    /*试管编号*/
    static f1Q      (){ }
    /*居民码*/
    static f1R       (){ }
    /*证件类型*/
    static f1S       (){ }
    /*证件号*/
    static f1T         (){ }
    /*证件读取按钮*/
    static f1U       (){ }
    /*姓名*/
    static f1V         (){ }
    /*手机号码*/
    static f1W        (){ }
    /*镇*/
    static f1X         (){ }
    /*村*/
    static f1Y      (){ }
    /*小区*/
    static f1Z    (){ }
    /*人员类别*/
    static f20   (){ }
    /*采样点*/
    static f21 (){ }
    /*采样时间*/
    static f22 (){ }
    /*同试管已采样人数*/
    static f23(){ }
    /*住址*/
    static f24      (){ }
    /*附加说明*/
    static f25         (){ }
    /*设置试管已采样数量*/
    static f2n (num){}
    /*获取采样url*/
    static f1L    (){}
    /*是否是采样页面*/
    static f1O     (){}
    /*读取身份证*/
    static f2F   (){ DOMUtils.click(c8.f1U()); }
    /* 重置核酸输入信息（保留条码） */
    static f2G     (){}
    /* 清空核酸输入信息 */
    static f2H     (){}
    /*移除条码长度过长警告*/
    static f2I (){ }
    /*移除读卡失败警告*/
    static f2J  (){ }
    /*移除采样满弹窗*/
    static f2K  (){ }
    /* 播报扫描健康码 */
    static f2L(){ MessageManager.f3Q.f2L(); }
    /* 播报开始提交采样音乐 */
    static f2M(){ MessageManager.f3Q.f2M(); }
    /* 播放错误音乐 */
    static f2N(){ MessageManager.f3Q.f2N(); }
    /* 服务响应后与脚本同步 */
    static f2O(isWait){ c8.bWaitResponseFlag = isWait; };
    static f2P(){ return c8.bWaitResponseFlag === true; };
    /* 已录入的试管编号 */
    static f2Q(barcode){ c8.sLastInputBarcode = barcode; }
    static f2R(){ return c8.sLastInputBarcode??""; };
    /* 当前正在处理的健康码 */
    static f2S(code){ c8.sLastHealthQRCode = code; }
    static f2T(){ return c8.sLastHealthQRCode??""; }
    /* 当前正在处理的身份号 */
    static f2U(id){ c8.sLastInputIdNo = id?.toUpperCase(); }
    static f2V(){ return c8.sLastInputIdNo??""; }
    /* 同一个身份证占据输入框的时间 */
    static f2W(time){ c8.lLastStartInputIdNoTimestamp = time; }
    static f2X(){ return c8.lLastStartInputIdNoTimestamp??0; }
    /* 上次提交采样的身份号 */
    static f2Y(idNo){ c8.sLastConfirmedIdNo = idNo; }
    static f2Z(){ return c8.sLastConfirmedIdNo??""; }
    /* 响应身份号信息的控制器 */
    static f30(controller){ c8.oFindPeopleController = controller; }
    static f31(){ return c8.oFindPeopleController??{}; }
    /* 响应健康码信息的控制器 */
    static f32(controller){ c8.oFindHealthQRInfoController = controller; }
    static f33(){ return c8.oFindHealthQRInfoController??{}; }
    /* 响应提交采样信息的控制器 */
    static f34(controller){ c8.oConfirmController = controller; }
    static f35(){ return c8.oConfirmController??{}; }
    /* 设置手动录入 */
    static f36(isManual){ c8.ManualInputState = isManual; }
    /* 判断手动录入 */
    static f37(){ return c8.ManualInputState === true; }
    /* 启动脚本 */
    static f38(){ c8.f3a(true); }
    /* 停止脚本 */
    static f39(){ c8.f3a(false); }
    /* 设置脚本启动状态 */
    static f3a(run){ c8.f3d(run); }
    /* 状态变化监听 */
    static f3b(run){}
    /* 判断脚本是否已启动 */
    static f3c(){ return c8.scriptRunningState === true; }
    /* 启停脚本 */
    static f3d(run){}
    /* 脚本：自动填充试管容量 */
    static f3e(){}
    /* 脚本：条码空事件 */
    static f3f(){}
    /* 脚本：输入条码事件 */
    static f3g(){}
    /* 脚本：验证扫描条码事件 */
    static f3h(){}
    /* 脚本：验证条码事件 */
    static f3i(){}
    /* 脚本：健康码解析请求保障，防止未请求或已请求未更新UI, onblur */
    static f3j(){}
    /* 脚本：验证健康码事件 */
    static f3k(){}
    /* 脚本：证件号重复检测事件 */
    static f3l(){}
    /* 脚本：身份号请求保障，防止未请求或已请求不更新UI, onblur */
    static f3m(){}
    /* 脚本：验证证件号事件 */
    static f3n(){}
    /* 脚本：等待用户信息事件 */
    static f3o(){}
    /* 脚本：手动录入事件 */
    static f3p(){}
    /* 脚本：验证姓名事件 */
    static f3q(){}
    /* 脚本：验证手机号码事件 */
    static f3r(){}
    /* 脚本：采样事件 */
    static f3s(){}
    /* 脚本：自动等待接口响应信息 */
    static f3t(){}
    /* 提交采样记录 */
    static f3u(){}
    /* 读卡设备读卡回调 */
    static f3v(idCard){}
    /* 摄像头图片文本识别回调 */
    static f3w(idCard){}
    /* 摄像头二维码识别回调 */
    static f3x(code){}
    /* 摄像头条码识别回调 */
    static f3y(code){}
    /* API消息处理 */
    static f3V(message){}
    /* 采样试管已满 */
    static f3z(){}
    /* 采样试管按回车 */
    static f3A(){}
    /* 快捷键响应控制脚本 */
    static f3C(){}
    /* 试管信息API通知 */
    static f3D(){}
    /* 获取身份信息API通知 */
    static f3E(){}
    /* 解码健康码API通知 */
    static f3F(){}
    /* 采样结果API通知 */
    static f3G(){}
}
c8.sLastInputBarcode = "";
c8.sLastHealthQRCode = "";
c8.sLastInputIdNo    = "";
c8.lLastStartInputIdNoTimestamp = 0;
c8.sLastConfirmedIdNo = "";
c8.oFindPeopleController = {};
c8.oConfirmController = {};
c8.lSpeakBarcodeTimestamp = 0;
c8.lSyncIdNoTimestamp = 0;
c8.lStartInputHQRTimestamp = 0;
c8.lSpeakBarcodeTimestamp = 0;
c8.scriptRunningState = false;
c8.tag = "ScriptEngine";
c8.Message = {
    params:{
        code:"code",
        msg :"msg",
        data:"data"
    },
    types:{
        f3C       :"f3C",
        f3D       :"f3D",
        f3E      :"f3E",
        f3F  :"f3F",
        f3G:"f3G",
    }
};
c8.debug = function (msg) {
    if(msg == null) return;
    LogUtils.log(msg,c8.tag);
};
c8.warn  = function (msg) {
    if(msg == null) return;
    LogUtils.warn(msg,c8.tag);
};
c8.speak = MessageManager.f3Q.speak;
c8.f2G = async function(){
    c8.f36(false);
    c8.f2K();
    const eBarcode = c8.f1Q();
    let barcode = DOMUtils.read(eBarcode);
    if((barcode?.trim()?.length??0) === 0){
        barcode = c8.f2R();
    }
    c8.f2H();
    await FunctionUtils.sleep(c6.vE);
    DOMUtils.focus(eBarcode);
    DOMUtils.write(eBarcode,"");
    if((barcode?.length??0) > 0){
        DOMUtils.write(eBarcode,barcode);
        DOMUtils.input(eBarcode,barcode);
        await FunctionUtils.sleep(c6.vE);
        DOMUtils.blur(eBarcode);
        DOMUtils.focus(c8.f1T());
    }
    /*
    [
        c8.f1R(),
        c8.f1T(),
        c8.f1V(),
        c8.f24(),
        c8.f1W()
    ].forEach(ele => {
        DOMUtils.write(ele,"");
        DOMUtils.deleteHSCJ(ele);
    });
    */
}
c8.f3e = function () {
    const eCapacity = c8.f1P();
    const capacity = parseInt(DOMUtils.read(eCapacity)??"0");
    const target   = parseInt(c6.getBarcodeCommitNum());
    if(capacity === target) return;
    DOMUtils.focus(eCapacity);
    DOMUtils.deleteHSCJ(eCapacity);
    DOMUtils.write(eCapacity,target);
    DOMUtils.copyHSCJ(eCapacity);
    DOMUtils.change(eCapacity);
    DOMUtils.blur(eCapacity);
}
c8.f3f = function (eBar) {
    c8.f2Q("");
    c8.f36(false);
    DOMUtils.focus(eBar);
    const time = c8.lSpeakBarcodeTimestamp??0;
    const now  = new Date().getTime();
    if(now - time> 5000){
        c8.lSpeakBarcodeTimestamp = now;
        c8.speak("等待更换试管！");
    }
    return false;
}
c8.f3g = function (eBar) {
    const barcode = DOMUtils.read(eBar);
    /*如果是扫描条码且是非法的条码长度（扫到身份证或扫了两次条码）*/
    if(c8.f2R().length===0 && barcode.length>5){
        DOMUtils.blur(eBar);
        return false;
    }
    const time = c8.lSpeakBarcodeTimestamp??0;
    const now  = new Date().getTime();
    if(now - time> 5000){
        c8.lSpeakBarcodeTimestamp = now;
        c8.speak("等待试管录入！");
    }
    c8.f2Q(barcode);
    return false;
}
c8.f3h = async function (eBar) {
    const barcode = DOMUtils.read(eBar);
    c8.f2Q(barcode);
    let bIsInvalidBarcode = true;
    if(c6.vy.length === 0){
        bIsInvalidBarcode = barcode.length !== c6.vx;
    }
    else{
        const bIsMatchRule = CheckUtils.isRegexMatch(c6.vy,barcode);
        if(!bIsMatchRule){
            bIsInvalidBarcode = barcode.length !== c6.vx;
        }
    }
    if(bIsInvalidBarcode){
        DOMUtils.write(eBar,"");
        c8.speak("条码非法，请重新输入条码！");
        c8.f2Q("");
        DOMUtils.focus(eBar);
        return false;
    }
    const eBarcode = c8.f1Q();
    if((eBarcode?.parentNode?.parentNode?.parentNode?.className?.indexOf("error")??-1)>-1){
        const oLast = c8.f3h.oLastProcessInfo??{};
        if(oLast.barcode === barcode) return true;
        c8.f3h.oLastProcessInfo = {barcode:barcode};
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
c8.f3i = async function () {
    await c8.f3t();
    const eBar   = c8.f1Q();
    const barcode= DOMUtils.read(eBar);
    /*条码为空*/
    if((barcode?.length??0) === 0){
        if(!c8.f3f(eBar)) return false;
    }
    /*条码正在输入*/
    if(DOMUtils.isFocused(eBar)) {
        if(!c8.f3g(eBar)) return false;
    }
    if(!await c8.f3h(eBar)) return false;
    return true;
}
c8.f3j = async function (){
    const sLastHQCode = c8.f2T();
    if(!CheckUtils.isRegexMatch(c6.vF,sLastHQCode)) return;
    const now   = new Date().getTime();
    c8.lStartInputHQRTimestamp = now;
    const eLast = c8.f33();
    if(!FunctionUtils.isNull(eLast?.resolve)){
        if(eLast.qrcode === sLastHQCode){
            if(now - eLast.time < 10000) return;
        }
        try {eLast.reject("获取健康码超时！");} catch (e) {}
    }
    if(!CheckUtils.isRegexMatch(c6.vF,sLastHQCode)) return;
    if(!c8.f3c()) return;
    const ePeopleId  = c8.f1R();
    const qrcode     = DOMUtils.read(ePeopleId);
    if((qrcode?.trim()?.length??0) === 0) return;
    if(!CheckUtils.isRegexMatch(c6.vF,qrcode)) return;
    const oRequestHealthQRCodeController = {
        executor: async (resolve, reject) => {
            oRequestHealthQRCodeController.resolve = resolve;
            oRequestHealthQRCodeController.reject = reject;
            const oResult = c8.f3F.oResult;
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
    c8.f32(oRequestHealthQRCodeController);
    new Promise( async (resolve, reject) => oRequestHealthQRCodeController.executor(resolve, reject))
        .then(async(datas)=>{
            if(c8.f2T() !== oRequestHealthQRCodeController.qrcode) return;
            if(oRequestHealthQRCodeController.process === true) return;
            oRequestHealthQRCodeController.process = true;
            try {
                await c8.f3t();
                c8.f2O(true);
                c8.f2L();
                c8.f2S("");
                DOMUtils.write(c8.f1R(), "");
                if(Object.keys(datas??{}).length<1) {
                    c8.speak("健康码无效！",true,1.7);
                    return;
                }
                const data = datas;
                const eIdNo = c8.f1T();
                if (DOMUtils.isEmpty(eIdNo)) {
                    DOMUtils.focus(eIdNo);
                    DOMUtils.write(eIdNo, data.idCard?.toUpperCase() ?? "");
                    await FunctionUtils.sleep(c6.vE);
                    DOMUtils.blur(eIdNo);
                }
                const eName = c8.f1V();
                if (DOMUtils.isEmpty(eName)) {
                    DOMUtils.focus(eName);
                    DOMUtils.write(eName, data.fullName ?? "");
                    await FunctionUtils.sleep(c6.vE);
                    DOMUtils.blur(eName);
                }
                const ePhone = c8.f1W();
                if (DOMUtils.isEmpty(ePhone)) {
                    DOMUtils.focus(ePhone);
                    DOMUtils.write(ePhone, data.mobile ?? "");
                    await FunctionUtils.sleep(c6.vE);
                    DOMUtils.blur(ePhone);
                }
            } finally {
                c8.f2O(false);
            }
        })
        .catch(async (err)=>{
            if(c8.f2T()!==oRequestHealthQRCodeController.qrcode) return;
            if(oRequestHealthQRCodeController.process === true) return;
            oRequestHealthQRCodeController.process = true;
            try {
                if(!await c8.f3t()) return false;
                c8.f2O(true);
                c8.f2N();
                c8.speak(err,true,1.7);
                DOMUtils.write(c8.f1R(), "");
                c8.f2S("");
            } finally {
                c8.f2O(false);
            }
        });
};
c8.f3k = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const ePeople = c8.f1R();
    /*健康码等待服务返回数据*/
    const peopleIdText = DOMUtils.read(c8.f1R());
    if(peopleIdText?.trim()?.length === 0) {
        return true;
    }
    const sLastHQR = c8.f2T();
    const now  = new Date().getTime();
    if(sLastHQR === peopleIdText){
        const time = c8.lStartInputHQRTimestamp??0;
        if(now - time >= c6.vB){
            c8.lStartInputHQRTimestamp = now;
            DOMUtils.write(c8.f1T(),"");
            DOMUtils.write(c8.f1R(),"");
            c8.f36(false);
            DOMUtils.focus(c8.f1T());
            c8.f2N();
            c8.speak("健康码无效！",true,1.7);
        }
    }
    else{
        c8.lStartInputHQRTimestamp = now;
        c8.f2S(peopleIdText);
    }
    return false;
}
c8.f3l = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const now        = new Date().getTime();
    const eIdNo      = c8.f1T();
    const sLastIdNo  = c8.f2Z();
    const sIdNo      = DOMUtils.read(eIdNo);
    const isReadSame = sLastIdNo.length>0 && sIdNo.trim()===sLastIdNo && (now - (c8.lSameCheckingIdNoTimestamp??0) < 5000);
    const isIdEmpty  = (sIdNo?.trim()?.length??0)===0;
    if(isIdEmpty || isReadSame){
        if(isReadSame){
            c8.lSameCheckingIdNoTimestamp = now;
            await c8.f2G();
            return false;
        }
        c8.f36(false);
        let configOfReadIDMaximumContinuousCount = c6.vH??1;
        if(configOfReadIDMaximumContinuousCount<1) configOfReadIDMaximumContinuousCount = c6.vH = 1;
        for(let j =0;j<configOfReadIDMaximumContinuousCount;++j){
            if(!await c8.f3t()) return false;
            if(DOMUtils.isFocused(c8.f1Q())) return false;
            c8.f2F();
            DOMUtils.focus(eIdNo);
            const idText = DOMUtils.read(eIdNo);
            if((idText?.length??0)>0) {
                break;
            }
            if(j%2 === 1) c8.f2J();
            await FunctionUtils.sleep(c6.vC);
        }
        return false;
    }
    return true;
}
c8.f3m = async ()=>{
    const sLastIdNo  = c8.f2V();
    const isValidIdCard = CheckUtils.isValidIdCard(sLastIdNo);
    const isMatchIdRule = CheckUtils.isRegexMatch(c6.vA,sLastIdNo);
    if(!(isValidIdCard || isMatchIdRule)) return;
    const now   = new Date().getTime();
    const eLast = c8.f31();
    if(!FunctionUtils.isNull(eLast?.reject)){
        if(eLast?.idNo === c8.f2V()){
            if(now - eLast.time <= 10000) return;
        }
        try {eLast.reject();} catch (e) {}
    }
    if(!c8.f3c()) return;
    const eId  = c8.f1T();
    const idNo = DOMUtils.read(eId)?.toUpperCase();
    if((idNo?.trim()?.length??0)===0) return;
    const oRequestPeopleInfoController = {
        executor: async (resolve, reject) => {
            oRequestPeopleInfoController.resolve = resolve;
            oRequestPeopleInfoController.reject = reject;
            const oResult = c8.f3E.oResult;
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
    c8.f30(oRequestPeopleInfoController);
    new Promise(async (resolve, reject) => oRequestPeopleInfoController.executor(resolve, reject))
        .then(async (datas)=>{
            if((c8.f2V()?.toUpperCase()) !== idNo) return;
            if(oRequestPeopleInfoController.process === true) return;
            oRequestPeopleInfoController.process = true;
            try {
                await c8.f3t();
                c8.f2O(true);
                DOMUtils.focus(c8.f1V());
                if ((datas?.result?.length ?? 0) === 0) {
                    c8.f2N();
                    c8.speak("需要手动输入！");
                    return;
                }
                /* 自动补填身份数据 */
                setTimeout(async () => {
                    if(idNo !== DOMUtils.read(eId)?.toUpperCase()) return;
                    try {
                        await c8.f3t();
                        c8.f2O(true);
                        const data = datas.result[0];
                        if (DOMUtils.isEmpty(c8.f1T())) return;
                        const eName = c8.f1V();
                        if (DOMUtils.isEmpty(eName)) {
                            DOMUtils.focus(eName);
                            DOMUtils.write(eName, data.fullName ?? "");
                            await FunctionUtils.sleep(c6.vE);
                            DOMUtils.blur(eName);
                        }
                        const ePhone = c8.f1W();
                        if (DOMUtils.isEmpty(ePhone)) {
                            DOMUtils.focus(ePhone);
                            DOMUtils.write(ePhone, data.mobile ?? data.phone ?? "");
                            await FunctionUtils.sleep(c6.vE);
                            DOMUtils.blur(ePhone);
                        }
                    } finally {
                        c8.f2O(false);
                    }
                }, c6.vE * 3);
            } finally {
                c8.f2O(false);
            }
        })
        .catch(async (err)=>{
            if((c8.f2V()?.toUpperCase()) !== idNo) return;
            if(oRequestPeopleInfoController.process === true) return;
            oRequestPeopleInfoController.process = true;
            try {
                await c8.f3t();
                c8.f2O(true);
                c8.f2N();
                c8.speak("采集失败！")
                document.location = c8.f1L();
                await FunctionUtils.sleep(c6.vE);
                await c8.f2G();
            } finally {
                c8.f2O(false);
            }
        });
}
c8.f3n = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const eIdNo  = c8.f1T();
    /*判断是否正在输入身份号*/
    if(DOMUtils.isFocused(eIdNo)){
        const idText = DOMUtils.read(eIdNo);
        const isValidIdCard = CheckUtils.isValidIdCard(idText);
        /*粘贴或扫码*/
        if(isValidIdCard || CheckUtils.isRegexMatch(c6.vA,idText)){
            c8.f2U(idText);
            DOMUtils.blur(eIdNo);
            return true;
        }
        /* 判断是否是健康码 */
        if(CheckUtils.isRegexMatch(c6.vF,idText)){
            c8.f2U("");
            DOMUtils.write(eIdNo,"");
            DOMUtils.blur(eIdNo);
            if(CheckUtils.isRegexMatch("[0-9A-Za-z:]*::$",idText)){
                c8.speak("健康码",true,1.7);
            }
            if(CheckUtils.isRegexMatch("[a-zA-Z0-9]{0,5}#[a-zA-Z0-9+/]*={0,2}$",idText)){
                c8.speak("一码通",true,1.7);
            }
            const ePeople = c8.f1R();
            DOMUtils.focus(ePeople);
            DOMUtils.deleteHSCJ(ePeople);
            DOMUtils.write(ePeople,idText);
            c8.f2S(idText);
            DOMUtils.copyHSCJ(ePeople);
            DOMUtils.change(ePeople);
            DOMUtils.blur(ePeople);
            c8.f3j();
            return false;
        }
        /*手动输入*/
        c8.f36(true);
        c8.f2U(idText);
        c8.f2W(new Date().getTime());
        return false;
    }
    const eIdNumber = c8.f1T();
    if((eIdNumber?.parentNode?.parentNode?.parentNode?.className?.indexOf("error")??-1) > -1){
        const idText = DOMUtils.read(eIdNumber).toUpperCase();
        const oLast  = c8.f3n.oLastProcessInfo??{};
        const now    = new Date().getTime();
        if(oLast.idNo === idText && now - oLast.time < 5000) return true;
        c8.f3n.oLastProcessInfo = {idNo:idText,time:now};
        eIdNumber.focus();
        DOMUtils.deleteHSCJ(eIdNumber);
        DOMUtils.write(eIdNumber,idText);
        DOMUtils.copyHSCJ(eIdNumber);
        c8.f2U(idText);
        DOMUtils.blur(eIdNumber);
        DOMUtils.change(eIdNumber);
        return false;
    }
    return true;
}
c8.f3o = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    c8.f3m();
    let result = false;
    await FunctionUtils.sleep(c2.fb()*1.5);
    if(!result && c8.f33()?.process === true){
        const oResult = c8.f3F.oResult;
        const idNo    = oResult?.datas?.idCard?.toUpperCase();
        const currIdNo= DOMUtils.read(c8.f1T())?.toUpperCase();
        if(!FunctionUtils.isNull(idNo) && idNo === currIdNo){
            result = true;
        }
    }
    if(!result && c8.f31()?.process === true){
        const oResult = c8.f3E.oResult;
        const idNo    = (oResult?.datas?.result??{})[0]?.idCard?.toUpperCase();
        if(!FunctionUtils.isNull(idNo) && idNo === (c8.f2V()?.toUpperCase())){
            result = true;
        }
    }
    if(result){
    }
    return result;
}
c8.f3p = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    if(!c8.f37()) {
        return true;
    }
    const eIdNo  = c8.f1T();
    const idText = DOMUtils.read(eIdNo);
    const isValidIdText = CheckUtils.isValidIdCard(idText) || CheckUtils.isRegexMatch(c6.vA,idText);
    const eName  = c8.f1V();
    const ePhone = c8.f1W();
    /*手动输入完毕并且网络有该人员信息*/
    if(
        isValidIdText
        &&!DOMUtils.isFocused(eName)
        &&DOMUtils.read(eName)?.length > 0
        &&!DOMUtils.isFocused(ePhone)
        &&DOMUtils.read(eName)?.length > 0
    ){
        c8.f36(false);
    }
    else{
        if(DOMUtils.isFocused(eIdNo)){
            if(idText?.length === 17 && CheckUtils.isValidIdCard(idText+"X")){
                DOMUtils.write(eIdNo,idText+"X");
                c8.f2U(idText+"X");
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
            if(isValidIdCard || CheckUtils.isRegexMatch(c6.vA,idText)){
                let idNo = idText;
                if(isValidIdCard){
                    idNo = idNo.toUpperCase();
                }
                c8.f36(false);
                c8.f2U(idNo);
                DOMUtils.deleteHSCJ(eIdNo);
                DOMUtils.write(eIdNo,idNo);
                DOMUtils.copyHSCJ(eIdNo);
                c8.f2U(idNo);
                DOMUtils.blur(eIdNo);
                DOMUtils.change(eIdNo);
                return true;
            }
            /*判断已录入的证件号是否超时*/
            if(c8.f2V() === idText){
                const now = new Date().getTime();
                if(now - c8.f2X() >= c6.vB){
                    DOMUtils.write(eIdNo,"");
                    c8.f36(false);
                    return false;
                }
            }
            else{
                c8.f2U(idText);
                c8.f2W(new Date().getTime());
            }
        }
        else if(DOMUtils.isFocused(eName)){
            const sNameText = DOMUtils.read(eName);
            const sFormat   = sNameText.replaceAll(/[\\u4e00-\\u9fa5`~!@#$%^&*()_\-+=<>?: "{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig,"");
            if(sNameText.length !== sFormat.length){
                DOMUtils.write(eName,sFormat);
            }
        }
        else if(DOMUtils.isFocused(ePhone)){
        }
        return false;
    }
    return true;
};
c8.f3q = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const eName = c8.f1V();
    if((DOMUtils.read(eName)?.length??0) === 0){
        c8.f36(true);
        DOMUtils.focus(eName);
        return false;
    }
    return true;
};
c8.f3r = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const ePhone = c8.f1W();
    if((DOMUtils.read(ePhone)?.length??0) === 0){
        c8.f36(true);
        DOMUtils.focus(ePhone);
        return false;
    }
    return true;
};
c8.f3s = async function () {
    if(!await c8.f3t()) return false;
    if(DOMUtils.isFocused(c8.f1Q())) return false;
    const eLast = c8.f35();
    if(!FunctionUtils.isNull(eLast?.reject)){
        try {eLast.reject();} catch (e) {}
    }
    if(DOMUtils.isEmpty(c8.f1T()) && DOMUtils.isEmpty(c8.f1W()) && DOMUtils.isEmpty(c8.f1V())){
        return true;
    }
    const eId  = c8.f1T();
    const idNo = DOMUtils.read(eId)?.toUpperCase();
    const now = new Date().getTime();
    if((!FunctionUtils.isNull(idNo)) && (c8.f2Z()?.toUpperCase()) === idNo){
        if(now - (c8.lSyncIdNoTimestamp??0) < 5000){
            DOMUtils.write(eId,"");
            DOMUtils.focus(eId);
            c8.f36(false);
            return false;
        }
    }
    c8.lSyncIdNoTimestamp = now;
    c8.f2M();
    c8.f2Y(idNo);
    const oConfirmController = {
        executor: async (resolve, reject) => {
            oConfirmController.resolve = resolve;
            oConfirmController.reject = reject;
            const oResult = c8.f3G.oResult;
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
    c8.f34(oConfirmController);
    c8.f3u();
    await new Promise(async (resolve, reject) => oConfirmController.executor(resolve,reject))
        .then((datas)=>{
            c8.f2U("");
        })
        .catch(()=>{
            /* 添加则已采样会一直报错 */
            /* c8.f2Y(""); */
        });
};
c8.f3t = async function(){
    if(!c8.f3c()) return false;
    let result = true;
    while(c8.f2P()){
        result = false;
        await FunctionUtils.sleep(c6.vE);
    }
    return result;
};
c8.f3d = async function (run) {
    const timestamp = c8.callRunScriptTimestamp ?? 0;
    const now = new Date().getTime();
    if(now - timestamp < 1000) return;
    c8.callRunScriptTimestamp = now;
    c8.speak(run?"启动脚本":"停止脚本",false);
    if(run === c8.scriptRunningState) return;
    c8.f3b(run);
    c8.scriptRunningState = run;
    if(!run) return;
    c8.speak("请确保英文输入法！",true,2.0);
    await c8.f2G();
    c8.f2O(false);
    while(c8.f3c()){
        try{
            await FunctionUtils.sleep(c6.vD);
            if(!c8.f1O()){
                continue;
            }
            /* 1、清空所有的弹窗 */
            c8.f2K();
            c8.f2J();
            c8.f2K();
            /* 2、验证脚本运行状态，防止在这段时间内停止脚本 */
            if(!c8.f3c()) break;
            /* 3、验证条码合法性 */
            if(!await c8.f3i()) continue;
            c8.f3e();
            /* 4、验证健康码合法性 */
            if(!await c8.f3k()) continue;
            /* 5、证件号重复性检测 */
            if(!await c8.f3l()) continue;
            /* 6、手动录入验证 */
            if(!await c8.f3p()) continue;
            /* 7、验证证件号合法性 */
            if(!await c8.f3n()) continue;
            /* 8、等待网络返回数据 */
            if(!await c8.f3o()) continue;
            /* 9、姓名验证 */
            if(!await c8.f3q()) continue;
            /* 10、手机号验证 */
            if(!await c8.f3r()) continue;
            /* 11、提交及等待结果 */
            await c8.f3s();
        }
        catch (e) {
            c8.warn(e);
        }
    }
}
c8.f3v = async function(idCard){
    const now   = new Date().getTime();
    const oLast = c8.f3v.oLastProcessInfo??{};
    if(oLast.idCard === idCard && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;
    c8.f3v.oLastProcessInfo = {idCard,time:now};
    const eIdNo = c8.f1T();
    if(DOMUtils.isFocused(eIdNo) && DOMUtils.isEmpty(eIdNo)){
        c8.f3x.oLastProcessInfo = {idCard:idCard,result:true,time:now};
        try {
            await c8.f3t();
            c8.f2O(true);
            DOMUtils.deleteHSCJ(eIdNo);
            DOMUtils.write(eIdNo,idCard.toUpperCase());
            DOMUtils.copyHSCJ(eIdNo);
            DOMUtils.change(eIdNo);
        }
        finally {
            c8.f2O(false);
        }
        return true;
    }
    return false;
}
c8.f3x = async function (code){
    const now   = new Date().getTime();
    const oLast = c8.f3x.oLastProcessInfo??{};
    if(oLast.code === code && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;
    const eBar  = c8.f1Q();
    if(DOMUtils.isFocused(eBar) && DOMUtils.isEmpty(eBar)){
        const barcode = code;
        let bIsInvalidBarcode = true;
        if(c6.vy.length === 0){
            bIsInvalidBarcode = barcode.length !== c6.vx;
        }
        else{
            const bIsMatchRule = CheckUtils.isRegexMatch(c6.vy,barcode);
            if(!bIsMatchRule){
                bIsInvalidBarcode = barcode.length !== c6.vx;
            }
        }
        if(bIsInvalidBarcode) {
            c8.f3x.oLastProcessInfo = {code,result:true,time:now};
            return false;
        }
        c8.f2L();
        c8.f3x.oLastProcessInfo = {code,result:true,time:now};
        try {
            await c8.f3t();
            c8.f2O(true);
            DOMUtils.deleteHSCJ(eBar);
            DOMUtils.write(eBar,code);
            DOMUtils.copyHSCJ(eBar);
            DOMUtils.blur(eBar);
            DOMUtils.change(eBar);
        }
        finally {
            c8.f2O(false);
        }
        return true;
    }
    const eIdNo = c8.f1T();
    if(DOMUtils.isFocused(eIdNo) && DOMUtils.isEmpty(eIdNo)){
        c8.f2L();
        c8.f3x.oLastProcessInfo = {code,result:true,time:now};
        try {
            await c8.f3t();
            c8.f2O(true);
            DOMUtils.deleteHSCJ(eIdNo);
            DOMUtils.write(eIdNo,code);
            DOMUtils.copyHSCJ(eIdNo);
            DOMUtils.change(eIdNo);
        }
        finally {
            c8.f2O(false);
        }
        return true;
    }
    return false;
}
c8.f3x.oLastProcessInfo = {};
c8.f3w    = c8.f3x
c8.f3y = async function(code){
    const now   = new Date().getTime();
    const oLast = c8.f3y.oLastProcessInfo??{};
    if(oLast.code === code && oLast.result === true) {
        if(now - oLast.time<10000) return true;
    }
    else if(now - oLast.time<2000) return true;
    const eBar = c8.f1Q();
    if(DOMUtils.isFocused(eBar) && DOMUtils.isEmpty(eBar)){
        c8.f2L();
        c8.f3y.oLastProcessInfo = {code,result:true,time:now};
        try {
            await c8.f3t();
            c8.f2O(true);
            DOMUtils.deleteHSCJ(eBar);
            DOMUtils.write(eBar,code);
            DOMUtils.copyHSCJ(eBar);
            DOMUtils.blur(eBar);
            DOMUtils.change(eBar);
        }
        finally {
            c8.f2O(false);
        }
        return true;
    }
    return false;
}
c8.f3y.oLastProcessInfo = {};
c8.f3V = async function (message) {
    const type = message.type;
    const requestInfo  = message.requestInfo??{};
    const responseInfo = message.responseInfo??{};
    const code = responseInfo?.code;
    const msg  = responseInfo?.msg;
    const data = responseInfo?.datas;
    switch (type) {
        case c8.Message.types.f3D:
            c8.f3D(requestInfo,code,msg,data);
            return true;
        case c8.Message.types.f3E:
            c8.f3E(requestInfo,code,msg,data);
            return true;
        case c8.Message.types.f3F:
            c8.f3F(requestInfo,code,msg,data);
            return true;
        case c8.Message.types.f3G:
            c8.f3G(requestInfo,code,msg,data);
            return true;
        case c8.Message.types.f3C:
            c8.f3C();
            return true;
        default:
            return false;
    }
}
c8.f3C = async function (){
    if(!c8.f1O()) {
        MessageManager.f3Q.speak("在录入页面才能启停脚本!");
    }
    if(c8.f3c()){
        c8.f3a(false);
    }
    else{
        c8.f3a(true);
    }
}
c8.f3D = async function (info, code, msg, datas){
    if(!c8.f1O()) return;
    if(code === 0){
        let tubeNum= info["tubeNum"]??"";
        let tubeCnt= datas?.length??0;
        let isLastConfirmed = c3.isConfirmed;
        c8.isConfirmed = false;
        c8.f2n(tubeCnt);
        if(c6.isBreakLineMode()){
            DOMUtils.write(c8.f23(),tubeCnt);
        }
        let speakText = "";
        let speakRate = 1.4;
        if (tubeCnt === 0) {
            const lastSpeak = c8.f3D.sLastSpeakBarcode ??"";
            if(lastSpeak !== tubeNum){
                /*误扫入健康码*/
                if((tubeNum?.trim()?.length??0)<20){
                    speakText = tubeNum;
                    speakRate = 2.0;
                    await c8.f2G();
                }
                c8.f3D.sLastSpeakBarcode = tubeNum;
            }
            c8.f2Q(tubeNum);
            DOMUtils.focus(c8.f1T());
        } else if (tubeCnt === c6.configOfBarcodeCapacity) {
            speakText = c6.configOfBarcodeCapacity.toString();
            c8.f2Q("");
            if (isLastConfirmed) {
                speakText = speakText + "换";
                c8.f3z();
            }
        } else {
            speakText = tubeCnt+"";
            c8.f2Q(tubeNum);
            DOMUtils.focus(c8.f1T());
        }
        c8.speak(speakText,true,speakRate);
    }
}
c8.f3F = async function (info, code, msg, datas){
    if(!c8.f3c()) return;
    let err = "";
    if(msg!=null && msg.constructor === String && msg.trim().length>0){
        err = msg;
    }
    else{
        err = "健康码无效！";
    }
    c8.f3F.oResult = {info, code, msg, datas,err};
    const controller = c8.f33();
    if(!FunctionUtils.isNull(controller?.resolve) && FunctionUtils.isNull(controller.process)) {
        if(code === 0){
            controller.resolve(datas);
        }
        else{
            controller.reject(err);
        }
        return;
    }
}
c8.f3E = async function (info, code,msg,datas){
    c8.isConfirmed = true;
    const idNo = (datas?.result??[])[0]?.idCard?.trim()?.toUpperCase();
    /* 防止离线采样播报两次 */
    c8.currentIdNo = idNo;
    c8.bSamplingNotifyFlag = true;
    if(!c8.f3c()) return;
    c8.f3E.oResult = {info,code,msg,datas};
    const controller = c8.f31();
    if(!FunctionUtils.isNull(controller?.resolve) && FunctionUtils.isNull(controller.process)) {
        if(code === 0){
            try {controller.resolve(datas);} catch (e) {}
        }
        else{
            try {controller.reject();} catch (e) {}
        }
        return;
    }
}
c8.f3G = async function (info, code, msg, datas){
    const idNo = info?.idCard?.toString()?.toUpperCase()?.trim();
    /* 离线采样也会收到通知 */
    if(c8.currentIdNo !== idNo) return;
    /* 离线采样拦截一次，真实提交一次 */
    if(!c8.bSamplingNotifyFlag) return;
    c8.bSamplingNotifyFlag = false;
    if(code === 0 || !FunctionUtils.isNull(datas?.value)){
        let name = info.fullName;
        name = name.replaceAll(/[\\u4e00-\\u9fa5`~!@#$%^&*()_\-+=<>?: "{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig,"");
        c3.isConfirmed = true;
        c8.speak(name,true,1.5);
        c8.f2K();
        c8.f36(false);
    }
    else{
        c8.f2G();
        c8.f2N();
        c8.speak(msg??"采样失败，请稍后！",true,1.7);
    }
    c8.f3G.oResult = {info, code,msg,datas};
    const controller = c8.f35();
    if(!FunctionUtils.isNull(controller?.resolve)) {
        if(code === 0 || !FunctionUtils.isNull(datas?.value)){
            try {controller.resolve(datas);} catch (e) {}
        }
        else{
            try {controller.reject();} catch (e) {}
        }
        return;
    }
}
c8.f3z = async function (){
    c8.f2K();
}
c8.f3A = async function (){
    DOMUtils.focus(c8.f1T());
}

/**
 * 离线记录上传引擎
 */
class c7{
    /* 获取采样页面url */
    static f1L(){}
    /* 启动离线采样模式 */
    static f2x(){ c7.f2z(true); }
    /* 停止离线采样模式 */
    static f2y(){ c7.f2z(false); }
    /* 设置离线采样启动状态 */
    static f2z(run){  }
    /* 判断是否启动离线模式 */
    static f2A(){ return c6.f1y(); }
    /* 状态变化监听 */
    static f2B(run){}
    /* 设置当前处理的条码编号 */
    static f2C(tubNo){ c7.mCurrentProcessingOfflineTubNo = tubNo; }
    /* 获取正在处理的离线条码编号 */
    static f2D(){ return c7.mCurrentProcessingOfflineTubNo; }
    /* 数据更新回调 */
    static f2u(){};
    /* 启动离线记录自动化上传引擎 */
    static f2E(){}
}
c7.tag = "OfflineEngine";
c7.debug = function (msg) {
    LogUtils.log(msg,c7.tag);
}
c7.f2z = function (run){
    if(c6.isBreakLineMode()){
        document.location = c7.f1L();
        return;
    }
    c7.f2B(run);
    MessageManager.f3Q.speak(run?"启动离线模式":"停止离线模式",false);
    c6.setOfflineMode(run);
};
c7.f2E = async function () {
    let requestOfflineInfo;
    let requestOfflineTubInfo;
    let autoLogin = async function(callback){
        const loginData = c6.getBreakLineLoginData();
        if(loginData?.isLogin === true) {
            if(callback.process === true) return;
            callback.process = true;
            callback.onSuccess();
            return;
        }
        if((loginData?.username?.trim()?.length??0) === 0 || (loginData?.password?.trim()?.length??0) === 0) {
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
            return;
        }
        c2.login(loginData.username,loginData.password,{
            onSuccess:(code,msg,datas)=>{
                if(callback.process === true) return;
                callback.process = true;
                if(code ===0){
                    document.cookie = "vue_admin_template_token=Bearer "+datas["token"];
                    document.cookie = "siteName="+(datas["siteName"]?.trim()??"本采样点");
                    loginData.msg = "已登录";
                    loginData.isLogin = true;
                    callback.onSuccess();
                }
                else{
                    loginData.msg = msg;
                    loginData.code = code;
                    loginData.isLogin = false;
                    callback.onFailure();
                }
            },
            onFailure:(code,msg,status)=>{
                if(callback.process === true) return;
                callback.process = true;
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
        for(let i=0;i<3 && !samplingResult ;++i){
            await new Promise((resolve1, reject1) => {
                setTimeout(reject1,30000);
                c2.samplingRecord(testNum,data,{
                    onSuccess:(code, msg, data)=>{
                        samplingResult = true;
                        resolve1(code, msg, data);
                    },
                    onFailure:(code, msg,status)=>{
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
                const avgPing = c2.fb();
                const sleep = avgPing<1 ? 10000 : (avgPing*1.5);
                await FunctionUtils.sleep(sleep+sleep);
            }
        }
        if(serverUnavailable){
            reject();
        }
        else{
            OfflineSamplingManager.markSamplingResult(datas.idType,datas.idCard,samplingResult?2:1,{
                onSuccess:()=>{
                    resolve();
                },
                onFailure:()=>{
                    reject();
                }
            });
        }
    };
    /* 查询待处理的试管信息 */
    requestOfflineTubInfo = function (tubNo, resolve, reject) {
        if((tubNo?.length??0) === 0) {
            reject();
            c7.f2C("");
            return;
        }
        OfflineSamplingManager.listProcessingOffline(tubNo,{
            onSuccess: async (datas)=>{
                if((datas?.length??0) === 0){
                    c7.f2C("");
                    requestOfflineInfo(resolve, reject);
                }
                else{
                    const data = datas[0]??{};
                    const mode = data.mode;
                    const idCard = data.idCard;
                    if(parseInt(mode) === 1){
                        c2.cardNoInfo(idCard,{
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
                        await samplingRecord(resolve, reject, data,tubNo);
                    }
                }
            },
            onFailure:(err)=>{
                reject();
            }
        });
    };
    /* 查询待处理的所有试管 */
    requestOfflineInfo = function (resolve, reject){
        OfflineSamplingManager.listProcessingTubNo({
            onSuccess:(datas)=>{
                if((datas?.length??0) === 0){
                    resolve({});
                }
                else{
                    const tubNo = datas[0].testNum;
                    c7.f2C(tubNo);
                    requestOfflineTubInfo(tubNo, resolve, reject);
                }
            },
            onFailure:(err)=>{
                reject();
            }
        })
    };
    while(true){
        try {
            let isLogin = false;
            await new Promise(async (resolve, reject) => {
                setTimeout(reject,60000);
                if(c6.isBreakLineMode()){
                    c6.setOfflineMode(true);
                    isLogin = c6.getBreakLineLoginData().isLogin??false;
                    if(!isLogin){
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
                    if(!c2.isLogin()){
                        reject();
                        return;
                    }
                    isLogin = true;
                }
                let sCurrentProcessingOfflineTubNo = c7.f2D();
                if((sCurrentProcessingOfflineTubNo?.length??0) > 0)
                    requestOfflineTubInfo(resolve, reject, sCurrentProcessingOfflineTubNo);
                else
                    requestOfflineInfo(resolve, reject);
            })
            .then(async data=>{
                c7.f2u();
            })
            .catch(async err=>{});
            if(!isLogin){
                await FunctionUtils.sleep(30000);
            }
            const avgPing = c2.fb();
            let sleep = avgPing<1 ? 10000 : (avgPing*1.5);
            sleep = sleep < 500 ? 500 : sleep;
            const sCurrentProcessingOfflineTubNo = c7.f2D();
            if((sCurrentProcessingOfflineTubNo?.trim()?.length??0) === 0){
                sleep = sleep < 3000 ? 3000 : sleep;
            }
            await FunctionUtils.sleep(sleep);
        }catch (e) {}
    }
    c7.f2E();
}
c7.f2E();

/**
 * 插件控制面板
 */
class c4{
    static assignValue(id,num){
        const ele = document.getElementById(id);
        if(ele == null) return;
        ele.value = num;
    }
    static assignText(id,num){
        const ele = document.getElementById(id);
        if(ele == null) return;
        ele.innerHTML = num;
    }
/*********************************************************** DOM元素操作 ***********************************************************/
    /* 控制面板DOM组件 */
    static fT(){}
    /* 相机整个DIV控件 */
    static f2i(){}
    /* 获取相机控件 */
    static f2j(){}
    /* 获取绘制渲染控件 */
    static f2k(){}
    /* 设置脚本按钮样式 */
    static fX(run){
        const btnControlScript = document.getElementById("btnControlScript");
        if(btnControlScript === null) return;
        if(btnControlScript.style==null) btnControlScript.style = new CSSStyleDeclaration();
        const enable = !(run === true);
        if(enable === true){/*已运行*/
            btnControlScript.style.background = "#FF6F00";
            btnControlScript.innerHTML = "启动脚本";
        }
        else{
            btnControlScript.style.background = "#ff1f1f";
            btnControlScript.innerHTML = "停止脚本";
        }
    }
    /* 设置水印试管人数 */
    static f2n(num){}
    /* 获取当前试管编号 */
    static fZ(){}
    /* 设置面板已采样管数 */
    static f10(num){ c4.assignText("countOfLocalSamplingTubs",num); }
    /* 设置面板已采样人数 */
    static f11(num){ c4.assignText("countOfLocalSamplingNums",num); }
    /* 设置离线模式按钮样式 */
    static f12(run){
        const btnControlOfflineMode = document.getElementById("btnControlOfflineMode");
        if(btnControlOfflineMode==null) return;
        if(btnControlOfflineMode.style==null) btnControlOfflineMode.style = new CSSStyleDeclaration();
        const enable = !(run === true);
        if(enable === true){/*已停止*/
            btnControlOfflineMode.style.background = "#FF6F00";
            btnControlOfflineMode.innerHTML = "启动离线模式";
        }
        else{
            btnControlOfflineMode.style.background = "#ff1f1f";
            btnControlOfflineMode.innerHTML = "停止离线模式";
        }
    }
    /* 设置离线待上传剩余试管数 */
    static f13 (num){ c4.assignText("countOfRemainingOfflineTubs",num); }
    /* 设置离线待上传剩余人数 */
    static f14 (num){ c4.assignText("countOfRemainingOfflineNums",num); }
    /* 设置离线上传失败试管数 */
    static f15    (num){ c4.assignText("countOfFailedOfflineTubs",num); }
    /* 设置离线上传失败人数 */
    static f16    (num){ c4.assignText("countOfFailedOfflineNums",num); }
    /* 设置当前要处理的试管编号 */
    static f17(num){ c4.assignText("currentProcessingOfflineTubs",num); }
    /* 设置处理中试管成功人数 */
    static f18(num){ c4.assignText("countOfProcessingSuccessNums",num); }
    /* 设置处理中试管失败人数 */
    static f19 (num){ c4.assignText("countOfProcessingFailedNums",num); }
    /* 设置处理中试管等待人数 */
    static f1a  (num){ c4.assignText("countOfProcessingReadyNums",num); }
    /* 设置离线进度条进度 */
    static f1b        (progress){ c4.assignValue("progressOfUploadOffline",progress); }
    /* 设置离线进度百分比 */
    static f1c  (percent){ c4.assignText("percentOfUploadOffline",percent + "%"); }
    /* 获取服务器延迟 */
    static f1d(){}
    /* 设置服务器延迟 */
    static f1e(ping){ c4.assignText("_hscj_control_panel_serverPing",ping + " ms"); }
    /* 设置服务器状态 */
    static f1f(state, color){
        const ele = document.getElementById("_hscj_control_panel_serverState");
        if(ele == null) return;
        ele.innerHTML = state;
        if(ele.style == null) ele.style = new CSSStyleDeclaration();
        ele.style.color = color;
    }
    /* 设置统计总试管数 */
    static f1g(num){ c4.assignText("countOfSummeryTubs",num); }
    /* 设置统计总人数 */
    static f1h(num){ c4.assignText("countOfSummeryNums",num); }
    /* 设置面板图片文字识别激活状态（本地OCR服务是否可用） */
    static f1i(state){
        const ele = document.getElementById("_hscj_control_panel_stateOfOCR");
        if(ele == null) return;
        if(ele.style == null) ele.style = new CSSStyleDeclaration();
        if(state){
            ele.innerHTML = "✓";
            ele.style.color = "green";
        }
        else{
            ele.innerHTML = "✖";
            ele.style.color = "red";
        }
    }
    /* 设置面板二维码识别激活状态（摄像头是否开启） */
    static f1j(state){
        const ele = document.getElementById("_hscj_control_panel_stateOfQR");
        if(ele == null) return;
        if(ele.style == null) ele.style = new CSSStyleDeclaration();
        if(state){
            ele.innerHTML = "✓";
            ele.style.color = "green";
        }
        else{
            ele.innerHTML = "✖";
            ele.style.color = "red";
        }
    }
    /* 显示或隐藏相机 */
    static f2h(visible){
        c6.f2h(visible);
        const imgHide  = document.getElementById("_hscj_control_panel_hideCamera");
        const imgShow  = document.getElementById("_hscj_control_panel_showCamera");
        const divState = document.getElementById("_hscj_control_panel_cameraState");
        const camera   = c4.f2i();
        if(imgHide ==null) return;
        if(imgShow ==null) return;
        if(divState==null) return;
        if(camera  ==null) return;
        if(imgHide.style == null){
            imgHide.style = new CSSStyleDeclaration();
        }
        if(imgShow.style == null){
            imgShow.style = new CSSStyleDeclaration();
        }
        if(divState.style == null){
            divState.style = new CSSStyleDeclaration();
        }
        if(camera.style == null){
            camera.style = new CSSStyleDeclaration();
        }
        const isHide = camera.style.display==="none";
        if(visible){/*已隐藏，需要显示*/
            imgHide.style.visibility = "visible";
            imgShow.style.visibility = "hidden";
            divState.style.backgroundColor = "red";
            camera.style.display  = null;
        }
        else{/*已显示，需要隐藏*/
            imgHide.style.visibility = "hidden";
            imgShow.style.visibility = "visible";
            divState.style.backgroundColor = "green";
            camera.style.display = "none";
        }
    }
/*********************************************************** 功能性操作 ***********************************************************/
    /* 语音播报 */
    static speak(msg,enqueue = true){}
    /* 是否是采样页面 */
    static f1O(){}
    /* 显示本地采样记录 */
    static f1m(){}
    /* 保存本地采样记录 */
    static f1n(){}
    /* 删除本地采样记录 */
    static f1o(){}
    /* 更新面板采样信息 */
    static f1p(){}
    /* 判断脚本是否正在运行 */
    static f3c(){}
    /* 更新脚本按钮状态 */
    static f1r(){}
    /* 显示离线采样记录 */
    static f1s(){}
    /* 保存离线采样记录 */
    static f1t(){}
    /* 删除今日本地采样记录 */
    static f1u(){}
    /* 更新面板离线采样信息 */
    static f1v(){}
    /* 设置当前处理的条码编号 */
    static f2C(tubNo){ }
    /* 获取正在处理的离线条码编号 */
    static f2D(){ }
    /* 判断是否是离线模式 */
    static f1y(){}
    /* 更新离线模式按钮状态 */
    static f1z(){}
    /* 判断对话框是否打开 */
    static f1A(){}
    /* 统计信息 */
    static f1B(){}
    /* 服务器状态信息 */
    static f1C(){}
    /* 更新设备支持信息 */
    static f1D(){}
    /* 更新试管信息 */
    static f1E(){}
    /* 提交采样成功后的回调 */
    static f2u(){}
    /* 启停脚本点击事件 */
    static f1G(){}
    /* 启停离线模式点击事件 */
    static f1H(){ }
};
c4.tag = "ControlPanel";
c4.log = function (msg){
    LogUtils.log(msg,c4.tag);
};
c4.warn = function (msg){
    LogUtils.warn(msg,c4.tag);
};
c4.fT = function (){
    let child = document.getElementById("idOfHscjControlPanelParent");
    if(c6.isBreakLineMode()){
        c6.setOfflineMode(true);
        c4.f12(true);
    }
    if(FunctionUtils.isNull(child)){
        const div = document.createElement("div");
        div.innerHTML =
    `
        <div id = "idOfHscjControlPanelParent" onselectstart="return false" style = "font-size:14px;border-radius: 25px; background: #ffffff; margin-top: 5px; padding: 20px; width: 400px;height: 300px;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none; ">
            <img src = "data:image/png;base64,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";
                 style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;"/>
            <span style="font-size:18px;font-weight: bold;color:#000000; position: relative; top:-8px;left:13px;text-shadow:5px 5px 5px rgba(0,0,0,0.3);">青岛核酸采集辅助插件控制面板V2.0</span>
            
            <hr width="100%"/>
            
            <div>
                <button id = "btnControlScript" style = "background: #FF6F00; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-10px;left:0px;">启动脚本</button>
                <button style = "background: #651fff; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-10px;left:0px;"> <span>已上传采样记录</span> </button>
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:0;left:-5px;cursor: pointer;"
                     title="保存已采样记录"
                >
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:0px;left:-20px;cursor: pointer;"
                     title="清空已采样记录"
                >
                <div style="font-size:16px;font-weight: bold;color:#304ffe; position: relative; top:-33px;left:260px;">
                    <span>共 </span>
                    <span id = "countOfLocalSamplingTubs">0</span>
                    <span>管 </span>
                    <span id = "countOfLocalSamplingNums">0</span>
                    <span>人</span>
                </div>
            </div>
            
            <hr style = "position: relative; top:5px;" width="100%"/>
            
            <div>
                <button id = "btnControlOfflineMode" style = "background: #FF6F00; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-52px;left:0px;">启动离线模式</button>
                <button style = "background: #651fff; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-52px;left:0px;"> <span>离线采样记录</span> </button>
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:-43px;left:-5px;cursor: pointer;"
                     title="保存离线待上传记录"
                >
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:-43px;left:-22px;cursor: pointer;"
                     title="清空离线记录"
                >
                
                <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABcRAAAXEQHKJvM/AABvSElEQVR42u3dd4AU5f0/8Pczs+V6gYOjVwEFxIIFe+8aFVEToyaWxBKjsX8NxvaLMUaNGhP1+1VjNyYIsWMFpSgKiFjpvcPdcXVvd2eez++P2Z3bvdurXNkb3q989yu3dWa2vOd55pnPo0REQERERN2a0dULQERERLuOgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDzA19UL0FpKqa5eBM8yTROWZbXqMW15P0Skq1eVOllnfG9b+7lK19+S1qxHuq6DF7Tl97CrsYVORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAQx0IiIiD2CgExEReYDnA11EdsvLww8/3Opt1a9fv65+u4ioA3X17xJ/DztWt5uchdKLVyZaSddJLtJxwhGvvOdtWY/Wbl+vbCvqHjzfQiciItodMNCJiIg8gIFORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAazlnkI61vU+88wz8frrr3f1YnSJtrwfra2h3Rk1t9uyHulYO7wz3o90/A62RWdsq3Rch462O/8eNoUtdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewMlZaJd0xsQNXplwxCvr0VnLlY7LtLtOMkPdA1voREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQewljvtkrbUAW9tfet0rU/uFa3dvty2ROmJLXQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIA1jLPYUzzzyzqxehgQEDBnT1IhDRboi/h90HAz2F119/vasXwdNaO7lHWyZnactj0vE1Wssrk+V0xrbtjG3lBfw97D7Y5U5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIP8Hzp10ceeaSrF6FLzJo1q9WPqays7OrFJqIOxN/DluuOv4dK2lLQuCsXeDespdxZTNOEZVmteky61vXma/A1dofX4O9hx2nL72FXY5c7ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdHKxLjQRkaM7/h52u9nWutlcMp7XlvejtV+UzniNtuiOX3gvS8fPVUf/XvH3kBKxhU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5QLer5d4Z2lKju7U1ldO1DnhnrIdXttXuKl1roHfG5yQdP7vpWs893erep+sytSe20ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5QLebnGV3nuygM9bDKxOheGWih3R8PzpjQp622F2/t155P9Lxs97dsIVORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAQx0IiIiD2CgExEReUC3q+XeGdK1Xnxrlytd12N3la41t9OxhrZXPrte+X6k6/uRjp/drsQWOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPUOKV2QOaWslWFvDfDTZJo9JxsoPOmLQhXV+jM6Tje94Wu+tENm2Rrp/FjuaV72xj2EInIiLyAAY6ERGRBzDQ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NWtWqx9TWVnZ1YtNRERtpKSb1cJj2dCOY5omLMvq8NdJx/ewm30NGtUZpV935/VIxzKr6bhMbVmudH2N7sTzLXRKP1754U3HZfJKbf10/XHvjLBNxyDsjB2szvgcen0HgMfQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdHKlYwlQIiJqmW43OQsRERE1xBY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA70bCIfDsCyrqxeDqMVs20YkEunqxSAPERFUVlZ29WKktd0i0D/77DNMnz4dtm03uK2yshI33XQTbrrpJrz77rspH//6669j2rRpWLp0acrnSGXu3Ll49dVX8eqrrzb6vKkMGTIEOTk5yMnJweuvvw4AuO+++zB69Gi88sor0Fp39eZMSyUlJe52y8nJwY8//tiixyVu7//7v//r6tVIe/fffz/ee++9Zu/30ksvoaioCBMnTsTTTz/d7uEejUZb/F0EgDlz5uDJJ5/Ek08+2aL3edq0aTj88MPdy7p161r0OieffDImTJiACRMm4Pe//327rnNn+X//7//h/vvvb/Q79Oqrr+KVV17Bpk2bOnxZLMvClClTcMkll6Bfv3447bTTunrzpDXPz4deWVmJcePGYc2aNejbty9+9atf4e6773Zv37JlC/r27QsAuPXWW/HnP/+5wXNMmDABX3zxBQDglltuwf3339/s606aNAlTp04FAIwaNQpLlixp0fIWFRWhpKQEADBlyhQccsghGDlyJGpqagAA++23H/7617/i6KOP7upNm1Z27NiBXr16uX9/++23GDt2bLOPS9zejz32GK655poWvd7GjRvxm9/8pl3X4dhjj8W1116b8rbq6mqEQqGO2nyunj17QimV8rbS0lL069cP4XAY48ePxx/+8AeceeaZKe87btw4fPvttwCA0aNH47vvvmv0eVsqFAph9uzZeOONN/Cf//wHV111Fe65554WPfaaa67BP/7xDwCAaZrN9nj9/e9/x29/+1v37x9//BF77rlns6+T+Hk655xz8Nprr+3SOne2nTt3ol+/fu5n7eijj8bMmTPd20UEAwcOxMaNGwEAxx9/PD788MMOXaYDDjgACxcudP/++OOPceyxx3b1pkpLvq5egI4kIrj88suxZs0aAMDmzZtRXFzc6udZuXKl++8RI0Z06jqsW7cOY8aMwfz58wEAixYtwn333ZdWgX7ZZZdh69atHfb8Dz30EEaNGuX+HQqFkr7gAFBeXp7096JFi7Bz507377y8PPTq1SvpvQSQ9MO+atUqzJkzp8HrH3744Q2uq6ysxBtvvNGu61lQUNDobTfeeCP+93//t11fL5WysrJGl+P5559HOBwGACxcuBBTpkxJGej//ve/3TAHgBtuuKHRMLcsCz5fw58hrTVWr16Nb7/9FvPmzcOsWbOwYMECRKNR9z733nsvjj/+eBx55JHudR999BEAJ2io9V544YWkHcdjjjkm6fZPP/3UDXMAOOigg9r0OtOmTWtxb+PYsWOTvu9//OMfUVpa2qLHDh8+HPvtt1+nbb+u5ulAv+222/Cf//zH/fvUU0/F1VdfjYKCAlRVVeGFF15osKf3yiuv4OKLLwbghIRlWdixY4d7+8iRI3dpmT755JMm99qrq6vdfz/zzDMYPnw4DjroIBiG4fYSZGRk4JprrsFtt92G/v37d/Vmxscff4y1a9d22PPffvvtSX+vXbsWRxxxRJOPib+HcQcffDAuvPDCpFZXfQ8//DAefvjhBtdHo9GUobM7EZGkrmqlVMou5crKStx4441J11177bW47rrrGtxXa42ePXvib3/7G84++2z3+j/+8Y+477773F6pxmitcfvtt+PTTz+FUgqPP/44rrvuOmitcc8992Dy5Mldvdla5fzzz2+wY9qebrzxRpxwwgmN3m5ZFv7617+6f/v9fvz6179Ouk+8lwNwPgO//OUv27Qs5513XqsOmSSaOXNmUq9BU6644go8+eST7bUJ055nf6Uee+yxpK7xkSNH4uWXXwbgfHBt2065h6i1dj9oIoLFixcn3b733nvv0nJ9/fXXSV+KpjR2rPLNN98EAFx++eVpEejk9CLU//FrzqpVq7DPPvt09aK3yH//+9+kw0YXXnghRo8e3eB+t9xyS1ILDkCTwbxhwwZMnDgR8+fPxwEHHAAAOPHEE/GHP/yh0cecfPLJOP7443H88ce722/NmjW444473B6X22+/HUuXLsXTTz+NQCDQrtviq6++wqxZs1LeVltb6/57xYoVeOSRR1Le7/DDD3fXN+7jjz92u+s7wk9/+tMmb3/ppZeSdszPPfdc9OnTx/17/fr17rgeADjppJM6vceSmubJQL/vvvuSWg89evTAm2++2WSXZmMSu3qGDBmCwsLCrl69tOPz+WCaZrP3q79H3pLHAGjQXZuZmYnx48e7f1dWVmLZsmVJ9ykoKMDw4cPdv/faay/07t076XGLFi1qsFNnmib23XffJl8/lQ8++KDF3YBxZWVlrbp/ohdeeAF+v7/Nj497+eWX8fbbbzd5n3iLNy4zMxP33ntvg/u9+OKLbWoNHXzwwUnhdtBBB2HfffdFIBDA8OHDEQ6HMW3aNPf2hx9+uMHx7CFDhuDLL7/EGWecgR9++MFdnq1bt7o7wO1lxowZuPnmm5u93+LFi3H99denvO2+++5rEOhdKRQKJe1EGYbRoGfsvvvuSzpENWPGDOTk5LT4NV5//fWUh0L8fn+77XSJSLM9O17muUBfvnw57rrrLvfvvLw8fPDBB21uydY/Vvs///M/De5zwQUXYNy4cS16vl//+tdN7imPGTPGDYannnoKp59+eqP3LSoqSnn9qlWrcNVVV2H27NkYNGgQ7r///kYHL7WHFStWtOh+iQOG+vfvjw0bNrTp9QYPHowFCxYAcMLmtNNOaxDo5eXlOPjgg/HnP/8Zubm57vXnnXceAODPf/5zg/cWcHY6LrroopRdxE15//338f7773fQFm7o3HPPRUZGRtJ1y5cvR0lJCQYOHIg+ffo02GGqqanB8uXL0bdvXxQVFcEwDCxYsKDZQH/ppZeSeqpuv/12DBw4EFu2bHFbcLNmzcIVV1yR9LgzzzwTl19+eYPnu//++5PGKiQOUo1btGiR++/XXnstKdAbM2zYMMyePRsnnXSS+/n44IMP8Mwzz7Rom/bp08c9vFZ/rHDiAMtf/epXbXvT0tiDDz6Y9H386U9/ir322sv9e926dQ22YyQSadXZC40NRLz22mvx4IMPtst6JA5y3h15LtBHjBiBu+66C7///e9RUFCAd999F+FwGEVFRTjjjDNw0UUXuV/WDRs2YOnSpe5jd+zYkfShFhHMmDHD/XvNmjUpR7jvu+++GDduHMLhsPvciS0/EXG74nw+H0Sk0R+FxPMsn3zyyaQurrj8/Hz38EF9tm3jJz/5Cb7//nsAwNKlS3Huuedi/vz53aZ7tzWuu+66lIcmRASPP/443nnnHTz99NNJLYP//d//bfKUohtuuAGFhYUNjsOnu0cffdQ9nDNp0iRMmTIl6fYvvvjCHTOSnZ3donN6Kysrcdttt7l/jxkzBjfffDNKS0sxevRo/OQnP8Fpp52GX/7ylw1G4U+fPh133XVXUo/HlClTksL8vPPOw0knndRu26BHjx7uKOiFCxfi5ptvxlVXXdXk2Im4+KG4VBKvz8rKanRw7bZt29zfgGAw2GivYKqW7dq1a9GSk46KiorcwYmA0+hoydie+juAcUuWLGnQ41K/4XLTTTd1WF2B0tLSFp8F1JzE8U67I88FOgDcfPPNmDt3Lv7yl79g9OjROProoxEOh/Haa6/ho48+cvcUE3+oADTYA12wYAE2b97c4tfNzs5O+YOwbNkyZGZmAgDGjx+PV199Fe+8806zz5eqBQk4pxY1ZtmyZW6Yx0WjUbz11lueCnQRwY033oi///3vKW/Pzc1FZWUl1q5dixNPPBEPP/wwrr32Wvzxj3/EHXfckfIxgwYNwrp166C1xiWXXIKSkpJGu0zr64pj6NXV1cjOznb/Xr16tfvv+FkBIuIeMoif7QE4XdQtOZRwzTXXuOcb+3w+PPfcc/D7/bj77rtRVlaG559/Hs8//3zKx0YiEUyaNAmzZs1Cv3798Mknn+DSSy91by8uLsajjz7a4HFffPFF0mj2+j/2X331VdIP93777Ze0HfLy8vDmm2/iww8/xC9+8Ys2b9/GXHXVVXjooYdS3pbYC3X66ae36rS1xHVojaysrFZ1fSeyLAuXXHJJ0g4CgKRW7kcffZS0c7jPPvvg9NNPT9oJ2GeffTBp0qQmXytxp+Oee+5xGz3Tpk1L6g3YVRMnTnRHticeYtstiMf961//EgDu5U9/+pNkZ2cnXdfY5Xe/+5377969e8udd94pd955pxQXF7vXX3jhhfLtt9+KiIhpms0+5/jx42X58uXu36Zpym9+8xv3kpGR4d528sknu9efdtpp7vU9e/ZsdH3XrFmT8nX/+te/dvVbIXl5ee7yDBw4sM3Ps3PnTjnnnHOS1u/3v/990t9vvvmmDBo0yN3Gb7zxhpx66qlJ9znrrLOksLDQ/fvRRx+Vk046Kek+5557rmzdurXBMvz4449J93vooYeksrKyVZfFixcnPccvfvGLRtf5iiuuSLrvli1bZJ999pG//e1v7n1GjRrl3v7SSy/JvHnzZNy4cbJ27VoREbn99tvd288++2wREbnxxhuTnresrExERCzLkjvvvDPptmOPPVYef/xxuf3225M+63369JEhQ4YIADnwwANl6tSpYhiGe/uoUaPk2WefTfps+/1+mT17dsp17dmzZ4u+n/HLokWLmv3M/OY3v0n6zqXyr3/9S5599ll59tln5cILL2zwuxG/raKiotHXSVz2c845p82f8aYEg8GkZfvxxx/b/Fw33XRTym26fft2EREpKytzv0fxy2effSZlZWVJ1/385z9v8zL84he/aNX73dzl2Wef7ZDt3h14soUet3379qRCHQMGDMB1112HlStXJo1GTSUSiSS1PCZMmOAem09sFd56660tKmDSGMMwMGHCBPfvxNccOXIkDjzwQABOd1lLWvWDBw/GxIkTk445FhcX4+c//3lHb+5mVVVVuf/elQFdl156adL6XXjhhbj++uvxpz/9yb1u6NChmDlzJo488kicddZZ2LRpU1LFvgkTJuCVV17BwIED3esMw8Crr76Kgw46CMuXLwfgdBEPGTIEf/nLX5pcphtvvLHB6Vod6eyzz8bixYvxu9/9Dn369MFPfvKTpLEMGzZswBVXXIHq6mqcdNJJ+Pzzz/HNN9+4tzfXRbt8+fIGx7ZnzJiRdAgq7umnn0YwGMStt96Kd999F0VFRXjwwQdxww03AHAO+1xyySVJ2/mZZ55JeX5/W9XW1uLiiy/G+PHjccstt7SpiE3i2Jaqqiq89NJLSdu7JYVlupN//etfjfY0AHAPDSZWyfvZz36GQw45JKnGw67KyMhI6p3QWjc4fBMIBBr8Zti2jdraWhiG4faAArv229LdeTbQRQSXXnoptm/f7l530003ISsrC08//XSzj3/mmWeSupniP5bl5eVul5pSKmkk9dKlS91jYL/97W/dY7vDhg1zB0xlZGQk7UxEo1FcdNFFKZfhb3/7W5vW/V//+hcee+wxzJkzBwMHDsQtt9yC3r17d8h2vuCCC1p0bE1rnTSuYNu2bc120SW64oor3HNo//nPf2LFihX45ptvcPTRR+Opp55K2lmIGzZsGD744AP07dsXhYWF2L59O+644w4ceOCBeOedd5J+BOIKCgrw4Ycf4rjjjsPKlStx6aWXNhvmXSEeWFprXHzxxXjooYfcwz2maWLvvfd235clS5bg3HPPTRo4OGbMmCaff88998Rhhx2GuXPnNnm/yy+/3C3H+dlnnyEYDAIArr/+enz11VdJoRj3wAMPNPqZb4uysjIcf/zxmDt3LqZMmYJ58+bh5ZdfRlZWVodt/+nTpzfopgaQ9F3YtGlT0hiYyspKDB8+HIceemiHLVdLffnll/jlL3/Z5DH7yZMnJx0yKCgoSDpPPVFFRUWTx8GLiooaHcQbL8kLOL+v5513Hj744AP39kMPPRRvvPFG0uM///xz/PKXv8SyZcuglMKDDz6IK6+8sqs3a5fzbKDfeeedDUbv5ufnIxKJtGhEev06xcuXL0c0GnVbboAzUjsxFBLDPXGP0+/3Y4899nD/TmxJGYaBM844w/17+vTp7o/CgQceiH79+gEAtm7dinnz5rVo3QOBQKe1GKdNm5byh605VVVVbmncljj++OPdQM/Pz8ebb76J2267DU899RQyMjJSBnp8u9144424/PLL8T//8z/IycnBFVdc0eSP/eDBg/H555/j7rvvTlloBnAGNZ100kn47LPPYNs2DjroIDfM2qo1NQ6mTJmCo446CitWrEBtbW1Sydq9994bp556Kv7v//7PbRnHK6jFJfYKNeaCCy7A3LlzEQwGMWzYMGitkwaRDh06NOkHPr7+s2bNwr333pv0o5zorrvuwqZNm3D99denPPtk/vz57s5JKBTChAkTkk5Fuv/++zFx4kT372g0mnRM/fXXX8fRRx+Nt99+u8N2ZC+66KJmzxn//PPPkwrmxO2zzz5499133e92Vxg5ciTy8vKaHEQ2ePBg+Hw+d8zRP/7xj6Tz0hO99dZbeOuttxp9rsmTJ+OPf/xjk8u0bNkynH322e5ph4DT+xb/jicKBAJuES7btnHVVVdh1apVuP/++3e5xHC31tV9/h3hmWeeEaVUymMroVCozcdmvvnmG3nuuefcv0899dRGlyHxGO+oUaOSbks8hh4IBGTRokXupaCgwL3tgQcecK//29/+1qJj6J2t/vG8jro88cQTTS5HKBSSJ554wr2UlpbKu+++mzReok+fPjJlypSkxz333HPuY7777rtWrfs333zjHivOysqSyy+/POn2Z599Vo466ij30pJjvY2pfww9FArJkiVLJD8/v8G2uuKKK9zH3XDDDQ1uT/z8NHYMXUSkpKREvvjiC4lGo1JVVSWjR49275eRkSELFy5077tu3Tp59NFHZcKECS1+TwOBgJx55pny1FNPycaNG1Ou99NPP93gcZmZmTJ37tyk+5WWlsrRRx+ddL+RI0fK5s2bRaRlx9ATPfbYY0nPNWfOHJk2bZpcd911YllWq4/zJ16KiorEsqw2fxba6xj6X/7yF/c5hg8fnvIY+ptvvinBYLDB+I76x9Cbu0yePLnR5dBay+OPPy45OTlJj7nssstkxowZMnXqVHnmmWfkwQcflMmTJ8tvfvMbueCCC2T8+PENXuf888+XaDTa5m3b3Xku0N94442kATltDfSCggI54IADpFevXu51jz32mPzqV79q0Ye0pYHelgsDvWmWZckf//jHBp+DESNGyI4dOxp9XE1NTYtfQ2stxx13XNLzP/3000n3qT+obObMmW3ezqkCXUTkrbfearDzmjgoKBqNyqGHHpp0e+KOaFOBnuj8889P+RpaaznhhBMafd8yMjLkjjvukPXr18uvf/3rRr+bAOS9995r8Lr77bdfo9+BZcuWNXj/TjzxxKT7XXnllSLS+kB/6KGHGl3OtWvXyuDBg5M++xkZGZKdnZ3yUv87Un/Hr7XaK9Crq6ulV69eMnnyZLnuuutSBrqIyOzZs93PW1x7BbplWTJixIh2/a0466yzdttQ91ygr1u3Lmk0daofoZaMQK6qqpKVK1fKnDlz3MefffbZSa2UqVOnNrocrQn0/v37u5fEH7wePXq41ye2CNIp0Kuqqprdltu2bUv5nmRlZcmaNWta9H609Av6/fffN9pK9Pl8EgwGG70YhiG//vWvpby8vNnXeeCBBxo8f/3nq3/Wg9/vb/L1g8GgHHnkkSlfr7FAF0kevQ5A7r777qTHrl+/Xnw+n3v7hAkTRGstIi0L9PrPf8wxx8hzzz0n1157rRx++OHSu3fvBtvCMAw599xzZeXKlUnPNX/+/AY7QgCkuLi4Qav1o48+avKHe4899miwg1ZbW+vuYJx44olSXV0tIs0Hemlpqbz44oty9dVXJ33HU11mzpwp27ZtS2pR/s///E+jn5X6792HH364S9+59hzl/sknn4jWuslAT6V+oJ911lmyevXqRi+N7SiKiJx33nltDu+8vDwZOnRog8/g9ddfv0vbuLvyXKCLiDzyyCPunnBiEMYDfe3atY3uTccviT8Uw4YNcz888daQYRhNtvZaGujBYDDptsTlTewefuutt9Iy0FvimWeeafQLefPNN7fLa2zfvl2uueaapOBq62XgwIFNnpr03nvvid/v75CeiIMPPjjlazYV6H/4wx+SbjNNU2bNmuXePm/evAav89hjj4lI84F+7733NrvMV199tftvpZScccYZMmvWLNm8eXOjl/fff19OOukk9/sUb0knOuigg1K+Xt++fd1/H3744Q129ioqKuSGG26QcDjsXtdcoC9btqxF709+fr68//77IiJJPRMFBQVSWlra4HnXrFkjgUDAvd+4ceN2+bPenoEet6uBviunrb366qtJO71DhgyRQw45RM4++2y54oor5Nxzz5UzzjhDLr30Urn11ltl3rx5snHjxqT3d+PGjTJ48GABIBMnTkx5qunuwJOBHo1G5brrrpNoNJoy0FevXt3sFzfxA/2zn/2swe0HHnhgk8vQVKCvWbNGBg8eLIMHD5aRI0cm3fb111/L/PnzZf78+Uk/ENu2bZPp06fL9OnT5eOPP+7qTdxioVCowfG5xEsgEHDP42+LjRs3yo033tjg+NuuXK699tpGX+/TTz9tcR2Dzgh0rbUMHTq0wfMMGDDA/fwkBm78kpOTI+vWrWsy0E8//fQWLfNDDz0kl112mUycOLFN63zbbbfJvHnzktZ36tSpSTsJifd/9tln3X9PnDixRZ+TxEA3DEP+8Ic/yFlnnSXDhw93d8zjgZDqcs0118jMmTMlEom4z/nuu+82+7k544wzku7zyiuv7PJ3ymuBXlZWJlOmTJG1a9eKbdtNvncAZPXq1SmfZ9GiRfLyyy/v8rbozjwZ6IlaEujjxo2T8ePHJ+35J36g//nPfzb4gtfv1qyvsUCPRqOtulx44YVy2GGHyWGHHSY33XRT0m3xbtN0dvfddydtt8zMTLntttuSrtt///0bHKNrzrZt22TixIkpW+SmacpVV10lJSUlTT5HaWlpg+75YcOGSVVVVcr7v/rqqw1+TJv6IeuMY+hvvPFGg3WP//tnP/uZ7Ny5M+XAufjtTQX6pEmTGg24goICOe200+S+++6TpUuXiojIU0891aZAnz9/ftK61tTUyB577OHefvbZZzcIsPPPP18GDRrUaFfu2rVr5e2335b77rtPLrjgAunTp0+jr//pp5+KiMhl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"
                     style = "padding:0;max-width:140px; max-height:140px;position: relative; top:-35px;left:-13px;cursor: pointer;"
                     title = "打开合作微博"
                     onclick = "window.open('https://weibo.com/u/7711875625');"
                 >
                 
                 <div 
                    style="font-size:14px;font-weight: bold;color:#00e676; position: relative; top:-222px;left:273px;"
                    title = "等待处理的离线记录" >
                    <span>剩余</span>
                    <span id = "countOfRemainingOfflineTubs">0</span>
                    <span>管</span>
                    <span id = "countOfRemainingOfflineNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div 
                    style="font-size:14px;font-weight: bold;color:#d50000; position: relative; top:-222px;left:273px;"
                    title = "上传失败的离线记录">
                    <span>失败</span>
                    <span id = "countOfFailedOfflineTubs">0</span>
                    <span>管</span>
                    <span id = "countOfFailedOfflineNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#304ffe; position: relative; top:-205px;left:128px;"
                      title = "正在自动处理的离线试管编号">
                    <span>当前处理试管编号：</span>
                    <span id = "currentProcessingOfflineTubs" style = "text-decoration:underline">无</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#00e676; position: relative; top:-200px;left:198px;">
                    <span>成功</span>
                    <span id = "countOfProcessingSuccessNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#d50000; position: relative; top:-200px;left:198px;">
                    <span>失败</span>
                    <span id = "countOfProcessingFailedNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#2962ff; position: relative; top:-200px;left:198px;">
                     <span>等待</span>
                     <span id = "countOfProcessingReadyNums">0</span>
                     <span>人</span>
                 </div>
                 
                 <hr style = "position: relative; top:-205px;left:68px;" width="67%"/>
                 
                 <div style="font-size:16px;color:#000000; position: relative; top:-210px;left:125px;">
                    <span >离线上传进度：</span>
                    <progress id = "progressOfUploadOffline" style = "max-width:90px;" value="100" max="100"/>
                 </div>
                 <div style="font-size:16px;color:#000000; position: relative; top:-230px;left:335px;">
                    <span id = "percentOfUploadOffline">100%</span>
                 </div>
                 
                 <div style="font-size:16px;color:#000000; position: relative; top:-230px;left:125px;">
                    <span >服务器状态：</span>
                    <span id = "_hscj_control_panel_serverPing" style = "font-weight: bold;"></span>
                    <span id = "_hscj_control_panel_serverState" style = "color:#00e676;"></span>
                 </div>
                 
                 <hr style = "position: relative; top:-233px;left:68px;" width="67%"/>
                 
                 <div style="font-size:16px;font-weight: bold;color:#000000; position: relative; top:-235px;left:123px;" title="包含所有已采样记录及离线待上传记录。\n注意：离线成功记录已计算在已采样记录中。">
                    <span>统计：</span>
                    <span id = "countOfSummeryTubs">0</span>
                    <span>管</span>
                    <span id = "countOfSummeryNums">0</span>
                    <span>人</span>
                 </div>
            </div>
            
            <div>
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:320px;cursor: pointer;"
                     title="二维码引擎状态"
                >
                <span id = "_hscj_control_panel_stateOfQR" style = "color:red;font-size:15px;font-weight: bold;position: relative; top:-256px;left:303px;">✖</span>
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:306px;"
                     title="图片文字识别服务器状态"
                >
                <span id = "_hscj_control_panel_stateOfOCR" style = "color:red;font-size:15px;font-weight: bold;position: relative; top:-256px;left:288px;">✖</span>
                
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:210px;visibility:visible;cursor: pointer;"
                     title="隐藏摄像头"
                     id   = "_hscj_control_panel_hideCamera"
                >
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:186px;visibility:hidden;cursor: pointer;"
                     title="显示摄像头"
                     id   = "_hscj_control_panel_showCamera"
                >
                <div id = "_hscj_control_panel_cameraState" style="background-color:red;border-radius: 50%;width:5px;height:5px;position: relative; top:-275px;left:302px;"></div>
            </div>
        </div>
    `;
        child = div.firstElementChild
        div.removeChild(child);
    }
    const imgs    = child.getElementsByTagName("img");
    const buttons = child.getElementsByTagName("button");
    const spans   = child.getElementsByTagName("span");
    const btnScriptControl       = buttons[0];
    const btnShowSamplingRecords = buttons[1];
    const imgDownloadSampling    = imgs[1];
    const imgCleanSampling       = imgs[2];
    const btnOfflineModeControl  = buttons[2];
    const btnShowOfflineRecords  = buttons[3];
    const imgDownloadOffline     = imgs[3];
    const imgCleanOffline        = imgs[4];
    const spanQRCodeState        = spans[39];
    const imgQRCodeState         = imgs[6];
    const spanOCRState           = spans[40];
    const imgOCRState            = imgs[7];
    const imgHideCamera          = imgs[8];
    const imgShowCamera          = imgs[9];
    btnScriptControl      .onclick = c4.f1G;
    btnShowSamplingRecords.onclick = c4.f1m;
    imgDownloadSampling   .onclick = c4.f1n;
    imgCleanSampling      .onclick = c4.f1o;
    btnOfflineModeControl.onclick = c4.f1H;
    btnShowOfflineRecords.onclick = c4.f1s;
    imgDownloadOffline   .onclick = c4.f1t;
    imgCleanOffline      .onclick = c4.f1u;
    imgQRCodeState.onclick = ()=>{
        if(spanQRCodeState?.innerText === "✖"){
            c4.speak("请检查摄像头是否可用或在选项页面打开相关功能！");
        }
    };
    spanQRCodeState.onclick = imgQRCodeState.onclick;
    imgOCRState   .onclick = ()=>{
        if(spanOCRState?.innerText === "✖"){
            if(confirm("图片识别引擎没有运行，需要下载吗？\n\n若已下载，检查是否运行，摄像头是否正常，是否已开启相关功能")){
                window.open("https://best335.lanzouv.com/ioPyg0fukp9a");
            }
        }
    };
    spanOCRState  .onclick = imgOCRState.onclick;
    imgHideCamera .onclick = ()=>{c4.f2h(false);}
    imgShowCamera .onclick = ()=>{c4.f2h(true );}
    return child;
};
c4.speak = MessageManager.f3Q.speak;
c4.f1m = async function () {
    LocalSamplingRecordManager.listAll({
        onSuccess : function (datas) {
            const table = DOMUtils.createSingleEleByString(`
                <div id = "idOfLocalSamplingDialog" style = "background:rgba(0,0,0,0.5);width:100%;height:100%;margin:0;padding:0;position:absolute;top:0;left:0;z-index: 9999;">
                    <div style="border-radius: 25px; background: #ffffff; padding: 10px; position: absolute; left: 50%; top: 50%; margin-left: -500px; margin-top: -400px; width:1000px; height:680px;">
                        <div data-v-926b23b0="" data-v-0b9e8182="" class="app-container">
                        <div data-v-1f92a67c="" data-v-926b23b0="">
                            <div data-v-1f92a67c="" style="background-color: white; font-size: 20px; font-family: PingFangSC-Regular, &quot;PingFang SC&quot;; font-weight: bold; color: rgb(48, 49, 51); line-height: 60px; text-align:center;"> 
                                <span>核酸已上传采样记录 —</span>
                                <span>20??-??-??</span>
                                <img src="data:image/png;base64,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" 
                                     title="关闭弹窗" 
                                     style="max-width:30px; max-height:30px;position:relative;left:270px;top:2px;text-align:right;"
                                />
                            </div>
                            <div data-v-1f92a67c="" style="padding: 0px 20px; background-color: white;">
                                <div data-v-1f92a67c="" style="background-color: rgb(228, 231, 237); height: 1px;"></div>
                            </div>
                        </div>
                      
                        <div data-v-926b23b0="" class="el-table el-table--fit el-table--striped el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--mini" style="width: 100%;">
                            <div class="el-table__header-wrapper">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;display: table;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <thead class="has-gutter" style = "width: 100%;">
                                        <tr class="tb-header">
                                            <th colspan="1" rowspan="1" class="el-table_1_column_1  is-center   is-leaf">
                                                <div class="cell">序号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                                <div class="cell">试管编号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_3     is-leaf">
                                                <div class="cell">采样时间</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_4     is-leaf">
                                                <div class="cell">姓名</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_5     is-leaf">
                                                <div class="cell">身份证号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_6     is-leaf">
                                                <div class="cell">手机号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_7     is-leaf">
                                                <div class="cell">状态</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_8     is-leaf">
                                                <div class="cell">操作</div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="el-table__body-wrapper is-scrolling-left">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;display: table;display: block;height: 500px;overflow-y: scroll;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <tbody style = "width: 100%;display: table;display: block;height: 470px;">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="pagination" style="background: rgb(255, 255, 255); width: 100%; text-align: center; padding: 10px 0px;">
                            <div data-v-926b23b0="" class="el-pagination is-background">
                                <span class="el-pagination__total" >共 ？管 ？人</span>
                            </div>
                        </div>
                    </div>
                 </div>
            `);
            document.body.appendChild(table);
            c4.f1D();
            const title   = table.getElementsByTagName("span")[1];
            const tbody   = table.getElementsByTagName("tbody")[0];
            const img     = table.getElementsByTagName("img")[0];
            const summary = table.getElementsByTagName("span")[2];
            LocalSamplingRecordManager.localSamplingInfo({
                onSuccess : function (datas) {
                    const data        = (datas??{})[0]??{};
                    const tubCount    = data["tubCount"]??0;
                    const recordCount = data["recordCount"]??0;
                    summary.innerText = "共 "+tubCount+"管 "+recordCount+"人";
                },
                onFailure : function (err){}
            });
            title.innerText = LocalSamplingRecordManager.time.Format("yyyy年MM月dd日");
            img.onclick = function () {
                document.body.removeChild(table);
            }
            const classes = [
                "el-table_1_column_1 is-center ",
                "el-table_1_column_2  ",
                "el-table_1_column_3  ",
                "el-table_1_column_4  ",
                "el-table_1_column_5  ",
                "el-table_1_column_6  ",
                "el-table_1_column_7  ",
                "el-table_1_column_8  "
            ];
            const widths = [8, 16, 17, 8, 18, 15, 8, 10];
            for(let i=0,ni=datas?.length??0; i<ni; ++i){
                const data = datas[i]??{};
                const tr = document.createElement("tr");{
                    tr.class = "el-table__row";
                    tr.style = "width: 100%;display: table;";
                }
                for(let i=0;i<8;++i){
                    const td = document.createElement("td");{
                        td.rowSpan = 1;
                        td.colSpan = 1;
                        td.className = classes[i];
                        td.style = "width:"+widths[i]+"%";
                    }
                    const div = document.createElement("div");{
                        div.className = "cell";
                        div.innerText = "";
                    }
                    td.appendChild(div);
                    tr.appendChild(td);
                    if(i === 7){
                        const btn = document.createElement("button");{
                            btn["data-v-926b23b0"] = "";
                            btn.className = "el-button el-button--text el-button--mini";
                            btn.type = "button";
                            btn.style = "cursor: pointer;";
                        }
                        const span = document.createElement("span");
                        span.innerText = "删除记录";
                        span.style = "color:red";
                        btn.appendChild(span);
                        div.appendChild(btn);
                    }
                }
                const eIndex = tr.getElementsByClassName("el-table_1_column_1 is-center ")[0].getElementsByTagName("div")[0];
                const eTubNo = tr.getElementsByClassName("el-table_1_column_2  ")[0].getElementsByTagName("div")[0];
                const eTime  = tr.getElementsByClassName("el-table_1_column_3  ")[0].getElementsByTagName("div")[0];
                const eName  = tr.getElementsByClassName("el-table_1_column_4  ")[0].getElementsByTagName("div")[0];
                const eIdNo  = tr.getElementsByClassName("el-table_1_column_5  ")[0].getElementsByTagName("div")[0];
                const ePhone = tr.getElementsByClassName("el-table_1_column_6  ")[0].getElementsByTagName("div")[0];
                const eState = tr.getElementsByClassName("el-table_1_column_7  ")[0].getElementsByTagName("div")[0];
                const eBtnOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("button")[0];
                const eTxtOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("div")[0];
                eIndex.innerText = (i+1).toString();
                eTubNo.innerText = data["tubNo"];
                eTime .innerText = new Date(parseInt(data["samplingTime"])).Format("yyyy-MM-dd hh:mm:ss");
                eName .innerText = data["name"];
                eIdNo .innerText = data["idNo"];
                ePhone.innerText = data["phone"];
                eState.innerText = "已采集";
                let delFlag = 0;
                const ids    = data["ids"];
                const idType = data["idType"]??1;
                const idCard = data["idNo"];
                const onDeleteSuccess = function () {
                    eState.innerText = "已删除";
                    eTxtOpt.innerText = "";
                    delFlag = 1;
                    c4.speak("删除成功！",false);
                };
                const deleteById = function (ids) {
                    c2.delSampling(ids,"",{
                        onFailure : function (code,msg) {
                            c4.speak(msg,false);
                        },
                        onSuccess : function (code,msg,datas) {
                            onDeleteSuccess();
                        }
                    },true);
                };
                /* 查找本地用户id后查询历史记录删除 */
                const searchIdAndDel = function (tubNo){
                    /* 1、查找本地用户id */
                    LocalUserInfoManager.queryUser(idType,idCard,{
                        onSuccess:function (datas) {
                            const data   = datas;
                            const id = (data??{})["id"];
                            if(FunctionUtils.isNull(id)){
                                c4.speak("删除失败！",false);
                                return;
                            }
                            /* 2、查询历史试管采样记录 */
                            c2.histSampling(
                                null,
                                tubNo ,
                                null,
                                null,
                                null,
                                null,
                                null,
                                {
                                    onFailure : function (code,msg) {
                                        c4.speak(msg,false);
                                    },
                                    onSuccess : async function (code,msg,datas) {
                                        let isFound = false;
                                        for(let i=0,ni=datas?.result?.length??0;i<ni;++i){
                                            const data = datas.result[i];
                                            const ids = data["id"];
                                            await new Promise((resolve, reject) => {
                                                if(id === data["peopleId"]){
                                                    /* 3.1、查找匹配的结果 */
                                                    LocalSamplingRecordManager.updateDelFlag(1, eIdNo .innerText, ids,{
                                                        onSuccess : function (){
                                                            deleteById(ids);
                                                            isFound = true;
                                                            resolve();
                                                        },
                                                        onFailure : function (){
                                                            deleteById(ids);
                                                            isFound = true;
                                                            resolve();
                                                        }
                                                    });
                                                }
                                                else{
                                                    /* 3.2、保存删除标记 */
                                                    LocalUserInfoManager.queryUserById(data["peopleId"],{
                                                        onSuccess:function (data){
                                                            LocalSamplingRecordManager.updateDelFlag(data["idType"]??1, data["idCard"], ids,{
                                                                onSuccess : function (){ resolve(); },
                                                                onFailure : function (){ resolve(); }
                                                            });
                                                        },
                                                        onFailure:function (err) { resolve(); }
                                                    });
                                                }
                                            })
                                                .then(()=>{})
                                                .catch(()=>{});
                                        }
                                        /* 3.3、网络没有此试管记录，当做已删除 */
                                        if(!isFound){
                                            onDeleteSuccess();
                                        }
                                    }
                                }
                            )
                        },
                        onFailure:function (err){
                            c4.speak("删除失败，请重试！",false);
                        }
                    });
                };
                eBtnOpt.onclick = function () {
                    if(delFlag === 1) return;
                    if (confirm("确定要删除此采样记录吗？\n\n这将同时删除网络上的采样数据。")) {
                        if(ids===undefined || (ids?.trim()?.length) === 0){
                            /* 同一试管已查询过，但数据还没有同步更新 */
                            LocalSamplingRecordManager.queryUser(idType,idCard,{
                                onSuccess : function (datas){
                                    const data   = (datas??{})[0];
                                    const ids    = (data??{})["ids"];
                                    if(FunctionUtils.isNull(ids) || (ids?.trim()?.length) === 0){
                                        searchIdAndDel(eTubNo.innerText);
                                    }
                                    else{
                                        deleteById(ids);
                                    }
                                },
                                onFailure : function (){
                                    c4.speak("删除失败，请重试！",false);
                                }
                            })
                            return;
                        }
                        deleteById(ids);
                    }
                }
                tbody.appendChild(tr);
            }
        },
        onFailure : function (err){
            c4.speak("查询失败！"+err,true);
        }
    });
};
c4.f1n = async function(){
    LocalSamplingRecordManager.listAll({
        onSuccess : function (datas) {
            if ((datas?.length??0) === 0) {
                c4.speak("无采样记录！", false);
                return;
            }
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet([]);
            worksheet["!cols"] = [ { wch: 6 },{ wch: 18 },{ wch: 15 },{ wch: 11 },{ wch: 10 },{ wch: 10 } ];
            const title = ["姓名", "身份号","地址","手机号","试管编号","采样时间"];
            XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
            worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                try{ return { wch:Math.max(width.wch,title[index].length)}; }
                catch(e){ return {wch:10}; }
            });
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            for(let i=0,ni=datas?.length??0; i<ni; ++i) {
                const data    = datas[i]??{};
                const name    = data["name"];
                const idNo    = data["idNo"];
                const phone   = data["phone"];
                const tubNo   = data["tubNo"];
                const address = data["address"];
                const time    = new Date(parseInt(data["samplingTime"])).Format("yyyy-MM-dd hh:mm:ss");
                const rowInfo  = worksheet["!ref"];
                const rowCount = parseInt(rowInfo.substr(rowInfo.search(":")+2))+1;
                const row      = [name, idNo, address, phone, tubNo, time];
                worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                    try{return {wch:Math.max(width.wch,row[index].length)};} catch(e){return {wch:10};}
                });
                XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: "A"+rowCount});
            }
            XLSX.writeFile(workbook, "核酸采样记录 "+TimeUtils.fE(new Date().getTime())+".xls");
        },
        onFailure:function (err) {}
    });
};
c4.f1o = function () {
    if(confirm("确定要删除今日的采样记录吗？\n此操作不会影响到网络记录!")){
        LocalSamplingRecordManager.clear({
            onSuccess:function () {
                c4.speak("删除成功！",false);
            },
            onFailure:function (err) {
                c4.speak(err??"删除失败！",false);
            }
        });
    }
};
c4.f1p = async function () {
    LocalSamplingRecordManager.localSamplingInfo({
        onSuccess:function (datas) {
            if((datas?.length??0) === 0){
                c4.f10(0);
                c4.f11(0);
                return;
            }
            const data        = datas[0]??{};
            const tubCount    = data["tubCount"]??0;
            const recordCount = data["recordCount"]??0;
            c4.f10(tubCount);
            c4.f11(recordCount);
        },
        onFailure:function (error){}
    });
};
c4.f1r = function () {
    c4.fX(c4.f3c());
};
c4.f1s = async function () {
    OfflineSamplingManager.listAll({
        onSuccess : function (datas) {
            const table = DOMUtils.createSingleEleByString(`
                <div id = "idOfOfflineSamplingDialog" style = "background:rgba(0,0,0,0.5);width:100%;height:100%;margin:0;padding:0;position:absolute;top:0;left:0;z-index: 9999;">
                    <div style="border-radius: 25px; background: #ffffff; padding: 10px; position: absolute; left: 50%; top: 50%; margin-left: -500px; margin-top: -400px; width:1000px; height:680px;">
                        <div data-v-926b23b0="" data-v-0b9e8182="" class="app-container">
                        <div data-v-1f92a67c="" data-v-926b23b0="">
                            <div data-v-1f92a67c="" style="background-color: white; font-size: 20px; font-family: PingFangSC-Regular, &quot;PingFang SC&quot;; font-weight: bold; color: rgb(48, 49, 51); line-height: 60px; text-align:center;"> 
                                <span>核酸离线采样记录 —</span>
                                <span>20??-??-??</span>
                                <img src="data:image/png;base64,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" 
                                     title="关闭弹窗" 
                                     style="max-width:30px; max-height:30px;position:relative;left:280px;top:2px;text-align:right;"
                                />
                            </div>
                            <div data-v-1f92a67c="" style="padding: 0px 20px; background-color: white;">
                                <div data-v-1f92a67c="" style="background-color: rgb(228, 231, 237); height: 1px;"></div>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="usermanage-box" style="background-color: white; padding: 20px 20px 0px;">
                
                        <div data-v-926b23b0="" class="el-table el-table--fit el-table--striped el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--mini" style="width: 100%;">
                            <div class="hidden-columns">
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <!---->
                                <div data-v-926b23b0=""></div>
                            </div>
                            <div class="el-table__header-wrapper">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;display: table;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <thead class="has-gutter" style = "width: 100%;">
                                        <tr class="tb-header">
                                            <th colspan="1" rowspan="1" class="el-table_1_column_1  is-center   is-leaf">
                                                <div class="cell">序号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                                <div class="cell">试管编号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_3     is-leaf">
                                                <div class="cell">采样时间</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_4     is-leaf">
                                                <div class="cell">姓名</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_5     is-leaf">
                                                <div class="cell">身份证号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_6     is-leaf">
                                                <div class="cell">手机号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_7     is-leaf">
                                                <div class="cell">状态</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_8     is-leaf">
                                                <div class="cell">操作</div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="el-table__body-wrapper is-scrolling-left">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;display: table;display: block;height: 500px;overflow-y: scroll;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%"> 
                                    </colgroup>
                                    <tbody style = "width: 100%;display: table;display: block;height: 470px;">
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div class="el-table__column-resize-proxy" style="display: none;"></div>
                            <div class="el-loading-mask" style="display: none;">
                                <div class="el-loading-spinner">
                                    <svg viewBox="25 25 50 50" class="circular">
                                        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="pagination" style="background: rgb(255, 255, 255); width: 100%; text-align: center; padding: 10px 0px;">
                            <div data-v-926b23b0="" class="el-pagination is-background">
                                <span class="el-pagination__total">共 ？管 ？人，已成功？人，已失败？人，等待中？人</span>
                            </div>
                        </div>
                    </div>
                 </div>
            `);
            document.body.appendChild(table);
            c4.f1D();
            const title   = table.getElementsByTagName("span")[1];
            const tbody   = table.getElementsByTagName("tbody")[0];
            const img     = table.getElementsByTagName("img")[0];
            const summary = table.getElementsByTagName("span")[2];
            title.innerText = OfflineSamplingManager.createTime.Format("yyyy年MM月dd日");
            img.onclick = function () {
                document.body.removeChild(table);
            }
            OfflineSamplingManager.queryOfflineInfo({
                onSuccess:function (datas){
                    const data = (datas??{})[0]??{};
                    const tubsCount     = data["tubsCount"]??0;
                    const successCount  = data["successCount"]??0;
                    const failureCount  = data["failureCount"]??0;
                    const samplingCount = data["samplingCount"]??0;
                    const allCount      = data["allCount"]??0;
                    summary.innerText   = "共 "+tubsCount+"管 "+allCount+"人，已成功 "+successCount+"人，已失败 "+failureCount+"人，等待中 "+samplingCount+"人";
                },
                onFailure:function (err) {}
            });
            const classes = [
                "el-table_1_column_1 is-center ",
                "el-table_1_column_2  ",
                "el-table_1_column_3  ",
                "el-table_1_column_4  ",
                "el-table_1_column_5  ",
                "el-table_1_column_6  ",
                "el-table_1_column_7  ",
                "el-table_1_column_8  "
            ];
            const widths = [8, 16, 17, 8, 18, 15, 8, 10];
            for(let i=0,ni=datas?.length??0; i<ni; ++i){
                const data = datas[i];
                const tr = document.createElement("tr");{
                    tr.class = "el-table__row";
                    tr.style = "width: 100%;display: table;";
                }
                for(let i=0;i<8;++i){
                    const td = document.createElement("td");{
                        td.rowSpan = 1;
                        td.colSpan = 1;
                        td.className = classes[i];
                        td.style = "width:"+widths[i]+"%";
                    }
                    const div = document.createElement("div");{
                        div.className = "cell";
                        div.innerText = "";
                    }
                    td.appendChild(div);
                    tr.appendChild(td);
                    if(i === 7){
                        const btn = document.createElement("button");{
                            btn["data-v-926b23b0"] = "";
                            btn.className = "el-button el-button--text el-button--mini";
                            btn.type = "button";
                            btn.style = "cursor: pointer;";
                        }
                        const span = document.createElement("span");
                        span.innerText = "上传记录";
                        btn.appendChild(span);
                        div.appendChild(btn);
                    }
                }
                const eIndex = tr.getElementsByClassName("el-table_1_column_1 is-center ")[0].getElementsByTagName("div")[0];
                const eTubNo = tr.getElementsByClassName("el-table_1_column_2  ")[0].getElementsByTagName("div")[0];
                const eTime  = tr.getElementsByClassName("el-table_1_column_3  ")[0].getElementsByTagName("div")[0];
                const eName  = tr.getElementsByClassName("el-table_1_column_4  ")[0].getElementsByTagName("div")[0];
                const eIdNo  = tr.getElementsByClassName("el-table_1_column_5  ")[0].getElementsByTagName("div")[0];
                const ePhone = tr.getElementsByClassName("el-table_1_column_6  ")[0].getElementsByTagName("div")[0];
                const eState = tr.getElementsByClassName("el-table_1_column_7  ")[0].getElementsByTagName("div")[0];
                const eBtnOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("button")[0];
                const eTxtOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("div")[0];
                let err = data["err"];
                try {err = parseInt(err);} catch (e) {}
                eIndex.innerText = (i+1).toString();
                eTubNo.innerText = data["testNum"];
                eTime .innerText = new Date(parseInt(data["optTime"])).Format("yyyy-MM-dd hh:mm:ss");
                eName .innerText = data["fullName"];
                eIdNo .innerText = data["idCard"];
                ePhone.innerText = data["mobile"];
                if(eTxtOpt.style == null){
                    eTxtOpt.style = new CSSStyleDeclaration();
                }
                if(err === 1){/*失败*/
                    eTxtOpt.innerText = "重新上传";
                    eState.innerText = "已失败";
                    eTxtOpt.style.color = "red";
                }
                else if(err === 2){/*成功*/
                    eState.innerText = "已上传";
                    eTxtOpt.style.color = "green";
                }
                else {/*等待*/
                    eState.innerText = "待上传";
                    eTxtOpt.style.color = "blue";
                }
                eBtnOpt.onclick = function () {
                    if(err === 2) {
                        c4.speak("已上传！");
                        return;
                    }
                    const callback = {
                        onFailure : function (code,msg) {
                            err = 1;
                            eTxtOpt.innerText = "重新上传";
                            eState.innerText = "已失败";
                            eTxtOpt.style.color = "red";
                            c4.speak(msg,false);
                        },
                        onSuccess : function (code,msg,datas) {
                            OfflineSamplingManager.markSamplingResult(data.idType??1,data.idCard,2,{
                                onSuccess:()=>{},
                                onFailure:()=>{}
                            });
                            c4.speak("上传成功！");
                            eState.innerText = "已上传";
                            eTxtOpt.style.color = "green";
                            err = 2;
                        }
                    };
                    c2.samplingRecord(data["testNum"],data,callback,true);
                }
                tbody.appendChild(tr);
            }
        },
        onFailure : function (err){
            c4.speak("查询失败！"+err,true);
        }
    });
};
c4.f1t = async function(){
    OfflineSamplingManager.listAll({
        onSuccess : function (datas) {
            if ((datas?.length??0) === 0) {
                c4.speak("无离线记录！", false);
                return;
            }
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet([]);
            worksheet["!cols"] = [ { wch: 6 },{ wch: 18 },{ wch: 15 },{ wch: 11 },{ wch: 10 },{ wch: 10 }, { wch:10} ];
            const title = ["姓名", "身份号","地址","手机号","试管编号","采样时间","状态"];
            XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
            worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                try{ return { wch:Math.max(width.wch,title[index].length)}; }
                catch(e){ return {wch:10}; }
            });
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            for(let i=0,ni=datas?.length??0; i<ni; ++i) {
                const data    = datas[i];
                let err = data["err"]??0;
                try {err = parseInt(err);} catch (e) {}
                const state   = err===1?"上传失败": err===2?"上传完成":"等待上传";
                const name    = data["fullName"];
                const idNo    = data["idCard"];
                const phone   = data["mobile"];
                const tubNo   = data["testNum"];
                const address = data["address"];
                const time    = new Date(parseInt(data["optTime"])).Format("yyyy-MM-dd hh:mm:ss");
                const rowInfo  = worksheet["!ref"];
                const rowCount = parseInt(rowInfo.substr(rowInfo.search(":")+2))+1;
                const row      = [name, idNo, address, phone, tubNo, time, state];
                worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                    try{return {wch:Math.max(width.wch,row[index].length)};} catch(e){return {wch:10};}
                });
                XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: "A"+rowCount});
            }
            XLSX.writeFile(workbook, "核酸离线采样记录 "+TimeUtils.fE(new Date().getTime())+".xls");
        },
        onFailure:function (err) {
            c4.speak("采样记录查询失败！", false);
        }
    });
};
c4.f1u = async function () {
    if(confirm("确定要删除所有离线记录吗？")){
        OfflineSamplingManager.clearDB({
            onSuccess:function () {
                c4.f2u();
                c4.speak("删除成功！",false);
            },
            onFailure:function (err) {
                c4.speak(err??"删除失败！",false);
            }
        });
    }
};
c4.f1v = async function () {
    OfflineSamplingManager.queryOfflineInfo({
        onSuccess:function (datas){
            const data = (datas??{})[0]??{};
            const tubsCount     = data["tubsCount"]??0;
            const successCount  = data["successCount"]??0;
            const failureCount  = data["failureCount"]??0;
            const samplingCount = data["samplingCount"]??0;
            const allCount      = data["allCount"]??0;
            const percent = samplingCount === 0? 100 : parseInt((successCount*100/(successCount+samplingCount)));
            c4.f1b(percent);
            c4.f1c(percent);
        },
        onFailure:function (err) {}
    });
    OfflineSamplingManager.displayOfflineInfo({
        onSuccess:function (datas) {
            if((datas?.length??0) === 0){
                c4.f13(0);
                c4.f14(0);
                c4.f15(0);
                c4.f16(0);
                return;
            }
            const data = datas[0]??{};
            const restOfTubs  = data["restOfTubs" ]??0;
            const restOfNums  = data["restOfNums" ]??0;
            const failureTubs = data["failureTubs"]??0;
            const failureNums = data["failureNums"]??0;
            c4.f13(restOfTubs);
            c4.f14(restOfNums);
            c4.f15(failureTubs);
            c4.f16(failureNums);
        },
        onFailure:function (err){
            c4.warn("查询展示离线数据失败！"+err);
        }
    });
    const tubNo = c4.f2D() ?? "";
    if(tubNo.trim().length===0){
        c4.f17("无");
        c4.f19(0);
        c4.f18(0);
        c4.f1a(0);
    }
    else{
        c4.f17(tubNo);
        OfflineSamplingManager.displayTubNoInfo(tubNo,{
            onSuccess:(datas)=>{
                const data = datas[0]??{};
                const successCount  = data["successCount" ]??0;
                const failureCount  = data["failureCount" ]??0;
                const samplingCount = data["samplingCount"]??0;
                c4.f19(failureCount);
                c4.f18(successCount);
                c4.f1a(samplingCount);
            },
            onFailure:(err)=>{
                c4.warn("查询展示离线试管数据失败！"+err)
            }
        });
    }
};
c4.f1z = function () {
    c4.f12(c4.f1y());
};
c4.f1C = async function(){
    const ping = c2.fb();
    let shown = ping < 1 ? "?" : parseInt(ping);
    let color = "black";
    let status = "";
    if(ping<1){
        status = "未知";
        color = "red";
    }
    else if(ping<100){
        status = "顺畅";
        color = "#00e676";
    }
    else if(ping<300){
        status = "正常";
        color = "#76ff03";
    }
    else if(ping<800){
        status = "繁忙";
        color = "#FF6634";
    }
    else if(ping<1500){
        status = "拥堵";
        color = "#e53935";
    }
    else if(ping>50000){
        status = "断开";
        color  = "purple";
    }
    else{
        status = "阻塞";
        color = "red";
    }
    if(c6.isBreakLineMode()){
        const msg = c6.getBreakLineLoginData().msg;
        if((msg?.trim()?.length??0) > 0)
            status = status + " " + msg;
    }
    c4.f1e(shown);
    c4.f1f(status,color);
};
c4.f1D = async function(){
    const now = new Date().getTime();
    const lastUpdate = c4.f1D.lLastUpdateTimestamp ?? 0;
    if(now - lastUpdate<5000) return;
    c4.f1D.lLastUpdateTimestamp = now;
    const isCameraOpen   = CameraUtils.isCameraOpen(c4.f2j());
    const f1O = c4.f1O();
    if(c6.vI){
        if(c6.vL){
            const req = c4.f1D.lLastRequestOCRStateTimestamp??0;
            if(now - req > 30000){
                c4.f1D.lLastRequestOCRStateTimestamp = now;
                OCRUtils.fN({
                    onSuccess: function () {
                        c4.f1i(isCameraOpen);
                    },
                    onFailure: function () {
                        c4.f1i(false);
                    }
                });
            }
        }
        if(!isCameraOpen){
            await CameraUtils.openCamera(c4.f2j(),c4.f2k(),false);
        }
    }
    else{
        if(isCameraOpen){
            CameraUtils.closeCamera(c4.f2j());
        }
        c4.f1i(false);
    }
    let shouldCameraOpen =
        c6.vI
        && f1O
        && !c4.f1A()
        && c6.isCameraVisible();
    if(c6.isBreakLineMode()){
        const display      = document.getElementById("idOfBreakLineLogin")?.style?.display??null;
        const isShownLogin = !(display === "none");
        shouldCameraOpen = shouldCameraOpen && !isShownLogin;
    }
    c4.f1j (isCameraOpen && c6.vK);
    c4.f2h(shouldCameraOpen);
};
c4.f1A = function () {
    return !FunctionUtils.isNull(document.getElementById("idOfLocalSamplingDialog"))
        || !FunctionUtils.isNull(document.getElementById("idOfOfflineSamplingDialog"));
};
c4.f1B = async function () {
    const sTubs    = new Set();
    const mRecords = new Map();
    const addDatas = function (datas) {
        for(let i=0,ni=datas?.length??0;i<ni;++i){
            const data = datas[i];
            const tubNo  = data["testNum"]??data["tubNo"]??"";
            sTubs.add(tubNo.toString());
            const idType = (data["idType"]??"").toString();
            const idCard = data["idCard"]??data["idNo"]??"";
            const sTypes = mRecords[idType];
            if(FunctionUtils.isNull(sTypes)){
                mRecords[idType] = new Set([idCard.toString()]);
            }
            else{
                sTypes.add(idCard.toString());
            }
        }
    };
    LocalSamplingRecordManager.listAll({
        onSuccess:(datas)=>{
            addDatas(datas);
            OfflineSamplingManager.listAll({
                onSuccess:(datas)=>{
                    addDatas(datas);
                    let numCount = 0;
                    Object.keys(mRecords).forEach(value => {
                        numCount += mRecords[value]?.size ?? 0;
                    });
                    c4.f1g(sTubs.size);
                    c4.f1h(numCount);
                },
                onFailure:(err)=>{}
            });
        },
        onFailure:(err)=>{}
    });
};
c4.f1E = async function(){
    if(!c4.f1O()) return;
    const tables = document.getElementsByClassName("el-table__body");
    if(FunctionUtils.isNull(tables) || tables.length<1) return;
    const tbody = tables[0].lastElementChild;
    const addRecord = function (name,phone,idNo) {
        const tr = document.createElement("tr");
        tr.style = "width:100%;display:table;";
        const td1 = document.createElement("td");
        td1.rowSpan = 1;
        td1.colSpan = 1;
        td1.style = "width:15%";
        td1.className = "el-table_5_column_46  ";
        const div1 = document.createElement("div");
        div1.className = "cell";
        div1.innerText = name;
        td1.appendChild(div1);
        tr.appendChild(td1);
        const td2 = document.createElement("td");
        td2.rowSpan = 1;
        td2.colSpan = 1;
        td2.style = "width:25%";
        td2.className = "el-table_5_column_47  ";
        const div2 = document.createElement("div");
        div2.className = "cell";
        div2.innerText = phone;
        td2.appendChild(div2);
        tr.appendChild(td2);
        const td3 = document.createElement("td");
        td3.rowSpan = 1;
        td3.colSpan = 1;
        td3.style = "width:60%";
        td3.className = "el-table_5_column_48 is-center ";
        const div3 = document.createElement("div");
        div3.className = "cell";
        div3.innerText = idNo;
        td3.appendChild(div3);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    };
    new Promise(async (resolve, reject) => {
        let tubNo = c4.fZ();
        for(let i=0;i<5&&(tubNo?.trim()?.length??0)<1;++i){
            await FunctionUtils.sleep(50);
            tubNo = c4.fZ();
        }
        if((tubNo?.trim()?.length??0)<1){
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
        }
        LocalSamplingRecordManager.getTubInfo(tubNo,{
            onSuccess : function (datas) {
                addItems(datas);
                OfflineSamplingManager.listOffline(tubNo,{
                    onSuccess:function (datas) {
                        addItems(datas);
                        if(items.length>0){
                            resolve(
                                items.sort((o1, o2) => {
                                    let a = isNaN(o1.timestamp) ? 0 : o1.timestamp;
                                    let b = isNaN(o2.timestamp) ? 0 : o2.timestamp;
                                    return a < b ? 1 : (a===b? 0 : -1);
                                })
                            );
                        }
                        else{
                            if(c6.f1y()){
                                resolve([]);
                                return;
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
    })
        .then((datas)=>{
            let tbodyCount = tbody.childElementCount??0;
            let dataCount  = datas?.length??0;
            let isSame = false;
            if(tbodyCount === dataCount){
                isSame = true;
                for(let i=0,ni=dataCount;i<ni;++i){
                    const idNo = tbody.children[i].getElementsByTagName("div")[2].innerText;
                    if(idNo === datas[i]["idCard"]) continue;
                    isSame = false;
                    break;
                }
            }
            if(isSame) return;
            while(tbody.childElementCount>0){
                tbody.removeChild(tbody.firstElementChild);
            }
            for(let i=0,ni=datas.length;i<ni;++i){
                const data = datas[i];
                addRecord(data["fullName"],data["mobile"],data["idCard"]);
            }
            c4.f2n(datas.length);
        })
        .catch(err=>{});
};
c4.f2u = async function(){
    let lLastChangedTime = this.lLastChangedTime ?? 0;
    let now = new Date().getTime();
    if (now - lLastChangedTime < 3000) return;
    this.lLastChangedTime = now;
    try {
        if(!c4.f1O()) return;
        if(c6.isBreakLineMode()){
            c4.f1E();
        }
        c4.f1d();
        c4.f1r();
        c4.f1p();
        c4.f1z();
        c4.f1v();
        c4.f1C();
        c4.f1B();
        c4.f1D();
    } finally {
        setTimeout(()=>c4.f2u(),3100);
    }
};
c4.f2u();

/**
 * 核酸采集页面控制器
 *
 * 负责核酸功能的耦合，核酸页面的整体控制
 */
class c5{
    /* 根据配置获取相应控件 */
    static f1I (index) {
        const configs = c6.isBreakLineMode()?
                        c6.vr:
                        c6.vG;
        if((configs?.length??0)<=index) return null;
        return DOMUtils.getEleByConfig(configs[index])
    }
/********************************************************* 页面配置 *************************************************************/
    /*主页*/
    static f1J   (){ return "https://hsjc.qingdao.gov.cn" }
    /*登录页面*/
    static f1K   (){ return "https://hsjc.qingdao.gov.cn/#/login" }
    /*采样页面*/
    static f1L(){ return "https://hsjc.qingdao.gov.cn/#/check/scancheck" }
    /*历史记录页面*/
    static f1M (){ return "https://hsjc.qingdao.gov.cn/#/check/record" }
    /*转运页面*/
    static f1N(){ return "https://hsjc.qingdao.gov.cn/#/check/transshipment" }
    /* 判断是否是采样页面 */
    static f1O(){}
/*********************************************************** DOM元素获取 ***********************************************************/
    /*试管容量*/
    static f1P         (){ return c5.f1I(0 ); }
    /*试管编号*/
    static f1Q          (){ return c5.f1I(1 ); }
    /*居民码*/
    static f1R           (){ return c5.f1I(2 ); }
    /*证件类型*/
    static f1S           (){ return c5.f1I(3 ); }
    /*证件号*/
    static f1T             (){ return c5.f1I(4 ); }
    /*证件读取按钮*/
    static f1U           (){ return c5.f1I(5 ); }
    /*姓名*/
    static f1V             (){ return c5.f1I(6 ); }
    /*手机号码*/
    static f1W            (){ return c5.f1I(7 ); }
    /*镇*/
    static f1X             (){ return c5.f1I(8 ); }
    /*村*/
    static f1Y          (){ return c5.f1I(9 ); }
    /*小区*/
    static f1Z        (){ return c5.f1I(10); }
    /*人员类别*/
    static f20       (){ return c5.f1I(11); }
    /*采样点*/
    static f21     (){ return c5.f1I(12); }
    /*采样时间*/
    static f22     (){ return c5.f1I(13); }
    /*同试管已采样人数*/
    static f23    (){ return c5.f1I(14); }
    /*住址*/
    static f24          (){ return c5.f1I(15); }
    /*附加说明*/
    static f25             (){ return c5.f1I(16); }
    /*确认采样按钮*/
    static f26  (){ return c5.f1I(17); }
    /*重置采样按钮*/
    static f27    (){ return c5.f1I(18); }
    /*条码警告弹窗确认按钮*/
    static f28      (){ return c5.f1I(19); }
    /*试管采样已满确认按钮*/
    static f29      (){ return c5.f1I(20); }
    /*读卡警告吐司列表*/
    static f2a (){ return c5.f1I(21); }
/*********************************************************** DOM元素操作 ***********************************************************/
    /*提交采样*/
    static f3u    (){ DOMUtils.click(c5.f26()) }
    /*移除条码长度过长警告*/
    static f2I (){ DOMUtils.click(c5.f28()) }
    /*移除读卡失败警告*/
    static async f2J  (){ DOMUtils.remove(c5.f2a()) }
    /*移除采样满弹窗*/
    static f2K  (){ DOMUtils.click(c5.f29()) }
    /*插件控制面板DOM*/
    static f2f   (){}
    /*摄像头相关DOM*/
    static f2g    (){}
    /* 显示或隐藏相机 */
    static f2h(visible){}
    /* 摄像头整个组件包括canvas */
    static f2i  (){ return document.getElementById("idOfHscjCameraPanel"); }
    /*摄像头播放流Video*/
    static f2j    (){ return document.getElementById("hscj_camera_video"); }
    /*摄像头流画布Canvas*/
    static f2k    (){ return document.getElementById("hscj_camera_canvas"); }
    /*试管人数水印DOM*/
    static f2l  (){ }
    /*试管人数水印*/
    static f2m  (){ return document.getElementById("idOfBarcodeNumbersOfSampling"); }
    /*设置水印试管人数*/
    static f2n(num){ DOMUtils.innerHTML(c5.f2m(),num); }
    /* 清空证件号的按钮 */
    static f2o(){}
    /* 清空证件号的按钮 */
    static f2p(){ return document.getElementById("idOfClearInputIdCard");}
    /* 查询历史记录页面自动选择查询日期 */
    static f2q  (){}
    /* 自动加载控制面板UI */
    static f2r(){}
/*********************************************************** 功能性操作 ***********************************************************/
    /*刷新设置参数*/
    static f2s(){ c6.restore_options() }
    
    /* Api消息 */
    static f3V(message){}
    /*数据改动回调*/
    static f2u(){}
}
c5.tag = "PageManager";
c5.Message = c8.Message;
c5.f2l = function (){
    return DOMUtils.createSingleEleByString(`
        <div id="idOfHscjTubCountMask" style="pointer-events: none; color: rgb(255, 0, 0); text-align: center; display: table; opacity: 0.3; position: absolute; left: 25%; top: 20%; overflow: hidden; z-index: 9999;width:100%;height:100%;">
            <span id="idOfBarcodeNumbersOfSampling" style="font-weight: bold; font-size: 250px;color:#FF1744">
            </span>
        </div>
    `);
};
c5.f2o = function (){
    return DOMUtils.createSingleEleByString(`
        <div style = "width:calc(100% - 80px);padding-right: 26px;position:absolute;top:2px;left:0;">
            <img id="idOfClearInputIdCard" style="max-height: 25px;max-width: 25px;margin-left: 100%;opacity: 0.6" src="data:image/png;base64,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" title="清空证件号"/>
        </div>
    `);
};
c5.f2g = function () {
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
c5.f2q = function () {
    /*模拟选择今日的采样*/
    new Promise(async (resolve) => {
        try {
            let inputs = null;
            while (true) {
                await FunctionUtils.sleep(c6.vE);
                if (!document.URL.endsWith("/check/record")) continue;
                inputs = document.getElementsByClassName("el-range-input");
                if (inputs === null) continue;
                if (inputs[0] === undefined) continue;
                if (inputs[1] === undefined) continue;
                break;
            }
            const startDate = inputs[0];
            /*const endDate = inputs[1];*/
            DOMUtils.click(startDate);
            let dateTables = null;
            while (true) {
                await FunctionUtils.sleep(c6.vE);
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
            const rowsLeft = dateTables[0].firstElementChild.getElementsByClassName("el-date-table__row");
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
                            await FunctionUtils.sleep(c6.vE);
                        }
                    }
                }
            }
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
                            await FunctionUtils.sleep(c6.vE);
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
                            await FunctionUtils.sleep(c6.vE);
                        }
                    }
                }
            }
            const clickBtn = document.getElementsByClassName("el-button el-picker-panel__link-btn el-button--default el-button--mini is-plain")[0];
            DOMUtils.click(clickBtn);
        } catch (e) {
        }finally {
            resolve();
        }
    })
        .then(()=>{});
};
c5.f2r = async function () {
    while (true) {
        await FunctionUtils.sleep(c6.vE??500);
        if (!c8.f1O()) continue;
        if(!FunctionUtils.isNull(c5.f2p())) {
            return;
        }
        const lstFooter = document.body.getElementsByClassName("dialogList");
        if (lstFooter?.length === 0 || lstFooter[0].appendChild === null) continue;
        break;
    }
    const lstFooter = document.body.getElementsByClassName("dialogList");
    if(lstFooter?.length===0 || lstFooter[0].appendChild === null) return;
    /* 添加摄像头 */
    if(document.getElementById("hscj_camera_video") == null){
        const cameraEle = c5.f2g();
        document.body.appendChild(cameraEle);
    }
    setTimeout(()=>{
        if(c6.vI){
            c5.f2h(c5.f1O()&&c6.isCameraVisible());
            CameraUtils.openCamera(c5.f2j(),c5.f2k());
        }
        else{
            CameraUtils.closeCamera(c5.f2j());
            c5.f2h(false);
        }
    },1000);
    /* 添加控制面板 */
    if(document.getElementById("idOfHscjControlPanelParent") === null){
        const controlEle = c5.f2f();
        lstFooter[0].appendChild(controlEle);
        document.getElementsByClassName("dialog-footer")[0].style="position:relative;top:-270px;";
    }
    /*添加试管人数水印*/
    if(document.getElementById("idOfHscjTubCountMask") === null) {
        const tubCountEle = c5.f2l();
        lstFooter[0].appendChild(tubCountEle);
    }
    if(c6.isBreakLineMode() === true){
        c5.f2f();
        const ePanelLogin   = document.getElementById("idOfLoginButton");
        const eLoginAccount = document.getElementById("idOfLoginAccount");
        eLoginAccount.style.display = FunctionUtils.isNull(c6.getBreakLineLoginData()?.username) ? "none" : null;
        const eAccountName  = eLoginAccount.getElementsByTagName("span")[0];
        eAccountName.innerText = c6.getBreakLineLoginData()?.username??"";
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
            MessageManager.f3Q.speak("请确保账号及密码正确，登录结果请随时参见控制面板！");
            const username = eUserName.value;
            const password = ePassword.value;
            const breakLineLoginData = {
                username,
                password,
                isLogin: false,
                msg:"自动登录中"
            };
            c6.setBreakLineLoginData(breakLineLoginData);
            eLogin.style.display = "none";
            eAccountName.innerText = breakLineLoginData?.username??"";
            eLoginAccount.style.display = FunctionUtils.isNull(breakLineLoginData?.username) ? "none" : null;
        };
        ePanelLogin.onclick = function () {
            eLogin.style.display = null;
        };
        const eBar       = c5.f1Q();
        const ePeople    = c5.f1R();
        const eIdType    = c5.f1S();
        const eRead      = c5.f1U();
        const eIdNo      = c5.f1T();
        const eName      = c5.f1V();
        const ePhone     = c5.f1W();
        const confirmEle = c5.f26();
        const resetEle   = c5.f27();
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
                c2.tubInfo(barcode,{
                    onSuccess:(code,msg,datas ) =>{},
                    onFailure:(code,msg,status) =>{}
                });
                return;
            }
            if(TYPE_PEOPLE_ID === type){
                const code = DOMUtils.read(ePeople);
                if((code?.trim()?.length??0)===0) return;
                c2.healthyQrCodeInfo(code,{
                    onSuccess:(code,msg,datas)=>{},
                    onFailure:(code,msg,status)=>{}
                });
                return;
            }
            if(TYPE_ID_NO === type){
                const id = DOMUtils.read(eIdNo);
                if((id?.trim()?.length??0)===0) return;
                c2.cardNoInfo(id,{
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
                MessageManager.f3Q.speak("请输入条码！",false);
                eBar.focus();
                return;
            }
            const id      = DOMUtils.read(eIdNo);
            if((id?.trim()?.length??0) === 0){
                MessageManager.f3Q.speak("请输入证件号！",false);
                eIdNo.focus();
                return;
            }
            const name    = DOMUtils.read(eName);
            if((name?.trim()?.length??0) === 0){
                MessageManager.f3Q.speak("请输入姓名！",false);
                eName.focus();
                return;
            }
            const phone   = DOMUtils.read(ePhone);
            if((phone?.trim()?.length??0) === 0){
                MessageManager.f3Q.speak("请输入手机号！",false);
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
                    c8.f3G(commitData,0,"操作成功",{testNum:barcode,capacity:"20"})
                },
                onFailure:(e)=>{
                    commitData.code = -1;
                    commitData.msg  = "离线采样失败！"+e;
                    c8.f3G(commitData,-1,"离线采样失败",null);
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
    if(FunctionUtils.isNull(c5.f2p())){
        const clearIdCardButtonEle = c5.f2o();
        const eIdNo = c5.f1T();
        eIdNo.parentNode.appendChild(clearIdCardButtonEle);
        clearIdCardButtonEle.onclick = ()=>{
            const eIdNo = c5.f1T();
            eIdNo.value = "";
            DOMUtils.focus(eIdNo);
            DOMUtils.deleteHSCJ(eIdNo);
        }
    }
    /*
    const eBarcode = c5.f1Q();
    if(!FunctionUtils.isNull(eBarcode)){
        if(FunctionUtils.isNull(eBarcode.style)) eBarcode.style = new CSSStyleDeclaration();
        eBarcode.style["ime-mode"] = "active";
    }
    const eIdNo    = c5.f1T();
    if(!FunctionUtils.isNull(eIdNo)){
        if(FunctionUtils.isNull(eIdNo.style)) eIdNo.style = new CSSStyleDeclaration();
        eIdNo.style["ime-mode"] = "active";
    }
    const ePeople = c5.f1R();
    if(!FunctionUtils.isNull(ePeople)){
        if(FunctionUtils.isNull(ePeople.style)) ePeople.style = new CSSStyleDeclaration();
        ePeople.style["ime-mode"] = "active";
    }
    */
};
c5.f2f    = c4.fT;
c5.f2u    = c4.f2u;
c5.f2h = c4.f2h;
c5.f1O   = function () { return c6.isBreakLineMode() === true || DOMUtils.isUrl(c5.f1L()); }
c5.f3V = async function (message) {
    const type = message.type;
    if(await c8.f3V(message)) return true;
    if(type === "m2"){
        let username = message.username;
        if((username?.trim()?.length??0) > 0){
            username = CryptUtils.fz(username);
        }
        let password = message.password;
        if((password?.trim()?.length??0) > 0){
            password = CryptUtils.fz(password);
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
            c6.setBreakLineMode(true);
            c6.setBreakLineLoginData({
                username,
                password,
                isLogin:false,
                msg:"未登录"
            });
            if(!((username?.trim()?.length??0) > 0 && (password?.trim()?.length??0) > 0)){
                const eLoginPanel = document.getElementById("idOfBreakLineLogin");
                eLoginPanel.style.display = null;
                c6.getBreakLineLoginData().msg = "自动登陆中";
            }
            c5.f2r();
        });
        return true;
    }
    if(type === "autoAddComponent"){
        c5.f2r();
        return true;
    }
    if(type === "f2u"){
        c5.f2u();
        return true;
    }
    if(type === "jumpHistQuery"){
        c5.f2q();
        return true;
    }
};
/* 注意：所有的函数关联在此脚本里指定 */
c8.f1P          = c5.f1P         ;
c8.f1Q           = c5.f1Q          ;
c8.f1R            = c5.f1R           ;
c8.f1S            = c5.f1S           ;
c8.f1T              = c5.f1T             ;
c8.f1U            = c5.f1U           ;
c8.f1V              = c5.f1V             ;
c8.f1W             = c5.f1W            ;
c8.f1X              = c5.f1X             ;
c8.f1Y           = c5.f1Y          ;
c8.f1Z         = c5.f1Z        ;
c8.f20        = c5.f20       ;
c8.f21      = c5.f21     ;
c8.f22      = c5.f22     ;
c8.f23     = c5.f23    ;
c8.f24           = c5.f24          ;
c8.f25              = c5.f25             ;
c8.f2I = c5.f2I;
c8.f2J  = c5.f2J ;
c8.f2K  = c5.f2K ;
c8.f3u    = c5.f3u         ;
c8.f2H          = function () { DOMUtils.click(c5.f27()); }
c8.f1O          = c5.f1O         ;
c8.f3b    = c4.fX       ;
c8.f2n      = c5.f2n            ;
c8.f1L         = c5.f1L        ;
c7.f2B  = c4.f12      ;
c7.f2u          = c4.f2u             ;
c7.f1L        = c5.f1L()      ;
c4.f2i     = c5.f2i  ;
c4.f2j       = c5.f2j    ;
c4.f2k       = c5.f2k    ;
c4.f1O     = c5.f1O  ;
c4.f3c    = c8   .f3c ;
c4.f1y      = c7  .f2A ;
c4.f2n = c5.f2n     ;
c4.f1d         = c2.fc;
c4.f2D = c7.f2D;
c4.f2C = c7.f2C;
c4.f1G  = function () { c8.f3a(!c4.f3c()); }
c4.f1H = function () { c7.f2z(!c7.f2A()); }
c4.fZ       = function () { return DOMUtils.read(c5.f1Q()); }
OCRUtils.f3w        = c8.f3w;
QRCodeUtils.f3x  = c8.f3x;
QRCodeUtils.f3y = c8.f3y;
DeviceManager.f3v    = c8.f3v;

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
 * 网络接口拦截content实现
 */
c1.debug = function (msg) {
    LogUtils.log(msg,"Content.c1");
};
c1.f1       = async function (message){
    const type   = message.type;
    if(type !== c1.Message.onApiIntercepted.key) return false;
    const method      = message[c1.Message.onApiIntercepted.params.method];
    const requestInfo = message[c1.Message.onApiIntercepted.params.requestInfo];
    const requestId   = message[c1.Message.onApiIntercepted.params.requestId];
    const params      = { requestInfo:requestInfo };
    return await new Promise((resolve, reject) => {
        switch (method){
            case c1.Message.onApiIntercepted.methods.f7:
                c1.f7(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f3:
                c1.f3(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f5:
                c1.f5(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f4:
                c1.f4(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f6:
                c1.f6(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f8:
                c1.f8(resolve, reject,params);
                return true;
            case c1.Message.onApiIntercepted.methods.f9:
                c1.f9(resolve, reject,params);
                return true;
            default:
                return false;
        }
    })
        .then((data)=>{
            MessageManager.f3H({
                type: c1.Message.onApiInterceptCallback.key,
                requestId:requestId,
                result:true,
                data:data,
            });
        })
        .catch((err)=>{
            MessageManager.f3H({
                type: c1.Message.onApiInterceptCallback.key,
                requestId:requestId,
                result:false,
                data:err,
            });
        });
}
c1.f3         = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const tubNo       = requestInfo["tubeNum"];
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
                        if(c6.f1y()){
                            if(!c2.isLogin() || c2.fb()>2000){
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
c1.f4        = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const idCard  = requestInfo["idCard"];
    const idType  = requestInfo["idType"] ?? 1;
    LocalUserInfoManager.queryUser(idType,idCard,{
        onSuccess : function (datas){
            if(FunctionUtils.isNull(datas)) {
                if(c6.f1y()){
                    if(!c2.isLogin() || c2.fb()>2000){
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
            reject(err);
        }
    });
};
c1.f5    = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    let healthCode = requestInfo["healthCode"];
    if((healthCode?.length??0) === 0) {
        reject();
        return;
    }
    LocalUserInfoManager.queryUserByHealthyCode(healthCode, {
        onSuccess : function (datas){
            const data = (datas??{})[0];
            if(FunctionUtils.isNull(data)) {
                reject();
                return;
            }
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
            reject(err);
        }
    });
};
c1.f6 = function (resolve, reject, params){
    if(c1.f6.getTestSiteName === undefined){
        c1.f6.getTestSiteName = function (){
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
    LocalSamplingRecordManager.queryUser(idType,idCard,{
        onSuccess: function (datas){
            if((datas?.length??0) > 0){
                resolve(
                    {
                        "code":-1,
                        "msg":"该人员已经在" + c1.f6.getTestSiteName() + "检测过,处于检测未完成状态",
                        "data":null
                    }
                );
                return;
            }
            OfflineSamplingManager.queryUserRecord(idType,idCard,{
                onSuccess: function (datas) {
                    if((datas?.length??0) > 0){
                        const data = datas[0];
                        const err  = data["err"]??0;
                        const state = err===1?"上传失败": err===2?"上传完成":"等待上传";
                        resolve(
                            {
                                "code":-1,
                                "msg":"该人员已经在" + c1.f6.getTestSiteName() + "检测过,处于离线"+ state +"状态",
                                "data":null
                            }
                        );
                        return;
                    }
                    if(c6.f1y()){
                        OfflineSamplingManager.addOfflineRecord(params.requestInfo,{
                            onSuccess: function () {
                                resolve(
                                    {
                                        code:0,
                                        msg:"操作成功",
                                        data:{testNum:tubNo,capacity:"20"}
                                    }
                                );
                            },
                            onFailure:function (err){
                                reject(err);
                            }
                        });
                        return;
                    }
                    reject();
                },
                onFailure: function (err){
                    reject(err);
                }
            });
        },
        onFailure: function (err){
            reject(err);
        }
    });
};
c1.f7        = function (resolve, reject, params){
    const requestInfo = params.requestInfo;
    const id   = requestInfo["parentId"];
    const result = LocalGridManager.query(id);
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
c1.f8      = function (resolve, reject, params){
    const devInfo = c6.getOfflineDevice();
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
c1.f9 = function (resolve, reject, params){
    const callback = {
        onSuccess:()=>{
            if(callback.process === true) return;
            callback.process = true;
            reject();
        },
        onFailure:()=>{
            if(callback.process === true) return;
            callback.process = true;
            MessageManager.f3H({type:"m2"});
            setTimeout(()=>resolve(`等待离线采样页面加载完毕...`),1000);
        }
    };
    c2.fc((result)=>{
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
    LogUtils.log(msg,"Content.c3");
};
c3.fg          = async function (message) {
    const type       = message.type;
    if(type !== c3.Message.onApiReceived.key) return false;
    const method     = message.method;
    let requestInfo  = message.requestInfo;
    let responseInfo = message.responseInfo;
    const requestId    = responseInfo.pluginRequestId;
    if(!FunctionUtils.isNull(requestId)){
        while(true){
            const apiInfo = c2.ff(requestId);
            if(!FunctionUtils.isNull(apiInfo)){
                let reqInfo = apiInfo.requestInfo;
                let resInfo = apiInfo.responseInfo;
                if(!FunctionUtils.isNull(reqInfo) && !FunctionUtils.isNull(resInfo)){
                    requestInfo  = reqInfo;
                    responseInfo = resInfo;
                    try {responseInfo = JSON.parseBody(resInfo);} catch (e) {}
                    break;
                }
            }
            await FunctionUtils.sleep(10);
        }
    }
    switch (method) {
        case c3.Message.onApiReceived.methods.fh:
            c3.fh(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fi:
            c3.fi(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fj:
            c3.fj(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fk:
            c3.fk(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fl:
            c3.fl(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fm:
            c3.fm(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fn:
            c3.fn(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fo:
            c3.fo(requestInfo,responseInfo);
            return true;
        case c3.Message.onApiReceived.methods.fp:
            c3.fp(requestInfo,responseInfo);
            return true;
        default:
            return false;
    }
}
c3.fh          = function (requestInfo, responseInfo){
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    const status= responseInfo.status;
    if(code===0 && datas !== null){
        setTimeout(()=>document.location = c5.f1L(), c6.vE);
    }
    else{
        /* {"code":-1,"msg":"用户名或密码错误","data":null} */
    }
};
c3.fi     = function (requestInfo, responseInfo){
    c5.f3V({
        type:c5.Message.types.f3D,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });
};
c3.fj  = function (requestInfo, responseInfo){
    try {responseInfo.datas.result[0].idCard = responseInfo.datas.result[0].idCard.toUpperCase();} catch (e) {}
    try {requestInfo.idCard = requestInfo.idCard.toUpperCase();} catch (e) {}
    c5.f3V({
        type:c5.Message.types.f3E,
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
            LocalUserInfoManager.autoAddUser(item,{
                onSuccess : ()=>{
                },
                onFailure : (err)=>{
                }
            });
        }
    }
};
c3.fk    = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        const parentId = requestInfo["parentId"];
        LocalGridManager.autoAdd(parentId,datas);
    }
};
c3.fl = function (requestInfo, responseInfo){
    try {responseInfo.datas.idCard = responseInfo.datas.idCard.toUpperCase();} catch (e) {}
    c5.f3V({
        type:c5.Message.types.f3G,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(!FunctionUtils.isNull(datas?.value) && Object.keys(requestInfo??{}).length>0){
        const data = requestInfo;
        LocalSamplingRecordManager.addRecord(data,{
            onSuccess : ()=>{
            },
            onFailure : (err)=>{
            }
        });
        OfflineSamplingManager.markSamplingResult(data.idType??1,data.idCard,2,{
            onSuccess:()=>{
            },
            onFailure:(err)=>{
            }
        });
    }
};
c3.fm   = function (requestInfo, responseInfo){
    try {responseInfo.datas.idCard = responseInfo.datas.idCard.toUpperCase();} catch (e) {}
    c5.f3V({
        type:c5.Message.types.f3F,
        requestInfo:requestInfo,
        responseInfo:responseInfo
    });
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    const healthCode = requestInfo["healthCode"];
    if(code !== 0) return;
    LocalUserInfoManager.autoAddUser(datas,{
        onSuccess : ()=>{
            LocalUserInfoManager.updateHealthyCode("1",datas.idCard,healthCode,{
                onSuccess : ()=>{
                },
                onFailure : (err)=>{
                }
            });
        },
        onFailure : (err)=>{
        }
    });
};
c3.fn = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        const ids = requestInfo["ids"];
        const delLocal = ()=>{
            LocalSamplingRecordManager.delRecordByIds(ids,{
                onSuccess : ()=>{
                },
                onFailure : (err)=>{
                }
            });
        };
        LocalSamplingRecordManager.queryUserByDeleteIds(ids,{
            onSuccess : (datas)=>{
                if(FunctionUtils.isNull(datas) || datas.length === 0){
                    delLocal();
                    return;
                }
                const data = datas[0];
                delLocal();
                OfflineSamplingManager.delOfflineRecord(data.idType??1,data.idNo??data.idCard??"",{
                    onSuccess : ()=>{
                    },
                    onFailure : (err)=>{
                    }
                });
            },
            onFailure : (err)=>{
                delLocal();
            }
        });
    }
};
c3.fo   = function (requestInfo, responseInfo){
    if(responseInfo.cached) return;
    const code  = responseInfo.code;
    const msg   = responseInfo.msg;
    const datas = responseInfo.datas;
    if(code === 0){
        for(let i=0,ni=datas?.result?.length??0;i<ni;++i){
            const item = datas.result[i];
            const deleteId = item.id;
            const peopleId = item.peopleId;
            LocalUserInfoManager.queryUserById(peopleId,{
                onSuccess:(data)=>{
                    LocalSamplingRecordManager.updateDelFlag("1",data.idCard,deleteId,{
                        onSuccess:(data)=> {
                        },
                        onFailure:(err)=>{
                        }
                    });
                },
                onFailure:(err)=>{
                }
            });
        }
    }
};
c3.fp = function (requestInfo, responseInfo) {
    if (responseInfo.cached) return;
    const code = responseInfo.code;
    const msg = responseInfo.msg;
    const datas = responseInfo.datas;
    if (code === 0 && datas !== null && datas !== undefined) {
        c6.setOfflineDevice(datas);
        MessageManager.f3Q.f3X();
    }
}

const tag = "Content";
const env = "Content";
const interceptLog  = console.log;
const interceptWarn = console.warn;
chrome.runtime.onMessage.addListener(async (request, sender, senderResponse) => {
    /*LogUtils.log(JSON.stringify(request),tag);/**/
    c5.f2u();
    if(await c5.f3V(request)) return true;
    if(await c3.fg(request)) return true;
    if(await c1.f1(request)) return true;
    if(await c6.f3W(request)) return true;
    if(request.type === "speak"){
        MessageManager.f3Q.speak(request.msg.msg,request.msg.enqueue);
        return true;
    }
    if(request.type === "fa"){
        c2.fa(request.timestamp,request.interval);
        return true;
    }
    if(request.type === "m1"){
        DOMUtils.clearAllCookie();
        await setTimeout(()=> document.location = c5.f1K(),c6.vE??500);
        return true;
    }
    if(request.type === "console.log"){
        LogUtils.log(request.msg);
        return true;
    }
    if(request.type === "console.warn"){
        LogUtils.warn(request.msg);
        return true;
    }
	return true;
});
document.addEventListener('visibilitychange',function(){
    c6.restore_options();
});
MessageManager.f3H({type:"m3"});

