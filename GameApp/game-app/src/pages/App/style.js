import styled from "styled-components";

const Common = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const GameWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: url(${props => props.bgImg}) 0 0/100% 100% no-repeat;
  #canvas {
    position: fixed;
    z-index: -10;
    left: -100%;
    top: -100%;
  }
`;
export const GameHeader = styled(Common)`
  top: 0;
  z-index: 10;
`;

export const GameNotice = styled(Common)`
  background-color: rgba(0, 0, 0, 0.1);
  top: 0.613333rem;
  padding-left: 0.533333rem;
`;
export const GameFooter = styled(Common)`
  bottom: 0;
`;
export const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
  .gameWrapper-scroll {
    display: flex;
    min-width: 100%;
    height: 100%;
    /* padding: 0.808989rem 0.359551rem 0.539326rem; */
    padding: ${props =>
      props.smallHeader ? "0.659176rem" : "0.808989rem"} 0 0;
    overflow-y: scroll;
    .rightCenter {
      transition: width 0.2s linear;
      width: ${props => (props.contW ? "100%" : "calc(100% - 1.558052rem)")};
      /* padding: ${props => (props.smallHeader ? "0" : "0 0.2397rem")}; */
    }
    h1 {
      color: #fff;
    }
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
`;
