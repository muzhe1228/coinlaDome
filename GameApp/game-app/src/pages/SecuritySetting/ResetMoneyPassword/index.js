import React, { Component } from "react";
import Axios from "common/Axios";
import { lStore } from "common";
import { message } from "antd";
import { Toast } from "antd-mobile";
import {
  wrapper,
  BackGround,
  AlertDiv,
  AlertContent
} from "./style";

class ResetMoneyPasswordAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPsd: "",
      secondPsd: "",
      emailCode:'',
      unClick: false,
      btnSize: "获取验证码"
    };
    this.RequestEmailCode = this.RequestEmailCode.bind(this);
    this.GetNewPsdInput = this.GetNewPsdInput.bind(this);
    this.GetSecondPsdInput = this.GetSecondPsdInput.bind(this);
    this.GetEmailInput = this.GetEmailInput.bind(this);
    this.SubmitUpdatePassword = this.SubmitUpdatePassword.bind(this);
    this.SubmitSettingPassword = this.SubmitSettingPassword.bind(this);
  }

  render() {
    const { CloseAlert,PageType } = this.props;//PageType:0设置过资金密码 1没有设置过资金密码
    const {newPsd,secondPsd,emailCode,unClick,btnSize} = this.state;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={'h1'}>重置资金密码</p>
          <AlertContent unClick={unClick}>
            {PageType===0?(
              <div className={"emailCode"}>
              <span>邮箱验证码</span>
              <input
                placeholder={"请输入验证码"}
                value={emailCode}
                onChange={this.GetEmailInput}
              />
              <p onClick={this.RequestEmailCode}>{btnSize}</p>
            </div>
            ):(
              <div className={"emailCode"}>
              <span>资金密码</span>
              <input
                placeholder={"请输入资金密码"}
                value={secondPsd}
                onChange={this.GetSecondPsdInput}
                type={'password'}
              />
            </div>
            )}
          
            <div className={"emailCode"}>
              <span>资金密码</span>
              <input
                placeholder={"请再次输入资金密码"}
                value={newPsd}
                onChange={this.GetNewPsdInput}
                type={'password'}
              />
            </div>

            <div className={"submit"} onClick={PageType===0?this.SubmitUpdatePassword:this.SubmitSettingPassword}>
              <span>完成</span>
            </div>

            <div className={'tip'}>
            <span>*Tips:</span>
            <p>您的资金密码是用来交易和提现，建议不要与登录密码一致，由此产生的账号被盗，本平台概不负责。</p>
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

  GetSecondPsdInput(e){
    this.setState({
      secondPsd: e.target.value
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
  
  //提交重置资金密码的请求
  SubmitUpdatePassword(){
    const { mobile,CloseAlert,reloadSettingState } = this.props;
    const {emailCode,newPsd} = this.state;
    console.log(mobile);
    Axios.ajax(
      {
        url: "/uac/user/resetAssetsPassword",
        data: {
          params: {
            token: lStore.get("Token"),
            code: emailCode,
            mobile: mobile,
            newAssetsPassword:newPsd
          }
        }
      },true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          message.success('资金密码修改成功');
          reloadSettingState();
          CloseAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //提交设置资金密码的请求
  SubmitSettingPassword(){
    const { mobile,CloseAlert,reloadSettingState } = this.props;
    const {newPsd,secondPsd} = this.state;
    console.log(mobile);
    Axios.ajax(
      {
        url: "/uac/user/updateUserAssetsPassword",
        data: {
          params: {
            assetsPassword: secondPsd,
            secondAssetsPassword: newPsd,
            token: lStore.get("Token")
          }
        }
      },true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          message.success('资金密码设置成功');
          reloadSettingState();
          CloseAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default ResetMoneyPasswordAlert;
