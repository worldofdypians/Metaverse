import React from "react";
import timepieceplaceholder2 from './assets/timepieceplaceholder2.png'

const TimepiecePlaceHolder = ({ onMintClick }) => {
  return (
    <div
      className="landplaceholder-wrapper nft-caw-card"
      style={{ width: 195 }}
    >
      <div className="landplaceholder-content">
        <img
          src={timepieceplaceholder2}
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

export default TimepiecePlaceHolder;
