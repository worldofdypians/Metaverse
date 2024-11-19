import React from "react";

import warriorClass from "../../assets/gameAssets/warriorClass.png";
import mageClass from "../../assets/gameAssets/mageClass.png";
import warriorBg from "../../assets/gameAssets/warriorBg.webp";
import mageBg from "../../assets/gameAssets/mageBg.webp";
import mageThumb1 from "../../assets/gameAssets/mageThumb1.png";
import mageThumb2 from "../../assets/gameAssets/mageThumb2.png";
import warriorThumb1 from "../../assets/gameAssets/warriorThumb1.png";
import warriorThumb2 from "../../assets/gameAssets/warriorThumb2.png";
import playIcon from "../../assets/gameAssets/playIcon.svg";

const ClassSelection = () => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-5 gap-lg-0 align-items-center justify-content-between mt-5 px-0">
      <div
        className="humans-class-wrapper"
        style={{ borderBottom: "3px solid black" }}
      >
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
          <div className="d-flex align-items-center gap-3 mt-3 d-none d-xl-flex">
            <a
              href="https://www.youtube.com/watch?v=HuQ10vG1DnU"
              target="_blank"
              className="d-flex flex-column gap-1 warrior-class-video-wrapper"
            >
              <span className="warrior-class-title">01</span>
             <div className="position-relative">
             <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={playIcon} width={40} height={40} alt="" />
                </div>
             <img src={warriorThumb1} alt="" />
             </div>
            </a>
            <a
              href="https://www.youtube.com/watch?v=HuQ10vG1DnU"
              target="_blank"
              className="d-flex flex-column gap-1 warrior-class-video-wrapper"
            >
              <span className="warrior-class-title">02</span>
              <div className="position-relative">
              <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={playIcon} width={40} height={40} alt="" />
                </div>
              <img src={warriorThumb2} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div
        className="aliens-class-wrapper"
        style={{ borderBottom: "3px solid black" }}
      >
        <img src={mageClass} className="aliens-img" alt="" />
        <img src={mageBg} className="aliens-bg" alt="" />

        <div className="warrior-info-wrapper d-flex flex-column align-items-end gap-4 pe-3 pe-lg-5">
          <div className="d-flex flex-column gap-2">
            <h6 className="aliens-class-text mb-0">Mage</h6>
            <span className="mage-class-title">Elemental Wield</span>
          </div>
          <p className="mb-0 warrior-class-desc" style={{ textAlign: "end" }}>
            Mages, with their ability to harness the power of the elements,
            utilize powerful spells to freeze and ignite their enemies into
            oblivion.
          </p>
          <div className="d-flex align-items-center gap-3 mt-3 d-none d-xl-flex">
            <a
              href="https://www.youtube.com/watch?v=HuQ10vG1DnU"
              target="_blank"
              className="d-flex flex-column gap-1 align-items-end mage-class-video-wrapper"
            >
              <span className="mage-class-title">01</span>
              <div className="position-relative">
                <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={playIcon} width={40} height={40} alt="" />
                </div>
                <img src={mageThumb1} alt="" />
              </div>
            </a>
            <a
              href="https://www.youtube.com/watch?v=5zAITRbQrY8"
              target="_blank"
              className="d-flex flex-column gap-1 align-items-end mage-class-video-wrapper"
            >
              <span className="mage-class-title">02</span>
              <div className="position-relative">
              <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={playIcon} width={40} height={40} alt="" />
                </div>
              <img src={mageThumb2} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
