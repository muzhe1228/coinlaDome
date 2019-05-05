import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import { GameRecordItemDiv } from "../style";
import ChildItemCai from "./ChildItemCai";
import ChildItemNiu from "./ChildItemNiu";
import ChildItemShiCai from "./ChildItemShiCai";
import { dateFormat0 } from "common";

class GameRecordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetails: false
    };
    this.handleToLookClick = this.handleToLookClick.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.openClick = this.openClick.bind(this);
    this.showhandle = this.showhandle.bind(this);
  }

  showhandle() {
    this.setState({
      isShowDetails: !this.state.isShowDetails
    });
  }
  isShowDom(isShowDetails, closeClick) {
    const { content } = this.props;
    if (isShowDetails) {
      if (content.gameResultInfo) {
        if (content.gameType.code === 0) {
          return <ChildItemNiu niuContent={content} closeClick={closeClick} />;
        } else if (content.gameType.code === 1) {
          return <ChildItemCai caiContent={content} closeClick={closeClick} />;
        } else if (content.gameType.code === 3) {
          return (
            <ChildItemShiCai shiContent={content} closeClick={closeClick} />
          );
        }
      }
    }
  }
  render() {
    const { content } = this.props;
    const { isShowDetails } = this.state;
    const stateStr =
      content.gameStatus.code === 1 && content.gameType.code === 0
        ? "去查看"
        : content.settlementBets;
    const gameResultStr =
      content.gameStatus.code === 1
        ? content.gameStatus.msg
        : content.gameResult;
    return (
      <Fragment>
        <GameRecordItemDiv
          onClick={this.showhandle}
          resultBets={content.settlementBets}
          gameState={content.gameStatus}
          stateStr={stateStr}
        >
          <span className={"time"}> {dateFormat0(content.createDate,'yyyy-MM-dd hh:mm')}</span>
          <span className={"gameType"}>{content.gameType.msg}</span>
          <span className={"gameResult"}>{gameResultStr}</span>
          <span className={"lastMoney"}>{content.bets + "PK"}</span>
          <span className={"resultMoney"} onClick={this.handleToLookClick}>
            {stateStr}
          </span>
        </GameRecordItemDiv>
        {this.isShowDom(isShowDetails, this.closeClick)}
      </Fragment>
    );
  }

  closeClick() {
    this.setState({
      isShowDetails: false
    });
  }

  openClick() {
    this.setState({
      isShowDetails: true
    });
  }

  handleToLookClick() {
    const { content } = this.props;
    if (content.gameStatus.code === 1) {
      if (content.gameType.code === 0) {
        this.props.history.push("/bull_fight/" + content.roomId);
      }
    }
  }

}

// GameRecordItem.PropTypes = {
//     content: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
//     deleteItem: PropTypes.func,
//     contentIndex: PropTypes.number
// }

export default withRouter(GameRecordItem);
