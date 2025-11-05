import React from "react";

const CloseBattlePopup = ({ onClose, setClosePopup }) => {
  return (
    <div className="battle2-close-popup shadow-none d-flex flex-column align-items-center justify-content-center gap-4 p-4 ">
      <img
        src={"https://cdn.worldofdypians.com/wod/battlepopupX.svg"}
        onClick={() => {
          setClosePopup(false);
        }}
        alt=""
        className="close-ai-x"
        width={20}
        height={20}
      />

      <div className="d-flex flex-column gap-2 mt-4">
        <h6 className="close-popup-title mb-0 text-center fight-rewards-list-title">
          Are you sure you want to exit?
        </h6>
        <p className="close-popup-title mb-0 text-center fight-rewards-list-title">
          You will forfeit the fight!
        </p>
      </div>
      <div className="d-flex align-items-center gap-2 w-100 px-3">
        <button
          className="fantasy-btn-close font-abaddon w-100"
          onClick={() => {
            onClose();
            setClosePopup(false);
          }}
        >
          Leave
        </button>
        <button
          className="fantasy-btn-stay font-abaddon w-100"
          onClick={() => {
            setClosePopup(false);
          }}
        >
          Stay
        </button>
      </div>
    </div>
  );
};

export default CloseBattlePopup;
