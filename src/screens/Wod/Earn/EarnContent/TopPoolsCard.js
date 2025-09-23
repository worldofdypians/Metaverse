import React, { useState } from "react";
import "./top-pools.css";
// import greenArrow from "../assets/greenarrow.svg";
// import staked from "../assets/staked.svg";

import getFormattedNumber from "../../../Caws/functions/get-formatted-number";

const TopPoolsCard = ({
  isAccount,
  tokenLogo,
  tokenName,
  apr,
  lockTime,
  tvl,
  onShowDetailsClick,
  onHideDetailsClick,
  cardType,
  renderedPage,
  details,
  isStaked,
  isNewPool,
  tag,
  display,
  expired,
  network,
  isPremium,
  isHover,
  availableQuota,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetails = () => {
    // if (details === false) {
    onShowDetailsClick();
    // } else if (details === true) {
    // onHideDetailsClick();
    // }
  };

  return (
    <>
      <div
        className={`w-100  ${
          expired === true
            ? "poolscardwrapperexpired"
            : network === "0"
            ? "blurryCard"
            : "poolscardwrapper"
        } cursor-pointer position-relative ${
          details && tag === "exclusive"
            ? "pools-card-open-bnb"
            : details && !tag
            ? "pools-card-open"
            : ""
        }  ${
          isHover && tag === "exclusive"
            ? "pools-card-hover-bnb"
            : isHover && !tag
            ? "pools-card-hover"
            : ""
        } 
         ${isStaked && !isHover && tag !== "exclusive" && "pools-card-staked"}
         ${isStaked && !isHover && tag === "exclusive" && "pools-card-stakedbnb"}`}
        onClick={() => handleDetails()}
        style={{ display: display }}
        onMouseEnter={() => {
          setShowDetails(true);
        }}
        onMouseLeave={() => {
          setShowDetails(false);
        }}
      >
        {/* {isStaked && isPremium && (
          <img
            src={staked}
            className="staked"
            alt="staked"
            style={{ right: isAccount === true ? 60 : "" }}
          />
        )} */}

        {/* {tvl === '--' && (
          <img src={comingSoon} className="comingsoon" alt="top pick" />
        )} */}
        {isNewPool && (
          <img
            src={"https://cdn.worldofdypians.com/wod/newPool4.png"}
            className="new-pool"
            alt="new pool"
          />
        )}
        {tag && (
          <img
            src={
              tag === "stake"
                ? `https://cdn.worldofdypians.com/wod/stakeTag.svg`
                : tag === "nft"
                ? "https://cdn.worldofdypians.com/wod/cawsLabel.png"
                : tag === "exclusive"
                ? "https://cdn.worldofdypians.com/wod/exclusiveTag.png"
                : `https://cdn.worldofdypians.com/wod/stakeTag.svg`
            }
            alt="pool-tag"
            className={`dashboard-pool-tag d-none d-lg-flex ${
              tag === "exclusive" && "exclusive-tag"
            } `}
          />
        )}

        <div className="orangediv-stake" style={{ top: "12px" }}></div>
        <div className="d-flex flex-column gap-0">
          <div className="d-flex m-0 justify-content between gap-2 align-items-center justify-content-between title-apr-wrapper">
            <div className="d-flex align-items-center gap-2">
              {tokenLogo !== undefined &&
                tokenLogo.map((obj, index) => {
                  return (
                    <img
                      key={index}
                      src={`https://cdn.worldofdypians.com/wod/${obj}.png`}
                      alt=""
                      className="pool-coins"
                      width={32}
                      height={32}
                    />
                  );
                })}
              {/* <h6 className="token-name m-0 d-flex align-items-center">
                {tokenName}
              </h6> */}
              <div className="d-flex align-items-baseline gap-1">
                <h6 className="apr-amount m-0 ">{apr}</h6>
                <h6 className="apr-title m-0 d-flex gap-2 align-items-center">
                  APR
                  {apr === "30%" && (
                    <img
                      src={"https://cdn.worldofdypians.com/wod/fireEmoji.png"}
                      alt=""
                      className="w-4"
                    />
                  )}{" "}
                </h6>
              </div>
            </div>
            {/* <div className="d-flex align-items-baseline gap-1">
              <h6 className="apr-amount m-0 ">{apr}</h6>
              <h6 className="apr-title m-0 ">APR</h6>
            </div> */}
            <div
              className={`d-flex flex-column ${
                cardType !== "Vault" && "align-items-end"
              }`}
            >
              <h6 className="tvl-text m-0">Lock Time</h6>

              <h6 className="locktime-amount m-0">{lockTime}</h6>
            </div>
          </div>
          <div
            className={`d-flex m-0 justify-content between gap-2 align-items-center justify-content-between ${
              expired === true ? "bottomwrapperExpired" : "bottomwrapper2"
            } } `}
          >
            {cardType !== "Vault" && (
              <div className="d-flex flex-column">
                <h6 className="tvl-text m-0 ">Total Staked</h6>
                <h6 className="tvl-amount m-0 "> {tvl}</h6>
              </div>
            )}

            <div
              className={`d-flex flex-column ${
                cardType !== "Vault" && "align-items-end"
              }`}
            >
              <h6 className="tvl-text m-0">Available Quota</h6>

              <h6 className="locktime-amount m-0">
                {getFormattedNumber(availableQuota)}
              </h6>
            </div>
          </div>
          {tag === "exclusive" && (
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={"https://cdn.worldofdypians.com/tools/toppick.svg"}
                alt=""
                className="position-absolute bottom-0"
              />
            </div>
          )}
          {/* {tvl != "--" && (
            <div
              className={
                expired === true ? "details-wrapperexpired" : "details-wrapper"
              }
              onClick={() => {
                handleDetails();
              }}
            >
              <h6
                className="m-0 details-text gap-1 d-flex align-items-center"
                style={{
                  color:
                    details === false && expired === false
                      ? "#75CAC2"
                      : details === false && expired === true
                      ? "#C1CCF8"
                      : "#C0C9FF",
                }}
              >
                {details === false && expired === false
                  ? "Deposit"
                  : details === false && expired === true
                  ? "Details"
                  : "Close"}
                <img src={greenArrow} alt="" />
              </h6>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default TopPoolsCard;
