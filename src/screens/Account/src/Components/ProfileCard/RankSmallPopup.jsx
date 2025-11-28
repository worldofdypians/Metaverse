import React, { memo } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import { NavLink } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import { useSelector } from "react-redux";

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

const RankSmallPopup = ({ onClose, onPrimeClick }) => {
  // Get user progress data from Redux store
  const userProgress = useSelector((state) => state.user.userProgress);
  // Define all chains with their data
  const chains = [
    {
      id: "bnb",
      name: "BNB",
      icon: "https://cdn.worldofdypians.com/wod/bnbIcon.svg",
      rank: userProgress.userRank,
      score: userProgress.userBnbScore,
      stars: userProgress.userBnbStars,
    },
    {
      id: "base",
      name: "Base",
      icon: "https://cdn.worldofdypians.com/wod/base.svg",
      rank: userProgress.userRankBase,
      score: userProgress.userBaseScore,
      stars: userProgress.userBaseStars,
    },
    {
      id: "core",
      name: "Core",
      icon: "https://cdn.worldofdypians.com/wod/core.svg",
      rank: userProgress.userRankCore,
      score: userProgress.userCoreScore,
      stars: userProgress.userCoreStars,
    },
    {
      id: "sei",
      name: "Sei",
      icon: "https://cdn.worldofdypians.com/wod/seiLogo.svg",
      rank: userProgress.userRankSei,
      score: userProgress.userSeiScore,
      stars: userProgress.userSeiStars,
    },
    {
      id: "taiko",
      name: "Taiko",
      icon: "https://cdn.worldofdypians.com/wod/taiko.svg",
      rank: userProgress.userRankTaiko,
      score: userProgress.userTaikoScore,
      stars: userProgress.userTaikoStars,
    },
    {
      id: "vanar",
      name: "Vanar",
      icon: "https://cdn.worldofdypians.com/wod/vanar.svg",
      rank: userProgress.userRankVanar,
      score: userProgress.userVanarScore,
      stars: userProgress.userVanarStars,
    },
    // {
    //   id: 'taraxa',
    //   name: 'Taraxa',
    //   icon: 'https://cdn.worldofdypians.com/wod/taraxa.svg',
    //   rank: userProgress.userRankTaraxa,
    //   score: userProgress.userTaraxaScore,
    //   stars: userProgress.userTaraxaStars
    // },

    {
      id: "manta",
      name: "Manta",
      icon: "https://cdn.worldofdypians.com/wod/manta.png",
      rank: userProgress.userRankManta,
      score: userProgress.userMantaScore,
      stars: userProgress.userMantaStars,
    },

    {
      id: "skale",
      name: "Skale",
      icon: "https://cdn.worldofdypians.com/wod/skaleIcon.svg",
      rank: userProgress.userRankSkale,
      score: userProgress.userSkaleScore,
      stars: userProgress.userSkaleStars,
    },
    {
      id: "viction",
      name: "Viction",
      icon: "https://cdn.worldofdypians.com/wod/viction.svg",
      rank: userProgress.userRankViction,
      score: userProgress.userVictionScore,
      stars: userProgress.userVictionStars,
    },
    // {
    //   id: 'mat',
    //   name: 'MAT',
    //   icon: 'https://cdn.worldofdypians.com/wod/matchainIcon.svg',
    //   rank: userProgress.userRankMat,
    //   score: userProgress.userMatScore,
    //   stars: userProgress.userMatStars
    // }
  ];

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
                <span className="stats-value">
                  #{getFormattedNumber(userProgress.globalMonthly, 0)}
                </span>
                <span className="stats-desc">Global Monthly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value">
                  #{getFormattedNumber(userProgress.globalWeekly, 0)}
                </span>
                <span className="stats-desc">Global Weekly</span>
              </div>
              <div className="stats-container-4 d-flex flex-column align-items-center justify-content-center">
                <span className="stats-value d-flex align-items-center gap-2">
                  {/* <img
                    src={star}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  /> */}
                  {getFormattedNumber(userProgress.totalStars, 0)}
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
              {chains.map((chain) => (
                <div
                  key={chain.id}
                  className="rank-chain-status-item p-3 d-flex flex-column align-items-center gap-2"
                >
                  <img
                    src={chain.icon}
                    width={30}
                    height={30}
                    alt={chain.name}
                  />
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span className="rank-dropdown-text">Rank</span>
                      <span className="rank-dropdown-text-yellow">
                        {chain.score === 0
                          ? "No Rank"
                          : ` #${getFormattedNumber(chain.rank + 1, 0)}`}
                      </span>
                    </div>
                    <div className="sidebar-separator2"></div>
                  </div>
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span className="rank-dropdown-text">Score</span>
                      <span className="rank-dropdown-text-yellow">
                        {getFormattedNumber(chain.score, 0)}
                      </span>
                    </div>
                    <div className="sidebar-separator2"></div>
                  </div>
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span className="rank-dropdown-text">Stars</span>
                      <span className="rank-dropdown-text-yellow">
                        {getFormattedNumber(chain.stars, 0)}
                      </span>
                    </div>
                    <div className="sidebar-separator2"></div>
                  </div>
                </div>
              ))}
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
                    {userProgress.isPremium ? " Prime Enabled" : "Become Prime"}
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
                    style={{
                      color:
                        userProgress.primeStars === true ? "#ffd37e" : "gray",
                    }}
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

export default memo(RankSmallPopup);
