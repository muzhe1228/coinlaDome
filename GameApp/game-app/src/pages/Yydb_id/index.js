import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProgressD from "components/ProgressD";
import ScrollH from "components/scrollH";
import Socket from "components/Socket";
import ENV from "common/APi";
import Axios from "common/Axios";
import { lStore, timediff, dateFormat0 } from "common";
import { bindMethods } from "common/util";
import { Toast } from "antd-mobile";
import {
  YydbDetails,
  DetailsL,
  DetailsC,
  DetailsR,
  DetailsLTitle,
  DetailsLCenter,
  CenterItem1,
  CenterItem2,
  CenterItem3,
  InputGlup,
  CenterBtn,
  RTtem1,
  RTtem2
} from "./style";

const List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 5, 4, 8];
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      CanYu: {},
      myXZList: {},
      zhuNum: 1,
      time: ""
    };
    this.Timer = null;
    bindMethods(
      [
        "MenuClick",
        "onChangeHandler",
        "getDbCanYu",
        "DbBenJ",
        "DbStatus",
        "add",
        "minus",
        "DbXiaZhu",
        "CloseTime",
        "MyXiaZhu"
      ],
      this
    );
  }

  componentDidMount() {
    const dbId = this.props.match.params.dbId;
    this.getDetails(dbId);
    this.getDbCanYu(dbId);
    this.MyXiaZhu(dbId);
  }
  componentWillUnmount() {
    clearInterval(this.Timer);
  }
  add() {
    this.setState(prevState => ({
      zhuNum: Number(prevState.zhuNum) + 1
    }));
  }
  minus() {
    if (this.state.zhuNum <= 1) {
      Toast.fail("最小为1注", 2);
    } else {
      this.setState(prevState => ({
        zhuNum: Number(prevState.zhuNum) - 1
      }));
    }
  }
  DbBenJ(data) {
    if (data) {
      this.setState(prevState => {
        let CanYu = prevState.CanYu;
        CanYu.list = [data, ...CanYu.list];
        return { CanYu };
      });
    }
  }
  DbStatus(data) {
    console.log(data, "DbStatus");
    if (data) {
      this.setState(prevState => {
        prevState.detail.purchasedNumber = data.purchasedNumber;
        return { detail: prevState.detail };
      });
    }
  }
  MenuClick(check) {
    this.setState({
      check
    });
  }
  //
  getDbCanYu(dbId) {
    Axios.ajax(
      {
        url: "/hds/hashDuobao/findCurrentDetailList",
        data: {
          params: {
            dbId: dbId,
            page: 1,
            pageSize: 20,
            token: lStore.get("Token")
          }
        }
      },
      true
    ).then(res => {
      if (res.code === 0) {
        this.setState({
          CanYu: res.data
        });
      }
    });
  }
  //夺宝下注
  DbXiaZhu(item) {
    const { zhuNum } = this.state;
    const { perBets, dbId } = item;
    Axios.ajax(
      {
        url: "/hds/hashDuobao/saveDuobaoDetail",
        data: {
          params: {
            bets: perBets * zhuNum,
            dbId: dbId,
            token: lStore.get("Token")
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          Toast.success("购买成功", 2);
          this.setState({
            zhuNum: 1
          });
          this.MyXiaZhu(dbId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  CloseTime(endTime) {
    this.Timer = setInterval(() => {
      this.setState({
        time: timediff(endTime)
      });
    }, 1000);
  }
  //我的下注
  MyXiaZhu(dbId) {
    Axios.ajax(
      {
        url: "/hds/hashDuobao/findMyDetailList",
        data: {
          params: {
            dbId: dbId,
            page: 1,
            pageSize: 20,
            token: lStore.get("Token")
          }
        }
      },
      true
    ).then(res => {
      console.log(res);
      this.setState({
        myXZList: res.data
      });
    });
  }
  render() {
    const { match } = this.props;
    const { detail, CanYu, zhuNum, time, myXZList } = this.state;
    return (
      <YydbDetails>
        <DetailsL>
          <p className="title">本期参与</p>
          <ScrollH>
            <ul>
              {CanYu.total > 0 &&
                CanYu.list.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item.nick}</p>
                      <p>
                        {item.startNo === item.endNo
                          ? item.startNo
                          : item.startNo + "~" + item.endNo}
                        号
                      </p>
                    </li>
                  );
                })}
            </ul>
          </ScrollH>
        </DetailsL>
        <DetailsC>
          <DetailsLTitle>
            <p className="title_l">{detail.rewardDesc}</p>
            <p className="title_r">NO.{detail.dbId}</p>
          </DetailsLTitle>
          <DetailsLCenter>
            <CenterItem1>
              <img src={detail.logo} alt="" />
              {/* <img src={Img1} alt="" /> */}
              {/* <p>总量：{detail.totalNumber}</p> */}
              <p>{detail.perBets}PK即可购买一注，10个ETH中奖自动发送账户</p>
            </CenterItem1>
            <CenterItem2>
              <ProgressD
                styles={{
                  width:
                    (detail.purchasedNumber / detail.totalNumber) * 100 + "%",
                  backgroundColor: "#e3c877"
                }}
              />
              <p className="intorP">
                <span>
                  <a>总：</a>
                  {detail.totalNumber}
                </span>
                <span>
                  <a>剩余：</a>
                  {detail.totalNumber - detail.purchasedNumber}
                </span>
              </p>
            </CenterItem2>
            <CenterItem3>
              <InputGlup>
                <p onClick={this.minus}>
                  <i className="iconfont">&#xe618;</i>
                </p>
                <input
                  type="text"
                  value={zhuNum}
                  onChange={this.onChangeHandler}
                />
                <p onClick={this.add}>
                  <i className="iconfont">&#xe693;</i>
                </p>
              </InputGlup>
              <p className="exchange">= {zhuNum * detail.perBets}PK</p>
            </CenterItem3>
            <CenterBtn
              className="active"
              onClick={() => {
                this.DbXiaZhu(detail);
              }}
            >
              确定 <span>{time}</span>
            </CenterBtn>
          </DetailsLCenter>
        </DetailsC>
        <DetailsR>
          <RTtem1>
            <p className="title">奖品价值</p>
            <p className="introPk">{detail.totalNumber * detail.perBets}PK</p>
            <p className="introEth">≈ {detail.reward}</p>
            <p className="intro">
              {/* ETH市值第二大币种；项目最多 的智能合约平台；数字货币
              区块链上最成熟的操作系统； 显卡挖矿首选币种 */}
              {detail.rewardIntro}
            </p>
          </RTtem1>

          <RTtem2>
            <p className="title">您的购买</p>
            <ScrollH sHeight="calc(100% - 0.479401rem)" pullup>
              <ul>
                {myXZList.total ? (
                  myXZList.list.map((item, index) => {
                    return (
                      <li key={index}>
                        <p>
                          {item.startNo === item.endNo
                            ? item.startNo
                            : item.startNo + "~" + item.endNo}
                          号
                        </p>
                        <p>{item.lockBets}PK</p>
                        <p>{dateFormat0(item.createDate)}</p>
                      </li>
                    );
                  })
                ) : (
                  <p className="notData">当前未参与</p>
                )}
              </ul>
            </ScrollH>
          </RTtem2>
        </DetailsR>
        {detail.dbId && (
          <Fragment>
            <Socket
              url={ENV.getENV().socketBenJ + "/3/" + detail.dbId}
              onMessage={this.DbBenJ}
            />
            <Socket
              url={ENV.getENV().socketDuoBaoDetails + "/" + detail.dbId}
              onMessage={this.DbStatus}
            />
          </Fragment>
        )}
      </YydbDetails>
    );
  }

  getDetails(dbId) {
    const { match } = this.props;
    Axios.ajax(
      {
        url: "/hds/hashDuobao/findDuobao",
        data: {
          params: {
            token: lStore.get("Token"),
            dbId: "1",
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
            detail: res.data
          });
          this.Timer = setInterval(() => {
            this.setState({
              time: timediff(res.data.endTime)
            });
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectColor(num) {
    if (num === 0) {
      return "transparent";
    } else if (num > 30) {
      return "#d7c142";
    } else {
      return "#e3c877";
    }
  }

  onChangeHandler(e) {
    let obj = e.target,
      reg = /^[1-9][0-9]?/g,
      isTrue = reg.test(obj.value);
    if (!isTrue) {
      console.log(obj.value);
      if (obj.value && obj.value !== 0) {
        Toast.fail("请输入非零正整数!");
      }
    }
    obj.value = obj.value.replace(/[^\d]$/g, "").replace(/^[^1-9]/, "");

    this.setState(() => ({
      zhuNum: obj.value
    }));
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
  )(Details)
);
