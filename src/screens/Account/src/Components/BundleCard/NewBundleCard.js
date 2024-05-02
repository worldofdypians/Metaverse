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
import "react-circular-progressbar/dist/styles.css";
import newLandTooltip from "./assets/newLandTooltip.svg";
import {
  wod_abi,
  token_abi,
  token_abi_old,
  idyptoken_abi,
  dyp700_abi,
  dyp700v1_abi,
  idyp3500_abi,
  wodAddress,
  dyp700Address,
  dyp700v1Address,
  idyp3500Address,
} from "../../web3";

import {
  DYP_700V1_ABI,
  DYP_700_ABI,
  WOD_ABI,
  iDYP_3500_ABI,
} from "../../web3/abis";

import { CircularProgress } from "@mui/material";
import Countdown from "react-countdown";
import tooltipIcon from "./assets/tooltipIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import progress1 from "./assets/progress1.svg";
import progress2 from "./assets/progress2.svg";
import axios from "axios";
import opensea from "./assets/opensea.svg";
import Slider from "rc-slider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useWindowSize from "../../../../../hooks/useWindowSize";
import { NavLink } from "react-router-dom";
import { convertToUSD } from "../../../../../actions/convertUsd";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import checkActive from "./assets/checked.svg";
import checkPassive from "./assets/empty.svg";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};

