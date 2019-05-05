import styled from "styled-components";

const superCss = styled.div`
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
`;

export const BackGround = styled(superCss)`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index:11;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
`;

export const AlertDiv = styled(superCss)`
  background: #2e2e33;
  border-radius: 0.053333rem;
  position: relative;
  width: 70%;
  height: 70%;
  margin: 0 auto;
  
  .closeAlert {
    position: absolute;
    width: 0.373333rem;
    line-height: 0.373333rem;
    right: -0.106667rem;
    top: -0.4rem;
    font-size: 0.24rem;
    color:white;
  }

  .h1 {
    font-size: 0.186667rem;
    color: #e3c877;
    display: inline-block;
    line-height: 0.6rem;
    width: 100%;
    text-align: center;
    font-weight:bold;
  }
`

export const AlertContent = styled(superCss)`
  margin: 0.2rem;
  margin-top: 0;
  border-top: 0.013333rem #2b292f solid;
  height:80%;
  overflow:auto;
  .content{
    margin-top:0.16rem;
    text-indent:2em;
    color:white;
    font-size:0.173334rem;
  }
`
