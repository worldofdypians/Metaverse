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
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column item-wrapper position-relative"
      style={{ maxWidth: "100%" }}
    >
      {" "}
      <div className="nftimg-bg position-relative">
        <div className="name-wrapper d-flex justify-content-center p-2">
          <span className="nft-card-name">
            {" "}
            {isCaws
              ? "Cats And Watches Society"
              : isWod
              ? "World of Dypians"
              : "CAWS Timepiece"}{" "}
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
      </div>{" "}
      <div className="d-flex flex-column gap-2 position-relative p-3">
        <span className="nft-name" style={{ textDecoration: "none" }}>
          {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
          {nft.tokenId}
        </span>
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
      {location.pathname.includes("caws") ||
      location.pathname.includes("wod") ||
      location.pathname.includes("timepiece") ? null : (
        <span
          className="position-absolute top-sale-time"
          style={{ bottom: "-8%" }}
        >
          a few seconds ago
        </span>
      )}
    </div>
  );
};

export default ItemCard;
