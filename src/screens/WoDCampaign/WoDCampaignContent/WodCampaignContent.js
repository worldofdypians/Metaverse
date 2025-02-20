import React, { useEffect, useState } from "react";
import "./_wodcampaigncontent.scss";

import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import Countdown from "react-countdown";
 
 

const renderer2 = ({ days, hours, minutes }) => {
  return (
    <h6 className="rewardstxtwod mb-0" style={{ color: "#F3BF09" }}>
      {days}D:{hours}H:{minutes}M
    </h6>
  );
};
const WodCampaignContent = ({
  isConnected,
  chainId,
  coinbase,
  onConnect,
  handleSwitchChain,
  wodBalance,
  handleClaim,
  claimStatus,
  claimLoading,
  startedVesting,
  canClaim,
  userClaimedTokens,
  totalVestedTokens,
  cliffTime
}) => {
  const [timerFinished, settimerFinished] = useState(false);

  return (
    <div
      className="wodCampaign-ecosystem-wrapper py-5 position-relative d-flex justify-content-center align-items-center mb-5"
      id="wodCampaign"
    >
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center gap-3">
         
          <div className="new-wodCampaign-wrapper col-lg-7 d-flex flex-column gap-3 p-3 mt-4 mt-lg-0 justify-content-between">
            <div className="wodCampaign-input-wrapper d-flex flex-column gap-2">
              <div className="wodCampaign-input-upper-wrapper  d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center p-3 gap-2">
                  <img src={'https://cdn.worldofdypians.com/wod/wodToken.png'} alt="" />
                  <h6 className="mb-0 wodCampaign-wod-title">WOD</h6>
                </div>
                <div className="d-flex flex-column gap-1 p-3 wodCampaign-network-wrapper col-6 col-lg-5">
                  <span className="wodCampaign-network-span">Network</span>
                  <div className="d-flex align-items-center gap-2">
                    <img src={'https://cdn.worldofdypians.com/wod/bnbIcon.svg'} alt="" />
                    <h6 className="mb-0 wodCampaign-network-title">BNB Chain</h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-between p-3">
                <span className="wodCampaign-balance-txt">Available to claim</span>
                <span className="wodCampaign-balance-amount">
                  {getFormattedNumber(wodBalance)} WOD
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center w-100">
              {/* <img src={bridgeIcon} width={30} height={30} alt="" /> */}
            </div>
        
            {!isConnected && (
              <button className="connectbtn w-100 py-2" onClick={onConnect}>
                Connect Wallet
              </button>
            )}
            {isConnected && chainId !== 56 && (
              <button
                className="fail-button w-100 py-2"
                onClick={handleSwitchChain}
              >
                Switch to BNB Chain
              </button>
            )}
         
                <button
                  className={` w-100 py-2 disabled-btn2
                
              
                `}
                  disabled={ 
                    canClaim === false ||
                    timerFinished === false ||
                    Number(wodBalance) === 0
                      ? true
                      : false
                  }
                  // onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      class="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                  ) : claimStatus === "failed" ? (
                    <>Failed</>
                  ) : claimStatus === "success" ? (
                    <>Success</>
                  ) : (
                    <>Claim</>
                  )}
                </button>
              

           
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default WodCampaignContent;
