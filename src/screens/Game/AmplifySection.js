import React from "react";
import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import { NavLink } from "react-router-dom";
import cawsGameBannerSmall from "../../assets/gameAssets/cawsGameBannerSmall.webp";
import exploreGameBannerSmall from "../../assets/gameAssets/exploreGameBannerSmall.webp";
import cawsAmplify from "../../assets/gameAssets/cawsAmplify.png";
import landAmplify from "../../assets/gameAssets/landAmplify.png";

const AmplifySection = () => {
  const dummyBetaPassData2 = [
    {
      link: "/account#leaderboard",
      title: "LEADERBOARDS",
      desc: "Compete for the top rank",
      class: "tokenClass",
    },
    {
      link: "/account#my-rank",
      title: "MY RANK",
      desc: "Elevate your player status",
      class: "earnClass",
    },
    {
      link: "/account#dailybonus",
      title: "DAILY BONUS",
      desc: "Daily rewards for active players",
      class: "eventClass",
    },
  ];

 
  return (
    <>
      <div className="d-flex flex-column">
        <div>
          <div className="container-fluid d-flex  p-0">
            <img
              src={cawsGameBannerSmall}
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper seventh-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
              <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-end gap-3 gap-lg-5 mb-3 mb-lg-0">
                <img src={cawsAmplify} alt="" />
                <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
                  <span className="amp-benefits-desc text-center text-md-end">
                    Cats and Watches Society
                  </span>
                  <span className="ways-to-amplify-title text-center text-md-end">
                    An AI-Powered Companion
                  </span>
                  <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                    Discover the CAWS collection of 10,000 AI-powered NFTs,
                    crafted to aid you in battles and events with unique
                    abilities to help you conquer challenges
                  </span>
                  <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100 mt-3">
                    <NavLink
                      to={"/account"}
                      className="getpremium-btn col-lg-4 py-2"
                    >
                      Join Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid d-flex p-0">
            <img
              src={exploreGameBannerSmall}
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper eightth-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
             <div className="d-flex flex-column flex-lg-row align-items-center justify-content-start gap-3 gap-lg-5 mb-3 mb-lg-0">
             <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
                <span className="amp-benefits-desc text-center text-md-start">
                  World of Dypians Land
                </span>
                <span className="ways-to-amplify-title text-center text-md-start">
                  Shape Your World
                </span>
                <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                  Own a piece of World of Dypians with one of 100,000 Land NFTs.
                  Each plot offers unique utilities, letting you build, develop,
                  and expand your virtual empire. From vibrant cities to serene
                  landscapes, shape your ideal world."
                </span>
                <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                  <NavLink
                    to={"/account/challenges/treasure-hunt"}
                    className="getpremium-btn col-lg-4 py-2"
                  >
                    Challenges
                  </NavLink>
                </div>
              </div>
              <img src={landAmplify} alt="" />
             </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default AmplifySection;
