class DeviceManager{
    static onReadIdCard(idCard){}
    static _availableDevice = null;
    static _lLastAvailabelTime = 0;

    static _onReadIdCard = (deviceType,idCard,idName) => {
        DeviceManager._availableDevice = deviceType;
        DeviceManager._lLastAvailabelTime = new Date().getTime();
        DeviceManager.onReadIdCard(idCard);
    }

    static readIdCard(){
        if(new Date().getTime() - this._lLastAvailabelTime<30000){
            if(DeviceManager._availableDevice === "DeCard"){
                DeCardDevice.readIdCard();
                return;
            }
            if(DeviceManager._availableDevice === "ShenSi"){
                ShenSiDevice.readIdCard();
                return;
            }
            if(DeviceManager._availableDevice === "HuaShi"){
                HuaShiDevice.readIdCard();
                return;
            }
        }
        DeCardDevice.readIdCard();
        HuaShiDevice.readIdCard();
        ShenSiDevice.readIdCard();
    }

    static initDevice(){
        DeCardDevice.initDevice();
        ShenSiDevice.initDevice();
        HuaShiDevice.openDevice({onSuccess:()=>{},onFailure:()=>{}});
    }
}

DeCardDevice.onReadIdCard = DeviceManager._onReadIdCard;
HuaShiDevice.onReadIdCard = DeviceManager._onReadIdCard;
ShenSiDevice.onReadIdCard = DeviceManager._onReadIdCard;
