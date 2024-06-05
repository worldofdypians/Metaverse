import React from "react";
import "./_explorergrid.scss";
import playIcon from "../../../assets/playIcon.svg";

const ExplorerGrid = () => {


  return (
    <div className="px-3 px-lg-5 py-4 stats-wrapper" id="explorer">
    <div className="row">
      <div className="col-12 col-lg-3 d-flex align-items-center justify-content-start">
        <h2 className="font-montserrat builders-title explorer-grid-title px-0">
          IMPORTANT STATS
        </h2>
      </div>
      <div className="col-12 col-lg-3 mb-3 mb-lg-0">
        <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
          <h6 className="mb-0 new-stats-value">38,841,100+</h6>
          <span className="new-stats-type">Total on-chain transactions</span>
        </div>
      </div>
      <div className="col-12 col-lg-3 mb-3 mb-lg-0">
         <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
          <h6 className="mb-0 new-stats-value">$9,693,600+</h6>
          <span className="new-stats-type">Total Volume (USD)</span>
        </div>
      </div>
      <div className="col-12 col-lg-3 mb-3 mb-lg-0">
         <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
          <h6 className="mb-0 new-stats-value">99,280+</h6>
          <span className="new-stats-type">Total on-chain transactions</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExplorerGrid;
