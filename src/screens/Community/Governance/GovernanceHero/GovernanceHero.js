import React from "react";
import "./_governanceHero.scss";

const GovernanceHero = ({onCreateProposal}) => {
  return (
    <div className="govhero-wrapper video-wrapper pb-5 position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  my-5 py-5">
        <div className="d-flex flex-column w-100 gap-3">
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3">
              <h2 className="font-montserrat builders-title text-start explorer-grid-title px-0">
                Get involved and shape The World of Dypians future
              </h2>
              <span className="gov-desc font-montserrat">
                The governance is a key component of the ecosystem and it is the
                consensus mechanism for defining the rules of the World of
                Dypians platform. Participate in the governance and make your
                voice heard.
              </span>
              <button className="stake-wod-btn px-4 py-2 auto-button" onClick={onCreateProposal}>
                CREATE PROPOSAL
              </button>
            </div>
          </div>
          
        </div>
      </div>
      <div className="container-lg gov-opacitywrapper position-relative bottom-0">
            <div className="d-flex flex-column flex-lg-row justify-content-center gap-5 align-items-center">
              <div className="gov-stat-item px-3 py-5">
                <div className="d-flex flex-column justify-content-center gap-3">
                  <span className="gov-stat-title font-montserrat">124</span>
                  <span className="gov-stat-desc font-montserrat">
                    Total Proposals Raised
                  </span>
                </div>
              </div>
              <div className="gov-stat-item px-3 py-5">
                <div className="d-flex flex-column justify-content-center gap-3">
                  <span className="gov-stat-title font-montserrat">
                    38,841,100+
                  </span>
                  <span className="gov-stat-desc font-montserrat">
                    Total Community Votes
                  </span>
                </div>
              </div>
              <div className="gov-stat-item px-3 py-5">
                <div className="d-flex flex-column justify-content-center gap-3">
                  <span className="gov-stat-title font-montserrat">
                    $2,000,000+
                  </span>
                  <span className="gov-stat-desc font-montserrat">
                    Votes Consolidated in USD
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default GovernanceHero;
