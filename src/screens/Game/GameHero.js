import React, { useRef, useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";

import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import LandPopup from "../../components/PackagePopups/LandPopup";
import CawsPopup from "../../components/PackagePopups/CawsPopup";
import { NavLink, useNavigate } from "react-router-dom";
import BnbAIPopup from "../../components/PackagePopups/BnbAIPopup";
import MuseumAIPopup from "../../components/PackagePopups/MuseumAIPopup";

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
    // {
    //   state: "caws",
    //   title: "CAWS",
    //   desc: "AI-driven digital companions",
    //   class: "cawsClass",
    // },
  ];
  const html = document.querySelector("html");

  useEffect(() => {
    if (showPopup !== "") {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showPopup]);

  useEffect(() => {
    if (window.location.hash === "#land") {
      setShowPopup("land");
    }
  }, []);

  return (
    <>
      <div
        className="game-hero-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center mt-5 mt-lg-0 gap-5 position-relative"
        style={{ borderBottom: "none" }}
      >
        <div className="custom-container  mt-5 mt-lg-0">
          <div className="d-flex w-100 flex-column align-items-center gap-2 px-3 px-lg-0 position-relative game-hero-content-wrapper">
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
                src={
                  hoverState
                    ? "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                    : "https://cdn.worldofdypians.com/wod/epicblack.svg"
                }
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
              <div
                className={`aiClass event-card justify-content-end flex-column d-flex align-items-center position-relative`}
                // onClick={onOpenPopup}
                style={{
                  cursor: "pointer",
                  // aspectRatio: addRatio === false ? "" : "1.8/1",
                }}
              >
                <div className="ai-grid">
                <div className="ai-tab-wrapper" onClick={() => setShowPopup("bnbAi")}>
                    <img
                      src="https://cdn.worldofdypians.com/wod/bnbAi.png"
                      alt=""
                    />
                  </div>
                  
                  
                  <NavLink to={"/ai-agent"} className="ai-tab-wrapper">
                    <img
                      src="https://cdn.worldofdypians.com/wod/orynAi.png"
                      alt=""
                    />
                  </NavLink>
                  <div className="ai-tab-wrapper" onClick={() => setShowPopup("museumAi")}>
                    <img
                      src="https://cdn.worldofdypians.com/wod/museumAi.png"
                      alt=""
                    />
                  </div>
                  <div className="ai-tab-wrapper" onClick={() => setShowPopup("caws")}>
                    <img
                      src="https://cdn.worldofdypians.com/wod/cawsAi.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3 w-100 bottom-dark-wrapper bottom-dark-wrapper-position">
                  <div className="d-flex flex-column">
                    <h6 className="events-page-title-home mb-0">AI</h6>
                    <h6 className="events-page-desc-home mb-0">
                      AI-Driven Gameplay
                    </h6>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          {/* )} */}
        </div>
      </div>

      {showPopup === "land" && (
        <LandPopup
          onClosePopup={() => {
            setShowPopup("");
          }}
        />
      )}
      {showPopup === "bnbAi" && (
        <BnbAIPopup
          onClosePopup={() => {
            setShowPopup("");
          }}
        />
      )}
      {showPopup === "museumAi" && (
        <MuseumAIPopup
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
