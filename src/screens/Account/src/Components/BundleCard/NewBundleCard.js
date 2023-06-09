import React, { useState, useEffect } from "react";
import "./_bundle.scss";
import dypius from "../../Images/userProfile/dypius.svg";
import idyp from "../../Images/userProfile/idyp.svg";
import filledCircle from "../../Images/userProfile/filled-circlecheck.svg";
import bnbChain from "../../Images/userProfile/bnbChain.svg";
import dragon from "../../Images/userProfile/dragon.png";
import dragonPackage from "./assets/dragonPackageIcon.webp";
import criticalHit from "./assets/criticalHit.webp";
import goldenPass from "./assets/goldenPass.png";
import puzzleMadness from "./assets/puzzleMadness.png";

import {
  wod_abi,
  token_abi,
  idyptoken_abi,
  dyp700_abi,
  idyp3500_abi,
  wodAddress,
  dyp700Address,
  idyp3500Address,
} from "../../web3";
import { CircularProgress } from "@mui/material";
import Countdown from "react-countdown";
import tooltipIcon from "./assets/tooltipIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import progress1 from "./assets/progress1.svg";
import progress2 from "./assets/progress2.svg";
import axios from "axios";
import opensea from "./assets/opensea.svg";
import Slider from "rc-slider";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};

const renderer700 = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{days < 10 ? "0" + days : days}</h6>
        <span className="days">Days</span>
      </div>
      <h6 className="mint-time">:</h6>

      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
    </div>
  );
};

