import React, { useEffect, useRef, useState } from "react";
import "./_game.scss";
import dragonRuinsCard from "../../assets/gameAssets/challengeCards/dragonRuinsCard.png";
import scorpionKingCard from "../../assets/gameAssets/challengeCards/scorpionKingCard.png";
import coldBiteCard from "../../assets/gameAssets/challengeCards/coldBiteCard.png";
import furyBeastCard from "../../assets/gameAssets/challengeCards/furyBeastCard.png";
import wingStormCard from "../../assets/gameAssets/challengeCards/wingStormCard.png";
import criticalHitCard from "../../assets/gameAssets/challengeCards/criticalHitCard.png";
import mazeGardenCard from "../../assets/gameAssets/challengeCards/mazeGardenCard.png";
import puzzleMadnessCard from "../../assets/gameAssets/challengeCards/puzzleMadnessCard.png";
import treasureHuntCard from "../../assets/gameAssets/challengeCards/treasureHuntCard.png";
import stoneEyeCard from "../../assets/gameAssets/challengeCards/stoneEyeCard.png";
import explorerHuntCard from "../../assets/gameAssets/challengeCards/explorerHuntCard.png";
import dailyBonusCard from "../../assets/gameAssets/challengeCards/dailyBonusCard.png";
import dailyBonusPrimeCard from "../../assets/gameAssets/challengeCards/dailyBonusPrimeCard.png";
import greatCollectionCard from "../../assets/gameAssets/challengeCards/greatCollectionCard.png";
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
import greatCollectionPopup from "../../assets/gameAssets/challengeCards/greatCollectionPopup.webp";
import Slider from "react-slick";
import ChallengePopup from "../../components/ChallengePopup/ChallengePopup";
import OutsideClickHandler from "react-outside-click-handler";

