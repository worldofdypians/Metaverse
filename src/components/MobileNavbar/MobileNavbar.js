import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import mobileArrow from "../../assets/navbarAssets/mobileArrow.svg";
import xMark from "../../assets/navbarAssets/xMark.svg";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "../Header/assets/person.svg";
import check from "../Header/assets/check.svg";
import copy from "../Header/assets/copy.svg";
import bellIcon from "./assets/bellIcon.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Clipboard from "react-clipboard.js";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import avax from "../Header/assets/avax.svg";
import bnb from "../Header/assets/bnb.svg";
import eth from "../Header/assets/eth.svg";
import base from "../Header/assets/base.svg";
import conflux from "../Header/assets/conflux.svg";
import skale from "../Header/assets/skale.svg";
import sei from "../Header/assets/sei.svg";
import viction from "../Header/assets/viction.svg";
import core from "../Header/assets/core.svg";
import manta from "../Header/assets/manta.png";
import immutable from "../Header/assets/immutableLogo.svg";
import taiko from "../Header/assets/taiko.svg";

import error from "../Header/assets/error.svg";
import dropdown from "../Header/assets/dropdown.svg";
import OutsideClickHandler from "react-outside-click-handler";

const MobileNavbar = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
  chainId,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  domainName,
  handleOpenDomains,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [opbnbState, setopBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [confluxState, setConfluxState] = useState(false);
  const [skaleState, setSkaleState] = useState(false);
  const [coreState, setCoreState] = useState(false);
  const [mantaState, setMantaState] = useState(false);
  const [victionState, setVictionState] = useState(false);
  const [seiState, setSeiState] = useState(false);
  const [immutableState, setImmutableState] = useState(false);
  const [taikoState, setTaikoState] = useState(false);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");
  let id = Math.random().toString(36);

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
    }
  };

  const setActiveChain = () => {
    if (chainId) {
      if (chainId === 1) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(true);
        setCoreState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 43114) {
        setAvaxState(true);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 8453) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(true);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 56) {
        setAvaxState(false);
        setBnbState(true);
        setEthState(false);
        setBaseState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 204) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setopBnbState(true);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 1030) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(true);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setMantaState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 1482601649) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(true);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setMantaState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 1116) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(true);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 88) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(true);
        setSeiState(false);
        setImmutableState(false);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 13371) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(true);
        setMantaState(false);
        setTaikoState(false);
      } else if (chainId === 169) {
        setAvaxState(false);
        setBnbState(false);
        setMantaState(true);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(false);
      } else if (chainId === 167000) {
        setAvaxState(false);
        setBnbState(false);
        setMantaState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(true);
      }
      // else if (chainId === 713715 ) {
      //   setAvaxState(false);
      //   setBnbState(false);
      //   setEthState(false);
      //   setBaseState(false);
      //   setConfluxState(false);
      //   setopBnbState(false);
      //   setSkaleState(false);
      //   setCoreState(false);
      //   setVictionState(false);
      //   setSeiState(true)
      // }
      else {
        setAvaxState(false);
        setBnbState(false);
        setBaseState(false);
        setEthState(false);
        setopBnbState(false);
        setSkaleState(false);
        setCoreState(false);
        setVictionState(false);
        setSeiState(false);
        setImmutableState(false);
        setTaikoState(false);
      }
    }
  };

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        handleSwitchChainGateWallet();
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  useEffect(() => {
    if (chainId === 1) {
      handleSwitchNetwork(1);
    }

    if (chainId === 56) {
      handleSwitchNetwork(56);
    }

    if (chainId === 8453) {
      handleSwitchNetwork(8453);
    }

    if (chainId === 1482601649) {
      handleSwitchNetwork(1482601649);
    }
  }, [chainId, coinbase]);

  useEffect(() => {
    setActiveChain();
  }, [chainId, ethState]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  useEffect(() => {
    if (openNavbar === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNavbar]);

  return (
    <>
      <div
        className="mobile-navbar d-flex d-lg-none p-3 align-items-center justify-content-between"
        id="mobileNavbar"
      >
        <NavLink to="/">
          <img src={metaverse} alt="metaverse" width={126} />
        </NavLink>
        <div className="d-flex align-items-center gap-3 justify-content-between">
          {coinbase && (
            <>
              {" "}
              <NavLink to="/notifications">
                <div className="position-relative">
                  <img
                    src={bellIcon}
                    width={30}
                    style={{ cursor: "pointer" }}
                    height={30}
                    alt=""
                  />

                  {unreadNotifications > 0 && (
                    <div className="bell-amount">
                      <span className="mb-0">
                        {unreadNotifications > 99 ? "99+" : unreadNotifications}
                      </span>
                    </div>
                  )}
                </div>
              </NavLink>
              <DropdownButton
                id="dropdown-basic-button"
                className="d-flex align-items-center justify-content-center"
                title={
                  <span className="dropdown-title">
                    <img
                      src={
                        ethState === true
                          ? eth
                          : bnbState === true
                          ? bnb
                          : opbnbState === true
                          ? bnb
                          : avaxState === true
                          ? avax
                          : baseState === true
                          ? base
                          : confluxState === true
                          ? conflux
                          : skaleState === true
                          ? skale
                          : coreState === true
                          ? core
                          : victionState === true
                          ? viction
                          : immutableState === true
                          ? immutable
                          : mantaState === true
                          ? manta
                          : taikoState === true
                          ? taiko
                          : // : seiState === true
                            // ? sei
                            error
                      }
                      height={16}
                      width={16}
                      alt=""
                    />
                    <span className="change-chain-text d-none d-lg-flex">
                      {ethState === true
                        ? "Ethereum"
                        : bnbState === true
                        ? "BNB Chain"
                        : opbnbState === true
                        ? "opBNB Chain"
                        : avaxState === true
                        ? "Avalanche"
                        : baseState === true
                        ? "Base"
                        : confluxState === true
                        ? "Conflux"
                        : skaleState === true
                        ? "SKALE"
                        : coreState === true
                        ? "CORE"
                        : victionState === true
                        ? "Viction"
                        : immutableState === true
                        ? "Immutable"
                        : mantaState === true
                        ? "Manta"
                        : taikoState === true
                        ? "Taiko"
                        : // : seiState === true
                          // ? "Sei"
                          "Unsupported"}
                    </span>

                    <img src={dropdown} alt="" />
                  </span>
                }
              >
                <Dropdown.Item onClick={() => switchNetwork("0x1", 1)}>
                  <img src={eth} alt="" />
                  Ethereum
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x38", 56)}>
                  <img src={bnb} alt="" />
                  BNB Chain
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0xa9", 169)}>
                  <img src={manta} alt="" />
                  Manta
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0xcc", 204)}>
                  <img src={bnb} alt="" />
                  opBNB Chain
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x28c58", 167000)}>
                  <img src={taiko} width={20} height={20} alt="" />
                  Taiko
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x45c", 1116)}>
                  <img src={core} width={20} height={20} alt="" />
                  CORE
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => switchNetwork("0x585eb4b1", 1482601649)}
                >
                  <img src={skale} alt="" />
                  SKALE
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x406", 1030)}>
                  <img src={conflux} alt="" />
                  Conflux
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x343b", 13371)}>
                  <img src={immutable} width={20} height={20} alt="" />
                  Immutable
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0x2105", 8453)}>
                  <img src={base} alt="" />
                  Base
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleSeiPool()}>
                    <img src={sei} width={20} height={20} alt="" />
                    Sei
                  </Dropdown.Item>*/}
                <Dropdown.Item onClick={() => switchNetwork("0x58", 88)}>
                  <img src={viction} width={20} height={20} alt="" />
                  Viction
                </Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork("0xa86a", 43114)}>
                  <img src={avax} alt="" />
                  Avalanche
                </Dropdown.Item>
              </DropdownButton>
            </>
          )}

          {openNavbar === false ? (
            <div className="linear-border" onClick={() => setOpenNavbar(true)}>
              <button
                className="px-4 bg-transparent"
                style={{ clipPath: "none", border: "none" }}
                id="hamburgermenu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          ) : (
            <img
              src={xMark}
              alt="x mark"
              style={{ position: "relative", right: "18px", marginLeft: 10 }}
              onClick={() => setOpenNavbar(false)}
            />
          )}
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenNavbar(false)}>
        <div
          className={`mobile-menu ${
            openNavbar && "mobile-menu-open"
          } d-flex d-lg-none p-3 flex-column gap-3`}
          id="bgmenu"
        >
          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/explorer"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Explore</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>
          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/tokenomics"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">WOD</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/land"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Land</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/marketplace"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Marketplace</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>
          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/community"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Community</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>
          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/roadmap"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Roadmap</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/news"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">News</h6>
              <img src={mobileArrow} alt="arrow" />{" "}
            </NavLink>
          </div>

          <div className="w-100 d-flex align-items-center justify-content-center gap-3">
            {!coinbase ? (
              <div className="linearborder2">
                <button
                  className="btn connectwallet px-3"
                  onClick={() => {
                    handleSignUp();
                    setOpenNavbar(false);
                  }}
                >
                  Connect Wallet
                </button>{" "}
              </div>
            ) : coinbase && !domainName ? (
              <div className="d-flex align-items-center gap-3">
                <Clipboard
                  component="div"
                  data-event="click"
                  data-for={id}
                  data-tip="Copied To Clipboard!"
                  data-clipboard-text={coinbase}
                  className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative bg-transparent"
                >
                  <div
                    className="btn connected px-3"
                    style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                    onClick={() => {
                      setTooltip(true);
                      setTimeout(() => setTooltip(false), 2000);
                    }}
                  >
                    {shortAddress(coinbase)}{" "}
                    <img src={tooltip ? check : copy} alt="" />
                  </div>
                  <div
                    className="btn pill-btn px-3"
                    style={{ fontSize: 12 }}
                    onClick={() => {
                      handleOpenDomains();
                      setOpenNavbar(false);
                    }}
                  >
                    Domain Name
                  </div>
                </Clipboard>
              </div>
            ) : domainName ? (
              <div
                className="d-flex align-items-center gap-3"
                onClick={() => {
                  handleOpenDomains();
                  setOpenNavbar(false);
                }}
              >
                <Clipboard
                  component="div"
                  data-event="click"
                  data-for={id}
                  data-tip="Copied To Clipboard!"
                  data-clipboard-text={coinbase}
                  className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative bg-transparent"
                >
                  <div
                    className="btn connected px-3"
                    style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                    onClick={() => {
                      setTooltip(true);
                      setTimeout(() => setTooltip(false), 2000);
                    }}
                  >
                    {domainName}{" "}
                  </div>
                </Clipboard>
              </div>
            ) : (
              <></>
            )}

            {!coinbase ? (
              <NavLink
                to={"/account"}
                onClick={() => {
                  setOpenNavbar(false);
                }}
              >
                <img src={person} className="account-icon" alt="" />
              </NavLink>
            ) : (
              <NavLink
                to={"/account"}
                onClick={() => {
                  setOpenNavbar(false);
                }}
              >
                <img
                  src={avatar === null ? person : avatar}
                  className="account-icon"
                  alt=""
                  // onClick={handleRedirect}
                  onClick={() => {
                    setOpenNavbar(false);
                  }}
                />
              </NavLink>
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default MobileNavbar;
