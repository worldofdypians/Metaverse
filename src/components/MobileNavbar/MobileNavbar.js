import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import mobileArrow from "../../assets/navbarAssets/mobileArrow.svg";
import xMark from "../../assets/navbarAssets/xMark.svg";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "../Header/assets/person.svg";
import check from "../Header/assets/check.svg";
import copy from "../Header/assets/copy.svg";
import bellIcon from "./assets/bellIcon.svg";

import Clipboard from "react-clipboard.js";

const MobileNavbar = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");
  let id = Math.random().toString(36);

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
    }
  };

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

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
        <NavLink to="/notifications">
        <div className="position-relative" style={{right: '-66px'}}>
          <img
            src={bellIcon}
            width={30}
            style={{ cursor: "pointer" }}
            height={30}
            alt=""
          />

          {unreadNotifications > 0 && (
            <div className="bell-amount">
              <span className="mb-0">
                {unreadNotifications > 99 ? "99+" : unreadNotifications}
              </span>
            </div>
          )}
        </div>
        </NavLink>
        {openNavbar === false ? (
          <div className="linear-border" onClick={() => setOpenNavbar(true)}>
            <button
              className="px-4 bg-transparent"
              style={{ clipPath: "none", border: "none" }}
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

        <div className="w-100 d-flex align-items-center justify-content-center gap-3">
          {!coinbase ? (
            <div className="linearborder2">
              <button
                className="btn connectwallet px-3"
                onClick={() => {
                  handleSignUp();
                  setOpenNavbar(false);
                }}
              >
                Connect Wallet
              </button>{" "}
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <Clipboard
                component="div"
                data-event="click"
                data-for={id}
                data-tip="Copied To Clipboard!"
                data-clipboard-text={coinbase}
                className="wallet-wrapper d-flex align-items-center gap-2 position-relative"
              >
                <div
                  className="btn connected px-3"
                  style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                  onClick={() => {
                    setTooltip(true);
                    setTimeout(() => setTooltip(false), 2000);
                  }}
                >
                  {shortAddress(coinbase)}{" "}
                  <img src={tooltip ? check : copy} alt="" />
                </div>
              </Clipboard>

              {avatar === null ? (
                <img
                  src={person}
                  className="account-icon"
                  alt=""
                  onClick={() => {
                    handleRedirect();
                    setOpenNavbar(false);
                  }}
                />
              ) : (
                <img
                  src={avatar}
                  className="account-icon"
                  alt=""
                  onClick={() => {
                    handleRedirect();
                    setOpenNavbar(false);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
