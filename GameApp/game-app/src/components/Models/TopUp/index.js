import React, { Component } from "react";
import copy from "copy-to-clipboard";
import ETH_select from "../../../images/iconImg/icons/@3x/alert_eth_selected@3x.png";
import ETH_unselect from "../../../images/iconImg/icons/@3x/alert_eth_unselect@3x.png";
import BTC_select from "../../../images/iconImg/icons/@3x/alert_btc_selected@3x.png";
import BTC_unselect from "../../../images/iconImg/icons/@3x/alert_btc_unselect@3x.png";
import EOS_select from "../../../images/iconImg/icons/@3x/alert_eos_selected@3x.png";
import EOS_unselect from "../../../images/iconImg/icons/@3x/alert_eos_unselect@3x.png";
import BCH_select from "../../../images/iconImg/icons/@3x/alert_bch_selected@3x.png";
import BCH_unselect from "../../../images/iconImg/icons/@3x/alert_bch_unselect@3x.png";
import unChangeSelectImg from "../../../images/iconImg/icons/@3x/icon_tixian_select_rb@3x.png";
import Axios from "common/Axios";
import { lStore } from "common";
import { AlertDiv, ChooseCoin, AdressPic, AdressSring } from "../modalStyle";
import { Toast } from "antd-mobile";

class TopUpAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Select: 0,
      LestTopUp: "",
      dataArray: [
        { name: "ETH", use: true },
        { name: "BTC", use: false },
        { name: "EOS", use: false },
        { name: "BCH", use: false }
      ],
      hxValue: "",
      selectIconArray: [ETH_select, BTC_select, EOS_select, BCH_select],
      unSelectIconArray: [
        ETH_unselect,
        BTC_unselect,
        EOS_unselect,
        BCH_unselect
      ]
    };
    this.ClickCopy = this.ClickCopy.bind(this);
    this.ClickCoin = this.ClickCoin.bind(this);
    this.CreateChooseCoinDiv = this.CreateChooseCoinDiv.bind(this);
  }

  render() {
    const { Select, hxValue, LestTopUp } = this.state;
    const selectName = this.state.dataArray[Select].name;
    return (
      <AlertDiv>
        <ChooseCoin>{this.CreateChooseCoinDiv()}</ChooseCoin>
        <AdressPic>
          <span className="adress_title">转账地址</span>
          <p>
            <img
              src={"http://qr.liantu.com/api.php?text=" + hxValue}
              alt={""}
            />
            <span className={"adress_rule"}>
              *{LestTopUp}
              {selectName}起充
            </span>
          </p>
        </AdressPic>

        <AdressSring>
          <span className={"hx_value"}>{hxValue}</span>
          <span className={"copy"} onClick={this.ClickCopy}>
            复制
          </span>
        </AdressSring>
      </AlertDiv>
    );
  }

  componentDidMount() {
    const { Select } = this.state;
    var CoinType = Select + 1;
    //请求ETH的充值地址  /query/recharge
    Axios.ajax(
      {
        url: "/ethes/query/recharge",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: CoinType
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            hxValue: res.data.rechargeAddress,
            LestTopUp: res.data.rechargeLimit
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  ClickCopy() {
    const { hxValue } = this.state;
    copy(hxValue);
    Toast.success('复制成功');
  }

  ClickCoin(index) {
    const use = this.state.dataArray[index].use;
    if (use) {
      this.setState({
        Select: index
      });
    } else {
      Toast.fail('币种未开放');
    }
  }

  CreateChooseCoinDiv() {
    const {
      Select,
      selectIconArray,
      unSelectIconArray,
      dataArray
    } = this.state;
    return dataArray.map((item, index) => {
      return (
        <div
          className={Select === index ? "unselect select" : "unselect"}
          onClick={() => {
            this.ClickCoin(index);
          }}
          key={index}
        >
          <p className={"coin-icon"}>
            <img
              src={
                (Select === index ? selectIconArray : unSelectIconArray)[index]
              }
              alt={""}
            />
          </p>
          <p className={"coin-name"}>{item.name}</p>
          {Select === index ? (
            <p className={"right-bottom-img"}>
              <img src={unChangeSelectImg} alt={""} />
            </p>
          ) : (
            ""
          )}
        </div>
      );
    });
  }

  //启动监听用户充值结果
  OpenUserTopUpJianTing() {
    const { Select } = this.state;
    var CoinType = Select + 1;
    Axios.ajax(
      {
        url: "/ethes/exchange/recharge/monitor",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: CoinType
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default TopUpAlert;
