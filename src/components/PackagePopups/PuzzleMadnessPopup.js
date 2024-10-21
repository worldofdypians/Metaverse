import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import cawsPopupBanner from "../../screens/Marketplace/assets/cawsPopupBanner.png";
import puzzleMap from "../../screens/Marketplace/assets/puzzleMap.webp";
import popupLinear from "./assets/popupLinear.png";
import puzzlePopup from "./assets/puzzlePopup.webp";

const PuzzleMadnessPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup puzzle-madness-popup  p-4">
        <div className=" package-popup-title-wrapper position-relative d-flex align-items-center justify-content-between mb-2">
          <h6 className="package-popup-title mb-0">
            Puzzle{" "}
            <mark
              className="p-0 package-popup-title"
              style={{
                color: "#DCFB85",
                background: "transparent",
              }}
            >
              Madness
            </mark>
          </h6>
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className="position-relative mb-3">
          <img src={puzzlePopup} alt="" style={{ width: "100%" }} />
        </div>

        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            In the Puzzle Madness event, players search for 10 hidden pieces
            across the Island Zero and Dypians City maps. These pieces hold
            points that contribute to the BNB Chain leaderboard. One piece
            contains a multiplier (x2 to x8) that activates only after all
            pieces are found, significantly boosting your score.
            <br />
            <br />
            Players have two hours to find the pieces. Points are added to the
            leaderboards even if not all pieces are found. You can extend time
            by purchasing another bundle.
          </p>

          <h6 className="text-white">CAWS Utility</h6>

          <p className="package-popup-desc">
            Holding a CAWS NFT gives you an advantage. Your cat companion helps
            detect hidden pieces with an exclamation mark above its head.
            However, the cat cannot detect pieces on top or inside buildings, so
            players must thoroughly explore.
          </p>
          <h6 className="text-white">How it works:</h6>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
            Purchase the bundle from the Challenge Center
            </li>
            <li className="package-popup-desc">
            Find 10 pieces within the two-hour limit in the  Island Zero and Dypians City maps 
            </li>
            <li className="package-popup-desc">
            An indicator will guide you on whether pieces are located making your search easier
            </li>
            
          </ul>
         
        </div>
      </div>
    </div>
  );
};

export default PuzzleMadnessPopup;
