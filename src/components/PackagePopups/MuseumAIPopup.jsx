import React from "react";

const MuseumAIPopup = ({ onClosePopup }) => {
  const features = [
    "A visual walkthrough of Web3 history and evolution",
    "AI-powered NPCs that explain, engage, and answer questions in real time",
    "Interactive lessons on crypto, wallets, NFTs, and DeFi",
    "Guided educational paths powered by AI",
    "A hands-on learning experience for both new and seasoned players",
    "Learn complex topics through storytelling and interaction",
    "Get real-time help from AI-driven characters",
    "Makes onboarding to Web3 simple, engaging, and rewarding",
    "Combines education and gameplay in a fully gamified format",
  ];

  return (
    <div className="package-popup-wrapper">
      <div className="package-popup bnb-ai-popup">
        <div className=" d-flex align-items-center justify-content-between w-100 m-0 p-3 mb-2 new-popup-title-wrapper">
          <h6 className="market-banner-title-2 m-0">AI Museum & Academy</h6>
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
            The AI Museum & Academy is a next-generation educational hub built
            inside World of Dypians. With interactive elements and AI-driven
            guidance, it helps players understand everything from basic crypto
            concepts to advanced blockchain ecosystems.
          </p>
          <img
            src="https://cdn.worldofdypians.com/wod/museumAiPopupBanner.webp"
            className="w-100"
            alt=""
          />
          <h6 className="text-white game-popup-title mt-2">What You'll Discover</h6>
          <div className="d-flex flex-column gap-2">
            {features.slice(0, 5).map((item, index) => (
              <div className="d-flex align-items-center gap-2" key={index}>
                <div className="green-dot"></div>
                <span className="ways-to-amplify-desc-2">{item}</span>
              </div>
            ))}
          </div>
          <h6 className="text-white game-popup-title mt-2">Key Benefits</h6>
          <div className="d-flex flex-column gap-2">
            {features.slice(5, 9).map((item, index) => (
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

export default MuseumAIPopup;
