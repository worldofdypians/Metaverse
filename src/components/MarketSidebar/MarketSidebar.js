import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import twitterIcon from "./assets/twitterIcon.svg";
import emailIcon from "./assets/emailIcon.svg";
import discordIcon from "./assets/discordIcon.svg";
import sidebarArrow from "./assets/sidebarArrow.svg";
import { useLocation } from "react-router-dom";
import dypiansLogo from './assets/dypiansLogo.png'
import { useEffect } from "react";

const MarketSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("collections");
  const [isSticky, setIsSticky] = useState(false)
 

  
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.innerHeight + window.pageYOffset;
  //     const documentHeight = document.documentElement.scrollHeight;
  //     const distanceFromBottom = documentHeight - scrollPosition;

  //     setIsSticky(distanceFromBottom <= 200);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [])

  return (
    <div className="marketplace-sidebar d-flex justify-content-center p-4">
      <div className="d-flex flex-column justify-content-between w-100" style={{height: '90%'}}>
        <div className="d-flex flex-column  gap-2">
          <NavLink
            to="/marketplace"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "homeIconActive" : "homeIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Home</span>
                </>
              );
            }}
          />

          <div className="accordion" id="accordionExample">
            <div className="">
              <h2 className="sidebar-item p-2 mb-0" id="headingOne">
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={require(`./assets/collectionsIcon.svg`).default}
                        style={{ width: "20px", height: "20px" }}
                        alt=""
                      />
                      <h6 className="sidebar-title mb-0">Collections</h6>
                    </div>
                    <img
                      src={sidebarArrow}
                      style={{ position: "relative", right: "5px" }}
                      alt=""
                    />
                  </div>
                </div>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${
                  location.pathname.includes("caws") ||
                  location.pathname.includes("land") ||
                  location.pathname.includes("timepiece")
                    ? "show"
                    : null
                }`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="d-flex flex-column gap-2">
                  <NavLink
                      to="/marketplace/caws"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex p-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      <div className="icon-wrapper"></div>
                      <span className={`nft-sidebar-title`}>CAWS</span>
                    </NavLink>
                    <NavLink
                      to="/marketplace/land"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex p-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      <div className="icon-wrapper"></div>
                      <span className={`nft-sidebar-title`}>Land</span>
                    </NavLink>
                    <NavLink
                      to="/marketplace/timepiece"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : "d-flex p-2 align-items-center gap-2 sidebar-item"
                      }
                    >
                      <div className="icon-wrapper"></div>
                      <span className={`nft-sidebar-title`}>
                        CAWS Timepiece
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NavLink
            to="/marketplace/events/dragon-ruins"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
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
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
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
          <NavLink
            to="/marketplace/mint"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "mintIconActive" : "mintIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Mint</span>
                </>
              );
            }}
          />
        </div>
          <div className={`join-now-wrapper ${isSticky && "join-up"} p-3 d-flex flex-column align-items-center gap-4`}>
            <div className="d-flex flex-column align-items-center gap-2">
              <img src={dypiansLogo} alt="" />
              <h6 className="build-wod-title mb-0">Build in WoD</h6>
              <p className="build-wod-desc mb-0">Express your creativity and make a mark on the virtual world</p>
            </div>
            <NavLink to="/contact-us">
            <button className="btn join-now-btn">Join now</button>
            </NavLink>
          </div>
      </div>
    </div>
  );
};

export default MarketSidebar;
