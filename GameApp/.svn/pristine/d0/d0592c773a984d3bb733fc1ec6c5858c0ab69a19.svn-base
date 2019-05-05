import React, { Component } from "react";
import { wrapper, BackGround, OpenListDiv } from "./style";

class ScreeningAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Select: 0,
      OpenList: false,
      dataArray: []
    };

    this.ClickType = this.ClickType.bind(this);
  }

  render() {
    const { list, TypeIndex, SelectItemAction } = this.props;
    const { Select, OpenList } = this.state;

    return (
      <BackGround list={list}>
        <p className={"title"} onClick={this.ClickType}>
          {list[TypeIndex]}
          <i className={"iconfont"}>&#xe627;</i>
        </p>
        {OpenList && (
          <OpenListDiv list={list}>
            {list.map((item, index) => {
              return (
                <p
                  className={TypeIndex === index ? "select" : ""}
                  onClick={() => {
                    SelectItemAction(index);
                  }}
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          </OpenListDiv>
        )}
      </BackGround>
    );
  }

  componentDidMount() {
    let _this = this;
    document.addEventListener("click", function(e) {
      console.log("点击屏幕");
      _this.setState({
        OpenList: false
      });
    });
  }

  ClickType(e) {
    console.log("点击标题");
    this.setState({
      OpenList: true
    });
    e.nativeEvent.stopImmediatePropagation();
  }
}

export default ScreeningAlert;
