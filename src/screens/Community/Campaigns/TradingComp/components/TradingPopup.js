import React, { useEffect, useState } from "react";
import "../_tradingcomp.scss";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";

const TradingPopup = ({ onClose, coinbase }) => {
  const [leaderboardWeek, setLeaderboardWeek] = useState(1);
  const [loading, setLoading] = useState(false);
  const currentWeek = 12;
  const leaderboardArray = Array.from({ length: 12 }, (_, i) => i + 1);
  const [participants, setParticipants] = useState([]);

  const rewards = [
    700, 600, 500, 450, 400, 350, 300, 200, 180, 120, 70, 70, 70, 70, 70, 70,
    70, 70, 70, 70, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  ];

  const fetchWinners = async (week) => {
    setLoading(true);
    await axios
      .get(`https://api.worldofdypians.com/api/get_leaderboards/${week}`)
      .then((res) => {
        setParticipants(res.data.data?.trading);

        setLeaderboardWeek(week);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        setParticipants([]);
        console.log(err, "error");
      });
  };

  useEffect(() => {
    setLeaderboardWeek(currentWeek - 1);
    fetchWinners(currentWeek - 1);
  }, [currentWeek]);

  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none" }}
    >
      <div class="overlay-shadow-2"></div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <h6 className="trading-popup-title mb-0">Trading Competition</h6>
        <img
          src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="airdrop-weeks-grid mt-3">
        {leaderboardArray.map((item, index) => (
          <div
            key={index}
            className={` ${
              item >= currentWeek
                ? "trading-comp-lb-button"
                : "trading-comp-lb-button-past"
            } ${
              leaderboardWeek === item && "leaderboard-active"
            } px-2 py-2 d-flex align-items-center justify-content-center`}
            onClick={() => {
              setLeaderboardWeek(item);
              fetchWinners(item);
            }}
            style={{ fontSize: "13px" }}
          >
            Week {item}
          </div>
        ))}
      </div>
      {loading ? (
        <div
          className="d-flex trading-comp-overflow-2 align-items-center justify-content-center mt-3"
          style={{ height: "470px" }}
        >
          <div
            className="spinner-border spinner-border-sm text-light"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {participants.length > 0 ? (
            <div className="d-flex trading-comp-overflow-2 flex-column gap-2 mt-3">
              {participants.map((item, index) => (
                <div className="d-flex align-items-center gap-2">
                  <div className="trading-comp-lb-rank d-flex align-items-center justify-content-center">
                    {index + 1}
                  </div>
                  <div
                    className={`trading-comp-lb-item-2 ${
                      coinbase === item && "trading-comp-lb-item-player"
                    } p-2 d-flex w-100 align-items-center justify-content-between`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      🎉
                      <span>
                        {shortAddress(item)} {coinbase === item && "(You)"}
                      </span>
                    </div>
                    <span className="trading-comp-lb-prize">
                      ${getFormattedNumber(rewards[index], 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="trading-comp-wrapper d-flex flex-column gap-2 align-items-center justify-content-center w-100 h-75 mt-3">
              ⌛
              <span className="no-winners-text">
                Winners will be displayed once Week {leaderboardWeek}{" "}
                competition ends.
              </span>
              <span className="no-winners-text">
                Rewards will be distributed within 1–3 days after winner
                announcement.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TradingPopup;
