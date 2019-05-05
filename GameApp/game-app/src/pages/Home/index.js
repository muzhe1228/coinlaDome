import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "common/Axios";
import { lStore } from "common";
import { actionCreators as leftNavActionCreators } from "components/LeftNav/store";
import Footer from "components/Footer";
import { HomeWrapper, HomeL, HomeC, HomeR, HomeRT, HomeRB } from "./style";
import NiuImg from "images/home/@3x/Niu.png";
import YyDbImg from "images/home/@3x/YyDb.png";
import HxjcImg from "images/home/@3x/Hxjc.png";
import NotImg from "images/home/@3x/Not.png";
class Home extends Component {
  constructor(props) {
    super(props);
    this.toDetails = this.toDetails.bind(this);
  }
  componentDidMount() {
    this.props.setIsShowNav(false);
    // this.test();
    // this.testSocket();
    this.saveEverydayLogin();
  }
  toDetails(url) {
    this.props.history.push(url);
  }

  //领取登录奖励
  saveEverydayLogin() {
    const tokenStr = lStore.get("Token");
    if (!tokenStr) return;
    Axios.ajax(
      {
        url: "/acs/activityCenter/saveEverydayLogin",
        data: {
          params: {
            token: tokenStr
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        // if (res.code === 0) {
        //   console.log(res.data);
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <HomeWrapper>
        <HomeL
          onClick={() => {
            this.toDetails("/bull_fight");
          }}
        >
          <img src={NiuImg} alt="哈希牛牛" />
        </HomeL>
        <HomeC
          onClick={() => {
            this.toDetails("/yydb");
          }}
        >
          <img src={YyDbImg} alt="一元夺宝" />
        </HomeC>
        <HomeR>
          <HomeRT
            onClick={() => {
              this.toDetails("/hxjc");
            }}
          >
            <img src={HxjcImg} alt="哈希竞猜" />
          </HomeRT>
          <HomeRB>
            <img src={NotImg} alt="敬请期待" />
          </HomeRB>
        </HomeR>
      </HomeWrapper>
    );
  }
}
const mapDispatch = dispatch => ({
  setIsShowNav(isShowNav) {
    dispatch(leftNavActionCreators.setIsShowNav(!isShowNav));
  }
});
export default withRouter(
  connect(
    null,
    mapDispatch
  )(Home)
);
