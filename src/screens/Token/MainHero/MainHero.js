import React, { useRef } from "react";
import "./_mainhero.scss";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import kucoin from "../assets/kuCoin.png";
import pancake from "../assets/pancake.png";
import coinbaseLogo from "../assets/coinbase.png";
import gateio from "../assets/gateio.png";
import newToken from "../assets/newToken.svg";

const MainHero = ({scrollInto}) => {
  const launchpads = [
    {
      title: "poolz",
      logo: "poolz.svg",
      link: "https://www.poolz.finance/project-details/about/249",
    },
    {
      title: "Ordify",
      logo: "ordify.svg",
      link: "https://launch.ordify.world/projects/details/bnb/world-of-dypians",
    },
    {
      title: "WeWay",
      logo: "weway.svg",
      link: "https://wepad.io/project/world-of-dypians",
    },
    {
      title: "Finceptor",
      logo: "finceptor.svg",
      link: "https://finceptor.app/deals/sale/wod",
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
    <div className="px-3 mainhero-wrapper2 px-lg-5 d-flex flex-column justify-content-center align-items-center" >
      <div className="custom-container w-100  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-start">
                <h4 className="main-hero-title font-montserrat text-start">
                WOD Token
                </h4>
                <span className="market-banner-desc font-montserrat text-start">
                  WOD is a utility token issued on BNB Chain, providing the
                  foundation for the World of Dypians ecosystem, integrating
                  DeFi, NFTs, Gaming, and AI all in one place.
                </span>
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                  <button className="getpremium-btn px-3 py-2" onClick={()=>{scrollInto('tokenomics')}}>Tokenomics</button>
                  <button className="signinbtn2 px-3 py-2" onClick={()=>{scrollInto('backers&partners')}}>Backers & Partners</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0">
              <img src={newToken} className="w-100" alt="" />
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <h6 className="mb-0 investors-title">Launchpads</h6>
            <div className="investors-grid">
              {launchpads.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="investors-item py-2"
                  key={index}
                >
                  <img
                    src={require(`../Investors/assets/${item.logo}`)}
                    className="investors-img"
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
