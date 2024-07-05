import React, { useEffect } from "react";
import "./_governanceContent.scss";
import leftWhiteArrow from "../../assets/leftWhiteArrow.svg";
import { NavLink } from "react-router-dom";

const GovernanceInner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Governance";
  }, []);

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="d-flex flex-column gap-4 justify-content-center align-items-center">
        <div className="custom-container">
          <NavLink
            to="/governance"
            className="d-flex align-items-center gap-2 gov-navlink"
          >
            <img src={leftWhiteArrow} alt="" /> Governance
          </NavLink>
        </div>
        <div className="proposal-top-wrapper w-100 p-3">
          <div className="d-flex justify-content-center">
            <div className="custom-container">
              <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
                <span className="single-proposal-top-title">
                  ACCESS TO BASIC FEATURES ON THE NEW POOLS
                </span>
                <div className="poll-tag px-3 py-1">
                  <span className="poll-text">Poll</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="proposal-top-wrapper w-100 p-3">
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
            <div className="custom-container">
              <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between">
                <div className="d-flex flex-column gap-3 col-lg-5 p-lg-3">
                  <span className="single-proposal-description-green">
                    Description
                  </span>
                  <span className="single-proposal-content-txt">
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum.
                  </span>
                </div>
                <div className="proposal-right-col col-lg-5 p-lg-3">
                  <div className="d-flex flex-column gap-3">
                    <span className="single-proposal-description-green">
                      Current Results
                    </span>
                    <div className="proposal-result-wrapper p-3">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="single-proposal-option-txt">
                              Option 1
                            </span>
                            <span className="percentage-text">85%</span>
                          </div>
                          <div className="progress prog1">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "85%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              12,500,000 WOD
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="single-proposal-option-txt">
                              Option 2
                            </span>
                            <span className="percentage-text">15%</span>
                          </div>
                          <div className="progress prog2">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "15%" }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              12,500,000 WOD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="proposal-result-wrapper p-3">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="gov-gray-text">Author</span>
                          <span className="gov-white-text">0x253...acb3</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between w-100">
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Start</span>
                            <span className="gov-white-text">
                              June 20, 2024 04:29
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Ends</span>
                            <span className="gov-white-text">
                              June 23, 2024 04:29
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                      <span className="single-proposal-description-green">
                        Vote
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <button className="stake-wod-btn text-capitalize  px-2 px-lg-5 py-2">
                          Option 1
                        </button>
                        <button className="orange-btn  px-2 px-lg-5 py-2">
                          Option 2
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceInner;
