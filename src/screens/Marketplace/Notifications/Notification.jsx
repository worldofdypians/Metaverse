import React, { useEffect, useState } from "react";
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
  const domain = "https://www.worldofdypians.com";

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
                  ? "https://cdn.worldofdypians.com/wod/cartIconActive.svg"
                  : item.bought === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/cartIcon.svg" 
                  : item.offer === "yes" && item.read === false
                  ?  "https://cdn.worldofdypians.com/wod/offerIconActive.svg" 
                  : item.offer === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/offerIcon.svg" 
                  : item.buy === "yes" && item.read === false
                  ? "https://cdn.worldofdypians.com/wod/transferIconActive.svg" 
                  : item.buy === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/transferIcon.svg" 
                  : //welcome
                  item.welcome === "yes" && item.read === false
                  ? "https://cdn.worldofdypians.com/wod/welcomeIconActive.svg" 
                  : item.welcome === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/welcomeIcon.svg" 
                  : //news
                  item.news === "yes" && item.read === false
                  ? "https://cdn.worldofdypians.com/wod/newsIconActive.svg" 
                  : item.news === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/newsIcon.svg" 
                  : //updates
                  item.update === "yes" && item.read === false
                  ? "https://cdn.worldofdypians.com/wod/updateIconActive.svg" 
                  : item.update === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/updateIcon.svg" 
                  : //events
                  item.event === "yes" && item.read === false
                  ? "https://cdn.worldofdypians.com/wod/eventIconActive.svg" 
                  : item.event === "yes" && item.read === true
                  ? "https://cdn.worldofdypians.com/wod/eventIcon.svg" 
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
            src={"https://cdn.worldofdypians.com/wod/notificationDropdown.svg"}
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
                ? "/shop"
                : item.redirect_link
                ? item.redirect_link.slice(
                    domain.length,
                    item.redirect_link.length
                  )
                : `/shop/nft/${
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
            <img src={"https://cdn.worldofdypians.com/wod/orangeDeleteIcon.svg"} width={20} height={20} alt="" />
            <span className="delete-notif">Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
