class CameraUtils{
    static log(msg){
        /*LogUtils.log(msg,"CameraUtils");/**/
    }

    static isCameraOpen(video){
        if(FunctionUtils.isNull(video)) return false;
        const videoInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(videoInfo)) return false;

        return videoInfo?.stream?.active === true;
    }

    static delVideo(video){
        if(FunctionUtils.isNull(video)) return null;
        const id = CameraUtils.findVideo(video);
        if(FunctionUtils.isNull(id)) return;
        CameraUtils.queues[id] = null;
    }

    static async insertVideo(video,canvas,stream){
        if(FunctionUtils.isNull(video)) return;
        while(true){
            const timestamp = new Date().getTime();
            if(!FunctionUtils.isNull(CameraUtils.queues[timestamp])) {
                await FunctionUtils.sleep(1);
                continue;
            }
            CameraUtils.queues[timestamp] = {
                video:video,
                canvas:canvas,
                stream:stream
            };
            break;
        }
    }

    static getVideoInfo(video){
        if(FunctionUtils.isNull(video)) return null;
        const id = CameraUtils.findVideo(video);
        if(FunctionUtils.isNull(id)) return;
        return CameraUtils.queues[id]??null;
    }

    static findVideo(video){
        if(FunctionUtils.isNull(video)) return null;
        let result = null;
        const keys = Object.keys(CameraUtils.queues);
        for(let i=0,ni=keys.length;i<ni;++i){
            const timestamp = keys[i];
            if(CameraUtils.queues[timestamp]?.video === video) {
                result = timestamp;
                break;
            }
        }
        return result;
    }

    static async openCamera(video,canvas,reopen=true){
        if(FunctionUtils.isNull(video)) return false;
        const lastVideoInfo = CameraUtils.getVideoInfo(video);
        if(!FunctionUtils.isNull(lastVideoInfo)){
            if(!reopen){
                const stream = lastVideoInfo.stream;
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = function (e) {video.play();};
                return;
            }
            this.closeCamera(video)
        }
        let constraints = {audio:false,video:true};

        try {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
                navigator.mediaDevices.enumerateDevices().then(function(b) {
                    b.forEach(function(deviceInfo) {
                        if("videoinput" === deviceInfo.kind && -1 < deviceInfo.label.toLowerCase().search("back")){
                            constraints.video = {
                                deviceId: {
                                    exact: deviceInfo.deviceId
                                },
                                facingMode: "environment"
                            }
                        }
                    });
                })
            }
        } catch (b) {
            CameraUtils.log(b);
        }

        let successFlag = false;
        const onOpenSuccess = function (stream) {
            const lastVideoInfo = CameraUtils.getVideoInfo(video);
            if(FunctionUtils.isNull(lastVideoInfo)){
                CameraUtils.insertVideo(video,canvas,stream);
            }
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {video.play();};
            successFlag = true;
        };
        const onOpenFailure = function (err){
            CameraUtils.log('摄像头打开失败，'+err);
        };

        if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
            try {
                await navigator.mediaDevices.getUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.getUserMedia){
            try {
                await navigator.getUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.webkitGetUserMedia){
            try {
                await navigator.webkitGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.mozGetUserMedia){
            try {
                await navigator.mozGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        if(navigator.msGetUserMedia){
            try {
                await navigator.msGetUserMedia(constraints)
                    .then(onOpenSuccess)
                    .catch(onOpenFailure);
                if (successFlag) return;
            } catch (e) {}
        }
        onOpenFailure("推荐使用最新版QQ浏览器！");
    }

    static closeCamera(video){
        if(FunctionUtils.isNull(video)) return true;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return true;
        try {
            if (video.close) {
                video.close();
            }
        } catch (e) {}

        const stream = cameraInfo.stream;
        const tracks = stream.getTracks();
        for(let i=0,ni=tracks?.length??0;i<ni;++i){
            try {tracks[i]?.stop();} catch (e) {}
        }
        /*只读属性*/
        try {cameraInfo.stream.active = false;} catch (e) {}
        CameraUtils.delVideo(video);
        return true;
    }

    static takeImageData(video){
        if(FunctionUtils.isNull(video)) return null;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return null;
        const canvas = cameraInfo.canvas;
        if(FunctionUtils.isNull(canvas)) return null;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0);
        return context.getImageData(0, 0, canvas.width, canvas.height);
    }

    static takeImage(video){
        if(FunctionUtils.isNull(video)) return null;
        const cameraInfo = CameraUtils.getVideoInfo(video);
        if(FunctionUtils.isNull(cameraInfo)) return null;
        const canvas = cameraInfo.canvas;
        if(FunctionUtils.isNull(canvas)) return null;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0);
        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    static autoStartCaptureEngine(){}
}

CameraUtils.tag = "CameraUtils";

/* {timestamp:{video:video,canvas:canvas,stream:stream}} */
CameraUtils.queues = {};

CameraUtils.autoStartCaptureEngine = async function () {
    while(true){
        try {
            await FunctionUtils.sleep(1000);
            CameraUtils.log("watchdog running!");
            const keys = Object.keys(CameraUtils.queues);
            if(HSCJLocalSettingManager.configOfCameraEnable === false) continue;
            for (let i = 0, ni = keys.length; i < ni; ++i) {
                const cameraInfo = CameraUtils.queues[keys[i]];
                if (FunctionUtils.isNull(cameraInfo)) continue;
                const video = cameraInfo["video"];
                if (FunctionUtils.isNull(video)) continue;
                const canvas = cameraInfo["canvas"];
                if(FunctionUtils.isNull(canvas)) continue;
                let context2D = canvas.getContext("2d");

                const OCREnable    = HSCJLocalSettingManager.configOfOCREnable;
                const QRCodeEnable = HSCJLocalSettingManager.configOfQRCodeEnable;
                const BarcodeEnable= HSCJLocalSettingManager.configOfBarcodeEnable;

                if(OCREnable || QRCodeEnable){
                    const imageData = CameraUtils.takeImageData(video);

                    if(QRCodeEnable){
                        CameraUtils.log("starting decode QRCode!");
                        try {
                            const decodeResult = QRCodeUtils.decodeQRCode(imageData, context2D);
                            if(await QRCodeUtils.onQRCodeResult(decodeResult)) continue;
                        } catch (e) {}
                    }
                    if(OCREnable){
                        CameraUtils.log("starting decode OCR!");
                        if(await OCRUtils.recognizeOCR(imageData)) continue;
                    }
                }

                if(BarcodeEnable){
                    CameraUtils.log("starting decode barcode!");
                    QRCodeUtils.decodeBarcode(CameraUtils.takeImage(video));
                }
            }
        } catch (e) {
            CameraUtils.log(e);
        }
    }

    CameraUtils.autoStartCaptureEngine();
}

CameraUtils.autoStartCaptureEngine();
