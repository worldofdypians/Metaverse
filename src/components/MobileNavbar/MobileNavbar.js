import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import mobileArrow from "../../assets/navbarAssets/mobileArrow.svg";
import xMark from "../../assets/navbarAssets/xMark.svg";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from '../Header/assets/person.svg'

const MobileNavbar = ({ handleSignUp, handleRedirect,coinbase, avatar }) => {
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
          <img src={metaverse} alt="metaverse" width={126} />
        </NavLink>
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
            to="/marketplace"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Marketplace</h6>
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
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/contact-us"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Contact us</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        {/* <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/nft-event"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">NFT Event</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div> */}
        <div className="w-100 d-flex align-items-center justify-content-center gap-3">
         {!coinbase ? (
            <div className="linear-border">
              <button className="btn outline-btn px-5" onClick={() => {
                handleSignUp();
                setOpenNavbar(false);
              }}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div className="linear-border">
                <div className="btn outline-btn px-5">
                  {shortAddress(coinbase)}
                </div>
              </div>
              {avatar === null ? (
                <img src={person} className="account-icon" alt="" onClick={() => {
                  handleRedirect();
                  setOpenNavbar(false);
                }}/>
              ) : (
                <img src={avatar} className="account-icon" alt=""  onClick={() => {
                  handleRedirect();
                  setOpenNavbar(false);
                }}/>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
