import React, { useRef, useState } from "react";
// import Slider from "react-slick";
// import { NavLink } from "react-router-dom";
// import BetaEventCardHome from "../../../Marketplace/components/BetaEventCardHome";
// import dropdownIcon from "../assets/dropdownIcon.svg";
import "../../../Wod/Token/MainHero/_mainhero.scss";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
// import listIcon from "../assets/listIcon.svg";
// import tableIcon from "../assets/tableIcon.svg";
// import tableIconActive from "../assets/tableIconActive.svg";
// import listIconActive from "../assets/listIconActive.svg";

const EarnHero = ({
  onSelectFilter,
  onSelectViewStyle,
  onViewPastPools,
  onViewStakedOnlyPools,
}) => {
  // const dypProducts = [
  //   {
  //     // link: "/earn",
  //     title: "TOKEN",
  //     desc: "Boost rewards with WOD tokens",
  //     class: "tokenEarnClass",
  //   },
  //   {
  //     // link: "/bridge",
  //     title: "NFT",
  //     desc: "Utilize your NFTs for unique benefits",
  //     class: "tokenBridgeClass",
  //   },
  //   {
  //     // link: "/governance",
  //     title: "TOKEN & NFT",
  //     desc: "Combine tokens and NFTs for maximum rewards",
  //     class: "tokenGovernanceClass",
  //   },
  // ];

  // var settings = {
  //   dots: false,
  //   arrows: false,
  //   dotsClass: "button__bar",
  //   infinite: false,
  //   speed: 300,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   draggable: false,
  //   responsive: [
  //     {
  //       breakpoint: 1600,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 1500,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 1400,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 1050,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 0,
  //       },
  //     },
  //   ],
  // };

  // const betaSlider = useRef(null);
  const tvlUsd = localStorage.getItem("tvl");

  return (
    <div className="earn-hero-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 pt-5 pt-lg-0 mt-lg-0">
        <div className="d-flex flex-column w-100 gap-5">
          <div className="row mx-0 align-items-center justify-content-center gap-2">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">Earn</h6>
                <span className="market-banner-desc font-montserrat text-center">
                  Maximize your rewards in the World of Dypians with our Earn
                  solutions. Make the most of your assets to earn additional
                  rewards. Start earning today!
                </span>
                <div className="tvl-earn-wrapper py-2 px-4">
                  <div className="d-flex align-items-center gap-2">
                    <span className="tvl-earn-title">TVL</span>
                    <span className="tvl-earn-amount">
                      ${getFormattedNumber(tvlUsd)}
                    </span>
                  </div>
                </div>
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
    </div>
  );
};

export default EarnHero;
