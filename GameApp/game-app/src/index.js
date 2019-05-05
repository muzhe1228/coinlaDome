import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import * as serviceWorker from "./serviceWorker";
import initReactFastclick from "react-fastclick";
import "common/resize";
import "common/minxin";
import "animate.css";
initReactFastclick(document.body);
ReactDOM.render(<Router />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
