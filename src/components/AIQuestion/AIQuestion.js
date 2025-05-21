import "./_aiquestion.scss";
import { useState } from "react";

const AIQuestion = () => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div>
      {step === 0 ? (
        <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
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
          <button
            className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
            onClick={() => setStep(1)}
          >
            Unlock Question
          </button>
        </div>
      ) : step === 1 ? (
        <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
          <span className="aiLockedQuestion text-transform-none mb-3">
            Which was the first crypto introduced in the world?
          </span>
          <div
            className="answer-outer-wrapper w-100"
            onClick={() => setSelectedOption(0)}
          >
            <div
              className={`${
                selectedOption === 0
                  ? "answer-inner-wrapper-active"
                  : "answer-inner-wrapper"
              } px-3 py-2 d-flex align-items-center justify-content-between`}
            >
              <span className="answer-text">Bitcoin (BTC)</span>
              <span
                className={`radio-button-option ${
                  selectedOption === 0 ? "radio-button-option-selected" : ""
                }`}
              ></span>
            </div>
          </div>
          <div
            className="answer-outer-wrapper w-100"
            onClick={() => setSelectedOption(1)}
          >
            <div
              className={`${
                selectedOption === 1
                  ? "answer-inner-wrapper-active"
                  : "answer-inner-wrapper"
              } px-3 py-2 d-flex align-items-center justify-content-between`}
            >
              <span className="answer-text">Ethereum (ETH)</span>
              <span
                className={`radio-button-option ${
                  selectedOption === 1 ? "radio-button-option-selected" : ""
                }`}
              ></span>
            </div>
          </div>
          <div
            className="answer-outer-wrapper w-100"
            onClick={() => setSelectedOption(2)}
          >
            <div
              className={`${
                selectedOption === 2
                  ? "answer-inner-wrapper-active"
                  : "answer-inner-wrapper"
              } px-3 py-2 d-flex align-items-center justify-content-between`}
            >
              <span className="answer-text">Binance Coin (BNB)</span>
              <span
                className={`radio-button-option ${
                  selectedOption === 2 ? "radio-button-option-selected" : ""
                }`}
              ></span>
            </div>
          </div>
          {selectedOption !== undefined && (
            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
              <span className="aiLockedDesc">Are you sure?</span>
              <button
                className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2 mt-3"
                onClick={() => setStep(2)}
              >
                Submit Answer
              </button>
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
