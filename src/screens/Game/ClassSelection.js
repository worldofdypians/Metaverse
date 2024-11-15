import React from "react";

import warriorClass from "../../assets/gameAssets/warriorClass.png";
import mageClass from "../../assets/gameAssets/mageClass.png";
import warriorBg from "../../assets/gameAssets/warriorBg.webp";
import mageBg from "../../assets/gameAssets/mageBg.webp";
import mageThumb1 from "../../assets/gameAssets/mageThumb1.png";
import mageThumb2 from "../../assets/gameAssets/mageThumb2.png";
import warriorThumb1 from "../../assets/gameAssets/warriorThumb1.png";
import warriorThumb2 from "../../assets/gameAssets/warriorThumb2.png";

const ClassSelection = () => {
  return (
    <div className="mt-5">
      <div className="d-flex flex-column flex-lg-row gap-5 gap-lg-0 align-items-center justify-content-between mt-0 mt-lg-5 px-0">
        <div className="humans-class-wrapper">
          <img src={warriorClass} className="humans-img" alt="" />
          <img src={warriorBg} className="humans-bg" alt="" />
          <div className="warrior-info-wrapper d-flex flex-column gap-4 ps-3 ps-lg-5">
            <div className="d-flex flex-column gap-2">
              <h6 className="humans-class-text mb-0">Warrior</h6>
              <span className="warrior-class-title">Unbreakable Strength</span>
            </div>
            <p className="mb-0 warrior-class-desc">
              Specializing in combat, the warrior utilizes weapons, armor, and
              brute strength to conquer their enemies.
            </p>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex flex-column gap-1">
                <span className="warrior-class-title">01</span>
              </div>
            </div>
          </div>
        </div>
        <div className="aliens-class-wrapper ">
          <img src={mageClass} className="aliens-img" alt="" />
          <img src={mageBg} className="aliens-bg" alt="" />

          <h6 className="aliens-class-text mb-0 me-3 me-lg-5">Mage</h6>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
