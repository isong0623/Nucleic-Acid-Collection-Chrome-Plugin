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

    static onReadIdCard(deviceType,idCard,idName){}

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
                    ShenSiDevice.debug("扫码检测神思读卡设备服务连接成功!");
                    ShenSiDevice.sendMessage('{"Method":"OpenDevice","PortType":"AUTO","PortPara":"","ExtendPara":""}');
                };

                g.onclose = function (t) {
                    ShenSiDevice.debug("扫码检测神思读卡设备服务关闭!");
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
                                if (await ShenSiDevice.onReadIdCard("ShenSi",idCardNo,fullName)) return;
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