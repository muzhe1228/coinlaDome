import styled from "styled-components";
import $ from "common/minxin";

export const YydbDetails = styled.div`
  height: 100%;
  display: flex;
`;
const comLR = styled.div`
  height: 100%;
  width: 2.516854rem;
  display: flex;
  flex-direction: column;
  color: ${$.colorMains};
`;
export const DetailsL = styled(comLR)`
  background-color: ${$.bgAlpha("#2b292f", 0.6)};
  .title {
    font-size: ${$.size28};
    text-align: center;
    line-height: 0.479401rem;
    border-bottom: 0.014981rem solid ${$.bgMain};
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      height: 0.449438rem;
      align-items: center;
      padding: 0 0.2397rem;
      font-size: ${$.size24};
      &:nth-child(even) {
        background-color: ${$.bgAlpha("#2b292f", 0.6)};
      }
    }
  }
`;
export const DetailsC = styled.div`
  height: 100%;
  flex: 1;
  padding: 0.179775rem 0.179775rem 0;
`;
export const DetailsLTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title_l {
    color: ${$.colorY1};
    font-size: ${$.size32};
  }
  .title_r {
    color: #25232a;
    font-size: ${$.size28};
  }
`;
export const DetailsLCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0 0.179775rem;
`;
export const CenterItem1 = styled.div`
  text-align: center;
  padding-top: 0.11985rem;
  img {
    width: 0.958801rem;
    height: 0.958801rem;
    border-radius: 0.479401rem;
  }
  p {
    margin-top: 0.359551rem;
    color: #aaa;
    font-size: ${$.size24};
  }
`;
export const CenterItem2 = styled.div`
  padding-top: 0.2397rem;
  width: 100%;
  .intorP {
    display: flex;
    justify-content: space-between;
    margin-top: 0.089888rem;
    span {
      color: ${$.colorY1};
      font-size: ${$.size28};
      a {
        color: #aaa;
      }
    }
  }
`;
export const CenterItem3 = styled.div`
  margin-top: 0.269663rem;
  width: 100%;
  overflow: hidden;
  .exchange {
    font-size: ${$.size28};
    color: #f7f7f7;
    text-align: right;
    margin-top: 0.089888rem;
    margin-bottom: 0.149813rem;
  }
`;
export const InputGlup = styled.div`
  display: flex;
  height: 0.479401rem;
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    background-color: ${$.bgMain};
    padding: 0 0.509363rem;
    outline: none;
    text-align: center;
    font-size: ${$.size28};
    color: ${$.colorY1};
    border-radius: 0.059925rem;
  }
  p {
    position: absolute;
    width: 0.509363rem;
    text-align: center;
    color: ${$.colorY1};
    i {
      font-size: ${$.size28};
      line-height: 0.479401rem;
    }
    &:first-child {
      left: 0;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        height: 0.269663rem;
        width: 0.014981rem;
        border-radius: 0.007491rem;
        background-color: #201e24;
        transform: translateY(-50%);
      }
    }
    &:last-child {
      right: 0;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 0.269663rem;
        width: 0.014981rem;
        border-radius: 0.007491rem;
        background-color: #201e24;
        transform: translateY(-50%);
      }
    }
  }
`;
export const CenterBtn = styled.button`
  width: 100%;
  height: 0.479401rem;
  border-radius: 0.2397rem;
  background-color: ${$.bgAlpha("#2b292f", 0.6)};
  color: #aaa;
  font-size: ${$.size28};
  outline: none;
  position: relative;

  span {
    position: absolute;
    left: calc(50% + 0.329588rem);
    top: 50%;
    margin-top: -0.082397rem;
    font-size: ${$.size22};
    color: #aaa;
  }

  &.active {
    color: ${$.colorY1};
    background-color: ${$.bgMain};
  }
`;
export const DetailsR = styled(comLR)``;
const after = styled.div`
  width: 2.516854rem;
  background-color: ${$.bgAlpha("#2b292f", 0.6)};
  .title {
    position: relative;
    height: 0.479401rem;
    font-size: ${$.size28};
    text-align: center;
    line-height: 0.479401rem;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.014981rem;
      background-color: ${$.bgMain};
      border-radius: 0.014981rem;
    }
  }
`;
export const RTtem1 = styled(after)`
  height: 2.726592rem;
  text-align: center;
  color: #aaa;
  .introPk {
    margin-top: 0.149813rem;
    margin-bottom: 0.059925rem;
    font-size: ${$.size28};
  }
  .introEth {
    margin-bottom: 0.11985rem;
    font-size: 0.269663rem;
    color: ${$.colorY1};
  }
  .intro {
    padding: 0 0.2397rem;
    font-size: ${$.size22};
    line-height: 1.6;
  }
`;

export const RTtem2 = styled(after)`
  margin-top: 0.029963rem;
  height: calc(100% - 2.756554rem);
  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${$.size20};
      height: 0.449438rem;
      padding: 0 0.2397rem;
      p {
        width: 35%;
        color: #aaa;
        line-height: 0.209738rem;
        &:nth-child(2) {
          color: #ddd;
          width: 25%;
        }
        &:last-child {
          width: 40%;
          text-align: right;
        }
      }

      &:nth-child(even) {
        background-color: ${$.bgAlpha("#2b292f", 0.6)};
      }
    }
  }
  .notData {
    line-height: 1.318352rem;
    font-size: ${$.size28};
    color: #aaa;
    text-align: center;
    display: none;
  }
`;
