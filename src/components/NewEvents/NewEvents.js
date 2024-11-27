import React, { useState, useEffect, useRef } from "react";
import "./_newevents.scss";

import TreasureHunt from "../Challenges/TreasureHunt";
import { NavLink, useParams } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import ChallengePopup from "../ChallengePopup/ChallengePopup";
import OutsideClickHandler from "react-outside-click-handler";
import dragonRuinsPopup from "../../assets/gameAssets/challengeCards/dragonRuinsPopup.webp";
import scorpionKingPopup from "../../assets/gameAssets/challengeCards/scorpionKingPopup.webp";
import coldBitePopup from "../../assets/gameAssets/challengeCards/coldBitePopup.webp";
import furyBeastPopup from "../../assets/gameAssets/challengeCards/furyBeastPopup.webp";
import wingStormPopup from "../../assets/gameAssets/challengeCards/wingStormPopup.webp";
import criticalHitPopup from "../../assets/gameAssets/challengeCards/criticalHitPopup.webp";
import criticalHitBanner from "./assets/banners/criticalHitBanner.webp";
import mazeGardenPopup from "../../assets/gameAssets/challengeCards/mazeGardenPopup.webp";
import puzzleMadnessPopup from "../../assets/gameAssets/challengeCards/puzzleMadnessPopup.webp";
import puzzleMadnessBanner from "./assets/banners/puzzleMadnessBanner.webp";
import stoneEyePopup from "../../assets/gameAssets/challengeCards/stoneEyePopup.webp";
import explorerHuntPopup from "../../assets/gameAssets/challengeCards/explorerHuntPopup.webp";
import dragonRuinsBanner from "./assets/banners/dragonRuinsBanner.webp";
import wingStormBanner from "./assets/banners/wingStormBanner.webp";
import stoneEyeBanner from "./assets/banners/stoneEyeBanner.webp";
import furyBeastBanner from "./assets/banners/furyBeastBanner.webp";
import mazeGardenBanner from "./assets/banners/mazeGardenBanner.webp";
import greatCollectionBanner from "./assets/banners/greatCollectionBanner.webp";
import opensea from "../../assets/opensea.svg";
import greatCollectionPopup from "../../assets/gameAssets/challengeCards/greatCollectionPopup.webp";

import explorerHuntBanner from "./assets/banners/explorerHuntBanner.webp";
import scorpionKingBanner from "./assets/banners/scorpionKingBanner.webp";
import coldBiteBanner from "./assets/banners/coldBiteBanner.webp";
import bnb from "../Challenges/assets/bnb.svg";
import dypIcon from "../Challenges/assets/dypIcon.svg";
import tooltipIcon from "../Challenges/assets/tooltipIcon.svg";
import whiteTooltip from "../Challenges/assets/whiteTooltip.svg";
import syncIcon from "../Challenges/assets/syncIcon.svg";
import Countdown from "react-countdown";
import wodIcon from "../../screens/Wod/Earn/assets/tokens/wodToken.png";
import goldenPassCard from "./assets/banners/goldenPassBanner.webp";
import goldenPassPopup from "../../assets/gameAssets/challengeCards/goldenPassPopup.webp";

import coldBiteThumb from "./assets/banners/coldBiteThumb.webp";
import scorpionKingThumb from "./assets/banners/scorpionKingThumb.webp";
import furyBeastThumb from "./assets/banners/furyBeastThumb.webp";
import stoneEyeThumb from "./assets/banners/stoneEyeThumb.webp";
import wingStormThumb from "./assets/banners/wingStormThumb.webp";
import dragonRuinsThumb from "./assets/banners/dragonRuinsThumb.webp";

import coldBiteActiveThumb from "./assets/banners/coldBiteActiveThumb.webp";
import scorpionKingActiveThumb from "./assets/banners/scorpionKingActiveThumb.webp";
import furyBeastActiveThumb from "./assets/banners/furyBeastActiveThumb.webp";
import stoneEyeActiveThumb from "./assets/banners/stoneEyeActiveThumb.webp";
import wingStormActiveThumb from "./assets/banners/wingStormActiveThumb.webp";
import dragonRuinsActiveThumb from "./assets/banners/dragonRuinsActiveThumb.webp";

import coldBiteThumbMobile from "./assets/banners/coldBiteThumbMobile.webp";
import scorpionKingThumbMobile from "./assets/banners/scorpionKingThumbMobile.webp";
import furyBeastThumbMobile from "./assets/banners/furyBeastThumbMobile.webp";
import stoneEyeThumbMobile from "./assets/banners/stoneEyeThumbMobile.webp";
import wingStormThumbMobile from "./assets/banners/wingStormThumbMobile.webp";
import dragonRuinsThumbMobile from "./assets/banners/dragonRuinsThumbMobile.webp";

import coldBiteActiveThumbMobile from "./assets/banners/coldBiteActiveThumbMobile.webp";
import scorpionKingActiveThumbMobile from "./assets/banners/scorpionKingActiveThumbMobile.webp";
import furyBeastActiveThumbMobile from "./assets/banners/furyBeastActiveThumbMobile.webp";
import stoneEyeActiveThumbMobile from "./assets/banners/stoneEyeActiveThumbMobile.webp";
import wingStormActiveThumbMobile from "./assets/banners/wingStormActiveThumbMobile.webp";
import dragonRuinsActiveThumbMobile from "./assets/banners/dragonRuinsActiveThumbMobile.webp";
import Slider from "react-slick";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import {
  coldBiteAddress,
  dragonRuinsAddress,
  furyBeastAddress,
  scorpionKingAddress,
  stoneEyeAddress,
  wingStormAddress,
  wod_token_abi,
} from "../../screens/Account/src/web3";
import { WOD_ABI } from "../../screens/Account/src/web3/abis";
import { token_abi } from "../../screens/Account/src/web3";
import { wod_abi } from "../../screens/Account/src/web3";
import { ethers } from "ethers";
import {
  COLD_BITE_ABI,
  cold_bite_address,
  DRAGON_RUINS_ABI,
  dragon_ruins_address,
  FURY_BEAST_ABI,
  fury_beast_address,
  SCORPION_KING_ABI,
  scorpion_king_address,
  STONE_EYE_ABI,
  stone_eye_address,
  WING_STORM_ABI,
  wing_storm_address,
} from "./abi";
import Web3 from "web3";
import { CircularProgress } from "@mui/material";

