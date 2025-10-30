import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import ComfirmationModal from "../../screens/Marketplace/MarketNFTs/ConfirmationModal";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

import { useNavigate } from "react-router-dom";
import { Tooltip, styled, tooltipClasses } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { useMarketplace } from "../../hooks/useMarketplace";
import { useWaitForTransactionReceipt } from "wagmi";

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
  isFavorite,
  onFavorite,
  lastSold,
  isLatestSale,
  isListed,
  soldPriceType,
  handleRefreshListing,
  chainId,
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
  
  // Wagmi hooks
  const { buyNFT: buyNFTContract } = useMarketplace();
  const [currentTxHash, setCurrentTxHash] = useState(null);
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: currentTxHash,
  });

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

  const isApprovedBuy = async (tokenType, amount) => {
    // For ETH purchases, no approval needed
      if (tokenType === "eth") {
        return true;
      }
    return false;
  };

  const checkapprove = async (nftItem) => {
    const tokenType = "eth";

    if (isConnected === true && nftItem.payment_priceType === 0) {
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

  const handleManageState = (e, nft) => {
    e.preventDefault();
    if (isConnected) {
      handleBuyState(nft);
    } else {
      handleConnectState();
    }
  };

  const handleBuyState = async (nft) => {
    if (chainId === 1 && window.WALLET_TYPE !== "matchId") {
      const tokenType = "eth";

      const isApproved = isApprovedBuy(tokenType, nft.price);
      console.log("Buystate");

      if (!isOwner && isConnected) {
        setShowModal(true);

        if (isApproved || nft.payment_priceType === 0) {
          setbuttonTxt("Buy");
          setpurchasestate("buy");
          setStatus("buy");
          
          try {
            // Use wagmi for all wallets
            const hash = await buyNFTContract(
                nft.nftAddress,
                nft.tokenId,
              nft.price,
                nft.payment_priceType,
                nft.payment_tokenAddress
            );
            
            setCurrentTxHash(hash);
            console.log("buyNFT transaction hash:", hash);
          } catch (e) {
                  console.error(e);
                  setpurchasestate("fail");
                  setStatus("fail");
          }
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      window.alertify.error("Please connect to another EVM wallet.");
    } else {
      window.alertify.error(
        "Invalid network! Switch into Ethereum Network to purchase NFTs"
      );
    }
  };

  const handleConnectState = () => {
    showConnectWallet();
    setStatus("clicked");
  };

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      setShowToast(true);
      setpurchasestate("success");
      setStatus("done");
      handleRefreshListing();
      setToastTitle("Successfully purchased!");
      const timer = setTimeout(() => {
        checkapprove(nft);
        setShowModal(false);
        setCurrentTxHash(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

  useEffect(() => {
    // getAllFavs(nft);
    checkOwner(nft);
    if (
      location.pathname.includes("/shop/caws") ||
      location.pathname.includes("/shop/land") ||
      location.pathname.includes("/shop/timepiece")
    ) {
      checkapprove(nft);
    }
  }, [nft, coinbase, isConnected]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (isConnected && status === "clicked") {
      setShowModal(true);
      const timer = setTimeout(() => {
        handleBuyState(nft);
      }, 2000);
      return () => clearTimeout(timer);
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
              src={"https://cdn.worldofdypians.com/wod/ethgrayLogo.svg"}
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
            (location.pathname.includes("/shop/caws") ||
              location.pathname.includes("/shop/land") ||
              location.pathname.includes("/shop/timepiece")) &&
            "topwrapper"
          }`}
        >
          <div
            className={`d-flex gap-2 justify-content-between ${
              (location.pathname.includes("/shop/caws") ||
                location.pathname.includes("/shop/land") ||
                location.pathname.includes("/shop/timepiece")) &&
              "middlewrapper"
            } ${!isListed && "invisible"} `}
          >
            {!location.pathname.includes("/account") ? (
              <div className={`d-flex gap-2 m-0`}>
                <div className="d-flex align-items-center gap-1">
                  <span
                    className="nft-price"
                    style={{ textDecoration: "none" }}
                  >
                    {getFormattedNumber(nft.price / 1e18, 2)} ETH
                  </span>

                  <span
                    className={`nft-price-usd  ${
                      (location.pathname.includes("/shop/caws") ||
                        location.pathname.includes("/shop/land") ||
                        location.pathname.includes("/shop/timepiece")) &&
                      "nft-price-usdhover"
                    } ${!isListed && "nft-price-usdhover2"}`}
                    style={{ color: "#7DD9AF" }}
                  >
                    ${getFormattedNumber(ethTokenData * (nft.price / 1e18), 2)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="nft-card-name">
                {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                {nft.tokenId}
              </span>
            )}
          </div>
          {isLatestSale && (
            <div
              className={`d-flex align-items-center position-relative ${
                !isListed && "lastsoldwrapper"
              }`}
              style={{ bottom: isListed ? 0 : 15, height: 0 }}
            >
              <span className="lastsold">
                Last Sale: {getFormattedNumber(lastSold / 1e18, 2)} ETH
              </span>
            </div>
          )}
        </div>
        {(location.pathname.includes("/shop/caws") ||
          location.pathname.includes("/shop/land") ||
          location.pathname.includes("/shop/timepiece")) &&
          isListed &&
          !isOwner && (
            <div className="buy-nft w-100">
              <button
                className="buy-nft-btn w-100"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                onClick={(e) => {
                  handleManageState(e, nft);
                }}
              >
                Buy
              </button>
            </div>
          )}
        {(location.pathname.includes("/shop/caws") ||
          location.pathname.includes("/shop/land") ||
          location.pathname.includes("/shop/timepiece")) &&
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
    </div>
  );
};

export default ItemCard;
