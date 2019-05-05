import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { ModalFooter } from "../style";
class ModalBtn extends Component {
  static propTypes = {
    BtnBool: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string
  };
  static defaultProps = {
    BtnBool: false,
    okText: "确认",
    cancelText: "取消"
  };
  constructor(props) {
    super(props);
    this.FooterBtn = this.FooterBtn.bind(this);
  }
  FooterBtn(isButton) {
    const { okText, cancelText, BtnBool, onClose, onOk } = this.props;
    if (BtnBool) {
      return (
        <button className="OkBtn" onClick={onOk}>
          {okText}
        </button>
      )
    } else {
      return (
        <Fragment>
          <button onClick={onOk}>{okText}</button>
          <button onClick={onClose}>{cancelText}</button>
        </Fragment>
      )
    }
  }
  render() {
    return (
      <ModalFooter className={this.props.className}>
        {this.FooterBtn()}
      </ModalFooter>
    );
  }
}

export default ModalBtn;