const renderer = ({ days, hours, minutes }) => {
  return (
    <div className="timer-wrapper d-flex align-items-start gap-2 justify-content-center">
      {/* <div className="d-flex flex-column gap-1 align-items-center">
        <h6 className="mint-time3 mb-0">{days < 10 ? "0" + days : days}</h6>
        <span className="days3">Days</span>
      </div>
      <h6 className="mint-time3 mb-0">:</h6> */}

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

const NewEvents = ({
  events,
  onEventClick,
  coinbase,
  wallet,
  chainId,
  binanceW3WProvider,
  selectedEvent,
  availableTime,
  eventCardCount,
  wodPrice,
  email,
}) => {
  const [activeThumb, setActiveThumb] = useState("");
  const [challenge, setChallenge] = useState("");
  const [eventDuration, seteventDuration] = useState("Live");
  const [showPopup, setshowPopup] = useState("");
  const [activeEvent, setActiveEvent] = useState({});
  const [countdown, setcountdown] = useState();
  const [status, setStatus] = useState(
    "Please make sure you're on BNB Chain and using the wallet address associated to your game profile."
  );
  const [statusColor, setStatusColor] = useState("#FE7A00");
  const [currentWeek, setCurrentWeek] = useState([]);
  const [activeSlide, setActiveSlide] = useState();
  const [checkWallet, setCheckWallet] = useState(true);
  //DRAGON RUINS
  const [dragonRuinsWodAmount, setDragonRuinsWodAmount] = useState(0);
  const [dragonBundleState, setDragonBundleState] = useState("initial");
  const [dragonDepositState, setDragonDepositState] = useState("initial");
  const [dragonShowApproval, setDragonShowApproval] = useState(true);
  const [hasBoughtDragon, setHasBoughtDragon] = useState(false);
  //COLD BITE
  const [coldBiteWodAmount, setColdBiteWodAmount] = useState(0);
  const [bearBundleState, setBearBundleState] = useState("initial");
  const [bearDepositState, setBearDepositState] = useState("initial");
  const [bearShowApproval, setBearShowApproval] = useState(true);
  const [hasBoughtBear, setHasBoughtBear] = useState(false);
  //FURY BEAST
  const [furyBeastWodAmount, setFuryBeastWodAmount] = useState(0);
  const [beastBundleState, setBeastBundleState] = useState("initial");
  const [beastDepositState, setBeastDepositState] = useState("initial");
  const [beastShowApproval, setBeastShowApproval] = useState(true);
  const [hasBoughtBeast, setHasBoughtBeast] = useState(false);
  //WING STORM
  const [wingStormWodAmount, setWingStormWodAmount] = useState(0);
  const [eagleBundleState, setEagleBundleState] = useState("initial");
  const [eagleDepositState, setEagleDepositState] = useState("initial");
  const [eagleShowApproval, setEagleShowApproval] = useState(true);
  const [hasBoughtEagle, setHasBoughtEagle] = useState(false);
  //SCORPION KING
  const [scorpionKingWodAmount, setScorpionKingWodAmount] = useState(0);
  const [scorpionBundleState, setScorpionBundleState] = useState("initial");
  const [scorpionDepositState, setScorpionDepositState] = useState("initial");
  const [scorpionShowApproval, setScorpionShowApproval] = useState(true);
  const [hasBoughtScorpion, setHasBoughtScorpion] = useState(false);
  //STONE EYE
  const [stoneEyeWodAmount, setStoneEyeWodAmount] = useState(0);
  const [cyclopsBundleState, setCyclopsBundleState] = useState("initial");
  const [cyclopsDepositState, setCyclopsDepositState] = useState("initial");
  const [cyclopsShowApproval, setCyclopsShowApproval] = useState(true);
  const [hasBoughtCyclops, setHasBoughtCyclops] = useState(false);
  const sliderRef = useRef();
  const currentDate = new Date().getUTCDay();
  const utcDayIndex = new Date().getUTCDay();

  let eventId = selectedEvent;
  const windowSize = useWindowSize();

  const adjustedDay = currentDate === 0 ? 7 : currentDate;
  // const isMonday = now.getDay() === 1;
  const isMonday = true;

  const now = new Date();
  const midnightUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );

  const getMonday = (date) => {
    const day = date.getUTCDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const diff = (day === 0 ? -6 : 1) - day; // Adjust to Monday
    const monday = new Date(date);
    monday.setDate(date.getUTCDate() + diff);
    return monday;
  };

  const generateWeekDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getUTCDate() + i);
      dates.push(date);
    }
    return dates;
  };

  var settings = {
    dots: false,
    arrows: true,
    // dotsClass: "button__bar",
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
    // initialSlide: activeSlide,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 1,
          // initialSlide: 0,
        },
      },

      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          // initialSlide: 0,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //DRAGON RUINS

  const getBundlePrizesDragon = async () => {
    const dragonRuinsContract = new window.bscWeb3.eth.Contract(
      DRAGON_RUINS_ABI,
      dragon_ruins_address
    );

    const result_dragon_ruins = await dragonRuinsContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_dragon_ruins) {
      setDragonRuinsWodAmount(result_dragon_ruins / 1e18);
    }
  };

  const handleRefreshCountdownDragon = async () => {
    const dragonRuinsContract = new window.bscWeb3.eth.Contract(
      DRAGON_RUINS_ABI,
      dragon_ruins_address
    );

    const purchaseTimestamp = await dragonRuinsContract.methods
      .getTimeOfDeposit(wallet)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtDragon(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtDragon(isToday);
  };

  const checkApprovalDragon = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await wod_token_abi.methods
        .allowance(wallet, dragonRuinsAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setDragonShowApproval(true);
          } else {
            setDragonShowApproval(false);
            setDragonBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalDragon = async () => {
    setDragonBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(dragonRuinsAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setDragonBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setDragonBundleState("fail");
      });
  };

  const handleDepositDragon = async () => {
    let web3 = new Web3(window.ethereum);
    const dragonRuinsContract = new web3.eth.Contract(
      DRAGON_RUINS_ABI,
      dragon_ruins_address
    );

    setDragonDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await dragonRuinsContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setDragonDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownDragon();
          checkApprovalDragon();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDragonDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownDragon();
    } else if (window.WALLET_TYPE === "binance") {
      const dragonsc = new ethers.Contract(
        dragon_ruins_address,
        DRAGON_RUINS_ABI,
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
          setDragonDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setDragonDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownDragon();
        checkApprovalDragon();
      }

      handleRefreshCountdownDragon();
    }
  };

  //COLD BITE

  const getBundlePrizesBear = async () => {
    const coldBiteContract = new window.bscWeb3.eth.Contract(
      COLD_BITE_ABI,
      cold_bite_address
    );

    const result_cold_bite = await coldBiteContract.methods
      .getEstimatedBundleDYPAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_cold_bite) {
      setColdBiteWodAmount(result_cold_bite / 1e18);
    }
  };

  const handleRefreshCountdownBear = async () => {
    const coldBiteContract = new window.bscWeb3.eth.Contract(
      COLD_BITE_ABI,
      cold_bite_address
    );

    const purchaseTimestamp = await coldBiteContract.methods
      .getTimeOfDeposit(wallet)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtBear(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtBear(isToday);
  };

  const checkApprovalBear = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await token_abi.methods
        .allowance(wallet, coldBiteAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setBearShowApproval(true);
          } else {
            setBearShowApproval(false);
            setBearBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalBear = async () => {
    setBearBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(coldBiteAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setBearBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setBearBundleState("fail");
      });
  };

  const handleDepositBear = async () => {
    let web3 = new Web3(window.ethereum);
    const coldBiteContract = new web3.eth.Contract(
      COLD_BITE_ABI,
      cold_bite_address
    );
    setBearDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await coldBiteContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setBearDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownBear();
          checkApprovalBear();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBearDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownBear();
    } else if (window.WALLET_TYPE === "binance") {
      const bearsc = new ethers.Contract(
        cold_bite_address,
        COLD_BITE_ABI,
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

      const txResponse = await bearsc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBearDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setBearDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownBear();
        checkApprovalBear();
      }
      handleRefreshCountdownBear();
    }
  };

  //FURY BEAST
  const getBundlePrizesBeast = async () => {
    const furyBeastContract = new window.bscWeb3.eth.Contract(
      FURY_BEAST_ABI,
      fury_beast_address
    );

    const result_fury_beast = await furyBeastContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_fury_beast) {
      setFuryBeastWodAmount(result_fury_beast / 1e18);
    }
  };

  const handleRefreshCountdownBeast = async () => {
    const furyBeastContract = new window.bscWeb3.eth.Contract(
      FURY_BEAST_ABI,
      fury_beast_address
    );

    const purchaseTimestamp = await furyBeastContract.methods
      .getTimeOfDeposit(wallet)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtBeast(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtBeast(isToday);
  };

  const checkApprovalBeast = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await wod_token_abi.methods
        .allowance(wallet, furyBeastAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setBeastShowApproval(true);
            setBeastBundleState("initial");
          } else {
            setBeastShowApproval(false);
            setBeastBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalBeast = async () => {
    setBeastBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(furyBeastAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setBeastBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setBeastBundleState("fail");
      });
  };

  const handleDepositBeast = async () => {
    let web3 = new Web3(window.ethereum);
    const furyBeastContract = new web3.eth.Contract(
      FURY_BEAST_ABI,
      fury_beast_address
    );

    setBeastDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await furyBeastContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setBeastDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownBeast();
          checkApprovalBeast();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBeastDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownBeast();
    } else if (window.WALLET_TYPE === "binance") {
      const beastsc = new ethers.Contract(
        fury_beast_address,
        FURY_BEAST_ABI,
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

      const txResponse = await beastsc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBeastDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setBeastDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownBeast();
        checkApprovalBeast();
      }
      handleRefreshCountdownBeast();
    }
  };

  //WING STORM

  const getBundlePrizesEagle = async () => {
    const wingStormContract = new window.bscWeb3.eth.Contract(
      WING_STORM_ABI,
      wing_storm_address
    );

    const result_wing_storm = await wingStormContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_wing_storm) {
      setWingStormWodAmount(result_wing_storm / 1e18);
    }
  };

  const handleRefreshCountdownEagle = async () => {
    const wingStormContract = new window.bscWeb3.eth.Contract(
      WING_STORM_ABI,
      wing_storm_address
    );

    const purchaseTimestamp = await wingStormContract.methods
      .getTimeOfDeposit(wallet)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtEagle(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtEagle(isToday);
  };

  const checkApprovalEagle = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await wod_token_abi.methods
        .allowance(wallet, wingStormAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setEagleShowApproval(true);
          } else {
            setEagleShowApproval(false);
            setEagleBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalEagle = async () => {
    setEagleBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(wingStormAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setEagleBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setEagleBundleState("fail");
      });
  };

  const handleDepositEagle = async () => {
    let web3 = new Web3(window.ethereum);
    const wingStormContract = new web3.eth.Contract(
      WING_STORM_ABI,
      wing_storm_address
    );

    setEagleDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await wingStormContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setEagleDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownEagle();
          checkApprovalEagle();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setEagleDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownEagle();
    } else if (window.WALLET_TYPE === "binance") {
      const eaglesc = new ethers.Contract(
        wing_storm_address,
        WING_STORM_ABI,
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

      const txResponse = await eaglesc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setEagleDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setEagleDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownEagle();
        checkApprovalEagle();
      }
      handleRefreshCountdownEagle();
    }
  };

  //SCORPION KING

  const getBundlePrizesScorpion = async () => {
    const scorpionKingContract = new window.bscWeb3.eth.Contract(
      SCORPION_KING_ABI,
      scorpion_king_address
    );

    const result_scorpion_king = await scorpionKingContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_scorpion_king) {
      setScorpionKingWodAmount(result_scorpion_king / 1e18);
    }
  };

  const handleRefreshCountdownScorpion = async () => {
    const scorpionKingContract = new window.bscWeb3.eth.Contract(
      SCORPION_KING_ABI,
      scorpion_king_address
    );

    const purchaseTimestamp = await scorpionKingContract.methods
      .getTimeOfDeposit(coinbase)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtScorpion(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtScorpion(isToday);
  };

  const checkApprovalScorpion = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await wod_token_abi.methods
        .allowance(wallet, scorpionKingAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setScorpionShowApproval(true);
          } else {
            setScorpionShowApproval(false);
            setScorpionBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalScorpion = async () => {
    setScorpionBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(scorpionKingAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setScorpionBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setScorpionBundleState("fail");
      });
  };

  const handleDepositScorpion = async () => {
    let web3 = new Web3(window.ethereum);
    const scorpionKingContract = new web3.eth.Contract(
      SCORPION_KING_ABI,
      scorpion_king_address
    );
    setScorpionDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await scorpionKingContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setScorpionDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownScorpion();
          checkApprovalScorpion();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setScorpionDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownScorpion();
    } else if (window.WALLET_TYPE === "binance") {
      const dragonRuins_address = "0x6837Da6fC313D9218AF7FC9C27dcC088a128bdab";

      const scorpionsc = new ethers.Contract(
        scorpion_king_address,
        SCORPION_KING_ABI,
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

      const txResponse = await scorpionsc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setScorpionDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setScorpionDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownScorpion();
        checkApprovalScorpion();
      }
      handleRefreshCountdownScorpion();
    }
  };

  //STONE EYE

  const getBundlePrizesCyclops = async () => {
    const stoneEyeContract = new window.bscWeb3.eth.Contract(
      STONE_EYE_ABI,
      stone_eye_address
    );

    const result_stone_eye = await stoneEyeContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_stone_eye) {
      setStoneEyeWodAmount(result_stone_eye / 1e18);
    }
  };

  const handleRefreshCountdownCyclops = async () => {
    const stoneEyeContract = new window.bscWeb3.eth.Contract(
      STONE_EYE_ABI,
      stone_eye_address
    );

    const purchaseTimestamp = await stoneEyeContract.methods
      .getTimeOfDeposit(wallet)
      .call();
    if (purchaseTimestamp === 0) {
      setHasBoughtCyclops(false); // User hasn't bought it
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      purchaseDay === currentDay;
    setHasBoughtCyclops(isToday);
  };

  const checkApprovalCyclops = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      await wod_token_abi.methods
        .allowance(wallet, stoneEyeAddress)
        .call()
        .then((data) => {
          if (data === "0" || data < 150000000000000000000) {
            setCyclopsShowApproval(true);
          } else {
            setCyclopsShowApproval(false);
            setCyclopsBundleState("deposit");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleApprovalCyclops = async () => {
    setCyclopsBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();

    await wod_token_abi.methods
      .approve(stoneEyeAddress, "500000000000000000000000000")
      .send({ from: coinbase })
      .then(() => {
        setStatus("Succesfully approved!");
        setCyclopsBundleState("deposit");
        setStatusColor("#00FECF");
      })
      .catch((e) => {
        setStatusColor("#FE7A00");
        setStatus(e?.message);
        setCyclopsBundleState("fail");
      });
  };

  const handleDepositCyclops = async () => {
    let web3 = new Web3(window.ethereum);
    const stoneEyeContract = new web3.eth.Contract(
      STONE_EYE_ABI,
      stone_eye_address
    );

    setCyclopsDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance") {
      await stoneEyeContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setCyclopsDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownCyclops();
          checkApprovalCyclops();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setCyclopsDepositState("failDeposit");
          console.log(e);
        });
      handleRefreshCountdownCyclops();
    } else if (window.WALLET_TYPE === "binance") {
      const cyclopssc = new ethers.Contract(
        stone_eye_address,
        STONE_EYE_ABI,
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

      const txResponse = await cyclopssc
        .deposit({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setCyclopsDepositState("failDeposit");
          console.log(e);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setCyclopsDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownCyclops();
        checkApprovalCyclops();
      }
      handleRefreshCountdownCyclops();
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
    } else if (wallet) {
      setCheckWallet(true);
    } else setCheckWallet(false);
  };

  useEffect(() => {
    getBundlePrizesDragon();
    getBundlePrizesBear();
    getBundlePrizesBeast();
    getBundlePrizesEagle();
    getBundlePrizesScorpion();
    getBundlePrizesCyclops();
  }, []);

  useEffect(() => {
    checkWalletAddr();
    if (email && wallet && chainId === 56) {
      handleRefreshCountdownDragon();
      checkApprovalDragon();
      handleRefreshCountdownBear();
      checkApprovalBear();
      handleRefreshCountdownBeast();
      checkApprovalBeast();
      handleRefreshCountdownEagle();
      checkApprovalEagle();
      handleRefreshCountdownScorpion();
      checkApprovalScorpion();
      handleRefreshCountdownCyclops();
      checkApprovalCyclops();
    } else {
      setHasBoughtBear(false);
      setHasBoughtBeast(false);
      setHasBoughtCyclops(false);
      setHasBoughtDragon(false);
      setHasBoughtEagle(false);
      setHasBoughtScorpion(false);
      setDragonShowApproval(false);
      setDragonBundleState("initial");
      setBeastShowApproval(false);
      setBeastBundleState("initial");
      setBearShowApproval(false);
      setBearBundleState("initial");
      setCyclopsShowApproval(false);
      setCyclopsBundleState("initial");
      setEagleShowApproval(false);
      setEagleBundleState("initial");
      setScorpionShowApproval(false);
      setScorpionBundleState("initial");
    }
  }, [wallet, chainId, email]);

  const eventinfos = [
    {
      id: "dragon",
      challange: "dragon-ruins",
      title: "Dragon Ruins",
      popupImage: dragonRuinsPopup,
      image: dragonRuinsBanner,
      thumbImage: dragonRuinsThumb,
      thumbImageActive: dragonRuinsActiveThumb,
      mobileThumbImage: dragonRuinsThumbMobile,
      mobileThumbImageActive: dragonRuinsActiveThumbMobile,
      wodAmount: dragonRuinsWodAmount,
      desc: "Enter the fiery depths of the Dragon Ruins, where a ferocious dragon guards its treasure. Explore the ruins, overcome challenges, and claim the hidden rewards.",
      day: 1,
      dayText: "MON",
      dayTextLong: "Monday",
      popupDesc:
        "The Dragon Ruins challenge invites players to summon and battle a fearsome dragon for exclusive rewards. This high-stakes event offers a chance to test your combat skills and teamwork. The dragon can only be summoned on Mondays and must be defeated before the end of the day at 00:00 UTC. Players can only purchase access once per day, giving you a single opportunity to emerge victorious.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Mondays.",
        "The Dragon must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 16,000 points and up to 200 stars.",
      ],
      tips: [
        "Recommended Hero Level: 10 and above",
        "Craft plenty of health potions and equip fire-resistant gear to counter the dragon's fiery breath.",
        "Use ranged weapons to attack from a distance, avoiding its powerful melee strikes.",
      ],
      link: "/account/challenges/dragon-ruins",
    },
    {
      challange: "cold-bite",
      id: "coldbite",
      image: coldBiteBanner,
      popupImage: coldBitePopup,
      thumbImage: coldBiteThumb,
      thumbImageActive: coldBiteActiveThumb,
      mobileThumbImage: coldBiteThumbMobile,
      mobileThumbImageActive: coldBiteActiveThumbMobile,
      wodAmount: coldBiteWodAmount,
      desc: "Journey into the icy wilderness, where a fearsome polar bear awaits. Test your survival skills in this frozen adventure and uncover treasures hidden in the snow.",
      day: 2,
      dayText: "TUE",
      dayTextLong: "Tuesday",
      title: "Cold Bite",
      popupDesc:
        "Cold Bite pits players against the ferocious Polar Bear, a frost-bound menace that rewards resilience and strategy. This chilling event is available on Tuesdays and runs until 00:00 UTC. Players can only buy access once per day, so make every move count as you battle this frosty foe.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Tuesdays.",
        "The Polar Bear must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 30,000 points and up to 300 stars.",
      ],
      tips: [
        "Recommended Hero Level: 15 and above",
        "Craft plenty of health potions and equip frost-resistant armor to mitigate the bear's ice attacks.",
        "Focus on evading its slow but powerful swipes and counterattacking with precision.",
      ],
      link: "/account/challenges/cold-bite",
    },
    {
      challange: "fury-beast",
      id: "furyBeast",
      image: furyBeastBanner,
      popupImage: furyBeastPopup,
      thumbImage: furyBeastThumb,
      thumbImageActive: furyBeastActiveThumb,
      mobileThumbImage: furyBeastThumbMobile,
      mobileThumbImageActive: furyBeastActiveThumbMobile,
      wodAmount: furyBeastWodAmount,
      desc: "Navigate through the dense jungle and face the wrath of a wild beast. Discover hidden paths, overcome obstacles, and seize the rewards within this thrilling jungle adventure.",
      day: 3,
      dayText: "WED",
      dayTextLong: "Wednesday",

      title: "Fury Beast",
      popupDesc:
        "Fury Beast throws you into a battle against the Gorilla, a relentless opponent that tests your endurance and tactical skills. Available only on Wednesdays, the event runs until 00:00 UTC. Access can be purchased once per day, so strategic preparation is key to claiming victory and rewards.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Wednesdays.",
        "The Gorilla must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 60,000 points and up to 400 stars.",
      ],
      tips: [
        "Recommended Hero Level: 18 and above",
        "Craft plenty of health potions and focus on agility to dodge the Gorilla’s ground-pounding attacks.",
        "Aim for weak points like the head to deal maximum damage quickly.",
      ],
      link: "/account/challenges/fury-beast",
    },
    {
      challange: "wing-storm",
      id: "wingstorm",
      image: wingStormBanner,
      popupImage: wingStormPopup,
      thumbImage: wingStormThumb,
      thumbImageActive: wingStormActiveThumb,
      mobileThumbImage: wingStormThumbMobile,
      mobileThumbImageActive: wingStormActiveThumbMobile,
      wodAmount: wingStormWodAmount,
      desc: "Soar into the skies and explore intricate pathways guarded by majestic eagle. Use your wits to uncover treasures hidden in this breathtaking aerial journey.",
      day: 4,
      dayText: "THU",
      dayTextLong: "Thursday",

      title: "Wing Storm",
      popupDesc:
        "Take to the skies in Wing Storm, an exhilarating battle against a swift and deadly Eagle. Available exclusively on Thursdays, this event tests your precision and speed as you fight a high-flying adversary. Access can be purchased once per day, with the event running until 00:00 UTC.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Thursdays.",
        "The Eagle must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 70,000 points and up to 500 stars.",
      ],
      tips: [
        "Recommended Hero Level: 22 and above",
        "Craft plenty of health potions and use ranged weapons or magic to counter the Eagle’s aerial mobility.",
        "Stay mobile and anticipate its swift movements to avoid being caught off-guard.",
      ],
      link: "/account/challenges/wing-storm",
    },
    {
      challange: "scorpion-king",
      id: "scorpion",
      popupImage: scorpionKingPopup,
      image: scorpionKingBanner,
      thumbImage: scorpionKingThumb,
      thumbImageActive: scorpionKingActiveThumb,
      mobileThumbImage: scorpionKingThumbMobile,
      mobileThumbImageActive: scorpionKingActiveThumbMobile,
      wodAmount: scorpionKingWodAmount,
      desc: "Cross the scorching desert to challenge the Scorpion King. Brave the heat, avoid traps, and unlock the secrets of the sands to claim the riches waiting for you.",
      day: 6,
      dayText: "SAT",
      dayTextLong: "Saturday",
      title: "Scorpion King",
      popupDesc:
        "Face off against the venomous Scorpion King in this thrilling event. Available only on Saturdays, this battle tests your resistance to poison and your ability to exploit the Scorpion King’s weaknesses. Access can be purchased once per day, with the event running until 00:00 UTC.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Saturdays.",
        "The Scorpion must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 120,000 points and up to 1,000 stars.",
      ],
      tips: [
        "Recommended Hero Level: 40 and above",
        "Craft plenty of health potions and target the tail to disable its poison strikes and reduce the threat.",
        "Equip high-damage weapons to end the fight quickly before the poison accumulates.",
      ],
      link: "/account/challenges/scorpion-king",
    },
    {
      challange: "stone-eye",
      id: "stoneEye",
      image: stoneEyeBanner,
      popupImage: stoneEyePopup,
      thumbImage: stoneEyeThumb,
      thumbImageActive: stoneEyeActiveThumb,
      mobileThumbImage: stoneEyeThumbMobile,
      mobileThumbImageActive: stoneEyeActiveThumbMobile,
      wodAmount: stoneEyeWodAmount,
      desc: "Engage in an epic battle against the mighty Cyclops. Outsmart this towering foe to secure victory and claim valuable rewards hidden within its lair.",
      day: 7,
      dayText: "SUN",
      dayTextLong: "Sunday",
      title: "Stone Eye",
      popupDesc:
        "Stone Eye challenges players to battle the Cyclops, a colossal enemy with devastating attacks. This event is available exclusively on Sundays and ends at 00:00 UTC. Only one access purchase is allowed per day, so prepare carefully for this epic showdown.",
      workList: [
        "Purchase the bundle from the Challenge & Events.",
        "The event is available exclusively on Sundays.",
        "The Cyclop must be defeated within the day, with the timer resetting at 00:00 UTC.",
        "Rewards include 80,000 points and up to 600 stars.",
      ],
      tips: [
        "Recommended Hero Level: 30 and above",
        "Craft plenty of health potions and equip high-defense gear to withstand its crushing attacks.",
        "Attack its legs to slow it down and exploit openings for critical hits.",
      ],
      link: "/account/challenges/stone-eye",
    },
  ];

  const mazeGardenInfo = {
    id: "maze",
    popupImage: mazeGardenPopup,
    image: mazeGardenBanner,
    desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
    day: 5,
    dayText: "FRI",
    title: "Maze Day",
    popupDesc:
      "Explore the enigmatic BNB Chain Maze, a labyrinth filled with twists and turns leading to the hidden gem at the center. This event is only accessible to WOD token holders and runs exclusively on Fridays. Navigate the maze carefully and claim your prize before 00:00 UTC.",
    workList: [
      "The event is available exclusively on Fridays.",
      "Hold at least 400 WOD tokens to participate.",
      "Players must find their way to the maze’s center and collect the gem to earn rewards.",
      "Rewards include up to 200,000 points, 800 stars, and $10.",
    ],
    tips: [
      "Recommended Hero Level: 15 and above",
      "Focus on observation to spot clues, gates, and shortcuts.",
      "Plan your route and mark your path to avoid retracing your steps.",
    ],
    link: "/account/challenges/maze-day",
  };

  const greatCollectionInfo = {
    id: "greatCollection",
    image: greatCollectionBanner,
    popupImage: greatCollectionPopup,
    desc: "Defend your world by taking on invading explorers who are here to gather information. Fight to protect the secrets of the land and earn rewards.",
    title: "The Great Collection",
    popupDesc:
      "The Great Collection is a thrilling event where players are tasked with gathering rare and unique partner branded coins scattered across the game. This event challenges your exploration and problem-solving skills as you work to collect as many coins as possible. Compete against other players to amass the largest collection and earn exclusive rewards based on your ranking.",
    workList: [
      "Rare collectible items are hidden across the map, in both common and hard-to-reach locations.",
      "Players must explore the maps to retrieve these partner branded coins.",
      "The collected amount contributes to unlocking more rewards in the future.",
    ],
    tips: [
      "Recommended Hero Level: 1 and above",
      "Prioritize exploring areas that are less crowded to maximize your chances of finding hidden coins.",
      "Use mounts or movement speed boosts to traverse large zones quickly.",
    ],
    link: "/account/challenges/great-collection",
  };

  const explorerHuntInfo = {
    image: explorerHuntBanner,
    popupImage: explorerHuntPopup,
    desc: "Explore the vast world and partner areas to find hidden items. Discover valuable treasures while delving into unique zones.",
    title: "Explorer Hunt",
    popupDesc:
      "Defend the world from the alien explorers who have landed to assess the terrain before their invasion. Players will hear an alert signaling the arrival of these intruders in a specific area, and your task is to defend the city by defeating them. The event features three levels of explorers, each more powerful and challenging than the last. Be prepared to strategize and face increasingly formidable opponents as you protect your homeland.",
    workList: [
      "Alerts will notify players of the arrival of alien explorers in a designated area.",
      "Players must travel to the location and engage in combat with the explorers.",
      "There are three levels of explorers to defeat, each with higher difficulty and rewards.",
    ],
    tips: [
      "Recommended Hero Level: 20 and above",
      "Upgrade your weapons and armor to handle the increasing difficulty of higher-level explorers.",
      "Stock up on health potions to sustain yourself during prolonged battles.",
    ],
    link: "/account/challenges/explorer-hunt",
  };

  const criticalHitInfos = {
    id: "critical",
    image: criticalHitBanner,
    popupImage: criticalHitPopup,
    desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    title: "Critical Hit",
    link: "/account/challenges/critical-hit",
    popupDesc:
      "As a Genesis Land NFT holder, you can participate in the daily Critical Hit event to earn points and rewards. Each day, you need to log in to the game and visit your land. On your land, you have a Genesis Gem, which you need to break with a pickaxe. Once broken, it gives you either points that are added to your leaderboard rank on BNB Chain or direct rewards in BNB.",
    secondaryTitle: "What is Genesis Land?",
    thirdDesc:
      "Genesis Land is a 125x125 area in World of Dypians, available to those who own a Genesis Land NFT. Benefits include exclusive rewards, Land NFT staking pool, and special in-game events like Critical Hit.",
    workList: [
      "Hold Genesis Land NFT to access the event.",
      "Earn 30,000-80,000 points by destroying the Gem",
      "Receive rewards ranging from $20 to $7,000 ",
      "Rewards are distributed monthly, and you can destroy the Gem once every 24 hours (00:00 UTC).",
    ],
    tips: [
      "Recommended Hero Level: Any",
      "Use your pickaxe to break the Genesis Gem efficiently.",
      "Check your Genesis Land daily to ensure you don't miss a gem reset.",
    ],
  };

  const puzzleMadnessInfo = {
    id: "puzzle",
    popupImage: puzzleMadnessPopup,
    image: puzzleMadnessBanner,

    desc: "Embark on a thrilling quest to locate hidden puzzle pieces scattered across the map. Put them together to unlock exciting rewards.",
    title: "Puzzle Madness",
    link: "/account/challenges/puzzle-madness",
    popupDesc:
      "In the Puzzle Madness event, players search for 10 hidden pieces across the Island Zero and Dypians City maps. These pieces hold points that contribute to the BNB Chain leaderboard. One piece contains a multiplier (x2 to x8) that activates only after all pieces are found, significantly boosting your score.",
    secondaryDesc:
      "Players have two hours to find the pieces. Points are added to the leaderboards even if not all pieces are found. You can extend time by purchasing another bundle.",
    secondaryTitle: "CAWS NFT Utility",
    thirdDesc:
      "Holding a CAWS NFT gives you an advantage. Your cat companion helps detect hidden pieces with an exclamation mark above its head. However, the cat cannot detect pieces on top or inside buildings, so players must thoroughly explore.",
    workList: [
      "Purchase the bundle from the Challenge & Events.",
      "Find 10 pieces within the two-hour limit in the  Island Zero and Dypians City maps ",
      "An indicator will guide you on whether pieces are located making your search easier",
    ],
  };

  const goldenPassInfo = {
    id: "golden",
    popupImage: goldenPassPopup,
    image: goldenPassCard,
    desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    title: "Golden Pass",
    link: "/account/challenges/golden-pass",
    popupDesc:
      "The Golden Pass Event lets players earn extra rewards from the leaderboards. The pass is valid for one calendar month, regardless of purchase date.",
    secondaryDesc:
      "Example: If you buy the Golden Pass on the 7th, it remains active until the end of the month (e.g., from the 7th to the 30th/31st). However, it will reset on the 1st of the following month and must be repurchased to stay active.",
    workList: [
      "Purchase the bundle from the Challenge & Events.",
      "The golden pass is valid for one calendar month, resetting on the 1st, regardless of the purchase date.",
      "Extra rewards are given based on leaderboard rank as long as the golden pass is active.",
    ],
  };

  useEffect(() => {
    const today = new Date();
    const monday = getMonday(today);
    const week = generateWeekDates(monday);
    setCurrentWeek(week);
    setActiveEvent(
      eventinfos.find((item) => {
        return item.day === utcDayIndex;
      }) ?? eventinfos[0]
    );
    setActiveThumb(
      eventinfos.find((item) => {
        return item.day === utcDayIndex;
      }) !== undefined
        ? eventinfos.find((item) => {
            return item.day === utcDayIndex;
          }).id
        : eventinfos[0].id
    );
    setChallenge(
      eventinfos.find((item) => {
        return item.day === utcDayIndex;
      }) !== undefined
        ? eventinfos.find((item) => {
            return item.day === utcDayIndex;
          }).challange
        : eventinfos[0].challange
    );
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setChallenge(selectedEvent);
    }
  }, [selectedEvent]);
  useEffect(() => {
    if (eventId === undefined) {
      const filteredEvent =
        eventinfos.find((item) => {
          return item.day === utcDayIndex;
        }) ?? eventinfos[0];
      setActiveEvent(filteredEvent);
      setActiveThumb(filteredEvent.id);
      if (sliderRef.current) {
        sliderRef?.current?.innerSlider?.slickGoTo(
          eventinfos.findIndex(
            (item) => item.challange === filteredEvent.challange
          ) === 5
            ? 3.5
            : eventinfos.findIndex(
                (item) => item.challange === filteredEvent.challange
              ) - 0.5
        );
      }
      setChallenge(filteredEvent.challange);
    } else if (
      eventId &&
      eventId !== "" &&
      eventId !== "treasure-hunt" &&
      eventId !== "maze-day" &&
      eventId !== "great-collection" &&
      eventId !== "explorer-hunt" &&
      eventId !== "critical-hit" &&
      eventId !== "golden-pass" &&
      eventId !== "puzzle-madness"
    ) {
      setActiveEvent(
        eventinfos.find((item) => {
          return item.challange === eventId;
        })
      );
      setActiveThumb(
        eventinfos.find((item) => {
          return item.challange === eventId;
        }).id
      );
      if (sliderRef.current) {
        sliderRef?.current?.innerSlider?.slickGoTo(
          eventinfos.findIndex((item) => item.challange === eventId) === 5
            ? 3.5
            : eventinfos.findIndex((item) => item.challange === eventId) - 0.5
        );
      }
    } else if (eventId !== "" && eventId === "maze-day") {
      setActiveEvent(mazeGardenInfo);
    } else if (eventId !== "" && eventId === "great-collection") {
      setActiveEvent(greatCollectionInfo);
    } else if (eventId !== "" && eventId === "explorer-hunt") {
      setActiveEvent(explorerHuntInfo);
    } else if (eventId !== "" && eventId === "critical-hit") {
      setActiveEvent(criticalHitInfos);
    } else if (eventId !== "" && eventId === "puzzle-madness") {
      setActiveEvent(puzzleMadnessInfo);
    } else if (eventId !== "" && eventId === "golden-pass") {
      setActiveEvent(goldenPassInfo);
    }
  }, [selectedEvent, sliderRef?.current, eventCardCount]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (showPopup !== "") {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [showPopup]);

  return (
    <>
      <div
        className="custom-container mt-5"
        id={selectedEvent ? selectedEvent : ""}
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column">
              <div className="new-events-top-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
                <h6 className="challenges-text mb-0">CHALLENGES & EVENTS</h6>
              </div>
              <div className="new-events-bottom-wrapper p-3 mb-4">
                <div className="row gap-2 gap-lg-0">
                  <div className="col-12 col-lg-2">
                    <div className="challenges-list-wrapper py-3 px-1 px-lg-0 d-flex flex-column gap-2">
                      <NavLink
                        to={
                          eventinfos.find((item) => {
                            return item.day === utcDayIndex;
                          }) !== undefined
                            ? eventinfos.find((item) => {
                                return item.day === utcDayIndex;
                              }).link
                            : eventinfos[0].link
                        }
                      >
                        <div
                          className={`${
                            eventId !== "treasure-hunt" &&
                            eventId !== "maze-day" &&
                            eventId !== "great-collection" &&
                            eventId !== "explorer-hunt" &&
                            eventId !== "critical-hit" &&
                            eventId !== "golden-pass" &&
                            eventId !== "puzzle-madness"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge(
                              eventinfos.find((item) => {
                                return item.day === utcDayIndex;
                              }) !== undefined
                                ? eventinfos.find((item) => {
                                    return item.day === utcDayIndex;
                                  }).challange
                                : eventinfos[0].challange
                            );
                            setActiveEvent(
                              eventinfos.find((item) => {
                                return item.day === utcDayIndex;
                              }) ?? eventinfos[0]
                            );
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Legendary Beast Siege</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/maze-day">
                        <div
                          className={`${
                            challenge === "maze-day" ||
                            selectedEvent === "maze-day"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("maze-day");
                            setActiveEvent(mazeGardenInfo);
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">BNB Chain Maze Day</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/treasure-hunt">
                        <div
                          className={`${
                            challenge === "treasure-hunt" ||
                            selectedEvent === "treasure-hunt"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("treasure-hunt");
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Treasure Hunt</h6>
                        </div>
                      </NavLink>

                      {/* <NavLink to="/account/challenges/golden-pass">
                        <div
                          className={`${
                            challenge === "golden-pass" ||
                            selectedEvent === "golden-pass"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("golden-pass");
                            setActiveEvent(goldenPassInfo);
                          }}
                        >
                          <h6 className="mb-0">Golden Pass</h6>
                        </div>
                      </NavLink> */}
                      <NavLink to="/account/challenges/puzzle-madness">
                        <div
                          className={`${
                            challenge === "puzzle-madness" ||
                            selectedEvent === "puzzle-madness"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("puzzle-madness");
                            setActiveEvent(puzzleMadnessInfo);
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Puzzle Madness</h6>
                        </div>
                      </NavLink>

                      <NavLink to="/account/challenges/explorer-hunt">
                        <div
                          className={`${
                            challenge === "explorer-hunt" ||
                            selectedEvent === "explorer-hunt"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("explorer-hunt");
                            setActiveEvent(explorerHuntInfo);
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Explorer Hunt</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/great-collection">
                        <div
                          className={`${
                            challenge === "great-collection" ||
                            selectedEvent === "great-collection"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("great-collection");
                            setActiveEvent(greatCollectionInfo);
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">The Great Collection</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/critical-hit">
                        <div
                          className={`${
                            challenge === "critical-hit" ||
                            selectedEvent === "critical-hit"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("critical-hit");
                            setActiveEvent(criticalHitInfos);
                          }}
                        >
                          {/* <img src={treasureHuntIcon} alt="" /> */}
                          <h6 className="mb-0">Critical Hit</h6>
                        </div>
                      </NavLink>

                      {/* <NavLink to="/account/challenges/dragon-ruins">
                        <div
                          className={`${
                            challenge === "dragon-ruins" ||
                            selectedEvent === "dragon-ruins"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("dragon-ruins");
                          }}
                        >
                          <img src={dragonRuinsIcon} alt="" />
                          <h6 className="mb-0">Dragon Ruins</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/golden-pass">
                        <div
                          className={`${
                            challenge === "golden-pass" ||
                            selectedEvent === "golden-pass"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("golden-pass");
                          }}
                        >
                          <img src={goldenPassIcon} alt="" />
                          <h6 className="mb-0">Golden Pass</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/scorpion-king">
                        <div
                          className={` ${
                            challenge === "scorpion-king" ||
                            selectedEvent === "scorpion-king"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("scorpion-king");
                          }}
                        >
                          <img src={scorpionKingIcon} alt="" />
                          <h6 className="mb-0">Scorpion King</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/puzzle-madness">
                        <div
                          className={` ${
                            challenge === "puzzle-madness" ||
                            selectedEvent === "puzzle-madness"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("puzzle-madness");
                          }}
                        >
                          <img src={puzzleMadnessIcon} alt="" />
                          <h6 className="mb-0">Puzzle Madness</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/critical-hit">
                        <div
                          className={` ${
                            challenge === "critical-hit" ||
                            selectedEvent === "critical-hit"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("critical-hit");
                          }}
                        >
                          <img src={criticalHitIcon} alt="" />
                          <h6 className="mb-0">Critical Hit</h6>
                        </div>
                      </NavLink>
                      <NavLink to="/account/challenges/maze-day">
                        <div
                          className={` ${
                            challenge === "maze-day" ||
                            selectedEvent === "maze-day"
                              ? "active-challenge-item"
                              : "challenge-item"
                          } d-flex align-items-center gap-2 py-2 px-1 px-lg-4`}
                          onClick={() => {
                            setChallenge("maze-day");
                          }}
                        >
                          <img
                            src={mazeGardenIcon}
                            alt=""
                            style={{ width: 32, height: 34 }}
                          />
                          <h6 className="mb-0">Maze Garden</h6>
                        </div>
                      </NavLink> */}
                    </div>
                  </div>
                  <div className="col-12 col-lg-10">
                    {(challenge === "treasure-hunt" ||
                      selectedEvent === "treasure-hunt") && (
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <div
                          className={`${
                            eventDuration === "Live"
                              ? "active-challenge-tab"
                              : "challenge-tab"
                          }   px-4 py-2 d-flex align-items-center justify-content-center`}
                          onClick={() => {
                            seteventDuration("Live");
                          }}
                        >
                          <span>Live</span>
                        </div>
                        <div
                          className={`${
                            eventDuration === "Coming Soon"
                              ? "active-challenge-tab"
                              : "challenge-tab"
                          } px-4 py-2 d-flex align-items-center justify-content-center`}
                          onClick={() => {
                            seteventDuration("Coming Soon");
                          }}
                        >
                          <span>Upcoming</span>
                        </div>
                        <div
                          className={`${
                            eventDuration === "Expired"
                              ? "active-challenge-tab"
                              : "challenge-tab"
                          } px-4 py-2 d-flex align-items-center justify-content-center`}
                          onClick={() => {
                            seteventDuration("Expired");
                          }}
                        >
                          <span>Past</span>
                        </div>
                      </div>
                    )}
                    {challenge === "treasure-hunt" ? (
                      <TreasureHunt
                        events={events}
                        eventDuration={eventDuration}
                        onEventClick={onEventClick}
                      />
                    ) : challenge === "dragon-ruins" ||
                      challenge === "cold-bite" ||
                      challenge === "fury-beast" ||
                      challenge === "wing-storm" ||
                      challenge === "scorpion-king" ||
                      challenge === "stone-eye" ? (
                      <div className="d-flex flex-column gap-2 w-100">
                        <div
                          className="d-flex px-0 align-items-center h-auto gap-4 position-relative "
                          onMouseLeave={() => {
                            setActiveThumb();
                          }}
                        >
                          <Slider {...settings} ref={sliderRef}>
                            {eventinfos.map((item, index) => (
                              <NavLink
                                key={index}
                                to={item.link}
                                className={"py-4 me-3"}
                              >
                                <div
                                  className="beast-challenge-card2 d-flex flex-column position-relative"
                                  onClick={() => {
                                    // setPopupEvent(item);
                                    setActiveEvent(item);
                                    setActiveThumb(item.id);
                                    // sliderRef?.current?.innerSlider?.slickGoTo(
                                    //   index - 0.5
                                    // );
                                  }}
                                  onMouseEnter={() => {
                                    setActiveThumb(item.id);
                                  }}
                                  // style={{width: 120}}
                                >
                                  <img
                                    src={
                                      // windowSize && windowSize.width < 991
                                      //   ? activeThumb === item.id ||
                                      //     activeEvent.id === item.id
                                      //     ? item.mobileThumbImageActive
                                      //     : item.mobileThumbImage
                                      //   :
                                      activeThumb === item.id ||
                                      activeEvent.id === item.id
                                        ? item.thumbImageActive
                                        : item.thumbImage
                                    }
                                    className={`w-100 event-thumb-img ${
                                      (activeThumb === item.id ||
                                        activeEvent.id === item.id) &&
                                      "event-thumb-hover"
                                    } `}
                                    alt=""
                                  />
                                  <div
                                    className="d-flex align-item-start gap-2 position-absolute"
                                    style={{ top: "-20px", right: "3px" }}
                                  >
                                    {/* <p className="challenge-beast-desc m-0 ">{item.desc}</p> */}
                                    {/* <span  style={{color: item.day === currentDate ? "gold" : "white" }}>{currentWeek[item.day - 1]?.getDate()}</span> */}
                                    <div className="beast-date d-flex flex-column">
                                      <div
                                        className="beast-date-text-holder d-flex align-items-center justify-content-center"
                                        style={{
                                          background:
                                            item.day === adjustedDay
                                              ? "#e10000"
                                              : "#08656a",
                                        }}
                                      >
                                        {item.dayText}
                                      </div>
                                      <div className="beast-date-holder d-flex align-items-center justify-content-center">
                                        {currentWeek[item.day - 1]?.getDate()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </NavLink>
                            ))}
                          </Slider>
                        </div>
                        <div className="sidebar-separator2 my-2"></div>
                        <div className="d-flex flex-column gap-3">
                          <div className="new-event-wrapper d-flex flex-column">
                            <div className="position-relative d-flex flex-column align-items-lg-center justify-content-center">
                              <img
                                src={tooltipIcon}
                                className="new-event-banner-tooltip"
                                alt=""
                                onClick={() => {
                                  setshowPopup(activeEvent?.id);
                                }}
                              />
                              <img
                                src={activeEvent?.image}
                                className="new-event-banner"
                                alt=""
                              />

                              <div className="d-flex col-12 p-2 p-lg-4 justify-content-between gap-2 flex-column flex-lg-row dynamicPosition">
                                <div className="d-flex flex-column gap-2  col-lg-6">
                                  <h6
                                    className="mb-0 challenge-popup-secondary-title"
                                    style={{ color: "#FFC808" }}
                                  >
                                    How it works
                                  </h6>
                                  <div className="d-flex flex-column gap-2">
                                    {activeEvent?.workList.map(
                                      (work, index) => (
                                        <div
                                          className="d-flex align-items-center gap-2"
                                          key={index}
                                        >
                                          <div className="yellow-dot"></div>
                                          <span className="challenge-popup-desc text-white">
                                            {work}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className="d-flex flex-column gap-1 col-lg-6">
                                  {activeEvent?.tips && (
                                    <h6
                                      className="mb-0 challenge-popup-secondary-title"
                                      style={{ color: "#FFC808" }}
                                    >
                                      Tips
                                    </h6>
                                  )}
                                  <div className="d-flex flex-column gap-1">
                                    {activeEvent?.tips?.map((tip, index) => (
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        key={index}
                                      >
                                        <div className="yellow-dot"></div>
                                        <span className="challenge-popup-desc text-white">
                                          {tip}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between">
                            <h6 className="mb-0 purchase-package-title">
                              Activate
                            </h6>
                            {/* <div className="d-flex align-items-end gap-2">
                              <span className="available-on">Available on</span>
                              <img src={bnb} width={20} height={20} alt="" />
                              <span className="purchase-chain">BNB Chain</span>
                            </div> */}
                          </div>
                          {adjustedDay === activeEvent.day ? (
                            <>
                              <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                                <div
                                  className="event-price-wrapper p-3 d-flex align-items-center gap-5"
                                  style={{
                                    pointerEvents: isMonday ? "auto" : "none",
                                    filter: isMonday ? "none" : "blur(5px)",
                                  }}
                                >
                                  <span className="event-price-span">
                                    Event Price
                                  </span>
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center gap-1">
                                      <img
                                        src={wodIcon}
                                        height={30}
                                        width={30}
                                        alt=""
                                      />
                                      <h6 className="event-price-coin mb-0">
                                        {getFormattedNumber(
                                          activeEvent.wodAmount
                                        )}{" "}
                                        WOD
                                      </h6>
                                    </div>
                                    <span className="event-price-usd">
                                      ($
                                      {getFormattedNumber(
                                        activeEvent.wodAmount * wodPrice
                                      )}
                                      )
                                    </span>
                                  </div>
                                </div>
                                {adjustedDay === 1 ? (
                                  <>
                                    {hasBoughtDragon ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            dragonBundleState === "deposit" ||
                                            dragonBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            dragonBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() => handleApprovalDragon()}
                                        >
                                          {dragonBundleState === "loading" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            dragonBundleState === "deposit" ||
                                            dragonDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            dragonBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn"
                                              : "stake-wod-btn-inactive d-none"
                                          }  py-2 px-4`}
                                          onClick={() => handleDepositDragon()}
                                        >
                                          {dragonDepositState ===
                                          "loading-deposit" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 2 ? (
                                  <>
                                    {hasBoughtBear ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            bearBundleState === "deposit" ||
                                            bearBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            bearBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() => handleApprovalBear()}
                                        >
                                          {bearBundleState === "loading" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            bearBundleState === "deposit" ||
                                            bearDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            bearBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn"
                                              : "stake-wod-btn-inactive d-none"
                                          }  py-2 px-4`}
                                          onClick={() => handleDepositBear()}
                                        >
                                          {bearDepositState ===
                                          "loading-deposit" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 3 ? (
                                  <>
                                    {hasBoughtBeast ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            beastBundleState === "deposit" ||
                                            beastBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            beastBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() => handleApprovalBeast()}
                                        >
                                          {beastBundleState === "loading" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            beastBundleState === "deposit" ||
                                            beastDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            beastShowApproval === false &&
                                            checkWallet === true
                                              ? "stake-wod-btn"
                                              : beastShowApproval === true &&
                                                checkWallet === true
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn-inactive"
                                          }  py-2 px-4`}
                                          onClick={() => handleDepositBeast()}
                                        >
                                          {beastDepositState ===
                                          "loading-deposit" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 4 ? (
                                  <>
                                    {hasBoughtEagle ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            eagleBundleState === "deposit" ||
                                            eagleBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            eagleBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() => handleApprovalEagle()}
                                        >
                                          {eagleBundleState === "loading" ? (
                                            <CircularProgress
                                              size={20}
                                              style={{
                                                alignSelf: "center",
                                                margin: "auto",
                                              }}
                                            />
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            eagleBundleState === "deposit" ||
                                            eagleDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            eagleBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn"
                                              : "stake-wod-btn-inactive d-none"
                                          }  py-2 px-4`}
                                          onClick={() => handleDepositEagle()}
                                        >
                                          {eagleDepositState ===
                                          "loading-deposit" ? (
                                            <CircularProgress
                                              size={20}
                                              style={{
                                                alignSelf: "center",
                                                margin: "auto",
                                              }}
                                            />
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 6 ? (
                                  <>
                                    {hasBoughtScorpion ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            scorpionBundleState === "deposit" ||
                                            scorpionBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            scorpionBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() =>
                                            handleApprovalScorpion()
                                          }
                                        >
                                          {scorpionBundleState === "loading" ? (
                                            <CircularProgress
                                              size={20}
                                              style={{
                                                alignSelf: "center",
                                                margin: "auto",
                                              }}
                                            />
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            scorpionBundleState === "deposit" ||
                                            scorpionDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            scorpionBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn"
                                              : "stake-wod-btn-inactive d-none"
                                          }  py-2 px-4`}
                                          onClick={() =>
                                            handleDepositScorpion()
                                          }
                                        >
                                          {scorpionDepositState ===
                                          "loading-deposit" ? (
                                            <CircularProgress
                                              size={20}
                                              style={{
                                                alignSelf: "center",
                                                margin: "auto",
                                              }}
                                            />
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 0 ? (
                                  <>
                                    {hasBoughtCyclops ? (
                                      <div className="d-flex flex-column gap-1">
                                        <span className="days3">
                                          Active Until:
                                        </span>
                                        <Countdown
                                          renderer={renderer}
                                          date={midnightUTC}
                                        />
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        <button
                                          disabled={
                                            cyclopsBundleState === "deposit" ||
                                            cyclopsBundleState === "loading" ||
                                            checkWallet === false
                                              ? true
                                              : false
                                          }
                                          className={` ${
                                            cyclopsBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn-inactive d-none"
                                              : "stake-wod-btn"
                                          }  py-2 px-4`}
                                          onClick={() =>
                                            handleApprovalCyclops()
                                          }
                                        >
                                          {cyclopsBundleState === "loading" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Approve"
                                          )}
                                        </button>
                                        <button
                                          disabled={
                                            cyclopsBundleState === "deposit" ||
                                            cyclopsDepositState ===
                                              "loading-deposit" ||
                                            checkWallet === true
                                              ? false
                                              : true
                                          }
                                          className={` ${
                                            cyclopsBundleState === "deposit" ||
                                            checkWallet === false
                                              ? "stake-wod-btn"
                                              : "stake-wod-btn-inactive d-none"
                                          }  py-2 px-4`}
                                          onClick={() => handleDepositCyclops()}
                                        >
                                          {cyclopsDepositState ===
                                          "loading-deposit" ? (
                                            <div
                                              class="spinner-border spinner-border-sm text-light"
                                              role="status"
                                            >
                                              <span class="visually-hidden">
                                                Loading...
                                              </span>
                                            </div>
                                          ) : (
                                            "Buy"
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
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
                            </>
                          ) : (
                            <>
                              <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                                <span
                                  className="available-day-text mb-0 text-white w-100 d-flex justify-content-center text-center"
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                  }}
                                >
                                  Challenge Available on{" "}
                                  {activeEvent.dayTextLong}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : challenge === "maze-day" ||
                      challenge === "great-collection" ||
                      challenge === "explorer-hunt" ||
                      challenge === "critical-hit" ||
                      challenge === "golden-pass" ||
                      challenge === "puzzle-madness" ? (
                      <div className="d-flex flex-column gap-3">
                        <div className="new-event-wrapper d-flex flex-column">
                          <div className="position-relative d-flex flex-column align-items-lg-center justify-content-center">
                            <img
                              src={tooltipIcon}
                              className="new-event-banner-tooltip"
                              alt=""
                              onClick={() => {
                                setshowPopup(activeEvent?.id);
                              }}
                            />
                            <img
                              src={activeEvent?.image}
                              className="new-event-banner"
                              alt=""
                            />

                            <div className="d-flex col-12 p-2 p-lg-4 justify-content-between gap-2 flex-column flex-lg-row dynamicPosition">
                              <div className="d-flex flex-column gap-2  col-lg-6">
                                <h6
                                  className="mb-0 challenge-popup-secondary-title"
                                  style={{ color: "#FFC808" }}
                                >
                                  How it works
                                </h6>
                                <div className="d-flex flex-column gap-2">
                                  {activeEvent?.workList.map((work, index) => (
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      key={index}
                                    >
                                      <div className="yellow-dot"></div>
                                      <span className="challenge-popup-desc text-white">
                                        {work}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="d-flex flex-column gap-1 col-lg-6">
                                {activeEvent?.tips && (
                                  <h6
                                    className="mb-0 challenge-popup-secondary-title"
                                    style={{ color: "#FFC808" }}
                                  >
                                    Tips
                                  </h6>
                                )}
                                <div className="d-flex flex-column gap-1">
                                  {activeEvent?.tips?.map((tip, index) => (
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      key={index}
                                    >
                                      <div className="yellow-dot"></div>
                                      <span className="challenge-popup-desc text-white">
                                        {tip}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between">
                          <h6 className="mb-0 purchase-package-title">
                            Activate
                          </h6>
                          {/* <div className="d-flex align-items-end gap-2">
                            <span className="available-on">Available on</span>
                            <img src={bnb} width={20} height={20} alt="" />
                            <span className="purchase-chain">BNB Chain</span>
                          </div> */}
                        </div>
                        {activeEvent?.id === "critical" ? (
                          <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3  align-items-center justify-content-center position-relative">
                            <NavLink
                              to={"/shop/land"}
                              className="getpremium-btn col-lg-4 py-2"
                            >
                              Buy on Shop
                            </NavLink>
                            <NavLink
                              to={
                                "https://opensea.io/collection/worldofdypians"
                              }
                              target="_blank"
                              className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
                            >
                              <img src={opensea} alt="" />
                              Buy on Opensea
                            </NavLink>
                          </div>
                        ) : (
                          <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                            <span
                              className="available-day-text mb-0 text-white w-100 d-flex justify-content-center"
                              style={{ fontWeight: "700", fontSize: "18px" }}
                            >
                              Event Coming Soon
                            </span>
                          </div>
                        )}
                        {eventId === "golden-pass" &&
                          availableTime !== 0 &&
                          availableTime !== undefined && (
                            <div className="new-event-wrapper mt-5 p-3">
                              <div className="d-flex flex-column gap-2">
                                <div className=" d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between w-100">
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                      <h6 className="mb-0 time-remaining">
                                        Available Time Remaining
                                      </h6>
                                      <img
                                        src={whiteTooltip}
                                        width={20}
                                        height={20}
                                        alt=""
                                      />
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
                                      sync button every time you purchase a
                                      bundle
                                    </p>
                                  </div>
                                  <Countdown
                                    date={Number(availableTime)}
                                    renderer={renderer}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup !== "" && (
        <OutsideClickHandler onOutsideClick={() => setshowPopup("")}>
          <ChallengePopup
            item={activeEvent}
            handleClose={() => setshowPopup("")}
            screen="account"
          />
        </OutsideClickHandler>
      )}

      {/*  {showPopup === "critical" && (
        <CriticalHitPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}

      {showPopup === "dragon" && (
        <DragonPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )}

      {showPopup === "golden" && (
        <GoldenPassPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )} */}
      {/* {showPopup === "puzzle" && (
        <PuzzleMadnessPopup
          onClosePopup={() => {
            setshowPopup("");
          }}
        />
      )} */}
    </>
  );
};

export default NewEvents;
