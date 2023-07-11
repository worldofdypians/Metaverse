import React from "react";
import boar from "../../screens/Marketplace/assets/boar.svg";
import deer from "../../screens/Marketplace/assets/deer.svg";
import wolf from "../../screens/Marketplace/assets/wolf.svg";
import bear from "../../screens/Marketplace/assets/bear.svg";
import dragon from "../../screens/Marketplace/assets/dragon.svg";
import popupXmark from "./assets/popupXmark.svg";
import popupLinear from './assets/popupLinear.png'
import dragonPopup from './assets/dragonPopup.webp'


const DragonPopup = ({onClosePopup}) => {
  return (
    <div id="bgmenu" className="package-popup-wrapper">
      <img src={popupLinear} alt="" className="popup-linear" />
     <div className="package-popup dragon-popup px-4 py-5 py-lg-5 px-lg-5">
          <div className="position-relative mb-3">
          <img src={dragonPopup} alt="" style={{width: "100%"}} />
        <img src={popupXmark} className="popup-closer" onClick={onClosePopup} alt="" />
          </div>
         <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2">
        <div className="package-popup-title mb-0">Dragon Ruins</div>
      </div>
      <div className="package-popup-content p-1">
        <p className="package-popup-desc mt-3">
          The Dragon Ruins Event gives players the ability to summon a dragon
          for battle. Defeating the dragon rewards players with a significant
          amount of in-game rewards. This feature is exclusive to dragon ruins
          participants, and it adds a whole new dimension to the game.
        </p>
        <p className="package-popup-desc">
          Dragon Ruins participants will receive a 3x multiplier on their
          in-game activities, which will increase their leaderboard scores. This
          is a significant advantage that can help players climb the leaderboard
          and earn even more rewards. It's important to note that the event
          benefits last for 1 hour. However, players can purchase additional
          bundles to extend their usage beyond the initial 1 hour time frame.
          Purchasing additional bundles allows players to kill the dragon
          multiple times, earning additional rewards each time they do so. Each
          bundle purchase also grants the user a ticket to the CAWS NFT lottery.
        </p>
        <p className="package-popup-desc">
          There is no limit to the amount of bundles a user may purchase during
          this promotional period, so players can keep buying bundles to enjoy
          the event as much as they want.
        </p>
        <span className="popup-secondary-title">How it works:</span>
        <ul className="package-popup-desc">
          <li className="package-popup-desc">
            Purchase the Dragon Ruins events in Marketplace and get access to
            special features.
          </li>
          <li className="package-popup-desc">
            Once you purchase the event, you will have the ability to see and
            summon a dragon for battle.
          </li>
          <li className="package-popup-desc">
            Defeat the dragon to earn a significant amount of in-game rewards.
          </li>
          <li className="package-popup-desc">
            Enjoy a 3x multiplier on your in-game activities, increasing your
            leaderboard scores.
          </li>
          <li className="package-popup-desc">
            Dragon Ruins benefits last for 1 hour. However, you can purchase
            additional bundles to extend your usage beyond the initial 1 hour
            time frame.
          </li>
          <li className="package-popup-desc">
            The Each bundle purchase will grant you a ticket to the CAWS NFT
            lottery.
          </li>
          <li className="package-popup-desc">
            There is no limit to the amount of bundles you may purchase during
            this promotional period.
          </li>
        </ul>
        <span className="popup-secondary-title">Point Distribution:</span>
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
                  Animal
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
                  Points
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
                  Total Points
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
                  <img src={boar} className="me-2" alt="" />
                  Boar
                </th>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#eeedff",
                    textAlign: "center",
                  }}
                >
                  35
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  x3
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  105
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
                  <img src={deer} className="me-2" alt="" />
                  Deer
                </th>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#eeedff",
                    textAlign: "center",
                  }}
                >
                  50
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  x3
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  150
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
                  <img src={wolf} className="me-2" alt="" />
                  Wolf
                </th>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#eeedff",
                    textAlign: "center",
                  }}
                >
                  65
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  x3
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  195
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
                  <img src={bear} className="me-2" alt="" />
                  Bear
                </th>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#eeedff",
                    textAlign: "center",
                  }}
                >
                  80
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  x3
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  240
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
                  <img src={dragon} className="me-2" alt="" />
                  Dragon
                </th>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#eeedff",
                    textAlign: "center",
                  }}
                >
                  4,000
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  x3
                </td>
                <td
                  style={{
                    fontSize: "16px",
                    color: "#7DD9AF",
                    textAlign: "center",
                  }}
                >
                  12,000
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

export default DragonPopup;
