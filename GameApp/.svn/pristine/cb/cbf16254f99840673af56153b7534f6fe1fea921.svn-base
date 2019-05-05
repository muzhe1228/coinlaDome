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
class Currently extends Component {
  render() {
    const { BenJuList } = this.props;
    return (
      <LuZiWrapper>
        <LuZiTitle>
          <TitleItem>账号</TitleItem>
          <TitleItem>竞猜</TitleItem>
          <TitleItem>金额</TitleItem>
          <BorderB />
        </LuZiTitle>
        <ScrollH sHeight="calc(100% - 0.659176rem)">
          <LuZiList>
            {BenJuList.length ? (
              BenJuList.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <p>{item.nick}</p>
                    <p>{item.positionType}</p>
                    <p>{item.bets}PK</p>
                  </ListItem>
                );
              })
            ) : (
              <p>暂无数据！</p>
            )}
          </LuZiList>
        </ScrollH>
      </LuZiWrapper>
    );
  }
}

export default Currently;
