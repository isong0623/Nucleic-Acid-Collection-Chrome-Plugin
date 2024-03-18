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