import React, { useState, useEffect, useRef } from "react";
import playerAvatar from "./assets/userAvatar2.png";
import premiumAvatar from "./assets/premiumAvatar.png";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import cawsBadge from "./assets/cawsBadge2.png";
import genesisBadge from "./assets/genesisBadge2.png";
import tooltipIcon from "./assets/tooltip.svg";
import star from "./assets/star.svg";
import axios from "axios";
import Switch from "@mui/material/Switch";
import "./_leaderboard.scss";
import OutsideClickHandler from "react-outside-click-handler";
import Countdown from "react-countdown";
import useWindowSize from "../../hooks/useWindowSize";
import globalIcon from "./assets/globalRanks/globalIcon.png";
import goldenActive from "./assets/goldenActive.png";
import goldenInactive from "./assets/goldenInactive.png";
import { NavLink, useLocation } from "react-router-dom";
import bnbIcon from "./assets/bnbIcon.svg";
import victionActive from "./assets/victionActive.svg";
import mantaActive from "./assets/mantaActive.png";
import coreIcon from "./assets/coreIcon2.svg";
import baseLogo from "../../screens/Home/VideoWrapper/assets/baseLogo.svg";

import skaleActive from "./assets/skaleActive.svg";
import yellowArrow from "./assets/yellowArrow.svg";
import taikoLogo from "../../screens/Marketplace/MarketNFTs/assets/taikoLogo.svg";
import { Tooltip, styled, tooltipClasses } from "@mui/material";
import inactiveUserPfp from "./assets/inactiveUserPfp.png";

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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "90px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const GlobalLeaderboard = ({
  username,
  screen,
  allStarData,
  availableTime,
  monthlyPlayers,
  percent,
  leaderboardBtn,
}) => {
  const [tooltip, setTooltip] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const dummyPrizes = [
    "200",
    "100",
    "60",
    "30",
    "20",
    "20",
    "20",
    "20",
    "20",
    "20",
  ];
  const goldenRewards = [
    "400",
    "200",
    "140",
    "70",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];

  const location = useLocation();

  const [optionText2, setOptionText2] = useState("bnb");
  const [inactiveBoard, setInactiveBoard] = useState(false);
  // const [genesisData, setgenesisData] = useState([]);
  // const [previousgenesisData, setpreviousgenesisData] = useState([]);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  // const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  // useEffect(() => {
  //   handleOption(optionText);
  // }, [inactiveBoard]);

  useEffect(() => {
    if (
      availableTime === null ||
      availableTime === undefined ||
      availableTime == "0"
    ) {
      setisActive(false);
    } else setisActive(true);
  }, [availableTime]);

  useEffect(() => {
    setOptionText2("bnb");
  }, []);

  return (
    <div
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-4 position-relative"
      style={{
        alignSelf: !location.pathname.includes("account") && "baseline",
        minWidth: !location.pathname.includes("account") && "92%",
        maxWidth: !location.pathname.includes("account") && "92%",
      }}
    >
      {!location.pathname.includes("account") && (
        <div className="nft-hover d">
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="nft-hover-wrapper d-flex flex-column align-items-center">
              <div className="d-flex align-items-center nft-badges-wrapper gap-4 gap-lg-0">
                <a
                  href="https://opensea.io/collection/catsandwatchessocietycaws"
                  target="_blank"
                >
                  <img src={cawsBadge} alt="" className="opensea-badge" />
                </a>
                <a
                  href="https://opensea.io/collection/worldofdypians"
                  target="_blank"
                >
                  <img src={genesisBadge} alt="" className="opensea-badge" />
                </a>
              </div>
              <span
                className="nft-hover-desc"
                style={{ position: "relative", top: "-22px" }}
              >
                CAWS and WOD owners are granted VIP access and also benefit from
                appealing rewards.
              </span>
            </div>
            <div className="global-total-wrapper py-3 w-100 d-flex flex-column align-items-center justify-content-center">
              <div className="position-relative">
                <h6 className="global-total-players mb-0">
                  {getFormattedNumber(monthlyPlayers, 0)}
                </h6>
                <span className="monthly-players-percent">
                  +{getFormattedNumber(percent, 2)}%
                </span>
              </div>
              <span className="global-total-span">Monthly Players</span>
            </div>
          </div>
        </div>
      )}

      {/* <div className="grandPrices-wrapper position-relative"></div> */}
      <div
        className="leaderboard-item d-flex flex-column  w-100 p-0"
        style={{ background: "none" }}
      >
        <div className="global-leaderboard-banner d-flex align-items-center justify-content-between w-100 p-3 gap-3 position-relative">
          <div className="position-absolute" style={{ top: 8, right: 8 }}>
            <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
              <div className="d-flex align-items-center gap-2 position-relative">
                <img
                  src={tooltipIcon}
                  alt=""
                  className="tooltip-icon"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  onClick={() => setTooltip(!tooltip)}
                />
                <div
                  className={`tooltip-wrapper p-3 ${
                    tooltip && "tooltip-active"
                  }`}
                  style={{ width: 350, right: "20%" }}
                >
                  <p className="tooltip-content">
                    Discover the Global Leaderboard in World of Dypians—a
                    feature for global competition and rewards.
                    <br />
                    <br />
                    Participate in Daily Chain Leaderboards from BNB Chain,
                    SKALE, Core, Manta, Base, Taiko and Viction to earn STARS
                    that will boost your global ranking.
                    <br />
                    <br />
                    Premium Subscribers earn extra STARS from Daily
                    Leaderboards, improving competitiveness and progression.
                    <br />
                    <br />
                    Golden Pass Bundle owners earn extra rewards based on their
                    global leaderboard ranking.
                    <br />
                    <br />
                    The leaderboard resets weekly and monthly, offering new chances to
                    climb and show your skills.
                    <br />
                    <br />
                    <b>Leaderboard Update Time: Daily (00:00 UTC)</b>
                  </p>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          {screen !== "dash" && (
            <div className="d-flex flex-column">
              <h6 className="global-leaderboard-title mb-0">GLOBAL</h6>
              <h6
                className="global-leaderboard-title d-flex algin-items-center"
                style={{ color: "#F4E27B" }}
              >
                LEADERBOARD
              </h6>
            </div>
          )}
          <img
            src={globalIcon}
            alt=""
            className={screen === "dash" && "invisible"}
          />
        </div>
        <div className={` ${screen !== "home" && "table-outer-margin"}  p-0`}>
          <table className="playerTable w-100" style={{ position: "relative" }}>
            <tbody>
              <tr className="playerRow">
                <th
                  className="playerHeader font-montserrat"
                  style={{ lineHeight: "25px", background: "#0E111E" }}
                >
                  Rank
                </th>
                <th
                  className="playerHeader font-montserrat"
                  style={{ lineHeight: "25px", background: "#0E111E" }}
                >
                  Player
                </th>
                <th
                  className="playerHeader text-center font-montserrat"
                  style={{ lineHeight: "25px", background: "#0E111E" }}
                >
                  Collected Stars
                </th>
                <th
                  className="playerHeader text-center font-montserrat"
                  style={{ lineHeight: "25px", background: "#0E111E" }}
                >
                  Reward
                </th>
                <th
                  className="playerHeader text-center font-montserrat"
                  style={{ lineHeight: "25px", background: "#0E111E" }}
                >
                  Extra Rewards
                </th>
              </tr>
              {allStarData.activeData &&
                allStarData.activeData.length > 0 &&
                inactiveBoard === false &&
                leaderboardBtn === "monthly" &&
                allStarData.activeData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`playerInnerRow ${
                        inactiveBoard || item.displayName === username
                          ? "playerInnerRow-inactive"
                          : null
                      }`}
                    >
                      <td className="playerData col-1 font-montserrat">
                        {parseInt(index) + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                        <div className="playerName-inner">
                          <img
                            src={
                              index + 1 <= 10
                                ? require(`./assets/globalRanks/globalRank${
                                    index + 1
                                  }.png`)
                                : playerAvatar
                            }
                            alt=""
                            className="playerAvatar me-2"
                          />
                          <span>
                            {" "}
                            {item.displayName?.slice(0, 13)}
                            {item.displayName?.length > 13 && "..."}
                          </span>
                        </div>
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <img src={star} alt="" />
                          {getFormattedNumber(item.statValue, 0)}
                        </div>
                      </td>
                      <td
                        className={`playerScore col-2 text-center font-montserrat  ${
                          username === item.displayName
                            ? "goldenscore"
                            : "playerReward"
                        }`}
                        style={{ color: "#09F3D2" }}
                      >
                        ${getFormattedNumber(allStarData.rewards[index], 0)}
                      </td>
                      <td
                        className={`playerScore col-2 text-center font-montserrat d-flex align-items-center gap-2 w-100 ${
                          username === item.displayName && isactive === true
                            ? "goldenscore"
                            : "playerReward"
                        }`}
                        style={{
                          color:
                            (username === item.displayName &&
                              isactive === true) ||
                            username !== item.displayName
                              ? "#09F3D2"
                              : "gray",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-end me-2 me-lg-3 gap-1 w-100">
                          $
                          {getFormattedNumber(
                            allStarData.premium_rewards[index],
                            0
                          )}
                          {screen === "home" ? (
                            <HtmlTooltip
                              placement="top"
                              title={
                                <span className="card-eth-chain-text">
                                  Golden Pass
                                </span>
                              }
                            >
                              <img src={goldenActive} alt="" />
                            </HtmlTooltip>
                          ) : (
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
                                  (username === item.displayName &&
                                    isactive === true) ||
                                  username !== item.displayName
                                    ? goldenActive
                                    : goldenInactive
                                }
                                alt=""
                              />
                            </HtmlTooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {allStarData.previousData &&
                inactiveBoard === true &&
                leaderboardBtn === "monthly" &&
                allStarData.previousData.length > 0 &&
                allStarData.previousData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`playerInnerRow ${
                        inactiveBoard || item.displayName === username
                          ? "playerInnerRow-inactive"
                          : null
                      }`}
                    >
                      <td className="playerData col-1 font-montserrat">
                        {Number(item.position) + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                        <img
                          src={
                            index + 1 <= 10
                              ? require(`./assets/globalRanks/globalRank${
                                  index + 1
                                }.png`)
                              : playerAvatar
                          }
                          alt=""
                          className="playerAvatar me-2"
                        />
                        <span>
                          {" "}
                          {item.displayName?.slice(0, 13)}
                          {item.displayName?.length > 13 && "..."}
                        </span>
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <img src={star} alt="" />
                          {getFormattedNumber(item.statValue, 0)}
                        </div>
                      </td>
                      <td
                        className="playerScore col-2 text-center font-montserrat"
                        style={{ color: "#09F3D2" }}
                      >
                        ${getFormattedNumber(dummyPrizes[item.position], 0)}
                      </td>
                      <td
                        className="playerScore col-2 text-center font-montserrat d-flex align-items-center gap-2 w-100"
                        style={{ color: "#09F3D2" }}
                      >
                        <div className="d-flex align-items-center justify-content-end me-2 me-lg-3 gap-1 w-100">
                          +$
                          {getFormattedNumber(goldenRewards[item.position], 0)}
                          <img
                            src={
                              (username === item.displayName &&
                                isactive === true) ||
                              username !== item.displayName
                                ? goldenActive
                                : goldenInactive
                            }
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {allStarData.activeDataWeekly &&
                allStarData.activeDataWeekly.length > 0 &&
                inactiveBoard === false &&
                leaderboardBtn === "weekly" &&
                allStarData.activeDataWeekly.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`playerInnerRow ${
                        inactiveBoard || item.displayName === username
                          ? "playerInnerRow-inactive"
                          : null
                      }`}
                    >
                      <td className="playerData col-1 font-montserrat">
                        {parseInt(index) + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                        <div className="playerName-inner">
                          <img
                            src={
                              index + 1 <= 10
                                ? require(`./assets/globalRanks/globalRank${
                                    index + 1
                                  }.png`)
                                : playerAvatar
                            }
                            alt=""
                            className="playerAvatar me-2"
                          />
                          <span>
                            {" "}
                            {item.displayName?.slice(0, 13)}
                            {item.displayName?.length > 13 && "..."}
                          </span>
                        </div>
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <img src={star} alt="" />
                          {getFormattedNumber(item.statValue, 0)}
                        </div>
                      </td>
                      <td
                        className={`playerScore col-2 text-center font-montserrat  ${
                          username === item.displayName
                            ? "goldenscore"
                            : "playerReward"
                        }`}
                        style={{ color: "#09F3D2" }}
                      >
                        $
                        {getFormattedNumber(
                          allStarData.rewardsWeekly[index],
                          0
                        )}
                      </td>
                      <td
                        className={`playerScore col-2 text-center font-montserrat d-flex align-items-center gap-2 w-100 ${
                          username === item.displayName && isactive === true
                            ? "goldenscore"
                            : "playerReward"
                        }`}
                        style={{
                          color:
                            (username === item.displayName &&
                              isactive === true) ||
                            username !== item.displayName
                              ? "#09F3D2"
                              : "gray",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-end me-2 me-lg-3 gap-1 w-100">
                          $
                          {getFormattedNumber(
                            allStarData.premium_rewards_weekly[index],
                            0
                          )}
                          {screen === "home" ? (
                            <HtmlTooltip
                              placement="top"
                              title={
                                <span className="card-eth-chain-text">
                                  Golden Pass
                                </span>
                              }
                            >
                              <img src={goldenActive} alt="" />
                            </HtmlTooltip>
                          ) : (
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
                                  (username === item.displayName &&
                                    isactive === true) ||
                                  username !== item.displayName
                                    ? goldenActive
                                    : goldenInactive
                                }
                                alt=""
                              />
                            </HtmlTooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {allStarData.previousDataWeekly &&
                inactiveBoard === true &&
                leaderboardBtn === "weekly" &&
                allStarData.previousDataWeekly.length > 0 &&
                allStarData.previousDataWeekly.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`playerInnerRow ${
                        inactiveBoard || item.displayName === username
                          ? "playerInnerRow-inactive"
                          : null
                      }`}
                    >
                      <td className="playerData col-1 font-montserrat">
                        {parseInt(index) + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                        <img
                          src={
                            index + 1 <= 10
                              ? require(`./assets/globalRanks/globalRank${
                                  index + 1
                                }.png`)
                              : playerAvatar
                          }
                          alt=""
                          className="playerAvatar me-2"
                        />
                        <span>
                          {" "}
                          {item.displayName?.slice(0, 13)}
                          {item.displayName?.length > 13 && "..."}
                        </span>
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <img src={star} alt="" />
                          {getFormattedNumber(item.statValue, 0)}
                        </div>
                      </td>
                      <td
                        className="playerScore col-2 text-center font-montserrat"
                        style={{ color: "#09F3D2" }}
                      >
                        $ ---
                      </td>
                      <td
                        className="playerScore col-2 text-center font-montserrat d-flex align-items-center gap-2 w-100"
                        style={{ color: "#09F3D2" }}
                      >
                        <div className="d-flex align-items-center justify-content-end me-2 me-lg-3 gap-1 w-100">
                          +$ ---
                          <img
                            src={
                              (username === item.displayName &&
                                isactive === true) ||
                              username !== item.displayName
                                ? goldenActive
                                : goldenInactive
                            }
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {screen === "dash" &&
        allStarData &&
        leaderboardBtn === "monthly" &&
        allStarData.player_data.displayName &&
        [allStarData.player_data].map((item, index) => {
          return (
            <div
              className="total-stars-wrapper2 d-flex align-items-center gap-5 justify-content-between py-2 px-3"
              key={index}
            >
              <div className="d-flex flex-column">
                <div className="playerName d-flex align-items-center font-montserrat gap-2">
                  {item.statValue > 0 && <span> #{item.position + 1}</span>}
                  <img
                    src={inactiveUserPfp}
                    alt=""
                    className="playerAvatar me-2"
                  />
                  <span>
                    {" "}
                    {item.displayName?.slice(0, 13)}
                    {item.displayName?.length > 13 && "..."}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="total-stars-span">Collected Stars</span>
                <div className="playerScore d-flex  text-center font-montserrat">
                  <div
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: 20 }}
                  >
                    <img src={star} alt="" style={{ width: 30, height: 30 }} />
                    {getFormattedNumber(item.statValue, 0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {screen === "dash" &&
        allStarData &&
        leaderboardBtn === "weekly" &&
        allStarData.player_data_weekly.displayName &&
        [allStarData.player_data_weekly].map((item, index) => {
          return (
            <div
             className="total-stars-wrapper2 d-flex align-items-center gap-5 justify-content-between py-2 px-3"
              key={index}
            >
              <div className="d-flex flex-column">
                <div className="playerName d-flex align-items-center font-montserrat gap-2">
                {item.statValue > 0 && <span> #{item.position + 1}</span>}
                  <img
                    src={inactiveUserPfp}
                    alt=""
                    className="playerAvatar me-2"
                  />
                  <span>
                    {" "}
                    {item.displayName?.slice(0, 13)}
                    {item.displayName?.length > 13 && "..."}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="total-stars-span">Collected Stars</span>
                <div className="playerScore d-flex  text-center font-montserrat">
                  <div
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: 20 }}
                  >
                    <img src={star} alt="" style={{ width: 30, height: 30 }} />
                    {getFormattedNumber(item.statValue, 0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {screen === "dash" ? (
        <div className="optionsWrapper p-2">
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
      ) : (
        <NavLink
          to={"/account"}
          className="view-chains-wrapper p-2 d-flex align-items-center justify-content-between"
        >
          <span>View Chain Leaderboards</span>
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center gap-1">
              <img src={bnbIcon} width={20} height={20} alt="" />
              <img src={mantaActive} width={20} height={20} alt="" />
              <img src={taikoLogo} width={20} height={20} alt="" />
              <img src={baseLogo} width={20} height={20} alt="" />
              <img src={coreIcon} width={20} height={20} alt="" />
              <img src={skaleActive} width={20} height={20} alt="" />
              <img src={victionActive} width={20} height={20} alt="" />
            </div>
            <img src={yellowArrow} width={20} height={20} alt="" />
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default GlobalLeaderboard;
