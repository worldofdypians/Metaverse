import React from "react";
import greenBuildingIcon from "../../assets/landAssets/greenBuildingIcon.svg";
import benefitsBuilding from "../../assets/landAssets/benefitsBuilding.png";

const LandBenefits = () => {
  return (
    <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5 position-relative mb-5">
      <div className="d-flex flex-column align-items-center justify-content-center mb-5">
        <h6 className="land-tiers font-organetto w-50">
          WOrld of dypians land owner{" "}
          <span
            className="land-tiers font-organetto"
            style={{ color: "#8c56ff" }}
          >
            benefits
          </span>
        </h6>
        <span className="w-50 tiers-desc">
          World of Dypian land ownership provides users with many in-game
          benefits
        </span>
      </div>
      <div className="glass-card">
        <img
          src={benefitsBuilding}
          alt="benefits-building"
          className="benefits-building"
        />
      </div>
      <div className="d-flex align-items-center justify-content-between mb-5">
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsCustomizable.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">Cusomizable area</span>
          </div>
        </div>
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsAccess.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">
              Access to special in-game events
            </span>
          </div>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-between mb-5"
        style={{ paddingRight: "100px", paddingLeft: "100px" }}
      >
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsUnique.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">
              Unique and valuable items
            </span>
          </div>
        </div>
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsInteractive.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">Interactive NPC</span>
          </div>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-between mb-5"
        style={{ paddingRight: "200px", paddingLeft: "200px" }}
      >
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsStaking.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">Staking rewards</span>
          </div>
        </div>
        <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsMonetize.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">Monetize Land</span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <div className="benefit-card">
          <div className="d-flex align-items-start gap-3">
            <img src={require('../../assets/landAssets/benefitsDigital.svg').default} alt="buiding Icon" />
            <span className="benefit-title w-75">Digital business opportunities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandBenefits;
