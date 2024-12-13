import React, { useState } from "react";
import PropTypes from "prop-types";
import "./_fullScreenMainHero.scss";


const FullScreenMainHero = ({ image, hasScroll }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const scrollDown = () => {
    window.scrollTo({
      top: document.getElementById("full-screen-main-hero").offsetHeight,
      behavior: "smooth",
    });
  };

  const url = showVideoModal
    ? `https://www.youtube.com/embed/HTN0kqtoaXs?autoplay=1`
    : `https://www.youtube.com/embed/HTN0kqtoaXs`;

  const player = () => {
    setShowVideoModal(true);
    let video = document.querySelector("video");

    video.play();

    video.addEventListener("ended", function () {
      video.load();
      setShowVideoModal(false);
    });
  };

  return (
    <div className="full-screen-main-hero" id="full-screen-main-hero">
    

      <div className="container-fluid">
        <div className="row align-items-center position-relative">
          <img
            onClick={player}
            className="play-icon"
            src={"https://cdn.worldofdypians.com/wod/play-icon-filled2.png"}
            style={showVideoModal ? { display: "none" } : { display: "block" }}
          />
          <div className="col-12 px-0">
            
            {/*    className="main-hero-graphics graphics"*/}
            {/*    alt="phone-graphics" />*/}
            <video
              preload="auto"
              poster={require("../../../assets/Nft/nft-main-image2.jpg")}
              className="main-hero-graphics graphics elementor-video"
              src="https://d44ym67kindby.cloudfront.net/dypmeta2.mp4"
              autoPlay=""
              loop=""
              muted="muted"
              playsInline={true}
              onClick={player}
              controlsList="nodownload"
            ></video>
          </div>
          {hasScroll && (
            <div className="scrolling-element d-flex align-items-end justify-content-center">
              <button onClick={scrollDown}>
                <img
                  src={"https://cdn.worldofdypians.com/wod/scroll-arrows.svg"}
                  className="img-fluid"
                  alt="phone-graphics"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
FullScreenMainHero.propTypes = {
  image: PropTypes.string,
  hasScroll: PropTypes.bool,
};
export default FullScreenMainHero;
