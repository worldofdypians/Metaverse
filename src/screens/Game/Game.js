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

  const [showPopup, setShowPopup] = useState("");
  const [challengePopup, setChallengePopup] = useState("");

  return (
    <>
      <div className="container-fluid token-wrapper px-0">
        <div className="d-flex flex-column">
          <GameHero showPopup={showPopup} setShowPopup={setShowPopup} />
          <ClassSelection />
          <AmplifySection showPopup={showPopup} setShowPopup={setShowPopup} />
          <NewChallenges screen={"game"} />
          {/* <GameEvents /> */}
          <FeatureSection
            onSelectEvent={() => {
              setChallengePopup("golden");
            }}
          />
          <AmplifyExperience />
        </div>
      </div>
      {challengePopup === "golden" && (
        <GoldenPassPopup
          onClosePopup={() => {
            setChallengePopup("");
          }}
        />
      )}
    </>
  );
};

export default Game;
