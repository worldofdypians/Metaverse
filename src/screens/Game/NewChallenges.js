import React, { useEffect, useRef, useState } from "react";
import "./_game.scss";
import dragonRuinsCard from "../../assets/gameAssets/challengeCards/dragonRuinsCard.png";
import scorpionKingCard from "../../assets/gameAssets/challengeCards/scorpionKingCard.png";
import coldBiteCard from "../../assets/gameAssets/challengeCards/coldBiteCard.png";
import furyBeastCard from "../../assets/gameAssets/challengeCards/furyBeastCard.png";
import wingStormCard from "../../assets/gameAssets/challengeCards/wingStormCard.png";
import cawsCard from "../../assets/gameAssets/challengeCards/cawsCard.png";
import chestCard from "../../assets/gameAssets/challengeCards/chestCard.png";
import criticalHitCard from "../../assets/gameAssets/challengeCards/criticalHitCard.png";
import leaderboardCard from "../../assets/gameAssets/challengeCards/leaderboardCard.png";
import mazeGardenCard from "../../assets/gameAssets/challengeCards/mazeGardenCard.png";
import puzzleMadnessCard from "../../assets/gameAssets/challengeCards/puzzleMadnessCard.png";
import treasureHuntCard from "../../assets/gameAssets/challengeCards/treasureHuntCard.png";
import stoneEyeCard from "../../assets/gameAssets/challengeCards/stoneEyeCard.png";
import explorerHuntCard from "../../assets/gameAssets/challengeCards/explorerHuntCard.png";
import Slider from "react-slick";

const NewChallenges = () => {
  const [event, setEvent] = useState("daily");
  const [currentWeek, setCurrentWeek] = useState([]);

  const currentDate = new Date().getDay();

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
      image: chestCard,
      desc: "Open up to 10 daily bonus chests to collect rewards and keep your progress steady. Perfect for consistent adventurers.",
    },
    {
      image: chestCard,
      desc: "Upgrade to prime access and unlock up to 20 daily bonus chests for even greater benefits and exclusive rewards.",
    },
    {
      image: criticalHitCard,
      desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    },
  ];

  const challengeBeasts = [
    {
      image: dragonRuinsCard,
      desc: "Enter the fiery depths of the Dragon Ruins, where a ferocious dragon guards its treasure. Explore the ruins, overcome challenges, and claim the hidden rewards.",
      day: 1,
      dayText: "MON",
    },
    {
      image: coldBiteCard,
      desc: "Journey into the icy wilderness, where a fearsome polar bear awaits. Test your survival skills in this frozen adventure and uncover treasures hidden in the snow.",
      day: 2,
      dayText: "TUE",
    },
    {
      image: furyBeastCard,
      desc: "Navigate through the dense jungle and face the wrath of a wild beast. Discover hidden paths, overcome obstacles, and seize the rewards within this thrilling jungle adventure.",
      day: 3,
      dayText: "WED",
    },
    {
      image: wingStormCard,
      desc: "Soar into the skies and explore intricate pathways guarded by majestic eagle. Use your wits to uncover treasures hidden in this breathtaking aerial journey.",
      day: 4,
      dayText: "THU",
    },
    {
      image: scorpionKingCard,
      desc: "Cross the scorching desert to challenge the Scorpion King. Brave the heat, avoid traps, and unlock the secrets of the sands to claim the riches waiting for you.",
      day: 6,
      dayText: "SAT",
    },
    {
      image: stoneEyeCard,
      desc: "Engage in an epic battle against the mighty Cyclops. Outsmart this towering foe to secure victory and claim valuable rewards hidden within its lair.",
      day: 7,
      dayText: "SUN",
    },
  ];

  const challengeHunts = [
    {
      image: mazeGardenCard,
      desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
      day: 5,
      dayText: "FRI",
    },
    {
      image: puzzleMadnessCard,
      desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
    },
    {
      image: treasureHuntCard,
      desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
    },
    {
      image: explorerHuntCard,
      desc: "Explore the vast world and partner areas to find hidden items. Discover valuable treasures while delving into unique zones.",
    },
    {
      image: leaderboardCard,
      desc: "Defend your world by taking on invading explorers who are here to gather information. Fight to protect the secrets of the land and earn rewards.",
    },
  ];

  // console.log(currentWeek[0].getDate());

  return (
    <div className="d-flex flex-column">
      <div className="new-challenges-hero w-100 p-5 d-flex flex-column gap-5 align-items-center">
        <h2 className="font-montserrat main-hero-title  px-0">
          Events & Challenges
        </h2>
        <div className="col-12 col-md-8 col-lg-7">
          <div className="challenges-button-grid gap-4">
            <button
              className={`inactive-challenge-btn ${
                event === "daily" && "active-challenge-btn"
              } px-5 py-2`}
              onClick={() => {
                setEvent("daily");
                sliderRef.current.slickGoTo(0);
              }}
            >
              Daily Opportunities
            </button>
            <button
              className={`inactive-challenge-btn ${
                event === "beast" && "active-challenge-btn"
              } px-5 py-2`}
              onClick={() => {
                setEvent("beast");
                sliderRef.current.slickGoTo(1);
              }}
            >
              Legendary Beast Siege
            </button>
            <button
              className={`inactive-challenge-btn ${
                event === "hunt" && "active-challenge-btn"
              } px-5 py-2`}
              onClick={() => {
                setEvent("hunt");
                sliderRef.current.slickGoTo(2);
              }}
            >
              The Great Hunt
            </button>
          </div>
        </div>
      </div>
      <div className="new-challenges-wrapper d-flex justify-content-center w-100 py-3">
        <div className="custom-container d-flex align-items-center justify-content-center">
          <Slider {...settings} ref={sliderRef}>
            <div className="beast-challenges-grid px-3 px-lg-0">
              {challengeDaily.map((item, index) => (
                <div
                  key={index}
                  className="beast-challenge-card d-flex flex-column gap-2"
                >
                  <img src={item.image} className="w-100" alt="" />
                  <p className="challenge-beast-desc m-0 p-3">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="beast-challenges-grid px-3 px-lg-0">
              {challengeBeasts.map((item, index) => (
                <div
                  key={index}
                  className="beast-challenge-card d-flex flex-column gap-2"
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
                            item.day === currentDate ? "#e10000" : "#08656a",
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
                >
                  <img src={item.image} className="w-100" alt="" />
                  <div className="d-flex align-items-start gap-2 p-3">
                  <p className="challenge-beast-desc m-0 ">{item.desc}</p>
                  {item.day &&
                   <div className="beast-date d-flex flex-column">
                   <div
                     className="beast-date-text-holder d-flex align-items-center justify-content-center"
                     style={{
                       background:
                         item.day === currentDate ? "#e10000" : "#08656a",
                     }}
                   >
                     {item.dayText}
                   </div>
                   <div className="beast-date-holder d-flex align-items-center justify-content-center">
                     {currentWeek[4]?.getDate()}
                   </div>
                 </div>
                  }
                  </div>
                </div>
              ))}
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NewChallenges;
