import React, { Component, Fragment } from "react";
import { GameRuleStyle, GameRuleCopyDiv } from "./style";
import copy from 'copy-to-clipboard';

const copyContent = "";
class GameRule extends Component {
  constructor(props) {
    super(props);

    this.copyClick = this.copyClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <Fragment>
        <GameRuleStyle>
          <p className={"game_rule_title"}>游戏规则</p>
          <div className={"game_rule_content"}>
            查询特定区块的哈希，只需要把以下链接：
            <br />
            <GameRuleCopyDiv>
              <div>
                <input 
                type={"url"} className={"game_rule_input"} 
                onChange={this.handleInputChange}
                />
                <a
                  href={"#"}
                  className={"game_rule_copy"}
                  onClick={this.copyClick}
                >
                  点击复制
                </a>
              </div>
            </GameRuleCopyDiv>
            最后面的数字换成你想查询的高度值即可。如果出现以下提示，则表示此区块还未生成。
            <br />
            预测ETH相应区块高度的hash
            的最后1位数字，猜中大小获得下单金额1.9倍奖励，猜中数字获得9倍奖励。
            未猜中则损失本金。
            <br />
            举例：
            <br />
            区块高度：5827450
            哈希值：00x2f4b7f770305faceaf7f56129b8d7701d784e0c3f00998e64ae80db9fc333af2
          </div>
        </GameRuleStyle>
      </Fragment>
    );
  }

  handleInputChange(e) {
    this.copyContent = e.target.value;
  }

  copyClick() {
    copy(this.copyContent);
  }
}

export default GameRule;
