import React, { Component } from "react";
import { LeftMenuWrapper, LeftMenuItem, BakeBtn, BorderLB } from "../style";
class LeftMenu extends Component {
  render() {
    const { MenuClick, titleList, check } = this.props;
    return (
      <LeftMenuWrapper>
        {titleList.map(item => {
          return (
            <LeftMenuItem
              onClick={() => MenuClick(item)}
              key={item}
              className={item === check ? "active" : ""}
            >
              {item}
            </LeftMenuItem>
          );
        })}
        <BakeBtn onClick={() => MenuClick(false)}>
          <BorderLB />
          返回
        </BakeBtn>
      </LeftMenuWrapper>
    );
  }
}
export default LeftMenu;
