import React from "react";
import getFormattedNumber from "../../../screens/Caws/functions/get-formatted-number";

const KickstarterStats = () => {
  return (
    <div
      className="px-3 px-lg-5 py-4 stats-wrapper d-flex justify-content-center"
      id="explorer"
    >
      <div className="custom-container">
        <div className="row">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center position-relative gap-2">
              <h6 className="mb-0 new-stats-value">
                {" "}
                {getFormattedNumber(1300000, 0)}+
              </h6>
              <span className="new-stats-type">Daily Active Users</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {" "}
                {getFormattedNumber(3600000, 0)}+
              </h6>
              <span className="new-stats-type">Monthly Active Users</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(550000000, 0)}+
              </h6>
              <span className="new-stats-type">Total On-Chain Transactions</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(80, 0)}+
              </h6>
              <span className="new-stats-type">Strategic Partners</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(2500000, 0)}+
              </h6>
              <span className="new-stats-type">Community Members</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(152, 0)}
              </h6>
              <span className="new-stats-type">Countries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickstarterStats;
