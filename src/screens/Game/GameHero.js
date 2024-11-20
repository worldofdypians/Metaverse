import React, { useRef, useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";
import MapPopup from "../../components/PackagePopups/MapPopup";
import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import LandPopup from "../../components/PackagePopups/LandPopup";
import CawsPopup from "../../components/PackagePopups/CawsPopup";
import { useNavigate } from "react-router-dom";
import epicwhite from "../../assets/epicwhite.svg";
import epicblack from "../../assets/epicblack.svg";

const GameHero = ({ showPopup, setShowPopup }) => {
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const [hoverState, setHoverState] = useState(false);
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
          speed: 300,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          speed: 300,
          autoplay: true,
          autoplaySpeed: 2000,
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
      class: "mapClass",
    },
    {
      state: "land",
      title: "LAND",
      desc: "Own and develop virtual areas",
      class: "landClass",
    },
    {
      state: "caws",
      title: "CAWS",
      desc: "AI-driven digital companions",
      class: "cawsClass",
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

  console.log(showPopup);

  return (
    <>
      <div
        className="game-hero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center mt-5 mt-lg-0 gap-5 position-relative"
        style={{ borderBottom: "none" }}
      >
        <div className="custom-container  mt-5 mt-lg-0">
          <div className="d-flex w-100 flex-column align-items-center gap-2 px-3 px-lg-0">
            <h2 className="font-montserrat main-hero-title text-center  px-0">
              {/* What is <br />
              World of Dypians? */}
              The Biggest Metaverse
              <br />
              Ever Built
            </h2>
            <p className="about-hero-desc">
              An action-packed multiplayer game where heroes come together to
              defend their planet against the Dark Lord's invasion. Choose from
              a variety of heroes, each with unique abilities, and join forces
              with other players to destroy the enemy's bases.
            </p>
            <a
              className="game-event-download py-2 px-5 d-flex align-items-center gap-2"
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              href="https://store.epicgames.com/p/world-of-dypians-2e0694"
              target="_blank"
            >
              <img
                src={hoverState ? epicwhite : epicblack}
                alt="icon"
                className="epicgame2"
              />
              Download
            </a>
          </div>
          {/* {windowSize.width > 992 && ( */}
          <div className="opacitywrapper custom-container custom-wrapper">
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.map((item, index) => (
                <div
                  onClick={() => {
                    item.state === "map"
                      ? navigate("/map")
                      : setShowPopup(item.state);
                  }}
                  key={index}
                >
                  <BetaEventCardHome data={item} isFrontPage={true} />
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
            setShowPopup("");
          }}
        />
      )}
      {showPopup === "land" && (
        <LandPopup
          onClosePopup={() => {
            setShowPopup("");
          }}
        />
      )}

      {showPopup === "caws" && (
        <CawsPopup
          onClosePopup={() => {
            setShowPopup("");
          }}
        />
      )}
    </>
  );
};

export default GameHero;
