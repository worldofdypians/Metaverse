import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import whitewallet from "../../assets/wallet-white.svg";
import blackwallet from "../../assets/wallet-black.svg";

import { shortAddress } from "../../screens/Caws/functions/shortAddress";

import "./_checkWhitelistModal.scss";

const RegisterModal = ({
  open,
  onClose,
  handleConnect,
  coinbase,
  showForms,
  openRegister,
  donwloadSelected,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min-content",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    borderRadius: "8px",
    overflowX: "hidden",
  };

  const options = [
    {
      name: "Metamask",
      icon: "metamask.png",
    },
  ];

  const [showOptions, setShowOptions] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const checkData = async () => {
    if (coinbase) {
      let result = window.checkWhitelistWod(coinbase);
      if (result == 1) {
        if (donwloadSelected == true)
          window.location.href =
            "https://drive.google.com/file/d/1pyRTB0_Lr27p_eIg3yRqQYLPSWBnyePp/view";
        else
          window.location.href =
            "https://protaldyp.d3if9fd90qiqrq.amplifyapp.com/auth";
      }
    }
  };

  useEffect(() => {
    checkData();
  }, [coinbase]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <div className="d-flex justify-content-between gap-1">
            <h2 className="font-organetto register-grid-title px-0">
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
              style={{ bottom: "25px", right: "-25px", height: "50px" }}
            />
          </div>
          <div className="d-flex flex-column gap-3">
            {coinbase ? (
              <p className="text-white m-0 walletdesc font-poppins">
                You must join the whitelist first to be part of the beta tester
                users that will have access to World of Dypians. If you have
                already joined the whitelist, please check back soon.
              </p>
            ) : (
              <p className="text-white m-0 walletdesc font-poppins">
                Please connect your wallet to verify if you are whitelisted as a
                Beta Tester.
              </p>
            )}
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
              <div
                className="linear-border"
                style={{
                  width: "fit-content",
                  margin: "2rem auto auto auto",
                }}
              >
                <button
                  className="btn filled-btn px-5"
                  onClick={() => {
                    onClose();
                    openRegister();
                  }}
                >
                  Join Whitelist
                </button>
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
