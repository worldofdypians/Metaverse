import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import whitelistIcon from "../../assets/whitelist-icon.svg";
import whitewallet from "../../assets/wallet-white.svg";

import "./_registerModal.scss";

const RegisterModal = ({ open, onClose, handleConnect, coinbase }) => {
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

  const [showOptions, setShowOptions] = useState(false);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
            You will be eligible to be part of the beta testers team based on
            the details you provide
          </p>
          <div className="d-flex gap-1 align-items-center">
            <img src={whitelistIcon} alt="" />
            <span className="text-white whitedesc">
              <mark className="font-poppins register-tag">500</mark>/500 seats
            </span>
          </div>
          <p className="text-white m-0 walletdesc font-poppins">
            Seats available for this round
          </p>
        </div>
        <div className="separator"></div>

        <div
          className={showOptions === false ? "linear-border m-auto" : "m-auto"}
          style={{ width: showOptions === false ? "fit-content" : "" }}
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
                    <div key={index} className="optionwrapper" onClick={handleConnect}>
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
      </Box>
    </Modal>
  );
};

export default RegisterModal;
