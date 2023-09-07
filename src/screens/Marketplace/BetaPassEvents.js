import React from "react";
import greenArrow from "./assets/greenArrow.svg";
import { NavLink } from "react-router-dom";

const BetaPassEvents = () => {
  return (
    <div class="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
      <NavLink
        to=""
        className={
          "d-flex flex-column flex-lg-row align-items-center justify-content-between px-0 w-100"
        }
      >
        <div class="d-flex flex-column p-3">
          <h6 class="upcoming-mint-title">Treasure Hunt</h6>
          <p class="upcoming-mint-desc">
            Discover hidden treasures and local partner rewards in our exciting
            Treasure Hunt event!
          </p>
          <span
            className="detailsgreen-txt d-flex align-items-center gap-1"
            style={{ width: "fit-content" }}
          >
            Details <img src={greenArrow} alt="" />
          </span>
        </div>
        <img
          src={require("./assets/treasurebg.png")}
          alt=""
          class="upcoming-mint-img d-flex"
        />
      </NavLink>
    </div>
  );
};

export default BetaPassEvents;
