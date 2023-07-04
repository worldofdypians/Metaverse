import React, { useState, useEffect } from "react";
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

import winner from "./assets/winner.png";
import first from "./assets/first.svg";
import second from "./assets/second.svg";
import third from "./assets/third.svg";
import star from "./assets/star.svg";
import playerImg from "./assets/playerimg.png";

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

const LeaderBoard = ({
  username,
  userId,
  dypBalancebnb,
  address,
  availableTime,
}) => {
  const playerData = [
    {
      position: "#1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#2",
      displayName: "---",
      reward: "$500",
      premium: false,
      statValue: "1200",
    },
    {
      position: "#3",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#4",
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "#5",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#6",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#7",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#8",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#9",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "#10",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];
  const [tooltip, setTooltip] = useState(false);

  const placeholderplayerData = [
    {
      position: "0",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "2",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "3",
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "4",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "5",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "6",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "7",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "8",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "9",
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

  const [optionText, setOptionText] = useState("genesis");
  const [dailyrecords, setRecords] = useState([]);
  const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [prizes, setPrizes] = useState(dailyPrizes);
  const [activePlayer, setActivePlayer] = useState(false);
  const [userData, setUserData] = useState({});
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);

  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);

  const [genesisData, setgenesisData] = useState([]);
  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();

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
      setpreviousGenesisVersion(result2.data.data.version);

      setgenesisData(result2.data.data.leaderboard);
      fillRecordsGenesis(result2.data.data.leaderboard);
    }

    fetchMonthlyGenesisRecordsAroundPlayer(result2.data.data.leaderboard);
  };

  const fetchDailyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "DailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
        }
        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
        }
      }
      if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
      }
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
      fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchWeeklyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
        }
        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
        }
      }
      if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
      }
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
    fillRecords(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayer(true);
    }
    if (testArray.length === 0) {
      setActivePlayer(false);
      fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
        }

        if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
        }
      }
      if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
      }
    }
  };

  const fetchMonthlyGenesisRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
      }
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
    fillRecords(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayer(false);
      fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleOption = (item) => {
    setOptionText(item);
    if (item === "daily" && inactiveBoard === false) {
      setPrizes(dailyPrizes);
    } else if (item === "daily" && inactiveBoard === true) {
      setPrizes(previous_dailyPrizes);
    } else if (item === "weekly" && inactiveBoard === false) {
      setPrizes(weeklyPrizes);
    } else if (item === "weekly" && inactiveBoard === true) {
      setPrizes(previous_weeklyPrizes);
    } else if (item === "monthly" && inactiveBoard === false) {
      setPrizes(monthlyPrizes);
    } else if (item === "monthly" && inactiveBoard === true) {
      setPrizes(previous_monthlyPrizes);
    }
  };

  const fillRecords = (itemData) => {
    if (itemData.length === 0) {
      setRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setRecords(finalData);
    }
  };

  const fillRecordsDaily = (itemData) => {
    if (itemData.length === 0) {
      setdailyplayerData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setdailyplayerData(finalData);
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
    fillRecordsDaily(result.data.data.leaderboard)

    // setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchGenesisPreviousWinners = async () => {
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

    setgenesisData(result.data.data.leaderboard);
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
    if (inactiveBoard === true && optionText === "daily") {
      fetchPreviousWinners();
    }
    if (inactiveBoard === true && optionText === "weekly") {
      fetchPreviousWeeklyWinners();
    }
    if (inactiveBoard === true && optionText === "genesis") {
      fetchGenesisPreviousWinners();
    }
    if (inactiveBoard === false && optionText === "genesis") {
      fetchGenesisRecords();
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

  useEffect(() => {
    handleOption(optionText);
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

  return (
    <>
      <div className="row w-100 justify-content-start">
        <h2
          className={`font-organetto d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
        >
          <mark className={`font-organetto bundletag`}>WOD</mark> Leaderboard
        </h2>
      </div>
      <div className="main-wrapper py-4 w-100 d-flex gap-4 mt-5 mt-xxl-0 mt-lg-0 justify-content-center align-items-end">
        <div className="row w-100 align-items-start">
          <div className="d-flex flex-column gap-3 col-12 col-xxl-6 col-lg-6 px-0 px-lg-3 leaderboard-wrapper">
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

            {/*  <div className="grandPrices-wrapper">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-end gap-2 justify-content-between">
          </div>
        </div> 
      </div>*/}
            <div className="d-flex align-items-center gap-1">
              <div className="optionsWrapper col-12">
                <div
                  className="d-flex gap-1 align-items-center justify-content-between"
                  style={{ height: 38 }}
                >
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
                  <span
                    className={`${
                      optionText === "daily" && "otheroptionsActive"
                    } optionText col-3`}
                    style={{ width: "24%" }}
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
                    style={{ width: "24%" }}
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
                    style={{ width: "24%" }}
                    onClick={() => {
                      handleOption("monthly");
                      fetchMonthlyRecords();
                    }}
                  >
                    Monthly
                  </span>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column gap-2 tablewrapper"
              style={{ height: optionText === "genesis" ? "345px" : "366px" }}
            >
              {optionText !== "genesis" ? (
                <table className="playerTable">
                  <tbody>
                    <tr className="playerRow">
                      <th className="playerHeader">Rank</th>
                      <th className="playerHeader">Player</th>
                      {optionText !== "genesis" && (
                        <th className="playerHeader text-center">Score</th>
                      )}
                      {optionText !== "genesis" && (
                        <th className="playerHeader text-center">Reward</th>
                      )}
                      <th className="playerHeader text-center">Golden Pass</th>
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
                            <td className="playerData col-1">
                              {playerData[index].position}
                            </td>
                            <td className="playerName col-5">
                              {availableTime !== "0" &&
                              availableTime &&
                              availableTime !== undefined &&
                              item.displayName === username ? (
                                <div className="position-relative">
                                  <img
                                    src={premiumAvatar}
                                    alt=""
                                    className="playerAvatar"
                                  />
                                  <span> {item.displayName}</span>
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
                            {optionText !== "genesis" ? (
                              <td className="playerScore col-2 text-center">
                                {getFormattedNumber(item.statValue, 0)}
                              </td>
                            ) : (
                              <td className="playerScore col-2 text-center">
                                {getFormattedNumber(item.statValue, 0)}
                              </td>
                            )}

                            {optionText !== "genesis" && (
                              <td
                                className={`playerReward text-center col-2 ${
                                  availableTime !== "0" &&
                                  availableTime &&
                                  availableTime !== undefined &&
                                  username === item.displayName
                                    ? "goldenscore"
                                    : "playerReward"
                                }`}
                              >
                                ${getFormattedNumber(prizes[index], 0)}
                              </td>
                            )}
                            <td
                              className={`playerScore col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "goldenscore-inactive"
                              }`}
                            >
                              +$
                              {getFormattedNumber(
                                optionText === "daily"
                                  ? dailyPrizesGolden[index]
                                  : optionText === "monthly"
                                  ? monthlyPrizesGolden[index]
                                  : optionText === "weekly"
                                  ? weeklyPrizesGolden[index]
                                  : prizes[index],
                                0
                              )}
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
                            <td className="playerData col-1">
                              #{Number(item.position) + 1}
                            </td>
                            <td className="playerName col-5">
                              {availableTime !== "0" &&
                              availableTime &&
                              availableTime !== undefined &&
                              item.displayName === username ? (
                                <div className="position-relative">
                                  <img
                                    src={premiumAvatar}
                                    alt=""
                                    className="playerAvatar"
                                  />
                                  <span> {item.displayName}</span>
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
                            <td className="playerScore col-2  text-center">
                              {" "}
                              {getFormattedNumber(item.statValue, 0)}
                            </td>
                            <td
                              className={`playerReward text-center col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "playerReward"
                              }`}
                            >
                              ${prizes[index]}
                            </td>
                            <td
                              className={`playerReward col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "goldenscore-inactive"
                              }`}
                            >
                              +$
                              {getFormattedNumber(
                                previous_monthlyPrizesGolden[index],
                                0
                              )}
                            </td>
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
                            <td className="playerData col-1">
                              #{item.position + 1}
                            </td>
                            <td className="playerName col-5">
                              {availableTime !== "0" &&
                              availableTime &&
                              availableTime !== undefined &&
                              item.displayName === username ? (
                                <div className="position-relative">
                                  <img
                                    src={premiumAvatar}
                                    alt=""
                                    className="playerAvatar"
                                  />
                                  <span> {item.displayName}</span>
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
                            <td className="playerScore col-2 text-center">
                              {getFormattedNumber(item.statValue, 0)}
                            </td>
                            <td
                              className={`playerReward text-center col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "playerReward"
                              }`}
                            >
                              ${prizes[index]}
                            </td>
                            <td
                              className={`playerReward col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "goldenscore-inactive"
                              }`}
                            >
                              +$
                              {getFormattedNumber(
                                previous_weeklyPrizesGolden[index],
                                0
                              )}
                            </td>
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
                            <td className="playerData col-1">
                              #{Number(item.position) + 1}
                            </td>
                            <td className="playerName col-5">
                              {availableTime !== "0" &&
                              availableTime &&
                              availableTime !== undefined &&
                              item.displayName === username ? (
                                <div className="position-relative">
                                  <img
                                    src={premiumAvatar}
                                    alt=""
                                    className="playerAvatar"
                                  />
                                  <span> {item.displayName}</span>
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
                            <td className="playerScore col-2 text-center">
                              {getFormattedNumber(item.statValue, 0)}
                            </td>
                            <td
                              className={`playerReward text-center col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "playerReward"
                              }`}
                            >
                              ${prizes[index]}
                            </td>
                            <td
                              className={`playerReward col-2 ${
                                availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === item.displayName
                                  ? "goldenscore"
                                  : "goldenscore-inactive"
                              }`}
                            >
                              +$
                              {getFormattedNumber(
                                previous_dailyPrizesGolden[index],
                                0
                              )}
                            </td>
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
                          style={{ alignSelf: "center", margin: "auto" }}
                        />
                      )}
                  </tbody>
                </table>
              ) : (
                <ComingSoon
                  optionText={optionText}
                  data={genesisData}
                  username={username}
                  inactiveBoard={inactiveBoard}
                />
              )}
            </div>

            {activePlayer === false &&
              inactiveBoard === false &&
              optionText !== "genesis" && (
                <table className="playerTable" style={{ marginTop: "-33px" }}>
                  <tbody>
                    <tr className={`playerInnerRow-inactive`}>
                      <td
                        className={`playerData ${
                          optionText === "genesis" ? "col-2" : "col-1"
                        }`}
                      >
                        #{userData.position + 1}
                      </td>
                      <td className="playerName col-5">
                        <div className="position-relative">
                          {availableTime !== "0" &&
                          availableTime &&
                          availableTime !== undefined ? (
                            <div className="position-relative">
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
                              <span> {userData.displayName}</span>
                            </div>
                          ) : (
                            <>
                              <img
                                src={playerAvatar}
                                alt=""
                                className="playerAvatar"
                              />
                              {userData.displayName}
                            </>
                          )}
                        </div>
                      </td>
                      {optionText !== "genesis" && (
                        <td className="playerScore col-2 text-center">
                          {getFormattedNumber(userData.statValue, 0)}
                        </td>
                      )}
                      <td
                        className={`playerReward text-center ${
                          availableTime !== "0" &&
                          availableTime &&
                          availableTime !== undefined &&
                          username === userData.displayName
                            ? "goldenscore"
                            : "playerReward"
                        } col-2 ${optionText !== "genesis" && "text-center"} `}
                      >
                        $
                        {optionText === "genesis"
                          ? getFormattedNumber(userData.statValue, 0)
                          : "0"}{" "}
                      </td>
                      {optionText !== "genesis" && (
                        <td
                          className={`playerScore col-2 ${
                            availableTime !== "0" &&
                            availableTime &&
                            availableTime !== undefined &&
                            username === userData.displayName
                              ? "goldenscore"
                              : "goldenscore-inactive"
                          }`}
                        >
                          +$0
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              )}
            <div className="optionsWrapper2 p-2">
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
          <div className="d-flex flex-column gap-3 col-12 col-xxl-6 col-lg-6 px-0 px-lg-3 medal-wrapper align-items-center justify-content-center position-relative">
            <div className="d-flex justify-content-center w-100 position-relative medalinnerwrapper">
              <div className="secondaryplayer-wrapper col-3">
                <div className="position-relative d-flex h-100 flex-column justify-content-end gap-2 align-items-center">
                  <img
                    src={playerImg}
                    alt=""
                    className="position-absolute playersimg"
                  />
                  <img
                    src={second}
                    alt=""
                    className="position-absolute placeimg"
                  />
                  <div className="d-flex flex-column h-100 justify-content-between">
                    <div className="d-flex flex-column gap-2 m-auto align-items-center">
                      <span className="playersname">
                        {optionText === "daily"
                          ? dailyrecords[1]?.displayName
                          : optionText === "weekly"
                          ? dailyrecords[1]?.displayName
                          : optionText === "monthly"
                          ? dailyrecords[1]?.displayName
                          : genesisData[1]?.displayName}
                      </span>
                      <span className="playersreward">
                        $
                        {optionText === "daily"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[1]?.displayName
                                ? parseInt(prizes[1]) +
                                    parseInt(dailyPrizesGolden[1])
                                : parseInt(prizes[1]),
                              0
                            )
                          : optionText === "weekly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[1]?.displayName
                                ? parseInt(prizes[1]) +
                                    parseInt(weeklyPrizesGolden[1])
                                : parseInt(prizes[1]),
                              0
                            )
                          : optionText === "monthly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[1]?.displayName
                                ? parseInt(prizes[1]) +
                                    parseInt(monthlyPrizesGolden[1])
                                : parseInt(prizes[1]),
                              0
                            )
                          : getFormattedNumber(genesisData[1]?.statValue, 0)}
                      </span>
                    </div>
                    {optionText !== "genesis" && (
                      <span className="playerscore">
                        {getFormattedNumber(dailyrecords[1]?.statValue, 0)}{" "}
                        Points
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mainplayer-wrapper col-3">
                <div className="position-relative d-flex h-100 flex-column justify-content-end gap-2 align-items-center">
                  <img
                    src={winner}
                    alt=""
                    className="position-absolute winnerimg"
                  />
                  <img
                    src={first}
                    alt=""
                    className="position-absolute placeimg"
                  />
                  <div className="d-flex flex-column h-100 justify-content-between">
                    <div className="d-flex flex-column gap-2 m-auto align-items-center">
                      <span className="playersname">
                        {optionText === "daily"
                          ? dailyrecords[0]?.displayName
                          : optionText === "weekly"
                          ? dailyrecords[0]?.displayName
                          : optionText === "monthly"
                          ? dailyrecords[0]?.displayName
                          : genesisData[0]?.displayName}
                      </span>
                      <span className="winnersreward">
                        $
                        {optionText === "daily"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[0]?.displayName
                                ? parseInt(prizes[0]) +
                                    parseInt(dailyPrizesGolden[0])
                                : parseInt(prizes[0]),
                              0
                            )
                          : optionText === "weekly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[0]?.displayName
                                ? parseInt(prizes[0]) +
                                    parseInt(weeklyPrizesGolden[0])
                                : parseInt(prizes[0]),
                              0
                            )
                          : optionText === "monthly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[0]?.displayName
                                ? parseInt(prizes[0]) +
                                    parseInt(monthlyPrizesGolden[0])
                                : parseInt(prizes[0]),
                              0
                            )
                          : getFormattedNumber(genesisData[0]?.statValue, 0)}
                      </span>
                    </div>
                    {optionText !== "genesis" && (
                      <span className="playerscore">
                        {getFormattedNumber(dailyrecords[0]?.statValue, 0)}{" "}
                        Points
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="thirdplayer-wrapper col-3">
                <div className="position-relative d-flex h-100 flex-column justify-content-end gap-2 align-items-center">
                  <img
                    src={playerImg}
                    alt=""
                    className="position-absolute playersimg"
                  />
                  <img
                    src={third}
                    alt=""
                    className="position-absolute placeimg"
                  />
                  <div className="d-flex flex-column h-100 justify-content-between">
                    <div className="d-flex flex-column gap-2 m-auto align-items-center">
                      <span className="playersname">
                        {optionText === "daily"
                          ? dailyrecords[2]?.displayName
                          : optionText === "weekly"
                          ? dailyrecords[2]?.displayName
                          : optionText === "monthly"
                          ? dailyrecords[2]?.displayName
                          : genesisData[2]?.displayName}
                      </span>
                      <span className="playersreward">
                        $
                        {optionText === "daily"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[2]?.displayName
                                ? parseInt(prizes[2]) +
                                    parseInt(dailyPrizesGolden[2])
                                : parseInt(prizes[2]),
                              0
                            )
                          : optionText === "weekly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[2]?.displayName
                                ? parseInt(prizes[2]) +
                                    parseInt(weeklyPrizesGolden[2])
                                : parseInt(prizes[2]),
                              0
                            )
                          : optionText === "monthly"
                          ? getFormattedNumber(
                              availableTime !== "0" &&
                                availableTime &&
                                availableTime !== undefined &&
                                username === dailyrecords[2]?.displayName
                                ? parseInt(prizes[2]) +
                                    parseInt(monthlyPrizesGolden[2])
                                : parseInt(prizes[2]),
                              0
                            )
                          : getFormattedNumber(genesisData[2]?.statValue, 0)}
                      </span>
                    </div>
                    {optionText !== "genesis" && (
                      <span className="playerscore">
                        {getFormattedNumber(dailyrecords[2]?.statValue, 0)}{" "}
                        Points
                      </span>
                    )}
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

export default LeaderBoard;
