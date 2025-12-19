import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { Tooltip, styled, tooltipClasses } from "@mui/material";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Countdown from "react-countdown";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import Switch from "@mui/material/Switch";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
import RefreshIcon from "@mui/icons-material/Refresh";
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

const renderer2 = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-1 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time2 m-0 font-poppins">
          {days < 10 ? "0" + days : days}
        </h6>
        <span className="days fw-normal font-poppins">Days</span>
      </div>
      <h6 className="mint-time2 m-0 font-poppins">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time2 m-0 font-poppins">
          {hours < 10 ? "0" + hours : hours}
        </h6>
        <span className="days fw-normal font-poppins">Hours</span>
      </div>
      <h6 className="mint-time2 m-0 font-poppins">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time2 m-0 font-poppins">
          {minutes < 10 ? "0" + minutes : minutes}
        </h6>
        <span className="days fw-normal font-poppins">Minutes</span>
      </div>
    </div>
  );
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    display: "flex",
    justifyContent: "center",
    minWidth: "90px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const NewLeaderBoard = ({
  username,
  availableTime,
  email,
  isPremium,
  dailyplayerData,
  genesisData,
  allBnbData,
  allVanarData,
  allCoreData,
  allSkaleData,
  allVictionData,
  allMantaData,
  allBaseData,
  allTaikoData,
  // allMatData,
  // allTaraxaData,
  onPremiumClick,
  onGoldenpassClick,
  allSeiData,
  onFetchRecords,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  const [optionText, setOptionText] = useState("daily");
  const [optionText2, setOptionText2] = useState("bnb");
  const [hoverState, setHoverState] = useState("");
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [allData, setAllData] = useState([]);
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
    onFetchRecords(item);
  };

  useEffect(() => {
    handleOption(optionText2);
  }, [optionText2]);
  useEffect(() => {
    if (allBnbData && allBnbData.length > 0 && optionText2 === "bnb") {
      setAllData(allBnbData);
    }
    if (allBaseData && allBaseData.length > 0 && optionText2 === "base") {
      setAllData(allBaseData);
    }
    if (allCoreData && allCoreData.length > 0 && optionText2 === "core") {
      setAllData(allCoreData);
    }
    if (allMantaData && allMantaData.length > 0 && optionText2 === "manta") {
      setAllData(allMantaData);
    }
    // if (allMatData && allMatData.length > 0 && optionText2 === "matchain") {
    //   setAllData(allMatData);
    // }
    if (allSeiData && allSeiData.length > 0 && optionText2 === "sei") {
      setAllData(allSeiData);
    }
    if (allSkaleData && allSkaleData.length > 0 && optionText2 === "skale") {
      setAllData(allSkaleData);
    }
    if (allTaikoData && allTaikoData.length > 0 && optionText2 === "taiko") {
      setAllData(allTaikoData);
    }
    if (allVanarData && allVanarData.length > 0 && optionText2 === "vanar") {
      setAllData(allVanarData);
    }
    // if (allTaraxaData && allTaraxaData.length > 0 && optionText2 === "taraxa") {
    //   setAllData(allTaraxaData);
    // }
    if (
      allVictionData &&
      allVictionData.length > 0 &&
      optionText2 === "viction"
    ) {
      setAllData(allVictionData);
    }
  }, [
    allBnbData,
    allBaseData,
    allCoreData,
    allMantaData,
    // allMatData,
    allSeiData,
    allSkaleData,
    allTaikoData,
    allVictionData,
    allVanarData,
    // allTaraxaData,
  ]);

  // useEffect(() => {
  //   setAllData(allBnbData);
  // }, []);

  return (
    <>
      <div
        className="main-wrapper py-4 w-100 d-flex gap-4 mt-xxl-0 mt-lg-0 justify-content-center align-items-start"
        style={{ minHeight: "560px" }}
      >
        <div className="row w-100 px-2 px-lg-0 mx-0 gap-4 gap-lg-0">
          <div className="d-flex flex-column gap-3 col-12  px-0 px-lg-3 leaderboard-wrapper">
            <div className="d-none">
              {availableTime !== "0" && availableTime && (
                <Countdown
                  date={Number(availableTime) * 1000}
                  renderer={renderer}
                  onComplete={() => {
                    setcountdown();
                    setisActive(false);
                  }}
                />
              )}
            </div>
            <div className="d-flex flex-column flex-lg-row gap-3 align-items-start">
              <div className="d-flex flex-column gap-3 col-12 col-lg-5 h-auto justify-content-between">
                <div className="d-flex flex-column gap-2">
                  <span className="leaderboard-inner-title2 d-lg-block d-none">
                    Select Chain
                  </span>
                  <div className="new-leaderboard-btns-wrapper">
                    <div className="leaderboard-chains-container mt-0 gap-2 d-lg-grid d-flex">
                      <button
                        onMouseEnter={() => handleMouseEnter("bnb")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "bnb" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("bnb");
                          setAllData(allBnbData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "bnb"
                              ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                              : optionText2 !== "bnb" && hoverState === "bnb"
                              ? "https://cdn.worldofdypians.com/wod/bnbWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/bnbInactive.svg"
                          }
                          className={`${
                            optionText2 === "bnb"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "BNB Chain"
                          : windowSize.width < 786 && optionText2 === "bnb"
                          ? "BNB Chain"
                          : ""}
                      </button>
                      <button
                        onMouseEnter={() => handleMouseEnter("base")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "base" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("base");
                          setAllData(allBaseData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "base"
                              ? "https://cdn.worldofdypians.com/wod/base.svg"
                              : optionText2 !== "base" && hoverState === "base"
                              ? "https://cdn.worldofdypians.com/wod/baseWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/baseInactive.svg"
                          }
                          className={`${
                            optionText2 === "base"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Base"
                          : windowSize.width < 786 && optionText2 === "base"
                          ? "Base"
                          : ""}
                      </button>
                      <button
                        onMouseEnter={() => handleMouseEnter("core")}
                        onMouseLeave={handleMouseLeave}
                        className={` 
                    d-flex align-items-center gap-2
                    ${
                      optionText2 === "core" &&
                      "otheroptionsActive optionswrapper-bg-new"
                    } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("core");
                          setAllData(allCoreData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "core"
                              ? "https://cdn.worldofdypians.com/wod/core.svg"
                              : optionText2 !== "core" && hoverState === "core"
                              ? "https://cdn.worldofdypians.com/wod/coreWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/coreInactive.svg"
                          }
                          className={`${
                            optionText2 === "core"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "CORE"
                          : windowSize.width < 786 && optionText2 === "core"
                          ? "CORE"
                          : ""}
                      </button>
                      <button
                        onMouseEnter={() => handleMouseEnter("sei")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "sei" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("sei");
                          setAllData(allSeiData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "sei"
                              ? "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                              : optionText2 !== "sei" && hoverState === "sei"
                              ? "https://cdn.worldofdypians.com/wod/seiWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/seiInactive.svg"
                          }
                          className={`${
                            optionText2 === "sei"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Sei"
                          : windowSize.width < 786 && optionText2 === "sei"
                          ? "Sei"
                          : ""}
                      </button>
                      <button
                        onMouseEnter={() => handleMouseEnter("taiko")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "taiko" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("taiko");
                          setAllData(allTaikoData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "taiko"
                              ? "https://cdn.worldofdypians.com/wod/taiko.svg"
                              : optionText2 !== "taiko" &&
                                hoverState === "taiko"
                              ? "https://cdn.worldofdypians.com/wod/taikoWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/taikoInactive.svg"
                          }
                          className={`${
                            optionText2 === "taiko"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Taiko"
                          : windowSize.width < 786 && optionText2 === "taiko"
                          ? "Taiko"
                          : ""}
                      </button>

                      <button
                        onMouseEnter={() => handleMouseEnter("vanar")}
                        onMouseLeave={handleMouseLeave}
                        className={` 
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "vanar" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("vanar");
                          setAllData(allVanarData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "vanar"
                              ? "https://cdn.worldofdypians.com/wod/vanar.svg"
                              : optionText2 !== "vanar" &&
                                hoverState === "vanar"
                              ? "https://cdn.worldofdypians.com/wod/vanarWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/vanarInactive.svg"
                          }
                          vanar
                          className={`${
                            optionText2 === "vanar"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Vanar"
                          : windowSize.width < 786 && optionText2 === "vanar"
                          ? "Vanar"
                          : ""}
                      </button>
                      {/* <button
                        onMouseEnter={() => handleMouseEnter("taraxa")}
                        onMouseLeave={handleMouseLeave}
                        className={` 
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "taraxa" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("taraxa");
                          setAllData(allTaraxaData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "taraxa"
                              ? "https://cdn.worldofdypians.com/wod/taraxa.svg"
                              : optionText2 !== "taraxa" &&
                                hoverState === "taraxa"
                              ? "https://cdn.worldofdypians.com/wod/taraxaWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/taraxaInactive.svg"
                          }
                          taraxa
                          className={`${
                            optionText2 === "taraxa"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Taraxa"
                          : windowSize.width < 786 && optionText2 === "taraxa"
                          ? "Taraxa"
                          : ""}
                      </button> */}

                      <button
                        onMouseEnter={() => handleMouseEnter("manta")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "manta" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("manta");
                          setAllData(allMantaData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "manta"
                              ? "https://cdn.worldofdypians.com/wod/manta.png"
                              : optionText2 !== "manta" &&
                                hoverState === "manta"
                              ? "https://cdn.worldofdypians.com/wod/mantaWhite.png"
                              : "https://cdn.worldofdypians.com/wod/mantaInactive.png"
                          }
                          className={`${
                            optionText2 === "manta"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Manta"
                          : windowSize.width < 786 && optionText2 === "manta"
                          ? "Manta"
                          : ""}
                      </button>

                      <button
                        onMouseEnter={() => handleMouseEnter("skale")}
                        onMouseLeave={handleMouseLeave}
                        className={` 
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "skale" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("skale");
                          setAllData(allSkaleData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "skale"
                              ? "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                              : optionText2 !== "skale" &&
                                hoverState === "skale"
                              ? "https://cdn.worldofdypians.com/wod/skaleWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/skaleInactive.svg"
                          }
                          className={`${
                            optionText2 === "skale"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "SKALE"
                          : windowSize.width < 786 && optionText2 === "skale"
                          ? "SKALE"
                          : ""}
                      </button>
                      <button
                        onMouseEnter={() => handleMouseEnter("viction")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     
                     ${
                       optionText2 === "viction" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("viction");
                          setAllData(allVictionData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "viction"
                              ? "https://cdn.worldofdypians.com/wod/viction.svg"
                              : optionText2 !== "viction" &&
                                hoverState === "viction"
                              ? "https://cdn.worldofdypians.com/wod/victionWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/victionInactive.svg"
                          }
                          className={`${
                            optionText2 === "viction"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          style={{ borderRadius: "50%" }}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Viction"
                          : windowSize.width < 786 && optionText2 === "viction"
                          ? "Viction"
                          : ""}
                      </button>
                      {/* <button
                        onMouseEnter={() => handleMouseEnter("matchain")}
                        onMouseLeave={handleMouseLeave}
                        className={`
                     d-flex align-items-center gap-2
                     ${
                       optionText2 === "matchain" &&
                       "otheroptionsActive optionswrapper-bg-new"
                     } leaderboard-inactive-btn2 w-100`}
                        onClick={() => {
                          handleOption("matchain");
                          setAllData(allMatData);
                        }}
                      >
                        <img
                          src={
                            optionText2 === "matchain"
                              ? "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                              : optionText2 !== "matchain" &&
                                hoverState === "matchain"
                              ? "https://cdn.worldofdypians.com/wod/matchainWhite.svg"
                              : "https://cdn.worldofdypians.com/wod/matchainInactive.svg"
                          }
                          className={`${
                            optionText2 === "matchain"
                              ? "leaderboard-icon leaderboard-icon-active"
                              : "leaderboard-icon"
                          }`}
                          width={18}
                          height={18}
                          alt=""
                        />
                        {windowSize.width > 768
                          ? "Matchain"
                          : windowSize.width < 786 && optionText2 === "matchain"
                          ? "Matchain"
                          : ""}
                      </button> */}
                    </div>
                  </div>
                </div>

                <div className="new-leaderboard-btns-wrapper d-lg-block d-none">
                  <div className="d-flex flex-column gap-2">
                    <span className="new-leaderboard-desc-title">
                      Loyalty Program
                    </span>
                    <span className="new-leaderboard-desc">
                      Enjoy 90 days of gas-free transactions in the World of
                      Dypians ecosystem on every network reimbursed to cover the
                      gas costs for one transaction per day.
                    </span>
                    <div className="d-flex align-items-center justify-content-center">
                      <NavLink
                        to="/loyalty-program"
                        className="new-leaderboard-green-btn px-4 py-1"
                      >
                        Join
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="d-lg-flex d-none flex-column gap-2 ">
                  <span className="new-leaderboard-desc-title">
                    Boost Experience
                  </span>
                  <div
                    className="golden-pass-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2"
                    onClick={onGoldenpassClick}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/goldenPassBadge.png"
                        }
                        alt=""
                        style={{ width: 55, height: 55 }}
                      />
                      <div className="d-flex flex-column gap-0">
                        <span className="user-blue-rank">Boost Rewards</span>
                        <span
                          className="user-rank-text"
                          style={{
                            color: !availableTime ? "#F3BF09" : "#00D1B5",
                          }}
                        >
                          {!availableTime ? `Golden Pass` : "Activated"}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {!availableTime ? (
                        <button className="activate-btn px-3 py-1">
                          Activate
                        </button>
                      ) : (
                        <Countdown
                          date={Number(availableTime) * 1000}
                          renderer={renderer2}
                          onComplete={() => {
                            setcountdown();
                            setisActive(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <NavLink className="" to="/account/prime">
                    <div
                      className="total-stars-premium-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2"
                      onClick={onPremiumClick}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                          }
                          alt=""
                          style={{ width: 54, height: 50 }}
                        />
                        <div className="d-flex flex-column gap-0">
                          <span
                            className="user-blue-rank"
                            style={{ color: isPremium ? "#F3BF09" : "" }}
                          >
                            {!isPremium ? "Upgrade Status" : "Prime Enabled"}
                          </span>
                          <span className="user-rank-text">
                            {!isPremium ? "Prime" : ""}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {!isPremium ? (
                          <NavLink
                            className="activate-btn2 px-3 py-1"
                            to="/account/prime"
                            style={{
                              background: "#7E52D2",
                            }}
                            onClick={onPremiumClick}
                          >
                            Get
                          </NavLink>
                        ) : (
                          <NavLink
                            className="activate-btn2 px-3 py-1"
                            to="/account/prime"
                            style={{ background: "transparent" }}
                            onClick={onPremiumClick}
                          >
                            Lifetime
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>

              <div
                className="d-flex flex-column gap-2 tablewrapper position-relative w-100 justify-content-between"
                style={{ height: optionText === "genesis" ? "345px" : "100%" }}
              >
                <div className="d-lg-flex d-none align-items-center justify-content-between gap-2">
                  <span className="leaderboard-inner-title2 d-lg-flex d-none justify-content-end">
                    Daily
                  </span>
                  <span className="leaderboard-inner-title2 d-lg-flex d-none justify-content-end">
                    Top 100
                  </span>
                </div>
                {optionText !== "genesis" ? (
                  <div className={`position-relative`}>
                    {allData[0]?.loading === true ? (
                      <div className="coming-soon-position d-flex align-items-center justify-content-center">
                        <CircularProgress size={18} />
                      </div>
                    ) : (
                      //     optionText2 === "taraxa"  ? (
                      //     <div className="coming-soon-position d-flex flex-column align-items-center justify-content-center h-100 blur-lb">
                      //       <h6
                      //         className="mb-0 text-center"
                      //         style={{ fontSize: 18 }}
                      //       >
                      //         Coming Soon
                      //       </h6>
                      //       <h6
                      //         className="mb-0 text-center"
                      //         style={{ fontSize: 14 }}
                      //       >
                      //         The leaderboard is under maintenance.
                      //       </h6>
                      //       <h6
                      //         className="mb-0 text-center"
                      //         style={{ fontSize: 14 }}
                      //       >
                      //         The points and stars will be live tomorrow{" "}
                      //       </h6>
                      //     </div>
                      //   )
                      //   :
                      <></>
                    )}
                    {/* <img
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
                    /> */}
                    {/* <Slider
                      {...settings}
                      onInit={() => {
                        sliderRef.slickGoTo(0, true);
                      }}
                      ref={sliderRef}
                    > */}
                    {allData &&
                      allData.length > 0 &&
                      allData.slice(0, 1).map((leaderboard, index) => {
                        return (
                          <div
                            key={index}
                            className={`${
                              leaderboard.loading === true && "comingsoon-new"
                            } leaderboard-item2 monthly-skale d-flex flex-column gap-0 p-0`}
                          >
                            {/* <div className="d-flex w-100 justify-content-center position-relative leaderboard-title-wrapper p-2">
                              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                                {leaderboard.title}
                              </h6>
                              <div className="d-flex flex-column px-2 reset-time-wrapper">
                                <span className="reset-time-lb">
                                  Reset time
                                </span>
                                <span className="reset-time-lb-value">
                                  {leaderboard.reset}
                                </span>
                              </div>
                            </div> */}
                            <div className="position-relative">
                              <span className="d-flex align-items-center text-sm position-absolute p-2 gap-2 text-white">
                                <RefreshIcon fontSize="small" />
                                Updates every 1 min
                              </span>
                              <span className="top100-text">
                                {" "}
                                <OutsideClickHandler
                                  onOutsideClick={() => setTooltip(false)}
                                >
                                  <div className="d-flex align-items-center gap-2 position-relative">
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/tooltip.svg"
                                      }
                                      alt=""
                                      className="tooltip-icon"
                                      style={{
                                        cursor: "pointer",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                      onClick={() => setTooltip(!tooltip)}
                                    />
                                    <div
                                      className={`tooltip-wrapper p-3 ${
                                        tooltip && "tooltip-active"
                                      }`}
                                      style={{
                                        width: 115,
                                        height: 45,
                                        right: "20%",
                                      }}
                                    >
                                      <div className="d-flex flex-column p-2 reset-time-wrapper">
                                        <span className="reset-time-lb">
                                          Reset time
                                        </span>
                                        <span className="reset-time-lb-value">
                                          {leaderboard.reset}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </OutsideClickHandler>
                              </span>

                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/newLeaderboardBg.webp"
                                }
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <div className="p-2 pt-0 table-outer-margin">
                              <table className="playerTable w-100">
                                <tbody>
                                  <tr className="playerRow">
                                    <th
                                      className="playerHeader font-montserrat py-2"
                                      style={{ background: "#192050" }}
                                    >
                                      Rank
                                    </th>
                                    <th
                                      className="playerHeader font-montserrat py-2"
                                      style={{ background: "#192050" }}
                                    >
                                      Player
                                    </th>
                                    <th
                                      className="playerHeader text-center font-montserrat py-2"
                                      style={{ background: "#192050" }}
                                    >
                                      Score
                                    </th>

                                    <th
                                      className="playerHeader text-center font-montserrat py-2"
                                      style={{ background: "#192050" }}
                                    >
                                      {leaderboard.type === "stars"
                                        ? "Stars"
                                        : "Standard"}
                                    </th>
                                    {/* <th className="playerHeader text-center font-montserrat">
                                      {leaderboard.type === "stars"
                                        ? "Premium"
                                        : "Golden Pass"}
                                    </th> */}
                                  </tr>
                                  {allData &&
                                    allData.length > 0 &&
                                    inactiveBoard === false &&
                                    leaderboard.activeData.map(
                                      (item, index) => {
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
                                              {parseInt(index) + 1}
                                            </td>
                                            <td className="playerName col-3 font-montserrat">
                                              <div className="position-relative d-flex align-items-center">
                                                <img
                                                  src={
                                                    optionText2 === "bnb"
                                                      ? index + 1 <= 10
                                                        ? `https://cdn.worldofdypians.com/wod/globalRank${
                                                            index + 1
                                                          }.png`
                                                        : index + 1 >= 11 &&
                                                          index + 1 <= 15
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar1.png"
                                                        : index + 1 >= 16 &&
                                                          index + 1 <= 20
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar2.png"
                                                        : index + 1 >= 21 &&
                                                          index + 1 <= 25
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar3.png"
                                                        : index + 1 >= 26 &&
                                                          index + 1 <= 30
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar4.png"
                                                        : index + 1 >= 31 &&
                                                          index + 1 <= 35
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar5.png"
                                                        : index + 1 >= 36 &&
                                                          index + 1 <= 40
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar6.png"
                                                        : index + 1 >= 41 &&
                                                          index + 1 <= 45
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar7.png"
                                                        : index + 1 >= 46 &&
                                                          index + 1 <= 50
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar8.png"
                                                        : index + 1 >= 51 &&
                                                          index + 1 <= 55
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar9.png"
                                                        : index + 1 >= 56 &&
                                                          index + 1 <= 60
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar10.png"
                                                        : index + 1 >= 61 &&
                                                          index + 1 <= 65
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar11.png"
                                                        : index + 1 >= 66 &&
                                                          index + 1 <= 70
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar12.png"
                                                        : index + 1 >= 71 &&
                                                          index + 1 <= 75
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar13.png"
                                                        : index + 1 >= 76 &&
                                                          index + 1 <= 80
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar14.png"
                                                        : index + 1 >= 81 &&
                                                          index + 1 <= 85
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar15.png"
                                                        : index + 1 >= 86 &&
                                                          index + 1 <= 90
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar16.png"
                                                        : index + 1 >= 91 &&
                                                          index + 1 <= 95
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar17.png"
                                                        : "https://cdn.worldofdypians.com/wod/playerAvatar18.png"
                                                      : optionText2 === "manta"
                                                      ? index + 1 <= 10
                                                        ? `https://cdn.worldofdypians.com/wod/globalRank${
                                                            index + 1
                                                          }.png`
                                                        : index + 1 >= 11 &&
                                                          index + 1 <= 15
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar1.png"
                                                        : index + 1 >= 16 &&
                                                          index + 1 <= 20
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar2.png"
                                                        : index + 1 >= 21 &&
                                                          index + 1 <= 25
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar3.png"
                                                        : index + 1 >= 26 &&
                                                          index + 1 <= 30
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar4.png"
                                                        : index + 1 >= 31 &&
                                                          index + 1 <= 35
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar5.png"
                                                        : index + 1 >= 36 &&
                                                          index + 1 <= 40
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar6.png"
                                                        : index + 1 >= 41 &&
                                                          index + 1 <= 45
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar7.png"
                                                        : index + 1 >= 46 &&
                                                          index + 1 <= 50
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar8.png"
                                                        : index + 1 >= 51 &&
                                                          index + 1 <= 55
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar9.png"
                                                        : index + 1 >= 56 &&
                                                          index + 1 <= 60
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar10.png"
                                                        : index + 1 >= 61 &&
                                                          index + 1 <= 65
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar11.png"
                                                        : "https://cdn.worldofdypians.com/wod/playerAvatar12.png"
                                                      : optionText2 === "taiko"
                                                      ? index + 1 <= 10
                                                        ? `https://cdn.worldofdypians.com/wod/globalRank${
                                                            index + 1
                                                          }.png`
                                                        : index + 1 >= 11 &&
                                                          index + 1 <= 15
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar1.png"
                                                        : index + 1 >= 16 &&
                                                          index + 1 <= 20
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar2.png"
                                                        : index + 1 >= 21 &&
                                                          index + 1 <= 25
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar3.png"
                                                        : index + 1 >= 26 &&
                                                          index + 1 <= 30
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar4.png"
                                                        : index + 1 >= 31 &&
                                                          index + 1 <= 35
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar5.png"
                                                        : index + 1 >= 36 &&
                                                          index + 1 <= 40
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar6.png"
                                                        : index + 1 >= 41 &&
                                                          index + 1 <= 45
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar7.png"
                                                        : index + 1 >= 46 &&
                                                          index + 1 <= 50
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar8.png"
                                                        : index + 1 >= 51 &&
                                                          index + 1 <= 55
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar9.png"
                                                        : index + 1 >= 56 &&
                                                          index + 1 <= 60
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar10.png"
                                                        : index + 1 >= 61 &&
                                                          index + 1 <= 65
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar11.png"
                                                        : index + 1 >= 66 &&
                                                          index + 1 <= 70
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar12.png"
                                                        : index + 1 >= 71 &&
                                                          index + 1 <= 75
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar13.png"
                                                        : index + 1 >= 76 &&
                                                          index + 1 <= 80
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar14.png"
                                                        : index + 1 >= 81 &&
                                                          index + 1 <= 85
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar15.png"
                                                        : "https://cdn.worldofdypians.com/wod/playerAvatar16.png"
                                                      : optionText2 === "sei"
                                                      ? index + 1 <= 10
                                                        ? `https://cdn.worldofdypians.com/wod/globalRank${
                                                            index + 1
                                                          }.png`
                                                        : index + 1 >= 11 &&
                                                          index + 1 <= 15
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar1.png"
                                                        : index + 1 >= 16 &&
                                                          index + 1 <= 20
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar2.png"
                                                        : index + 1 >= 21 &&
                                                          index + 1 <= 25
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar3.png"
                                                        : index + 1 >= 26 &&
                                                          index + 1 <= 30
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar4.png"
                                                        : index + 1 >= 31 &&
                                                          index + 1 <= 35
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar5.png"
                                                        : index + 1 >= 36 &&
                                                          index + 1 <= 40
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar6.png"
                                                        : index + 1 >= 41 &&
                                                          index + 1 <= 45
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar7.png"
                                                        : index + 1 >= 46 &&
                                                          index + 1 <= 50
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar8.png"
                                                        : index + 1 >= 51 &&
                                                          index + 1 <= 55
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar9.png"
                                                        : index + 1 >= 56 &&
                                                          index + 1 <= 60
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar10.png"
                                                        : index + 1 >= 61 &&
                                                          index + 1 <= 65
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar11.png"
                                                        : index + 1 >= 66 &&
                                                          index + 1 <= 70
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar12.png"
                                                        : index + 1 >= 71 &&
                                                          index + 1 <= 75
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar13.png"
                                                        : index + 1 >= 76 &&
                                                          index + 1 <= 80
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar14.png"
                                                        : index + 1 >= 81 &&
                                                          index + 1 <= 85
                                                        ? "https://cdn.worldofdypians.com/wod/playerAvatar15.png"
                                                        : "https://cdn.worldofdypians.com/wod/playerAvatar16.png"
                                                      : index + 1 <= 10
                                                      ? `https://cdn.worldofdypians.com/wod/globalRank${
                                                          index + 1
                                                        }.png`
                                                      : index + 1 >= 11 &&
                                                        index + 1 <= 15
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar1.png"
                                                      : index + 1 >= 16 &&
                                                        index + 1 <= 20
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar2.png"
                                                      : index + 1 >= 21 &&
                                                        index + 1 <= 25
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar3.png"
                                                      : index + 1 >= 26 &&
                                                        index + 1 <= 30
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar4.png"
                                                      : index + 1 >= 31 &&
                                                        index + 1 <= 35
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar5.png"
                                                      : index + 1 >= 36 &&
                                                        index + 1 <= 40
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar6.png"
                                                      : index + 1 >= 41 &&
                                                        index + 1 <= 45
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar7.png"
                                                      : index + 1 >= 46 &&
                                                        index + 1 <= 50
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar8.png"
                                                      : index + 1 >= 51 &&
                                                        index + 1 <= 55
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar9.png"
                                                      : index + 1 >= 56 &&
                                                        index + 1 <= 60
                                                      ? "https://cdn.worldofdypians.com/wod/playerAvatar10.png"
                                                      : "https://cdn.worldofdypians.com/wod/playerAvatar11.png"
                                                  }
                                                  alt=""
                                                  className="playerAvatar me-2"
                                                />{" "}
                                                {item.displayName?.slice(0, 10)}
                                                {item.displayName?.length >
                                                  10 && "..."}
                                              </div>
                                            </td>
                                            <td className="playerScore col-3 text-center font-montserrat">
                                              {getFormattedNumber(
                                                item.statValue,
                                                0
                                              )}
                                            </td>
                                            {leaderboard.type === "stars" ? (
                                              <td
                                                className={`playerReward text-center col-1 font-montserrat ${
                                                  username === item.displayName
                                                    ? "goldenscore"
                                                    : "playerReward"
                                                }`}
                                              >
                                                <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                                  <img
                                                    width={18}
                                                    height={18}
                                                    src={
                                                      "https://cdn.worldofdypians.com/wod/lbStar.png"
                                                    }
                                                    alt=""
                                                  />
                                                  <span
                                                    className="leaderboard-text"
                                                    style={{ color: "#fff" }}
                                                  >
                                                    {getFormattedNumber(
                                                      leaderboard.rewards[
                                                        index
                                                      ],
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
                                                      leaderboard.rewards[
                                                        index
                                                      ],
                                                      0
                                                    )}
                                                  </span>
                                                </div>
                                              </td>
                                            )}
                                          </tr>
                                        );
                                      }
                                    )}

                                  {allData &&
                                    inactiveBoard === true &&
                                    allData.length > 0 &&
                                    leaderboard.previousData.map(
                                      (item, index) => {
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
                                                    src={
                                                      "https://cdn.worldofdypians.com/wod/premiumAvatar.png"
                                                    }
                                                    alt=""
                                                    className="playerAvatar me-2"
                                                  />
                                                  <span>
                                                    {" "}
                                                    {item.displayName?.slice(
                                                      0,
                                                      10
                                                    )}
                                                    {item.displayName?.length >
                                                      10 && "..."}
                                                  </span>
                                                </div>
                                              ) : (
                                                <div className="position-relative d-flex align-items-center">
                                                  <img
                                                    src={
                                                      "https://cdn.worldofdypians.com/wod/userAvatar2.png"
                                                    }
                                                    alt=""
                                                    className="playerAvatar me-2"
                                                  />{" "}
                                                  {item.displayName?.slice(
                                                    0,
                                                    10
                                                  )}
                                                  {item.displayName?.length >
                                                    10 && "..."}
                                                </div>
                                              )}
                                            </td>
                                            <td className="playerScore col-3 text-center font-montserrat">
                                              {getFormattedNumber(
                                                item.statValue,
                                                0
                                              )}
                                            </td>
                                            {leaderboard.type === "stars" ? (
                                              <td
                                                className={`playerReward text-center col-1 font-montserrat ${
                                                  username === item.displayName
                                                    ? "goldenscore"
                                                    : "playerReward"
                                                }`}
                                              >
                                                <div className="d-flex align-items-center justify-content-start ms-2 ms-lg-4 gap-1">
                                                  <img
                                                    width={18}
                                                    height={18}
                                                    src={
                                                      "https://cdn.worldofdypians.com/wod/lbStar.png"
                                                    }
                                                    alt=""
                                                  />
                                                  <span
                                                    className="leaderboard-text"
                                                    style={{ color: "#fff" }}
                                                  >
                                                    {getFormattedNumber(
                                                      leaderboard
                                                        .previous_rewards[
                                                        index
                                                      ],
                                                      0
                                                    )}
                                                  </span>
                                                </div>
                                              </td>
                                            ) : (
                                              <td
                                                className={`playerReward text-center col-1 font-montserrat ${
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
                                                    {optionText2 !== "skale"
                                                      ? getFormattedNumber(
                                                          leaderboard.rewards[
                                                            index
                                                          ],
                                                          0
                                                        )
                                                      : getFormattedNumber(
                                                          leaderboard
                                                            .past_rewards[
                                                            index
                                                          ],
                                                          0
                                                        )}
                                                  </span>
                                                </div>
                                              </td>
                                            )}
                                          </tr>
                                        );
                                      }
                                    )}

                                  {inactiveBoard === true &&
                                    dailyplayerData.length === 0 &&
                                    optionText === "daily" &&
                                    optionText !== "genesis" && (
                                      <CircularProgress
                                        size={18}
                                        style={{
                                          alignSelf: "center",
                                          margin: "auto",
                                        }}
                                      />
                                    )}
                                </tbody>
                              </table>
                            </div>{" "}
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
                                        {leaderboard.player_data.statValue >
                                        0 ? (
                                          <>
                                            {getFormattedNumber(
                                              parseInt(
                                                leaderboard.player_data.position
                                              ) + 1,
                                              0
                                            )}
                                          </>
                                        ) : (
                                          <span style={{ fontSize: 10 }}>
                                            No Rank
                                          </span>
                                        )}
                                      </td>
                                      <td className="playerName col-3 font-montserrat">
                                        <div className="position-relative  d-flex align-items-center">
                                          {availableTime !== "0" &&
                                          availableTime &&
                                          availableTime !== undefined ? (
                                            <div className="position-relative d-flex align-items-center">
                                              <img
                                                src={
                                                  "https://cdn.worldofdypians.com/wod/premiumAvatar.png"
                                                }
                                                alt=""
                                                className="playerAvatar"
                                              />
                                              <img
                                                src={
                                                  "https://cdn.worldofdypians.com/wod/premiumStar.png"
                                                }
                                                alt=""
                                                className="premium-star"
                                              />
                                              <span>
                                                {" "}
                                                {leaderboard.player_data.displayName?.slice(
                                                  0,
                                                  13
                                                )}
                                                {leaderboard.player_data
                                                  .displayName?.length > 13 &&
                                                  "..."}
                                              </span>
                                            </div>
                                          ) : (
                                            <>
                                              <img
                                                src={
                                                  "https://cdn.worldofdypians.com/wod/userAvatar2.png"
                                                }
                                                alt=""
                                                className="playerAvatar"
                                                style={{
                                                  filter: "grayscale(1)",
                                                }}
                                              />{" "}
                                              {leaderboard.player_data.displayName?.slice(
                                                0,
                                                13
                                              )}
                                              {leaderboard.player_data
                                                .displayName?.length > 13 &&
                                                "..."}
                                            </>
                                          )}
                                        </div>
                                      </td>
                                      <td className="playerScore col-3 text-center font-montserrat">
                                        {getFormattedNumber(
                                          leaderboard.player_data.statValue,
                                          0
                                        )}
                                      </td>
                                      {leaderboard.type === "stars" ? (
                                        <td
                                          className={`playerReward text-center col-1 font-montserrat ${
                                            username ===
                                            leaderboard.player_data.displayName
                                              ? "playerReward"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-center ms-2 me-4 gap-1">
                                            <img
                                              width={18}
                                              height={18}
                                              src={
                                                "https://cdn.worldofdypians.com/wod/lbStar.png"
                                              }
                                              alt=""
                                            />
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              {getFormattedNumber(
                                                leaderboard.player_data
                                                  .statValue === 0
                                                  ? 0
                                                  : leaderboard.rewards[
                                                      leaderboard.player_data
                                                        .position
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
                                          className={`playerReward text-center col-1 font-montserrat ${
                                            username ===
                                            leaderboard.player_data.displayName
                                              ? "playerReward"
                                              : "playerReward"
                                          }`}
                                        >
                                          <div className="d-flex align-items-center justify-content-center ms-2 me-lg-4 gap-1">
                                            <span
                                              className="leaderboard-text"
                                              style={{ color: "#fff" }}
                                            >
                                              $
                                              {getFormattedNumber(
                                                leaderboard.rewards[
                                                  leaderboard.player_data
                                                    .position
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
                                      {/* {leaderboard.type === "stars" ? (
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
                                              className="leaderboard-text d-flex"
                                              style={{
                                                color:
                                                  (isPremium &&
                                                    username ===
                                                      leaderboard.player_data
                                                        .displayName) ||
                                                  username !==
                                                    leaderboard.player_data
                                                      .displayName
                                                    ? "#fff"
                                                    : "gray",
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              + <img src={"https://cdn.worldofdypians.com/wod/lbStar.png"} width={18} height={18} alt="" />
                                              {getFormattedNumber(
                                                leaderboard.rewards[
                                                  leaderboard.player_data
                                                    .position
                                                ]
                                                  ? leaderboard.rewards[
                                                      leaderboard.player_data
                                                        .position
                                                    ]
                                                  : 0,
                                                0
                                              )}
                                            </span>
                                            <HtmlTooltip
                                              placement="top"
                                              title={
                                                <span className="card-eth-chain-text">
                                                  Premium
                                                </span>
                                              }
                                            >
                                              <img
                                                src={
                                                  (isPremium &&
                                                    username ===
                                                      leaderboard.player_data
                                                        .displayName) ||
                                                  username !==
                                                    leaderboard.player_data
                                                      .displayName
                                                    ? premiumIcon
                                                    : premiumInactive
                                                }
                                                alt=""
                                              />
                                            </HtmlTooltip>
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
                                              style={{
                                                color:
                                                  (username ===
                                                    leaderboard.player_data
                                                      .displayName &&
                                                    isactive === true) ||
                                                  username !==
                                                    leaderboard.player_data
                                                      .displayName
                                                    ? "#fff"
                                                    : "gray",
                                              }}
                                            >
                                              +$
                                              {getFormattedNumber(
                                                leaderboard.rewards[
                                                  leaderboard.player_data
                                                    .position
                                                ]
                                                  ? leaderboard.rewards[
                                                      leaderboard.player_data
                                                        .position
                                                    ]
                                                  : 0,
                                                0
                                              )}
                                            </span>
                                            <HtmlTooltip
                                              placement="top"
                                              title={
                                                <span className="card-eth-chain-text">
                                                  Golden Pass
                                                </span>
                                              }
                                            >
                                              <img
                                                src={
                                                  (username ===
                                                    leaderboard.player_data
                                                      .displayName &&
                                                    isactive === true) ||
                                                  username !==
                                                    leaderboard.player_data
                                                      .displayName
                                                    ? goldenActive
                                                    : goldenInactive
                                                }
                                                alt=""
                                              />
                                            </HtmlTooltip>
                                          </div>
                                        </td>
                                      )} */}
                                    </tr>
                                  </tbody>
                                </table>
                              )}
                          </div>
                        );
                      })}
                    {/* </Slider> */}
                  </div>
                ) : (
                  <ComingSoon
                    optionText={optionText}
                    data={genesisData}
                    username={username}
                    inactiveBoard={inactiveBoard}
                  />
                )}{" "}
                <div className={`optionsWrapper2  p-2`}>
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
        </div>
      </div>
    </>
  );
};

export default NewLeaderBoard;
