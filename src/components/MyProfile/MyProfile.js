import React, { useEffect, useState, useRef } from "react";
import "./_myprofile.scss";
import OutsideClickHandler from "react-outside-click-handler";
import Clipboard from "react-clipboard.js";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";
import RankSmallPopup from "../../screens/Account/src/Components/ProfileCard/RankSmallPopup";
import useWindowSize from "../../hooks/useWindowSize";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "200px !important",
    minWidth: "90px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const renderer = ({ days, hours, minutes }) => {
  return (
    <h6 className="timer-text2 mb-0">
      {days}d: {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const renderer3 = ({ days, hours }) => {
  return (
    <span
      className="special-rewards-total-span"
      style={{
        color: "#F3BF09",
        width: "fit-content",
        whiteSpace: "nowrap",
      }}
    >
      Available: {days}d {hours}h
    </span>
  );
};
const renderer4 = ({ hours, minutes, seconds }) => {
  return (
    <span className="beast-siege-timer">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
    </span>
  );
};

const MyProfile = ({
  greatCollectionData,
  explorerHuntData,
  canBuy,
  email,
  isPremium,
  username,
  address,
  coinbase,
  totalScore,
  onGoldenpassClick,
  openChainsLeaderboard,
  openGlobalLeaderboard,
  openGenesisLeaderboard,
  openMyRewards,
  openDailyBonus,
  openPortfolio,
  openSpecialRewards,
  userRankName,
  isConnected,
  onConnectWallet,
  onDomainClick,
  domainName,
  liveRewards,
  specialRewards,
  syncStatus,
  onSyncClick,
  isgoldenPassActive,
  dragonRuinsCountdown,
  allClaimedChests,
  treasureRewardMoney,
  userDailyBundles,
  puzzleMadnessCountdown,
  userActiveEvents,
  userDataStar,
  primeStars,
  allClaimedChestsPremium,
  allClaimedChestsstd,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  userRankCore,
  userCoreScore,
  userRankViction,
  userVictionScore,
  rankData,
  userRankManta,
  userMantaScore,
  userRankBase,
  userBaseScore,
  userRankTaiko,
  userTaikoScore,
  onEventCardClick,
  userDataStarWeekly,
  onLinkWallet,
  beastSiegeStatus,
  userRankMat,
  userMatScore,
  userRankSei,
  userSeiScore,
  puzzleMadnessTimer,
  userBnbStars,
  userSkaleStars,
  userCoreStars,
  userVictionStars,
  userMantaStars,
  userBaseStars,
  userTaikoStars,
  userMatStars,
  userSeiStars,
  wodBalance,
}) => {
  const totalClaimedChests = allClaimedChests;
  const [rankDropdown, setRankDropdown] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const chestPercentage = (totalClaimedChests / 180) * 100;
  const utcDayIndex = new Date().getUTCDay();

  const html = document.querySelector("html");

  useEffect(() => {
    if (rankDropdown === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [rankDropdown]);

  const dailyEvents = [
    {
      image: "https://cdn.worldofdypians.com/wod/stoneEyeProfile.png", // Sunday
      title: "Stone Eye",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/stoneEyeBannerProfile.webp",
      titleColor: "#F1EDFF",
      contentColor: "#C8F0FF",
      class: "stoneEyeBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/stoneEyeArrow.svg",
      link: "/account/challenges/stone-eye",
      active: beastSiegeStatus.cyclops,
      infoTips: ["80,000 points", "Up to 600 stars."],
    },
    {
      image: "https://cdn.worldofdypians.com/wod/dragonRuinsProfile.png", // Monday
      title: "Dragon Ruins",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/dragonRuinsBannerProfile.webp",
      titleColor: "#FFEACD",
      contentColor: "#D3D5D7",
      class: "dragonRuinsBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/dragonRuinsArrow.svg",
      link: "/account/challenges/dragon-ruins",
      active: beastSiegeStatus.dragon,
      infoTips: ["16,000 points", "Up to 200 stars."],
    },
    {
      image: "https://cdn.worldofdypians.com/wod/coldBiteProfile.png", // Tuesday
      title: "Cold Bite",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/coldBiteBannerProfile.webp",
      titleColor: "#68AEFE",
      contentColor: "#FFFFFF",
      class: "coldBiteBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/coldBiteArrow.svg",
      link: "/account/challenges/cold-bite",
      active: beastSiegeStatus.bear,
      infoTips: ["30,000 points", "Up to 300 stars."],
    },
    {
      image: "https://cdn.worldofdypians.com/wod/furyBeastProfile.png", // Wednesday
      title: "Fury Beast",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/furyBeastBannerProfile.webp",
      titleColor: "#BEE3A8",
      contentColor: "#BAD6C9",
      class: "furyBeastBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/furyBeastArrow.svg",
      link: "/account/challenges/fury-beast",
      active: beastSiegeStatus.beast,
      infoTips: ["60,000 points", "Up to 400 stars."],
    },
    {
      image: "https://cdn.worldofdypians.com/wod/wingStormProfile.png", // Thursday
      title: "Wing Storm",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/wingStormBannerProfile.webp",
      titleColor: "#D6F4FF",
      contentColor: "#7ACCFF",
      class: "wingStormBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/wingStormArrow.svg",
      link: "/account/challenges/wing-storm",
      active: beastSiegeStatus.eagle,
      infoTips: ["70,000 points", "Up to 500 stars."],
    },
    {
      image: "https://cdn.worldofdypians.com/wod/bnbMazeDayProfile.png", // Friday
      title: "BNB Chain Maze Day",
      bannerImg: "https://cdn.worldofdypians.com/wod/bnbMazeBannerProfile.webp",
      titleColor: "#DDF8D7",
      contentColor: "#FFFFFF",
      class: "mazeDayBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/mazeDayArrow.svg",
      link: "/account/challenges/maze-day",
      infoTips: ["Up to 200,000 points", "Up to 800 stars", "Up to $100"],

      imageClass: "mazeDayEventBanner",
    },
    {
      image: "https://cdn.worldofdypians.com/wod/scorpionKingProfile.png", // Saturday
      title: "Scorpion King",
      bannerImg:
        "https://cdn.worldofdypians.com/wod/scorpionKingBannerProfile.webp",
      titleColor: "#FFD695",
      contentColor: "#EAB257",
      class: "scorpionKingBannerItem",
      arrow: "https://cdn.worldofdypians.com/wod/scorpionKingArrow.svg",
      link: "/account/challenges/scorpion-king",
      active: beastSiegeStatus.scorpion,
      infoTips: ["120,000 points", "Up to 1000 stars."],
    },
  ];

  let now = new Date().getTime();
  const midnight = new Date(now).setUTCHours(24, 0, 0, 0);

  const [showBuyTooltip, setshowBuyTooltip] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const sliderRef = useRef(null);
  const windowSize = useWindowSize();

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          fade: false,
          initialSlide: 0,
          autoplay: true,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (canBuy && email) {
      setFinished(false);
    } else if (!canBuy && email) {
      setFinished(true);
    } else if (!email) {
      setFinished(false);
    }
  }, [totalClaimedChests, isPremium, canBuy, email]);

  return (
    <>
      <div className="custom-container mt-5">
        <div className="row mt-4 mt-lg-0">
          <div className="col-12 col-lg-4">
            <div className="profile-card-wrapper p-3 d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="new-profile-img w-100"
                    src={
                      isPremium
                        ? "https://cdn.worldofdypians.com/wod/starterProfilePremium.png"
                        : "https://cdn.worldofdypians.com/wod/starterProfile.png"
                    }
                    alt=""
                  />
                  {/* <div className="score-text-wrapper d-flex flex-column align-items-center">
                  <h6 className="mb-0">{getFormattedNumber(totalScore, 0)}</h6>
                  <span>Score</span>
                </div> */}
                </div>
                <div className="d-flex flex-column gap-2 w-100">
                  <div className="d-flex align-items-center gap-1">
                    <div
                      className={`d-flex flex-column flex-lg-row align-items-lg-center ${
                        !email
                          ? "justify-content-between w-100"
                          : "justify-content-start"
                      }  gap-2`}
                    >
                      <h6 className="my-profile-username mb-0">
                        {email && username ? username : "GUEST"}
                      </h6>
                      {!email && coinbase && (
                        <NavLink
                          className="loginbtn-profile px-5 py-2"
                          to="/auth"
                        >
                          Log in
                        </NavLink>
                      )}
                    </div>
                    {/* 
                    <span className="current-rank-text text-capitalize">
                      {email && username ? userRankName.name : ""}
                    </span> */}
                  </div>
                  <span className="my-profile-email mb-2">{email}</span>
                  <div className="d-flex flex-column flex-lg-row gap-2">
                    <div
                      className={` ${
                        isConnected &&
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "wallet-address-wrapper-error"
                          : "wallet-address-wrapper"
                      }  w-100 d-flex align-items-center justify-content-between gap-4 p-2`}
                    >
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                          <span className={`profile-wallet-span mb-2`}>
                            Wallet Address
                          </span>
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className={`${
                                isConnected &&
                                address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address.toLowerCase() !== coinbase.toLowerCase()
                                  ? "wallet-addr-error"
                                  : "wallet-addr"
                              } `}
                            >
                              {email !== undefined && address
                                ? shortAddress(address)
                                : coinbase
                                ? shortAddress(coinbase)
                                : "--"}
                            </span>
                            <Clipboard
                              component="div"
                              data-event="click"
                              data-tip="Copied To Clipboard!"
                              data-clipboard-text={address}
                              className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative"
                            >
                              <span
                                className="menuitem2 p-0"
                                onClick={() => {
                                  setTooltip(true);
                                  setTimeout(() => setTooltip(false), 2000);
                                }}
                              >
                                <img
                                  src={
                                    tooltip
                                      ? "https://cdn.worldofdypians.com/wod/check.svg"
                                      : "https://cdn.worldofdypians.com/wod/copy.svg"
                                  }
                                  alt=""
                                />{" "}
                              </span>
                            </Clipboard>
                          </div>
                        </div>
                        {isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() !== coinbase.toLowerCase() && (
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/errorchain.svg"
                              }
                              alt=""
                            />
                          )}
                        {!domainName &&
                          isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() === coinbase.toLowerCase() && (
                            <a
                              href="https://wod.space.id"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/profiledomainIcon.svg"
                                }
                                width={30}
                                height={30}
                                alt=""
                                style={{ cursor: "pointer" }}
                                // onClick={onDomainClick}
                              />
                            </a>
                          )}
                        {!domainName &&
                          isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() !== coinbase.toLowerCase() && (
                            <a
                              href="https://wod.space.id"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/errordomainIcon.svg"
                                }
                                width={30}
                                height={30}
                                alt=""
                                style={{ cursor: "pointer" }}
                                // onClick={onDomainClick}
                              />
                            </a>
                          )}
                      </div>
                    </div>
                    {(isConnected &&
                      address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() === coinbase.toLowerCase()) ||
                    (isConnected && !email && coinbase) ? (
                      <div
                        className="portfolio-wrapper position-relative d-flex justify-content-between w-100 align-items-center gap-2 p-2"
                        onClick={() => {
                          setshowBuyTooltip(true);
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/wodToken.svg"
                            }
                            width={20}
                            height={20}
                            alt=""
                          />
                          <h6 className="mb-0">
                            {getFormattedNumber(wodBalance, 2)}
                          </h6>
                        </div>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/whiteArrows.svg"
                          }
                          alt=""
                          style={{ width: 20, height: 20 }}
                          className={showBuyTooltip ? "whitearrowUp" : ""}
                        />
                        {showBuyTooltip === true && (
                          <div className="position-absolute w-100">
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                setshowBuyTooltip(false);
                              }}
                            >
                              <div
                                className="wodtooltip d-flex py-4 px-3"
                                style={{ opacity: 1 }}
                              >
                                <div className="d-flex w-100 flex-column gap-2 align-items-start">
                                  <div className="d-flex justify-content-center align-items-center flex-column w-100">
                                    <h6 className="getwodon-title mb-0">
                                      Get WOD on
                                    </h6>
                                    <div className="sidebar-separator2 my-1"></div>
                                  </div>
                                  <a
                                    href="https://www.kucoin.com/trade/WOD-USDT"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/kucoinBuyWod.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      Kucoin
                                    </h6>
                                  </a>
                                  <a
                                    href="https://www.gate.io/trade/WOD_USDT"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/gateBuyWod.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      Gate.io
                                    </h6>
                                  </a>

                                  <a
                                    href="https://www.mexc.com/exchange/WOD_USDT"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/mexcBuyWod.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      MEXC Global
                                    </h6>
                                  </a>
                                  <a
                                    href="https://www.bitpanda.com/en/prices/world-of-dypians-wod"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/bitpandaLogo.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      Bitpanda
                                    </h6>
                                  </a>
                                  <a
                                    href="https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/pancakeBuyWod.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      PancakeSwap
                                    </h6>
                                  </a>
                                  <a
                                    href="https://short.trustwallet.com/app-download"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/trustwalletBuyWod.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      TrustWallet
                                    </h6>
                                  </a>
                                  {/* <a
                                    href="https://stealthex.io/?amount=320.3353683438&from=wod&to=usdtbsc"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                      setshowBuyTooltip(false);
                                    }}
                                    className="getwod-item"
                                  >
                                    <h6 className="bottomitems mb-0">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/stealthEx.svg"
                                        }
                                        className="buywodimg"
                                      />
                                      StealthEX
                                    </h6>
                                  </a> */}
                                </div>
                              </div>
                            </OutsideClickHandler>
                          </div>
                        )}
                      </div>
                    ) : !isConnected ? (
                      <button
                        className="loginbtn-profile px-5 py-2"
                        onClick={onConnectWallet}
                      >
                        Connect
                      </button>
                    ) : email &&
                      username &&
                      coinbase &&
                      isConnected &&
                      address ? (
                      <button
                        className="d-flex align-items-center gap-1 syncbtn px-3 py-2"
                        onClick={onSyncClick}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/sync.svg"}
                          alt=""
                          className={syncStatus === "loading" && "syncicon"}
                        />{" "}
                        {syncStatus === "initial"
                          ? "Synchronize"
                          : syncStatus === "loading"
                          ? "Synchronising..."
                          : syncStatus === "success"
                          ? "Success"
                          : "Error"}
                      </button>
                    ) : email &&
                      username &&
                      coinbase &&
                      isConnected &&
                      !address ? (
                      <button
                        className="loginbtn-profile px-5 py-2"
                        onClick={onLinkWallet}
                      >
                        Link Wallet
                      </button>
                    ) : coinbase && email && !address && !username ? (
                      <NavLink
                        className="loginbtn-profile px-5 py-2 d-flex align-items-center"
                        to={"/player"}
                      >
                        Create player
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="sidebar-separator2 my-2"></div>
              <div className="d-flex align-items-center gap-2 justify-content-between flex-column flex-lg-row flex-md-row position-relative">
                <div
                  className="wallet-address-wrapper2 p-2 w-100"
                  onClick={() => {
                    setRankDropdown(true);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    {/* <span className="user-data-item-left">My Progress</span> */}
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <span className="user-data-item-right">
                          #
                          {!userDataStar?.statValue ||
                          userDataStar?.statValue === 0
                            ? "---"
                            : userDataStar.position
                            ? userDataStar.position + 1
                            : "---"}
                        </span>
                      </div>
                      <span className="user-data-item-left">Global Rank</span>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <span className="user-data-item-right">
                          {getFormattedNumber(
                            userDataStar.statValue ?? "---",
                            0
                          )}
                        </span>
                      </div>
                      <span className="user-data-item-left">Stars</span>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="wallet-address-wrapper2 p-2 w-100"
                  onClick={openGlobalLeaderboard}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="user-data-item-left">Stars</span>
                      <span className="user-data-item-left">Collected</span>
                    </div>
                    <div className="d-flex">
                      <span className="user-data-item-right">
                        {getFormattedNumber(userDataStar.statValue ?? "---", 0)}
                      </span>
                    </div>
                  </div>
                </div> */}
                <div
                  onClick={openPortfolio}
                  className="wallet-address-wrapper2 p-2 w-100"
                >
                  <div className="d-flex gap-2 align-items-center justify-content-start">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/portfolio.svg"}
                      width={25}
                      height={25}
                      alt=""
                    />
                    <h6 className="user-data-item-left mb-0">My Portfolio</h6>
                  </div>
                </div>
                {rankDropdown === true && (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setRankDropdown(false);
                    }}
                  >
                    <RankSmallPopup
                      onClose={() => {
                        setRankDropdown(false);
                      }}
                      onPrimeClick={() => {
                        html.classList.remove("hidescroll");
                      }}
                      primeStars={primeStars}
                      userRank={userRank}
                      userRankSkale={userRankSkale}
                      userBnbScore={userBnbScore}
                      userSkaleScore={userSkaleScore}
                      userRankCore={userRankCore}
                      userCoreScore={userCoreScore}
                      userRankViction={userRankViction}
                      userVictionScore={userVictionScore}
                      rankData={rankData}
                      userDataStar={userDataStar}
                      userRankManta={userRankManta}
                      userMantaScore={userMantaScore}
                      userRankMat={userRankMat}
                      userMatScore={userMatScore}
                      userRankSei={userRankSei}
                      userSeiScore={userSeiScore}
                      userRankBase={userRankBase}
                      userBaseScore={userBaseScore}
                      userRankTaiko={userRankTaiko}
                      userTaikoScore={userTaikoScore}
                      userRankName={userRankName}
                      userBnbStars={userBnbStars}
                      userSkaleStars={userSkaleStars}
                      userCoreStars={userCoreStars}
                      userVictionStars={userVictionStars}
                      userMantaStars={userMantaStars}
                      userBaseStars={userBaseStars}
                      userTaikoStars={userTaikoStars}
                      userMatStars={userMatStars}
                      userSeiStars={userSeiStars}
                      globalMonthly={
                        userDataStar.position
                          ? userDataStar.position + 1
                          : "---"
                      }
                      globalWeekly={
                        userDataStarWeekly.position
                          ? userDataStarWeekly.position + 1
                          : "---"
                      }
                      isPremium={isPremium}
                    />
                  </OutsideClickHandler>
                )}
              </div>
              <div className="sidebar-separator2 my-2"></div>

              <div className="daily-progress-wrapper p-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="progress-line"></div>
                  <span className="daily-progress-span mx-2">
                    Daily Progress
                  </span>
                  <div className="progress-line-2"></div>
                </div>
                <div className="daily-progress-grid">
                  {/* <div className="daily-progress-item position-relative">
                  <img
                    src={
                      isgoldenPassActive ? goldenPassActive : goldenPassInactive
                    }
                    alt=""
                  />
                  {isgoldenPassActive && (
                    <div className="daily-progress-value-golden">
                      <Countdown
                        date={isgoldenPassActive}
                        renderer={renderer3}
                      />
                    </div>
                  )}
                 
                </div>
                <div className="daily-progress-item position-relative">
                  <img
                    src={
                      userActiveEvents > 0
                        ? treasureHuntActive
                        : treasureHuntInactive
                    }
                    alt=""
                  />
                  <div className="daily-progress-value">
                    <span>{userActiveEvents}</span>
                  </div>
                 
                </div> */}
                  <NavLink
                    to={"/account/prime"}
                    className="daily-progress-item position-relative"
                  >
                    <HtmlTooltip
                      placement="top"
                      title={
                        <span className="card-eth-chain-text">
                          With Prime enabled, earn 50 extra stars if you're in
                          the top 100 of any leaderboard!
                        </span>
                      }
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/prime.png"}
                        alt=""
                      />
                    </HtmlTooltip>

                    <div
                      className={"daily-progress-value-golden"}
                      style={{
                        border:
                          !isPremium || !primeStars ? "1px solid gray" : "",
                      }}
                    >
                      <span
                        style={{
                          color: !isPremium || !primeStars ? "gray" : "",
                        }}
                      >
                        +50 Stars
                      </span>
                    </div>
                    <span className="bundle-title-bottom">Prime</span>
                  </NavLink>
                  <div
                    className="daily-progress-item position-relative"
                    onClick={openDailyBonus}
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/dailyBonusStdProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>
                        {allClaimedChestsstd < 90
                          ? allClaimedChestsstd + "/90"
                          : "Completed"}
                      </span>
                    </div>
                    <span className="bundle-title-bottom">Daily Bonus</span>
                  </div>
                  <div
                    className="daily-progress-item position-relative"
                    onClick={openDailyBonus}
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/dailyBonusPrimeProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>
                        {allClaimedChestsPremium < 90
                          ? allClaimedChestsPremium + "/90"
                          : "Completed"}
                      </span>
                    </div>
                    <span className="bundle-title-bottom">
                      Daily Bonus Prime
                    </span>
                  </div>
                  <NavLink
                    to={dailyEvents[utcDayIndex].link}
                    className="daily-progress-item position-relative"
                  >
                    <img src={dailyEvents[utcDayIndex].image} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {/* {userDailyBundles?.dragonRuinsCount
                        ? userDailyBundles?.dragonRuinsCount === 0
                          ? "Ready"
                          : userDailyBundles?.dragonRuinsCount
                        : "Ready"} */}
                        {dailyEvents[utcDayIndex].active ? "1" : "Ready"}
                      </span>
                    </div>

                    <span className="bundle-title-bottom">
                      {dailyEvents[utcDayIndex].title === "BNB Chain Maze Day"
                        ? "Maze Day"
                        : dailyEvents[utcDayIndex].title}
                    </span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/critical-hit"}
                    className="daily-progress-item position-relative"
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/criticalHitProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>Ready</span>
                    </div>

                    <span className="bundle-title-bottom">Critical Hit</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/treasure-hunt"}
                    className="daily-progress-item position-relative"
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/treasureHuntProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>
                        {userActiveEvents === 14
                          ? "Completed"
                          : userActiveEvents + "/14"}
                      </span>
                    </div>

                    <span className="bundle-title-bottom">Treasure Hunt</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/explorer-hunt"}
                    className="daily-progress-item position-relative"
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/explorerHuntProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>
                        {explorerHuntData[0]?.statValue
                          ? explorerHuntData[0]?.statValue === 0
                            ? "Ready"
                            : explorerHuntData[0]?.statValue
                          : "Ready"}
                      </span>
                    </div>

                    <span className="bundle-title-bottom">Explorer Hunt</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/puzzle-madness"}
                    className="daily-progress-item position-relative"
                  >
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/puzzleMadnessProfile.png"
                      }
                      alt=""
                    />
                    <div className="daily-progress-value-golden">
                      <span>
                        {userDailyBundles?.puzzleMadnessCount
                          ? userDailyBundles?.puzzleMadnessCount === 0
                            ? "Ready"
                            : userDailyBundles?.puzzleMadnessCount
                          : "Ready"}
                        {/* Ready */}
                      </span>
                    </div>

                    <span className="bundle-title-bottom">Puzzle Madness</span>
                  </NavLink>

                  {/* <div className="daily-progress-item position-relative">
                  <img
                    src={
                      totalClaimedChests === 0
                        ? dailyBonusInactive
                        : dailyBonusActive
                    }
                    alt=""
                  />

                  <div className="daily-progress-value">
                    <span>{totalClaimedChests}</span>
                  </div>
                  
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="row ">
              <div className="col-12 col-lg-4">
                {/* <div className="new-special-rewards-wrapper d-flex flex-column gap-4 p-3">
                <h6 className="special-rewards-title">Special Rewards</h6>
                <div className="d-flex align-items-center gap-1">
                  <span className="special-rewards-span">Submit</span>
                  <img src={redArrow} alt="" />
                </div>
              </div> */}
                <div
                  className="daily-bonus-wrapper mt-4 mb-5 mt-lg-0 mb-lg-0"
                  onClick={openDailyBonus}
                >
                  <div className="red-div"></div>
                  <img
                    // src={finished ? mageFinish : mageGoing}
                    src={
                      chestPercentage >= 50 && chestPercentage < 100
                        ? "https://cdn.worldofdypians.com/wod/mageGoing.png"
                        : chestPercentage === 100
                        ? "https://cdn.worldofdypians.com/wod/mageFinish.png"
                        : "https://cdn.worldofdypians.com/wod/mageStarter.png"
                    }
                    className={`${"daily-rewards-img"}`}
                    alt=""
                  />
                  <div className="progress-bar-group d-flex flex-column align-items-start">
                    {!finished && (
                      <span className="progress-bar-title">Progress</span>
                    )}

                    <div className="yellow-progress-outer">
                      <span className="mb-0 chest-progress">
                        {/* {claimedPremiumChests}/10 */}
                        {parseInt(chestPercentage)}%
                      </span>
                      <div
                        className="yellow-progress-inner"
                        style={{ width: `${chestPercentage}%` }}
                        // style={{ width: `35%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <div
                      className="d-flex align-items-center justify-content-between position-relative gap-1"
                      style={{ width: "fit-content" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="leaderboards-title mb-0">Daily</h6>
                        <h6
                          className="leaderboards-title mb-0"
                          style={{ color: "#FF5EA0" }}
                        >
                          Bonus
                        </h6>
                      </div>
                    </div>

                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className="position-relative"
                        style={{
                          width: "96px",
                          height: "40px",
                          right: "0px",
                          bottom: "15px",
                        }}
                      >
                        <span className="ready-to-claim mb-0">
                          {finished ? "Reset Time" : "Ready to Claim"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/readyBorder2.svg"
                          }
                          alt=""
                          className={`${
                            finished ? "ready-border-2" : "ready-border"
                          }`}
                        />
                      </div>
                      {finished && (
                        <span className="timer-text mb-0">
                          <Countdown date={midnight} renderer={renderer2} />
                        </span>
                      )}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="game-leaderboards-wrapper position-relative h-100 d-flex align-items-end  align-items-lg-center justify-content-center justify-content-lg-between p-3">
                  <div className="d-flex flex-row flex-lg-column gap-2 gap-lg-0">
                    <h6 className="leaderboards-title">Game</h6>
                    <h6
                      className="leaderboards-title mb-0"
                      style={{ color: "#8C56FF" }}
                    >
                      Leaderboards
                    </h6>
                  </div>
                  <div className="d-flex align-items-center leaderboards-flag-wrapper gap-3">
                    <div
                      className="new-flag-wrapper global-flag"
                      onClick={openGlobalLeaderboard}
                    >
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/globalFlag2.svg"
                        }
                        className="w-100"
                        alt=""
                      />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Global</span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/globalIcon2.png"
                          }
                          height={50}
                          width={50}
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="new-flag-wrapper chains-flag"
                      onClick={openChainsLeaderboard}
                    >
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/chainsFlag2.svg"
                        }
                        className="w-100"
                        alt=""
                      />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Chains</span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/chainsIcon.svg"
                          }
                          height={50}
                          width={50}
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="new-flag-wrapper land-flag"
                      onClick={openGenesisLeaderboard}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/landFlag2.svg"}
                        className="w-100"
                        alt=""
                      />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Collection</span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/landFlagIcon.png"
                          }
                          height={50}
                          width={50}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <div
                  className="my-rewards-wrapper-new position-relative d-flex flex-column justify-content-between gap-2 p-3"
                  onClick={openMyRewards}
                >
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/myRewardsMiner.png"
                    }
                    className="miner-img"
                    alt=""
                  />
                  <div className="d-flex flex-column position-absolute extraRewardsGolden">
                    {/* <h6
                      className="special-rewards-total-span"
                      style={{
                        color: "#F3BF09",
                        width: "fit-content",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isgoldenPassActive ? (
                        <Countdown
                          date={isgoldenPassActive}
                          renderer={renderer3}
                        />
                      ) : (
                        "Extra Rewards"
                      )}
                    </h6> */}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <h6
                      className="special-rewards-title"
                      style={{ color: "#FFF", width: "fit-content" }}
                    >
                      My
                    </h6>
                    <h6
                      className="special-rewards-title"
                      style={{ color: "#35F3FF", width: "fit-content" }}
                    >
                      Rewards
                    </h6>
                  </div>

                  <div className="d-flex flex-column">
                    <h6
                      className="special-rewards-total mb-0"
                      style={{ color: isPremium ? "#F3BF09" : "#FFE8D2" }}
                    >
                      $
                      {getFormattedNumber(
                        liveRewards + Number(treasureRewardMoney)
                      )}
                    </h6>
                    <span
                      className="special-rewards-total-span"
                      style={{ color: "#FFE8D2" }}
                    >
                      Rewards
                    </span>
                  </div>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/cyanArrow.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3 mt-3">
                <div
                  className="new-special-rewards-wrapper d-flex flex-column justify-content-between p-3 h-100"
                  onClick={openSpecialRewards}
                >
                  <h6 className="special-rewards-title">Special Rewards</h6>
                  <div className="d-flex flex-column">
                    <h6 className="special-rewards-total mb-0">
                      ${getFormattedNumber(specialRewards)}
                    </h6>
                    <span className="special-rewards-total-span">Rewards</span>
                  </div>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/redArrow.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3 mt-3">
                <a
                  href="https://wod.space.id"
                  rel="noreferrer"
                  target="_blank"
                  className="wod-domain-name-wrapper d-flex align-items-center justify-content-between gap-2 p-3"
                >
                  <div className="d-flex flex-column justify-content-between h-100">
                    <h6
                      className="special-rewards-title"
                      style={{ color: "#FFD9F1" }}
                    >
                      .WOD
                    </h6>
                    <span className="wod-domain-name-span">
                      Claim Your Identity
                    </span>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/wodDomainArrow.svg"
                      }
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/domainNameIcon.png"
                    }
                    className="wod-domain-icon"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <NavLink to="/account/prime">
                  <div className="total-stars-premium-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2">
                    <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                          }
                          alt=""
                          style={{ width: 44, height: 44 }}
                        />
                        <div className="d-flex flex-column">
                          <span
                            className="user-blue-rank"
                            style={{ color: isPremium ? "#F3BF09" : "" }}
                          >
                            {!isPremium ? "Upgrade Status" : "Prime Enabled"}
                          </span>
                          <span className="user-rank-text">
                            {!isPremium ? "Prime" : ""}
                          </span>
                        </div>
                      </div>
                      {!isPremium ? (
                        <NavLink
                          className="activate-btn2 px-3 py-1"
                          to="/account/prime"
                          style={{
                            background: "#7E52D2",
                          }}
                        >
                          Get
                        </NavLink>
                      ) : (
                        <button
                          className="activate-btn2 px-3 py-1"
                          style={{ background: "transparent" }}
                          // onClick={onPremiumClick}
                        >
                          Lifetime
                        </button>
                      )}
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-lg-6 mt-3" onClick={onGoldenpassClick}>
                <div className="golden-pass-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2">
                  <div className="d-flex align-items-center gap-2 justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/goldenPassBadge.png"
                        }
                        alt=""
                        style={{ width: 44, height: 44 }}
                      />
                      <div className="d-flex flex-column">
                        <span className="user-blue-rank">Boost Rewards</span>
                        <span
                          className="user-rank-text"
                          style={{
                            color: !isgoldenPassActive ? "#F3BF09" : "#00D1B5",
                          }}
                        >
                          {!isgoldenPassActive ? `Golden Pass` : "Activated"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {!isgoldenPassActive ? (
                        <button
                          className="activate-btn px-3 py-1"
                          onClick={onGoldenpassClick}
                        >
                          Activate
                        </button>
                      ) : (
                        <Countdown
                          date={Number(isgoldenPassActive) * 1000}
                          renderer={renderer}
                          // onComplete={() => {
                          //   setcountdown();
                          //   setisActive(false);
                          // }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <NavLink
                  to={dailyEvents[utcDayIndex].link}
                  onClick={onEventCardClick}
                >
                  <div
                    className={`${dailyEvents[utcDayIndex].class} profile-banner-class-thing position-relative p-3 d-flex`}
                  >
                    <div
                      className=" d-flex flex-column justify-content-between gap-2 "
                      style={{ zIndex: 1 }}
                    >
                      {/* <div className="d-flex flex-column gap-1" style={{zIndex: 1}}> */}
                      <span
                        className={`utcEventTitle`}
                        style={{ color: dailyEvents[utcDayIndex].titleColor }}
                      >
                        {dailyEvents[utcDayIndex].title}
                      </span>
                      {/* <span
                          className={`utcEventContent`}
                          style={{
                            color: dailyEvents[utcDayIndex].contentColor,
                          }}
                        >
                          Coming Soon
                        </span> */}
                      {dailyEvents[utcDayIndex].title ===
                      "BNB Chain Maze Day" ? (
                        <>
                          <div className="ready-circle-2-position d-none d-lg-flex flex-column gap-1 align-items-center justify-content-center">
                            <div className="ready-circle-2 d-flex flex-column gap-1">
                              <Countdown renderer={renderer4} date={midnight} />
                            </div>
                            <span className="new-time-remaining">
                              Time Remaining
                            </span>
                          </div>
                          <div className="d-flex d-lg-none">
                            <Countdown renderer={renderer4} date={midnight} />
                          </div>
                        </>
                      ) : (
                        <>
                          {dailyEvents[utcDayIndex].active ? (
                            //   <div className="d-flex flex-column gap-1">
                            //   <span className="beast-siege-ends-in">Available until:</span>
                            //   <Countdown renderer={renderer4} date={midnight} />
                            // </div>
                            <>
                              <div className="ready-circle-2-position d-none d-lg-flex flex-column gap-1 align-items-center justify-content-center">
                                <div className="ready-circle-2 d-flex flex-column gap-1">
                                  <Countdown
                                    renderer={renderer4}
                                    date={midnight}
                                  />
                                </div>
                                <span className="new-time-remaining">
                                  Time Remaining
                                </span>
                              </div>
                              <div className="d-flex d-lg-none">
                                <Countdown
                                  renderer={renderer4}
                                  date={midnight}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="ready-circle d-none d-lg-flex">
                                <span className="beast-siege-timer">Ready</span>
                              </div>
                              <span className="beast-siege-timer d-flex d-lg-none">
                                Ready
                              </span>
                            </>
                          )}
                        </>
                      )}
                      <div
                        className={`d-flex flex-column gap-1 infotips-holder ${
                          dailyEvents[utcDayIndex].title === "BNB Maze Day" &&
                          "bnb-infotips-holder"
                        }`}
                      >
                        {dailyEvents[utcDayIndex].infoTips.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center gap-1"
                            >
                              <div className="yellow-dot"></div>
                              <span
                                className="beast-siege-timer"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  color: "#fff",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      {/* </div> */}
                      <img
                        src={dailyEvents[utcDayIndex].arrow}
                        alt=""
                        style={{ height: 20, width: 20 }}
                      />
                    </div>
                    <img
                      src={dailyEvents[utcDayIndex].bannerImg}
                      alt=""
                      className={`eventbannerimg ${dailyEvents[utcDayIndex]?.imageClass}`}
                    />
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <NavLink
                  className="new-stake-nft-wrapper position-relative d-flex align-items-center justify-content-between p-3"
                  to={"/account/challenges/puzzle-madness"}
                  onClick={onEventCardClick}
                >
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="d-flex flex-column gap-2">
                      <h6 className="leaderboards-title mb-0">
                        PUZZLE MADNESS
                      </h6>
                      {/* <span
                        className={`utcEventContent w-75`}
                        style={{ color: "#CCE8F5" }}
                      >
                        Test your puzzle solving skills and boost score
                      </span> */}
                      {beastSiegeStatus.puzzleMadness ? (
                        //   <div className="d-flex flex-column gap-1">
                        //   <span className="beast-siege-ends-in">Available until:</span>
                        //   <Countdown renderer={renderer4} date={midnight} />
                        // </div>
                        <>
                          <div className="ready-circle-2-position d-none d-lg-flex flex-column gap-1 align-items-center justify-content-center">
                            <div className="ready-circle-2 d-flex flex-column gap-1">
                              <Countdown
                                renderer={renderer4}
                                date={puzzleMadnessTimer}
                              />
                            </div>
                            <span className="new-time-remaining">
                              Time Remaining
                            </span>
                          </div>
                          <div className="d-flex d-lg-none">
                            <Countdown
                              renderer={renderer4}
                              date={puzzleMadnessTimer}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ready-circle d-none d-lg-flex">
                            <span className="beast-siege-timer">Ready</span>
                          </div>
                          <span className="beast-siege-timer d-flex d-lg-none">
                            Ready
                          </span>
                        </>
                      )}
                      <div
                        className={`d-flex flex-column gap-1 infotips-holder`}
                      >
                        <div className="d-flex align-items-center gap-1">
                          <div className="yellow-dot"></div>
                          <span
                            className="beast-siege-timer"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "#fff",
                            }}
                          >
                            Up to 160,000 points
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <div className="yellow-dot"></div>
                          <span
                            className="beast-siege-timer"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "#fff",
                            }}
                          >
                            x2-x8 multiplier
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <div className="yellow-dot"></div>
                          <span
                            className="beast-siege-timer"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "#fff",
                            }}
                          >
                            Multiple activations
                          </span>
                        </div>
                      </div>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/puzzleMadnessArrow.svg"
                      }
                      height={20}
                      width={20}
                      alt=""
                    />
                  </div>
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/puzzleMadnessBannerProfile.webp"
                    }
                    className="eventbannerimg puzzle-eventbannerimg"
                  />
                </NavLink>
              </div>
            </div>
          </div>
          {/* {allEvents &&
        <div className="col-12">
          <div className="all-treasure-wrapper p-3 d-flex align-items-center justify-content-between mt-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              {dummyBetaPassData2.slice(0, 5).map((item, index) => (
                 <div className={` ${item.status === "Expired" ? "new-treasure-hunt-card-expired" : "new-treasure-hunt-card"} p-0 d-flex flex-column`} style={{width: "19%"}}>
                   <div className={`p-2 ${item.status === "Expired" ? "treasure-hunt-top-expired" : "treasure-hunt-top"} d-flex align-items-center justify-content-between`}>
                     <div className="d-flex align-items-center gap-2">
                       <img
                         src={item.logo}
                         width={20}
                         height={20}
                         alt=""
                       />
                       <div className="d-flex flex-column">
                         <span className="treasure-hunt-title">
                           {item.title}
                         </span>
                         <span className="treasure-hunt-rewards">
                           {item.rewards}
                         </span>
                       </div>
                     </div>
                     <div
                       className={`position-relative ${
                         item.eventStatus === "Live"
                           ? "events-page-status-tag-live"
                           : item.eventStatus === "Coming Soon"
                           ? "events-page-status-tag-upcoming"
                           : "events-page-status-tag-expired"
                       } px-2 d-flex align-items-center justify-content-center gap-0`}
                       style={{ top: 0 }}
                     >
                     {item.eventStatus === "Live" &&
                       <div
                       className="pulsatingDot"
                       style={{ width: 7, height: 7, marginRight: 5 }}
                     ></div>
                     }
                       <span>{item.eventStatus}</span>
                     </div>
                   </div>
                   <div className="treasure-hunt-bottom p-2">
                     <div className="treasure-hunt-info d-flex flex-column p-1 gap-1">
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Type
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           {item.eventType}
                         </span>
                       </div>
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Total Earnings
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           $253.67
                         </span>
                       </div>
                     </div>
                     <hr className="sidebar-separator my-2" />
                     <div className="d-flex align-items-center justify-content-between">
                       <Countdown renderer={renderer} date={item.eventDate} />
                     
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
        } */}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
