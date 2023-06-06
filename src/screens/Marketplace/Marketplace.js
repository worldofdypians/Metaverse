import React, { useEffect, useState } from "react";
import "./_marketplace.scss";
import { HashLoader } from "react-spinners";
import wodLogo from "./assets/wodLogo.png";
import cawsLogo from "./assets/cawsLogo.png";
import ItemCard from "../../components/ItemCard/ItemCard";
import { NavLink } from "react-router-dom";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import CountUp from "react-countup";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import dypius from "../Account/src/Images/userProfile/dypius.svg";
import dragonIcon from "../Account/src/Images/userProfile/dragonIcon.svg";
import classes from "../Account/src/Containers/Dashboard/Dashboard.module.css";



const Marketplace = ({ listedNFTS, isConnected, handleConnect, totalListed, totalBoughtNFTSinETH, totalBoughtNFTSinDYP, latest20RecentListedNFTS,totalBoughtNFTSCount, topSales, recentSales }) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  
  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState("collections")


  useEffect(() => {
    if (listedNFTS && listedNFTS.length === 0) {
      setLoading(true);
    }
    if (listedNFTS && listedNFTS.length > 0) {
      setLoading(false);
    }
  }, [listedNFTS]);

  return (
    <div className="container-fluid d-flex justify-content-end p-0" style={{ minHeight: "72vh" }}>
     <MarketSidebar />
      <div className="container-nft pe-5 position-relative">
        <div className="main-wrapper py-4 w-100">
          <h6 className="nft-wrapper-title font-raleway">Overall status</h6>
          <div className="nft-outer-wrapper d-flex align-items-center justify-content-around p-4">
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">65,268,200</h6> */}
              <CountUp className="stats-amount font-raleway" duration={5} start={65260200} end={65268200} decimal=","  />
              <span className="stats-details font-raleway">
                Total Transactions Ethereum & BNB chain
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">1200 ETH</h6> */}
                <div className="d-flex align-items-center gap-2">
              <CountUp className="stats-amount font-raleway" duration={5} start={(25 / 100) * totalBoughtNFTSinETH}  end={totalBoughtNFTSinETH} decimal="," />
                <span className="stats-amount font-raleway">ETH</span>
                </div>
              <span className="stats-details font-raleway">
              Total Volume 
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">17,256</h6> */}
              <CountUp className="stats-amount font-raleway" duration={5} start={(25/100) * totalBoughtNFTSCount} end={totalBoughtNFTSCount} decimal="," />

              <span className="stats-details font-raleway">
              NFT's Sold
              </span>
            </div>
          </div>
          <h6 className="nft-wrapper-title font-raleway my-4">Active Events</h6>
          <div className="nft-outer-wrapper d-flex align-items-center justify-content-around p-4">
          <NavLink to="/marketplace/events" state={{package: "dyp"}} className="d-flex flex-column align-items-center gap-2" style={{textDecoration: "none"}}>
              <div
                className={`premium-package dyp-package p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
              >
                <img
                  src={dypius}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Golden Pass
              </h6>
            </NavLink>
            <NavLink to="/marketplace/events" state={{package: "idyp"}} className="d-flex flex-column align-items-center gap-2" style={{textDecoration: "none"}}>
              <div
                className={`premium-package ${classes.idypicon}  p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
              ></div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Puzzle Madness
              </h6>
            </NavLink>
            <NavLink to="/marketplace/events" state={{package: "dragon"}} className="d-flex flex-column align-items-center gap-2" style={{textDecoration: "none"}}>
              <div
                className={`premium-package dragon-package  p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
              >
                <img
                  src={dragonIcon}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Dragon Ruins
              </h6>
            </NavLink>
            <NavLink to="/marketplace/events" state={{package: "criticalHit"}} className="d-flex flex-column align-items-center gap-2" style={{textDecoration: "none"}}>
              <div
                className={`premium-package criticalhit-package  p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
              >
                <img
                  src={dypius}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Critical Hit
              </h6>
            </NavLink>
          </div>
          <h6 className="nft-wrapper-title font-raleway mt-4">Top Sales</h6>
          <div className="d-flex align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {topSales && topSales.length > 0 ? (
                topSales.map((nft) => (
                  <ItemCard
                    key={nft.id}
                    nft={nft}
                    isConnected={isConnected}
                    showConnectWallet={handleConnect}
                  ></ItemCard>
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
          <h6 className="nft-wrapper-title font-raleway mt-4">Recent Listings</h6>
          <div className="d-flex align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {latest20RecentListedNFTS && latest20RecentListedNFTS.length > 0 ? (
                latest20RecentListedNFTS.map((nft) => (
                  <ItemCard
                    key={nft.id}
                    nft={nft}
                    isConnected={isConnected}
                    showConnectWallet={handleConnect}
                  ></ItemCard>
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
          <h6 className="nft-wrapper-title font-raleway mt-4">Recent Sales</h6>
          <div className="d-flex align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {recentSales && recentSales.length > 0 ? (
                recentSales.map((nft) => (
                  <ItemCard
                    key={nft.id}
                    nft={nft}
                    isConnected={isConnected}
                    showConnectWallet={handleConnect}
                  ></ItemCard>
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
          {/* <div className="d-flex w-100 align-items-center justify-content-end">
            <NavLink to="cats-and-watches-society">
              <button className="btn home-hero-btn px-4 py-2">View All</button>
            </NavLink>
          </div> */}

          {/* <div className="mx-0 row my-3">
          <div className="col-12 col-lg-4">
            <NavLink to="/timepiece" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"CAWS Timepiece"}
                collectionName={"timepiece"}
              />
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <NavLink to="/world-of-dypians" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"World of Dypians"}
                collectionName={"wod"}
              />
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <NavLink to="/cats-and-watches-society" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"Cats and Watches Society"}
                collectionName={"caws"}
              />
            </NavLink>
          </div>
        </div> */}
          {/* <div className={loading === false ? "item-cards-wrapper" : ""}>
          {listedNFTS && listedNFTS.length > 0 ? (
            listedNFTS.map((nft) => (
              <ItemCard key={nft.id} nft={nft} isConnected={isConnected} showConnectWallet={handleConnect}></ItemCard>
            ))
          ) : (
            <BounceLoader
              color={"#554fd8"}
              loading={loading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
