import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import popupLinear from './assets/popupLinear.png'
import goldenPopup from './assets/goldenPopup.webp'


const GoldenPassPopup = ({onClosePopup}) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup golden-pass-popup px-4 py-5 py-lg-5 px-lg-5">
         <img src={popupLinear} alt="" className="popup-linear" />
          <div className="position-relative mb-3">
          <img src={goldenPopup} alt="" style={{width: "100%"}} />
        <img src={popupXmark} className="popup-closer" onClick={onClosePopup} alt="" />

          </div>
        <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2">
          <div className="package-popup-title mb-0">Golden Pass</div>
        </div>
        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            The Golden Pass event is an exciting opportunity for players to
            boost their performance on the leaderboards and earn unique rewards.
            By doubling their rewards, players can climb higher in the rankings
            and earn exclusive prizes. This added incentive makes the event more
            engaging and encourages players to aim for the top spot on the
            leaderboards.
          </p>
          <p className="package-popup-desc">
            One of the main benefits of participating in the Golden Pass event
            is the chance to double rewards. This makes it an essential event
            for players who want to make the most of their time in the game and
            improve their gaming experience.
          </p>
          <p className="package-popup-desc">
            Another benefit of participating in the Golden Pass event is the
            competitive environment it creates. With double rewards on the line,
            players are encouraged to compete against others and improve their
            performance on the leaderboards. This adds a new level of excitement
            and challenge to the game, making it more engaging for players.
          </p>
          <span className="popup-secondary-title">How it works:</span>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              To participate in the Golden Pass event, players need to purchase
              the bundle in Marketplace using DYP token on BNB Chain.
            </li>
            <li className="package-popup-desc">
              The Golden Pass bundle is available for 7 days and can be
              purchased up to 4 times.
            </li>
            <li className="package-popup-desc">
              If a player purchases the fourth bundle, they will receive the
              entire time left to participate in the event until the end of the
              month.
            </li>
            <li className="package-popup-desc">
              Once the bundle is active, players will receive double rewards
              based on their leaderboard ranking.
            </li>
            <li className="package-popup-desc">
              It's important to note that the bundle must be active at the time
              of the leaderboard reset for players to receive the double
              rewards.
            </li>
            <li className="package-popup-desc">
              Bundles will be available for purchase until the date 25 of each
              month.
            </li>
            <li className="package-popup-desc">
              Players can earn unique rewards and prizes that can only be earned
              during the Golden Pass event.
            </li>
          </ul>
          <span className="popup-secondary-title">
            Example: Leaderboard Reward Distribution
          </span>
          <div className="table-responsive">
            <table class="table">
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
                    Multiper
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
                    x2
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    $2,000
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
                    x2
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    #1,600
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
                    x2
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#7DD9AF",
                      textAlign: "center",
                    }}
                  >
                    $1,000
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
