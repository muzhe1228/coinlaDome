import styled from "styled-components";
import $ from 'common/minxin'

export const FooterWrapper = styled.div`
  height: 0.659176rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${$.bgMain};
  padding: 0 0.449775rem;
`;

export const FooterLeft = styled.div`
  display: flex;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.149813rem;
  &:last-child {
    margin-right: 0;
  }
  p {
    font-size: 0.179775rem;
    color: ${$.colorMain};
    &:nth-child(1) {
      margin-right: 0.059925rem;
    }
    .iconfont {
      color: #fff;
      font-size: 0.18rem;
    }
  }
`;
