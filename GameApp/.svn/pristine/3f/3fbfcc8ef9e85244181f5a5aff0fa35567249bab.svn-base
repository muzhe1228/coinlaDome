import React, { Component } from "react";
import ScrollH from "components/scrollH";
import { RightItemWrapper } from "./style";
import img_10 from "images/iconImg/chouM/@3x/icon_chip_green_10pk@3x.png";
import img_50 from "images/iconImg/chouM/@3x/icon_chip_roseo_50pk@3x.png";
import img_100 from "images/iconImg/chouM/@3x/icon_chip_grassgreen_100pk@3x.png";
import img_200 from "images/iconImg/chouM/@3x/icon_chip_purple_200pk@3x.png";
import img_500 from "images/iconImg/chouM/@3x/icon_chip_yellow_500pk@3x.png";
import img_1000 from "images/iconImg/chouM/@3x/icon_chip_orange_1000pk@3x.png";

class YaZhu extends Component {
  checkCM(ccry) {
    switch (ccry) {
      case 10:
        return img_10;
      case 50:
        return img_50;
      case 100:
        return img_100;
      case 200:
        return img_200;
      case 500:
        return img_500;
      case 1000:
        return img_1000;
      default:
        return;
    }
  }
  render() {
    const { checkYZ, List, handleYaZhu, sHeight } = this.props;
    return (
       <ScrollH sHeight={sHeight}>
        {List.map((item, index) => {
          return (
            <RightItemWrapper
              className={checkYZ === item.bets ? "active" : ""}
              key={index}
              onClick={() => {
                handleYaZhu(item.bets);
              }}
            >
              <img src={this.checkCM(item.bets)} alt="筹码" />
            </RightItemWrapper>
          );
        })}
      </ScrollH>
    );
  }
}

export default YaZhu;
