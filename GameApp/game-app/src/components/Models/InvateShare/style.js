import styled from "styled-components";

const superCss = styled.div`
  margin: 0;
  padding: 0;
  text-align:center;
`;

export const BackGround = styled(superCss)``;

export const AlertDiv = styled(superCss)`
  font-size: 0.16rem;
  color: black;
  height: 600px;
  
  .my_invite_code_div {
    border: 1px yellow solid;
    height: 30%;
    width: 100%;
    .my_invite_code {
      border: 1px yellow solid;
    }
    .code {
      border: 1px red solid;
    }
  }

  .explain {
    border: 1px blue solid;
    height: 10%;
  }

  button {
    height: 10%;
    border: 1px green solid;
  }

  .bottom_info {
    display: flex;
    height: 10%;
    border: 1px white solid;
    align-items: center;
    .iconfont {
    }

    .line {
      width:20%;
    }
  }
`;

export const InviteStyle = styled.div`
  word-break: break-all;
  font-size: 0.173333rem;
  color: #fff;
  letter-spacing: 0;
  line-height: 0.32rem;
  text-align: left;
`;
