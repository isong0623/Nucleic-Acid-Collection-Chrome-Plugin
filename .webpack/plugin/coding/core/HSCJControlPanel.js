/**
 * 插件控制面板
 */
class HSCJControlPanel{
    static assignValue(id,num){
        const ele = document.getElementById(id);
        if(ele == null) return;
        ele.value = num;
    }
    static assignText(id,num){
        const ele = document.getElementById(id);
        if(ele == null) return;
        ele.innerHTML = num;
    }
/*********************************************************** DOM元素操作 ***********************************************************/
    /* 控制面板DOM组件 */
    static getDOM(){}

    /* 相机整个DIV控件 */
    static getCameraPanel(){}
    /* 获取相机控件 */
    static getCameraEle(){}
    /* 获取绘制渲染控件 */
    static getCanvasEle(){}

    /* 设置脚本按钮样式 */
    static setScriptBtnEnabled(run){
        const btnControlScript = document.getElementById("btnControlScript");
        if(btnControlScript === null) return;

        if(btnControlScript.style==null) btnControlScript.style = new CSSStyleDeclaration();

        const enable = !(run === true);
        if(enable === true){/*已运行*/
            btnControlScript.style.background = "#FF6F00";
            btnControlScript.innerHTML = "启动脚本";
        }
        else{
            btnControlScript.style.background = "#ff1f1f";
            btnControlScript.innerHTML = "停止脚本";
        }
    }

    /* 设置水印试管人数 */
    static setTubCountDisplay(num){}
    /* 获取当前试管编号 */
    static getCurrentBarcode(){}

    /* 设置面板已采样管数 */
    static setCountOfLocalSamplingTubs(num){ HSCJControlPanel.assignText("countOfLocalSamplingTubs",num); }
    /* 设置面板已采样人数 */
    static setCountOfLocalSamplingNums(num){ HSCJControlPanel.assignText("countOfLocalSamplingNums",num); }

    /* 设置离线模式按钮样式 */
    static setOfflineBtnEnabled(run){
        const btnControlOfflineMode = document.getElementById("btnControlOfflineMode");
        if(btnControlOfflineMode==null) return;

        if(btnControlOfflineMode.style==null) btnControlOfflineMode.style = new CSSStyleDeclaration();

        const enable = !(run === true);
        if(enable === true){/*已停止*/
            btnControlOfflineMode.style.background = "#FF6F00";
            btnControlOfflineMode.innerHTML = "启动离线模式";
        }
        else{
            btnControlOfflineMode.style.background = "#ff1f1f";
            btnControlOfflineMode.innerHTML = "停止离线模式";
        }
    }
    /* 设置离线待上传剩余试管数 */
    static setCountOfRemainingOfflineTubs (num){ HSCJControlPanel.assignText("countOfRemainingOfflineTubs",num); }
    /* 设置离线待上传剩余人数 */
    static setCountOfRemainingOfflineNums (num){ HSCJControlPanel.assignText("countOfRemainingOfflineNums",num); }
    /* 设置离线上传失败试管数 */
    static setCountOfFailedOfflineTubs    (num){ HSCJControlPanel.assignText("countOfFailedOfflineTubs",num); }
    /* 设置离线上传失败人数 */
    static setCountOfFailedOfflineNums    (num){ HSCJControlPanel.assignText("countOfFailedOfflineNums",num); }
    /* 设置当前要处理的试管编号 */
    static setCurrentProcessingOfflineTubs(num){ HSCJControlPanel.assignText("currentProcessingOfflineTubs",num); }
    /* 设置处理中试管成功人数 */
    static setCountOfProcessingSuccessNums(num){ HSCJControlPanel.assignText("countOfProcessingSuccessNums",num); }
    /* 设置处理中试管失败人数 */
    static setCountOfProcessingFailedNums (num){ HSCJControlPanel.assignText("countOfProcessingFailedNums",num); }
    /* 设置处理中试管等待人数 */
    static setCountOfProcessingReadyNums  (num){ HSCJControlPanel.assignText("countOfProcessingReadyNums",num); }
    /* 设置离线进度条进度 */
    static setOfflineProgress        (progress){ HSCJControlPanel.assignValue("progressOfUploadOffline",progress); }
    /* 设置离线进度百分比 */
    static setOfflineProgressPercent  (percent){ HSCJControlPanel.assignText("percentOfUploadOffline",percent + "%"); }

    /* 获取服务器延迟 */
    static pingServer(){}
    /* 设置服务器延迟 */
    static setServerPing(ping){ HSCJControlPanel.assignText("_hscj_control_panel_serverPing",ping + " ms"); }
    /* 设置服务器状态 */
    static setServerState(state, color){
        const ele = document.getElementById("_hscj_control_panel_serverState");
        if(ele == null) return;
        ele.innerHTML = state;
        if(ele.style == null) ele.style = new CSSStyleDeclaration();
        ele.style.color = color;
    }

    /* 设置统计总试管数 */
    static setCountOfSummeryTubs(num){ HSCJControlPanel.assignText("countOfSummeryTubs",num); }
    /* 设置统计总人数 */
    static setCountOfSummeryNums(num){ HSCJControlPanel.assignText("countOfSummeryNums",num); }

    /* 设置面板图片文字识别激活状态（本地OCR服务是否可用） */
    static setOCRState(state){
        const ele = document.getElementById("_hscj_control_panel_stateOfOCR");
        if(ele == null) return;

        if(ele.style == null) ele.style = new CSSStyleDeclaration();

        if(state){
            ele.innerHTML = "✓";
            ele.style.color = "green";
        }
        else{
            ele.innerHTML = "✖";
            ele.style.color = "red";
        }
    }
    /* 设置面板二维码识别激活状态（摄像头是否开启） */
    static setQRState(state){
        const ele = document.getElementById("_hscj_control_panel_stateOfQR");
        if(ele == null) return;

        if(ele.style == null) ele.style = new CSSStyleDeclaration();

        if(state){
            ele.innerHTML = "✓";
            ele.style.color = "green";
        }
        else{
            ele.innerHTML = "✖";
            ele.style.color = "red";
        }
    }
    /* 显示或隐藏相机 */
    static setCameraVisible(visible){
        HSCJLocalSettingManager.setCameraVisible(visible);

        const imgHide  = document.getElementById("_hscj_control_panel_hideCamera");
        const imgShow  = document.getElementById("_hscj_control_panel_showCamera");
        const divState = document.getElementById("_hscj_control_panel_cameraState");
        const camera   = HSCJControlPanel.getCameraPanel();

        if(imgHide ==null) return;
        if(imgShow ==null) return;
        if(divState==null) return;
        if(camera  ==null) return;

        if(imgHide.style == null){
            imgHide.style = new CSSStyleDeclaration();
        }
        if(imgShow.style == null){
            imgShow.style = new CSSStyleDeclaration();
        }
        if(divState.style == null){
            divState.style = new CSSStyleDeclaration();
        }
        if(camera.style == null){
            camera.style = new CSSStyleDeclaration();
        }

        const isHide = camera.style.display==="none";

        if(visible){/*已隐藏，需要显示*/
            imgHide.style.visibility = "visible";
            imgShow.style.visibility = "hidden";
            divState.style.backgroundColor = "red";
            camera.style.display  = null;
        }
        else{/*已显示，需要隐藏*/
            imgHide.style.visibility = "hidden";
            imgShow.style.visibility = "visible";
            divState.style.backgroundColor = "green";
            camera.style.display = "none";
        }
    }
/*********************************************************** 功能性操作 ***********************************************************/
    /* 语音播报 */
    static speak(msg,enqueue = true){}

    /* 是否是采样页面 */
    static isSamplingPage(){}

    /* 显示本地采样记录 */
    static showLocalSamplingRecords(){}
    /* 保存本地采样记录 */
    static downloadLocalSamplingRecords(){}
    /* 删除本地采样记录 */
    static cleanLocalSamplingRecords(){}
    /* 更新面板采样信息 */
    static updateLocalSamplingRecordsDisplayInfo(){}
    /* 判断脚本是否正在运行 */
    static isScriptRunning(){}
    /* 更新脚本按钮状态 */
    static updateScriptButtonState(){}

    /* 显示离线采样记录 */
    static showOfflineSamplingRecords(){}
    /* 保存离线采样记录 */
    static downloadOfflineSamplingRecords(){}
    /* 删除今日本地采样记录 */
    static cleanOfflineSamplingRecords(){}
    /* 更新面板离线采样信息 */
    static updateOfflineSamplingRecordsDisplayInfo(){}
    /* 设置当前处理的条码编号 */
    static setCurrentProcessingOfflineTubNo(tubNo){ }
    /* 获取正在处理的离线条码编号 */
    static getCurrentProcessingOfflineTubNo(){ }
    /* 判断是否是离线模式 */
    static isOfflineMode(){}
    /* 更新离线模式按钮状态 */
    static updateOfflineButtonState(){}

    /* 判断对话框是否打开 */
    static isDialogOpen(){}

    /* 统计信息 */
    static updateSummery(){}
    /* 服务器状态信息 */
    static updateServerState(){}
    /* 更新设备支持信息 */
    static updateSupportInfo(){}

    /* 更新试管信息 */
    static updateTubInfo(){}

    /* 提交采样成功后的回调 */
    static onDataChanged(){}

    /* 启停脚本点击事件 */
    static onScriptControlClicked(){}
    /* 启停离线模式点击事件 */
    static onOfflineControlClicked(){ }
};

HSCJControlPanel.tag = "ControlPanel";

HSCJControlPanel.log = function (msg){
    LogUtils.log(msg,HSCJControlPanel.tag);
};

HSCJControlPanel.warn = function (msg){
    LogUtils.warn(msg,HSCJControlPanel.tag);
};

