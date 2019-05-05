import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import ENV from "common/APi";
import Socket from "components/Socket";
import BeforStop from "./BeforStop";
import Stop from "./Stop";
import { FengPanWrapper } from "./style";

import FengImg from "images/GameFeng/feng3x.png";
class FengPan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SocketData: null
    };
    this.StatusSocket = this.StatusSocket.bind(this);
    this.selectDom = this.selectDom.bind(this);
  }
  StatusSocket(data) {
    if (!data) return;
    this.setState({
      SocketData: data
    });
  }
  selectDom() {
    const { SocketData } = this.state;
    if (!SocketData) return;

    switch (SocketData.state) {
      case 0:
        return <BeforStop time={SocketData && SocketData.time} />;
      case 1:
        return (
          <Fragment>
            <FengPanWrapper>
              <img src={FengImg} alt="" />
            </FengPanWrapper>
            <Stop />
          </Fragment>
        );
      case 2:
        return <Stop text={"正在准备下一盘"} />;
      case 3:
        return <Stop text={"开始竞庄"} />;
      default:
        return;
    }
  }
  render() {
    const { params } = this.props;
    return (
      <Fragment>
        {this.selectDom()}
        <Socket
          url={ENV.getENV().socketStatus + params}
          onMessage={this.StatusSocket}
        />
      </Fragment>
    );
  }
}

export default withRouter(FengPan);
