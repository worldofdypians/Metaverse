import React, { useEffect, useState } from "react";
import opensea from "./opensea.svg";
import ethLogo from "../../assets/eth.svg";

const NftCard = ({ image, title, content, id }) => {
  return (
    <div className="news-card-wrapper" style={{ width: "fit-content" }}>
      <a
        href={`https://opensea.io/assets/ethereum/0xcd60d912655281908ee557ce1add61e983385a03/${id}`}
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noreferrer"
      >
        <div className={`news-card p-3 d-flex flex-column gap-3`}>
          <div className="d-flex flex-column align-items-start justify-content-between gap-3">
            <div className="d-flex align-items-start">
              <img src={image} alt="news image" className="nft-image" />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column gap-0 w-100">
              <div className="update-title font-organetto m-0">{title}</div>
              <div className="news-content font-poppins d-flex flex-column justify-content-center">
                <span className="pricetxt">Price:</span>
                <p className="d-flex align-items-center gap-1 m-0">
                  0.95 <img src={ethLogo} alt="" className="ethlogo" />
                </p>
              </div>
            </div>
            <div
              className={"linear-border-purple"}
              style={{ height: "fit-content" }}
            >
              <a
                className={`btn purple-btn px-4 d-flex gap-2 align-items-center`}
                href={`https://opensea.io/assets/ethereum/0xcd60d912655281908ee557ce1add61e983385a03/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={opensea} alt="" />
                OpenSea
              </a>
            </div>
          </div>
          {/* <div
            className={`d-flex align-items-center gap-2`}
            style={{ cursor: "pointer" }}
          ></div> */}
        </div>
      </a>
    </div>
  );
};

export default NftCard;
