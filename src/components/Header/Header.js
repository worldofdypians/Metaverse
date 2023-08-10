import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "./assets/person.svg";
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

const Header = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const [isUnread, setisUnread] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);

  let id = Math.random().toString(36);

  const manageDisconnect = () => {
    if (location.pathname.includes("/account")) {
      handleDisconnect();
      navigate("/");
    } else handleDisconnect();
  };

  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

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

  async function deleteNotification(notificationId) {
    try {
      await axios.delete(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          coinbase
        )}/${notificationId}`
      );
      console.log("Notification deleted");
      handleRefreshList();
    } catch (error) {
      console.error("Error deleting notification:", error.message);
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
        <div className="col-3 d-flex align-items-center justify-content-end gap-4 pe-0 position-relative ">
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
                              <NavLink
                                to={
                                  nft.redirect_link !== ""
                                    ? nft.redirect_link
                                    : `/marketplace/nft/${
                                        nft.tokenId
                                      }/${nft.nftAddress.toLowerCase()}`
                                }
                                style={{ textDecoration: "none" }}
                                state={{
                                  nft: nft,
                                  type:
                                    nft.nftAddress.toLowerCase() ===
                                    window.config.nft_caws_address.toLowerCase()
                                      ? "caws"
                                      : nft.nftAddress.toLowerCase() ===
                                        window.config.nft_timepiece_address.toLowerCase()
                                      ? "timepiece"
                                      : "land",
                                  isOwner: true,
                                  chain: 1,
                                }}
                                onClick={() => {
                                  {
                                    nft.offer === "yes" ||
                                    nft.offerAccepted === "yes"
                                      ? updateViewCount(
                                          nft.tokenId,
                                          nft.nftAddress.toLowerCase()
                                        )
                                      : setOpenNotifications(false);
                                    markNotificationAsRead(coinbase, nft._id);
                                  }
                                }}
                                className="d-flex flex-column gap-1 p-3 header-notification-item"
                              >
                                <div className="d-flex align-items-center gap-1">
                                  <img
                                    height={16}
                                    width={16}
                                    src={
                                      nft.buy === "yes" && nft.read === false
                                        ? cartIconActive
                                        : nft.buy === "yes" && nft.read === true
                                        ? cartIcon
                                        : nft.offer === "yes" &&
                                          nft.read === false
                                        ? offerIconActive
                                        : nft.offer === "yes" &&
                                          nft.read === true
                                        ? offerIcon
                                        : nft.offerAccepted === "yes" &&
                                          nft.read === false
                                        ? transferIconActive
                                        : nft.offerAccepted === "yes" &&
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
                                      ? "NFT Sale"
                                      : nft.offer === "yes"
                                      ? "New Offer"
                                      : nft.offerAccepted === "yes"
                                      ? "NFT Sale"
                                      : nft.title}
                                  </h6>
                                </div>
                                <p
                                  className="notification-desc mb-0"
                                  style={{ fontSize: "10px" }}
                                >
                                  {nft.buy === "yes"
                                    ? `Congratulations on being the new owner of  ${
                                        nft.nftAddress ===
                                        window.config.nft_caws_address
                                          ? "CAWS"
                                          : nft.nftAddress ===
                                            window.config.nft_land_address
                                          ? "WOD"
                                          : "Timepiece"
                                      } #${nft.tokenId}.`
                                    : nft.offer === "yes"
                                    ? `There is a new offer for your ${
                                        nft.nftAddress ===
                                        window.config.nft_caws_address
                                          ? "CAWS"
                                          : nft.nftAddress ===
                                            window.config.nft_land_address
                                          ? "WOD"
                                          : "Timepiece"
                                      } #${nft.tokenId}`
                                    : nft.description}
                                </p>
                                <span className="notification-relative-time mb-0">
                                  {getRelativeTime(nft.timestamp)}
                                </span>
                              </NavLink>
                              <div
                                className="notification-delete d-flex flex-column align-items-center justify-content-center gap-2 px-3"
                                onClick={() => {
                                  deleteNotification(nft._id);
                                  
                                }}
                              >
                                <img src={orangeDeleteIcon} alt="" />
                                <span className="notif-delete-text">
                                  Delete
                                </span>
                              </div>
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
                    setTooltip(true);
                    setTimeout(() => setTooltip(false), 2000);
                  }}
                >
                  {shortAddress(coinbase)}{" "}
                  <img src={tooltip ? check : copy} alt="" />
                </div>
              </Clipboard>

              {avatar === null ? (
                <img
                  src={person}
                  className="account-icon"
                  alt=""
                  // onClick={handleRedirect}
                  onClick={() => {
                    setShowMenu(true);
                  }}
                />
              ) : (
                <img
                  src={avatar}
                  className="account-icon"
                  alt=""
                  onClick={() => {
                    setShowMenu(true);
                  }}

                  // onClick={handleRedirect}
                />
              )}
            </div>
          )}

          {showmenu === true && (
            <div className="position-absolute" style={{ width: "150px" }}>
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
                        setShowMenu(false);
                        handleRedirect();
                      }}
                    >
                      <img src={user} alt="" /> My Account{" "}
                    </span>
                    <span
                      className="menuitem2"
                      onClick={() => {
                        setShowMenu(false);
                        manageDisconnect();
                      }}
                    >
                      <img src={logout} alt="" /> Disconnect wallet{" "}
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
