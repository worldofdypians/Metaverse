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
import criticalHit from "./assets/criticalHit.webp";
import criticalHit2 from "./assets/criticalHit.jpg";

import genesisLand from "./assets/genesisLand.webp";
import genesisLand2 from "./assets/genesisLand.jpg";

import multiversAdMobile from "./assets/multiversAdMobile.png";
import premiumAdMobile from "./assets/premiumAdMobile.png";
import criticalHitMobile from "./assets/criticalHitMobile.jpg";
import genesisLandMobile from "./assets/genesisLandMobile.webp";
import goldenAd from "./assets/goldenAd.webp";
import goldenAd2 from "./assets/goldenAd.png";

import goldenAdMobile from "./assets/goldenAdMobile.png";
import dragonAd from "./assets/dragonAd.webp";
import dragonAd2 from "./assets/dragonAd.png";

import dragonAdMobile from "./assets/dragonAdMobile.png";
import nextArrow from "../../../../../../Marketplace/assets/nextArrow1.svg";
import useWindowSize from "../../../../Utils.js/hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import circleArrow from "./assets/circleArrow.svg";
import dashboardStar from "./assets/dashboardStar.svg";
import premiumBadge from "../../../../Components/LeaderBoard/assets/premiumBadge.png";
import goldenBadge from "../../../../Components/LeaderBoard/assets/goldenPassBadge.png";
import getFormattedNumber from "../../../../Utils.js/hooks/get-formatted-number";

const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="livein-timer2 fw-normal">
      {days}D : {hours}H : {minutes}M
    </span>
  );
};

