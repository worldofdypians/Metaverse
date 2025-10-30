import React from "react";


const BetaEventCard = ({
  data,
  onOpenPopup,
  userEarnUsd,
  isFrontPage,
  addRatio
}) => {
  return (
    <div
      className={` ${data.class} event-card justify-content-end flex-column d-flex align-items-center`}
      onClick={onOpenPopup}
      style={{
        cursor: "pointer",
        aspectRatio: addRatio === false ? "" : "1.8/1",
      }}
    >
      <div className="d-flex align-items-center justify-content-between p-3 w-100 bottom-dark-wrapper">
        <div className="d-flex flex-column">
          <h6 className="events-page-title-home mb-0">{data.title}</h6>
          <h6 className="events-page-desc-home mb-0">{data.desc}</h6>
        </div>
     
      </div>
    </div>
  );
};

export default BetaEventCard;
