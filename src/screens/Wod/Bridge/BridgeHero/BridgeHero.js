import React from "react";
import "./_bridgehero.scss";
import bridgeIcon from "../../../../assets/wodAssets/bridgeIcon.svg";

const BridgeHero = ({ onScroll }) => {
  return (
    <div className="bridge-mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-center gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">
                  World of Dypians
                  <mark
                    className="p-0"
                    style={{
                      color: "#DCFB85",
                      lineHeight: "80%",
                      background: "transparent",
                    }}
                  >
                    {" "}
                    Bridge
                  </mark>
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                  Bridge enables seamless WOD token transfers between different
                  blockchains, enhancing interoperability. Access a broader
                  range of assets and explore new dimensions within the gaming
                  universe.
                </span>
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

export default BridgeHero;
