import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import CItem from "./components/CItem";
import Axios from "common/Axios";
import { lStore } from "common";
import Socket from "components/Socket";
import ENV from "common/APi";
import { bindMethods } from "common/util";
import {
  BullWrapper,
  BullLeft,
  BullRight,
  BullCentter,
  BullFooter
} from "./style";
class BullFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShiBeidataArray: [],
      PingBeidataArray: []
    };
    bindMethods(
      [
        "toDetails",
        "RequestShiBeiRoomData",
        "RequestPingBeiRoomData",
        "QuicklyStartGame",
        "NiuRenSocket"
      ],
      this
    );
  }
  toDetails(roomId) {
    this.props.history.push("/bull_fight/" + roomId);
  }
  NiuRenSocket(data) {
    const { ShiBeidataArray, PingBeidataArray } = this.state;
    if (!data) return;
    for (let i = 0; i < ShiBeidataArray.length; i++) {
      if (ShiBeidataArray[i].roomId == data.roomId) {
        ShiBeidataArray[i].roomStatus = data.roomStatus;
        ShiBeidataArray[i].peopleNumber = data.peopleNumber;
        this.setState({
          ShiBeidataArray
        });
        return;
      }
    }
    for (let i = 0; i < PingBeidataArray.length; i++) {
      if (PingBeidataArray[i].roomId == data.roomId) {
        PingBeidataArray[i].roomStatus = data.roomStatus;
        PingBeidataArray[i].peopleNumber = data.peopleNumber;
        this.setState({
          PingBeidataArray
        });
        return;
      }
    }
  }
  render() {
    const colorObj = {
      bgColor: "#2b292f",
      subBgColor: "#212126",
      color: "#d7c142"
    };
    const { ShiBeidataArray, PingBeidataArray } = this.state;
    return (
      <BullWrapper>
        <BullLeft>
          <LeftNav text="十倍牛牛" />
          <BullCentter>
            {ShiBeidataArray.map((item, index) => {
              return (
                <CItem
                  className="Item"
                  toDetails={this.toDetails}
                  item={item}
                  key={item.roomId}
                />
              );
            })}
          </BullCentter>
        </BullLeft>
        <BullRight>
          <LeftNav text="平倍牛牛" />
          <BullCentter>
            {PingBeidataArray.map((item, index) => {
              return (
                <CItem
                  allColor={colorObj}
                  className="Item"
                  toDetails={this.toDetails}
                  item={item}
                  key={item.roomId}
                />
              );
            })}
          </BullCentter>
        </BullRight>
        <BullFooter>
          <p className="footerL">
            <i className="iconfont">&#xe601;</i>
            <span>
              恭喜<a>【自来水厂厂长Harry】</a>获得<a> 500 </a>ETH。
            </span>
          </p>
          <p className="footerBtn animated" onClick={this.QuicklyStartGame}>
            快速开始
          </p>
        </BullFooter>
        {ShiBeidataArray.length && PingBeidataArray.length && (
          <Socket
            url={ENV.getENV().socketNiunRen}
            onMessage={this.NiuRenSocket}
          />
        )}
      </BullWrapper>
    );
  }

  componentDidMount() {
    this.RequestShiBeiRoomData();
    this.RequestPingBeiRoomData();
  }

  //获取十倍牛牛房间列表
  RequestShiBeiRoomData() {
    Axios.ajax(
      {
        url: "/hns/niuniu/selectTenMultipleRoomList",
        data: {
          params: {}
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          this.setState({
            ShiBeidataArray: res.data.list
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  //获取平倍牛牛房间列表
  RequestPingBeiRoomData() {
    Axios.ajax(
      {
        url: "/hns/niuniu/selectFlatMultipleRoomList",
        data: {
          params: {}
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          this.setState({
            PingBeidataArray: res.data.list
          });
          console.log(res.data, "tetst");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //快速开始
  QuicklyStartGame() {
    Axios.ajax(
      {
        url: "/hns/niuniu/selectRoom",
        data: {
          params: {
            token: lStore.get("Token"),
            currencyType: 0
          }
        }
      },
      true
    )
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          this.toDetails(res.data.roomId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default withRouter(BullFight);
