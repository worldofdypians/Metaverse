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
import landMinting from "./assets/landMinting.png";
import nextArrow from "./assets/nextArrow.svg";
import Slider from "react-slick";
import timepieceRoadmap from "./assets/timepieceRoadmap.webp";
import wodPartnership from "./assets/wodPartnership.webp";
import multichainIntegration from "./assets/multichainIntegration.webp";
import caws3d from './assets/caws3d.webp'
import betaPassCollection from './assets/betaPassCollection.png';
import marketplaceIntroduction from './assets/marketplaceIntroduction.png';
import newEvents from './assets/newEvents.png';
import betaPassAddition from './assets/betaPassAddition.png';
import globalEvents from './assets/globalEvents.png';
import partnershipAddition from './assets/partnershipAddition.png';

const Roadmap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Roadmap";
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: false,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  const roadmapItems = [
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
          desc: "Users can access WoD marketplace to purchase assets used to customize and enhance their experience.",
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
          title: "Addition and development of partnerships",
          desc: "Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards, airdrops and much more",
          completed: true,
        },
        {
          title: "Multiplayer PVE",
          desc: "Adventure with other players to complete quests, fight bosses, survive against waves of enemies, earn rewards and much more.",
        },
        {
          title: "Multiplayer PVP",
          desc: "Engage in huge battle events against other players in real-time. Players can compete and interact against each other in 1v1 or group battle to complete objectives.",
        },
        {
          title: "In-game chat",
          desc: "Users can communicate via voice and chat texts in multiple channels.",
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

  const mainUpdate = [
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
    slider.current.innerSlider.slickGoTo(0);
  }, [])
  

  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center pt-5 roadmapbg">
      <div className="roadmap-main-wrapper px-0 w-100 d-flex flex-column">
        <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5 mt-5 mt-lg-0">
          <h6 className="roadmap-title font-organetto d-flex flex-column gap-2 justify-content-center align-items-center flex-lg-row">
            Roadmap{" "}
            <span
              className="roadmap-title font-organetto"
              style={{ color: "#8c56ff" }}
            >
              2023
            </span>
          </h6>
          <span className="roadmap-content">
            Dypius is developing an extremely ambitious and complex game. The
            World of Dypians contains a massive 2,000 sq km explorable
            environment, integration of advanced artificial intelligence, a
            unique land ownership and real estate market, high graphic gameplay
            and is built to support multiple blockchains.
          </span>
        </div>
        <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5">
          <div className="roadmap-grid px-3 px-lg-0">
            <div
              className="d-flex flex-column align-items-center position-relative roadmap-slider-wrapper gap-3"
              style={{ height: "fit-content" }}
            >
              <Slider ref={(c) => (slider.current = c)} {...settings}>
                <div className="d-flex flex-column gap-3">
                  {/* <div
                    className="roadmap-main-update position-relative"
                    style={{ visibility: "hidden" }}
                  >
                    <img src="" className="main-update-image" alt="" />
                    <div className="main-update-title-wrapper w-100">
                      <span className="font-organetto main-update-date">
                        ..
                      </span>
                      <h6 className="main-update-title mb-0 font-organetto">
                        ..
                      </h6>
                    </div>
                  </div>
                  <div
                    className="roadmap-main-update position-relative"
                    style={{ visibility: "hidden" }}
                  >
                    <img src="" className="main-update-image" alt="" />
                    <div className="main-update-title-wrapper w-100">
                      <span className="font-organetto main-update-date">
                        ..
                      </span>
                      <h6 className="main-update-title mb-0 font-organetto">
                        ..
                      </h6>
                    </div>
                  </div> */}
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
                  {mainUpdate.slice(12,15).map((item) => (
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
                  {mainUpdate.slice(15, mainUpdate.length).map((item) => (
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
            </div>

            {roadmapItems.map((item, index) => (
              <RoadmapCard
                quarter={item.quarter}
                key={index}
                content={item.content}
                index={index}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
