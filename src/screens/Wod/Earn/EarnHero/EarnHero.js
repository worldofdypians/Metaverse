import React, { useRef, useState } from "react";
import Slider from "react-slick";
// import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../../Marketplace/components/BetaEventCardHome";
import dropdownIcon from "../assets/dropdownIcon.svg";
import "../../../Wod/Token/MainHero/_mainhero.scss";
import listIcon from "../assets/listIcon.svg";
import tableIcon from "../assets/tableIcon.svg";
import tableIconActive from "../assets/tableIconActive.svg";
import listIconActive from "../assets/listIconActive.svg";

const EarnHero = ({
  onSelectFilter,
  onSelectViewStyle,
  onViewPastPools,
  onViewStakedOnlyPools,
}) => {
  const dypProducts = [
    {
      // link: "/earn",
      title: "TOKEN",
      desc: "Boost rewards with WOD tokens",
      class: "tokenEarnClass",
    },
    {
      // link: "/bridge",
      title: "NFT",
      desc: "Utilize your NFTs for unique benefits",
      class: "tokenBridgeClass",
    },
    {
      // link: "/governance",
      title: "TOKEN & NFT",
      desc: "Combine tokens and NFTs for maximum rewards",
      class: "tokenGovernanceClass",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    draggable: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
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

  const [filterTitle, setFilterTitle] = useState("All");
  const [listStyle, setListStyle] = useState("table");
  const [pastPools, setpastPools] = useState(false);
  const [stakedOnly, setstakedOnly] = useState(false);

  const betaSlider = useRef(null);

  return (
    <div className="earn-mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100 gap-5">
          <div className="row mx-0 align-items-center justify-content-center gap-2 mb-5 pb-lg-5">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-uppercase text-center">
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
                    Earn
                  </mark>
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                  Maximize your rewards in the World of Dypians with our Earn
                  solutions. Make the most of your assets to earn additional
                  rewards. Start earning today!
                </span>
              </div>
            </div>
          </div>
          {/* <div className="custom-container m-auto p-0 ">
            <Slider {...settings} ref={betaSlider}>
              {dypProducts.slice(0, 3).map((item, index) => (
                // <NavLink to={`${item.link}`}>
                <BetaEventCardHome
                  data={item}
                  key={index}
                  isFrontPage={true}
                  addRatio={false}
                />
                // </NavLink>
              ))}
            </Slider>
          </div> */}
        </div>
      </div>
      <div className="opacitywrapper position-relative bottom-0">
        <div className="d-flex flex-column gap-4 position-relative">
          <div className="d-flex flex-column mx-0 align-items-center justify-content-between gap-2 buy-items-all-wrapper pt-2">
            <div className="container-fluid py-4 staking-pools-bg">
              <div className="custom-container p-0">
                <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
                  <div className="d-flex flex-column flex-lg-row gap-3 w-100 mx-0 align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center gap-3">
                      <div className="d-flex align-items-center gap-3">
                        {/* <div className="d-flex justify-content-start align-items-center gap-3">
                          <div
                            className={`list-style ${
                              listStyle === "table" && "list-style-active"
                            }`}
                            onClick={() => {
                              setListStyle("table");
                              onSelectViewStyle("table");
                            }}
                          >
                            <img
                              src={
                                listStyle === "table"
                                  ? tableIconActive
                                  : tableIcon
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className={`list-style ${
                              listStyle === "list" && "list-style-active"
                            }`}
                            onClick={() => {
                              setListStyle("list");
                              onSelectViewStyle("list");
                            }}
                          >
                            <img
                              src={
                                listStyle === "list" ? listIconActive : listIcon
                              }
                              alt=""
                            />
                          </div>
                        </div> */}
                        <div className=" d-flex align-items-center pools-toggle-wrapper">
                          <button
                            onClick={() => {
                              setpastPools(!pastPools);
                              onViewPastPools(filterTitle, !pastPools);
                            }}
                            className={`px-4 py-2 ${
                              pastPools === false
                                ? "active-toggle"
                                : "inactive-toggle"
                            }`}
                          >
                            Live
                          </button>
                          <button
                            onClick={() => {
                              setpastPools(!pastPools);
                              onViewPastPools(filterTitle, !pastPools);
                            }}
                            className={`px-4 py-2 ${
                              pastPools === true
                                ? "active-toggle"
                                : "inactive-toggle"
                            }`}
                          >
                            Past
                          </button>
                        </div>
                      </div>
                      <div className=" d-flex justify-content-end align-items-center gap-1 gap-lg-3">
                        <div
                          className={`pill-box ${
                            stakedOnly && "pill-box-active"
                          }`}
                          onClick={() => {
                            setstakedOnly(!stakedOnly);
                            onViewStakedOnlyPools(
                              filterTitle,
                              pastPools,
                              stakedOnly
                            );
                          }}
                        >
                          <div className="pill"></div>
                        </div>
                        <h5 className="text-white inactive-pools m-0">
                          Staked only
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-3">
                      <div className=" d-flex align-items-center pools-toggle-wrapper">
                        <button
                          onClick={() => {
                            setFilterTitle("All");
                            onSelectFilter("All", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "All"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            setFilterTitle("WOD");
                            onSelectFilter("WOD", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "WOD"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          WOD
                        </button>
                        <button
                          onClick={() => {
                            setFilterTitle("NFT");
                            onSelectFilter("NFT", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "NFT"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          NFTs
                        </button>
                      </div>
                      <div className="tvl-earn-wrapper py-2 px-4">
                        <div className="d-flex align-items-center gap-2">
                          <span className="tvl-earn-title">TVL</span>
                          <span className="tvl-earn-amount">$1,6000,000+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnHero;
