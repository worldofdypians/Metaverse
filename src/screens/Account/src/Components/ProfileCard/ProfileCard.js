import React, { useEffect, useRef, useState } from "react";

import "react-tooltip/dist/react-tooltip.css";
import "./_profilecard.scss";
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
import defaultAvatarAlert from "../../Images/userProfile/default-avatar-alert.png";
import defaultAvatarPremium from "../../Images/userProfile/defaultAvatarPremium.png";
import defaultAvatarPremiumAlert from "../../Images/userProfile/defaultAvatarPremiumAlert.png";
import x4 from "./assets/4x.svg";
import x4rounded from "./assets/x4Rounded.svg";
import genesisRankImg from "../WalletBalance/newAssets/genesisRank.svg";
import globalRank from "../WalletBalance/newAssets/globalRank.svg";
// import Countdown from "react-countdown";
import dypMedal from "../../Images/userProfile/dyp-medal.svg";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import Clipboard from "react-clipboard.js";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import copyIcon from "../WalletBalance/assets/copyIcon.svg";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import xMark from "../WalletBalance/newAssets/xMark.svg";
import greenarrow from "./assets/greenarrow.svg";
import logouticon from "./assets/logout.svg";
import leaderboardIcon from "./assets/leaderboardIcon.svg";
import star from "./assets/star.svg";
import pointerArrow from "./assets/pointerArrow.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import player from "./assets/explorePlayer.png";
import triangle from "./assets/triangle.svg";
import globe from "./assets/globe.png";
import rankYellowArrow from "./assets/rankYellowArrow.svg";
import rankBlueArrow from "./assets/rankBlueArrow.svg";
import sync from "./assets/sync.svg";
import walletImg from "../../Images/userProfile/wallet.svg";
import circleArrow from "../../Images/userProfile/arrow-circle.svg";
import blackWallet from "../../Images/userProfile/wallet-black.svg";
import starActive from "./assets/star-active.svg";
import starDefault from "./assets/star-default.svg";
import arrowCircle from "./assets/arrowCircle.svg";
import bustDummy from "./assets/bustDummy.png";
import starterBust from "./assets/starterBust.png";
import rookieBust from "./assets/rookieBust.png";
import underdogBust from "./assets/underdogBust.png";
import championBust from "./assets/championBust.png";
import unstoppableBust from "./assets/unstoppableBust.png";
import skaleActive from "../../Components/LeaderBoard/assets/skaleActive.svg";
import bnbActive from "../../Components/LeaderBoard/assets/bnbActive.svg";
import coreActive from "../../Components/LeaderBoard/assets/coreActive.svg";
import victionActive from "../../Components/LeaderBoard/assets/victionActive.svg";
import mantaActive from "../../Components/LeaderBoard/assets/mantaActive.png";
import baseLogo from "../../Components/LeaderBoard/assets/baseActive.svg";

import taikoLogo from "../../Components/LeaderBoard/assets/taikoActive.svg";

import starAlert from "./assets/star-alert.svg";
import axios from "axios";
import nextArrow from "../../../../Marketplace/assets/nextArrow1.svg";
import Countdown from "react-countdown";
import { dyp700Address, dyp700v1Address } from "../../web3";
import { DYP_700_ABI, DYP_700V1_ABI } from "../../web3/abis";
import becomePremium from "./assets/becomePremium.svg";
import premiumDiscount from "./assets/premiumDiscount.svg";

import OutsideClickHandler from "react-outside-click-handler";
import Slider from "react-slick";
import { Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import premiumOfferTag from "./assets/premiumOfferTag2.png";
import premiumExclusive from "./assets/premiumExclusive2.svg";
import premiumRedTag from "../../../../../assets/redPremiumTag.svg";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1b1c3a",
    color: "#fff",
    maxWidth: 220,
    fontFamily: "Poppins",
  },
}));

