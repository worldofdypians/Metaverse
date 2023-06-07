import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import twitterIcon from "./assets/twitterIcon.svg";
import emailIcon from "./assets/emailIcon.svg";
import discordIcon from "./assets/discordIcon.svg";

const MarketSidebar = () => {
  const [activeLink, setActiveLink] = useState("collections");

  return (
    <div className="marketplace-sidebar d-flex justify-content-center p-4">
      <div className="d-flex flex-column" style={{ gap: "60px" }}>
        <div className="d-flex flex-column gap-4">
          <NavLink
            to="/marketplace"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive
                ? "collectionsIconActive"
                : "collectionsIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Collctions</span>
                </>
              );
            }}
          />
          <div className="d-flex flex-column gap-3">
            <NavLink
              to="/marketplace/caws"
              end
              className={({ isActive }) =>
                isActive
                  ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                  : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
              }
            >
              <div className="icon-wrapper"></div>
              <span className={`sidebar-title`}>CAWS</span>
            </NavLink>
            <NavLink
              to="/marketplace/wod"
              end
              className={({ isActive }) =>
                isActive
                  ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                  : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
              }
            >
              <div className="icon-wrapper"></div>
              <span className={`sidebar-title`}>WoD Land</span>
            </NavLink>

            <NavLink
              to="/marketplace/timepiece"
              end
              className={({ isActive }) =>
                isActive
                  ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                  : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
              }
            >
              <div className="icon-wrapper"></div>
              <span className={`sidebar-title`}>CAWS Timepiece</span>
            </NavLink>
          </div>
          <NavLink
            to="/marketplace/events"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "eventsIconActive" : "eventsIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Events</span>
                </>
              );
            }}
          />
          <NavLink
            to="/marketplace/stake"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex px-2 py-3 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex px-2 py-3 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "stakeIconActive" : "stakeIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Stake</span>
                </>
              );
            }}
          />
        </div>
        <div className="d-flex flex-column gap-3">
          <span className="sidebar-divider"></span>
          <a
            href="https://twitter.com/worldofdypians"
            target="_blank"
            className="d-flex align-items-center gap-3"
            style={{ textDecoration: "none" }}
          >
            <img src={twitterIcon} height={20} width={20} alt="" />
            <h6 className="social-link">Follow Us</h6>
          </a>
          <a
            href="https://t.me/worldofdypians"
            target="_blank"
            className="d-flex align-items-center gap-3"
            style={{ textDecoration: "none" }}
          >
            <img src={discordIcon} height={20} width={20} alt="" />
            <h6 className="social-link">Join our community</h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MarketSidebar;
