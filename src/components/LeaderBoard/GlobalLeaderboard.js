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
import globalIcon from './assets/globalRanks/globalIcon.png'

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

const GlobalLeaderboard = ({ username, userId, dypBalancebnb, address }) => {
  const playerData = [
    {
      position: "1",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "2",
      displayName: "DarkSliffer",
      reward: "$500",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "3",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "4",
      displayName: "DarkSliffer",
      reward: "500",
      statValue: "7757920",
      premium: false,
    },

    {
      position: "5",
      displayName: "DarkSliffer",
      reward: "50",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "6",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "7",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "8",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "9",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "10",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
  ];
  const [tooltip, setTooltip] = useState(false);
  const sliderRef = useRef(null);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const placeholderplayerData = [
    {
      position: 0,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 1,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 2,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 3,
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: 4,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 5,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 6,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 7,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 8,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 9,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  const dailyPrizes = ["10", "8", "5", "5", "0", "0", "0", "0", "0", "0"];
  const previous_dailyPrizes = [
    "20",
    "10",
    "8",
    "5",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

  const dailyPrizesGolden = ["10", "8", "5", "5", "5", "5", "5", "5", "5", "5"];

  const prizeSkale = ["25", "15", "10", "8", "5", "5", "5", "5", "5", "5"];

  const previous_dailyPrizesGolden = [
    "20",
    "10",
    "8",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const weeklyPrizes = ["25", "15", "10", "8", "0", "0", "0", "0", "0", "0"];
  const weeklyPrizesGolden = [
    "25",
    "15",
    "10",
    "8",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const previous_weeklyPrizes = [
    "40",
    "20",
    "15",
    "10",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

  const previous_weeklyPrizesGolden = [
    "40",
    "20",
    "15",
    "10",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const monthlyPrizes = [
    "250",
    "150",
    "100",
    "50",
    "50",
    "20",
    "20",
    "10",
    "10",
    "10",
  ];

  const previous_monthlyPrizes = [
    "500",
    "250",
    "150",
    "50",
    "25",
    "25",
    "25",
    "25",
    "25",
    "25",
  ];

  const monthlyPrizesGolden = [
    "250",
    "150",
    "100",
    "50",
    "50",
    "20",
    "20",
    "10",
    "10",
    "10",
  ];

  const previous_monthlyPrizesGolden = [
    "500",
    "250",
    "150",
    "50",
    "25",
    "25",
    "25",
    "25",
    "25",
    "25",
  ];

  const dummyPrizes = [
    "1000",
    "500",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
  ];

  const [optionText2, setOptionText2] = useState("bnb");
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const fetchGenesisRecords = async () => {
    const data2 = {
      StatisticName: "GenesisLandRewards",
      StartPosition: 0,
      MaxResultsCount: 10,
    };

    const result2 = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data2)
      .catch((err) => {
        console.log(err);
      });
    if (result2) {
      setgenesisData(result2.data.data.leaderboard);
      setpreviousGenesisVersion(result2.data.data.version);

      fillRecordsGenesis(result2.data.data.leaderboard);
    }
  };

  const fillRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setgenesisData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setgenesisData(finalData);
    }
  };

  const fetchGenesisPreviousWinners = async () => {
    if (previousGenesisVersion != 0) {
      const data = {
        StatisticName: "GenesisLandRewards",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousGenesisVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsGenesis(result.data.data.leaderboard);

      setpreviousgenesisData(result.data.data.leaderboard);
    }
  };

  useEffect(() => {
    fetchGenesisRecords();
  }, []);

  useEffect(() => {
    fetchGenesisPreviousWinners();
  }, [previousGenesisVersion]);

  // useEffect(() => {
  //   handleOption(optionText);
  // }, [inactiveBoard]);

  useEffect(() => {
    if (countdown === null || countdown === undefined || countdown === "0") {
      setisActive(false);
    } else setisActive(true);
  }, [countdown]);

  useEffect(() => {
    setOptionText2("bnb");
  }, []);

  return (
    <div
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-4 position-relative"
      style={{ alignSelf: "baseline", minWidth: "92%", maxWidth: "92%" }}
    >
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
            <h6 className="global-total-players mb-0">
              45,500
            </h6>
            <span className="global-total-span">Monthly Beta Players</span>
          </div>
        </div>
      </div>
      {countdown !== "0" && countdown && (
        <Countdown
          date={Number(countdown) * 1000}
          renderer={renderer}
          onComplete={() => {
            setcountdown();
          }}
        />
      )}
      {/* <h2
        className={`font-organetto d-flex gap-1 align-items-center  leaderboardTitle justify-content-between`}
      >
        Leaderboard
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
              className={`tooltip-wrapper p-3 ${tooltip && "tooltip-active"}`}
              style={{ width: 350, right: "20%" }}
            >
              <p className="tooltip-content">
                BNB Chain Leaderboard: In World of Dypians, the BNB Chain
                Leaderboard tracks players' activities related to the BNB Chain,
                such as in-game activities, Daily Bonus, and different events.
                This leaderboard operates on a daily, weekly, and monthly basis,
                with rewards distributed monthly based on players' performance.
                <br />
                <br />
                SKALE Leaderboard: In World of Dypians, the SKALE Leaderboard
                tracks players' activities related to SKALE, such as Daily Bonus
                and Treasure Hunt. This leaderboard operates on a weekly basis,
                with rewards distributed weekly based on players' performance.
                <br />
                <br />
                Genesis Leaderboard: In World of Dypians, the Genesis
                Leaderboard is a monthly competition exclusive to Genesis Land
                NFT owners. This leaderboard tracks players' activities on their
                Genesis Land, such as hitting the gem once a day, to earn points
                for BNB Chain leaderboard. Players have the opportunity to earn
                rewards in USD based on the amount that the genesis gem gives.
              </p>
            </div>
          </div>
        </OutsideClickHandler>
      </h2> */}
      {/* <div className="grandPrices-wrapper position-relative"></div> */}
      <div className="leaderboard-item d-flex flex-column gap-2 w-100 p-0">
      <div className="global-leaderboard-banner d-flex align-items-center w-100 p-3 gap-3">
        <img src={globalIcon} alt="" />
        <div className="d-flex flex-column">
          <h6 className="global-leaderboard-title mb-0">
            CHALLENGER
          </h6>
          <h6 className="global-leaderboard-title" style={{color: "#F4E27B"}}>
            GLOBAL RANK
          </h6>
        </div>
      </div>
        <div className="p-2">
          <table className="playerTable w-100">
            <tbody>
              <tr className="playerRow">
                <th className="playerHeader font-montserrat">Rank</th>
                <th className="playerHeader font-montserrat">Player</th>
                <th className="playerHeader text-center font-montserrat">
                  Collected Stars
                </th>
                <th className="playerHeader text-center font-montserrat">
                  Reward
                </th>
              </tr>
              {genesisData &&
                genesisData.length > 0 &&
                inactiveBoard === false &&
                genesisData.map((item, index) => {
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
                        {item.position + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                          <img
                            src={require(`./assets/globalRanks/globalRank${
                              item.position + 1
                            }.png`)}
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
                      <td className="playerScore col-2 text-center font-montserrat" style={{color: "#09F3D2"}}>
                          ${getFormattedNumber(dummyPrizes[item.position], 0)}
                      </td>
                    </tr>
                  );
                })}

              {previousgenesisData &&
                inactiveBoard === true &&
                previousgenesisData.length > 0 &&
                previousgenesisData.map((item, index) => {
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
                        {item.position + 1}
                      </td>
                      <td className="playerName col-5 font-montserrat">
                        <img
                          src={require(`./assets/globalRanks/globalRank${
                            item.position + 1
                          }.png`)}
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
                      <td className="playerScore col-2 text-center font-montserrat" style={{color: "#09F3D2"}}>
                          ${getFormattedNumber(dummyPrizes[item.position], 0)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
};

export default GlobalLeaderboard;
