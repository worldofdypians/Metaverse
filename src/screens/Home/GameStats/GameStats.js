import React, { useEffect, useState } from "react";
import "./_gamestats.scss";
import transactionsBannerSmall from "./assets/transactionsBannerSmall.webp";
import darkLordSpaceBannerSmall from "./assets/darkLordSpaceBannerSmall.webp";
import cityBannerSmall from "./assets/cityBannerSmall.webp";
import secondCityBannerSmall from "./assets/secondCityBannerSmall.webp";
import lizardBannerSmall from "./assets/lizardBannerSmall.webp";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";

const GameStats = ({ totalSupply, monthlyPlayers }) => {
  const [totalTx2, setTotalTx] = useState(0);
  const [totalvolume2, setTotalVolume] = useState(0);
  const fetchCachedData = () => {
    const cachedVolume = localStorage.getItem("cachedVolume");
    const cachedTvl = localStorage.getItem("cachedTvl");

    if (cachedTvl && cachedVolume) {
      setTotalTx(cachedTvl);
      setTotalVolume(cachedVolume);
    }
  };

  useEffect(() => {
    fetchCachedData();
  }, []);

  return (
    <div className="d-flex flex-column">
      <div>
        <div className="container-fluid d-flex p-0">
          <img
            src={transactionsBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper first-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-end custom-container">
            <div className="game-stats-grid py-0 py-md-5">
              <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                  {" "}
                  {getFormattedNumber(totalTx2).slice(
                    0,
                    getFormattedNumber(totalTx2).length - 3
                  )}
                </h6>
                <span className="game-stats-type">
                  Total on-chain transactions
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                  {" "}
                  ${getFormattedNumber(totalvolume2, 0)}
                </h6>
                <span className="game-stats-type">Total Volume (USD)</span>
              </div>
              <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                  {getFormattedNumber(totalSupply, 0)}
                </h6>
                <span className="game-stats-type">Sold NFTs</span>
              </div>
              <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                  {getFormattedNumber(monthlyPlayers, 0)}
                </h6>
                <span className="game-stats-type">Monthly Players</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex p-0">
          <img
            src={darkLordSpaceBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper second-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-start custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-2 px-4 py-3 px-lg-3">
              <span className="amp-benefits-desc text-start">
                Learn what’s ahead
              </span>
              <span className="ways-to-amplify-title text-start">
                Save the Date for Warcraft 30th Anniversary Direct
              </span>
              <span className="ways-to-amplify-desc mb-2 text-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-start">
                <button className="explore-btn col-lg-4 py-2">Explore</button>
                <button className="getpremium-btn col-lg-4 py-2">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex  p-0">
          <img
            src={lizardBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper third-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-2 px-4 py-3 px-lg-3">
              <span className="amp-benefits-desc">
                Adopt until January 7, 2025.
              </span>
              <span className="ways-to-amplify-title">
                Support Cure Duchenne With the Reven Pack
              </span>
              <span className="ways-to-amplify-desc mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <button className="explore-btn col-lg-4 py-2">Explore</button>
                <button className="getpremium-btn col-lg-4 py-2">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex  p-0">
          <img
            src={cityBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper fourth-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-2 px-4 py-3 px-lg-3">
              <span className="amp-benefits-desc text-start">
                12-Month Subscription Offer
              </span>
              <span className="ways-to-amplify-title text-start">
                Endless Adventure Together
              </span>
              <span className="ways-to-amplify-desc mb-2 text-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-start">
                <button className="explore-btn col-lg-4 py-2">Explore</button>
                <button className="getpremium-btn col-lg-4 py-2">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex p-0">
          <img
            src={secondCityBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper fifth-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-2 px-4 py-3 px-lg-3">
              <span className="amp-benefits-desc">Cataclysm Classic</span>
              <span className="ways-to-amplify-title">
                A New Age of Cataclysm
              </span>
              <span className="ways-to-amplify-desc mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <button className="explore-btn col-lg-4 py-2">Explore</button>
                <button className="getpremium-btn col-lg-4 py-2">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
