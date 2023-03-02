import React, { useEffect, useState } from "react";
import "./_videowrapper.scss";
import sysReq from "../../../assets/sysReq.svg";
import xMark from "../../../assets/navbarAssets/xMark.svg";
import OutsideClickHandler from "react-outside-click-handler";
import downloadIcon from "../../../assets/downloadIcon.svg";
import { NavLink } from "react-router-dom";
import LeaderBoard from '../../../components/LeaderBoard/LeaderBoard'

const VideoWrapper = ({ handleRegister, handleDownload }) => {
  const [modal, setModal] = useState(false);

  const reqmodal = document.querySelector("#reqmodal");
  const html = document.querySelector("html");

  useEffect(() => {
    if (modal === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [modal]);

  return (
    <>
      <div className="video-wrapper">
        <div className="row leaderboard-bg gap-4 gap-lg-0" style={{minHeight: '90vh'}}>
          
        <div className="col-12 col-lg-8 video-diagonal">

        <div className="d-flex download-buttons-wrapper flex-column gap-4 align-items-center">
          <div className="row m-0 gap-5 align-items-center justify-content-center">
        
            <NavLink to="join-beta"
              className="pink-linear-border"
              style={{ width: "fit-content", zIndex: 5, position: "relative", textDecoration: 'none' }}
            >
              <button
                className="btn outline-btn px-5 d-flex align-items-center gap-2"
                // onClick={handleRegister}
              >
                Join Beta
              </button>
            </NavLink>
            <div 
              className="linear-border"
              style={{ width: "fit-content", zIndex: 5, position: "relative", textDecoration: 'none' }}
            >
              <button
                onClick={handleDownload}
                className="btn filled-btn px-5 d-flex align-items-center gap-2"
              >
                Download
                <img src={downloadIcon} alt="download icon" />
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src={sysReq} alt="system requirements" />
            <span className="sys-req" onClick={() => setModal(true)}>
              System requirements
            </span>
          </div>
        </div>
          <video
          preload="auto"
          className="d-none d-lg-flex d-xl-flex elementor-video"
          src="https://dypmeta.s3.us-east-2.amazonaws.com/dypius.mov"
          autoPlay={true}
          loop={true}
          muted="muted"
          playsInline={true}
          controlsList="nodownload"
          style={{ maxWidth: "2400px", width: "100%", height: '100%', objectFit: 'cover' }}
        ></video>
          </div>
          <div className="col-12 col-lg-4  d-flex align-items-center justify-content-center justify-content-lg-start">
          <LeaderBoard />
          </div>
         
        </div>
       
       
        {/* <img src={buttonBorder} alt="button-border" className="video-button-border" /> */}
      </div>
      {modal === true ? (
        <OutsideClickHandler onOutsideClick={() => setModal(false)}>
          <div className="system-requirements-modal p-3" id="reqmodal">
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="sys-req-title font-organetto">System</h6>
                <h6
                  className="sys-req-title font-organetto mb-3"
                  style={{ color: "#8c56ff" }}
                >
                  Requirements
                </h6>
              </div>
              <img
                src={xMark}
                alt="x mark"
                style={{ cursor: "pointer" }}
                onClick={() => setModal(false)}
              />
            </div>

            <hr className="requirements-divider" />
            <div className="overall-requirements">
              <h6 className="requirements-title">World of Dypians</h6>
              <p className="requirements-content">
                A unique digital world where players can explore through endless
                maps hunting for rewards, special items and digital currency.
                The game features the main character and a cat (NFT) which will
                begin the journey to explore different lands together. World of
                Dypians is a game where players continuously shape the game and
                capture value from their achievements.
              </p>
              <h6 className="requirements-title">
                World of Dypians Minimum System Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X
                </li>
                <li className="requirements-content">Memory: 8 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4
                  GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 12 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
              <hr className="requirements-divider" />
              <h6 className="requirements-title">
                World of Dypians Recommended Requirements
              </h6>
              <ul>
                <li className="requirements-content">
                  Requires a 64-bit processor and operating system
                </li>
                <li className="requirements-content">OS: Windows 10/11</li>
                <li className="requirements-content">
                  Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X
                </li>
                <li className="requirements-content">Memory: 12 GB RAM</li>
                <li className="requirements-content">
                  Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA
                  56 8 GB
                </li>
                <li className="requirements-content">DirectX: Version 12</li>
                <li className="requirements-content">
                  Storage: 20 GB available space
                </li>
                <li className="requirements-content">
                  Sound Card: Windows Compatible Audio Device
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center justify-content-center py-3">
              <h6 className="close-modal" onClick={() => setModal(false)}>
                Close
              </h6>
            </div>
          </div>
        </OutsideClickHandler>
      ) : (
        <></>
      )}
    </>
  );
};

export default VideoWrapper;