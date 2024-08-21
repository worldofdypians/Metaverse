import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import popupLinear from "./assets/popupLinear.png";
import goldenPopup from "./assets/goldenPopup.webp";

const GoldenPassPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup golden-pass-popup px-4 py-5 py-lg-5 px-lg-5">
        <img src={popupLinear} alt="" className="popup-linear" />
        <div className="position-relative mb-3">
          <img src={goldenPopup} alt="" style={{ width: "100%" }} />
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2">
          <div className="package-popup-title mb-0">Golden Pass</div>
        </div>
        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            The Golden Pass event offers an exciting opportunity for players to
            double their rewards, climb the leaderboards, and earn unique
            prizes. Here’s how it works:
          </p>

          <span className="popup-secondary-title">How it works:</span>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              <b>Purchase:</b> To participate, buy the Golden Pass bundle from
              the Marketplace using DYP tokens on either the BNB Chain or
              Ethereum Chain.
            </li>
            <li className="package-popup-desc">
              <b>Duration:</b> The Golden Pass is valid for one calendar month,
              regardless of the purchase date.
            </li>
            <li className="package-popup-desc">
              <b>Example:</b> If a player buys the Golden Pass on the 7th, it
              will remain active until the end of that month (e.g., from the 7th
              to the 30th/31st). However, the pass will reset on the 1st of the
              next month. This means the pass is not active on the 7th of the
              next month; it must be repurchased.
            </li>
            <li className="package-popup-desc">
              <b>Leaderboard Rewards:</b> Extra rewards are given based on your
              leaderboard ranking when the leaderboard resets. The pass must be
              active during this reset to earn the rewards.
            </li>
            <li className="package-popup-desc">
              <b>Weekly Rewards Example:</b> If you purchased the Golden Pass on
              July 31st, it was active for that day only and reset on August
              1st. To receive weekly rewards, the Golden Pass must be active
              during the week’s leaderboard reset. Therefore, if the pass wasn't
              repurchased after July 31st, you wouldn't receive rewards on
              August 5th.
            </li>
          </ul>
          <span className="popup-secondary-title">
            Benefits of the Golden Pass:
          </span>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              <b>Double Rewards:</b> Earn extra rewards on the leaderboards,
              boosting your rank and chances to win exclusive prizes.
            </li>
            <li className="package-popup-desc">
              <b>Unique Prizes:</b> Access unique rewards and prizes only
              available during the Golden Pass event.
            </li>
            <li className="package-popup-desc">
              <b>Competitive Edge:</b> The Golden Pass adds an extra layer of
              competition, encouraging you to perform your best and rise to the
              top of the leaderboards.
            </li>
          </ul>

          <p className="package-popup-desc mt-3">
            The Golden Pass resets on the 1st of each month, no matter the
            purchase date. Ensure your pass is active during the leaderboard
            reset to maximize your rewards!
          </p>

          <span className="popup-secondary-title">
            Example: Leaderboard Reward Distribution
          </span>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#b8b8e0",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Rank
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#b8b8e0",
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Rewards
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#b8b8e0",
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Extra
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#b8b8e0",
                      fontSize: "16px",
                      fontWeight: "600",
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
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    +$400
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
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
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    +$300
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
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
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    +$200
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
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
      </div>
    </div>
  );
};

export default GoldenPassPopup;
