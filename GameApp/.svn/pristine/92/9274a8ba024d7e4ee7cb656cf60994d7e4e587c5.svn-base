import React, { Component } from "react";
import { isMen } from "common/filter";
import { YZWrapper, YZCenter, YZL, YZR } from "./style";
import PKImg from "images/iconImg/icons/@3x/icon_chip_pk_14@3x.png";
class ConfirmYZ extends Component {
  render() {
    const { onOkBtn, onCloseBtn, checkMen, checkYZ } = this.props;
    return (
      <YZWrapper>
        <YZCenter>
          <YZL>
            <p className="label">当前下注</p>
            <p className="zhuangWrap">
              <button className="zhuang">{isMen(checkMen)}</button>
            </p>
            <p className="PKWrap">
              <img src={PKImg} alt="" />
              <span>{checkYZ}PK</span>
            </p>
          </YZL>
          <YZR>
            <button onClick={onOkBtn}>确定</button>
            <button onClick={onCloseBtn}>取消</button>
          </YZR>
        </YZCenter>
      </YZWrapper>
    );
  }
}

export default ConfirmYZ;
