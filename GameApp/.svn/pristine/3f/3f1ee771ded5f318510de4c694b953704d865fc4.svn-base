import React, { Component } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import { Wrapper } from "./style";

class ScrollWrapper extends Component {
  static PropTypes = {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: PropTypes.number,
    /**
     * 点击列表是否派发click事件
     */
    click: PropTypes.bool,
    /**
     * 是否开启横向滚动
     */
    scrollX: PropTypes.bool,
    /**
     * 是否派发滚动事件
     */
    listenScroll: PropTypes.bool,
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: PropTypes.bool,
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: PropTypes.bool,
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: PropTypes.bool,
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: PropTypes.bool,
    /**
     * 如果启用loading交互，传递loading的状态
     * isShow: false
     * showIcon: false,    // 是否显示loading的icon
     * status: ''  // '正在加载...', '刷新成功', '刷新失败', ''
     */
    loadingStatus: PropTypes.object,
    /**
     * 是否启用下拉刷新的交互
     */
    pulldownUI: PropTypes.bool,
    /**
     * 是否启用上拉加载的交互
     */
    pullupUI: PropTypes.bool,
    /**
     * 是否滚动到底部  聊天
     */
    scrollToEndFlag: PropTypes.bool
  };

  static defaultProps = {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: 2,
    /**
     * 点击列表是否派发click事件
     */
    click: true,
    /**
     * 是否开启横向滚动
     */
    scrollX: false,
    /**
     * 是否派发滚动事件
     */
    listenScroll: false,
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: false,
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: false,
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: false,
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: 20,
    /**
     * 如果启用loading交互，传递loading的状态
     * isShow: false
     * showIcon: false,    // 是否显示loading的icon
     * status: ''  // '正在加载...', '刷新成功', '刷新失败', ''
     */
    loadingStatus: {
      showIcon: false,
      status: ""
    },
    /**
     * 是否启用下拉刷新的交互
     */
    pulldownUI: false,
    /**
     * 是否启用上拉加载的交互
     */
    pullupUI: false,
    /**
     * 是否滚动到底部  聊天
     */
    scrollToEndFlag: false
  };

  constructor(props) {
    super(props);
    this.state = {
      roud: 1,
      pulldownMsg: "",
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        rotate: "" // icon-rotate
      }
    };

    this.scroll = null;
    this.disable = this.disable.bind(this);
    this.enable = this.enable.bind(this);
    this.refresh = this.refresh.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.refreshS = this.refreshS.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }
  Timer = null;
  // componentWillReceiveProps() {
  //   this.Scroll.refresh();
  // }
  componentDidMount() {
    let _this = this;
    setTimeout(() => {
      _this._initScroll();
    }, 30);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.scrollToEnd();
    }
    return true;
  }
  _initScroll() {
    const wrapp = this.refs.scroll_wrapper;
    const {
      probeType,
      click,
      scrollX,
      listenScroll,
      pulldown,
      pullup,
      beforeScroll,
      scrollToEndFlag
    } = this.props;
    let _this = this;
    if (!wrapp) {
      return;
    }
    // better-scroll的初始化
    this.scroll = new BScroll(wrapp, {
      probeType: probeType,
      click: click,
      scrollX: scrollX
    });
    //滚动到底部
    if (scrollToEndFlag) {
      setTimeout(() => {
        _this.scroll.scrollTo(0, this.scroll.maxScrollY);
      }, 100);
    }
    // 是否派发滚动事件
    if (listenScroll || pulldown || pullup) {
      this.scroll.on("scroll", pos => {
        if (pulldown) {
          // 下拉动作
          if (pos.y > 50) {
            this.setState({
              pulldownTip: {
                text: "松开立即刷新",
                rotate: "icon-rotate"
              }
            });
          } else {
            this.setState({
              pulldownTip: {
                text: "下拉刷新", // 松开立即刷新
                rotate: "" // icon-rotate
              }
            });
          }
        }

        if (pullup) {
        }
      });
    }

    // 是否派发滚动到底部事件，用于上拉加载
    if (pullup) {
      this.scroll.on("scrollEnd", () => {
        // 滚动到底部
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          console.log("到底不了");
          pullup();
        }
      });
    }

    // 是否派发顶部下拉事件，用于下拉刷新
    if (pulldown) {
      this.scroll.on("touchend", pos => {
        // 下拉动作
        if (pos.y > 50) {
          setTimeout(() => {
            // 重置提示信息
            _this.setState({
              pulldownTip: {
                text: "下拉刷新", // 松开立即刷新
                rotate: "" // icon-rotate
              }
            });
          }, 600);
          console.log("pulldown");
        }
      });
    }

    // 是否派发列表滚动开始的事件
    if (beforeScroll) {
      this.scroll.on("beforeScrollStart", () => {
        console.log("beforeScroll");
      });
    }
  }
  //聊天滚动到底部
  scrollToEnd() {
    let _this = this;
    clearTimeout(_this.Timer);
    this.Timer = setTimeout(() => {
      _this.scroll.scrollTo(0, this.scroll.maxScrollY);
    }, 100);
  }
  disable() {
    // 代理better-scroll的disable方法
    this.scroll && this.scroll.disable();
  }
  enable() {
    // 代理better-scroll的enable方法
    this.scroll && this.scroll.enable();
  }
  refresh() {
    // 代理better-scroll的refresh方法
    this.scroll && this.scroll.refresh();
  }
  scrollTo() {
    // 代理better-scroll的scrollTo方法
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  scrollToElement() {
    // 代理better-scroll的scrollToElement方法
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
  refreshS() {
    // const _this = this;
    // setTimeout(() => {
    //   _this.Scroll.refresh();
    //   console.log(this.Scroll);
    // }, 30);
  }
  render() {
    const { pulldownMsg } = this.state;
    return (
      <Wrapper
        data={this.state.roud}
        ref="scroll_wrapper"
        sHeight={this.props.sHeight}
      >
        <div onClick={this.refreshS} className="childsss">
          <div className="top-tip">
            <span className="refresh-hook">{pulldownMsg}</span>
          </div>
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}

export default ScrollWrapper;
