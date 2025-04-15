import React from "react"; 

const CriticalHitPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup critical-hit-popup p-4">
        <div className=" package-popup-title-wrapper position-relative d-flex align-items-center justify-content-between mb-2">
          <h6 className="package-popup-title">
            Critical{" "}
            <mark
              className="p-0 package-popup-title"
              style={{
                color: "#DCFB85",
                background: "transparent",
              }}
            >
              Hit
            </mark>
          </h6>
          <img
            src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className="position-relative mb-3">
          <img src={"https://cdn.worldofdypians.com/wod/criticalPopup.webp"} alt="" style={{ width: "100%" }} />
        </div>

        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            As a Genesis Land NFT holder, you can participate in the daily
            Critical Hit event to earn points and rewards. Each day, you need to
            log in to the game and visit your land. On your land, you have a
            Genesis Gem, which you need to break with a pickaxe. Once broken, it
            gives you either points that are added to your leaderboard rank on
            BNB Chain or direct rewards in WOD.
          </p>
          <h6 className="text-white">What is Genesis Land?</h6>
          <p className="package-popup-desc">
            Genesis Land is a 125x125 area in World of Dypians, available to
            those who own a Genesis Land NFT. Benefits include exclusive
            rewards, Land NFT staking pool, and special in-game events like
            Critical Hit.
          </p>

          <h6 className="text-white">How it works:</h6>

          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Earn 30,000-80,000 points by destroying the Gem
            </li>
            <li className="package-popup-desc">
              Receive rewards ranging from $20 to $7,000
            </li>
            <li className="package-popup-desc">
              Rewards are distributed monthly, and you can destroy the Gem once
              every 24 hours (00:30 UTC).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CriticalHitPopup;
