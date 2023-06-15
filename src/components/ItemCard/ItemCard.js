import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/dypIcon.svg";
import { useLocation } from "react-router-dom";

const ItemCard = ({
  nft,
  single,
  isConnected,
  showConnectWallet,
  isCaws,
  isTimepiece,
  isWod,
}) => {
  
  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = nftTimestamp;
    const difference = seconds - oldTimestamp;
    let output = ``;
    
    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };
  return (
    <div className="d-flex flex-column position-relative gap-1">
      <div className="item-wrapper" style={{ maxWidth: "100%" }}>
        <div className="nftimg-bg position-relative">
          <div className="name-wrapper d-flex justify-content-center p-2">
            <span className="nft-card-name">
              {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
              {nft.tokenId}
            </span>
          </div>
          <img
            className="w-100 h-100 p-0 nft-img"
            src={
              isCaws
                ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                : isWod
                ? `https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`
                : `https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`
            }
            alt=""
          />
        </div>
        <div className="d-flex flex-column gap-2 position-relative p-3">
          <div className="d-flex align-items-center gap-1">
            {nft.payment_priceType === 0 ? (
              <img src={topEth} height={20} width={20} alt="" />
            ) : (
              <img src={topDyp} height={20} width={20} alt="" />
            )}
            <span className="nft-price" style={{ textDecoration: "none" }}>
              {nft.price.slice(0, 5)}{" "}
              {nft.payment_priceType === 0 ? "ETH" : "DYP"}
            </span>
          </div>
        </div>
      </div>
      <span
        className="position-relative top-sale-time"
        style={{ bottom: "-8%" }}
      >
        {getRelativeTime(nft.blockTimestamp)}
      </span>
    </div>
  );
};

export default ItemCard;
