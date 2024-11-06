import React from "react";
import "./_bridgehero.scss";
import bridgeIcon from "../../../../assets/wodAssets/bridgeIcon.svg";

const BridgeHero = ({ onScroll }) => {
  return (
    <div className="mainhero-wrapper2 video-wrapper position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h2 className="font-montserrat main-hero-title  px-0">
                  Wod Token Bridge
                </h2>
                <span className="market-banner-desc font-montserrat text-start">
                  Bridge tokens between Ethereum to BNB Chain, Avalanche and
                  many more to come. Instant and secure transactions.
                </span>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="stake-wod-btn px-4 py-2"
                    onClick={() => {
                      onScroll("bridge");
                    }}
                  >
                    Bridge WoD
                  </button>
                  <button className="buy-wod-btn px-4 py-2">Buy WoD</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0 d-flex justify-content-center">
              <img src={bridgeIcon} className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeHero;
