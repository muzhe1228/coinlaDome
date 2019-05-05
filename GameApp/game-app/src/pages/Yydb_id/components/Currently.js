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
    const { dataList } = this.props;
    console.log(dataList);
    return (
      <LuZiWrapper>
        <LuZiTitle>
          {dataList.params.map((item, index) => {
            return (
              <TitleItem
                style={{ width: item.ItemW, justifyContent: item.Center }}
                key={item.title}
              >
                {item.title}
              </TitleItem>
            );
          })}
          <BorderB />
        </LuZiTitle>
        <ScrollH sHeight="calc(100% - 0.659176rem)">
          <LuZiList>
            {dataList.List.map((item, index) => {
              return (
                <ListItem key={index}>
                  {dataList.params.map(item1 => {
                    return (
                      <p
                        style={{
                          width: item1.ItemW,
                          justifyContent: item1.Center
                        }}
                        key={index + "" + item1.title}
                      >
                        {item1.Value === "PK"
                          ? item * 10 + item1.Value
                          : item1.Value + item}
                      </p>
                    );
                  })}
                </ListItem>
              );
            })}
          </LuZiList>
        </ScrollH>
      </LuZiWrapper>
    );
  }
}

export default Currently;
