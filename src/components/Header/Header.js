import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "./assets/person.svg";
import personCoinbase from "./assets/personCoinbase.png";
import personNoCoinbase from "./assets/personNoCoinbase.png";
import headerArrow from "./assets/headerArrow.svg";
import copy from "./assets/copy.svg";
import check from "./assets/check.svg";
import user from "./assets/user.svg";
import logout from "./assets/logout.svg";
import Clipboard from "react-clipboard.js";
import OutsideClickHandler from "react-outside-click-handler";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bellIcon from "./assets/bellIcon.svg";
import axios from "axios";
import viewAllArrow from "./assets/viewAllArrow.svg";
import core from "./assets/core.svg";
import viction from "./assets/viction.svg";
import allIcon from "../../screens/Marketplace/Notifications/assets/allIcon.svg";
import allIconActive from "../../screens/Marketplace/Notifications/assets/allIconActive.svg";
import cartIcon from "../../screens/Marketplace/Notifications/assets/cartIcon.svg";
import cartIconActive from "../../screens/Marketplace/Notifications/assets/cartIconActive.svg";
import eventIcon from "../../screens/Marketplace/Notifications/assets/eventIcon.svg";
import eventIconActive from "../../screens/Marketplace/Notifications/assets/eventIconActive.svg";
import markReadIcon from "../../screens/Marketplace/Notifications/assets/markReadIcon.svg";
import markReadIconActive from "../../screens/Marketplace/Notifications/assets/markReadIconActive.svg";
import newsIcon from "../../screens/Marketplace/Notifications/assets/newsIcon.svg";
import newsIconActive from "../../screens/Marketplace/Notifications/assets/newsIconActive.svg";
import offerIcon from "../../screens/Marketplace/Notifications/assets/offerIcon.svg";
import offerIconActive from "../../screens/Marketplace/Notifications/assets/offerIconActive.svg";
import transferIcon from "../../screens/Marketplace/Notifications/assets/transferIcon.svg";
import transferIconActive from "../../screens/Marketplace/Notifications/assets/transferIconActive.svg";
import updateIcon from "../../screens/Marketplace/Notifications/assets/updateIcon.svg";
import updateIconActive from "../../screens/Marketplace/Notifications/assets/updateIconActive.svg";
import welcomeIcon from "../../screens/Marketplace/Notifications/assets/welcomeIcon.svg";
import welcomeIconActive from "../../screens/Marketplace/Notifications/assets/welcomeIconActive.svg";
import orangeDeleteIcon from "../../screens/Marketplace/Notifications/assets/orangeDeleteIcon.svg";
import domainIcon from "./assets/domainIcon.svg";
import popupXmark from "./assets/popupXmark.svg";
import searchIconDomain from "./assets/searchIconDomain.svg";
import registerDomainIcon from "./assets/registerDomainIcon.svg";
import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import skale from "./assets/skale.svg";
import eth from "./assets/eth.svg";
import base from "./assets/base.svg";
import conflux from "./assets/conflux.svg";
import manta from "./assets/manta.png";
import taiko from "./assets/taiko.svg";
import sei from "./assets/sei.svg";
import multiversx from "./assets/multiversx.svg";

