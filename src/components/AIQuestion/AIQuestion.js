import { NavLink } from "react-router-dom";
import "./_aiquestion.scss";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3 from "web3";

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
}) => {
  const answersOptions = [0, 1, 2, 3];
  const totalTime = 25;
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState("initial");

  const radius = 35;
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
    <div className="d-flex w-100 gap-2">
      <div className="d-flex flex-column gap-2 col-lg-3 position-relative">
        <div className="ai-oryn-top">
          <img src={'https://cdn.worldofdypians.com/wod/ai-oryn-border.webp'} alt='' className="ai-oryn-border" />
          <span className="ai-oryn-text">Hi there</span>
          <span className="ai-oryn-text">I am Oryn</span>
          <span className="ai-oryn-text">How do you feel today?</span>

        </div>
        <div className="ai-oryn-bottom"></div>

      </div>
      <div
        className="d-flex flex-column justify-content-between gap-3"
        style={{ flex: 1 }}
      >
        <div className="d-flex pt-lg-2 pt-3 align-items-center gap-2 justify-content-between">
          <button
            className={
              chainId === 56
                ? "ai-chain-button-active py-2 px-3"
                : "ai-chain-button py-2 px-3"
            }
            onClick={() => {
              handleBnbPool("0x38", 56);
            }}
          >
            <div className="d-flex align-items-center gap-2 justify-content-between">
              {/* <img
              src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
              alt=""
              className="ai-chain-icon"
            /> */}
              BNB CHAIN
            </div>
          </button>
          <button
            className={
              chainId === 204
                ? "ai-chain-button-active py-2 px-3"
                : "ai-chain-button py-2 px-3"
            }
            onClick={() => {
              handleBnbPool("0xcc", 204);
            }}
          >
            <div className="d-flex align-items-center gap-2 justify-content-between">
              {/* <img
              src={"https://cdn.worldofdypians.com/wod/opbnbChain.png"}
              alt=""
              className="ai-chain-icon"
            /> */}
              OPBNB
            </div>
          </button>
        </div>
        {step === 0 ? (
          <div
            className="d-flex flex-column gap-2 align-items-center justify-content-between"
            style={{ flex: 1 }}
          >
            <div className="d-flex flex-column gap-3 align-items-center justify-content-between">
              <img
                src={"https://cdn.worldofdypians.com/wod/aiLocked.webp"}
                alt=""
                className="aiLockedImg"
              />
              <span className="aiLockedQuestion">A Hidden question awaits</span>
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
            </div>
            {!email && coinbase && (
              <NavLink
                className="ai-main-button text-uppercase d-flex align-items-center gap-2 px-lg-0 px-4 col-lg-3 justify-content-center py-2"
                to="/auth"
                onClick={() => onClose()}
              >
                Log in
              </NavLink>
            )}
            {!isConnected && !coinbase && (
              <button
                className="ai-main-button text-uppercase d-flex align-items-center gap-2 px-lg-0 px-4 col-lg-3 justify-content-center py-2"
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
                  className="ai-main-button text-uppercase d-flex align-items-center gap-2 px-lg-0 px-4 col-lg-3 justify-content-center py-2"
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
              (chainId === 56 || chainId === 204) && (
                <button
                  className="ai-main-button text-uppercase d-flex align-items-center gap-2 px-lg-0 px-4 col-lg-3 justify-content-center py-2"
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
                    <>Unlock</>
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
          </div>
        ) : step === 1 ? (
          <div
            className="d-flex flex-column gap-2 align-items-center justify-content-between"
            style={{ flex: 1 }}
          >
            <div className="d-flex flex-column gap-3 align-items-center justify-content-between">
              <div className="d-flex flex-column position-relative w-100 align-items-center">
                {/* <div className="ai-countdown-wrapper px-0">
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
              </div> */}

                <div className="ai-timer-container">
                  <svg className="ai-progress-ring" width="80" height="80">
                    <circle
                      className="ai-ring-bg"
                      stroke="#343661"
                      fill="transparent"
                      r={radius}
                      cx="40"
                      cy="40"
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
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      r={radius}
                      cx="40"
                      cy="40"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#D4CF4E" />
                        <stop offset="100%" stopColor="#4ED4D0" />
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
        )}
      </div>
    </div>
  );
};

export default AIQuestion;
