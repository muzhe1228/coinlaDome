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
import unChangeSelectImg from "../../../images/iconImg/icons/@3x/icon_tixian_select_rb@3x.png";
import Axios from "common/Axios";
import { lStore } from "common";
import { message } from "antd";
import { Toast } from "antd-mobile";
import {
  wrapper,
  BackGround,
  AlertDiv,
  YuE,
  ChooseCoin,
  TiXianCount,
  Commit,
  PassWordAlert
} from "./style";

class WithdrawalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Select: 0,
      data: "",
      userSafedata: "",
      CountInput: "",
      AdressInput: "",
      showPSWAlert: false,
      psd: "",
      emailCode: "",
      dataArray: [
        { name: "ETH", use: true },
        { name: "BTC", use: false },
        { name: "EOS", use: false },
        { name: "BCH", use: false }
      ],
      selectIconArray: [ETH_select, BTC_select, EOS_select, BCH_select],
      unSelectIconArray: [
        ETH_unselect,
        BTC_unselect,
        EOS_unselect,
        BCH_unselect
      ]
    };

    this.ClickCoin = this.ClickCoin.bind(this);
    this.AllMoney = this.AllMoney.bind(this);
    this.CreateChooseCoinDiv = this.CreateChooseCoinDiv.bind(this);
    this.GetCountInputValue = this.GetCountInputValue.bind(this);
    this.GetAdressInputValue = this.GetAdressInputValue.bind(this);
    this.UserSafeSetting = this.UserSafeSetting.bind(this);
    this.showPsdAlert = this.showPsdAlert.bind(this);
    this.ClosePsdAlert = this.ClosePsdAlert.bind(this);

    this.RequestEmailCode = this.RequestEmailCode.bind(this);
    this.GetPsdInput = this.GetPsdInput.bind(this);
    this.GetEmailInput = this.GetEmailInput.bind(this);
    this.TiXianAction = this.TiXianAction.bind(this);
  }

  render() {
    const { CloseWithdrawal, onClose } = this.props;
    const {
      Select,
      data,
      CountInput,
      AdressInput,
      userSafedata,
      showPSWAlert,
      hiddenSelfView,
      psd,
      emailCode
    } = this.state;
    const selectName = this.state.dataArray[Select].name;
    return (
      <BackGround>
        {data &&
          (showPSWAlert === false ? (
            <AlertDiv>
              <YuE>
                <div className={"localMoney"}>
                  <span>当前余额</span>
                  <span className={"PKCount"}>
                    {this.scientificToNumber(data.balance)}PK
                  </span>
                </div>
                <div className={"localMoney iceMoney"}>
                  <span>冻结中</span>
                  <span className={"PKCount icePK"}>
                    {this.scientificToNumber(data.frozenBalance)}PK
                  </span>
                </div>
              </YuE>
              <ChooseCoin>{this.CreateChooseCoinDiv()}</ChooseCoin>
              <TiXianCount>
                <div className={"tixianCount"}>
                  <span>提现数量</span>
                  <input
                    placeholder={
                      "最多可提现" +
                      this.scientificToNumber(data.availableBalance) +
                      "PK"
                    }
                    value={CountInput}
                    onChange={this.GetCountInputValue}
                  />
                  <span className={"allButton"} onClick={this.AllMoney}>
                    全部
                  </span>
                </div>
                <div className={"tixianCount tixianAdress"}>
                  <span>提现地址</span>
                  <input
                    placeholder={"输入您的" + selectName + "钱包地址"}
                    value={AdressInput}
                    onChange={this.GetAdressInputValue}
                  />
                </div>
                <div className={"tixianTip"}>
                  <p>
                    *手续费用户承担，{data.withdrawLimit + selectName}
                    起提；每日仅提现
                    {data.dayWithdrawCount}次
                  </p>
                </div>
              </TiXianCount>
              {/* <Commit>
            <span onClick={this.showPsdAlert}>确定</span>
            <span className={"quxiao"} onClick={this.props.onClose}>取消</span>
          </Commit> */}
              <ModalBtn
                className={"Commit"}
                onClose={onClose}
                onOk={this.showPsdAlert}
              />
            </AlertDiv>
          ) : (
            <PassWordAlert>
              <div className={"emailCode"}>
                <span>资金密码</span>
                <input
                  placeholder={"请输入资金密码"}
                  value={psd}
                  onChange={this.GetPsdInput}
                  type={"password"}
                />
              </div>

              {userSafedata.isEmailVerify === 0 ? ( //开启了邮箱验证
                <div className={"emailCode"}>
                  <span>邮箱验证码</span>
                  <input
                    placeholder={"请输入验证码"}
                    value={emailCode}
                    onChange={this.GetEmailInput}
                  />
                  <p onClick={this.RequestEmailCode}>获取验证码</p>
                </div>
              ) : (
                ""
              )}

              <div className={"submit"} onClick={this.TiXianAction}>
                <span>完成</span>
              </div>
            </PassWordAlert>
          ))}
      </BackGround>
    );
  }

  componentDidMount() {
    this.UserSafeSetting();
    const { Select } = this.state;
    var CoinType = Select + 1;
    //请求提现信息
    Axios.ajax(
      {
        url: "/ethes/query/withdraw",
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
        console.log(res);
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            data: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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

  AllMoney() {
    const { data } = this.state;
    this.setState({
      CountInput: this.scientificToNumber(data.availableBalance)
    });
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

  //获取用户输入的数量
  GetCountInputValue(e) {
    console.log(e.target.value);
    this.setState({
      CountInput: e.target.value
    });
  }

  //获取用户输入的地址
  GetAdressInputValue(e) {
    this.setState({
      AdressInput: e.target.value
    });
  }

  //查询用户安全设置(获取用户提现设置)
  UserSafeSetting() {
    Axios.ajax(
      {
        url: "/uac/user/selectUserSetting",
        data: {
          params: {
            token: lStore.get("Token")
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            userSafedata: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  showPsdAlert() {
    this.setState(
      {
        showPSWAlert: true
      },
      () => {
        this.HiddenSelf();
      }
    );
  }

  ClosePsdAlert() {
    const { CloseWithdrawal } = this.props;
    this.setState({ showPSWAlert: false }, CloseWithdrawal());
  }

  HiddenSelf() {
    this.setState({
      hiddenSelfView: true
    });
  }

  /*科学计数法转换数值*/
  scientificToNumber(num) {
    num = (num - 0).toLocaleString(); //"1,545,646,435,185,460,000,000,000,000"    注意这样会丢失一些精度
    num = num.toString().replace(/\$|\,/g, "");
    return num;
  }

  //密码输入框相关
  GetEmailInput(e) {
    this.setState({
      emailCode: e.target.value
    });
  }

  GetPsdInput(e) {
    this.setState({
      psd: e.target.value
    });
  }

  //获取邮箱验证码
  RequestEmailCode() {
    const { mobile } = this.props;
    Axios.ajax({
      url: "/uac/user/sms",
      data: {
        params: {
          account: mobile,
          type: 2
        }
      }
    })
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          message.success("验证码发送成功");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //执行提现操作
  TiXianAction() {
    const { emailCode, psd, Select, CountInput, AdressInput } = this.state;
    const { onClose } = this.props;
    Axios.ajax(
      {
        url: "/ethes/exchange/withdraw/apply",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: Select + 1,
            address: AdressInput,
            amount: CountInput,
            pwd: psd,
            emailCode: emailCode
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          console.log(res.data);
          message.success("提现申请提交成功");
          onClose();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default WithdrawalAlert;
