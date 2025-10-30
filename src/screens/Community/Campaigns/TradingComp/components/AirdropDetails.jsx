import React from "react";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";

const AirdropDetails = ({ onClose }) => {
  const airdropRewards = [
    {
      group: "Group 1",
      winners: 100,
      reward: 20,
      requirement: "Min weekly volume $1,000",
    },
    {
      group: "Group 2",
      winners: 600,
      reward: 10,
      requirement: "Min weekly volume $750",
    },
    {
      group: "Group 3",
      winners: 2400,
      reward: 5,
      requirement: "Min weekly volume $500",
    },
  ];

  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none", height: "280px" }}
    >
      <div className="d-flex align-items-start justify-content-between w-100">
        <div className="d-flex flex-column gap-2">
          <h6 className="trading-popup-title mb-0">Airdrop Details</h6>
        <span className="comp-lb-reset-time">Reward Distribution: <b>Within 1–3 days after winner announcement.</b></span>

        </div>
        <img
          src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
        <div className="airdrop-rewards-wrapper-outer">
        <div className="airdrop-rewards-wrapper">
        <div className="row py-3 px-2">
        <div className="col-2 d-flex justify-content-start">
          <span className="popup-table-header">Group</span>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <span className="popup-table-header">Winners</span>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <span className="popup-table-header">Reward</span>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <span className="popup-table-header">Requirements</span>
        </div>
      </div>
      {airdropRewards.map((item, index) => (
        <div className="row p-2 trading-comp-lb-item-2 mb-2 mx-2" key={index}>
          <div className="col-2 d-flex justify-content-start">
            <span className="popup-table-content">{item.group}</span>
          </div>
          <div className="col-2 d-flex justify-content-start">
            <span className="popup-table-content">{item.winners}</span>
          </div>
          <div className="col-2 d-flex justify-content-start">
            <span className="popup-table-content">
              ${getFormattedNumber(item.reward, 0)}
            </span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <span className="popup-table-content">
                {item.requirement}
            </span>
          </div>
        </div>
      ))}
        </div>
        </div>
    </div>
  );
};

export default AirdropDetails;
