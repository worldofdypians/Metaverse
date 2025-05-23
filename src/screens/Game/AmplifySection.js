import React from "react";
import { NavLink } from "react-router-dom";

const AmplifySection = ({ setShowPopup, setVideoPopup, setVideoLink }) => {
  return (
    <>
      <div className="d-flex flex-column">
        <div>
          <div className="container-fluid d-flex p-0">
            <img
              src={"https://cdn.worldofdypians.com/wod/bnbAiBannerSmall.webp"}
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper bnb-ai-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-start gap-3 gap-lg-5 mb-3 mb-lg-0">
                <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
                  <span className="amp-benefits-desc text-center text-md-start">
                    BNB Chain Humanoids
                  </span>
                  <span className="ways-to-amplify-title text-center text-md-start">
                    Your In-Game AI Web3 Guides
                  </span>
                  <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                    Meet AI-powered humanoids inspired by BNB Chain, built to
                    answer your questions, guide your journey, and bring Web3 to
                    life, right inside the game.
                  </span>
                  <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                    <button
                      className="getpremium-btn col-lg-4 py-2"
                      onClick={() => setShowPopup("bnbAi")}
                    >
                      View More
                    </button>
                    <button
                      onClick={() => {
                        setVideoPopup(true);
                        setVideoLink("P8HTt5M4VKw");
                      }}
                      className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid d-flex  p-0">
            <img
              src={
                "https://cdn.worldofdypians.com/wod/museumAiBannerSmall.webp"
              }
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper museum-ai-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
              <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-end gap-3 gap-lg-5 mb-3 mb-lg-0">
                <img
                  src={"https://cdn.worldofdypians.com/wodcawsAmplify.png"}
                  className="d-none d-lg-flex"
                  alt=""
                />
                <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
                  <span className="amp-benefits-desc text-center text-md-end">
                    Museum & Academy
                  </span>
                  <span className="ways-to-amplify-title text-center text-md-end">
                    Learn Web3 Through AI
                  </span>
                  <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                    Step into an interactive space designed to teach players all
                    about Web3. A fun and immersive way to master the future of
                    gaming and blockchain.
                  </span>
                  <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100 mt-3">
                    <button
                      className="getpremium-btn col-lg-4 py-2"
                      onClick={() => setShowPopup("museumAi")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid d-flex p-0">
            <img
              src={"https://cdn.worldofdypians.com/wod/orynAiBannerSmall.webp"}
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper oryn-ai-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start custom-container">
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-start gap-3 gap-lg-5 mb-3 mb-lg-0">
                <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-start">
                  <span className="amp-benefits-desc text-center text-md-start">
                    Oryn AI Agent
                  </span>
                  <span className="ways-to-amplify-title text-center text-md-start">
                    Real-Time AI Gameplay Assistant
                  </span>
                  <span className="ways-to-amplify-desc mb-2 text-center text-md-start">
                    Your personal AI assistant is always on. Oryn offers
                    real-time insights, tips, and strategies to help you
                    maximize rewards and play like a pro.
                  </span>
                  <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                    <NavLink to={"/ai-agent"}>
                      <button className="getpremium-btn d-flex align-items-center gap-2 col-lg-4 py-2">
                        Explore
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid d-flex  p-0">
            <img
              src={
                "https://cdn.worldofdypians.com/wod/cawsGameBannerSmall.webp"
              }
              className="small-transaction-banner"
              alt=""
            />
          </div>
          <div className="new-game-stats-wrapper seventh-banner d-flex align-items-center justify-content-center ">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
              <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-end gap-3 gap-lg-5 mb-3 mb-lg-0">
                <img
                  src={"https://cdn.worldofdypians.com/wodcawsAmplify.png"}
                  className="d-none d-lg-flex"
                  alt=""
                />
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
                    <button
                      className="getpremium-btn col-lg-4 py-2"
                      onClick={() => setShowPopup("caws")}
                    >
                      View More
                    </button>
                    <button
                      onClick={() => {
                        setVideoPopup(true);
                        setVideoLink("szTyRNXuIN8");
                      }}
                      className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid d-flex p-0">
            <img
              src={
                "https://cdn.worldofdypians.com/wod/exploreGameBannerSmall.webp"
              }
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
                    Own a piece of World of Dypians with one of 100,000 Land
                    NFTs. Each plot offers unique utilities, letting you build,
                    develop, and expand your virtual empire. From vibrant cities
                    to serene landscapes, shape your ideal world."
                  </span>
                  <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start w-100 mt-3">
                    <button
                      className="getpremium-btn col-lg-4 py-2"
                      onClick={() => setShowPopup("land")}
                    >
                      View More
                    </button>

                    <button
                      onClick={() => {
                        setVideoPopup(true);
                        setVideoLink("4HRMvr2jtbE");
                      }}
                      className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
                    >
                      Watch
                    </button>
                  </div>
                </div>
                <img
                  src={"https://cdn.worldofdypians.com/wod/landAmplify.png"}
                  className="d-none d-lg-flex"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmplifySection;
