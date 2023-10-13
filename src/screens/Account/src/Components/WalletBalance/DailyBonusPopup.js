import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import chestLocked from "./assets/chest-locked.webp";
import chestUnLocked from "./assets/chest-unlocked.webp";
import hexagon from "./assets/hexagon.svg";
import chestOpen from './assets/chestOpen.png'
import chestClosed from './assets/chestClosed.png'
import chestBgOpen from './assets/chestBgOpen.svg'
import chestBgClosed from './assets/chestBgClosed.svg'
import chestTagOpen from './assets/chestTagOpen.svg'
import chestTagClosed from './assets/chestTagClosed.svg'

const DailyBonusPopup = ({}) => {

  const dummyChests = [ 
    {
      open: true,
      chestTitle: "Chest #1",
      chestId: 1,
    },
    {
      open: false,
      chestTitle: "Chest #2",
      chestId: 2,
    },
    {
      open: false,
      chestTitle: "Chest #3",
      chestId: 3,
    },
    {
      open: false,
      chestTitle: "Chest #4",
      chestId: 4,
    },
    {
      open: false,
      chestTitle: "Chest #5",
      chestId: 5,
    },
    {
      open: false,
      chestTitle: "Chest #6",
      chestId: 6,
    },
    {
      open: false,
      chestTitle: "Chest #7",
      chestId: 7,
    },
    {
      open: false,
      chestTitle: "Chest #8",
      chestId: 8,
    },
    {
      open: false,
      chestTitle: "Chest #9",
      chestId: 9,
    },
    {
      open: false,
      chestTitle: "Chest #10",
      chestId: 10,
    },
    
  ]


  return (
    <>
      <div
        className="package-popup2 dragon-popup px-4 py-5 py-lg-5 px-lg-5"
      >
        <div className="position-relative h-100">
          <div className="overlay-container">
            <div className="d-flex flex-column">
              {/* <img src={hexagon} className="hexagon" alt="" /> */}
              <span className="bonustitle position-relative">Daily Bonus</span>
            </div>
          </div>
          <div className="positon-relative h-100 d-flex">
            <div className="rewardsgrid">
                {dummyChests.map((item) => (
                  <div className={` reward-chest ${item.open ? "reward-chest-open" : "reward-chest-closed" } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}>
                  <div className={`chest-number ${item.open ? "number-open" : "number-closed"} d-flex align-items-center justify-content-center`}>
                    <span className="chest-number-text mb-0">
                    {item.chestId}
                    </span>
                  </div>
                  <img src={item.open ? chestOpen : chestClosed} className="chest-image" alt="" />
                  <h6 className="chest-title mb-0">
                    {item.chestTitle}
                  </h6>
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyBonusPopup;
