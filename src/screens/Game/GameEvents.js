import React from "react";
import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import { NavLink } from "react-router-dom";

const GameEvents = () => {
  const events = [
    {
      link: "/account/challenges/treasure-hunt",
      title: "TREASURE HUNT",
      desc: "Find hidden items in daily quests",
      class: "treasureHuntCard",
    },
    {
      link: "/account/challenges/dragon-ruins",
      title: "DRAGON RUINS",
      desc: "Conquer ancient challenges in dragon ruins",
      class: "dragonRuinsCard",
    },
    {
      link: "/account/challenges/scorpion-king",
      title: "SCORPION KING",
      desc: "Battle the formidable ruler of the sands",
      class: "scorpionKingCard",
    },
    {
      link: "/account/challenges/puzzle-madness",
      title: "PUZZLE MADNESS",
      desc: "Solve puzzles and unravel mysteries",
      class: "puzzleMadnessCard",
    },
    {
      link: "/account/challenges/critical-hit",
      title: "CRITICAL HIT",
      desc: "Break the ancient gem",
      class: "criticalHitCard",
    },
    {
      link: "/account/challenges/maze-garden",
      title: "MAZE GARDEN",
      desc: "Explore intricate labyrinths for hidden treasures",
      class: "mazeGardenCard",
    },
    {
      link: "/account#dailybonus",
      title: "DAILY BONUS",
      desc: "Log in daily to claim exciting rewards",
      class: "dailyBonusCard",
    },
  ];

  const dummyBetaPassData2 = [
    {
      link: "/account",
      title: "LEADERBOARDS",
      desc: "Compete for the top rank",
      class: "tokenClass",
    },
    {
      link: "/account",
      title: "MY RANK",
      desc: "Elevate your player status",
      class: "earnClass",
    },
    {
      link: "/account",
      title: "DAILY BONUS",
      desc: "Daily rewards for active players",
      class: "eventClass",
    },
  ];

  return (
    <>
      <div className="our-team d-flex align-items-center justify-content-center my-5 py-4">
        <div className="custom-container">
          <div className="d-flex flex-column position-relative align-items-center  w-100">
            <h2 className="font-montserrat builders-title explorer-grid-title px-0">
              Game Events
            </h2>
            <span className="classes-desc mb-0 mb-lg-5">
              Dive into spectacular in-game events like Treasure Hunt, Dragon
              Ruins, Scorpion King, Puzzle Madness, Critical Hit, Maze Garden
              and Daily Bonus.
            </span>
          </div>
          <div className="row gap-3 gap-lg-0 mx-3 mx-lg-0">
            {events.slice(0, 4).map((item, index) => (
              <div className="col-12 col-lg-3">
                <NavLink to={`${item.link}`}>
                  <BetaEventCardHome
                    data={item}
                    key={index}
                    isFrontPage={true}
                  />
                </NavLink>
              </div>
            ))}
          </div>
          <div className="row justify-content-center mt-3 gap-3 gap-lg-0 mx-3 mx-lg-0">
            {events.slice(4, 7).map((item, index) => (
              <div className="col-12 col-lg-3">
                <NavLink to={`${item.link}`}>
                  <BetaEventCardHome
                    data={item}
                    key={index}
                    isFrontPage={true}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameEvents;
