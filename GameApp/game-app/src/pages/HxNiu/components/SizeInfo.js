import React from "react";
import { SizeInfoWrapper } from "../style";
const SizeInfo = function(props) {
  const { title, center, Bg } = props;
  return (
    <SizeInfoWrapper>
      <p>{title}</p>
      <p>
        <span>
          <i className="iconfont">&#xe644;</i> 60S
        </span>
        <span>后停止投注</span>
      </p>
    </SizeInfoWrapper>
  );
};

export default SizeInfo;
