import React, { useState, useEffect, useRef } from "react";
import BundleCard from "../Account/src/Components/BundleCard/BundleCard";
import { ERC20_ABI } from "../Account/src/web3/abis";
import Web3 from "web3";
import classes from "../Account/src/Containers/Dashboard/Dashboard.module.css";
import dypius from "../Account/src/Images/userProfile/dypius.svg";
import dypiusPremium36 from "../Account/src/Images/userProfile/dypiusPremium36.svg";

import dragonIcon from "../Account/src/Images/userProfile/dragonIcon.svg";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "../Account/src/Containers/Dashboard/Dashboard.schema";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { NavLink, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import criticalHit from "../Marketplace/MarketNFTs/assets/criticalHit2.webp";
import dailyBonusImg from "../Marketplace/MarketNFTs/assets/dailyBonus.webp";

import goldenPass from "../Marketplace/MarketNFTs/assets/goldenPass.webp";
import puzzleMadness from "../Account/src/Components/BundleCard/assets/puzzleMadness2.webp";
import dragonPackage from "../Account/src/Components/BundleCard/assets/dragonPackageIcon2.webp";
import NewBundleCard from "../Account/src/Components/BundleCard/NewBundleCard";
import conflux from "../Account/src/Components/WalletBalance/assets/conflux.svg";
import gate from "../Account/src/Components/WalletBalance/assets/gate.svg";
import doge from "../Marketplace/MarketNFTs/assets/dogeLogo.svg";
import cmc from "../Marketplace/MarketNFTs/assets/cmc.svg";

import coin98 from "../Account/src/Components/WalletBalance/assets/coin98.svg";
import coingecko from "../Account/src/Components/WalletBalance/assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
import skaleLogo from "./assets/skaleLogo.svg";
import seiLogo from "./assets/seiLogo.svg";
import multiversLogo from "./assets/multiversLogo.svg";

import coreLogo from "./assets/coreLogo.svg";
import mantaLogo from "./assets/mantaLogo2.png";
import cookie3Logo from "./assets/cookie3Logo.svg";

import taikoLogo from "./MarketNFTs/assets/taikoLogo.svg";
import victionLogo from "./assets/victionLogo.svg";
import immutableLogo from "./assets/immutableLogo.svg";

import avaxLogo from "./assets/avaxLogo.svg";

import betaMyEarnings from "./assets/betaMyEarnings.png";
import DragonPopup from "../../components/PackagePopups/DragonPopup";
import GoldenPassPopup from "../../components/PackagePopups/GoldenPassPopup";
import PuzzleMadnessPopup from "../../components/PackagePopups/PuzzleMadnessPopup";
import CriticalHitPopup from "../../components/PackagePopups/CriticalHitPopup";
import OutsideClickHandler from "react-outside-click-handler";
import { useParams } from "react-router-dom";
import BetaPassEvents from "./BetaPassEvents";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import gateUpcoming from "./assets/gateUpcoming.webp";

import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "./assets/coingeckoUpcoming.png";
import baseUpcoming from "./assets/baseUpcoming.webp";
import avaxUpcoming from "./assets/avaxUpcoming.png";

import infoIcon from "./assets/infoIcon.svg";
import liveDot from "./assets/liveDot.svg";
import eventsArrow from "./assets/eventsArrow.svg";
import whitePickaxe from "./assets/whitePickAxe.svg";
import magnifier from "./assets/magnifier.svg";

import whiteCalendar from "./assets/whiteCalendar.svg";
import BetaEventCard from "./components/BetaEventCard";
import eventPopupImage from "../Account/src/Components/WalletBalance/assets/eventPopupImage.png";
import dogePopupImage from "../Account/src/Components/WalletBalance/assets/dogePopupImage.png";

import dypeventPopupImage from "../Account/src/Components/WalletBalance/assets/dypEventImage.png";

import gatePopupImage from "../Account/src/Components/WalletBalance/assets/gatePopupImage.png";
import cmcPopupImage from "../Account/src/Components/WalletBalance/assets/cmcPopupImage.png";
import skalePopupImage from "../Account/src/Components/WalletBalance/assets/skalePopupImage.png";
import eventPopupImageAvax from "../Account/src/Components/WalletBalance/assets/eventPopupImageAvax.png";
import eventPopupImageGecko from "../Account/src/Components/WalletBalance/assets/eventPopupImageGecko.png";
import eventPopupImageBase from "../Account/src/Components/WalletBalance/assets/eventPopupImageBase.png";
import eventPopupImageDypius2 from "../Account/src/Components/WalletBalance/assets/dypiuspopup2.png";
import victionThumb from "../Account/src/Components/WalletBalance/assets/victionThumb.png";
import seiThumb from "../Account/src/Components/WalletBalance/assets/seiThumb.png";
import multiversThumb from "../Account/src/Components/WalletBalance/assets/multiversThumb.png";
import immutableThumb from "../Account/src/Components/WalletBalance/assets/immutableThumb.png";
import coreThumb from "../Account/src/Components/WalletBalance/assets/coreThumb.png";
import mantaThumb from "../Account/src/Components/WalletBalance/assets/mantaThumb.png";
import taikoThumb from "../Account/src/Components/WalletBalance/assets/taikoThumb.webp";
import baseThumb from "../Account/src/Components/WalletBalance/assets/baseThumb.webp";

import cookie3Thumb from "../Account/src/Components/WalletBalance/assets/cookie3Thumb.png";
import baseLogo from "../Home/VideoWrapper/assets/baseLogo.svg";

import grayDollar from "../Account/src/Components/WalletBalance/assets/grayDollar.svg";
import closeMark from "../Account/src/Components/WalletBalance/assets/closeMark.svg";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import upcomingDailyBonus from "./assets/upcomingDailyBonus.png";
import upcomingDoge from "./assets/upcomingDoge.webp";
import upcomingSkale from "./assets/upcomingSkale.webp";
import upcomingCookie from "./assets/cookieBg.webp";
import upcomingBase2 from "./assets/upcomingBase2.webp";

import upcomingCookieMobile from "./assets/cookieMobileBg.webp";

import upcomingMidle from "./assets/midleBg.webp";
import upcomingMidleMobile from "./assets/midleBgMobile.webp";

import upcomingSkaleMobile from "./assets/upcomingSkaleMobile.webp";
import upcomingBnb from "./assets/upcomingBnb.png";

import upcomingBabyDoge from "./assets/upcomingBabyDoge.webp";
import upcomingBabyDogeMobile from "./assets/upomingBabyDogeMobile.webp";

import upcomingDyp from "./assets/upcomingDyp.webp";
import upcomingCmc from "./assets/upcomingCmc.webp";
import upcomingDyp2 from "./assets/dypiusBgPic2.webp";
import immutableBg from "./assets/immutableBg.webp";
import seiBg from "./assets/seiBg.webp";
import bnbPopupImage from "./assets/bnbPopupImage.png";
import coreBg from "./assets/coreBg.webp";
import taikoBg from "./assets/taikoBg.webp";
import taikoMobileBg from "./assets/taikoActive.png";

import victionBg from "./assets/victionBg.webp";
import multiversBg from "./assets/multiversBg.webp";
import mantaBg from "./assets/mantaBg.webp";
import mantaMobileBg from "./assets/mantaMobileBg.png";
import immutableMobileBg from "./assets/immutableActive.webp";
import seiMobileBg from "./assets/seiActive.webp";
import coreMobileBg from "./assets/coreActive.webp";
import victionMobileBg from "./assets/victionActive.webp";
import multiversMobileBg from "./assets/multiversActive.webp";
import bnbLogo from "./assets/bnbIcon.svg";
import dailyBonus from "./assets/dailyBonus.webp";
import MintPopup from "../../components/TimepieceMint/MintPopup";

import axios from "axios";
import Countdown from "react-countdown";
import getFormattedNumber from "../Account/src/Utils.js/hooks/get-formatted-number";
import { useAuth } from "../Account/src/Utils.js/Auth/AuthDetails";
import DailyBonusModal from "./DailyBonusModal";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-start popup-timer mt-4 mt-lg-0 gap-1">
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc-2 mb-0">Days</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc-2 mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc-2 mb-0">Minutes</span>
        </div>
      </div>
    </>
  );
};

