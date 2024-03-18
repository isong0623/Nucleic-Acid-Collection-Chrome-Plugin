/**
 * Base64加解密
 */
class Base64Utils{
    static encodeTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    static decodeTable = [];

    /**
     * 对字节数组进行Base64加密
     * @param toEncodeBytes
     * @returns {string}
     */
    static _encodeBytes2Base64Str(toEncodeBytes){
        let sEncode = "", ch1,ch2,ch3;

        for (let i = 0, ni = toEncodeBytes.length; i+2<ni; i+=3) {
            ch1 = toEncodeBytes[i  ];
            ch2 = toEncodeBytes[i+1];
            ch3 = toEncodeBytes[i+2];

            sEncode += Base64Utils.encodeTable[(ch1 >> 2)];
            sEncode += Base64Utils.encodeTable[((ch1 << 4) | (ch2 >> 4)) & 0x3F];
            sEncode += Base64Utils.encodeTable[((ch2 << 2) | (ch3 >> 6)) & 0x3F];
            sEncode += Base64Utils.encodeTable[ch3 & 0x3F];
        }

        switch(toEncodeBytes.length % 3){
            case 1:
                ch1 = toEncodeBytes[toEncodeBytes.length - 1];
                sEncode += Base64Utils.encodeTable[(ch1 & 0xFC) >> 2];
                sEncode += Base64Utils.encodeTable[(ch1 & 0x03) << 4];
                sEncode += "==";
                break;
            case 2:
                ch1 = toEncodeBytes[toEncodeBytes.length-2];
                ch2 = toEncodeBytes[toEncodeBytes.length-1];

                sEncode += Base64Utils.encodeTable[(ch1 & 0xFC) >> 2];
                sEncode += Base64Utils.encodeTable[((ch1 & 0x03) << 4) | ((ch2 & 0xF0) >> 4)];
                sEncode += Base64Utils.encodeTable[((ch2 & 0x0F) << 2)];
                sEncode += "=";
                break;
        }

        return sEncode;
    }

    /**
     * 解密Base64
     * @param toDecode
     * @returns {Number[]}
     */
    static _decodeBase64Str2Bytes(toDecode){
        const lstDecode = [];

        for(let i=0,v,ni=toDecode.length;i<ni;){
            v  = Base64Utils.decodeTable[toDecode.charCodeAt(i++)] << 18;
            v += Base64Utils.decodeTable[toDecode.charCodeAt(i++)] << 12;
            lstDecode.push((v & 0x00FF0000) >> 16);
            if(i>=ni || toDecode.charCodeAt(i) === Base64Utils.encodeTable.charCodeAt(64)) break;
            v += Base64Utils.decodeTable[toDecode.charCodeAt(i++)] << 6;
            lstDecode.push((v & 0x0000FF00) >> 8);
            if(i>=ni || toDecode.charCodeAt(i) === Base64Utils.encodeTable.charCodeAt(64)) break;
            v += Base64Utils.decodeTable[toDecode.charCodeAt(i++)];
            lstDecode.push( v & 0x000000FF);
        }

        return lstDecode;
    }

    /**
     * 加密Base64字符串
     * @param toEncode
     * @returns {string}
     */
    static encodeB64Str(toEncode){
        if(toEncode === null || toEncode === undefined) return "";
        const encodeBytes = Base64Utils._utf8EncodeStr2Bytes(toEncode)
        return Base64Utils._encodeBytes2Base64Str(encodeBytes);
    }

    /**
     * 解密Base64
     * @param toDecode
     * @returns {string}
     */
    static decodeB64Str(toDecode){
        const decodeBytes = Base64Utils._decodeBase64Str2Bytes(toDecode);
        return Base64Utils._utf8DecodeBytes2Str(decodeBytes);
    }

    static _utf8EncodeStr2Bytes(string){
        string = string.replace(/\r\n/g,"\n");
        const uft8Bytes = [];
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                uft8Bytes.push(c);
            } else if((c > 127) && (c < 2048)) {
                uft8Bytes.push((c >> 6) | 192);
                uft8Bytes.push((c & 63) | 128);
            } else {
                uft8Bytes.push((c >> 12) | 224);
                uft8Bytes.push(((c >> 6) & 63) | 128);
                uft8Bytes.push((c & 63) | 128);
            }
        }
        return uft8Bytes;
    }

    static _utf8EncodeStr2Str = function (string) {
        string = string.replace(/\r\n/g,"\n");
        let utf8Text = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utf8Text += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utf8Text += String.fromCharCode((c >> 6) | 192);
                utf8Text += String.fromCharCode((c & 63) | 128);
            } else {
                utf8Text += String.fromCharCode((c >> 12) | 224);
                utf8Text += String.fromCharCode(((c >> 6) & 63) | 128);
                utf8Text += String.fromCharCode((c & 63) | 128);
            }
        }
        return utf8Text;
    }

    static _utf8DecodeBytes2Str = function (bytes) {
        let string = "";
        let i = 0;
        let c = 0,c1 = 0,c2 = 0, c3=0;
        while ( i < bytes.length ) {
            c = bytes[i];
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = bytes[i+1];
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = bytes[i+1];
                c3 = bytes[i+2];
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    static _utf8DecodeStr2Str = function (text) {
        let string = "";
        let i = 0;
        let c = 0,c1 = 0,c2 = 0, c3=0;
        while ( i < text.length ) {
            c = text.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = text.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = text.charCodeAt(i+1);
                c3 = text.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

for(let i=0,ni=64;i<ni;++i){
    Base64Utils.decodeTable[Base64Utils.encodeTable.charCodeAt(i)] = i;
}