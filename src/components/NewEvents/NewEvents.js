import React, { useState, useEffect } from "react";
import "./_newevents.scss";

import TreasureHunt from "../Challenges/TreasureHunt";
import DragonRuins from "../Challenges/DragonRuins";
import ScorpionKing from "../Challenges/ScorpionKing";
import PuzzleMadness from "../Challenges/PuzzleMadness";
import CriticalHit from "../Challenges/CriticalHit";
import MazeGarden from "../Challenges/MazeGarden";
import GoldenPass from "../Challenges/GoldenPass";

import { NavLink } from "react-router-dom";

import ChallengePopup from "../ChallengePopup/ChallengePopup";
import OutsideClickHandler from "react-outside-click-handler";
import dragonRuinsPopup from "../../assets/gameAssets/challengeCards/dragonRuinsPopup.webp";
import scorpionKingPopup from "../../assets/gameAssets/challengeCards/scorpionKingPopup.webp";
import coldBitePopup from "../../assets/gameAssets/challengeCards/coldBitePopup.webp";
import furyBeastPopup from "../../assets/gameAssets/challengeCards/furyBeastPopup.webp";
import wingStormPopup from "../../assets/gameAssets/challengeCards/wingStormPopup.webp";
import criticalHitPopup from "../../assets/gameAssets/challengeCards/criticalHitPopup.webp";
import mazeGardenPopup from "../../assets/gameAssets/challengeCards/mazeGardenPopup.webp";
import puzzleMadnessPopup from "../../assets/gameAssets/challengeCards/puzzleMadnessPopup.webp";
import treasureHuntPopup from "../../assets/gameAssets/challengeCards/treasureHuntPopup.webp";
import stoneEyePopup from "../../assets/gameAssets/challengeCards/stoneEyePopup.webp";
import explorerHuntPopup from "../../assets/gameAssets/challengeCards/explorerHuntPopup.webp";
import dragonRuinsBanner from "./assets/banners/dragonRuinsBanner.webp";
import wingStormBanner from "./assets/banners/wingStormBanner.webp";
import stoneEyeBanner from "./assets/banners/stoneEyeBanner.webp";
import furyBeastBanner from "./assets/banners/furyBeastBanner.webp";
import mazeGardenBanner from "./assets/banners/mazeGardenBanner.webp";
import greatCollectionBanner from "./assets/banners/greatCollectionBanner.webp";
import explorerHuntBanner from "./assets/banners/explorerHuntBanner.webp";
import scorpionKingBanner from "./assets/banners/scorpionKingBanner.webp";
import coldBiteBanner from "./assets/banners/coldBiteBanner.webp";
import bnb from "../Challenges/assets/bnb.svg";
import dypIcon from "../Challenges/assets/dypIcon.svg";
import tooltipIcon from "../Challenges/assets/tooltipIcon.svg";
import whiteTooltip from "../Challenges/assets/whiteTooltip.svg";
import syncIcon from "../Challenges/assets/syncIcon.svg";

import coldBiteThumb from "./assets/banners/coldBiteThumb.webp";
import scorpionKingThumb from "./assets/banners/scorpionKingThumb.webp";
import furyBeastThumb from "./assets/banners/furyBeastThumb.webp";
import stoneEyeThumb from "./assets/banners/stoneEyeThumb.webp";
import wingStormThumb from "./assets/banners/wingStormThumb.webp";
import dragonRuinsThumb from "./assets/banners/dragonRuinsThumb.webp";
import Countdown from "react-countdown";


