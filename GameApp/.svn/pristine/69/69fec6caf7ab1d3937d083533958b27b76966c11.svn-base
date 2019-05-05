import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import GameTimer from "components/GameTimer";
import { CenterInfoWrapper, InfoWrapper, CenterButton } from "../style";
const list = [[0, 1, 2, 3], [9, "info", 4], [8, 7, 6, 5]];
class CenterInfo extends Component {
  static propTypes = {
    isType: PropTypes.bool,
    check: PropTypes.array
  };
  static defaultProps = {
    isType: true,
    check: []
  };

  classCheck(item, check) {
    if (check.length) {
      for (let i = 0; i < check.length; i++) {
        if (check[i] === item) {
          return "active";
        }
      }
    }
    if (item === "info") {
      return "info";
    }
  }
  render() {
    const {
      check,
      handleNum,
      isButton,
      onOkBtn,
      onClose,
      timer,
      FengImg
    } = this.props;
    return (
      <CenterInfoWrapper>
        {list.map((item, index) => {
          return (
            <InfoWrapper key={index}>
              {item.map(item1 => {
                return (
                  <li
                    className={this.classCheck(item1, check)}
                    key={item1}
                    onClick={() => {
                      handleNum(item1);
                    }}
                  >
                    {item1 === "info" ? <GameTimer timer={timer} /> : item1}
                  </li>
                );
              })}
            </InfoWrapper>
          );
        })}
        {isButton && (
          <CenterButton>
            <button onClick={onOkBtn}>确定</button>
            <button onClick={onClose}>取消</button>
          </CenterButton>
        )}
      </CenterInfoWrapper>
    );
  }
}

export default CenterInfo;
