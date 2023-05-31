import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import whitewallet from "../../assets/wallet-white.svg";
import blackwallet from "../../assets/wallet-black.svg";

import { shortAddress } from "../../screens/Caws/functions/shortAddress";

import "./_checkWhitelistModal.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

const RegisterModal = ({
  open,
  onClose,
  handleConnect,
  coinbase,
  showForms,
  openRegister,
  donwloadSelected,
  cawsMinted,
  cawsStaked,
  landMinted,
  landStaked,
  handleRedirect,
  handleActiveUser
}) => {
  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "30%" : windowSize.width > 786 ? "50%" : "90%",
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
    {
      name: "Coin98",
      icon: "coin98.png",
    },
  ];

  const [showOptions, setShowOptions] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [activeUser, setactiveUser] = useState(false);

  const [status, setStatus] = useState();
  const [nftresult, setResult] = useState(0);

  const checkData = async () => {
    if (coinbase) {
      let result = window.checkWhitelistWod(coinbase);
      console.log(result);

      if (result === 1 || nftresult > 0) {
        setactiveUser(true)
        handleActiveUser(true)
        if (donwloadSelected === true)
          window.location.href =
            "https://drive.google.com/drive/folders/1zURuJDGoePa9V1GMkTGTbKMcaFd4UScp?usp=sharing";
        else {
          handleRedirect();
          onClose();
        }
      }
      else {
        setactiveUser(false)
        handleActiveUser(false)
      }
    }
  };

  const checkBetaTester = async () => {
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
    checkData();
    checkBetaTester();
  }, [coinbase, nftresult]);

  useEffect(() => {
    const sum = cawsMinted + cawsStaked + landMinted + landStaked;
    setResult(sum);
  }, [cawsMinted, cawsStaked, landMinted, landStaked, coinbase]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <div className="d-flex justify-content-between gap-1">
            {showForms === true ? (
              <h2 className="font-organetto register-grid-title px-0">
                Access{" "}
                <mark className="font-organetto register-tag">
                  Unsuccessful
                </mark>
              </h2>
            ) : (
              <h2 className="font-organetto register-grid-title px-0">
                Verify{" "}
                <mark className="font-organetto register-tag">Access</mark>
              </h2>
            )}
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
                Please apply as a beta tester in order to access World of
                Dypians. If you have already applied as a beta tester please
                check back soon.
              </p>
            ) : (
              <p className="text-white m-0 walletdesc font-poppins">
                Please connect your wallet to verify if you are selected as a
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
                <p
                  className="m-0 wallettext font-poppins"
                  style={{ whiteSpace: "pre" }}
                >
                  Wallet address
                </p>
                <p className="purpledesc m-0">{shortAddress(coinbase)}</p>
              </div>
              <div className="separator"></div>
              <NavLink to="join-beta">
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
                      // openRegister();
                    }}
                  >
                    Join Beta
                  </button>
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
