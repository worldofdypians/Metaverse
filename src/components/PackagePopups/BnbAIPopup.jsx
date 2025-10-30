import React from "react";
import { NavLink } from "react-router-dom";

const BnbAIPopup = ({ onClosePopup }) => {

const features = [
    "AI-powered, interactive humanoids inspired by BNB Chain",
    "Real-time Q&A support built into the game",
    "Positioned across multiple zones in the world",
    "Always available to help with game mechanics or Web3 knowledge",
    "Enhances player immersion with a more personalized experience",
    "Learn without leaving the game",
    "Ideal for both new and experienced users",
    "Makes onboarding into blockchain smoother and more fun",
   
]

  return (
    <div className="package-popup-wrapper">
      <div className="package-popup bnb-ai-popup">
        <div className=" d-flex align-items-center justify-content-between w-100 m-0 p-3 mb-2 new-popup-title-wrapper">
          <h6 className="market-banner-title-2 m-0">BNB Chain AI Humanoids</h6>
          <img
            src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
            height={29}
            width={39}
            onClick={onClosePopup}
            alt=""
          />
        </div>

        <div className="package-popup-content-land mx-1 p-4 pt-0 d-flex flex-column gap-2">
          <p className="ways-to-amplify-desc-2 mb-2">
            The BNB Chain AI Humanoids are intelligent NPCs designed to guide
            and engage players across the map. These characters use advanced AI
            to answer real-time questions, offer educational support, and bring
            the BNB Chain experience directly into the gameplay.
          </p>
         <img src="https://cdn.worldofdypians.com/wod/bnbAiPopupBanner.webp" className="w-100" alt="" />
         <h6 className="text-white game-popup-title mt-2">Key Benefits</h6>
        <div className="d-flex flex-column gap-2">
            {features.slice(0,5).map((item, index) => (
                <div className="d-flex align-items-center gap-2" key={index}>
                    <div className="green-dot"></div>
                    <span className="ways-to-amplify-desc-2">{item}</span>
                </div>
            ))}
        </div>
         <h6 className="text-white game-popup-title mt-2">Why it Matters</h6>
        <div className="d-flex flex-column gap-2">
            {features.slice(5,8).map((item, index) => (
                <div className="d-flex align-items-center gap-2" key={index}>
                    <div className="green-dot"></div>
                    <span className="ways-to-amplify-desc-2">{item}</span>
                </div>
            ))}
        </div>
         
        </div>
      </div>
    </div>
  );
};

export default BnbAIPopup;
