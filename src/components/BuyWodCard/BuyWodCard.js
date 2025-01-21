import React, { useState } from "react";
import "./_buywodcard.scss";

import { NavLink } from "react-router-dom";

const BuyWodCard = ({ item }) => {
  const [switchArrow, setSwitchArrow] = useState(false);

  return (
    <NavLink
      to={item.link}
      target="_blank"
      rel="noreferrer"
      className="buy-wod-card p-3 d-flex align-items-center justify-content-between"
      onMouseEnter={() => setSwitchArrow(true)}
      onMouseLeave={() => setSwitchArrow(false)}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src={`https://cdn.worldofdypians.com/wod/${item.logo}`}
          alt=""
          style={{ width: 32, height: 32 }}
        />
        <h6 className="mb-0 buy-wod-title">{item.title}</h6>
      </div>
      <img
        src={
          switchArrow
            ? "https://cdn.worldofdypians.com/wod/blueArrowBuyWod.svg"
            : "https://cdn.worldofdypians.com/wod/whiteArrowBuyWod.svg"
        }
        alt=""
      />
    </NavLink>
  );
};

export default BuyWodCard;
