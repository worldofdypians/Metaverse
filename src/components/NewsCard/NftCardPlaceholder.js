import React from "react";
import opensea from "./opensea.svg";

const NftCardPlaceholder = ({count}) => {
  return (
    <div className="news-card-wrapper position-relative" style={{ width: "fit-content" }}>
      <div className="count-number p-2 d-flex align-items-center justify-content-center">
        <h6 className="nft-count">{count}</h6>
      </div>
      <div className={`eventnews-card p-3 d-flex flex-column gap-3`}>
        <div className="d-flex flex-column align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-start">
            <img
              src={require("../../assets/landAssets/landNft.webp")}
              alt="news image"
              className="nft-image"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div
            className={"linear-border-purple w-100"}
            style={{ height: "fit-content" }}
          >
            <a
              className={`btn purple-btn px-4 d-flex gap-2 align-items-center justify-content-center`}
              href={`https://opensea.io/collection/worldofdypians`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={opensea} alt="" />
              Buy on OpenSea
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCardPlaceholder;
