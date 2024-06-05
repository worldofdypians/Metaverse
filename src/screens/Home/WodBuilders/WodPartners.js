import React from "react";
import "./_wodbuilders.scss";
import partnersRight from './assets/partnersRight.svg'
import { NavLink } from "react-router-dom";

const WodPartners = () => {
  const partners = [
    {
      name: "Chainlink",
      icon: "chainlink.svg",
    },
    {
      name: "Bnb Chain",
      icon: "bnb.svg",
    },
    {
      name: "Core",
      icon: "core.svg",
    },
    {
      name: "Avalanche",
      icon: "avalanche.svg",
    },
    {
      name: "CMC",
      icon: "cmc.svg",
    },
    {
      name: "Coingecko",
      icon: "coingecko.svg",
    },
    {
      name: "KuCoin",
      icon: "kucoin.svg",
    },
    {
      name: "Coin98",
      icon: "coin98.svg",
    },
    {
      name: "Conflux",
      icon: "conflux.svg",
    },
    {
      name: "Skale",
      icon: "skale.svg",
    },
    {
      name: "Gate.Io",
      icon: "gateio.svg",
    },
    {
      name: "Mexc Global",
      icon: "mexc.svg",
    },
    {
      name: "Castrum Capital",
      icon: "castrum.png",
    },
    {
      name: "Financial Move",
      icon: "financialmove.svg",
    },
  ];

  return (
    <div className="w-100 px-3 px-lg-5 mx-0 build-business-wrapper py-4 d-flex justify-content-center">
      <div className="custom-container w-100">
      <div className="d-flex flex-column gap-2">
       <div className="d-flex align-items-center justify-content-between">
       <h2 className="font-montserrat builders-title explorer-grid-title px-0">
          PARTNERS AND{" "}
          <mark className="font-montserrat explore-tag pe-2">INVESTORS</mark>
        </h2>
        <NavLink to={"/partners"} className="d-flex align-items-center gap-2">
          <span className="view-all-partners">View All</span>
          <img src={partnersRight} alt="" />
        </NavLink>
       </div>
        <div className="d-flex align-items-start justify-content-between flex-wrap">
          {partners.slice(0, 12).map((partner, index) => (
            <div
              key={index}
              className="d-flex align-items-center flex-column gap-2 mb-3 mb-lg-0"
              style={{width: "90px"}}
            >
              <div className="partner-logo-container">
                <img
                  src={require(`./assets/partners/${partner.icon}`)}
                  alt=""
                />
              </div>
              <h6 className="mb-0 small-partners-title">{partner.name}</h6>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default WodPartners;
