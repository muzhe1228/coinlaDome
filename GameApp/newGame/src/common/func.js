import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
import profixHeader from "./prefixHeader";
import ENV from "../common/Api/ENV";
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
const lStore = new Store().init({
  type: window.localStorage
});
const sStore = new Store().init({
  type: window.sessionStorage
});

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
function dateFormat(mydate, ft) {
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

//转换json
function tryToParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {}
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
//科学计数法
function toFixeds(nums, len) {
  if (nums || nums === 0) {
    let re = `/([0-9]+\.?[0-9]{${len}})[0-9]*/`,
      regexp = /(?:\.0*|(\.\d+?)0+)$/;
    nums = scientificToNumber(nums).toString();
    return nums == 0
      ? nums
      : nums.replace(eval(re), "$1").replace(regexp, "$1");
  } else {
    return "--";
  }
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

//手机号正则判断
function isPhone(str, err) {
  var reg = /^1[23456789]\d{9}$/;
  return reg.test(str);
}

function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
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
function numFormat(num) {
  if (!num) return 0;
  var res = num.toString().replace(/\d+/, function(n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ",";
    });
  });
  return res;
}
function NumRes(num) {
  if (Number(num) < 10) {
    return "0" + num;
  } else {
    return num + "";
  }
}
//秒转分秒
function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    // //如果分钟大于60，将分钟转换成小时
    // if(minuteTime > 60) {
    //     //获取小时，获取分钟除以60，得到整数小时
    //     hourTime = parseInt(minuteTime / 60);
    //     //获取小时后取佘的分，获取分钟除以60取佘的分
    //     minuteTime = parseInt(minuteTime % 60);
    // }
  }
  var result = NumRes(parseInt(secondTime));

  if (minuteTime > 0) {
    result = NumRes(parseInt(minuteTime)) + ":" + result;
  }
  // if(hourTime > 0) {
  //   result = "" + parseInt(hourTime) + "小时" + result;
  // }
  return result;
}
//获取dom距离四周的边距
function getElementDL(element, direction) {
  let Length = parseInt(element.getBoundingClientRect()[direction]);
  return Length;
}
//竞猜下注
function HxjcNum(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr = [...newArr, arr[i].num];
  }
  return newArr.join(",");
}
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
function ZhengFu(num) {
  if (num > 0) {
    return "+" + num;
  } else {
    return num;
  }
}

function formatSecondsToHM(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = (secondTime < 10 ? "0" : "") + parseInt(secondTime);

  if (minuteTime >= 0) {
    result = (minuteTime < 10 ? "0" : "") + parseInt(minuteTime) + ":" + result;
  }
  if (hourTime >= 0) {
    result = (hourTime < 10 ? "0" : "") + parseInt(hourTime) + ":" + result;
  }
  return result;
}

function restOtherChip(num) {
  let arr = [];
  if (Math.floor(num / 5000)) {
    let len = Math.floor(num / 5000);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 5000];
    }
    num = num % 5000;
  }
  if (Math.floor(num / 1000)) {
    let len = Math.floor(num / 1000);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 1000];
    }
    num = num % 1000;
  }
  if (Math.floor(num / 500)) {
    let len = Math.floor(num / 500);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 500];
    }
    num = num % 500;
  }
  // if (Math.floor(num / 200)) {
  //   let len = Math.floor(num / 200);
  //   for (let i = 0; i < len; i++) {
  //     arr = [...arr, 200];
  //   }
  //   num = num % 200;
  // }
  if (Math.floor(num / 100)) {
    let len = Math.floor(num / 100);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 100];
    }
    num = num % 100;
  }
  if (Math.floor(num / 50)) {
    let len = Math.floor(num / 50);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 50];
    }
    num = num % 50;
  }
  if (Math.floor(num / 10)) {
    let len = Math.floor(num / 10);
    for (let i = 0; i < len; i++) {
      arr = [...arr, 10];
    }
  }
  return arr;
}

/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 * */
function numberFormat(number, decimals, dec_point, thousands_sep) {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function unitConvert(num) {
  var moneyUnits = ["", "万", "亿", "万亿"];
  var dividend = 10000;
  var curentNum = num; //转换数字
  var curentUnit = moneyUnits[0]; //转换单位
  for (var i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i];
    if (strNumSize(curentNum) < 5) {
      break;
    }
    curentNum = curentNum / dividend;
  }
  var m = { num: 0, unit: "" };
  m.num = curentNum.toFixed(0);
  m.unit = curentUnit;
  return m.num + m.unit;
}
function strNumSize(tempNum) {
  var stringNum = tempNum.toString();
  var index = stringNum.indexOf(".");
  var newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

function clickAudio(muted) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("clickAudio");
  if (muted) {
    bgm.muted = muted;
  } else {
    bgm.muted = false;
  }
  bgm.load();
  bgm.play();
}
function sendMessage() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./va/sendMsg.mp3";
  audioObj.play();
}
function clickGame() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./va/clickGame.mp3";
  audioObj.play();
}

