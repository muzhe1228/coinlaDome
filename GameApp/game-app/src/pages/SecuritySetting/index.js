import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { wrapper, SecurityContent, SecuritySuperDiv } from "./style";
import ResetLoginPasswordAlert from "./ResetLoginPassword";
import ResetMoneyPasswordAlert from "./ResetMoneyPassword";
import TiXianCodeAlert from "./TiXianCode";
import { connect } from "react-redux";
import { actionCreators as SettingActionCreators } from "components/Header/store";
import Axios from "common/Axios";
import { lStore } from "common";

//安全设置
class SecuritySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertType: 0, //0:关闭所有弹窗  1：提现验证码设置 2：登陆密码 3：资金密码
      isAssetsPassword:'', // 0设置过资金密码 1没有设置过资金密码
      data:''// 安全设置所请求到的数据
    };

    this.ShowAlert = this.ShowAlert.bind(this);
    this.ClickSetting = this.ClickSetting.bind(this);
    this.CloseAlert = this.CloseAlert.bind(this);
    this.LoadSettingState = this.LoadSettingState.bind(this);
  }

  componentDidMount(){
    this.LoadSettingState();
  }

  
  render() {
    const {showAlertType,isAssetsPassword} = this.state;
    const { userInfo } = this.props;
    return (
      <Fragment>
        <SecuritySuperDiv>
          <SecurityContent>
            <p className={"title"}>验证设置</p>
            <div className={"whiteContent"}>
              <span className={"leftTitle"}>邮箱验证</span>
              <div className={"right"}>
                <span className={"value unclick"}>{this.HiddenPhoneNum(userInfo.get('mobile'))}</span>
              </div>
            </div>
            <div
              className={"blackContent"}
              onClick={() => this.ClickSetting(1)}
            >
              <span className={"leftTitle"}>提现验证</span>
              <div className={"right"}>
                <span className={"value"}>已开启</span>
                <i className="iconfont">&#xe621;</i>
              </div>
            </div>
          </SecurityContent>

          <SecurityContent>
            <p className={"title"}>密码设置</p>
            <div
              className={"whiteContent"}
              onClick={() => this.ClickSetting(2)}
            >
              <span className={"leftTitle"}>登陆密码</span>
              <div className={"right"}>
                <span className={"value"}>修改</span>
                <i className="iconfont">&#xe621;</i>
              </div>
            </div>
            <div
              className={"blackContent"}
              onClick={() => this.ClickSetting(3)}
            >
              <span className={"leftTitle"}>资金密码</span>
              <div className={"right"}>
                <span className={"value"}>{isAssetsPassword === 0?'修改':'去设置'}</span>
                <i className="iconfont">&#xe621;</i>
              </div>
            </div>
          </SecurityContent>
        </SecuritySuperDiv>
        {this.ShowAlert(showAlertType)};
      </Fragment>
    );
  }

  //将账号中间变为※
  HiddenPhoneNum(accountNumber) {
    if(!accountNumber){
      return
    }
    var tel = accountNumber;
    // var reg = /^(\d{3})\d{4}(\d{4})$/;   手机号变星号
    var reg = /(.{2}).+(.{2}@.+)/g; //邮箱变星号
    tel = tel.replace(reg, "$1****$2");
    return tel;
  }

  //判断显示哪种弹窗
  ShowAlert(value) {
    const {isAssetsPassword,data} = this.state;
    const { userInfo } = this.props;
    if (value === 0) {
      return;
    } else if (value === 1) {
      return <TiXianCodeAlert CloseAlert={this.CloseAlert} data={data} reloadSettingState={this.LoadSettingState}/>;
    } else if (value === 2) {
      return <ResetLoginPasswordAlert CloseAlert={this.CloseAlert} mobile = {userInfo.get('mobile')}/>;
    } else if (value === 3) {
      return <ResetMoneyPasswordAlert CloseAlert={this.CloseAlert} mobile = {userInfo.get('mobile')} PageType={isAssetsPassword} reloadSettingState={this.LoadSettingState}/>;
    }
  }

  //点击出现弹窗
  ClickSetting(value) {
    console.log(value);
    this.setState({
      showAlertType: value
    });
  }

  //关闭弹窗
  CloseAlert() {
    this.setState({
      showAlertType: 0
    });
  }

  //加载安全设置状态
  LoadSettingState(){
    console.log('token:   '+lStore.get("Token"))
    Axios.ajax(
      {
        url: "/uac/user/selectUserSetting",
        data: {
          params: {
            token: lStore.get("Token")
            
          }
        }
      },true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            isAssetsPassword:res.data.isAssetsPassword,
            data:res.data
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const mapState = state => {
  return {
    userInfo: state.getIn(["header", "userInfo"])
  };
};

const mapDispatch = dispatch => ({
  setUserInfo(userInfo) {
    dispatch(SettingActionCreators.setUserInfo(userInfo));
  }
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SecuritySetting)
);