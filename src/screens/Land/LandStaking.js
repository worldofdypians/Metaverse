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


const renderer = ({days, hours, minutes}) => {
  return (
    <>
    <div className="d-flex align-items-center gap-2">
    <div className="d-flex flex-column align-items-center" style={{width: '40px'}}>
        <span className="eth-price mb-0">{days}</span>
        <span className="eth-price" style={{fontWeight: 300}}>days</span>
      </div>
      <span className="eth-price" style={{position: 'relative', bottom: '13px'}}>:</span>
      <div className="d-flex flex-column align-items-center" style={{width: '40px'}}>
        <span className="eth-price mb-0">{hours}</span>
        <span className="eth-price" style={{fontWeight: 300}}>hours</span>
      </div>
      <span className="eth-price" style={{position: 'relative', bottom: '13px'}}>:</span>
      <div className="d-flex flex-column align-items-center" style={{width: '40px'}}>
        <span className="eth-price mb-0">{minutes}</span>
        <span className="eth-price" style={{fontWeight: 300}}>minutes</span>
      </div>
    </div>
    </>
  )
}


const LandStaking = ({
  showWalletConnect,
  handleMint,
  handleStake,
  checkTotalcaws,
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
  totalCaws,
  mintPriceDiscount,
  totalCAWSAvailable,
  mystakes,
  cawsToUse,
  cawsMinted,
  cawsStaked,
  limit,
  landName
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
  const [countdownFinished, setCountdownFinished] = useState(false);



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

  const checkData = async () => {
    if (coinbase) {
      let result = window.checkWhitelistLand(coinbase);
    
      if (result === 1 && chainId === 1) {
        setStatus("");
      }
      else if(result !==1  && chainId === 1){
        setStatus("This wallet is not whitelisted");
       
      }
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

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(ETHrewards));
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
      checkTotalcaws({
        numberOfTokens: parseInt(nftCount),
      });
    }
  }, [
    nftCount,
    isConnected,
    coinbase,
    chainId,
    cawsToUse,
    cawsMinted,
    cawsStaked,
  ]);

  useEffect(() => {
    if (isConnected) {
      if (chainId !== undefined) {
        if (chainId !== 1) {
          setactiveButton(false);
          setStatus("Switch to Ethereum Chain to continue minting.");
        }
        if (chainId === 1) {
          setactiveButton(true);
        }
      }
      checkData();
    }
  }, [isConnected, chainId, coinbase]);

  useEffect(() => {
    setUSDPrice();
    if (totalCreated > 0) {
      setshowBadge(true);
    }
  }, [totalCreated, ETHrewards]);

  useEffect(() => {
    if (totalCaws !== 0) {
      if(totalCaws>=  nftCount)
     { const discountprice = (nftCount*mintPrice) - (totalCaws*mintPriceDiscount)
      setdiscountprice(discountprice)}
      if(totalCaws < nftCount) {
        const finalITem = nftCount - totalCaws
        const discountprice =  (finalITem*mintPrice) - (totalCaws*mintPriceDiscount)
      setdiscountprice(discountprice)
      }
      let newPrice =
        (mintPriceDiscount * totalCaws +
          mintPrice * (nftCount - totalCaws))
      setGrandPrice(newPrice);
    } else {
      let newPrice = mintPrice * nftCount;

      setGrandPrice(newPrice);
    }
  }, [nftCount, totalCaws, mintPrice]);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h6 className="land-tiers font-organetto d-flex flex-column flex-lg-row align-items-center">
          Genesis Land{" "}
          <span
            className="land-tiers font-organetto"
            style={{ color: "#8c56ff" }}
          >
            NFTs
          </span>
        </h6>
        <span className="tiers-desc">
          Create and own your own property inside of the World of Dypians.
          Leverage its benefits in the virtual world and earn rewards through
          staking.
        </span>
      </div>
    
      <div
        className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5"
      >
        <div
          className="col-12 col-md-12 col-xxl-2 ps-2 ps-lg-0 staking-height"
        
        >
          <div
            className="d-flex flex-column gap-3 justify-content-between staking-height"
          
          >
            <div className="d-flex flex-column position-relative">
              {showBadge && (
                <div className="totalcreated">
                  <span>{totalCreated}</span>
                </div>
              )}
              <div className={`genesis-wrapper ${totalCreated > 0 ? 'genesis-land' : 'genesis-land-empty'} d-flex justify-content-center align-items-center p-3 position-relative h-100`}>
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
                isConnected === false || activeButton === false || status !== "" || createdNft === 0
                  ? "linear-border-disabled"
                  : "linear-border"
              }
            >
              <button
                className={`btn ${
                  isConnected === false ||
                  activeButton === false ||
                  status !== ""|| createdNft === 0
                    ? "outline-btn-disabled"
                    : "outline-btn"
                } px-5 w-100`}
                disabled={
                  isConnected === false ||
                  activeButton === false ||
                  status !== ""|| createdNft === 0
                }
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
        </div>
        <div className="col-12 col-md-12 col-xxl-4 mt-5  mt-xxl-0">
          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height">
            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
              <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                <span className="create-land-title font-poppins ">
                  Mint your Genesis Land NFT
                </span>
                {coinbase &&
                (chainId === 1 || chainId === 5) &&
                status === "" ? (
                  <span className="create-land-title font-poppins">
                    Address:{" "}
                    <a
                      href={`https://etherscan.io/address/${coinbase}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="addr-text">
                        {shortAddress(coinbase)}
                      </span>
                    </a>
                  </span>
                ) : (
                  <span className="errormsg">
                    <img
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
                <span className="land-name">Name</span>
                <div
                  className="borderText borderText2"
                  style={{ width: "100%" }}
                >
                  <h6
                    className="land-placeholder mb-0"
                    style={{ marginLeft: 11 }}
                  >
                     {landName === '' ? '' : `#${landName}`}
                  </h6>
                </div>
              </div>
              <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                <span className="land-name">Description</span>

                <h6
                  className="land-placeholder borderText"
                  style={{ fontSize: "12px" }}
                >
                  Enjoy the land inside of WoD and stake the NFT for additional
                  rewards.
                  <a
                    href="https://drive.google.com/drive/folders/1zURuJDGoePa9V1GMkTGTbKMcaFd4UScp?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    className="addr-text"
                  >
                    {" "}
                    Download
                  </a>
                </h6>
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-center justify-content-between pb-4 position-relative gap-3">
              <div className="input-container position-relative col-8 col-lg-6">
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
                <span className="eth-price">
                  Price:{" "}
                  {getFormattedNumber(
                    totalCaws > 0 ? mintPriceDiscount : mintPrice,
                    4
                  )}{" "}
                  ETH
                </span>
              </div>
              <div className="d-flex flex-column align-items-center">
                {countdownFinished === false ? <>
                <h6 className="eth-price">MINT COUNTDOWN:</h6>
              <Countdown renderer={renderer} date={"2023-02-23T13:00:00"} onComplete={()=>{setCountdownFinished(true)}}/></> : <>
              <h6 className="eth-price">WHITELIST COUNTDOWN:</h6>
              <Countdown renderer={renderer} date={"2023-02-24T17:00:00"} /></>}
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-xxl-2 mt-5  mt-xxl-0">
          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height">
            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2 position-relative justify-content-start justify-content-between">
                <span className="create-land-title font-poppins">
                  Minting Summary
                </span>
                <ToolTip
                  title={
                    <React.Fragment>
                      <ul className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                        <li>
                          {" "}
                          The maximum number of NFTs that can be minted per
                          transaction is 10.
                        </li>
                        <li>
                          {" "}
                          CAWS NFT holders are eligible for a 20% discount on
                          their Genesis Land NFT purchases.
                        </li>
                        <li>
                          The CAWS NFT discount is given at a 1:1 ratio with
                          Genesis Land NFT purchases.
                        </li>
                        <li>
                          Discounts are not stackable, meaning that you cannot
                          use the same CAWS NFT to obtain further discounts.
                        </li>
                      </ul>
                    </React.Fragment>
                  }
                  icon={"i"}
                  color={"#000"}
                  borderColor={"#7BD8B0"}
                  padding={"0px 10px"}
                />
              </div>
            </div>
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column w-50">
                <span className="land-placeholder">Genesis Land</span>
                <span className="land-placeholder" style={{ color: "#09fbd3" }}>
                  x {nftCount}
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <h6 className="land-name m-0">
                  {getFormattedNumber(mintPrice * nftCount, 4)} ETH
                </h6>
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column w-50">
                <span className="land-placeholder">CAWS Discount</span>
                <span className="land-placeholder" style={{ color: "#09fbd3" }}>
                  x {totalCaws}
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <h6 className="discountprice m-0">
                 {(discountprice) > 0 && '-'} {getFormattedNumber(discountprice, 4)} ETH
                </h6>
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column w-50">
                <span className="land-placeholder">Grand total</span>
              </div>
              <div className="d-flex flex-column gap-2">
                <h6 className="totalprice2 m-0">
                  {getFormattedNumber(grandPrice, 4)} ETH
                </h6>
              </div>
            </div>
            <span className="notetxt">
              *Available CAWS for discount eligibility: you have {limit}/
              {cawsToUse} CAWS remaining.
            </span>
            <hr className="mint-divider m-0" />
            {mintStatus.length > 0 && (
              <span
                className={
                  mintStatus.includes("Success")
                    ? "mint-span-success"
                    : "mint-span"
                }
              >
                {mintStatus}
              </span>
            )}
            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
              <div
                className={
                  // (status !== "Connect your wallet." && status !== "" && countdownFinished === false)

                  // mintloading === "error" ||
                  ( countdownFinished === false)
                  
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    // mintloading === "error"
                    //   ? "filled-error-btn"
                    //   : status !== "Connect your wallet." &&
                    //     status !== "" && 
                        countdownFinished === false
                      ? "outline-btn-disabled"
                      : "filled-btn"
                  }  px-4 w-100`}
                  onClick={() => {
                    isConnected === true && (chainId === 1 || chainId === 5) && countdownFinished === true
                      ? handleCreate()
                      : showWalletConnect();
                  }}
                  // disabled={
                  //   mintloading === "error" ||
                  //   mintloading === "success" ||
                  //   (isConnected === true && chainId !== 1 && chainId !== 5 && countdownFinished === false) ||
                  //   (status !== "Connect your wallet." && status !== "")
                  //     ? true
                  //     : false
                  // }

                  disabled={countdownFinished === false
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
                    (chainId !== 1)) && (
                    <img
                      src={mouseOver === false ? blackWallet : whitewallet}
                      alt=""
                      style={{ width: "23px", height: "23px" }}
                    />
                  )}{" "}
                  {/* {mintloading === "initial" &&
                  isConnected === true &&
                  (chainId === 1) ? (
                    "Mint"
                  ) : mintloading === "mint" &&
                    isConnected === true &&
                    (chainId === 1) ? (
                    <>
                      <div className="spinner-border " role="status"></div>
                    </>
                  ) : mintloading === "error" &&
                    isConnected === true &&
                    (chainId === 1) ? (
                    "Failed"
                  ) : mintloading === "success" &&
                    isConnected === true &&
                    activeButton ===
                      (isConnected === true &&
                        (chainId === 1)) ? (
                    "Success"
                  ) : (

                    ""
                  )} */}
                  Connect wallet
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xxl-4 pe-2 pe-lg-0 mt-5  mt-xxl-0">
          <div className="p-3 mint-wrapper d-flex flex-column gap-1 justify-content-between staking-height">
           
            <div className="row gap-1 align-items-center justify-content-between">
              <span
                className="create-land-title font-poppins"
                style={{ width: "fit-content" }}
              >
                Genesis Land Staking
              </span>
              <div
                className="d-flex align-items-center gap-2"
                style={{ width: "fit-content" }}
              >
                
                <ToolTip
                  title={
                    <React.Fragment>
                      <ul className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                        <li>
                          {" "}
                          When interacting with the staking pool for the first
                          time, you are required to approve and deposit. For
                          additional transactions, you will only be asked for
                          deposit.
                        </li>
                        <li>You can stake or unstake multiple NFTs at once.</li>
                        <li>
                          The maximum number of NFTs that can be staked or
                          unstaked per round is 50.
                        </li>
                        <li>
                          {" "}
                          You have the option to claim your ETH rewards in total
                          or withdraw them separately based on the Land NFTs you
                          have staked.
                        </li>
                      </ul>
                    </React.Fragment>
                  }
                  icon={"i"}
                  color={"#000"}
                  borderColor={"#7BD8B0"}
                  padding={"0px 10px"}
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
                  isConnected === false ||
                  activeButton === false || createdNft === 0 ||
                  status !== ""
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    isConnected === false ||
                    activeButton === false || createdNft === 0 ||
                    status !== ""
                      ? "outline-btn-disabled"
                      : "filled-btn"
                  } px-5 w-100`}
                  disabled={
                    isConnected === false ||
                    activeButton === false || createdNft === 0 ||
                    status !== ""
                  }
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
            <div className="d-flex align-items-end flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between  align-items-end gap-2">
              <div className="d-flex flex-column gap-1 w-100">
                <h6 className="create-land-title">Total rewards</h6>
                <div className="d-flex align-items-start justify-content-between gap-2 flex-column">
                  <span className="earned-span">Earned</span>
                  <div className="d-flex align-items-start align-items-lg-center gap-xxl-3 gap-lg-3 gap-md-3 gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={mintEthIcon}
                        width={20}
                        height={20}
                        alt="ethereum"
                      />
                      <span className="eth-rewards">
                        {getFormattedNumber(ETHrewards, 7)} ETH
                      </span>
                    </div>
                    <span className="eth-rewards">
                      ({formattedNum(ethToUSD, true)})
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={
                  (isConnected === false && activeButton === false) ||
                  ETHrewards === 0 ||
                  status !== ""
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    (isConnected === false && activeButton === false) ||
                    ETHrewards === 0 ||
                    status !== ""
                      ? "outline-btn-disabled"
                      : "filled-btn"
                  } px-5 w-100`}
                  disabled={
                    (isConnected === false && activeButton === false) ||
                    ETHrewards === 0 ||
                    status !== ""
                  }
                  onClick={onClaimAll}
                >
                  Claim all
                </button>
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-end justify-content-between flex-column flex-xxl-row flex-lg-row flex-md-row align-items-end">
              <div className="d-flex flex-column gap-2">
                <h6 className="create-land-title">Unstake</h6>
                <span className="land-lock-time p-0">
                  Withdraw your deposited NFTs from the staking pool
                </span>
              </div>
              <div
                className={
                  isConnected === false ||
                  activeButton === false ||
                  status !== "" ||
                  mystakes === 0
                    ? "linear-border-disabled"
                    : "linear-border"
                }
              >
                <button
                  className={`btn ${
                    isConnected === false ||
                    activeButton === false ||
                    status !== "" ||
                    mystakes === 0
                      ? "outline-btn-disabled"
                      : "outline-btn"
                  } px-5 w-100`}
                  disabled={
                    isConnected === false ||
                    activeButton === false ||
                    status !== "" ||
                    mystakes === 0
                  }
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
