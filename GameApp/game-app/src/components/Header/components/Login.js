import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "common/Axios";
import { lStore } from "common";
import { isEmail, isPwd, isCode } from "common/filter";
import { actionCreators } from "../store";
import { Toast } from "antd-mobile";
import {
  LoginWrapper,
  LoginTitle,
  LInpWrapper,
  LButtonWrapper,
  TishiWrapper,
  BackWrapper,
  LWrap
} from "../style";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      mobile: "",
      loginPassword: "",
      client: "web",
      code: "",
      recaptchaCode: "",
      beInvitationCode: "",
      disabled: false,
      btnSize: "获取验证码"
    };
    this.toStep = this.toStep.bind(this);
    this.Close = this.Close.bind(this);
    this.checkAccount = this.checkAccount.bind(this);
    this.domSelect = this.domSelect.bind(this);
    this.InpChange = this.InpChange.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.register = this.register.bind(this);
    this.Login = this.Login.bind(this);
    this.ForgetPassword = this.ForgetPassword.bind(this);
  }
  // 窗口选择
  toStep(step) {
    if (step === "back") {
      this.props.setShowLogin(0);
    } else {
      this.props.setShowLogin(step);
    }
  }
  // 关闭登录注册窗口重置
  Close() {
    this.props.setShowLogin(-1);
    this.setState({
      mobile: "",
      loginPassword: "",
      client: "web",
      code: "",
      recaptchaCode: "",
      beInvitationCode: ""
    });
  }
  //监听输入框
  InpChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  // 检测账号(0-不存在,1-存在)
  checkAccount() {
    let _this = this;
    const { mobile } = this.state;
    if (isEmail(mobile)) {
      Axios.ajax(
        {
          url: "/uac/user/checkAccount",
          data: { params: { mobile: _this.state.mobile, code: 134566 } }
        },
        true
      ).then(res => {
          if (res.data) {
            _this.props.setShowLogin(1);
          } else {
            _this.props.setShowLogin(2);
          }
      });
    } else if (mobile === "") {
      Toast.fail("账号不能为空！", 1);
    } else {
      Toast.fail("账号格式有误！", 1);
    }
  }
  //发送验证码
  sendCode(type) {
    let _this = this;
    Axios.ajax({
      url: "/uac/user/sms",
      data: { params: { account: _this.state.mobile, type: type||1 } }
    })
      .then(res => {
        let time = 60,
          timer = null;
        _this.setState({
          disabled: true,
          btnSize: "60s"
        });
        timer = setInterval(() => {
          --time;
          if (time === 0) {
            clearInterval(timer);
            _this.setState({
              disabled: false,
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
  //登录操作
  Login() {
    const { mobile, client, code, loginPassword } = this.state;
    let _this = this;
    if (isPwd(loginPassword)) {
      Axios.ajax(
        {
          url: "/uac/user/login",
          data: {
            params: {
              mobile: mobile,
              loginPassword: loginPassword
            }
          }
        },
        true
      )
        .then(res => {
          if (res.code === 0) {
            _this.Close();
            lStore.set("Token", res.data.token);
            this.props.setUserInfo(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (loginPassword === "") {
      Toast.fail("密码不能为空！", 1);
    } else {
      Toast.fail("密码格式错误，6-20位数字，字母，下划线", 1);
    }
  }
  //注册操作
  register() {
    let _this = this;
    const {
      mobile,
      client,
      code,
      loginPassword,
      beInvitationCode
    } = this.state;
    // let _this = this;
    if (isPwd(loginPassword)) {
      Axios.ajax(
        {
          url: "/uac/user/register",
          data: {
            params: {
              mobile: mobile,
              client: 0,
              code: code,
              loginPassword: loginPassword
              // recaptchaCode: beInvitationCode,
              // beInvitationCode: beInvitationCode
            }
          }
        },
        true
      )
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            _this.Close();
            lStore.set("Token", res.data.token);
            this.props.setUserInfo(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (loginPassword === "") {
      Toast.fail("密码不能为空！", 1);
    } else {
      Toast.fail("密码格式错误，6-20位数字，字母，下划线", 1);
    }
  }
  toPwd = step => {
    console.log(isCode(this.state.code));
    if (this.state.code === "") {
      Toast.fail("验证码不能为空！", 1);
    } else if (!isCode(this.state.code)) {
      Toast.fail("验证码格式错误！", 1);
    } else {
      this.props.setShowLogin(step);
    }
  };
  render() {
    const { showLogin } = this.props;
    return (
      <Fragment>
        {showLogin > -1 && (
          <LoginWrapper>{this.domSelect(showLogin)}</LoginWrapper>
        )}
      </Fragment>
    );
  }

  domSelect(step) {
    const {
      mobile,
      loginPassword,
      code,
      beInvitationCode,
      btnSize,
      disabled
    } = this.state;
    if (step === 0) {
      return (
        <LWrap key={step} He={step}>
          <LRTitle Close={this.Close} />
          <LInp name={"mobile"} Value={mobile} InpChange={this.InpChange} />
          <LButton step={step} toStep={this.checkAccount} />
        </LWrap>
      );
    } else if (step === 1) {
      return (
        <LWrap key={step} He={step}>
          <LRTitle Close={this.Close} />
          <LInp
            label="密码"
            type="password"
            placeholder="请输入密码登录"
            name={"loginPassword"}
            Value={loginPassword}
            InpChange={this.InpChange}
          />
          <LButton step={step} toStep={this.Login} />
          <Tishi step={4} toStep={this.toStep}/>
        </LWrap>
      );
    } else if (step === 2) {
      return (
        <LWrap key={step} He={step}>
          <LRTitle Close={this.Close} title="新用户注册" />
          <LInp
            label="验证码"
            type="text"
            placeholder="请输入验证码"
            name={"code"}
            Value={code}
            InpChange={this.InpChange}
            sendCode={()=>{this.sendCode(1)}}
            isSend={true}
            btnSize={btnSize}
            disabled={disabled}
          />
          <LButton step={3} toStep={this.toPwd} />
          <Back toStep={this.toStep} />
        </LWrap>
      );
    } else if (step === 3) {
      return (
        <LWrap key={step} He={step}>
          <LRTitle Close={this.Close} title="新用户注册" />
          <LInp
            label="密码"
            type="password"
            placeholder="请输入密码"
            name={"loginPassword"}
            Value={loginPassword}
            InpChange={this.InpChange}
          />
          <LInp
            label="邀请码"
            type="text"
            MT="0.149813rem"
            placeholder="选填"
            name={"beInvitationCode"}
            Value={beInvitationCode}
            InpChange={this.InpChange}
          />
          <LButton
            step={step}
            toStep={this.register}
            // MT="0.2397rem"
            text="完成"
          />
        </LWrap>
      );
    } else if(step === 4) {
      return(
        <LWrap key={step} He={step}>
          <LRTitle Close={this.Close} title="重置密码" />
          <LInp name={"mobile"} Value={mobile} InpChange={this.InpChange} />

          <LInp
            label="验证码"
            type="text"
            placeholder="请输入验证码"
            name={"code"}
            Value={code}
            InpChange={this.InpChange}
            sendCode={()=>{this.sendCode(2)}}
            isSend={true}
            btnSize={btnSize}
            disabled={disabled}
          />

          <LInp
            label="密码"
            type="password"
            placeholder="请输入密码"
            name={"loginPassword"}
            Value={loginPassword}
            InpChange={this.InpChange}
          />
          
          <LButton
            step={step}
            toStep={this.ForgetPassword}
            text="完成"
          />
        </LWrap>
      )


    }
  }

  //调用忘记密码接口
  ForgetPassword(){
    const {code,loginPassword,mobile} = this.state;
    Axios.ajax(
      {
        url: "/uac/user/resetPassword",
        data: {
          params: {
            code: code,
            mobile: mobile,
            newLoginPassword:loginPassword
          }
        }
      }
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          Toast.success('修改密码成功');
          this.props.setShowLogin(1);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
//title显示
const LRTitle = function(props) {
  const { title, Close } = props;
  return (
    <LoginTitle>
      {title}
      <p className="close" onClick={Close}>
        <i className="iconfont">&#xe619;</i>
      </p>
    </LoginTitle>
  );
};
LRTitle.defaultProps = {
  title: "登录"
};
// input输入框
const LInp = function(props) {
  const {
    label,
    type,
    placeholder,
    MT,
    InpChange,
    Value,
    name,
    isSend,
    sendCode,
    disabled,
    btnSize
  } = props;
  return (
    <LInpWrapper MT={MT}>
      <p className="label">{label}</p>
      <input
        type={type}
        value={Value}
        onChange={e => {
          InpChange(name, e);
        }}
        placeholder={placeholder}
      />
      {isSend && (
        <button className="sendCode" disabled={disabled} onClick={sendCode}>
          {btnSize}
        </button>
      )}
    </LInpWrapper>
  );
};
LInp.defaultProps = {
  label: "账号",
  type: "text",
  placeholder: "请输入邮箱号",
  isSend: false,
  disabled: false,
  btnSize: "获取验证码"
};
// 按钮
const LButton = function(props) {
  const { text, toStep, step, MT } = props;
  return (
    <LButtonWrapper
      MT={MT}
      onClick={() => {
        toStep(step);
      }}
    >
      {text}
    </LButtonWrapper>
  );
};
LButton.defaultProps = {
  text: "下一步"
};
//提示第二步
const Tishi = function(props) {
  const { text, toStep,step } = props;
  return (
    <TishiWrapper
      onClick={() => {
        toStep(step);
      }}
    >
      <i className="iconfont">&#xe605;</i>
      {text}
    </TishiWrapper>
  );
};
Tishi.defaultProps = {
  text: "忘记密码"
};
//返回上一层
const Back = function(props) {
  const { text, toStep } = props;
  return (
    <BackWrapper
      onClick={() => {
        toStep("back");
      }}
    >
      {text}
    </BackWrapper>
  );
};
Back.defaultProps = {
  text: "返回上一层"
};
const mapState = state => {
  return {
    showLogin: state.getIn(["header", "showLogin"])
  };
};
const mapDispatch = dispatch => ({
  setShowLogin(showLogin) {
    dispatch(actionCreators.setShowLogin(showLogin));
  },
  setUserInfo(userInfo) {
    dispatch(actionCreators.setUserInfo(userInfo));
  }
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Login)
);
