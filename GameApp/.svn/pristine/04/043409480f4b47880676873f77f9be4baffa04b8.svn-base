import React, { Component } from "react";
import ScrollH from "components/scrollH";
import {
  CurrentlyWrapper,
  CurrentlyNav,
  CurrentlyTitle,
  CurrentlyList,
  BorderB,
  CurrentlyTitleItem,
  CurrentlyItem
} from "../style";

class Currently extends Component {
  render() {
    const { moneyData, CurrentlyData } = this.props;

    return (
      <CurrentlyWrapper>
        <CurrentlyNav>
          <p>总金额</p>
          <p>{moneyData}</p>
        </CurrentlyNav>
        <CurrentlyTitle>
          <CurrentlyTitleItem>账号</CurrentlyTitleItem>
          <CurrentlyTitleItem>竞猜</CurrentlyTitleItem>
          <CurrentlyTitleItem>金额</CurrentlyTitleItem>
          <BorderB />
        </CurrentlyTitle>
        <ScrollH sHeight="calc(100% - 1.093633rem)">
          <CurrentlyList>
            {CurrentlyData.map((item, index) => {
              return (
                <CurrentlyItem key={index}>
                  <p>{item.nick}</p>
                  <p>{item.positionType.msg}</p>
                  <p>{item.bets}</p>
                </CurrentlyItem>
              );
            })}
          </CurrentlyList>
        </ScrollH>
      </CurrentlyWrapper>
    );
  }
}

export default Currently;
