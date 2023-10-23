import React from "react";
import "./_landflyout.scss";
import mainChest from "../../assets/mainChest.png";
import closeFly from "./assets/closeFly.svg";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

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
      className={`fly-position2 ${show && "fly-active2"}`}
      onMouseOverCapture={() => {
        setshowText(true);
      }}
      onMouseLeave={() => {
        setshowText(false);
      }}
    >
      <div className="fly-outer-wrapper2 position-relative">
        <NavLink
          to="/account"
          className="fly-inner-wrapper2 p-1 d-flex align-items-center gap-2"
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={() => setShow(false)}
        >
          <img src={mainChest} alt="" className="mainChest" />
          <h6
            className={` font-organetto ${
              showText ? "fly-title2" : "flyTitleHidden"
            } `}
          >
            Daily Bonus
          </h6>
        </NavLink>
      </div>
    </div>
  );
};

export default ChestFlyout;
