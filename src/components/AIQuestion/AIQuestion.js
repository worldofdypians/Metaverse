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
  const answersOptions = [0, 1, 2];
  const totalTime = 25;
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [confirmed, setConfirmed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState("initial");

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
      await contract_bnb.methods
        .openChest()
        .send({
          from: coinbase,
        })
        .then(() => {
          setUnlockLoading(false);
          setUnlockStatus("success");

          setTimeout(() => {
            setStep(1);
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

      const txResponse = await contract_bnb_binance.openChest().catch((e) => {
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
    }, 5000);
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

  const progressPercent = (timeLeft / totalTime) * 100;

  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      {step === 0 ? (
        <div
          className="d-flex flex-column my-4 gap-2 align-items-center justify-content-between"
          style={{ flex: 1 }}
        >
          <div className="d-flex flex-column gap-3 align-items-center justify-content-between">
            <img
              src={"https://cdn.worldofdypians.com/wod/aiLocked.webp"}
              alt=""
              className="aiLockedImg"
            />
            <span className="aiLockedQuestion">
              A Hidden question <br /> awaits
            </span>
            <span className="aiLockedDesc">
              Sign the transaction to reveal your daily question
            </span>
          </div>
          {!email && coinbase && (
            <NavLink
              className="explore-btn text-capitalize d-flex align-items-center gap-2 col-lg-4 py-2"
              to="/auth"
              onClick={() => onClose()}
            >
              Log in
            </NavLink>
          )}
          {!isConnected && !coinbase && (
            <button
              className="explore-btn text-capitalize d-flex align-items-center gap-2 col-lg-4 py-2"
              onClick={onConnectWallet}
            >
              Connect Wallet
            </button>
          )}

          {isConnected && coinbase && email && chainId !== 56 && (
            <button
              className="fail-button-gov text-capitalize d-flex align-items-center gap-2 py-2"
              onClick={() => handleBnbPool()}
            >
              Switch To BNB Chain
            </button>
          )}

          {isConnected && coinbase && email && chainId === 56 && (
            <button
              className="explore-btn text-capitalize d-flex align-items-center gap-2 col-lg-4 py-2"
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
                <>Unlock Question</>
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
          className="d-flex flex-column my-4 gap-2 align-items-center justify-content-between"
          style={{ flex: 1 }}
        >
          <div className="d-flex flex-column gap-3 align-items-center justify-content-between">
            <div className="d-flex flex-column position-relative w-100">
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
            <span className="aiLockedQuestion text-capitalize my-2">
              Which was the first crypto introduced in the world?
            </span>
            {answersOptions.map((option, index) => (
              <div
                key={index}
                className={`answer-outer-wrapper w-100 ${
                  (selectedAnswer !== undefined || timeLeft === 0) && "pe-none"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div
                  className={`${getAnswerClass(
                    option
                  )} px-3 py-2 d-flex align-items-center justify-content-between`}
                >
                  <span className="answer-text">
                    {option === 0
                      ? "Bitcoin (BTC)"
                      : option === 1
                      ? "Ethereum (ETH)"
                      : "Binance Coin (BNB)"}
                  </span>
                  <span className={getRadioClass(option)}></span>
                </div>
              </div>
            ))}
          </div>

          {selectedOption !== undefined &&
            selectedAnswer === undefined &&
            timeLeft > 0 && (
              <div className="d-flex flex-column gap-1 align-items-center justify-content-between">
                <span className="aiLockedDesc">Are you sure?</span>
                <button
                  className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2 mt-0"
                  onClick={() => {
                    handleOptionClick(selectedOption);
                  }}
                >
                  Submit Answer
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
  );
};

export default AIQuestion;
