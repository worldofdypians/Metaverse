import React from "react";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import orangeArrow from "./assets/orangeArrow.svg";

import orangeDate from "./assets/orangeDate.svg";

import orangeExplore from "./assets/orangeExplore.svg";

import purpleFind from "./assets/purpleFind.svg";
import confluxProfileBanner from "./assets/confluxProfileBanner.png";
import coingeckoProfileBanner from "./assets/coingeckoProfileBanner.png";
import gateProfileBanner from "./assets/gateProfileBanner.png";
import baseProfileBanner from "./assets/baseProfileBanner.png";
import dogeProfileBanner from "./assets/dogeProfileBanner.png";
import cmcProfileBanner from "./assets/cmcProfileBanner.png";

const UpcomingProfileEvent = ({ onOpenEvent, data }) => {
  return (
    <div
      className="profile-event-item d-flex flex-column position-relative"
      onClick={onOpenEvent}
      style={{
        background: "rgba(236, 129, 35, 0.10)",
        transform: "translateX(0px)",
        borderBottom: "1px solid rgba(236, 129, 35, 1)",
      }}
    >
      <div className="profile-event-top d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center p-2 gap-2">
          <img src={data.logo} height={16} width={16} alt="" />
          <div className="d-flex flex-column ">
            <h6 className="profile-event-title mb-0 d-flex align-items-center gap-1">
              {data.title}{" "}
              <div
                className="profile-event-tag position-relative d-flex align-items-center justify-content-center px-1"
                style={{ background: "#EC8123", top: 0, right: 0 }}
              >
                <span
                  className="profile-event-tag-text mb-0"
                  style={{ color: "#FFFFFF" }}
                >
                  Coming Soon
                </span>
              </div>
            </h6>
            <span className="profile-event-rewards mb-0">
              {data.totalRewards}
            </span>
          </div>
        </div>
        <img
          src={
            data.linkState == "conflux"
              ? confluxProfileBanner
              : data.linkState == "gate"
              ? gateProfileBanner
              : data.linkState == "base"
              ? baseProfileBanner
              : data.linkState == "doge"
              ? dogeProfileBanner
              : data.linkState == "coinmarketcap"
              ? cmcProfileBanner
              : coingeckoProfileBanner
          }
          style={{ height: "50px", width: "25%" }}
          alt=""
        />
      </div>
      <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-1">
          <img src={orangeExplore} height={15} width={15} alt="" />
          <span className="mb-0 event-bottom-text" style={{ color: "#EC8123" }}>
            Explore & Mine
          </span>
        </div>

        <div className="d-flex align-items-center gap-1">
          <img src={orangeDate} height={15} width={15} alt="" />
          <span className="mb-0 event-bottom-text" style={{ color: "#EC8123" }}>
            {data.date}
          </span>
        </div>
        <img src={orangeArrow} height={15} width={15} alt="" />
      </div>
    </div>
  );
};

export default UpcomingProfileEvent;
