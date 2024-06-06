import React from "react";
import "./_ecosystem.scss";
import wodToken from "../../../../assets/wodAssets/token.png";

const Ecosystem = () => {
  return (
    <div className="ecosystem-wrapper position-relative d-flex justify-content-center align-items-center">
      <div className="custom-container w-100">
        <div className="d-flex flex-column gap-4">
          <h4 className="main-hero-title font-montserrat text-center">
            WoD{" "}
            <mark className="font-montserrat main-hero-title explore-tag pe-2">
              Ecosystem
            </mark>
          </h4>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <div className="d-flex flex-column gap-3 col-lg-4">
              <h2 className="font-montserrat builders-title explorer-grid-title px-0">
                IN-GAME ECONOMY
              </h2>
              <span className="text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                hendrerit augue quis enim auctor ullamcorper. Curabitur massa
                ante, vulputate non feugiat sit amet, facilisis a libero. Aenean
                ullamcorper erat scelerisque, sollicitudin nibh sed, elementum
                nisi. Duis mattis scelerisque risus a efficitur. Aliquam
                condimentum vitae ipsum tincidunt sodales.
              </span>
            </div>
            <div>
              <img src={wodToken} alt="" className="wod-token"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
