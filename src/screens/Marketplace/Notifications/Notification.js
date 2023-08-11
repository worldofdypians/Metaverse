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
  deleteNotification
  
}) => {
  const [descSlice, setDescSlice] = useState(100);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      setDescSlice(item.description.length);
    } else {
      setDescSlice(100);
    }
  }, [active]);

  return (
    <div className="d-flex flex-column list-notification">
      <div
        className="list-notification-first px-2 py-4 d-flex align-items-start align-items-lg-end justify-content-between"
        onClick={() => setActive(!active)}
      >
        <div className="d-flex-flex-column gap-2" style={{width: '80%'}}>
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
                  : item.offerAccepted === "yes" && item.read === false
                  ? transferIconActive
                  : item.offerAccepted === "yes" && item.read === true
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
                ? "NFT Sale"
                : item.offer === "yes"
                ? "New Offer"
                : item.offerAccepted === "yes"
                ? "NFT Sale"
                : item.title}
            </h6>
          </div>
          <p className="notification-desc mb-0">
            {item.buy === "yes"
              ? `Congratulations on being the new owner of ${
                  item.nftAddress === window.config.nft_caws_address
                    ? "CAWS"
                    : item.nftAddress === window.config.nft_land_address
                    ? "WOD"
                    : "Timepiece"
                } #${item.tokenId} .`
              : item.offer === "yes"
              ? `There is a new offer for your ${
                  item.nftAddress === window.config.nft_caws_address
                    ? "CAWS"
                    : item.nftAddress === window.config.nft_land_address
                    ? "WOD"
                    : "Timepiece"
                } #${item.tokenId}.`
              : item.description.slice(0, descSlice)} 
              {!active  && '...'}
          </p>
        </div>
        <div className="d-flex flex-column align-items-end gap-4 notification-date-wrapper">
          <div className=" d-flex flex-column flex-lg-row align-items-end justify-content-center  gap-2">
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
          <img
            src={notificationDropdown}
            alt=""
            style={{ transform: active ? "rotate(180deg)" : "none" }}
          />
        </div>
      </div>
      {active && (
        <div className="d-flex w-100 justify-content-between">
          <NavLink
            to={
              item.redirect_link !== ""
                ? item.redirect_link
                : `/marketplace/nft/${
                    item.tokenId
                  }/${item.nftAddress.toLowerCase()}`
            }
            style={{ textDecoration: "none" }}
            state={{
              nft: item,
              type:
                item.nftAddress.toLowerCase() ===
                window.config.nft_caws_address.toLowerCase()
                  ? "caws"
                  : item.nftAddress.toLowerCase() ===
                    window.config.nft_timepiece_address.toLowerCase()
                  ? "timepiece"
                  : "land",
              isOwner: true,
              chain: 1,
            }}
            onClick={() => {
              {
                markNotificationAsRead(coinbase, item._id);
              }
            }}
            className="view-more-notif mb-2 px-2"
          >
            View More
          </NavLink>
          <div className="d-flex align-items-center gap-1 p-2" onClick={() => {deleteNotification(item._id); setActive(false)}}>
            <img src={orangeDeleteIcon} width={20} height={20} alt="" />
            <span className="delete-notif">Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
