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
      className={` homecard ${
        isFrontPage ? "justify-content-center" : "justify-content-between"
      } upcoming-mint-wrapper upcoming-mint-wrapper2 flex-column d-flex align-items-center p-3`}
      onClick={onOpenPopup}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
       <div className="d-flex align-items-center gap-2">
       <img src={data.logo} width={24} height={24} alt="" />
        <h6 className="events-page-title mb-0">{data.title}</h6>
       </div>
        <div
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
              class="pulsatingDot"
              style={{ width: 7, height: 7, marginRight: 5 }}
            ></div>
          )}
          <span>{data.eventStatus}</span>
        </div>
      </div>
      <div className="d-flex col-12 align-items-start pt-3 gap-3">
        <div className="d-flex flex-column justify-content-between gap-2 gap-lg-0">
            <div className="d-flex align-items-center gap-2">
                <span className="home-card-rewards-amount mb-0">{data.rewardsAmount}</span>
                <span className="home-card-rewards-currency mb-0">{data.rewardsCurrency}</span>
            
            </div>
          
          <span
            className="events-page-details d-none align-items-center gap-2"
            onClick={onOpenPopup}
          >
            Details
            <img src={eventsArrow} alt="" />
          </span>
        </div>
      </div>
      {!isFrontPage && (
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex col-6 flex-column align-items-start">
            <div
              className="mybetaearnings"
              style={{
                width: "160px",
                height: "80px",
                top: 0,
                position: "relative",
              }}
            >
              <h6 className="event-my-earnings3 mb-3">
                $
                {getFormattedNumber(data.title === "Base" ? 0 : userEarnUsd, 2)}
              </h6>
            </div>
          </div>
          <div className="d-flex flex-column d-flex gap-3">
            <div className="d-flex align-items-center gap-2">
              <img src={whitePickaxe} alt="" />
              <span
                className="white-events-text mb-0"
                style={{ fontSize: "10px" }}
              >
                {data.eventType}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={whiteCalendar} alt="" />
              <span
                className="white-events-text mb-0"
                style={{ fontSize: "10px" }}
              >
                {data.eventDate}
              </span>
            </div>
          </div>
        </div>
      )}
      {!isFrontPage && (
        <div className="d-flex flex-column d-none gap-3 pick-and-calendar">
          <div className="d-flex align-items-center gap-2">
            <img src={whitePickaxe} alt="" />
            <span
              className="white-events-text mb-0"
              style={{ fontSize: "10px" }}
            >
              {data.eventType}
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src={whiteCalendar} alt="" />
            <span
              className="white-events-text mb-0"
              style={{ fontSize: "10px" }}
            >
              {data.eventDate}
            </span>
          </div>
        </div>
      )}
      {!isFrontPage && (
        <span
          className="events-page-details d-flex my-3 align-items-center gap-2"
          onClick={onOpenPopup}
        >
          Details
          <img src={eventsArrow} alt="" />
        </span>
      )}
      <img
        src={data.backgroundImage}
        alt=""
        className="upcoming-mint-img d-none"
      />
    </div>
  );
};

export default BetaEventCard;
