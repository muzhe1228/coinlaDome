/* eslint-disable */
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
//bgm 播放
function bgmPlay() {
  var audio = document.getElementById("bgmMusic");
  audio.play();
}

function closeBgm() {
  var audio = document.getElementById("bgmMusic");
  audio.pause();
}

// 冒泡排序
function bubbleSort(arr) {
  var low = 0;
  var high = arr.length - 1; //设置变量的初始值
  var tmp, j;
  while (low < high) {
    for (j = low; j < high; ++j) {
      //正向冒泡,找到最大者
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
    --high; //修改high值, 前移一位
    for (j = high; j > low; --j) {
      //反向冒泡,找到最小者
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    }
    ++low; //修改low值,后移一位
  }
  return arr;
}

//获取数组中最大值，es5写法
function getArrMax(arr) {
  return Math.max.apply(Math, arr);
}

//获取数组中最大值，es6写法
function getArrMaxVal(arr) {
  return Math.max(...arr);
}

// 去除数组中的重复项
function unique(arr) {
  var newArr = [];
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    for (var j = i + 1; j < l; j++) {
      if (arr[i] === arr[j]) j = ++i;
    }
    newArr.push(arr[i]);
  }
  return newArr;
}

// 获取一个区间的随机整数
// @param n : 区间的最小值
// @param m : 区间的最大值
function rnd(n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

var cookie = {
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  setCookie: function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  },
  clearCookie: function(cname) {
    this.setCookie(cname, "", -1);
  }
};

//判断网络连接与断开
function isOnline(onlineCb, offlineCb) {
  let el = document.body;
  if (el.addEventListener) {
    window.addEventListener(
      "online",
      function() {
        onlineCb();
      },
      true
    );
    window.addEventListener(
      "offline",
      function() {
        offlineCb();
      },
      true
    );
  } else if (el.attachEvent) {
    window.attachEvent("ononline", function() {
      onlineCb();
    });
    window.attachEvent("onoffline", function() {
      offlineCb();
    });
  } else {
    window.ononline = function() {
      onlineCb();
    };
    window.onoffline = function() {
      offlineCb();
    };
  }
}

//localStorage和localSession封装
var Store = function() {
  this.name = "Store";
};
Store.prototype = {
  init: function(options) {
    this.store = function() {
      return options.type;
    };
    return this;
  },
  set: function(key, value) {
    var type = dataType(value);

    switch (type) {
      case "object":
      case "array":
        this.store().setItem(key, JSON.stringify(value));
        break;
      // case 'array':
      //             this.store().setItem(key,'['+value+']');
      //             break;
      case "function": //如果是函数先用eval()计算执行js代码
        this.store().setItem(key, value);
        break;
      default:
        this.store().setItem(key, value);
    }
  },
  get: function(key) {
    var value = this.store().getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  },
  getAll: function() {
    var json = {};
    var value = "";

    for (var attr in this.store()) {
      try {
        value = JSON.parse(this.store()[attr]);
      } catch (e) {}
      json[attr] = value;
    }
    return json;
  },
  remove: function(key) {
    this.store().removeItem(key);
  },
  clear: function() {
    this.store().clear();
  }
};
var lStore = new Store().init({
  type: window.localStorage
});

var sStore = new Store().init({
  type: window.sessionStorage
});

//根据设备宽度来写相对布局,
//最小1rem=100px(宽度为375px屏幕下),3.75rem=100%;
//根据375屏幕下换算来布局
//小于375屏幕根节点字体大小与375屏幕保持一致，注意宽度的溢出
function htmlFontSize() {
  function change() {
    var fontSize = document.documentElement.clientWidth / 3.75;

    if (fontSize < 100) fontSize = 100;
    if (fontSize > 208) fontSize = 208;
    document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px";
  }
  change();
  window.onresize = change;
}

//判断是否是手机浏览器
function isPhone() {
  var reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  return window.navigator.userAgent.match(reg) ? true : false;
}
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
//判断是否是微信浏览器
function isWeixin() {
  var reg = /(micromessenger)/i;
  return window.navigator.userAgent.match(reg) ? true : false;
}

//正常化日期
function normalDate(oDate) {
  var CurrentDate = oDate;
  var reg = /\-+/g;

  if (dataType(oDate) == "string") {
    oDate = oDate.split(".")[0]; //解决ie浏览器对yyyy-MM-dd HH:mm:ss.S格式的不兼容
    oDate = oDate.replace(reg, "/"); //解决苹果浏览器对yyyy-MM-dd格式的不兼容性
  }

  CurrentDate = new Date(oDate);
  return CurrentDate;
}

