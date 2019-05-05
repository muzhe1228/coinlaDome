import React, { Component } from "react";
import "./style.less";
class ProgressD extends Component {
  render() {
    const { styles } = this.props;
    return (
      <div className="ProgressWrap">
        <div className="Progress">
          <p style={styles}>
            {styles.backgroundColor === "transparent" ? "" : <span />}
          </p>
        </div>
        <p
          style={{
            color:
              styles.backgroundColor === "transparent"
                ? "#fff"
                : styles.backgroundColor
          }}
        >
          {styles.width}
        </p>
      </div>
    );
  }
}

export default ProgressD;
