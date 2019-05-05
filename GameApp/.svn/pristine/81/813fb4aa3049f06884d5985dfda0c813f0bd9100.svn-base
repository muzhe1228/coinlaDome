import { getElementDL, randomNum, restOtherChip } from "common/func";
//开奖前筹码位置数据重置
function beforOpen(_self, result) {
  let dom = _self.$refs["num" + result][0],
    domW = (dom.offsetWidth - _self.$refs.pkLogo.offsetWidth) / 2,
    domH = (dom.offsetHeight - _self.$refs.pkLogo.offsetHeight) / 2,
    left = getElementDL(_self.$refs.otherUser, "left") - domW,
    top = getElementDL(_self.$refs.otherUser, "top") - domH,
    left1 = getElementDL(dom, "left") - left,
    top1 = getElementDL(dom, "top") - top;
  _self.otherNum.forEach(data => {
    if (data) {
      data.forEach(item => {
        if (item) {
          item.left = Math.floor(
            left1 + randomNum(-domH + domH * 0.2, domH - domH * 0.2)
          );
          item.top = Math.floor(
            top1 + randomNum(-domH + domH * 0.2, domH - domH * 0.2)
          );
        }
      });
    }
  });
  newInterFun(_self, { open: result });
}

//开奖中其他位置筹码移动到中奖的位置
function inOpen(_self, openResult) {
  console.log("openResult:", openResult);

  _self.$chipDown();

  //播放中奖音效
  _self.openResultTimer = setTimeout(() => {
    _self.$hxjcOpenResult(openResult);
  }, 2000);

  _self.otherNum.forEach(data => {
    if (data) {
      data.forEach(item => {
        let ref = _self.$refs["other" + item.checkId][0];
        ref.style.transition = item.transition;
        ref.style.left = item.left + "px";
        ref.style.top = item.top + "px";
        ref.style.opacity = "1";
      });
    }
  });
}
//开奖完成筹码移动到 自己&&其他下注人  并500毫秒后清空筹码数据
function MoveChip(_self, result) {
  let left = getElementDL(_self.$refs.otherUser, "left"),
    top = getElementDL(_self.$refs.otherUser, "top"),
    left1 = getElementDL(_self.$refs.pkLogo, "left"),
    top1 = getElementDL(_self.$refs.pkLogo, "top"),
    openLocation = [0, 1, 2, 3, 6, 10, 9, 8, 7, 4];
  result = openLocation[result];
  _self.otherNum.forEach(data => {
    if (data) {
      data.forEach(item => {
        let ref = _self.$refs["other" + item.checkId][0];
        ref.style.transition = item.transition;
        ref.style.transform = "scale(0)";

        if (_self.topList[result].myBets == _self.topList[result].pkMaxBets) {
          ref.style.left = left1 - left + "px";
          ref.style.top = top1 - top + "px";
        } else {
          if (_self.topList[result].myBets) {
            if (randomNum(0, 10) > 1) {
              ref.style.left = 0;
              ref.style.top = 0;
            } else {
              ref.style.left = left1 - left + "px";
              ref.style.top = top1 - top + "px";
            }
          } else {
            ref.style.left = 0;
            ref.style.top = 0;
          }
        }

        // if (_self.openNum > 0) {
        //   if (_self.topList[result].myBets == _self.topList[result].pkMaxBets) {
        //     ref.style.left = left1 - left + "px";
        //     ref.style.top = top1 - top + "px";
        //   } else {
        //     if (randomNum(0, 10) > 1) {
        //       ref.style.left = 0;
        //       ref.style.top = 0;
        //     } else {
        //       ref.style.left = left1 - left + "px";
        //       ref.style.top = top1 - top + "px";
        //     }
        //   }
        // } else {
        //   ref.style.left = 0;
        //   ref.style.top = 0;
        // }
      });
    }
  });
  _self.$chipDown();
  _self.open = -1;

  _self.endLocalGameTimer = setTimeout(() => {
    // _self.showResult = false;
    // _self.getHxjcData();
    _self.anmit = false;
    _self.openNum = 0;
    _self.openData = {};
    console.log("清空位置信息");
  }, 5500);
}

