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

const Marketplace = ({ listedNFTS, isConnected, handleConnect }) => {
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
    console.log(listedNFTS);
  }, [listedNFTS]);

  return (
    <div className="container-fluid d-flex justify-content-end p-0" style={{ minHeight: "72vh" }}>
      <div className="marketplace-sidebar d-flex justify-content-center p-4">
        <div className="d-flex flex-column gap-4">
          <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "collections" && "sidebar-item-active"}`} onClick={() => setActiveLink("collections")}>
              <img src={require(`./assets/dypIcon.svg`).default} style={{width: "20px", height: '20px'}} alt="" />
            <span className={`sidebar-title ${activeLink === "collections" && "sidebar-title-active"}`}>Collections</span>
          </div>
         <div className="d-flex flex-column gap-3">
         <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "wod" && "sidebar-item-active"}`} onClick={() => setActiveLink("wod")}>
              <div className="icon-wrapper"></div>
            <span className={`sidebar-title ${activeLink === "wod" && "sidebar-title-active"}`}>WoD Land</span>
          </div>
          <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "caws" && "sidebar-item-active"}`} onClick={() => setActiveLink("caws")}>
              <div className="icon-wrapper"></div>
            <span className={`sidebar-title ${activeLink === "caws" && "sidebar-title-active"}`}>CAWS</span>
          </div>
          <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "timepiece" && "sidebar-item-active"}`} onClick={() => setActiveLink("timepiece")}>
              <div className="icon-wrapper"></div>
            <span className={`sidebar-title ${activeLink === "timepiece" && "sidebar-title-active"}`}>CAWS Timepiece</span>
          </div>
         </div>
          <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "events" && "sidebar-item-active"}`} onClick={() => setActiveLink("events")}>
              <img src={require(`./assets/dypIcon.svg`).default} style={{width: "20px", height: '20px'}} alt="" />
            <span className={`sidebar-title ${activeLink === "events" && "sidebar-title-active"}`}>Events</span>
          </div>
          <div className={`d-flex px-2 py-3 align-items-center gap-2 sidebar-item ${activeLink === "stake" && "sidebar-item-active"}`} onClick={() => setActiveLink("stake")}>
              <img src={require(`./assets/dypIcon.svg`).default} style={{width: "20px", height: '20px'}} alt="" />
            <span className={`sidebar-title ${activeLink === "stake" && "sidebar-title-active"}`}>Stake</span>
          </div>
        </div>
      </div>
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
              <CountUp className="stats-amount font-raleway" duration={5} start={1000}  end={1200} decimal="," />
                <span className="stats-amount font-raleway">ETH</span>
                </div>
              <span className="stats-details font-raleway">
              Total Volume 
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">17,256</h6> */}
              <CountUp className="stats-amount font-raleway" duration={5} start={17000} end={17256} decimal="," />

              <span className="stats-details font-raleway">
              NFT's Sold
              </span>
            </div>
          </div>
          <h6 className="nft-wrapper-title font-raleway mt-4">Top Sales</h6>
          <div className="d-flex align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {listedNFTS && listedNFTS.length > 0 ? (
                listedNFTS.slice(0,5).map((nft) => (
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
              {listedNFTS && listedNFTS.length > 0 ? (
                listedNFTS.slice(0,5).map((nft) => (
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
              {listedNFTS && listedNFTS.length > 0 ? (
                listedNFTS.slice(0,5).map((nft) => (
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
