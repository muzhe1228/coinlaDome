import React, { Component } from "react";
import { LeftNavWrapper } from "../style";
import Avatar from "images/test/testAvatar.jpg";
class LeftNav extends Component {
  static defaultProps = {
    className: ""
  };
  render() {
    const { className, text } = this.props;
    return (
      <LeftNavWrapper className={className}>
        {text &&
          text.split("").map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
      </LeftNavWrapper>
    );
  }
}

export default LeftNav;
