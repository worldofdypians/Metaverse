import React from "react";
import puzzleMadnessBanner from "./assets/puzzleMadnessBanner.png";
import bnb from "./assets/bnb.svg";
import idypIcon from "./assets/idypIcon.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import syncIcon from "./assets/syncIcon.svg";
import whiteTooltip from "./assets/whiteTooltip.svg";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{days < 10 ? "0" + days : days}</h6>
        <span className="days">Days</span>
      </div>
      <h6 className="mint-time">:</h6>

      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
    </div>
  );
};

const PuzzleMadness = () => {

  let dummyDate = new Date("2024-10-01T14:00:00.000+02:00");


  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" />
          <img src={puzzleMadnessBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Puzzle Madness</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            In the Puzzle Madness event, players must find 10 hidden pieces in
            the mining and city maps, earning valuable points to compete on
            daily, weekly, and monthly leaderboards. These pieces also include a
            score multiplier, ranging from x2 to x10, which activates after
            collecting all 10, significantly increasing earned points.
          </p>
        </div>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <h6 className="mb-0 purchase-package-title">Purchase</h6>
        <div className="d-flex align-items-end gap-2">
          <span className="available-on">Available only on</span>
          <img src={bnb} width={20} height={20} alt="" />
          <span className="purchase-chain">BNB Chain</span>
        </div>
      </div>
      <div className="new-event-wrapper p-3 d-flex align-items-center justify-content-between">
        <div className="event-price-wrapper p-3 d-flex align-items-center gap-5">
          <span className="event-price-span">Event Price</span>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <img src={idypIcon} alt="" />
              <h6 className="event-price-coin mb-0">8,283 DYP</h6>
            </div>
            <span className="event-price-usd">($125.2)</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="stake-wod-btn px-4 py-2">Approve</div>
          <div className="stake-wod-btn-inactive px-4 py-2">Buy</div>
        </div>
      </div>
      <div className="new-event-wrapper mt-5 p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2">
            <h6 className="mb-0 time-remaining">Available Time Remaining</h6>
            <img src={whiteTooltip} width={20} height={20} alt="" />
          </div>
          <p className="sync-desc mb-0">
            Use in-game
            <img
              src={syncIcon}
              className="mx-1"
              width={20}
              height={20}
              alt=""
            />
            sync button every time you purchase a bundle
          </p>
        </div>
        <Countdown date={dummyDate} renderer={renderer} />
      </div>
    </div>
  );
};

export default PuzzleMadness;
