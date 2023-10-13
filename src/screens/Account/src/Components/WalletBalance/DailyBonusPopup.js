import React from "react";
import chestOpen from "./assets/chestOpen.png";
import chestClosed from "./assets/chestClosed.png";
import closeX from "./assets/closeX.svg";
import pointsLogo from "./assets/pointslogo.png";
import rewardsLogo from "./assets/rewardslogo.png";

const DailyBonusPopup = ({ onclose }) => {
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
  ];

  return (
    <>
      <div className="package-popup2 dragon-popup px-4 py-5 py-lg-5 px-lg-5">
        <img
          src={closeX}
          alt=""
          className="closex position-absolute"
          onClick={onclose}
        />
        <div className="position-relative h-100">
          <div className="overlay-container">
            <div className="d-flex flex-column">
              <span className="bonustitle position-relative">Daily Bonus</span>
            </div>
          </div>
          <div className="positon-relative h-100 d-flex flex-column gap-3">
            <div className="rewardsgrid">
              {dummyChests.map((item) => (
                <div
                  className={` reward-chest ${
                    item.open ? "reward-chest-open" : "reward-chest-closed"
                  } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
                >
                  <div
                    className={`chest-number ${
                      item.open ? "number-open" : "number-closed"
                    } d-flex align-items-center justify-content-center`}
                  >
                    <span className="chest-number-text mb-0">
                      {item.chestId}
                    </span>
                  </div>
                  <img
                    src={item.open ? chestOpen : chestClosed}
                    className="chest-image"
                    alt=""
                  />
                  <h6 className="chest-title mb-0">{item.chestTitle}</h6>
                </div>
              ))}
            </div>
            <button className="">Claim</button>
            <div className="dailyreward-separator"></div>
            <div className="d-flex flex-column gap-2">
              <span className="font-organetto chestprizetitle text-white">CHEST PRIZES</span>
              <div className="d-flex align-items-center gap-2">
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img src={pointsLogo} alt="" style={{width: 40, height: 40}}/>
                    <span className="text-white">10,000 points</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img src={rewardsLogo} alt="" style={{width: 40, height: 40}}/>
                    <span className="text-white">$2.5 Rewards</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img src={rewardsLogo} alt="" style={{width: 40, height: 40}}/>
                    <span className="text-white">1 Genesis land Nft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyBonusPopup;
