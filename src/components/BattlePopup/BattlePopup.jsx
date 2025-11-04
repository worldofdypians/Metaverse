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
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../wagmiConnectors";

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
    icon: "https://cdn.worldofdypians.com/wod/ai-reward-active.webp",
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
    icon: "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp",
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
  openedRoyaltyChest,
  closePopup,
  setClosePopup,
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const windowSize = useWindowSize();

  let now = new Date().getTime();
  const midnightTime = new Date(now).setUTCHours(24, 30, 0, 0);
  // const fighters = [
  //   "caws",
  //   "futuristicFemale",
  //   "futuristicMale",
  //   "mageFemale",
  //   "matrix",
  //   "miner",
  //   "ninjaFemale",
  //   "ninja",
  //   "slayer",
  //   "viking",
  // ];

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
          link: "https://opbnb.bnbchain.org/en",
        },
      ],
    },
  ];
  const btnRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
  const [fightStep, setFightStep] = useState(1);
  const [chestOpened, setChestOpened] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [hoveredChain, setHoveredChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [socials, setSocials] = useState(chains[0].socials);
  const [count, setCount] = useState(0);
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [mute, setMute] = useState(false);
  const [selectedPlayer, setselectedPlayer] = useState(fighters[0]);
  const [fightType, setFightType] = useState(null);
  const [showRewards, setShowRewards] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false);
  const [tempfighter, setTempfighter] = useState(fighters[0]);
  const [dummyCount, setDummyCount] = useState(0);
  const [fightInfo, setFightInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("fightInfo");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

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

  useEffect(() => {
    // ✅ Create audio once
    audioRef.current = new Audio(fightBgMusic);
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [onClose]);

  useEffect(() => {
    // 🔊 Play or stop when popup opens/closes
          console.log(audioRef.current, isOpen, "audioref");

    if (isOpen && audioRef.current) {
      audioRef.current.play().catch((err) => {
        if (err.name !== "AbortError") console.warn(err);
      });
    } else if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleStartFight = () => {
    setLoading(true);

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
          console.log(audioRef.current, "audioref");

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
          localStorage.setItem("fightInfo", JSON.stringify(newFightInfo));
          setFightInfo(newFightInfo); // Update state to trigger re-render

          if (randomBit !== 0) {
            setShowRewards(true);
          }
        }, 21500);
      }, 4300);
    }, 2500);
  };

  useEffect(() => {
    if (fightInfo) {
      setDisableButtons(true);
      setselectedPlayer(fightInfo.fighter);
      setTempfighter(fightInfo.fighter);
    }
  }, [fightInfo]);

  // Attach listener
  window.addEventListener("keydown", handleEsc);

  const getUserRewardsByChest = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData_bnb
        )
        .catch((e) => {
          if (e.response.status === 400) {
            const timer = setTimeout(() => {
              getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
            }, 2000);
          } else {
            setLoading(false);
            setIsChestOpen(false);
            window.alertify.error(e?.message);
            console.error(e);
          }
        });
      if (result && result.status === 200) {
        // if (chainText === "opbnb" || chainText === "bnb") {
        //   handleSecondTask(coinbase);
        // }
        setTimeout(() => {
          setRewards(result.data.rewards);
        }, 3600);

        setIsChestOpen(true);
        setLoading(false);
      }
    } else {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData
        )
        .catch((e) => {
          if (e.response.status === 400) {
            const timer = setTimeout(() => {
              getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
            }, 2000);
          } else {
            setLoading(false);
            setIsChestOpen(false);
            window.alertify.error(e?.message);
            console.error(e);
          }
        });
      if (result && result.status === 200) {
        console.log(result.data);
        setTimeout(() => {
          setRewards(result.data.rewards);
        }, 3600);

        setIsChestOpen(true);
        setLoading(false);
      }
    }
  };
  const getUserRewardsByChest2 = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData_bnb
        )
        .catch((e) => {
          setLoading(false);

          setIsChestOpen(false);
          window.alertify.error(e?.message);
        });
      if (result && result.status === 200) {
        setTimeout(() => {
          setRewards(result.data.rewards);
        }, 3600);

        setIsChestOpen(true);

        setLoading(false);
      }
    } else {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData
        )
        .catch((e) => {
          setLoading(false);

          setIsChestOpen(false);
          window.alertify.error(e?.message);
        });
      if (result && result.status === 200) {
        // if (chainText === "opbnb" || chainText === "bnb") {
        //   handleSecondTask(coinbase);
        // }
        setTimeout(() => {
          setRewards(result.data.rewards);
        }, 3600);

        setIsChestOpen(true);
        setLoading(false);
      }
    }
  };

  let countRoyal = 1;
  const handleCheckIfTxExists = async (
    email,
    txHash,
    chestIndex,
    chainText
  ) => {
    const video =
      // chainText === "taiko" ? videoRef2Taiko.current :
      videoRef2.current;
    if (window.WALLET_TYPE !== "matchId") {
      const txResult = getTransaction(wagmiClient, {
        hash: txHash,
      });

      console.log(txResult);

      if (txResult) {
        getUserRewardsByChest(email, txHash, chestIndex, chainText);
        setLoading(false);
        setChestOpened(true);
        setStep(2);

        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));
          setTimeout(() => {
            video.pause();
            setStep(3);
            onClaimRewards();
          }, 8000);
        }
      } else {
        if (countRoyal < 10) {
          const timer = setTimeout(
            () => {
              handleCheckIfTxExists(txHash);
            },
            countRoyal === 9 ? 5000 : 2000
          );
          return () => clearTimeout(timer);
        } else {
          window.alertify.error("Something went wrong.");
          setLoading(false);
        }
      }
      countRoyal = countRoyal + 1;
    } else if (window.WALLET_TYPE === "matchId") {
      console.log(txHash);
      const txResult_matchain = await publicClient
        .getTransaction({ hash: txHash })
        .catch((e) => {
          console.error(e);
        });
      console.log(txResult_matchain, txHash);

      if (txResult_matchain) {
        getUserRewardsByChest(email, txHash, chestIndex, chainText);
        setLoading(false);
        setChestOpened(true);
        setStep(2);

        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));
          setTimeout(() => {
            video.pause();
            setStep(3);
            onClaimRewards();
          }, 8000);
        }
      } else {
        if (countRoyal < 10) {
          const timer = setTimeout(
            () => {
              handleCheckIfTxExists(txHash);
            },
            countRoyal === 9 ? 5000 : 2000
          );
          return () => clearTimeout(timer);
        } else {
          window.alertify.error("Something went wrong.");
          setLoading(false);
        }
      }
      countRoyal = countRoyal + 1;
    }
  };

  const resolveChestContract = (cid) => {
    try {
      switch (cid) {
        case 204:
          return {
            address: window.config.daily_bonus_address,
            abi: window.DAILY_BONUS_ABI,
            chainText: "opbnb",
          };

        case 56:
          return {
            address: window.config.daily_bonus_bnb_address,
            abi: window.DAILY_BONUS_BNB_ABI,
            chainText: "bnb",
          };

        default:
          return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const chestIndex = 1;

  const handleOpenChest = async () => {
    setLoading(true);
    const video = videoRef2.current;

    try {
      const contractConfig = resolveChestContract(chainId);
      if (!contractConfig)
        throw new Error("Unsupported chain for chest contract.");

      const functionName = "openChest";

      // If user is on MatchID wallet, use provided viem walletClient/publicClient
      if (window.WALLET_TYPE === "matchId" && walletClient && publicClient) {
        const txHash = await walletClient.writeContract({
          address: contractConfig.address,
          abi: contractConfig.abi,
          functionName,
          args: [],
        });

        await publicClient.waitForTransactionReceipt({ hash: txHash });
        getUserRewardsByChest(
          email,
          txHash,
          chestIndex - 1,
          contractConfig.chainText
        );
        setLoading(false);
        setChestOpened(true);
        setStep(2);

        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));
          setTimeout(() => {
            video.pause();
            setStep(3);
            onClaimRewards();
          }, 8000);
        }

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
        getUserRewardsByChest(
          email,
          txHash,
          chestIndex - 1,
          contractConfig.chainText
        );
        setLoading(false);
        setChestOpened(true);
        setStep(2);

        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));
          setTimeout(() => {
            video.pause();
            setStep(3);
            onClaimRewards();
          }, 8000);
        }
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
    const video = videoRef1.current;
    var time;

    if (
      openedRoyaltyChest &&
      openedRoyaltyChest.isOpened === true &&
      (selectedChain === "opbnb" || selectedChain === "bnb")
    ) {
      time = 0;
    }

    if (
      openedRoyaltyChest &&
      openedRoyaltyChest.isOpened === true &&
      (selectedChain === "opbnb" || selectedChain === "bnb") &&
      isOpen
    ) {
      if (openedRoyaltyChest && openedRoyaltyChest.isOpened === true) {
        time = 0;
      } else {
        time = 3600;
      }

      setChestOpened(true);
      setStep(3);
      const video = videoRef2.current;
      if (video) {
        video.play().catch((err) => console.error("Play failed:", err));
        setTimeout(() => {
          video.pause();
          setStep(3);
        }, 8000);
      }

      setTimeout(() => {
        setRewards(openedRoyaltyChest.rewards);
      }, time);
      setTimeout(() => {
        setShowContent(true);
      }, time);
    } else if (
      (openedRoyaltyChest.length === 0 ||
        (openedRoyaltyChest && openedRoyaltyChest.isOpened === false)) &&
      (selectedChain === "opbnb" || selectedChain === "bnb") &&
      isOpen
    ) {
      setStep(1);
      setRewards([]);
      setChestOpened(false);

      setTimeout(() => {
        setShowContent(true);
      }, time);
      const timeout1 = setTimeout(() => {
        if (video) {
          video.play().catch((err) => console.error("Play failed:", err));

          const pauseTimeout = setTimeout(() => {
            video.pause();
          }, 6200);

          return () => clearTimeout(pauseTimeout);
        }
      }, 1500);

      return () => clearTimeout(timeout1);
    }
  }, [openedRoyaltyChest, selectedChain, isOpen]);

  useEffect(() => {
    if (chainId === 56) {
      setSelectedChain("bnb");
      setSocials(chains[0].socials);
    } else if (chainId === 204) {
      setSelectedChain("opbnb");
      setSocials(chains[1].socials);
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
                            <div className="d-flex align-items-end gap-1">
                              <span className="fighter-win-rewards-amount">
                                2,520
                              </span>
                              <span className="fighter-win-rewards-type">
                                Points
                              </span>
                            </div>
                            <div className="d-flex align-items-end gap-1">
                              <span className="fighter-win-rewards-amount">
                                134
                              </span>
                              <span className="fighter-win-rewards-type">
                                Stars
                              </span>
                            </div>
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
                <div className="fighter-class-wrapper d-flex w-fit h-fit p-3 flex-column gap-2 align-items-center justify-content-center">
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
            <div className="fighter-win-rewards-2 d-flex  align-items-center justify-content-center gap-5 p-4">
              <div className="d-flex fight-rewards-item-2 flex-column gap-2 align-items-center">
                <span className="fight-rewards-item-2-value">2,520</span>
                <h6 className="fight-rewards-item-2-title mb-0">Points</h6>
              </div>
              <div className="d-flex fight-rewards-item-2 flex-column gap-2 align-items-center">
                <span className="fight-rewards-item-2-value">150</span>
                <h6 className="fight-rewards-item-2-title mb-0">Stars</h6>
              </div>
              <div className="d-flex fight-rewards-item-2 flex-column gap-2 align-items-center">
                <span className="fight-rewards-item-2-value">$1.5</span>
                <h6 className="fight-rewards-item-2-title mb-0">Rewards</h6>
              </div>
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
                        <div
                          style={{
                            width: "2px",
                            height: "40px",
                            background:
                              "linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.4) 25%, rgba(147, 197, 253, 0.8) 50%, rgba(59, 130, 246, 0.4) 75%, transparent 100%)",
                            alignSelf: "center",
                            borderRadius: "2px",
                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
                            flexShrink: 0,
                          }}
                          className="d-none d-lg-flex"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -90 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 1 * 0.08,
                            type: "spring",
                            stiffness: 150,
                          }}
                        >
                          <button
                            // disabled={disable}
                            onClick={() => {
                              setSelectedChain(chains[1].id);
                              setSocials(chains[1].socials);
                              switchNetwork(chains[1].hex, chains[1].chainId);
                            }}
                            onMouseEnter={() => setHoveredChain(chains[1].id)}
                            onMouseLeave={() => setHoveredChain(null)}
                            className="btn p-2 position-relative overflow-hidden border-0 rounded "
                            style={{
                              // width: "32px",
                              height: "32px",
                              background:
                                selectedChain === chains[1].id
                                  ? "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.15) 50%, rgba(14, 25, 48, 0.8) 100%)"
                                  : "linear-gradient(135deg, rgba(14, 25, 48, 0.4) 0%, rgba(10, 18, 36, 0.2) 100%)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              border:
                                selectedChain === chains[1].id
                                  ? "1px solid rgba(59, 130, 246, 0.4)"
                                  : "1px solid rgba(59, 130, 246, 0.2)",
                              // transform:
                              //   selectedChain === chains[1].id
                              //     ? "scale(1.1)"
                              //     : "scale(1)",
                              transition: "all 0.3s ease",
                            }}
                            aria-label={`Select ${chains[1].name}`}
                          >
                            <motion.div
                              className="position-absolute top-0 start-0 w-100 h-100"
                              style={getChainGradient(chains[1])}
                              animate={{
                                opacity:
                                  selectedChain === chains[1].id
                                    ? 0.3
                                    : hoveredChain === chains[1].id
                                    ? 0.2
                                    : 0.1,
                                scale:
                                  selectedChain === chains[1].id
                                    ? [1, 1.1, 1]
                                    : 1,
                              }}
                              transition={{
                                duration:
                                  selectedChain === chains[1].id ? 2 : 0.3,
                                repeat:
                                  selectedChain === chains[1].id ? Infinity : 0,
                              }}
                            />

                            <div className="d-flex align-items-center gap-1">
                              <motion.span
                                className="position-relative d-flex align-items-center gap-1"
                                style={{ fontSize: "14px", zIndex: 10 }}
                                animate={{
                                  scale:
                                    selectedChain === chains[1].id
                                      ? [1, 1.2, 1]
                                      : 1,
                                  rotate:
                                    hoveredChain === chains[1].id
                                      ? [0, 5, -5, 0]
                                      : 0,
                                }}
                                transition={{
                                  duration:
                                    selectedChain === chains[1].id ? 1 : 0.5,
                                  repeat:
                                    selectedChain === chains[1].id
                                      ? Infinity
                                      : 0,
                                }}
                              >
                                <img
                                  src={chains[1].logo}
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
                                {chains[1]?.name}
                              </motion.div>
                            </div>

                            {selectedChain === chains[1].id && (
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
                      </div>
                      <div className="d-flex flex-column gap-1 w-100">
                        {chains.slice(2, chains.length).map((chain, index) => (
                          <motion.div
                            key={chain.id}
                            initial={{ opacity: 0, scale: 0, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                              delay: index * 0.08,
                              type: "spring",
                              stiffness: 150,
                            }}
                            style={{ width: "100%" }}
                          >
                            <button
                              // disabled={disable}
                              onClick={() => {
                                setSelectedChain(chain.id);
                                setSocials(chain.socials);
                                switchNetwork(chain.hex, chain.chainId);
                              }}
                              onMouseEnter={() => setHoveredChain(chain.id)}
                              onMouseLeave={() => setHoveredChain(null)}
                              className="btn p-2 position-relative overflow-hidden border-0 rounded font-unzialish"
                              style={{
                                width: "100%",
                                height: "32px",
                                background:
                                  selectedChain === chain.id
                                    ? "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.145) 50%, rgba(14, 25, 48, 0.8) 100%)"
                                    : "linear-gradient(135deg, rgba(14, 25, 48, 0.4) 0%, rgba(10, 18, 36, 0.2) 100%)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                                border:
                                  selectedChain === chain.id
                                    ? "1px solid rgba(59, 130, 246, 0.4)"
                                    : "1px solid rgba(59, 130, 246, 0.2)",
                                // transform:
                                //   selectedChain === chain.id
                                //     ? "scale(1.1)"
                                //     : "scale(1)",
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
                                    selectedChain === chain.id
                                      ? [1, 1.1, 1]
                                      : 1,
                                }}
                                transition={{
                                  duration:
                                    selectedChain === chain.id ? 2 : 0.3,
                                  repeat:
                                    selectedChain === chain.id ? Infinity : 0,
                                }}
                              />

                              <div className="d-flex align-items-center gap-1">
                                <motion.span
                                  className="position-relative d-flex align-items-center gap-1"
                                  style={{ fontSize: "14px", zIndex: 10 }}
                                  animate={{
                                    scale:
                                      selectedChain === chain.id
                                        ? [1, 1.2, 1]
                                        : 1,
                                    rotate:
                                      hoveredChain === chain.id
                                        ? [0, 5, -5, 0]
                                        : 0,
                                  }}
                                  transition={{
                                    duration:
                                      selectedChain === chain.id ? 1 : 0.5,
                                    repeat:
                                      selectedChain === chain.id ? Infinity : 0,
                                  }}
                                >
                                  <img
                                    src={chain.logo}
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
                                  {chain?.name}
                                </motion.div>
                              </div>

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
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                  />
                                </motion.div>
                              )}
                            </button>
                          </motion.div>
                        ))}
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
                    (chainId === 204 || chainId === 56) &&
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
                    (chainId === 204 || chainId === 56) &&
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
                          selectedPlayer.id === item.id &&
                          fightInfo &&
                          fightInfo?.win
                            ? "player-img-win"
                            : ""
                        } ${
                          selectedPlayer.id === item.id &&
                          fightInfo &&
                          !fightInfo?.win
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
