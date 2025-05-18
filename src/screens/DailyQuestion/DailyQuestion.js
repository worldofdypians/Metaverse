import React, { useState, useRef } from "react";
import "./_dailyquestion.scss";
import DailyQuestionHero from "./DailyQuestionHero";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Countdown from "react-countdown";

const DailyQuestion = ({
  isConnected,
  onConnectWallet,
  handleSwitchNetwork,
  network_matchain,
  chainId,
}) => {
  /* ─────────────────────────
     STATE
  ──────────────────────────*/
  const [unlock, setUnlock] = useState(false); // has the user unlocked the Q?
  const [selected, setSelected] = useState(null); // which answer index?
  const [answered, setAnswered] = useState(false); // has the user submitted?
  const [timerDone, setTimerDone] = useState(false); // did the countdown finish?

  // one‑time finish timestamp for the countdown (15 s after unlocking)
  const finishAtRef = useRef(null);

  /* ─────────────────────────
     DATA
  ──────────────────────────*/
  const answers = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Reiciendis quis repellat quam fugiat voluptatum nobis aliquid ab mollitia similique. Delectus!",
      correct: false,
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, ipsum?",
      correct: true,
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore necessitatibus reprehenderit consequatur eaque tempora, veritatis est quia ad exercitationem quisquam maxime assumenda culpa at, mollitia similique sit. Consectetur, ut cum?",
      correct: false,
    },
  ];

  /* ─────────────────────────
     NETWORK HANDLER
  ──────────────────────────*/
  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else {
      try {
        await handleSwitchNetworkhook("0x38");
        handleSwitchNetwork("56");
      } catch (e) {
        console.error(e);
      }
    }
  };

  /* ─────────────────────────
     START QUESTION
  ──────────────────────────*/
  const startQuestion = () => {
    setUnlock(true);
    setAnswered(false);
    setSelected(null);
    setTimerDone(false);
    finishAtRef.current = Date.now() + 15_000; // 15 s target
  };

  const reveal = answered || timerDone; // true only after submit or timeout

  const isSelectionCorrect = selected !== null && answers[selected].correct;

  /* ─────────────────────────
     COUNTDOWN RENDERER
  ──────────────────────────*/
  const renderer = ({ seconds, completed }) =>
    completed ? (
      <p className="answer-text">Time's up! Better luck next time</p>
    ) : (
      <p className="answer-text">{seconds} seconds left</p>
    );

  return (
    <div className="d-flex flex-column align-items-center">
      <DailyQuestionHero />

      <div className="custom-container">
        <div className="row g-4 align-items-stretch mt-4">
          {/* ── TOP BUTTON / QUESTION ───────────────────── */}
          <div className="col-md-12">
            <div className="question-wrapper h-100 d-flex align-items-center justify-content-center">
              {!isConnected ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={onConnectWallet}
                >
                  Connect Wallet
                </button>
              ) : isConnected && chainId !== 56 ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={handleEthPool}
                >
                  Switch to BNB Chain
                </button>
              ) : !unlock ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={startQuestion}
                >
                  Unlock Question
                </button>
              ) : (
                <h6 className="question-title text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta temporibus harum numquam, nihil aliquid animi minima
                  quis officiis sed qui?
                </h6>
              )}
            </div>
          </div>

          {/* ── COUNTDOWN + ANSWERS ───────────────────── */}
          {unlock && (
            <div className="col-md-12">
              {/*  A.  TIMER or RESULT MESSAGE  */}
              {!reveal ? (
                /* 1. Countdown still running */
                <div
                  className="countdown-card mb-3"
                  style={{ pointerEvents: "none" }}
                >
                  <Countdown
                    key={finishAtRef.current}
                    date={finishAtRef.current}
                    renderer={renderer}
                    onComplete={() => setTimerDone(true)}
                  />
                </div>
              ) : answered ? (
                /* 2. Answer submitted → show correct / incorrect */
                <div className="countdown-card mb-3 d-flex justify-content-center align-items-center">
                  <p className="answer-text m-0">
                    {isSelectionCorrect ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                </div>
              ) : (
                /* 3. Timer finished, no answer → still show “Time's up!” */
                <div className="countdown-card mb-3 d-flex justify-content-center align-items-center">
                  <p className="answer-text m-0">Time's up!</p>
                </div>
              )}

              {/*  B.  ANSWERS GRID  */}
              <div className="answers-grid">
                {answers.map((item, index) => {
                  const isSelected = selected === index;
                  const isCorrect = item.correct;

                  return (
                    <div
                      key={index}
                      className={
                        "answer-card " +
                        (reveal && isCorrect ? "answer-card-correct " : "") +
                        (reveal && !isCorrect ? "answer-card-incorrect " : "") +
                        (answered || timerDone ? "disabled-answer " : "") +
                        (isSelected ? "selected-answer" : "")
                      }
                      style={{
                        pointerEvents: reveal ? "none" : "auto",
                        opacity: isSelected ? 1 : 0.8,
                      }}
                      onClick={() => !reveal && setSelected(index)}
                    >
                      <p className="answer-text">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SUBMIT BUTTON ───────────────────── */}
          {unlock && !reveal && (
            <div className="d-flex flex-column gap-2 w-100 align-items-center">
              {selected !== null && (
                <span className="question-sure text-center">Are you sure?</span>
              )}
              <button
                disabled={selected === null}
                className="explore-btn px-3 py-2"
                onClick={() => setAnswered(true)}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyQuestion;
