import React from 'react'
import './_profilesidebar.scss'
import { NavLink, useLocation } from 'react-router-dom';
import dailyBonusIcon from './assets/dailyBonusIcon.svg'
import eventsIcon from './assets/eventsIcon.svg'
import offersIcon from './assets/offersIcon.svg'
import premiumIcon from './assets/premiumIcon.svg'
import profileIcon from './assets/profileIcon.svg'
import rewardsIcon from './assets/rewardsIcon.svg'

const ProfileSidebar = () => {

  const location = useLocation();


  return (
    <div className="marketplace-sidebar d-flex justify-content-center p-4">
      <div
        className="d-flex flex-column justify-content-between w-100"
        style={{ height: "90%" }}
      >
        <div className="d-flex flex-column  gap-2">
          <NavLink
            to="/account"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item profile-sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 profile-sidebar-item"
            }
            children={() => {
              return (
                <>
                  <img
                    src={profileIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>My Profile</span>
                </>
              );
            }}
          />
          <NavLink
            to="/account/my-rewards"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item rewards-sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 profile-sidebar-item"
            }
            children={() => {
              return (
                <>
                  <img
                    src={rewardsIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>My Rewards</span>
                </>
              );
            }}
          />
          <NavLink
            to="/marketplace"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item bonus-sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 profile-sidebar-item"
            }
            children={() => {
              return (
                <>
                  <img
                    src={dailyBonusIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Daily Bonus</span>
                </>
              );
            }}
          />
          <NavLink
            to="/account/events/dragon-ruins"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item events-sidebar-item-active"
                : `d-flex p-2 align-items-center gap-2 profile-sidebar-item ${
                    location.pathname.includes("events")
                      ? "events-sidebar-item-active"
                      : null
                  }`
            }
            children={() => {
              return (
                <>
                  <img
                    src={eventsIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Game Events</span>
                </>
              );
            }}
          />
          <NavLink
            to="/account/premium"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item premium-sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 profile-sidebar-item"
            }
            children={() => {
              return (
                <>
                  <img
                    src={premiumIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Premium</span>
                </>
              );
            }}
          />
          <NavLink
            to="/marketplace"
            end
            className={({ isActive }) =>
              isActive
                ? "d-flex p-2 align-items-center gap-2 profile-sidebar-item offers-sidebar-item-active"
                : "d-flex p-2 align-items-center gap-2 profile-sidebar-item"
            }
            children={() => {
              return (
                <>
                  <img
                    src={offersIcon}
                    style={{ width: "20px", height: "20px" }}
                    alt=""
                  />
                  <span className={`sidebar-title`}>Limited Offers</span>
                </>
              );
            }}
          />
          <div className="sidebar-separator my-2"></div>

        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar