import React, { Component } from "react";
import ModalBtn from "../ModalBtn";
import ETH_select from "../../../images/iconImg/icons/@3x/alert_eth_selected@3x.png";
import ETH_unselect from "../../../images/iconImg/icons/@3x/alert_eth_unselect@3x.png";
import BTC_select from "../../../images/iconImg/icons/@3x/alert_btc_selected@3x.png";
import BTC_unselect from "../../../images/iconImg/icons/@3x/alert_btc_unselect@3x.png";
import EOS_select from "../../../images/iconImg/icons/@3x/alert_eos_selected@3x.png";
import EOS_unselect from "../../../images/iconImg/icons/@3x/alert_eos_unselect@3x.png";
import BCH_select from "../../../images/iconImg/icons/@3x/alert_bch_selected@3x.png";
import BCH_unselect from "../../../images/iconImg/icons/@3x/alert_bch_unselect@3x.png";
import { Toast } from "antd-mobile";
import {
  AlertDiv,
  ChooseCoinDiv,
  FromCountDiv,
  ToCoinDiv
} from "../modalStyle";

class ExchangeCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCoinCount: "",
      Select: 0,
      dataArray: [
        { name: "ETH", use: true, count: "0.1" },
        { name: "BTC", use: false, count: "0.2" },
        { name: "EOS", use: false, count: "0.3" },
        { name: "BCH", use: false, count: "0.4" }
      ],
      selectIconArray: [ETH_select, BTC_select, EOS_select, BCH_select],
      unSelectIconArray: [
        ETH_unselect,
        BTC_unselect,
        EOS_unselect,
        BCH_unselect
      ]
    };
    this.GetFromCoinInput = this.GetFromCoinInput.bind(this);
    this.ChooseCoin = this.ChooseCoin.bind(this);
    this.CreateChooseCoinDiv = this.CreateChooseCoinDiv.bind(this);
    this.onOk = this.onOk.bind(this);
  }
  onOk() {
    console.log("OkBtn");
    this.props.onClose();
  }
  render() {
    const { onClose } = this.props;
    const {
      fromCoinCount,
      Select,
      selectIconArray,
      unSelectIconArray
    } = this.state;
    const selectCount = this.state.dataArray[Select].count;
    const selectName = this.state.dataArray[Select].name;
    return (
      <AlertDiv>
        <ChooseCoinDiv>
          <p className="title">选择币种</p>
          <div>{this.CreateChooseCoinDiv()}</div>
        </ChooseCoinDiv>

        <FromCountDiv>
          <p>兑换数量</p>
          <input
            placeholder={"最多可兑换" + selectCount + selectName}
            value={fromCoinCount}
            onChange={this.GetFromCoinInput}
          />
          <p onClick={this.RequestEmailCode}>ETH</p>
        </FromCountDiv>

        <ToCoinDiv>
          <p className="title">兑换数量</p>
          <p className="toCoinValue">100</p>
        </ToCoinDiv>
        <ModalBtn onClose={onClose} onOk={this.onOk} />
      </AlertDiv>
    );
  }

  //获取用户输入的数量
  GetFromCoinInput(e) {
    this.setState({
      fromCoinCount: e.target.value
    });
  }

  ChooseCoin(index) {
    const use = this.state.dataArray[index].use;
    if (use) {
      this.setState({
        Select: index
      });
    } else {
      Toast.fail('币种未开放');
    }
  }

  //创建币种选择
  CreateChooseCoinDiv() {
    const {
      Select,
      selectIconArray,
      unSelectIconArray,
      dataArray
    } = this.state;
    return dataArray.map((item, index) => {
      if (Select === index) {
        return (
          <p
            className={"unselect select"}
            onClick={() => {
              this.ChooseCoin(index);
            }}
          >
            <img src={selectIconArray[index]} alt={""} />
          </p>
        );
      } else {
        return (
          <p
            className={"unselect"}
            onClick={() => {
              this.ChooseCoin(index);
            }}
          >
            <img src={unSelectIconArray[index]} alt={""} />
          </p>
        );
      }
    });
  }
}

export default ExchangeCoin;
