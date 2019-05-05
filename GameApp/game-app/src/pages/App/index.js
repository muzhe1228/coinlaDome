import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../../store";
import SubIndex from "./SubIndex";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SubIndex dom={this} />
      </Provider>
    );
  }
}

export default App;
