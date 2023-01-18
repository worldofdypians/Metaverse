import React from "react";
import "./_landPlaceholder.scss";

const LandPlaceHolder = ({ onMintClick }) => {
  return (
    <div className="landplaceholder-wrapper nft-caw-card" style={{ width: 195 }}>
      <div className="landplaceholder-content">
        <img
          src={require("../../assets/landAssets/landplaceholder.svg").default}
          alt=""
          className="landplaceholder-content-img"
        />
        <p className="landplaceholder-content-text">
          You can view all your NFTs to manage them
        </p>
        <div
              className={"linear-border" }
            >
              <button
                className={`btn outline-btn px-3`}
              >
                Mint more NFTs
              </button>
            </div>
      </div>
    </div>
  );
};

export default LandPlaceHolder;
