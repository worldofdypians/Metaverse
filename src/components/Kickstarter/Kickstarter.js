import React, { useRef, useEffect, useState } from "react";
import "./_kickstarter.scss";
import xMark from "./assets/kickstarterXMark.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";

const rewardCategories = [
  {
    id: "points",
    name: "POINTS",
    icon: "https://cdn.worldofdypians.com/wod/ai-reward-active.webp",
    count: "1K-20K",
    color: "from-blue-400 to-purple-500",
    rarity: "COMMON",
    tier: "TIER II",
  },
  {
    id: "stars",
    name: "STARS",
    icon: "https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp",
    count: "5-25",
    color: "from-yellow-400 to-orange-500",
    rarity: "RARE",
    tier: "TIER I",
  },
  {
    id: "rewards",
    name: "REWARDS",
    icon: "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp",
    count: "$1-$10",
    color: "from-purple-500 to-pink-500",
    rarity: "EPIC",
    tier: "TIER III",
  },
];

const Kickstarter = ({
  onClose,
  onAddClass,
  isConnected,
  coinbase,
  chainId,
  onConnectWallet,
  email,
  address,
  handleSwitchNetwork,
  isOpen,
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const windowSize = useWindowSize();

  const glassyContainerStyle = {
    background:
      "linear-gradient(135deg, rgba(14, 25, 48, 0.6) 0%, rgba(10, 18, 36, 0.4) 50%, rgba(6, 12, 24, 0.3) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(120, 170, 255, 0.15)",
    borderRadius: "16px",
  };

  const chains = [
    {
      id: "bnb",
      name: "BNB Chain",
      symbol: "BNB",
      logo: "https://cdn.worldofdypians.com/wod/bnbIcon.svg",
      color: "from-yellow-400 to-orange-500",
      desc: "BNB Chain is a high-performance blockchain designed to support the expansive growth of decentralized applications. It offers a robust infrastructure that combines high throughput, low latency, and low fees, making it the ideal platform for DeFi, NFTs, and gaming.",
      gradientFrom: "#F59E0B",
      gradientTo: "#F97316",
      hex: "0x38",
      chainId: 56,
      // switchNetwork("0x38", 56)
      socials: [
        {
          Icon: "https://cdn.worldofdypians.com/wod/websiteMap.svg",
          label: "Twitter",
          color: "#1DA1F2",
          link: "https://x.com/BNBChain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/telegramMap.svg",
          label: "Telegram",
          color: "#0088CC",
          link: "https://t.me/bnbchain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/discordMap.svg",
          label: "Discord",
          color: "#5865F2",
          link: "https://discord.com/invite/bnbchain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/twitterMap.svg",
          label: "Website",
          color: "#059669",
          link: "https://www.bnbchain.org/en",
        },
      ],
    },
    {
      id: "opbnb",
      name: "opBNB",
      symbol: "BNB",
      logo: "https://cdn.worldofdypians.com/wod/opbnbChain.png",
      desc: "An optimized layer-2 solution that delivers lower fees and higher throughput to unlock the full potential of the BNB Chain",
      color: "from-blue-400 to-purple-600",
      gradientFrom: "#F59E0B",
      gradientTo: "#1a1024ff",
      hex: "0xcc",
      chainId: 204,
      socials: [
        {
          Icon: "https://cdn.worldofdypians.com/wod/websiteMap.svg",
          label: "Twitter",
          color: "#1DA1F2",
          link: "https://x.com/BNBChain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/telegramMap.svg",
          label: "Telegram",
          color: "#0088CC",
          link: "https://t.me/bnbchain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/discordMap.svg",
          label: "Discord",
          color: "#5865F2",
          link: "https://discord.com/invite/bnbchain",
        },
        {
          Icon: "https://cdn.worldofdypians.com/wod/twitterMap.svg",
          label: "Website",
          color: "#059669",
          link: "https://opbnb.bnbchain.org/en",
        },
      ],
    },
  ];

  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
  const [chestOpened, setChestOpened] = useState(false);
  const [selectedChain, setSelectedChain] = useState("bnb");
  const [hoveredChain, setHoveredChain] = useState(null);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [activatedReward, setActivatedReward] = useState(null);
  const [disable, setDisable] = useState(true);
  const [socials, setSocials] = useState(chains[0].socials);
  const [count, setCount] = useState(0);

  function handleEsc(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      onClose();
    }
  }

  // Attach listener
  window.addEventListener("keydown", handleEsc);

  // const onClaim = () => {

  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setStep(2);
  //   }, 2000);
  // };

  const handleClaim = async () => {
    const video = videoRef2.current;

    setIsClaimLoading(true);

    setTimeout(() => {
      setIsClaimLoading(false);
      setChestOpened(true);
      setStep(2);
      setTimeout(() => {
        const randomReward =
          rewardCategories[Math.floor(Math.random() * rewardCategories.length)];
        setActivatedReward(randomReward.id);
      }, 3600);

      if (video) {
        video.play().catch((err) => console.error("Play failed:", err));
        setTimeout(() => {
          video.pause();
          setStep(3);
        }, 8000);
      }
    }, 3000);
  };

  const getRewardGradient = (category) => {
    if (category.color.includes("yellow"))
      return { background: "linear-gradient(135deg, #FBBF24, #F97316)" };
    if (category.color.includes("blue"))
      return { background: "linear-gradient(135deg, #60A5FA, #A855F7)" };
    return { background: "linear-gradient(135deg, #A855F7, #EC4899)" };
  };

  const getChainGradient = (chain) => ({
    background: `linear-gradient(135deg, ${chain.gradientFrom}, ${chain.gradientTo})`,
  });

  const selectedChainData = chains.find((c) => c.id === selectedChain);

  // const chains = [
  //   {
  //     id: "bnb",
  //     name: "BNB Chain",
  //     activeImage: "bnbIcon.svg",
  //     hoverImage: "bnbWhite.svg",
  //     inactiveImage: "bnbInactive.svg",
  //     tag: "0x38",
  //     chainId: 56,
  //   },
  //   {
  //     id: "opbnb",
  //     name: "opBNB",
  //     activeImage: "opbnbChain.png",
  //     hoverImage: "bnbWhite.svg",
  //     inactiveImage: "bnbInactive.svg",
  //     tag: "0xcc",
  //     chainId: 204,
  //   },
  //   // {
  //   //   id: "core",
  //   //   name: "CORE",
  //   //   activeImage : "core.svg",
  //   //   hoverImage: "coreWhite.svg",
  //   //   inactiveImage: "coreInactive.svg"
  //   // },
  //   // {
  //   //   id: "taiko",
  //   //   name: "Taiko",
  //   //   activeImage : "taiko.svg",
  //   //   hoverImage: "taikoWhite.svg",
  //   //   inactiveImage: "taikoInactive.svg"
  //   // },
  //   // {
  //   //   id: "sei",
  //   //   name: "SEI",
  //   //   activeImage : "seiLogo.svg",
  //   //   hoverImage: "seiWhite.svg",
  //   //   inactiveImage: "seiInactive.svg"
  //   // },
  //   // {
  //   //   id: "base",
  //   //   name: "Base",
  //   //   activeImage : "base.svg",
  //   //   hoverImage: "baseWhite.svg",
  //   //   inactiveImage: "baseInactive.svg"
  //   // },
  //   // {
  //   //   id: "manta",
  //   //   name: "Manta",
  //   //   activeImage : "manta.png",
  //   //   hoverImage: "mantaWhite.png",
  //   //   inactiveImage: "mantaInactive.png"
  //   // },
  //   // {
  //   //   id: "vanar",
  //   //   name: "Vanar",
  //   //   activeImage : "vanar.svg",
  //   //   hoverImage: "vanarWhite.svg",
  //   //   inactiveImage: "vanarInactive.svg"
  //   // },
  // ];

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

  const html = document.querySelector("html");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isOpen) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
    return () => {
      html.classList.remove("hidescroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (count === 0) {
      setCount(1);
    }

    if (windowSize.width !== undefined) {
      window.scrollTo(0, 0);
      const video = videoRef1.current;

      setTimeout(() => {
        setShowContent(true);
      }, 4000);

      const timeout1 = setTimeout(() => {
        console.log(video);

        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));

          const pauseTimeout = setTimeout(() => {
            video.pause();
            setDisable(false);
            onAddClass(true);
            console.log("Hello");
          }, 6200);

          return () => clearTimeout(pauseTimeout);
        }
      }, 1500);

      return () => clearTimeout(timeout1);
    }
  }, [count]);

  return (
    <div className="kickstarter-container slide-in d-flex flex-column justify-content-between align-items-center">
      <div className="position-relative  d-flex w-100 h-100 flex-column justify-content-between align-items-center">
        <img
          src={xMark}
          className="kickstarter-close"
          alt=""
          onClick={() => {
            setShowContent(false);
            onAddClass(false);
            onClose();
          }}
        />

        {windowSize.width && windowSize.width > 700 ? (
          <>
            {/* VIDEO ONE (Intro) */}
            <video
              ref={videoRef1}
              src={"https://cdn.worldofdypians.com/wod/firstPart.mp4"}
              className={`kickstarter-video ${
                step === 1 ? "visible" : "hidden"
              }`}
              playsInline
              preload="auto"
            />

            {/* VIDEO TWO (Reward animation) */}
            <video
              ref={videoRef2}
              src={"https://cdn.worldofdypians.com/wod/secondPart.mp4"}
              className={`kickstarter-video ${
                step === 2 || step === 3 ? "visible" : "hidden"
              }`}
              playsInline
              preload="auto"
            />
          </>
        ) : windowSize.width && windowSize.width <= 700 ? (
          <>
            {/* VIDEO ONE (Intro) */}
            <video
              ref={videoRef1}
              src={"https://cdn.worldofdypians.com/wod//firstPartMobile.mp4"}
              className={`kickstarter-video ${
                step === 1 ? "visible" : "hidden"
              }`}
              playsInline
              preload="auto"
            />

            {/* VIDEO TWO (Reward animation) */}
            <video
              ref={videoRef2}
              src={"https://cdn.worldofdypians.com/wod/secondPartMobile.mp4"}
              className={`kickstarter-video ${
                step === 2 || step === 3 ? "visible" : "hidden"
              }`}
              playsInline
              preload="auto"
            />
          </>
        ) : (
          <></>
        )}

        {showContent && (
          <>
            {/* <div className="d-flex flex-column gap-1 switch-chain-position switch-info-container p-3">
       
            {chains.map((item, index) => (
              <div
                key={index}
                className={`${
                  activeChain === item.id
                    ? "kickstarter-chain-item-active"
                    : "kickstarter-chain-item"
                } align-items-center p-2 d-flex flex-column gap-1`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setActiveChain(item.id);
                  switchNetwork(item.tag, item.chainId);
                }}
              >
                <img
                  src={`https://cdn.worldofdypians.com/wod/${
                    activeChain === item.id
                      ? item.activeImage
                      : hoverState === item.id
                      ? item.hoverImage
                      : item.inactiveImage
                  }`}
                  width={30}
                  height={30}
                  alt=""
                />
                <span
                  className="kickstarter-chain-span"
                  style={{
                    color:
                      hoverState === item.id
                        ? "#fff"
                        : activeChain === item.id
                        ? "gold"
                        : "#828FBB",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div> */}
            {/* <h6
            className={`kickstarter-title mb-0 mt-4 fade-in ${
              step === 3 && "opacity-0"
            }`}
          >
            Unlock Container
          </h6> */}

            {/* <div className="position-absolute top-0 start-0 w-100 h-100">
            {Array.from({ length: chestOpened ? 80 : 40 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="position-absolute rounded-circle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: chestOpened ? "8px" : "4px",
                  height: chestOpened ? "8px" : "4px",
                  background: chestOpened
                    ? "linear-gradient(45deg, #FDE047, #FB923C, #EF4444)"
                    : "linear-gradient(45deg, #FBBF24, #F97316)",
                  opacity: 0.8,
                  filter: chestOpened ? "blur(0.5px)" : "none",
                }}
                animate={{
                  scale: chestOpened ? [0, 3, 0] : [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  y: [0, chestOpened ? -300 : -180],
                  x: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: chestOpened ? 2.5 : 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`position-absolute start-50 translate-middle-x d-none ${
                step === 3 ? "d-none" : "d-lg-flex"
              }`}
              style={{ top: "20px", zIndex: 30 }}
            >
              <motion.div
                className="px-4 py-3"
                style={glassyContainerStyle}
                whileHover={{ scale: 1.02 }}
              >
                <motion.h1
                  className="text-center mb-0"
                  style={{
                    color: "rgba(219, 234, 254, 0.95)",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textShadow: "0 0 20px rgba(56, 189, 248, 0.5)",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(56, 189, 248, 0.5)",
                      "0 0 40px rgba(56, 189, 248, 0.8)",
                      "0 0 20px rgba(56, 189, 248, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  UNLOCK CONTAINER
                </motion.h1>
              </motion.div>
            </motion.div> */}
            {activatedReward !== null && (
              <motion.div
                key={rewardCategories[0].id}
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1 + 0 * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                // whileHover={{ scale: 1.02, y: -2, x: 3 }}
                className="selected-kick-reward overflow-hidden col-12 col-xxl-4"
              >
                {/* Gaming-style tier indicator */}

                {/* Animated scan line for active rewards */}
                

                <div className="text-center">
                  <motion.span
                    className="d-block selected-kick-count"
                    animate={{
                      scale: [1, 1.1, 1],

                      color: [
                        "rgba(255, 255, 255, 1)",
                        "rgba(132, 183, 247, 1)",
                        "rgba(255, 255, 255, 1)",
                      ],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    5,265 {rewardCategories[0].name}
                  </motion.span>
                </div>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              className="position-absolute"
              style={{ top: "16px", left: "24px", zIndex: 30 }}
            >
              <motion.div
                className="py-2 px-4 gap-2 gap-lg-0 d-flex flex-row flex-lg-column align-items-center"
                style={glassyContainerStyle}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-center mb-0 mb-lg-3"
                  style={{
                    color: "rgba(219, 234, 254, 0.9)",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                  animate={{
                    color: [
                      "rgba(219, 234, 254, 0.9)",
                      "rgba(191, 219, 254, 0.7)",
                      "rgba(219, 234, 254, 0.9)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Chain
                </motion.div>

                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex gap-2">
                    {chains.map((chain, index) => (
                      <motion.div
                        key={chain.id}
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.08,
                          type: "spring",
                          stiffness: 150,
                        }}
                      >
                        <button
                          disabled={disable}
                          onClick={() => {
                            setSelectedChain(chain.id);
                            setSocials(chain.socials);
                            switchNetwork(chain.hex, chain.chainId);
                          }}
                          onMouseEnter={() => setHoveredChain(chain.id)}
                          onMouseLeave={() => setHoveredChain(null)}
                          className="btn p-2 position-relative overflow-hidden border-0 rounded"
                          style={{
                            width: "32px",
                            height: "32px",
                            background:
                              selectedChain === chain.id
                                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 100%)"
                                : "linear-gradient(135deg, rgba(14, 25, 48, 0.4) 0%, rgba(10, 18, 36, 0.2) 100%)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border:
                              selectedChain === chain.id
                                ? "1px solid rgba(59, 130, 246, 0.4)"
                                : "1px solid rgba(59, 130, 246, 0.2)",
                            transform:
                              selectedChain === chain.id
                                ? "scale(1.1)"
                                : "scale(1)",
                            transition: "all 0.3s ease",
                          }}
                          aria-label={`Select ${chain.name}`}
                        >
                          <motion.div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={getChainGradient(chain)}
                            animate={{
                              opacity:
                                selectedChain === chain.id
                                  ? 0.3
                                  : hoveredChain === chain.id
                                  ? 0.2
                                  : 0.1,
                              scale:
                                selectedChain === chain.id ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: selectedChain === chain.id ? 2 : 0.3,
                              repeat: selectedChain === chain.id ? Infinity : 0,
                            }}
                          />

                          <motion.span
                            className="position-relative"
                            style={{ fontSize: "14px", zIndex: 10 }}
                            animate={{
                              scale:
                                selectedChain === chain.id ? [1, 1.2, 1] : 1,
                              rotate:
                                hoveredChain === chain.id ? [0, 5, -5, 0] : 0,
                            }}
                            transition={{
                              duration: selectedChain === chain.id ? 1 : 0.5,
                              repeat: selectedChain === chain.id ? Infinity : 0,
                            }}
                          >
                            <img
                              src={chain.logo}
                              width={16}
                              height={16}
                              alt=""
                            />
                          </motion.span>

                          {selectedChain === chain.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "12px",
                                height: "12px",
                                background:
                                  "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))",
                                marginTop: "-2px",
                                marginRight: "-2px",
                              }}
                            >
                              <motion.div
                                className="rounded-circle bg-white"
                                style={{ width: "4px", height: "4px" }}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedChain}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-center d-none d-lg-flex mt-3"
                    >
                      <motion.div
                        style={{
                          color: "rgba(219, 234, 254, 0.8)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.025em",
                        }}
                        animate={{
                          color: [
                            "rgba(219, 234, 254, 0.8)",
                            "rgba(191, 219, 254, 0.6)",
                            "rgba(219, 234, 254, 0.8)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {selectedChainData?.name}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="position-absolute new-info-container"
            >
              {/* Gaming-style animated border system */}
              <motion.div
                className="position-absolute top-0 start-0 w-100 h-100 rounded"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                  borderRadius: "18px",
                  zIndex: 1,
                }}
                animate={{
                  background: [
                    "linear-gradient(0deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                    "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                    "linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                    "linear-gradient(270deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                    "linear-gradient(360deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Gaming scan lines */}
              <motion.div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)",
                  borderRadius: "18px",
                  zIndex: 1,
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Corner accent lights */}

              <div
                className="h-100 px-3 py-2 d-flex flex-column position-relative"
                style={{ zIndex: 3 }}
              >
                {/* Compact Main Gaming Content */}
                <div className="flex-grow-1 row g-3">
                  {/* Left Gaming Panel: Chain Information with Description */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="col-lg-6 d-flex flex-column justify-content-between"
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(8, 16, 32, 0.9) 0%, rgba(12, 20, 40, 0.8) 50%, rgba(6, 12, 28, 0.7) 100%)",
                        border: "2px solid rgba(59, 130, 246, 0.3)",
                        borderRadius: "12px",
                        boxShadow:
                          "0 6px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(120, 170, 255, 0.2)",
                        padding: "12px",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Gaming panel scan line */}

                      {/* Chain Display with integrated Description */}
                      {/* Chain Header with Logo and Name */}
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <motion.div
                          className="rounded d-flex align-items-center justify-content-center position-relative overflow-hidden"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            ...getChainGradient(selectedChainData),
                            boxShadow: "0 3px 12px rgba(0,0,0,0.4)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          animate={{
                            boxShadow: [
                              `0 0 16px ${selectedChainData?.gradientFrom}60`,
                              `0 0 28px ${selectedChainData?.gradientTo}80`,
                              `0 0 16px ${selectedChainData?.gradientFrom}60`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <span
                            className="text-white"
                            style={{ fontSize: "14px", zIndex: 2 }}
                          >
                            <img
                              src={selectedChainData?.logo}
                              width={20}
                              height={20}
                              alt=""
                            />
                          </span>

                          {/* Rotating ring effect */}
                          <motion.div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              border: "1px solid rgba(255,255,255,0.3)",
                              borderTop: "1px solid rgba(255,255,255,0.8)",
                              borderRadius: "10px",
                            }}
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>

                        <div className="flex-grow-1">
                          <motion.h2
                            key={selectedChain}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-0"
                            style={{
                              color: "rgba(219, 234, 254, 1)",
                              fontSize: "14px",
                              fontWeight: "700",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              textShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                              lineHeight: "1.2",
                            }}
                          >
                            {selectedChainData?.name}
                          </motion.h2>
                          <motion.div
                            style={{
                              color: "rgba(96, 165, 250, 0.7)",
                              fontSize: "10px",
                              letterSpacing: "0.05em",
                            }}
                            animate={{
                              color: [
                                "rgba(96, 165, 250, 0.7)",
                                "rgba(147, 197, 253, 0.5)",
                                "rgba(96, 165, 250, 0.7)",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ● ACTIVE
                          </motion.div>
                        </div>

                        {/* Compact Social Links */}
                        <div className="d-flex gap-1">
                          {socials.map(
                            ({ link, Icon, label, color }, index) => (
                              <a href={link} target="_blank" key={index}>
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + index * 0.05 }}
                                >
                                  <button
                                    className="btn p-1 rounded border-0 position-relative overflow-hidden"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      background:
                                        "linear-gradient(135deg, rgba(8, 16, 32, 0.9) 0%, rgba(12, 20, 40, 0.7) 100%)",
                                      border:
                                        "1px solid rgba(59, 130, 246, 0.3)",
                                      color: "rgba(191, 219, 254, 0.8)",
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                      transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = color;
                                      e.currentTarget.style.borderColor = `${color}60`;
                                      e.currentTarget.style.boxShadow = `0 0 8px ${color}40`;
                                      e.currentTarget.style.background = `linear-gradient(135deg, rgba(8, 16, 32, 0.9) 0%, ${color}20 100%)`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color =
                                        "rgba(191, 219, 254, 0.8)";
                                      e.currentTarget.style.borderColor =
                                        "rgba(59, 130, 246, 0.3)";
                                      e.currentTarget.style.boxShadow =
                                        "0 2px 8px rgba(0,0,0,0.3)";
                                      e.currentTarget.style.background =
                                        "linear-gradient(135deg, rgba(8, 16, 32, 0.9) 0%, rgba(12, 20, 40, 0.7) 100%)";
                                    }}
                                    aria-label={label}
                                  >
                                    {/* <Icon
                                  style={{ width: "12px", height: "12px" }}
                                /> */}
                                    <img
                                      src={Icon}
                                      width={18}
                                      height={18}
                                      alt=""
                                    />
                                  </button>
                                </motion.div>
                              </a>
                            )
                          )}
                        </div>
                      </div>

                      {/* Project Description - Positioned Below Project Name */}
                      <motion.div
                        key={selectedChain}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="kickstarter-chain-description"
                        // animate={{
                        //   color: ["rgba(219, 234, 254, 0.85)", "rgba(191, 219, 254, 0.75)", "rgba(219, 234, 254, 0.85)"]
                        // }}
                        transition={{
                          duration: 0.5,
                          repeat: 0,
                          ease: "easeInOut",
                        }}
                      >
                        {selectedChain === "bnb" &&
                          "BNB Chain delivers high-speed, low-cost transactions for Web3, DeFi, NFTs, and gaming applications. Built for developers who want Ethereum compatibility with superior performance and minimal fees."}
                        {selectedChain === "opbnb" &&
                          "An optimized layer-2 solution that delivers lower fees and higher throughput to unlock the full potential of the BNB Chain"}
                      </motion.div>
                      <div className="d-flex flex-column h-100 justify-content-end justify-content-lg-between gap-3 gap-lg-0 d-flex d-lg-none">
                        <div
                          className="mt-2"
                          style={{
                            color: "rgba(219, 234, 254, 1)",
                            fontSize: "15px",
                            fontWeight: "700",
                            letterSpacing: "0.05em",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            textTransform: "uppercase",
                          }}
                        >
                          PRIZES
                        </div>
                        <div className="d-flex gap-2 w-100 align-items-center justify-content-between">
                          {rewardCategories.map((category, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center justify-content-between"
                              style={{ width: "fit-content" }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={category.icon}
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                                <div className="d-flex flex-column gap-1">
                                  <div
                                    style={{
                                      color: "rgba(219, 234, 254, 1)",
                                      fontSize: "10px",
                                      fontWeight: "700",
                                      letterSpacing: "0.05em",
                                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {category.name}
                                  </div>
                                  <div
                                    style={{
                                      color: "rgba(168, 192, 255, 0.9)",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.05em",
                                    }}
                                  >
                                    {category.count}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Gaming Panel: Compact Vertical Rewards Display */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="col-lg-6 d-none d-lg-flex position-relative"
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(8, 16, 32, 0.95) 0%, rgba(12, 20, 40, 0.85) 50%, rgba(6, 12, 28, 0.75) 100%)",
                        backdropFilter: "blur(25px)",
                        WebkitBackdropFilter: "blur(25px)",
                        border: "2px solid rgba(59, 130, 246, 0.4)",
                        borderRadius: "12px",
                        boxShadow:
                          "0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(120, 170, 255, 0.2)",
                        // height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(59, 130, 246, 0.1), transparent, rgba(59, 130, 246, 0.1))",
                          borderRadius: "10px",
                        }}
                        animate={{
                          y: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {/* VERTICAL Rewards List - No Header */}
                      <div className="d-flex flex-column h-100 justify-content-between">
                        <div
                          className="py-2 py-xxl-3 px-2"
                          style={{
                            color: "rgba(219, 234, 254, 1)",
                            fontSize: "15px",
                            fontWeight: "700",
                            letterSpacing: "0.05em",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            textTransform: "uppercase",
                          }}
                        >
                          PRIZES
                        </div>
                        <div
                          className="py-0 py-xxl-3 px-3 d-flex flex-column flex-xxl-row align-items-center justify-content-center gap-2 w-100"
                          style={{ zIndex: 2 }}
                        >
                          {rewardCategories.map((category, index) => (
                            <motion.div
                              key={category.id}
                              initial={{ opacity: 0, scale: 0, x: 30 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                              }}
                              transition={{
                                delay: 0.9 + index * 0.1,
                                type: "spring",
                                stiffness: 120,
                              }}
                              // whileHover={{ scale: 1.02, y: -2, x: 3 }}
                              className="position-relative overflow-hidden col-12 col-xxl-4"
                              style={{
                                padding: "6px 12px",
                                background:
                                  activatedReward === category.id
                                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 50%, rgba(8, 16, 32, 0.8) 100%)"
                                    : "linear-gradient(135deg, rgba(8, 16, 32, 0.8) 0%, rgba(12, 20, 40, 0.6) 50%, rgba(6, 12, 28, 0.4) 100%)",
                                border:
                                  activatedReward === category.id
                                    ? "2px solid rgba(59, 130, 246, 0.6)"
                                    : "1px solid rgba(59, 130, 246, 0.25)",
                                borderRadius: "10px",
                                boxShadow:
                                  activatedReward === category.id
                                    ? `0 0 20px ${
                                        category.color.includes("yellow")
                                          ? "#F59E0B"
                                          : category.color.includes("blue")
                                          ? "#3B82F6"
                                          : "#A855F7"
                                      }40, inset 0 1px 0 rgba(120, 170, 255, 0.15)`
                                    : "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(120, 170, 255, 0.1)",
                                // cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {/* Gaming-style tier indicator */}
                              <motion.div
                                className="position-absolute top-0 start-0"
                                style={{
                                  width: "3px",
                                  height: "100%",
                                  ...getRewardGradient(category),
                                  borderRadius: "2px 0 0 2px",
                                }}
                                animate={{
                                  opacity:
                                    activatedReward === category.id
                                      ? [0.6, 1, 0.6]
                                      : 0.4,
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat:
                                    activatedReward === category.id
                                      ? Infinity
                                      : 0,
                                  ease: "easeInOut",
                                }}
                              />

                              {/* Animated scan line for active rewards */}
                              {activatedReward === category.id && (
                                <motion.div
                                  className="position-absolute top-0 start-0 w-100 h-100"
                                  style={{
                                    background:
                                      "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
                                    borderRadius: "8px",
                                  }}
                                  animate={{
                                    x: ["-100%", "200%"],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                              )}

                              <div
                                className="d-flex align-items-center justify-content-between position-relative"
                                style={{ zIndex: 2 }}
                              >
                                <div className="d-flex align-items-center gap-2">
                                  {/* Reward icon */}
                                  <img
                                    src={category.icon}
                                    width={32}
                                    height={32}
                                    alt=""
                                  />

                                  {/* Reward info */}
                                  <div className="flex-grow-1">
                                    <div className="d-flex align-items-center gap-1 mb-1">
                                      <div className="kickstarter-reward-title">
                                        {category.name}
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <div
                                        style={{
                                          color: "rgba(168, 192, 255, 0.7)",
                                          fontSize: "10px",
                                          fontWeight: "500",
                                          textTransform: "uppercase",
                                          letterSpacing: "0.05em",
                                        }}
                                      >
                                        {category.rarity}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Count display */}
                                <div className="text-end">
                                  <motion.span
                                    className="d-block"
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: "700",
                                      color:
                                        activatedReward === category.id
                                          ? "rgba(219, 234, 254, 1)"
                                          : "rgba(168, 192, 255, 0.9)",
                                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                                      letterSpacing: "0.025em",
                                    }}
                                    animate={{
                                      scale:
                                        activatedReward === category.id
                                          ? [1, 1.1, 1]
                                          : 1,
                                      color:
                                        activatedReward === category.id
                                          ? [
                                              "rgba(219, 234, 254, 1)",
                                              "rgba(96, 165, 250, 1)",
                                              "rgba(219, 234, 254, 1)",
                                            ]
                                          : "rgba(168, 192, 255, 0.9)",
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      repeat:
                                        activatedReward === category.id
                                          ? Infinity
                                          : 0,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    {category.count}
                                  </motion.span>
                                </div>
                              </div>

                              {/* Activation indicator */}
                              {/* {activatedReward === category.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-center mt-2 position-relative"
                              style={{ zIndex: 2 }}
                            >
                              <motion.div
                                className="px-2 py-1 rounded"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.3), rgba(34, 197, 94, 0.2))",
                                  border: "1px solid rgba(34, 197, 94, 0.4)",
                                  color: "rgba(147, 197, 253, 0.9)",
                                  letterSpacing: "0.05em",
                                  fontSize: "9px",
                                  fontWeight: "600",
                                  textTransform: "uppercase",
                                }}
                                animate={{
                                  scale: [1, 1.03, 1],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                🎉 ACTIVATED 🎉
                              </motion.div>
                            </motion.div>
                          )} */}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Gaming panel ambient effect */}
                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(59, 130, 246, 0.05), transparent)",
                          borderRadius: "12px",
                        }}
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Gaming-Style Claim Button */}
                <div
                  className="d-flex justify-content-center pt-3"
                  style={{ zIndex: 10 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
            <div className="kickstarter-button-position">
              {!email && coinbase && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <NavLink
                    to="/auth"
                    onClick={() => {
                      onClose();
                      onAddClass(false);
                    }}
                    className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden"
                    style={{
                      padding: "14px 48px",
                      fontSize: "16px",
                      fontWeight: "700",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background:
                        "linear-gradient(135deg, #10b96aff, #05963dff, #04782bff)",

                      border: "2px solid rgba(16, 185, 100, 0.8)",

                      borderRadius: "14px",
                      boxShadow:
                        "0 0 50px rgba(34, 197, 121, 0.7), inset 0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.4)",

                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      zIndex: 10,
                      width: "276px",
                    }}
                  >
                    <motion.div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transform: "skewX(-20deg)",
                      }}
                      animate={{
                        x: ["-150%", "250%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />

                    <motion.div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderRadius: "14px",
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="d-flex align-items-center gap-3">
                      <span>LOG IN</span>
                    </div>
                  </NavLink>
                </motion.div>
              )}
              {!isConnected && !coinbase && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <button
                    disabled={disable}
                    onClick={onConnectWallet}
                    className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden"
                    style={{
                      padding: "14px 48px",
                      fontSize: "16px",
                      fontWeight: "700",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background:
                        "linear-gradient(135deg, #1083b9ff, #056196ff, #042978ff)",

                      border: "2px solid rgba(16, 165, 185, 0.8)",

                      borderRadius: "14px",
                      boxShadow:
                        "0 0 50px rgba(34, 165, 197, 0.7), inset 0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.4)",

                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      zIndex: 10,
                      width: "276px",
                    }}
                  >
                    <motion.div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transform: "skewX(-20deg)",
                      }}
                      animate={{
                        x: ["-150%", "250%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />

                    <motion.div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderRadius: "14px",
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="d-flex align-items-center gap-3">
                      <span>CONNECT WALLET</span>
                    </div>
                  </button>
                </motion.div>
              )}
              {isConnected &&
                coinbase &&
                email &&
                chainId !== 56 &&
                chainId !== 204 && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  >
                    <button
                      disabled={disable}
                      onClick={() => switchNetwork("0x38", 56)}
                      className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden"
                      style={{
                        padding: "14px 48px",
                        fontSize: "16px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background:
                          "linear-gradient(135deg, #b6b910ff, #968005ff, #785304ff)",

                        border: "2px solid rgba(185, 168, 16, 0.8)",

                        borderRadius: "14px",
                        boxShadow:
                          "0 0 50px rgba(197, 181, 34, 0.7), inset 0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.4)",

                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                        zIndex: 10,
                        width: "276px",
                      }}
                    >
                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          transform: "skewX(-20deg)",
                        }}
                        animate={{
                          x: ["-150%", "250%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />

                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderRadius: "14px",
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      <div className="d-flex align-items-center gap-3">
                        <span>SWITCH CHAIN</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              {isConnected &&
                coinbase &&
                email &&
                (chainId === 56 || chainId === 204) && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  >
                    <button
                      onClick={handleClaim}
                      disabled={isClaimLoading || chestOpened || disable}
                      className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden kick-claim-btn d-flex justify-content-center align-items-center"
                      style={{
                        padding: "14px 48px",
                        fontSize: "16px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: chestOpened
                          ? "linear-gradient(135deg, #10B981, #059669, #047857)"
                          : "linear-gradient(135deg, #F97316, #DC2626, #BE185D)",
                        border: chestOpened
                          ? "2px solid rgba(16, 185, 129, 0.8)"
                          : "2px solid rgba(249, 115, 22, 0.8)",
                        borderRadius: "14px",
                        boxShadow: chestOpened
                          ? "0 0 50px rgba(34, 197, 94, 0.7), inset 0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.4)"
                          : "0 0 50px rgba(249, 115, 22, 0.7), inset 0 0 40px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.4)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        opacity: isClaimLoading || chestOpened ? 0.9 : 1,
                        textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                        zIndex: 10,
                        width: "276px",
                      }}
                    >
                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          transform: "skewX(-20deg)",
                        }}
                        animate={{
                          x: ["-150%", "250%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />

                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderRadius: "14px",
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {isClaimLoading ? (
                        <div className="d-flex align-items-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="border border-white rounded-circle"
                            style={{
                              width: "18px",
                              height: "18px",
                              borderTop: "3px solid transparent",
                            }}
                          />
                          <span>UNLOCKING</span>
                        </div>
                      ) : chestOpened ? (
                        <div className="d-flex align-items-center gap-3">
                          {/* <motion.div
                              animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 360, 0],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              ✅
                            </motion.div> */}
                          <span>UNLOCKED!</span>
                          {/* <motion.div
                              animate={{
                                scale: [1, 1.4, 1],
                                rotate: [0, 15, -15, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              🎉
                            </motion.div> */}
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-3">
                          <span>CLAIM</span>
                        </div>
                      )}
                    </button>
                  </motion.div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Kickstarter;
