import React, { useEffect, useState } from "react";
import { GOLDEN_PASS_ABI, golden_pass_address } from "../NewEvents/abi";
import {
  goldenPassAddress,
  wod_token_abi,
} from "../../screens/Account/src/web3";
import Web3 from "web3";
import { ethers } from "ethers";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import Countdown from "react-countdown";

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
  binanceW3WProvider,
  wodPrice,
  publicClient,
  walletClient,
  isConnected,
}) => {
  const [goldenPassWodAmount, setGoldenPassWodAmount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [hasBoughtGolden, setHasBoughtGolden] = useState(false);
  const [timerFinished, settimerFinished] = useState(false);

  const [showApproval, setShowApproval] = useState(true);
  const [bundleState, setBundleState] = useState("initial");
  const [depositState, setDepositState] = useState("initial");
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your game profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [checkWallet, setCheckWallet] = useState(true);

  const getBundlePrizes = async () => {
    const goldenPassContract = new window.bscWeb3.eth.Contract(
      GOLDEN_PASS_ABI,
      golden_pass_address
    );

    const result_golden_pass = await goldenPassContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_golden_pass) {
      setGoldenPassWodAmount(result_golden_pass / 1e18);
    }
  };

  const handleRefreshCountdown = async () => {
    const goldenPassContract = new window.bscWeb3.eth.Contract(
      GOLDEN_PASS_ABI,
      golden_pass_address
    );

    const purchaseTimestamp = await goldenPassContract.methods
      .getTimeOfExpireBuff(coinbase)
      .call();
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtGolden(false);
      return;
    }
    setCountdown(purchaseTimestamp);
    setHasBoughtGolden(true);
  };

  const checkApproval = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [coinbase, goldenPassAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setShowApproval(true);
            } else {
              setShowApproval(false);
              setBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
        await wod_token_abi.methods
          .allowance(coinbase, goldenPassAddress)
          .call()
          .then((data) => {
            if (data === "0" || data < 150000000000000000000) {
              setShowApproval(true);
            } else {
              setShowApproval(false);
              setBundleState("deposit");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const handleApproval = async () => {
    setBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(goldenPassAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setBundleState("deposit");
          setStatusColor("#00FECF");
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBundleState("fail");
          const timer = setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBundleState("initial");
          }, 3000);
          return () => clearTimeout(timer);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(goldenPassAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBundleState("fail");
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setBundleState("deposit");
        setStatusColor("#00FECF");
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [goldenPassAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setBundleState("fail");
            const timer = setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setBundleState("initial");
            }, 3000);
            return () => clearTimeout(timer);
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
            setStatus("Succesfully approved!");
            setBundleState("deposit");
            setStatusColor("#00FECF");
          }
        }
      }
    }
  };

  const handleDeposit = async () => {
    setDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const goldenPassContract = new web3.eth.Contract(
        GOLDEN_PASS_ABI,
        golden_pass_address
      );
      await goldenPassContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdown();
          checkApproval();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDepositState("failDeposit");
          console.log(e);

          const timer = setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDepositState("initial");
          }, 3000);
          return () => clearTimeout(timer);
        });
      handleRefreshCountdown();
    } else if (window.WALLET_TYPE === "binance") {
      const goldensc = new ethers.Contract(
        golden_pass_address,
        GOLDEN_PASS_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await goldensc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDepositState("failDeposit");
          console.log(e);
          const timer = setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDepositState("initial");
          }, 3000);
          return () => clearTimeout(timer);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdown();
        checkApproval();
      }

      handleRefreshCountdown();
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: golden_pass_address,
            abi: GOLDEN_PASS_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setDepositState("failDeposit");
            console.log(e);
            const timer = setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setDepositState("initial");
            }, 3000);
            return () => clearTimeout(timer);
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
            setStatus("Bundle successfully purchased!");
            setDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdown();
            checkApproval();
          }
        }
      }
    }
  };

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (coinbase?.toLowerCase() !== wallet?.toLowerCase() || chainId !== 56) {
        setCheckWallet(false);
      } else if (
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setCheckWallet(true);
      }
    } else setCheckWallet(false);
  };

  useEffect(() => {
    getBundlePrizes();
  }, []);

  useEffect(() => {
    checkWalletAddr();
    if (coinbase && wallet && chainId === 56) {
      handleRefreshCountdown();
      checkApproval();
    }
  }, [wallet, chainId, coinbase]);

  useEffect(() => {
    if (!isEOA && isConnected && coinbase) {
      setStatus("Smart contract wallets are not supported for this action.");
      setStatusColor("#FE7A00");
    } else if (isEOA && isConnected && coinbase) {
      setStatus("");
      setStatusColor("#00FECF");
    }
  }, [isEOA, isConnected, coinbase]);

  return (
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
            30th/31st). However, it will reset on the 1st of the following month
            and must be repurchased to stay active.
          </p>

          <h6 className="text-white">How it works:</h6>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Purchase the bundle from the Challenge Center
            </li>
            <li className="package-popup-desc">
              The golden pass is valid for one calendar month, resetting on the
              1st, regardless of the purchase date
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
        <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
          <div className="event-price-wrapper p-3 d-flex align-items-center gap-3">
            <span className="event-price-span">Event Price</span>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <img
                  src={"https://cdn.worldofdypians.com/wod/wodToken.png"}
                  height={30}
                  width={30}
                  alt=""
                />
                <h6 className="event-price-coin mb-0">
                  {getFormattedNumber(goldenPassWodAmount)} WOD
                </h6>
              </div>
              <span className="event-price-usd">
                ($
                {getFormattedNumber(50)})
              </span>
            </div>
          </div>
          <>
            {hasBoughtGolden && timerFinished === false ? (
              <div className="d-flex flex-column gap-1">
                <span className="days3">Active Until:</span>
                <Countdown
                  renderer={renderer}
                  date={Number(countdown) * 1000}
                  onComplete={() => {
                    settimerFinished(true);
                  }}
                />
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
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
                    bundleState === "deposit" || checkWallet === false
                      ? "stake-wod-btn-inactive d-none"
                      : "stake-wod-btn"
                  }  py-2 px-4`}
                  onClick={() => handleApproval()}
                >
                  {bundleState === "loading" ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  disabled={
                    bundleState === "deposit" ||
                    depositState === "loading-deposit" ||
                    checkWallet === true ||
                    isEOA
                      ? false
                      : true
                  }
                  className={` ${
                    bundleState === "deposit" || checkWallet === false
                      ? "stake-wod-btn"
                      : "stake-wod-btn-inactive d-none"
                  }  py-2 px-4`}
                  onClick={() => handleDeposit()}
                >
                  {depositState === "loading-deposit" ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Buy"
                  )}
                </button>
              </div>
            )}
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
  );
};

export default GoldenPassPopup;
