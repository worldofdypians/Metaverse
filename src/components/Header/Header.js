import React from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "./assets/person.svg";

const Header = ({ handleSignUp, handleRedirect, coinbase, avatar }) => {
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
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            Contact us
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
        <div className="col-3 d-flex align-items-center justify-content-end gap-4 pe-0">
          {!coinbase ? (
            <div className="linear-border">
              <button className="btn outline-btn px-5" onClick={handleSignUp}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div className="linear-border">
                <div className="btn outline-btn px-5">
                  {shortAddress(coinbase)}
                </div>
              </div>
              {avatar === null ? (
                <img src={person} className="account-icon" alt="" onClick={handleRedirect}/>
              ) : (
                <img src={avatar} className="account-icon" alt=""  onClick={handleRedirect}/>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
