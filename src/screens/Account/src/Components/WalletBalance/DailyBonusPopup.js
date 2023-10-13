import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import chestLocked from "./assets/chest-locked.webp";
import chestUnLocked from "./assets/chest-unlocked.webp";
import closeX from "./assets/closeX.svg";

const DailyBonusPopup = ({onclose}) => {
  return (
    <>
      <div className="package-popup2 dragon-popup px-4 py-5 py-lg-5 px-lg-5">
        <img src={closeX} alt="" className="closex position-absolute" onClick={onclose}/>
        <div className="position-relative h-100">
          <div className="overlay-container">
            <div className="d-flex flex-column">
              <span className="bonustitle position-relative">Daily Bonus</span>
            </div>
          </div>
          <div className="positon-relative h-100 d-flex">
            <div className="rewardsgrid">
              <img src={chestUnLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
              <img src={chestLocked} alt="" className="chestimg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyBonusPopup;
