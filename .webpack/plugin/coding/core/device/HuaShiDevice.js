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
                        if(await HuaShiDevice.onReadIdCard("HuaShi",idCard,fullName)) return;
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

    static onReadIdCard(deviceType,idCard,idName){}
}