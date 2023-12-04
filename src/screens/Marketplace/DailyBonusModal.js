import React from "react";
import dailyBonusPopupImage from "./dailybonusassets/dailyBonusPopupImage.png";
import closeMark from "./assets/popupXmark.svg";
import pointsIcon from "./dailybonusassets/pointsIcon.png";
import largeRewardsIcon from "./dailybonusassets/largeRewardsIcon.png";
import rewardsIcon from "./dailybonusassets/rewardsIcon.png";
import genesisIcon from "./dailybonusassets/genesisIcon.png";
import cawsIcon from "./dailybonusassets/cawsIcon.png";
import betaPassIcon from "./dailybonusassets/betaPassIcon.png";

const DailyBonusModal = ({ data, onClose }) => {
  const chanceRewards = [
    {
      title: "Points",
      image: pointsIcon,
      premium: false,
      won: false,
    },
    {
      title: "$ Rewards",
      image: rewardsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Genesis Land NFT",
      image: genesisIcon,
      premium: false,
      won: false,
    },
    {
      title: "CAWS NFT",
      image: cawsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Beta Pass NFT",
      image: betaPassIcon,
      premium: false,
      won: false,
    },
    {
      title: "$ Rewards",
      image: largeRewardsIcon,
      premium: false,
      won: false,
    },
  ];

  return (
    <div className="profile-event-popup p-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <h6 className="event-popup-title mb-0">{data.title}</h6>
          <div
            className={`${
              data?.status === "Live"
                ? "event-popup-status-live"
                : data?.status === "Coming Soon"
                ? "event-popup-status-upcoming"
                : "event-popup-status-expired"
            }  d-flex align-items-center justify-content-center p-1`}
          >
            {data.status === "Live" && (
              <div
                class="pulsatingDot"
                style={{ width: 7, height: 7, marginRight: 5 }}
              ></div>
            )}
            <span className="mb-0">{data?.status}</span>
          </div>
        </div>
        <img
          src={closeMark}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      <div className="profile-event-popup-wrapper mb-3 p-2 p-lg-3 h-auto">
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
          <div className="d-flex gap-2">
            <img
              src={dailyBonusPopupImage}
              alt=""
              style={{ width: 80, height: 80 }}
            />
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <h6 className="popup-second-title m-0">{data?.title}</h6>
              </div>
              <div className="d-flex">
                <span className="event-popup-chain mb-0">
                  {data?.eventType}
                </span>
              </div>
              <div className="d-flex">
                <span className="event-popup-chain mb-0">
                  Chain: {data?.chain}
                </span>
              </div>
            </div>
          </div>

          {data?.status === "Coming Soon" && (
            <div className="d-flex flex-column">
              <span className="live-on">Live on</span>
              <div className="d-flex align-items-center gap-2">
                <img
                  src={
                    require("../Account/src/Components/WalletBalance/assets/greenCalendar.svg")
                      .default
                  }
                  className="green-calendar"
                  alt=""
                />
                <h6 className="live-on-date mb-0">{data.eventDate}</h6>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column">
          <h6 className="how-it-works">What is it?</h6>
          <p className="popup-event-desc">
            Daily Bonus is a special event in World of Dypians that gives
            awesome rewards to all users. The event is available on BNB Chain
            and opBNB Chain, so you can join in on the fun.
          </p>
        </div>
        <div className="d-flex flex-column">
          <h6 className="how-it-works">How to Participate?</h6>
          <p className="popup-event-desc">
            The Daily Bonus event is free for all users on the BNB Chain and
            opBNB Chain. Simply unlock 10 chests every day to enjoy fantastic
            prizes!
          </p>
        </div>
        <div className="d-flex flex-column">
          <h6 className="how-it-works">Premium Advantage</h6>
          <p className="popup-event-desc">
            For PREMIUM Users, there's an extra opportunity awaiting you. Unlock
            an additional 10 premium chests to significantly increase your
            chances of winning big in the Daily Bonus event!
          </p>
        </div>
        <div className="d-flex flex-column">
          <h6 className="how-it-works">What Can You Win?</h6>
          <p className="popup-event-desc">
            The rewards are pretty sweet! You can get Leaderboard points,
            regular Rewards, special Genesis Land NFTs, unique CAWS NFTs, the
            exclusive Beta Pass NFT, and some really big prizes. So, start
            unlocking those chests and enjoy the rewards!
          </p>
        </div>
        <div className="d-flex flex-column">
          <h6 className="how-it-works">Reward Distribution</h6>
          <p className="popup-event-desc">
            After unlocking your chests each day, your rewards will be
            distributed out once a month. Get ready to enjoy the fruits of your
            adventure at the end of each month!
          </p>
        </div>
      </div>
      <div className="row" style={{ rowGap: "10px" }}>
        {chanceRewards.map((reward, index) => (
          <div className="col-12 col-lg-4">
            <div className={`prizeswrapper-premium`}>
              <div className="d-flex align-items-center gap-2">
                <img
                  src={reward.image}
                  alt=""
                  style={{ width: 40, height: 40 }}
                />
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="chest-prize-title mb-0"
                  >
                    {reward.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyBonusModal;
