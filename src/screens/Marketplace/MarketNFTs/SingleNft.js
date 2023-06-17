import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import topEth from "../assets/topEth.svg";
import topDyp from "../assets/dypIcon.svg";
import { useLocation } from "react-router-dom";
import getListedNFTS from "../../../actions/Marketplace";
import checkActive from "../assets/checked.svg";
import checkPassive from "../assets/empty.svg";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { shortAddress } from "../../Caws/functions/shortAddress";
import Toast from "../../../components/Toast/Toast";
import axios from "axios";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const SingleNft = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  handleSwitchChain,
  nftCount,
  handleRefreshListing,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [type, setType] = useState(
    location.state?.type ? location.state?.type : false
  );

  const [IsApprove, setIsApprove] = useState(false);
  const [buttonText, setbuttonText] = useState("Approve");
  const [IsListed, setIsListed] = useState(false);

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [buyloading, setbuyLoading] = useState(false); //buy
  const [sellLoading, setsellLoading] = useState(false); //sell
  const [updateLoading, setupdateLoading] = useState(false); //update
  const [cancelLoading, setcancelLoading] = useState(false); //cancel

  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [sellStatus, setsellStatus] = useState(""); //sell
  const [updateStatus, setupdateStatus] = useState("update"); //update
  const [cancelStatus, setcancelStatus] = useState("cancel"); //cancel

  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [priceType, setPriceType] = useState(0);
  const [nftPrice, setNftPrice] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  const [metaData, setmetaData] = useState([]);
  const [isOwner, setisOwner] = useState(
    location.state?.isOwner ? location.state?.isOwner : false
  );
  const [dyptokenData, setDypTokenData] = useState(0);
  const [ethtokenData, setEthTokenData] = useState(0);
  const [priceUSD, setpriceUsd] = useState(0);

  console.log("nft", nft, IsListed);

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

  const getMetaData = async () => {
    if (nft) {
      if (type === "caws" || type === "cawsold") {
        const result = await window.getNft(nft.tokenId);
        setmetaData(result);
      } else if (type === "land") {
        const result = await window.getLandNft(nft.tokenId);
        setmetaData(result);
      } else if (type === "timepiece") {
        const result = await window.getTimepieceNft(nft.tokenId);
        setmetaData(result);
      }
    } else console.log("no");
  };

  const isApprovedBuy = async (amount) => {
    const result = await window.isApprovedBuy(amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  async function isApprovedNFT(nft, type) {
    console.log("isapprovednft", nft, type);
    const result = window.isApproved(nft, type).catch((e) => {
      console.error(e);
    });
    return result;
  }

  const handleRefreshList = async (type, tokenId) => {
    let nft_address;

    if (type === "timepiece") {
      nft_address = window.config.nft_timepiece_address;
    } else if (type === "land") {
      nft_address = window.config.nft_land_address;
    } else if (type === "cawsold") {
      nft_address = window.config.nft_cawsold_address;
    } else {
      nft_address = window.config.nft_caws_address;
    }

    const listedNFT = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      tokenId,
      nft_address
    );

    console.log(listedNFT);

    if (listedNFT && listedNFT.length > 0) {
      setNft(...listedNFT);
    }
  };

  const handleSell = async (tokenId, nftPrice, priceType, type) => {
    console.log("nft", nft);
    const isApproved = await isApprovedNFT(tokenId, type);

    if (isApproved) {
      console.log("selling");
      setsellLoading(true);
      setsellStatus("sell");
      setPurchaseStatus("Selling nft in progress...");
      setPurchaseColor("#00FECF");

      await window
        .listNFT(tokenId, nftPrice, priceType, type)
        .then((result) => {
          handleRefreshList(type, tokenId);
          handleRefreshListing();
          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("Successfully sold!");
          setPurchaseColor("#00FECF");
          setShowToast(true);
          setToastTitle("Successfully sold!");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
        })
        .catch((e) => {
          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve selling");

      setsellLoading(true);
      setsellStatus("approve");
      setPurchaseStatus("Approving nft selling in progress...");
      setPurchaseColor("#00FECF");

      await window
        .approveNFT(tokenId, type)
        .then((result) => {
          setTimeout(() => {
            setsellStatus("sell");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("Successfully approved! You can sell your nft");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          setTimeout(() => {
            setsellStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          console.log(e);
        });
    }
  };

  async function handleBuy(nft) {
    console.log("nft", nft);
    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying");

      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying nft in progress...");
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
          setbuyLoading(true);
          setbuyStatus("success");
          setPurchaseStatus("Successfully purchased!");
          setShowToast(true);
          setToastTitle("Successfully purchased!");
          setPurchaseColor("#00FECF");
          handleRefreshList(type, nft.tokenId);
          handleRefreshListing();
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
          }, 3000);
        })
        .catch((e) => {
          setbuyStatus("failed");
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve buying");

      setbuyStatus("approve");
      setbuyLoading(true);
      setPurchaseStatus("Approving in progress...");
      setPurchaseColor("#00FECF");
      await window
        .approveBuy(nft.price)
        .then((result) => {
          setTimeout(() => {
            setbuyStatus("buy");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("success");
          setbuyLoading(false);
          setPurchaseStatus("Successfully approved");
          setPurchaseColor("#FF6232");
        })
        .catch((e) => {
          console.error(e);
          setTimeout(() => {
            setbuyStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("failed");
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
        });
    }
  }

  const cancelNFT = (nftAddress, tokenId, type) => {
    setcancelLoading(true);
    setcancelStatus("cancel");
    setPurchaseColor("#00FECF");
    setPurchaseStatus("Unlisting your nft...");
    console.log("cancelling");

    return window
      .cancelListNFT(nftAddress, tokenId, type)
      .then((result) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
        }, 3000);
        // handleRefreshList(type, tokenId);
        handleRefreshListing();
        setcancelLoading(false);
        setcancelStatus("success");
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Nft successfully unlisted");
      })
      .catch((e) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("");
          setPurchaseStatus("");
        }, 3000);

        setcancelLoading(false);
        setcancelStatus("failed");
        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
      });
  };

  async function updateListing(nft, price, priceType, type) {
    setPurchaseColor("#00FECF");
    setPurchaseStatus("Price is being updated...");
    setupdateLoading(true);
    setupdateStatus("update");
    console.log("updating", nft, price, priceType, type);

    return await window
      .updateListingNFT(nft, price, priceType, type)
      .then((result) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);
        setShowToast(true);
        setToastTitle("Successfully updated!");
        handleRefreshList(type, nft);
        handleRefreshListing();
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Price updated successfully.");
        setupdateLoading(false);
        setupdateStatus("success");
      })
      .catch((e) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);

        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
        setupdateLoading(false);
        setupdateStatus("failed");
      });
  }

  async function isListedNFT(nft, type, details = false) {
    let nft_address;

    if (type === "timepiece") {
      nft_address = window.config.nft_timepiece_address;
    } else if (type === "land") {
      nft_address = window.config.nft_land_address;
    } else if (type === "cawsold") {
      nft_address = window.config.nft_cawsold_address;
    } else {
      nft_address = window.config.nft_caws_address;
    }

    const listedNFTS = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      nft.tokenId,
      nft_address
    );

    return listedNFTS.length > 0;
  }

  useEffect(() => {
    if (isOwner === false) {
      if (isConnected === true && nft.payment_priceType === 1 && IsListed) {
        isApprovedBuy(nft.price).then((isApproved) => {
          setIsApprove(isApproved);
          if (isApproved === true) {
            setbuyStatus("buy");
          } else if (isApproved === false) {
            setbuyStatus("approve");
          }
        });
      } else if (!IsListed) {
        isApprovedNFT(nft.tokenId, type).then((isApproved) => {
          if (isApproved === true) {
            setsellStatus("sell");
          } else if (isApproved === false) {
            setsellStatus("approve");
          }
        });
      } else {
        setbuyStatus("buy");
      }
    }
  }, [nft.price, isConnected, isOwner]);

  useEffect(() => {
    if (isConnected === true && nft.payment_priceType === 1) {
      isApprovedBuy(nft.price).then((isApproved) => {
        console.log(isApproved);
        setIsApprove(isApproved);
      });
    }

    if (coinbase === undefined) {
      setisOwner(false);
    } else if (coinbase) {
      if (nft.seller && nft.seller.toLowerCase() === coinbase.toLowerCase()) {
        setisOwner(true);
      }

      if (nft.buyer && nft.buyer.toLowerCase() === coinbase.toLowerCase()) {
        setisOwner(true);
      }
    }
  }, [nft.price, isConnected, isOwner, IsListed, coinbase]);

  useEffect(() => {
    getMetaData();

    if (type) {
      isListedNFT(nft, type).then((isListed) => {
        setIsListed(isListed);
      });
    }
  }, [nft, type, nftCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenData();
  }, []);

  useEffect(() => {
    if (nft) {
      setNft(nft);

      if (nft.nftAddress === window.config.nft_cawsold_address) {
        setType("cawsold");
      }
    }
  }, [nftCount]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-xxl-5 pe-lg-5 position-relative">
        <Toast showToast={showToast} title={toastTitle} />
        <div className="main-wrapper py-4 w-100 mt-5 mt-xxl-0 mt-lg-0">
          {type === "land" ? (
            <>
              <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                World of Dypians{" "}
                <h6
                  className="market-banner-title m-0"
                  style={{ color: "#8C56FF", lineHeight: "80%" }}
                >
                  Land
                </h6>
              </h6>
            </>
          ) : type === "caws" || type === "cawsold" ? (
            <>
              <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                Cats and Watches Society{" "}
                <h6
                  className="market-banner-title m-0"
                  style={{ color: "#8C56FF", lineHeight: "80%" }}
                >
                  (CAWS)
                </h6>
              </h6>
            </>
          ) : (
            <>
              <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                CAWS{" "}
                <h6
                  className="market-banner-title m-0"
                  style={{ color: "#8C56FF", lineHeight: "80%" }}
                >
                  Timepiece
                </h6>
              </h6>
            </>
          )}
          <div className="d-flex flex-column gap-4 flex-xxl-row flex-lg-row align-items-center justify-content-around mt-5 px-3">
            <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
              <div className="position-relative package-blur">
                <div className="first-box-blur first-bigbox-blur d-flex align-items-end justify-content-center"></div>
                <div className="second-box-blur second-bigbox-blur"></div>
                <img
                  className="blur-img blur-img-big"
                  src={
                    type === "caws" || type === "cawsold"
                      ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                      : type === "land"
                      ? `https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`
                      : `https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="d-flex flex-column gap-3 col-lg-7">
              <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                  <h3 className="nft-title">
                    {type === "caws" || type === "cawsold"
                      ? "CAWS"
                      : type === "land"
                      ? "Genesis Land"
                      : "CAWS Timepiece"}{" "}
                    #{nft.tokenId}
                  </h3>
                  {isOwner && IsListed && (
                    <div className="d-flex gap-2 align-items-center">
                      <span className="currentprice-txt">Current price</span>
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={nft.payment_priceType === 0 ? topEth : topDyp}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <span
                          className="nft-price-eth"
                          style={{ fontSize: 15, lineHeight: "20px" }}
                        >
                          {nft.price}{" "}
                          {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                        </span>
                        <span className="nft-price-usd">
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
                  )}
                  {!isOwner && IsListed && (
                    <div className="price-wrapper p-3">
                      <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                        <span className="currentprice-txt">Current price</span>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={nft.payment_priceType === 0 ? topEth : topDyp}
                            alt=""
                            height={30}
                            width={30}
                          />
                          <span className="nft-price-eth">
                            {nft.price}{" "}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                          </span>
                          <span className="nft-price-usd">
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
                    </div>
                  )}
                  {!isOwner && !IsListed && (
                    <div className="price-wrapper p-3">
                      <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                        <span className="currentprice-txt">Current price</span>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={nft.payment_priceType === 0 ? topEth : topDyp}
                            alt=""
                            height={30}
                            width={30}
                          />
                          <span className="nft-price-eth">
                            {nft.price}{" "}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                          </span>
                          <span className="nft-price-usd">
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
                    </div>
                  )}
                  {isOwner && IsListed && (
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                      <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                        <div className="d-flex w-100 justify-content-between flex-column gap-2">
                          <span
                            className="currentprice-txt"
                            style={{ alignSelf: "baseline" }}
                          >
                            Listing price
                          </span>
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={priceType === 0 ? topEth : topDyp}
                              alt=""
                              height={30}
                              width={30}
                            />
                            <span className="nft-price-eth gap-3 d-flex">
                              <StyledTextField
                                error={nftPrice === "" ? true : false}
                                size="small"
                                // label="Price"
                                id="price"
                                name="price"
                                value={nftPrice}
                                type="number"
                                required
                                onChange={(e) => {
                                  setNftPrice(e.target.value);
                                }}
                                sx={{ width: "120px" }}
                              />
                              {priceType === 0 ? "ETH" : "DYP"}{" "}
                            </span>
                            <span className="nft-price-usd">
                              $
                              {getFormattedNumber(
                                priceType === 0
                                  ? ethtokenData * nftPrice
                                  : dyptokenData * nftPrice,
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                        <div className="d-flex w-100 justify-content-between flex-column gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Choose currency
                          </span>
                          <div className="d-flex flex-row justify-content-around w-100 gap-2">
                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 0
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              } `}
                              onClick={() => {
                                setPriceType(0);
                              }}
                            >
                              <img
                                src={
                                  priceType === 0 ? checkActive : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={topEth}
                                  alt=""
                                  height={20}
                                  width={20}
                                />
                                ETH
                              </span>
                            </div>

                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 1
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              } `}
                              onClick={() => {
                                setPriceType(1);
                              }}
                            >
                              <img
                                src={
                                  priceType === 0
                                    ? checkPassive
                                    : priceType === 1
                                    ? checkActive
                                    : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={topDyp}
                                  alt=""
                                  height={20}
                                  width={20}
                                />
                                DYP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isOwner && !IsListed && (
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                      <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <span
                            className="currentprice-txt"
                            style={{ alignSelf: "baseline" }}
                          >
                            Listing price
                          </span>
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={priceType === 0 ? topEth : topDyp}
                              alt=""
                              height={30}
                              width={30}
                            />
                            <span className="nft-price-eth gap-3 d-flex">
                              <StyledTextField
                                error={nftPrice === "" ? true : false}
                                size="small"
                                label="Price"
                                id="price"
                                name="price"
                                value={nftPrice}
                                required
                                onChange={(e) => {
                                  setNftPrice(e.target.value);
                                }}
                                sx={{ width: "50%" }}
                              />
                              {priceType === 0 ? "ETH" : "DYP"}{" "}
                            </span>
                            <span className="nft-price-usd">
                              $
                              {getFormattedNumber(
                                priceType === 0
                                  ? ethtokenData * nftPrice
                                  : dyptokenData * nftPrice,
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Choose currency
                          </span>
                          <div className="d-flex flex-row justify-content-around w-100 gap-2">
                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 0
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              } `}
                              onClick={() => {
                                setPriceType(0);
                              }}
                            >
                              <img
                                src={
                                  priceType === 0 ? checkActive : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={topEth}
                                  alt=""
                                  height={20}
                                  width={20}
                                />
                                ETH
                              </span>
                            </div>

                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 1
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              } `}
                              onClick={() => {
                                setPriceType(1);
                              }}
                            >
                              <img
                                src={
                                  priceType === 0
                                    ? checkPassive
                                    : priceType === 1
                                    ? checkActive
                                    : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={topDyp}
                                  alt=""
                                  height={20}
                                  width={20}
                                />
                                DYP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between gap-2 align-items-center">
                    <div className="d-flex justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="owner-txt">
                        {nft.seller ? "Seller:" : "Buyer:"}
                      </span>
                      {nft.seller ? (
                        <a
                          href={`https://etherscan.io/address/${nft.seller}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                          className="seller-addr"
                          rel="noreferrer"
                        >
                          {shortAddress(nft.seller)}
                        </a>
                      ) : (
                        <a
                          href={`https://etherscan.io/address/${nft.buyer}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                          className="seller-addr"
                          rel="noreferrer"
                        >
                          {shortAddress(nft.buyer)}
                        </a>
                      )}
                    </div>
                    {!isOwner && IsListed && coinbase && isConnected && (
                      <button
                        disabled={
                          buyloading === true || buyStatus === "failed"
                            ? true
                            : false
                        }
                        className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                          buyStatus === "success"
                            ? "successbtn"
                            : buyStatus === "failed" ||
                              (chainId !== 5 && chainId !== 1)
                            ? "errorbtn"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        onClick={() => {
                          chainId !== 1 && chainId !== 5
                            ? handleSwitchChain()
                            : handleBuy(nft);
                        }}
                      >
                        {buyloading && (chainId === 1 || chainId === 5) ? (
                          <div
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : !buyloading && chainId !== 1 && chainId !== 5 ? (
                          "Switch Network"
                        ) : buyStatus === "buy" ? (
                          "Buy nft"
                        ) : buyStatus === "approve" || buyStatus === "" ? (
                          "Approve buy"
                        ) : buyStatus === "success" ? (
                          "Success"
                        ) : (
                          "Failed"
                        )}
                      </button>
                    )}
                    {isOwner && IsListed && coinbase && isConnected && (
                      <div className="d-flex gap-2 col-lg-5 col-xxl-5 align-items-center">
                        <button
                          disabled={
                            updateLoading === true || updateStatus === "failed"
                              ? true
                              : false
                          }
                          className={`btn buyNftbtn col-lg-6 col-xxl-6 d-flex justify-content-center ${
                            updateStatus === "success"
                              ? "successbtn"
                              : updateStatus === "failed" ||
                                (chainId !== 5 && chainId !== 1)
                              ? "errorbtn"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => {
                            chainId !== 1 && chainId !== 5
                              ? handleSwitchChain()
                              : updateListing(
                                  nft.tokenId,
                                  nftPrice,
                                  priceType,
                                  type
                                );
                          }}
                        >
                          {updateLoading && (chainId === 1 || chainId === 5) ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : !updateLoading &&
                            chainId !== 1 &&
                            chainId !== 5 ? (
                            "Switch Network"
                          ) : updateStatus === "update" ||
                            updateStatus === "" ? (
                            "Update"
                          ) : updateStatus === "success" ? (
                            "Success"
                          ) : (
                            "Failed"
                          )}
                        </button>

                        <button
                          // disabled={
                          //   cancelLoading === true || cancelStatus === "failed"
                          //     ? true
                          //     : false
                          // }
                          className={`unlistbtn col-lg-6 col-xxl-6 d-flex justify-content-center d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => {
                            chainId !== 1 && chainId !== 5
                              ? handleSwitchChain()
                              : cancelNFT(
                                  nft.nftAddress,
                                  nft.tokenId,
                                  nft.payment_priceType
                                );
                          }}
                        >
                          {cancelLoading && (chainId === 1 || chainId === 5) ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : !cancelLoading &&
                            chainId !== 1 &&
                            chainId !== 5 ? (
                            "Switch Network"
                          ) : cancelStatus === "cancel" ||
                            cancelStatus === "" ? (
                            "Unlist"
                          ) : cancelStatus === "success" ? (
                            "Success"
                          ) : (
                            "Failed"
                          )}
                        </button>
                      </div>
                    )}

                    {isOwner && !IsListed && coinbase && isConnected && (
                      <button
                        disabled={
                          sellLoading === true || sellStatus === "failed"
                            ? true
                            : false
                        }
                        className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                          sellStatus === "success"
                            ? "successbtn"
                            : sellStatus === "failed" ||
                              (chainId !== 5 && chainId !== 1)
                            ? "errorbtn"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        onClick={() => {
                          chainId !== 1 && chainId !== 5
                            ? handleSwitchChain()
                            : handleSell(
                                nft.tokenId,
                                nftPrice,
                                priceType,
                                type
                              );
                        }}
                      >
                        {sellLoading && (chainId === 1 || chainId === 5) ? (
                          <div
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : !sellLoading && chainId !== 1 && chainId !== 5 ? (
                          "Switch Network"
                        ) : sellStatus === "sell" ? (
                          "Sell Nft"
                        ) : sellStatus === "success" ? (
                          "Success"
                        ) : sellStatus === "approve" || sellStatus === "" ? (
                          "Approve sell"
                        ) : (
                          "Failed"
                        )}
                      </button>
                    )}

                    {!isConnected && (
                      <button
                        className={`btn  buyNftbtn d-flex justify-content-center align-items-center gap-2`}
                        onClick={() => {
                          showWalletConnect();
                        }}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <span
                className="statusText"
                style={{
                  color: purchaseColor,
                }}
              >
                {purchaseStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
            <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
              <h3 className="traits-text">Traits</h3>
              {type === "caws" || type === "cawsold" || type === "timepiece" ? (
                <>
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-row flex-xxl-column flex-lg-column gap-2 align-items-center justify-content-between w-100">
                      <span className="traittitle">Background</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[0]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Tail</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[1]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Ears</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[2]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Body</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[3]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Clothes</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[4]?.value}
                      </span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Eyes</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[5]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Mouth</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[6]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Hat</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[7]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Eyewear</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[8]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Watch</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[9]?.value}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Tier</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[0]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Size</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[1]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Building</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[3]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Workbench</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[4]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">NPC - Attire</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[8]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Gemstone</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[9]?.value}
                      </span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Artifacts</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[5]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">NPC</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[6]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">NPC - AI Powered</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[7]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">Plot</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[10]?.value}
                      </span>
                    </div>
                    <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                      <span className="traittitle">
                        Multi Functional Building
                      </span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[2]?.value}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
