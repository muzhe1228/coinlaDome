import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SingleItem from "./components/SingleItem";
import Axios from "common/Axios";
import { lStore } from "common";

class TaskCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      task1: []
    };
    this.handToActive = this.handToActive.bind(this);
  }

  componentDidMount(){
    this.getTaskList();
  }

  getTaskList(){
    Axios.ajax(
      {
        url: "/acs/activityCenter/selectActivityList",
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
          const tmpTask = [];
          const tmpTask1 = [];
          res.data.map(item => {
            return item.activeType.code === 3 ? tmpTask.push(item) : tmpTask1.push(item);
          })
          this.setState({
            task: tmpTask,
            task1: tmpTask1
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //领取登录奖励
  saveEverydayLogin() {
    Axios.ajax(
      {
        url: "/acs/activityCenter/saveEverydayLogin",
        data: {
          params: {
            token: lStore.get("Token"),
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.getTaskList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handToActive(ItemData){
    if (ItemData.atId === 2){//去领取
      if(ItemData.status === 1){
        this.saveEverydayLogin()
      } 
    }else if(ItemData.atId === 3){//去邀请
      this.GotoInvitation();
    }
  }

  //跳转邀请
  GotoInvitation() {
    this.props.history.push("/invite");
  }

  render() {
    const { task, task1 } = this.state;
    
    return (
      <Fragment>
        <SingleItem SingleList={task} title={"限时任务"} handToActive={this.handToActive} />
        <SingleItem SingleList={task1} title={"新手任务"} handToActive={this.handToActive}/>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(TaskCenter)
);
