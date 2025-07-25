import React, { useRef, useEffect, useState } from "react";
import "./_kickstarter.scss";
import kickstarterVideo from "./assets/bnbChainRoyalBox.mp4";
import xMark from "./assets/kickstarterXMark.svg";

const Kickstarter = ({ onClose }) => {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    const video = videoRef.current;
    setTimeout(() => {
         if (video) {
      // Start playing the video
      video.play().catch((err) => console.error("Play failed:", err));

      // Set timeout to pause after 4 seconds
      const pauseTimeout = setTimeout(() => {
        video.pause();
        console.log(`Paused at ${video.currentTime.toFixed(2)}s`);
        setShowContent(true);
      }, 4200);

      // Cleanup
      return () => clearTimeout(pauseTimeout);
    }
    }, 1500);

  }, []);

  const onClaim = () => {
    const video = videoRef.current;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      if (video) {
        video.play();
        setTimeout(() => {
          video.pause();
          setStep(3);
          setRewards([0,2])
        }, 5000);
      }
    }, 2000);
  };

  return (
    <div className="kickstarter-container slide-in d-flex flex-column justify-content-between align-items-center">
      <img src={xMark} className="kickstarter-close" alt="" onClick={onClose} />

      <video
        ref={videoRef}
        src={kickstarterVideo}
        className="kickstarter-video"
      />
      {showContent && (
        <>
          <h6 className="kickstarter-title mb-0 mt-4 fade-in">
            Unlock Container
          </h6>
          <div className="kickstarter-info-container px-3 py-3 px-lg-5 py-lg-4   d-flex flex-column gap-2 w-100 fade-in">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                  alt=""
                />
                <span className="kickstarter-chain-title">BNB Chain</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a href="https://x.com/BNBCHAIN" target="_blank">
                  <img
                    src="https://cdn.worldofdypians.com/wod/twitterMap.svg"
                    alt="kickstarter-twitter"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="https://t.me/bnbchain" target="_blank">
                  <img
                    src="https://cdn.worldofdypians.com/wod/telegramMap.svg"
                    alt="kickstarter-twitter"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="https://discord.com/invite/bnbchain" target="_blank">
                  <img
                    src="https://cdn.worldofdypians.com/wod/discordMap.svg"
                    alt="kickstarter-twitter"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="https://www.bnbchain.org/en" target="_blank">
                  <img
                    src="https://cdn.worldofdypians.com/wod/websiteMap.svg"
                    alt="kickstarter-twitter"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
            <div className="kickstarter-divider mb-1"></div>
            <div className="d-flex align-items-center w-100 flex-column flex-lg-row gap-2 gap-lg-0 justify-content-between">
              <p className="kickstarter-desc mb-0 ">
                BNB Chain is a decentralized blockchain network built for
                high-speed, low-cost transactions, designed to support scalable
                applications in Web3, DeFi, NFTs, gaming, and beyond.
                <br />
                <br />
                Its ecosystem is known for low fees, fast confirmations, and a
                growing community of builders, making it one of the most used
                blockchains in the world.
              </p>
              <div className="d-flex flex-row flex-lg-column gap-2">
                <div className="d-flex align-items-center position-relative">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp"
                    alt=""
                    className="kickstarter-reward-image"
                  />
                  <div className={`d-flex px-3 py-2 kickstarter-rewards-container ${rewards.includes(0) && "kickstart-rewarded"} justify-content-end`}>
                    <span className="kickstarter-reward-title text-end">
                      Stars
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center position-relative">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp"
                    alt=""
                    className="kickstarter-reward-image"
                  />
                  <div className={`d-flex px-3 py-2 kickstarter-rewards-container ${rewards.includes(1) && "kickstart-rewarded"} justify-content-end`}>
                    <span className="kickstarter-reward-title text-end">
                      Points
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center position-relative">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ai-reward-active.webp"
                    alt=""
                    className="kickstarter-reward-image"
                  />
                  <div className={`d-flex px-3 py-2 kickstarter-rewards-container ${rewards.includes(2) && "kickstart-rewarded"} justify-content-end`}>
                    <span className="kickstarter-reward-title text-end">
                      Rewards
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="kickstarter-divider mb-1"></div>
            <div className="d-flex w-100 justify-content-center">
              <button className="explore-btn px-3 py-2" disabled={step !== 1 ? true : false} onClick={onClaim}>
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : step === 1 ? (
                  "Claim"
                ) : step === 2 ? (
                  "In Progress"
                ) : (
                  "Claimed"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Kickstarter;
