import React, { Component } from "react";
import copy from "copy-to-clipboard";
import Axios from "common/Axios";
import { lStore } from "common";
import { AlertDiv } from "./style";
import { Toast } from "antd-mobile";
class InvateShareAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeData:""
    };
    this.ClickCopy = this.ClickCopy.bind(this);
  }

  componentDidMount(){
    this.getInviteCode();
  }

  getInviteCode(){
    Axios.ajax(
      {
        url: "/uac/user/selectCode",
        data: {
          params: {
            token: lStore.get("Token"),
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
    const {codeData} = this.state;
    return (
      <AlertDiv>
        <div className={"my_invite_code_div"}>
          <p className={"my_invite_code"}>我的邀请码</p>
          <p className={"code"}>{codeData}</p>
        </div>

        <p className={"explain"}>注册填写邀请码即可领取新人红包</p>

        <button>去分享</button>

        <div className={"bottom_info"}>
          <p className={"line"} />
          <p>
            <i className="iconfont">&#xe622;</i>
          </p>
          <p>邀请奖励</p>
          <p className={"line"} />
        </div>

        {/* <AdressSring>
          <span className={"hx_value"}>{hxValue}</span>
          <span className={"copy"} onClick={this.ClickCopy}>
            复制
          </span>
        </AdressSring> */}
      </AlertDiv>
    );
  }

  ClickCopy() {
    const { hxValue } = this.state;
    copy(hxValue);
    Toast.success('复制成功');
  }
}

export default InvateShareAlert;
