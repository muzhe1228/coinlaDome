import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LeftWrap from "./components/LeftWrap";
import LeftMenu from "./components/LeftMenu";
import ScrollH from "components/scrollH";
import { Toast } from "antd-mobile";
import LuZi from "./components/LuZi";
import Currently from "./components/Currently";
import ChatMsg from "components/ChatMsg";
import CenterInfo from "./components/CenterInfo";
import YaZhu from "components/YaZhu";
import FengPan from "components/FengPan";
import MsgSlider from "components/MsgSlider";
import Axios from "common/Axios";
import { lStore } from "common";
import ENV from "common/APi";
import Socket from "components/Socket";
import { HxjcWrapper, HxjcLeft, HxjcCenter, HxjcRight } from "./style";
const titleList = ["记录", "路子", "本局", "消息"];
class Hxjc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: null,
      checkNum: [],
      LuZiData: [],
      YZList: [],
      checkYZ: 0,
      BenJuList: [],
      timeSocket: {},
      show: true
    };
    this.handle = this.handle.bind(this);
    this.MenuClick = this.MenuClick.bind(this);
    this.handleNum = this.handleNum.bind(this);
    this.getLuZi = this.getLuZi.bind(this);
    this.getBenJu = this.getBenJu.bind(this);
    this.StatusSocket = this.StatusSocket.bind(this);
    this.BenJSocket = this.BenJSocket.bind(this);
    this.onCloseBtn = this.onCloseBtn.bind(this);
    this.onOkBtn = this.onOkBtn.bind(this);
  }
  clickHandler() {
    this.setState(prevState => {
      console.log(!prevState.show);
      return { show: !prevState.show };
    });
  }

  componentDidMount() {
    this.getYaZhuList();
    this.setState({
      show: false
    });
  }
  StatusSocket(data) {
    if (!data) return;
    console.log(data);
    this.setState({
      timeSocket: data
    });
  }

  BenJSocket(data) {
    if (!data) return;
    this.setState(prevState => {
      let BenJuList = prevState.BenJuList;
      for (let i = 0; i < data.positionType.length; i++) {
        let arr = {
          bets: data.bets,
          nick: data.nick,
          positionType: data.positionType[i]
        };
        BenJuList = [arr, ...BenJuList];
      }
      return { BenJuList };
    });
  }
  //哈希竞猜下注
  onOkBtn() {
    let _this = this;
    let { checkNum } = this.state;
    Axios.ajax(
      {
        url: "/hjs/hashJingcai/saveJingcaiDetail",
        data: {
          params: {
            bets: this.state.checkYZ,
            positionType: checkNum.join(","),
            token: lStore.get("Token")
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        _this.onCloseBtn();
      } else {
        debugger;
        Toast.fail(res.message);
      }
      console.log(res);
    });
  }
  //取消下注
  onCloseBtn() {
    this.setState({
      checkYZ: 0
    });
  }

  // [不加密]查询哈希竞猜路子
  getLuZi() {
    let _this = this;
    Axios.ajax(
      {
        url: "/hjs/hashJingcai/findWay",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: "1"
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        if (res.data) {
          _this.setState(() => ({
            LuZiData: res.data.list
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  //本局
  getBenJu() {
    let _this = this;
    Axios.ajax(
      {
        url: "/hjs/hashJingcai/findCurrent",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: "1",
            pageSize: 20,
            page: 1
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        console.log(res);
        _this.setState({
          BenJuList: res.data.list
        });
      }
    });
  }
  handle(ccry) {
    this.setState(prevState => ({
      checkYZ: ccry
    }));
  }
  handleNum(num) {
    if (typeof num === "number") {
      this.setState(prevState => {
        // debugger
        let checkNum = prevState.checkNum,
          forArr = prevState.checkNum.concat(),
          isD = true;
        for (let i = 0; i < forArr.length; i++) {
          if (forArr[i] === num) {
            checkNum.splice(i, 1);
            isD = false;
            break;
          }
        }
        if (isD) {
          checkNum.push(num);
        }
        return { checkNum };
      });
    }
  }
  // 点击三个按钮
  MenuClick(check) {
    this.setState({
      check
    });
    switch (check) {
      case "路子":
        return this.getLuZi();
      case "本局":
        return this.getBenJu();
      default:
        return;
    }
  }
  // [不加密]查询哈希竞猜可押注金额列表
  getYaZhuList() {
    Axios.ajax(
      {
        url: "/hjs/hashJingcai/findBetsList",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: "1"
          }
        }
      },
      true
    ).then(res => {
      this.setState({
        YZList: res.data
      });
    });
  }
  change(val1, val2) {
    console.log(val1, val2);
  }
  render() {
    const {
      BenJuList,
      check,
      checkNum,
      LuZiData,
      YZList,
      checkYZ,
      timeSocket
    } = this.state;
    return (
      <HxjcWrapper>
        <HxjcLeft Zindex={check}>
          {check ? (
            // <Fragment>
            <LeftMenu
              MenuClick={this.MenuClick}
              titleList={titleList}
              check={check}
            />
          ) : (
            //   <Currently dataList={lRData} />
            // </Fragment>
            <LeftWrap MenuClick={this.MenuClick} titleList={titleList} />
          )}
          {check === "路子" && <LuZi Data={LuZiData} />}
          {check === "本局" && <Currently BenJuList={BenJuList} />}
          {check === "消息" && (
            <ChatMsg
              CW={"3.595506rem"}
              Url={"/hjs/hashJingcai/sendChat"}
              roomId="1"
              roomType="1"
            />
          )}
        </HxjcLeft>
        <HxjcCenter>
          <p className="CenterTop">
            * 任意数字压中赔9倍； 单个数字最大下注额为10ETH。
          </p>
          
          <p className="CentrPei">
            赔率：<span>9</span>
          </p>
          <CenterInfo
            check={checkNum}
            handleNum={this.handleNum}
            isButton={checkYZ && checkNum.length ? true : false}
            onOkBtn={this.onOkBtn}
            onClose={this.onCloseBtn}
            timer={timeSocket}
          />
          <MsgSlider className="HxjcMsg" />
        </HxjcCenter>
        <HxjcRight>
          <YaZhu List={YZList} checkYZ={checkYZ} handleYaZhu={this.handle} />
        </HxjcRight>
        {/* 倒计时 */}
        <Socket
          url={ENV.getENV().socketStatus + "/1/1"}
          onMessage={this.StatusSocket}
        />
        {/* 下注 */}
        <Socket
          url={ENV.getENV().socketBenJ + "/1/1"}
          onMessage={this.BenJSocket}
        />
        {/* {timeSocket.state === 1 ? <FengPan /> : ""} */}
      </HxjcWrapper>
    );
  }
}

const mapDispatch = dispatch => ({
  // setIsShowNav(isShowNav) {
  //   dispatch(leftNavActionCreators.setIsShowNav(!isShowNav));
  // }
});

export default withRouter(
  connect(
    null,
    mapDispatch
  )(Hxjc)
);
