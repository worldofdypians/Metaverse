import React from "react";
import "./_challenges.scss";
import criticalHitBanner from "./assets/criticalHitBanner.png";
import criticalHitLand from "./assets/criticalHitLand.png";
import eth from "./assets/eth.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import { NavLink } from "react-router-dom";

const CriticalHit = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" />
          <img src={criticalHitBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Critical Hit</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Critical Hit event, exclusively for Genesis Land NFT owners,
            offers a daily opportunity to earn points and rewards. Through a
            random mechanism, players accumulate points to increase their global
            rank or earn BNB rewards.
          </p>
        </div>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <h6 className="mb-0 purchase-package-title">Purchase</h6>
        <div className="d-flex align-items-end gap-2">
          <span className="available-on">Available on</span>
          <img src={eth} width={20} height={20} alt="" />
          <span className="purchase-chain">Ethereum</span>
        </div>
      </div>
      <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
        <img src={criticalHitLand} className="critical-hit-img" alt="" />
        <NavLink className="stake-wod-btn px-4 py-2" to={'/marketplace/land'}>Get Genesis Land</NavLink>
      </div>
    </div>
  );
};

export default CriticalHit;
