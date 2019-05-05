import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { InfoWrapper } from "../style";
const list = [[0, 1, 2, 3], [9, "info", 4], [8, 7, 6, 5]];
class InfoWrap extends Component {
  static propTypes = {
    isType: PropTypes.bool,
    check: PropTypes.number
  };
  static defaultProps = {
    isType: true,
    check: 0
  };
  classCheck(item, check) {
    switch (item) {
      case check:
        return "active";
      case "info":
        return item;
      default:
        return "";
    }
  }
  render() {
    const { check } = this.props;
    return (
      <Fragment>
        {list.map((item, index) => {
          return (
            <InfoWrapper key={index}>
              {item.map(item1 => {
                return (
                  <li className={this.classCheck(item1, check)} key={item1}>
                    {item1 === "info" ? (
                      <Fragment>
                        9<p>赔率：</p>
                      </Fragment>
                    ) : (
                      item1
                    )}
                  </li>
                );
              })}
            </InfoWrapper>
          );
        })}
      </Fragment>
    );
  }
}

export default InfoWrap;
