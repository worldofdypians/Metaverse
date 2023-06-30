import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import ComfirmationModal from "../../screens/Marketplace/MarketNFTs/ConfirmationModal";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import ethgrayLogo from "./assets/ethgrayLogo.svg";

const ItemCard = ({
  nft,
  single,
  isConnected,
  showConnectWallet,
  onProceedBuy,
  isCaws,
  isTimepiece,
  isWod,
  coinbase,
  ethTokenData,
  dypTokenData,
  isFavorite,
  onFavorite,
  lastSold,
  isLatestSale,
  isListed,
  soldPriceType,
}) => {
  const [isOwner, setisOwner] = useState(false);
  const [IsApprove, setIsApprove] = useState(false);
  const [buttonTxt, setbuttonTxt] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [status, setStatus] = useState("initial");

  const location = useLocation();

  const checkOwner = (nftItem) => {
    if (coinbase === undefined) {
      setisOwner(false);
    } else if (coinbase) {
      if (
        nftItem.seller &&
        nftItem.seller.toLowerCase() === coinbase.toLowerCase()
      ) {
        setisOwner(true);
      }

      if (
        nftItem.buyer &&
        nftItem.buyer.toLowerCase() === coinbase.toLowerCase()
      ) {
        setisOwner(true);
      }
    }
  };

  const isApprovedBuy = async (amount) => {
    const result = await window.isApprovedBuy(amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  const checkapprove = async (nftItem) => {
    if (isConnected === true && nftItem.payment_priceType === 1) {
      isApprovedBuy(nftItem.price).then((isApproved) => {
        console.log(isApproved);
        setbuttonTxt(isApproved ? "Buy" : "Approve");
        setIsApprove(isApproved);
      });
    }
  };

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

  async function addNFTToUserFavorites(userId, tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/user-favorites/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId, nftAddress }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Error adding NFT to user favorites");
      }
      const data = await response.json();
      onFavorite();
      return data.favorites;
    } catch (error) {
      console.log(error);

      console.error("Error adding NFT to user favorites:", error);
      throw error;
    }
  }

  async function deleteNFTFromUserFavorites(userId, tokenId, nftAddress) {
    fetch(
      `https://api.worldofdypians.com/user-favorites/${userId}/${tokenId}/${nftAddress}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok || response.status === 204 || response.status === 404) {
          // NFT removed successfully or was not found (404)
          console.log("NFT removed from favorites");
          onFavorite();
        } else {
          // Handle other status codes as errors
          console.error(
            "Failed to remove NFT from favorites. Status:",
            response.status
          );
        }
      })
      .catch((error) => {
        // Handle network or fetch error
        console.error("Error removing NFT from favorites:", error);
      });
  }

  const handleFavorite = async (nft) => {
    if (isConnected) {
      if (isFavorite === true) {
        await deleteNFTFromUserFavorites(
          coinbase,
          parseInt(nft.tokenId),
          nft.nftAddress
        );
      }
      if (!isFavorite) {
        await addNFTToUserFavorites(
          coinbase,
          parseInt(nft.tokenId),
          nft.nftAddress
        );
      }
    } else showConnectWallet();
  };

  async function handleBuy(nft) {
    console.log("nft", nft);
    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      setbuttonTxt("Buy");

      console.log("buying");
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then((result) => {
          console.log("buyNFT", result);
          setShowToast(true);
          setToastTitle("Successfully purchased!");
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setbuttonTxt("Approve");

      console.log("approve buying");
      await window
        .approveBuy(nft.price)
        .then((result) => {
          setbuttonTxt("Buy");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  const handleBuyState = async (nft) => {
    if (!isOwner && isConnected) {
      onProceedBuy();
    }

    if (!isConnected) {
      showConnectWallet();
    }
  };

  useEffect(() => {
    // getAllFavs(nft);
    checkOwner(nft);
    if (
      location.pathname.includes("/marketplace/caws") ||
      location.pathname.includes("/marketplace/wod") ||
      location.pathname.includes("/marketplace/timepiece")
    ) {
      checkapprove(nft);
    }
  }, [nft, isFavorite, coinbase]);

  useEffect(() => {
    if (isConnected && status === "buy") {
      onProceedBuy();
    }
  }, [isConnected, status]);

  return (
    <div className="d-flex flex-column position-relative gap-1">
      <Toast showToast={showToast} title={toastTitle} />

      <div className="item-wrapper" style={{ maxWidth: "100%" }}>
        <div className="nftimg-bg position-relative">
          <div className="name-wrapper d-flex justify-content-center p-2">
            {!location.pathname.includes("/account") ? (
              <span className="nft-card-name">
                {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                {nft.tokenId}
              </span>
            ) : (
              <span className="nft-card-name">
                {isCaws
                  ? "Cats and Watches Society"
                  : isWod
                  ? "Genesis Land"
                  : "Caws Timepiece"}
              </span>
            )}
          </div>
          <img
            src={ethgrayLogo}
            alt=""
            className="ethgraylogo position-absolute"
          />
          <img
            className="w-100 h-100 p-0 nft-img"
            src={
              isCaws
                ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                : isWod
                ? `https://mint.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                : `https://timepiece.worldofdypians.com/thumbs150/${nft.tokenId}.png`
            }
            alt=""
          />
        </div>
        <div
          className={`d-flex flex-column gap-2 position-relative p-3 ${
            (location.pathname.includes("/marketplace/caws") ||
              location.pathname.includes("/marketplace/wod") ||
              location.pathname.includes("/marketplace/timepiece")) &&
            "topwrapper"
          }`}
        >
          <div
            className={`d-flex gap-2 justify-content-between ${
              (location.pathname.includes("/marketplace/caws") ||
                location.pathname.includes("/marketplace/wod") ||
                location.pathname.includes("/marketplace/timepiece")) &&
              "middlewrapper"
            } ${!isListed && "invisible"} `}
          >
            {!location.pathname.includes("/account") ? (
              <div className={`d-flex gap-2 m-0`}>
                {/* {nft.payment_priceType === 0 ? (
                  <img src={topEth} height={20} width={20} alt="" />
                ) : (
                  <img src={topDyp} height={20} width={20} alt="" />
                )} */}
                <div className="d-flex align-items-center gap-1">
                  <span
                    className="nft-price"
                    style={{ textDecoration: "none" }}
                  >
                    {getFormattedNumber(
                      nft.price / 1e18,
                      nft.payment_priceType === 0 ? 3 : 0
                    )}{" "}
                    {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                  </span>
                  <span
                    className={`nft-price-usd  ${
                      (location.pathname.includes("/marketplace/caws") ||
                        location.pathname.includes("/marketplace/wod") ||
                        location.pathname.includes("/marketplace/timepiece")) &&
                      "nft-price-usdhover"
                    } ${!isListed && "nft-price-usdhover2"}`}
                    style={{ color: "#7DD9AF" }}
                  >
                    $
                    {getFormattedNumber(
                      nft.payment_priceType === 0
                        ? ethTokenData * (nft.price / 1e18)
                        : dypTokenData * (nft.price / 1e18),
                      0
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <span className="nft-card-name">
                {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                {nft.tokenId}
              </span>
            )}
            {/* <img
              src={isFavorite ? favActive : favInactive}
              onClick={(e) => {
                handleFavorite(nft);
                e.preventDefault();
                e.stopPropagation();
              }}
              alt=""
              className={`${
                (location.pathname.includes("/marketplace/caws") ||
                  location.pathname.includes("/marketplace/wod") ||
                  location.pathname.includes("/marketplace/timepiece")) &&
                "favoritehover"
              } `}
            /> */}
          </div>
          {lastSold && (
            <div
              className={`d-flex align-items-center position-relative ${
                !isListed && "lastsoldwrapper"
              }`}
              style={{ bottom: isListed ? 0 : 15, height: 0 }}
            >
              <span className="lastsold">
                Last Sale:{" "}
                {getFormattedNumber(
                  lastSold / 1e18,
                  nft.soldPriceType === 0 ? 2 : 0
                )}{" "}
                {nft.soldPriceType === 0 ? "ETH" : "DYP"}
              </span>
            </div>
          )}
        </div>
        {(location.pathname.includes("/marketplace/caws") ||
          location.pathname.includes("/marketplace/wod") ||
          location.pathname.includes("/marketplace/timepiece")) &&
          isListed && (
            <div className="buy-nft w-100">
              <button
                className="buy-nft-btn w-100"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                onClick={(e) => {
                  handleBuyState(nft);
                  setStatus();
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {" "}
                {/* {isConnected === true ? (
                  nft.payment_priceType === 1 && !isOwner ? (
                    <>{buttonTxt}</>
                  ) : nft.payment_priceType === 1 && isOwner ? (
                    "View details"
                  ) : (
                    "Buy"
                  )
                ) : (
                  "Connect wallet"
                )}{" "} */}
                Buy
              </button>
            </div>
          )}
        {(location.pathname.includes("/marketplace/caws") ||
          location.pathname.includes("/marketplace/wod") ||
          location.pathname.includes("/marketplace/timepiece")) &&
          !isListed && (
            <div className="buy-nft w-100">
              <button
                className="view-nft-btn w-100"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                View details
              </button>
            </div>
          )}
      </div>
      {!location.pathname.includes("/marketplace/caws") &&
        !location.pathname.includes("/marketplace/wod") &&
        !location.pathname.includes("/marketplace/timepiece") &&
        !location.pathname.includes("/account") && (
          <span
            className="position-relative top-sale-time"
            style={{ bottom: "-8%" }}
          >
            {getRelativeTime(nft.blockTimestamp)}
          </span>
        )}
    </div>
  );
};

export default ItemCard;
