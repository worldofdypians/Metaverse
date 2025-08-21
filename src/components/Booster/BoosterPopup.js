import Countdown from "react-countdown";
import "./_booster.scss";
import { useEffect, useState } from "react";

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

const BoosterPopup = ({ userDataStar }) => {
  const nextSelectionDate = new Date("2025-12-13T14:00:00.000+02:00");
  const [isEligible, setisEligible] = useState(false);
  const [isWinner, setIsWinner] = useState(true);

  useEffect(() => {
    if (userDataStar > 101) {
      setisEligible(true);
    }
  }, [userDataStar]);

  return (
    <div
      className={`d-flex flex-column gap-3 leaderboard-wrapper position-relative`}
    >
      <div className="d-flex align-items-center justify-content-center">
        <img
          src="https://cdn.worldofdypians.com/wod/boosterImg.png"
          alt=""
          className="h-24"
        />
      </div>
      <span className="booster-title">Booster 1001</span>
      <span className="booster-desc text-center">
        Special rewards for players outside the top 100
      </span>
      <div className="d-flex flex-column gap-3 rewardstable-wrapper3 px-3 px-lg-0">
        <div className="p-4 rounded-2xl bordertw border-white/20">
          <div className="d-flex flex-lg-row flex-column gap-lg-5 gap-3 justify-content-between">
            <div>
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
            </div>
          </div>
        </div>
        <div className="px-4 py-3 boost-rank-wrapper">
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
        </div>
        <div className="trading-comp-divider"></div>
        <div className="p-4 rounded-2xl bordertw border-white/20">
          <div className="d-flex flex-column gap-3">
            <span className="booster-list-title">August 2025 Status</span>
            {isEligible && isWinner ? (
              <div className="p-3 boost-winner-wrapper">
                <div className="d-flex align-items-center gap-3 flex-column flex-lg-row">
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
            ) : !isWinner ? (
              <div className="p-3 boost-loser-wrapper">
                <div className="d-flex align-items-center gap-3 flex-column flex-lg-row">
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
            ) : (
              <div className="p-3 boost-neutral-wrapper">
                <div className="d-flex align-items-center gap-3 flex-column flex-lg-row">
                  <h3>🍀</h3>
                  <div className="d-flex flex-column">
                    <span className="booster-neutral-title">Not Eligible</span>
                    <span className="booster-neutral-desc">
                      You were in the top 100! Boosted rewards are for players
                      ranked 101+.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4  boost-rank-wrapper">
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 justify-content-lg-between justify-content-center">
            <span className="booster-list-title">Next Selection in</span>
            <div className="d-flex align-items-center">
              <Countdown date={nextSelectionDate} renderer={renderer} />
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="d-flex">
            <span className="booster-list-text mb-0">
              *Winners will be displayed at the beginning of next month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoosterPopup;
