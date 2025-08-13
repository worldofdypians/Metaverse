import React, { useState, useEffect } from "react";
import moment from "moment";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import Modal from "../../../../../components/General/Modal";
import { Tooltip } from "@mui/material";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import axios from "axios";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="d-flex gap-3 justify-content-center align-items-center">
      <div className="d-flex gap-1 align-items-baseline">
        <span>{days < 10 ? "0" + days : days}</span>
        <span style={{ fontSize: "13px" }}>days</span>
      </div>
      <div className="d-flex gap-1 align-items-baseline">
        <span>{hours < 10 ? "0" + hours : hours}</span>
        <span style={{ fontSize: "13px" }}>hours</span>
      </div>
      <div className="d-flex gap-1 align-items-baseline">
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <span style={{ fontSize: "13px" }}>minutes</span>
      </div>
      <span className="d-none">{seconds < 10 ? "0" + seconds : seconds}</span>
      <span className="d-none">seconds</span>
    </div>
  );
};

const renderer2 = ({ days, hours, minutes }) => {
  return (
    <h6 className="rewardstxtwod mb-0" style={{ color: "#F3BF09" }}>
      {days}d:{hours}h:{minutes}m
    </h6>
  );
};

const StakeWodDetails2 = ({
  isEOA,
  staking,
  apr,
  expiration_time,
  other_info,
  chainId,
  handleConnection,
  lockTime,
  listType,
  handleSwitchNetwork,
  expired,
  coinbase,
  fee,
  poolCap,
  isConnected,
  start_date,
  onSuccessfulStake,
  binanceW3WProvider,
  walletClient,
  publicClient,
  network_matchain,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
}) => {
  let { reward_token_wod, BigNumber } = window;
  let token_symbol = "WOD";

  // 8% apr 1M Cap in DYP, locktime 30days, dyp deposit & dyp rewards

  const refreshBalanceQuery = async (
    wallet,
    staking,
    queryFunc,
    publicClient
  ) => {
    if (publicClient) {
      return await publicClient.readContract({
        abi: window.CONSTANT_STAKING_WOD_ABI,
        address: staking._address,
        functionName: queryFunc,
        args: wallet ? [wallet] : [],
      });
    }
  };

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  // console.log(publicClient);
  function jsonToCsv(items) {
    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    let csv = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    return csv;
  }

  window.handleDownload = ({
    stakers,
    stakingTimes,
    lastClaimedTimes,
    stakedTokens,
  }) => {
    let list = [];
    stakers.forEach((staker, index) => {
      list.push({
        staker_address: staker,
        staking_timestamp_unix: stakingTimes[index],
        lastclaimed_timestamp_unix: lastClaimedTimes[index],
        staking_time: getDate(stakingTimes[index] * 1e3),
        lastclaimed_time: getDate(lastClaimedTimes[index] * 1e3),
        staked_tokens: stakedTokens[index],
      });
    });
    download("stakers-list.csv", jsonToCsv(list));

    function getDate(timestamp) {
      let a = new Date(timestamp);
      return a.toUTCString();
    }
  };

  const [token_balance, settoken_balance] = useState(0);
  const [pendingDivs, setpendingDivs] = useState("");

  const [cliffTime, setcliffTime] = useState("");
  const [stakingTime, setstakingTime] = useState("");
  const [depositedTokens, setdepositedTokens] = useState("");
  const [lastClaimedTime, setlastClaimedTime] = useState("");
  const [reInvestLoading, setreInvestLoading] = useState(false);
  const [reInvestStatus, setreInvestStatus] = useState("initial");
  const [depositAmount, setdepositAmount] = useState("");
  const [withdrawAmount, setwithdrawAmount] = useState("");
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");

  const [tvl, settvl] = useState("");
  const [tvlusd, settvlusd] = useState("");

  const [referralFeeEarned, setreferralFeeEarned] = useState("");
  // const [stakingOwner, setstakingOwner] = useState(null);
  const [usdPerToken, setusdPerToken] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [errorMsg2, seterrorMsg2] = useState("");
  const [errorMsg3, seterrorMsg3] = useState("");

  // const [settotal_stakers, setsettotal_stakers] = useState("");

  const [show, setshow] = useState(false);
  const [showWithdrawModal, setshowWithdrawModal] = useState(false);
  const [popup, setpopup] = useState(false);

  const [approvedAmount, setapprovedAmount] = useState("0.00");

  const [totalDeposited, settotalDeposited] = useState(0);
  const [canDeposit, setCanDeposit] = useState(true);

  // const [poolCapTooltip, setPoolCapTooltip] = useState(false);
  // const [quotaTooltip, setQuotaTooltip] = useState(false);
  // const [maxDepositTooltip, setMaxDepositTooltip] = useState(false);

  const refreshBalanceMatchId = async () => {
    try {
      let reward_token_wod_sc = new window.bscWeb3.eth.Contract(
        window.TOKEN_ABI,
        reward_token_wod._address
      );

      let _bal;
      if (chainId === "56" && coinbase && isConnected) {
        _bal = await reward_token_wod_sc.methods
          .balanceOf(coinbase)
          .call()
          .catch((e) => {
            console.error(e);
          });
      }

      if (staking && coinbase !== undefined && coinbase !== null) {
        let _pDivs = refreshBalanceQuery(
          coinbase,
          staking,
          "getTotalPendingDivs",
          publicClient
        );

        // let _tEarned = refreshBalanceQuery(
        //   coinbase,
        //   staking,
        //   "totalEarnedTokens",
        //   publicClient,
        //   false
        // );
        let _stakingTime = refreshBalanceQuery(
          coinbase,
          staking,
          "stakingTime",
          publicClient
        );
        let _dTokens = refreshBalanceQuery(
          coinbase,
          staking,
          "depositedTokens",
          publicClient
        );
        let _lClaimTime = refreshBalanceQuery(
          coinbase,
          staking,
          "lastClaimedTime",
          publicClient
        );
        let _rFeeEarned = refreshBalanceQuery(
          coinbase,
          staking,
          "totalReferralFeeEarned",
          publicClient
        );
        let _cliffTime = refreshBalanceQuery(
          undefined,
          staking,
          "LOCKUP_TIME",
          publicClient
        );

        let _tvl = await reward_token_wod_sc.methods
          .balanceOf(staking._address)
          .call()
          .catch((e) => {
            console.error(e);
          });
        let [
          token_balance,
          pendingDivs,
          // totalEarnedTokens,
          stakingTime,
          depositedTokens,
          lastClaimedTime,
          tvl,
          referralFeeEarned,
          clifftime,
          // total_stakers,
        ] = await Promise.all([
          _bal,
          _pDivs,
          // _tEarned,
          _stakingTime,
          _dTokens,
          _lClaimTime,
          _tvl,
          _rFeeEarned,
          _cliffTime,
          // tStakers,
        ]);

        let balance_formatted = new BigNumber(token_balance ?? 0)
          .div(1e18)
          .toString(10);
        settoken_balance(balance_formatted);

        let divs_formatted = new BigNumber(pendingDivs).div(1e18).toFixed(6);
        setpendingDivs(divs_formatted);

        // let earnedTokens_formatted = new BigNumber(totalEarnedTokens)
        //   .div(1e18)
        //   .toFixed(6);
        // settotalEarnedTokens(earnedTokens_formatted);
        setcliffTime(Number(clifftime));
        setstakingTime(Number(stakingTime));

        let depositedTokens_formatted = new BigNumber(depositedTokens)
          .div(1e18)
          .toString(10);

        setdepositedTokens(depositedTokens_formatted);

        setlastClaimedTime(lastClaimedTime);

        let tvl_formatted = new BigNumber(tvl).div(1e18).toFixed(6);
        settvl(tvl_formatted);

        setreferralFeeEarned(referralFeeEarned);
        // setsettotal_stakers(total_stakers);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const showPopup = () => {
    setpopup(true);
  };

  const hidePopup = () => {
    setpopup(false);
  };

  const handleSecondTask = async (wallet) => {
    const result2 = await axios
      .get(`https://api.worldofdypians.com/api/dappbay/task2/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
    if (result2 && result2.status === 200) {
      console.log(result2);
    }
  };

  const getPriceDYP = async () => {
    const dypprice = await axios
      .get(
        "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x7c81087310a228470db28c1068f0663d6bf88679"
      )
      .then((res) => {
        return res.data.data.attributes.base_token_price_usd;
      })
      .catch((e) => {
        console.log(e);
      });

    // let usdPerToken = await window.getPrice("defi-yield-protocol");
    setusdPerToken(dypprice);
  };

  const refreshBalance = async () => {
    if (window.WALLET_TYPE === "matchId") {
      refreshBalanceMatchId();
    } else {
      try {
        let reward_token_wod_sc = new window.bscWeb3.eth.Contract(
          window.TOKEN_ABI,
          reward_token_wod._address
        );

        let _bal;
        if (chainId === "56" && coinbase && isConnected) {
          _bal = await reward_token_wod_sc.methods
            .balanceOf(coinbase)
            .call()
            .catch((e) => {
              console.error(e);
            });
        }
        if (staking && coinbase !== undefined && coinbase !== null) {
          let _pDivs = staking.getTotalPendingDivs(coinbase).catch((e) => {
            console.error(e);
          });

          // let _tEarned = staking.totalEarnedTokens(coinbase).catch((e) => {
          //   console.error(e);
          // });
          let _stakingTime = staking.stakingTime(coinbase).catch((e) => {
            console.error(e);
          });
          let _dTokens = staking.depositedTokens(coinbase).catch((e) => {
            console.error(e);
          });
          let _lClaimTime = staking.lastClaimedTime(coinbase).catch((e) => {
            console.error(e);
          });
          let _tvl = await reward_token_wod_sc.methods
            .balanceOf(staking._address)
            .call()
            .catch((e) => {
              console.error(e);
            });

          let _rFeeEarned = staking
            .totalReferralFeeEarned(coinbase)
            .catch((e) => {
              console.error(e);
            });
          let tStakers = staking.getNumberOfHolders().catch((e) => {
            console.error(e);
          });

          let [
            token_balance,
            pendingDivs,
            // totalEarnedTokens,
            stakingTime,
            depositedTokens,
            lastClaimedTime,
            tvl,
            referralFeeEarned,
            // total_stakers,
          ] = await Promise.all([
            _bal,
            _pDivs,
            // _tEarned,
            _stakingTime,
            _dTokens,
            _lClaimTime,
            _tvl,
            _rFeeEarned,
            tStakers,
          ]);

          let balance_formatted = new BigNumber(token_balance ?? 0)
            .div(1e18)
            .toString(10);
          settoken_balance(balance_formatted);

          let divs_formatted = new BigNumber(pendingDivs).div(1e18).toFixed(6);
          setpendingDivs(divs_formatted);

          // let earnedTokens_formatted = new BigNumber(totalEarnedTokens)
          //   .div(1e18)
          //   .toFixed(6);
          // settotalEarnedTokens(earnedTokens_formatted);

          setstakingTime(Number(stakingTime));

          let depositedTokens_formatted = new BigNumber(depositedTokens)
            .div(1e18)
            .toString(10);

          setdepositedTokens(depositedTokens_formatted);

          setlastClaimedTime(lastClaimedTime);

          let tvl_formatted = new BigNumber(tvl).div(1e18).toFixed(6);
          settvl(tvl_formatted);

          setreferralFeeEarned(referralFeeEarned);
          // setsettotal_stakers(total_stakers);

          //console.log({tvlUSD})

          // let stakingOwner = await staking.owner();
          // setstakingOwner(stakingOwner);
        }
      } catch (e) {
        console.error(e);
      }
      if (staking) {
        staking
          .LOCKUP_TIME()
          .then((cliffTime) => {
            setcliffTime(Number(cliffTime));
          })
          .catch(console.error);
      }
    }
  };

  useEffect(() => {
    getPriceDYP();
  }, []);

  useEffect(() => {
    if (chainId === "56") {
      refreshBalance();
      if (depositAmount !== "") {
        checkApproval(depositAmount);
      }
      getApprovedAmount();
    }
  }, [publicClient, coinbase, staking, isConnected, chainId]);

  useEffect(() => {
    setdepositAmount("");
    setdepositStatus("initial");
  }, [staking]);

  const handleApprove = async (e) => {
    // e.preventDefault();
    setdepositLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let reward_token_Sc = new ethers.Contract(
        reward_token_wod._address,
        window.TOKEN_ABI,
        signer
      );

      // await reward_token_wod
      //   .approve(staking._address, amount)
      //   .then(() => {
      //     setdepositLoading(false);
      //     setdepositStatus("deposit");
      //     refreshBalance();
      //     getApprovedAmount();
      //   })
      //   .catch((e) => {
      //     setdepositLoading(false);
      //     setdepositStatus("fail");
      //     seterrorMsg(e?.message);
      //     setTimeout(() => {
      //       setdepositAmount("");
      //       setdepositStatus("initial");
      //       seterrorMsg("");
      //     }, 10000);
      //   });
      const txResponse = await reward_token_Sc
        .approve(staking._address, amount)
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });

      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setdepositLoading(false);
          setdepositStatus("deposit");
          refreshBalance();
          getApprovedAmount();
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      let reward_token_Sc = new ethers.Contract(
        reward_token_wod._address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await reward_token_Sc
        .approve(staking._address, amount)
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setdepositLoading(false);
          setdepositStatus("deposit");
          refreshBalance();
          getApprovedAmount();
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = depositAmount;
        amount = new BigNumber(amount).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: reward_token_wod._address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [staking._address, amount],
          })
          .catch((e) => {
            setdepositLoading(false);
            setdepositStatus("fail");
            seterrorMsg(e?.shortMessage);
            setTimeout(() => {
              setdepositAmount("");
              setdepositStatus("initial");
              seterrorMsg("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setdepositLoading(false);
            setdepositStatus("deposit");
            refreshBalance();
            getApprovedAmount();
          }
        }
      }
    }
  };
  // console.log(staking)
  const handleStake = async (e) => {
    setdepositLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      if (
        staking._address.toLowerCase() ===
        window.config.constant_staking_wod5_address.toLowerCase()
      ) {
        window.alertify.error("You must be connected to Binance Wallet!");
        setdepositLoading(false);
        return;
      }
      if (other_info) {
        window.$.alert("This pool no longer accepts deposits!");
        setdepositLoading(false);

        return;
      }

      // await staking
      //   .stake(amount, referrer)
      //   .then(() => {
      //     // handleSecondTask(coinbase);
      //     setdepositLoading(false);
      //     setdepositStatus("success");
      //     refreshBalance();
      //     getApprovedAmount();
      //     onSuccessfulStake();
      //     setTimeout(() => {
      //       setdepositStatus("initial");
      //       setdepositAmount("");
      //     }, 5000);
      //   })
      //   .catch((e) => {
      //     setdepositLoading(false);
      //     setdepositStatus("fail");
      //     seterrorMsg(e?.message);
      //     setTimeout(() => {
      //       setdepositAmount("");
      //       setdepositStatus("fail");
      //       seterrorMsg("");
      //     }, 10000);
      //   });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        signer
      );

      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);

      let referrer = window.config.ZERO_ADDRESS;

      const txResponse = await staking_Sc.stake(amount, referrer).catch((e) => {
        setdepositLoading(false);
        setdepositStatus("fail");
        seterrorMsg(e?.message);
        setTimeout(() => {
          setdepositAmount("");
          setdepositStatus("fail");
          seterrorMsg("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setdepositLoading(false);
          setdepositStatus("success");
          refreshBalance();
          getApprovedAmount();
          onSuccessfulStake();
          setTimeout(() => {
            setdepositStatus("initial");
            setdepositAmount("");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      if (other_info) {
        window.$.alert("This pool no longer accepts deposits!");
        setdepositLoading(false);

        return;
      }
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        binanceW3WProvider.getSigner()
      );

      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);

      let referrer = window.config.ZERO_ADDRESS;

      const txResponse = await staking_Sc.stake(amount, referrer).catch((e) => {
        setdepositLoading(false);
        setdepositStatus("fail");
        seterrorMsg(e?.message);
        setTimeout(() => {
          setdepositAmount("");
          setdepositStatus("fail");
          seterrorMsg("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setdepositLoading(false);
          setdepositStatus("success");
          refreshBalance();
          getApprovedAmount();
          onSuccessfulStake();
          setTimeout(() => {
            setdepositStatus("initial");
            setdepositAmount("");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = depositAmount;
        amount = new BigNumber(amount).times(1e18).toFixed(0);

        let referrer = window.config.ZERO_ADDRESS;

        const result = await walletClient
          .writeContract({
            address: staking._address,
            abi: window.CONSTANT_STAKING_WOD_ABI,
            functionName: "stake",
            args: [amount, referrer],
          })
          .catch((e) => {
            setdepositLoading(false);
            setdepositStatus("fail");
            seterrorMsg(e?.shortMessage);
            setTimeout(() => {
              setdepositAmount("");
              setdepositStatus("fail");
              seterrorMsg("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            // handleSecondTask(coinbase);
            setdepositLoading(false);
            setdepositStatus("success");
            refreshBalance();
            getApprovedAmount();
            onSuccessfulStake();
            setTimeout(() => {
              setdepositStatus("initial");
              setdepositAmount("");
            }, 5000);
          }
        }
      }
    }
  };

  const handleWithdraw = async (e) => {
    // e.preventDefault();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      // let amount = new BigNumber(withdrawAmount).times(1e18).toFixed(0);
      // setwithdrawLoading(true);

      // staking
      //   .unstake(amount)
      //   .then(() => {
      //     setwithdrawLoading(false);
      //     setwithdrawStatus("success");
      //     refreshBalance();
      //     onSuccessfulStake();
      //     setTimeout(() => {
      //       setwithdrawStatus("initial");
      //       setwithdrawAmount("");
      //     }, 5000);
      //   })
      //   .catch((e) => {
      //     setwithdrawLoading(false);
      //     setwithdrawStatus("failed");
      //     seterrorMsg3(e?.message);

      //     setTimeout(() => {
      //       setwithdrawStatus("initial");
      //       seterrorMsg3("");
      //       setwithdrawAmount("");
      //     }, 10000);
      //   });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        signer
      );

      let amount = new BigNumber(withdrawAmount).times(1e18).toFixed(0);
      setwithdrawLoading(true);

      const txResponse = await staking_Sc.unstake(amount).catch((e) => {
        setwithdrawLoading(false);
        setwithdrawStatus("failed");
        seterrorMsg3(e?.message);

        setTimeout(() => {
          setwithdrawStatus("initial");
          seterrorMsg3("");
          setwithdrawAmount("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setwithdrawLoading(false);
          setwithdrawStatus("success");
          refreshBalance();
          onSuccessfulStake();
          setTimeout(() => {
            setwithdrawStatus("initial");
            setwithdrawAmount("");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        binanceW3WProvider.getSigner()
      );

      let amount = new BigNumber(withdrawAmount).times(1e18).toFixed(0);
      setwithdrawLoading(true);

      const txResponse = await staking_Sc.unstake(amount).catch((e) => {
        setwithdrawLoading(false);
        setwithdrawStatus("failed");
        seterrorMsg3(e?.message);

        setTimeout(() => {
          setwithdrawStatus("initial");
          seterrorMsg3("");
          setwithdrawAmount("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setwithdrawLoading(false);
          setwithdrawStatus("success");
          refreshBalance();
          onSuccessfulStake();
          setTimeout(() => {
            setwithdrawStatus("initial");
            setwithdrawAmount("");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new BigNumber(withdrawAmount).times(1e18).toFixed(0);
        setwithdrawLoading(true);

        const result = await walletClient
          .writeContract({
            address: staking._address,
            abi: window.CONSTANT_STAKING_WOD_ABI,
            functionName: "unstake",
            args: [amount],
          })
          .catch((e) => {
            setwithdrawLoading(false);
            setwithdrawStatus("failed");
            seterrorMsg3(e?.shortMessage);

            setTimeout(() => {
              setwithdrawStatus("initial");
              seterrorMsg3("");
              setwithdrawAmount("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setwithdrawLoading(false);
            setwithdrawStatus("success");
            refreshBalance();
            onSuccessfulStake();
            setTimeout(() => {
              setwithdrawStatus("initial");
              setwithdrawAmount("");
            }, 5000);
          }
        }
      }
    }
  };

  const handleClaimDivs = async (e) => {
    // e.preventDefault();
    setclaimLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      // staking
      //   .claim()
      //   .then(() => {
      //     setclaimStatus("success");
      //     setclaimLoading(false);
      //     setpendingDivs(getFormattedNumber(0, 6));
      //     refreshBalance();
      //     setTimeout(() => {
      //       setclaimStatus("initial");
      //     }, 5000);
      //   })
      //   .catch((e) => {
      //     setclaimStatus("failed");
      //     setclaimLoading(false);
      //     seterrorMsg2(e?.message);

      //     setTimeout(() => {
      //       setclaimStatus("initial");
      //       seterrorMsg2("");
      //     }, 10000);
      //   });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        signer
      );

      const txResponse = await staking_Sc.claim().catch((e) => {
        setclaimStatus("failed");
        setclaimLoading(false);
        seterrorMsg2(e?.message);

        setTimeout(() => {
          setclaimStatus("initial");
          seterrorMsg2("");
        }, 10000);
      });

      if (txResponse) {
        const txReceipt = await txResponse.wait().catch((e) => {
          console.log(e);
        });
        if (txReceipt) {
          setclaimStatus("success");
          setclaimLoading(false);
          setpendingDivs(getFormattedNumber(0, 6));
          refreshBalance();
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await staking_Sc.claim().catch((e) => {
        setclaimStatus("failed");
        setclaimLoading(false);
        seterrorMsg2(e?.message);

        setTimeout(() => {
          setclaimStatus("initial");
          seterrorMsg2("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setclaimStatus("success");
          setclaimLoading(false);
          setpendingDivs(getFormattedNumber(0, 6));
          refreshBalance();
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: staking._address,
            abi: window.CONSTANT_STAKING_WOD_ABI,
            functionName: "claim",
            args: [],
          })
          .catch((e) => {
            setclaimStatus("failed");
            setclaimLoading(false);
            seterrorMsg2(e?.shortMessage);

            setTimeout(() => {
              setclaimStatus("initial");
              seterrorMsg2("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setclaimStatus("success");
            setclaimLoading(false);
            setpendingDivs(getFormattedNumber(0, 6));
            refreshBalance();
            setTimeout(() => {
              setclaimStatus("initial");
            }, 5000);
          }
        }
      }
    }
  };

  const handleSetMaxDeposit = (e) => {
    const depositAmount = token_balance;
    checkApproval(depositAmount);
    setdepositAmount(depositAmount);
  };

  const handleSetMaxWithdraw = async (e) => {
    // e.preventDefault();
    if (window.WALLET_TYPE === "matchId") {
      let amount;
      await refreshBalanceQuery(
        coinbase,
        staking,
        "depositedTokens",
        publicClient
      ).then((data) => {
        amount = data;
      });
      let depositedTokens_formatted = new BigNumber(amount)
        .div(1e18)
        .toString(10);
      setwithdrawAmount(depositedTokens_formatted);
    } else {
      let amount;
      await staking.depositedTokens(coinbase).then((data) => {
        amount = data;
      });

      let depositedTokens_formatted = new BigNumber(amount)
        .div(1e18)
        .toString(10);
      setwithdrawAmount(depositedTokens_formatted);
    }
  };

  const getApproxReturn = (depositAmount) => {
    const expirationDate = new Date("2025-11-27T23:11:00.000+02:00");
    const expirationDate2 = new Date("2025-12-11T23:11:00.000+02:00");

    const currentDate = new Date();
    const timeDifference =
      staking._address === "0x5d35E4fC8624453A539eB261728aF5CDAbF4F652"
        ? expirationDate2 - currentDate
        : expirationDate - currentDate;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysUntilExpiration = Math.floor(timeDifference / millisecondsInADay);

    return ((depositAmount * apr) / 100 / 365) * daysUntilExpiration;
  };

  const getApprovedAmount = async () => {
    if (coinbase) {
      if (window.WALLET_TYPE !== "matchId") {
        const result = await window
          .checkapproveStakePool(
            coinbase,
            reward_token_wod._address,
            staking._address
          )
          .then((data) => {
            console.log(data);
            return data;
          });

        let result_formatted = new BigNumber(result).div(1e18).toFixed(6);
        setapprovedAmount(result_formatted);
      } else if (window.WALLET_TYPE === "matchId") {
        if (publicClient) {
          const result = await publicClient
            .readContract({
              abi: window.TOKEN_ABI,
              address: reward_token_wod._address,
              functionName: "allowance",
              args: [coinbase, staking._address],
            })
            .then((data) => {
              return Number(data);
            })
            .catch((e) => {
              console.error(e);
              return 0;
            });
          let result_formatted = new BigNumber(result).div(1e18).toFixed(6);
          setapprovedAmount(result_formatted);
        }
      }
    }
  };

  const handleReinvest = async (e) => {
    // e.preventDefault();
    setreInvestStatus("invest");
    setreInvestLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      // staking
      //   .reInvest()
      //   .then(() => {
      //     setreInvestStatus("success");
      //     setreInvestLoading(false);
      //     setpendingDivs(getFormattedNumber(0, 6));
      //     refreshBalance();
      //     setTimeout(() => {
      //       setreInvestStatus("initial");
      //     }, 10000);
      //   })
      //   .catch((e) => {
      //     setreInvestStatus("failed");
      //     setreInvestLoading(false);
      //     seterrorMsg2(e?.message);

      //     setTimeout(() => {
      //       setreInvestStatus("initial");
      //       seterrorMsg2("");
      //     }, 10000);
      //   });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        signer
      );

      const txResponse = await staking_Sc.reInvest().catch((e) => {
        setreInvestStatus("failed");
        setreInvestLoading(false);
        seterrorMsg2(e?.message);

        setTimeout(() => {
          setreInvestStatus("initial");
          seterrorMsg2("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setreInvestStatus("success");
          setreInvestLoading(false);
          setpendingDivs(getFormattedNumber(0, 6));
          refreshBalance();
          setTimeout(() => {
            setreInvestStatus("initial");
          }, 10000);
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      let staking_Sc = new ethers.Contract(
        staking._address,
        window.CONSTANT_STAKING_WOD_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await staking_Sc.reInvest().catch((e) => {
        setreInvestStatus("failed");
        setreInvestLoading(false);
        seterrorMsg2(e?.message);

        setTimeout(() => {
          setreInvestStatus("initial");
          seterrorMsg2("");
        }, 10000);
      });
      if (txResponse) {
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setreInvestStatus("success");
          setreInvestLoading(false);
          setpendingDivs(getFormattedNumber(0, 6));
          refreshBalance();
          setTimeout(() => {
            setreInvestStatus("initial");
          }, 10000);
        }
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: staking._address,
            abi: window.CONSTANT_STAKING_WOD_ABI,
            functionName: "reInvest",
            args: [],
          })
          .catch((e) => {
            setreInvestStatus("failed");
            setreInvestLoading(false);
            seterrorMsg2(e?.shortMessage);

            setTimeout(() => {
              setreInvestStatus("initial");
              seterrorMsg2("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setreInvestStatus("success");
            setreInvestLoading(false);
            setpendingDivs(getFormattedNumber(0, 6));
            refreshBalance();
            setTimeout(() => {
              setreInvestStatus("initial");
            }, 10000);
          }
        }
      }
    }
  };

  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else {
      if (window.ethereum) {
        if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
          await handleSwitchNetworkhook("0x38")
            .then(() => {
              handleSwitchNetwork(56);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
          handleSwitchChainGateWallet(56);
        } else if (coinbase && window.WALLET_TYPE === "binance") {
          handleSwitchChainBinanceWallet(56);
        }
      } else if (coinbase && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(56);
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    }
  };

  let cliffTimeInWords = "lockup period";

  const focusInput = (field) => {
    document.getElementById(field).focus();
  };

  let canWithdraw = true;
  if (lockTime === "No Lock") {
    canWithdraw = true;
  }
  if (!isNaN(cliffTime) && !isNaN(stakingTime)) {
    if (
      Number(stakingTime) + Number(cliffTime) >= Date.now() / 1000 &&
      lockTime !== "No Lock"
    ) {
      canWithdraw = false;
      cliffTimeInWords = moment
        .duration(cliffTime - (Date.now() - stakingTime))
        .humanize(true);
    }
  }

  let tvl_usd = tvlusd / 1e18;

  // tvl_usd = tvl_usd + tvlDYPS;

  tvl_usd = getFormattedNumber(tvl_usd, 2);

  const checkApproval = async (amount) => {
    if (window.WALLET_TYPE === "matchId") {
      if (publicClient) {
        const result = await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: reward_token_wod._address,
            functionName: "allowance",
            args: [coinbase, staking._address],
          })
          .then((data) => {
            return Number(data);
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
        let result_formatted = new BigNumber(result).div(1e18).toFixed(6);

        if (
          Number(result_formatted) >= Number(amount) &&
          Number(result_formatted) !== 0
        ) {
          setdepositStatus("deposit");
        } else {
          setdepositStatus("initial");
        }
      }
    } else {
      const result = await window
        .checkapproveStakePool(
          coinbase,
          reward_token_wod._address,
          staking._address
        )
        .then((data) => {
          console.log(data);
          return data;
        });

      let result_formatted = new BigNumber(result).div(1e18).toFixed(6);

      if (
        Number(result_formatted) >= Number(amount) &&
        Number(result_formatted) !== 0
      ) {
        setdepositStatus("deposit");
      } else {
        setdepositStatus("initial");
      }
    }
  };

  const getAvailableQuota = async () => {
    if (staking && staking._address) {
      const stakingSc = new window.bscWeb3.eth.Contract(
        window.CONSTANT_STAKING_WOD_ABI,
        staking._address
      );
      const totalDeposited = await stakingSc.methods
        .totalDeposited()
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totalDeposited_formatted = new BigNumber(totalDeposited)
        .div(1e18)
        .toFixed(6);

      settotalDeposited(totalDeposited_formatted);
    }
  };

  useEffect(() => {
    const result = Number(depositAmount) + Number(totalDeposited);
    if (result > poolCap && isEOA) {
      seterrorMsg(
        "Deposit amount is greater than available quota. Please add another amount."
      );
      setCanDeposit(false);
    } else if (isEOA && result <= poolCap) {
      seterrorMsg("");
      setCanDeposit(true);
    }
  }, [depositAmount, totalDeposited, poolCap, isEOA]);

  useEffect(() => {
    getAvailableQuota();
  }, [staking, poolCap]);

  useEffect(() => {
    if (!isEOA && isConnected && coinbase) {
      seterrorMsg("Smart contract wallets are not supported for this action.");
    } else if (isEOA && isConnected && coinbase) {
      seterrorMsg("");
    }
  }, [isEOA, isConnected, coinbase]);

  return (
    <div className={`p-0 ${listType === "list" && "pt-4"} `}>
      <div
        className={`allwrappercaws allwrapper-active mb-0 position-relative`}
      >
        <div className="pools-details-wrapper d-flex m-0 border-0 ">
          <div
            className={` ${
              listType === "list" ? "row" : "d-flex flex-column"
            } w-100 justify-content-between`}
          >
            <div
              className={`otherside-border pt-0 px-0  ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${expired === true && "blurrypool"} `}
            >
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 deposit-txt">Deposit</h6>

                {/* <div className="d-flex align-items-center gap-1">
                  <div
                    className="info-pool-wrapper p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPopup();
                    }}
                  >
                    <h6 className="m-0 mybalance-text d-flex align-items-center gap-1">
                      <img src={statsIcon} alt="" /> Details
                    </h6>
                  </div>

                  <div className="info-pool-wrapper p-2">
                    <h6 className="m-0 mybalance-text">
                      Balance:{" "}
                      <b>
                        {token_balance !== "..."
                          ? getFormattedNumber(token_balance, 2)
                          : getFormattedNumber(0, 2)}{" "}
                        {token_symbol}
                      </b>
                    </h6>
                  </div>
                </div> */}
                {/* <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {"Deposit your Genesis NFTs to the staking smart contract."}
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip> */}
              </div>
              <div className="d-flex flex-column gap-3 justify-content-between">
                <div className="d-flex flex-column gap-1 w-100">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="position-relative w-100 d-flex">
                      <input
                        type="number"
                        autoComplete="off"
                        value={
                          Number(depositAmount) > 0
                            ? depositAmount
                            : depositAmount
                        }
                        onChange={(e) => {
                          setdepositAmount(e.target.value);
                          checkApproval(e.target.value);
                        }}
                        placeholder="Minimum 0.001 WOD"
                        className="text-input2 w-100"
                        name="amount_deposit"
                        id="amount_deposit"
                        key="amount_deposit"
                      />

                      <button
                        className="inner-max-btn position-absolute"
                        onClick={handleSetMaxDeposit}
                      >
                        Max
                      </button>
                    </div>
                  </div>
                  <div className="d-flex pe-3 align-items-center gap-2 justify-content-end">
                    <span
                      className="bal-smallTxt"
                      style={{ fontSize: 12, color: "#c0c9ff" }}
                    >
                      Approved:
                    </span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      <span
                        className="deposit-popup-txt d-flex align-items-center gap-1"
                        style={{
                          fontSize: 12,
                          color: "#c0c9ff",
                          fontWeight: 300,
                        }}
                      >
                        {getFormattedNumber(approvedAmount, 2)} WOD
                      </span>
                    </span>
                  </div>
                </div>
                <div className="info-pool-wrapper p-3 w-100">
                  <div className="d-flex w-100 justify-content-between align-items-start align-items-lg-center gap-2 flex-column flex-lg-row">
                    {/* <div className="d-flex flex-column"> */}
                    {/* <div className="d-flex align-items-center gap-2">
                  <span className="bal-smallTxt">Pool Cap:</span>
                  <span className="deposit-popup-txt d-flex align-items-center gap-1">
                  {getFormattedNumber(poolCap, 2)} WOD
                    <ClickAwayListener onClickAway={poolCapClose}>
                      <Tooltip
                        open={poolCapTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="top"
                        title={
                          <div className="tooltip-text">
                            {
                              "The maximum amount of funds that can be staked in the pool."
                            }
                          </div>
                        }
                      >
                        <img src={moreinfo} alt="" onClick={poolCapOpen} />
                      </Tooltip>
                    </ClickAwayListener>
                  </span>
                </div> */}
                    {/* <div className="d-flex align-items-center gap-2">
                  <span className="bal-smallTxt">Available Quota:</span>
                  <span className="deposit-popup-txt d-flex align-items-center gap-1">
                  {getFormattedNumber(availableQuota, 2)} WOD
                    <ClickAwayListener onClickAway={quotaClose}>
                      <Tooltip
                        open={quotaTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="top"
                        title={
                          <div className="tooltip-text">
                            {"The remaining capacity for staking in the pool."}
                          </div>
                        }
                      >
                        <img src={moreinfo} alt="" onClick={quotaOpen} />
                      </Tooltip>
                    </ClickAwayListener>
                  </span>
                </div> */}
                    {/* <div className="d-flex align-items-center gap-2">
                  <span className="bal-smallTxt">Maximum deposit:</span>
                  <span className="deposit-popup-txt d-flex align-items-center gap-1">
                    N/A
                    <ClickAwayListener onClickAway={maxDepositClose}>
                      <Tooltip
                        open={maxDepositTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="top"
                        title={
                          <div className="tooltip-text">
                            {
                              "The highest amount that can be staked by an individual user."
                            }
                          </div>
                        }
                      >
                        <img src={moreinfo} alt="" onClick={maxDepositOpen} />
                      </Tooltip>
                    </ClickAwayListener>
                  </span>
                </div> */}
                    {/* </div> */}
                    <div className="d-flex gap-2 justify-content-between w-100 align-items-center">
                      <span className="bal-smallTxt">Total Est. Rewards</span>
                      <span className="deposit-popup-txt d-flex align-items-center gap-1">
                        <span
                          className="deposit-popup-txt d-flex align-items-center gap-1"
                          style={{
                            color:
                              depositAmount > 0 || depositAmount !== ""
                                ? "#00e5ff"
                                : "",
                          }}
                        >
                          {getFormattedNumber(
                            getApproxReturn(depositAmount),
                            2
                          )}{" "}
                          WOD
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={
                    chainId !== "56"
                      ? false
                      : depositAmount === "" ||
                        depositLoading === true ||
                        (isConnected && chainId === "56" && !isEOA)
                      ? true
                      : false
                  }
                  className={`btn w-100 ${
                    ((depositAmount === "" &&
                      isConnected &&
                      chainId === "56") ||
                      !isEOA) &&
                    "disabled-btn"
                  } ${
                    depositStatus === "initial" &&
                    depositAmount !== "" &&
                    isConnected &&
                    chainId === "56" &&
                    isEOA &&
                    "outline-btn-stake"
                  }  ${
                    ((depositStatus === "deposit" &&
                      isConnected &&
                      chainId === "56") ||
                      !isConnected) &&
                    "connectbtn"
                  } ${
                    depositStatus === "success"
                      ? "success-button"
                      : (depositStatus === "fail" || chainId !== "56") &&
                        isConnected
                      ? "fail-button"
                      : null
                  } d-flex justify-content-center align-items-center gap-2`}
                  onClick={() => {
                    !isConnected
                      ? handleConnection()
                      : isConnected && chainId !== "56"
                      ? handleEthPool()
                      : depositStatus === "deposit"
                      ? handleStake()
                      : depositStatus === "initial" &&
                        depositAmount !== "" &&
                        isEOA
                      ? handleApprove()
                      : console.log("");
                  }}
                >
                  {!isConnected ? (
                    <>Connect Wallet</>
                  ) : isConnected && chainId !== "56" ? (
                    <>Switch to BNB Chain</>
                  ) : depositLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : depositStatus === "initial" ? (
                    <>Approve</>
                  ) : depositStatus === "deposit" ? (
                    <>Deposit</>
                  ) : depositStatus === "success" ? (
                    <>Success</>
                  ) : (
                    <>
                      <img
                        src={"https://cdn.worldofdypians.com/wod/failMark.svg"}
                        alt=""
                      />
                      Failed
                    </>
                  )}
                </button>
              </div>
              {/* <div className="d-flex align-items-center gap-2">
                <span className="bal-smallTxt">Total Est. Rewards</span>
                <span className="deposit-popup-txt d-flex align-items-center gap-1">
                  <span className="deposit-popup-txt d-flex align-items-center gap-1">
                    {getFormattedNumber(getApproxReturn(depositAmount), 2)} WOD
                  </span>
                </span>
              </div> */}
              {errorMsg && <h6 className="errormsg w-100">{errorMsg}</h6>}
            </div>
            {depositedTokens > 0 && <div className="stake-separator"></div>}
            {depositedTokens > 0 && (
              <div
                className={`otherside-border ${
                  listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
                }  ${
                  (expired === true || chainId !== "56" || !isEOA) &&
                  "blurrypool"
                } `}
              >
                <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row">
                  <h6
                    className={
                      listType === "list"
                        ? "m-0 withdraw-txt align-items-center d-flex gap-2"
                        : "m-0 deposit-txt d-flex flex-column gap-2"
                    }
                  >
                    Earnings
                  </h6>
                  <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                    <Tooltip
                      placement="top"
                      title={
                        <div className="tooltip-text">
                          {
                            "Rewards earned by your deposit to the staking smart contract are displayed in real-time. The reinvest function does not reset the lock-in period."
                          }
                        </div>
                      }
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/more-info.svg"}
                        alt=""
                      />
                    </Tooltip>
                  </h6>
                </div>
                <div className="info-pool-wrapper p-2 d-flex flex-column justify-content-between">
                  {/* <h6 className={"m-0 mybalance-text d-flex"}>Rewards</h6> */}
                  <div className="form-row d-flex gap-2 align-items-center justify-content-between">
                    <h6 className="m-0 rewardstxtwod w-100 d-flex align-items-center gap-2">
                      {/* <img
                      src={wodToken}
                      alt=""
                      style={{ width: 18, height: 18 }}
                    />{" "} */}
                      {getFormattedNumber(pendingDivs, pendingDivs > 0 ? 6 : 2)}{" "}
                      WOD
                    </h6>
                    <div className="d-flex w-100 align-items-center gap-2">
                      <button
                        disabled={
                          claimStatus === "claimed" ||
                          claimStatus === "success" ||
                          pendingDivs <= 0 ||
                          !isEOA
                            ? //
                              true
                            : false
                        }
                        className={`btn w-100 outline-btn-stake ${
                          (claimStatus === "claimed" &&
                            claimStatus === "initial") ||
                          pendingDivs <= 0 ||
                          !isEOA
                            ? //
                              "disabled-btn"
                            : claimStatus === "failed"
                            ? "fail-button"
                            : claimStatus === "success"
                            ? "success-button"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        style={{ height: "fit-content" }}
                        onClick={() => {
                          handleClaimDivs();
                        }}
                      >
                        {claimLoading ? (
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : claimStatus === "failed" ? (
                          <>
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/failMark.svg"
                              }
                              alt=""
                            />
                            Failed
                          </>
                        ) : claimStatus === "success" ? (
                          <>Success</>
                        ) : (
                          <>Claim</>
                        )}
                      </button>
                      <button
                        disabled={pendingDivs > 0 && isEOA ? false : true}
                        className={`btn w-100 outline-btn-stake ${
                          reInvestStatus === "invest" ||
                          pendingDivs <= 0 ||
                          !isEOA
                            ? "disabled-btn"
                            : reInvestStatus === "failed"
                            ? "fail-button"
                            : reInvestStatus === "success"
                            ? "success-button"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        style={{ height: "fit-content" }}
                        onClick={handleReinvest}
                      >
                        {reInvestLoading ? (
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : reInvestStatus === "failed" ? (
                          <>
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/failMark.svg"
                              }
                              alt=""
                            />
                            Failed
                          </>
                        ) : reInvestStatus === "success" ? (
                          <>Success</>
                        ) : (
                          <>Reinvest</>
                        )}
                      </button>
                    </div>
                  </div>
                  {errorMsg2 && <h6 className="errormsg w-100">{errorMsg2}</h6>}
                </div>
              </div>
            )}
            {depositedTokens && depositedTokens > 0 && (
              <div className="stake-separator"></div>
            )}
            {depositedTokens && depositedTokens > 0 && (
              <div
                className={`otherside-border  ${
                  listType === "list" ? "col-12 col-md-6 col-lg-2" : "px-0"
                } ${chainId !== "56" && "blurrypool"} `}
              >
                <div className="d-flex flex-column gap-2">
                  <h6 className="m-0 deposit-txt d-flex align-items-center gap-2 justify-content-between">
                    My Deposit
                    {/* <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "Withdraw your deposited assets from the staking smart contract."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip> */}
                  </h6>
                  <div className="info-pool-wrapper p-2 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <div className="d-flex flex-column w-100">
                        <h6 className={"m-0 mybalance-text d-flex"}>
                          Unlocks in
                        </h6>
                        <div className="form-row d-flex gap-2 align-items-center justify-content-between">
                          <h6 className="m-0 rewardstxtwod d-flex align-items-center gap-2">
                            <Countdown
                              date={
                                (Number(stakingTime) + Number(cliffTime)) * 1000
                                // today.getTime()
                              }
                              renderer={renderer2}
                            />
                          </h6>
                        </div>
                      </div>

                      <button
                        disabled={!isEOA ? true : false}
                        className={"outline-btn-stake btn"}
                        onClick={() => {
                          setshowWithdrawModal(true);
                        }}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`info-pool-wrapper2 p-1 d-flex ${
                depositedTokens > 0
                  ? "justify-content-center"
                  : "justify-content-center"
              } `}
              style={{
                cursor: "pointer",
                width: depositedTokens > 0 ? "auto" : "fit-content",
              }}
              onClick={() => {
                showPopup();
              }}
            >
              <h6
                className="m-0 mybalance-text d-flex align-items-center gap-1"
                style={{ color: "#4ed5d2" }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/statsIcon.svg"}
                  alt=""
                />{" "}
                Details
              </h6>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <Modal
          visible={popup}
          modalId="tymodal"
          title="stats"
          onModalClose={() => {
            hidePopup();
          }}
          maxWidth={560}
        >
          <div className="earn-hero-content px-4 pb-4 token-wrapper">
            <div className="l-box pl-3 pr-3">
              <div className="container px-0">
                <div className="stats-container my-4">
                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">My WOD Deposit</span>
                    <h6 className="stats-card-content">
                      {getFormattedNumber(depositedTokens, 2)} WOD
                    </h6>
                  </div> */}
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Pool Cap</span>
                    <h6 className="stats-card-content">
                      {getFormattedNumber(poolCap, 2)} WOD
                    </h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Pool fee:</span>
                    <h6 className="stats-card-content">{fee}%</h6>
                  </div>
                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Available Quota:</span>
                    <h6 className="stats-card-content">
                      {getFormattedNumber(availableQuota, 2)} WOD
                    </h6>
                  </div> */}
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Maximum deposit:</span>
                    <h6 className="stats-card-content">N/A</h6>
                  </div>
                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">TVL USD</span>
                    <h6 className="stats-card-content">${tvl_usd} USD</h6>
                  </div> */}

                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">
                      Contract Start date:
                    </span>
                    <h6 className="stats-card-content">{start_date}</h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Contract End date:</span>
                    <h6 className="stats-card-content">{expiration_time}</h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Contract Address:</span>

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://bscscan.com/address/${staking._address}`}
                      className="stats-card-content text-decoration-underline"
                    >
                      {shortAddress(staking._address)}{" "}
                    </a>
                  </div>
                </div>

                {/* <div className="mt-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
          className="maxbtn"
          style={{ color: "#7770e0" }}
        >
          Etherscan
          <img src={arrowup} alt="" />
        </a>
      </div> */}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showWithdrawModal && (
        <Modal
          visible={showWithdrawModal}
          modalId="withdrawmodal"
          title="withdraw"
          onModalClose={() => {
            setshowWithdrawModal(false);
          }}
        >
          <div className="earn-hero-content p-4 token-wrapper">
            <div className="l-box pl-3 pr-3">
              <div className="container px-0">
                <div className="row" style={{ marginLeft: "0px" }}>
                  <h6 className="withdrawdesc mt-2 p-0 text-wrap">
                    {lockTime === "No Lock"
                      ? "Your deposit has no lock-in period. You can withdraw your assets anytime, or continue to earn rewards every day."
                      : `The pool has a lock time. You can withdraw your deposited assets after the lock time expires.`}
                  </h6>
                </div>

                <div className="d-flex flex-column mt-2">
                  <div className="d-flex  gap-2 justify-content-between align-items-center">
                    <div className="d-flex flex-column gap-1">
                      <h6 className="withsubtitle mt-3">Timer</h6>
                      <h6 className="withtitle" style={{ fontWeight: 300 }}>
                        {lockTime === "No Lock" ? (
                          "No Lock"
                        ) : (
                          <Countdown
                            date={
                              (Number(stakingTime) + Number(cliffTime)) * 1000
                            }
                            renderer={renderer}
                          />
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className="d-flex  gap-2 justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column gap-1">
                      <h6 className="withsubtitle">Deposited</h6>
                      <h6 className="withtitle">
                        {getFormattedNumber(depositedTokens, 6)} {token_symbol}
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="position-relative w-100 d-flex">
                      <input
                        type="number"
                        autoComplete="off"
                        value={withdrawAmount}
                        onChange={(e) => setwithdrawAmount(e.target.value)}
                        placeholder=" "
                        className="text-input2 w-100"
                        name="amount_withdraw"
                        id="amount_withdraw"
                        key="amount_withdraw"
                      />
                      <label
                        htmlFor="usd"
                        className="m-0 amount-txt"
                        onClick={() => focusInput("amount_withdraw")}
                      >
                        Withdraw Amount
                      </label>
                      <button
                        className="inner-max-btn position-absolute"
                        onClick={handleSetMaxWithdraw}
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-start justify-content-between gap-2 mt-4">
                    <button
                      disabled={
                        withdrawStatus === "failed" ||
                        withdrawStatus === "success" ||
                        withdrawAmount === "" ||
                        canWithdraw === false
                          ? true
                          : false
                      }
                      className={` w-100 btn connectbtn ${
                        withdrawStatus === "failed"
                          ? "fail-button"
                          : withdrawStatus === "success"
                          ? "success-button"
                          : (withdrawAmount === "" &&
                              withdrawStatus === "initial") ||
                            canWithdraw === false
                          ? "disabled-btn"
                          : null
                      } d-flex justify-content-center align-items-center`}
                      style={{ height: "fit-content" }}
                      onClick={() => {
                        handleWithdraw();
                      }}
                    >
                      {withdrawLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : withdrawStatus === "failed" ? (
                        <>
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/failMark.svg"
                            }
                            alt=""
                          />
                          Failed
                        </>
                      ) : withdrawStatus === "success" ? (
                        <>Success</>
                      ) : (
                        <>Withdraw</>
                      )}
                    </button>
                  </div>
                  {errorMsg3 && <h6 className="errormsg w-100">{errorMsg3}</h6>}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>

    // <div className="container-lg p-0">
    //   <div
    //     className={`allwrapper ${listType === "table" && "my-4"}`}
    //     style={{
    //       border: listType !== "table" && "none",
    //       borderRadius: listType !== "table" && "0px",
    //     }}
    //   >
    //     <div className="leftside2 mb-2 w-100">
    //       <div className="activewrapper">
    //         <div
    //           className={`d-flex flex-column flex-lg-row w-100 align-items-start align-items-lg-center justify-content-between ${
    //             renderedPage === "dashboard"
    //               ? "gap-3 gap-lg-4"
    //               : "gap-3 gap-lg-5"
    //           }`}
    //         >
    //         {expired === true ? (
    //             <h6 className="expiredtxt caws-active-txt">Expired Pool</h6>
    //           ) : (
    //             <h6 className="activetxt">
    //               <img
    //                 src={ellipse}
    //                 alt=""
    //                 className="position-relative"
    //                 style={{ top: "-1px" }}
    //               />
    //               Active status
    //             </h6>
    //           )}
    //           {/* <div className="d-flex align-items-center justify-content-between gap-2">
    //                 <h6 className="earnrewards-text">Earn rewards in:</h6>
    //                 <h6 className="earnrewards-token d-flex align-items-center gap-1">
    //                   DYP
    //                 </h6>
    //               </div> */}
    //           <div className="d-flex flex-row-reverse flex-lg-row align-items-center justify-content-between earnrewards-container">
    //             <div className="d-flex flex-column flex-lg-row align-items-end align-items-lg-center gap-3 gap-lg-5">
    //               <div className="d-flex align-items-center justify-content-between gap-2">
    //                 <h6 className="earnrewards-text">Performance fee:</h6>
    //                 <h6 className="earnrewards-token d-flex align-items-center gap-1">
    //                   {fee}%
    //                   <ClickAwayListener onClickAway={performanceClose}>
    //                     <Tooltip
    //                       open={performanceTooltip}
    //                       disableFocusListener
    //                       disableHoverListener
    //                       disableTouchListener
    //                       placement="top"
    //                       title={
    //                         <div className="tooltip-text">
    //                           {
    //                             "Performance fee is subtracted from the displayed APR."
    //                           }
    //                         </div>
    //                       }
    //                     >
    //                       <img
    //                         src={moreinfo}
    //                         alt=""
    //                         onClick={performanceOpen}
    //                       />
    //                     </Tooltip>
    //                   </ClickAwayListener>
    //                 </h6>
    //               </div>

    //               <div className="d-flex align-items-center justify-content-between gap-2">
    //                 <h6 className="earnrewards-text">APR:</h6>
    //                 <h6 className="earnrewards-token d-flex align-items-center gap-1">
    //                   {finalApr}%
    //                   <ClickAwayListener onClickAway={aprClose}>
    //                     <Tooltip
    //                       open={aprTooltip}
    //                       disableFocusListener
    //                       disableHoverListener
    //                       disableTouchListener
    //                       placement="top"
    //                       title={
    //                         <div className="tooltip-text">
    //                           {
    //                             "APR reflects the interest rate of earnings on an account over the course of one year. "
    //                           }
    //                         </div>
    //                       }
    //                     >
    //                       <img src={moreinfo} alt="" onClick={aprOpen} />
    //                     </Tooltip>
    //                   </ClickAwayListener>
    //                 </h6>
    //               </div>
    //               <div className="d-flex align-items-center justify-content-between gap-2">
    //                 <h6 className="earnrewards-text">Lock time:</h6>
    //                 <h6 className="earnrewards-token d-flex align-items-center gap-1">
    //                   {lockTime} {lockTime !== "No Lock" ? "Days" : ""}
    //                   <ClickAwayListener onClickAway={lockClose}>
    //                     <Tooltip
    //                       open={lockTooltip}
    //                       disableFocusListener
    //                       disableHoverListener
    //                       disableTouchListener
    //                       placement="top"
    //                       title={
    //                         <div className="tooltip-text">
    //                           {
    //                             "The amount of time your deposited assets will be locked."
    //                           }
    //                         </div>
    //                       }
    //                     >
    //                       <img src={moreinfo} alt="" onClick={lockOpen} />
    //                     </Tooltip>
    //                   </ClickAwayListener>
    //                 </h6>
    //               </div>
    //             </div>
    //             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3">
    //               <h6
    //                 className="bottomitems"
    //                 onClick={() => setshowCalculator(true)}
    //               >
    //                 <img src={poolsCalculatorIcon} alt="" />
    //                 Calculator
    //               </h6>
    //               <a
    //                 href={
    //                   // chainId === 1
    //                   // ?
    //                   "https://app.uniswap.org/#/swap?outputCurrency=0x39b46B212bDF15b42B166779b9d1787A68b9D0c3"
    //                   // : "https://app.pangolin.exchange/#/swap?outputCurrency=0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"
    //                 }
    //                 target={"_blank"}
    //                 rel="noreferrer"
    //               >
    //                 <h6 className="bottomitems">
    //                   <img src={arrowup} alt="" />
    //                   Get DYP
    //                 </h6>
    //               </a>
    //               <div
    //                 onClick={() => {
    //                   showPopup();
    //                 }}
    //               >
    //                 <h6 className="bottomitems">
    //                   <img src={purplestats} alt="" />
    //                   Stats
    //                 </h6>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="pools-details-wrapper d-flex m-0  container-lg border-0">
    //       <div className="row w-100 flex-column flex-lg-row gap-4 gap-lg-0 justify-content-between">
    //         <div className="firstblockwrapper col-12 col-md-6 col-lg-2">
    //           <div
    //             className="d-flex flex-row flex-lg-column align-items-center align-items-lg-start justify-content-between gap-4"
    //             style={{ height: "100%" }}
    //           >
    //             <h6 className="start-title">Start Staking</h6>
    //             {/* <h6 className="start-desc">
    //                   {this.props.coinbase === null
    //                     ? "Connect wallet to view and interact with deposits and withdraws"
    //                     : "Interact with deposits and withdraws"}
    //                 </h6> */}
    //             {coinbase === null ||
    //             coinbase === undefined ||
    //             is_wallet_connected === false ? (
    //               <button className="connectbtn btn" onClick={showModal}>
    //                 <img src={wallet} alt="" /> Connect wallet
    //               </button>
    //             ) : chainId === "1" ? (
    //               <div className="addressbtn btn">
    //                 <Address a={coinbase} chainId={1} />
    //               </div>
    //             ) : (
    //               <button
    //                 className="connectbtn btn"
    //                 onClick={() => {
    //                   handleEthPool();
    //                 }}
    //               >
    //                 Change Network
    //               </button>
    //             )}
    //           </div>
    //         </div>
    //         {/* <div className="otherside">
    //           <button className="btn green-btn">
    //             TBD Claim reward 0.01 ETH
    //           </button>
    //         </div> */}
    //         <div
    //           className={`otherside-border col-12 col-md-12 col-lg-4  ${
    //             chainId !== "1" || expired === true || !is_wallet_connected ? "blurrypool" : ""
    //           }`}
    //         >
    //           <div className="d-flex justify-content-between align-items-center gap-2">
    //             <div className="d-flex justify-content-center align-items-center gap-3">
    //               <h6 className="deposit-txt">Deposit</h6>
    //               {/* <div className="d-flex gap-2 align-items-center">
    //                     <img
    //                       src={require(`./assets/dyp.svg`).default}
    //                       alt=""
    //                       style={{ width: 15, height: 15 }}
    //                     />
    //                     <h6
    //                       className="text-white"
    //                       style={{ fontSize: "11px", fontWeight: "600" }}
    //                     >
    //                       DYP
    //                     </h6>
    //                   </div> */}
    //               <h6 className="mybalance-text">
    //                 Balance:
    //                 <b>
    //                   {token_balance !== "..."
    //                     ? getFormattedNumber(token_balance, 6)
    //                     : getFormattedNumber(0, 6)}{" "}
    //                   {token_symbol}
    //                 </b>
    //               </h6>
    //             </div>
    //             <ClickAwayListener onClickAway={depositClose}>
    //               <Tooltip
    //                 open={depositTooltip}
    //                 disableFocusListener
    //                 disableHoverListener
    //                 disableTouchListener
    //                 placement="top"
    //                 title={
    //                   <div className="tooltip-text">
    //                     {
    //                       "The initial pool size is capped at 11.5M DYP. Additional opportunities to stake DYP are planned to be introduced over time."
    //                     }
    //                   </div>
    //                 }
    //               >
    //                 <img src={moreinfo} alt="" onClick={depositOpen} />
    //               </Tooltip>
    //             </ClickAwayListener>
    //           </div>
    //           <div className="d-flex flex-column gap-2 justify-content-between">
    //             <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-2">
    //               <div className="d-flex align-items-center justify-content-between justify-content-lg-start w-100 gap-2">
    //                 <div className="input-container px-0">
    //                   <input
    //                     type="number"
    //                     autoComplete="off"
    //                     value={
    //                       Number(depositAmount) > 0
    //                         ? depositAmount
    //                         : depositAmount
    //                     }
    //                     onChange={(e) => {
    //                       setdepositAmount(e.target.value);
    //                       checkApproval(e.target.value);
    //                     }}
    //                     placeholder=" "
    //                     className="text-input"
    //                     style={{ width: "100%" }}
    //                     name="amount_deposit"
    //                     id="amount_deposit"
    //                     key="amount_deposit"
    //                   />
    //                   <label
    //                     htmlFor="usd"
    //                     className="label"
    //                     onClick={() => focusInput("amount_deposit")}
    //                   >
    //                     Amount
    //                   </label>
    //                 </div>
    //                 {/* <div
    //                     className="input-container px-0"
    //                     style={{ width: "32%" }}
    //                   >
    //                     <input
    //                       type="number"
    //                       min={1}
    //                       id="amount"
    //                       name="amount"
    //                       value={ Number(depositAmount) > 0
    //                         ? depositAmount
    //                         : depositAmount
    //                       }
    //                       placeholder=" "
    //                       className="text-input"
    //                       onChange={(e) => this.setState({depositAmount: e.target.value})}
    //                       style={{ width: "100%" }}
    //                     />
    //                     <label
    //                       htmlFor="usd"
    //                       className="label"
    //                       onClick={() => focusInput("amount")}
    //                     >
    //                       DYP Amount
    //                     </label>
    //                   </div> */}
    //                 <button
    //                   className="btn maxbtn"
    //                   onClick={handleSetMaxDeposit}
    //                 >
    //                   Max
    //                 </button>
    //               </div>
    //               {/* <button
    //                   className="btn filledbtn"
    //                   onClick={this.handleApprove}
    //                 >
    //                   Approve
    //                 </button> */}
    //               <button
    //                 disabled={
    //                   depositAmount === "" || depositLoading === true
    //                     ? true
    //                     : false
    //                 }
    //                 className={`btn filledbtn ${
    //                   depositAmount === "" &&
    //                   depositStatus === "initial" &&
    //                   "disabled-btn"
    //                 } ${
    //                   depositStatus === "deposit" || depositStatus === "success"
    //                     ? "success-button"
    //                     : depositStatus === "fail"
    //                     ? "fail-button"
    //                     : null
    //                 } d-flex justify-content-center align-items-center gap-2`}
    //                 onClick={() => {
    //                   depositStatus === "deposit"
    //                     ? handleStake()
    //                     : depositStatus === "initial" && depositAmount !== ""
    //                     ? handleApprove()
    //                     : console.log("");
    //                 }}
    //               >
    //                 {depositLoading ? (
    //                   <div
    //                     className="spinner-border spinner-border-sm text-light"
    //                     role="status"
    //                   >
    //                     <span className="visually-hidden">Loading...</span>
    //                   </div>
    //                 ) : depositStatus === "initial" ? (
    //                   <>Approve</>
    //                 ) : depositStatus === "deposit" ? (
    //                   <>Deposit</>
    //                 ) : depositStatus === "success" ? (
    //                   <>Success</>
    //                 ) : (
    //                   <>
    //                     <img src={"https://cdn.worldofdypians.com/wod/failMark.svg"} alt="" />
    //                     Failed
    //                   </>
    //                 )}
    //               </button>
    //             </div>
    //             {errorMsg && <h6 className="errormsg">{errorMsg}</h6>}
    //           </div>
    //         </div>
    //         <div
    //           className={`otherside-border col-12 col-md-12 col-lg-4 ${
    //             (chainId !== "1"|| !is_wallet_connected) && "blurrypool"
    //           }`}
    //         >
    //           <div className="d-flex justify-content-between gap-2 ">
    //             <h6 className="withdraw-txt">Rewards</h6>
    //             <h6
    //               className="withdraw-littletxt d-flex align-items-center gap-2"
    //               style={{
    //                 fontSize: renderedPage === "dashboard" && "9px",
    //               }}
    //             >
    //               Rewards are displayed in real-time
    //               <ClickAwayListener onClickAway={rewardsClose}>
    //                 <Tooltip
    //                   open={rewardsTooltip}
    //                   disableFocusListener
    //                   disableHoverListener
    //                   disableTouchListener
    //                   placement="top"
    //                   title={
    //                     <div className="tooltip-text">
    //                       {
    //                         "Rewards earned by your deposit to the staking smart contract are displayed in real-time. The reinvest function does not reset the lock-in period."
    //                       }
    //                     </div>
    //                   }
    //                 >
    //                   <img src={moreinfo} alt="" onClick={rewardsOpen} />
    //                 </Tooltip>
    //               </ClickAwayListener>
    //             </h6>
    //           </div>
    //           <div className="d-flex flex-column gap-2 justify-content-between">
    //             {/* <div className="d-flex align-items-center justify-content-between gap-2"></div> */}
    //             <div className="form-row flex-column flex-lg-row gap-2 d-flex  align-items-start align-items-lg-center justify-content-between">
    //               <div className="position-relative d-flex flex-column">
    //                 <span
    //                   style={{
    //                     fontWeight: "500",
    //                     fontSize: "12px",
    //                     lineHeight: "18px",
    //                     color: "#c0c9ff",
    //                   }}
    //                 >
    //                   DYP
    //                 </span>
    //                 <span>{pendingDivs}</span>
    //                 {/* <input
    //                       disabled
    //                       value={
    //                         Number(pendingDivs) > 0
    //                           ? `${pendingDivs}`
    //                           : `${pendingDivs}`
    //                       }
    //                       onChange={(e) =>
    //                         this.setState({
    //                           pendingDivs:
    //                             Number(e.target.value) > 0
    //                               ? e.target.value
    //                               : e.target.value,
    //                         })
    //                       }
    //                       className=" left-radius inputfarming styledinput2"
    //                       placeholder="0"
    //                       type="text"
    //                       style={{ fontSize: "14px", width: renderedPage === "dashboard" && '120px', padding: 0 }}
    //                     /> */}
    //               </div>
    //               <div className="claim-reinvest-container d-flex justify-content-between align-items-center gap-3">
    //                 <button
    //                   disabled={
    //                     claimStatus === "claimed" ||
    //                     claimStatus === "success" ||
    //                     pendingDivs <= 0
    //                       ? //
    //                         true
    //                       : false
    //                   }
    //                   className={`btn filledbtn ${
    //                     (claimStatus === "claimed" &&
    //                       claimStatus === "initial") ||
    //                     pendingDivs <= 0
    //                       ? //
    //                         "disabled-btn"
    //                       : claimStatus === "failed"
    //                       ? "fail-button"
    //                       : claimStatus === "success"
    //                       ? "success-button"
    //                       : null
    //                   } d-flex justify-content-center align-items-center gap-2`}
    //                   style={{ height: "fit-content" }}
    //                   // onClick={handleClaimDivs}
    //                   onClick={() => {handleClaimDivs();
    //                   }}
    //                 >
    //                   {claimLoading ? (
    //                     <div
    //                       className="spinner-border spinner-border-sm text-light"
    //                       role="status"
    //                     >
    //                       <span className="visually-hidden">Loading...</span>
    //                     </div>
    //                   ) : claimStatus === "failed" ? (
    //                     <>
    //                       <img src={"https://cdn.worldofdypians.com/wod/failMark.svg"} alt="" />
    //                       Failed
    //                     </>
    //                   ) : claimStatus === "success" ? (
    //                     <>Success</>
    //                   ) : (
    //                     <>Claim</>
    //                   )}
    //                 </button>
    //                 {expired === false && (
    //                   <button
    //                     disabled={pendingDivs > 0 ? false : true}
    //                     className={`btn outline-btn ${
    //                       reInvestStatus === "invest" || pendingDivs <= 0
    //                         ? "disabled-btn"
    //                         : reInvestStatus === "failed"
    //                         ? "fail-button"
    //                         : reInvestStatus === "success"
    //                         ? "success-button"
    //                         : null
    //                     } d-flex justify-content-center align-items-center gap-2`}
    //                     style={{ height: "fit-content" }}
    //                     onClick={handleReinvest}
    //                   >
    //                     {reInvestLoading ? (
    //                       <div
    //                         className="spinner-border spinner-border-sm text-light"
    //                         role="status"
    //                       >
    //                         <span className="visually-hidden">Loading...</span>
    //                       </div>
    //                     ) : reInvestStatus === "failed" ? (
    //                       <>
    //                         <img src={"https://cdn.worldofdypians.com/wod/failMark.svg"} alt="" />
    //                         Failed
    //                       </>
    //                     ) : reInvestStatus === "success" ? (
    //                       <>Success</>
    //                     ) : (
    //                       <>Reinvest</>
    //                     )}
    //                   </button>
    //                 )}
    //               </div>
    //             </div>
    //             {errorMsg2 && <h6 className="errormsg">{errorMsg2}</h6>}
    //           </div>
    //         </div>

    //         <div
    //           className={`otherside-border col-12 col-md-12 col-lg-2 ${
    //             (chainId !== "1" || !is_wallet_connected) && "blurrypool"
    //           }`}
    //         >
    //           <h6 className="deposit-txt d-flex align-items-center gap-2 justify-content-between">
    //             WITHDRAW
    //             <ClickAwayListener onClickAway={withdrawClose}>
    //               <Tooltip
    //                 open={withdrawTooltip}
    //                 disableFocusListener
    //                 disableHoverListener
    //                 disableTouchListener
    //                 placement="top"
    //                 title={
    //                   <div className="tooltip-text">
    //                     {
    //                       "Withdraw your deposited assets from the staking smart contract."
    //                     }
    //                   </div>
    //                 }
    //               >
    //                 <img src={moreinfo} alt="" onClick={withdrawOpen} />
    //               </Tooltip>
    //             </ClickAwayListener>
    //           </h6>

    //           <button
    //             disabled={Number(depositedTokens) > 0 ? false : true}
    //             className={"outline-btn btn"}
    //             onClick={() => {
    //               setshowWithdrawModal(true);
    //             }}
    //           >
    //             Withdraw
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {popup && (
    //     <Modal
    //       visible={popup}
    //       modalId="tymodal"
    //       title="stats"
    //       setIsVisible={() => {
    //         setpopup(false);
    //       }}
    //       width="fit-content"
    //     >
    //       <div className="earn-hero-content p4token-wrapper">
    //         <div className="l-box pl-3 pr-3">
    //           <div className="container px-0">
    //             {/* <div className="row" style={{ marginLeft: "0px" }}>
    //                   <div className="d-flex justify-content-between gap-2 align-items-center p-0">
    //                     <h6 className="d-flex gap-2 align-items-center statstext">
    //                       <img src={stats} alt="" />
    //                       Stats
    //                     </h6>
    //                     <h6 className="d-flex gap-2 align-items-center myaddrtext">
    //                       My address
    //                       <a
    //                         href={`${window.config.etherscan_baseURL}/address/${this.props.coinbase}`}
    //                         target={"_blank"}
    //                         rel="noreferrer"
    //                       >
    //                         <h6 className="addresstxt">
    //                           {this.props.coinbase?.slice(0, 10) + "..."}
    //                         </h6>
    //                       </a>
    //                       <img src={arrowup} alt="" />
    //                     </h6>
    //                   </div>
    //                 </div> */}
    //             {/* <table className="table-stats table table-sm table-borderless mt-2">
    //                   <tbody>
    //                     <tr>
    //                       <td className="text-right">
    //                         <th>My DYP Deposit</th>
    //                         <div>
    //                           <strong>{depositedTokens}</strong>{" "}
    //                           <small>DYP</small>
    //                         </div>
    //                       </td>

    //                       <td className="text-right">
    //                         <th>My DYP Balance</th>
    //                         <div>
    //                           <strong>{token_balance}</strong>{" "}
    //                           <small>DYP</small>
    //                         </div>
    //                       </td>
    //                       <td className="text-right">
    //                         <th>Referral Fee Earned</th>
    //                         <div>
    //                           <strong>{referralFeeEarned}</strong>{" "}
    //                           <small>DYP</small>
    //                         </div>
    //                       </td>

    //                     </tr>

    //                     <tr>
    //                       <td className="text-right">
    //                         <th>Total DYP Locked</th>
    //                         <div>
    //                           <strong>{tvl}</strong> <small>DYP</small>
    //                         </div>
    //                       </td>
    //                       <td className="text-right">
    //                         <th>TVL USD</th>
    //                         <div>
    //                           <strong>${tvl_usd}</strong> <small>USD</small>
    //                         </div>
    //                       </td>

    //                       <td className="text-right">
    //                         <th>Contract Expiration</th>
    //                         <small>{expiration_time}</small>
    //                       </td>
    //                     </tr>
    //                   </tbody>
    //                 </table> */}
    //             <div className="stats-container my-4">
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">My DYP Deposit</span>
    //                 <h6 className="stats-card-content">
    //                   {getFormattedNumber(depositedTokens, 6)} DYP
    //                 </h6>
    //               </div>
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">My DYP Balance</span>
    //                 <h6 className="stats-card-content">{token_balance} DYP</h6>
    //               </div>
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">
    //                   Referral Fee Earned
    //                 </span>
    //                 <h6 className="stats-card-content">
    //                   {referralFeeEarned} DYP
    //                 </h6>
    //               </div>
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">Total DYP Locked</span>
    //                 <h6 className="stats-card-content">
    //                   {getFormattedNumber(tvl, 6)} DYP
    //                 </h6>
    //               </div>
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">TVL USD</span>
    //                 <h6 className="stats-card-content">${getFormattedNumber(Number(tvl) * usdPerToken,4) } USD</h6>
    //               </div>
    //               <div className="stats-card p-4 d-flex flex-column mx-auto w-100">
    //                 <span className="stats-card-title">
    //                   Contract Expiration
    //                 </span>
    //                 <h6 className="stats-card-content">{expiration_time}</h6>
    //               </div>
    //             </div>
    //             <div className="d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
    //               <div className="referralwrapper col-12 col-lg-8">
    //                 <div className="d-flex gap-2 align-items-start justify-content-between">
    //                   <img src={referralimg} alt="" />
    //                   <div
    //                     className="d-flex gap-2 flex-column"
    //                     style={{ width: "60%" }}
    //                   >
    //                     <div>
    //                       <span style={{ fontSize: ".8rem" }}>
    //                         <h6
    //                           className="referraltitle"
    //                           style={{ cursor: "pointer" }}
    //                         >
    //                           <Clipboard
    //                             component="h6"
    //                             onSuccess={(e) => {
    //                               setTimeout(() => ReactTooltip.hide(), 2000);
    //                             }}
    //                             data-event="click"
    //                             data-for={id}
    //                             data-tip="Copied To Clipboard!"
    //                             data-clipboard-text={getReferralLink()}
    //                             className="referraltitle"
    //                           >
    //                             Referral Link:
    //                             <span
    //                               title="Copy link to clipboard"
    //                               style={{
    //                                 cursor: "pointer",
    //                               }}
    //                             ></span>
    //                           </Clipboard>
    //                           <ReactTooltip id={id} effect="solid" />
    //                         </h6>
    //                         <br />
    //                         {/* <a
    //                             className="text-muted small"
    //                             href={this.getReferralLink()}
    //                           >
    //                             {" "}
    //                             {this.getReferralLink()}{" "}
    //                           </a> */}
    //                       </span>
    //                     </div>

    //                     <h6 className="referraldesc">
    //                       Refferal link gives you 5% for each invite friend you
    //                       bring to buy DYP example
    //                     </h6>
    //                   </div>
    //                   <Clipboard
    //                     component="div"
    //                     onSuccess={(e) => {
    //                       setTimeout(() => ReactTooltip.hide(), 2000);
    //                     }}
    //                     data-event="click"
    //                     data-for={id}
    //                     data-tip="Copied To Clipboard!"
    //                     data-clipboard-text={getReferralLink()}
    //                     className=""
    //                   >
    //                     <button className="copybtn btn">
    //                       <img src={copy} alt="" /> Copy{" "}
    //                     </button>{" "}
    //                   </Clipboard>
    //                   <ReactTooltip id={id} effect="solid" />
    //                   &nbsp;{" "}
    //                 </div>
    //               </div>
    //               <div className="col-12 col-lg-3 d-flex flex-column gap-1">
    //                 <span
    //                   style={{
    //                     fontWeight: "400",
    //                     fontSize: "12px",
    //                     lineHeight: "18px",
    //                     color: "#C0C9FF",
    //                   }}
    //                 >
    //                   My address
    //                 </span>
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   href={`${window.config.etherscan_baseURL}/address/${coinbase}`}
    //                   className="stats-link"
    //                 >
    //                   {shortAddress(coinbase)}{" "}
    //                   <img src={statsLinkIcon} alt="" />
    //                 </a>
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   href={`https://github.com/dypfinance/staking-governance-security-audits`}
    //                   className="stats-link"
    //                 >
    //                   Audit <img src={statsLinkIcon} alt="" />
    //                 </a>
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   href={`${window.config.etherscan_baseURL}/token/${reward_token_dypius_eth._address}?a=${coinbase}`}
    //                   className="stats-link"
    //                 >
    //                   View transaction <img src={statsLinkIcon} alt="" />
    //                 </a>
    //               </div>
    //             </div>
    //             {/* <div className="mt-4">
    //                   <a
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                     href={`${window.config.etherscan_baseURL}/token/${reward_token._address}?a=${coinbase}`}
    //                     className="maxbtn"
    //                     style={{ color: "#7770e0" }}
    //                   >
    //                     Etherscan
    //                     <img src={arrowup} alt="" />
    //                   </a>
    //                 </div> */}
    //           </div>
    //         </div>
    //       </div>
    //     </Modal>
    //   )}

    //   {showWithdrawModal && (
    //     <Modal
    //       visible={showWithdrawModal}
    //       modalId="withdrawmodal"
    //       title="withdraw"
    //       setIsVisible={() => {
    //         setshowWithdrawModal(false);
    //       }}
    //       width="fit-content"
    //     >
    //       <div className="earn-hero-content p4token-wrapper">
    //         <div className="l-box pl-3 pr-3">
    //           <div className="container px-0">
    //             <div className="row" style={{ marginLeft: "0px" }}>
    //               {/* <div className="d-flex justify-content-between gap-2 align-items-center p-0">
    //                     <h6 className="d-flex gap-2 align-items-center statstext">
    //                       <img src={stats} alt="" />
    //                       Withdraw
    //                     </h6>
    //                   </div> */}
    //               <h6 className="withdrawdesc mt-2 p-0">
    //                 {lockTime === "No Lock"
    //                   ? "Your deposit has no lock-in period. You can withdraw your assets anytime, or continue to earn rewards every day."
    //                   : `The pool has a lock time. You can withdraw your deposited assets after the lock time expires.`}
    //               </h6>
    //             </div>

    //             <div className="d-flex flex-column mt-2">
    //               <div className="d-flex  gap-2 justify-content-between align-items-center">
    //                 <div className="d-flex flex-column gap-1">
    //                   <h6 className="withsubtitle mt-3">Timer</h6>
    //                   <h6 className="withtitle" style={{ fontWeight: 300 }}>
    //                     {lockTime === "No Lock" ? (
    //                       "No Lock"
    //                     ) : (
    //                       <Countdown
    //                         date={
    //                           (Number(stakingTime) + Number(cliffTime)) * 1000
    //                         }
    //                         renderer={renderer}
    //                       />
    //                     )}
    //                   </h6>
    //                 </div>
    //               </div>
    //               <div className="separator"></div>
    //               <div className="d-flex  gap-2 justify-content-between align-items-center mb-4">
    //                 <div className="d-flex flex-column gap-1">
    //                   <h6 className="withsubtitle">Balance</h6>
    //                   <h6 className="withtitle">
    //                     {getFormattedNumber(depositedTokens, 6)} {token_symbol}
    //                   </h6>
    //                 </div>
    //               </div>

    //               <div className="d-flex align-items-center justify-content-between gap-2">
    //                 <div className="input-container px-0">
    //                   <input
    //                     type="number"
    //                     autoComplete="off"
    //                     value={withdrawAmount}
    //                     onChange={(e) => setwithdrawAmount(e.target.value)}
    //                     placeholder=" "
    //                     className="text-input"
    //                     style={{ width: "100%" }}
    //                     name="amount_withdraw"
    //                     id="amount_withdraw"
    //                     key="amount_withdraw"
    //                   />
    //                   <label
    //                     htmlFor="usd"
    //                     className="label"
    //                     onClick={() => focusInput("amount_withdraw")}
    //                   >
    //                     Withdraw Amount
    //                   </label>
    //                 </div>
    //                 <button
    //                   className="btn maxbtn"
    //                   onClick={handleSetMaxWithdraw}
    //                 >
    //                   Max
    //                 </button>
    //               </div>

    //               <div className="d-flex flex-column align-items-start justify-content-between gap-2 mt-4">
    //                 <button
    //                   disabled={
    //                     withdrawStatus === "failed" ||
    //                     withdrawStatus === "success" ||
    //                     withdrawAmount === "" ||
    //                     canWithdraw === false
    //                       ? true
    //                       : false
    //                   }
    //                   className={` w-100 btn filledbtn ${
    //                     withdrawStatus === "failed"
    //                       ? "fail-button"
    //                       : withdrawStatus === "success"
    //                       ? "success-button"
    //                       : (withdrawAmount === "" &&
    //                           withdrawStatus === "initial") ||
    //                         canWithdraw === false
    //                       ? "disabled-btn"
    //                       : null
    //                   } d-flex justify-content-center align-items-center`}
    //                   style={{ height: "fit-content" }}
    //                   onClick={() => {
    //                     handleWithdraw();
    //                   }}
    //                 >
    //                   {withdrawLoading ? (
    //                     <div
    //                       className="spinner-border spinner-border-sm text-light"
    //                       role="status"
    //                     >
    //                       <span className="visually-hidden">Loading...</span>
    //                     </div>
    //                   ) : withdrawStatus === "failed" ? (
    //                     <>
    //                       <img src={"https://cdn.worldofdypians.com/wod/failMark.svg"} alt="" />
    //                       Failed
    //                     </>
    //                   ) : withdrawStatus === "success" ? (
    //                     <>Success</>
    //                   ) : (
    //                     <>Withdraw</>
    //                   )}
    //                 </button>
    //                 {/* <span
    //                   className="mt-2"
    //                   style={{
    //                     fontWeight: "400",
    //                     fontSize: "12px",
    //                     lineHeight: "18px",
    //                     color: "#C0C9FF",
    //                   }}
    //                 >
    //                   *No withdrawal fee
    //                 </span> */}
    //                 {/* <button
    //                       className="btn filledbtn w-100"
    //                       onClick={(e) => {
    //                         // e.preventDefault();
    //                         this.handleWithdraw();
    //                       }}
    //                       title={
    //                         canWithdraw
    //                           ? ""
    //                           : `You recently staked, you can unstake ${cliffTimeInWords}`
    //                       }
    //                     >
    //                       Withdraw
    //                     </button> */}

    //                 {/* <div className="form-row">
    //                           <div className="col-6">
    //                             <button
    //                               title={
    //                                 canWithdraw
    //                                   ? ""
    //                                   : `You recently staked, you can unstake ${cliffTimeInWords}`
    //                               }
    //                               disabled={!canWithdraw || !is_connected}
    //                               className="btn  btn-primary btn-block l-outline-btn"
    //                               type="submit"
    //                             >
    //                               WITHDRAW
    //                             </button>
    //                           </div>
    //                           <div className="col-6">
    //                             <button
    //                               onClick={(e) => {
    //                                 e.preventDefault();
    //                                 this.handleWithdrawDyp();
    //                               }}
    //                               title={
    //                                 canWithdraw
    //                                   ? ""
    //                                   : `You recently staked, you can unstake ${cliffTimeInWords}`
    //                               }
    //                               disabled={!canWithdraw || !is_connected}
    //                               className="btn  btn-primary btn-block l-outline-btn"
    //                               type="submit"
    //                             >
    //                               WITHDRAW
    //                             </button>
    //                           </div>
    //                         </div> */}
    //               </div>
    //               {errorMsg3 && <h6 className="errormsg">{errorMsg3}</h6>}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Modal>
    //   )}

    //   {show && (
    //     <WalletModal
    //       show={show}
    //       handleClose={hideModal}
    //       handleConnection={() => {
    //         handleConnection();
    //         setshow(false);
    //       }}
    //     />
    //   )}
    //   {/* <div
    //         className="calculator-btn d-flex justify-content-center align-items-center gap-2 text-white"
    //         onClick={() => this.setState({ showCalculator: true })}
    //       >
    //         <img
    //           src={calculatorIcon}
    //           alt=""
    //           style={{ width: 30, height: 30 }}
    //         />{" "}
    //         Calculator
    //       </div> */}

    //   {showCalculator && (
    //     <Modal
    //       visible={showCalculator}
    //       modalId="calculatormodal"
    //       title="calculator"
    //       setIsVisible={() => {
    //         setshowCalculator(false);
    //       }}
    //     >
    //       <div className="pools-calculator">
    //         {/* <div className="d-flex align-items-center justify-content-between">
    //             <div className="d-flex align-items-center gap-3">
    //               <img src={calculatorIcon} alt="" />
    //               <h5
    //                 style={{
    //                   fontSize: "23px",
    //                   fontWeight: "500",
    //                   color: "#f7f7fc",
    //                 }}
    //               >
    //                 Calculator
    //               </h5>
    //             </div>
    //             <img
    //               src={xMark}
    //               alt=""
    //               onClick={() => {
    //                 this.setState({ showCalculator: false });
    //               }}
    //               className="cursor-pointer"
    //             />
    //           </div> */}
    //         <hr />
    //         <div className="d-flex align-items-center justify-content-between">
    //           <div className="d-flex flex-column gap-3 w-50 me-5">
    //             <span style={{ fontSize: "15px", fontWeight: "500" }}>
    //               Days to stake
    //             </span>
    //             <input
    //               style={{ height: "40px" }}
    //               type="number"
    //               className="form-control calcinput w-100"
    //               id="days"
    //               name="days"
    //               placeholder="Days*"
    //               value={approxDays}
    //               onChange={(e) => setapproxDays(e.target.value)}
    //             />
    //           </div>
    //           <div className="d-flex flex-column gap-3 w-50 me-5">
    //             <span style={{ fontSize: "15px", fontWeight: "500" }}>
    //               Amount to stake
    //             </span>
    //             <input
    //               style={{ height: "40px" }}
    //               type="number"
    //               className="form-control calcinput w-100"
    //               id="days"
    //               name="days"
    //               placeholder="Value of deposit in USD"
    //               value={approxDeposit}
    //               onChange={(e) => setapproxDeposit(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //         <div className="d-flex flex-column gap-2 mt-4">
    //           <h3 style={{ fontWeight: "500", fontSize: "39px" }}>
    //             {" "}
    //             ${getFormattedNumber(getApproxReturn() * usdPerToken, 6)} USD
    //           </h3>
    //           <h6
    //             style={{
    //               fontWeight: "300",
    //               fontSize: "15px",
    //               color: "#f7f7fc",
    //             }}
    //           >
    //             Approx {getFormattedNumber(getApproxReturn(), 6)}
    //             DYP
    //           </h6>
    //         </div>
    //         <div className="mt-4">
    //           <p
    //             style={{
    //               fontWeight: "400",
    //               fontSize: "13px",
    //               color: "#f7f7fc",
    //             }}
    //           >
    //             *This calculator is for informational purposes only. Calculated
    //             yields assume that prices of the deposited assets don't change.
    //           </p>
    //         </div>
    //       </div>
    //     </Modal>
    //   )}
    // </div>
  );
};

export default StakeWodDetails2;
