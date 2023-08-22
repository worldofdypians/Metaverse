import React from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";

const BetaPassNFT = () => {
  const windowSize = useWindowSize();

  return (
    <div
      id="header"
      // onScroll={onScroll}
      // ref={listInnerRef}
      // style={{ overflow: "scroll" }}
    >
      <div
        className="container-fluid d-flex justify-content-end p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative"
          style={{ backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                    Beta Pass
                  </h6>
                  <p className="collection-desc">
                    The Beta Pass NFTs offer different benefits in Metaverse
                    like: <b>Exclusive Access</b> to new and exciting events,{" "}
                    <b>Enhanced Interactions</b> with available activities,{" "}
                    <b>Expanded Functionality</b> on performing new actions, and
                    earn multiple <b>Rewards</b>.
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <NavLink to="/marketplace" style={{ width: "fit-content" }}>
                      <button className="btn pill-btn">Explore</button>
                    </NavLink>
                    <NavLink
                      to="/marketplace/mint"
                      style={{ width: "fit-content" }}
                    >
                      <button className="btn mint-now-btn px-4 py-1">Mint</button>
                    </NavLink>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <button className="btn pill-btn">Conflux</button>
                    <button className="btn pill-btn">Coin98</button>
                    <button className="btn pill-btn">CoinGecko</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={require("./assets/cawsCollectionBanner.webp")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaPassNFT;
