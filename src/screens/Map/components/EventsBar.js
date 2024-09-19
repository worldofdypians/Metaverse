import React from "react";

import Countdown from "react-countdown";
import { dummyEvents } from "../mapdata/areas";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc mb-0">Days</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc mb-0">Minutes</span>
        </div>
      </div>
    </>
  );
};

const EventsBar = ({ onClose, show, handleMarkerClick }) => {

  return (
    <div
      className={`marker-details-2 ${show && "marker-events-active"} ps-2 py-0 pe-0`}
      style={{ background: "none", boxShadow: "none", border: "none", backdropFilter: "none" }}
    >
      <div className="d-flex flex-column justify-content-between h-100 ">
        <div className="d-flex align-items-center justify-content-end">
        <div
        className={`events-arrow arrow-pos-2 mb-3 align-items-center justify-content-center d-flex d-lg-none p-3`}
        onClick={onClose}
      >
        <img
          src={require("../assets/rightArrow.svg").default}
          width={24}
          height={24}
          alt=""
        />
      </div>
        </div>
        <div className="d-flex flex-column gap-3 mb-3 pe-3" style={{height: "100%", overflowY: "scroll"}}>
          {dummyEvents.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMarkerClick(item, 18, "event")}
              className="d-flex align-items-center justify-content-between w-100 map-event-item"
            >
              <div className="d-flex p-3 flex-column gap-5">
                <h6 className="map-event-title mb-0">{item.title}</h6>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="map-event-type p-1 d-flex align-items-center justify-content-center"
                    style={{
                      borderColor:
                        item.type === "Puzzle"
                          ? "#9E3C7A"
                          : item.type === "Boss Fight"
                          ? "#8C56FF"
                          : "#35F3FF",
                    }}
                  >
                    <span
                      className="map-event-type-span"
                      style={{
                        color:
                          item.type === "Puzzle"
                            ? "#9E3C7A"
                            : item.type === "Boss Fight"
                            ? "#8C56FF"
                            : "#35F3FF",
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  {item.duration === "--" ? (
                    <></>
                  ) : (
                    <Countdown renderer={renderer} date={item.duration} />
                  )}
                </div>
              </div>
              <img
                src={require(`../assets/eventImages/${item.image}`)}
                alt=""
                className="map-event-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsBar;
