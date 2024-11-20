import React, { useState, useEffect } from "react";
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

import welcomeIcon from "./assets/welcomeIcon.svg";
import welcomeIconActive from "./assets/welcomeIconActive.svg";

import deleteIcon from "./assets/deleteIcon.svg";
import deleteIconActive from "./assets/deleteIconActive.svg";
import orangeDeleteIcon from "./assets/orangeDeleteIcon.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";
import notifBell from "./assets/notifbell.svg";
import notificationDropdown from "./assets/notificationDropdown.svg";
import Notification from "./Notification";

const Notifications = ({
  coinbase,
  handleRefreshList,
  nftCount,
  isConnected,
  authToken,
}) => {
  const windowSize = useWindowSize();
  const [activeBar, setActiveBar] = useState("all");
  const [nftOffers, setNftOffers] = useState([]);
  const [nftOffersAll, setNftOffersAll] = useState([]);
  const [descSlice, setDescSlice] = useState(100);
  const API_BASE_URL = "https://api.worldofdypians.com";

  async function addNewUserIfNotExists(
    walletAddress,
    title,
    description,
    redirect_link
  ) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.data.length === 0) {
        const newUserResponse = await axios.post(
          `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
            walletAddress
          )}`,
          {
            tokenId: "",
            nftAddress: "",
            timestamp: Date.now(),
            read: false,
            offer: "no",
            offerAccepted: "no",
            buy: "no",
            event: "no",
            news: "no",
            welcome: "yes",
            update: "no",
            title: "Welcome",
            description:
              "Welcome to the immersive World of Dypians! Take a moment to step into our NFT Shop, where a mesmerizing collection of digital art await your exploration. Happy browsing!",
            redirect_link: "",
          }, {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        console.log("New user added:", newUserResponse.data);
        let lso = newUserResponse.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        setNftOffers(lso);
        setNftOffersAll(lso);
      } else {
        console.log("User already exists:", response.data);

        const notifications = response.data[0]?.notifications || [];
        let lso = notifications.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNftOffers(lso);
        setNftOffersAll(lso);
      }
    } catch (error) {
      console.error("Error adding new user:", error.message);
    }
  }

  async function markNotificationAsRead(walletAddress, notificationId) {
    try {
      await axios.patch(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}/${notificationId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
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
        )}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
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
        )}/${notificationId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("Notification deleted");
      handleRefreshList();
    } catch (error) {
      console.error("Error deleting notification:", error.message);
    }
  }

  async function deleteAllNotifications() {
    try {
      await axios.delete(
        `https://api.worldofdypians.com/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          coinbase
        )}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("All notifications deleted");
      handleRefreshList();
    } catch (error) {
      console.error("Error deleting notifications:", error.message);
    }
  }

  const filterNotifications = (filtertitle) => {
    if (nftOffersAll.length > 0) {
      if (filtertitle === "all") {
        setNftOffers(nftOffersAll);
      } else if (filtertitle === "activities") {
        const filterArray = nftOffersAll.filter((item) => {
          return item.news === "no";
        });
        setNftOffers(filterArray);
      } else if (filtertitle === "news") {
        const filterArray = nftOffersAll.filter((item) => {
          return item.news === "yes";
        });
        setNftOffers(filterArray);
      }
    } else {
      setNftOffers([]);
    }
  };

  async function deleteNotificationsByType(walletAddress, type) {
    try {
      const notifications = nftOffersAll;

      if (type === "activities") {
        const notificationsToDelete = notifications.filter(
          (notification) => notification["news"] === "no"
        );

        for (const notification of notificationsToDelete) {
          await axios.delete(
            `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
              walletAddress
            )}/${notification._id}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
        }

        console.log(`Deleted ${type} notifications`);
        handleRefreshList();
      } else if (type === "news") {
        const notificationsToDelete = notifications.filter(
          (notification) => notification["news"] === "yes"
        );

        for (const notification of notificationsToDelete) {
          await axios.delete(
            `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
              walletAddress
            )}/${notification._id}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
        }

        console.log(`Deleted ${type} notifications`);
        handleRefreshList();
      }
    } catch (error) {
      console.error(`Error deleting ${type} notifications:, error.message`);
    }
  }

  async function markNotificationsAsReadByType(walletAddress, type) {
    try {
      const notifications = nftOffersAll;

      if (type === "activities") {
        const filteredNotifications = notifications.filter(
          (notification) => notification["news"] === "no"
        );

        for (const notification of filteredNotifications) {
          await axios.patch(
            `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
              walletAddress
            )}/${notification._id}, { read: true }`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
        }

        console.log(`Marked ${type} notifications as read`);
        handleRefreshList();
      } else if (type === "news") {
        const filteredNotifications = notifications.filter(
          (notification) => notification["news"] === "yes"
        );

        for (const notification of filteredNotifications) {
          await axios.patch(
            `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
              walletAddress
            )}/${notification._id}, { read: true }`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
        }

        console.log(`Marked ${type} notifications as read`);
        handleRefreshList();
      }
    } catch (error) {
      console.error(
        `Error marking ${type} notifications as read:, error.message`
      );
    }
  }

  useEffect(() => {
    if (isConnected && coinbase) {
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT Shop, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
    }
  }, [nftCount, coinbase, isConnected]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Notification Center";
  }, []);

  return (
    <>
      <div
        className="container-fluid mt-lg-5 pt-lg-5 d-flex justify-content-end mt-5 "
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
              className={`notification-bar p-3 d-flex flex-lg-row flex-xxl-row flex-column align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`${
                    activeBar === "all" && "notification-bar-item-active"
                  } notification-bar-item p-2 d-flex align-items-center gap-2`}
                  onClick={() => {
                    setActiveBar("all");
                    filterNotifications("all");
                  }}
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
                  onClick={() => {
                    setActiveBar("activities");
                    filterNotifications("activities");
                  }}
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
                  onClick={() => {
                    setActiveBar("news");
                    filterNotifications("news");
                  }}
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
                  onClick={() => {
                    activeBar === "all"
                      ? markAllNotificationsAsRead()
                      : activeBar === "activities"
                      ? markNotificationsAsReadByType(coinbase, "activities")
                      : markNotificationsAsReadByType(coinbase, "news");
                  }}
                >
                  <img src={markReadIcon} alt="" />
                  <h6 className="notification-item-text mb-0">
                    Mark all as read
                  </h6>
                </div>
                <div
                  className="notification-bar-item p-2 d-flex align-items-center gap-2"
                  onClick={() => {
                    activeBar === "all"
                      ? deleteAllNotifications()
                      : activeBar === "activities"
                      ? deleteNotificationsByType(coinbase, "activities")
                      : deleteNotificationsByType(coinbase, "news");
                  }}
                >
                  <img src={deleteIcon} alt="" />
                  <h6 className="notification-item-text mb-0">Clear all</h6>
                </div>
              </div>
            </div>
            <div className="outer-notification-list my-5 p-3">
              <div className="notifications-list px-xxl-3 px-lg-3 px-md-3 py-xxl-3 py-lg-3 py-md-3">
                {nftOffers && nftOffers.length === 0 && (
                  <div className="d-flex flex-column gap-2 align-items-center m-auto">
                    <img src={notifBell} alt="" />
                    <h5 className="text-white align-center">
                      No recent notifications
                    </h5>
                  </div>
                )}
                {nftOffers &&
                  nftOffers.length > 0 &&
                  nftOffers.map((item, index) => (
                    <Notification
                      item={item}
                      index={index}
                      markNotificationAsRead={markNotificationAsRead}
                      coinbase={coinbase}
                      deleteNotification={deleteNotification}
                    />
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
