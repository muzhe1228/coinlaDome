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
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
`;

export const AlertDiv = styled(superCss)`
  background: #2e2e33;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0.194757rem;
`;
export const AlertContent = styled(superCss)`
  margin: 0.2rem;
  margin-top: 0;
`;

export const ChooseCoinDiv = styled(superCss)`
  position: relative;
  display: flex;
  align-items: center;
  span {
    position: absolute;
    left: 0;
    color: #fff;
  }
  div {
    width: 100%;
    padding-left: 17%;
    padding-right: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      display: flex;
      line-height: 0.533333rem;
      width: 0.533333rem;
      height: 0.533333rem;
      border-radius: 0.266667rem;
      background: #27252b;
      justify-content: center;
      align-items: center;
      img {
        margin-top: -0.04rem;
        width: 70%;
        height: 70%;
      }
    }

    .unselect {
      text-align: center;
      border: 0.013333rem #27252b solid;
    }

    .select {
      border: 0.013333rem #e3c877 solid;
    }
  }
`;
export const FromCountDiv = styled(superCss)`
  margin-top: 0.173333rem;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  height: 0.533333rem;

  position: relative;
  span {
    line-height: 0.533333rem;
    position: absolute;
    left: 0;
  }
  input {
    background-color: transparent;
    color: white;
    width: 100%;
    margin-left: 1.066667rem;
    margin-right: 0.866667rem;
    padding-left: 0.16rem;
    border-radius: 0.266667rem;
    background-color: #2b292f;
    height: 100%;
    ::placeholder {
      color: #666666;
    }
  }

  p {
    padding-right: 0.066667rem;
    line-height: 0.533333rem;
    position: absolute;
    right: 0.16rem;
    color: white;
  }
`;
export const ToCoinDiv = styled(superCss)`
  margin-top: 0.173333rem;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  height: 0.533333rem;
  span {
    line-height: 0.533333rem;
    margin-left: 0;
  }

  .toCoinValue {
    font-size: 0.2rem;
    margin-left: 0.333333rem;
    color: #e3c877;
  }
`;

export const SubmitDiv = styled(superCss)`
  margin-top: 0.266667rem;
  display: flex;
  justify-content: center;
  p {
    font-size: 0.2rem;
    width: 1.6rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    color: #333333;
    margin: 0 0.533333rem;
    display: inline-block;
    line-height: 0.4rem;
    text-align: center;
  }
  .submit {
    background: #e3c877;
  }
  .cancel {
    background: #9a9a9a;
  }
`;
