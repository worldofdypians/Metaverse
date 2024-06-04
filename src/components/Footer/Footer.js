import React, { useEffect, useState } from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation } from "react-router-dom";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import validateEmail from "../../hooks/validateEmail";
import axios from "axios";
import styled from "styled-components";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});
const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#080b2a",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#080b2a",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#080b2a",
      borderRadius: "8px",
    },
  },
});
const Footer = () => {
  const location = useLocation();

  const year = new Date().getFullYear();
  const [error, setError] = useState({});
  const windowSize = useWindowSize();
  const [padding, setPadding] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

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
      icon: "github",
      link: "https://github.com/worldofdypians/Metaverse",
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
      icon: "medium",
      link: "https://medium.com/@worldofdypians",
    },
    {
      icon: "email",
      link: "mailto:contact@worldofdypians.com",
    },
  ];

  const subscribe = async (e) => {
    e.preventDefault();
    setError(validateEmail(email));
    if (Object.keys(validateEmail(email)).length === 0) {
      const postEmail = {
        email: email,
      };

      if (email !== "") {
        axios
          .post("https://api3.dyp.finance/api/newsletter/insert", postEmail)
          .then((result) => {
            if (result.data.status === 1) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError({ email: result.data.message });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (location.pathname.includes("marketplace")) {
      setPadding(true);
    } else {
      setPadding(false);
    }
  }, [location]);

  const scrollToTop = (name) => {
    if (location.pathname.includes(name)) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className={`${
        padding ? "extra-padding" : null
      } footer-container flex-column px-3 px-lg-5 w-100 `}
    >
      <div className="container-fluid d-flex w-100 pb-4 pt-4 flex-column flex-xxl-row flex-lg-row flex-xl-row  gap-3 justify-content-between align-items-baseline"></div>
      <hr className="footer-divider mt-0 mb-4" />
      <div className="d-flex align-items-start justify-content-between mb-5">
        <div className="d-flex flex-column align-items-start gap-5">
          <img src={metaverse} alt="" />
          <p className="mb-0 new-footer-desc">
            The World Of Dypians Awaits You. Experience Gameplay Like Never Seen
            Before.
          </p>
          {/* <a href="mailto:contact@worldofdypians.com" className="d-flex footer-email-wrapper align-items-center gap-2">
            <img src={require(`../../assets/footerIcons/email.svg`).default} alt="" />
            <h6 className="footer-email mb-0">contact@worldofdypians.com</h6>
          </a> */}
              <div className="d-flex flex-column gap-3">
              <h6 className="footer-newsletter-title mb-0 mt-4">Sign up for our Newsletter</h6>
          <div className="d-flex flex-column flex-lg-row align-items-start justify-content-start gap-3 gap-lg-5">
            <div className="newsletter-input-container">
              <ThemeProvider theme={theme}>
                <StyledTextField
                  style={{ width: "100%" }}
                  error={error.email ? true : false}
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={error.email}
                />
              </ThemeProvider>
            </div>
            <button
              className="new-connect-btn px-3 py-1"
              onClick={subscribe}
              style={{ height: "40px" }}
            >
              Register
            </button>
          </div>
              </div>
        </div>
        <div className="d-flex col-5 align-items-start justify-content-between">
          <div className="d-flex flex-column gap-4">
            <h6 className="footer-column-title mb-0">
              Column #1
            </h6>
            <div className="d-flex flex-column gap-4">
            <a href="#" className="footer-column-link">
              Item #2
            </a>
            <a href="#" className="footer-column-link">
              Item #3
            </a>
            <a href="#" className="footer-column-link">
              Item #4
            </a>
            <a href="#" className="footer-column-link">
              Item #5
            </a>
            <a href="#" className="footer-column-link">
              Item #6
            </a>
            <a href="#" className="footer-column-link">
              Item #7
            </a>
            </div>
          </div>
          <div className="d-flex flex-column gap-4">
            <h6 className="footer-column-title mb-0">
              Column #2
            </h6>
            <div className="d-flex flex-column gap-4">
            <a href="#" className="footer-column-link">
              Item #2
            </a>
            <a href="#" className="footer-column-link">
              Item #3
            </a>
            <a href="#" className="footer-column-link">
              Item #4
            </a>
            <a href="#" className="footer-column-link">
              Item #5
            </a>
            <a href="#" className="footer-column-link">
              Item #6
            </a>
            <a href="#" className="footer-column-link">
              Item #7
            </a>
            </div>
          </div>
          <div className="d-flex flex-column gap-4">
            <h6 className="footer-column-title mb-0">
              Column #3
            </h6>
            <div className="d-flex flex-column gap-4">
            <a href="#" className="footer-column-link">
              Item #2
            </a>
            <a href="#" className="footer-column-link">
              Item #3
            </a>
            <a href="#" className="footer-column-link">
              Item #4
            </a>
            <a href="#" className="footer-column-link">
              Item #5
            </a>
            <a href="#" className="footer-column-link">
              Item #6
            </a>
            <a href="#" className="footer-column-link">
              Item #7
            </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="d-flex w-100  justify-content-center mb-4 flex-column gap-3">
        <div className="d-flex  align-items-start justify-content-start flex-column gap-lg-3 w-100">
           <div className="footer-socials d-flex align-items-center py-2 py-lg-0 gap-4 gap-lg-5">
            {socials.map((item, index) => (
              <a href={item.link} key={index} target="_blank" rel="noreferrer">
                <img
                  width={25}
                  height={25}
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt={item.icon}
                />
              </a>
            ))}
          </div>
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
            <NavLink to="/team" onClick={() => scrollToTop("team")} style={{ textDecoration: "none" }}>
              <span className="footer-link font-poppins">Team</span>
            </NavLink>
            <NavLink to="/terms-conditions" onClick={() => scrollToTop("terms")} style={{ textDecoration: "none" }}>
              <span className="footer-link font-poppins">
                Terms & Conditions
              </span>
            </NavLink>
            <NavLink to="/privacy-policy" onClick={() => scrollToTop("privacy")} style={{ textDecoration: "none" }}>
              <span className="footer-link font-poppins">Privacy Policy</span>
            </NavLink>
            <NavLink to="/contact-us" style={{ textDecoration: "none" }}>
              <span className="footer-link font-poppins"> Contact Us</span>
            </NavLink>

            <NavLink to="/join-beta" onClick={() => scrollToTop("join-beta")} style={{ textDecoration: "none" }}>
              <span className="footer-link font-poppins">Join Beta</span>
            </NavLink>
       
            <a
              href="https://store.epicgames.com/p/world-of-dypians-2e0694"
              target="_blank"
              className="epic-logo-footer-wrapper"
            >
              <img
                src={require("../../assets/footerIcons/epicgames.svg").default}
                width={50}
                height={50}
                alt=""
              />
            </a>
          </div>
         
        </div>
       
      </div> */}
      <hr className="footer-divider mt-0 mb-4" />

       <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
          <span className="footer-link font-poppins">
            Copyright © World of Dypians {year}. All rights reserved.
          </span>
          <span className="footer-link font-poppins">Powered by Dypius.</span>
        </div>
    </div>
  );
};

export default Footer;
