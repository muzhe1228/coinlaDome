import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types'
import {ChildItemCaiDiv} from "../style";

class ChildItemCai extends Component {

  render() {
    const {caiContent } = this.props;
    return (
      <Fragment>
        <ChildItemCaiDiv gameType={caiContent.gameType}>
          <span className={"child_item_cai_result"}>{"结果"}</span>
          <span className={"child_item_cai_content"}>{JSON.parse(caiContent.gameResultInfo).hash}</span>
          <span className={"child_item_cai_close"} onClick={this.props.closeClick}>{"点击合起"}</span>
        </ChildItemCaiDiv>
      </Fragment>
    );
  }

}

export default ChildItemCai;