HSCJControlPanel.getDOM = function (){
    let child = document.getElementById("idOfHscjControlPanelParent");

    if(HSCJLocalSettingManager.isBreakLineMode()){
        HSCJLocalSettingManager.setOfflineMode(true);
        HSCJControlPanel.setOfflineBtnEnabled(true);
    }

    if(FunctionUtils.isNull(child)){
        const div = document.createElement("div");
        div.innerHTML =
    `
        <div id = "idOfHscjControlPanelParent" onselectstart="return false" style = "font-size:14px;border-radius: 25px; background: #ffffff; margin-top: 5px; padding: 20px; width: 400px;height: 300px;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none; ">
            <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAFPFJREFUeF7tnXuYXHV5x7/v2SU0NEQSds7EGGr7EIWCd+VS0AqCsVwjVCioiICgRSLEZOfMJlwWgeycSTBoKCrEgqjQEiuKXAoJYlvAcnvUVqtUbK0NuHMmJiFQYtbdefucyQZDsjtzbr9zfr9z3vM8efhjf+/t+3s/vDNnzoUghyggCkyqAIk2ooAoMLkCAoh0hyjQQQEBRNpDFBBApAdEgWgKyASJpptYFUQBAaQgGy1lRlNAAImmW2pWZYffyMCHGfhTAt4O4EUA9zDh+80arUktkYIGEkA03viyw0MMVDukuBaM5V6d1mpchtGpCSCabp/tsAugEig9xqBXpysDrZVFoRQQQELJlc7icpXfw4wHQ0UTSELJFXSxABJUqRTX2Q4/AuCI0CEFktCSdTMQQLoplMHf7Sq/AMa0SKEFkkiyTWYkgCQqZ3xnswb4oFYLP4nlSSCJJd/OxgJIYlIm46ivwgdYhJ/F9iaQxJbQdyCAJCJjsk5sh7cA2Du2V4EktoQCSGwJk3dgV/lhMI5MxLNAEktGASSWfGqMyw6fwcDtiXkXSCJLKYBElk6tYcnh2wk4I7EoAkkkKQWQSLKpNxo/m3UHgIMTiyaQhJZSAAktWXoGAkl6Wk8WSQDJfg86ZiCQZLtBAki2+geKLpAEkknJIgFEiazJOxVIktc0iEcBJIhKmqyxK3wFCIOJpiNf3DvKKYAk2m3qnCmBY0e6AsmkGyeAqOvpxDzbDl8OQO0NUQLJhPslgCTWxmocpQKHTBKZIGraV61Xu8KXgfAZtVF28S6T5BWCyARJtfuCB8sEDpkku22QABK8Z1NbWXb4UgauSi3gRIFkkrRVEUAy7cLdg2sBh0ySlzdGANEIkHKVlzLjao1SAgo+SQQQTbqxXOGlTJrBIZNEPmLpwEfZ4SUMXKNDLpPmUNBJIhMk464sObyEdIejwJNEAMkQkFKVB4ixLMMUwocu2CQRQMK3SCIWpQoPEBkGRwEniQCSSLuHc1JyuErAUDgrzVYXZJIIICn3XS7gKNAkEUBSBKRUZYcYtRRDqg+V80kigKhvoXaEUoUdopzBUYBJIoCkAIjtsP8iHP+FOPk9cjpJBBDFLVsIOHI8SQQQhYDYVe4Ho64whH6uczZJBBBFLWZXuB9UMDhyOEkEEAWA2A4vBrBcgWtzXOZkkgggCbecwLGToDmARABJEBC7yovAWJGgS/NdGQ6JAJJQC9oVXgQSOCaU02BIBJAEALEd/jSAaxNwlV8XhkIigMRsSYEjhIAGQiKAhNjfXZeWq7yQGZ+N4aJ4poZBIoBEbFGBI6JwvplBkAggEfa5XOFLmLAygmkUkxcAbPL/MbCJgBn4/b/4r4qOklESNoZAIoCE3OwU4PgvMNaxhXUjwLrna+TDMeExZyHPHNkDxwHj/wgzQ5aT7XIDIBFAQrRI2eGLGbguhEmYpU8z4/pmna4PY7Rj7b5L+TW9o7iICReBMS2Kj0xsNIdEAAnYFQrhGCXgyhFg1SaXng+YzqTL2m+iGsMCED4R11dq9hpDIoAE6IJShT9FhM8FWBp2yYZWC+dsWE53hzXstt64S140hUQA6dJpCuF4ZvpLeMMzq2hbt2aP+veSw+8k4F+i2qdupyEkAkiHLihV+SJirFLQKD/wXHqbAr+7ueyr8N4WYUsasRKJoRkkAsgku2pX+EIQ/iaRTX+lk+FthIM6nZ1KOmZflY+yGA8l7VeZP40gEUAm2GW7wp8A4QsqGoAI723UaJ0K3518GnelsSaQCCC7dFXZ4fMZuFFFAxPj+kadFqjwHcSn7fAjAI4IslaLNRpAIoDs1AnlCp/HhNWKmmNzi3H4hjo9rch/V7flfj6TLdzWdaFOCzKGRAAZb4ZShc8hwt+q6g0Grm66dJkq/0H92g7fO/7Le1CT7NdlCIkAsv2hbmcT4RaVndDDOOjXdfqpyhhBfNsV/hAIXwuyVqs1GUFSeEBshz8M4KuKmyG107pd67iA97D3wTBMu27LLywDSAoNSNnhDzLw9a5NFX/BSs8l/65DLQ67yreCcZYWyYRNImVICgtI2eEzGLg97P5EWd8iHL2hRt+LYqvCxrjfRXYVIUVICglIqcqnEeMOFc03ic+3eC79KMV4HUPZDr8ZwA91ySdSHilBUjhA7Cr/JRjfiLQpEY16gdc+59KvIponbjbb4T8aBf4nccdpO0wBkkIBYlf5FDC+mfY+thjTN9TJvzNQi8O467M6qaYYksIAUh7gk7mFb2fRod5U7IFBGs0i9oQxB7nX3orfaZNP3EQUQlIIQMr9fCJb+E7cfYhqb1mwh4eoGdU+abtZA1xqteAl7TdTf4ogyT0gpX4+nizck+XmtSwcsGGI/jPLHHaO3TfAr7dayOySF2U6KIAk14CU+vkvyMJ9yjYkoGOycHhjiB4LuFz5svIAH8Yt/KvyQFkESBiS3AJiV/i9IDyQxR7tGpMJ5zVrpOw6r7A1lqp8LjG+HNbOmPUJQpJLQMoVPoYJqd9zMWkDMW736vRBXRrMrvBtIJypSz5K8kgIktwBMqvCR7cI31UienSnTW8qZmtxJmv7Gazn/Gs0o5djiGUCkOQKkJLDf07AP+m4fQSc3HApszNpOzQpO3wSA3fpqJGSnGJCkhtAtH+CB+EBr0bvU9IEIZzaVb4fjHkhTMxfGgOSXABiO+zfRurfTqr3wfiIVyfVl9ZPqoFd4bNAuFVvkRRlFxES4wEx7JTl455Lhylqga5ubYf9U82Hdl2Y1wURIDEakFlVPqTFeNyw/bzFc+mctHO2Hb4ZwEfTjqtdvJCQGAtIX5XfbjGe1G4DAiREhKFGjZYEWJrIknKVlzFjIBFneXASAhIjASkt4bfQGH5g8l4R49hGnR5UXYN2vwmpLjio/4CQGAeIvZjfhB5oc/NR0P2YaJ3qX9hz/4t5HPF9W8Y8r05rO7kxCpDyYn4D9+Df4+qilT3jhlFgaGOd1ieV18wKz+kFBkC4MCmfOfWz1nOp4ylvYwCZtYgPavXiJzndqA0AbqExfKWxgn4ctcbx/4GcPf5lvC+qn0LZEU71anTnZDUbAUhfhQ+wCD8rwMaNgvH3AO7z6hT4aSvtZ135r2Ej/BWA3gLolFyJXb6LaA9IqZ9fRxa0uZciuZ3p4omxEYQ1IPx8/OWdm1rAJguYwcCM9ss8Ga8D4zQjn3GVmpCdAxGwpuHS6UZOELuf94eFZzTRUtLQTQHGIAinATg4cmpdrrTWdoLMqvIftxj/HblwMcy3AuMfjdrvZGy1H+EUFRLHc6lu1ATR/LE0TwF4NYDZ+e5Arau7wnPpMzsyjAMJWZjfGKJJr27WboK0T1ES/lej7WkAqDPw5J4jeGL9Strq5+Z//CMLhzDheGMf46mRyCFSeQUcMSF5ynPpHZ1iawVI3xJ+tTXWvplHj4PwwFgPzv3NNfRsp4SMe6OsHuqGz4JxuVenqyYzDDtJGHhX06WHjQDEXsJljGE4vGqKLCyc4g3Rt8J4tyv8KAh/FsZG1gZUoAscu0ySawC8v5NnJpzerNGabtG1mCC6PaeJCQuaNbq+m3i7/X377az/B2BKaFsxmFQBAi5ruHR1GInKFb6EgXNAeNNOdr8EcOeUESzd8VG5m8/MAZkzyDNHtuI33RJN8e/f8FzyTx1GOvocPsEC7o5kLEa7KRAFjp2dlBfzH1IvDhrpwfDGayj0d9tMAdlnkPeZshWbNOuLIz2XHo2Tk+2wf+lCxxEfx39RbIlwaaNG/selzI7MAJm5gKf37oXnM6t84sDbpoxgRtDxO1nuJYevIuBSzWozKh1iXNqoZwuHL1gmgJQu5Gm0N7R52vlOndP1tF+QLrMrfCoI/xBkrazZXQECljZcWqaDNqkDMmchTx2Zgpd0KH7XHJixulmn8+Pmtu9Sfk3PKBK7fD1uPibZM7C0qQkcqU+QuQt4zy174bfabhjjRq9OH4+bX1+FZ1uEjr+dxI2RR3smLGnWaEin2tKbIP7bVWdgRKfiJ8glkY9YZYfnMxDqNxTNdVGeHjOWNOt6wZHeBBlky96KMeUqJxDgtyPYd8tK2hjHVanKVxNjaRwfRbJlYKDpUk3HmlOZILbDrGPxE+bU5Q6zIHXYDt8PFOzphUGEmWCNznCkMkFsh/0fZ+ZE1C8Ls194Ls2NGtiu8BUgDEa1L5IdE6rNGrk616x0gpQdvoPRvqHFtONOz6VTwyY9exH3jfZCm1ethc0/zfXMqDbresOhdILYDi8HsDhN0ZOMxcDxTZdCvZ3Kdth/97j/DnI5OivQ8SYlncRTMkHy8jGDgFXbpuLyzYO0udOm6fAeRJ2aqksuxsChZIK0n7BB+JpBG9YtVf+e+C+B8aPevfDIc4PU/pGz/aQV4FAmvJuA87o5kb+3r9uoeDXyP1kYcyQ6QcqL+TC2cG/On7LhP/LUv922bMwu65Aoo+LVzYIj0QkyZyHPHJmCewFk9nh/HfpAcphQgX7PpRUmapPYBClV+SZifMxEESRnpQoYC0diE6Rc5WOZ0fEhwEq3QJzrqQBhsVeja/VMLlhWiUyQssN3M3BCsJCyqhAKMBZ7dbPhSGSC2AN8FloFfe9dITo9UpGLPJc+G8lSM6PYE6Tk8BMEdHy2kGY1SzpqFcgNHLEniO3wRwB8Ra3e4t0UBYjw6UaNVpqSb5A8Y02QksMPEXBUkECyJt8K5BGOWBNE7rvOd8OHqY4YCxt1ui6MjSlrI0+QUpW/Q4wTTSlU8lSjQJ7hiDxBSlWeS4yfq5FcvJqiAAGXNFz6nCn5Rskz0gQpObyAgM9HCSg2+VCgCHBEniC2w/41V8flY6ulirAKMOPiZp0K8T/I0BNEPl6Fbad8rS8SHJEmSMnhTxIQ/snn+eqTQlYT+an3BqsVeoLYDvvPe5pvcM2SehQFGJ/06nRDFFOTbcIBcgf32E9hC4C9TC5acg+pAOOvvTp9MaRVLpaHAqQ0wMdTC/fkonIpIpACBFzQcOmmQItzuCgUIOUqL2PGQA51kJImUMC/Aa5Rpy8XWZxQgNgO+xcm+hcoypFzBZhxbrNON+e8zK7lhQVkHYBjunqVBUYrwIyPNuskV2mHfYFOyeGfEnCg0bsvyXdT4CzPpTw9tqlbvR3/HnaC+Gew9o4VUYy1VYCADzVcuk3bBDNILDAg2r/8JgPx8hSSgDMbLv1dnmpKopbAgOj2LvMkihcf2xVgwunNGq0RPXZXIDAgdj/vDwv+YzjlyJMChA94NZIXjk6yp4EB6evnt1kWnspTbxS+lgReFpR3DYMDUuWjLMZDeRekKPWRhfmNIbqrKPVGrTM4IDJBomqsnR21cFJjOd2tXWIaJhQYEPkOouHuRUiJWzihuZz8G97kCKBAYEDkLFYANTVfwi0c11xO/6h5mlqlFxgQ+R1Eq30LnwxjnlcnecB4SOUCA+L7tR1+HsD0kDFkecYKEOPYRp0ezDgNI8OHBeTHAA42stKCJm0x3jNcJzn7GHH/wwLif359X8RYYpayAgy8u+nSP6ccNlfhQgFScni1vLDSjP1n4F1Nlx42I1t9swwFSF5e76zvdiSW2ZGeS48m5q3AjkIBMqvKh7QYjxdYL+1LJwuHN4boMe0TNSTBUICMn8kallcg67m7FuHQ4Ro9oWd2ZmYVHpAq3wLG2WaWm9+sW4R3bKiRXEya8BaHBqTs8PkM3JhwHuIuhgLcg7c2l9EPY7gQ00kUCA1I+5oswtMg9IiqGigwhjd7K+jfNMgklymEBmT8e8idAN6fS0UMKorG8MbGCvJ/vJVDkQKRAClV+DwirFaUk7gNoIA1ioOHr6X/CLBUlsRQIBIg5cVscw+eBrBPjNhiGlGBFuPADXXy9ZdDsQKRAPFzKlX4JiJ8THF+4n4XBbiF1zeXk7z+LqXOiAyI7fARAB5JKU8J4yvQwlxvOf1CxEhPgciAtKeIw7cTcEZ66RY3kkX4k+Ea/bK4CmRTeSxA7CrPA+P+bFIvTtRe4LXPufSr4lSsT6WxAPHLsKv8bTBO1qekfGUyythvY53W56sqc6qJDcisCh/dInzXnJLNybTVg9kbltGvzck4f5nGBqQ9RRz2X8/18fzJk2FFPZjlLaNGhhlI6LCvP5hMsX0H+MCeFr4vv4sk01OWBXt4iJrJeBMvcRRIZIK0p0iFrwBhME4yYgtMmYp91w/SRtFCDwUSA2T8o9Y3AZyiR2nmZTEyFTM2D9Jm8zLPb8bJArL9CfD+ad/98yuZmspGX8KrNq4i/wVFcmikQKKAtKdIlU8Bw58kcgRUgF/A3s0b6MWAy2VZigokDoh8Hwm3e1NGsNf6lbQ1nJWsTksBJYCMQ/IlEC5IqxAT40x/CX/wzCraZmLuRclZGSC+gCWH7yLgpKKIGaZObxOm4Eb6XRgbWZu+AkoBGYfkIQKOSr80fSN6U9GDQWrpm6FktkMB5YC0P245/C0A80V2rPdc2k90MEeBVAAZh8QFUDFHmmQzJWBNw6XTk/Uq3lQrkBogBT+7tcJzqV/1Zor/5BVIFZBCQsIY9Op0ZfJbJx7TUCB1QNqQbP8xcXmuf3Fn+NdTfcqr09fT2EiJoUaBTABpQ7L9shQfkjxeu/UYjeHixgp5iLSatk3Pa2aA7Chx/CrgS/JyqTwTVu+5Dc76lXJFbnptrC5S5oD4pY3fT+JDYuxNVwTcA8J1jRqtU7dd4jltBbQAZEfR7dt3LVxi0j3uDDxJFj7vDdFX0948iadeAa0AefljV5XnMeMcnR8pxMD3CLjZc+lW9dskEbJSQEtAXgbF4SPaoBA+oMt3FCbcTS3c7NVJLunPqmtTjKs1IDt08J8F3LJwEhFOBOOkDF69cB8D94FwX7NGz6S4PxIqYwWMAGRnjcZPD88j4GgGjgbQp0DDlwCsZWAtCPcLFAoUNsSlcYDsqmvJ4XcS4xgm7EfAHGz/518QOD3AHrzAwLMEPAv/v4RnW4SHm2/F/TidxgLYy5KcK2A8IJPtz9wFvOeL0zC9NYrpLeBV6MF0jGGLBTxv9WLLtBexRW5Wynl3J1BebgFJQBtxIQpAAJEmEAU6KCCASHuIAgKI9IAoEE0BmSDRdBOrgigggBRko6XMaAoIINF0E6uCKCCAFGSjpcxoCggg0XQTq4IoIIAUZKOlzGgK/D92jYAj21NpPAAAAABJRU5ErkJggg==";
                 style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;"/>
            <span style="font-size:18px;font-weight: bold;color:#000000; position: relative; top:-8px;left:13px;text-shadow:5px 5px 5px rgba(0,0,0,0.3);">青岛核酸采集辅助插件控制面板V2.0</span>
            
            <hr width="100%"/>
            
            <div>
                <button id = "btnControlScript" style = "background: #FF6F00; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-10px;left:0px;">启动脚本</button>
                <button style = "background: #651fff; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-10px;left:0px;"> <span>已上传采样记录</span> </button>
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:0;left:-5px;cursor: pointer;"
                     title="保存已采样记录"
                >
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:0px;left:-20px;cursor: pointer;"
                     title="清空已采样记录"
                >
                <div style="font-size:16px;font-weight: bold;color:#304ffe; position: relative; top:-33px;left:260px;">
                    <span>共 </span>
                    <span id = "countOfLocalSamplingTubs">0</span>
                    <span>管 </span>
                    <span id = "countOfLocalSamplingNums">0</span>
                    <span>人</span>
                </div>
            </div>
            
            <hr style = "position: relative; top:5px;" width="100%"/>
            
            <div>
                <button id = "btnControlOfflineMode" style = "background: #FF6F00; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-52px;left:0px;">启动离线模式</button>
                <button style = "background: #651fff; border: 0; margin: 0; padding: 5px 10px; color: #fff; font-weight: bold; border-radius: 3px; cursor: pointer;position: relative; top:-52px;left:0px;"> <span>离线采样记录</span> </button>
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:-43px;left:-5px;cursor: pointer;"
                     title="保存离线待上传记录"
                >
                <img src = "data:image/png;base64,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"
                     style = "max-width:30px; max-height:30px;margin_left:10px;margin_bottom:10px;margin-right:10px;position: relative; top:-43px;left:-22px;cursor: pointer;"
                     title="清空离线记录"
                >
                
                <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABcRAAAXEQHKJvM/AABvSElEQVR42u3dd4AU5f0/8Pczs+V6gYOjVwEFxIIFe+8aFVEToyaWxBKjsX8NxvaLMUaNGhP1+1VjNyYIsWMFpSgKiFjpvcPdcXVvd2eez++P2Z3bvdurXNkb3q989yu3dWa2vOd55pnPo0REQERERN2a0dULQERERLuOgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDzA19UL0FpKqa5eBM8yTROWZbXqMW15P0Skq1eVOllnfG9b+7lK19+S1qxHuq6DF7Tl97CrsYVORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAQx0IiIiD2CgExEReYDnA11EdsvLww8/3Opt1a9fv65+u4ioA3X17xJ/DztWt5uchdKLVyZaSddJLtJxwhGvvOdtWY/Wbl+vbCvqHjzfQiciItodMNCJiIg8gIFORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAazlnkI61vU+88wz8frrr3f1YnSJtrwfra2h3Rk1t9uyHulYO7wz3o90/A62RWdsq3Rch462O/8eNoUtdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewMlZaJd0xsQNXplwxCvr0VnLlY7LtLtOMkPdA1voREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQewljvtkrbUAW9tfet0rU/uFa3dvty2ROmJLXQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIA1jLPYUzzzyzqxehgQEDBnT1IhDRboi/h90HAz2F119/vasXwdNaO7lHWyZnactj0vE1Wssrk+V0xrbtjG3lBfw97D7Y5U5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIP8Hzp10ceeaSrF6FLzJo1q9WPqays7OrFJqIOxN/DluuOv4dK2lLQuCsXeDespdxZTNOEZVmteky61vXma/A1dofX4O9hx2nL72FXY5c7ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdHKxLjQRkaM7/h52u9nWutlcMp7XlvejtV+UzniNtuiOX3gvS8fPVUf/XvH3kBKxhU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5QLer5d4Z2lKju7U1ldO1DnhnrIdXttXuKl1roHfG5yQdP7vpWs893erep+sytSe20ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5QLebnGV3nuygM9bDKxOheGWih3R8PzpjQp622F2/t155P9Lxs97dsIVORETkAQx0IiIiD2CgExEReQADnYiIyAMY6ERERB7AQCciIvIABjoREZEHMNCJiIg8gIFORETkAQx0IiIiD2CgExEReUC3q+XeGdK1Xnxrlytd12N3la41t9OxhrZXPrte+X6k6/uRjp/drsQWOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPYKATERF5AAOdiIjIAxjoREREHsBAJyIi8gAGOhERkQcw0ImIiDyAgU5EROQBDHQiIiIPUOKV2QOaWslWFvDfDTZJo9JxsoPOmLQhXV+jM6Tje94Wu+tENm2Rrp/FjuaV72xj2EInIiLyAAY6ERGRBzDQ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NWtWqx9TWVnZ1YtNRERtpKSb1cJj2dCOY5omLMvq8NdJx/ewm30NGtUZpV935/VIxzKr6bhMbVmudH2N7sTzLXRKP1754U3HZfJKbf10/XHvjLBNxyDsjB2szvgcen0HgMfQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdHKlYwlQIiJqmW43OQsRERE1xBY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA52IiMgDGOhEREQewEAnIiLyAAY6ERGRBzDQiYiIPICBTkRE5AEMdCIiIg9goBMREXkAA70bCIfDsCyrqxeDqMVs20YkEunqxSAPERFUVlZ29WKktd0i0D/77DNMnz4dtm03uK2yshI33XQTbrrpJrz77rspH//6669j2rRpWLp0acrnSGXu3Ll49dVX8eqrrzb6vKkMGTIEOTk5yMnJweuvvw4AuO+++zB69Gi88sor0Fp39eZMSyUlJe52y8nJwY8//tiixyVu7//7v//r6tVIe/fffz/ee++9Zu/30ksvoaioCBMnTsTTTz/d7uEejUZb/F0EgDlz5uDJJ5/Ek08+2aL3edq0aTj88MPdy7p161r0OieffDImTJiACRMm4Pe//327rnNn+X//7//h/vvvb/Q79Oqrr+KVV17Bpk2bOnxZLMvClClTcMkll6Bfv3447bTTunrzpDXPz4deWVmJcePGYc2aNejbty9+9atf4e6773Zv37JlC/r27QsAuPXWW/HnP/+5wXNMmDABX3zxBQDglltuwf3339/s606aNAlTp04FAIwaNQpLlixp0fIWFRWhpKQEADBlyhQccsghGDlyJGpqagAA++23H/7617/i6KOP7upNm1Z27NiBXr16uX9/++23GDt2bLOPS9zejz32GK655poWvd7GjRvxm9/8pl3X4dhjj8W1116b8rbq6mqEQqGO2nyunj17QimV8rbS0lL069cP4XAY48ePxx/+8AeceeaZKe87btw4fPvttwCA0aNH47vvvmv0eVsqFAph9uzZeOONN/Cf//wHV111Fe65554WPfaaa67BP/7xDwCAaZrN9nj9/e9/x29/+1v37x9//BF77rlns6+T+Hk655xz8Nprr+3SOne2nTt3ol+/fu5n7eijj8bMmTPd20UEAwcOxMaNGwEAxx9/PD788MMOXaYDDjgACxcudP/++OOPceyxx3b1pkpLvq5egI4kIrj88suxZs0aAMDmzZtRXFzc6udZuXKl++8RI0Z06jqsW7cOY8aMwfz58wEAixYtwn333ZdWgX7ZZZdh69atHfb8Dz30EEaNGuX+HQqFkr7gAFBeXp7096JFi7Bz507377y8PPTq1SvpvQSQ9MO+atUqzJkzp8HrH3744Q2uq6ysxBtvvNGu61lQUNDobTfeeCP+93//t11fL5WysrJGl+P5559HOBwGACxcuBBTpkxJGej//ve/3TAHgBtuuKHRMLcsCz5fw58hrTVWr16Nb7/9FvPmzcOsWbOwYMECRKNR9z733nsvjj/+eBx55JHudR999BEAJ2io9V544YWkHcdjjjkm6fZPP/3UDXMAOOigg9r0OtOmTWtxb+PYsWOTvu9//OMfUVpa2qLHDh8+HPvtt1+nbb+u5ulAv+222/Cf//zH/fvUU0/F1VdfjYKCAlRVVeGFF15osKf3yiuv4OKLLwbghIRlWdixY4d7+8iRI3dpmT755JMm99qrq6vdfz/zzDMYPnw4DjroIBiG4fYSZGRk4JprrsFtt92G/v37d/Vmxscff4y1a9d22PPffvvtSX+vXbsWRxxxRJOPib+HcQcffDAuvPDCpFZXfQ8//DAefvjhBtdHo9GUobM7EZGkrmqlVMou5crKStx4441J11177bW47rrrGtxXa42ePXvib3/7G84++2z3+j/+8Y+477773F6pxmitcfvtt+PTTz+FUgqPP/44rrvuOmitcc8992Dy5Mldvdla5fzzz2+wY9qebrzxRpxwwgmN3m5ZFv7617+6f/v9fvz6179Ouk+8lwNwPgO//OUv27Qs5513XqsOmSSaOXNmUq9BU6644go8+eST7bUJ055nf6Uee+yxpK7xkSNH4uWXXwbgfHBt2065h6i1dj9oIoLFixcn3b733nvv0nJ9/fXXSV+KpjR2rPLNN98EAFx++eVpEejk9CLU//FrzqpVq7DPPvt09aK3yH//+9+kw0YXXnghRo8e3eB+t9xyS1ILDkCTwbxhwwZMnDgR8+fPxwEHHAAAOPHEE/GHP/yh0cecfPLJOP7443H88ce722/NmjW444473B6X22+/HUuXLsXTTz+NQCDQrtviq6++wqxZ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fvGLRtf5iiuuSLrvli1bZJ999pG//e1v7n1GjRrl3v7SSy/JvHnzZNy4cbJ27VoREbn99tvd288++2wREbnxxhuTnresrExERCzLkjvvvDPptmOPPVYef/xxuf3225M+63369JEhQ4YIADnwwANl6tSpYhiGe/uoUaPk2WefTfps+/1+mT17dsp17dmzZ4u+n/HLokWLmv3M/OY3v0n6zqXyr3/9S5599ll59tln5cILL2zwuxG/raKiotHXSVz2c845p82f8aYEg8GkZfvxxx/b/Fw33XRTym26fft2EREpKytzv0fxy2effSZlZWVJ1/385z9v8zL84he/aNX73dzl2Wef7ZDt3h14soUet3379qRCHQMGDMB1112HlStXJo1GTSUSiSS1PCZMmOAem09sFd56660tKmDSGMMwMGHCBPfvxNccOXIkDjzwQABOd1lLWvWDBw/GxIkTk445FhcX4+c//3lHb+5mVVVVuf/elQFdl156adL6XXjhhbj++uvxpz/9yb1u6NChmDlzJo488kicddZZ2LRpU1LFvgkTJuCVV17BwIED3esMw8Crr76Kgw46CMuXLwfgdBEPGTIEf/nLX5pcphtvvLHB6Vod6eyzz8bixYvxu9/9Dn369MFPfvKTpLEMGzZswBVXXIHq6mqcdNJJ+Pzzz/HNN9+4tzfXRbt8+fIGx7ZnzJiRdAgq7umnn0YwGMStt96Kd999F0VFRXjwwQdxww03AHAO+1xyySVJ2/mZZ55JeX5/W9XW1uLiiy/G+PHjccstt7SpiE3i2Jaqqiq89NJLSdu7JYVlupN//etfjfY0AHAPDSZWyfvZz36GQw45JKnGw67KyMhI6p3QWjc4fBMIBBr8Zti2jdraWhiG4faAArv229LdeTbQRQSXXnoptm/f7l530003ISsrC08//XSzj3/mmWeSupniP5bl5eVul5pSKmkk9dKlS91jYL/97W/dY7vDhg1zB0xlZGQk7UxEo1FcdNFFKZfhb3/7W5vW/V//+hcee+wxzJkzBwMHDsQtt9yC3r17d8h2vuCCC1p0bE1rnTSuYNu2bc120SW64oor3HNo//nPf2LFihX45ptvcPTRR+Opp55K2lmIGzZsGD744AP07dsXhYWF2L59O+644w4ceOCBeOedd5J+BOIKCgrw4Ycf4rjjjsPKlStx6aWXNhvmXSEeWFprXHzxxXjooYfcwz2maWLvvfd235clS5bg3HPPTRo4OGbMmCaff88998Rhhx2GuXPnNnm/yy+/3C3H+dlnnyEYDAIArr/+enz11VdJoRj3wAMPNPqZb4uysjIcf/zxmDt3LqZMmYJ58+bh5ZdfRlZWVodt/+nTpzfopgaQ9F3YtGlT0hiYyspKDB8+HIceemiHLVdLffnll/jlL3/Z5DH7yZMnJx0yKCgoSDpPPVFFRUWTx8GLiooaHcQbL8kLOL+v5513Hj744AP39kMPPRRvvPFG0uM///xz/PKXv8SyZcuglMKDDz6IK6+8sqs3a5fzbKDfeeedDUbv5ufnIxKJtGhEev06xcuXL0c0GnVbboAzUjsxFBLDPXGP0+/3Y4899nD/TmxJGYaBM844w/17+vTp7o/CgQceiH79+gEAtm7dinnz5rVo3QOBQKe1GKdNm5byh605VVVVbmncljj++OPdQM/Pz8ebb76J2267DU899RQyMjJSBnp8u9144424/PLL8T//8z/IycnBFVdc0eSP/eDBg/H555/j7rvvTlloBnAGNZ100kn47LPPYNs2DjroIDfM2qo1NQ6mTJmCo446CitWrEBtbW1Sydq9994bp556Kv7v//7PbRnHK6jFJfYKNeaCCy7A3LlzEQwGMWzYMGitkwaRDh06NOkHPr7+s2bNwr333pv0o5zorrvuwqZNm3D99denPPtk/vz57s5JKBTChAkTkk5Fuv/++zFx4kT372g0mnRM/fXXX8fRRx+Nt99+u8N2ZC+66KJmzxn//PPPkwrmxO2zzz5499133e92Vxg5ciTy8vKaHEQ2ePBg+Hw+d8zRP/7xj6Tz0hO99dZbeOuttxp9rsmTJ+OPf/xjk8u0bNkynH322e5ph4DT+xb/jicKBAJuES7btnHVVVdh1apVuP/++3e5xHC31tV9/h3hmWeeEaVUymMroVCozcdmvvnmG3nuuefcv0899dRGlyHxGO+oUaOSbks8hh4IBGTRokXupaCgwL3tgQcecK//29/+1qJj6J2t/vG8jro88cQTTS5HKBSSJ554wr2UlpbKu+++mzReok+fPjJlypSkxz333HPuY7777rtWrfs333zjHivOysqSyy+/POn2Z599Vo466ij30pJjvY2pfww9FArJkiVLJD8/v8G2uuKKK9zH3XDDDQ1uT/z8NHYMXUSkpKREvvjiC4lGo1JVVSWjR49275eRkSELFy5077tu3Tp59NFHZcKECS1+TwOBgJx55pny1FNPycaNG1Ou99NPP93gcZmZmTJ37tyk+5WWlsrRRx+ddL+RI0fK5s2bRaRlx9ATPfbYY0nPNWfOHJk2bZpcd911YllWq4/zJ16KiorEsqw2fxba6xj6X/7yF/c5hg8fnvIY+ptvvinBYLDB+I76x9Cbu0yePLnR5dBay+OPPy45OTlJj7nssstkxowZMnXqVHnmmWfkwQcflMmTJ8tvfvMbueCCC2T8+PENXuf888+XaDTa5m3b3Xku0N94442kATltDfSCggI54IADpFevXu51jz32mPzqV79q0Ye0pYHelgsDvWmWZckf//jHBp+DESNGyI4dOxp9XE1NTYtfQ2stxx13XNLzP/3000n3qT+obObMmW3ezqkCXUTkrbfearDzmjgoKBqNyqGHHpp0e+KOaFOBnuj8889P+RpaaznhhBMafd8yMjLkjjvukPXr18uvf/3rRr+bAOS9995r8Lr77bdfo9+BZcuWNXj/TjzxxKT7XXnllSLS+kB/6KGHGl3OtWvXyuDBg5M++xkZGZKdnZ3yUv87Un/Hr7XaK9Crq6ulV69eMnnyZLnuuutSBrqIyOzZs93PW1x7BbplWTJixIh2/a0466yzdttQ91ygr1u3Lmk0daofoZaMQK6qqpKVK1fKnDlz3MefffbZSa2UqVOnNrocrQn0/v37u5fEH7wePXq41ye2CNIp0Kuqqprdltu2bUv5nmRlZcmaNWta9H609Av6/fffN9pK9Pl8EgwGG70YhiG//vWvpby8vNnXeeCBBxo8f/3nq3/Wg9/vb/L1g8GgHHnkkSlfr7FAF0kevQ5A7r777qTHrl+/Xnw+n3v7hAkTRGstIi0L9PrPf8wxx8hzzz0n1157rRx++OHSu3fvBtvCMAw599xzZeXKlUnPNX/+/AY7QgCkuLi4Qav1o48+avKHe4899miwg1ZbW+vuYJx44olSXV0tIs0Hemlpqbz44oty9dVXJ33HU11mzpwp27ZtS2pR/s///E+jn5X6792HH364S9+59hzl/sknn4jWuslAT6V+oJ911lmyevXqRi+N7SiKiJx33nltDu+8vDwZOnRog8/g9ddfv0vbuLvyXKCLiDzyyCPunnBiEMYDfe3atY3uTccviT8Uw4YNcz888daQYRhNtvZaGujBYDDptsTlTewefuutt9Iy0FvimWeeafQLefPNN7fLa2zfvl2uueaapOBq62XgwIFNnpr03nvvid/v75CeiIMPPjjlazYV6H/4wx+SbjNNU2bNmuXePm/evAav89hjj4lI84F+7733NrvMV199tftvpZScccYZMmvWLNm8eXOjl/fff19OOukk9/sUb0knOuigg1K+Xt++fd1/H3744Q129ioqKuSGG26QcDjsXtdcoC9btqxF709+fr68//77IiJJPRMFBQVSWlra4HnXrFkjgUDAvd+4ceN2+bPenoEet6uBviunrb366qtJO71DhgyRQw45RM4++2y54oor5Nxzz5UzzjhDLr30Urn11ltl3rx5snHjxqT3d+PGjTJ48GABIBMnTkx5qunuwJOBHo1G5brrrpNoNJoy0FevXt3sFzfxA/2zn/2swe0HHnhgk8vQVKCvWbNGBg8eLIMHD5aRI0cm3fb111/L/PnzZf78+Uk/ENu2bZPp06fL9OnT5eOPP+7qTdxioVCowfG5xEsgEHDP42+LjRs3yo033tjg+NuuXK699tpGX+/TTz9tcR2Dzgh0rbUMHTq0wfMMGDDA/fwkBm78kpOTI+vWrWsy0E8//fQWLfNDDz0kl112mUycOLFN63zbbbfJvHnzktZ36tSpSTsJifd/9tln3X9PnDixRZ+TxEA3DEP+8Ic/yFlnnSXDhw93d8zjgZDqcs0118jMmTMlEom4z/nuu+82+7k544wzku7zyiuv7PJ3ymuBXlZWJlOmTJG1a9eKbdtNvncAZPXq1SmfZ9GiRfLyyy/v8rbozjwZ6IlaEujjxo2T8ePHJ+35J36g//nPfzb4gtfv1qyvsUCPRqOtulx44YVy2GGHyWGHHSY33XRT0m3xbtN0dvfddydtt8zMTLntttuSrtt///0bHKNrzrZt22TixIkpW+SmacpVV10lJSUlTT5HaWlpg+75YcOGSVVVVcr7v/rqqw1+TJv6IeuMY+hvvPFGg3WP//tnP/uZ7Ny5M+XAufjtTQX6pEmTGg24goICOe200+S+++6TpUuXiojIU0891aZAnz9/ftK61tTUyB577OHefvbZZzcIsPPPP18GDRrUaFfu2rVr5e2335b77rtPLrjgAunTp0+jr//pp5+KiMhl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"
                     style = "padding:0;max-width:140px; max-height:140px;position: relative; top:-35px;left:-13px;cursor: pointer;"
                     title = "打开合作微博"
                     onclick = "window.open('https://weibo.com/u/7711875625');"
                 >
                 
                 <div 
                    style="font-size:14px;font-weight: bold;color:#00e676; position: relative; top:-222px;left:273px;"
                    title = "等待处理的离线记录" >
                    <span>剩余</span>
                    <span id = "countOfRemainingOfflineTubs">0</span>
                    <span>管</span>
                    <span id = "countOfRemainingOfflineNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div 
                    style="font-size:14px;font-weight: bold;color:#d50000; position: relative; top:-222px;left:273px;"
                    title = "上传失败的离线记录">
                    <span>失败</span>
                    <span id = "countOfFailedOfflineTubs">0</span>
                    <span>管</span>
                    <span id = "countOfFailedOfflineNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#304ffe; position: relative; top:-205px;left:128px;"
                      title = "正在自动处理的离线试管编号">
                    <span>当前处理试管编号：</span>
                    <span id = "currentProcessingOfflineTubs" style = "text-decoration:underline">无</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#00e676; position: relative; top:-200px;left:198px;">
                    <span>成功</span>
                    <span id = "countOfProcessingSuccessNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#d50000; position: relative; top:-200px;left:198px;">
                    <span>失败</span>
                    <span id = "countOfProcessingFailedNums">0</span>
                    <span>人</span>
                 </div>
                 
                 <div style="font-size:16px;font-weight: bold;color:#2962ff; position: relative; top:-200px;left:198px;">
                     <span>等待</span>
                     <span id = "countOfProcessingReadyNums">0</span>
                     <span>人</span>
                 </div>
                 
                 <hr style = "position: relative; top:-205px;left:68px;" width="67%"/>
                 
                 <div style="font-size:16px;color:#000000; position: relative; top:-210px;left:125px;">
                    <span >离线上传进度：</span>
                    <progress id = "progressOfUploadOffline" style = "max-width:90px;" value="100" max="100"/>
                 </div>
                 <div style="font-size:16px;color:#000000; position: relative; top:-230px;left:335px;">
                    <span id = "percentOfUploadOffline">100%</span>
                 </div>
                 
                 <div style="font-size:16px;color:#000000; position: relative; top:-230px;left:125px;">
                    <span >服务器状态：</span>
                    <span id = "_hscj_control_panel_serverPing" style = "font-weight: bold;"></span>
                    <span id = "_hscj_control_panel_serverState" style = "color:#00e676;"></span>
                 </div>
                 
                 <hr style = "position: relative; top:-233px;left:68px;" width="67%"/>
                 
                 <div style="font-size:16px;font-weight: bold;color:#000000; position: relative; top:-235px;left:123px;" title="包含所有已采样记录及离线待上传记录。\n注意：离线成功记录已计算在已采样记录中。">
                    <span>统计：</span>
                    <span id = "countOfSummeryTubs">0</span>
                    <span>管</span>
                    <span id = "countOfSummeryNums">0</span>
                    <span>人</span>
                 </div>
            </div>
            
            <div>
                <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAADX5JREFUeF7tnXuoHdUVxn/+1UATWwS1CqlBq6CRkBihUYsPlKiFghFifUSNrXlR2xSjraKllCqm1YhpLeZRa9REUwNGKFQTFKM0MQXzIJgI2mhsQKuC1CQF+1fKup0TT+7rzJzZM7P2nm/DIdzcvdf+1m+d757Ze+bMHEN/7UrgJuAM4LjsdWx/oRoftRN4DdgB/AX4rHFFzQqwen4PmAJcBExuVk7fsx/Iamn1fAd4CnixaLRjCgyYBlwPXAWMLzAupq7vAr8C1sQkOqDWG4BfAqcHjOkp1H7gBeAZYGseYXkMcgVwM3BtnoCJ9DGDzEokl7xprAbMIG1pa4EngZdGS7iXQZYDc9tCbFCedwOLW5L7XcADLcl1cJorgHkj5T6aQd4EprYUWifty4GNiTOYDmxIPMde6W0Dzh2u00gGOdwrYkt+b2sS+yNxMNF8xwH25kh1zVG0bEP8MJxBngdmFI2ccP9LgE2J5ncx8GqiufWT1nrg6u6Bgw1ix6F2PKr2JYE7gCWJAlkEPJRobv2mZetOW38OtG6D2G5V4X3iflVENO7ZbHs7Ism5pdp253W5e7eno53nG9jd6jaIvRHatJWbt9xPZydF8/aPqZ+dPLsxJsE1abUt4IE/HB2D2EnAN2qaPLZpFgDLYhOdU+984LGcfdvW7Tw7mdgxyKPAj9pGIGe+FwBbcvaNrdv5wObYRNek9w/AbR2DfAicVNPEMU1jlyacBRyKSXQBrWOBPQlfOlQAxZCuHwEnm0FmAs+ViZTw2J8CSxPOz1JbCDySeI79pneNGcTMYSZRO5rA69nVrG3gYlczX9iGRAvmuM4MYmdSzyk4MPXu7wGnpZ7koPz2Aqe2LOde6W43g7wPTOjVs0W/T3nXqlcZtat1NKF9ZpDPgVi/7NSr4Hl/vzv7fsCfEt6xysvCdrZ+ANjW/8S8gxLtd8AMUuWFibuA7cA/ADtssZ0Bb+1t4GNvopzoORE404mWbhm242qHg9/KlgeTqtJYpUHsDLSdW0n1StiqaqK4xQjYFcl2zqKSKwKqMshlwCvF8lRvEShF4FLg5VIRhhlchUHsxJodtqiJQN0E7HDQTnwGa6ENci9wfzB1CiQCxQncA9xXfNjwI0IaxG6bYzsgX4QSpzgi0AeBMdlOpN22qHQLaRC7K0YlC6XSWSpA2wjYBlGQu9KENIh9rP2ibZVQvi4J/Bqww/3SLaRB7E6L5lw1EWiagB3J2JfBSreQBkn55galQStArQSC3YxCBqm1bpqsJgIySE2gNU2cBGSQOOsm1TURkEFqAq1p4iQgg8RZN6muiYAMUhNoTRMnARkkzrpJdU0EZJCaQGuaOAnIIHHWTaprIiCD1ARa08RJQAaJs25SXRMBGaQm0JomTgIySJx1k+qaCMggNYHWNHESkEHirJtU10RABqkJtKaJk4AMEmfdpLomAjJITaA1TZwEZJA46ybVNRGQQWoCrWniJCCDxFk3qa6JgAxSE2hNEycBGSTOukl1TQRkkJpAa5o4CcggcdZNqmsiIIPUBFrTxElABomzblJdEwEZpCbQmiZOAjJInHWT6poIyCA1gdY0cRKQQeKsm1TXREAGqQm0pomTgAwSZ92kuiYCMkhNoDVNnARkkDjrJtU1EZBBagKtaeIkENQgO4DJATicAHwaII5CiEBZAscDn5QNAuy0h3g+AiwsGWwnMKVkDA0XgZAEQvzhX2oGuRlYVVLZcmB+yRgaLgIhCSwD5pUMONsMchywFTi9RLDLgY0lxmuoCIQmMB3YUCLou8A0M4i1G4DVfQbTp0ef4DSscgJlPkVmAWs6BjGlZhAzSpFmi3JbnKuJgFcCtli3RXuRtgYwg9BtEPv5LuCBnJFWAnNz9lU3EWiSwApgTk4BdwOLO30HG8T+347dHh1lTbIXuBNYn3NCdRMBDwRmAA8Cp40gxtYctw1eSw9nEBs/Dpja9bL/29b1OughY2kQgYIECr+vRzJIwXnVXQTSJCCDpFlXZRWIgAwSCKTCpElABkmzrsoqEAEZJBBIhUmTgAySZl2VVSACMkggkAqTJgEZJM26KqtABGSQQCAVJk0CMkiadVVWgQjIIIFAKkyaBGSQNOuqrAIRkEECgVSYNAnIIGnWVVkFIiCDBAKpMGkSkEHSrKuyCkRABgkEUmHSJCCDpFlXZRWIgAwSCKTCpElABkmzrsoqEAEZJBBIhUmTgAySZl2VVSACVRhkbHZvLbv/0FcD6VQYERiNwH8Au1+b3R/6UEhUoQ1yPrAOODmkSMUSgZwEPgRmAlty9u/ZLaRBvgb8u+eM6iAC1RP4OvB5iGlCGuQ3wM9CiFIMEShJ4LfAz0vGGBge0iB2r96rQohSDBEoSeAFwO7FW7qFNMhz2fFfaVEKIAIlCdg6+JqSMYJ/gthjE+zxCWoi0DQBe3yBPcagdAv5CXIi8K/SihRABMoT+AbwcfkwYdcgpucswA61JoYQpxgiUJDA7uzQak/BcSN2D/kJ0pnkK9kCaQIwJpRQxRGBUQh8AezLHur035CkqjBISH2KJQKNEpBBGsWvyb0TkEG8V0j6GiUggzSKX5N7JyCDeK+Q9DVKQAZpFL8m905ABvFeIelrlIAM0ih+Te6dgAzivULS1ygBGaRR/JrcOwEZxHuFpK9RAjJIo/g1uXcCMoj3CklfowRkkEbxa3LvBGQQ7xWSvkYJyCCN4tfk3gnIIN4rJH2NEpBBGsWvyb0TkEG8V0j6GiUggzSKX5N7JyCDeK+Q9DVKQAZpFL8m905gJIPYMz4mZS97pIE1u6X8ruwV9BkM3iFJXzIECr+vhzPIHOAe4JQRsOwHlgBLk8GmRNpAYCGwCBg/QrIfAPcDK7t/P9ggTwCzc9J6HbgoZ191E4EmCbwGXJhTwCrglk7fboPYp8LtOYN0ur0H2KPW1ETAKwF7NNupBcU9nH3aHHk+iK0zNhcM0um+AFjW51gNE4EqCcwHHutzggts3W2fILZw2QB0FuP9xBsI1s9AjRGBigiU+aNvkuz9fLkZ5IfAH0uKfBy4tWQMDReBkATsPW3v7TLtVjNIiEB22/mzyyjRWBEITOCtAI/heNwMEiKQ5RbsoSWBQSlc+wiEepjTbjPI4UD8LgE2BYqlMCJQhsDFwKtlAnTGyiAhKCqGNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCMoirckiMNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCMoirckiMNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCMoirckiMNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCMoirckiMNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCMoirckiMNwIyiLeKSI8rAjKIq3JIjDcCMoi3ikiPKwIyiKtySIw3AjKIt4pIjysCLg1yPfCsK0wS01YC1wHPhEg+5EM87wXuDyFKMUSgJIF7gPtKxhgYHtIgq4BbQohSDBEoSeAJYHbJGMENsgv4DnAwhDDFEIE+CYwD/gZM6nP8UcNCfoJY4KeBm0IIUwwR6JPAU8CNfY4dMiy0QWyCy4BXQglUHBEoQOBS4OUC/Xt2rcIgNulZwNs9Z1cHEQhH4ExgT7hw/49UlUEstu1qLQG+CC1a8USgi8AYYFGoXavBZKs0iM21A9gN7APeAfY7LK3p+9ShLg+SjgcmehAySMN44AxgQqZvSlUazSCfA8dWNUEkcXcCfweeBzZGorkqmdOBq4FvA5OrmiSSuAfMIO9nToxEc+UylwPzK5/F5wTLgHk+pTWiap8ZZBtwTiPT+53UDrlO8CuvEmWfAHZIpfYlge1mELt+6lpRGUJgJTC3JVxWAHNakmuRNNeaQa4E/lpkVIv62rH4+sTznZGtvRJPs6/0vmsGsfZPwHYG1I4msBewHZJUL5+xyzJsp/E0FX4IAdtx/WbHIL8DfixIwxK4BNiUKJtg35tIkM/vgZ90DDINeCPBJEOkdEd2wjNELG8x7ATbQ95EOdFzHrC1YxDTpMX68JUxLvZlsBSbfanIvlykdjSBtR0u3Qa5AnhRpIYQSPkK5aBXvib03rGNq5csn26D2M92kqwtW5t567kAsBNoKTY7IfpYiomVyMm2vI+cLB1sEIv7JjC1xASpDb0A2JJaUlk+5wObE82tn7TspPm53QOHM4j9/nA/0RMc8wFwNnAowdwspbHAW8ApieZXNK0hfhjJIBbYLtyzk0htbna4aWfUU252Bt0OK9rc7GSwnRQe0kYziHV+ALirpeTadBOKYDc5iPC9shi4eyTdvQxi42x36+aWXa/1cPYlnAjr3bdk+3Lb7X2Pjm+gbeU+2dmtKmOQzlg7mTgr+yg6KT4euRTbYvzOhBflvSDYov1BwP5NsX2ULR1W20nAPAnm+QQZLs5MwF52Dc9x2SvWL13ZNwoNll1J8OeEF+R53g/Wxxbu3wfsTLL9UfT4jcI8uRwAPstedk3duuyVZ+yRPv8Ds6E3Y92QzTsAAAAASUVORK5CYII="
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:320px;cursor: pointer;"
                     title="二维码引擎状态"
                >
                <span id = "_hscj_control_panel_stateOfQR" style = "color:red;font-size:15px;font-weight: bold;position: relative; top:-256px;left:303px;">✖</span>
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:306px;"
                     title="图片文字识别服务器状态"
                >
                <span id = "_hscj_control_panel_stateOfOCR" style = "color:red;font-size:15px;font-weight: bold;position: relative; top:-256px;left:288px;">✖</span>
                
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:210px;visibility:visible;cursor: pointer;"
                     title="隐藏摄像头"
                     id   = "_hscj_control_panel_hideCamera"
                >
                <img src = "data:image/png;base64,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"
                     style="max-width:20px; max-height:20px; position: relative; top:-255px;left:186px;visibility:hidden;cursor: pointer;"
                     title="显示摄像头"
                     id   = "_hscj_control_panel_showCamera"
                >
                <div id = "_hscj_control_panel_cameraState" style="background-color:red;border-radius: 50%;width:5px;height:5px;position: relative; top:-275px;left:302px;"></div>
            </div>
        </div>
    `;
        child = div.firstElementChild
        div.removeChild(child);
    }


    const imgs    = child.getElementsByTagName("img");
    const buttons = child.getElementsByTagName("button");
    const spans   = child.getElementsByTagName("span");

    const btnScriptControl       = buttons[0];
    const btnShowSamplingRecords = buttons[1];
    const imgDownloadSampling    = imgs[1];
    const imgCleanSampling       = imgs[2];

    const btnOfflineModeControl  = buttons[2];
    const btnShowOfflineRecords  = buttons[3];
    const imgDownloadOffline     = imgs[3];
    const imgCleanOffline        = imgs[4];

    const spanQRCodeState        = spans[39];
    const imgQRCodeState         = imgs[6];
    const spanOCRState           = spans[40];
    const imgOCRState            = imgs[7];
    const imgHideCamera          = imgs[8];
    const imgShowCamera          = imgs[9];


    btnScriptControl      .onclick = HSCJControlPanel.onScriptControlClicked;
    btnShowSamplingRecords.onclick = HSCJControlPanel.showLocalSamplingRecords;
    imgDownloadSampling   .onclick = HSCJControlPanel.downloadLocalSamplingRecords;
    imgCleanSampling      .onclick = HSCJControlPanel.cleanLocalSamplingRecords;

    btnOfflineModeControl.onclick = HSCJControlPanel.onOfflineControlClicked;
    btnShowOfflineRecords.onclick = HSCJControlPanel.showOfflineSamplingRecords;
    imgDownloadOffline   .onclick = HSCJControlPanel.downloadOfflineSamplingRecords;
    imgCleanOffline      .onclick = HSCJControlPanel.cleanOfflineSamplingRecords;

    imgQRCodeState.onclick = ()=>{
        if(spanQRCodeState?.innerText === "✖"){
            HSCJControlPanel.speak("请检查摄像头是否可用或在选项页面打开相关功能！");
        }
    };
    spanQRCodeState.onclick = imgQRCodeState.onclick;

    imgOCRState   .onclick = ()=>{
        if(spanOCRState?.innerText === "✖"){
            if(confirm("图片识别引擎没有运行，需要下载吗？\n\n若已下载，检查是否运行，摄像头是否正常，是否已开启相关功能")){
                window.open("https://best335.lanzouv.com/ioPyg0fukp9a");
            }
        }
    };
    spanOCRState  .onclick = imgOCRState.onclick;

    imgHideCamera .onclick = ()=>{HSCJControlPanel.setCameraVisible(false);}
    imgShowCamera .onclick = ()=>{HSCJControlPanel.setCameraVisible(true );}

    return child;
};

