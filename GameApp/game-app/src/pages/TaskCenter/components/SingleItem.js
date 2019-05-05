import React, { Component } from "react";
import SingleCenterItem from "./SingleCentertem";
import { SingleWrapper, SingleTitle } from "../style";

class SingleItem extends Component {
  render() {
    const { title, SingleList } = this.props;
    return (
      <SingleWrapper>
        <SingleTitle>{title}</SingleTitle>
        {
          SingleList.map((item)=>{
            return<SingleCenterItem key={item.atId} ItemData={item} handToActive={this.props.handToActive}/>
          })
        }
      </SingleWrapper>
    );
  }
}

export default SingleItem;
