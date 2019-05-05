import styled from "styled-components";
import $ from "common/minxin"
export const SingleWrapper = styled.div`
  padding-top: 0.209738rem;
  padding-bottom: 0.209738rem;
  margin:0 0.266667rem;
`;

export const SingleTitle = styled.div`
  width: 100%;
  background-color: ${$.bgMain};
  border-radius: 0.089888rem 0.089888rem 0 0;
  color: ${$.colorY1};
  line-height: 0.599251rem;
  padding: 0 0.209738rem;
  font-size: ${$.size28};
`;

export const SingleCenter = styled.div`
  height: 1.078652rem;
  width: 100%;
  background-color: ${$.bgMainFilter(0.7)};
  padding: 0.2397rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CenterL = styled.div`
  display: flex;
  .iconGlup {
    padding-right: 0.2397rem;
    height: 0.586667rem;
    i {
      font-size: 0.539326rem;
      color: ${$.colorMain};
    }
  }
  .Size {
    display: flex;
    flex-direction: column;
    line-height: 0.2397rem;
    justify-content: space-between;
    &-title {
      color: ${$.colorY1};
      font-size: ${$.size28};
    }
    &-info {
      color: #aaaaaa;
      font-size: ${$.size26};
    }
  }
`;

export const CenterR = styled.div`
  width: 1.078652rem;
  line-height: 0.359551rem;
  background-color: #aaa;
  border-radius: 0.179775rem;
  font-size: ${$.size26};
  color: ${$.bgMain};
  text-align: center;
  &.notOver {
    background-color: ${$.colorY1};
  }
`;
