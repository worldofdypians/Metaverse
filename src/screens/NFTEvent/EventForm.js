import React, { useState, useRef, useEffect } from "react";
import NftCardPlaceholder from "../../components/NewsCard/NftCardPlaceholder";
import limitedOfferBadge from "../../assets/limitedoffer.svg";
import Countdown from "react-countdown";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import { shortAddress } from "../Caws/functions/shortAddress";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ReCaptchaV2 from "react-google-recaptcha";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div
        className="d-flex align-items-center gap-3"
        style={{ width: "fit-content" }}
      >
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{days}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            days
          </span>
        </div>
        <span
          className="countdown-sup"
          style={{ position: "relative", bottom: "13px" }}
        >
          :
        </span>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{hours}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            hours
          </span>
        </div>
        <span
          className="countdown-sup"
          style={{ position: "relative", bottom: "13px" }}
        >
          :
        </span>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{minutes}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            minutes
          </span>
        </div>
      </div>
    </>
  );
};
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
    background: "#272450",
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
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const EventForm = ({ showWalletConnect, coinbase }) => {
  const initialValues = {
    wallet: "",
    id: "",
    date: "",
  };

  const [mouseOver, setMouseOver] = useState(false);
  const [values, setValues] = useState(initialValues);
  const recaptchaRef = useRef(null);
  const [errors, setErrors] = useState({});

  return (
    <div className="row w-100 justify-content-center m-0">
      <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between align-items-center">
        <div>
          <NftCardPlaceholder />
        </div>
        <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between align-items-center w-100">
          <div>
            <h6 className="genesis-benefits-title font-organetto d-flex flex-column flex-lg-row gap-0 gap-lg-2">
              Genesis
              <h6
                className="genesis-benefits-title"
                style={{ color: "#8c56ff" }}
              >
                Form
              </h6>
            </h6>
            {!coinbase ? (
              <div className={"linear-border"}>
                <button
                  className={`btn outline-btn
                  }  px-4 w-100`}
                  onClick={() => {
                    showWalletConnect();
                  }}
                  onMouseEnter={() => {
                    setMouseOver(true);
                  }}
                  onMouseLeave={() => {
                    setMouseOver(false);
                  }}
                >
                  <img
                    src={mouseOver === false ? blackWallet : whitewallet}
                    alt=""
                    style={{ width: "23px", height: "23px" }}
                  />
                  Connect wallet
                </button>
              </div>
            ) : (
              <span
                className="create-land-title font-poppins"
                style={{ fontSize: "14px" }}
              >
                Address:{" "}
                <a
                  href={`https://etherscan.io/address/${coinbase}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <span className="addr-text">{shortAddress(coinbase)}</span>
                </a>
              </span>
            )}
          </div>
          <div className="timerwrapper position-relative">
            <img src={limitedOfferBadge} alt="" className="limitedbadge" />
            <Countdown
              renderer={renderer}
              date={"2023-03-08T13:00:00.000+00:00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
