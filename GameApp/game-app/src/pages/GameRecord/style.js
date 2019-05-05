import styled from "styled-components";

const superCss = styled.div`
&:nth-child(2n) {
    background-color: rgba(43, 41, 47, 0.3);
  }
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  text-align: center;
  display: flex;
  height: 0.426667rem;
  align-items: center;
  padding: 0 20px;
  /* width:100%; */
  .nave_time {
    /* margin-left: 0.186667rem; */
    width: 20%;
    text-align: left;
  }


  .nave_more {
    display: flex;
    align-items: center;
    height:100%;
    width:12%;
    position: relative;
    text-align:left;
    justify-content:center;
    padding: 0 10px;
    .title{
      font-size: 0.149813rem;
    }
  }

  .nave_result {
    /* margin-right: 0.4rem; */
    width: 38%;
    text-align: left;
    padding-left: 0.133333rem;
  }

  .nave_task_money {
    text-align: left;
    width: 20%;
  }

  .nave_last_money {
    /* margin-right: 1.066667rem; */
    width: 10%;
    text-align: left;
  }
`;

export const NavHead = styled(superCss)`
  font-family: PingFang-SC-Medium;
  background: rgba(43, 41, 47, 0.7);
  font-size: 0.16rem;
  color: #e3c877;
  display: flex;
  align-items: center;
  height: 10%;
`;

export const ULDiv = styled.ul`
  /* overflow: auto; */
  height: 90%;
`;

export const GameRecordItemDiv = styled(superCss)`
  display: flex;
  align-items: center;
  font-size: 0.16rem;
  height: 0.533333rem;
  color: #eeeeee;
  text-align: left;
  .time {
    width: 20%;
  }
  .gameType {
    width: 12%;
    text-align: center;
  }
  .gameResult {
    width: 38%;
    padding-left: 0.133333rem;
  }
  .lastMoney {
    width: 20%;
    color: #e3c877;
  }
  .resultMoney {
    color: ${
      props => (props.gameState.code === 1 ? "#dedede" : (props.resultBets < 0 ? "#f93434" : "#51a460"))
      };
    text-decoration: ${
      props => ((props.gameState.code === 1 && props.stateStr === "去查看") ? "underline" : "none")
    };
    width: 10%;
  }
`;
// 竞猜结果
export const ChildItemCaiDiv = styled(superCss)`
  display: flex;
  align-items: center;
  font-size: 0.16rem;
  height: 0.453333rem;
  color: #aaaaaa;
  text-align: left;
  background: #2d2c32;
  .child_item_cai_result {
    width: 20%;
  }
  .child_item_cai_content {
    width: 70%;
    overflow:hidden;
  }
  .child_item_cai_close {
    width: 10%;
    text-decoration: 1px red solid;
  }
`;

//牛牛结果
export const ChildItemNiuDiv = styled(superCss)`
  display: flex;
  align-items: center;
  font-size: 0.16rem;
  height: 0.746667rem;
  color: #aaaaaa;
  background: #2d2c32;
  text-align: left;
  .child_item_niu_left_div {
    width: 90%;
    height: 100%;
    padding-right: 0.266667rem;
  }

.child_item_niu_hash {
  align-items: center;
  display: flex;
  height: 50%;
  width: 100%;
  padding-top: 10px;
}

.niu_hash {
  width: 30%;
}
.niu_hash_value {
  width: 80%;
  justify-content: space-between;
  display: flex; 
}

.card0{
  color: #51a460;
}
.card1{
  color: #ddc594;
}
.card2{
  color: #347dc0;
}
.card3{
  color: #8b78c6;
}

.child_item_niu_result {
  align-items: center;
  display: flex;
  height: 50%;
  width: 100%;
  padding-bottom: 10px;
}

.niu_result{
  width: 30%;
}
.niu_result_value{
  width: 80%;
  justify-content: space-between;
  display: flex; 
  color: #fff;
}

  .child_item_niu_close {
    width: 10%;
  }
`;