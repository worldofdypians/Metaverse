import React, { useEffect, useRef, useState } from "react";
import "./_videowrapper.scss";
import xMark from "../../../assets/navbarAssets/xMark.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import epicwhite from "../../../assets/epicwhite.svg";
import epicblack from "../../../assets/epicblack.svg";
import LeaderBoard from "../../../components/LeaderBoard/LeaderBoard";
import coingecko from "../../Marketplace/MarketNFTs/assets/coingecko.svg";
import coinbaseimg from "../../Marketplace/MarketNFTs/assets/base.svg";
import dypius from "../../Marketplace/MarketNFTs/assets/dypiusPremium16.svg";
import doge from "../../Marketplace/MarketNFTs/assets/dogeLogo.svg";
import cmc from "../../Marketplace/MarketNFTs/assets/cmc.svg";
import multiplayer from "../../../assets/multiplayer.svg";
import whiteCircleArrow from "../../../assets/whiteCircleArrow.svg";
import skaleLogo from "../../Marketplace/MarketNFTs/assets/skaleLogo.svg";
import bnbLogo from "../../Marketplace/MarketNFTs/assets/bnblogo.svg";

import victionLogo from "./assets/victionLogo.svg";
import victionBg from "./assets/victionBg.webp";
import seiLogo from "./assets/seiLogo.svg";
import seiBg from "./assets/seiBg.webp";
import coreLogo from "./assets/coreLogo.svg";
import coreBg from "./assets/coreBg.webp";
import immutableLogo from "./assets/immutableLogo.svg";
import immutableBg from "./assets/immutableBg.webp";

import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";
import NewHomeLeaderboard from "../../../components/LeaderBoard/NewHomeLeaderboard";
import GlobalLeaderboard from "../../../components/LeaderBoard/GlobalLeaderboard";

