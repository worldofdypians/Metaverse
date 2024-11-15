import React from "react";
import "./_game.scss";
import gameFeatureArrow from "../../assets/gameAssets/gameFeatureArrow.svg";
import gameLeaderboard from "../../assets/gameAssets/gameLeaderboard.svg";
import gameGoldenPass from "../../assets/gameAssets/gameGoldenPass.png";

const FeatureSection = () => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-5 gap-lg-0 align-items-center justify-content-between mt-5 px-0">
      <div className="leaderboards-game-wrapper d-flex align-items-center justify-content-between p-5">
        <div className="d-flex flex-column gap-5">
          <h6 className="mb-0 game-feature-title">Leaderboards</h6>
          <p className="mb-0 game-feature-desc">
            Rise to the top, earn recognition as the best player in the
            ecosystem, and claim rewards.
          </p>
          <div className="d-flex align-items-center gap-1">
            <span className="game-feature-redirect">View Rankings</span>
            <img src={gameFeatureArrow} alt="" />
          </div>
        </div>
        <img src={gameLeaderboard} className="game-feature-img" alt="" />
      </div>
      <div className="golden-pass-game-wrapper d-flex align-items-center justify-content-between p-5">
        <img src={gameGoldenPass} className="game-feature-img" alt="" />

        <div className="d-flex flex-column align-items-end gap-5">
          <h6 className="mb-0 game-feature-title text-end">Golden Pass</h6>
          <p className="mb-0 game-feature-desc text-end">
            Unlock extra rewards to boost your gaming experience and level up
            faster.
          </p>
          <div className="d-flex align-items-center gap-1">
            <span className="game-feature-redirect text-end">
              Get Golden Pass
            </span>
            <img src={gameFeatureArrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
