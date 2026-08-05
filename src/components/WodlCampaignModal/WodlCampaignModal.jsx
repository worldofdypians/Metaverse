import React from "react";
import "./_wodlcampaignmodal.scss";
import wodHodl from './wodHodl.png'

const WodlCampaignModal = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="wodl-campaign-popup-wrapper wodl-campaign-popup-active">
      <div className="position-relative w-100">
        <img
          src={wodHodl}
          alt="WODL Campaign"
          className="wodl-campaign-banner"
        />
        <div
          className="wodl-campaign-close-wrapper d-flex align-items-center justify-content-center"
          onClick={onClose}
        >
          <img
            src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
            alt="Close"
            width={18}
            height={18}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="d-flex flex-column align-items-center gap-3 p-3 p-md-4">
        <h6 className="mb-0 wodl-campaign-title">WOD HODL</h6>
        <p className="mb-0 wodl-campaign-desc text-center">
          Buy and hold WOD tokens to earn rewards. Your rewards are based on your participation, holding duration, and overall campaign activity. The longer you hold, the higher your share!
        </p>

        <div className="d-flex justify-content-center justify-content-md-start pt-2">
          <a href="https://app.allox.ai/campaigns?campaign=wod-hodl" target="_blank" rel="noopener noreferrer">
            <button className="getpremium-btn wodl-campaign-cta" >
            Join Campaign
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WodlCampaignModal;