//日期格式化函数
//oDate（时间戳或字符串日期都支持）
//fmt（格式匹配）
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//dateFormat0(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
//dateFormat0(new Date(),'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
function dateFormat0(mydate, ft) {
  var fmt = ft || "yyyy/MM/dd hh:mm:ss",
    reg = /\d/g;
  if (reg.test(mydate)) {
    mydate = mydate - 0;
  }

  var oDate = normalDate(mydate);
  var date = {
    "M+": oDate.getMonth() + 1, //月份
    "d+": oDate.getDate(), //日
    "h+": oDate.getHours(), //小时
    "m+": oDate.getMinutes(), //分
    "s+": oDate.getSeconds(), //秒
    "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度，+3为了好取整
    S: oDate.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    //RegExp.$1(正则表达式的第一个匹配，一共有99个匹配)
    fmt = fmt.replace(
      RegExp.$1,
      (oDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var attr in date) {
    if (new RegExp("(" + attr + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? date[attr]
          : ("00" + date[attr]).substring((date[attr] + "").length)
      );
    }
  }

  return fmt;
}
//功能：计算两个时间戳之间相差的日时分秒
//$begin_time  开始时间戳
//$end_time 结束时间戳
function timediff($end_time) {
  var date1 = new Date(); //开始时间
  var date3 = $end_time - new Date().getTime(); //时间差的毫秒数

  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000));

  //计算出小时数

  var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours =
    Math.floor(leave1 / (3600 * 1000)) < 10
      ? "0" + Math.floor(leave1 / (3600 * 1000))
      : Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes =
    Math.floor(leave2 / (60 * 1000)) < 10
      ? "0" + Math.floor(leave2 / (60 * 1000))
      : Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds =
    Math.round(leave3 / 1000) < 10
      ? "0" + Math.round(leave3 / 1000)
      : Math.round(leave3 / 1000);

  var $res = days + "天 " + hours + ":" + minutes + ":" + seconds;
  return $res;
}
//时间格式化(多长时间之前)
//oDate（时间戳或字符串日期都支持）
function dateFormat1(myDate) {
  var oDate = normalDate(myDate);

  if (+oDate >= +new Date()) {
    return "刚刚";
  }
  var lookTime = +new Date() - +oDate;
  var seconds = Math.floor(lookTime / 1000);
  var minutes = Math.floor(lookTime / (1000 * 60));
  var hours = Math.floor(lookTime / (1000 * 60 * 60));
  var days = Math.floor(lookTime / (1000 * 60 * 60 * 24));
  var months = Math.floor(lookTime / (1000 * 60 * 60 * 24 * 30));
  var years = Math.floor(lookTime / (1000 * 60 * 60 * 24 * 30 * 12));

  if (seconds < 60) {
    lookTime = seconds + "秒前";
  } else if (minutes < 60) {
    lookTime = minutes + "分钟前";
  } else if (hours < 24) {
    lookTime = hours + "小时前";
  } else if (days < 30) {
    lookTime = days + "天前";
  } else if (months < 12) {
    lookTime = months + "个月前";
  } else {
    lookTime = years + "年前";
  }
  return lookTime;
}

//格式化数字 12=>12.00
function changeTwoDecimal_f(num) {
  var f_x = parseFloat(num);
  if (isNaN(f_x)) return;
  var f_x1 = Math.floor(num * 100) / 100;
  var s_x = f_x1.toString();
  var pos_decimal = s_x.indexOf(".");
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += ".";
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += "0";
  }
  return s_x;
}

//金额格式化 12232323=>12,232,323.00
function getDecimal(val) {
  var oldValue = val;
  var value = +val;
  var arr = [];
  var len = 2;
  var zero = "";

  for (var i = 0; i < len; i++) {
    zero += "0";
  }

  if (dataType(value) == "number") {
    value += "";
    value = value.split(".");
    value[0] = value[0].split("");
    value[1] = (value[1] || "") + zero;
    value[1] = value[1].substring(0, len);

    arr.unshift(".", value[1]);
    while (value[0].length > 3) {
      arr.unshift(",", value[0].splice(value[0].length - 3, 3).join(""));
    }

    arr = value[0].join("") + arr.join("");
  } else {
    arr = oldValue;
  }

  if (arr && arr.length) arr = arr.replace("-,", "-");
  return arr;
}

function goTop() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(goTop);
    window.scrollTo(0, currentScroll - currentScroll / 5);
  }
}

