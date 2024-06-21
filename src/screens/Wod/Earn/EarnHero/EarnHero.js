import React from "react";

const EarnHero = () => {
  return (
    <div className="mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h2 className="font-montserrat builders-title explorer-grid-title px-0">
                  <mark className="font-montserrat explore-tag pe-2">
                    WOD TOKEN
                  </mark>
                  EARN{" "}
                </h2>
                <span className="market-banner-desc font-montserrat text-start">
                Make the most of your assets with WOD Earn products. Start earning rewards by staking WOD tokens today!
                </span>
               
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0 d-flex justify-content-center">
              {/* <img src={bridgeIcon} className="w-100" alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnHero;
