import styled from "styled-components";
import $ from "common/minxin";

const superCss = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
`;

export const AlertDiv = styled(superCss)`
  background-repeat: no-repeat;
  .logo_icon {
    margin: 0.533333rem;
  }
`;

export const DownArea = styled(superCss)`
  text-align: center;
  align-items: center;
  height: 50%;
  font-size: 28px;
  color: #d8ceae;
  padding-bottom: 0.4rem;

  .down_btn {
    margin: 8.973333rem 0 0.426667rem;
  }

  .er_code {
    height: 3.52rem;
    width: 3.52rem;
  }
  .sao {
    font-size: 32px;
    color: #d8ceae;
    line-height: 30px;
    font-weight: bold;
    padding: 44px 0 16px;
  }
`;
