import React from "react";
import { NavLink } from "react-router-dom";
import "./_header.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";

const Header = () => {
  return (
    <div className="d-none d-lg-flex px-5 navbar-wrapper py-4">
      <div className="row justify-content-between mx-0 w-100">
        <div className="col-3 d-flex align-items-center justify-content-between ps-0">
          <NavLink to="/">
            <img src={metaverse} alt="metaverse" />
          </NavLink>
          <NavLink
            to="/explorer"
            className={({isActive}) =>
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
            to="/news"
            className={({isActive}) =>
              isActive
                ? "nav-anchor font-poppins activenavlink"
                : "nav-anchor font-poppins"
            }
          >
            News
          </NavLink>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end gap-4 pe-0">
          <div className="linear-border">
            <a href='loginlink' target={'_blank'} rel='noreferrer' className="btn outline-btn px-5" >
              Log In
            </a>
          </div>
          <div className="linear-border">
            <a  href='registerlink' target={'_blank'} rel='noreferrer' className="btn filled-btn px-5">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
