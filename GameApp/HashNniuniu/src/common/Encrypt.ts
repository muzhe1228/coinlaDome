module Encrypt {
    // //加解密
    // export const cryCommon = function (): void {
    //     CryptoJS.pad.ZeroPadding = {
    //         pad: function (data, blockSize) {
    //             // Shortcut
    //             var blockSizeBytes: any = blockSize * 4;

    //             // Pad
    //             data.clamp();
    //             data.sigBytes +=
    //                 blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    //         },

    //         unpad: function (data) {
    //             // Shortcut
    //             var dataWords: any = data.words;

    //             // Unpad
    //             var i = data.sigBytes - 1;
    //             while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
    //                 i--;
    //             }
    //             data.sigBytes = i + 1;
    //         }
    //     };
    // }
    // export const randomString = function (len: number): string {
    //     len = len || 32;
    //     var $chars: string =
    //         "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    //     var maxPos: number = $chars.length;
    //     var pwd: string = "";
    //     for (let i = 0; i < len; i++) {
    //         pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    //     }
    //     return pwd;
    // }
    // export const Encrypt = function (word: string, randomKey: string): string {
    //     var srcs = CryptoJS.enc.Utf8.parse(word);
    //     var encrypted = CryptoJS.AES.encrypt(
    //         srcs,
    //         CryptoJS.enc.Utf8.parse(randomKey),
    //         {
    //             mode: CryptoJS.mode.ECB,
    //             padding: CryptoJS.pad.Pkcs7
    //         }
    //     );
    //     return encrypted.toString();
    // }
    // export const Decrypt = function (word, randomKey): string {
    //     var decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(randomKey), {
    //         mode: CryptoJS.mode.ECB,
    //         padding: CryptoJS.pad.Pkcs7
    //     });
    //     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    // }
    // //加密
    // export const encryption = function (params): Object {
    //     let randomStr, data, encrypt, encrypted;
    //     this.cryCommon();
    //     randomStr = this.randomString(16);
    //     // aes加密
    //     data = this.Encrypt(JSON.stringify(params), randomStr);
    //     // rsa加密
    //     encrypt = new JSEncrypt();
    //     encrypt.setPublicKey(
    //         "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ9s1qlOyv9qpuaTqauW6fUftzE50rVk3yVPZwv1aO1Ch/XSEz76xCwkyvqpaqceRXrPpdBmO5+ruJ+I8osOHo7L5GWEOcMOO+8izp9hXKBBrmRMD4Egpn00k9DhVIEKp/vyddZPS/doxB8onhN6poTJDLdFLFVEicMf52caN9GQIDAQAB"
    //     );
    //     encrypted = encrypt.encrypt(randomStr);
    //     //创建json对象
    //     return {
    //         requestData: data,
    //         encrypted: encrypted
    //     };
    // }
    // //解密
    // export const DecryptData = function (res): any {
    //     this.cryCommon();
    //     let decrypt = new JSEncrypt();
    //     decrypt.setPrivateKey(
    //         "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL2KSsvFr9yAtldC6AFAWF3EI9CYRn2P2Fp2trzUyoDGZGRzd4XBE4AeT/7f1+GYPCC2MT/Dhw7pcNpsv+aLlXfuKgHJLVCmi8XxmUmDP9GO9XdMRqe/GW6uJ1eU1N853jm4L35OZHYPNGTmnblTUXvjAXsrYpIa/aDKpm+23Gt/AgMBAAECgYBqtFMdWsKBkZiVkZ4JLk9RIl3DTibJA1UawKBpuCX0zzuvbW3JSAQRaX9BjoT7hPe8trUNH6eGFpeo7/Ys9UIEU61c33Q49NBPEVXH2+PhefIE74b8/H9cu1iYQyn9NSGKt0clo5/CU2G3OA7h+xqD9b7ifd4+DtdrS3KDpTPa0QJBAPhBkdpomvIWmUfI69WerwZHrzMZEFYHThG9SbWw0UgIjdKmSiQmrXawPZLe/o3BxPSIIXDzxiVAimdjVJcfC4kCQQDDc9nUvbLt4TryCfnR7x2KECh3BDEv/cuw/e67m0HYOdooV4KQ4aVous/TbbpcyPGcC180XCHjF11gqVa6hdTHAkBpEJcBsDOjMR093DKy/a1lIwFqxri7L+xCZbHES0jHC5e6BtZp5lSTXpMwjV997vvD4bkFbKX3LhFlIAy0yFbBAkAgvjC43gqypS+9yoQKcldtgKV2wsIGuyq7fN7YmPrf4Vk1tutNoC+YqusUDWbSEmu/a3xIhkK7C3f+MIAyASeTAkEA6CalrJUYBeDcaSHKhmJIceQ7baf8Q7uMYY5gRYuQ4rGudcXXaLi+o2I9f9in5qxE/SM/y9LuBmkzrCuy0tlNXA=="
    //     );
    //     let aesKey = decrypt.decrypt(res.encrypted);
    //     // 用aes秘钥进行解密
    //     return JSON.parse(this.Decrypt(res.requestData, aesKey));
    // }
}