HSCJControlPanel.speak = MessageManager.Content.speak;

HSCJControlPanel.showLocalSamplingRecords = async function () {
    LocalSamplingRecordManager.listAll({
        onSuccess : function (datas) {
            // if((datas?.length??0) === 0){
            //     HSCJControlPanel.speak("无采样记录！",false);
            //     return;
            // }
            const table = DOMUtils.createSingleEleByString(`
                <div id = "idOfLocalSamplingDialog" style = "background:rgba(0,0,0,0.5);width:100%;height:100%;margin:0;padding:0;position:absolute;top:0;left:0;z-index: 9999;">
                    <div style="border-radius: 25px; background: #ffffff; padding: 10px; position: absolute; left: 50%; top: 50%; margin-left: -500px; margin-top: -400px; width:1000px; height:680px;">
                        <div data-v-926b23b0="" data-v-0b9e8182="" class="app-container">
                        <div data-v-1f92a67c="" data-v-926b23b0="">
                            <div data-v-1f92a67c="" style="background-color: white; font-size: 20px; font-family: PingFangSC-Regular, &quot;PingFang SC&quot;; font-weight: bold; color: rgb(48, 49, 51); line-height: 60px; text-align:center;"> 
                                <span>核酸已上传采样记录 —</span>
                                <span>20??-??-??</span>
                                <img src="data:image/png;base64,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" 
                                     title="关闭弹窗" 
                                     style="max-width:30px; max-height:30px;position:relative;left:270px;top:2px;text-align:right;"
                                />
                            </div>
                            <div data-v-1f92a67c="" style="padding: 0px 20px; background-color: white;">
                                <div data-v-1f92a67c="" style="background-color: rgb(228, 231, 237); height: 1px;"></div>
                            </div>
                        </div>
                      
                        <div data-v-926b23b0="" class="el-table el-table--fit el-table--striped el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--mini" style="width: 100%;">
                            <div class="el-table__header-wrapper">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;display: table;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <thead class="has-gutter" style = "width: 100%;">
                                        <tr class="tb-header">
                                            <th colspan="1" rowspan="1" class="el-table_1_column_1  is-center   is-leaf">
                                                <div class="cell">序号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                                <div class="cell">试管编号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_3     is-leaf">
                                                <div class="cell">采样时间</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_4     is-leaf">
                                                <div class="cell">姓名</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_5     is-leaf">
                                                <div class="cell">身份证号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_6     is-leaf">
                                                <div class="cell">手机号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_7     is-leaf">
                                                <div class="cell">状态</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_8     is-leaf">
                                                <div class="cell">操作</div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="el-table__body-wrapper is-scrolling-left">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;display: table;display: block;height: 500px;overflow-y: scroll;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <tbody style = "width: 100%;display: table;display: block;height: 470px;">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="pagination" style="background: rgb(255, 255, 255); width: 100%; text-align: center; padding: 10px 0px;">
                            <div data-v-926b23b0="" class="el-pagination is-background">
                                <span class="el-pagination__total" >共 ？管 ？人</span>
                            </div>
                        </div>
                    </div>
                 </div>
            `);
            document.body.appendChild(table);
            HSCJControlPanel.updateSupportInfo();
            const title   = table.getElementsByTagName("span")[1];
            const tbody   = table.getElementsByTagName("tbody")[0];
            const img     = table.getElementsByTagName("img")[0];
            const summary = table.getElementsByTagName("span")[2];
            LocalSamplingRecordManager.localSamplingInfo({
                onSuccess : function (datas) {
                    const data        = (datas??{})[0]??{};
                    const tubCount    = data["tubCount"]??0;
                    const recordCount = data["recordCount"]??0;
                    summary.innerText = "共 "+tubCount+"管 "+recordCount+"人";
                },
                onFailure : function (err){}
            });
            title.innerText = LocalSamplingRecordManager.time.Format("yyyy年MM月dd日");
            img.onclick = function () {
                document.body.removeChild(table);
            }

            const classes = [
                "el-table_1_column_1 is-center ",
                "el-table_1_column_2  ",
                "el-table_1_column_3  ",
                "el-table_1_column_4  ",
                "el-table_1_column_5  ",
                "el-table_1_column_6  ",
                "el-table_1_column_7  ",
                "el-table_1_column_8  "
            ];
            const widths = [8, 16, 17, 8, 18, 15, 8, 10];

            for(let i=0,ni=datas?.length??0; i<ni; ++i){
                const data = datas[i]??{};

                const tr = document.createElement("tr");{
                    tr.class = "el-table__row";
                    tr.style = "width: 100%;display: table;";
                }
                for(let i=0;i<8;++i){
                    const td = document.createElement("td");{
                        td.rowSpan = 1;
                        td.colSpan = 1;
                        td.className = classes[i];
                        td.style = "width:"+widths[i]+"%";
                    }
                    const div = document.createElement("div");{
                        div.className = "cell";
                        div.innerText = "";
                    }
                    td.appendChild(div);
                    tr.appendChild(td);

                    if(i === 7){
                        const btn = document.createElement("button");{
                            btn["data-v-926b23b0"] = "";
                            btn.className = "el-button el-button--text el-button--mini";
                            btn.type = "button";
                            btn.style = "cursor: pointer;";
                        }
                        const span = document.createElement("span");
                        span.innerText = "删除记录";
                        span.style = "color:red";
                        btn.appendChild(span);
                        div.appendChild(btn);
                    }
                }

                const eIndex = tr.getElementsByClassName("el-table_1_column_1 is-center ")[0].getElementsByTagName("div")[0];
                const eTubNo = tr.getElementsByClassName("el-table_1_column_2  ")[0].getElementsByTagName("div")[0];
                const eTime  = tr.getElementsByClassName("el-table_1_column_3  ")[0].getElementsByTagName("div")[0];
                const eName  = tr.getElementsByClassName("el-table_1_column_4  ")[0].getElementsByTagName("div")[0];
                const eIdNo  = tr.getElementsByClassName("el-table_1_column_5  ")[0].getElementsByTagName("div")[0];
                const ePhone = tr.getElementsByClassName("el-table_1_column_6  ")[0].getElementsByTagName("div")[0];
                const eState = tr.getElementsByClassName("el-table_1_column_7  ")[0].getElementsByTagName("div")[0];
                const eBtnOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("button")[0];
                const eTxtOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("div")[0];

                eIndex.innerText = (i+1).toString();
                eTubNo.innerText = data["tubNo"];
                eTime .innerText = new Date(parseInt(data["samplingTime"])).Format("yyyy-MM-dd hh:mm:ss");
                eName .innerText = data["name"];
                eIdNo .innerText = data["idNo"];
                ePhone.innerText = data["phone"];
                eState.innerText = "已采集";

                let delFlag = 0;
                const ids    = data["ids"];
                const idType = data["idType"]??1;
                const idCard = data["idNo"];

                const onDeleteSuccess = function () {
                    eState.innerText = "已删除";
                    eTxtOpt.innerText = "";
                    delFlag = 1;
                    HSCJControlPanel.speak("删除成功！",false);
                };

                const deleteById = function (ids) {
                    HSCJApiProvider.delSampling(ids,"",{
                        onFailure : function (code,msg) {
                            HSCJControlPanel.speak(msg,false);
                        },
                        onSuccess : function (code,msg,datas) {
                            onDeleteSuccess();
                        }
                    },true);
                };

                /* 查找本地用户id后查询历史记录删除 */
                const searchIdAndDel = function (tubNo){
                    /* 1、查找本地用户id */
                    LocalUserInfoManager.queryUser(idType,idCard,{
                        onSuccess:function (datas) {
                            const data   = datas;
                            const id = (data??{})["id"];
                            if(FunctionUtils.isNull(id)){
                                HSCJControlPanel.speak("删除失败！",false);
                                return;
                            }
                            /* 2、查询历史试管采样记录 */
                            HSCJApiProvider.histSampling(
                                null,
                                tubNo ,
                                null,
                                null,
                                null,
                                null,
                                null,
                                {
                                    onFailure : function (code,msg) {
                                        HSCJControlPanel.speak(msg,false);
                                    },
                                    onSuccess : async function (code,msg,datas) {
                                        let isFound = false;
                                        for(let i=0,ni=datas?.result?.length??0;i<ni;++i){
                                            const data = datas.result[i];
                                            const ids = data["id"];
                                            await new Promise((resolve, reject) => {
                                                if(id === data["peopleId"]){
                                                    /* 3.1、查找匹配的结果 */
                                                    LocalSamplingRecordManager.updateDelFlag(1, eIdNo .innerText, ids,{
                                                        onSuccess : function (){
                                                            deleteById(ids);
                                                            isFound = true;
                                                            resolve();
                                                        },
                                                        onFailure : function (){
                                                            deleteById(ids);
                                                            isFound = true;
                                                            resolve();
                                                        }
                                                    });
                                                }
                                                else{
                                                    /* 3.2、保存删除标记 */
                                                    LocalUserInfoManager.queryUserById(data["peopleId"],{
                                                        onSuccess:function (data){
                                                            LocalSamplingRecordManager.updateDelFlag(data["idType"]??1, data["idCard"], ids,{
                                                                onSuccess : function (){ resolve(); },
                                                                onFailure : function (){ resolve(); }
                                                            });
                                                        },
                                                        onFailure:function (err) { resolve(); }
                                                    });
                                                }
                                            })
                                                .then(()=>{})
                                                .catch(()=>{});
                                        }
                                        /* 3.3、网络没有此试管记录，当做已删除 */
                                        if(!isFound){
                                            onDeleteSuccess();
                                        }
                                    }
                                }
                            )
                        },
                        onFailure:function (err){
                            HSCJControlPanel.speak("删除失败，请重试！",false);
                        }
                    });
                };

                eBtnOpt.onclick = function () {
                    if(delFlag === 1) return;
                    if (confirm("确定要删除此采样记录吗？\n\n这将同时删除网络上的采样数据。")) {
                        if(ids===undefined || (ids?.trim()?.length) === 0){
                            /* 同一试管已查询过，但数据还没有同步更新 */
                            LocalSamplingRecordManager.queryUser(idType,idCard,{
                                onSuccess : function (datas){
                                    const data   = (datas??{})[0];
                                    const ids    = (data??{})["ids"];
                                    if(FunctionUtils.isNull(ids) || (ids?.trim()?.length) === 0){
                                        searchIdAndDel(eTubNo.innerText);
                                    }
                                    else{
                                        deleteById(ids);
                                    }
                                },
                                onFailure : function (){
                                    HSCJControlPanel.speak("删除失败，请重试！",false);
                                }
                            })
                            return;
                        }
                        deleteById(ids);
                    }
                }
                tbody.appendChild(tr);
            }
        },
        onFailure : function (err){
            HSCJControlPanel.speak("查询失败！"+err,true);
        }
    });
};

