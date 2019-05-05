import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LeftWrap from "./components/LeftWrap";
import LeftMenu from "./components/LeftMenu";
import SizeItem from "./components/SizeItem";
import LuZi from "./components/LuZi";
import Currently from "./components/Currently";
import ChatMsg from "components/ChatMsg";
import ConfirmYZ from "components/ConfirmYZ";
import FengPan from "components/FengPan";
import HxNiuJZ from "./components/HxNiuJZ";
import YaZhu from "components/YaZhu";
import Axios from "common/Axios";
import Socket from "components/Socket";
import { Toast } from "antd-mobile";
import { lStore } from "common";
import { bindMethods } from "common/util";
import ENV from "common/APi";
import {
  HxNiuWrapper,
  HxNiuLeft,
  HxNiuCenter,
  HxNiuRight,
  CenterTop,
  CenterInfo,
  CenterBot,
  CenterTL,
  CenterTC,
  CenterTR,
  NiuRightNav,
  CenterButton
} from "./style";
import A5 from "images/test/a5.jpg";
import A6 from "images/test/a2.jpg";
import A3 from "images/test/a3.jpg";
import A4 from "images/test/a4.jpg";
const titleList = ["路子", "本局", "消息"];

class HxNiu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: null,
      navTitle: "押注",
      hashBlock: "",
      YZList: [],
      checkYZ: 0,
      checkMen: 0,
      LuziData: [],
      BankData: null,
      CurrentlyList: [],
      TianData: null,
      DiData: null,
      XuanData: null,
      ZhuangData: null,
      //竞庄列表数据
      JzData: {
        jzState: 0,
        arrData: []
      },
      totalMoneyData: 0
    };
    bindMethods(
      [
        "MenuClick",
        "handle",
        "handleYaZhu",
        "RightNav",
        "onCloseBtn",
        "onOkBtn",
        "getLocation",
        "checkNui",
        "handleJzClick",
        "JZSocket",
        "BenJSocket",
        "LocationSocket",
        "BlockSocket",
        "BankSocket"
      ],
      this
    );
  }
  //选择牛 （天：1，地：2，玄：3）
  checkNui(checkMen) {
    this.setState({
      checkMen
    });
  }
  //哈希区块
  BlockSocket(data) {
    this.setState({
      hashBlock: data.blockId
    });
  }
  //庄家信息
  BankSocket(data) {
    console.log(data);
    this.setState({
      BankData: data
    });
  }
  //各个位置的下注金额Socket
  LocationSocket(data) {
    console.log(data, "LocationSocket");
    if (data.positionType == "3") {
      this.setState({ XuanData: data });
    } else if (data.positionType == "2") {
      this.setState({ DiData: data });
    } else if (data.positionType == "1") {
      this.setState({ TianData: data });
    } else if (data.positionType === "0") {
    }
  }
  //哈希竞猜下注
  onOkBtn() {
    // this.onCloseBtn();
    const { checkYZ, checkMen } = this.state;
    Axios.ajax(
      {
        url: "/hns/niuniu/bottomPour",
        data: {
          params: {
            currencyNumber: checkYZ,
            positionId: checkMen,
            roomId: this.props.match.params.roomId,
            token: lStore.get("Token")
          }
        }
      },
      true
    ).then(res => {
      if (res.success) {
        Toast.success("下注成功", 1);
        this.setState({
          checkYZ: 0,
          checkMen: 0
        });
      }
    });
  }
  //取消下注
  onCloseBtn() {
    this.setState({
      checkYZ: 0
    });
  }
  handle() {
    this.setState({
      check: null
    });
  }
  handleYaZhu(ccry) {
    this.setState(prevState => ({
      checkYZ: ccry
    }));
  }
  RightNav(navTitle) {
    this.setState({
      navTitle
    });
    if (navTitle === "竞庄") {
      this.getJzData();
      this.checkJzState();
    }
  }
  MenuClick(check) {
    this.setState({
      check
    });
    switch (check) {
      case "路子":
        return this.getLuziList();
      case "本局":
        return this.getTotalMoney();
      default:
        return;
    }
  }
  // 查询哈希竞猜可押注金额列表
  getYaZhuList() {
    Axios.ajax(
      {
        url: "/hns/niuniu/findBetsList",
        data: {
          params: {
            roomId: this.props.match.params.roomId
          }
        }
      },
      true
    ).then(res => {
      console.log(res);
      this.setState({
        YZList: res.data
      });
    });
  }
  // 【未加密】查询四个位置
  getLocation() {
    Axios.ajax(
      {
        url: "/hns/niuniu/selectRoomByRoomId",
        data: {
          params: {
            roomId: this.props.match.params.roomId
          }
        }
      },
      true
    ).then(res => {
      if (res.success) {
        let Data = res.data;
        for (let i = 0; i < Data.length; i++) {
          if (Data[i].positionType === 3) {
            this.setState({
              XuanData: Data[i]
            });
          }
          if (Data[i].positionType === 2) {
            this.setState({
              DiData: Data[i]
            });
          }
          if (Data[i].positionType === 1) {
            this.setState({
              TianData: Data[i]
            });
          }
        }
      }
    });
  }

  componentDidMount() {
    this.getYaZhuList();
    this.getLocation();
  }
  //获取路子列表
  getLuziList() {
    Axios.ajax(
      {
        url: "/hns/niuniu/findWay",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: this.props.match.params.roomId,
            page: 1,
            size: 20
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data.list, "路子");
          this.setState({
            LuziData: res.data.list
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //获取本局列表
  getCurrentList() {
    const roomId = this.props.match.params.roomId;
    Axios.ajax(
      {
        url: "/hns/niuniu/findCurrent",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: roomId
            // page: 1,
            // pageSize: 20
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data, "本局");
          this.setState({ CurrentlyList: res.data.list });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //本局socket
  BenJSocket(data) {
    console.log(data);

    this.setState(prevState => {
      let CurrentlyList = prevState.CurrentlyList;

      CurrentlyList = [data, ...CurrentlyList];

      return { CurrentlyList };
    });
  }

  //获取本局总金额
  getTotalMoney() {
    const roomId = this.props.match.params.roomId;
    this.getCurrentList();
    Axios.ajax(
      {
        url: "/hns/niuniu/findCurrentTotal",
        data: {
          params: {
            token: lStore.get("Token"),
            roomId: roomId
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            totalMoneyData: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  //获取竞庄结果
  getJzData() {
    const roomId = this.props.match.params.roomId;
    Axios.ajax(
      {
        url: "/hns/niuniu/selectContendBankerList",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: "0",
            roomId: roomId
            // page: 1,
            // size: 20
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res);
          this.setState(prevState => {
            let JzData = prevState.JzData;
            JzData.arrData = res.data.list;
            return JzData;
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //查询是否竞庄
  checkJzState() {
    const roomId = this.props.match.params.roomId;
    Axios.ajax(
      {
        url: "/hns/niuniu/selectContendBankerByUser",
        data: {
          params: {
            token: lStore.get("Token"),
            // currencyType: "0",
            roomId: roomId
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        this.setState(prevState => {
          let JzData = prevState.JzData;
          JzData.jzState = res.data ? 1 : 0;
          return JzData;
        });
      } else {
        Toast.fail(res.message);
      }
      console.log(res);
    });
  }

  handleJzClick(obj) {
    const { JzData } = this.state;
    JzData.jzState === 0 ? this.jzRequest(obj) : this.jzCancelRequest();
  }

  //竞庄
  jzRequest(obj) {
    const roomId = this.props.match.params.roomId;
    Axios.ajax(
      {
        url: "/hns/niuniu/contendBanker",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: 0,
            roomId: roomId,
            number: obj.number
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        // this.onCloseBtn();
      } else {
        Toast.fail(res.message);
      }
      console.log(res);
    });
  }

  //取消竞庄
  jzCancelRequest() {
    const roomId = this.props.match.params.roomId;
    Axios.ajax(
      {
        url: "/hns/niuniu/cancelContendBanker",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: "0",
            roomId: roomId
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        // this.onCloseBtn();
      } else {
        Toast.fail(res.message);
      }
      console.log(res);
    });
  }

  render() {
    const {
      hashBlock,
      totalMoneyData,
      CurrentlyList,
      check,
      navTitle,
      LuziData,
      JzData,
      YZList,
      checkYZ,
      checkMen,
      TianData,
      DiData,
      XuanData,
      BankData
    } = this.state;
    const { match } = this.props;
    const roomId = match.params.roomId;
    return (
      <HxNiuWrapper>
        <HxNiuLeft Zindex={check}>
          {check ? (
            // <Fragment>
            <LeftMenu
              MenuClick={this.MenuClick}
              titleList={titleList}
              check={check}
            />
          ) : (
            <LeftWrap MenuClick={this.MenuClick} titleList={titleList} />
          )}
          {check === "路子" && <LuZi Data={LuziData} />}
          {check === "本局" && (
            <Currently
              moneyData={totalMoneyData}
              CurrentlyData={CurrentlyList}
            />
          )}
          {check === "消息" && (
            <ChatMsg
              Url={"/hns/niuniu/sendChat"}
              roomId={match.params.roomId}
              roomType="0"
            />
          )}
        </HxNiuLeft>
        <HxNiuCenter onClick={this.handle}>
          <CenterTop>
            <CenterTL>
              <p>当前Hash区块</p>
              <p>{hashBlock}</p>
            </CenterTL>
            <CenterTC>
              <SizeItem
                title={"庄"}
                Bg={true}
                info={true}
                Avatart={A6}
                BankData={BankData}
              />
            </CenterTC>
            <CenterTR>* 牛几即几倍，最高十倍</CenterTR>
          </CenterTop>
          <CenterInfo>
            <SizeItem
              onClick={() => {
                this.checkNui(2);
              }}
              title={"地"}
              center={"center"}
              Avatart={A3}
              Data={DiData}
            />
            {/* <SizeInfo title={"NO.3344556"} /> */}
            <FengPan params={"/0/" + roomId} />
            <SizeItem
              onClick={() => {
                this.checkNui(3);
              }}
              title={"玄"}
              center={"center"}
              Avatart={A4}
              Data={XuanData}
            />
          </CenterInfo>
          <CenterBot>
            <SizeItem
              onClick={() => {
                this.checkNui(1);
              }}
              title={"天"}
              Avatart={A5}
              Data={TianData}
            />
          </CenterBot>
        </HxNiuCenter>
        <HxNiuRight Nav={navTitle}>
          <NiuRightNav>
            <p
              className={navTitle === "押注" ? "" : "active"}
              onClick={() => {
                this.RightNav("押注");
              }}
            >
              押注
            </p>
            <p
              className={navTitle === "竞庄" ? "" : "active"}
              onClick={() => {
                this.RightNav("竞庄");
              }}
            >
              竞庄
            </p>
          </NiuRightNav>
          {/* <ScrollH sHeight="calc(100% - 0.359551rem)"> */}
          {navTitle === "押注" ? (
            <YaZhu
              List={YZList}
              checkYZ={checkYZ}
              handleYaZhu={this.handleYaZhu}
              sHeight="calc(100% - 0.359551rem)"
            />
          ) : (
            <HxNiuJZ handleJzClick={this.handleJzClick} JzData={JzData} />
          )}
          {/* 竞庄socket */}
          <Socket
            url={ENV.getENV().socketJZ + "/" + roomId}
            onMessage={this.JZSocket}
          />
          {/* 庄家信息 */}
          <Socket
            url={ENV.getENV().socketBank + "/" + roomId}
            onMessage={this.BankSocket}
          />
          <Socket
            url={ENV.getENV().socketBenJ + "/0/" + roomId}
            onMessage={this.BenJSocket}
          />
          <Socket
            url={ENV.getENV().socketLocation + "/0/" + roomId}
            onMessage={this.LocationSocket}
          />
          {/* 区块 HASH */}
          <Socket url={ENV.getENV().socketBlock} onMessage={this.BlockSocket} />
          {/* </ScrollH> */}
        </HxNiuRight>
        {checkYZ && checkMen ? (
          <ConfirmYZ
            onOkBtn={this.onOkBtn}
            onCloseBtn={this.onCloseBtn}
            checkMen={checkMen}
            checkYZ={checkYZ}
          />
        ) : (
          ""
        )}
      </HxNiuWrapper>
    );
  }

  JZSocket(data) {
    const userInfo = lStore.get("userInfo");
    if (!data) return;
    console.log(data);
    this.setState(prevState => {
      let JzData = prevState.JzData;
      if (data.type === "1") {
        JzData.jzState = userInfo.userId == data.userId ? 0 : 1;
        this.getIndex(JzData.arrData, data.userId).map(item => {
          console.log(item);
          JzData.arrData.splice(item, 1);
        });
        return JzData;
      } else {
        JzData.jzState = userInfo.userId == data.userId ? 1 : 0;
        let arr = {
          currencyNumber: data.currencyNumber,
          currencyType: data.currencyType,
          userId: data.userId,
          nick: data.nick,
          type: data.type
        };
        JzData.arrData = [arr, ...JzData.arrData].sort(this.jzDataSort("currencyNumber"));
        return JzData;
      }
    });
  }

  getIndex(arrData, resUserId) {
    const resultArr = [];
    arrData.map((item, index) => {
      if (item.userId == resUserId) {
        resultArr.push(index);
      }
    });
    console.log(resultArr);
    return resultArr;
  }

  jzDataSort (keyName) {
    return function(objectN, objectM) {
      var valueN = objectN[keyName];
      var valueM = objectM[keyName];
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    };
  };
}

const mapDispatch = dispatch => ({
  // setLottery(Lottery) {
  //   dispatch(leftNavActionCreators.setIsShowNav(!isShowNav));
  // }
});

export default withRouter(
  connect(
    null,
    mapDispatch
  )(HxNiu)
);
