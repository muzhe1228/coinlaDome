import React, { Component } from "react";
import { Carousel, WingBlank } from "antd-mobile";
import { ScrollNotice } from "./style";

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeData: [
        { text: "coinla-games", link: "coinla.com" },
        { text: "正式开始", link: "coinla.com" },
        { text: "ETH新玩法", link: "w.sz.com" }
      ]
    };
  }
  render() {
    const { noticeData } = this.state;
    return (
      <ScrollNotice>
        <WingBlank className="my-carousel">
          <Carousel
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
          >
            {noticeData.map(item => {
              return (
                <div className="wItem" key={item.text}>
                  {item.text}
                </div>
              );
            })}
          </Carousel>
          <p className="Icon">
            <i className="iconfont">&#xe601;</i>
          </p>
        </WingBlank>
      </ScrollNotice>
    );
  }
}

export default Notice;
