import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import chestLocked from "./assets/chest-locked.webp";
import chestUnLocked from "./assets/chest-unlocked.webp";

const DailyBonusPopup = ({}) => {
  return (
    <div
      className="profile-event-popup p-2 h-100 daily-rewards-popup outerbg"
      style={{ width: "fit-content" }}
    >
      <div className="positon-relative h-100">
       
        <div className="daily-rewards-popup p-4 h-100 d-flex">
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
  );
};

export default DailyBonusPopup;
