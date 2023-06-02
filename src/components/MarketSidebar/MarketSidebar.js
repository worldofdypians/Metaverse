import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MarketSidebar = () => {

  return (
    <div className="marketplace-sidebar d-flex justify-content-center p-4">
      <div className="d-flex flex-column gap-4">
        <NavLink
        to="/marketplace" end
          className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
        >
          <img
            src={
              require(`../../screens/Marketplace/assets/ethIcon.svg`).default
            }
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          <span
            className={`sidebar-title`}
          >
            Collections
          </span>
        </NavLink>
        <div className="d-flex flex-column gap-3">
          <NavLink
          to="/marketplace/wod" end
          className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
          >
            <div className="icon-wrapper"></div>
            <span
              className={`sidebar-title`}
            >
              WoD Land
            </span>
          </NavLink>
          <NavLink
          to="/marketplace/caws" end
          className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
          >
            <div className="icon-wrapper"></div>
            <span
              className={`sidebar-title`}
            >
              CAWS
            </span>
          </NavLink>
          <NavLink
          to="/marketplace/timepiece" end
          className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
          >
            <div className="icon-wrapper"></div>
            <span
              className={`sidebar-title`}
            >
              CAWS Timepiece
            </span>
          </NavLink>
        </div>
        <NavLink
        to="/marketplace/events" end
        className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
        >
          <img
            src={
              require(`../../screens/Marketplace/assets/bnbIcon.svg`).default
            }
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          <span
            className={`sidebar-title`}
          >
            Events
          </span>
        </NavLink>
        <NavLink
        to="/marketplace/stake" end
        className={({isActive}) => isActive ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active" : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"}
        >
          <img
            src={
              require(`../../screens/Marketplace/assets/avaxIcon.svg`).default
            }
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          <span
            className={`sidebar-title`}
          >
            Stake
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default MarketSidebar;