const ProfileCard = ({
  email,discountPercentageViction,discountPercentageTaiko,
  discountPercentage,
  username,
  balance,
  address,
  handleConnect,
  userId,
  availableTime,
  isVerified,
  handleShowWalletPopup,
  coinbase,
  onSigninClick,
  onLogoutClick,
  onSyncClick,
  syncStatus,
  onLinkWallet,
  isPremium,
  isConnected,
  onOpenLeaderboard,
  onOpenGenesisLeaderboard,
  setPortfolio,
  onPremiumClick,
  handleSetAvailableTime,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  userRankCore,
  userCoreScore,
  userRankViction,
  userVictionScore,
  genesisRank,
  handleOpenDomains,
  domainName,
  rankData,
  setRankData,
  getRankData,userDataStar, userDataPosition, userRankManta, userMantaScore, userRankBase, userBaseScore,  userRankTaiko, userTaikoScore
}) => {
  let id = Math.random().toString(36);
  const windowSize = useWindowSize();
  const [exclusivePremium, setExclusivePremium] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);
  const [userRankName, setUserRankName] = useState({
    name: "starter",
    id: 0,
  });
  const [bundlesBought, setbundlesBought] = useState(0);
  const [dateofBundle, setdateofBundle] = useState(0);
  const [datewhenBundleBought, setdatewhenBundleBought] = useState(0);
  const [bundleExpireDay, setbundleExpireDay] = useState(0);
  const [bundleExpireMiliseconds, setbundleExpireMiliseconds] = useState(0);
  const [lastDayofBundleHours, setlastDayofBundleHours] = useState(0);
  const [lastDayofBundleMinutes, setlastDayofBundleMinutes] = useState(0);
  const [lastDayofBundleMilliseconds, setlastDayofBundleMilliseconds] =
    useState(0);
  const [lastDayofBundle, setlastDayofBundle] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [dateofBundlev1, setdateofBundlev1] = useState(0);
  const [datewhenBundleBoughtv1, setdatewhenBundleBoughtv1] = useState(0);
  const [rankDropdown, setRankDropdown] = useState(false);
  const [rankPopup, setRankPopup] = useState(false);
  const sliderRef = useRef(null);
  const [rankTooltip, setRankTooltip] = useState(false);

  const userTotalScore =
    userBnbScore + userSkaleScore + userCoreScore + userVictionScore + userMantaScore + userBaseScore + userTaikoScore;

  const handleUserRank = () => {
    let allScore;
    if (rankData && rankData.multiplier === "yes") {
      allScore = userTotalScore * 4;
    } else if (rankData && rankData.multiplier === "no") {
      allScore = userTotalScore;
    }
    if (allScore > 63999999) {
      setUserRankName({
        name: "unstoppable",
        id: 4,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(4);
      setUserProgress(100);
    } else if (allScore > 38999999) {
      setUserRankName({
        name: "champion",
        id: 3,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(3);
      setUserProgress((allScore / 64000000) * 100);
    } else if (allScore > 25999999) {
      setUserRankName({
        name: "underdog",
        id: 2,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(2);
      setUserProgress((allScore / 39000000) * 100);
    } else if (allScore > 13999999) {
      setUserRankName({
        name: "rookie",
        id: 1,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(1);
      setUserProgress((allScore / 26000000) * 100);
    } else {
      sliderRef?.current?.innerSlider?.slickGoTo(0);
      setUserProgress((allScore / 14000000) * 100);
    }
  };

  const updateUserRank = async () => {
    if (rankData && userRankName) {
      if (rankData.rank == userRankName.id) {
        return;
      } else if (rankData.rank < userRankName.id) {
        await axios
          .patch(
            `https://api.worldofdypians.com/api/userRanks/rank/${coinbase}`,
            {
              rank: userRankName.id,
            }
          )
          .then(async () => {
            getRankData();
          });
      }
    }
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  let oneMarch = new Date("2024-03-01 11:11:00 GMT+02:00");
  let oneApril = new Date("2024-04-01 11:11:00 GMT+02:00");
  let oneMay = new Date("2024-05-01 11:11:00 GMT+02:00");

  const countBundle = async () => {
    const result = await axios.get(
      `https://api3.dyp.finance/api/bundles/count/${address}`
    );

    const result_formatted = result.data.count;
    setbundlesBought(result_formatted);
  };

  const setlastDay = async (addr) => {
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);
    const timeofDeposit = await dypv2.methods.getTimeOfDeposit(addr).call();

    const timeofDepositv1 = await dypv1.methods.getTimeOfDeposit(addr).call();

    if (timeofDeposit !== 0 || timeofDepositv1 !== 0) {
      const timeofDeposit_miliseconds = timeofDeposit * 1000;
      const timeofDeposit_milisecondsv1 = timeofDepositv1 * 1000;

      const timeofbundleBought_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_miliseconds);

      const timeofbundleBought_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_milisecondsv1);

      const timeofbundleBought_Date_formatted = new Date(
        timeofbundleBought_Date
      );

      const timeofbundleBought_Date_formattedv1 = new Date(
        timeofbundleBought_Datev1
      );

      const timeofbundleBought_day =
        timeofbundleBought_Date_formatted.getDate();

      const timeofbundleBought_dayv1 =
        timeofbundleBought_Date_formattedv1.getDate();

      setdatewhenBundleBought(timeofbundleBought_day);
      setdatewhenBundleBoughtv1(timeofbundleBought_dayv1);

      const expiringTime = await dypv2.methods.getTimeOfExpireBuff(addr).call();

      const expiringTimev1 = await dypv1.methods
        .getTimeOfExpireBuff(addr)
        .call();

      const expiringTime_miliseconds = expiringTime * 1000;
      const expiringTime_milisecondsv1 = expiringTimev1 * 1000;

      const expiringTime_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_miliseconds);

      const expiringTime_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_milisecondsv1);

      const expiringTime_Date_formatted = new Date(expiringTime_Date);
      const expiringTime_Date_formattedv1 = new Date(expiringTime_Datev1);

      setdateofBundle(expiringTime_Date_formatted);
      setdateofBundlev1(expiringTime_Date_formattedv1);

      const expiringTime_day = expiringTime_Date_formatted.getDate();
      setbundleExpireDay(expiringTime_day);
      setbundleExpireMiliseconds(expiringTime_miliseconds);

      const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_miliseconds);

      const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
      const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
      const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
      const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
      const final = timeofDeposit_Hours - 11;
      setlastDayofBundleHours(final);

      const finalMinutes = timeofDeposit_Minutes - 11;

      setlastDayofBundleMinutes(finalMinutes);
      setlastDayofBundle(timeofDeposit_day);
      setlastDayofBundleMilliseconds(expiringTime_miliseconds);
    }
  };

  useEffect(() => {
    updateUserRank();
  }, [handleUserRank]);

  useEffect(() => {
    countBundle();
    if (address) {
      setlastDay(address);
    }
  }, [address]);

  useEffect(() => {
    handleUserRank();
  }, [
    userRank,
    userRankSkale,
    userBnbScore,
    userRankCore,
    userRankViction,
    userRankManta,
    userRankBase,

    userCoreScore,
    userVictionScore,
    userMantaScore,
    userBaseScore,

    userTaikoScore
  ]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (rankPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [rankPopup]);

  return (
    <>
      <div className="main-wrapper py-4 w-100">
        {/* )} */}
        <div className="row justify-content-center gap-3 gap-lg-0">
          <div className="position-relative px-lg-3 col-12">
            <div
              className={` ${
                isVerified && email && !isPremium && "user-cardImg-active"
              } ${
                isVerified &&
                email &&
                syncStatus !== "" &&
                isPremium &&
                "user-cardImg-active-premium"
              }  user-cardImg`}
            >
              <div
                className={`bordereddiv ${
                  (email && coinbase && username) ||
                  (!coinbase && email) ||
                  (!coinbase && !email)
                    ? ""
                    : "border-bottom-0"
                }`}
              >
                <div className="d-flex flex-column flex-lg-row profile-header-wrapper justify-content-between gap-2 align-items-start align-items-lg-center align-items-md-center">
                  <div
                    className={`d-flex gap-2 justify-content-between align-items-center ${
                      windowSize.width > 991 && "w-50"
                    }  `}
                  >
                    <div className="d-flex align-items-center gap-2 w-100">
                      {(coinbase && !email && !isPremium) ||
                      (!coinbase && !email) ||
                      (coinbase && email && !address && !username) ||
                      (!coinbase &&
                        email &&
                        address &&
                        username &&
                        !isPremium) ||
                      (!address && !isPremium) ? (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      ) : null}
                      {address && email && coinbase && !isPremium && (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      )}
                      {address && email && isPremium && !coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}
                      {address && email && isPremium && coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}

                      {!email && isPremium && coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}

                      {(isVerified && email) || (coinbase && !email) ? (
                        <div className="d-flex flex-column gap-1 w-100">
                          <div className="d-flex align-items-center gap-2">
                            {coinbase && !email && (
                              <div className="d-flex flex-column gap-1 col-lg-9 col-12">
                                <span className="usernametext font-organetto">
                                  Start your journey now!
                                </span>
                              </div>
                            )}
                            <span className="usernametext font-organetto d-flex flex-column flex-lg-row flex-md-row align-items-start align-items-lg-center align-items-md-center gap-2">
                              {email !== undefined && username}
                              {!domainName && isConnected && email && (
                                <span
                                  className={`${
                                    isPremium
                                      ? "premiumtext-active"
                                      : "premiumtext"
                                  }
                              d-flex align-items-center gap-1`}
                                  style={{ cursor: "pointer" }}
                                  onClick={handleOpenDomains}
                                >
                                  {address && email && (
                                    <img
                                      src={isPremium ? starActive : starDefault}
                                    />
                                  )}
                                  Get domain name
                                </span>
                              )}
                              {/* {email && address && coinbase && !isPremium && (
                    <div
                      className={` wallet-wrapper-active2 hoveractive position-relative justify-content-between
                    d-flex align-items-center position-relative mt-lg-0`}
                      onClick={onPremiumClick}
                      style={{height: "30px"}}
                    > 
                      <h6 className="become-premium-title mb-0">
                        Premium Subscription
                      </h6>

                      <img
                        src={becomePremium}
                        alt=""
                        className="become-premium-img"
                        width={40}
                        
                      />
                    </div>
                  )} */}
                            </span>
                          </div>

                          <div className="wallet-balance d-flex flex-column flex-xxl-row flex-lg-row gap-3 position-relative">
                            <>
                              <Clipboard
                                component="div"
                                data-event="click"
                                style={{ border: "none" }}
                                data-for={id}
                                data-tip="Copied To Clipboard!"
                                data-clipboard-text={address}
                                className={`${
                                  isVerified &&
                                  email &&
                                  address?.toLowerCase() ===
                                    coinbase?.toLowerCase() &&
                                  !isPremium &&
                                  "wallet-wrapper-active d-flex bg-transparent p-0"
                                } ${
                                  isVerified &&
                                  email &&
                                  syncStatus === "initial" &&
                                  isPremium &&
                                  "wallet-wrapper-active-premium d-flex bg-transparent p-0"
                                } ${
                                  address &&
                                  email &&
                                  coinbase &&
                                  syncStatus !== "" &&
                                  address.toLowerCase() !==
                                    coinbase.toLowerCase() &&
                                  "wallet-wrapper-alert d-flex bg-transparent p-0"
                                } ${
                                  (coinbase &&
                                    email &&
                                    !address &&
                                    !username) ||
                                  (coinbase && email && !address && username) ||
                                  (!email && !coinbase && "d-none")
                                }  d-flex wallet-wrapper align-items-center gap-2 position-relative`}
                              >
                                <div className="d-flex flex-column">
                                  <div
                                    className="d-flex flex-column"
                                    onClick={() => {
                                      setTooltip(true);
                                      setTimeout(() => setTooltip(false), 1000);
                                    }}
                                  >
                                    <span className="emailtext">{email}</span>
                                    {!domainName ? (
                                      <span className="wallet-address">
                                        {windowSize.width > 991
                                          ? isVerified && email
                                            ? shortAddress(address)
                                            : shortAddress(coinbase)
                                          : isVerified && email
                                          ? shortAddress(address)
                                          : shortAddress(coinbase)}
                                      </span>
                                    ) : (
                                      <span className="wallet-address">
                                        {domainName}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Clipboard>

                              <div
                                className={`tooltip-wrapper p-2 ${
                                  tooltip && "tooltip-active"
                                }`}
                                style={{ top: "auto", right: 0 }}
                              >
                                <p className="tooltip-content m-0">Copied!</p>
                              </div>
                            </>
                          </div>
                          {/* {!coinbase && email && (
                            <button
                              className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                              onClick={() => {
                                handleShowWalletPopup();
                              }}
                              style={{
                                width: "fit-content",
                                whiteSpace: "nowrap",
                                fontSize: 14,
                              }}
                            >
                              <img
                                src={blackWallet}
                                alt=""
                                style={{ width: 18 }}
                              />
                              Connect wallet
                            </button>
                          )} */}
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-1 col-lg-7">
                          <span className="usernametext font-organetto">
                            Start your journey now!
                          </span>
                        </div>
                      )}
                    </div>{" "}
                  </div>
                  {/* {!coinbase && !email && (
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                      onClick={() => {
                        handleShowWalletPopup();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      <img src={blackWallet} alt="" style={{ width: 18 }} />
                      Connect wallet
                    </button>
                  )} */}
                  {coinbase && address && !email && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && !email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center signinbtn"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{
                        width: "fit-content",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Create player
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && email && username && !address && (
                    <div
                      className="walletconnectBtn col-lg-3 col-12"
                      onClick={onLinkWallet}
                    >
                      <div className="d-flex gap-2 justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <img src={walletImg} alt="" />
                          <div className="d-flex flex-column">
                            <span className="secondTitle">Connect wallet</span>

                            <span className="firsttitle">Link your wallet</span>
                          </div>
                        </div>
                        <img src={circleArrow} alt="" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`${
                      isPremium ? "buttons-grid-premium w-100" : "buttons-grid"
                    } ${
                      coinbase && !isPremium
                        ? ""
                        : coinbase && isPremium && !email
                        ? "d-none"
                        : ""
                    }`}
                    style={{
                      gridTemplateColumns:
                        !email && !isPremium
                          ? "repeat(1, 1fr)"
                          : email && !isPremium
                          ? "repeat(2, 1fr)"
                          : isPremium
                          ? "repeat(1, 1fr)"
                          : "repeat(3, 1fr)",
                      placeItems: "flex-end",
                    }}
                  >
                    {!isPremium && (discountPercentage == 0 && discountPercentageViction === 0 && discountPercentageTaiko === 0) && (
                      <div
                        className={` wallet-wrapper-active2 hoveractive position-relative justify-content-between
                    d-flex align-items-center position-relative mt-3 mt-lg-0`}
                        onClick={onPremiumClick}
                      >
                        {/* <div className="table-separator position-absolute"></div> */}
                        <h6 className="become-premium-title mb-0">
                          Premium Subscription
                        </h6>

                        <img
                          src={becomePremium}
                          alt=""
                          className="become-premium-img"
                        />
                      </div>
                    )}

                    {!isPremium && (discountPercentage > 0 || discountPercentageViction>0 || discountPercentageTaiko>0) && (
                      <div
                        className={` wallet-wrapper-active-discount hoverdiscount position-relative justify-content-between
                    d-flex align-items-center position-relative mt-3 mt-lg-0`}
                        onClick={onPremiumClick}
                      >
                        <div className="premiumRedTag-profile position-absolute">
                          <div className="position-relative d-flex flex-column">
                            <img
                              src={premiumRedTag}
                              alt=""
                              className="premiumtag-img"
                            />
                            <div className="d-flex flex-column position-absolute discountwrap-profile">
                              <span className="discount-price2-profile font-oxanium">
                                {discountPercentage > 0 ? discountPercentage : discountPercentageViction > 0 ? discountPercentageViction
                                : discountPercentageTaiko > 0 ? discountPercentageTaiko
                                 : discountPercentage}%
                              </span>
                              <span className="discount-price-bottom">
                                Discount
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <h6 className="lifetime-plan-text2 m-0">
                            Lifetime plan
                          </h6>

                          <div className="d-flex align-items-center gap-2">
                            <h6 className="discount-price-profile m-0">
                            {discountPercentage == 100 ||
                                      discountPercentageViction == 100||
                                      discountPercentageTaiko == 100
                                        ? "FREE"
                                        : "$" +
                                          (100 -
                                            Number(
                                              discountPercentage > 0
                                                ? discountPercentage
                                                : discountPercentageViction > 0
                                                ? discountPercentageViction
                                                : discountPercentageTaiko > 0
                                                ? discountPercentageTaiko
                                                : discountPercentage
                                            ))}
                            </h6>
                            <h6 className="old-price-text-profile m-0">$100</h6>
                          </div>
                        </div>
                        <img src={premiumDiscount} alt="" className="" />
                      </div>
                    )}

                    {email && address && (
                      <>
                        {/* <img
                          src={leaderboardIcon}
                          alt=""
                          style={{ height: "54px", width: "50px" }}
                        /> */}

                        <div className="position-relative rank-outer-wrapper">
                          <div
                            className={`${
                              isPremium
                                ? "wallet-wrapper-active-premium hoverpremium"
                                : "wallet-wrapper-active hoveractive"
                            }
                    position-relative player-rank-wrapper
                    d-flex flex-column align-items-start justify-content-center position-relative mt-3 mt-lg-0`}
                            onClick={() => setRankDropdown(!rankDropdown)}
                          >
                            <img
                              src={
                                userRankName.name === "starter"
                                  ? starterBust
                                  : userRankName.name === "rookie"
                                  ? rookieBust
                                  : userRankName.name === "underdog"
                                  ? underdogBust
                                  : userRankName.name === "champion"
                                  ? championBust
                                  : userRankName.name === "unstoppable"
                                  ? unstoppableBust
                                  : starterBust
                              }
                              alt=""
                              className="player-bust"
                            />
                            <div className="d-flex flex-column">
                              <span className="my-rank-text">My Rank</span>
                              <h6
                                className="player-rank-text mb-0"
                                style={{
                                  color: isPremium ? "#FFBF00" : "#1BF5FF",
                                }}
                              >
                                {userRankName.name}
                              </h6>
                            </div>
                          </div>
                          {rankDropdown && (
                            <OutsideClickHandler
                              onOutsideClick={() => setRankDropdown(false)}
                            >
                              <div className="player-rank-dropdown p-3 d-flex flex-column gap-2">
                                <div className="d-flex flex-column gap-1">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ width: "33%" }}></div>
                                    <span
                                      className="rank-dropdown-span"
                                      style={{ width: "33%" }}
                                    >
                                      Rank
                                    </span>
                                    <span
                                      className="rank-dropdown-span"
                                      style={{ width: "33%" }}
                                    >
                                      Score
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={bnbActive}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        BNB Chain
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRank + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userBnbScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={mantaActive}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        Manta
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankManta + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userMantaScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={baseLogo}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        Base
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankBase + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userBaseScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={taikoLogo}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        Taiko
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankTaiko + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userTaikoScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={skaleActive}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        SKALE
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankSkale + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userSkaleScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={coreActive}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        CORE
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankCore + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userCoreScore, 0)}
                                    </span>
                                  </div>
                                  <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "33%" }}
                                    >
                                      <img
                                        src={victionActive}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      <span className="rank-dropdown-text">
                                        VICTION
                                      </span>
                                    </div>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      #{userRankViction + 1}
                                    </span>
                                    <span
                                      className="rank-dropdown-text"
                                      style={{ width: "33%" }}
                                    >
                                      {getFormattedNumber(userVictionScore, 0)}
                                    </span>
                                  </div>
                                </div>
                                <div className="total-stars-wrapper d-flex align-items-center justify-content-between p-2">
                                  <img
                                    src={star}
                                    style={{ width: "30px", height: "30px" }}
                                    alt=""
                                  />
                                  <div className="d-flex align-items-center gap-4">
                                    {/* <div className="d-flex flex-column align-items-end">
                                      <span className="total-stars-span">
                                        Rank
                                      </span>
                                      <h6 className="total-stars-amount mb-0">
                                        #{Number(userDataPosition)+1}
                                      </h6>
                                    </div> */}
                                    <div className="d-flex flex-column align-items-end">
                                      <span className="total-stars-span">
                                        Collected Stars
                                      </span>
                                      <h6 className="total-stars-amount mb-0">
                                        {getFormattedNumber(userDataStar, 0)}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <hr className="new-rank-divider my-2" />
                                <div className="d-flex align-items-center justify-content-between">
                                  <span
                                    className="current-rank"
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {userRankName.name}
                                    <span
                                      className="current-rank"
                                      style={{
                                        color:
                                          rankData?.multiplier === "yes"
                                            ? "#FFC700"
                                            : "#1BF5FF",
                                      }}
                                    >
                                      (
                                      {userRankName?.name === "rookie"
                                        ? "$5"
                                        : userRankName?.name === "underdog"
                                        ? "$10"
                                        : userRankName?.name === "champion"
                                        ? "$25"
                                        : userRankName?.name === "unstoppable"
                                        ? "$100"
                                        : "$0"}
                                      )
                                    </span>
                                  </span>
                                  <span
                                    className="current-rank"
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {userRankName.name === "rookie"
                                      ? "underdog"
                                      : userRankName.name === "underdog"
                                      ? "champion"
                                      : userRankName.name === "champion"
                                      ? "unstoppable"
                                      : userRankName.name === "unstoppable"
                                      ? ""
                                      : "rookie"}
                                    <span
                                      className="current-rank"
                                      style={{
                                        color:
                                          rankData?.multiplier === "yes"
                                            ? "#FFC700"
                                            : "#1BF5FF",
                                      }}
                                    >
                                      (
                                      {userRankName?.name === "rookie"
                                        ? "$10"
                                        : userRankName?.name === "underdog"
                                        ? "$25"
                                        : userRankName?.name === "champion"
                                        ? "$100"
                                        : userRankName?.name === "unstoppable"
                                        ? ""
                                        : "$5"}
                                      )
                                    </span>
                                  </span>
                                </div>
                                <div
                                  className={`${
                                    rankData?.multiplier === "yes"
                                      ? "rank-progress-bar-active"
                                      : "rank-progress-bar"
                                  } d-flex align-items-center px-2 justify-content-between position-relative`}
                                >
                                  <div
                                    className={` ${
                                      rankData?.multiplier === "yes"
                                        ? "rank-current-progress-active"
                                        : "rank-current-progress"
                                    } d-flex align-items-center justify-content-end`}
                                    style={{ width: `${userProgress}%` }}
                                  >
                                    {rankData?.multiplier === "yes" && (
                                      <img
                                        src={x4}
                                        style={{ marginRight: "5px" }}
                                        width={25}
                                        height={17}
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <span className="rank-current-score">
                                    {rankData?.multiplier === "yes"
                                      ? getFormattedNumber(
                                          userTotalScore * 4,
                                          0
                                        )
                                      : getFormattedNumber(userTotalScore, 0)}
                                  </span>
                                  <span className="rank-current-score">
                                    {userRankName?.name === "rookie"
                                      ? "26M"
                                      : userRankName?.name === "underdog"
                                      ? "39M"
                                      : userRankName?.name === "champion"
                                      ? "64M"
                                      : userRankName?.name === "unstoppable"
                                      ? ""
                                      : "14M"}
                                  </span>
                                </div>
                                {rankData?.multiplier === "no" && !isPremium ? (
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="activate-bonus-btn d-flex align-items-center gap-2"
                                      onClick={() => {
                                        onPremiumClick();
                                        setRankDropdown(false);
                                      }}
                                    >
                                      Activate
                                      <img
                                        src={x4}
                                        style={{ width: "25px" }}
                                        alt=""
                                      />
                                    </button>
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <hr className="new-rank-divider my-2" />
                                <div
                                  className="rank-popup-btn p-2 d-flex align-items-center justify-content-between"
                                  style={{
                                    border:
                                      rankData?.multiplier === "yes"
                                        ? "2px solid #FFC700"
                                        : "2px solid #1BF5FF",
                                  }}
                                  onClick={() => {
                                    setRankPopup(true);
                                    setRankDropdown(false);
                                  }}
                                >
                                  <span
                                    className="open-ranks-text"
                                    style={{
                                      color:
                                        rankData?.multiplier === "yes"
                                          ? "#FFC700"
                                          : "#1BF5FF",
                                    }}
                                  >
                                    Rankings and Rewards
                                  </span>
                                  {rankData?.multiplier === "yes" ? (
                                    <img
                                      src={rankYellowArrow}
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                  ) : (
                                    <img
                                      src={rankBlueArrow}
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                  )}
                                </div>
                                {/* <div
                                className="d-flex align-items-center justify-content-center gap-2 mt-2"
                                onClick={() => {
                                  setRankPopup(true);
                                  setRankDropdown(false);
                                }}
                              >
                                <span className="open-ranks-text mb-0">
                                  Rankings and Rewards
                                </span>
                                <img src={arrowCircle} alt="" />
                              </div> */}
                              </div>
                            </OutsideClickHandler>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  
                </div>
              </div>
              <div
                className={`bordereddiv border-0 ${
                  (email &&
                    coinbase &&
                    username &&
                    address &&
                    address.toLowerCase() !== coinbase.toLowerCase()) ||
                  (!coinbase && email) ||
                  (!coinbase && !email)
                    ? "py-2"
                    : "p-0"
                }`}
              >
                <div
                  className={`d-flex flex-column flex-xxl-row flex-lg-row  align-items-center gap-2 ${
                    coinbase || (!coinbase && email) || (!coinbase && !email)
                      ? "justify-content-between"
                      : "justify-content-end p-2"
                  } `}
                >
                  {address &&
                    email &&
                    coinbase &&
                    syncStatus !== "" &&
                    address &&
                    address.toLowerCase() !== coinbase.toLowerCase() && (
                      <div className="sync-wrapper">
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={triangle}
                            alt=""
                            style={{ width: "21px", height: "20px" }}
                          />
                          <span className="premiumtext-alert">
                            Your gaming account is not linked to the wallet you
                            connected. To update the game wallet address, press
                            the synchronize button.
                          </span>
                        </div>
                      </div>
                    )}
                  {((!coinbase && email) || (!coinbase && !email)) && (
                    <p className="walletassoc-txt m-0">
                      *Connect your wallet to view more info.
                    </p>
                  )}

                  {!address && coinbase && email && username && (
                    <p className="walletassoc-txt m-0">
                      *There is no wallet address associated with your game
                      account.
                      <br /> Link your wallet to finish setup.
                    </p>
                  )}

                  {((!coinbase && email) || (!coinbase && !email)) && (
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                      onClick={() => {
                        handleShowWalletPopup();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      <img src={blackWallet} alt="" style={{ width: 18 }} />
                      Connect wallet
                    </button>
                  )}

                  <div
                    className=" align-items-center gap-2"
                    style={{
                      width: "fit-content",
                      display:
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "flex"
                          : "none",
                      justifyContent:
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "space-between"
                          : "",
                    }}
                  >
                    {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() !== coinbase.toLowerCase() && (
                        <button
                          className="d-flex align-items-center gap-1 syncbtn"
                          onClick={onSyncClick}
                        >
                          <img
                            src={sync}
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
                      )}
                    {/* {email && (
                      <button
                        className="logoutbtn px-3 py-1"
                        onClick={onLogoutClick}
                      >
                        <img src={logouticon} alt="" /> Log Out
                      </button>
                    )}
                    {address && email && (
                      <div className="d-flex w-100 align-items-center">
                        <button
                          className="new-bundle-btn d-flex align-items-center gap-2 px-2"
                          onClick={setPortfolio}
                        >
                          <img src={walletIcon} alt="" />
                          My Portfolio
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="explorebanner col-12 col-lg-7 col-xxl-7 position-relative">
          <div className="d-flex flex-column gap-2 justify-content-center h-100">
            <div className="orangesection">
              <span>World of Dypians</span>
            </div>
            <div className="col-lg-7 col-xxl-7">
              <h5 className="explore-title">
                Explore an exciting digital world
              </h5>
            </div>
          </div>
          <img
            src={player}
            alt=""
            className="position-absolute playerimg"
            style={{
              height:
                address &&
                email &&
                coinbase &&
                syncStatus !== "" &&
                address.toLowerCase() !== coinbase.toLowerCase()
                  ? "450px"
                  : "",
            }}
          />
        </div> */}
        </div>
      </div>
      {rankPopup && (
        <OutsideClickHandler onOutsideClick={() => setRankPopup(false)}>
          <div
            className="popup-wrapper rank-popup popup-active p-3"
            id="leaderboard"
            style={{ width: "70%", pointerEvents: "auto" }}
          >
            {rankData?.multiplier === "no" && !isPremium ? (
              <>
                <img
                  src={premiumOfferTag}
                  className={`premium-offer-tag ${
                    exclusivePremium ? "premium-shadow-active" : ""
                  }`}
                  onClick={() =>
                    exclusivePremium
                      ? setExclusivePremium(false)
                      : setExclusivePremium(true)
                  }
                  alt=""
                />
                <OutsideClickHandler
                  onOutsideClick={() => setExclusivePremium(false)}
                >
                  <img
                    src={premiumExclusive}
                    onClick={() => {
                      onPremiumClick();
                      setRankPopup(false);
                      setExclusivePremium(false);
                    }}
                    className={`premium-exclusive ${
                      exclusivePremium ? "premium-exclusive-active" : ""
                    }`}
                    alt=""
                  />
                </OutsideClickHandler>
              </>
            ) : (
              <></>
            )}
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <h2
                    className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle rankingsPopupTitle gap-2`}
                  >
                    Rankings and Rewards
                  </h2>
                  <OutsideClickHandler
                    onOutsideClick={() => setRankTooltip(false)}
                  >
                    <HtmlTooltip
                      open={rankTooltip}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={
                        <React.Fragment>
                          Rankings and Rewards offer players a way to track
                          their game progress and see the rewards they've earned
                          for each rank. These ranks are determined by the
                          accumulation of in-game points from both the BNB Chain
                          and SKALE Network.
                          <br />
                          <br />
                          Each month, the ranks and points reset, giving
                          everyone a chance for a fresh start. As you climb the
                          ranks, you'll unlock rewards based on your final rank
                          at the end of the cycle.
                          <br />
                          <br />
                          <b>
                            The reward is not accumulative, meaning you only get
                            the reward for the rank you have
                          </b>
                        </React.Fragment>
                      }
                    >
                      {" "}
                      <img
                        style={{ cursor: "pointer" }}
                        src={tooltipIcon}
                        width={25}
                        height={25}
                        onClick={() => setRankTooltip(true)}
                        alt=""
                      />
                    </HtmlTooltip>
                  </OutsideClickHandler>
                </div>
                <div
                  className={` ${
                    rankData?.multiplier === "yes" ? "activated-user-score" : ""
                  } d-flex align-items-center gap-2 mt-2`}
                >
                  <span
                    className="your-score-span"
                    style={{
                      marginLeft: rankData?.multiplier === "yes" ? "10px" : "0",
                    }}
                  >
                    My points
                  </span>
                  <h6
                    className="mb-0 your-score-text"
                    style={{
                      color:
                        rankData?.multiplier === "yes" ? "#FFC700" : "#1BF5FF",
                    }}
                  >
                    {rankData?.multiplier === "yes"
                      ? getFormattedNumber(userTotalScore * 4, 0)
                      : getFormattedNumber(userTotalScore, 0)}
                  </h6>
                  {rankData?.multiplier === "yes" ? (
                    <img src={x4rounded} width={30} alt="" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <img
                src={xMark}
                onClick={() => setRankPopup(false)}
                alt=""
                style={{ cursor: "pointer" }}
              />
            </div>

            {windowSize.width > 991 ? (
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={starterBust}
                      className={`${
                        userRankName.name === "starter"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "starter"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      STARTER
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">0 - 13,999,999</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "starter"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$0</h6>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={rookieBust}
                      className={`${
                        userRankName.name === "rookie"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "rookie"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      ROOKIE
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">14,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "rookie"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$5</h6>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={underdogBust}
                      className={`${
                        userRankName.name === "underdog"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "underdog"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNDERDOG
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">26,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "underdog"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$10</h6>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={championBust}
                      className={`${
                        userRankName.name === "champion"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "champion"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      CHAMPION
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">39,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "champion"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$25</h6>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={unstoppableBust}
                      className={`${
                        userRankName.name === "unstoppable"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "unstoppable"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNSTOPPABLE
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">64,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "unstoppable"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$100</h6>
                  </div>
                </div>
              </div>
            ) : (
              <Slider {...settings} ref={(c) => (sliderRef.current = c)}>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={starterBust}
                      className={`${
                        userRankName.name === "starter"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "starter"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      STARTER
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">0 - 13,999,999</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "starter"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$0</h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={rookieBust}
                      className={`${
                        userRankName.name === "rookie"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "rookie"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      ROOKIE
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">14,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "rookie"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$5</h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={underdogBust}
                      className={`${
                        userRankName.name === "underdog"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "underdog"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNDERDOG
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">26,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "underdog"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$10</h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={championBust}
                      className={`${
                        userRankName.name === "champion"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "champion"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      CHAMPION
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">39,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "champion"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$25</h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={unstoppableBust}
                      className={`${
                        userRankName.name === "unstoppable"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName.name === "unstoppable"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNSTOPPABLE
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">64,000,000</span>
                  </div>
                  <div
                    className={` ${
                      userRankName.name === "unstoppable"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$100</h6>
                  </div>
                </div>
              </Slider>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default ProfileCard;
