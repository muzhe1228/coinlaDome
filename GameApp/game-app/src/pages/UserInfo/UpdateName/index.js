import React, { Component } from "react";
import {
  wrapper,
  BackGround,
  AlertDiv,
  AlertContent
} from "./style";
import Axios from "common/Axios";
import { lStore } from "common";
import { connect } from "react-redux";
import { actionCreators as UserInfoActionCreators } from "components/Header/store";
import { withRouter } from "react-router-dom";

class UpdateNameAlert extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      name:''
    };
    this.GetInputName = this.GetInputName.bind(this);
    this.GetRadomName = this.GetRadomName.bind(this);
    this.UpdateUserName = this.UpdateUserName.bind(this);
    this.RequestUserInfo = this.RequestUserInfo.bind(this);
  }

  componentDidMount(){
    const { nickName } = this.props;
    this.setState({
      name:nickName
    })
  }

  render() {
    const { CloseAlert } = this.props;
    const name = this.state.name;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={'h1'}>修改用户名</p>
          <AlertContent>
            <div className={'nickName'}>
            <span>用户名</span>
            <input placeholder={'请输入用户名'} value={name} onChange={this.GetInputName}/>
            <p onClick={this.GetRadomName}>切换</p>
            </div>
            <div className={'submit'} onClick={this.UpdateUserName}>
            <span>完成</span>
            </div>
          </AlertContent>
        </AlertDiv>
      </BackGround>
    );
  }


  GetByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
       var a = val.charAt(i);
       if (a.match(/[^\x00-\xff]/ig) != null) 
      {
          len += 2;
      }
      else
      {
          len += 1;
      }
  }
  return len;
}

  GetInputName(e){
    console.log(e.target.value)
    if(this.GetByteLen(e.target.value)<=12 && this.GetByteLen(e.target.value)>=0){
      this.setState({
        name:e.target.value
      })
    }
  }

  GetRadomName(){
    Axios.ajax({
      url: "/uac/user/getRandomName",
      data: {
        params: {
          token: lStore.get("Token")
        }
      }
    })
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            name:res.data
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  UpdateUserName() {
    const name = this.state.name;
    Axios.ajax(
      {
        url: "/uac/user/updateNickName",
        data: {
          params: {
            token: lStore.get("Token"),
            nickName: name
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.RequestUserInfo();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  RequestUserInfo() {
    const { CloseAlert } = this.props;
    const { setUserInfo } = this.props;
    Axios.ajax({
      url: "/uac/user/selectUserInfo",
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
          setUserInfo(res.data);
          CloseAlert();
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
    dispatch(UserInfoActionCreators.setUserInfo(userInfo));
  }
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(UpdateNameAlert)
);