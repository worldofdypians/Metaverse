import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "./assets/person.svg";
import personCoinbase from "./assets/personCoinbase.png";
import personNoCoinbase from "./assets/personNoCoinbase.png";

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

import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import base from "./assets/base.svg";
import conflux from "./assets/conflux.svg";

import error from "./assets/error.svg";
import dropdown from "./assets/dropdown.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { handleSwitchNetworkhook } from "../../hooks/hooks";

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
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const [isUnread, setisUnread] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [confluxState, setConfluxState] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);

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
        setBaseState(false);
      } else if (chainId === 43114) {
        setAvaxState(true);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
      } else if (chainId === 8453) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(true);
      } else if (chainId === 56) {
        setAvaxState(false);
        setBnbState(true);
        setEthState(false);
        setBaseState(false);
      } else if (chainId === 1030) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(true);
      } else {
        setAvaxState(false);
        setBnbState(false);
        setBaseState(false);
        setEthState(false);
      }
    }
  };

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        handleSwitchChainGateWallet(1);
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  // console.log(avatar);
  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        handleSwitchChainGateWallet(56);
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleAvaxPool = async () => {
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0xa86a")
        .then(() => {
          handleSwitchNetwork(43114);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      handleSwitchChainGateWallet();
    }
  };

  const handleBasePool = async () => {
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0x2105")
        .then(() => {
          handleSwitchNetwork(8453);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      handleSwitchChainGateWallet(8453);
    }
  };

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
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
    if (chainId === 1) {
      handleSwitchNetwork(1);
    }

    if (chainId === 56) {
      handleSwitchNetwork(56);
    }

    if (chainId === 8453) {
      handleSwitchNetwork(8453);
    }
  }, [chainId, coinbase]);

  useEffect(() => {
    setActiveChain();
  }, [chainId, ethState]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  return (
    <div className="d-none d-lg-flex px-5 navbar-wrapper py-4">
      <div className="row justify-content-between mx-0 w-100">
        <div className="col-7 col-xl-7 col-xxl-7 d-flex align-items-center justify-content-between ps-0">
          <NavLink to="/">
            <img src={metaverse} alt="metaverse" />
          </NavLink>
          <NavLink
            to="/explorer"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Explore
          </NavLink>
          {/* <a href="#marketplace" className="nav-anchor font-poppins">Marketplace</a> */}
          {/* <div className="nav-anchor font-poppins">Roadmap</div> */}

          <NavLink
            to="/land"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Land
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/roadmap"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Roadmap
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            News
          </NavLink>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end gap-3 pe-0 position-relative ">
          {!coinbase ? (
            <div className="linearborder2">
              <button className="btn connectwallet px-3" onClick={handleSignUp}>
                Connect Wallet
              </button>{" "}
            </div>
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
                                      nft.bought === "yes" && nft.read === false
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
                                        : nft.buy === "yes" && nft.read === true
                                        ? transferIcon
                                        : //welcome
                                        nft.welcome === "yes" &&
                                          nft.read === false
                                        ? welcomeIconActive
                                        : nft.welcome === "yes" &&
                                          nft.read === true
                                        ? welcomeIcon
                                        : //news
                                        nft.news === "yes" && nft.read === false
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
              <DropdownButton
                id="dropdown-basic-button"
                style={{width: "124px"}}
                className="d-flex align-items-center justify-content-center"
                title={
                  <span className="dropdown-title">
                   <div className="d-flex align-items-center gap-1">
                   <img
                      src={
                        ethState === true
                          ? eth
                          : bnbState === true
                          ? bnb
                          : //: : avaxState === true
                            // ? avax
                            baseState === true
                            ? base
                            : confluxState === true
                            ? conflux
                           : error
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
                        : //:  : avaxState === true
                          // ? "Avalanche"
                           baseState === true
                          ? "Base"
                          :confluxState === true
                          ? "Conflux"
                          :"Unsupported"}
                    </span>
                   </div>

                    <img src={dropdown} alt="" />
                  </span>
                }
              >
                <Dropdown.Item onClick={() => handleEthPool()}>
                  <img src={eth} alt="" />
                  Ethereum
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleBnbPool()}>
                  <img src={bnb} alt="" />
                  BNB Chain
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleAvaxPool()}>
                  <img src={avax} alt="" />
                  Avalanche
                </Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleConfluxPool()}>
                  <img src={conflux} alt="" />
                  Conflux
                </Dropdown.Item>
                 <Dropdown.Item onClick={() => handleBasePool()}>
                  <img src={base} alt="" />
                  Base
                </Dropdown.Item>
              </DropdownButton>
              <Clipboard
                component="div"
                data-event="click"
                data-for={id}
                data-tip="Copied To Clipboard!"
                data-clipboard-text={coinbase}
                className="wallet-wrapper d-flex align-items-center gap-2 position-relative"
              >
                <div
                  className="btn connected px-3"
                  style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                  onClick={() => {
                    setShowMenu(true);
                  }}
                >
                  {shortAddress(coinbase)} <img src={dropdown} alt="" />
                </div>
              </Clipboard>
            </div>
          )}
          {!coinbase ? (
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
        </div>
      </div>
    </div>
  );
};
export default Header;
