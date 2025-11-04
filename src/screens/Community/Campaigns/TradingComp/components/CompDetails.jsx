import React from "react";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";

const CompDetails = ({ onClose }) => {
  const compRewards = [
    {
      position: 1,
      rewards: 700,
      winners: 1,
    },
    {
      position: 2,
      rewards: 600,
      winners: 1,
    },
    {
      position: 3,
      rewards: 500,
      winners: 1,
    },
    {
      position: 4,
      rewards: 450,
      winners: 1,
    },
    {
      position: 5,
      rewards: 400,
      winners: 1,
    },
    {
      position: 6,
      rewards: 350,
      winners: 1,
    },
    {
      position: 7,
      rewards: 300,
      winners: 1,
    },
    {
      position: 8,
      rewards: 200,
      winners: 1,
    },
    {
      position: 9,
      rewards: 180,
      winners: 1,
    },
    {
      position: 10,
      rewards: 120,
      winners: 1,
    },
    {
      position: "11-20",
      rewards: 70,
      winners: 10,
    },
    {
      position: "21-30",
      rewards: 50,
      winners: 10,
    },
  ];

  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none", width: "28%", height: "680px" }}
    >
        <div className="d-flex align-items-start justify-content-between w-100">
        <div className="d-flex flex-column gap-2">
        <h6 className="trading-popup-title mb-0">
          Trading Details
        </h6>
        <span className="comp-lb-reset-time">Reset Time: <b>Monday 00:00 UTC</b></span>
        <span className="comp-lb-reset-time">Reward Distribution: <b>Within 1–3 days after winner announcement.</b></span>
        </div>
        <img
          src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="row py-3 px-2">
        <div className="col-6 d-flex justify-content-start">
          <span className="popup-table-header">Position</span>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <span className="popup-table-header">Rewards</span>
            
            </div>
        {/* <div className="col-4 d-flex justify-content-end">
          <span className="popup-table-header">Winners</span>

        </div> */}
      </div>
      {compRewards.map((item, index) => (
        <div className="row p-2 trading-comp-lb-item-2 mb-2 mx-2" key={index}>
            <div className="col-6 d-flex justify-content-start">
          <span className="popup-table-content">{item.position}</span>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <span className="popup-table-content">${getFormattedNumber(item.rewards, 0)}</span>
            
            </div>
        {/* <div className="col-4 d-flex justify-content-end">
          <span className="popup-table-content">{item.winners}</span>
            
            </div> */}
        </div>
      ))}
    </div>
  );
};

export default CompDetails;
