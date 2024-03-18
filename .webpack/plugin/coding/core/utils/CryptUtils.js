class CryptUtils{
    static encryptLogin(text, key = "TheKeyOfmyDatadx") {
        if (typeof text !== 'string') {
            text = JSON.stringify(text);
        }
        const _key = CryptoJS.enc.Utf8.parse(key);
        const srcs = CryptoJS.enc.Utf8.parse(text);
        const encrypted = CryptoJS.AES.encrypt(srcs, _key, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    static decryptLogin(text, key="TheKeyOfmyDatadx") {
        if (typeof text !== 'string') {
            text = JSON.stringify(text);
        }
        const _key = CryptoJS.enc.Utf8.parse(key);
        const decrypt = CryptoJS.AES.decrypt(text, _key, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}