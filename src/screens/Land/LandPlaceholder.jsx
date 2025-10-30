import React from "react";
import "./_landPlaceholder.scss";

const LandPlaceHolder = ({ onMintClick }) => {
  return (
    <div
      className="landplaceholder-wrapper nft-caw-card"
      style={{ width: 195 }}
    >
      <div className="landplaceholder-content">
        <img
          src={"https://cdn.worldofdypians.com/wod/landplaceholder.svg"}
          alt=""
          className="landplaceholder-content-img"
        />
        <p className="landplaceholder-content-text">
          You can view all your NFTs to manage them
        </p>
        <div className={"linear-border"}>
          <button className={`btn outline-btn px-3`} onClick={onMintClick}>
            Mint more NFTs
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandPlaceHolder;
