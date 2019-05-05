import styled from "styled-components";
import $ from "common/minxin";

export const HxNiuWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  color: #fff;
`;
export const HxNiuLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: ${props => (props.Zindex ? 12 : 9)};
  /* background-color: ${$.bgAlpha("#1d1e23", "0.3")}; */
`;
export const HxNiuCenter = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 1.64794rem 0 0.359551rem;
`;
export const HxNiuRight = styled.div`
  position: absolute;
  right: 0;
  top: 0.659176rem;
  height: calc(100% - 0.659176rem);
  width: ${props => (props.Nav === "押注" ? "1.318352rem" : "1.498127rem")};
  background-color: ${$.bgAlpha("#1d1e23", "0.3")};
`;

export const LeftWrapper = styled.div`
  position: absolute;
  z-index: 1;
  height: auto;
  ${props => "padding-" + props.Center}: 0.2397rem;
  padding-bottom: 0.299625rem;
  left: 0;
  bottom: 0;
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

//中间
export const CenterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1.76779rem;
  /* background-color: ${$.colorY1}; */
  padding-top: 0.2397rem;
`;
export const CenterTL = styled.div`
  padding-left: 0.599251rem;
  p {
    &:first-child {
      color: #929eb0;
      font-size: ${$.size24};
      margin: 0.134831rem 0;
    }
    &:last-child {
      color: ${$.colorY1};
      font-size: ${$.size40};
    }
  }
`;
export const CenterTC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SizeItemWrapper = styled.div`
  position: relative;

  p {
    font-size: 1.318352rem;
    color: ${$.bgAlpha("#122745", "0.3")};
  }
`;
export const SizeCenterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0.089888rem;
  ${props =>
    props.Center === "center"
      ? "left: 50%;margin-left:-0.314607rem;"
      : "0.089888rem;"}
  top: 0.359551rem;
  width: 0.629213rem;
  height: 0.629213rem;
  border: 0.022472rem solid ${$.colorMain};
  border-radius: 0.059925rem;
  background: #d8d8d8 url(${props => props.Avatart}) 0 0 / contain no-repeat;
  .zhuang {
    left: -0.074906rem;
    top: -0.074906rem;
    position: absolute;
    width: 0.299625rem;
    height: 0.299625rem;
    border-radius: 0.029963rem;
    background-color: ${props => (props.Bg ? "#d95650" : $.colorY1)};
    font-size: ${$.size24};
    color: ${$.bgMain};
    outline: none;
  }
  .introd {
    position: absolute;
    left: 0.749064rem;
    width: 0.898876rem;
    bottom: 0;
    font-size: ${$.size20};
    color: #122745;
    font-weight: bold;
  }
`;

export const SizeSub = styled.div`
  position: absolute;
  left: ${props => (props.title === "玄" ? "-1.498127rem" : "138%")};
  p {
    &:first-child {
      color: ${$.colorY1};
      font-size: ${$.size22};
      margin-top: 0.029963rem;
      ${props => (props.title === "玄" ? "text-align: right;" : "")}
    }
    &:last-child {
      position: relative;
      width: 1.318352rem;
      height: 0.269663rem;
      background-color: #0e2647;
      border-radius: 0.134831rem;
      color: ${$.colorMain};
      font-size: ${$.size24};
      line-height: 0.269663rem;
      ${props =>
        props.title === "玄"
          ? "padding-right: 0.299625rem;padding-left: 0.059925rem;"
          : "padding-left: 0.359551rem;"}
      margin-top: 0.134831rem;
      img {
        position: absolute;
        ${props => (props.title === "玄" ? "right:  0" : "left:  0")};
        top: -0.014981rem;
        width: 0.299625rem;
        height: 0.299625rem;
        border-radius: 0.149813rem;
      }
    }
  }
`;
export const CenterTR = styled.div`
  color: #94a0b2;
  font-size: ${$.size20};
`;
export const CenterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 0.269663rem;
`;
export const CenterBot = styled.div`
  margin-top: 0.449438rem;
  display: flex;
  justify-content: center;
