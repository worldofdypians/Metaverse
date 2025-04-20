import React, { useEffect, useState } from "react";
import "./_tradingcomp.scss";
import tradingCompBanner from "./assets/tradingCompBanner.png";
import tradingCalendar from "./assets/tradingCalendar.svg";
import tradingCompChest from "./assets/tradingCompChest.png";
import tradingCompGift from "./assets/tradingCompGift.png";
import tradingCompLeaderboard from "./assets/tradingCompLeaderboard.png";
import tradingCompMedal from "./assets/tradingCompMedal.png";
import tradingCompLines from "./assets/tradingCompLines.svg";
import newTradingLines from "./assets/newTradingLines.svg";
import tradingCompCoin from "./assets/tradingCompCoin.svg";
import tradingCompDiamond from "./assets/tradingCompDiamond.svg";
import blueArrow from "./assets/blueArrow.svg";
import purpleArrow from "./assets/purpleArrow.svg";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import TradingPopup from "./components/TradingPopup";
import AirdropPopup from "./components/AirdropPopup";
import axios from "axios";
import { shortAddress } from "../../../Caws/functions/shortAddress";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import RanksPopup from "./components/RanksPopup";

const TradingComp = ({coinbase}) => {
  const [leaderboard, setLeaderboard] = useState("weekly");
  const [ranksPopup, setRanksPopup] = useState(false)
  const [airdropPopup, setAirdropPopup] = useState(false);
  const [tradingPopup, setTradingPopup] = useState(false);
  const [particpants, setParticpants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([])



  const fetchUserStats = async() => {
    await axios.get(`https://api.worldofdypians.com/api/lb-rank/${coinbase}`).then((res) => {
      setUserStats(res.data)
    }).catch((err) => {
      console.log(err);
      
    })
  }

  const fetchWeeklyParticipants = async () => {
    setLoading(true);
    await axios
      .get(`https://api.worldofdypians.com/api/weekly-volume`)
      .then((res) => {
        const sorted = res.data.result.rows.sort((a, b) => {
          return b["Trading Volume in USD"] - a["Trading Volume in USD"]
        })

        setParticpants(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMonthlyParticipants = async () => {
    setLoading(true);
    await axios
      .get(`https://api.worldofdypians.com/api/monthly-volume`)
      .then((res) => {
        const sorted = res.data.result.rows.sort((a, b) => {
          return b["Trading Volume in USD"] - a["Trading Volume in USD"]
        })

        setParticpants(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchQuarterlyParticipants = async () => {
    setLoading(true);
    await axios
      .get(`https://api.worldofdypians.com/api/quarterly-volume`)
      .then((res) => {
        const sorted = res.data.result.rows.sort((a, b) => {
          return b["Trading Volume in USD"] - a["Trading Volume in USD"]
        })

        setParticpants(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWeeklyParticipants();
    fetchUserStats();
  }, []);

  const html = document.querySelector("html");

  useEffect(() => {
    if (tradingPopup || airdropPopup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [airdropPopup, tradingPopup]);

  return (
    <>
    <div className="container-fluid mt-5 d-flex justify-content-center">
    <div className="custom-container mt-5">
    <div className="row mt-5" style={{overflowX: "hidden"}}>
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-2">
            <div className="trading-banner-wrapper position-relative w-100">
              {/* <div class="overlay-shadow"></div> */}
              <img
                src={tradingCompBanner}
                className="trading-comp-banner w-100"
                alt=""
              />
              {/* <h6 className="trading-comp-title mb-0">The Gathering Storm</h6> */}
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={tradingCalendar} alt="" />
              <span className="trading-comp-date">
                Apr 17, 2025 - Jul 31, 2025
              </span>
            </div>
            <div className="trading-comp-divider"></div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column justify-content-between h-100 w-100">
            <div className="trading-comp-wrapper w-100 p-3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0 trading-comp-subtitle">Prize Pool</h6>
                  <a href="https://medium.com/@worldofdypians/the-gathering-storm-ultimate-wod-trading-competition-5fb06f827023" target="_blank" rel="noreferrer" className="trading-comp-rules-btn d-flex align-items-center justify-content-center px-3 py-2">
                    <span>Competition Rules</span>
                  </a>
                  
              </div>
              <div className="mt-3 d-flex flex-column w-100 align-items-center">
                <div className="trading-comp-total-prize-wrapper px-5 py-3 d-flex align-items-center justify-content-center">
                  <h6 className="mb-0">$300,000</h6>
                </div>
                <div className="golen-line d-none d-lg-flex"></div>
                <img
                  src={newTradingLines}
                  className="trading-lines d-none d-lg-flex"
                  alt=""
                />
                <div className="trading-prize-grid w-100">
                  <div className="d-flex w-100 justify-content-center d-flex d-lg-none">
                    <img src={blueArrow} className="d-flex d-lg-none" alt="" />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className="trading-comp-trade-wrapper px-3 py-2 d-flex align-items-center justify-content-center">
                      <img src={tradingCompCoin} alt="" />
                      <span>Trading</span>
                    </div>
                    <div className="trading-comp-prize-wrapper p-3 d-flex flex-column gap-2">
                      <h6 className="mb-0">$60,000</h6>
                      <span>30 weekly winners</span>
                    </div>
                  </div>
                  <div className="d-flex w-100 justify-content-center d-flex d-lg-none">
                    <img src={blueArrow} className="d-flex d-lg-none" alt="" />
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <div className="trading-comp-prize-aidrop-wrapper px-3 py-2 d-flex align-items-center justify-content-center">
                      <img src={tradingCompDiamond} alt="" />
                      <span>Aidrop</span>
                    </div>
                    <div className="trading-comp-airdrop-prize-wrapper p-3 d-flex flex-column gap-2">
                      <h6 className="mb-0">$240,000</h6>
                      <span>3,100 weekly winners</span>
                    </div>
                  </div>
                 
                
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2 mt-2">
              <h6 className="trading-comp-subtitle mb-0">Airdrop Groups</h6>
              <div className="trading-comp-wrapper w-100 p-3 d-flex flex-column justify-content-center align-items-center">
                <div className="row w-100 airdrop-group-item py-2">
                  <div className="col-3 d-flex justify-content-start">
                    <h6 className="mb-0 airdrop-group-title">Group 1</h6>
                  </div>
                  <div className="col-3 d-flex justify-content-center">
                    <span className="airdrop-group-winners">100 winners</span>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <span className="airdrop-group-volume">Min weekly volume $1,000</span>
                  </div>
                </div>
                <div className="row w-100 airdrop-group-item py-2">
                  <div className="col-3 d-flex justify-content-start">
                    <h6 className="mb-0 airdrop-group-title">Group 2</h6>
                  </div>
                  <div className="col-3 d-flex justify-content-center">
                    <span className="airdrop-group-winners">600 winners</span>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <span className="airdrop-group-volume">Min weekly volume $750</span>
                  </div>
                </div>
                <div className="row w-100 airdrop-group-item py-2">
                  <div className="col-3 d-flex justify-content-start">
                    <h6 className="mb-0 airdrop-group-title">Group 3</h6>
                  </div>
                  <div className="col-3 d-flex justify-content-center">
                    <span className="airdrop-group-winners">2,400 winners</span>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <span className="airdrop-group-volume">Min weekly volume $500</span>
                  </div>
                </div>
              </div>
              <a
                href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8&exactAmount=&exactField=INPUT"
                target="_blank"
                className="pancake-swap-btn mt-3 d-flex align-items-center justify-content-center gap-2 p-2 w-100"
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/pancakeBuyWod.svg"}
                  alt=""
                />
                <h6 className="mb-0">Trade on PancakeSwap</h6>
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex w-100 flex-column flex-lg-row align-items-center mt-3 justify-content-between">
              <h6 className="trading-comp-lb-title">Weekly Rankings</h6>
        
            </div>
            <div className="d-flex flex-column w-100">
              <div className="container">
                {" "}
                <div className="trading-lb-header row p-3">
                  <div className="col-2">
                    <span className="lb-header-text">Rank</span>
                  </div>
                  <div className="col-6 col-lg-8">
                    <span className="lb-header-text">User</span>
                  </div>
                  <div className="col-4 col-lg-2">
                    <span className="lb-header-text">Volume(USD)</span>
                  </div>
                </div>
              </div>
              <div className="trading-comp-leaderboard container position-relative">
                <div className="overlay-shadow"></div>
                <div className="trading-comp-more-position d-flex justify-content-center">
                  <div className="trading-comp-rules-btn d-flex align-items-center justify-content-center px-3 py-2" onClick={() => setRanksPopup(true)} style={{width: "fit-content"}}>
                    <span>
                    More
                    </span>
                  </div>
                </div>
                {loading ? (
                  <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  particpants.slice(0,10).map((item, index) => (
                    <div className="trading-comp-lb-item row p-3">
                      <div className="col-2">
                        <div className="trading-comp-lb-rank d-flex align-items-center justify-content-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="col-6 col-lg-8">
                        <span className="trading-comp-lb-user">
                          {shortAddress(item.Address)}
                        </span>
                      </div>
                      <div className="col-4 col-lg-2">
                        <span className="trading-comp-lb-volume">
                          $
                          {getFormattedNumber(item["Trading Volume in USD"], 0)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3 w-100">
            <h6 className="trading-comp-lb-title mt-4">Winners</h6>
              <div className="trading-comp-lb-grid">
              <div
              className="trading-comp-medal-wrapper d-flex align-items-center justify-content-between w-100"
              onClick={() => setTradingPopup(true)}
            >
              <div className="d-flex flex-column gap-2 ps-3">
                <h6 className="mb-0">Trading Competition</h6>
                <span>12 Months</span>
              </div>
              <img src={tradingCompMedal} className="pe-3" alt="" />
            </div>
            <div
              className="trading-comp-airdrop-wrapper d-flex align-items-center justify-content-between w-100"
              onClick={() => setAirdropPopup(true)}
            >
              <div className="d-flex flex-column gap-2 ps-3">
                <h6 className="mb-0">Weekly Airdrop</h6>
                <span>12 weeks</span>
              </div>
              <img src={tradingCompGift} className="pe-3" alt="" />
            </div>
              </div>
            <h6 className="trading-optional-title mb-0 mt-3">Optional</h6>
            <NavLink
              to={"/account#dailybonus"}
              className="trading-comp-wrapper p-3 w-100 d-flex align-items-center justify-content-between"
            >
              <span className="trading-comp-chests-text">
                Open Daily Bonus chests to boost your weekly airdrop chances.
              </span>
              <img src={tradingCompChest} alt="" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    </div>
      {tradingPopup && (
        <OutsideClickHandler onOutsideClick={() => setTradingPopup(false)}>
          <TradingPopup onClose={() => setTradingPopup(false)}
          coinbase={coinbase}
          participants={particpants}
          />
        </OutsideClickHandler>
      )}
      {airdropPopup && (
        <OutsideClickHandler onOutsideClick={() => setAirdropPopup(false)}>
          <AirdropPopup onClose={() => setAirdropPopup(false)}
          coinbase={coinbase}
          participants={particpants}
          />
        </OutsideClickHandler>
      )}
      {ranksPopup && (
        <OutsideClickHandler onOutsideClick={() => setRanksPopup(false)}>
          <RanksPopup onClose={() => setRanksPopup(false)}
          coinbase={coinbase}
          participants={particpants}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default TradingComp;
