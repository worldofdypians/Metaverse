import React, { useRef } from "react";
import "./_mainhero.scss";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import kucoin from "../assets/kuCoin.png";
import pancake from "../assets/pancake.png";
import coinbaseLogo from "../assets/coinbase.png";
import gateio from "../assets/gateio.png";
import newToken from "../assets/newToken.svg";

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
    <div className="px-3 mainhero-wrapper px-lg-5 d-flex flex-column justify-content-center align-items-center">
      <div className="custom-container w-100 mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h4 className="main-hero-title font-montserrat text-start">
                  $WoD Token
                </h4>
                <span className="market-banner-desc font-montserrat text-start">
                WOD is a utility token issued on BNB Chain, providing the foundation for the World of Dypians ecosystem, integrating DeFi, NFTs, Gaming, and AI all in one place.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
