import React, { useState, useRef, useEffect } from "react";
import "./_whitelisthero.scss";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import BetaEventCardHome from "../../Marketplace/components/BetaEventCardHome";

const WhitelistHero = ({ onSelectRound, type }) => {
  const [activeRound, setActiveRound] = useState(
    type === "pool" || type === "pool2" ? "otc" : "seed"
  );

  const betaSlider = useRef(null);

  const dummyBetaPassData2 = [
    {
      id: "seed",
      title: "Seed Round",
      class: activeRound === "seed" ? "seedClassActive" : "seedClass",
      tokenPrice: "0.0250",
      cliff: "6 Months",
      cliffInTimestamp: "1748357606000",
      vesting: "19 Months",
    },
    {
      id: "private",
      title: "Private Round",
      class: activeRound === "private" ? "privateClassActive" : "privateClass",
      tokenPrice: "0.0325",
      cliff: "3 Months",
      cliffInTimestamp: "1740668006000",
      vesting: "16 Months",
    },
    {
      id: "kol",
      title: "KOL Round",
      class: activeRound === "kol" ? "kolClassActive" : "kolClass",
      tokenPrice: "0.03825",
      cliff: "1 Month",
      cliffInTimestamp: "1735311206000",
      vesting: "8 Months",
    },
    {
      id: "advisors",
      title: "Advisors",
      class:
        activeRound === "advisors" ? "advisorsClassActive" : "advisorsClass",
      // tokenPrice: "0.03825",
      cliff: "9 Month",
      cliffInTimestamp: "1756304809000",
      vesting: "30 Months",
    },
  ];
  const otc_data = [
    {
      id: type === "pool2" ? "otc2" : "otc",
      title: "OTC Round",
      class: activeRound === "otc" ? "seedClassActive" : "seedClass",
      // tokenPrice: "0.1",
      // cliff: "6 Months",
      cliffInTimestamp: "1751308469000",
      vesting: type === "pool2" ? "5 Months" : "6 Months",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: type === "pool" || type === "pool2" ? 1 : 4,
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
          slidesToShow: type === "pool" || type === "pool2" ? 1 : 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: type === "pool" || type === "pool2" ? 1 : 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: type === "pool" || type === "pool2" ? 1 : 3,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: type === "pool" || type === "pool2" ? false : true,
          autoplay: type === "pool" || type === "pool2" ? false : true,
          dots: type === "pool" || type === "pool2" ? false : true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: type === "pool" || type === "pool2" ? 1 : 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: type === "pool" || type === "pool2" ? false : true,
          autoplay: type === "pool" || type === "pool2" ? false : true,
          dots: type === "pool" || type === "pool2" ? false : true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: type === "pool" || type === "pool2" ? false : true,
          autoplay: type === "pool" || type === "pool2" ? false : true,
          dots: type === "pool" || type === "pool2" ? false : true,
        },
      },
    ],
  };

  useEffect(() => {
    onSelectRound(
      type === "pool" || type === "pool2" ? otc_data[0] : dummyBetaPassData2[0]
    );
  }, [type]);

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
              className={` ${
                type === "pool" || type === "pool2"
                  ? "otc-wrapper"
                  : "col-lg-10"
              } opacitywrapper-release position-relative`}
            >
              <Slider {...settings} ref={betaSlider}>
                {(type === "pool" || type === "pool2"
                  ? otc_data
                  : dummyBetaPassData2
                ).map((item, index) => (
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

export default WhitelistHero;
