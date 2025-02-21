import React, { useEffect, useState } from "react";
import "./_wodcampaigncontent.scss";

import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import Countdown from "react-countdown";
import { shortAddress } from "../../Caws/functions/shortAddress";

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
}) => {
  const [hasLocked, sethasLocked] = useState(false);
  const [claimedNFT, setclaimedNFT] = useState(false);

  return (
    <div
      className="wodCampaign-ecosystem-wrapper py-5 position-relative d-flex justify-content-center align-items-center mb-5"
      id="wodCampaign"
    >
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center gap-3">
          <div className="wod-container">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 w-100">
              <div className="d-flex flex-column gap-2 w-100 align-items-center justify-content-center">
                <div className="wod-steps w-100">
                  <div
                    className={`wod-step ${isConnected && "wod-step-active"}`}
                  >
                    <div
                      className={`wod-icon ${
                        isConnected && "wod-icon-active"
                      } `}
                    >
                      1
                    </div>
                    <span className="domain-popup-desc">Connect Wallet</span>
                  </div>
                  <div
                    className={`wod-step ${
                      isConnected && hasLocked && "wod-step-active"
                    }`}
                  >
                    <div
                      className={`wod-icon ${
                        isConnected && hasLocked && "wod-icon-active"
                      }`}
                    >
                      2
                    </div>
                    <span className="domain-popup-desc">Lock WOD</span>
                  </div>
                  <div
                    className={`wod-step ${
                      claimedNFT &&
                      hasLocked &&
                      isConnected &&
                      "wod-step-active"
                    }`}
                  >
                    <div
                      className={`wod-icon ${
                        claimedNFT &&
                        hasLocked &&
                        isConnected &&
                        "wod-icon-active"
                      }`}
                    >
                      3
                    </div>
                    <span className="domain-popup-desc">Get NFT</span>
                  </div>
                </div>
                {!isConnected && (
                  <button className="wod-button" onClick={onConnect}>
                    Connect Wallet
                  </button>
                )}
                {!hasLocked && isConnected && (
                  <button
                    className="wod-button"
                    onClick={() => {
                      sethasLocked(true);
                    }}
                  >
                    Lock WOD
                  </button>
                )}

                {hasLocked && isConnected && !claimedNFT && (
                  <button
                    className="wod-button"
                    onClick={() => {
                      setclaimedNFT(true);
                    }}
                  >
                    Claim NFT
                  </button>
                )}
              </div>

              {isConnected && hasLocked && claimedNFT && (
                <div className="d-flex flex-column gap-4 w-100">
                  <div className="d-flex flex-column">
                    <h5 className="text-white">WOD NFT #1</h5>
                    <span className="text-white">
                      You have successfully received the WOD NFT on BNB Chain
                    </span>
                  </div>

                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4">
                    <div className="d-flex flex-column gap-2 w-100">
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <span className="amp-benefits-desc">Token ID</span>
                        <span className="text-white">1</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <span className="amp-benefits-desc">Contract Address</span>
                        <span className="text-white">
                          {shortAddress(
                            "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-2 w-100">
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <span className="amp-benefits-desc">Blockchain</span>
                        <span className="text-white">BNB Chain</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <span className="amp-benefits-desc">Wallet Address</span>
                        <span className="text-white">{shortAddress(coinbase)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WodCampaignContent;
