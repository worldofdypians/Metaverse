import React from "react";
import "./_challenges.scss";
import scorpionKingBanner from "./assets/scorpionKingBanner.png";

const ScorpionKing = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={scorpionKingBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Scorpion King</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Scorpion King event provides players with the opportunity to
            challenge a formidable adversary. Players engage in battles with the
            Scorpion King, and upon victory, they earn points to boost their
            global rank.
          </p>
        </div>
      </div>
    
   
      <div className="new-event-wrapper mt-4 p-5 d-flex align-items-center justify-content-center">
        <h6 className="mb-0 event-coming-soon">Event Coming Soon</h6>
      </div>
    </div>
  );
};

export default ScorpionKing;
