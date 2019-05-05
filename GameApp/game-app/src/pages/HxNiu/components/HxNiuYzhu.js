import React, { Component } from "react";
import { YzhuWrapper } from "../style";
import RightItem from "../../Hxjc/components/RightItem";
import ScrollH from "components/scrollH";
class HxNiuYzhu extends Component {
  render() {
    const { List, handle } = this.props;
    return (
      <YzhuWrapper>
        <ScrollH>
          {List.map((item, index) => {
            return <RightItem handle={handle} ccry={item} key={index} />;
          })}
        </ScrollH>
      </YzhuWrapper>
    );
  }
}
export default HxNiuYzhu;
