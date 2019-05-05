import React, { Component, Fragment } from "react";
import { MessageItemDiv } from "./style";
import Img from "images/test/testAvatar.jpg";
import { dateFormat0 } from "common";

class MessageCenterItem extends Component {
  render() {
    const isRead = this.props.content.isRead;
    const { onClick } = this.props;
    return (
      <Fragment>
        <MessageItemDiv
          index={this.props.index}
          color="red"
          className="item"
          onClick={onClick}
        >
          <div className="list-l">
            <img src={Img} id={"messageItemImg"} alt={""} />

            <div className={"message"}>
              <p className={"title"}>{this.props.content.title}</p>
              <p className={"content"}>{this.props.content.content}</p>
            </div>
          </div>

          <div className={"right_content"}>
            {isRead? "" : <div id={"redPoint"} />}

            <span>{dateFormat0(this.props.content.createDate,'yyyy-MM-dd')}</span>
            <i className="iconfont">&#xe621;</i>
          </div>
        </MessageItemDiv>
      </Fragment>
    );
  }
}

export default MessageCenterItem;
