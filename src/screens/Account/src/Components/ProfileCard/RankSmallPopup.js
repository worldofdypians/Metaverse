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
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className="player-rank-dropdown p-3 d-flex flex-column gap-2 w-75"
        style={{ left: 0 }}
      >
        <div className="d-flex flex-column gap-1">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ width: "33%" }}></div>
            <span className="rank-dropdown-span" style={{ width: "33%" }}>
              Rank
            </span>
            <span className="rank-dropdown-span" style={{ width: "33%" }}>
              Score
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={bnbActive} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">BNB Chain</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRank + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userBnbScore, 0)}
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={mantaActive} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">Manta</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankManta + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userMantaScore, 0)}
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={baseLogo} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">Base</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankBase + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userBaseScore, 0)}
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={taikoLogo} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">Taiko</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankTaiko + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userTaikoScore, 0)}
            </span>
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
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={skaleActive} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">SKALE</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankSkale + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userSkaleScore, 0)}
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={coreActive} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">CORE</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankCore + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userCoreScore, 0)}
            </span>
          </div>
          <div className="rank-dropdown-item p-2 d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "33%" }}
            >
              <img src={victionActive} width={20} height={20} alt="" />
              <span className="rank-dropdown-text">VICTION</span>
            </div>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              #{userRankViction + 1}
            </span>
            <span className="rank-dropdown-text" style={{ width: "33%" }}>
              {getFormattedNumber(userVictionScore, 0)}
            </span>
          </div>
        </div>
        <div className="total-stars-wrapper d-flex align-items-center justify-content-between p-2">
          <img src={star} style={{ width: "30px", height: "30px" }} alt="" />
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex flex-column align-items-end">
              <span className="total-stars-span">Collected Stars</span>
              <h6 className="total-stars-amount mb-0">
                {getFormattedNumber(userDataStar, 0)}
              </h6>
            </div>
          </div>
        </div>
        <hr className="new-rank-divider my-2" />
        <div className="d-flex align-items-center justify-content-between">
          <span className="current-rank" style={{ textTransform: "uppercase" }}>
            {userRankName.name}
            <span
              className="current-rank"
              style={{
                color: rankData?.multiplier === "yes" ? "#FFC700" : "#1BF5FF",
              }}
            >
              (
              {userRankName?.name === "rookie"
                ? "$5"
                : userRankName?.name === "underdog"
                ? "$10"
                : userRankName?.name === "champion"
                ? "$25"
                : userRankName?.name === "unstoppable"
                ? "$100"
                : "$0"}
              )
            </span>
          </span>
          <span className="current-rank" style={{ textTransform: "uppercase" }}>
            {userRankName.name === "rookie"
              ? "underdog"
              : userRankName.name === "underdog"
              ? "champion"
              : userRankName.name === "champion"
              ? "unstoppable"
              : userRankName.name === "unstoppable"
              ? ""
              : "rookie"}
            <span
              className="current-rank"
              style={{
                color: rankData?.multiplier === "yes" ? "#FFC700" : "#1BF5FF",
              }}
            >
              (
              {userRankName?.name === "rookie"
                ? "$10"
                : userRankName?.name === "underdog"
                ? "$25"
                : userRankName?.name === "champion"
                ? "$100"
                : userRankName?.name === "unstoppable"
                ? ""
                : "$5"}
              )
            </span>
          </span>
        </div>
        <div
          className={`${
            rankData?.multiplier === "yes"
              ? "rank-progress-bar-active"
              : "rank-progress-bar"
          } d-flex align-items-center px-2 justify-content-between position-relative`}
        >
          <div
            className={` ${
              rankData?.multiplier === "yes"
                ? "rank-current-progress-active"
                : "rank-current-progress"
            } d-flex align-items-center justify-content-end`}
            style={{ width: `${userProgress}%` }}
          >
            {rankData?.multiplier === "yes" && (
              <img
                src={x4}
                style={{ marginRight: "5px" }}
                width={25}
                height={17}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="rank-popup-btn p-2 d-flex align-items-center justify-content-between">
          <div
            className="d-flex align-items-center justify-content-center gap-2"
            onClick={() => {
              onRankPopupClick();
            }}
          >
            <span className="open-ranks-text mb-0">Rankings and Rewards</span>
            <img src={arrowCircle} alt="" />
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default RankSmallPopup;
