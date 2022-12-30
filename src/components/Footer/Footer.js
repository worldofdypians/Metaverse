import React from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import useWindowSize from "../../hooks/useWindowSize";

const Footer = () => {
  const year = new Date().getFullYear();

  const windowSize = useWindowSize();

  const socials = [
    {
      icon: "twitter",
      link: "#",
    },
    {
      icon: "telegram",
      link: "#",
    },
    {
      icon: "discord",
      link: "#",
    },
    {
      icon: "instagram",
      link: "#",
    },
    {
      icon: "facebook",
      link: "#",
    },
    {
      icon: "reddit",
      link: "#",
    },
    {
      icon: "tiktok",
      link: "#",
    },
    {
      icon: "youtube",
      link: "#",
    },
  ];

  return (
    <div className="footer-container flex-column px-3 px-lg-5">
      <div className="d-flex pt-5 pb-4 w-100 flex-column flex-lg-row align-items-start align-items-lg-center gap-4 gap-lg-0 justify-content-between">
        <a
          href="https://www.dypius.com/"
          target="_blank"
          className="footer-link font-poppins"
          rel="noreferrer"
        >
          Dypius
        </a>
        {/* <span className="footer-link font-poppins">Whitepaper</span> */}
        <NavLink to="/terms-conditions" style={{ textDecoration: "none" }}>
          <span className="footer-link font-poppins">Terms & Conditions</span>
        </NavLink>
        <NavLink to="/privacy-policy" style={{ textDecoration: "none" }}>
          <span className="footer-link font-poppins">Privacy Policy</span>
        </NavLink>
        <a
          href="mailto:helpcenter@dypius.com"
          className="footer-link font-poppins"
        >
          Contact Us
        </a>
        {windowSize.width > 786 ? (
          <div className="footer-socials">
            {socials.map((item, index) => (
              <a href={item.link} key={index}>
                <img
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt={item.icon}
                />
              </a>
            ))}
          </div>
        ) : (
          <>
            <div className="mobile-socials d-flex align-items-center justify-content-between w-100">
              {socials.slice(0, 4).map((item, index) => (
                <a href={item.link} key={index}>
                  <img
                    src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                    alt={item.icon}
                  />
                </a>
              ))}
            </div>
            <div className="mobile-socials d-flex align-items-center justify-content-between w-100">
              {socials.slice(4,8).map((item, index) => (
                <a href={item.link} key={index}>
                  <img
                    src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                    alt={item.icon}
                  />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
      <hr className="footer-divider mt-0 mb-4" />
      <div className="d-flex w-100 align-items-center justify-content-center mb-4 flex-column">
        <span className="footer-link font-poppins">
          Copyright © Dypius {year}. All rights reserved.
        </span>
        <span className="footer-link font-poppins">Powered by Dypius.</span>
      </div>
    </div>
  );
};

export default Footer;
