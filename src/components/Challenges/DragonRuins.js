import React, { useState, useEffect } from "react";
import "./_challenges.scss";
import dragonRuinsBanner from "./assets/dragonRuinsBanner.webp";
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
import { ethers } from "ethers";

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
        <h6 className="mint-time3 mb-0">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days3">Minutes</span>
      </div>
    </div>
  );
};

const DragonRuins = ({ coinbase, chainId, wallet, binanceW3WProvider, onPopupClick }) => {
  let dummyDate = new Date("2024-10-01T14:00:00.000+02:00");
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your game profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [bundleState, setbundleState] = useState("initial");
  const [depositState, setDepositState] = useState("initial");
  const [countdown, setcountdown] = useState();
  const [showApproval, setshowApproval] = useState(true);
  const [checkWallet, setcheckWallet] = useState(true);
  const [dragonRuinsDypAmount, setDragonRuinsDypAmount] = useState(0);


  const now = new Date();
  // const isMonday = now.getDay() === 1; 
  const isMonday =true; 


  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0); 
  const timeUntilMidnight = nextMidnight - now;

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
    if (window.WALLET_TYPE !== "binance") {
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
    } else if (window.WALLET_TYPE === "binance") {
      const dragonRuins_address = "0x6837Da6fC313D9218AF7FC9C27dcC088a128bdab";

      const dragonsc = new ethers.Contract(
        dragonRuins_address,
        WOD_ABI,
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

      // let gasLimit;
      // console.log('dragonsc',dragonsc.callStatic.deposit())
      // try {
      //   gasLimit = await dragonsc.estimateGas.deposit();
      //   transactionParameters.gasLimit = gasLimit;
      //   console.log("transactionParameters", transactionParameters);
      // } catch (error) {
      //   console.error(error);
      // }

      const txResponse = await dragonsc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDepositState("failDeposit");
          console.log(e);
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
    }
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
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" onClick={onPopupClick}/>
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
      <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative" >
        <div className="event-price-wrapper p-3 d-flex align-items-center gap-5" style={{pointerEvents: isMonday ? "auto" : "none", filter: isMonday ? "none" : "blur(5px)"}}>
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
        {/* {!isMonday ? 
        <h6 className="available-day-text mb-0 text-white" style={{fontWeight: "700", fontSize: "18px"}}>Available on Monday</h6>  
        :
        <div className="position-relative">
          <Countdown renderer={renderer} date={Date.now() + timeUntilMidnight} />
        </div>
      } */}
        <div className="d-flex align-items-center gap-3" style={{pointerEvents: isMonday ? "auto" : "none", filter: isMonday ? "none" : "blur(5px)"}}>
          <button
            disabled={
              // bundleState === "deposit" || checkWallet === false  || !isMonday ?
               true 
              //  : false
            }
            // className={` ${
            //   bundleState === "deposit" || checkWallet === false || !isMonday
            //     ? "stake-wod-btn-inactive"
            //     : "stake-wod-btn"
            // }  py-2 px-4`}

            className={` 
              stake-wod-btn-inactive py-2 px-4`}

            // onClick={() => {
            //   handleApproval();
            // }}
          >
            Approve
          </button>

          <button
            disabled={
              // bundleState === "deposit" && checkWallet === true || isMonday ? false :
               true
            }
            // className={` ${
            //   bundleState === "deposit" ||
            //   (showApproval === false && checkWallet === true)
            //     ? "stake-wod-btn"
            //     : "stake-wod-btn-inactive"
            // }  py-2 px-4`}

            className={`stake-wod-btn-inactive py-2 px-4`}

            // onClick={() => {
            //   handleDeposit();
            // }}
          >
            Buy
          </button>
        </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DragonRuins;



// style={{pointerEvents: isMonday ? "auto" : "none", filter: isMonday ? "none" : "blur(5px)"}}