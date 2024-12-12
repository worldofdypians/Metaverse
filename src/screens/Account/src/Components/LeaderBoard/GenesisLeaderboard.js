import React, { useState, useEffect, useRef } from "react";
 
import "./_leaderboard.scss";
import OutsideClickHandler from "react-outside-click-handler";
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

const GenesisLeaderboard = ({
  username,
  data,
  previousdata,
  playerdata,
  activePlayer,
  email,
}) => {
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

  // const playerData = [
  //   {
  //     position: "1",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "2",
  //     displayName: "DarkSliffer",
  //     reward: "$500",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "3",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "4",
  //     displayName: "DarkSliffer",
  //     reward: "500",
  //     statValue: "7757920",
  //     premium: false,
  //   },

  //   {
  //     position: "5",
  //     displayName: "DarkSliffer",
  //     reward: "50",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "6",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "7",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "8",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "9",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  //   {
  //     position: "10",
  //     displayName: "DarkSliffer",
  //     reward: "---",
  //     premium: false,
  //     statValue: "7757920",
  //   },
  // ];
  // const [tooltip, setTooltip] = useState(false);
  // const sliderRef = useRef(null);
  // const windowSize = useWindowSize();

  // const placeholderplayerData = [
  //   {
  //     position: 0,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 1,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 2,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 3,
  //     displayName: "---",
  //     reward: "---",
  //     statValue: "---",
  //     premium: false,
  //   },

  //   {
  //     position: 4,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 5,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 6,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 7,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 8,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  //   {
  //     position: 9,
  //     displayName: "---",
  //     reward: "---",
  //     premium: false,
  //     statValue: "---",
  //   },
  // ];

  // const dailyPrizes = ["10", "8", "5", "5", "0", "0", "0", "0", "0", "0"];
  // const previous_dailyPrizes = [
  //   "20",
  //   "10",
  //   "8",
  //   "5",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  // ];

  // const dailyPrizesGolden = ["10", "8", "5", "5", "5", "5", "5", "5", "5", "5"];

  // const prizeSkale = ["25", "15", "10", "8", "5", "5", "5", "5", "5", "5"];

  // const previous_dailyPrizesGolden = [
  //   "20",
  //   "10",
  //   "8",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  // ];

  // const weeklyPrizes = ["25", "15", "10", "8", "0", "0", "0", "0", "0", "0"];
  // const weeklyPrizesGolden = [
  //   "25",
  //   "15",
  //   "10",
  //   "8",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  // ];

  // const previous_weeklyPrizes = [
  //   "40",
  //   "20",
  //   "15",
  //   "10",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  // ];

  // const previous_weeklyPrizesGolden = [
  //   "40",
  //   "20",
  //   "15",
  //   "10",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  //   "5",
  // ];

  // const monthlyPrizes = [
  //   "250",
  //   "150",
  //   "100",
  //   "50",
  //   "50",
  //   "20",
  //   "20",
  //   "10",
  //   "10",
  //   "10",
  // ];

  // const previous_monthlyPrizes = [
  //   "500",
  //   "250",
  //   "150",
  //   "50",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  // ];

  // const monthlyPrizesGolden = [
  //   "250",
  //   "150",
  //   "100",
  //   "50",
  //   "50",
  //   "20",
  //   "20",
  //   "10",
  //   "10",
  //   "10",
  // ];

  // const previous_monthlyPrizesGolden = [
  //   "500",
  //   "250",
  //   "150",
  //   "50",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  //   "25",
  // ];

  // const dummyPrizes = [
  //   "250",
  //   "150",
  //   "100",
  //   "50",
  //   "50",
  //   "20",
  //   "20",
  //   "10",
  //   "10",
  //   "10",
  // ];

  // const [optionText, setOptionText] = useState("daily");
  // const [optionText2, setOptionText2] = useState("wod");

  // const [dailyrecords, setRecords] = useState([]);
  // const [weeklyrecords, setWeeklyRecords] = useState([]);
  // const [monthlyrecords, setMonthlyRecords] = useState([]);

  // const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  // const [prizes, setPrizes] = useState(dailyPrizes);
  // const [activePlayer, setActivePlayer] = useState(false);
  // const [userData, setUserData] = useState({});
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // const [dailyplayerData, setdailyplayerData] = useState([]);
  // const [weeklyplayerData, setweeklyplayerData] = useState([]);
  // const [monthlyplayerData, setmonthlyplayerData] = useState([]);
  // const [skaleRecords, setskaleRecords] = useState([]);
  // const [skalePreviousRecords, setskalePreviousRecords] = useState([]);
  // const [skalepreviousVersion, setskalepreviousVersion] = useState(0);
  // const [skaleMonthlyData, setSkaleMonthlyData] = useState([]);
  // const [skalePreviousMonthlyData, setSkalePreviousMonthlyData] = useState([]);
  // const [skalePreviousVersionMontly, setSkalePreviousVersionMontly] =
  //   useState(0);

  // const [previousVersion, setpreviousVersion] = useState(0);
  // const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  // const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  // const [genesisData, setgenesisData] = useState([]);
  // const [previousgenesisData, setpreviousgenesisData] = useState([]);

  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  // const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);
  // const [globalTooltip, setGlobalTooltip] = useState(false);

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  // const fetchGenesisRecords = async () => {
  //   const data2 = {
  //     StatisticName: "GenesisLandRewards",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };

  //   const result2 = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data2)
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if (result2) {
  //     setgenesisData(result2.data.data.leaderboard);
  //     setpreviousGenesisVersion(result2.data.data.version);

  //     fillRecordsGenesis(result2.data.data.leaderboard);
  //   }
  // };

  // const nextSlide = () => {
  //   sliderRef.current.slickNext();
  // };
  // const prevSlide = () => {
  //   sliderRef.current.slickPrev();
  // };

  // const fetchDailyRecords = async () => {
  //   const data = {
  //     StatisticName: "DailyLeaderboard",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setpreviousVersion(parseInt(result.data.data.version));
  //   setRecords(result.data.data.leaderboard);
  //   fillRecords(result.data.data.leaderboard);
  // };

  // const fetchWeeklyRecords = async () => {
  //   const data = {
  //     StatisticName: "WeeklyLeaderboard",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setWeeklyRecords(result.data.data.leaderboard);
  //   setpreviousWeeklyVersion(result.data.data.version);
  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );
  //   fillRecords(result.data.data.leaderboard);
  // };

  // const fetchMonthlyRecords = async () => {
  //   const data = {
  //     StatisticName: "MonthlyLeaderboard",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setMonthlyRecords(result.data.data.leaderboard);
  //   setpreviousMonthlyVersion(result.data.data.version);
  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );
  //   if (testArray.length > 0) {
  //     setActivePlayer(true);
  //   }
  //   fillRecords(result.data.data.leaderboard);
  // };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  // const handleOption = (item) => {
  //   setOptionText2(item);
  //   if (item === "bnb" && inactiveBoard === false) {
  //     setPrizes(dummyPrizes);
  //   } else if (item === "bnb" && inactiveBoard === true) {
  //     setPrizes(dummyPrizes);
  //   } else if (item === "skale" && inactiveBoard === false) {
  //     setPrizes(dummyPrizes);
  //   } else if (item === "skale" && inactiveBoard === true) {
  //     setPrizes(dummyPrizes);
  //   } else if (item === "wod" && inactiveBoard === false) {
  //     setPrizes(dummyPrizes);
  //   } else if (item === "wod" && inactiveBoard === true) {
  //     setPrizes(dummyPrizes);
  //   }
  // };
  // const fillRecords = (itemData) => {
  //   if (itemData.length === 0) {
  //     setRecords(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setRecords(finalData);
  //   }
  // };

  // const fillRecordsGenesis = (itemData) => {
  //   if (itemData.length === 0) {
  //     setgenesisData(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setgenesisData(finalData);
  //   }
  // };

  // const fillRecordsSkale = (itemData) => {
  //   if (itemData.length === 0) {
  //     setskaleRecords(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setskaleRecords(finalData);
  //   }
  // };

  // const fillPreviousRecordsSkale = (itemData) => {
  //   if (itemData.length === 0) {
  //     setskalePreviousRecords(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setskalePreviousRecords(finalData);
  //   }
  // };
  // const fillRecordsSkaleMonthly = (itemData) => {
  //   if (itemData.length === 0) {
  //     setSkaleMonthlyData(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setSkaleMonthlyData(finalData);
  //   }
  // };

  // const fillPreviousRecordsSkaleMonthly = (itemData) => {
  //   if (itemData.length === 0) {
  //     setSkalePreviousMonthlyData(placeholderplayerData);
  //   } else if (itemData.length < 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setSkalePreviousMonthlyData(finalData);
  //   }
  // };

  // const fetchSkaleRecords = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardSkaleWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setskalepreviousVersion(result.data.data.version);

  //   setskaleRecords(result.data.data.leaderboard);
  //   fillRecordsSkale(result.data.data.leaderboard);
  // };

  // const fetchPreviousSkaleRecords = async () => {
  //   if (skalepreviousVersion != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardSkaleWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: skalepreviousVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard`,
  //       data
  //     );
  //     // setpreviousVersion(parseInt(result.data.data.version));
  //     setskalePreviousRecords(result.data.data.leaderboard);
  //     fillPreviousRecordsSkale(result.data.data.leaderboard);
  //   }
  // };
  // const fetchSkaleRecordsMonthly = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardSkaleMonthly",
  //     StartPosition: 0,
  //     MaxResultsCount: 10,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setskalepreviousVersion(result.data.data.version);

  //   setSkaleMonthlyData(result.data.data.leaderboard);
  //   fillRecordsSkaleMonthly(result.data.data.leaderboard);
  // };

  // const fetchPreviousSkaleRecordsMonthly = async () => {
  //   if (skalepreviousVersion != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardSkaleMonthly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: skalepreviousVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard`,
  //       data
  //     );
  //     // setpreviousVersion(parseInt(result.data.data.version));
  //     setSkalePreviousMonthlyData(result.data.data.leaderboard);
  //     fillPreviousRecordsSkaleMonthly(result.data.data.leaderboard);
  //   }
  // };

  // const fetchPreviousWinners = async () => {
  //   if (previousVersion != 0) {
  //     const data = {
  //       StatisticName: "DailyLeaderboard",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: previousVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setdailyplayerData(result.data.data.leaderboard);
  //   }
  // };

  // const fetchGenesisPreviousWinners = async () => {
  //   if (previousGenesisVersion != 0) {
  //     const data = {
  //       StatisticName: "GenesisLandRewards",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: previousGenesisVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );
  //     fillRecordsGenesis(result.data.data.leaderboard);

  //     setpreviousgenesisData(result.data.data.leaderboard);
  //   }
  // };

  // const fetchPreviousWeeklyWinners = async () => {
  //   if (previousWeeklyVersion != 0) {
  //     const data = {
  //       StatisticName: "WeeklyLeaderboard",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: previousWeeklyVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setweeklyplayerData(result.data.data.leaderboard);
  //   }
  // };

  // const fetchPreviousMonthlyWinners = async () => {
  //   if (previousMonthlyVersion != 0) {
  //     const data = {
  //       StatisticName: "MonthlyLeaderboard",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: previousMonthlyVersion - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setmonthlyplayerData(result.data.data.leaderboard);
  //   }
  // };

  // useEffect(() => {
  //   fetchDailyRecords();
  //   fetchWeeklyRecords();
  //   fetchMonthlyRecords();
  //   fetchGenesisRecords();
  //   fetchSkaleRecords();
  //   fetchSkaleRecordsMonthly();
  // }, []);

  // useEffect(() => {
  //   fetchGenesisPreviousWinners();
  //   fetchPreviousWinners();
  //   fetchPreviousWeeklyWinners();
  //   fetchPreviousMonthlyWinners();
  //   fetchPreviousSkaleRecords();
  //   fetchPreviousSkaleRecordsMonthly();
  // }, [
  //   previousGenesisVersion,
  //   previousMonthlyVersion,
  //   previousVersion,
  //   previousWeeklyVersion,
  // ]);

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
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-0 position-relative"
      style={{ alignSelf: "baseline", minWidth: "100%", maxWidth: "100%" }}
    >
      <div
        className="leaderboard-item d-flex flex-column p-0 w-100"
        style={{ background: "none" }}
      >
        <div className="greatcollection-leaderboard-banner d-flex align-items-center justify-content-between w-100 p-3 gap-3 position-relative">
          <div className="position-absolute" style={{ bottom: 8, right: 8 }}>
            <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
              <div className="d-flex align-items-center gap-2 position-relative">
                <span className={`text-white`} style={{ fontSize: 14 }}>
                  (Top 100)
                </span>
                <img
                  src={"https://cdn.worldofdypians.com/wod/tooltip.svg"}
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
                    The challenge is free to access by everyone.
                    <br />
                    <br />
                    Rare collectible items are hidden across the map, in both
                    common and hard-to-reach locations.
                    <br />
                    <br />
                    Players must collect partner branded items.
                    <br />
                    <br />
                    The collected amount contributes to unlocking more rewards
                    in the future.
                    <br />
                    <br />
                    Explore the Island Zero and Dypians City maps to maximize
                    item findings.
                    <br />
                    Use mounts or movement speed boosts to traverse large zones
                    quickly.
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          <div className="d-flex flex-column">
            {/* <h6 className="global-leaderboard-title mb-0">Great</h6>
              <h6
                className="global-leaderboard-title mb-0 d-flex algin-items-center"
                style={{ color: "#F4E27B" }}
              >
                Collection
              </h6> */}
            <h2
              className={`market-banner-title mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center   gap-2`}
              style={{ fontSize: "24px" }}
            >
              Great Collection
            </h2>
            {/* <span className="text-white" style={{ fontSize: 14 }}>
                (Top 100)
              </span> */}
          </div>
        </div>
        <div className="p-2 pt-0 table-outer-margin">
          <table className="playerTable w-100">
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
                  Collected
                </th>
              </tr>
              {data &&
                data.length > 0 &&
                inactiveBoard === false &&
                data.map((item, index) => {
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
                              src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
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
                              src={
                                "https://cdn.worldofdypians.com/wod/userAvatar2.png"
                              }
                              alt=""
                              className="playerAvatar"
                            />{" "}
                            {item.displayName?.slice(0, 13)}
                            {item.displayName?.length > 13 && "..."}
                          </div>
                        )}
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        {getFormattedNumber(item.statValue, 0)}
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

              {previousdata &&
                inactiveBoard === true &&
                previousdata.length > 0 &&
                previousdata.map((item, index) => {
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
                              src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
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
                              src={
                                "https://cdn.worldofdypians.com/wod/userAvatar2.png"
                              }
                              alt=""
                              className="playerAvatar"
                            />{" "}
                            {item.displayName?.slice(0, 13)}
                            {item.displayName?.length > 13 && "..."}
                          </div>
                        )}
                      </td>
                      <td className="playerScore col-2 text-center font-montserrat">
                        {getFormattedNumber(item.statValue, 0)}
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
        {activePlayer === false && email && inactiveBoard === false && (
          <table className="playerTable w-100 mt-2">
            <tbody>
              <tr className={`playerInnerRow-inactive`}>
                <td className={`playerData font-montserrat col-1`}>
                  {playerdata[0].statValue > 0 ? (
                    <>
                      {getFormattedNumber(
                        parseInt(playerdata[0]?.position) + 1,
                        0
                      )}
                    </>
                  ) : (
                    <span style={{ fontSize: 10 }}>No Rank</span>
                  )}
                </td>
                <td className="playerName col-5 font-montserrat">
                  <div className="position-relative  d-flex align-items-center">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/userAvatar2.png"}
                      alt=""
                      className="playerAvatar"
                      style={{
                        filter: "grayscale(1)",
                      }}
                    />{" "}
                    {playerdata[0]?.displayName?.slice(0, 13)}
                    {playerdata[0]?.displayName?.length > 13 && "..."}
                  </div>
                </td>
                <td className="playerScore col-2 text-center font-montserrat">
                  {getFormattedNumber(playerdata[0].statValue, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {/* <div className="optionsWrapper p-2">
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
      </div> */}
    </div>
  );
};

export default GenesisLeaderboard;
