import React, { useEffect, useRef, useState } from "react";
import "./_newdailybonus.scss";
import bnbChain from "./assets/bnbChain.png";
import skaleChain from "./assets/skaleChain.png";
import comingSoon from "./assets/comingSoon.png";
import comingSoon2 from "./assets/comingSoon2.png";
import comingSoon3 from "./assets/comingSoon3.png";
import comingSoon4 from "./assets/comingSoon4.png";
import percentageFilled from "./assets/percentageFilled.svg";
import percentageEmpty from "./assets/percentageEmpty.svg";
import dypiusIcon from "./assets/dypiusIcon.svg";
import wodIcon from "./assets/wodIcon.png";
import premiumIcon from "./assets/premiumIcon.png";
import cawsRound from "./assets/cawsRound.png";
import wodRound from "./assets/wodRound.png";
import premiumRound from "./assets/premiumRound.png";
import dypRound from "./assets/dypRound.png";

import completedBg from "./assets/completedBg.png";
import bnbBg from "./assets/bnbBg.png";
import mantaBg from "./assets/mantaBg.png";

import skaleBg from "./assets/skaleBg.png";
import coreBg from "./assets/coreBg.png";
import taikoBg from "./assets/taikoBg.png";
import victionBg from "./assets/victionBg.png";
import winConfetti from "./assets/winConfetti.png";
import xMark from "./assets/xMark2.svg";
import coreIcon from "./assets/coreIcon.svg";
import victionIcon from "./assets/victionIcon.svg";
import emptyXmark from "./assets/emptyXmark.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import greenCheck from "./assets/greenCheck.svg";
import infoIcon from "./assets/infoIcon.svg";
import skaleIcon from "./assets/skaleIcon.svg";
import manta from "./assets/manta.png";
import taiko from "./assets/taikoIcon.svg";
import baseLogo from "./assets/base.svg";

import seiIcon from "./assets/seiIcon.svg";
import multiversxIcon from "./assets/multiversxIcon.svg";
import danger from "./assets/danger.svg";
import warning from "./assets/warning.svg";
import redX from "./assets/redX.svg";
import NewChestItem from "./NewChestItem";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";
import successSound from "./assets/success.mp3";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import BuyNftPopup from "./BuyNftPopup";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "150px !important",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));

const HtmlTooltipGift = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(135deg, #222448 0%, #2c3867 34.54%, #2c3867 66.84%, #1d2040 100%) !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "150px !important",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));
const GeneralTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "350px !important",
    minWidth: "350px !important",
    border: "1px solid #7EABE9",
    borderRadius: "20px",
    padding: "10px",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));

