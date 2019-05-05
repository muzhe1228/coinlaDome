import React, { Component } from "react";
import MsgSlider from "components/MsgSlider";
import Socket from "components/Socket";
import ENV from "common/APi";
import ScrollH from "components/scrollH";
import Axios from "common/Axios";
import { lStore } from "common";
import {
  MsgWrapper,
  MsgWrap,
  MsgTitle,
  BorderB,
  MsgInfo,
  MsgBot
} from "./style";
class ChatMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      ChatList: [],
      WSTest: null
    };
    this.changeText = this.changeText.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.ChatSocket = this.ChatSocket.bind(this);
    this.testOn = this.testOn.bind(this);
  }
  testOn(iss, ws) {
    console.log(iss, ws);
    this.setState(
      {
        WSTest: iss.send
      },
      () => {
        console.log(this.state.WSTest);
      }
    );
  }
  //监听聊天输入框
  changeText(e) {
    let value = e.target.value;
    this.setState({
      textValue: value
    });
  }
  //聊天Socket
  ChatSocket(data) {
    if (!data) return;
    console.log(data);
    this.setState(prevState => ({
      ChatList: [...prevState.ChatList, data]
    }));
  }
  //send发送消息
  sendMsg() {
    const { textValue } = this.state;
    const { Url, roomId } = this.props;
    Axios.ajax(
      {
        url: Url,
        data: {
          params: {
            content: textValue,
            roomId: roomId,
            token: lStore.get("Token")
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.setState({
            textValue: ""
          });
        }
      })
      .catch(err => {
        this.setState({
          textValue: ""
        });
      });
  }
  render() {
    const { textValue, ChatList } = this.state;
    const { CW, roomId, roomType } = this.props;
    return (
      <MsgWrapper CW={CW}>
        <MsgTitle>
          <MsgSlider style={{ marginLeft: 0 }} />
          <BorderB />
        </MsgTitle>
        <MsgWrap>
          <ScrollH scrollToEndFlag={true} data={ChatList}>
            <MsgInfo>
              {ChatList.length
                ? ChatList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={
                          item.userName === lStore.get("userInfo").nick &&
                          "myInfo"
                        }
                      >
                        <p>{item.userName}：</p>
                        <p>{item.content}</p>
                      </li>
                    );
                  })
                : "暂无消息"}
            </MsgInfo>
          </ScrollH>
        </MsgWrap>
        <MsgBot>
          <textarea value={textValue} onChange={this.changeText} />
          <button onClick={this.sendMsg}>发送</button>
        </MsgBot>
        <Socket
          url={ENV.getENV().socketChat + "/" + roomType + "/" + roomId}
          onMessage={this.ChatSocket}
          onCreate={this.testOn}
        />
      </MsgWrapper>
    );
  }
}

export default ChatMsg;
