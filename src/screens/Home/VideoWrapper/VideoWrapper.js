import React from "react";
import "./_videowrapper.scss";
// import downloadIcon from "../../../assets/downloadIcon.svg";

const VideoWrapper = ({ handleRegister }) => {
  return (
    <div className="video-wrapper flex-column gap-5 d-flex align-items-center justify-content-around justify-content-lg-center">
      <div className="position-absolute d-flex flex-column gap-2 align-items-center">
        {/* <h1
          className="video-main-title font-organetto"
          style={{ width: "60%" }}
        >
          Explore the world of dypians
        </h1> */}
        <div
          className="linear-border"
          style={{ width: "fit-content", zIndex: 5, position: "relative" }}
        >
          <button
            className="btn filled-btn px-5 d-flex align-items-center gap-2"
            onClick={handleRegister}
          >
            Join WhiteList
            {/* <img src={downloadIcon} alt="download icon" /> */}
          </button>
        </div>
      </div>
      <video
        preload="auto"
        className="d-none d-lg-flex d-xl-flex elementor-video"
        src="https://dypmeta.s3.us-east-2.amazonaws.com/dypius.mov"
        autoPlay={true}
        loop={true}
        muted="muted"
        playsInline="true"
        controlsList="nodownload"
        style={{ maxWidth: "2400px", width: "100%" }}
      ></video>
      {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
    </div>
  );
};

export default VideoWrapper;