const renderer700 = ({ days, hours, minutes, seconds }) => {
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
  onOpenPopup,
  dyptokenDatabnb,
  idyptokenDatabnb,
  dyptokenDatabnb_old,
  dyptokenData_old,
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
  const windowSize = useWindowSize();
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
  const [usdPrice, setUsdPrice] = useState();
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
  const [dateofBundle, setdateofBundle] = useState(0);
  const [datewhenBundleBought, setdatewhenBundleBought] = useState(0);

  const [dateofBundlev1, setdateofBundlev1] = useState(0);
  const [datewhenBundleBoughtv1, setdatewhenBundleBoughtv1] = useState(0);

  const [lastDayofBundleHours, setlastDayofBundleHours] = useState(0);
  const [lastDayofBundleMinutes, setlastDayofBundleMinutes] = useState(0);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [priceType, setPriceType] = useState(0);

  const [dragonRuinsDypAmount, setDragonRuinsDypAmount] = useState(0);
  const [goldenPassDypAmountV1, setGoldenPassDypAmountV1] = useState(0);
  const [goldenPassDypAmountV2, setGoldenPassDypAmountV2] = useState(0);
  const [puzzleMadnessDypAmount, setPuzzleMadnessDypAmount] = useState(0);
  let twentyfiveApril = new Date("2024-04-25 23:59:00 GMT+02:00");
  let twentyfiveMay = new Date("2024-05-25 23:59:00 GMT+02:00");

  let today = new Date();
 
  let oneApril = new Date("2024-04-01 11:11:00 GMT+02:00");

  let oneMay = new Date("2024-05-01 11:11:00 GMT+02:00");
  let oneJune = new Date("2024-06-01 11:11:00 GMT+02:00"); 
  let oneJuly = new Date("2024-07-01 11:11:00 GMT+02:00"); 



  const getBundlePrizes = async () => {
    const dragonContract = new window.bscWeb3.eth.Contract(WOD_ABI, wodAddress);
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);
    const puzzleContract = new window.bscWeb3.eth.Contract(
      iDYP_3500_ABI,
      idyp3500Address
    );

    const result_dragon = await dragonContract.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_dragon) {
      setDragonRuinsDypAmount(result_dragon / 1e18);
    }

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

  const checkWalletAddr = () => {
    if (coinbase && wallet) {
      if (coinbase?.toLowerCase() !== wallet?.toLowerCase() || chainId !== 56) {
        setcheckWallet(false);
      }
      if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
        if (priceType === 1 && packageData.title === "Golden Pass") {
          setcheckWallet(true);
        } else if (priceType === 0 && packageData.title === "Golden Pass") {
          setcheckWallet(false);
        } else setcheckWallet(true);
      }
      if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 1) {
        if (priceType === 1 && packageData.title === "Golden Pass") {
          setcheckWallet(false);
        } else if (priceType === 0 && packageData.title === "Golden Pass") {
          setcheckWallet(true);
        }
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
            setSliderValue(2);
            setbundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const checkApproval700 = async (tokenType) => {
    if (coinbase === wallet) {
      if (tokenType === 1 && chainId === 56) {
        await token_abi.methods
          .allowance(coinbase, dyp700Address)
          .call()
          .then((data) => {
            if (data === "0" || data < 2100000000000000000000) {
              setshowApproval700(true);
              setbundleState700("initial");
              setDepositState700("initial");
              setSliderValue700(1);
            } else {
              setshowApproval700(false);
              setSliderValue700(2);
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
              setSliderValue700(1);
              setDepositState700("initial");
            } else {
              setshowApproval700(false);
              setSliderValue700(2);
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

  const checkApproval3500 = async () => {
    if (coinbase === wallet && chainId === 56) {
      await idyptoken_abi.methods
        .allowance(coinbase, idyp3500Address)
        .call()
        .then((data) => {
          if (data === "0" || data < 12600000000000000000000) {
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
      .approve(wodAddress, "500000000000000000000000000")
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
    if (priceType === 1) {
      await token_abi.methods
        .approve(dyp700Address, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus700("Succesfully approved!");
          setbundleState700("deposit");
          setStatusColor700("#00FECF");
          setSliderValue700(2);
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
          setSliderValue700(2);
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
        console.log(e);
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
        setbundlesBought(0);
        setProgressValue(0);
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
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);
    const timeofDeposit = await dypv2.methods.getTimeOfDeposit(coinbase).call();

    const timeofDepositv1 = await dypv1.methods
      .getTimeOfDeposit(coinbase)
      .call();

    if (timeofDeposit !== 0 || timeofDepositv1 !== 0) {
      const timeofDeposit_miliseconds = timeofDeposit * 1000;
      const timeofDeposit_milisecondsv1 = timeofDepositv1 * 1000;

      const timeofbundleBought_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_miliseconds);

      const timeofbundleBought_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_milisecondsv1);

      const timeofbundleBought_Date_formatted = new Date(
        timeofbundleBought_Date
      );

      const timeofbundleBought_Date_formattedv1 = new Date(
        timeofbundleBought_Datev1
      );

      const timeofbundleBought_day =
        timeofbundleBought_Date_formatted.getDate();

      const timeofbundleBought_dayv1 =
        timeofbundleBought_Date_formattedv1.getDate();

      setdatewhenBundleBought(timeofbundleBought_day);
      setdatewhenBundleBoughtv1(timeofbundleBought_dayv1);

      const expiringTime = await dypv2.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      const expiringTimev1 = await dypv1.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      const expiringTime_miliseconds = expiringTime * 1000;
      const expiringTime_milisecondsv1 = expiringTimev1 * 1000;

      const expiringTime_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_miliseconds);

      const expiringTime_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_milisecondsv1);

      const expiringTime_Date_formatted = new Date(expiringTime_Date);
      const expiringTime_Date_formattedv1 = new Date(expiringTime_Datev1);

      setdateofBundle(expiringTime_Date_formatted);
      setdateofBundlev1(expiringTime_Date_formattedv1);

      const expiringTime_day = expiringTime_Date_formatted.getDate();
      setbundleExpireDay(expiringTime_day);
      setbundleExpireMiliseconds(expiringTime_miliseconds);

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
    }
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

  const handleDeposit700 = async (priceType) => {
    setDepositState700("loading-deposit");
    setStatus700("Confirm to complete purchase");
    setStatusColor700("#00FECF");

    setlastDay();

    if (priceType === 1) {
      await dyp700_abi.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus700("Bundle successfully purchased!");
          setDepositState700("success");
          setStatusColor700("#00FECF");
          getDypBalance();
          insertBundle();
          increaseBundle();
          checkBundleDates();
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
          getDypBalance();
          insertBundle();
          increaseBundle();
          checkBundleDates();
          checkApproval700(priceType);
        })
        .catch((e) => {
          setStatusColor700("#FE7A00");
          setStatus700(e?.message);
          setDepositState700("failDeposit");
        });
    }
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
      handleSetAvailableTime((resultv2 + resultv1) * 1000);
      // setcountdown700(result * 1000);
      //
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

  const checkBundleDates = async () => {
    //you can check how many bundles the user has bought
    //he can buy until the 22 regular bundles (7days)
    //on the 23rd the bundle will be 7+4
    //last week rule: 32 - date => buy on 24rth=>7+1, 25=> 7+0, 26=> 7-1
    // const dypv1 = new window.infuraWeb3.eth.Contract(
    //   DYP_700V1_ABI,
    //   dyp700v1Address
    // );

    // const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

    const week1 = ["1", "2", "3", "4", "5", "6", "7"];
    const week2 = ["8", "9", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25"];

    // const timeofDepositv1 = await dypv2.methods
    //   .getTimeOfDeposit(coinbase)
    //   .call();
    // const timeofDeposit_milisecondsv1 = timeofDepositv1 * 1000;

    // const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // }).format(timeofDeposit_milisecondsv1);

    const today = new Date();
    const today_date = today.getDate();

    // const timeofDeposit_Date_formattedv1 = new Date(timeofDeposit_Date);
    // const timeofDeposit_date = timeofDeposit_Date_formattedv1
    //   .getDate()
    //   .toString();

    if (today_date <= 25) {
      if (week1.includes(today_date.toString()) && bundlesBought <= 3) {
        setisAtlimit(false);
        handleRefreshCountdown700();
      } else if (week1.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime_day = bundleExpireDay;
        // const remainingTime_miliseconds = bundleExpireMiliseconds;

        // if (parseInt(remainingTime_day) >= 25) {
        //   const additional_remainingTime_time = 31 - remainingTime_day;
        //   const additional_remaining_time_timestamp =
        //     additional_remainingTime_time * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds) +
        //     Number(additional_remaining_time_timestamp * 1000);

        setcountdown700(
          today < oneJune? oneJune.getTime() : oneJuly.getTime()
        );
        handleSetAvailableTime(
          today < oneJune? oneJune.getTime() : oneJuly.getTime()
        );
        setisAtlimit(true);
        setStatus700(
          "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        );
        setStatusColor700("#FE7A00");
        // }
      } else if (week2.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
        setisAtlimit(false);
      } else if (week2.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime2 = lastDayofBundle;
        // if (parseInt(remainingTime2) >= 25) {
        //   const additional_remainingTime_time2 = 31 - remainingTime2;
        //   const additional_remaining_time_timestamp2 =
        //     additional_remainingTime_time2 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;
        //   const remainingTime_miliseconds2 = bundleExpireMiliseconds;

        //   const final =
        //     Number(remainingTime_miliseconds2) +
        //     Number(additional_remaining_time_timestamp2 * 1000);

        setcountdown700(
          today < oneJune? oneJune.getTime() : oneJuly.getTime()
        );
        handleSetAvailableTime(
          today < oneJune? oneJune.getTime() : oneJuly.getTime()
        );
        setisAtlimit(true);
        setStatus700(
          "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        );
        setStatusColor700("#FE7A00");
        // }
      } else if (week3.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
        setisAtlimit(false);
      } else if (week3.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime3 = lastDayofBundle;
        // const remainingTime_miliseconds3 = bundleExpireMiliseconds;

        // if (parseInt(remainingTime3) >= 25) {
        //   const additional_remainingTime_time3 = 31 - remainingTime3;
        //   const additional_remaining_time_timestamp3 =
        //     additional_remainingTime_time3 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds3) +
        //     Number(additional_remaining_time_timestamp3 * 1000);

        //   setcountdown700(final);
        //   handleSetAvailableTime(final);
        // setcountdown700(
        //   today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        // );
        // handleSetAvailableTime(
        //   today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        // );
        // setisAtlimit(true);
        // setStatus700(
        //   "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        // );
        // setStatusColor700("#FE7A00");

        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;
        const finalDateofBundleFormatted = new Date(finalDateofBundle);

        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (
          today < finalDateofBundle &&
          today.getFullYear() === finalDateofBundleFormatted.getFullYear()
        ) {
          setcountdown700(
            today < oneJune ? oneJune.getTime() : oneJuly.getTime()
          );
          handleSetAvailableTime(
            today < oneJune ? oneJune.getTime() : oneJuly.getTime()
          );
          setisAtlimit(true);
          setStatusColor700("#FE7A00");
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );

          // if (
          //   bundlesBought <= 3 &&
          //   finalDateofBundleBought < today_date &&
          //   finalDateofBundleBought < 16 &&
          //   finalDateofBundleBought !== 0
          // ) {
          //   setcountdown700(finalDateofBundle);
          //   setisAtlimit(false);
          //   handleSetAvailableTime(finalDateofBundle);
          // } else {
          //   setcountdown700(
          //     today < oneNovember
          //       ? oneNovember.getTime()
          //       : oneDecember.getTime()
          //   );
          //   handleSetAvailableTime(
          //     today < oneNovember
          //       ? oneNovember.getTime()
          //       : oneDecember.getTime()
          //   );
          //   setisAtlimit(true);
          //   setStatusColor700("#FE7A00");
          //   setStatus700(
          //     "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          //   );
          // }
        } else if (
          today > finalDateofBundle &&
          bundlesBought > 0 &&
          today.getFullYear() !== finalDateofBundleFormatted.getFullYear()
        ) {
          setisAtlimit(false);
          setcountdown700();
          handleSetAvailableTime();
          setStatus700("");
          setStatusColor700("#FE7A00");
        }

        // }
      } else if (week4.includes(today_date.toString()) && today_date <= 22) {
        // handleRefreshCountdown700();
        // setisAtlimit(false);
        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

        const finalDateofBundleFormatted = new Date(finalDateofBundle);
        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (today < finalDateofBundle) {
          setcountdown700(
            today < oneJune ? oneJune.getTime() : oneJuly.getTime()
          );
          handleSetAvailableTime(
            today < oneJune ? oneJune.getTime() : oneJuly.getTime()
          );
          setisAtlimit(true);
          setStatusColor700("#FE7A00");
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
        } else if (today > finalDateofBundle && bundlesBought > 0) {
          setisAtlimit(false);
          setcountdown700();
          handleSetAvailableTime();
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      } else if (week4.includes(today_date.toString()) && today_date > 22) {
        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

        const finalDateofBundleFormatted = new Date(finalDateofBundle);

        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (today < finalDateofBundle) {
          if (bundlesBought <= 3 && finalDateofBundleBought < today_date) {
            setcountdown700(finalDateofBundle);
            setisAtlimit(false);
            handleSetAvailableTime(finalDateofBundle);
          } else {
            setcountdown700(
              today < oneJune ? oneJune.getTime() : oneJuly.getTime()
            );
            handleSetAvailableTime(
              today < oneJune ? oneJune.getTime() : oneJuly.getTime()
            );
            setisAtlimit(true);
            setStatusColor700("#FE7A00");
            setStatus700(
              "The Golden Pass bundle is currently not available for purchase. Please check back next month."
            );
          }
        } else if (today > finalDateofBundle && bundlesBought > 0) {
          setisAtlimit(false);
          setcountdown700();
          handleSetAvailableTime();
          setStatus700(
            "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          );
          setStatusColor700("#FE7A00");
        }
      }
    } else if (today_date > 25) {
      const finalDateofBundle =
        dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

      if (today < finalDateofBundle) {
        setisAtlimit(true);
        setcountdown700(
          today < oneJune ? oneJune.getTime() : oneJuly.getTime()
        );
        handleSetAvailableTime(
          today < oneJune ? oneJune.getTime() : oneJuly.getTime()
        );
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

    checkWalletAddr();
    setlastDay();
    checkApproval3500();
    checkApproval();
    increaseBundle();
  }, [coinbase, chainId, packageData, status700, bundlesBought, priceType]);

  useEffect(() => {
    checkApproval700(priceType);
    checkBundleDates();
  }, [coinbase, chainId, bundlesBought]);

  useEffect(() => {
    if (chainId !== 56 && coinbase?.toLowerCase() === wallet?.toLowerCase()) {
      setStatus(
        "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
      );
      setStatus3500(
        "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
      );
      if (
        priceType === 1 &&
        isAtlimit === false &&
        packageData.title === "Golden Pass"
      ) {
        setStatus700(
          "You are on the wrong chain. Switch back to BNB Chain to purchase the bundle."
        );
      } else if (priceType === 0 && chainId === 1 && isAtlimit === false) {
        setStatus700("");
      } else if (
        priceType === 0 &&
        chainId !== 1 &&
        isAtlimit === false &&
        packageData.title === "Golden Pass"
      ) {
        setStatus700(
          "You are on the wrong chain. Switch back to Ethereum Chain to purchase the bundle."
        );
      }
    }
    if (chainId === 56 && coinbase?.toLowerCase() !== wallet?.toLowerCase()) {
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
    if (chainId === 56 && coinbase?.toLowerCase() === wallet?.toLowerCase()) {
      if (priceType === 0) {
        setStatus700(
          "You are on the wrong chain. Switch back to Ethereum to purchase the bundle."
        );
      } else if (priceType === 1) {
        setStatus700("");
      }
      setStatus("");
      setStatus3500("");
    }

    if (chainId !== 56 && coinbase?.toLowerCase() !== wallet?.toLowerCase()) {
      setStatus(
        "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
      );
      setStatus3500(
        "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
      );
      if (priceType === 0) {
        setStatus700(
          "Please make sure you're on Ethereum Chain and using the wallet address associated to your profile"
        );
      } else if (priceType === 1) {
        setStatus700(
          "Please make sure you're on BNB Chain and using the wallet address associated to your profile."
        );
      }
    }
  }, [coinbase, chainId, wallet, priceType, isAtlimit, packageData]);

  const convertPrice = async () => {
    let price;
    if (packageData.title === "Puzzle Madness") {
      price = packageData.price * idyptokenData;
    } else {
      price = await convertToUSD(packageData.price, 1);
    }

    setUsdPrice(price);
  };

  useEffect(() => {
    if (
      // bundlesBought === 4 &&
      // lastDayofBundleMilliseconds > 0 &&
      // bundleExpireMiliseconds > 0
      bundlesBought === 4
      // bundleExpireMiliseconds > 0
    ) {
      setisAtlimit(true);
      setcountdown700(
        today < oneJune ? oneJune.getTime() : oneJuly.getTime()
      );
      handleSetAvailableTime(
        today < oneJune ? oneJune.getTime() : oneJuly.getTime()
      );
      setStatus700(
        "The Golden Pass bundle is currently not available for purchase. Please check back next month."
      );
    }
  }, [priceType, chainId, bundlesBought, countdown700]);

  useEffect(() => {
    getTokenData();
    if (today > twentyfiveMay) {
      setisAtlimit(true);
      setStatus700(
        "The Golden Pass bundle is currently not available for purchase. Please check back next month."
      );
    }

    convertPrice();
  }, [today]);

  useEffect(() => {
    getBundlePrizes();
  }, []);

  return (
    <>
      <div className="row m-0 align-items-center gap-4 gap-lg-0">
        <div className="col-12 col-lg-7 custom-height px-0 px-lg-2">
          <div className="nft-outer-wrapper new-bundle-wrapper py-3 px-3 py-lg-4 px-lg-5 custom-height position-relative">
            <img
              src={require(`../../../../Marketplace/assets/${
                windowSize.width > 786
                  ? packageData.background
                  : packageData.mobileBackground
              }`)}
              alt=""
              className="dragon-test-bg"
            />
            <div className="d-flex align-items-center justify-content-between mb-3 mb-lg-5">
              <h6 className="new-bundle-title mb-0">{packageData.title}</h6>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onOpenPopup(
                    packageData.title === "Dragon Ruins"
                      ? "dragon"
                      : packageData.title === "Puzzle Madness"
                      ? "puzzlemadness"
                      : packageData.title === "Golden Pass"
                      ? "goldenpass"
                      : "criticalhit"
                  );
                }}
                target="_blank"
              >
                <img src={newLandTooltip} width={30} height={30} alt="" />
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              {/* <img
                src={require(`./assets/${packageData.image}`)}
                alt=""
                className="new-bundle-img"
              /> */}
              <div className="d-flex flex-column gap-2 w-50">
                <div className="new-bundle-benefits-title">Benefits</div>

                {packageData.benefits.map((item) => (
                  <div className="p-2 new-benefits-item d-flex align-items-center gap-2">
                    <img
                      src={require("./assets/newCheckmark.svg").default}
                      alt=""
                    />
                    <span className="new-benefit">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 custom-height px-0 px-lg-2">
          <div className="nft-outer-wrapper new-bundle-wrapper py-3 px-3 py-lg-4 px-lg-5 custom-height">
            <div className="d-flex flex-column custom-height justify-content-start gap-3">
              {packageData.title === "Critical Hit" ? (
                <div
                  className="d-flex flex-column align-items-center gap-4 position-relative"
                  style={{ top: "30px" }}
                >
                  <div
                    className="position-relative package-blur"
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="first-box-blur d-flex align-items-end justify-content-center"></div>
                    <div className="second-box-blur"></div>
                    <img
                      src={require("./assets/newGenesis.webp")}
                      alt=""
                      className="blur-img"
                    />
                  </div>
                  <NavLink
                    className="btn purple-pill"
                    to="/marketplace/land"
                    rel="noreferrer"
                  >
                    Buy Genesis Land
                  </NavLink>
                </div>
              ) : (
                <>
                  <h6 className="new-bundle-title purchase-bundle-title">
                    Purchase
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    <div className="purchase-wrapper p-3">
                      <span className="purchase-price-title">Event price</span>
                      {packageData.title === "Golden Pass" ? (
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center align-items-start gap-4">
                          <h6 className="purchase-price mb-0">
                            {getFormattedNumber(
                              priceType === 0
                                ? goldenPassDypAmountV1
                                : goldenPassDypAmountV2,
                              2
                            )}
                          </h6>
                          <div className="d-flex flex-row justify-content-around w-100 gap-2">
                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 0
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              }`}
                              onClick={() => {
                                setPriceType(0);
                                checkApproval700(0);
                              }}
                            >
                              <img
                                src={
                                  priceType === 0 ? checkActive : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={dypius}
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                DYPv1
                              </span>
                            </div>

                            <div
                              className={`d-flex gap-2 align-items-center position-relative ${
                                priceType === 1
                                  ? "currencyWrapper"
                                  : "currencyWrapper-inactive"
                              }`}
                              onClick={() => {
                                setPriceType(1);
                                checkApproval700(1);
                              }}
                            >
                              <img
                                src={
                                  priceType === 1 ? checkActive : checkPassive
                                }
                                alt=""
                                className={"position-absolute checkicons"}
                              />
                              <span className="nft-price-eth">
                                <img
                                  src={dypius}
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                DYPv2
                              </span>
                            </div>
                          </div>

                          <span className="purchase-price-usd mb-0">
                            ${getFormattedNumber(packageData.usdPrice)}
                            {/* {getFormattedNumber(
                              priceType === 1
                                ? packageData.price * dyptokenDatabnb
                                : 250 * dyptokenData_old
                            )} */}
                          </span>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-4">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                packageData.title === "Puzzle Madness"
                                  ? idyp
                                  : dypius
                              }
                              width={30}
                              height={30}
                              alt=""
                            />
                            <h6 className="purchase-price mb-0">
                              {getFormattedNumber(
                                packageData.title === "Puzzle Madness"
                                  ? puzzleMadnessDypAmount
                                  : dragonRuinsDypAmount
                              )}
                            </h6>
                          </div>

                          <span className="purchase-price-usd mb-0">
                            ${getFormattedNumber(packageData.usdPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {packageData.title === "Golden Pass" ? (
                        priceType === 0 ? (
                          <span className="new-bnb-chain d-flex align-items-center gap-1">
                            Available only on Ethereum{" "}
                            <img
                              src={require("./assets/ethIcon.svg").default}
                              alt=""
                            />
                          </span>
                        ) : (
                          <span className="new-bnb-chain d-flex align-items-center gap-1">
                            Available only on BNB Chain{" "}
                            <img
                              src={require("./assets/bnbIcon.svg").default}
                              alt=""
                            />
                          </span>
                        )
                      ) : (
                        <span className="new-bnb-chain d-flex align-items-center gap-1">
                          Available only on BNB Chain{" "}
                          <img
                            src={require("./assets/bnbIcon.svg").default}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div
                className={` ${
                  packageData.title === "Critical Hit" ? "d-none" : "d-flex"
                }  flex-column align-items-center gap-2 position-relative.new-button-wrapper`}
              >
                <div className="d-flex align-items-center justify-content-center position-relative gap-3">
                  {showApproval === true &&
                    packageData.title === "Dragon Ruins" && (
                      <>
                        <button
                          disabled={
                            bundleState === "deposit" || checkWallet === false
                              ? true
                              : false
                          }
                          className={`btn ${
                            bundleState === "deposit" || checkWallet === false
                              ? "inactive-pill-btn"
                              : "pill-btn"
                          }  py-2 px-4`}
                          onClick={() => {
                            handleApproval();
                          }}
                        >
                          {bundleState === "loading" ? (
                            <CircularProgress
                              size={20}
                              style={{ alignSelf: "center", margin: "auto" }}
                            />
                          ) : (
                            "Sign"
                          )}
                        </button>
                      </>
                    )}
                  {packageData.title === "Dragon Ruins" && (
                    <>
                      <button
                        disabled={
                          bundleState === "deposit" && checkWallet === true
                            ? false
                            : true
                        }
                        className={`btn ${
                          bundleState === "deposit" ||
                          (showApproval === false && checkWallet === true)
                            ? "pill-btn"
                            : "inactive-pill-btn"
                        }  py-2 px-4`}
                        onClick={() => {
                          handleDeposit();
                        }}
                      >
                        {depositState === "loading-deposit" ? (
                          <CircularProgress
                            size={20}
                            style={{ alignSelf: "center", margin: "auto" }}
                          />
                        ) : (
                          "Buy"
                        )}
                      </button>
                    </>
                  )}
                  {showApproval700 === true &&
                    packageData.title === "Golden Pass" && (
                      <>
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
                          className={`btn ${
                            bundleState700 === "deposit" ||
                            checkWallet === false ||
                            isAtlimit == true ||
                            (priceType === 0 && chainId !== 1) ||
                            (priceType === 1 && chainId !== 56)
                              ? "inactive-pill-btn"
                              : "pill-btn"
                          }  py-2 px-4`}
                          onClick={() => {
                            handleApproval700();
                          }}
                        >
                          {bundleState700 === "loading" ? (
                            <CircularProgress
                              size={20}
                              style={{ alignSelf: "center", margin: "auto" }}
                            />
                          ) : (
                            "Sign"
                          )}
                        </button>
                      </>
                    )}
                  {packageData.title === "Golden Pass" && (
                    <>
                      <button
                        disabled={
                          packageData.title !== "Golden Pass"
                            ? (depositState700 === "deposit" &&
                                checkWallet === true &&
                                priceType === 0 &&
                                chainId === 1) ||
                              (priceType === 1 && chainId === 56)
                              ? false
                              : true
                            : isAtlimit === true ||
                              checkWallet === false ||
                              (priceType === 0 && chainId !== 1) ||
                              (priceType === 1 && chainId !== 56) ||
                              depositState700 !== "deposit"
                            ? true
                            : false
                        }
                        className={`btn ${
                          (depositState700 === "deposit" ||
                            showApproval700 === false) &&
                          ((priceType === 0 && chainId === 1) ||
                            (priceType === 1 && chainId === 56)) &&
                          checkWallet === true &&
                          isAtlimit === false
                            ? "pill-btn"
                            : "inactive-pill-btn"
                        }  py-2 px-4`}
                        onClick={() => {
                          handleDeposit700(priceType);
                        }}
                      >
                        {depositState700 === "loading-deposit" ? (
                          <CircularProgress
                            size={20}
                            style={{ alignSelf: "center", margin: "auto" }}
                          />
                        ) : (
                          "Buy"
                        )}
                      </button>
                    </>
                  )}
                  {showApproval3500 === true &&
                    packageData.title === "Puzzle Madness" && (
                      <>
                        <button
                          disabled={
                            bundleState3500 === "deposit" ||
                            checkWallet === false
                              ? true
                              : false
                          }
                          className={`btn ${
                            bundleState3500 === "deposit" ||
                            checkWallet === false
                              ? "inactive-pill-btn"
                              : "pill-btn"
                          }  py-2 px-4`}
                          onClick={() => {
                            handleApproval3500();
                          }}
                        >
                          {bundleState3500 === "loading" ? (
                            <CircularProgress
                              size={20}
                              style={{ alignSelf: "center", margin: "auto" }}
                            />
                          ) : (
                            "Sign"
                          )}
                        </button>
                      </>
                    )}
                  {packageData.title === "Puzzle Madness" && (
                    <>
                      <button
                        disabled={
                          bundleState3500 === "deposit" && checkWallet === true
                            ? false
                            : true
                        }
                        className={`btn ${
                          (bundleState3500 === "deposit" ||
                            showApproval3500 === false) &&
                          checkWallet === true
                            ? "pill-btn"
                            : "inactive-pill-btn"
                        }  py-2 px-4`}
                        onClick={() => {
                          handleDeposit3500();
                        }}
                      >
                        {depositState3500 === "loading-deposit" ? (
                          <CircularProgress
                            size={20}
                            style={{ alignSelf: "center", margin: "auto" }}
                          />
                        ) : (
                          "Buy"
                        )}
                      </button>
                    </>
                  )}
                </div>
                {showApproval === true &&
                  packageData.title === "Dragon Ruins" && (
                    <div className="progress-bar">
                      <img
                        src={sliderValue === 1 ? progress1 : progress2}
                        alt=""
                      />
                    </div>
                  )}
                {showApproval3500 === true &&
                  packageData.title === "Puzzle Madness" && (
                    <div className="progress-bar">
                      <img
                        src={sliderValue3500 === 1 ? progress1 : progress2}
                        alt=""
                      />
                    </div>
                  )}
                {showApproval700 === true &&
                  packageData.title === "Golden Pass" && (
                    <div className="progress-bar">
                      <img
                        src={sliderValue700 === 1 ? progress1 : progress2}
                        alt=""
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span
        className="statusText"
        style={{
          color:
            packageData.title === "Dragon Ruins"
              ? statusColor
              : packageData.title === "Puzzle Madness"
              ? statusColor3500
              : statusColor700,
          width: "fit-content",
        }}
      >
        {packageData.title === "Dragon Ruins"
          ? status
          : packageData.title === "Puzzle Madness"
          ? status3500
          : packageData.title === "Golden Pass"
          ? status700
          : statusCritical}
      </span>
      {countdown !== 0 && countdown && packageData.title === "Dragon Ruins" && (
        <div className="col-12 mt-3">
          <div className="nft-outer-wrapper new-bundle-wrapper p-3 p-lg-5">
            <div className="d-flex w-100 flex-column flex-lg-row gap-4 gap-lg-0 align-items-center justify-content-between">
              <div className="d-flex flex-column gap-3 available-time-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="new-bundle-title"
                    style={{ fontSize: "18px" }}
                  >
                    Available Time Remaining
                  </div>
                  <div className="position-relative new-tooltip-wrapper ">
                    <img
                      src={require("./assets/newTooltip.svg").default}
                      alt=""
                    />
                    <div className="new-tooltip-content-wrapper p-2 d-flex align-items-center justify-content-center">
                      <p className="new-tooltip-content mb-0">
                        Additional bundles can be purchased to extend your usage
                        time.
                      </p>
                    </div>
                  </div>
                </div>
                <span className="new-timer-description ">
                  Use in-game{" "}
                  <img src={require("./assets/syncIcon.svg").default} alt="" />{" "}
                  sync button every time you purchase a bundle
                </span>
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
      {countdown3500 !== "0" &&
        countdown3500 &&
        packageData.title === "Puzzle Madness" && (
          <div className="col-12 mt-3">
            <div className="nft-outer-wrapper  new-bundle-wrapper p-3 p-lg-5">
              <div className="d-flex w-100 flex-column flex-lg-row gap-4 gap-lg-0 align-items-center justify-content-between">
                <div className="d-flex flex-column gap-3 available-time-wrapper">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="new-bundle-title"
                      style={{ fontSize: "18px" }}
                    >
                      Available Time Remaining
                    </div>
                    <div className="position-relative new-tooltip-wrapper ">
                      <img
                        src={require("./assets/newTooltip.svg").default}
                        alt=""
                      />
                      <div className="new-tooltip-content-wrapper p-2 d-flex align-items-center justify-content-center">
                        <p className="new-tooltip-content mb-0">
                          Additional bundles can be purchased to extend your
                          usage time.
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="new-timer-description ">
                    Use in-game{" "}
                    <img
                      src={require("./assets/syncIcon.svg").default}
                      alt=""
                    />{" "}
                    sync button every time you purchase a bundle
                  </span>
                </div>
                <Countdown
                  date={Number(countdown3500) * 1000}
                  renderer={renderer}
                  onComplete={() => {
                    setcountdown3500();
                  }}
                />
              </div>
            </div>
          </div>
        )}
      {packageData.title === "Golden Pass" && (
        <div className="col-12 mt-3">
          <div className="nft-outer-wrapper new-bundle-wrapper p-3 p-lg-5">
            <div className="d-flex w-100 flex-column flex-lg-row gap-4 align-items-center justify-content-between">
              <div className="d-flex flex-column gap-3  available-time-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <div className="new-bundle-title">Purchased Bundles</div>
                </div>
                <span
                  className="new-timer-description"
                  style={{ width: windowSize.width < 786 ? "100%" : "120%" }}
                >
                  The Golden Pass bundle is available for 7 days and can be
                  purchased up to 4 times
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-2">
                <div style={{ width: 75, height: 75 }}>
                  <CircularProgressbar
                    counterClockwise={true}
                    value={progressValue}
                    text={`${progressValue}%`}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",
                      textSize: "24px",
                      pathTransitionDuration: 0.5,
                      pathColor: `#84DBAA`,
                      textColor: "#B7B7DF",
                      trailColor: "#B8B8E0",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>
                <div className="new-bundles-bought-count d-flex align-items-center justify-content-center p-2">
                  <span className="new-bought-bundles">
                    {bundlesBought === 0 ? "No" : bundlesBought}{" "}
                    {bundlesBought > 1 || bundlesBought === 0
                      ? "bundles"
                      : "bundle"}{" "}
                    purchased
                  </span>
                </div>
              </div>
              {countdown700 !== 0 && countdown700 && (
                <Countdown
                  date={Number(countdown700)}
                  renderer={renderer700}
                  onComplete={() => {
                    setcountdown700();
                    handleSetAvailableTime();
                    setisAtlimit(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBundleCard;