function newInterFun(_self, params, num) {
  // console.log('num:',num);
  let speed = params.speed || 310,
    open = params.open,
    count = params.count || 0;

  num = num || 0;
  if (num == 10) {
    num = 0;
  }

  clearInterval(_self.speedTimer);
  _self.speedTimer = setInterval(() => {
    // 加速逻辑
    if (count == 0) {
      speed -= 30;
    }

    // 最高速计数逻辑，speed是最高速的限制
    if (speed <= 160 && count < 100) {
      // 最高速保持至少15步，然后当到达开奖数字开始减速
      if (count < 7 || open != num) {
        count++;
      }
      // 赋极大值代表进入减速阶段
      else {
        count = 100;
      }
    }

    // 减速计数逻辑
    else if (count >= 100) {
      // 这里必须大于100并且是10的倍数(1倍代表减速转1圈)
      if (count < 120) {
        speed += 15;
        count++;
      }
      // 开奖逻辑
      else {
        // console.log("num:", num, "open:", open);
        // setTimeout(() => {
        // }, 350 * parseInt(open));
        afterPMDOpenResult(_self, open);

        // inOpen(_self, params.open);
        // _self.showResult = true;
        // if (_self.openData.winBets) {
        //   _self.anmit = true;
        // }
        // _self.endPMDTimer = setTimeout(() => {
        //   MoveChip(_self, open);
        // }, 4500); //5500

        clearInterval(_self.speedTimer);
        return;
      }
    }

    _self.open = num;
    _self.$hxjcSlideBgm(1);
    num++;
    newInterFun(_self, { speed: speed, open: open, count: count }, num, false);
  }, speed);
}
//跑马灯结束后的开奖过程
function afterPMDOpenResult(_self, open) {
  inOpen(_self, open);
  _self.showResult = true;
  _self.inPMD = false;
  if (_self.openData.winBets) {
    _self.anmit = true;
  }
  _self.endPMDTimer = setTimeout(() => {
    MoveChip(_self, open);
  }, 2000);
}

//转盘开奖的函数
function interFun(_self, params, secondSpeed) {
  let num = 0,
    speed = params.speed || 400,
    open = params.open;
  if (!params.stop && params.stop !== 0) {
    _self.speedTimer = setInterval(() => {
      _self.$hxjcSlideBgm(1);
      speed -= 20;
      num++;
      if (num <= 10) {
        _self.open = num;
      } else {
        clearInterval(_self.speedTimer);

        if (speed <= 200 || secondSpeed) {
          if (speed >= 400) {
          } else {
            speed = speed + 100;
            _self.open = 0;
            interFun(_self, { speed: speed, open: open }, true);
          }
        } else {
          speed = speed - 20;
          _self.open = 0;
          interFun(_self, { speed: speed, open: open });
        }
      }
    }, speed);
  } else {
    _self.speedTimer = setInterval(() => {
      _self.$hxjcSlideBgm(1);
      num++;
      if (num < params.stop) {
        _self.open = num;
      } else {
        clearInterval(_self.speedTimer);
        _self.open = params.stop;
        if (_self.openData.winBets) {
          _self.anmit = true;
        }
      }
    }, speed);
  }
}

