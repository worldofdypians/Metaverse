import React, { useEffect, useState } from "react";
import CawsSociety from "../Home/CawsSociety/CawsSociety";
import Characters from "./Characters";
import GameModes from "./GameModes";
import GamePillars from "./GamePillars";
import Journey from "./Journey";
import Skills from "./Skills";
import "./_explorer.scss";
import OutsideClickHandler from "react-outside-click-handler";
import DailyRewardsPopup from "../../components/TimepieceMint/DailyRewardsPopup";

const Explorer = ({ count, setCount }) => {
  const [activePopup, setActivePopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Explore";
  }, []);

  useEffect(() => {
    {
      count === 0 &&
        setTimeout(() => {
          setActivePopup(true);
        }, 500);
    }
  }, [count]);

  return (
    <div
      className="container-fluid d-flex px-0 align-items-center justify-content-center"
      style={{ overflowX: "hidden" }}
    >
      {/* <OutsideClickHandler
        id="popup"
        onOutsideClick={() => {
          setActivePopup(false);
          setCount(1);
        }}
      >
        <DailyRewardsPopup
          active={activePopup}
          onClose={() => {
            setActivePopup(false);
            setCount(1);
          }}
        />
      </OutsideClickHandler> */}
      <div className="explorer-main-wrapper px-0 w-100 mt-5 d-flex flex-column">
        <Characters />
        <GameModes />
        <GamePillars />
        <CawsSociety content="Adventurers can use CAWS NFT to enhance their player's abilities, power up their skills, and improve their chances at in game rewards." />
        <Skills />
        <Journey />
      </div>
    </div>
  );
};

export default Explorer;
