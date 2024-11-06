import React from "react";

import aliensClass from "../../assets/gameAssets/aliensClass.png";
import humanClass from "../../assets/gameAssets/humanClass.png";
import aliensBg from "../../assets/gameAssets/aliensBg.webp";
import humansBg from "../../assets/gameAssets/humansBg.webp";

const ClassSelection = () => {
  return (
    <div className="mt-5">
      <div className="d-flex flex-column align-items-center mb-5 w-100">
      <h2 className="font-montserrat builders-title explorer-grid-title px-0">
          Race and Class Selection
        </h2>
        <span className="classes-desc mb-0 mb-lg-5">
          In World of Dypians, players select from a variety of Races and
          Classes, each with distinct abilities and playstyles, shaping their
          adventure in unique ways.
        </span>
      </div>
      <div className="d-flex flex-column flex-lg-row gap-5 gap-lg-0 align-items-center justify-content-between mt-0 mt-lg-5 px-0">
        <div className="humans-class-wrapper">
          <img src={humanClass} className="humans-img" alt="" />
          <img src={humansBg} className="humans-bg" alt="" />
          <h6 className="humans-class-text mb-0 ms-3 ms-lg-5">Humans</h6>
        </div>
        <div className="aliens-class-wrapper ">
          <img src={aliensClass} className="aliens-img" alt="" />
          <img src={aliensBg} className="aliens-bg" alt="" />

          <h6 className="aliens-class-text mb-0 me-3 me-lg-5">Aliens</h6>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
