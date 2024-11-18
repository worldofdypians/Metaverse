import React, { useRef } from "react";
import "./_mainhero.scss";
import BetaEventCardHome from "../../../Marketplace/components/BetaEventCardHome";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import kucoin from "../../../../assets/wodAssets/buyWod/kuCoin.png";
import pancake from "../../../../assets/wodAssets/buyWod/pancake.png"; 
import mexc from "../../../../assets/wodAssets/buyWod/mexc.png";

import gateio from "../../../../assets/wodAssets/buyWod/gateio.png";
import newToken from "../../../../assets/wodAssets/newToken.svg";

const MainHero = () => {
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
      desc: "Easily bridge WOD tokens across networks",
      class: "tokenBridgeClass",
    },
    {
      link: "/governance",
      title: "Governance",
      desc: "Participate in governance with WOD tokens",
      class: "tokenGovernanceClass",
    },
  ];

  var settings = {
    dots: true,
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

  var settings2 = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
    ],
  };

  const betaSlider = useRef(null);
  const betaSlider2 = useRef(null);

  return (
    <div className="mainhero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-center gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h4 className="main-hero-title font-montserrat text-start">
                WOD Token
                </h4>
                <span className="market-banner-desc font-montserrat text-start">
                WOD is a utility token that provides the foundation for the
                  World of Dypians ecosystem within a decentralized platform
                  that focuses on scalability, security, and global adoption.
                </span>
                <div className="d-flex align-items-center gap-3">
                  <button className="stake-wod-btn px-4 py-2">Stake WOD</button>
                  <button className="buy-wod-btn px-4 py-2">Buy WOD</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0">
              <img src={newToken} className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="opacitywrapper position-relative bottom-0">
        <div className="d-flex flex-column gap-4 position-relative">
          <div className="custom-container m-auto  ">
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
              <div className="custom-container ">
                <div className="d-flex flex-column  gap-4">
                  <h4
                    className="main-hero-title font-montserrat text-center"
                    style={{ width: "fit-content" }}
                  >
                    Buy{" "}
                    <mark className="font-montserrat main-hero-title explore-tag pe-2">
                    WOD
                    </mark>
                  </h4>
                  <div className="row w-100 mx-0 align-items-center justify-content-between">
                    <Slider {...settings2} ref={betaSlider2} className="px-0">
                      <div className="w-100 buy-outertoken-wrapper rounded">
                        <div className="w-100 buy-token-wrapper d-flex justify-content-center p-3 rounded">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={kucoin}
                              alt=""
                              className="buy-item-logo"
                            />
                            <h4 className="m-0 buy-item-title">KuCoin</h4>
                          </div>
                        </div>
                      </div>
                      <div className="w-100 buy-outertoken-wrapper rounded">
                        <div className="w-100 buy-token-wrapper d-flex justify-content-center p-3 rounded">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={gateio}
                              alt=""
                              className="buy-item-logo"
                            />
                            <h4 className="m-0 buy-item-title">Gate.io</h4>
                          </div>
                        </div>
                      </div>
                      <div className="w-100 buy-outertoken-wrapper rounded">
                        <div className="w-100 buy-token-wrapper d-flex justify-content-center p-3 rounded">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={mexc}
                              alt=""
                              className="buy-item-logo"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-100 buy-outertoken-wrapper rounded">
                        <div className="w-100 buy-token-wrapper d-flex justify-content-center p-3 rounded">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={pancake}
                              alt=""
                              className="buy-item-logo"
                            />
                            <h4 className="m-0 buy-item-title">PancakeSwap</h4>
                          </div>
                        </div>
                      </div>
                    </Slider>
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

export default MainHero;