const NewDailyBonus = ({
  onclose,
  isPremium,
  chainId,
  handleSwitchNetwork,
  standardChests,
  standardSkaleChests,
  claimedPremiumChests,
  claimedSkaleChests,
  claimedSkalePremiumChests,
  premiumChests,
  premiumSkaleChests,
  claimedChests,
  email,
  openedChests,
  canBuy,
  address,
  allChests,
  allSkaleChests,
  onChestClaimed,
  onSkaleChestClaimed,
  listedNFTS,
  dypTokenData,
  dyptokenData_old,
  ethTokenData,
  handleSwitchChain,
  openedSkaleChests,
  coinbase,
  dummypremiumChests,
  onPremiumClick,
  onPremiumClickOther,
  premiumTxHash,
  selectedChainforPremium,
  skaleImages,
  claimedCoreChests,
  claimedCorePremiumChests,
  claimedVictionChests,
  claimedVictionPremiumChests,
  openedCoreChests,
  openedVictionChests,
  onCoreChestClaimed,
  onVictionChestClaimed,
  onSeiChestClaimed,
  allCoreChests,
  allVictionChests,
  standardSeiChests,
  premiumSeiChests,
  claimedSeiChests,
  claimedSeiPremiumChests,
  openedSeiChests,
  allSeiChests,
  bnbImages,
  seiImages,
  victionImages,
  coreImages,
  mantaImages,
  baseImages,
  standardMantaChests,
  premiumMantaChests,
  claimedMantaChests,
  claimedMantaPremiumChests,
  claimedBaseChests,
  claimedBasePremiumChests,
  openedMantaChests,
  openedBaseChests,
  allMantaChests,
  allBaseChests,
  onMantaChestClaimed,
  onBaseChestClaimed,
  taikoImages,
  standardTaikoChests,
  premiumTaikoChests,
  claimedTaikoChests,
  claimedTaikoPremiumChests,
  openedTaikoChests,
  allTaikoChests,
  onTaikoChestClaimed,
  binanceW3WProvider,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  binanceWallet,
}) => {
  const numberArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    opened: false,
    premium: index + 1 > 10 && !isPremium ? true : false,
  }));
  const cawsArray = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
  }));

  const rewardsRef = useRef();

  const html = document.querySelector("html");

  const bnbClaimed = claimedChests + claimedPremiumChests;
  const bnbPercentage = (bnbClaimed / 20) * 100;

  const skaleClaimed = claimedSkaleChests + claimedSkalePremiumChests;
  const skalePercentage = (skaleClaimed / 20) * 100;

  const coreClaimed = claimedCoreChests + claimedCorePremiumChests;
  const corePercentage = (coreClaimed / 20) * 100;

  const victionClaimed = claimedVictionChests + claimedVictionPremiumChests;
  const victionPercentage = (victionClaimed / 20) * 100;

  const mantaClaimed = claimedMantaChests + claimedMantaPremiumChests;
  const mantaPercentage = (mantaClaimed / 20) * 100;

  const baseClaimed = claimedBaseChests + claimedBasePremiumChests;
  const basePercentage = (baseClaimed / 20) * 100;

  const taikoClaimed = claimedTaikoChests + claimedTaikoPremiumChests;
  const taikoPercentage = (taikoClaimed / 20) * 100;

  const seiClaimed = claimedSeiChests + claimedSeiPremiumChests;
  const seiPercentage = (seiClaimed / 20) * 100;

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const windowSize = useWindowSize();

  const winDangerItems = [
    {
      image: wodRound,
      holder: false,
      message: "Hold >1 CAWS NFT",
      required: true,
    },
    {
      image: wodRound,
      holder: true,
      message: "Hold Genesis NFT",
      required: true,
    },
    {
      image: premiumRound,
      holder: false,
      message: "Premium Subscriber",
      required: true,
    },
    {
      image: dypiusIcon,
      holder: true,
      message: "Hold >$1,000 in DYP v2",
      required: false,
    },
  ];

  const messages = [
    "caws",
    "premium",
    "wod",
    "switch",
    "login",
    "won",
    "winDanger",
    "complete",
    "needPremium",
    "error",
  ];

  const dummyRewards = [
    {
      title: "Points",
      amount: "Points",
      img: "points",
      error: true,
      threshold: [1, 200000],
    },
    {
      title: "Money",
      amount: "$0.5 - $5",
      img: 2,
      error: false,
      threshold: [],
      min: 0.5,
      max: 5,
    },
    {
      title: "Money",
      amount: "$15-$20",
      img: 5,
      error: true,
      threshold: [],
      min: 15,
      max: 20,
    },
    {
      title: "Money",
      amount: "$20-$30",
      img: 30,
      error: false,
      threshold: [],
      min: 20,
      max: 30,
    },
    {
      title: "Money",
      title2: "needPremium",
      amount: "$20-$30",
      img: 50,
      error: true,
      threshold: [],
      min: 20,
      max: 30,
    },
    {
      title: "Money",
      amount: "$30-$300",
      img: 300,
      error: false,
      threshold: [],
      min: 50,
      max: 300,
    },
    {
      title: "Money",
      amount: "$350-$700",
      img: 700,
      error: true,
      threshold: [],
      min: 350,
      max: 700,
    },
    {
      title: "Money",
      amount: "$1,000-$1,500",
      img: 1500,
      error: false,
      threshold: [],
      min: 1000,
      max: 1500,
    },
    {
      title: "Money",
      amount: "$2,000-$3,000",
      img: 3000,
      error: true,
      threshold: [],
      min: 2000,
      max: 3000,
    },
    {
      title: "Money",
      amount: "$4,000-$5,000",
      img: 5000,
      error: false,
      threshold: [],
      min: 4000,
      max: 5000,
    },
  ];

  const [chain, setChain] = useState("bnb");
  const [message, setMessage] = useState("");
  const [selectedChest, setSelectedChest] = useState(null);
  const [disable, setDisable] = useState(false);
  const [buyNftPopup, setBuyNftPopup] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [liverewardData, setLiveRewardData] = useState([]);
  const [cawsNfts, setCawsNfts] = useState([]);
  const [landNfts, setLandNfts] = useState([]);
  const [isActive, setIsActive] = useState();
  const [isActiveIndex, setIsActiveIndex] = useState();
  const [countListedNfts, setcountListedNfts] = useState(0);

  const [totalPoints, settotalPoints] = useState(0);
  const [totalUsd, settotalUsd] = useState(0);
  const [nft, setNft] = useState({});
  const [totalSkalePoints, settotalSkalePoints] = useState(0);
  const [totalSkaleUsd, settotalSkaleUsd] = useState(0);

  const [totalCorePoints, settotalCorePoints] = useState(0);
  const [totalCoreUsd, settotalCoreUsd] = useState(0);
  const [totalVictionPoints, settotalVictionPoints] = useState(0);
  const [totalVictionUsd, settotalVictionUsd] = useState(0);
  const [totalMantaPoints, settotalMantaPoints] = useState(0);
  const [totalMantaUsd, settotalMantaUsd] = useState(0);
  const [totalBasePoints, settotalBasePoints] = useState(0);
  const [totalBaseUsd, settotalBaseUsd] = useState(0);
  const [totalTaikoPoints, settotalTaikoPoints] = useState(0);
  const [totalTaikoUsd, settotalTaikoUsd] = useState(0);
  const [totalSeiPoints, settotalSeiPoints] = useState(0);
  const [totalSeiUsd, settotalSeiUsd] = useState(0);

  const [tooltip, setTooltip] = useState(false);
  const [claimingChest, setClaimingChest] = useState(false);

  const countEarnedRewards = () => {
    if (allChests && allChests.length > 0) {
      let resultPoints = 0;
      let resultUsd = 0;

      allChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalPoints(resultPoints);
      settotalUsd(resultUsd);
    }

    if (allSkaleChests && allSkaleChests.length > 0) {
      let resultSkalePoints = 0;
      let resultSkaleUsd = 0;

      allSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSkalePoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultSkaleUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSkalePoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalSkalePoints(resultSkalePoints);
      settotalSkaleUsd(resultSkaleUsd);
    }

    if (allCoreChests && allCoreChests.length > 0) {
      let resultCorePoints = 0;
      let resultCoreUsd = 0;

      allCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultCorePoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultCoreUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultCorePoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalCorePoints(resultCorePoints);
      settotalCoreUsd(resultCoreUsd);
    }

    if (allVictionChests && allVictionChests.length > 0) {
      let resultVictionPoints = 0;
      let resultVictionUsd = 0;

      allVictionChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultVictionPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultVictionUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultVictionPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalVictionPoints(resultVictionPoints);
      settotalVictionUsd(resultVictionUsd);
    }

    if (allMantaChests && allMantaChests.length > 0) {
      let resultMantaPoints = 0;
      let resultMantaUsd = 0;

      allMantaChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultMantaPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultMantaUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultMantaPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalMantaPoints(resultMantaPoints);
      settotalMantaUsd(resultMantaUsd);
    }

    if (allBaseChests && allBaseChests.length > 0) {
      let resultBasePoints = 0;
      let resultBaseUsd = 0;

      allBaseChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultBasePoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultBaseUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultBasePoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalBasePoints(resultBasePoints);
      settotalBaseUsd(resultBaseUsd);
    }

    if (allTaikoChests && allTaikoChests.length > 0) {
      let resultTaikoPoints = 0;
      let resultTaikoUsd = 0;

      allTaikoChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultTaikoPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultTaikoUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultTaikoPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalTaikoPoints(resultTaikoPoints);
      settotalTaikoUsd(resultTaikoUsd);
    }

    if (allSeiChests && allSeiChests.length > 0) {
      let resultSeiPoints = 0;
      let resultSeiUsd = 0;

      allSeiChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSeiPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultSeiUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSeiPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalSeiPoints(resultSeiPoints);
      settotalSeiUsd(resultSeiUsd);
    }
  };

  const handleOpBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0xcc")
          .then(() => {
            handleSwitchNetwork(204);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(204);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(204);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(204);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleClaimUsdPremium = async () => {
    const data = {
      transactionHash: premiumTxHash,
      emailAddress: email,
      chestIndex: isActiveIndex - 1,
      chainId: chain,
      chain: selectedChainforPremium,
    };

    const result = await axios
      .post(
        `https://worldofdypiansdailybonus.azurewebsites.net/api/ClaimPremiumReward`,
        data
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (chain === "bnb") {
        showSingleRewardData(rewardData.chestId, isActiveIndex - 1);
        onChestClaimed();
      } else if (chain === "skale") {
        showSingleRewardDataSkale(rewardData.chestId, isActiveIndex - 1);
        onSkaleChestClaimed();
      } else if (chain === "core") {
        showSingleRewardDataCore(rewardData.chestId, isActiveIndex - 1);
      } else if (chain === "viction") {
        showSingleRewardDataViction(rewardData.chestId, isActiveIndex - 1);
      } else if (chain === "manta") {
        showSingleRewardDataManta(rewardData.chestId, isActiveIndex - 1);
      } else if (chain === "base") {
        showSingleRewardDataBase(rewardData.chestId, isActiveIndex - 1);
      } else if (chain === "taiko") {
        showSingleRewardDataTaiko(rewardData.chestId, isActiveIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (premiumTxHash !== "" && selectedChainforPremium !== "") {
      handleClaimUsdPremium();
    }
  }, [premiumTxHash, selectedChainforPremium]);

  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(56);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(56);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(56);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  const handleMantaPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0xa9")
          .then(() => {
            handleSwitchNetwork(169);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(169);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(169);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(169);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBasePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x2105")
          .then(() => {
            handleSwitchNetwork(8453);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(8453);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(8453);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(8453);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleTaikoPool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x28c58")
            .then(() => {
              handleSwitchNetwork(167000);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Web3 Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error(
        "This network is not available on Binance Web3 Wallet"
      );
    }
  };

  const handleSkalePool = async () => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        await handleSwitchNetworkhook("0x585eb4b1")
          .then(() => {
            handleSwitchNetwork(1482601649);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        handleSwitchChainGateWallet(1482601649);
      } else if (
        window.ethereum?.isBinance ||
        window.WALLET_TYPE === "binance"
      ) {
        window.alertify.error(
          "This network is not available on Binance Web3 Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      window.alertify.error(
        "This network is not available on Binance Web3 Wallet"
      );
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleCorePool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x45c")
            .then(() => {
              handleSwitchNetwork(1116);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Web3 Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error(
        "This network is not available on Binance Web3 Wallet"
      );
    }
  };
  const handleVictionPool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x58")
            .then(() => {
              handleSwitchNetwork(88);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Web3 Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error(
        "This network is not available on Binance Web3 Wallet"
      );
    }
  };

  const handleSeiPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xae3f3")
          .then(() => {
            handleSwitchNetwork(713715);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const filterCawsNfts = () => {
    const filteredCaws = listedNFTS.filter((item) => {
      return (
        item.type === "caws" &&
        item.seller.toLowerCase() ===
          window.config.nftSeller_address.toLowerCase()
      );
    });
    setCawsNfts(filteredCaws);
  };

  const filterLandNfts = () => {
    const filteredLands = listedNFTS.filter((item) => {
      return (
        item.type === "land" &&
        item.seller.toLowerCase() ===
          window.config.nftSeller_address.toLowerCase()
      );
    });

    setLandNfts(filteredLands);
  };

  const boughtCaws = (chestId, chestIndex, val1, val2) => {
    const filteredResult = openedChests.find(
      (el) => el.chestId === chestId && allChests.indexOf(el) === chestIndex
    );
    setIsActive(chestId);
    setIsActiveIndex(chestIndex);

    const finalResult = {
      ...filteredResult,
      rewards: [
        { rewardType: "Money", reward: val1 },
        { rewardType: "Points", reward: val2 },
      ],
    };

    setLiveRewardData(finalResult);
    setRewardData(finalResult);
    setMessage("won");
  };

  const showSingleRewardData = (chestID, chestIndex) => {
    const filteredResult = openedChests.find(
      (el) => el.chestId === chestID && allChests.indexOf(el) === chestIndex
    );

    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      const resultPoints = filteredResult.rewards.length === 1;

      console.log(result);
      console.log(filteredResult);
      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }
      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showLiveRewardData = (value) => {
    const filteredResult = value;

    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });
      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });
      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      console.log(result);
      console.log(filteredResult);
      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
    new Audio(successSound).play();
  };

  const showLiveRewardDataSkale = (value) => {
    const filteredResult = value;

    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });
      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
    new Audio(successSound).play();
  };

  const showSingleRewardDataSkale = (chestID, chestIndex) => {
    const filteredResult = openedSkaleChests.find(
      (el) =>
        el.chestId === chestID && allSkaleChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataCore = (chestID, chestIndex) => {
    const filteredResult = openedCoreChests.find(
      (el) => el.chestId === chestID && allCoreChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataViction = (chestID, chestIndex) => {
    const filteredResult = openedVictionChests.find(
      (el) =>
        el.chestId === chestID && allVictionChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataManta = (chestID, chestIndex) => {
    const filteredResult = openedMantaChests.find(
      (el) =>
        el.chestId === chestID && allMantaChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataBase = (chestID, chestIndex) => {
    const filteredResult = openedBaseChests.find(
      (el) => el.chestId === chestID && allBaseChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataTaiko = (chestID, chestIndex) => {
    const filteredResult = openedTaikoChests.find(
      (el) =>
        el.chestId === chestID && allTaikoChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataSei = (chestID, chestIndex) => {
    const filteredResult = openedSeiChests.find(
      (el) => el.chestId === chestID && allSeiChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  useEffect(() => {
    countEarnedRewards();
  }, [
    allChests,
    allSkaleChests,
    allVictionChests,
    allMantaChests,
    allBaseChests,
    allTaikoChests,
    allCoreChests,
  ]);

  // useEffect(() => {
  //   setChain("bnb");
  // }, []);

  useEffect(() => {
    filterCawsNfts();
    filterLandNfts();
  }, [listedNFTS, countListedNfts]);

  useEffect(() => {
    if (chain === "bnb") {
      if (email && coinbase && address) {
        if (coinbase.toLowerCase() === address.toLowerCase()) {
          if (isPremium) {
            if (
              claimedChests + claimedPremiumChests === 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase()
            ) {
              setMessage("complete");
            } else if (
              claimedChests + claimedPremiumChests < 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedChests + claimedPremiumChests < 20 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 56 &&
              chainId !== 204
            ) {
              setMessage("switch");
              setDisable(true);
            }
          } else if (!isPremium) {
            if (
              claimedChests === 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("premium");
            } else if (
              claimedChests < 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedChests < 10 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 56 &&
              chainId !== 204
            ) {
              setMessage("switch");
              setDisable(true);
            }
          }
        } else {
          setMessage("switchAccount");
          setDisable(true);
        }
      } else {
        setMessage("login");
        setDisable(true);
      }
    } else if (chain === "skale") {
      if (window.WALLET_TYPE !== "binance") {
        if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedSkaleChests + claimedSkalePremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedSkaleChests + claimedSkalePremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1482601649
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedSkaleChests + claimedSkalePremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1482601649
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedSkaleChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1482601649
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedSkaleChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1482601649
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedSkaleChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1482601649
              ) {
                setMessage("switch");
                setDisable(true);
              }
            }
          } else {
            setMessage("switchAccount");
            setDisable(true);
          }
        } else {
          setMessage("login");
          setDisable(true);
        }
      } else if (
        window.WALLET_TYPE === "binance" ||
        window.ethereum?.isBinance
      ) {
        setMessage("notsupported");
      }
    } else if (chain === "core") {
      if (window.WALLET_TYPE !== "binance") {
        if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedCoreChests + claimedCorePremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedCoreChests + claimedCorePremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1116
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedCoreChests + claimedCorePremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1116
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedCoreChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1116
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedCoreChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1116
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedCoreChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1116
              ) {
                setMessage("switch");
                setDisable(true);
              }
            }
          } else {
            setMessage("switchAccount");
            setDisable(true);
          }
        } else {
          setMessage("login");
          setDisable(true);
        }
      } else if (
        window.WALLET_TYPE === "binance" ||
        window.ethereum?.isBinance
      ) {
        setMessage("notsupported");
      }
    } else if (chain === "viction") {
      if (window.WALLET_TYPE !== "binance") {
        if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedVictionChests + claimedVictionPremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedVictionChests + claimedVictionPremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 88
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedVictionChests + claimedVictionPremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 88
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedVictionChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 88
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedVictionChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 88
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedVictionChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 88
              ) {
                setMessage("switch");
                setDisable(true);
              }
            }
          } else {
            setMessage("switchAccount");
            setDisable(true);
          }
        } else {
          setMessage("login");
          setDisable(true);
        }
      } else if (
        window.WALLET_TYPE === "binance" ||
        window.ethereum?.isBinance
      ) {
        setMessage("notsupported");
      }
    } else if (chain === "manta") {
      if (email && coinbase && address) {
        if (coinbase.toLowerCase() === address.toLowerCase()) {
          if (isPremium) {
            if (
              claimedMantaChests + claimedMantaPremiumChests === 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase()
            ) {
              setMessage("complete");
            } else if (
              claimedMantaChests + claimedMantaPremiumChests < 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 169
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedMantaChests + claimedMantaPremiumChests < 20 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 169
            ) {
              setMessage("switch");
              setDisable(true);
            }
          } else if (!isPremium) {
            if (
              claimedMantaChests === 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 169
            ) {
              setMessage("premium");
              setDisable(true);
            } else if (
              claimedMantaChests < 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 169
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedMantaChests < 10 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 169
            ) {
              setMessage("switch");
              setDisable(true);
            }
          }
        } else {
          setMessage("switchAccount");
          setDisable(true);
        }
      } else {
        setMessage("login");
        setDisable(true);
      }
    } else if (chain === "base") {
      if (email && coinbase && address) {
        if (coinbase.toLowerCase() === address.toLowerCase()) {
          if (isPremium) {
            if (
              claimedBaseChests + claimedBasePremiumChests === 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase()
            ) {
              setMessage("complete");
            } else if (
              claimedBaseChests + claimedBasePremiumChests < 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 8453
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedBaseChests + claimedBasePremiumChests < 20 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 8453
            ) {
              setMessage("switch");
              setDisable(true);
            }
          } else if (!isPremium) {
            if (
              claimedBaseChests === 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 8453
            ) {
              setMessage("premium");
              setDisable(true);
            } else if (
              claimedBaseChests < 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 8453
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedBaseChests < 10 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 8453
            ) {
              setMessage("switch");
              setDisable(true);
            }
          }
        } else {
          setMessage("switchAccount");
          setDisable(true);
        }
      } else {
        setMessage("login");
        setDisable(true);
      }
    } else if (chain === "taiko") {
      if (window.WALLET_TYPE !== "binance") {
        if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedTaikoChests + claimedTaikoPremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedTaikoChests + claimedTaikoPremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 167000
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedTaikoChests + claimedTaikoPremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 167000
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedTaikoChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 167000
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedTaikoChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 167000
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedTaikoChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 167000
              ) {
                setMessage("switch");
                setDisable(true);
              }
            }
          } else {
            setMessage("switchAccount");
            setDisable(true);
          }
        } else {
          setMessage("login");
          setDisable(true);
        }
      } else if (
        window.WALLET_TYPE === "binance" ||
        window.ethereum?.isBinance
      ) {
        setMessage("notsupported");
      }
    }
  }, [
    email,
    chain,
    chainId,
    coinbase,
    address,
    isPremium,
    claimedChests,
    claimedPremiumChests,
    claimedSkaleChests,
    claimedSkalePremiumChests,
    claimedCoreChests,
    claimedCorePremiumChests,
    claimedVictionChests,
    claimedVictionPremiumChests,
    claimedMantaChests,
    claimedMantaPremiumChests,
    claimedBaseChests,
    claimedBasePremiumChests,
    claimedTaikoChests,
    claimedTaikoPremiumChests,
    rewardData,
  ]);

  return (
    <>
      <div className={`package-popup-wrapper2 `}>
        <div
          className={`new-daily-bonus-popup  ${
            buyNftPopup ? "block-pointers" : ""
          } d-flex flex-column gap-2 custom-container-width`}
        >
          <div className="daily-bonus-outer-wrapper custom-container-width position-relative p-0 p-lg-5">
            {/* <img
            src={xMark}
            className="close-new-bonus"
            width={40}
            height={40}
            alt=""
            onClick={onclose}
            style={{ cursor: "pointer" }}
          /> */}
            <div className={"chest-test-wrapper"}>
              <div
                className="close-daily-btn d-flex align-items-center justify-content-center"
                onClick={onclose}
              >
                <img src={emptyXmark} width={20} height={20} alt="" />
              </div>
              <h6 className="rewards-upper-title mb-9 font-organetto">
                Rewards
              </h6>
              <div className="general-info-tooltip">
                <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
                  <GeneralTooltip
                    open={tooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement={"top"}
                    title={
                      <span className="db-tooltip-desc">
                        The Daily Bonus offers various benefits, ranging from
                        leaderboard points to great rewards.{" "}
                        <b>
                          There are a total of 20 chests to unlock, with 10
                          chests available to all players for free, and the
                          remaining 10 exclusive to premium subscribers.
                        </b>
                        <br />
                        <br />
                        Each reward comes with its own set of probabilities.
                        Typically, smaller rewards have a higher chance of being
                        acquired, while the more valuable rewards are less
                        likely to be obtained. This tiered system ensures that
                        players have a diverse range of potential prizes to aim
                        for.
                        <b>
                          The system is random and takes into consideration
                          player activity and other factors. The more you play
                          daily, the higher your chances of claiming more
                          valuable rewards.
                        </b>
                        <br />
                        <br />
                        <div className="d-flex align-items-center gap-2">
                          <img src={warning} alt="" width={20} height={20} />
                          <span
                            className="db-tooltip-desc"
                            style={{ color: "#F08526" }}
                          >
                            <b>Action Required Sign</b> - Action Needed
                          </span>
                        </div>
                        Some of the rewards opened in the chests might require
                        an action, such as buying a CAWS or Genesis Land NFT, or
                        purchasing a Premium Subscription, in order to claim the
                        reward. The deadline for taking the action is 00:00 UTC
                        each day.
                        <br />
                        <br />
                        <div className="d-flex align-items-center gap-2">
                          <img src={danger} alt="" width={20} height={20} />
                          <span
                            className="db-tooltip-desc"
                            style={{ color: "#C92422" }}
                          >
                            <b>No Action Sign</b> - No Action Possible
                          </span>
                        </div>
                        Some of the biggest rewards might not be allocated
                        because you do not fulfill certain requirements, which
                        will be shown when the chest opens. These chests do not
                        require any action, as the reward will not be allocated.
                        <br />
                        <br />
                        All rewards earned will be distributed at the beginning
                        of each month.
                        <br />
                        <br />
                        Keep playing daily to increase your chances of claiming
                        valuable rewards!
                      </span>
                    }
                  >
                    <img
                      onClick={() => setTooltip(true)}
                      src={infoIcon}
                      width={35}
                      height={35}
                      style={{ cursor: "pointer" }}
                      alt=""
                    />
                  </GeneralTooltip>
                </OutsideClickHandler>
              </div>
              <div className="new-total-points-wrapper d-flex align-items-center gap-2">
                <h6 className="new-total-points  mb-0">
                  {getFormattedNumber(
                    chain === "bnb"
                      ? totalPoints
                      : chain === "core"
                      ? totalCorePoints
                      : chain === "viction"
                      ? totalVictionPoints
                      : chain === "manta"
                      ? totalMantaPoints
                      : chain === "base"
                      ? totalBasePoints
                      : chain === "taiko"
                      ? totalTaikoPoints
                      : chain === "sei"
                      ? 0
                      : totalSkalePoints,
                    0
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex mb-0">
                  Leaderboard Points
                </span>
              </div>
              <div className="new-total-rewards-wrapper d-flex align-items-center gap-2">
                <h6 className="new-total-points  mb-0">
                  $
                  {getFormattedNumber(
                    chain === "bnb"
                      ? totalUsd
                      : chain === "core"
                      ? totalCoreUsd
                      : chain === "viction"
                      ? totalVictionUsd
                      : chain === "manta"
                      ? totalMantaUsd
                      : chain === "base"
                      ? totalBaseUsd
                      : chain === "taiko"
                      ? totalTaikoUsd
                      : chain === "sei"
                      ? 0
                      : totalSkaleUsd,
                    2
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex  mb-0">
                  Rewards
                </span>
              </div>
              <div className="daily-bonus-inner-wrapper container p-4 p-lg-5 mt-3 mt-lg-0">
                <div
                  className="row daily-bonus-row 
               gap-lg-0 mx-3 mx-lg-2 mt-3 mt-lg-3"
                  style={{ height: "100%", marginTop: "64px" }}
                >
                  <div className="col-12 col-lg-5 chains-wrapper mt-5 mt-lg-0 d-flex align-items-center">
                    {windowSize.width && windowSize.width > 992 ? (
                      <div
                        className=" h-100 chains-container"
                        style={{ gap: "8px" }}
                      >
                        <div
                          className={`position-relative chain-item ${
                            chain === "bnb" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={bnbBg}
                            className={`chain-img ${
                              chain === "bnb" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "bnb" && "chain-title-wrapper-active"
                            } p-2 d-flex flex-lg-column align-items-center justify-content-between`}
                            onClick={() => {
                              setChain("bnb");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              BNB CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 56
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleBnbPool}
                              >
                                {" "}
                                <img src={bnbIcon} alt="" /> BNB
                              </button>

                              <button
                                className={` ${
                                  chainId === 204
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleOpBnbPool}
                              >
                                <img src={bnbIcon} alt="" /> opBNB
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(bnbPercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "manta" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={mantaBg}
                            className={`chain-img ${
                              chain === "manta" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "manta" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("manta");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 169
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleMantaPool}
                              >
                                {" "}
                                <img src={manta} alt="" /> MANTA
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    mantaPercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    mantaPercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    mantaPercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    mantaPercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    mantaPercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(mantaPercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "taiko" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={taikoBg}
                            className={`chain-img ${
                              chain === "taiko" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "taiko" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("taiko");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              BNB CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 167000
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleTaikoPool}
                              >
                                {" "}
                                <img src={taiko} alt="" /> Taiko
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    taikoPercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    taikoPercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    taikoPercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    taikoPercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    taikoPercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(taikoPercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "core" && "chain-item-active"
                          } w-100`}
                        >
                          <HtmlTooltipGift
                            placement="top"
                            title={
                              <span className="card-eth-chain-text">
                                Extra Bonus
                              </span>
                            }
                          >
                            <img
                              src={require("./assets/gift.png")}
                              alt=""
                              className="position-absolute manta-gift"
                            />
                          </HtmlTooltipGift>
                          <img
                            src={coreBg}
                            className={`chain-img ${
                              chain === "core" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "core" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("core");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">CORE</h6> */}
                            <div
                              className=" d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={`${
                                  chainId === 1116
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleCorePool}
                              >
                                {" "}
                                <img
                                  src={coreIcon}
                                  width={20}
                                  height={20}
                                  alt=""
                                />{" "}
                                CORE
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    corePercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    corePercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    corePercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    corePercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    corePercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span
                                className="percentage-span"
                                style={{
                                  color: chain === "core" ? "#fff" : "gray",
                                }}
                              >
                                {parseInt(corePercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "base" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={comingSoon4}
                            className={`chain-img ${
                              chain === "base" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "base" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("base");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 8453
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleBasePool}
                              >
                                {" "}
                                <img src={baseLogo} alt="" /> Base
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    basePercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    basePercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    basePercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    basePercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    basePercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(basePercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "skale" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={skaleBg}
                            className={`chain-img ${
                              chain === "skale" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "skale" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("skale");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">SKALE</h6> */}
                            <div
                              className=" d-flex align-items-center gap-2 "
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={`${
                                  chainId === 1482601649
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleSkalePool}
                              >
                                {" "}
                                <img src={skaleIcon} alt="" /> SKALE
                              </button>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(skalePercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "viction" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={victionBg}
                            className={`chain-img ${
                              chain === "viction" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "viction" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("viction");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            <button
                              className={`${
                                chainId === 88
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center`}
                              onClick={handleVictionPool}
                            >
                              {" "}
                              <img
                                src={victionIcon}
                                width={20}
                                height={20}
                                alt=""
                              />{" "}
                              VICTION
                            </button>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    victionPercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    victionPercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    victionPercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    victionPercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    victionPercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span
                                className="percentage-span"
                                style={{
                                  color: chain === "viction" ? "#fff" : "gray",
                                }}
                              >
                                {parseInt(victionPercentage)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`position-relative chain-item w-100`}>
                          <img
                            src={comingSoon}
                            className={`chain-img`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper p-2 d-flex align-items-center flex-lg-column justify-content-center`}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span className="percentage-span">
                                Coming Soon
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`position-relative chain-item w-100`}>
                          <img
                            src={comingSoon2}
                            className={`chain-img`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper p-2 d-flex align-items-center flex-lg-column justify-content-center`}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span className="percentage-span">
                                Coming Soon
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`position-relative chain-item w-100`}>
                          <img
                            src={comingSoon3}
                            className={`chain-img`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper p-2 d-flex align-items-center flex-lg-column justify-content-center`}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span className="percentage-span">
                                Coming Soon
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : windowSize.width && windowSize.width<= 992 ? (
                      <Slider {...settings}>
                        <div
                          className={`position-relative chain-item ${
                            chain === "bnb" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={bnbBg}
                            className={`chain-img ${
                              chain === "bnb" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "bnb" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("bnb");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              BNB CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 56
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleBnbPool}
                              >
                                {" "}
                                <img src={bnbIcon} alt="" /> BNB
                              </button>

                              <button
                                className={` ${
                                  chainId === 204
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleOpBnbPool}
                              >
                                <img src={bnbIcon} alt="" /> opBNB
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "manta" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={mantaBg}
                            className={`chain-img ${
                              chain === "manta" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "manta" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                            onClick={() => {
                              setChain("manta");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              Manta CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 169
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleMantaPool}
                              >
                                {" "}
                                <img src={manta} alt="" /> Manta
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "taiko" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={taikoBg}
                            className={`chain-img ${
                              chain === "taiko" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "taiko" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("taiko");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              Manta CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 169
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleTaikoPool}
                              >
                                {" "}
                                <img src={taiko} alt="" /> Taiko
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "skale" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={skaleBg}
                            className={`chain-img ${
                              chain === "skale" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "skale" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("skale");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">SKALE</h6> */}
                            <div
                              className=" d-flex align-items-center gap-2 "
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={`${
                                  chainId === 1482601649
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleSkalePool}
                              >
                                {" "}
                                <img src={skaleIcon} alt="" /> SKALE
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "core" && "chain-item-active"
                          }  w-auto`}
                        >
                          <HtmlTooltipGift
                            placement="top"
                            title={
                              <span className="card-eth-chain-text">
                                Extra Bonus
                              </span>
                            }
                          >
                            <img
                              src={require("./assets/gift.png")}
                              alt=""
                              className="position-absolute manta-gift"
                            />
                          </HtmlTooltipGift>
                          <img
                            src={coreBg}
                            className={`chain-img ${
                              chain === "core" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "core" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("core");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">CORE</h6> */}
                            <div
                              className=" d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={`${
                                  chainId === 1116
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleCorePool}
                              >
                                {" "}
                                <img
                                  src={coreIcon}
                                  width={20}
                                  height={20}
                                  alt=""
                                />{" "}
                                CORE
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "base" && "chain-item-active"
                          }  w-auto`}
                        >
                          <img
                            src={comingSoon4}
                            className={`chain-img ${
                              chain === "base" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "base" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                            onClick={() => {
                              setChain("base");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              Manta CHAIN
                            </h6> */}
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ width: "fit-content" }}
                            >
                              <button
                                className={` ${
                                  chainId === 8453
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleBasePool}
                              >
                                {" "}
                                <img src={baseLogo} alt="" /> Base
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`position-relative chain-item ${
                            chain === "viction" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={victionBg}
                            className={`chain-img ${
                              chain === "viction" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "viction" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("viction");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                          >
                            <button
                              className={`${
                                chainId === 88
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center`}
                              onClick={handleVictionPool}
                            >
                              {" "}
                              <img
                                src={victionIcon}
                                width={20}
                                height={20}
                                alt=""
                              />{" "}
                              VICTION
                            </button>
                          </div>
                        </div>
                      </Slider>
                    ) : <></>}
                  </div>
                  <div className="col-12 col-lg-7 px-0 grid-overall-wrapper">
                    <div className="grid-scroll">
                      <div className="new-chests-grid">
                        {chain === "bnb"
                          ? allChests && allChests.length > 0
                            ? allChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={bnbImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardData(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={bnbImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardData(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                          : chain === "core"
                          ? allCoreChests && allCoreChests.length > 0
                            ? allCoreChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={coreImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onCoreChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataCore(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={coreImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onCoreChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataCore(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                          : chain === "manta"
                          ? allMantaChests && allMantaChests.length > 0
                            ? allMantaChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={mantaImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onMantaChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataManta(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={mantaImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onMantaChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataManta(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                          : chain === "base"
                          ? allBaseChests && allBaseChests.length > 0
                            ? allBaseChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={baseImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onBaseChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataBase(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={mantaImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onMantaChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataManta(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                          : chain === "taiko"
                          ? allTaikoChests && allTaikoChests.length > 0
                            ? allTaikoChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={taikoImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onTaikoChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataTaiko(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={taikoImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onTaikoChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataTaiko(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                          : chain === "viction"
                          ? allVictionChests && allVictionChests.length > 0
                            ? allVictionChests.map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  image={victionImages[index]}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onVictionChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataViction(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  image={victionImages[index]}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onVictionChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataViction(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                  binanceW3WProvider={binanceW3WProvider}
                                />
                              ))
                          : chain === "skale" &&
                            allSkaleChests &&
                            allSkaleChests.length > 0
                          ? allSkaleChests.map((item, index) => (
                              <NewChestItem
                                coinbase={coinbase}
                                claimingChest={claimingChest}
                                setClaimingChest={setClaimingChest}
                                buyNftPopup={buyNftPopup}
                                chainId={chainId}
                                chain={chain}
                                key={index}
                                item={item}
                                image={skaleImages[index]}
                                // openChest={openChest}
                                selectedChest={selectedChest}
                                isPremium={isPremium}
                                onClaimRewards={(value) => {
                                  setLiveRewardData(value);
                                  onSkaleChestClaimed();
                                  showLiveRewardDataSkale(value);
                                  setIsActive(item.chestId);
                                  setIsActiveIndex(index + 1);
                                }}
                                handleShowRewards={(value, value2) => {
                                  showSingleRewardDataSkale(value, value2);
                                  setIsActive(value);
                                  setIsActiveIndex(index + 1);
                                }}
                                onLoadingChest={(value) => {
                                  // setDisable(value);
                                }}
                                onChestStatus={(val) => {
                                  setMessage(val);
                                }}
                                address={address}
                                email={email}
                                rewardTypes={item.chestType?.toLowerCase()}
                                chestId={item.chestId}
                                chestIndex={index + 1}
                                open={item.isOpened}
                                disableBtn={disable}
                                isActive={isActive}
                                isActiveIndex={isActiveIndex}
                                dummypremiumChests={
                                  dummypremiumChests[index - 10]?.closedImg
                                }
                                binanceW3WProvider={binanceW3WProvider}
                              />
                            ))
                          : window.range(0, 19).map((item, index) => (
                              <NewChestItem
                                coinbase={coinbase}
                                claimingChest={claimingChest}
                                setClaimingChest={setClaimingChest}
                                buyNftPopup={buyNftPopup}
                                chainId={chainId}
                                chain={chain}
                                key={index}
                                item={item}
                                image={skaleImages[index]}
                                selectedChest={selectedChest}
                                isPremium={isPremium}
                                onClaimRewards={(value) => {
                                  // setRewardData(value);
                                  setLiveRewardData(value);
                                  onSkaleChestClaimed();
                                  showLiveRewardData(value);
                                  setIsActive(item.chestId);
                                  // setIsActiveIndex(index + 1);
                                }}
                                handleShowRewards={(value, value2) => {
                                  showSingleRewardData(value, value2);
                                  setIsActive(value);
                                  // setIsActiveIndex(index + 1);
                                }}
                                onLoadingChest={(value) => {
                                  // setDisable(value);
                                }}
                                onChestStatus={(val) => {
                                  setMessage(val);
                                }}
                                address={address}
                                email={email}
                                rewardTypes={
                                  index + 1 <= 10 ? "standard" : "premium"
                                }
                                chestId={item.chestId}
                                chestIndex={index + 1}
                                open={item.opened}
                                disableBtn={true}
                                isActive={isActive}
                                openChest={() => {
                                  console.log("test");
                                }}
                                dummypremiumChests={
                                  dummypremiumChests[index - 10]?.closedImg
                                }
                                binanceW3WProvider={binanceW3WProvider}
                              />
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0 mt-0 mt-lg-3 message-height-wrapper">
                    {message === "" ||
                    message === "initial" ||
                    message === "waiting" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #10C5C5",
                        }}
                      >
                        <div
                          className={`loader ${
                            message === "waiting" && "loader-waiting"
                          }`}
                        >
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6 className="loader-text mb-0">
                          {message === "waiting"
                            ? "Processing"
                            : "Ready to claim"}
                        </h6>
                        <div
                          className={`loader ${
                            message === "waiting" && "loader-waiting-2"
                          }`}
                        >
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "switch" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #ce5d1b",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>

                        {chain === "bnb" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleBnbPool}
                            >
                              BNB Chain
                            </span>{" "}
                            or{" "}
                            <span
                              span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleOpBnbPool}
                            >
                              opBNB Chain
                            </span>
                          </h6>
                        ) : chain === "skale" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleSkalePool}
                            >
                              SKALE Network
                            </span>
                          </h6>
                        ) : chain === "manta" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleMantaPool}
                            >
                              Manta Chain
                            </span>
                          </h6>
                        ) : chain === "taiko" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleTaikoPool}
                            >
                              Taiko Chain
                            </span>
                          </h6>
                        ) : chain === "core" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleCorePool}
                            >
                              CORE Network
                            </span>
                          </h6>
                        ) : chain === "viction" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleVictionPool}
                            >
                              Viction Network
                            </span>
                          </h6>
                        ) : chain === "base" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleBasePool}
                            >
                              BASE Network
                            </span>
                          </h6>
                        ) : (
                          // : chain === "sei" ? (
                          //   <h6
                          //     className="loader-text mb-0"
                          //     style={{ color: "#ce5d1b" }}
                          //   >
                          //     Switch to{" "}
                          //     <span
                          //       style={{
                          //         textDecoration: "underline",
                          //         cursor: "pointer",
                          //       }}
                          //       // onClick={handleSeiPool}
                          //     >
                          //       Sei Network
                          //     </span>
                          //   </h6>
                          // )
                          <></>
                        )}
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "notsupported" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #ce5d1b",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#ce5d1b" }}
                        >
                          Not available
                        </h6>
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "switchAccount" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #ce5d1b",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                          <div className="dot" style={{ "--i": 10 }}></div>
                        </div>

                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#ce5d1b" }}
                        >
                          Use the wallet associated to your game account.
                        </h6>

                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                          <div className="dot" style={{ "--i": 10 }}></div>
                        </div>
                      </div>
                    ) : message === "error" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #D75853",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#D75853" }}
                        >
                          Something went wrong. Try again.
                        </h6>
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "complete" ? (
                      <div className="d-flex align-items-center justify-content-center complete-bg p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <h6 className="completed-text mb-0">Completed</h6>
                      </div>
                    ) : message === "needPremium" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you become a
                              Premium Subscriber.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              {" "}
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-5 me-0 me-lg-3 px-3 px-lg-0">
                          <img
                            className="d-none d-lg-flex"
                            src={premiumIcon}
                            style={{ width: 70, height: 70 }}
                            alt=""
                          />
                          <button
                            className="get-premium-btn px-2 py-1 mb-2 mb-lg-0"
                            onClick={onPremiumClick}
                          >
                            Get Premium
                          </button>
                        </div>
                      </div>
                    ) : message === "caws" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span
                              className="win-desc mb-0"
                              style={{ fontSize: 10 }}
                            >
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you get one of
                              the suggested CAWS NFTs.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {cawsNfts.slice(0, 4).map((item, index) => (
                            <div
                              className="nft-reward-container"
                              onClick={() => {
                                setNft(item);
                                setBuyNftPopup(true);
                                // boughtCaws(
                                //   isActive,
                                //   isActiveIndex,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Money";
                                //   }).reward ?? 0,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Points";
                                //   }).reward ?? 0
                                // );
                              }}
                            >
                              <img
                                key={index}
                                className="nft-reward-img"
                                src={`https://mint.dyp.finance/thumbs150/${item.tokenId}.png`}
                                alt=""
                              />
                              <div className="buy-nft-reward-btn">Buy</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : message === "won" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You Won</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>

                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>

                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <img
                          src={winConfetti}
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "wonPoints" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You Won</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                        </div>

                        <img
                          src={winConfetti}
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "premium" ? (
                      <div
                        className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          border: "1px solid #8262D0",
                          background:
                            "linear-gradient(180deg, #8262D0 0%, #482293 100%)",
                        }}
                      >
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6
                            className="desc-title mb-0"
                            style={{ color: "#fff" }}
                          >
                            Become Premium Subscriber
                          </h6>
                          <span className="chain-desc mb-0">
                            Enjoy extra benefits and unlock more chests for
                            extra rewards by upgrading to premium.
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between get-premium-wrapper p-3 p-lg-0">
                          <img
                            src={premiumIcon}
                            style={{ width: 60, height: 60 }}
                            alt=""
                          />
                          <button
                            className="get-premium-btn px-2 py-1"
                            onClick={onPremiumClickOther}
                          >
                            Get Premium
                          </button>
                        </div>
                      </div>
                    ) : message === "login" ? (
                      <div
                        className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          border: "1px solid #8262D0",
                          background:
                            "linear-gradient(180deg, #8262D0 0%, #482293 100%)",
                        }}
                      >
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6
                            className="desc-title mb-0"
                            style={{ color: "#fff" }}
                          >
                            Sign in with Your Game Account
                          </h6>
                          <span className="chain-desc mb-0">
                            Sign in to access Daily Bonus and earn tailored
                            rewards!
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-end get-premium-wrapper p-3 p-lg-0">
                          <NavLink
                            className="sign-in-btn px-4 py-1"
                            to="/auth"
                            onClick={() => {
                              html.classList.remove("hidescroll");
                            }}
                          >
                            Sign In
                          </NavLink>
                        </div>
                      </div>
                    ) : message === "winDanger" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {winDangerItems
                            .sort(
                              (a, b) => Number(b.required) - Number(a.required)
                            )
                            .map((item, index) =>
                              item.required ? (
                                <HtmlTooltip
                                  placement="top"
                                  title={
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "fit-content" }}
                                    >
                                      <span
                                        className="win-desc"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {item.message}
                                      </span>
                                    </div>
                                  }
                                >
                                  <div className="nft-reward-container">
                                    <img
                                      key={index}
                                      className="nft-reward-img"
                                      src={item.image}
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                        filter: "opacity(0.5)",
                                      }}
                                    />
                                    <img
                                      src={item.holder ? greenCheck : redX}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                </HtmlTooltip>
                              ) : (
                                <div className="required-item-placeholder"></div>
                              )
                            )}
                        </div>
                      </div>
                    ) : message === "winDangerCaws" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerLand" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerNotEnoughLand" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerHasNftsNoPremium" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerHasNftsPremiumNoDyp" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "wod" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span
                              className="win-desc mb-0"
                              style={{ fontSize: 10 }}
                            >
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you get one of
                              the suggested Genesis NFTs.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {landNfts.slice(0, 4).map((item, index) => (
                            <div
                              className="nft-reward-container"
                              onClick={() => {
                                setNft(item);
                                setBuyNftPopup(true);
                                // boughtCaws(
                                //   isActive,
                                //   isActiveIndex,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Money";
                                //   }).reward ?? 0,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Points";
                                //   }).reward ?? 0
                                // );
                              }}
                            >
                              <img
                                key={index}
                                className="nft-reward-img"
                                src={`https://mint.worldofdypians.com/thumbs150/${item.tokenId}.png`}
                                alt=""
                                width={70}
                                height={70}
                              />
                              <div className="buy-nft-reward-btn">Buy</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : message === "comingsoon" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #D75853",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#D75853" }}
                        >
                          Coming Soon
                        </h6>
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rewards-container-outer custom-container-width d-flex align-items-center justify-content-center p-4">
            {windowSize.width > 992 ? (
              <div className="new-rewards-grid">
                {dummyRewards.map((item, index) => (
                  <div
                    key={index}
                    className="new-rewards-item p-2 d-flex align-items-center gap-2"
                    style={{
                      filter:
                        item.title2 !== "needPremium"
                          ? (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType === "Points" &&
                                  Number(obj.reward) <= item.threshold[1]
                                );
                              })) ||
                            (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType !== "Points" &&
                                  Number(obj.reward) > item.min &&
                                  Number(obj.reward) <= item.max
                                );
                              }) &&
                              message != "needPremium")
                            ? "brightness(1)"
                            : "brightness(0.5)"
                          : (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType === "Points" &&
                                  Number(obj.reward) <= item.threshold[1]
                                );
                              })) ||
                            (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType !== "Points" &&
                                  Number(obj.reward) > item.min &&
                                  Number(obj.reward) <= item.max &&
                                  message === "needPremium"
                                );
                              }))
                          ? "brightness(1)"
                          : "brightness(0.5)",
                    }}
                  >
                    <div className="position-relative">
                      <img
                        src={require(`./assets/${item.img}${
                          item.title2 !== "needPremium"
                            ? (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Points" &&
                                    Number(obj.reward) <= item.threshold[1]
                                  );
                                })) ||
                              (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType !== "Points" &&
                                    Number(obj.reward) > item.min &&
                                    Number(obj.reward) <= item.max
                                  );
                                }) &&
                                message != "needPremium")
                              ? "Active"
                              : ""
                            : (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Points" &&
                                    Number(obj.reward) <= item.threshold[1]
                                  );
                                })) ||
                              (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType !== "Points" &&
                                    Number(obj.reward) > item.min &&
                                    Number(obj.reward) <= item.max
                                  );
                                }) &&
                                message === "needPremium")
                            ? "Active"
                            : ""
                        }Icon.png`)}
                        width={60}
                        height={60}
                        alt=""
                      />
                      {item.title2 !== "needPremium" ? (
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimed" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message !== "needPremium" ? (
                          <img
                            src={warning}
                            width={20}
                            height={20}
                            className="reward-warning"
                            alt=""
                          />
                        ) : rewardData &&
                          rewardData.rewards?.find((obj) => {
                            return obj.rewardType === item.title;
                          }) &&
                          rewardData &&
                          rewardData.rewards?.find((obj) => {
                            return (
                              obj.rewardType === item.title &&
                              obj.status === "Unclaimable" &&
                              obj.reward > item.min &&
                              obj.reward <= item.max
                            );
                          }) &&
                          message !== "needPremium" ? (
                          <img
                            src={danger}
                            width={20}
                            height={20}
                            className="reward-warning"
                            alt=""
                          />
                        ) : (
                          <></>
                        )
                      ) : rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimed" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message === "needPremium" ? (
                        <img
                          src={warning}
                          width={20}
                          height={20}
                          className="reward-warning"
                          alt=""
                        />
                      ) : rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimable" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message === "needPremium" ? (
                        <img
                          src={danger}
                          width={20}
                          height={20}
                          className="reward-warning"
                          alt=""
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="d-flex align-items-bottom gap-1">
                      <h6
                        className="mb-0  new-reward-amount"
                        style={{
                          color:
                            rewardData &&
                            rewardData.rewards?.find((obj) => {
                              return (
                                obj.rewardType === "Points" &&
                                Number(obj.reward) <= item.threshold[1]
                              );
                            })
                              ? "#F2C624"
                              : item.title2 !== "needPremium"
                              ? rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === item.title &&
                                    (obj.status !== "Unclaimed" ||
                                      obj.status !== "Unclaimable") &&
                                    obj.reward > item.min &&
                                    obj.reward <= item.max
                                  );
                                }) && message !== "needPremium"
                                ? "#F2C624"
                                : "#fff"
                              : rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === item.title &&
                                    (obj.status !== "Unclaimed" ||
                                      obj.status !== "Unclaimable") &&
                                    obj.reward > item.min &&
                                    obj.reward <= item.max
                                  );
                                }) && message === "needPremium"
                              ? "#F2C624"
                              : "#fff",
                        }}
                      >
                        {item.amount}
                      </h6>
                      {/* <span className="mb-0  new-reward-type">{item.title}</span> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
              // <Slider {...settings2} ref={rewardsRef} style={{ width: "100%" }}>
              //   {dummyRewards.map((item, index) => (
              //     <div
              //       key={index}
              //       className="new-rewards-item p-2 d-flex align-items-center justify-content-center gap-2"
              //       style={{
              //         filter:
              //         item.title2 !== "needPremium"
              //           ? (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })) ||
              //             (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType !== "Points" &&
              //                   Number(obj.reward) > item.min &&
              //                   Number(obj.reward) <= item.max
              //                 );
              //               }) &&
              //               message != "needPremium")
              //             ? "brightness(1)"
              //             : "brightness(0.5)"
              //           : (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })) ||
              //             (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType !== "Points" &&
              //                   Number(obj.reward) > item.min &&
              //                   Number(obj.reward) <= item.max &&
              //                   message === "needPremium"
              //                 );
              //               }))
              //           ? "brightness(1)"
              //           : "brightness(0.5)",
              //       }}
              //     >
              //       <div className="position-relative">
              //         <img
              //            src={require(`./assets/${item.img}${
              //             item.title2 !== "needPremium"
              //               ? (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === "Points" &&
              //                       Number(obj.reward) <= item.threshold[1]
              //                     );
              //                   })) ||
              //                 (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType !== "Points" &&
              //                       Number(obj.reward) > item.min &&
              //                       Number(obj.reward) <= item.max
              //                     );
              //                   }) &&
              //                   message != "needPremium")
              //                 ? "Active"
              //                 : ""
              //               : (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === "Points" &&
              //                       Number(obj.reward) <= item.threshold[1]
              //                     );
              //                   })) ||
              //                 (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType !== "Points" &&
              //                       Number(obj.reward) > item.min &&
              //                       Number(obj.reward) <= item.max
              //                     );
              //                   }) &&
              //                   message === "needPremium")
              //               ? "Active"
              //               : ""
              //           }Icon.png`)}
              //           width={60}
              //           height={60}
              //           alt=""
              //         />
              //         {item.title2 !== "needPremium" ? (
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimed" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message !== "needPremium" ? (
              //             <img
              //               src={warning}
              //               width={20}
              //               height={20}
              //               className="reward-warning"
              //               alt=""
              //             />
              //           ) : rewardData &&
              //             rewardData.rewards?.find((obj) => {
              //               return obj.rewardType === item.title;
              //             }) &&
              //             rewardData &&
              //             rewardData.rewards?.find((obj) => {
              //               return (
              //                 obj.rewardType === item.title &&
              //                 obj.status === "Unclaimable" &&
              //                 obj.reward > item.min &&
              //                 obj.reward <= item.max
              //               );
              //             }) &&
              //             message !== "needPremium" ? (
              //             <img
              //               src={danger}
              //               width={20}
              //               height={20}
              //               className="reward-warning"
              //               alt=""
              //             />
              //           ) : (
              //             <></>
              //           )
              //         ) : rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimed" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message === "needPremium" ? (
              //           <img
              //             src={warning}
              //             width={20}
              //             height={20}
              //             className="reward-warning"
              //             alt=""
              //           />
              //         ) : rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimable" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message === "needPremium" ? (
              //           <img
              //             src={danger}
              //             width={20}
              //             height={20}
              //             className="reward-warning"
              //             alt=""
              //           />
              //         ) : (
              //           <></>
              //         )}
              //       </div>
              //       <div className="d-flex align-items-bottom gap-1">
              //       <h6
              //           className="mb-0  new-reward-amount"
              //           style={{
              //             color:
              //               rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })
              //                 ? "#F2C624"
              //                 : item.title2 !== "needPremium"
              //                 ? rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === item.title &&
              //                       (obj.status !== "Unclaimed" ||
              //                         obj.status !== "Unclaimable") &&
              //                       obj.reward > item.min &&
              //                       obj.reward <= item.max
              //                     );
              //                   }) && message !== "needPremium"
              //                   ? "#F2C624"
              //                   : "#fff"
              //                 : rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === item.title &&
              //                       (obj.status !== "Unclaimed" ||
              //                         obj.status !== "Unclaimable") &&
              //                       obj.reward > item.min &&
              //                       obj.reward <= item.max
              //                     );
              //                   }) && message === "needPremium"
              //                 ? "#F2C624"
              //                 : "#fff",
              //           }}
              //         >
              //           {item.amount}
              //         </h6>
              //         {/* <span className="mb-0  new-reward-type">{item.title}</span> */}
              //       </div>
              //     </div>
              //   ))}
              // </Slider>
            )}
          </div>
        </div>
      </div>
      {buyNftPopup && (
        <BuyNftPopup
          nft={nft}
          onClose={() => setBuyNftPopup(false)}
          dypTokenData={dypTokenData}
          dyptokenData_old={dyptokenData_old}
          ethTokenData={ethTokenData}
          handleSwitchChain={handleSwitchChain}
          chestIndex={isActiveIndex}
          chain={chain}
          chainId={chainId}
          coinbase={coinbase}
          binanceW3WProvider={binanceW3WProvider}
          email={email}
          onSuccessPurchase={() => {
            onSkaleChestClaimed();
            onChestClaimed();
            onVictionChestClaimed();
            onCoreChestClaimed();
            onMantaChestClaimed();
            onTaikoChestClaimed();
            onBaseChestClaimed();
            setcountListedNfts(countListedNfts);
            // setBuyNftPopup(false);
            setTimeout(() => {
              chain === "bnb"
                ? showSingleRewardData(rewardData.chestId, isActiveIndex - 1)
                : chain === "core"
                ? showSingleRewardDataCore(
                    rewardData.chestId,
                    isActiveIndex - 1
                  )
                : chain === "manta"
                ? showSingleRewardDataManta(
                    rewardData.chestId,
                    isActiveIndex - 1
                  )
                : chain === "taiko"
                ? showSingleRewardDataTaiko(
                    rewardData.chestId,
                    isActiveIndex - 1
                  )
                : chain === "viction"
                ? showSingleRewardDataViction(
                    rewardData.chestId,
                    isActiveIndex - 1
                  )
                : chain === "base"
                ? showSingleRewardDataBase(
                    rewardData.chestId,
                    isActiveIndex - 1
                  )
                : showSingleRewardDataSkale(
                    rewardData.chestId,
                    isActiveIndex - 1
                  );
            }, 2000);
          }}
        />
      )}
    </>
  );
};

export default NewDailyBonus;
