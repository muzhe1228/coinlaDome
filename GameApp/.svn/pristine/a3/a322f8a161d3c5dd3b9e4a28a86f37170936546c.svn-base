import React, { Component, Fragment } from "react";
import { PaymentsItemDiv } from "./style";
import { dateFormat0 } from "common";

class PaymentsItem extends Component {
  render() {
    const { content } = this.props;
    return (
      <Fragment>
        <PaymentsItemDiv iaeTypeCode={content.iaeType.code}>
          <span className={"payments_time"}>
            {dateFormat0(content.createDate,'yyyy-MM-dd')}
          </span>
          <span className={"payments_payType"}>{content.iaeType.msg}</span>
          <span className={"payments_from"}>{content.bizType.msg}</span>
          <span className={"payments_detail"}>{content.bizDesc}</span>
          <span className={"payments_count"}>{content.currencyNumber}</span>
          <span className={"payments_state"}>{content.bizStatus.msg}</span>
        </PaymentsItemDiv>
      </Fragment>
    );
  }
}

export default PaymentsItem;
