import React, { useEffect, useState } from "react";
import "./_myprofile.scss";
import profileImage from "./assets/profileImage.png";
import premiumProfileImage from "./assets/premiumProfileImage.png";
import domainIcon from "./assets/domainIcon.svg";
import globalRankIcon from "./assets/globalRankIcon.svg";
import totalEarningsIcon from "./assets/totalEarningsIcon.svg";
import myRankIcon from "./assets/myRankIcon.svg";
import premiumTab from "./assets/premiumTab.svg";
import chainsFlag from "./assets/chainsFlag2.svg";
import chainsIcon from "./assets/chainsIcon.svg";
import globalFlag from "./assets/globalFlag2.svg";
import globalIcon from "./assets/globalIcon2.png";
import landFlag from "./assets/landFlag2.svg";
import landIcon from "./assets/landIcon.svg";
import bnb from "./assets/bnb.svg";
import whiteArrow from "./assets/whiteArrow.svg";
import greenArrow from "./assets/greenArrow.svg";
import redArrow from "./assets/redArrow.svg";
import pinkArrow from "./assets/pinkArrow.svg";
import grayArrow from "./assets/grayArrow.svg";
import dypius from "../../screens/Account/src/Components/WalletBalance/assets/dypIcon.svg";
import dypiusPremium from "../../screens/Account/src/Components/WalletBalance/assets/dypiusPremium16.svg";
import upcomingDyp from "../../screens/Account/src/Components/WalletBalance/assets/upcomingDyp.webp";
import upcomingDyp2 from "../../screens/Account/src/Components/WalletBalance/assets/dypiuspopup2.png";
import victionLogo from "../../screens/Account/src/Components/WalletBalance/assets/victionLogo.svg";
import multiversLogo from "../../screens/Account/src/Components/WalletBalance/assets/multiversLogo.svg";
import victionBg from "../../screens/Account/src/Components/WalletBalance/assets/victionBg.webp";
import multiversBg from "../../screens/Account/src/Components/WalletBalance/assets/multiversBg.webp";
import seiLogo from "../../screens/Account/src/Components/WalletBalance/assets/seiLogo.svg";
import seiBg from "../../screens/Account/src/Components/WalletBalance/assets/seiBg.webp";
import coreLogo from "../../screens/Account/src/Components/WalletBalance/assets/coreLogo.svg";
import bnbLogo from "../../screens/Account/src/Components/WalletBalance/assets/bnbIcon.svg";
import coreBg from "../../screens/Account/src/Components/WalletBalance/assets/coreBg.webp";
import immutableLogo from "../../screens/Account/src/Components/WalletBalance/assets/immutableLogo.svg";
import immutableBg from "../../screens/Account/src/Components/WalletBalance/assets/immutableBg.webp";
import upcomingSkale from "../../screens/Account/src/Components/WalletBalance/assets/skalePopupImage.png";
import conflux from "../../screens/Account/src/Components/WalletBalance/assets/conflux.svg";
import gate from "../../screens/Account/src/Components/WalletBalance/assets/gate.svg";
import coingecko from "../../screens/Account/src/Components/WalletBalance/assets/coingecko.svg";
import base from "../../screens/Account/src/Components/WalletBalance/assets/baseLogo.svg";
import confluxUpcoming from "../../screens/Account/src/Components/WalletBalance/assets/confluxUpcoming.png";
import gateUpcoming from "../../screens/Marketplace/assets/gateUpcoming.webp";
import skaleLogo from "../../screens/Account/src/Components/WalletBalance/assets/skaleLogo.svg";
import coingeckoUpcoming from "../../screens/Marketplace/assets/coingeckoUpcoming.png";
import baseUpcoming from "../../screens/Marketplace/assets/baseUpcoming.webp";
import doge from "../../screens/Marketplace/MarketNFTs/assets/dogeLogo.svg";
import cmc from "../../screens/Marketplace/MarketNFTs/assets/cmc.svg";
import mageStarter from "../../screens/Account/src/Components/WalletBalance/assets/mageStarter.png";
import mageGoing from "../../screens/Account/src/Components/WalletBalance/assets/mageGoing.png";
import mageFinish from "../../screens/Account/src/Components/WalletBalance/assets/mageFinish.png";
import readyBorder from "../../screens/Account/src/Components/WalletBalance/newAssets/readyBorder2.svg";
import stakeNft from './assets/stakeNft.png'