import immutable from "./assets/immutableLogo.svg";
import twitterHeader from "./assets/twitterHeader.svg";
import telegramHeader from "./assets/telegramHeader.svg";
import discordHeader from "./assets/discordHeader.svg";
import instagramHeader from "./assets/instagramHeader.svg";
import youtubeHeader from "./assets/youtubeHeader.svg";
import mediumHeader from "./assets/mediumHeader.svg";
import error from "./assets/error.svg";
import personIcon from "./assets/personIcon.svg";
import dropdownicon from "./assets/dropdown.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import logouticon from "./assets/logout.svg";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";
import cartIcon2 from "./assets/dropdownAssets/cartIcon.svg";
import epicIcon from "./assets/dropdownAssets/epicIcon.svg";
import guestIcon from "./assets/dropdownAssets/guestIcon.svg";
import linkedIcon from "./assets/dropdownAssets/linkedIcon.svg";
import logoutIcon from "./assets/dropdownAssets/logoutIcon.svg";
import registerIcon from "./assets/dropdownAssets/registerIcon.svg";
import supportIcon from "./assets/dropdownAssets/supportIcon.svg";
import unlinkedIcon from "./assets/dropdownAssets/unlinkedIcon.svg";
import userIcon from "./assets/dropdownAssets/userIcon.svg";
import walletIcon from "./assets/dropdownAssets/walletIcon.svg";

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
  gameAccount,
  email,
  username,loginListener
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const [showmenuAccount, setshowmenuAccount] = useState(false);
  const [showChainDropdown, setshowChainDropdown] = useState(false);

  const [isUnread, setisUnread] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [opbnbState, setopBnbState] = useState(false);
  const [coreState, setCoreState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [confluxState, setConfluxState] = useState(false);
  const [skaleState, setSkaleState] = useState(false);
  const [victionState, setVictionState] = useState(false);
  const [mantaState, setMantaState] = useState(false);
  const [seiState, setSeiState] = useState(false);
  const [immutableState, setImmutableState] = useState(false);
  const [taikoState, setTaikoState] = useState(false);
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
  });

  // const [domainPopup, setDomainPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);
  const { logout } = useAuth();

  let id = Math.random().toString(36);

  const manageDisconnect = () => {
    if (location.pathname.includes("/account")) {
      handleDisconnect();
    } else handleDisconnect();
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
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(chain);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(chain);
      }
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
        )}/${notificationId}`
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
  }, [chainId, ethState]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  useEffect(() => {
    if (email !== undefined && gameAccount !== undefined && coinbase) {
      setAccount({
        logged: true,
        wallet: gameAccount,
        linked: gameAccount,
        guest: true,
      });
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
  }, [email, gameAccount, coinbase,loginListener]);

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
    <div className="d-flex flex-column">
      <div className="d-none d-lg-flex navbar-wrapper p-3 ">
        <div className="row justify-content-between mx-0 w-100">
          <div className="col-7 col-xl-7 col-xxl-7 d-flex align-items-center justify-content-start gap-5 ps-0">
            <NavLink to="/">
              <img src={metaverse} alt="metaverse" height={32} />
            </NavLink>
            <div
              className={
                "nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2"
              }
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleDropdown("wod")}
              onMouseLeave={() => handleDropdown(null)}
            >
              WOD
              <img src={headerArrow} alt="" />
              <div
                className={`header-dropdown p-2 d-flex flex-column gap-2 ${
                  dropdown.wod === "wod" ? "header-dropdown-active" : ""
                }`}
              >
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
                  to={"/earn"}
                  className={({ isActive }) =>
                    isActive
                      ? "dropdown-nav nav-active p-2"
                      : "dropdown-nav p-2"
                  }
                >
                  Earn
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
                  to={"/buy"}
                  className={({ isActive }) =>
                    isActive
                      ? "dropdown-nav nav-active p-2"
                      : "dropdown-nav p-2"
                  }
                >
                  Buy
                </NavLink>
              </div>
            </div>
            {/* <a href="#marketplace" className="nav-anchor">Marketplace</a> */}
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
              to="/marketplace"
              className={({ isActive }) =>
                isActive ? "nav-anchor activenavlink" : "nav-anchor"
              }
            >
              Marketplace
            </NavLink>
            <div
              className={
                "nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2"
              }
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleDropdown("community")}
              onMouseLeave={() => handleDropdown(null)}
            >
              Community
              <img src={headerArrow} alt="" />
              <div
                className={`header-dropdown  p-2 d-flex flex-column gap-2 ${
                  dropdown.community === "community"
                    ? "header-dropdown-active"
                    : ""
                }`}
              >
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
                <hr className="header-divider my-0" />
                <div className="d-flex align-items-center justify-content-between px-2 mb-2">
                  <a href="#">
                    <img src={twitterHeader} width={25} alt="" />
                  </a>
                  <a href="#">
                    <img src={telegramHeader} width={25} alt="" />
                  </a>
                  <a href="#">
                    <img src={discordHeader} width={25} alt="" />
                  </a>
                </div>
                <div className="d-flex align-items-center justify-content-between px-2 mb-2">
                  <a href="#">
                    <img src={instagramHeader} width={25} alt="" />
                  </a>
                  <a href="#">
                    <img src={youtubeHeader} width={25} alt="" />
                  </a>
                  <a href="#">
                    <img src={mediumHeader} width={25} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className={
                "nav-anchor header-dropdown-link position-relative d-flex align-items-center gap-2"
              }
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleDropdown("about")}
              onMouseLeave={() => handleDropdown(null)}
            >
              <NavLink to="/about" className="text-white">
                About
              </NavLink>
              <img src={headerArrow} alt="" />
              <div
                className={`header-dropdown p-2 d-flex flex-column gap-2 ${
                  dropdown.about === "about" ? "header-dropdown-active" : ""
                }`}
              >
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
          <div className="col-3 d-flex align-items-center justify-content-end gap-3 pe-0 position-relative ">
            <div
              onMouseEnter={() => handleDropdown("account")}
              onMouseLeave={() => handleDropdown(null)}
              className="d-flex align-items-center gap-2 position-relative account-btn-hover p-2"
              style={{cursor: "pointer"}}
            >
              <img src={personIcon} alt="" />
              <h6 className="mb-0 account-txt">
                {username !== undefined && email !== undefined
                  ? username
                  : "Account"}
              </h6>
              <img src={headerArrow} alt="" />

              <div
                className={`header-dropdown p-3 d-flex flex-column gap-2 ${
                  dropdown.account === "account" ? "header-dropdown-active" : ""
                }`}
                style={{top: "140%"}}
              >
                {account.logged === false ? (
                  <>
                    <NavLink to={"/auth"} className="header-log-btn py-2">
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
                      <img width={20} height={20} src={guestIcon} alt="" />
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
                      <img width={20} height={20} src={registerIcon} alt="" />
                      Sign Up
                    </NavLink>
                    <hr className="header-divider my-0" />
                  </>
                ) : account.logged === true && account.guest === true ? (
                  <>
                    <NavLink
                      to={"/account"}
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2 position-relative"
                          : "dropdown-nav nav-active p-2 d-flex align-items-center gap-2 position-relative"
                      }
                    >
                      <img width={20} height={20} src={userIcon} alt="" />
                      {username ?? "Guest"}
                      <img
                        src={
                          account.linked === false ? unlinkedIcon : linkedIcon
                        }
                        className="link-icon"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </NavLink>
                    <div
                      className={`dropdown-nav ${
                        account.linked === false ? "account-not-linked" : ""
                      } nav-active p-2 d-flex align-items-center gap-2`}
                    >
                      <img width={20} height={20} src={walletIcon} alt="" />
                      <div className="d-flex flex-column">
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
                    <hr className="header-divider my-0" />
                  </>
                ) : (
                  <></>
                )}
                <NavLink
                  to={"/contact-us"}
                  className={({ isActive }) =>
                    isActive
                      ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                      : "dropdown-nav p-2 d-flex align-items-center gap-2"
                  }
                >
                  <img width={20} height={20} src={supportIcon} alt="" />
                  Support
                </NavLink>
                <NavLink
                  to={"/marketplace"}
                  className={({ isActive }) =>
                    isActive
                      ? "dropdown-nav nav-active p-2 d-flex align-items-center gap-2"
                      : "dropdown-nav p-2 d-flex align-items-center gap-2"
                  }
                >
                  <img width={20} height={20} src={cartIcon2} alt="" />
                  Shop
                </NavLink>
                <a
                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                  target="_blank"
                  rel="noreferrer"
                  className={"dropdown-nav p-2 d-flex align-items-center gap-2"}
                >
                  <img width={20} height={20} src={epicIcon} alt="" />
                  Download
                </a>
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
                      <img src={logouticon} alt="" className="logout-icon" />{" "}
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* {!coinbase ? (
              <NavLink to={"/account"}>
                <img src={personNoCoinbase} className="account-icon" alt="" />
              </NavLink>
            ) : (
              <NavLink to={"/account"}>
                <img
                  src={avatar ? avatar : personCoinbase}
                  className="account-icon"
                  alt=""
                />
              </NavLink>
            )} */}

            {!coinbase ? (
              // <div className="linearborder2">
              //   <button
              //     className="btn connectwallet px-3"
              //     onClick={handleSignUp}
              //   >
              //     Connect Wallet
              //   </button>{" "}
              // </div>
              <button
                className="new-connect-btn p-2"
                onClick={handleSignUp}
              >
                Connect Wallet
              </button>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <img
                    src={bellIcon}
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
                        {unreadNotifications > 99 ? "99+" : unreadNotifications}
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
                          <img src={viewAllArrow} alt="" />
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
                                      ? "https://www.worldofdypians.com/marketplace"
                                      : nft.redirect_link
                                      ? nft.redirect_link
                                      : `https://www.worldofdypians.com/marketplace/nft/${
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
                                          ? cartIconActive
                                          : nft.bought === "yes" &&
                                            nft.read === true
                                          ? cartIcon
                                          : nft.offer === "yes" &&
                                            nft.read === false
                                          ? offerIconActive
                                          : nft.offer === "yes" &&
                                            nft.read === true
                                          ? offerIcon
                                          : nft.buy === "yes" &&
                                            nft.read === false
                                          ? transferIconActive
                                          : nft.buy === "yes" &&
                                            nft.read === true
                                          ? transferIcon
                                          : //welcome
                                          nft.welcome === "yes" &&
                                            nft.read === false
                                          ? welcomeIconActive
                                          : nft.welcome === "yes" &&
                                            nft.read === true
                                          ? welcomeIcon
                                          : //news
                                          nft.news === "yes" &&
                                            nft.read === false
                                          ? newsIconActive
                                          : nft.news === "yes" &&
                                            nft.read === true
                                          ? newsIcon
                                          : //updates
                                          nft.update === "yes" &&
                                            nft.read === false
                                          ? updateIconActive
                                          : nft.update === "yes" &&
                                            nft.read === true
                                          ? updateIcon
                                          : //events
                                          nft.event === "yes" &&
                                            nft.read === false
                                          ? eventIconActive
                                          : nft.event === "yes" &&
                                            nft.read === true
                                          ? eventIcon
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
                                      : nft.description?.slice(0, 150) + "..."}
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
                      onMouseEnter={() => {
                        setshowChainDropdown(true);
                      }}
                      onMouseLeave={() => {
                        setshowChainDropdown(false);
                      }}
                    >
             <DropdownButton
                        id="dropdown-basic-button"
                        className="d-flex align-items-center justify-content-center chaindropdown"
                        show={showChainDropdown}
                        title={
                          <span className="dropdown-title">
                            <div className="d-flex align-items-center gap-1">
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
                        <img src={dropdownicon} alt="" />

                            </div>
                          </span>
                        }
                      >
                        <div className="d-flex flex-column gap-2">
                          <span className="select-gray-txt pt-2">
                            SELECT A NETWORK
                          </span>
                          <hr className="header-divider my-0" />
                          <div className="d-flex gap-2 justify-content-between">
                            <div className="d-flex flex-column gap-2">
                            <Dropdown.Item onClick={() => switchNetwork("0x1", 1)}>
                    <img src={eth} alt="" />
                    Ethereum
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => switchNetwork("0x38", 56)}>
                    <img src={bnb} alt="" />
                    BNB Chain
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => switchNetwork("0xcc", 204)}>
                    <img src={bnb} alt="" />
                    opBNB Chain
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => switchNetwork("0xa9", 169)}>
                    <img src={manta} alt="" />
                    Manta
                  </Dropdown.Item>
                  {window.WALLET_TYPE !== "binance" &&
                    !window.ethereum?.isBinance && (
                      <Dropdown.Item
                        onClick={() => switchNetwork("0x28c58", 167000)}
                      >
                        <img src={taiko} width={20} height={20} alt="" />
                        Taiko
                      </Dropdown.Item>
                    )}
                              {window.WALLET_TYPE !== "binance" &&
                    !window.ethereum?.isBinance && (
                      <Dropdown.Item
                        onClick={() => switchNetwork("0x45c", 1116)}
                      >
                        <img src={core} width={20} height={20} alt="" />
                        CORE
                      </Dropdown.Item>
                    )}
                             <Dropdown.Item onClick={() => switchNetwork("0x406", 1030)}>
                                <img src={conflux} alt="" />
                                Conflux
                              </Dropdown.Item>
                            </div>
                            <div className="d-flex flex-column gap-2">
                            <Dropdown.Item onClick={() => switchNetwork("0x2105", 8453)}>
                                <img src={base} alt="" />
                                Base
                              </Dropdown.Item>
                              {window.WALLET_TYPE !== "binance" &&
                    !window.ethereum?.isBinance && (
                      <Dropdown.Item onClick={() => switchNetwork("0x58", 88)}>
                        <img src={viction} width={20} height={20} alt="" />
                        Viction
                      </Dropdown.Item>
                    )}
                               <Dropdown.Item onClick={() => switchNetwork("0xa86a", 43114)}>
                    <img src={avax} alt="" />
                    Avalanche
                  </Dropdown.Item>
                  {window.WALLET_TYPE !== "binance" &&
                    !window.ethereum?.isBinance && (
                      <Dropdown.Item
                        onClick={() => switchNetwork("0x585eb4b1", 1482601649)}
                      >
                        <img src={skale} alt="" />
                        SKALE
                      </Dropdown.Item>
                    )}
                              {window.WALLET_TYPE !== "binance" &&
                    !window.ethereum?.isBinance && (
                      <Dropdown.Item
                        onClick={() => switchNetwork("0x343b", 13371)}
                      >
                        <img src={immutable} width={20} height={20} alt="" />
                        Immutable
                      </Dropdown.Item>
                    )}
                            </div>
                          </div>
                          <hr className="header-divider my-0" />
                          <button
                            className="logoutbtn pt-2 pb-3"
                            onClick={() => {
                              manageDisconnect();
                            }}
                          >
                            <img
                              src={logouticon}
                              alt=""
                              className="logout-icon"
                            />
                            DISCONNECT
                          </button>
                        </div>
                      </DropdownButton>
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
                      <span
                        className="menuitem2"
                        onClick={() => {
                          handleOpenDomains();
                          setShowMenu(false);
                        }}
                      >
                        <img src={domainIcon} width={16} height={16} alt="" />{" "}
                        Domain Name{" "}
                      </span>
                      <span
                        className="menuitem2"
                        onClick={() => {
                          setTooltip(true);
                          setTimeout(() => setTooltip(false), 2000);
                        }}
                      >
                        <img src={tooltip ? check : copy} alt="" /> Copy{" "}
                      </span>

                      <span
                        className="menuitem2"
                        onClick={() => {
                          setShowMenu(false);
                          manageDisconnect();
                        }}
                      >
                        <img src={logout} alt="" /> Disconnect{" "}
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
                        <img src={domainIcon} width={16} height={16} alt="" />{" "}
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
                            src={logouticon}
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
                          <img src={logouticon} alt="" /> Sign in
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
  );
};
export default Header;
