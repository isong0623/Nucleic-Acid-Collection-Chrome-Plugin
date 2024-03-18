const tag = "Background";
const env = "Background";
const workupTimestamp = new Date().getTime();

const proxyLog = console.log;
console.log = function (msg) {
    proxyLog(msg);
    MessageManager.sendMessageFromBackgroundToContent({type:"console.log",msg:msg});
}

const proxyWarn = console.warn;
console.warn = function (msg){
    proxyWarn(msg);
    MessageManager.sendMessageFromBackgroundToContent({type:"console.warn",msg:msg});
}

chrome.tabs.onRemoved.addListener(function(tabId, removed) {
    if(MessageManager.Background.attachedTab?.tabId === tabId){
        chrome.debugger.detach({tabId:tabId},()=>{
            MessageManager.Background.attachedTab = null;
            MessageManager.Background.speak("插件已停止！",false);
        });
    }
});

async function autoLoadBreakLine(tabId){
    LogUtils.log("autoLoadBreakLine => "+tabId,env);
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

    LogUtils.log("autoLoadBreakLine => isServerOk:"+isServerOk,env);
    if(!isServerOk){
        try {chrome.tabs.reload(tabId, {bypassCache: true});} catch (e) {}
    }
}

async function attachDebugger(tab){
    let isHSCJPage = (tab?.pendingUrl??"").indexOf("hsjc.qingdao.gov.cn")>-1 || (tab?.url??"").indexOf("hsjc.qingdao.gov.cn")>-1;
    if(!isHSCJPage) return;
    if(MessageManager.Background.attachedTab?.tabId === tab.id) return;

    /*确保只打开一个核酸采样系统*/
    if(MessageManager.Background.attachedTab != null){
        try {
            await chrome.tabs.remove(tab.id);
            if (tab.windowId != null && MessageManager.Background.attachedTab != null) {
                if (tab.windowId !== MessageManager.Background.attachedTab.windowId) {
                    await chrome.windows.update(tab.windowId, {focused: false});
                    await chrome.windows.update(MessageManager.Background.attachedTab.windowId, {focused: true});
                }
            }
            await chrome.tabs.update(MessageManager.Background.attachedTab.tabId, {active: true});
        } catch (e) {}
        return;
    }

    /* 经webpack打包后需要一段时间整个background加载完毕需要等待一段时间 */
    let delay = new Date().getTime() - workupTimestamp;
    delay = delay>3000? 1000 : (4000-delay);
    setTimeout(()=>MessageManager.Background.speak("插件已运行！",false),delay);

    /*注入调试器拦截和监听网络*/
    const debuggee = {tabId : tab.id};
    MessageManager.Background.attachedTab = {tabId:tab.id,windowId:tab.windowId };
    chrome.debugger.attach(debuggee, '1.3', async () => {
        chrome.debugger.onEvent.addListener(async (source, method, params) => {
            if(source.tabId !== tab.id) return;

            if(await HSCJApiReceiver.handleNetworkEvent(debuggee,method,params)) return;

            if(await HSCJApiInterceptor.handleInterceptEvent(debuggee,method,params)) return;
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

        await autoLoadBreakLine(tab.id);
    });
}

chrome.tabs.onCreated.addListener((tab)=>{
    /*查询当前页面的url*/
    chrome.tabs.get(tab.id,async (tab)=>{
        await attachDebugger(tab);
    });
});

chrome.debugger.onDetach.addListener((source, reason) => {
    /* 当前调试页面已关闭 */
    if(MessageManager.Background.attachedTab === null || MessageManager.Background.attachedTab === undefined) return;

    /* 用户关闭顶部调试提示 */
    MessageManager.Background.attachedTab = null;
    MessageManager.Background.speak("插件已停止！",false);
    chrome.tabs.get(source.tabId,async (tab)=>{
        await attachDebugger(tab);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo?.status === "complete"){
        const url = tab.url;
        if(url === null) return;
        MessageManager.Background.onDataChanged();
        if(url.trim().endsWith("hsjc.qingdao.gov.cn/#/check/record")){
            MessageManager.sendMessageFromBackgroundToContent({type:"jumpHistQuery"});
            return;
        }
        if(url.trim().endsWith("hsjc.qingdao.gov.cn/#/check/scancheck")){
            MessageManager.sendMessageFromBackgroundToContent({type:"autoAddComponent"});
        }
    }
});

chrome.commands.onCommand.addListener((command) => {
    if(command === 'start_script'){
        MessageManager.sendMessageFromBackgroundToContent({type:'onControlScript'});
        return true;
    }
});

chrome.runtime.onMessage.addListener(async (request, sender, senderResponse) => {

	if(request.type === "speak"){
        MessageManager.Background.speak(request.msg,true,request.rate,request.pitch);
		return true;
	}

	if(request.type === "speak2"){
        MessageManager.Background.speak(request.msg,false,request.rate,request.pitch);
        return true;
    }

	/* 不能阻塞消息，否则后续消息无法接受及处理 */
	if(HSCJApiInterceptor.onInterceptCallback(request)) return true;

	if(request.type === "onBreakLine"){
	    setTimeout(()=>MessageManager.sendMessageFromBackgroundToContent(request),3000);
	    return true;
    }

	if(request.type === "Jump2BreakLine"){
	    if(MessageManager.Background.attachedTab === null){
	        chrome.tabs.create({
                url:"https://hsjc.qingdao.gov.cn/",
                active:true
            });
            setTimeout(()=>MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine"}),3000);
            return true;
        }
	    chrome.tabs.query({active:true,currentWindow:true},async (tabs)=>{
	        const tab = tabs[0];
	        if(tab === undefined) return;
	        if(tab.windowId != MessageManager.Background.attachedTab.windowId){
                await chrome.windows.update(MessageManager.Background.attachedTab, {focused: true});
            }
            await chrome.tabs.update(MessageManager.Background.attachedTab.tabId, {active: true});
            MessageManager.sendMessageFromBackgroundToContent({type:"onBreakLine"});
        });
	    return true;
    }

    /*个人信息获取成功*/
    if(request.type === "playConfirmMusic"){
        const player = document.createElement('audio');
        player.src=chrome.runtime.getURL('./static/audio/1778.wav');
        player.play();
        return true;
    }

    /*健康码扫描识别成功*/
    if(request.type === "playScanMusic"){
        const player = document.createElement('audio');
        player.src = chrome.runtime.getURL('./static/audio/13193.wav');
        player.play();
        return true;
    }

    /* 采样失败或扫码失败 */
    if(request.type === "playErrorMusic"){
        const player = document.createElement('audio');
        player.src = chrome.runtime.getURL('./static/audio/13478.wav');
        player.play();
        return true;
    }

    if(request.type === "updateSettings"){
        MessageManager.sendMessageFromBackgroundToContent({type:"onSettingChanged",settings:HSCJLocalSettingManager.toJSON()});
        return true;
    }

    if(request.type === 'onSettingChanged'){
        HSCJLocalSettingManager.restoreFromJSON(request.settings);
        MessageManager.sendMessageFromBackgroundToContent({type:"onSettingChanged",settings:HSCJLocalSettingManager.toJSON()});
        return true;
    }

    if(request.type === "sendMessageToContent"){
        MessageManager.sendMessageFromBackgroundToContent(request.msg);
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
        MessageManager.Background.speak("哎呀，出幺蛾子了！");
        /*无法跳转*/
        window.location.href = 'https://hsjc.qingdao.gov.cn/';
        window.open('https://hsjc.qingdao.gov.cn/','_self');
    }
});

chrome.tabs.query({active:true,currentWindow:true},async (tabs)=>{
    try {
        await tabs?.forEach(async tab => {
            await attachDebugger(tab);
        });
    } catch (e) {}
});

/*可能不会播报，用于初始化语音引擎*/
MessageManager.Background.speak("插件已加载！");