import React, { useEffect, useState } from "react";
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
import notifBell from "./assets/notifbell.svg";
import notificationDropdown from "./assets/notificationDropdown.svg";
import { NavLink } from "react-router-dom";

const Notification = ({
  item,
  index,
  markNotificationAsRead,
  coinbase,
  deleteNotification,
}) => {
  const [descSlice, setDescSlice] = useState(100);
  const [active, setActive] = useState(false);
  const domain = "https://www.worldofdypians.com/";

  useEffect(() => {
    if (active) {
      setDescSlice(item.description?.length || 0);
    } else {
      setDescSlice(100);
    }
  }, [active]);


  return (
    <div className="d-flex flex-column list-notification">
      <div
        className="list-notification-first px-2 py-3 d-flex flex-column flex-xxl-row flex-lg-row flex-md-row align-items-start align-items-lg-end justify-content-between"
        onClick={() => setActive(!active)}
      >
        <div className="d-flex-flex-column gap-2 notifwrapper">
          <div className="d-flex align-items-center gap-2">
            <img
              src={
                item.bought === "yes" && item.read === false
                  ? cartIconActive
                  : item.bought === "yes" && item.read === true
                  ? cartIcon
                  : item.offer === "yes" && item.read === false
                  ? offerIconActive
                  : item.offer === "yes" && item.read === true
                  ? offerIcon
                  : item.buy === "yes" && item.read === false
                  ? transferIconActive
                  : item.buy === "yes" && item.read === true
                  ? transferIcon
                  : //welcome
                  item.welcome === "yes" && item.read === false
                  ? welcomeIconActive
                  : item.welcome === "yes" && item.read === true
                  ? welcomeIcon
                  : //news
                  item.news === "yes" && item.read === false
                  ? newsIconActive
                  : item.news === "yes" && item.read === true
                  ? newsIcon
                  : //updates
                  item.update === "yes" && item.read === false
                  ? updateIconActive
                  : item.update === "yes" && item.read === true
                  ? updateIcon
                  : //events
                  item.event === "yes" && item.read === false
                  ? eventIconActive
                  : item.event === "yes" && item.read === true
                  ? eventIcon
                  : null
              }
              alt=""
            />
            <h6
              className="notification-title mb-0"
              style={{
                color: item.read === false ? "#11FED2" : "#EEEDFF",
              }}
            >
              {item.buy === "yes"
                ? "NFT Sold"
                : item.offer === "yes"
                ? "New Offer"
                : item.bought === "yes"
                ? "NFT Bought"
                : item.title}
            </h6>
          </div>
          <p className="notification-desc mb-0">
            {item.bought === "yes"
              ? `Congratulations on being the new owner of ${
                  item.nftAddress.toLowerCase() ===
                  window.config.nft_caws_address.toLowerCase()
                    ? "CAWS"
                    : item.nftAddress.toLowerCase() ===
                      window.config.nft_land_address.toLowerCase()
                    ? "WOD"
                    : "Timepiece"
                } #${item.tokenId} .`
              : item.buy === "yes"
              ? `Your  ${
                  item.nftAddress.toLowerCase() ===
                  window.config.nft_caws_address.toLowerCase()
                    ? "CAWS"
                    : item.nftAddress.toLowerCase() ===
                      window.config.nft_land_address.toLowerCase()
                    ? "WOD"
                    : "Timepiece"
                } #${item.tokenId} was sold.`
              : item.offer === "yes"
              ? `There is a new offer for your ${
                  item.nftAddress.toLowerCase() ===
                  window.config.nft_caws_address.toLowerCase()
                    ? "CAWS"
                    : item.nftAddress.toLowerCase() ===
                      window.config.nft_land_address.toLowerCase()
                    ? "WOD"
                    : "Timepiece"
                } #${item.tokenId}.`
              : item.description?.slice(0, descSlice)}
            {!active && item.offer === 'no' && item.bought === 'no' && item.buy === 'no' && "..."}
          </p>
        </div>
        <div className="d-flex flex-column align-items-end gap-xxl-4 gap-lg-4 gap-md-4 gap-1 notification-date-wrapper">
          <div className=" d-flex flex-row align-items-end justify-content-center  gap-2">
            <span className="notification-hour mb-0">
              {new Date(item.timestamp).getHours() +
                " : " +
                (new Date(item.timestamp).getMinutes() < 10 ? "0" : "") +
                new Date(item.timestamp).getMinutes()}
            </span>
            <span className="notification-date mb-0">
              {new Date(item.timestamp)
                .toDateString()
                .slice(3, new Date(item.timestamp).toDateString().length)}
            </span>
          </div>
          {item.offer === 'no' && item.bought === 'no' && item.buy === 'no' &&
          <img
            src={notificationDropdown}
            alt=""
            style={{ transform: active ? "rotate(180deg)" : "none" }}
          /> }
        </div>
      </div>
      {(active || item.offer === 'yes' || item.bought === 'yes' || item.buy === 'yes') && (
        <div className="d-flex w-100 justify-content-between">
          <NavLink
            to={
              item.welcome === "yes"
                ? "/marketplace"
                : item.redirect_link
                ? item.redirect_link.slice(
                    domain.length,
                    item.redirect_link.length
                  )
                : `/marketplace/nft/${
                    item.tokenId
                  }/${item.nftAddress.toLowerCase()}`
            }
            style={{ textDecoration: "none"}}
            rel="noreferrer"
            onClick={() => {
              markNotificationAsRead(coinbase, item._id);
            }}
            className="view-more-notif px-2"
          >
            View More
          </NavLink>
          <div
            className="d-flex align-items-center gap-1 p-2"
            onClick={() => {
              deleteNotification(item._id);
              setActive(false);
            }}
          >
            <img src={orangeDeleteIcon} width={20} height={20} alt="" />
            <span className="delete-notif">Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