const NewChallenges = ({ screen, popupEvent,
  setPopupEvent,
  popupActive,
  setPopupActive, }) => {
  const [event, setEvent] = useState("beast");
  const [currentWeek, setCurrentWeek] = useState([]);


  const currentDate = new Date().getDay();

  const adjustedDay = currentDate === 0 ? 7 : currentDate;

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



  const html = document.querySelector("html");

  useEffect(() => {
    if (popupActive === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [popupActive]);


  const sliderRef = useRef(null);
  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 50,
    autoplay: false,
    draggable: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          draggable: false,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          draggable: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          draggable: false,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          draggable: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          fade: false,
          initialSlide: 0,
          draggable: false,
        },
      },
    ],
  };

  const challengeDaily = [
    {
      image: dailyBonusCard,
      popupImage: dragonRuinsPopup,
      desc: "Open up to 10 daily bonus chests to collect rewards and keep your progress steady. Perfect for consistent adventurers.",
      title: "Daily Bonus",
      popupDesc:
        "Cold Bite pits players against the ferocious Polar Bear, a frost-bound menace that rewards resilience and strategy. This chilling event is available on Tuesdays and runs until 00:00 UTC. Players can only buy access once per day, so make every move count as you battle this frosty foe.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Tuesdays.",
        "The Polar Bear must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 30,000 points and up to 300 stars.",
      ],
      tips: [
        "Recommended Hero Level: 18 and above",
        "Craft plenty of health potions and equip frost-resistant armor to mitigate the bear's ice attacks.",
        "Focus on evading its slow but powerful swipes and counterattacking with precision.",
      ],
      link: "/account#dailybonus",
    },
    {
      image: dailyBonusPrimeCard,
      popupImage: dragonRuinsPopup,
      desc: "Upgrade to prime access and unlock up to 20 daily bonus chests for even greater benefits and exclusive rewards.",
      title: "Daily Bonus Prime",
      popupDesc:
        "Cold Bite pits players against the ferocious Polar Bear, a frost-bound menace that rewards resilience and strategy. This chilling event is available on Tuesdays and runs until 00:00 UTC. Players can only buy access once per day, so make every move count as you battle this frosty foe.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Tuesdays.",
        "The Polar Bear must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 30,000 points and up to 300 stars.",
      ],
      tips: [
        "Recommended Hero Level: 18 and above",
        "Craft plenty of health potions and equip frost-resistant armor to mitigate the bear's ice attacks.",
        "Focus on evading its slow but powerful swipes and counterattacking with precision.",
      ],
      link: "/account#dailybonus",
    },
    {
      image: criticalHitCard,
      popupImage: criticalHitPopup,

      desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
      title: "Critical Hit",
      link: "/account/challenges/critical-hit",
      popupDesc:
        "As a Genesis Land NFT holder, you can participate in the daily Critical Hit event to earn points and rewards. Each day, you need to log in to the game and visit your land. On your land, you have a Genesis Gem, which you need to break with a pickaxe. Once broken, it gives you either points that are added to your leaderboard rank on BNB Chain or direct rewards in BNB.",
      secondaryTitle: "What is Genesis Land?",
      thirdDesc:
        "Genesis Land is a 125x125 area in World of Dypians, available to those who own a Genesis Land NFT. Benefits include exclusive rewards, Land NFT staking pool, and special in-game events like Critical Hit.",
        workList: [
          "Hold Genesis Land NFT to access the event.",
          "Earn 30,000-80,000 points by destroying the Gem",
          "Receive rewards ranging from $20 to $7,000 ",
          "Rewards are distributed monthly, and you can destroy the Gem once every 24 hours (00:00 UTC).",
        ],
        tips: [
          "Recommended Hero Level: Any",
          "Use your pickaxe to break the Genesis Gem efficiently.",
          "Check your Genesis Land daily to ensure you don't miss a gem reset.",
        ],
    },
  ];

  const challengeBeasts = [
    {
      title: "Dragon Ruins",
      image: dragonRuinsCard,
      popupImage: dragonRuinsPopup,
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
      image: coldBiteCard,
      popupImage: coldBitePopup,

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
      image: furyBeastCard,
      popupImage: furyBeastPopup,
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
      image: wingStormCard,
      popupImage: wingStormPopup,
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
      image: scorpionKingCard,
      popupImage: scorpionKingPopup,
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
      image: stoneEyeCard,
      popupImage: stoneEyePopup,
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
  ];

  const challengeHunts = [
    {
      image: mazeGardenCard,
      popupImage: mazeGardenPopup,
      desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
      day: 5,
      dayText: "FRI",
      title: "Maze Day",
      popupDesc:
        "Explore the enigmatic BNB Chain Maze, a labyrinth filled with twists and turns leading to the hidden gem at the center. This event is only accessible to WOD token holders and runs exclusively on Fridays. Navigate the maze carefully and claim your prize before 00:00 UTC.",
      workList: [
        "Hold at least 400 WOD tokens to participate.",
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
      image: puzzleMadnessCard,
      popupImage: puzzleMadnessPopup,
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
      image: treasureHuntCard,
      popupImage: treasureHuntPopup,
      desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
      title: "Treasure Hunt",
      popupDesc:
        "Embark on a daily Treasure Hunt event where you’ll explore partner areas to uncover hidden items. These items could be Chests, Eggs, or Magma, each offering unique rewards. The event challenges players to carefully investigate specific areas each day to find the hidden treasures. Once collected, these treasures will either grant leaderboard points or direct rewards, making this event a must for adventurers looking to climb the ranks or earn exciting prizes.",
      workList: [
        "The event occurs daily, requiring players to visit partner areas to search for hidden items.",
        "Hidden treasures include Chests, Eggs, or Magma, and their locations change each day.",
        "Players must collect the treasures and reveal the rewards they contain.",
        "Rewards include up to 50,000 points.",
      ],
      tips: [
        "Explore each area thoroughly and pay attention to visual or auditory clues indicating the presence of treasures.",
        "Plan your exploration route efficiently to maximize the number of treasures you can find in a single session.",
      ],
      link: "/account/challenges/treasure-hunt",
    },
    {
      image: explorerHuntCard,
      popupImage: explorerHuntPopup,
      desc: "Explore the vast world and partner areas to find hidden items. Discover valuable treasures while delving into unique zones.",
      title: "Explorer Hunt",
      popupDesc:
        "Defend the world from the alien explorers who have landed to assess the terrain before their invasion. Players will hear an alert signaling the arrival of these intruders in a specific area, and your task is to defend the city by defeating them. The event features three levels of explorers, each more powerful and challenging than the last. Be prepared to strategize and face increasingly formidable opponents as you protect your homeland.",
      workList: [
        "Alerts will notify players of the arrival of alien explorers in a designated area.",
        "Players must travel to the location and engage in combat with the explorers.",
        "There are three levels of explorers to defeat, each with higher difficulty and rewards.",
      ],
      tips: [
        "Recommended Hero Level: 20 and above",
        "Upgrade your weapons and armor to handle the increasing difficulty of higher-level explorers.",
        "Stock up on health potions to sustain yourself during prolonged battles.",
      ],
      link: "/account/challenges/explorer-hunt",
    },
    {
      image: greatCollectionCard,
      popupImage: greatCollectionPopup,
      desc: "Defend your world by taking on invading explorers who are here to gather information. Fight to protect the secrets of the land and earn rewards.",
      title: "The Great Collection",
      popupDesc:
        "The Great Collection is a thrilling event where players are tasked with gathering rare and unique partner branded coins scattered across the game. This event challenges your exploration and problem-solving skills as you work to collect as many coins as possible. Compete against other players to amass the largest collection and earn exclusive rewards based on your ranking.",
      workList: [
        "Rare collectible items are hidden across the map, in both common and hard-to-reach locations.",
        "Players must explore the maps to retrieve these partner branded coins.",
        "The collected amount contributes to unlocking more rewards in the future.",
      ],
      tips: [
        "Recommended Hero Level: 1 and above",
        "Prioritize exploring areas that are less crowded to maximize your chances of finding hidden coins.",
        "Use mounts or movement speed boosts to traverse large zones quickly.",
      ],
      link: "/account/challenges/great-collection",
    },
  ];

  console.log(adjustedDay, "currentdate");

  return (
    <>
      <div className="d-flex flex-column">
        <div className="new-challenges-hero w-100 p-5 d-flex flex-column gap-5 align-items-center">
          <h2 className="font-montserrat main-hero-title  px-0">
            Events & Challenges
          </h2>
          <div className="col-12 col-md-8 col-lg-7">
            <div className="challenges-button-grid gap-4">
              <button
                className={`inactive-challenge-btn ${
                  event === "beast" && "active-challenge-btn"
                } ${screen === "marketplace" ? "px-4" : "px-5"} py-2`}
                onClick={() => {
                  setEvent("beast");
                  sliderRef.current.slickGoTo(0);
                }}
              >
                Legendary Beast Siege
              </button>
              <button
                className={`inactive-challenge-btn ${
                  event === "hunt" && "active-challenge-btn"
                } ${screen === "marketplace" ? "px-4" : "px-5"} py-2`}
                onClick={() => {
                  setEvent("hunt");
                  sliderRef.current.slickGoTo(1);
                }}
              >
                The Great Hunt
              </button>
              <button
                className={`inactive-challenge-btn ${
                  event === "daily" && "active-challenge-btn"
                } ${screen === "marketplace" ? "px-4" : "px-5"} py-2`}
                onClick={() => {
                  setEvent("daily");
                  sliderRef.current.slickGoTo(2);
                }}
              >
                Daily Opportunities
              </button>
            </div>
          </div>
        </div>
        <div className="new-challenges-wrapper d-flex justify-content-center w-100 py-3">
          <div className="custom-container d-flex align-items-center justify-content-center">
            <Slider {...settings} ref={sliderRef}>
              <div className="beast-challenges-grid px-3 px-lg-0">
                {challengeBeasts.map((item, index) => (
                  <div
                    key={index}
                    className="beast-challenge-card d-flex flex-column gap-2"
                    onClick={() => {
                      setPopupEvent(item);
                      setPopupActive(true);
                    }}
                  >
                    <img src={item.image} className="w-100" alt="" />
                    <div className="d-flex align-item-start gap-2 p-3">
                      <p className="challenge-beast-desc m-0 ">{item.desc}</p>
                      {/* <span  style={{color: item.day === currentDate ? "gold" : "white" }}>{currentWeek[item.day - 1]?.getDate()}</span> */}
                      <div className="beast-date d-flex flex-column">
                        <div
                          className="beast-date-text-holder d-flex align-items-center justify-content-center"
                          style={{
                            background:
                              item.day === adjustedDay ? "#e10000" : "#08656a",
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
              <div className="beast-challenges-grid px-3 px-lg-0">
                {challengeHunts.map((item, index) => (
                  <div
                    key={index}
                    className="beast-challenge-card d-flex flex-column gap-2"
                    onClick={() => {
                      setPopupEvent(item);
                      setPopupActive(true);
                    }}
                  >
                    <img src={item.image} className="w-100" alt="" />
                    <div className="d-flex align-items-start gap-2 p-3">
                      <p className="challenge-beast-desc m-0 ">{item.desc}</p>
                      {item.day && (
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
                            {currentWeek[4]?.getDate()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="beast-challenges-grid px-3 px-lg-0">
                {challengeDaily.map((item, index) => (
                  <div
                    key={index}
                    className="beast-challenge-card d-flex flex-column gap-2"
                    onClick={() => {
                      setPopupEvent(item);
                      setPopupActive(true);
                    }}
                  >
                    <img src={item.image} className="w-100" alt="" />
                    <p className="challenge-beast-desc m-0 p-3">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {popupActive && (
        <OutsideClickHandler onOutsideClick={() => setPopupActive(false)}>
          <ChallengePopup
            item={popupEvent}
            handleClose={() => setPopupActive(false)}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default NewChallenges;
