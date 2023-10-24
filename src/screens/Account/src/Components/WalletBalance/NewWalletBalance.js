import React, { useState } from "react";
import avaxIcon from "./newAssets/avaxIcon.svg";
import ethIcon from "./newAssets/ethIcon.svg";
import bnbIcon from "./newAssets/bnbIcon.svg";
import dypIcon from "./newAssets/dypIcon.svg";
import iDypIcon from "./newAssets/iDypIcon.svg";
import genesisRankImg from "./newAssets/genesisRank.svg";
import globalRank from "./newAssets/globalRank.svg";
import rightIcon from "./newAssets/rightIcon.svg";
import premium from "./newAssets/premium.svg";
import successMark from "./newAssets/successMark.svg";
import nonPremium from "./newAssets/nonPremium.svg";
import myRewards from "./newAssets/myRewards.svg";
import "./_walletbalance.scss";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "./newAssets/xMark.svg";
import "../../../../../components/LandPopup/_landpopup.scss";
import TextField from "@mui/material/TextField";
import dailyRewards from "./newAssets/dailyRewards.png";
import dailyRewardsFinished from "./newAssets/dailyRewardsFinished.png";
import gameEvents from "./newAssets/gameEvents.png";
import readyBorder from "./newAssets/readyBorder.svg";
import styled from "styled-components";
import stakeNft from "./newAssets/stakeNft.png";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import ActiveProfileEvent from "./ActiveProfileEvent";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import UpcomingProfileEvent from "./UpcomingProfileEvent";

import conflux from "./assets/conflux.svg";
import gate from "./assets/gate.svg";

import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import gateUpcoming from "../../../../Marketplace/assets/gateUpcoming.webp";

import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "../../../../Marketplace/assets/coingeckoUpcoming.png";
import baseUpcoming from "../../../../Marketplace/assets/baseUpcoming.webp";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import grayDollar from "./assets/grayDollar.svg";
import eventsArrow from "./assets/eventsArrow.svg";
import infoIcon from "../../../../Marketplace/assets/infoIcon.svg";
import coingeckoPopupImage from "./assets/coingeckoPopupImage.png";
import eventPopupImageBase from "./assets/eventPopupImageBase.png";

