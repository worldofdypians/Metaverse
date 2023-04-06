import React, { useState, useEffect } from "react";
import "./_timepiecemint.scss";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import ToolTip from "../../screens/Caws/elements/ToolTip";
import { formattedNum } from "../../screens/Caws/functions/formatUSD";
import addActive from "../../assets/landAssets/addActive.svg";
import addInactive from "../../assets/landAssets/addInactive.svg";
import subtractActive from "../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../assets/landAssets/subtractInactive.svg";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import axios from "axios";

const TimePieceMint = ({
  showWalletConnect,
  handleMint,
  handleViewCollection,
  checkTotalcaws,
  coinbase,
  isConnected,
  totalCreated,
  mintStatus,
  mintloading,
  chainId,
  nftName,
  textColor,
}) => {
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*10 NFT limit");
  const [status, setStatus] = useState("Connect your wallet.");

  const [showBadge, setshowBadge] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [activeButton, setactiveButton] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [grandPrice, setGrandPrice] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(true);
  const [whitelistCountdown, setwhitelistCountdown] = useState(false);

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
  };

  const addNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount < 10) {
      setNftCount(nftCount + 1);
    }
  };

  // console.log(totalCaws)
  const subtractNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount > 1) {
      setNftCount(nftCount - 1);
    }
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };


  useEffect(() => {
    if (nftCount > 10) {
      setNftStatus("*Exceeded mint limit of 10 NFTs.");
      setTimeout(() => {
        setNftCount(10);
        setNftStatus("*10 NFT limit.");
      }, 3000);
    }
  }, [nftCount]);

  
  useEffect(() => {
    if (isConnected) {
      if (chainId !== undefined) {
        if (chainId !== 1) {
          setactiveButton(false);
          setStatus("Switch to Ethereum Chain to continue minting.");
        }
        if (chainId === 1) {
          setactiveButton(true);
          setStatus("");

        }
      }
      
    }
  }, [isConnected, chainId, coinbase]);


  return (
    <div className="row justify-content-between align-items-center w-100 mx-0 px-3 py-3 p-lg-5">
        <h6 className="land-hero-title font-organetto d-flex flex-column flex-lg-row gap-2">
            Caws Timepiece{" "}
            <h6 className="land-hero-title" style={{ color: "#8c56ff" }}>
              Mint
            </h6>
          </h6>
      <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 ">
        <div className="d-flex flex-column gap-3 justify-content-between staking-height2">
          <div className="d-flex flex-column position-relative">
            {showBadge && (
              <div className="totalcreated">
                <span>{totalCreated}</span>
              </div>
            )}
            <div
              className={`genesis-wrapper ${
                totalCreated > 0 ? "genesis-land" : "genesis-land-empty"
              } d-flex justify-content-center align-items-center p-3 position-relative`}
            >
              <img
                src={dummyBadge}
                className="genesis-badge"
                style={{ visibility: "hidden" }}
                alt="badge"
              />
            </div>
            <div
              className="genesis-desc position-relative"
              style={{ bottom: "5px" }}
            >
              <h6 className="font-organetto land-desc w-75">CAWS TimePiece</h6>
            </div>
          </div>
          <div
            className={
              isConnected === false ||
              activeButton === false ||
              totalCreated === 0
                ? "linear-border-disabled"
                : "linear-border"
            }
          >
            <button
              className={`btn ${
                isConnected === false ||
                activeButton === false ||
                totalCreated === 0
                  ? "outline-btn-disabled"
                  : "outline-btn"
              } px-5 w-100`}
              disabled={
                isConnected === false ||
                activeButton === false ||
                totalCreated === 0
              }
              onClick={() => {
                isConnected === true && activeButton === true
                  ? handleViewCollection()
                  : console.log();
              }}
            >
              View collection
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 col-xxl-5 mt-5  mt-xxl-0">
        <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height">
          <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
            <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
              <span className="create-land-title font-poppins ">
                Mint your CAWS TimePiece NFT
              </span>
              {coinbase && chainId === 1 && status === "" ? (
                <span
                  className="create-land-title font-poppins"
                  style={{ fontSize: "14px" }}
                >
                  Address:{" "}
                  <a
                    href={`https://etherscan.io/address/${coinbase}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="addr-text">{shortAddress(coinbase)}</span>
                  </a>
                </span>
              ) : (
                <span className="errormsg">
                  <img
                    width={18}
                    height={18}
                    src={
                      require("../../assets/landAssets/alert-triangle.svg")
                        .default
                    }
                    alt=""
                  />{" "}
                  {status}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex mt-3 flex-column flex-lg-row align-items-start gap-2 justify-content-center justify-content-xxl-between justify-content-lg-between justify-content-md-between">
            <div className="d-flex flex-column gap-2 col-12 col-lg-6">
              <span className="land-name" style={{ color: textColor }}>
                Name
              </span>
              <div className="borderText borderText2" style={{ width: "100%" }}>
                <h6
                  className="land-placeholder mb-0"
                  style={{ marginLeft: 11 }}
                >
                  {nftName === "" ? "" : `#${nftName}`}
                </h6>
              </div>
            </div>
            <div className="d-flex flex-column gap-2 col-12 col-lg-6">
              <span className="land-name" style={{ color: textColor }}>
                Description
              </span>
            </div>
          </div>
          <hr className="mint-divider m-0" />
          <div className="d-flex align-items-center justify-content-between pb-4 position-relative gap-3">
            <div className="input-container position-relative col-8 col-lg-6">
              <input
                type="number"
                placeholder="Nr. of CAWS TimePiece NFT to create"
                max={10}
                min={1}
                className="land-input w-100"
                value={parseInt(nftCount)}
                onChange={(e) => setNftCount(parseInt(e.target.value))}
              />
              <span
                className="limit-span"
                style={{
                  color: nftStatus.includes("Exceeded") ? "#D87B7B" : "#FFFFFF",
                }}
              >
                {nftStatus}
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img
                src={
                  nftCount > 1 &&
                  isConnected === true &&
                  activeButton === true &&
                  status === ""
                    ? subtractActive
                    : subtractInactive
                }
                alt="subtract"
                onClick={subtractNft}
                style={{
                  cursor:
                    isConnected === true && activeButton === true
                      ? "pointer"
                      : "default",
                  pointerEvents:
                    isConnected === true &&
                    activeButton === true &&
                    status === ""
                      ? "auto"
                      : "none",
                }}
              />
              <img
                src={
                  nftCount < 10 &&
                  nftCount >= 1 &&
                  isConnected === true &&
                  activeButton === true &&
                  status === ""
                    ? addActive
                    : addInactive
                }
                alt="add"
                onClick={addNft}
                style={{
                  cursor:
                    isConnected === true && activeButton === true
                      ? "pointer"
                      : "default",
                  pointerEvents:
                    isConnected === true &&
                    activeButton === true &&
                    status === ""
                      ? "auto"
                      : "none",
                }}
              />
            </div>
          </div>
          <hr className="mint-divider m-0" />

          <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between">
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between w-100">
              <div className="d-flex align-items-center gap-2">
                <img src={mintEthIcon} alt="ethereum" />
                <span className="eth-price">Price: 4 ETH</span>
              </div>
              <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
                <div
                  className={
                    (isConnected === true && chainId !== 1) ||
                    (status !== "Connect your wallet." && status !== "") ||
                    countdownFinished === false ||
                    mintloading === "error"
                      ? "linear-border-disabled"
                      : "linear-border"
                  }
                >
                  <button
                    className={`btn ${
                      mintloading === "error"
                        ? "filled-error-btn"
                        : (isConnected === true && chainId !== 1) ||
                          (status !== "Connect your wallet." &&
                            status !== "") ||
                          countdownFinished === false
                        ? "outline-btn-disabled"
                        : "filled-btn"
                    }  px-4 w-100`}
                    onClick={() => {
                      isConnected === true &&
                      (chainId === 1 || chainId === 5) &&
                      countdownFinished === true
                        ? handleCreate()
                        : showWalletConnect();
                    }}
                    disabled={
                      mintloading === "error" ||
                      mintloading === "success" ||
                      (isConnected === true && chainId !== 1) ||
                      (status !== "Connect your wallet." && status !== "") ||
                      countdownFinished === false
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setMouseOver(true);
                    }}
                    onMouseLeave={() => {
                      setMouseOver(false);
                    }}
                  >
                    {(isConnected === false || chainId !== 1) && (
                      <img
                        src={mouseOver === false ? blackWallet : whitewallet}
                        alt=""
                        style={{ width: "23px", height: "23px" }}
                      />
                    )}{" "}
                    {mintloading === "initial" &&
                    isConnected === true &&
                    chainId === 1 ? (
                      "Mint"
                    ) : mintloading === "mint" &&
                      isConnected === true &&
                      chainId === 1 ? (
                      <>
                        <div className="spinner-border " role="status"></div>
                      </>
                    ) : mintloading === "error" &&
                      isConnected === true &&
                      chainId === 1 ? (
                      "Failed"
                    ) : mintloading === "success" &&
                      isConnected === true &&
                      activeButton ===
                        (isConnected === true && chainId === 1) ? (
                      "Success"
                    ) : isConnected === true && chainId !== 1 ? (
                      " Switch Chain"
                    ) : (
                      "Connect wallet"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePieceMint;
