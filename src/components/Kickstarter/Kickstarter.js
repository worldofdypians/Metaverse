import React, { useRef, useEffect, useState } from "react";
import "./_kickstarter.scss";
import firstPart from "./assets/firstPart.mp4";
import secondPart from "./assets/secondPart.mp4";
import xMark from "./assets/kickstarterXMark.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import { NavLink } from "react-router-dom";

const Kickstarter = ({
  onClose,
  isConnected,
  coinbase,
  chainId,
  onConnectWallet,
  email,
  address,
  handleSwitchNetwork,
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [rewards, setRewards] = useState([]);

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        handleSwitchNetwork(chain);
      } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
        chain?.showChangeNetwork();
      } else if (coinbase && window.WALLET_TYPE === "binance") {
        handleSwitchNetwork(chain);
      }
    } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
      chain?.showChangeNetwork();
    } else if (coinbase && window.WALLET_TYPE === "binance") {
      handleSwitchNetwork(chain);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  useEffect(() => {
    const video = videoRef1.current;
    const timeout1 = setTimeout(() => {
      if (video) {
        video.play().catch((err) => console.error("Play failed:", err));

        const pauseTimeout = setTimeout(() => {
          video.pause();
          setShowContent(true);
        }, 4200);

        return () => clearTimeout(pauseTimeout);
      }
    }, 1500);

    return () => clearTimeout(timeout1);
  }, []);

  const onClaim = () => {
    const video = videoRef2.current;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);

      if (video) {
        video.play().catch((err) => console.error("Play failed:", err));
        setTimeout(() => {
          video.pause();
          setStep(3);
          setRewards([0, 2]);
        }, 8000);
      }
    }, 2000);
  };

  console.log(chainId !== 56 || chainId !== 204);

  return (
    <div className="kickstarter-container slide-in d-flex flex-column justify-content-between align-items-center">
      <img src={xMark} className="kickstarter-close" alt="" onClick={onClose} />

      {/* VIDEO ONE (Intro) */}
      <video
        ref={videoRef1}
        src={firstPart}
        className={`kickstarter-video ${step === 1 ? "visible" : "hidden"}`}
        playsInline
        preload="auto"
      />

      {/* VIDEO TWO (Reward animation) */}
      <video
        ref={videoRef2}
        src={secondPart}
        className={`kickstarter-video ${
          step === 2 || step === 3 ? "visible" : "hidden"
        }`}
        playsInline
        preload="auto"
      />

      {showContent && (
        <>
          <div className="d-flex align-items-center gap-2 switch-chain-position switch-info-container p-3">
            <button
              className={`switch-btn-2 ${
                chainId === 56 ? "switch-btn-2-active" : ""
              } px-2 py-2 d-flex align-items-center gap-2 text-white`}
              onClick={() => {
                switchNetwork("0x38", 56);
              }}
            >
              <img
                src="https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                alt=""
                width={24}
                height={24}
              />
              BNB Chain
            </button>
            <button
              className={`switch-btn-2 ${
                chainId === 204 ? "switch-btn-2-active" : ""
              } px-2 py-2 d-flex align-items-center gap-2 text-white`}
              onClick={() => {
                switchNetwork("0xcc", 204);
              }}
            >
              <img
                src="https://cdn.worldofdypians.com/wod/opbnbChain.png"
                alt=""
                width={24}
                height={24}
              />
              opBNB Chain
            </button>
          </div>
          <h6 className="kickstarter-title mb-0 mt-4 fade-in">
            Unlock Container
          </h6>
          <div className="kickstarter-info-container px-3 py-3 px-lg-5 py-lg-4 d-flex flex-column gap-2 w-100 fade-in">
            {/* <div className="kickstarter-divider mb-1"></div> */}

            <div className="d-flex align-items-center w-100 flex-column flex-lg-row gap-2 gap-lg-0 justify-content-between">
              <p className="kickstarter-desc mb-0">
                BNB Chain is a decentralized blockchain network built for
                high-speed, low-cost transactions, designed to support scalable
                applications in Web3, DeFi, NFTs, gaming, and beyond. Its
                ecosystem is known for low fees, fast confirmations, and a
                growing community of builders, making it one of the most used
                blockchains in the world.
              </p>

              <div className="d-flex flex-row gap-2 gap-lg-4">
                <div className="d-flex align-items-center position-relative">
                  <img
                    src="https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp"
                    alt=""
                    className="kickstarter-reward-image"
                  />
                  <div
                    className={`d-flex px-3 py-2 kickstarter-rewards-container ${
                      rewards.includes(0) ? "kickstart-rewarded" : ""
                    } justify-content-end`}
                  >
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
                  <div
                    className={`d-flex px-3 py-2 kickstarter-rewards-container ${
                      rewards.includes(1) ? "kickstart-rewarded" : ""
                    } justify-content-end`}
                  >
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
                  <div
                    className={`d-flex px-3 py-2 kickstarter-rewards-container ${
                      rewards.includes(2) ? "kickstart-rewarded" : ""
                    } justify-content-end`}
                  >
                    <span className="kickstarter-reward-title text-end">
                      Rewards
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="kickstarter-divider mb-1"></div>
            <div className="row">
              <div className="col-12 col-lg-4 d-flex">
                <div className="d-flex align-items-center w-100 justify-content-between justify-content-lg-start gap-3 mb-3 mb-lg-0">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                      alt=""
                    />
                    <span className="kickstarter-chain-title">BNB Chain</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      href="https://x.com/BNBCHAIN"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldofdypians.com/wod/twitterMap.svg"
                        alt="kickstarter-twitter"
                        width={24}
                        height={24}
                      />
                    </a>
                    <a
                      href="https://t.me/bnbchain"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldofdypians.com/wod/telegramMap.svg"
                        alt="kickstarter-telegram"
                        width={24}
                        height={24}
                      />
                    </a>
                    <a
                      href="https://discord.com/invite/bnbchain"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldofdypians.com/wod/discordMap.svg"
                        alt="kickstarter-discord"
                        width={24}
                        height={24}
                      />
                    </a>
                    <a
                      href="https://www.bnbchain.org/en"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.worldofdypians.com/wod/websiteMap.svg"
                        alt="kickstarter-website"
                        width={24}
                        height={24}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 d-flex justify-content-center">
                {!email && coinbase && (
                  <NavLink
                    className="explore-btn px-3 py-2"
                    to="/auth"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Log in
                  </NavLink>
                )}
                {!isConnected && !coinbase && (
                  <button
                    className="explore-btn px-3 py-2"
                    onClick={onConnectWallet}
                  >
                    Connect Wallet
                  </button>
                )}
                {isConnected &&
                  coinbase &&
                  email &&
                  chainId !== 56 &&
                  chainId !== 204 && (
                    <button
                      className="explore-btn px-3 py-2"
                      onClick={() => switchNetwork("0x38", 56)}
                    >
                      Switch Chain
                    </button>
                  )}
                {isConnected &&
                  coinbase &&
                  email &&
                  (chainId === 56 || chainId === 204) && (
                    <button className="explore-btn px-3 py-2" onClick={onClaim}>
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
                  )}
              </div>
              <div className="col-12 col-lg-4"></div>

              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Kickstarter;
