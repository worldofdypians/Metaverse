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

import grayDollar from "../Account/src/Components/WalletBalance/assets/grayDollar.svg";
import closeMark from "../Account/src/Components/WalletBalance/assets/closeMark.svg";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import upcomingDailyBonus from "./assets/upcomingDailyBonus.png";
import upcomingDoge from "./assets/upcomingDoge.webp";
import upcomingSkale from "./assets/upcomingSkale.webp";
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
    location.state?.package ? location.state?.package : "treasure-hunt"
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
  const [cmcuserPoints, setcmcuserPoints] = useState(0);
  const [cmcuserEarnUsd, setcmcuserEarnUsd] = useState(0);
  const [cmcuserEarnETH, setcmcuserEarnETH] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);
  const [confluxUserPoints, setConfluxUserPoints] = useState(0);
  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnCFX, setConfluxEarnCFX] = useState(0);
  const [gateUserPoints, setGateUserPoints] = useState(0);
  const [gateEarnUSD, setGateEarnUSD] = useState(0);
  const [gateEarnBNB, setGateEarnBNB] = useState(0);

  const [dogeUserPoints, setDogeUserPoints] = useState(0);
  const [dogeEarnUSD, setDogeEarnUSD] = useState(0);
  const [dogeEarnBNB, setDogeEarnBNB] = useState(0);

  const [baseUserPoints, setBaseUserPoints] = useState(0);
  const [baseEarnUSD, setBaseEarnUSD] = useState(0);
  const [baseEarnETH, setBaseEarnETH] = useState(0);
  const [dypiusEarnTokens, setDypiusEarnTokens] = useState(0);
  const [dypiusEarnUsd, setDypiusEarnUsd] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);
  const [dypiusPremiumEarnTokens, setdypiusPremiumEarnTokens] = useState(0);
  const [dypiusPremiumEarnUsd, setdypiusPremiumEarnUsd] = useState(0);
  const [dypiusPremiumPoints, setdypiusPremiumPoints] = useState(0);
  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [skaleEarnToken, setSkaleEarnToken] = useState(0);
  const [bnbEarnToken, setBnbEarnToken] = useState(0);
  const [bnbEarnUsd, setBnbEarnUsd] = useState(0);
  const [bnbPoints, setBnbPoints] = useState(0);
  const [skalePoints, setSkalePoints] = useState(0);
  const [dailyBonusPopup, setDailyBonusPopup] = useState(false);
  const [coreEarnUsd, setCoreEarnUsd] = useState(0);
  const [corePrice, setCorePrice] = useState(0);
  const [coreEarnToken, setCoreEarnToken] = useState(0);
  const [corePoints, setCorePoints] = useState(0);
  const [victionEarnUsd, setVictionEarnUsd] = useState(0);
  const [victionPrice, setVictionPrice] = useState(0);
  const [victionEarnToken, setVictionEarnToken] = useState(0);
  const [victionPoints, setVictionPoints] = useState(0);

  const [multiversEarnUsd, setmultiversEarnUsd] = useState(0);
  const [multiversPrice, setmultiversPrice] = useState(0);
  const [multiversEarnToken, setmultiversEarnToken] = useState(0);
  const [multiversPoints, setmultiversPoints] = useState(0);

  const selected = useRef(null);
  const { email } = useAuth();

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
      });
  };

  const fetchCorePrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=core&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setCorePrice(obj.data.core.usd);
      });
  };

  const fetchVictionPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setVictionPrice(obj.data.tomochain.usd);
      });
  };

  const fetchEgldPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setmultiversPrice(obj.data.tomochain.usd);
      });
  };

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2024-02-01T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");
  let dogeLastDay = new Date("2024-04-02T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let skaleLastDay = new Date("2024-07-14T13:00:00.000+02:00");
  let bnbLastDay = new Date("2024-09-10T13:00:00.000+02:00");
  let coreLastDay = new Date("2024-10-01T14:00:00.000+02:00");

  const dailyBonusMintData = {
    title: "Daily Bonus",
    subTitle: "Coming Soon",
    img: dailyBonus,
  };

  const dummyBetaPassData2 = [
    // {
    //   title: "MultiversX",
    //   logo: multiversLogo,
    //   eventStatus: "Live",
    //   totalRewards: "$20,000 in EGLD Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Find",
    //   eventDate: "Jul 01, 2024",
    //   backgroundImage: multiversBg,
    //   popupInfo: {
    //     title: "MultiversX",
    //     chain: "MultiversX Chain",
    //     linkState: "multiversx",
    //     rewards: "EGLD",
    //     status: "Live",
    //     id: "event16",
    //     eventType: "Explore & Find",
    //     totalRewards: "$20,000 in EGLD Rewards",
    //     eventDuration: coreLastDay,
    //     minRewards: "1",
    //     maxRewards: "100",
    //     minPoints: "5,000",
    //     maxPoints: "50,000",
    //     learnMore:
    //       "",
    //     eventDate: "Jul 01, 2024",
    //   },
    // },
    {
      title: "Manta Network",
      logo: mantaLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in ETH Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Jul 01, 2024",
      backgroundImage: mantaBg,
      popupInfo: {
        title: "Manta Network",
        chain: "Manta Network",
        linkState: "manta",
        rewards: "ETH",
        status: "Live",
        id: "event21",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in ETH Rewards",
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
      title: "CORE",
      logo: coreLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Jul 01, 2024",
      backgroundImage: coreBg,
      popupInfo: {
        title: "CORE",
        chain: "CORE Chain",
        linkState: "core",
        rewards: "CORE",
        status: "Live",
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
      backgroundImage: victionBg,
      popupInfo: {
        title: "VICTION",
        chain: "VICTION Chain",
        linkState: "viction",
        rewards: "VIC",
        status: "Live",
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
    // {
    //   title: "SEI",
    //   logo: seiLogo,
    //   eventStatus: "Coming Soon",
    //   totalRewards: "$20,000 in SEI Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Find",
    //   eventDate: "XXX XX, XXXX",
    //   backgroundImage: seiBg,
    //   popupInfo: {
    //     title: "SEI",
    //     chain: "SEI Chain",
    //     linkState: "sei",
    //     rewards: "SEI",
    //     status: "Coming Soon",
    //     id: "event13",
    //     eventType: "Explore & Find",
    //     totalRewards: "$20,000 in SEI Rewards",
    //     eventDuration: dypius2LastDay,
    //     minRewards: "1",
    //     maxRewards: "100",
    //     minPoints: "5,000",
    //     maxPoints: "50,000",
    //     learnMore:
    //       "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
    //     eventDate: "XXX XX, XXXX",
    //   },
    // },

    {
      title: "BNB Chain",
      logo: bnbLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Jun 12, 2024",
      backgroundImage: upcomingBnb,
      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "bnb",
        rewards: "BNB",
        status: "Live",
        id: "event20",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: bnbLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "/news",
        eventDate: "Jun 12, 2024",
      },
    },
    {
      title: "SKALE",
      logo: skaleLogo,
      eventStatus: "Expired",
      totalRewards: "$20,000 in SKL Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 15, 2024",
      backgroundImage: upcomingSkale,
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
        maxPoints: "50,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Apr 15, 2024",
      },
    },
    {
      title: "Dypius Premium",
      logo: dypiusPremium36,
      eventStatus: "Expired",
      totalRewards: "$50,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Feb 26, 2024",
      backgroundImage: upcomingDyp2,
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
      title: "CoinMarketCap",
      logo: cmc,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
      backgroundImage: upcomingCmc,
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
      logo: doge,
      eventStatus: "Expired",
      totalRewards: "$10,000 in DOGE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 22, 2023",
      backgroundImage: upcomingDoge,
      popupInfo: {
        title: "Dogecoin",
        chain: "BNB Chain",
        linkState: "doge",
        rewards: "DOGE",
        status: "Expired",
        id: "event7",
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
      backgroundImage: baseUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Network",
        linkState: "base",
        rewards: "ETH",
        status: "Expired",
        id: "event4",
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
      backgroundImage: coingeckoUpcoming,
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
      backgroundImage: upcomingDyp,
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
      backgroundImage: gateUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "BNB",
        status: "Expired",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "Ended",
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
      backgroundImage: confluxUpcoming,
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
    usdPrice: 100,
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

  const fetchSkalePrice = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=skale&vs_currencies=usd`
      )
      .then((obj) => {
        setSkalePrice(obj.data.skale.usd);
      });
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
    fetchSkalePrice();
    fetchCFXPrice();
  }, []);

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify(
            {
              email: email,
              publicAddress: userAddress,
            }
            // {
            //   "email": "renato@outerlynx.com",
            //   "publicAddress": "0x09e62eB71e29e11a21E1f541750580E45d3Ab7e0"
            // }
          ),
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
          const skaleEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "skale";
          });
          const bnbEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "bnb";
          });

          const coreEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "core";
          });

          const victionEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "viction";
          });

          const multiversEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "multivers";
          });

          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });

          const baseEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "base";
          });

          const dypEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "all";
          });

          const dogeEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "dogecoin";
          });

          const cmcEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coinmarketcap";
          });

          const dypPremiumEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "subscriber";
          });

          if (dypPremiumEvent && dypPremiumEvent[0]) {
            const userEarnedusd =
              dypPremiumEvent[0].reward.earn.total /
              dypPremiumEvent[0].reward.earn.multiplier;
            const pointsdypius = dypPremiumEvent[0].reward.earn.totalPoints;

            setdypiusPremiumPoints(pointsdypius);
            setdypiusPremiumEarnUsd(userEarnedusd);
            setdypiusPremiumEarnTokens(userEarnedusd / bnbPrice);
          }
          if (bnbEvent && bnbEvent[0]) {
            const userEarnedusd =
              bnbEvent[0].reward.earn.total /
              bnbEvent[0].reward.earn.multiplier;
            const pointsBnb = bnbEvent[0].reward.earn.totalPoints;

            setBnbPoints(pointsBnb);
            setBnbEarnUsd(userEarnedusd);
            setBnbEarnToken(userEarnedusd / bnbPrice);
          }

          if (coreEvent && coreEvent[0]) {
            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;
            const pointsCore = coreEvent[0].reward.earn.totalPoints;
            setCorePoints(pointsCore);
            setCoreEarnUsd(userEarnedusd);
            setCoreEarnToken(userEarnedusd / corePrice);
          }

          if (victionEvent && victionEvent[0]) {
            const userEarnedusd =
              victionEvent[0].reward.earn.total /
              victionEvent[0].reward.earn.multiplier;
            const pointsViction = victionEvent[0].reward.earn.totalPoints;
            setVictionPoints(pointsViction);
            setVictionEarnUsd(userEarnedusd);
            setVictionEarnToken(userEarnedusd / victionPrice);
          }

          if (multiversEvent && multiversEvent[0]) {
            const userEarnedusd =
              multiversEvent[0].reward.earn.total /
              multiversEvent[0].reward.earn.multiplier;
            const pointsmultivers = multiversEvent[0].reward.earn.totalPoints;
            setmultiversPoints(pointsmultivers);
            setmultiversEarnUsd(userEarnedusd);
            setmultiversEarnToken(userEarnedusd / multiversPrice);
          }

          if (dypEvent && dypEvent[0]) {
            const userEarnedDyp =
              dypEvent[0].reward.earn.total /
              dypEvent[0].reward.earn.multiplier;
            setDypiusEarnUsd(dyptokenDatabnb * userEarnedDyp);
            setDypiusEarnTokens(userEarnedDyp);
          }

          if (coingeckoEvent && coingeckoEvent[0]) {
            const points = coingeckoEvent[0].reward.earn.totalPoints;
            setuserPoints(points);
            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;
            setuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setuserEarnETH(usdValue / bnbPrice);
            }
          }

          if (cmcEvent && cmcEvent[0]) {
            const points = cmcEvent[0].reward.earn.totalPoints;
            setcmcuserPoints(points);
            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;
            setcmcuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setcmcuserEarnETH(usdValue / bnbPrice);
            }
          }
          if (skaleEvent && skaleEvent[0]) {
            const points = skaleEvent[0].reward.earn.totalPoints;
            setSkalePoints(points);
            const usdValue =
              skaleEvent[0].reward.earn.total /
              skaleEvent[0].reward.earn.multiplier;
            setSkaleEarnUsd(usdValue);
            if (skalePrice !== 0) {
              setSkaleEarnToken(usdValue / skalePrice);
            }
          }

          if (dogeEvent && dogeEvent[0]) {
            const points = dogeEvent[0].reward.earn.totalPoints;
            setDogeUserPoints(points);
            const usdValue =
              dogeEvent[0].reward.earn.total /
              dogeEvent[0].reward.earn.multiplier;
            setDogeEarnUSD(usdValue);
            if (dogePrice !== 0) {
              setDogeEarnBNB(usdValue / dogePrice);
            }
          }

          if (confluxEvent && confluxEvent[0]) {
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

          if (gateEvent && gateEvent[0]) {
            const gatePoints = gateEvent[0].reward.earn.totalPoints;
            setGateUserPoints(gatePoints);
            if (gateEvent[0].reward.earn.multiplier !== 0) {
              const gateUsdValue =
                gateEvent[0].reward.earn.total /
                gateEvent[0].reward.earn.multiplier;
              setGateEarnUSD(gateUsdValue);

              if (bnbPrice !== 0) {
                setGateEarnBNB(gateUsdValue / bnbPrice);
              }
            }
          }

          if (baseEvent && baseEvent[0]) {
            const basePoints = baseEvent[0].reward.earn.totalPoints;
            setBaseUserPoints(basePoints);
            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;
              setBaseEarnUSD(baseUsdValue);
              if (ethTokenData !== 0) {
                setBaseEarnETH(baseUsdValue / ethTokenData);
              }
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
    getTokenDatabnb();
    fetchVictionPrice();
    fetchEgldPrice();
    fetchCorePrice();
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
  }, [email, data, cfxPrice, bnbPrice, skalePrice, dyptokenDatabnb]);

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
                        {dummyBetaPassData2.slice(0, 3).map((item, index) => (
                          <BetaEventCard
                            data={item}
                            key={index}
                            onOpenPopup={() => {
                              setEventPopup(true);
                              setDummyEvent(item.popupInfo);
                            }}
                            userEarnUsd={
                              item.title === "CoinMarketCap"
                                ? cmcuserEarnUsd
                                : item.title === "SKALE"
                                ? skaleEarnUsd
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
                      />
                    )}
                  </div>
                </>
              )}
              {activeTab === "upcoming" && (
                <div className="d-flex flex-column gap-4">
                  <div className="border-0 upcoming-mint-wrapper upcoming-manta-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Manta Network</h6>
                      <p className="upcoming-mint-desc">
                        Join the Manta Network Treasure Hunt event for a chance
                        to grab a share of the $20,000 ETH reward pool.
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
                <div className="col-xxl-9 col-xl-10 m-auto d-flex flex-column gap-4">
                  {dummyBetaPassData2
                    .slice(3, dummyBetaPassData2.length)
                    .map((item, index) => (
                      <BetaEventCard
                        data={item}
                        key={index}
                        onOpenPopup={() => {
                          setEventPopup(true);
                          setDummyEvent(item.popupInfo);
                        }}
                        activeTab={item.activeTab}
                        userEarnUsd={
                          item.title === "Base"
                            ? baseEarnUSD
                            : item.title === "Dogecoin"
                            ? dogeEarnUSD
                            : item.title === "Conflux"
                            ? confluxEarnUSD
                            : item.title === "CoinGecko"
                            ? userEarnUsd
                            : item.title === "Gate.io"
                            ? gateEarnUSD
                            : item.title === "Dypius"
                            ? dypiusEarnTokens
                            : item.title === "Dypius Premium"
                            ? dypiusPremiumEarnUsd
                            : item.title === "BNB Chain"
                            ? bnbEarnUsd
                            : 0
                        }
                      />
                    ))}
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
                      className="pulsatingDot"
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
                      dummyEvent?.id === "event5"
                        ? dypeventPopupImage
                        : dummyEvent?.id === "event9"
                        ? eventPopupImageDypius2
                        : dummyEvent?.linkState === "coingecko"
                        ? eventPopupImageGecko
                        : dummyEvent.linkState === "gate"
                        ? gatePopupImage
                        : dummyEvent.linkState === "base"
                        ? eventPopupImageBase
                        : dummyEvent.linkState === "doge"
                        ? dogePopupImage
                        : dummyEvent.linkState === "coinmarketcap"
                        ? cmcPopupImage
                        : dummyEvent.linkState === "skale"
                        ? skalePopupImage
                        : dummyEvent.linkState === "core"
                        ? coreThumb
                        : dummyEvent.linkState === "sei"
                        ? seiThumb
                        : dummyEvent.linkState === "immutable"
                        ? immutableThumb
                        : dummyEvent.linkState === "viction"
                        ? victionThumb
                        : dummyEvent.linkState === "multiversx"
                        ? multiversThumb
                        : dummyEvent.linkState === "bnb"
                        ? bnbPopupImage
                        : dummyEvent.linkState === "manta"
                        ? mantaThumb
                        : eventPopupImage
                    }
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                    }}
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
                {dummyEvent?.status === "Coming Soon" && (
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
              {dummyEvent.status === "Live" && dummyEvent.learnMore !== "" && (
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
                  ) : dummyEvent.id === "event20" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                      Chain Beta Pass NFT from the World of Dypians Marketplace.
                      By engaging in the game on a daily basis and exploring the
                      BNB Chain area, players not only stand a chance to secure
                      daily rewards in BNB, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the BNB Chain area to
                      uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event21" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Manta Network Beta Pass NFT</b>. You can get the
                      Manta Network Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Manta Network area, players not only stand a
                      chance to secure daily rewards in BNB, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Manta Network area to uncover hidden treasures.
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
                      To participate in the event, players are required to own
                      at least one of the Beta Pass NFTs (CoinGecko, Conflux,
                      Gate, or Base). By actively participating in the game on a
                      daily basis and exploring the downtown area, players have
                      the opportunity to secure daily rewards in DYP. Remember
                      to log in to the game daily and venture into the downtown
                      area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event6" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Gate Beta Pass NFT</b>. You can get the Gate
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Gate.io area, players not only stand a chance to secure
                      daily rewards in BNB, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the Gate.io area to
                      uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event7" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Dogecoin Beta Pass NFT</b>. You can get the
                      Dogecoin Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Dogecoin area, players not only stand a
                      chance to secure daily rewards in DOGE, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Dogecoin area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event8" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a CoinMarketCap Beta Pass NFT</b>. You can get the
                      CoinMarketCap Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the CoinMarketCap area, players not only stand a
                      chance to secure daily rewards in BNB, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      CoinMarketCap area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event9" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to be{" "}
                      <b>Premium Subscribers.</b> By actively participating in
                      the game on a daily basis and exploring the downtown area,
                      players have the opportunity to secure daily rewards in
                      BNB. Remember to log in to the game daily and venture into
                      the downtown area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event11" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a SKALE Beta Pass NFT</b>. You can get the SKALE
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      SKALE area, players not only stand a chance to secure
                      daily rewards in SKL, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the SKALE area to uncover
                      hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event14" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Viction Beta Pass NFT</b>. You can get the
                      Viction Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Viction area, players not only stand a
                      chance to secure daily rewards in VIC, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Viction area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event15" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Immutable Beta Pass NFT</b>. You can get the
                      Immutable Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Immutable area, players not only stand a
                      chance to secure daily rewards in IMX, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Immutable area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event13" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a SEI Beta Pass NFT</b>. You can get the SEI Beta
                      Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      SEI area, players not only stand a chance to secure daily
                      rewards in SEI, but also earn points for their placement
                      on the global leaderboard. Remember to log in to the game
                      daily and venture into the SEI area to uncover hidden
                      treasures.
                    </p>
                  ) : dummyEvent.id === "event12" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a CORE Beta Pass NFT</b>. You can get the CORE
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      CORE area, players not only stand a chance to secure daily
                      rewards in CORE, but also earn points for their placement
                      on the global leaderboard. Remember to log in to the game
                      daily and venture into the CORE area to uncover hidden
                      treasures.
                    </p>
                  ) : dummyEvent.id === "event16" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a MultiversX Beta Pass NFT</b>. You can get the
                      MultiversX Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the MultiversX area, players not only stand a
                      chance to secure daily rewards in EGLD, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      MultiversX area to uncover hidden treasures.
                    </p>
                  ) : (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Base Beta Pass NFT</b>. You can get the Base
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      downtown area, players not only stand a chance to secure
                      daily rewards in ETH, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the downtown area to
                      uncover hidden treasures.
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
                      {dummyEvent.id !== "event5" ? (
                        <li className="popup-event-desc">
                          Daily Rewards range from ${dummyEvent.minRewards} to $
                          {dummyEvent.maxRewards}
                        </li>
                      ) : (
                        <li className="popup-event-desc">Daily Rewards</li>
                      )}
                      {dummyEvent.id !== "event5" && (
                        <li className="popup-event-desc">
                          Daily Points range from {dummyEvent.minPoints} to{" "}
                          {dummyEvent.maxPoints}
                        </li>
                      )}
                    </>
                    {dummyEvent.id !== "event5" && (
                      <li className="popup-event-desc">
                        Earn{" "}
                        {dummyEvent.id === "event1"
                          ? "CFX"
                          : dummyEvent.id === "event2"
                          ? "C98"
                          : dummyEvent.id === "event5"
                          ? "DYP"
                          : dummyEvent.id === "event6" ||
                            dummyEvent.id === "event8" ||
                            dummyEvent.id === "event9" ||
                            dummyEvent.id === "event20" ||
                            dummyEvent.id === "event3"
                          ? "BNB"
                          : dummyEvent.id === "event7"
                          ? "DOGE"
                          : dummyEvent.id === "event11"
                          ? "SKL"
                          : dummyEvent.id === "event14"
                          ? "VIC"
                          : dummyEvent.id === "event15"
                          ? "IMX"
                          : dummyEvent.id === "event13"
                          ? "SEI"
                          : dummyEvent.id === "event12"
                          ? "CORE"
                          : dummyEvent.id === "event16"
                          ? "EGLD"
                          : dummyEvent.id === "event21"
                          ? "ETH"
                          : "ETH"}{" "}
                        rewards
                      </li>
                    )}
                    {dummyEvent.id !== "event5" &&
                      dummyEvent.id !== "event11" && (
                        <li className="popup-event-desc">
                          Get global leaderboard points
                        </li>
                      )}
                    {dummyEvent.id === "event11" && (
                      <li className="popup-event-desc">
                        Get global SKALE leaderboard points
                      </li>
                    )}
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
                : dummyEvent.id === "event20"
                ? "BNB Chain"
                : dummyEvent.id === "event3"
                ? "CoinGecko"
                : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                ? "Dypius"
                : dummyEvent.id === "event6"
                ? "Gate.io"
                : dummyEvent.id === "event7"
                ? "Dogecoin"
                : dummyEvent.id === "event8"
                ? "CoinMarketCap"
                : dummyEvent.id === "event11"
                ? "SKALE"
                : dummyEvent.id === "event14"
                ? "VIction"
                : dummyEvent.id === "event15"
                ? "Immutable"
                : dummyEvent.id === "event13"
                ? "SEI"
                : dummyEvent.id === "event12"
                ? "CORE"
                : dummyEvent.id === "event16"
                ? "MultiversX"
                : dummyEvent.id === "event21"
                ? "Manta Network"
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
            ) : dummyEvent.id === "event20" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                BNB Chain is a high-performance blockchain designed to support
                the expansive growth of decentralized applications. It offers a
                robust infrastructure that combines high throughput, low
                latency, and low fees, making it the ideal platform for DeFi,
                NFTs, and gaming. With BNB Chain, developers can leverage
                advanced functionalities such as cross-chain compatibility,
                on-chain governance, and scalable smart contracts. The ecosystem
                empowers projects to build and scale efficiently, ensuring fast,
                secure, and decentralized solutions without compromising on user
                experience or innovation.
              </p>
            ) : dummyEvent.id === "event21" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Manta Network is the multi-modular ecosystem for zero-knowledge
                (ZK) applications. Manta Network was created by a team of
                experienced founders from prestigious institutions, including
                Harvard, MIT, and Algorand. Manta Network has received
                investments from many top web3 investment funds, including
                Binance Labs and Polychain Capital. It has grown through
                participation in the best web3 accelerators, including Alliance
                DAO and Berkeley Blockchain Xcelerator. Manta Network is poised
                to bring the next generation of web3 users and usher in a new
                chapter of web3 zkApp applications.
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
            ) : dummyEvent.id === "event5" || dummyEvent.id === "event9" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Dypius is a powerful, decentralized ecosystem with a focus on
                scalability, security, and global adoption through next-gen
                infrastructure. We offer a variety of products and services that
                cater to both beginners and advanced users in the crypto space
                including Earn solutions, analytical tools, NFTs, Metaverse and
                more!
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
            ) : dummyEvent.id === "event7" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                An open-source peer-to-peer digital currency, favoured by Shiba
                Inus worldwide.At its heart, Dogecoin is the accidental crypto
                movement that makes people smile! It is also an opensource
                peer-to-peer cryptocurrency that utilises blockchain technology,
                a highly secure decentralised system of storing information as a
                public ledger that is maintained by a network of computers
                called nodes.
              </p>
            ) : dummyEvent.id === "event8" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                CoinMarketCap provides cryptocurrency market cap rankings,
                charts, and more. We tracks capitalization of various
                cryptocurrencies by listing prices, available supply (amount of
                coins that is currently in circulation), trade volume over last
                24 hours, or market capitalizations. CoinMarketCap was founded
                in May 2013 by Brandon Chez in Long Island City, Queens, New
                York.
              </p>
            ) : dummyEvent.id === "event11" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                SKALE stands as the world's fastest blockchain, meticulously
                engineered to enable secure Ethereum scaling. With SKALE
                AppChains, users enjoy ZERO gas fees and access advanced
                functionalities like AI/ML smart contracts, on-chain file
                storage, interchain messaging, and zero-cost minting. This
                empowers developers to swiftly deploy their own configurable EVM
                blockchains without compromising on speed, security, or
                decentralization.
              </p>
            ) : dummyEvent.id === "event14" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Viction, previously known as TomoChain, is a people-centric
                layer-1 blockchain that provides zero-gas transactions and
                heightened security, making Web3 accessible and safe for
                everyone. With a design emphasis on user experience, Viction
                prioritizes zero-gas transactions through the innovative TRC25
                token standard, alongside speed, security, and scalability, all
                contributing to a more secure and open world.
              </p>
            ) : dummyEvent.id === "event16" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                MultiversX is a distributed blockchain network for next-gen
                applications. Decentralized via 3000+ nodes, scalable through
                sharding, fast, secure & green.
              </p>
            ) : dummyEvent.id === "event15" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Immutable is a global leader in gaming on a mission to bring
                digital ownership to every player by making it safe and easy to
                build great web3 games.
              </p>
            ) : dummyEvent.id === "event13" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Sei is recognized as the fastest Layer 1 blockchain, setting new
                benchmarks in blockchain performance and scalability. Supporting
                multiple execution environments, including the innovative
                parallelized Ethereum Virtual Machine,
              </p>
            ) : dummyEvent.id === "event12" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Core DAO started as a community looking for better solutions,
                and that's what it remains. With principles grounded in the
                premises of both Bitcoin and Ethereum, our power comes from
                embracing multiple ideas and communities. The opposite of a
                winner-take-all mentality - Core is focused instead on platform
                growth and driving the global adoption of blockchain technology.
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
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://twitter.com/dypius"
                    : dummyEvent.id === "event3"
                    ? "https://twitter.com/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://twitter.com/gate_io"
                    : dummyEvent.id === "event7"
                    ? "https://twitter.com/dogecoin"
                    : dummyEvent.id === "event8"
                    ? "https://twitter.com/CoinMarketCap"
                    : dummyEvent.id === "event11"
                    ? "https://twitter.com/SkaleNetwork"
                    : dummyEvent.id === "event20"
                    ? "https://x.com/BNBChain"
                    : dummyEvent.id === "event14"
                    ? "https://viction.link/twitter"
                    : dummyEvent.id === "event15"
                    ? "https://twitter.com/Immutable"
                    : dummyEvent.id === "event13"
                    ? "https://twitter.com/SeiNetwork"
                    : dummyEvent.id === "event12"
                    ? "https://twitter.com/Coredao_Org"
                    : dummyEvent.id === "event16"
                    ? "https://twitter.com/MultiversX"
                    : dummyEvent.id === "event21"
                    ? "https://x.com/mantanetwork"
                    : "https://twitter.com/buildonbase"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" width={16} height={16} src={twitter} /> Twitter
              </a>

              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://t.me/Conflux_English"
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://t.me/worldofdypians"
                    : dummyEvent.id === "event3"
                    ? "https://t.me/coingecko"
                    : dummyEvent.id === "event8"
                    ? "https://t.me/CoinMarketCapAnnouncements"
                    : dummyEvent.id === "event6"
                    ? "https://t.me/gateio_en"
                    : dummyEvent.id === "event7"
                    ? "https://discord.gg/dogecoin"
                    : dummyEvent.id === "event11"
                    ? "https://t.me/skaleofficial"
                    : dummyEvent.id === "event20"
                    ? "https://t.me/bnbchain"
                    : dummyEvent.id === "event14"
                    ? "https://viction.link/telegram"
                    : dummyEvent.id === "event15"
                    ? "https://discord.gg/CYsjMdctsP"
                    : dummyEvent.id === "event13"
                    ? "https://t.me/seinetwork?ref=blog.sei.io"
                    : dummyEvent.id === "event12"
                    ? "https://t.me/CoreDAOTelegram"
                    : dummyEvent.id === "event16"
                    ? "https://t.me/MultiversX"
                    : dummyEvent.id === "event21"
                    ? "https://www.t.me/mantanetworkofficial"
                    : "https://base.org/discord"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img
                  alt=""
                  src={
                    dummyEvent.id !== "event4" && dummyEvent.id !== "event7"
                      ? telegram
                      : discord
                  }
                />
                {dummyEvent.id !== "event4" && dummyEvent.id !== "event7"
                  ? "Telegram"
                  : "Discord"}
              </a>
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://confluxnetwork.org/"
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://www.dypius.com/"
                    : dummyEvent.id === "event3"
                    ? "https://www.coingecko.com/"
                    : dummyEvent.id === "event6"
                    ? "https://www.gate.io/"
                    : dummyEvent.id === "event7"
                    ? "https://dogecoin.com/"
                    : dummyEvent.id === "event8"
                    ? "https://coinmarketcap.com/"
                    : dummyEvent.id === "event11"
                    ? "https://skale.space/"
                    : dummyEvent.id === "event14"
                    ? "https://www.viction.xyz/"
                    : dummyEvent.id === "event15"
                    ? "https://www.immutable.com/"
                    : dummyEvent.id === "event13"
                    ? "https://www.sei.io/"
                    : dummyEvent.id === "event20"
                    ? "https://www.bnbchain.org/en"
                    : dummyEvent.id === "event12"
                    ? "https://coredao.org/"
                    : dummyEvent.id === "event16"
                    ? "https://multiversx.com/"
                    : dummyEvent.id === "event16"
                    ? "https://manta.network/"
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
                        ? confluxUserPoints
                        : dummyEvent.id === "event3"
                        ? userPoints
                        : dummyEvent.id === "event6"
                        ? gateUserPoints
                        : dummyEvent.id === "event4"
                        ? baseUserPoints
                        : dummyEvent.id === "event5"
                        ? dypiusEarnTokens
                        : dummyEvent.id === "event7"
                        ? dogeUserPoints
                        : dummyEvent.id === "event8"
                        ? cmcuserPoints
                        : dummyEvent.id === "event9"
                        ? dypiusPremiumPoints
                        : dummyEvent.id === "event11"
                        ? skalePoints
                        : dummyEvent.id === "event20"
                        ? bnbPoints
                        : dummyEvent.id === "event16"
                        ? multiversPoints
                        : dummyEvent.id === "event14"
                        ? victionPoints
                        : dummyEvent.id === "event12"
                        ? corePoints
                        : 0,
                      0
                    )}
                    {dummyEvent.id === "event5" && " DYP"}
                  </h6>

                  <span className="mb-0 event-earnings-usd">
                    {dummyEvent.id === "event5"
                      ? "Amount"
                      : "Leaderboard Points"}
                  </span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h6
                    className="mb-0 event-earnings-coin2 d-flex specialstyle-wrapper gap-1"
                    style={{
                      left: dummyEvent.id === "event5" && "0px",
                    }}
                  >
                    $
                    {getFormattedNumber(
                      dummyEvent.id === "event1"
                        ? confluxEarnUSD
                        : dummyEvent.id === "event3"
                        ? userEarnUsd
                        : dummyEvent.id === "event6"
                        ? gateEarnUSD
                        : dummyEvent.id === "event4"
                        ? baseEarnUSD
                        : dummyEvent.id === "event5"
                        ? dypiusEarnUsd
                        : dummyEvent.id === "event7"
                        ? dogeEarnUSD
                        : dummyEvent.id === "event8"
                        ? cmcuserEarnUsd
                        : dummyEvent.id === "event9"
                        ? dypiusPremiumEarnUsd
                        : dummyEvent.id === "event11"
                        ? skaleEarnUsd
                        : dummyEvent.id === "event12"
                        ? coreEarnUsd
                        : dummyEvent.id === "event16"
                        ? multiversEarnUsd
                        : dummyEvent.id === "event14"
                        ? victionEarnUsd
                        : dummyEvent.id === "event20"
                        ? bnbEarnUsd
                        : 0,
                      2
                    )}
                    <span className="ethpricerewards specialstyle-wrapper-eth">
                      {dummyEvent.id !== "event5" && (
                        <>
                          {getFormattedNumber(
                            dummyEvent.id === "event1"
                              ? confluxEarnCFX
                              : dummyEvent.id === "event3"
                              ? userEarnETH
                              : dummyEvent.id === "event6"
                              ? gateEarnBNB
                              : dummyEvent.id === "event4"
                              ? baseEarnETH
                              : dummyEvent.id === "event7"
                              ? dogeEarnBNB
                              : dummyEvent.id === "event8"
                              ? cmcuserEarnETH
                              : dummyEvent.id === "event9"
                              ? dypiusPremiumEarnTokens
                              : dummyEvent.id === "event11"
                              ? skaleEarnToken
                              : dummyEvent.id === "event12"
                              ? coreEarnToken
                              : dummyEvent.id === "event16"
                              ? multiversEarnToken
                              : dummyEvent.id === "event14"
                              ? victionEarnToken
                              : dummyEvent.id === "event20"
                              ? bnbEarnToken
                              : 0,
                            2
                          )}
                          {dummyEvent.id === "event1"
                            ? "CFX"
                            : dummyEvent.id === "event2"
                            ? "C98"
                            : dummyEvent.id === "event3"
                            ? "BNB"
                            : dummyEvent.id === "event5"
                            ? "DYP"
                            : dummyEvent.id === "event6" ||
                              dummyEvent.id === "event8" ||
                              dummyEvent.id === "event9"
                            ? "BNB"
                            : dummyEvent.id === "event7"
                            ? "DOGE"
                            : dummyEvent.id === "event11"
                            ? "SKL"
                            : dummyEvent.id === "event20"
                            ? "BNB"
                            : dummyEvent.id === "event14"
                            ? "VIC"
                            : dummyEvent.id === "event15"
                            ? "IMX"
                            : dummyEvent.id === "event13"
                            ? "SEI"
                            : dummyEvent.id === "event12"
                            ? "CORE"
                            : dummyEvent.id === "event16"
                            ? "EGLD"
                            : dummyEvent.id === "event21"
                            ? "ETH"
                            : "ETH"}
                        </>
                      )}
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
            {dummyEvent.status === "Coming Soon" &&
              dummyEvent.id !== "event7" &&
              dummyEvent.id !== "event9" && (
                <div className="w-100 d-flex justify-content-end mt-3">
                  <NavLink
                    to={`/marketplace/beta-pass/${dummyEvent.linkState}`}
                  >
                    <button className="btn get-beta-btn">Get Beta Pass</button>
                  </NavLink>
                </div>
              )}

            {/* {dummyEvent.id === "event9" && (
              <div className="w-100 d-flex justify-content-end mt-3">
                <NavLink to={`/account`}>
                  <button className="btn get-beta-btn">Get Premium</button>
                </NavLink>
              </div>
            )} */}
          </div>
        </OutsideClickHandler>
      )}

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
