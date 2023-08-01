import React, { useState } from "react";
import "./_notifications.scss";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import allIcon from "./assets/allIcon.svg";
import allIconActive from "./assets/allIconActive.svg";
import cartIcon from "./assets/cartIcon.svg";
import cartIconActive from "./assets/cartIconActive.svg";
import eventIcon from "./assets/eventIcon.svg";
import eventIconActive from "./assets/eventIconActive.svg";
import markReadIcon from "./assets/markReadIcon.svg";
import markReadIconActive from "./assets/markReadIconActive.svg";
import newsIcon from "./assets/newsIcon.svg";
import newsIconActive from "./assets/newsIconActive.svg";
import offerIcon from "./assets/offerIcon.svg";
import offerIconActive from "./assets/offerIconActive.svg";
import transferIcon from "./assets/transferIcon.svg";
import transferIconActive from "./assets/transferIconActive.svg";
import updateIcon from "./assets/updateIcon.svg";
import updateIconActive from "./assets/updateIconActive.svg";
import deleteIcon from "./assets/deleteIcon.svg";
import deleteIconActive from "./assets/deleteIconActive.svg";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Notifications = ({
  coinbase,
  handleRefreshList,
  nftCount,
  isConnected,
}) => {
  const windowSize = useWindowSize();
  const [activeBar, setActiveBar] = useState("all");
  const [nftOffers, setNftOffers] = useState([]);

  async function getNotifications(walletAddress) {
    try {
      const response = await axios.get(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}`
      );
      const notifications = response.data[0]?.notifications || [];

      setNftOffers(notifications.reverse());
      console.log("Notifications:", notifications);
    } catch (error) {
      console.error("Error retrieving notifications:", error.message);
    }
  }

  async function markNotificationAsRead(walletAddress, notificationId) {
    try {
      await axios.patch(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}/${notificationId}`
      );
      console.log("Notification marked as read");
      handleRefreshList();
    } catch (error) {
      console.error("Error marking notification as read:", error.message);
    }
  }

  async function markAllNotificationsAsRead() {
    try {
      await axios.patch(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          coinbase
        )}`
      );
      handleRefreshList();

      console.log("Notifications marked as read");
    } catch (error) {
      console.error("Error marking notifications as read:", error.message);
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
    } catch (error) {
      console.error("Error deleting notification:", error.message);
    }
  }

  async function deleteAllNotifications() {
    try {
      await axios.delete(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          coinbase
        )}`
      );
      console.log("All notifications deleted");
      handleRefreshList();
    } catch (error) {
      console.error("Error deleting notifications:", error.message);
    }
  }

  useEffect(() => {
    if (isConnected && coinbase) {
      getNotifications(coinbase);
    }
  }, [nftCount, coinbase,isConnected]);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft align-items-start justify-content-start d-flex flex-column gap-2 px-3 px-lg-5 my-4"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0">
            <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
              Notification
              <span style={{ color: "#8c56ff" }}> Center</span>
            </h6>
            <div
              className={`notification-bar p-3 d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`${
                    activeBar === "all" && "notification-bar-item-active"
                  } notification-bar-item p-2 d-flex align-items-center gap-2`}
                  onClick={() => setActiveBar("all")}
                >
                  <img
                    src={activeBar === "all" ? allIconActive : allIcon}
                    alt=""
                  />
                  <h6 className="notification-item-text mb-0">All</h6>
                </div>
                <div
                  className={`${
                    activeBar === "activities" && "notification-bar-item-active"
                  } notification-bar-item p-2 d-flex align-items-center gap-2`}
                  onClick={() => setActiveBar("activities")}
                >
                  <img
                    src={
                      activeBar === "activities" ? updateIconActive : updateIcon
                    }
                    alt=""
                  />
                  <h6 className="notification-item-text mb-0">Activities</h6>
                </div>
                <div
                  className={` ${
                    activeBar === "news" && "notification-bar-item-active"
                  } notification-bar-item p-2 d-flex align-items-center gap-2`}
                  onClick={() => setActiveBar("news")}
                >
                  <img
                    src={activeBar === "news" ? newsIconActive : newsIcon}
                    alt=""
                  />
                  <h6 className="notification-item-text mb-0">News</h6>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div
                  className="notification-bar-item p-2 d-flex align-items-center gap-2"
                  onClick={markAllNotificationsAsRead}
                >
                  <img src={markReadIcon} alt="" />
                  <h6 className="notification-item-text mb-0">
                    Mark all as read
                  </h6>
                </div>
                <div
                  className="notification-bar-item p-2 d-flex align-items-center gap-2"
                  onClick={deleteAllNotifications}
                >
                  <img src={deleteIcon} alt="" />
                  <h6 className="notification-item-text mb-0">Clear all</h6>
                </div>
              </div>
            </div>
            <div className="outer-notification-list my-5 p-3">
              <div className="notifications-list p-3">
                {nftOffers && nftOffers.length === 0 && (
                  <h5 className="text-white align-center m-auto">
                    You have no notifications
                  </h5>
                )}
                {nftOffers &&
                  nftOffers.length > 0 &&
                  nftOffers.map((item, index) => (
                    <NavLink
                      to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
                      className="list-notification px-2 py-4 d-flex align-items-end justify-content-between"
                      onClick={() => markNotificationAsRead(coinbase, item._id)}
                    >
                      <div className="d-flex-flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              item.buy === "yes" && item.read === false
                                ? cartIconActive
                                : item.buy === "yes" && item.read === true
                                ? cartIcon
                                : item.offer === "yes" && item.read === false
                                ? offerIconActive
                                : item.offer === "yes" && item.read === true
                                ? offerIcon
                                : item.offerAccepted === "yes" &&
                                  item.read === false
                                ? transferIconActive
                                : item.offerAccepted === "yes" &&
                                  item.read === true
                                ? transferIcon
                                : null
                            }
                            alt=""
                          />
                          <h6
                            className="notification-title mb-0"
                            style={{
                              color:
                                item.read === false ? "#11FED2" : "#EEEDFF",
                            }}
                          >
                            {item.buy === "yes"
                              ? "NFT Sale"
                              : item.offer === "yes"
                              ? "New Offer"
                              : item.offerAccepted === "yes"
                              ? "Accepted Offer"
                              : null}
                          </h6>
                        </div>
                        <p className="notification-desc mb-0">
                          {item.buy === "yes"
                            ? `Your ${
                                item.nftAddress ===
                                window.config.nft_caws_address
                                  ? "CAWS"
                                  : item.nftAddress ===
                                    window.config.nft_land_address
                                  ? "WOD"
                                  : "Timepiece"
                              } #${
                                item.tokenId
                              } has been successfully sold. The new owner of the CAWS is registered with the address: 0x375...2b5E.`
                            : item.offer === "yes"
                            ? `There is a new offer for your ${
                                item.nftAddress ===
                                window.config.nft_caws_address
                                  ? "CAWS"
                                  : item.nftAddress ===
                                    window.config.nft_land_address
                                  ? "WOD"
                                  : "Timepiece"
                              } #${
                                item.tokenId
                              }. The user with the address 0x375...2b5E has submitted a bid of 0.95 ETH`
                            : null}
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-2">
                        <span className="notification-hour mb-0">
                          {new Date(item.timestamp).getHours() +
                            " : " +
                            (new Date(item.timestamp).getMinutes() < 10
                              ? "0"
                              : "") +
                            new Date(item.timestamp).getMinutes()}
                        </span>
                        <span className="notification-date mb-0">
                          {new Date(item.timestamp)
                            .toDateString()
                            .slice(
                              3,
                              new Date(item.timestamp).toDateString().length
                            )}
                        </span>
                      </div>
                    </NavLink>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
