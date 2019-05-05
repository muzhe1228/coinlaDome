import React, { Component, Fragment } from "react";
import { wrapper, PaymentsHead, PaymentsFoot, ULDiv } from "./style";
import PaymentsItem from "./PaymentsItem";
import { withRouter } from "react-router-dom";
import ScrollH from "components/scrollH";
import Axios from "common/Axios";
import { lStore } from "common";
import ScreeningAlert from "../Alert/ScreeningAlert";
import Select from "components/Select";
import { connect } from "react-redux";
//收支明细

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      PayTypeIndex: 0,
      GameTypeIndex: 0,
      page:1,
      pageSize:20
    };
    this.SelectPayTypeItemAction = this.SelectPayTypeItemAction.bind(this);
    this.SelectGameTypeItemAction = this.SelectGameTypeItemAction.bind(this);
    this.LoadData = this.LoadData.bind(this);
    this.LoadMore = this.LoadMore.bind(this);
    this.NextPage = this.NextPage.bind(this);
  }

  render() {
    const {
      showGameTypeScreening,
      PayTypeIndex,
      GameTypeIndex
    } = this.state;
    const {PKData} = this.props;
    return (
      <Fragment>
        <PaymentsHead>
          <span className={"payments_time"}>时间</span>
          <p className={"payments_payType_title"}>
            <Select
              name="payType"
              value={PayTypeIndex}
              onChange={this.SelectPayTypeItemAction}
              placeholder="请输入选项"
              config={{
                options: [
                  {
                    label: "全部",
                    value: 0
                  },
                  {
                    label: "收入",
                    value: 1
                  },
                  {
                    label: "支出",
                    value: 2
                  }
                ]
              }}
            />
          </p>

          <p className={"payments_from_title"}>
            <Select
              name="payType"
              value={GameTypeIndex}
              onChange={this.SelectGameTypeItemAction}
              placeholder="请输入选项"
              config={{
                options: [
                  {
                    label: "全部",
                    value: 0
                  },
                  {
                    label: "游戏",
                    value: 1
                  },
                  {
                    label: "交易",
                    value: 2
                  },
                  {
                    label: "充值",
                    value: 3
                  },
                  {
                    label: "提现",
                    value: 4
                  },
                  {
                    label: "任务",
                    value: 5
                  },
                  {
                    label: "返佣",
                    value: 6
                  },
                  {
                    label: "分红",
                    value: 7
                  }
                ]
              }}
            />
          </p>

          <span className={"payments_detail"}>详情</span>
          <span className={"payments_count"}>数量</span>
          <span className={"payments_state"}>状态</span>
        </PaymentsHead>
        <ScrollH sHeight="calc(100% - 20%)" pullup={this.NextPage}>
          <ULDiv>
            {this.state.dataArray.map((item, index) => {
              return <PaymentsItem key={index} content={item} index={index} />;
            })}
          </ULDiv>
        </ScrollH>

        <PaymentsFoot>
          <span className={"totalTitle"}>合计</span>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <span className={"totalValue"}>{PKData.balance+'PK'}</span>
        </PaymentsFoot>
      </Fragment>
    );
  }

  componentDidMount() {
    this.LoadData();
  }

  SelectPayTypeItemAction(name, value, label) {
    this.setState({
      PayTypeIndex: value,
      page:1,
      dataArray:[]
    },()=>{
      this.LoadData();
      });
  }

  SelectGameTypeItemAction(name, value, label) {
    this.setState({
      GameTypeIndex: value,
      page:1,
      dataArray:[]
    },()=>{
      this.LoadData();
      });
  }

  //上拉加载
  LoadMore() {
    console.log("底部");
  }

  NextPage(){
    this.LoadData();
  }

  //加载数据
  LoadData() {
    const { page, pageSize, PayTypeIndex, GameTypeIndex,dataArray } = this.state;
    var iaeType = ["", "0", "1"];
    var bizType = ["", "0", "1", "2", "3", "4", "5", "6"];
    Axios.ajax(
      {
        url: "/uas/userAssets/selectIncomeExpensesList",
        data: {
          params: {
            token: lStore.get("Token"),
            bizType: bizType[GameTypeIndex],
            currencyType: "",
            iaeType: iaeType[PayTypeIndex],
            page: page,
            size: pageSize
          }
        }
      },
      true
    )
      .then(res => {
        if (res.code === 0) {
          console.log(res.data);
          if(res.data.list.length > 0){
            this.setState({
              dataArray: dataArray.concat(res.data.list),
              page:page+1
            },()=>{
              console.log('第'+page+'页')
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const mapState = state => ({
  PKData: state.getIn(["header", "PKData"])
});

export default connect(
  mapState,
  null
)(Payments);