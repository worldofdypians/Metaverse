import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import ComfirmationModal from "../../screens/Marketplace/MarketNFTs/ConfirmationModal";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

import { useNavigate } from "react-router-dom";
import { Tooltip, styled, tooltipClasses } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { ethers } from "ethers";

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
  binanceW3WProvider,
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
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      const result = await window.isApprovedBuy(amount).catch((e) => {
        console.error(e);
      });

      return result;
    } else if (window.WALLET_TYPE === "binance") {
      
       if (tokenType === "eth") {
        return true;
      }
    } else return false
  };

  const checkapprove = async (nftItem) => {
 

    const tokenType =  "eth";
 
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
        // onProceedBuy();
        setShowModal(true);

        if (isApproved || nft.payment_priceType === 0) {
          setbuttonTxt("Buy");
          setpurchasestate("buy");
          setStatus("buy");
          if (window.WALLET_TYPE !== "binance") {
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
          } else if (window.WALLET_TYPE === "binance") {
            const marketplace = new ethers.Contract(
              window.config.nft_marketplace_address,
              window.MARKETPLACE_ABI,
              binanceW3WProvider.getSigner()
            );

            const gasPrice = await binanceW3WProvider.getGasPrice();
            console.log("gasPrice", gasPrice.toString());
            const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
            const increasedGwei = parseFloat(currentGwei) + 1.5;
            console.log("increasedGwei", increasedGwei);
            console.log(nft.payment_priceType, "test");
            // Convert increased Gwei to Wei
            const gasPriceInWei = ethers.utils.parseUnits(
              increasedGwei.toString().slice(0, 14),
              "gwei"
            );

            const transactionParameters = {
              gasPrice: gasPriceInWei,
            };

            const balance = await binanceW3WProvider.getSigner().getBalance();
            const balanceInEth = ethers.utils.formatEther(balance);
            console.log("Account Balance:", balanceInEth);

            // Estimate gas limit
            let gasLimit;
            // try {
            //   console.log(marketplace,  nft)
            //   gasLimit = await marketplace.estimateGas.buyItem(
            //     nft.nftAddress,
            //     nft.tokenId,
            //     [(nft.payment_priceType, nft.payment_tokenAddress)],
            //     {
            //       value: nft.price,
            //       from: coinbase,
            //     }
            //   );
            //   transactionParameters.gasLimit = gasLimit;
            //   console.log("transactionParameters", transactionParameters);
            // } catch (error) {
            //   console.error(error);
            // }

            if (nft.payment_priceType === 1) {
              const txResponse = await marketplace
                .buyItem(
                  nft.nftAddress,
                  nft.tokenId,
                  [nft.payment_priceType, nft.payment_tokenAddress],
                  {
                    from: coinbase,
                    value: 0,
                    ...transactionParameters,
                  }
                )
                // .send({ from: coinbase, value: 0
                //   , ...transactionParameters
                // })
                .catch((e) => {
                  console.error(e);
                  setpurchasestate("fail");
                  setStatus("fail");
                });

              const txReceipt = await txResponse.wait();
              if (txReceipt) {
                setShowToast(true);
                setpurchasestate("success");
                setStatus("done");
                handleRefreshListing();
                setTimeout(() => {
                  checkapprove(nft);
                  setShowModal(false);
                }, 2000);
                setToastTitle("Successfully purchased!");
              }
            } else if (nft.payment_priceType === 0) {
              const txResponse = await marketplace
                .buyItem(
                  nft.nftAddress,
                  nft.tokenId,
                  [nft.payment_priceType, nft.payment_tokenAddress],
                  {
                    from: coinbase,
                    value: nft.price,
                    ...transactionParameters,
                  }
                )
                // .send({
                //   from: coinbase,
                //   value: nft.price,
                //   ...transactionParameters,
                // })
                .catch((e) => {
                  console.error(e);
                  setpurchasestate("fail");
                  setStatus("fail");
                });

              const txReceipt = await txResponse.wait();
              if (txReceipt) {
                setShowToast(true);
                setpurchasestate("success");
                setStatus("done");
                handleRefreshListing();
                setTimeout(() => {
                  checkapprove(nft);
                  setShowModal(false);
                }, 2000);
                setToastTitle("Successfully purchased!");
              }
            }
          }
        } 
        // else {
        //   setbuttonTxt("Approve");
        //   setpurchasestate("approve");
        //   setStatus("approve");

        //   console.log("approve buying");
        //   if (window.WALLET_TYPE !== "binance") {
        //     await window
        //       .approveBuy(nft.price)
        //       .then((result) => {
        //         setbuttonTxt("Buy");
        //         setpurchasestate("buy");
        //         setStatus("approve");
        //         setIsApprove(true);
        //         setTimeout(() => {
        //           handleBuy(nft);
        //         }, 2000);
        //       })
        //       .catch((e) => {
        //         console.error(e);
        //         setStatus("fail");
        //         setpurchasestate("fail");
        //       });
        //   } else if (window.WALLET_TYPE === "binance") {
        //     const contract_old = new ethers.Contract(
        //       window.config.dyp_token_address,
        //       window.DYP_ABI,
        //       binanceW3WProvider.getSigner()
        //     );

        //     const contract = new ethers.Contract(
        //       window.config.token_dypius_new_address,
        //       window.DYP_ABI,
        //       binanceW3WProvider.getSigner()
        //     );

        //     if (tokenType === "dypv2") {
        //       const txResponse = await contract
        //         .approve(window.config.nft_marketplace_address, nft.price, {
        //           from: coinbase,
        //         })
        //         .catch((e) => {
        //           console.error(e);
        //           setStatus("fail");
        //           setpurchasestate("fail");
        //         });

        //       const txReceipt = await txResponse.wait();
        //       if (txReceipt) {
        //         setbuttonTxt("Buy");
        //         setpurchasestate("buy");
        //         setStatus("approve");
        //         setIsApprove(true);
        //         setTimeout(() => {
        //           handleBuy(nft);
        //         }, 2000);
        //       }
        //     } else if (tokenType === "dypv1") {
        //       const txResponse = await contract_old
        //         .approve(window.config.nft_marketplace_address, nft.price, {
        //           from: coinbase,
        //         })
        //         .catch((e) => {
        //           console.error(e);
        //           setStatus("fail");
        //           setpurchasestate("fail");
        //         });

        //       const txReceipt = await txResponse.wait();
        //       if (txReceipt) {
        //         setbuttonTxt("Buy");
        //         setpurchasestate("buy");
        //         setStatus("approve");
        //         setIsApprove(true);
        //         setTimeout(() => {
        //           handleBuy(nft);
        //         }, 2000);
        //       }
        //     }
        //   }
        // }
      }
    } else if( window.WALLET_TYPE === "matchId") {
      window.alertify.error("Please connect to another EVM wallet.");
    }
      else {
      window.alertify.error(
        "Invalid network! Switch into Ethereum Network to purchase NFTs"
      );
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
      location.pathname.includes("/shop/caws") ||
      location.pathname.includes("/shop/land") ||
      location.pathname.includes("/shop/timepiece")
    ) {
      checkapprove(nft);
    }
  }, [nft, coinbase, isConnected]);

  const html = document.querySelector("html");

  // useEffect(() => {
  //   if (showModal) {
  //     html.classList.add("hidescroll");
  //   } else {
  //     html.classList.remove("hidescroll");
  //   }
  // }, [showModal]);

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
                      2
                    )}{" "}
                   ETH 
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
                    $
                    {getFormattedNumber(
                        ethTokenData * (nft.price / 1e18)
                         ,
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
                (location.pathname.includes("/shop/caws") ||
                  location.pathname.includes("/shop/wod") ||
                  location.pathname.includes("/shop/timepiece")) &&
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
                  2
                )}{" "}
                 ETH 
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
                  // e.stopPropagation();
                  handleManageState(e, nft);
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
      {/* {isListed && !location.pathname.includes("/account") && (
        <span
          className="position-relative top-sale-time"
          style={{ bottom: "-8%" }}
        >
          {getRelativeTime(nft.blockTimestamp)}
        </span>
      )} */}
    </div>
  );
};

export default ItemCard;
