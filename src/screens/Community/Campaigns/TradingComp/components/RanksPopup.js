import React, { useEffect, useRef, useState } from "react";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";

const RanksPopup = ({ participants, onClose, coinbase }) => {
  const scrollRef = useRef(null);

  const [slice, setSlice] = useState(300);

  const onScrollEnd = () => {
    setSlice(slice + 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (el) {
        const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
        if (isBottom) {
          onScrollEnd && onScrollEnd(); // Dispatch your function
        }
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onScrollEnd]);

  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none" }}
    >
      <div className="overlay-shadow-2"></div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-end gap-2">
          <h6 className="trading-popup-title mb-0">Weekly Rankings</h6>
        </div>
        <img
          src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>

      <div className="row mt-3">
        <div className="col-2 col-lg-1 d-flex justify-content-start">
          <span className="comp-lb-header">Rank</span>
        </div>
        <div className="col-4 col-lg-5 px-0 px-lg-3 d-flex justify-content-start">
          <span className="comp-lb-header">User</span>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <span className="comp-lb-header">Volume(USD)</span>
        </div>
      </div>

      <div
        className="d-flex trading-comp-overflow-3 flex-column gap-2 mt-3"
        ref={scrollRef}
      >
        {participants.slice(0, slice).map((item, index) => (
          <div
            key={item.Address}
            className={`d-flex align-items-center ${
              index + 1 === 30 ? "pb-2" : ""
            } gap-4`}
            style={{
              borderBottom: index + 1 === 30 ? "1px solid red" : "none",
            }}
          >
            <div
              className={`trading-comp-lb-rank ${
                index + 1 <= 30 ? "lb-winner" : ""
              } d-flex align-items-center justify-content-center`}
            >
              {index + 1}
            </div>
            <div
              className={`trading-comp-lb-item-2 ${
                coinbase === item.Address ? "trading-comp-lb-item-player" : ""
              } ${
                index + 1 <= 30 ? "lb-winner" : ""
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
