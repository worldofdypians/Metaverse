import React from "react";
import "./_governanceContent.scss";
import { NavLink, ProgressBar } from "react-bootstrap";
import leftWhiteArrow from "../../assets/leftWhiteArrow.svg";

const GovernanceInner = () => {
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
              <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-center">
                <div className="d-flex flex-column gap-3 col-lg-5 p-3">
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
                <div className="proposal-right-col col-lg-5 p-3">
                  <div className="d-flex flex-column gap-3">
                    <span className="single-proposal-description-green">
                      Current Results
                    </span>
                    <div className="proposal-result-wrapper p-3">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="single-proposal-option-txt">
                              Option 1
                            </span>
                            <span className="percentage-text">85%</span>
                          </div>
                          <ProgressBar now={60} />
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
    </div>
  );
};

export default GovernanceInner;
