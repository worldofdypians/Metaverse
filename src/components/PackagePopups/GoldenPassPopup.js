import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import popupLinear from "./assets/popupLinear.png";
import goldenPopup from "./assets/goldenPopup.webp";
import { NavLink } from "react-router-dom";

const GoldenPassPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup golden-pass-popup p-4">
        <div className=" package-popup-title-wrapper d-flex align-items-center position-relative justify-content-between mb-2">
          <div className="package-popup-title mb-0">Golden Pass</div>{" "}
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className="position-relative mb-3">
          <img src={goldenPopup} alt="" style={{ width: "100%" }} />
        </div>

        <div className="package-popup-content p-1">
          <p className="package-popup-desc">
            The Golden Pass Event lets players earn extra rewards from the
            leaderboards. The pass is valid for one calendar month, regardless
            of purchase date.
            <br />
            <br />
            <b>Example:</b> If you buy the Golden Pass on the 7th, it remains
            active until the end of the month (e.g., from the 7th to the
            30th/31st). However, it will reset on the 1st of the following month
            and must be repurchased to stay active.
          </p>

          <h6 className="text-white">How it works:</h6>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Purchase the bundle from the Challenge Center
            </li>
            <li className="package-popup-desc">
              The golden pass is valid for one calendar month, resetting on the
              1st, regardless of the purchase date
            </li>

            <li className="package-popup-desc">
              Extra rewards are given based on leaderboard rank as long as the
              golden pass is active
            </li>
          </ul>

          <h6 className="text-white">Leaderboard Reward Distribution</h6>
          <div className="table-responsive">
            <table className="table bgtable">
              <thead>
                <tr>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Rank
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Rewards
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Extra
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Total Rewards
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    #1
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    $1,000
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    +$400
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    $1,400
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    #2
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    $800
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    +$300
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    $1,100
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    #3
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    $500
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    +$200
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    $700
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <NavLink
          className="stake-wod-btn px-4 py-2 my-3 d-flex m-auto"
          to={"/account/challenges/golden-pass"}
        >
          Get Golden Pass
        </NavLink>
      </div>
    </div>
  );
};

export default GoldenPassPopup;