`;

//右侧
export const RightItemWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 0.299625rem;
  /* i {
    font-size: 0.659176rem;
  } */
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
  width: 4.794007rem;
  height: 100%;
  background-color: ${$.bgAlpha("#1d232f", "0.9")};
`;
export const LuZiTitle = styled.ul`
  position: relative;
  height: 0.629213rem;
  width: 100%;
  display: flex;
  padding: 0 0.299625rem;
`;
export const BorderB = styled.li`
  position: absolute;
  bottom: 0;
  left: 0.299625rem;
  width: calc(100% - 0.599251rem);
  height: 0.007491rem;
  background-color: #333c4e;
  box-shadow: 0 0 0.007491rem #0c1019;
`;
export const TitleItem = styled.li`
  font-size: ${$.size24};
  color: #fbe39a;
  line-height: 0.614232rem;
  display: flex;
  width: 17%;
  &:first-child {
    width: 32%;
  }
`;
export const LuZiList = styled.div`
  position: relative;
  width: 100%;
  /* padding-top: 0.224719rem; */
  padding: 0 0.299625rem;
`;
export const ListItem = styled.ul`
  display: flex;
  font-size: ${$.size22};
  width: 100%;
  height: 0.629213rem;
  line-height: 1;
  .first {
    width: 32%;
    display: flex;
    align-items: center;
    .resultTitle {
      display: flex;
      flex-direction: column;
      margin-left: 0.179775rem;
      color: #aaa;
      span:last-child {
        margin-top: 0.059925rem;
      }
    }
  }
  .other {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 17%;
    line-height: 1;
    p:last-child {
      margin-top: 0.059925rem;
    }
  }
  .color1 {
    color: #51a460;
  }
  .color2 {
    color: #ddc594;
  }
  .color3 {
    color: #347dc0;
  }
  .color4 {
    color: #8b78c6;
  }
`;

export const CurrentlyWrapper = styled(LuZiWrapper)`
  font-size: ${$.size24};
  padding: 0;
`;
export const CurrentlyNav = styled.div`
  height: 0.659176rem;
  position: relative;
  padding: 0 0.299625rem 0 0.329588rem;
  display: flex;
  justify-content: space-between;
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: ${$.bgAlpha($.colorY1, 0.3)};
  }
  p {
    line-height: 0.659176rem;
    font-size: ${$.size36};
    color: ${$.colorY1};
  }
`;
export const CurrentlyTitle = styled.div`
  position: relative;
  height: 0.449438rem;
  width: 100%;
  display: flex;
  color: #b9b9b9;
  background-color: #1c2533;
  padding: 0 0.299625rem 0 0.329588rem;
`;
export const CurrentlyList = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0.299625rem 0 0.329588rem;

  p {
    span {
      color: #b9b9b9;
      margin-left: 0.029963rem;
    }
  }
`;
export const CurrentlyItem = styled.div`
  display: flex;
  font-size: ${$.size22};
  width: 100%;
  height: 0.449438rem;

  p {
    display: flex;
    align-items: center;
    &:nth-of-type(1) {
      width: 40%;
    }
    &:nth-of-type(3) {
      width: 40%;
      justify-content: flex-end;
    }
    &:nth-of-type(2) {
      width: 20%;
      justify-content: center;
    }
  }
`;
export const CurrentlyTitleItem = styled.li`
  font-size: ${$.size24};
  line-height: 0.449438rem;
  display: flex;
  &:nth-of-type(1) {
    width: 40%;
  }
  &:nth-of-type(3) {
    width: 40%;
    justify-content: flex-end;
  }
  &:nth-of-type(2) {
    width: 20%;
    justify-content: center;
  }
`;
export const NiuRightNav = styled.div`
  display: flex;
  height: 0.359551rem;
  font-size: ${$.size24};
  color: ${$.colorMain};
  p {
    width: 50%;
    text-align: center;
    line-height: 0.359551rem;
    &.active {
      background-color: ${$.bgMain};
    }
  }
`;

export const RightYzhu = styled.div``;
export const CenterButton = styled.div`
  position: absolute;
  z-index: 2;
  right: 1.64794rem;
  bottom: 1.318352rem;
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
export const YzhuWrapper = styled.div`
  height: calc(100% - 0.359551rem);
`;
export const JZWrapper = styled.div`
  height: calc(100% - 0.359551rem);
  display: flex;
  flex-direction: column;
  padding-top: 0.149813rem;
`;
export const JZList = styled.ul`
  height: 3.101124rem;
  li {
    padding: 0 0.149813rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.179775rem;
    p {
      &.rank {
        font-size: ${$.size24};
        color: #94a0b2;
        width: 0.179775rem;
        height: 0.2397rem;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.089888rem;
        }
      }
      &.namePric {
        margin-left: 0.059925rem;
        span {
          display: block;
        }
        .name {
          color: #94a0b2;
          font-size: ${$.size24};
          margin-bottom: 0.074906rem;
        }
        .totalPric {
          color: ${$.colorY1};
          font-size: ${$.size22};
        }
      }
    }
  }
`;
export const NiuRightBot = styled.div`
  background-color: ${$.bgMain};
  flex: 1;
  padding: 0.149813rem;
  input {
    width: 1.198502rem;
    height: 0.344569rem;
    border-radius: 0.059925rem;
    background-color: #315381;
    font-size: ${$.size24};
    color: ${$.colorMain};
    padding-left: 0.08rem;
  }
  button {
    width: 1.198502rem;
    height: 0.344569rem;
    border-radius: 0.059925rem;
    background-color: #315381;
    font-size: ${$.size24};
    color: ${$.colorMain};
  }
  p {
    padding: 0.209738rem 0 0.074906rem 0;
    font-size: ${$.size16};
    color: #94a0b2;
  }
`;
