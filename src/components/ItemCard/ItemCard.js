import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import ComfirmationModal from "../../screens/Marketplace/MarketNFTs/ConfirmationModal";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import ethgrayLogo from "./assets/ethgrayLogo.svg";
import { useNavigate } from "react-router-dom";
import { Tooltip, styled, tooltipClasses } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";

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

const ItemCard = ({
  nft,
  single,
  isConnected,
  showConnectWallet,
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
  handleRefreshListing,
}) => {
  const [isOwner, setisOwner] = useState(false);
  const [IsApprove, setIsApprove] = useState(false);
  const [buttonTxt, setbuttonTxt] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [status, setStatus] = useState("initial");
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [purchasestate, setpurchasestate] = useState("approve");
  const windowSize = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();

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
        setpurchasestate(isApproved ? "buy" : "approve");
      });
    } else if (isConnected === true && nftItem.payment_priceType === 0) {
      setbuttonTxt("Buy");
      setIsApprove(true);
      setpurchasestate("buy");
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

  async function handleBuy(nft) {
    console.log("nft", nft);

    setbuttonTxt("Buy");
    setpurchasestate("buy");

    console.log("buying in handlebuy");
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
        setpurchasestate("success");
        setStatus("done");
        handleRefreshListing();
        setTimeout(() => {
          checkapprove(nft);
          setShowModal(false);
        }, 2000);

        setToastTitle("Successfully purchased!");
      })
      .catch((e) => {
        console.error(e);
        setpurchasestate("fail");
        setStatus("fail");
      });
  }

  const handleBuyState = async (nft) => {
    const isApproved = await isApprovedBuy(nft.price);
    console.log("Buystate");

    if (!isOwner && isConnected) {
      // onProceedBuy();
      setShowModal(true);

      if (isApproved || nft.payment_priceType === 0) {
        setbuttonTxt("Buy");
        setpurchasestate("buy");
        setStatus("buy");

        console.log("buying in buystate");
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
            setpurchasestate("success");
            setStatus("done");
            handleRefreshListing();
            setTimeout(() => {
              checkapprove(nft);
              setShowModal(false);
            }, 2000);
            setToastTitle("Successfully purchased!");
          })
          .catch((e) => {
            console.error(e);
            setpurchasestate("fail");
            setStatus("fail");
          });
      } else {
        setbuttonTxt("Approve");
        setpurchasestate("approve");
        setStatus("approve");

        console.log("approve buying");
        await window
          .approveBuy(nft.price)
          .then((result) => {
            setbuttonTxt("Buy");
            setpurchasestate("buy");
            setStatus("approve");
            setIsApprove(true);
            setTimeout(() => {
              handleBuy(nft);
            }, 2000);
          })
          .catch((e) => {
            console.error(e);
            setStatus("fail");
            setpurchasestate("fail");
          });
      }
    }
  };

  const handleConnectState = () => {
    showConnectWallet();
    setStatus("clicked");
  };

  useEffect(() => {
    // getAllFavs(nft);
    checkOwner(nft);
    if (
      location.pathname.includes("/marketplace/caws") ||
      location.pathname.includes("/marketplace/land") ||
      location.pathname.includes("/marketplace/timepiece")
    ) {
      checkapprove(nft);
    }
  }, [nft, coinbase, isConnected]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (showModal) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showModal]);

  useEffect(() => {
    if (isConnected && status === "clicked") {
      setShowModal(true);
      setTimeout(() => {
        handleBuyState(nft);
      }, 2000);
    }
  }, [isConnected, status]);

  useEffect(() => {
    if (status === "initial") {
      setShowModal(false);
    }
  }, [status]);

  return (
    <div
      className={`${
        isLoaded ? "d-flex" : "d-none"
      } flex-column position-relative gap-1`}
    >
      <Toast showToast={showToast} title={toastTitle} />
      {showModal && isConnected && (
        <ComfirmationModal
          open={showModal}
          onclose={() => {
            setShowModal(false);
            setStatus("initial");
          }}
          nft={nft}
          isCaws={isCaws}
          isWod={isWod}
          isTimepiece={isTimepiece}
          state={purchasestate}
          ethTokenData={ethTokenData}
          dypTokenData={dypTokenData}
        />
      )}
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

          <HtmlTooltip
            placement="top"
            title={<span className="card-eth-chain-text">Chain: Ethereum</span>}
          >
            <img
              src={ethgrayLogo}
              alt=""
              className="ethgraylogo position-absolute"
            />
          </HtmlTooltip>
          {windowSize.width > 786 ? (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={
                nft.type === "caws"
                  ? `https://mint.dyp.finance/thumbs150/${nft.tokenId}.png`
                  : nft.type === "land"
                  ? `https://mint.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                  : `https://timepiece.worldofdypians.com/thumbs150/${nft.tokenId}.png`
              }
              alt=""
              onLoad={() => {
                setIsLoaded(true);
              }}
            />
          ) : (
            <img
              className="w-100 h-100 p-0 nft-img"
              src={
                isCaws
                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/caws_400x400/${nft.tokenId}.png`
                  : isWod
                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/genesis_400x400/${nft.tokenId}.png`
                  : `https://dypmeta.s3.us-east-2.amazonaws.com/timepiece_400x400/${nft.tokenId}.png`
              }
              alt=""
              onLoad={() => {
                setIsLoaded(true);
              }}
            />
          )}
        </div>
        <div
          className={`d-flex flex-column gap-2 position-relative p-3 ${
            (location.pathname.includes("/marketplace/caws") ||
              location.pathname.includes("/marketplace/land") ||
              location.pathname.includes("/marketplace/timepiece")) &&
            "topwrapper"
          }`}
        >
          <div
            className={`d-flex gap-2 justify-content-between ${
              (location.pathname.includes("/marketplace/caws") ||
                location.pathname.includes("/marketplace/land") ||
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
                      nft.payment_priceType === 0 ? 2 : 0
                    )}{" "}
                    {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                  </span>
                 
                    <span
                      className={`nft-price-usd  ${
                        (location.pathname.includes("/marketplace/caws") ||
                          location.pathname.includes("/marketplace/land") ||
                          location.pathname.includes(
                            "/marketplace/timepiece"
                          )) &&
                        "nft-price-usdhover"
                      } ${!isListed && "nft-price-usdhover2"}`}
                      style={{ color: "#7DD9AF" }}
                    >
                      $
                      {getFormattedNumber(
                        nft.payment_priceType === 0  
                          ?
                           ethTokenData * (nft.price / 1e18)
                          : dypTokenData * (nft.price / 1e18),
                        2
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
          {isLatestSale && (
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
          location.pathname.includes("/marketplace/land") ||
          location.pathname.includes("/marketplace/timepiece")) &&
          isListed &&
          !isOwner && (
            <div className="buy-nft w-100">
              <button
                className="buy-nft-btn w-100"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                onClick={(e) => {
                  isConnected ? handleBuyState(nft) : handleConnectState();
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
          location.pathname.includes("/marketplace/land") ||
          location.pathname.includes("/marketplace/timepiece")) &&
          (!isListed || isOwner) && (
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
      {isListed && !location.pathname.includes("/account") && (
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
