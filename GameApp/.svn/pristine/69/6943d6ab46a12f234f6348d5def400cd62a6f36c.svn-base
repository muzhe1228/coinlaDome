/**
 * 获取随机字符串
 */
function randomString(len) {
  len = len || 32;
  var $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = "";
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

var setTimer = null;
//加密
function encryption(data) {
  var randomStr = randomString(16);
  data = Encrypt(JSON.stringify(data), randomStr);
  // rsa加密
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ9s1qlOyv9qpuaTqauW6fUftzE50rVk3yVPZwv1aO1Ch/XSEz76xCwkyvqpaqceRXrPpdBmO5+ruJ+I8osOHo7L5GWEOcMOO+8izp9hXKBBrmRMD4Egpn00k9DhVIEKp/vyddZPS/doxB8onhN6poTJDLdFLFVEicMf52caN9GQIDAQAB"
  );
  var encrypted = encrypt.encrypt(randomStr);
  var json = {
    requestData: data,
    encrypted: encrypted
  };
  return JSON.stringify(json);
}
//解密
function DecryptData(res) {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(
    "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL2KSsvFr9yAtldC6AFAWF3EI9CYRn2P2Fp2trzUyoDGZGRzd4XBE4AeT/7f1+GYPCC2MT/Dhw7pcNpsv+aLlXfuKgHJLVCmi8XxmUmDP9GO9XdMRqe/GW6uJ1eU1N853jm4L35OZHYPNGTmnblTUXvjAXsrYpIa/aDKpm+23Gt/AgMBAAECgYBqtFMdWsKBkZiVkZ4JLk9RIl3DTibJA1UawKBpuCX0zzuvbW3JSAQRaX9BjoT7hPe8trUNH6eGFpeo7/Ys9UIEU61c33Q49NBPEVXH2+PhefIE74b8/H9cu1iYQyn9NSGKt0clo5/CU2G3OA7h+xqD9b7ifd4+DtdrS3KDpTPa0QJBAPhBkdpomvIWmUfI69WerwZHrzMZEFYHThG9SbWw0UgIjdKmSiQmrXawPZLe/o3BxPSIIXDzxiVAimdjVJcfC4kCQQDDc9nUvbLt4TryCfnR7x2KECh3BDEv/cuw/e67m0HYOdooV4KQ4aVous/TbbpcyPGcC180XCHjF11gqVa6hdTHAkBpEJcBsDOjMR093DKy/a1lIwFqxri7L+xCZbHES0jHC5e6BtZp5lSTXpMwjV997vvD4bkFbKX3LhFlIAy0yFbBAkAgvjC43gqypS+9yoQKcldtgKV2wsIGuyq7fN7YmPrf4Vk1tutNoC+YqusUDWbSEmu/a3xIhkK7C3f+MIAyASeTAkEA6CalrJUYBeDcaSHKhmJIceQ7baf8Q7uMYY5gRYuQ4rGudcXXaLi+o2I9f9in5qxE/SM/y9LuBmkzrCuy0tlNXA=="
  );
  var aesKey = decrypt.decrypt(res.encrypted);
  // 用aes秘钥进行解密
  var resultData = Decrypt(res.requestData, aesKey);
  return JSON.parse(resultData);
}
//获取url参数
function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

/**
 * URL参数 封装成object对象
 */
function parserUrlParams() {
  let params = {};
  if (window.location == null) {
    return params
  }

  let name, value;
  let urlStr = window.location.href;
  let paramIndex = urlStr.indexOf("?");
  let paramStr = urlStr.substr(paramIndex + 1);

  let paramArray = paramStr.split("&");
  for (let i = 0; i < paramArray.length; i++) {
    let index = paramArray[i].indexOf("=");
    if (index > 0) {
      name = paramArray[i].substring(0, index);
      value = paramArray[i].substr(index + 1);
      params[name] = value
    }
  }

  return params
}

//获取谷歌验证码
function recaptchaToken(regData, cb) {
  grecaptcha.ready(function() {
    grecaptcha
      .execute(constant.recaptchaKey, { action: "login" })
      .then(function(token) {
        regData.recaptchaCode = token;
        cb(regData);
      })
      .catch(function(err) {
        tishiMode(err);
      });
  });
}

function $http(params, fnSuccess, fnError) {
  return $.ajax({
    url: constant.baseUrl + params.url,
    timeout: 10000, // 超时时间 10 秒
    data: encryption(params.data),
    dataType: "JSON",
    type: "POST",
    contentType: params.contentType ? params.contentType : "application/json",
    async: params.async ? false : true,
    success: function(res) {
      res = DecryptData(res);
      fnSuccess(res);
    },
    error: fnError
  });
}
function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}
//手机号正则判断
function isPhone(str, err) {
    var reg = /^1[23456789]\d{9}$/;
    return reg.test(str);
  }
function isPwd(str) {
  var reg = /^\w{6,20}$/;
  return reg.test(str);
}
function isCode(str) {
  var reg = /^\d{6}$/;
  return reg.test(str);
}
function register(formData) {
  $http(
    { url: constant.registerUrl, data: formData },
    function(res) {
      $(".successMode").fadeIn();
    },
    function(err) {
      tishiMode(err.responseJSON.message);
    }
  );
}
function sendCode(email) {
  $http(
    { url: constant.sendUrl, data: email },
    function(res) {
      if (res.code == 0) {
        var time = 60,
          dom = $(".sendCode");
        dom.attr("disabled", true);
        dom.text(time + "S");
        var timer = setInterval(function() {
          time--;
          var text = time + "S";
          dom.text(text);
          if (time == 0) {
            clearInterval(timer);
            dom.attr("disabled", false);
            dom.text("获取验证码");
          }
        }, 1000);
      } else {
        tishiMode(res.message);
      }
    },
    function(err) {
      console.log(err.responseJSON);
      if (err.responseJSON) {
        tishiMode(err.responseJSON.message);
      }
    }
  );
}
function tishiMode(text) {
  clearTimeout(setTimer);
  $(".tishi")
    .text(text)
    .show(300);
  setTimer = setTimeout(function() {
    $(".tishi")
      .text("")
      .hide(200);
  }, 1800);
}
//判断是苹果还是安卓

function isIos_And_Pc (){
    var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
      return 'ios'
    } else if (isAndroid) {
        return 'android'
    } else {
      return 'pc'
    }
  
}
//判断是否是微信或者QQ浏览器
function is_weixn_qq() {
  var ua = navigator.userAgent.toLowerCase();
//   || ua.match(/QQ/i) == "qq"
  if (
    ua.match(/MicroMessenger/i) == "micromessenger"
  ) {
    return true;
  } else {
    return false;
  }
}
