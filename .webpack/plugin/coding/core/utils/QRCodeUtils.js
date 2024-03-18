/**
 * 二维码识别工具类
 */
class QRCodeUtils{
    static decodeQRCode(imageData,ctx2d){
        return qrcode.decode(imageData,ctx2d);
    }

    static decodeBarcode(image){
        BarcodeReader.DecodeImage(image);
    }

    static async onBarcodeResult(result){
        if((result?.length??0) === 0) return false;
        /* '[{"Format":"Code128","Value":"123456789012"}]' */
        for(let i=0,ni=result.length;i<ni;++i){
            const code = result[i].Value;
            if((code?.length??0)===0) continue;
            for(let j=0;j<5;++j){
                if(await QRCodeUtils.onBarcodeCallback(code)) return true;
                await FunctionUtils.sleep(1000);
            }
        }

        return false;
    };

    static async onQRCodeResult(code){
        if((code?.length??0) === 0) return false;
        /*'EA602833EAF04C10C2A9ACA573C0A015F85' */
        for(let j=0;j<5;++j){
            if(await QRCodeUtils.onQRCodeCallback(code)) {
                return true;
            }
            await FunctionUtils.sleep(1000);
        }

        return false;
    }

    static onBarcodeCallback(code){}
    static onQRCodeCallback(code){}
}

BarcodeReader.Init();
BarcodeReader.SetImageCallback(function(result) {
    QRCodeUtils.onBarcodeResult(result);
});