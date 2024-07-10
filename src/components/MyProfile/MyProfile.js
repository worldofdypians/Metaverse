import React from "react";
import "./_myprofile.scss";
import profileImage from "./assets/profileImage.png";
import premiumProfileImage from "./assets/premiumProfileImage.png";
import domainIcon from "./assets/domainIcon.svg";
import globalRankIcon from "./assets/globalRankIcon.svg";
import totalEarningsIcon from "./assets/totalEarningsIcon.svg";
import myRankIcon from "./assets/myRankIcon.svg";
import premiumTab from "./assets/premiumTab.svg";
import chainsFlag from "./assets/chainsFlag2.svg";
import chainsIcon from "./assets/chainsIcon.svg";
import globalFlag from "./assets/globalFlag2.svg";
import globalIcon from "./assets/globalIcon2.png";
import landFlag from "./assets/landFlag2.svg";
import landIcon from "./assets/landIcon.svg";
import bnb from "./assets/bnb.svg";

const MyProfile = () => {
  return (
    <div className="custom-container mt-5">
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="profile-card-wrapper p-3 d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <img src={profileImage} alt="" />
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="my-profile-username">DarkSliffer</h6>
                  <img src={premiumTab} alt="" />
                </div>
                <span className="my-profile-email mb-2">
                  dypiustesting@gmail.com
                </span>
                <div className="wallet-address-wrapper d-flex align-items-center justify-content-between p-2">
                  <div className="d-flex flex-column">
                    <span className="profile-wallet-span mb-2">
                      Wallet Address
                    </span>
                    <span className="wallet-addr">0xaC498...c7C9a</span>
                  </div>
                  <img src={domainIcon} width={30} height={30} alt="" />
                </div>
              </div>
            </div>
            <hr className="sidebar-separator my-2" />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={totalEarningsIcon} alt="" />
                  <span className="rank-card-span">Total Earnings</span>
                  <span className="rank-card-value">$5,325</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={globalRankIcon} alt="" />
                  <span className="rank-card-span">Global Rank</span>
                  <span className="rank-card-value">#4</span>
                </div>
              </div>
              <div className="rank-card-wrapper d-flex align-items-center justify-content-center p-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={myRankIcon} alt="" />
                  <span className="rank-card-span">My Rank</span>
                  <span className="rank-card-value">Unstoppable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="row ">
            <div className="col-12 col-lg-4">
              <div className="new-special-rewards-wrapper d-flex flex-column gap-4 p-3">
                <h6 className="special-rewards-title">Special Rewards</h6>
                <span className="special-rewards-span">Submit</span>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="game-leaderboards-wrapper position-relative h-100 d-flex align-items-center justify-content-between p-3">
                <div className="d-flex flex-column">
                  <h6 className="leaderboards-title">Game</h6>
                  <h6
                    className="leaderboards-title mb-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Leaderboards
                  </h6>
                </div>
                <div className="d-flex align-items-center leaderboards-flag-wrapper gap-3">
                  <div className="new-flag-wrapper global-flag">
                    <img src={globalFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Global</span>
                      <img src={globalIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div className="new-flag-wrapper chains-flag">
                    <img src={chainsFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Chains</span>
                      <img src={chainsIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div className="new-flag-wrapper land-flag">
                    <img src={landFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Genesis</span>
                      <img src={landIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="treasure-hunt-wrapper mt-4  d-flex align-items-center justify-content-between p-3">
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex flex-column">
                    <h6 className="leaderboards-title mb-0">Treasure</h6>
                    <h6
                      className="leaderboards-title"
                      style={{ color: "#00D0B4" }}
                    >
                      Hunt
                    </h6>
                  </div>
                  <span
                    className="special-rewards-span"
                    style={{ color: "#00D0B4" }}
                  >
                    View All
                  </span>
                </div>
                <div className="row">
                    <div className="new-treasure-hunt-card p-0 d-flex flex-column">
                      <div className="p-2 treasure-hunt-top d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src={bnb} width={20} height={20} alt="" />
                          <div className="d-flex flex-column">
                            <span className="treasure-hunt-title">
                              BNB Chain
                            </span>
                            <span className="treasure-hunt-rewards">
                              $20,000 BNB Rewards
                            </span>
                          </div>
                        </div>
                        <div
                          className={`position-relative events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                          style={{ top: 0 }}
                        >
                          <div
                            className="pulsatingDot"
                            style={{ width: 7, height: 7, marginRight: 5 }}
                          ></div>
                          <span>Live</span>
                        </div>
                      </div>
                      <div className="treasure-hunt-bottom p-1">
                        <div className="treasure-hunt-info d-flex flex-column p-1 gap-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="treasure-hunt-info-span">Type</span>
                            <span className="treasure-hunt-info-span" style={{color: "#18FFFF"}}>Explore and Mine</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="treasure-hunt-info-span">Total Earnings</span>
                            <span className="treasure-hunt-info-span" style={{color: "#18FFFF"}}>$253.67</span>
                          </div>
                        </div>
                        <hr className="sidebar-separator my-2" />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
