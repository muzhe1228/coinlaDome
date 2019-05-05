import React, { Component, Fragment } from "react";
import { wrapper, HeaderImage, UserNameDiv, UserAccountDiv } from "./style";
import Imgs from "../../images/test/testAvatar.jpg";
import I18n, { I18nFunc } from "components/I18n";
import { withRouter } from "react-router-dom";
import GameInstructions from "./Alert/GameInstructions";
import Axios from "common/Axios";
import { lStore } from "common";
import { connect } from "react-redux";
import { actionCreators as UserInfoActionCreators } from "components/Header/store";
import UpdateNameAlert from "./UpdateName";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowUpdateNameAlert: false
    };

    this.UpdateNickName = this.UpdateNickName.bind(this);
    this.CloseAlert = this.CloseAlert.bind(this);
    this.HeadImage = this.HeadImage.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.name);
  }
  render() {
    const { isShowUpdateNameAlert } = this.state;
    const { userInfo } = this.props;
    return (
      <Fragment>
        
        <HeaderImage>
          <span>
          {this.HeadImage}
          {/* {userInfo.get("nick")?userInfo.get("nick").substring(0,1):''} */}
          </span>
        </HeaderImage>

        <UserNameDiv>
          <div>
            <span>用户名</span>
            <span id={"user_name"}>{userInfo.get("nick")?userInfo.get("nick"):''}</span>
            <span className={"updateName"} onClick={this.UpdateNickName}>
              修改
            </span>
          </div>
        </UserNameDiv>

        <UserAccountDiv>
          <div>
            <span>账&nbsp;&nbsp;&nbsp;号</span>
            <span id={"user_account"}>
              {this.HiddenPhoneNum(userInfo.get("mobile"))}
            </span>
          </div>
        </UserAccountDiv>

        {isShowUpdateNameAlert && (
          <UpdateNameAlert
            nickName={userInfo.get("nick")}
            CloseAlert={this.CloseAlert}
          />
        )}
      </Fragment>
    );
  }

  //将账号中间变为※
  HiddenPhoneNum(accountNumber) {
    if(accountNumber){
      var tel = accountNumber;
      // var reg = /^(\d{3})\d{4}(\d{4})$/;   手机号变星号
      var reg = /(.{2}).+(.{2}@.+)/g; //邮箱变星号
      tel = tel.replace(reg, "$1****$2");
      return tel;
    }
  }

  //打开修改姓名弹窗
  UpdateNickName() {
    this.setState({
      isShowUpdateNameAlert: true
    });
  }

  //关闭修改姓名弹窗
  CloseAlert() {
    this.setState({
      isShowUpdateNameAlert: false
    });
  }

  //头像
  HeadImage(){
    console.log('点击头像')

     //获取浏览器的userAgent,并转化为小写
     var ua = navigator.userAgent.toLowerCase();
     //判断是否是苹果手机，是则是true
     var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
     if (isIos) {
      return <input class="headImage" type="file" name="cover"/>
     };
  }
}

const mapState = state => {
  return {
    userInfo: state.getIn(["header", "userInfo"])
  };
};

const mapDispatch = dispatch => ({
  setUserInfo(userInfo) {
    dispatch(UserInfoActionCreators.setUserInfo(userInfo));
  }
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(UserInfo)
);



