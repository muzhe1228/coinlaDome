import React, { Component, Fragment } from "react";
import { MsgWrapper } from "./style";
import Socket from "components/Socket";
import ENV from "common/APi";
class MsgSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "【公告】币猜陪你到老，投资有风险下注需谨慎~",
      speed: 18
    };
    this.NoticeData = this.NoticeData.bind(this);
    this.Marquee = this.Marquee.bind(this);
    this.x = 0;
    this.Timer = null;
  }
  componentDidMount() {
    // console.log(this.refs.tab2.offsetWidth);
    this.Timer = setInterval(this.Marquee, this.state.speed);
  }
  componentWillUnmount() {
    clearInterval(this.Timer);
  }
  NoticeData(data) {
    this.setState({
      data
    });
  }
  // Marquee() {
  //   let tab1 = this.refs.tab1,
  //     tab = this.refs.tab;
  //   // tab2 = this.refs.tab2;
  //   // tab.scrollLeft = 350;
  //   if (tab1.offsetWidth - tab.scrollLeft <= 0) {
  //     tab.scrollLeft -= tab1.offsetWidth;
  //   } else {
  //     console.log(tab.scrollLeft);
  //     tab.scrollLeft--;
  //   }
  // }
  Marquee() {
    let tab1 = this.refs.tab1,
      tab = this.refs.tab,
      w = tab1.offsetWidth;
    // tab2 = this.refs.tab2;
    tab1.style.left = this.x + "px";
    // _box2.style.left = (x +1298) + 'px';
    this.x--;
    if (this.x + w == 0) {
      this.x = w;
    }
  }
  render() {
    const { data } = this.state;
    const { style } = this.props;
    return (
      <Fragment>
        <MsgWrapper className={this.props.className} style={style}>
          <p className="MsgL">
            <i className="iconfont">&#xe601;</i>
          </p>
          <div className="MsgR" ref="tab">
            <p ref="tab1">{data}</p>
            {/* <p ref="tab2">{data}</p> */}
          </div>
        </MsgWrapper>
        <Socket url={ENV.getENV().socketNotice} onMessage={this.NoticeData} />
      </Fragment>
    );
  }
}

export default MsgSlider;
