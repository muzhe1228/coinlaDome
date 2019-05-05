import React, { Component } from "react";

import { LeftWrapper, LeftItemWrapper } from "../style";
class LeftWrap extends Component {
  static defaultProps = {
    Center: "left"
  };
  render() {
    const { MenuClick, titleList, Center } = this.props;
    return (
      <LeftWrapper Center={Center}>
        {titleList.map(item => {
          return (
            <LeftItemWrapper onClick={() => MenuClick(item)} key={item}>
              {item}
            </LeftItemWrapper>
          );
        })}
      </LeftWrapper>
    );
  }
}

export default LeftWrap;
