import React from "react";
import timepieceBanner from "./assets/timePieceBanner.webp";

const TimepieceHero = () => {
  return (
    <div className="full-screen-main-hero d-flex align-items-center">
      <div className="container-fluid px-3 px-lg-5 position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xxl-7 d-flex flex-column align-items-center">
            <h6 className="timepiece-title font-organetto d-flex flex-column flex-lg-row gap-2">
              Caws Timepiece
              <span className="timepiece-title" style={{color: 'rgb(140, 86, 255)'}}>Collection</span>
            </h6>
            <p className="timepiece-hero-desc" style={{textAlign: 'center'}}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
              voluptatum sunt officiis laboriosam possimus maiores iste tenetur
              praesentium, voluptates odit? Tempore provident neque magnam
              libero odio doloribus sequi asperiores voluptate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimepieceHero;
