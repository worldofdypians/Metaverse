import Countdown from "react-countdown";
import "./_booster.scss";
import { useEffect, useState } from "react";
import "../Kickstarter/components/kickstarter_newcss.scss";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="d-flex align-items-center gap-1 justify-content-center">
      <div className="d-flex flex-column timer-item">
        <h6 className="selection-time">{days < 10 ? "0" + days : days}</h6>
        <span className="selection-days">Days</span>
      </div>
      {/* <h6 className="selection-time">:</h6> */}
      <div className="d-flex flex-column timer-item">
        <h6 className="selection-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="selection-days">Hours</span>
      </div>
      {/* <h6 className="selection-time">:</h6> */}
      <div className="d-flex flex-column timer-item">
        <h6 className="selection-time">
          {minutes < 10 ? "0" + minutes : minutes}
        </h6>
        <span className="selection-days">Minutes</span>
      </div>
    </div>
  );
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "#2a2f5a",
    }),
  },
}));

const BoosterPopup = ({ userDataStar, userPreviousDataStar,userPreviousDataStar2 }) => {
  const nextSelectionDate = new Date("2025-12-13T14:00:00.000+02:00");

  const [isWinner, setIsWinner] = useState(false);
  const [showPreviousMonth, setShowPreviousMonth] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: undefined,
  });
  // Calculate previous month
  const previousDate = new Date(currentDate);
  previousDate.setMonth(previousDate.getMonth() - 1);
  const previousMonth = previousDate.toLocaleString("default", {
    month: "long",
    year: undefined,
  });

  const previousDate2 = new Date(previousDate);
  previousDate2.setMonth(previousDate2.getMonth() - 1);
  const previousMonth2 = previousDate2.toLocaleString("default", {
    month: "long",
    year: undefined,
  });

  let previousIsWinner = Math.random() > 0.85;
  const now = new Date();
  const utcDate = new Date().getUTCDate();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const isAfterCutoff = utcHours === 0 && utcMinutes >= 30;
  const cutoffDate = 3;

  // Use current or previous month data based on toggle
  const displayRank = showPreviousMonth
    ? utcDate < cutoffDate || (isAfterCutoff && utcDate === 1)
      ? userPreviousDataStar2
      : userPreviousDataStar
    : utcDate < cutoffDate || (isAfterCutoff && utcDate === 1)
    ? userPreviousDataStar
    : userDataStar;
  const displayIsWinner = showPreviousMonth ? previousIsWinner : isWinner;
  const displayRewardAmount = showPreviousMonth ? "40 WOD" : "40 WOD";
  const displayMonth = showPreviousMonth
    ? utcDate < cutoffDate || (isAfterCutoff && utcDate === 1)
      ? previousMonth2
      : previousMonth
    : utcDate < cutoffDate || (isAfterCutoff && utcDate === 1)
    ? previousMonth
    : currentMonth;
  const displayStatus = showPreviousMonth
    ? "completed"
    : utcDate < cutoffDate || (isAfterCutoff && utcDate === 1)
    ? "ongoing"
    : "";

  const isEligible = displayRank > 100;

  // useEffect(() => {
  //   if (userDataStar > 101) {
  //     setisEligible(true);
  //   }
  // }, [userDataStar]);

  return (
    <div
      className={`d-flex flex-column gap-3 leaderboard-wrapper position-relative`}
    >
      <div className="d-flex align-items-center justify-content-center">
        <img
          src="https://cdn.worldofdypians.com/wod/boosterImg.png"
          alt=""
          className="h-16"
        />
      </div>
      <span className="booster-title">Booster 1001</span>
      <span className="booster-desc text-center">
        Special monthly rewards for players outside the top 100 global
        leaderboard
      </span>
      <div className="d-flex flex-column gap-3 rewardstable-wrapper3 px-3 px-lg-0">
        <div className="">
          <div className="d-flex flex-column gap-3 justify-content-between">
            {/* <div>
              <span className="booster-list-title">Eligibility</span>
              <ul className="booster-list-text mb-0">
                <li>Ranked 101+ on monthly leaderboard </li>
                <li>Active participation required</li>
                <li>Fair play policies enforced</li>
                <li>Gives everyone outside top 100 a chance</li>
              </ul>
            </div>
            <div>
              <span className="booster-list-title">Selection Process</span>
              <ul className="booster-list-text mb-0">
                <li>1001 winners selected monthly</li>
                <li>Random selection from eligible players</li>
                <li>Results announced after month end</li>
                <li>Equal chances for all eligible players</li>
              </ul>
            </div> */}
            {/* Grand Prize */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500/40 via-orange-500/40 to-red-500/40 bordertw-2 border-yellow-400/60 p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <img
                      src="https://cdn.worldofdypians.com/wod/crown.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-200 mb-0">
                      Grand Prize
                    </p>
                    <p className="text-sm text-yellow-100/90 mb-0">
                      1 Lucky Winner
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <div className="text-2xl font-medium text-yellow-200">
                    1500
                  </div>
                  <div className="text-sm text-yellow-100/90 text-right">
                    WOD
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Winners */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-indigo-500/40 bordertw-2 border-blue-400/60 p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <img
                      src="https://cdn.worldofdypians.com/wod/coins.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-0">Regular</p>
                    <p className="text-sm text-blue-100/90 mb-0">
                      1000 Winners
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <div className="text-2xl font-medium text-blue-200">40</div>
                  <div className="text-sm text-blue-100/90">WOD</div>
                </div>
              </div>
            </div>

            {/* Total Prizes Display */}
            {/* <div className="text-center py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full bordertw border-green-400/50">
            
                <span className="text-sm text-green-200">
                  1001 Total Winners Each Month
                </span>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="px-4 py-3 boost-rank-wrapper">
          <div className="d-flex align-items-center gap-2 justify-content-between">
            <div className="d-flex flex-column">
              <span className="booster-list-title">September Rank</span>
              {isEligible ? (
                <ul className="booster-status-eligible mb-0">
                  <li>Eligible</li>
                </ul>
              ) : (
                <ul className="booster-status-loser mb-0">
                  <li>Not Eligible</li>
                </ul>
              )}
            </div>
            <div
              className={`d-flex px-3 justify-content-center align-items-center ${
                userDataStar > 100 && userDataStar > 0
                  ? " boost-rank"
                  : "boost-rank-yellow"
              }`}
            >
              <span
                className={`${
                  userDataStar > 100 && userDataStar > 0
                    ? "booster-list-title"
                    : "booster-rank-text-dark"
                }`}
              >
                #{userDataStar === 0 ? "---" : userDataStar}
              </span>
            </div>
          </div>
        </div> */}
        <div className="trading-comp-divider"></div>
        <div className="p-4 rounded-2xl bordertw border-white/20">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2 justify-content-between">
              <div className="d-flex align-items-center gap-3 justify-content-start">
                <span className="booster-list-title">{displayMonth}</span>
                {/* {displayStatus === "" && (
                  <div
                    variant="outline"
                    className="inline-flex items-center justify-center rounded-md bordertw px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-blue-500/10 text-blue-400 border-blue-500/30"
                  >
                    <img
                      src="https://cdn.worldofdypians.com/wod/ongoingClock.svg"
                      alt=""
                      className="w-3 h-3 mr-1"
                    />
                    Ongoing
                  </div>
                )} */}
              </div>
              {currentMonth !== "September" && (
                <div
                  className={`optionsWrapper3 w-fit boost-rank-wrapper p-2 d-flex align-items-center justify-content-between gap-2`}
                >
                  <div className="flex items-center gap-2">
                    <span className="viewWinners">Previous</span>
                  </div>
                  <AntSwitch
                    onChange={() => {
                      setShowPreviousMonth(!showPreviousMonth);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex align-items-center gap-3 justify-content-between p-2 boost-rank-wrapper">
              <span className="booster-list-title capitalize">
                My Global Rank
              </span>
              <div
                className={`d-flex px-3 justify-content-center align-items-center ${
                  !showPreviousMonth
                    ? " boost-rank"
                    : "boost-rank-gray"
                }`}
              >
                <span
                  className={`${
                    "booster-list-title" 
                  }`}
                >
                  {displayRank === 0 ? "No rank" : "#" + displayRank}
                </span>
              </div>
            </div>
            {isEligible && displayIsWinner && displayStatus === "completed" ? (
              <div className="p-3 boost-winner-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <h3>🎉</h3>
                  <div className="d-flex flex-column">
                    <span className="booster-winner-title">
                      Congratulations! You're a Winner!
                    </span>
                    <span className="booster-winner-desc">
                      You've won $1 in boosted rewards this month.
                    </span>
                  </div>
                </div>
              </div>
            ) : isEligible &&
              !displayIsWinner &&
              displayStatus === "completed" ? (
              <div className="p-3 boost-loser-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <h3>🎁</h3>
                  <div className="d-flex flex-column">
                    <span className="booster-loser-title">
                      You didn't win this month
                    </span>
                    <span className="booster-loser-desc">
                      Better luck next month! 1001 winners are selected from all
                      eligible players.
                    </span>
                  </div>
                </div>
              </div>
            ) : displayStatus === "ongoing" ? (
              <div className="p-3 boost-neutral-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ongoingClock.svg"
                    alt=""
                    className="w-7 h-7 mr-1"
                  />
                  <div className="d-flex flex-column">
                    <span className="booster-neutral-title">
                      Selection In Progress
                    </span>
                    <span className="booster-neutral-desc">
                      Winners will be announced within the first two days and the rewards will be announced within 10 days.
                      Good luck!
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 boost-neutral-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ongoingClock.svg"
                    alt=""
                    className="w-7 h-7 mr-1"
                  />
                  <div className="d-flex flex-column">
                    <span className="booster-neutral-title">
                      Ongoing Giveaway
                    </span>
                    <span className="booster-neutral-desc">
                      The giveaway is in progress until the end of the month.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {currentMonth !== "September" && (
          <div
            className={`optionsWrapper2 boost-rank-wrapper p-2 d-flex align-items-center justify-content-between gap-2`}
          >
            <div className="flex items-center gap-2">
              <span className="viewWinners">View previous month</span>
            </div>
            <Switch
              onChange={() => {
                setShowPreviousMonth(!showPreviousMonth);
              }}
            />
          </div>
        )} */}
        {/* <div className="p-4  boost-rank-wrapper">
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 justify-content-lg-between justify-content-center">
            <span className="booster-list-title">Next Selection in</span>
            <div className="d-flex align-items-center">
              <Countdown date={nextSelectionDate} renderer={renderer} />
            </div>
          </div>
        </div> */}
        <div className="p-4 rounded-2xl bordertw border-white/20">
          <div>
            <span className="booster-list-title d-flex align-items-center gap-1">
              <img
                src="https://cdn.worldofdypians.com/wod/eligibleStar.svg"
                alt=""
              />
              Eligibility
            </span>
            <ul className="booster-list-text mb-0">
              <li>Must be ranked 101+ on monthly leaderboard</li>
              <li>Must have a minimum score</li>
              <li>1001 lucky winners selected each month</li>
              <li>
                Rewards are distributed within 10 days after the month ends
              </li>
              <li>Random selection from all eligible players</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoosterPopup;
