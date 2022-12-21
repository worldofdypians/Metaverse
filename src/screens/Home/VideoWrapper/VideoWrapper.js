import React from "react";
import "./_videowrapper.scss";
import downloadIcon from "../../../assets/downloadIcon.svg";
import buttonBorder from '../../../assets/buttonBorder.svg'


const VideoWrapper = () => {
  return (
    <div className="video-wrapper flex-column gap-5 d-flex align-items-center justify-content-around justify-content-lg-center">
      <h1 className="video-main-title font-organetto w-100">
        The most exciting game of all time
      </h1>
      {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
      <div className="linear-border">
        <button className="btn filled-btn px-5 d-flex align-items-center gap-2">
          Download
          <img src={downloadIcon} alt="download icon" />
        </button>
      </div>
    </div>
  );
};

export default VideoWrapper;
