import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import criticalPopupBanner from "../../screens/Marketplace/assets/criticalPopupBanner.png";
import popupLinear from "./assets/popupLinear.png";
import criticalPopup from "./assets/criticalPopup.webp";

const CriticalHitPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup critical-hit-popup  px-4 py-5 py-lg-5 px-lg-5">
        <img src={popupLinear} alt="" className="popup-linear" />
        <div className="position-relative mb-3">
          <img src={criticalPopup} alt="" style={{ width: "100%" }} />
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2">
          <h6 className="package-popup-title mb-0">Critical Hit Event</h6>
        </div>
        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            As a Genesis Land NFT holder, you gain entry to the daily activity
            known as Critical Hit. This thrilling event presents you with the
            opportunity to earn valuable points and reap enticing rewards. Each
            day, a randomized mechanism will allocate points to participating
            players, opening the door to exciting possibilities.
          </p>
          <p className="package-popup-desc">
            What is Genesis Land? Genesis is a land within the game that spans
            15,625m² and is available to those who own a World of Dypians Land
            NFT. Owning a Genesis Land comes with a range of benefits within the
            game, including earning special rewards, exclusive Land NFT staking
            with 25%-50% APR, and more. Here, players can engage in a variety of
            activities, but the most important one for the purposes of the
            Critical Hit event is hitting the Gem.
          </p>

          <p className="package-popup-desc">
            The points you accumulate during the Critical Hit event hold the key
            to your ascent on the leaderboard. Compete against fellow landowners
            as you strive to secure a coveted spot on the Daily, Weekly, and
            Monthly Leaderboards. Success in this arena not only brings
            recognition but also paves the way for remarkable rewards that can
            enhance your digital journey.
          </p>
          <img src={criticalPopupBanner} alt="" className="w-100 my-3" />
          <span className="popup-secondary-title">How it works:</span>
          <p className="package-popup-desc">
            Critical Hit is a daily activity that allows players to earn points
            or rewards. A random mechanism awards players with points that can
            be used to rank on the Daily, Weekly, and Monthly Leaderboards, or
            even receive rewards in BNB tokens.
          </p>
          <span className="popup-secondary-title">
            By destroying the Gem, players can:
          </span>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Earn points ranging from{" "}
              <span style={{ fontWeight: "500", color: "#FF6232" }}>
                30,000
              </span>{" "}
              to{" "}
              <span style={{ fontWeight: "500", color: "#FF6232" }}>
                80,000
              </span>
            </li>
            <li className="package-popup-desc">
              Earn rewards ranging from{" "}
              <span style={{ fontWeight: "500", color: "#FF6232" }}>$20</span>{" "}
              to{" "}
              <span style={{ fontWeight: "500", color: "#FF6232" }}>
                $7,000
              </span>{" "}
              in{" "}
              <span style={{ fontWeight: "500", color: "#FF6232" }}>
                BNB Tokens
              </span>
            </li>
          </ul>
          <p className="package-popup-desc mt-3">
            It's important to note that the rewards in BNB tokens will be
            distributed monthly, and you can destroy the Gem once per day.
            Players will have the opportunity to hit the Gem once{" "}
            <span style={{ fontWeight: "500", color: "#FF6232" }}>
              every 24 hours, starting at 00:00 UTC.{" "}
            </span>
          </p>
          <p className="package-popup-desc mt-3">
            The Critical Hit event offers a special leaderboard that displays
            the rankings of only the top 10 players based on the amount they
            accumulate. Even the players that are not displayed in the top 10
            ranking will receive rewards for the amount they accumulate during
            the event. Rewards accumulated from participating in the event from
            all players will be distributed on a monthly basis.
          </p>
          <p className="package-popup-desc mt-3">
            By combining the Dragon Ruins with the Critical Hit event, players
            increase their chances of making progress and earning a spot on the
            Daily, Weekly, or Monthly leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CriticalHitPopup;
