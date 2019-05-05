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
const List = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
class LuZi extends Component {
  render() {
    return (
      <LuZiWrapper>
        <LuZiTitle>
          <TitleItem>期数</TitleItem>
          <TitleItem>Hash</TitleItem>
          <BorderB />
        </LuZiTitle>
        <ScrollH sHeight="calc(100% - 0.659176rem)">
          <LuZiList>
            {List.map(item => {
              return (
                <ListItem key={item}>
                  <p>674120</p>
                  <p>
                    0xf25674…2d9e26d<span>{item}</span>
                  </p>
                </ListItem>
              );
            })}
            {List.map(item => {
              return (
                <ListItem key={"q" + item}>
                  <p>674120</p>
                  <p>
                    0xf25674…2d9e26d<span>{item}</span>
                  </p>
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
