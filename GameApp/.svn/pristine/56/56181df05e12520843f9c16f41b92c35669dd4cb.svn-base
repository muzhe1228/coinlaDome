import React, { Component } from "react";

import { RightItemWrapper } from "../style";
import img_2 from "images/iconImg/chouM/@3x/icon_chip_green_10pk@3x.png";
import img_5 from "images/iconImg/chouM/@3x/icon_chip_roseo_50pk@3x.png";
import img_10 from "images/iconImg/chouM/@3x/icon_chip_grassgreen_100pk@3x.png";
import img_20 from "images/iconImg/chouM/@3x/icon_chip_purple_200pk@3x.png";
import img_50 from "images/iconImg/chouM/@3x/icon_chip_yellow_500pk@3x.png";
import img_100 from "images/iconImg/chouM/@3x/icon_chip_orange_1000pk@3x.png";

class RightItem extends Component {
  checkCM(ccry) {
    switch (ccry) {
      case 2:
        return img_2;
      case 5:
        return img_5;
      case 10:
        return img_10;
      case 20:
        return img_20;
      case 50:
        return img_50;
      case 100:
        return img_100;
      default:
        return;
    }
  }
  render() {
    const { className, ccry, handle } = this.props;
    console.log(ccry);
    return (
      <RightItemWrapper
        className={className}
        onClick={() => {
          handle(ccry);
        }}
      >
        <img src={this.checkCM(ccry)} alt="筹码" />
      </RightItemWrapper>
    );
  }
}

export default RightItem;
