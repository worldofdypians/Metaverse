import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "./assets/person.svg";
import copy from "./assets/copy.svg";
import check from "./assets/check.svg";
import user from "./assets/user.svg";
import logout from "./assets/logout.svg";
import Clipboard from "react-clipboard.js";
import OutsideClickHandler from "react-outside-click-handler";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bellIcon from './assets/bellIcon.svg'

const Header = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
}) => {
  const [tooltip, setTooltip] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false)

  let id = Math.random().toString(36);

  const manageDisconnect = () => {
    if (location.pathname.includes("/account")) {
      handleDisconnect();
      navigate("/");
    } else handleDisconnect();
  };

  return (
    <div className="d-none d-lg-flex px-5 navbar-wrapper py-4">
      <div className="row justify-content-between mx-0 w-100">
        <div className="col-7 col-xl-7 col-xxl-7 d-flex align-items-center justify-content-between ps-0">
          <NavLink to="/">
            <img src={metaverse} alt="metaverse" />
          </NavLink>
          <NavLink
            to="/explorer"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Explore
          </NavLink>
          {/* <a href="#marketplace" className="nav-anchor font-poppins">Marketplace</a> */}
          {/* <div className="nav-anchor font-poppins">Roadmap</div> */}

          <NavLink
            to="/land"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Land
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/roadmap"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Roadmap
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            News
          </NavLink>

          {/* <NavLink
            to="/nft-event"
            className={({isActive}) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            NFT Event
          </NavLink> */}
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end gap-4 pe-0 position-relative ">
          {!coinbase ? (
            <div className="linearborder2">
              <button className="btn connectwallet px-3" onClick={handleSignUp}>
                Connect Wallet
              </button>{" "}
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <img src={bellIcon} width={30} style={{cursor: 'pointer'}} onClick={() => setOpenNotifications(true)} height={30} alt="" />
                <div className="bell-amount">
                  <span className="mb-0">2</span>
                </div>
                <OutsideClickHandler onOutsideClick={() => setOpenNotifications(false)}>
                <div className={`notifications-wrapper d-flex flex-column ${openNotifications && "open-notifications"}`}>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                  <div className="header-notification d-flex align-items-center gap-2 p-3">
                    <div className="green-dot"></div>
                    <span className="notification-text">Your CAWS #234 has a new offer</span>
                  </div>
                </div>
                </OutsideClickHandler>
              </div>
              <Clipboard
                component="div"
                data-event="click"
                data-for={id}
                data-tip="Copied To Clipboard!"
                data-clipboard-text={coinbase}
                className="wallet-wrapper d-flex align-items-center gap-2 position-relative"
              >
                <div
                  className="btn connected px-3"
                  style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                  onClick={() => {
                    setTooltip(true);
                    setTimeout(() => setTooltip(false), 2000);
                  }}
                >
                  {shortAddress(coinbase)}{" "}
                  <img src={tooltip ? check : copy} alt="" />
                </div>
              </Clipboard>

              {avatar === null ? (
                <img
                  src={person}
                  className="account-icon"
                  alt=""
                  // onClick={handleRedirect}
                  onClick={() => {
                    setShowMenu(true);
                  }}
                />
              ) : (
                <img
                  src={avatar}
                  className="account-icon"
                  alt=""
                  onClick={() => {
                    setShowMenu(true);
                  }}

                  // onClick={handleRedirect}
                />
              )}
            </div>
          )}

          {showmenu === true && (
            <div className="position-absolute" style={{ width: "150px" }}>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setShowMenu(false);
                }}
              >
                <div className="menuwrapper">
                  <div className="d-flex flex-column gap-2">
                    <span
                      className="menuitem2"
                      onClick={() => {
                        setShowMenu(false);
                        handleRedirect();
                      }}
                    >
                      <img src={user} alt="" /> My Account{" "}
                    </span>
                    <span
                      className="menuitem2"
                      onClick={() => {
                        setShowMenu(false);
                        manageDisconnect();
                      }}
                    >
                      <img src={logout} alt="" /> Disconnect wallet{" "}
                    </span>
                  </div>
                </div>
              </OutsideClickHandler>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
