import React, { useEffect, useState } from "react";
import "./_challenges.scss";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

const TreasureHunt = ({ events, eventDuration, onEventClick, page }) => {


const [slicedEvents, setSlicedEvents] = useState([])

useEffect(() => {
 if(page === 1){
  setSlicedEvents(events .filter((obj) => {
    return obj.eventStatus === eventDuration;
  }).slice(0, 8))
 }else if(page === 2){
  setSlicedEvents(events.filter((obj) => {
    return obj.eventStatus === eventDuration;
  }).slice(8, 16))
 }
 else if(page === 3){
  setSlicedEvents(events.filter((obj) => {
    return obj.eventStatus === eventDuration;
  }).slice(16, events.length))
 }
 
 else if(eventDuration !== "Live"){
  setSlicedEvents(events .filter((obj) => {
    return obj.eventStatus === eventDuration;
  }))
 }
}, [page, eventDuration])


  return (
    <div className="treasurehunt-wrapper">
      {slicedEvents
       
        .map((item, index) => {
          return (
            <div
              className="new-treasure-hunt-wrapper gap-lg-4 p-3 p-lg-0 upcoming-mint-wrapper2 d-flex align-items-center justify-content-lg-start justify-content-between"
              key={index}
              onClick={() => onEventClick(item)}
            >
              <div className="ps-lg-2 d-flex align-items-center gap-3">
                <img src={item.logo} height={36} width={36} alt="" />
                <div className="d-flex flex-column gap-2 position-relative">
                  <h6 className="mb-0 d-flex align-items-center gap-2 new-treasure-hunt-title text-uppercase">
                    {item.title}
                    {item.eventStatus === "Live" ? (
                      <div
                        className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                        style={{ top: 0 }}
                      >
                        <div
                          className="pulsatingDot"
                          style={{
                            width: 7,
                            height: 7,
                            marginRight: 5,
                          }}
                        ></div>

                        <span>Live</span>
                      </div>
                    ) : item.eventStatus === "Coming Soon" ? (
                      <div
                        className={`position-relative  events-page-status-tag-upcoming px-2 d-flex align-items-center justify-content-center gap-0`}
                        style={{ whiteSpace: "pre", zIndex: 1 }}
                      >
                        {/* <div
                                    className="pulsatingDot"
                                    style={{
                                      width: 7,
                                      height: 7,
                                      marginRight: 5,
                                    }}
                                  ></div> */}

                        <span>Coming Soon</span>
                      </div>
                    ) : (
                      <div
                        className={`position-absolute  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                        style={{ top: "-15px", left: 50 }}
                      >
                        <span>Expired</span>
                      </div>
                    )}
                  </h6>

                  <span className="mb-0 new-treasure-hunt-rewards">
                    {item.totalRewards}
                  </span>
                </div>
              </div>
              {item.eventStatus !== "Coming Soon" && (
                <div
                  className="d-flex flex-column gap-2 gap-lg-4"
                  style={{ zIndex: "1" }}
                >
                  <div className="d-flex flex-column gap-2">
                    <span className="total-earnings-amount">
                      ${getFormattedNumber(item.userEarnUsd)}
                    </span>
                    <span className="total-earnings-span">My Earnings</span>
                  </div>
                </div>
              )}
              <div className="d-none d-lg-flex align-items-center position-relative">
              {item.eventStatus !== "Coming Soon" &&
                <div className="d-none d-lg-flex flex-column gap-3 treasure-type-date">
                  <div className="d-flex align-items-center gap-2">
                    <img src={"https://cdn.worldofdypians.com/wod/pickaxe.svg"} alt="" />
                    <span className="treasure-hunt-type">{item.eventType}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <img src={"https://cdn.worldofdypians.com/wod/calendar.svg"} alt="" />
                    <span className="treasure-hunt-type">{item.eventDate}</span>
                  </div>
                </div>
        }
              </div>
              <img
                src={item.backgroundImage}
                className="upcoming-mint-img-new d-none d-lg-flex"
                alt=""
              />
            </div>
          );
        })}

      {events.filter((obj) => {
        return obj.eventStatus === eventDuration;
      }).length === 0 && (
        <div className="new-stake-info-wrapper flex-column gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
          <span className="upcoming-stake">New events are coming...</span>
          <span className="upcoming-stake-desc">Check back soon!</span>
        </div>
      )}
    </div>
  );
};

export default TreasureHunt;
