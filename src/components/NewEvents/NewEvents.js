import React, { useState, useEffect, useRef } from "react";
import "./_newevents.scss";
import TreasureHunt from "../Challenges/TreasureHunt";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import ChallengePopup from "../ChallengePopup/ChallengePopup";
import OutsideClickHandler from "react-outside-click-handler";
import Slider from "react-slick";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import {
  coldBiteAddress,
  dragonRuinsAddress,
  furyBeastAddress,
  puzzleMadnessAddress,
  scorpionKingAddress,
  stoneEyeAddress,
  wingStormAddress,
  wod_token_abi,
} from "../../screens/Account/src/web3";
import { ethers } from "ethers";
import {
  COLD_BITE_ABI,
  cold_bite_address,
  DRAGON_RUINS_ABI,
  dragon_ruins_address,
  FURY_BEAST_ABI,
  fury_beast_address,
  PUZZLE_MADNESS_ABI,
  puzzle_madness_address,
  SCORPION_KING_ABI,
  scorpion_king_address,
  STONE_EYE_ABI,
  stone_eye_address,
  WING_STORM_ABI,
  wing_storm_address,
} from "./abi";
import Web3 from "web3";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="beast-siege-wod-price">
      {String(hours).padStart(2, "0")}h:{String(minutes).padStart(2, "0")}m
    </span>
  );
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "12px",
    maxWidth: "250px !important",
    minWidth: "250px !important",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));

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
  isConnected,
  setBeastSiegeStatus,
  greatCollectionData,
  explorerHuntData,
  setPuzzleMadnessTimer,
  onConnectWallet,
  wodBalance,
  genesisUsd,
  walletClient,
  publicClient,
  network_matchain,
}) => {
  const [activeThumb, setActiveThumb] = useState("");
  const [challenge, setChallenge] = useState("");
  const [activeEvent, setActiveEvent] = useState({});
  const [eventDuration, seteventDuration] = useState("Live");
  const [showPopup, setshowPopup] = useState("");
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

  //PUZZLE MADNESS
  const [puzzleMadnessWodAmount, setpuzzleMadnessWodAmount] = useState(0);
  const [puzzleMadnessBundleState, setpuzzleMadnessBundleState] =
    useState("initial");
  const [puzzleMadnessDepositState, setpuzzleMadnessDepositState] =
    useState("initial");
  const [puzzleMadnessShowApproval, setpuzzleMadnessShowApproval] =
    useState(true);
  const [hasBoughtpuzzleMadness, setHasBoughtpuzzleMadness] = useState(false);
  const [puzzleMadnessCountdown, setpuzzleMadnessCountdown] = useState(0);
  const [isFinishedPuzzle, setisFinishedPuzzle] = useState(false);

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
  const [hasLand, setHasLand] = useState(false);
  const [page, setPage] = useState(1);
  const sliderRef = useRef();
  const now = new Date();
  const currentDate = new Date().getUTCDay();
  const utcDayIndex = new Date().getUTCDay();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const isAfterCutoff = utcHours === 0 && utcMinutes >= 30;
  function hasNoMoreThanTwoDecimalPlaces(num) {
    // Check if the number has up to 2 decimal places
    return Number.isInteger(num) || num.toFixed(2) == num.toString();
  }

  let eventId = selectedEvent;
  const windowSize = useWindowSize();

  let adjustedDay = isAfterCutoff
    ? utcDayIndex === 0
      ? 7
      : utcDayIndex
    : utcHours === 0
    ? utcDayIndex === 0
      ? 6
      : utcDayIndex - 1
    : utcDayIndex === 0
    ? 7
    : utcDayIndex;

  const midnightUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      30,
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

  //PUZZLE MADNESS
  const getBundlePrizesPuzzle = async () => {
    const puzzleContract = new window.bscWeb3.eth.Contract(
      PUZZLE_MADNESS_ABI,
      puzzle_madness_address
    );

    const result_puzzle = await puzzleContract.methods
      .getEstimatedBundleWODAmount()
      .call()
      .catch((e) => {
        console.error(e);
      });

    if (result_puzzle) {
      setpuzzleMadnessWodAmount(result_puzzle / 1e18);
    }
  };

  const handleRefreshCountdownPuzzle = async () => {
    const puzzleContract = new window.bscWeb3.eth.Contract(
      PUZZLE_MADNESS_ABI,
      puzzle_madness_address
    );

    const purchaseTimestamp = await puzzleContract.methods
      .getTimeOfExpireBuff(wallet)
      .call();
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtpuzzleMadness(false);
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        puzzleMadness: false,
      }));
      return;
    } else if (Number(purchaseTimestamp) < now.getTime() / 1000) {
      setHasBoughtpuzzleMadness(false);
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        puzzleMadness: false,
      }));
      return;
    }
    setHasBoughtpuzzleMadness(true);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      puzzleMadness: true,
    }));
    setpuzzleMadnessCountdown(Number(purchaseTimestamp) * 1000); // Multiply by 1000 to convert to milliseconds
    setPuzzleMadnessTimer(Number(purchaseTimestamp) * 1000);
  };

  const checkApprovalPuzzle = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, puzzleMadnessAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setpuzzleMadnessShowApproval(true);
            } else {
              setpuzzleMadnessShowApproval(false);
              setpuzzleMadnessBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
        await wod_token_abi.methods
          .allowance(wallet, puzzleMadnessAddress)
          .call()
          .then((data) => {
            if (data === "0" || data < 150000000000000000000) {
              setpuzzleMadnessShowApproval(true);
            } else {
              setpuzzleMadnessShowApproval(false);
              setpuzzleMadnessBundleState("deposit");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const handleApprovalPuzzle = async () => {
    setpuzzleMadnessBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(puzzleMadnessAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setpuzzleMadnessBundleState("deposit");
          setStatusColor("#00FECF");
          setpuzzleMadnessShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setpuzzleMadnessBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setpuzzleMadnessBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(puzzleMadnessAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setpuzzleMadnessBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setpuzzleMadnessBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setpuzzleMadnessBundleState("deposit");
        setStatusColor("#00FECF");
        setpuzzleMadnessShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [puzzleMadnessAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setpuzzleMadnessBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setpuzzleMadnessBundleState("initial");
            }, 3000);
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
            setpuzzleMadnessBundleState("deposit");
            setStatusColor("#00FECF");
            setpuzzleMadnessShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositPuzzle = async () => {
    setpuzzleMadnessDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const puzzleContract = new web3.eth.Contract(
        PUZZLE_MADNESS_ABI,
        puzzleMadnessAddress
      );
      await puzzleContract.methods
        .deposit()
        .send({ from: coinbase })
        .then(() => {
          setStatus("Bundle successfully purchased!");
          setpuzzleMadnessDepositState("success");
          setStatusColor("#00FECF");

          handleRefreshCountdownPuzzle();
          checkApprovalPuzzle();
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setpuzzleMadnessDepositState("failDeposit");
          console.log(e);

          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setpuzzleMadnessDepositState("initial");
          }, 3000);
        });
      handleRefreshCountdownPuzzle();
    } else if (window.WALLET_TYPE === "binance") {
      const dragonsc = new ethers.Contract(
        puzzleMadnessAddress,
        PUZZLE_MADNESS_ABI,
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
          setpuzzleMadnessDepositState("failDeposit");
          console.log(e);
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setpuzzleMadnessDepositState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Bundle successfully purchased!");
        setpuzzleMadnessDepositState("success");
        setStatusColor("#00FECF");

        handleRefreshCountdownPuzzle();
        checkApprovalPuzzle();
      }

      handleRefreshCountdownPuzzle();
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: puzzleMadnessAddress,
            abi: PUZZLE_MADNESS_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setpuzzleMadnessDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setpuzzleMadnessDepositState("initial");
            }, 3000);
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
            setpuzzleMadnessDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownPuzzle();
            checkApprovalPuzzle();
          }
        }
        handleRefreshCountdownPuzzle();
      }
    }
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtDragon(false);
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        dragon: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const utcDayIndex = new Date().getUTCDay();

    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtDragon(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      dragon: isToday,
    }));
  };

  const checkApprovalDragon = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, dragonRuinsAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setDragonShowApproval(true);
            } else {
              setDragonShowApproval(false);
              setDragonBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
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
    }
  };

  const handleApprovalDragon = async () => {
    setDragonBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(dragonRuinsAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setDragonBundleState("deposit");
          setStatusColor("#00FECF");
          setDragonShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDragonBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDragonBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(dragonRuinsAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setDragonBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDragonBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setDragonBundleState("deposit");
        setStatusColor("#00FECF");
        setDragonShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [dragonRuinsAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setDragonBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setDragonBundleState("initial");
            }, 3000);
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
            setDragonBundleState("deposit");
            setStatusColor("#00FECF");
            setDragonShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositDragon = async () => {
    setDragonDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const dragonRuinsContract = new web3.eth.Contract(
        DRAGON_RUINS_ABI,
        dragon_ruins_address
      );
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDragonDepositState("initial");
          }, 3000);
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setDragonDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: dragon_ruins_address,
            abi: DRAGON_RUINS_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setDragonDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setDragonDepositState("initial");
            }, 3000);
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
            setDragonDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownDragon();
            checkApprovalDragon();
          }
        }
        handleRefreshCountdownDragon();
      }
    }
  };

  //COLD BITE

  const getBundlePrizesBear = async () => {
    const coldBiteContract = new window.bscWeb3.eth.Contract(
      COLD_BITE_ABI,
      cold_bite_address
    );

    const result_cold_bite = await coldBiteContract.methods
      .getEstimatedBundleWODAmount()
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtBear(false); // User hasn't bought it
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        bear: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const utcDayIndex = new Date().getUTCDay();

    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtBear(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      bear: isToday,
    }));
  };

  const checkApprovalBear = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, coldBiteAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setBearShowApproval(true);
            } else {
              setBearShowApproval(false);
              setBearBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
        await wod_token_abi.methods
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
    }
  };

  const handleApprovalBear = async () => {
    setBearBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(coldBiteAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setBearBundleState("deposit");
          setStatusColor("#00FECF");
          setBearShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBearBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBearBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(coldBiteAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBearBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBearBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setBearBundleState("deposit");
        setStatusColor("#00FECF");
        setBearShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [coldBiteAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setBearBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setBearBundleState("initial");
            }, 3000);
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
            setBearBundleState("deposit");
            setStatusColor("#00FECF");
            setBearShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositBear = async () => {
    setBearDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const coldBiteContract = new web3.eth.Contract(
        COLD_BITE_ABI,
        cold_bite_address
      );
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBearDepositState("initial");
          }, 3000);
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBearDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: cold_bite_address,
            abi: COLD_BITE_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setBearDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setBearDepositState("initial");
            }, 3000);
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
            setBearDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownBear();
            checkApprovalBear();
          }
        }
        handleRefreshCountdownBear();
      }
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtBeast(false); // User hasn't bought it
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        beast: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();
    const utcDayIndex = new Date().getUTCDay();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();
    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtBeast(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      beast: isToday,
    }));
  };

  const checkApprovalBeast = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, furyBeastAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setBeastShowApproval(true);
              setBeastBundleState("initial");
            } else {
              setBeastShowApproval(false);
              setBeastBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
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
    }
  };

  const handleApprovalBeast = async () => {
    setBeastBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(furyBeastAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setBeastBundleState("deposit");
          setStatusColor("#00FECF");
          setBeastShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBeastBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBeastBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(furyBeastAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setBeastBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBeastBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setBeastBundleState("deposit");
        setStatusColor("#00FECF");
        setBeastShowApproval(false);
        setTimeout(() => {
          setStatusColor("#00FECF");
          setStatus("");
          setBeastBundleState("initial");
        }, 3000);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [furyBeastAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setBeastBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setBeastBundleState("initial");
            }, 3000);
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
            setBeastBundleState("deposit");
            setStatusColor("#00FECF");
            setBeastShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositBeast = async () => {
    setBeastDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const furyBeastContract = new web3.eth.Contract(
        FURY_BEAST_ABI,
        fury_beast_address
      );
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBeastDepositState("initial");
          }, 3000);
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setBeastDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: fury_beast_address,
            abi: FURY_BEAST_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setBeastDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setBeastDepositState("initial");
            }, 3000);
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
            setBeastDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownBeast();
            checkApprovalBeast();
          }
        }
        handleRefreshCountdownBeast();
      }
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtEagle(false); // User hasn't bought it
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        eagle: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const utcDayIndex = new Date().getUTCDay();

    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();

    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtEagle(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      eagle: isToday,
    }));
  };

  const checkApprovalEagle = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, wingStormAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setEagleShowApproval(true);
            } else {
              setEagleShowApproval(false);
              setEagleBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
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
    }
  };

  const handleApprovalEagle = async () => {
    setEagleBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(wingStormAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setEagleBundleState("deposit");
          setStatusColor("#00FECF");
          setEagleShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setEagleBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setEagleBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(wingStormAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setEagleBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setEagleBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setEagleBundleState("deposit");
        setStatusColor("#00FECF");
        setEagleShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [wingStormAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setEagleBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setEagleBundleState("initial");
            }, 3000);
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
            setEagleBundleState("deposit");
            setStatusColor("#00FECF");
            setEagleShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositEagle = async () => {
    setEagleDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const wingStormContract = new web3.eth.Contract(
        WING_STORM_ABI,
        wing_storm_address
      );
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setEagleDepositState("initial");
          }, 3000);
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setEagleDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: wing_storm_address,
            abi: WING_STORM_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setEagleDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setEagleDepositState("initial");
            }, 3000);
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
            setEagleDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownEagle();
            checkApprovalEagle();
          }
        }
        handleRefreshCountdownEagle();
      }
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtScorpion(false); // User hasn't bought it
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        scorpion: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const utcDayIndex = new Date().getUTCDay();

    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day

    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtScorpion(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      scorpion: isToday,
    }));
  };

  const checkApprovalScorpion = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, scorpionKingAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setScorpionShowApproval(true);
            } else {
              setScorpionShowApproval(false);
              setScorpionBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
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
    }
  };

  const handleApprovalScorpion = async () => {
    setScorpionBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(scorpionKingAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setScorpionBundleState("deposit");
          setStatusColor("#00FECF");
          setScorpionShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setScorpionBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setScorpionBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(scorpionKingAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setScorpionBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setScorpionBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setScorpionBundleState("deposit");
        setStatusColor("#00FECF");
        setScorpionShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [scorpionKingAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setScorpionBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setScorpionBundleState("initial");
            }, 3000);
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
            setScorpionBundleState("deposit");
            setStatusColor("#00FECF");
            setScorpionShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositScorpion = async () => {
    setScorpionDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const scorpionKingContract = new web3.eth.Contract(
        SCORPION_KING_ABI,
        scorpion_king_address
      );

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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setScorpionDepositState("initial");
          }, 3000);
        });
      handleRefreshCountdownScorpion();
    } else if (window.WALLET_TYPE === "binance") {
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setScorpionDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: scorpion_king_address,
            abi: SCORPION_KING_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setScorpionDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setScorpionDepositState("initial");
            }, 3000);
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
            setScorpionDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownScorpion();
            checkApprovalScorpion();
          }
        }
        handleRefreshCountdownScorpion();
      }
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
    if (Number(purchaseTimestamp) === 0) {
      setHasBoughtCyclops(false); // User hasn't bought it
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        cyclops: false,
      }));
      return;
    }
    const purchaseDate = new Date(purchaseTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const currentUTCDate = new Date();

    // Get the UTC components
    const purchaseYear = purchaseDate.getUTCFullYear();
    const purchaseMonth = purchaseDate.getUTCMonth();
    const purchaseDay = purchaseDate.getUTCDate();
    const utcDayIndex = new Date().getUTCDay();

    const adjustedPurchaseDay =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedPurchaseDate =
      purchaseDate.getUTCHours() === 0 && purchaseDate.getUTCMinutes() >= 30
        ? purchaseDate.getUTCDate()
        : utcHours === 0
        ? purchaseDate.getUTCDate() - 1
        : purchaseDate.getUTCDate();

    const currentYear = currentUTCDate.getUTCFullYear();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentDay = currentUTCDate.getUTCDate();

    const adjustedCurrentDay =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? utcDayIndex === 0
          ? 7
          : utcDayIndex
        : utcHours === 0
        ? utcDayIndex === 0
          ? 6
          : utcDayIndex - 1
        : utcDayIndex === 0
        ? 7
        : utcDayIndex;

    const adjustedCurrentDate =
      currentUTCDate.getUTCHours() === 0 && currentUTCDate.getUTCMinutes() >= 30
        ? currentUTCDate.getUTCDate()
        : utcHours === 0
        ? currentUTCDate.getUTCDate() - 1
        : currentUTCDate.getUTCDate();

    // Check if the purchase was made on the same UTC day
    const isToday =
      purchaseYear === currentYear &&
      purchaseMonth === currentMonth &&
      adjustedPurchaseDay === adjustedCurrentDay &&
      adjustedPurchaseDate === adjustedCurrentDate;
    setHasBoughtCyclops(isToday);
    setBeastSiegeStatus((prevStatus) => ({
      ...prevStatus,
      cyclops: isToday,
    }));
  };

  const checkApprovalCyclops = async () => {
    if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId === 56) {
      if (window.WALLET_TYPE === "matchId") {
        await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: window.config.wod_token_address,
            functionName: "allowance",
            args: [wallet, stoneEyeAddress],
          })
          .then((data) => {
            if (Number(data) === 0 || Number(data) < 150000000000000000000) {
              setCyclopsShowApproval(true);
            } else {
              setCyclopsShowApproval(false);
              setCyclopsBundleState("deposit");
            }
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } else {
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
    }
  };

  const handleApprovalCyclops = async () => {
    setCyclopsBundleState("loading");
    setStatus("Approving, please wait");
    setStatusColor("#00FECF");
    // const approveAmount = await wod_abi.methods.MIN_DEPOSIT().call();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      await wod_token_abi.methods
        .approve(stoneEyeAddress, "500000000000000000000000000")
        .send({ from: coinbase })
        .then(() => {
          setStatus("Succesfully approved!");
          setCyclopsBundleState("deposit");
          setStatusColor("#00FECF");
          setCyclopsShowApproval(false);
        })
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setCyclopsBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setCyclopsBundleState("initial");
          }, 3000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const tokenSc = new ethers.Contract(
        window.config.wod_token_address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await tokenSc
        .approve(stoneEyeAddress, "500000000000000000000000000")
        .catch((e) => {
          setStatusColor("#FE7A00");
          setStatus(e?.message);
          setCyclopsBundleState("fail");
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setCyclopsBundleState("initial");
          }, 3000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("Succesfully approved!");
        setCyclopsBundleState("deposit");
        setStatusColor("#00FECF");
        setCyclopsShowApproval(false);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new window.BigNumber(500000000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.wod_token_address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [stoneEyeAddress, amount],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setCyclopsBundleState("fail");
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setCyclopsBundleState("initial");
            }, 3000);
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
            setCyclopsBundleState("deposit");
            setStatusColor("#00FECF");
            setCyclopsShowApproval(false);
          }
        }
      }
    }
  };

  const handleDepositCyclops = async () => {
    setCyclopsDepositState("loading-deposit");
    setStatus("Confirm to complete purchase");
    setStatusColor("#00FECF");
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let web3 = new Web3(window.ethereum);
      const stoneEyeContract = new web3.eth.Contract(
        STONE_EYE_ABI,
        stone_eye_address
      );

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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setCyclopsDepositState("initial");
          }, 3000);
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
          setTimeout(() => {
            setStatusColor("#00FECF");
            setStatus("");
            setCyclopsDepositState("initial");
          }, 3000);
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
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: stone_eye_address,
            abi: STONE_EYE_ABI,
            functionName: "deposit",
            args: [],
          })
          .catch((e) => {
            setStatusColor("#FE7A00");
            setStatus(e?.shortMessage);
            setCyclopsDepositState("failDeposit");
            console.log(e);
            setTimeout(() => {
              setStatusColor("#00FECF");
              setStatus("");
              setCyclopsDepositState("initial");
            }, 3000);
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
            setCyclopsDepositState("success");
            setStatusColor("#00FECF");

            handleRefreshCountdownCyclops();
            checkApprovalCyclops();
          }
        }
        handleRefreshCountdownCyclops();
      }
    }
  };

  const checkWalletAddr = () => {
    if (coinbase !== undefined && wallet !== undefined) {
      if (coinbase?.toLowerCase() === wallet?.toLowerCase() && chainId !== 56) {
        setCheckWallet(false);
        setStatus(
          "Please make sure you're on BNB Chain in order to activate the event."
        );
      } else if (
        coinbase?.toLowerCase() !== wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setCheckWallet(false);
        setStatus(
          "Please make sure you're using the wallet address associated to your game profile."
        );
      } else if (
        coinbase?.toLowerCase() === wallet?.toLowerCase() &&
        chainId === 56
      ) {
        setCheckWallet(true);
        setStatus("");
      }
    } else if (wallet) {
      setCheckWallet(true);
      setStatus("Please connect your wallet in order to activate the event");
    } else setCheckWallet(false);
  };

  useEffect(() => {
    getBundlePrizesDragon();
    getBundlePrizesPuzzle();

    getBundlePrizesBear();
    getBundlePrizesBeast();
    getBundlePrizesEagle();
    getBundlePrizesScorpion();
    getBundlePrizesCyclops();
  }, []);

  useEffect(() => {
    checkWalletAddr();
    if (email && wallet && coinbase && chainId === 56) {
      handleRefreshCountdownDragon();
      checkApprovalDragon();
      handleRefreshCountdownPuzzle();
      checkApprovalPuzzle();
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
      setHasBoughtpuzzleMadness(false);

      setHasBoughtEagle(false);
      setHasBoughtScorpion(false);
      setBeastSiegeStatus((prevStatus) => ({
        ...prevStatus,
        dragon: false,
        bear: false,
        beast: false,
        eagle: false,
        scorpion: false,
        cyclops: false,
        puzzleMadness: false,
      }));
      setDragonShowApproval(false);
      setDragonBundleState("initial");

      setpuzzleMadnessShowApproval(false);
      setpuzzleMadnessBundleState("initial");

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
  }, [wallet, coinbase, chainId, email]);

  const eventinfos = [
    {
      id: "dragon",
      challange: "dragon-ruins",
      title: "Dragon Ruins",
      popupImage: "https://cdn.worldofdypians.com/wod/dragonRuinsPopup.webp",
      image:
        "https://cdn.worldofdypians.com/wod/dragonRuinsBannerNewEvents.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/dragonRuinsThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/dragonRuinsActiveThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/dragonRuinsThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/dragonRuinsActiveThumbMobileNewEvents.webp",
      textImage: "https://cdn.worldofdypians.com/wod/dragonRuinsText.png",
      headImage: "https://cdn.worldofdypians.com/wod/dragonRuinsHead.png",
      wodAmount: dragonRuinsWodAmount,
      class: "dragon-siege",
      usdPrice: 2.0,
      desc: "Enter the fiery depths of the Dragon Ruins, where a ferocious dragon guards its treasure. Explore the ruins, overcome challenges, and claim the hidden rewards.",
      day: 1,
      dayText: "MON",
      dayTextLong: "Monday",
      popupDesc:
        "The Dragon Ruins challenge invites players to summon and battle a fearsome dragon for exclusive rewards. This high-stakes event offers a chance to test your combat skills and teamwork. The dragon can only be summoned on Mondays and must be defeated before the end of the day at 00:30 UTC. Players can only purchase access once per day, giving you a single opportunity to emerge victorious.",
      workList: [
        "The event is available exclusively on Mondays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 16,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 200 stars added to the Global Leaderboards.",
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
      image: "https://cdn.worldofdypians.com/wod/coldBiteBannerNewEvents.webp",
      popupImage: "https://cdn.worldofdypians.com/wod/coldBitePopup.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/coldBiteThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/coldBiteActiveThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/coldBiteThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/coldBiteActiveThumbMobileNewEvents.webp",
      textImage: "https://cdn.worldofdypians.com/wod/coldBiteText.png",
      headImage: "https://cdn.worldofdypians.com/wod/coldBiteHead.png",
      wodAmount: coldBiteWodAmount,
      usdPrice: 2.5,
      class: "bear-siege",

      desc: "Journey into the icy wilderness, where a fearsome polar bear awaits. Test your survival skills in this frozen adventure and uncover treasures hidden in the snow.",
      day: 2,
      dayText: "TUE",
      dayTextLong: "Tuesday",
      title: "Cold Bite",
      popupDesc:
        "Cold Bite pits players against the ferocious Polar Bear, a frost-bound menace that rewards resilience and strategy. This chilling event is available on Tuesdays and runs until 00:30 UTC. Players can only buy access once per day, so make every move count as you battle this frosty foe.",

      workList: [
        "The event is available exclusively on Tuesdays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 30,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 300 stars added to the Global Leaderboards.",
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
      image: "https://cdn.worldofdypians.com/wod/furyBeastBannerNewEvents.webp",
      popupImage: "https://cdn.worldofdypians.com/wod/furyBeastPopup.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/furyBeastThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/furyBeastActiveThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/furyBeastThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/furyBeastActiveThumbMobileNewEvents.webp",
      textImage: "https://cdn.worldofdypians.com/wod/furyBeastText.png",
      headImage: "https://cdn.worldofdypians.com/wod/furyBeastHead.png",
      wodAmount: furyBeastWodAmount,
      class: "beast-siege",

      usdPrice: 2.5,
      desc: "Navigate through the dense jungle and face the wrath of a wild beast. Discover hidden paths, overcome obstacles, and seize the rewards within this thrilling jungle adventure.",
      day: 3,
      dayText: "WED",
      dayTextLong: "Wednesday",

      title: "Fury Beast",
      popupDesc:
        "Fury Beast throws you into a battle against the Gorilla, a relentless opponent that tests your endurance and tactical skills. Available only on Wednesdays, the event runs until 00:30 UTC. Access can be purchased once per day, so strategic preparation is key to claiming victory and rewards.",

      workList: [
        "The event is available exclusively on Wednesdays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 60,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 400 stars added to the Global Leaderboards.",
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
      image: "https://cdn.worldofdypians.com/wod/wingStormBannerNewEvents.webp",
      popupImage: "https://cdn.worldofdypians.com/wod/wingStormPopup.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/wingStormThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/wingStormActiveThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/wingStormThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/wingStormActiveThumbMobileNewEvents.webp",
      wodAmount: wingStormWodAmount,
      textImage: "https://cdn.worldofdypians.com/wod/wingStormText.png",
      headImage: "https://cdn.worldofdypians.com/wod/wingStormHead.png",
      class: "eagle-siege",

      usdPrice: 3.0,
      desc: "Soar into the skies and explore intricate pathways guarded by majestic eagle. Use your wits to uncover treasures hidden in this breathtaking aerial journey.",
      day: 4,
      dayText: "THU",
      dayTextLong: "Thursday",

      title: "Wing Storm",
      popupDesc:
        "Take to the skies in Wing Storm, an exhilarating battle against a swift and deadly Eagle. Available exclusively on Thursdays, this event tests your precision and speed as you fight a high-flying adversary. Access can be purchased once per day, with the event running until 00:30 UTC.",

      workList: [
        "The event is available exclusively on Thursdays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 70,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 500 stars added to the Global Leaderboards.",
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
      popupImage: "https://cdn.worldofdypians.com/wod/scorpionKingPopup.webp",
      image:
        "https://cdn.worldofdypians.com/wod/scorpionKingBannerNewEvents.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/scorpionKingNewThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/scorpionKingActiveNewThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/scorpionKingThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/scorpionKingActiveThumbMobileNewEvents.webp",
      wodAmount: scorpionKingWodAmount,
      textImage: "https://cdn.worldofdypians.com/wod/scorpionKingText.png",
      headImage: "https://cdn.worldofdypians.com/wod/scorpionKingHead.png",
      class: "scorpion-siege",

      usdPrice: 3.5,
      desc: "Cross the scorching desert to challenge the Scorpion King. Brave the heat, avoid traps, and unlock the secrets of the sands to claim the riches waiting for you.",
      day: 6,
      dayText: "SAT",
      dayTextLong: "Saturday",
      title: "Scorpion King",
      popupDesc:
        "Face off against the venomous Scorpion King in this thrilling event. Available only on Saturdays, this battle tests your resistance to poison and your ability to exploit the Scorpion King’s weaknesses. Access can be purchased once per day, with the event running until 00:30 UTC.",

      workList: [
        "The event is available exclusively on Saturdays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 120,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 1000 stars added to the Global Leaderboards.",
      ],
      tips: [
        "Recommended Hero Level: 40 and above",
        "Craft plenty of health potions and target the tail to disable its poison strikes and reduce the threat.",
        "Equip high-damage weapons to end the fight quickly before the poison kills you.",
      ],
      link: "/account/challenges/scorpion-king",
    },
    {
      challange: "stone-eye",
      id: "stoneEye",
      image: "https://cdn.worldofdypians.com/wod/stoneEyeBannerNewEvents.webp",
      popupImage: "https://cdn.worldofdypians.com/wod/stoneEyePopup.webp",
      thumbImage:
        "https://cdn.worldofdypians.com/wod/stoneEyeThumbNewEvents.webp",
      thumbImageActive:
        "https://cdn.worldofdypians.com/wod/stoneEyeActiveThumbNewEvents.webp",
      mobileThumbImage:
        "https://cdn.worldofdypians.com/wod/stoneEyeThumbMobileNewEvents.webp",
      mobileThumbImageActive:
        "https://cdn.worldofdypians.com/wod/stoneEyeActiveThumbMobileNewEvents.webp",
      wodAmount: stoneEyeWodAmount,
      textImage: "https://cdn.worldofdypians.com/wod/stoneEyeText.png",
      headImage: "https://cdn.worldofdypians.com/wod/stoneEyeHead.png",
      class: "cyclops-siege",

      usdPrice: 3.0,
      desc: "Engage in an epic battle against the mighty Cyclops. Outsmart this towering foe to secure victory and claim valuable rewards hidden within its lair.",
      day: 7,
      dayText: "SUN",
      dayTextLong: "Sunday",
      title: "Stone Eye",
      popupDesc:
        "Stone Eye challenges players to battle the Cyclops, a colossal enemy with devastating attacks. This event is available exclusively on Sundays and ends at 00:30 UTC. Only one access purchase is allowed per day, so prepare carefully for this epic showdown.",
      workList: [
        "The event is available exclusively on Sundays and needs to be activated.",
        "You must defeat the bosses within the day, with the timer resetting at 00:30 UTC.",
        "To access the event, go to the Teleport Station and find the right portal.",
        "Rewards: 80,000 points added to the BNB Chain leaderboard.",
        "Rewards: Up to 600 stars added to the Global Leaderboards.",
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
    popupImage: "https://cdn.worldofdypians.com/wod/mazeGardenPopup.webp",
    image: "https://cdn.worldofdypians.com/wod/mazeGardenBannerNewEvents.webp",
    desc: "Navigate through the intricate Maze Garden. Solve its mysteries and uncover hidden paths to reach the treasures waiting within.",
    day: 5,
    dayText: "FRI",
    title: "BNB CHAIN Maze Day",
    topBanner:
      "https://cdn.worldofdypians.com/wod/bnbMazeDayTopBannerNewEvents.webp",
    class: "maze-garden-card",
    infoClass: "maze-garden-info",
    popupDesc:
      "Explore the enigmatic BNB Chain Maze, a labyrinth filled with twists and turns leading to the hidden gem at the center. This event is only accessible to WOD token holders and runs exclusively on Fridays. Navigate the maze carefully and claim your prize before 00:30 UTC.",
    workList: [
      "The event runs exclusively on Fridays and requires holding at least 400 WOD to participate.",
      "To access the event, go to the Teleport Station and find the right portal or go directly to the BNB Chain area.",
      "Players must find their way to the maze’s center and destroy the gem to earn rewards.",
      "Rewards include up to 200,000 points, 800 stars, and $100.",
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
    image:
      "https://cdn.worldofdypians.com/wod/greatCollectionBannerNewEvents.webp",
    popupImage: "https://cdn.worldofdypians.com/wod/greatCollectionPopup.webp",
    topBanner:
      "https://cdn.worldofdypians.com/wod/greatCollectionTopBannerNewEvents.webp",
    class: "great-collection-card",
    infoClass: "great-collection-info",
    desc: "Defend your world by taking on invading explorers who are here to gather information. Fight to protect the secrets of the land and earn rewards.",
    title: "The Great Collection",
    popupDesc:
      "The Great Collection is a thrilling event where players are tasked with gathering rare and unique partner branded coins scattered across the game. This event challenges your exploration and problem-solving skills as you work to collect as many coins as possible. Compete against other players to amass the largest collection and earn exclusive rewards based on your ranking.",
    workList: [
      "The challenge is free to access by everyone.",
      "Rare collectible items are hidden across the map, in both common and hard-to-reach locations.",
      "Players must collect partner branded items.",
      "The collected amount contributes to unlocking more rewards in the future.",
    ],
    tips: [
      "Explore the Island Zero and Dypians City maps to maximize  item findings.",
      "Use mounts or movement speed boosts to traverse large zones quickly.",
    ],
    link: "/account/challenges/great-collection",
  };

  const explorerHuntInfo = {
    id: "explorer-hunt",
    image:
      "https://cdn.worldofdypians.com/wod/explorerHuntBannerNewEvents.webp",
    popupImage: "https://cdn.worldofdypians.com/wod/explorerHuntPopup.webp",
    topBanner:
      "https://cdn.worldofdypians.com/wod/explorerHuntTopBannerNewEvents.webp",
    class: "explorer-hunt-card",
    infoClass: "explorer-hunt-info",

    desc: "Explore the vast world and partner areas to find hidden items. Discover valuable treasures while delving into unique zones.",
    title: "Explorer Hunt",
    popupDesc:
      "Defend the world from the alien explorers who have landed to assess the terrain before their invasion. Players will hear an alert signaling the arrival of these intruders in a specific area, and your task is to defend the city by defeating them. The event features three levels of explorers, each more powerful and challenging than the last. Be prepared to strategize and face increasingly formidable opponents as you protect your homeland.",
    workList: [
      "The challenge is free to access by everyone.",
      "Alerts will notify players of the arrival of explorers in a designated area.",
      "Alerts can happen multiple times a day, and you have 10 minutes to defeat the explorers.",
      "Defeating the explorers gives you points within different ranges, which will be added to the BNB Chain leaderboard.",
    ],
    tips: [
      "Recommended Hero Level: 20 and above",
      "Upgrade your weapons and armor to handle the increasing difficulty of higher-level explorers.",
      "You must fight them at close range, as they have an invisible shield protecting them from long-range attacks.",
    ],
    link: "/account/challenges/explorer-hunt",
  };

  const criticalHitInfos = {
    id: "critical",
    image: "https://cdn.worldofdypians.com/wod/criticalHitBannerNewEvents.webp",
    popupImage: "https://cdn.worldofdypians.com/wod/criticalHitPopup.webp",
    topBanner:
      "https://cdn.worldofdypians.com/wod/criticalHitTopBannerNewEvents.webp",
    class: "critical-hit-card",
    infoClass: "critical-hit-info",

    desc: "Break the Genesis Gem located on your land to unleash unique benefits and claim powerful rewards. A perfect chance to boost your progress.",
    title: "Critical Hit",
    link: "/account/challenges/critical-hit",
    popupDesc:
      "As a Genesis Land NFT holder, you can participate in the daily Critical Hit event to earn points and rewards. Each day, you need to log in to the game and visit your land. On your land, you have a Genesis Gem, which you need to break with a pickaxe. Once broken, it gives you either points that are added to your leaderboard rank on BNB Chain or direct rewards in WOD.",
    secondaryTitle: "What is Genesis Land?",
    thirdDesc:
      "Genesis Land is a 125x125 area in World of Dypians, available to those who own a Genesis Land NFT. Benefits include exclusive rewards, Land NFT staking pool, and special in-game events like Critical Hit.",
    workList: [
      "Hold Genesis Land NFT to access the event.",
      "Earn 30,000-80,000 points added to the BNB Chain leaderboard.",
      "Receive rewards ranging from $20 to $7,000 ",
      "Rewards are distributed monthly, and you can destroy the Gem once every 24 hours (00:30 UTC).",
    ],
    tips: [
      "Recommended Hero Level: Any",
      "Use your pickaxe to break the Genesis Gem efficiently.",
      "Check your Genesis Land daily to ensure you don't miss a gem reset.",
    ],
  };

  const puzzleMadnessInfo = {
    id: "puzzle",
    popupImage: "https://cdn.worldofdypians.com/wod/puzzleMadnessPopup.webp",
    image:
      "https://cdn.worldofdypians.com/wod/puzzleMadnessBannerNewEvents.webp",
    usdPrice: 4.0,
    topBanner:
      "https://cdn.worldofdypians.com/wod/puzzleMadnessTopBannerNewEvents.webp",
    class: "puzzle-madness-card",
    infoClass: "puzzle-madness-info",

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
      "The event is available at any time and needs to be activated.",
      "The challenge duration is 2 hours and can be extended.",
      "You can complete the challenge multiple times within the time limit.",
      "Find 10 pieces in the Island Zero and Dypians City maps.",
      "Rewards: Up to 160,000 points added to the BNB Chain leaderboard.",
    ],
  };

  useEffect(() => {
    const today = new Date();
    const monday = getMonday(today);
    const week = generateWeekDates(monday);
    setCurrentWeek(week);
    setActiveEvent(
      eventinfos.find((item) => {
        return item.day === adjustedDay;
      }) ?? eventinfos[0]
    );
    setActiveThumb(
      eventinfos.find((item) => {
        return item.day === adjustedDay;
      }) !== undefined
        ? eventinfos.find((item) => {
            return item.day === adjustedDay;
          }).id
        : eventinfos[0].id
    );
    setChallenge(
      eventinfos.find((item) => {
        return item.day === adjustedDay;
      }) !== undefined
        ? eventinfos.find((item) => {
            return item.day === adjustedDay;
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
    if (eventId === undefined || eventId === "golden-pass") {
      if (adjustedDay === 5 && eventId === undefined) {
        setActiveEvent(mazeGardenInfo);
        setChallenge("maze-day");
      } else {
        const filteredEvent =
          eventinfos.find((item) => {
            return item.day === adjustedDay;
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
      }
    } else if (
      eventId &&
      eventId !== "" &&
      eventId !== "treasure-hunt" &&
      eventId !== "maze-day" &&
      eventId !== "great-collection" &&
      eventId !== "explorer-hunt" &&
      eventId !== "critical-hit" &&
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
    }
    //  else if (eventId !== "" && eventId === "golden-pass") {
    //   setActiveEvent(goldenPassInfo);
    // }
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
        className="custom-container mt-3"
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
                  <div className="col-12 col-lg-3 col-xxl-2">
                    <div className="challenges-list-wrapper py-3 px-1 px-lg-0 d-flex flex-column gap-2">
                      {adjustedDay === 5 && (
                        <div className="d-flex flex-column">
                          <NavLink to="/account/challenges/maze-day">
                            <div
                              className={`${
                                challenge === "maze-day" ||
                                selectedEvent === "maze-day"
                                  ? "active-challenge-item"
                                  : "challenge-item"
                              } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                              onClick={() => {
                                setChallenge("maze-day");
                                setActiveEvent(mazeGardenInfo);
                              }}
                            >
                              <h6 className="mb-0">BNB Chain Maze Day</h6>
                            </div>
                          </NavLink>
                          <div className="sidebar-separator2"></div>
                        </div>
                      )}
                      <div className="d-flex flex-column">
                        <NavLink
                          to={
                            eventinfos.find((item) => {
                              return item.day === adjustedDay;
                            }) !== undefined
                              ? eventinfos.find((item) => {
                                  return item.day === adjustedDay;
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
                              ((challenge !== "maze-day" &&
                                eventId !== undefined) ||
                                (eventId === undefined && adjustedDay !== 5)) &&
                              eventId !== "puzzle-madness"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge(
                                eventinfos.find((item) => {
                                  return item.day === adjustedDay;
                                }) !== undefined
                                  ? eventinfos.find((item) => {
                                      return item.day === adjustedDay;
                                    }).challange
                                  : eventinfos[0].challange
                              );
                              setActiveEvent(
                                eventinfos.find((item) => {
                                  return item.day === adjustedDay;
                                }) ?? eventinfos[0]
                              );
                            }}
                          >
                            <h6 className="mb-0">Legendary Beast Siege</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>
                      {adjustedDay !== 5 && (
                        <div className="d-flex flex-column">
                          <NavLink to="/account/challenges/maze-day">
                            <div
                              className={`${
                                challenge === "maze-day" ||
                                selectedEvent === "maze-day"
                                  ? "active-challenge-item"
                                  : "challenge-item"
                              } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                              onClick={() => {
                                setChallenge("maze-day");
                                setActiveEvent(mazeGardenInfo);
                              }}
                            >
                              <h6 className="mb-0">BNB Chain Maze Day</h6>
                            </div>
                          </NavLink>
                          <div className="sidebar-separator2"></div>
                        </div>
                      )}
                      <div className="d-flex flex-column">
                        <NavLink to="/account/challenges/treasure-hunt">
                          <div
                            className={`${
                              challenge === "treasure-hunt" ||
                              selectedEvent === "treasure-hunt"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge("treasure-hunt");
                            }}
                          >
                            <h6 className="mb-0">Treasure Hunt</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>

                      <div className="d-flex flex-column">
                        <NavLink to="/account/challenges/puzzle-madness">
                          <div
                            className={`${
                              challenge === "puzzle-madness" ||
                              selectedEvent === "puzzle-madness"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge("puzzle-madness");
                              setActiveEvent(puzzleMadnessInfo);
                            }}
                          >
                            <h6 className="mb-0">Puzzle Madness</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>
                      <div className="d-flex flex-column">
                        <NavLink to="/account/challenges/explorer-hunt">
                          <div
                            className={`${
                              challenge === "explorer-hunt" ||
                              selectedEvent === "explorer-hunt"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge("explorer-hunt");
                              setActiveEvent(explorerHuntInfo);
                            }}
                          >
                            <h6 className="mb-0">Explorer Hunt</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>
                      <div className="d-flex flex-column">
                        <NavLink to="/account/challenges/great-collection">
                          <div
                            className={`${
                              challenge === "great-collection" ||
                              selectedEvent === "great-collection"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge("great-collection");
                              setActiveEvent(greatCollectionInfo);
                            }}
                          >
                            <h6 className="mb-0">The Great Collection</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>
                      <div className="d-flex flex-column">
                        <NavLink to="/account/challenges/critical-hit">
                          <div
                            className={`${
                              challenge === "critical-hit" ||
                              selectedEvent === "critical-hit"
                                ? "active-challenge-item"
                                : "challenge-item"
                            } d-flex align-items-center gap-2 py-2 px-1 px-lg-3`}
                            onClick={() => {
                              setChallenge("critical-hit");
                              setActiveEvent(criticalHitInfos);
                            }}
                          >
                            {/* <img src={treasureHuntIcon} alt="" /> */}
                            <h6 className="mb-0">Critical Hit</h6>
                          </div>
                        </NavLink>
                        <div className="sidebar-separator2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-9 col-xxl-10">
                    {(challenge === "treasure-hunt" ||
                      selectedEvent === "treasure-hunt") && (
                      <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row gap-2 gap-lg-0">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <div
                            className={`${
                              eventDuration === "Live"
                                ? "active-challenge-tab"
                                : "challenge-tab"
                            }   px-4 py-2 d-flex align-items-center justify-content-center`}
                            onClick={() => {
                              seteventDuration("Live");
                              setPage(1);
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
                              setPage(1);
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
                              setPage(1);
                            }}
                          >
                            <span>Past</span>
                          </div>
                        </div>
                        {
                          eventDuration === "Live" ||
                          eventDuration === "Expired" && (
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <div
                                className={`${
                                  page === 1
                                    ? "active-challenge-tab"
                                    : "challenge-tab"
                                } px-4 py-2 d-flex align-items-center justify-content-center`}
                                onClick={() => {
                                  setPage(1);
                                }}
                              >
                                <span>1</span>
                              </div>
                              <div
                                className={`${
                                  page === 2
                                    ? "active-challenge-tab"
                                    : "challenge-tab"
                                } px-4 py-2 d-flex align-items-center justify-content-center`}
                                onClick={() => {
                                  setPage(2);
                                }}
                              >
                                <span>2</span>
                              </div>
                              {/* <div
                              className={`${
                                page === 3
                                  ? "active-challenge-tab"
                                  : "challenge-tab"
                              } px-4 py-2 d-flex align-items-center justify-content-center`}
                              onClick={() => {
                                setPage(3);
                              }}
                            >
                              <span>3</span>
                            </div> */}
                            </div>
                          )
                        }
                      </div>
                    )}
                    {challenge === "treasure-hunt" ? (
                      <TreasureHunt
                        events={events}
                        eventDuration={eventDuration}
                        onEventClick={onEventClick}
                        page={page}
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
                          <div className="row gap-3 gap-xxl-0">
                            <div className="col-12 col-xxl-6">
                              <div
                                className={`beast-siege-wrapper gap-4 gap-lg-0 ${
                                  activeEvent.class
                                } ${
                                  adjustedDay === activeEvent.day
                                    ? ""
                                    : "luminosity"
                                } p-3 d-flex flex-column justify-content-between w-100`}
                              >
                                <div className="d-flex flex-column gap-1">
                                  <h6 className="beast-siege-title mb-0">
                                    {activeEvent.title}
                                  </h6>

                                  {adjustedDay === 1 &&
                                  activeEvent.day === 1 ? (
                                    <>
                                      {hasBoughtDragon ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : adjustedDay === 2 &&
                                    activeEvent.day === 2 ? (
                                    <>
                                      {hasBoughtBear ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : adjustedDay === 3 &&
                                    activeEvent.day === 3 ? (
                                    <>
                                      {hasBoughtBeast ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : adjustedDay === 4 &&
                                    activeEvent.day === 4 ? (
                                    <>
                                      {hasBoughtEagle ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : adjustedDay === 6 &&
                                    activeEvent.day === 6 ? (
                                    <>
                                      {hasBoughtScorpion ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : adjustedDay === 7 &&
                                    activeEvent.day === 7 ? (
                                    <>
                                      {hasBoughtCyclops ? (
                                        <span className="beast-siege-sub">
                                          In Progress
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <span className="beast-siege-sub">
                                      Available on {activeEvent.dayTextLong}
                                    </span>
                                  )}
                                </div>
                                {activeEvent.day === 1 ? (
                                  <>
                                    {hasBoughtDragon && adjustedDay === 1 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              dragonRuinsWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : activeEvent.day === 2 ? (
                                  <>
                                    {hasBoughtBear && adjustedDay === 2 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              coldBiteWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : activeEvent.day === 3 ? (
                                  <>
                                    {hasBoughtBeast && adjustedDay === 3 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              furyBeastWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : activeEvent.day === 4 ? (
                                  <>
                                    {hasBoughtEagle && adjustedDay === 4 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              wingStormWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : activeEvent.day === 6 ? (
                                  <>
                                    {hasBoughtScorpion && adjustedDay === 6 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              scorpionKingWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : activeEvent.day === 7 ? (
                                  <>
                                    {hasBoughtCyclops && adjustedDay === 7 ? (
                                      <div
                                        className="d-flex flex-column align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <div className="new-events-circle-2">
                                          <Countdown
                                            renderer={renderer}
                                            date={midnightUTC}
                                          />
                                        </div>
                                        <span className="beast-siege-event-price">
                                          Time Remaining
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex flex-column gap-2">
                                        <div className="d-flex flex-column align-items-start gap-1">
                                          <span className="beast-siege-wod-price">
                                            {getFormattedNumber(
                                              stoneEyeWodAmount
                                            )}{" "}
                                            WOD
                                          </span>
                                          <span className="beast-siege-usd-price">
                                            ($
                                            {getFormattedNumber(
                                              activeEvent.usdPrice
                                            )}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {adjustedDay === 1 && activeEvent.day === 1 ? (
                                  <>
                                    {hasBoughtDragon ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
                                            <button
                                              disabled={
                                                dragonBundleState ===
                                                  "deposit" ||
                                                dragonBundleState ===
                                                  "loading" ||
                                                checkWallet === false
                                                  ? true
                                                  : false
                                              }
                                              className={` ${
                                                dragonBundleState ===
                                                  "deposit" ||
                                                checkWallet === false ||
                                                dragonShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn dragon-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalDragon()
                                              }
                                            >
                                              {dragonBundleState ===
                                              "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light dragon-button"
                                                  role="status"
                                                  style={{ color: "#2b353e" }}
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                dragonDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                dragonShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : dragonShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn dragon-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositDragon()
                                              }
                                            >
                                              {dragonDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light dragon-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 2 &&
                                  activeEvent.day === 2 ? (
                                  <>
                                    {hasBoughtBear ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
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
                                                checkWallet === false ||
                                                bearShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn bear-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalBear()
                                              }
                                            >
                                              {bearBundleState === "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light bear-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                bearDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                bearShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : bearShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn bear-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositBear()
                                              }
                                            >
                                              {bearDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light bear-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 3 &&
                                  activeEvent.day === 3 ? (
                                  <>
                                    {hasBoughtBeast ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
                                            <button
                                              disabled={
                                                beastBundleState ===
                                                  "deposit" ||
                                                beastBundleState ===
                                                  "loading" ||
                                                checkWallet === false
                                                  ? true
                                                  : false
                                              }
                                              className={` ${
                                                beastBundleState ===
                                                  "deposit" ||
                                                checkWallet === false ||
                                                beastShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn beast-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalBeast()
                                              }
                                            >
                                              {beastBundleState ===
                                              "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light beast-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                beastDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                beastShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : beastShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn beast-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositBeast()
                                              }
                                            >
                                              {beastDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light beast-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 4 &&
                                  activeEvent.day === 4 ? (
                                  <>
                                    {hasBoughtEagle ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
                                            <button
                                              disabled={
                                                eagleBundleState ===
                                                  "deposit" ||
                                                eagleBundleState ===
                                                  "loading" ||
                                                checkWallet === false
                                                  ? true
                                                  : false
                                              }
                                              className={` ${
                                                eagleBundleState ===
                                                  "deposit" ||
                                                checkWallet === false ||
                                                eagleShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn eagle-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalEagle()
                                              }
                                            >
                                              {eagleBundleState ===
                                              "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light eagle-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                eagleDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                eagleShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : eagleShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn eagle-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositEagle()
                                              }
                                            >
                                              {eagleDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light eagle-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 6 &&
                                  activeEvent.day === 6 ? (
                                  <>
                                    {hasBoughtScorpion ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
                                            <button
                                              disabled={
                                                scorpionBundleState ===
                                                  "deposit" ||
                                                scorpionBundleState ===
                                                  "loading" ||
                                                checkWallet === false
                                                  ? true
                                                  : false
                                              }
                                              className={` ${
                                                scorpionBundleState ===
                                                  "deposit" ||
                                                checkWallet === false ||
                                                scorpionShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn scorpion-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalScorpion()
                                              }
                                            >
                                              {scorpionBundleState ===
                                              "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light scorpion-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                scorpionDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                scorpionShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : scorpionShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn scorpion-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositScorpion()
                                              }
                                            >
                                              {scorpionDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light scorpion-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : adjustedDay === 7 &&
                                  activeEvent.day === 7 ? (
                                  <>
                                    {hasBoughtCyclops ? (
                                      <div style={{ height: "38px" }}></div>
                                    ) : (
                                      <div className="d-flex align-items-center gap-2">
                                        {!isConnected && (
                                          <button
                                            className="beast-siege-btn"
                                            onClick={onConnectWallet}
                                          >
                                            {" "}
                                            Connect Wallet
                                          </button>
                                        )}
                                        {!email && isConnected && (
                                          <NavLink
                                            className="beast-siege-btn"
                                            to={"/auth"}
                                          >
                                            {" "}
                                            Log In
                                          </NavLink>
                                        )}
                                        {isConnected && email && (
                                          <>
                                            <button
                                              disabled={
                                                cyclopsBundleState ===
                                                  "deposit" ||
                                                cyclopsBundleState ===
                                                  "loading" ||
                                                checkWallet === false
                                                  ? true
                                                  : false
                                              }
                                              className={` ${
                                                cyclopsBundleState ===
                                                  "deposit" ||
                                                checkWallet === false ||
                                                cyclopsShowApproval === false
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : "beast-siege-btn cyclops-button"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleApprovalCyclops()
                                              }
                                            >
                                              {cyclopsBundleState ===
                                              "loading" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light cyclops-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Approve"
                                              )}
                                            </button>
                                            <button
                                              disabled={
                                                checkWallet === true &&
                                                cyclopsDepositState !==
                                                  "loading-deposit"
                                                  ? false
                                                  : true
                                              }
                                              className={` ${
                                                cyclopsShowApproval === true &&
                                                checkWallet === true
                                                  ? "beast-siege-btn-inactive d-none"
                                                  : cyclopsShowApproval ===
                                                      false &&
                                                    checkWallet === true
                                                  ? "beast-siege-btn cyclops-button"
                                                  : "beast-siege-btn-inactive"
                                              }  py-2 px-4`}
                                              onClick={() =>
                                                handleDepositCyclops()
                                              }
                                            >
                                              {cyclopsDepositState ===
                                              "loading-deposit" ? (
                                                <div
                                                  className="spinner-border spinner-border-sm text-light cyclops-button"
                                                  role="status"
                                                >
                                                  <span className="visually-hidden">
                                                    Loading...
                                                  </span>
                                                </div>
                                              ) : (
                                                "Activate"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div style={{ height: "38px" }}></div>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-xxl-6">
                              <div
                                className={`beast-siege-info-wrapper ${activeEvent.class}-info  p-3 w-100`}
                              >
                                <div className="d-flex flex-column gap-3">
                                  <div className="d-flex flex-column gap-2">
                                    <h6
                                      className="mb-0 challenge-popup-secondary-title"
                                      style={{ color: "#FFC808" }}
                                    >
                                      How it works
                                    </h6>
                                    <div
                                      className="d-flex flex-column gap-2"
                                      style={{ zIndex: 1 }}
                                    >
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
                                  <div className="d-flex flex-column gap-2">
                                    <h6
                                      className="mb-0 challenge-popup-secondary-title"
                                      style={{ color: "#FFC808" }}
                                    >
                                      Tips
                                    </h6>
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
                            <div className="col-12 mt-2">
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
                        </div>
                      </div>
                    ) : challenge === "maze-day" ||
                      challenge === "great-collection" ||
                      challenge === "explorer-hunt" ||
                      challenge === "critical-hit" ||
                      //  || challenge === "golden-pass"
                      challenge === "puzzle-madness" ? (
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex flex-column">
                          <div className="position-relative d-flex flex-column align-items-lg-center justify-content-center">
                            {activeEvent.title === "BNB CHAIN Maze Day" && (
                              <div
                                className="d-flex align-item-start gap-2 position-absolute"
                                style={{ top: "10px", right: "10px" }}
                              >
                                <div className="beast-date d-flex flex-column">
                                  <div
                                    className="beast-date-text-holder d-flex align-items-center justify-content-center"
                                    style={{
                                      background:
                                        activeEvent.day === adjustedDay
                                          ? "#e10000"
                                          : "#08656a",
                                    }}
                                  >
                                    {activeEvent.dayText}
                                  </div>
                                  <div className="beast-date-holder d-flex align-items-center justify-content-center">
                                    {currentWeek[
                                      activeEvent.day - 1
                                    ]?.getDate()}
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeEvent.title === "Puzzle Madness" && (
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/tooltip3d.svg"
                                }
                                className="new-event-banner-tooltip"
                                alt=""
                                onClick={() => {
                                  setshowPopup(activeEvent?.id);
                                }}
                              />
                            )}
                            <img
                              src={activeEvent?.topBanner}
                              className="event-top-banner"
                              alt=""
                            />
                            <div className="sidebar-separator2 my-2"></div>
                            <div className="w-100">
                              <div className="row gap-3 gap-xxl-0 mt-2">
                                <div className="col-12 col-xxl-6">
                                  <div
                                    className={`beast-siege-wrapper gap-4 gap-lg-0 ${
                                      activeEvent.class
                                    } ${
                                      activeEvent.title ===
                                        "BNB CHAIN Maze Day" &&
                                      adjustedDay !== 5
                                        ? "luminosity"
                                        : ""
                                    } p-3 d-flex flex-column justify-content-between w-100 position-relative`}
                                  >
                                    {activeEvent.title ===
                                      "BNB CHAIN Maze Day" && (
                                      <div className="maze-day-balance-holder d-flex flex-column align-items-center gap-1 p-2">
                                        <span className="beast-siege-event-price">
                                          My Balance:
                                        </span>
                                        <span className="beast-siege-event-price">
                                          {getFormattedNumber(
                                            wodBalance,
                                            hasNoMoreThanTwoDecimalPlaces(
                                              Number(wodBalance)
                                            )
                                              ? 0
                                              : 2
                                          )}{" "}
                                          WOD
                                        </span>
                                      </div>
                                    )}
                                    <div className="d-flex flex-column gap-1">
                                      <h6 className="beast-siege-title mb-0">
                                        {activeEvent.title}
                                      </h6>
                                      {activeEvent.title ===
                                        "BNB CHAIN Maze Day" &&
                                      adjustedDay !== 5 ? (
                                        <span className="beast-siege-sub">
                                          Available on Friday
                                        </span>
                                      ) : activeEvent.title ===
                                          "BNB CHAIN Maze Day" &&
                                        adjustedDay === 5 ? (
                                        <span className="beast-siege-sub">
                                          Ready
                                        </span>
                                      ) : activeEvent.title ===
                                        "Puzzle Madness" ? (
                                        <span className="beast-siege-sub">
                                          Find the Pieces
                                        </span>
                                      ) : activeEvent.title ===
                                        "Explorer Hunt" ? (
                                        <span className="beast-siege-sub">
                                          Defend the Partners
                                        </span>
                                      ) : activeEvent.title ===
                                        "The Great Collection" ? (
                                        <span className="beast-siege-sub">
                                          Collect
                                        </span>
                                      ) : (
                                        <span className="beast-siege-sub">
                                          Break the Gem
                                        </span>
                                      )}
                                    </div>
                                    {activeEvent.title ===
                                    "BNB CHAIN Maze Day" ? (
                                      <>
                                        <div className="d-flex flex-column gap-1">
                                          <span className="beast-siege-wod-price">
                                            Hold 400 WOD
                                          </span>
                                          <span className="beast-siege-event-price">
                                            Event Requirement
                                          </span>
                                        </div>
                                        {Number(wodBalance) <= 400 ? (
                                          // <div className="position-relative mt-5 mt-lg-0">
                                          <NavLink
                                            to={"/#buy-wod"}
                                            className="beast-siege-btn maze-day-button"
                                          >
                                            Get WOD
                                          </NavLink>
                                        ) : (
                                          // </div>
                                          <div
                                            style={{ height: "38px" }}
                                            className="d-flex align-items-center"
                                          >
                                            <span className="beast-siege-event-price w-50 text-white">
                                              You are elligible for
                                              participation
                                            </span>
                                          </div>
                                        )}
                                      </>
                                    ) : activeEvent.title === "Critical Hit" ? (
                                      <>
                                        <div
                                          className="d-flex flex-column align-items-center gap-1"
                                          style={{ width: "fit-content" }}
                                        >
                                          <div className="brands-yellow-circle d-flex align-items-center justify-content-center">
                                            <span className="beast-siege-wod-price">
                                              $
                                              {getFormattedNumber(
                                                genesisUsd ?? 0,
                                                0
                                              )}
                                            </span>
                                          </div>
                                          <span className="beast-siege-event-price">
                                            Earnings
                                          </span>
                                        </div>
                                        {hasLand ? (
                                          <div className="beast-siege-event-price">
                                            You own a Land NFT
                                          </div>
                                        ) : (
                                          <div className="d-flex align-items-center gap-1">
                                            <NavLink
                                              to={"/game#land"}
                                              className="beast-siege-event-price get-land-link"
                                              style={{
                                                textDecoration: "underline",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Get Land NFT
                                            </NavLink>
                                          </div>
                                        )}
                                      </>
                                    ) : activeEvent.title ===
                                      "The Great Collection" ? (
                                      <>
                                        <div
                                          className="d-flex flex-column align-items-center gap-1"
                                          style={{ width: "fit-content" }}
                                        >
                                          <div className="brands-yellow-circle d-flex align-items-center justify-content-center">
                                            <span className="beast-siege-wod-price">
                                              {getFormattedNumber(
                                                greatCollectionData[0]
                                                  ?.statValue,
                                                0
                                              )}
                                            </span>
                                          </div>
                                          <span className="beast-siege-event-price">
                                            Brands Collected
                                          </span>
                                        </div>
                                        <div style={{ height: "38px" }}></div>
                                      </>
                                    ) : activeEvent.title ===
                                      "Explorer Hunt" ? (
                                      <>
                                        <div
                                          className="d-flex flex-column align-items-center gap-1"
                                          style={{ width: "fit-content" }}
                                        >
                                          <div className="brands-yellow-circle d-flex align-items-center justify-content-center">
                                            <span className="beast-siege-wod-price">
                                              {getFormattedNumber(
                                                explorerHuntData[0]?.statValue,
                                                0
                                              )}
                                            </span>
                                          </div>
                                          <span className="beast-siege-event-price">
                                            Partners Saved
                                          </span>
                                        </div>
                                        <div style={{ height: "38px" }}></div>
                                      </>
                                    ) : activeEvent.title ===
                                      "Puzzle Madness" ? (
                                      <>
                                        {
                                        hasBoughtpuzzleMadness &&
                                        isFinishedPuzzle === false ? (
                                          // <div className="d-flex flex-column gap-1">
                                          //   <span className="event-price-span">
                                          //     Active Until:
                                          //   </span>
                                          //   <Countdown
                                          //     renderer={renderer}
                                          //     date={puzzleMadnessCountdown}
                                          //     onComplete={() => {
                                          //       setisFinishedPuzzle(true);
                                          //     }}
                                          //   />
                                          // </div>
                                          <div
                                            className="d-flex flex-column align-items-center gap-2"
                                            style={{ width: "fit-content" }}
                                          >
                                            <div className="new-events-circle-2">
                                              <Countdown
                                                renderer={renderer}
                                                date={puzzleMadnessCountdown}
                                                onComplete={() => {
                                                  setisFinishedPuzzle(true);
                                                  setBeastSiegeStatus(
                                                    (prevStatus) => ({
                                                      ...prevStatus,
                                                      puzzleMadness: false,
                                                    })
                                                  );
                                                }}
                                              />
                                            </div>
                                            <span className="beast-siege-event-price">
                                              Time Remaining
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="d-flex flex-column gap-1">
                                            <div className="d-flex flex-column align-items-start gap-1">
                                              <span className="beast-siege-wod-price">
                                                {" "}
                                                {getFormattedNumber(
                                                  puzzleMadnessWodAmount
                                                )}{" "}
                                                WOD
                                              </span>
                                              <span className="beast-siege-usd-price">
                                                ($
                                                {getFormattedNumber(
                                                  activeEvent.usdPrice
                                                )}
                                                )
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {
                                        // hasBoughtpuzzleMadness &&
                                        isFinishedPuzzle === false ? (
                                          <div style={{ height: "38px" }}></div>
                                        ) : (
                                          <div className="d-flex align-items-center gap-2">
                                            {!isConnected && (
                                              <button
                                                className="beast-siege-btn"
                                                onClick={onConnectWallet}
                                              >
                                                {" "}
                                                Connect Wallet
                                              </button>
                                            )}
                                            {!email && isConnected && (
                                              <NavLink
                                                className="beast-siege-btn"
                                                to={"/auth"}
                                              >
                                                {" "}
                                                Log In
                                              </NavLink>
                                            )}
                                            {isConnected && email && (
                                              <>
                                                <button
                                                  disabled={
                                                    puzzleMadnessBundleState ===
                                                      "deposit" ||
                                                    puzzleMadnessBundleState ===
                                                      "loading" ||
                                                    checkWallet === false
                                                      ? true
                                                      : false
                                                  }
                                                  className={` ${
                                                    puzzleMadnessBundleState ===
                                                      "deposit" ||
                                                    checkWallet === false ||
                                                    puzzleMadnessShowApproval ===
                                                      false
                                                      ? "beast-siege-btn-inactive d-none"
                                                      : "beast-siege-btn"
                                                  }  py-2 px-4`}
                                                  onClick={() =>
                                                    handleApprovalPuzzle()
                                                  }
                                                >
                                                  {puzzleMadnessBundleState ===
                                                  "loading" ? (
                                                    <div
                                                      className="spinner-border spinner-border-sm text-light"
                                                      role="status"
                                                    >
                                                      <span className="visually-hidden">
                                                        Loading...
                                                      </span>
                                                    </div>
                                                  ) : (
                                                    "Approve"
                                                  )}
                                                </button>
                                                <button
                                                  disabled={
                                                    checkWallet === true &&
                                                    puzzleMadnessDepositState !==
                                                      "loading-deposit"
                                                      ? false
                                                      : true
                                                  }
                                                  className={` ${
                                                    puzzleMadnessShowApproval ===
                                                      true &&
                                                    checkWallet === true
                                                      ? "beast-siege-btn-inactive d-none"
                                                      : puzzleMadnessShowApproval ===
                                                          false &&
                                                        checkWallet === true
                                                      ? "beast-siege-btn"
                                                      : "beast-siege-btn-inactive"
                                                  }  py-2 px-4`}
                                                  onClick={() =>
                                                    handleDepositPuzzle()
                                                  }
                                                >
                                                  {puzzleMadnessDepositState ===
                                                  "loading-deposit" ? (
                                                    <div
                                                      className="spinner-border spinner-border-sm text-light"
                                                      role="status"
                                                    >
                                                      <span className="visually-hidden">
                                                        Loading...
                                                      </span>
                                                    </div>
                                                  ) : (
                                                    "Activate"
                                                  )}
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                                <div className="col-12 col-xxl-6">
                                  <div
                                    className={`beast-siege-info-wrapper ${activeEvent.infoClass} p-3 w-100`}
                                  >
                                    <div className="d-flex flex-column gap-3">
                                      <div className="d-flex flex-column gap-2">
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

                                      <div className="d-flex flex-column gap-2">
                                        {activeEvent?.tips && (
                                          <h6
                                            className="mb-0 challenge-popup-secondary-title"
                                            style={{ color: "#FFC808" }}
                                          >
                                            Tips
                                          </h6>
                                        )}
                                        <div className="d-flex flex-column gap-1">
                                          {activeEvent?.tips?.map(
                                            (tip, index) => (
                                              <div
                                                className="d-flex align-items-center gap-2"
                                                key={index}
                                              >
                                                <div className="yellow-dot"></div>
                                                <span className="challenge-popup-desc text-white">
                                                  {tip}
                                                </span>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between">
                          {/* {activeEvent?.id !== "greatCollection" &&
                            activeEvent?.id !== "maze" &&
                            activeEvent?.id !== "explorer-hunt" && (
                              <h6 className="mb-0 purchase-package-title">
                                Activate
                              </h6>
                            )} */}
                          {/* {activeEvent?.id === "maze" && (
                            <h6 className="mb-0 purchase-package-title">
                              Requirements
                            </h6>
                          )} */}
                          {/* <div className="d-flex align-items-end gap-2">
                            <span className="available-on">Available on</span>
                            <img src={bnb} width={20} height={20} alt="" />
                            <span className="purchase-chain">BNB Chain</span>
                          </div> */}
                        </div>
                        {activeEvent?.id === "critical" ? (
                          // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3  align-items-center justify-content-center position-relative">
                          //   <NavLink
                          //     to={"/shop/land"}
                          //     className="getpremium-btn col-lg-4 py-2"
                          //   >
                          //     Buy on Shop
                          //   </NavLink>
                          //   <NavLink
                          //     to={
                          //       "https://opensea.io/collection/worldofdypians"
                          //     }
                          //     target="_blank"
                          //     className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
                          //   >
                          //     <img src={opensea} alt="" />
                          //     Buy on Opensea
                          //   </NavLink>
                          // </div>
                          <></>
                        ) : activeEvent?.id === "puzzle" ? (
                          // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                          //   <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3 w-100">
                          //     <div className="event-price-wrapper p-3 d-flex align-items-center gap-3 gap-lg-5">
                          //       <span className="event-price-span">
                          //         Event Price
                          //       </span>
                          //       <div className="d-flex align-items-center gap-3">
                          //         <div className="d-flex align-items-center gap-1">
                          //           <img
                          //             src={wodIcon}
                          //             height={30}
                          //             width={30}
                          //             alt=""
                          //           />
                          //           <h6 className="event-price-coin mb-0">
                          //             {getFormattedNumber(
                          //               puzzleMadnessWodAmount
                          //             )}{" "}
                          //             WOD
                          //           </h6>
                          //         </div>
                          //         <span className="event-price-usd">
                          //           ($
                          //           {getFormattedNumber(activeEvent.usdPrice)})
                          //         </span>
                          //       </div>
                          //     </div>

                          //     <div className="d-flex align-items-center gap-2">
                          //       {hasBoughtpuzzleMadness &&
                          //         isFinishedPuzzle === false && (
                          //           <div className="d-flex flex-column gap-1">
                          //             <span className="event-price-span">
                          //               Active Until:
                          //             </span>
                          //             <Countdown
                          //               renderer={renderer}
                          //               date={puzzleMadnessCountdown}
                          //               onComplete={() => {
                          //                 setisFinishedPuzzle(true);
                          //               }}
                          //             />
                          //           </div>
                          //         )}
                          //       {(!isConnected || !email) && (
                          //         <button
                          //           className="stake-wod-btn-inactive"
                          //           disabled
                          //         >
                          //           {" "}
                          //           Buy
                          //         </button>
                          //       )}
                          //       {isConnected && email && (
                          //         <>
                          //           <button
                          //             disabled={
                          //               puzzleMadnessBundleState ===
                          //                 "deposit" ||
                          //               puzzleMadnessBundleState ===
                          //                 "loading" ||
                          //               checkWallet === false
                          //                 ? true
                          //                 : false
                          //             }
                          //             className={` ${
                          //               puzzleMadnessBundleState ===
                          //                 "deposit" ||
                          //               checkWallet === false ||
                          //               puzzleMadnessShowApproval === false
                          //                 ? "stake-wod-btn-inactive d-none"
                          //                 : "stake-wod-btn"
                          //             }  py-2 px-4`}
                          //             onClick={() => handleApprovalPuzzle()}
                          //           >
                          //             {puzzleMadnessBundleState ===
                          //             "loading" ? (
                          //               <div
                          //                 className="spinner-border spinner-border-sm text-light"
                          //                 role="status"
                          //               >
                          //                 <span className="visually-hidden">
                          //                   Loading...
                          //                 </span>
                          //               </div>
                          //             ) : (
                          //               "Approve"
                          //             )}
                          //           </button>
                          //           <button
                          //             disabled={
                          //               checkWallet === true &&
                          //               puzzleMadnessDepositState !==
                          //                 "loading-deposit"
                          //                 ? false
                          //                 : true
                          //             }
                          //             className={` ${
                          //               puzzleMadnessShowApproval === true &&
                          //               checkWallet === true
                          //                 ? "stake-wod-btn-inactive d-none"
                          //                 : puzzleMadnessShowApproval ===
                          //                     false && checkWallet === true
                          //                 ? "stake-wod-btn"
                          //                 : "stake-wod-btn-inactive"
                          //             }  py-2 px-4`}
                          //             onClick={() => handleDepositPuzzle()}
                          //           >
                          //             {puzzleMadnessDepositState ===
                          //             "loading-deposit" ? (
                          //               <div
                          //                 className="spinner-border spinner-border-sm text-light"
                          //                 role="status"
                          //               >
                          //                 <span className="visually-hidden">
                          //                   Loading...
                          //                 </span>
                          //               </div>
                          //             ) : (
                          //               "Activate"
                          //             )}
                          //           </button>
                          //         </>
                          //       )}
                          //     </div>
                          //   </div>
                          // </div>
                          <></>
                        ) : activeEvent?.id === "explorer-hunt" ? (
                          <></>
                        ) : // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                        //   <div className="d-flex align-items-center justify-content-between gap-3">
                        //     <div className="d-flex flex-column gap-2">
                        //       <span
                        //         className="challenge-popup-desc text-white"
                        //         style={{ fontSize: "18px" }}
                        //       >
                        //         What is Explorer Hunt?
                        //       </span>
                        //       <span className="challenge-popup-desc text-white">
                        //         Explorer Hunt is an event where you must
                        //         defend the world from alien explorers who have
                        //         landed to assess the terrain before their
                        //         invasion.
                        //       </span>
                        //     </div>
                        //   </div>
                        // </div>
                        activeEvent?.id === "greatCollection" ? (
                          // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                          //   <div className="d-flex align-items-center justify-content-between gap-3">
                          //     <div className="d-flex flex-column gap-2">
                          //       <span
                          //         className="challenge-popup-desc text-white"
                          //         style={{ fontSize: "18px" }}
                          //       >
                          //         What is The Great Collection?
                          //       </span>
                          //       <span className="challenge-popup-desc text-white">
                          //         The Great Collection is a thrilling event
                          //         where players are tasked with gathering rare
                          //         and unique partner branded coins scattered
                          //         across the game.
                          //       </span>
                          //     </div>
                          //   </div>
                          // </div>
                          <></>
                        ) : activeEvent?.id === "maze" ? (
                          // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                          //   <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                          //     <span className="challenge-popup-desc text-white">
                          //       You need to hold at least 400 WOD tokens to
                          //       participate
                          //     </span>
                          //     <NavLink className="explore-btn" to="/#buy-wod">
                          //       BUY WOD
                          //     </NavLink>
                          //   </div>
                          // </div>
                          <></>
                        ) : (
                          // <div className="new-event-wrapper p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between position-relative">
                          //   <span
                          //     className="available-day-text mb-0 text-white w-100 d-flex justify-content-center"
                          //     style={{ fontWeight: "700", fontSize: "18px" }}
                          //   >
                          //     Event Coming Soon
                          //   </span>
                          // </div>
                          <></>
                        )}
                        {/* {eventId === "golden-pass" &&
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
                                       src={'https://cdn.worldofdypians.com/wod/syncIcon.svg'}
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
                          )} */}
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

      {/*   

     

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
