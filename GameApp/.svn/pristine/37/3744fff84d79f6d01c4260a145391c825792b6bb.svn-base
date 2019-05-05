import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types'
import {ChildItemCaiDiv} from "../style";

class ChildItemShiCai extends Component {

  render() {
    const {shiContent } = this.props;
    return (
      <Fragment>
        <ChildItemCaiDiv gameType={shiContent.gameType}>
          <span className={"child_item_cai_result"}>{"结果"}</span>
          <span className={"child_item_cai_content"}>{shiContent.gameResultInfo}</span>
          <span className={"child_item_cai_close"} onClick={this.props.closeClick}>{"点击合起"}</span>
        </ChildItemCaiDiv>
      </Fragment>
    );
  }

}

export default ChildItemShiCai;
