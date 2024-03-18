JSON.parseBody = function (body) {
    let bodyJson = {};
    if(body === null || body === undefined) return bodyJson;

    if(body.constructor === String){
        if(body.trim().startsWith("{")){
            try{bodyJson = JSON.parse(body);}catch (e){}
        }

        if ((Object.keys(bodyJson).length === 0) && ((body?.length ?? 0) !== 0) && body.trim().startsWith("http") === true) {
            const index = body.indexOf("?");
            if (index > -1) {
                const url = UrlDecode(body.substring(index + 1));
                url.split("&").map((data) => {
                    let index = data.indexOf("=");
                    if (index < 0) return;
                    let key = data.substring(0, index);
                    let value = data.substring(index + 1);
                    bodyJson[key] = value;
                });
            }
        }

        if ((Object.keys(bodyJson).length === 0) && ((body?.length ?? 0) !== 0)) {
            body.split(",").map((data) => {
                let index = data.indexOf("=");
                if (index < 0) return;
                let key = data.substring(0, index);
                let value = data.substring(index + 1);
                bodyJson[key] = value;
            });
        }
    }
    else{
        try {bodyJson = JSON.parse(JSON.stringify(body));} catch (e) {}
    }

    return bodyJson;
}


function UrlDecode(zipStr){

    let uzipStr = '';
    for (let i = 0; i < zipStr.length; i += 1) {
        let chr = zipStr.charAt(i);
        if (chr === '+') {
            uzipStr += ' ';
        } else if (chr === '%') {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt('0x' + asc) > 0x7f) {
                uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i+3, i+9).toString());
                i += 8;
            }else{
                uzipStr += AsciiToString(parseInt('0x' + asc));
                i += 2;
            }
        }else{
            uzipStr += chr;
        }
    }

    return uzipStr;
}

function StringToAscii(str){
    return str.charCodeAt(0).toString(16);
}

function AsciiToString(asccode){
    return String.fromCharCode(asccode);
}


class FunctionUtils{
    static sleep(millis){
        return new Promise(resolve => setTimeout(resolve,millis));
    }

    static isNull(obj){
        return obj === null || obj === undefined;
    }
}

