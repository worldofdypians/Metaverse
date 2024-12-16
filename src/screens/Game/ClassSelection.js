import React from "react";
const ClassSelection = ({ setVideoPopup, setVideoLink }) => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-5 gap-lg-0 align-items-center justify-content-between mt-5 px-0">
      <div
        className="humans-class-wrapper"
        style={{ borderBottom: "3px solid black" }}
      >
        <img src={"https://cdn.worldofdypians.com/wod/warriorClass.png"} className="humans-img" alt="" />
        <img src={"https://cdn.worldofdypians.com/wod/warriorBg.webp"} className="humans-bg" alt="" />
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
            <div
              className="d-flex flex-column gap-1 warrior-class-video-wrapper"
              onClick={() => {
                setVideoPopup(true);
                setVideoLink("WvpAPEZzbOU");
              }}
            >
              <span className="warrior-class-title">01</span>
              <div className="position-relative">
                <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={"https://cdn.worldofdypians.com/wod/playIcon.svg"} width={40} height={40} alt="" />
                </div>
                <img src={"https://cdn.worldofdypians.com/wod/warriorThumb1.png"} alt="" />
              </div>
            </div>
            <div
              className="d-flex flex-column gap-1 warrior-class-video-wrapper"
              onClick={() => {
                setVideoPopup(true);
                setVideoLink("rJNbNdeg4U8");
              }}
            >
              <span className="warrior-class-title">02</span>
              <div className="position-relative">
                <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={"https://cdn.worldofdypians.com/wod/playIcon.svg"} width={40} height={40} alt="" />
                </div>
                <img src={"https://cdn.worldofdypians.com/wod/warriorThumb2.png"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="aliens-class-wrapper"
        style={{ borderBottom: "3px solid black" }}
      >
        <img src={"https://cdn.worldofdypians.com/wod/mageClass.png"} className="aliens-img" alt="" />
        <img src={"https://cdn.worldofdypians.com/wod/mageBg.webp"} className="aliens-bg" alt="" />

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
            <div
              className="d-flex flex-column gap-1 align-items-end mage-class-video-wrapper"
              onClick={() => {
                setVideoPopup(true);
                setVideoLink("HuQ10vG1DnU");
              }}
            >
              <span className="mage-class-title">01</span>
              <div className="position-relative">
                <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={"https://cdn.worldofdypians.com/wod/playIcon.svg"} width={40} height={40} alt="" />
                </div>
                <img src={"https://cdn.worldofdypians.com/wod/mageThumb1.png"} alt="" />
              </div>
            </div>
            <div
              className="d-flex flex-column gap-1 align-items-end mage-class-video-wrapper"
              onClick={() => {
                setVideoPopup(true);
                setVideoLink("5zAITRbQrY8");
              }}
            >
              <span className="mage-class-title">02</span>
              <div className="position-relative">
                <div className="play-icon-wrapper d-flex align-items-center justify-content-center">
                  <img src={"https://cdn.worldofdypians.com/wod/playIcon.svg"} width={40} height={40} alt="" />
                </div>
                <img src={"https://cdn.worldofdypians.com/wod/mageThumb2.png"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
