import React from "react";
import "./_marketCards.scss";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import ethlogo from "./assets/ethlogo.svg";
import bnblogo from "./assets/bnblogo.svg";
import { Tooltip, styled, tooltipClasses } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "100px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const MarketCards = ({
  nft,
  activebtn,
  eventTitle,
  eventPrice,
  eventImg,
  eventDesc,
  ethTokenData,
  coinbase,
  dyptokenDatabnb,
  idyptokenDatabnb,
  price,
}) => {
  return (
    <div className="marketCards-wrapper h-100">
      <div className="d-flex flex-column gap-2 h-100 justify-content-between">
        <div className="position-relative">
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
              style={{borderRadius: '10px'}}
            />
          ) : activebtn === "caws" ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={`https://mint.dyp.finance/thumbs/${nft.tokenId}.png`}
              alt=""
              style={{borderRadius: '10px'}}
            />
          ) : activebtn === "timepiece" ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={`https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`}
              alt=""
              style={{borderRadius: '10px'}}
            />
          ) : (
            <></>
          )}
          {activebtn !== "events" && (
            <HtmlTooltip
              placement="top"
              title={
                <span className="card-eth-chain-text">Chain: Ethereum</span>
              }
            >
              <img
                src={ethlogo}
                alt=""
                className="ethgraylogo position-absolute"
              />
            </HtmlTooltip>
          )}

          {activebtn === "events" && eventImg === "critical" ? (
            <HtmlTooltip
              placement="top"
              title={
                <span className="card-eth-chain-text">Chain: Ethereum</span>
              }
            >
              <img
                src={ethlogo}
                alt=""
                className="ethgraylogo position-absolute"
              />
            </HtmlTooltip>
          ) : activebtn === "events" && eventImg !== "critical" ? (
            <HtmlTooltip
              placement="top"
              title={
                <span className="card-eth-chain-text">Chain: BNB Chain</span>
              }
            >
              <img
                src={bnblogo}
                alt=""
                className="ethgraylogo position-absolute"
              />
            </HtmlTooltip>
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex justify-content-between gap-2 align-items-center">
          {activebtn === "events" ? (
            eventDesc === "Event available for Genesis Land NFT owners" || eventDesc === "Event available for Beta Pass NFT owners" || eventDesc === "Daily Bonus Event is available for all users"
            ?
            <div className="d-flex flex-column">
            <span className="nftcard-name">{eventTitle}</span>
            <span className="nftcard-usd" style={{textAlign: "left"}}>{eventDesc}</span>
            </div>
            :
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
            {eventImg !== "critical" && eventImg !== "treasureHunt" && eventImg !== "dailyBonus" && "$"}
              {activebtn === "events"
                ? eventImg === "puzzle"
                  ? getFormattedNumber(idyptokenDatabnb * price, 2)
                  : eventImg === "critical" || eventImg === "treasureHunt" || eventImg === "dailyBonus"
                  ? ""
                  : 'N/A'
                  //  getFormattedNumber(dyptokenDatabnb * price, 2)
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
