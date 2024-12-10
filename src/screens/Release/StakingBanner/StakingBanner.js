import React from "react"; 
import "./_stakingbanner.scss";
import { NavLink } from "react-router-dom";

const StakingBanner = () => {
  return (
    <div className="staking-pool-banner p-3 w-100">
      <NavLink to="/staking">
        <div className="d-flex align-items-center justify-content-center">
          <div className="custom-container">
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
              <div className="d-flex flex-column w-100">
                <span className="staking-banner-title">
                  New{" "}
                  <mark
                    className="p-0 staking-banner-title"
                    style={{
                      color: "#71F1FF",
                      background: "transparent",
                    }}
                  >
                    WOD
                  </mark>{" "}
                  Staking Pools
                </span>
                <span className="staking-banner-desc">
                  Stake your assets to earn extra rewards
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100">
                <img src={'https://cdn.worldofdypians.com/wod/wodApr.svg'} alt="wodApr" />
                <img src={'https://cdn.worldofdypians.com/wod/wodTokens.webp'} alt="wodTokens" style={{ height: 85 }} />
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default StakingBanner;
