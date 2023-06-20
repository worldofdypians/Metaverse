import React, { useState, useEffect } from "react";
import "./_itemcard.scss";

import _ from "lodash";

const CawsWodItem = ({ cawsImg, wodImg, cawsName, wodName }) => {
  return (
    <div className="d-flex flex-column position-relative gap-1">
      <div className="item-wrapper" style={{ maxWidth: "100%" }}>
        <div className="nftimg-bg position-relative">
          <div className="name-wrapper d-flex justify-content-center p-2">
            {cawsName ? (
              <span className="nft-card-name">Genesis Land x CAWS</span>
            ) : (
              <span className="nft-card-name">Genesis Land</span>
            )}
          </div>
          <div className="d-flex col-12">
          <img className="p-0 nft-img w-100 h-100" src={wodImg} alt="" />
          {cawsImg && (
            <img className="p-0 nft-img  w-100 h-100 cawsimg" src={cawsImg} alt="" />
          )}</div>
        </div>
        <div className={`d-flex flex-column gap-2 position-relative p-3`}>
          <div className={`d-flex gap-2 justify-content-between`}>
            {cawsName ? (
              <span className="nft-card-name">{cawsName + "x" + wodName}</span>
            ) : (
              <span className="nft-card-name">{wodName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsWodItem;
