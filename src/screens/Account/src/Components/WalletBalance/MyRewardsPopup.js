import React, { useEffect, useState } from "react";
import criticalHit from "./myrewardsAssets/criticalHit.png";
import dailyBonus from "./myrewardsAssets/dailyBonus.png";
import leaderboard from "./myrewardsAssets/leaderboard.png";
import nftStake from "./myrewardsAssets/nftStake.png";
import treasureHunt from "./myrewardsAssets/treasureHunt.png";
import Switch from "@mui/material/Switch";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import greenInfo from "./assets/greenInfo.svg";
import OutsideClickHandler from "react-outside-click-handler";

const MyRewardsPopup = ({
  username,
  userId,
  address,
  email,
  bnbPrice,
  cfxPrice,
  ethTokenData,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [previousRewards, setPreviousRewards] = useState(false);
  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const [dailyplayerData, setdailyplayerData] = useState(0);
  const [weeklyplayerData, setweeklyplayerData] = useState(0);
  const [monthlyplayerData, setmonthlyplayerData] = useState(0);
  const [genesisData, setgenesisData] = useState(0);

  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);

  const [bundlesBought, setbundlesBought] = useState(0);

  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnUsdPrevious, setuserEarnUsdPrevious] = useState(0);

  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnUSDPrevious, setConfluxEarnUSDPrevious] = useState(0);

  const [gateEarnUSD, setgateEarnUSD] = useState(0);
  const [gateEarnUSDPrevious, setgateEarnUSDPrevious] = useState(0);

  const [EthRewards, setEthRewards] = useState(0);
  const [EthRewardsLandPool, setEthRewardsLandPool] = useState(0);
  const [EthRewardsCawsPool, setEthRewardsCawsPool] = useState(0);

  const dailyPrizes = [10, 8, 5, 5, 0, 0, 0, 0, 0, 0];

  const dailyPrizesGolden = [10, 8, 5, 5, 5, 5, 5, 5, 5, 5];

  const weeklyPrizes = [25, 15, 10, 8, 0, 0, 0, 0, 0, 0];

  const weeklyPrizesGolden = [25, 15, 10, 8, 5, 5, 5, 5, 5, 5, 5];

  const monthlyPrizes = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const monthlyPrizesGolden = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);
  const [tooltip3, setTooltip3] = useState(false);

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
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

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;
    const contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );
    if (address) {
      if (myStakes.length > 0) {
        let rewards = await contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        let finalReward = 0;
        for (let i = 0; i < rewards.length; i++) {
          finalReward = rewards[i] / 1e18;
          result = result + Number(finalReward);
        }
      }
    }
    setEthRewards(result);
  };

  const calculateAllRewardsLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );
    if (address) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsLandPool(result);
  };

  const calculateAllRewardsCawsPool = async () => {
    let myStakes = await getStakesIdsCawsPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.NFTSTAKING_ABI,
      window.config.nftstaking_address
    );
    if (address) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsCawsPool(result);
  };

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify({
            email: email,
            publicAddress: userAddress,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.events) {
          const coingeckoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coingecko";
          });
          const confluxEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "conflux";
          });

          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });

          const usdValue_previous =
            coingeckoEvent[0].reward.earn.total /
            coingeckoEvent[0].reward.earn.multiplier;
          setuserEarnUsdPrevious(usdValue_previous);

          const usdValue =
            coingeckoEvent[0].reward.earn.value /
            coingeckoEvent[0].reward.earn.multiplier;
          setuserEarnUsd(usdValue);

          if (confluxEvent[0].reward.earn.multiplier !== 0) {
            const cfxUsdValue_previous =
              confluxEvent[0].reward.earn.total /
              confluxEvent[0].reward.earn.multiplier;
            setConfluxEarnUSDPrevious(cfxUsdValue_previous);

            const cfxUsdValue =
              confluxEvent[0].reward.earn.value /
              confluxEvent[0].reward.earn.multiplier;
            setConfluxEarnUSD(cfxUsdValue);
          }

          if (gateEvent[0].reward.earn.multiplier !== 0) {
            const gateUsdValue_previous =
              gateEvent[0].reward.earn.total /
              gateEvent[0].reward.earn.multiplier;
            setgateEarnUSDPrevious(gateUsdValue_previous);

            const gateUsdValue =
              gateEvent[0].reward.earn.value /
              gateEvent[0].reward.earn.multiplier;
            setgateEarnUSD(gateUsdValue);
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchDailyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setpreviousVersion(parseInt(result.data.data.version));

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position + 1;

      if (bundlesBought > 0) {
        setdailyplayerData(
          userPosition > 10
            ? 0
            : dailyPrizes[userPosition] + dailyPrizesGolden[userPosition]
        );
      } else if (bundlesBought === 0) {
        setdailyplayerData(userPosition > 10 ? 0 : dailyPrizes[userPosition]);
      }
    }
  };

  const fetchWeeklyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setpreviousWeeklyVersion(parseInt(result.data.data.version));

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position + 1;
      if (bundlesBought > 0) {
        setweeklyplayerData(
          userPosition > 10
            ? 0
            : weeklyPrizes[userPosition] + weeklyPrizesGolden[userPosition]
        );
      } else if (bundlesBought === 0) {
        setweeklyplayerData(userPosition > 10 ? 0 : weeklyPrizes[userPosition]);
      }
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setpreviousMonthlyVersion(parseInt(result.data.data.version));

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position + 1;
      if (bundlesBought > 0) {
        setmonthlyplayerData(
          userPosition > 10
            ? 0
            : monthlyPrizes[userPosition] + monthlyPrizesGolden[userPosition]
        );
      } else if (bundlesBought === 0) {
        setmonthlyplayerData(
          userPosition > 10 ? 0 : monthlyPrizes[userPosition]
        );
      }
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
      setpreviousGenesisVersion(parseInt(result.data.data.version));

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].statValue;
      setgenesisData(userPosition);
    }
  };

  const fetchPreviousWinners = async () => {
    let userPosition_daily = 0;
    let userPosition_genesis = 0;
    let userPosition_weekly = 0;
    let userPosition_monthly = 0;

    const data_daily = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousVersion - 1,
    };

    const result_daily = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data_daily
    );

    var testArray_daily = result_daily.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    if (testArray_daily.length > 0) {
      userPosition_daily = testArray_daily[0].position + 1;
    }

    const data_genesis = {
      StatisticName: "GenesisLandRewards",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousGenesisVersion - 1,
    };
    const result_genesis = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data_genesis
    );

    var testArray_genesis = result_genesis.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    if (testArray_genesis.length > 0) {
      userPosition_genesis = testArray_genesis[0].position + 1;
    }

    const data_weekly = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousWeeklyVersion - 1,
    };
    const result_weekly = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data_weekly
    );

    var testArray_weekly = result_weekly.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    if (testArray_weekly.length > 0) {
      userPosition_weekly = testArray_weekly[0].position + 1;
    }

    const data_monthly = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
      Version: previousMonthlyVersion - 1,
    };
    const result_monthly = await axios.post(
      `${backendApi}/auth/GetLeaderboard?Version=-1`,
      data_monthly
    );

    var testArray_monthly = result_monthly.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    if (testArray_monthly.length > 0) {
      userPosition_monthly = testArray_monthly[0].position + 1;
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  useEffect(() => {
    fetchDailyRecordsAroundPlayer();
    fetchWeeklyRecordsAroundPlayer();
    fetchMonthlyRecordsAroundPlayer();
    fetchMonthlyGenesisRecordsAroundPlayer();
  }, [userId]);

  useEffect(() => {
    getBundles();
    calculateAllRewards();
    calculateAllRewardsLandPool();
    calculateAllRewardsCawsPool();
  }, [address]);

  // useEffect(() => {
  //   if (
  //     previousGenesisVersion > 0 &&
  //     previousMonthlyVersion > 0 &&
  //     previousVersion > 0 &&
  //     previousWeeklyVersion > 0
  //   ) {
  //     fetchPreviousWinners();
  //   }
  // }, [
  //   previousGenesisVersion,
  //   previousMonthlyVersion,
  //   previousVersion,
  //   previousWeeklyVersion,
  // ]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-grid rewardstable-wrapper">
        <table className="myrewards-table table">
          <thead>
            <tr>
              <th className="myrewards-th border-0">Reward Category</th>
              <th className="myrewards-th border-0 text-center position-relative">
                Available Rewards
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setTooltip(false);
                  }}
                >
                  <img
                    src={greenInfo}
                    alt=""
                    className="tooltipicon headericon"
                    onClick={() => {
                      setTooltip(true);
                    }}
                  />
                </OutsideClickHandler>
                <div
                  className={`tooltip-wrapper2 p-2 col-11 ${
                    tooltip && "tooltip-active"
                  }`}
                  style={{ top: "-30px", right: "-175px" }}
                >
                  <p className="tooltip-content2 m-0">
                    The amount of rewards available to be withdrawn.
                  </p>
                </div>
              </th>
              <th className="myrewards-th border-0 text-center position-relative">
                Reward Type
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setTooltip2(false);
                  }}
                >
                  <img
                    src={greenInfo}
                    alt=""
                    className="tooltipicon headericon"
                    onClick={() => {
                      setTooltip2(true);
                    }}
                  />
                </OutsideClickHandler>
                <div
                  className={`tooltip-wrapper2 p-2 col-11 ${
                    tooltip2 && "tooltip-active"
                  }`}
                  style={{ top: "-30px", right: "-175px" }}
                >
                  <p className="tooltip-content2 m-0">
                    The type of reward distribution.
                  </p>
                </div>
              </th>
              <th className="myrewards-th border-0 text-center position-relative">
                Total Earned
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setTooltip3(false);
                  }}
                >
                  <img
                    src={greenInfo}
                    alt=""
                    className="tooltipicon headericon"
                    onClick={() => {
                      setTooltip3(true);
                    }}
                  />
                </OutsideClickHandler>
                <div
                  className={`tooltip-wrapper2 p-2 col-11 ${
                    tooltip3 && "tooltip-active"
                  }`}
                  style={{ top: "-30px", right: "-175px" }}
                >
                  <p className="tooltip-content2 m-0">
                    The total rewards already distributed.
                  </p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="position-relative">
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-main border-0">
                <img src={nftStake} alt="" style={{ width: 24, height: 24 }} />{" "}
                NFT Staking
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-second border-0">Genesis Land</td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(
                      EthRewardsLandPool * ethTokenData,
                      2
                    )}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(EthRewardsLandPool, 2)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : " $500.00"}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">WoD Land & CAWS </td>

              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(EthRewards * ethTokenData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(EthRewards, 2)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : " $500.00"}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0">CAWS </td>

              <td className="myrewards-td-second border-0 text-center">
                {`$${getFormattedNumber(EthRewardsCawsPool * ethTokenData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {getFormattedNumber(EthRewardsCawsPool, 2)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {"$500.00"}
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
                    userEarnUsdPrevious +
                      confluxEarnUSDPrevious +
                      gateEarnUSDPrevious,
                    2
                  )}`}
              </td>
            </tr>
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-second border-0">CoinGecko</td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(userEarnUsdPrevious, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      userEarnUsdPrevious / bnbPrice,
                      2
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(userEarnUsdPrevious, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">Conflux Network</td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(confluxEarnUSDPrevious, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      confluxEarnUSDPrevious / cfxPrice,
                      2
                    )} CFX`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(confluxEarnUSDPrevious, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">Gate.io</td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(gateEarnUSDPrevious, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      gateEarnUSDPrevious / bnbPrice,
                      2
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(gateEarnUSDPrevious, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">Base</td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {previousRewards ? "-" : "0"}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "0 ETH"}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "0.00"}
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
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-second border-0">Daily</td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards ? "-" : `$${dailyplayerData}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(dailyplayerData / bnbPrice, 2)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "$500.00"}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">Weekly</td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${weeklyplayerData}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      weeklyplayerData / bnbPrice,
                      2
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "$500.00"}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0">Monthly</td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {previousRewards ? "-" : `$${monthlyplayerData}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      monthlyplayerData / bnbPrice,
                      2
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "$500.00"}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={dailyBonus}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Daily Bonus
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-second border-0">Treasure Chests</td>
              <td className="myrewards-td-second border-0 specialCell topborder bottomborder text-center">
                {previousRewards ? "-" : "$120"}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : " 0.022 WBNB"}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "$500.00"}
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
            <div className="table-separator position-absolute"></div>

            <tr>
              <td className="myrewards-td-second border-0">Genesis Gem</td>
              <td className="myrewards-td-second border-0 specialCell topborder bottomborder text-center">
                {previousRewards ? "-" : `$${genesisData}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(genesisData / bnbPrice, 2)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : "$500.00"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-separator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <div className="d-flex flex-column">
          <h4
            className={
              previousRewards ? "all-past-total-earned" : "all-total-earned"
            }
          >
            $435.25
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
        <div className="d-flex flex-column">
          <h4
            className={
              previousRewards ? "all-past-total-earned" : "all-total-earned"
            }
          >
            $435.25
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
