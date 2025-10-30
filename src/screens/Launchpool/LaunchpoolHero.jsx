import React from "react";

const LaunchpoolHero = () => {
  return (
    <div className="earn-hero-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 pt-5 pt-lg-0 mt-lg-0">
        <div className="d-flex flex-column w-100 gap-5">
          <div className="row mx-0 align-items-center justify-content-center gap-2">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">LAUNCHPOOL</h6>
                <span className="market-banner-desc font-montserrat text-center">
                  An innovative solution designed to enhance WOD token
                  utilities, offering participants the opportunity to earn
                  rewards, strengthen the ecosystem, and contribute to the
                  growth of community.
                </span>
                <a
                  className="explore-btn px-3 py-2 mt-2"
                  href="https://forms.gle/eMWyemtgvmfxp6KAA"
                  rel="noreferrer"
                  target="_blank"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpoolHero;
