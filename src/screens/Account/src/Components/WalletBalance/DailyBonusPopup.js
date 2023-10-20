import React from "react";
import closeX from "./assets/closeX.svg";
import pointsLogo from "./assets/pointslogo.png";
import rewardsLogo from "./assets/rewardslogo.png";
import { useState } from "react";
import ChestItem from "./ChestItem";
import { useEffect } from "react";

const DailyBonusPopup = ({ onclose }) => {


  const [regularChests, setRegularChests] = useState([]);
  const [premiumChests, setPremiumChests] = useState([]);
  const [rewardTypes, setRewardTypes] = useState("standard");


  const dummyChests = [
    {
      open: false,
      chestTitle: "Jewel Coffer",
      closedImg: "jewelCoffer",
      chestId: 1,
    },
    {
      open: false,
      chestTitle: "Gold Hoard",
      closedImg: "goldHoard",
      chestId: 2,
    },
    {
      open: false,
      chestTitle: "Pirate's Bounty",
      closedImg: "piratesBounty",
      chestId: 3,
    },
    {
      open: false,
      chestTitle: "Gem Trove",
      closedImg: "gemTrove",
      chestId: 4,
    },
    {
      open: false,
      chestTitle: "Coin Chest",
      closedImg: "coinChest",
      chestId: 5,
    },
    {
      open: false,
      chestTitle: "Silver Cache",
      closedImg: "silverCache",
      chestId: 6,
    },
    {
      open: false,
      chestTitle: "Ruby Stash",
      closedImg: "rubyStash",
      chestId: 7,
    },
    {
      open: false,
      chestTitle: "Mystic Reliquary",
      closedImg: "mysticReliquary",
      chestId: 8,
    },
    {
      open: false,
      chestTitle: "Ancient Relics",
      closedImg: "ancientRelics",
      chestId: 9,
    },
    {
      open: false,
      chestTitle: "Emerald Trove",
      closedImg: "emeraldTrove",
      chestId: 10,
    },
    {
      open: false,
      chestTitle: "Crystal Casket",
      closedImg: "crystalCasket",
      chestId: 11,
    },
    {
      open: false,
      chestTitle: "Pirate Booty",
      closedImg: "pirateBooty",
      chestId: 12,
    },
    {
      open: false,
      chestTitle: "Enchanted Trunk",
      closedImg: "enchantedTrunk",
      chestId: 13,
    },
    {
      open: false,
      chestTitle: "Lost Treasures",
      closedImg: "lostTreasures",
      chestId: 14,
    },
    {
      open: false,
      chestTitle: "Buccaneer's Fortune",
      closedImg: "buccaneersFortune",
      chestId: 15,
    },
    {
      open: false,
      chestTitle: "Mysterious Chest",
      closedImg: "mysteriousChest",
      chestId: 16,
    },
    {
      open: false,
      chestTitle: "Royal Riches",
      closedImg: "royalRiches",
      chestId: 17,
    },
    {
      open: false,
      chestTitle: "Sea Pearl",
      closedImg: "seaPearl",
      chestId: 18,
    },
    {
      open: false,
      chestTitle: "Magic Box",
      closedImg: "magicBox",
      chestId: 19,
    },
    {
      open: false,
      chestTitle: "Hidden Jewels",
      closedImg: "hiddenJewels",
      chestId: 20,
    },
    {
      open: false,
      chestTitle: "Timeless Trove",
      closedImg: "timelessTrove",
      chestId: 21,
    },
    {
      open: false,
      chestTitle: "Gilded Relics",
      closedImg: "gildedRelics",
      chestId: 22,
    },
    {
      open: false,
      chestTitle: "Mystic Covert",
      closedImg: "mysticCovert",
      chestId: 23,
    },
    {
      open: false,
      chestTitle: "Sapphire Lockbox",
      closedImg: "sapphireLockbox",
      chestId: 24,
    },
    {
      open: false,
      chestTitle: "Black Pearl",
      closedImg: "blackPearl",
      chestId: 25,
    },
    {
      open: false,
      chestTitle: "Dragon's Loot",
      closedImg: "dragonsLoot",
      chestId: 26,
    },
    {
      open: false,
      chestTitle: "Pirate Plunder",
      closedImg: "piratePlunder",
      chestId: 27,
    },
    {
      open: false,
      chestTitle: "Secret Vault",
      closedImg: "secretVault",
      chestId: 28,
    },
    {
      open: false,
      chestTitle: "Sunken Treasures",
      closedImg: "sunkenTreasures",
      chestId: 29,
    },
    {
      open: false,
      chestTitle: "Whispering Chest",
      closedImg: "whisperingChest",
      chestId: 30,
    },
    {
      open: false,
      chestTitle: "Ancient Artifacts",
      closedImg: "ancientArtifacts",
      chestId: 31,
    },
    {
      open: false,
      chestTitle: "Dreamer's Chest",
      closedImg: "dreamersChest",
      chestId: 32,
    },
    {
      open: false,
      chestTitle: "Starlight Coffer",
      closedImg: "starlightCoffer",
      chestId: 33,
    },
    {
      open: false,
      chestTitle: "Golden Trove",
      closedImg: "goldenTrove",
      chestId: 34,
    },
    {
      open: false,
      chestTitle: "Nebula Trunk",
      closedImg: "nebulaTrunk",
      chestId: 35,
    },
    {
      open: false,
      chestTitle: "Ghostly Chest",
      closedImg: "ghostlyChest",
      chestId: 36,
    },
    {
      open: false,
      chestTitle: "Sacred Relic",
      closedImg: "sacredRelic",
      chestId: 37,
    },
    {
      open: false,
      chestTitle: "Ocean's Bounty",
      closedImg: "oceansBounty",
      chestId: 38,
    },
    {
      open: false,
      chestTitle: "Eternal Treasure",
      closedImg: "eternalTreasure",
      chestId: 39,
    },
    {
      open: false,
      chestTitle: "Bloodmoon Chest",
      closedImg: "bloodmoonChest",
      chestId: 40,
    },
  ];


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    setRegularChests(array.slice(0,10))
    setPremiumChests(array.slice(10, 20))
    console.log(array.slice(0,10), array.slice(10,20));
    return array;
  }


  useEffect(() => {
   shuffle(dummyChests)
  }, [])
  


  return (
    <>
      <div className="package-popup2 dragon-popup p-4">
        <img
          src={closeX}
          alt=""
          className="closex position-absolute"
          onClick={onclose}
        />
        <div className="position-relative h-100 rewardinnerwrapper">
          <div className="positon-relative h-100 d-flex flex-column gap-3 justify-content-between">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
              <p className="chest-event-desc mb-0">
                Claim 10 chests daily for a chance to win Game Points, exclusive
                NFTs, and exciting rewards! Don't miss out on your daily dose of
                gaming treasures.
              </p>
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div
                  className={`reward-types ${
                    rewardTypes === "standard" ? "reward-types-active" : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => setRewardTypes("standard")}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Standard
                  </h6>
                </div>
                <div
                  className={`reward-types ${
                    rewardTypes === "premium" ? "reward-types-active" : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => setRewardTypes("premium")}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Premium
                  </h6>
                </div>
              </div>
              <div className="dailyreward-separator"></div>
            </div>
                {rewardTypes === "standard" ?
                <div className="rewardsgrid">
                {regularChests.map((item, index) => (
                  <ChestItem
                    chestId={item.chestId}
                    chestIndex={index + 1}
                    chestTitle={item.chestTitle}
                    open={item.open}
                    closedImg={item.closedImg}
                    rewardTypes={rewardTypes}
                  />
                ))}
              </div>
              : 
              <div className="rewardsgrid">
              {premiumChests.map((item, index) => (
                <ChestItem
                  chestId={index + 1}
                  chestTitle={item.chestTitle}
                  open={item.open}
                  closedImg={item.closedImg}
                  rewardTypes={rewardTypes}
                />
              ))}
            </div>  
              }
            {/* <div className="d-flex w-100 justify-content-center">
              <button className="btn claim-chest-btn d-flex align-items-center justify-content-center">
                <span className="mb-0">Claim</span>
              </button>
            </div> */}
            <div className="dailyreward-separator"></div>
            <div className="d-flex flex-column gap-2">
              <span className="font-organetto chestprizetitle text-white">
                CHEST PRIZES
              </span>
              <div className="d-flex flex-column flex-lg-row flex-md-row  align-items-center gap-2 justify-content-center justify-content-lg-between justify-content-md-between">
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={pointsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">10,000 points</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={rewardsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">$2.5 Rewards</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={rewardsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">1 Genesis land Nft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyBonusPopup;
