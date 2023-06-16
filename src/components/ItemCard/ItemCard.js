import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/dypIcon.svg";
import favActive from "../../screens/Marketplace/assets/favActive.svg";
import favInactive from "../../screens/Marketplace/assets/favInactive.svg";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import _ from "lodash";

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
  const [dyptokenData, setDypTokenData] = useState(0);
  const [ethtokenData, setEthTokenData] = useState(0);
  const [isFavorite, setisFavorite] = useState(false);

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

  const checkFavorite = async (pairId) => {
    let favorites = await window.getFavoritesETH2();
    return favorites.some((f) => {
      if (_.isEqual(f, pairId)) {
        return true;
      }
      return false;
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
    const isFav = await checkFavorite(nft);
    setisFavorite(isFav);
  };

  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    getAllFavs(nft);
  }, [nft]);

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
          <div className="d-flex gap-2 justify-content-between">
            <div className="d-flex gap-2">
              {nft.payment_priceType === 0 ? (
                <img src={topEth} height={20} width={20} alt="" />
              ) : (
                <img src={topDyp} height={20} width={20} alt="" />
              )}
              <div className="d-flex flex-column">
                <span className="nft-price" style={{ textDecoration: "none" }}>
                  {nft.price.slice(0, 5)}{" "}
                  {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                </span>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  $
                  {getFormattedNumber(
                    nft.payment_priceType === 0
                      ? ethtokenData * nft.price
                      : dyptokenData * nft.price,
                    2
                  )}
                </span>
              </div>
            </div>
            <img
              src={isFavorite ? favActive : favInactive}
              onClick={(e) => {
                handleFavorite(nft);
                e.preventDefault();
                e.stopPropagation();
              }}
              alt=""
              className="favorite"
            />
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
