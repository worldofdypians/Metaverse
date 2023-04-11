import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import axios from "axios";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import successLogo from "../../assets/successLogo.svg";
import waitlistLogo from "../../assets/waitlistLogo.svg";
import failed from "../../assets/failed.svg";
import alreadyjoinedLogo from "../../assets/alreadyjoinedLogo.svg";
import "./_landwhitelistmodal.scss";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import discord from "../../assets/discord.svg";
import telegram from "../../assets/telegram.svg";

import whitewallet from "../../assets/wallet-white.svg";
import blackwallet from "../../assets/wallet-black.svg";

import purplecircle from "../../assets/landAssets/purplecircle.svg";
import xmark from "../../assets/landAssets/xmark.svg";
import checkcircle from "../../assets/landAssets/checkcircle.svg";

const LandWhitelistModal = ({
  open,
  onClose,
  handleConnect,
  coinbase,
  showForms,
  balance,
  mintPrice,
  totalCAWCreated,
  totalCAWStaked,
  chainId,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
    height: 625,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
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
      name: "SafePal",
      icon: "safepal.png",
    },
    {
      name: "Trust Wallet",
      icon: "trustwallet.png",
    },
  ];

  const initialState = { email: "", discord: "" };
  const [showOptions, setShowOptions] = useState(false);
  const [seats, setSeats] = useState(0);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [mouseOver, setMouseOver] = useState(false);

  const handleSubmit = async (e) => {
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
    };
    try {
      const send = await axios
        .post("https://api3.dyp.finance/api/whitelist_land/insert", data)
        .then(function (result) {
          return result.data;
        })
        .catch(function (error) {
          setStatus("Failed to join");
          console.error(error);
        });

      if (send.status === 0) {
        //user already exists
        setStatus("Failed to join");
        setSuccess(false);
        setLoading(false);
      } else {
        setStatus("Successfully joined");
        //more than 500
        setSuccess(false);
        setLoading(false);
      }
    } catch (e) {
      window.alertify.error("Something went wrong!" + e.responseText);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        .get(`https://api3.dyp.finance/api/whitelist_land/check/${coinbase}`)
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
    checkData();
  }, [coinbase]);

  // console.log(balance, mintPrice)
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
              <h2 className="font-organetto register-grid-title px-0">
                WoD Genesis Land NFT{" "}
                <mark className="font-organetto register-tag"> whitelist</mark>
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
              <p className="text-white m-0 walletdesc font-poppins">
                Connect your wallet for a chance at a limited 1,000 plot Genesis
                Land NFT mint whitelist spot guaranteeing access to a maximum of
                10 Genesis Land NFT mints per wallet.
              </p>
              <p className="text-white m-0 walletdesc font-poppins">
                Connected wallets must meet at least one of the following two
                requirements to be eligible for a whitelist spot:
              </p>
              <div className="d-flex justify-content-between gap-2 align-items-start">
                <img
                  src={
                    totalCAWCreated === 0 && totalCAWStaked === 0 && coinbase
                      ? xmark
                      : (totalCAWCreated !== 0 || totalCAWStaked !== 0) &&
                        coinbase
                      ? checkcircle
                      : purplecircle
                  }
                  alt=""
                  style={{ position: "relative", top: "3px" }}
                />
                <div className="d-flex flex-column gap-0 justify-content-between">
                  <span className="reqtitle">CAWS NFT Ownership</span>
                  <span className="reqdesc">
                    Registered wallet must currently hold at least one CAWS NFT
                    or contain a CAWS NFT deposited in the CAWS Staking pool.
                  </span>
                </div>
              </div>
              <div className="position-relative">
                <div className="separator"></div>
                <div
                  className="text-white position-absolute"
                  style={{
                    top: "4px",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  <span>or</span>
                </div>
              </div>
              <div className="d-flex justify-content-between gap-2 align-items-start">
                <img
                  src={
                    balance < mintPrice && coinbase
                      ? xmark
                      : balance >= mintPrice && coinbase
                      ? checkcircle
                      : purplecircle
                  }
                  alt=""
                  style={{ position: "relative", top: "3px" }}
                />
                <div className="d-flex flex-column gap-0 justify-content-between">
                  <span className="reqtitle">Meet token Balance Threshold</span>
                  <span className="reqdesc">
                    Wallet must carry a minimum balance of $1,200 worth of
                    ETH at the time of WL registration.
                  </span>
                </div>
              </div>
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
                  <p className="purpledesc m-0" style={{ color: "#f7f7fc" }}>
                    {shortAddress(coinbase)}
                  </p>
                </div>
                <div className="separator"></div>
                {chainId !== 1 &&
               <> <p className="notetext">*Please make sure that you are on the Ethereum chain to verify your eligibility</p>
                <div className="separator"></div></>
}
                <div
                  className={
                    balance < mintPrice &&
                    totalCAWCreated === 0 &&
                    totalCAWStaked === 0
                      ? "linear-border-disabled"
                      : "linear-border"
                  }
                  style={{
                    width: "fit-content",
                    margin: "2rem auto auto auto",
                  }}
                >
                  <button
                    className={`btn ${
                      balance < mintPrice &&
                      totalCAWCreated === 0 &&
                      totalCAWStaked === 0
                        ? "outline-btn-disabled px-5"
                        : "filled-btn px-5"
                    }`}
                    disabled={
                      balance < mintPrice &&
                      totalCAWCreated === 0 &&
                      totalCAWStaked === 0
                    }
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
          <div className="d-flex mt-3 flex-column align-items-center justify-content-center gap-2 text-center">
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
                style={{ right: "-25px", height: "50px", bottom: '83px' }}
              />
            </div>

            <img src={successLogo} alt="" />
            <p className="text-white m-0">
              Congratulations, you have successfully registered for the World of
              Dypians Genesis Land NFT whitelist. Please follow our official
              channels for additional information.
            </p>
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://discord.gg/worldofdypians"
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

            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://t.me/worldofdypians"
                target="_blank"
                rel="noreferrer"
                className="btn outline-btn d-flex gap-1 align-items-center"
                style={{
                  background:
                    "linear-gradient(89.7deg, #1C8BBF 0.23%, #69B6DE 99.72%)",
                  border: "none",
                  textDecoration: "none",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                }}
                onClick={handleConnect}
              >
                <img src={telegram} alt="" />
                Join Telegram channel
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
              Your application for the World of Dypians Genesis Land NFT
              whitelist has already been received. Please check back soon.
            </p>
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://discord.gg/worldofdypians"
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
            <div
              className={"linear-border m-auto"}
              style={{
                width: "fit-content",
                background: "transparent",
              }}
            >
              <a
                href="https://t.me/worldofdypians"
                target="_blank"
                rel="noreferrer"
                className="btn outline-btn d-flex gap-1 align-items-center"
                style={{
                  background:
                    "linear-gradient(89.7deg, #1C8BBF 0.23%, #69B6DE 99.72%)",
                  border: "none",
                  textDecoration: "none",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                }}
                onClick={handleConnect}
              >
                <img src={telegram} alt="" />
                Join Telegram channel
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
                href="https://discord.gg/worldofdypians"
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
                style={{ right: "-32px", height: "50px", bottom: "50px" }}
              />
            </div>
            <img src={failed} alt="" />
            <p className="text-white m-0">
              Unable to join the World of Dypians Genesis Land NFT whitelist.
              Please try again.
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

export default LandWhitelistModal;
