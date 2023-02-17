import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import mobileArrow from "../../assets/navbarAssets/mobileArrow.svg";
import xMark from "../../assets/navbarAssets/xMark.svg";
import { NavLink } from "react-router-dom";

const MobileNavbar = ({ handleSignUp }) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");

  useEffect(() => {
    if (openNavbar === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNavbar]);

  return (
    <>
      <div
        className="mobile-navbar d-flex d-lg-none p-3 align-items-center justify-content-between"
        id="mobileNavbar"
      >
        <NavLink to="/">
        <img src={metaverse} alt="metaverse" width={126} /></NavLink>
        {openNavbar === false ? (
          <div className="linear-border" onClick={() => setOpenNavbar(true)}>
            <button
              className="btn filled-btn px-4"
              style={{ clipPath: "none" }}
              id="hamburgermenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        ) : (
          <img
            src={xMark}
            alt="x mark"
            style={{ position: "relative", right: "18px" }}
            onClick={() => setOpenNavbar(false)}
          />
        )}
      </div>
      <div
        className={`mobile-menu ${
          openNavbar && "mobile-menu-open"
        } d-flex d-lg-none p-3 flex-column gap-3`}
        id="bgmenu"
      >
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/explorer"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Explore</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/land"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Land</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/build"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Build</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/roadmap"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Roadmap</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/news"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">News</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center gap-3">
          <div className="linear-border">
            <button
                className="btn outline-btn px-5"
                onClick={()=>{setOpenNavbar(false); handleSignUp();}}
            >
              Account
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