HSCJControlPanel.downloadLocalSamplingRecords = async function(){
    LocalSamplingRecordManager.listAll({
        onSuccess : function (datas) {
            if ((datas?.length??0) === 0) {
                HSCJControlPanel.speak("无采样记录！", false);
                return;
            }

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet([]);
            worksheet["!cols"] = [ { wch: 6 },{ wch: 18 },{ wch: 15 },{ wch: 11 },{ wch: 10 },{ wch: 10 } ];
            const title = ["姓名", "身份号","地址","手机号","试管编号","采样时间"];
            XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
            worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                try{ return { wch:Math.max(width.wch,title[index].length)}; }
                catch(e){ return {wch:10}; }
            });
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            for(let i=0,ni=datas?.length??0; i<ni; ++i) {
                const data    = datas[i]??{};
                const name    = data["name"];
                const idNo    = data["idNo"];
                const phone   = data["phone"];
                const tubNo   = data["tubNo"];
                const address = data["address"];
                const time    = new Date(parseInt(data["samplingTime"])).Format("yyyy-MM-dd hh:mm:ss");

                const rowInfo  = worksheet["!ref"];
                const rowCount = parseInt(rowInfo.substr(rowInfo.search(":")+2))+1;
                const row      = [name, idNo, address, phone, tubNo, time];

                worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                    try{return {wch:Math.max(width.wch,row[index].length)};} catch(e){return {wch:10};}
                });

                XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: "A"+rowCount});
            }

            XLSX.writeFile(workbook, "核酸采样记录 "+TimeUtils.parseTimestamp2ZhFormat(new Date().getTime())+".xls");
        },
        onFailure:function (err) {}
    });
};

