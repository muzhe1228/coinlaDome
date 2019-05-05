import React, { Component } from "react";
import I18n from "components/I18n";
import Explain from "components/Models/Explain";
import CenterItem from "./CenterItem";
import {
  SubHeaderWrapper,
  SubLeft,
  SubTitle,
  SubRight,
  HeaderRight
} from "../style.js";
import Deposit from "images/home/deposit.png";
import Logout from "images/home/logout.png";
import PK from "images/home/Pk.png";
class SubHeader extends Component {
  render() {
    const {
      setHeaderInfo,
      pathName,
      allScreen,
      TimeImg,
      title,
      Heig,
      ExplainCheck,
      explainTitle
    } = this.props;
    return (
      <SubHeaderWrapper Heig={Heig}>
        <SubLeft>
        <CenterItem
            imgUrl={PK}
            ClickPK={() => {
              Explain.TopUpAlert({
                title: "充值",
                type: "TopUpAlert",
                style: {
                  height: "4.359551rem",
                  width: "7.370787rem",
                  backgroundColor: "#2e2e33"
                },
                titleStyle: { color: "#e3c877", fontSize: "0.209738rem" },
                scrollH: "6.741573rem"
              });
              // Explain.ExchangeCoin({
              //   title: "兑换PK",
              //   type: "ExchangeCoin",
              //   isButton: 1,
              //   style: {
              //     height: "3.715356rem",
              //     width: "5.782772rem",
              //     backgroundColor: "#2e2e33"
              //   },
              //   titleStyle: { color: "#e3c877", fontSize: "0.209738rem" }
              // });
            }}
          />
        </SubLeft>
        <SubTitle>{title}</SubTitle>
        <SubRight>
          <HeaderRight className="f-r">
            <p>
              <img src={Deposit} alt="充值" />
              <span>
                <I18n message={"Deposit"} />
              </span>
            </p>
            <p
              onClick={() => {
                Explain[ExplainCheck[0]]({
                  title: `游戏规则——${ExplainCheck[1]}`,
                  type: ExplainCheck[0],
                });
              }}
            >
              <img src={Deposit} alt="Explain" />
              <span>
                <I18n message={"Explain"} />
              </span>
            </p>
            <p onClick={setHeaderInfo}>
              <img src={Logout} alt="回到大厅" />
            </p>
          </HeaderRight>
        </SubRight>
      </SubHeaderWrapper>
    );
  }
}

export default SubHeader;