//文字横向滚动
/*<div id="scroll_div" className="fl">
  <ul id="scroll_begin" className='list'>
      <li>恭喜793765***获得 <span className="pad_right">50元巨人点卡奖励</span></li>
      <li>恭喜793765***获得 <span className="pad_right">50元巨人点卡奖励</span></li>
      <li>恭喜793765***获得 <span className="pad_right">50元巨人点卡奖励</span></li>
      <li>恭喜793765***获得 <span className="pad_right">50元巨人点卡奖励</span></li>
  </ul>
  <div id="scroll_end"></div>
</div>*/
function ScrollTextLeft(scroll_begin, scroll_end, scroll_div) {
  var speed = 60;
  var MyMar = null;
  scroll_end.innerHTML = scroll_begin.innerHTML;
  function Marquee() {
    if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
      scroll_div.scrollLeft -= scroll_begin.offsetWidth;
      // scroll_div.scrollLeft = 0;
    } else scroll_div.scrollLeft++;
  }
  MyMar = setInterval(Marquee, speed);
  scroll_div.onmouseover = function() {
    clearInterval(MyMar);
  };
  scroll_div.onmouseout = function() {
    MyMar = setInterval(Marquee, speed);
  };
}

//文字竖向滚动
/*<div className="roll" id="roll">
  <ul id='begin'>
      <li>第一个结构</li>
      <li>第二个结构</li>
      <li>第三个结构</li>
      <li>第四个结构</li>
      <li>第五个结构</li>
      <li>第六个结构</li>
      <li>第七个结构</li>
      <li>第八个结构</li>
  </ul>
  <div id="end"></div>
</div>*/
function ScrollTextTop(scroll_begin, scroll_end, scroll_div) {
  var speed = 50;
  var MyMar = null;
  scroll_end.innerHTML = scroll_begin.innerHTML;
  function Marquee() {
    if (scroll_end.offsetHeight - scroll_div.scrollTop <= 0) {
      scroll_div.scrollTop -= scroll_begin.offsetHeight;
      // scroll_div.scrollLeft = 0;
    } else scroll_div.scrollTop++;
  }
  MyMar = setInterval(Marquee, speed);
  scroll_div.onmouseover = function() {
    clearInterval(MyMar);
  };
  scroll_div.onmouseout = function() {
    MyMar = setInterval(Marquee, speed);
  };
}

//科学技术法转化
function scientificToNumber(num) {
  if (!num) return num;
  let numStr = num.toString().toLocaleLowerCase();
  if (!/(e)|(E)/g.test(numStr)) {
    return num;
  }
  return Number(num)
    .toFixed(18)
    .replace(/\.0+$/, "")
    .replace(/(\.\d+[1-9])0+$/, "$1");
}

//判断数据类型的方法（对typeof的增强，7种常用类型的判断，返回小写字符串）
function dataType(obj) {
  if (obj === null) {
    return "null";
  }
  if (obj !== obj) {
    return "nan";
  }
  if (typeof Array.isArray === "function") {
    if (Array.isArray(obj)) {
      //浏览器支持则使用isArray()方法
      return "array";
    }
  } else {
    //否则使用toString方法
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      return "array";
    }
  }
  return (typeof obj).toLowerCase();
}

function requestFullScreen() {
  var de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}
//退出全屏
function exitFullscreen() {
  var de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
}
//监听是否全屏
function checkFull() {
  var isFull =
    document.fullscreenEnabled ||
    window.fullScreen ||
    document.webkitIsFullScreen ||
    document.msFullscreenEnabled;
  //to fix : false || undefined == undefined
  if (isFull === undefined) {
    isFull = false;
  }
  return isFull;
}

//16进制颜色转换rgba带透明度（color，0.3）
function colorRgb(color, alpha) {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  color = color.toLowerCase();
  if (color && reg.test(color)) {
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    //处理六位的颜色值
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    if (alpha) {
      return "rgba(" + colorChange.join(",") + "," + alpha + ")";
    } else {
      return "rgb(" + colorChange.join(",") + ")";
    }
  } else {
    return color;
  }
}
function bin2hex(str) {
  var result = "";
  for (let i = 0; i < str.length; i++) {
    result += int16_to_hex(str.charCodeAt(i));
  }
  return result;
}
function int16_to_hex(i) {
  var result = i.toString(16);
  var j = 0;
  while (j + result.length < 4) {
    result = "0" + result;
    j++;
  }
  return result;
}

