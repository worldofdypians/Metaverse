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
import multiversAd from "./assets/multiversAd.png";
import premiumAd from "./assets/premiumAd.png";
import coreAd from "./assets/coreAd.png";
import victionAd from "./assets/victionAd.png";
import multiversAdMobile from "./assets/multiversAdMobile.png";
import premiumAdMobile from "./assets/premiumAdMobile.png";
import coreAdMobile from "./assets/coreAdMobile.png";
import victionAdMobile from "./assets/victionAdMobile.png";
import goldenAd from "./assets/goldenAd.png";
import goldenAdMobile from "./assets/goldenAdMobile.png";
import nextArrow from "../../../../../../Marketplace/assets/nextArrow1.svg";
import useWindowSize from "../../../../Utils.js/hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="livein-timer" style={{ fontSize: "18px" }}>
      {days}d : {hours}h : {minutes}m
    </span>
  );
};

const TopSection = ({
  onOpenLeaderboard,
  onOpenGlobalLeaderboard,
  onOpenGenesisLeaderboard,
  handleShowPopup,
  isPremium,
}) => {
  let testDay = new Date("2024-05-20T11:00:00.000+02:00");
  const navigate = useNavigate();

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: true,
    speed: 1000,
    fade: false,
    autoplay: true,
    autoplaySpeed: 3000,
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

  const windowSize = useWindowSize();

  const dummyPromotions = [
    {
      item_type: "CAWS",
      item_id: 26,
      reward_type: "Stars",
      reward_amount: 25,
      expires: testDay,
      price: 0.532,
      link: "26/0xd06cf9e1189feab09c844c597abc3767bc12608c",
    },
    {
      item_type: "CAWS",
      item_id: 12,
      reward_type: "DYP",
      reward_amount: 300,
      expires: testDay,
      price: 0.637,
      link: "12/0xd06cf9e1189feab09c844c597abc3767bc12608c",
    },
    {
      item_type: "CAWS",
      item_id: 1897,
      reward_type: "iDYP",
      reward_amount: 3500,
      expires: testDay,
      price: 0.122,
      link: "1897/0xd06cf9e1189feab09c844c597abc3767bc12608c",
    },
  ];

  const firstNext = () => {
    slider.current.slickNext();
  };
  const firstPrev = () => {
    slider.current.slickPrev();
  };

  const slidercontent = [
    { title: "multiversx", image: multiversAd, mobileImage: multiversAdMobile },
    { title: "core", image: coreAd, mobileImage: coreAdMobile },
    { title: "viction", image: victionAd, mobileImage: victionAdMobile },
    { title: "premium", image: premiumAd, mobileImage: premiumAdMobile },
    { title: "goldenPass", image: goldenAd, mobileImage: goldenAdMobile },
  ];

  const filteredSliderContent = slidercontent.filter((item) => {
    if (isPremium) {
      return item.title !== "premium";
    } else {
      return item.title !== "goldenPass";
    }
  });

  return (
    <div className="row align-items-end">
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
          {/* <h6
              className="new-bundle-title mb-5"
            >
              Leaderboards
            </h6> */}
          <div
            className="leaderboard-flags-wrapper px-3 d-flex align-items-center justify-content-between position-relative"
            style={{ height: "120px" }}
          >
            <h6 className="leaderboard-inner-title">Leaderboards</h6>
            <div
              className="flag-wrapper global-flag"
              onClick={onOpenGlobalLeaderboard}
            >
              <img src={globalFlag} className="w-100" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Global</span>
                <img src={globalIcon} height={60} width={60} alt="" />
              </div>
            </div>
            <div
              className="flag-wrapper chains-flag"
              onClick={onOpenLeaderboard}
            >
              <img src={chainsFlag} className="w-100" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Chains</span>
                <img src={chainsIcon} height={60} width={60} alt="" />
              </div>
            </div>
            <div
              className="flag-wrapper land-flag"
              onClick={onOpenGenesisLeaderboard}
            >
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
          <div
            className="promotion-container position-relative p-0"
            style={{ height: "120px" }}
          >
            {/* <div
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
          </div> */}
            <Slider {...settings} ref={slider}>
              {filteredSliderContent.map((item, index) => {
                return (
                  <img
                    src={windowSize.width > 786 ? item.image : item.mobileImage}
                    className="advertisment-img"
                    alt=""
                    onClick={() => {
                      item.title !== "goldenPass"
                        ? handleShowPopup(item.title)
                        : navigate("/marketplace/events/golden-pass");
                    }}
                    key={index}
                  />
                );
              })}
              {/* <img
                src={coreAd}
                className="advertisment-img"
                alt=""
                onClick={() => {
                  handleShowPopup("core");
                }}
              />
              <img
                src={victionAd}
                className="advertisment-img"
                alt=""
                onClick={() => {
                  handleShowPopup("viction");
                }}
              />
              <img
                src={premiumAd}
                className="advertisment-img"
                alt=""
                onClick={() => {
                  handleShowPopup("premium");
                }}
              />
              <img
                src={multiversAd}
                className="advertisment-img"
                alt=""
                onClick={() => {
                  handleShowPopup("multiversx");
                }}
              /> */}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
