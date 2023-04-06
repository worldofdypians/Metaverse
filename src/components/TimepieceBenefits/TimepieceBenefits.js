import React from "react";
import "./_timepiecebenefits.scss";
import cawsFirstBanner from "./assets/cawsFirstBanner.png";

const TimePieceBenefits = () => {
  return (
    <div className="row px-3 py-3 p-lg-5 mt-5 gap-4 gap-lg-0">
   
      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title">
            The benefits of the CAWS TimePiece collection
          </h2>
          <p className="caws-hero-content">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </div>
         <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <img src={cawsFirstBanner} alt="caws banner" className="caws-banner" />
      </div>
    </div>
  );
};

export default TimePieceBenefits;
