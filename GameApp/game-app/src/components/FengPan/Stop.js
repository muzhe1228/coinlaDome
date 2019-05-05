import React from "react";
import { StopWrapper } from "./style";
const Stop = function(props) {
  const { text } = props;
  return <StopWrapper>{text}···</StopWrapper>;
};
Stop.defaultProps = {
  text: "开奖中"
};
export default Stop;
