import React, { Component } from "react";
import {
  wrapper,
  SuperDiv,
  Header,
  Content,
  InputDiv,
  BottomDiv
} from "./style";
import { Toast } from "antd-mobile";
import Axios from "common/Axios";
import Logout from "images/home/logout.png";
import { lStore } from "common";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      account:'',
      password:''
    }
    this.BackHome = this.BackHome.bind(this);
    this.GetCode = this.GetCode.bind(this);
    this.Login = this.Login.bind(this);
    this.GetInputAccount = this.GetInputAccount.bind(this);
    this.GetInputPassword = this.GetInputPassword.bind(this);

    
  }

  render() {
    return (
      <SuperDiv>
        <Header>
          <h1>登录</h1>
          <p onClick={this.BackHome}>
            <img src={Logout} alt="回到大厅" />
          </p>
        </Header>
        <Content>
          <p>
            <img />
          </p>
          <BottomDiv>
            <InputDiv>
              <div className={"account"}>
                <span>用户名</span>
                <input placeholder={"请输入邮箱号"} value={this.state.account} onChange={this.GetInputAccount}/>
              </div>
              <div className={"account code"}>
                <span>验证码</span>
                <input placeholder={"请输入验证码"} maxLength={"6"} value={this.state.password} onChange={this.GetInputPassword} type={'password'}/>
                <span className={"getCode"} onClick={this.GetCode}>获取验证码</span>
              </div>
              <div className={"submit"} onClick={this.Login}>
                <span>登录</span>
              </div>
            </InputDiv>
          </BottomDiv>
          ;
        </Content>
      </SuperDiv>
    );
  }

  BackHome() {
    this.props.history.push("/");
  }

  GetCode(){
    Toast.fail('获取验证码');
  }

  GetInputAccount(e){
    console.log(e.target.value)
    this.setState({
      account:e.target.value
    })
  }

  GetInputPassword(e){
    this.setState({
      password:e.target.value
    })
  }

  Login(){
    let _this = this;

    if(!_this.state.account.length > 0){
      return;
    }

    if(!_this.state.password.length > 0){
      return;
    }
    Axios.ajax(
      {
        url: "/uac/user/login",
        data: {
          params: {
            mobile: _this.state.account,
            loginPassword: _this.state.password
          }
        }
      },
      false
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          lStore.set("userInfo",res.data);
          lStore.set("Token",res.data.token);
          this.BackHome();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default LoginPage;
