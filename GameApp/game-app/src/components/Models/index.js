import React, { Component } from "react";
import { ExolainWrapper } from "./style";
import { Motion, spring, presets } from "react-motion";
class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.toggole = this.toggole.bind(this);
  }
  toggole() {
    this.setState({
      show: this.state.show ? false : true
    });
  }
  render() {
    const { show } = this.state;
    return (
      <Motion
        defaultStyle={{
          opacity: 0.8,
          scale: 0.8
        }}
        style={{
          opacity: spring(show ? 1 : 0, presets.stiff),
          scale: spring(show ? 1 : 0.8, presets.stiff)
        }}
        onRest={this.onRest}
      >
        {({ opacity, scale }) => (
          <ExolainWrapper style={{ opacity }}>
            <div  style={{
                opacity,
                transform: `scale(${scale})`
              }}>
              <div>hello</div>
              <div>hello</div>
              <div>hello</div>
            </div>
            <button onClick={this.toggole}>toggle</button>
          </ExolainWrapper>
        )}
      </Motion>
    );
  }
}

export default Models;