//哈希竞猜下注
function OkXiaZhu(_self) {
  if (_self.state) return;
  _self.$clickAudio();
  let num = [],
    chip = [];
  _self.yuXia.forEach((item, index) => {
    if (item) {
      num.push(index), chip.push(item);
    }
  });
  if (num.length) {
    if (!_self.canRequestXZ) return;
    _self.canRequestXZ = false;
    _self
      .$ajax(
        {
          url: "/hjs/hashJingcai/saveJingcaiDetail",
          data: {
            params: {
              bets: chip.join(","),
              positionType: num.join(","),
              token: _self.$lStore.get("Token")
            }
          }
        },
        true
      )
      .then(res => {
        _self.canRequestXZ = true;
        if (res.code === 0) {
          _self.$toast("下注成功");
          _self.$hxjcXiaZhuSuccess(1);
          _self.playDown();
          _self.yuXia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          let otherNum = _self.otherNum.concat();
          _self.checkNum.forEach((data, index) => {
            if (data && _self.otherNum[index]) {
              otherNum[index] = [..._self.otherNum[index], ...data];
            } else if (data) {
              otherNum[index] = data;
            }
          });
          _self.otherNum = otherNum;
          _self.checkNum = [];
          _self.$nextTick(() => {
            let otherNum = _self.otherNum.concat();
            otherNum.forEach((data, index) => {
              if (data) {
                data.forEach(item => {
                  if (item.checkId > -1 && item.left3) return;
                  let ref = _self.$refs["other" + item.checkId][0];
                  ref.style.left = item.left3 + "px";
                  ref.style.top = item.top3 + "px";
                  ref.style.opacity = "1";
                  delete item.left3;
                  delete item.top3;
                });
              }
            });
            _self.otherNum = otherNum;
            _self.$nextTick(() => {
              _self.selfchipTimer = setTimeout(() => {
                _self.otherNum.forEach((data, index) => {
                  if (data) {
                    data.forEach(item => {
                      if (item.checkId > -1) return;
                      let ref = _self.$refs["other" + item.checkId][0];
                      ref.style.transition = item.transition;
                      ref.style.left = item.left + "px";
                      ref.style.top = item.top + "px";
                      ref.style.opacity = "1";
                    });
                  }
                });
              }, 100);
            });
          });

          clearTimeout(_self.timer);
          _self.anmit = true;
          _self.timer = setTimeout(() => {
            _self.anmit = false;
            _self.allNum = 0;
          }, 2000);
        } else {
          if (res.code > 0) {
            _self.$toast(res.message);
          } else {
            console.log(res.message);
          }
        }
      })
      .catch(err => {
        _self.canRequestXZ = true;
        console.log(err);
      });
  } else {
    // _self.$toast("至少选择一个数字进行下注");
  }
}
//获取本页信息
function getHxjcData(_self) {
  _self
    .$ajax(
      {
        url: "/hjs/hashJingcai/findPositionList",
        data: {
          params: {
            token: _self.$lStore.get("Token")
          }
        }
      },
      true
    )
    .then(res => {
      if (res.code === 0) {
        _self.otherNum = [];
        let newData = [],
          betsArr = [],
          midDataArr = [];
        newData[5] = "control";
        _self.xiazhuPKNum = res.data.totalBets;
        _self.lockPKNum = res.data.lockBets;
        res.data.list.forEach(item => {
          if (item.positionType || item.positionType == 0) {
            betsArr[item.positionType] = restOtherChip(item.positionAssets);
            switch (item.positionType) {
              case 0:
                newData[0] = item;
              case 1:
                newData[1] = item;
              case 2:
                newData[2] = item;
              case 3:
                newData[3] = item;
              case 4:
                newData[6] = item;
              case 5:
                newData[10] = item;
              case 6:
                newData[9] = item;
              case 7:
                newData[8] = item;
              case 8:
                newData[7] = item;
              case 9:
                newData[4] = item;
              case 10:
                midDataArr[0] = item;
              case 11:
                midDataArr[1] = item;
              case 12:
                midDataArr[2] = item;
              case 13:
                midDataArr[3] = item;
            }
          }
        });
        _self.topList = newData;
        _self.midList = midDataArr;
        _self.$nextTick(function() {
          betsArr.forEach((item, index) => {
            //只有0-9才会循环操作筹码位置
            if(index < 10){
              if (item.length) {
                let dom = _self.$refs["num" + index][0],
                  domW = (dom.offsetWidth - _self.$refs.pkLogo.offsetWidth) / 2,
                  domH = (dom.offsetHeight - _self.$refs.pkLogo.offsetHeight) / 2,
                  left1 = getElementDL(_self.$refs.otherUser, "left") - domW,
                  top1 = getElementDL(_self.$refs.otherUser, "top") - domH,
                  left = getElementDL(dom, "left") - left1,
                  top = getElementDL(dom, "top") - top1,
                  newArr = [];
                item.forEach(detail => {
                  _self.otherId++;
                  newArr = [
                    ...newArr,
                    {
                      left: left + randomNum(-domW + 20, domW - 20),
                      top: top + randomNum(-domH + 20, domH - 20),
                      transition: `all ${randomNum(4, 19) / 10}s ease`,
                      num: index,
                      chip: detail,
                      checkId: _self.otherId
                    }
                  ];
                });
                let otherNum = _self.otherNum.concat();
                if (otherNum[index]) {
                  otherNum[index] = [...otherNum[index], ...newArr];
                } else {
                  otherNum[index] = [...newArr];
                }
                _self.otherNum = otherNum;
              }
            }
            
          });
          _self.otherchipTimer = setTimeout(() => {
            _self.otherNum.forEach(data => {
              if (data) {
                data.forEach(item => {
                  let ref = _self.$refs["other" + item.checkId][0];
                  ref.style.transition = item.transition;
                  ref.style.left = item.left + "px";
                  ref.style.top = item.top + "px";
                  ref.style.width = "0.314607rem";
                  ref.style.height = "0.314607rem";
                  ref.style.opacity = "1";
                });
              }
            });
          }, 100);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
//选择数字
function CheckClick(_self, e, item) {
  if (_self.state) return;
  _self.$clickAudio();
  let num = item.positionType,
    myNum = item.positionAssets + _self.yuXia[num] + _self.chipCheck;
  if (myNum > item.pkMaxBets) {
    _self.$toast(`已超过最大下注金额!`);
    return;
  }
  if (typeof num === "number") {
    _self.otherId++;
    let newList = _self.yuXia.concat();
    newList[num] += _self.chipCheck;
    _self.yuXia = newList;
    if (item.positionType < 10) {
      let domW =
          (e.currentTarget.offsetWidth - _self.$refs.pkLogo.offsetWidth) / 2,
        domH =
          (e.currentTarget.offsetHeight - _self.$refs.pkLogo.offsetHeight) / 2,
        left1 = getElementDL(_self.$refs.otherUser, "left") - domW,
        top1 = getElementDL(_self.$refs.otherUser, "top") - domH,
        left2 = getElementDL(_self.$refs.pkLogo, "left") - domW,
        top2 = getElementDL(_self.$refs.pkLogo, "top") - domH,
        left =
          getElementDL(e.currentTarget, "left") -
          left1 +
          randomNum(-domW + 20, domW - 20),
        top =
          getElementDL(e.currentTarget, "top") -
          top1 +
          randomNum(-domH + 20, domH - 20),
        left3 = left2 - left1,
        top3 = top2 - top1,
        Obj = {
          left: left,
          top: top,
          left3: left3,
          top3: top3,
          transition: `all ${randomNum(4, 19) / 10}s ease`,
          num: num,
          checkId: "my" + _self.otherId,
          chip: _self.chipCheck
        },
        checkNum = _self.checkNum[num] || [],
        allArr = _self.checkNum.concat();
        checkNum = [...checkNum, Obj];
        allArr[num] = checkNum;
        _self.checkNum = allArr;
    }
    _self.allNum = newList.reduce((n, m) => n + m);
  }
}
//获取其他人下注信息
function otherChip(_self, data) {
  // console.log(_self,'data******',data,'//////////',"num" + data.positionType,'++++++++++',_self.$refs["num" + data.positionType][0])
  // _self.$chipDown();
  clearTimeout(_self.otherTimer);
  _self.playDown();
  let dom = _self.$refs["num" + data.positionType][0],
    chipArr = restOtherChip(data.bets),
    domW = (dom.offsetWidth - _self.$refs.pkLogo.offsetWidth) / 2,
    domH = (dom.offsetHeight - _self.$refs.pkLogo.offsetHeight) / 2,
    left1 = getElementDL(_self.$refs.otherUser, "left") - domW,
    top1 = getElementDL(_self.$refs.otherUser, "top") - domH,
    left = getElementDL(dom, "left") - left1,
    top = getElementDL(dom, "top") - top1;
  chipArr.forEach(item => {
    _self.otherId++;
    let Obj = {};
    Obj = {
      left: left + randomNum(-domW + 20, domW - 20),
      top: top + randomNum(-domH + 20, domH - 20),
      num: data.positionType,
      transition: `all ${randomNum(4, 19) / 10}s ease`,
      chip: item,
      checkId: _self.otherId,
      checkIdS: "S" + _self.otherId
    };
    let newArr = _self.otherNum.concat();
    let otherNum = newArr[data.positionType] || [];
    otherNum = [...otherNum, Obj];
    if (otherNum.length > 30) {
      otherNum.shift();
    }
    newArr[data.positionType] = otherNum;
    _self.otherNum = newArr;
    _self.otherTimer = setTimeout(() => {
      _self.otherNum.forEach(data => {
        if (data) {
          data.forEach(item => {
            if (item.checkId > -1) {
              let ref = _self.$refs["other" + item.checkId][0];
              ref.style.transition = item.transition;
              ref.style.left = item.left + "px";
              ref.style.top = item.top + "px";
              ref.style.opacity = "1";
            }
          });
        }
      });
    }, 100);
  });
}
export {
  beforOpen,
  interFun,
  newInterFun,
  OkXiaZhu,
  getHxjcData,
  CheckClick,
  otherChip,
  afterPMDOpenResult
};
