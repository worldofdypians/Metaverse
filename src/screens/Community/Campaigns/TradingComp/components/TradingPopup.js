import React, { useState } from 'react'
import '../_tradingcomp.scss'

const TradingPopup = ({onClose}) => {
  const [leaderboard, setLeaderboard] = useState("weekly");

  const dummyArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="challenge-popup-wrapper popup-active p-3" style={{background: "#18193C", border: "none"}}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <h6 className="trading-popup-title mb-0">
          Trading Competition
        </h6>
        <img
          src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="d-flex align-items-center gap-2 mt-3 w-100 justify-content-center">
              <div
                className={`trading-comp-lb-button ${
                  leaderboard === "weekly" && "leaderboard-active"
                } px-3 py-2 d-flex align-items-center justify-content-center`}
                onClick={() => setLeaderboard("weekly")}
              >
                Weekly
              </div>
              <div
                className={`trading-comp-lb-button ${
                  leaderboard === "monthly" && "leaderboard-active"
                } px-3 py-2 d-flex align-items-center justify-content-center`}
                onClick={() => setLeaderboard("monthly")}
              >
                Monthly
              </div>
              <div
                className={`trading-comp-lb-button ${
                  leaderboard === "3month" && "leaderboard-active"
                } px-3 py-2 d-flex align-items-center justify-content-center`}
                onClick={() => setLeaderboard("3month")}
              >
                3-Months
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              {dummyArray.map((item, index) => (
                <div className="d-flex align-items-center gap-2">
                
                </div>
              ))}
            </div>
    </div>
  )
}

export default TradingPopup