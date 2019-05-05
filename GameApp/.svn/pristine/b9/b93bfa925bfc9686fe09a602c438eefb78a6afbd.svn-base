import React, { Component } from "react";
import SelectImg from '../../../images/iconImg/icons/@3x/icon_set_sec_select@3x.png'
import unChangeSelectImg from '../../../images/iconImg/icons/@3x/unChangeSelect@3x.png'
import Axios from "common/Axios";
import { lStore } from "common";
import { message } from "antd";
import {
  wrapper,
  BackGround,
  AlertDiv,
  AlertContent
} from "./style";

class TiXianCodeAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseEmailYanZheng:1 //是否开启邮箱验证(0-开启,1-关闭)
    };

    this.SubmitTiXianSetting= this.SubmitTiXianSetting.bind(this);
    this.SelectEmail = this.SelectEmail.bind(this);
  }

  componentDidMount(){
    const { data } = this.props;
    this.setState({
      chooseEmailYanZheng:data.isEmailVerify
    })
  }
  render() {
    const { CloseAlert,data } = this.props;
    const {chooseEmailYanZheng} = this.state;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={'h1'}>提现验证</p>
          <AlertContent>
            <div className={'moneyPsd unChange'}>
              <div>
                {data.isAssetsPasswordVerify === 0? (
                  <p><img src={unChangeSelectImg} alt={''}/></p>
                ):(
                  ''
                )}
                
              </div>

              <span>资金密码</span>
            </div>

            <div className={'moneyPsd'}>
              <div onClick={this.SelectEmail}>
                {chooseEmailYanZheng ===0 ? (
                  <p><img src={SelectImg} alt={''}/></p>
                ):(
                  ''
                )}
                
              </div>

              <span>邮箱验证码</span>
            </div>
          <div className={"submit"} onClick={this.SubmitTiXianSetting}>
              <span>完成</span>
            </div>
          </AlertContent>
        </AlertDiv>
      </BackGround>
    );
  }

  //选择-取消 邮箱验证
  SelectEmail(){
    const {chooseEmailYanZheng} = this.state;
    if(chooseEmailYanZheng === 0) {
      this.setState({
        chooseEmailYanZheng:1
      })
    } else {
      this.setState({
        chooseEmailYanZheng:0
      })
    }
  }

  //提交提现验证
  SubmitTiXianSetting(){
    const { CloseAlert,reloadSettingState } = this.props;
    const {chooseEmailYanZheng} = this.state;
    Axios.ajax(
      {
        url: "/uac/user/updateWithdrawVerify",
        data: {
          params: {
            token: lStore.get("Token"),
            isEmail:chooseEmailYanZheng
          }
        }
      },true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          message.success('设置成功');
          reloadSettingState();
          CloseAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default TiXianCodeAlert;
