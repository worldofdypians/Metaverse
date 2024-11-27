import React, { useState, useRef, useEffect } from "react";
import "./_releasehero.scss";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";

const ReleaseHero = ({ onSelectRound }) => {
  const [activeRound, setActiveRound] = useState("airdrop");

  const betaSlider = useRef(null);

  const dummyBetaPassData2 = [
    {
      id: "airdrop",
      title: "Campaign Airdrop",
      class: activeRound === "airdrop" ? "airdropClassActive" : "airdropClass",
    },
    {
      id: "ido",
      title: "Private",
      class: activeRound === "ido" ? "idoClassActive" : "idoClass",
      tokenPrice: "0.0325",
      vesting: "16 Months",
      cliff: "6 Months",

      
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 2,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: false,
          autoplay: false,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: false,
          autoplay: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
          infinite: true,
          autoplay: false,
        },
      },
    ],
  };

  useEffect(() => {
    onSelectRound(dummyBetaPassData2[0]);
  }, []);

  return (
    <div className="release-hero-wrapper  position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row flex-column mx-0 align-items-center justify-content-center gap-4 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">
                  WOD Token Claim
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                  Easily claim your airdropped WOD tokens from various campaigns
                  or retrieve tokens from your IDO investments across supported
                  launchpads.
                </span>
              </div>
            </div>
            <div
              className="opacitywrapper-release col-lg-6 position-relative"
       
            >
              <Slider {...settings} ref={betaSlider}>
                {dummyBetaPassData2.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveRound(item.id);
                      onSelectRound(item);
                    }}
                  >
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

export default ReleaseHero;