import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc mb-0">Days</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc mb-0">Minutes</span>
        </div>
      </div>
    </>
  );
};

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const MyProfile = ({
  claimedChests,
  claimedPremiumChests,
  openedSkaleChests,
  openedCoreChests,
  openedVictionChests,
  canBuy,
  email,
  isPremium

}) => {
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


  const totalClaimedChests =
  claimedChests +
  claimedPremiumChests +
  openedSkaleChests.length +
  openedCoreChests.length +
  openedVictionChests.length;

const chestPercentage = (totalClaimedChests / 80) * 100;

let now = new Date().getTime();
const midnight = new Date(now).setUTCHours(24, 0, 0, 0);



  const [allEvents, setAllEvents] = useState(false)
  const [finished, setFinished] = useState(false);


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
      title: "CORE",
      logo: coreLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      backgroundImage: coreBg,
      eventDate: "Jul 01, 2024",

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
      backgroundImage: victionBg,
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
    //     logo: seiLogo,
    //     backgroundImage: seiBg,
    //     date: "XXX XX, XXXX",

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
      backgroundImage: upcomingSkale,
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
        maxPoints: "30,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Jun 12, 2024",
      },
    },
    {
      title: "SKALE",
      logo: skaleLogo,
      eventStatus: "Live",
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
        status: "Live",
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
      logo: dypiusPremium,
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
      title: "CMC",
      logo: cmc,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
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
      backgroundImage: baseUpcoming,
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

  useEffect(() => {
    if (canBuy && email) {
      setFinished(false);
    } else if (!canBuy && email) {
      setFinished(true);
    } else if (!email) {
      setFinished(false);
    }
  }, [claimedChests, claimedPremiumChests, isPremium, canBuy, email]);

  return (
    <div className="custom-container mt-5">
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="profile-card-wrapper p-3 d-flex flex-column justify-content-between h-100">
            <div className="d-flex align-items-center gap-2">
              <img src={profileImage} alt="" />
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="my-profile-username">DarkSliffer</h6>
                  <img src={premiumTab} alt="" />
                </div>
                <span className="my-profile-email mb-2">
                  dypiustesting@gmail.com
                </span>
                <div className="wallet-address-wrapper d-flex align-items-center justify-content-between p-2">
                  <div className="d-flex flex-column">
                    <span className="profile-wallet-span mb-2">
                      Wallet Address
                    </span>
                    <span className="wallet-addr">0xaC498...c7C9a</span>
                  </div>
                  <img src={domainIcon} width={30} height={30} alt="" />
                </div>
              </div>
            </div>
            <hr className="sidebar-separator my-2" />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={totalEarningsIcon} alt="" />
                  <span className="rank-card-span">Total Earnings</span>
                  <span className="rank-card-value">$5,325</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={globalRankIcon} alt="" />
                  <span className="rank-card-span">Global Rank</span>
                  <span className="rank-card-value">#4</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={myRankIcon} alt="" />
                  <span className="rank-card-span">My Rank</span>
                  <span className="rank-card-value">Unstoppable</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={totalEarningsIcon} alt="" />
                  <span className="rank-card-span">Total Earnings</span>
                  <span className="rank-card-value">$5,325</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={globalRankIcon} alt="" />
                  <span className="rank-card-span">Global Rank</span>
                  <span className="rank-card-value">#4</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={myRankIcon} alt="" />
                  <span className="rank-card-span">My Rank</span>
                  <span className="rank-card-value">Unstoppable</span>
                </div>
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
               <div className="daily-bonus-wrapper">
                  <div className="red-div"></div>
                  <img
                    // src={finished ? mageFinish : mageGoing}
                    src={
                      chestPercentage >= 50 && chestPercentage < 100
                        ? mageGoing
                        : chestPercentage === 100
                        ? mageFinish
                        : mageStarter
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
                      <div className="d-flex flex-column">
                      <h6 className="leaderboards-title mb-0">Daily</h6>
                      <h6 className="leaderboards-title mb-0" style={{color: "#FF5EA0"}}>Bonus</h6>
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
                          src={readyBorder}
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
              <div className="game-leaderboards-wrapper position-relative h-100 d-flex align-items-center justify-content-between p-3">
                <div className="d-flex flex-column">
                  <h6 className="leaderboards-title">Game</h6>
                  <h6
                    className="leaderboards-title mb-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Leaderboards
                  </h6>
                </div>
                <div className="d-flex align-items-center leaderboards-flag-wrapper gap-3">
                  <div className="new-flag-wrapper global-flag">
                    <img src={globalFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Global</span>
                      <img src={globalIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div className="new-flag-wrapper chains-flag">
                    <img src={chainsFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Chains</span>
                      <img src={chainsIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div className="new-flag-wrapper land-flag">
                    <img src={landFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Genesis</span>
                      <img src={landIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-3">
              <div className="profile-placeholder"></div>
            </div>
            <div className="col-12 col-lg-6 mt-3">
                 <div className="new-special-rewards-wrapper d-flex flex-column justify-content-between gap-3 p-3">
                <h6 className="special-rewards-title">Special Rewards</h6>
                <div className="d-flex flex-column">
                  <h6 className="special-rewards-total mb-0">$450.24</h6>
                  <span className="special-rewards-total-span">Rewards</span>
                </div>
                  <img src={redArrow} width={20} height={20} alt="" />
              </div>
            </div>
            <div className="col-12 col-lg-8 mt-3">
            <div className="limited-offers-wrapper d-flex flex-column justify-content-between gap-3 p-3">
              <div className="d-flex align-items-center gap-2">
                <h6 className="leaderboards-title mb-0">Limited</h6>
                <h6 className="leaderboards-title mb-0" style={{color: "#00E3BA"}}>Offers</h6>
              </div>
              <img src={greenArrow} height={20} width={20} alt="" />
            </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <div className="new-stake-nft-wrapper d-flex align-items-center justify-content-between p-3">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div className="d-flex flex-column">
                    <h6 className="leaderboards-title">Stake</h6>
                    <h6 className="leaderboards-title mb-0" style={{color: "#FFA1E5"}}>NFT</h6>
                  </div>
                  <img src={pinkArrow} height={20} width={20} alt="" />
                </div>
                <img src={stakeNft} className="new-stake-nft-img" alt="" />
              </div>
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
                       <img
                         src={greenArrow}
                         width={14}
                         height={14}
                         alt=""
                       />
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
  );
};

export default MyProfile;
