import React, { useState, useEffect } from "react";
import "./_newevents.scss";
import treasureHuntIcon from "./assets/treasureHuntIcon.png";
import dragonRuinsIcon from "./assets/dragonRuinsIcon.png";
import mazeGardenIcon from "./assets/mazeGardenIcon.png";
import puzzleMadnessIcon from "./assets/puzzleMadnessIcon.png";
import scorpionKingIcon from "./assets/scorpionKingIcon.png";
import treasureHuntBadge from "./assets/treasureHuntBadge.png";
import criticalHitIcon from "./assets/criticalHitIcon.png";
import goldenPassIcon from "./assets/goldenPassIcon.png";
import dummyViction from "./assets/dummyViction.png";
import TreasureHunt from "../Challenges/TreasureHunt";
import DragonRuins from "../Challenges/DragonRuins";
import ScorpionKing from "../Challenges/ScorpionKing";
import PuzzleMadness from "../Challenges/PuzzleMadness";
import CriticalHit from "../Challenges/CriticalHit";
import MazeGarden from "../Challenges/MazeGarden";
import GoldenPass from "../Challenges/GoldenPass";
import { NavLink } from "react-router-dom";

const NewEvents = ({
  events,
  onEventClick,
  coinbase,
  wallet,
  chainId,
  binanceW3WProvider,
  selectedEvent,
}) => {
  const [challenge, setChallenge] = useState("treasure-hunt");
  const [eventDuration, seteventDuration] = useState("Live");




  useEffect(() => {
    if (selectedEvent) {
      setChallenge(selectedEvent);
    }
  }, [selectedEvent]);

  return (
    <div
      className="custom-container mt-5"
      id={selectedEvent ? selectedEvent : ""}
    >
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <div className="new-events-top-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
              <h6 className="challenges-text mb-0">Challenges</h6>
              {(challenge === "treasure-hunt" ||
                selectedEvent === "treasure-hunt") && (
                <div className="d-flex align-items-center gap-2">
                  <div
                    className={`${
                      eventDuration === "Live"
                        ? "active-challenge-tab"
                        : "challenge-tab"
                    }   px-4 py-2 d-flex align-items-center justify-content-center`}
                    onClick={() => {
                      seteventDuration("Live");
                    }}
                  >
                    <span>Live</span>
                  </div>
                  <div
                    className={`${
                      eventDuration === "Coming Soon"
                        ? "active-challenge-tab"
                        : "challenge-tab"
                    } px-4 py-2 d-flex align-items-center justify-content-center`}
                    onClick={() => {
                      seteventDuration("Coming Soon");
                    }}
                  >
                    <span>Upcoming</span>
                  </div>
                  <div
                    className={`${
                      eventDuration === "Expired"
                        ? "active-challenge-tab"
                        : "challenge-tab"
                    } px-4 py-2 d-flex align-items-center justify-content-center`}
                    onClick={() => {
                      seteventDuration("Expired");
                    }}
                  >
                    <span>Past</span>
                  </div>
                </div>
              )}
            </div>
            <div className="new-events-bottom-wrapper p-3">
              <div className="row gap-2 gap-lg-0">
                <div className="col-12 col-lg-2">
                  <div className="challenges-list-wrapper py-3 px-1 px-lg-0 d-flex flex-column gap-2">
                    <NavLink to="/account/challenges/treasure-hunt">
                      <div
                        className={`${
                          challenge === "treasure-hunt" ||
                          selectedEvent === "treasure-hunt"
                            ? "active-challenge-item"
                            : "challenge-item"
                        } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                        onClick={() => {
                          setChallenge("treasure-hunt");
                        }}
                      >
                        <img src={treasureHuntIcon} alt="" />
                        <h6 className="mb-0">Treasure Hunt</h6>
                      </div>
                    </NavLink>
                    <NavLink to="/account/challenges/dragon-ruins">
                      <div
                        className={`${
                          challenge === "dragon-ruins" ||
                          selectedEvent === "dragon-ruins"
                            ? "active-challenge-item"
                            : "challenge-item"
                        } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                        onClick={() => {
                          setChallenge("dragon-ruins");
                        }}
                      >
                        <img src={dragonRuinsIcon} alt="" />
                        <h6 className="mb-0">Dragon Ruins</h6>
                      </div>
                    </NavLink>
                    <NavLink to="/account/challenges/golden-pass">
                      <div
                        className={`${
                          challenge === "golden-pass" ||
                          selectedEvent === "golden-pass"
                            ? "active-challenge-item"
                            : "challenge-item"
                        } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                        onClick={() => {
                          setChallenge("golden-pass");
                        }}
                      >
                        <img src={goldenPassIcon} alt="" />
                        <h6 className="mb-0">Golden Pass</h6>
                      </div>
                    </NavLink>
                    <NavLink to="/account/challenges/scorpion-king">
                      <div
                        className={` ${
                          challenge === "scorpion-king" ||
                          selectedEvent === "scorpion-king"
                            ? "active-challenge-item"
                            : "challenge-item"
                        } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                        onClick={() => {
                          setChallenge("scorpion-king");
                        }}
                      >
                        <img src={scorpionKingIcon} alt="" />
                        <h6 className="mb-0">Scorpion King</h6>
                      </div>
                    </NavLink>
                    <NavLink to="/account/challenges/puzzle-madness">
                      <div
                        className={` ${
                          challenge === "puzzle-madness" ||
                          selectedEvent === "puzzle-madness"
                            ? "active-challenge-item"
                            : "challenge-item"
                        } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                        onClick={() => {
                          setChallenge("puzzle-madness");
                        }}
                      >
                        <img src={puzzleMadnessIcon} alt="" />
                        <h6 className="mb-0">Puzzle Madness</h6>
                      </div>
                    </NavLink>
                    <div
                      className={` ${
                        challenge === "critical-hit" ||
                        selectedEvent === "critical-hit"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("critical-hit");
                      }}
                    >
                      <img src={criticalHitIcon} alt="" />
                      <h6 className="mb-0">Critical Hit</h6>
                    </div>
                    <div
                      className={` ${
                        challenge === "maze-garden" ||
                        selectedEvent === "maze-garden"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("maze-garden");
                      }}
                    >
                      <img src={mazeGardenIcon} alt="" />
                      <h6 className="mb-0">Maze Garden</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-10">
                  {challenge === "treasure-hunt" ? (
                    <TreasureHunt
                      events={events}
                      eventDuration={eventDuration}
                      onEventClick={onEventClick}
                    />
                  ) : challenge === "dragon-ruins" ? (
                    <DragonRuins
                      coinbase={coinbase}
                      chainId={chainId}
                      wallet={wallet}
                      binanceW3WProvider={binanceW3WProvider}
                    />
                  ) : challenge === "scorpion-king" ? (
                    <ScorpionKing />
                  ) : challenge === "puzzle-madness" ? (
                    <PuzzleMadness
                      coinbase={coinbase}
                      chainId={chainId}
                      wallet={wallet}
                      binanceW3WProvider={binanceW3WProvider}
                    />
                  ) : challenge === "critical-hit" ? (
                    <CriticalHit />
                  ) : challenge === "maze-garden" ? (
                    <MazeGarden />
                  ) : challenge === "golden-pass" ? (
                    <GoldenPass
                      coinbase={coinbase}
                      chainId={chainId}
                      wallet={wallet}
                      binanceW3WProvider={binanceW3WProvider}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvents;
