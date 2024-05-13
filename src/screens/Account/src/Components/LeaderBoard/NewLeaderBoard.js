import React, { useState, useEffect, useRef } from "react";
import price1 from "../../Images/userProfile/price1.svg";
import price2 from "../../Images/userProfile/price2.svg";
import price3 from "../../Images/userProfile/price3.svg";
import { CircularProgress } from "@mui/material";
import playerAvatar from "../../Images/userProfile/userAvatar2.png";
import premiumAvatar from "../../Images/userProfile/premiumAvatar.png";
import premiumStar from "../../Images/userProfile/premiumStar.png";
import axios from "axios";
import Switch from "@mui/material/Switch";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
import tooltipIcon from "./tooltipIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { dyp700_abi } from "../../web3";
import Countdown from "react-countdown";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import skaleIcon from "./assets/skaleIcon.png";
import skaleIconGray from "./assets/skaleIconGray.svg";
import wodIcon from "./assets/wodIcon.png";
import bnbIcon from "./assets/bnbIcon.svg";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";
import coreActive from "./assets/coreActive.svg";
import coreInactive from "./assets/coreInactive.svg";
import victionActive from "./assets/victionActive.svg";
import victionInactive from "./assets/victionInactive.svg";
import multiversxActive from "./assets/multiversxActive.svg";
import seiActive from "./assets/seiActive.svg";
import seiInactive from "./assets/seiInactive.svg";
import Slider from "react-slick";
import bnbActive from "./assets/bnbActive.svg";
import bnbInactive from "./assets/bnbInactive.svg";
import skaleActive from "./assets/skaleActive.svg";
import skaleInactive from "./assets/skaleInactive.svg";
import wodActive from "./assets/wodActive.svg";
import wodInactive from "./assets/wodInactive.svg";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";
import premiumIcon from "./assets/premiumIcon.png";
import premiumInactive from "./assets/premiumInactive.svg";
import goldenActive from "./assets/goldenActive.png";
import goldenInactive from "./assets/goldenInactive.png";
import upgradeIcon from "./assets/upgradeIcon.svg";
import starIcon from "./assets/starIcon.svg";
import basicPlayer from "./assets/basicPlayer.png";
import premiumPlayer from "./assets/premiumPlayer.png";
import goldenPlayer from "./assets/goldenPlayer.png";
import goldenPremiumPlayer from "./assets/goldenPremiumPlayer.png";
import bnbWhite from "./assets/bnbWhite.svg";
import victionWhite from "./assets/victionWhite.svg";
import coreWhite from "./assets/coreWhite.svg";
import skaleWhite from "./assets/skaleWhite.svg";
import seiWhite from "./assets/seiWhite.svg";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};

