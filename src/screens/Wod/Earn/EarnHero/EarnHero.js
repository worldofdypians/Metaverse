import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../../Marketplace/components/BetaEventCardHome";
import dropdownIcon from "../assets/dropdownIcon.svg";
import '../../../Wod/Token/MainHero/_mainhero.scss'

const EarnHero = ({ onSelectFilter }) => {
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

  const [filterTitle, setFilterTitle] = useState("All Staking Pools");

  const betaSlider = useRef(null);

  return (
    <div className="earn-mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100 gap-5">
          <div className="row mx-0 align-items-center justify-content-center gap-2 my-5 ps-4">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h2 className="font-montserrat main-hero-title px-0 text-center">
                  {/* <mark className="font-montserrat explore-tag pe-2">
                    World of Dypians
                  </mark> */}
                  World of Dypians Earn
                </h2>
                <span className="market-banner-desc font-montserrat text-center">
                  Maximize your rewards in the World of Dypians with our Earn
                  solutions. Make the most of your assets to earn additional
                  rewards. Start earning today!
                </span>
              </div>
            </div>
          </div>
          <div className="custom-container m-auto p-0 ">
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
          </div>
        </div>
      </div>
      <div className="opacitywrapper position-relative bottom-0">
        <div className="d-flex flex-column gap-4 position-relative">
          <div className="d-flex flex-column mx-0 align-items-center justify-content-between gap-2 buy-items-all-wrapper py-2">
            <div className="container-fluid py-4 staking-pools-bg">
              <div className="custom-container p-0">
                <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
                  <div className="d-flex flex-column flex-lg-row flex-md-row gap-3 w-100 mx-0 align-items-center justify-content-between">
                    <div className="dropdown filters-dropdown w-auto">
                      <button
                        className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-center gap-3 px-3 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="filter-nav-title mb-0">
                            {filterTitle}
                          </h6>
                        </div>
                        <img src={dropdownIcon} alt="" />
                      </button>
                      <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("All Staking Pools");
                            onSelectFilter("All Staking Pools");
                          }}
                        >
                          <span>All Staking Pools</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("Token");
                            onSelectFilter("Token");
                          }}
                        >
                          <span>Token</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("NFT");
                            onSelectFilter("NFT");
                          }}
                        >
                          <span>NFT</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("Token + NFT");
                            onSelectFilter("Token + NFT");
                          }}
                        >
                          <span>Token + NFT</span>
                        </li>
                      </ul>
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
  );
};

export default EarnHero;
