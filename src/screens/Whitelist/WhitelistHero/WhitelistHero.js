import React, { useState, useRef } from "react";
import "./_whitelisthero.scss";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";

const WhitelistHero = () => {

  const [activeRound, setActiveRound] = useState('seed')

  const betaSlider = useRef(null);

  const dummyBetaPassData2 = [
    {
      id: 'seed',
      title: "Seed Round",
      class: activeRound === 'seed' ? "seedClassActive": "seedClass", 
    },
    {
      id: 'private',
      title: "Private Round", 
      class: activeRound === 'private' ? "privateClassActive": "privateClass", 

    },
    {
      id: 'kol',
      title: "KOL Round",
      class: activeRound === 'kol' ? "kolClassActive": "kolClass", 
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
    autoplay: false,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
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
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <div className="whitelist-hero-wrapper  position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-center gap-4 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">
                  WOD Token release
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                  As a valued investor in World of Dypians, you can now claim
                  your tokens based on your initial investment. Claim your WOD
                  tokens and become part of the next chapter of web3 gaming.
                </span>
              </div>
            </div>
            <div
              className="opacitywrapper position-relative"
              style={{ width: "90%" }}
            >
              <Slider {...settings} ref={betaSlider}>
                {dummyBetaPassData2.slice(0, 4).map((item, index) => (
                  <div key={index} onClick={()=>{setActiveRound(item.id)}} >
                  <BetaEventCardHome
                    data={item}
                    isFrontPage={true}
                    addRatio={false}
                  />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitelistHero;
