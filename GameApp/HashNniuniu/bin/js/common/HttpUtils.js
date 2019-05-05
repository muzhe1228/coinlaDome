var common;
(function (common) {
    var HttpUtils = (function () {
        function HttpUtils(decrypt) {
            this.apiBaseUrl = "http://192.168.10.200:7001";
            this.ajax = new Laya.HttpRequest();
            this.ajax.http.timeout = 10000;
            this.decrypt = decrypt;
            //this.http.once(Laya.Event.PROGRESS, this, this.onRequestProgress);
            this.ajax.on(Laya.Event.COMPLETE, this, this.onRequestComplete);
            this.ajax.on(Laya.Event.ERROR, this, this.onRequestError);
        }
        /**
         *
         * @param actual
         */
        HttpUtils.prototype.cleanArray = function (actual) {
            var newArray = [];
            for (var i = 0; i < actual.length; i++) {
                if (actual[i]) {
                    newArray.push(actual[i]);
                }
            }
            return newArray;
        };
        /**
         * JSON对象转换为QueryString
         * @param jsonObj
         */
        HttpUtils.prototype.toQueryString = function (jsonObj) {
            if (!jsonObj)
                return '';
            var jsonString = this.cleanArray(Object.keys(jsonObj).map(function (key) {
                if (jsonObj[key] === undefined)
                    return '';
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(jsonObj[key]);
            })).join('&');
            return jsonString;
        };
        /**
         * 发送get请求接口
         * @param apiPath
         * @param params
         */
        HttpUtils.prototype.sendGet = function (apiPath, params, caller, callback, contentType) {
            this.caller = caller;
            this.callback = callback;
            contentType = contentType == null ? CommonConsts.ContentType_JSON : contentType;
            var url = this.apiBaseUrl + apiPath;
            var data = this.toQueryString(params);
            this.ajax.send(url, data, CommonConsts.HttpMethod_GET, "json", ["Content-Type", CommonConsts.ContentType_JSON]);
        };
        /**
         * 发数post请求接口
         * @param apiPath
         * @param params
         */
        HttpUtils.prototype.sendPost = function (apiPath, params, caller, callback, contentType) {
            this.caller = caller;
            this.callback = callback;
            contentType = contentType == null ? CommonConsts.ContentType_JSON : contentType;
            var url = this.apiBaseUrl + apiPath;
            var data = contentType == CommonConsts.ContentType_FormData ? this.toQueryString(params) : JSON.stringify(params);
            this.ajax.send(url, data, CommonConsts.HttpMethod_POST, "json", ["Content-Type", contentType]);
        };
        /**
         * 发数post请求接口加密
         * @param apiPath
         * @param params
         */
        HttpUtils.prototype.sendPostKey = function (apiPath, params, caller, callback) {
            this.caller = caller;
            this.callback = callback;
            var url = this.apiBaseUrl + apiPath;
            params = this.encryption(params);
            var data = JSON.stringify(params);
            this.ajax.send(url, data, CommonConsts.HttpMethod_POST, "json", ["Content-Type", CommonConsts.ContentType_JSON]);
        };
        //加解密
        HttpUtils.prototype.cryCommon = function () {
            CryptoJS.pad.ZeroPadding = {
                pad: function (data, blockSize) {
                    // Shortcut
                    var blockSizeBytes = blockSize * 4;
                    // Pad
                    data.clamp();
                    data.sigBytes +=
                        blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
                },
                unpad: function (data) {
                    // Shortcut
                    var dataWords = data.words;
                    // Unpad
                    var i = data.sigBytes - 1;
                    while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
                        i--;
                    }
                    data.sigBytes = i + 1;
                }
            };
        };
        HttpUtils.prototype.randomString = function (len) {
            len = len || 32;
            var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = "";
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };
        HttpUtils.prototype.Encrypt = function (word, randomKey) {
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(randomKey), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        };
        HttpUtils.prototype.Decrypt = function (word, randomKey) {
            var decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(randomKey), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return CryptoJS.enc.Utf8.stringify(decrypt).toString();
        };
        //加密
        HttpUtils.prototype.encryption = function (params) {
            var randomStr, data, encrypt, encrypted;
            this.cryCommon();
            randomStr = this.randomString(16);
            // aes加密
            data = this.Encrypt(JSON.stringify(params), randomStr);
            // rsa加密
            encrypt = new JSEncrypt();
            encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ9s1qlOyv9qpuaTqauW6fUftzE50rVk3yVPZwv1aO1Ch/XSEz76xCwkyvqpaqceRXrPpdBmO5+ruJ+I8osOHo7L5GWEOcMOO+8izp9hXKBBrmRMD4Egpn00k9DhVIEKp/vyddZPS/doxB8onhN6poTJDLdFLFVEicMf52caN9GQIDAQAB");
            encrypted = encrypt.encrypt(randomStr);
            //创建json对象
            return {
                requestData: data,
                encrypted: encrypted
            };
        };
        //解密
        HttpUtils.prototype.DecryptData = function (res) {
            this.cryCommon();
            var decrypt = new JSEncrypt();
            decrypt.setPrivateKey("MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL2KSsvFr9yAtldC6AFAWF3EI9CYRn2P2Fp2trzUyoDGZGRzd4XBE4AeT/7f1+GYPCC2MT/Dhw7pcNpsv+aLlXfuKgHJLVCmi8XxmUmDP9GO9XdMRqe/GW6uJ1eU1N853jm4L35OZHYPNGTmnblTUXvjAXsrYpIa/aDKpm+23Gt/AgMBAAECgYBqtFMdWsKBkZiVkZ4JLk9RIl3DTibJA1UawKBpuCX0zzuvbW3JSAQRaX9BjoT7hPe8trUNH6eGFpeo7/Ys9UIEU61c33Q49NBPEVXH2+PhefIE74b8/H9cu1iYQyn9NSGKt0clo5/CU2G3OA7h+xqD9b7ifd4+DtdrS3KDpTPa0QJBAPhBkdpomvIWmUfI69WerwZHrzMZEFYHThG9SbWw0UgIjdKmSiQmrXawPZLe/o3BxPSIIXDzxiVAimdjVJcfC4kCQQDDc9nUvbLt4TryCfnR7x2KECh3BDEv/cuw/e67m0HYOdooV4KQ4aVous/TbbpcyPGcC180XCHjF11gqVa6hdTHAkBpEJcBsDOjMR093DKy/a1lIwFqxri7L+xCZbHES0jHC5e6BtZp5lSTXpMwjV997vvD4bkFbKX3LhFlIAy0yFbBAkAgvjC43gqypS+9yoQKcldtgKV2wsIGuyq7fN7YmPrf4Vk1tutNoC+YqusUDWbSEmu/a3xIhkK7C3f+MIAyASeTAkEA6CalrJUYBeDcaSHKhmJIceQ7baf8Q7uMYY5gRYuQ4rGudcXXaLi+o2I9f9in5qxE/SM/y9LuBmkzrCuy0tlNXA==");
            var aesKey = decrypt.decrypt(res.encrypted);
            // 用aes秘钥进行解密
            return JSON.parse(this.Decrypt(res.requestData, aesKey));
        };
        /**
         * 请求完成后执行
         * @param resp
         */
        HttpUtils.prototype.onRequestComplete = function (data) {
            if (this.decrypt) {
                data = this.DecryptData(data);
            }
            ;
            if (this.callback) {
                this.callback.apply(this.caller, [data]);
            }
            else {
                console.log("onRequestComplete", this.ajax.url, data);
            }
        };
        /**
         * 请求异常时执行
         * @param error
         */
        HttpUtils.prototype.onRequestError = function (error) {
            console.log("onRequestError", error, JSON.parse(this.ajax.http.response));
            if (this.callback) {
                this.callback.apply(this.caller, [JSON.parse(this.ajax.http.response)]);
            }
        };
        return HttpUtils;
    }());
    common.HttpUtils = HttpUtils;
})(common || (common = {}));
//# sourceMappingURL=HttpUtils.js.map