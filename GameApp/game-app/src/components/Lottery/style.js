import styled from "styled-components";
import $ from "common/minxin";
export const OpenWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    circle,
    ${$.bgAlpha("#e7d188", 0.9)} 15%,
    ${$.bgAlpha("#131b29", "0.9")} 40%,
    ${$.bgAlpha("#131b29", "0.9")} 60%
  );
  transform: scale(0, 0);
  transition: all 0.4s linear;
  &.show {
    transform: scale(1, 1);
  }
`;
export const OpenWrap = styled.div`
  width: 4.494382rem;
  height: 4.494382rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const OpenBei = styled.div`
  width: 100%;
  height: 2.951311rem;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    width: 2.966292rem;
    height: 2.951311rem;
  }
  p {
    position: absolute;
    top: 43%;
    left: 50%;
    font-size: ${$.size32};
    transform: translateX(-50%);
    font-weight: bolder;
    background: linear-gradient(to left, #fff7be, #fff, #fff7be);
    -webkit-background-clip: text;
    color: transparent;
  }
`;
export const OpenPk = styled.div`
  display: flex;
  align-items: center;
  height: 0.659176rem;
  img {
    height: 0.329588rem;
    width: 0.329588rem;
  }
  p {
    font-size: 0.269663rem;
    color: ${$.colorY1};
    margin-left: 0.11985rem;
    font-weight: bolder;
  }
`;
export const OpenBtn = styled.div`
  display: flex;
  align-items: center;
  height: 0.659176rem;
  img {
    height: 0.449438rem;
    width: 1.52809rem;
    margin: 0.11985rem;
  }
`;
