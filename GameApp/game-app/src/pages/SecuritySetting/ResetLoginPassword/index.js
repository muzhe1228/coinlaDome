import React, { Component } from "react";
import { wrapper, BackGround, AlertDiv, AlertContent,SendCodeButton } from "./style";
import Axios from "common/Axios";
import { lStore } from "common";
import { message } from "antd";
import { Toast } from "antd-mobile";
class ResetLoginPasswordAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCode: "",
      newPsd: "",
      unClick: false,//不能点击
      btnSize: "获取验证码"
    };
    this.RequestEmailCode = this.RequestEmailCode.bind(this);
    this.GetNewPsdInput = this.GetNewPsdInput.bind(this);
    this.GetEmailInput = this.GetEmailInput.bind(this);
    this.SubmitUpdatePassword = this.SubmitUpdatePassword.bind(this);
  }

  render() {
    const { CloseAlert } = this.props;
    const { emailCode, newPsd,btnSize,unClick } = this.state;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={"h1"}>重置登录密码</p>
          <AlertContent unClick={unClick}>
            <div className={"emailCode"}>
              <span>邮箱验证码</span>
              <input
                placeholder={"请输入验证码"}
                value={emailCode}
                onChange={this.GetEmailInput}
              />
              <p onClick={this.RequestEmailCode} >{btnSize}</p>
            </div>

            <div className={"emailCode"}>
              <span>新密码</span>
              <input
                placeholder={"请输入新登录密码"}
                value={newPsd}
                onChange={this.GetNewPsdInput}
                type={'password'}
              />
            </div>

            <div className={"submit"} onClick={this.SubmitUpdatePassword}>
              <span>完成</span>
            </div>
          </AlertContent>
        </AlertDiv>
      </BackGround>
    );
  }

  GetEmailInput(e) {
    this.setState({
      emailCode: e.target.value
    })
  }

  GetNewPsdInput(e) {
    this.setState({
      newPsd: e.target.value
    })
  }

  //获取邮箱验证码
  RequestEmailCode(){
    const {unClick} = this.state;
    if(unClick){
      return;
    }
    const {mobile} = this.props;
      let _this = this;
      Axios.ajax({
        url: "/uac/user/sms",
        data: { params: { account: mobile, type: 2 } }
      })
        .then(res => {
          let time = 60,
            timer = null;
          _this.setState({
            unClick: true,
            btnSize: "60s"
          });
          timer = setInterval(() => {
            --time;
            if (time === 0) {
              clearInterval(timer);
              _this.setState({
                unClick: false,
                btnSize: "重新发送"
              });
            } else {
              _this.setState({
                btnSize: time + "S"
              });
            }
          }, 1000);
          Toast.success("验证码发送成功！");
        })
        .catch(err => {
          console.log(err);
        });
  }
  
  //提交更改密码的请求
  SubmitUpdatePassword(){
    const { mobile,CloseAlert } = this.props;
    const {emailCode,newPsd} = this.state;
    console.log(mobile);
    Axios.ajax(
      {
        url: "/uac/user/resetPassword",
        data: {
          params: {
            code: emailCode,
            mobile: mobile,
            newLoginPassword:newPsd
          }
        }
      }
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          CloseAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default ResetLoginPasswordAlert;
