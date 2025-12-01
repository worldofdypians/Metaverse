import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";

import { switchNetworkWagmi } from "../../utils/wagmiSwitchChain";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import OutsideClickHandler from "react-outside-click-handler";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";
import ChainPopup from "../Header/ChainPopup";

const MobileNavbar = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
  chainId,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,

  handleSwitchChainBinanceWallet,
  
  email,
  username,
  isConnected,
  network_matchain,
  onLogout,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [chainState, setchainState] = useState("");
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [showChainDropdown, setshowChainDropdown] = useState(false);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");
  let id = Math.random().toString(36);
  const { logout } = useAuth();

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
    }
  };

  const setActiveChain = () => {
    if (chainId) {
      if (chainId === 1) {
        setchainState("eth");
      } else if (chainId === 43114) {
        setchainState("avax");
      } else if (chainId === 8453) {
        setchainState("base");
      } else if (chainId === 56) {
        setchainState("bnb");
      }  else if (chainId === 204) {
        setchainState("opbnb");
      } else if (chainId === 1030) {
        setchainState("conflux");
      } else if (chainId === 1482601649) {
        setchainState("skale");
      } else if (chainId === 1116) {
        setchainState("core");
      } else if (chainId === 88) {
        setchainState("viction");
      } else if (chainId === 13371) {
        setchainState("immutable");
      } else if (chainId === 169) {
        setchainState("manta");
      } else if (chainId === 167000) {
        setchainState("taiko");
      } else if (chainId === 1329) {
        setchainState("sei");
      } else if (chainId === 2040) {
        setchainState("vanar");
      } else {
        setchainState("");
      }
    }
  };
  const manageDisconnect = () => {
    handleDisconnect();
    setOpenNavbar(false);
  };

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId = typeof chain === 'number' ? chain : parseInt(hexChainId, 16);
    
    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        network_matchain,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
    }
  };
  useEffect(() => {
    setActiveChain();
  }, [chainId]);

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

  const handleState = () => {
    if (!isConnected) {
      handleSignUp();
      setOpenNavbar(false);
    } else {
      setOpenNavbar(false);
    }
  };

  return (
    <>
      <div
        className="mobile-navbar d-flex d-lg-none p-3 align-items-center justify-content-between"
        id="mobileNavbar"
      >
        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={"https://cdn.worldofdypians.com/wod/metaverse.svg"}
            alt="metaverse"
            width={126}
          />
        </NavLink>
        <div className="d-flex align-items-center gap-3 justify-content-between">
          {coinbase && (
            <>
              {" "}
              <NavLink to="/notifications">
                <div className="position-relative">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bellIcon.svg"}
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
                onClick={() => {
                  setshowChainDropdown(true);
                }}
                title={
                  <span className="dropdown-title">
                    <img
                      src={
                        chainState === "eth"
                          ? "https://cdn.worldofdypians.com/wod/eth.svg"
                          : chainState === "bnb"
                          ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                          : chainState === "opbnb"
                          ? "https://cdn.worldofdypians.com/wod/opbnbChain.png"
                          : chainState === "avax"
                          ? "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                          : chainState === "base"
                          ? "https://cdn.worldofdypians.com/wod/base.svg"
                          : chainState === "conflux"
                          ? "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                          : chainState === "skale"
                          ? "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                          : chainState === "core"
                          ? "https://cdn.worldofdypians.com/wod/core.svg"
                          : chainState === "viction"
                          ? "https://cdn.worldofdypians.com/wod/viction.svg"
                          : chainState === "immutable"
                          ? "https://cdn.worldofdypians.com/wod/immutable.svg"
                          : chainState === "manta"
                          ? "https://cdn.worldofdypians.com/wod/manta.png"
                          : chainState === "taiko"
                          ? "https://cdn.worldofdypians.com/wod/taiko.svg"
                         
                          : chainState === "sei"
                          ? "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                          : chainState === "vanar"
                          ? "https://cdn.worldofdypians.com/wod/vanar.svg"
                           
                          : "https://cdn.worldofdypians.com/wod/error.svg"
                      }
                      alt=""
                      className="chain-logo-active"
                    />
                    <span className="change-chain-text d-none d-lg-flex">
                      src=
                      {chainState === "eth"
                        ? "Ethereum"
                        : chainState === "bnb"
                        ? "BNB Chain"
                        : chainState === "opbnb"
                        ? "opBNB Chain"
                        : chainState === "avax"
                        ? "Avalanche"
                        : chainState === "base"
                        ? "Base"
                        : chainState === "conflux"
                        ? "Conflux"
                        : chainState === "skale"
                        ? "SKALE"
                        : chainState === "core"
                        ? "CORE"
                        : chainState === "viction"
                        ? "Viction"
                        : chainState === "immutable"
                        ? "Immutable"
                        : chainState === "manta"
                        ? "Manta"
                        : chainState === "taiko"
                        ? "Taiko"
                        : chainState === "mat"
                        ? "Matchain"
                        : chainState === "sei"
                        ? "Sei"
                        : "Unsupported"}
                    </span>

                    <img
                      src={"https://cdn.worldofdypians.com/wod/dropdown.svg"}
                      alt=""
                    />
                  </span>
                }
              >
                 
              </DropdownButton>
            </>
          )}

          {openNavbar === false ? (
            <div
              className="position-relative hb-wrapper linear-border"
              onClick={() => setOpenNavbar(true)}
            >
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
              src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
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
          <div className="accordion" id="accordionExample4">
            <div className="">
              <h2
                className={` ${
                  (window.location.pathname.includes("/account") ||
                    window.location.pathname.includes("/auth") ||
                    window.location.pathname.includes("/join-beta") ||
                    window.location.pathname.includes("/contact-us")) &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseFour"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0 d-flex align-items-center gap-2">
                        {" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/personIcon.svg"
                          }
                          alt=""
                        />
                        Account
                      </h6>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/sidebarArrow.svg"
                      }
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseFour"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    {!email ? (
                      <NavLink
                        to={"/auth"}
                        className="header-log-btn py-2"
                        style={{ minHeight: 30 }}
                        onClick={() => setOpenNavbar(false)}
                      >
                        Log In
                      </NavLink>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <NavLink
                          to="/account"
                          end
                          className={({ isActive }) =>
                            "d-flex px-2 py-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          }
                          onClick={() => setOpenNavbar(false)}
                        >
                          <span className="header-wallet-span d-flex align-items-center gap-2">
                            <img
                              width={20}
                              height={20}
                              src={
                                "https://cdn.worldofdypians.com/wod/walletIcon.svg"
                              }
                              alt=""
                            />
                            {username}
                            <span className="header-wallet">
                              {shortAddress(coinbase)}
                            </span>
                          </span>
                        </NavLink>
                        <button
                          className="sign-out-btn w-50 py-1 d-flex align-items-center gap-2 justify-content-start"
                          onClick={() => {
                            logout();
                            onLogout();
                            setOpenNavbar(false);
                          }}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/logout.svg"
                            }
                            alt=""
                            className="logout-icon"
                          />{" "}
                          Log Out
                        </button>
                      </div>
                    )}

                    {!email && (
                      <NavLink
                        to="/account"
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                            : "d-flex px-2 align-items-center gap-2 sidebar-item text-white"
                        }
                        onClick={() => setOpenNavbar(false)}
                      >
                        {/* <span className={`sidebar-title`}> */}
                        <img
                          width={20}
                          height={20}
                          src={
                            "https://cdn.worldofdypians.com/wod/guestIcon.svg"
                          }
                          alt=""
                        />
                        Continue as Guest
                        {/* </span> */}
                      </NavLink>
                    )}
                    <hr className="header-divider my-0" />
                    <NavLink
                      to={"/ai-agent"}
                      end
                      onClick={() => setOpenNavbar(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      <img
                        width={20}
                        height={20}
                        src={
                          "https://cdn.worldofdypians.com/wod/oryn-transparent.png"
                        }
                        alt=""
                      />
                      <span className={`sidebar-title`}>Oryn AI Agent</span>
                    </NavLink>
                    <hr className="header-divider my-0" />
                    <NavLink
                      to="/account/prime"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={
                          "https://cdn.worldofdypians.com/wod/premiumIcon.svg"
                        }
                        alt=""
                      />

                      <span className={`sidebar-title`}>Prime</span>
                    </NavLink>

                    <NavLink
                      to="/join-beta"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <img
                        width={20}
                        height={20}
                        src={
                          "https://cdn.worldofdypians.com/wod/joinBetaIcon.svg"
                        }
                        alt=""
                      />

                      <span className={`sidebar-title mb-0`}>
                        Become Beta Tester
                      </span>
                    </NavLink>

                    <NavLink
                      to="/contact-us"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          width={20}
                          height={20}
                          src={
                            "https://cdn.worldofdypians.com/wod/supportIcon.svg"
                          }
                          alt=""
                        />
                        <span className={`sidebar-title`}>Contact Us</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="">
              <h2
                className={`${
                  (window.location.pathname.includes("/token") ||
                    window.location.pathname.includes("/staking") ||
                    window.location.pathname.includes("/launchpool") ||
                    window.location.pathname.includes("/bridge")) &&
                  "mobile-nav-item-active"
                }
                mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">WOD</h6>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/sidebarArrow.svg"
                      }
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/token"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Token</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/staking"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Staking</span>
                    </NavLink>
                    <NavLink
                      to="/launchpool"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Launchpool</span>
                    </NavLink>
                    <NavLink
                      to="/bridge"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Bridge</span>
                    </NavLink>
                    <NavLink
                      to="/token-claim"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Claim</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mobile-nav-item d-flex align-items-center justify-content-between p-2">
            <NavLink
              to="/tokenomics"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">WOD</h6>
              <img src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"} alt="arrow" />{" "}
            </NavLink>
          </div> */}

          <div
            className={`${
              window.location.pathname.includes("/game") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/game"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Game</h6>
              <img
                src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"}
                alt="arrow"
              />{" "}
            </NavLink>
          </div>

          <div
            className={`${
              window.location.pathname.includes("/shop") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/shop"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Shop</h6>
              <img
                src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"}
                alt="arrow"
              />{" "}
            </NavLink>
          </div>
          <div
            className={`${
              window.location.pathname.includes("/map") &&
              "mobile-nav-item-active"
            } mobile-nav-item d-flex align-items-center justify-content-between p-2`}
          >
            <NavLink
              to="/map"
              className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
              style={{ textDecoration: "none" }}
              onClick={() => setOpenNavbar(false)}
            >
              <h6 className="mobile-nav-link font-poppins mb-0">Map</h6>
              <img
                src={"https://cdn.worldofdypians.com/wod/mobileArrow.svg"}
                alt="arrow"
              />{" "}
            </NavLink>
          </div>
          <div className="accordion" id="accordionExample2">
            <div className="">
              <h2
                className={`${
                  (window.location.pathname.includes("/governance") ||
                    window.location.pathname.includes("/campaigns") ||
                    window.location.pathname.includes("/game-updates")) &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">Community</h6>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/sidebarArrow.svg"
                      }
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/governance"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Governance</span>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/campaigns"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title mb-0`}>
                        Game Campaigns
                      </span>
                    </NavLink>
                    <NavLink
                      to={"https://medium.com/@worldofdypians"}
                      target="_blank"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Game Updates</span>
                    </NavLink>
                    <NavLink
                      to="/keep-building"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span
                        className={`sidebar-title d-flex align-items-center gap-2`}
                      >
                        Keep Building Program{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/kickstartIcon.svg"
                          }
                          height={20}
                          width={20}
                          alt=""
                        />
                      </span>
                    </NavLink>
                    <NavLink
                      to={"https://t.me/WorldOfDypians_bot"}
                      target="_blank"
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item text-white"
                      }
                    >
                      Telegram Mini App
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/tgVerified.svg"
                        }
                        height={20}
                        width={20}
                        alt=""
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion" id="accordionExample3">
            <div className="">
              <h2
                className={`${
                  window.location.pathname.includes("/about") &&
                  "mobile-nav-item-active"
                } mobile-nav-item d-flex align-items-center justify-content-between p-2 mb-0`}
                id="headingOne"
              >
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                  className="w-100"
                >
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="sidebar-title mb-0">About</h6>
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/sidebarArrow.svg"
                      }
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse
              
                
                `}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-2 p-0">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/about#tokenomics"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#tokenomics"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Tokenomics</span>
                    </NavLink>
                     <NavLink
                      to="/about#reserve"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#reserve"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Reserve</span>
                    </NavLink>
                    <NavLink
                      to="/about#security"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#security"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Security</span>
                    </NavLink>
                    <NavLink
                      to="/about#roadmap"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#roadmap"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title mb-0`}>Roadmap</span>
                    </NavLink>
                    <NavLink
                      to="/about#ourteam"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#ourteam"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Team</span>
                    </NavLink>
                    <NavLink
                      to="/about#partners"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#partners"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex px-2 align-items-center gap-2 sidebar-item`
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <div className="d-flex align-items-center gap-5">
                        <span className={`sidebar-title`}>Partners</span>
                      </div>
                    </NavLink>

                    <NavLink
                      to="/about#brand"
                      end
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#brand"
                          ? "d-flex px-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex px-2 align-items-center gap-2 sidebar-item"
                      }
                      onClick={() => setOpenNavbar(false)}
                    >
                      <span className={`sidebar-title`}>Brand</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 d-flex align-items-center justify-content-center gap-3">
            <div className="w-100">
              <button
                className="new-connect-btn p-2 w-100"
                style={{ minHeight: 30 }}
                onClick={() => {
                  handleState();
                }}
              >
                {!coinbase ? "Connect Wallet" : shortAddress(coinbase)}
              </button>{" "}
            </div>
            {isConnected && (
              <button
                className="sign-out-btn p-2  d-flex align-items-center gap-2 justify-content-start"
                onClick={() => {
                  manageDisconnect();
                }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/logout.svg"}
                  alt=""
                  className="logout-icon"
                />
                DISCONNECT
              </button>
            )}
            {/* 
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
            )} */}
          </div>
        </div>
      </OutsideClickHandler>
      {showChainDropdown && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setshowChainDropdown(false);
          }}
        >
          <ChainPopup
            onClose={() => {
              setshowChainDropdown(false);
            }}
            onDisconnect={manageDisconnect}
            onSwitchNetwork={(hexchain, chain) => {
              switchNetwork(hexchain, chain);
            }}
            activeChain={chainState}
            isMobile={true}
            isPremium={false}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default MobileNavbar;
