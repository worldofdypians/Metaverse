import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import OutsideClickHandler from "react-outside-click-handler";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";
import axios from "axios";
import ChainPopup from "./ChainPopup";

const Header = ({
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
  handleSwitchChainBinanceWallet,
  handleOpenDomains,
  domainName,
  onSigninClick,
  onLogout,
  binanceWallet,
  authToken,
  gameAccount,
  email,
  username,
  loginListener,
  onSyncClick,
  network_matchain,
  openKickstarter,
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const [showmenuAccount, setshowmenuAccount] = useState(false);
  const [showChainDropdown, setshowChainDropdown] = useState(false);

  const [, setisUnread] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [chainState, setchainState] = useState("");

  const [account, setAccount] = useState({
    logged: false,
    wallet: false,
    linked: false,
    guest: false,
  });
  const [dropdown, setDropdown] = useState({
    wod: null,
    game: null,
    community: null,
    about: null,
    collections: null,
    account: null,
    chains: null,
  });

  // const [domainPopup, setDomainPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);
  const { logout } = useAuth();

  // let id = Math.random().toString(36);

  const manageDisconnect = () => {
    handleDisconnect();
    setshowChainDropdown(false);
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
      } else if (chainId === 698) {
        setchainState("mat");
      } else if (chainId === 204) {
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
      } else if (chainId === 841) {
        setchainState("taraxa");
      } else {
        setchainState("");
      }
    }
  };
  const handleDropdown = (key) => {
    setDropdown((prevState) => ({
      ...Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = curr === key ? key : null;
        return acc;
      }, {}),
    }));
  };

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        handleSwitchChainGateWallet(chain);
      } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
        network_matchain?.showChangeNetwork();
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(chain);
      }
    } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(chain);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  async function markNotificationAsRead(walletAddress, notificationId) {
    try {
      await axios.patch(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("Notification marked as read", notificationId);
      handleRefreshList();
    } catch (error) {
      console.error("Error marking notification as read:", error.message);
    }
  }

  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = Math.floor(nftTimestamp / 1000);
    const difference = seconds - oldTimestamp;
    let output = ``;

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
      if (count > 0) {
        setisUnread(true);
      } else if (count === 0) {
        setisUnread(false);
      }
    }
  };

  useEffect(() => {
    setActiveChain();
  }, [chainId]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  useEffect(() => {
    if (email !== undefined && gameAccount !== undefined && coinbase) {
      if (gameAccount.toLowerCase() === coinbase.toLowerCase()) {
        setAccount({
          logged: true,
          wallet: gameAccount,
          linked: gameAccount,
          guest: true,
        });
      } else if (gameAccount.toLowerCase() !== coinbase.toLowerCase()) {
        setAccount({
          logged: true,
          wallet: gameAccount,
          linked: false,
          guest: true,
        });
      }
    } else if (!email && coinbase) {
      setAccount({
        logged: false,
        wallet: coinbase,
        linked: true,
        guest: true,
      });
    } else if (email && !coinbase) {
      setAccount({
        logged: true,
        wallet: gameAccount,
        linked: true,
        guest: true,
      });
    } else if (!email && !coinbase) {
      setAccount({
        logged: false,
        wallet: false,
        linked: false,
        guest: true,
      });
    }
  }, [email, gameAccount, coinbase, loginListener]);

  // useEffect(() => {
  // setDropdown({
  //   wod: null,
  //   game: null,
  //   community: null,
  //   about: null,
  //   collections: null,
  //   account: "account",
  // });
  // }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="d-none d-lg-flex navbar-wrapper px-3"
          style={{ zIndex: location.pathname.includes("map") ? "1000" : "7" }}
        >
          <div className="row justify-content-between mx-0 w-100">
            <div className="col-7 col-xl-7 col-xxl-7 d-flex align-items-center justify-content-start gap-5 ps-0">
              <NavLink
                to="/"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/metaverse.svg"}
                  alt="metaverse"
                  height={32}
                />
              </NavLink>
              <div
                className={` nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2 ${
                  location.pathname === "/token" ||
                  location.pathname === "/token-claim" ||
                  location.pathname === "/staking" ||
                  location.pathname === "/bridge" ||
                  location.pathname === "/launchpool" ||
                  location.pathname === "/buy"
                    ? "nav-anchor activenavlink"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleDropdown("wod")}
                onMouseLeave={() => handleDropdown(null)}
              >
                WOD
                <img
                  src={"https://cdn.worldofdypians.com/wod/headerArrow.svg"}
                  alt=""
                />
                <div
                  className={`header-dropdown p-2  ${
                    dropdown.wod === "wod" ? "header-dropdown-active" : ""
                  }`}
                >
                  <div className="position-relative d-flex flex-column gap-2">
                    <div className="triangle"></div>

                    <NavLink
                      to={"/token"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Token
                    </NavLink>
                    <NavLink
                      to={"/staking"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Staking
                    </NavLink>
                    <NavLink
                      to={"/launchpool"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Launchpool
                    </NavLink>
                    <NavLink
                      to={"/bridge"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Bridge
                    </NavLink>
                    <NavLink
                      to={"/token-claim"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Claim
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* <div className="nav-anchor">Roadmap</div> */}

              <NavLink
                to="/game"
                className={({ isActive }) =>
                  isActive ? "nav-anchor activenavlink" : "nav-anchor"
                }
              >
                Game
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "nav-anchor activenavlink" : "nav-anchor"
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/map"
                className={({ isActive }) =>
                  isActive ? "nav-anchor activenavlink" : "nav-anchor"
                }
              >
                Map
              </NavLink>
              <div
                className={` nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2
               ${
                 location.pathname === "/governance" ||
                 location.pathname === "/campaigns" ||
                 location.pathname === "/game-updates"
                   ? "nav-anchor activenavlink"
                   : ""
               }
               `}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleDropdown("community")}
                onMouseLeave={() => handleDropdown(null)}
              >
                Community
                <img
                  src={"https://cdn.worldofdypians.com/wod/headerArrow.svg"}
                  alt=""
                />
                <div
                  className={`header-dropdown  p-2 d-flex flex-column gap-2 ${
                    dropdown.community === "community"
                      ? "header-dropdown-active"
                      : ""
                  }`}
                >
                  <div className="position-relative d-flex flex-column gap-2">
                    <div className="triangle"></div>
                    <NavLink
                      to={"/governance"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Governance
                    </NavLink>
                    <NavLink
                      to={"/campaigns"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Game Campaigns
                    </NavLink>
                    <NavLink
                      to={"/game-updates"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Game Updates
                    </NavLink>
                    <NavLink
                      to={"https://t.me/WorldOfDypians_bot"}
                      target="_blank"
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                          : "dropdown-nav p-2 d-flex align-items-center gap-2"
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
                    <hr className="header-divider my-0" />
                    <div className="d-flex align-items-center justify-content-between px-2 mb-2">
                      <a
                        href="https://twitter.com/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/twitterHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://t.me/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/telegramHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://discord.gg/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/discordHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://github.com/worldofdypians/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/githubHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://www.instagram.com/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/instagramHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-between px-2 mb-2">
                      <a
                        href="https://www.facebook.com/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/facebookHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/@worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/youtubeHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://medium.com/@worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/mediumHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="mailto:contact@worldofdypians.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/emailHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/worldofdypians"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/linkedinHeader.svg"
                          }
                          width={25}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2 `}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleDropdown("about")}
                onMouseLeave={() => handleDropdown(null)}
              >
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-anchor activenavlink" : "nav-anchor"
                  }
                >
                  About
                </NavLink>
                <img
                  src={"https://cdn.worldofdypians.com/wod/headerArrow.svg"}
                  alt=""
                />
                <div
                  className={`header-dropdown p-2 d-flex flex-column gap-2 ${
                    dropdown.about === "about" ? "header-dropdown-active" : ""
                  }`}
                >
                  <div className="position-relative d-flex flex-column gap-2">
                    <div className="triangle"></div>
                    <NavLink
                      to={"/about#tokenomics"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#tokenomics"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Tokenomics
                    </NavLink>
                    <NavLink
                      to={"/about#security"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#security"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Security
                    </NavLink>
                    <NavLink
                      to={"/about#roadmap"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#roadmap"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Roadmap
                    </NavLink>
                    <NavLink
                      to={"/about#ourteam"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#ourteam"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Team
                    </NavLink>

                    <NavLink
                      to={"/about#partners"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#partners"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Partners
                    </NavLink>

                    <NavLink
                      to={"/about#brand"}
                      className={({ isActive }) =>
                        isActive && window.location.hash === "#brand"
                          ? "dropdown-nav nav-active p-2"
                          : "dropdown-nav p-2"
                      }
                    >
                      Brand
                    </NavLink>
                  </div>
                </div>
              </div>
              <NavLink
                to={"/keep-building"}
                className="d-flex align-items-center gap-2 kickstarter-header-item p-2"
              >
                <img
                  src="https://cdn.worldofdypians.com/wod/kickstartIcon.svg"
                  alt=""
                />
                <div
                  className={`nav-anchor kickstarter-anchor`}
                  style={{ cursor: "pointer" }}
                >
                  Keep Building
                </div>
              </NavLink>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-3 pe-0 position-relative ">
              <div
                className="h-100 d-flex align-items-center justify-content-center position-relative"
                onMouseEnter={() => handleDropdown("account")}
                onMouseLeave={() => handleDropdown(null)}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <div
                    className="d-flex align-items-center gap-2  account-btn-hover p-2 h-100"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={"https://cdn.worldofdypians.com/wod/personIcon.svg"}
                      alt=""
                    />
                    <h6 className="mb-0 account-txt">
                      {username !== undefined && email !== undefined
                        ? username
                        : "Account"}
                    </h6>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/headerArrow.svg"}
                      alt=""
                    />

                    <div
                      className={`header-dropdown  p-4 d-flex flex-column gap-2 ${
                        dropdown.account === "account"
                          ? "header-dropdown-active"
                          : ""
                      }`}
                    >
                      <div className="position-relative d-flex flex-column gap-2">
                        <div
                          className="triangle"
                          style={{ top: "-40px" }}
                        ></div>
                        {account.logged === false ? (
                          <>
                            <NavLink
                              to={"/auth"}
                              className="header-log-btn py-2"
                            >
                              Log In
                            </NavLink>
                            <hr className="header-divider my-0" />
                            <NavLink
                              to={"/account"}
                              className={({ isActive }) =>
                                isActive
                                  ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                                  : "dropdown-nav p-2 d-flex align-items-center gap-2"
                              }
                            >
                              <img
                                width={20}
                                height={20}
                                src={
                                  "https://cdn.worldofdypians.com/wod/guestIcon.svg"
                                }
                                alt=""
                              />
                              Continue as Guest
                            </NavLink>
                            <NavLink
                              to={"/auth"}
                              className={({ isActive }) =>
                                isActive
                                  ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                                  : "dropdown-nav p-2 d-flex align-items-center gap-2"
                              }
                            >
                              <img
                                width={20}
                                height={20}
                                src={
                                  "https://cdn.worldofdypians.com/wod/registerIcon.svg"
                                }
                                alt=""
                              />
                              Sign Up
                            </NavLink>
                            <hr className="header-divider my-0" />
                          </>
                        ) : account.logged === true &&
                          account.guest === true ? (
                          <>
                            <NavLink
                              to={"/account"}
                              className={({ isActive }) =>
                                isActive
                                  ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2 position-relative"
                                  : "dropdown-nav nav-active p-2 d-flex align-items-center gap-2 position-relative"
                              }
                            >
                              <img
                                width={20}
                                height={20}
                                src={
                                  "https://cdn.worldofdypians.com/wod/userIcon.svg"
                                }
                                alt=""
                              />
                              {username ?? "Guest"}
                              <img
                                src={
                                  account.linked === false
                                    ? "https://cdn.worldofdypians.com/wod/unlinkedIcon.svg"
                                    : "https://cdn.worldofdypians.com/wod/linkedIcon.svg"
                                }
                                className="link-icon"
                                width={20}
                                height={20}
                                alt=""
                              />
                            </NavLink>

                            <div
                              className={`dropdown-nav ${
                                account.linked === false
                                  ? "account-not-linked"
                                  : ""
                              } nav-active p-2 d-flex align-items-center gap-2`}
                            >
                              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    width={20}
                                    height={20}
                                    src={
                                      "https://cdn.worldofdypians.com/wod/walletIcon.svg"
                                    }
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-2">
                                    <span className="header-wallet-span">
                                      Wallet Address
                                    </span>
                                    <span className="header-wallet">
                                      {account.wallet !== false
                                        ? shortAddress(account.wallet)
                                        : "NA"}
                                    </span>
                                  </div>
                                </div>
                                {account.linked === false && (
                                  <button
                                    className="d-flex align-items-center gap-1 syncbtn px-2 py-1"
                                    onClick={onSyncClick}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/sync.svg"
                                      }
                                      alt=""
                                    />{" "}
                                    Sync
                                  </button>
                                )}
                              </div>
                            </div>
                            <hr className="header-divider my-0" />
                          </>
                        ) : (
                          <></>
                        )}
                        <NavLink
                          to={"/ai-agent"}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                              : "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={40}
                            height={40}
                            src={
                              "https://cdn.worldofdypians.com/wod/oryn-transparent.png"
                            }
                            alt=""
                          />
                          Oryn AI Agent
                        </NavLink>
                        <hr className="header-divider my-0" />
                        <NavLink
                          to={"/account/prime"}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                              : "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/premiumIcon.svg"
                            }
                            alt=""
                          />
                          Prime
                        </NavLink>

                        <NavLink
                          to={"/shop"}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                              : "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/cartIcon.svg"
                            }
                            alt=""
                          />
                          Shop
                        </NavLink>
                        <NavLink
                          to={"/join-beta"}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                              : "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/joinBetaIcon.svg"
                            }
                            alt=""
                          />
                          Become a Beta Tester
                        </NavLink>
                        <a
                          href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                          target="_blank"
                          rel="noreferrer"
                          className={
                            "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                            }
                            alt=""
                          />
                          Download
                        </a>
                        <NavLink
                          to={"/contact-us"}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                              : "dropdown-nav p-2 d-flex align-items-center gap-2"
                          }
                        >
                          <img
                            width={20}
                            height={20}
                            src={
                              "https://cdn.worldofdypians.com/wod/supportIcon.svg"
                            }
                            alt=""
                          />
                          Contact us
                        </NavLink>
                        {email && (
                          <>
                            <hr className="header-divider my-0" />
                            <button
                              className="sign-out-btn py-1 d-flex align-items-center gap-2 justify-content-start"
                              onClick={() => {
                                logout();
                                onLogout();
                                setshowmenuAccount(false);
                                setAccount({
                                  logged: false,
                                  wallet: coinbase,
                                  linked: false,
                                  guest: true,
                                });
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!coinbase ? (
                // <div className="linearborder2">
                //   <button
                //     className="btn connectwallet px-3"
                //     onClick={handleSignUp}
                //   >
                //     Connect Wallet
                //   </button>{" "}
                // </div>
                <button className="new-connect-btn p-2" onClick={handleSignUp}>
                  Connect Wallet
                </button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/bellIcon.svg"}
                      width={30}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenNotifications(true);
                        // markNotificationsAsRead()
                      }}
                      height={30}
                      alt=""
                    />
                    {unreadNotifications > 0 && (
                      <div className="bell-amount">
                        <span className="mb-0">
                          {unreadNotifications > 99
                            ? "99+"
                            : unreadNotifications}
                        </span>
                      </div>
                    )}
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setOpenNotifications(false);
                      }}
                    >
                      <div
                        className={`notifications-wrapper d-flex flex-column ${
                          openNotifications && "open-notifications"
                        }`}
                        // style={{
                        //   justifyContent: myOffers.length === 0 ? "center" : "",
                        //   alignItems: myOffers.length === 0 ? "center" : "",
                        // }}
                      >
                        <NavLink
                          to={"/notifications"}
                          onClick={() => setOpenNotifications(false)}
                          className="pending-notifications m-3 p-2 d-flex align-items-center justify-content-between"
                        >
                          <div className="d-flex align-items-center gap-1">
                            <h6 className="notifications-amount mb-0">
                              {unreadNotifications}
                            </h6>
                            <span className="pending-text mb-0">
                              Pending Notifications
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="pending-text mb-0">View All</span>
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                              }
                              alt=""
                            />
                          </div>
                        </NavLink>
                        <div className="inner-notifications">
                          {myOffers &&
                            myOffers.length > 0 &&
                            myOffers.map((nft, index) => {
                              return (
                                <div
                                  className="position-relative header-notification"
                                  key={index}
                                >
                                  <a
                                    href={
                                      nft.welcome === "yes"
                                        ? "https://www.worldofdypians.com/shop"
                                        : nft.redirect_link
                                        ? nft.redirect_link
                                        : `https://www.worldofdypians.com/shop/nft/${
                                            nft.tokenId
                                          }/${nft.nftAddress.toLowerCase()}`
                                    }
                                    rel="noreferrer"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => {
                                      setOpenNotifications(false);
                                      markNotificationAsRead(coinbase, nft._id);
                                    }}
                                    className="d-flex flex-column gap-1 p-3 header-notification-item"
                                  >
                                    <div className="d-flex align-items-center gap-1">
                                      <img
                                        height={16}
                                        width={16}
                                        src={
                                          nft.bought === "yes" &&
                                          nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/cartIconActive.svg"
                                            : nft.bought === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/cartIcon.svg"
                                            : nft.offer === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/offerIconActive.svg"
                                            : nft.offer === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/offerIcon.svg"
                                            : nft.buy === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/transferIconActive.svg"
                                            : nft.buy === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/transferIcon.svg"
                                            : //welcome
                                            nft.welcome === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/welcomeIconActive.svg"
                                            : nft.welcome === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/welcomeIcon.svg"
                                            : //news
                                            nft.news === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/newsIconActive.svg"
                                            : nft.news === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/newsIcon.svg"
                                            : //updates
                                            nft.update === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/updateIconActive.svg"
                                            : nft.update === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/updateIcon.svg"
                                            : //events
                                            nft.event === "yes" &&
                                              nft.read === false
                                            ? "https://cdn.worldofdypians.com/wod/eventIconActive.svg"
                                            : nft.event === "yes" &&
                                              nft.read === true
                                            ? "https://cdn.worldofdypians.com/wod/eventIcon.svg"
                                            : null
                                        }
                                        alt=""
                                      />
                                      <h6
                                        className="notification-title mb-0"
                                        style={{
                                          color:
                                            nft.read === false
                                              ? "#11FED2"
                                              : "#EEEDFF",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {nft.buy === "yes"
                                          ? "NFT Sold"
                                          : nft.offer === "yes"
                                          ? "New Offer"
                                          : nft.bought === "yes"
                                          ? "NFT Bought"
                                          : nft.title}
                                      </h6>
                                    </div>
                                    <p
                                      className="notification-desc mb-0"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {nft.bought === "yes"
                                        ? `Congratulations on being the new owner of  ${
                                            nft.nftAddress.toLowerCase() ===
                                            window.config.nft_caws_address.toLowerCase()
                                              ? "CAWS"
                                              : nft.nftAddress.toLowerCase() ===
                                                window.config.nft_land_address.toLowerCase()
                                              ? "WOD"
                                              : "Timepiece"
                                          } #${nft.tokenId}.`
                                        : nft.buy === "yes"
                                        ? `Your  ${
                                            nft.nftAddress.toLowerCase() ===
                                            window.config.nft_caws_address.toLowerCase()
                                              ? "CAWS"
                                              : nft.nftAddress.toLowerCase() ===
                                                window.config.nft_land_address.toLowerCase()
                                              ? "WOD"
                                              : "Timepiece"
                                          } #${nft.tokenId} was sold.`
                                        : nft.offer === "yes"
                                        ? `There is a new offer for your ${
                                            nft.nftAddress.toLowerCase() ===
                                            window.config.nft_caws_address.toLowerCase()
                                              ? "CAWS"
                                              : nft.nftAddress.toLowerCase() ===
                                                window.config.nft_land_address.toLowerCase()
                                              ? "WOD"
                                              : "Timepiece"
                                          } #${nft.tokenId}`
                                        : nft.description?.slice(0, 150) +
                                          "..."}
                                    </p>
                                    <span className="notification-relative-time mb-0">
                                      {getRelativeTime(nft.timestamp)}
                                    </span>
                                  </a>
                                  {/* <div
                                className="notification-delete d-flex flex-column align-items-center justify-content-center gap-2 px-3"
                                onClick={() => {
                                  deleteNotification(nft._id);
                                  
                                }}
                              >
                                <img src={orangeDeleteIcon} alt="" />
                                <span className="notif-delete-text">
                                  Delete
                                </span>
                              </div> */}
                                </div>
                              );
                            })}
                        </div>

                        {myOffers.length === 0 && (
                          <div
                            className="header-notification w-100  d-flex justify-content-center align-items-center gap-2 p-3 position-relative"
                            style={{ pointerEvents: "none" }}
                          >
                            <span className="notification-text">
                              No recent notifications
                            </span>
                          </div>
                        )}
                      </div>
                    </OutsideClickHandler>
                  </div>
                  <div>
                    <div className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative">
                      <div
                        className="btn connected p-0 pe-3"
                        style={{
                          color: tooltip ? "#82DAAB" : "#FFFFFF",
                          minHeight: "34px",
                        }}
                        // onMouseEnter={() => {
                        //   setshowChainDropdown(true);
                        // }}
                        // onMouseLeave={() => {
                        //   setshowChainDropdown(false);
                        // }}
                        onMouseEnter={() => handleDropdown("chains")}
                        onMouseLeave={() => handleDropdown(null)}
                      >
                        <DropdownButton
                          id="dropdown-basic-button"
                          className="d-flex align-items-center justify-content-center chaindropdown"
                          // show={showChainDropdown}
                          onClick={() => {
                            setshowChainDropdown(true);
                          }}
                          title={
                            <span className="dropdown-title">
                              <div className="d-flex align-items-center gap-1">
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
                                      : chainState === "mat"
                                      ? "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                      : chainState === "sei"
                                      ? "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                                      : chainState === "vanar"
                                      ? "https://cdn.worldofdypians.com/wod/vanar.svg"
                                      : chainState === "taraxa"
                                      ? "https://cdn.worldofdypians.com/wod/taraxa.svg"
                                      : "https://cdn.worldofdypians.com/wod/error.svg"
                                  }
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/dropdown.svg"
                                  }
                                  alt=""
                                />
                              </div>
                            </span>
                          }
                        ></DropdownButton>

                        {/* <div
                        className={`header-dropdown p-4 d-flex flex-column gap-2 ${
                          dropdown.chains === "chains"
                            ? "header-dropdown-active"
                            : ""
                        }`}
                        style={{ left: "0", top: "62px", width: "315px" }}
                      >
                        <div className="d-flex flex-column position-relative gap-2">
                          <div
                            className="triangle"
                            style={{ top: "-38px" }}
                          ></div>
                          <span className="select-gray-txt ">
                            SELECT A NETWORK
                          </span>
                          <hr className="header-divider my-0" />
                          <div className="header-chain-grid">
                            {window.WALLET_TYPE !== "matchId" && (
                              <Dropdown.Item
                                onClick={() => switchNetwork("0x1", 1)}
                              >
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/eth.svg"
                                  }
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                Ethereum
                              </Dropdown.Item>
                            )}

                            <Dropdown.Item
                              onClick={() => {
                                switchNetwork("0x38", 56);
                              }}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                }
                                alt=""
                                width={20}
                                height={20}
                              />
                              BNB Chain
                            </Dropdown.Item>
                            {window.WALLET_TYPE !== "matchId" && (
                              <Dropdown.Item
                                onClick={() => switchNetwork("0xcc", 204)}
                              >
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                  }
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                opBNB Chain
                              </Dropdown.Item>
                            )}
                            {window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance && (
                                <Dropdown.Item
                                  onClick={() => switchNetwork("0x2ba", 698)}
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  Matchain
                                </Dropdown.Item>
                              )}

                            {window.WALLET_TYPE !== "matchId" && (
                              <Dropdown.Item
                                onClick={() => switchNetwork("0xa9", 169)}
                              >
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/manta.png"
                                  }
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                Manta
                              </Dropdown.Item>
                            )}
                            {window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance &&
                              window.WALLET_TYPE !== "matchId" && (
                                <Dropdown.Item
                                  onClick={() =>
                                    switchNetwork("0x28c58", 167000)
                                  }
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/taiko.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  Taiko
                                </Dropdown.Item>
                              )}

                            {window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance &&
                              window.WALLET_TYPE !== "matchId" && (
                                <Dropdown.Item
                                  onClick={() => switchNetwork("0x45c", 1116)}
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/core.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  CORE
                                </Dropdown.Item>
                              )}
                            {window.WALLET_TYPE !== "matchId" && (
                              <Dropdown.Item
                                onClick={() => switchNetwork("0x2105", 8453)}
                              >
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/base.svg"
                                  }
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                Base
                              </Dropdown.Item>
                            )}
                            {window.WALLET_TYPE !== "matchId" &&
                              window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance && (
                                <Dropdown.Item
                                  onClick={() => switchNetwork("0x531", 1329)}
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  SEI
                                </Dropdown.Item>
                              )}

                            {window.WALLET_TYPE !== "matchId" &&
                              window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance && (
                                <Dropdown.Item
                                  onClick={() => switchNetwork("0x58", 88)}
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/viction.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  Viction
                                </Dropdown.Item>
                              )}
                            {window.WALLET_TYPE !== "matchId" && (
                              <Dropdown.Item
                                onClick={() => switchNetwork("0xa86a", 43114)}
                              >
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                                  }
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                Avalanche
                              </Dropdown.Item>
                            )}
                            {window.WALLET_TYPE !== "matchId" &&
                              window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance && (
                                <Dropdown.Item
                                  onClick={() =>
                                    switchNetwork("0x585eb4b1", 1482601649)
                                  }
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                                    }
                                    alt=""
                                    width={20}
                                    height={20}
                                  />
                                  SKALE
                                </Dropdown.Item>
                              )}
                            {window.WALLET_TYPE !== "matchId" &&
                              window.WALLET_TYPE !== "binance" &&
                              !window.ethereum?.isBinance && (
                                <Dropdown.Item
                                  onClick={() => switchNetwork("0x343b", 13371)}
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/immutable.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                  />
                                  Immutable
                                </Dropdown.Item>
                              )}
                            <Dropdown.Item
                              onClick={() => switchNetwork("0x406", 1030)}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                                }
                                alt=""
                                width={20}
                                height={20}
                              />
                              Conflux
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => switchNetwork("0x7f8", 2040)}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/vanar.png"
                                }
                                alt=""
                                width={20}
                                height={20}
                              />
                              Vanar
                            </Dropdown.Item>
                          </div>
                          <hr className="header-divider my-0" />
                          <a
                            href="https://wod.space.id"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span
                              className="dropdown-nav p-2 d-flex align-items-center gap-2"
                              onClick={() => {
                                // handleOpenDomains();
                                setShowMenu(false);
                              }}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/domainIcon.svg"
                                }
                                width={16}
                                height={16}
                                alt=""
                              />{" "}
                              Domain Name{" "}
                            </span>
                          </a>
                          <button
                            className="sign-out-btn p-2  d-flex align-items-center gap-2 justify-content-start"
                            onClick={() => {
                              manageDisconnect();
                            }}
                          >
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/logout.svg"
                              }
                              alt=""
                              className="logout-icon"
                            />
                            DISCONNECT
                          </button>
                        </div>
                      </div> */}
                        <span
                          className="d-flex align-items-center gap-2"
                          // onClick={() => {
                          //   setShowMenu(true);
                          // }}
                        >
                          {domainName ? domainName : shortAddress(coinbase)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showmenu === true && (
                <div className="position-absolute" style={{ width: "210px" }}>
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setShowMenu(false);
                    }}
                  >
                    <div className="menuwrapper">
                      <div className="d-flex flex-column gap-2">
                        <a
                          href="https://wod.space.id"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span
                            className="menuitem2"
                            onClick={() => {
                              handleOpenDomains();
                              setShowMenu(false);
                            }}
                          >
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/domainIcon.svg"
                              }
                              width={16}
                              height={16}
                              alt=""
                            />{" "}
                            Domain Name{" "}
                          </span>
                        </a>
                        <span
                          className="menuitem2"
                          onClick={() => {
                            setTooltip(true);
                            setTimeout(() => setTooltip(false), 2000);
                          }}
                        >
                          <img
                            src={
                              tooltip
                                ? "https://cdn.worldofdypians.com/wod/check.svg"
                                : "https://cdn.worldofdypians.com/wod/copy.svg"
                            }
                            alt=""
                          />{" "}
                          Copy{" "}
                        </span>

                        <span
                          className="menuitem2 sign-out-btn  d-flex align-items-center gap-2 justify-content-start"
                          onClick={() => {
                            setShowMenu(false);
                            manageDisconnect();
                          }}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/logout.svg"
                            }
                            alt=""
                          />{" "}
                          Disconnect{" "}
                        </span>
                      </div>
                    </div>
                  </OutsideClickHandler>
                </div>
              )}

              {showmenuAccount === true && (
                <div className="position-absolute" style={{ width: "210px" }}>
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setshowmenuAccount(false);
                    }}
                  >
                    <div className="menuwrapper2">
                      <div className="d-flex flex-column gap-2">
                        <span
                          className="menuitem2"
                          onClick={() => {
                            navigate("/account");
                            setshowmenuAccount(false);
                          }}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/domainIcon.svg"
                            }
                            width={16}
                            height={16}
                            alt=""
                          />{" "}
                          Account
                        </span>

                        {email ? (
                          <button
                            className="logoutbtn py-1"
                            onClick={() => {
                              logout();
                              onLogout();
                              setshowmenuAccount(false);
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
                        ) : (
                          <button
                            className="logoutbtn py-1"
                            style={{
                              color: "#18ffff",
                            }}
                            onClick={() => {
                              onSigninClick();
                              setshowmenuAccount(false);
                            }}
                          >
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/logout.svg"
                              }
                              alt=""
                            />{" "}
                            Sign in
                          </button>
                        )}
                      </div>
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
            isMobile={false}
            isPremium={false}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};
export default Header;
