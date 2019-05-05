import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { wrapper } from "./style";
import MessageCenterItem from "./MessageCenterItem";
import Axios from "common/Axios";
import { lStore } from "common";
import MessageDetail from "./MessageDetail";
import { actionCreators as LeftNavActionCreators } from "components/LeftNav/store";
import { from } from "rxjs";
import { dispatch } from "rxjs/internal/observable/pairs";
import ScrollH from "components/scrollH";
class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      showRow: "",
      dataArray: [],
      page:1,
      pageSize:20 
    };

    this.ShowDetail = this.ShowDetail.bind(this);
    this.CloseAlert = this.CloseAlert.bind(this);
    this.ChangeRead = this.ChangeRead.bind(this);
    this.LoadData = this.LoadData.bind(this);
    this.LookForUnRead = this.LookForUnRead.bind(this);
    this.NextPage = this.NextPage.bind(this);
  }

  render() {
    const showDetail = this.state.showDetail;
    const showRow = this.state.showRow;

    return (
      <Fragment>
          <ScrollH pullup={this.NextPage}>
            <ul>
              {this.state.dataArray.map((item, index) => {
                return (
                  <MessageCenterItem
                    key={index}
                    content={item}
                    index={index}
                    onClick={() => this.ShowDetail(index)}
                  />
                );
              })}
            </ul>
          </ScrollH>

        {showDetail && (
          <MessageDetail
            messageID={this.state.dataArray[showRow].messageId}
            CloseAlert={this.CloseAlert}
          />
        )}
      </Fragment>
    );
  }

  componentDidMount() {
    console.log(lStore.get("Token"));
    this.LoadData();
  }

  NextPage(){
    this.LoadData();
  }

  //加载数据
  LoadData(){
    const {page,dataArray,pageSize} = this.state;
    Axios.ajax(
      {
        url: "/mcs/message/selectMessageList",
        data: {
          params: {
            token: lStore.get("Token"),
            size:pageSize,
            page:page
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            dataArray: dataArray.concat(res.data.list),
            page:page+1
          },()=>{
            console.log('第'+page+'页')
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //点击列表
  ShowDetail(index) {
    const {dataArray} = this.state;
    console.log("showrow" + index);
    this.setState({
      showDetail: true,
      showRow: index
    },()=>{
      //调用已读接口
      var object = dataArray[index];
      object.isRead = 1;
      var array = dataArray;
      array.splice(index,1,object)
      this.ChangeRead(dataArray[index].messageId);
    });
  }

  //关闭详情
  CloseAlert() {  
    this.setState({
      showDetail: false
    });
  }

  //改为已读状态
  ChangeRead(idString){
    Axios.ajax(
      {
        url: "/mcs/message/updateMessageStatus",
        data: {
          params: {
            token: lStore.get("Token"),
            ids: idString
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log("改消息修改为已读状态");
          this.LookForUnRead();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //查询红点
  LookForUnRead(){
    const { setMsgNum } = this.props;
    Axios.ajax(
      {
        url: "/mcs/message/selectMessageRedDot",
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
          if (res.data) {
            console.log("列表-未读消息数量" + res.data);
            setMsgNum(res.data);
          } else {
            setMsgNum(0);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
const mapDispatch = dispatch => ({
  setMsgNum(msgNum) {
    dispatch(LeftNavActionCreators.setMsgNum(msgNum));
  }
});

export default withRouter(
  connect(
    null,
    mapDispatch
  )(MessageCenter)
);
