import styled from "styled-components";
import $ from "common/minxin";
const headerComm = styled.div`
  width: 100%;
  background-color: ${$.bgMain};
  padding: 0 0.359551rem;
`;

export const HeaderWrapper = styled(headerComm)`
  height: 0.808989rem;
`;
export const HeaderLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;
export const HeaderAvatar = styled.div`
  position: relative;
  width: 0.539326rem;
  height: 0.539326rem;
  border-radius: 0.269663rem;
  /* img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.479401rem;
    height: 0.479401rem;
    border-radius: ${$.size32};
  } */
  span {
    display:inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.539326rem;
    height: 0.539326rem;
    line-height:0.449438rem;
    border: 0.044944rem rgba(255,255,255,0.6) solid;
    border-radius: 0.269663rem;
    font-size:0.224719rem;
    text-align:center;
    color:white;
    background:#e3c877;
    font-weight:bold;
  }
`;
export const HearderSize = styled.div`
  margin-left: ${$.size16};
  .nickName {
    font-size: ${$.size28};
    font-weight: 400;
    color: ${$.colorMain};
  }
  p {
    margin-top: 0.074906rem;
    font-size: ${$.szie22};
    color: ${$.colorSub};
  }
`;
export const HeaderCenter = styled.div`
  height: 100%;
  margin-left: 0.599251rem;
  display: flex;
  align-items: center;
`;
export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 2.097378rem;
  height: 0.404494rem;
  padding: 0.059925rem;
  background-color: #393c42;
  border-radius: 0.202247rem;
  color: ${$.colorMain};
  .img {
    cursor: pointer;
    img {
      width: 0.299625rem;
      height: 0.299625rem;
      border-radius: 0.149813rem;
      vertical-align: middle;
    }
  }
`;
export const ItemR = styled.div`
  display: flex;
  align-content: center;
  font-size: ${$.size28};
  .price {
    line-height: 0.269663rem;
  }
  .icon {
    margin-left: 0.089888rem;
    width: 0.269663rem;
    line-height: 0.269663rem;
    border-radius: 0.134831rem;
    background-color: ${$.bgMain};
    text-align: center;
    .iconfont {
      font-size: ${$.size24};
      color: ${$.colorMain};
    }
  }
`;
export const HeaderRight = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
  img {
    width: 0.299625rem;
    height: 0.299625rem;
  }
  p {
    display: flex;
    align-items: center;
    font-size: ${$.size28};
    color: ${$.colorMains};
    margin-right: 0.299625rem;
    img {
      margin-right: 0.059925rem;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .isAllScroll {
    margin-left: 0.299625rem;
    .iconfont {
      font-size: ${$.szie42};
      color: ${$.colorSub};
    }
  }
`;

const SubComm = styled.div`
  height: 100%;
`;

export const SubHeaderWrapper = styled(headerComm)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  height: ${props => (props.Heig ? "0.808989rem" : "0.659176rem")};
`;

export const SubLeft = styled(SubComm)`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-size: ${$.size28};
    color: ${$.colorMain};
    /* margin-right: 0.299625rem; */
    img {
      width: 0.359551rem;
      height: auto;
      margin-right: 0.059925rem;
    }
    span {
      display: inline-block;
      width: 0.719101rem;
      line-height: ${$.size32};
      border-radius: ${$.size16};
      background-color: ${$.colorY1};
      font-size: ${$.size26};
      text-align: center;
      color: ${$.bgMain};
    }
  }
`;

export const SubTitle = styled.div`
  font-size: ${$.size32};
  color: ${$.colorMain};
  line-height: 0.659176rem;
`;

export const SubRight = styled(SubComm)`
  font-size: ${$.size32};
  color: ${$.colorMain};
  line-height: 0.659176rem;
`;

//登录
export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${$.bgAlpha($.bgMain, "0.6")};
  width: 100%;
  height: 100%;
`;

export const LoginTitle = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  height: 0.599251rem;
  border-bottom: 2px solid ${$.bgMain};
  line-height: 0.58427rem;
  color: ${$.colorY1};
  font-size: ${$.size28};
  .close {
    position: absolute;
    right: -0.329588rem;
    top: 0;
    transform: translateY(-120%);
    cursor: pointer;
    i {
      font-size: ${$.size40};
      color: ${$.colorMain};
    }
  }
`;
export const LInpWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 0.479401rem;
  font-size: ${$.size28};
  margin-top: ${props => (props.MT ? props.MT : "0.2397rem")};
  .label {
    position: absolute;
    left: 0.2397rem;
    color: ${$.colorMain};
  }
  .sendCode {
    position: absolute;
    right: 0.2397rem;
    color: ${$.colorY1};
    background-color: transparent;
    &:disabled {
      color: #aaa;
    }
  }
  input {
    width: 100%;
    height: 0.479401rem;
    background-color: ${$.bgMain};
    border-radius: 0.2397rem;
    padding-left: 0.958801rem;
    color: ${$.colorMain};
    ${$.placeholderColor("#666")}
  }
`;

export const LButtonWrapper = styled.button`
  width: 100%;
  height: 0.479401rem;
  font-size: ${$.size28};
  margin-top: ${props => (props.MT ? props.MT : "0.2397rem")};
  border-radius: 0.2397rem;
  background-color: ${$.bgMain};
  color: ${$.colorY1};
`;
export const TishiWrapper = styled.div`
  margin-top: 0.149813rem;
  width: 100%;
  font-size: ${$.size24};
  color: #aaa;
  text-align: center;
  i {
    margin-right: 0.059925rem;
    font-size: 0.179775rem;
  }
`;
export const BackWrapper = styled.div`
  width: 100%;
  font-size: ${$.size24};
  color: #aaa;
  text-decoration: underline;
  text-align: center;
  margin-top: 0.359551rem;
`;
export const LWrap = styled.div`
  width: 5.123596rem;
  height: ${props =>
    props.He > 1
      ? props.He === 4
        ? "3.835206rem"
        : "2.93633rem"
      : "2.636704rem"};
  background-color: #2e2e33;
  border-radius: 0.059925rem;
  padding: 0 0.359551rem;
`;
export const LWrap2 = styled.div`
  width: 5.123596rem;
  height: 2.636704rem;
  background-color: #2e2e33;
  border-radius: 0.059925rem;
  padding: 0 0.359551rem;
`;
export const LWrap3 = styled.div`
  width: 5.123596rem;
  height: 1.468165rem;
  background-color: #2e2e33;
  border-radius: 0.059925rem;
  padding: 0 0.359551rem;
`;
