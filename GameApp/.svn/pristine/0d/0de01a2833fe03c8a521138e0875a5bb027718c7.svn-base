import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as HeaderActionCreators } from "../Header/store";
import PropTypes from "prop-types";
import { GameModelWrapper, AvatarWrapper, AvatarItem } from "./style";

const menuData = [
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
    title: "PK",
    url: "/bull_fight",
    icon: <i className="iconfont">&#xe620;</i>
  },
  {
    title: "退出登录",
    url: "/login_page",
    icon: <i className="iconfont">&#xe613;</i>
  }
];

class GameModels extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  toHelp(item, e) {
    e.stopPropagation();
    this.props.history.push(item.url);
    this.props.hideModel(null);
    if (item.title === "退出登录") {
      this.props.setHeaderInfo(item.url);
    } else {
      this.props.setHeaderInfo(item.title);
    }
  }
  render() {
    const { hideModel, ModelNames, setHeaderInfo } = this.props;
    return (
      <Fragment>
        {ModelNames === "avatar" && (
          <GameModelWrapper
            onClick={() => {
              hideModel(null);
            }}
          >
            <AvatarWrapper onClick={hideModel.bind(this, ModelNames)}>
              {menuData.map(item => {
                return (
                  <AvatarItem
                    onClick={this.toHelp.bind(this, item)}
                    key={item.url}
                  >
                    {item.icon}
                    {item.title}
                  </AvatarItem>
                );
              })}
            </AvatarWrapper>
          </GameModelWrapper>
        )}
      </Fragment>
    );
  }
}

const mapState = state => {
  return {
    ModelNames: state.getIn(["model", "ModelNames"])
  };
};
const mapDispatch = dispatch => ({
  hideModel(ModelNames, e) {
    dispatch(actionCreators.setModelNames(ModelNames));
  },
  setHeaderInfo(isHeader) {
    dispatch(HeaderActionCreators.setHeaderInfo(isHeader));
  }
});
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(GameModels)
);
