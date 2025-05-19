import React, { useEffect, useRef, useState } from "react";
import "../_tradingcomp.scss";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import axios from "axios";

const AirdropPopup = ({ onClose, coinbase }) => {
  const [airdropWeek, setAirdropWeek] = useState(1);
  const [loading, setLoading] = useState(false);
  const currentWeek = 5;
  const airdropArray = Array.from({ length: 12 }, (_, i) => i + 1);
  const [participants, setParticipants] = useState([]);

  const fetchWinners = async (week) => {
    setLoading(true);
    await axios
      .get(`https://api.worldofdypians.com/api/get_leaderboards/${week}`)
      .then((res) => {
        setParticipants([...res.data.data?.airdrop?.group1,...res.data.data?.airdrop?.group2,...res.data.data?.airdrop?.group3]);
        console.log(res.data.data?.airdrop?.group1, "data");

        setAirdropWeek(week);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        setParticipants([]);
        console.log(err, "error");
      });
  };


  const scrollRef = useRef(null);

  const [slice, setSlice] = useState(300);

  const onScrollEnd = () => {
    setSlice(slice + 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (el) {
        const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
        if (isBottom) {
          onScrollEnd && onScrollEnd(); // Dispatch your function
        }
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onScrollEnd]);




  useEffect(() => {
    setAirdropWeek(currentWeek - 1);
    fetchWinners(currentWeek - 1);
  }, [currentWeek]);

  return (
    <div
      className="trading-popup-wrapper popup-active p-3"
      style={{ background: "#18193C", border: "none" }}
    >
      <div class="overlay-shadow-2"></div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <h6 className="trading-popup-title mb-0">Weekly Airdrops</h6>
        <img
          src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>

      <div className="airdrop-weeks-grid mt-3">
        {airdropArray.map((item, index) => (
          <div
            key={index}
            className={` ${
              item >= currentWeek
                ? "trading-comp-lb-button"
                : "trading-comp-lb-button-past"
            } ${
              airdropWeek === item && "leaderboard-active"
            } px-2 py-2 d-flex align-items-center justify-content-center`}
            onClick={() => {
              fetchWinners(item);
              setAirdropWeek(item);
            }}
            style={{ fontSize: "13px" }}
          >
            Week {item}
          </div>
        ))}
      </div>
      <div className="trading-comp-divider mt-3"></div>
      {loading ? (
        <div
          className="d-flex trading-comp-overflow-2 align-items-center justify-content-center mt-3"
        ref={scrollRef}
          
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
                    <span className="trading-comp-lb-prize">{index <= 99 ? "$20" : index <= 699 ? "$10" : "$5"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="trading-comp-wrapper d-flex flex-column gap-2 align-items-center justify-content-center w-100 h-75 mt-3">
              ⌛
              <span className="no-winners-text">
                Winners will be displayed once Week {airdropWeek} competition
                ends.
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

export default AirdropPopup;
