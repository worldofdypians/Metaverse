import React, { useEffect, useState } from "react";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

import allImg from "./myrewardsAssets/newAssets/allImg.svg";
import allActive from "./myrewardsAssets/newAssets/allActive.svg";
import nftStaking from "./myrewardsAssets/newAssets/nftStaking.svg";
import nftStakingActive from "./myrewardsAssets/newAssets/nftStakingActive.svg";
import bnbLogo from "../../../../Marketplace/assets/bnbLogo.svg";
import leaderboard from "./myrewardsAssets/newAssets/leaderboard.svg";
import leaderboardActive from "./myrewardsAssets/newAssets/leaderboardActive.svg";

import specialRewards from "./myrewardsAssets/newAssets/specialRewards.svg";
import specialRewardsActive from "./myrewardsAssets/newAssets/specialRewardsActive.svg";

import dailyBonus from "./myrewardsAssets/newAssets/dailyBonus.png";
import dailyBonusActive from "./myrewardsAssets/newAssets/dailyBonusActive.png";

import treasureHunt from "./myrewardsAssets/newAssets/treasureHunt.png";
import treasureHuntActive from "./myrewardsAssets/newAssets/treasureHuntActive.png";

import base from "./myrewardsAssets/newAssets/treasureHunt/base.svg";
import cmc from "./myrewardsAssets/newAssets/treasureHunt/cmc.svg";
import coingecko from "./myrewardsAssets/newAssets/treasureHunt/coingecko.svg";
import skale from "./myrewardsAssets/newAssets/treasureHunt/skale.svg";
import seiIcon from "../../../../../components/NewDailyBonus/assets/seiIcon.svg";
import coreIcon from "../../../../../components/NewDailyBonus/assets/coreIcon.svg";
import cookieIcon from "./myrewardsAssets/newAssets/treasureHunt/cookie3Logo.svg";

import victionIcon from "../../../../../components/NewDailyBonus/assets/victionIcon.svg";
import immutableLogo from "../../../../../components/NewDailyBonus/assets/immutableLogo.svg";
import baseLogo from "../../../../../screens/Home/VideoWrapper/assets/baseLogo.svg";

import multiversIcon from "../../../../../components/NewDailyBonus/assets/multiversxIcon.svg";

import dypius from "./myrewardsAssets/newAssets/treasureHunt/dypius.svg";
import gate from "./myrewardsAssets/newAssets/treasureHunt/gate.svg";
import conflux from "./myrewardsAssets/newAssets/treasureHunt/conflux.svg";
import dypiusPremium from "./myrewardsAssets/newAssets/treasureHunt/dypiusPremium.svg";
import dogeCoin from "./myrewardsAssets/newAssets/treasureHunt/dogeCoin.svg";

