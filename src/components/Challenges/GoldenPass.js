import React, { useState } from "react";
import "./_challenges.scss";
import goldenPassBanner from "./assets/goldenPassBanner.png";
import bnb from "./assets/bnb.svg";
import dypIcon from "./assets/dypIcon.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import syncIcon from "./assets/syncIcon.svg";
import whiteTooltip from "./assets/whiteTooltip.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";
import Countdown from "react-countdown";
import OutsideClickHandler from "react-outside-click-handler";

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

const GoldenPass = () => {
  let dummyDate = new Date("2024-10-01T14:00:00.000+02:00");
  const [dropdown, setDropdown] = useState(false);
  const [eventPrice, setEventPrice] = useState("DYP v2")

  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" />
          <img src={goldenPassBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Golden Pass</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Golden Pass bundle allows players to earn extra rewards based on
            their leaderboard ranking. The bundle is available for one month and
            can be purchased only once during that month. It offers exclusive
            benefits and boosts to enhance the gaming experience.
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
          <div className="d-flex flex-column gap-2">
            <span className="event-price-span">Event Price</span>
            <div className="position-relative">
            <div className="event-price-dropdown p-2 d-flex align-items-center justify-content-between" onClick={() => setDropdown(true)}>
              <span className="event-price-text">{eventPrice}</span>
              <img src={dropdownIcon} alt="" />
            </div>
              <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
                <div className={`event-price-dropdown-2 ${dropdown && "active-dropdown"} p-2 d-flex flex-column gap-2`}>
                <div className="event-price-dropdown-item p-1" onClick={() => {setEventPrice("DYP v1"); setDropdown(false);}}>
                  <span className="event-price-text">DYP v1</span>
                </div>
                <div className="event-price-dropdown-item p-1" onClick={() => {setEventPrice("DYP v2"); setDropdown(false)}}>
                  <span className="event-price-text">DYP v2</span>
                </div>
              </div>
                </OutsideClickHandler>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <img src={dypIcon} alt="" />
            </div>
                <div className="d-flex flex-column gap-1">
                <h6 className="event-price-coin mb-0">120.5 {eventPrice}</h6>
                <span className="event-price-usd">($125.2)</span>
                </div>
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

export default GoldenPass;