const VideoWrapper = ({ handleRegister, handleDownload }) => {
  const [modal, setModal] = useState(false);
  const [multiplayerModal, setmultiplayerModal] = useState(false);

  const [icons, setIcons] = useState(false);
  const betaSlider = useRef(null);
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const downloader = useRef();
  const windowSize = useWindowSize();
  downloader?.current?.addEventListener("mouseenter", () => {
    setIcons(true);
  });
  downloader?.current?.addEventListener("mouseleave", () => {
    setIcons(false);
  });

  const reqmodal = document.querySelector("#reqmodal");
  const html = document.querySelector("html");

  const gotoDownload = () => {
    window.location.href =
      "https://drive.google.com/drive/folders/1zURuJDGoePa9V1GMkTGTbKMcaFd4UScp";
  };

  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");


  const dummyBetaPassData2 = [
    {
      title: "BNB Chain",
      chain: "SKALE Nebula Hub",
      linkState: "skale",
      rewards: "BNB",
      status: "Live",
      eventStatus: "Live",
      id: "event14",
      eventType: "Explore & Mine",
      date: "December 22, 2023",
      logo: bnbLogo,
      totalRewards: "$20,000 in BNB Rewards",
      rewardsAmount: "$20,000",
      rewardsCurrency: "BNB Rewards",
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore:
        "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "bnb",
        rewards: "BNB",
        status: "Live",
        id: "event14",
        eventStatus: "Live",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "December 22, 2023",
      },
    },
    {
      title: "SKALE",
      chain: "SKALE Nebula Hub",
      linkState: "skale",
      rewards: "SKL",
      status: "Live",
      eventStatus: "Live",
      id: "event11",
      eventType: "Explore & Mine",
      date: "December 22, 2023",
      logo: skaleLogo,
      totalRewards: "$20,000 in SKL Rewards",
      rewardsAmount: "$20,000",
      rewardsCurrency: "SKL Rewards",
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore:
        "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
      popupInfo: {
        title: "SKALE",
        chain: "SKALE Nebula Hub",
        linkState: "doge",
        rewards: "SKL",
        status: "Live",
        id: "event11",
        eventStatus: "Live",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SKL Rewards",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "December 22, 2023",
      },
    },
  
    {
      title: "CORE",
      logo: coreLogo,
      eventStatus: "Coming Soon",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "XXX XX, XXXX",
      rewardsAmount: "$20,000",
      rewardsCurrency: "CORE Rewards",

      backgroundImage: coreBg,
      popupInfo: {
        title: "CORE",
        chain: "CORE Chain",
        linkState: "core",
        rewards: "CORE",
        status: "Coming Soon",
        id: "event12",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in SEI Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "XXX XX, XXXX",
      },
    },
    {
      title: "VICTION",
      logo: victionLogo,
      eventStatus: "Coming Soon",
      totalRewards: "$20,000 in VIC Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "XXX XX, XXXX",
      rewardsAmount: "$20,000",
      rewardsCurrency: "VIC Rewards",

      backgroundImage: victionBg,
      popupInfo: {
        title: "VICTION",
        chain: "VICTION Chain",
        linkState: "viction",
        rewards: "VIC",
        status: "Coming Soon",
        id: "event14",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in VIC Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "XXX XX, XXXX",
      },
    },
      {
      title: "Dypius",
      logo: dypius,
      eventStatus: "Expired",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "September xx, 2023",
      rewardsAmount: "$50,000",
      rewardsCurrency: "BNB Rewards",
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
        // eventDuration: coingeckoLastDay,
        minRewards: "25",
        maxRewards: "50",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "Ended",
      },
    },
    {
      title: "SEI",
      logo: seiLogo,
      eventStatus: "Coming Soon",
      totalRewards: "$20,000 in SEI Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "XXX XX, XXXX",
      rewardsAmount: "$20,000",
      rewardsCurrency: "SEI Rewards",

      backgroundImage: seiBg,
      popupInfo: {
        title: "SEI",
        chain: "SEI Chain",
        linkState: "sei",
        rewards: "SEI",
        status: "Coming Soon",
        id: "event13",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in SEI Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "XXX XX, XXXX",
      },
    },
    {
      title: "CMC",
      logo: cmc,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "December 26, 2023",
      // backgroundImage: upcomingCmc,
      rewardsAmount: "$20,000",
      rewardsCurrency: "BNB Rewards",
      popupInfo: {
        title: "CoinMarketCap",
        chain: "BNB Chain",
        linkState: "coinmarketcap",
        rewards: "BNB",
        status: "Expired",
        id: "event8",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in BNB Rewards",
        rewardsAmount: "$10,000",
        rewardsCurrency: "BNB Rewards",
        // eventDuration: coingeckoLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        eventDate: "December 26, 2023",
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
      date: "December 22, 2023",
      logo: doge,
      totalRewards: "$10,000 in DOGE Rewards",
      rewardsAmount: "$10,000",
      rewardsCurrency: "DOGE Rewards",
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
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "December 22, 2023",
      },
    },
    // {
    //   title: "Base",
    //   logo: coinbaseimg,
    //   eventStatus: "Expired",
    //   totalRewards: "$10,000 in ETH Rewards",
    //   rewardsAmount: "$10,000",
    //   rewardsCurrency: "ETH Rewards",
    //   myEarnings: 126.45,
    //   eventType: "Explore & Mine",
    //   eventDate: "Nov 01, 2023",
    //   popupInfo: {
    //     eventType: "Explore & Mine",
    //     title: "Base",
    //     chain: "Base Chain",
    //     linkState: "base",
    //     rewards: "ETH",
    //     status: "Expired",
    //     id: "event4",
    //     date: "Nov 01, 2023",
    //     totalRewards: "$5,000 in ETH Rewards",
    //     eventDate: "Nov 01, 2023",
    //     minRewards: "0.5",
    //     maxRewards: "20",
    //     minPoints: "5,000",
    //     maxPoints: "30,000",
    //     learnMore: "/news/65422043b3f3545e95018290/Base-Treasure-Hunt-Event",
    //   },
    // },
    // {
    //   title: "CoinGecko",
    //   logo: coingecko,
    //   eventStatus: "Expired",
    //   totalRewards: "$10,000 in BNB Rewards",
    //   rewardsAmount: "$10,000",
    //   rewardsCurrency: "BNB Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Mine",
    //   eventDate: "Ended",
    //   popupInfo: {
    //     title: "CoinGecko",
    //     chain: "BNB Chain",
    //     linkState: "coingecko",
    //     rewards: "BNB",
    //     status: "Expired",
    //     id: "event3",
    //     eventType: "Explore & Mine",
    //     totalRewards: "$10,000 in BNB Rewards",
    //     minRewards: "1",
    //     maxRewards: "100",
    //     minPoints: "5,000",
    //     maxPoints: "50,000",
    //     learnMore:
    //       "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
    //   },
    // },

    // {
    //   title: "Gate.io",
    //   logo: gateWhite,
    //   eventStatus: "Expired",
    //   totalRewards: "$2,000 in BNB Rewards",
    //   rewardsAmount: "$2,000",
    //   rewardsCurrency: "BNB Rewards",
    //   myEarnings: 0,
    //   eventType: "Explore & Mine",
    //   eventDate: "Ended",
    //   popupInfo: {
    //     eventType: "Explore & Mine",
    //     title: "Gate.io",
    //     chain: "BNB Chain",
    //     linkState: "gate",
    //     rewards: "GT",
    //     status: "Expired",
    //     id: "event6",
    //     totalRewards: "$2,000 in BNB Rewards",
    //     eventDate: "Ended",
    //     date: "Ended",
    //     minRewards: "0.5",
    //     maxRewards: "20",
    //     minPoints: "5,000",
    //     maxPoints: "20,000",
    //   },
    // },
    // {
    //   title: "Conflux",
    //   logo: conflux,
    //   eventStatus: "Expired",
    //   totalRewards: "$2,000 in CFX Rewards",
    //   rewardsAmount: "$2,000",
    //   rewardsCurrency: "CFX Rewards",
    //   myEarnings: 0,
    //   eventType: "Explore & Mine",
    //   eventDate: "Ended",
    //   popupInfo: {
    //     eventType: "Explore & Mine",
    //     title: "Conflux",
    //     chain: "Conflux Network",
    //     linkState: "conflux",
    //     rewards: "CFX",
    //     status: "Expired",
    //     id: "event1",
    //     totalRewards: "$2,000 in CFX Rewards",
    //     eventDate: "Ended",
    //     minRewards: "1",
    //     maxRewards: "20",
    //     minPoints: "5,000",
    //     maxPoints: "20,000",
    //     learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
    //   },
    // },
  ];

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
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

  useEffect(() => {
    if (modal === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [modal]);

  return (
    <>
      <div className="video-wrapper position-relative">
        <div
          className="row leaderboard-bg gap-4 gap-lg-0"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12 col-lg-8 video-diagonal">
            <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center">
              <div className="row m-0 gap-5 align-items-center justify-content-center">
                <div
                  className="linear-border-download p-0"
                  style={{
                    width: "fit-content",
                    zIndex: 5,
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
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
                <div
                  className="multiplayer-linear-border"
                  style={{
                    width: "fit-content",
                    zIndex: 5,
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  <button
                    className="btn multiplayer-btn px-3 d-flex align-items-center gap-2"
                    onClick={() => {
                      setmultiplayerModal(true);
                    }}
                  >
                    <img src={multiplayer} alt="" /> Multiplayer
                  </button>
                </div>
              </div>
              <div className="join-beta-ribbon p-2 w-100">
                <NavLink to="join-beta">
                  <div className="d-flex justify-content-between gap-2 align-items-center">
                    <span className="joinbeta-white-txt">
                      Join Beta Program
                    </span>
                    <img src={whiteCircleArrow} alt="" />
                  </div>
                </NavLink>
              </div>
            </div>
            {windowSize.width < 992 && (
              <NavLink
                to={`/marketplace/events/treasure-hunt`}
                className="d-flex justify-content-center"
              >
                <div
                  className="opacitywrapper position-relative"
                  style={{ width: "90%" }}
                >
                  <span
                    className="popup-rewards d-flex text-white mb-2"
                    style={{
                      fontSize: windowSize.width < 992 ? "18px" : "24px",
                    }}
                  >
                    Treasure Hunt
                  </span>

                  <Slider {...settings} ref={betaSlider}>
                    {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                      <NavLink to={`/marketplace/events/treasure-hunt`}>
                        <BetaEventCardHome
                          data={item}
                          key={index}
                          isFrontPage={true}
                        />
                      </NavLink>
                    ))}
                  </Slider>
                </div>
              </NavLink>
            )}
            <video
              preload="auto"
              className="d-none d-lg-flex d-xl-flex elementor-video"
              src="https://dypmeta.s3.us-east-2.amazonaws.com/dypius.mov"
              autoPlay={true}
              loop={true}
              muted="muted"
              playsInline={true}
              controlsList="nodownload"
              style={{
                maxWidth: "2400px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></video>
          </div>
          <div className="col-12 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start">
            <GlobalLeaderboard />
            {/* <NewHomeLeaderboard /> */}
          </div>
        </div>
        {windowSize.width > 992 && (
          <NavLink to={`/marketplace/events/treasure-hunt`}>
            <div className="opacitywrapper">
              <span
                className="popup-rewards d-flex text-white mb-2"
                style={{ fontSize: "24px" }}
              >
                Treasure Hunt
              </span>

              <Slider {...settings} ref={betaSlider}>
                {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                  <NavLink to={`/marketplace/events/treasure-hunt`}>
                    <BetaEventCardHome
                      data={item}
                      key={index}
                      isFrontPage={true}
                    />
                  </NavLink>
                ))}
              </Slider>
            </div>{" "}
          </NavLink>
        )}
        {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div className="system-requirements-modal p-3" id="reqmodal">
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="sys-req-title font-organetto">System</h6>
                <h6
                  className="sys-req-title font-organetto mb-3"
                  style={{ color: "#8c56ff" }}
                >
                  Requirements
                </h6>
              </div>
              <img
                src={xMark}
                alt="x mark"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <hr className="requirements-divider" />
            <div className="overall-requirements">
              <h6 className="requirements-title">World of Dypians</h6>
              <p className="requirements-content">
                A unique digital world where players can explore through endless
                maps hunting for rewards, special items and digital currency.
                The game features the main character and a cat (NFT) which will
                begin the journey to explore different lands together. World of
                Dypians is a game where players continuously shape the game and
                capture value from their achievements.
              </p>
              <h6 className="requirements-title">
                World of Dypians Minimum System Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X
                </li>
                <li className="requirements-content">Memory: 8 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4
                  GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 12 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
              <hr className="requirements-divider" />
              <h6 className="requirements-title">
                World of Dypians Recommended Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10/11</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X
                </li>
                <li className="requirements-content">Memory: 12 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA
                  56 8 GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 20 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center justify-content-center py-3">
              <h6 className="close-modal" onClick={() => setModal(false)}>
                Close
              </h6>
            </div>
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}

      {multiplayerModal === true ? (
        <OutsideClickHandler onOutsideClick={() => setmultiplayerModal(false)}>
          <div className="system-requirements-modal p-3" id="reqmodal">
            <div className="d-flex align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column gap-2">
                <h6 className="sys-req-title">World of Dypians Multiplayer</h6>
              </div>
              <img
                src={xMark}
                alt="x mark"
                style={{ cursor: "pointer" }}
                onClick={() => setmultiplayerModal(false)}
              />
            </div>

            <div className="overall-requirements">
              <h6 className="requirements-title">Closed Demo</h6>
              <p className="requirements-content">
                The World of Dypians Multiplayer you are about to experience is
                a closed demo specifically designed for testing purposes. This
                means that you are stepping into an environment that is still
                under development and not the final version of the game.
              </p>
              <h6 className="requirements-title">Basic Functionalities</h6>
              <p className="requirements-content">
                While the closed demo offers a glimpse into the vast potential
                of the World of Dypians Multiplayer, please be aware that some
                features and functionalities may be limited or subject to
                changes. The game is a work in progress, and your feedback will
                play a crucial role in shaping its final form.
              </p>

              <h6 className="requirements-title">Text and Voice Chat</h6>
              <p className="requirements-content">
                Communication is key in the World of Dypians Multiplayer, and
                during this closed demo, you can interact with fellow players
                through both text and voice chat functionalities.
              </p>

              <h6 className="requirements-title">
                Reporting Bugs and Feedback
              </h6>
              <p className="requirements-content">
                As you explore the world and encounter various elements, please
                keep an eye out for any bugs or issues. If you come across
                something unexpected or have suggestions for improvement, don't
                hesitate to provide feedback. Your input is immensely valuable
                in ensuring a smooth gaming experience for all.
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-center py-3">
              <a
                href="https://drive.google.com/drive/folders/1nS4HB9K9KZcJZWjS_AXV18At5gC0N96Z?usp=sharing"
                target={"_blank"}
                rel="noreferrer"
                onClick={() => {
                  setmultiplayerModal(false);
                }}
              >
                <div
                  className="linear-border"
                  style={{
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  <button className="btn filled-btn px-5">Download</button>
                </div>
              </a>
            </div>
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}
    </>
  );
};

export default VideoWrapper;
