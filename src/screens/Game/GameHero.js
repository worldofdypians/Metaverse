import React, { useRef, useState, useEffect } from "react";
import epicblack from "../../assets/epicblack.svg";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";
import MapPopup from "../../components/PackagePopups/MapPopup";
import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import LandPopup from "../../components/PackagePopups/LandPopup";
import CawsPopup from "../../components/PackagePopups/CawsPopup";
import { useNavigate } from "react-router-dom";

const GameHero = () => {
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const [showPopup, setshowPopup] = useState("");
  const navigate = useNavigate();

  var settings = {
    dots: false,
    arrows: false,
    // dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
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
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
    ],
  };
  const betaSlider = useRef(null);
  const windowSize = useWindowSize();
  const dummyBetaPassData2 = [
    {
      state: "map",
      title: "MAPS",
      desc: "Unique game world environments",
      class: "tokenClass",
    },
    {
      state: "land",
      title: "LAND",
      desc: "Own and develop virtual areas",
      class: "earnClass",
    },
    {
      state: "caws",
      title: "CAWS",
      desc: "AI-driven digital companions",
      class: "eventClass",
    },
  ];
  const html = document.querySelector("html");

  useEffect(() => {
    if (showPopup !== "") {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showPopup]);

  return (
    <>
      <div className="about-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center mt-5 mt-lg-0 gap-5 position-relative">
        <div className="custom-container  mt-5 mt-lg-0">
          <div className="d-flex w-100 flex-column align-items-center gap-2">
            <h2 className="font-montserrat main-hero-title  px-0">
              What is <br />
              World of Dypians?
            </h2>
            <p className="about-hero-desc">
              An action-packed multiplayer game where heroes come together to
              defend their planet against the Dark Lord's invasion. Choose from
              a variety of heroes, each with unique abilities, and join forces
              with other players to destroy the enemy's bases.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a
                className="stake-wod-btn px-4 py-1"
                href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                target="_blank"
              >
                <img
                  src={epicblack}
                  alt="icon"
                  className="epicgame2"
                  style={{ width: "auto", height: "30px" }}
                />{" "}
                Download
              </a>
            </div>
          </div>
          {/* {windowSize.width > 992 && ( */}
          <div className="opacitywrapper custom-container custom-wrapper">
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.map((item, index) => (
                <div
                  onClick={() => {
                    item.state === "map"
                      ? navigate("/map")
                      : setshowPopup(item.state);
                  }}
                   key={index}
                >
                  <BetaEventCardHome
                    data={item}
                    isFrontPage={true}
                  />
                </div>
              ))}
            </Slider>
          </div>
          {/* )} */}
        </div>
      </div>
      {showPopup === "map" && (
        <MapPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}
      {showPopup === "land" && (
        <LandPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}

      {showPopup === "caws" && (
        <CawsPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}
    </>
  );
};

export default GameHero;
