import React, { useEffect, useState } from "react";
import "./_community.scss";
import testBanner from "./assets/testBanner.png";
import calendar from "./assets/calendar.svg";
import entryCampaign from "./assets/entryCampaign.webp";
import bnbExpedition from "./assets/bnbExpedition.webp";
import dailyGameDelight from "./assets/dailyGameDelight.webp";
import dypiansDiscovery from "./assets/dypiansDiscovery.webp";
import { NavLink, useNavigate } from "react-router-dom";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import dypius from "../Account/src/Components/WalletBalance/assets/dypIcon.svg";
import base from "../Account/src/Components/WalletBalance/assets/baseLogo.svg";
import coingecko from "../Account/src/Components/WalletBalance/assets/coingecko.svg";
import skaleLogo from "../Account/src/Components/WalletBalance/assets/skaleLogo.svg";
import bnblogo from "../Account/src/Components/WalletBalance/assets/bnblogo.svg";
import immutableLogo from "../Account/src/Components/WalletBalance/assets/immutableLogo.svg";


import gate from "../Account/src/Components/WalletBalance/assets/gate.svg";
import conflux from "../Account/src/Components/WalletBalance/assets/conflux.svg";
import upcomingDyp2 from "../Account/src/Components/WalletBalance/assets/dypiuspopup2.png";
import cmc from "../Marketplace/MarketNFTs/assets/cmc.svg";
import doge from "../Marketplace/MarketNFTs/assets/dogeLogo.svg";
import ActiveProfileEvent from "../Account/src/Components/WalletBalance/ActiveProfileEvent";
import ExpiredProfileEvent from "../Account/src/Components/WalletBalance/ExpiredProfileEvent";
import discord from "./assets/discord.png";
import youtube from "./assets/youtube.png";
import twitter from "./assets/twitter.png";
import telegram from "./assets/telegram.png";
import criticalHit from "../Marketplace/MarketNFTs/assets/criticalHit2.webp";
import goldenPass from "../Marketplace/MarketNFTs/assets/goldenPass.webp";
import puzzleMadness from "../Account/src/Components/BundleCard/assets/puzzleMadness2.webp";
import dragonPackage from "../Account/src/Components/BundleCard/assets/dragonPackageIcon2.webp";
import OutsideClickHandler from "react-outside-click-handler";
import newsletterIcon from "../../assets/newsAssets/newsletterIcon.svg";
import newsLetterImage from "../../assets/newsAssets/newsLetterImage.svg";
import modalClose from "../../assets/newsAssets/modalClose.svg";
import newsLetterModal from "../../assets/newsAssets/newsLetterModal.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { TextField, Tooltip, tooltipClasses } from "@mui/material";
import axios from "axios";
import validateEmail from "../../hooks/validateEmail";
import Countdown from "react-countdown";
import epicblack from "../../assets/epicblack.svg";
import victionLogo from "../Home/VideoWrapper/assets/victionLogo.svg";
import victionBg from "../Home/VideoWrapper/assets/victionBg.webp";
import coreLogo from "../Home/VideoWrapper/assets/coreLogo.svg";
import coreBg from "../Home/VideoWrapper/assets/coreBg.webp";
import opbnbCampaign from './assets/opbnbCampaign.png'
import wodFestive from './assets/wodfestive.webp'


const theme = createTheme({
  palette: {
    primary: {
      main: "#080b2a",
    },
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#080B2A",
    fontWeight: 400,
    fontFamily: "Poppins",
  },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "100px !important",
    fontSize: "14px",
  },
}));

