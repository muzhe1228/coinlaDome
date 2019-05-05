import React, { Component, Fragment } from "react";
import { Item, ItemR } from "../style";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Socket from "components/Socket";
import ENV from "common/APi";
import { lStore } from "common";
import Axios from "common/Axios";
import { coinSplice } from "common/filter";

class CenterItem extends Component {
  constructor(props) {
    super(props);
    this.currencySocket = this.currencySocket.bind(this);
  }

  componentDidMount() {
    if (lStore.get("Token")) {
      this.getPkNumber();
    }
  }

  render() {
    const { imgUrl, Mr, ClickPK, PKData } = this.props;
    return (
      <Fragment>
        {PKData && (
          <Fragment>
            <Item style={{ marginRight: Mr + "rem" }} onClick={ClickPK}>
              <p className="img">
                <img src={imgUrl} alt="header" />
              </p>
              <ItemR>
                <p className="price">
                  {PKData.availableBalance ? PKData.availableBalance : "--"}
                </p>
                <p className="icon">
                  <i className="iconfont">&#xe659;</i>
                </p>
              </ItemR>
            </Item>
            <Socket
              url={ENV.getENV().socketCurrency + PKData.userId}
              onMessage={this.currencySocket}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }

  // [不加密]查询哈希竞猜可押注金额列表
  getPkNumber() {
    Axios.ajax(
      {
        url: "/uas/userAssets/findPkBalance",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: 0
          }
        }
      },
      true
    ).then(res => {
      res.data.availableBalance = coinSplice(res.data.availableBalance, 2);
      this.props.setPKData(res.data);
    });
  }

  currencySocket(data) {
    const { PKData, setPKData } = this.props;
    if (!data) return;
    let currencyData = PKData;
    currencyData.availableBalance = coinSplice(data.availableBalance, 2);
    setPKData(currencyData);
  }
}
const mapState = state => ({
  PKData: state.getIn(["header", "PKData"])
});
const mapDispatch = dispatch => ({
  setPKData(PKData) {
    dispatch(actionCreators.setPKData(PKData));
  }
});

export default connect(
  mapState,
  mapDispatch
)(CenterItem);
