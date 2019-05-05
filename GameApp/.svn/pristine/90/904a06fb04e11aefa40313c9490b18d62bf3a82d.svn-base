import React, { Component } from "react";
import Axios from "common/Axios";
import { lStore } from "common";
import { message } from "antd";
import {
  wrapper,
  BackGround,
  AlertDiv,
  AlertContent
} from "./style";

class PassWordAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      psd: "",
      emailCode:''
    };
    this.RequestEmailCode = this.RequestEmailCode.bind(this);
    this.GetPsdInput = this.GetPsdInput.bind(this);
    this.GetEmailInput = this.GetEmailInput.bind(this);
    this.TiXianAction = this.TiXianAction.bind(this);
  }

  render() {
    const { CloseAlert,userSafedata } = this.props;
    const {psd,emailCode} = this.state;
    return (
      <BackGround >
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={'h1'}>进行提现验证</p>
          <AlertContent>
          <div className={"emailCode"}>
              <span>资金密码</span>
              <input
                placeholder={"请输入资金密码"}
                value={psd}
                onChange={this.GetPsdInput}
                type={'password'}
              />
            </div>

            {userSafedata.isEmailVerify===0?(//开启了邮箱验证
              <div className={"emailCode"}>
              <span>邮箱验证码</span>
              <input
                placeholder={"请输入验证码"}
                value={emailCode}
                onChange={this.GetEmailInput}
              />
              <p onClick={this.RequestEmailCode}>获取验证码</p>
            </div>
            ):(
              ''
            )}

            <div className={"submit"} onClick={this.TiXianAction}>
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

  GetPsdInput(e){
    this.setState({
      psd: e.target.value
    })
  }

  //获取邮箱验证码
  RequestEmailCode(){
    const { mobile } = this.props;
    Axios.ajax(
      {
        url: "/uac/user/sms",
        data: {
          params: {
            account: mobile,
            type: 2
          }
        }
      }
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          message.success('验证码发送成功');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //执行提现操作
  TiXianAction(){
    const {
      currencyType,
      address,
      amount,
      CloseAlert
    } = this.props;
    const {emailCode,psd,userSafedata} = this.state;
    Axios.ajax(
      {
        url: "/ethes/exchange/withdraw/apply",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: currencyType,
            address:address,
            amount:amount,
            pwd:psd,
            emailCode:emailCode
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          console.log(res.data);
          message.success('提现申请提交成功');
          CloseAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default PassWordAlert;
