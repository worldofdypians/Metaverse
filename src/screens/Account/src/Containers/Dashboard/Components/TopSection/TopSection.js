import React, { useRef } from "react";
import "./_topsection.scss";
import globe from "./assets/globe.png";
import leaderboardIcon from "./assets/leaderboardIcon.svg";
import star from "./assets/star.svg";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";
import dypIcon from "./assets/dypIcon.svg";
import iDypIcon from "./assets/iDypIcon.svg";
import chainsFlag from "./assets/chainsFlag2.svg";
import chainsIcon from "./assets/chainsIcon.svg";
import globalFlag from "./assets/globalFlag2.svg";
import globalIcon from "./assets/globalIcon2.png";
import landFlag from "./assets/landFlag2.svg";
import landIcon from "./assets/landIcon.svg";
import Slider from "react-slick";
import nextArrow from "../../../../../../Marketplace/assets/nextArrow1.svg";

const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="livein-timer" style={{ fontSize: "18px" }}>
      {days}d : {hours}h : {minutes}m
    </span>
  );
};

const TopSection = ({ onOpenLeaderboard, onOpenGlobalLeaderboard, onOpenGenesisLeaderboard }) => {
  let testDay = new Date("2024-05-20T11:00:00.000+02:00");

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: true,
    speed: 1000,
    // autoplay: true,
    // autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
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

  const slider = useRef(null);

  const dummyPromotions = [
    {
      item_type: "CAWS",
      item_id: 26,
      reward_type: "Stars",
      reward_amount: 25,
      expires: testDay,
      price: 0.532,
      link: "26/0xd06cf9e1189feab09c844c597abc3767bc12608c"
    },
    {
      item_type: "CAWS",
      item_id: 12,
      reward_type: "DYP",
      reward_amount: 300,
      expires: testDay,
      price: 0.637,
      link: "12/0xd06cf9e1189feab09c844c597abc3767bc12608c"
    },
    {
      item_type: "CAWS",
      item_id: 1897,
      reward_type: "iDYP",
      reward_amount: 3500,
      expires: testDay,
      price: 0.122,
      link: "1897/0xd06cf9e1189feab09c844c597abc3767bc12608c"
    },
  ];

  const firstNext = () => {
    slider.current.slickNext();
  };
  const firstPrev = () => {
    slider.current.slickPrev();
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-4">
        {/* <div className="diagonal-button-wrapper  d-flex align-items-center">
          <div
            className="first-diagonal-btn purple-container p-2  d-flex align-items-end"
            onClick={onOpenLeaderboard}
          >
            <div className="d-flex align-items-end gap-2">
              <img src={leaderboardIcon} width={60} height={60} alt="" />
              <h6 className="mb-0 leaderboard-title-span diagonal-title font-oxanium">
                Chains Leaderboard
              </h6>
            </div>
          </div>
          <div
            className="second-diagonal-btn purple-container p-2  d-flex justify-content-end"
            onClick={onOpenGlobalLeaderboard}
          >
            <div
              className="d-flex  align-items-start gap-2"
              style={{ height: "fit-content" }}
            >
              <h6 className="mb-0 leaderboard-title-span diagonal-title font-oxanium">
                Global Leaderboard
              </h6>
              <img src={star} width={60} height={60} alt="" />
            </div>
          </div>
        </div> */}
        <div className="d-flex flex-column">
          <h6 className="dashboard-title mb-4">
            Leaderboards
          </h6>
          <div className="leaderboard-flags-wrapper px-3 d-flex align-items-center justify-content-between" style={{height: "120px"}}>
            <div className="flag-wrapper" onClick={onOpenGlobalLeaderboard}>
              <img src={globalFlag} className="w-100" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Global</span>
                <img src={globalIcon} height={60} width={60} alt="" />
              </div>
            </div>
            <div className="flag-wrapper" onClick={onOpenLeaderboard}>
              <img src={chainsFlag} className="w-100" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Chains</span>
                <img src={chainsIcon} height={60} width={60} alt="" />
              </div>
            </div>
            <div className="flag-wrapper" onClick={onOpenGenesisLeaderboard}>
              <img src={landFlag} className="w-100" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Genesis</span>
                <img src={landIcon} height={60} width={60} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-8 ps-lg-0 mt-3 mt-lg-0">
        <div className="d-flex flex-column">
        <h6 className="dashboard-title mb-4">
            Today's Promotions
          </h6>
        <div className="purple-container promotion-container position-relative px-4 px-lg-5 py-3" style={{height: "120px"}}>
          <div
            className="prev-arrow-nft"
            onClick={firstPrev}
            style={{
              width: "30px",
              height: "30px",
              top: "0",
              left: "1%",
              bottom: "0",
              margin: "auto",
            }}
          >
            <img src={nextArrow} alt="" />
          </div>
          <div
            className="next-arrow-nft"
            onClick={firstNext}
            style={{
              width: "30px",
              height: "30px",
              top: "0",
              right: "1%",
              bottom: "0",
              margin: "auto",
            }}
          >
            <img
              src={nextArrow}
              alt="1"
              style={{
                top: "0",
                right: "1.5%",
                bottom: "0",
                margin: "auto",
              }}
            />
          </div>
          <Slider {...settings} ref={slider}>
            {dummyPromotions.map((item, index) => (
              <div
                key={index}
                className="d-flex flex-column promotion-height flex-lg-row gap-4 gap-lg-0 align-items-center justify-content-between w-100"
             >
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={`https://mint.dyp.finance/thumbs150/${item.item_id}.png`}
                    className="promotion-img"
                    alt=""
                  />
                  <div className="d-flex flex-column gap-2">
                    <span className="promotion-header">Today's Promotion:</span>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="promotion-item-title mb-0">
                        {item.item_type} #{item.item_id}
                      </h6>
                      <span className="promotion-item-price">0.532 ETH</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="promotion-header">Expires In:</span>

                  <Countdown date={item.expires} renderer={renderer} />
                </div>
                <div className="d-flex flex-column align-items-center align-items-lg-end gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="promotion-header">
                      Buy now and recieve:
                    </span>
                    <div className="d-flex align-items-center gap-1">
                      <img
                        src={
                          item.reward_type === "Stars"
                            ? star
                            : item.reward_type === "DYP"
                            ? dypIcon
                            : iDypIcon
                        }
                        height={15}
                        width={15}
                        alt=""
                      />
                      <span
                        className="promotion-header"
                        style={{ color: "rgba(244, 226, 123, 1)" }}
                      >
                        {item.reward_amount} {item.reward_type}
                      </span>
                    </div>
                  </div>
                  <NavLink
                    to={`/marketplace/nft/${item.link}`}
                    className={`btn purple-btn2 px-4 d-flex gap-2 align-items-center`}
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
