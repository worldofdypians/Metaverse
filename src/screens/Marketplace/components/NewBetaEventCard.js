import React from "react";
import liveDot from "../assets/liveDot.svg";
import eventsArrow from "../assets/eventsArrow.svg"; 
import magnifier from "../assets/magnifier.svg";

import getFormattedNumber from "../../Account/src/Utils.js/hooks/get-formatted-number";

const BetaEventCard = ({ data, onOpenPopup, userEarnUsd, activeTab }) => {
  return (
    <div
      className={` ${
        data.title === "Avalanche"
          ? "upcoming-mint-wrapper-avax"
          : data.title === "CoinGecko"
          ? "upcoming-mint-wrapper-coingecko"
          : data.title === "Conflux"
          ? "upcoming-mint-wrapper-conflux"
          : data.title === "Base"
          ? "upcoming-mint-wrapper-base"
          : data.title === "Gate.io"
          ? "upcoming-mint-wrapper-gate"
          : data.title === "SKALE"
          ? "upcoming-skale-event"
          : data.title === "Manta"
          ? "upcoming-manta-event"
          : data.title === "CMC" || data.title === "CoinMarketCap"
          ? "upcoming-mint-wrapper-cmc"
          : data.title === "Dypius" && activeTab !== "dypiusv2"
          ? "upcoming-dyp-event"
          : activeTab === "dypiusv2"
          ? "upcoming-dyp-event2"
          : data.title === "SEI"
          ? "upcoming-sei-event"
          : data.title === "CORE"
          ? "upcoming-core-event"
          : data.title === "VICTION"
          ? "upcoming-viction-event"
          : data.title === "Manta"
          ? "upcoming-manta-event"
          : data.title === "Immutable"
          ? "upcoming-immutable-event"
          : data.title === "MultiversX"
          ? "upcoming-multivers-event"
          : data.title === "Taiko"
          ? "upcoming-taiko-event"
          : data.title === "Cookie3"
          ? "upcoming-cookie-event"
          : "upcoming-mint-wrapper-coin98"
      } upcoming-mint-wrapper upcoming-mint-wrapper2 flex-column d-flex align-items-center justify-content-between px-0`}
      onClick={onOpenPopup}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex col-12 align-items-start p-3 gap-3">
        <img src={data.logo} width={36} height={36} alt="" />
        <div className="d-flex flex-column justify-content-between gap-2 gap-lg-0">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <h6 className="events-page-title mb-0">{data.title}</h6>
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
                  className="pulsatingDot"
                    style={{ width: 7, height: 7, marginRight: 5 }}
                  ></div>
                )}
                <span>{data.eventStatus}</span>
              </div>
            </div>
            <h6 className="events-page-rewards">{data.totalRewards}</h6>
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

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex col-lg-3 flex-column align-items-start align-items-lg-center">
          {
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
                {data.title !== "Dypius" ? (
                  <>${getFormattedNumber(userEarnUsd, 2)}</>
                ) : activeTab !== "dypiusv2" ? (
                  <>{getFormattedNumber(userEarnUsd, 0)} DYP</>
                ) : (
                  <></>
                )}
              </h6>
            </div>

           
          }
        </div>
        <div className="d-flex flex-column d-flex d-lg-none gap-3">
          <div className="d-flex align-items-center gap-2">
            {data.eventType === "Explore & Mine" ? (
              <img src={'https://cdn.worldofdypians.com/wod/whitePickAxe.svg'} alt="" />
            ) : (
              <img src={magnifier} alt="" className="test" />
            )}
            <span className="white-events-text mb-0">{data.eventType}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src={'https://cdn.worldofdypians.com/wod/whiteCalendar.svg'} alt="" />
            <span className="white-events-text mb-0">{data.eventDate}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column d-none gap-3 pick-and-calendar">
        <div className="d-flex align-items-center gap-2">
          {data.eventType === "Explore & Mine" ? (
            <img src={'https://cdn.worldofdypians.com/wod/whitePickAxe.svg'} alt="" />
          ) : (
            <img src={magnifier} alt="" className="test" />
          )}
          <span className="white-events-text mb-0" style={{ fontSize: "10px" }}>
            {data.eventType}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <img src={'https://cdn.worldofdypians.com/wod/whiteCalendar.svg'} alt="" />
          <span className="white-events-text mb-0" style={{ fontSize: "10px" }}>
            {data.eventDate}
          </span>
        </div>
      </div>
      <span
        className="events-page-details d-flex my-3 align-items-center gap-2"
        onClick={onOpenPopup}
      >
        Details
        <img src={eventsArrow} alt="" />
      </span>
      <img
        src={data.backgroundImage}
        alt=""
        className="upcoming-mint-img d-none"
      />
    </div>
  );
};

export default BetaEventCard;
