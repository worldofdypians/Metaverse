import React, { useState, useEffect } from "react";
import "./_itemcard.scss";

import _ from "lodash";

const CawsWodItem = ({ cawsImg, wodImg, cawsName, wodName }) => {
  return (
    <div className="row px-3 m-0">
      <div className="account-nft-card w-100 d-flex align-items-center gap-3 p-0">
        <div className="">
          <div className="d-flex col-12">
            <img className="account-card-img" src={wodImg} alt="" />
            {cawsImg && (
              <img className="account-card-img" src={cawsImg} alt="" />
            )}
          </div>
        </div>
        <div className={`d-flex flex-column gap-2 position-relative`}>
          <div className={`d-flex gap-2 justify-content-between`}>
            {cawsName ? (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h6 className="account-nft-title">
                  Land {wodName} x {cawsName}
                </h6>
                <span className="account-nft-type">Land + CAWS</span>
              </div>
            ) : (
              <span className="account-nft-title">{wodName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsWodItem;
