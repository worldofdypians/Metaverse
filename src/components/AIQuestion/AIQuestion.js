import { NavLink } from "react-router-dom";
import "./_aiquestion.scss";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import DynamicSpan from "./DynamicSpan";
import ClosePopup from "./ClosePopup";
// import useWindowSize from "../../hooks/useWindowSize";
import buttonHover from "./assets/buttonHover.mp3";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

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
  clockSoundRef,
  closePopup,
  setClosePopup,
  getAiStep,
  aiQuestionRewards,
  aiQuestionObjectAnswered,
  onQuestionReveal,
}) => {
  const clickSound = "https://cdn.worldofdypians.com/wod/aiOryn/click.mp3";
  const drumrollSound =
    "https://cdn.worldofdypians.com/wod/aiOryn/drumroll.mp3";
  const failSound =
    "https://cdn.worldofdypians.com/wod/aiOryn/wrongAnswer3.mp3";
  const gamestartSound =
    "https://cdn.worldofdypians.com/wod/aiOryn/gamestart.mp3";
  const successSound =
    "https://cdn.worldofdypians.com/wod/aiOryn/correctAnswer3.mp3";
  const timerEndedSound =
    "https://cdn.worldofdypians.com/wod/aiOryn/timerEnded.mp3";
  const avatarCorrect =
    "https://cdn.worldofdypians.com/wod/aiOryn/avatarCorrect.gif";
  const avatarWrong =
    "https://cdn.worldofdypians.com/wod/aiOryn/avatarWrong.gif";
  const avatarIdle = "https://cdn.worldofdypians.com/wod/aiOryn/avatarIdle.gif";
  const avatarTime = "https://cdn.worldofdypians.com/wod/aiOryn/avatarTime.gif";

  const answersOptions = [0, 1, 2, 3];
  const answers = ["A", "B", "C", "D"];
  // const windowSize = useWindowSize();
  const totalTime = 20;

  // const TYPING_SPEED_PER_CHAR = 0.05;
  // const BASE_DELAY = 1.5;

  const [step, setStep] = useState(0);
  const [aiQuestionObject, setAiQuestionObject] = useState({
    question: "",
    options: [],
    id: "",
  });
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [optionsClickable, setOptionsClickable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [confirmed, setConfirmed] = useState(false);
  const [questionTxHash, setquestionTxHash] = useState("");
  const [questionRewards, setquestionRewards] = useState([]);

  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState("initial");
  const [activeClass, setActiveClass] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [pause, setPause] = useState(false);
  const [pulse, setPulse] = useState(false);

  const [avatarState, setAvatarState] = useState("idle");
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const intervalRef = useRef(null);
  const hasTimedOut = useRef(false);
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
    "Brains or luck,pick one now!",
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
    "Can you outsmart the game?",
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
  };

  const getAIQuestion = async (chain, txHash) => {
    setquestionTxHash(txHash);
    const data = {
      walletAddress: coinbase,
      email: email,
      chain: chain,
      transactionHash: txHash,
    };

    new Audio(gamestartSound).play();

    const result = await axios
      .post(`https://api.worldofdypians.com/api/qa/request`, data)
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      const cleanedAnswers = result.data.answers.map((answer) =>
        answer.replace(/^[A-D][.)]\s*/, "")
      );
      onQuestionReveal({
        question: result.data.question,
        options: cleanedAnswers,
        id: result.data.questionId,
      });

      setAiQuestionObject({
        question: result.data.question,
        options: cleanedAnswers,
        id: result.data.questionId,
      });

      const timer = setTimeout(() => {
        setStep(1);
        setUnlockStatus("initial");
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleUnlockQuestion = async () => {
    setUnlockLoading(true);
    setUnlockStatus("loading");
    let web3 = new Web3(window.ethereum);
    const contract_bnb = new web3.eth.Contract(
      window.DAILY_QUESTION_ABI,
      window.config.daily_question_bnb_address
    );

    const contract_opbnb = new web3.eth.Contract(
      window.DAILY_QUESTION_ABI,
      window.config.daily_question_opbnb_address
    );

    if (chainId === 56) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 0.5;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await contract_bnb.methods
          .openDailyQuestion()
          .estimateGas({ from: coinbase })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await contract_bnb.methods
          .openDailyQuestion()
          .send({
            from: coinbase,
            ...transactionParameters,
          })
          .then((data) => {
            setUnlockLoading(false);
            setUnlockStatus("success");
            getAIQuestion(
              chainId === 56 ? "bnb" : "opbnb",
              data.transactionHash
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            setUnlockLoading(false);
            setUnlockStatus("error");
            console.error(e);
            const timer = setTimeout(() => {
              setUnlockStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient
            .writeContract({
              address: window.config.daily_question_bnb_address,
              abi: window.DAILY_QUESTION_ABI,
              functionName: "openDailyQuestion",
              args: [],
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              setUnlockLoading(false);
              setUnlockStatus("error");
              console.error(e);
              const timer = setTimeout(() => {
                setUnlockStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
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
              getAIQuestion("bnb", result);
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        const contract_bnb_binance = new ethers.Contract(
          window.config.daily_question_bnb_address,
          window.DAILY_QUESTION_ABI,
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
          gasLimit = await contract_bnb_binance.estimateGas.openDailyQuestion();
          transactionParameters.gasLimit = gasLimit;
          console.log("transactionParameters", transactionParameters);
        } catch (error) {
          console.error(error);
        }

        const txResponse = await contract_bnb_binance
          .openDailyQuestion({ ...transactionParameters })
          .catch((e) => {
            window.alertify.error(e?.message);
            setUnlockLoading(false);
            setUnlockStatus("error");
            console.error(e);
            const timer = setTimeout(() => {
              setUnlockStatus("initial");
            }, 3000);

            return () => clearTimeout(timer);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          getAIQuestion(chainId === 56 ? "bnb" : "opbnb", txReceipt.hash);
          setUnlockLoading(false);
          setUnlockStatus("success");
        }
      }
    } else if (chainId === 204) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 0.5;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await contract_opbnb.methods
          .openDailyQuestion()
          .estimateGas({ from: coinbase })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await contract_opbnb.methods
          .openDailyQuestion()
          .send({
            from: coinbase,
            ...transactionParameters,
          })
          .then((data) => {
            setUnlockLoading(false);
            setUnlockStatus("success");

            getAIQuestion("opbnb", data.transactionHash);
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            setUnlockLoading(false);
            setUnlockStatus("error");
            console.error(e);
            const timer = setTimeout(() => {
              setUnlockStatus("initial");
            }, 3000);

            return () => clearTimeout(timer);
          });
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient
            .writeContract({
              address: window.config.daily_question_opbnb_address,
              abi: window.DAILY_QUESTION_ABI,
              functionName: "openDailyQuestion",
              args: [],
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              setUnlockLoading(false);
              setUnlockStatus("error");
              console.error(e);
              const timer = setTimeout(() => {
                setUnlockStatus("initial");
              }, 3000);

              return () => clearTimeout(timer);
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
              getAIQuestion("opbnb", result);
              setUnlockLoading(false);
              setUnlockStatus("success");
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        const contract_opbnb_binance = new ethers.Contract(
          window.config.daily_question_opbnb_address,
          window.DAILY_QUESTION_ABI,
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
          gasLimit =
            await contract_opbnb_binance.estimateGas.openDailyQuestion();
          transactionParameters.gasLimit = gasLimit;
          console.log("transactionParameters", transactionParameters);
        } catch (error) {
          console.error(error);
        }

        const txResponse = await contract_opbnb_binance
          .openDailyQuestion({ ...transactionParameters })
          .catch((e) => {
            window.alertify.error(e?.message);
            setUnlockLoading(false);
            setUnlockStatus("error");
            const timer = setTimeout(() => {
              setUnlockStatus("initial");
            }, 3000);

            return () => clearTimeout(timer);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setUnlockLoading(false);
          setUnlockStatus("success");
          getAIQuestion("opbnb", txReceipt.hash);
        }
      }
    }
  };

  const getQuestionRewards = async (email, txHash, chain, correctAnswer) => {
    const data = {
      emailAddress: email,
      transactionHash: txHash,
      chainId: chain,
      correctAnswer: true,
    };

    const result = await axios
      .post(
        `https://worldofdypiansdailybonus.azurewebsites.net/api/AnswerDailyQuestion?code=6T7eOTFcMi0c71I-HQoVeCL1GUcZi7-akH6ZPBVcLBsnAzFu_Dj9IQ==`,
        data
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data.status === "Success") {
        setquestionRewards(result.data.reward);

        setSelectedAnswer(correctAnswer);
        new Audio(successSound).play();
        setAvatarState("correct");

        onQuestionComplete(true);
        // const resetTimer = setTimeout(() => {
        //   setSelectedAnswer(undefined);
        //   setSelectedOption(undefined);
        //   onQuestionComplete(false);
        //   setStep(0);
        //   setConfirmed(false);
        //   setTimeLeft(totalTime);
        //   setOptionsClickable(false);
        // }, 10000);
      }
    }
  };

  const checkAnswer = async () => {
    setPulse(true);
    const data = {
      walletAddress: coinbase,
      email: email,
      chain: chainId === 56 ? "bnb" : "opbnb",
      questionId: aiQuestionObject.id,
      answerIndex: answers.indexOf(selectedOption),
    };

    const result = await axios
      .post(`https://api.worldofdypians.com/api/qa/answer`, data)
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      console.log(result.data);
      setPause(false);
      const isCorrect = result.data.correct;

      setShowSelect(false);

      if (isCorrect) {
        getQuestionRewards(
          email,
          questionTxHash,
          chainId === 56 ? "bnb" : "opbnb",
          answers[result.data.correctIndex]
        );
      } else {
        setSelectedAnswer(answers[result.data.correctIndex]);
        new Audio(failSound).play();
        setAvatarState("wrong");
        // const timer = setTimeout(() => {
        //   setAvatarState("idle");
        // }, 5040);

        onQuestionComplete(true);
        // const resetTimer = setTimeout(() => {
        //   setSelectedAnswer(undefined);
        //   setSelectedOption(undefined);
        //   onQuestionComplete(false);
        //   setStep(0);
        //   setConfirmed(false);
        //   setTimeLeft(totalTime);
        //   setOptionsClickable(false);
        // }, 10000);

        // return () => {
        // clearTimeout(timer);
        // clearTimeout(resetTimer);
        // };
      }
    }
  };

  const checkAnswerTimeout = async () => {
    const data = {
      walletAddress: coinbase,
      email: email,
      chain: chainId === 56 ? "bnb" : "opbnb",
      questionId: aiQuestionObject.id,
      answerIndex: 4,
    };

    const result = await axios
      .post(`https://api.worldofdypians.com/api/qa/answer`, data)
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      console.log(result.data);
      setPause(false);
      setShowSelect(false);
      setSelectedAnswer(answers[result.data.correctIndex]);
      setConfirmed(true);
      suspenseMusicRef.current?.pause();
      suspenseMusicRef.current.currentTime = 0;
      setSuspenseSound(true);
      new Audio(timerEndedSound).play();
      setAvatarState("time");
      onQuestionComplete(true);
      // const timer = setTimeout(() => {
      //   setAvatarState("idle");
      // }, 5040);

      // return () => {
      //   clearTimeout(timer);
      // };
    }
  };

  const handleOptionClick = (value) => {
    setPause(true);
    setSuspenseSound(true);
    suspenseMusicRef.current?.pause();
    clockSoundRef.current?.pause();
    suspenseMusicRef.current.currentTime = 0;
    handleConfirm();
    new Audio(drumrollSound).play();
    // const timer = setTimeout(() => {
    checkAnswer();
    // }, 2000);
    // return () => clearTimeout(timer);
  };

  const getAnswerClass = (option) => {
    if (selectedOption === undefined && selectedAnswer === undefined)
      return "answer-inner-wrapper";

    if (option === selectedAnswer && selectedOption === undefined) {
      return "answer-inner-wrapper-disabled"; //not selected, time's up
    }
    if (selectedOption === undefined && selectedAnswer !== undefined)
      return "answer-inner-wrapper-disabled"; //not selected, time's up

    if (selectedAnswer === undefined) {
      return selectedOption === option
        ? "answer-inner-wrapper-active"
        : "answer-inner-wrapper";
    }

    if (option === selectedOption && option === selectedAnswer) {
      return "answer-inner-wrapper-answer"; // selected and correct
    }

    if (option === selectedAnswer && option !== selectedOption) {
      return "answer-inner-wrapper-answer"; // selected and correct
    }

    if (option === selectedOption && option !== selectedAnswer) {
      return "answer-inner-wrapper-active"; // selected and wrong
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

    if (confirmed && selectedAnswer !== undefined) {
      return option === selectedAnswer
        ? "radio-button-option-correct"
        : "radio-button-option-wrong";
    }
    if (confirmed && selectedAnswer === undefined) {
      if (option === selectedAnswer) return "radio-button-option-correct";
      if (option === selectedOption) return "radio-button-option-selected";
      if (option !== selectedOption) return "radio-button-option";
    }

    return "radio-button-option-incorrect-unselected";
  };
  const handleTimeout = () => {
    if (hasTimedOut.current) return;
    hasTimedOut.current = true;
    if (selectedOption === undefined || selectedAnswer === undefined) {
      checkAnswerTimeout();
    }
  };
  useEffect(() => {
    if (
      step === 1 &&
      optionsClickable &&
      aiQuestionObjectAnswered.question === ""
    ) {
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
  }, [timeLeft, confirmed, step, optionsClickable, aiQuestionObjectAnswered]);

  useEffect(() => {
    if (step === 1 && aiQuestionObjectAnswered.question === "") {
      const lastFadeInTime = (answersOptions.length - 1) * 0.5 + 0.7 + 0.6;

      const timer = setTimeout(() => {
        setOptionsClickable(true);
      }, lastFadeInTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [step, answersOptions, aiQuestionObjectAnswered]);

  useEffect(() => {
    if (
      timeLeft === 20 &&
      step === 1 &&
      aiQuestionObjectAnswered.question === "" &&
      suspenseMusicRef.current
    ) {
      suspenseMusicRef.current?.play();
    }
    // if (timeLeft === 8 && step === 1) {
    //   suspenseMusicRef.current?.pause();
    //   clockSoundRef.current?.play();
    // }
    // if (timeLeft === 0) {
    //   suspenseMusicRef.current?.pause();
    //   suspenseMusicRef.current.currentTime = 0;
    //   setSuspenseSound(true);
    //   new Audio(timerEndedSound).play();
    //   setAvatarState("time");
    //   const timer = setTimeout(() => {
    //     setAvatarState("idle");
    //   }, 5040);
    //   return () => clearTimeout(timer);
    // }
  }, [timeLeft, step, aiQuestionObjectAnswered, suspenseMusicRef]);

  useEffect(() => {
    getAiStep(
      timeLeft === 0 ||
        aiQuestionObjectAnswered.question !== "" ||
        selectedAnswer !== undefined
        ? 0
        : step
    );
  }, [step, timeLeft, selectedAnswer]);

  useEffect(() => {
    if (
      (aiQuestionRewards && aiQuestionRewards.length > 0) ||
      aiQuestionObjectAnswered.question !== ""
    ) {
      setquestionRewards(aiQuestionRewards);
      setStep(1);
      setAiQuestionObject({
        question: aiQuestionObjectAnswered.question,
        options: aiQuestionObjectAnswered.options,
        id: "",
      });
      setSelectedAnswer(answers[aiQuestionObjectAnswered.correctIndex]);
      setSelectedOption(answers[aiQuestionObjectAnswered.userIndex]);

      setAvatarState(
        answers[aiQuestionObjectAnswered.correctIndex] ===
          answers[aiQuestionObjectAnswered.userIndex]
          ? "correct"
          : "wrong"
      );

      suspenseMusicRef.current?.pause();
      suspenseMusicRef.current.currentTime = 0;
    }
  }, [aiQuestionRewards, aiQuestionObjectAnswered]);

  const progress = timeLeft / totalTime;
  const dashOffset = circumference * (1 - progress);

  // console.log(selectedAnswer, selectedOption);
  return (
    <>
      <div className="d-flex w-100 gap-4 py-5 pt-3 pt-lg-0 py-lg-0">
        <div className="d-none d-lg-flex d-md-flex flex-column gap-2 col-lg-3 col-md-4 position-relative">
          <div className="ai-oryn-top">
            <div
              // src={orynBorder}
              // src={"https://cdn.worldofdypians.com/wod/ai-oryn-border.webp"}
              alt=""
              className="ai-oryn-border d-flex align-items-center justify-content-center"
            >
              <div
                className={`oryn-inner-border
              ${
                avatarState === "idle"
                  ? "gif-bg-idle"
                  : avatarState === "correct"
                  ? "gif-bg-correct"
                  : avatarState === "wrong"
                  ? "gif-bg-wrong"
                  : avatarState === "time"
                  ? "gif-bg-time"
                  : "gif-bg-idle"
              }
              
              `}
              >
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
                    avatarState === "idle" ||
                    aiQuestionObjectAnswered.question !== ""
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
            <span className="ai-oryn-text text-end">
              Hi{" "}
              <span className="ai-username ai-username text-uppercase">
                {username},
              </span>
            </span>
            <span className="ai-oryn-text text-end">{dailyMessage}</span>
          </div>
          <div className="ai-oryn-bottom">
            <div className="d-flex flex-column gap-2 p-4 h-100 justify-content-between">
              <div className=" gap-2 d-flex flex-column">
                <span className="ai-oryn-bottom-txt">
                  A daily challenge where each player can unlock a AI question
                  for a chance to win!
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
                  (selectedOption === selectedAnswer &&
                    selectedAnswer !== undefined &&
                    step === 1) ||
                  (questionRewards.find((item) => {
                    return item.rewardType === "Stars";
                  }) !== undefined &&
                    step === 1)
                    ? "ai-rewards-info-active"
                    : "ai-rewards-info"
                }
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
                        (selectedAnswer === undefined && step === 1) ||
                        (questionRewards.find((item) => {
                          return item.rewardType === "Stars";
                        }) !== undefined &&
                          step === 1)
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
                            step === 1) ||
                          (questionRewards.find((item) => {
                            return item.rewardType === "Stars";
                          }) !== undefined &&
                            step === 1)
                            ? "ai-rewards-title-active ps-3"
                            : "ai-rewards-title ps-3"
                        }
                      >
                        {/* {questionRewards.find((item) => {
                          return item.rewardType === "Stars";
                        }) !== undefined && step === 1
                          ? getFormattedNumber(
                              questionRewards.find((item) => {
                                return item.rewardType === "Stars";
                              }).reward,
                              0
                            )
                          : "Up to 100 - 500"}{" "} */}
                        Up to 500 Stars
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  (selectedOption === selectedAnswer &&
                    selectedAnswer !== undefined &&
                    step === 1) ||
                  (questionRewards.find((item) => {
                    return item.rewardType === "Points";
                  }) !== undefined &&
                    step === 1)
                    ? "ai-rewards-info-active"
                    : "ai-rewards-info"
                }
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
                        (selectedAnswer === undefined && step === 1) ||
                        (questionRewards.find((item) => {
                          return item.rewardType === "Points";
                        }) !== undefined &&
                          step === 1)
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
                          activeClass === "points" ||
                          (questionRewards.find((item) => {
                            return item.rewardType === "Points";
                          }) !== undefined &&
                            step === 1)
                            ? //|| step === 0 ||
                              // (selectedAnswer !== undefined && step === 1)
                              "ai-rewards-title-active ps-3"
                            : "ai-rewards-title ps-3"
                        }
                      >
                        {/* {questionRewards.find((item) => {
                          return item.rewardType === "Points";
                        }) !== undefined && step === 1
                          ? getFormattedNumber(
                              questionRewards.find((item) => {
                                return item.rewardType === "Points";
                              }).reward,
                              0
                            )
                          : "Up to 10,000 - 30,000"}{" "} */}
                        Up to 30,000 Points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  (selectedOption === selectedAnswer &&
                    selectedAnswer !== undefined &&
                    step === 1) ||
                  (questionRewards.find((item) => {
                    return item.rewardType === "Money";
                  }) !== undefined &&
                    step === 1)
                    ? "ai-rewards-info-active"
                    : "ai-rewards-info"
                }
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
                        (selectedAnswer === undefined && step === 1) ||
                        (questionRewards.find((item) => {
                          return (
                            item.rewardType === "Money" &&
                            item.status === "Claimed"
                          );
                        }) !== undefined &&
                          step === 1)
                          ? "ai-reward-logo-active"
                          : "ai-reward-logo"
                      }
                    />
                    <div className="d-flex flex-column">
                      {/* <span className={"ai-rewards-money"}>$1.5</span> */}
                      <span
                        className={
                          activeClass === "rewards" ||
                          (questionRewards.find((item) => {
                            return (
                              item.rewardType === "Money" &&
                              item.status === "Claimed"
                            );
                          }) !== undefined &&
                            step === 1)
                            ? // ||step === 0 ||
                              // (selectedAnswer !== undefined && step === 1)
                              "ai-rewards-title-active ps-3"
                            : "ai-rewards-title ps-3"
                        }
                      >
                        {" "}
                        {/* {questionRewards.find((item) => {
                          return (
                            item.rewardType === "Money" &&
                            item.status === "Claimed"
                          );
                        }) !== undefined && step === 1
                          ? "$" +
                            questionRewards.find((item) => {
                              return (
                                item.rewardType === "Money" &&
                                item.status === "Claimed"
                              );
                            }).reward
                          : "Up to $5 - $300"} */}
                        Up to $300
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
            <div className="d-flex flex-row align-items-center gap-2 justify-content-between w-100 overflow-auto">
              <div className="d-flex w-100 align-items-center gap-2 gap-lg-3 justify-content-lg-start justify-content-center">
                <button
                  className={
                    chainId === 56
                      ? "ai-chain-button-active py-3 px-3 col-5 col-lg-4"
                      : "ai-chain-button py-3 px-3 col-5 col-lg-4"
                  }
                  onClick={() => {
                    handleBnbPool("0x38", 56);
                  }}
                  disabled={timeLeft > 0 && step === 1}
                  style={{
                    pointerEvents: timeLeft > 0 && step === 1 ? "none" : "",
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
                      ? "ai-chain-button-active py-3 px-3 col-5  col-lg-4"
                      : "ai-chain-button py-3 px-3  col-5 col-lg-4"
                  }
                  onClick={() => {
                    handleBnbPool("0xcc", 204);
                  }}
                  disabled={timeLeft > 0 && step === 1}
                  style={{
                    pointerEvents: timeLeft > 0 && step === 1 ? "none" : "",
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
              <div
                className={`ai-timer-bg-wrapper px-3 py-1 col-lg-3 col-md-4 col-sm-3 col-2 ${
                  aiQuestionObjectAnswered.question !== "" &&
                  "invisible d-none d-lg-block"
                }`}
              >
                <div className="d-flex align-items-center w-100 gap-4 justify-content-center justify-content-lg-between justify-content-md-between">
                  <span className="ai-timer-title d-none d-lg-flex d-md-flex text-uppercase">
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
                          timeLeft > 12
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
            <div className="ai-separator my-2"></div>
          </div>
          {/* {step === 0 ? ( */}
          <div
            className="d-flex flex-column gap-4 align-items-center"
            style={{ flex: 1 }}
          >
            <div className="ai-answer-option-wrapper p-4 pt-0 position-relative w-100">
              <div className="ai-question-parent px-2">
                <div className="ai-question-text-wrapper justify-content-center align-items-center">
                  <span
                    className="aiLockedQuestion text-capitalize"
                    id="question"
                    style={{
                      animation:
                        step === 1 && aiQuestionObject.question !== ""
                          ? "fadeInAI2 0.5s ease-out forwards"
                          : "none",
                      opacity:
                        step === 1 &&
                        aiQuestionObject.question !== "" &&
                        aiQuestionObjectAnswered.question === ""
                          ? 0
                          : 1,
                      visibility: step === 0 ? "hidden" : "visible",
                    }}
                  >
                    {step === 1 && aiQuestionObject.question !== ""
                      ? aiQuestionObject.question.toString()
                      : ""}
                  </span>
                </div>
              </div>
              <div className="options-wrapper gap-2 gap-lg-3 w-100">
                {Array(4)
                  .fill("")
                  .map((option, index) => {
                    const animationDelay = `${index * 0.5 + 0.7}s`;

                    return (
                      <div
                        key={index}
                        className={`answer-outer-wrapper ${
                          (!optionsClickable ||
                            selectedAnswer !== undefined ||
                            timeLeft === 0 ||
                            confirmed ||
                            step === 0) &&
                          "pe-none"
                        }`}
                        onClick={() => {
                          step === 1 && setSelectedOption(answers[index]);
                          setShowSelect(true);

                          new Audio(clickSound).play();
                        }}
                      >
                        <div
                          className={`${getAnswerClass(
                            answers[index]
                          )} px-4 py-3 d-flex align-items-center justify-content-between  ${
                            answers[index] ===
                              answers[aiQuestionObjectAnswered.correctIndex] &&
                            pulse
                              ? "drumroll-background"
                              : ""
                          }   `}
                          onMouseEnter={() => {
                            new Audio(buttonHover).play();
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span
                              className="answer-text"
                              style={{ color: "#ffd37e" }}
                            >
                              {answers[index] + ":"}
                            </span>
                            <DynamicSpan
                              text={
                                step === 1 && aiQuestionObject.question !== ""
                                  ? aiQuestionObject.options[index]
                                  : "  "
                              }
                              id={`option${index + 1}`}
                              opacity={
                                step === 1 &&
                                aiQuestionObject.question !== "" &&
                                aiQuestionObjectAnswered.question === ""
                                  ? 0
                                  : 1
                              }
                              animation={
                                step === 1 &&
                                aiQuestionObject.question !== "" &&
                                aiQuestionObjectAnswered.question === ""
                                  ? `fadeInAI 0.5s ease-out ${animationDelay} forwards`
                                  : "none"
                              }
                            />
                          </div>
                          {/* {step === 1 && (
                        <span className={getRadioClass(answers[index])}></span>
                      )} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className={` ${
                (chainId !== 56 && chainId !== 204) ||
                !email ||
                !isConnected ||
                !coinbase ||
                (email &&
                  coinbase &&
                  address &&
                  address.toLowerCase() !== coinbase.toLowerCase() &&
                  step === 0)
                  ? "ai-answer-result-warning-wrapper"
                  : selectedAnswer === undefined && timeLeft === 0
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
              <span
                className={
                  step === 0
                    ? "aiLockedDesc"
                    : step === 1 &&
                      selectedOption !== undefined &&
                      selectedAnswer === undefined &&
                      showSelect &&
                      timeLeft !== 0
                    ? "w-100 px-4 aiAnswer-title d-flex align-items-center gap-2 justify-content-center"
                    : "aiAnswer-title"
                }
              >
                {(() => {
                  if (step === 0) {
                    if (!email && coinbase) return "Login to your game account";
                    if (!isConnected && !coinbase)
                      return "Connect your wallet to show the question";
                    if (
                      isConnected &&
                      coinbase &&
                      address &&
                      address.toLowerCase() === coinbase.toLowerCase() &&
                      email &&
                      chainId !== 56 &&
                      chainId !== 204
                    )
                      return "Switch to BNB Chain or opBNB to show the question";
                    if (
                      isConnected &&
                      coinbase &&
                      email &&
                      address &&
                      (chainId === 56 || chainId === 204) &&
                      address.toLowerCase() !== coinbase.toLowerCase()
                    )
                      return "Use the wallet associated to your game account.";
                    return "Complete the transaction to show the question";
                  }

                  if (
                    !showSelect &&
                    selectedOption === undefined &&
                    selectedAnswer === undefined &&
                    step === 1 &&
                    timeLeft !== 0
                  ) {
                    return "Select your answer";
                  }

                  if (
                    showSelect &&
                    selectedOption !== undefined &&
                    selectedAnswer === undefined &&
                    timeLeft !== 0 &&
                    step === 1
                  ) {
                    return (
                      <>
                        Is{" "}
                        <span
                          className="aiAnswer-title m-0"
                          style={{ color: "#ffd37e" }}
                        >
                          '{selectedOption}'
                        </span>{" "}
                        your Final answer?
                        <button
                          className="ai-question-confirm-answer px-3 py-1 d-flex align-items-center"
                          onClick={() => handleOptionClick(selectedOption)}
                        >
                          {pause ? (
                            <div
                              className="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Yes"
                          )}
                        </button>
                      </>
                    );
                  }

                  if (
                    (selectedAnswer === undefined &&
                      timeLeft === 0 &&
                      step === 1) ||
                    (aiQuestionObjectAnswered.question !== "" &&
                      aiQuestionObjectAnswered.userIndex === 4)
                  ) {
                    return "🐌 Too slow! Try again tomorrow.";
                  }

                  if (
                    selectedOption === selectedAnswer &&
                    selectedAnswer !== undefined &&
                    step === 1
                  ) {
                    return (
                      <>
                        🎉 You have earned{" "}
                        {questionRewards &&
                          questionRewards.length > 0 &&
                          questionRewards.map((obj, index) => {
                            return (
                              <span
                                className="aiAnswer-title me-1"
                                style={{ color: "#ffd37e" }}
                                key={index}
                              >
                                {obj.rewardType === "Money" && "$"}
                                {getFormattedNumber(
                                  obj.reward,
                                  obj.rewardType === "Money" ? 2 : 0
                                )}{" "}
                                {obj.rewardType !== "Money" && obj.rewardType}
                                {questionRewards.length > 1 &&
                                  index < questionRewards.length - 1 &&
                                  " + "}
                              </span>
                            );
                          })}
                        🎉
                      </>
                    );
                  }

                  if (
                    step === 1 &&
                    selectedAnswer &&
                    selectedOption &&
                    selectedAnswer !== selectedOption
                  ) {
                    return (
                      <>
                        🍀 You're getting there. Dig deeper into the{" "}
                        <a
                          href="https://www.bnbchain.org/en"
                          target="_blank"
                          className="aiAnswer-title m-0"
                          style={{
                            color: "#ffd37e",
                            textDecoration: "underline",
                          }}
                        >
                          BNB Chain ecosystem.
                        </a>
                        🍀
                      </>
                    );
                  }

                  return null;
                })()}
              </span>
            </div>
          </div>
        </div>
        <img
          src={"https://cdn.worldofdypians.com/wod/ai-main-button-active2.webp"}
          className="d-none"
          alt=""
        />
        <img
          src={"https://cdn.worldofdypians.com/wod/ai-main-button-error.webp"}
          className="d-none"
          alt=""
        />
        <img
          src={
            "https://cdn.worldofdypians.com/wod/ai-main-button-disabled.webp"
          }
          className="d-none"
          alt=""
        />
        <img
          src={
            "https://cdn.worldofdypians.com/wod/answer-inner-wrapper-answer.png"
          }
          className="d-none"
          alt=""
        />
        <img
          src={
            "https://cdn.worldofdypians.com/wod/answer-inner-wrapper-error.png"
          }
          className="d-none"
          alt=""
        />
        <div
          className={`ai-question-footer-wrapper-static ${
            isConnected &&
            (chainId === 56 || chainId === 204) &&
            coinbase &&
            email &&
            address &&
            step === 0 &&
            coinbase.toLowerCase() === address.toLowerCase()
              ? "ai-question-footer-wrapper"
              : coinbase &&
                isConnected &&
                address &&
                coinbase.toLowerCase() !== address.toLowerCase() &&
                email &&
                step === 0
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
              : (chainId !== 56 &&
                  chainId !== 204 &&
                  coinbase &&
                  isConnected) ||
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
          }`}
        >
          {!email && coinbase && (
            <NavLink
              className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              to="/auth"
              onClick={() => {
                onClose();
                suspenseMusicRef.current?.pause();
                clockSoundRef.current?.pause();
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
            chainId !== 204 &&
            step === 0 && (
              <button
                className="ai-main-button text-white text-uppercase d-flex align-items-center gap-2 col-lg-5 justify-content-center py-2"
                onClick={() => {
                  handleBnbPool("0x38", 56);
                }}
              >
                SWITCH CHAIN
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
                className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-5 justify-content-center py-2"
                onClick={() => handleUnlockQuestion()}
                disabled={
                  unlockStatus === "success" ||
                  unlockLoading ||
                  unlockStatus === "error"
                    ? true
                    : false
                }
              >
                {unlockLoading ? (
                  <div className="d-flex align-items-center gap-2 processing-fade">
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
            // && coinbase.toLowerCase() === address.toLowerCase()
            (chainId === 56 || chainId === 204) &&
            step === 1 && (
              <button
                className="processing-fade ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
                disabled
              >
                {(selectedOption === undefined &&
                  selectedAnswer === undefined &&
                  step === 1 &&
                  timeLeft === 0) ||
                (aiQuestionObjectAnswered.question !== "" &&
                  aiQuestionObjectAnswered.userIndex === 4)
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
            step === 0 &&
            coinbase.toLowerCase() !== address.toLowerCase() && (
              <button
                disabled
                className="ai-main-button text-uppercase d-flex align-items-center gap-2 col-lg-4 justify-content-center py-2"
              >
                Synchronize
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default AIQuestion;
