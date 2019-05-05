import React, { Component, Fragment } from "react";
import CommonStyle from "style/reset";
import { withRouter } from "react-router-dom";
import Header from "components/Header";
import LeftNav from "components/LeftNav";
// import Notice from "components/Notice";
import Footer from "components/Footer";
import Lottery from "components/Lottery";
import { connect } from "react-redux";
import GameModels from "components/GameModels";
import { showScreen } from "common/filter";
import { getUUID } from "common";
// import radio from "images/click.mp3";
// import bgm from "images/bgm.mp3";
// import { bgmPlay, closeBgm } from "common";
import { GameWrap, GameHeader, GameWrapper, GameFooter } from "./style";
import bgAImg from "images/home/bg@2.jpg";
import bgHxjc from "images/home/bgblue@2.jpg";
class SubIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImg: false
    };
  }
  componentDidMount() {
    showScreen(this, "bgImg", ["/hxjc", "/bull_fight/"], true);

    console.log(getUUID());
  }
  componentWillReceiveProps() {
    showScreen(this, "bgImg", ["/hxjc", "/bull_fight/"], true);
  }

  render() {
    const { bgImg } = this.state;
    return (
      <Fragment>
        <GameWrap bgImg={bgImg ? bgHxjc : bgAImg}>
          <canvas id="canvas" />
          {/* 全局css样式 */}
          <CommonStyle />
          <GameHeader>
            <Header />
          </GameHeader>
          {/* <GameNotice>
            <Notice />
          </GameNotice> */}
          <GameWrapper contW={this.props.isShowNav} smallHeader={bgImg}>
            <div className="gameWrapper-scroll">
              <LeftNav />
              <div className="rightCenter">{this.props.dom.props.children}</div>
            </div>
          </GameWrapper>
          <GameFooter>
            <Footer />
          </GameFooter>
          <GameModels />
        </GameWrap>
        <Lottery />
      </Fragment>
    );
  }
}

const mapState = state => ({
  HeaderInfo: state.getIn(["header", "HeaderInfo"]),
  isShowNav: state.getIn(["leftNav", "isShowNav"])
});

export default withRouter(
  connect(
    mapState,
    null
  )(SubIndex)
);
