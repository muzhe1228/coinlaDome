import styled from "styled-components";

const common = styled.div`
  display: flex;
  height: calc(50% - (0.359551rem / 2));
  width: 100%;
  margin-bottom: 0.359551rem;
`;

export const BullWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.359551rem 0.359551rem 0 0.359551rem;
`;
export const BullLeft = styled(common)``;
export const BullRight = styled(common)``;
export const BullCentter = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  .Item {
    width: calc(calc(100% - 0.898876rem) / 3);
    margin-left: 0.299625rem;
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
  width: 100%;
  height: 100%;
  min-height: 1.588015rem;
  padding: 0.089888rem;
  border-radius: 0.089888rem;
  background-color: ${props => props.ColorObj.bgColor};
  color: #fff;
  position: relative;
  .cItemTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      width: 0.2397rem;
      height: 0.2397rem;
    }
    span {
      display: inline-block;
      width: 0.779026rem;
      border-radius: 0.11985rem;
      background-color: ${props => props.ColorObj.subBgColor};
      font-size: 0.149813rem;
      line-height: 0.254682rem;
      text-align: center;
      color: ${props => props.ColorObj.color};
    }
  }
  .ItemLocation {
    font-size: 0.329588rem;
    text-align: center;
    margin-top: 0.11985rem;
  }
  .ItemPric {
    text-align: center;
    font-size: 0.194757rem;
    display: flex;
    align-items: center;
    padding-top: 0.11985rem;
    justify-content: center;
    img {
      width: 0.179775rem;
      height: 0.179775rem;
      margin-right: 0.029963rem;
    }
  }
  .botMode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 0.089888rem;
    border-radius: 0 0 0.089888rem 0.089888rem;
    height: 0.299625rem;
    width: 100%;
    background-color: ${props => props.ColorObj.subBgColor};
    font-size: 0.149813rem;
    vertical-align: bottom;
    i {
      margin-right: 0.029963rem;
      font-size: 0.149813rem;
    }
  }
`;

export const BullFooter = styled.div`
  position: fixed;
  width: 100%;
  height: 0.70412rem;
  left: 0;
  bottom: 0;
  padding: 0 0.359551rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #2b292f; */
  .footerL {
    display: flex;
    align-items: center;
    .iconfont {
      color: #2b292f;
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
  .footerBtn {
    width: 1.52809rem;
    line-height: 0.419476rem;
    border-radius: 0.209738rem;
    text-align: center;
    color: #fff;
    background-color: #ddaa36;
    font-size: 0.224719rem;
    transform-origin: center center;
    animation: wobble 3s 2s infinite;
  }
`;
