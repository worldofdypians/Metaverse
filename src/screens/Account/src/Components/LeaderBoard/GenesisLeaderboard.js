import React, { useState, useEffect, useRef } from "react";
import price1 from "../../../../../components/LeaderBoard/assets/price1.svg";
import price2 from "../../../../../components/LeaderBoard/assets/price2.svg";
import price3 from "../../../../../components/LeaderBoard/assets/price3.svg";
import { CircularProgress } from "@mui/material";
import playerAvatar from "../../../../../components/LeaderBoard/assets/userAvatar2.png";
import premiumAvatar from "../../../../../components/LeaderBoard/assets/premiumAvatar.png";
import premiumStar from "../../../../../components/LeaderBoard/assets/premiumStar.png";
// import axios from "axios";
// import Switch from "@mui/material/Switch";
// import "./_leaderboard.scss";
// import ComingSoon from "./ComingSoon";
import cawsBadge from "../../../../../components/LeaderBoard/assets/cawsBadge2.png";
import genesisBadge from "../../../../../components/LeaderBoard/assets/genesisBadge2.png";
// import OutsideClickHandler from "react-outside-click-handler";
import tooltipIcon from "../../../../../components/LeaderBoard/assets/tooltip.svg";
import skaleIcon from "../../../../../components/LeaderBoard/assets/skaleIcon.png";
import skaleIconGray from "../../../../../components/LeaderBoard/assets/skaleIconGray.svg";
// import wodIcon from "../../../../../components/LeaderBoard/assets/wodIcon.png";
// import bnbIcon from "../../../../../components/LeaderBoard/assets/bnbIcon.svg";
// import coreIcon from "../../../../../components/LeaderBoard/assets/coreIcon.svg";
import bnbActive from "../../../../../components/LeaderBoard/assets/bnbActive.svg";
import bnbInactive from "../../../../../components/LeaderBoard/assets/bnbInactive.svg";
import skaleActive from "../../../../../components/LeaderBoard/assets/skaleActive.svg";
import skaleInactive from "../../../../../components/LeaderBoard/assets/skaleInactive.svg";
import wodActive from "../../../../../components/LeaderBoard/assets/wodActive.svg";
import wodInactive from "../../../../../components/LeaderBoard/assets/wodInactive.svg";
import leftArrow from "../../../../../components/LeaderBoard/assets/leftArrow.svg";
import rightArrow from "../../../../../components/LeaderBoard/assets/rightArrow.svg";
import star from "../../../../../components/LeaderBoard/assets/star.svg";
import premiumIcon from "../../../../../components/LeaderBoard/assets/premiumIcon.png";

// import React, { useState, useEffect } from "react";
// import price1 from "../../Images/userProfile/price1.svg";
// import price2 from "../../Images/userProfile/price2.svg";
// import price3 from "../../Images/userProfile/price3.svg";
// import { CircularProgress } from "@mui/material";
// import playerAvatar from "../../Images/userProfile/userAvatar2.png";
// import premiumAvatar from "../../Images/userProfile/premiumAvatar.png";
// import premiumStar from "../../Images/userProfile/premiumStar.png";
import axios from "axios";
import Switch from "@mui/material/Switch";
// import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
// import tooltipIcon from "./tooltipIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
// import { dyp700_abi } from "../../web3";
import Countdown from "react-countdown";
import Slider from "react-slick";
import useWindowSize from "../../../../../hooks/useWindowSize";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

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