HSCJControlPanel.cleanLocalSamplingRecords = function () {
    if(confirm("确定要删除今日的采样记录吗？\n此操作不会影响到网络记录!")){
        LocalSamplingRecordManager.clear({
            onSuccess:function () {
                HSCJControlPanel.speak("删除成功！",false);
            },
            onFailure:function (err) {
                HSCJControlPanel.speak(err??"删除失败！",false);
            }
        });
    }
};

HSCJControlPanel.updateLocalSamplingRecordsDisplayInfo = async function () {
    LocalSamplingRecordManager.localSamplingInfo({
        onSuccess:function (datas) {
            if((datas?.length??0) === 0){
                HSCJControlPanel.setCountOfLocalSamplingTubs(0);
                HSCJControlPanel.setCountOfLocalSamplingNums(0);
                return;
            }
            const data        = datas[0]??{};
            const tubCount    = data["tubCount"]??0;
            const recordCount = data["recordCount"]??0;
            HSCJControlPanel.setCountOfLocalSamplingTubs(tubCount);
            HSCJControlPanel.setCountOfLocalSamplingNums(recordCount);
        },
        onFailure:function (error){}
    });
};

HSCJControlPanel.updateScriptButtonState = function () {
    HSCJControlPanel.setScriptBtnEnabled(HSCJControlPanel.isScriptRunning());
};

