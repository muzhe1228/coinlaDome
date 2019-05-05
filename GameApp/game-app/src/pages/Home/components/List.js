import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListWrapper } from "../style";
import Avatar from "images/test/testAvatar.jpg";
class List extends Component {
  static props = {
    className: PropTypes.string,
    onClick: PropTypes.func
  };
  static defaultProps = {
    className: ""
  };
  render() {
    const { className, onClick } = this.props;
    return (
      <ListWrapper className={className} onClick={onClick}>
        <img src={Avatar} alt="" />
        <h2>PK交易</h2>
      </ListWrapper>
    );
  }
}

export default List;
