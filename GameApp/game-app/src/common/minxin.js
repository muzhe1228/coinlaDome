import { colorRgb } from "common";
const $ = {
  //字体颜色
  colorMain: "#fff",
  colorMains: "#ddd",
  colorSub: "#e3e3e3",
  colorSubs: "#bcbcbc",
  colorR: "#ff3636",
  colorY: "#d7c142",
  colorY1: "#e3c877",
  colorBlue: "#1c355c",
  colorGB: "#94a0b2",
  //背景颜色
  //背景颜色
  bgMain: "#2b292f",
  placeholderColor: function(color) {
    return `&::-webkit-input-placeholder {
      color: ${color};
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color:  ${color};
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color:  ${color};
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color:  ${color};
    }`;
  },
  bgMainFilter: function(opcity) {
    opcity = "rgba(43,41,47," + opcity + ")";
    return opcity;
  },
  bgAlpha: function(color, alpha) {
    return colorRgb(color, alpha);
  },
  bgY: "#ddaa3c",

  //字体大小
  size12: "0.089888rem",
  size14: "0.104869rem",
  size16: "0.11985rem",
  size18: "0.134831rem",
  size20: "0.149813rem",
  size22: "0.164794rem",
  size24: "0.179775rem",
  size26: "0.194757rem",
  size28: "0.209738rem",
  size30: "0.224719rem",
  size32: "0.2397rem",
  size36: "0.269663rem",
  size40: "0.299625rem",
  size42: "0.314607rem",
  size44: "0.329588rem"
};
export default $;
