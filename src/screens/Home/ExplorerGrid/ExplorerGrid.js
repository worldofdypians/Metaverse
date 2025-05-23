import React, { useEffect, useState } from "react";
import "./_explorergrid.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";


import axios from "axios";

const ExplorerGrid = ({
  totalSupply,
  monthlyPlayers,
  wodHolders,
  totalVolumeNew,
}) => {
  const [totalTx2, setTotalTx] = useState(0);
  const [totalvolume2, setTotalVolume] = useState(0);

  const cachedVolume = localStorage.getItem("cachedVolume");
  const cachedTvl = localStorage.getItem("cachedTvl");


  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    ;

    if (result.data && result.data !== "NaN") {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }
 
  };


  const fetchCachedData = () => {
    if (cachedTvl && cachedVolume) {
      setTotalTx(cachedTvl);
      setTotalVolume(cachedVolume);
    }
  };

  useEffect(() => {
    fetchCachedData();
  }, [cachedTvl, cachedVolume]);


  useEffect(() => {
    getAllData(); 
  }, []);


  return (
    <div
      className="px-3 px-lg-5 py-4 stats-wrapper d-flex justify-content-center"
      id="explorer"
    >
      <div className="custom-container">
        <div className="row">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center position-relative gap-2">
              <a
                href="https://dappradar.com/dapp/world-of-dypians?range-ds=30d"
                className="dappRadar-full"
                target="_blank"
              >
                <img src={"https://cdn.worldofdypians.com/wod/dappradarFull.svg"} className="w-100" alt="" />
              </a>
              <h6 className="mb-0 new-stats-value">
                {" "}
                {getFormattedNumber(monthlyPlayers, 0)}
              </h6>
              <span className="new-stats-type">Monthly on-chain Players</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
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
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                ${getFormattedNumber(totalVolumeNew, 0)}
              </h6>
              <span className="new-stats-type">Total Volume (USD)</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(wodHolders, 0)}
              </h6>
              <span className="new-stats-type">WOD Holders</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(totalSupply, 0)}
              </h6>
              <span className="new-stats-type">Total NFTs Sold</span>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
            <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="mb-0 new-stats-value">
                {getFormattedNumber(1500531, 0)}
              </h6>
              <span className="new-stats-type">Total NFT Holders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerGrid;
