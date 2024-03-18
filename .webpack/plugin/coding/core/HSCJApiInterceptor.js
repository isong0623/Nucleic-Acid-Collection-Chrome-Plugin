/**
 * 网络请求拦截器
 *
 * 实现逻辑：
 *      background: chrome.debugger.onEvent
 *      background: HSCJApiInterceptor.handleInterceptEvent
 *      background: HSCJApiInterceptor.onInterceptXXXX -> sendMessageFromBackgroundToContent({type:"onApiIntercepted",method:"onInterceptXXXX",params:{requestInfo:{},requestId:""}})
 *      content   : onMessage(msg) -> HSCJApiInterceptor.handleInterceptEvent
 *      content   : HSCJApiInterceptor.onInterceptXXXX -> sendMessageFromContentToBackground({type:"onApiInterceptCallback",requestId:"",result:true,data:{}});
 *      background: onMessage(msg) -> HSCJApiInterceptor.onInterceptCallback
 *
 * 注意：网络拦截消息是异步阻塞的
 */
class HSCJApiInterceptor {

    static async handleInterceptEvent(debuggee,method,params){}

    /**
     * 拦截获取试管信息
     *
     * 若本地为0则允许通过
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptTubInfo        (resolve, reject, params){}

    /**
     * 拦截请求用户信息
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptUserInfo       (resolve, reject, params){}

    /**
     * 拦截请求健康码信息
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptHealthQRCode   (resolve, reject, params){}

    /**
     * 拦截提交采样数据
     *
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptConfirmSampling(resolve, reject, params){}

    /**
     * 拦截请求网格地点信息
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptGridInfo       (resolve, reject, params){}

    /**
     * 拦截请求读卡设备信息
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptDeviceInfo     (resolve, reject, params){}

    /**
     * 拦截核酸采集页面
     * 用于判断是否核酸那系统是否崩溃
     * @param resolve
     * @param reject
     * @param params
     */
    static onInterceptHSCJPage       (resolve, reject, params){}
}

HSCJApiInterceptor.tag = "HSCJApiInterceptor";

HSCJApiInterceptor.Message = {
    onApiIntercepted:{
        key:"onApiIntercepted",
        params:{
            method:"method",
            requestInfo:"requestInfo",
            requestId:"requestId"
        },
        methods:{
            onInterceptTubInfo:"onInterceptTubInfo",
            onInterceptUserInfo:"onInterceptUserInfo",
            onInterceptHealthQRCode:"onInterceptHealthQRCode",
            onInterceptConfirmSampling:"onInterceptConfirmSampling",
            onInterceptGridInfo:"onInterceptGridInfo",
            onInterceptDeviceInfo:"onInterceptDeviceInfo",
            onInterceptHSCJPage:"onInterceptHSCJPage",
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
