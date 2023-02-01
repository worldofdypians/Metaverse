import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import whitelistIcon from "../../assets/whitelist-icon.svg";
import whitewallet from "../../assets/wallet-white.svg";
import blackwallet from "../../assets/wallet-black.svg";
import discord from "../../assets/discord.svg";
import axios from "axios";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import validate from "../RegisterModal/validateHelpInfo";
import successLogo from "../../assets/successLogo.svg";
import waitlistLogo from "../../assets/waitlistLogo.svg";
import failed from "../../assets/failed.svg";
import alreadyjoinedLogo from "../../assets/alreadyjoinedLogo.svg";
import "./_joinbetamodal.scss";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { Checkbox } from "@mui/material";

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

const JoinBetaModal = ({
  open,
  onClose,
  handleConnect,
  coinbase,
  showForms,
}) => {
  const options = [
    {
      name: "Metamask",
      icon: "metamask.png",
    },
  ];

  const initialState = {
    email: "",
    discord: "",
    twitter: "",
    country: "",
    products: "",
  };

  var productsArray = [];
  const [showOptions, setShowOptions] = useState(false);
  const [seats, setSeats] = useState(0);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [status, setStatus] = useState("");
  const [modalWidth, setModalWidth] = useState(showForms);

  //   const checkInput = async (name, inputValue) => {
  //     if (name === "discord") {
  //       const data = { discord: inputValue };
  //       const check = await axios
  //         .post(` https://api3.dyp.finance/api/whitelist/check/discord/`, data)
  //         .then(function (result) {
  //           return result.data;
  //         })
  //         .catch(function (error) {
  //           console.error(error);
  //         });

  //       if (check.status === 1) {
  //         setStatus("Already joined");
  //       } else {
  //         setStatus("");
  //       }
  //     }

  //     if (name === "email") {
  //       const data = { email: inputValue };
  //       const check = await axios
  //         .post(`https://api3.dyp.finance/api/whitelist/check/email/`, data)
  //         .then(function (result) {
  //           return result.data;
  //         })
  //         .catch(function (error) {
  //           console.error(error);
  //         });
  //       if (check.status === 1) {
  //         setStatus("Already joined");
  //       } else {
  //         setStatus("");
  //       }
  //     }
  //   };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    // clearTimeout(timer);

    // const newTimer = setTimeout(() => {
    //   checkInput(name, value);
    // }, 500);

    // setTimer(newTimer);
  };

  const addProducts = (product) => {
    if (productsArray.includes(product)) {
      const index = productsArray.indexOf(product);
      productsArray.splice(index, 1);
    } else {
      productsArray.push(product);
    }
    console.log(productsArray);
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    setErrors(validate(values));

    if (errors.email === undefined && errors.discord === undefined) {
      if (
        values.discord !== "" &&
        values.email !== "" &&
        values.discord.includes("#")
      ) {
        setLoading(true);

        let signature = "";
        await window
          .sign(window.config.whitelist_nft, coinbase)
          .then((data) => {
            signature = data;
          })
          .catch((e) => {
            setLoading(false);
            console.error(e);
          });
        const data = {
          signature: signature,
          address: coinbase,
          email: values.email,
          discord: values.discord,
          twitter: values.twitter,
          country: values.country,
          products: productsArray.join()
        };
        try {
          const send = await axios
            .post(
              "https://api3.dyp.finance/api/beta_tester_application/insert",
              data
            )
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
            setModalWidth(false);
          } else if (send.status === 1) {
            //successfully registered
            setStatus("Successfully joined");
            setSuccess(true);
            setLoading(false);
            setModalWidth(false);
          } else if (send.status === 2) {
            setStatus("Successfully joined");
            //more than 500
            setSuccess(false);
            setLoading(false);
            setModalWidth(false);
          } else {
            setStatus("Failed to join");
            setSuccess(false);
            setLoading(false);
          }
        } catch (e) {
          window.alertify.error("Something went wrong!" + e.responseText);
        } finally {
          setValues({ ...initialState });
        }
      } else {
        setSuccess(false);
        setLoading(false);
      }

      setValues({ ...initialState });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth === true ? "fit-content" : "min-content",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    borderRadius: "8px",
    overflowX: "hidden",
  };

  const countSeats = async () => {
    await axios
      .get("https://api3.dyp.finance/api/whitelist/count")
      .then((data) => {
        setSeats(data.data.count);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const checkData = async () => {
    if (coinbase) {
      const check = await axios
        .get(
          `https://api3.dyp.finance/api/beta_testers_application/check/${coinbase}`
        )
        .then(function (result) {
          return result.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      if (check.status === 1) {
        setStatus("Already joined");
      } else {
        setStatus("");
      }
    }
  };

  useEffect(() => {
    countSeats();
  }, []);

  useEffect(() => {
    checkData();
  }, [coinbase]);

  console.log(modalWidth);
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
              <h2 className="font-organetto d-flex align-items-center register-grid-title px-0">
                Tester{" "}
                <mark className="font-organetto register-tag">Application</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x"
                onClick={() => {
                  onClose();
                }}
                style={{ bottom: "25px", right: "-25px", height: "50px" }}
              />
            </div>
            <div className="d-flex flex-column gap-3">
              {coinbase ? (
                <p className="text-white m-0 walletdesc font-poppins">
                  Please provide the information below to register as a World of
                  Dypians Beta Tester.
                </p>
              ) : (
                <p className="text-white m-0 walletdesc font-poppins">
                  Become a World of Dypians beta tester to get early access to
                  the latest content, entrance to private discord channels, earn
                  rewards, gain experience, and help improve the game.
                </p>
              )}

              {/* <div className="d-flex gap-1 align-items-center">
                <img src={whitelistIcon} alt="" />
                <span className="text-white whitedesc">
                  <mark
                    className="font-poppins register-tag"
                    style={{ fontSize: 32 }}
                  >
                    {getFormattedNumber(seats, 0)}
                  </mark>
                </span>
              </div> */}
              {/* <p className="m-0 text-white walletdesc font-poppins">
            Available seats: 300
          </p> */}
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
                  onMouseEnter={() => {
                    setMouseOver(true);
                  }}
                  onMouseLeave={() => {
                    setMouseOver(false);
                  }}
                >
                  <img
                    src={mouseOver === true ? blackwallet : whitewallet}
                    alt=""
                  />
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
                              alt=""
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                  />

                  <StyledTextField
                    error={errors.discord ? true : false}
                    size="small"
                    label="Discord Username"
                    id="discord"
                    name="discord"
                    value={values.discord}
                    helperText={errors.discord}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                    placeholder={"User#1234"}
                  />
                  <StyledTextField
                    // error={errors.discord ? true : false}
                    size="small"
                    label="Country"
                    id="country"
                    name="country"
                    value={values.country}
                    // helperText={errors.discord}
                    // required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                    // placeholder={"User#1234"}
                  />
                  <StyledTextField
                    // error={errors.discord ? true : false}
                    size="small"
                    label="Twitter username"
                    id="twitter"
                    name="twitter"
                    value={values.twitter}
                    // helperText={errors.discord}
                    // required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    sx={{ width: "100%" }}
                    // placeholder={"User#1234"}
                  />
                </div>
                <div className="mt-3">
                  <span className="checkbox-title mt-3">
                    What Dypius products do you use?
                  </span>
                  <div className="checkbox-grid">
                    <div className="d-flex align-items-center gap-2">
                      <Checkbox
                        onChange={() => addProducts("Hold DYP")}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#00FECF",
                          },
                        }}
                      />
                      <span className="checkbox-title">Hold DYP</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Checkbox
                        onChange={() => addProducts("Hold iDYP")}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#00FECF",
                          },
                        }}
                      />
                      <span className="checkbox-title">Hold iDYP</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Checkbox
                        onChange={() => addProducts("CAWS NFT")}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#00FECF",
                          },
                        }}
                      />
                      <span className="checkbox-title">CAWS NFT</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Checkbox
                        onChange={() => addProducts("Earn Products")}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#00FECF",
                          },
                        }}
                      />
                      <span className="checkbox-title">Earn products</span>
                    </div>
                  </div>
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
        {status === "Successfully joined" && (
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-center">
            <div className="d-flex justify-content-between gap-1 position-relative">
              <h2 className="font-organetto register-grid-title px-0">
                {status}{" "}
                <mark className="font-organetto register-tag">whitelist</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x position-absolute"
                onClick={() => {
                  onClose();
                }}
                style={{ right: "-25px", height: "50px" }}
              />
            </div>

            <img src={successLogo} alt="" />
            <p className="text-white m-0">
              Congratulations, your World of Dypians whitelist registration is
              successful. Please visit the Dypius Discord for more information.
            </p>
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://discord.gg/dypcaws"
                target="_blank"
                rel="noreferrer"
                className="btn outline-btn px-5 d-flex gap-1 align-items-center"
                style={{
                  background:
                    "linear-gradient(89.7deg, #5865F2 0.23%, #A2AAFE 99.72%)",
                  border: "none",
                  textDecoration: "none",
                }}
                onClick={handleConnect}
              >
                <img src={discord} alt="" />
                Join Discord server
              </a>
            </div>

            <button className="btn simple-btn px-5" onClick={onClose}>
              Close
            </button>
          </div>
        )}
        {status === "Already joined" && (
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-center">
            <div className="d-flex justify-content-between gap-1 position-relative">
              <h2 className="font-organetto register-grid-title px-0">
                {status}{" "}
                <mark className="font-organetto register-tag">whitelist</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x position-absolute"
                onClick={() => {
                  onClose();
                }}
                style={{ right: "-25px", height: "50px" }}
              />
            </div>
            <img src={alreadyjoinedLogo} alt="" />
            <p className="text-white m-0">
              Your application as a World of Dypians beta tester has already
              been received. Please check back soon.
            </p>
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://discord.gg/dypcaws"
                target="_blank"
                rel="noreferrer"
                className="btn outline-btn px-5 d-flex gap-1 align-items-center"
                style={{
                  background:
                    "linear-gradient(89.7deg, #5865F2 0.23%, #A2AAFE 99.72%)",
                  border: "none",
                  textDecoration: "none",
                }}
                onClick={handleConnect}
              >
                <img src={discord} alt="" />
                Join Discord server
              </a>
            </div>
            <button className="btn simple-btn px-5" onClick={onClose}>
              Close
            </button>
          </div>
        )}
        {status === "Added to next available" && (
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-center">
            <div className="d-flex justify-content-between gap-1 position-relative">
              <h2 className="font-organetto register-grid-title px-0">
                {status}{" "}
                <mark className="font-organetto register-tag">whitelist</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x position-absolute"
                onClick={() => {
                  onClose();
                }}
                style={{ right: "-25px", height: "50px" }}
              />
            </div>
            <img src={waitlistLogo} alt="" />
            <p className="text-white m-0">
              Thank you for your application as a World of Dypius Beta Tester.
              Unfortunately, all current reservations are full and your
              application has been added to the next waiting list.
            </p>
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://discord.gg/dypcaws"
                target="_blank"
                rel="noreferrer"
                className="btn outline-btn px-5 d-flex gap-1 align-items-center"
                style={{
                  background:
                    "linear-gradient(89.7deg, #5865F2 0.23%, #A2AAFE 99.72%)",
                  border: "none",
                  textDecoration: "none",
                }}
                onClick={handleConnect}
              >
                <img src={discord} alt="" />
                Join Discord server
              </a>
            </div>
            <button className="btn simple-btn px-5" onClick={onClose}>
              Close
            </button>
          </div>
        )}
        {status === "Failed to join" && (
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-center">
            <div className="d-flex justify-content-between gap-1 position-relative">
              <h2 className="font-organetto register-grid-title px-0">
                {status}{" "}
                <mark className="font-organetto register-tag">whitelist</mark>
              </h2>
              <img
                src={X}
                alt=""
                className="close-x position-absolute"
                onClick={() => {
                  onClose();
                }}
                style={{ right: "-25px", height: "50px" }}
              />
            </div>
            <img src={failed} alt="" />
            <p className="text-white m-0">
              Unable to join the World of Dypius beta tester whitelist. Please
              try again.
            </p>
            <button className="btn simple-btn px-5" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default JoinBetaModal;
