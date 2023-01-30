import React, { useEffect, useState } from "react";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import questionMark from "../../assets/landAssets/questionMark.svg";
import addActive from "../../assets/landAssets/addActive.svg";
import addInactive from "../../assets/landAssets/addInactive.svg";
import subtractActive from "../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../assets/landAssets/subtractInactive.svg";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import genesisBg from "../../assets/landAssets/genesisBg.svg";
import ToolTip from "../Caws/elements/ToolTip";
import Countdown from "react-countdown";
import axios from "axios";
import { formattedNum } from "../Caws/functions/formatUSD";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import { shortAddress } from "../Caws/functions/shortAddress";

const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-3">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{days < 10 ? "0" + days : days}</h6>
        <span className="days">Days</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
    </div>
  );
};

const LandStaking = ({
  showWalletConnect,
  handleMint,
  handleStake,
  coinbase,
  handleWithdraw,
  handleWhitelist,
  isConnected,
  withdrawModalShow,
  createdNft,
  totalCreated,
  mintStatus,
  mintloading,
  ETHrewards,
  onClaimAll,
  latestMintNft,
  chainId,
  mintPrice,
}) => {
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*10 NFT limit");
  const [showBadge, setshowBadge] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [activeButton, setactiveButton] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const handleCreate = () => {
    handleMint({
      numberOfTokens: nftCount,
    });
    // setNftCount(1);
  };

  const addNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount < 10) {
      setNftCount(nftCount + 1);
    }
    // console.log(nftCount);
  };
  const subtractNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount > 1) {
      setNftCount(nftCount - 1);
    }
    // console.log(nftCount);
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(ETHrewards));
  };

  useEffect(() => {
    if (nftCount > 10) {
      setNftStatus("*Exceeded mint limit of 10 NFTs");
      setTimeout(() => {
        setNftCount(10);
        setNftStatus("*10 NFT limit");
      }, 5000);
    }
  }, [nftCount]);

  // useEffect(() => {
  //   if (isConnected) {
  //     if (chainId !== undefined) {
  //       if (chainId !== 1 || chainId !== 5) {
  //         setactiveButton(false);
  //       }
  //       if (chainId === 1 || chainId === 5) {
  //         setactiveButton(true);
  //       }
  //     }
  //   }
  // }, [isConnected, chainId]);

  useEffect(() => {
    setUSDPrice();
    if (totalCreated > 0) {
      setshowBadge(true);
    }
  }, [totalCreated, ETHrewards]);

  return (
    <>
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
        <div className="col-12 ps-2 ps-lg-0">
          <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex flex-column gap-2">
              <span className="connect-wallet-title font-organetto">
                Whitelist time{" "}
                <span
                  className="connect-wallet-title"
                  style={{ color: "#8c56ff" }}
                >
                  remaining
                </span>
              </span>
              <Countdown date={"2023-02-13T18:15:03"} renderer={renderer} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5"
        // style={{ minHeight: "518px" }}
      >
        {/* <div
          className="col-12 col-md-4 col-xxl-2 ps-2 ps-lg-0"
          style={{ minHeight: "518px" }}
        >
          <div
            className="d-flex flex-column  gap-3 justify-content-between"
            style={{ minHeight: "518px" }}
          >
            <div className="d-flex flex-column position-relative">
              {showBadge && (
                <div className="totalcreated">
                  <span>{totalCreated}</span>
                </div>
              )}
              <div className="genesis-wrapper genesis-land d-flex justify-content-center align-items-center p-3 position-relative h-100">
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
                <h6 className="font-organetto land-desc w-75">Genesis Land</h6>
              </div>
            </div>
            <div
              className={
                isConnected === false || activeButton === false
                  ? "linear-border-disabled"
                  : "linear-border"
              }
            >
              <button
                className={`btn ${
                  isConnected === false || activeButton === false
                    ? "outline-btn-disabled"
                    : "outline-btn"
                } px-5 w-100`}
                disabled={isConnected === false || activeButton === false}
                onClick={() => {
                  isConnected === true && activeButton === true
                    ? handleStake()
                    : console.log();
                }}
              >
                View collection
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-12 col-md-12 col-xxl-8 mt-5 pt-5 pt-xxl-0 mt-xxl-0">
          <div
            className="p-0 mint-wrappernew d-flex flex-column gap-5 justify-content-center"
            style={{ minHeight: "463px" }}
          >
            <div className="position-absolute pricetag d-flex flex-column gap-1 align-items-end">
              <span className="pricetext position-relative">Price</span>
              <span className="totalprice position-relative">$ 1,200</span>
              <div className="price-separator"></div>
              <span className="pricetext position-relative">
                {" "}
                <img
                  src={mintEthIcon}
                  alt="ethereum"
                  style={{ width: 20 }}
                />{" "}
                ETH{" "}
                <span className="mintpric position-relative">
                  {getFormattedNumber(mintPrice, 2)}
                </span>
              </span>
            
            </div>
            <img
              src={require("../../assets/landAssets/genesis-hero.png")}
              alt=""
              className="minthero d-none d-xl-flex d-lg-flex"
            />
            <span className="font-organetto land-stake-title d-flex flex-column flex-lg-row gap-2">
              <span className="font-organetto" style={{ color: "#8c56ff" }}>
                Join
              </span>
              Genesis Land NFT Whitelist
            </span>
            <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
              <span className="font-organetto land-stake-titlenew">
                Become a Genesis
                <br /> land nft {"  "}
                <span className="font-organetto" style={{ color: "#8c56ff" }}>
                  Owner
                </span>
              </span>
              <span class="land-lock-timenew col-12 col-lg-9">
                Join the Genesis Land NFT whitelist now! Upon mint, users will
                gain immediate access to their land and all of it's benefits.
              </span>
              <div className="row m-0 gap-1 align-items-center">
                <img
                  src={require("../../assets/landAssets/cawsimg.png")}
                  alt=""
                  className="cawsimg"
                />
                <span className="whitelist-desc col-xxl-5 col-lg-5 p-0 m-0">
                  *If you are currently holding or staking a CAWS NFT, you will
                  receive a <br className="discount-break" />
                  <mark className="marktext">20% discount</mark> on the World of
                  Dypians Genesis Land NFT mint price.
                </span>
              </div>
              <div
                className={
                  mintloading === "error"
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn 
                    filled-btn
                    px-5 w-100`}
                  onClick={() => {
                    handleWhitelist();
                  }}
                >
                  Join Whitelist
                </button>
              </div>
              <img
                src={require("../../components/LandPopup/landPopup.webp")}
                alt="land nft"
                className="w-100 d-flex d-lg-none"
              />
            </div>
            {/*  <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
              <div className="d-flex justify-content-between gap-2">
                <span className="create-land-title font-poppins ">
                  Create your Genesis Land NFT
                </span>
                {coinbase && (chainId === 1 || chainId === 5) ? (
                  <span className="create-land-title font-poppins">
                    Wallet Address: {shortAddress(coinbase)}
                  </span>
                ) : coinbase && (chainId !== 1 || chainId !== 5) ? (
                  <span className="errormsg">
                    <img
                      src={
                        require("../../assets/landAssets/alert-triangle.svg")
                          .default
                      }
                      alt=""
                    />{" "}
                    Please switch to Ethereum Chain to continue minting
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="more-info">More information</span>
                <ToolTip
                  title={
                    "Mint your Genesis Land NFT to gain access to a variety of WoD Metaverse benefits."
                  }
                  icon={"?"}
                  color={"#000"}
                  borderColor={"#7BD8B0"}
                  padding={"0px 8px"}
                />
              </div>
            </div>
            <div className="d-flex mt-3 align-items-center">
              <div className="d-flex flex-column gap-2 w-50">
                <span className="land-placeholder">Name</span>
                <h6 className="land-name">{latestMintNft[0]?.name}</h6>
              </div>
              <div className="d-flex flex-column gap-2 w-50">
                <span className="land-placeholder">Description</span>
                <h6 className="land-name">Genesis Land</h6>
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-center justify-content-between pb-4">
              <div className="input-container position-relative w-50">
                <input
                  type="number"
                  placeholder="Nr. of Land NFT to create"
                  max={10}
                  min={1}
                  className="land-input w-100"
                  value={nftCount}
                  onChange={(e) => setNftCount(e.target.value)}
                />
                <span
                  className="limit-span"
                  style={{
                    color: nftStatus.includes("Exceeded")
                      ? "#D87B7B"
                      : "#FFFFFF",
                  }}
                >
                  {nftStatus}
                </span>
              </div>
              <div className="d-flex align-items-center gap-5">
                <img
                  src={
                    nftCount > 1 &&
                    isConnected === true &&
                    activeButton === true
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
                      isConnected === true && activeButton === true
                        ? "auto"
                        : "none",
                  }}
                />
                <img
                  src={
                    nftCount < 10 &&
                    nftCount >= 1 &&
                    isConnected === true &&
                    activeButton === true
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
                      isConnected === true && activeButton === true
                        ? "auto"
                        : "none",
                  }}
                />
              </div>
            </div>
            <hr className="mint-divider m-0" />
            {mintStatus.length > 0 && (
              <span className="mint-span">{mintStatus}</span>
            )}
            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={mintEthIcon} alt="ethereum" />
                <span className="eth-price">
                  Price: {getFormattedNumber(mintPrice, 2)} ETH
                </span>
              </div>
              <div
                className={
                  mintloading === "error"
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    mintloading === "error" ? "filled-error-btn" : "filled-btn"
                  }  px-5 w-100`}
                  onClick={() => {
                    isConnected === true && (chainId === 1 || chainId === 5)
                      ?
                        handleWhitelist()
                      : showWalletConnect();
                  }}
                  disabled={
                    mintloading === "error" ||
                    mintloading === "success" ||
                    (isConnected === true && chainId !== 1 && chainId !== 5)
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
                  {(isConnected === false ||
                    chainId !== 1 ||
                    chainId !== 5) && (
                    <img
                      src={mouseOver === false ? blackWallet : whitewallet}
                      alt=""
                    />
                  )}{" "}
                  {mintloading === "initial" &&
                  isConnected === true &&
                  (chainId === 1 || chainId === 5) ? (
                    "Join Whitelist"
                  ) : mintloading === "mint" &&
                    isConnected === true &&
                    (chainId === 1 || chainId === 5) ? (
                    <>
                      <div className="spinner-border " role="status"></div>
                    </>
                  ) : mintloading === "error" &&
                    isConnected === true &&
                    (chainId === 1 || chainId === 5) ? (
                    "Failed"
                  ) : mintloading === "success" &&
                    isConnected === true &&
                    activeButton ===
                      (isConnected === true &&
                        (chainId === 1 || chainId === 5)) ? (
                    "Success"
                  ) : (
                    "Connect wallet"
                  )}
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-xxl-4 pe-2 pe-lg-0 mt-5 pt-5 pt-xxl-0 mt-xxl-0">
          <div
            className="p-3 mint-wrapper d-flex flex-column gap-1"
            // style={{ minHeight: "518px" }}
          >
            <span className="font-organetto land-stake-title">
              Genesis Land NFT{" "}
              <span className="font-organetto" style={{ color: "#8c56ff" }}>
                staking
              </span>
            </span>
            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
              <span className="create-land-title font-poppins">
                Genesis Land Staking
              </span>
              <div className="d-flex align-items-center gap-2">
                <span className="more-info">More information</span>
                <ToolTip
                  title={
                    "Stake your Genesis Land NFT into the 25% APR pool and earn rewards in Ethereum."
                  }
                  icon={"?"}
                  color={"#000"}
                  borderColor={"#7BD8B0"}
                  padding={"0px 8px"}
                />
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="land-apr">
                  25%{" "}
                  <span className="land-apr" style={{ color: "#8c56ff" }}>
                    APR
                  </span>
                </h6>
                <span className="land-lock-time">No lock time</span>
              </div>
              <div
                className={
                  isConnected === false || activeButton === false
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    isConnected === false || activeButton === false
                      ? "outline-btn-disabled"
                      : "filled-btn"
                  } px-5 w-100`}
                  disabled={isConnected === false || activeButton === false}
                  onClick={() => {
                    isConnected === true && activeButton === true
                      ? handleStake()
                      : console.log();
                  }}
                >
                  Stake NFT
                </button>
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column gap-1">
                <h6 className="create-land-title">Total rewards</h6>
                <span className="earned-span">Earned</span>
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={mintEthIcon}
                      width={20}
                      height={20}
                      alt="ethereum"
                    />
                    <span className="eth-rewards">
                      {getFormattedNumber(ETHrewards, 6)} ETH
                    </span>
                  </div>
                  <span className="eth-rewards">
                    ({formattedNum(ethToUSD, true)})
                  </span>
                </div>
              </div>
              <div
                className={
                  (isConnected === false && activeButton === false) ||
                  ETHrewards == 0
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    (isConnected === false && activeButton === false) ||
                    ETHrewards == 0
                      ? "outline-btn-disabled"
                      : "filled-btn"
                  } px-5 w-100`}
                  disabled={
                    (isConnected === false && activeButton === false) ||
                    ETHrewards == 0
                  }
                  onClick={onClaimAll}
                >
                  Claim all
                </button>
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="create-land-title">Unstake</h6>
                <span className="land-lock-time">
                  Withdraw your deposited NFTs from the staking pool
                </span>
              </div>
              <div
                className={
                  isConnected === false || activeButton === false
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    isConnected === false || activeButton === false
                      ? "outline-btn-disabled"
                      : "outline-btn"
                  } px-5 w-100`}
                  disabled={isConnected === false || activeButton === false}
                  onClick={() => {
                    withdrawModalShow();
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandStaking;
