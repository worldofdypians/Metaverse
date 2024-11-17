import React, { useEffect, useState } from "react";
import "./_gamestats.scss";
import transactionsBannerSmall from "./assets/transactionsBannerSmall.webp";
import darkLordSpaceBannerSmall from "./assets/darkLordSpaceBannerSmall.webp";
import groupBannerSmall from "./assets/groupBannerSmall.webp";
import cityBannerSmall from "./assets/cityBannerSmall.webp";
import secondCityBannerSmall from "./assets/secondCityBannerSmall.webp";
import lizardBannerSmall from "./assets/lizardBannerSmall.webp";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";

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
        <div className="container-fluid d-flex  p-0">
          <img
            src={transactionsBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper first-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
              <span className="amp-benefits-desc text-center text-md-end">
                ADVENTURE
              </span>
              <span className="ways-to-amplify-title text-center text-md-end">
                The World Beyond Imagination
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                Step into a boundless realm where every choice matters. In World
                of Dypians, each path leads to new wonders and dangers, awaiting
                only the most daring adventurers. Forge alliances, uncover
                secrets, and shape your own destiny.
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100 mt-3">
                <NavLink to={"/game"} className="getpremium-btn col-lg-4 py-2">
                  Explore More
                </NavLink>
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
        <div className="new-game-stats-wrapper third-banner d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
              <span className="amp-benefits-desc text-center text-md-start">
                EPIC
              </span>
              <span className="ways-to-amplify-title text-center text-md-start">
                Embark on a New Era of Gameplay
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                World of Dypians offers dynamic gameplay where strategy and
                courage are rewarded. Join forces with others, explore vast
                landscapes, and unlock powerful relics.
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                <NavLink
                  to={
                    "https://store.epicgames.com/en-US/p/world-of-dypians-2e0694"
                  }
                  target="_blank"
                  className="explore-btn col-lg-4 py-2"
                >
                  Join the Fight
                </NavLink>
                <NavLink to={"/account"} className="getpremium-btn col-lg-4 py-2">
                  Explore Now
                </NavLink>
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
        <div className="new-game-stats-wrapper second-banner d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
              <span className="amp-benefits-desc text-center text-md-end">
                LEGEND
              </span>
              <span className="ways-to-amplify-title text-center text-md-end">
                Conquer Legendary Quests
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                The world needs heroes, and World of Dypians calls for the
                brave. Take on epic quests filled with mythical creatures,
                ancient artifacts, and rewards that will enhance your powers.
                Will you rise to the challenge?
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100 mt-3">
                <NavLink
                  to={"/account/challenges/treasure-hunt"}
                  className="getpremium-btn col-lg-4 py-2"
                >
                  Challenges
                </NavLink>
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
          <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
              <span className="amp-benefits-desc text-center text-md-start">
                MAP
              </span>
              <span className="ways-to-amplify-title text-center text-md-start">
                Explore the World of Dypians
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                Join a vibrant community of adventurers in World of Dypians.
                From competitive events to collaborative challenges, connect
                with players around the world who share your passion.
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                <NavLink to={"/map"} className="getpremium-btn col-lg-4 py-2">
                  Explore Map
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex  p-0">
          <img
            src={groupBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper fifth-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
              <span className="amp-benefits-desc text-center text-md-end">
                COMMUNITY
              </span>
              <span className="ways-to-amplify-title text-center text-md-end">
                A Community Like No Other
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                Join a vibrant community of adventurers in World of Dypians.
                From competitive events to collaborative challenges, connect
                with players around the world who share your passion.
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100 mt-3">
                <NavLink
                  to={"https://discord.gg/worldofdypians"}
                  target="_blank"
                  className="explore-btn col-lg-4 py-2"
                >
                  Connect
                </NavLink>
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
        <div className="new-game-stats-wrapper sixth-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
              <span className="amp-benefits-desc text-center text-md-start">
                UPDATES
              </span>
              <span className="ways-to-amplify-title text-center text-md-start">
                Latest Updates
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                Dive into the newest features, events, and surprises in World of
                Dypians. There’s always something fresh waiting for you!
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                <NavLink
                  to={"/game-updates"}
                  className="getpremium-btn col-lg-4 py-2"
                >
                  Learn More
                </NavLink>
                <NavLink
                  to={"/campaigns"}
                  className="getpremium-btn col-lg-4 py-2"
                >
                  Campaigns
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
