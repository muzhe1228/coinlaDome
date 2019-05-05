import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { actionCreators as LeftActionCreators } from "components/LeftNav/store";
import CenterItem from "./CenterItem";
import I18n from "components/I18n";
import { lStore } from "common";
import Axios from "common/Axios";
import Explain from "components/Models/Explain";
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderAvatar,
  HearderSize,
  HeaderCenter,
  HeaderRight,
  SubLeft
} from "../style.js";
import PK from "images/home/Pk.png";
import Deposit from "images/home/deposit.png";
import Logout from "images/home/logout.png";

class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowTopUpAlert: false,
      isShowWithdrawalAlert: false,
      isShowRuleAlert: false,
      isShowPKAlert: false,
      isShowTimeReward: false
    };

    this.ClickTopUp = this.ClickTopUp.bind(this);
    this.CloseTopUp = this.CloseTopUp.bind(this);
    this.ClickWithdrawal = this.ClickWithdrawal.bind(this);
    this.CloseWithdrawal = this.CloseWithdrawal.bind(this);
    this.ClickRule = this.ClickRule.bind(this);
    this.CloseRule = this.CloseRule.bind(this);
    this.AddPK = this.AddPK.bind(this);
    this.ClosePKAlert = this.ClosePKAlert.bind(this);
    this.clickAvatar = this.clickAvatar.bind(this);
    this.CheckToken = this.CheckToken.bind(this);
  }
  //点击头像
  clickAvatar() {
    let token = lStore.get("Token");
    const { setShowLogin, setIsShowNav } = this.props;
    if (token) {
      setIsShowNav(false);
    } else {
      setShowLogin(0);
    }
  }
  render() {
    const {
      setAvatarMenu,
      setHeaderInfo,
      pathName,
      TimeImg,
      setShowLogin,
      userInfo
    } = this.props;
    return (
      <HeaderWrapper className="clear-f">
        <HeaderLeft className="f-l">
          <HeaderAvatar onClick={this.clickAvatar}>
            {/* <img src={Avatar} alt="" /> */}
            <span>{userInfo.get("nick")?userInfo.get("nick").substring(0, 1):''}</span>
          </HeaderAvatar>
          <HearderSize>   
            <h2 className="nickName">
              {lStore.get("Token") ? userInfo.get("nick") : "登录"}
            </h2>
            {/* <p>ID: 3218929</p> */}
          </HearderSize>
        </HeaderLeft>
        <HeaderCenter className="f-l">
          {/* <CenterItem imgUrl={Eth} Mr={"0.179775"} /> */}
          <CenterItem
            imgUrl={PK}
            ClickPK={()=>this.CheckToken(1)}
          />
        </HeaderCenter>
        <HeaderRight className="f-r">
          <p
            onClick={()=>this.CheckToken(1)}
          >
            <img src={Deposit} alt="充值" />
            <span>
              <I18n message={"Deposit"} />
            </span>
          </p>
          {pathName === "/" ? (
            <p
              onClick={() => this.CheckToken(2)}
            >
              <img src={Deposit} alt="提现" />
              <span>
                <I18n message={"Withdraw"} />
              </span>
            </p>
          ) : (
            <Fragment>
              <p onClick={this.ClickRule}>
                <img src={Deposit} alt="Explain" />
                <span>
                  <I18n message={"Explain"} />
                </span>
              </p>
              <p onClick={setHeaderInfo}>
                <img src={Logout} alt="回到大厅" />
              </p>
            </Fragment>
          )}
        </HeaderRight>
      </HeaderWrapper>
    );
  }
  //验证TOKEN
  CheckToken(type){//type:1 点击充值  2：点击提现
    Axios.ajax(
      {
        url: "/uac/user/checkToken",
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
          if(type === 1){
            Explain.TopUpAlert({
              title: "充值",
              type: "TopUpAlert",
              style: {
                height: "4.359551rem",
                width: "7.370787rem",
                backgroundColor: "#2e2e33"
              },
              titleStyle: { color: "#e3c877", fontSize: "0.209738rem" },
              scrollH: "6.741573rem"
            });
          } else if(type === 2) {
            Explain.WithdrawalAlert({
              title: "提现",
              type: "WithdrawalAlert",
              style: {
                height: "4.359551rem",
                width: "7.370787rem",
                backgroundColor: "#2e2e33"
              },
              titleStyle: { color: "#e3c877", fontSize: "0.209738rem" },
              scrollH: "6.741573rem"
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //点击充值按钮
  ClickTopUp() {
    console.log("点击充值");
    this.setState(() => ({
      isShowTopUpAlert: true
    }));
  }

  //关闭充值弹窗
  CloseTopUp() {
    this.setState(() => ({
      isShowTopUpAlert: false
    }));
  }

  //点击提现按钮
  ClickWithdrawal() {
    console.log("点击提现");
    this.setState(() => ({
      isShowWithdrawalAlert: true
    }));
  }

  //关闭提现弹窗
  CloseWithdrawal() {
    this.setState(() => ({
      isShowWithdrawalAlert: false
    }));
  }

  //点击规则按钮
  ClickRule() {
    console.log("点击规则");
    // this.setState(() => ({
    //   isShowRuleAlert: true
    // }));
    Explain.HomeRuleAlert({
      title: "游戏规则",
      type: "HomeRuleAlert",
      isButton: 1,
      style: {
        height: "3.850187rem",
        width: "6.59176rem",
        backgroundColor: "#2e2e33"
      },
      titleStyle: { color: "#e3c877", fontSize: "0.209738rem" }
    });
  }

  //关闭规则弹窗
  CloseRule() {
    // this.setState(() => ({
    //   isShowRuleAlert: false
    // }));
  }

  //出现兑换PK币弹窗
  AddPK() {
    this.setState(() => ({
      isShowPKAlert: true
    }));
  }

  //关闭PK兑换弹窗
  ClosePKAlert() {
    this.setState(() => ({
      isShowPKAlert: false
    }));
  }
}
const mapState = state => {
  return {
    userInfo: state.getIn(["header", "userInfo"])
  };
};
const mapDispatch = dispatch => ({
  setIsShowNav(isShowNav) {
    dispatch(LeftActionCreators.setIsShowNav(isShowNav));
  },
  setShowLogin(showLogin) {
    dispatch(actionCreators.setShowLogin(showLogin));
  }
});

export default connect(
  mapState,
  mapDispatch
)(MainHeader);
