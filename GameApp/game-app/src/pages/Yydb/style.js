import styled from "styled-components";
import $ from "common/minxin";
const common = styled.div`
  display: flex;
  height: calc(50% - (0.359551rem / 2));
  width: 100%;
  margin-bottom: 0.359551rem;
`;

export const BullWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0.2397rem;
`;
export const HxNiuLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: ${props => (props.Zindex ? 12 : 9)};
  /* background-color: ${$.bgAlpha("#1d1e23", "0.3")}; */
`;

export const BullCentter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  width: 8.524345rem;
  padding-top: 0.359551rem;
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const LeftNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 1.588015rem;
  width: 0.449438rem;
  background-color: #2b292f;
  border-radius: 0.089888rem;
  color: #fff;
  font-size: 0.209738rem;
  padding: 0.224719rem 0;
`;

export const CItemWrapper = styled.div`
  margin-bottom: 0.2397rem;
`;
export const CItemTop = styled.ul`
  width: 2.636704rem;
  height: 1.588015rem;
  padding: 0.11985rem 0.179775rem;
  background-color: #428d74;
  border-radius: 0.089888rem;
  li {
    display: flex;
    &.top_first {
      justify-content: space-between;
      height: 0.2397rem;
      margin-bottom: 0.059925rem;
      p {
        &:first-child {
          font-size: ${$.size28};
          color: #1d4a3a;
        }
        &:last-child {
          width: 0.659176rem;
          line-height: 0.2397rem;
          border-radius: 0.11985rem;
          background-color: #3a7d65;
          font-size: ${$.size20};
          color: ${$.colorMain};
          text-align: center;
        }
      }
    }
    &.top_img {
      justify-content: center;
      img {
        width: 0.808989rem;
        height: 0.808989rem;
        border-radius: 0.404494rem;
        overflow: hidden;
      }
    }
    &.top_progress {
      padding-top: 0.11985rem;
      width: 100%;
    }
  }
`;
export const CItemBot = styled.div`
  height: 0.479401rem;
  width: 2.636704rem;
  text-align: center;
  padding-top: 0.089888rem;
  button {
    width: 1.438202rem;
    height: 0.389513rem;
    border-radius: 0.194757rem;
    background-color: #27252b;
    color: ${$.colorY1};
    font-size: ${$.size24};
    outline: none;
    &.active {
      background-color: #428d74;
      color: #fff;
    }
  }
`;
export const BullFooter = styled.div`
  position: fixed;
  width: 100%;
  height: 0.70412rem;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.2397rem;
  /* background-color: #2b292f; */
  .footerL {
    width: 0.868914rem;
  }
  .footerR {
    display: flex;
    align-items: center;
    width: 100%;
    .iconfont {
      color: #fff;
      margin-right: 0.179775rem;
      font-size: 0.269663rem;
    }
    span {
      font-size: 0.194757rem;
      color: #bcbcbc;
      a {
        color: #fff;
        &:nth-child(2) {
          color: #ff3636;
        }
      }
    }
  }
`;