import gatePopupImage from "./assets/gatePopupImage.png";
import confluxPopupImage from "./assets/eventPopupImage.png";
import Countdown from "react-countdown";
import viewAllArrow from "./assets/viewAllArrow.svg";

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
const NewWalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  email,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  userId,
  username,
  listedNFTS,
  landStaked,
  myCawsWodStakes,
  myWodWodStakes,
  myCawsCollected,
  myCawsOldCollected,
  myLandCollected,
  myTimepieceCollected,
  myBoughtNfts,
  isConnected,
  handleConnect,
  ethTokenData,
  dypTokenData,
  favoritesArray,
  latestBoughtNFTS,
  myOffers,
  allActiveOffers,
  myNFTSCoingecko,
  myGateNfts,
  myConfluxNfts,
  onDailyRewardsPopupOpen,
  onOpenLeaderboard,
  isPremium,
  onRewardsClick,
  onPremiumClick,
  onBalanceClick,
}) => {
  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");

  const dummyConflux = {
    title: "Conflux",
    chain: "Conflux Network",
    linkState: "conflux",
    rewards: "CFX",
    status: "Live",
    id: "event1",
    eventType: "Explore & Mine",
    date: "Oct 06, 2023",
    logo: conflux,
    totalRewards: "$2,000 in CFX Rewards",
    eventDuration: confluxLastDay,
    minRewards: "1",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "20,000",
    learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
  };

  const dummyGate = {
    title: "Gate.io",
    chain: "BNB Chain",
    linkState: "gate",
    rewards: "BNB",
    status: "Coming Soon",
    id: "event6",
    eventType: "Explore & Mine",
    date: "Oct 20, 2023",
    logo: gate,
    totalRewards: "$2,000 in BNB Rewards",
    eventDuration: gateLastDay,
    minRewards: "0.5",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "20,000",
  };

  const dummyCoingecko = {
    title: "CoinGecko",
    chain: "BNB Chain",
    linkState: "coingecko",
    rewards: "BNB",
    status: "Live",
    id: "event3",
    eventType: "Explore & Mine",
    date: "Sept 25, 2023",
    logo: coingecko,
    totalRewards: "$10,000 in BNB Rewards",
    eventDuration: coingeckoLastDay,
    minRewards: "1",
    maxRewards: "100",
    minPoints: "5,000",
    maxPoints: "50,000",
    learnMore: "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
  };
  const dummyCoin98 = {
    title: "Coin98 Pass",
    chain: "BNB Chain",
    linkState: "coin98",
    rewards: "BNB",
    status: "Expired",
    id: "event2",
    eventType: "Explore & Mine",
  };
  const dummyBase = {
    eventType: "Explore & Mine",
    title: "Base",
    chain: "Base Chain",
    linkState: "base",
    rewards: "ETH",
    status: "Coming Soon",
    id: "event4",
    date: "Coming Soon",
    totalRewards: "$5,000 in ETH Rewards",
    eventDuration: gateLastDay,
    backgroundImage: baseUpcoming,
    logo: base,
    date: "Coming Soon",
    minRewards: "0.5",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "30,000",
  };

  const dummyBetaPassData = [
    {
      title: "Conflux (CFX)",
      logo: conflux,
      eventStatus: "Live",
      totalRewards: "$2,000 in CFX Rewards",
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
        eventType: "Explore & Mine",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
      },
    },
    {
      title: "Coin98 (C98)",
      logo: coin98,
      eventStatus: "Coming Soon",
      totalRewards: "$3,000 in BNB Rewards",
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
        eventType: "Explore & Mine",
      },
    },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Upcoming",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 120.0,
      eventType: "Explore & Mine",
      eventDate: "11/09/2023",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Upcoming",
        id: "event3",
        eventType: "Explore & Mine",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Expired",
      totalRewards: "$3,000 in BASE Rewards",
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
        eventType: "Explore & Mine",
      },
    },
  ];

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
        learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
    {
      title: "Gate.io",
      logo: gate,
      eventStatus: "Coming Soon",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "October 20, 2023",
      backgroundImage: gateUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "GT",
        status: "Coming Soon",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "October 20, 2023",
        date: "Oct 20, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
      },
    },
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
        chain: "Base Chain",
        linkState: "base",
        rewards: "ETH",
        status: "Coming Soon",
        id: "event4",
        date: "Coming Soon",
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

  const [dummyEvent, setDummyEvent] = useState({});
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [eventPopup, setEventPopup] = useState(false);

  const [userRank, setUserRank] = useState("N/A");
  const [genesisRank, setGenesisRank] = useState("N/A");
  const [records, setRecords] = useState([]);
  const [activeSlide, setActiveSlide] = useState();
  const [showNext, setShowNext] = useState();
  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [specialRewardsPopup, setSpecialRewardsPopup] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [finished, setFinished] = useState(false);
  const html = document.querySelector("html");
  const windowSize = useWindowSize();

  const openEvents = () => {
    setShowAllEvents(!showAllEvents);
  };

  const validateUrl = (url) => {
    let errors = {};
    let regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let match = url.match(regex);

    if (!match) {
      errors.url = "URL is not valid";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setErrors(validateUrl(mediaUrl));
    if (Object.keys(validateUrl(mediaUrl)).length === 0) {
      const data = {
        email: email,
        url: mediaUrl,
        walletAddress: address,
      };

      if (email !== "" && mediaUrl !== "" && address !== "") {
        const send = await axios
          .post("https://api.worldofdypians.com/api/new-submission", data)
          .then(function (result) {
            console.log(result.data);
            setSuccess(result.data.message);
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (specialRewardsPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [specialRewardsPopup]);

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
        setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDataavax = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setDypTokenDataAvax(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar-2",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowNext(current);
    },
    afterChange: (current) => {
      setActiveSlide(current);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
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

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecords(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setUserRank(testArray[0].position);
    }
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };

    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setGenesisRank(testArray[0].position);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDatabnb();
    getTokenDataavax();
  }, []);

  return (
    <>
      <div className="container px-0">
        <div className="row gap-3 gap-lg-0 mx-0">
          <div className="col-12 rankings-outer-wrapper px-0 pe-lg-3 col-lg-4 position-relative">
            <div className="nft-outer-wrapper2 rankings-wrapper px-4 py-3  d-flex flex-column gap-2 position-relative custom-height-2 ">
              <h6
                className="profile-div-title mb-0"
                // style={{ fontSize: '14px'}}
              >
                Special Events
              </h6>{" "}
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyCoingecko);
                  setEventPopup(true);
                }}
                data={dummyCoingecko}
                event={dummyCoingecko}
                userEmail={email}
                userWallet={address}
              />
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyConflux);
                  setEventPopup(true);
                }}
                data={dummyConflux}
                event={dummyConflux}
                userEmail={email}
                userWallet={address}
              />
              <UpcomingProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyGate);
                  setEventPopup(true);
                }}
                data={dummyGate}
              />
              {/* <img
                src={eventSkeleton}
                className="profile-event-item"
                style={{
                  background: "none",
                  borderBottom: "none",
                  transform: "translateX(0px)",
                }}
                alt=""
              /> */}
              {/* <img
                src={eventSkeleton}
                className="profile-event-item"
                style={{
                  background: "none",
                  borderBottom: "none",
                  transform: "translateX(0px)",
                }}
                alt=""
              /> */}
              {/* <div className="d-flex w-100 justify-content-center">
                <span className="seller-addr">Special events comming soon</span>
                </div> */}
              {dummyBetaPassData2.length > 3 && (
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openEvents()}
                  style={{
                    cursor: "pointer",
                    width: "fit-content",
                    position: "absolute",
                    bottom: windowSize.width > 650 ? "15px" : "5px",
                    left: windowSize.width > 650 ? "43%" : "43%",
                  }}
                >
                  <span className="account-view-all">
                    {showAllEvents ? "View Less" : "View All"}
                  </span>
                  <img
                    src={viewAllArrow}
                    style={{ rotate: showAllEvents ? "0deg" : "180deg" }}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          {/* <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-2">
              <div
                className="purple-container position-relative p-3 d-flex align-items-center justify-content-between"
                onClick={onOpenLeaderboard}
                style={{ cursor: "pointer" }}
              >
                <div className="green-div"></div>
                <div
                  className="d-flex flex-column justify-content-between"
                  style={{ height: "90px" }}
                >
                  <h6 className="profile-div-title mb-0">
                    Leaderboard Rankings
                  </h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">View</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
               
              </div>
              <div className="purple-container p-3 position-relative d-flex flex-column gap-3" onClick={onBalanceClick} >
                <div className="green-div"></div>

                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0 profile-div-title">My Balance</h6>
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="profile-div-chain mb-0"
                      style={{
                        color:
                          activeSlide === 0
                            ? "#5871D2"
                            : activeSlide === 1
                            ? "#D9A908"
                            : "#DF2C2D",
                      }}
                    >
                      {activeSlide === 0
                        ? "Ethereum Network"
                        : activeSlide === 1
                        ? "BNB Chain"
                        : "Avalanche Network"}
                    </span>
                    <img
                      src={
                        activeSlide === 0
                          ? ethIcon
                          : activeSlide === 1
                          ? bnbIcon
                          : avaxIcon
                      }
                      width={12}
                      height={12}
                      alt=""
                    />
                  </div>
                </div>
                <Slider {...settings}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalance, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${getFormattedNumber(dypBalance * dyptokenData, 2)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalance, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${getFormattedNumber(idypBalance * idyptokenData, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalancebnb, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalancebnb, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(
                          idypBalancebnb * idyptokenDatabnb,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalanceavax, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${" "}
                        {getFormattedNumber(
                          dypBalanceavax * dyptokenDataAvax,
                          2
                        )}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalanceavax, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(
                          idypBalanceavax * idyptokenDataAvax,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </Slider>
              </div>
              {!isPremium ? (
                <div
                  className="red-container position-relative p-3 d-flex align-items-center justify-content-between"
                  onClick={onPremiumClick}
                >
                  <div className="green-div"></div>
                  <div className="d-flex flex-column gap-4">
                    <h6 className="profile-div-title mb-0">
                      Upgrade to Premium
                    </h6>
                    <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">Subscribe</span>
                      <img src={rightIcon} alt="" />
                    </div>
                  </div>
                  <img src={nonPremium} alt="" />
                </div>
              ) : (
                <div className="premium-active-container position-relative p-3 d-flex align-items-center justify-content-between">
                  <div className="green-div"></div>

                  <div className="d-flex flex-column gap-2">
                    <h6 className="profile-div-title mb-0">Premium Member</h6>
                    <div className="d-flex align-items-center gap-2 col-7 ">
                      <div
                        className={` 
                          wallet-wrapper-active-premium d-flex
                            d-flex wallet-wrapper align-items-center gap-2 position-relative`}
                      >
                        <img src={walletIcon} alt="" className="wallet-icon" />

                        <div className="d-flex flex-column">
                          <span className="wallet-span d-flex align-items-center gap-2">
                            Wallet address
                          </span>

                          <div className="d-flex align-items-center gap-2">
                            <span className="wallet-address">
                              {shortAddress(address)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={premium} alt="" className="premium-img" />
                </div>
              )}
            </div>
          </div> */}
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-between gap-3 pe-0 gap-lg-0">
            <div className="row gap-3 gap-lg-0">
              <div className="col-12 col-lg-4">
                <div
                  className="daily-bonus-wrapper"
                  onClick={onDailyRewardsPopupOpen}
                >
                  <div className="green-div"></div>
                  <img
                    src={finished ? dailyRewardsFinished : dailyRewards}
                    className={`${finished ? "daily-rewards-img-finished" : "daily-rewards-img"}`}
                    alt=""
                  />
                  <div className="progress-bar-group d-flex align-items-center gap-3">
                    <div className="green-progress-outer">
                      <span className="font-iceland mb-0 chest-progress">
                        10/10
                      </span>
                      <div
                        className="green-progress-inner"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <div className="yellow-progress-outer">
                      <span className="font-iceland mb-0 chest-progress">
                        10/10
                      </span>
                      <div
                        className="yellow-progress-inner"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0">Daily Bonus</h6>

                    <div className="d-flex flex-column">
                      <div
                        className="position-relative"
                        style={{ width: "96px", height: "40px", right: "10px" }}
                      >
                        <span className="ready-to-claim mb-0">
                          {finished ? "Time" : "Ready to Claim"}
                        </span>
                        <img
                          src={readyBorder}
                          alt=""
                          className={`${
                            finished ? "ready-border-2" : "ready-border"
                          }`}
                        />
                      </div>
                      {finished && (
                        <span className="timer-text mb-0">21h : 12m</span>
                      )}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <NavLink
                  to="/marketplace/events/treasure-hunt"
                  className="game-events-wrapper d-flex"
                >
                  <div className="green-div"></div>
                  <img src={gameEvents} className="game-events-img" alt="" />
                  <div className="d-flex flex-column gap-3 h-100 p-3">
                    <h6 className="profile-div-title mb-0">Live Events</h6>
                    <p className="profile-div-desc mb-0">
                      Experience excitement by different on-chain events
                    </p>
                    {/* <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">View</span>
                      <img src={rightIcon} alt="" />
                    </div> */}
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-lg-4">
                <NavLink
                  to={"/marketplace/stake"}
                  className="profile-staking-wrapper d-flex"
                >
                  <div className="green-div"></div>
                  <img src={stakeNft} alt="" className="profile-staking-img" />
                  <div className="d-flex flex-column gap-3 h-100 p-3">
                    <h6 className="profile-div-title mb-0">Stake NFT</h6>
                    <p className="profile-div-desc mb-0">
                      Earn $ETH daily rewards by staking your NFTs
                    </p>

                    {/* <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">Stake Now</span>
                      <img src={rightIcon} alt="" />
                    </div> */}
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="row gap-3 gap-lg-0">
              <div className="col-12 col-lg-8" onClick={onRewardsClick}>
                <div className="my-rewards-wrapper">
                  <div className="green-div"></div>

                  <div className="my-total-rewards-wrapper d-flex flex-column align-items-center.gap-2">
                    <h6 className="my-total-rewards mb-0 font-iceland">
                      $435.25
                    </h6>
                    <span className="my-total-earned mb-0 font-iceland">
                      Total Earned
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0 ">My Rewards</h6>
                    <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">View All</span>
                      <img src={rightIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  className="special-rewards-wrapper"
                  onClick={() => setSpecialRewardsPopup(true)}
                >
                  <div className="green-div"></div>

                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0">
                      Special <br /> Rewards
                    </h6>
                    <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">Submit</span>
                      <img src={rightIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {specialRewardsPopup && (
        <OutsideClickHandler
          onOutsideClick={() => setSpecialRewardsPopup(false)}
        >
          <div
            className="popup-wrapper popup-active p-3"
            style={{ width: "30%", pointerEvents: "auto" }}
          >
            {success === "Email sent successfully" ? (
              <>
                <div className="d-flex align-items-center justify-content-end w-100 mb-4">
                  <img
                    src={xMark}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSpecialRewardsPopup(false)}
                    alt=""
                  />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
                  <h6 className="rewards-success-title font-organetto">
                    Successfully
                  </h6>
                  <h6
                    className="rewards-success-title font-organetto"
                    style={{ color: "#8C56FF" }}
                  >
                    Applied
                  </h6>
                </div>
                <div className="d-flex w-100 justify-content-center mb-4">
                  <img src={successMark} alt="" />
                </div>
                <div className="d-flex w-100 justify-content-center">
                  <p
                    className="popup-paragraph w-50"
                    style={{ textAlign: "center" }}
                  >
                    Congratulations, your Special Reward application request is
                    submitted. Please check back soon when our team reviews your
                    application.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between w-100 mb-4">
                  <h6 className="popup-title-2 mb-0">Special Rewards</h6>
                  <img
                    src={xMark}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSpecialRewardsPopup(false)}
                    alt=""
                  />
                </div>
                <p className="popup-paragraph">
                  The Special Rewards program is designed to recognize and
                  reward players for sharing their World of Dypians gameplay
                  content on various social media platforms, including X
                  (formerly Twitter), Instagram, TikTok, YouTube, Facebook,
                  Reddit, and more.
                </p>
                <p className="popup-paragraph mb-4">
                  Eligible posts may include high-quality videos and images. To
                  apply for these special rewards, simply enter the post URL in
                  the field below. The WoD Team will review your content and
                  determine the reward, which is distributed in BNB on a monthly
                  basis.
                </p>
                <div className="d-flex align-items-center gap-4 mb-4">
                  <StyledTextField
                    error={errors?.url ? true : false}
                    size="small"
                    label="URL"
                    id="email"
                    name="email"
                    value={mediaUrl}
                    helperText={errors?.url}
                    required
                    onChange={(e) => {
                      setMediaUrl(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <div
                    className={`${
                      !email || !address
                        ? "linear-border-disabled"
                        : "linear-border"
                    }`}
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <button
                      className={`btn ${
                        !email || !address
                          ? "outline-btn-disabled"
                          : "filled-btn"
                      } px-5`}
                      onClick={handleSubmit}
                      disabled={!email || !address ? true : false}
                    >
                      {loading ? (
                        <div
                          class="spinner-border text-light spinner-border-sm"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                </div>
                <hr className="linear-divider" />
                <div className="d-flex align-items-center justify-content-between">
                  <span className="my-special-rewards mb-0">My Rewards</span>
                  <h6 className="my-special-rewards-value mb-0">$12</h6>
                </div>
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default NewWalletBalance;

// Email sent successfully
