import React, { useEffect, useRef, useState } from "react";
import "./_videowrapper.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, useLocation } from "react-router-dom";
import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";
import Slider from "react-slick";
import useWindowSize from "../../../hooks/useWindowSize";
import GlobalLeaderboard from "../../../components/LeaderBoard/GlobalLeaderboard";
import BuyWodCard from "../../../components/BuyWodCard/BuyWodCard";
import { motion } from "motion/react";
import "./binancetw.scss";

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
      title: "Binance Alpha",
      logo: "binance-alpha.png",
      link: "https://www.binance.com/en/alpha/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
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
      link: "https://www.binance.com/en/alpha/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
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
      title: "BingX",
      logo: "bingx.svg",
      link: "https://bingx.com/en/spot/WODUSDT",
    },
    {
      title: "WEEX",
      logo: "weex.svg",
      link: "https://www.weex.com/spot/WOD-USDT",
    },
    {
      title: "Toobit",
      logo: "toobit.svg",
      link: "https://www.toobit.com/en-US/spot/WOD_USDT",
    },
    {
      title: "KCEX",
      logo: "kcex.png",
      link: "https://www.kcex.com/exchange/WOD_USDT",
    },
    {
      title: "CoinRabbit",
      logo: "coinrabbit.png",
      link: "https://coinrabbit.io/exchange/",
    },
    {
      title: "HiBt",
      logo: "hibt.png",
      link: "https://hibt.com/trade/WOD-USDT",
    },
    {
      title: "Phemex",
      logo: "phemex.png",
      link: "https://phemex.com/trade/WOD-USDT",
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
      title: "Uphold",
      logo: "uphold.svg",
      link: "https://uphold.com/en-us/prices/crypto/wod",
    },
    {
      title: "Uniswap",
      logo: "uniswapBuyWod.png",
      link: "https://app.uniswap.org/explore/tokens/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "BVOX",
      logo: "bvoxBuyWod.png",
      link: "https://www.bvox.com/exchange/WOD/USDT",
    },
    {
      title: "Bitkan",
      logo: "bitkanBuyWod.png",
      link: "https://bitkan.com/trade/WOD-USDT",
    },
    {
      title: "Tothemoon",
      logo: "tothemoonBuyWod.png",
      link: "https://tothemoon.com/trading/WOD_USDT",
    },
    {
      title: "OpenOcean",
      logo: "openoceanBuyWod.png",
      link: "https://app.openocean.finance/swap/bsc/BNB/WOD_0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "Bitexen",
      logo: "bitexen.png",
      link: "https://global.bitexen.com/instant/trade/USDT_WOD",
    },
    {
      title: "Biconomy",
      logo: "biconomy.png",
      link: "https://www.biconomy.com/exchange/WOD_USDT",
    },

    {
      title: "SwissBorg",
      link: "https://swissborg.com/crypto-market/coins/world-of-dypians",
      logo: "swissborg.svg",
    },
    {
      title: "LetsExchange",
      logo: "https://cdn.worldofdypians.com/wod/letsexchangeLogo.svg",
      link: "https://letsexchange.io/?coin_from=usdt-bep20&coin_to=wod-bep20&sent_amount=120",
    },
  ];

  const sliderData = [
    {
      link: "/staking",
      title: "EARN",
      // desc: "",
      desc: "Earn rewards by staking WOD tokens",
      class: "earnClass",
    },
    {
      link: "/token",
      title: "TOKEN",
      desc: "Power your gameplay with WOD",
      class: "tokenClass",
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
      <div className="video-wrapper binance-alpha-wrapper-mobile position-relative h-100">
        {/* <div
          className="row gap-4 gap-lg-0"
         
        > */}
        <div className="video-second-wrapper">
          <NavLink
            className="absolute d-none d-lg-block left-4 top-32 z-5"
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
          <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center align-items-lg-center custom-container">
            <h4 className="main-hero-title-homepage font-montserrat">
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
            {/* <div className="d-flex flex-column flex-lg-row flex-md-row m-0 gap-lg-5 gap-3 align-items-center justify-content-center">
              <button
                className="btn multiplayer-btn py-2 px-5 d-flex align-items-center w-100 gap-2 justify-content-center"
                onClick={() => {
                  setBuyWodPopup(true);
                }}
              >
                Get WOD
              </button>
              <NavLink
                to={"/staking"}
                className="btn stake-wod-btn2 py-2 px-5 d-flex align-items-center w-100 gap-2 justify-content-center"
              >
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
            </div> */}

            <div
              className="relative  flex items-center justify-center z-5"
              style={{ height: "fit-content" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center max-w-2xl mx-auto px-6"
              >
                {/* Compact Announcement Card */}
                <motion.div
                  className="rounded-xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #5690FF 0%, #8C56FF 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                  initial={{ rotateX: 20 }}
                  animate={{ rotateX: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Shimmer sweep effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)",
                    }}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2,
                    }}
                  />

                  {/* Subtle particle overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
                      backgroundSize: "25px 25px",
                    }}
                  />

                  {/* Animated gradient orbs */}
                  <motion.div
                    className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
                    }}
                    animate={{
                      x: [0, 100, 0],
                      y: [0, 80, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-25"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                    }}
                    animate={{
                      x: [0, -80, 0],
                      y: [0, -60, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Title */}
                  <motion.h3
                    className="text-1xl md:text-2xl font-bold text-white mb-3 relative z-10 drop-shadow-lg"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Liquidity Catalyst Campaign
                  </motion.h3>

                  {/* Rewards Container */}
                  <motion.div
                    className="inline-block mb-6 relative z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <motion.div
                      className="px-6 py-3 rounded-full relative overflow-hidden"
                      style={{
                        background: "rgba(255, 255, 255, 0.25)",
                        border: "2px solid rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(10px)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(255, 255, 255, 0.3)",
                          "0 0 30px rgba(255, 255, 255, 0.5)",
                          "0 0 20px rgba(255, 255, 255, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.h5 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-0">
                        $200,000 Rewards
                      </motion.h5>
                    </motion.div>
                  </motion.div>

                  {/* Single Action Button */}
                  <motion.div
                    className="flex justify-center relative z-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink
                        to="/liquidity-catalyst"
                        className="font-bold px-8 py-3 rounded-md shadow-xl flex items-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 hover:bg-gray-100"
                      >
                        <span>Join Now</span>
                        {/* <ExternalLink className="w-4 h-4" /> */}
                      </NavLink>
                    </motion.div>
                  </motion.div>

                  {/* Corner decorations */}
                  <motion.div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full z-10 border-2 border-white/40"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-3 left-3 w-6 h-6 rounded-full z-10 border-2 border-white/30"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Glow effect */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 bg-white/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Edge glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                    }}
                    animate={{
                      boxShadow: [
                        "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                        "inset 0 0 30px rgba(255, 255, 255, 0.25)",
                        "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          {windowSize.width < 992 && (
            <div
              className="opacitywrapper position-relative"
              style={{ width: "90%" }}
            >
              <Slider {...settings} ref={betaSlider}>
                {sliderData.slice(0, 4).map((item, index) => (
                  <NavLink
                    to={`${item.link}`}
                    onClick={() => {
                      item.link === "/" && setModal(true);
                    }}
                    key={index}
                    target={item.title === "" ? "_blank" : "_self"}
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
            src="https://cdn.worldofdypians.com/wod/wodTrailer2025.mp4"
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
              {sliderData.slice(0, 4).map((item, index) => (
                <NavLink
                  to={`${item.link}`}
                  onClick={() => {
                    item.link === "/" && setModal(true);
                  }}
                  key={index}
                  target={item.title === "" ? "_blank" : "_self"}
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
