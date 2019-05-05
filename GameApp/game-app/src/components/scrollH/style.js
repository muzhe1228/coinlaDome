import styled from "styled-components";
import $ from "common/minxin";
export const Wrapper = styled.div`
  position: relative;
  height: ${props => (props.sHeight ? props.sHeight : "100%")};
  overflow: hidden;
  /* padding-right: 0.059925rem; */
  .bscroll-vertical-scrollbar {
    width: 0.044944rem !important;
    .bscroll-indicator {
      border: none !important;
      border-radius: 0.044944rem !important;
    }
  }
  .top-tip {
    position: absolute;
    top: -40px;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
  }
`;
