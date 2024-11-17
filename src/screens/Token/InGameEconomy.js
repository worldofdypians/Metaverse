import React, { useEffect } from "react";
import "./_token.scss";
import { NavLink } from "react-router-dom";
import inGameEconomyChart from "./assets/inGameEconomyChart.svg";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const InGameEconomy = () => {
  const imageUrl = inGameEconomyChart;

  useEffect(() => {
    // Bind Fancybox to elements with `data-fancybox` attribute
    Fancybox.bind("[data-fancybox]", {
      infinite: false,
      Toolbar: true,
      buttons: ["zoom", "close"],
      Image: {
        zoom: true,
      },
      defaultDisplay: "block",
    });

    // Cleanup on component unmount
    return () => Fancybox.destroy();
  }, []);

  return (
    <div className="economy-banner d-flex align-items-center justify-content-center py-4">
      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between  custom-container px-3 px-lg-0">
        <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
          <span className="amp-benefits-desc text-center text-md-start">
            WOD
          </span>
          <span className="ways-to-amplify-title text-center text-md-start">
            In-Game Economy
          </span>
          <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
            The in-game economy merges Gaming, DeFi, NFTs, and AI to create a
            fully immersive experience. Players can earn rewards, stake assets,
            trade NFTs, and engage with AI-powered features, building a dynamic
            and interconnected ecosystem.
          </span>
          <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
            <NavLink
              to={
                "https://docs.google.com/document/d/1Bs2LteaZZDb9_4QK-e4-8KPSYA6oYfQ6/edit?usp=sharing&ouid=114526870897283785273&rtpof=true&sd=true"
              }
              target="_blank"
              className="explore-btn col-lg-4 py-2"
            >
              Read Whitepaper
            </NavLink>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {/* <img src={inGameEconomyChart} className="w-100" alt="" /> */}
          <a href={imageUrl} data-fancybox="gallery">
            <img src={imageUrl} className="w-100" alt="In-Game Economy Chart" style={{cursor: "zoom-in"}} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InGameEconomy;
