import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as HeaderActionCreators } from "../Header/store";
import { WrapWrapper, NavWrapper, NavItem } from "./style";
import { showScreen } from "common/filter";
import Axios from "common/Axios";
import { lStore } from "common";
import LoginOutAlert from "../modal";
const NavData = [
  {
    title: "个人资料",
    url: "/user_info",
    icon: <i className="iconfont">&#xe75a;</i>
  },
  {
    title: "任务中心",
    url: "/task_center",
    icon: <i className="iconfont">&#xe602;</i>
  },
  {
    title: "收支明细",
    url: "/payments",
    icon: <i className="iconfont">&#xe78e;</i>
  },
  {
    title: "游戏记录",
    url: "/game_record",
    icon: <i className="iconfont">&#xe61f;</i>
  },
  {
    title: "安全设置",
    url: "/security_setting",
    icon: <i className="iconfont">&#xe723;</i>
  },
  {
    title: "消息中心",
    url: "/message_center",
    icon: <i className="iconfont">&#xe620;</i>
  },
  {
    title: "退出登录",
    url: "",
    icon: <i className="iconfont">&#xe620;</i>
  }
];
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNav: true
    };
    this.RequestUnReadCount = this.RequestUnReadCount.bind(this);
    this.LoginOut = this.LoginOut.bind(this);
  }
  toHelp(item) {
    if (item.title === "退出登录") {
      LoginOutAlert.confirm({
        title: "确定要退出登录么？",
        onOk: this.LoginOut
      });
    } else {
      if (this.props.location.pathname === item.url) return;
      this.props.history.push(item.url);
      this.props.setHeaderInfo(item.title);
    }
  }
  componentDidMount() {
    showScreen(this, "isNav", ["/hxjc", "/bull_fight", "/yydb"], true);
  }
  componentWillReceiveProps() {
    showScreen(this, "isNav", ["/hxjc", "/bull_fight", "/yydb"], true);
  }

  RequestUnReadCount() {
    const { isShowNav, setMsgNum } = this.props;
    this.props.setIsShowNav(isShowNav);
    Axios.ajax(
      {
        url: "/mcs/message/selectMessageRedDot",
        data: {
          params: {
            token: lStore.get("Token")
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          if (res.data) {
            console.log("未读消息数量" + res.data);
            setMsgNum(res.data);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { HeaderInfo, isShowNav, setIsShowNav, msgNum } = this.props;
    const { isNav } = this.state;
    return (
      <Fragment>
        {isNav ? (
          setIsShowNav(false)
        ) : (
          <WrapWrapper>
            <div className={!isShowNav ? "widthWrapper" : ""} />
            <NavWrapper className={isShowNav && "hide"}>
                {NavData.map(item => {
                  return (
                    <NavItem
                      className={item.title === HeaderInfo && "active"}
                      onClick={() => {
                        this.toHelp(item);
                      }}
                      key={item.title}
                      number={NavData.length}
                    >
                      {item.title}
                      {item.url === "/message_center" && msgNum > 0 ? (
                        <p className={"redPoint"}>{msgNum}</p>
                      ) : (
                        ""
                      )}
                    </NavItem>
                  );
                })}
              <button className="iconHandele" onClick={this.RequestUnReadCount}>
                <i className="iconfont">&#xe621;</i>
              </button>
            </NavWrapper>
          </WrapWrapper>
        )}
      </Fragment>
    );
  }

  //退出登录
  LoginOut() {
    console.log("退出登录");
    const { setHeaderInfo } = this.props;
    Axios.ajax(
      {
        url: "/uac/user/outLogin",
        data: {
          params: {
            token: lStore.get("Token")
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          lStore.remove("Token");
          setHeaderInfo("");
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const mapState = state => {
  return {
    HeaderInfo: state.getIn(["header", "HeaderInfo"]),
    isShowNav: state.getIn(["leftNav", "isShowNav"]),
    msgNum: state.getIn(["leftNav", "msgNum"])
  };
};
const mapDispatch = dispatch => ({
  setHeaderInfo(isHeader) {
    dispatch(HeaderActionCreators.setHeaderInfo(isHeader));
  },

  setIsShowNav(isShowNav) {
    dispatch(actionCreators.setIsShowNav(!isShowNav));
  },

  setMsgNum(msgNum) {
    dispatch(actionCreators.setMsgNum(msgNum));
  }
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(LeftNav)
);
