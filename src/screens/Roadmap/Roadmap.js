import React, { useEffect, useRef, useState } from "react";
import "./_roadmap.scss";
import roadmapDummy from "./assets/roadmapDummy.png";
import roadmapIndicator from "./assets/roadmapIndicator.svg";
import quarterOne from "./assets/quarterOne.svg";
import completed from "./assets/completed.svg";
import RoadmapCard from "../../components/RoadmapCard/RoadmapCard";
import demoLaunch from "../../assets/landAssets/demoLaunch.png";
import betaTesting from "../../assets/landAssets/betaTesting.png";
import leaderboardBanner from "./assets/leaderboardBanner.png";
import whitelistBanner from "./assets/whitelistBanner.webp";
import cawsIntegration from "./assets/cawsIntegration.png";
import gameEvents from "./assets/gameEvents.png";
import multiplayerBanner from "./assets/multiplayerBanner.png";
import landMinting from "./assets/landMinting.png";
import nextArrow from "./assets/nextArrow.svg";
import Slider from "react-slick";
import timepieceRoadmap from "./assets/timepieceRoadmap.webp";
import wodPartnership from "./assets/wodPartnership.webp";
import multichainIntegration from "./assets/multichainIntegration.webp";
import caws3d from "./assets/caws3d.webp";
import betaPassCollection from "./assets/betaPassCollection.png";
import marketplaceIntroduction from "./assets/marketplaceIntroduction.png";
import newEvents from "./assets/newEvents.png";
import betaPassAddition from "./assets/betaPassAddition.png";
import globalEvents from "./assets/globalEvents.png";
import partnershipAddition from "./assets/partnershipAddition.png";
import epicwhite from "./assets/epicwhite.svg";
import wodAnimalsBanner from './assets/wodAnimalsBanner.png';
import wodLeaderBoardBanner from './assets/wodLeaderboardBanner.png';
import dailyBonusBanner from './assets/dailyBonusBanner.png';
import premiumBanner from './assets/premiumsubscBanner.png';
import uiDevelopment from './assets/uiDevelopment.png';
import trackingRewards from './assets/trackingRewards.png';
import myRank from './assets/myRank.png';

