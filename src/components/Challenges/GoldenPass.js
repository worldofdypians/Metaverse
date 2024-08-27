import React, { useState, useEffect } from "react";
import "./_challenges.scss";
import goldenPassBanner from "./assets/goldenPassBanner.png";
import bnb from "./assets/bnb.svg";
import dypIcon from "./assets/dypIcon.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import syncIcon from "./assets/syncIcon.svg";
import whiteTooltip from "./assets/whiteTooltip.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";
import Countdown from "react-countdown";
import OutsideClickHandler from "react-outside-click-handler";
import {
  dyp700Address,
  dyp700v1Address,
  token_abi,
  token_abi_old,
} from "../../screens/Account/src/web3";
import {
  DYP_700V1_ABI,
  DYP_700_ABI,
} from "../../screens/Account/src/web3/abis";
import { dyp700_abi, dyp700v1_abi } from "../../screens/Account/src/web3";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
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

const GoldenPass = ({ coinbase, wallet, chainId, binanceW3WProvider }) => {
  const [dropdown, setDropdown] = useState(false);
  const [eventPrice, setEventPrice] = useState("DYP v2");
  const [goldenPassDypAmountV1, setGoldenPassDypAmountV1] = useState(0);
  const [goldenPassDypAmountV2, setGoldenPassDypAmountV2] = useState(0);
  const [status700, setStatus700] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );
  const [statusColor700, setStatusColor700] = useState("#FE7A00");
  const [bundleState700, setbundleState700] = useState("initial");
  const [depositState700, setDepositState700] = useState("initial");
  const [countdown700, setcountdown700] = useState();
  const [showApproval700, setshowApproval700] = useState(true);
  const [checkWallet, setcheckWallet] = useState(true);
  const [bundlesBought, setbundlesBought] = useState(0);
  const [isAtlimit, setisAtlimit] = useState(false);
  const [priceType, setPriceType] = useState(1);

  const getBundlePrizes = async () => {
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

    const result_dypv1 = await dypv1.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_dypv1) {
      setGoldenPassDypAmountV1(result_dypv1 / 1e18);
    }

    const result_dypv2 = await dypv2.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_dypv2) {
      setGoldenPassDypAmountV2(result_dypv2 / 1e18);
    }
  };

  const handleRefreshCountdown700 = async () => {
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

    const remainingTimev1 = await dypv1.methods
      .getTimeOfExpireBuff(coinbase)
      .call();

    const remainingTimev2 = await dypv2.methods
      .getTimeOfExpireBuff(coinbase)
      .call();

    var remainingTime_milisecondsv2 = remainingTimev2 * 1000;

    var remainingTime_milisecondsv1 = remainingTimev1 * 1000;
    const timeofDepositv1 = await dypv1.methods
      .getTimeOfDeposit(coinbase)
      .call();

    const timeofDepositv2 = await dypv2.methods
      .getTimeOfDeposit(coinbase)
      .call();

    if (timeofDepositv1 !== 0 || timeofDepositv2 !== 0) {
      remainingTime_milisecondsv1 = timeofDepositv1 * 1000;
      remainingTime_milisecondsv2 = timeofDepositv2 * 1000;

      const timeofDeposit_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(remainingTime_milisecondsv1);

      const timeofDeposit_Date_formattedv1 = new Date(timeofDeposit_Datev1);

      const timeofDeposit_Hoursv1 = timeofDeposit_Date_formattedv1.getHours();
      const timeofDeposit_Minutesv1 =
        timeofDeposit_Date_formattedv1.getMinutes();
      const finalHoursv1 = timeofDeposit_Hoursv1 - 11;

      const finalMinutesv1 = timeofDeposit_Minutesv1 - 11;

      const resultv1 =
        remainingTimev1 - finalHoursv1 * 60 * 60 - finalMinutesv1 * 60;

      const timeofDeposit_Datev2 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(remainingTime_milisecondsv2);

      const timeofDeposit_Date_formattedv2 = new Date(timeofDeposit_Datev2);
      const timeofDeposit_day = timeofDeposit_Date_formattedv2.getDate();
      const timeofDeposit_Hoursv2 = timeofDeposit_Date_formattedv2.getHours();
      const timeofDeposit_Minutesv2 =
        timeofDeposit_Date_formattedv2.getMinutes();
      const finalHoursv2 = timeofDeposit_Hoursv2 - 11;

      const finalMinutesv2 = timeofDeposit_Minutesv2 - 11;

      const resultv2 =
        remainingTimev2 - finalHoursv2 * 60 * 60 - finalMinutesv2 * 60;
      setcountdown700((resultv2 + resultv1) * 1000);
      // setcountdown700(result * 1000);
      //
    } else {
      setcountdown700();
    }
  };

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (coinbase?.toLowerCase() !== wallet?.toLowerCase() || chainId !== 56) {
        setcheckWallet(false);
      }
      if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
        if (priceType === 1) {
          setcheckWallet(true);
        } else if (priceType === 0) {
          setcheckWallet(false);
        } else setcheckWallet(true);
      }
      if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 1) {
        if (priceType === 1) {
          setcheckWallet(false);
        } else if (priceType === 0) {
          setcheckWallet(true);
        }
      }
    } else setcheckWallet(false);
  };

  const checkApproval700 = async (tokenType) => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase()) {
      if (tokenType === 1 && chainId === 56) {
        await token_abi.methods
          .allowance(coinbase, dyp700Address)
          .call()
          .then((data) => {
            if (data === "0" || data < 2100000000000000000000) {
              setshowApproval700(true);
              setbundleState700("initial");
              setDepositState700("initial");
            } else {
              setshowApproval700(false);
              setbundleState700("deposit");
              setDepositState700("deposit");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (tokenType === 0 && chainId === 1) {
        await token_abi_old.methods
          .allowance(coinbase, dyp700v1Address)
          .call()
          .then((data) => {
            if (data === "0" || data < 2100000000000000000000) {
              setshowApproval700(true);
              setbundleState700("initial");
              setDepositState700("initial");
            } else {
              setshowApproval700(false);
              setbundleState700("deposit");
              setDepositState700("deposit");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const handleApproval700 = async () => {
    setbundleState700("loading");
    setStatus700("Approving, please wait");
    setStatusColor700("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (priceType === 1) {
      await token_abi.methods
        .approve(dyp700Address, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus700("Succesfully approved!");
          setbundleState700("deposit");
          setStatusColor700("#00FECF");
          setDepositState700("deposit");
        })
        .catch((e) => {
          console.error(e);
          setStatusColor700("#FE7A00");
          setStatus700(e?.message);
          setbundleState700("fail");
        });
    } else if (priceType === 0) {
      await token_abi_old.methods
        .approve(dyp700v1Address, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus700("Succesfully approved!");
          setbundleState700("deposit");
          setStatusColor700("#00FECF");
          setDepositState700("deposit");
        })
        .catch((e) => {
          console.error(e);
          setStatusColor700("#FE7A00");
          setStatus700(e?.message);
          setbundleState700("fail");
        });
    }
  };

  const insertBundle = async () => {
    const data = { address: coinbase };
    const result = await axios
      .post("https://api3.dyp.finance/api/bundles/insert", data)
      .catch((e) => {
        console.log(e);
      });
  };

  const increaseBundle = async () => {
    const result = await axios.get(
      `https://api3.dyp.finance/api/bundles/count/${coinbase}`
    );

    const result_formatted = result.data.count;
    if (result_formatted <= 4) {
      if (parseInt(result_formatted) === 0) {
        setbundlesBought(0);
      } else if (parseInt(result_formatted) === 1) {
        setbundlesBought(1);
      } else if (parseInt(result_formatted) === 2) {
        setbundlesBought(2);
      } else if (parseInt(result_formatted) === 3) {
        setbundlesBought(3);
      } else if (parseInt(result_formatted) === 4) {
        setbundlesBought(4);
      }
    }
  };

  const handleDeposit700 = async (priceType) => {
    setDepositState700("loading-deposit");
    setStatus700("Confirm to complete purchase");
    setStatusColor700("#00FECF");

    if (window.WALLET_TYPE !== "binance") {
      if (priceType === 1) {
        await dyp700_abi.methods
          .deposit()
          .send({ from: coinbase })
          .then(() => {
            setStatus700("Bundle successfully purchased!");
            setDepositState700("success");
            setStatusColor700("#00FECF");
            insertBundle();
            increaseBundle();
            handleRefreshCountdown700();
            checkApproval700(priceType);
          })
          .catch((e) => {
            setStatusColor700("#FE7A00");
            setStatus700(e?.message);
            setDepositState700("failDeposit");
          });
      } else if (priceType === 0) {
        await dyp700v1_abi.methods
          .deposit()
          .send({ from: coinbase })
          .then(() => {
            setStatus700("Bundle successfully purchased!");
            setDepositState700("success");
            setStatusColor700("#00FECF");
            insertBundle();
            increaseBundle();
            handleRefreshCountdown700();
            checkApproval700(priceType);
          })
          .catch((e) => {
            setStatusColor700("#FE7A00");
            setStatus700(e?.message);
            setDepositState700("failDeposit");
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      if (priceType === 1) {
        const dyp700_address = "0xd16DAad6bEd59a2c6806868855A05f4abF3b2ac9";
        const goldenSc = new ethers.Contract(
          dyp700_address,
          DYP_700_ABI,
          binanceW3WProvider.getSigner()
        );
       const txResponse = await goldenSc
          .deposit({ from: coinbase })
          .catch((e) => {
            setStatusColor700("#FE7A00");
            setStatus700(e?.message);
            setDepositState700("failDeposit");
          });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setStatus700("Bundle successfully purchased!");
            setDepositState700("success");
            setStatusColor700("#00FECF");
            insertBundle();
            increaseBundle();
            handleRefreshCountdown700();
            checkApproval700(priceType);
          }

      } else if (priceType === 0) {
        const dyp700_address = "0x6493e45F0D9B81355035f07d6FAf59309B2e2f89";
        const goldenSc = new ethers.Contract(
          dyp700_address,
          DYP_700V1_ABI,
          binanceW3WProvider.getSigner()
        );

       const txResponse = await goldenSc
          .deposit({ from: coinbase })
          .catch((e) => {
            setStatusColor700("#FE7A00");
            setStatus700(e?.message);
            setDepositState700("failDeposit");
          });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setStatus700("Bundle successfully purchased!");
            setDepositState700("success");
            setStatusColor700("#00FECF");
            insertBundle();
            increaseBundle();
            handleRefreshCountdown700();
            checkApproval700(priceType);
          }

      }
    }
  };

  useEffect(() => {
    getBundlePrizes();
  }, []);

  useEffect(() => {
    if (coinbase) {
      checkApproval700(1);
    }
  }, [coinbase]);

  useEffect(() => {
    checkWalletAddr();
    increaseBundle();
  }, [wallet, chainId, coinbase]);

  useEffect(() => {
    if (bundlesBought === 1) {
      setisAtlimit(true);
      handleRefreshCountdown700();
      setStatus700(
        "The Golden Pass bundle is currently not available for purchase. Please check back next month."
      );
    }
  }, [bundlesBought]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={tooltipIcon} className="new-event-banner-tooltip" alt="" />
          <img src={goldenPassBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Golden Pass</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Golden Pass bundle allows players to earn extra rewards based on
            their leaderboard ranking. The bundle is available for one month and
            can be purchased only once during that month. It offers exclusive
            benefits and boosts to enhance the gaming experience.
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
          <div className="d-flex flex-column gap-2">
            <span className="event-price-span">Event Price</span>
            <div className="position-relative">
              <div
                className="event-price-dropdown p-2 d-flex align-items-center justify-content-between"
                onClick={() => setDropdown(true)}
              >
                <span className="event-price-text">{eventPrice}</span>
                <img src={dropdownIcon} alt="" />
              </div>
              <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
                <div
                  className={`event-price-dropdown-2 ${
                    dropdown && "active-dropdown"
                  } p-2 d-flex flex-column gap-2`}
                >
                  <div
                    className="event-price-dropdown-item p-1"
                    onClick={() => {
                      setEventPrice("DYP v1");
                      setPriceType(0);
                      checkApproval700(0);
                      setDropdown(false);
                    }}
                  >
                    <span className="event-price-text">DYP v1</span>
                  </div>
                  <div
                    className="event-price-dropdown-item p-1"
                    onClick={() => {
                      setEventPrice("DYP v2");
                      setPriceType(1);
                      checkApproval700(1);
                      setDropdown(false);
                    }}
                  >
                    <span className="event-price-text">DYP v2</span>
                  </div>
                </div>
              </OutsideClickHandler>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <img src={dypIcon} alt="" />
            </div>
            <div className="d-flex flex-column gap-1">
              <h6 className="event-price-coin mb-0">
                {getFormattedNumber(
                  priceType === 0
                    ? goldenPassDypAmountV1
                    : goldenPassDypAmountV2
                )}{" "}
                {eventPrice}
              </h6>
              <span className="event-price-usd">($100)</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            disabled={
              bundleState700 === "deposit" ||
              checkWallet === false ||
              (priceType === 0 && chainId !== 1) ||
              (priceType === 1 && chainId !== 56) ||
              isAtlimit == true
                ? true
                : false
            }
            className={` ${
              bundleState700 === "deposit" ||
              checkWallet === false ||
              isAtlimit == true ||
              (priceType === 0 && chainId !== 1) ||
              (priceType === 1 && chainId !== 56)
                ? "stake-wod-btn-inactive"
                : "stake-wod-btn"
            }  py-2 px-4`}
            onClick={() => {
              handleApproval700();
            }}
          >
            {bundleState700 === "loading" ? (
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
              isAtlimit === true ||
              checkWallet === false ||
              (priceType === 0 && chainId !== 1) ||
              (priceType === 1 && chainId !== 56) ||
              depositState700 !== "deposit"
                ? true
                : false
            }
            className={` ${
              (depositState700 === "deposit" || showApproval700 === false) &&
              ((priceType === 0 && chainId === 1) ||
                (priceType === 1 && chainId === 56)) &&
              checkWallet === true &&
              isAtlimit === false
                ? "stake-wod-btn"
                : "stake-wod-btn-inactive"
            }  py-2 px-4`}
            onClick={() => {
              handleDeposit700(priceType);
            }}
          >
            {depositState700 === "loading-deposit" ? (
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
      {countdown700 !== 0 && countdown700 && (
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
                date={Number(countdown700)}
                renderer={renderer}
                onComplete={() => {
                  setcountdown700();
                  setisAtlimit(false);
                }}
              />
            </div>
            <span
              className="statusText"
              style={{
                color: statusColor700,
                width: "fit-content",
              }}
            >
              {status700}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldenPass;
