import React, { useEffect, useRef, useState } from "react";
import "./_newdailybonus.scss";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import BuyNftPopup from "./BuyNftPopup";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import NewChestItem from "./NewChestItem";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";
import successSound from "./assets/success.mp3";

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

const MatchainDailyBonus = ({
  onclose,
  isPremium,
  chainId,
  handleSwitchNetwork,
  claimedPremiumChests,
  claimedSkaleChests,
  claimedSkalePremiumChests,
  claimedChests,
  email,
  openedChests,
  address,
  allChests,
  allSkaleChests,
  onChestClaimed,
  onSkaleChestClaimed,
  listedNFTS,
  dypTokenData,
  ethTokenData,
  handleSwitchChain,
  openedSkaleChests,
  coinbase,
  dummypremiumChests,
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
  claimedTaikoChests,
  claimedTaikoPremiumChests,
  openedTaikoChests,
  allTaikoChests,
  onTaikoChestClaimed,
  binanceW3WProvider,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  binanceWallet,
  matImages,
  claimedMatChests,
  claimedMatPremiumChests,
  openedMatChests,
  onMatChestClaimed,
  allMatChests,
  onConnectWallet,
  walletClient,
  publicClient,
  network_matchain,
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

  const matClaimed = claimedMatChests + claimedMatPremiumChests;
  const matPercentage = (matClaimed / 20) * 100;

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
      image: "https://cdn.worldofdypians.com/wod/wodRound.png",
      holder: false,
      message: "Hold >1 CAWS NFT",
      required: true,
    },
    {
      image: "https://cdn.worldofdypians.com/wod/wodRound.png",
      holder: true,
      message: "Hold Genesis NFT",
      required: true,
    },
    {
      image: "https://cdn.worldofdypians.com/wod/premiumIcon.webp",
      holder: false,
      message: "Prime Users",
      required: true,
    },
    {
      image: "https://cdn.worldofdypians.com/wod/dypius.svg",
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
      title2: "",
      amount: "Points",
      img: "points",
      error: true,
      threshold: [1, 200000],
    },
    {
      title: "Money",
      title2: "",
      amount: "$0.5 - $5",
      img: 2,
      error: false,
      threshold: [0.5, 5],
      min: 0.5,
      max: 5,
    },
    {
      title: "Stars",
      title2: "",
      amount: "Stars",
      img: "star",
      error: true,
      threshold: [],
      min: 10,
      max: 50,
    },
    {
      title: "Money",
      title2: "needCaws",
      amount: "$20-$30",
      img: 30,
      error: true,
      threshold: [20, 30],
      min: 20,
      max: 30,
    },
    {
      title: "Money",
      title2: "needLand",
      amount: "$350-$700",
      img: 1500,
      error: false,
      threshold: [350, 700],
      min: 350,
      max: 700,
    },
  ];

  const [chain, setChain] = useState("matchain");
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

  const [totalStars, settotalStars] = useState(0);
  const [totalSkaleStars, settotalSkaleStars] = useState(0);

  const [totalCoreStars, settotalCoreStars] = useState(0);
  const [totalVictionStars, settotalVictionStars] = useState(0);
  const [totalMantaStars, settotalMantaStars] = useState(0);
  const [totalBaseStars, settotalBaseStars] = useState(0);
  const [totalTaikoStars, settotalTaikoStars] = useState(0);
  const [totalMatStars, settotalMatStars] = useState(0);

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
  const [totalMatPoints, settotalMatPoints] = useState(0);
  const [totalMatUsd, settotalMatUsd] = useState(0);

  const [totalSeiPoints, settotalSeiPoints] = useState(0);
  const [totalSeiUsd, settotalSeiUsd] = useState(0);
  const [totalSeiStars, settotalSeiStars] = useState(0);

  const [tooltip, setTooltip] = useState(false);
  const [claimingChest, setClaimingChest] = useState(false);
  const [visibleChain, setVisibleChain] = useState("matchain");

  const countEarnedRewards = () => {
    if (allChests && allChests.length > 0) {
      let resultPoints = 0;
      let resultUsd = 0;
      let resultstars = 0;

      allChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultPoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalStars(resultstars);
      settotalUsd(resultUsd);
    }

    if (allSkaleChests && allSkaleChests.length > 0) {
      let resultSkalePoints = 0;
      let resultSkaleUsd = 0;
      let resultstars = 0;

      allSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
              }

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
      settotalSkaleStars(resultstars);
    }

    if (allCoreChests && allCoreChests.length > 0) {
      let resultCorePoints = 0;
      let resultCoreUsd = 0;
      let resultstars = 0;

      allCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultCorePoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalCoreStars(resultstars);
    }

    if (allVictionChests && allVictionChests.length > 0) {
      let resultVictionPoints = 0;
      let resultVictionUsd = 0;
      let resultstars = 0;

      allVictionChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultVictionPoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalVictionStars(resultstars);
    }

    if (allMantaChests && allMantaChests.length > 0) {
      let resultMantaPoints = 0;
      let resultMantaUsd = 0;
      let resultstars = 0;

      allMantaChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultMantaPoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalMantaStars(resultstars);

      settotalMantaPoints(resultMantaPoints);
      settotalMantaUsd(resultMantaUsd);
    }

    if (allBaseChests && allBaseChests.length > 0) {
      let resultBasePoints = 0;
      let resultBaseUsd = 0;
      let resultstars = 0;

      allBaseChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
              }
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
      settotalBaseStars(resultstars);

      settotalBasePoints(resultBasePoints);
      settotalBaseUsd(resultBaseUsd);
    }

    if (allTaikoChests && allTaikoChests.length > 0) {
      let resultTaikoPoints = 0;
      let resultTaikoUsd = 0;
      let resultstars = 0;

      allTaikoChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultTaikoPoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalTaikoStars(resultstars);

      settotalTaikoPoints(resultTaikoPoints);
      settotalTaikoUsd(resultTaikoUsd);
    }

    if (allMatChests && allMatChests.length > 0) {
      let resultMatPoints = 0;
      let resultMatUsd = 0;
      let resultstars = 0;

      allMatChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultMatPoints += Number(innerChest.reward);
              }
              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultMatUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultMatPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });
      settotalMatStars(resultstars);

      settotalMatPoints(resultMatPoints);
      settotalMatUsd(resultMatUsd);
    }

    if (allSeiChests && allSeiChests.length > 0) {
      let resultSeiPoints = 0;
      let resultSeiUsd = 0;
      let resultstars = 0;

      allSeiChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSeiPoints += Number(innerChest.reward);
              }

              if (innerChest.rewardType === "Stars") {
                resultstars += Number(innerChest.reward);
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
      settotalSeiStars(resultstars);

      settotalSeiPoints(resultSeiPoints);
      settotalSeiUsd(resultSeiUsd);
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
      } else if (chain === "matchain") {
        showSingleRewardDataMat(rewardData.chestId, isActiveIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (premiumTxHash !== "" && selectedChainforPremium !== "") {
      handleClaimUsdPremium();
    }
  }, [premiumTxHash, selectedChainforPremium]);

  const handleMatPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x2ba")
            .then(() => {
              handleSwitchNetwork(698);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error("This network is not available on Binance Wallet");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
      }
      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showSingleRewardDataMat = (chestID, chestIndex) => {
    const filteredResult = openedMatChests.find(
      (el) => el.chestId === chestID && allMatChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
      const resultPoints = filteredResult.rewards.length === 1;
      const resultPointsStars =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Stars" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money";
        }) === undefined;

      const resultPointsMoney =
        filteredResult.rewards.length === 2 &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" || obj.rewardType === "Points";
        }) !== undefined &&
        filteredResult.rewards.find((obj) => {
          return obj.rewardType === "Money" && obj.status === "Claimed";
        }) !== undefined;

      const resultWonMoneyNoLand =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFTs.") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultWonMoneyNoCaws =
        filteredResult.rewards.length === 3 &&
        filteredResult.rewards.find((obj) => {
          return (
            obj.rewardType === "Stars" ||
            (obj.rewardType === "Money" &&
              obj.status === "Unclaimable" &&
              obj.details ===
                "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs") ||
            obj.rewardType === "Points"
          );
        }) !== undefined;

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultPointsStars) {
        setMessage("wonPointsStars");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultPointsMoney) {
        setMessage("won");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultPremium) {
        setMessage("needPremium");
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
    allMatChests,
    allCoreChests,
    allSeiChests,
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
    } else if (chain === "matchain") {
      if (window.WALLET_TYPE !== "binance") {
        if (!email) {
          setMessage("login");
          setDisable(true);
        } else if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedMatChests + claimedMatPremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedMatChests + claimedMatPremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 698
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedMatChests + claimedMatPremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 698
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedMatChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 698
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedMatChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 698
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedMatChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 698
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
          setMessage("connect");
          setDisable(true);
        }
      } else if (
        window.WALLET_TYPE === "binance" ||
        window.ethereum?.isBinance
      ) {
        setMessage("notsupported");
      }
    } else if (chain === "sei") {
      if (window.WALLET_TYPE !== "binance") {
        if (email && coinbase && address) {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            if (isPremium) {
              if (
                claimedSeiChests + claimedSeiPremiumChests === 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase()
              ) {
                setMessage("complete");
              } else if (
                claimedSeiChests + claimedSeiPremiumChests < 20 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1329
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedSeiChests + claimedSeiPremiumChests < 20 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1329
              ) {
                setMessage("switch");
                setDisable(true);
              }
            } else if (!isPremium) {
              if (
                claimedSeiChests === 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1329
              ) {
                setMessage("premium");
                setDisable(true);
              } else if (
                claimedSeiChests < 10 &&
                rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId === 1329
              ) {
                setMessage("");
                setDisable(false);
              } else if (
                claimedSeiChests < 10 &&
                // rewardData.length === 0 &&
                address.toLowerCase() === coinbase.toLowerCase() &&
                chainId !== 1329
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
      // setMessage("comingsoon");
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
    claimedMatChests,
    claimedMatPremiumChests,
    claimedSeiChests,
    claimedSeiPremiumChests,
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
            <div className={"chest-test-wrapper h-100"}>
              <div
                className="close-daily-btn d-flex align-items-center justify-content-center"
                onClick={onclose}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/emptyXmark.svg"}
                  width={20}
                  height={20}
                  alt=""
                />
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
                          remaining 10 exclusive to Prime Users.
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
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/warning.svg"
                            }
                            alt=""
                            width={20}
                            height={20}
                          />
                          <span
                            className="db-tooltip-desc"
                            style={{ color: "#F08526" }}
                          >
                            <b>Action Required Sign</b> - Action Needed
                          </span>
                        </div>
                        Some of the rewards opened in the chests might require
                        an action, such as buying a CAWS or Genesis Land NFT, or
                        upgrading to Prime, in order to claim the reward. The
                        deadline for taking the action is 00:30 UTC each day.
                        <br />
                        <br />
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/danger.svg"
                            }
                            alt=""
                            width={20}
                            height={20}
                          />
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
                      src={"https://cdn.worldofdypians.com/wod/infoIcon.svg"}
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
                      : chain === "matchain"
                      ? totalMatPoints
                      : chain === "sei"
                      ? totalSeiPoints
                      : totalSkalePoints,
                    0
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex mb-0">
                  Points
                </span>
                <h6 className="new-total-points  mb-0">
                  {getFormattedNumber(
                    chain === "bnb"
                      ? totalStars
                      : chain === "core"
                      ? totalCoreStars
                      : chain === "viction"
                      ? totalVictionStars
                      : chain === "manta"
                      ? totalMantaStars
                      : chain === "base"
                      ? totalBaseStars
                      : chain === "taiko"
                      ? totalTaikoStars
                      : chain === "matchain"
                      ? totalMatStars
                      : chain === "sei"
                      ? totalSeiStars
                      : totalSkaleStars,
                    0
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex mb-0">
                  Stars
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
                      : chain === "matchain"
                      ? totalMatUsd
                      : chain === "sei"
                      ? totalSeiUsd
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
                  className="row daily-bonus-row p-3
               gap-lg-0 mx-3 mx-lg-2 mt-3 mt-lg-3"
                  style={{ height: "100%", marginTop: "64px" }}
                >
                  <div className="col-12 col-lg-5 chains-wrapper mt-5 mt-lg-0 d-flex align-items-center">
                    {windowSize.width && windowSize.width > 992 ? (
                      <div
                        className=" h-100 chains-container-2 w-100"
                        style={{ gap: "8px" }}
                      >
                        <div
                          className={`position-relative chain-item ${
                            visibleChain === "matchain" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/comingSoon.png"
                            }
                            className={`chain-img-2 ${
                              visibleChain === "matchain" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              visibleChain === "matchain" &&
                              "chain-title-wrapper-active"
                            }  d-flex flex-lg-column align-items-start justify-content-between`}
                            onClick={() => {
                              setChain("matchain");
                              setVisibleChain("matchain");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                              handleMatPool();
                            }}
                          >
                            {/* <h6 className="chain-title-position mb-0">
                              BNB CHAIN
                            </h6> */}
                            <div
                              className={`d-flex align-items-center justify-content-between w-100 ${
                                visibleChain === "matchain"
                                  ? "daily-bonus-chain-name-holder-active"
                                  : "daily-bonus-chain-name-holder"
                              } p-2`}
                            >
                              <h6 className="daily-bonus-chain-name mb-0">
                                MATCHAIN
                              </h6>
                              <div className="d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center">
                                  <img
                                    className="percent-img"
                                    src={
                                      matPercentage >= 20
                                        ? "https://cdn.worldofdypians.com/wod/percentageFilled.svg"
                                        : "https://cdn.worldofdypians.com/wod/percentageEmpty.svg"
                                    }
                                    height={8}
                                    alt=""
                                  />
                                  <img
                                    className="percent-img"
                                    src={
                                      matPercentage >= 40
                                        ? "https://cdn.worldofdypians.com/wod/percentageFilled.svg"
                                        : "https://cdn.worldofdypians.com/wod/percentageEmpty.svg"
                                    }
                                    height={8}
                                    alt=""
                                  />
                                  <img
                                    className="percent-img"
                                    src={
                                      matPercentage >= 60
                                        ? "https://cdn.worldofdypians.com/wod/percentageFilled.svg"
                                        : "https://cdn.worldofdypians.com/wod/percentageEmpty.svg"
                                    }
                                    height={8}
                                    alt=""
                                  />
                                  <img
                                    className="percent-img"
                                    src={
                                      matPercentage >= 80
                                        ? "https://cdn.worldofdypians.com/wod/percentageFilled.svg"
                                        : "https://cdn.worldofdypians.com/wod/percentageEmpty.svg"
                                    }
                                    height={8}
                                    alt=""
                                  />
                                  <img
                                    className="percent-img"
                                    src={
                                      matPercentage === 100
                                        ? "https://cdn.worldofdypians.com/wod/percentageFilled.svg"
                                        : "https://cdn.worldofdypians.com/wod/percentageEmpty.svg"
                                    }
                                    height={8}
                                    alt=""
                                  />
                                </div>
                                <span className="percentage-span">
                                  {parseInt(matPercentage)}%
                                </span>
                              </div>
                            </div>
                            <button
                              className={` ${
                                chainId === 698
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center m-2`}
                              onClick={handleMatPool}
                            >
                              {" "}
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                }
                                alt=""
                                style={{ width: 20, height: 20 }}
                              />{" "}
                              Matchain
                            </button>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item w-100`}
                          style={{ pointerEvents: "none" }}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/comingSoon3.png"
                            }
                            className={`chain-img-2`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper p-2 d-flex align-items-center flex-lg-column justify-content-center`}
                          >
                            {/* <div className="d-flex align-items-center gap-2">
                              <span className="percentage-span">
                                Coming Soon
                              </span>
                            </div> */}
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item w-100`}
                          style={{ pointerEvents: "none" }}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/comingSoon2.png"
                            }
                            className={`chain-img-2`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper p-2 d-flex align-items-center flex-lg-column justify-content-center`}
                          >
                            {/* <div className="d-flex align-items-center gap-2">
                              <span className="percentage-span">
                                Coming Soon
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ) : windowSize.width && windowSize.width <= 992 ? (
                      <Slider {...settings}>
                        <div
                          className={`position-relative chain-item ${
                            visibleChain === "matchain" && "chain-item-active"
                          } w-auto`}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/comingSoon.png"
                            }
                            className={`chain-img-2 ${
                              visibleChain === "matchain" && "chain-img-active"
                            }`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              visibleChain === "matchain" &&
                              "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center flex-lg-column justify-content-between`}
                            onClick={() => {
                              setChain("matchain");
                              setVisibleChain("matchain");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                              handleMatPool();
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
                                  chainId === 698
                                    ? "new-chain-active-btn"
                                    : "new-chain-inactive-btn"
                                } d-flex gap-1 align-items-center`}
                                onClick={handleMatPool}
                              >
                                {" "}
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                  }
                                  alt=""
                                  style={{ width: 20, height: 20 }}
                                />{" "}
                                Matchain
                              </button>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-12 col-lg-7 px-0 grid-overall-wrapper">
                    <div className="grid-scroll h-100">
                      <div className="new-chests-grid">
                        {chain === "bnb"
                          ? allChests && allChests.length > 0
                            ? allChests.map((item, index) => (
                                <NewChestItem
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                          : chain === "matchain"
                          ? allMatChests && allMatChests.length > 0
                            ? allMatChests.map((item, index) => (
                                <NewChestItem
                                  walletClient={walletClient}
                                  publicClient={publicClient}
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={matImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onMatChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataMat(value, value2);
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={matImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onMatChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataMat(value, value2);
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
                          : chain === "sei"
                          ? allSeiChests && allSeiChests.length > 0
                            ? allSeiChests.map((item, index) => (
                                <NewChestItem
                                  walletClient={walletClient}
                                  publicClient={publicClient}
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  image={seiImages[index]}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onSeiChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataSei(value, value2);
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
                                  coinbase={coinbase}
                                  claimingChest={claimingChest}
                                  setClaimingChest={setClaimingChest}
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  image={seiImages[index]}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onSeiChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardDataSei(value, value2);
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                  walletClient={walletClient}
                                  publicClient={publicClient}
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
                                walletClient={walletClient}
                                publicClient={publicClient}
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
                                walletClient={walletClient}
                                publicClient={publicClient}
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
                  <div className="col-12 px-0 mt-0 mt-lg-3 message-height-wrapper h-auto">
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

                        {chain === "matchain" ? (
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
                              onClick={handleMatPool}
                            >
                              Matchain
                            </span>
                          </h6>
                        ) : (
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/warning.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                              Prime User.
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
                            src={
                              "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                            }
                            style={{ width: 70, height: 70 }}
                            alt=""
                          />
                          <NavLink
                            className="get-premium-btn px-2 py-1 mb-2 mb-lg-0"
                            to={"/account/prime"}
                          >
                            Get Prime
                          </NavLink>
                        </div>
                      </div>
                    ) : message === "caws" ? (
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/warning.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
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
                          src={
                            "https://cdn.worldofdypians.com/wod/winConfetti.png"
                          }
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "wonPoints" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
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
                          src={
                            "https://cdn.worldofdypians.com/wod/winConfetti.png"
                          }
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "wonPointsStars" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-2 w-100 chest-progress-wrapper">
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

                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Stars";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">Stars</span>
                          </div>
                        </div>

                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/winConfetti.png"
                          }
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "premium" ? (
                      <div
                        className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper"
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
                            Become Prime
                          </h6>
                          <span className="chain-desc mb-0">
                            Enjoy extra benefits and unlock more chests for
                            extra rewards by upgrading to Prime.
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between get-premium-wrapper p-3 p-lg-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                            }
                            style={{ width: 60, height: 60 }}
                            alt=""
                          />
                          <NavLink
                            className="get-premium-btn px-2 py-1 mb-2 mb-lg-0"
                            to={"/account/prime"}
                          >
                            Get Prime
                          </NavLink>
                        </div>
                      </div>
                    ) : message === "login" ? (
                      <div
                        className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper"
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
                        <div className="d-flex align-items-center justify-content-end get-premium-wrapper">
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
                    ) : message === "connect" ? (
                      <div
                        className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper"
                        style={{
                          border: "1px solid #8262D0",
                          background:
                            "linear-gradient(180deg, #8262D0 0%, #482293 100%)",
                        }}
                      >
                        <div
                          className="chain-desc-wrapper w-100 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6
                            className="desc-title mb-0"
                            style={{ color: "#fff" }}
                          >
                            Connect wallet
                          </h6>
                          <span className="chain-desc mb-0">
                            Connect wallet in order to access Daily Bonus and
                            earn tailored rewards!
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-end get-premium-wrapper">
                          <button
                            className="sign-in-btn px-4 py-1"
                            onClick={() => {
                              onConnectWallet();
                            }}
                          >
                            Connect Wallet
                          </button>
                        </div>
                      </div>
                    ) : message === "winDanger" ? (
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                                      src={
                                        item.holder
                                          ? "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                          : "https://cdn.worldofdypians.com/wod/redX.svg"
                                      }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Stars";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">Stars</span>
                          </div>
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
                                          ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                          : item.type === "CAWS"
                                          ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                          : item.type === "LAND"
                                          ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                          : "https://cdn.worldofdypians.com/wod/dypius.svg"
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                      }
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
                                            ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                            : item.type === "CAWS"
                                            ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                            : item.type === "LAND"
                                            ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                            : "https://cdn.worldofdypians.com/wod/dypius.svg"
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
                                        src={
                                          "https://cdn.worldofdypians.com/wod/redX.svg"
                                        }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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

                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Stars";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">Stars</span>
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
                                          ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                          : item.type === "CAWS"
                                          ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                          : item.type === "LAND"
                                          ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                          : "https://cdn.worldofdypians.com/wod/dypius.svg"
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                      }
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
                                            ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                            : item.type === "CAWS"
                                            ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                            : item.type === "LAND"
                                            ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                            : "https://cdn.worldofdypians.com/wod/dypius.svg"
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
                                        src={
                                          "https://cdn.worldofdypians.com/wod/redX.svg"
                                        }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                                          ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                          : item.type === "CAWS"
                                          ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                          : item.type === "LAND"
                                          ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                          : "https://cdn.worldofdypians.com/wod/dypius.svg"
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                      }
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
                                            ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                            : item.type === "CAWS"
                                            ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                            : item.type === "LAND"
                                            ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                            : "https://cdn.worldofdypians.com/wod/dypius.svg"
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
                                        src={
                                          "https://cdn.worldofdypians.com/wod/redX.svg"
                                        }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                                          ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                          : item.type === "CAWS"
                                          ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                          : item.type === "LAND"
                                          ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                          : "https://cdn.worldofdypians.com/wod/dypius.svg"
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                      }
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
                                            ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                            : item.type === "CAWS"
                                            ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                            : item.type === "LAND"
                                            ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                            : "https://cdn.worldofdypians.com/wod/dypius.svg"
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
                                        src={
                                          "https://cdn.worldofdypians.com/wod/redX.svg"
                                        }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/danger.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                                          ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                          : item.type === "CAWS"
                                          ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                          : item.type === "LAND"
                                          ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                          : "https://cdn.worldofdypians.com/wod/dypius.svg"
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/greenCheck.svg"
                                      }
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
                                            ? "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                                            : item.type === "CAWS"
                                            ? "https://cdn.worldofdypians.com/wod/cawsRound.png"
                                            : item.type === "LAND"
                                            ? "https://cdn.worldofdypians.com/wod/wodRound.png"
                                            : "https://cdn.worldofdypians.com/wod/dypius.svg"
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
                                        src={
                                          "https://cdn.worldofdypians.com/wod/redX.svg"
                                        }
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
                      <div className="d-flex align-items-center justify-content-between p-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/warning.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                            />
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
                                  Number(obj.reward) <= item.max &&
                                  item.title === obj.rewardType
                                );
                              }) &&
                              message != "needPremium") ||
                            (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType === "Stars" &&
                                  obj.rewardType === item.title
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
                        src={`https://cdn.worldofdypians.com/wod/${item.img}${
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
                                    Number(obj.reward) <= item.max &&
                                    item.title === obj.rewardType
                                  );
                                }) &&
                                message != "needPremium") ||
                              (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Stars" &&
                                    obj.rewardType === item.title
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
                        }Icon.png`}
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
                            src={
                              "https://cdn.worldofdypians.com/wod/warning.svg"
                            }
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
                            src={
                              "https://cdn.worldofdypians.com/wod/danger.svg"
                            }
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
                          src={"https://cdn.worldofdypians.com/wod/warning.svg"}
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
                          src={"https://cdn.worldofdypians.com/wod/danger.svg"}
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
                              : rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Stars" &&
                                    obj.rewardType === item.title
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
              //               src={'https://cdn.worldofdypians.com/wod/warning.svg'}
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
              //               src={'https://cdn.worldofdypians.com/wod/danger.svg'}
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
              //             src={'https://cdn.worldofdypians.com/wod/warning.svg'}
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
              //             src={'https://cdn.worldofdypians.com/wod/danger.svg'}
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
            onMatChestClaimed();
            onBaseChestClaimed();
            setcountListedNfts(countListedNfts);
            // setBuyNftPopup(false);
            const timer = setTimeout(() => {
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
                : chain === "matchain"
                ? showSingleRewardDataMat(rewardData.chestId, isActiveIndex - 1)
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
                : chain === "sei"
                ? showSingleRewardDataSei(rewardData.chestId, isActiveIndex - 1)
                : showSingleRewardDataSkale(
                    rewardData.chestId,
                    isActiveIndex - 1
                  );
            }, 2000);
            return () => clearTimeout(timer);
          }}
        />
      )}
    </>
  );
};

export default MatchainDailyBonus;
