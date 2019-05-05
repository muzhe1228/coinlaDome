import styled from "styled-components";
import $ from "common/minxin";
export const YZWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 13;
  left: 0;
  top: 0;
`;
export const YZCenter = styled.div`
  width: 70%;
  height: 0.599251rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0.299625rem 0.299625rem 0 0;
  position: absolute;
  bottom: 0;
  left: 13%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.374532rem;
`;
export const YZL = styled.div`
  display: flex;
  .label {
    font-size: ${$.size22};
    margin-right: 0.044944rem;
    line-height: 0.299625rem;
    display: flex;
    align-items: center;
  }
  .zhuangWrap {
    display: flex;
    align-items: center;
    .zhuang {
      margin-left: 0.104869rem;
      width: 0.299625rem;
      height: 0.299625rem;
      border-radius: 0.029963rem;
      background-color: ${props => (props.Bg ? "#d95650" : $.colorY1)};
      font-size: ${$.size24};
      color: ${$.bgMain};
      outline: none;
    }
  }

  .PKWrap {
    width: 1.243446rem;
    height: 0.299625rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.149813rem;
    display: flex;
    align-items: center;
    padding: 0 0.044944rem;
    margin: 0.149813rem;
    img {
      width: 0.2397rem;
      height: 0.2397rem;
    }
    span {
      font-size: 0.164794rem;
      margin-left: 0.074906rem;
      color: ${$.colorY1};
    }
  }
`;
export const YZR = styled.div`
  button {
    width: 0.988764rem;
    height: 0.299625rem;
    border-radius: 0.149813rem;
    background-color: ${$.colorY1};
    color: ${$.bgMain};
    font-size: ${$.size22};
    &:last-child {
      margin-left: 0.074906rem;
      color: ${$.colorMain};
    }
  }
`;
// export const  = styled.div`

// `;
