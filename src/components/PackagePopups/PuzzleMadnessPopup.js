import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import cawsPopupBanner from "../../screens/Marketplace/assets/cawsPopupBanner.png";
import puzzleMap from "../../screens/Marketplace/assets/puzzleMap.webp";
import popupLinear from "./assets/popupLinear.png";
import puzzlePopup from "./assets/puzzlePopup.webp";

const PuzzleMadnessPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup puzzle-madness-popup  px-4 py-5 py-lg-5 px-lg-5">
        <img src={popupLinear} alt="" className="popup-linear" />
        <div className="position-relative mb-3">
          <img src={puzzlePopup} alt="" style={{ width: "100%" }} />
          <img
            src={popupXmark}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2">
          <h6 className="package-popup-title mb-0">Puzzle Madness</h6>
        </div>
        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            In the Puzzle Madness event players must search for 10 pieces that
            are hidden throughout the mining and city maps. The pieces contain
            valuable points that will be used to rank players on the daily,
            weekly, and monthly leaderboards against other players. One of the
            pieces contains a score multiplier that becomes active once all of
            them have been found. This score multiplier can vary from x2 to x10
            and significantly increases the points earned, so it's essential to
            find them all to take advantage of this bonus. Although you can
            obtain the point multiplier on the first piece, the points will not
            be multiplied until all 10 pieces have been found.
          </p>
          <span className="popup-secondary-title">Leaderboard Rankings</span>

          <p className="package-popup-desc">
            The event's goal is to find all the puzzle madness pieces within the
            two-hour time limit. Even if you don't find all 10 pieces, your
            points earned will still be added to the daily, weekly, and monthly
            leaderboards, giving you a chance to compete against other players
            and earn a spot at the top. Players who can't find them all within
            the allotted time can purchase the bundle again to extend their time
            and continue their search.CAWS Utility
          </p>
          <span className="popup-secondary-title">CAWS Utility</span>

          <p className="package-popup-desc">
            In addition to purchasing the Puzzle Madness bundle, players who
            hold a CAWS NFT will have an added advantage in the pieces hunt.
            These NFTs include a special cat companion that will aid players in
            their search for the hidden puzzle madness pieces. The cat has an
            acute sensitivity and will be able to detect the presence of a piece
            before the player sees it. When the cat senses a piece nearby, a big
            exclamation mark will appear above its head, indicating that it has
            found something. The cat will also start digging near the puzzle
            madness piece to help players find it more easily. So, if you want
            an extra edge in this event, make sure to hold a CAWS NFT and take
            advantage of your feline companion's abilities. The puzzle madness
            pieces can be hidden inside buildings, on top of them, and in the
            open space. While the cat can detect pieces on the ground, it can't
            detect them on top and inside of buildings. This means that you, as
            a player, will have to showcase your skills and explore the city
            thoroughly to find all the pieces and complete the puzzle.
          </p>
          <img src={puzzleMap} className="w-100 my-3" alt="" />
          <span className="popup-secondary-title">How it works:</span>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Step 1: Purchase the Puzzle Madness bundle in the account section.
            </li>
            <li className="package-popup-desc">
              Step 2: Select the mining or downtown map to start your search for
              the Puzzle Madness pieces.
            </li>
            <li className="package-popup-desc">
              Step 3: Use your puzzle-solving skills to find the 10 pieces hidden on the map. The puzzles are located in the center of the city and the mining map.
            </li>
            <li className="package-popup-desc">
              Step 4: Collect as many pieces as you can within the two-hour time
              limit.
            </li>
            <li className="package-popup-desc">
              Step 5: Keep an eye out for the piece that contains the score
              multiplier, and make sure to find all of them to activate it.
            </li>
            <li className="package-popup-desc">Step 6: Complete the puzzle.</li>
          </ul>
          <p className="package-popup-desc mt-3">
            Additionally, the puzzle madness piece navigation bar has an
            indicator that shows whether the piece can be found in the city or
            in the mining map, helping players to narrow down their search and
            locate them more easily. If the icon above the piece is City, that
            indicates the piece can be found in the city map. If the icon is
            grass, that indicates the piece can be found in the mining maps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuzzleMadnessPopup;