const MarketEvents = ({
  account,
  chainId,
  dyptokenDatabnb,
  dyptokenDatabnb_old,
  idyptokenDatabnb,
  handleAvailableTime,
  remainingTime,
  tabState,
  ethTokenData,
  dyptokenData_old,
  dogePrice,
  binanceW3WProvider,
  dummyBetaPassData2,
  skaleEarnUsd,
  seiEarnUsd,
  coreEarnUsd,
  victionEarnUsd,
  taikoEarnUsd,
  cookieEarnUsd,
  immutableEarnUsd,
  mantaEarnUsd,
  multiversEarnUsd,
  bnbEarnUsd,
}) => {
  const location = useLocation();
  const windowSize = useWindowSize();
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();
const [dailyBonusPopup, setDailyBonusPopup] = useState(false)
  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [selectedPackage, setSelectedPackage] = useState(
    location.state?.package ? location.state?.package : "treasure-hunt"
  );
  const [popup, setPopup] = useState(false);
  const [packagePopup, setPackagePopup] = useState("");
  const [activeTab, setActiveTab] = useState("live");
  const { eventId } = useParams();
  const [dummyEvent, setDummyEvent] = useState();
  const [eventPopup, setEventPopup] = useState(false);


  const [matEarnUsd, setmatEarnUsd] = useState(0);
  const [matEarnToken, setmatEarnToken] = useState(0);
  const [matPoints, setmatPoints] = useState(0);


  const selected = useRef(null);
  const { email } = useAuth();

  // const getTokenDatabnb = async () => {
  //   await axios
  //     .get("https://api.dyp.finance/api/the_graph_bsc_v2")
  //     .then((data) => {
  //       const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
  //       setBnbPrice(bnb);
  //     });
  // };

  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");

  const dailyBonusMintData = {
    title: "Daily Bonus",
    subTitle: "Coming Soon",
    img: dailyBonus,
  };

  const newBetaEvent = {
    title: "Dypius",
    logo: dypius,
    eventStatus: "Coming Soon",
    totalRewards: "$50,000 in BNB Rewards",
    myEarnings: 0.0,
    eventType: "Explore & Mine",
    eventDate: "Coming Soon",
    backgroundImage: upcomingDyp,
    popupInfo: {
      title: "Dypius",
      chain: "BNB Chain",
      linkState: "dypius",
      rewards: "BNB",
      status: "Coming Soon",
      id: "event5",
      eventType: "Explore & Mine",
      totalRewards: "$50,000 in BNB Rewards",
      eventDuration: dypiusLastDay,
      minRewards: "25",
      maxRewards: "50",
      learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
      eventDate: "Coming Soon",
    },
  };

  // if (dypEvent && dypEvent[0]) {
  //   const userEarnedDyp =
  //     dypEvent[0].reward.earn.total /
  //     dypEvent[0].reward.earn.multiplier;
  //   setDypiusEarnUsd(dyptokenDatabnb * userEarnedDyp);
  //   setDypiusEarnTokens(userEarnedDyp);
  // }

  const dailyBonusData = {
    eventType: "6 Available Rewards",
    title: "Daily Bonus",
    chain: "BNB Chain, opBNB Chain",
    linkState: "conflux",
    status: "Live",
    id: "event10",
    totalRewards: "$2,000 in CFX Rewards",
    eventDate: "Dec 1, 2023",
  };

  const dragonData = {
    title: "Dragon Ruins",
    image: "newDragon.png",
    benefits: [
      "Ability to fight a special creature",
      "A chance to win an unique CAWS NFT",
      "Score multiplier",
    ],
    price: 150,
    usdPrice: 3.75,
    link: "https://www.worldofdypians.com/news/644a3089aa4deb26fe4dac90/Dragon-Ruins-Event",
    background: "newDragonBg.webp",
    mobileBackground: "dragonBgMobile.webp",
  };

  const iDypPackageData = {
    title: "Puzzle Madness",
    image: "newPuzzleMadness.png",
    benefits: [
      "Enhance your puzzle-solving skills",
      "Ability to earn high value rewards",
      "Compete against other players on the leaderboard",
    ],
    price: 12600,
    usdPrice: 6.3,
    link: "https://www.worldofdypians.com/news/644ce83e7f931ac9706b515e/Puzzle-Madness-Event",
    background: "newPuzzleBg.webp",
    mobileBackground: "puzzleBgMobile.webp",
  };
  const dypPackageData = {
    title: "Golden Pass",
    image: "newGoldenPass.png",
    benefits: [
      "Double your rewards",
      "Compete and climb higher in the rankings",
      "Unlock unique rewards during the event",
    ],
    price: 2100,
    usdPrice: 50,
    link: "https://www.worldofdypians.com/news/644e343627cca74b2d4a60b1/Golden-Pass-Event",
    background: "newGoldenBg.webp",
    mobileBackground: "goldenBgMobile.webp",
  };

  const criticalHitPackageData = {
    title: "Critical Hit",
    image: "newCriticalHit.png",
    benefits: [
      "Exclusive access for Genesis Land NFT owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: 700,
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
    background: "newCriticalBg.webp",
    mobileBackground: "criticalBgMobile.webp",
  };
  const betaPassPackageData = {
    title: "Beta Pass",
    image: "betaPassDummy.png",
    benefits: [
      "Exclusive access for Beta Pass owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: 220,
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
    background: "newCriticalBg.webp",
    mobileBackground: "criticalBgMobile.webp",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );

      const bal1 = await contract1.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    }
  };

  const onOpenPopup = (item) => {
    setPopup(true);
    setPackagePopup(item);
  };
  const onClosePopup = () => {
    setPopup(false);
    setPackagePopup("");
  };

  

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Events";
    // getTokenDatabnb();
  }, []);

  useEffect(() => {
    if (windowSize.width < 786) {
      window.scrollTo(0, 750);
    }
  }, [selectedPackage]);

  const html = document.querySelector("html");
  const bgmenu = document.querySelector("#bgmenu");
  useEffect(() => {
    if (popup === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [popup]);

  useEffect(() => {
    if (eventId === "dragon-ruins") {
      setSelectedPackage("dragon");
    } else if (eventId === "golden-pass") {
      setSelectedPackage("dyp");
    } else if (eventId === "puzzle-madness") {
      setSelectedPackage("idyp");
    } else if (eventId === "critical-hit") {
      setSelectedPackage("criticalHit");
    } else if (eventId === "betapass") {
      setSelectedPackage("betaPass");
    } else if (eventId === "treasure-hunt") {
      setSelectedPackage("treasure-hunt");
    } else if (eventId === "daily-bonus") {
      setSelectedPackage("daily-bonus");
    }
  }, [eventId, activeTab]);

  useEffect(() => {
    setActiveTab(tabState);
  }, [window.location.href]);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-lg-5 pt-lg-5 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <ProfileSidebar />}

        <div
          className="container-nft align-items-start justify-content-start d-flex flex-column gap-2 px-3 px-lg-5 my-4"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0">
            <div className={`col-12 col-lg-12`}>
              <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
                Event
                <span style={{ color: "#8c56ff" }}> Center</span>
              </h6>
              <div className="d-flex flex-column">
                <div className="d-flex w-100 align-items-center justify-content-center gap-4">
                  <div className="position-relative">
                    <div className="new-upcoming-tag d-flex align-items-center justify-content-center px-1">
                      <span className="mb-0">New</span>
                    </div>
                    <NavLink
                      to={`/marketplace/events/treasure-hunt`}
                      className={({ isActive }) =>
                        isActive
                          ? "new-stake-tab stake-tab-active px-3 py-2"
                          : "new-stake-tab px-3 py-2"
                      }
                    >
                      Live
                    </NavLink>
                  </div>
                  <div className="position-relative">
                    <NavLink
                      to={"/marketplace/events/upcoming"}
                      className={({ isActive }) =>
                        isActive
                          ? "new-stake-tab stake-tab-active px-3 py-2"
                          : "new-stake-tab px-3 py-2"
                      }
                    >
                      Upcoming
                    </NavLink>
                  </div>

                  <NavLink
                    to={"/marketplace/events/past"}
                    className={({ isActive }) =>
                      isActive
                        ? "new-stake-tab stake-tab-active px-3 py-2"
                        : "new-stake-tab px-3 py-2"
                    }
                  >
                    Past
                  </NavLink>
                </div>
                <span className="w-100 new-stake-divider mt-3 mb-5"></span>
              </div>

              {activeTab === "live" && (
                <>
                  <div className="d-flex justify-content-center">
                    <div className="new-packages-grid mb-3">
                      <NavLink to="/marketplace/events/treasure-hunt">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "treasure-hunt" &&
                              eventId === "treasure-hunt" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("treasure-hunt")}
                          >
                            <img
                              src={require("./assets/treasure.jpg")}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Treasure Hunt
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/dragon-ruins">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "dragon" &&
                              eventId === "dragon-ruins" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("dragon")}
                          >
                            <img
                              src={dragonPackage}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Dragon Ruins
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/golden-pass">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "dyp" &&
                              eventId === "golden-pass" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("dyp")}
                          >
                            <img
                              src={goldenPass}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Golden Pass
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/puzzle-madness">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "idyp" &&
                              eventId === "puzzle-madness" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("idyp")}
                          >
                            <img
                              src={puzzleMadness}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Puzzle Madness
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/critical-hit">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "criticalHit" &&
                              eventId === "critical-hit" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("criticalHit")}
                          >
                            <img
                              src={criticalHit}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Critical Hit
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div id="selected-package" ref={selected}>
                    {selectedPackage === "treasure-hunt" ? (
                      <div className="col-xxl-9 col-xl-10 m-auto d-flex flex-column gap-4">
                        {dummyBetaPassData2.slice(0, 6).map((item, index) => (
                          <BetaEventCard
                            data={item}
                            key={index}
                            onOpenPopup={() => {
                              setEventPopup(true);
                              setDummyEvent(item.popupInfo);
                            }}
                            userEarnUsd={
                               item.title === "Manta"
                                ? mantaEarnUsd
                                : item.title === "Taiko"
                                ? taikoEarnUsd
                                : item.title === "Cookie3"
                                ? cookieEarnUsd
                                : item.title === "Matchain"
                                ? matEarnUsd
                                : 0
                            }
                          />
                        ))}
                      </div>
                    ) : selectedPackage === "daily-bonus" ? (
                      <div className="col-xxl-9 col-xl-10 m-auto d-flex flex-column gap-4">
                        <div
                          className=" border-0 upcoming-mint-wrapper upcoming-daily-bonus d-flex flex-column flex-lg-row align-items-center justify-content-between px-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => setDailyBonusPopup(true)}
                        >
                          <div className="d-flex flex-column gap-2 ps-3 pe-3 pt-3 pb-3 pb-lg-0">
                            <h6 className="upcoming-mint-title">Daily Bonus</h6>
                            <p className="upcoming-mint-desc mb-0">
                              Claim chests daily for a chance to win Game
                              Points, exclusive NFTs, and exciting rewards!
                              Don't miss out on your daily dose of gaming
                              treasures.
                            </p>
                            <span className="mb-2 events-page-details d-none d-lg-flex align-items-center gap-2">
                              Details
                              <img src={eventsArrow} alt="" />
                            </span>
                          </div>

                          <img
                            src={upcomingDailyBonus}
                            alt=""
                            className="upcoming-mint-img"
                          />
                        </div>
                      </div>
                    ) : (
                      <NewBundleCard
                        onOpenPopup={onOpenPopup}
                        coinbase={account}
                        wallet={data?.getPlayer?.wallet?.publicAddress}
                        chainId={chainId}
                        getDypBalance={getDypBalance}
                        getiDypBalance={getDypBalance}
                        dyptokenDatabnb={dyptokenDatabnb}
                        dyptokenDatabnb_old={dyptokenDatabnb_old}
                        idyptokenDatabnb={idyptokenDatabnb}
                        packageData={
                          selectedPackage === "dragon"
                            ? dragonData
                            : selectedPackage === "dyp"
                            ? dypPackageData
                            : selectedPackage === "criticalHit"
                            ? criticalHitPackageData
                            : selectedPackage === "betaPass"
                            ? betaPassPackageData
                            : iDypPackageData
                        }
                        handleSetAvailableTime={(value) => {
                          setAvailableTime(value);
                          handleAvailableTime(value);
                        }}
                        availableTime={availableTime}
                        dyptokenData_old={dyptokenData_old}
                        binanceW3WProvider={binanceW3WProvider}
                      />
                    )}
                  </div>
                </>
              )}
              {activeTab === "upcoming" && (
                <div className="d-flex flex-column gap-4">
                  {/* <div className="border-0 upcoming-mint-wrapper upcoming-taiko-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Taiko</h6>
                      <p className="upcoming-mint-desc">
                        Join the Taiko Treasure Hunt event for a chance to grab
                        a share of the $20,000 TAIKO reward pool.
                      </p>
                    </div>
                    <img
                      src={taikoBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={taikoMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}
                  {/* <div className="border-0 upcoming-mint-wrapper upcoming-manta-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Manta</h6>
                      <p className="upcoming-mint-desc">
                        Join the Manta Treasure Hunt event for a chance to grab
                        a share of the $20,000 MANTA reward pool.
                      </p>
                    </div>
                    <img
                      src={mantaBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={mantaMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}
                  {/* <div className="border-0 upcoming-mint-wrapper upcoming-immutable-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Immutable</h6>
                      <p className="upcoming-mint-desc">
                        Join the Immutable Treasure Hunt event for a chance to grab
                        a share of the $20,000 IMX reward pool.
                      </p>
                    </div>
                    <img
                      src={immutableBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={immutableMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}

                  <div className="border-0 upcoming-mint-wrapper upcoming-skale-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Skale</h6>
                      <p className="upcoming-mint-desc">
                        Join the Skale Treasure Hunt event for a chance to grab
                        a share of the $20,000 SKL reward pool.
                      </p>
                    </div>
                    <img
                      src={upcomingSkale}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={upcomingSkaleMobile}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>
                  <div className="border-0 upcoming-mint-wrapper upcoming-skale-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Matchain</h6>
                      <p className="upcoming-mint-desc">
                        Join the Matchain Treasure Hunt event for a chance to grab
                        a share of the $20,000 BNB reward pool.
                      </p>
                    </div>
                    <img
                      src={upcomingSkale}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={upcomingSkaleMobile}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>

                  {/* <div className="border-0 upcoming-mint-wrapper upcoming-cookie-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Cookie3</h6>
                      <p className="upcoming-mint-desc">
                        Join the Cookie3 Treasure Hunt event for a chance to
                        grab a share of the $20,000 COOKIE reward pool.
                      </p>
                    </div>
                    <img
                      src={upcomingCookie}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={upcomingCookieMobile}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}
                  <div className="border-0 upcoming-mint-wrapper upcoming-midle-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Midle</h6>
                      <p className="upcoming-mint-desc">
                        Join the Midle Treasure Hunt event for a chance to grab
                        a share of the $20,000 reward pool.
                      </p>
                    </div>
                    <img
                      src={upcomingMidle}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={upcomingMidleMobile}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>

                  <div className="border-0 upcoming-mint-wrapper upcoming-multivers-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">MultiversX</h6>
                      <p className="upcoming-mint-desc">
                        Join the MultiversX Treasure Hunt event for a chance to
                        grab a share of the $20,000 ELGD reward pool.
                      </p>
                    </div>
                    <img
                      src={multiversBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={multiversMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>
                  <div className="border-0 upcoming-mint-wrapper upcoming-sei-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">SEI</h6>
                      <p className="upcoming-mint-desc">
                        Join the SEI Treasure Hunt event for a chance to grab a
                        share of the $20,000 SEI reward pool.
                      </p>
                    </div>
                    <img
                      src={seiBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={seiMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>
                </div>
              )}
              {activeTab === "past" && (
                // <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                //   <div className="d-flex flex-column align-items-center gap-2">
                //     <h6 className="upcoming-stake">
                //       There are no previous events!
                //     </h6>
                //   </div>
                // </div>
                // <div className="col-xxl-9 col-xl-10 m-auto d-flex flex-column gap-4">
                //   {dummyBetaPassData2
                //     .slice(5, dummyBetaPassData2.length)
                //     .map((item, index) => (
                //       <BetaEventCard
                //         data={item}
                //         key={index}
                //         onOpenPopup={() => {
                //           setEventPopup(true);
                //           setDummyEvent(item.popupInfo);
                //         }}
                //         activeTab={item.activeTab}
                //         userEarnUsd={
                //           item.title === "Base"
                //             ? baseEarnUSD
                //             : item.title === "Dogecoin"
                //             ? dogeEarnUSD
                //             : item.title === "Conflux"
                //             ? confluxEarnUSD
                //             : item.title === "CoinGecko"
                //             ? userEarnUsd
                //             : item.title === "Gate.io"
                //             ? gateEarnUSD
                //             : item.title === "Dypius"
                //             ? dypiusEarnTokens
                //             : item.title === "BNB Chain"
                //             ? bnbEarnUsd
                //             : item.title === "Dypius Premium"
                //             ? dypiusPremiumEarnUsd
                //             : item.title === "CoinMarketCap"
                //             ? cmcuserEarnUsd
                //             : item.title === "SKALE"
                //             ? skaleEarnUsd
                //             : item.title === "CORE"
                //             ? coreEarnUsd
                //             : item.title === "Viciton"
                //             ? victionEarnUsd
                //             : 0
                //         }
                //       />
                //     ))}
                // </div>
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setPopup(false);
          setPackagePopup("");
        }}
      >
        {popup && packagePopup === "dragon" && (
          <DragonPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "goldenpass" && (
          <GoldenPassPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "puzzlemadness" && (
          <PuzzleMadnessPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "criticalhit" && (
          <CriticalHitPopup onClosePopup={onClosePopup} />
        )}
      </OutsideClickHandler>

      {dailyBonusPopup && (
        <OutsideClickHandler onOutsideClick={() => setDailyBonusPopup(false)}>
          <DailyBonusModal
            data={dailyBonusData}
            onClose={() => setDailyBonusPopup(false)}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default MarketEvents;