const NewLeaderBoard = ({
  username,
  userId,
  dypBalancebnb,
  address,
  availableTime,
  email,
  coinbase,
  isPremium,
  dailyplayerData,
  weeklyplayerData,
  monthlyplayerData,
  genesisData,
  allBnbData,
  allSkaleData,
}) => {
  const chainItems = [
    {
      title: "BNB Chain",
      id: 0,
      image: bnbActive,
    },
    {
      title: "SKALE",
      id: 1,
      image: skaleActive,
    },
    {
      title: "CORE",
      id: 2,
      image: coreActive,
    },
    {
      title: "SEI",
      id: 3,
      image: seiActive,
    },
    {
      title: "Viction",
      id: 4,
      image: victionActive,
    },
  ];

  const placeholderplayerData = [
    {
      position: "0",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "1",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "2",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "3",
      displayName: "...",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "4",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "5",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "6",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "7",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "8",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "9",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
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

  const [optionText, setOptionText] = useState("daily");
  const [optionText2, setOptionText2] = useState("bnb");
  const [hoverState, setHoverState] = useState("");
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [bundlesBought, setbundlesBought] = useState(0);
  const [allData, setAllData] = useState([]);
  const [selectedChain, setSelectedChain] = useState(chainItems[0]);
  const sliderRef = useRef(null);
  const windowSize = useWindowSize();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleMouseEnter = (chain) => {
    setHoverState(chain);
  };

  const handleMouseLeave = () => {
    setHoverState("");
  };

  const handleOption = (item) => {
    setOptionText2(item);
  };

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const handlePrevChain = () => {
    if (selectedChain.id === 0) {
      return;
    } else {
      if (selectedChain.id - 1 === 0) {
        setAllData(allBnbData);
        setOptionText2("bnb")
      } else if (selectedChain.id - 1 === 1) {
        setAllData(allSkaleData);
        setOptionText2("skale")
      }
      else if (selectedChain.id - 1 === 2) {
        setAllData(allSkaleData);
        setOptionText2("core")
      }
      else if (selectedChain.id - 1 === 3) {
        setAllData(allSkaleData);
        setOptionText2("sei")
      }
      else if (selectedChain.id - 1 === 4) {
        setAllData(allSkaleData);
        setOptionText2("viction")
      }
      setSelectedChain(chainItems[selectedChain.id - 1]);
    }
  };
  const handleNextChain = () => {
    if (selectedChain.id === 4) {
      return;
    } else {
      if (selectedChain.id + 1 === 1) {
        setAllData(allSkaleData);
        setOptionText2("skale")
      }
      if (selectedChain.id + 1 === 2) {
        setAllData(allSkaleData);
        setOptionText2("core")
      }
      if (selectedChain.id + 1 === 3) {
        setAllData(allSkaleData);
        setOptionText2("sei")
      }
      if (selectedChain.id + 1 === 4) {
        setAllData(allSkaleData);
        setOptionText2("viction")
      }
      setSelectedChain(chainItems[selectedChain.id + 1]);
    }
  };

  useEffect(() => {
    handleOption(optionText2);
  }, [inactiveBoard]);

  useEffect(() => {
    if (
      availableTime === null ||
      availableTime === undefined ||
      availableTime === "0"
    ) {
      setisActive(false);
    } else setisActive(true);
  }, [availableTime]);

  useEffect(() => {
    getBundles();
  }, [address]);

  useEffect(() => {
    setOptionText2("bnb");
  }, []);

  useEffect(() => {
    if (countdown === null || countdown === undefined || countdown === "0") {
      setisActive(false);
    } else setisActive(true);
  }, [countdown]);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const today1 = new Date();

  useEffect(() => {
    setAllData(allBnbData);
  }, []);

  return (
    <>
      <div className="row w-100 justify-content-start"></div>
      <div
        className="main-wrapper py-4 w-100 d-flex gap-4 mt-xxl-0 mt-lg-0 justify-content-center align-items-start"
        style={{ minHeight: "560px" }}
      >
        <div className="row w-100 align-items-start gap-4 gap-lg-0">
          <div className="d-flex flex-column gap-3 col-12  px-0 px-lg-3 leaderboard-wrapper">
            <div className="d-none">
              {availableTime !== "0" && availableTime && (
                <Countdown
                  date={availableTime}
                  renderer={renderer}
                  onComplete={() => {
                    setcountdown();
                    setisActive(false);
                  }}
                />
              )}
            </div>
            {windowSize.width > 786 ? (
              <div className="d-flex align-items-center gap-1">
                <div className="optionsWrapper position-relative col-12">
                  <div
                    className={`optionswrapper-bg ${
                      optionText2 === "skale"
                        ? "move-1"
                        : optionText2 === "core"
                        ? "move-2"
                        : optionText2 === "sei"
                        ? "move-3"
                        : optionText2 === "viction"
                        ? "move-4"
                        : ""
                    }`}
                  ></div>
                  <div
                    className="d-flex gap-1 align-items-center justify-content-between position-relative"
                    style={{ height: 38 }}
                  >
                    <span
                      onMouseEnter={() => handleMouseEnter("bnb")}
                      onMouseLeave={handleMouseLeave}
                      className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "bnb" && "otheroptionsActive"
                     } optionText col-3`}
                      onClick={() => {
                        handleOption("bnb");
                        setAllData(allBnbData);
                      }}
                      style={{ width: "20%" }}
                    >
                      <img
                        src={
                          optionText2 === "bnb"
                            ? bnbActive
                            : optionText2 !== "bnb" && hoverState === "bnb"
                            ? bnbWhite
                            : bnbInactive
                        }
                        className={`${
                          optionText2 === "bnb"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {windowSize.width > 768
                        ? "BNB Chain"
                        : windowSize.width < 786 && optionText2 === "bnb"
                        ? "BNB Chain"
                        : ""}
                    </span>
                    <span
                      onMouseEnter={() => handleMouseEnter("skale")}
                      onMouseLeave={handleMouseLeave}
                      className={` 
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "skale" && "otheroptionsActive"
                     } optionText col-3`}
                      style={{ width: "20%" }}
                      onClick={() => {
                        handleOption("skale");
                        setAllData(allSkaleData);
                      }}
                    >
                      <img
                        src={
                          optionText2 === "skale"
                            ? skaleActive
                            : optionText2 !== "skale" && hoverState === "skale"
                            ? skaleWhite
                            : skaleInactive
                        }
                        className={`${
                          optionText2 === "skale"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {windowSize.width > 768
                        ? "SKALE"
                        : windowSize.width < 786 && optionText2 === "skale"
                        ? "SKALE"
                        : ""}
                    </span>
                    <span
                      onMouseEnter={() => handleMouseEnter("core")}
                      onMouseLeave={handleMouseLeave}
                      className={` 
                    d-flex align-items-center gap-2
                    ${
                      optionText2 === "core" && "otheroptionsActive"
                    } optionText col-3`}
                      style={{ width: "20%" }}
                      onClick={() => {
                        handleOption("core");
                        setAllData(allSkaleData);

                      }}
                    >
                      <img
                        src={
                          optionText2 === "core"
                            ? coreActive
                            : optionText2 !== "core" && hoverState === "core"
                            ? coreWhite
                            : coreInactive
                        }
                        className={`${
                          optionText2 === "core"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {windowSize.width > 768
                        ? "CORE"
                        : windowSize.width < 786 && optionText2 === "core"
                        ? "CORE"
                        : ""}
                    </span>
                    <span
                      onMouseEnter={() => handleMouseEnter("sei")}
                      onMouseLeave={handleMouseLeave}
                      className={`
                     d-flex align-items-center gap-2
                     
                     ${
                       optionText2 === "sei" && "otheroptionsActive"
                     } optionText col-3`}
                      style={{ width: "20%" }}
                      onClick={() => {
                        handleOption("sei");
                        setAllData(allSkaleData);

                      }}
                    >
                      <img
                        src={
                          optionText2 === "sei"
                            ? seiActive
                            : optionText2 !== "sei" && hoverState === "sei"
                            ? seiWhite
                            : seiInactive
                        }
                        className={`${
                          optionText2 === "sei"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                      {windowSize.width > 768
                        ? "Sei"
                        : windowSize.width < 786 && optionText2 === "sei"
                        ? "Sei"
                        : ""}
                    </span>
                    <span
                      onMouseEnter={() => handleMouseEnter("viction")}
                      onMouseLeave={handleMouseLeave}
                      className={`
                     d-flex align-items-center gap-2
                     
                     ${
                       optionText2 === "viction" && "otheroptionsActive"
                     } optionText col-3`}
                      style={{ width: "20%" }}
                      onClick={() => {
                        handleOption("viction");
                        setAllData(allSkaleData);

                      }}
                    >
                      <img
                        src={
                          optionText2 === "viction"
                            ? victionActive
                            : optionText2 !== "viction" &&
                              hoverState === "viction"
                            ? victionWhite
                            : victionInactive
                        }
                        className={`${
                          optionText2 === "viction"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                      {windowSize.width > 768
                        ? "Viction"
                        : windowSize.width < 786 && optionText2 === "viction"
                        ? "Viction"
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-1">
                <div className="optionsWrapper position-relative col-12">
                  <div className={`optionswrapper-bg w-100`}></div>
                  <div
                    className="d-flex gap-1 align-items-center justify-content-between position-relative"
                    style={{ height: 38 }}
                  >
                    <img
                      src={arrowLeft}
                      className="select-chain-arrow-left p-3"
                      onClick={handlePrevChain}
                      alt=""
                    />
                    <img
                      src={arrowRight}
                      className="select-chain-arrow-right p-3"
                      onClick={handleNextChain}
                      alt=""
                    />
                    <span
                      className={`
                   d-flex align-items-center gap-2
                   ${
                     optionText2 === "bnb" && "otheroptionsActive"
                   } optionText col-3`}
                      onClick={() => {
                        handleOption("bnb");
                        setAllData(allBnbData);
                      }}
                      style={{ width: "100%" }}
                    >
                      <img
                        src={selectedChain.image}
                        className={`${
                          optionText2 === "bnb"
                            ? "leaderboard-icon leaderboard-icon-active"
                            : "leaderboard-icon"
                        }`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {selectedChain.title}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div
              className="d-flex flex-column gap-2 tablewrapper position-relative"
              style={{ height: optionText === "genesis" ? "345px" : "384px" }}
            >
              {optionText2 === "bnb" || optionText2 === "skale" ?
            <>
            </>
            :
            <div className="coming-soon-position d-flex align-items-center justify-content-center">
              <h6 className="mb-0">Coming Soon</h6>
            </div>  
            }
              {optionText !== "genesis" ? (
                <div className="position-relative">
                  <img
                    src={leftArrow}
                    onClick={prevSlide}
                    className="left-arrow-leaderboard d-flex d-lg-none"
                    alt=""
                  />
                  <img
                    src={rightArrow}
                    onClick={nextSlide}
                    className="right-arrow-leaderboard d-flex d-lg-none"
                    alt=""
                  />
                  <Slider {...settings} ref={sliderRef}>
                    {allData.map((leaderboard, index) => (
                      <div
                        key={index}
                        className={`leaderboard-item ${optionText2 === "bnb" || optionText2 === "skale" ? "" : "blur-leaderboard"} monthly-skale d-flex flex-column gap-2 p-0`}
                      >
                        <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                          <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                            {leaderboard.title}
                          </h6>
                          <div className="d-flex flex-column px-2 reset-time-wrapper">
                            <span className="reset-time-lb">Reset time</span>
                            <span className="reset-time-lb-value">
                              {leaderboard.reset}
                            </span>
                          </div>
                        </div>
                        <div className="p-2">
                          <table className="playerTable w-100">
                            <tbody>
                              <tr className="playerRow">
                                <th className="playerHeader font-montserrat">
                                  Rank
                                </th>
                                <th className="playerHeader font-montserrat">
                                  Player
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  Score
                                </th>

                                <th className="playerHeader text-center font-montserrat">
                                  Standard
                                </th>
                                <th className="playerHeader text-center font-montserrat">
                                  {leaderboard.type === "stars"
                                    ? "Premium"
                                    : "Golden Pass"}
                                </th>
                              </tr>
                              {allData &&
                                allData.length > 0 &&
                                inactiveBoard === false &&
                                leaderboard.activeData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {optionText2 === "bnb" ||
                                              optionText2 === "skale" ? (
                                                <>
                                                  {" "}
                                                  {item.displayName?.slice(
                                                    0,
                                                    10
                                                  )}
                                                  {item.displayName?.length >
                                                    10 && "..."}
                                                </>
                                              ) : (
                                                "--"
                                              )}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {optionText2 === "bnb" ||
                                            optionText2 === "skale" ? (
                                              <>
                                                {" "}
                                                {item.displayName?.slice(0, 10)}
                                                {item.displayName?.length >
                                                  10 && "..."}
                                              </>
                                            ) : (
                                              "--"
                                            )}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {optionText2 === "bnb" ||
                                        optionText2 === "skale" ? (
                                          <>
                                            {getFormattedNumber(
                                              item.statValue,
                                              0
                                            )}
                                          </>
                                        ) : (
                                          "--"
                                        )}
                                      </td>
                                      {leaderboard.type === "stars" ? (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            {/* <img src={starIcon} alt="" /> */}
                                            $
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              {getFormattedNumber(
                                                leaderboard.rewards[index],
                                                0
                                              )}
                                            </span>
                                          </div>
                                        </td>
                                      ) : (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              $
                                              {getFormattedNumber(
                                                leaderboard.rewards[index],
                                                0
                                              )}
                                            </span>
                                          </div>
                                        </td>
                                      )}
                                      {leaderboard.type === "stars" ? (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{
                                                color: "rgb(243, 192, 9)",
                                              }}
                                            >
                                              {getFormattedNumber(
                                                leaderboard.premium_rewards[
                                                  index
                                                ],
                                                0
                                              )}
                                            </span>
                                            <img src={premiumInactive} alt="" />
                                          </div>
                                        </td>
                                      ) : (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-3 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{
                                                color: "rgb(243, 192, 9)",
                                                width: 35,
                                              }}
                                            >
                                              $
                                              {getFormattedNumber(
                                                leaderboard.premium_rewards[
                                                  index
                                                ],
                                                0
                                              )}
                                            </span>
                                            <img src={goldenInactive} alt="" />
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })}

                              {allData &&
                                inactiveBoard === true &&
                                allData.length > 0 &&
                                leaderboard.previousData.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`playerInnerRow ${
                                        inactiveBoard ||
                                        item.displayName === username
                                          ? "playerInnerRow-inactive"
                                          : null
                                      }`}
                                    >
                                      <td className="playerData col-1 font-montserrat">
                                        {parseInt(item.position) + 1}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        {item.displayName === username ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <span>
                                              {optionText2 === "bnb" ||
                                              optionText2 === "skale" ? (
                                                <>
                                                  {" "}
                                                  {item.displayName?.slice(
                                                    0,
                                                    10
                                                  )}
                                                  {item.displayName?.length >
                                                    10 && "..."}
                                                </>
                                              ) : (
                                                "--"
                                              )}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {optionText2 === "bnb" ||
                                            optionText2 === "skale" ? (
                                              <>
                                                {" "}
                                                {item.displayName?.slice(0, 10)}
                                                {item.displayName?.length >
                                                  10 && "..."}
                                              </>
                                            ) : (
                                              "--"
                                            )}
                                          </div>
                                        )}
                                      </td>
                                      <td className="playerScore col-2 text-center font-montserrat">
                                        {optionText2 === "bnb" ||
                                        optionText2 === "skale" ? (
                                          <>
                                            {getFormattedNumber(
                                              item.statValue,
                                              0
                                            )}
                                          </>
                                        ) : (
                                          "--"
                                        )}
                                      </td>
                                      {leaderboard.type === "stars" ? (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            {/* <img src={starIcon} alt="" /> */}
                                            $
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              {getFormattedNumber(
                                                leaderboard.rewards[index],
                                                0
                                              )}
                                            </span>
                                          </div>
                                        </td>
                                      ) : (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              $
                                              {getFormattedNumber(
                                                leaderboard.rewards[index],
                                                0
                                              )}
                                            </span>
                                          </div>
                                        </td>
                                      )}
                                      {leaderboard.type === "stars" ? (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{
                                                color: "rgb(243, 192, 9)",
                                              }}
                                            >
                                              {getFormattedNumber(
                                                leaderboard.premium_rewards[
                                                  index
                                                ],
                                                0
                                              )}
                                            </span>
                                            <img src={premiumInactive} alt="" />
                                          </div>
                                        </td>
                                      ) : (
                                        <td
                                          className={`playerReward text-center col-2 font-montserrat ${
                                            username === item.displayName
                                              ? "goldenscore"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-3 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{
                                                color: "rgb(243, 192, 9)",
                                                width: 35,
                                              }}
                                            >
                                              $
                                              {getFormattedNumber(
                                                leaderboard.premium_rewards[
                                                  index
                                                ],
                                                0
                                              )}
                                            </span>
                                            <img src={goldenInactive} alt="" />
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })}

                              {inactiveBoard === true &&
                                ((dailyplayerData.length === 0 &&
                                  optionText === "daily") ||
                                  (weeklyplayerData.length === 0 &&
                                    optionText === "weekly") ||
                                  (monthlyplayerData.length === 0 &&
                                    optionText === "monthly")) &&
                                optionText !== "genesis" && (
                                  <CircularProgress
                                    size={20}
                                    style={{
                                      alignSelf: "center",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                            </tbody>
                          </table>
                          {leaderboard.is_active === false &&
                            email &&
                            inactiveBoard === false &&
                            optionText !== "genesis" && (
                              <table className="playerTable w-100">
                                <tbody>
                                  <tr className={`playerInnerRow-inactive`}>
                                    <td
                                      className={`playerData font-montserrat ${
                                        optionText === "genesis"
                                          ? "col-2"
                                          : "col-1"
                                      }`}
                                    >
                                    {optionText2 === "bnb" || optionText2 === "skale" ? 
                                    <>
                                      {parseInt(
                                        leaderboard.player_data.position
                                      ) + 1}
                                    </>  
                                    : "--"
                                  }
                                    </td>
                                    <td className="playerName col-3 font-montserrat">
                                      <div className="position-relative  d-flex align-items-center">
                                        {availableTime !== "0" &&
                                        availableTime &&
                                        availableTime >= today1.getTime() &&
                                        availableTime !== undefined ? (
                                          <div className="position-relative d-flex align-items-center">
                                            <img
                                              src={premiumAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            <img
                                              src={premiumStar}
                                              alt=""
                                              className="premium-star"
                                            />
                                            <span>
                                              {optionText2 === "bnb" ||
                                              optionText2 === "skale" ? (
                                                <>
                                                  {" "}
                                                  {leaderboard.player_data.displayName?.slice(
                                                    0,
                                                    13
                                                  )}
                                                  {leaderboard.player_data
                                                    .displayName?.length > 13 &&
                                                    "..."}
                                                </>
                                              ) : (
                                                "--"
                                              )}
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={playerAvatar}
                                              alt=""
                                              className="playerAvatar"
                                            />
                                            {optionText2 === "bnb" ||
                                            optionText2 === "skale" ? (
                                              <>
                                                {" "}
                                                {leaderboard.player_data.displayName?.slice(
                                                  0,
                                                  13
                                                )}
                                                {leaderboard.player_data
                                                  .displayName?.length > 13 &&
                                                  "..."}
                                              </>
                                            ) : (
                                              "--"
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="playerScore col-2 text-center font-montserrat">
                                      {optionText2 === "bnb" ||
                                      optionText2 === "skale" ? (
                                        <>
                                          {getFormattedNumber(
                                            leaderboard.player_data.statValue,
                                            0
                                          )}
                                        </>
                                      ) : (
                                        "--"
                                      )}
                                    </td>
                                    {leaderboard.type === "stars" ? (
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username ===
                                          leaderboard.player_data.displayName
                                            ? "playerReward"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                          {/* <img src={starIcon} alt="" /> */}
                                          $
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            {getFormattedNumber(
                                              leaderboard.rewards[
                                                leaderboard.player_data.position
                                              ]
                                                ? leaderboard.rewards[
                                                    leaderboard.player_data
                                                      .position
                                                  ]
                                                : 0,
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    ) : (
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username ===
                                          leaderboard.player_data.displayName
                                            ? "playerReward"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "#fff" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              leaderboard.rewards[
                                                leaderboard.player_data.position
                                              ]
                                                ? leaderboard.rewards[
                                                    leaderboard.player_data
                                                      .position
                                                  ]
                                                : 0,
                                              0
                                            )}
                                          </span>
                                        </div>
                                      </td>
                                    )}
                                    {leaderboard.type === "stars" ? (
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username ===
                                          leaderboard.player_data.displayName
                                            ? "playerReward"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            {getFormattedNumber(
                                              leaderboard.rewards[
                                                leaderboard.player_data.position
                                              ]
                                                ? leaderboard.rewards[
                                                    leaderboard.player_data
                                                      .position
                                                  ]
                                                : 0,
                                              0
                                            )}
                                          </span>
                                          <img
                                            src={
                                              isPremium
                                                ? premiumIcon
                                                : premiumInactive
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </td>
                                    ) : (
                                      <td
                                        className={`playerReward text-center col-2 font-montserrat ${
                                          username ===
                                          leaderboard.player_data.displayName
                                            ? "playerReward"
                                            : "playerReward"
                                        }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                          <span
                                            className="leaderboard-text"
                                            style={{ color: "gray" }}
                                          >
                                            $
                                            {getFormattedNumber(
                                              leaderboard.rewards[
                                                leaderboard.player_data.position
                                              ]
                                                ? leaderboard.rewards[
                                                    leaderboard.player_data
                                                      .position
                                                  ]
                                                : 0,
                                              0
                                            )}
                                          </span>
                                          <img src={goldenInactive} alt="" />
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <ComingSoon
                  optionText={optionText}
                  data={genesisData}
                  username={username}
                  inactiveBoard={inactiveBoard}
                />
              )}
            </div>
            <div className={`optionsWrapper2 ${optionText2 === "bnb" || optionText2 === "skale" ? "" : "blur-leaderboard"} p-2`}>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <span className="viewWinners">View previous winners</span>
                  <Switch
                    {...label}
                    onChange={() => {
                      setInactiveBoard(!inactiveBoard);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLeaderBoard;
