import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import MobileNav from "../../../components/MobileNav/MobileNav";
import useWindowSize from "../../../hooks/useWindowSize";
import { NavLink } from "react-router-dom";

const TimepieceNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  timepieceNFTS,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  const windowSize = useWindowSize();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (timepieceNFTS && timepieceNFTS.length === 0) {
      setLoading(true);
    }
    if (timepieceNFTS && timepieceNFTS.length > 0) {
      setLoading(false);
    }
  }, [timepieceNFTS]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-5 position-relative">
        <div className="main-wrapper py-4 w-100">
          <h6 className="nft-wrapper-title font-raleway mt-4">
            CAWS Timepiece NFT
          </h6>
          <div className="d-flex align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {timepieceNFTS && timepieceNFTS.length > 0 ? (
                timepieceNFTS.slice(0, 5).map((nft, index) => (
                  <NavLink
                    to={`/marketplace/nft/${nft.blockTimestamp}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                    state={{
                      nft: nft,
                      isCaws: false,
                      isTimepiece: true,
                      isWod: false,
                    }}
                  >
                    <ItemCard
                      key={nft.id}
                      nft={nft}
                      isConnected={isConnected}
                      showConnectWallet={handleConnect}
                      isCaws={false}
                      isTimepiece={true}
                      isWod={false}
                   />
                  </NavLink>
                ))
              ) : (
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimepieceNFT;
