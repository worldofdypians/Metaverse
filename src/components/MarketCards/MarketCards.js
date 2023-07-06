import React from "react";
import "./_marketCards.scss";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";

const MarketCards = ({
  nft,
  activebtn,
  eventTitle,
  eventPrice,
  eventImg,
  ethTokenData,
  coinbase,
}) => {
  return (
    <div className="marketCards-wrapper h-100">
      <div className="d-flex flex-column gap-2 h-100 justify-content-between">
        <div className="">
          {activebtn === "events" && (
            <img
              src={require(`./assets/${eventImg}.png`)}
              alt=""
              className="marketicon"
            />
          )}
          {activebtn === "land" ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={`https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`}
              alt=""
            />
          ) : activebtn === "caws" ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={`https://mint.dyp.finance/thumbs/${nft.tokenId}.png`}
              alt=""
            />
          ) : activebtn === "timepiece" ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={`https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`}
              alt=""
            />
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex justify-content-between gap-2 align-items-center">
          {activebtn === "events" ? (
            <span className="nftcard-name">{eventTitle}</span>
          ) : activebtn === "land" ? (
            <span className="nftcard-name">Genesis Land #{nft?.tokenId}</span>
          ) : activebtn === "caws" ? (
            <span className="nftcard-name">CAWS #{nft?.tokenId}</span>
          ) : (
            <span className="nftcard-name">Timepiece #{nft?.tokenId}</span>
          )}

          <div className="d-flex flex-column">
            <span className="nftcard-name">
              {activebtn === "events"
                ? eventPrice
                : getFormattedNumber(nft.price / 1e18, 2)}{" "}
              {activebtn !== "events" && "ETH"}
            </span>
            <span className="nftcard-usd">
              {activebtn === "events"
                ? ""
                : getFormattedNumber(ethTokenData * (nft.price / 1e18), 2)}
            </span>
          </div>
        </div>
        <button className="buybtnmarket">Buy</button>
      </div>
    </div>
  );
};

export default MarketCards;
