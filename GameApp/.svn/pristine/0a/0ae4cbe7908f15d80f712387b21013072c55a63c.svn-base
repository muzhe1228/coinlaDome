import React from "react";
import { SizeItemWrapper, SizeCenterWrapper, SizeSub } from "../style";
import PK from "images/home/Pk.png";
const SizeItem = function(props) {
  const { title, info, center, Bg, Avatart, onClick, Data, BankData } = props;
  return (
    <SizeItemWrapper onClick={onClick}>
      <p>{title}</p>
      <SizeCenterWrapper Center={center} Bg={Bg} info={info} Avatart={Avatart}>
        <button className="zhuang">{title}</button>
        {info && BankData ? (
          <p className="introd">连庄：1/10</p>
        ) : (
          Data && (
            <SizeSub title={title}>
              <p>Hash:52--56</p>
              <p>
                {Data.positionAssets}/{Data.peopleNumber}
                <img src={PK} alt="" />
              </p>
            </SizeSub>
          )
        )}
      </SizeCenterWrapper>
    </SizeItemWrapper>
  );
};
SizeItem.defaultProps = {
  Bg: false,
  info: false
};
export default SizeItem;
