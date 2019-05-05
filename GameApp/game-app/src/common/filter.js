import { scientificToNumber } from "common";
export function showScreen(_this, stateName, url, isOf) {
  const pathname = _this.props.history.location.pathname;
  if (isOf) {
    if (typeof url === "string") {
      if (pathname === url || pathname.indexOf(url) !== -1) {
        _this.setState({
          [stateName]: true
        });
      } else {
        _this.setState({
          [stateName]: false
        });
      }
    } else if (typeof url === "object") {
      let Bol = false;
      for (let i = 0; i < url.length; i++) {
        if (pathname === url[i] || pathname.indexOf(url[i]) !== -1) {
          return _this.setState({
            [stateName]: true
          });
        } else {
          Bol = true;
        }
      }
      if (Bol) {
        _this.setState({
          [stateName]: false
        });
      }
    }
  } else {
    if (typeof url === "string") {
      if (pathname === url) {
        _this.setState({
          [stateName]: true
        });
      } else {
        _this.setState({
          [stateName]: false
        });
      }
    } else if (typeof url === "object") {
      let Bol = false;
      for (let i = 0; i < url.length; i++) {
        if (pathname === url[i]) {
          return _this.setState({
            [stateName]: true
          });
        } else {
          Bol = true;
        }
      }
      if (Bol) {
        _this.setState({
          [stateName]: false
        });
      }
    }
  }
}

export function hashSplic(hash) {
  let hash1 = hash.substring(0, 8);
  let hash2 = hash.substring(hash.length - 7);
  return hash1 + "..." + hash2;
}
export function timerType(state) {
  switch (state) {
    case 0:
      return "下注中剩余：";
    case 1:
      return "开奖中：";
    case 2:
      return "重新开盘：";
    default:
      return;
  }
}

export function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}
export function isPwd(str) {
  var reg = /^\w{6,20}$/;
  return reg.test(str);
}
export function isCode(str) {
  var reg = /^\d{6}$/;
  return reg.test(str);
}

//截取字符串（数字，位数）
export function coinSplice(nums, len) {
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

//判断，天，地，玄，庄
export function isMen(type) {
  switch (type) {
    case 0:
      return "庄";
    case 1:
      return "天";
    case 2:
      return "地";
    case 3:
      return "玄";
    default:
      return;
  }
}

//游戏类型
export function GameTypes (code){
  switch (code) {
    case 0:
      return "牛牛";
    case 1:
      return "竞猜";
    case 2:
      return "彩票";
    case 3:
      return "一元夺宝";
    default:
      return;
  }
}
