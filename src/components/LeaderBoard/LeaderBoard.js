import React, { useState, useEffect } from "react";
import price1 from "./assets/price1.svg";
import price2 from "./assets/price2.svg";
import price3 from "./assets/price3.svg";
import { CircularProgress } from "@mui/material";
import playerAvatar from "./assets/userAvatar2.png";
import premiumAvatar from "./assets/premiumAvatar.png";
import premiumStar from "./assets/premiumStar.png";
import axios from "axios";
import Switch from "@mui/material/Switch";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
import cawsBadge from "./assets/cawsBadge2.png";
import genesisBadge from "./assets/genesisBadge2.png";
import OutsideClickHandler from "react-outside-click-handler";
import tooltipIcon from "./assets/tooltip.svg";

const LeaderBoard = ({ username, userId }) => {
  const playerData = [
    {
      position: "# 1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 2",
      displayName: "---",
      reward: "$500",
      premium: false,
      statValue: "1200",
    },
    {
      position: "# 3",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 4",
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "# 5",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 6",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 7",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 8",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 9",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "# 10",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  // const dailyplayerData = [
  //   {
  //     rank: "#1",
  //     player: "820ShotsFired",
  //     reward: "$50",
  //     premium: false,
  //     score: "271,030",
  //   },
  //   {
  //     rank: "#2",
  //     player: "Armilus",
  //     reward: "$30",
  //     premium: false,
  //     score: "246,405",
  //   },
  //   {
  //     rank: "#3",
  //     player: "Adr~",
  //     reward: "$5",
  //     score: "75,000",
  //     premium: false,
  //   },
  //   {
  //     rank: "#4",
  //     player: "BOLT",
  //     reward: "$5",
  //     premium: false,
  //     score: "68,045",
  //   },

  //   {
  //     rank: "#5",
  //     player: "Yoge",
  //     reward: "$5",
  //     premium: false,
  //     score: "66,900",
  //   },
  //   {
  //     rank: "#6",
  //     player: "CryptoMench",
  //     reward: "$5",
  //     premium: false,
  //     score: "54,990",
  //   },
  //   {
  //     rank: "#7",
  //     player: "UNKNWON_34",
  //     reward: "$5",
  //     premium: false,
  //     score: "52,530",
  //   },
  //   {
  //     rank: "#8",
  //     player: "riven",
  //     reward: "$5",
  //     premium: false,
  //     score: "49,905",
  //   },
  //   {
  //     rank: "#9",
  //     player: "Jeric",
  //     reward: "$5",
  //     premium: false,
  //     score: "47,325",
  //   },
  //   {
  //     rank: "#10",
  //     player: "Jessie666",
  //     reward: "$5",
  //     premium: false,
  //     score: "46,440",
  //   },
  // ];

  // const weeklyplayerData = [
  //   {
  //     rank: "#1",
  //     player: "NeVmon",
  //     reward: "$50",
  //     premium: false,
  //     score: "552,755",
  //   },
  //   {
  //     rank: "#2",
  //     player: "820ShotsFired",
  //     reward: "$30",
  //     premium: false,
  //     score: "519,845",
  //   },
  //   {
  //     rank: "#3",
  //     player: "GaRgoNiT",
  //     reward: "$25",
  //     premium: false,
  //     score: "283,130",
  //   },
  //   {
  //     rank: "#4",
  //     player: " Adr~",
  //     reward: "$5",
  //     score: "272,400",
  //     premium: false,
  //   },

  //   {
  //     rank: "#5",
  //     player: "Armilus",
  //     reward: "$5",
  //     premium: false,
  //     score: "156,460",
  //   },
  //   {
  //     rank: "#6",
  //     player: "riven",
  //     reward: "$5",
  //     premium: false,
  //     score: "127,350",
  //   },
  //   {
  //     rank: "#7",
  //     player: "Yeoj",
  //     reward: "$5",
  //     premium: false,
  //     score: "95,580",
  //   },
  //   {
  //     rank: "#8",
  //     player: "Tatsuooo0603",
  //     reward: "$5",
  //     premium: false,
  //     score: "88,125",
  //   },
  //   {
  //     rank: "#9",
  //     player: "Yoge",
  //     reward: "$5",
  //     premium: false,
  //     score: "86,685",
  //   },
  //   {
  //     rank: "#10",
  //     player: "Jeric",
  //     reward: "$5",
  //     premium: false,
  //     score: "77,730",
  //   },
  // ];

  const placeholderplayerData = [
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "-1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  const dailyPrizes = ["40", "20", "15", "10", "5", "5", "5", "5", "5", "5"];

  const weeklyPrizes = ["80", "40", "30", "20", "5", "5", "5", "5", "5", "5"];

  const monthlyPrizes = [
    "1000",
    "500",
    "300",
    "100",
    "50",
    "50",
    "50",
    "50",
    "50",
    "50",
  ];

  const prevDailyPrizes = [
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
  ];

  const prevWeeklyPrizes = [
    "80",
    "40",
    "30",
    "20",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const prevMonthlyPrizes = [
    "1000",
    "500",
    "300",
    "100",
    "50",
    "50",
    "50",
    "50",
    "50",
    "50",
  ];

  const [optionText, setOptionText] = useState("daily");
  const [dailyrecords, setRecords] = useState([]);
  const [prizes, setPrizes] = useState(dailyPrizes);
  const [activePlayer, setActivePlayer] = useState(false);
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);

  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [genesisData, setgenesisData] = useState([]);

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
      fillRecordsGenesis(result2.data.data.leaderboard);
    }
  };

  const fetchDailyRecords = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };

    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    setpreviousVersion(parseInt(result.data.data.version));
    setRecords(result.data.data.leaderboard);
    fillRecords(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    }

    if (testArray.length === 0) {
      setActivePlayer(false);
      // fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchWeeklyRecords = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setRecords(result.data.data.leaderboard);
    setpreviousWeeklyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    }
    if (testArray.length === 0) {
      setActivePlayer(false);
      // fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    }
    if (testArray.length === 0) {
      setActivePlayer(false);
      // fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleOption = (item) => {
    setOptionText(item);
    if (optionText === "daily" && inactiveBoard) {
      setPrizes(prevDailyPrizes);
    } else if (optionText === "weekly" && inactiveBoard) {
      setPrizes(prevWeeklyPrizes);
    } else if (optionText === "monthly" && inactiveBoard) {
      setPrizes(prevMonthlyPrizes);
    }
    if (optionText === "daily" && !inactiveBoard) {
      setPrizes(dailyPrizes);
    } else if (optionText === "weekly" && !inactiveBoard) {
      setPrizes(weeklyPrizes);
    } else if (optionText === "monthly" && !inactiveBoard) {
      setPrizes(monthlyPrizes);
    }
  };

  const fillRecords = (itemData) => {
      if (itemData.length === 0) {
        setRecords(placeholderplayerData);
      } else if (itemData.length < 10) {
        const testArray = itemData;
        const placeholderArray = placeholderplayerData.slice(
          itemData.length,
          10
        );
        const finalData = [...testArray, ...placeholderArray];
        setRecords(finalData);
      }
  };

  const fillRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setgenesisData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(
        itemData.length,
        10
      );
      const finalData = [...testArray, ...placeholderArray];
      setgenesisData(finalData);
    }
  }

  const fetchPreviousWinners = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousVersion - 1,
    };
    const result = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data
    );

    setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchPreviousWeeklyWinners = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousWeeklyVersion - 1,
    };
    const result = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data
    );

    setweeklyplayerData(result.data.data.leaderboard);
  };

  const fetchPreviousMonthlyWinners = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousMonthlyVersion - 1,
    };
    const result = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data
    );

    setmonthlyplayerData(result.data.data.leaderboard);
  };

  useEffect(() => {
    fetchDailyRecords();
  }, []);

  useEffect(() => {
    handleOption(optionText);
  }, [inactiveBoard, optionText]);

  useEffect(() => {
    if (inactiveBoard === true && optionText === "daily") {
      fetchPreviousWinners();
    }
    if (inactiveBoard === true && optionText === "weekly") {
      fetchPreviousWeeklyWinners();
    }
    if (inactiveBoard === true && optionText === "monthly") {
      fetchPreviousMonthlyWinners();
    }
  }, [
    optionText,
    inactiveBoard,
    previousVersion,
    previousWeeklyVersion,
    previousMonthlyVersion,
  ]);

  return (
    <div
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-4 position-relative"
      style={{ alignSelf: "baseline", minWidth: "92%", maxWidth: "92%" }}
    >
      <div className="nft-hover">
        <div className="d-flex flex-column align-items-center gap-4">
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
        </div>
      </div>
      <h2
        className={`font-organetto d-flex gap-1 align-items-center leaderboardTitle justify-content-between`}
      >
        Leaderboard
      </h2>
      <div className="grandPrices-wrapper position-relative">
        <div className="d-flex flex-column gap-2">
          <h6 className="grandprizeTitle" style={{ visibility: "hidden" }}>
            Grand Prizes
          </h6>
          <div className="d-flex align-items-end gap-2 justify-content-between">
            <div className="d-flex flex-column gap-2">
              <span className="prizeitem">
                <img src={price1} alt="" /> $7,000
              </span>
              <span className="prizeitem">
                <img src={price2} alt="" /> $5,000
              </span>
              <span className="prizeitem" style={{ marginLeft: 5, gap: 14 }}>
                <img src={price3} alt="" /> $3,000
              </span>
            </div>
            <div className="d-flex flex-column align-items-center grand-prize">
              <span className="grand-label">Grand prize</span>
              <span className="winnersamount">$30,000</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-1">
        <div className="optionsWrapper col-12">
          <div
            className="d-flex gap-2 align-items-center justify-content-between"
            style={{ height: 38 }}
          >
            <span
              className={`${
                optionText === "daily" && "otheroptionsActive"
              } optionText col-3`}
              style={{ borderRight: "1px solid #757086", width: "24%" }}
              onClick={() => {
                handleOption("daily");
                fetchDailyRecords();
              }}
            >
              Daily
            </span>
            <span
              className={`${
                optionText === "weekly" && "otheroptionsActive"
              } optionText col-3`}
              style={{ borderRight: "1px solid #757086", width: "24%" }}
              onClick={() => {
                handleOption("weekly");
                fetchWeeklyRecords();
              }}
            >
              Weekly
            </span>
            <span
              className={`${
                optionText === "monthly" && "otheroptionsActive"
              } optionText col-3`}
              style={{ borderRight: "1px solid #757086", width: "24%" }}
              onClick={() => {
                handleOption("monthly");
                fetchMonthlyRecords();
              }}
            >
              Monthly
            </span>
            <span
              className={`${
                optionText === "genesis" && "optiongenesis"
              } optionText col-3`}
              onClick={() => {
                handleOption("genesis");
                fetchGenesisRecords();
              }}
              style={{ width: "24%" }}
            >
              Genesis
            </span>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column gap-2 tablewrapper"
        style={{ height: optionText === "genesis" ? "388px" : "366px" }}
      >
        {optionText !== "genesis" ? (
          <table className="playerTable">
            <tr className="playerRow">
              <th className="playerHeader">Rank</th>
              <th className="playerHeader">Player</th>
              {optionText !== "genesis" && (
                <th className="playerHeader">Score</th>
              )}
              <th className="playerHeader">Reward</th>
            </tr>

            {dailyrecords &&
              inactiveBoard === false &&
              dailyrecords.length > 0 &&
              dailyrecords.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`playerInnerRow ${
                      inactiveBoard || item.displayName === username
                        ? "playerInnerRow-inactive"
                        : null
                    }`}
                  >
                    <td className="playerData col-2">
                      #{Number(item.position) + 1}
                    </td>
                    <td className="playerName col-5">
                      {/* <div className="position-relative">
                    <img src={premiumAvatar} alt="" className="playerAvatar" />{" "}
                    <img src={premiumStar} alt="" className="premium-star" />
                    </div> */}
                      <div className="position-relative">
                        <img
                          src={playerAvatar}
                          alt=""
                          className="playerAvatar"
                        />{" "}
                        {item.displayName}
                      </div>
                    </td>
                    {optionText !== "genesis" ? (
                      <td className="playerScore col-3">
                        {getFormattedNumber(item.statValue, 0)}
                      </td>
                    ) : (
                      <td className="playerScore col-3">
                        {getFormattedNumber(item.statValue, 0)}
                      </td>
                    )}
                    <td className="playerReward col-2">
                      ${getFormattedNumber(prizes[index], 0)}
                    </td>
                  </tr>
                );
              })}

            {monthlyplayerData &&
              inactiveBoard === true &&
              optionText === "monthly" &&
              monthlyplayerData.length > 0 &&
              monthlyplayerData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`playerInnerRow ${
                      inactiveBoard || item.displayName === username
                        ? "playerInnerRow-inactive"
                        : null
                    }`}
                  >
                    <td className="playerData col-2">
                      {Number(item.position) + 1}
                    </td>
                    <td className="playerName col-5">
                      {item.premium === true ? (
                        <div className="position-relative">
                          <img
                            src={premiumAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          <img
                            src={premiumStar}
                            alt=""
                            className="premium-star"
                          />
                          {item.displayName}
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img
                            src={playerAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          {item.displayName}
                        </div>
                      )}
                    </td>
                    <td className="playerScore col-3">{item.statValue}</td>
                    <td className="playerReward col-2">${prizes[index]}</td>
                  </tr>
                );
              })}

            {weeklyplayerData &&
              inactiveBoard === true &&
              optionText === "weekly" &&
              weeklyplayerData.length > 0 &&
              weeklyplayerData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`playerInnerRow ${
                      inactiveBoard || item.displayName === username
                        ? "playerInnerRow-inactive"
                        : null
                    }`}
                  >
                    <td className="playerData col-2">#{item.position + 1}</td>
                    <td className="playerName col-5">
                      {item.premium === true ? (
                        <div className="position-relative">
                          <img
                            src={premiumAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          <img
                            src={premiumStar}
                            alt=""
                            className="premium-star"
                          />
                          {item.displayName}
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img
                            src={playerAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          {item.displayName}
                        </div>
                      )}
                    </td>
                    <td className="playerScore col-3">
                      {getFormattedNumber(item.statValue, 0)}
                    </td>
                    <td className="playerReward col-2">${prizes[index]}</td>
                  </tr>
                );
              })}

            {dailyplayerData &&
              inactiveBoard === true &&
              optionText === "daily" &&
              dailyplayerData.length > 0 &&
              dailyplayerData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`playerInnerRow ${
                      inactiveBoard || item.displayName === username
                        ? "playerInnerRow-inactive"
                        : null
                    }`}
                  >
                    <td className="playerData col-2">#{item.position + 1}</td>
                    <td className="playerName col-5">
                      {item.premium === true ? (
                        <div className="position-relative">
                          <img
                            src={premiumAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          <img
                            src={premiumStar}
                            alt=""
                            className="premium-star"
                          />
                          {item.displayName}
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img
                            src={playerAvatar}
                            alt=""
                            className="playerAvatar"
                          />{" "}
                          {item.displayName}
                        </div>
                      )}
                    </td>
                    <td className="playerScore col-3">
                      {getFormattedNumber(item.statValue, 0)}
                    </td>
                    <td className="playerReward col-2">${prizes[index]}</td>
                  </tr>
                );
              })}
            {inactiveBoard === true &&
              ((dailyplayerData.length === 0 && optionText === "daily") ||
                (weeklyplayerData.length === 0 && optionText === "weekly") ||
                (monthlyplayerData.length === 0 && optionText === "monthly")) &&
              optionText !== "genesis" && (
                <CircularProgress
                  size={20}
                  style={{ alignSelf: "center", margin: "auto" }}
                />
              )}
          </table>
        ) : (
          <ComingSoon optionText={optionText} data={genesisData}/>
        )}
      </div>
      {/* {activePlayer === false &&
        inactiveBoard === false &&
        optionText !== "genesis" &&
        optionText !== "monthly" && (
          <table className="playerTable" style={{ marginTop: "-33px" }}>
            <tr className={`playerInnerRow-inactive`}>
              <td className="playerData col-2">#{userData.position + 1}</td>
              <td className="playerName col-5">
                <div className="position-relative">
                  <img src={playerAvatar} alt="" className="playerAvatar" />{" "}
                  {userData.displayName}
                </div>
              </td>
              <td className="playerScore col-3">
                {getFormattedNumber(userData.statValue, 0)}
              </td>
              <td className="playerReward col-2">$0</td>
            </tr>
          </table>
        )} */}
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
          {optionText === "genesis" ? (
            <span className="previous-desc mb-0">
              Display previous monthly Genesis ranking results.
            </span>
          ) : (
            <span className="previous-desc mb-0">
              Display previous {optionText} ranking results. The scores from
              previous rankings will be accumulated towards the grand prize.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