const MyRewardsPopupNew = ({
  address,
  email,
  allChests,
  // weeklyplayerData,
  // userRank2,
  userSocialRewards,
  bnbEarnUsd,
  skaleEarnUsd,
  seiEarnUsd,
  coreEarnUsd,
  victionEarnUsd,
  allSkaleChests,
  userRankRewards,
  cawsPremiumRewards,
  allCoreChests,
  allVictionChests,
  allSeiChests,
  genesisRank2,
  // weeklyDataAmountCore,
  // monthlyDataAmountCore,
  // weeklyDataAmountViction,
  // monthlyDataAmountViction,
  // weeklyDataAmountSkale,
  // monthlyDataAmountSkale,
  multiversEarnUsd,
  userDataStar,
  userDataStarWeekly,
  // weeklyDataAmountManta,
  // weeklyDataAmountBase,
  // monthlyDataAmountManta,
  // monthlyDataAmountBase,
  allMantaChests,
  allBaseChests,
  mantaEarnUsd,
  // weeklyDataAmountTaiko,
  // monthlyDataAmountTaiko,
  allTaikoChests,
  taikoEarnUsd,
  immutableEarnUsd,
  cookieEarnUsd,
  landPremiumRewards,
  baseEarnUSD,
  allMatChests,
  matEarnUsd
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [previousRewards, setPreviousRewards] = useState(false);
  const [rewardCategory, setrewardCategory] = useState("all");

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const [leaderboardTotalData, setleaderboardTotalData] = useState(0);
  const [leaderboardSkaleTotalData, setleaderboardSkaleTotalData] = useState(0);

  const [genesisData, setgenesisData] = useState(0);
  const [bundlesBought, setbundlesBought] = useState(0);

  const [cawsRewards, setCawsRewards] = useState(0);
  const [wodCawsRewards, setWodCawsRewards] = useState(0);
  const [wodRewards, setWodRewards] = useState(0);
  const [gemRewards, setGemRewards] = useState(0);

  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);
  const [treasureRewardMoneySkale, setTreasureRewardMoneySkale] = useState(0);
  const [treasureRewardMoneySei, setTreasureRewardMoneySei] = useState(0);
  const [treasureRewardMoneyCore, setTreasureRewardMoneyCore] = useState(0);
  const [treasureRewardMoneyViction, setTreasureRewardMoneyViction] =
    useState(0);
  const [treasureRewardMoneyManta, setTreasureRewardMoneyManta] = useState(0);
  const [treasureRewardMoneyBase, setTreasureRewardMoneyBase] = useState(0);

  const [treasureRewardMoneyTaiko, setTreasureRewardMoneyTaiko] = useState(0);
  const [treasureRewardMoneyMat, setTreasureRewardMoneyMat] = useState(0);


  const [pasttreasureRewardMoney, setpastTreasureRewardMoney] = useState(0);
  const [pasttreasureRewardNftCaws, setpastTreasureRewardNftCaws] = useState(0);
  const [pasttreasureRewardNftWod, setpastTreasureRewardNftWod] = useState(0);
  const [pasttreasureRewardNftBetaPass, setpastTreasureRewardNftBetaPass] =
    useState(0);

  const [confluxRewardsUSD, setConfluxRewardsUSD] = useState(0);
  const [dypiusRewardsUSD, setDypiusRewardsUSD] = useState(0);
  const [coingeckoRewardsUSD, setcoingeckoRewardsUSD] = useState(0);
  const [pastSpecialRewards, setpastSpecialRewards] = useState(0);

  const [cmcRewardsUSD, setcmcRewardsUSD] = useState(0);
  const [dogeRewardsUSD, setdogeRewardsUSD] = useState(0);

  const [gateRewardsUSD, setGateRewardsUSD] = useState(0);
  const [baseRewardsUSD, setBaseRewardsUSD] = useState(0);
  const [dypPremiumUSD, setdypPremiumUSD] = useState(0);
  const [pastUserRankUsd, setpastUserRankUsd] = useState(0);

  const [userSocialRewardsCached, setuserSocialRewardsCached] = useState(0);

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const fetchUsersocialRewards = () => {
    const cachedUserSocialRewards = localStorage.getItem(
      "cacheduserSocialRewards"
    );

    if (cachedUserSocialRewards) {
      setuserSocialRewardsCached(cachedUserSocialRewards);
    }
  };

  const fetchConfluxUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/conflux_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setConfluxRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedConfluxRewards", data.data.userRewards);
        } else {
          setConfluxRewardsUSD(0);
          localStorage.setItem("cachedConfluxRewards", 0);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchCmcUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/cmc_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setcmcRewardsUSD(data.data.userRewards);
        } else {
          setcmcRewardsUSD(0);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchDogeUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/doge_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setdogeRewardsUSD(data.data.userRewards);
        } else {
          setdogeRewardsUSD(0);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchDypiusUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/dyp_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setDypiusRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedDypiusRewards", data.data.userRewards);
        } else {
          setDypiusRewardsUSD(0);
          localStorage.setItem("cachedDypiusRewards", 0);
        }
      });
  };

  const fetchDypiusPremiumUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/dyp-treasure/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setdypPremiumUSD(data.data.userRewards);
        } else {
          setdypPremiumUSD(0);
        }
      });
  };

  const fetchPastSpecialRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/special_r/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setpastSpecialRewards(data.data.userRewards);
        } else {
          setpastSpecialRewards(0);
        }
      });
  };

  const fetchPastUserRankRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/past-user-rank-rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setpastUserRankUsd(data.data.userRewards);
        } else {
          setpastUserRankUsd(0);
        }
      });
  };

  const fetchCoingeckoUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/coingecko_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setcoingeckoRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedCoingeckoRewards", data.data.userRewards);
        } else {
          setcoingeckoRewardsUSD(0);
          localStorage.setItem("cachedCoingeckoRewards", 0);
        }
      });
  };

  const fetchGateUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/gate_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          localStorage.setItem("cachedGateRewards", data.data.userRewards);
          setGateRewardsUSD(data.data.userRewards);
        } else {
          setGateRewardsUSD(0);
          localStorage.setItem("cachedGateRewards", 0);
        }
      });
  };

  const fetchBaseUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/base_rewards_pass/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          localStorage.setItem("cachedBaseRewards", data.data.userRewards);
          setBaseRewardsUSD(data.data.userRewards);
        } else {
          setBaseRewardsUSD(0);
          localStorage.setItem("cachedBaseRewards", 0);
        }
      });
  };

  const fetchNftRewards = async (userAddr) => {
    if (userAddr) {
      const cawsResult = await axios.get(
        `https://api.worldofdypians.com/api/caws_rewards/${userAddr}`
      );
      const wodcaws_Result = await axios.get(
        `https://api.worldofdypians.com/api/wodcaws_rewards/${userAddr}`
      );
      const wodResult = await axios.get(
        `https://api.worldofdypians.com/api/genesisimple_rewards/${userAddr}`
      );
      if (cawsResult && cawsResult.status === 200) {
        const cawsuserRewards = cawsResult.data.userRewards;
        localStorage.setItem("cachedCawsUserRewards", cawsuserRewards);
        setCawsRewards(cawsuserRewards);
      }

      if (wodcaws_Result && wodcaws_Result.status === 200) {
        const wodcaws_userRewards = wodcaws_Result.data.userRewards;
        localStorage.setItem("cachedWodCawsUserRewards", wodcaws_userRewards);
        setWodCawsRewards(wodcaws_userRewards);
      }

      if (wodResult && wodResult.status === 200) {
        const wod_userRewards = wodResult.data.userRewards;
        localStorage.setItem("cachedWodUserRewards", wod_userRewards);
        setWodRewards(wod_userRewards);
      }
    }
  };

  const fetchGenesisGem = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/genesis_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const gem_Rewards = result.data.userRewards;
      localStorage.setItem("cachedGem_Rewards", gem_Rewards);
      setGemRewards(gem_Rewards);
    }
  };

  const fetchPastDailyBonusMoney = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/daily_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const money_Rewards = result.data.userRewards;

      setpastTreasureRewardMoney(money_Rewards);
    }
  };

  const fetchPastDailyBonusBetaPass = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/beta_passes/${userAddr}`
    );
    if (result && result.status === 200) {
      const bp_Rewards = result.data.userRewards;

      setpastTreasureRewardNftBetaPass(bp_Rewards);
    }
  };

  const fetchPastDailyBonusCaws = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/caws/${userAddr}`
    );
    if (result && result.status === 200) {
      const caws_Rewards = result.data.userRewards;

      setpastTreasureRewardNftCaws(caws_Rewards);
    }
  };

  const fetchLeaderboardData = async (userAddr) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/api/leaderboard_rewards/${userAddr}`)
      .catch((e) => {
        console.log(e);
        localStorage.setItem("cachedLeaderboardearnings", 0);
      });

    if (result && result.status === 200) {
      const leaderboard_earnings = result.data.userRewards;
      localStorage.setItem("cachedLeaderboardearnings", leaderboard_earnings);
      setleaderboardTotalData(leaderboard_earnings);
    } else {
      localStorage.setItem("cachedLeaderboardearnings", 0);
    }
  };

  const fetchSkaleboardData = async (userAddr) => {
    const result = await axios
      .get(
        `https://api.worldofdypians.com/api/skale_leaderboard_rewards/${userAddr}`
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      const leaderboard_earnings = result.data.userRewards;
      setleaderboardSkaleTotalData(leaderboard_earnings);
    }
  };

  const getTreasureChestsInfo = async () => {
    var moneyResult = 0;
    var moneyResultSkale = 0;
    var moneyResultCore = 0;
    var moneyResultViction = 0;
    var moneyResultManta = 0;
    var moneyResultBase = 0;

    var moneyResultTaiko = 0;
    var moneyResultMat = 0;


    var moneyResultSei = 0;

    if (allChests && allChests.length > 0) {
      allChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allSkaleChests && allSkaleChests.length > 0) {
      allSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultSkale += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allCoreChests && allCoreChests.length > 0) {
      allCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultCore += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allVictionChests && allVictionChests.length > 0) {
      allVictionChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultViction += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allMantaChests && allMantaChests.length > 0) {
      allMantaChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultManta += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allBaseChests && allBaseChests.length > 0) {
      allBaseChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultBase += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allTaikoChests && allTaikoChests.length > 0) {
      allTaikoChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultTaiko += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (allMatChests && allMatChests.length > 0) {
      allMatChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultMat += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    setTreasureRewardMoney(moneyResult);
    setTreasureRewardMoneySkale(moneyResultSkale);
    setTreasureRewardMoneyCore(moneyResultCore);
    setTreasureRewardMoneyViction(moneyResultViction);
    setTreasureRewardMoneyManta(moneyResultManta);
    setTreasureRewardMoneyBase(moneyResultBase);
    setTreasureRewardMoneyTaiko(moneyResultTaiko);
    setTreasureRewardMoneyMat(moneyResultMat);

  };

  const fetchCachedData = () => {
    const cachedConfluxRewards = localStorage.getItem("cachedConfluxRewards");
    const cachedGateRewards = localStorage.getItem("cachedGateRewards");
    const cachedDypiusRewards = localStorage.getItem("cachedDypiusRewards");
    const cachedCoingeckoRewards = localStorage.getItem(
      "cachedCoingeckoRewards"
    );

    const cachedBaseRewards = localStorage.getItem("cachedBaseRewards");

    const cachedCawsUserRewards = localStorage.getItem("cachedCawsUserRewards");
    const cachedWodCawsUserRewards = localStorage.getItem(
      "cachedWodCawsUserRewards"
    );

    const cachedWodUserRewards = localStorage.getItem("cachedWodUserRewards");
    const cachedGem_Rewards = localStorage.getItem("cachedGem_Rewards");
    const cachedLeaderboardearnings = localStorage.getItem(
      "cachedLeaderboardearnings"
    );

    if (
      cachedConfluxRewards &&
      cachedGateRewards &&
      cachedCawsUserRewards &&
      cachedWodCawsUserRewards &&
      cachedWodUserRewards &&
      cachedGem_Rewards &&
      cachedLeaderboardearnings &&
      cachedDypiusRewards &&
      cachedCoingeckoRewards &&
      cachedBaseRewards
    ) {
      setConfluxRewardsUSD(Number(cachedConfluxRewards));

      setDypiusRewardsUSD(cachedDypiusRewards);

      setGateRewardsUSD(Number(cachedGateRewards));

      setCawsRewards(Number(cachedCawsUserRewards));

      setWodCawsRewards(Number(cachedWodCawsUserRewards));

      setWodRewards(Number(cachedWodUserRewards));

      setGemRewards(Number(cachedGem_Rewards));

      setleaderboardTotalData(Number(cachedLeaderboardearnings));

      setcoingeckoRewardsUSD(cachedCoingeckoRewards);

      setBaseRewardsUSD(cachedBaseRewards);
    }
  };

  useEffect(() => {
    getTreasureChestsInfo();
  }, [
    allChests,
    allSkaleChests,
    allCoreChests,
    allVictionChests,
    allMantaChests,
    allBaseChests,
  ]);

  useEffect(() => {
    getBundles();
    fetchNftRewards(address);
    fetchGenesisGem(address);
    fetchLeaderboardData(address);
    fetchSkaleboardData(address);
    fetchConfluxUSDRewards(address);
    fetchCmcUSDRewards(address);
    fetchDogeUSDRewards(address);
    fetchGateUSDRewards(address);
    fetchBaseUSDRewards(address);
    fetchDypiusUSDRewards(address);
    fetchDypiusPremiumUSDRewards(address);
    fetchCoingeckoUSDRewards(address);
    fetchPastSpecialRewards(address);
    fetchPastUserRankRewards(address);
    fetchPastDailyBonusMoney(address);
    fetchPastDailyBonusBetaPass(address);
    fetchPastDailyBonusCaws(address);
    fetchCachedData();
  }, [address, email]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  const scrollToView = (viewId) => {
    document.getElementById(viewId).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="d-grid rewardstable-wrapper2 gap-2 mt-3 px-1">
      <div className="total-earnings-purple-wrapper p-2">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span className="total-rewards-amount">
            $
            {getFormattedNumber(
              Number(wodRewards) +
                Number(wodCawsRewards) +
                Number(cawsRewards) +
                Number(pasttreasureRewardMoney) +
                Number(gemRewards) +
                Number(pastUserRankUsd) +
                Number(leaderboardTotalData) +
                Number(leaderboardSkaleTotalData) +
                Number(baseRewardsUSD) +
                Number(coingeckoRewardsUSD) +
                Number(dypiusRewardsUSD) +
                Number(gateRewardsUSD) +
                Number(confluxRewardsUSD) +
                Number(dogeRewardsUSD) +
                Number(cmcRewardsUSD) +
                Number(dypPremiumUSD) +
                Number(bnbEarnUsd),
              2
            )}
          </span>
          <span className="total-rewards-desc">LIFETIME EARNINGS</span>
        </div>
      </div>
      <div className="d-flex flex-column gap-1 w-100">
        <div className="d-flex flex-row justify-content-between gap-2 align-items-center">
          <span className="reward-category-text">Reward Category</span>
          <div className="d-flex align-items-center gap-2">
            <button
              className={previousRewards ? "past-reward" : "active-reward"}
              onClick={() => {
                setPreviousRewards(false);
              }}
            >
              Active
            </button>
            <button
              className={previousRewards ? "active-reward" : "past-reward"}
              onClick={() => {
                setPreviousRewards(true);
              }}
            >
              Past
            </button>
          </div>
        </div>
        <div className="small-separator"></div>
      </div>
      <div className="reward-category-items-wrapper mb-3">
        <div
          className={` ${
            rewardCategory === "all"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("all");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img src={rewardCategory === "all" ? allActive : allImg} alt="" />
            <span
              className={
                rewardCategory === "all"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              All
            </span>
            <div
              className={
                rewardCategory === "all"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "all"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(wodRewards) +
                      Number(wodCawsRewards) +
                      Number(cawsRewards) +
                      Number(pastUserRankUsd) +
                      Number(pasttreasureRewardMoney) +
                      Number(gemRewards) +
                      Number(leaderboardTotalData) +
                      Number(leaderboardSkaleTotalData) +
                      Number(baseRewardsUSD) +
                      Number(coingeckoRewardsUSD) +
                      Number(dypiusRewardsUSD) +
                      Number(gateRewardsUSD) +
                      Number(confluxRewardsUSD) +
                      Number(dogeRewardsUSD) +
                      Number(cmcRewardsUSD) +
                      Number(dypPremiumUSD) +
                      Number(bnbEarnUsd) +
                      Number(coreEarnUsd) +
                      Number(victionEarnUsd),
                    2
                  )
                : getFormattedNumber(
                    Number(treasureRewardMoneyCore) +
                      Number(treasureRewardMoneySei) +
                      Number(treasureRewardMoneyViction) +
                      Number(treasureRewardMoneyManta) +
                      Number(treasureRewardMoneyBase) +
                      Number(treasureRewardMoney) +
                      Number(treasureRewardMoneySkale) +
                      Number(skaleEarnUsd) +
                      Number(multiversEarnUsd) +
                      Number(seiEarnUsd) +
                      Number(immutableEarnUsd) +
                      Number(taikoEarnUsd) +
                      Number(matEarnUsd) +
                      Number(cookieEarnUsd) +
                      Number(mantaEarnUsd) +
                      // Number(dailyplayerData) +
                      // Number(dailyDataAmountCore) +
                      // Number(weeklyDataAmountCore) +
                      // Number(monthlyDataAmountCore) +
                      // Number(dailyDataAmountSkale) +
                      // Number(weeklyDataAmountSkale) +
                      // Number(monthlyDataAmountSkale) +
                      // Number(dailyDataAmountViction) +
                      // Number(weeklyDataAmountViction) +
                      // Number(monthlyDataAmountViction) +
                      // Number(weeklyDataAmountManta) +
                      // Number(weeklyDataAmountBase) +

                      // Number(weeklyDataAmountTaiko) +
                      // Number(monthlyDataAmountManta) +
                      // Number(monthlyDataAmountBase) +

                      // Number(monthlyDataAmountTaiko) +
                      // Number(weeklyplayerData) +
                      // Number(userRank2) +
                      Number(genesisRank2) +
                      Number(userRankRewards) +
                      Number(userDataStar) +
                      Number(userDataStarWeekly) +
                      Number(userSocialRewardsCached) +
                      Number(cawsPremiumRewards) +
                      Number(landPremiumRewards),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "leaderboard"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("leaderboard");
            scrollToView(previousRewards ? "pastleaderboard" : "leaderboard2");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "leaderboard"
                  ? leaderboardActive
                  : leaderboard
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "leaderboard"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Leaderboard
            </span>
            <div
              className={
                rewardCategory === "leaderboard"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "leaderboard"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(gemRewards) +
                      Number(leaderboardTotalData) +
                      Number(leaderboardSkaleTotalData),
                    2
                  )
                : getFormattedNumber(
                    // Number(dailyplayerData) +
                    // Number(dailyDataAmountCore) +
                    // Number(weeklyDataAmountCore) +
                    //   +Number(monthlyDataAmountCore) +
                    // Number(dailyDataAmountSkale) +
                    // Number(weeklyDataAmountSkale) +
                    // Number(monthlyDataAmountSkale) +
                    // Number(dailyDataAmountViction) +
                    // Number(weeklyDataAmountViction) +
                    // Number(monthlyDataAmountViction) +
                    // Number(weeklyDataAmountManta) +
                    // Number(weeklyDataAmountBase) +

                    // Number(weeklyDataAmountTaiko) +
                    // Number(monthlyDataAmountManta) +
                    // Number(monthlyDataAmountBase) +

                    // Number(monthlyDataAmountTaiko) +
                    // Number(weeklyplayerData) +
                    // Number(userRank2) +
                    Number(userDataStar) +
                      Number(genesisRank2) +
                      Number(userDataStarWeekly),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "nftStaking"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("nftStaking");
            scrollToView(previousRewards ? "pastnftStaking" : "nftStaking");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "nftStaking" ? nftStakingActive : nftStaking
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "nftStaking"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              NFT Staking
            </span>
            <div
              className={
                rewardCategory === "nftStaking"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "nftStaking"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(wodRewards) +
                      Number(wodCawsRewards) +
                      Number(cawsRewards),
                    2
                  )
                : "0.00"}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "dailyBonus"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("dailyBonus");
            scrollToView(previousRewards ? "pastdailyBonus" : "dailyBonus");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "dailyBonus" ? dailyBonusActive : dailyBonus
              }
              style={{ width: 36, height: 36 }}
              alt=""
            />
            <span
              className={
                rewardCategory === "dailyBonus"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Daily Bonus
            </span>
            <div
              className={
                rewardCategory === "dailyBonus"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "dailyBonus"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(pasttreasureRewardMoney, 2)
                : getFormattedNumber(
                    Number(treasureRewardMoney) +
                      Number(treasureRewardMoneyCore) +
                      Number(treasureRewardMoneySei) +
                      Number(treasureRewardMoneyViction) +
                      Number(treasureRewardMoneyManta) +
                      Number(treasureRewardMoneyBase) +
                      Number(treasureRewardMoneySkale),
                    2
                  )}
            </span>
          </div>
        </div>

        <div
          className={` ${
            rewardCategory === "treasurehunt"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("treasurehunt");
            scrollToView(previousRewards ? "pasttreasurehunt" : "treasurehunt");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "treasurehunt"
                  ? treasureHuntActive
                  : treasureHunt
              }
              alt=""
              style={{ width: 36, height: 36 }}
            />
            <span
              className={
                rewardCategory === "treasurehunt"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Treasure Hunt
            </span>
            <div
              className={
                rewardCategory === "treasurehunt"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "treasurehunt"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(baseRewardsUSD) +
                      Number(coingeckoRewardsUSD) +
                      Number(dypiusRewardsUSD) +
                      Number(gateRewardsUSD) +
                      Number(confluxRewardsUSD) +
                      Number(dogeRewardsUSD) +
                      Number(cmcRewardsUSD) +
                      Number(dypPremiumUSD) +
                      Number(bnbEarnUsd) +
                      Number(coreEarnUsd) +
                      Number(victionEarnUsd),
                    2
                  )
                : getFormattedNumber(
                    Number(skaleEarnUsd) +
                      Number(seiEarnUsd) +
                      Number(immutableEarnUsd) +
                      Number(multiversEarnUsd) +
                      Number(mantaEarnUsd) +
                      Number(taikoEarnUsd) +
                      Number(matEarnUsd) +
                      Number(cookieEarnUsd),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "specialRewards"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("specialRewards");
            scrollToView(
              previousRewards ? "pastspecialRewards" : "specialRewards"
            );
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "specialRewards"
                  ? specialRewardsActive
                  : specialRewards
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "specialRewards"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Special Rewards
            </span>
            <div
              className={
                rewardCategory === "specialRewards"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "specialRewards"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(pastUserRankUsd) + Number(pastSpecialRewards),
                    2
                  )
                : getFormattedNumber(
                    Number(userSocialRewardsCached) + Number(userRankRewards),
                    2
                  )}
            </span>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastleaderboard" : "leaderboard2"}
      >
        <span
          className={
            rewardCategory === "leaderboard"
              ? "item-name-title-selected d-flex align-items-center gap-2"
              : "item-name-title d-flex align-items-center gap-2"
          }
        >
          Global Leaderboards
          <div
            className="d-flex align-items-center gap-1 rounded p-1"
            style={{ background: "#536BBE" }}
          >
            <img src={bnbLogo} style={{ width: 16, height: 16 }} alt="" />{" "}
            <img src={baseLogo} style={{ width: 16, height: 16 }} alt="" />
            <img
              src={require("../../../../../components/Header/assets/manta.png")}
              style={{ width: 16, height: 16 }}
              alt=""
            />
            <img
              src={
                require("../../../../../components/Header/assets/taiko.svg")
                  .default
              }
              style={{ width: 16, height: 16 }}
              alt=""
            />
            <img
              src={
                require("../../../../../components/Header/assets/taiko.svg")
                  .default
              }
              style={{ width: 16, height: 16 }}
              alt=""
            />
            <img src={skale} style={{ width: 16, height: 16 }} alt="" />{" "}
            <img src={coreIcon} style={{ width: 16, height: 16 }} alt="" />
            <img src={victionIcon} style={{ width: 16, height: 16 }} alt="" />
          </div>
        </span>
        <div
          className={
            rewardCategory === "leaderboard"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          {!previousRewards ? (
            <div className="treasure-hunt-item-wrapper-active">
              {/* <div className="d-flex flex-column gap-2 w-50"> */}

              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left d-flex align-items-center gap-1">
                  Global Monthly
                </span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(Number(userDataStar), 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left d-flex align-items-center gap-1">
                  Global Weekly
                </span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(Number(userDataStarWeekly), 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(gemRewards, 2)
                    : getFormattedNumber(genesisRank2, 2)}
                </span>
              </div>
              {/* </div> */}
            </div>
          ) : (
            <div className="d-flex justify-content-between gap-4 align-items-start">
              <div className="d-flex flex-column gap-2 w-50">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">BNB Chain</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(leaderboardTotalData, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">SKALE</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(leaderboardSkaleTotalData, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">CORE</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>

                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Manta</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Base</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 w-50">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Taiko</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Matchain</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Genesis</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(gemRewards, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Global </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="item-name-left">Viction</span>
                  <span className="item-name-right">
                    ${getFormattedNumber(0, 2)}
                  </span>
                </div>

                {/* <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">SEI</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(0, 2)}
                </span>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {previousRewards ? (
        <div className="d-flex flex-column gap-2" id="pastnftStaking">
          <span
            className={
              rewardCategory === "nftStaking"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            NFT Staking
          </span>
          <div
            className={
              rewardCategory === "nftStaking"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="d-flex flex-column gap-2">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CAWS Premium</span>
                <span className="item-name-right">
                  ${getFormattedNumber(0, 2)}
                </span>
              </div>

              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis NFT Premium</span>
                <span className="item-name-right">
                  ${getFormattedNumber(0, 2)}
                </span>
              </div>

              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CAWS</span>
                <span className="item-name-right">
                  ${getFormattedNumber(cawsRewards, 2)}
                </span>
              </div>

              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">WOD Land & CAWS </span>
                <span className="item-name-right">
                  ${getFormattedNumber(wodCawsRewards, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis Land</span>
                <span className="item-name-right">
                  ${getFormattedNumber(wodRewards, 2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2" id="nftStaking">
          <span
            className={
              rewardCategory === "nftStaking"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            NFT Staking
          </span>
          <div
            className={
              rewardCategory === "nftStaking"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="d-flex flex-column gap-2">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CAWS Premium</span>
                <span className="item-name-right">
                  ${getFormattedNumber(cawsPremiumRewards, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis NFT Premium</span>
                <span className="item-name-right">
                  ${getFormattedNumber(landPremiumRewards, 2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastdailyBonus" : "dailyBonus"}
      >
        <span
          className={
            rewardCategory === "dailyBonus"
              ? "item-name-title-selected"
              : "item-name-title"
          }
        >
          Daily Bonus
        </span>
        <div
          className={
            rewardCategory === "dailyBonus"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          <div className="d-flex justify-content-between gap-4 align-items-start">
            <div className="d-flex flex-column gap-2 w-50">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">BNB Chain</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(pasttreasureRewardMoney, 2)
                    : getFormattedNumber(treasureRewardMoney, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">SKALE</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneySkale, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Viction</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyViction, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CORE</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyCore, 2)}
                </span>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 w-50">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Manta</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyManta, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Base</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyBase, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Taiko</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyTaiko, 2)}
                </span>
              </div>

              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Matchain</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneyMat, 2)}
                </span>
              </div>

              {/*  <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">SEI</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(treasureRewardMoneySei, 2)}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {!previousRewards ? (
        <div className="d-flex flex-column gap-2" id="treasurehunt">
          <span
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            Treasure Hunt
          </span>
          <div
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="treasure-hunt-item-wrapper-active">
              {/* <div className="d-flex justify-content-between gap-4 align-items-start"> */}
              <div className="d-flex flex-column gap-2">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={cookieIcon}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Cookie3
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(cookieEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={
                        require("../../../../../components/Header/assets/taiko.svg")
                          .default
                      }
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Taiko
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(taikoEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={
                        require("../../../../../components/Header/assets/taiko.svg")
                          .default
                      }
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Matchain
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(matEarnUsd, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={immutableLogo}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Immutable
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(immutableEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={baseLogo}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Base
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(baseEarnUSD, 2)}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={require("../../../../Marketplace/assets/mantaLogo.png")}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Manta
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(mantaEarnUsd, 2)}
                  </span>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2" id="pasttreasurehunt">
          <span
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            Treasure Hunt
          </span>
          <div
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="treasure-hunt-item-wrapper">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={
                        require("../../../../Marketplace/assets/bnbLogo.svg")
                          .default
                      }
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    BNB Chain
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(bnbEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={coreIcon}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    CORE
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(coreEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dypiusPremium} alt="" />
                    Premium
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(dypPremiumUSD, 2)}
                  </span>
                </div>

                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={base} alt="" />
                    Base
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(baseRewardsUSD, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dypius} alt="" />
                    Dypius
                  </span>
                  <span className="item-name-right">
                    {" "}
                    ${getFormattedNumber(dypiusRewardsUSD, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img
                      src={victionIcon}
                      alt=""
                      style={{ width: 16, height: 16 }}
                    />
                    Viction
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(victionEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={gate} alt="" />
                    Gate.io
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(gateRewardsUSD, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={cmc} alt="" />
                    CMC
                  </span>
                  <span className="item-name-right">
                    {" "}
                    ${getFormattedNumber(cmcRewardsUSD, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={conflux} alt="" />
                    Conflux
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(confluxRewardsUSD, 2)}
                  </span>
                </div>

                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dogeCoin} alt="" />
                    Dogecoin
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(dogeRewardsUSD, 2)}
                  </span>
                </div>
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={skale} alt="" style={{ width: 16, height: 16 }} />
                    SKALE
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(skaleEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={coingecko} alt="" />
                    CoinGecko
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(coingeckoRewardsUSD, 2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastspecialRewards" : "specialRewards"}
      >
        <span
          className={
            rewardCategory === "specialRewards"
              ? "item-name-title-selected"
              : "item-name-title"
          }
        >
          Special Rewards
        </span>
        <div
          className={
            rewardCategory === "specialRewards"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          <div className="d-flex flex-column gap-2">
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">Social Bonus</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(pastSpecialRewards, 2)
                  : getFormattedNumber(userSocialRewardsCached, 2)}
              </span>
            </div>
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">Rank Bonus</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(pastUserRankUsd, 2)
                  : getFormattedNumber(userRankRewards, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRewardsPopupNew;