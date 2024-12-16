import React from "react";
import "./_governanceContent.scss";
import { NavLink } from "react-router-dom";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import moment from "moment";

const GovernanceContent = ({ totalProposals, allProposals }) => {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column">
        <div className="active-proposals-wrapper d-flex justify-content-center p-3">
          <div className="custom-container w-100">
            <div className="d-flex flex-column gap-3">
              <h2 className="font-montserrat  market-banner-title px-0">
                ACTIVE PROPOSALS
              </h2>
              {allProposals &&
                allProposals.length > 0 &&
                allProposals.filter((items) => {
                  return items.expired === false;
                }).length > 0 &&
                allProposals
                  .filter((item) => {
                    return item.expired === false;
                  })
                  .map((item, index) => {
                    return (
                      <NavLink to={`proposal/${item._proposalId}`}>
                        <div
                          className="active-proposals-inner-wrapper w-100 py-3 px-3 "
                          key={index}
                        >
                          <div className="d-flex align-items-center gap-3 flex-column flex-lg-row justify-content-between">
                            <div className="d-flex align-items-center gap-4 flex-column flex-lg-row flex-md-row">
                              <div className="d-flex flex-column gap-2">
                                <span className="active-proposals-features">
                                  WoD Proposal #{item._proposalId}
                                </span>
                                <div className="d-flex flex-row flex-wrap gap-2 align-items-center">
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="gov-gray-text">Votes</span>
                                    <span className="gov-white-text">
                                      {getFormattedNumber(
                                        Number(item._optionOneVotes / 1e18) +
                                          Number(item._optionTwoVotes / 1e18),
                                        6
                                      )}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="gov-gray-text">
                                      Ends in
                                    </span>
                                    <span className="gov-white-text">
                                      {moment
                                        .duration(
                                          item._proposalStartTime * 1e3 +
                                            window.config
                                              .vote_duration_in_seconds *
                                              1e3 -
                                            Date.now()
                                        )
                                        .humanize(true)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <button className="getpremium-btn px-4 py-2">
                                VOTE NOW
                              </button>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}

              {allProposals && allProposals.length === 0 && (
                <div className="new-stake-info-wrapper flex-column gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                  <span className="upcoming-stake">
                    New proposals are coming...
                  </span>
                  <span className="upcoming-stake-desc">Check back soon!</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {allProposals &&
          allProposals.length > 0 &&
          allProposals.filter((items) => {
            return items.expired === true;
          }).length > 0 && (
            <div className="past-proposals-wrapper d-flex justify-content-center p-3">
              <div className="custom-container w-100">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                    <h2 className="font-montserrat market-banner-title px-0">
                      PAST PROPOSALS
                    </h2>
                    <span className="market-banner-desc font-montserrat text-center">
                      Proposals are created by the community and work as the
                      consensus mechanism used to outline policies and changes
                      to the World of Dypians ecosystem.
                    </span>
                  </div>
                  {allProposals
                    .filter((item) => {
                      return item.expired === true;
                    })
                    .map((item, index) => {
                      return (
                        <NavLink
                          to={`proposal/${item._proposalId}`}
                          key={index}
                        >
                          <div className="past-proposals-item p-3">
                            <div className="d-flex flex-column flex-lg-row flex-md-row align-items-start align-items-lg-center justify-content-between gap-2">
                              <div className="d-flex flex-column gap-2">
                                <span className="active-proposals-features">
                                  {item.subject}
                                </span>
                                <div className="d-flex flex-row flex-wrap gap-2 align-items-center">
                                  <div className="d-flex align-items-center gap-3">
                                    <span className="gov-gray-text">By</span>
                                    <span className="gov-white-text">
                                      0x253...acb3
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="gov-gray-text">Votes</span>
                                    <span className="gov-white-text">
                                      {getFormattedNumber(
                                        Number(item._optionOneVotes / 1e18) +
                                          Number(item._optionTwoVotes / 1e18),
                                        6
                                      )}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="gov-gray-text">
                                      Ends in
                                    </span>
                                    <span className="gov-white-text">
                                      {moment
                                        .duration(
                                          item._proposalStartTime * 1e3 +
                                            window.config
                                              .vote_duration_in_seconds *
                                              1e3 -
                                            Date.now()
                                        )
                                        .humanize(true)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-2 col-lg-2 justify-content-end">
                                <div className="rejected-tag px-3 py-1 col-lg-5 d-flex justify-content-center">
                                  <span className="rejected-text">
                                    Rejected
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default GovernanceContent;
