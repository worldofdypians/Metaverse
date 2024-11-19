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
import OutsideClickHandler from "react-outside-click-handler";
import VideoPopup from "./VideoPopup";

const Game = ({ allStarData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Game";
  }, []);

  const [showPopup, setShowPopup] = useState("");
  const [challengePopup, setChallengePopup] = useState("");
  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [videoPopup, setVideoPopup] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

  const html = document.querySelector("html");

  useEffect(() => {
    if (videoPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [videoPopup]);

  return (
    <>
      <div className="container-fluid token-wrapper px-0">
        <div className="d-flex flex-column">
          <GameHero showPopup={showPopup} setShowPopup={setShowPopup} />
          <ClassSelection
            setVideoPopup={setVideoPopup}
            setVideoLink={setVideoLink}
          />
          <AmplifySection
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setVideoPopup={setVideoPopup}
            setVideoLink={setVideoLink}
          />
          <NewChallenges
            screen={"game"}
            popupEvent={popupEvent}
            setPopupEvent={setPopupEvent}
            popupActive={popupActive}
            setPopupActive={setPopupActive}
          />
          {/* <GameEvents /> */}
          <FeatureSection
            setPopupEvent={setPopupEvent}
            setPopupActive={setPopupActive}
            allStarData={allStarData}
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
      {videoPopup && (
        <OutsideClickHandler onOutsideClick={() => setVideoPopup(false)}>
          <VideoPopup
            videoLink={videoLink}
            closeOverlay={() => setVideoPopup(false)}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default Game;
