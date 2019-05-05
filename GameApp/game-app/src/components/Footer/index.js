import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import MsgSlider from "components/MsgSlider";
import { colorRgb } from "common";
import Explain from "components/Models/Explain";
import { showScreen } from "common/filter";
import { FooterWrapper, FooterLeft, FooterItem } from "./styled";
import HomeRuleAlert from "../../pages/Alert/HomeRule/index";
import CustomerService from '../../pages/CustomerService'
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooder: false
    };
    this.CloseRule = this.CloseRule.bind(this);
    this.GotoTask = this.GotoTask.bind(this);
    this.GotoInvitation = this.GotoInvitation.bind(this);
    this.GotoSever = this.GotoSever.bind(this);
  }
  componentDidMount() {
    showScreen(this, "isFooder", "/");
  }
  componentWillReceiveProps() {
    showScreen(this, "isFooder", "/");
  }
  render() {
    const { isFooder } = this.state;
    return (
      <Fragment>
        {isFooder ? (
          <FooterWrapper>
            <FooterLeft>
              <FooterItem onClick={this.GotoTask}>
                <p>
                  <i className="iconfont">&#xe624;</i>
                </p>
                <p>任务</p>
              </FooterItem>
              <FooterItem onClick={() => {
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
            }}>
                <p>
                  <i className="iconfont">&#xe61e;</i>
                </p>
                <p>说明</p>
              </FooterItem>
              <FooterItem onClick={this.GotoInvitation}>
                <p>
                  <i className="iconfont">&#xe622;</i>
                </p>
                <p>邀请</p>
              </FooterItem>
              <FooterItem onClick={this.GotoSever}>
                <p>
                  <i className="iconfont">&#xe623;</i>
                </p>
                <p>客服</p>
              </FooterItem>
            </FooterLeft>
            <MsgSlider />
          </FooterWrapper>
        ) : (
          ""
        )}
      </Fragment>
    );
  }

  //跳转任务中心
  GotoTask() {
    this.props.history.push("/task_center");
  }
 
  //跳转邀请
  GotoInvitation() {
    // Explain.InvateShareAlert({
    //   title: "邀请好友",
    //   type: "InvateShareAlert",
    //   isButton: 0,
    //   style: {
    //     height: "3.850187rem",
    //     width: "6.59176rem",
    //     backgroundColor: "#2e2e33"
    //   },
    //   titleStyle: { color: "#e3c877", fontSize: "0.209738rem" }
    // });
    this.props.history.push("/invite");
  }

  //跳转客服
  GotoSever() {
    this.props.history.push('/customer_service')
  }

  //关闭规则弹窗
  CloseRule() {
    this.setState(() => ({
      isShowRuleAlert: false
    }));
  }
}

export default withRouter(Footer);