function getUUID() {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var txt = "http://security.tencent.com/";
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "tencent";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText(txt, 4, 17);
  var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
  var bin = atob(b64);
  var crc = bin2hex(bin.slice(-16, -12)); //var crc = bin.slice(-16,-12);
  return crc;
}

//加解密
function cryCommon() {
  CryptoJS.pad.ZeroPadding = {
    pad: function(data, blockSize) {
      // Shortcut
      var blockSizeBytes = blockSize * 4;

      // Pad
      data.clamp();
      data.sigBytes +=
        blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    },

    unpad: function(data) {
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
}

function randomString(len) {
  len = len || 32;
  var $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function Encrypt(word, randomKey) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(
    srcs,
    CryptoJS.enc.Utf8.parse(randomKey),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return encrypted.toString();
}

function Decrypt(word, randomKey) {
  var decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(randomKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//加密
function encryption(params) {
  let randomStr, data, encrypt, encrypted;
  cryCommon();
  randomStr = randomString(16);
  // aes加密
  data = Encrypt(JSON.stringify(params), randomStr);
  // rsa加密
  encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ9s1qlOyv9qpuaTqauW6fUftzE50rVk3yVPZwv1aO1Ch/XSEz76xCwkyvqpaqceRXrPpdBmO5+ruJ+I8osOHo7L5GWEOcMOO+8izp9hXKBBrmRMD4Egpn00k9DhVIEKp/vyddZPS/doxB8onhN6poTJDLdFLFVEicMf52caN9GQIDAQAB"
  );
  encrypted = encrypt.encrypt(randomStr);
  //创建json对象
  return {
    requestData: data,
    encrypted: encrypted
  };
}
//解密
function DecryptData(res) {
  cryCommon();
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(
    "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL2KSsvFr9yAtldC6AFAWF3EI9CYRn2P2Fp2trzUyoDGZGRzd4XBE4AeT/7f1+GYPCC2MT/Dhw7pcNpsv+aLlXfuKgHJLVCmi8XxmUmDP9GO9XdMRqe/GW6uJ1eU1N853jm4L35OZHYPNGTmnblTUXvjAXsrYpIa/aDKpm+23Gt/AgMBAAECgYBqtFMdWsKBkZiVkZ4JLk9RIl3DTibJA1UawKBpuCX0zzuvbW3JSAQRaX9BjoT7hPe8trUNH6eGFpeo7/Ys9UIEU61c33Q49NBPEVXH2+PhefIE74b8/H9cu1iYQyn9NSGKt0clo5/CU2G3OA7h+xqD9b7ifd4+DtdrS3KDpTPa0QJBAPhBkdpomvIWmUfI69WerwZHrzMZEFYHThG9SbWw0UgIjdKmSiQmrXawPZLe/o3BxPSIIXDzxiVAimdjVJcfC4kCQQDDc9nUvbLt4TryCfnR7x2KECh3BDEv/cuw/e67m0HYOdooV4KQ4aVous/TbbpcyPGcC180XCHjF11gqVa6hdTHAkBpEJcBsDOjMR093DKy/a1lIwFqxri7L+xCZbHES0jHC5e6BtZp5lSTXpMwjV997vvD4bkFbKX3LhFlIAy0yFbBAkAgvjC43gqypS+9yoQKcldtgKV2wsIGuyq7fN7YmPrf4Vk1tutNoC+YqusUDWbSEmu/a3xIhkK7C3f+MIAyASeTAkEA6CalrJUYBeDcaSHKhmJIceQ7baf8Q7uMYY5gRYuQ4rGudcXXaLi+o2I9f9in5qxE/SM/y9LuBmkzrCuy0tlNXA=="
  );
  let aesKey = decrypt.decrypt(res.encrypted);
  // 用aes秘钥进行解密
  return JSON.parse(Decrypt(res.requestData, aesKey));
}

export {
  bgmPlay,
  closeBgm,
  bubbleSort,
  getArrMax,
  getArrMaxVal,
  unique,
  rnd,
  cookie,
  isOnline,
  lStore,
  sStore,
  htmlFontSize,
  isPhone,
  IsPC,
  isWeixin,
  normalDate,
  dateFormat0,
  dateFormat1,
  changeTwoDecimal_f,
  getDecimal,
  goTop,
  ScrollTextLeft,
  ScrollTextTop,
  scientificToNumber,
  requestFullScreen,
  exitFullscreen,
  checkFull,
  colorRgb,
  getUUID,
  encryption,
  DecryptData,
  timediff
};
/* eslint-enable */
