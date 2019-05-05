import React, { Component } from "react";
import Axios from "common/Axios";
import { lStore } from "common";
import { wrapper, BackGround, AlertDiv, AlertContent } from "./style";
import ScrollH from "components/scrollH";
import { from } from "rxjs";

class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  render() {
    const { CloseAlert } = this.props;
    const data = this.state.data;
    return (
      <BackGround>
        <AlertDiv>
          <i className={"iconfont closeAlert"} onClick={CloseAlert}>&#xe619;</i>
          <p className={"h1"}>{data.title&&data.title}</p>
          <AlertContent>
            <ScrollH>
              <p className={"content"}>{data.content&&data.content}</p>
            </ScrollH>
          </AlertContent>
        </AlertDiv>
      </BackGround>
    );
  }

  componentDidMount() {
    const { messageID } = this.props;

    console.log(lStore.get("Token"), messageID);
    Axios.ajax(
      {
        url: "/mcs/message/selectMessageDetail",
        data: {
          params: {
            token: lStore.get("Token"),
            messageId: messageID
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            data: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default MessageDetail;
