/**
 * 核酸网络请求监听
 *
 * 实现原理：
 *      background: chrome.debugger.onEvent
 *      background: HSCJApiInterceptor.handleNetworkEvent
 *      background: onXXXXApiReceived -> sendMessageFromBackgroundToContent({type:"onApiReceived",method:"onXXXApiReceived",requestInfo:{},responseInfo:{}});
 *      content   : onMessage(msg) -> HSCJApiInterceptor.handleNetworkEvent
 *      content   : onXXXXApiReceived()
 */
class HSCJApiReceiver{

    static async handleNetworkEvent(debuggee, method, params){}

    /**
     * 监听到请求登录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onLoginApiReceived          = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求试管信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onGetTubInfoApiReceived     = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求身份信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onGetIdCardInfoApiReceived  = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求网格街道信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onGetGridInfoApiReceived    = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求提交采样接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onCommitSamplingApiReceived = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求健康码信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onHealthQRInfoApiReceived   = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求删除采样记录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onDeleteSamplingApiReceived = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求查询采样记录接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onQueryHistoryApiReceived   = function (requestInfo, responseInfo) {}

    /**
     * 监听到请求查询设备信息接口回调
     * @param requestInfo
     * @param responseInfo
     */
    static onFindSiteDeviceApiReceived = function (requestInfo, responseInfo) {}
}

HSCJApiReceiver.tag = "HSCJApiReceiver";

HSCJApiReceiver.Message = {
    onApiReceived:{
        key:"onApiReceived",
        params:{
            method      :"method",
            requestInfo :"requestInfo",
            responseInfo:"responseInfo"
        },
        methods: {
            onLoginApiReceived         :"onLoginApiReceived",
            onGetTubInfoApiReceived    :"onGetTubInfoApiReceived",
            onGetIdCardInfoApiReceived :"onGetIdCardInfoApiReceived",
            onGetGridInfoApiReceived   :"onGetGridInfoApiReceived",
            onCommitSamplingApiReceived:"onCommitSamplingApiReceived",
            onHealthQRInfoApiReceived  :"onHealthQRInfoApiReceived",
            onDeleteSamplingApiReceived:"onDeleteSamplingApiReceived",
            onQueryHistoryApiReceived  :"onQueryHistoryApiReceived",
            onFindSiteDeviceApiReceived:"onFindSiteDeviceApiReceived"
        }
    }
};