const Community = ({socials}) => {
  const [active, setActive] = useState(true);
  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setError(validateEmail(email));
    if (Object.keys(validateEmail(email)).length === 0) {
      const postEmail = {
        email: email,
      };

      if (email !== "") {
        axios
          .post("https://api3.dyp.finance/api/newsletter/insert", postEmail)
          .then((result) => {
            if (result.data.status === 1) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError({ email: result.data.message });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };



  const navigate = useNavigate();

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2024-02-01T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dogeLastDay = new Date("2024-03-21T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");
  let skaleLastDay = new Date("2024-07-14T13:00:00.000+02:00");
  let bnbLastDay = new Date("2024-09-10T13:00:00.000+02:00");
  let coreLastDay = new Date("2024-10-01T14:00:00.000+02:00");
  let immutableLastDay = new Date("2024-11-13T14:00:00.000+02:00");




  let activeDay = new Date("2024-05-01T11:35:00.000+02:00");

  const dummyBetaPassData2 = [
    {
      title: "CORE",
      logo: coreLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      backgroundImage: coreBg,
      eventDate: "Jul 01, 2024",
      date: "Jul 01, 2024",
      eventDuration: coreLastDay,

      popupInfo: {
        title: "CORE",
        chain: "CORE Chain",
        linkState: "core",
        rewards: "CORE",
        status: "Live",
        backgroundImage: coreBg,
        logo: coreLogo,
        date: "Jul 01, 2024",

        id: "event12",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in CORE Rewards",
        eventDuration: coreLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Jul 01, 2024",
      },
    },
    {
      title: "VICTION",
      logo: victionLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in VIC Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Jul 01, 2024",
      date: "Jul 01, 2024",
      backgroundImage: victionBg,
      eventDuration: coreLastDay,

      popupInfo: {
        title: "VICTION",
        chain: "VICTION Chain",
        linkState: "viction",
        rewards: "VIC",
        status: "Live",
        logo: victionLogo,
        backgroundImage: victionBg,
        date: "Jul 01, 2024",

        id: "event14",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in VIC Rewards",
        eventDuration: coreLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Jul 01, 2024",
      },
    },
    {
      title: "BNB Chain",
      logo: bnblogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventDuration: bnbLastDay,
      eventType: "Explore & Mine",
      eventDate: "Apr 15, 2024",
      date: "Apr 15, 2024",
      // backgroundImage: upcomingSkale,
      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "chain",
        rewards: "BNB",
        status: "Live",
        id: "event14",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: bnbLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Apr 15, 2024",
      },
    },
    {
      title: "Immutable",
      logo: immutableLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in IMX Rewards",
      myEarnings: 0.0,
      eventDuration: immutableLastDay,
      eventType: "Explore & Mine",
      eventDate: "Aug 15, 2024",
      date: "Aug 15, 2024",
      // backgroundImage: upcomingSkale,
      popupInfo: {
        title: "Immutable",
        chain: "Immutable",
        linkState: "chain",
        rewards: "IMX",
        status: "Live",
        id: "event15",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in IMX Rewards",
        eventDuration: immutableLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Aug 15, 2024",
      },
    },
    {
      title: "SKALE",
      logo: skaleLogo,
      eventStatus: "Expired",
      totalRewards: "$20,000 in SKL Rewards",
      myEarnings: 0.0,
      eventDuration: skaleLastDay,
      eventType: "Explore & Mine",
      eventDate: "Apr 15, 2024",
      date: "Apr 15, 2024",
      // backgroundImage: upcomingSkale,
      popupInfo: {
        title: "SKALE",
        chain: "SKALE Nebula Hub",
        linkState: "skale",
        rewards: "SKL",
        status: "Expired",
        id: "event11",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SKL Rewards",
        eventDuration: skaleLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Apr 15, 2024",
      },
    },
   
    {
      title: "Dypius Premium",
      logo: dypius,
      eventStatus: "Expired",
      totalRewards: "$50,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Feb 26, 2024",
      date: "Feb 26, 2024",
      backgroundImage: upcomingDyp2,
      eventDuration: dypius2LastDay,
      activeTab: "dypiusv2",
      popupInfo: {
        title: "Dypius Premium",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "BNB",
        status: "Expired",
        id: "event9",
        eventType: "Explore & Find",
        totalRewards: "$50,000 in BNB Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "Feb 26, 2024",
        activeTab: "dypiusv2",
      },
    },
    {
      title: "CMC",
      logo: cmc,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
      eventDuration: cmcLastDay,
      // backgroundImage: upcomingCmc,
      popupInfo: {
        title: "CoinMarketCap",
        chain: "BNB Chain",
        linkState: "coinmarketcap",
        rewards: "BNB",
        status: "Expired",
        id: "event8",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: cmcLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        eventDate: "Dec 26, 2023",
        learnMore:
          "/news/658ae3cc148c5ffee9c4ffa7/CoinMarketCap-Treasure-Hunt-Event",
      },
    },
    {
      title: "Dogecoin",
      chain: "BNB Chain",
      linkState: "doge",
      rewards: "DOGE",
      status: "Expired",
      eventStatus: "Expired",
      id: "event7",

      eventType: "Explore & Mine",
      date: "Dec 22, 2023",
      eventDate: "Dec 22, 2023",
      logo: doge,
      totalRewards: "$10,000 in DOGE Rewards",
      eventDuration: dogeLastDay,
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore: "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
      popupInfo: {
        title: "Dogecoin",
        chain: "BNB Chain",
        linkState: "doge",
        rewards: "DOGE",
        status: "Expired",
        id: "event7",
        eventStatus: "Expired",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in DOGE Rewards",
        eventDuration: dogeLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "Dec 22, 2023",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Expired",
      totalRewards: "$10,000 in ETH Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "Nov 01, 2023",
      eventDuration: baseLastDay,

      // backgroundImage: baseUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Chain",
        linkState: "base",
        rewards: "ETH",
        status: "Expired",
        id: "event4",
        date: "Nov 01, 2023",
        totalRewards: "$10,000 in ETH Rewards",
        eventDuration: baseLastDay,
        eventDate: "Nov 01, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore: "/news/65422043b3f3545e95018290/Base-Treasure-Hunt-Event",
      },
    },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Expired",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      eventDuration: coingeckoLastDay,

      // backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Expired",
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
      title: "Dypius",
      logo: dypius,
      eventStatus: "Expired",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Ended",
      eventDuration: dypiusLastDay,

      // backgroundImage: upcomingDyp,
      popupInfo: {
        title: "Dypius",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "DYP",
        status: "Expired",
        id: "event5",
        eventType: "Explore & Find",
        totalRewards: "300,000 in DYPv2 Rewards",
        eventDuration: dypiusLastDay,
        minRewards: "25",
        maxRewards: "50",
        learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
        eventDate: "Ended",
      },
    },
    {
      title: "Gate.io",
      logo: gate,
      eventStatus: "Expired",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      eventDuration: gateLastDay,

      // backgroundImage: gateUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "GT",
        status: "Expired",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "Ended",
        date: "Oct 20, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/653290f5b3f3545e9500f557/Gate-Treasure-Hunt-Event",
      },
    },
    {
      title: "Conflux",
      logo: conflux,
      eventStatus: "Expired",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      eventDuration: confluxLastDay,

      // backgroundImage: confluxUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Expired",
        id: "event1",
        totalRewards: "$2,000 in CFX Rewards",
        eventDuration: confluxLastDay,
        eventDate: "Ended",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
  ];

  const dummyData = [

    {
      title: "Dypians Global Challenge",
      status: "Expired",
      start_date: "July 24, 2024",
      end_date: "August 14, 2024",
      image: opbnbCampaign,
      link: "https://dappbay.bnbchain.org/campaign/train-like-a-champion-with-bnb-chain-and-share-$250K/11",
    },
    {
      title: "BNB Chain Game Expedition",
      status: "Expired",
      start_date: "June 12, 2024",
      end_date: "June 28, 2024",
      image: bnbExpedition,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/105-bnb-chain-game-expedition",
    },
    {
      title: "Entry Campaign",
      status: "Expired",
      start_date: "May 1, 2024",
      end_date: "May 15, 2024",
      image: entryCampaign,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/102-world-of-dypians-entry-campaign",
    },
    {
      title: "Daily Game Delight",
      status: "Expired",
      start_date: "May 15, 2024",
      end_date: "May 29, 2024",
      image: dailyGameDelight,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/103-daily-game-delight",
    },
    {
      title: "Dypians Discovery Quest",
      status: "Expired",
      start_date: "May 29, 2024",
      end_date: "June 12, 2024",
      image: dypiansDiscovery,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/104-dypians-discovery-quest",
    },
  ];

  const dummyBanner2 = {
    title: "BNB Chain Game Expedition",
    status: "Expired",
    desc: "Join the World of Dypians (WoD) Dypians Discovery Quest Campaign from May 29 to June 12 for a chance to win a share of the 200,000 WOD Tokens & 750 Premium Subscription prize pool! World of Dypians (WoD) is a revolutionary MMORPG available on Epic Games in a Closed Beta version, set in a connected virtual world, featuring advanced AI, stunning graphics, and immersive gameplay.",
    start_date: "June 12, 2024",
    end_date: "June 28, 2024",
    image: bnbExpedition,
    link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/105-bnb-chain-game-expedition",
  };
  const dummyBanner =  {
    title: "Festive 4YA Celebration",
    status: "Upcoming",
    start_date: "August 26, 2024",
    end_date: "September 8, 2024",
    image: wodFestive,
    desc: `Join the Festive 4YA Celebration campaign and immerse yourself in a series of exciting tasks to celebrate the BNB Chain 4 Year Anniversary. Show your dedication and skill by completing the following:
    <ul class="mt-2">
    <li>Login or Create a Game Account: Get started by logging in or creating a new game account in the World of Dypians.</li>
    <li>Open at Least 10 Daily Bonus Chests: Test your luck and consistency by opening at least 10 Daily Bonus Chests on BNB Chain or opBNB.</li>
    </ul>`,
    // link: "https://dappbay.bnbchain.org/campaign/train-like-a-champion-with-bnb-chain-and-share-$250K/11"
  }

  const html = document.querySelector("html");

  useEffect(() => {
    if (success === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [success]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Community";
  }, []);

  return (
    <>
      <div className="container-fluid d-flex px-0 align-items-center justify-content-center pt-5">
        <div className=" px-0 w-100 d-flex flex-column">
          <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5 mt-5 mt-lg-0">
            <div className="col-12 col-lg-4 mb-5">
              <h6 className="community-title">
                <mark
                  className="community-title"
                  style={{ color: "#eebf06", background: "none" }}
                >
                  Community
                </mark>{" "}
                Campaigns
              </h6>
            </div>
            <div className="col-12 col-lg-8 mb-5">
              <div className="community-active-banner d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-6">
                  <img
                    src={dummyBanner.image}
                    className="w-100 community-active-image"
                    alt=""
                  />
                </div>
                <div className="community-active-info col-12 col-lg-6 p-3 d-flex flex-column justify-content-between gap-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="community-active-title mb-0">
                      {dummyBanner.title}
                    </h6>
                    <div
                      className={`position-relative ${
                        dummyBanner.status === "Live"
                          ? "events-page-status-tag-live"
                          : dummyBanner.status === "Upcoming"
                          ? "events-page-status-tag-upcoming"
                          : "events-page-status-tag-expired"
                      }
                 px-2 d-flex align-items-center justify-content-center gap-0`}
                      style={{ top: 0 }}
                    >
                      {dummyBanner.status === "Live" && (
                        <div
                          className="pulsatingDot"
                          style={{ width: 7, height: 7, marginRight: 5 }}
                        ></div>
                      )}
                      <span>{dummyBanner.status}</span>
                    </div>
                  </div>
                  <p className="community-card-desc" dangerouslySetInnerHTML={{__html: dummyBanner.desc}}></p>

                  <div className="d-flex flex-column align-items-start gap-3 justify-content-between">
                    {dummyBanner.link &&
                    <div
                      className="linear-border"
                      style={{ width: "fit-content" }}
                    >
                      <a
                        className="btn filled-btn px-5"
                        href={dummyBanner.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explore
                      </a>
                    </div>
 }
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <span className="community-card-date">Duration:</span>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center gap-1">
                          <img src={calendar} width={16} height={16} alt="" />
                          <span className="community-card-date">
                            {dummyBanner.start_date}
                          </span>
                        </div>
                        <span className="community-card-date">-</span>
                        <div className="d-flex align-items-center gap-1">
                          <img src={calendar} width={16} height={16} alt="" />
                          <span className="community-card-date">
                            {dummyBanner.end_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="community-items-grid">
              {dummyData.slice(0, 3).map((item, index) =>
                item.status === "Expired" ? (
                  <a href={item.link} target="_blank">
                    <div
                      key={index}
                      className="community-item-card d-flex flex-column gap-2 p-3"
                    >
                      <div className="w-100 h-100 banner-holder overflow-hidden">
                        <img
                          src={item.image}
                          className="community-card-banner"
                          alt=""
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="community-card-title">{item.title}</div>
                        <div
                          className={`position-relative ${
                            item.status === "Live"
                              ? "events-page-status-tag-live"
                              : item.status === "Upcoming"
                              ? "events-page-status-tag-upcoming"
                              : "events-page-status-tag-expired"
                          }
             px-2 d-flex align-items-center justify-content-center gap-0`}
                          style={{ top: 0 }}
                        >
                          {item.status === "Live" && (
                            <div
                              className="pulsatingDot"
                              style={{ width: 7, height: 7, marginRight: 5 }}
                            ></div>
                          )}
                          <span>{item.status}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="community-card-date">Duration:</span>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center gap-1">
                            <img src={calendar} width={16} height={16} alt="" />
                            <span className="community-card-date">
                              {item.start_date}
                            </span>
                          </div>
                          <span className="community-card-date">-</span>
                          <div className="d-flex align-items-center gap-1">
                            <img src={calendar} width={16} height={16} alt="" />
                            <span className="community-card-date">
                              {item.end_date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <HtmlTooltip
                    enterTouchDelay={0}
                    enterDelay={0}
                    placement="top"
                    title={
                      <span className="card-eth-chain-text d-flex align-items-center justify-content-center">
                        {item.status === "Expired" ? "Expired" : "Coming Soon"}
                      </span>
                    }
                  >
                    <div
                      key={index}
                      className="community-item-card d-flex flex-column gap-2 p-3"
                    >
                      <div className="w-100 h-100 banner-holder overflow-hidden">
                        <img
                          src={item.image}
                          className="community-card-banner"
                          alt=""
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="community-card-title">{item.title}</div>
                        <div
                          className={`position-relative ${
                            item.status === "Live"
                              ? "events-page-status-tag-live"
                              : item.status === "Upcoming"
                              ? "events-page-status-tag-upcoming"
                              : "events-page-status-tag-expired"
                          }
           px-2 d-flex align-items-center justify-content-center gap-0`}
                          style={{ top: 0 }}
                        >
                          {item.status === "Live" && (
                            <div
                              className="pulsatingDot"
                              style={{ width: 7, height: 7, marginRight: 5 }}
                            ></div>
                          )}
                          <span>{item.status}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="community-card-date">Duration:</span>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center gap-1">
                            <img src={calendar} width={16} height={16} alt="" />
                            <span className="community-card-date">
                              {item.start_date}
                            </span>
                          </div>
                          <span className="community-card-date">-</span>
                          <div className="d-flex align-items-center gap-1">
                            <img src={calendar} width={16} height={16} alt="" />
                            <span className="community-card-date">
                              {item.end_date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HtmlTooltip>
                )
              )}
            </div>
            <div className="col-12 col-lg-6 mt-5">
              <h6 className="community-title">Join Our Community</h6>
              <div className="community-item-card d-flex align-items-center justify-content-center  position-relative secondary-card p-3">
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ position: "absolute", top: "4%", left: "4%" }}
                >
                  <h6 className="community-active-title mb-0">
                  Monthly Players:
                  </h6>
                  <h6
                    className="community-active-title mb-0"
                    style={{ color: "#d9fa86" }}
                  >
                    565,251
                  </h6>
                </div>
                <div className="row w-100 mt-5 mt-lg-0">
                  <a
                    href="https://discord.gg/worldofdypians"
                    target="_blank"
                    className="col-12 col-lg-6 mb-3"
                  >
                    <div className="d-flex flex-column align-items-center gap-1">
                      <img
                        src={discord}
                        className="community-social-img"
                        alt=""
                      />
                      <span className="follower-amount">{getFormattedNumber(socials?.discordMembers,0)}+</span>
                      <span className="follower-type">Members</span>
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/@Dypius"
                    target="_blank"
                    className="col-12 col-lg-6 mb-3"
                  >
                    <div className="d-flex flex-column align-items-center gap-1">
                      <img
                        src={youtube}
                        className="community-social-img"
                        alt=""
                      />
                      <span className="follower-amount">{getFormattedNumber(socials?.youtubeSubscribers,0)}+</span>
                      <span className="follower-type">Subscribers</span>
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/worldofdypians"
                    target="_blank"
                    className="col-12 col-lg-6 mb-3"
                  >
                    <div className="d-flex flex-column align-items-center gap-1">
                      <img
                        src={twitter}
                        className="community-social-img"
                        alt=""
                      />
                      <span className="follower-amount">{getFormattedNumber(socials?.twitterFollowers,0)}+</span>
                      <span className="follower-type">Followers</span>
                    </div>
                  </a>
                  <a
                    href="https://t.me/worldofdypians"
                    target="_blank"
                    className="col-12 col-lg-6 mb-3"
                  >
                    <div className="d-flex flex-column align-items-center gap-1">
                      <img
                        src={telegram}
                        className="community-social-img"
                        alt=""
                      />
                      <span className="follower-amount">{getFormattedNumber(socials?.telegramMembers,0)}+</span>
                      <span className="follower-type">Members</span>
                    </div>
                  </a>
                  <div className="col-12 col-lg-6 epic-games-community mb-3 mt-3 mt-lg-0 d-flex flex-column align-items-center gap-3 justify-content-center">
                    <a
                      href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                      target="_blank"
                    >
                      <img
                        src={
                          require("../../assets/footerIcons/epicgames.svg")
                            .default
                        }
                        width={109}
                        height={109}
                        alt=""
                      />
                    </a>
                    <div className="opacitywrapper5 download-filled-btn m-0 px-3">
                      <a
                        className="game-event-download d-flex align-items-center gap-2"
                        href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                        target="_blank"
                      >
                        <img src={epicblack} alt="icon" className="epicgame2" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-5">
              <h6 className="community-title">Our Events</h6>
              <div className="community-item-card d-flex align-items-center justify-content-center  position-relative secondary-card h-100">
                <div
                  className="d-flex align-items-center w-100"
                  style={{ position: "absolute", top: 0 }}
                >
                  <div
                    className={`community-status-btn community-card-title w-50 p-3 d-flex align-items-center justify-content-center gap-2 ${
                      active ? "community-status-active" : ""
                    }  `}
                    onClick={() => setActive(true)}
                  >
                    <div
                      className="pulsatingDot"
                      style={{ width: 7, height: 7, marginRight: 5 }}
                    ></div>
                    Live
                  </div>
                  <div
                    className={`community-status-btn community-card-title w-50 p-3 d-flex align-items-center justify-content-center ${
                      !active ? "community-status-active" : ""
                    }  `}
                    onClick={() => setActive(false)}
                  >
                    Past
                  </div>
                </div>
                {active ? (
                  <div className="w-100 d-flex flex-column justify-content-between mt-5">
                    <div className="new-packages-grid community-packages-grid mt-3 mt-lg-0 w-100">
                      <NavLink to="/marketplace/events/dragon-ruins">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
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
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
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
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
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
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
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
                    <h6 className="community-title ms-3 mb-0 mt-3">
                      Treasure Hunt
                    </h6>
                    <div className="community-events-grid w-100 p-3">
                      {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                        <ActiveProfileEvent
                          onOpenEvent={() => {
                            navigate("/marketplace/events/treasure-hunt");
                          }}
                          data={item}
                          event={item}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="community-events-grid mt-5  w-100 p-3">
                    {dummyBetaPassData2
                      .slice(4, dummyBetaPassData2.length)
                      .map((item, index) => (
                        <ExpiredProfileEvent
                          onOpenEvent={() => {
                            navigate("/marketplace/events/past");
                          }}
                          data={item}
                          event={item}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div
                className="newsletter-wrapper d-flex mb-5 p-3"
                style={{ marginTop: 80 }}
              >
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-column gap-3">
                    <img
                      src={newsletterIcon}
                      width={56}
                      height={56}
                      alt="newsletter icon"
                    />
                    <h3 className="newsletter-title font-organetto">
                      Subscribe to our{" "}
                      <h3
                        className="newsletter-title font-organetto"
                        style={{ color: "#8c56ff" }}
                      >
                        newsletter
                      </h3>
                    </h3>
                    <p className="newsletter-content">
                      Stay up-to-date with our latest news, amazing features,
                      and exciting events delivered straight to your inbox.
                    </p>
                    <div className="d-flex flex-column flex-lg-row align-items-start justify-content-start gap-3 gap-lg-5">
                      <div className="newsletter-input-container">
                        <ThemeProvider theme={theme}>
                          <StyledTextField
                            style={{ width: "100%" }}
                            error={error.email ? true : false}
                            label="Email Address"
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            helperText={error.email}
                          />
                        </ThemeProvider>
                      </div>
                      <button
                        className="btn filled-btn px-5"
                        style={{ background: "black", color: "white" }}
                        onClick={subscribe}
                      >
                        Register
                      </button>
                    </div>
                    <span className="newsletter-span">
                      By submitting this form, you are consenting to receive
                      marketing emails from Dypius. You may unsubscribe at
                      anytime.
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
                  <img src={newsLetterImage} alt="newsletter" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {success && (
        <OutsideClickHandler onOutsideClick={() => setSuccess(false)}>
          <div className="success-modal d-flex flex-column p-3 justify-content-center align-items-center gap-4">
            <div className="d-flex w-100 justify-content-end">
              <img
                src={modalClose}
                alt="close modal"
                onClick={() => setSuccess(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img src={newsLetterModal} alt="success" />
            <h6 className="newsletter-modal-title font-poppins">Thank you</h6>
            <span className="newsletter-modal-span font-poppins">
              You’ve subscribed to World of Dypians newsletter
            </span>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default Community;
