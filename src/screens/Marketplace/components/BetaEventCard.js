import React from "react";
import liveDot from "../assets/liveDot.svg";
import eventsArrow from "../assets/eventsArrow.svg";
import whitePickaxe from "../assets/whitePickAxe.svg";
import whiteCalendar from "../assets/whiteCalendar.svg";
// import betaMyEarnings from '../assets/betaMyEarnings.png'

const BetaEventCard = ({ data, onOpenPopup }) => {
  return (
    <div className="upcoming-mint-wrapper flex-column flex-lg-row d-flex align-items-center justify-content-between px-0">
      <div className="d-flex col col-lg-5 align-items-start align-items-lg-center  p-3 gap-3">
        <img src={data.logo} width={36} height={36} alt="" />
        <div className="d-flex flex-column justify-content-between gap-2 gap-lg-0">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <h6 className="events-page-title mb-0">{data.title}</h6>
              <div
                className={` ${
                  data.eventStatus === "Live"
                    ? "events-page-status-tag-live"
                    : data.eventStatus === "Expired"
                    ? "events-page-status-tag-expired"
                    : "events-page-status-tag-upcoming"
                } px-2 d-flex align-items-center justify-content-center gap-2`}
              >
                {data.eventStatus === "Live" && <img src={liveDot} alt="" />}
                <span>{data.eventStatus}</span>
              </div>
            </div>
            <h6 className="events-page-rewards">{data.totalRewards}</h6>
          </div>
          <span
            className="events-page-details d-flex align-items-center gap-2"
            onClick={onOpenPopup}
          >
            Details
            <img src={eventsArrow} alt="" />
          </span>
        </div>
      </div>

      <div className="d-flex col col-lg-3 flex-column align-items-center">
        <div className="mybetaearnings">
          <h6 className="event-my-earnings mb-3">${data.myEarnings}</h6>
        </div>
      </div>
      <div className="d-flex flex-column gap-3 pick-and-calendar">
        <div className="d-flex align-items-center gap-2">
          <img src={whitePickaxe} alt="" />
          <span className="white-events-text mb-0">{data.eventType}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <img src={whiteCalendar} alt="" />
          <span className="white-events-text mb-0">{data.eventDate}</span>
        </div>
      </div>
      <img
        src={data.backgroundImage}
        alt=""
        className="upcoming-mint-img d-none d-lg-flex"
      />
    </div>
  );
};

export default BetaEventCard;
