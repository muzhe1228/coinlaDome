import React, { Fragment, Component } from "react";
import { MessageDiv } from "./style";
import GrayLeftImg from "../../images/iconImg/icons/@3x/icon_infor_gray_left@3x.png";
import YellowRightImg from "../../images/iconImg/icons/@3x/icon_infor_gold_right@3x.png";

class Message extends Component {
  render() {
    const { messageType, item,nickFirst } = this.props;
     return (
      <Fragment>
        {messageType === "left" ? (
          <MessageDiv>
            <p className={'l-headImg'}><img src={''} alt={''}/></p>
            <p className={'l-img'}><img src={GrayLeftImg} alt={''}/></p>
            <div className={'l-message'}><span>{item.message}</span></div>
          </MessageDiv>
        ) : (
          <MessageDiv>
            <div className={'r-message'}><span>{item.message}</span></div>
            <p className={'r-img'}><img src={YellowRightImg} alt={''}/></p>
            <p className={'r-headImg'}>
            {/* <img src={''} alt={''}/> */}
            <span>{nickFirst?nickFirst:''}</span>
            </p>
            
            
          </MessageDiv>
        )}
      </Fragment>
    );
  }
}

export default Message;
