import styled from "styled-components";
import { red, green } from "ansi-colors";

const superCss = styled.div`
  &:nth-child(2n) {
    background-color: rgba(43, 41, 47, 0.3);
  }
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  text-align: center;
  display: flex;
  min-height: 0.426667rem;
  align-items: center;
  justify-content: space-between;
  .payments_time {
    margin-left: 0.186667rem;
    width: 1.053183rem;
    text-align: left;
  }

  .payments_payType {
    width:0.749064rem;
    text-align: center;
    color: ${props => {
      if (props.iaeTypeCode === 0) {
        return "#1dbc8c";
      } else if (props.iaeTypeCode === 1) {
        return "#d62327";
      } else {
        return "#e3c877";
      }
    }};
  }

  .payments_from {
    width:0.749064rem;
    text-align: center;
    width:0.749064rem;
  }

  .payments_detail {
    text-align: left;
    width: 2.400001rem;
    margin: 0.16rem 0;
  }

  .payments_count {
    margin-right: 1.066667rem;
    width: 0.6rem;
    text-align: left;
  }

  .payments_state {
    margin-right: 0.266667rem;
    width: 0.758052rem;
    text-align: right;
  }
`;

export const PaymentsHead = styled(superCss)`
  font-family: PingFang-SC-Medium;
  background: rgba(43, 41, 47, 0.7);
  font-size: 0.186667rem;
  color: #e3c877;
  display: flex;
  align-items: center;
  height: 10%;
  .payments_payType_title,
  .payments_from_title {
    display: flex;
    align-items: center;
    height:100%;
    width:0.749064rem;
    position: relative;
    text-align:center;
    justify-content:center;
    padding-left:0;
    i {
      position: absolute;
      padding-left:0.074906rem;
      font-size: 0.106667rem;
      left:70%;
    }
  }
`;

export const PaymentsFoot = styled(superCss)`
  font-family: DINPro-Medium;
  font-size: 0.209738rem;
  display: flex;
  align-items: center;
  font-size: 0.209738rem;
  color: #aaaaaa;
  border-top: 0.014981rem rgba(43, 41, 47, 0.7) solid;
  height: 10%;
  .totalTitle {
    margin-left: 0.186667rem;
  }

  .totalValue {
    color: #e3c877;
    margin-right: 0.266667rem;
  }
`;
export const ULDiv = styled.ul`
  overflow: auto;
  height: 80%;
`;

export const PaymentsItemDiv = styled(superCss)`
  display: flex;
  align-items: center;
  font-size: 0.186667rem;
  min-height: 0.533333rem;
  color: #eeeeee;
`;
