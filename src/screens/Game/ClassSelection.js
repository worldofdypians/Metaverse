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
          Race and Class{" "}
          <mark className="font-montserrat explore-tag pe-2">Selection</mark>
        </h2>
        <span className="classes-desc mb-5">
          In World of Dypians, players select from a variety of Races and
          Classes, each with distinct abilities and playstyles, shaping their
          adventure in unique ways.
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-5 px-0">
        <div className="humans-class-wrapper">
          <img src={humanClass} className="humans-img" alt="" />
          <img src={humansBg} className="humans-bg" alt="" />
          <h6 className="humans-class-text mb-0 ms-5">Humans</h6>
        </div>
        <div className="aliens-class-wrapper ">
          <img src={aliensClass} className="aliens-img" alt="" />
          <img src={aliensBg} className="aliens-bg" alt="" />

          <h6 className="aliens-class-text mb-0 me-5">Aliens</h6>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
