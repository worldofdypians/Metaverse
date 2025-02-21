import React from "react";
import WodCampaignHero from "./WodCampaignHero/WodCampaignHero";
import WodCampaignContent from "./WoDCampaignContent/WodCampaignContent";

const WodCampaign = ({ coinbase, isConnected, handleConnection }) => {
  return (
    <div className="container-fluid wodCampaign-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <WodCampaignHero />
        <WodCampaignContent
          isConnected={isConnected}
          coinbase={coinbase}
          onConnect={handleConnection}
        />
      </div>
    </div>
  );
};
export default WodCampaign;
