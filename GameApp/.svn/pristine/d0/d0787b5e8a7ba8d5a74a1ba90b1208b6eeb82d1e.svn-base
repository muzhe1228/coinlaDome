import React, { Component } from "react";
import propTypes from "prop-types";
import { TransitionMotion, spring } from "react-motion";
import "../select.less";

class Select extends Component {
  static props = {
    name: propTypes.string,
    label: propTypes.string,
    value: propTypes.string,
    onChange: propTypes.func.require,
    config: propTypes.object.require
  };
  state = {
    dropDown: true
  };
  static defalutProps = {};
  changeItem = (name, value, label) => {
    const { onChange } = this.props;
    this.setState({ dropDown: true });
    onChange(name, value, label);
  };
  selectClick = () => {
    let { dropDown } = this.state;
    this.setState({ dropDown: !dropDown });
  };
  componentDidMount() {
    document.addEventListener("click", this.eventListener);
  }
  eventListener = ev => {
    if (this.selectContainer && !this.selectContainer.contains(ev.target)) {
      console.log(this.selectContainer)
      !this.state.dropDown && this.setState({ dropDown: true });
    }
  };
  componentWillUnmount() {
    document.removeEventListener("click", this.eventListener);
  }
  render() {
    const { name, config, value } = this.props;
    const { dropDown } = this.state;
    const borderCls = dropDown ? "" : "blueBorder";
    return (
      <div
        className={"select-comp " + borderCls}
        onClick={() => this.selectClick()}
        ref={container => {
          this.selectContainer = container;
        }}
      >
        {value || value === 0 ? (
          config.options &&
          config.options.map((item, idx) => {
            if (value == item.value) {
              return (
                <p key={idx}>
                  {item.label}
                  <i className="iconfont">&#xe627;</i>
                </p>
              );
            }
            return "";
          })
        ) : config.placeholder ? (
          <span>{config.placeholder}</span>
        ) : (
          ""
        )}
        <ul>
          {config &&
            config.options &&
            config.options.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => this.changeItem(name, item.value, item.label)}
                  className={item.value === value ? "active" : ""}
                >
                  {item.label}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Select;