HSCJControlPanel.showOfflineSamplingRecords = async function () {
    OfflineSamplingManager.listAll({
        onSuccess : function (datas) {
            // if((datas?.length??0) === 0){
            //     HSCJControlPanel.speak("无离线记录！",false);
            //     return;
            // }
            const table = DOMUtils.createSingleEleByString(`
                <div id = "idOfOfflineSamplingDialog" style = "background:rgba(0,0,0,0.5);width:100%;height:100%;margin:0;padding:0;position:absolute;top:0;left:0;z-index: 9999;">
                    <div style="border-radius: 25px; background: #ffffff; padding: 10px; position: absolute; left: 50%; top: 50%; margin-left: -500px; margin-top: -400px; width:1000px; height:680px;">
                        <div data-v-926b23b0="" data-v-0b9e8182="" class="app-container">
                        <div data-v-1f92a67c="" data-v-926b23b0="">
                            <div data-v-1f92a67c="" style="background-color: white; font-size: 20px; font-family: PingFangSC-Regular, &quot;PingFang SC&quot;; font-weight: bold; color: rgb(48, 49, 51); line-height: 60px; text-align:center;"> 
                                <span>核酸离线采样记录 —</span>
                                <span>20??-??-??</span>
                                <img src="data:image/png;base64,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" 
                                     title="关闭弹窗" 
                                     style="max-width:30px; max-height:30px;position:relative;left:280px;top:2px;text-align:right;"
                                />
                            </div>
                            <div data-v-1f92a67c="" style="padding: 0px 20px; background-color: white;">
                                <div data-v-1f92a67c="" style="background-color: rgb(228, 231, 237); height: 1px;"></div>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="usermanage-box" style="background-color: white; padding: 20px 20px 0px;">
                
                        <div data-v-926b23b0="" class="el-table el-table--fit el-table--striped el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--mini" style="width: 100%;">
                            <div class="hidden-columns">
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <div data-v-926b23b0=""></div>
                                <!---->
                                <div data-v-926b23b0=""></div>
                            </div>
                            <div class="el-table__header-wrapper">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;display: table;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%">
                                    </colgroup>
                                    <thead class="has-gutter" style = "width: 100%;">
                                        <tr class="tb-header">
                                            <th colspan="1" rowspan="1" class="el-table_1_column_1  is-center   is-leaf">
                                                <div class="cell">序号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                                <div class="cell">试管编号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_3     is-leaf">
                                                <div class="cell">采样时间</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_4     is-leaf">
                                                <div class="cell">姓名</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_5     is-leaf">
                                                <div class="cell">身份证号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_6     is-leaf">
                                                <div class="cell">手机号</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_7     is-leaf">
                                                <div class="cell">状态</div>
                                            </th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_8     is-leaf">
                                                <div class="cell">操作</div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="el-table__body-wrapper is-scrolling-left">
                                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;display: table;display: block;height: 500px;overflow-y: scroll;">
                                    <colgroup>
                                        <col name="el-table_1_column_1" width="8%" >
                                        <col name="el-table_1_column_2" width="16%">
                                        <col name="el-table_1_column_3" width="17%">
                                        <col name="el-table_1_column_4" width="8%" >
                                        <col name="el-table_1_column_5" width="18%">
                                        <col name="el-table_1_column_6" width="15%">
                                        <col name="el-table_1_column_7" width="8%" >
                                        <col name="el-table_1_column_8" width="10%"> 
                                    </colgroup>
                                    <tbody style = "width: 100%;display: table;display: block;height: 470px;">
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div class="el-table__column-resize-proxy" style="display: none;"></div>
                            <div class="el-loading-mask" style="display: none;">
                                <div class="el-loading-spinner">
                                    <svg viewBox="25 25 50 50" class="circular">
                                        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div data-v-926b23b0="" class="pagination" style="background: rgb(255, 255, 255); width: 100%; text-align: center; padding: 10px 0px;">
                            <div data-v-926b23b0="" class="el-pagination is-background">
                                <span class="el-pagination__total">共 ？管 ？人，已成功？人，已失败？人，等待中？人</span>
                            </div>
                        </div>
                    </div>
                 </div>
            `);
            document.body.appendChild(table);
            HSCJControlPanel.updateSupportInfo();

            const title   = table.getElementsByTagName("span")[1];
            const tbody   = table.getElementsByTagName("tbody")[0];
            const img     = table.getElementsByTagName("img")[0];
            const summary = table.getElementsByTagName("span")[2];
            title.innerText = OfflineSamplingManager.createTime.Format("yyyy年MM月dd日");
            img.onclick = function () {
                document.body.removeChild(table);
            }
            OfflineSamplingManager.queryOfflineInfo({
                onSuccess:function (datas){
                    const data = (datas??{})[0]??{};
                    const tubsCount     = data["tubsCount"]??0;
                    const successCount  = data["successCount"]??0;
                    const failureCount  = data["failureCount"]??0;
                    const samplingCount = data["samplingCount"]??0;
                    const allCount      = data["allCount"]??0;
                    summary.innerText   = "共 "+tubsCount+"管 "+allCount+"人，已成功 "+successCount+"人，已失败 "+failureCount+"人，等待中 "+samplingCount+"人";
                },
                onFailure:function (err) {}
            });

            const classes = [
                "el-table_1_column_1 is-center ",
                "el-table_1_column_2  ",
                "el-table_1_column_3  ",
                "el-table_1_column_4  ",
                "el-table_1_column_5  ",
                "el-table_1_column_6  ",
                "el-table_1_column_7  ",
                "el-table_1_column_8  "
            ];
            const widths = [8, 16, 17, 8, 18, 15, 8, 10];

            for(let i=0,ni=datas?.length??0; i<ni; ++i){
                const data = datas[i];

                const tr = document.createElement("tr");{
                    tr.class = "el-table__row";
                    tr.style = "width: 100%;display: table;";
                }
                for(let i=0;i<8;++i){
                    const td = document.createElement("td");{
                        td.rowSpan = 1;
                        td.colSpan = 1;
                        td.className = classes[i];
                        td.style = "width:"+widths[i]+"%";
                    }
                    const div = document.createElement("div");{
                        div.className = "cell";
                        div.innerText = "";
                    }
                    td.appendChild(div);
                    tr.appendChild(td);

                    if(i === 7){
                        const btn = document.createElement("button");{
                            btn["data-v-926b23b0"] = "";
                            btn.className = "el-button el-button--text el-button--mini";
                            btn.type = "button";
                            btn.style = "cursor: pointer;";
                        }
                        const span = document.createElement("span");
                        span.innerText = "上传记录";
                        btn.appendChild(span);
                        div.appendChild(btn);
                    }
                }

                const eIndex = tr.getElementsByClassName("el-table_1_column_1 is-center ")[0].getElementsByTagName("div")[0];
                const eTubNo = tr.getElementsByClassName("el-table_1_column_2  ")[0].getElementsByTagName("div")[0];
                const eTime  = tr.getElementsByClassName("el-table_1_column_3  ")[0].getElementsByTagName("div")[0];
                const eName  = tr.getElementsByClassName("el-table_1_column_4  ")[0].getElementsByTagName("div")[0];
                const eIdNo  = tr.getElementsByClassName("el-table_1_column_5  ")[0].getElementsByTagName("div")[0];
                const ePhone = tr.getElementsByClassName("el-table_1_column_6  ")[0].getElementsByTagName("div")[0];
                const eState = tr.getElementsByClassName("el-table_1_column_7  ")[0].getElementsByTagName("div")[0];
                const eBtnOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("button")[0];
                const eTxtOpt= tr.getElementsByClassName("el-table_1_column_8 " )[0].getElementsByTagName("div")[0];

                let err = data["err"];
                try {err = parseInt(err);} catch (e) {}

                eIndex.innerText = (i+1).toString();
                eTubNo.innerText = data["testNum"];
                eTime .innerText = new Date(parseInt(data["optTime"])).Format("yyyy-MM-dd hh:mm:ss");
                eName .innerText = data["fullName"];
                eIdNo .innerText = data["idCard"];
                ePhone.innerText = data["mobile"];

                if(eTxtOpt.style == null){
                    eTxtOpt.style = new CSSStyleDeclaration();
                }
                if(err === 1){/*失败*/
                    eTxtOpt.innerText = "重新上传";
                    eState.innerText = "已失败";
                    eTxtOpt.style.color = "red";
                }
                else if(err === 2){/*成功*/
                    eState.innerText = "已上传";
                    eTxtOpt.style.color = "green";
                }
                else {/*等待*/
                    eState.innerText = "待上传";
                    eTxtOpt.style.color = "blue";
                }

                eBtnOpt.onclick = function () {
                    if(err === 2) {
                        HSCJControlPanel.speak("已上传！");
                        return;
                    }
                    const callback = {
                        onFailure : function (code,msg) {
                            err = 1;
                            eTxtOpt.innerText = "重新上传";
                            eState.innerText = "已失败";
                            eTxtOpt.style.color = "red";

                            HSCJControlPanel.speak(msg,false);
                        },
                        onSuccess : function (code,msg,datas) {
                            OfflineSamplingManager.markSamplingResult(data.idType??1,data.idCard,2,{
                                onSuccess:()=>{},
                                onFailure:()=>{}
                            });
                            HSCJControlPanel.speak("上传成功！");
                            eState.innerText = "已上传";
                            eTxtOpt.style.color = "green";
                            err = 2;
                        }
                    };

                    HSCJApiProvider.samplingRecord(data["testNum"],data,callback,true);
                }

                tbody.appendChild(tr);
            }
        },
        onFailure : function (err){
            HSCJControlPanel.speak("查询失败！"+err,true);
        }
    });
};

