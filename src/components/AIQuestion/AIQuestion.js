import { NavLink } from "react-router-dom";
import "./_aiquestion.scss";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
// import orynBorder from "./ai-oryn-border2.webp";
import { Canvas } from "@react-three/fiber";
import { QuestionExperience } from "../../screens/NewAgent/components/QuestionExperience";
import { Experience } from "../../screens/NewAgent/components/Experience";
import clickSound from "./assets/click.mp3";
import drumrollSound from "./assets/drumroll.mp3";
import failSound from "./assets/fail.mp3";
import gamestartSound from "./assets/gamestart.mp3";
import successSound from "./assets/success.mp3";
import suspenseSound from "./assets/suspense.mp3";
import suspenseful1Sound from "./assets/suspenseful1.mp3";
import suspenseful2Sound from "./assets/suspenseful2.mp3";

import timerEndedSound from "./assets/timerEnded.mp3";
import avatarCorrect from "./assets/avatarCorrect.gif";
import avatarWrong from "./assets/avatarWrong.gif";
import avatarIdle from "./assets/avatarIdle.gif";
import avatarTime from "./assets/avatarTime.gif";

const AIQuestion = ({
  onQuestionComplete,
  isConnected,
  coinbase,
  chainId,
  onConnectWallet,
  onClose,
  email,
  handleBnbPool,
  walletClient,
  publicClient,
  binanceW3WProvider,
  address,
  username,
  suspenseMusicRef,
  suspenseSound,
  setSuspenseSound,
}) => {
  // new Audio(successSound).play();

  const answersOptions = [0, 1, 2, 3];
  const answers = ["A", "B", "C", "D"];

  const totalTime = 20;

  const TYPING_SPEED_PER_CHAR = 0.05; // seconds per character
  const BASE_DELAY = 1.5;

  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [optionsClickable, setOptionsClickable] = useState(false);

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState("initial");
  const [activeClass, setActiveClass] = useState("");
  const [playAudio, setPlayAudio] = useState(false);
  const [sound, setSound] = useState(false);
  const [count, setCount] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [pause, setPause] = useState(false);
  const [avatarState, setAvatarState] = useState("idle");

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const intervalRef = useRef(null);


const messages = [
   "Are you feeling smart today?",
  "Let’s see what your brain can do",
  "Today's challenge awaits you!",
  "Your brain is under pressure!",
  "Think you can crack this one?",
  "Time to earn your bragging rights",
  "Only the sharp survive today",
  "Let's put you to the test now",
  "Is your brain warmed up yet?",
  "Can you handle today's quiz?",
  "Ready to prove your skills?",
  "This one’s not for the weak!",
  "One question. All the glory.",
  "Get ready, genius in action!",
  "Let’s find out who you are!",
  "Do you dare to take this on?",
  "Test your limits right now!",
  "Brains or luck—pick one now!",
  "Your fate rests on this quiz",
  "Sharpen up. It's game time!",
  "No mercy in today’s round!",
  "You vs the unknown begins!",
  "Don’t choke on this one 😈",
  "Dare to challenge the odds?",
  "Mind games start right here!",
  "Let’s heat up those neurons!",
  "A true test of your wits 🔥",
  "Think fast or fall behind!",
  "Big brain moves only today!",
  "Can you outsmart the game?"
];

const [dailyMessage, setDailyMessage] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-06-30"
    const saved = JSON.parse(localStorage.getItem("dailyMessage")) || {};

    if (saved.date === today && saved.message) {
      // Use saved message for today
      setDailyMessage(saved.message);
    } else {
      // Pick a new message
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      setDailyMessage(randomMessage);

      localStorage.setItem(
        "dailyMessage",
        JSON.stringify({ date: today, message: randomMessage })
      );
    }
  }, []);



  const handleConfirm = () => {
    if (selectedOption === undefined) return;
    clearInterval(intervalRef.current);
    setConfirmed(true);
    setShowResult(true);
  };

  const handleUnlockQuestion = async () => {
    setUnlockLoading(true);
    setUnlockStatus("loading");
    let web3 = new Web3(window.ethereum);
    const contract_bnb = new web3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      const gasPrice = await web3.eth.getGasPrice();
      console.log("gasPrice", gasPrice);
      const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
      const increasedGwei = parseInt(currentGwei) + 0.5;
      console.log("increasedGwei", increasedGwei);

      const transactionParameters = {
        gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
      };

      await contract_bnb.methods
        .openChest()
        .estimateGas({ from: coinbase })
        .then((gas) => {
          transactionParameters.gas = web3.utils.toHex(gas);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(transactionParameters);

      await contract_bnb.methods
        .openChest()
        .send({
          from: coinbase,
          ...transactionParameters,
        })
        .then(() => {
          setUnlockLoading(false);
          setUnlockStatus("success");
          new Audio(gamestartSound).play();

          setTimeout(() => {
            setStep(1);
            setUnlockStatus("initial");
          }, 2000);
        })
        .catch((e) => {
          window.alertify.error(e?.message);
          setUnlockLoading(false);
          setUnlockStatus("error");
          setTimeout(() => {
            setUnlockStatus("initial");
          }, 3000);

          console.error(e);
        });
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: window.config.daily_bonus_bnb_address,
            abi: window.DAILY_BONUS_BNB_ABI,
            functionName: "openPremiumChest",
            args: [],
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            setUnlockLoading(false);
            setUnlockStatus("error");
            setTimeout(() => {
              setUnlockStatus("initial");
            }, 3000);

            console.error(e);
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
            setUnlockLoading(false);
            setUnlockStatus("success");
            setTimeout(() => {
              setStep(1);
              setUnlockStatus("initial");
            }, 2000);
          }
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      const contract_bnb_binance = new ethers.Contract(
        window.config.daily_bonus_bnb_address,
        window.DAILY_BONUS_BNB_ABI,
        binanceW3WProvider.getSigner()
      );

      const gasPrice = await binanceW3WProvider.getGasPrice();
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 14),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      let gasLimit;
      try {
        gasLimit = await contract_bnb_binance.estimateGas.openChest();
        transactionParameters.gasLimit = gasLimit;
        console.log("transactionParameters", transactionParameters);
      } catch (error) {
        console.error(error);
      }

      const txResponse = await contract_bnb_binance
        .openChest({ ...transactionParameters })
        .catch((e) => {
          window.alertify.error(e?.message);
          setUnlockLoading(false);
          setUnlockStatus("error");
          setTimeout(() => {
            setUnlockStatus("initial");
          }, 3000);

          console.error(e);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setUnlockLoading(false);
        setUnlockStatus("success");
        setTimeout(() => {
          setStep(1);
          setUnlockStatus("initial");
        }, 2000);
      }
    }
  };

  const handleOptionClick = (value) => {
    setPause(true);
    setSuspenseSound(true);
    suspenseMusicRef.current?.pause();
    suspenseMusicRef.current.currentTime = 0;
    new Audio(drumrollSound).play();

    setTimeout(() => {
      handleConfirm();
      const isCorrect = Math.random() < 0.5;

      setShowSelect(false);

      if (isCorrect) {
        setSelectedAnswer(value);
        new Audio(successSound).play();
        setAvatarState("correct");
        setTimeout(() => {
          setAvatarState("idle");
        }, 3360);
      } else {
        const otherOptions = answersOptions.filter((opt) => opt !== value);
        const randomWrong =
          otherOptions[Math.floor(Math.random() * otherOptions.length)];
        setSelectedAnswer(randomWrong);
        new Audio(failSound).play();
        setAvatarState("wrong");
        setTimeout(() => {
          setAvatarState("idle");
        }, 3360);
      }
      setPause(false);
    }, 2000);
    onQuestionComplete(true);
    setTimeout(() => {
      setSelectedAnswer(undefined);
      setSelectedOption(undefined);
      onQuestionComplete(false);
      setStep(0);
      setConfirmed(false);
      setShowResult(false);
      setTimeLeft(totalTime);
    }, 10000);
  };

  const getAnswerClass = (option) => {
    if (selectedOption === undefined) return "answer-inner-wrapper";

    if (selectedAnswer === undefined) {
      return selectedOption === option
        ? "answer-inner-wrapper-active"
        : "answer-inner-wrapper";
    }

    if (option === selectedOption && option === selectedAnswer) {
      return "answer-inner-wrapper-answer"; // selected and correct
    }

    if (option === selectedOption && option !== selectedAnswer) {
      return "answer-inner-wrapper-wrong"; // selected and wrong
    }

    if (option === selectedAnswer) {
      return "answer-inner-wrapper";
    }

    return "answer-inner-wrapper";
  };

  const getRadioClass = (option) => {
    if (!confirmed) {
      return selectedOption === option
        ? "radio-button-option-selected"
        : "radio-button-option";
    }

    if (option === selectedAnswer) return "radio-button-option-correct";
    if (option === selectedOption) return "radio-button-option-wrong";
    if (option !== selectedOption && option !== selectedAnswer)
      return "radio-button-option-wrong";
    return "radio-button-option-incorrect-unselected";
  };
  const handleTimeout = () => {
    if (selectedOption === undefined || selectedAnswer === undefined) {
      setConfirmed(true);
      setShowResult(true);
      // setTimeout(() => {
      //   setSelectedAnswer(undefined);
      //   setSelectedOption(undefined);
      //   onQuestionComplete(false);
      //   setStep(0);
      //   setConfirmed(false);
      //   setShowResult(false);
      //   setTimeLeft(totalTime);
      // }, 2000);
    }
  };
  useEffect(() => {
    if (step === 1 && optionsClickable) {
      if (confirmed || timeLeft === 0) return;
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            handleTimeout();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [timeLeft, confirmed, step, optionsClickable]);

  useEffect(() => {
    if (step === 1) {
      const totalTypingTime =
        BASE_DELAY +
        answersOptions.reduce((acc, option) => {
          const text =
            option === 0
              ? "Bitcoin (BTC)"
              : option === 1
              ? "Ethereum (ETH)"
              : option === 2
              ? "Solana (SOL)"
              : "Binance Coin (BNB)";
          return acc + text.length * TYPING_SPEED_PER_CHAR;
        }, 0);

      setTimeout(() => {
        setOptionsClickable(true);
      }, totalTypingTime * 1000);
    }

    // return () => clearTimeout(timer);
  }, [step, answersOptions]);

  useEffect(() => {
    if (timeLeft === 20 && step === 1) {
        setTimeout(() => {
          suspenseMusicRef.current?.play();
        }, 4500);
    }
    if (timeLeft === 0) {
      suspenseMusicRef.current?.pause();
      suspenseMusicRef.current.currentTime = 0;
      setSuspenseSound(true);
      new Audio(timerEndedSound).play();

      setAvatarState("time");
      setTimeout(() => {
        setAvatarState("idle");
      }, 3360);
    }
  }, [timeLeft, step]);

  console.log("Audio state before pause:", suspenseMusicRef.current?.paused);

  const progress = timeLeft / totalTime;
  const dashOffset = circumference * (1 - progress);
  return (
    <div className="d-flex w-100 gap-4">
      <div className="d-none d-lg-flex d-md-flex flex-column gap-2 col-lg-3 col-md-4 position-relative">
        <div className="ai-oryn-top">
          <div
            // src={orynBorder}
            // src={"https://cdn.worldofdypians.com/wod/ai-oryn-border.webp"}
            alt=""
            className="ai-oryn-border d-flex align-items-center justify-content-center"
          >
            <div className="oryn-inner-border">
              {/* <Canvas
                shadows
                camera={{ near: 0.01, far: 1000, position: [0, 0, 10] }}
                style={{
                  height: "100%",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              >
                <QuestionExperience
                  playAudio={playAudio}
                  setPlayAudio={setPlayAudio}
                  count={count}
                  audioFile={audioFile}
                  jsonFile={jsonFile}
                  sound={sound}
                />
              </Canvas> */}
              <img
                src={
                  avatarState === "idle"
                    ? avatarIdle
                    : avatarState === "correct"
                    ? avatarCorrect
                    : avatarState === "wrong"
                    ? avatarWrong
                    : avatarState === "time"
                    ? avatarTime
                    : avatarIdle
                }
                className="oryn-avatar"
                alt=""
              />
            </div>
          </div>
          <span className="ai-oryn-text">
            Hi{" "}
            <span className="ai-username ai-username text-uppercase">
              {username},
            </span>
          </span>
          <span className="ai-oryn-text">{dailyMessage}</span>
        </div>
        <div className="ai-oryn-bottom">
          <div className="d-flex flex-column gap-2 p-4 h-100 justify-content-between">
            <div className=" gap-2 d-flex flex-column">
              <span className="ai-oryn-bottom-txt">
                A daily challenge where each player can unlock a AI question for
                a chance to win!
              </span>
              <span className="ai-oryn-bottom-txt">Notes:</span>
              <ul className="ai-oryn-bottom-txt ps-0">
                <li>🔹 Daily opportunity </li>
                <li>🔹 Available on BNB & opBNB</li>
                <li>🔹 Sign the transaction </li>
                <li>🔹 Answer in 20 seconds</li>
                <li>🔹 Win different rewards</li>
              </ul>
            </div>
            {/* {step === 1 && ( */}
            <div
              className={
                selectedOption === selectedAnswer &&
                selectedAnswer !== undefined &&
                step === 1
                  ? "ai-rewards-info-active"
                  : "ai-rewards-info"
              }
              // onMouseOver={() => {
              //   setActiveClass("stars");
              // }}
              // onMouseLeave={() => {
              //   setActiveClass("");
              // }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "stars" ||
                      step === 0 ||
                      (selectedOption === selectedAnswer &&
                        selectedAnswer !== undefined &&
                        step === 1) ||
                      (selectedAnswer === undefined && step === 1)
                        ? "ai-reward-logo-active"
                        : "ai-reward-logo"
                    }
                  />
                  <div className="d-flex flex-column">
                    {/* <span className={"ai-rewards-stars"}>180</span> */}
                    <span
                      className={
                        activeClass === "stars" ||
                        // step === 0 ||
                        (selectedOption === selectedAnswer &&
                          selectedAnswer !== undefined &&
                          step === 1)
                          ? "ai-rewards-title-active ps-3"
                          : "ai-rewards-title ps-3"
                      }
                    >
                      STARS
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ai-rewards-info"
              // onMouseOver={() => {
              //   setActiveClass("points");
              // }}
              // onMouseLeave={() => {
              //   setActiveClass("");
              // }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "points" ||
                      step === 0 ||
                      (selectedAnswer === undefined && step === 1)
                        ? "ai-reward-logo-active"
                        : "ai-reward-logo"
                    }
                  />
                  <div className="d-flex flex-column">
                    {/* <span className={"ai-rewards-points"}>
                      {getFormattedNumber(23200, 0)}
                    </span> */}
                    <span
                      className={
                        activeClass === "points"
                          ? //|| step === 0 ||
                            // (selectedAnswer !== undefined && step === 1)
                            "ai-rewards-title-active ps-3"
                          : "ai-rewards-title ps-3"
                      }
                    >
                      POINTS
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ai-rewards-info"
              // onMouseOver={() => {
              //   setActiveClass("rewards");
              // }}
              // onMouseLeave={() => {
              //   setActiveClass("");
              // }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "rewards" ||
                      step === 0 ||
                      (selectedAnswer === undefined && step === 1)
                        ? "ai-reward-logo-active"
                        : "ai-reward-logo"
                    }
                  />
                  <div className="d-flex flex-column">
                    {/* <span className={"ai-rewards-money"}>$1.5</span> */}
                    <span
                      className={
                        activeClass === "rewards"
                          ? // ||step === 0 ||
                            // (selectedAnswer !== undefined && step === 1)
                            "ai-rewards-title-active ps-3"
                          : "ai-rewards-title ps-3"
                      }
                    >
                      REWARDS
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column gap-4 justify-content-between overflow-auto"
        style={{ flex: 1 }}
      >
        <div className="d-flex flex-column w-100">
          <div className="d-flex align-items-center gap-2 justify-content-between w-100 overflow-auto">
            <div className="d-flex w-100 align-items-center gap-3 justify-content-start">
              <button
                className={
                  chainId === 56
                    ? "ai-chain-button-active py-3 px-3 col-lg-4"
                    : "ai-chain-button py-3 px-3 col-lg-4"
                }
                onClick={() => {
                  handleBnbPool("0x38", 56);
                }}
              >
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                    alt=""
                    className="ai-chain-icon"
                  />
                  BNB CHAIN
                </div>
              </button>
              <button
                className={
                  chainId === 204
                    ? "ai-chain-button-active py-3 px-3 col-lg-4"
                    : "ai-chain-button py-3 px-3 col-lg-4"
                }
                onClick={() => {
                  handleBnbPool("0xcc", 204);
                }}
              >
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/opbnbChain.png"}
                    alt=""
                    className="ai-chain-icon"
                  />
                  OPBNB
                </div>
              </button>
              {/* <button className={"ai-chain-button py-3 px-3"}>
              <div className="d-flex align-items-center gap-2 justify-content-between">
                Coming Soon
              </div>
            </button> */}
            </div>
            <div className="ai-timer-bg-wrapper px-3 py-1 col-lg-3 col-md-4 col-sm-3 col-4">
              <div className="d-flex align-items-center w-100 gap-4 justify-content-between">
                <span className="ai-timer-title text-uppercase">
                  {timeLeft > 0 ? "Timer" : "Time's Up!"}
                </span>
                {/* {(selectedAnswer === undefined || !showResult) && ( */}
                <div className="ai-timer-container">
                  <svg className="ai-progress-ring" width="60" height="60">
                    <circle
                      className="ai-ring-bg"
                      stroke="#343661"
                      fill="transparent"
                      r={radius}
                      cx="30"
                      cy="30"
                    />
                    <circle
                      className={`ai-ring-progress ${
                        timeLeft <= 10 && timeLeft > 0 ? "blinking" : ""
                      }`}
                      stroke={
                        timeLeft > 16
                          ? "url(#gradient)"
                          : timeLeft > 8
                          ? "url(#gradient2)"
                          : "url(#gradient3)"
                      }
                      fill="transparent"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      r={radius}
                      cx="30"
                      cy="30"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#EEBE50" />
                        <stop offset="100%" stopColor="#EFCB86" />
                      </linearGradient>

                      <linearGradient
                        id="gradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#D46D4E" />
                        <stop offset="100%" stopColor="#FF1926" />
                      </linearGradient>
                      <linearGradient
                        id="gradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#D44E4E" />
                        <stop offset="100%" stopColor="#FF1926" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div
                    className={`ai-timer-label ${
                      timeLeft <= 10 && timeLeft > 0 ? "blinking" : ""
                    }`}
                  >
                    {timeLeft === 0 ? (
                      <img
                        src={"https://cdn.worldofdypians.com/wod/ai-time.png"}
                        alt=""
                        className="ai-time-icon"
                      />
                    ) : (
                      `${timeLeft}s`
                    )}
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
          <div className="ai-separator my-3"></div>
        </div>
        {/* {step === 0 ? ( */}
        <div
          className="d-flex flex-column gap-4 align-items-center"
          style={{ flex: 1 }}
        >
          <div className="ai-answer-option-wrapper p-4 pt-0 position-relative w-100">
            <div className="ai-question-text-wrapper justify-content-center align-items-center">
              <span className="aiLockedQuestion text-capitalize " id="question">
                {step === 0
                  ? ""
                  : step === 1
                  ? "Which was the first crypto introduced in the world?"
                  : ""}
              </span>
            </div>
            <div className="options-wrapper gap-3 w-100">
              {answersOptions.map((option, index) => {
                const text =
                  step === 1
                    ? option === 0
                      ? "Bitcoin (BTC)"
                      : option === 1
                      ? "Ethereum (ETH)"
                      : option === 2
                      ? "Solana (SOL)"
                      : "Binance Coin (BNB)"
                    : "";

                // Use actual character length of previous options to calculate delay
                const delayBeforeThisOption =
                  step === 1
                    ? answersOptions
                        .slice(0, index)
                        .reduce((acc, prevOption) => {
                          const prevText =
                            prevOption === 0
                              ? "Bitcoin (BTC)"
                              : prevOption === 1
                              ? "Ethereum (ETH)"
                              : prevOption === 2
                              ? "Solana (SOL)"
                              : "Binance Coin (BNB)";
                          return acc + prevText.length * TYPING_SPEED_PER_CHAR;
                        }, BASE_DELAY)
                    : 0;

                const animationDuration =
                  step === 1 ? text.length * TYPING_SPEED_PER_CHAR : 0;

                return (
                  <div
                    key={index}
                    className={`answer-outer-wrapper w-100 ${
                      (!optionsClickable ||
                        selectedAnswer !== undefined ||
                        timeLeft === 0 ||
                        step === 0) &&
                      "pe-none"
                    }`}
                    onClick={() => {
                      step === 1 && setSelectedOption(option);
                      setShowSelect(true);
                      new Audio(clickSound).play();
                    }}
                  >
                    <div
                      className={`${getAnswerClass(
                        option
                      )} px-4 py-3 d-flex align-items-center justify-content-between`}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="answer-text">
                          {answers[index] + ":"}
                        </span>
                        <span
                          className="answer-text option"
                          id={`option${index + 1}`}
                          style={{
                            animation:
                              step === 1
                                ? `typing ${animationDuration}s steps(${text.length}, end) forwards`
                                : "none",
                            animationDelay: `${delayBeforeThisOption}s`,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            width: step === 1 ? "0" : "auto",
                          }}
                        >
                          {step === 0
                            ? ""
                            : option === 0
                            ? "Bitcoin (BTC)"
                            : option === 1
                            ? "Ethereum (ETH)"
                            : option === 2
                            ? "Solana (SOL)"
                            : "Binance Coin (BNB)"}
                        </span>
                      </div>
                      {step === 1 && (
                        <span className={getRadioClass(option)}></span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={` ${
              selectedAnswer === undefined && timeLeft === 0
                ? "ai-answer-result-error-wrapper"
                : selectedOption === selectedAnswer &&
                  selectedAnswer !== undefined
                ? "ai-answer-result-success-wrapper"
                : selectedOption !== selectedAnswer &&
                  selectedAnswer !== undefined
                ? "ai-answer-result-error-wrapper"
                : ""
            } ai-answer-result-wrapper px-3 py-2 d-flex flex-column align-items-center justify-content-center`}
          >
            {step === 0 ? (
              <>
                {/* <span className="aiLockedDesc">
                    A Hidden question awaits
                  </span> */}
                <span className="aiLockedDesc">
                  {!email && coinbase
                    ? "Login to your game account"
                    : !isConnected && !coinbase
                    ? "Connect your wallet to show the question"
                    : isConnected &&
                      coinbase &&
                      address &&
                      address.toLowerCase() === coinbase.toLowerCase() &&
                      email &&
                      chainId !== 56 &&
                      chainId !== 204
                    ? "Switch to BNB Chain or opBNB to show the question"
                    : isConnected &&
                      coinbase &&
                      email &&
                      address &&
                      (chainId === 56 || chainId === 204) &&
                      address.toLowerCase() !== coinbase.toLowerCase()
                    ? "Use the wallet associated to your game account."
                    : "Complete the transaction to show the question"}
                </span>
              </>
            ) : (
              <></>
            )}

            {!showSelect &&
            selectedOption === undefined &&
            selectedAnswer === undefined &&
            step === 1 &&
            timeLeft !== 0 ? (
              <>
                <span className="aiAnswer-title">Select your answer</span>
              </>
            ) : showSelect &&
              selectedOption !== undefined &&
              selectedAnswer === undefined &&
              timeLeft !== 0 &&
              step === 1 ? (
              <>
                <span className="w-100 px-4 aiAnswer-title d-flex align-items-center gap-2 justify-content-between">
                  You are going with '{answers[selectedOption]}'..Final answer?
                  <button
                    className="ai-question-confirm-answer px-3"
                    onClick={() => handleOptionClick(selectedOption)}
                  >
                    {pause ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Yes"
                    )}
                  </button>
                </span>
              </>
            ) : selectedAnswer === undefined && timeLeft === 0 && step === 1 ? (
              <>
                <span className="aiAnswer-title">
                  🐌 Too slow! Try again tomorrow.
                </span>
              </>
            ) : selectedOption === selectedAnswer &&
              selectedAnswer !== undefined &&
              step === 1 ? (
              <>
                <span className="aiAnswer-title">You have earned 54 Stars</span>
              </>
            ) : step === 1 ? (
              <>
                <span className="aiAnswer-title">
                  🍀 Better Luck Next Time 🍀
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          isConnected &&
          coinbase &&
          email &&
          address &&
          coinbase.toLowerCase() === address.toLowerCase() &&
          (chainId === 56 || chainId === 204) &&
          step === 0
            ? "ai-question-footer-wrapper"
            : coinbase &&
              isConnected &&
              address &&
              coinbase.toLowerCase() !== address.toLowerCase() &&
              email
            ? "ai-question-footer-wrapper-error"
            : // (selectedOption === undefined &&
            //   selectedAnswer === undefined &&
            //   step === 1) ||
            // timeLeft === 0
            //   ? "ai-question-footer-wrapper-disabled"
            //   : unlockStatus === "error" || (selectedAnswer === undefined && timeLeft === 0 && step === 1)
            //   ? "ai-question-footer-wrapper-error"
            //   : "ai-question-footer-wrapper"
            chainId !== 56 &&
              chainId !== 204 &&
              coinbase &&
              isConnected &&
              selectedOption === undefined &&
              selectedAnswer === undefined &&
              step === 1 &&
              timeLeft === 0
            ? "ai-question-footer-wrapper-error pe-none"
            : (chainId !== 56 && chainId !== 204 && coinbase && isConnected) ||
              unlockStatus === "error" ||
              (selectedOption !== selectedAnswer &&
                selectedAnswer !== undefined &&
                step === 1)
            ? "ai-question-footer-wrapper-error"
            : selectedOption !== selectedAnswer &&
              selectedAnswer === undefined &&
              selectedOption !== undefined &&
              timeLeft === 0 &&
              coinbase &&
              isConnected &&
              step === 1
            ? "ai-question-footer-wrapper-error pe-none"
            : (selectedOption === undefined &&
                selectedAnswer === undefined &&
                step === 1) ||
              timeLeft === 0
            ? "ai-question-footer-wrapper-disabled"
            : selectedOption === selectedAnswer &&
              selectedAnswer !== undefined &&
              step === 1
            ? "ai-question-footer-wrapper-active"
            : !isConnected || !email
            ? "ai-question-footer-wrapper"
            : "ai-question-footer-wrapper-disabled"
        }
      >
        {!email && coinbase && (
          <NavLink
            className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
            to="/auth"
            onClick={() => {
              onClose();
              suspenseMusicRef.current?.pause();
            }}
          >
            Log in
          </NavLink>
        )}
        {!isConnected && !coinbase && (
          <button
            className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
            onClick={onConnectWallet}
          >
            Connect
          </button>
        )}

        {isConnected &&
          coinbase &&
          email &&
          chainId !== 56 &&
          chainId !== 204 && (
            <button
              className="ai-main-button text-white text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              onClick={() => {
                handleBnbPool("0x38", 56);
              }}
            >
              Switch
            </button>
          )}

        {isConnected &&
          coinbase &&
          address &&
          coinbase.toLowerCase() === address.toLowerCase() &&
          email &&
          (chainId === 56 || chainId === 204) &&
          step === 0 && (
            <button
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              onClick={() => handleUnlockQuestion()}
              style={{ color: unlockStatus === "error" ? "#fff" : "" }}
            >
              {unlockLoading ? (
                <div className="d-flex align-items-center gap-2">
                  Processing
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : unlockStatus === "initial" ? (
                <>Show</>
              ) : unlockStatus === "success" ? (
                <>Success</>
              ) : (
                <>
                  Failed{" "}
                  <img
                    src={"https://cdn.worldofdypians.com/wod/failMark.svg"}
                    alt=""
                  />
                </>
              )}
            </button>
          )}
        {isConnected &&
          coinbase &&
          email &&
          address &&
          coinbase.toLowerCase() === address.toLowerCase() &&
          (chainId === 56 || chainId === 204) &&
          step === 1 && (
            <button
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              disabled
            >
              {selectedOption === undefined &&
              selectedAnswer === undefined &&
              step === 1 &&
              timeLeft === 0
                ? "TIME'S UP"
                : unlockStatus === "error"
                ? "FAIL"
                : selectedOption !== selectedAnswer &&
                  selectedAnswer !== undefined &&
                  step === 1
                ? "FAIL"
                : selectedOption === undefined &&
                  selectedAnswer === undefined &&
                  step === 1
                ? "IN PROGRESS"
                : selectedOption === selectedAnswer &&
                  selectedAnswer !== undefined &&
                  step === 1
                ? "CONGRATS"
                : selectedOption !== selectedAnswer &&
                  selectedAnswer === undefined &&
                  selectedOption !== undefined &&
                  timeLeft > 0 &&
                  step === 1
                ? "IN PROGRESS"
                : "TIME'S UP"}
            </button>
          )}

        {isConnected &&
          coinbase &&
          email &&
          address &&
          (chainId === 56 || chainId === 204) &&
          coinbase.toLowerCase() !== address.toLowerCase() && (
            <button
              disabled
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
            >
              Switch
            </button>
          )}
        {/* <img
          src={
            "https://cdn.worldofdypians.com/wod/ai-question-button-bottom.webp"
          }
          className="ai-question-footer-img"
        /> */}
      </div>
    </div>
  );
};

export default AIQuestion;
