import React, { useEffect, useState } from "react";
import "./_explorergrid.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
// import playIcon from "../../../assets/playIcon.svg";

const ExplorerGrid = ({ totalSupply }) => {
  const [totalTx2, setTotalTx] = useState(0);
  const [totalvolume2, setTotalVolume] = useState(0);
  const fetchCachedData = () => {
    const cachedVolume = localStorage.getItem("cachedVolume");
    const cachedTvl = localStorage.getItem("cachedTvl");

    if (cachedTvl && cachedVolume) {
      setTotalTx(cachedTvl);
      setTotalVolume(cachedVolume);
    }
  };

  useEffect(() => {
    fetchCachedData();
  }, []);

  return (
    <div
      className="px-3 px-lg-5 py-4 stats-wrapper d-flex justify-content-center"
      id="explorer"
    >
      <div className="custom-container ">
        <div className="row">
          <div className="col-12 col-lg-3 d-flex align-items-center justify-content-start">
            <h2 className="font-montserrat builders-title explorer-grid-title px-0">
              Important Stats
            </h2>
          </div>
          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {" "}
                {getFormattedNumber(totalTx2).slice(
                  0,
                  getFormattedNumber(totalTx2).length - 3
                )}
              </h6>
              <span className="new-stats-type">
                Total on-chain transactions
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                ${getFormattedNumber(totalvolume2, 0)}
              </h6>
              <span className="new-stats-type">Total Volume (USD)</span>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(totalSupply, 0)}
              </h6>
              <span className="new-stats-type">Sold NFTs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerGrid;
