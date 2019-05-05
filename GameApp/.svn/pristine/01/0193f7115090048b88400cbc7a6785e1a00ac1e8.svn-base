import React, { Component } from "react";
import ScrollH from "components/scrollH";
import {
  LuZiWrapper,
  LuZiTitle,
  BorderB,
  TitleItem,
  LuZiList,
  ListItem
} from "../style";
import Axios from "common/Axios";
import { lStore } from "common";

class LuZi extends Component {
  render() {
    const { Data } = this.props;
    return (
      <LuZiWrapper>
        <LuZiTitle>
          <TitleItem>期数</TitleItem>
          <TitleItem>庄家</TitleItem>
          <TitleItem>天</TitleItem>
          <TitleItem>地</TitleItem>
          <TitleItem>玄</TitleItem>
          <BorderB />
        </LuZiTitle>
        <ScrollH sHeight="calc(100% - 0.659176rem)">
          <LuZiList>
            {Data.map(item => {
              return (
                <ListItem key={item}>
                  <li className="first">
                    <p>{item.blockId}</p>
                    <p className="resultTitle">
                      <span>Hash</span>
                      <span>结果</span>
                    </p>
                  </li>
                  <li className="other color1">
                    <p>{item.cardBanker}</p>
                    <p>{item.niuBanker}</p>
                  </li>
                  <li className="other color2">
                    <p>{item.cardSky}</p>
                    <p>{item.niuSky}</p>
                  </li>
                  <li className="other color3">
                    <p>{item.cardLand}</p>
                    <p>{item.niuLand}</p>
                  </li>
                  <li className="other color4">
                    <p>{item.cardMysterious}</p>
                    <p>{item.niuMysterious}</p>
                  </li>
                </ListItem>
              );
            })}
          </LuZiList>
        </ScrollH>
      </LuZiWrapper>
    );
  }
}

export default LuZi;
