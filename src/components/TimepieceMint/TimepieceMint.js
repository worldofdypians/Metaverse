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
  cawsArray,
  calculateCaws,
}) => {
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [status, setStatus] = useState("Connect your wallet.");

  const [showBadge, setshowBadge] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [activeButton, setactiveButton] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [grandPrice, setGrandPrice] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(true);
  const [latestMintId, setlatestMintId] = useState(0);

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
  };

  const addNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount < cawsArray.length) {
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

  const getTimepieceLatestMint = async()=>{
    const result = await window.caws_timepiece.getTimepieceLatestMint()
    setlatestMintId(result-1);
  }

  const benefits = [
    {
      title: "Exclusive Access",
      icon: "draft",
    },
    {
      title: "Enhanced Interactions",
      icon: "user",
    },
    {
      title: "Special Rewards",
      icon: "star",
    },
    {
      title: "Expanded Functionality",
      icon: "expand",
    },
  ];

  useEffect(() => {
    if (coinbase && chainId === 1) {
      if (cawsArray.length === 0) {
        setNftStatus("*You are not holding any CAWS NFT.");
      } else if (cawsArray.length > 0) {
        if (cawsArray.length < nftCount && cawsArray.length > 0) {
          setNftStatus("*You don't have enough CAWS NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        }
       else if (nftCount > 50 && cawsArray.length === 50) {
          setNftStatus("*Exceeded mint limit of 10 NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        } else if (cawsArray.length > 0 && cawsArray.length >= nftCount) {
          setNftStatus("*50 NFT limit.");
          
        };
      }
    }
  }, [nftCount, coinbase, cawsArray.length]);

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
      getTimepieceLatestMint()
  }, [isConnected, chainId, coinbase]);


  useEffect(() => {
    if (isConnected) {
      calculateCaws({
        numberOfTokens: parseInt(nftCount),
      });
    }
  }, [
    nftCount,
    isConnected,
    coinbase,
    chainId, cawsArray.length
  ]);


  useEffect(()=>{
    if(coinbase && isConnected && chainId === 1) {
      if(totalCreated > 0) {
        setshowBadge(true)
      }
    }
  }, [coinbase, chainId, isConnected, totalCreated])

  return (
    <div className="row justify-content-between align-items-center w-100 mx-0 px-3 py-3 p-lg-5 gap-5 gap-lg-0">
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 mb-4">
        <h6 className="land-tiers font-organetto d-flex flex-column flex-lg-row align-items-center">
          CAWS timepiece{" "}
          <span
            className="land-tiers font-organetto"
            style={{ color: "#8c56ff" }}
          >
            minting
          </span>
        </h6>
        <span className="tiers-desc">
          Mint your CAWS Timepiece NFT for free using your original CAWS NFT and
          unlock exclusive metaverse benefits.{" "}
        </span>
      </div>
        <div className="col-12 col-md-12 col-xxl-2 ps-2 ps-lg-0 staking-height-2">
          <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
            <div className="d-flex flex-column position-relative">
              {showBadge && totalCreated > 0 && (
                <div className="totalcreated">
                  <span>{totalCreated}</span>
                </div>
              )}
              <div
                className={`genesis-wrapper ${
                  totalCreated > 0 ? "genesis-land" : "genesis-land-empty"
                } d-flex justify-content-center align-items-center p-3 position-relative`}
                style={{height: 312}}
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
                <h6 className="font-organetto land-desc w-75">CAWS TIMEPIECE</h6>
              </div>
            </div>
            <div
              className={
                isConnected === false ||
                activeButton === false  ||
                totalCreated === 0
                  ? "linear-border-disabled"
                  : "linear-border"
              }
            >
              <button
                className={`btn ${
                  isConnected === false ||
                  activeButton === false  ||
                  totalCreated === 0
                    ? "outline-btn-disabled"
                    : "outline-btn"
                } px-5 w-100`}
                disabled={
                  isConnected === false ||
                  activeButton === false ||
                  totalCreated === 0
                }
                onClick={handleViewCollection}
              >
                View collection
              </button>
            </div>
          </div>
        </div>
      <div className="col-12 col-md-12 col-xxl-6 mt-0 px-0"
        style={{ overflowX: "hidden" }}
      >
        <div
          className="p-4 mint-wrappernew d-flex flex-column gap-5 justify-content-center staking-height"
          style={{ minHeight: "463px" }}
        >
          <img
            src={require("./assets/timepiecehero.webp")}
            alt=""
            className="minthero d-none d-xl-flex d-lg-flex"
          />
          <h6 className="newminttitle font-organetto position-relative">
            Mint your Timepiece <br />nft 
            <span className="newminttitle-marked mx-2">now!</span>
          </h6>
          <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
            <div className="mint-benefits-grid">
              {benefits.map((item) => (
                <div className="d-flex align-items-center gap-2">
                  <img src={require(`./assets/${item.icon}.png`)} alt="" style={{scale: item.icon === 'expand' ? '0.8' : '1'}}/>
                  <span className="mint-benefits-title">{item.title}</span>
                </div>
              ))}
            </div>
          
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 col-xxl-4 mt-0">
        <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
          <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
            <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
            <span className="land-name">
            Available NFTs to mint:{" "}
            <span className="addr-text" style={{ color: "rgb(123, 216, 176)" }}>
              {cawsArray.length}
            </span>
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
         
          <div className="d-flex mt-0 flex-column flex-lg-row align-items-start gap-2 justify-content-center justify-content-xxl-between justify-content-lg-between justify-content-md-between">
            <div className="d-flex flex-column gap-2 col-12 col-lg-6">
              <span className="land-name">
                Name
              </span>
              <div className="borderText borderText2" style={{ width: "100%" }}>
                <h6
                  className="land-placeholder mb-0"
                  style={{ marginLeft: 11 }}
                >
                  {nftName === "" ? "" : `Caws Timepiece`}
                </h6>
              </div>
            </div>
            <div className="d-flex flex-column gap-2 col-12 col-lg-6">
              <span className="land-name">
                Latest Mint
              </span>
              <h6
                  className="land-placeholder borderText"
                  style={{ fontSize: "12px", paddingLeft: 14, lineHeight: '40px' }}
                >
                 # {latestMintId}
                
                  </h6>
            </div>
          </div>
          <hr className="mint-divider m-0" />
          <div className="d-flex align-items-center justify-content-between position-relative gap-3">
            <div className="input-container position-relative col-8 col-lg-6">
              <input
                type="number"
                placeholder="Nr. of CAWS TimePiece NFT to create"
                max={cawsArray.length}
                min={1}
                className="land-input w-100"
                value={parseInt(nftCount)}
                onChange={(e) => setNftCount(parseInt(e.target.value))}
              />
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
                  nftCount < cawsArray.length &&
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
          <span
            className="limit-span position-relative"
            style={{
              color: nftStatus.includes("Exceeded") ? "#D87B7B" : "#FFFFFF",
              bottom: "auto",
            }}
          >
            {nftStatus}
          </span>
          <hr className="mint-divider m-0" />
          {/* {cawsArray.length > 0 && nftCount > 0 && (
            <span className="land-name">
              Number of CAWS NFTs left after minting:{" "}
              <span
                className="addr-text"
                style={{ color: "rgb(123, 216, 176)" }}
              >
                {cawsArray.length - nftCount}
              </span>
            </span>
          )}  */}
           {mintStatus.length > 0 && (
              <span style={{ color: textColor }}
                className={
                  mintStatus.includes("Success")
                    ? "mint-span-success"
                    : "mint-span"
                }
              >
                {mintStatus}
              </span>
            )}
          <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between">
            <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center justify-content-xxl-end justify-content-lg-end justify-content-center w-100">
              <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
                <div
                  className={
                    (isConnected === true &&
                      chainId !== 1 &&
                      cawsArray.length === 0) ||
                    (status !== "Connect your wallet." && status !== "") ||
                    mintloading === "error" ||
                    (isConnected === true &&
                      chainId === 1 &&
                      cawsArray.length === 0)
                      ? "linear-border-disabled"
                      : "linear-border"
                  }
                >
                  <button
                    className={`btn ${
                      mintloading === "error"
                        ? "filled-error-btn"
                        : (isConnected === true &&
                            chainId !== 1 &&
                            cawsArray.length === 0) ||
                          (status !== "Connect your wallet." &&
                            status !== "") ||
                          (isConnected === true &&
                            chainId === 1 &&
                            cawsArray.length === 0)
                        ? "outline-btn-disabled"
                        : "filled-btn"
                    }  px-4 w-100`}
                    onClick={() => {
                      isConnected === true && chainId === 1
                        ? handleCreate()
                        : showWalletConnect();
                    }}
                    disabled={
                      mintloading === "error" ||
                      mintloading === "success" ||
                      (isConnected === true && chainId !== 1) ||
                      (status !== "Connect your wallet." && status !== "") ||
                      (isConnected === true &&
                        chainId === 1 &&
                        cawsArray.length === 0)
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
