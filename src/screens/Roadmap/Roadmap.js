import React from "react";
import "./_roadmap.scss";
import roadmapDummy from "./assets/roadmapDummy.png";
import roadmapIndicator from "./assets/roadmapIndicator.svg";
import quarterOne from "./assets/quarterOne.svg";
import completed from "./assets/completed.svg";
import RoadmapCard from "../../components/RoadmapCard/RoadmapCard";

const Roadmap = () => {

  const roadmapItems = [

    {
      quarter: 'quarterOne',
      content : [
        {
          title: 'Multichain Integration', 
          desc: 'Incorporation of multiple chains providing users with optimal options and solutions',
          completed: true
        },
        {
          title: 'CAWS NFT 3D rendering', 
          desc: 'Users are able to create an in-game playable 3D version of owned CAWS NFT.',
        },
        {
          title: 'Special in-game events', 
          desc: 'Players will be invited to participate in exciting and unique events with rewards and prizes',
        },
        {
          title: 'Addition and development of partnerships', 
          desc: 'Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards and airdrops, and much more',
        }
      ]
    },
    {
      quarter: 'quarterTwo',
      content: [
        {
          title: 'Introduction of marketplace and purchasable in-game NFTs',
          desc: 'Users can access WoD marketplace to purchase assets used to customize and enhance their experience'
        },
        {
          title: 'Introduction of Mall and shopping centers',
          desc: 'User can acquire gear, tools, consumable items and skins'
        },
        {
          title: 'Rewarding quests',
          desc: 'Adventurers will complete quests to earn items and gain prestige'
        },
        {
          title: 'Tracking goals and achievements',
          desc: 'Players will receive special rewards and titles for accomplishing some of the game`s most difficult tasks'
        },
        {
          title: 'Introduction of tutorial guide v1',
          desc: 'In-depth tips and tricks to help players master World of Dypians'
        },
        {
          title: 'Addition and development of partnerships',
          desc: 'Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards and airdrops, and much more'
        },
      ]
    },
    {
      quarter: 'quarterThree',
      content: [
        {
          title: 'CAWS NFT transformation',
          desc: 'Enhance your companion`s size and abilities to assist in exploration and battle'
        },
        {
          title: 'ntroduction of in-game mounts',
          desc: 'Players can journey throughout the world by land, sea, and air'
        },
        {
          title: 'Addition and development of partnerships',
          desc: 'Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards and airdrops, and much more'
        },
      ]
    },
    {
      quarter: 'quarterFour',
      content: [
        {
          title: 'Multiplayer PVP',
          desc: 'Engage in 1v1 or huge battle events against other players'
        },
        {
          title: 'Co-op PVE',
          desc: 'Adventure together with allies to complete quests and objectives'
        },
        {
          title: 'In-game chat',
          desc: 'Uses can communicate via voice and chat texts in multiple channels'
        },
        {
          title: 'P2P trade',
          desc: 'Exchange and trade items directly with other users'
        },
        {
          title: 'Global environmental events',
          desc: 'Participate in huge global events with leaderboards and prizes'
        },
        {
          title: 'Introduction of tutorial guide v2',
          desc: 'In-depth tips and tricks to help players master World of Dypians'
        },
        {
          title: 'Weapons and armor customization',
          desc: 'Forge unique gear to enhance abilities and appearance'
        },
        {
          title: 'Addition and development of partnerships',
          desc: 'Continuous addition of features and partners including AI NPCs, advertising opportunities, user rewards and airdrops, and much more'
        },
      ]
    },
    {
      quarter: '2024',
      content: [
        {
          title: 'Introduction of build hub',
          desc: null
        },
        {
          title: 'Additional clan support',
          desc: null
        },
        {
          title: 'Updated and improved battle arenas',
          desc: null
        },
        {
          title: 'Tame wild animals increasing team size',
          desc: null
        },
      
      ]
    },
  ]
  
  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center pt-5">
      <div className="roadmap-main-wrapper px-0 w-100 d-flex flex-column">
        <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5">
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
            The largest and unique Super rare NFT marketplace For
            crypto-collectibles
          </span>
        </div>
        <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5">
          <div className="roadmap-grid px-0">
            <div className="d-flex flex-column gap-3">
              <div className="roadmap-main-update position-relative">
                <div className="main-update-title-wrapper w-100">
                  <h6 className="main-update-title font-organetto">
                    Demo launch
                  </h6>
                </div>
              </div>
              <div className="roadmap-main-update position-relative">
                <div className="main-update-title-wrapper w-100">
                  <h6 className="main-update-title font-organetto">
                    Beta tester access
                  </h6>
                </div>
              </div>
              <div className="roadmap-main-update position-relative">
                <div className="main-update-title-wrapper w-100">
                  <h6 className="main-update-title font-organetto">
                    Genesis Launch
                  </h6>
                </div>
              </div>
              <h6 className="live-now-title font-organetto mt-4">Live Now!</h6>
            </div>
            {roadmapItems.map((item, index) => (
            <RoadmapCard quarter={item.quarter} key={index} content={item.content} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
