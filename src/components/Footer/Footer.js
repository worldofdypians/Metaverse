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
import epicgames from "../../assets/footerIcons/epicgames.svg";

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
    {
      icon: "linkedin",
      link: "https://www.linkedin.com/company/worldofdypians",
    },
    {
      icon: "miniapp",
      link: "https://t.me/WorldOfDypians_bot",
    },
    {
      icon: "cmc",
      link: "https://coinmarketcap.com/currencies/world-of-dypians/",
    },
    {
      icon: "coingecko",
      link: "https://www.coingecko.com/en/coins/world-of-dypians",
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
    if (location.pathname.includes("shop")) {
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
      } footer-container ${location.pathname.includes("map") ? "d-none" : "d-flex"} justify-content-center align-items-center px-3 px-lg-5 w-100  `}
    >
      <div className="custom-container">
        <div className="d-flex align-items-center gap-lg-0 gap-4 justify-content-between flex-lg-row flex-column">
          <div className="d-flex footerlink-wrapper flex-column flex-lg-row flex-md-row align-items-center gap-2 gap-lg-5 gap-md-5">
            <NavLink to="/token" className="new-footer-link">
              WOD Token
            </NavLink>
            <NavLink to="/shop" className="new-footer-link">
            Shop
            </NavLink>
            <NavLink to="/earn" className="new-footer-link">
              Earn
            </NavLink>
            <NavLink to="/team" className="new-footer-link">
              Team
            </NavLink>
            <a
              href="https://drive.google.com/drive/folders/1GvrV3iDooxFZhbiDGUMZcjNbi5TcR2i5?usp=sharing"
              className="new-footer-link"
              target="_blank"
              rel="noreferrer"
            >
              Brand
            </a>
            <NavLink to="/join-beta" className="new-footer-link">
              Join Beta
            </NavLink>
          </div>
          <a
            className="epic-games-btn fullBtn p-2 d-flex align-items-center gap-2"
            href="https://store.epicgames.com/p/world-of-dypians-2e0694"
            target="_blank"
          >
            <img src={epicgames} width={26} alt="" />
            Download
          </a>
        </div>
        <hr className="footer-divider my-4" />
        <div className="d-flex flex-column-reverse flex-lg-row flex-md-row align-items-lg-center justify-content-between mb-5">
          <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-4 gap-lg-5 mt-4 mt-lg-0">
            <img src={metaverse} height={64} alt="" />
            <div className="d-flex flex-column justify-content-between">
              <span className="copyright-text">
                ©{year} World of Dypians Ltd
              </span>
              <span className="trademark-text">
                All trademarks referenced herein are the properties of their
                respective owners.
              </span>
              <div className="d-flex align-items-center gap-lg-5 gap-3">
                <NavLink
                  to="/terms-of-service"
                  onClick={() => scrollToTop("terms")}
                  style={{ textDecoration: "none" }}
                  className="gray-footer-link"
                >
                  Terms of Service
                </NavLink>
                <NavLink to="/privacy-policy" className="gray-footer-link">
                  Privacy
                </NavLink>
                <NavLink to="/contact-us" className="gray-footer-link">
                  Contact Us{" "}
                </NavLink>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 footer-socials-wrapper">
            {socials.map((item, index) => (
              <a href={item.link} key={index} target="_blank" rel="noreferrer">
                <img
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt=""
                  height={25}
                  width={25}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
