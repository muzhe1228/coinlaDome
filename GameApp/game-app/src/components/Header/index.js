import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as T18nActionCreators } from "components/I18n/store";
import { actionCreators as GameModelsActionCreators } from "components/GameModels/store";
import MainHeader from "./components/MainHeader";
import Login from "./components/Login";
import SubHeader from "./components/SubHeader";
import { requestFullScreen, exitFullscreen } from "common";
import { showScreen } from "common/filter";
import { lStore } from "common";
import TimeImg from "images/home/time@3.png";
import { setLottery } from "./store/actionCreators";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      Heig: true,
      title: "哈希竞猜",
      explainTitle: ""
    };
    this.allScreen = this.allScreen.bind(this);
    this.testClick = this.testClick.bind(this);
    this.headerShow = this.headerShow.bind(this);
    this.ExplainCheck = this.ExplainCheck.bind(this);
  }
  componentDidMount() {
    this.headerShow();
  }
  componentWillReceiveProps() {
    this.headerShow();
  }
  
  ExplainCheck(url) {
    console.log(url);
    if (url.indexOf("/bull_fight/") !== -1) {
      return ["HashNiu", "哈希牛牛"];
    } else if (url.indexOf("/yydb/") !== -1) {
      return ["HashYydb", "一元夺宝"];
    } else if (url.indexOf("/hxjc") !== -1) {
      return ["HashJc", "哈希竞猜"];
    }
  }
  headerShow() {
    const pathname = this.props.history.location.pathname;
    showScreen(this, "showHeader", ["/hxjc", "/yydb/", "/bull_fight/"], true);
    if (pathname.indexOf("/yydb/") !== -1) {
      this.setState({
        title: "商品详情",
        Heig: true
      });
    } else if (
      pathname.indexOf("/hxjc") !== -1 ||
      pathname.indexOf("/hxjc") !== -1
    ) {
      this.setState({
        title: "哈希竞猜",
        Heig: false
      });
    } else if (pathname.indexOf("/bull_fight/") !== -1) {
      this.setState({
        title: "十倍牛牛",
        Heig: false
      });
    }
  }

  allScreen() {
    const { isScreen } = this.props;
    if (isScreen) {
      exitFullscreen();
    } else {
      requestFullScreen();
    }
    this.props.setIsScreen(!isScreen);
  }
  testClick(e) {
    console.log(e);
  }
  render() {
    const { showHeader, title, Heig, explainTitle } = this.state;
    const {
      setAvatarMenu,
      HeaderInfo,
      setHeaderInfo,
      location,
      isScreen
    } = this.props;
    return (
      <Fragment>
        {showHeader ? (
          <SubHeader
            TimeImg={TimeImg}
            Heig={Heig}
            allScreen={this.allScreen}
            setHeaderInfo={setHeaderInfo.bind(this, "/")}
            pathName={location.pathname}
            title={title}
            ExplainCheck={this.ExplainCheck(location.pathname)}
          />
        ) : (
          <MainHeader
            TimeImg={TimeImg}
            setAvatarMenu={setAvatarMenu}
            setHeaderInfo={setHeaderInfo.bind(this, "/")}
            pathName={location.pathname}
          />
        )}
        <Login />
      </Fragment>
    );
  }
}
const mapState = state => ({
  HeaderInfo: state.getIn(["header", "HeaderInfo"]),
  isScreen: state.getIn(["header", "isScreen"])
});
const mapDispatch = dispatch => ({
  setLang(lang) {
    dispatch(T18nActionCreators.getLang(lang));
  },
  setAvatarMenu(ModelNames) {
    dispatch(GameModelsActionCreators.setModelNames(ModelNames));
  },
  setHeaderInfo(isHeader) {
    this.props.history.push(isHeader);
    dispatch(actionCreators.setHeaderInfo(isHeader));
  },
  setIsScreen(isScreen) {
    dispatch(actionCreators.setIsScreen(isScreen));
  },
  setLottery(Lottery) {
    dispatch(actionCreators.setIsScreen(Lottery));
  }
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Header)
);
