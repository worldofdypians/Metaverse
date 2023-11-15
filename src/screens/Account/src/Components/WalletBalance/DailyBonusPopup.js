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
import bnbIcon from "./assets/bnbIcon.svg";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";

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
  handleSwitchNetwork,
  myNFTSCaws,
  myNFTSLand,
  myNFTSTimepiece,
  allChests,
  canBuy,
}) => {
  const [rewardTypes, setRewardTypes] = useState("standard");
  const [rewardPopup, setRewardPopup] = useState(false);
  const [randomArray, setRandomArray] = useState([]);
  const [disableBtn, setdisableBtn] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [liverewardData, setLiveRewardData] = useState([]);
  const [isActive, setIsActive] = useState();
  const [isActiveIndex, setIsActiveIndex] = useState();

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

    // {
    //   open: false,
    //   chestTitle: "Crystal Casket",
    //   closedImg: "crystalCasket",
    //   chestId: 11,
    // },
    // {
    //   open: false,
    //   chestTitle: "Pirate Booty",
    //   closedImg: "pirateBooty",
    //   chestId: 12,
    // },
    // {
    //   open: false,
    //   chestTitle: "Enchanted Trunk",
    //   closedImg: "enchantedTrunk",
    //   chestId: 13,
    // },
    // {
    //   open: false,
    //   chestTitle: "Lost Treasures",
    //   closedImg: "lostTreasures",
    //   chestId: 14,
    // },
    // {
    //   open: false,
    //   chestTitle: "Buccaneer's Fortune",
    //   closedImg: "buccaneersFortune",
    //   chestId: 15,
    // },
    // {
    //   open: false,
    //   chestTitle: "Mysterious Chest",
    //   closedImg: "mysteriousChest",
    //   chestId: 16,
    // },
    // {
    //   open: false,
    //   chestTitle: "Royal Riches",
    //   closedImg: "royalRiches",
    //   chestId: 17,
    // },
    // {
    //   open: false,
    //   chestTitle: "Sea Pearl",
    //   closedImg: "seaPearl",
    //   chestId: 18,
    // },
    // {
    //   open: false,
    //   chestTitle: "Magic Box",
    //   closedImg: "magicBox",
    //   chestId: 19,
    // },
    // {
    //   open: false,
    //   chestTitle: "Hidden Jewels",
    //   closedImg: "hiddenJewels",
    //   chestId: 20,
    // },
    // {
    //   open: false,
    //   chestTitle: "Timeless Trove",
    //   closedImg: "timelessTrove",
    //   chestId: 21,
    // },
    // {
    //   open: false,
    //   chestTitle: "Gilded Relics",
    //   closedImg: "gildedRelics",
    //   chestId: 22,
    // },
    // {
    //   open: false,
    //   chestTitle: "Mystic Covert",
    //   closedImg: "mysticCovert",
    //   chestId: 23,
    // },
    // {
    //   open: false,
    //   chestTitle: "Sapphire Lockbox",
    //   closedImg: "sapphireLockbox",
    //   chestId: 24,
    // },
    // {
    //   open: false,
    //   chestTitle: "Black Pearl",
    //   closedImg: "blackPearl",
    //   chestId: 25,
    // },
    // {
    //   open: false,
    //   chestTitle: "Dragon's Loot",
    //   closedImg: "dragonsLoot",
    //   chestId: 26,
    // },
    // {
    //   open: false,
    //   chestTitle: "Pirate Plunder",
    //   closedImg: "piratePlunder",
    //   chestId: 27,
    // },
    // {
    //   open: false,
    //   chestTitle: "Secret Vault",
    //   closedImg: "secretVault",
    //   chestId: 28,
    // },
    // {
    //   open: false,
    //   chestTitle: "Sunken Treasures",
    //   closedImg: "sunkenTreasures",
    //   chestId: 29,
    // },
    // {
    //   open: false,
    //   chestTitle: "Whispering Chest",
    //   closedImg: "whisperingChest",
    //   chestId: 30,
    // },
    // {
    //   open: false,
    //   chestTitle: "Ancient Artifacts",
    //   closedImg: "ancientArtifacts",
    //   chestId: 31,
    // },
    // {
    //   open: false,
    //   chestTitle: "Dreamer's Chest",
    //   closedImg: "dreamersChest",
    //   chestId: 32,
    // },
    // {
    //   open: false,
    //   chestTitle: "Starlight Coffer",
    //   closedImg: "starlightCoffer",
    //   chestId: 33,
    // },
    // {
    //   open: false,
    //   chestTitle: "Golden Trove",
    //   closedImg: "goldenTrove",
    //   chestId: 34,
    // },
    // {
    //   open: false,
    //   chestTitle: "Nebula Trunk",
    //   closedImg: "nebulaTrunk",
    //   chestId: 35,
    // },
    // {
    //   open: false,
    //   chestTitle: "Ghostly Chest",
    //   closedImg: "ghostlyChest",
    //   chestId: 36,
    // },
    // {
    //   open: false,
    //   chestTitle: "Sacred Relic",
    //   closedImg: "sacredRelic",
    //   chestId: 37,
    // },
    // {
    //   open: false,
    //   chestTitle: "Ocean's Bounty",
    //   closedImg: "oceansBounty",
    //   chestId: 38,
    // },
    // {
    //   open: false,
    //   chestTitle: "Eternal Treasure",
    //   closedImg: "eternalTreasure",
    //   chestId: 39,
    // },
    // {
    //   open: false,
    //   chestTitle: "Bloodmoon Chest",
    //   closedImg: "bloodmoonChest",
    //   chestId: 40,
    // },
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

  const showSingleRewardData = (chestID, chestIndex) => {
    const filteredResult = openedChests.find(
      (el) => el.chestId === chestID && allChests.indexOf(el) === chestIndex
    );

    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
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

  const handleOpBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xcc")
          .then(() => {
            handleSwitchNetwork(204);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  useEffect(() => {
    setNames(shuffle(cryptoNames));
    setDummyPremiumChests(dummyPremiums);
    setDummyRegularChests(dummyChests);
  }, []);

  useEffect(() => {
    if (email) {
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
            setIsActiveIndex(1);
          }
        } else setLiveRewardData([]);
      }

      if (rewardTypes === "premium") {
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
            setIsActiveIndex(1);
          }
        } else setLiveRewardData([]);
      }
    } else {
      setLiveRewardData([]);
    }
  }, [rewardTypes, email]);

  useEffect(() => {
    if (!canBuy) {
      setdisableBtn(true);
    } else if (
      coinbase &&
      email &&
      address &&
      coinbase?.toLowerCase() !== address?.toLowerCase()
    ) {
      setdisableBtn(true);
    }
  }, [canBuy, address, coinbase]);
  // console.log(standardChests, dummyregularChests)

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
            <div className="d-flex flex-column mb-1">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div
                  className={`reward-types ${
                    rewardTypes === "standard" ? "reward-types-active" : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => {
                    setRewardTypes("standard");
                    setLiveRewardData([]);
                  }}
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
                  onClick={() => {
                    setRewardTypes("premium");
                    setLiveRewardData([]);
                  }}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Premium
                  </h6>
                </div>
              </div>
              <div className="dailyreward-separator"></div>
              <div className="d-flex flex-column-reverse w-100 justify-content-center align-items-center">
                {canBuy && (chainId === 56 || chainId === 204) && email && (
                  <div
                    className="d-flex align-items-center gap-2 mt-2"
                    style={{ width: "fit-content" }}
                  >
                    <button
                      onClick={handleBnbPool}
                      className={` ${
                        chainId === 56
                          ? "chain-active-btn"
                          : "chain-inactive-btn"
                      } d-flex gap-1 align-items-center`}
                    >
                      {" "}
                      <img src={bnbIcon} alt="" /> BNB Chain
                    </button>

                    <button
                      onClick={handleOpBnbPool}
                      className={` ${
                        chainId === 204
                          ? "chain-active-btn"
                          : "chain-inactive-btn"
                      } d-flex gap-1 align-items-center`}
                    >
                      <img src={bnbIcon} alt="" /> opBNB Chain
                    </button>
                  </div>
                )}
                <div
                  className={` ${
                    (chainId === 204 || chainId === 56) &&
                    canBuy &&
                    ((rewardTypes === "premium" && isPremium) ||
                      rewardTypes === "standard") &&
                    coinbase &&
                    email &&
                    address &&
                    coinbase?.toLowerCase() === address?.toLowerCase()
                      ? "d-none"
                      : "d-flex"
                  } p-2 mt-2 daily-error-text-wrapper justify-content-center`}
                >
                  {chainId !== 204 && chainId !== 56 && coinbase ? (
                    <div className="row mx-0">
                      <span
                        className="sync-txt d-flex align-items-center gap-1"
                        style={{ width: "fit-content" }}
                      >
                        <img src={triangle} alt="" />
                        The event is available on BNB and on opBNB chains.{" "}
                        <br />
                        Please change the chain in your wallet to unlock the
                        chests.
                      </span>{" "}
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ width: "fit-content" }}
                      >
                        <button
                          onClick={handleBnbPool}
                          className={` ${
                            chainId === 56
                              ? "chain-active-btn"
                              : "chain-inactive-btn"
                          } d-flex gap-1 align-items-center`}
                        >
                          {" "}
                          <img src={bnbIcon} alt="" /> BNB Chain
                        </button>

                        <button
                          onClick={handleOpBnbPool}
                          className={` ${
                            chainId === 204
                              ? "chain-active-btn"
                              : "chain-inactive-btn"
                          } d-flex gap-1 align-items-center`}
                        >
                          <img src={bnbIcon} alt="" /> opBNB Chain
                        </button>
                      </div>
                    </div>
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
                  ) : address &&
                    coinbase &&
                    rewardTypes === "premium" &&
                    !isPremium ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      You need to be a Premium Subscriber in order to unlock the
                      Chests
                    </span>
                  ) : !canBuy ? (
                    <span className="sync-txt d-flex align-items-center gap-1">
                      <img src={triangle} alt="" />
                      This account has completed the daily bonus for today.
                      Please come back tomorrow.
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
                      setIsActiveIndex(index + 1);
                    }}
                    handleShowRewards={(value, value2) => {
                      showSingleRewardData(value, value2);
                      setIsActive(value);
                      setIsActiveIndex(index + 1);
                    }}
                    chainId={chainId}
                    coinbase={coinbase}
                    isActive={isActive}
                    isActiveIndex={isActiveIndex}
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
                      setIsActiveIndex(index + 1);
                    }}
                    handleShowRewards={(value, value2) => {
                      showSingleRewardData(value, value2);
                      setIsActive(value);
                      setIsActiveIndex(index + 1);
                    }}
                    isActive={isActive}
                    isActiveIndex={isActiveIndex}
                    chainId={chainId}
                    coinbase={coinbase}
                  />
                ))}
              </div>
            ) : rewardTypes === "standard" &&
              (!email || standardChests.length === 0) ? (
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
            {claimedChests > 0 || claimedPremiumChests > 0 ? (
              <div className="d-flex flex-column gap-2 ">
                <span className="font-organetto chestprizetitle text-white">
                  PRIZES
                </span>
                <div className="container px-3">
                  <div className="row" style={{ rowGap: "10px" }}>
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
                                liverewardData?.rewardType?.includes("Points")
                                  ? liverewardData?.reward
                                  : 0,
                                0
                              )}{" "}
                              Points
                            </span>
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
                              {liverewardData?.rewardType?.includes("Money")
                                ? getFormattedNumber(
                                    Number(liverewardData?.reward),
                                    2
                                  )
                                : "0"}{" "}
                              Reward
                            </span>
                            {myNFTSCaws === 0 &&
                              myNFTSLand === 0 &&
                              myNFTSTimepiece === 0 &&
                              liverewardData?.reward?.includes("WoD") && (
                                <ToolTip
                                  title={
                                    <React.Fragment>
                                      <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                        You must hold CAWS NFT, Timepiece NFT or
                                        Genesis Land NFT to claim this prize
                                      </p>
                                    </React.Fragment>
                                  }
                                  icon={<img src={warning} alt="" />}
                                  color={"#000"}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          liverewardData?.reward?.includes("WoD") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            liverewardData?.rewardType?.includes("NFT") &&
                            !liverewardData?.reward?.includes("WoD")
                              ? "grayscale(1)"
                              : liverewardData?.rewardType?.includes("NFT") &&
                                liverewardData?.reward?.includes("WoD")
                              ? ""
                              : "grayscale(1)",
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
                                  liverewardData?.rewardType?.includes("NFT") &&
                                  !liverewardData?.reward?.includes("WoD")
                                    ? "gray"
                                    : liverewardData?.rewardType?.includes(
                                        "NFT"
                                      ) &&
                                      liverewardData?.reward?.includes("WoD")
                                    ? "white"
                                    : "gray",
                              }}
                            >
                              Genesis Land NFT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          liverewardData?.reward?.includes("CAWS") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            liverewardData?.rewardType?.includes("NFT") &&
                            !liverewardData?.reward?.includes("CAWS")
                              ? "grayscale(1)"
                              : liverewardData?.rewardType?.includes("NFT") &&
                                liverewardData?.reward?.includes("CAWS")
                              ? ""
                              : "grayscale(1)",
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
                                  liverewardData?.rewardType?.includes("NFT") &&
                                  !liverewardData?.reward?.includes("CAWS")
                                    ? "gray"
                                    : liverewardData?.rewardType?.includes(
                                        "NFT"
                                      ) &&
                                      liverewardData?.reward?.includes("CAWS")
                                    ? "white"
                                    : "gray",
                              }}
                            >
                              CAWS NFT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div
                        className={`prizeswrapper ${
                          liverewardData?.rewardType?.includes("NFT") &&
                          liverewardData?.reward?.includes("BetaPass") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            liverewardData?.rewardType?.includes("NFT") &&
                            !liverewardData?.reward?.includes("BetaPass")
                              ? "grayscale(1)"
                              : liverewardData?.rewardType?.includes("NFT") &&
                                liverewardData?.reward?.includes("BetaPass")
                              ? ""
                              : "grayscale(1)",
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
                                  liverewardData?.rewardType?.includes("NFT") &&
                                  !liverewardData?.reward?.includes("BetaPass")
                                    ? "gray"
                                    : liverewardData?.rewardType?.includes(
                                        "NFT"
                                      ) &&
                                      liverewardData?.reward?.includes(
                                        "BetaPass"
                                      )
                                    ? "white"
                                    : "gray",
                              }}
                            >
                              Beta Pass NFT
                            </span>
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
                            {myNFTSCaws === 0 &&
                              myNFTSLand === 0 &&
                              myNFTSTimepiece === 0 &&
                              liverewardData?.reward?.includes("BetaPass") && (
                                <ToolTip
                                  title={
                                    <React.Fragment>
                                      <p className="py-3 pe-3 mb-0 d-flex flex-column gap-2 font-poppins">
                                        You must hold CAWS NFT, Timepiece NFT or
                                        Genesis Land NFT to claim this prize
                                      </p>
                                    </React.Fragment>
                                  }
                                  icon={<img src={warning} alt="" />}
                                  color={"#000"}
                                />
                              )}
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
            style={{ width: "fit-content" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3 gap-4">
              <div></div>
              <h6 className="reward-prize-title mb-0 font-organetto">
                You{" "}
                <span className="font-organetto" style={{ color: "#8C56FF" }}>
                  won
                </span>
              </h6>
              <img
                src={xMark}
                style={{ cursor: "pointer" }}
                onClick={() => setRewardPopup(false)}
                alt=""
              />
            </div>

            <div className="container px-3">
              <div className="d-flex flex-column" style={{ rowGap: "12px" }}>
                {rewardData?.rewardType?.includes("Points") && (
                  <div
                    className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className={`prizeswrapper py-2 px-3  ${
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
                              fontSize: "14px",
                            }}
                          >
                            {getFormattedNumber(rewardData?.reward, 0)} Points
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {rewardData?.rewardType?.includes("Points") && (
                  <span className="text-white d-flex m-auto reward-subtitle">
                    Congratulations, you have earned{" "}
                    {getFormattedNumber(rewardData?.reward, 0)} Points.
                  </span>
                )}
                {rewardData?.rewardType?.includes("Money") && (
                  <div
                    className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className={`prizeswrapper py-2 px-3 ${
                        rewardData?.rewardType?.includes("Money") &&
                        (myNFTSCaws > 0 ||
                          myNFTSLand > 0 ||
                          myNFTSTimepiece > 0) &&
                        "prizeswrapper-premium"
                      } `}
                      style={{
                        filter:
                          !rewardData?.rewardType?.includes("Money") &&
                          myNFTSCaws === 0 &&
                          myNFTSLand === 0 &&
                          myNFTSTimepiece === 0 &&
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
                                myNFTSCaws === 0 &&
                                myNFTSLand === 0 &&
                                myNFTSTimepiece === 0 &&
                                "gray",
                              fontSize: "14px",
                            }}
                          >
                            $
                            {rewardData?.rewardType?.includes("Money")
                              ? getFormattedNumber(
                                  Number(rewardData?.reward),
                                  2
                                )
                              : "0"}
                            Reward
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {rewardData?.rewardType?.includes("Money") &&
                  (myNFTSCaws > 0 || myNFTSLand > 0 || myNFTSTimepiece > 0) && (
                    <span className="text-white d-flex m-auto reward-subtitle">
                      Congratulations, you have earned $
                      {getFormattedNumber(rewardData?.reward, 2)} Reward.
                    </span>
                  )}

                {rewardData?.rewardType?.includes("Money") &&
                  myNFTSCaws === 0 &&
                  myNFTSLand === 0 &&
                  myNFTSTimepiece === 0 && (
                    <div className="d-flex flex-column w-100 gap-2 p-2 daily-error-text-wrapper justify-content-center">
                      <img src={triangle} alt="" />
                      <span className="text-white d-flex m-auto reward-subtitle">
                        You must hold CAWS NFT, Timepiece NFT or Genesis Land
                        NFT to claim this prize.
                      </span>
                    </div>
                  )}

                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("WoD") && (
                    <div
                      className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className={`prizeswrapper py-2 px-3 ${
                          rewardData?.rewardType?.includes("NFT") &&
                          rewardData?.reward?.includes("WoD") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !rewardData?.rewardType?.includes("NFT") &&
                            !rewardData?.reward?.includes("WoD") &&
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
                                  !rewardData?.reward?.includes("WoD") &&
                                  "gray",
                                fontSize: "14px",
                              }}
                            >
                              Genesis Land NFT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("WoD") && (
                    <span className="text-white d-flex m-auto reward-subtitle">
                      Congratulations, you have earned Genesis Land NFT.
                    </span>
                  )}

                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("CAWS") && (
                    <div
                      className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className={`prizeswrapper py-2 px-3 ${
                          rewardData?.rewardType?.includes("NFT") &&
                          rewardData?.reward?.includes("CAWS") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !rewardData?.rewardType?.includes("NFT") &&
                            !rewardData?.reward?.includes("CAWS") &&
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
                                  !rewardData?.reward?.includes("CAWS") &&
                                  "gray",
                                fontSize: "14px",
                              }}
                            >
                              CAWS NFT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("CAWS") &&
                  (myNFTSCaws > 0 || myNFTSLand > 0 || myNFTSTimepiece > 0) && (
                    <span className="text-white d-flex m-auto reward-subtitle">
                      Congratulations, you have earned CAWS NFT.
                    </span>
                  )}

                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("BetaPass") && (
                    <div
                      className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className={`prizeswrapper py-2 px-3 ${
                          rewardData?.rewardType?.includes("NFT") &&
                          rewardData?.reward?.includes("BetaPass") &&
                          "prizeswrapper-premium"
                        } `}
                        style={{
                          filter:
                            !rewardData?.rewardType?.includes("NFT") &&
                            !rewardData?.reward?.includes("BetaPass") &&
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
                                  !rewardData?.reward?.includes("BetaPass") &&
                                  "gray",
                                fontSize: "14px",
                              }}
                            >
                              Beta Pass NFT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {rewardData?.rewardType?.includes("NFT") &&
                  rewardData?.reward?.includes("BetaPass") && (
                    <span className="text-white d-flex m-auto reward-subtitle">
                      Congratulations, you have earned Beta Pass NFT.
                    </span>
                  )}

                {rewardData?.rewardType?.includes("LargeMoney") && (
                  <div
                    className="m-auto py-4 px-5 m-0 prizepopup-wrapper"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className={`prizeswrapper py-2 px-3 ${
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
                              fontSize: "14px",
                            }}
                          >
                            ${getFormattedNumber(rewardData.reward ?? 0, 2)}{" "}
                            Reward
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {rewardData?.rewardType?.includes("LargeMoney") &&
                  (myNFTSCaws > 0 || myNFTSLand > 0 || myNFTSTimepiece > 0) && (
                    <span className="text-white d-flex m-auto reward-subtitle">
                      Congratulations, you have earned $
                      {getFormattedNumber(rewardData.reward ?? 0, 2)} Reward.
                    </span>
                  )}
                {rewardData?.rewardType?.includes("LargeMoney") &&
                  myNFTSCaws === 0 &&
                  myNFTSLand === 0 &&
                  myNFTSTimepiece === 0 && (
                    <div className="d-flex flex-column w-100 gap-2 p-2 daily-error-text-wrapper justify-content-center">
                      <img src={triangle} alt="" />
                      <span className="text-white d-flex m-auto reward-subtitle">
                        You must hold CAWS NFT, Timepiece NFT or Genesis Land
                        NFT to claim this prize.
                      </span>
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
