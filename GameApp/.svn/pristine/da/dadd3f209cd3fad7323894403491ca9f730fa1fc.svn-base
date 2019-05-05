import React, { Component } from "react";
import { wrapper, BackGround, AlertDiv } from "./style";
import Item from "antd/lib/list/Item";
import GameRule from "./GameRule";
import ScrollH from "components/scrollH";

class HomeRuleAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Select: 0
    };
    this.ClickCopy = this.ClickCopy.bind(this);
  }

  render() {
    return (
      <BackGround>
        <AlertDiv>
          
            <GameRule />
        </AlertDiv>
      </BackGround>
    );
  }

  ClickCopy() {
    console.log("复制成功");
  }
}

export default HomeRuleAlert;
