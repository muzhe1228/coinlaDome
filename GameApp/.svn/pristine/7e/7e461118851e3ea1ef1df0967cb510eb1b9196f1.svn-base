import styled from "styled-components";
import $ from "common/minxin";

export const HxjcWrapper = styled.div`
  height: 100%;
  padding: 0.149813rem 0;
  display: flex;
  justify-content: center;
  color: #fff;
`;
export const HxjcLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 1.318352rem;
  z-index: ${props => (props.Zindex ? 1 : 0)};
  z-index: 3;
  /* background-color: ${$.bgAlpha("#1d1e23", "0.3")}; */
`;
export const HxjcCenter = styled.div`
  position: relative;
  height: 100%;
  width: 7.071161rem;
  color: #94a0b2;
  /* padding-right: 0.689139rem; */
  .HxjcMsg {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .CenterTop {
    font-size: ${$.size20};
    font-weight: bold;
    text-align: right;
  }
  .CenterPei {
    font-size: ${$.size20};
  }
`;
export const HxjcRight = styled.div`
  position: absolute;
  right: 0;
  top: 0.659176rem;
  height: calc(100% - 0.659176rem);
  width: 1.318352rem;
  background-color: ${$.bgAlpha("#1d1e23", "0.3")};
  overflow-y: scroll;
`;

export const LeftWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  ${props => "padding-" + props.Center}: 0.2397rem;
  padding-bottom: 0.2397rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const LeftItemWrapper = styled.div`
  width: 0.629213rem;
  height: 0.629213rem;
  border-radius: 0.314607rem;
  background-color: ${$.bgAlpha("#1d1e23", "0.3")};
  box-shadow: inset 0 0 0.029963rem ${$.bgAlpha("#1d1e23", "0.9")};
  line-height: 0.629213rem;
  text-align: center;
  margin-top: 0.11985rem;
  font-size: ${$.size24};
  color: #fff;
`;

export const LeftMenuWrapper = styled.div`
  height: 100%;
  background-color: #131b29;
  width: 0.868914rem;
  text-align: center;
  position: relative;
`;
export const BakeBtn = styled.div`
  position: absolute;
  height: 0.599251rem;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: ${$.size26};
  line-height: 0.58427rem;
  color: ${$.colorMains};
`;

export const BorderLB = styled.div`
  width: 0.749064rem;
  height: 0.007491rem;
  position: absolute;
  top: 0;
  left: 0.059925rem;
  background-color: #333c4e;
  box-shadow: 0 0 0.007491rem #0c1019;
`;

export const LeftMenuItem = styled.button`
  width: 0.749064rem;
  height: 0.299625rem;
  background-color: transparent;
  outline: none;
  color: ${$.colorMains};
  border-radius: 0.149813rem;
  font-size: ${$.size26};
  margin: 0.149813rem 0;
  &.active {
    color: ${$.bgMain};
    background-color: ${$.colorY1};
  }
`;

export const CenterInfoWrapper = styled.div`
  width: 100%;
  height: 3.05618rem;
  position: relative;
`;
export const CenterButton = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: -0.359551rem;
  button {
    width: 1.318352rem;
    height: 0.479401rem;
    border-radius: 0.2397rem;
    background-color: ${$.bgAlpha("#1d232f", "0.9")};
    color: ${$.colorMains};
    font-size: ${$.size28};
    &:first-child {
      margin-right: 0.179775rem;
      color: ${$.colorY1};
    }
  }
`;
export const InfoWrapper = styled.ul`
  width: 100%;
  height: 0.898876rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.179775rem;
  &:last-child {
    margin-bottom: 0;
  }
  li {
    width: 1.318352rem;
    line-height: 0.898876rem;
    background-color: ${$.colorGB};
    border-radius: 0.089888rem;
    color: ${$.colorBlue};
    font-size: 0.539326rem;
    text-align: center;
    &.active {
      background-color: ${$.colorY1};
      color: ${$.colorMain};
    }
    &.info {
      width: 2.816479rem;
      position: relative;
      background-color: transparent;
      color: ${$.colorY1};
      p {
        position: absolute;
        left: 0;
        bottom: 0.149813rem;
        font-size: 0.2397rem;
        line-height: 1;
        color: ${$.colorGB};
      }
    }
  }
`;

export const RightItemWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 0.299625rem;
  /* i {
    font-size: 0.659176rem;
  } */
  &.active {
    img {
      box-shadow: 0 0 16px ${$.colorY1};
    }
  }
  &:nth-child(2) {
    padding-top: 0.224719rem;
  }
  img {
    width: 0.719101rem;
    height: 0.719101rem;
    border-radius: 0.359551rem;
  }
`;

export const LuZiWrapper = styled.div`
  position: absolute;
  left: 0.868914rem;
  top: 0;
  width: 3.595506rem;
  height: 100%;
  background-color: ${$.bgAlpha("#1d232f", "0.9")};
  padding: 0 0.299625rem;
`;
export const LuZiTitle = styled.ul`
  position: relative;
  height: 0.629213rem;
  width: 100%;
  display: flex;
`;
export const BorderB = styled.li`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.007491rem;
  background-color: #333c4e;
  box-shadow: 0 0 0.007491rem #0c1019;
`;
export const TitleItem = styled.li`
  font-size: ${$.size24};
  color: #fbe39a;
  line-height: 0.614232rem;
  display: flex;

  &:first-child {
    width: ${props => (props.isDef ? "1.093633rem" : "50%")};
  }
  ${props =>
    props.isDef
      ? `
    &:nth-child(2) {
      flex:1;
      
    }`
      : `&:nth-child(2) {
      width: 15%;
      justify-content: center;
     
    }
    &:nth-child(3) {
      width: 35%;
      justify-content: flex-end;
    }`}
`;
export const LuZiList = styled.ul`
  position: relative;
  width: 100%;
  /* padding-top: 29.999986px; */
`;
export const ListItem = styled.li`
  display: flex;
  font-size: ${$.size24};
  p {
    display: flex;
    line-height: 0.479401rem;
    &:first-child {
      width: ${props => (props.isDef ? "1.093633rem" : "50%")};
    }
    ${props =>
      props.isDef
        ? `
    &:nth-child(2) {
      flex:1;
      span {
        line-height: 0.2397rem;
        display: inline-block;
        width: 0.2397rem;
        height: 0.2397rem;
        border-radius: 0.11985rem;
        background-color: ${$.colorY1};
        text-align: center;
        margin-left: 0.059925rem;
        margin-top: 0.11985rem;
      }
    }`
        : `&:nth-child(2) {
      width: 15%;
      justify-content: center;
     
    }
    &:nth-child(3) {
      width: 35%;
      justify-content: flex-end;
    }`}
  }
`;
