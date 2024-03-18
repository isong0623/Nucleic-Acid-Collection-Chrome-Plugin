const tag = "Content";
const env = "Content";

const interceptLog  = console.log;
const interceptWarn = console.warn;

chrome.runtime.onMessage.addListener(async (request, sender, senderResponse) => {

    /*LogUtils.log(JSON.stringify(request),tag);/**/

    HSCJHtmlPageManager.onDataChanged();

    if(await HSCJHtmlPageManager.handleApiMessage(request)) return true;

    if(await HSCJApiReceiver.handleNetworkEvent(request)) return true;

    if(await HSCJApiInterceptor.handleInterceptEvent(request)) return true;

    if(await HSCJLocalSettingManager.handleMessage(request)) return true;

    if(request.type === "speak"){
        MessageManager.Content.speak(request.msg.msg,request.msg.enqueue);
        return true;
    }

    if(request.type === "submitApiPing"){
        HSCJApiProvider.submitApiPing(request.timestamp,request.interval);
        return true;
    }

    if(request.type === "reLogin"){
        DOMUtils.clearAllCookie();
        await setTimeout(()=> document.location = HSCJHtmlPageManager.getLoginPage(),HSCJLocalSettingManager.configOfSyncInternal??500);
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
    HSCJLocalSettingManager.restore_options();
});

MessageManager.sendMessageFromContentToBackground({type:"updateSettings"});

//HSCJHtmlPageManager.handleApiMessage({type:"onBreakLine"})