function closeMainBgm() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let mainBgm = document.getElementById("mainBgm");
  mainBgm.pause();
}
function clickChip() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./va/chip.mp3";
  audioObj.play();
}
function slideBgm() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./va/Hxjc/slideBgm.mp3";
  audioObj.play();
}
function chipDown() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.volume = 0.7;
  audioObj.src = "./va/Hxjc/chipDown.mp3";
  audioObj.play();
}
function clickOpenClose() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./yydb/openClose.mp3";
  audioObj.play();
}
function clickDialog() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./yydb/showDialog.mp3";
  audioObj.play();
}
function clickAddReduce() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./yydb/addreduce.mp3";
  audioObj.play();
}
function winPK() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./yydb/winPk.mp3";
  audioObj.play();
}
function yaZhu() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = new Audio();
  audioObj.src = "./yydb/clickYazhu.mp3";
  audioObj.play();
}

//夺宝欢迎光临
function dbWelcom(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let welcomeHXJC = document.getElementById("db_welcomeBGM");
  if (volume > 0) {
    welcomeHXJC.muted = false;
  } else {
    welcomeHXJC.muted = true;
  }
  welcomeHXJC.load();
  welcomeHXJC.play();
}

//夺宝开局请下注
function dbStartGame(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("db_startBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//夺宝下注成功
function dbXiaZhuSuccess(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("db_XiaZhuSuccessBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//夺宝停止下注
function dbStopXiaZhu(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("db_StopXiaZhuBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//预加载哈希竞猜背景音乐
function hxjcPlayAllBackgroundBGM() {
  for (var i = 1; i <= 5; i++) {
    let bgm = document.getElementById("hxjc_bgm_" + i);
    bgm.muted = true;
    bgm.load();
    bgm.play();
  }
}

//哈希竞猜背景音乐
function hxjcBackgroundBGM() {
  hxjcCloseBackgroundBGM();

  let bgm = document.getElementById("hxjc_bgm_" + randomNum(1, 5));
  bgm.muted = false;
  bgm.load();
  bgm.play();
}

//关闭哈希竞猜背景音乐
function hxjcCloseBackgroundBGM() {
  for (var i = 1; i <= 5; i++) {
    let bgm = document.getElementById("hxjc_bgm_" + i);
    bgm.muted = true;
    bgm.pause();
  }
}

//哈希竞猜封盘音效
function hxjcCountDownDing(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("hxjc_countdown_ding");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//预加载全部哈希竞猜开奖结果
function hxjcLoadAllOpenResult() {
  for (var i = 0; i <= 9; i++) {
    let audioObj = document.getElementById("hxjc_num_" + i);
    audioObj.muted = true;
    audioObj.load();
    audioObj.play();
  }
}

//哈希竞猜开奖结果
function hxjcOpenResult(num) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let audioObj = document.getElementById("hxjc_num_" + num);
  audioObj.muted = false;
  audioObj.volume = 1;
  audioObj.load();
  audioObj.play();
}

//哈希竞猜欢迎光临
function welcomeHXJC(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let welcomeHXJC = document.getElementById("hxjc_welcomeBGM");
  if (volume > 0) {
    welcomeHXJC.muted = false;
  } else {
    welcomeHXJC.muted = true;
  }
  welcomeHXJC.load();
  welcomeHXJC.play();
}

//哈希竞猜开局请下注
function hxjcStartGame(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("hxjc_startBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//哈希竞猜下注成功
function hxjcXiaZhuSuccess(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("hxjc_XiaZhuSuccessBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//哈希竞猜停止下注
function hxjcStopXiaZhu(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("hxjc_StopXiaZhuBGM");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.load();
  bgm.play();
}

//预加载所有哈希竞猜倒计时
function hxjcLoadAllCountDown() {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  for (var i = 1; i <= 5; i++) {
    let bgm = document.getElementById("hxjc_countdown_" + i);
    bgm.muted = true;
    bgm.load();
    bgm.play();
  }
}

//哈希竞猜倒计时
function hxjcCountDown(num) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("hxjc_countdown_" + num);
  bgm.muted = false;
  bgm.load();
  bgm.play();
}

//哈希竞猜筹码飞出音效
function hxjcChipDownBGM(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("chipDown");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  var percent = bgm.currentTime / bgm.duration;
  if (percent == 1 || percent == 0) {
    bgm.load();
    bgm.play();
  }
}

//哈希竞猜跑马灯音效
function hxjcSlideBgm(volume) {
  if (!lStore.get("Game_Audio_Switch")) {
    return;
  }
  let bgm = document.getElementById("slideBgm");
  if (volume > 0) {
    bgm.muted = false;
  } else {
    bgm.muted = true;
  }
  bgm.currentTime = 0;
  bgm.play();
}

//游戏类型枚举
function gameEnum(type) {
  type = type.toString();
  switch (type) {
    case "0":
      return "牛牛游戏";
    case "1":
      return "猜尾数";
    case "2":
      return "彩票游戏";
    case "3":
      return "夺宝游戏";
    default:
      break;
  }
}

function isIos() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return false;
  }
  if (isiOS) {
    return true;
  }
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

//掉Android、IOS方法打开微信:0或QQ:1
function openWechatApp(appType) {
  if (!IsPC()) {
    if (isIos()) {
      window.webkit.messageHandlers.openApp.postMessage("openWechat");
    } else {
      window.openApp.openWechat(appType);
    }
  }
}
function openQQApp(appType) {
  if (!IsPC()) {
    if (isIos()) {
      window.webkit.messageHandlers.openApp.postMessage("openQQ");
    } else {
      window.openApp.openQQ(appType);
    }
  }
}

function clearHistory() {
  if (!IsPC()) {
    if (!isIos()) {
      window.openApp.clearHistory();
    }
  }
}
function changeInput(text) {
  if (!IsPC()) {
    if (!isIos()) {
      window.openApp.changeInput(text);
    }
  }
}
//获取应用生成 token
function requestClientToken(type) {
  this.$ajax(
    {
      url: "/uac/user/getTimes",
      data: {
        params: {}
      }
    },
    false
  )
    .then(res => {
      if (res.code === 0) {
        console.log(res);
        if(isIos()) {
          window.webkit.messageHandlers.NativeMethod.postMessage("md5://"+res.data);
        } else {
          window.openApp.verifyWithRecapt(res.data);
        }
      }
    })
    .catch(err => {
      console.log("查询服务器时间错误结果：" + err);
    });
}
// 获取谷歌token
function recaptchaToken() {
  if (ENV.getENV().dontCheck) {
    return "";
  }
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    grecaptcha.ready(async () => {
      // eslint-disable-next-line no-undef
      const token = await grecaptcha.execute(profixHeader.GoogleSiteKey);
      resolve(token);
    });
  });
}

// 判断是不是客户端
function getAppType() {
  if(isIos()) {
    window.webkit.messageHandlers.NativeMethod.postMessage("checkINApp");
  } else {
    window.openApp.getTypeApp("");
  }
}
//字符串长度
function stringLength(str){
  var len = 0;
  for (var i=0; i<str.length; i++) { 
   var c = str.charCodeAt(i); 
  //单字节加1 
   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
     len++; 
   } 
   else { 
    len+=2; 
   } 
  } 
  return len;
}

export {
  Store,
  lStore,
  sStore,
  DecryptData,
  encryption,
  openWechatApp,
  openQQApp,
  isPhone,
  isEmail,
  isPwd,
  isCode,
  dateFormat,
  tryToParseJson,
  toFixeds,
  numFormat,
  unitConvert,
  formatSeconds,
  formatSecondsToHM,
  getElementDL,
  HxjcNum,
  randomNum,
  ZhengFu,
  restOtherChip,
  numberFormat,
  clickAudio,
  clickGame,
  closeMainBgm,
  clickChip,
  slideBgm,
  chipDown,
  clickOpenClose,
  clickDialog,
  clickAddReduce,
  winPK,
  yaZhu,
  sendMessage,
  hxjcCountDown,
  hxjcCountDownDing,
  hxjcOpenResult,
  welcomeHXJC,
  hxjcStartGame,
  hxjcXiaZhuSuccess,
  hxjcStopXiaZhu,
  dbWelcom,
  dbStartGame,
  dbXiaZhuSuccess,
  dbStopXiaZhu,
  hxjcPlayAllBackgroundBGM,
  hxjcBackgroundBGM,
  hxjcCloseBackgroundBGM,
  hxjcLoadAllCountDown,
  hxjcLoadAllOpenResult,
  hxjcChipDownBGM,
  hxjcSlideBgm,
  gameEnum,
  isIos,
  clearHistory,
  recaptchaToken,
  requestClientToken,
  changeInput,
  IsPC,
  getAppType,
  stringLength
};
