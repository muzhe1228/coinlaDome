import styled from "styled-components";
export const WrapWrapper = styled.div`
  height: 100%;
  .widthWrapper {
    position: relative;
    width: 1.558052rem;
    height: 100%;
    color: #fff;
    background-color: #2b292f;
    transition: width 0.1s linear;
    z-index: -1;
  }
`;
export const NavWrapper = styled.div`
  position: fixed;
  width: 1.558052rem;
  height: 100%;
  padding-top: 0.808989rem;
  color: #fff;
  background-color: #2b292f;
  transition: width 0.2s linear;
  top: 0;
  z-index: 1;
  &.hide {
    width: 0;
    height: calc(100% - 0.404494rem);
    position: fixed;
    left: 0;
    top: 0.404494rem;
    padding-top: 0.404494rem;
  }
  .iconHandele {
    width: 0.299625rem;
    height: 0.779026rem;
    border-radius: 0 0.179775rem 0.179775rem 0;
    position: absolute;
    right: -0.299625rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(43, 41, 47, 0.8);
    color: #fff;
    z-index: 9999;
    .iconfont {
      font-size: 0.179775rem;
    }
  }
`;
export const NavItem = styled.div`
  font-size: 0.149813rem;
  color: #aaa;
  height:${props=>(100/props.number+'%')};
  line-height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  width: 100%;
  border-bottom: 0.014981rem solid #3f4247;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &.active {
    color: #e3c877;
    border-bottom: 0.029963rem solid #e3c877;
  }
  p {
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 0.12rem;
    background: red;
    color: white;
    font-size: 0.133333rem;
    display: inline-block;
    position: absolute;
    right: 0.066667rem;
    top: 50%;
    margin-top: -0.12rem;
    line-height: 0.24rem;
  }
`;
