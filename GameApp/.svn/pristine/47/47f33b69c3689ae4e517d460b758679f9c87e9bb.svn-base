import styled from "styled-components";

const superCss = styled.div`
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
`;

export const BackGround = styled(superCss)`
  z-index:2;
  width: 100%;
  height: ${props => {
    return (props.list.length+1) * 100 + "%";
  }};
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.194757rem;

  .title {
    display: flex;
    align-items: center;
    height: ${props => {
    return 100/(props.list.length+1) + "%";
    }};
    width: 0.749064rem;
    position: relative;
    text-align: center;
    justify-content: center;
    padding-left: 0;
    color:#e3c877;
    i {
      position: absolute;
      padding-left: 0.074906rem;
      font-size: 0.106667rem;
      left: 70%;
    }
  }
`;

export const OpenListDiv = styled(superCss)`
  height: ${props => {
    return 100-100/(props.list.length+1) + "%";
    }};
    
  p {
    color: white;
    background: rgba(43, 41, 47, 1);
    height: ${props => {
    return 100/(props.list.length) + "%";
    }};
    text-align: center;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .select {
    color: #e3c877;
    background: #242228;
  }
`;
 