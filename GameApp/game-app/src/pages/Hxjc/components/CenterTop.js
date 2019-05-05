import React, { Component } from "react";

import { CenterTopWrapper, Banker, TopIntrod } from "../style";

import AvatarImg from "images/test/a1.jpg";
class CenterTop extends Component {
  render() {
    return (
      <CenterTopWrapper>
        <Banker bgImg={AvatarImg}>
          <button className="zhuang">庄</button>
          <div className="RightW">
            <p className="beiShu">
              赔率：<span>9</span>
            </p>
            <p className="introd">尾数竞猜</p>
          </div>
        </Banker>
        <TopIntrod>
          <p>
            <sup>
              <i className="iconfont">&#xe64c;</i>
            </sup>
            任意数字压中赔9倍
          </p>
          <p>单个数字最大下注额为10ETH</p>
        </TopIntrod>
      </CenterTopWrapper>
    );
  }
}

export default CenterTop;
