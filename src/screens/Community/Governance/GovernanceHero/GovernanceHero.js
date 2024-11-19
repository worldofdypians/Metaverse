import React from "react";
import "./_governanceHero.scss";

const GovernanceHero = ({ onCreateProposal }) => {
  return (
    <div className="governance-hero-wrapper pb-5 position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-center gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">Governance</h6>
                <span className="market-banner-desc font-montserrat text-center">
                  The governance is a key component of the ecosystem and it is
                  the consensus mechanism for defining the rules of the World of
                  Dypians platform. Participate in the governance and make your
                  voice heard.
                </span>
                <button
                  className="getpremium-btn px-3 py-2 mt-3"
                  onClick={onCreateProposal}
                >
                  Create Proposal
                </button>
                {/* <div className="d-flex align-items-center gap-3">
                  <button
                    className="stake-wod-btn px-4 py-2"
                    onClick={() => {
                      onScroll("bridge");
                    }}
                  >
                    Bridge WOD
                  </button>
                  <button className="buy-wod-btn px-4 py-2">Buy WOD</button>
                </div> */}
              </div>
            </div>
            {/* <div className="col-12 col-lg-5 pe-0 d-flex justify-content-center">
              <img src={bridgeIcon} className="w-100" alt="" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceHero;
