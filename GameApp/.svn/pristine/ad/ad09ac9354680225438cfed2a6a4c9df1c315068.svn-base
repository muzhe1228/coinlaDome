import { createGlobalStyle } from "styled-components";
import Eot from "style/iconfont/iconfont.eot";
import Svg from "style/iconfont/iconfont.svg";
import Ttf from "style/iconfont/iconfont.ttf";
import Woff from "style/iconfont/iconfont.woff";
const CommonStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  list-style: none;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: Trebuchet MS, Tahoma, Arial, helvetica, sans-serif !important;
  font-weight: 400;
  line-height: 1;
}
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
  font-size: 12px;
  color: #454545;
  position: fixed;
  left: 0;
  top: 0;
  p,h1,h2,h3,h4,h5,h6,ul,ol,dl{
    margin: 0;
    padding: 0;
    line-height: 1;
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  #root {
    height: 100%;
  }
}
button,input,textarea{
  outline: none;
}
@font-face {
  font-family: 'iconfont';
  src: url(${Eot});
  src: url(${Eot}) format('embedded-opentype'),
      url(${Woff}) format('woff'),
      url(${Ttf}) format('truetype'),
      url(${Svg}) format('svg');
}

/* @font-face {
  font-family: 'iconfont';  
  src: url('//at.alicdn.com/t/font_885405_5480lmjkcve.eot');
  src: url('//at.alicdn.com/t/font_885405_5480lmjkcve.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_885405_5480lmjkcve.woff') format('woff'),
  url('//at.alicdn.com/t/font_885405_5480lmjkcve.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_885405_5480lmjkcve.svg#iconfont') format('svg');
} */
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media screen and (orientation: portrait) {
  body {
    width: 100vh !important;
    height: 100vw !important;
    transform-origin: 0 0;
    transform: rotate(90deg) translateY(-100%) translateZ(0);
  }
}

.f-l {
  float: left;
}
.f-r {
  float: right;
}
.clear-f:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.clear-f {
  zoom: 1;
}
.ajax-loading{
  display: none;
  .loading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:0 40px;
    height: 80px;
    line-height: 80px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 6px;
    text-align: center;
    z-index: 9999;
    color:#fff;
    img{
      width: 32px;
      vertical-align: middle;
    }
    span{
      margin-left:12px;
    }
  }
  .overlay{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9998;
    background: rgb(255, 255, 255);
    opacity: 0.1;
  }
}
.color1 {
    color: #51a460;
  }
  .color2 {
    color: #ddc594;
  }
  .color3 {
    color: #347dc0;
  }
  .color4 {
    color: #8b78c6;
  }
`;

/****/

export default CommonStyle;
