import React, { useEffect, useState } from "react";
import puzzleMadnessBanner from "./assets/puzzleMadnessBanner.png";
import bnb from "./assets/bnb.svg";
import idypIcon from "./assets/idypIcon.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import syncIcon from "./assets/syncIcon.svg";
import whiteTooltip from "./assets/whiteTooltip.svg";
import Countdown from "react-countdown";
import { iDYP_3500_ABI } from "../../screens/Account/src/web3/abis";
import { idyp3500Address } from "../../screens/Account/src/web3";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { idyp3500_abi, idyptoken_abi } from "../../screens/Account/src/web3";
import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{days < 10 ? "0" + days : days}</h6>
        <span className="days">Days</span>
      </div>
      <h6 className="mint-time">:</h6>

      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
    </div>
  );
};

const PuzzleMadness = ({ coinbase, chainId, wallet, binanceW3WProvider, onPopupClick }) => {
  const [puzzleMadnessDypAmount, setPuzzleMadnessDypAmount] = useState(0);
  const [statusColor3500, setStatusColor3500] = useState("#FE7A00");
  const [bundleState3500, setbundleState3500] = useState("initial");
  const [depositState3500, setDepositState3500] = useState("initial");
  const [countdown3500, setcountdown3500] = useState();
  const [status3500, setStatus3500] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );
  const [checkWallet, setcheckWallet] = useState(true);

  const [showApproval3500, setshowApproval3500] = useState(true);

  const getBundlePrizes = async () => {
    const puzzleContract = new window.bscWeb3.eth.Contract(
      iDYP_3500_ABI,
      idyp3500Address
    );

    const result_puzzle = await puzzleContract.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_puzzle) {
      setPuzzleMadnessDypAmount(result_puzzle / 1e18);
    }
  };

  const handleRefreshCountdown3500 = async () => {
    const remainingTime = await idyp3500_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();
    setcountdown3500(remainingTime);
  };

  const checkApproval3500 = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await idyptoken_abi.methods
        .allowance(coinbase, idyp3500Address)
        .call()
        .then((data) => {
          if (data === "0" || data < 12600000000000000000000) {
            setshowApproval3500(true);
            setbundleState3500("initial");
          } else {
            setshowApproval3500(false);
            setbundleState3500("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApproval3500 = async () => {
    setbundleState3500("loading");
    setStatus3500("Approving, please wait");
    setStatusColor3500("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await idyptoken_abi.methods
      .approve(idyp3500Address, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus3500("Succesfully approved!");
        setbundleState3500("deposit");
        setStatusColor3500("#00FECF");
      })
      .catch((e) => {
        setStatusColor3500("#FE7A00");
        setStatus3500(e?.message);
        setbundleState3500("fail");
      });
  };

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (coinbase?.toLowerCase() !== wallet?.toLowerCase() || chainId !== 56) {
        setcheckWallet(false);
      } else if (
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setcheckWallet(true);
      }
    } else setcheckWallet(false);
  };

  const handleDeposit3500 = async () => {
    setDepositState3500("loading-deposit");
    setStatus3500("Confirm to complete purchase");
    setStatusColor3500("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await idyp3500_abi.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus3500("Bundle successfully purchased!");
          setDepositState3500("success");
          setStatusColor3500("#00FECF");
          handleRefreshCountdown3500();
          checkApproval3500();
        })
        .catch((e) => {
          setStatusColor3500("#FE7A00");
          setStatus3500(e?.message);
          setDepositState3500("failDeposit");
        });
      handleRefreshCountdown3500();
    } else if (window.WALLET_TYPE === "binance") {
      const token_address = "0x54ad1fAaf2781E58Fcb58b7D02E25c8289a08b06";

      const puzzleSc = new ethers.Contract(
        token_address,
        iDYP_3500_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await puzzleSc
        .deposit({ from: coinbase })
        .catch((e) => {
          setStatusColor3500("#FE7A00");
          setStatus3500(e?.message);
          setDepositState3500("failDeposit");
        });

        const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setStatus3500("Bundle successfully purchased!");
            setDepositState3500("success");
            setStatusColor3500("#00FECF");
            handleRefreshCountdown3500();
            checkApproval3500();
          }

      handleRefreshCountdown3500();
    }
  };

  useEffect(() => {
    getBundlePrizes();
  }, []);

  useEffect(() => {
    if (coinbase && wallet && chainId === 56) {
      checkApproval3500();
    }
    checkWalletAddr();
  }, [wallet, chainId, coinbase]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" onClick={onPopupClick}/>
          <img src={puzzleMadnessBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Puzzle Madness</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            In the Puzzle Madness event, players must find 10 hidden pieces in
            the mining and city maps, earning valuable points to compete on
            daily, weekly, and monthly leaderboards. These pieces also include a
            score multiplier, ranging from x2 to x10, which activates after
            collecting all 10, significantly increasing earned points.
          </p>
        </div>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <h6 className="mb-0 purchase-package-title">Purchase</h6>
        <div className="d-flex align-items-end gap-2">
          <span className="available-on">Available on</span>
          <img src={bnb} width={20} height={20} alt="" />
          <span className="purchase-chain">BNB Chain</span>
        </div>
      </div>
      <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
        <div className="event-price-wrapper p-3 d-flex align-items-center gap-5">
          <span className="event-price-span">Event Price</span>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <img src={idypIcon} alt="" />
              <h6 className="event-price-coin mb-0">
                {getFormattedNumber(puzzleMadnessDypAmount)} DYP
              </h6>
            </div>
            <span className="event-price-usd">($6.5)</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            disabled={
              bundleState3500 === "deposit" || checkWallet === false
                ? true
                : false
            }
            className={` ${
              bundleState3500 === "deposit" || checkWallet === false
                ? "stake-wod-btn-inactive"
                : "stake-wod-btn"
            }  py-2 px-4`}
            onClick={() => {
              handleApproval3500();
            }}
          >
            {bundleState3500 === "loading" ? (
              <>
                {" "}
                Approving{" "}
                <CircularProgress
                  size={10}
                  style={{ alignSelf: "center", margin: "auto" }}
                />
              </>
            ) : (
              "Approve"
            )}
          </button>
          <button
            disabled={
              bundleState3500 === "deposit" && checkWallet === true
                ? false
                : true
            }
            className={` ${
              (bundleState3500 === "deposit" || showApproval3500 === false) &&
              checkWallet === true
                ? "stake-wod-btn"
                : "stake-wod-btn-inactive"
            }  py-2 px-4`}
            onClick={() => {
              handleDeposit3500();
            }}
          >
            {depositState3500 === "loading-deposit" ? (
              <>
                Buying
                <CircularProgress
                  size={10}
                  style={{ alignSelf: "center", margin: "auto" }}
                />
              </>
            ) : (
              "Buy"
            )}
          </button>
        </div>
      </div>
      {countdown3500 && (
        <div className="new-event-wrapper mt-5 p-3">
          <div className="d-flex flex-column gap-2">
            <div className=" d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between w-100">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 time-remaining">
                    Available Time Remaining
                  </h6>
                  <img src={whiteTooltip} width={20} height={20} alt="" />
                </div>
                <p className="sync-desc mb-0">
                  Use in-game
                  <img
                    src={syncIcon}
                    className="mx-1"
                    width={20}
                    height={20}
                    alt=""
                  />
                  sync button every time you purchase a bundle
                </p>
              </div>
              <Countdown
                date={Number(countdown3500) * 1000}
                renderer={renderer}
                onComplete={() => {
                  setcountdown3500();
                }}
              />
            </div>
            <span
              className="statusText"
              style={{
                color: statusColor3500,
                width: "fit-content",
              }}
            >
              {status3500}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleMadness;
