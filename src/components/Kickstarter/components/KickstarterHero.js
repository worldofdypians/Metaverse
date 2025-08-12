import React from "react";
import "../_kickstarter.scss";
import "../components/kickstarter_newcss.scss";
import { NavLink } from "react-router-dom";

const KickstarterHero = () => {
  return (
    <div className="container-fluid kickstarter-hero-wrapper d-flex align-items-center flex-column justify-content-center position-relative bordertw-3 border-black">
      <div className="custom-container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column gap-2 align-items-start">
              <div className="inline-flex items-center px-4 py-2 gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 bordertw border-yellow-400/50 rounded-full backdrop-blur-sm relative overflow-hidden">
                <span className="text-white text-xs font-normal">
                  Powered by
                </span>

                <img
                  src="https://cdn.worldofdypians.com/wod/kickstarterBnb.png"
                  alt="powered by bnb chain"
                  className="h-5"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-xl"></div>
              </div>
              <h6 className="main-hero-title font-montserrat text-start text-capitalize">
                "Keep Building" Program
              </h6>
              <p
                className="market-banner-desc font-montserrat text-gray-200 text-xl leading-relaxed backdrop-blur-sm bg-black/20 p-3 rounded-2xl bordertw border-white/10"
                style={{ textAlign: "start" }}
              >
                Supporting BNB Chain projects with free in-game experiences,
                brand growth, and strong player engagement.
              </p>
              <a
                href="https://forms.gle/MUYyzKpS23yrzGcB7"
                target="_blank"
                rel="noreferrer"
                className="explore-btn px-3 py-2"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="anchors-wrapper m-0 flex-wrap py-3 w-100 d-flex align-items-center justify-content-center gap-2 gap-lg-5">
        <NavLink
          to={"/keep-building#metrics"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Metrics</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>
        <NavLink
          to={"/keep-building#benefits"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Benefits</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>
        <NavLink
          to={"/keep-building#partners"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Partners</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>

        <NavLink
          to={"/keep-building#videos"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Videos</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>

        <NavLink
          to={"/keep-building#gameplay"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Gameplay</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>

        <NavLink
          to={"/keep-building#launchpool"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Launchpool</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>
        <NavLink
          to={"/keep-building#mini-app"}
          className="d-flex align-items-center gap-2"
        >
          <span className="anchor-title">Mini-App</span>
          <img
            src={"https://cdn.worldofdypians.com/wod/anchorArrow.svg"}
            alt=""
          />
        </NavLink>
      </div>
    </div>
  );
};

export default KickstarterHero;
