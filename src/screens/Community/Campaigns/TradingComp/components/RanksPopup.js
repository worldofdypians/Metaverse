import React from "react";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";

const RanksPopup = ({ participants, onClose, coinbase }) => {
  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none" }}
    >
      <div class="overlay-shadow-2"></div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <h6 className="trading-popup-title mb-0">Weekly Rankings</h6>
        <img
          src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>

      <div className="d-flex trading-comp-overflow-3 flex-column gap-2 mt-3">
        {participants.map((item, index) => (
          <div className="d-flex align-items-center gap-2">
            <div className="trading-comp-lb-rank d-flex align-items-center justify-content-center">
              {index + 1}
            </div>
            <div
              className={`trading-comp-lb-item-2 ${
                coinbase === item.Address && "trading-comp-lb-item-player"
              } p-2 d-flex w-100 align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center gap-2">
                <span>
                  {shortAddress(item.Address)}{" "}
                  {coinbase === item.Address && "(You)"}
                </span>
              </div>
              <span className="trading-comp-lb-prize">
${getFormattedNumber(item["Trading Volume in USD"], 0)}

              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RanksPopup;
