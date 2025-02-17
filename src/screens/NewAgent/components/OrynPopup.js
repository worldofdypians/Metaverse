import React from "react";
import "../_aiagent.scss";

const OrynPopup = ({ onClose,isConnected }) => {
  const benefits = [
    "No chat restrictions",
    "Faster responses and assistance",
    "Early access to new features",
    "Detailed stats and analytics",
    "Insights beyond World of Dypians",
    "Smarter and more interactive",
  ];

  return (
    <div className="challenge-popup-wrapper popup-active p-3">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h6 className="mb-0 oryn-popup-title">Oryn Premium</h6>
        <img
          src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
          alt="close"
          style={{ cursor: "pointer" }}
          width={20}
          height={20}
          onClick={onClose}
        />
      </div>
      <p className="oryn-popup-desc mt-3">
        Lock WOD to access premium features for as long as your tokens remains
        locked. Withdrawals are subject to a 30-day unbounding period.
      </p>
      <div className="oryn-popup-benefits-wrapper p-3">
        <div className="d-flex flex-column gap-3">
          <span className="oryn-benefits-title">Premium Features</span>
          <div className="d-flex flex-column gap-2">
            {benefits.map((item, index) => (
              <div className="d-flex align-items-center gap-1" key={index}>
                <div className="oryn-green-dot"></div>
                <span className="oryn-popup-desc">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="oryn-lock-wrapper mt-3 p-3 d-flex align-items-center justify-content-between">
        <span className="oryn-lock-title">You're about to unlock</span>
        <h6 className="mb-0 oryn-lock-amount">10,000 $WOD</h6>
      </div>
      <div className="d-flex mt-3 w-100 justify-content-center">
        <button className="explore-btn px-3 py-2">
            {isConnected ? 'Deposit' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default OrynPopup;
