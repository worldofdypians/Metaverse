import React, { useEffect, useState } from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const year = new Date().getFullYear();

  const windowSize = useWindowSize();
  const [padding, setPadding] = useState(false);
  const socials = [
    {
      icon: "twitter",
      link: "https://twitter.com/worldofdypians",
    },
    {
      icon: "telegram",
      link: "https://t.me/worldofdypians",
    },
    {
      icon: "discord",
      link: "https://discord.gg/worldofdypians",
    },
    {
      icon: "instagram",
      link: "https://www.instagram.com/worldofdypians",
    },
    {
      icon: "facebook",
      link: "https://www.facebook.com/worldofdypians",
    },
    // {
    //   icon: "reddit",
    //   link: "https://www.reddit.com/r/WorldofDypians/",
    // },
    // {
    //   icon: "tiktok",
    //   link: "https://www.tiktok.com/@worldofdypians",
    // },
    {
      icon: "youtube",
      link: "https://www.youtube.com/@Dypius",
    },
    {
      icon: "email",
      link: "mailto:contact@worldofdypians.com",
    },
  ];

  useEffect(() => {
    if (location.pathname.includes("marketplace")) {
      setPadding(true);
    } else {
      setPadding(false);
    }
  }, [location]);

  return (
    <div
      className={`${
        padding ? "extra-padding" : null
      } footer-container flex-column px-3 px-lg-5 `}
    >
      <div className="container-fluid d-flex w-100 pb-4 pt-4 flex-column flex-xxl-row flex-lg-row flex-xl-row  gap-3 justify-content-between align-items-baseline">
        {/* {windowSize.width > 992 ? (
          <div className="footer-socials d-flex align-items-center gap-3 w-100">
            {socials.map((item, index) => (
              <a
                href={item.link}
                key={index}
                target="_blank"
                rel="noreferrer"
                className="d-flex align-items-center gap-1"
              >
                <img
                  width={25}
                  height={25}
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt={item.icon}
                />
                <span>{item.icon}</span>
              </a>
            ))}
          </div>
        ) : (
          <>
            <div className="mobile-socials d-flex align-items-center justify-content-between w-100 gap-1">
              {socials.map((item, index) => (
                <a
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex gap-1 align-items-center"
                >
                  <img
                    width={25}
                    height={25}
                    src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                    alt={item.icon}
                  />
                </a>
              ))}
            </div>
        
          </>
        )} */}
      </div>
      <hr className="footer-divider mt-0 mb-4" />

      <div className="d-flex w-100  justify-content-center mb-4 flex-column gap-2">
      <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row w-100">
      <div
          className="d-flex footer-wrapper flex-row align-items-start align-items-lg-center gap-5 justify-content-between"
          style={{ width: "fit-content" }}
        >
          <a
            href="https://www.dypius.com/"
            target="_blank"
            className="footer-link font-poppins"
            rel="noreferrer"
          >
            Dypius
          </a>
          <NavLink to="/terms-conditions" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Terms & Conditions</span>
          </NavLink>
          <NavLink to="/privacy-policy" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Privacy Policy</span>
          </NavLink>
          <NavLink to="/contact-us" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins"> Contact Us</span>
          </NavLink>

          <NavLink to="/join-beta" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Join Beta</span>
          </NavLink>
          <a
            href="https://store.epicgames.com/p/world-of-dypians-2e0694"
            target="_blank"
          >
            <img
              src={require("../../assets/footerIcons/epicgames.svg").default}
              width={50}
              height={50}
              alt=""
            />
          </a>
        </div>
        <div className="footer-socials d-flex align-items-center py-5 py-lg-0 gap-4 gap-lg-5">
            {socials.map((item, index) => (
              <a
                href={item.link}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width={25}
                  height={25}
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt={item.icon}
                />
                {/* <span>{item.icon}</span> */}
              </a>
            ))}
          </div>
      </div>
        <div className="d-flex flex-column">
          <span className="footer-link font-poppins">
            Copyright © World of Dypians {year}. All rights reserved.
          </span>
          <span className="footer-link font-poppins">Powered by Dypius.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
