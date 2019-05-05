import styled from "styled-components";

export const SecuritySuperDiv = styled.div`
`;

export const SecurityContent = styled.div`
  width: 100%;
  /* height:137px; */
  padding-left:0.16rem;
  padding-right:0.16rem;
  padding-top:0.266667rem;
  font-family:PingFang-SC-Medium;
  font-size:0.186667rem;
  color:#ffffff;
  /* 区块标题 */
  .title{
    line-height: 0.533333rem;
    text-align:left;
    color:#e3c877;
    background-color:rgba(43,41,47,0.8);
    padding-left:0.213333rem;
    border-top-left-radius:0.08rem;
    border-top-right-radius:0.08rem;
  }
  /* 不带黑色蒙版的背景 */
  .whiteContent{
    height: 0.666667rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:rgba(43,41,47,0.3);
      .leftTitle{
        padding-left:0.213333rem;
      }
      .right{
        font-size:0.173333rem;
        padding-right:0.213333rem;
        span{
          padding-right:0.133333rem;
        }
        i{
          font-size:0.186667rem;
        }
        .unclick{
          color:#aaaaaa;
        }
      }
  }
  /* 带黑色蒙版的背景 */
  .blackContent{
    justify-content:space-between;
    height: 0.666667rem;
    display:flex;
    align-items:center;
    background-color:rgba(43,41,47,0.5);
    border-bottom-left-radius:0.08rem;
    border-bottom-right-radius:0.08rem;
    .leftTitle{
        padding-left:0.213333rem;
      }
      .right{
        font-size:0.173333rem;
        padding-right:0.213333rem;
        span{
          padding-right:0.133333rem;
        }
        i{
          font-size:0.186667rem;
        }
        .unclick{
          color:#aaaaaa;
        }
      }
  }
`;