const GenesisLeaderboard = ({ username, userId, dypBalancebnb, address }) => {
  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
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
  const windowSize = useWindowSize();

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

  const [optionText, setOptionText] = useState("daily");
  const [optionText2, setOptionText2] = useState("wod");

  const [dailyrecords, setRecords] = useState([]);
  const [weeklyrecords, setWeeklyRecords] = useState([]);
  const [monthlyrecords, setMonthlyRecords] = useState([]);

  const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [prizes, setPrizes] = useState(dailyPrizes);
  const [activePlayer, setActivePlayer] = useState(false);
  const [userData, setUserData] = useState({});
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);
  const [skaleRecords, setskaleRecords] = useState([]);
  const [skalePreviousRecords, setskalePreviousRecords] = useState([]);
  const [skalepreviousVersion, setskalepreviousVersion] = useState(0);
  const [skaleMonthlyData, setSkaleMonthlyData] = useState([]);
  const [skalePreviousMonthlyData, setSkalePreviousMonthlyData] = useState([]);
  const [skalePreviousVersionMontly, setSkalePreviousVersionMontly] =
    useState(0);

  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);

  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);
  const [globalTooltip, setGlobalTooltip] = useState(false);

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

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
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
  };

  const fetchWeeklyRecords = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecords(result.data.data.leaderboard);
    setpreviousWeeklyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecords(result.data.data.leaderboard);
  };

  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    }
    fillRecords(result.data.data.leaderboard);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleOption = (item) => {
    setOptionText2(item);
    if (item === "bnb" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "bnb" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
    } else if (item === "skale" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "skale" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
    } else if (item === "wod" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "wod" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
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

  const fillRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskaleRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskaleRecords(finalData);
    }
  };

  const fillPreviousRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskalePreviousRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskalePreviousRecords(finalData);
    }
  };
  const fillRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkaleMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkaleMonthlyData(finalData);
    }
  };

  const fillPreviousRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkalePreviousMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkalePreviousMonthlyData(finalData);
    }
  };

  const fetchSkaleRecords = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setskalepreviousVersion(result.data.data.version);

    setskaleRecords(result.data.data.leaderboard);
    fillRecordsSkale(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecords = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      // setpreviousVersion(parseInt(result.data.data.version));
      setskalePreviousRecords(result.data.data.leaderboard);
      fillPreviousRecordsSkale(result.data.data.leaderboard);
    }
  };
  const fetchSkaleRecordsMonthly = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setskalepreviousVersion(result.data.data.version);

    setSkaleMonthlyData(result.data.data.leaderboard);
    fillRecordsSkaleMonthly(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecordsMonthly = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      // setpreviousVersion(parseInt(result.data.data.version));
      setSkalePreviousMonthlyData(result.data.data.leaderboard);
      fillPreviousRecordsSkaleMonthly(result.data.data.leaderboard);
    }
  };

  const fetchPreviousWinners = async () => {
    if (previousVersion != 0) {
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

  const fetchPreviousWeeklyWinners = async () => {
    if (previousWeeklyVersion != 0) {
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
    }
  };

  const fetchPreviousMonthlyWinners = async () => {
    if (previousMonthlyVersion != 0) {
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
    }
  };

  useEffect(() => {
    fetchDailyRecords();
    fetchWeeklyRecords();
    fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchSkaleRecords();
    fetchSkaleRecordsMonthly();
  }, []);

  useEffect(() => {
    fetchGenesisPreviousWinners();
    fetchPreviousWinners();
    fetchPreviousWeeklyWinners();
    fetchPreviousMonthlyWinners();
    fetchPreviousSkaleRecords();
    fetchPreviousSkaleRecordsMonthly();
  }, [
    previousGenesisVersion,
    previousMonthlyVersion,
    previousVersion,
    previousWeeklyVersion,
  ]);

  // useEffect(() => {
  //   handleOption(optionText);
  // }, [inactiveBoard]);

  useEffect(() => {
    if (countdown === null || countdown === undefined || countdown === "0") {
      setisActive(false);
    } else setisActive(true);
  }, [countdown]);



  return (
    <div
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-4 position-relative"
      style={{ alignSelf: "baseline", minWidth: "100%", maxWidth: "100%" }}
    >
          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div
              className={`d-flex w-100 position-relative  
                   justify-content-between p-2
               leaderboard-title-wrapper p-2`}
            >
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                MONTHLY
              </h6>
              <div className="d-flex flex-column px-2 reset-time-wrapper">
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monthly (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>

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
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={premiumAvatar}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={playerAvatar}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            ${getFormattedNumber(item.statValue, 0)}
                          </td>
                          {/* <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            ${getFormattedNumber(monthlyPrizes[index], 0)}
                          </td>
                          <td
                            className={`playerReward col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            +$
                            {getFormattedNumber(monthlyPrizesGolden[index], 0)}
                          </td> */}
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
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={premiumAvatar}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={playerAvatar}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            ${getFormattedNumber(item.statValue, 0)}
                          </td>
                          {/* <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            ${getFormattedNumber(monthlyPrizes[index], 0)}
                          </td>
                          <td
                            className={`playerReward d-flex align-items-center justify-content-center gap-2 mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                            style={{ width: "100%" }}
                          >
                            +$
                            {getFormattedNumber(monthlyPrizesGolden[index], 0)}
                            {optionText2 === "skale" && (
                              <img src={premiumIcon} alt="" />
                            )}
                          </td> */}
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

export default GenesisLeaderboard;
