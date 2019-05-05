import React, { Component } from "react";
import { SingleCenter, CenterL, CenterR } from "../style";
import { withRouter } from "react-router-dom";
import { Item } from "antd-mobile/lib/tab-bar";
import iconLogin from "../../../images/iconImg/icons/icon_personal_login.png"
import iconInvite from "../../../images/iconImg/icons/icon_personal_friend.png"
import iconRegister from "../../../images/iconImg/icons/icon_personal_regist.png"

class SingleCenterItem extends Component {
  constructor(props) {
    super(props);
    this.typeSize = this.typeSize.bind(this);
    this.clickToActive = this.clickToActive.bind(this);
  }
  typeSize(status, taskId) {
    if (status === 0) {
      return taskId === 2 ? "已领取" : "已完成";
    } else if (status === 1) {
      return taskId === 2 ? "领取" : "去邀请";
    } else if (status === 2) {
      return "进行中";
    } else if (status === 3) {
      return "去参与";
    }

  }
  render() {
    const { ItemData } = this.props;
    return (
      <SingleCenter>
        <CenterL>
          <img className="iconGlup" src={this.getPic()} alt={""}>
          </img>
          <p className="Size">
            <span className="Size-title">{ItemData.activeName}</span>
            <span className="Size-info">{this.getInfoStr()}</span>
          </p>
        </CenterL>

        <CenterR className={ItemData.status ? "notOver" : ""} onClick={() => {
              this.props.handToActive(ItemData);
            }}>
          {this.typeSize(ItemData.status, ItemData.atId)}
        </CenterR>
      </SingleCenter>
    );
  }

  getPic(){
    const { ItemData } = this.props;
    if (ItemData.atId === 2){//每日登录
      return iconLogin;
    }else if(ItemData.atId === 3){//邀请好友
      return iconInvite;
    }else if(ItemData.atId === 1){//注册
      return iconRegister;
    }
  }

  getInfoStr(){
    const { ItemData } = this.props;
    return ItemData.activeDetail.replace("*", ItemData.awardNumber) + "PK";
  }

  clickToActive(ItemData){
    this.props.handToActive(ItemData);
  }

  // handToActive(){
  //   const { ItemData } = this.props;
  //   if (ItemData.atId === 2){//去领取
  //     this.props.saveEverydayLogin();
  //   }else if(ItemData.atId === 3){//去邀请
  //     this.props.history.push(ItemData.link);
  //   }
  // }
}

export default withRouter (SingleCenterItem);
