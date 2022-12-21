import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import whitelistIcon from "../../assets/whitelist-icon.svg";
import whitewallet from "../../assets/wallet-white.svg";
import axios from "axios";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import validate from "./validateHelpInfo";
import successLogo from "../../assets/successLogo.svg";
import waitlistLogo from "../../assets/waitlistLogo.svg";
import failed from "../../assets/failed.svg";
import alreadyjoinedLogo from "../../assets/alreadyjoinedLogo.svg";

import "./_registerModal.scss";

const StyledTextField = styled(TextField)(({}) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "#272450",
    border: "1px solid #AAA5EB",
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontWeight: 400,
    fontFamily: "Poppins",
  },
}));

const RegisterModal = ({
  open,
  onClose,
  handleConnect,
  coinbase,
  showForms,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "fit-content",
    borderRadius: "8px",
    overflowX: "hidden",
  };

  const options = [
    {
      name: "Metamask",
      icon: "metamask.png",
    },
    {
      name: "Coinbase",
      icon: "coinbase.png",
    },
    {
      name: "Coin98",
      icon: "coin98.png",
    },
    {
      name: "Trustwallet",
      icon: "trustwallet.png",
    },
    {
      name: "Safepal",
      icon: "safepal.png",
    },
  ];

  const initialState = { email: "", discord: "" };

  const [showOptions, setShowOptions] = useState(false);
  const [seats, setSeats] = useState(0);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(values));

    if (Object.keys(errors).length === 0) {
      if (values.discord !== "" && values.email !== "") {
        setLoading(true);

        const data = {
          address: coinbase,
          email: values.email,
          discord: values.discord,
        };

        const send = await axios
          .post("https://api3.dyp.finance/api/whitelist/insert", data)
          .then(function (result) {
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });

        if (send.status === 0) {
          //user already exists
          setStatus("Already joined");
          setSuccess(false);
          setLoading(false);
        }
        if (send.status === 1) {
          //successfully registered
          setStatus("Successfully joined");
          setSuccess(true);
          setLoading(false);
        }
        if (send.status === 2) {
          setStatus("Added to next available");
          //more than 500
          setSuccess(false);
          setLoading(false);
        } else {
          setStatus("Failed to join");
          setSuccess(false);
          setLoading(false);
        }
      } else {
        setSuccess(false);
        setLoading(false);
      }

      setValues({ ...initialState });
    }
  };

  const countSeats = async () => {
    await axios
      .get("https://api3.dyp.finance/api/whitelist/count")
      .then((data) => {
        setSeats(data.data.count);
      });
  };

  useEffect(() => {
    countSeats();
  }, []);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {status === "" && (
          <div>
            <div className="d-flex justify-content-between gap-1">
              <h2 className="font-organetto register-grid-title px-0 w-50">
                Join our{" "}
                <mark className="font-organetto register-tag">whitelist</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x"
                onClick={() => {
                  onClose();
                }}
                style={{ bottom: "25px" }}
              />
            </div>
            <div className="d-flex flex-column gap-3">
              <p className="text-white m-0 walletdesc font-poppins">
                You will be eligible to be part of the beta testers team based
                on the details you provide
              </p>
              <div className="d-flex gap-1 align-items-center">
                <img src={whitelistIcon} alt="" />
                <span className="text-white whitedesc">
                  <mark className="font-poppins register-tag">{seats}</mark>/500
                  seats
                </span>
              </div>
              <p className="m-0 text-white walletdesc font-poppins">
                Seats available for this round
              </p>
            </div>
            <div className="separator"></div>

            <div
              className={
                showOptions === false ? "linear-border m-auto" : "m-auto"
              }
              style={{
                width: showOptions === false ? "fit-content" : "",
                display: showForms === true ? "none" : "",
              }}
            >
              {showOptions === false ? (
                <button
                  className="btn outline-btn px-5 d-flex gap-1 align-items-center"
                  onClick={() => {
                    setShowOptions(true);
                  }}
                >
                  <img src={whitewallet} alt="" />
                  Connect Wallet
                </button>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {options.length > 0 &&
                    options.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="optionwrapper"
                          onClick={handleConnect}
                        >
                          <div className="d-flex justify-content-between gap-2 align-items-center">
                            <p className="m-0 walletname">{item.name}</p>
                            <img
                              src={require(`../../assets/walletIcons/${item.icon}`)}
                              className="option-wallet"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            {showForms === true && (
              <div>
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <p className="m-0 wallettext font-poppins">Wallet address</p>
                  <p className="purpledesc m-0">{shortAddress(coinbase)}</p>
                </div>
                <div className="separator"></div>
                <div className="d-flex flex-column gap-3">
                  <h6 className="text-white">Registration details</h6>

                  <StyledTextField
                    error={errors.email ? true : false}
                    size="small"
                    label="Email address"
                    id="email"
                    name="email"
                    value={values.email}
                    helperText={errors.email}
                    required
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                  />

                  <StyledTextField
                    error={errors.discord ? true : false}
                    size="small"
                    label="Discord"
                    id="discord"
                    name="discord"
                    value={values.discord}
                    helperText={errors.discord}
                    required
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                  />
                </div>
                <div
                  className="linear-border"
                  style={{
                    width: "fit-content",
                    margin: "2rem auto auto auto",
                  }}
                >
                  <button
                    className="btn filled-btn px-5"
                    onClick={handleSubmit}
                  >
                    {loading === true ? (
                      <div
                        class="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : success === false ? (
                      "Submit"
                    ) : (
                      "Success"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {status === "Already joined" && (
          <div>
            <h2 className="font-organetto register-grid-title px-0 w-50">
              {status}{" "}
              <mark className="font-organetto register-tag">whitelist</mark>
            </h2>
            <img src={alreadyjoinedLogo} alt="" />
            <p className="text-white m-0">
              Congratulations, your World of Dypians whitelist registration is
              successful. Please visit the Dypius Discord for more information.
            </p>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default RegisterModal;
