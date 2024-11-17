import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import twitterIcon from "./assets/twitterIcon.svg";
import emailIcon from "./assets/emailIcon.svg";
import discordIcon from "./assets/discordIcon.svg";
import sidebarArrow from "./assets/sidebarArrow.svg";
import { useLocation } from "react-router-dom";
import dypiansLogo from "./assets/dypiansLogo.png";
import buildLogo from "./assets/buildIcon.svg";
import supportIcon from "./assets/supportIcon.svg";

import { useEffect } from "react";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "../../screens/Account/src/Containers/Dashboard/Dashboard.schema";

const MarketSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("collections");
  const [isSticky, setIsSticky] = useState(false);

  const { email } = useAuth();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

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
      <div
        className="d-flex flex-column justify-content-between w-100"
        style={{ height: "90%" }}
      >
        <div className="d-flex flex-column  gap-2">
          {/* <NavLink
            to="/shop"
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
          /> */}
          {/* <div className="sidebar-separator my-2"></div> */}
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
                  location.pathname.includes("shop") ||
                  location.pathname.includes("loyalty") ||
                  location.pathname.includes("challenges")
                    ? "show"
                    : null
                }`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="d-flex flex-column gap-2">
                    <NavLink
                      to="/shop/beta-pass/base"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex p-2 align-items-center gap-2 sidebar-item ${
                              location.pathname.includes("conflux") ||
                              location.pathname.includes("coin98") ||
                              location.pathname.includes("coingecko") ||
                              location.pathname.includes("base") ||
                              location.pathname.includes("coinmarketcap") ||
                              location.pathname.includes("doge") ||
                              location.pathname.includes("skale") ||
                              location.pathname.includes("gate") ||
                              location.pathname.includes("skale") ||
                              location.pathname.includes("core") ||
                              location.pathname.includes("viction") ||
                              location.pathname.includes("sei") ||
                              location.pathname.includes("bnb") ||
                              location.pathname.includes("multivers")
                                ? "sidebar-item-active nft-active"
                                : null
                            }`
                      }
                    >
                      <div className="icon-wrapper"></div>
                      <div className="d-flex align-items-center gap-5">
                        <span className={`nft-sidebar-title`}>Beta Pass</span>
                        <div className="new-beta-sidebar">
                          <span className="new-beta-text">New</span>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/shop/caws"
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
                      to="/shop/land"
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
                      to="/shop/timepiece"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active nft-active"
                          : `d-flex p-2 align-items-center gap-2 sidebar-item`
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

          {/* <NavLink
            to="/shop/events/treasure-hunt"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : `d-flex p-2 align-items-center gap-2 sidebar-item ${
                    location.pathname.includes("events")
                      ? "sidebar-item-active"
                      : null
                  }`
            }
            children={({ isActive }) => {
              const icon = isActive
                ? "eventsIconActive"
                : location.pathname.includes("events")
                ? "eventsIconActive"
                : "eventsIcon";
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
          /> */}
          <NavLink
            to="/account/challenges/treasure-hunt"
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
                  <span className={`sidebar-title`}>Challenges</span>
                </>
              );
            }}
          />
          <NavLink
            to="/earn"
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
            to="/shop/mint/timepiece"
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
          {/* <NavLink
            to="/shop/nft-bridge"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "bridgeIconActive" : "bridgeIcon";
              return (
                <>
                  <img
                    src={require(`./assets/${icon}.svg`)}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>NFT Bridge</span>
                </>
              );
            }}
          /> */}
          {email && (
            //  &&
            //   data &&
            //   data.getPlayer &&
            //   data.getPlayer.displayName &&
            //   data.getPlayer.playerId &&
            //   data.getPlayer.wallet &&
            //   data.getPlayer.wallet.publicAddress
            <NavLink
              to="/loyalty-program"
              end
              className={({ isActive }) =>
                isActive
                  ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                  : "d-flex p-2 align-items-center gap-2 sidebar-item"
              }
              children={({ isActive }) => {
                const icon = isActive ? "loyaltyIconActive" : "loyaltyIcon";
                return (
                  <>
                    <img
                      src={require(`./assets/${icon}.svg`)}
                      // style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <span className={`sidebar-title`}>Loyalty Program</span>
                  </>
                );
              }}
            />
          )}

          {/* <div className="sidebar-separator my-2"></div>
          <a
            href="https://docs.google.com/forms/d/1s565QWMoCvkKwAWzkXzVPdixN_fLFlnEstya_k7caqs/viewform?edit_requested=true"
            target="_blank"
            rel="noreferrer"
            className={"d-flex p-2 align-items-center gap-2 sidebar-item"}
          >
            <img
              src={buildLogo}
              style={{ width: "20px", height: "20px" }}
              alt=""
            />
            <span className={`sidebar-title`}>Partners</span>
          </a>
          <NavLink
            to="/contact-us"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 sidebar-item sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 sidebar-item"
            }
            children={({ isActive }) => {
              const icon = isActive ? "bridgeIconActive" : "bridgeIcon";
              return (
                <>
                  <img
                    src={supportIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Support</span>
                </>
              );
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MarketSidebar;
