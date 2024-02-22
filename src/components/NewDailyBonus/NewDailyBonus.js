import React, { useState } from "react";
import "./_newdailybonus.scss";
import bnbChain from "./assets/bnbChain.png";
import skaleChain from "./assets/skaleChain.png";
import comingSoon from "./assets/comingSoon.png";
import percentageFilled from "./assets/percentageFilled.svg";
import percentageEmpty from "./assets/percentageEmpty.svg";
import xMark from "./assets/xMark.svg";

const NewDailyBonus = ({ onclose }) => {
  const numberArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    opened: false,
  }));
  const cawsArray = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
  }));

  const [chain, setChain] = useState("bnb");
  const [dummyArray, setDummyArray] = useState(numberArray);

  const openChest = (chest) => {
    const updatedArray = dummyArray.map((item) =>
      item.id === chest ? { ...item, opened: true } : item
    );

    setDummyArray(updatedArray);
  };

  const dummyRewards = [
    {
      title: "Points",
      amount: 256786,
      img: "points",
    },
    {
      title: "Reward",
      amount: 2.5,
      img: 2,
    },
    {
      title: "Reward",
      amount: 5,
      img: 5,
    },
    {
      title: "Reward",
      amount: 30,
      img: 30,
    },
    {
      title: "Reward",
      amount: 50,
      img: 50,
    },
    {
      title: "Reward",
      amount: 300,
      img: 300,
    },
    {
      title: "Reward",
      amount: 700,
      img: 700,
    },
    {
      title: "Reward",
      amount: 1500,
      img: 1500,
    },
    {
      title: "Reward",
      amount: 3000,
      img: 3000,
    },
    {
      title: "Reward",
      amount: 5000,
      img: 5000,
    },
  ];

  console.log(dummyArray);

  return (
    <div className="package-popup-wrapper2">
      <div className="new-daily-bonus-popup d-flex flex-column gap-2 custom-container-width">
        <div className="daily-bonus-outer-wrapper custom-container-width position-relative p-0 p-lg-5">
          <img
            src={xMark}
            className="close-new-bonus"
            width={30}
            height={30}
            alt=""
            onClick={onclose}
            style={{ cursor: "pointer" }}
          />
          <div className="new-total-points-wrapper d-flex align-items-end gap-2">
            <h6 className="new-total-points  mb-0">256,786 </h6>
            <span className="new-total-points-type d-none d-lg-flex  mb-0">
              POINTS
            </span>
          </div>
          <div className="new-total-rewards-wrapper d-flex align-items-end gap-2">
            <h6 className="new-total-points  mb-0">$26.21 </h6>
            <span className="new-total-points-type d-none d-lg-flex  mb-0">
              REWARDS
            </span>
          </div>
          <div className="daily-bonus-inner-wrapper container p-4 p-lg-5 mt-3 mt-lg-0">
            <div
              className="row daily-bonus-row gap-3 gap-lg-0 mx-4 mx-lg-2 mt-5 mt-lg-3"
              style={{ height: "100%" }}
            >
              <div className="col-12 col-lg-5 chains-wrapper">
                <div
                  className="d-flex flex-row flex-lg-column justify-content-between h-100 chains-container"
                  style={{ gap: "8px" }}
                >
                  <div
                    className={`position-relative chain-item ${
                      chain === "bnb" && "chain-item-active"
                    } w-100`}
                  >
                    <img
                      src={bnbChain}
                      className={`chain-img ${
                        chain === "bnb" && "chain-img-active"
                      }`}
                      onClick={() => setChain("bnb")}
                      alt=""
                    />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "bnb" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">BNB Chain</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column">
                      <h6 className="desc-title mb-0">Magic Battle</h6>
                      <span className="chain-desc mb-0">
                        A world full of possibilities
                      </span>
                    </div>
                  </div>
                  <div
                    className={`position-relative chain-item ${
                      chain === "skale" && "chain-item-active"
                    } w-100`}
                  >
                    <img
                      src={skaleChain}
                      className={`chain-img ${
                        chain === "skale" && "chain-img-active"
                      }`}
                      onClick={() => setChain("skale")}
                      alt=""
                    />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "skale" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">Skale</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column ">
                      <h6 className="desc-title mb-0">Magic Battle</h6>
                      <span className="chain-desc mb-0">
                        A world full of possibilities
                      </span>
                    </div>
                  </div>
                  <div className={`position-relative chain-item  w-100`}>
                    <img src={comingSoon} className={`chain-img`} alt="" />
                    <div
                      className={`chain-title-wrapper ${
                        chain === "comingSoon" && "chain-title-wrapper-active"
                      } p-2 d-flex align-items-center justify-content-between`}
                    >
                      <h6 className="chain-title-position mb-0">Coming Soon</h6>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center">
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageFilled} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                          <img src={percentageEmpty} height={8} alt="" />
                        </div>
                        <span className="percentage-span">62%</span>
                      </div>
                    </div>
                    <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column">
                      <h6 className="desc-title mb-0">Magic Battle</h6>
                      <span className="chain-desc mb-0">
                        A world full of possibilities
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 px-0 grid-overall-wrapper">
                <div className="grid-scroll">
                  <div className="new-chests-grid">
                    {dummyArray.map((item, index) => (
                      <div
                        key={index}
                        className={`new-chest-item ${
                          item.opened && "new-chest-item-open"
                        } d-flex align-items-center justify-content-center`}
                        onClick={() => openChest(item.id)}
                      >
                        <img
                          src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/${
                            !item.opened ? index : index + "open"
                          }.png`)}
                          width={70}
                          height={70}
                          alt=""
                        />
                        <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
                          {item.opened ? "Claimed" : "Claim "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 px-0 mt-0 mt-lg-3">
                <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
                  <div
                    className="chain-desc-wrapper p-2 d-flex flex-column"
                    style={{ filter: "brightness(1)", position: "relative" }}
                  >
                    <h6 className="desc-title mb-0">Unable to claim reward</h6>
                    <span className="chain-desc mb-0">
                      This reward can only be claimed by CAWS NFT owners. You
                      can purchase a CAWS NFT in 24 hours to claim this reward.
                      Please select a CAWS NFT to purchase:
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {cawsArray.map((item, index) => (
                      <div className="nft-reward-container">
                        <img
                          key={index}
                          className="nft-reward-img"
                          src={require(`./assets/caws${item.id}.png`)}
                          alt=""
                          width={60}
                          height={60}
                        />
                        <div className="buy-nft-reward-btn">Buy</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rewards-container-outer custom-container-width p-4">
          <div className="new-rewards-grid">
            {dummyRewards.map((item, index) => (
              <div
                key={index}
                className="new-rewards-item p-2 d-flex align-items-center gap-2"
              >
                <img
                  src={require(`./assets/${item.img}Icon.png`)}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className="d-flex align-items-bottom gap-1">
                  <h6 className="mb-0  new-reward-amount">{item.amount}</h6>
                  <span className="mb-0  new-reward-type">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDailyBonus;
