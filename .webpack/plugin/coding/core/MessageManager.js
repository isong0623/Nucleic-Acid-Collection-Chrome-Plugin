class MessageManager{
    static sendMessageFromContentToBackground(msg){
        try{chrome?.runtime?.sendMessage(msg);}catch (e) {}
    }

    static sendMessageFromContentToDev = MessageManager.sendMessageFromContentToBackground;

    static sendMessageFromContentToOptions = MessageManager.sendMessageFromContentToBackground;

    static sendMessageFromOptionsToBackground = MessageManager.sendMessageFromContentToBackground;

    /*不确定 目前也用不到 90%应该是*/
    static sendMessageFromDevToBackground = MessageManager.sendMessageFromContentToBackground;

    static sendMessageFromBackgroundToContent(msg){
        if(MessageManager.Background.attachedTab===null || MessageManager.Background.attachedTab === undefined) return;
        try {chrome?.tabs?.sendMessage(MessageManager.Background.attachedTab.tabId, msg);} catch (e) {}
    }

    static sendMessageFromOptionsToContent(msg){
        MessageManager.sendMessageFromOptionsToBackground({type:"sendMessageToContent",msg:msg});
    };

    static sendMessageFromDevToContent(msg){
        MessageManager.sendMessageFromDevToBackground({type:"sendMessageToContent",msg:msg});
    };
}

/* 包含在background里执行的消息 */
MessageManager.Background = {
    speak: function (msg,enqueue,rate,pitch) {
        HSCJTTSEngine.speak(msg,enqueue,rate,pitch);
    },
    speakDelay:function (msg,enqueue=true,delay=0) {
        setTimeout(()=>MessageManager.Background.speak(msg,enqueue),delay);
    },
    speakInCommand: function (msg,enqueue) {
        MessageManager.sendMessageFromBackgroundToContent({type:"speak",msg:{msg:msg,enqueue:enqueue}});
    },
    onDataChanged: function (){
        MessageManager.sendMessageFromBackgroundToContent({type:"onDataChanged"});
    },
    attachedTab:null,
};

/* 包含在content里执行的消息 */
MessageManager.Content = {
    speak: function (msg,enqueue=true,rate,pitch) {
        MessageManager.sendMessageFromContentToBackground({type:enqueue===true?"speak":"speak2", msg:msg,rate,pitch});
    },
    playErrorMusic:()=>{
        MessageManager.sendMessageFromContentToBackground({type:"playErrorMusic"});
    },
    playConfirmMusic:()=>{
        MessageManager.sendMessageFromContentToBackground({type:"playConfirmMusic"});
    },
    playScanMusic:()=>{
        MessageManager.sendMessageFromContentToBackground({type:"playScanMusic"});
    },
    sendDeviceInfoToOptions:()=>{
        MessageManager.sendMessageFromContentToOptions({type:"onDeviceInit",data:Base64Utils.encodeB64Str(JSON.stringify(HSCJLocalSettingManager.getOfflineDevice()))});
    }
};

/* 包含在options里执行的消息 */
MessageManager.Options = {
    speak: MessageManager.Background.speak,
    onSettingChanged:()=>{
        const settings = HSCJLocalSettingManager.toJSON();
        const msg = {
            type:"onSettingChanged",
            settings:settings
        };
        MessageManager.sendMessageFromOptionsToContent(msg);
        MessageManager.sendMessageFromOptionsToBackground(msg);
    },
    requestDeviceInfo:()=>{
        MessageManager.sendMessageFromOptionsToContent({type:"requestDeviceInfo"});
    },
    onDeviceChanged:()=>{
        MessageManager.sendMessageFromOptionsToContent({type:"onDeviceInit",data:Base64Utils.encodeB64Str(JSON.stringify(HSCJLocalSettingManager.getOfflineDevice()))});
    }
};

/* 包含在devtools执行的消息 */
MessageManager.DevTools = {

};
