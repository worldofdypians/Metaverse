import { NavLink } from "react-router-dom";
import "./_aiquestion.scss";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import orynBorder from "./ai-oryn-border2.webp";
import { Canvas } from "@react-three/fiber";
import { QuestionExperience } from "../../screens/NewAgent/components/QuestionExperience";
import { Experience } from "../../screens/NewAgent/components/Experience";

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
  username,
}) => {
  const answersOptions = [0, 1, 2, 3];
  const answers = ["A", "B", "C", "D"];

  const totalTime = 20;
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
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

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const intervalRef = useRef(null);

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
    handleConfirm();
    const isCorrect = Math.random() < 0.5;

    if (isCorrect) {
      setSelectedAnswer(value);
    } else {
      const otherOptions = answersOptions.filter((opt) => opt !== value);
      const randomWrong =
        otherOptions[Math.floor(Math.random() * otherOptions.length)];
      setSelectedAnswer(randomWrong);
    }
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
    if (step === 1) {
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
  }, [timeLeft, confirmed, step]);

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
              <Canvas
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
              </Canvas>
            </div>
          </div>
          <span className="ai-oryn-text">
            Hi{" "}
            <span className="ai-username ai-username text-uppercase">
              {username},
            </span>
          </span>
          <span className="ai-oryn-text">Are you feeling lucky today?</span>
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
              className="ai-rewards-info"
              onMouseOver={() => {
                setActiveClass("stars");
              }}
              onMouseLeave={() => {
                setActiveClass("");
              }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "stars"
                        ? "ai-reward-logo-active"
                        : "ai-reward-logo"
                    }
                  />
                  <div className="d-flex flex-column">
                    {/* <span className={"ai-rewards-stars"}>180</span> */}
                    <span
                      className={
                        activeClass === "stars"
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
              onMouseOver={() => {
                setActiveClass("points");
              }}
              onMouseLeave={() => {
                setActiveClass("");
              }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "points"
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
                          ? "ai-rewards-title-active ps-3"
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
              onMouseOver={() => {
                setActiveClass("rewards");
              }}
              onMouseLeave={() => {
                setActiveClass("");
              }}
            >
              <div className="d-flex align-items-center px-3 py-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-reward-active.webp"
                    }
                    alt=""
                    className={
                      activeClass === "rewards"
                        ? "ai-reward-logo-active"
                        : "ai-reward-logo"
                    }
                  />
                  <div className="d-flex flex-column">
                    {/* <span className={"ai-rewards-money"}>$1.5</span> */}
                    <span
                      className={
                        activeClass === "rewards"
                          ? "ai-rewards-title-active ps-3"
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
            <div className="ai-timer-bg-wrapper px-3 py-1">
              <div className="d-flex align-items-center w-100 gap-4 justify-content-between">
                <span className="ai-timer-title text-uppercase">Timer</span>
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
            <div className="ai-question-text-wrapper justify-content-center">
              <span className="aiLockedQuestion text-capitalize my-2">
                {step === 0
                  ? ""
                  : step === 1
                  ? "Which was the first crypto introduced in the world?"
                  : ""}
              </span>
            </div>
            <div className="options-wrapper gap-3 w-100">
              {answersOptions.map((option, index) => (
                <div
                  key={index}
                  className={`answer-outer-wrapper w-100 ${
                    (selectedAnswer !== undefined ||
                      timeLeft === 0 ||
                      step === 0) &&
                    "pe-none"
                  }`}
                  onClick={() => {
                    step === 1 && setSelectedOption(option);
                    setShowSelect(true);
                  }}
                >
                  <div
                    className={`${getAnswerClass(
                      option
                    )} px-4 py-3 d-flex align-items-center justify-content-between`}
                  >
                    <span className="answer-text">
                      {answers[index] + ":"}
                    </span>
                    <span className="answer-text">
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
                    {step === 1 && (
                      <span className={getRadioClass(option)}></span>
                    )}
                  </div>
                </div>
              ))}
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
            {
              // step === 1 ? (
              //   <>
              //     {timeLeft !== 0 &&
              //       (selectedAnswer === undefined || !showResult) && (
              //         <div className="ai-timer-container">
              //           <svg className="ai-progress-ring" width="60" height="60">
              //             <circle
              //               className="ai-ring-bg"
              //               stroke="#343661"
              //               fill="transparent"
              //               r={radius}
              //               cx="30"
              //               cy="30"
              //             />
              //             <circle
              //               className={`ai-ring-progress ${
              //                 timeLeft <= 10 && timeLeft > 0 ? "blinking" : ""
              //               }`}
              //               stroke={
              //                 timeLeft > 16
              //                   ? "url(#gradient)"
              //                   : timeLeft > 8
              //                   ? "url(#gradient2)"
              //                   : "url(#gradient3)"
              //               }
              //               fill="transparent"
              //               strokeWidth="4"
              //               strokeDasharray={circumference}
              //               strokeDashoffset={dashOffset}
              //               r={radius}
              //               cx="30"
              //               cy="30"
              //             />
              //             <defs>
              //               <linearGradient
              //                 id="gradient"
              //                 x1="0%"
              //                 y1="0%"
              //                 x2="100%"
              //                 y2="100%"
              //               >
              //                 <stop offset="0%" stopColor="#D4CF4E" />
              //                 <stop offset="100%" stopColor="#4ED4D0" />
              //               </linearGradient>

              //               <linearGradient
              //                 id="gradient2"
              //                 x1="0%"
              //                 y1="0%"
              //                 x2="100%"
              //                 y2="100%"
              //               >
              //                 <stop offset="0%" stopColor="#D46D4E" />
              //                 <stop offset="100%" stopColor="#FF1926" />
              //               </linearGradient>
              //               <linearGradient
              //                 id="gradient3"
              //                 x1="0%"
              //                 y1="0%"
              //                 x2="100%"
              //                 y2="100%"
              //               >
              //                 <stop offset="0%" stopColor="#D44E4E" />
              //                 <stop offset="100%" stopColor="#FF1926" />
              //               </linearGradient>
              //             </defs>
              //           </svg>
              //           <div
              //             className={`ai-timer-label ${
              //               timeLeft <= 10 && timeLeft > 0 ? "blinking" : ""
              //             }`}
              //           >
              //             {timeLeft === 0 ? <></> : `${timeLeft}s`}
              //           </div>
              //         </div>
              //       )}
              //   </>
              // ) :
              step === 0 ? (
                <>
                  {" "}
                  <span className="aiLockedQuestion">
                    A Hidden question awaits
                  </span>
                  <span className="aiLockedDesc">
                    {!email && coinbase
                      ? "Login to your game account"
                      : !isConnected && !coinbase
                      ? "Connect your wallet to unlock the question"
                      : isConnected &&
                        coinbase &&
                        email &&
                        chainId !== 56 &&
                        chainId !== 204
                      ? "Switch to BNB Chain or opBNB to unlock the challenge"
                      : "Sign the transaction to unlock your daily challenge"}
                  </span>
                </>
              ) : (
                <></>
              )
            }
            {/* {selectedOption !== undefined &&
              selectedAnswer === undefined &&
              timeLeft > 0 && (
                <>
                  <span className="aiLockedDesc">Are you sure?</span>
                  <button
                    className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-3 justify-content-center py-2"
                    onClick={() => {
                      handleOptionClick(selectedOption);
                    }}
                  >
                    Confirm
                  </button>
                </>
              )} */}

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
                <span className="aiAnswer-title">
                  Is this your final answer?
                </span>
              </>
            ) : selectedAnswer === undefined && timeLeft === 0 && step === 1 ? (
              <>
                <span className="aiAnswer-title">❌ TIME'S UP!</span>
                <span className="aiAnswer-desc">
                  Try again tomorrow for a chance to win rewards
                </span>
              </>
            ) : selectedOption === selectedAnswer &&
              selectedAnswer !== undefined &&
              step === 1 ? (
              <>
                <span className="aiAnswer-title">🎉 CONGRATS 🎉</span>
                <span className="aiAnswer-desc">You have earned 54 Stars</span>
              </>
            ) : step === 1 ? (
              <>
                <span className="aiAnswer-title">
                  🍀 Better Luck Next Time 🍀
                </span>
                <span className="aiAnswer-desc">
                  Try again tomorrow for a chance to win rewards
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* ) : step === 1 ? (
          <div
            className="d-flex flex-column gap-2 align-items-center justify-content-between"
            style={{ flex: 1 }}
          >
            <div className="d-flex flex-column gap-3 align-items-center justify-content-between">
              <div className="d-flex flex-column position-relative w-100 align-items-center">
                <div className="ai-countdown-wrapper px-0">
                <div className="ai-progress-bar-bg">
                  <div
                    className={`ai-progress-bar-fill ${
                      timeLeft <= 10 ? "ai-danger" : ""
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="ai-timer-text px-4 pb-1 d-flex align-items-center gap-1">
                ⏱ {timeLeft === 0 ? "Timer ended" : `${timeLeft}s`}
              </div> 
              </div>
              <div className="ai-question-text-wrapper">
                <span className="aiLockedQuestion text-capitalize my-2">
                  Which was the first crypto introduced in the world?
                </span>
              </div>
              <div className="options-wrapper gap-3 w-100">
                {answersOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`answer-outer-wrapper w-100 ${
                      (selectedAnswer !== undefined || timeLeft === 0) &&
                      "pe-none"
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <div
                      className={`${getAnswerClass(
                        option
                      )} px-3 py-3 d-flex align-items-center justify-content-between`}
                    >
                      <span className="answer-text">{index + 1}</span>
                      <span className="answer-text">
                        {option === 0
                          ? "Bitcoin (BTC)"
                          : option === 1
                          ? "Ethereum (ETH)"
                          : option === 2
                          ? "Solana (SOL)"
                          : "Binance Coin (BNB)"}
                      </span>
                      <span className={getRadioClass(option)}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedOption !== undefined &&
              selectedAnswer === undefined &&
              timeLeft > 0 && (
                <div className="d-flex flex-column gap-1 align-items-center w-100 justify-content-between">
                  <span className="aiLockedDesc">Are you sure?</span>
                  <button
                    className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-3 justify-content-center py-2"
                    onClick={() => {
                      handleOptionClick(selectedOption);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              )}
            {(selectedAnswer !== undefined || showResult) && (
              <div className="ai-answer-result-wrapper px-3 py-4  w-100 d-flex flex-column gap-2 align-items-center justify-content-between">
                {selectedOption === selectedAnswer &&
                selectedAnswer !== undefined ? (
                  <>
                    <span className="aiAnswer-title">🎉 CONGRATS 🎉</span>
                    <span className="aiAnswer-desc">
                      You have earned 54 Stars
                    </span>
                  </>
                ) : selectedAnswer === undefined && timeLeft === 0 ? (
                  <>
                    <span className="aiAnswer-title">❌ TIME'S UP!</span>
                    <span className="aiAnswer-desc">
                      Try again tomorrow for a chance to win rewards
                    </span>
                  </>
                ) : (
                  <>
                    <span className="aiAnswer-title">
                      🍀 Better Luck Next Time 🍀
                    </span>
                    <span className="aiAnswer-desc"></span>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}*/}
      </div>
      <div
        className={
          (selectedOption === undefined &&
            selectedAnswer === undefined &&
            step === 1) ||
          timeLeft === 0
            ? "ai-question-footer-wrapper-disabled"
            : unlockStatus === "error"
            ? "ai-question-footer-wrapper-error"
            : "ai-question-footer-wrapper"
        }
      >
        {!email && coinbase && (
          <NavLink
            className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
            to="/auth"
            onClick={() => onClose()}
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
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              onClick={() => {
                handleBnbPool("0x38", 56);
              }}
            >
              Switch
            </button>
          )}

        {isConnected &&
          coinbase &&
          email &&
          (chainId === 56 || chainId === 204) &&
          step === 0 && (
            <button
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              onClick={() => handleUnlockQuestion()}
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
          (chainId === 56 || chainId === 204) &&
          step === 1 && (
            <button
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              onClick={() => {
                handleOptionClick(selectedOption);
                setShowSelect(false);
              }}
              disabled={
                (selectedOption === undefined &&
                  selectedAnswer === undefined) ||
                timeLeft === 0
              }
            >
              Confirm
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