const TopSection = ({
  onOpenLeaderboard,
  onOpenGlobalLeaderboard,
  onOpenGenesisLeaderboard,
  handleShowPopup,
  isPremium,
  availableTime,
  userDataStar,
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
    // { title: "multiversx", image: multiversAd, mobileImage: multiversAdMobile },
    {
      title: "critical-hit",
      image: criticalHit,
      image2: criticalHit2,

      mobileImage: criticalHitMobile,
    },
    {
      title: "land",
      image: genesisLand,
      image2: genesisLand2,
      mobileImage: genesisLandMobile,
    },
    // {
    //   title: "premium",
    //   image: premiumAd,
    //   image2: premiumAd,
    //   mobileImage: premiumAdMobile,
    // },
    {
      title: "dragon",
      image: dragonAd,
      image2: dragonAd2,
      mobileImage: dragonAdMobile,
    },
    {
      title: "goldenPass",
      image: goldenAd,
      image2: goldenAd2,
      mobileImage: goldenAdMobile,
    },
  ];

  const filteredSliderContent = slidercontent.filter((item) => {
    if (isPremium) {
      return item.title !== "premium";
    } else {
      return item.title !== "goldenPass";
    }
  });

  return (
    <div className="row align-items-end mx-0">
      <div className="col-12 ps-lg-0 col-lg-4 pe-lg-3">
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
              <img src={globalFlag} className="flag-img" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Global</span>
                <img src={globalIcon} height={50} width={50} alt="" />
              </div>
            </div>
            <div
              className="flag-wrapper chains-flag"
              onClick={onOpenLeaderboard}
            >
              <img src={chainsFlag} className="flag-img" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Chains</span>
                <img src={chainsIcon} height={50} width={50} alt="" />
              </div>
            </div>
            <div
              className="flag-wrapper land-flag"
              onClick={onOpenGenesisLeaderboard}
            >
              <img src={landFlag} className="flag-img" alt="" />
              <div className="flag-content d-flex flex-column gap-2 align-items-center">
                <span className="flag-title">Genesis</span>
                <img src={landIcon} height={50} width={50} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {windowSize.width && windowSize.width > 1450 && (
        <div className="col-12 col-lg-4 ps-lg-0 mt-3 mt-lg-0">
          <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-2">
            <div
              className="dashboard-stars-wrapper w-100 p-2"
              style={{ height: "120px" }}
              onClick={onOpenGlobalLeaderboard}
            >
              <div className="d-flex flex-column h-100 justify-content-between">
                <div className="d-flex flex-column">
                  <span className="dashboard-main-white-text">
                    {getFormattedNumber(userDataStar ?? 0, 0)}
                  </span>
                  <span className="dashboard-collected-stars-text">
                    Collected Stars
                  </span>
                </div>
                <div className="d-flex justify-content-start">
                  <img src={circleArrow} alt="" />
                </div>
              </div>
              <img
                src={dashboardStar}
                alt=""
                className="dashboardimg"
                style={{ width: 41, height: 41 }}
              />
            </div>
            <div
              className="dashboard-premium-wrapper w-100 p-2"
              style={{ height: "120px" }}
            >
              <NavLink to="/account#premium">
                <div className="d-flex flex-column h-100 justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="dashboard-main-white-text">
                      Extra Stars
                    </span>
                    <span
                      className="dashboard-collected-stars-text"
                      style={{ color: "#FFBA4E" }}
                    >
                      {!isPremium ? "Premium" : "Activated"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-start">
                    {!isPremium ? (
                      <img src={circleArrow} alt="" />
                    ) : (
                      <button
                        className="activate-btn px-2 py-1"
                        style={{
                          background: "#AC1186",
                        }}
                      >
                        Lifetime
                      </button>
                    )}
                  </div>
                </div>
              </NavLink>
              <img
                src={premiumBadge}
                alt=""
                className="dashboardimg"
                style={{ width: 53, height: 50 }}
              />
            </div>
            <div
              className="dashboard-goldenpass-wrapper w-100 p-2"
              style={{ height: "120px" }}
            >
              <NavLink to="/marketplace/events/golden-pass">
                <div className="d-flex flex-column h-100 justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="dashboard-main-white-text">
                      Extra Rewards
                    </span>
                    <span
                      className="dashboard-collected-stars-text"
                      style={{ color: !availableTime ? "#F3BF09" : "#00D1B5" }}
                    >
                      {!availableTime ? "Golden Pass" : "Activated"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-start">
                    {!availableTime ? (
                      <img src={circleArrow} alt="" />
                    ) : (
                      <Countdown
                        date={Number(availableTime) * 1000}
                        renderer={renderer}
                      />
                    )}
                  </div>
                </div>
              </NavLink>{" "}
              <img
                src={goldenBadge}
                alt=""
                className="dashboardimg"
                style={{ width: 50, height: 44 }}
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={` ${
          windowSize.width && windowSize.width > 1450 && "col-lg-4"
        }  ${
          windowSize.width && windowSize.width <= 1450 && "col-lg-8"
        } col-12  ps-lg-0 pe-lg-0 mt-3 mt-lg-0`}
      >
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
                    src={
                      windowSize.width && windowSize.width > 1450
                        ? item.image
                        : windowSize.width &&
                          windowSize.width <= 1450 &&
                          windowSize.width > 786
                        ? item.image2
                        : windowSize.width <= 786
                        ? item.mobileImage
                        : item.image2
                    }
                    className="advertisment-img"
                    alt=""
                    onClick={() => {
                      item.title === "goldenPass"
                        ? navigate("/marketplace/events/golden-pass")
                        : item.title === "dragon"
                        ? navigate("/marketplace/events/dragon-ruins")
                        : item.title === "critical-hit"
                        ? navigate("/marketplace/events/critical-hit")
                        : item.title === "land"
                        ? navigate("/marketplace/land")
                        : handleShowPopup(item.title);
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
      {windowSize.width && windowSize.width <= 1450 && (
        <div className="col-12 px-lg-0 mt-3">
          <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-2">
            <div
              className="dashboard-stars-wrapper w-100 p-2"
              style={{ height: "100px" }}
              onClick={onOpenGlobalLeaderboard}
            >
              <div className="d-flex flex-column h-100 justify-content-between">
                <div className="d-flex flex-column">
                  <span className="dashboard-main-white-text">
                    {getFormattedNumber(userDataStar ?? 0, 0)}
                  </span>
                  <span className="dashboard-collected-stars-text">
                    Collected Stars
                  </span>
                </div>
                <div className="d-flex justify-content-start">
                  <img src={circleArrow} alt="" />
                </div>
              </div>
              <img
                src={dashboardStar}
                alt=""
                className="dashboardimg"
                style={{ width: 41, height: 41 }}
              />
            </div>
            <div
              className="dashboard-premium-wrapper w-100 p-2"
              style={{ height: "100px" }}
            >
              <NavLink to="/account#premium">
                <div className="d-flex flex-column h-100 justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="dashboard-main-white-text">
                      Extra Stars
                    </span>
                    <span
                      className="dashboard-collected-stars-text"
                      style={{ color: "#FFBA4E" }}
                    >
                      {!isPremium ? "Premium" : "Activated"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-start">
                    {!isPremium ? (
                      <img src={circleArrow} alt="" />
                    ) : (
                      <button
                        className="activate-btn px-2 py-1"
                        style={{
                          background: "#AC1186",
                        }}
                      >
                        Lifetime
                      </button>
                    )}
                  </div>
                </div>
              </NavLink>
              <img
                src={premiumBadge}
                alt=""
                className="dashboardimg"
                style={{ width: 53, height: 50 }}
              />
            </div>
            <div
              className="dashboard-goldenpass-wrapper w-100 p-2"
              style={{ height: "100px" }}
            >
              <NavLink to="/marketplace/events/golden-pass">
                <div className="d-flex flex-column h-100 justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="dashboard-main-white-text">
                      Extra Rewards
                    </span>
                    <span
                      className="dashboard-collected-stars-text"
                      style={{ color: !availableTime ? "#F3BF09" : "#00D1B5" }}
                    >
                      {!availableTime ? "Golden Pass" : "Activated"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-start">
                    {!availableTime ? (
                      <img src={circleArrow} alt="" />
                    ) : (
                      <Countdown
                        date={Number(availableTime) * 1000}
                        renderer={renderer}
                      />
                    )}
                  </div>
                </div>
              </NavLink>{" "}
              <img
                src={goldenBadge}
                alt=""
                className="dashboardimg"
                style={{ width: 50, height: 44 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSection;
