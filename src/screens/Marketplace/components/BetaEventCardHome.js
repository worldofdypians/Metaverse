import React from "react";
import liveDot from "../assets/liveDot.svg";
import eventsArrow from "../assets/eventsArrow.svg";
import whitePickaxe from "../assets/whitePickAxe.svg";
import whiteCalendar from "../assets/whiteCalendar.svg";
import getFormattedNumber from "../../Account/src/Utils.js/hooks/get-formatted-number";
// import betaMyEarnings from '../assets/betaMyEarnings.png'

const BetaEventCard = ({ data, onOpenPopup, userEarnUsd, isFrontPage }) => {
  return (
    <div
      className={` homecard justify-content-end upcoming-mint-wrapper upcoming-mint-wrapper2 flex-column d-flex align-items-center p-3`}
      onClick={onOpenPopup}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
       <div className="d-flex flex-column">
        <h6 className="events-page-title-home mb-0">{data.title}</h6>
        <h6 className="events-page-desc-home mb-0">{data.desc}</h6>
       </div>
        {/* <div
          className={`position-relative ${
            data.eventStatus === "Live"
              ? "events-page-status-tag-live"
              : data.eventStatus === "Expired"
              ? "events-page-status-tag-expired"
              : "events-page-status-tag-upcoming"
          } px-2 d-flex align-items-center justify-content-center gap-0`}
          style={{ top: 0 }}
        >
          {data.eventStatus === "Live" && (
            <div
            className="pulsatingDot"
              style={{ width: 7, height: 7, marginRight: 5 }}
            ></div>
          )}
          <span style={{fontSize: data.eventStatus === 'Coming Soon' && '10px'}}>{data.eventStatus}</span>
        </div> */}
      </div>
      
    </div>
  );
};

export default BetaEventCard;
