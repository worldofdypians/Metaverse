import React, { useState } from "react";
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

const NewEvents = ({ events, onEventClick, coinbase, wallet, chainId, binanceW3WProvider }) => {
  const [challenge, setChallenge] = useState("treasureHunt");
  const [eventDuration, seteventDuration] = useState("Live");

  return (
    <div className="custom-container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <div className="new-events-top-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
              <h6 className="challenges-text mb-0">Challenges</h6>
              {challenge === "treasureHunt" && (
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
                    <div
                      className={`${
                        challenge === "treasureHunt"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("treasureHunt");
                      }}
                    >
                      <img src={treasureHuntIcon} alt="" />
                      <h6 className="mb-0">Treasure Hunt</h6>
                    </div>
                    <div
                      className={`${
                        challenge === "dragonRuins"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("dragonRuins");
                      }}
                    >
                      <img src={dragonRuinsIcon} alt="" />
                      <h6 className="mb-0">Dragon Ruins</h6>
                    </div>
                    <div
                      className={`${
                        challenge === "goldenPass"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("goldenPass");
                      }}
                    >
                      <img src={goldenPassIcon} alt="" />
                      <h6 className="mb-0">Golden Pass</h6>
                    </div>
                    <div
                      className={` ${
                        challenge === "scorpionKing"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("scorpionKing");
                      }}
                    >
                      <img src={scorpionKingIcon} alt="" />
                      <h6 className="mb-0">Scorpion King</h6>
                    </div>
                    <div
                      className={` ${
                        challenge === "puzzleMadness"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("puzzleMadness");
                      }}
                    >
                      <img src={puzzleMadnessIcon} alt="" />
                      <h6 className="mb-0">Puzzle Madness</h6>
                    </div>
                    <div
                      className={` ${
                        challenge === "criticalHit"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("criticalHit");
                      }}
                    >
                      <img src={criticalHitIcon} alt="" />
                      <h6 className="mb-0">Critical Hit</h6>
                    </div>
                    <div
                      className={` ${
                        challenge === "mazeGarden"
                          ? "active-challenge-item"
                          : "challenge-item"
                      } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                      onClick={() => {
                        setChallenge("mazeGarden");
                      }}
                    >
                      <img src={mazeGardenIcon} alt="" />
                      <h6 className="mb-0">Maze Garden</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-10">
                  {challenge === "treasureHunt" ? (
                    <TreasureHunt
                      events={events}
                      eventDuration={eventDuration}
                      onEventClick={onEventClick}
                    />
                  ) : challenge === "dragonRuins" ? (
                    <DragonRuins
                      coinbase={coinbase}
                      chainId={chainId}
                      wallet={wallet}
                      binanceW3WProvider={binanceW3WProvider}
                    />
                  ) : challenge === "scorpionKing" ? (
                    <ScorpionKing />
                  ) : challenge === "puzzleMadness" ? (
                    <PuzzleMadness
                      coinbase={coinbase}
                      chainId={chainId}
                      wallet={wallet}
                      binanceW3WProvider={binanceW3WProvider}

                    />
                  ) : challenge === "criticalHit" ? (
                    <CriticalHit />
                  ) : challenge === "mazeGarden" ? (
                    <MazeGarden />
                  ) : challenge === "goldenPass" ? (
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