const Roadmap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Roadmap";
  }, []);

 

  const [title, setTitle] = useState("2024");
  const [tooltip, setTooltip] = useState(false);

  const roadmapItems2023 = [
    {
      quarter: "quarterOne",
      image: "quarterOneImage",
      content: [
        {
          title: "Demo Launch",
          desc: "Players can now get a taste of the game`s mechanics and gameplay. The demo offers a sneak peek at the game`s features and content, giving players a chance to see what the game has to offer.",
          completed: true,
        },
        {
          title: "Beta Tester access",
          desc: "Gather feedback from beta testing phase to identify any issues or areas for improvement and make changes before the game is officially released.",
          completed: true,
        },
        {
          title: "CAWS Integration",
          desc: "This integration allows players to have virtual cats as companions represented by CAWS NFTs. These NFTs give players unique ownership over their virtual cats and the ability to interact with them in the game.",
          completed: true,
        },
        {
          title: "Special in-game events",
          desc: "Players will be invited to participate in exciting and unique events with rewards and prizes.",
          completed: true,
        },
        {
          title: "Leaderboard",
          desc: "Introducing a leaderboard system where users can monitor their daily/weekly/monthly performance. Top ranked players will get rewards or bonuses  in the form of in-game items, currency, or access to exclusive content.",
          completed: true,
        },
        {
          title: "Genesis Land Whitelist",
          desc: "Become the owner of a limited edition of 1,000 Genesis Land NFTs located in prime locations by joining the whitelist",
          completed: true,
        },
        {
          title: "Genesis Land Launch",
          desc: "World of Dypians Genesis edition is limited to 1,000 NFTs, each of which represents a piece of land located in a prime area within the game that will provide players with a wide range of benefits.",
          completed: true,
        },
        {
          title: "Multichain Integration",
          desc: "Incorporation of multiple chains providing users with optimal options and solutions.",
          completed: true,
        },
        {
          title: "Addition and development of partnerships",
          desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more.",
          completed: true,
        },

        {
          title: "Introducing the CAWS Timepiece NFT collection",
          desc: "The CAWS Timepiece NFT collection will provide users additional utility and perks in the World of Dypians Metaverse. CAWS owners will have the ability to mint CAWS Timepiece for free.",
          completed: true,
        },
        {
          title: "CAWS NFT 3D rendering",
          desc: "Users are able to create an in-game playable 3D version of their owned CAWS NFT.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterTwo",
      image: "quarterTwoImage",

      content: [
        {
          title: "Introduction of marketplace",
          desc: "Users can access WOD marketplace to purchase assets used to customize and enhance their experience.",
          completed: true,
        },

        {
          title: "In-game representation of Land NFTs",
          desc: "Players can access the land they own and enjoy its benefits within the game. It will be possible to trade Land NFTs and transfer the associated benefits to the new owner.",
          completed: true,
        },
        {
          title: "Quest System",
          desc: "Adventurers will complete quests to earn items and gain prestige.",
          completed: true,
        },
        {
          title: "Tracking goals and achievements",
          desc: "Players will receive special rewards and titles for accomplishing some of the game's most difficult tasks.",
          completed: true,
        },

        {
          title: "Addition and development of partnerships",
          desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterThree",
      image: "quarterThreeImage",

      content: [
        {
          title: "CAWS NFT transformation",
          desc: "Transform your CAWS to different epic creatures to assist in special abilities and benefits.",
          completed: true,
        },
        {
          title: "Introduction of in-game mounts",
          desc: "Players can journey throughout the world using many types of transportation methods",
          completed: true,
        },

        {
          title: "Multiplayer PVE DEMO",
          desc: "Experience cooperative gameplay with the multiplayer PVE demo, offering exciting challenges and teamwork opportunities.",
          completed: true,
        },
        {
          title: "Multiplayer PVP DEMO",
          desc: "Engage in thrilling player-versus-player action with the multiplayer PVP demo, where you'll battle against other skilled players.",
          completed: true,
        },
        {
          title: "Expansion to Conflux Network",
          desc: "Our platform extends its reach to the Conflux Network, offering users more blockchain choices and opportunities.",
          completed: true,
        },
        {
          title: "Introduction of Beta Pass NFT collection",
          desc: "Discover the exclusive Beta Pass NFT collection, a limited edition of digital collectibles for our valued users.",
          completed: true,
        },
        {
          title: "Introduction of New Events",
          desc: "A variety of engaging global and local events designed to engage and reward players.",
          completed: true,
        },
        {
          title: "Addition and development of partnerships",
          desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterFour",
      image: "quarterFourImage",

      content: [
        {
          title: "Global Events",
          desc: "Initiating Global Events (Treasure Hunt, Daily Bonus) that invite all players to participate and earn multiple rewards.",
          completed: true,
        },
        {
          title: "Legal Entity",
          desc: "World of Dypians is established as a legal entity, fully registered and licensed, complying with all necessary regulations.",
          completed: true,
        },
        {
          title: "Addition of Beta Pass NFTs",
          desc: "Developing Beta Pass NFT collections for World of Dypians partners, offering associated benefits within the game.",
          completed: true,
        },

        {
          title: "Multiplayer PVE",
          desc: "Adventure with other players to complete quests, fight bosses, survive against waves of enemies, earn rewards and much more.",
          completed: true,
        },
        {
          title: "Multiplayer PVP",
          desc: "Engage in huge battle events against other players in real-time. Players can compete and interact against each other in 1v1 or group battle to complete objectives.",
          completed: true,
        },
        {
          title: "In-game chat",
          desc: "Users can communicate via voice and chat texts in multiple channels.",
          completed: true,
        },
        {
          title: "Addition and development of partnerships",
          desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more",
          completed: true,
        },
        // {
        //   title: "P2P trade",
        //   desc: "Exchange and trade items directly with other users.",
        // },
        // {
        //   title: "Global environmental events",
        //   desc: "Participate in huge global events with leaderboards and prizes.",
        // },
        // {
        //   title: "Introduction of tutorial guide v2",
        //   desc: "In-depth tips and tricks to help players master World of Dypians.",
        // },
        // {
        //   title: "Weapons and armor customization",
        //   desc: "Users can customize unique in-game assets such as weapons, armor, skins, and much more. These NFTs can be bought, sold, and traded on the open market. In addition, these tailor-made NFTs can be equipped and used by players in game.",
        // },
        // {
        //   title: "Addition and development of partnerships",
        //   desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more.",
        // },
      ],
    },
    // {
    //   quarter: "2024",
    //   content: [
    //     {
    //       title: "Introduction of build hub",
    //       desc: null,
    //     },
    //     {
    //       title: "Additional clan support",
    //       desc: null,
    //     },
    //     {
    //       title: "Updated and improved battle arenas",
    //       desc: null,
    //     },
    //     {
    //       title: "Tame wild animals increasing team size",
    //       desc: null,
    //     },
    //   ],
    // },
  ];


  const roadmapItems2024 = [
    {
      quarter: "quarterOne",
      image: "quarterOneImage",
      content: [
        {
          title: "Introduction of AI Powered NPCs",
          desc: "Implement AI-powered NPC crowds to interact with users, adding depth and engagement to the game world.",
          completed: true,
        },
        {
          title: "Expansion of the City Area",
          desc: "Enlarge the city to include new environments, making it more expansive and futuristic, providing players with more areas to explore.",
          completed: true,
        },
        {
          title: "Introduction of New Teleport Station",
          desc: "Introduce teleport portals that allow players to travel to different locations on the map instantly.",
          completed: true,
        },
        {
          title: "Addition of New Game Creatures",
          desc: "Introduce new creatures to the game, increasing variety and challenges for players.",
          completed: true,
        },
        {
          title: "New Chain Expansion",
          desc: "Integrate additional blockchains into the game to broaden the reach and appeal.",
          completed: true,
        },
        {
          title: "Daily Bonus Improvement",
          desc: "Enhance the daily bonus system to provide players with increased benefits and a more inclusive experience.",
          completed: true,
        },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience.",
          completed: true,
        },
        {
          title: "Enhanced Leaderboard",
          desc: "Integrate an enhanced leaderboard feature to track player achievements and progress, promoting competition and recognition among players.",
          completed: true,
        },

        {
          title: "Teleportation Hub",
          desc: `Introduce a teleportation hub in the game, allowing players to swiftly travel between different areas and regions, enhancing convenience and exploration.`,
          completed: true,
        },
        {
          title: "Skyway System",
          desc: "Implement a skyway system for efficient travel within the game world, offering a scenic and immersive mode of transportation for players.",
          completed: true,
        },

        {
          title: "Rank and Reward System",
          desc: "Introduce a ranking system based on player performance and engagement, rewarding players with unique perks and benefits as they progress through the ranks.",
          completed: true,
        },
        {
          title: "Premium Subscriber Benefits Expansion",
          desc: "Introduce a ranking system based on player performance and engagement, rewarding players with unique perks and benefits as they progress through the ranks.",
          completed: true,
        },

        {
          title: "Launch Mobile App",
          desc: "Release a mobile application to provide users with a more convenient way to access the platform and its features.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterTwo",
      image: "quarterTwoImage",

      content: [
        {
          title: "New Game UI Development",
          desc: "Develop a new user interface to improve navigation and accessibility within the game.",
          completed: true,
        },


        // {
        //   title: "Introduction of Shop v1",
        //   desc: "Launch the first version of the in-game shop where players can buy items, loot, weapons, and equipment.",
        //   completed: false,
        // },
        {
          title: "Challenger Features",
          desc: "Exciting and engaging new in-game challenger events to enhance overall gameplay experience.",
          completed: true,
        },
        {
          title: "Improving Tracking Rewards",
          desc: "Enhance the tracking of historic data rewards earned by players to improve their gaming experience.",
          completed: true,
        },
        {
          title: "Personalized Game Domain",
          desc: "Enable players to create personalized web3 names with a customized domain name.",
          completed: true,
        },
        {
          title: "CAWS Staking Pool",
          desc: "The launch of a new NFT staking pool for CAWS NFT holders that is accessible only to Premium Subscribers.",
          completed: true,
        },
        {
          title: "My Rank Introduction",
          desc: "Introducing My Rank, a new feature that allows players to track their progress and achievements within the game.",
          completed: true,
        },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterThree",
      image: "quarterThreeImage",

      content: [
     
        {
          title: "Expanding with a New Environment",
          desc: "Create a new environment, such as an island, for players to explore, complete tasks, and engage in battles.",
          completed: true,
        },
        {
          title: "Genesis Land NFT Staking Pool",
          desc: "Launch the Genesis Land NFT Staking Pool, allowing landholders to stake their NFTs and earn rewards, adding a new utility for Genesis Land owners within the World of Dypians.",
          completed: true,
        },
        {
          title: "Launch of Mini App",
          desc: "A task-based telegram mini app on Telegram that allows players to complete various missions, earn rewards, and stay engaged with the community directly through the platform.",
          completed: true,
        },
        {
          title: "Expansion to New Chains",
          desc: "Expanding the game's ecosystem by integrating with additional blockchain networks, making the game accessible to more users and enhancing interoperability.",
          completed: true,
        },
        {
          title: "Addition of AI Powered NPCs",
          desc: "Introducing a variety of new Non-Player Characters (NPCs) to enrich the game world, each with unique interactions and quests for players to discover.",
          completed: true,
        },
        {
          title: "Enhancements of Leaderboards",
          desc: "Upgraded leaderboards to improve player experience and new competitive features, allowing players to track their progress more effectively.",
          completed: true,
        },
        // {
        //   title: "Introduction of Shop v2",
        //   desc: "Improve and expand the in-game shop with new features and offerings.",
        //   completed: false,
        // },

      
       
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience.",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterFour",
      image: "quarterFourImage",

      content: [
       
        {
          title: "Launch of Crypto Museum",
          desc: "Introduce a museum within the game where players can explore and learn about cryptocurrencies.",
          completed: false,
        },
        // {
        //   title: "Introduction of Character Customization",
        //   desc: "Allow players to personalize their main avatar/character with facial and body features.",
        //   completed: false,
        // },
        //  {
        //   title: "Full Release of the Multiplayer PvP",
        //   desc: "Launch the full version of the multiplayer player-versus-player mode for competitive gameplay.",
        //   completed: false,
        // },
        {
          title: "Introduction of Shop v1",
          desc: "Launch the first version of the in-game shop where players can buy items, loot, weapons, and equipment.",
          completed: false,
        },
        {
          title: "Multiplayer Social Hub",
          desc: "Create a social hub where players can interact, form communities, and engage in multiplayer activities.",
          completed: false,
        },
        // {
        //   title: "Loot Box Introduction",
        //   desc: "Introduce loot boxes as a new gameplay mechanic to reward players with random items.",
        //   completed: false,
        // },
        {
          title: "Introduction of the Mall Center",
          desc: "Introduce a mall center in the game where players can shop for various items and goods.",
          completed: false,
        },
        // {
        //   title: "Full Release of the Multiplayer PvE",
        //   desc: "Launch the full version of the multiplayer player-versus-environment mode for all players to enjoy.",
        //   completed: false,
        // },

        {
          title: "Addition of Game Currency",
          desc: "Introduce a new in-game currency to enhance the game's economy and provide more options for players.",
          completed: false,
        },

        {
          title: "Website Revamped UI/UX",
          desc: "Unveil a redesigned website with a revamped UI/UX, offering users a more intuitive and visually engaging experience for seamless navigation and interaction within the World of Dypians ecosystem.",
          completed: false,
        },

        {
          title: "Introduction of Scorpion King Event",
          desc: "Launch the Scorpion King event, a thrilling in-game challenge where players face off against the formidable Scorpion King, with the chance to earn exclusive rewards and valuable in-game items.",
          completed: false,
        },

        {
          title: "Maze Garden Challenge",
          desc: "Introduce the Maze Garden challenge, a weekly event within the BNB Chain area where players navigate through intricate mazes and compete for one-time rewards, adding an exciting layer of strategy and fun.",
          completed: false,
        },
        
        {
          title: "Full Map Enhancement",
          desc: "Upgrade the World of Dypians map with enhanced visuals, new terrains, and detailed environments, providing a richer and more immersive experience for players exploring the game world.",
          completed: false,
        },

        {
          title: "Addition of New Creatures and Animals",
          desc: "Expand the diversity of creatures and animals across the maps, introducing new species that will enhance exploration, interactions, and in-game encounters for players.",
          completed: false,
        },

        // {
        //   title: "Introduction of Character NFT Generation",
        //   desc: "Generate the main character in the game as an NFT item, adding value and uniqueness to the player's experience.",
        //   completed: false,
        // },
        // {
        //   title: "Adopt CAWS Functionality",
        //   desc: "Allow players to adopt a CAWS (cat) in-game, feed it, grow it, and use it within the game world.",
        //   completed: false,
        // },
        // {
        //   title: "NFT Customization",
        //   desc: "Enable players to customize their NFTs, such as weapons and equipment, by adding elements or items to them.",
        //   completed: false,
        // },

        // {
        //   title: "Addition of Trade P2P",
        //   desc: "Introduce peer-to-peer trading functionality in the game to allow players to exchange items and goods directly.",
        //   completed: false,
        // },
        // {
        //   title: "Addition of New AI Powered NPCs",
        //   desc: "Introduce new AI-powered NPCs to the game to provide additional challenges and interactions for players.",
        //   completed: false,
        // },
        // {
        //   title: "In-Game DeFi integration",
        //   desc: "Incorporating DeFi products and functionalities in an enjoyable and visual way into the platform.",
        //   completed: false,
        // },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience.",
          completed: false,
        },
      ],
    },
  ];

  const [roadmapItems, setRoadmapItems] = useState(roadmapItems2024);

  const mainUpdate = [
    {
      title: "Improving Tracking Rewards",
      date: "June 2024",
      image: trackingRewards,
    },
    {
      title: "New Game UI Development",
      date: "May 2024",
      image: uiDevelopment,
    },
    {
      title: "My Rank Introduction",
      date: "April 2024",
      image: myRank,
    },
    {
      title: "Addition of New Game Creatures",
      date: "March 2024",
      image: wodAnimalsBanner,
    },
    {
      title: "Daily Bonus Improvement",
      date: "March 2024",
      image: dailyBonusBanner,
    },
    {
      title: "Premium Subscriber Benefits Expansion",
      date: "March 2024",
      image: premiumBanner,
    },
    {
      title: "Enhanced Leaderboard",
      date: "March 2024",
      image: wodLeaderBoardBanner,
    },

    {
      title: "Multiplayer PVP/PVE",
      date: "Dec 2023",
      image: multiplayerBanner,
    },
    {
      title: "Addition and development of Parnerships",
      date: "Dec 2023",
      image: partnershipAddition,
    },
    {
      title: "Addition of Beta Pass NFTs",
      date: "Sept 2023",
      image: betaPassAddition,
    },
    {
      title: "Global Events",
      date: "Oct 2023",
      image: globalEvents,
    },
    {
      title: "Introduction of Beta Passes NFT collection",
      date: "Sept 2023",
      image: betaPassCollection,
    },
    {
      title: "Introduction of New Events",
      date: "Sept 2023",
      image: newEvents,
    },
    {
      title: "Introduction of marketplace",
      date: "Jun 2023",
      image: marketplaceIntroduction,
    },
    {
      title: "Caws NFT 3D Rendering",
      date: "May 2023",
      image: caws3d,
    },
    {
      title: "Introducing the CAWS Timepiece NFT collection",
      date: "Apr 2023",
      image: timepieceRoadmap,
    },
    {
      title: "Addition and development of partnerships",
      date: "Apr 2023",
      image: wodPartnership,
    },
    {
      title: "Multichain Integration",
      date: "Apr 2023",
      image: multichainIntegration,
    },
    {
      title: "Genesis Land Launch",
      date: "Feb 2023",
      image: landMinting,
    },
    {
      title: "Genesis Land Whitelist",
      date: "Feb 2023",
      image: whitelistBanner,
    },
    {
      title: "Leaderboard",
      date: "Feb 2023",
      image: leaderboardBanner,
    },
    {
      title: "Special in-game events",
      date: "Feb 2023",
      image: gameEvents,
    },
    {
      title: "CAWS Integration",
      date: "Jan 2023",
      image: cawsIntegration,
    },
    {
      title: "Beta Tester Access",
      date: "Dec 2022",
      image: betaTesting,
    },
    {
      title: "Demo Launch",
      date: "Dec 2022",
      image: demoLaunch,
    },
  ];
  const slider = useRef();

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  useEffect(() => {
    slider?.current?.innerSlider?.slickGoTo(0);
  }, []);

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 0,
    draggable: false, 
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          arrows: true
        },
      },
    ],
  };



  return (
    <div
      className="container-fluid d-flex px-0 align-items-center justify-content-center pt-5 roadmapbg"
      id="roadmap"
      style={{scrollMarginTop: "100px"}}

    >
      <div className="roadmap-main-wrapper px-0 w-100 d-flex align-items-center justify-content-center flex-column">
        <div className="row justify-content-center gap-3 align-items-center w-100 mx-0 px-3 px-lg-5">
          <h6 className="roadmap-title font-montserrat  text-uppercase d-flex flex-column gap-2 justify-content-center align-items-center flex-lg-row">
            Game{" "}
            <span
              className="roadmap-title font-montserrat text-uppercase"
              style={{ color: "#8c56ff" }}
            >
              Roadmap
            </span>
          </h6>
          <span className="roadmap-content">
            Discover our future plans and upcoming features for World of
            Dypians. From new quests and game modes to major updates and
            community events, stay informed on the exciting journey ahead.
          </span>
          <div className="d-flex align-items-center justify-content-center gap-3">
              <div
              className="linear-border-roadmap"
              style={{
                width: "fit-content",
              }}
            >
              <button
                className={`btn ${
                  title === "2024"
                    ? "filled-btn-roadmap"
                    : "outline-btn-roadmap"
                } px-5`}
                onClick={() => {
                  setRoadmapItems(roadmapItems2024);
                  setTitle("2024");
                }}
              >
                2024
              </button>
            </div>
             <div
              className="linear-border-roadmap"
              style={{
                width: "fit-content",
              }}
            >
              <button
                className={`btn ${
                  title === "2023"
                    ? "filled-btn-roadmap"
                    : "outline-btn-roadmap"
                } px-5`}
                onClick={() => {
                  setRoadmapItems(roadmapItems2023);
                  setTitle("2023");
                }}
              >
                2023
              </button>
            </div>
         
          </div>
        </div>
        <div className="row justify-content-center custom-container align-items-center w-100 mx-0 px-3 px-lg-5">
          {/* <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center justify-content-between mb-5 gap-3 position-relative">
         
            <div
              className="opacitywrapper4 m-0"
              onMouseEnter={() => {
                setTooltip(true);
              }}
              onMouseLeave={() => {
                setTooltip(false);
              }}
            >
              <a
                className="game-event-download text-white d-flex align-items-center gap-2"
                href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                target="_blank"
              >
                <img
                  src={epicwhite}
                  alt="icon"
                  style={{ width: 20, height: 24 }}
                />
                Download
              </a>
            </div>
            <div
              className={`tooltip-wrapper p-2 ${tooltip && "tooltip-active"}`}
              style={{ top: "-30px", right: 30 }}
            >
              <p className="tooltip-content m-0">Early Access Game</p>
            </div>
          </div> */}
          <div className="">
            {/* <div
              className="d-flex flex-column align-items-center position-relative roadmap-slider-wrapper gap-3"
              style={{ height: "fit-content" }}
            >
              <Slider ref={(c) => (slider.current = c)} {...settings}>
                <div className="d-flex flex-column gap-3">
                  
                  {mainUpdate.slice(0, 3).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(3, 6).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(6, 9).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(9, 12).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(12, 15).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(15, 18).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(18, 21).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(21, 24).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column gap-3">
                  {mainUpdate.slice(24, mainUpdate.length).map((item) => (
                    <div className="roadmap-main-update position-relative">
                      <img
                        src={item.image}
                        className="main-update-image"
                        alt=""
                      />
                      <div className="main-update-title-wrapper w-100">
                        <span className="font-organetto main-update-date">
                          {item.date}
                        </span>
                        <h6 className="main-update-title mb-0 font-organetto">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </Slider>
              <img
                src={nextArrow}
                alt=""
                className="prev-arrow"
                onClick={previous}
              />
              <img
                src={nextArrow}
                alt=""
                className="next-arrow"
                onClick={next}
              />
              <h6 className="live-now-title font-organetto mt-4">Out Now!</h6>
            </div> */}
<Slider ref={(c) => (slider.current = c)} {...settings}>
            {roadmapItems.map((item, index) => (
              <RoadmapCard
                quarter={item.quarter}
                key={index}
                content={item.content}
                index={index}
                image={item.image}
              />
            ))}</Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
