import React from "react";
import cawsHeroBanner from "../../../assets/cawsHeroBanner.webp";
import "./_cawssociety.scss";

const CawsSociety = () => {
  return (
    <div className="row mx-0 mt-5">
      <div className="col-6 ps-0">
        <img src={cawsHeroBanner} alt="" />
      </div>
      <div className="col-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title">
            The world of the CAWS society
          </h2>
          <p className="caws-hero-content">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo, nec placerat
            massa est sed ex. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non
            ligula.
          </p>
          <div className="linear-border" style={{width: 'fit-content'}}>
            <button className="btn filled-btn px-5">View here</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsSociety;