const NewBundleCard = ({
  coinbase,
  wallet,
  chainId,
  username,
  email,
  getDypBalance,
  packageData,
  getiDypBalance,
  availableTime,
  handleSetAvailableTime,
}) => {
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderValue700, setSliderValue700] = useState(1);
  const [sliderValue3500, setSliderValue3500] = useState(1);

  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );

  const [status700, setStatus700] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );

  const [status3500, setStatus3500] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
  );
  const [statusCritical, setStatusCritical] = useState("");

  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [statusColor700, setStatusColor700] = useState("#FE7A00");
  const [statusColor3500, setStatusColor3500] = useState("#FE7A00");

  const [bundleState, setbundleState] = useState("initial");
  const [depositState, setDepositState] = useState("initial");
  const [progressValue, setProgressValue] = useState(0);

  const [bundleState700, setbundleState700] = useState("initial");
  const [depositState700, setDepositState700] = useState("initial");

  const [bundleState3500, setbundleState3500] = useState("initial");
  const [depositState3500, setDepositState3500] = useState("initial");

  const [countdown, setcountdown] = useState();
  const [countdown700, setcountdown700] = useState();
  const [countdown3500, setcountdown3500] = useState();
  const [showApproval, setshowApproval] = useState(true);
  const [showApproval700, setshowApproval700] = useState(true);
  const [showApproval3500, setshowApproval3500] = useState(true);

  const [checkWallet, setcheckWallet] = useState(true);
  const [bundlesBought, setbundlesBought] = useState(0);
  const [isAtlimit, setisAtlimit] = useState(false);
  const [lastDayofBundle, setlastDayofBundle] = useState(0);
  const [bundleExpireDay, setbundleExpireDay] = useState(0);
  const [bundleExpireMiliseconds, setbundleExpireMiliseconds] = useState(0);

  const [lastDayofBundleMilliseconds, setlastDayofBundleMilliseconds] =
    useState(0);
  const [lastDayofBundleHours, setlastDayofBundleHours] = useState(0);
  const [lastDayofBundleMinutes, setlastDayofBundleMinutes] = useState(0);

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (coinbase !== wallet || chainId !== 56) {
        setcheckWallet(false);
      }
      if (coinbase === wallet && chainId === 56) {
        setcheckWallet(true);
      }
    } else setcheckWallet(false);
  };

  const checkApproval = async () => {
    if (coinbase === wallet && chainId === 56) {
      await token_abi.methods
        .allowance(coinbase, wodAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 50000000000000000000) {
            setshowApproval(true);
          } else {
            setshowApproval(false);
            setSliderValue(2);
            setbundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const checkApproval700 = async () => {
    if (coinbase === wallet && chainId === 56) {
      await token_abi.methods
        .allowance(coinbase, dyp700Address)
        .call()
        .then((data) => {
          if (data === "0" || data < 700000000000000000000) {
            setshowApproval700(true);
            setbundleState700("initial");
          } else {
            setshowApproval700(false);
            setSliderValue700(2);
            setbundleState700("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const checkApproval3500 = async () => {
    if (coinbase === wallet && chainId === 56) {
      await idyptoken_abi.methods
        .allowance(coinbase, idyp3500Address)
        .call()
        .then((data) => {
          if (data === "0" || data < 3500000000000000000000) {
            setshowApproval3500(true);
            setbundleState3500("initial");
          } else {
            setshowApproval3500(false);
            setSliderValue3500(2);
            setbundleState3500("deposit");
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
      .approve(wodAddress, "500000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setbundleState("deposit");
        setStatusColor("#00FECF");
        setSliderValue(2);
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setbundleState("fail");
      });
  };

  const handleApproval700 = async () => {
    setbundleState700("loading");
    setStatus700("Approving, please wait");
    setStatusColor700("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await token_abi.methods
      .approve(dyp700Address, "500000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus700("Succesfully approved!");
        setbundleState700("deposit");
        setStatusColor700("#00FECF");
        setSliderValue700(2);
      })
      .catch((e) => {
        setStatusColor700("#FE7A00");
        setStatus700(e?.message);
        setbundleState700("fail");
      });
  };

  const handleApproval3500 = async () => {
    setbundleState3500("loading");
    setStatus3500("Approving, please wait");
    setStatusColor3500("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await idyptoken_abi.methods
      .approve(idyp3500Address, "500000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus3500("Succesfully approved!");
        setbundleState3500("deposit");
        setStatusColor3500("#00FECF");
        setSliderValue3500(2);
      })
      .catch((e) => {
        setStatusColor3500("#FE7A00");
        setStatus3500(e?.message);
        setbundleState3500("fail");
      });
  };

  const handleJoinLottery = async () => {
    const data = {
      player_name: username,
      player_email: email,
      wallet_address: wallet,
    };
    await axios
      .post(`https://api3.dyp.finance/api/accounts_platform/insert`, data)
      .then((data) => {
        console.log(data.data.message);
      })
      .catch((e) => {
        console.log(e);
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
        handleJoinLottery();
        getDypBalance();
        handleRefreshCountdown();
        checkApproval();
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setDepositState("failDeposit");
      });
    handleRefreshCountdown();
  };

  const increaseBundle = async () => {
    const result = await axios.get(
      `https://api3.dyp.finance/api/bundles/count/${coinbase}`
    );

    const result_formatted = result.data.count;
    if (result_formatted <= 4) {
      if (parseInt(result_formatted) === 0) {
        setbundlesBought(1);
        setProgressValue(25);
      } else if (parseInt(result_formatted) === 1) {
        setbundlesBought(1);
        setProgressValue(25);
      } else if (parseInt(result_formatted) === 2) {
        setProgressValue(50);
        setbundlesBought(2);
      } else if (parseInt(result_formatted) === 3) {
        setProgressValue(75);
        setbundlesBought(3);
      } else if (parseInt(result_formatted) === 4) {
        setProgressValue(100);
        setbundlesBought(4);
      }
    }
  };

  const setlastDay = async () => {
    const timeofDeposit = await dyp700_abi.methods
      .getTimeOfDeposit(coinbase)
      .call();

    const expiringTime = await dyp700_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();

    const expiringTime_miliseconds = expiringTime * 1000;

    const expiringTime_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(expiringTime_miliseconds);

    const expiringTime_Date_formatted = new Date(expiringTime_Date);
    const expiringTime_day = expiringTime_Date_formatted.getDate();
    setbundleExpireDay(expiringTime_day);
    setbundleExpireMiliseconds(expiringTime_miliseconds);
    const timeofDeposit_miliseconds = timeofDeposit * 1000;

    const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(expiringTime_miliseconds);

    const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
    const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
    const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
    const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
    const final = timeofDeposit_Hours - 11;
    setlastDayofBundleHours(final);

    const finalMinutes = timeofDeposit_Minutes - 11;

    setlastDayofBundleMinutes(finalMinutes);
    setlastDayofBundle(timeofDeposit_day);
    setlastDayofBundleMilliseconds(expiringTime_miliseconds);
  };

  const insertBundle = async () => {
    const data = { address: coinbase };
    const result = await axios
      .post("https://api3.dyp.finance/api/bundles/insert", data)
      .catch((e) => {
        console.log(e);
      });

    console.log(result);
  };

  const handleDeposit700 = async () => {
    setDepositState700("loading-deposit");
    setStatus700("Confirm to complete purchase");
    setStatusColor700("#00FECF");

    setlastDay();

    await dyp700_abi.methods
      .deposit()
      .send({ from: coinbase })
      .then(() => {
        setStatus700("Bundle successfully purchased!");
        setDepositState700("success");
        setStatusColor700("#00FECF");
        getDypBalance();
        checkBundleDates();
        checkApproval700();
        insertBundle();
        increaseBundle();
      })
      .catch((e) => {
        setStatusColor700("#FE7A00");
        setStatus700(e?.message);
        setDepositState700("failDeposit");
      });
  };

  const handleDeposit3500 = async () => {
    setDepositState3500("loading-deposit");
    setStatus3500("Confirm to complete purchase");
    setStatusColor3500("#00FECF");

    await idyp3500_abi.methods
      .deposit()
      .send({ from: coinbase })
      .then(() => {
        setStatus3500("Bundle successfully purchased!");
        setDepositState3500("success");
        setStatusColor3500("#00FECF");
        getiDypBalance();
        handleRefreshCountdown3500();
        checkApproval3500();
      })
      .catch((e) => {
        setStatusColor3500("#FE7A00");
        setStatus3500(e?.message);
        setDepositState3500("failDeposit");
      });
    handleRefreshCountdown3500();
  };

  const handleRefreshCountdown = async () => {
    const remainingTime = await wod_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();
    setcountdown(remainingTime);
  };

  const handleRefreshCountdown700 = async () => {
    const remainingTime = await dyp700_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();

    const remainingTime_miliseconds = remainingTime * 1000;
    const timeofDeposit = await dyp700_abi.methods
      .getTimeOfDeposit(coinbase)
      .call();
    if (timeofDeposit !== 0) {
      const timeofDeposit_miliseconds = timeofDeposit * 1000;

      const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(remainingTime_miliseconds);

      const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
      const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
      const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
      const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
      const finalHours = timeofDeposit_Hours - 11;

      const finalMinutes = timeofDeposit_Minutes - 11;

      const result = remainingTime - finalHours * 60 * 60 - finalMinutes * 60;
      setcountdown700(result * 1000);
      handleSetAvailableTime(result * 1000);
    } else {
      setcountdown700();
      handleSetAvailableTime();
    }
  };

  const handleRefreshCountdown3500 = async () => {
    const remainingTime = await idyp3500_abi.methods
      .getTimeOfExpireBuff(coinbase)
      .call();
    setcountdown3500(remainingTime);
  };

  let oneJune = new Date("2023-06-01 11:11:00 GMT+02:00");
  let oneJuly = new Date("2023-07-01 11:11:00 GMT+02:00");

  let today = new Date();
  let twentyfivemay = new Date("2023-05-25 11:11:00 GMT+02:00");
  let twentyfivejune = new Date("2023-06-25 11:11:00 GMT+02:00");

  const checkBundleDates = async () => {
    //you can check how many bundles the user has bought
    //he can buy until the 22 regular bundles (7days)
    //on the 23rd the bundle will be 7+4
    //last week rule: 32 - date => buy on 24rth=>7+1, 25=> 7+0, 26=> 7-1

    const week1 = ["1", "2", "3", "4", "5", "6", "7"];
    const week2 = ["8", "9", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25"];

    const timeofDeposit = await dyp700_abi.methods
      .getTimeOfDeposit(coinbase)
      .call();
    const timeofDeposit_miliseconds = timeofDeposit * 1000;

    const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timeofDeposit_miliseconds);

    const today = new Date();
    const today_date = today.getDate();

    const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
    const timeofDeposit_date = timeofDeposit_Date_formatted
      .getDate()
      .toString();

    if (today_date <= 25) {
      if (week1.includes(today_date.toString()) && bundlesBought <= 3) {
        setisAtlimit(false);
        handleRefreshCountdown700();
      } else if (week1.includes(today_date.toString()) && bundlesBought > 3) {
        const remainingTime_day = bundleExpireDay;
        const remainingTime_miliseconds = bundleExpireMiliseconds;

        if (parseInt(remainingTime_day) >= 25) {
          const additional_remainingTime_time = 31 - remainingTime_day;
          const additional_remaining_time_timestamp =
            additional_remainingTime_time * 24 * 60 * 60 -
            lastDayofBundleHours * 60 * 60 -
            lastDayofBundleMinutes * 60;

          const final =
            Number(remainingTime_miliseconds) +
            Number(additional_remaining_time_timestamp * 1000);

          setcountdown700(final);
          handleSetAvailableTime(final);
          setisAtlimit(true);
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      } else if (week2.includes(today_date.toString()) && bundlesBought <= 2) {
        handleRefreshCountdown700();
        setisAtlimit(false);
      } else if (week2.includes(today_date.toString()) && bundlesBought >= 3) {
        const remainingTime2 = lastDayofBundle;
        if (parseInt(remainingTime2) >= 25) {
          const additional_remainingTime_time2 = 31 - remainingTime2;
          const additional_remaining_time_timestamp2 =
            additional_remainingTime_time2 * 24 * 60 * 60 -
            lastDayofBundleHours * 60 * 60 -
            lastDayofBundleMinutes * 60;
          const remainingTime_miliseconds2 = bundleExpireMiliseconds;

          const final =
            Number(remainingTime_miliseconds2) +
            Number(additional_remaining_time_timestamp2 * 1000);

          setcountdown700(final);
          handleSetAvailableTime(final);
          setisAtlimit(true);
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      } else if (week3.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
        setisAtlimit(false);
      } else if (week3.includes(today_date.toString()) && bundlesBought > 3) {
        const remainingTime3 = lastDayofBundle;
        const remainingTime_miliseconds3 = bundleExpireMiliseconds;

        if (parseInt(remainingTime3) >= 25) {
          const additional_remainingTime_time3 = 31 - remainingTime3;
          const additional_remaining_time_timestamp3 =
            additional_remainingTime_time3 * 24 * 60 * 60 -
            lastDayofBundleHours * 60 * 60 -
            lastDayofBundleMinutes * 60;

          const final =
            Number(remainingTime_miliseconds3) +
            Number(additional_remaining_time_timestamp3 * 1000);

          setcountdown700(final);
          handleSetAvailableTime(final);
          setisAtlimit(true);
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      } else if (week4.includes(today_date.toString()) && today_date <= 22) {
        handleRefreshCountdown700();
        setisAtlimit(false);
      } else if (week4.includes(today_date.toString()) && today_date > 22) {
        if (today > oneJune && lastDayofBundleMilliseconds > 0) {
          setisAtlimit(true);
          setcountdown700(oneJuly.getTime());
          handleSetAvailableTime(oneJuly.getTime());
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        } else if (today > oneJune && lastDayofBundleMilliseconds == 0) {
          setisAtlimit(true);
          setcountdown700();
          handleSetAvailableTime();
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        } else if (today < oneJune && lastDayofBundleMilliseconds > 0) {
          setisAtlimit(true);
          setcountdown700(oneJuly.getTime());
          handleSetAvailableTime(oneJuly.getTime());
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        } else if (today < oneJune && lastDayofBundleMilliseconds == 0) {
          setisAtlimit(true);
          setcountdown700();
          handleSetAvailableTime();
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      }
    } else if (today_date > 25) {
      if (lastDayofBundleMilliseconds > 0) {
        setisAtlimit(true);
        setcountdown700(oneJuly.getTime());
        handleSetAvailableTime(oneJuly.getTime());
        setStatus700(
          "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        );
        setStatusColor700("#FE7A00");
      } else {
        setisAtlimit(true);
        setcountdown700();
        handleSetAvailableTime();
        setStatus700(
          "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        );
        setStatusColor700("#FE7A00");
      }
    }
  };

  useEffect(() => {
    if (packageData.title === "Dragon Ruins") {
      handleRefreshCountdown();
    } else if (packageData.title === "Puzzle Madness") {
      handleRefreshCountdown3500();
    }
    checkBundleDates();
    checkWalletAddr();
    checkApproval700();
    setlastDay();
    checkApproval3500();
    checkApproval();
    increaseBundle();
  }, [
    coinbase,
    chainId,
    packageData.title,
    lastDayofBundle,
    status700,
    bundlesBought,
  ]);

  useEffect(() => {
    if (chainId !== 56 && coinbase === wallet) {
      setStatus(
        "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
      );
      setStatus3500(
        "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
      );
      setStatus700(
        "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
      );
    }
    if (chainId === 56 && coinbase !== wallet) {
      setStatus(
        "Please change your wallet address into the wallet associated to your profile"
      );
      setStatus3500(
        "Please change your wallet address into the wallet associated to your profile"
      );
      setStatus700(
        "Please change your wallet address into the wallet associated to your profile"
      );
    }
    if (chainId === 56 && coinbase === wallet) {
      setStatus("");
      setStatus3500("");
      setStatus700("");
    }

    if (chainId !== 56 && coinbase !== wallet) {
      setStatus(
        "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
      );
      setStatus3500(
        "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
      );
      setStatus700(
        "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
      );
    }
  }, [coinbase, chainId]);

  useEffect(() => {
    if (bundlesBought === 4 && lastDayofBundleMilliseconds > 0) {
      setisAtlimit(true);
      setcountdown700(oneJuly.getTime());
      handleSetAvailableTime(oneJuly.getTime());
    }
  }, [bundlesBought, countdown700]);

  useEffect(() => {
    if (today > twentyfivejune) {
      setisAtlimit(true);
    }
  }, [today, oneJune, oneJuly]);

  const [tooltip, setTooltip] = useState(false);

  return (
    // <div className="bundle-card-wrapper d-flex flex-column gap-4 gap-xxl-2 mt-4 gap-lg-2 w-100">
    //   {/* <Countdown
    //     className="d-none"
    //     date={twentyfivemay}
    //     onComplete={() => {
    //       setisAtlimit(true);
    //     }}
    //   /> */}
    //   <div className="d-flex flex-column gap-2 justify-content-between"></div>
    //   <div
    //     className={`${
    //       packageData.title === "Puzzle Madness"
    //         ? "bundlewrapper-idyp"
    //         : packageData.title === "Golden Pass"
    //         ? "bundlewrapper-dyp"
    //         : packageData.title === "Critical Hit"
    //         ? "bundlewrapper-critical"
    //         : "bundlewrapper"
    //     }  position-relative`}
    //     style={{ minHeight: "400px" }}
    //   >
    //     <div
    //       className={`${
    //         packageData.title === "Puzzle Madness" && "idypbundlewrapper"
    //       } bundlepricewrapper position-absolute col-5 col-lg-3`}
    //       style={{
    //         display: packageData.title === "Critical Hit" ? "none" : "",
    //       }}
    //     >
    //       <div className="position-relative">
    //         <img
    //           src={packageData.title === "Puzzle Madness" ? idyp : dypius}
    //           alt=""
    //           className="dypiuscoin"
    //         />
    //         <div className="d-flex flex-column">
    //           {/* <span className="bundleprice-desc">Bundle price</span> */}
    //           <span className="bundleprice-amount">{packageData?.price}</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="p-3 d-flex flex-column h-100 justify-content-between">
    //       <h4 className="preniumbundleTitle pt-4 pt-lg-0 font-organetto">
    //         {packageData?.title}
    //       </h4>
    //       <p className="bundledesc">
    //         Get access to World of Dypians exclusive features and benefits.
    //       </p>
    //       {/* <p className="bundledesc">
    //         Users will have to deposit their tokens to purchase this bundle.
    //       </p> */}
    //       <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
    //         <div className="d-flex align-items-center gap-2 position-relative">
    //           <h5 className="bundleBenefits mb-0">Benefits</h5>
    //           {packageData?.link && (
    //             <>
    //               {" "}
    //               <a href={packageData.link} target="_blank">
    //                 <img
    //                   src={tooltipIcon}
    //                   alt=""
    //                   className="tooltip-icon"
    //                   style={{
    //                     cursor: "pointer",
    //                     width: "20px",
    //                     height: "20px",
    //                   }}
    //                 />
    //               </a>
    //             </>
    //           )}
    //         </div>
    //       </OutsideClickHandler>
    //       <div className="d-flex flex-column gap-2">
    //         <div className="row flex-xxl-row flex-lg-row align-items-center flex-md-row flex-column gap-2 justify-content-xxl-between justify-content-lg-between justify-content-center">
    //           <div className="d-flex col-12 col-xxl-6 col-lg-6 flex-column gap-2">
    //             {packageData?.benefits.map((item, index) => (
    //               <div className="benefit-filled p-2" key={index}>
    //                 <p className="benefitdesc d-flex align-items-center gap-2 m-0">
    //                   <img src={filledCircle} alt="" />
    //                   {item}
    //                 </p>
    //               </div>
    //             ))}
    //           </div>

    //           {countdown !== "0" &&
    //             countdown &&
    //             packageData.title === "Dragon Ruins" && (
    //               <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-2 align-items-center justify-content-between timerwrapper2">
    //                 <div className="d-flex flex-column gap-2 timerwrapper2">
    //                   <h2
    //                     className={`font-organetto d-flex flex-column flex-xxl-row flex-lg-row gap-1 align-items-center availabletime-text`}
    //                   >
    //                     Available Time
    //                     <mark className={`font-organetto  availabletime-mark`}>
    //                       remaining
    //                     </mark>
    //                   </h2>
    //                   <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-3 align-items-center justify-content-between ">
    //                     <span className="timerdesc col-12 p-0">
    //                       <span>{packageData.title}</span> has a limited usage
    //                       time. Additional bundles can be purchased to extend
    //                       your usage.
    //                     </span>
    //                     <Countdown
    //                       date={Number(countdown) * 1000}
    //                       renderer={renderer}
    //                       onComplete={() => {
    //                         setcountdown();
    //                       }}
    //                     />
    //                     <span className="synctxt d-flex align-items-center gap-2 justify-content-center">
    //                       Use in-game{" "}
    //                       <img
    //                         src={require("./assets/sync.svg").default}
    //                         alt=""
    //                       />
    //                       sync button every time you purchase a bundle
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}
    //           {countdown3500 !== "0" &&
    //             countdown3500 &&
    //             packageData.title === "Puzzle Madness" && (
    //               <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-2 align-items-center justify-content-between timerwrapper2">
    //                 <div className="d-flex flex-column gap-2 timerwrapper2">
    //                   <h2
    //                     className={`font-organetto d-flex flex-column flex-xxl-row flex-lg-row gap-1 align-items-center availabletime-text`}
    //                   >
    //                     Available Time
    //                     <mark className={`font-organetto  availabletime-mark`}>
    //                       remaining
    //                     </mark>
    //                   </h2>
    //                   <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-3 align-items-center justify-content-between ">
    //                     <span className="timerdesc col-12 p-0">
    //                       <span>{packageData.title}</span> has a limited usage
    //                       time. Additional bundles can be purchased to extend
    //                       your usage.
    //                     </span>
    //                     <Countdown
    //                       date={Number(countdown3500) * 1000}
    //                       renderer={renderer}
    //                       onComplete={() => {
    //                         setcountdown3500();
    //                       }}
    //                     />
    //                     <span className="synctxt d-flex align-items-center gap-2 justify-content-center">
    //                       Use in-game{" "}
    //                       <img
    //                         src={require("./assets/sync.svg").default}
    //                         alt=""
    //                       />
    //                       sync button every time you purchase a bundle
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}

    //           {countdown700 !== "0" &&
    //             countdown700 &&
    //             packageData.title === "Golden Pass" && (
    //               <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-2 align-items-center justify-content-between timerwrapper2">
    //                 <div className="d-flex flex-column gap-2 timerwrapper2">
    //                   <h2
    //                     className={`font-organetto d-flex flex-column flex-xxl-row flex-lg-row gap-1 align-items-center availabletime-text`}
    //                   >
    //                     Available Time
    //                     <mark className={`font-organetto  availabletime-mark`}>
    //                       remaining
    //                     </mark>
    //                   </h2>
    //                   <div className="row m-0 flex-column flex-xxl-row flex-lg-row flex-md-row gap-3 align-items-center justify-content-between ">
    //                     <span className="timerdesc col-12 p-0">
    //                       <span>{packageData.title}</span> has a limited usage
    //                       time. Additional bundles can be purchased to extend
    //                       your usage.
    //                     </span>
    //                     <Countdown
    //                       date={Number(countdown700)}
    //                       renderer={renderer700}
    //                       onComplete={() => {
    //                         setcountdown700();
    //                         handleSetAvailableTime();
    //                         setisAtlimit(false);
    //                       }}
    //                     />
    //                     <span className="synctxt d-flex align-items-center gap-2 justify-content-center">
    //                       Use in-game{" "}
    //                       <img
    //                         src={require("./assets/sync.svg").default}
    //                         alt=""
    //                       />
    //                       sync button every time you purchase a bundle
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}
    //           {packageData.title === "Golden Pass" && (
    //             <div className="d-flex flex-column gap-3">
    //               <div className="slider-text-wrapper w-100 d-flex align-items-center justify-content-between mt-2">
    //                 <span
    //                   className={`slider-text ${
    //                     progressValue >= 25 && "slider-text-active"
    //                   }`}
    //                 >
    //                   7 Days
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 50 && "slider-text-active"
    //                   }`}
    //                 >
    //                   7 Days
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 75 && "slider-text-active"
    //                   }`}
    //                 >
    //                   7 Days
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 100 && "slider-text-active"
    //                   }`}
    //                 >
    //                   Full Month
    //                 </span>
    //               </div>

    //               <div className="px-4">
    //                 <Slider
    //                   step={25}
    //                   dots
    //                   min={25}
    //                   dotStyle={{
    //                     background: "#C0C9FF",
    //                     height: 16,
    //                     width: 16,
    //                     bottom: "-8px",
    //                     border: "1px solid #C0C9FF",
    //                   }}
    //                   activeDotStyle={{
    //                     background: "#4ED5D2",
    //                     border: "1px solid #4ED5D2",
    //                   }}
    //                   value={progressValue}
    //                 />
    //               </div>
    //               <div className="slider-text-wrapper w-100 d-flex align-items-center justify-content-between mt-0">
    //                 <span
    //                   className={`slider-text ${
    //                     progressValue >= 25 && "slider-text-active"
    //                   }`}
    //                 >
    //                   Bundle 1
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 50 && "slider-text-active"
    //                   }`}
    //                 >
    //                   Bundle 2
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 75 && "slider-text-active"
    //                   }`}
    //                 >
    //                   Bundle 3
    //                 </span>
    //                 <span
    //                   className={`slider-text  ${
    //                     progressValue >= 100 && "slider-text-active"
    //                   }`}
    //                 >
    //                   Bundle 4
    //                 </span>
    //               </div>
    //             </div>
    //           )}
    //           {packageData.title === "Golden Pass" && (
    //             <span
    //               className="statusText"
    //               style={{ fontSize: 11, color: "#FE7A00", textAlign: "left" }}
    //             >
    //               *Bundles can be purchased until date 25.
    //             </span>
    //           )}
    //         </div>
    //       </div>
    //       <div className="separator"></div>{" "}
    //       <div className="row bottomwrapper m-0 px-4 flex-xxl-row flex-lg-row align-items-center flex-md-row flex-column gap-xxl-1 gap-lg-1 gap-3 justify-content-xxl-between justify-content-lg-between justify-content-center">
    //         {packageData.title !== "Critical Hit" && (
    //           <div className="bnbchainWrapper position-relative col-11 col-xxl-3 col-lg-3">
    //             <img
    //               src={bnbChain}
    //               alt=""
    //               className="position-absolute bnbchainImg"
    //             />
    //             <span className="bnbText">Available on BNB Chain </span>
    //           </div>
    //         )}

    //         <div className="d-flex flex-column align-items-center gap-1 col-12 col-xxl-6 col-lg-8 p-0">
    //           <div className="d-flex justify-content-between align-items-center gap-2 w-100">
    //             {showApproval === true &&
    //               packageData.title === "Dragon Ruins" && (
    //                 <div
    //                   className={
    //                     bundleState === "deposit" || checkWallet === false
    //                       ? "linear-border-disabled"
    //                       : "linear-border"
    //                   }
    //                 >
    //                   <button
    //                     className={
    //                       bundleState === "deposit" || checkWallet === false
    //                         ? "btn outline-btn-disabled px-5"
    //                         : "btn filled-btn px-5"
    //                     }
    //                     onClick={() => {
    //                       handleApproval();
    //                     }}
    //                     disabled={
    //                       bundleState === "deposit" || checkWallet === false
    //                         ? true
    //                         : false
    //                     }
    //                   >
    //                     {bundleState === "loading" ? (
    //                       <CircularProgress
    //                         size={20}
    //                         style={{ alignSelf: "center", margin: "auto" }}
    //                       />
    //                     ) : (
    //                       "Sign"
    //                     )}
    //                   </button>
    //                 </div>
    //               )}

    //             {showApproval3500 === true &&
    //               packageData.title === "Puzzle Madness" && (
    //                 <div
    //                   className={
    //                     bundleState3500 === "deposit" || checkWallet === false
    //                       ? "linear-border-disabled"
    //                       : "linear-border"
    //                   }
    //                 >
    //                   <button
    //                     className={
    //                       bundleState3500 === "deposit" || checkWallet === false
    //                         ? "btn outline-btn-disabled px-5"
    //                         : "btn filled-btn px-5"
    //                     }
    //                     onClick={() => {
    //                       handleApproval3500();
    //                     }}
    //                     disabled={
    //                       bundleState3500 === "deposit" || checkWallet === false
    //                         ? true
    //                         : false
    //                     }
    //                   >
    //                     {bundleState3500 === "loading" ? (
    //                       <CircularProgress
    //                         size={20}
    //                         style={{ alignSelf: "center", margin: "auto" }}
    //                       />
    //                     ) : (
    //                       "Sign"
    //                     )}
    //                   </button>
    //                 </div>
    //               )}

    //             {showApproval700 === true &&
    //               packageData.title === "Golden Pass" && (
    //                 <div
    //                   className={
    //                     bundleState700 === "deposit" ||
    //                     checkWallet === false ||
    //                     isAtlimit == true
    //                       ? "linear-border-disabled"
    //                       : "linear-border"
    //                   }
    //                 >
    //                   <button
    //                     className={
    //                       bundleState700 === "deposit" ||
    //                       checkWallet === false ||
    //                       isAtlimit == true
    //                         ? "btn outline-btn-disabled px-5"
    //                         : "btn filled-btn px-5"
    //                     }
    //                     onClick={() => {
    //                       handleApproval700();
    //                     }}
    //                     disabled={
    //                       bundleState700 === "deposit" ||
    //                       checkWallet === false ||
    //                       isAtlimit == true
    //                         ? true
    //                         : false
    //                     }
    //                   >
    //                     {bundleState700 === "loading" ? (
    //                       <CircularProgress
    //                         size={20}
    //                         style={{ alignSelf: "center", margin: "auto" }}
    //                       />
    //                     ) : (
    //                       "Sign"
    //                     )}
    //                   </button>
    //                 </div>
    //               )}

    //             {packageData.title === "Dragon Ruins" && (
    //               <div
    //                 style={{ margin: "0 0 0 auto" }}
    //                 className={`${
    //                   (bundleState === "deposit" || showApproval === false) &&
    //                   checkWallet === true
    //                     ? "linear-border "
    //                     : "linear-border-disabled"
    //                 }`}
    //               >
    //                 <button
    //                   className={
    //                     (bundleState === "deposit" || showApproval === false) &&
    //                     checkWallet === true
    //                       ? "btn filled-btn px-5 "
    //                       : "btn outline-btn-disabled px-5"
    //                   }
    //                   onClick={() => {
    //                     handleDeposit();
    //                   }}
    //                   disabled={
    //                     bundleState === "deposit" && checkWallet === true
    //                       ? false
    //                       : true
    //                   }
    //                 >
    //                   {depositState === "loading-deposit" ? (
    //                     <CircularProgress
    //                       size={20}
    //                       style={{ alignSelf: "center", margin: "auto" }}
    //                     />
    //                   ) : (
    //                     "Buy"
    //                   )}
    //                 </button>
    //               </div>
    //             )}

    //             {packageData.title === "Puzzle Madness" && (
    //               <div
    //                 style={{ margin: "0 0 0 auto" }}
    //                 className={`${
    //                   (bundleState3500 === "deposit" ||
    //                     showApproval3500 === false) &&
    //                   checkWallet === true
    //                     ? "linear-border "
    //                     : "linear-border-disabled"
    //                 }`}
    //               >
    //                 <button
    //                   className={
    //                     (bundleState3500 === "deposit" ||
    //                       showApproval3500 === false) &&
    //                     checkWallet === true
    //                       ? "btn filled-btn px-5 "
    //                       : "btn outline-btn-disabled px-5"
    //                   }
    //                   onClick={() => {
    //                     handleDeposit3500();
    //                   }}
    //                   disabled={
    //                     bundleState3500 === "deposit" && checkWallet === true
    //                       ? false
    //                       : true
    //                   }
    //                 >
    //                   {depositState3500 === "loading-deposit" ? (
    //                     <CircularProgress
    //                       size={20}
    //                       style={{ alignSelf: "center", margin: "auto" }}
    //                     />
    //                   ) : (
    //                     "Buy"
    //                   )}
    //                 </button>
    //               </div>
    //             )}

    //             {packageData.title === "Golden Pass" && (
    //               <div
    //                 style={{ margin: "0 0 0 auto" }}
    //                 className={`${
    //                   (bundleState700 === "deposit" ||
    //                     showApproval700 === false) &&
    //                   checkWallet === true &&
    //                   isAtlimit === false
    //                     ? "linear-border "
    //                     : "linear-border-disabled"
    //                 }`}
    //               >
    //                 <button
    //                   className={
    //                     (bundleState700 === "deposit" ||
    //                       showApproval700 === false) &&
    //                     checkWallet === true &&
    //                     isAtlimit === false
    //                       ? "btn filled-btn px-5 "
    //                       : "btn outline-btn-disabled px-5"
    //                   }
    //                   onClick={() => {
    //                     handleDeposit700();
    //                   }}
    //                   disabled={
    //                     packageData.title !== "Golden Pass"
    //                       ? bundleState700 === "deposit" && checkWallet === true
    //                         ? false
    //                         : true
    //                       : isAtlimit === true ||
    //                         checkWallet === false ||
    //                         bundleState700 !== "deposit"
    //                       ? true
    //                       : false
    //                   }
    //                 >
    //                   {depositState700 === "loading-deposit" ? (
    //                     <CircularProgress
    //                       size={20}
    //                       style={{ alignSelf: "center", margin: "auto" }}
    //                     />
    //                   ) : (
    //                     "Buy"
    //                   )}
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //           {showApproval === true &&
    //             packageData.title === "Dragon Ruins" && (
    //               <div className="progress-bar">
    //                 <img
    //                   src={sliderValue === 1 ? progress1 : progress2}
    //                   alt=""
    //                 />
    //               </div>
    //             )}
    //           {showApproval3500 === true &&
    //             packageData.title === "Puzzle Madness" && (
    //               <div className="progress-bar">
    //                 <img
    //                   src={sliderValue3500 === 1 ? progress1 : progress2}
    //                   alt=""
    //                 />
    //               </div>
    //             )}
    //           {showApproval700 === true &&
    //             packageData.title === "Golden Pass" && (
    //               <div className="progress-bar">
    //                 <img
    //                   src={sliderValue700 === 1 ? progress1 : progress2}
    //                   alt=""
    //                 />
    //               </div>
    //             )}
    //         </div>
    //         {packageData.title === "Critical Hit" && (
    //           <div
    //             className={"linear-border-purple"}
    //             style={{ width: "fit-content" }}
    //           >
    //             <a
    //               className={`btn purple-btn px-4 d-flex gap-2 align-items-center`}
    //               href="https://opensea.io/collection/worldofdypians"
    //               target="_blank"
    //               rel="noreferrer"
    //             >
    //               <img src={opensea} alt="" />
    //               Genesis Land
    //             </a>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <span
    //     className="statusText"
    //     style={{
    //       color:
    //         packageData.title === "Dragon Ruins"
    //           ? statusColor
    //           : packageData.title === "Puzzle Madness"
    //           ? statusColor3500
    //           : statusColor700,
    //     }}
    //   >
    //     {packageData.title === "Dragon Ruins"
    //       ? status
    //       : packageData.title === "Puzzle Madness"
    //       ? status3500
    //       : packageData.title === "Golden Pass"
    //       ? status700
    //       : statusCritical}
    //   </span>
    // </div>
    <div className="row align-items-center py-5">
      <div className="col-12 col-lg-7 h-100">
        <div className="nft-outer-wrapper p-3 p-lg-5 h-100">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="new-bundle-title">Dragon Ruins</h6>
            <img src={require("./assets/newTooltip.svg").default} alt="" />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <img src={dragonPackage} alt="" className="new-bundle-img" />
            <div className="d-flex flex-column gap-2">
              <div className="new-bundle-benefits-title">Benefits</div>
              <div className="p-2 new-benefits-item d-flex align-items-center gap-2">
                <img
                  src={require("./assets/newCheckmark.svg").default}
                  alt=""
                />
                <span className="new-benefit">
                  Ability to fight a special creature
                </span>
              </div>
              <div className="p-2 new-benefits-item d-flex align-items-center gap-2">
                <img
                  src={require("./assets/newCheckmark.svg").default}
                  alt=""
                />
                <span className="new-benefit">
                  A chance to win an unique CAWS NFT
                </span>
              </div>
              <div className="p-2 new-benefits-item d-flex align-items-center gap-2">
                <img
                  src={require("./assets/newCheckmark.svg").default}
                  alt=""
                />
                <span className="new-benefit">Score multiplier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-5 h-100">
        <div className="nft-outer-wrapper py-3 px-3 py-lg-5 h-100">
          <div className="d-flex flex-column h-100 justify-content-between gap-3">
            <h6
              className="new-bundle-title"
              style={{ position: "relative", left: "20px" }}
            >
              Purchase
            </h6>
            <div className="d-flex flex-column gap-2">
              <div className="purchase-wrapper p-3">
                <span className="purchase-price-title">Event price</span>
                <div className="d-flex align-items-center gap-4">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={require("./assets/dypIcon.svg").default}
                      width={30}
                      height={30}
                      alt=""
                    />
                    <h6 className="purchase-price mb-0">50 DYP</h6>
                  </div>
                  <span className="purchase-price-usd mb-0">$6.62</span>
                </div>
              </div>
              <span className="new-bnb-chain">Available only on BNB Chain</span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 position-relative" style={{left: '-20px'}}>
            <div
              className="d-flex align-items-center justify-content-center position-relative gap-3"
            >
              <button className="btn inactive-pill-btn py-2 px-4">Sign</button>
              <button className="btn pill-btn py-2 px-4">Buy</button>
            </div>
            <div className="progress-bar" style={{width: '40%'}}>
              <img src={sliderValue === 1 ? progress1 : progress2} alt="" />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBundleCard;
