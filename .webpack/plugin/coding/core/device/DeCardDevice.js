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

    static onReadIdCard(deviceType,idCard,idName){}

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
                    DeCardDevice.debug("德卡读卡设备服务连接成功!");
                }

                h.onclose = function (t) {
                    DeCardDevice.debug("德卡读卡设备服务关闭!");
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
                                if (await DeCardDevice.onReadIdCard("DeCard",idCard,fullName)) return;
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