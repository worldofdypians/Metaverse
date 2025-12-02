import React, { useEffect, useState } from "react";
import { GOLDEN_PASS_ABI, golden_pass_address } from "../NewEvents/abi";
import {
  goldenPassAddress,
  usdt_token_abi,
  wod_token,
  wod_token_abi,
} from "../../screens/Account/src/web3";

import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import Countdown from "react-countdown";
import { golden_pass2_address } from "../NewEvents/abi";
import { useBinancePay } from "../../hooks/useBinancePay";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { bsc } from "wagmi/chains";
import {
  readContract as wagmiReadContract,
  writeContract as wagmiWriteContract,
  waitForTransactionReceipt as wagmiWaitForTransactionReceipt,
  switchChain as wagmiSwitchChain,
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../wagmiConnectors";

const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{days < 10 ? "0" + days : days}</h6>
        <span className="days3">Days</span>
      </div>
      <h6 className="mint-time3 mb-0">:</h6>

      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days3">Hours</span>
      </div>
      <h6 className="mint-time3 mb-0">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">
          {minutes < 10 ? "0" + minutes : minutes}
        </h6>
        <span className="days3">Minutes</span>
      </div>
    </div>
  );
};

const GoldenPassPopup = ({
  isEOA,
  onClosePopup,
  coinbase,
  wallet,
  chainId,
  isConnected,
  onSuccessDeposit,
  goldenPassRemainingTime,
  onConnectWallet,
  email,
}) => {
  // ----------------------
  // Unified wagmi/viem helpers
  // ----------------------
  const MIN_APPROVAL = 150000000000000000000n; // 150 WOD with 18 decimals
  const MAX_APPROVE_AMOUNT = 500000000000000000000000000n; // 500,000,000 * 1e18

  const readOnChain = async ({ address, abi, functionName, args = [] }) => {
    try {
      
      return await wagmiReadContract(wagmiClient, {
        address,
        abi,
        functionName,
        args,
        chainId: bsc.id,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const writeOnChain = async ({ address, abi, functionName, args = [] }) => {
    try {
  

      const account = getAccount(wagmiClient);
      if (account?.chainId && chainId && account.chainId !== chainId) {
        try {
          await wagmiSwitchChain(wagmiClient, { chainId });
        } catch (e) {
          console.error("switchChain failed or not supported", e);
        }
      }

      const hash = await wagmiWriteContract(wagmiClient, {
        address,
        abi,
        functionName,
        args,
        account: account?.address,
        chainId,
      });
      await wagmiWaitForTransactionReceipt(wagmiClient, { hash });
      return hash;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const [goldenPassWodAmount, setGoldenPassWodAmount] = useState(0);
  // const [countdown, setCountdown] = useState(0);
  // const [hasBoughtGolden, setHasBoughtGolden] = useState(false);
  // const [timerFinished, settimerFinished] = useState(false);
  const [binancePay, setbinancePay] = useState(false);

  const [showApproval, setShowApproval] = useState(true);
  const [bundleState, setBundleState] = useState("initial");

  const [showApproval2, setShowApproval2] = useState(false);
  const [bundleState2, setBundleState2] = useState("initial");

  const [depositState, setDepositState] = useState("initial");
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your game profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [checkWallet, setCheckWallet] = useState(true);
  const { createOrder, QRComponent, statusbinance } = useBinancePay();

  let buttonText = "Activate";
  if (statusbinance === "creating") buttonText = "Creating order...";
  if (statusbinance === "waitingPayment") buttonText = "Waiting for payment...";
  if (statusbinance === "validating") buttonText = "Validating bundle...";
  if (statusbinance === "activating") buttonText = "Activating on-chain...";
  if (statusbinance === "success") buttonText = "✅ Success!";
  if (statusbinance === "failed") buttonText = "❌ Failed";
  if (statusbinance === "idle") buttonText = "Activate";

  const handleBuy = (walletAddress, bundleType) => {
    createOrder({ walletAddress, bundleType: bundleType });
  };

  const getBundlePrizes = async () => {
    // if (binancePay === true) {
    //   setGoldenPassWodAmount(50);
    // } else {
    const result_golden_pass = await readOnChain({
      address: golden_pass_address,
      abi: GOLDEN_PASS_ABI,
      functionName: "getEstimatedBundleWODAmount",
      args: [],
    }).catch((e) => {
      console.error(e);
      return 0n;
    });

    if (result_golden_pass) {
      setGoldenPassWodAmount(Number(result_golden_pass) / 1e18);
    }
    // }
  };

  // const handleRefreshCountdown = async () => {
  //   const goldenPassContract = new window.bscWeb3.eth.Contract(
  //     GOLDEN_PASS_ABI,
  //     golden_pass_address
  //   );

  //   const purchaseTimestamp = await goldenPassContract.methods
  //     .getTimeOfExpireBuff(coinbase)
  //     .call();
  //   if (Number(purchaseTimestamp) === 0) {
  //     setHasBoughtGolden(false);
  //     return;
  //   }
  //   setCountdown(purchaseTimestamp);
  //   setHasBoughtGolden(true);
  // };

  const checkApproval = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase()) {
      const allowance = await readOnChain({
        address: window.config.wod_token_address,
        abi: window.TOKEN_ABI,
        functionName: "allowance",
        args: [wallet, goldenPassAddress],
      }).catch(() => 0n);

      if (BigInt(allowance) === 0n || BigInt(allowance) < MIN_APPROVAL) {
        setShowApproval(true);
      } else {
        setShowApproval(false);
        setBundleState("deposit");
      }
    }
  };

  const handleApproval = async (status) => {
    if (status === false) {
      setBundleState("loading");
    } else if (status === true) {
      setBundleState2("loading");
    }
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    try {
      await writeOnChain({
        address: window.config.wod_token_address,
        abi: window.TOKEN_ABI,
        functionName: "approve",
        args: [goldenPassAddress, MAX_APPROVE_AMOUNT],
      });

      setStatus("Succesfully approved!");
      if (status === false) {
        setBundleState("deposit");
        setShowApproval(false);
      } else {
        setBundleState2("deposit");
        setShowApproval2(false);
      }
      setStatusColor("#00FECF");
    } catch (e) {
      setStatusColor("#FE7A00");
      setStatus(e?.shortMessage || e?.message);
      if (status === false) {
        setBundleState("fail");
        const timer = setTimeout(() => {
          setStatusColor("#00FECF");
          setStatus("");
          setBundleState("initial");
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setBundleState2("fail");
        setTimeout(() => {
          setStatusColor("#00FECF");
          setStatus("");
          setBundleState2("initial");
        }, 3000);
      }
    }
  };

  const handleDeposit = async () => {
    setDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    try {
      await writeOnChain({
        address: goldenPassAddress,
        abi: GOLDEN_PASS_ABI,
        functionName: "deposit",
        args: [],
      });
      setStatus("Bundle successfully purchased!");
      setDepositState("success");
      setStatusColor("#00FECF");

      onSuccessDeposit();
    } catch (e) {
      setStatusColor("#FE7A00");
      setStatus(e?.shortMessage || e?.message);
      setDepositState("failDeposit");
      console.log(e);

      const timer = setTimeout(() => {
        setStatusColor("#00FECF");
        setStatus("");
        setDepositState("initial");
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (binancePay === true && window.WALLET_TYPE !== "binance") {
        setCheckWallet(false);
        setStatus(
          "Please connect with Binance wallet in order to activate the event."
        );
        setStatusColor("#FE7A00");
      } else if (
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId !== 56 &&
        binancePay === false
      ) {
        setCheckWallet(false);
        setStatus(
          "Please make sure you're on BNB Chain in order to activate the event."
        );
        setStatusColor("#FE7A00");
      } else if (
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId !== 56 &&
        binancePay === true
      ) {
        setCheckWallet(true);
        setStatus("");
        setStatusColor("#00FECF");
      } else if (
        coinbase?.toLowerCase() !== wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setCheckWallet(false);
        setStatus(
          "Please make sure you're using the wallet address associated to your game profile."
        );
        setStatusColor("#FE7A00");
      } else if (!isEOA && isConnected && coinbase) {
        setStatus("Smart contract wallets are not supported for this action.");
        setStatusColor("#FE7A00");
      } else if (
        isEOA &&
        isConnected &&
        coinbase &&
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setCheckWallet(true);
        setStatus("");
        setStatusColor("#00FECF");
      }
    } else if (wallet) {
      setCheckWallet(false);
      setStatus("Please connect your wallet in order to activate the event");
      setStatusColor("#FE7A00");
    } else setCheckWallet(false);
  };

  useEffect(() => {
    getBundlePrizes();
  }, []);

  useEffect(() => {
    if (binancePay === true && window.WALLET_TYPE === "binance") {
      {
        setShowApproval2(false);
        setBundleState2("deposit");
      }
    }
  }, [binancePay, window.WALLET_TYPE]);

  useEffect(() => {
    checkWalletAddr();
    if (coinbase && wallet && chainId === 56) {
      // handleRefreshCountdown();
      checkApproval();
    }
  }, [wallet, chainId, coinbase, binancePay, isEOA]);

  useEffect(() => {
    if (statusbinance === "success") {
      onSuccessDeposit();
    }
  }, [statusbinance]);

  useEffect(() => {
    const storedOrder = localStorage.getItem("binanceOrder");
    if (storedOrder && statusbinance !== "idle") {
      setbinancePay(true);
    }
  }, [statusbinance]);

  return (
    <>
      <div className="package-popup-wrapper">
        <div className="package-popup golden-pass-popup p-4">
          <div className=" package-popup-title-wrapper d-flex align-items-center position-relative justify-content-between mb-2">
            <div className="package-popup-title mb-0">Golden Pass</div>{" "}
            <img
              src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
              className="popup-closer"
              onClick={onClosePopup}
              alt=""
            />
          </div>
          <div className="position-relative mb-3">
            <img
              src={"https://cdn.worldofdypians.com/wod/goldenPassPopup.webp"}
              alt=""
              style={{ width: "100%" }}
            />
            {binancePay === true && window.WALLET_TYPE !== "binance" && (
              <div className="absolute bottom-0 bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit w-100 overflow-hidden">
                {/* Background image */}

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                ></div>

                <div className="relative">
                  <div className="d-flex flex-column gap-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                        alt=""
                        className="w-5 h-5 text-yellow-400"
                      />
                      <span className="font-medium text-yellow-400">
                        Binance Pay Setup
                      </span>
                    </div>
                    <span className="challenge-popup-desc text-white">
                      Import your game wallet into Binance Wallet app or connect
                      your existing Binance Wallet.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="package-popup-content-2 p-1">
            <p className="package-popup-desc">
              The Golden Pass Event lets players earn extra rewards from the
              leaderboards. The pass is valid for one calendar month, regardless
              of purchase date.
              <br />
              <br />
              <b>Example:</b> If you buy the Golden Pass on the 7th, it remains
              active until the end of the month (e.g., from the 7th to the
              30th/31st). However, it will reset on the 1st of the following
              month and must be repurchased to stay active.
            </p>

            <h6 className="text-white">How it works:</h6>
            <ul className="package-popup-desc">
              <li className="package-popup-desc">
                Purchase the bundle from the Challenge Center
              </li>
              <li className="package-popup-desc">
                The golden pass is valid for one calendar month, resetting on
                the 1st, regardless of the purchase date
              </li>

              <li className="package-popup-desc">
                Extra rewards are given based on leaderboard rank as long as the
                golden pass is active
              </li>
            </ul>

            <h6 className="text-white">Leaderboard Reward Distribution</h6>
            <div className="table-responsive">
              <table className="table bgtable">
                <thead>
                  <tr>
                    <th
                      scope="col popup-table-header"
                      style={{
                        color: "#828FBB",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Rank
                    </th>
                    <th
                      scope="col popup-table-header"
                      style={{
                        color: "#828FBB",
                        fontSize: "14px",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Rewards
                    </th>
                    <th
                      scope="col popup-table-header"
                      style={{
                        color: "#828FBB",
                        fontSize: "14px",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Extra
                    </th>
                    <th
                      scope="col popup-table-header"
                      style={{
                        color: "#828FBB",
                        fontSize: "14px",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Total Rewards
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row d-flex align-items-center gap-2"
                      style={{
                        color: "#eeedff",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      #1
                    </th>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#eeedff",
                        textAlign: "center",
                      }}
                    >
                      $1,000
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      +$400
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      $1,400
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row d-flex align-items-center gap-2"
                      style={{
                        color: "#eeedff",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      #2
                    </th>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#eeedff",
                        textAlign: "center",
                      }}
                    >
                      $800
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      +$300
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      $1,100
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row d-flex align-items-center gap-2"
                      style={{
                        color: "#eeedff",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      #3
                    </th>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#eeedff",
                        textAlign: "center",
                      }}
                    >
                      $500
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      +$200
                    </td>
                    <td
                      style={{
                        fontSize: "16px",
                        color: "#2DF5F2",
                        textAlign: "center",
                      }}
                    >
                      $700
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="new-event-wrapper gap-3 p-3 d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between position-relative">
            <div className="event-price-wrapper p-3 d-flex  gap-3">
              <div className="d-flex flex-column justify-content-between">
                <span className="event-price-span">Event Price</span>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-1">
                    {/* <img
                    src={"https://cdn.worldofdypians.com/wod/wodToken.png"}
                    height={30}
                    width={30}
                    alt=""
                  /> */}
                    <h6 className="event-price-coin mb-0">
                      {getFormattedNumber(
                        binancePay === false ? goldenPassWodAmount : 50
                      )}{" "}
                      {binancePay === false ? "WOD" : "USDT"}
                    </h6>
                  </div>
                  <span className="event-price-usd">
                    ($
                    {getFormattedNumber(50)})
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="event-price-span">Method</span>
                <div className="d-flex gap-2 align-items-center w-100">
                  <motion.div
                    // whileTap={{ scale: 0.98 }}
                    className={` ${
                      (bundleState2 === "loading" ||
                        statusbinance !== "idle") &&
                      "pe-none"
                    } flex w-100 min-w-122 items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                      !binancePay
                        ? "bg-gradient-to-r from-blue-500/40 to-blue-500/30 border-cyan-400/50 bordertw"
                        : "bg-slate-800/50 bordertw border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                    }`}
                    onClick={() => setbinancePay(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        style={{ height: 18 }}
                        src={
                          "https://cdn.worldofdypians.com/wod/walletRound.svg"
                        }
                        alt=""
                      />
                      <div>
                        <p
                          className={`text-sm font-medium m-0 ${
                            !binancePay ? "text-white" : "text-gray-200"
                          }`}
                        >
                          Wallet
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    // whileTap={{ scale: 0.98 }}
                    className={`${
                      (bundleState === "loading" ||
                        depositState === "loading-deposit") &&
                      "pe-none"
                    } w-100 min-w-122 flex items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                      binancePay
                        ? "bg-gradient-to-r from-blue-500/40 to-blue-500/30 border-cyan-400/50 bordertw"
                        : "bg-slate-800/50 bordertw border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                    }`}
                    onClick={() => setbinancePay(true)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        style={{ height: 18 }}
                        src={"https://cdn.worldofdypians.com/wod/b-pay.svg"}
                        alt=""
                      />
                      <div>
                        <p
                          className={`text-sm font-medium m-0 ${
                            binancePay ? "text-white" : "text-gray-200"
                          }`}
                        >
                          Binance Pay
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            {/* <div className="w-100 flex-column flex-lg-row flex-md-row d-flex align-items-center gap-2">
              <span className="challenge-popup-desc text-white whitespace-nowrap">
                Payment methods:
              </span>
              <div className="d-flex w-100 flex-column flex-lg-row flex-md-row gap-3 align-items-center">
                <motion.div
                  // whileTap={{ scale: 0.98 }}
                  className={` ${
                    (bundleState2 === "loading" || statusbinance !== "idle") &&
                    "pe-none"
                  } flex w-100 items-center justify-between gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                    !binancePay
                      ? "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 bordertw border-orange-400/30"
                      : "bg-slate-800/50 bordertw border-white/20 hover:border-orange-400/50"
                  }`}
                  onClick={() => setbinancePay(false)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      style={{ height: 18 }}
                      src={"https://cdn.worldofdypians.com/wod/walletRound.svg"}
                      alt=""
                    />
                    <div>
                      <p
                        className={`text-sm font-medium m-0 ${
                          !binancePay ? "text-white" : "text-gray-200"
                        }`}
                      >
                        Wallet
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold m-0 text-lg m-0 m-0 ${
                        !binancePay ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {getFormattedNumber(goldenPassWodAmount)} WOD
                    </p>
                    <p
                      className={`text-end text-xs m-0 ${
                        !binancePay ? "text-yellow-200" : "text-gray-400"
                      }`}
                    >
                      ${getFormattedNumber(50, 0)}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  // whileTap={{ scale: 0.98 }}
                  className={`${
                    (bundleState === "loading" ||
                      depositState === "loading-deposit") &&
                    "pe-none"
                  } w-100 flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                    binancePay
                      ? "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 bordertw border-orange-400/30"
                      : "bg-slate-800/50 bordertw border-white/20 hover:border-orange-400/50"
                  }`}
                  onClick={() => setbinancePay(true)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      style={{ height: 18 }}
                      src={"https://cdn.worldofdypians.com/wod/b-pay.svg"}
                      alt=""
                    />
                    <div>
                      <p
                        className={`text-sm font-medium m-0 ${
                          binancePay ? "text-white" : "text-gray-200"
                        }`}
                      >
                        Binance Pay
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold m-0 text-lg m-0 ${
                        binancePay ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {getFormattedNumber(50)} USDT
                    </p>
                    <p
                      className={`text-end text-xs m-0 ${
                        binancePay ? "text-yellow-200" : "text-gray-400"
                      }`}
                    >
                      ${getFormattedNumber(50, 0)}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div> */}
            <>
              {goldenPassRemainingTime ? (
                <div className="d-flex flex-column gap-1">
                  <span className="days3">Active Until:</span>
                  <Countdown
                    renderer={renderer}
                    date={Number(goldenPassRemainingTime) * 1000}
                  />
                </div>
              ) : // : isConnected && coinbase && binancePay === false ? (
              //   <div className="d-flex align-items-center gap-2">
              //     <button
              //       disabled={
              //         bundleState === "deposit" ||
              //         bundleState === "loading" ||
              //         checkWallet === false ||
              //         !isEOA
              //           ? true
              //           : false
              //       }
              //       className={` ${
              //         bundleState === "deposit" || checkWallet === false
              //           ? "stake-wod-btn-inactive d-none"
              //           : "stake-wod-btn"
              //       }  py-2 px-4`}
              //       onClick={() => handleApproval(false)}
              //     >
              //       {bundleState === "loading" ? (
              //         <div
              //           className="spinner-border spinner-border-sm text-light"
              //           role="status"
              //         >
              //           <span className="visually-hidden">Loading...</span>
              //         </div>
              //       ) : (
              //         "Approve"
              //       )}
              //     </button>
              //     <button
              //       disabled={
              //         bundleState === "deposit" ||
              //         depositState === "loading-deposit" ||
              //         checkWallet === true ||
              //         isEOA
              //           ? false
              //           : true
              //       }
              //       className={` ${
              //         bundleState === "deposit" || checkWallet === false
              //           ? "stake-wod-btn"
              //           : "stake-wod-btn-inactive d-none"
              //       }  py-2 px-4`}
              //       onClick={() => handleDeposit()}
              //     >
              //       {depositState === "loading-deposit" ? (
              //         <div
              //           className="spinner-border spinner-border-sm text-light"
              //           role="status"
              //         >
              //           <span className="visually-hidden">Loading...</span>
              //         </div>
              //       ) : (
              //         "Buy"
              //       )}
              //     </button>
              //   </div>
              // ) : isConnected && coinbase && binancePay === true ? (
              //   <div className="d-flex align-items-center gap-2">
              //     <button
              //       disabled={
              //         bundleState2 === "deposit" ||
              //         bundleState2 === "loading" ||
              //         checkWallet === false ||
              //         !isEOA
              //           ? true
              //           : false
              //       }
              //       className={` ${
              //         bundleState2 === "deposit" || checkWallet === false
              //           ? "stake-wod-btn-inactive d-none"
              //           : "bg-gradient-to-r from-yellow-400 to-orange-400 font-semibold hover:from-yellow-400 hover:to-orange-500 text-black font-semibold rounded-lg transition-all"
              //       }  py-2 px-4`}
              //       onClick={() => handleApproval(true)}
              //     >
              //       {bundleState2 === "loading" ? (
              //         <div
              //           className="spinner-border spinner-border-sm text-light"
              //           role="status"
              //         >
              //           <span className="visually-hidden">Loading...</span>
              //         </div>
              //       ) : (
              //         "Approve"
              //       )}
              //     </button>
              //     <button
              //       disabled={
              //         bundleState2 === "deposit" ||
              //         depositState === "loading-deposit" ||
              //         checkWallet === true ||
              //         isEOA
              //           ? false
              //           : true
              //       }
              //       className={` ${
              //         bundleState2 === "deposit" || checkWallet === false
              //           ? "bg-gradient-to-r from-yellow-400 to-orange-400 font-semibold hover:from-yellow-400 hover:to-orange-500 text-black font-semibold rounded-lg transition-all"
              //           : "stake-wod-btn-inactive d-none"
              //       }  py-2 px-4`}
              //       onClick={() => handleBuy(coinbase, "Golden Pass")}
              //     >
              //       {buttonText}
              //     </button>
              //   </div>
              // )
              isConnected && email && binancePay === false ? (
                <>
                  <button
                    disabled={
                      bundleState === "deposit" ||
                      bundleState === "loading" ||
                      checkWallet === false ||
                      !isEOA
                        ? true
                        : false
                    }
                    className={` ${
                      bundleState === "deposit" ||
                      checkWallet === false ||
                      showApproval === false
                        ? "stake-wod-btn-inactive d-none"
                        : "stake-wod-btn"
                    }  py-2 px-4`}
                    onClick={() => handleApproval(false)}
                  >
                    {bundleState === "loading" ? (
                      <div className="d-flex align-items-center gap-2">
                        Approving
                        <div
                          className="spinner-border spinner-border-sm text-light beast-button"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      "Approve"
                    )}
                  </button>
                  <button
                    disabled={
                      bundleState === "deposit" ||
                      depositState === "loading-deposit" ||
                      checkWallet === true
                        ? false
                        : true
                    }
                    className={` ${
                      showApproval === true && checkWallet === true
                        ? "stake-wod-btn-inactive d-none"
                        : showApproval === false && checkWallet === true
                        ? "stake-wod-btn"
                        : "stake-wod-btn-inactive"
                    }  py-2 px-4`}
                    onClick={() => handleDeposit()}
                  >
                    {depositState === "loading-deposit" ? (
                      <div className="d-flex align-items-center gap-2">
                        Activating
                        <div
                          className="spinner-border spinner-border-sm text-light beast-button"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      "Activate"
                    )}
                  </button>
                </>
              ) : isConnected && email && binancePay === true ? (
                <>
                  {/* <button
                    disabled={
                      bundleState2 === "deposit" ||
                      bundleState === "loading" ||
                      checkWallet === false ||
                      !isEOA
                        ? true
                        : false
                    }
                    className={` ${
                      bundleState2 === "deposit" ||
                      checkWallet === false ||
                      showApproval2 === false
                        ? "stake-wod-btn-inactive d-none"
                        : "binance-beast-siege-btn"
                    }  py-2 px-4`}
                    onClick={() => handleApproval(true)}
                  >
                    {bundleState2 === "loading" ? (
                      <div className="d-flex align-items-center gap-2">
                        Approving
                        <div
                          className="spinner-border spinner-border-sm text-light beast-button"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      "Approve"
                    )}
                  </button> */}
                  <button
                    disabled={
                      checkWallet === true &&
                      isEOA &&
                      bundleState2 !== "loading-deposit"
                        ? false
                        : true
                    }
                    className={` ${
                      // showApproval2 === true && checkWallet === true
                      //   ? "stake-wod-btn-inactive d-none"
                      //   :
                      showApproval2 === false && checkWallet === true
                        ? "binance-beast-siege-btn"
                        : "stake-wod-btn-inactive"
                    }  py-3 px-4 text-uppercase`}
                    onClick={() => handleBuy(coinbase, "Golden Pass")}
                  >
                    {buttonText}
                  </button>
                </>
              ) : !isConnected ? (
                <button className="stake-wod-btn" onClick={onConnectWallet}>
                  Connect Wallet
                </button>
              ) : !email ? (
                <NavLink
                  to="/auth"
                  className="stake-wod-btn"
                  onClick={onClosePopup}
                >
                  Log in
                </NavLink>
              ) : null}
            </>
          </div>
          <span
            className="statusText"
            style={{
              color: statusColor,
              width: "fit-content",
            }}
          >
            {status}
          </span>
        </div>
      </div>
      <QRComponent />
    </>
  );
};

export default GoldenPassPopup;
