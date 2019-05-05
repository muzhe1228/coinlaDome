import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import CItem from "./components/CItem";
import LeftMenu from "../Hxjc/components/LeftMenu";
import LeftWrap from "../Hxjc/components/LeftWrap";
import LuZi from "../Hxjc/components/LuZi";
import ScrollH from "components/scrollH";
import { BullWrapper, BullCentter, BullFooter,HxNiuLeft } from "./style";
import Axios from "common/Axios";
import { lStore } from "common";
import ChatMsg from "components/ChatMsg";
import MsgSlider from "components/MsgSlider";
const titleList = ["路子", "消息"];

class BullFight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      check: null,
      LuziData: []
    };
    this.MenuClick = this.MenuClick.bind(this);
    this.toDetails = this.toDetails.bind(this);
    this.getLuZi = this.getLuZi.bind(this);
  }

  componentDidMount() {
    this.getBaoList();
  }

  MenuClick(check) {
    this.setState({
      check
    });
    switch (check) {
      case "路子":
        return this.getLuZi();
      default:
        return;
    }
  }
  //获取路子列表
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
  toDetails(obj) {
    this.props.history.push({
      pathname: "/yydb/" + obj.period,
      state: obj.dbId
    });
  }

  render() {
    const colorObj = {
      bgColor: "#2b292f",
      subBgColor: "#212126",
      color: "#d7c142"
    };
    const { list, check, LuziData } = this.state;
    return (
      <BullWrapper>
        <HxNiuLeft Zindex={check}>
          {check ? (
            // <Fragment>
            <LeftMenu
              MenuClick={this.MenuClick}
              titleList={titleList}
              check={check}
            />
          ) : (
            <LeftWrap
              MenuClick={this.MenuClick}
              titleList={titleList}
              Center={"right"}
            />
          )}
          {check === "路子" && <LuZi Data={LuziData} />}
          {check === "消息" && (
          <ChatMsg Url={"/hds/hashDuobao/sendChat"} roomId="0" roomType="3" />
        )}
        </HxNiuLeft>

        {/* {check === "路子" && <LuZi Data={LuziData} />} */}
        
        <ScrollH sHeight={"calc(100% - 0.719101rem)"}>
          <BullCentter>
            {list.map(item => {
              return (
                <CItem key={item} PWidth={item} toDetails={this.toDetails} />
              );
            })}
          </BullCentter>
        </ScrollH>
        <BullFooter>
          <p className="footerL" />
          <div className="footerR">
            <MsgSlider />
          </div>
        </BullFooter>
      </BullWrapper>
    );
  }

  //获取列表
  getBaoList() {
    Axios.ajax(
      {
        url: "/hds/hashDuobao/findDuobaoList",
        data: {
          params: {
            token: lStore.get("Token"),
            page: 1,
            size: 20
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.setState({
            list: res.data.list
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default withRouter(BullFight);
