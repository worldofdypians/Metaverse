import { useRef, useEffect, useState } from "react";
import "./_battlepopup.scss";
import xMark from "../Kickstarter/assets/kickstarterXMark.svg";
import { switchNetworkWagmi } from "../../utils/wagmiSwitchChain";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import click from "./click.mp3";
import fightBgMusic from "./fightBgMusic.mp3";
import { getTransaction } from "@wagmi/core";

import { fighters } from "./battleInfo";
import OutsideClickHandler from "react-outside-click-handler";
import Countdown from "react-countdown";
import {
  writeContract as wagmiWriteContract,
  waitForTransactionReceipt as wagmiWaitForTransactionReceipt,
  switchChain as wagmiSwitchChain,
  readContract as wagmiReadContract,
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../wagmiConnectors";
import { bsc } from "wagmi/chains";

const renderer = ({ hours, minutes }) => {
  return (
    <span className="fighter-timer">
      {hours < 10 ? "0" + hours : hours}H:
      {minutes < 10 ? "0" + minutes : minutes}M
    </span>
  );
};

const rewardCategories = [
  {
    id: "Points",
    name: "POINTS",
    icon: "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp",
    count: "20K",
    color: "from-blue-400 to-purple-500",
    rarity: "COMMON",
    tier: "TIER II",
  },
  {
    id: "Stars",
    name: "STARS",
    icon: "https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp",
    count: "350",
    color: "from-yellow-400 to-orange-500",
    rarity: "RARE",
    tier: "TIER I",
  },
  {
    id: "Rewards",
    name: "REWARDS",
    icon: "https://cdn.worldofdypians.com/wod/ai-reward-active.webp",
    count: "$200",
    color: "from-purple-500 to-pink-500",
    rarity: "EPIC",
    tier: "TIER III",
  },
];

const BattlePopup = ({
  onClose,
  onClaimRewards,
  isConnected,
  coinbase,
  chainId,
  onConnectWallet,
  email,
  address,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  network_matchain,
  isOpen,
  walletClient,
  publicClient,
  closePopup,
  setClosePopup,
  battleFightResults,
  fightInfo,
  onFightInfoUpdate,
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const windowSize = useWindowSize();
  const MIN_APPROVAL = 5000000000000000000n; // 5 WOD with 18 decimals
  const MAX_APPROVE_AMOUNT = 500000000000000000000000n; // 500,000 * 1e18
  
  const readOnChain = async ({ address, abi, functionName, args = [] }) => {
    try {
      if (window.WALLET_TYPE === "matchId" && publicClient) {
        return await publicClient.readContract({
          address,
          abi,
          functionName,
          args,
        });
      }
      return await wagmiReadContract(wagmiClient, {
        address,
        abi,
        functionName,
        args,
        chainId: bsc.id,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const writeOnChain = async ({ address, abi, functionName, args = [] }) => {
    try {
      if (window.WALLET_TYPE === "matchId" && walletClient && publicClient) {
        const hash = await walletClient.writeContract({
          address,
          abi,
          functionName,
          args,
        });
        await publicClient.waitForTransactionReceipt({ hash });
        return hash;
      }

      const account = getAccount(wagmiClient);
      if (account?.chainId && chainId && account.chainId !== chainId) {
        try {
          await wagmiSwitchChain(wagmiClient, { chainId });
        } catch (e) {
          console.error("switchChain failed or not supported", e);
        }
      }

      const hash = await wagmiWriteContract(wagmiClient, {
        address,
        abi,
        functionName,
        args,
        account: account?.address,
        chainId,
      });
      await wagmiWaitForTransactionReceipt(wagmiClient, { hash });
      return hash;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  let now = new Date().getTime();
  const midnightTime = new Date(now).setUTCHours(24, 30, 0, 0);

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

  const clickSound = "https://cdn.worldofdypians.com/wod/aiOryn/click.mp3";

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
          Icon: "https://cdn.worldofdypians.com/wod/twitterMap.svg",
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
          Icon: "https://cdn.worldofdypians.com/wod/websiteMap.svg",
          label: "Website",
          color: "#059669",
          link: "https://www.bnbchain.org/en",
        },
      ],
    },
    // {
    //   id: "opbnb",
    //   name: "opBNB",
    //   symbol: "BNB",
    //   logo: "https://cdn.worldofdypians.com/wod/opbnbChain.png",
    //   desc: "An optimized layer-2 solution that delivers lower fees and higher throughput to unlock the full potential of the BNB Chain",
    //   color: "from-blue-400 to-purple-600",
    //   gradientFrom: "#F59E0B",
    //   gradientTo: "#1a1024ff",
    //   hex: "0xcc",
    //   chainId: 204,
    //   socials: [
    //     {
    //       Icon: "https://cdn.worldofdypians.com/wod/twitterMap.svg",
    //       label: "Twitter",
    //       color: "#1DA1F2",
    //       link: "https://x.com/BNBChain",
    //     },
    //     {
    //       Icon: "https://cdn.worldofdypians.com/wod/telegramMap.svg",
    //       label: "Telegram",
    //       color: "#0088CC",
    //       link: "https://t.me/bnbchain",
    //     },
    //     {
    //       Icon: "https://cdn.worldofdypians.com/wod/discordMap.svg",
    //       label: "Discord",
    //       color: "#5865F2",
    //       link: "https://discord.com/invite/bnbchain",
    //     },
    //     {
    //       Icon: "https://cdn.worldofdypians.com/wod/websiteMap.svg",
    //       label: "Website",
    //       color: "#059669",
    //       link: "https://opbnb.bnbchain.org/en",
    //     },
    //   ],
    // },
  ];
  const btnRef = useRef(null);
  const [showContent, setShowContent] = useState(true);
  const [step, setStep] = useState(1);
  const [fightStep, setFightStep] = useState(1);
  const [selectedChain, setSelectedChain] = useState("");
  const [hoveredChain, setHoveredChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socials, setSocials] = useState(chains[0].socials);
  const [count, setCount] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [mute, setMute] = useState(false);
  const [selectedPlayer, setselectedPlayer] = useState(fighters[0]);
  const [fightType, setFightType] = useState(null);
  const [showRewards, setShowRewards] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false);
  const [tempfighter, setTempfighter] = useState(fighters[0]);
  const [dummyCount, setDummyCount] = useState(0);

  function handleEsc(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      if (fightStep === 1) {
        onClose();
      } else {
        setClosePopup(true);
      }
    }
  }

  const audioRef = useRef(null);
  const audioInitializedRef = useRef(false);

  useEffect(() => {
    if (!audioInitializedRef.current) {
      audioRef.current = new Audio(fightBgMusic);
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";

      audioRef.current.addEventListener("canplaythrough", () => {
        console.log("Audio ready to play");
      });

      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });

      audioInitializedRef.current = true;
    }

    return () => {
      if (audioRef.current && audioInitializedRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    // 🔊 Play or stop when popup opens/closes
    if (!audioRef.current || !audioInitializedRef.current) {
      return;
    }

    const audio = audioRef.current;

    if (isOpen) {
      const playAudio = async () => {
        try {
          if (!audio.paused) {
            return;
          }

          if (audio.currentTime > 0) {
            audio.currentTime = 0;
          }

          await audio.play();
          console.log("Audio playing successfully");
        } catch (err) {
          if (
            err.name === "NotAllowedError" ||
            err.name === "NotSupportedError"
          ) {
            console.warn(
              "Audio autoplay blocked by browser. User interaction required."
            );
          } else if (err.name !== "AbortError") {
            console.warn("Audio play failed:", err);
          }
        }
      };

      playAudio();
    } else {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (fightInfo) {
      setDisableButtons(true);
      setselectedPlayer(fightInfo.fighter);
      setTempfighter(fightInfo.fighter);
    }
  }, [fightInfo]);

  // Attach listener
  window.addEventListener("keydown", handleEsc);

  const getUserRewards = async (userEmail, txHash, chestId, character) => {
    const userData_bnb = {
      email: userEmail,
      transactionHash: txHash,
      chainId: chestId,
      character: character,
    };

    const result = await axios
      .post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/FightOfTheDay?code=hr_pNQLryfbN54Xmc8l2JeycDYBCeePgfsqkJCdMTsSyAzFue2nU_w==",
        userData_bnb
      )
      .catch((e) => {
        if (e.response.status === 400) {
          const timer = setTimeout(() => {
            getUserRewards2(userEmail, txHash, chestId, character);
          }, 1000);
          return () => clearTimeout(timer);
        } else {
          setLoading(false);

          window.alertify.error(e?.message);
          console.error(e);
        }
      });
    if (result && result.status === 200) {
      console.log(result.data.rewards);
      setLoading(false);
      setStep(2);
      onClaimRewards(email, "bnb");

      setTimeout(() => {
        setLoading(false);

        setFightType(result.data.victory === true ? "WIN" : "LOSE");
        setFightStep(2);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Step 2 lasts 4.3s
        setTimeout(() => {
          setFightStep(3);

          // Step 3 lasts 25.5s
          setTimeout(() => {
            setClosePopup(false);
            setFightStep(1); 

            if (audioRef.current) {
              audioRef.current.play().catch((err) => {
                if (err.name !== "AbortError")
                  console.warn("Audio play failed:", err);
              });
            }
            setDummyCount(1);
          }, 26500);

          // 🎁 Save data + show rewards
          setTimeout(() => {
            const newFightInfo = {
              id: "Points",
              name: "POINTS",
              icon: "https://cdn.worldofdypians.com/wod/ai-reward-active.webp",
              count: "20K",
              color: "from-blue-400 to-purple-500",
              rarity: "COMMON",
              tier: "TIER II",
              fighter: selectedPlayer,
              win: result.data.victory,
            };
            if (onFightInfoUpdate) {
              onFightInfoUpdate(newFightInfo);
            }

            if (result.data.victory) {
              setShowRewards(true);
            }
          }, 21500);
        }, 4300);
      }, 2500);
      setTimeout(() => {
        setRewards(result.data.rewards);
      }, 3600);

      setLoading(false);
    }
  };
  const getUserRewards2 = async (userEmail, txHash, chestId, character) => {
    const userData_bnb = {
      email: userEmail,
      transactionHash: txHash,
      chainId: chestId,
      character: character,
    };

    const result = await axios
      .post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/FightOfTheDay?code=hr_pNQLryfbN54Xmc8l2JeycDYBCeePgfsqkJCdMTsSyAzFue2nU_w==",
        userData_bnb
      )
      .catch((e) => {
        setLoading(false);
        window.alertify.error(e?.message);
      });
    if (result && result.status === 200) {
      console.log(result.data);
      onClaimRewards(email, "bnb");
      setLoading(false);
      setStep(2);
      setTimeout(() => {
        setLoading(false);
        const randomBit = Math.round(Math.random());
        console.log(randomBit, "random");

        setFightType(randomBit === 0 ? "LOSE" : "WIN");
        setFightStep(2);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Step 2 lasts 4.3s
        setTimeout(() => {
          setFightStep(3);

          // Step 3 lasts 25.5s
          setTimeout(() => {
            setClosePopup(false);
            setFightStep(1); 

            if (audioRef.current) {
              audioRef.current.play().catch((err) => {
                if (err.name !== "AbortError")
                  console.warn("Audio play failed:", err);
              });
            }
            setDummyCount(1);
          }, 26500);

          // 🎁 Save data + show rewards
          setTimeout(() => {
            const newFightInfo = {
              id: "Points",
              name: "POINTS",
              icon: "https://cdn.worldofdypians.com/wod/ai-reward-active.webp",
              count: "20K",
              color: "from-blue-400 to-purple-500",
              rarity: "COMMON",
              tier: "TIER II",
              fighter: selectedPlayer,
              win: randomBit !== 0,
            };
            if (onFightInfoUpdate) {
              onFightInfoUpdate(newFightInfo);
            }

            if (randomBit !== 0) {
              setShowRewards(true);
            }
          }, 21500);
        }, 4300);
      }, 2500);
      setTimeout(() => {
        setRewards(result.data.rewards);
      }, 3600);

      setLoading(false);
    }
  };

  const handleStrike = async () => {
    setLoading(true);
    try {
      const contractConfig = {
        address: window.config.single_strike_address,
        abi: window.SINGLE_STRIKE_ABI,
        chainText: "bnb",
      };
      if (!contractConfig)
        throw new Error("Unsupported chain for chest contract.");

      const functionName = "strike";

      // If user is on MatchID wallet, use provided viem walletClient/publicClient
      if (window.WALLET_TYPE === "matchId" && walletClient && publicClient) {
        const txHash = await walletClient.writeContract({
          address: contractConfig.address,
          abi: contractConfig.abi,
          functionName,
          args: [],
        });

        await publicClient.waitForTransactionReceipt({ hash: txHash });
        // onClaimRewards(email, txHash, contractConfig.chainText);
        getUserRewards(email, txHash, "bnb", selectedPlayer.id);
        //   if (video) {
        //     video.play().catch((err) => console.error("Play failed:", err));
        //     setTimeout(() => {
        //       video.pause();
        //       setStep(3);
        //       onClaimRewards();
        //     }, 8000);
        //   }

        return;
      }

      // Default: use wagmi connected wallet via viem
      const account = getAccount(wagmiClient);

      if (account?.chainId && account.chainId !== chainId) {
        try {
          await wagmiSwitchChain(wagmiClient, { chainId });
        } catch (e) {
          console.error("switchChain failed or not supported", e);
        }
      }

      const txHash = await wagmiWriteContract(wagmiClient, {
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName,
        args: [],
        account: account?.address, // optional, connector will provide
        chainId,
      });

      let receipt;
      const maxRetries = 5;
      for (let i = 0; i < maxRetries; i++) {
        receipt = await wagmiWaitForTransactionReceipt(wagmiClient, {
          hash: txHash,
        }).catch(() => null);
        if (receipt) break;
        // wait 2 seconds before retry
        await new Promise((res) => setTimeout(res, 2000));
      }

      if (!receipt)
        throw new Error("Failed to get transaction receipt after retries");

      console.log("Transaction confirmed in block:", receipt.blockNumber);

      if (receipt) {
        getUserRewards(email, txHash, "bnb", selectedPlayer.id);
        // onClaimRewards(email, txHash, contractConfig.chainText);
        //   if (video) {
        //     video.play().catch((err) => console.error("Play failed:", err));
        //     setTimeout(() => {
        //       video.pause();
        //       setStep(3);
        //       onClaimRewards();
        //     }, 8000);
        //   }
      }

      return;
    } catch (unifiedError) {
      // Fallback to legacy paths below if unified flow fails (keeps backward compatibility)
      console.error(
        "Unified wagmi/viem flow failed, falling back",
        unifiedError
      );
      window.alertify.error(unifiedError?.message);
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);

      await writeOnChain({
        address: window.config.wod_token_address,
        abi: window.TOKEN_ABI,
        functionName: "approve",
        args: [window.config.single_strike_address, MAX_APPROVE_AMOUNT],
      });

      setTimeout(() => {
        handleStrike();
      }, 1500);
    } catch (e) {
      window.alertify.error(e?.message);
      setLoading(false);
      console.error(e);
    }
  };

  const checkStates = async () => {
    const allowance = await readOnChain({
      address: window.config.wod_token_address,
      abi: window.TOKEN_ABI,
      functionName: "allowance",
      args: [coinbase, window.config.single_strike_address],
    }).catch(() => 0n);

    if (BigInt(allowance) === 0n || BigInt(allowance) < MIN_APPROVAL) {
      handleApprove();
    } else handleStrike();
  };
  const handleStartFight = () => {
    setLoading(true);
    checkStates();
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

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId =
      typeof chain === "number" ? chain : parseInt(hexChainId, 16);

    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        network_matchain,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
    }
  };

  const html = document.querySelector("html");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isOpen) {
      if (window.scrollY === 0) {
        html.classList.add("hidescroll");
      } else {
        const onScroll = () => {
          if (window.scrollY === 0) {
            html.classList.add("hidescroll");
            window.removeEventListener("scroll", onScroll);
          }
        };
        window.addEventListener("scroll", onScroll);
      }
    } else {
      html.classList.remove("hidescroll");
    }

    return () => {
      html.classList.remove("hidescroll");
      window.removeEventListener("scroll", () => {});
    };
  }, [isOpen]);

  const hashValue = window.location.hash;

  useEffect(() => {
    if (count === 0) {
      setCount(1);
    }

    if (hashValue === "#arena-of-rage") {
      setMute(true);
      html.classList.add("hidescroll");
    }
  }, [count]);

  useEffect(() => {
    if (chainId === 56) {
      setSelectedChain("bnb");
      setSocials(chains[0].socials);
    } else {
      setSelectedChain("bnb");
      setSocials(chains[0].socials);
    }
  }, [chainId]);

  if (!isOpen) return null;

  return (
    <div className="kickstarter-container slide-in d-flex flex-column justify-content-between align-items-center">
      <div className="position-relative  d-flex w-100 h-100 flex-column align-items-center">
        <img
          src={xMark}
          className="kickstarter-close"
          alt=""
          onClick={() => {
            setShowContent(false);
            if (fightStep === 1) {
              onClose();
            } else {
              setClosePopup(true);
            }
          }}
        />
        {fightStep === 1 && (
          <>
            {windowSize.width > 786 ? (
              <div className="position-absolute hero-name-wrapper overflow-hidden d-flex justify-content-between align-items-center">
                {/* <div className="d-flex hero-name-item col-3 justify-content-center">
                  <span className=" selected-hero-name font-abaddon">
                    {selectedPlayer.name}
                  </span>
                </div> */}
                {/* <div className="d-flex hero-name-item col-3 justify-content-center">
                  <span className=" selected-hero-name font-abaddon">
                    Dark Lord
                  </span>
                </div> */}
              </div>
            ) : (
              <>
                {/* <span className=" selected-hero-name-2 font-abaddon">
                  {selectedPlayer.name}
                </span> */}
                <span className=" selected-hero-name-3 font-abaddon">
                  Dark Lord
                </span>
              </>
            )}
          </>
        )}
        {fightInfo !== null && fightStep === 1 && (
          <>
            {fightInfo.win ? (
              <>
                {selectedPlayer.name === tempfighter.name && <></>}
                <div className="fighter-lose-rewards-wrapper d-flex flex-column gap-2 align-items-center justify-content-center">
                  <h6 className="fighter-win-rewards-text mb-0 text-white font-abaddon">
                    Loser
                  </h6>
                </div>
              </>
            ) : (
              <>
                {selectedPlayer.name === tempfighter.name && <></>}
                <div className="fighter-win-rewards-wrapper-2 d-flex flex-column gap-2 align-items-center justify-content-center">
                  <h6 className="fighter-win-rewards-text mb-0 text-white font-abaddon">
                    Winner
                  </h6>
                </div>
              </>
            )}
          </>
        )}
        {fightStep === 1 ? (
          <div className="d-flex align-items-center flex-column flex-lg-row h-100 w-100">
            <motion.div
              key={
                // isFighting
                //   ? selectedFighter.videoOfFight:
                selectedPlayer.videoLoop
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className=""
            >
              <div className="hero-name-position">
                <div className="d-flex hero-name-item  justify-content-center">
                  <span className=" selected-hero-name font-abaddon">
                    {selectedPlayer.name}
                  </span>
                </div>
              </div>
              {fightInfo !== null && fightStep === 1 && (
                <>
                  {fightInfo.win === true ? (
                    <>
                      {selectedPlayer.name === tempfighter.name && (
                        <div className="fighter-win-rewards-wrapper d-flex flex-column gap-2 align-items-center justify-content-center">
                          <h6 className="fighter-win-rewards-text mb-0 text-white font-abaddon">
                            Winner
                          </h6>
                          <div className="fighter-win-rewards d-flex align-items-center gap-3 p-2">
                            {battleFightResults &&
                              battleFightResults.rewards?.length > 0 &&
                              battleFightResults.rewards.map(
                                (reward, index) => {
                                  return (
                                    <div
                                      className="d-flex align-items-end gap-1"
                                      key={index}
                                    >
                                      <span className="fighter-win-rewards-amount">
                                        {getFormattedNumber(
                                          reward.reward,
                                          reward.rewardType === "money" ? 2 : 0
                                        )}
                                      </span>
                                      <span className="fighter-win-rewards-type text-capitalize">
                                        {reward.rewardType === "money"
                                          ? "$"
                                          : reward.rewardType}
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedPlayer.name === tempfighter.name && (
                        <div className="fighter-lose-rewards-wrapper-2 d-flex flex-column gap-2 align-items-center justify-content-center">
                          <h6 className="fighter-win-rewards-text mb-0 text-white font-abaddon">
                            Loser
                          </h6>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {selectedPlayer.class && (
                <div className="fighter-class-wrapper d-flex col-2  h-fit p-3 flex-column gap-2 align-items-end justify-content-center">
                  <h6 className="selected-hero-class m-0 font-unzialish">
                    {selectedPlayer.class}
                  </h6>
                </div>
              )}
              <video
                src={selectedPlayer.videoLoop}
                className={`fight-video`}
                playsInline
                preload="auto"
                loop
                autoPlay
              />
            </motion.div>
            <div className="hero-name-position-2">
              <div className="d-flex hero-name-item  justify-content-center">
                <span className=" selected-hero-name font-abaddon">
                  Dark Lord
                </span>
              </div>
            </div>
            <video
              src={
                "https://cdn.worldofdypians.com/wod/battleVideos/darkLordLOOP.mp4"
              }
              className={`fight-video-2`}
              playsInline
              preload="auto"
              loop
              autoPlay
            />
          </div>
        ) : fightStep === 2 ? (
          <video
            src={`https://cdn.worldofdypians.com/wod/battleVideos/${
              selectedPlayer.id
            }VS${windowSize.width > 450 ? "" : "mobile"}.mp4`}
            className={`fight-video-vs`}
            playsInline
            preload="auto"
            autoPlay
          />
        ) : fightStep === 3 ? (
          <>
            {windowSize.width > 786 ? (
              <video
                ref={videoRef3}
                src={`https://cdn.worldofdypians.com/wod/battleVideos/${selectedPlayer.id}${fightType}.mp4`}
                className={`fight-video-vs`}
                playsInline
                preload="auto"
                autoPlay
              />
            ) : (
              <video
                ref={videoRef3}
                src={`https://cdn.worldofdypians.com/wod/battleVideos/${selectedPlayer.id}${fightType}mobile.mp4`}
                className={`fight-video-vs`}
                playsInline
                preload="auto"
                autoPlay
              />
            )}
          </>
        ) : (
          <></>
        )}
        {showRewards && fightStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              zIndex: 2,
              position: "absolute",
              top: "65%",
              margin: "auto",
              width: "100%",
            }}
            className="d-flex player-win-wrapper flex-column gap-2 align-items-center"
          >
            <div className="fighter-win-rewards-2 d-flex flex-column flex-lg-row  align-items-center justify-content-center gap-3 gap-lg-5 p-4">
              {battleFightResults &&
                battleFightResults.rewards?.length > 0 &&
                battleFightResults.rewards.map((reward, index) => {
                  return (
                    <div
                      className="d-flex fight-rewards-item-2 flex-row flex-lg-column gap-2 align-items-center"
                      key={index}
                    >
                      <span className="fight-rewards-item-2-value">
                        {getFormattedNumber(
                          reward.reward,
                          reward.rewardType === "money" ? 2 : 0
                        )}
                      </span>
                      <h6 className="fight-rewards-item-2-title mb-0 text-capitalize">
                        {reward.rewardType === "money"
                          ? "$"
                          : reward.rewardType}
                      </h6>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
        {showContent && (
          <>
            {rewards && rewards.length > 0 && (
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
                    {/* {getFormattedNumber(rewards?.reward, 0)}{" "}
                    {rewards?.rewardType} */}
                    {rewards &&
                      rewards.length > 0 &&
                      rewards.map((obj, index) => {
                        return (
                          <span key={index}>
                            {obj.rewardType === "Money" && "$"}
                            {obj.rewardType === "Stars" ||
                            obj.rewardType === "Money"
                              ? obj.reward
                              : getFormattedNumber(obj.reward, 0)}{" "}
                            {obj.rewardType !== "Money" && obj.rewardType}
                            {rewards.length > 1 &&
                              index < rewards.length - 1 &&
                              " + "}
                          </span>
                        );
                      })}
                  </motion.span>
                </div>
              </motion.div>
            )}
            {fightStep === 1 && (
              <div className="d-flex flex-column gap-2 position-absolute fighter-chains-wrapper">
                <motion.div
                  initial={{ opacity: 0, x: -50, y: -50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                >
                  <motion.div
                    className="py-2 px-2 px-lg-4 gap-2 gap-lg-0 d-flex flex-column align-items-center"
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
                      Chains
                    </motion.div>

                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex align-items-center flex-column flex-lg-row gap-2 mb-2 bnb-chains-wrapper p-2">
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -90 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0,
                            type: "spring",
                            stiffness: 150,
                          }}
                        >
                          <button
                            // disabled={disable}
                            onClick={() => {
                              setSelectedChain(chains[0].id);
                              setSocials(chains[0].socials);
                              switchNetwork(chains[0].hex, chains[0].chainId);
                            }}
                            onMouseEnter={() => setHoveredChain(chains[0].id)}
                            onMouseLeave={() => setHoveredChain(null)}
                            className="btn p-2 position-relative overflow-hidden border-0 rounded "
                            style={{
                              // width: "32px",
                              height: "32px",
                              background:
                                selectedChain === chains[0].id
                                  ? "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.15) 50%, rgba(14, 25, 48, 0.8) 100%)"
                                  : "linear-gradient(135deg, rgba(14, 25, 48, 0.4) 0%, rgba(10, 18, 36, 0.2) 100%)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              border:
                                selectedChain === chains[0].id
                                  ? "1px solid rgba(59, 130, 246, 0.4)"
                                  : "1px solid rgba(59, 130, 246, 0.2)",
                              // transform:
                              //   selectedChain === chains[0].id
                              //     ? "scale(1.1)"
                              //     : "scale(1)",
                              transition: "all 0.3s ease",
                            }}
                            aria-label={`Select ${chains[0].name}`}
                          >
                            <motion.div
                              className="position-absolute top-0 start-0 w-100 h-100"
                              style={getChainGradient(chains[0])}
                              animate={{
                                opacity:
                                  selectedChain === chains[0].id
                                    ? 0.3
                                    : hoveredChain === chains[0].id
                                    ? 0.2
                                    : 0.1,
                                scale:
                                  selectedChain === chains[0].id
                                    ? [1, 1.1, 1]
                                    : 1,
                              }}
                              transition={{
                                duration:
                                  selectedChain === chains[0].id ? 2 : 0.3,
                                repeat:
                                  selectedChain === chains[0].id ? Infinity : 0,
                              }}
                            />

                            <div className="d-flex align-items-center gap-1">
                              <motion.span
                                className="position-relative d-flex align-items-center gap-1"
                                style={{ fontSize: "14px", zIndex: 10 }}
                                animate={{
                                  scale:
                                    selectedChain === chains[0].id
                                      ? [1, 1.2, 1]
                                      : 1,
                                  rotate:
                                    hoveredChain === chains[0].id
                                      ? [0, 5, -5, 0]
                                      : 0,
                                }}
                                transition={{
                                  duration:
                                    selectedChain === chains[0].id ? 1 : 0.5,
                                  repeat:
                                    selectedChain === chains[0].id
                                      ? Infinity
                                      : 0,
                                }}
                              >
                                <img
                                  src={chains[0].logo}
                                  width={16}
                                  height={16}
                                  alt=""
                                />
                              </motion.span>
                              <motion.div
                                style={{
                                  color: "#fff",
                                  fontSize: "0.9rem",
                                  letterSpacing: "0.025em",
                                  zIndex: 1,
                                }}
                              >
                                {chains[0]?.name}
                              </motion.div>
                            </div>

                            {selectedChain === chains[0].id && (
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
                        </motion.div>{" "}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}
            {fightStep === 1 && (
              <div className="fight-info-container d-flex flex-column gap-2 align-items-end align-items-lg-center justify-content-center">
                <div className="shape">
                  <img
                    ref={btnRef}
                    src="https://cdn.worldofdypians.com/wod/fightTooltip.png"
                    className="shape__img"
                    style={{ cursor: "pointer" }}
                    alt=""
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeout(() => setShowPrizes((prev) => !prev), 0);
                    }}
                  />
                </div>
                {showPrizes && (
                  <OutsideClickHandler
                    onOutsideClick={(e) => {
                      if (btnRef.current && btnRef.current.contains(e.target))
                        return;
                      setShowPrizes(false);
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="fight-rewards-list p-3 d-flex gap-2 flex-column"
                    >
                      <span className="fight-rewards-list-title font-abaddon mb-2">
                        Prizes
                      </span>
                      {rewardCategories.map((item, index) => (
                        <div
                          key={index}
                          className="fight-rewards-item ms-3 p-2 position-relative d-flex align-items-center justify-content-between"
                        >
                          <img src={item.icon} alt="" />
                          <span className="fight-rewards-item-name ps-4">
                            {item.id}
                          </span>
                          <div className="d-flex flex-column align-items-end">
                            <span className="new-up-to">Up to</span>
                            <span className="fight-rewards-item-count">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </OutsideClickHandler>
                )}
              </div>
            )}
            {fightStep === 1 && (
              <>
                <div className="d-flex flex-column gap-3 w-100 align-items-center">
                  {!email && coinbase && (
                    <NavLink
                      to={"/auth"}
                      className="fantasy-btn-2 font-abaddon text-white d-flex justify-content-center align-items-center"
                      onClick={onClose}
                    >
                      Log In
                    </NavLink>
                  )}
                  {!isConnected && !coinbase && (
                    <button
                      className="fantasy-btn-3 font-abaddon text-white"
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
                        className="fantasy-btn-4 font-abaddon text-white"
                        onClick={() => switchNetwork("0x38", 56)}
                      >
                        Switch Chain
                      </button>
                    )}

                  {isConnected &&
                    coinbase &&
                    email &&
                    chainId === 56 &&
                    fightInfo && (
                      <button
                        className="fantasy-btn font-abaddon text-white d-flex align-items-center justify-content-center gap-2"
                        style={{
                          pointerEvents: disableButtons ? "none" : "auto",
                        }}
                        disabled
                      >
                        <img
                          src="https://cdn.worldofdypians.com/wod/battleTimer.svg"
                          width={30}
                          height={30}
                          alt="battle-timer"
                        />
                        <Countdown date={midnightTime} renderer={renderer} />
                      </button>
                    )}
                  {isConnected &&
                    coinbase &&
                    email &&
                    chainId === 56 &&
                    !fightInfo && (
                      <button
                        className="fantasy-btn font-abaddon text-white"
                        onClick={() => {
                          new Audio(clickSound).play();

                          handleStartFight();
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <div
                            className="spinner-border  text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Fight"
                        )}
                      </button>
                    )}

                  <div className="d-flex align-items-center gap-3 players-grid-container mb-3 mb-lg-5">
                    {fighters.map((item, index) => (
                      <img
                        key={index}
                        src={item.thumb}
                        alt=""
                        style={{}}
                        className={`player-img ${
                          selectedPlayer.id === item.id && "player-img-active"
                        } ${
                          fightInfo &&
                          fightInfo.win &&
                          fightInfo.fighter.id === item.id
                            ? "player-img-win"
                            : ""
                        } ${
                          fightInfo &&
                          !fightInfo.win &&
                          fightInfo.fighter.id === item.id
                            ? "player-img-lose"
                            : ""
                        }`}
                        onClick={() => {
                          new Audio(click).play();
                          setselectedPlayer(item);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* {!disable && (
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
                      }}
                      className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden d-flex justify-content-center"
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
                        width: "280px",
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

                      <div className="d-flex align-items-center justify-content-center gap-3">
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
                      className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden d-flex justify-content-center font-unzialish"
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
                        width: "280px",
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
                  chainId !== selectedChainData.chainId && (
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <button
                        disabled={disable}
                        onClick={() => switchNetwork("0x38", 56)}
                        className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden d-flex justify-content-center font-unzialish"
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
                          width: "280px",
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
                  chainId === selectedChainData.chainId && (
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <button
                        onClick={handleStartFight}
                        disabled={loading || chestOpened || disable}
                        className="btn btn-lg border-0 rounded text-white position-relative overflow-hidden d-flex justify-content-center kick-claim-btn d-flex justify-content-center align-items-center font-unzialish"
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
                          opacity: loading || chestOpened ? 0.9 : 1,
                          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                          zIndex: 10,
                          width: "280px",
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

                        {loading ? (
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
                        
                            <span>UNLOCKED!</span>
                   
                          </div>
                        ) : (
                          <div className="d-flex align-items-center gap-3">
                            <span>Start Fight</span>
                          </div>
                        )}
                      </button>
                    </motion.div>
                  )}
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default BattlePopup;