HSCJControlPanel.downloadOfflineSamplingRecords = async function(){
    OfflineSamplingManager.listAll({
        onSuccess : function (datas) {
            if ((datas?.length??0) === 0) {
                HSCJControlPanel.speak("无离线记录！", false);
                return;
            }

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet([]);
            worksheet["!cols"] = [ { wch: 6 },{ wch: 18 },{ wch: 15 },{ wch: 11 },{ wch: 10 },{ wch: 10 }, { wch:10} ];
            const title = ["姓名", "身份号","地址","手机号","试管编号","采样时间","状态"];
            XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
            worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                try{ return { wch:Math.max(width.wch,title[index].length)}; }
                catch(e){ return {wch:10}; }
            });
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            for(let i=0,ni=datas?.length??0; i<ni; ++i) {
                const data    = datas[i];
                let err = data["err"]??0;
                try {err = parseInt(err);} catch (e) {}
                const state   = err===1?"上传失败": err===2?"上传完成":"等待上传";
                const name    = data["fullName"];
                const idNo    = data["idCard"];
                const phone   = data["mobile"];
                const tubNo   = data["testNum"];
                const address = data["address"];
                const time    = new Date(parseInt(data["optTime"])).Format("yyyy-MM-dd hh:mm:ss");

                const rowInfo  = worksheet["!ref"];
                const rowCount = parseInt(rowInfo.substr(rowInfo.search(":")+2))+1;
                const row      = [name, idNo, address, phone, tubNo, time, state];

                worksheet["!cols"] = worksheet["!cols"].map((width,index,arr)=>{
                    try{return {wch:Math.max(width.wch,row[index].length)};} catch(e){return {wch:10};}
                });

                XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: "A"+rowCount});
            }

            XLSX.writeFile(workbook, "核酸离线采样记录 "+TimeUtils.parseTimestamp2ZhFormat(new Date().getTime())+".xls");
        },
        onFailure:function (err) {
            HSCJControlPanel.speak("采样记录查询失败！", false);
        }
    });
};

HSCJControlPanel.cleanOfflineSamplingRecords = async function () {
    if(confirm("确定要删除所有离线记录吗？")){
        OfflineSamplingManager.clearDB({
            onSuccess:function () {
                HSCJControlPanel.onDataChanged();
                HSCJControlPanel.speak("删除成功！",false);
            },
            onFailure:function (err) {
                HSCJControlPanel.speak(err??"删除失败！",false);
            }
        });
    }
};

