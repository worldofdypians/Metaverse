import React, { useEffect, useState } from "react";
import skaleActive from "../../Components/LeaderBoard/assets/skaleActive.svg";
import bnbActive from "../../Components/LeaderBoard/assets/bnbActive.svg";
import coreActive from "../../Components/LeaderBoard/assets/coreActive.svg";
import victionActive from "../../Components/LeaderBoard/assets/victionActive.svg";
import mantaActive from "../../Components/LeaderBoard/assets/mantaActive.png";
import baseLogo from "../../Components/LeaderBoard/assets/baseActive.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import star from "./assets/star.svg";
import OutsideClickHandler from "react-outside-click-handler";
import taikoLogo from "../../Components/LeaderBoard/assets/taikoActive.svg";
import x4 from "./assets/4x.svg";
import arrowCircle from "./assets/arrowCircle.svg";
import popupXmark from "../../../../Marketplace/assets/popupXmark.svg";
import goldenPopup from "./assets/rankBanner.webp";
import premiumBadge from "./assets/premiumBadge.png";
import { NavLink } from "react-router-dom";

const RankSmallPopup = ({
  onClose,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  userRankCore,
  userCoreScore,
  userRankViction,
  userVictionScore,
  rankData,
  userDataStar,
  userRankManta,
  userMantaScore,
  userRankBase,
  userBaseScore,
  userRankTaiko,
  userTaikoScore,
  userMatScore,
  userRankName,
  onRankPopupClick,
  primeStars,
  globalMonthly,
  globalWeekly,
  isPremium
}) => {
  const [userProgress, setUserProgress] = useState(0);

  const userTotalScore =
    userBnbScore +
    userSkaleScore +
    userCoreScore +
    userVictionScore +
    userMantaScore +
    userBaseScore +
    userTaikoScore +
    userMatScore;

  const handleUserRank = () => {
    let allScore;
    if (rankData && rankData.multiplier === "yes") {
      allScore = userTotalScore * 4;
    } else if (rankData && rankData.multiplier === "no") {
      allScore = userTotalScore;
    }
    if (allScore > 63999999) {
      // setUserRankName({
      //   name: "unstoppable",
      //   id: 4,
      // });
      // sliderRef?.current?.innerSlider?.slickGoTo(4);
      setUserProgress(100);
    } else if (allScore > 38999999) {
      //   setUserRankName({
      //     name: "champion",
      //     id: 3,
      //   });
      // sliderRef?.current?.innerSlider?.slickGoTo(3);
      setUserProgress((allScore / 64000000) * 100);
    } else if (allScore > 25999999) {
      // setUserRankName({
      //   name: "underdog",
      //   id: 2,
      // });
      // sliderRef?.current?.innerSlider?.slickGoTo(2);
      setUserProgress((allScore / 39000000) * 100);
    } else if (allScore > 13999999) {
      // setUserRankName({
      //   name: "rookie",
      //   id: 1,
      // });
      // sliderRef?.current?.innerSlider?.slickGoTo(1);
      setUserProgress((allScore / 26000000) * 100);
    } else {
      // sliderRef?.current?.innerSlider?.slickGoTo(0);
      setUserProgress((allScore / 14000000) * 100);
    }
  };

  useEffect(() => {
    handleUserRank();
  }, [
    userRank,
    userRankSkale,
    userBnbScore,
    userRankCore,
    userRankViction,
    userRankManta,
    userRankBase,
    userCoreScore,
    userVictionScore,
    userMantaScore,
    userBaseScore,
    userMatScore,
    userTaikoScore,
  ]);

  return (
    <div className="package-popup-wrapper">
      <div className="package-popup golden-pass-popup p-4">
        <div className=" package-popup-title-wrapper d-flex align-items-center position-relative justify-content-between mb-2">
          <div className="package-popup-title mb-0">My Progress</div>{" "}
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClose}
            alt=""
          />
        </div>
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center">
          <img src={goldenPopup} alt="" style={{ width: "100%" }} />
          <div className="d-flex w-100 justify-content-center gap-2 align-items-center position-absolute">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className="bigTextYellow">#{globalMonthly}</span>
              <span className="smallTextYellow">Global Monthly</span>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className="bigTextYellow">#{globalWeekly}</span>
              <span className="smallTextYellow">Global Weekly</span>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className="bigTextYellow d-flex align-items-center gap-2">
                <img
                  src={star}
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />{" "}
                {getFormattedNumber(userDataStar.statValue,0)}
              </span>
              <span className="smallTextYellow">Collected Stars</span>
            </div>
          </div>
        </div>
        <NavLink to="/account/prime">
          <div className="rank-premium-status-wrapper p-2">
            <div className="d-flex align-items-center gap-2 justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={premiumBadge} alt="" />
                <div className="d-flex flex-column">
                  <span className="rank-upgrade-status">Upgrade Status</span>
                  <span className="rank-upgrade-status-bottom">
                   {isPremium ? ' Prime Enabled' : 'Prime'}
                  </span>
                </div>
              </div>
              <div className="p-2 starscontentwrapper">
                <span className="startext">
                  {primeStars === true ? "+ 50 Stars" : "In Progress"}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
        <div className="package-popup-content-rank p-1">
          <div className="d-flex flex-column gap-1 align-items-center">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="chainstatustxt">Chain Status</span>
            </div>
            <div className="d-flex w-100 flex-column gap-1">
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={bnbActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">BNB Chain</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRank + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userBnbScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={mantaActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">Manta</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankManta + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userMantaScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={baseLogo}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">Base</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankBase + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userBaseScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={taikoLogo}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">Taiko</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankTaiko + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userTaikoScore, 0)}
                  </span>
                </div>
              </div>
              {/* <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={taikoLogo} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">Matchain</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankMat + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userMatScore, 0)}
            </span>
          </div> */}
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={skaleActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">SKALE</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankSkale + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userSkaleScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={coreActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">CORE</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankCore + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userCoreScore, 0)}
                  </span>
                </div>
              </div>
              <div className="rank-dropdown-item ms-2 gap-3 p-2 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={victionActive}
                    width={25}
                    className="rankChain"
                    height={25}
                    alt=""
                  />
                  {/* <span className="rank-dropdown-text">VICTION</span> */}
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Rank</span>
                  <span className="rank-dropdown-text-yellow">
                    #{getFormattedNumber(userRankViction + 1,0)}
                  </span>
                </div>
                <div className="rank-item-wrapper p-2">
                  <span className="rank-dropdown-text">Stars</span>
                  <span className="rank-dropdown-text-yellow">
                    {getFormattedNumber(userVictionScore, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankSmallPopup;
