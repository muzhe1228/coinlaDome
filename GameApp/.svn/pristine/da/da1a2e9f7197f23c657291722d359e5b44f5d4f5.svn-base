import Vue from "vue";
import {
  dateFormat,
  numFormat,
  ZhengFu,
  numberFormat,
  unitConvert,
  gameEnum,
  toFixeds
} from "./func";
import num0 from "Images/Hxjc/@3x/0@3x.png";
import num1 from "Images/Hxjc/@3x/1@3x.png";
import num2 from "Images/Hxjc/@3x/2@3x.png";
import num3 from "Images/Hxjc/@3x/3@3x.png";
import num4 from "Images/Hxjc/@3x/4@3x.png";
import num5 from "Images/Hxjc/@3x/5@3x.png";
import num6 from "Images/Hxjc/@3x/6@3x.png";
import num7 from "Images/Hxjc/@3x/7@3x.png";
import num8 from "Images/Hxjc/@3x/8@3x.png";
import num9 from "Images/Hxjc/@3x/9@3x.png";
import time from "Images/Hxjc/@3x/time@3x.png";
import Num0 from "Images/YYdb/@3x/yydb_num_0@3x.png";
import Num1 from "Images/YYdb/@3x/yydb_num_1@3x.png";
import Num2 from "Images/YYdb/@3x/yydb_num_2@3x.png";
import Num3 from "Images/YYdb/@3x/yydb_num_3@3x.png";
import Num4 from "Images/YYdb/@3x/yydb_num_4@3x.png";
import Num5 from "Images/YYdb/@3x/yydb_num_5@3x.png";
import Num6 from "Images/YYdb/@3x/yydb_num_6@3x.png";
import Num7 from "Images/YYdb/@3x/yydb_num_7@3x.png";
import Num8 from "Images/YYdb/@3x/yydb_num_8@3x.png";
import Num9 from "Images/YYdb/@3x/yydb_num_9@3x.png";
import No0 from "Images/yydbnew/db_0.png";
import No1 from "Images/yydbnew/db_1.png";
import No2 from "Images/yydbnew/db_2.png";
import No3 from "Images/yydbnew/db_3.png";
import No4 from "Images/yydbnew/db_4.png";
import No5 from "Images/yydbnew/db_5.png";
import No6 from "Images/yydbnew/db_6.png";
import No7 from "Images/yydbnew/db_7.png";
import No8 from "Images/yydbnew/db_8.png";
import No9 from "Images/yydbnew/db_9.png";
import chip10 from "Images/Hxjc/@3x/10@3x.png";
import chip50 from "Images/Hxjc/@3x/50@3x.png";
import chip100 from "Images/Hxjc/@3x/100@3x.png";
import chip200 from "Images/Hxjc/@3x/200@3x.png";
import chip500 from "Images/Hxjc/@3x/500@3x.png";
import chip1000 from "Images/Hxjc/@3x/1000@3x.png";
import chip5000 from "Images/Hxjc/@3x/5000@3x.png";
// import chip10000 from "Images/Hxjc/@3x/1000@3x.png";
import orange from "Images/yydbnew/deng_oran@3x.png";
import fen from "Images/yydbnew/deng_fen@3x.png";
import gray from "Images/yydbnew/deng_gray@3x.png";
import blue from "Images/yydbnew/deng_blue@3x.png";
import { randomNum } from "common/func";
//千分符
function toThousands(num) {
  var re = /\d{1,3}(?=(\d{3})+$)/g;
  var n1 = num.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
    return s1.replace(re, "$&,") + s2;
  });
  return n1;
}
function Num(num) {
  num = num.toString();
  switch (num) {
    case "0":
      return num0;
    case "1":
      return num1;
    case "2":
      return num2;
    case "3":
      return num3;
    case "4":
      return num4;
    case "5":
      return num5;
    case "6":
      return num6;
    case "7":
      return num7;
    case "8":
      return num8;
    case "9":
      return num9;
    default:
      return time;
  }
}
function chipNum(num) {
  num = num.toString();
  switch (num) {
    case "10":
      return chip10;
    case "50":
      return chip50;
    case "100":
      return chip100;
    case "200":
      return chip200;
    case "500":
      return chip500;
    case "1000":
      return chip1000;
    case "5000":
      return chip5000;
    // case "10000":
    //   return chip10000;
  }
}
function DbNum(num) {
  num = num.toString();
  switch (num) {
    case "0":
      return Num0;
    case "1":
      return Num1;
    case "2":
      return Num2;
    case "3":
      return Num3;
    case "4":
      return Num4;
    case "5":
      return Num5;
    case "6":
      return Num6;
    case "7":
      return Num7;
    case "8":
      return Num8;
    case "9":
      return Num9;
  }
}
function TigerNum(num) {
  num = num.toString();
  switch (num) {
    case "0":
      return No0;
    case "1":
      return No1;
    case "2":
      return No2;
    case "3":
      return No3;
    case "4":
      return No4;
    case "5":
      return No5;
    case "6":
      return No6;
    case "7":
      return No7;
    case "8":
      return No8;
    case "9":
      return No9;
    default:
      return No0;
  }
}
function DengImg(num) {
  // num = num.toString();
  num = randomNum(1, 4);
  switch (num) {
    case 1:
      return orange;
    case 2:
      return fen;
    case 3:
      return gray;
    case 4:
      return blue;
  }
}
function hashSplic(hash, len) {
  // let hash1 = hash.substring(0, 8);
  let hash2 = hash.substring(hash.length - len);
  return "..." + hash2;
}

//牛牛房间等级
function roomRank(type) {
  type = Number(type);
  switch (type) {
    case 0:
      return "新手场";
    case 1:
      return "中级场";
    case 2:
      return "高级场";
    default:
      return;
  }
}
//牛牛房间状态
function roomStatus(type) {
  type = Number(type);
  switch (type) {
    case 0:
      return "下注中";
    case 1:
      return "封盘";
    case 2:
      return "开奖";
    case 3:
      return "竞庄";
    case 4:
      return "上庄";
    case 5:
      return "重新开盘";
    default:
      return;
  }
}

//牛牛房间Pk格式化
function numRes(number) {
  if (number >= 9999999) {
    return toThousands(number / 10000000) + "M";
  } else if (number >= 9999) {
    var fixed = 2;
    if(number > 999999){
      fixed = 0;
    }
    if(number > 99999){
      fixed = 1;
    }
    return toThousands(parseFloat((number / 10000).toFixed(fixed))) + "W";
  } else {
    return toThousands(number);
  }
}

Vue.filter("toThousands", toThousands); //千分符
Vue.filter("Num", Num); //游戏数字竞猜
Vue.filter("DbNum", DbNum); //游戏数字夺宝
Vue.filter("TigerNum", TigerNum); //老虎机数字夺宝
Vue.filter("chipNum", chipNum); //游戏筹码
Vue.filter("dateFormat", dateFormat); //时间格式化
Vue.filter("numFormat", numFormat); //数字格式化
Vue.filter("unitConvert", unitConvert); //数字格式化,加万
Vue.filter("numberFormat", numberFormat); //数字格式化
Vue.filter("ZhengFu", ZhengFu); //数字格式化
Vue.filter("hashSplic", hashSplic); //hash截取
Vue.filter("DengImg", DengImg); //夺宝跑马灯图片
Vue.filter("gameEnum", gameEnum); //游戏类型枚举
Vue.filter("roomRank", roomRank); //牛牛房间等级
Vue.filter("roomStatus", roomStatus); //牛牛房间状态
Vue.filter("numRes", numRes); //牛牛房间Pk格式化
