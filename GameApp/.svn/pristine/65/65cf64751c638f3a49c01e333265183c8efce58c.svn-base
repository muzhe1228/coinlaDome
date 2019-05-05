import React, { Component } from "react";
import copy from "copy-to-clipboard";
import Axios from "common/Axios";
import { lStore } from "common";
import { AlertDiv, AwardBgNumber } from "./style";
import ScrollH from "components/scrollH";
import { withRouter } from "react-router-dom";

import {
  TopInviteDiv,
  InviteExplainDiv,
  InviteRuleDiv,
  AwardBgTitle,
  RuleDiv,
  CodeExplain,
  MyCode,
  FengeLine
} from "./style";
import inviteAward from "../../images/iconImg/icons/@3x/title_invitation_award.png";
import ruleImg from "../../images/iconImg/icons/@3x/img_activity_rules.png";
import btnInvite from "../../images/iconImg/icons/@3x/btn_invite.png";
import fengGe from "../../images/iconImg/icons/@3x/fenge@3x.png";
import { Toast } from "antd-mobile";

class InvateShareAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeData: {}
    };
    this.ClickCopy = this.ClickCopy.bind(this);
    this.toShare = this.toShare.bind(this);
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
    const { codeData } = this.state;
    return (
      <AlertDiv>
        <ScrollH>
          {/* 邀请码区域 */}
          <TopInviteDiv
            style={{
              backgroundImage:
                "url(" + require("images/iconImg/icons/@3x/bg_invite.jpg") + ")"
            }}
          >
            <p className={"invite_title"}>立即邀请好友 领取红包奖励</p>

            <div
              className={"invite_code_div"}
              style={{
                backgroundImage:
                  "url(" +
                  require("images/iconImg/icons/@3x/bg_invite_code.png") +
                  ")"
              }}
            >
              <div className={"invite_detail"}>
                <MyCode>
                  <p className={"my_invite_code"}>我的邀请码</p>
                  <p className={"code"} onClick={this.ClickCopy}>{codeData.invitationCode}</p>
                </MyCode>

                <FengeLine>
                {/* <p className={"fengge"}><img src={fengGe} alt={""}></img></p> */}
                </FengeLine>

                <CodeExplain>
                  <p className={"explain"}>【长按邀请码可复制】</p>
                  <p className={"explain2"}>
                    注册填写邀请码
                    <br />
                    即可领取新人红包
                  </p>
                </CodeExplain>
              </div>

              {/* <p className={"to_my_invite_p"}><span className={"to_my_invite"}>我的邀请</span>  ></p> */}

              <p><img className={"btn_invite"} src={btnInvite} alt={""} onClick={this.toShare}></img></p>
            </div>
          </TopInviteDiv>
          {/* 邀请奖励 */}
          <InviteExplainDiv>
            <p className={"invite-award-img"}>
              <img src={inviteAward} alt={""} />
            </p>
            <div className={"border_bg"}>
              <AwardBgTitle>
                <span>已邀请</span>
                <span>一级好友</span>
                <span>二级好友</span>
              </AwardBgTitle>

              <AwardBgNumber>
                <span>人数</span>
                <span className={"value"}>{codeData.oneFriendNumber}</span>
                <span className={"value"}>{codeData.twoFriendNumber}</span>
              </AwardBgNumber>

              <AwardBgTitle>
                <span>奖励</span>
                <span className={"value"}>{codeData.oneFriendAwardNumber}</span>
                <span className={"value"}>{codeData.twoFriendAwardNumber}</span>
              </AwardBgTitle>
            </div>
          </InviteExplainDiv>

          {/* 活动规则 */}
          <InviteRuleDiv>
            <p className={"rule-img"}>
              <img src={ruleImg} alt={""} />
            </p>

            <div className={"border_bg"}>
              <RuleDiv>
                <p className={"active_time"}>活动时间：20181201~20190331</p>
                <p className={"active_explain_title"}>活动说明：</p>
                <p className={"active_explain"}>
                  1、活动期间，成功邀请1个好友，您可获得一级好友1%的流水返佣；好友再成功邀请他的好友，您再获得二级好友0.5%游戏流水返佣。<br/>
                  2、好友须在注册时填写邀请码或通过邀请链接进行注册，方能生效。<br/>
                  3、被邀请的好友注册成功后需参与游戏，您才可以获得对应比例返佣。返佣以K币形式发放。系统将自动发放奖励。<br/>
                  4、邀请奖励将持续发放6个月。<br/>
                  5、币猜保留对此活动的解释权，并将严查虚假邀请行为，一经发现将取消其奖励资格。
                </p>
              </RuleDiv>
            </div>
          </InviteRuleDiv>
        </ScrollH>
      </AlertDiv>
    );
  }

  toShare() {
    const { codeData } = this.state;
    // this.props.history.push("/down/" + codeData.invitationCode);
    this.props.history.push("/down");
  }

  ClickCopy() {
    const { codeData } = this.state;
    copy(codeData.invitationCode);
    Toast.success("复制成功");
  }
}

export default withRouter(InvateShareAlert);
