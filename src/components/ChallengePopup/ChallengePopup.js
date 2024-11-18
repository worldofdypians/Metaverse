import React from "react";
import "./_challengepopup.scss";
import closeChallenge from "./closeChallenge.svg";
import { NavLink } from "react-router-dom";

const ChallengePopup = ({ item, handleClose }) => {
  return (
    <div className="challenge-popup-wrapper popup-active">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-column">
          {/* <div className="d-flex  p-3 d-flex justify-content-between">
           
          </div> */}
          <div className="position-relative w-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-100 challenge-popup-banner"
            />
            <div
              className="challenge-close-wrapper d-flex align-items-center justify-content-center"
              onClick={handleClose}
            >
              <img
                src={closeChallenge}
                alt="close"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-3 p-3">
            <p className="challenge-popup-desc mb-0">{item.popupDesc}</p>
            {item.title === "Puzzle Madness" ||
            item.title === "Golden Pass" ||
            item.title === "Critical Hit" ? (
              <>
                {item?.secondaryDesc && (
                  <p className="challenge-popup-desc mb-0">
                    {item.secondaryDesc}
                  </p>
                )}
                <div className="d-flex flex-column gap-2">
                  {item?.secondaryTitle && (
                    <h6 className="mb-0 challenge-popup-secondary-title">
                      {item.secondaryTitle}
                    </h6>
                  )}
                  <p className="challenge-popup-desc mb-0">{item.thirdDesc}</p>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="d-flex flex-column gap-2">
              <h6 className="mb-0 challenge-popup-secondary-title">
                How it works
              </h6>
              <div className="d-flex flex-column gap-1">
                {item.workList.map((work, index) => (
                  <div className="d-flex align-items-center gap-2" key={index}>
                    <div className="green-dot"></div>
                    <span className="challenge-popup-desc">{work}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              {item?.tips && (
                <h6 className="mb-0 challenge-popup-secondary-title">Tips</h6>
              )}
              <div className="d-flex flex-column gap-1">
                {item?.tips?.map((tip, index) => (
                  <div className="d-flex align-items-center gap-2" key={index}>
                    <div className="green-dot"></div>
                    <span className="challenge-popup-desc">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="challenge-popup-button-wrapper p-3 d-flex justify-content-center w-100">
          <NavLink className={"getpremium-btn px-3 py-2"} to={item.link}>
            Buy
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ChallengePopup;
