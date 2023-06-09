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
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [isCaws, setisCaws] = useState(
    location.state?.isCaws ? location.state?.isCaws : false
  );
  const [isWod, setisWod] = useState(
    location.state?.isWod ? location.state?.isWod : false
  );
  const [isTimepiece, setisTimepiece] = useState(
    location.state?.isTimepiece ? location.state?.isTimepiece : false
  );
  const [IsApprove, setIsApprove] = useState(false);
  const [buttonText, setbuttonText] = useState("Approve");
  const [IsListed, setIsListed] = useState(false);

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [purchaseColor, setPurchaseColor] = useState("");
  const [priceType, setPriceType] = useState(0);
  const [nftPrice, setNftPrice] = useState(1);

  const [metaData, setmetaData] = useState([]);
  const [isOwner, setisOwner] = useState(
    location.state?.isOwner ? location.state?.isOwner : false
  );

  console.log(isOwner, IsListed, coinbase);

  const getMetaData = async () => {
    if (nft) {
      if (isCaws) {
        const result = await window.getNft(nft.tokenId);
        setmetaData(result);
      } else if (isWod) {
        const result = await window.getLandNft(nft.tokenId);
        setmetaData(result);
      } else if (isTimepiece) {
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
    const result = window.isApproved(nft, type).catch((e) => {
      console.error(e);
    });
    return result;
  }

  const handleSell = async (tokenId, nftPrice, priceType, type) => {
    console.log("nft", nft);
    const isApproved = await isApprovedNFT(tokenId, type);

    if (isApproved) {
      setbuttonLoading(true);
      await window
        .listNFT(tokenId, nftPrice, priceType, type)
        .then((result) => {
          console.log("buyNFT", result);
          setbuttonLoading(false);
          setbuttonText("Success");
          setPurchaseStatus("Successfully purchased!");
          setPurchaseColor("Successfully purchased!");
          setTimeout(() => {
            setPurchaseStatus("Successfully purchased!");
            setPurchaseColor("Successfully purchased!");
            // setbuttonText("Buy");
          }, 5000);
        })
        .catch((e) => {
          setbuttonText("Failed");
          setbuttonLoading(false);
          console.error(e);
        });
    } else {
      setbuttonLoading(true);
      
      await window
        .approveNFT(tokenId, type)
        .then((result) => {
          setTimeout(() => {
            setbuttonText("Sell");
          }, 3000);
          console.log("approveBuy", result);
          setbuttonLoading(false);
          setbuttonText("Success");
        })
        .catch((e) => {
          console.error(e);
          setbuttonLoading(false);
          setbuttonText("Failed");
        });
    }
  };

  async function handleBuy(nft) {
    console.log("nft", nft);
    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      setbuttonLoading(true);
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
          setbuttonLoading(false);
          setbuttonText("Success");
          setPurchaseStatus("Successfully purchased!");
          setPurchaseColor("Successfully purchased!");
          setTimeout(() => {
            setPurchaseStatus("Successfully purchased!");
            setPurchaseColor("Successfully purchased!");
            setbuttonText("Buy");
          }, 5000);
        })
        .catch((e) => {
          setbuttonText("Failed");
          setbuttonLoading(false);
          console.error(e);
        });
    } else {
      setbuttonLoading(true);
      console.log("approveBuy");
      await window
        .approveBuy(nft.price)
        .then((result) => {
          setTimeout(() => {
            setbuttonText("Buy");
          }, 3000);
          console.log("approveBuy", result);
          setbuttonLoading(false);
          setbuttonText("Success");
        })
        .catch((e) => {
          console.error(e);
          setbuttonLoading(false);
          setbuttonText("Failed");
        });
    }
  }

  const cancelNFT = (nftAddress, tokenId, type) => {
    setbuttonLoading(true);
    return window
      .cancelListNFT(nftAddress, tokenId, type)
      .then((result) => {
        setTimeout(() => {
          setbuttonText("Cancel List");
        }, 3000);
        console.log("approveBuy", result);
        setbuttonLoading(false);
        setbuttonText("Success");
      })
      .catch((e) => {
        console.error(e);
        setbuttonLoading(false);
        setbuttonText("Failed");
      });
  };

  async function updateListing(nft, price, priceType, type) {
    return await window.updateListingNFT(nft, price, priceType, type);
  }

  async function isListedNFT(nft, type, details = false) {
    let nft_address;

    if (type === "timepiece") {
      nft_address = window.config.nft_timepiece_address;
    } else if (type === "land") {
      nft_address = window.config.nft_land_address;
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
            setbuttonText("Buy");
          } else if (isApproved === false) {
            setbuttonText("Approve");
          }
        });
      } else if (!IsListed) {
        isApprovedNFT(
          nft.tokenId,
          isCaws ? "caws" : isWod ? "land" : "timepiece"
        ).then((isApproved) => setIsApprove(isApproved));
      } else {
        setbuttonText("Buy");
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
    }
  }, [nft.price, isConnected, isOwner, IsListed]);

  useEffect(() => {
    getMetaData();

    if (isCaws) {
      isListedNFT(nft, "caws").then((isListed) => {
        setIsListed(isListed);
      });
    }
    if (isTimepiece) {
      isListedNFT(nft, "timepiece").then((isListed) => {
        setIsListed(isListed);
      });
    }
    if (isWod) {
      isListedNFT(nft, "land").then((isListed) => {
        setIsListed(isListed);
      });
    }
  }, [nft, isCaws, isTimepiece, isWod]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-5 position-relative">
        <div className="main-wrapper py-4 w-100">
          {isWod ? (
            <>
              <h6 className="market-banner-title">World of Dypians</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                Land
              </h6>
            </>
          ) : isCaws ? (
            <>
              <h6 className="market-banner-title">Cats and Watches Society</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                (CAWS)
              </h6>
            </>
          ) : (
            <>
              <h6 className="market-banner-title">CAWS</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                Timepiece
              </h6>
            </>
          )}
          <div className="d-flex align-items-center justify-content-between my-5">
            <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
              <div className="position-relative package-blur">
                <div className="first-box-blur first-bigbox-blur d-flex align-items-end justify-content-center"></div>
                <div className="second-box-blur second-bigbox-blur"></div>
                <img
                  className="blur-img blur-img-big"
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
            </div>
            <div className="d-flex align-items-center flex-column nft-outer-wrapper col-lg-6  p-4 gap-2 my-4 single-item-info">
              <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                <h3 className="nft-title">
                  {isCaws ? "CAWS" : isWod ? "Genesis Land" : "CAWS Timepiece"}{" "}
                  #{nft.tokenId}
                </h3>
                {!isOwner && IsListed && (
                  <div className="price-wrapper p-3">
                    <div className="d-flex flex-column gap-2 align-items-center">
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
                        <span className="nft-price-usd">$956.62</span>
                      </div>
                    </div>
                  </div>
                )}
                {!isOwner && !IsListed && (
                  <div className="price-wrapper p-3">
                    <div className="d-flex flex-column gap-2 align-items-center">
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
                        <span className="nft-price-usd">$956.62</span>
                      </div>
                    </div>
                  </div>
                )}
                {isOwner && IsListed && (
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <div className="price-wrapper p-3 col-6">
                      <div className="d-flex flex-column gap-2 align-items-center">
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
                          <span className="nft-price-usd">$---</span>
                        </div>
                      </div>
                    </div>
                    <div className="price-wrapper p-3 col-5">
                      <div className="d-flex flex-column gap-2 align-items-center">
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
                              src={priceType === 0 ? checkActive : checkPassive}
                              alt=""
                              className={"position-absolute checkicons"}
                            />
                            <span className="nft-price-eth">
                              <img src={topEth} alt="" height={20} width={20} />
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
                              <img src={topDyp} alt="" height={20} width={20} />
                              DYP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isOwner && !IsListed && (
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <div className="price-wrapper p-3 col-6">
                      <div className="d-flex flex-column gap-2 align-items-center">
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
                          <span className="nft-price-usd">$---</span>
                        </div>
                      </div>
                    </div>
                    <div className="price-wrapper p-3 col-5">
                      <div className="d-flex flex-column gap-2 align-items-center">
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
                              src={priceType === 0 ? checkActive : checkPassive}
                              alt=""
                              className={"position-absolute checkicons"}
                            />
                            <span className="nft-price-eth">
                              <img src={topEth} alt="" height={20} width={20} />
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
                              <img src={topDyp} alt="" height={20} width={20} />
                              DYP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <span className="owner-txt">
                      {nft.seller ? "Seller" : "Buyer"}
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
                  {!isOwner && IsListed && (
                    <button
                      disabled={
                        buttonLoading === true || buttonText === "Failed"
                          ? true
                          : false
                      }
                      className={`btn  buyNftbtn col-3 d-flex justify-content-center ${
                        buttonText === "Success"
                          ? "successbtn"
                          : buttonText === "Failed" ||
                            (chainId !== 5 && chainId !== 1)
                          ? "errorbtn"
                          : null
                      } d-flex justify-content-center align-items-center gap-2`}
                      onClick={() => {
                        isConnected === false
                          ? showWalletConnect()
                          : chainId !== 1 && chainId !== 5
                          ? handleSwitchChain()
                          : handleBuy(nft);
                      }}
                    >
                      {buttonLoading &&
                      isConnected &&
                      coinbase &&
                      (chainId === 1 || chainId === 5) ? (
                        <div
                          class="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : !buttonLoading &&
                        !isConnected &&
                        !coinbase &&
                        (chainId === 1 || chainId === 5) ? (
                        "Connect Wallet"
                      ) : !buttonLoading &&
                        isConnected &&
                        coinbase &&
                        chainId !== 1 &&
                        chainId !== 5 ? (
                        "Switch Network"
                      ) : (
                        <>{buttonText}</>
                      )}
                    </button>
                  )}
                  {isOwner && IsListed && (
                    <div className="d-flex gap-2 align-items-center">
                      <button
                        disabled={
                          buttonLoading === true || buttonText === "Failed"
                            ? true
                            : false
                        }
                        className={`btn  buyNftbtn d-flex justify-content-center ${
                          buttonText === "Success"
                            ? "successbtn"
                            : buttonText === "Failed" ||
                              (chainId !== 5 && chainId !== 1)
                            ? "errorbtn"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        onClick={() => {
                          isConnected === false
                            ? showWalletConnect()
                            : chainId !== 1 && chainId !== 5
                            ? handleSwitchChain()
                            : updateListing(
                                nft.tokenId,
                                nftPrice,
                                priceType,
                                isCaws ? "caws" : isWod ? "land" : "timepiece"
                              );
                        }}
                      >
                        {buttonLoading &&
                        isConnected &&
                        coinbase &&
                        (chainId === 1 || chainId === 5) ? (
                          <div
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : !buttonLoading &&
                          !isConnected &&
                          !coinbase &&
                          (chainId === 1 || chainId === 5) ? (
                          "Connect Wallet"
                        ) : !buttonLoading &&
                          isConnected &&
                          coinbase &&
                          chainId !== 1 &&
                          chainId !== 5 ? (
                          "Switch Network"
                        ) : (
                          "Update"
                        )}
                      </button>
                      {isConnected && (
                        <button
                          disabled={
                            buttonLoading === true || buttonText === "Failed"
                              ? true
                              : false
                          }
                          className={`btn  buyNftbtn d-flex justify-content-center ${
                            buttonText === "Success"
                              ? "successbtn"
                              : buttonText === "Failed" ||
                                (chainId !== 5 && chainId !== 1)
                              ? "errorbtn"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => {
                            isConnected === false
                              ? showWalletConnect()
                              : chainId !== 1 && chainId !== 5
                              ? handleSwitchChain()
                              : cancelNFT(
                                  nft.nftAddress,
                                  nft.tokenId,
                                  nft.payment_priceType
                                );
                          }}
                        >
                          {buttonLoading &&
                          isConnected &&
                          coinbase &&
                          (chainId === 1 || chainId === 5) ? (
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : !buttonLoading &&
                            !isConnected &&
                            !coinbase &&
                            (chainId === 1 || chainId === 5) ? (
                            "Connect Wallet"
                          ) : !buttonLoading &&
                            isConnected &&
                            coinbase &&
                            chainId !== 1 &&
                            chainId !== 5 ? (
                            "Switch Network"
                          ) : (
                            "Remove"
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {isOwner && !IsListed && (
                    <button
                      disabled={
                        buttonLoading === true || buttonText === "Failed"
                          ? true
                          : false
                      }
                      className={`btn  buyNftbtn col-3 d-flex justify-content-center ${
                        buttonText === "Success"
                          ? "successbtn"
                          : buttonText === "Failed" ||
                            (chainId !== 5 && chainId !== 1)
                          ? "errorbtn"
                          : null
                      } d-flex justify-content-center align-items-center gap-2`}
                      onClick={() => {
                        isConnected === false
                          ? showWalletConnect()
                          : chainId !== 1 && chainId !== 5
                          ? handleSwitchChain()
                          : handleSell(
                              nft.tokenId,
                              nftPrice,
                              priceType,
                              isCaws ? "caws" : isWod ? "land" : "timepiece"
                            );
                      }}
                    >
                      {buttonLoading &&
                      isConnected &&
                      coinbase &&
                      (chainId === 1 || chainId === 5) ? (
                        <div
                          class="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : !buttonLoading &&
                        !isConnected &&
                        !coinbase &&
                        (chainId === 1 || chainId === 5) ? (
                        "Connect Wallet"
                      ) : !buttonLoading &&
                        isConnected &&
                        coinbase &&
                        chainId !== 1 &&
                        chainId !== 5 ? (
                        "Switch Network"
                      ) : (
                        <>Approve to sell</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
            <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
              <h3 className="traits-text">Traits</h3>
              {isCaws || isTimepiece ? (
                <>
                  {" "}
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Background</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[0]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Tail</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[1]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Ears</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[2]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Body</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[3]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Clothes</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[4]?.value}
                      </span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Eyes</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[5]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Mouth</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[6]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Hat</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[7]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Eyewear</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[8]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
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
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Tier</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[0]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Size</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[1]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Building</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[3]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Workbench</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[4]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC - Attire</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[8]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Gemstone</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[9]?.value}
                      </span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Artifacts</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[5]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[6]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC - AI Powered</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[7]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Plot</span>
                      <span className="traitsubtitle">
                        {metaData.attributes && metaData?.attributes[10]?.value}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
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
