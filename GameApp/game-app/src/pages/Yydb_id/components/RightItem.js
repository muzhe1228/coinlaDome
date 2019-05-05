import React, { Component } from "react";

import { RightItemWrapper } from "../style";
import imgA from "images/test/a1.jpg"

class RightItem extends Component {
  render() {
    return (
      <RightItemWrapper onClick={this.props.handle}>
        <img src={imgA} alt="筹码"/>
      </RightItemWrapper>
    );
  }
}

export default RightItem;
