import React from "react";
import "../_kickstarter.scss";
import "../components/kickstarter_newcss.scss";

const KickstarterHero = () => {
  return (
    <div className="container-fluid kickstarter-hero-wrapper d-flex align-items-center justify-content-center">
      <div className="custom-container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
              <div className="inline-flex items-center px-4 py-2 gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 bordertw border-yellow-400/50 rounded-full backdrop-blur-sm relative overflow-hidden">
                <span className="text-white text-xs font-normal">
                  Powered by
                </span>

                <img
                  src="https://cdn.worldofdypians.com/wod/kickstarterBnb.png"
                  alt="powered by bnb chain"
                  className="h-5"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-xl"></div>
              </div>
              <h6 className="main-hero-title font-montserrat text-start text-capitalize">
                "Keep Building" Program
              </h6>
              <p className="market-banner-desc font-montserrat">
                The World of Dypians Keep Building Program helps creators and
                partners launch unique experiences, grow their brand, and build
                strong engagement in the game.
              </p>
              <a
                href="https://forms.gle/MUYyzKpS23yrzGcB7"
                target="_blank"
                rel="noreferrer"
                className="explore-btn px-3 py-2"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickstarterHero;
