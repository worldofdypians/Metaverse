import React from "react";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import marketStakeBanner from "./assets/marketStakeBanner.webp";

const MarketStake = () => {
  const windowSize = useWindowSize();
  return (
    <div
      className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}
      <div
        className="container-nft d-flex flex-column gap-2 px-3 px-lg-5 my-4"
        style={{ minHeight: "72vh", backgroundSize: "cover" }}
      >
        <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
          World of Dypians <span style={{ color: "#8c56ff" }}>Events</span>
        </h6>
        <div className="row">
          <div className="col-12 ">
            <div className="market-stake-banner-wrapper d-flex align-items-center justify-content-center p-4">
              <img src={marketStakeBanner} className="w-50" alt="" />
            </div>
          </div>
          <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
            NFT Staking <span style={{ color: "#8c56ff" }}>Pools</span>
          </h6>
          <div className="row w-100 m-0 mt-4">
            <div className="col-12 px-0">
              <div className="market-stake-banner-wrapper d-flex align-items-center justify-content-around p-4">
                <div className="d-flex flex-column align-items-center gap-1">
                  <h6 className="market-stake-stat">$432K+</h6>
                  <span className="market-stake-stat-desc">
                    Total Value Locked (TVL)
                  </span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <h6 className="market-stake-stat">$1.2K+</h6>
                  <span className="market-stake-stat-desc">
                    Total Staked NFTs
                  </span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <h6 className="market-stake-stat">$18.5M+</h6>
                  <span className="market-stake-stat-desc">Paid Rewards</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 mt-5">
            <div className="col-12 px-0">
              <div className="caws-wod-stake-wrapper d-flex align-items-center w-100 p-5">
                <div className="d-flex align-items-center justify-content-between w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <h6 className="market-stake-title">
                      World of Dypians Land and Caws
                    </h6>
                    <span className="market-stake-desc">
                      Make the most of your Land assets with WoD Staking. Start
                      earning now!
                    </span>
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn pill-btn px-4 py-2">Deposit</button>
                      <button className="btn rewards-btn px-4 py-2">Rewards</button>
                    </div>
                  </div>
                  <div className="tvl-wrapper">
                    <h6 className="market-stake-tvl">
                      $38.6K+
                    </h6>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 mt-5">
            <div className="col-12 px-0">
              <div className="wod-stake-wrapper d-flex align-items-center w-100 p-5">
                <div className="d-flex align-items-center justify-content-between w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <h6 className="market-stake-title">
                      World of Dypians Land
                    </h6>
                    <span className="market-stake-desc">
                      Make the most of your Land assets with WoD Staking. Start
                      earning now!
                    </span>
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn pill-btn px-4 py-2">Deposit</button>
                      <button className="btn rewards-btn px-4 py-2">Rewards</button>
                    </div>
                  </div>
                  <div className="tvl-wrapper">
                    <h6 className="market-stake-tvl">
                      $38.6K+
                    </h6>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStake;
