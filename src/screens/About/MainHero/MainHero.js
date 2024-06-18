import React from "react";
import "./_mainheroabout.scss";
import epicblack from "../../../assets/epicblack.svg";
import anchorArrow from "../../../assets/anchorArrow.svg";
import { NavLink } from "react-router-dom";

const MainHero = () => {
  return (
    <div className="mainhero-wrapper about-wrapper video-wrapper position-relative d-flex align-items-center flex-column justify-content-center gap-5 position-relative">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex w-100 flex-column align-items-center gap-2">
          <h2 className="font-montserrat builders-title explorer-grid-title px-0">
            The Biggest metaverse ever built
          </h2>
          <p className="about-hero-desc">
            An action-packed multiplayer game where heroes come together to
            defend their planet against the Dark Lord's invasion. Choose from a
            variety of heroes, each with unique abilities, and join forces with
            other players to destroy the enemy's bases.
          </p>
          <div className="opacitywrapper5 filled-btn m-0 px-3">
            <a
              className="game-event-download py-1 d-flex align-items-center gap-2"
              href="https://store.epicgames.com/p/world-of-dypians-2e0694"
              target="_blank"
            >
              <img src={epicblack} alt="icon" className="epicgame2" />
              Download
            </a>
          </div>
        </div>
        <div className="anchors-wrapper flex-wrap py-3 w-100 d-flex align-items-center justify-content-center gap-5">
          <NavLink to={"/about#partners"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Partners</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
          <NavLink to={"/about#roadmap"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Roadmap</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
          <NavLink to={"/about#tokenomics"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Tokenomics</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
          <NavLink to={"/about#security"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Security</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
          <NavLink to={"/about#team"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Team</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
          <NavLink to={"/about#brand"} className="d-flex align-items-center gap-2">
            <span className="anchor-title">Brand</span>
            <img src={anchorArrow} alt="" />
          </NavLink>
   
        </div>
      </div>
    </div>
  );
};

export default MainHero;
