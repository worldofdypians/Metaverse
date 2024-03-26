import React, { useEffect, useState } from "react";
import criticalHit from "./myrewardsAssets/criticalHit.png";
import dailyBonus from "./myrewardsAssets/dailyBonus.png";
import leaderboard from "./myrewardsAssets/leaderboard.png";
import nftStake from "./myrewardsAssets/nftStake.png";
import treasureHunt from "./myrewardsAssets/treasureHunt.png";
import specialRewards from "./myrewardsAssets/specialRewards.png";

import Switch from "@mui/material/Switch";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import greenInfo from "./assets/greenInfo.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { async } from "q";

const MyRewardsPopup = ({
  username,
  userId,
  address,
  email,
  bnbPrice,
  cfxPrice,
  ethTokenData,
  openedChests,
  allChests,
  weeklyplayerData,
  dailyplayerData,
  userRank2,
  userSocialRewards,
  dogePrice,
  userEarnUsd,
  userEarnETH,
  dogeEarnUSD,
  dogeEarnBNB,
  baseEarnUSD,
  baseEarnETH,
  dypiusEarnUsd,
  cmcuserEarnETH,
  cmcuserEarnUsd,
  dypiusPremiumEarnUsd,
  dypiusPremiumEarnTokens,
  openedSkaleChests,
  allSkaleChests,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [previousRewards, setPreviousRewards] = useState(false);
  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const [leaderboardTotalData, setleaderboardTotalData] = useState(0);

  const [genesisData, setgenesisData] = useState(0);
  const [bundlesBought, setbundlesBought] = useState(0);

  const [cawsRewards, setCawsRewards] = useState(0);
  const [wodCawsRewards, setWodCawsRewards] = useState(0);
  const [wodRewards, setWodRewards] = useState(0);
  const [gemRewards, setGemRewards] = useState(0);

  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);
  const [treasureRewardNftCaws, setTreasureRewardNftCaws] = useState(0);
  const [treasureRewardNftWod, setTreasureRewardNftWod] = useState(0);
  const [treasureRewardNftBetaPass, setTreasureRewardNftBetaPass] = useState(0);

  const [pasttreasureRewardMoney, setpastTreasureRewardMoney] = useState(0);
  const [pasttreasureRewardNftCaws, setpastTreasureRewardNftCaws] = useState(0);
  const [pasttreasureRewardNftWod, setpastTreasureRewardNftWod] = useState(0);
  const [pasttreasureRewardNftBetaPass, setpastTreasureRewardNftBetaPass] =
    useState(0);

  const [confluxRewardsUSD, setConfluxRewardsUSD] = useState(0);
  const [dypiusRewardsUSD, setDypiusRewardsUSD] = useState(0);
  const [coingeckoRewardsUSD, setcoingeckoRewardsUSD] = useState(0);
  const [pastSpecialRewards, setpastSpecialRewards] = useState(0);

  const [gateRewardsUSD, setGateRewardsUSD] = useState(0);
  const [baseRewardsUSD, setBaseRewardsUSD] = useState(0);

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

  const getStakesIds = async () => {
    let stakenft = [];

    if (address) {
      const contract = new window.infuraWeb3.eth.Contract(
        window.WOD_CAWS_ABI,
        window.config.wod_caws_address
      );
      const allCawsStakes = await contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    }
  };

  const getStakesIdsLandPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const getStakesIdsCawsPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const fetchMonthlyGenesisRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].statValue;
      setgenesisData(userPosition);
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

  const getTreasureChestsInfo = async () => {
    var nftCawsResult = 0;
    var nftLandResult = 0;
    var nftBPResult = 0;
    var moneyResult = 0;
    // if (openedChests && openedChests.length > 0) {
    //   for (let i = 0; i < openedChests.length; i++) {
    //     if (
    //       openedChests[i].rewards.find((obj) => obj.rewardType === "Points")
    //     ) {
    //       pointsResult += Number(openedChests[i].reward);
    //     }
    //     if (openedChests[i].rewards.find((obj) => obj.rewardType === "Money")) {
    //       if (
    //         !openedChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //           ?.details
    //       ) {
    //         moneyResult += Number(
    //           openedChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //             .reward
    //         );
    //       }
    //     }
    //     if (openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")) {
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "WoD"
    //       ) {
    //         nftLandResult++;
    //       }
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "CAWS"
    //       ) {
    //         nftCawsResult++;
    //       }
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "BetaPass"
    //       ) {
    //         nftBPResult++;
    //       }
    //     }
    //   }
    // }

    // if (openedSkaleChests && openedSkaleChests.length > 0) {
    //   for (let i = 0; i < openedSkaleChests.length; i++) {
    //     if (
    //       openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Points")
    //     ) {
    //       pointsResult += Number(openedSkaleChests[i].reward);
    //     }
    //     if (openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")) {
    //       if (
    //         !openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //           ?.details
    //       ) {
    //         moneyResult += Number(
    //           openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //             .reward
    //         );
    //       }
    //     }
    //     if (openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")) {
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "WoD"
    //       ) {
    //         nftLandResult++;
    //       }
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "CAWS"
    //       ) {
    //         nftCawsResult++;
    //       }
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "BetaPass"
    //       ) {
    //         nftBPResult++;
    //       }
    //     }
    //   }
    // }

    if (allChests && allChests.length > 0) {
      allChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "NFT" && innerChest.reward === "WoD" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftLandResult ++;
              }
              if (
                innerChest.rewardType === "NFT" && innerChest.reward === "CAWS" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftCawsResult ++;
              } if (
                innerChest.rewardType === "NFT" && innerChest.reward === "BetaPass" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftBPResult ++;
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
                innerChest.status !== "Unclaimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "NFT" && innerChest.reward === "WoD" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftLandResult ++;
              }
              if (
                innerChest.rewardType === "NFT" && innerChest.reward === "CAWS" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftCawsResult ++;
              } if (
                innerChest.rewardType === "NFT" && innerChest.reward === "BetaPass" &&
                innerChest.status !== "Unclaimed"
              ) {
                nftBPResult ++;
              }

            });
          }
        }
      });
    }

    setTreasureRewardMoney(moneyResult);
    setTreasureRewardNftCaws(nftCawsResult);
    setTreasureRewardNftWod(nftLandResult);
    setTreasureRewardNftBetaPass(nftBPResult);
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
    fetchMonthlyGenesisRecordsAroundPlayer();
  }, [userId, bundlesBought]);

  useEffect(() => {
    getTreasureChestsInfo();
  }, [openedChests, openedSkaleChests]);

  useEffect(() => {
    getBundles();
    fetchNftRewards(address);
    fetchGenesisGem(address);
    fetchLeaderboardData(address);
    fetchConfluxUSDRewards(address);
    fetchGateUSDRewards(address);
    fetchBaseUSDRewards(address);
    fetchDypiusUSDRewards(address);
    fetchCoingeckoUSDRewards(address);
    fetchPastSpecialRewards(address);
    fetchPastDailyBonusMoney(address);
    fetchPastDailyBonusBetaPass(address);
    fetchPastDailyBonusCaws(address);
    fetchCachedData();
  }, [address, email]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-grid rewardstable-wrapper">
        <table className="myrewards-table table">
          <thead>
            <tr>
              <th className="col-3 myrewards-th border-0">Reward Category</th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Available Rewards
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Reward Type
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Total Earned
              </th>
            </tr>
          </thead>

          <tbody className="position-relative myrewards-tbody">
            <tr>
              <td className="myrewards-td-main border-0">
                <img src={nftStake} alt="" style={{ width: 24, height: 24 }} />{" "}
                NFT Staking
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Land
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodRewards, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                WoD Land & CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodCawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {`$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {getFormattedNumber(0, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(cawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={treasureHunt}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Treasure Hunt
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards &&
                  `$${getFormattedNumber(
                    userEarnUsd + confluxRewardsUSD + gateRewardsUSD,
                    2
                  )}`}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CoinGecko
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(coingeckoRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Conflux Network
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(0 / cfxPrice, 4)} CFX`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(confluxRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Gate.io
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(gateRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Base
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(0, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(0, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(baseRewardsUSD, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dypius
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(0, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(0, 4)} DYP
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(dypiusRewardsUSD, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dogecoin
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(dogeEarnUSD, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(dogeEarnBNB, 2)} DOGE
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CoinMarketCap
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(cmcuserEarnUsd, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(cmcuserEarnETH, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dypius Premium
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                ${getFormattedNumber(dypiusPremiumEarnUsd, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(dypiusPremiumEarnTokens, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={leaderboard}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Leaderboard
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Daily/Weekly/Monthly
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(
                      dailyplayerData + weeklyplayerData + userRank2,
                      2
                    )}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      (dailyplayerData + weeklyplayerData + userRank2) /
                        bnbPrice,
                      4
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(leaderboardTotalData, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={dailyBonus}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Daily Bonus
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Treasure Chests
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {"$" + getFormattedNumber(treasureRewardMoney, 2)}
                <br />
                {treasureRewardNftBetaPass + " " + "BetaPass NFT"}
                <br />
                {treasureRewardNftCaws + " " + "CAWS NFT"}
                <br />
                {treasureRewardNftWod + " " + "WoD NFT"}
                <br />
              </td>
              <td className="myrewards-td-second border-0 text-center">
                USD/NFT
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {"$" + getFormattedNumber(pasttreasureRewardMoney, 2)}
                <br />
                {pasttreasureRewardNftBetaPass + " " + "BetaPass NFT"}
                <br />
                {pasttreasureRewardNftCaws + " " + "CAWS NFT"}
                <br />
                {pasttreasureRewardNftWod + " " + "WoD NFT"}
                <br />
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={specialRewards}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Special Rewards
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Social Bonus
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                ${getFormattedNumber(userSocialRewardsCached, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(userSocialRewardsCached / bnbPrice, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(pastSpecialRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={criticalHit}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Critical Hit
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Gem
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(genesisData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(genesisData / bnbPrice, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(gemRewards, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-separator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Available Rewards:</span>
            <span className="rightlight-text">
              The amount of rewards available to be withdrawn.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Reward Type:</span>
            <span className="rightlight-text">
              The type of reward distribution.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text ">Total Earned:</span>
            <span className="rightlight-text">
              The total rewards already distributed.
            </span>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h4
            className={
              previousRewards ? "all-past-total-earned" : "all-total-earned"
            }
          >
            $
            {getFormattedNumber(
              Number(gemRewards) +
                Number(leaderboardTotalData) +
                Number(gateRewardsUSD) +
                Number(confluxRewardsUSD) +
                Number(dypiusRewardsUSD) +
                Number(pastSpecialRewards) +
                Number(coingeckoRewardsUSD) +
                Number(baseRewardsUSD) +
                Number(cawsRewards) +
                Number(wodCawsRewards) +
                Number(pasttreasureRewardMoney) +
                Number(wodRewards),
              2
            )}
          </h4>
          <span
            className={
              previousRewards
                ? "all-past-total-earned-subtitle"
                : "all-total-earned-subtitle"
            }
          >
            Total Earned
          </span>
        </div>
      </div>
      {/* <div className="optionsWrapper2 p-2">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between gap-2 align-items-center">
            <span className="viewWinners">View past rewards</span>
            <Switch
              {...label}
              onChange={() => {
                setPreviousRewards(!previousRewards);
              }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyRewardsPopup;
