import React, { useEffect } from "react";
import "./_mobilenav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useAuth } from "../../screens/Account/src/Utils.js/Auth/AuthDetails";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openMint, setOpenMint] = useState(false);

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#mobileNav");
  const bgmenu = document.querySelector("#bgmenu");
  const location = useLocation();
  const { email } = useAuth();

  useEffect(() => {
    if (openNav === true || openMint === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNav, openMint]);

  return (
    <>
      <div
        id="mobileNav"
        className="mobile-nav d-flex justify-content-between align-items-center justify-content-between py-3 px-4"
      >
        <NavLink
          to="/shop"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "homeIconActive" : "homeIcon";
            return (
              <>
                <img
                  src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                  alt=""
                  width={22}
                  height={22}
                />
              </>
            );
          }}
        />
        <div
          onClick={() => setOpenNav(!openNav)}
          className={`mobile-link ${
            location.pathname.includes("caws") ||
            location.pathname.includes("caws") ||
            location.pathname.includes("caws")
              ? "active-mobile-link"
              : null
          }`}
        >
          <img
            src={
              location.pathname.includes("caws") ||
              location.pathname.includes("caws") ||
              location.pathname.includes("caws")
                ? "https://cdn.worldofdypians.com/wod/collectionsIconActive.svg"
                : "https://cdn.worldofdypians.com/wod/collectionsIcon.svg"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
        <NavLink
          to="/account/challenges/treasure-hunt"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "eventsIconActive" : "eventsIcon";
            return (
              <>
                <img
                  src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                  alt=""
                  width={22}
                  height={22}
                />
              </>
            );
          }}
        />
        <NavLink
          to="/ai-agent"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            return (
              <>
                <img
                  src={`https://cdn.worldofdypians.com/wod/oryn-transparent.png`}
                  alt=""
                  width={30}
                  height={30}
                />
              </>
            );
          }}
        />
        <NavLink
          to="/staking"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "stakeIconActive" : "stakeIcon";
            return (
              <>
                <img
                  src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                  alt=""
                  width={22}
                  height={22}
                />
              </>
            );
          }}
        />
        <NavLink
          to="/shop/mint/vanar"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "mintIconActive" : "mintIcon";
            return (
              <>
                <img
                  src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                  alt=""
                  width={22}
                  height={22}
                />
              </>
            );
          }}
        />

        {email && (
          <NavLink
            to="/loyalty-program"
            end
            className={({ isActive }) =>
              isActive ? "active-mobile-link" : "mobile-link"
            }
            children={({ isActive }) => {
              const icon = isActive ? "loyaltyIconActive" : "loyaltyIcon";
              return (
                <>
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${icon}.svg`}
                    alt=""
                  />
                </>
              );
            }}
          />
        )}
      </div>
      {/* <OutsideClickHandler onOutsideClick={() => setOpenMint(false)}>
        <div id="bgmenu1" className={` ${openMint && 'comming-soon-mint-active'} d-flex align-items-center justify-content-center px-3 py-2 comming-soon-mint`}>
        <h6 className="comming-soon-mint-text">Comming Soon</h6>
      </div>
        </OutsideClickHandler> */}

      <OutsideClickHandler onOutsideClick={() => setOpenNav(false)}>
        <div
          id="bgmenu1"
          className={` ${
            openMint && "comming-soon-mint-active"
          } d-flex align-items-center justify-content-center px-3 py-2 comming-soon-mint`}
        >
          <h6 className="comming-soon-mint-text">Coming Soon</h6>
        </div>
      </OutsideClickHandler>

      <OutsideClickHandler onOutsideClick={() => setOpenNav(false)}>
        <div
          id="bgmenu"
          className={`${
            openNav && "mobile-nft-wrapper-active"
          } nft-outer-wrapper-1 mobile-nft-wrapper d-flex flex-column p-3 gap-3 w-100`}
        >
          <NavLink
            to={"/shop/beta-pass/base"}
            className={({ isActive }) =>
              isActive
                ? "nft-link-active d-flex align-items-center justify-content-between"
                : "nft-link d-flex align-items-center justify-content-between"
            }
          >
            <h6 className="mobile-nft-title">Beta Pass</h6>
            <div className="new-beta-sidebar">
              <span className="new-beta-text">New</span>
            </div>
          </NavLink>
          <NavLink
            to={"/shop/land"}
            className={({ isActive }) =>
              isActive ? "nft-link-active" : "nft-link"
            }
          >
            <h6 className="mobile-nft-title">Land</h6>
          </NavLink>
          <NavLink
            to={"/shop/caws"}
            className={({ isActive }) =>
              isActive ? "nft-link-active" : "nft-link"
            }
          >
            <h6 className="mobile-nft-title">Cats and Watches Society</h6>
          </NavLink>

          <NavLink
            to={"/shop/timepiece"}
            className={({ isActive }) =>
              isActive ? "nft-link-active" : "nft-link"
            }
          >
            <h6 className="mobile-nft-title">CAWS Timepiece</h6>
          </NavLink>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default MobileNav;
