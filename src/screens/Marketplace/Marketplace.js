import React, { useEffect, useRef, useState } from "react";
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
import topEth from "./assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/dypIcon.svg";

import { abbreviateNumber } from "js-abbreviation-number";
import nextArrow from "./assets/nextArrow1.svg";
import axios from "axios";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import StakeLandModal from "../../components/StakeModal/StakeLandModal";
import moment from "moment";
import { Skeleton } from "@mui/material";

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
  coinbase,
  recentSales,
  nftCount,
  ethTokenData,
  dypTokenData,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [recentListed, setRecentListed] = useState(latest20RecentListedNFTS);
  const [recentSold, setRecentSold] = useState(recentSales);
  const [topSold, setTopSold] = useState(topSales);
  const [topSalesFilter, setTopSalesFilter] = useState("all");
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [recentSalesFilter, setRecentSalesFilter] = useState("all");
  const firstSlider = useRef();
  const secondSlider = useRef();
  const [loadingTopSales, setLoadingTopSales] = useState(false);
  const [loadingRecentSales, setLoadingRecentSales] = useState(false);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);
  const [activeLink, setActiveLink] = useState("collections");
  const windowSize = useWindowSize();
  const [totalTx, setTotalTx] = useState(28438);
  const [totalvolume, setTotalVolume] = useState(1833007);
  const [sliderCut, setSliderCut] = useState();
  const [showFirstNext, setShowFirstNext] = useState(false);
  const [showSecondNext, setShowSecondNext] = useState(false);
  const [favItems, setfavItems] = useState(0);

  const firstNext = () => {
    firstSlider.current.slickNext();
  };
  const secondNext = () => {
    secondSlider.current.slickNext();
  };
  const firstPrev = () => {
    firstSlider.current.slickPrev();
  };
  const secondPrev = () => {
    secondSlider.current.slickPrev();
  };

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
  var settings2 = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide2(next);
      setShowSecondNext(current);
    },
    afterChange: (current) => setActiveSlide2(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    const result2 = await axios
      .get("https://api.worldofdypians.com/api/totalVolumes")
      .catch((e) => {
        console.error(e);
      });

    if (result.data) {
      setTotalTx(result.data);
    }

    if (result2.data) {
      setTotalVolume(result2.data);
    }
  };

  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = nftTimestamp;
    const difference = seconds - oldTimestamp;
    let output = ``;

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };

  useEffect(() => {
    setTopSold(topSales);
    setRecentListed(latest20RecentListedNFTS);
    setRecentSalesFilter(recentSales);
    if (topSales && topSales.length === 0) {
      setLoadingTopSales(true);
    }
    if (topSales && topSales.length > 0) {
      setLoadingTopSales(false);
    }
    if (latest20RecentListedNFTS && latest20RecentListedNFTS.length === 0) {
      setLoadingRecentListings(true);
    }
    if (latest20RecentListedNFTS && latest20RecentListedNFTS.length > 0) {
      setLoadingRecentListings(false);
    }
    if (recentSales && recentSales.length === 0) {
      setLoadingRecentSales(true);
    }
    if (recentSales && recentSales.length > 0) {
      setLoadingRecentSales(false);
    }
  }, [listedNFTS, nftCount, topSales, latest20RecentListedNFTS]);

  useEffect(() => {
    getAllData();
    window.scrollTo(0, 0);
    document.title = "Marketplace";
  }, []);

  const updateFavs = () => {
    setfavItems(favItems + 1);
  };

  useEffect(() => {
    updateFavs();
  }, [nftCount]);

  var today = moment();
  var hours = moment().subtract(1, "days");
  var week = moment().subtract(7, "days");
  var month = moment().subtract(30, "days");
  const [topSalesDate, setTopSalesDate] = useState("week");

  const filterTopSales = () => {
    setLoadingTopSales(true);
    let datedSales = topSales.map((item) => {
      return { ...item, date: new Date(parseInt(item.blockTimestamp * 1000)) };
    });

    let filteredDateSales;
    if (topSalesDate === "24h") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > hours._d && item.date < today._d;
      });
    } else if (topSalesDate === "week") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > week._d && item.date < today._d;
      });
    } else if (topSalesDate === "month") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > month._d && item.date < today._d;
      });
    }

    if (topSalesFilter === "caws") {
      setTopSalesFilter("caws");
      let cawsFilter = filteredDateSales.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address ||
          item.nftAddress === window.config.nft_cawsold_address
      );
      setTopSold(cawsFilter);
    } else if (topSalesFilter === "land") {
      setTopSalesFilter("land");

      let wodFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setTopSold(wodFilter);
    } else if (topSalesFilter === "timepiece") {
      setTopSalesFilter("timepiece");

      let timepieceFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setTopSold(timepieceFilter);
    } else if (topSalesFilter === "all") {
      setTopSalesFilter("all");

      setTopSold(filteredDateSales);
    }
    // setTimeout => {
    setLoadingTopSales(false);
    // }, 1000);
  };

  useEffect(() => {
    filterTopSales();
  }, [topSalesFilter, topSalesDate]);

  const filterRecentListings = (filter) => {
    setLoadingRecentListings(true);
    if (filter === "caws") {
      setRecentListingsFilter("caws");
      let cawsFilter = latest20RecentListedNFTS.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address ||
          item.nftAddress === window.config.nft_cawsold_address
      );
      setRecentListed(cawsFilter);
    } else if (filter === "land") {
      setRecentListingsFilter("land");
      let wodFilter = latest20RecentListedNFTS.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setRecentListed(wodFilter);
    } else if (filter === "timepiece") {
      setRecentListingsFilter("timepiece");
      let timepieceFilter = latest20RecentListedNFTS.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setRecentListed(timepieceFilter);
    } else if (filter === "all") {
      setRecentListingsFilter("all");
      setRecentListed(latest20RecentListedNFTS);
    }
    setTimeout(() => {
      setLoadingRecentListings(false);
    }, 1000);
  };

  const filterRecentSales = (filter) => {
    setLoadingRecentSales(true);
    if (filter === "caws") {
      setRecentSalesFilter("caws");
      let cawsFilter = recentSales.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address ||
          item.nftAddress === window.config.nft_cawsold_address
      );
      setRecentSold(cawsFilter);
    } else if (filter === "land") {
      setRecentSalesFilter("land");
      let wodFilter = recentSales.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setRecentSold(wodFilter);
    } else if (filter === "timepiece") {
      setRecentSalesFilter("timepiece");
      let timepieceFilter = recentSales.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setRecentSold(timepieceFilter);
    } else if (filter === "all") {
      setRecentSalesFilter("all");
      setRecentSold(recentSales);
    }
    setTimeout(() => {
      setLoadingRecentSales(false);
    }, 1000);
  };

  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  useEffect(() => {
    setRecentSalesFilter("all");
    setRecentSold(recentSales);
  }, [recentSales]);

  useEffect(() => {
    if (windowSize.width > 1600) {
      setSliderCut(6);
    } else if (windowSize.width > 1500) {
      setSliderCut(5);
    } else if (windowSize.width > 1024) {
      setSliderCut(4);
    } else if (windowSize.width > 600) {
      setSliderCut(3);
    } else if (windowSize.width > 480) {
      setSliderCut(2);
    }else{
      setSliderCut(1);
    }
  }, [windowSize.width]);

  return (
    <div
      className="container-fluid mt-5 mt-lg-0 d-flex flex-column-reverse flex-lg-row justify-content-center justify-content-lg-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft d-flex align-items-start px-0 px-lg-5 position-relative">
        <div className="container-lg mx-0">
          <div className="row justify-content-between align-items-center marketplace-banner mt-4 mt-lg-0">
            <div className="col-12 col-lg-5">
              <h6 className="market-banner-title">
                Explore the World of Dypians{" "}
                <mark
                  className="p-0"
                  style={{
                    color: "#8C56FF",
                    lineHeight: "80%",
                    background: "transparent",
                  }}
                >
                  Marketplace!
                </mark>
              </h6>

              <div className="my-4">
                <span className="market-banner-desc my-4">
                  Discover the power of NFTs for a unique digital experience
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <img
                src={require("./assets/marketMain2.webp")}
                alt=""
                className="market-main w-100"
              />
            </div>
          </div>
          <div className="main-wrapper w-100">
            <div className="row gap-4 gap-lg-0 align-items-center">
              <div className="col-12 col-lg-4">
                <div className="stats-container-1 d-flex flex-column align-items-center justify-content-center gap-3">
                  <h6 className="stats-value">
                    {getFormattedNumber(totalTx).slice(
                      0,
                      getFormattedNumber(totalTx).length - 3
                    )}
                  </h6>
                  <span className="stats-desc">
                    Total on-chain transactions
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="stats-container-2 d-flex flex-column align-items-center justify-content-center gap-3">
                  <h6 className="stats-value">
                    {/* {abbreviateNumber(totalvolume,4)}+ */}$
                    {getFormattedNumber(totalvolume, 0)}
                  </h6>
                  <span className="stats-desc">Total Volume (USD)</span>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="stats-container-3 d-flex flex-column align-items-center justify-content-center gap-3">
                  <h6 className="stats-value">
                    {" "}
                    {getFormattedNumber(11000).slice(
                      0,
                      getFormattedNumber(11000).length - 3
                    )}
                  </h6>
                  <span className="stats-desc">Sold NFTs</span>
                </div>
              </div>
            </div>
            <h6 className="nft-wrapper-title font-raleway my-4 ms-3 ms-lg-0">
              Active Events
            </h6>
            <div className="nft-outer-wrapper row d-flex align-items-center justify-content-around gap-5 gap-lg-0 p-2 p-lg-5 mx-2 mx-lg-0 position-relative">
            
              {windowSize.width > 786 ? 
                <>
                  <NavLink
                to="/marketplace/events"
                state={{ package: "dragon" }}
                className="d-flex flex-column align-items-center gap-2 col-12 col-lg-3 position-relative"
                style={{ textDecoration: "none" }}
              >
                <div className="position-relative package-blur">
                  <div className="first-box-blur  d-flex align-items-end justify-content-center">
                    <span className="blur-package-title">Dragon Ruins</span>
                  </div>
                  <div className="second-box-blur"></div>
                  <img
                    src={require("../Account/src/Components/BundleCard/assets/dragonPackageIcon.webp")}
                    alt=""
                    className="blur-img"
                  />
                </div>
              </NavLink>
              <NavLink
                to="/marketplace/events"
                state={{ package: "idyp" }}
                className="d-flex flex-column align-items-center gap-2 col-12 col-lg-3 position-relative"
                style={{ textDecoration: "none" }}
              >
                <div className="position-relative package-blur">
                  <div className="first-box-blur  d-flex align-items-end justify-content-center">
                    <span className="blur-package-title">Puzzle Madness</span>
                  </div>
                  <div className="second-box-blur"></div>
                  <img
                    src={require("./assets/puzzleMadness.png")}
                    alt=""
                    className="blur-img"
                  />
                </div>
              </NavLink>
              <NavLink
                to="/marketplace/events"
                state={{ package: "dyp" }}
                className="d-flex flex-column align-items-center gap-2 col-12 col-lg-3 position-relative"
                style={{ textDecoration: "none" }}
              >
                <div className="position-relative package-blur">
                  <div className="first-box-blur  d-flex align-items-end justify-content-center">
                    <span className="blur-package-title">Golden Pass</span>
                  </div>
                  <div className="second-box-blur"></div>
                  <img
                    src={require("./assets/goldenPass.png")}
                    alt=""
                    className="blur-img"
                  />
                </div>
              </NavLink>
              <NavLink
                to="/marketplace/events"
                state={{ package: "criticalHit" }}
                className="d-flex flex-column align-items-center gap-2 col-12 col-lg-3 position-relative"
                style={{ textDecoration: "none" }}
              >
                <div className="position-relative package-blur">
                  <div className="first-box-blur d-flex align-items-end justify-content-center">
                    <span className="blur-package-title">Critical Hit</span>
                  </div>
                  <div className="second-box-blur"></div>
                  <img
                    src={require("./assets/criticalHit.webp")}
                    alt=""
                    className="blur-img"
                  />
                </div>
              </NavLink>
                </> 
                : 
                <div className="d-flex justify-content-center">
                <div className="new-packages-grid mb-3">
                  <div className="">
                    <div
                      className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
                    >
                      <img
                        src={require("../Account/src/Components/BundleCard/assets/dragonPackageIcon.webp")}
                        className="w-100"
                        style={{ borderRadius: "16px" }}
                        alt=""
                      />
                      <span className="event-package-title">Dragon Ruins</span>
                    </div>
                  </div>
                  <div className="">
                    <div
                      className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
                    >
                      <img
                        src={require("./assets/goldenPass.png")}
                        className="w-100"
                        style={{ borderRadius: "16px" }}
                        alt=""
                      />
                      <span className="event-package-title">Golden Pass</span>
                    </div>
                  </div>

                  <div className="">
                    <div
                      className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
                    >
                      <img
                        src={require("./assets/puzzleMadness.png")}
                        className="w-100"
                        style={{ borderRadius: "16px" }}
                        alt=""
                      />
                      <span className="event-package-title">
                        Puzzle Madness
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <div
                      className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2`}
                    >
                      <img
                        src={require("./assets/criticalHit.webp")}
                        className="w-100"
                        style={{ borderRadius: "16px" }}
                        alt=""
                      />
                      <span className="event-package-title">Critical Hit</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            </div>
            <div
              className="row mx-1 justify-content-center d-flex my-4 align-items-start nft-outer-wrapper px-3 py-5 px-lg-5 gap-4 my-4"
              style={{ minHeight: "420px" }}
            >
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
                  <h6 className="nft-wrapper-title font-raleway mb-0">
                    Top Sales
                  </h6>
                  <div className="d-flex  align-items-center gap-4">
                    <h6
                      className={`filter-title mb-0 ${
                        topSalesFilter === "all" && "filter-selected"
                      }`}
                      onClick={() => setTopSalesFilter("all")}
                    >
                      All
                    </h6>
                    <h6
                      className={`filter-title mb-0 ${
                        topSalesFilter === "caws" && "filter-selected"
                      }`}
                      onClick={() => setTopSalesFilter("caws")}
                    >
                      CAWS
                    </h6>
                    <h6
                      className={`filter-title mb-0 ${
                        topSalesFilter === "land" && "filter-selected"
                      }`}
                      onClick={() => setTopSalesFilter("land")}
                    >
                      Land
                    </h6>
                    <h6
                      className={`filter-title mb-0 ${
                        topSalesFilter === "timepiece" && "filter-selected"
                      }`}
                      onClick={() => setTopSalesFilter("timepiece")}
                    >
                      Timepiece
                    </h6>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title  mb-0 ${
                      topSalesDate === "24h" && "filter-selected"
                    }`}
                    onClick={() => setTopSalesDate("24h")}
                  >
                    24H
                  </h6>
                  <h6
                    className={`filter-title  mb-0 ${
                      topSalesDate === "week" && "filter-selected"
                    }`}
                    onClick={() => setTopSalesDate("week")}
                  >
                    7D
                  </h6>
                  <h6
                    className={`filter-title  mb-0 ${
                      topSalesDate === "month" && "filter-selected"
                    }`}
                    onClick={() => setTopSalesDate("month")}
                  >
                    30D
                  </h6>
                </div>
              </div>
              <div className="w-100" style={{minHeight: '260px'}}>
              <div
                className={
                  loadingTopSales === false
                    ? "row align-items-start position-relative justify-content-start px-0"
                    : "loader-wrapper"
                }
                style={{ rowGap: "22px" }}
              >
                {!loadingTopSales ? (
                  topSold && topSold.length > 0 ? (
                    topSold.slice(0, 9).map((nft, index) => (
                      <div className="col-12 col-lg-4" key={index}>
                        <NavLink
                          to={`/marketplace/nft/${nft.blockTimestamp}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.buyer?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="top-sales-card d-flex p-3 align-items-center gap-3 position-relative">
                            {/* <div className="position-absolute top-sales-rank">
                            <span>{index + 1}</span>
                          </div> */}
                            {/* <span className="sales-number">{index + 1}</span> */}
                            <img
                              src={
                                nft.type === "caws"
                                  ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                  : nft.type === "land"
                                  ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                  : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                              }
                              width={40}
                              height={40}
                              style={{ borderRadius: "10px" }}
                              alt=""
                            />
                            <div className="d-flex justify-content-between gap-2 w-100">
                              <h6
                                className="nft-name-wrapper mb-0 py-1 px-2"
                                style={{ fontSize: 14 }}
                              >
                                {nft.type === "caws"
                                  ? "CAWS"
                                  : nft.type === "land"
                                  ? "Genesis Land"
                                  : "Timepiece"}{" "}
                                #{nft.tokenId}
                              </h6>
                              <div className="d-flex align-items-center gap-1 ">
                                <div className="d-flex flex-column ">
                                  <span
                                    className="nft-price-usd overflow-hidden"
                                    style={{
                                      color: "#7DD9AF",
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      textAlign: "end",
                                    }}
                                  >
                                    $
                                    {getFormattedNumber(
                                      nft.payment_priceType === 0
                                        ? ethTokenData * (nft.price / 1e18)
                                        : dypTokenData * (nft.price / 1e18),
                                      2
                                    )}
                                  </span>{" "}
                                  <span
                                    className="top-eth overflow-hidden"
                                    style={{
                                      fontSize: 12,
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      textAlign: "end",
                                    }}
                                  >
                                    {nft.payment_priceType === 0 ? (
                                      <img
                                        src={topEth}
                                        height={12}
                                        width={12}
                                        alt=""
                                        className="mx-1"
                                      />
                                    ) : (
                                      <img
                                        src={topDyp}
                                        height={12}
                                        width={12}
                                        alt=""
                                        className="mx-1"
                                      />
                                    )}
                                    {getFormattedNumber(
                                      nft.price / 1e18,
                                      nft.payment_priceType === 0 ? 3 : 0
                                    )}{" "}
                                    {nft.payment_priceType === 0
                                      ? "ETH"
                                      : "DYP"}
                                  </span>
                                </div>
                              </div>
                              <span
                                className="position-absolute top-sale-time"
                                style={{ bottom: "-20%", left: '4%' }}
                              >
                                {getRelativeTime(nft.blockTimestamp)}
                              </span>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    ))
                  ) : (
                    <div className="d-flex justify-content-center">
                      <h3
                        className="text-white"
                        style={{ textAlign: "center" }}
                      >
                        There were no sales for that period.
                      </h3>
                    </div>
                  )
                ) : (
                <div className="row loader-wrapper gap-0">
                 
            
                <div className="col-12 col-lg-4 mb-3 d-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                <div className="col-12 col-lg-4 mb-3 d-none d-lg-flex justify-content-center">
                  <Skeleton  animation="wave" width={"100%"} height={72} variant="rounded" /> 
                </div>
                </div>
                )}
              </div>
              </div>
            </div>

            <div
              className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper position-relative p-3 p-lg-5 gap-4 my-4"
              style={{ minHeight: "430px" }}
            >
              {activeSlide > 0 && (
                <div className="prev-arrow-nft" onClick={firstPrev}>
                  <img src={nextArrow} alt="" />
                </div>
              )}
              {showFirstNext === activeSlide
                ? null
                : recentListed.length > sliderCut && (
                    <div className="next-arrow-nft" onClick={firstNext}>
                      <img src={nextArrow} alt="" />
                    </div>
                  )}
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <h6 className="nft-wrapper-title font-raleway mb-0">
                  Recent Listings
                </h6>
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("caws")}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("land")}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("timepiece")}
                  >
                    Timepiece
                  </h6>
                </div>
              </div>
              {loadingRecentListings === false ? (
                <div className="slider-container">
                  {recentListed &&
                      recentListed.length > 0 ?
                  <Slider ref={(c) => (firstSlider.current = c)} {...settings}>
                    
                      {recentListed.map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.blockTimestamp}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.seller?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            dypTokenData={dypTokenData}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={nft.type === "caws"}
                            isTimepiece={nft.type === "timepiece"}
                            isWod={nft.type === "land"}
                            coinbase={coinbase}
                            isListed={true}
                          />
                        </NavLink>
                      ))}
                       
                  </Slider>
                   :
                   <div className="d-flex w-100 align-items-center justify-content-center">
                     <h3 className="text-white">There are no listed items for that category.</h3>
                   </div>  
                  
                  }
                </div>
              ) : (
                <div className="loader-wrapper gap-3 justify-content-start  mt-3">
                  {/* <HashLoader
                    color={"#554fd8"}
                    loading={loadingRecentListings}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> */}
                  {windowSize.width > 1600 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 1500 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 1024 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 600 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 480 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : (
                    <Skeleton animation="wave"
                      width={178}
                      variant="rounded"
                      height={230}
                      sx={{ bgcolor: "black.700" }}
                    />
                  )}
                </div>
              )}
            </div>
            <div
              className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper position-relative p-3 p-lg-5 gap-4 my-4"
              style={{ minHeight: "430px" }}
            >
              {activeSlide2 > 0 && (
                <div className="prev-arrow-nft" onClick={secondPrev}>
                  <img src={nextArrow} alt="" />
                </div>
              )}
              {showSecondNext === activeSlide2
                ? null
                : recentSold.length > sliderCut && (
                    // <img
                    //   src={nextArrow}
                    //   width={40}
                    //   height={40}
                    //   onClick={secondNext}
                    //   className="next-arrow-nft"
                    //   alt=""
                    // />
                    <div className="next-arrow-nft" onClick={secondNext}>
                      <img src={nextArrow} alt="" />
                    </div>
                  )}

              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <h6 className="nft-wrapper-title font-raleway mb-0">
                  Recent Sales
                </h6>
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentSales("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => filterRecentSales("caws")}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => filterRecentSales("land")}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => filterRecentSales("timepiece")}
                  >
                    Timepiece
                  </h6>
                </div>
              </div>
              {loadingRecentSales === false ? (
                <div className="slider-container">
                  <Slider
                    ref={(c) => (secondSlider.current = c)}
                    {...settings2}
                  >
                    {recentSold &&
                      recentSold.length > 0 &&
                      recentSold.map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.blockTimestamp}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.buyer?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            dypTokenData={dypTokenData}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={nft.type === "caws"}
                            isTimepiece={nft.type === "timepiece"}
                            isWod={nft.type === "land"}
                            coinbase={coinbase}
                            isListed={true}
                            onFavorite={updateFavs}
                          />
                        </NavLink>
                      ))}
                  </Slider>
                </div>
              ) : (
                <div className="loader-wrapper mt-3 justify-content-start gap-3">
                  {/* <HashLoader
                    color={"#554fd8"}
                    loading={loadingRecentListings}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> */}
                  {windowSize.width > 1600 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 1500 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 1024 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 600 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : windowSize.width > 480 ? (
                    <>
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : (
                    <Skeleton animation="wave"
                      width={178}
                      variant="rounded"
                      height={230}
                      sx={{ bgcolor: "black.700" }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
