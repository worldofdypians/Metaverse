import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/dypIcon.svg";
import favActive from "../../screens/Marketplace/assets/favActive.svg";
import favInactive from "../../screens/Marketplace/assets/favInactive.svg";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";


const ItemCard = ({
  nft,
  single,
  isConnected,
  showConnectWallet,
  isCaws,
  isTimepiece,
  isWod,
  coinbase,
}) => {
  const [dyptokenData, setDypTokenData] = useState(0);
  const [ethtokenData, setEthTokenData] = useState(0);
  const [isFavorite, setisFavorite] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [IsApprove, setIsApprove] = useState(false);
  const [buttonTxt, setbuttonTxt] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  

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

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
  };

  const getAllFavs = async (pairId) => {
    let favorites = await window.getFavoritesETH2();

    for (let i = 0; i < favorites.length; i++) {
      // console.log(favorites[i], pairId);

      if (
        favorites[i].nftAddress === pairId.nftAddress &&
        favorites[i].tokenId === pairId.tokenId &&
        ((favorites[i].seller && favorites[i].seller === pairId.seller) ||
          (favorites[i].buyer && favorites[i].buyer === pairId.buyer)) &&
        favorites[i].price === pairId.price
      ) {
        setisFavorite(true);
      }
    }
  };

  const toggleFavoriteETH = async (pair) => {
    if (!pair) return false;
    let favorites = await window.getFavoritesETH2();
    let foundIndex;

    if (
      favorites.some((f, i) => {
        if (
          f.nftAddress === pair.nftAddress &&
          f.tokenId === pair.tokenId &&
          ((f.seller && f.seller === pair.seller) ||
            (f.buyer && f.buyer === pair.buyer)) &&
          f.price === pair.price
        ) {
          foundIndex = i;
          return true;
        }
        return false;
      })
    ) {
      favorites.splice(foundIndex, 1);
      setisFavorite(false);
    } else {
      favorites.push(pair);
      setisFavorite(true);
    }
    localStorage.setItem("favoritesETH", JSON.stringify(favorites, null, 4));
  };

  const handleFavorite = async (nft) => {
    await toggleFavoriteETH(nft);
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

  
  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    getAllFavs(nft);
    checkOwner(nft);
    checkapprove(nft);
  }, [nft, isFavorite, coinbase]);


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
            }`}
          >
            {!location.pathname.includes("/account") ? (
              <div className={`d-flex gap-2 m-0`}>
                {nft.payment_priceType === 0 ? (
                  <img src={topEth} height={20} width={20} alt="" />
                ) : (
                  <img src={topDyp} height={20} width={20} alt="" />
                )}
                <div className="d-flex flex-column">
                  <span
                    className="nft-price"
                    style={{ textDecoration: "none" }}
                  >
                    {nft.price?.slice(0, 5)}{" "}
                    {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                  </span>
                  <span
                    className={`nft-price-usd  ${
                      (location.pathname.includes("/marketplace/caws") ||
                        location.pathname.includes("/marketplace/wod") ||
                        location.pathname.includes("/marketplace/timepiece")) &&
                      "nft-price-usdhover"
                    } `}
                    style={{ color: "#7DD9AF" }}
                  >
                    $
                    {getFormattedNumber(
                      nft.payment_priceType === 0
                        ? ethtokenData * nft.price
                        : dyptokenData * nft.price,
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
            <img
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
            />
          </div>
        </div>
        {(location.pathname.includes("/marketplace/caws") ||
          location.pathname.includes("/marketplace/wod") ||
          location.pathname.includes("/marketplace/timepiece")) && (
          <div className="buy-nft w-100">
            <button
              className="buy-nft-btn w-100"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              onClick={(e) => {
                !isOwner && e.preventDefault();
                !isOwner && e.stopPropagation();
                isConnected === true
                  ? !isOwner
                    ? handleBuy(nft)
                    : console.log("owner")
                  : showConnectWallet();
              }}
            >
              {" "}
              {isConnected === true ? (
                nft.payment_priceType === 1 && !isOwner ? (
                  <>{buttonTxt}</>
                ) : nft.payment_priceType === 1 && isOwner ? (
                  "View details"
                ) : (
                  "Buy"
                )
              ) : (
                "Connect wallet"
              )}{" "}
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
