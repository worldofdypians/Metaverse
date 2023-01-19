import React, { useState } from "react";
import PropTypes from "prop-types";
import "./_fullScreenMainHero.scss";
// import banner_meta from "../../../../../assets/Home/banner_meta.png";

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
      {/*{showVideoModal && <div className="modal-backdrop fade show"></div>}*/}
      {/*<div className={["modal fade", showVideoModal ? "show d-block" : ""].join(' ')} role="dialog" aria-hidden="true" style={{top: '100px'}}>*/}
      {/*    <div className="modal-dialog" role="document">*/}
      {/*        <div className="modal-content">*/}
      {/*            <div className="modal-header">*/}
      {/*                <button onClick={() => setShowVideoModal(false)} type="button" className="close" dataDismiss="modal" ariaLabel="Close">*/}
      {/*                    <img src={require('../../../../../assets/General/close-icon.svg').default} />*/}
      {/*                </button>*/}
      {/*            </div>*/}
      {/*            <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>*/}
      {/*            */}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}

      <div className="container-fluid">
        <div className="row align-items-center position-relative">
          <img
            onClick={player}
            className="play-icon"
            src={require("../../../assets/General/play-icon-filled2.png")}
            style={showVideoModal ? { display: "none" } : { display: "block" }}
          />
          <div className="col-12 px-0">
            {/*<img src={require('../../../../../assets/Nft/' + image)}*/}
            {/*    className="main-hero-graphics graphics"*/}
            {/*    alt="phone-graphics" />*/}
            <video
              preload="auto"
              poster={require("../../../assets/Nft/" + image)}
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
                  src={
                    require("../../../assets/General/ArrowIcons/scroll-arrows.svg")
                      .default
                  }
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
