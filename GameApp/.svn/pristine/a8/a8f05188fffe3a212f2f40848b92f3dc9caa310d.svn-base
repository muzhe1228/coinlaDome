import React, { Component } from "react";
import ScrollH from "components/scrollH";
import { JZWrapper, JZList, NiuRightBot } from "../style";
import ImgA from "images/test/a1.jpg";

const jzNumber = "";

class HxNiuJZ extends Component {
  constructor(props) {
    super(props);
    this.JzNumberChange = this.JzNumberChange.bind(this);
  }
  //最小金额
  getLowestNumber() {
    const roomType = 0;
    if (roomType === 0) {
      return 1000;
    } else {
      return 10000;
    }
  }

  JzNumberChange(e) {
    this.jzNumber = e.target.value;
  }

  getDetails() {
    return {
      number: this.jzNumber,
      currencyType: "0"
    };
  }

  render() {
    const { JzData } = this.props;
    console.log(JzData);
    return (
      <JZWrapper className="test">
        <JZList>
          <ScrollH data={JzData}>
            {JzData.arrData.map((item, index) => {
              return (
                <li key={index}>
                  <p className="rank">
                    {index < 3 ? <img src={ImgA} alt="" /> : index + 1}
                  </p>
                  <p className="namePric">
                    <span className="name">{item.nick}</span>
                    <span className="totalPric">{item.currencyNumber}</span>
                  </p>
                </li>
              );
            })}
          </ScrollH>
        </JZList>
        <NiuRightBot>
          <input
            placeholder={this.getLowestNumber() + "PK起投"}
            onChange={this.JzNumberChange}
            type={"number"}
          />
          <p>*默认10次连庄</p>
          <button
            onClick={() => {
              this.props.handleJzClick(this.getDetails());
            }}
          >
            {JzData.jzState === 0 ? "立即竞庄" : "取消竞庄"}
          </button>
        </NiuRightBot>
      </JZWrapper>
    );
  }
}
export default HxNiuJZ;
