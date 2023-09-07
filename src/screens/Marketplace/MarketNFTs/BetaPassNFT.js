import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import arrowRight from "./assets/arrowRight.svg";

import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import coinbaseimg from "./assets/base.svg";
import { useLocation } from "react-router-dom";
import blockChainIcon from "../assets/blockChainIcon.svg";
import confluxLogo from "../assets/confluxLogo.svg";
import baseLogo from "../assets/baseLogo.svg";
import bnbLogo from "../assets/bnbLogo.svg";
import wodLogo from "../assets/wodIcon.png";
import blackWallet from "../../../assets/wallet-black.svg";
import whitewallet from "../../../assets/wallet-white.svg";
import addActive from "../../../assets/landAssets/addActive.svg";
import addInactive from "../../../assets/landAssets/addInactive.svg";
import subtractActive from "../../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../../assets/landAssets/subtractInactive.svg";
import dummyBadge from "../../../assets/landAssets/dummyBadge.png";
import avaxLogo from "./assets/avaxLogo.svg";
import betapassBanner from "./assets/betaPassBanner.png";
import avaxbetapassBanner from "./assets/betapassAvax.png";
import geckobetapassBanner from "./assets/betaPassBannerGecko.png";
import SingUpGecko from "../../Account/src/Containers/SingUp/SignUpGecko";
import PlayerCreationGecko from "../../Account/src/Containers/PlayerCreation/PlayerCreationGecko";
import pinkArea from "./assets/pinkArea.svg";
import walletImg from "./assets/wallet.svg";
import circleArrow from "./assets/arrow-circle.svg";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const BetaPassNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  cawsBought,
  handleRefreshListing,
  chainId,
  totalCreated,
  mintloading,
  showWalletConnect,
  cawsArray,
  textColor,
  mintStatus,
  nftName,
  handleMint,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

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

  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: "conflux-mint-bg",
  };

  const avaxData = {
    id: "avax",
    cardTitle: "Avalanche Beta Pass",
    title: "Avalanche Beta Pass",
    background: "avalanche-mint-bg",
  };

  const timepieceData = {
    id: "timepiece",
    cardTitle: "Caws Timepiece",
    title: "Timepiece",
    background: "market-mint-bg",
  };
  const coin98Data = {
    id: "coin98",
    cardTitle: "Coin98 Beta Pass",
    title: "Coin98 Beta Pass",
    background: "coin98-mint-bg",
  };
  const coingeckoData = {
    id: "coingecko",
    cardTitle: "CoinGecko Beta Pass",
    title: "CoinGecko Beta Pass",
    background: "coingecko-mint-bg",
  };
  const baseData = {
    id: "base",
    cardTitle: "Base Beta Pass",
    title: "Base Beta Pass",
    background: "base-mint-bg",
  };

  const locationState = location?.pathname;

  const [priceCount, setPriceCount] = useState(0);
  const [filterTitle, setFilterTitle] = useState("Filter");
  const [showBadge, setshowBadge] = useState(false);
  const [latestMintId, setlatestMintId] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const [status, setStatus] = useState("Connect your wallet.");
  const [activeButton, setactiveButton] = useState(false);
  const [selectedMint, setSelectedMint] = useState(coingeckoData);
  const [mintTitle, setMintTitle] = useState("coingecko");
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [viewCollection, setViewCollection] = useState(false);
  const [playerCreation, setplayerCreation] = useState(false);
  const [linkWallet, setLinkWallet] = useState(false);

  const handleViewCollection = () => {
    setViewCollection(true);
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllCawsCollection();
    // fetchFilters();
    document.title = "Beta Pass";
  }, []);

  useEffect(() => {
    if (locationState.includes("/beta-pass/conflux")) {
      setSelectedMint(confluxData);
      setMintTitle("conflux");
    } else if (locationState.includes("/beta-pass/coingecko")) {
      setSelectedMint(coingeckoData);
      setMintTitle("coingecko");
    } else if (locationState.includes("/beta-pass/coin98")) {
      setSelectedMint(coin98Data);
      setMintTitle("coin98");
    } else if (locationState.includes("/beta-pass/base")) {
      setSelectedMint(baseData);
      setMintTitle("base");
    } else if (locationState.includes("/beta-pass/avalanche")) {
      setSelectedMint(avaxData);
      setMintTitle("avalanche");
    }
  }, []);

  return (
    <div
      id="header"
      // onScroll={onScroll}
      // ref={listInnerRef}
      // style={{ overflow: "scroll" }}
    >
      <div
        className="container-fluid d-flex justify-content-end p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative flex-column"
          style={{ backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4 mb-5 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                    {mintTitle} Beta Pass
                  </h6>
                  <p className="collection-desc">
                    The Beta Pass NFT provides you with a special ticket to
                    enter the metaverse and participate in an exclusive event
                    hosted by our partners. During this event, players have the
                    opportunity to earn Points for their leaderboard rankings,
                    and also collect rewards in different tokens, which are
                    distributed on a monthly basis.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4 px-0">
                <img
                  src={
                    mintTitle === "avalanche"
                      ? avaxbetapassBanner
                      : mintTitle === "coingecko"
                      ? geckobetapassBanner
                      : betapassBanner
                  }
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
            {/* <div
              className="filters-container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-center my-4 p-3 position-relative gap-3"
              style={{ zIndex: 2 }}
            >
              <div className="d-flex align-items-center gap-4 justify-content-center flex-wrap">
               
              <NavLink
                  to={"/marketplace/beta-pass/avalanche"}
                  className={`${
                    location.pathname.includes("avalanche") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(avaxData); setMintTitle("avalanche")}}
                >
                  <img src={avaxLogo} className="beta-pass-chain-img" alt="" />
                  <span>Avalanche</span>
                </NavLink>

                <NavLink
                  to={"/marketplace/beta-pass/conflux"}
                  className={`${
                    location.pathname.includes("conflux") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(confluxData); setMintTitle("conflux")}}
                >
                  <img src={conflux} className="beta-pass-chain-img" alt="" />
                  <span>Conflux</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coin98"}
                  className={`${
                    location.pathname.includes("coin98") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(coin98Data); setMintTitle("coin98")}}
                >
                  <img src={coin98} className="beta-pass-chain-img" alt="" />
                  <span>Coin98</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coingecko"}
                  className={`${
                    location.pathname.includes("coingecko") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(coingeckoData); setMintTitle("coingecko")}}

                >
                  <img src={coingecko} className="beta-pass-chain-img" alt="" />
                  <span>CoinGecko</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/base"}
                  className={`${
                    location.pathname.includes("base") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(baseData); setMintTitle("base")}}

                >
                  <img
                    src={coinbaseimg}
                    className="beta-pass-chain-img"
                    alt=""
                  />
                  <span>Base</span>
                </NavLink>
              </div>
            </div> */}

            <div className=" nft-page-wrapper d-flex flex-column flex-xl-row gap-3 mb-3">
              {mintTitle !== "coingecko" && (
                <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 staking-height-2">
                  <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
                    <div className="d-flex flex-column position-relative">
                      {showBadge && totalCreated > 0 && (
                        <div className="totalcreated">
                          <span>{totalCreated}</span>
                        </div>
                      )}
                      <div
                        className={`genesis-wrapper ${
                          mintTitle !== "timepiece"
                            ? "conflux-empty"
                            : totalCreated > 0
                            ? "genesis-land"
                            : "genesis-land-empty"
                        } d-flex justify-content-center align-items-center p-3 position-relative`}
                        style={{ height: 312 }}
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
                        <h6 className="font-organetto land-desc w-75">
                          {selectedMint.cardTitle}
                        </h6>
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
                        onClick={handleViewCollection}
                      >
                        View collection
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={
                  mintTitle === "coingecko"
                    ? "col-12 col-md-12 col-xxl-7 mt-0 px-0"
                    : "col-12 col-md-12 col-xxl-5 mt-0 px-0"
                }
                style={{ overflowX: "hidden" }}
              >
                <div
                  className={`p-4 mint-wrappernew ${selectedMint.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                  style={{ minHeight: "463px" }}
                >
                  <h6 className="marketmintnewtitle position-relative">
                    {mintTitle === "coingecko" && (
                      <>
                        Get Your CoinGecko Beta Pass
                        <br /> via{" "}
                        <span className="marketmintnewtitle-marked mx-2">
                          Candy Rewards!
                        </span>
                      </>
                    )}
                    {mintTitle !== "coingecko" && (
                      <>
                        Mint your {selectedMint.title} <br />
                        NFT
                        <span className="marketmintnewtitle-marked mx-2">
                          now!
                        </span>{" "}
                      </>
                    )}
                  </h6>
                  <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
                    <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row align-items-center gap-2 w-100 justify-content-center justify-content-xxl-between  justify-content-xl-between  justify-content-lg-between ">
                      <div className="mint-benefits-grid">
                        {benefits.map((item) => (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={require(`../../../components/TimepieceMint/assets/${item.icon}.png`)}
                              alt=""
                              style={{
                                scale: item.icon === "expand" ? "0.8" : "1",
                              }}
                            />
                            <span className="mint-benefits-title">
                              {item.title}
                            </span>
                          </div>
                        ))}
                        {mintTitle === "conflux" ? (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={blockChainIcon}
                              width={32}
                              height={32}
                              alt=""
                            />
                            <span className="mint-benefits-title">
                              Minting is available on Conflux Network
                            </span>
                          </div>
                        ) : mintTitle === "base" ? (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={blockChainIcon}
                              width={32}
                              height={32}
                              alt=""
                            />
                            <span className="mint-benefits-title">
                              Minting is available on Base Network
                            </span>
                          </div>
                        ) : mintTitle === "coin98" ? (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={blockChainIcon}
                              width={32}
                              height={32}
                              alt=""
                            />
                            <span className="mint-benefits-title">
                              Minting is available on BNB Chain
                            </span>
                          </div>
                        ) : null}
                      </div>
                      {mintTitle === "coingecko" && (
                        <div className="position-relative">
                          <img src={pinkArea} alt="" />
                        </div>
                      )}
                    </div>
                    {mintTitle === "coingecko" && (
                      <button
                        className={`btn coingecko-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                      >
                        <img
                          src={coingecko}
                          alt=""
                          style={{ width: 16, height: 16 }}
                        />{" "}
                        Get Beta Pass
                        <img
                          src={arrowRight}
                          alt=""
                          style={{ width: 16, height: 16 }}
                        />{" "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={
                  mintTitle === "coingecko"
                    ? "col-12 col-md-12 col-xxl-5 mt-0 px-0 px-lg-2"
                    : "col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2"
                }
              >
                {mintTitle !== "coingecko" ? (
                  <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                    <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                      <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                        <span className="land-name">
                          Mint your NFT{" "}
                          {/* <span
                          className="addr-text"
                          style={{ color: "rgb(123, 216, 176)" }}
                        >
                          {cawsArray.length}
                        </span> */}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex mt-0 flex-column flex-lg-row align-items-start gap-2 justify-content-center justify-content-xxl-between justify-content-lg-between justify-content-md-between">
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
                            {nftName === "" ? "" : selectedMint.title}
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                        <span className="land-name">Latest Mint</span>
                        <h6
                          className="land-placeholder borderText"
                          style={{
                            fontSize: "12px",
                            paddingLeft: 14,
                            lineHeight: "40px",
                          }}
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
                          placeholder="Nr. of CAWS Timepiece NFT to create"
                          max={cawsArray.length}
                          min={1}
                          className="land-input w-100"
                          value={parseInt(nftCount)}
                          onChange={(e) =>
                            setNftCount(parseInt(e.target.value))
                          }
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
                    {mintTitle === "timepiece" ? (
                      <span
                        className="limit-span position-relative"
                        style={{
                          color: nftStatus.includes("Exceeded")
                            ? "#D87B7B"
                            : "#FFFFFF",
                          bottom: "auto",
                        }}
                      >
                        {nftStatus}
                      </span>
                    ) : mintTitle === "conflux" ? (
                      <span
                        className="limit-span position-relative d-flex align-items-center gap-2"
                        style={{ bottom: "0px" }}
                      >
                        Available only on Conflux Network
                        <img src={confluxLogo} alt="" />
                      </span>
                    ) : mintTitle === "base" ? (
                      <span
                        className="limit-span position-relative d-flex align-items-center gap-2"
                        style={{ bottom: "0px" }}
                      >
                        Available only on Base Network
                        <img src={baseLogo} alt="" />
                      </span>
                    ) : mintTitle === "coin98" || mintTitle === "coingecko" ? (
                      <span
                        className="limit-span position-relative d-flex align-items-center gap-2"
                        style={{ bottom: "0px" }}
                      >
                        Available only on BNB Chain
                        <img src={bnbLogo} alt="" />
                      </span>
                    ) : null}
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
                      <span
                        style={{ color: textColor }}
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
                              (isConnected === true && chainId !== 56) ||
                              (status !== "Connect your wallet." &&
                                status !== "") ||
                              mintloading === "error"
                                ? "linear-border-disabled"
                                : "linear-border"
                            }
                          >
                            <button
                              className={`btn ${
                                mintloading === "error"
                                  ? "filled-error-btn"
                                  : status !== "Connect your wallet." &&
                                    status !== ""
                                  ? "outline-btn-disabled"
                                  : "filled-btn"
                              }  px-4 w-100`}
                              onClick={() => {
                                isConnected === true && chainId === 56
                                  ? handleCreate()
                                  : showWalletConnect();
                              }}
                              disabled={
                                mintloading === "error" ||
                                mintloading === "success" ||
                                (status !== "Connect your wallet." &&
                                  status !== "")
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
                              {(isConnected === false || chainId !== 56) && (
                                <img
                                  src={
                                    mouseOver === false
                                      ? blackWallet
                                      : whitewallet
                                  }
                                  alt=""
                                  style={{ width: "23px", height: "23px" }}
                                />
                              )}{" "}
                              {mintloading === "initial" &&
                              isConnected === true &&
                              chainId === 56 ? (
                                "Mint"
                              ) : mintloading === "mint" &&
                                isConnected === true &&
                                chainId === 56 ? (
                                <>
                                  <div
                                    className="spinner-border "
                                    role="status"
                                  ></div>
                                </>
                              ) : mintloading === "error" &&
                                isConnected === true &&
                                chainId === 56 ? (
                                "Failed"
                              ) : mintloading === "success" &&
                                isConnected === true &&
                                activeButton ===
                                  (isConnected === true && chainId === 56) ? (
                                "Success"
                              ) : isConnected === true && chainId !== 56 ? (
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
                ) : (
                  <div
                    className={` ${
                      playerCreation
                        ? "justify-content-center"
                        : "justify-content-between"
                    } p-4 mint-wrappernew d-flex flex-column staking-height gap-2`}
                  >
                    {/* <h6
                      className="land-placeholder mb-0"
                      style={{ marginLeft: 11 }}
                    >
                      The Beta Pass NFTs are available on CoinGecko Candy
                      Program.
                    </h6>
                    <div className="coingeckonft-wrapper p-3">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1 className="coingecko-nft-number m-0">5,000</h1>
                        <span className="coingecko-nft-desc">
                          Beta Pass NFTs
                        </span>
                      </div>
                    </div>
                    <hr className="mint-divider mt-2 mb-2" />
                    <div className={"linear-border mx-auto"}>
                      <button className={`btn filled-btn px-5 w-auto`}>
                        Get Beta Pass
                      </button>
                    </div> */}
                    <h6 className="land-name">Create account</h6>
                    {/* <Timeline
                   sx={{
                     [`& .${timelineItemClasses.root}:before`]: {
                       flex: 0,
                       padding: 0,
                     },
                   }}
                 >
                   <TimelineItem>
                     <TimelineSeparator>
                       <TimelineDot className={`timelinedot-completed`} />
                       <TimelineConnector className={"timeline-line"} />
                    
                     </TimelineSeparator>
                     <TimelineContent>
                       <h6 className="content-title2">
                            Create
                       </h6>
                     </TimelineContent>
                   </TimelineItem>
                   <TimelineItem>
                     <TimelineSeparator>
                       <TimelineDot className={`timelinedot-completed`} />
                       <TimelineConnector className={"timeline-line"} />
                       
                     </TimelineSeparator>
                     <TimelineContent>
                       <h6 className="content-title2">
                       Verify
                       </h6>
                     </TimelineContent>
                   </TimelineItem>
                   <TimelineItem>
                     <TimelineSeparator>
                       <TimelineDot className={`timelinedot-completed`} />
                       <TimelineConnector className={"timeline-line"} />

                     </TimelineSeparator>
                     <TimelineContent>
                       <h6 className="content-title2">
                       Profile
                       </h6>
                     </TimelineContent>
                   </TimelineItem>
                   <TimelineItem>
                     <TimelineSeparator>
                       <TimelineDot className={`timelinedot-completed`} />
                       <TimelineConnector className={"timeline-line"} />
                     </TimelineSeparator>
                     <TimelineContent>
                       <h6 className="content-title2">
                       Link Wallet
                       </h6>
                     </TimelineContent>
                   </TimelineItem>
                 </Timeline> */}
                    <div>
                      <ul class="timeline m-0 p-0" id="timeline">
                        <li class="li complete">
                          <div class="status">
                            <h4 className="listtext"> Create </h4>
                          </div>
                        </li>
                        <li class="li complete">
                          <div class="status">
                            <h4 className="listtext"> Verify </h4>
                          </div>
                        </li>
                        <li class="li complete">
                          <div class="status">
                            <h4 className="listtext"> Profile </h4>
                          </div>
                        </li>
                        <li class="li">
                          <div class="status">
                            <h4 className="listtext"> Link Wallet </h4>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {playerCreation === false && (
                      <SingUpGecko
                        onSuccessVerify={(value) => {
                          setplayerCreation(value);
                        }}
                      />
                    )}
                    {playerCreation === true && linkWallet === false && (
                      <PlayerCreationGecko
                        onSuccessCreation={() => {
                          setLinkWallet(true);
                        }}
                      />
                    )}

                    {linkWallet === true && (
                      <div
                        className="walletconnectBtn w-100"
                        // onClick={onLinkWallet}
                      >
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex gap-2 align-items-center">
                            <img src={walletImg} alt="" />
                            <div className="d-flex flex-column">
                              <span className="secondTitle">
                                Connect wallet
                              </span>

                              <span className="firsttitle">
                                Link your wallet
                              </span>
                            </div>
                          </div>
                          <img src={circleArrow} alt="" />
                        </div>
                      </div>
                    )}
                    {mintTitle === "coingecko" && (
                      <span className="footertxt-coingecko">
                        Users who have claimed the CoinGecko Beta Pass NFT are
                        required to create a WoD Account to receive the NFT and
                        participate in the exclusive event.
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaPassNFT;
