import React, { Component } from "react";
import Progress from "components/Progress";
import { CItemWrapper, CItemTop, CItemBot } from "../style";
import { coinSplice } from "common/filter";
import hotImg from "images/home/hot.png";
import tenImg from "images/home/tenImg.png";
import A3 from "images/test/a3.jpg";
class CItem extends Component {
  static defaultProps = {
    className: "",
    allColor: {
      bgColor: "#428d74",
      subBgColor: "#3a7d65",
      color: "#acddcb"
    }
  };
  selectColor(num) {
    if (num === 0) {
      return "transparent";
    } else if (num > 30) {
      return "#d7c142";
    } else {
      return "#e3c877";
    }
  }
  selectType(status) {
    if (status % 2 === 0) {
      return "即将开始";
    } else {
      return "立即购买";
    }
  }
  render() {
    const { className, allColor, PWidth, toDetails } = this.props;
    return (
      <CItemWrapper
        className={className}
        ColorObj={allColor}
        onClick={() => {
          toDetails(PWidth);
        }}
      >
        <CItemTop>
          <li className="top_first">
            <p>{PWidth.reward}</p>
            <p>{PWidth.period}期</p>
          </li>
          <li className="top_img">
            {/* <img src={A3} alt="" /> */}
            <img src={PWidth.logo} alt="" />
          </li>
          <li className="top_progress">
            <Progress
              styles={{
                width:
                  coinSplice(
                    (PWidth.purchasedNumber / PWidth.totalNumber) * 100,
                    2
                  ) + "%",
                backgroundColor: this.selectColor(
                  (PWidth.purchasedNumber / PWidth.totalNumber) * 100
                )
              }}
            />
          </li>
        </CItemTop>
        <CItemBot>
          <button className={PWidth.purchasedNumber % 2 === 0 ? "active" : ""}>
            {this.selectType(PWidth.purchasedNumber)}
          </button>
        </CItemBot>
      </CItemWrapper>
    );
  }
}

export default CItem;
