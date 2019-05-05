import React, { Component } from "react";
import { CItemWrapper } from "../style";
import hotImg from "images/home/hot.png";
import tenImg from "images/home/tenImg.png";
class CItem extends Component {
  static defaultProps = {
    className: "",
    allColor: {
      bgColor: "#428d74",
      subBgColor: "#3a7d65",
      color: "#acddcb"
    }
  };
  render() {
    const { className, allColor, toDetails, item } = this.props;
    return (
      <CItemWrapper
        className={className}
        ColorObj={allColor}
        onClick={() => {
          toDetails(item.roomId);
        }}
      >
        <p className="cItemTop">
          <img src={hotImg} alt="" />
          <span>
            {item.roomStatus === 0
              ? "下注中"
              : item.roomStatus === 1
              ? "等待开奖"
              : "竞庄中"}
          </span>
        </p>
        <p className="ItemLocation">
          {item.roomType === 0
            ? "低级场"
            : item.roomType === 1
            ? "中级场"
            : "高级场"}
        </p>
        <p className="ItemPric">
          <img src={tenImg} alt="" />
          <span>{item.bottomBets + item.currencyType.msg}</span>
        </p>
        <div className="botMode">
          <p>
            <i className="iconfont">&#xe670;</i>
            <span>{item.peopleNumber}</span>
          </p>
          <p>
            {this.GetStringByNumber(item.minBets) +
              " - " +
              this.GetStringByNumber(item.maxBets) +
              item.currencyType.msg}
          </p>
        </div>
      </CItemWrapper>
    );
  }

  GetStringByNumber(number) {
    if (number >= 10000000) {
      return number / 100000000 + "M";
    } else if (number >= 10000) {
      return number / 10000 + "K";
    } else {
      return number + "";
    }
  }
}

export default CItem;
