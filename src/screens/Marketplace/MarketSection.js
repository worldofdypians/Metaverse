import React, { useState, useEffect } from "react";
import MarketCards from "../../components/MarketCards/MarketCards";
import { NavLink } from "react-router-dom";

const MarketSection = () => {
  const [activebtn, setActiveBtn] = useState("land");

  const eventData = [
    { eventTitle: "Dragon Ruins", eventPrice: "50 DYP", eventImg: 'dragon' },
    { eventTitle: "Puzzle Madness", eventPrice: "3,500 iDYP", eventImg: 'puzzle' },
    { eventTitle: "Golden Pass", eventPrice: "700 DYP", eventImg: 'golden' },
    { eventTitle: "Critical Hit", eventPrice: "", eventImg: 'critical' }
  ];

  return (
    <div className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">Marketplace</h2>
        <p className="marketplace-desc font-poppins">
          Discover the power of NFTs for a unique digital experience
        </p>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="row m-0 d-flex align-items-center gap-2 justify-content-between">
          <div
            onClick={() => {
              setActiveBtn("land");
            }}
            className={`marketItem ${
              activebtn === "land" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Land</span>
          </div>
          <div
            onClick={() => {
              setActiveBtn("caws");
            }}
            className={`marketItem ${
              activebtn === "caws" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">CAWS</span>
          </div>
          <div
            onClick={() => {
              setActiveBtn("timepiece");
            }}
            className={`marketItem ${
              activebtn === "timepiece" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Timepiece</span>
          </div>
          <div
            onClick={() => {
              setActiveBtn("events");
            }}
            className={`marketItem ${
              activebtn === "events" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Events</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          {activebtn === "events" &&
            eventData &&
            eventData.length > 0 &&
            eventData.map((item, index) => {
              return (
                <MarketCards
                  activebtn={"events"}
                  key={index}
                  eventTitle={item.eventTitle}
                  eventPrice={item.eventPrice}
                  eventImg={item.eventImg}
                />
              );
            })}
        </div>
        <NavLink to="/marketplace">
          <div
            className="linear-border"
            style={{
              width: "fit-content",
              margin: "2rem auto auto auto",
            }}
          >
            <button className="btn filled-btn px-5">View more</button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MarketSection;