HSCJControlPanel.updateOfflineSamplingRecordsDisplayInfo = async function () {
    OfflineSamplingManager.queryOfflineInfo({
        onSuccess:function (datas){
            const data = (datas??{})[0]??{};
            const tubsCount     = data["tubsCount"]??0;
            const successCount  = data["successCount"]??0;
            const failureCount  = data["failureCount"]??0;
            const samplingCount = data["samplingCount"]??0;
            const allCount      = data["allCount"]??0;

            const percent = samplingCount === 0? 100 : parseInt((successCount*100/(successCount+samplingCount)));

            HSCJControlPanel.setOfflineProgress(percent);
            HSCJControlPanel.setOfflineProgressPercent(percent);
        },
        onFailure:function (err) {}
    });

    OfflineSamplingManager.displayOfflineInfo({
        onSuccess:function (datas) {
            if((datas?.length??0) === 0){
                HSCJControlPanel.setCountOfRemainingOfflineTubs(0);
                HSCJControlPanel.setCountOfRemainingOfflineNums(0);
                HSCJControlPanel.setCountOfFailedOfflineTubs(0);
                HSCJControlPanel.setCountOfFailedOfflineNums(0);
                return;
            }

            const data = datas[0]??{};

            const restOfTubs  = data["restOfTubs" ]??0;
            const restOfNums  = data["restOfNums" ]??0;
            const failureTubs = data["failureTubs"]??0;
            const failureNums = data["failureNums"]??0;

            HSCJControlPanel.setCountOfRemainingOfflineTubs(restOfTubs);
            HSCJControlPanel.setCountOfRemainingOfflineNums(restOfNums);
            HSCJControlPanel.setCountOfFailedOfflineTubs(failureTubs);
            HSCJControlPanel.setCountOfFailedOfflineNums(failureNums);
        },
        onFailure:function (err){
            HSCJControlPanel.warn("查询展示离线数据失败！"+err);
        }
    });

    const tubNo = HSCJControlPanel.getCurrentProcessingOfflineTubNo() ?? "";
    if(tubNo.trim().length===0){
        HSCJControlPanel.setCurrentProcessingOfflineTubs("无");
        HSCJControlPanel.setCountOfProcessingFailedNums(0);
        HSCJControlPanel.setCountOfProcessingSuccessNums(0);
        HSCJControlPanel.setCountOfProcessingReadyNums(0);
    }
    else{
        HSCJControlPanel.setCurrentProcessingOfflineTubs(tubNo);
        OfflineSamplingManager.displayTubNoInfo(tubNo,{
            onSuccess:(datas)=>{
                const data = datas[0]??{};
                const successCount  = data["successCount" ]??0;
                const failureCount  = data["failureCount" ]??0;
                const samplingCount = data["samplingCount"]??0;
                HSCJControlPanel.setCountOfProcessingFailedNums(failureCount);
                HSCJControlPanel.setCountOfProcessingSuccessNums(successCount);
                HSCJControlPanel.setCountOfProcessingReadyNums(samplingCount);
            },
            onFailure:(err)=>{
                HSCJControlPanel.warn("查询展示离线试管数据失败！"+err)
            }
        });
    }
};

HSCJControlPanel.updateOfflineButtonState = function () {
    HSCJControlPanel.setOfflineBtnEnabled(HSCJControlPanel.isOfflineMode());
};

HSCJControlPanel.updateServerState = async function(){
    const ping = HSCJApiProvider.getPingAVG();
    let shown = ping < 1 ? "?" : parseInt(ping);
    let color = "black";
    let status = "";
    if(ping<1){
        status = "未知";
        color = "red";
    }
    else if(ping<100){
        status = "顺畅";
        color = "#00e676";
    }
    else if(ping<300){
        status = "正常";
        color = "#76ff03";
    }
    else if(ping<800){
        status = "繁忙";
        color = "#FF6634";
    }
    else if(ping<1500){
        status = "拥堵";
        color = "#e53935";
    }
    else if(ping>50000){
        status = "断开";
        color  = "purple";
    }
    else{
        status = "阻塞";
        color = "red";
    }
    if(HSCJLocalSettingManager.isBreakLineMode()){
        const msg = HSCJLocalSettingManager.getBreakLineLoginData().msg;
        if((msg?.trim()?.length??0) > 0)
            status = status + " " + msg;
    }
    HSCJControlPanel.setServerPing(shown);
    HSCJControlPanel.setServerState(status,color);
};

HSCJControlPanel.updateSupportInfo = async function(){
    const now = new Date().getTime();
    const lastUpdate = HSCJControlPanel.updateSupportInfo.lLastUpdateTimestamp ?? 0;
    if(now - lastUpdate<5000) return;
    HSCJControlPanel.updateSupportInfo.lLastUpdateTimestamp = now;

    const isCameraOpen   = CameraUtils.isCameraOpen(HSCJControlPanel.getCameraEle());
    const isSamplingPage = HSCJControlPanel.isSamplingPage();
    if(HSCJLocalSettingManager.configOfCameraEnable){
        if(HSCJLocalSettingManager.configOfOCREnable){
            const req = HSCJControlPanel.updateSupportInfo.lLastRequestOCRStateTimestamp??0;
            if(now - req > 30000){
                HSCJControlPanel.updateSupportInfo.lLastRequestOCRStateTimestamp = now;
                OCRUtils.pingOCRServer({
                    onSuccess: function () {
                        HSCJControlPanel.setOCRState(isCameraOpen);
                    },
                    onFailure: function () {
                        HSCJControlPanel.setOCRState(false);
                    }
                });
            }
        }
        if(!isCameraOpen){
            await CameraUtils.openCamera(HSCJControlPanel.getCameraEle(),HSCJControlPanel.getCanvasEle(),false);
        }
    }
    else{
        if(isCameraOpen){
            CameraUtils.closeCamera(HSCJControlPanel.getCameraEle());
        }
        HSCJControlPanel.setOCRState(false);
    }

    let shouldCameraOpen =
        HSCJLocalSettingManager.configOfCameraEnable
        && isSamplingPage
        && !HSCJControlPanel.isDialogOpen()
        && HSCJLocalSettingManager.isCameraVisible();

    if(HSCJLocalSettingManager.isBreakLineMode()){
        const display      = document.getElementById("idOfBreakLineLogin")?.style?.display??null;
        const isShownLogin = !(display === "none");
        shouldCameraOpen = shouldCameraOpen && !isShownLogin;
    }

    HSCJControlPanel.setQRState (isCameraOpen && HSCJLocalSettingManager.configOfQRCodeEnable);
    HSCJControlPanel.setCameraVisible(shouldCameraOpen);
};

HSCJControlPanel.isDialogOpen = function () {
    return !FunctionUtils.isNull(document.getElementById("idOfLocalSamplingDialog"))
        || !FunctionUtils.isNull(document.getElementById("idOfOfflineSamplingDialog"));
};

HSCJControlPanel.updateSummery = async function () {
    const sTubs    = new Set();
    const mRecords = new Map();

    const addDatas = function (datas) {
        for(let i=0,ni=datas?.length??0;i<ni;++i){
            const data = datas[i];
            const tubNo  = data["testNum"]??data["tubNo"]??"";
            sTubs.add(tubNo.toString());

            const idType = (data["idType"]??"").toString();
            const idCard = data["idCard"]??data["idNo"]??"";

            const sTypes = mRecords[idType];
            if(FunctionUtils.isNull(sTypes)){
                mRecords[idType] = new Set([idCard.toString()]);
            }
            else{
                sTypes.add(idCard.toString());
            }
        }
    };

    LocalSamplingRecordManager.listAll({
        onSuccess:(datas)=>{
            addDatas(datas);
            OfflineSamplingManager.listAll({
                onSuccess:(datas)=>{
                    addDatas(datas);
                    let numCount = 0;
                    Object.keys(mRecords).forEach(value => {
                        numCount += mRecords[value]?.size ?? 0;
                    });

                    HSCJControlPanel.setCountOfSummeryTubs(sTubs.size);
                    HSCJControlPanel.setCountOfSummeryNums(numCount);
                },
                onFailure:(err)=>{}
            });
        },
        onFailure:(err)=>{}
    });
};

HSCJControlPanel.updateTubInfo = async function(){
    if(!HSCJControlPanel.isSamplingPage()) return;
    const tables = document.getElementsByClassName("el-table__body");
    if(FunctionUtils.isNull(tables) || tables.length<1) return;
    const tbody = tables[0].lastElementChild;
    const addRecord = function (name,phone,idNo) {
        const tr = document.createElement("tr");
        tr.style = "width:100%;display:table;";
        const td1 = document.createElement("td");
        td1.rowSpan = 1;
        td1.colSpan = 1;
        td1.style = "width:15%";
        td1.className = "el-table_5_column_46  ";
        const div1 = document.createElement("div");
        div1.className = "cell";
        div1.innerText = name;
        td1.appendChild(div1);
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.rowSpan = 1;
        td2.colSpan = 1;
        td2.style = "width:25%";
        td2.className = "el-table_5_column_47  ";
        const div2 = document.createElement("div");
        div2.className = "cell";
        div2.innerText = phone;
        td2.appendChild(div2);
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.rowSpan = 1;
        td3.colSpan = 1;
        td3.style = "width:60%";
        td3.className = "el-table_5_column_48 is-center ";
        const div3 = document.createElement("div");
        div3.className = "cell";
        div3.innerText = idNo;
        td3.appendChild(div3);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    };

    new Promise(async (resolve, reject) => {
        let tubNo = HSCJControlPanel.getCurrentBarcode();
        for(let i=0;i<5&&(tubNo?.trim()?.length??0)<1;++i){
            await FunctionUtils.sleep(50);
            tubNo = HSCJControlPanel.getCurrentBarcode();
        }
        if((tubNo?.trim()?.length??0)<1){
            reject();
            return;
        }

        const ids = new Set();
        const items = [];
        const addItems = (datas)=>{
            if((datas?.length??0) === 0) return;
            for(let i=0,ni=datas?.length??0;i<ni;++i){
                const data = datas[i];
                const item = {
                    "peopleId":data["peopleId"]??"",
                    "fullName":data["fullName"]??data["name"]??"",
                    "address":data["address"]??"",
                    "mobile":data["mobile"]??data["phone"]??"",
                    "idCard":data["idCard"]??data["idNo"]??"",
                    "testNum":tubNo,
                    "testSiteName":data["testSiteName"]??"",
                    "testSiteId":data["testSiteId"]??"",
                    "testStatus":data["testStatus"]??0,
                    "capacity":data["capacity"]??20,
                    "testResultId":data["testResultId"]??"",
                    "timestamp":parseInt(data["optTime"]??data["samplingTime"]??0)
                };
                if(ids.has(item.idCard)) continue;
                ids.add(item.idCard);
                items.push(item);
            }
        }

        LocalSamplingRecordManager.getTubInfo(tubNo,{
            onSuccess : function (datas) {
                addItems(datas);
                OfflineSamplingManager.listOffline(tubNo,{
                    onSuccess:function (datas) {
                        addItems(datas);
                        if(items.length>0){
                            resolve(
                                items.sort((o1, o2) => {
                                    let a = isNaN(o1.timestamp) ? 0 : o1.timestamp;
                                    let b = isNaN(o2.timestamp) ? 0 : o2.timestamp;
                                    return a < b ? 1 : (a===b? 0 : -1);
                                })
                            );
                        }
                        else{
                            if(HSCJLocalSettingManager.isOfflineMode()){
                                resolve([]);
                                return;
                            }
                            reject();
                        }
                    },
                    onFailure:function (error) {
                        reject(error);
                    }
                });
            },
            onFailure : function (err) { reject(err); }
        });
    })
        .then((datas)=>{
            let tbodyCount = tbody.childElementCount??0;
            let dataCount  = datas?.length??0;
            let isSame = false;
            if(tbodyCount === dataCount){
                isSame = true;
                for(let i=0,ni=dataCount;i<ni;++i){
                    const idNo = tbody.children[i].getElementsByTagName("div")[2].innerText;
                    if(idNo === datas[i]["idCard"]) continue;
                    isSame = false;
                    break;
                }
            }
            if(isSame) return;

            while(tbody.childElementCount>0){
                tbody.removeChild(tbody.firstElementChild);
            }
            for(let i=0,ni=datas.length;i<ni;++i){
                const data = datas[i];
                addRecord(data["fullName"],data["mobile"],data["idCard"]);
            }
            HSCJControlPanel.setTubCountDisplay(datas.length);
        })
        .catch(err=>{});
};

HSCJControlPanel.onDataChanged = async function(){
    let lLastChangedTime = this.lLastChangedTime ?? 0;
    let now = new Date().getTime();
    if (now - lLastChangedTime < 3000) return;
    this.lLastChangedTime = now;

    try {
        if(!HSCJControlPanel.isSamplingPage()) return;
        if(HSCJLocalSettingManager.isBreakLineMode()){
            HSCJControlPanel.updateTubInfo();
        }
        HSCJControlPanel.pingServer();
        HSCJControlPanel.updateScriptButtonState();
        HSCJControlPanel.updateLocalSamplingRecordsDisplayInfo();
        HSCJControlPanel.updateOfflineButtonState();
        HSCJControlPanel.updateOfflineSamplingRecordsDisplayInfo();
        HSCJControlPanel.updateServerState();
        HSCJControlPanel.updateSummery();
        HSCJControlPanel.updateSupportInfo();
    } finally {
        setTimeout(()=>HSCJControlPanel.onDataChanged(),3100);
    }
};
HSCJControlPanel.onDataChanged();