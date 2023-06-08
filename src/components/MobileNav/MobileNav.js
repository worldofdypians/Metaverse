import React, { useEffect } from "react";
import "./_mobilenav.scss";
import { NavLink, useLocation } from "react-router-dom";
import cawsLogo from '../../screens/Marketplace/assets/cawsLogo.png'
import wodLogo from '../../screens/Marketplace/assets/wodLogo.png'
import collectionsIcon from '../MarketSidebar/assets/collectionsIcon.svg'
import collectionsIconActive from '../MarketSidebar/assets/collectionsIconActive.svg'
import { useState } from "react";

const MobileNav = () => {

  const [openNav, setOpenNav] = useState(false)

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#mobileNav");
  const bgmenu = document.querySelector("#bgmenu");
  const location = useLocation()


  useEffect(() => {
    if (openNav === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNav]);

  return (
    <>
      <div id="mobileNav" className="mobile-nav d-flex justify-content-between align-items-center justify-content-between py-3 px-4">
        <NavLink
          to="/marketplace"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "homeIconActive" : "homeIcon";
            return (
              <>
                <img
                  src={require(`../MarketSidebar/assets/${icon}.svg`)}
                  alt=""
                />
              </>
            );
          }}
        />
        <div onClick={() => setOpenNav(!openNav)} className={`mobile-link ${location.pathname.includes("caws") || location.pathname.includes("caws") || location.pathname.includes("caws") ? "active-mobile-link" : null}`}>
          <img
            src={location.pathname.includes("caws") || location.pathname.includes("caws") || location.pathname.includes("caws") ? collectionsIconActive : collectionsIcon} 
            width={22}
            height={22}
            alt=""
          />
        </div>
        <NavLink
          to="/marketplace/events"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "eventsIconActive" : "eventsIcon";
            return (
              <>
                <img
                  src={require(`../MarketSidebar/assets/${icon}.svg`)}
                  alt=""
                />
              </>
            );
          }}
        />
        <NavLink
          to="/marketplace/stake"
          end
          className={({ isActive }) =>
            isActive ? "active-mobile-link" : "mobile-link"
          }
          children={({ isActive }) => {
            const icon = isActive ? "stakeIconActive" : "stakeIcon";
            return (
              <>
                <img
                  src={require(`../MarketSidebar/assets/${icon}.svg`)}
                  alt=""
                />
              </>
            );
          }}
        />
      </div>
      <div id="bgmenu" className={`${openNav && "mobile-nft-wrapper-active"} nft-outer-wrapper-1 mobile-nft-wrapper d-flex flex-column p-3 gap-3 w-100`}>
        <NavLink to={"/marketplace/caws"} className={({isActive}) => isActive ? 'nft-link-active' : 'nft-link'} >
          <img src={cawsLogo} height={22} width={22} alt="" />
          <h6 className="mobile-nft-title">Cats and Watches Society</h6>
        </NavLink>
        <NavLink to={"/marketplace/wod"} className={({isActive}) => isActive ? 'nft-link-active' : 'nft-link'} >
          <img src={wodLogo} height={22} width={22} alt="" />
          <h6 className="mobile-nft-title">WoD Land</h6>
        </NavLink>
        <NavLink to={"/marketplace/timepiece"} className={({isActive}) => isActive ? 'nft-link-active' : 'nft-link'} >
          <img src={cawsLogo} height={22} width={22} alt="" />
          <h6 className="mobile-nft-title">CAWS Timepiece</h6>
        </NavLink>
      </div>
    </>
  );
};

export default MobileNav;
