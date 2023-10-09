import React, { useState, useEffect, useRef } from "react";
import BundleCard from "../Account/src/Components/BundleCard/BundleCard";
import { ERC20_ABI } from "../Account/src/web3/abis";
import Web3 from "web3";
import classes from "../Account/src/Containers/Dashboard/Dashboard.module.css";
import dypius from "../Account/src/Images/userProfile/dypius.svg";
import dragonIcon from "../Account/src/Images/userProfile/dragonIcon.svg";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "../Account/src/Containers/Dashboard/Dashboard.schema";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { NavLink, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import criticalHit from "../Marketplace/MarketNFTs/assets/criticalHit2.webp";
import goldenPass from "../Marketplace/MarketNFTs/assets/goldenPass.webp";
import puzzleMadness from "../Account/src/Components/BundleCard/assets/puzzleMadness2.webp";
import dragonPackage from "../Account/src/Components/BundleCard/assets/dragonPackageIcon2.webp";
import NewBundleCard from "../Account/src/Components/BundleCard/NewBundleCard";
import conflux from "../Account/src/Components/WalletBalance/assets/conflux.svg";
import gate from "../Account/src/Components/WalletBalance/assets/gate.svg";

import coin98 from "../Account/src/Components/WalletBalance/assets/coin98.svg";
import coingecko from "../Account/src/Components/WalletBalance/assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
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
import baseUpcoming from "./assets/baseUpcoming.png";
import avaxUpcoming from "./assets/avaxUpcoming.png";
import infoIcon from "./assets/infoIcon.svg";
import liveDot from "./assets/liveDot.svg";
import eventsArrow from "./assets/eventsArrow.svg";
import whitePickaxe from "./assets/whitePickAxe.svg";
import whiteCalendar from "./assets/whiteCalendar.svg";
import BetaEventCard from "./components/BetaEventCard";
import eventPopupImage from "../Account/src/Components/WalletBalance/assets/eventPopupImage.png";
import gatePopupImage from "../Account/src/Components/WalletBalance/assets/gatePopupImage.png";
import eventPopupImageAvax from "../Account/src/Components/WalletBalance/assets/eventPopupImageAvax.png";
import eventPopupImageGecko from "../Account/src/Components/WalletBalance/assets/eventPopupImageGecko.png";
import eventPopupImageBase from "../Account/src/Components/WalletBalance/assets/eventPopupImageBase.png";


import grayDollar from "../Account/src/Components/WalletBalance/assets/grayDollar.svg";
import closeMark from "../Account/src/Components/WalletBalance/assets/closeMark.svg";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import axios from "axios";
import Countdown from "react-countdown";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import { useAuth } from "../Account/src/Utils.js/Auth/AuthDetails";
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
  idyptokenDatabnb,
  handleAvailableTime,
  remainingTime,
  tabState,
}) => {
  const location = useLocation();
  const windowSize = useWindowSize();
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();

  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [selectedPackage, setSelectedPackage] = useState(
    location.state?.package ? location.state?.package : "dragon"
  );
  const [popup, setPopup] = useState(false);
  const [packagePopup, setPackagePopup] = useState("");
  const [activeTab, setActiveTab] = useState("live");
  const { eventId } = useParams();
  const [dummyEvent, setDummyEvent] = useState();
  const [eventPopup, setEventPopup] = useState(false);
  const [userPoints, setuserPoints] = useState(0);
  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnETH, setuserEarnETH] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);
  const [confluxUserPoints, setConfluxUserPoints] = useState(0);
  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnCFX, setConfluxEarnCFX] = useState(0);

  const selected = useRef(null);
  const { email } = useAuth();
  const dummyBetaPassData = [
    {
      title: "Conflux (CFX)",
      logo: conflux,
      eventStatus: "Live",
      totalRewards: "$5,000 in CFX Rewards",
      myEarnings: 120.45,
      eventType: "Explore & Mine",
      eventDate: "Ends in 28 days",
      backgroundImage: confluxUpcoming,
      popupInfo: {
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Live",
        id: "event1",
        learnMore:
          "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
    {
      title: "Coin98 (C98)",
      logo: coin98,
      eventStatus: "Coming Soon",
      totalRewards: "$5,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "April, 1, 2024",
      backgroundImage: coin98Upcoming,
      popupInfo: {
        title: "Coin98 Pass",
        chain: "BNB Chain",
        linkState: "coin98",
        rewards: "BNB",
        status: "Coming Soon",
        id: "event2",
      },
    },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Expired",
      totalRewards: "$5,000 in BNB Rewards",
      myEarnings: 120.0,
      eventType: "Explore & Mine",
      eventDate: "Expired",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Coming Soon",
        id: "event3",
        learnMore:
          "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Expired",
      totalRewards: "$5,000 in BASE Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "Expired",
      backgroundImage: baseUpcoming,
      popupInfo: {
        title: "Base Pass",
        chain: "BNB Chain",
        linkState: "base",
        rewards: "BASE",
        status: "Expired",
        id: "event4",
      },
    },
  ];

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
      });
  };

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");

  const dummyBetaPassData2 = [
    // {
    //   title: "Avalanche",
    //   logo: avaxLogo,
    //   eventStatus: "Coming Soon",
    //   totalRewards: "$3,000 in AVAX Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Mine",
    //   eventDate: "September xx, 2023",
    //   backgroundImage: avaxUpcoming,
    //   popupInfo: {
    //     title: "Avalanche",
    //     chain: "Avalanche",
    //     linkState: "coingecko",
    //     rewards: "AVAX",
    //     status: "Coming Soon",
    //     id: "event5",
    //   eventType: "Explore & Mine",

    //   },
    // },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Live",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "September 25, 2023",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Live",
        id: "event3",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in BNB Rewards",
        eventDuration: coingeckoLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      },
    },
    {
      title: "Conflux",
      logo: conflux,
      eventStatus: "Live",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "October 06, 2023",
      backgroundImage: confluxUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Live",
        id: "event1",
        totalRewards: "$2,000 in CFX Rewards",
        eventDuration: confluxLastDay,
        eventDate: "October 06, 2023",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore:
          "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
    // {
    //   title: "Gate.io",
    //   logo: gate,
    //   eventStatus: "Coming Soon",
    //   totalRewards: "$3,000 in GT Rewards",
    //   myEarnings: 0,
    //   eventType: "Explore & Mine",
    //   eventDate: "October 20, 2023",
    //   backgroundImage: gateUpcoming,
    //   popupInfo: {
    //     eventType: "Explore & Mine",
    //     title: "Gate.io",
    //     chain: "BNB Chain",
    //     linkState: "gate",
    //     rewards: "GT",
    //     status: "Coming Soon",
    //     id: "event6",
    //     totalRewards: "$3,000 in GT Rewards",
    //     eventDuration: gateLastDay,
    //     eventDate: "October 20, 2023",
    //     minRewards: "1",
    //     maxRewards: "20",
    //     minPoints: "5,000",
    //     maxPoints: "50,000",
    //   },
    // },
    {
      title: "Base",
      logo: base,
      eventStatus: "Coming Soon",
      totalRewards: "$5,000 in ETH Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "Coming Soon",
      backgroundImage: baseUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Network",
        linkState: "base",
        rewards: "BASE",
        status: "Coming Soon",
        id: "event4",
        totalRewards: "$5,000 in ETH Rewards",
        eventDuration: gateLastDay,
        eventDate: "Coming Soon",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
      },
    },
  ];

  const dragonData = {
    title: "Dragon Ruins",
    image: "newDragon.png",
    benefits: [
      "Ability to fight a special creature",
      "A chance to win an unique CAWS NFT",
      "Score multiplier",
    ],
    price: 150,
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

  const fetchCFXPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=conflux-token&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["conflux-token"] && obj.data["conflux-token"] !== NaN) {
          setCfxPrice(obj.data["conflux-token"].usd);
        }
      });
  };

  useEffect(() => {
    fetchCFXPrice();
  }, []);

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify({
            email: email,
            publicAddress: userAddress,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.events) {
          const coingeckoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coingecko";
          });
          const confluxEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "conflux";
          });

          const points = coingeckoEvent[0].reward.earn.totalPoints;
          setuserPoints(points);

          const usdValue =
            coingeckoEvent[0].reward.earn.total /
            coingeckoEvent[0].reward.earn.multiplier;
          setuserEarnUsd(usdValue);
          if (bnbPrice !== 0) {
            setuserEarnETH(usdValue / bnbPrice);
          }

          const cfxPoints = confluxEvent[0].reward.earn.totalPoints;
          setConfluxUserPoints(cfxPoints);

          if (confluxEvent[0].reward.earn.multiplier !== 0) {
            const cfxUsdValue =
              confluxEvent[0].reward.earn.total /
              confluxEvent[0].reward.earn.multiplier;
            setConfluxEarnUSD(cfxUsdValue);

            if (cfxPrice !== 0) {
              setConfluxEarnCFX(cfxUsdValue / cfxPrice);
            }
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Events";
  }, []);

  useEffect(() => {
    getTokenDatabnb();
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
    } else if (eventId === "puzzle-maddness") {
      setSelectedPackage("idyp");
    } else if (eventId === "critical-hit") {
      setSelectedPackage("criticalHit");
    } else if (eventId === "betapass") {
      setSelectedPackage("betaPass");
    } else if (eventId === "treasure-hunt") {
      setSelectedPackage("treasure-hunt");
    }
  }, []);

  useEffect(() => {
    if (
      email &&
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress
    ) {
      fetchTreasureHuntData(email, data.getPlayer.wallet.publicAddress);
    }
  }, [email, data, cfxPrice, bnbPrice]);

  useEffect(() => {
    setActiveTab(tabState);
  }, [window.location.href]);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

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
                  <div className="new-upcoming-tag d-flex align-items-center justify-content-center px-1">
                      <span className="mb-0">New</span>
                    </div>
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
                        {dummyBetaPassData2.slice(0, 2).map((item, index) => (
                          <BetaEventCard
                            data={item}
                            key={index}
                            onOpenPopup={() => {
                              setEventPopup(true);
                              setDummyEvent(item.popupInfo);
                            }}
                            userEarnUsd={
                              item.title === "Conflux"
                                ? confluxEarnUSD
                                : userEarnUsd
                            }
                          />
                        ))}
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
                      />
                    )}
                  </div>
                </>
              )}
              {activeTab === "upcoming" && (
                // <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                //   <div className="d-flex flex-column align-items-center gap-2">
                //     <h6 className="upcoming-stake">New events are coming...</h6>
                //     <span className="upcoming-stake-desc">
                //       Check back soon!
                //     </span>
                //   </div>
                // </div>

                <div className="col-xxl-9 col-xl-10 m-auto d-flex flex-column gap-4">
                  {dummyBetaPassData2.slice(2, 4).map((item, index) => (
                    <BetaEventCard
                      data={item}
                      key={index}
                      onOpenPopup={() => {
                        setEventPopup(true);
                        setDummyEvent(item.popupInfo);
                      }}
                      userEarnUsd={userEarnUsd}
                    />
                  ))}
                </div>
                // <BetaPassEvents />
              )}
              {activeTab === "past" && (
                <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <h6 className="upcoming-stake">
                      There are no previous events!
                    </h6>
                  </div>
                </div>
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
      {eventPopup && (
        <OutsideClickHandler onOutsideClick={() => setEventPopup(false)}>
          <div className="profile-event-popup p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <h6 className="event-popup-title mb-0">{dummyEvent?.title}</h6>
                <div
                  className={`${
                    dummyEvent?.status === "Live"
                      ? "event-popup-status-live"
                      : dummyEvent?.status === "Coming Soon"
                      ? "event-popup-status-upcoming"
                      : "event-popup-status-expired"
                  }  d-flex align-items-center justify-content-center p-1`}
                >
                  {dummyEvent.status === "Live" && (
                    <div
                      class="pulsatingDot"
                      style={{ width: 7, height: 7, marginRight: 5 }}
                    ></div>
                  )}
                  <span className="mb-0">{dummyEvent?.status}</span>
                </div>
              </div>
              <img
                src={closeMark}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => setEventPopup(false)}
              />
            </div>
            <div className="profile-event-popup-wrapper mb-3 p-2 p-lg-3 h-auto">
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
                <div className="d-flex gap-2">
                  <img
                    src={
                      dummyEvent?.chain === "Avalanche"
                        ? eventPopupImageAvax
                        : dummyEvent?.linkState === "coingecko"
                        ? eventPopupImageGecko
                        : dummyEvent.linkState === "gate"
                        ? gatePopupImage
                        : dummyEvent.linkState === "base"
                        ? eventPopupImageBase
                        : eventPopupImage
                    }
                    alt=""
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <h6 className="popup-second-title m-0">
                        {dummyEvent?.title}
                      </h6>
                      <span className="popup-rewards">
                        {dummyEvent?.totalRewards}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="event-popup-chain mb-0">
                        Gameplay: {dummyEvent?.eventType}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="event-popup-chain mb-0">
                        Chain: {dummyEvent?.chain}
                      </span>
                    </div>
                  </div>
                </div>
                {dummyEvent?.status === "Live" && (
                  <Countdown
                    renderer={renderer}
                    date={dummyEvent.eventDuration}
                  />
                )}
                {dummyEvent?.status !== "Live" && dummyEvent.id !== 'event4' && (
                  <div className="d-flex flex-column">
                    <span className="live-on">Live on</span>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          require("../Account/src/Components/WalletBalance/assets/greenCalendar.svg")
                            .default
                        }
                        className="green-calendar"
                        alt=""
                      />
                      <h6 className="live-on-date mb-0">
                        {dummyEvent.eventDate}
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="how-it-works mb-0">How it works?</h6>
              {dummyEvent.status === "Live" && (
                <NavLink
                  to={dummyEvent.learnMore}
                  className="events-page-details d-flex align-items-center gap-2"
                >
                  Learn more
                  <img src={eventsArrow} alt="" />
                </NavLink>
              )}
            </div>
            <div className="row mb-3 gap-3 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="profile-event-popup-wrapper p-3">
                  <h6 className="popup-green-text">Details</h6>
                  {dummyEvent.id === "event1" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Conflux Beta Pass NFT</b>. You can get the
                      Conflux Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Conflux area, players not only stand a
                      chance to secure daily rewards in CFX, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Conflux area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event2" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Coin98 Beta Pass NFT</b>. You can get the Coin98
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Coin98 area, players not only stand a chance to secure
                      daily rewards in C98, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the Coin98 area to uncover
                      hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event3" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a CoinGecko Beta Pass NFT</b>. You can get the
                      CoinGecko Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the CoinGecko area, players not only stand a
                      chance to secure daily rewards in BNB, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      CoinGecko area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event5" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold an Avalanche Beta Pass NFT</b>. You can get the
                      Avalanche Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Avalanche area, players not only stand a
                      chance to secure daily rewards in AVAX, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Avalanche area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event6" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Gate Beta Pass NFT</b>. You can get the Gate
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Gate.io area, players not only stand a chance to secure
                      daily rewards in GT, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the Gate.io area to
                      uncover hidden treasures.
                    </p>
                  ) : (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Base Beta Pass NFT</b>. You can get the Base
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Base area, players not only stand a chance to secure daily
                      rewards in ETH, but also earn points for their placement
                      on the global leaderboard. Remember to log in to the game
                      daily and venture into the Base area to uncover hidden
                      treasures.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="profile-event-popup-wrapper p-3">
                  <h6 className="popup-green-text">Benefits</h6>
                  <ul>
                    <li className="popup-event-desc">Exclusive Event Access</li>
                    <>
                      <li className="popup-event-desc">
                        Daily Rewards range from ${dummyEvent.minRewards} to $
                        {dummyEvent.maxRewards}
                      </li>
                      <li className="popup-event-desc">
                        Daily Points range from {dummyEvent.minPoints} to{" "}
                        {dummyEvent.maxPoints}
                      </li>
                    </>

                    <li className="popup-event-desc">
                      Earn{" "}
                      {dummyEvent.id === "event1"
                        ? "CFX"
                        : dummyEvent.id === "event2"
                        ? "C98"
                        : dummyEvent.id === "event3"
                        ? "BNB"
                        : dummyEvent.id === "event5"
                        ? "AVAX"
                        : dummyEvent.id === "event6"
                        ? "GT"
                        : "ETH"}{" "}
                      rewards
                    </li>
                    <li className="popup-event-desc">
                      Get global leaderboard points
                    </li>
                    <li className="popup-event-desc">Community Engagement</li>
                    <li className="popup-event-desc">Exploration Adventures</li>
                  </ul>
                </div>
              </div>
            </div>
            <h6 className="how-it-works">
              Learn more about{" "}
              {dummyEvent.id === "event1"
                ? "Conflux Network"
                : dummyEvent.id === "event2"
                ? "Coin98"
                : dummyEvent.id === "event3"
                ? "CoinGecko"
                : dummyEvent.id === "event5"
                ? "Avalanche"
                : dummyEvent.id === "event6"
                ? "Gate.io"
                : "Base Network"}
            </h6>
            {dummyEvent.id === "event1" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Conflux Network stands as a Layer 1 public blockchain solution,
                uniquely blending the advantages of both public and private
                blockchains within its hybrid architecture. It aims to establish
                a diverse multi-chain ecosystem, fostering seamless global
                connectivity for creators, communities, and markets across
                different borders and protocols.
              </p>
            ) : dummyEvent.id === "event2" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Coin98 Labs is an Open Infrastructure Financial Services builder
                focusing on creating and developing an ecosystem of DeFi
                protocols, applications, NFTs on multiple blockchains. Their
                mission is to fulfill untapped demand and enhance in-demand
                utilities in the DeFi space, helping people to access DeFi
                services effortlessly.
              </p>
            ) : dummyEvent.id === "event3" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                CoinGecko is the world's largest independent cryptocurrency data
                aggregator with over 10,000+ different cryptoassets tracked
                across more than 800+ exchanges worldwide. CoinGecko provides a
                fundamental analysis of the digital currency market. In addition
                to tracking price, volume, and market capitalization, CoinGecko
                tracks community growth, open source code development, major
                events, and on-chain metrics.
              </p>
            ) : dummyEvent.id === "event5" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Avalanche is a smart contracts platform that scales infinitely
                and regularly finalizes transactions in less than one second.
                Its novel consensus protocol, Subnet infrastructure, and
                HyperSDK toolkit enable web3 developers to easily launch
                powerful, custom blockchain solutions.
              </p>
            ) : dummyEvent.id === "event6" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Gate.io is a full-service digital asset exchange platform
                covering millions of users around the world.The company prides
                itself on providing industry-leading security in addition to
                having been audited to show 100% proof of reserves. Gate.io
                operates in most countries across the world, and is always
                committed to complying with the applicable laws where it
                operates.
              </p>
            ) : (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Base is built as an Ethereum L2, with the security, stability,
                and scalability you need to power your dapps.Base is an easy way
                for decentralized apps to leverage Coinbase's products and
                distribution. Seamless Coinbase integrations, easy fiat onramps,
                and access to the $130B assets on platform in the Coinbase
                ecosystem.
              </p>
            )}

            <div className="d-flex gap-3 align-items-center">
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://twitter.com/Conflux_Network"
                    : dummyEvent.id === "event2"
                    ? "https://twitter.com/coin98_wallet"
                    : dummyEvent.id === "event3"
                    ? "https://twitter.com/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://twitter.com/gate_io"
                    : "https://twitter.com/buildonbase"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" src={twitter} /> Twitter
              </a>

              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://t.me/Conflux_English"
                    : dummyEvent.id === "event2"
                    ? "https://t.me/coin98wallet"
                    : dummyEvent.id === "event3"
                    ? "https://t.me/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://t.me/gateio_en"
                    : "https://base.org/discord"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img
                  alt=""
                  src={dummyEvent.id !== "event4" ? telegram : discord}
                />
                {dummyEvent.id !== "event4" ? "Telegram" : "Discord"}
              </a>
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://confluxnetwork.org/"
                    : dummyEvent.id === "event2"
                    ? "https://coin98.com/"
                    : dummyEvent.id === "event3"
                    ? "https://www.coingecko.com/"
                    : dummyEvent.id === "event6"
                    ? "https://www.gate.io/"
                    : "https://base.org/"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" src={website} />
                Website
              </a>
            </div>
            <div className="summaryseparator mt-3"></div>
            <div className="popup-red-wrapper mt-3 p-3 d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row align-items-xxl-center align-items-xl-center align-items-lg-center align-items-md-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={grayDollar} width={36} height={36} alt="" />
                <span className="event-my-earnings2 mb-0">My earnings</span>
              </div>
              <div className="d-flex align-items-center gap-3 gap-lg-5 justify-content-between mt-3 mt-lg-0">
                <div className="d-flex flex-column gap-2">
                  <h6 className="mb-0 event-earnings-coin2">
                    {getFormattedNumber(
                      dummyEvent.id === "event1"
                        ? confluxUserPoints : dummyEvent.id === 'event3' ?
                         userPoints : 0,
                      0
                    )}
                  </h6>
                  <span className="mb-0 event-earnings-usd">
                    Leaderboard Points
                  </span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h6 className="mb-0 event-earnings-coin2 d-flex specialstyle-wrapper gap-1">
                    $
                    {getFormattedNumber(
                      dummyEvent.id === "event1" ? confluxEarnUSD  : dummyEvent.id === 'event3' ? userEarnUsd : 0,
                      2
                    )}
                    <span className="ethpricerewards specialstyle-wrapper-eth">
                      {getFormattedNumber(
                        dummyEvent.id === "event1"
                          ? confluxEarnCFX
                          : dummyEvent.id === 'event3' ? 
                           userEarnETH : 0,
                        2
                      )}
                      {dummyEvent.id === "event1"
                        ? "CFX"
                        : dummyEvent.id === "event2"
                        ? "C98"
                        : dummyEvent.id === "event3"
                        ? "BNB"
                        : dummyEvent.id === "event5"
                        ? "AVAX"
                        : dummyEvent.id === "event6"
                        ? "GT"
                        : "ETH"}
                    </span>
                  </h6>
                  <span className="mb-0 event-earnings-usd">Rewards</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <img src={infoIcon} alt="" />
              <span className="popup-event-desc">
                The rewards will be distributed 2-3 days after the event ends.
              </span>
            </div>
            {dummyEvent.id === "event9" && (
              <div className="w-100 d-flex justify-content-end mt-3">
                <NavLink to={`/marketplace/beta-pass/gate`}>
                  <button className="btn get-beta-btn">Get Beta Pass</button>
                </NavLink>
              </div>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default MarketEvents;
