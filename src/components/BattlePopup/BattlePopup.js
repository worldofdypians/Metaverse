import { useRef, useEffect, useState } from "react";
import "../Kickstarter/_kickstarter.scss";
import xMark from "../Kickstarter/assets/kickstarterXMark.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import cawsLOOP from './fightvideos/cawsLOOP.mp4';
import darkLordLOOP from './fightvideos/darkLordLOOP.mp4';

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
    id: "Money",
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
  isOpen,
  binanceW3WProvider,
  walletClient,
  publicClient,
  openedRoyaltyChest,
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const windowSize = useWindowSize();

  const fighters = [
    "caws",
    "futuristicFemale",
    "futuristicMale",
    "mageFemale",
    "matrix",
    "miner",
    "ninjaFemale",
    "ninja",
    "slayer",
    "viking",
  ];

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

  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
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
  const [selectedPlayer, setselectedPlayer] = useState();

  function handleEsc(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      onClose();
    }
  }

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
        console.log(result.data);
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
        console.log(result.data);
        setTimeout(() => {
          setRewards(result.data.rewards);
        }, 3600);

        setIsChestOpen(true);
        setLoading(false);
      }
    }
  };

  let countRoyal = 1;
  const handleCheckIfTxExists = async (email, txHash, chainText) => {
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      const txResult = await window.web3.eth
        .getTransaction(txHash)
        .catch((e) => {
          console.error(e);
        });

      console.log(txResult);
      const video = videoRef2.current;
      if (txResult) {
        getUserRewardsByChest(email, txHash, chainText);
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
    } else if (window.WALLET_TYPE === "binance") {
      const txResult_binance = await binanceW3WProvider
        .getTransaction(txHash)
        .catch((e) => {
          console.error(e);
        });
      console.log(txResult_binance);
      const video = videoRef2.current;

      if (txResult_binance) {
        getUserRewardsByChest(email, txHash, chainText);
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
      const video = videoRef2.current;

      if (txResult_matchain) {
        getUserRewardsByChest(email, txHash, chainText);
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

  const handleOpenChest = async () => {
    setLoading(true);
    const video = videoRef2.current;

    window.web3 = new Web3(window.ethereum);
    // console.log(window.config.daily_bonus_address, address);
    const daily_bonus_contract = new window.web3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );

    const daily_bonus_contract_bnb = new window.web3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    const daily_bonus_contract_taiko = new window.web3.eth.Contract(
      window.DAILY_BONUS_TAIKO_ABI,
      window.config.daily_bonus_taiko_address
    );

    // console.log(daily_bonus_contract);
    if (chainId === 204) {
      if (window.WALLET_TYPE !== "binance") {
        await daily_bonus_contract.methods
          .openChest()
          .send({
            from: address,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          })
          .then((data) => {
            getUserRewardsByChest(email, data.transactionHash, "opbnb");
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
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setLoading(false);
          });
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_opbnb_binance = new ethers.Contract(
          window.config.daily_bonus_address,
          window.DAILY_BONUS_ABI,
          binanceW3WProvider.getSigner()
        );
        const txResponse = await daily_bonus_contract_opbnb_binance
          .openChest()
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setLoading(false);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          getUserRewardsByChest(email, txResponse.hash, "opbnb");
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
      }
    } else if (chainId === 56) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        // console.log("standard");

        // const web3 = new Web3(window.ethereum);
        // const gasPrice = await web3.eth.getGasPrice();
        // console.log("gasPrice", gasPrice);
        // const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 1;
        // console.log("increasedGwei", increasedGwei);

        // const transactionParameters = {
        //   gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        // };

        // await daily_bonus_contract_bnb.methods
        //   .openChest()
        //   .estimateGas({ from: address })
        //   .then((gas) => {
        //     transactionParameters.gas = web3.utils.toHex(gas);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // console.log(transactionParameters);

        await daily_bonus_contract_bnb.methods
          .openChest()
          .send({
            from: address,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
            // ...transactionParameters,
          })
          .then((data) => {
            getUserRewardsByChest(email, data.transactionHash, "bnb");

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
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setLoading(false);
          });
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient
            .writeContract({
              address: window.config.daily_bonus_bnb_address,
              abi: window.DAILY_BONUS_BNB_ABI,
              functionName: "openChest",
              args: [],
            })
            .catch((e) => {
              window.alertify.error(e?.shortMessage);
              setLoading(false);
              console.error(e);
            });
          if (result) {
            const receipt = await publicClient
              .waitForTransactionReceipt({
                hash: result,
              })
              .catch((e) => {
                console.error(e);
              });

            if (receipt) {
              console.log("Transaction confirmed:", receipt);
              handleCheckIfTxExists(email, result, "bnb");
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_bnb_binance = new ethers.Contract(
          window.config.daily_bonus_bnb_address,
          window.DAILY_BONUS_BNB_ABI,
          binanceW3WProvider.getSigner()
        );
        const gasPrice = await binanceW3WProvider.getGasPrice();
        const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
        const gasPriceInWei = ethers.utils.parseUnits(
          currentGwei.toString().slice(0, 14),
          "gwei"
        );

        const transactionParameters = {
          gasPrice: gasPriceInWei,
        };

        let gasLimit;
        try {
          gasLimit =
            await daily_bonus_contract_bnb_binance.estimateGas.openPremiumChest();
          transactionParameters.gasLimit = gasLimit;
          console.log("transactionParameters", transactionParameters);
        } catch (error) {
          console.error(error);
        }

        const txResponse = await daily_bonus_contract_bnb_binance
          .openChest({ ...transactionParameters })
          // .send({
          //   from: address,
          //   ...transactionParameters,
          // })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            setLoading(false);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          getUserRewardsByChest(email, txResponse.hash, "bnb");

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
      }
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
            setDisable(false);
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

  return (
    <div className="kickstarter-container slide-in d-flex flex-column justify-content-between align-items-center">
      <div className="position-relative  d-flex w-100 h-100 flex-column justify-content-between align-items-center">
        <img
          src={xMark}
          className="kickstarter-close"
          alt=""
          onClick={() => {
            setShowContent(false);
            onClose();
          }}
        />
        <div className="d-flex align-items-center h-100 w-100">
          <video
      
            src={cawsLOOP}
            className={`fight-video`}
            playsInline
            preload="auto"
            loop
            autoPlay

          />
          <video
           
            src={darkLordLOOP}
            className={`fight-video-2`}
            playsInline
            preload="auto"
            loop
            autoPlay
          />
        </div>

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
            <motion.div
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              className="position-absolute"
              style={{ top: "16px", left: "24px", zIndex: 30 }}
            >
              <motion.div
                className="py-2 px-4 gap-2 gap-lg-0 d-flex flex-column align-items-center"
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
                  <div className="d-flex align-items-center gap-2 mb-2 bnb-chains-wrapper p-2">
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
                        className="btn p-2 position-relative overflow-hidden border-0 rounded font-unzialish"
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
                              selectedChain === chains[0].id ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: selectedChain === chains[0].id ? 2 : 0.3,
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
                                selectedChain === chains[0].id ? Infinity : 0,
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
                        className="btn p-2 position-relative overflow-hidden border-0 rounded font-unzialish"
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
                              selectedChain === chains[1].id ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: selectedChain === chains[1].id ? 2 : 0.3,
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
                                selectedChain === chains[1].id ? Infinity : 0,
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
                                selectedChain === chain.id ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: selectedChain === chain.id ? 2 : 0.3,
                              repeat: selectedChain === chain.id ? Infinity : 0,
                            }}
                          />

                          <div className="d-flex align-items-center gap-1">
                            <motion.span
                              className="position-relative d-flex align-items-center gap-1"
                              style={{ fontSize: "14px", zIndex: 10 }}
                              animate={{
                                scale:
                                  selectedChain === chain.id ? [1, 1.2, 1] : 1,
                                rotate:
                                  hoveredChain === chain.id ? [0, 5, -5, 0] : 0,
                              }}
                              transition={{
                                duration: selectedChain === chain.id ? 1 : 0.5,
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
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* <AnimatePresence mode="wait">
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
                  </AnimatePresence> */}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="position-absolute new-battle-info-container"
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
                    className="col-lg-9 d-flex flex-column justify-content-between"
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
                        justifyContent: "start",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="px-2"
                          style={{
                            color: "rgba(219, 234, 254, 1)",
                            fontSize: "15px",
                            fontWeight: "700",
                            letterSpacing: "0.05em",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            textTransform: "uppercase",
                          }}
                        >
                          Select Player
                        </div>

                        {/* Compact Social Links */}
                      </div>{" "}
                      {/* Gaming panel scan line */}
                      {/* Chain Display with integrated Description */}
                      {/* Chain Header with Logo and Name */}
                      {/* Project Description - Positioned Below Project Name */}
                      <motion.div
                        key={selectedChain}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="kickstarter-chain-description overflow-x-auto h-100"
                        // animate={{
                        //   color: ["rgba(219, 234, 254, 0.85)", "rgba(191, 219, 254, 0.75)", "rgba(219, 234, 254, 0.85)"]
                        // }}
                        transition={{
                          duration: 0.5,
                          repeat: 0,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3 h-100">
                          {[...Array(9)].map((_, index) => (
                            <img
                              key={index}
                              src={`http://cdn.worldofdypians.com/wod/players/player${
                                index + 1
                              }.png`}
                              alt=""
                              className={`player-img ${
                                selectedPlayer === index + 1 &&
                                "player-img-active"
                              } `}
                              onClick={() => {
                                setselectedPlayer(index + 1);
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                      <div className="d-flex justify-content-end justify-content-lg-between gap-3 gap-lg-0 d-flex d-lg-none">
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
                    className="col-lg-3 d-none d-lg-flex position-relative"
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
                      <div className="d-flex h-100 justify-content-between">
                        {/* <div
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
                        </div> */}
                        <div
                          className="py-2 px-2 d-flex flex-column align-items-center justify-content-center gap-2 w-100"
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
                              className="position-relative overflow-hidden w-100"
                              style={{
                                padding: "6px 12px",
                                background:
                                  rewards.find((item) => {
                                    return (
                                      item.rewardType.toLowerCase() ===
                                      category.id.toLowerCase()
                                    );
                                  }) !== undefined
                                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 50%, rgba(8, 16, 32, 0.8) 100%)"
                                    : "linear-gradient(135deg, rgba(8, 16, 32, 0.8) 0%, rgba(12, 20, 40, 0.6) 50%, rgba(6, 12, 28, 0.4) 100%)",
                                border:
                                  rewards.find((item) => {
                                    return (
                                      item.rewardType.toLowerCase() ===
                                      category.id.toLowerCase()
                                    );
                                  }) !== undefined
                                    ? "2px solid rgba(59, 130, 246, 0.6)"
                                    : "1px solid rgba(59, 130, 246, 0.25)",
                                borderRadius: "10px",
                                boxShadow:
                                  rewards.find((item) => {
                                    return (
                                      item.rewardType.toLowerCase() ===
                                      category.id.toLowerCase()
                                    );
                                  }) !== undefined
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
                                    rewards.find((item) => {
                                      return (
                                        item.rewardType.toLowerCase() ===
                                        category.id.toLowerCase()
                                      );
                                    }) !== undefined
                                      ? [0.6, 1, 0.6]
                                      : 0.4,
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat:
                                    rewards.find((item) => {
                                      return (
                                        item.rewardType.toLowerCase() ===
                                        category.id.toLowerCase()
                                      );
                                    }) !== undefined
                                      ? Infinity
                                      : 0,
                                  ease: "easeInOut",
                                }}
                              />

                              {/* Animated scan line for active rewards */}
                              {rewards.find((item) => {
                                return (
                                  item.rewardType.toLowerCase() ===
                                  category.id.toLowerCase()
                                );
                              }) !== undefined && (
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
                                <div className="d-flex flex-column">
                                  <span
                                    className="text-end text-sm"
                                    style={{
                                      color: "rgba(168, 192, 255, 0.7)",
                                    }}
                                  >
                                    Up to
                                  </span>
                                  <div className="text-end">
                                    <motion.span
                                      className="d-block"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        color:
                                          rewards.find((item) => {
                                            return (
                                              item.rewardType.toLowerCase() ===
                                              category.id.toLowerCase()
                                            );
                                          }) !== undefined
                                            ? "rgba(219, 234, 254, 1)"
                                            : "rgba(168, 192, 255, 0.9)",
                                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                                        letterSpacing: "0.025em",
                                      }}
                                      animate={{
                                        scale:
                                          rewards.find((item) => {
                                            return (
                                              item.rewardType.toLowerCase() ===
                                              category.id.toLowerCase()
                                            );
                                          }) !== undefined
                                            ? [1, 1.1, 1]
                                            : 1,
                                        color:
                                          rewards.find((item) => {
                                            return (
                                              item.rewardType.toLowerCase() ===
                                              category.id.toLowerCase()
                                            );
                                          }) !== undefined
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
                                          rewards.find((item) => {
                                            return (
                                              item.rewardType.toLowerCase() ===
                                              category.id.toLowerCase()
                                            );
                                          }) !== undefined
                                            ? Infinity
                                            : 0,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      {category.count}
                                    </motion.span>
                                  </div>
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
              </div>
            </motion.div>
            {!disable && (
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
                        onClick={handleOpenChest}
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
                            <span>Start Fight</span>
                          </div>
                        )}
                      </button>
                    </motion.div>
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BattlePopup;
