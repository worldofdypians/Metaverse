import React, { useState } from "react";
import "./_buywodcard.scss";
import whiteArrow from "../../screens/Home/VideoWrapper/assets/buyWodAssets/whiteArrow.svg";
import blueArrow from "../../screens/Home/VideoWrapper/assets/buyWodAssets/blueArrow.svg";
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
          src={require(`../../screens/Home/VideoWrapper/assets/buyWodAssets/${item.logo}`)}
          alt=""
        />
        <h6 className="mb-0 buy-wod-title">{item.title}</h6>
      </div>
      <img src={switchArrow ? blueArrow : whiteArrow} alt="" />
    </NavLink>
  );
};

export default BuyWodCard;
