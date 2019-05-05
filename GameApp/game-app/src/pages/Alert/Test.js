import React, { Component } from "react";
import HandleModal from "components/Models/HandleModal";

class ExchangeCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testdata: "我是嘴里层"
    };
    this.change = this.change.bind(this);
  }
  change() {
    console.log(this.state.testdata);
  }
  render() {
    const { isButton } = this.state;
    return (
      <HandleModal isOpen title="Test" isButton={1} onOk={this.change}>
        {isButton}
      </HandleModal>
    );
  }
}

export default ExchangeCoin;
