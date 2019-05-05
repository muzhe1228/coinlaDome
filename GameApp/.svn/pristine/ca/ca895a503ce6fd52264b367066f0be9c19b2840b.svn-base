import React from "react";
import {withRouter} from 'react-router-dom';
import Loadable from "react-loadable";

const LoadableComponent = Loadable({
  loader: () => import("./"),
  loading() {
    return <div>正在加载...</div>;
  }
});

export default withRouter(LoadableComponent);
