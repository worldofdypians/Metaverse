import React, { useState, useEffect } from "react";
import "./_challenges.scss";
import dragonRuinsBanner from "./assets/dragonRuinsBanner.png";
import bnb from "./assets/bnb.svg";
import dypIcon from "./assets/dypIcon.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import syncIcon from "./assets/syncIcon.svg";
import whiteTooltip from "./assets/whiteTooltip.svg";
import Countdown from "react-countdown";
import { wodAddress } from "../../screens/Account/src/web3";
import { WOD_ABI } from "../../screens/Account/src/web3/abis";
import { token_abi } from "../../screens/Account/src/web3";
import { wod_abi } from "../../screens/Account/src/web3";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

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

const DragonRuins = ({ coinbase, chainId, wallet }) => {
  let dummyDate = new Date("2024-10-01T14:00:00.000+02:00");
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [bundleState, setbundleState] = useState("initial");
  const [depositState, setDepositState] = useState("initial");
  const [countdown, setcountdown] = useState();
  const [showApproval, setshowApproval] = useState(true);
  const [checkWallet, setcheckWallet] = useState(true);
  const [dragonRuinsDypAmount, setDragonRuinsDypAmount] = useState(0);

  const handleRefreshCountdown = async () => {
    const remainingTime = await wod_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();
    setcountdown(remainingTime);
  };

  const getBundlePrizes = async () => {
    const dragonContract = new window.bscWeb3.eth.Contract(WOD_ABI, wodAddress);

    const result_dragon = await dragonContract.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_dragon) {
      setDragonRuinsDypAmount(result_dragon / 1e18);
    }
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

  const checkApproval = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await token_abi.methods
        .allowance(coinbase, wodAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setshowApproval(true);
          } else {
            setshowApproval(false);
            setbundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApproval = async () => {
    setbundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await token_abi.methods
      .approve(wodAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setbundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setbundleState("fail");
      });
  };

  const handleDeposit = async () => {
    setDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");

    await wod_abi.methods
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
      });
    handleRefreshCountdown();
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

  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" />
          <img src={dragonRuinsBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Dragon Ruins</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Dragon Ruins event provides players with the opportunity to
            battle a mystical creature. Players engage in battles with a Dragon,
            and upon winning, they earn points to increase their global rank.
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
              <img src={dypIcon} alt="" />
              <h6 className="event-price-coin mb-0">
                {getFormattedNumber(dragonRuinsDypAmount)} DYP
              </h6>
            </div>
            <span className="event-price-usd">($3.75)</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            disabled={
              bundleState === "deposit" || checkWallet === false ? true : false
            }
            className={` ${
              bundleState === "deposit" || checkWallet === false
                ? "stake-wod-btn-inactive"
                : "stake-wod-btn"
            }  py-2 px-4`}
            onClick={() => {
              handleApproval();
            }}
          >
            Approve
          </button>

          <button
            disabled={
              bundleState === "deposit" && checkWallet === true ? false : true
            }
            className={` ${
              bundleState === "deposit" ||
              (showApproval === false && checkWallet === true)
                ? "stake-wod-btn"
                : "stake-wod-btn-inactive"
            }  py-2 px-4`}
            onClick={() => {
              handleDeposit();
            }}
          >
            Buy
          </button>
        </div>
      </div>
      {countdown !== 0 && countdown && (
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
                date={Number(countdown) * 1000}
                renderer={renderer}
                onComplete={() => {
                  setcountdown();
                }}
              />
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
      )}
    </div>
  );
};

export default DragonRuins;
