import styled from "styled-components";

const superCss = styled.div`
  margin: 0;
  padding: 0;
`;

export const BackGround = styled(superCss)``;

export const AlertDiv = styled(superCss)``;

//游戏规则start
export const GameRuleStyle = styled.div`
  word-break: break-all;
  font-size: 0.173333rem;
  color: #fff;
  letter-spacing: 0;
  line-height: 0.32rem;
  text-align: left;
`;

export const GameRuleCopyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 0.479401rem;
  position: relative;
  margin: 0.2397rem 0;
  input {
    width: 100%;
    height: 100%;
    padding: 0 0.2397rem;
    background-color: #2b292f;
    border-radius: 0.2397rem;
    color: #fff;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.318352rem;
    height: 0.479401rem;
    background-color: transparent;
    text-decoration: underline;
    color: #e3c877;
  }
`;
//游戏规则end
