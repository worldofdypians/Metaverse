import React, { useEffect, useRef, useState } from "react";
import "./_videowrapper.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, useLocation } from "react-router-dom";
import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";
import GlobalLeaderboard from "../../../components/LeaderBoard/GlobalLeaderboard";
import BuyWodCard from "../../../components/BuyWodCard/BuyWodCard";

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
  // const [activeSlide, setActiveSlide] = useState();
  // const [showFirstNext, setShowFirstNext] = useState();
  const [hoverState, setHoverState] = useState(false);
  const [buyWodPopup, setBuyWodPopup] = useState(false);

  const downloader = useRef();
  const windowSize = useWindowSize();
  downloader?.current?.addEventListener("mouseenter", () => {
    setIcons(true);
  });
  downloader?.current?.addEventListener("mouseleave", () => {
    setIcons(false);
  });

  const location = useLocation();

  const reqmodal = document.querySelector("#reqmodal");
  const html = document.querySelector("html");

  const exchanges = [
    {
      title: "Kucoin",
      logo: "kucoinBuyWod.svg",
      link: "https://www.kucoin.com/trade/WOD-USDT",
    },
    {
      title: "Gate.io",
      logo: "gateBuyWod.svg",
      link: "https://www.gate.io/trade/WOD_USDT",
    },
    {
      title: "MEXC Global",
      logo: "mexcBuyWod.svg",
      link: "https://www.mexc.com/exchange/WOD_USDT",
    },
    {
      title: "Bitget",
      logo: "bitgetRound.png",
      link: "https://www.bitget.com/on-chain/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "Bitpanda",
      logo: "bitpandaLogo.svg",
      link: "https://www.bitpanda.com/en/prices/world-of-dypians-wod",
    },
    {
      title: "Binance Wallet",
      logo: "binanceWalletUpdated.svg",
      link: "https://www.binance.com/en/download",
    },
    {
      title: "OKX Wallet",
      logo: "okxConnect.svg",
      link: "https://web3.okx.com/token/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "PancakeSwap",
      logo: "pancakeSwapBuyWod.svg",
      link: "https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc",
    },
    // {
    //   title: "THENA",
    //   logo: "thenaBuyWod.svg",
    //   link: "https://thena.fi/swap?inputCurrency=BNB&outputCurrency=0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8&swapType=1",
    // },
    {
      title: "TrustWallet",
      logo: "trustWalletBuyWod.svg",
      link: "https://short.trustwallet.com/app-download",
    },
    {
      title: "ChangeNOW",
      logo: "changeNow.webp",
      link: "https://changenow.io/currencies/world-of-dypians",
    },
    {
      title: "BloFin",
      logo: "blofinBuywod.png",
      link: "https://blofin.com/spot/WOD-USDT",
    },
    {
      title: "CoinRabbit",
      logo: "coinrabbit.png",
      link: "https://coinrabbit.io/exchange/",
    },
  ];

  const dummyBetaPassData2 = [
    {
      link: "/token",
      title: "TOKEN",
      desc: "Power your gameplay with WOD",
      class: "tokenClass",
    },
    {
      link: "/staking",
      title: "EARN",
      desc: "Earn rewards by staking WOD tokens",
      class: "earnClass",
    },
    {
      link: "/game#challenges",
      title: "EVENTS & CHALLENGES",
      desc: "Join exciting in-game challenges",
      class: "eventClass",
    },
    {
      link: "/",
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
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // initialSlide: 0,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 0,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
          dots: false,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        betaSlider.current?.slickGoTo(0);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [betaSlider?.current]);

  useEffect(() => {
    if (modal === true || buyWodPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [modal, buyWodPopup]);

  useEffect(() => {
    if (window.location.hash === "#buy-wod") {
      setBuyWodPopup(true);
    }
  }, []);

  return (
    <>
      <div className="video-wrapper position-relative">
        {/* <div
          className="row gap-4 gap-lg-0"
         
        > */}
        <NavLink
          className="absolute d-none d-lg-block left-4 top-24 z-5"
          to="/keep-building"
        >
          <div className="group relative">
            <div
              className={`position-absolute top-0 end-0 bottom-0 start-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-20 rounded-2xl blur-xl group-hover:opacitytw-40 transition-all duration-500`}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-lg" />

            <div
              className={`position-relative bg-[rgba(8,11,42,1)] backdrop-blur-sm rounded-2xl p-8 bordertw border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 shadow-yellow-500/50 group-hover:shadow-3xl`}
            >
              <div className="text-center space-y-2">
                <div className="text-xl text-white tracking-wider">
                  <span className="text-uppercase bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent font-bold text-[20px]">
                    Keep Building
                  </span>
                </div>
                <div className="text-xs text-white uppercase tracking-widest">
                  Partner Program
                </div>
                <div className="sidebar-separator2 my-2"></div>
                <div className="flex justify-center items-center space-x-3 pt-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    <span className="text-gray-400 d-flex align-items-center gap-2 text-xs font-normal">
                      Powered by{" "}
                      <img
                        src="https://cdn.worldofdypians.com/wod/kickstarterBnb.png"
                        alt="powered by bnb chain"
                        className="h-4"
                      />
                    </span>
                  </div>
                  {/* <div className="flex items-center space-x-1">
                      <span className="text-emerald-400 text-xs">
                        Trusted by Partners
                      </span>
                    </div> */}
                </div>
              </div>

              {/* Animated border */}
              <div
                className={`position-absolute top-0 end-0 bottom-0 start-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 pointer-events-none`}
              ></div>
            </div>
          </div>
        </NavLink>
        <div className="">
          <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center align-items-lg-center custom-container">
            <h4 className="main-hero-title font-montserrat">
              {/* The Biggest Metaverse
              <br />
              Ever Built */}
              Shaping the Future of Gaming, DeFi, NFTs and AI
            </h4>
            {/* <div className="d-flex flex-column gap-2 p-3 token-launch-wrapper">
              <h6 className="release-date-title mb-0" >
                Token Launch in:
              </h6>
              <Countdown date={releaseDate} renderer={renderer} />
            </div> */}
            <div className="d-flex flex-column flex-lg-row flex-md-row m-0 gap-lg-5 gap-3 align-items-center justify-content-center">
              {/* <a
                  className="game-event-download py-2 px-5 d-flex align-items-center gap-2"
                  onMouseEnter={() => setHoverState(true)}
                  onMouseLeave={() => setHoverState(false)}
                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                  target="_blank"
                >
                  <img src={hoverState ? epicwhite : epicblack} alt="icon" className="epicgame2" />
                  Download
                </a> */}

              <button
                className="btn multiplayer-btn py-2 px-5 d-flex align-items-center w-100 gap-2 justify-content-center"
                onClick={() => {
                  setBuyWodPopup(true);
                }}
              >
                {/* <img src={buyWod} alt="" /> */}
                {/* Buy  */}
                Get WOD
              </button>
              <NavLink
                to={"/staking"}
                className="btn stake-wod-btn2 py-2 px-5 d-flex align-items-center w-100 gap-2 justify-content-center"
              >
                {/* <img src={buyWod} alt="" /> */}
                {/* Buy  */}
                Stake WOD
              </NavLink>
            </div>
            <div className="home-download-wrapper position-relative d-none d-lg-flex">
              <a
                href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                target="_blank"
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/homeEpicGames.svg"}
                  className="home-epic"
                  alt=""
                />
              </a>
              <img
                src={"https://cdn.worldofdypians.com/wod/homeLine.svg"}
                className="home-line"
                alt=""
              />
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
                    <BetaEventCardHome data={item} isFrontPage={true} />
                  </NavLink>
                ))}
              </Slider>
            </div>
          )}
          <video
            preload="auto"
            className="d-none d-lg-flex d-xl-flex elementor-video"
            src="https://cdn.worldofdypians.com/media/wodhomepage.mp4"
            autoPlay={true}
            loop={true}
            muted="muted"
            playsInline={true}
            controlsList="nodownload"
            style={{
              // maxWidth: "2400px",
              width: "100%",
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          ></video>
        </div>
        {/* <div className="col-12 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start"> */}
        {/* <GlobalLeaderboard /> */}
        {/* </div> */}
        {/* </div> */}
        {windowSize.width > 992 && (
          <div className="opacitywrapper custom-container ">
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                <NavLink
                  to={`${item.link}`}
                  onClick={() => {
                    item.link === "/" && setModal(true);
                  }}
                  key={index}
                >
                  <BetaEventCardHome data={item} isFrontPage={true} />
                </NavLink>
              ))}
            </Slider>
          </div>
        )}
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div
            className="system-requirements-modal p-3"
            id="reqmodal"
            style={{ background: "#1a1c39" }}
          >
            <div className="d-flex align-items-start justify-content-end">
              <img
                src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
                alt="x mark"
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <GlobalLeaderboard
              allStarData={allStarData}
              screen={"home"}
              leaderboardBtn="monthly"
            />
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}
      {buyWodPopup && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setBuyWodPopup(false);
            window.location.hash = "";
          }}
        >
          <div className="challenge-popup-wrapper popup-active p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="mb-0 buy-wod-popup-title">Get WOD</h6>
              <img
                src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
                width={22}
                height={22}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setBuyWodPopup(false);
                  window.location.hash = "";
                }}
                alt=""
              />
            </div>
            <div className="gap-2 buy-wod-items-wrapper">
              {exchanges.map((item, index) => (
                <BuyWodCard item={item} key={index} />
              ))}
            </div>
          </div>
        </OutsideClickHandler>
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
