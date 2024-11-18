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
import CriticalHitPopup from "../PackagePopups/CriticalHitPopup";
import { NavLink } from "react-router-dom";
import DragonPopup from "../PackagePopups/DragonPopup";
import GoldenPassPopup from "../PackagePopups/GoldenPassPopup";
import PuzzleMadnessPopup from "../PackagePopups/PuzzleMadnessPopup";
import ChallengePopup from "../ChallengePopup/ChallengePopup";
import OutsideClickHandler from "react-outside-click-handler";
import mazeGardenCard from "../../assets/gameAssets/challengeCards/mazeGardenCard.png";
import puzzleMadnessCard from "../../assets/gameAssets/challengeCards/puzzleMadnessCard.png";
import criticalHitCard from "../../assets/gameAssets/challengeCards/criticalHitCard.png";
import dragonRuinsCard from "../../assets/gameAssets/challengeCards/dragonRuinsCard.png";
import scorpionKingCard from "../../assets/gameAssets/challengeCards/scorpionKingCard.png";
import goldenPassCard from "../../assets/gameAssets/challengeCards/goldenPassCard.png";


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
  const [showPopup, setshowPopup] = useState("");

  const eventinfos=[
    {
      id: 'dragon',
      title: "Dragon Ruins",
      image: dragonRuinsCard,
      desc: "Enter the fiery depths of the Dragon Ruins, where a ferocious dragon guards its treasure. Explore the ruins, overcome challenges, and claim the hidden rewards.",
      day: 1,
      dayText: "MON",
      popupDesc:
        "The Dragon Ruins challenge invites players to summon and battle a fearsome dragon for exclusive rewards. This high-stakes event offers a chance to test your combat skills and teamwork. The dragon can only be summoned on Mondays and must be defeated before the end of the day at 00:00 UTC. Players can only purchase access once per day, giving you a single opportunity to emerge victorious.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Mondays.",
        "The Dragon must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 16,000 points and up to 200 stars.",
      ],
      tips: [
        "Recommended Hero Level: 10 and above",
        "Craft plenty of health potions and equip fire-resistant gear to counter the dragon's fiery breath.",
        "Use ranged weapons to attack from a distance, avoiding its powerful melee strikes.",
      ],
      link: "/account/challenges/dragon-ruins",
    },
    {
      id: 'puzzle',

      image: puzzleMadnessCard,
      desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
      title: "Puzzle Madness",
      link: "/account/challenges/puzzle-madness",
      popupDesc:
        "In the Puzzle Madness event, players search for 10 hidden pieces across the Island Zero and Dypians City maps. These pieces hold points that contribute to the BNB Chain leaderboard. One piece contains a multiplier (x2 to x8) that activates only after all pieces are found, significantly boosting your score.",
      secondaryDesc:
        "Players have two hours to find the pieces. Points are added to the leaderboards even if not all pieces are found. You can extend time by purchasing another bundle.",
      secondaryTitle: "CAWS NFT Utility",
      thirdDesc:
        "Holding a CAWS NFT gives you an advantage. Your cat companion helps detect hidden pieces with an exclamation mark above its head. However, the cat cannot detect pieces on top or inside buildings, so players must thoroughly explore.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "Find 10 pieces within the two-hour limit in the  Island Zero and Dypians City maps ",
        "An indicator will guide you on whether pieces are located making your search easier",
      ],
    },
    {
      id: 'critical',
      image: criticalHitCard,
      desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
      title: "Critical Hit",
      link: "/account/challenges/critical-hit",
      popupDesc:
        "As a Genesis Land NFT holder, you can participate in the daily Critical Hit event to earn points and rewards. Each day, you need to log in to the game and visit your land. On your land, you have a Genesis Gem, which you need to break with a pickaxe. Once broken, it gives you either points that are added to your leaderboard rank on BNB Chain or direct rewards in BNB.",
      secondaryTitle: "What is Genesis Land?",
      thirdDesc:
        "Genesis Land is a 125x125 area in World of Dypians, available to those who own a Genesis Land NFT. Benefits include exclusive rewards, Land NFT staking pool, and special in-game events like Critical Hit.",
      workList: [
        "Earn 30,000-80,000 points by destroying the Gem",
        "Receive rewards ranging from $20 to $7,000 ",
        "Rewards are distributed monthly, and you can destroy the Gem once every 24 hours (00:00 UTC).",
      ],
    },
    {
      id: 'scorpion',
      image: scorpionKingCard,
      desc: "Cross the scorching desert to challenge the Scorpion King. Brave the heat, avoid traps, and unlock the secrets of the sands to claim the riches waiting for you.",
      day: 6,
      dayText: "SAT",
      title: "Scorpion King",
      popupDesc:
        "Face off against the venomous Scorpion King in this thrilling event. Available only on Saturdays, this battle tests your resistance to poison and your ability to exploit the Scorpion King’s weaknesses. Access can be purchased once per day, with the event running until 00:00 UTC.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Saturdays.",
        "The Scorpion must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 120,000 points and up to 1,000 stars.",
      ],
      tips: [
        "Recommended Hero Level: 40 and above",
        "Craft plenty of health potions and target the tail to disable its poison strikes and reduce the threat.",
        "Equip high-damage weapons to end the fight quickly before the poison accumulates.",
      ],
      link: "/account/challenges/scorpion-king",
    },
    {
      id: 'maze',
      image: mazeGardenCard,
      desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
      day: 5,
      dayText: "FRI",
      title: "Maze Day",
      popupDesc:
        "Explore the enigmatic BNB Chain Maze, a labyrinth filled with twists and turns leading to the hidden gem at the center. This event is only accessible to WOD token holders and runs exclusively on Fridays. Navigate the maze carefully and claim your prize before 00:00 UTC.",
      workList: [
        "Hold at leas 400 WOD tokens to participate.",
        "The event is available exclusively on Fridays.",
        "Players must find their way to the maze’s center and collect the gem to earn rewards.",
        "Rewards include up to 200,000 points, 800 stars, and $10.",
      ],
      tips: [
        "Recommended Hero Level: 15 and above",
        "Focus on observation to spot clues, gates, and shortcuts.",
        "Plan your route and mark your path to avoid retracing your steps.",
      ],
      link: "/account/challenges/maze-garden",
    },
    {
      id: 'golden',
      image: goldenPassCard,
      desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
      title: "Golden Pass",
      link: "/account/challenges/golden-pass",
      popupDesc:
        "The Golden Pass Event lets players earn extra rewards from the leaderboards. The pass is valid for one calendar month, regardless of purchase date.",
      secondaryDesc:
        "Example: If you buy the Golden Pass on the 7th, it remains active until the end of the month (e.g., from the 7th to the 30th/31st). However, it will reset on the 1st of the following month and must be repurchased to stay active.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The golden pass is valid for one calendar month, resetting on the 1st, regardless of the purchase date.",
        "Extra rewards are given based on leaderboard rank as long as the golden pass is active.",
      ],
    }
  ]

  useEffect(() => {
    if (selectedEvent) {
      setChallenge(selectedEvent);
    }
  }, [selectedEvent]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (showPopup !== "") {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showPopup]);

  return (
    <>
      <div
        className="custom-container mt-5"
        id={selectedEvent ? selectedEvent : ""}
      style={{ scrollMarginTop: "100px" }}

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
              <div className="new-events-bottom-wrapper p-3 mb-4">
                <div className="row gap-2 gap-lg-0">
                  <div className="col-12 col-lg-2">
                    <div className="challenges-list-wrapper py-3 px-1 px-lg-0 d-flex flex-column gap-2">
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
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Legendary Beast Siege</h6>
                        </div>
                      </NavLink>
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
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">BNB Chain Maze Day</h6>
                        </div>
                      </NavLink>
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
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Treasure Hunt</h6>
                        </div>
                      </NavLink>
                      {/* <NavLink to="/account/challenges/dragon-ruins">
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
                      <NavLink to="/account/challenges/critical-hit">
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
                      </NavLink>
                      <NavLink to="/account/challenges/maze-garden">
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
                          <img
                            src={mazeGardenIcon}
                            alt=""
                            style={{ width: 32, height: 34 }}
                          />
                          <h6 className="mb-0">Maze Garden</h6>
                        </div>
                      </NavLink> */}
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
                        onPopupClick={() => {
                          setshowPopup("dragon");
                        }}
                      />
                    ) : challenge === "scorpion-king" ? (
                      <ScorpionKing onPopupClick={() => {
                        setshowPopup("scorpion");
                      }}/>
                    ) : challenge === "puzzle-madness" ? (
                      <PuzzleMadness
                        coinbase={coinbase}
                        chainId={chainId}
                        wallet={wallet}
                        binanceW3WProvider={binanceW3WProvider}
                        onPopupClick={() => {
                          setshowPopup("puzzle");
                        }}
                      />
                    ) : challenge === "critical-hit" ? (
                      <CriticalHit
                        onPopupClick={() => {
                          setshowPopup("critical");
                        }}
                      />
                    ) : challenge === "maze-garden" ? (
                      <MazeGarden  onPopupClick={() => {
                        setshowPopup("maze");
                      }}/>
                    ) : challenge === "golden-pass" ? (
                      <GoldenPass
                        coinbase={coinbase}
                        chainId={chainId}
                        wallet={wallet}
                        binanceW3WProvider={binanceW3WProvider}
                        onPopupClick={() => {
                          setshowPopup("golden");
                        }}
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
     {showPopup!=='' && (
        <OutsideClickHandler onOutsideClick={() =>  setshowPopup("")}>
          <ChallengePopup
            item={eventinfos.find((obj)=>{return obj.id === showPopup})}
            handleClose={() =>  setshowPopup("")}
            screen='account'
          />
        </OutsideClickHandler>
      )}

      {/*  {showPopup === "critical" && (
        <CriticalHitPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}

      {showPopup === "dragon" && (
        <DragonPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}

      {showPopup === "golden" && (
        <GoldenPassPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )} */}
      {/* {showPopup === "puzzle" && (
        <PuzzleMadnessPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )} */}
    </>
  );
};

export default NewEvents;
