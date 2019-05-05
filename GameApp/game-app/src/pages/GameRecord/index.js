import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { wrapper } from "./style";
import I18n, { I18nFunc } from "components/I18n";
import { Button } from "antd";
import { NavHead, ULDiv } from "./style";
import GameRecordItem from "./components/GameRecordItem";
import Axios from "common/Axios";
import { lStore } from "common";
import ScreeningAlert from "../Alert/ScreeningAlert";
import Select from "components/Select";

class GameRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: "",
      list: [],
      isShowDetails: false,
      selectValue: 0
    };
    this.SelectTitle = this.SelectTitle.bind(this);
    this.getGameRecordList = this.getGameRecordList.bind(this);
  }

  render() {
    const { selectValue } = this.state;
    return (
      <Fragment>
        {/* 游戏记录start */}
        <NavHead>
          <p className={"nave_time"}>时间</p>
          <p className={"nave_more"}>
            {/* <ScreeningAlert
              CloseAlert={this.CloseGameTypeAlert}
              list={["全部", "牛牛", "竞猜", "夺宝"]}
              TypeIndex={GameTypeIndex}
              SelectItemAction={this.SelectGameTypeItemAction}
            /> */}
            <Select
              name="demo"
              value={selectValue}
              onChange={this.SelectTitle}
              placeholder="请输入选项"
              config={{
                options: [
                  {
                    label: "全部",
                    value: 0
                  },
                  {
                    label: "牛牛",
                    value: 1
                  },
                  {
                    label: "竞猜",
                    value: 2
                  },
                  {
                    label: "夺宝",
                    value: 3
                  }
                ]
              }}
            />
          </p>
          {/* <span className={"nave_more"} onClick={this.ClickGameType(0)}>
            更多
          </span> */}
          <p className={"nave_result"}>游戏结果</p>
          <p className={"nave_task_money"}>下注金额</p>
          <p className={"nave_last_money"}>结算金额</p>
        </NavHead>

        <ULDiv>
          {this.state.list.map((item, index) => {
            return (
              <GameRecordItem key={item.gameId} content={item} index={index} />
            );
          })}
        </ULDiv>
        {/* 游戏记录end */}
      </Fragment>
    );
  }

  SelectTitle(name, val, label) {
    this.setState(
      {
        selectValue: val
      },
      () => {
        this.getGameRecordList();
      }
    );
  }

  componentDidMount() {
    this.getGameRecordList();
  }

  getGameRecordList() {
    const { selectValue } = this.state;
    var gameTypeArr = ["", "0", "1", "2"];
    Axios.ajax(
      {
        url: "/hns/niuniu/selectGameRecordList",
        data: {
          params: {
            token: lStore.get("Token"),
            gameType: gameTypeArr[selectValue],
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

export default withRouter(GameRecord);
