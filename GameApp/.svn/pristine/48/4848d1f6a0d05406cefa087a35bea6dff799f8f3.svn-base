import React from "react";
import ScrollH from "components/scrollH";
import { hashSplic } from "common/filter";
import {
  LuZiWrapper,
  LuZiTitle,
  BorderB,
  TitleItem,
  LuZiList,
  ListItem
} from "../style";
const LuZi = function(props) {
  const { Data } = props;
  return (
    <LuZiWrapper>
      <LuZiTitle >
        <TitleItem isDef={true}>期数</TitleItem>
        <TitleItem isDef={true}>Hash</TitleItem>
        <BorderB />
      </LuZiTitle>
      <ScrollH sHeight="calc(100% - 0.659176rem)">
        <LuZiList>
          {Data.length ? (
            Data.map(item => {
              return (
                <ListItem isDef={true} key={item.createDate}>
                  <p>{item.blockId}</p>
                  <p title={item.hash}>
                    {hashSplic(item.hash)}
                    <span>{item.result}</span>
                  </p>
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
};

export default LuZi;
