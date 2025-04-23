import React from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import { NavLink } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "200px !important",
    minWidth: "90px !important",
    fontSize: theme.typography.pxToRem(12),
  },
}));

const RankSmallPopup = ({
  onClose,
  userRank,
  userRankSkale,
  userBnbStars,
  userSkaleStars,
  userRankCore,
  userCoreStars,
  userRankViction,
  userVictionStars,
  rankData,
  userDataStar,
  userRankManta,
  userMantaStars,
  userRankBase,
  userBaseStars,
  userRankTaiko,
  userTaikoStars,
  userMatStars,
  userRankName,
  primeStars,
  globalMonthly,
  globalWeekly,
  isPremium,
  userRankMat,
  userRankSei,
  userSeiStars,
  userBnbScore,
  userMatScore,
  userSeiScore,
  userMantaScore,
  userBaseScore,
  userTaikoScore,
  userSkaleScore,
  userCoreScore,
  userVictionScore,
  onPrimeClick,
  userRankVanar,
  userVanarScore,
  userVanarStars,
}) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup my-progress-popup p-4">
        <div className=" package-popup-title-wrapper d-flex align-items-center position-relative justify-content-between mb-2">
          <div className="package-popup-title mb-0">My Progress</div>{" "}
          <img
            src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
            className="popup-closer"
            onClick={onClose}
            alt=""
          />
        </div>
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center">
          <img
            src={"https://cdn.worldofdypians.com/wod/rankBanner.webp"}
            alt=""
            style={{ width: "100%" }}
            className="d-none d-lg-flex"
          />
          <div className="d-flex w-100 justify-content-center gap-2 gap-lg-4 align-items-center rank-chain-stats">
            <div className="rank-chain-status-grid w-100 px-0 px-lg-3">
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value">#{globalMonthly}</span>
                <span className="stats-desc">Global Monthly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value">#{globalWeekly}</span>
                <span className="stats-desc">Global Weekly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value d-flex align-items-center gap-2">
                  {/* <img
                    src={star}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  /> */}
                  {getFormattedNumber(userDataStar.statValue, 0)}
                </span>
                <span className="stats-desc">Total Stars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="package-popup-content-rank p-1">
          <div className="d-flex flex-column gap-1 align-items-center">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="chainstatustxt">Daily Status</span>
            </div>
            <div className="rank-chain-status-grid w-100">
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userBnbScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRank + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBnbScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBnbStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/matchainIcon.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userMatScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankMat + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMatScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMatStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userSeiScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankSei + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSeiScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSeiStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/manta.png"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userMantaScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankManta + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMantaScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userMantaStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/baseBlueLogo.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userBaseScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankBase + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBaseScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userBaseStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userTaikoScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankTaiko + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userTaikoScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userTaikoStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/skaleIcon.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userSkaleScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankSkale + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSkaleScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userSkaleStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/core.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userCoreScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankCore + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userCoreScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userCoreStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/viction.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userVictionScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankViction + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userVictionScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userVictionStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div>
              {/* <div className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/vanar.svg"}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Rank</span>
                    <span className="rank-dropdown-text-yellow">
                      {userVictionScore === 0
                        ? "No Rank"
                        : ` #${getFormattedNumber(userRankVanar + 1, 0)}`}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Score</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userVanarScore, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="rank-dropdown-text">Stars</span>
                    <span className="rank-dropdown-text-yellow">
                      {getFormattedNumber(userVanarStars, 0)}
                    </span>
                  </div>
                  <div className="sidebar-separator2"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <NavLink to="/account/prime" onClick={onPrimeClick}>
          <div className="rank-premium-status-wrapper p-2 mt-2">
            <div className="d-flex align-items-center gap-2 justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/premiumBadge.png"}
                  alt=""
                />
                <div className="d-flex flex-column">
                  <span
                    className="rank-upgrade-status"
                    style={{ color: "#f3bf09" }}
                  >
                    {" "}
                    {isPremium ? " Prime Enabled" : "Become Prime"}
                  </span>
                  {/* <span className="rank-upgrade-status-bottom">
                    {isPremium ? " Prime Enabled" : "Prime"}
                  </span> */}
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 starscontentwrapper">
                  <span
                    className="startext"
                    style={{ color: primeStars === true ? "#ffd37e" : "gray" }}
                  >
                    {/* {primeStars === true ? "+ 50 Stars" : "In Progress"} */}
                    +50 Stars
                  </span>
                </div>
                <HtmlTooltip
                  placement="top"
                  title={
                    <span className="card-eth-chain-text">
                      With Prime enabled, earn 50 extra stars if you're in the
                      top 100 of any leaderboard!
                    </span>
                  }
                >
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/tooltipIconYellow.svg"
                    }
                    alt=""
                  />
                </HtmlTooltip>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default RankSmallPopup;
