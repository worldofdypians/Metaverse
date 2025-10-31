import React from "react";

const CloseBattlePopup = ({ onClose, setClosePopup }) => {
  return (
    <div className="battle2-close-popup shadow-none d-flex flex-column align-items-center justify-content-center gap-4 p-4 ">
      <img
        src={"https://cdn.worldofdypians.com/wod/ai-popupx.png"}
        onClick={() => {
          setClosePopup(false);
        }}
        alt=""
        className="close-ai-x"
        width={40}
        height={40}
      />

      <div className="d-flex flex-column gap-2 mt-5">
        <h6 className="close-popup-title mb-0 text-center text-white">
          Are you sure you want to exit?
        </h6>
        <p className="close-popup-desc mb-0 text-center text-white">
          You will forfeit the fight
        </p>
      </div>
      <button
        className="fantasy-btn-close font-abaddon"
        onClick={() => {
          onClose();
          setClosePopup(false);
        }}
      >
        Yes
      </button>
    </div>
  );
};

export default CloseBattlePopup;
