package scrpt

import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import scrpt.utils.*
import java.nio.charset.Charset
import java.util.*
import kotlin.collections.HashMap
import kotlin.collections.HashSet

/**
 * 这个脚本作用于核酸采集浏览器插件，用于自动混淆代码
 *
 * "http://localhost:4000/"是一个混淆js的服务，基于“http://dean.edwards.name/packer/”二次开发
 *
 * NumberUtils.encodeOrder是一个自定义进制转换函数，将一个整数转换成包含大小写字母及数字等表示的自定义进制符号
 *
 * rewriteFile重写文件，不存在则创建路径和文件
 * appendFile文件尾追加，不存在则创建路径和文件
 * copyFD递归复制文件夹
 * delFD递归删除文件夹
 *
 * 目前已废弃
 */
private val confuseMapper = HashMap<String,String>().apply {
    var _clz = 1
    var _fun = 1
    var _var = 1
    var _msg = 1

    //以下脚本生成，自定义webpack混淆

    put("HSCJApiInterceptor"        ,"c"+NumberUtils.encodeOrder(_clz++))
    put("handleInterceptEvent"      ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptCallback"       ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptTubInfo"        ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptUserInfo"       ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptHealthQRCode"   ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptConfirmSampling","f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptGridInfo"       ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptDeviceInfo"     ,"f"+NumberUtils.encodeOrder(_fun++))
    put("onInterceptHSCJPage"       ,"f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJApiProvider","c"+NumberUtils.encodeOrder(_clz++))
    put("submitApiPing","f"+NumberUtils.encodeOrder(_fun++))
    put("getPingAVG","f"+NumberUtils.encodeOrder(_fun++))
    put("pingHSCJServer","f"+NumberUtils.encodeOrder(_fun++))
    put("nextRequestId","f"+NumberUtils.encodeOrder(_fun++))
    put("updateApiInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("queryApiInfo","f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJApiReceiver","c"+NumberUtils.encodeOrder(_clz++))
    put("handleNetworkEvent","f"+NumberUtils.encodeOrder(_fun++))
    put("onLoginApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onGetTubInfoApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onGetIdCardInfoApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onGetGridInfoApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onCommitSamplingApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onHealthQRInfoApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onDeleteSamplingApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onQueryHistoryApiReceived","f"+NumberUtils.encodeOrder(_fun++))
    put("onFindSiteDeviceApiReceived","f"+NumberUtils.encodeOrder(_fun++))

    put("_encodeBytes2Base64Str","f"+NumberUtils.encodeOrder(_fun++))
    put("_decodeBase64Str2Bytes","f"+NumberUtils.encodeOrder(_fun++))
    put("_utf8EncodeStr2Bytes","f"+NumberUtils.encodeOrder(_fun++))
    put("_utf8EncodeStr2Str","f"+NumberUtils.encodeOrder(_fun++))
    put("_utf8DecodeBytes2Str","f"+NumberUtils.encodeOrder(_fun++))
    put("_utf8DecodeStr2Str","f"+NumberUtils.encodeOrder(_fun++))
    put("encodeB64Str","f"+NumberUtils.encodeOrder(_fun++))
    put("decodeB64Str","f"+NumberUtils.encodeOrder(_fun++))
    put("encodeTable","v"+NumberUtils.encodeOrder(_var++))
    put("decodeTable","v"+NumberUtils.encodeOrder(_var++))

    put("encryptLogin","f"+NumberUtils.encodeOrder(_fun++))
    put("decryptLogin","f"+NumberUtils.encodeOrder(_fun++))

    put("UrlDecode","f"+NumberUtils.encodeOrder(_fun++))
    put("StringToAscii","f"+NumberUtils.encodeOrder(_fun++))
    put("AsciiToString","f"+NumberUtils.encodeOrder(_fun++))

    put("parseTimestamp2yyyyMMddFormat","f"+NumberUtils.encodeOrder(_fun++))
    put("parseTimestamp2ZhFormat","f"+NumberUtils.encodeOrder(_fun++))

    put("convArr","f"+NumberUtils.encodeOrder(_fun++))
    put("rows2Array","f"+NumberUtils.encodeOrder(_fun++))
    put("isInsert","f"+NumberUtils.encodeOrder(_fun++))
    put("isUpdate","f"+NumberUtils.encodeOrder(_fun++))
    put("updateCount","f"+NumberUtils.encodeOrder(_fun++))
    put("countRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("dropTable","f"+NumberUtils.encodeOrder(_fun++))
    put("dropDatabase","f"+NumberUtils.encodeOrder(_fun++))

    put("pingOCRServer","f"+NumberUtils.encodeOrder(_fun++))
    put("recognizeOCR","f"+NumberUtils.encodeOrder(_fun++))

    put("decodeQRCode","f"+NumberUtils.encodeOrder(_fun++))
    put("decodeBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeResult","f"+NumberUtils.encodeOrder(_fun++))
    put("onQRCodeResult","f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJControlPanel","c"+NumberUtils.encodeOrder(_clz++))
    put("getDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("getCameraPanel","f"+NumberUtils.encodeOrder(_fun++))
    put("getCameraEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getCanvasEle","f"+NumberUtils.encodeOrder(_fun++))
    put("setScriptBtnEnabled","f"+NumberUtils.encodeOrder(_fun++))
    put("setTubCountDisplay","f"+NumberUtils.encodeOrder(_fun++))
    put("getCurrentBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfLocalSamplingTubs","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfLocalSamplingNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setOfflineBtnEnabled","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfRemainingOfflineTubs","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfRemainingOfflineNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfFailedOfflineTubs","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfFailedOfflineNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setCurrentProcessingOfflineTubs","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfProcessingSuccessNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfProcessingFailedNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfProcessingReadyNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setOfflineProgress","f"+NumberUtils.encodeOrder(_fun++))
    put("setOfflineProgressPercent","f"+NumberUtils.encodeOrder(_fun++))
    put("pingServer","f"+NumberUtils.encodeOrder(_fun++))
    put("setServerPing","f"+NumberUtils.encodeOrder(_fun++))
    put("setServerState","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfSummeryTubs","f"+NumberUtils.encodeOrder(_fun++))
    put("setCountOfSummeryNums","f"+NumberUtils.encodeOrder(_fun++))
    put("setOCRState","f"+NumberUtils.encodeOrder(_fun++))
    put("setQRState","f"+NumberUtils.encodeOrder(_fun++))
    put("setCameraVisible","f"+NumberUtils.encodeOrder(_fun++))
    put("isSamplingPage","f"+NumberUtils.encodeOrder(_fun++))
    put("showLocalSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("downloadLocalSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("cleanLocalSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("updateLocalSamplingRecordsDisplayInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("isScriptRunning","f"+NumberUtils.encodeOrder(_fun++))
    put("updateScriptButtonState","f"+NumberUtils.encodeOrder(_fun++))
    put("showOfflineSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("downloadOfflineSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("cleanOfflineSamplingRecords","f"+NumberUtils.encodeOrder(_fun++))
    put("updateOfflineSamplingRecordsDisplayInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("setCurrentProcessingOfflineTubNo","f"+NumberUtils.encodeOrder(_fun++))
    put("getCurrentProcessingOfflineTubNo","f"+NumberUtils.encodeOrder(_fun++))
    put("isOfflineMode","f"+NumberUtils.encodeOrder(_fun++))
    put("updateOfflineButtonState","f"+NumberUtils.encodeOrder(_fun++))
    put("isDialogOpen","f"+NumberUtils.encodeOrder(_fun++))
    put("updateSummery","f"+NumberUtils.encodeOrder(_fun++))
    put("updateServerState","f"+NumberUtils.encodeOrder(_fun++))
    put("updateSupportInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("updateTubInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("onDataChanged","f"+NumberUtils.encodeOrder(_fun++))
    put("onScriptControlClicked","f"+NumberUtils.encodeOrder(_fun++))
    put("onOfflineControlClicked","f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJHtmlPageManager","c"+NumberUtils.encodeOrder(_clz++))
    put("eleOf","f"+NumberUtils.encodeOrder(_fun++))
    put("getIndexPage","f"+NumberUtils.encodeOrder(_fun++))
    put("getLoginPage","f"+NumberUtils.encodeOrder(_fun++))
    put("getSamplingPage","f"+NumberUtils.encodeOrder(_fun++))
    put("getHistoryPage","f"+NumberUtils.encodeOrder(_fun++))
    put("getTransferPage","f"+NumberUtils.encodeOrder(_fun++))
    put("isSamplingPage","f"+NumberUtils.encodeOrder(_fun++))
    put("getCapacityEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getBarcodeEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getPeopleEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getIdTypeEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getIdNoEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getReadIdBtn","f"+NumberUtils.encodeOrder(_fun++))
    put("getNameEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getPhoneEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getTownEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getVillageEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getCommunityEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getOccupationEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getSamplingSiteEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getSamplingTimeEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getSamplingCountEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getAddressEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getMarkEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getConfirmSamplingBtn","f"+NumberUtils.encodeOrder(_fun++))
    put("getResetSamplingBtn","f"+NumberUtils.encodeOrder(_fun++))
    put("getBarcodeWarnEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getBarcodeFullEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getReadCardWarnListEle","f"+NumberUtils.encodeOrder(_fun++))
    put("click2CommitSampling","f"+NumberUtils.encodeOrder(_fun++))
    put("clearBarcodeWarnMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("clearReadIdWarnMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("closeBarcodeFullDialog","f"+NumberUtils.encodeOrder(_fun++))
    put("getControlDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("getCameraDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("setCameraVisible","f"+NumberUtils.encodeOrder(_fun++))
    put("getCameraPanel","f"+NumberUtils.encodeOrder(_fun++))
    put("getCameraEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getCanvasEle","f"+NumberUtils.encodeOrder(_fun++))
    put("getTubCountDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("getTubCountEle","f"+NumberUtils.encodeOrder(_fun++))
    put("setTubCountDisplay","f"+NumberUtils.encodeOrder(_fun++))
    put("getClearInputIdCardDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("getClearInputIdCardEle","f"+NumberUtils.encodeOrder(_fun++))
    put("autoSelectDate","f"+NumberUtils.encodeOrder(_fun++))
    put("autoAddPluginDOM","f"+NumberUtils.encodeOrder(_fun++))
    put("refreshSettings","f"+NumberUtils.encodeOrder(_fun++))
    put("handleApiMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("onDataChanged","f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJLocalSettingManager","c"+NumberUtils.encodeOrder(_clz++))
    put("writeStorage","f"+NumberUtils.encodeOrder(_fun++))
    put("readStorage","f"+NumberUtils.encodeOrder(_fun++))

    put("keyOfBarcodeLength","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfBarcodeMatchRule","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfOnlyInputIDCard","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfInputIDRule","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfIDExpired","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfReadIDInterval","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfTaskInterval","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfSyncInternal","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfHealthyRule","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfElementsRule","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfReadIDMCC","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfCameraEnable","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfBarcodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfQRCodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("keyOfOCREnable","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfBarcodeLength","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfBarcodeMatchRule","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfOnlyInputIDCard","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfInputIDRule","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfIDExpired","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfReadIDInterval","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfTaskInterval","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfSyncInternal","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfHealthyRule","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfElementsRule","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfReadIDMCC","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfCameraEnable","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfBarcodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfQRCodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("defaultOfOCREnable","v"+NumberUtils.encodeOrder(_var++))
    put("configOfBarcodeLength","v"+NumberUtils.encodeOrder(_var++))
    put("configOfBarcodeMatchRule","v"+NumberUtils.encodeOrder(_var++))
    put("configOfOnlyInputIDCard","v"+NumberUtils.encodeOrder(_var++))
    put("configOfInputIDRule","v"+NumberUtils.encodeOrder(_var++))
    put("configOfIDExpired","v"+NumberUtils.encodeOrder(_var++))
    put("configOfReadIDInterval","v"+NumberUtils.encodeOrder(_var++))
    put("configOfTaskInterval","v"+NumberUtils.encodeOrder(_var++))
    put("configOfSyncInternal","v"+NumberUtils.encodeOrder(_var++))
    put("configOfHealthyRule","v"+NumberUtils.encodeOrder(_var++))
    put("configOfElementsRule","v"+NumberUtils.encodeOrder(_var++))
    put("configOfReadIDMCC","v"+NumberUtils.encodeOrder(_var++))
    put("configOfCameraEnable","v"+NumberUtils.encodeOrder(_var++))
    put("configOfBarcodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("configOfQRCodeEnable","v"+NumberUtils.encodeOrder(_var++))
    put("configOfOCREnable","v"+NumberUtils.encodeOrder(_var++))

    put("HSCJOfflineEngine","c"+NumberUtils.encodeOrder(_clz++))
    put("startOffline","f"+NumberUtils.encodeOrder(_fun++))
    put("stopOffline","f"+NumberUtils.encodeOrder(_fun++))
    put("setOfflineState","f"+NumberUtils.encodeOrder(_fun++))
    put("isInOfflineMode","f"+NumberUtils.encodeOrder(_fun++))
    put("onOfflineStateChanged","f"+NumberUtils.encodeOrder(_fun++))
    put("setCurrentProcessingOfflineTubNo","f"+NumberUtils.encodeOrder(_fun++))
    put("getCurrentProcessingOfflineTubNo","f"+NumberUtils.encodeOrder(_fun++))
    put("runOfflineAutomatically","f"+NumberUtils.encodeOrder(_fun++))

    put("HSCJScriptEngine","c"+NumberUtils.encodeOrder(_clz++))
    put("click2ReadIdCard","f"+NumberUtils.encodeOrder(_fun++))
    put("resetHSCJInput","f"+NumberUtils.encodeOrder(_fun++))
    put("clearHSCJInput","f"+NumberUtils.encodeOrder(_fun++))
    put("clearBarcodeWarnMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("clearReadIdWarnMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("closeBarcodeFullDialog","f"+NumberUtils.encodeOrder(_fun++))
    put("playScanMusic","f"+NumberUtils.encodeOrder(_fun++))
    put("playConfirmMusic","f"+NumberUtils.encodeOrder(_fun++))
    put("playErrorMusic","f"+NumberUtils.encodeOrder(_fun++))
    put("setWaitResponseFlag","f"+NumberUtils.encodeOrder(_fun++))
    put("isWaitResponseFlag","f"+NumberUtils.encodeOrder(_fun++))
    put("setLastInputBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("getLastInputBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("setLastHealthQRCode","f"+NumberUtils.encodeOrder(_fun++))
    put("getLastHealthQRCode","f"+NumberUtils.encodeOrder(_fun++))
    put("setLastInputIdNo","f"+NumberUtils.encodeOrder(_fun++))
    put("getLastInputIdNo","f"+NumberUtils.encodeOrder(_fun++))
    put("setLastStartInputIdNoTimestamp","f"+NumberUtils.encodeOrder(_fun++))
    put("getLastStartInputIdNoTimestamp","f"+NumberUtils.encodeOrder(_fun++))
    put("setLastConfirmedIdNo","f"+NumberUtils.encodeOrder(_fun++))
    put("getLastConfirmedIdNo","f"+NumberUtils.encodeOrder(_fun++))
    put("setFindPeopleController","f"+NumberUtils.encodeOrder(_fun++))
    put("getFindPeopleController","f"+NumberUtils.encodeOrder(_fun++))
    put("setFindHealthQRInfoController","f"+NumberUtils.encodeOrder(_fun++))
    put("getFindHealthQRInfoController","f"+NumberUtils.encodeOrder(_fun++))
    put("setConfirmController","f"+NumberUtils.encodeOrder(_fun++))
    put("getConfirmController","f"+NumberUtils.encodeOrder(_fun++))
    put("setManualInput","f"+NumberUtils.encodeOrder(_fun++))
    put("isManualInput","f"+NumberUtils.encodeOrder(_fun++))
    put("startScript","f"+NumberUtils.encodeOrder(_fun++))
    put("stopScript","f"+NumberUtils.encodeOrder(_fun++))
    put("setScriptState","f"+NumberUtils.encodeOrder(_fun++))
    put("onScriptStateChanged","f"+NumberUtils.encodeOrder(_fun++))
    put("isScriptRunning","f"+NumberUtils.encodeOrder(_fun++))
    put("runScript","f"+NumberUtils.encodeOrder(_fun++))
    put("autoFillCapacity","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeEmpty","f"+NumberUtils.encodeOrder(_fun++))
    put("onInputBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeCheck","f"+NumberUtils.encodeOrder(_fun++))
    put("onVerifyBarcode","f"+NumberUtils.encodeOrder(_fun++))
    put("onBlurPeopleIDEle","f"+NumberUtils.encodeOrder(_fun++))
    put("onVerifyHealthQRCode","f"+NumberUtils.encodeOrder(_fun++))
    put("onIdNoSameChecking","f"+NumberUtils.encodeOrder(_fun++))
    put("onBlurIdEle","f"+NumberUtils.encodeOrder(_fun++))
    put("onVerifyIdNo","f"+NumberUtils.encodeOrder(_fun++))
    put("onWaitingPeopleInfo","f"+NumberUtils.encodeOrder(_fun++))
    put("onManualInput","f"+NumberUtils.encodeOrder(_fun++))
    put("onVerifyName","f"+NumberUtils.encodeOrder(_fun++))
    put("onVerifyPhone","f"+NumberUtils.encodeOrder(_fun++))
    put("onConfirm","f"+NumberUtils.encodeOrder(_fun++))
    put("onAutoWaitResponse","f"+NumberUtils.encodeOrder(_fun++))
    put("click2CommitSampling","f"+NumberUtils.encodeOrder(_fun++))
    put("onReadIdCard","f"+NumberUtils.encodeOrder(_fun++))
    put("onOCRCallback","f"+NumberUtils.encodeOrder(_fun++))
    put("onQRCodeCallback","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeCallback","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeFull","f"+NumberUtils.encodeOrder(_fun++))
    put("onBarcodeEnter","f"+NumberUtils.encodeOrder(_fun++))
    put("onControlScript","f"+NumberUtils.encodeOrder(_fun++))
    put("onControlScript","f"+NumberUtils.encodeOrder(_fun++))
    put("onTubInfoNotify","f"+NumberUtils.encodeOrder(_fun++))
    put("onIdNoInfoNotify","f"+NumberUtils.encodeOrder(_fun++))
    put("onHealthQRInfoNotify","f"+NumberUtils.encodeOrder(_fun++))
    put("onSamplingResultNotify","f"+NumberUtils.encodeOrder(_fun++))

    put("sendMessageFromContentToBackground","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromContentToDev","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromContentToOptions","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromOptionsToBackground","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromDevToBackground","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromBackgroundToContent","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromOptionsToContent","f"+NumberUtils.encodeOrder(_fun++))
    put("sendMessageFromDevToContent","f"+NumberUtils.encodeOrder(_fun++))
    put("MessageManager.Background","MessageManager.f"+NumberUtils.encodeOrder(_fun++))
    put("MessageManager.Content","MessageManager.f"+NumberUtils.encodeOrder(_fun++))
    put("MessageManager.Options","MessageManager.f"+NumberUtils.encodeOrder(_fun++))
    put("MessageManager.DevTools","MessageManager.f"+NumberUtils.encodeOrder(_fun++))

    put("attachedTab","v"+NumberUtils.encodeOrder(_var++))

    put("autoLoadBreakLine","f"+NumberUtils.encodeOrder(_fun++))
    put("attachDebugger","f"+NumberUtils.encodeOrder(_fun++))

    put("handleApiMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("handleMessage","f"+NumberUtils.encodeOrder(_fun++))
    put("sendDeviceInfoToOptions","f"+NumberUtils.encodeOrder(_fun++))

    put("reLogin","m"+NumberUtils.encodeOrder(_msg++))
    put("onBreakLine","m"+NumberUtils.encodeOrder(_msg++))
    put("updateSettings","m"+NumberUtils.encodeOrder(_msg++))
    put("sendMessageToContent","m"+NumberUtils.encodeOrder(_msg++))
    put("requestDeviceInfo","m"+NumberUtils.encodeOrder(_msg++))
    put("onDeviceChanged","m"+NumberUtils.encodeOrder(_msg++))
}

private const val BrowserPluginProjectPath = "D:\\My_Developments\\Dreaming\\flutter_tests\\hscj\\app\\local\\plugin\\speak"
private const val WebpackInputPath  = "$BrowserPluginProjectPath\\.webpack\\chunk-in\\"
private const val WebpackOutputPath = "$BrowserPluginProjectPath\\.webpack\\chunk-out\\"
private const val CommonJSPath      = "$WebpackInputPath\\common.js"
private const val PluginReleasePath = "$BrowserPluginProjectPath\\.webpack\\plugin\\release\\"
private const val PluginDevelopPath = "$BrowserPluginProjectPath\\.webpack\\plugin\\develop\\"
private val optionsJs = JSONArray().apply {
    add("core/utils/LogUtils.js");
    add("core/utils/Base64Utils.js");
    add("core/utils/FunctionUtils.js");
    add("core/HSCJTTSEngine.js");
    add("core/MessageManager.js");
    add("core/HSCJLocalSettingManager.js");
    add("options.js");
}
private val decoder = Base64.getDecoder();
private val encoder = Base64.getEncoder();

//混淆js
private fun shrinkJS(path:String):String{
    val script = readFile(path).toString();
    val encodes = encoder.encodeToString(script.toByteArray(Charset.forName("utf-8")))
    val decodes = String(decoder.decode(encodes),Charset.forName("utf-8"))

    val postBody = JSONObject().apply {
        put("shrink",false)
        put("base64",true)
        put("script", encodes);
    }

    val result = ApiUtils.post("http://localhost:4000/", JSONObject().apply { put("Content-Type","application/json") },postBody)

    return try {
        val json = JSON.parseObject(result);
        Base64Utils.decode2Str(json["data"]as String)
    } catch (e: Exception) {
        e.printStackTrace();
        "";
    }
}

private fun generatePackSrc(){
    val manifest = JSON.parseObject(readFile("$BrowserPluginProjectPath\\.webpack\\plugin\\coding\\manifest.json").toString())
    val backgroundJs = (manifest["background"] as JSONObject)["scripts"] as JSONArray
    val contentJs    = ((manifest["content_scripts"] as JSONArray)[0] as JSONObject)["js"] as JSONArray
    val tasks = JSONObject().apply {
        put("background",backgroundJs)
        put("content",contentJs)
        put("options", optionsJs)
    }
    val commonJSs = HashSet<String>().apply {
        add("BarcodeReader.js");
        add("DecoderWorker.js");
        add("exif.js");
        add("QRCodeReader.js");
        add("crypto.js");
        add("xlsx.core.min.js");
    }
    println("正在生成源打包文件...");
    rewriteFile(CommonJSPath,"");
    tasks.forEach { name, relativeJSs ->
        val outJsName = "$WebpackInputPath\\$name.js";
        println("\t开始生成[$name]");
        rewriteFile(outJsName,"")
        (relativeJSs as JSONArray).forEach { relativeJSPath ->
            val isCommon = commonJSs.contains(relativeJSPath.toString().substringAfterLast("/"))
            val outTarget = if (isCommon) "common" else name
            val writeTarget = if(isCommon) CommonJSPath else outJsName
            println("\t\t添加[$relativeJSPath] -> $outTarget")

            appendFile(writeTarget, readFile("$BrowserPluginProjectPath\\.webpack\\plugin\\coding\\$relativeJSPath"){
                val line = it.toString().trim();
                if(line.startsWith("//")){
                    it.clear();
                    return@readFile
                }
                if(isCommon) return@readFile
                //移除debug
                if(line.contains(".log(") || line.contains(".debug(")){
                    if(line.replace(Regex("^([\\s]*)([a-zA-Z0-9]*)\\.((debug)|(log))\\(\\\""),"").length <line.length){
                        it.clear();
                        return@readFile
                    }
                }

                confuseMapper.forEach { name, shrink ->
                    while(true){
                        val index = it.indexOf(name)
                        if(index<0) break;
                        it.replace(index,index+name.length,shrink)
                    }
                    if(it.length<5) return@forEach
                }
            }.appendLine().toString());
        }
        println();
    }
    println("源文件生成完毕！");
    println();

    val cmd = "cd \"$BrowserPluginProjectPath\\.webpack\" && npx webpack build --config \"$BrowserPluginProjectPath\\.webpack\\webpack.config.js\" --stats verbose --json \"$BrowserPluginProjectPath\\.webpack\\build.json\""
    println("开始执行webpack打包命令：$cmd")

    executeCMD(cmd,15000)
}

private fun generate4Develop(){
    println("开始复制文件到Develop...");
    copyFD("$WebpackOutputPath\\bundle-352-background.js","$PluginDevelopPath\\bundle-352-background.js")
    copyFD("$WebpackOutputPath\\bundle-798-options.js"   ,"$PluginDevelopPath\\bundle-798-options.js")
    copyFD("$WebpackOutputPath\\bundle-998-content.js"   ,"$PluginDevelopPath\\bundle-998-content.js")
    copyFD("$CommonJSPath"                               ,"$PluginDevelopPath\\bundle-957-common.js")
}

private fun generate4Release(){
    println("开始生成文件到Release...");
    rewriteFile("$PluginReleasePath\\bundle-352.js", shrinkJS("$WebpackOutputPath\\bundle-352-background.js"))
    rewriteFile("$PluginReleasePath\\bundle-798.js", shrinkJS("$WebpackOutputPath\\bundle-798-options.js"))
    rewriteFile("$PluginReleasePath\\bundle-998.js", shrinkJS("$WebpackOutputPath\\bundle-998-content.js"))
    rewriteFile("$PluginReleasePath\\bundle-957.js", shrinkJS("$CommonJSPath"))
}

private fun clear(){
    println("开始删除旧文件...");
    delFD("$WebpackOutputPath\\bundle-352-background.js")
    delFD("$WebpackOutputPath\\bundle-798-options.js"   )
    delFD("$WebpackOutputPath\\bundle-998-content.js"   )
    delFD("$CommonJSPath"                               )

    delFD("$PluginDevelopPath\\bundle-352-background.js")
    delFD("$PluginDevelopPath\\bundle-798-options.js")
    delFD("$PluginDevelopPath\\bundle-998-content.js")
    delFD("$PluginDevelopPath\\bundle-957-common.js")

    delFD("$PluginReleasePath\\bundle-352.js")
    delFD("$PluginReleasePath\\bundle-798.js")
    delFD("$PluginReleasePath\\bundle-998.js")
    delFD("$PluginReleasePath\\bundle-957.js")

    delFD("$BrowserPluginProjectPath\\.webpack\\chunk-out\\")
    createDir("$BrowserPluginProjectPath\\.webpack\\chunk-out\\")

    delFD("$BrowserPluginProjectPath\\.webpack\\chunk-in\\")
    createDir("$BrowserPluginProjectPath\\.webpack\\chunk-in\\")

    println("旧文件删除完毕！");
    println();
}

fun main(){
    clear()
    generatePackSrc()
    generate4Develop()
//    generate4Release()
}