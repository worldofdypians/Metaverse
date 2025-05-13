import React, { useState } from "react";
import "./_dailyquestion.scss";
import DailyQuestionHero from "./DailyQuestionHero";
import { handleSwitchNetworkhook } from "../../hooks/hooks";

const DailyQuestion = ({
  isConnected,
  onConnectWallet,
  handleSwitchNetwork,
  network_matchain,
  chainId,
}) => {
  const [unlock, setUnlock] = useState(false);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(false);

  const answers = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Reiciendis quis repellat quam fugiat voluptatum nobis aliquid abmollitia similique. Delectus!",
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

  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else {
      await handleSwitchNetworkhook("0x38")
        .then(() => {
          handleSwitchNetwork("56");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <DailyQuestionHero />
      <div class="custom-container">
        <div class="row g-4 align-items-stretch mt-4">
          <div class="col-md-12">
            <div class="question-wrapper h-100 d-flex align-items-center justify-content-center">
              {!isConnected ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={onConnectWallet}
                >
                  Connect Wallet
                </button>
              ) : isConnected && chainId != 56 ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={handleEthPool}
                >
                  Switch to BNB Chain
                </button>
              ) : !unlock ? (
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={() => setUnlock(true)}
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
          {unlock && (
            <div class="col-md-12">
              <div class="answers-grid">
                {answers.map((item, index) => (
                  <div
                    class={`answer-card ${
                      selected === index && item.correct === false
                        ? "answer-card-incorrect"
                        : selected === index && item.correct === true
                        ? "answer-card-correct"
                        : ""
                    } 
                    ${answered && "disabled-answer"}
                    ${index === selected && "disabled-answer-selected"}
                    
                    `}
                    style={{
                      pointerEvents: answered ? "none" : "auto",
                      opacity: index === selected ? "1" : "0.8",
                    }}
                    key={index}
                    onClick={() => {
                      setSelected(index);
                      setAnswered(true);
                    }}
                  >
                    <p class="answer-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyQuestion;
