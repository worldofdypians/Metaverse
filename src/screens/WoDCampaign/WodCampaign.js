import React from "react";
import WodCampaignHero from "./WodCampaignHero/WodCampaignHero";
import WodCampaignContent from "./WoDCampaignContent/WodCampaignContent";

const WodCampaign = () => {
  return (
    <div className="container-fluid wodCampaign-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <WodCampaignHero />
        <WodCampaignContent />
      </div>
    </div>
  );
};
export default WodCampaign;
