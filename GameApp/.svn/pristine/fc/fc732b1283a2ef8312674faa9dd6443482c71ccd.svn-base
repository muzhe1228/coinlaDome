import React, { Component, Fragment } from "react";
import copy from "copy-to-clipboard";
import Axios from "common/Axios";
import { lStore } from "common";
import ScrollH from "components/scrollH";
import { withRouter } from "react-router-dom";

import { AlertDiv, DownArea } from "./style";
import iconImg from "../../images/iconImg/icons/@3x/bbpk@3x.png";
import btnDown from "../../images/iconImg/icons/@3x/btn_down.png";
import downCode from "../../images/iconImg/icons/@3x/icon_yydb_PK@3x.png";
import { Toast } from "antd-mobile";

class DownApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ClickDown = this.ClickDown.bind(this);
  }

  componentDidMount() {
    this.getInviteCode();
  }

  getInviteCode() {
    Axios.ajax(
      {
        url: "/uac/user/selectCode",
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
            codeData: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <AlertDiv
        style={{
          backgroundImage:
            "url(" + require("images/iconImg/icons/@3x/share_bg@3x.jpg") + ")"
        }}
      >
        <ScrollH>
          <p>
            <img className={"logo_icon"} src={iconImg} alt={""} />
          </p>

          <DownArea>
            <p>
              <img
                className={"down_btn"}
                src={btnDown}
                alt={""}
                onClick={this.ClickDown}
              />
            </p>

            <p>
              <img className={"er_code"} src={downCode} alt={""} />
            </p>

            <p className={"sao"}>「扫描二维码」</p>
            <p>点击下载领取新人专享大礼包</p>
          </DownArea>
        </ScrollH>
      </AlertDiv>
    );
  }

  toShare() {}

  ClickDown() {
    Toast.success("复制成功");
  }
}

export default withRouter(DownApp);
