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
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import Slider from "react-slick";

const Marketplace = ({
  listedNFTS,
  isConnected,
  handleConnect,
  totalListed,
  totalBoughtNFTSinETH,
  totalBoughtNFTSinDYP,
  latest20RecentListedNFTS,
  totalBoughtNFTSCount,
  topSales,
  recentSales,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState("collections");
  const windowSize = useWindowSize();

  var settings = {
    dots: true,
    arrows: true,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide2(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };


  useEffect(() => {
    if (listedNFTS && listedNFTS.length === 0) {
      setLoading(true);
    }
    if (listedNFTS && listedNFTS.length > 0) {
      setLoading(false);
    }
  }, [listedNFTS]);

  return (
    <div
      className="container-fluid mt-5 mt-lg-0 d-flex flex-column-reverse flex-lg-row justify-content-center justify-content-lg-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft px-3 px-lg-5 position-relative">
        <div className="main-wrapper py-4 w-100">
          <h6 className="nft-wrapper-title font-raleway">Overall status</h6>
          <div className="nft-outer-wrapper d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-around p-4">
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">65,268,200</h6> */}
              <CountUp
                className="stats-amount font-raleway"
                duration={5}
                start={65260200}
                end={65268200}
                decimal=","
              />
              <span className="stats-details font-raleway">
                Total Transactions Ethereum & BNB chain
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">1200 ETH</h6> */}
              <div className="d-flex align-items-center gap-2">
                <CountUp
                  className="stats-amount font-raleway"
                  duration={5}
                  start={(25 / 100) * totalBoughtNFTSinETH}
                  end={totalBoughtNFTSinETH}
                  decimal=","
                />
                <span className="stats-amount font-raleway">ETH</span>
              </div>
              <span className="stats-details font-raleway">Total Volume</span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              {/* <h6 className="stats-amount font-raleway">17,256</h6> */}
              <CountUp
                className="stats-amount font-raleway"
                duration={5}
                start={(25 / 100) * totalBoughtNFTSCount}
                end={totalBoughtNFTSCount}
                decimal=","
              />

              <span className="stats-details font-raleway">NFT's Sold</span>
            </div>
          </div>
          <h6 className="nft-wrapper-title font-raleway my-4">Active Events</h6>
          <div className="nft-outer-wrapper row d-flex align-items-center justify-content-around p-4">
            <NavLink
              to="/marketplace/events"
              state={{ package: "dyp" }}
              className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3"
              style={{ textDecoration: "none" }}
            >
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
            <NavLink
              to="/marketplace/events"
              state={{ package: "idyp" }}
              className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3"
              style={{ textDecoration: "none" }}
            >
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
            <NavLink
              to="/marketplace/events"
              state={{ package: "dragon" }}
              className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3"
              style={{ textDecoration: "none" }}
            >
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
            <NavLink
              to="/marketplace/events"
              state={{ package: "criticalHit" }}
              className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3"
              style={{ textDecoration: "none" }}
            >
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
          <div className="row mx-1 d-flex my-4 align-items-center nft-outer-wrapper p-4 gap-4 my-4">
            <div className="d-flex align-items-center gap-4">
              <h6 className="nft-wrapper-title font-raleway mb-0">Top Sales</h6>

              <div className="filter-wrapper filter-wrapper-selected py-2 px-3">
                <h6 className="filter-title">All</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">CAWS</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">WoD</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">TimePiece</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">ETH</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">DYP</h6>
              </div>
            </div>
            {windowSize.width > 1600 ? (
              <div
                className={
                  loading === false
                    ? "row align-items-center"
                    : "loader-wrapper"
                }
                style={{ rowGap: "40px" }}
              >
                {listedNFTS && listedNFTS.length > 0 ? (
                  listedNFTS.map((nft, index) => (
                    // <ItemCard
                    //   key={nft.id}
                    //   nft={nft}
                    //   isConnected={isConnected}
                    //   showConnectWallet={handleConnect}
                    // ></ItemCard>
                    <div className="col-12 col-lg-4">
                      <div className="top-sales-card d-flex p-3 align-items-center gap-3">
                        <span className="sales-number">{index + 1}</span>
                        <img
                          src="https://mint.dyp.finance/thumbs/424.png"
                          width={40}
                          height={40}
                          style={{ borderRadius: "8px" }}
                          alt=""
                        />
                        <h6 className="nft-name-wrapper mb-0 py-1 px-2">
                          CAWS #{nft.tokenId}
                        </h6>
                        <div className="d-flex flex-column gap-1">
                          <span className="price-usd">$250</span>
                          <span className="price-token">
                            {nft.price}{" "}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                          </span>
                        </div>
                      </div>
                    </div>
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
            ) : loading === false ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {listedNFTS &&
                    listedNFTS.length > 0 &&
                    listedNFTS.map((nft) => (
                      <ItemCard
                        key={nft.id}
                        nft={nft}
                        isConnected={isConnected}
                        showConnectWallet={handleConnect}
                      ></ItemCard>
                    ))}
                </Slider>
              </div>
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
          
          <div className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper p-4 gap-4 my-4">
          <div className="d-flex align-items-center gap-4">
              <h6 className="nft-wrapper-title font-raleway mb-0">Recent Listings</h6>

              <div className="filter-wrapper filter-wrapper-selected py-2 px-3">
                <h6 className="filter-title">All</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">CAWS</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">WoD</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">TimePiece</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">ETH</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">DYP</h6>
              </div>
            </div>
            {windowSize.width > 1600 ? (
              <div
                className={
                  loading === false ? "item-cards-wrapper" : "loader-wrapper"
                }
              >
                {latest20RecentListedNFTS &&
                latest20RecentListedNFTS.length > 0 ? (
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
            ) : loading === false ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {latest20RecentListedNFTS &&
                    latest20RecentListedNFTS.length > 0 &&
                    latest20RecentListedNFTS.map((nft) => (
                      <ItemCard
                        key={nft.id}
                        nft={nft}
                        isConnected={isConnected}
                        showConnectWallet={handleConnect}
                      ></ItemCard>
                    ))}
                </Slider>
              </div>
            ) : (
              <div className="loader-wrapper">
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
          <div className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper p-4 gap-4 my-4">
          <div className="d-flex align-items-center gap-4">
              <h6 className="nft-wrapper-title font-raleway mb-0">Recent Sales</h6>

              <div className="filter-wrapper filter-wrapper-selected py-2 px-3">
                <h6 className="filter-title">All</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">CAWS</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">WoD</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">TimePiece</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">ETH</h6>
              </div>
              <div className="filter-wrapper py-2 px-3">
                <h6 className="filter-title">DYP</h6>
              </div>
            </div>
            {windowSize.width > 1600 ? (
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
            ) : loading === false ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {recentSales &&
                    recentSales.length > 0 &&
                    recentSales.map((nft) => (
                      <ItemCard
                        key={nft.id}
                        nft={nft}
                        isConnected={isConnected}
                        showConnectWallet={handleConnect}
                      ></ItemCard>
                    ))}
                </Slider>
              </div>
            ) : (
              <div className="loader-wrapper">
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
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
