import React from "react";
import cawsHeroBanner from "../../../assets/cawsHeroBanner.webp";
import "./_cawssociety.scss";

const CawsSociety = () => {
  return (
    <div className="row px-3 px-lg-5 mt-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
        <img src={cawsHeroBanner} alt="caws banner" className="caws-banner" />
      </div>
      <div className="col-12 col-lg-6">
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
