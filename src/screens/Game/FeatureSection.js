import React, { useEffect, useState } from "react";
import "./_game.scss";
import gameFeatureArrow from "../../assets/gameAssets/gameFeatureArrow.svg";
import gameLeaderboard from "../../assets/gameAssets/gameLeaderboard.svg";
import gameGoldenPass from "../../assets/gameAssets/gameGoldenPass.png";
import goldenPassCard from "../../assets/gameAssets/challengeCards/goldenPassCard.png";
import goldenPassPopup from "../../assets/gameAssets/challengeCards/goldenPassPopup.webp";
import OutsideClickHandler from "react-outside-click-handler";
import GlobalLeaderboard from "../../components/LeaderBoard/GlobalLeaderboard";
import xMark from "../../assets/navbarAssets/xMark.svg";

const FeatureSection = ({
  onSelectEvent,
  setPopupEvent,
  setPopupActive,
  allStarData,
}) => {
  const goldenPassEvent = {
    image: goldenPassCard,
    popupImage: goldenPassPopup,

    desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    title: "Golden Pass",
    link: "/account/challenges/golden-pass",
    popupDesc:
      "The Golden Pass Event lets players earn extra rewards from the leaderboards. The pass is valid for one calendar month, regardless of purchase date.",
    secondaryDesc:
      "Example: If you buy the Golden Pass on the 7th, it remains active until the end of the month (e.g., from the 7th to the 30th/31st). However, it will reset on the 1st of the following month and must be repurchased to stay active.",
    workList: [
      "Purchase the bundle from the Challenge & Events.",
      "The golden pass is valid for one calendar month, resetting on the 1st, regardless of the purchase date.",
      "Extra rewards are given based on leaderboard rank as long as the golden pass is active.",
    ],
  };

  const [modal, setModal] = useState(false);

  const html = document.querySelector("html");

  useEffect(() => {
    if (modal === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [modal]);

  return (
    <>
      <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-5 gap-lg-0 align-items-center justify-content-between mt-5 px-0">
        <div
          className="leaderboards-game-wrapper d-flex align-items-center justify-content-between p-3 p-lg-5"
          style={{ cursor: "pointer" }}
          onClick={() => setModal(true)}
        >
          <div className="d-flex flex-column gap-3 gap-lg-5">
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
        <div
          className="golden-pass-game-wrapper d-flex align-items-center justify-content-between p-3 p-lg-5"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPopupEvent(goldenPassEvent);
            setPopupActive(true);
          }}
        >
          <img src={gameGoldenPass} className="game-feature-img" alt="" />

          <div className="d-flex flex-column align-items-end gap-3 gap-lg-5">
            <h6 className="mb-0 game-feature-title text-end">Golden Pass</h6>
            <p className="mb-0 game-feature-desc text-end">
              Unlock extra rewards to boost your gaming experience and level up
              faster.
            </p>
            <div
              className="d-flex align-items-center gap-1"
              style={{ cursor: "pointer" }}
            >
              <span className="game-feature-redirect text-end">
                Get Golden Pass
              </span>
              <img src={gameFeatureArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div
            className="system-requirements-modal p-3"
            id="reqmodal"
            style={{ background: "#1a1c39" }}
          >
            <div className="d-flex align-items-start justify-content-end">
              <img
                src={xMark}
                alt="x mark"
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <GlobalLeaderboard
              allStarData={allStarData}
              screen={"home"}
              leaderboardBtn="monthly"
            />
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}
    </>
  );
};

export default FeatureSection;
