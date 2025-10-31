import React, { useEffect, useRef, useState } from "react";
import "./_roadmap.scss";
import RoadmapCard from "../../components/RoadmapCard/RoadmapCard";
import Slider from "react-slick";

const Roadmap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Roadmap";
  }, []);

  const [title, setTitle] = useState("2025");
  // const [tooltip, setTooltip] = useState(false);

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
          title: "Prime Subscriber Benefits Expansion",
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
          desc: "The launch of a new NFT staking pool for CAWS NFT holders that is accessible only to Prime Subscribers.",
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
          title: "Website Revamped UI/UX",
          desc: "Unveil a redesigned website with a revamped UI/UX, offering users a more intuitive and visually engaging experience for seamless navigation and interaction within the World of Dypians ecosystem.",
          completed: true,
        },
        {
          title: "Addition of Game Currency",
          desc: "Introduce a new in-game currency to enhance the game's economy and provide more options for players.",
          completed: true,
        },
        {
          title: "Introduction of Scorpion King Event",
          desc: "Launch the Scorpion King event, a thrilling in-game challenge where players face off against the formidable Scorpion King, with the chance to earn exclusive rewards and valuable in-game items.",
          completed: true,
        },

        {
          title: "Maze Garden Challenge",
          desc: "Introduce the Maze Garden challenge, a weekly event within the BNB Chain area where players navigate through intricate mazes and compete for one-time rewards, adding an exciting layer of strategy and fun.",
          completed: true,
        },

        {
          title: "Full Map Enhancement",
          desc: "Upgrade the World of Dypians map with enhanced visuals, new terrains, and detailed environments, providing a richer and more immersive experience for players exploring the game world.",
          completed: true,
        },

        {
          title: "Addition of New Creatures and Animals",
          desc: "Expand the diversity of creatures and animals across the maps, introducing new species that will enhance exploration, interactions, and in-game encounters for players.",
          completed: true,
        },

        {
          title: "Governance Launch",
          desc: "Roll out the governance system, empowering all $WOD token holders to participate in decision-making processes, vote on key proposals, and shape the future of the ecosystem.",
          completed: true,
        },
        {
          title: "New Staking Pools Launch",
          desc: "Introduce new staking pools, providing players with enhanced earning opportunities and greater flexibility to participate in the game’s growing economy.",
          completed: true,
        },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience.",
          completed: true,
        },
      ],
    },
  ];

  const roadmapItems2025 = [
    {
      quarter: "quarterOne",
      image: "quarterOneImage",
      content: [
        {
          title: "Burn Program",
          desc: "Establish a token burn mechanism to balance the in-game economy and enhance the value of tokens over time.",
          completed: true,
        },
        {
          title: "Loyalty Program Improvements",
          desc: "Upgrade the loyalty program with new features, better rewards, and enhanced incentives for consistent player engagement.",
          completed: true,
        },
        {
          title: "New Game Listings",
          desc: "Expand game availability by listing it on additional stores, increasing accessibility for players worldwide.",
          completed: true,
        },
        {
          title: "New Exchange Listings",
          desc: "Expand availability and liquidity of the WOD token by listing it on new exchanges, enhancing global accessibility and user confidence.",
          completed: true,
        },
        {
          title: "Launch of Oryn AI Agent",
          desc: "Introduce the official in-game AI-powered agent, Oryn, designed to guide players, answer questions, explain game mechanics, and provide dynamic support throughout the gameplay experience.",
          completed: true,
        },
        {
          title: "Enhancing NFT Shop",
          desc: "Upgrade the in-game NFT shop with an expanded range of items to enhance the purchasing experience.",
          completed: true,
        },
        {
          title: "Multiplayer Social Hub(Close Beta)",
          desc: "Create a social hub where players can interact, form communities, and engage in multiplayer activities.",
          completed: true,
        },
        {
          title: "CAWS AI Mechanics Improvement",
          desc: "Enhance in-game AI to improve how CAWS NFTs behave and interact within the game world, making them more responsive, lifelike, and integrated into battles, exploration, and dynamic scenarios.",
          completed: true,
        },
        {
          title: "New Chain Expansion",
          desc: `Integrate additional blockchains into the game to broaden the reach and appeal.`,
          completed: true,
        },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterTwo",
      image: "quarterTwoImage",

      content: [
        {
          title: "New Wallet Expansion",
          desc: "Integrate more wallet options into the ecosystem, allowing users to connect using their preferred wallets for smoother onboarding, increased compatibility, and improved accessibility across networks.",
          completed: true,
        },
        {
          title: "Multiplayer Social Hub(Open Beta)",
          desc: "Create a social hub where players can interact, form communities, and engage in multiplayer activities.",
          completed: true,
        },
        {
          title: "Educational AI",
          desc: "Implement AI-powered tutorials to help players learn game mechanics, blockchain concepts, and strategies effectively.",
          completed: true,
        },
        {
          title: "AI Gameplay Improvements",
          desc: "Enhance AI mechanics to make NPCs smarter and more responsive, improving player interactions and dynamic gameplay.",
          completed: true,
        },
        {
          title: "New Chain Expansion",
          desc: `Integrate additional blockchains into the game to broaden the reach and appeal.`,
          completed: true,
        },
        {
          title: "Oryn AI Agent Enhancements",
          desc: `Expand Oryn's capabilities with advanced features, including personalized player guidance based on in-game behavior, real-time event updates, contextual tips during quests and battles, and multilingual support.`,
          completed: true,
        },
        {
          title: "Dynamic NPC Behavior",
          desc: "Enhance NPC crowds nteractions and behaviors to create a more immersive and lifelike environment, improving player engagement and overall realism.",
          completed: true,
        },
        {
          title: "Partnership Development",
          desc: "Continuously add new features and partners, such as AI NPCs, advertising opportunities, user rewards, airdrops, and more, to enhance the user experience",
          completed: true,
        },
      ],
    },
    {
      quarter: "quarterThree",
      image: "quarterThreeImage",

      content: [
        // {
        //   title: "Introduction of Character NFT Generation",
        //   desc: "Generate the main character in the game as an NFT item, adding value and uniqueness to the player's experience.",
        //   completed: false,
        // },

        // {
        //   title: "Loot Box Introduction",
        //   desc: "Introduce loot boxes as a new gameplay mechanic to reward players with random items.",
        //   completed: false,
        // },
        {
          title: "New Game UI Development",
          desc: "Develop a new user interface to improve navigation and accessibility within the game.",
          completed: true,
        },
        {
          title: "New Staking Pools",
          desc: "Introduce new staking pools to enable players to earn rewards by participating in the game’s ecosystem.",
          completed: true,
        },

        // {
        //   title: "Introduction of Game Quests",
        //   desc: "Add a variety of engaging partner quests to challenge players, offering rewards and enhancing gameplay depth.",
        //   completed: false,
        // },

        // {
        //   title: "Introduction of Character Customization",
        //   desc: "Allow players to personalize their main avatar/character with facial and body features.",
        //   completed: false,
        // },

        {
          title: "Daily Engagement System",
          desc: "Launch a new daily engagement product designed to keep players active and rewarded through innovative tasks and experiences.",
          completed: true,
        },
        {
          title: "New Chain Expansion",
          desc: "Integrate additional blockchains into the game to broaden the reach and appeal.",
          completed: true,
        },
        {
          title: "Expanded Wallet Support",
          desc: "Integration of new wallets to provide players with more options and seamless access when interacting within the ecosystem.",
          completed: true,
        },
        {
          title: "Question of the Day",
          desc: "Daily educational feature on the BNB Chain ecosystem, designed to inform and engage players with interactive learning.",
          completed: true,
        },
        {
          title: "Keep Building Program",
          desc: "An initiative to support every builder and creator on the BNB Chain, fostering growth and innovation across the ecosystem.",
          completed: true,
        },
        {
          title: "Royalty Chest",
          desc: "A special product offering unique opportunities and exposure for projects, rewarding collaboration and ecosystem participation.",
          completed: true,
        },
        {
          title: "Booster1001",
          desc: "A performance-enhancing system designed to reward and amplify player achievements, creating new layers of progression and excitement.",
          completed: true,
        },
        {
          title: "Binance Pay Integration",
          desc: "Seamless integration enabling in-game purchases and product access directly through Binance Pay.",
          completed: true,
        },
        {
          title: "Expanding WOD Markets",
          desc: "Strategic expansion of existing markets through new exchange listings and ecosystem growth, increasing liquidity and accessibility for WOD.",
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
      quarter: "quarterFour",
      image: "quarterFourImage",

      content: [
        // {
        //   title: "Full Release of the Multiplayer PvP",
        //   desc: "Launch the full version of the multiplayer player-versus-player mode for competitive gameplay.",
        //   completed: false,
        // },
        {
          title: "WOD Strategic Reserve",
          desc: "Creation of a transparent on-chain reserve that supports continuous WOD buybacks and reinforces the ecosystem's long-term value.",
          completed: true,
        },
        {
          title: "Adopt CAWS Functionality",
          desc: "Allow players to adopt a CAWS (cat) in-game, feed it, grow it, and use it within the game world.",
          completed: false,
        },
        {
          title: "NFT Customization",
          desc: "Enable players to customize their NFTs, such as weapons and equipment, by adding elements or items to them.",
          completed: false,
        },
        {
          title: "Full Release of the Multiplayer PvE",
          desc: "Launch the full version of the multiplayer player-versus-environment mode for all players to enjoy.",
          completed: false,
        },
        {
          title: "Addition of Trade P2P",
          desc: "Introduce peer-to-peer trading functionality in the game to allow players to exchange items and goods directly.",
          completed: false,
        },
        {
          title: "Addition of New AI Powered NPCs",
          desc: "Introduce new AI-powered NPCs to the game to provide additional challenges and interactions for players.",
          completed: false,
        },
        // {
        //   title: "New Land NFTs Batch",
        //   desc: "Release a fresh batch of exclusive Land NFTs, offering players new opportunities to own, customize, and expand their in-game territories, fostering creativity and strategic gameplay.",
        //   completed: false,
        // },
        {
          title: "Intelligent Economy Integration",
          desc: "Combine AI-powered features with DeFi mechanics to create an adaptive and engaging in-game economy.",
          completed: false,
        },
        {
          title: "Launch of Crypto Museum",
          desc: "Introduce a museum within the game where players can explore and learn about cryptocurrencies.",
          completed: false,
        },
        {
          title: "Open Beta Launch",
          desc: "Introduce an open beta program, giving players early access to upcoming features and the opportunity to provide feedback, helping refine the experience before the full release.",
          completed: false,
        },
        {
          title: "Introduction of the Mall Center",
          desc: "Introduce a mall center in the game where players can shop for various items and goods.",
          completed: false,
        },
        {
          title: "In-Game DeFi Integration",
          desc: "Introduce seamless DeFi mechanics within the game, allowing players to earn directly in the virtual economy.",
          completed: false,
        },
        {
          title: "Introduction of Shop v1",
          desc: "Launch the first version of the in-game shop where players can buy items, loot, weapons, and equipment.",
          completed: false,
        },
        // {
        //   title: "Introduction of Shop v2",
        //   desc: "Improve and expand the in-game shop with new features and offerings.",
        //   completed: false,
        // },
        // {
        //   title: "Launchpool Launch",
        //   desc: "Create a Launchpool system where players can contribute resources to community-driven projects and unlock exclusive benefits.",
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

  const [roadmapItems, setRoadmapItems] = useState(roadmapItems2025);

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
          arrows: true,
        },
      },
    ],
  };

  return (
    <div
      className="container-fluid d-flex px-0 align-items-center justify-content-center pt-5 roadmapbg"
      id="roadmap"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="roadmap-main-wrapper px-0 w-100 d-flex align-items-center justify-content-center flex-column">
        <div className="row justify-content-center gap-3 align-items-center w-100 mx-0 px-3 px-lg-5">
          <h6 className="explorer-grid-title  d-flex flex-column gap-2 justify-content-center align-items-center flex-lg-row">
            Game Roadmap
          </h6>
          <span className="roadmap-content">
            Discover our future plans and upcoming features for World of
            Dypians. From new quests and game modes to major updates and
            community events, stay informed on the exciting journey ahead.
          </span>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <button
              className={`btn ${
                title === "2025" ? "getpremium-active-btn" : "getpremium-btn"
              } px-5`}
              onClick={() => {
                setRoadmapItems(roadmapItems2025);
                setTitle("2025");
              }}
            >
              2025
            </button>

            <button
              className={`btn ${
                title === "2024" ? "getpremium-active-btn" : "getpremium-btn"
              } px-5`}
              onClick={() => {
                setRoadmapItems(roadmapItems2024);
                setTitle("2024");
              }}
            >
              2024
            </button>

            <button
              className={`btn ${
                title === "2023" ? "getpremium-active-btn" : "getpremium-btn"
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
            <Slider ref={(c) => (slider.current = c)} {...settings}>
              {roadmapItems.map((item, index) => (
                <RoadmapCard
                  quarter={item.quarter}
                  key={index}
                  content={item.content}
                  index={index}
                  image={item.image}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
