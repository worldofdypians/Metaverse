import React, { useEffect, useState } from "react";
import "./_game.scss";
import GameHero from "./GameHero";
import ClassSelection from "./ClassSelection";
import AmplifySection from "./AmplifySection";
import GameEvents from "./GameEvents";
import AmplifyExperience from "./AmplifyExperience";
import FeatureSection from "./FeatureSection";
import NewChallenges from "./NewChallenges";
import GoldenPassPopup from "../../components/PackagePopups/GoldenPassPopup";

const Game = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Game";
  }, []);

  const [showPopup, setshowPopup] = useState("");

  return (
    <>
      <div className="container-fluid token-wrapper px-0">
        <div className="d-flex flex-column">
          <GameHero />
          <ClassSelection />
          <AmplifySection />
          <NewChallenges />
          {/* <GameEvents /> */}
          <FeatureSection
            onSelectEvent={() => {
              setshowPopup("golden");
            }}
          />
          <AmplifyExperience />
        </div>
      </div>
      {showPopup === "golden" && (
        <GoldenPassPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}
    </>
  );
};

export default Game;
