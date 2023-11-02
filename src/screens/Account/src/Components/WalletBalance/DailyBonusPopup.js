import React from "react";
import closeX from "./assets/closeX.svg";
import pointsLogo from "./assets/pointslogo.png";
import rewardsLogo from "./assets/rewardslogo.png";
import { useState } from "react";
import ChestItem from "./ChestItem";
import { useEffect } from "react";
import pointsIcon from "./newAssets/pointsIcon.png";
import largeRewardsIcon from "./newAssets/largeRewardsIcon.png";
import rewardsIcon from "./newAssets/rewardsIcon.png";
import genesisIcon from "./newAssets/genesisIcon.png";
import cawsIcon from "./newAssets/cawsIcon.png";
import betaPassIcon from "./newAssets/betaPassIcon.png";
import xMark from "./newAssets/xMark.svg";
import OutsideClickHandler from "react-outside-click-handler";
import warning from "./newAssets/warning.svg";
import ToolTip from "../../../../Caws/elements/ToolTip";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import triangle from "../ProfileCard/assets/triangle.svg";

const DailyBonusPopup = ({
  onclose,
  isPremium,
  address,
  claimedChests,
  onChestClaimed,
  claimedPremiumChests,
  standardChests,
  premiumChests,
  email,
  openedChests,
  chainId,
  coinbase,
}) => {
  const [rewardTypes, setRewardTypes] = useState("standard");
  const [rewardPopup, setRewardPopup] = useState(false);
  const [randomArray, setRandomArray] = useState([]);
  const [disableBtn, setdisableBtn] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [liverewardData, setLiveRewardData] = useState([]);
  const [isActive, setIsActive] = useState();
  const [dummyregularChests, setDummyRegularChests] = useState([]);
  const [dummypremiumChests, setDummyPremiumChests] = useState([]);
  const [names, setNames] = useState([]);

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

  const dummyPremiums = [
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "greenCrystal",
      chestId: 1,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "blueCrystal",
      chestId: 2,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "yellowCrystal",
      chestId: 3,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "purpleCrystal",
      chestId: 4,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "cyanCrystal",
      chestId: 5,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "greenCrystal",
      chestId: 6,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "blueCrystal",
      chestId: 7,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "yellowCrystal",
      chestId: 8,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "purpleCrystal",
      chestId: 9,
    },
    {
      open: false,
      chestTitle: "Crystal Chest",
      closedImg: "cyanCrystal",
      chestId: 10,
    },
  ];

  const dummyRewards = [
    {
      title: "10,000 Points",
      image: pointsIcon,
      premium: false,
      won: false,
    },
    {
      title: "$5 Reward",
      image: rewardsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Genesis Land NFT",
      image: genesisIcon,
      premium: false,
      won: false,
    },
    {
      title: "CAWS NFT",
      image: cawsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Beta Pass NFT",
      image: betaPassIcon,
      premium: false,
      won: false,
    },
    {
      title: "$100 Reward",
      image: largeRewardsIcon,
      premium: true,
      won: false,
    },
  ];

  const chanceRewards = [
    {
      title: "Points",
      image: pointsIcon,
      premium: false,
      won: false,
    },
    {
      title: "$ Rewards",
      image: rewardsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Genesis Land NFT",
      image: genesisIcon,
      premium: false,
      won: false,
    },
    {
      title: "CAWS NFT",
      image: cawsIcon,
      premium: false,
      won: false,
    },
    {
      title: "Beta Pass NFT",
      image: betaPassIcon,
      premium: false,
      won: false,
    },
    {
      title: "Large $ Rewards",
      image: largeRewardsIcon,
      premium: false,
      won: false,
    },
  ];

  const cryptoNames = [
    "FOMO",
    "HODL",
    "FUD",
    "SHILL",
    "WHALE",
    "MOON",
    "DYOR",
    "ATH",
    "PUMP",
    "SAFU",
  ];

  const showSingleRewardData = (chestID) => {
    const filteredResult = openedChests.find((el) => el.chestId === chestID);
    setIsActive(chestID);
    if (filteredResult) {
      setLiveRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  function randomNum() {
    var arr = [];
    let a = Math.floor(Math.random() * 6) + 1;
    while (arr.length < a) {
      var r = Math.floor(Math.random() * 6);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    setRandomArray(arr);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function randomNum() {
    var arr = [];
    let a = Math.floor(Math.random() * 6) + 1;
    while (arr.length < a) {
      var r = Math.floor(Math.random() * 6);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    setRandomArray(arr);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const shufflePremiums = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    // setRegularChests(array.slice(0,10))

    let dummyItem = array.slice(0, 1)[0];
    let tempArray = [];

    for (let i = 0; i < 10; i++) {
      tempArray.push(dummyItem);
    }

    setDummyPremiumChests(tempArray);
    return array;
  };

  useEffect(() => {
    setDummyRegularChests(shuffle(dummyChests).slice(0, 10));
    setNames(shuffle(cryptoNames));
    shufflePremiums(dummyPremiums);
  }, []);

  useEffect(() => {
    setNames(shuffle(cryptoNames));
  }, []);

  useEffect(() => {
    if (rewardTypes === "standard") {
      if (
        standardChests &&
        standardChests.length > 0 &&
        openedChests &&
        openedChests.length > 0
      ) {
        if (standardChests[0].isOpened === true) {
          setLiveRewardData(standardChests[0]);
          setIsActive(standardChests[0].chestId);
        }
      } else setLiveRewardData([]);
    } else if (rewardTypes === "premium") {
      if (
        premiumChests &&
        premiumChests.length > 0 &&
        isPremium &&
        openedChests &&
        openedChests.length > 0
      ) {
        if (premiumChests[0].isOpened === true) {
          setLiveRewardData(premiumChests[0]);
          setIsActive(premiumChests[0].chestId);
        }
      } else setLiveRewardData([]);
    }
  }, [rewardTypes]);

  return (
    <>
      <div
        className={`package-popup2 dragon-popup p-4 ${
          rewardPopup && "hidescroll"
        }`}
      >
        <img
          src={closeX}
          alt=""
          className="closex position-absolute"
          onClick={onclose}
        />
        <div className="position-relative h-100 rewardinnerwrapper">
          <div className="positon-relative h-100 d-flex flex-column justify-content-start ">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 mb-3">
              <p className="chest-event-desc mb-0">
                Claim 10 chests daily for a chance to win Game Points, exclusive
                NFTs, and exciting rewards! Don't miss out on your daily dose of
                gaming treasures.
              </p>
            </div>
            <div className="d-flex flex-column mb-3">
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
                    rewardTypes === "premium"
                      ? "reward-types-active-premium"
                      : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => setRewardTypes("premium")}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Premium
                  </h6>
                </div>
              </div>
              <div className="dailyreward-separator"></div>
              <div className="d-flex w-100 justify-content-center">
                <div
                  className={` ${
                    (chainId === 204 || chainId === 56) &&
                    coinbase &&
                    email &&
                    address &&
                    coinbase?.toLowerCase() === address?.toLowerCase()
                      ? "d-none"
                      : "d-flex"
                  } p-2 mt-2 daily-error-text-wrapper justify-content-center`}
                >
                  {chainId !== 204 && chainId !== 56 && coinbase ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      The event is available on BNB and on opBNB chains. <br />
                      Please change the chain in your wallet to unlock the
                      chests.
                    </span>
                  ) : !coinbase ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      Please connect your wallet in order to claim your rewards.
                    </span>
                  ) : coinbase && !email ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      Please connect to your game account in order to claim your
                      rewards.
                    </span>
                  ) : coinbase &&
                    address &&
                    coinbase?.toLowerCase() !== address?.toLowerCase() ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      Please make sure you're using the wallet associated to
                      your game account.
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {rewardTypes === "standard" && email ? (
              <div className="rewardsgrid">
                {standardChests.map((item, index) => (
                  <ChestItem
                    chestId={item.chestId}
                    chestIndex={index + 1}
                    chestTitle={names[index]}
                    open={item.isOpened}
                    closedImg={item.chestId}
                    rewardTypes={rewardTypes}
                    isPremium={isPremium}
                    address={address}
                    onLoadingChest={(value) => {
                      setdisableBtn(value);
                    }}
                    disableBtn={disableBtn}
                    email={email}
                    onClaimRewards={(value) => {
                      setRewardData(value);
                      setLiveRewardData(value);
                      setRewardPopup(true);
                      onChestClaimed();
                      setIsActive(item.chestId);
                    }}
                    handleShowRewards={(value) => {
                      showSingleRewardData(value);
                      setIsActive(value);
                    }}
                    chainId={chainId}
                    coinbase={coinbase}
                    isActive={isActive}
                  />
                ))}
              </div>
            ) : rewardTypes === "premium" && email ? (
              <div className="rewardsgrid">
                {premiumChests.map((item, index) => (
                  <ChestItem
                    chestId={item.chestId}
                    chestIndex={index + 1}
                    chestTitle={dummyPremiums[index].chestTitle}
                    open={item.isOpened}
                    closedImg={dummyPremiums[index].closedImg}
                    rewardTypes={rewardTypes}
                    isPremium={isPremium}
                    address={address}
                    onLoadingChest={(value) => {
                      setdisableBtn(value);
                    }}
                    disableBtn={disableBtn}
                    email={email}
                    onClaimRewards={(value) => {
                      setRewardData(value);
                      setLiveRewardData(value);
                      setRewardPopup(true);
                      onChestClaimed();
                      setIsActive(item.chestId);
                    }}
                    handleShowRewards={(value) => {
                      showSingleRewardData(value);
                      setIsActive(value);
                    }}
                    isActive={isActive}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                ))}
              </div>
            ) : rewardTypes === "standard" && !email ? (
              <div className="rewardsgrid">
                {dummyregularChests.map((item, index) => (
                  <ChestItem
                    chestId={item.chestId}
                    chestIndex={index + 1}
                    chestTitle={names[index]}
                    open={item.open}
                    closedImg={index}
                    rewardTypes={rewardTypes}
                    onOpenChest={() => {
                      console.log("open");
                    }}
                    isPremium={isPremium}
                    address={address}
                  />
                ))}
              </div>
            ) : (
              <div className="rewardsgrid">
                {dummypremiumChests.map((item, index) => (
                  <ChestItem
                    chestId={item.chestId}
                    chestIndex={index + 1}
                    chestTitle={item.chestTitle}
                    open={item.open}
                    closedImg={item.closedImg}
                    rewardTypes={rewardTypes}
                    onOpenChest={() => {
                      console.log("open");
                    }}
                    isPremium={isPremium}
                    address={address}
                  />
                ))}
              </div>
            )}
            {/* <div className="d-flex w-100 justify-content-center">
              <button className="btn claim-chest-btn d-flex align-items-center justify-content-center">
                <span className="mb-0">Claim</span>
              </button>
            </div> */}
            <div className="dailyreward-separator mb-3"></div>
            {claimedChests > 0 ? (
              <div className="d-flex flex-column gap-2 ">
                <span className="font-organetto chestprizetitle text-white">
                  PRIZES
                </span>
                <div className="container px-3">
                  <div className="row" style={{ rowGap: "10px" }}>
                    {/* <div className="prizeswrapper  col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={pointsIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        10,000 points
                      </span>
                    </div>
                  </div>
                  <div className="prizeswrapper col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={rewardsIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        $2.5 Rewards
                      </span>
                    </div>
                  </div>
                  <div className="prizeswrapper col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={genesisIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        Genesis Land NFT
                      </span>
                    </div>
                  </div>
                  <div className="prizeswrapper col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={cawsIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        CAWS NFT
                      </span>
                    </div>
                  </div>
                  <div className="prizeswrapper  col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={betaPassIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        1 Beta Pass NFT
                      </span>
                    </div>
                  </div>
                  <div className="prizeswrapper col-12 col-lg-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={largeRewardsIcon}
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <span className="text-white chest-prize-title">
                        $1,000 Rewards
                      </span>
                    </div>
                  </div> */}
                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("Points") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes("Points") &&
                            "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={pointsIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "Points"
                                  ) && "gray",
                              }}
                            >
                              {getFormattedNumber(
                                liverewardData?.reward ?? 0,
                                0
                              )}{" "}
                              Points
                            </span>
                            {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )}  todo */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("Money") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes("Money") &&
                            "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={rewardsIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "Money"
                                  ) && "gray",
                              }}
                            >
                              ${" "}
                              {
                                (liverewardData?.rewardType?.includes(
                                  "Money"
                                ) && getFormattedNumber(liverewardData?.reward),
                                0)
                              }{" "}
                              Reward
                            </span>
                            {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} todo */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes("NFT") &&
                            "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={genesisIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "NFT"
                                  ) && "gray",
                              }}
                            >
                              Genesis Land NFT
                            </span>
                            {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes("NFT") &&
                            "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={cawsIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "NFT"
                                  ) && "gray",
                              }}
                            >
                              CAWS NFT
                            </span>
                            {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes("NFT") &&
                            "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={betaPassIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "NFT"
                                  ) && "gray",
                              }}
                            >
                              Beta Pass NFT
                            </span>
                            {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("LargeMoney") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !liverewardData?.rewardType?.includes(
                              "LargeMoney"
                            ) && "grayscale(1)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={largeRewardsIcon}
                            alt=""
                            style={{ width: 40, height: 40 }}
                          />
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="chest-prize-title mb-0"
                              style={{
                                color:
                                  !liverewardData?.rewardType?.includes(
                                    "LargeMoney"
                                  ) && "gray",
                              }}
                            >
                              $0 Reward
                            </span>
                            {/* {rewardData?.type?.includes('LargeMoney')  && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2 ">
                <span className="font-organetto chestprizetitle text-white">
                  Open for a chance to win
                </span>
                <div className="container px-3">
                  <div className="row" style={{ rowGap: "10px" }}>
                    {chanceRewards.map((reward, index) => (
                      <div className="col-12 col-lg-4">
                        <div
                          className={`prizeswrapper ${
                            randomArray.includes(index) &&
                            "prizeswrapper-premium"
                          } `}
                          style={{
                            filter: "grayscale(1)",
                          }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={reward.image}
                              alt=""
                              style={{ width: 40, height: 40 }}
                            />
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="chest-prize-title mb-0"
                                style={{
                                  color: "gray",
                                }}
                              >
                                {reward.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {rewardPopup && (
        <OutsideClickHandler onOutsideClick={() => setRewardPopup(false)}>
          <div
            className="popup-wrapper popup-active p-4"
            style={{ width: "40%" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-5">
              <div></div>
              <h6 className="reward-prize-title mb-0">You won</h6>
              <img
                src={xMark}
                style={{ cursor: "pointer" }}
                onClick={() => setRewardPopup(false)}
                alt=""
              />
            </div>
            {/* <div className="d-flex flex-column align-items-center gap-3 mb-5">
        {randomReward.map((reward) => (
          <>
           <div className="d-flex align-items-center justify-content-center gap-3">
           <img src={reward.image} alt="" />
           <span className="random-reward mb-0" style={{color: reward.premium === true && "#ED8225"}}>{reward.title}</span>
         </div>
         {reward.premium === true && 
         <span className="reward-error" style={{color: "#ED8225", fontSize: "9px"}}>You must have a premium account to claim this prize</span>
         }
          </>
        ))}
       </div> */}
            <div className="container px-3">
              <div className="row mb-5" style={{ rowGap: "12px" }}>
                {rewardData?.rewardType?.includes("Points") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("Points") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("Points") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={pointsIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes("Points") &&
                                "gray",
                            }}
                          >
                            {getFormattedNumber(rewardData?.reward, 0)} Points
                          </span>
                          {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )}  todo */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {rewardData?.rewardType?.includes("Money") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("Money") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("Money") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={rewardsIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes("Money") &&
                                "gray",
                            }}
                          >
                            ${" "}
                            {
                              (rewardData?.type?.includes("Money") &&
                                getFormattedNumber(rewardData?.reward),
                              0)
                            }{" "}
                            Reward
                          </span>
                          {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} todo */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {rewardData?.rewardType?.includes("NFT") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("NFT") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("NFT") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={genesisIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes("NFT") &&
                                "gray",
                            }}
                          >
                            Genesis Land NFT
                          </span>
                          {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {rewardData?.rewardType?.includes("NFT") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("NFT") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("NFT") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={cawsIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes("NFT") &&
                                "gray",
                            }}
                          >
                            CAWS NFT
                          </span>
                          {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {rewardData?.rewardType?.includes("NFT") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("NFT") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("NFT") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={betaPassIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes("NFT") &&
                                "gray",
                            }}
                          >
                            Beta Pass NFT
                          </span>
                          {/* {randomArray.includes(index) && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {rewardData?.rewardType?.includes("LargeMoney") && (
                  <div className="col-12 col-lg-4">
                    <div
                      className={`prizeswrapper ${
                        rewardData?.rewardType?.includes("LargeMoney") &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("LargeMoney") &&
                          "grayscale(1)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={largeRewardsIcon}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="chest-prize-title mb-0"
                            style={{
                              color:
                                !rewardData?.rewardType?.includes(
                                  "LargeMoney"
                                ) && "gray",
                            }}
                          >
                            $0 Reward
                          </span>
                          {/* {rewardData?.type?.includes('LargeMoney')  && reward.premium && (
                            <ToolTip
                              title={
                                <React.Fragment>
                                  <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                    You must hold CAWS NFT or Genesis Land NFT
                                    to claim this prize
                                  </p>
                                </React.Fragment>
                              }
                              icon={<img src={warning} alt="" />}
                              color={"#000"}
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default DailyBonusPopup;
