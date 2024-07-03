import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../../Marketplace/components/BetaEventCardHome";
import dropdownIcon from "../assets/dropdownIcon.svg";

const EarnHero = () => {
  const dypProducts = [
    {
      link: "/earn",
      title: "Earn",
      desc: "Earn rewards by staking WOD tokens",
      class: "tokenEarnClass",
    },
    {
      link: "/bridge",
      title: "Bridge",
      desc: "Bridge your assets securely between chains",
      class: "tokenBridgeClass",
    },
    {
      link: "/governance",
      title: "Governance",
      desc: "Lorem ipsum governance something",
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
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
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

  const [filterTitle, setFilterTitle] = useState("Filter");

  const betaSlider = useRef(null);

  return (
    <div className="earn-mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h2 className="font-montserrat builders-title explorer-grid-title px-0">
                  <mark className="font-montserrat explore-tag pe-2">
                    World of Dypians
                  </mark>
                  Earn
                </h2>
                <span className="market-banner-desc font-montserrat text-start">
                  Maximize your rewards in the World of Dypians with our Earn
                  solutions. Make the most of your assets to earn additional
                  rewards. Start earning today!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacitywrapper position-relative bottom-0">
        <div className="d-flex flex-column gap-4 position-relative">
          <div className="custom-container m-auto p-0 ">
            <Slider {...settings} ref={betaSlider}>
              {dypProducts.slice(0, 4).map((item, index) => (
                <NavLink to={`${item.link}`}>
                  <BetaEventCardHome
                    data={item}
                    key={index}
                    isFrontPage={true}
                  />
                </NavLink>
              ))}
            </Slider>
          </div>
          <div className="d-flex flex-column mx-0 align-items-center justify-content-between gap-2 buy-items-all-wrapper py-2">
            <div className="container-fluid py-4 buy-wod-bg">
              <div className="custom-container p-0">
                <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
                  <div className="row w-100 mx-0 align-items-center justify-content-between">
                    <div className="dropdown filters-dropdown">
                      <button
                        className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
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
                            setFilterTitle("All pools");
                          }}
                        >
                          <span>All pools</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("Token");
                          }}
                        >
                          <span>Token</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("NFT");
                          }}
                        >
                          <span>NFT</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilterTitle("Token + NFT");
                          }}
                        >
                          <span>Token + NFT</span>
                        </li>
                      </ul>
                    </div>
                    <div className="tvl-earn-wrapper p-2">
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
