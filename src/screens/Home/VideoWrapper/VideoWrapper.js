import React, { useEffect, useRef, useState } from "react";
import "./_videowrapper.scss";
import xMark from "../../../assets/navbarAssets/xMark.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import epicwhite from "../../../assets/epicwhite.svg";
import epicblack from "../../../assets/epicblack.svg";
import LeaderBoard from "../../../components/LeaderBoard/LeaderBoard";
import coingecko from "../../Marketplace/MarketNFTs/assets/coingecko.svg";
import coinbaseimg from "./assets/baseLogo.svg";
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
import taikoLogo from "./assets/taikoLogo.svg";
import mantaLogo from "./assets/mantaLogo.png";
import cookieLogo from "./assets/cookie3Logo.svg";

import coreBg from "./assets/coreBg.webp";
import immutableLogo from "./assets/immutableLogo.svg";
import immutableBg from "./assets/immutableBg.webp";

import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";
import NewHomeLeaderboard from "../../../components/LeaderBoard/NewHomeLeaderboard";
import GlobalLeaderboard from "../../../components/LeaderBoard/GlobalLeaderboard";
import axios from "axios";
import wodToken from "../../../assets/wodAssets/wodToken.svg";

const VideoWrapper = ({
  handleRegister,
  handleDownload,
  allStarData,
  monthlyPlayers,
  percent,
}) => {
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



  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");

  const dummyBetaPassData2 = [
    {
      link: "/token",
      title: "TOKEN",
      desc: "Power your gameplay with WOD",
      class: "tokenClass",
    },
    {
      link: "/earn",
      title: "Earn",
      desc: "Earn rewards by staking WOD tokens",
      class: "earnClass",
    },
    {
      link: "/account/challenges/treasure-hunt",
      title: "EVENTS",
      desc: "Join exciting in-game events",
      class: "eventClass",
    },
    {
      link: "/account#leaderboard",
      title: "LEADERBOARD",
      desc: "Compete for top player rankings",
      class: "leaderboardClass",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
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
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          infinite: true,
          autoplay: true,
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
        {/* <div
          className="row leaderboard-bg gap-4 gap-lg-0"
         
        > */}
        <div className="">
          <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center">
            <h4 className="main-hero-title font-montserrat">
              The Biggest Metaverse
              <br />
              Ever Built
            </h4>
            <div className="d-flex flex-column flex-lg-row flex-md-row m-0 gap-lg-5 gap-3 align-items-center justify-content-center">
              <div
                className="linear-border p-0"
                style={{
                  width: "fit-content",
                  zIndex: 5,
                  position: "relative",
                  textDecoration: "none",
                }}
              >
                <div className="opacitywrapper5 filled-btn m-0 px-3">
                  <a
                    className="game-event-download py-1 d-flex align-items-center gap-2"
                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                    target="_blank"
                  >
                    <img src={epicblack} alt="icon" className="epicgame2" />
                    Download
                  </a>
                </div>
              </div>
              <div
                className="multiplayer-linear-border col-lg-7 col-12"
                style={{
                  zIndex: 5,
                  position: "relative",
                  textDecoration: "none",
                }}
              >
                <button
                  className="btn multiplayer-btn py-1 px-3 d-flex align-items-center w-100 gap-2 justify-content-center"
                  onClick={() => {
                    setmultiplayerModal(true);
                  }}
                >
                  <img src={wodToken} alt="" />
                  Buy WoD
                </button>
              </div>
            </div>
            {/* <div className="join-beta-ribbon p-2 w-100">
                <NavLink to="join-beta">
                  <div className="d-flex justify-content-between gap-2 align-items-center">
                    <span className="joinbeta-white-txt">
                      Join Beta Program
                    </span>
                    <img src={whiteCircleArrow} alt="" />
                  </div>
                </NavLink>
              </div> */}
          </div>
          {windowSize.width < 992 && (
            <div
              className="opacitywrapper position-relative"
              style={{ width: "90%" }}
            >
              <Slider {...settings} ref={betaSlider}>
                {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                  <NavLink
                    to={`${item.link}`}
                    onClick={() => {
                      item.link === "/" && setModal(true);
                    }}
                      key={index}
                  >
                    <BetaEventCardHome
                      data={item}
                      isFrontPage={true}
                    />
                  </NavLink>
                ))}
              </Slider>
            </div>
          )}
          {/* <video
            preload="auto"
            className="d-none d-lg-flex d-xl-flex elementor-video"
            src="https://dypmeta.s3.us-east-2.amazonaws.com/dypius.mov"
            autoPlay={true}
            loop={true}
            muted="muted"
            playsInline={true}
            controlsList="nodownload"
            style={{
              // maxWidth: "2400px",
              width: "100%",
              height: "90vh",
              objectFit: "cover",
            }}
          ></video> */}
        </div>
        {/* <div className="col-12 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start"> */}
        {/* <GlobalLeaderboard /> */}
        {/* <NewHomeLeaderboard /> */}
        {/* </div> */}
        {/* </div> */}
        {windowSize.width > 992 && (
          <div className="opacitywrapper custom-container">
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                <NavLink
                  to={`${item.link}`}
                  onClick={() => {
                    item.link === "/" && setModal(true);
                  }}
                   key={index}
                >
                  <BetaEventCardHome
                    data={item}
                    isFrontPage={true}
                  />
                </NavLink>
              ))}
            </Slider>
          </div>
        )}
        {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div className="system-requirements-modal p-3" id="reqmodal">
            <div className="d-flex align-items-start justify-content-end">
              <img
                src={xMark}
                alt="x mark"
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <NewHomeLeaderboard />
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}

      {/* {multiplayerModal === true ? (
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
      )} */}
    </>
  );
};

export default VideoWrapper;
