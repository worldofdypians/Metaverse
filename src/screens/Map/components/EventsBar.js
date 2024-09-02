import React from "react";

import ActiveProfileEvent from "../../Account/src/Components/WalletBalance/ActiveProfileEvent";
import { treasureHuntEvents } from "../mapdata/areas";

const EventsBar = ({ onClose, show }) => {

  return (
    <div className={`marker-details-2 ${show && "marker-events-active"}`}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="text-white mb-0">Events</h3>
            <a href="javascript:void(0)" className="closebtn-3" onClick={onClose}>
              ×
            </a>
          </div>
        </div>
        {treasureHuntEvents.map((item, index) => (
          <ActiveProfileEvent
          key={index}
          data={item}
          event={item}
         
        />
        ))}
      </div>
    </div>
  );
};

export default EventsBar;
