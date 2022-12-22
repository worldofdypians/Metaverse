import React from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import metaverse from "../../assets/navbarAssets/metaverse.svg";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer-container flex-column px-3 px-lg-5">
      <div className="d-flex pt-5 pb-4 w-100 flex-column flex-lg-row align-items-start align-items-lg-center gap-4 gap-lg-0 justify-content-between">
        <img src={metaverse} alt="" />
        <a
          href="https://www.dypius.com/"
          target="_blank"
          className="footer-link font-poppins"
          rel='noreferrer'
        >
          Dypius
        </a>
        <NavLink to='/terms-conditions' style={{textDecoration: 'none'}}><span className="footer-link font-poppins">Terms & Conditions</span></NavLink>
        <NavLink to='/privacy-policy' style={{textDecoration: 'none'}}><span className="footer-link font-poppins">Privacy Policy</span></NavLink>
        <a  href="mailto:helpcenter@dypius.com" className="footer-link font-poppins">Contact Us</a>
      </div>
      <hr className="footer-divider mt-0 mb-4" />
      <div className="d-flex w-100 align-items-center justify-content-center mb-4">
        <span className="footer-link font-poppins">
          Copyright © Dypius {year}. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