const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{days < 10 ? "0" + days : days}</h6>
        <span className="days3">Days</span>
      </div>
      <h6 className="mint-time3 mb-0">:</h6>

      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days3">Hours</span>
      </div>
      <h6 className="mint-time3 mb-0">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days3">Minutes</span>
      </div>
    </div>
  );
};

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
  const [activeEvent, setActiveEvent] = useState({});
  const [countdown, setcountdown] = useState();
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your game profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [currentWeek, setCurrentWeek] = useState([]);

  const currentDate = new Date().getDay();

  const adjustedDay = currentDate === 0 ? 7 : currentDate;
  // const isMonday = now.getDay() === 1; 
  const isMonday =true; 

  const getMonday = (date) => {
    const day = date.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const diff = (day === 0 ? -6 : 1) - day; // Adjust to Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  const generateWeekDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  useEffect(() => {
    const today = new Date();
    const monday = getMonday(today);
    const week = generateWeekDates(monday);
    setCurrentWeek(week);
  }, []);

  const eventinfos = [
    {
      id: "dragon",
      title: "Dragon Ruins",
      popupImage: dragonRuinsPopup,
      image: dragonRuinsBanner,
      thumbImage: dragonRuinsThumb,

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
      id: "coldbite",
      image: coldBiteBanner,
      popupImage: coldBitePopup,
      thumbImage: coldBiteThumb,
      desc: "Journey into the icy wilderness, where a fearsome polar bear awaits. Test your survival skills in this frozen adventure and uncover treasures hidden in the snow.",
      day: 2,
      dayText: "TUE",
      title: "Cold Bite",
      popupDesc:
        "Cold Bite pits players against the ferocious Polar Bear, a frost-bound menace that rewards resilience and strategy. This chilling event is available on Tuesdays and runs until 00:00 UTC. Players can only buy access once per day, so make every move count as you battle this frosty foe.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Tuesdays.",
        "The Polar Bear must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 30,000 points and up to 300 stars.",
      ],
      tips: [
        "Recommended Hero Level: 15 and above",
        "Craft plenty of health potions and equip frost-resistant armor to mitigate the bear's ice attacks.",
        "Focus on evading its slow but powerful swipes and counterattacking with precision.",
      ],
      link: "/account/challenges/cold-bite",
    },
    {
      id: "furyBeast",
      image: furyBeastBanner,
      popupImage: furyBeastPopup,
      thumbImage: furyBeastThumb,

      desc: "Navigate through the dense jungle and face the wrath of a wild beast. Discover hidden paths, overcome obstacles, and seize the rewards within this thrilling jungle adventure.",
      day: 3,
      dayText: "WED",
      title: "Fury Beast",
      popupDesc:
        "Fury Beast throws you into a battle against the Gorilla, a relentless opponent that tests your endurance and tactical skills. Available only on Wednesdays, the event runs until 00:00 UTC. Access can be purchased once per day, so strategic preparation is key to claiming victory and rewards.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Wednesdays.",
        "The Gorilla must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 60,000 points and up to 400 stars.",
      ],
      tips: [
        "Recommended Hero Level: 18 and above",
        "Craft plenty of health potions and focus on agility to dodge the Gorilla’s ground-pounding attacks.",
        "Aim for weak points like the head to deal maximum damage quickly.",
      ],
      link: "/account/challenges/fury-beast",
    },
    {
      id: "wingstorm",
      image: wingStormBanner,
      popupImage: wingStormPopup,
      thumbImage: wingStormThumb,

      desc: "Soar into the skies and explore intricate pathways guarded by majestic eagle. Use your wits to uncover treasures hidden in this breathtaking aerial journey.",
      day: 4,
      dayText: "THU",
      title: "Wing Storm",
      popupDesc:
        "Take to the skies in Wing Storm, an exhilarating battle against a swift and deadly Eagle. Available exclusively on Thursdays, this event tests your precision and speed as you fight a high-flying adversary. Access can be purchased once per day, with the event running until 00:00 UTC.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Thursdays.",
        "The Eagle must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 70,000 points and up to 500 stars.",
      ],
      tips: [
        "Recommended Hero Level: 22 and above",
        "Craft plenty of health potions and use ranged weapons or magic to counter the Eagle’s aerial mobility.",
        "Stay mobile and anticipate its swift movements to avoid being caught off-guard.",
      ],
      link: "/account/challenges/wing-storm",
    },
    {
      id: "scorpion",
      popupImage: scorpionKingPopup,
      image: scorpionKingBanner,
      thumbImage: scorpionKingThumb,

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
      image: stoneEyeBanner,
      popupImage: stoneEyePopup,
      thumbImage: stoneEyeThumb,

      desc: "Engage in an epic battle against the mighty Cyclops. Outsmart this towering foe to secure victory and claim valuable rewards hidden within its lair.",
      day: 7,
      dayText: "SUN",
      title: "Stone Eye",
      popupDesc:
        "Stone Eye challenges players to battle the Cyclops, a colossal enemy with devastating attacks. This event is available exclusively on Sundays and ends at 00:00 UTC. Only one access purchase is allowed per day, so prepare carefully for this epic showdown.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Sundays.",
        "The Cyclop must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 80,000 points and up to 600 stars.",
      ],
      tips: [
        "Recommended Hero Level: 30 and above",
        "Craft plenty of health potions and equip high-defense gear to withstand its crushing attacks.",
        "Attack its legs to slow it down and exploit openings for critical hits.",
      ],
      link: "/account/challenges/stone-eye",
    },
    // {
    //   id: 'puzzle',

    //   popupImage: puzzleMadnessPopup,
    //   image: puzzleMadnessPopup,

    //   desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
    //   title: "Puzzle Madness",
    //   link: "/account/challenges/puzzle-madness",
    //   popupDesc:
    //     "In the Puzzle Madness event, players search for 10 hidden pieces across the Island Zero and Dypians City maps. These pieces hold points that contribute to the BNB Chain leaderboard. One piece contains a multiplier (x2 to x8) that activates only after all pieces are found, significantly boosting your score.",
    //   secondaryDesc:
    //     "Players have two hours to find the pieces. Points are added to the leaderboards even if not all pieces are found. You can extend time by purchasing another bundle.",
    //   secondaryTitle: "CAWS NFT Utility",
    //   thirdDesc:
    //     "Holding a CAWS NFT gives you an advantage. Your cat companion helps detect hidden pieces with an exclamation mark above its head. However, the cat cannot detect pieces on top or inside buildings, so players must thoroughly explore.",
    //   workList: [
    //     "Purchase the bundle from the Challenge & Events.",
    //     "Find 10 pieces within the two-hour limit in the  Island Zero and Dypians City maps ",
    //     "An indicator will guide you on whether pieces are located making your search easier",
    //   ],
    // },
    // {
    //   id: 'critical',
    //   image: criticalHitPopup,
    //   desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    //   title: "Critical Hit",
    //   link: "/account/challenges/critical-hit",
    //   popupDesc:
    //     "As a Genesis Land NFT holder, you can participate in the daily Critical Hit event to earn points and rewards. Each day, you need to log in to the game and visit your land. On your land, you have a Genesis Gem, which you need to break with a pickaxe. Once broken, it gives you either points that are added to your leaderboard rank on BNB Chain or direct rewards in BNB.",
    //   secondaryTitle: "What is Genesis Land?",
    //   thirdDesc:
    //     "Genesis Land is a 125x125 area in World of Dypians, available to those who own a Genesis Land NFT. Benefits include exclusive rewards, Land NFT staking pool, and special in-game events like Critical Hit.",
    //   workList: [
    //     "Earn 30,000-80,000 points by destroying the Gem",
    //     "Receive rewards ranging from $20 to $7,000 ",
    //     "Rewards are distributed monthly, and you can destroy the Gem once every 24 hours (00:00 UTC).",
    //   ],
    // },

    // {
    //   id: 'maze',
    //   popupImage: mazeGardenPopup,
    //   image: mazeGardenBanner,
    //   desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
    //   day: 5,
    //   dayText: "FRI",
    //   title: "Maze Day",
    //   popupDesc:
    //     "Explore the enigmatic BNB Chain Maze, a labyrinth filled with twists and turns leading to the hidden gem at the center. This event is only accessible to WOD token holders and runs exclusively on Fridays. Navigate the maze carefully and claim your prize before 00:00 UTC.",
    //   workList: [
    //     "Hold at leas 400 WOD tokens to participate.",
    //     "The event is available exclusively on Fridays.",
    //     "Players must find their way to the maze’s center and collect the gem to earn rewards.",
    //     "Rewards include up to 200,000 points, 800 stars, and $10.",
    //   ],
    //   tips: [
    //     "Recommended Hero Level: 15 and above",
    //     "Focus on observation to spot clues, gates, and shortcuts.",
    //     "Plan your route and mark your path to avoid retracing your steps.",
    //   ],
    //   link: "/account/challenges/maze-garden",
    // },
    // {
    //   id: 'golden',
    //   image: golden,
    //   desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    //   title: "Golden Pass",
    //   link: "/account/challenges/golden-pass",
    //   popupDesc:
    //     "The Golden Pass Event lets players earn extra rewards from the leaderboards. The pass is valid for one calendar month, regardless of purchase date.",
    //   secondaryDesc:
    //     "Example: If you buy the Golden Pass on the 7th, it remains active until the end of the month (e.g., from the 7th to the 30th/31st). However, it will reset on the 1st of the following month and must be repurchased to stay active.",
    //   workList: [
    //     "Purchase the bundle from the Challenge & Events.",
    //     "The golden pass is valid for one calendar month, resetting on the 1st, regardless of the purchase date.",
    //     "Extra rewards are given based on leaderboard rank as long as the golden pass is active.",
    //   ],
    // }
  ];

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
                            setActiveEvent(eventinfos[0])
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Legendary Beast Siege</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/maze-garden">
                        <div
                          className={`${
                            challenge === "maze-garden" ||
                            selectedEvent === "maze-garden"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("maze-garden");
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
                      <NavLink to="/account/challenges/great-collection">
                        <div
                          className={`${
                            challenge === "great-collection" ||
                            selectedEvent === "great-collection"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("great-collection");
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">The Great Collection</h6>
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
                      <div className="d-flex flex-column gap-2 w-100">
                        <div className="d-flex align-items-center gap-4 position-relative">
                          {eventinfos.map((item, index) => (
                            <div
                              key={index}
                              className="beast-challenge-card d-flex flex-column position-relative"
                              onClick={() => {
                                // setPopupEvent(item);
                                setActiveEvent(item);
                              }}
                            >
                              <img
                                src={item.thumbImage}
                                className="w-100"
                                alt=""
                              />
                              <div
                                className="d-flex align-item-start gap-2 position-absolute"
                                style={{ top: "-20px", right: "-13px" }}
                              >
                                {/* <p className="challenge-beast-desc m-0 ">{item.desc}</p> */}
                                {/* <span  style={{color: item.day === currentDate ? "gold" : "white" }}>{currentWeek[item.day - 1]?.getDate()}</span> */}
                                <div className="beast-date d-flex flex-column">
                                  <div
                                    className="beast-date-text-holder d-flex align-items-center justify-content-center"
                                    style={{
                                      background:
                                        item.day === adjustedDay
                                          ? "#e10000"
                                          : "#08656a",
                                    }}
                                  >
                                    {item.dayText}
                                  </div>
                                  <div className="beast-date-holder d-flex align-items-center justify-content-center">
                                    {currentWeek[item.day - 1]?.getDate()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="sidebar-separator2 my-2"></div>
                        <div className="d-flex flex-column gap-3">
                          <div className="new-event-wrapper d-flex flex-column">
                            <div className="position-relative d-flex flex-column align-items-lg-center justify-content-center">
                              <img
                                src={tooltipIcon}
                                className="new-event-banner-tooltip"
                                alt=""
                                onClick={()=>{setshowPopup(activeEvent?.id)}}
                              />
                              <img
                                src={activeEvent?.image}
                                className="new-event-banner"
                                alt=""
                              />

                              <div className="d-flex p-2 p-lg-4 align-items-lg-center justify-content-between gap-2 flex-column flex-lg-row dynamicPosition">

                              <div className="d-flex flex-column gap-2">
                                <h6 className="mb-0 challenge-popup-secondary-title" style={{color: '#FFC808'}}>
                                  How it works
                                </h6>
                                <div className="d-flex flex-column gap-1">
                                  {activeEvent?.workList.map((work, index) => (
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      key={index}
                                    >
                                      <div className="green-dot"></div>
                                      <span className="challenge-popup-desc text-white">
                                        {work}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="d-flex flex-column gap-2">
                                {activeEvent?.tips && (
                                  <h6 className="mb-0 challenge-popup-secondary-title" style={{color: '#FFC808'}}>
                                    Tips
                                  </h6>
                                )}
                                <div className="d-flex flex-column gap-1">
                                  {activeEvent?.tips?.map((tip, index) => (
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      key={index}
                                    >
                                      <div className="green-dot"></div>
                                      <span className="challenge-popup-desc text-white">
                                        {tip}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between">
                            <h6 className="mb-0 purchase-package-title">
                              Purchase
                            </h6>
                            <div className="d-flex align-items-end gap-2">
                              <span className="available-on">Available on</span>
                              <img src={bnb} width={20} height={20} alt="" />
                              <span className="purchase-chain">BNB Chain</span>
                            </div>
                          </div>
                          <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                            <div
                              className="event-price-wrapper p-3 d-flex align-items-center gap-5"
                              // style={{
                              //   pointerEvents: isMonday ? "auto" : "none",
                              //   filter: isMonday ? "none" : "blur(5px)",
                              // }}
                            >
                              <span className="event-price-span">
                                Event Price
                              </span>
                              <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center gap-1">
                                  <img src={dypIcon} alt="" />
                                  <h6 className="event-price-coin mb-0">
                                    {/* {getFormattedNumber(dragonRuinsDypAmount)}{" "}
                                    DYP */}
                                  </h6>
                                </div>
                                <span className="event-price-usd">($3.75)</span>
                              </div>
                            </div>
                            {/* {!isMonday ? 
        <h6 className="available-day-text mb-0 text-white" style={{fontWeight: "700", fontSize: "18px"}}>Available on Monday</h6>  
        :
        <div className="position-relative">
          <Countdown renderer={renderer} date={Date.now() + timeUntilMidnight} />
        </div>
      } */}
                            <div
                              className="d-flex align-items-center gap-3"
                              style={{
                                pointerEvents: isMonday ? "auto" : "none",
                                filter: isMonday ? "none" : "blur(5px)",
                              }}
                            >
                              <button
                                disabled={
                                  // bundleState === "deposit" || checkWallet === false  || !isMonday ?
                                  true
                                  //  : false
                                }
                                // className={` ${
                                //   bundleState === "deposit" || checkWallet === false || !isMonday
                                //     ? "stake-wod-btn-inactive"
                                //     : "stake-wod-btn"
                                // }  py-2 px-4`}

                                className={`stake-wod-btn-inactive py-2 px-4`}

                                // onClick={() => {
                                //   handleApproval();
                                // }}
                              >
                                Approve
                              </button>

                              <button
                                disabled={
                                  // bundleState === "deposit" && checkWallet === true || isMonday ? false :
                                  true
                                }
                                // className={` ${
                                //   bundleState === "deposit" ||
                                //   (showApproval === false && checkWallet === true)
                                //     ? "stake-wod-btn"
                                //     : "stake-wod-btn-inactive"
                                // }  py-2 px-4`}

                                className={`stake-wod-btn-inactive py-2 px-4`}

                                // onClick={() => {
                                //   handleDeposit();
                                // }}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                          <span
                            className="statusText"
                            style={{
                              color: statusColor,
                              width: "fit-content",
                            }}
                          >
                            {status}
                          </span>
                          {countdown !== 0 && countdown && (
                            <div className="new-event-wrapper mt-5 p-3">
                              <div className="d-flex flex-column gap-2">
                                <div className=" d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between w-100">
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                      <h6 className="mb-0 time-remaining">
                                        Available Time Remaining
                                      </h6>
                                      <img
                                        src={whiteTooltip}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                    </div>
                                    <p className="sync-desc mb-0">
                                      Use in-game
                                      <img
                                        src={syncIcon}
                                        className="mx-1"
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
                                      sync button every time you purchase a
                                      bundle
                                    </p>
                                  </div>
                                  <Countdown
                                    date={Number(countdown) * 1000}
                                    renderer={renderer}
                                    onComplete={() => {
                                      setcountdown();
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
      {showPopup !== "" && (
        <OutsideClickHandler onOutsideClick={() => setshowPopup("")}>
          <ChallengePopup
            item={eventinfos.find((obj) => {
              return obj.id === showPopup;
            })}
            handleClose={() => setshowPopup("")}
            screen="account"
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
