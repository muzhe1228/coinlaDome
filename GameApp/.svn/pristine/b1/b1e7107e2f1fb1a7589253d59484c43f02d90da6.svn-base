import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Socket from "components/Socket";
import ENV from "common/APi";
import { lStore } from "common";
import { GameTypes } from "common/filter";
import BtnOkImg from "images/GameFeng/btn_award_continue@3x.png";
import BtnCancelmg from "images/GameFeng/btn_award_othergame@3x.png";
import PKImg from "images/GameFeng/icon_award_chip@3x.png";
import BeiImg from "images/GameFeng/icon_award_trophy@3x.png";
import { OpenWrapper, OpenWrap, OpenBei, OpenPk, OpenBtn } from "./style";
class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LotteryData: false
    };
  }
  OpenSocket = data => {
    console.log(this.props.location);
    this.setState({
      LotteryData: data
    });
  };
  hide = () => {
    this.setState({
      LotteryData: false
    });
  };
  toOther = is => {
    if (is) {
      this.setState({
        LotteryData: false
      });
    } else {
      this.props.history.push("/");
    }
  };
  show = bool => {
    let _this = this;
    setTimeout(() => {
      _this.setState({
        LotteryData: true
      });
    }, 1000);
  };
  render() {
    const { LotteryData } = this.state;
    return (
      <Fragment>
        <OpenWrapper className={LotteryData ? "show" : ""} onClick={this.hide}>
          <OpenWrap
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <OpenBei>
              <img src={BeiImg} alt="" />
              <p>123456</p>
            </OpenBei>
            <OpenPk>
              <img src={PKImg} alt="" />
              <p>154.56PK</p>
            </OpenPk>
            <OpenBtn>
              <img onClick={this.toOther} src={BtnOkImg} alt="" />
              <img
                onClick={() => {
                  this.toOther(false);
                }}
                src={BtnCancelmg}
                alt=""
              />
            </OpenBtn>
          </OpenWrap>
        </OpenWrapper>

        {lStore.get("Token") && (
          <Socket
            url={ENV.getENV().socketOpen + "/" + lStore.get("userInfo").userId}
            onMessage={this.OpenSocket}
          />
        )}
      </Fragment>
    );
  }
}
export default withRouter(Lottery);
