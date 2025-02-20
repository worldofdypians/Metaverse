import React from "react";
import "./_wodcampaignhero.scss";

const WodCampaignHero = () => {
  return (
    <div className="wodCampaign-hero-wrapper  position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row flex-column mx-0 align-items-center justify-content-center gap-4 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">
                  WOD Campaigns
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                  Easily claim your airdropped NFT from various campaigns by
                  locking your WOD tokens.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WodCampaignHero;
