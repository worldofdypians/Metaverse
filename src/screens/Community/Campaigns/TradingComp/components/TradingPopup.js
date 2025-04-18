import React, { useState } from 'react'
import '../_tradingcomp.scss'
import { shortAddress } from '../../../../Caws/functions/shortAddress';

const TradingPopup = ({onClose, coinbase, participants}) => {
  const [leaderboard, setLeaderboard] = useState("weekly");
  const [leaderboardWeek, setLeaderboardWeek] = useState(1)
  const hasLeaderboard = true;

  const leaderboardArray = Array.from({ length: 12 }, (_, i) => i + 1);
  

  return (
    <div className="trading-popup-wrapper popup-active p-3" style={{background: "#18193C", border: "none"}}>
            <div class="overlay-shadow-2"></div>
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
      <div className="airdrop-weeks-grid mt-3">
        {leaderboardArray.map((item, index) => (
           <div
           key={index}
           className={`trading-comp-lb-button ${
             leaderboardWeek === item && "leaderboard-active"
           } px-2 py-2 d-flex align-items-center justify-content-center`}
           onClick={() => setLeaderboardWeek(item)}
           style={{fontSize: "13px"}}
         >
           Week {item}
         </div>
        ))}
      </div>
          {hasLeaderboard ? 
          
          <div className="d-flex trading-comp-overflow-2 flex-column gap-2 mt-3">
              {participants.slice(0,10).map((item, index) => (
                <div className="d-flex align-items-center gap-2">
                 <div className="trading-comp-lb-rank d-flex align-items-center justify-content-center">
                      {index + 1}
                    </div>
                    <div className={`trading-comp-lb-item-2 ${coinbase === item.Address && "trading-comp-lb-item-player"} p-2 d-flex w-100 align-items-center justify-content-between`}>
                      
                      <div className="d-flex align-items-center gap-2">
                      🎉
                      <span>
                      {shortAddress(item.Address)} {coinbase === item.Address && "(You)"}
                      </span>
                      </div>
                      <span className="trading-comp-lb-prize">$500</span>
                    </div>
                </div>
              ))}
            </div>
          :
          <div className="trading-comp-wrapper d-flex flex-column gap-2 align-items-center justify-content-center w-100 h-75 mt-3">
            ⌛
            <span className='no-winners-text'>Winners will be displayed once Week {leaderboardWeek} competition ends.</span>
          </div>
          }
    </div>
  )
}

export default TradingPopup