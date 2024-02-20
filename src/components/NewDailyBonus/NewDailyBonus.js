import React from "react";
import "./_newdailybonus.scss";
import bnbChain from "./assets/bnbChain.png";
import skaleChain from "./assets/skaleChain.png";
import comingSoon from "./assets/comingSoon.png";
import percentageFilled from "./assets/percentageFilled.svg";
import percentageEmpty from "./assets/percentageEmpty.svg";

const NewDailyBonus = () => {
  const numberArray = Array.from({ length: 30 }, (_, index) => index + 1);

  const dummyRewards = [
    {
        title: "Points",
        amount: 256786,
        img: "points"
    },
    {
        title: "Reward",
        amount: 2.5,
        img: 2
    },
    {
        title: "Reward",
        amount: 5,
        img: 5
    },
    {
        title: "Reward",
        amount: 30,
        img: 30
    },
    {
        title: "Reward",
        amount: 50,
        img: 50
    },
    {
        title: "Reward",
        amount: 300,
        img: 300
    },
    {
        title: "Reward",
        amount: 700,
        img: 700
    },
    {
        title: "Reward",
        amount: 1500,
        img: 1500
    },
    {
        title: "Reward",
        amount: 3000,
        img: 3000
    },
    {
        title: "Reward",
        amount: 5000,
        img: 5000
    },
  ]

  return (
    <div className="new-daily-bonus-popup d-flex flex-column gap-2">
      <div className="daily-bonus-outer-wrapper p-5">
        <div className="daily-bonus-inner-wrapper container p-5">
          <div className="row mx-3 mt-5">
            <div className="col-12 col-lg-4">
              <div className="d-flex flex-column justify-content-between gap-3 h-100">
                <div className="position-relative w-100 ">
                  <img src={bnbChain} className="chain-img" alt="" />
                  <h6 className="chain-title-position font-organetto">
                    BNB Chain
                  </h6>
                </div>
                <div className="position-relative w-100 ">
                  <img src={skaleChain} className="chain-img" alt="" />
                  <h6 className="chain-title-position font-organetto">Skale</h6>
                </div>
                <div className="position-relative w-100 ">
                  <img src={comingSoon} className="chain-img" alt="" />
                  <h6 className="chain-title-position font-organetto">
                    Coming Soon
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                  <div className="d-flex flex-column">
                    <h6 className="chain-title font-organetto">Chest</h6>
                    <h6 className="chain-title font-organetto mb-0">
                      Progress
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="chain-title font-organetto">18/30</h6>
                      <h6 className="font-organetto chest-progress-pink">
                        (62%)
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src={percentageFilled} height={8} alt="" />
                      <img src={percentageFilled} height={8} alt="" />
                      <img src={percentageFilled} height={8} alt="" />
                      <img src={percentageEmpty} height={8} alt="" />
                      <img src={percentageEmpty} height={8} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="new-chests-grid">
                {numberArray.map((item, index) => (
                    <div key={index} className="new-chest-item d-flex align-items-center justify-content-center ">
                        <img src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/${index}.png`)} width={50} height={50} alt="" />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rewards-container-outer p-4">
          <div className="new-rewards-grid">
       {dummyRewards.map((item, index) => (
         <div key={index} className="new-rewards-item p-2 d-flex align-items-center gap-2">
             <img src={require(`./assets/${item.img}Icon.png`)} width={30} height={30} alt="" />
            <div className="d-flex align-items-bottom gap-1">
            <h6 className="mb-0  new-reward-amount">{item.amount}</h6>
            <span className="mb-0  new-reward-type">{item.title}</span>
            </div>
         </div>
       ))}
       </div>
      </div>
    </div>
  );
};

export default NewDailyBonus;
