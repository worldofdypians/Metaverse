import React from "react";
import "./_marketCards.scss";

const MarketCards = ({
  nft,
  ethData,
  activebtn,
  eventTitle,
  eventPrice,
  eventImg,
}) => {
  return (
    <div className="marketCards-wrapper">
      <div className="d-flex flex-column gap-2">
        <div className="">
          <img src={require(`./assets/${eventImg}.png`)} alt="" className="marketicon"/>
        </div>
        <div className="d-flex justify-content-betweem gap-2 align-items-center">
          <span>{eventTitle}</span>
          <div className="d-flex flex-column">
            <span>{eventPrice}</span>
            <span></span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MarketCards;
