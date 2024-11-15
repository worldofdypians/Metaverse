import React, { useEffect } from "react";
import "./_game.scss";
import GameHero from "./GameHero";
import ClassSelection from "./ClassSelection";
import AmplifySection from "./AmplifySection";
import GameEvents from "./GameEvents";
import AmplifyExperience from "./AmplifyExperience";
import FeatureSection from "./FeatureSection";

const Game = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Game'
  }, []);
  
  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column">
        <GameHero />
        <ClassSelection />
        <AmplifySection />
        <GameEvents />
        <FeatureSection />
        <AmplifyExperience />
      </div>
    </div>
  );
};

export default Game;
