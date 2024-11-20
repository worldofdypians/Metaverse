import React from "react";
import "./_landflyout.scss";
// import mainChest from "../../assets/mainChest.png";
// import closeFly from "./assets/closeFly.svg";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import flyoutChest from './assets/flyoutChest.png'
import flyoutSword from './assets/flyoutSword.png'
import sword from './assets/sword.png'
import rockInner from './assets/rockInner.png'
import rockOuter from './assets/rockOuter3.png'

const ChestFlyout = () => {
  const [show, setShow] = useState(false);
  const [showText, setshowText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <div
      className={`fly-position3 ${show && "fly-active2"} ${window.location.href.includes("shop") ? "marketplace-flyout" : ""}`}
      onMouseEnter={() => {
        setshowText(true);
      }}
      onMouseLeave={() => {
        setshowText(false);
      }}
    >
      {/* <div
        className="fly-outer-wrapper2 position-relative"
      >
        <img src={flyoutSword} alt="" className="flyout-sword" />
        <NavLink
          to="/account"
          className="fly-inner-wrapper2 p-1 d-flex align-items-center gap-2"
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={() => setShow(false)}
        >
          <img src={flyoutChest} alt="" className="mainChest" />
          <Collapse in={showText} dimension="width">
              <h6 className={`fly-title2 mb-0`}>Daily Bonus</h6>
          </Collapse>
        </NavLink>
      </div> */}
      <NavLink  to="/account" className="position-relative rock-formation">
        <img src={rockInner} className="rock-inner" alt="" />
        <img src={rockOuter} className="rock-outer" alt="" />
        <img src={sword} className="new-sword" alt="" />
      </NavLink>
    </div>
  );
};

export default ChestFlyout;
