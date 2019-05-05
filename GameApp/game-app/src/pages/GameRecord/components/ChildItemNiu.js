import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types'
import { ChildItemNiuDiv } from "../style";

class ChildItemNiu extends Component {

  render() {
    const {  niuContent } = this.props;
    const resultInfo = JSON.parse(niuContent.gameResultInfo)
    return (
      <Fragment>
        <ChildItemNiuDiv gameType={niuContent.gameType}>
          <div className={"child_item_niu_left_div"}>
            <div className={"child_item_niu_hash"}>
              <span className={"niu_hash"}>{"Hash"}</span>
              <div className={"niu_hash_value"}>
                <p>{"..."}</p>
                <p className={"card0"}>{resultInfo.cardBanker}</p>
                <p className={"card1"}>{resultInfo.cardLand}</p>
                <p className={"card2"}>{resultInfo.cardMysterious}</p>
                <p className={"card3"}>{resultInfo.cardSky}</p>
              </div>
            </div>

            <div className={"child_item_niu_result"}>
              <span  className={"niu_result"}>{"结果"}</span>
              <div className={"niu_result_value"}>
                <p>{""}</p>
                <p className={"num0"}>{resultInfo.niuBanker}</p>
                <p className={"num1"}>{resultInfo.niuLand}</p>
                <p className={"num2"}>{resultInfo.niuMysterious}</p>
                <p className={"num3"}>{resultInfo.niuSky}</p>
              </div>
              
            </div>
          </div>

          <span className={"child_item_niu_close"} onClick={this.props.closeClick}>{"点击合起"}</span>
        </ChildItemNiuDiv>
      </Fragment>
    );
  }

}

// GameRecordItem.PropTypes = {
//     content: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
//     deleteItem: PropTypes.func,
//     contentIndex: PropTypes.number
// }

export default ChildItemNiu;
