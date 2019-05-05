import React, { Component } from "react";
import { wrapper, BackGround, AlertDiv } from "./style";
import Item from "antd/lib/list/Item";
import GameRule from "./GameRule";
import ScrollH from "components/scrollH";
import { Toast } from "antd-mobile";
class HomeRuleAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Select: 0
    };
    this.ClickCopy = this.ClickCopy.bind(this);
  }

  render() {
    const { CloseRule } = this.props;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseRule}>&#xe619;</i>
          <ScrollH>
            <GameRule />
          </ScrollH>
        </AlertDiv>
      </BackGround>
    );
  }

  ClickCopy() {
    Toast.success('复制成功');
  }
}

export default HomeRuleAlert;
