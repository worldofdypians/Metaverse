/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import NewEvents from "../../../../../components/NewEvents/NewEvents";
import Web3 from "web3";
import { ERC20_ABI } from "../../web3/abis";
import _ from "lodash";
import GlobalLeaderboard from "../../../../../components/LeaderBoard/GlobalLeaderboard";
import WalletModal from "../../../../../components/WalletModal/WalletModal";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import axios from "axios";
import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import OutsideClickHandler from "react-outside-click-handler";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import MyBalance from "../../Components/WalletBalance/MyBalance";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";

import NewLeaderBoard from "../../Components/LeaderBoard/NewLeaderBoard";
import GenesisLeaderboard from "../../Components/LeaderBoard/GenesisLeaderboard";
import NewDailyBonus from "../../../../../components/NewDailyBonus/NewDailyBonus";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ReCaptchaV2 from "react-google-recaptcha";
import GoldenPassPopup from "../../../../../components/PackagePopups/GoldenPassPopup";
import {
  GOLDEN_PASS_ABI,
  golden_pass_address,
} from "../../../../../components/NewEvents/abi";
import EventsPopup from "../../../../../components/MyProfile/EventsPopup";
import { useParams } from "react-router-dom";
import MyProfile from "../../../../../components/MyProfile/MyProfile";
import MyRewardsPopupNew from "../../Components/WalletBalance/MyRewardsPopup2";
import { useLocation, useNavigate } from "react-router-dom";
import Portfolio from "../../Components/WalletBalance/Portfolio";
import Countdown from "react-countdown";
import {
  baseStars,
  bnbStars,
  mantaStars,
  monthlyStarPrizes,
  monthlyExtraStarPrizes,
  skaleStars,
  taikoStars,
  weeklyStarPrizes,
  weeklyExtraStarPrizes,
  seiStars,
  matStars,
} from "./stars";
import GetPremiumPopup from "../../Components/PremiumPopup/GetPremium";
import BnbDailyBonus from "../../../../../components/NewDailyBonus/BnbDailyBonus";
import MatchainDailyBonus from "../../../../../components/NewDailyBonus/MatchainDailyBonus";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#62688F",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#62688F",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#171932",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root, & .MuiOutlinedInput-root:hover": {
    "& fieldset": {
      borderColor: "#62688F",
      fontFamily: "Poppins",
      background: "#171932",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#62688F",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#171932",
      borderRadius: "8px",
    },
  },
});

function Dashboard({
  dailyBonuslistedNFTS,
  account,
  isConnected,
  chainId,
  coinbase,
  handleConnect,
  myCawsWodStakes,
  landStaked,
  ethTokenData,
  dypTokenData,
  onSigninClick,
  onLogoutClick,
  availableTime,
  success,
  handleSwitchNetwork,
  domainName,
  handleOpenDomains,
  dogePrice,
  handleSwitchChain,
  onSubscribeSuccess,
  isPremium,
  dyptokenDatabnb,
  baseEarnUSD,
  logoutCount,
  handleConnectBinance,
  handleConnectionPassport,
  binanceW3WProvider,
  binanceWallet,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  latest20BoughtNFTS,
  monthlyPlayers,
  percent,
  onSuccessDeposit,
  dummyBetaPassData2,
  skaleEarnUsd,
  seiEarnUsd,
  coreEarnUsd,
  victionEarnUsd,
  taikoEarnUsd,
  cookieEarnUsd,
  immutableEarnUsd,
  mantaEarnUsd,
  multiversEarnUsd,
  bnbEarnUsd,
  userActiveEvents,
  onManageLogin,
  authToken,
  matEarnUsd,
  wodBalance,
  wodPrice,
  showSync,
  onCloseSync,
  easy2StakeEarnUsd,
  midleEarnUsd,
  coingeckoEarnUsd,
  chainlinkEarnUsd,
  isTokenExpired,
  listedNFTS,
}) {
  const { email, logout } = useAuth();
  const { eventId } = useParams();
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const allBenefits = [
    {
      title: "Exclusive access to the game",
      image: "https://cdn.worldofdypians.com/wod/exclusiveBg.webp",
    },
    {
      title: "Unlock All Daily Bonus Chests",
      image: "https://cdn.worldofdypians.com/wod/dailyChestsBg.webp",
    },
    {
      title: "Unlimited Treasure Hunts",
      image: "https://cdn.worldofdypians.com/wod/treasureHuntBg.webp",
    },
    {
      title: "Increased Rewards",
      image: "https://cdn.worldofdypians.com/wod/increasedRewardsBg.webp",
    },
    {
      title: "Earn Extra Daily Stars",
      image: "https://cdn.worldofdypians.com/wod/extraDailyStarsBg.webp",
    },
    {
      title: "Access to Private Events",
      image: "https://cdn.worldofdypians.com/wod/privateEventsBg.webp",
    },
    {
      title: "Priority Support",
      image: "https://cdn.worldofdypians.com/wod/prioritySupportBg.webp",
    },
  ];

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const userId = data?.getPlayer?.playerId;
  const username = data?.getPlayer?.displayName;
  const userWallet = data?.getPlayer?.wallet?.publicAddress;

  const chainDropdowns = [
    {
      name: "Ethereum",
      symbol: "eth",
    },
    {
      name: "BNB Chain",
      symbol: "bnb",
    },

    {
      name: "Avalanche",
      symbol: "wavax",
    },
    {
      name: "Conflux",
      symbol: "conflux",
    },
    {
      name: "Base",
      symbol: "base",
    },
    {
      name: "SKALE",
      symbol: "skale",
    },
    {
      name: "CORE",
      symbol: "core",
    },
    {
      name: "Viction",
      symbol: "viction",
    },

    {
      name: "Manta",
      symbol: "manta",
    },

    {
      name: "Taiko",
      symbol: "taiko",
    },
    {
      name: "Matchain",
      symbol: "matchain",
    },
    {
      name: "SEI",
      symbol: "sei",
    },
  ];

  const chestImagesBnb = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const chestImagesSkale = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const chestImagesCore = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const chestImagesSei = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const chestImagesViction = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const chestImagesTaiko = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  const chestImagesBase = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  const chestImagesMat = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const placeholderplayerData = [
    {
      position: "0",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "1",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "2",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "3",
      displayName: "...",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "4",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "5",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "6",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "7",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "8",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "9",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];
  const navigate = useNavigate();

  const [tokensState, setTokensState] = useState({});
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [showChecklistLandNftModal, setshowChecklistLandNftModal] =
    useState(false);
  const firstSlider = useRef();
  const [loading, setLoading] = useState(false);

  const [userRankRewards, setUserRankRewards] = useState(0);
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();
  const [idypBalance, setiDypBalance] = useState();
  const [errors, setErrors] = useState({});
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [showNfts, setShowNfts] = useState(false);
  const [showWalletModal, setshowWalletModal] = useState(false);
  const [goldenPassRemainingTime, setGoldenPassRemainingTime] = useState();
  const [stakes, setStakes] = useState([]);
  const [landstakes, setLandStakes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);
  const [MyNFTSBNB, setMyNFTSBNB] = useState([]);
  const [MyNFTSopBNB, setMyNFTSopBNB] = useState([]);

  const [MyNFTSLandBNB, setMyNFTSLandBNB] = useState([]);
  const [MyNFTSCawsBNB, setMyNFTSCawsBNB] = useState([]);

  const [MyNFTSLandAvax, setMyNFTSLandAvax] = useState([]);
  const [MyNFTSCawsAvax, setMyNFTSCawsAvax] = useState([]);

  const [MyNFTSLandBase, setMyNFTSLandBase] = useState([]);
  const [MyNFTSCawsBase, setMyNFTSCawsBase] = useState([]);

  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setmyGateNfts] = useState([]);
  const [myConfluxNfts, setmyConfluxNfts] = useState([]);
  const [myBaseNfts, setmyBaseNfts] = useState([]);
  const [myDogeNfts, setmyDogeNfts] = useState([]);
  const [myCmcNfts, setmyCmcNfts] = useState([]);
  const [mySkaleNfts, setmySkaleNfts] = useState([]);
  const [myCoreNfts, setmyCoreNfts] = useState([]);
  const [myVictionNfts, setmyVictionNfts] = useState([]);
  const [myMultiversNfts, setmyMultiversNfts] = useState([]);
  const [myImmutableNfts, setmyImmutableNfts] = useState([]);
  const [myMantaNfts, setmyMantaNfts] = useState([]);
  const [myTaikoNfts, setmyTaikoNfts] = useState([]);
  const [myCookieNfts, setmyCookieNfts] = useState([]);
  const [mySeiNfts, setmySeiNfts] = useState([]);

  const [myMatNfts, setmyMatNfts] = useState([]);

  const [latestVersion, setLatestVersion] = useState(0);
  const [playerRank, setPlayerRank] = useState({});
  const [specialRewardsPopup, setSpecialRewardsPopup] = useState(false);
  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [bnbBonusPopup, setBnbBonusPopup] = useState(false);
  const [matBonusPopup, setMatBonusPopup] = useState(false);
  const [MyNFTSCawsOld, setMyNFTSCawsOld] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [openedChests, setOpenedChests] = useState([]);
  const [openedSkaleChests, setOpenedSkaleChests] = useState([]);
  const [openedVictionChests, setOpenedVictionChests] = useState([]);
  const [openedCoreChests, setOpenedCoreChests] = useState([]);
  const [openedSeiChests, setOpenedSeiChests] = useState([]);
  const [openedMantaChests, setOpenedMantaChests] = useState([]);
  const [openedTaikoChests, setOpenedTaikoChests] = useState([]);
  const [openedBaseChests, setOpenedBaseChests] = useState([]);
  const [openedMatChests, setOpenedMatChests] = useState([]);

  const [leaderboard, setLeaderboard] = useState(false);
  const [genesisLeaderboard, setGenesisLeaderboard] = useState(false);
  const [adClicked, setadClicked] = useState("");
  const [goldenPassPopup, setgoldenPassPopup] = useState(false);

  const [globalLeaderboard, setGlobalLeaderboard] = useState(false);
  const [syncStatus, setsyncStatus] = useState("initial");
  const [myOffers, setmyOffers] = useState([]);
  const [allActiveOffers, setallOffers] = useState([]);
  const [showSyncModal, setshowSyncModal] = useState(false);
  const [isonlink, setIsOnLink] = useState(false);
  // const [isPremium, setIsPremium] = useState(false);
  const [myRewardsPopup, setmyRewardsPopup] = useState(false);
  const [getPremiumPopup, setgetPremiumPopup] = useState(false);
  const [balancePopup, setBalancePopup] = useState(false);

  const [dropdownIcon, setdropdownIcon] = useState("");
  const [dropdownTitle, setdropdownTitle] = useState("");
  const [status, setstatus] = useState("");
  const [approveStatus, setapproveStatus] = useState("initial");
  const [isApproved, setisApproved] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [price, setprice] = useState(0);
  const [formattedPrice, setformattedPrice] = useState("0");
  const [loadspinner, setloadspinner] = useState(false);
  const [loadspinnerSub, setloadspinnerSub] = useState(false);
  const [chainDropdown, setChainDropdown] = useState(chainDropdowns[0]);
  const [selectedSubscriptionToken, setselectedSubscriptionToken] = useState(
    Object.keys(window.config.subscription_tokens)[0]
  );
  const [tokenDecimals, settokenDecimals] = useState(1);
  const [dummypremiumChests, setDummyPremiumChests] = useState([]);

  const [claimedChests, setclaimedChests] = useState(0);
  const [claimedPremiumChests, setclaimedPremiumChests] = useState(0);

  const [claimedSkaleChests, setclaimedSkaleChests] = useState(0);
  const [claimedSkalePremiumChests, setclaimedSkalePremiumChests] = useState(0);

  const [claimedCoreChests, setclaimedCoreChests] = useState(0);
  const [claimedCorePremiumChests, setclaimedCorePremiumChests] = useState(0);

  const [claimedBaseChests, setclaimedBaseChests] = useState(0);
  const [claimedBasePremiumChests, setclaimedBasePremiumChests] = useState(0);

  const [claimedVictionChests, setclaimedVictionChests] = useState(0);
  const [claimedSeiChests, setclaimedSeiChests] = useState(0);
  const [claimedMantaChests, setclaimedMantaChests] = useState(0);
  const [claimedTaikoChests, setclaimedTaikoChests] = useState(0);
  const [claimedMatChests, setclaimedMatChests] = useState(0);

  const [claimedVictionPremiumChests, setclaimedVictionPremiumChests] =
    useState(0);
  const [claimedSeiPremiumChests, setclaimedSeiPremiumChests] = useState(0);
  const [claimedMantaPremiumChests, setclaimedMantaPremiumChests] = useState(0);
  const [claimedTaikoPremiumChests, setclaimedTaikoPremiumChests] = useState(0);
  const [claimedMatPremiumChests, setclaimedMatPremiumChests] = useState(0);

  const [userSocialRewards, setuserSocialRewards] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);

  const [canBuy, setCanBuy] = useState(false);

  const [allChests, setallChests] = useState([]);
  const [allSkaleChests, setallSkaleChests] = useState([]);
  const [allCoreChests, setallCoreChests] = useState([]);
  const [allVictionChests, setallVictionChests] = useState([]);
  const [allTaikoChests, setallTaikoChests] = useState([]);
  const [allSeiChests, setallSeiChests] = useState([]);
  const [allMantaChests, setallMantaChests] = useState([]);
  const [allBaseChests, setallBaseChests] = useState([]);
  const [allMatChests, setallMatChests] = useState([]);

  const [countdown, setcountdown] = useState();
  const [countdown3500, setcountdown3500] = useState();

  const [userDailyBundles, setuserDailyBundles] = useState([]);

  const [count, setCount] = useState(0);
  const [skalecount, setskalecount] = useState(0);
  const [vicitoncount, setvicitoncount] = useState(0);
  const [corecount, setcorecount] = useState(0);
  const [mantacount, setmantacount] = useState(0);
  const [taikocount, settaikocount] = useState(0);
  const [basecount, setbasecount] = useState(0);
  const [matcount, setmatcount] = useState(0);
  const [seicount, setseicount] = useState(0);

  const [rankData, setRankData] = useState({});
  const [userRank, setUserRank] = useState("");
  const [userRank2, setUserRank2] = useState("");
  const [userBnbScore, setUserBnbScore] = useState(0);
  const [genesisRank2, setGenesisRank2] = useState("");
  const [premiumTxHash, setPremiumTxHash] = useState("");
  const [selectedChainforPremium, setselectedChainforPremium] = useState("");
  const [cawsPremiumRewards, setcawsPremiumRewards] = useState(0);
  const [landPremiumRewards, setlandPremiumRewards] = useState(0);

  const [portfolio, setPortfolio] = useState(false);

  const [bnbImages, setBnbImages] = useState(shuffle(chestImagesBnb));
  const [skaleImages, setSkaleImages] = useState(shuffle(chestImagesSkale));
  const [coreImages, setCoreImages] = useState(shuffle(chestImagesCore));
  const [victionImages, setVictionImages] = useState(
    shuffle(chestImagesViction)
  );
  const [taikoImages, setTaikoImages] = useState(shuffle(chestImagesTaiko));
  const [mantaImages, setMantaImages] = useState(shuffle(chestImagesViction));
  const [baseImages, setBaseImages] = useState(shuffle(chestImagesBase));
  const [matImages, setMatImages] = useState(shuffle(chestImagesMat));

  const [seiImages, setSeiImages] = useState(shuffle(chestImagesSei));

  const [mediaUrl, setMediaUrl] = useState("");
  const [userSocialRewardsCached, setuserSocialRewardsCached] = useState(0);
  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [nftPremium_tokenId, setnftPremium_tokenId] = useState(0);
  const [nftPremium_total, setnftPremium_total] = useState(0);
  const [nftDiscountObject, setnftDiscountObject] = useState([]);
  const [selectedEvent, setselectedEvent] = useState([]);
  const [showEventPopup, setshowEventPopup] = useState(false);

  const [userRankName, setUserRankName] = useState({
    name: "starter",
    id: 0,
  });
  const [userProgress, setUserProgress] = useState(0);

  const [discountPercentageViction, setdiscountPercentageViction] = useState(0);
  const [nftPremium_tokenIdViction, setnftPremium_tokenIdViction] = useState(0);
  const [nftPremium_totalViction, setnftPremium_totalViction] = useState(0);
  const [nftDiscountObjectViction, setnftDiscountObjectViction] = useState([]);

  const [discountPercentageTaiko, setdiscountPercentageTaiko] = useState(0);
  const [nftPremium_tokenIdTaiko, setnftPremium_tokenIdTaiko] = useState(0);
  const [nftPremium_totalTaiko, setnftPremium_totalTaiko] = useState(0);
  const [nftDiscountObjectTaiko, setnftDiscountObjectTaiko] = useState([]);

  const [discountPercentageMat, setdiscountPercentageMat] = useState(0);
  const [nftPremium_tokenIdMat, setnftPremium_tokenIdMat] = useState(0);
  const [nftPremium_totalMat, setnftPremium_totalMat] = useState(0);
  const [nftDiscountObjectMat, setnftDiscountObjectMat] = useState([]);

  const [leaderboardBtn, setleaderboardBtn] = useState("weekly");

  const sliderRef = useRef(null);

  const recaptchaRef = useRef(null);
  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");
  const leaderboardId = document.querySelector("#leaderboard");
  const { BigNumber } = window;
  const now = new Date();
  const isAfterNovember2nd = now.getUTCMonth() === 10 && now.getUTCDate() >= 2; // November is month 10 (0-indexed)

  const fetchUsersocialRewards = () => {
    const cachedUserSocialRewards = localStorage.getItem(
      "cacheduserSocialRewards"
    );

    if (cachedUserSocialRewards) {
      setuserSocialRewardsCached(cachedUserSocialRewards);
    }
  };
  const validateUrl = (url) => {
    let errors = {};
    let regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let match = url.match(regex);

    if (!match) {
      errors.url = "URL is not valid";
    }

    return errors;
  };
  const handleClosePopup = () => {
    navigate("/account");
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    setErrors(validateUrl(mediaUrl));
    const captchaToken = await recaptchaRef.current.executeAsync();
    if (Object.keys(validateUrl(mediaUrl)).length === 0) {
      const data = {
        email: email,
        url: mediaUrl,
        walletAddress: coinbase,
        username: username,
        recaptcha: captchaToken,
      };

      if (email !== "" && mediaUrl !== "" && coinbase !== "") {
        const send = await axios
          .post("https://api.worldofdypians.com/api/submissions", data, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then(function (result) {
            console.log(result.data);
            setSpecialRewardsSuccess("Email sent successfully");
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }

    setLoading(false);
  };

  //leaderboard calls

  const bnbStarsPremium = [
    "50",
    "40",
    "30",
    "20",
    "20",
    "20",
    "20",
    "20",
    "20",
    "20",
  ];
  const weeklyPrizesBnb = ["30", "20", "10", "5", "5", "5", "5", "5", "5", "5"];
  const weeklyPrizesGolden = [
    "40",
    "30",
    "20",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
  ];
  const monthlyPrizesBnb = [
    "200",
    "100",
    "60",
    "30",
    "30",
    "10",
    "10",
    "10",
    "10",
    "10",
  ];
  const monthlyPrizesGolden = [
    "300",
    "200",
    "140",
    "70",
    "70",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];

  const skaleStarsPremium = [
    "70",
    "60",
    "50",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
  ];
  const skalePrizesWeekly = [
    "15",
    "10",
    "5",
    "4",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
  ];
  const skalePrizesWeeklyGolden = [
    "25",
    "20",
    "15",
    "12",
    "8",
    "8",
    "8",
    "8",
    "8",
    "8",
  ];
  const skalePrizesMonthly = [
    "60",
    "30",
    "20",
    "10",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];
  const skalePrizesMonthlyGolden = [
    "140",
    "70",
    "30",
    "20",
    "15",
    "15",
    "15",
    "15",
    "15",
    "15",
  ];

  const updatedSkalePrizesWeekly = [
    "10",
    "10",
    "5",
    "4",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
  ];
  const updatedSkalePrizesWeeklyGolden = [
    "20",
    "10",
    "10",
    "10",
    "3",
    "3",
    "3",
    "3",
    "3",
    "3",
  ];
  const updatedSkalePrizesMonthly = [
    "30",
    "20",
    "15",
    "10",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];
  const updatedSkalePrizesMonthlyGolden = [
    "80",
    "40",
    "20",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
  ];

  const genesisPrizes = [
    "100",
    "100",
    "80",
    "80",
    "80",
    "60",
    "50",
    "40",
    "20",
    "20",
  ];

  const starPrizesGolden = [400, 200, 140, 70, 30, 30, 30, 30, 30, 30];

  const dataFetchedRef = useRef(false);

  const [primeStars, setprimeStars] = useState(false);

  const [allBnbData, setAllBnbData] = useState([]);
  const [allSkaleData, setAllSkaleData] = useState([]);
  const [allCoreData, setAllCoreData] = useState([]);
  const [allVictionData, setAllVictionData] = useState([]);
  const [allMantaData, setAllMantaData] = useState([]);
  const [allTaikoData, setAllTaikoData] = useState([]);
  const [allBaseData, setAllBaseData] = useState([]);
  const [allMatData, setAllMatData] = useState([]);
  const [allSeiData, setAllSeiData] = useState([]);

  const [dailyRecordsCore, setDailyRecordsCore] = useState([]);
  const [weeklyRecordsCore, setWeeklyRecordsCore] = useState([]);
  const [monthlyRecordsCore, setMonthlyRecordsCore] = useState([]);
  const [activePlayerCore, setActivePlayerCore] = useState(false);
  const [activePlayerCoreWeekly, setActivePlayerCoreWeekly] = useState(false);
  const [activePlayerCoreMonthly, setActivePlayerCoreMonthly] = useState(false);
  const [userDataCore, setUserDataCore] = useState({});
  const [userDataCoreWeekly, setUserDataCoreWeekly] = useState({});
  const [userDataCoreMonthly, setUserDataCoreMonthly] = useState({});
  const [prevDataCore, setPrevDataCore] = useState([]);
  const [prevDataCoreWeekly, setPrevDataCoreWeekly] = useState([]);
  const [prevDataCoreMonthly, setPrevDataCoreMonthly] = useState([]);
  const [dailyDataAmountCore, setDailyDataAmountCore] = useState([]);
  const [weeklyDataAmountCore, setWeeklyDataAmountCore] = useState([]);
  const [monthlyDataAmountCore, setMonthlyDataAmountCore] = useState([]);
  const [userRankCore, setUserRankCore] = useState("");
  const [userCoreScore, setUserCoreScore] = useState(0);

  const [dailyRecordsSkale, setDailyRecordsSkale] = useState([]);
  const [weeklyRecordsSkale, setWeeklyRecordsSkale] = useState([]);
  const [monthlyRecordsSkale, setMonthlyRecordsSkale] = useState([]);
  const [activePlayerSkale, setActivePlayerSkale] = useState(false);
  const [activePlayerSkaleWeekly, setActivePlayerSkaleWeekly] = useState(false);
  const [activePlayerSkaleMonthly, setActivePlayerSkaleMonthly] =
    useState(false);
  const [userDataSkale, setUserDataSkale] = useState({});
  const [userDataSkaleWeekly, setUserDataSkaleWeekly] = useState({});
  const [userDataSkaleMonthly, setUserDataSkaleMonthly] = useState({});
  const [prevDataSkale, setPrevDataSkale] = useState([]);
  const [prevDataSkaleWeekly, setPrevDataSkaleWeekly] = useState([]);
  const [prevDataSkaleMonthly, setPrevDataSkaleMonthly] = useState([]);
  const [dailyDataAmountSkale, setDailyDataAmountSkale] = useState([]);
  const [weeklyDataAmountSkale, setWeeklyDataAmountSkale] = useState([]);
  const [monthlyDataAmountSkale, setMonthlyDataAmountSkale] = useState([]);
  const [userRankSkale, setUserRankSkale] = useState("");
  const [userSkaleScore, setUserSkaleScore] = useState(0);
  const [eventCardCount, seteventCardCount] = useState(0);
  const [explorerHuntData, setexplorerHuntData] = useState([]);
  const [greatCollectionData, setgreatCollectionData] = useState([]);

  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);
  const [starRecordsWeekly, setStarRecordsWeekly] = useState([]);
  const [activePlayerStar, setActivePlayerStar] = useState([]);
  const [activePlayerStarWeekly, setActivePlayerStarWeekly] = useState([]);
  const [userDataStar, setUserDataStar] = useState({});
  const [userDataStarWeekly, setUserDataStarWeekly] = useState({});
  const [prevDataStar, setPrevDataStar] = useState([]);
  const [prevDataStarWeekly, setPrevDataStarWeekly] = useState([]);
  const [dataAmountStar, setDataAmountStar] = useState([]);
  const [dataAmountStarWeekly, setDataAmountStarWeekly] = useState([]);
  const [userCollectedStars, setuserCollectedStars] = useState(0);
  const [userCollectedStarsWeekly, setuserCollectedStarsWeekly] = useState(0);

  const [dailyRecordsViction, setDailyRecordsViction] = useState([]);
  const [weeklyRecordsViction, setWeeklyRecordsViction] = useState([]);
  const [monthlyRecordsViction, setMonthlyRecordsViction] = useState([]);
  const [activePlayerViction, setActivePlayerViction] = useState(false);
  const [activePlayerVictionWeekly, setActivePlayerVictionWeekly] =
    useState(false);
  const [activePlayerVictionMonthly, setActivePlayerVictionMonthly] =
    useState(false);
  const [userDataViction, setUserDataViction] = useState({});
  const [userDataVictionWeekly, setUserDataVictionWeekly] = useState({});
  const [userDataVictionMonthly, setUserDataVictionMonthly] = useState({});
  const [prevDataViction, setPrevDataViction] = useState([]);
  const [prevDataVictionWeekly, setPrevDataVictionWeekly] = useState([]);
  const [prevDataVictionMonthly, setPrevDataVictionMonthly] = useState([]);
  const [dailyDataAmountViction, setDailyDataAmountViction] = useState([]);
  const [weeklyDataAmountViction, setWeeklyDataAmountViction] = useState([]);
  const [monthlyDataAmountViction, setMonthlyDataAmountViction] = useState([]);
  const [userRankViction, setUserRankViction] = useState("");
  const [userVictionScore, setUserVictionScore] = useState(0);

  const [dailyRecordsManta, setDailyRecordsManta] = useState([]);
  const [weeklyRecordsManta, setWeeklyRecordsManta] = useState([]);
  const [monthlyRecordsManta, setMonthlyRecordsManta] = useState([]);
  const [activePlayerManta, setActivePlayerManta] = useState(false);
  const [activePlayerMantaWeekly, setActivePlayerMantaWeekly] = useState(false);
  const [activePlayerMantaMonthly, setActivePlayerMantaMonthly] =
    useState(false);
  const [userDataManta, setUserDataManta] = useState({});
  const [userDataMantaWeekly, setUserDataMantaWeekly] = useState({});
  const [userDataMantaMonthly, setUserDataMantaMonthly] = useState({});
  const [prevDataManta, setPrevDataManta] = useState([]);
  const [prevDataMantaWeekly, setPrevDataMantaWeekly] = useState([]);
  const [prevDataMantaMonthly, setPrevDataMantaMonthly] = useState([]);
  const [dailyDataAmountManta, setDailyDataAmountManta] = useState([]);
  const [weeklyDataAmountManta, setWeeklyDataAmountManta] = useState([]);
  const [monthlyDataAmountManta, setMonthlyDataAmountManta] = useState([]);
  const [userRankManta, setUserRankManta] = useState("");
  const [userMantaScore, setUserMantaScore] = useState(0);

  const [dailyRecordsSei, setDailyRecordsSei] = useState([]);
  const [weeklyRecordsSei, setWeeklyRecordsSei] = useState([]);
  const [monthlyRecordsSei, setMonthlyRecordsSei] = useState([]);
  const [activePlayerSei, setActivePlayerSei] = useState(false);
  const [activePlayerSeiWeekly, setActivePlayerSeiWeekly] = useState(false);
  const [activePlayerSeiMonthly, setActivePlayerSeiMonthly] = useState(false);
  const [userDataSei, setUserDataSei] = useState({});
  const [userDataSeiWeekly, setUserDataSeiWeekly] = useState({});
  const [userDataSeiMonthly, setUserDataSeiMonthly] = useState({});
  const [prevDataSei, setPrevDataSei] = useState([]);
  const [prevDataSeiWeekly, setPrevDataSeiWeekly] = useState([]);
  const [prevDataSeiMonthly, setPrevDataSeiMonthly] = useState([]);
  const [dailyDataAmountSei, setDailyDataAmountSei] = useState([]);
  const [weeklyDataAmountSei, setWeeklyDataAmountSei] = useState([]);
  const [monthlyDataAmountSei, setMonthlyDataAmountSei] = useState([]);
  const [userRankSei, setUserRankSei] = useState("");
  const [userSeiScore, setUserSeiScore] = useState(0);

  const [dailyRecordsBase, setDailyRecordsBase] = useState([]);
  const [weeklyRecordsBase, setWeeklyRecordsBase] = useState([]);
  const [monthlyRecordsBase, setMonthlyRecordsBase] = useState([]);
  const [activePlayerBase, setActivePlayerBase] = useState(false);
  const [activePlayerBaseWeekly, setActivePlayerBaseWeekly] = useState(false);
  const [activePlayerBaseMonthly, setActivePlayerBaseMonthly] = useState(false);
  const [userDataBase, setUserDataBase] = useState({});
  const [userDataBaseWeekly, setUserDataBaseWeekly] = useState({});
  const [userDataBaseMonthly, setUserDataBaseMonthly] = useState({});
  const [prevDataBase, setPrevDataBase] = useState([]);
  const [prevDataBaseWeekly, setPrevDataBaseWeekly] = useState([]);
  const [prevDataBaseMonthly, setPrevDataBaseMonthly] = useState([]);
  const [dailyDataAmountBase, setDailyDataAmountBase] = useState([]);
  const [weeklyDataAmountBase, setWeeklyDataAmountBase] = useState([]);
  const [monthlyDataAmountBase, setMonthlyDataAmountBase] = useState([]);
  const [userRankBase, setUserRankBase] = useState("");
  const [userBaseScore, setUserBaseScore] = useState(0);

  const [dailyRecordsTaiko, setDailyRecordsTaiko] = useState([]);
  const [weeklyRecordsTaiko, setWeeklyRecordsTaiko] = useState([]);
  const [monthlyRecordsTaiko, setMonthlyRecordsTaiko] = useState([]);
  const [activePlayerTaiko, setActivePlayerTaiko] = useState(false);
  const [activePlayerTaikoWeekly, setActivePlayerTaikoWeekly] = useState(false);
  const [activePlayerTaikoMonthly, setActivePlayerTaikoMonthly] =
    useState(false);
  const [userDataTaiko, setUserDataTaiko] = useState({});
  const [userDataTaikoWeekly, setUserDataTaikoWeekly] = useState({});
  const [userDataTaikoMonthly, setUserDataTaikoMonthly] = useState({});
  const [prevDataTaiko, setPrevDataTaiko] = useState([]);
  const [prevDataTaikoWeekly, setPrevDataTaikoWeekly] = useState([]);
  const [prevDataTaikoMonthly, setPrevDataTaikoMonthly] = useState([]);
  const [dailyDataAmountTaiko, setDailyDataAmountTaiko] = useState([]);
  const [weeklyDataAmountTaiko, setWeeklyDataAmountTaiko] = useState([]);
  const [monthlyDataAmountTaiko, setMonthlyDataAmountTaiko] = useState([]);
  const [userRankTaiko, setUserRankTaiko] = useState("");
  const [userTaikoScore, setUserTaikoScore] = useState(0);

  const [dailyRecordsMat, setDailyRecordsMat] = useState([]);
  const [weeklyRecordsMat, setWeeklyRecordsMat] = useState([]);
  const [monthlyRecordsMat, setMonthlyRecordsMat] = useState([]);
  const [activePlayerMat, setActivePlayerMat] = useState(false);
  const [activePlayerMatWeekly, setActivePlayerMatWeekly] = useState(false);
  const [activePlayerMatMonthly, setActivePlayerMatMonthly] = useState(false);
  const [userDataMat, setUserDataMat] = useState({});
  const [userDataMatWeekly, setUserDataMatWeekly] = useState({});
  const [userDataMatMonthly, setUserDataMatMonthly] = useState({});
  const [prevDataMat, setPrevDataMat] = useState([]);
  const [prevDataMatWeekly, setPrevDataMatWeekly] = useState([]);
  const [prevDataMatMonthly, setPrevDataMatMonthly] = useState([]);
  const [dailyDataAmountMat, setDailyDataAmountMat] = useState([]);
  const [weeklyDataAmountMat, setWeeklyDataAmountMat] = useState([]);
  const [monthlyDataAmountMat, setMonthlyDataAmountMat] = useState([]);
  const [userRankMat, setUserRankMat] = useState("");
  const [userMatScore, setUserMatScore] = useState(0);

  const [dailyrecords, setRecords] = useState([]);
  const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [activePlayer, setActivePlayer] = useState(false);
  const [activePlayerWeekly, setActivePlayerWeekly] = useState(false);
  const [activePlayerMonthly, setActivePlayerMonthly] = useState(false);
  const [activePlayerGenesis, setActivePlayerGenesis] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataWeekly, setUserDataWeekly] = useState({});
  const [userDataMonthly, setUserDataMonthly] = useState({});
  const [userDataGenesis, setUserDataGenesis] = useState({});
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [dailyplayerDataAmount, setdailyplayerDataAmount] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [weeklyplayerDataAmount, setweeklyplayerDataAmount] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);
  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);
  const [weeklyrecords, setWeeklyRecords] = useState([]);
  const [monthlyrecords, setMonthlyRecords] = useState([]);
  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);
  const [specialRewardsSuccess, setSpecialRewardsSuccess] = useState(false);
  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);
  const [beastSiegeStatus, setBeastSiegeStatus] = useState({
    dragon: false,
    bear: false,
    beast: false,
    eagle: false,
    scorpion: false,
    cyclops: false,
    puzzleMadness: false,
  });
  const [puzzleMadnessTimer, setPuzzleMadnessTimer] = useState(0);

  const fillRecords = (itemData) => {
    if (itemData.length === 0) {
      setRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setRecords(finalData);
    }
  };
  // const fillRecordsWeekly = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecords(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecords(finalData);
  //   }
  // };
  const fillRecordsMonthly = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecords(finalData);
    }
  };
  const fillRecordsCore = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsCore(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsCore(finalData);
    }
  };
  // const fillRecordsWeeklyCore = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsCore(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsCore(finalData);
  //   }
  // };
  const fillRecordsMonthlyCore = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsCore(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsCore(finalData);
    }
  };
  const fetchPreviousWinnersCore = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardCoreDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataCore(result.data.data.leaderboard);
    } else {
      setPrevDataCore(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };
  // const fetchPreviousWeeklyWinnersCore = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardCoreWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 100,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataCoreWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataCoreWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersCore = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardCoreMonthly",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataCoreMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataCoreMonthly(placeholderplayerData);
    }
  };
  const fetchDailyRecordsCore = async () => {
    const data = {
      StatisticName: "LeaderboardCoreDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    fetchPreviousWinnersCore(parseInt(result.data.data.version));
    setDailyRecordsCore(result.data.data.leaderboard);
    fillRecordsCore(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerCore(true);
        fetchDailyRecordsAroundPlayerCore(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerCore(false);
        fetchDailyRecordsAroundPlayerCore(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsCore = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardCoreWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setWeeklyRecordsCore(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersCore(parseInt(result.data.data.version));
  //   fillRecordsWeeklyCore(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerCoreWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerCore(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerCoreWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerCore(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsCore = async () => {
    const data = {
      StatisticName: "LeaderboardCoreMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsCore(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersCore(parseInt(result.data.data.version));
    fillRecordsMonthlyCore(result.data.data.leaderboard);

    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerCoreMonthly(true);
        fetchMonthlyRecordsAroundPlayerCore(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerCoreMonthly(false);
        fetchMonthlyRecordsAroundPlayerCore(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerCore = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardCoreDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountCore(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerCore(true);
          setUserDataCore([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerCore(false);
          setUserDataCore(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerCore(false);
        setUserDataCore(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerCore = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardCoreWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountCore(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountCore(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountCore(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerCoreWeekly(true);
  //         setUserDataCoreWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerCoreWeekly(false);
  //         setUserDataCoreWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerCoreWeekly(false);
  //       setUserDataCoreWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerCore = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardCoreMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime && testArray[0].statValue != 0) {
        setMonthlyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
        setMonthlyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      } else setMonthlyDataAmountCore(0);

      setUserRankCore(testArray[0].position);
      setUserCoreScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerCoreMonthly(true);
          setUserDataCoreMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerCoreMonthly(false);
          setUserDataCoreMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerCoreMonthly(false);
        setUserDataCoreMonthly(...testArray);
      }
    }
  };

  const fillRecordsViction = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsViction(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsViction(finalData);
    }
  };
  // const fillRecordsWeeklyViction = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsViction(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsViction(finalData);
  //   }
  // };
  const fillRecordsMonthlyViction = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsViction(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsViction(finalData);
    }
  };
  const fetchPreviousWinnersViction = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardVictionDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataViction(result.data.data.leaderboard);
    } else {
      setPrevDataViction(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersViction = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardVictionWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataVictionWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataVictionWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersViction = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardVictionMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataVictionMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataVictionMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsViction = async () => {
    const data = {
      StatisticName: "LeaderboardVictionDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    fetchPreviousWinnersViction(parseInt(result.data.data.version));
    setDailyRecordsViction(result.data.data.leaderboard);
    fillRecordsViction(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerViction(true);
        fetchDailyRecordsAroundPlayerViction(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerViction(false);
        fetchDailyRecordsAroundPlayerViction(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsViction = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardVictionWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setWeeklyRecordsViction(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersViction(parseInt(result.data.data.version));
  //   fillRecordsWeeklyViction(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerVictionWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerViction(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerVictionWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerViction(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsViction = async () => {
    const data = {
      StatisticName: "LeaderboardVictionMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsViction(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersViction(parseInt(result.data.data.version));
    fillRecordsMonthlyViction(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerVictionMonthly(true);
        fetchMonthlyRecordsAroundPlayerViction(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerVictionMonthly(false);
        fetchMonthlyRecordsAroundPlayerViction(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerViction = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardVictionDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountViction(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerViction(true);
          setUserDataViction([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerViction(false);
          setUserDataViction(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerViction(false);
        setUserDataViction(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerViction = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardVictionWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountViction(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountViction(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountViction(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerVictionWeekly(true);
  //         setUserDataVictionWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerVictionWeekly(false);
  //         setUserDataVictionWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerVictionWeekly(false);
  //       setUserDataVictionWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerViction = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardVictionMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankViction(testArray[0].position);
      setUserVictionScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerVictionMonthly(true);
          setUserDataVictionMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerVictionMonthly(false);
          setUserDataVictionMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerVictionMonthly(false);
        setUserDataVictionMonthly(...testArray);
      }
    }
  };

  const fillRecordsManta = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsManta(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsManta(finalData);
    }
  };
  // const fillRecordsWeeklyManta = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsManta(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsManta(finalData);
  //   }
  // };
  const fillRecordsMonthlyManta = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsManta(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsManta(finalData);
    }
  };

  const fetchPreviousWinnersManta = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMantaDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataManta(result.data.data.leaderboard);
    } else {
      setPrevDataManta(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersManta = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardMantaWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataMantaWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataMantaWeekly(placeholderplayerData);
  //   }
  // };

  const fetchPreviousMonthlyWinnersManta = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMantaMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataMantaMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataMantaMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsManta = async () => {
    const data = {
      StatisticName: "LeaderboardMantaDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsManta([]);
      });

    fetchPreviousWinnersManta(parseInt(result.data.data.version));
    setDailyRecordsManta(result.data.data.leaderboard);
    fillRecordsManta(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerManta(true);
        fetchDailyRecordsAroundPlayerManta(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerManta(false);
        fetchDailyRecordsAroundPlayerManta(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsManta = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardMantaWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data)
  //     .catch((e) => {
  //       console.error(e);
  //       fillRecordsWeeklyManta([]);
  //     });
  //   setWeeklyRecordsManta(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersManta(parseInt(result.data.data.version));
  //   fillRecordsWeeklyManta(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerMantaWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerManta(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerMantaWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerManta(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsManta = async () => {
    const data = {
      StatisticName: "LeaderboardMantaMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMonthlyManta([]);
      });
    setMonthlyRecordsManta(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersManta(parseInt(result.data.data.version));

    fillRecordsMonthlyManta(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerMantaMonthly(true);
        fetchMonthlyRecordsAroundPlayerManta(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerMantaMonthly(false);
        fetchMonthlyRecordsAroundPlayerManta(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerManta = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMantaDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountManta(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountManta(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountManta(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerManta(true);
          setUserDataManta([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerManta(false);
          setUserDataManta(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerManta(false);
        setUserDataManta(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerManta = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardMantaWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountManta(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountManta(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountManta(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerMantaWeekly(true);
  //         setUserDataMantaWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerMantaWeekly(false);
  //         setUserDataMantaWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerMantaWeekly(false);
  //       setUserDataMantaWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerManta = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMantaMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountManta(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountManta(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankManta(testArray[0].position);
      setUserMantaScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerMantaMonthly(true);
          setUserDataMantaMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerMantaMonthly(false);
          setUserDataMantaMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerMantaMonthly(false);
        setUserDataMantaMonthly(...testArray);
      }
    }
  };

  const fillRecordsSei = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsSei(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsSei(finalData);
    }
  };
  // const fillRecordsWeeklySei = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsSei(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsSei(finalData);
  //   }
  // };
  const fillRecordsMonthlySei = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsSei(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsSei(finalData);
    }
  };

  const fetchPreviousWinnersSei = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSeiDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataSei(result.data.data.leaderboard);
    } else {
      setPrevDataSei(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersSei = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardSeiWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataSeiWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataSeiWeekly(placeholderplayerData);
  //   }
  // };

  const fetchPreviousMonthlyWinnersSei = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSeiMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataSeiMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataSeiMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsSei = async () => {
    const data = {
      StatisticName: "LeaderboardSeiDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsSei([]);
      });

    fetchPreviousWinnersSei(parseInt(result.data.data.version));
    setDailyRecordsSei(result.data.data.leaderboard);
    fillRecordsSei(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerSei(true);
        fetchDailyRecordsAroundPlayerSei(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerSei(false);
        fetchDailyRecordsAroundPlayerSei(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsSei = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardSeiWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data)
  //     .catch((e) => {
  //       console.error(e);
  //       fillRecordsWeeklySei([]);
  //     });
  //   setWeeklyRecordsSei(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersSei(parseInt(result.data.data.version));
  //   fillRecordsWeeklySei(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerSeiWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerSei(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerSeiWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerSei(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsSei = async () => {
    const data = {
      StatisticName: "LeaderboardSeiMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMonthlySei([]);
      });
    setMonthlyRecordsSei(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersSei(parseInt(result.data.data.version));

    fillRecordsMonthlySei(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerSeiMonthly(true);
        fetchMonthlyRecordsAroundPlayerSei(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerSeiMonthly(false);
        fetchMonthlyRecordsAroundPlayerSei(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerSei = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSeiDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      // if (isPremium && testArray[0].statValue != 0) {
      //   setDailyDataAmountSei(
      //     testArray[0].statValue !== 0
      //       ? userPosition > 10
      //         ? 0
      //         : userPosition === 10
      //         ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
      //         : Number(skaleStars[userPosition]) +
      //           Number(skaleStarsPremium[userPosition])
      //       : 0
      //   );
      // } else if (!isPremium && testArray[0].statValue != 0) {
      //   setDailyDataAmountSei(
      //     testArray[0].statValue !== 0
      //       ? userPosition > 10
      //         ? 0
      //         : userPosition === 10
      //         ? Number(skaleStars[9])
      //         : Number(skaleStars[userPosition])
      //       : 0
      //   );
      // } else setDailyDataAmountSei(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerSei(true);
          setUserDataSei(...testArray);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerSei(false);
          setUserDataSei(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerSei(false);
        setUserDataSei(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerSei = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardSeiWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountSei(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountSei(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountSei(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerSeiWeekly(true);
  //         setUserDataSeiWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerSeiWeekly(false);
  //         setUserDataSeiWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerSeiWeekly(false);
  //       setUserDataSeiWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerSei = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSeiMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountSei(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountSei(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankSei(testArray[0].position);
      setUserSeiScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerSeiMonthly(true);
          setUserDataSeiMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerSeiMonthly(false);
          setUserDataSeiMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerSeiMonthly(false);
        setUserDataSeiMonthly(...testArray);
      }
    }
  };

  const fillRecordsBase = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsBase(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsBase(finalData);
    }
  };

  // const fillRecordsWeeklyBase = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsBase(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsBase(finalData);
  //   }
  // };

  const fillRecordsMonthlyBase = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsBase(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsBase(finalData);
    }
  };

  const fetchPreviousWinnersBase = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardBaseDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataBase(result.data.data.leaderboard);
    } else {
      setPrevDataBase(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersBase = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardBaseWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataBaseWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataBaseWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersBase = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardBaseMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataBaseMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataBaseMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsBase = async () => {
    const data = {
      StatisticName: "LeaderboardBaseDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsBase([]);
      });

    fetchPreviousWinnersBase(parseInt(result.data.data.version));
    setDailyRecordsBase(result.data.data.leaderboard);
    fillRecordsBase(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerBase(true);
        fetchDailyRecordsAroundPlayerBase(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerBase(false);
        fetchDailyRecordsAroundPlayerBase(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsBase = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardBaseWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data)
  //     .catch((e) => {
  //       console.error(e);
  //       fillRecordsWeeklyBase([]);
  //     });
  //   setWeeklyRecordsBase(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersBase(parseInt(result.data.data.version));

  //   fillRecordsWeeklyBase(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerBaseWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerBase(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerBaseWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerBase(result.data.data.leaderboard);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsBase = async () => {
    const data = {
      StatisticName: "LeaderboardBaseMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMonthlyBase([]);
      });
    setMonthlyRecordsBase(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersBase(parseInt(result.data.data.version));

    fillRecordsMonthlyBase(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerBaseMonthly(true);
        fetchMonthlyRecordsAroundPlayerBase(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerBaseMonthly(false);
        fetchMonthlyRecordsAroundPlayerBase(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerBase = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardBaseDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountBase(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountBase(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountBase(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerBase(true);
          setUserDataBase([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerBase(false);
          setUserDataBase(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerBase(false);
        setUserDataBase(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerBase = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardBaseWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountBase(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountBase(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountBase(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerBaseWeekly(true);
  //         setUserDataBaseWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerBaseWeekly(false);
  //         setUserDataBaseWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerBaseWeekly(false);
  //       setUserDataBaseWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerBase = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardBaseMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountBase(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountBase(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankBase(testArray[0].position);
      setUserBaseScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerBaseMonthly(true);
          setUserDataBaseMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerBaseMonthly(false);
          setUserDataBaseMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerBaseMonthly(false);
        setUserDataBaseMonthly(...testArray);
      }
    }
  };

  const fillRecordsTaiko = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsTaiko(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsTaiko(finalData);
    }
  };
  // const fillRecordsWeeklyTaiko = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsTaiko(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsTaiko(finalData);
  //   }
  // };
  const fillRecordsMonthlyTaiko = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsTaiko(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsTaiko(finalData);
    }
  };

  const fetchPreviousWinnersTaiko = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardTaikoDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataTaiko(result.data.data.leaderboard);
    } else {
      setPrevDataTaiko(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersTaiko = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardTaikoWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataTaikoWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataTaikoWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersTaiko = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardTaikoMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataTaikoMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataTaikoMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsTaiko = async () => {
    const data = {
      StatisticName: "LeaderboardTaikoDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsTaiko([]);
      });

    fetchPreviousWinnersTaiko(parseInt(result.data.data.version));
    setDailyRecordsTaiko(result.data.data.leaderboard);
    fillRecordsTaiko(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerTaiko(true);
        fetchDailyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerTaiko(false);
        fetchDailyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsTaiko = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardTaikoWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data)
  //     .catch((e) => {
  //       console.error(e);
  //       fillRecordsWeeklyTaiko([]);
  //     });
  //   setWeeklyRecordsTaiko(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersTaiko(parseInt(result.data.data.version));
  //   fillRecordsWeeklyTaiko(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerTaikoWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerTaikoWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsTaiko = async () => {
    const data = {
      StatisticName: "LeaderboardTaikoMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMonthlyTaiko([]);
      });
    setMonthlyRecordsTaiko(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersTaiko(parseInt(result.data.data.version));

    fillRecordsMonthlyTaiko(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerTaikoMonthly(true);
        fetchMonthlyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerTaikoMonthly(false);
        fetchMonthlyRecordsAroundPlayerTaiko(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerTaiko = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardTaikoDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountTaiko(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountTaiko(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountTaiko(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerTaiko(true);
          setUserDataTaiko([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerTaiko(false);
          setUserDataTaiko(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerTaiko(false);
        setUserDataTaiko(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerTaiko = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardTaikoWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountTaiko(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountTaiko(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountTaiko(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerTaikoWeekly(true);
  //         setUserDataTaikoWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerTaikoWeekly(false);
  //         setUserDataTaikoWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerTaikoWeekly(false);
  //       setUserDataTaikoWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerTaiko = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardTaikoMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountTaiko(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountTaiko(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankTaiko(testArray[0].position);
      setUserTaikoScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerTaikoMonthly(true);
          setUserDataTaikoMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerTaikoMonthly(false);
          setUserDataTaikoMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerTaikoMonthly(false);
        setUserDataTaikoMonthly(...testArray);
      }
    }
  };

  const fillRecordsMat = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsMat(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsMat(finalData);
    }
  };
  // const fillRecordsWeeklyMat = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsMat(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsMat(finalData);
  //   }
  // };
  const fillRecordsMonthlyMat = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsMat(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsMat(finalData);
    }
  };

  const fetchPreviousWinnersMat = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMatchainDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataMat(result.data.data.leaderboard);
    } else {
      setPrevDataMat(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersMat = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardMatChainWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataMatWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataMatWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersMat = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMatchainMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataMatMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataMatMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsMat = async () => {
    const data = {
      StatisticName: "LeaderboardMatchainDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMat([]);
      });

    fetchPreviousWinnersMat(parseInt(result.data.data.version));
    setDailyRecordsMat(result.data.data.leaderboard);
    fillRecordsMat(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerMat(true);
        fetchDailyRecordsAroundPlayerMat(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerMat(false);
        fetchDailyRecordsAroundPlayerMat(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsMat = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardMatchainWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios
  //     .post(`${backendApi}/auth/GetLeaderboard`, data)
  //     .catch((e) => {
  //       console.error(e);
  //       fillRecordsWeeklyMat([]);
  //     });
  //   setWeeklyRecordsMat(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersMat(parseInt(result.data.data.version));
  //   fillRecordsWeeklyMat(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerMatWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerMat(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerMatWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerMat(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsMat = async () => {
    const data = {
      StatisticName: "LeaderboardMatchainMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data)
      .catch((e) => {
        console.error(e);
        fillRecordsMonthlyMat([]);
      });
    setMonthlyRecordsMat(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersMat(parseInt(result.data.data.version));

    fillRecordsMonthlyMat(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerMatMonthly(true);
        fetchMonthlyRecordsAroundPlayerMat(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerMatMonthly(false);
        fetchMonthlyRecordsAroundPlayerMat(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerMat = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMatchainDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountMat(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium && testArray[0].statValue != 0) {
        setDailyDataAmountMat(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      } else setDailyDataAmountMat(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerMat(true);
          setUserDataMat([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerMat(false);
          setUserDataMat(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerMat(false);
        setUserDataMat(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerMat = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardMatchainWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountMat(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9]) +
  //               Number(skalePrizesWeeklyGolden[9])
  //             : Number(skalePrizesWeekly[userPosition]) +
  //               Number(skalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
  //       setWeeklyDataAmountMat(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(skalePrizesWeekly[9])
  //             : Number(skalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     } else setWeeklyDataAmountMat(0);

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerMatWeekly(true);
  //         setUserDataMatWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerMatWeekly(false);
  //         setUserDataMatWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerMatWeekly(false);
  //       setUserDataMatWeekly(...testArray);
  //     }
  //   }
  // };

  const fetchMonthlyRecordsAroundPlayerMat = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMatchainMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountMat(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountMat(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankMat(testArray[0].position);
      setUserMatScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerMatMonthly(true);
          setUserDataMatMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerMatMonthly(false);
          setUserDataMatMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerMatMonthly(false);
        setUserDataMatMonthly(...testArray);
      }
    }
  };

  const fillRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsSkale(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsSkale(finalData);
    }
  };

  // const fillRecordsWeeklySkale = (itemData) => {
  //   if (itemData.length === 0) {
  //     setWeeklyRecordsSkale(placeholderplayerData);
  //   } else if (itemData.length <= 10) {
  //     const testArray = itemData;
  //     const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
  //     const finalData = [...testArray, ...placeholderArray];
  //     setWeeklyRecordsSkale(finalData);
  //   }
  // };

  const fillRecordsMonthlySkale = (itemData) => {
    if (itemData.length === 0) {
      setMonthlyRecordsSkale(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setMonthlyRecordsSkale(finalData);
    }
  };

  const fetchPreviousWinnersSkale = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataSkale(result.data.data.leaderboard);
    } else {
      setPrevDataSkale(placeholderplayerData);
    }
    // setdailyplayerData(result.data.data.leaderboard);
  };

  // const fetchPreviousWeeklyWinnersSkale = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "LeaderboardSkaleWeekly",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setPrevDataSkaleWeekly(result.data.data.leaderboard);
  //   } else {
  //     setPrevDataSkaleWeekly(placeholderplayerData);
  //   }
  // };
  const fetchPreviousMonthlyWinnersSkale = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataSkaleMonthly(result.data.data.leaderboard);
    } else {
      setPrevDataSkaleMonthly(placeholderplayerData);
    }
  };

  const fetchDailyRecordsSkale = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    fetchPreviousWinnersSkale(parseInt(result.data.data.version));
    setDailyRecordsSkale(result.data.data.leaderboard);
    fillRecordsSkale(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerSkale(true);
        fetchDailyRecordsAroundPlayerSkale(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayerSkale(false);
        fetchDailyRecordsAroundPlayerSkale(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecordsSkale = async () => {
  //   const data = {
  //     StatisticName: "LeaderboardSkaleWeekly",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setWeeklyRecordsSkale(result.data.data.leaderboard);

  //   fetchPreviousWeeklyWinnersSkale(parseInt(result.data.data.version));

  //   fillRecordsWeeklySkale(result.data.data.leaderboard);
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (testArray.length > 0) {
  //       setActivePlayerSkaleWeekly(true);
  //       fetchWeeklyRecordsAroundPlayerSkale(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerSkaleWeekly(false);
  //       fetchWeeklyRecordsAroundPlayerSkale(result.data.data.leaderboard);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsSkale = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsSkale(result.data.data.leaderboard);

    fetchPreviousMonthlyWinnersSkale(parseInt(result.data.data.version));

    fillRecordsMonthlySkale(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerSkaleMonthly(true);
        fetchMonthlyRecordsAroundPlayerSkale(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerSkaleMonthly(false);
        fetchMonthlyRecordsAroundPlayerSkale(result.data.data.leaderboard);
      }
    }
  };

  const fetchDailyRecordsAroundPlayerSkale = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleDaily",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (isPremium) {
        setDailyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9]) + Number(skaleStarsPremium[9])
              : Number(skaleStars[userPosition]) +
                Number(skaleStarsPremium[userPosition])
            : 0
        );
      } else if (!isPremium) {
        setDailyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skaleStars[9])
              : Number(skaleStars[userPosition])
            : 0
        );
      }

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerSkale(true);
          setUserDataSkale([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerSkale(false);
          setUserDataSkale(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerSkale(false);
        setUserDataSkale(...testArray);
      }
    }
  };

  // const fetchWeeklyRecordsAroundPlayerSkale = async (itemData) => {
  //   const data = {
  //     StatisticName: "LeaderboardSkaleWeekly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     const userPosition = testArray[0].position;
  //     if (goldenPassRemainingTime) {
  //       setWeeklyDataAmountSkale(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(updatedSkalePrizesWeekly[9]) +
  //               Number(updatedSkalePrizesWeeklyGolden[9])
  //             : Number(updatedSkalePrizesWeekly[userPosition]) +
  //               Number(updatedSkalePrizesWeeklyGolden[userPosition])
  //           : 0
  //       );
  //     } else if (!goldenPassRemainingTime) {
  //       setWeeklyDataAmountSkale(
  //         testArray[0].statValue !== 0
  //           ? userPosition > 10
  //             ? 0
  //             : userPosition === 10
  //             ? Number(updatedSkalePrizesWeekly[9])
  //             : Number(updatedSkalePrizesWeekly[userPosition])
  //           : 0
  //       );
  //     }

  //     if (itemData.length > 0) {
  //       var testArray2 = Object.values(itemData).filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerSkaleWeekly(true);
  //         setUserDataSkaleWeekly([]);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerSkaleWeekly(false);
  //         setUserDataSkaleWeekly(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerSkaleWeekly(false);
  //       setUserDataSkaleWeekly(...testArray);
  //     }
  //   }
  // };
  const fetchMonthlyRecordsAroundPlayerSkale = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setMonthlyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(updatedSkalePrizesMonthly[9]) +
                Number(updatedSkalePrizesMonthlyGolden[9])
              : Number(updatedSkalePrizesMonthly[userPosition]) +
                Number(updatedSkalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(updatedSkalePrizesMonthly[9])
              : Number(updatedSkalePrizesMonthly[userPosition])
            : 0
        );
      }

      setUserRankSkale(testArray[0].position);
      setUserSkaleScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerSkaleMonthly(true);
          setUserDataSkaleMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerSkaleMonthly(false);
          setUserDataSkaleMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerSkaleMonthly(false);
        setUserDataSkaleMonthly(...testArray);
      }
    }
  };

  const fillRecordsStar = (itemData) => {
    if (itemData.length === 0) {
      setStarRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setStarRecords(finalData);
    }
  };

  const fetchDailyRecordsAroundPlayerStar = async (itemData) => {
    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        const userPosition = testArray[0].position;
        setuserCollectedStars(testArray[0].statValue);
        if (goldenPassRemainingTime) {
          setDataAmountStar(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99]) +
                  Number(monthlyExtraStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition]) +
                  Number(monthlyExtraStarPrizes[userPosition])
              : 0
          );
        } else if (!goldenPassRemainingTime) {
          setDataAmountStar(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition])
              : 0
          );
        }
      }
      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerStar(true);
          setUserDataStar([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerStar(false);
          setUserDataStar(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerStar(false);
        setUserDataStar(...testArray);
      }
    }
  };

  const fetchPreviousWinnersStar = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataStar(result.data.data.leaderboard);
    } else {
      setPrevDataStar(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchExplorerHunt = async () => {
    if (userId) {
      const data = {
        StatisticName: "ExploreHuntEventKillCollection",
        StartPosition: 0,
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setexplorerHuntData(result.data.data.leaderboard);
    }
  };

  const fetchGreatCollection = async () => {
    if (userId) {
      const data = {
        StatisticName: "TheGreatCollection",
        StartPosition: 0,
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setgreatCollectionData(result.data.data.leaderboard);
    }
  };

  const fetchRecordsStar = async () => {
    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    fetchPreviousWinnersStar(parseInt(result.data.data.version));
    setStarRecords(result.data.data.leaderboard);
    fillRecordsStar(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerStar(true);
        const userPosition = testArray[0].position;
        setuserCollectedStars(testArray[0].statValue);
        setUserDataStar(...testArray);
        if (goldenPassRemainingTime) {
          setDataAmountStar(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99]) +
                  Number(monthlyExtraStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition]) +
                  Number(monthlyExtraStarPrizes[userPosition])
              : 0
          );
        } else if (!goldenPassRemainingTime) {
          setDataAmountStar(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition])
              : 0
          );
        }
      } else if (testArray.length === 0) {
        setActivePlayerStar(false);
        fetchDailyRecordsAroundPlayerStar(result.data.data.leaderboard);
      }
    }
  };

  const fillRecordsStarWeekly = (itemData) => {
    if (itemData.length === 0) {
      setStarRecordsWeekly(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setStarRecordsWeekly(finalData);
    }
  };

  const fetchPreviousWinnersStarWeekly = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "GlobalStarWeeklyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataStarWeekly(result.data.data.leaderboard);
    } else {
      setPrevDataStarWeekly(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchRecordsStarWeekly = async () => {
    const data = {
      StatisticName: "GlobalStarWeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    fetchPreviousWinnersStarWeekly(parseInt(result.data.data.version));
    setStarRecordsWeekly(result.data.data.leaderboard);
    fillRecordsStarWeekly(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerStarWeekly(true);
        const userPosition = testArray[0].position;
        setuserCollectedStarsWeekly(testArray[0].statValue);
        setUserDataStarWeekly(...testArray);
        if (goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99]) +
                  Number(weeklyExtraStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition]) +
                  Number(weeklyExtraStarPrizes[userPosition])
              : 0
          );
        } else if (!goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition])
              : 0
          );
        }
      } else if (testArray.length === 0) {
        setActivePlayerStarWeekly(false);
        fetchWeeklyRecordsAroundPlayerStar(result.data.data.leaderboard);
      }
    }
  };

  const fetchWeeklyRecordsAroundPlayerStar = async (itemData) => {
    const data = {
      StatisticName: "GlobalStarWeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        const userPosition = testArray[0].position;
        setuserCollectedStarsWeekly(testArray[0].statValue);
        if (goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99]) +
                  Number(weeklyExtraStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition]) +
                  Number(weeklyExtraStarPrizes[userPosition])
              : 0
          );
        } else if (!goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            testArray[0].statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition])
              : 0
          );
        }
      }
      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerStarWeekly(true);
          setUserDataStarWeekly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerStarWeekly(false);
          setUserDataStarWeekly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerStarWeekly(false);
        setUserDataStarWeekly(...testArray);
      }
    }
  };

  const fillRecordsDaily = (itemData) => {
    if (itemData.length === 0) {
      setdailyplayerData(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setdailyplayerData(finalData);
    }
  };

  const fillRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setgenesisData(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setgenesisData(finalData);
    }
  };

  const fillPreviousRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setpreviousgenesisData(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setpreviousgenesisData(finalData);
    }
  };

  const fetchPreviousWinners = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsDaily(result.data.data.leaderboard);

      setdailyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchGenesisPreviousWinners = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "TheGreatCollection",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      // fillPreviousRecordsGenesis(result.data.data.leaderboard);

      setpreviousgenesisData(result.data.data.leaderboard);
    }
  };

  // const fetchPreviousWeeklyWinners = async (version) => {
  //   if (version != 0) {
  //     const data = {
  //       StatisticName: "WeeklyLeaderboard",
  //       StartPosition: 0,
  //       MaxResultsCount: 100,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setweeklyplayerData(result.data.data.leaderboard);
  //   }
  // };

  const fetchPreviousMonthlyWinners = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "MonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setmonthlyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchDailyRecords = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    setpreviousVersion(parseInt(result.data.data.version));
    setRecords(result.data.data.leaderboard);
    fillRecords(result.data.data.leaderboard);
    fetchPreviousWinners(parseInt(result.data.data.version));
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayer(true);
        fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
      } else if (testArray.length === 0) {
        setActivePlayer(false);
        fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
      }
    }
  };

  // const fetchWeeklyRecords = async () => {
  //   const data = {
  //     StatisticName: "WeeklyLeaderboard",
  //     StartPosition: 0,
  //     MaxResultsCount: 100,
  //   };
  //   const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
  //   setWeeklyRecords(result.data.data.leaderboard);
  //   setpreviousWeeklyVersion(result.data.data.version);

  //   fillRecordsWeekly(result.data.data.leaderboard);
  //   fetchPreviousWeeklyWinners(parseInt(result.data.data.version));
  //   if (userId && username) {
  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );
  //     if (testArray.length > 0) {
  //       setActivePlayerWeekly(true);
  //       fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
  //     }
  //     if (testArray.length === 0) {
  //       setActivePlayerWeekly(false);
  //       fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
  //     }
  //   }
  // };

  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    fetchPreviousMonthlyWinners(parseInt(result.data.data.version));
    fillRecordsMonthly(result.data.data.leaderboard);
    if (userId && username) {
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      if (testArray.length > 0) {
        setActivePlayerMonthly(true);
        fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
      }

      if (testArray.length === 0) {
        setActivePlayerMonthly(false);
        fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
      }
    }
  };

  const fetchGenesisRecords = async () => {
    const data2 = {
      StatisticName: "TheGreatCollection",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    const result2 = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data2)
      .catch((err) => {
        console.log(err);
      });
    if (result2) {
      setpreviousGenesisVersion(result2.data.data.version);
      setgenesisData(result2.data.data.leaderboard);
      fillRecordsGenesis(result2.data.data.leaderboard);
    }
    // if (userId && username) {
    //   fetchMonthlyGenesisRecordsAroundPlayer(result2.data.data.leaderboard);
    // }
    fetchGenesisPreviousWinners(parseInt(result2.data.data.version));
  };

  // const fetchMonthlyGenesisRecordsAroundPlayer = async (itemData) => {
  //   const data = {
  //     StatisticName: "GenesisLandRewards",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   if (userId) {
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboardAroundPlayer`,
  //       data
  //     );

  //     var testArray = result.data.data.leaderboard.filter(
  //       (item) => item.displayName === username
  //     );

  //     if (itemData.length > 0) {
  //       var testArray2 = itemData.filter(
  //         (item) => item.displayName === username
  //       );

  //       if (testArray.length > 0 && testArray2.length > 0) {
  //         setActivePlayerGenesis(true);
  //       } else if (testArray.length > 0 && testArray2.length === 0) {
  //         setActivePlayerGenesis(false);
  //         // setUserDataMonthly(...testArray);
  //         setUserDataGenesis(...testArray);
  //       }
  //     } else if (testArray.length > 0) {
  //       setActivePlayerGenesis(false);
  //       // setUserDataMonthly(...testArray);
  //       setUserDataGenesis(...testArray);
  //     }
  //   }
  // };

  // const isUserInTop100 = (data, userId) => {
  //   return data.findIndex((item) => item.playerId === userId) !== -1;
  // };

  // const addPointsForPremium = (user, points) => {
  //   if (user && user.statValue !== undefined && user.statValue !== "---") {
  //     return { ...user, statValue: user.statValue + points };
  //   }
  // };

  // const updateLeaderboard = (data, updatedUser) => {
  //   const updatedData = data.map((item) =>
  //     item.playerId === updatedUser.playerId ? updatedUser : item
  //   );
  //   return updatedData.sort((a, b) => b.statValue - a.statValue).slice(0, 100);
  // };

  // const updateLeaderboard2 = (data) => {
  //   return data
  //     .sort((a, b) => {
  //       if (a.statValue === "---" || a.playerId === undefined) return 1;
  //       if (b.statValue === "---" || b.playerId === undefined) return -1;
  //       return b.statValue - a.statValue;
  //     })
  //     .slice(0, 100);
  // };

  useEffect(() => {
    if (logoutCount > 0) {
      onSubscribeSuccess();
      setclaimedChests(0);
      setclaimedPremiumChests(0);
      setclaimedCorePremiumChests(0);
      setclaimedCoreChests(0);
      setclaimedVictionPremiumChests(0);
      setclaimedVictionChests(0);
      setclaimedMatChests(0);

      setallChests([]);
      setallSkaleChests([]);
      setallCoreChests([]);
      setallVictionChests([]);
      setallMatChests([]);

      setOpenedChests([]);
      setOpenedCoreChests([]);
      setOpenedVictionChests([]);
      setOpenedSkaleChests([]);
      setclaimedSkaleChests(0);
      setclaimedSkalePremiumChests(0);

      setOpenedMatChests([]);
      setclaimedMatChests(0);
      setclaimedMatPremiumChests(0);
      refetchPlayer();
    }
  }, [logoutCount]);

  useEffect(() => {
    if (username !== undefined && userId !== undefined) {
      fetchDailyRecords();
      // fetchWeeklyRecords();
      // fetchMonthlyRecords();
      fetchGenesisRecords();
      fetchDailyRecordsCore();
      // fetchWeeklyRecordsCore();
      // fetchMonthlyRecordsCore();
      fetchDailyRecordsViction();
      // fetchWeeklyRecordsViction();
      // fetchMonthlyRecordsViction();
      fetchDailyRecordsManta();
      // fetchWeeklyRecordsManta();
      // fetchMonthlyRecordsManta();

      fetchDailyRecordsSei();
      // fetchWeeklyRecordsSei();
      // fetchMonthlyRecordsSei();

      fetchDailyRecordsBase();
      // fetchWeeklyRecordsBase();
      // fetchMonthlyRecordsBase();
      fetchDailyRecordsTaiko();
      // fetchWeeklyRecordsTaiko();
      // fetchMonthlyRecordsTaiko();

      fetchDailyRecordsMat();
      // fetchWeeklyRecordsMat();
      // fetchMonthlyRecordsMat();

      fetchDailyRecordsSkale();
      // fetchWeeklyRecordsSkale();
      // fetchMonthlyRecordsSkale();
      fetchRecordsStar();
      fetchGreatCollection();
      fetchExplorerHunt();
      fetchRecordsStarWeekly();
    }
  }, [username, userId, goldenPassRemainingTime]);

  useEffect(() => {
    if (count !== 0) {
      fetchDailyRecords();
      getAllChests(email);
    }
  }, [count]);

  useEffect(() => {
    if (corecount !== 0) {
      fetchDailyRecordsCore();
      getAllCoreChests(email);
    }
  }, [corecount]);

  useEffect(() => {
    if (skalecount !== 0) {
      fetchDailyRecordsSkale();
      getAllSkaleChests(email);
    }
  }, [skalecount]);

  // const lastUpdated = useRef(false);

  useEffect(() => {
    if (vicitoncount !== 0) {
      fetchDailyRecordsViction();
      getAllVictionChests(email);
    }
  }, [vicitoncount]);

  useEffect(() => {
    if (mantacount !== 0) {
      fetchDailyRecordsManta();
      getAllMantaChests(email);
    }
  }, [mantacount]);

  useEffect(() => {
    if (basecount !== 0) {
      fetchDailyRecordsBase();
      getAllBaseChests(email);
    }
  }, [basecount]);

  useEffect(() => {
    if (taikocount !== 0) {
      fetchDailyRecordsTaiko();
      getAllTaikoChests(email);
    }
  }, [taikocount]);

  useEffect(() => {
    if (matcount !== 0) {
      fetchDailyRecordsMat();
      getAllMatChests(email);
    }
  }, [matcount]);

  useEffect(() => {
    if (seicount !== 0) {
      fetchDailyRecordsSei();
      getAllSeiChests(email);
    }
  }, [seicount]);

  useEffect(() => {
    // if (!lastUpdated.current) {
    setAllStarData({
      rewards: monthlyStarPrizes,
      rewardsWeekly: weeklyStarPrizes,
      premium_rewards: monthlyExtraStarPrizes,
      premium_rewards_weekly: weeklyExtraStarPrizes,
      activeData: starRecords,
      activeDataWeekly: starRecordsWeekly,
      previousData: prevDataStar,
      previousDataWeekly: prevDataStarWeekly,
      player_data: userDataStar,
      player_data_weekly: userDataStarWeekly,
      is_active: activePlayerStar,
      is_active_weekly: activePlayerStarWeekly,
    });
    // }
  }, [
    starRecords,
    starRecordsWeekly,
    prevDataStar,
    prevDataStarWeekly,
    userDataStar,
    userDataStarWeekly,
    activePlayerStar,
    activePlayerStarWeekly,
  ]);

  // useEffect(() => {
  //   if (
  //     allStarData &&
  //     allStarData.activeData &&
  //     allStarData.activeDataWeekly &&
  //     isPremium === true &&
  //     userId !== undefined
  //   ) {
  //     const playerActiveArray = [
  //       activePlayer,
  //       activePlayerBase,
  //       activePlayerCore,
  //       activePlayerManta,
  //       activePlayerSkale,
  //       activePlayerViction,
  //       true,
  //     ];
  //     const allFalse = playerActiveArray.every((v) => v === false);

  //     if (!allFalse) {
  //       setExtraStars(true);

  //       if ((activePlayerStar || activePlayerStarWeekly) && !addedUser) {
  //         const updatedData = allStarData.activeData.map((item) => {
  //           if (item.playerId === userId) {
  //             const newStatValue = userCollectedStars + 50;
  //             setuserCollectedStars((prev) => prev + 50);
  //             setActivePlayerStar(true);
  //             setUserDataStar(item);
  //             return { ...item, statValue: newStatValue };
  //           } else {
  //             return { ...item };
  //           }
  //         });

  //         const updatedDataWeekly = allStarData.activeDataWeekly.map((item) => {
  //           if (item.playerId === userId) {
  //             const newStatValue = item.statValue + 50;
  //             setuserCollectedStarsWeekly((prev) => prev + 50);
  //             return { ...item, statValue: newStatValue };
  //           } else {
  //             return { ...item };
  //           }
  //         });

  //         const sortedDataWeekly = [...updatedDataWeekly].sort((a, b) => b.statValue - a.statValue);
  //         const sortedData = [...updatedData].sort((a, b) => b.statValue - a.statValue);

  //         setAllStarData({
  //           ...allStarData,
  //           activeData: sortedData,
  //           activeDataWeekly: sortedDataWeekly,
  //         });
  //       } else if (
  //         !isNaN(allStarData.player_data.statValue) &&
  //         !allStarData.activeData.some((item) => item.playerId === userId) &&
  //         !addedUser
  //       ) {
  //         setaddedUser(true);

  //         const newStatValue = allStarData.player_data.statValue + 50;
  //         allStarData.player_data = {
  //           ...allStarData.player_data,
  //           statValue: newStatValue,
  //         };

  //         const updatedActiveData = [
  //           ...allStarData.activeData,
  //           allStarData.player_data,
  //         ].sort((a, b) => b.statValue - a.statValue);

  //         const playerIndex = updatedActiveData.findIndex((item) => item.playerId === userId);
  //         updatedActiveData[playerIndex] = {
  //           ...updatedActiveData[playerIndex],
  //           position: playerIndex,
  //         };

  //         setAllStarData({
  //           ...allStarData,
  //           activeData: updatedActiveData,
  //           player_data: updatedActiveData[playerIndex]
  //         });
  //         setUserDataStar(updatedActiveData[playerIndex]);
  //       }

  //       if (
  //         !isNaN(allStarData.player_data_weekly.statValue) &&
  //         !allStarData.activeDataWeekly.some((item) => item.playerId === userId) &&
  //         !addedUser
  //       ) {
  //         const newWeeklyStatValue = userCollectedStarsWeekly + 50;

  //         const updatedActiveDataWeekly = [
  //           ...allStarData.activeDataWeekly,
  //           { ...allStarData.player_data_weekly, statValue: newWeeklyStatValue },
  //         ].sort((a, b) => b.statValue - a.statValue);

  //         setuserCollectedStarsWeekly(newWeeklyStatValue);
  //         setAllStarData({
  //           ...allStarData,
  //           activeDataWeekly: updatedActiveDataWeekly,
  //         });
  //       }
  //     }
  //   }
  // }, [
  //   allStarData,
  //   isPremium,
  //   activePlayer,
  //   activePlayerBase,
  //   activePlayerCore,
  //   activePlayerManta,
  //   activePlayerSkale,
  //   activePlayerViction,
  //   activePlayerStar,
  //   activePlayerStarWeekly,
  //   userId,
  // ]);

  useEffect(() => {
    const playerActiveArray = [
      activePlayer,
      activePlayerBase,
      activePlayerCore,
      activePlayerManta,
      activePlayerSkale,
      activePlayerViction,
      activePlayerTaiko,
      activePlayerMat,
    ];
    const allFalse = playerActiveArray.every((v) => v === false);

    // Exit if critical dependencies aren't available
    if (
      !allStarData.activeData ||
      !userId ||
      !isPremium ||
      userDataStar.statValue === undefined ||
      userDataStarWeekly.statValue === undefined
    )
      return;

    if (!allFalse && isPremium === true) {
      setprimeStars(true);
    } else setprimeStars(false);

    // if (!lastUpdated.current) {
    //   let updatedActiveData = [...allStarData.activeData];
    //   let updatedActiveDataWeekly = [...allStarData.activeDataWeekly];

    //   let userUpdated = false;
    //   let userUpdatedWeekly = false;
    //   if (!allFalse && isPremium) {
    //     // Check if user is in top 100 and adjust points if premium
    //     if (isUserInTop100(updatedActiveData, userId)) {
    //       const userIndex = updatedActiveData.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       updatedActiveData[userIndex] = addPointsForPremium(
    //         updatedActiveData[userIndex],
    //         50
    //       );
    //       userUpdated = true;
    //     } else if (
    //       isPremium &&
    //       !allFalse &&
    //       userDataStar.statValue !== undefined &&
    //       userDataStarWeekly.statValue !== undefined
    //     ) {
    //       // User not in top 100, add points and check ranking again

    //       const updatedUser = addPointsForPremium(userDataStar, 50);
    //       updatedActiveData.push(updatedUser);
    //       userUpdated = true;
    //     }

    //     if (isUserInTop100(updatedActiveDataWeekly, userId)) {
    //       const userIndex = updatedActiveDataWeekly.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       updatedActiveDataWeekly[userIndex] = addPointsForPremium(
    //         updatedActiveDataWeekly[userIndex],
    //         50
    //       );
    //       userUpdatedWeekly = true;
    //     } else if (
    //       isPremium &&
    //       !allFalse &&
    //       userDataStarWeekly.statValue !== undefined
    //     ) {
    //       const updatedWeeklyUser = addPointsForPremium(userDataStarWeekly, 50);
    //       updatedActiveDataWeekly.push(updatedWeeklyUser);
    //       userUpdatedWeekly = true;
    //     }

    //     if (userUpdated || userUpdatedWeekly) {
    //       const sortedActiveData = updateLeaderboard2(updatedActiveData);
    //       const playerIndex = sortedActiveData.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       const sortedActiveDataFinal = sortedActiveData.map((item, index) => {
    //         if (index === playerIndex) {
    //           return { ...item, position: playerIndex };
    //         } else return { ...item };
    //       });

    //       const sortedActiveDataWeekly = updateLeaderboard2(
    //         updatedActiveDataWeekly
    //       );

    //       const playerIndexWeekly = sortedActiveDataWeekly.findIndex(
    //         (item) => item.playerId === userId
    //       );

    //       const sortedActiveDataFinalWeekly = sortedActiveDataWeekly.map(
    //         (item, index) => {
    //           if (index === playerIndexWeekly) {
    //             return { ...item, position: playerIndexWeekly };
    //           } else return { ...item };
    //         }
    //       );

    //       setUserDataStar(sortedActiveDataFinal[playerIndex]);
    //       setUserDataStarWeekly(sortedActiveDataFinalWeekly[playerIndexWeekly]);

    //       if (goldenPassRemainingTime) {
    //         setDataAmountStar(
    //           sortedActiveDataFinal[playerIndex].statValue !== 0
    //             ? playerIndex > 100
    //               ? 0
    //               : playerIndex === 100
    //               ? Number(monthlyStarPrizes[99]) +
    //                 Number(monthlyStarPrizes[99])
    //               : Number(monthlyStarPrizes[playerIndex]) +
    //                 Number(monthlyStarPrizes[playerIndex])
    //             : 0
    //         );
    //         setDataAmountStarWeekly(
    //           sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
    //             ? playerIndexWeekly > 100
    //               ? 0
    //               : playerIndexWeekly === 100
    //               ? Number(weeklyStarPrizes[99]) + Number(weeklyStarPrizes[99])
    //               : Number(weeklyStarPrizes[playerIndexWeekly]) +
    //                 Number(weeklyStarPrizes[playerIndexWeekly])
    //             : 0
    //         );
    //       } else if (!goldenPassRemainingTime) {
    //         setDataAmountStar(
    //           sortedActiveDataFinal[playerIndex].statValue !== 0
    //             ? playerIndex > 100
    //               ? 0
    //               : playerIndex === 100
    //               ? Number(monthlyStarPrizes[99])
    //               : Number(monthlyStarPrizes[playerIndex])
    //             : 0
    //         );
    //         setDataAmountStarWeekly(
    //           sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
    //             ? playerIndexWeekly > 100
    //               ? 0
    //               : playerIndexWeekly === 100
    //               ? Number(weeklyStarPrizes[99])
    //               : Number(weeklyStarPrizes[playerIndexWeekly])
    //             : 0
    //         );
    //       }

    //       setAllStarData((prevData) => ({
    //         ...prevData,
    //         activeData: sortedActiveDataFinal,
    //         activeDataWeekly: sortedActiveDataFinalWeekly,

    //         player_data: sortedActiveDataFinal[playerIndex],
    //         player_data_weekly: sortedActiveDataFinalWeekly[playerIndexWeekly],
    //       }));
    //       lastUpdated.current = true; // Mark as updated to avoid repeated updates
    //     }
    //   } else {
    //     if (isUserInTop100(updatedActiveData, userId)) {
    //       const userIndex = updatedActiveData.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       updatedActiveData[userIndex] = addPointsForPremium(
    //         updatedActiveData[userIndex],
    //         0
    //       );
    //       userUpdated = true;
    //     } else if (
    //       userDataStar.statValue !== undefined &&
    //       userDataStarWeekly.statValue !== undefined
    //     ) {
    //       // User not in top 100, add points and check ranking again

    //       const updatedUser = addPointsForPremium(userDataStar, 0);
    //       updatedActiveData.push(updatedUser);
    //       userUpdated = true;
    //     }

    //     if (isUserInTop100(updatedActiveDataWeekly, userId)) {
    //       const userIndex = updatedActiveDataWeekly.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       updatedActiveDataWeekly[userIndex] = addPointsForPremium(
    //         updatedActiveDataWeekly[userIndex],
    //         0
    //       );
    //       userUpdatedWeekly = true;
    //     } else if (userDataStarWeekly.statValue !== undefined) {
    //       const updatedWeeklyUser = addPointsForPremium(userDataStarWeekly, 0);
    //       updatedActiveDataWeekly.push(updatedWeeklyUser);
    //       userUpdatedWeekly = true;
    //     }

    //     if (userUpdated || userUpdatedWeekly) {
    //       const sortedActiveData = updateLeaderboard2(updatedActiveData);
    //       const playerIndex = sortedActiveData.findIndex(
    //         (item) => item.playerId === userId
    //       );
    //       const sortedActiveDataFinal = sortedActiveData.map((item, index) => {
    //         if (index === playerIndex) {
    //           return { ...item, position: playerIndex };
    //         } else return { ...item };
    //       });

    //       const sortedActiveDataWeekly = updateLeaderboard2(
    //         updatedActiveDataWeekly
    //       );

    //       const playerIndexWeekly = sortedActiveDataWeekly.findIndex(
    //         (item) => item.playerId === userId
    //       );

    //       const sortedActiveDataFinalWeekly = sortedActiveDataWeekly.map(
    //         (item, index) => {
    //           if (index === playerIndexWeekly) {
    //             return { ...item, position: playerIndexWeekly };
    //           } else return { ...item };
    //         }
    //       );

    //       setUserDataStar(sortedActiveDataFinal[playerIndex]);
    //       setUserDataStarWeekly(sortedActiveDataFinalWeekly[playerIndexWeekly]);

    //       if (goldenPassRemainingTime) {
    //         setDataAmountStar(
    //           sortedActiveDataFinal[playerIndex].statValue !== 0
    //             ? playerIndex > 100
    //               ? 0
    //               : playerIndex === 100
    //               ? Number(monthlyStarPrizes[99]) +
    //                 Number(monthlyStarPrizes[99])
    //               : Number(monthlyStarPrizes[playerIndex]) +
    //                 Number(monthlyStarPrizes[playerIndex])
    //             : 0
    //         );
    //         setDataAmountStarWeekly(
    //           sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
    //             ? playerIndexWeekly > 100
    //               ? 0
    //               : playerIndexWeekly === 100
    //               ? Number(weeklyStarPrizes[99]) + Number(weeklyStarPrizes[99])
    //               : Number(weeklyStarPrizes[playerIndexWeekly]) +
    //                 Number(weeklyStarPrizes[playerIndexWeekly])
    //             : 0
    //         );
    //       } else if (!goldenPassRemainingTime) {
    //         setDataAmountStar(
    //           sortedActiveDataFinal[playerIndex].statValue !== 0
    //             ? playerIndex > 100
    //               ? 0
    //               : playerIndex === 100
    //               ? Number(monthlyStarPrizes[99])
    //               : Number(monthlyStarPrizes[playerIndex])
    //             : 0
    //         );
    //         setDataAmountStarWeekly(
    //           sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
    //             ? playerIndexWeekly > 100
    //               ? 0
    //               : playerIndexWeekly === 100
    //               ? Number(weeklyStarPrizes[99])
    //               : Number(weeklyStarPrizes[playerIndexWeekly])
    //             : 0
    //         );
    //       }

    //       setAllStarData((prevData) => ({
    //         ...prevData,
    //         activeData: sortedActiveDataFinal.filter((item)=>{return item.statValue!==0}),
    //         activeDataWeekly: sortedActiveDataFinalWeekly.filter((item)=>{return item.statValue!==0}),

    //         player_data: sortedActiveDataFinal[playerIndex],
    //         player_data_weekly: sortedActiveDataFinalWeekly[playerIndexWeekly],
    //       }));
    //       lastUpdated.current = true; // Mark as updated to avoid repeated updates
    //     }
    //   }
    // }
  }, [
    allStarData.activeData,
    allStarData.activeDataWeekly, // Avoid passing all `allStarData` if only activeData is crucial
    userDataStar,
    userDataStarWeekly,
    userId,
    isPremium,
    activePlayer,
    activePlayerBase,
    activePlayerCore,
    activePlayerManta,
    activePlayerSkale,
    activePlayerViction,
    activePlayerTaiko,
    activePlayerMat,
  ]);

  useEffect(() => {
    setAllBnbData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: bnbStars,
        previous_rewards: bnbStars,
        activeData: dailyrecords,
        previousData: dailyplayerData,
        player_data: userData,
        is_active: activePlayer,
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: weeklyPrizesBnb,
        previous_rewards: weeklyPrizesGolden,
        activeData: weeklyrecords,
        previousData: weeklyplayerData,
        player_data: userDataWeekly,
        is_active: activePlayerWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: monthlyPrizesBnb,
        previous_rewards: monthlyPrizesGolden,
        activeData: monthlyrecords,
        previousData: monthlyplayerData,
        player_data: userDataMonthly,
        is_active: activePlayerMonthly,
      },
    ]);
  }, [
    dailyrecords,
    dailyplayerData,
    userData,
    weeklyrecords,
    weeklyplayerData,
    userDataWeekly,
    monthlyrecords,
    monthlyplayerData,
    userDataMonthly,
  ]);

  useEffect(() => {
    setAllSkaleData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: skaleStars,
        previous_rewards: skaleStars,
        activeData: dailyRecordsSkale,
        previousData: prevDataSkale,
        player_data: userDataSkale,
        is_active: activePlayerSkale, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: updatedSkalePrizesWeekly,
        past_rewards: updatedSkalePrizesWeekly,
        previous_rewards: updatedSkalePrizesWeeklyGolden,
        past_premium_rewards: updatedSkalePrizesWeeklyGolden,

        activeData: weeklyRecordsSkale,
        previousData: prevDataSkaleWeekly,
        player_data: userDataSkaleWeekly,
        is_active: activePlayerSkaleWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: updatedSkalePrizesMonthly,
        past_rewards: skalePrizesMonthly,
        previous_rewards: updatedSkalePrizesMonthlyGolden,
        past_premium_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsSkale,
        previousData: prevDataSkaleMonthly,
        player_data: userDataSkaleMonthly,
        is_active: activePlayerSkaleMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsSkale,
    weeklyRecordsSkale,
    monthlyRecordsSkale,
    userDataSkale,
    activePlayerSkale,
    prevDataSkale,
    prevDataSkaleMonthly,
    prevDataSkaleWeekly,
    userDataSkaleMonthly,
    userDataSkaleWeekly,
  ]);

  useEffect(() => {
    setAllCoreData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsCore,
        previousData: prevDataCore,
        player_data: userDataCore,
        is_active: activePlayerCore, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsCore,
        previousData: prevDataCoreWeekly,
        player_data: userDataCoreWeekly,
        is_active: activePlayerCoreWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsCore,
        previousData: prevDataCoreMonthly,
        player_data: userDataCoreMonthly,
        is_active: activePlayerCoreMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsCore,
    weeklyRecordsCore,
    prevDataCore,
    userDataCore,
    activePlayerCore,
    monthlyRecordsCore,
    prevDataCoreMonthly,
    prevDataCoreWeekly,
    userDataCoreMonthly,
    userDataCoreWeekly,
  ]);

  useEffect(() => {
    setAllVictionData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsViction,
        previousData: prevDataViction,
        player_data: userDataViction,
        is_active: activePlayerViction, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsViction,
        previousData: prevDataVictionWeekly,
        player_data: userDataVictionWeekly,
        is_active: activePlayerVictionWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsViction,
        previousData: prevDataVictionMonthly,
        player_data: userDataVictionMonthly,
        is_active: activePlayerVictionMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsViction,
    weeklyRecordsViction,
    monthlyRecordsViction,
    prevDataViction,
    prevDataVictionWeekly,
    prevDataVictionMonthly,
    userDataViction,
    userDataVictionWeekly,
    userDataVictionMonthly,
    activePlayerViction,
  ]);

  useEffect(() => {
    setAllMantaData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsManta,
        previousData: prevDataManta,
        player_data: userDataManta,
        is_active: activePlayerManta, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsManta,
        previousData: prevDataMantaWeekly,
        player_data: userDataMantaWeekly,
        is_active: activePlayerMantaWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsManta,
        previousData: prevDataMantaMonthly,
        player_data: userDataMantaMonthly,
        is_active: activePlayerMantaMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsManta,
    weeklyRecordsManta,
    monthlyRecordsManta,
    prevDataManta,
    prevDataMantaWeekly,
    prevDataMantaMonthly,
    userDataManta,
    userDataMantaWeekly,
    userDataMantaMonthly,
    activePlayerManta,
    activePlayerMantaMonthly,
    activePlayerMantaWeekly,
  ]);

  useEffect(() => {
    setAllSeiData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: seiStars,
        previous_rewards: seiStars,
        activeData: dailyRecordsSei,
        previousData: prevDataSei,
        player_data: userDataSei,
        is_active: activePlayerSei, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsSei,
        previousData: prevDataSeiWeekly,
        player_data: userDataSeiWeekly,
        is_active: activePlayerSeiWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsSei,
        previousData: prevDataSeiMonthly,
        player_data: userDataSeiMonthly,
        is_active: activePlayerSeiMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsSei,
    weeklyRecordsSei,
    monthlyRecordsSei,
    prevDataSei,
    prevDataSeiWeekly,
    prevDataSeiMonthly,
    userDataSei,
    userDataSeiWeekly,
    userDataSeiMonthly,
    activePlayerSei,
    activePlayerSeiMonthly,
    activePlayerSeiWeekly,
  ]);

  useEffect(() => {
    setAllBaseData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsBase,
        previousData: prevDataBase,
        player_data: userDataBase,
        is_active: activePlayerBase, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsBase,
        previousData: prevDataBaseWeekly,
        player_data: userDataBaseWeekly,
        is_active: activePlayerBaseWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsBase,
        previousData: prevDataBaseMonthly,
        player_data: userDataBaseMonthly,
        is_active: activePlayerBaseMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsBase,
    weeklyRecordsBase,
    monthlyRecordsBase,
    prevDataBase,
    prevDataBaseWeekly,
    prevDataBaseMonthly,
    userDataBase,
    userDataBaseWeekly,
    userDataBaseMonthly,
    activePlayerBase,
    activePlayerBaseMonthly,
    activePlayerBaseWeekly,
  ]);

  useEffect(() => {
    setAllTaikoData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: taikoStars,
        previous_rewards: taikoStars,
        activeData: dailyRecordsTaiko,
        previousData: prevDataTaiko,
        player_data: userDataTaiko,
        is_active: activePlayerTaiko, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        previous_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsTaiko,
        previousData: prevDataTaikoWeekly,
        player_data: userDataTaikoWeekly,
        is_active: activePlayerTaikoWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        previous_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsTaiko,
        previousData: prevDataTaikoMonthly,
        player_data: userDataTaikoMonthly,
        is_active: activePlayerTaikoMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsTaiko,
    weeklyRecordsTaiko,
    monthlyRecordsTaiko,
    prevDataTaiko,
    prevDataTaikoWeekly,
    prevDataTaikoMonthly,
    userDataTaiko,
    userDataTaikoWeekly,
    userDataTaikoMonthly,
    activePlayerTaiko,
    activePlayerTaikoMonthly,
    activePlayerTaikoWeekly,
  ]);

  useEffect(() => {
    setAllMatData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: matStars,
        previous_rewards: matStars,
        activeData: dailyRecordsMat,
        previousData: prevDataMat,
        player_data: userDataMat,
        is_active: activePlayerMat, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: weeklyRecordsMat,
        previousData: prevDataMatWeekly,
        player_data: userDataMatWeekly,
        is_active: activePlayerMatWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: monthlyRecordsMat,
        previousData: prevDataMatMonthly,
        player_data: userDataMatMonthly,
        is_active: activePlayerMatMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsMat,
    weeklyRecordsMat,
    monthlyRecordsMat,
    prevDataMat,
    prevDataMatWeekly,
    prevDataMatMonthly,
    userDataMat,
    userDataMatWeekly,
    userDataMatMonthly,
    activePlayerMat,
    activePlayerMatMonthly,
    activePlayerMatWeekly,
  ]);

  const handleSetAvailableTime = (value) => {
    setGoldenPassRemainingTime(value);
  };

  const handleRefreshCountdown700 = async () => {
    let web3 = new Web3(window.ethereum);

    if (coinbase && web3.utils.isAddress(coinbase)) {
      const goldenPassContract = new window.bscWeb3.eth.Contract(
        GOLDEN_PASS_ABI,
        golden_pass_address
      );

      const purchaseTimestamp = await goldenPassContract.methods
        .getTimeOfExpireBuff(coinbase)
        .call();
      const today = new Date();

      if (today.getTime() <= Number(purchaseTimestamp) * 1000) {
        handleSetAvailableTime(purchaseTimestamp);
      }
    }
  };

  const countUserDailyBundles = async (address) => {
    let web3 = new Web3(window.ethereum);
    if (address && web3.utils.isAddress(address)) {
      const result = await axios
        .get(
          `https://api.worldofdypians.com/api/userBundlesCount?walletAddress=${address}`
        )
        .catch((e) => {
          console.error(e);
        });
      if (result && result.status === 200) {
        setuserDailyBundles(result.data);
      }
    }
  };

  const dailyBonusData = {
    eventType: "6 Available Rewards",
    title: "Daily Bonus",
    chain: "BNB Chain, opBNB Chain",
    linkState: "conflux",
    status: "Live",
    id: "event10",
    totalRewards: "$2,000 in CFX Rewards",
    eventDate: "Dec 1, 2023",
  };

  let wethAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  let wcfx = "0xfe97E85d13ABD9c1c33384E796F10B73905637cE";
  let wbase = "0x4200000000000000000000000000000000000006";
  let wbnbAddress = "0x55d398326f99059fF775485246999027B3197955";
  let wavaxAddress = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";
  let wskaleAddress = "0xCC205196288B7A26f6D43bBD68AaA98dde97276d";
  let wseiAddress = "0xB75D0B03c06A926e488e2659DF1A861F860bD3d1";
  let wvictionAddress = "0x381B31409e4D220919B2cFF012ED94d70135A59e";
  let wmantaddress = "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f";
  let wtaikoaddress = "0x2DEF195713CF4a606B49D07E520e22C17899a736";
  let wmataddress = "0xB6dc6C8b71e88642cEAD3be1025565A9eE74d1C6";
  let wcoreAddress = "0x900101d06a7426441ae63e9ab3b9b0f63be145f1";

  const dailyPrizes = [10, 8, 5, 5, 0, 0, 0, 0, 0, 0];
  const dailyPrizesGolden = [10, 8, 5, 5, 5, 5, 5, 5, 5, 5];
  const weeklyPrizes = [25, 15, 10, 8, 0, 0, 0, 0, 0, 0];
  const monthlyPrizes = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const dummyPremiums = [
    {
      chestTitle: "Jewel Coffer",
      closedImg: "greenCrystal",
      chestId: 1,
    },
    {
      chestTitle: "Gold Hoard",
      closedImg: "blueCrystal",
      chestId: 2,
    },
    {
      chestTitle: "Pirate's Bounty",
      closedImg: "yellowCrystal",
      chestId: 3,
    },
    {
      chestTitle: "Gem Trove",
      closedImg: "purpleCrystal",
      chestId: 4,
    },
    {
      chestTitle: "Coin Chest",
      closedImg: "cyanCrystal",
      chestId: 5,
    },
    {
      chestTitle: "Silver Cache",
      closedImg: "greenCrystal",
      chestId: 6,
    },
    {
      chestTitle: "Ruby Stash",
      closedImg: "blueCrystal",
      chestId: 7,
    },
    {
      chestTitle: "Mystic Reliquary",
      closedImg: "yellowCrystal",
      chestId: 8,
    },
    {
      chestTitle: "Ancient Relics",
      closedImg: "purpleCrystal",
      chestId: 9,
    },
    {
      chestTitle: "Emerald Trove",
      closedImg: "cyanCrystal",
      chestId: 10,
    },
  ];

  const getRankData = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/userRanks/${coinbase}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((data) => {
        setRankData(data.data);
      })
      .catch(async (err) => {
        if (err.response.status === 404) {
          await axios
            .post(
              `https://api.worldofdypians.com/api/addUserRank`,
              {
                walletAddress: coinbase,
              },
              {
                headers: { Authorization: `Bearer ${authToken}` },
              }
            )
            .then(async (data) => {
              const response2 = await axios.get(
                `https://api.worldofdypians.com/api/userRanks/${coinbase}`
              );
              setRankData(response2.data.data);
            });
        }
      });
  };

  const metaverseBenefits = [
    "Exclusive access to World of Dypians",
    "Access to Daily Bonus Event",
    "Access every Treasure Hunt Event without the need to hold a Beta Pass NFT",
    "Earn extra daily stars to boost your Global Rank",
  ];

  const dappsBenefits = [
    "DYP Tools administrative dashboard",
    "Voting capabilities in the News section",
    "Priority access to dedicated DeFi pools",
    "Early access to upcoming features and updates",
  ];

  const override2 = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
    top: "30%",
    left: "40%",
    position: "absolute",
  };

  const onOpenNfts = () => {
    setShowNfts(!showNfts);
  };

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const fetchReleases = async () => {
    const newReleases = await axios
      .get("https://api3.dyp.finance/api/wod_releases")
      .then((res) => {
        return res.data;
      });

    const datedReleasedNews = newReleases.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    setLatestVersion(datedReleasedNews[0]?.version);
  };

  //land only stakes
  const getStakesIdsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );
  let web3 = new Web3(window.ethereum); 
 if (address && web3.utils.isAddress(address)) {
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  } else return [];
  };

  const getmyWodStakes = async () => {
    let myStakes = await getStakesIdsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);

      stakes.reverse();
      setLandStakes(stakes);
    } else setLandStakes([]);
  };

  const getCawsStakesIdsCawsWod = async () => {
    const address = coinbase;

    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );
    let web3 = new Web3(window.ethereum); 
    if (address && web3.utils.isAddress(address)) {
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
    } else return [];
  };

  const getWodStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );
    let web3 = new Web3(window.ethereum); 
    if (address && web3.utils.isAddress(address)) {
    let myStakes = await staking_contract.methods
      .depositsOfWoD(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
    } else return [];
  };

  const getCawsStakesIds = async (address) => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );

    let stakenft = [];
    let web3 = new Web3(window.ethereum); 
    if (address && web3.utils.isAddress(address)) {
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
    } else return [];
  };

  const getLandPremiumStakesIds = async (address) => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDPREMIUM_ABI,
      window.config.nft_land_premiumstake_address
    );

    let stakenft = [];
    let web3 = new Web3(window.ethereum); 
    if (address && web3.utils.isAddress(address)) {
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
    } else return [];
  };

  const calculateAllRewardsCawsPremium = async (address) => {
    let myStakes = await getCawsStakesIds(address);
    let result = 0;
    let calculateRewards = [];
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );

    if (address !== null) {
      if (myStakes && myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setcawsPremiumRewards(result);
  };

  const calculateAllRewardsLandPremium = async (address) => {
    let myStakes = await getLandPremiumStakesIds(address);
    let result = 0;
    let calculateRewards = [];
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDPREMIUM_ABI,
      window.config.nft_land_premiumstake_address
    );

    if (address !== null) {
      if (myStakes && myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setlandPremiumRewards(result);
  };

  const getmyCawsWodStakes = async () => {
    let myCawsStakes = await getCawsStakesIdsCawsWod();

    let myWodStakes = await getWodStakesIdsCawsWod();

    if (myCawsStakes && myCawsStakes.length > 0) {
      let stakes = myCawsStakes.map((stake) => window.getNft(stake));
      let landstakes = myWodStakes.map((stake) => window.getLandNft(stake));

      stakes = await Promise.all(stakes);
      landstakes = await Promise.all(landstakes);

      stakes.reverse();
      landstakes.reverse();

      setMyCawsWodStakes(stakes);
      setmyWodWodStakesAll(landstakes);
    } else {
      setMyCawsWodStakes([]);
      setmyWodWodStakesAll([]);
    }
  };

  async function connectWallet() {
    setIsOnLink(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum?.enable();
        console.log("Connected!");
        if (window.ethereum.isCoin98) {
          window.WALLET_TYPE = "coin98";
        }
        if (window.ethereum.isMetaMask) {
          window.WALLET_TYPE = "metamask";
        }
        let coinbase_address;
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((data) => {
            coinbase_address = data[0];
          });
        // window.coinbase_address = coinbase_address.pop();
        await generateNonce({
          variables: {
            publicAddress: coinbase_address,
          },
        }).then(() => {
          setshowWalletModal(false);
        });
        return true;
      } catch (e) {
        console.error(e);
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", e);
        throw new Error("User denied wallet connection!");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("connected to old web3");
      // onConnect();
      return true;
    } else {
      throw new Error("No web3 detected!");
    }
  }

  const handleFirstTask = async (wallet) => {
    const result2 = await axios
      .get(`https://api.worldofdypians.com/api/dappbay/task1/${wallet}`)
      .catch((e) => {
        console.error(e);
      });

    if (result2 && result2.status === 200) {
      console.log(result2.data.result);
      setTimeout(() => {
        if (isonlink) {
          window.location.reload();
        }
      }, 2000);
    }
  };

  const signWalletPublicAddress = async () => {
    if (window.ethereum && window.WALLET_TYPE !== "binance") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);

        const signature = await signer.signMessage(
          `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
        );

        verifyWallet({
          variables: {
            publicAddress: account,
            signature: signature,
          },
        }).then(() => {
          onManageLogin(
            signature,
            `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
          );

          setsyncStatus("success");
          setTimeout(() => {
            setshowSyncModal(false);
            setsyncStatus("initial");
            onCloseSync();
          }, 1000);
          onSubscribeSuccess(account);

          if (isonlink) {
            handleFirstTask(account);
          }
        });
      } catch (error) {
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          onCloseSync();
        }, 3000);

        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
      }
    } else if (binanceWallet && binanceW3WProvider) {
      try {
        const provider = binanceW3WProvider;
        const signer = provider.getSigner();
        const signature = await signer.signMessage(
          `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
        );
        verifyWallet({
          variables: {
            publicAddress: binanceWallet,
            signature: signature,
          },
        }).then(() => {
          setsyncStatus("success");
          setTimeout(() => {
            setshowSyncModal(false);
            setsyncStatus("initial");
            onCloseSync();
          }, 1000);
          onSubscribeSuccess(binanceWallet);

          if (isonlink) {
            handleFirstTask(binanceWallet);
          }
        });
      } catch (error) {
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          onCloseSync();
        }, 3000);

        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
      }
    }
  };

  // const fetchMonthlyRecordsAroundPlayer = async (userId, userName) => {
  //   const data = {
  //     StatisticName: "MonthlyLeaderboard",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );

  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === userName
  //   );

  // };

  const fetchMonthlyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (goldenPassRemainingTime) {
        setUserRank2(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(monthlyPrizesBnb[9]) + Number(monthlyPrizesGolden[9])
              : Number(monthlyPrizesBnb[userPosition]) +
                Number(monthlyPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setUserRank2(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(monthlyPrizesBnb[9])
              : Number(monthlyPrizesBnb[userPosition])
            : 0
        );
      }

      setUserRank(testArray[0].position);
      setUserBnbScore(testArray[0].statValue);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerMonthly(true);
          setUserDataMonthly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerMonthly(false);
          setUserDataMonthly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerMonthly(false);
        setUserDataMonthly(...testArray);
      }
    }
  };

  // const fetchSkaleRecordsAroundPlayer = async (userId, userName) => {
  //   const data = {
  //     StatisticName: "LeaderboardSkaleMonthly",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );

  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === userName
  //   );
  //   const userPosition = testArray[0].position;
  //   // console.log(userPosition)

  //   if (goldenPassRemainingTime) {
  //     setUserRank2Skale(
  //       testArray[0].statValue !== 0
  //         ? userPosition > 10
  //           ? 0
  //           : userPosition === 10
  //           ? monthlyPrizes[9] + monthlyPrizesGolden[9]
  //           : monthlyPrizes[userPosition] + monthlyPrizesGolden[userPosition]
  //         : 0
  //     );
  //   } else if (!goldenPassRemainingTime) {
  //     setUserRank2Skale(
  //       testArray[0].statValue !== 0
  //         ? userPosition > 10
  //           ? 0
  //           : userPosition === 10
  //           ? monthlyPrizes[9]
  //           : monthlyPrizes[userPosition]
  //         : 0
  //     );
  //   }

  //   setUserRankSkale(testArray[0].position);
  //   setUserSkaleScore(testArray[0].statValue);
  // };

  const calculatePremiumDiscount = async (wallet) => {
    // if (chainId === 56) {
    const premiumSc = new window.bscWeb3.eth.Contract(
      window.SUBSCRIPTION_NEWBNB2_ABI,
      window.config.subscription_newbnb2_address
    );

    const premiumSc_viction = new window.victionWeb3.eth.Contract(
      window.SUBSCRIPTION_VICTION_ABI,
      window.config.subscription_viction_address
    );

    const premiumSc_taiko = new window.taikoWeb3.eth.Contract(
      window.SUBSCRIPTION_TAIKO_ABI,
      window.config.subscription_taiko_address
    );

    const premiumSc_mat = new window.matWeb3.eth.Contract(
      window.SUBSCRIPTION_MAT_ABI,
      window.config.subscription_mat_address
    );

    const nftContract = new window.bscWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    const nftContract_viction = new window.victionWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
    );

    const nftContract_taiko = new window.taikoWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
      window.config.nft_dypius_premium_taiko_address
    );

    const nftContract_mat = new window.matWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_mat_address
    );

    let web3 = new Web3(window.ethereum);
    if (wallet && web3.utils.isAddress(wallet)) {
      const result = await nftContract.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_viction = await nftContract_viction.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_taiko = await nftContract_taiko.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_mat = await nftContract_mat.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount = await premiumSc.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_viction = await premiumSc_viction.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_taiko = await premiumSc_taiko.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_mat = await premiumSc_mat.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const nftObject = await premiumSc.methods
        .nftDiscounts(window.config.nft_dypius_premium_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_viction = await premiumSc_viction.methods
        .nftDiscounts(window.config.nft_dypius_premium_viction_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_taiko = await premiumSc_taiko.methods
        .nftDiscounts(window.config.nft_dypius_premium_taiko_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_mat = await premiumSc_mat.methods
        .nftDiscounts(window.config.nft_dypius_premium_mat_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      if (result && parseInt(result) > 0) {
        const tokenId = await nftContract.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject) {
          setnftDiscountObject(nftObject);
          if (discount) {
            setdiscountPercentage(
              Math.max(
                parseInt(discount),
                parseInt(nftObject.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenId(tokenId);
        setnftPremium_total(parseInt(result));
      } else if (result_viction && parseInt(result_viction) > 0) {
        const tokenId = await nftContract_viction.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_viction) {
          setnftDiscountObjectViction(nftObject_viction);
          if (discount_viction) {
            setdiscountPercentageViction(
              Math.max(
                parseInt(discount_viction),
                parseInt(nftObject_viction.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdViction(tokenId);
        setnftPremium_totalViction(parseInt(result_viction));
      } else if (result_taiko && parseInt(result_taiko) > 0) {
        const tokenId = await nftContract_taiko.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_taiko) {
          setnftDiscountObjectTaiko(nftObject_taiko);
          if (discount_taiko) {
            setdiscountPercentageTaiko(
              Math.max(
                parseInt(discount_taiko),
                parseInt(nftObject_taiko.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdTaiko(tokenId);
        setnftPremium_totalTaiko(parseInt(result_taiko));
      } else if (result_mat && parseInt(result_mat) > 0) {
        const tokenId = await nftContract_mat.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_mat) {
          setnftDiscountObjectMat(nftObject_mat);
          if (discount_mat) {
            setdiscountPercentageMat(
              Math.max(
                parseInt(discount_mat),
                parseInt(nftObject_mat.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdMat(tokenId);
        setnftPremium_totalMat(parseInt(result_mat));
      } else {
        setnftPremium_tokenId(0);
        setnftPremium_total(0);
        setnftPremium_tokenIdViction(0);
        setnftPremium_totalViction(0);
        setnftPremium_tokenIdTaiko(0);
        setnftPremium_totalTaiko(0);

        setnftPremium_tokenIdMat(0);
        setnftPremium_totalMat(0);

        if (discount) {
          setdiscountPercentage(parseInt(discount));
        } else if (discount_viction) {
          setdiscountPercentageViction(parseInt(discount_viction));
        } else if (discount_taiko) {
          setdiscountPercentageTaiko(parseInt(discount_taiko));
        } else if (discount_mat) {
          setdiscountPercentageMat(parseInt(discount_mat));
        }
      }
    } else {
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
      setnftPremium_tokenIdViction(0);
      setnftPremium_totalViction(0);
      setnftPremium_tokenIdTaiko(0);
      setnftPremium_totalTaiko(0);

      setnftPremium_tokenIdMat(0);
      setnftPremium_totalMat(0);
    }

    // } else setdiscountPercentage(0);
  };

  const fetchGenesisAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );

    setGenesisRank2(testArray[0].statValue);
  };

  const fetchDailyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "DailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;

      if (goldenPassRemainingTime) {
        setdailyplayerDataAmount(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(dailyPrizes[9]) + Number(dailyPrizesGolden[9])
              : Number(dailyPrizes[userPosition]) +
                Number(dailyPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setdailyplayerDataAmount(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(dailyPrizes[9])
              : Number(dailyPrizes[userPosition])
            : 0
        );
      }

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayer(true);
          setUserData([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayer(false);
          setUserData(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayer(false);
        setUserData(...testArray);
      }
    }
  };
  const fetchWeeklyRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].position;
      if (goldenPassRemainingTime) {
        setweeklyplayerDataAmount(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(weeklyPrizesBnb[9]) + Number(weeklyPrizesGolden[9])
              : Number(weeklyPrizesBnb[userPosition]) +
                Number(weeklyPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setweeklyplayerDataAmount(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(weeklyPrizesBnb[9])
              : Number(weeklyPrizesBnb[userPosition])
            : 0
        );
      }

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerWeekly(true);
          setUserDataWeekly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerWeekly(false);
          setUserDataWeekly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerWeekly(false);
        setUserDataWeekly(...testArray);
      }
    }
  };

  const getOpenedChestPerWallet = async () => {
    if (email) {
      if (isPremium) {
        if (
          claimedChests + claimedPremiumChests < 20 ||
          claimedSkaleChests + claimedSkalePremiumChests < 20 ||
          claimedCoreChests + claimedCorePremiumChests < 20 ||
          claimedVictionChests + claimedVictionPremiumChests < 20 ||
          claimedMantaChests + claimedMantaPremiumChests < 20 ||
          claimedBaseChests + claimedBasePremiumChests < 20 ||
          claimedTaikoChests + claimedTaikoPremiumChests < 20 ||
          claimedMatChests + claimedMatPremiumChests < 20 ||
          claimedSeiChests + claimedSeiPremiumChests < 20
        ) {
          setCanBuy(true);
        } else if (
          claimedChests + claimedPremiumChests === 20 &&
          claimedSkaleChests + claimedSkalePremiumChests === 20 &&
          claimedCoreChests + claimedCorePremiumChests === 20 &&
          claimedVictionChests + claimedVictionPremiumChests === 20 &&
          claimedMantaChests + claimedMantaPremiumChests === 20 &&
          claimedBaseChests + claimedBasePremiumChests === 20 &&
          claimedTaikoChests + claimedTaikoPremiumChests === 20 &&
          claimedMatChests + claimedMatPremiumChests === 20 &&
          claimedSeiChests + claimedSeiPremiumChests === 20
        ) {
          setCanBuy(false);
        }
      } else if (!isPremium) {
        if (
          claimedChests < 10 ||
          claimedSkaleChests < 10 ||
          claimedCoreChests < 10 ||
          claimedVictionChests < 10 ||
          claimedMantaChests < 10 ||
          claimedBaseChests < 10 ||
          claimedTaikoChests < 10 ||
          claimedMatChests < 10 ||
          claimedSeiChests < 10
        ) {
          setCanBuy(true);
        } else if (
          claimedChests === 10 &&
          claimedSkaleChests === 10 &&
          claimedCoreChests === 10 &&
          claimedVictionChests === 10 &&
          claimedMantaChests === 10 &&
          claimedBaseChests === 10 &&
          claimedTaikoChests === 10 &&
          claimedMatChests === 10 &&
          claimedSeiChests === 10
        ) {
          setCanBuy(false);
        }
      }
    } else {
      setCanBuy(false);
    }
  };

  const getAllChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "bnb" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedChests(openedChests);
          setclaimedChests(openedStandardChests.length);
          setclaimedPremiumChests(openedPremiumChests.length);
          setallChests(chestOrder);
        }
      }
    }
  };

  const getAllSkaleChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "skale" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedSkaleChests(openedChests);
          setclaimedSkaleChests(openedStandardChests.length);
          setclaimedSkalePremiumChests(openedPremiumChests.length);
          setallSkaleChests(chestOrder);
        }
      }
    }
  };

  const getAllCoreChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "core" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedCoreChests(openedChests);

          setclaimedCoreChests(openedStandardChests.length);
          setclaimedCorePremiumChests(openedPremiumChests.length);
          setallCoreChests(chestOrder);
        }
      }
    }
  };

  const getAllVictionChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "viction" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedVictionChests(openedChests);

          setclaimedVictionChests(openedStandardChests.length);
          setclaimedVictionPremiumChests(openedPremiumChests.length);
          setallVictionChests(chestOrder);
        }
      }
    }
  };

  const getAllMantaChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "manta" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedMantaChests(openedChests);
          setclaimedMantaChests(openedStandardChests.length);
          setclaimedMantaPremiumChests(openedPremiumChests.length);
          setallMantaChests(chestOrder);
        }
      }
    }
  };

  const getAllBaseChests = async (userEmail) => {
    const emailData = { emailAddress: userEmail, chainId: "base" };

    const result = await axios.post(
      "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
      emailData
    );
    if (result.status === 200 && result.data) {
      const chestOrder = result.data.chestOrder;

      let standardChestsArray = [];
      let premiumChestsArray = [];
      let openedChests = [];
      let openedStandardChests = [];
      let openedPremiumChests = [];

      if (chestOrder.length > 0) {
        for (let item = 0; item < chestOrder.length; item++) {
          if (chestOrder[item].chestType === "Standard") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
              }
            }
            premiumChestsArray.push(chestOrder[item]);
          }
        }
        setOpenedBaseChests(openedChests);

        setclaimedBaseChests(openedStandardChests.length);
        setclaimedBasePremiumChests(openedPremiumChests.length);
        setallBaseChests(chestOrder);
      }
    }
  };

  const getAllTaikoChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "taiko" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let standardChestsArray = [];
        let premiumChestsArray = [];
        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedTaikoChests(openedChests);
          setclaimedTaikoChests(openedStandardChests.length);
          setclaimedTaikoPremiumChests(openedPremiumChests.length);
          setallTaikoChests(chestOrder);
        }
      }
    }
  };

  const getAllMatChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "matchain" };

      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
        emailData
      );
      if (result.status === 200 && result.data) {
        const chestOrder = result.data.chestOrder;

        let openedChests = [];
        let openedStandardChests = [];
        let openedPremiumChests = [];

        if (chestOrder.length > 0) {
          for (let item = 0; item < chestOrder.length; item++) {
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedStandardChests.push(chestOrder[item]);
                }
              }
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                {
                  openedChests.push(chestOrder[item]);
                  openedPremiumChests.push(chestOrder[item]);
                }
              }
            }
          }
          setOpenedMatChests(openedChests);
          setclaimedMatChests(openedStandardChests.length);
          setclaimedMatPremiumChests(openedPremiumChests.length);
          setallMatChests(chestOrder);
        }
      }
    }
  };

  const getAllSeiChests = async (userEmail) => {
    const emailData = { emailAddress: userEmail, chainId: "sei" };

    const result = await axios.post(
      "https://worldofdypiansdailybonus.azurewebsites.net/api/GetRewards?=null",
      emailData
    );
    if (result.status === 200 && result.data) {
      const chestOrder = result.data.chestOrder;

      let standardChestsArray = [];
      let premiumChestsArray = [];
      let openedChests = [];
      let openedStandardChests = [];
      let openedPremiumChests = [];

      if (chestOrder.length > 0) {
        for (let item = 0; item < chestOrder.length; item++) {
          if (chestOrder[item].chestType === "Standard") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
              }
            }
            premiumChestsArray.push(chestOrder[item]);
          }
        }
        setOpenedSeiChests(openedChests);

        setclaimedSeiChests(openedStandardChests.length);
        setclaimedSeiPremiumChests(openedPremiumChests.length);
        setallSeiChests(chestOrder);
      }
    }
  };

  const handleShowSyncModal = () => {
    setshowSyncModal(true);
  };

  const handleSync = async () => {
    setsyncStatus("loading");
    let web3 = new Web3(window.ethereum);

    try {
      if (account !== undefined && web3.utils.isAddress(account)) {
        await generateNonce({
          variables: {
            publicAddress: account,
          },
        });
      } else {
        window.alertify.error("Please switch to an EVM wallet.");
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          setshowSyncModal(false);
          onCloseSync();
        }, 3000);
      }
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSyncModal(false);
        onCloseSync();
      }, 3000);
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const getMyNFTS = async (coinbase, type) => {
    let web3 = new Web3(window.ethereum);
    if (coinbase !== undefined && web3.utils.isAddress(coinbase)) {
      return await window.getMyNFTs(coinbase, type);
    } else {
      return [];
    }
  };

  //todo
  const fetchAllMyNfts = async () => {
    countUserDailyBundles(userWallet ? userWallet : coinbase);
    getMyNFTS(userWallet ? userWallet : coinbase, "caws").then((NFTS) =>
      setMyNFTSCaws(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "cawsbnb").then((NFTS) =>
      setMyNFTSCawsBNB(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "cawsbase").then((NFTS) =>
      setMyNFTSCawsBase(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "cawsavax").then((NFTS) =>
      setMyNFTSCawsAvax(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "timepiece").then((NFTS) =>
      setMyNFTSTimepiece(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "land").then((NFTS) =>
      setMyNFTSLand(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "bnb").then((NFTS) => {
      setMyNFTSBNB(NFTS);
    });

    getMyNFTS(userWallet ? userWallet : coinbase, "opbnb").then((NFTS) =>
      setMyNFTSopBNB(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "landbnb").then((NFTS) =>
      setMyNFTSLandBNB(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "landbase").then((NFTS) =>
      setMyNFTSLandBase(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "landavax").then((NFTS) =>
      setMyNFTSLandAvax(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "coingecko").then((NFTS) =>
      setMyNFTSCoingecko(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "gate").then((NFTS) =>
      setmyGateNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "conflux").then((NFTS) =>
      setmyConfluxNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "base").then((NFTS) =>
      setmyBaseNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "doge").then((NFTS) =>
      setmyDogeNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "cmc").then((NFTS) =>
      setmyCmcNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "core").then((NFTS) =>
      setmyCoreNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "viction").then((NFTS) =>
      setmyVictionNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "immutable").then((NFTS) =>
      setmyImmutableNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "multivers").then((NFTS) =>
      setmyMultiversNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "skale").then((NFTS) =>
      setmySkaleNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "manta").then((NFTS) =>
      setmyMantaNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "taiko").then((NFTS) =>
      setmyTaikoNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "mat").then((NFTS) =>
      setmyMatNfts(NFTS)
    );

    getMyNFTS(userWallet ? userWallet : coinbase, "cookie3").then((NFTS) =>
      setmyCookieNfts(NFTS)
    );
    getMyNFTS(userWallet ? userWallet : coinbase, "sei").then((NFTS) =>
      setmySeiNfts(NFTS)
    );
  };

  const windowSize = useWindowSize();

  const getDypBalance = async (account) => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3";
      const token_address_bsc = "0x1a3264f2e7b1cfc6220ec9348d33ccf02af7aaa4";

      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address_bsc);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address_bsc);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );

      const bal1 = await contract1.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    } else {
      setDypBalance(0);
      setDypBalanceBnb(0);
      setDypBalanceAvax(0);
      setiDypBalance(0);
      setiDypBalanceBnb(0);
      setiDypBalanceAvax(0);
    }
  };

  async function fetchUserFavorites(userId) {
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user favorites");
        }
        const data = await response.json();
        // console.log(data.favorites);

        setFavorites(data.favorites);
        return data.favorites;
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
      }
    } else {
      setFavorites([]);
    }
  }

  const getUserRewardData = async (addr) => {
    let web3 = new Web3(window.ethereum);
    if (addr && web3.utils.isAddress(addr)) {
      const result = await axios
        .get(`https://api.worldofdypians.com/api/specialreward/${addr}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .catch((e) => {
          console.error(e);
        });

      if (result && result.status === 200) {
        if (result.data && result.data.rewards && result.data.rewards === 0) {
          setuserSocialRewards(0);
          localStorage.setItem("cacheduserSocialRewards", 0);
        } else if (result.data && !result.data.rewards) {
          let amount = 0;
          for (let i = 0; i < result.data.length; i++) {
            amount += result.data[i].amount;
          }
          localStorage.setItem("cacheduserSocialRewards", amount);
          setuserSocialRewards(amount);
        }
      }
    }
  };

  const handleSubscriptionTokenChange = async (tokenAddress) => {
    const token = tokenAddress;
    if (
      token.toLowerCase() ===
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
    ) {
      if (nftPremium_total > 0) {
        setapproveStatus("initial");
      } else {
        setapproveStatus("deposit");
      }
    }
    let tokenDecimals =
      chainId === 1
        ? window.config.subscriptioneth_tokens[token]?.decimals
        : chainId === 56
        ? window.config.subscriptionbnb_tokens[token]?.decimals
        : chainId === 1030
        ? window.config.subscriptioncfx_tokens[token]?.decimals
        : chainId === 8453
        ? window.config.subscriptionbase_tokens[token]?.decimals
        : chainId === 43114
        ? window.config.subscription_tokens[token]?.decimals
        : chainId === 1482601649
        ? window.config.subscriptionskale_tokens[token]?.decimals
        : chainId === 1116
        ? window.config.subscriptioncore_tokens[token]?.decimals
        : chainId === 1329
        ? window.config.subscriptionsei_tokens[token]?.decimals
        : chainId === 88
        ? window.config.subscriptionviction_tokens[token]?.decimals
        : chainId === 169
        ? window.config.subscriptionmanta_tokens[token]?.decimals
        : chainId === 167000
        ? window.config.subscriptiontaiko_tokens[token]?.decimals
        : chainId === 698
        ? window.config.subscriptionmat_tokens[token]?.decimals
        : window.config.subscriptioncfx_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? // ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
          await window.getEstimatedTokenSubscriptionAmountBNB2(
            token,
            discountPercentage
          )
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 88
        ? await window.getEstimatedTokenSubscriptionAmountViction(
            token,
            discountPercentageViction
          )
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(
            token,
            discountPercentageTaiko
          )
        : chainId === 698
        ? await window.getEstimatedTokenSubscriptionAmountMat(
            token,
            discountPercentageMat
          )
        : chainId === 1329
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    window.web3 = new Web3(window.ethereum);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );

    let web3 = new Web3(window.ethereum);

    if (
      coinbase &&
      window.WALLET_TYPE === "binance" &&
      web3.utils.isAddress(coinbase)
    ) {
      let token_Sc = new ethers.Contract(
        token,
        window.ERC20_ABI,
        binanceW3WProvider.getSigner()
      );
      let tokenBalance2 = await token_Sc.balanceOf(coinbase);
      setTokenBalance(tokenBalance2);
    }

    if (
      coinbase &&
      window.WALLET_TYPE !== "binance" &&
      web3.utils.isAddress(coinbase)
    ) {
      let token_Sc = new window.web3.eth.Contract(window.ERC20_ABI, token);
      let tokenBalance2 = await token_Sc.methods
        .balanceOf(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
        });
      setTokenBalance(tokenBalance2);
    }
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
  };

  const handleApprove = async (e) => {
    // e.preventDefault();
    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;

    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;
    const matsubscribeAddress = window.config.subscription_mat_address;
    const coresubscribeAddress = window.config.subscription_core_address;

    window.web3 = new Web3(window.ethereum);

    setloadspinner(true);

    const nftContract_viction = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
    );

    const nftContract_taiko = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
      window.config.nft_dypius_premium_taiko_address
    );

    const nftContract_mat = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_mat_address
    );

    if (chainId === 56 && nftPremium_total > 0) {
      if (window.WALLET_TYPE !== "binance") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        let nftContract = new window.web3.eth.Contract(
          window.NFT_DYPIUS_PREMIUM_ABI,
          window.config.nft_dypius_premium_address
        );

        if (approveStatus === "initial") {
          await nftContract.methods
            .approve(
              window.config.subscription_newbnb2_address,
              nftPremium_tokenId
            )
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              if (discountPercentage < 100) {
                if (
                  selectedSubscriptionToken.toLowerCase() ===
                  "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
                ) {
                  setapproveStatus("deposit");
                } else setapproveStatus("approveAmount");
              } else {
                setapproveStatus("deposit");
              }
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        } else if (approveStatus === "approveAmount") {
          await tokenContract.methods
            .approve(bnbsubscribeAddress, price)
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        }
      } else if (window.WALLET_TYPE === "binance") {
        let tokenContract_binance = new ethers.Contract(
          selectedSubscriptionToken,
          window.ERC20_ABI,
          binanceW3WProvider.getSigner()
        );

        let nftContract_binance = new ethers.Contract(
          window.config.nft_dypius_premium_address,
          window.NFT_DYPIUS_PREMIUM_ABI,
          binanceW3WProvider.getSigner()
        );

        if (approveStatus === "initial") {
          const txResponse = await nftContract_binance
            .approve(
              window.config.subscription_newbnb2_address,
              nftPremium_tokenId,
              { from: coinbase }
            )
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentage < 100) {
              if (
                selectedSubscriptionToken.toLowerCase() ===
                "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
              ) {
                setapproveStatus("deposit");
              } else setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          }
        } else if (approveStatus === "approveAmount") {
          const txResponse = await tokenContract_binance
            .approve(bnbsubscribeAddress, price, { from: coinbase })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          }
        }
      }
    } else if (
      chainId === 88 &&
      nftPremium_totalViction > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_viction.methods
          .approve(
            window.config.subscription_viction_address,
            nftPremium_tokenIdViction
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageViction < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(victionsubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else if (
      chainId === 167000 &&
      nftPremium_totalTaiko > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_taiko.methods
          .approve(
            window.config.subscription_taiko_address,
            nftPremium_tokenIdTaiko
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageTaiko < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(taikosubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else if (
      chainId === 698 &&
      nftPremium_totalMat > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_mat.methods
          .approve(
            window.config.subscription_mat_address,
            nftPremium_tokenIdMat
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageMat < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(matsubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else {
      if (window.WALLET_TYPE !== "binance") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods

          .approve(
            chainId === 1
              ? ethsubscribeAddress
              : chainId === 56
              ? bnbsubscribeAddress
              : chainId === 1030
              ? cfxsubscribeAddress
              : chainId === 8453
              ? basesubscribeAddress
              : chainId === 43114
              ? avaxsubscribeAddress
              : chainId === 1482601649
              ? skalesubscribeAddress
              : chainId === 88
              ? victionsubscribeAddress
              : chainId === 169
              ? mantasubscribeAddress
              : chainId === 167000
              ? taikosubscribeAddress
              : chainId === 698
              ? matsubscribeAddress
              : chainId === 1116
              ? coresubscribeAddress
              : chainId === 1329
              ? seisubscribeAddress
              : cfxsubscribeAddress,
            price
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (window.WALLET_TYPE === "binance") {
        let tokenContract_binance = new ethers.Contract(
          selectedSubscriptionToken,
          window.ERC20_ABI,
          binanceW3WProvider.getSigner()
        );

        const txResponse = await tokenContract_binance
          .approve(
            chainId === 1
              ? ethsubscribeAddress
              : chainId === 56
              ? bnbsubscribeAddress
              : chainId === 1030
              ? cfxsubscribeAddress
              : chainId === 8453
              ? basesubscribeAddress
              : chainId === 43114
              ? avaxsubscribeAddress
              : chainId === 1482601649
              ? skalesubscribeAddress
              : chainId === 88
              ? victionsubscribeAddress
              : chainId === 169
              ? mantasubscribeAddress
              : chainId === 167000
              ? taikosubscribeAddress
              : chainId === 1116
              ? coresubscribeAddress
              : chainId === 1329
              ? seisubscribeAddress
              : cfxsubscribeAddress,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        }
      }
    }
  };

  const handleUpdatePremiumUser = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/sub/${wallet}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const web3eth = new Web3(window.config.infura_endpoint);
    const bscWeb3 = new Web3(window.config.bsc_endpoint);
    const avaxWeb3 = new Web3(window.config.avax_endpoint);

    const cfxWeb3 = new Web3(window.config.conflux_endpoint);
    const baseWeb3 = new Web3(window.config.base_endpoint);
    const skaleWeb3 = new Web3(window.config.skale_endpoint);
    const seiWeb3 = new Web3(window.config.sei_endpoint);
    const coreWeb3 = new Web3(window.config.core_endpoint);
    const victionWeb3 = new Web3(window.config.viction_endpoint);
    const mantaWeb3 = new Web3(window.config.manta_endpoint);
    const taikoWeb3 = new Web3(window.config.taiko_endpoint);
    const matWeb3 = new Web3(window.config.mat_endpoint);

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const coresubscribeAddress = window.config.subscription_core_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;
    const matsubscribeAddress = window.config.subscription_mat_address;

    const subscribeToken = token;
    const subscribeTokencontract = new web3eth.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbnb = new bscWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractavax = new avaxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractcfx = new cfxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbase = new baseWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractskale = new skaleWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractsei = new seiWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractcore = new coreWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractviction = new victionWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractmanta = new mantaWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );
    const subscribeTokencontracttaiko = new taikoWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractmat = new matWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB2(
            token,
            discountPercentage
          )
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : chainId === 88
        ? await window.getEstimatedTokenSubscriptionAmountViction(
            token,
            discountPercentageViction
          )
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(
            token,
            discountPercentageTaiko
          )
        : chainId === 698
        ? await window.getEstimatedTokenSubscriptionAmountMat(
            token,
            discountPercentageMat
          )
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 1329
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let web3 = new Web3(window.ethereum);

    if (coinbase && web3.utils.isAddress(coinbase)) {
      if (chainId === 1) {
        const result = await subscribeTokencontract.methods
          .allowance(coinbase, ethsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 169) {
        const result = await subscribeTokencontractmanta.methods
          .allowance(coinbase, mantasubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1116) {
        const result = await subscribeTokencontractcore.methods
          .allowance(coinbase, coresubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1329) {
        const result = await subscribeTokencontractsei.methods
          .allowance(coinbase, seisubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 56) {
        if (nftPremium_total > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_ABI,
            window.config.nft_dypius_premium_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenId)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, bnbsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === bnbsubscribeAddress.toLowerCase() ||
            approvedAll
          ) {
            if (discountPercentage < 100) {
              if (
                token.toLowerCase() ===
                "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
              ) {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("deposit");
              } else {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("approveAmount");
              }
            } else {
              setloadspinner(false);
              setisApproved(false);
              setapproveStatus("initial");
            }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          if (
            token.toLowerCase() ===
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
          ) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else {
            const result = await subscribeTokencontractbnb.methods
              .allowance(coinbase, bnbsubscribeAddress)
              .call()
              .then();

            if (result != 0 && Number(result) >= Number(tokenprice)) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            } else if (result == 0 || Number(result) < Number(tokenprice)) {
              setloadspinner(false);
              setisApproved(false);
              setapproveStatus("initial");
            }
          }
        }
      } else if (chainId === 88) {
        if (nftPremium_totalViction > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
            window.config.nft_dypius_premium_viction_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdViction)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, victionsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === victionsubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageViction === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
            // if (discountPercentageViction < 100) {
            //   setloadspinner(false);
            //   setisApproved(true);
            //   setapproveStatus("approveAmount");
            // } else {
            //   setloadspinner(false);
            //   setisApproved(false);
            //   setapproveStatus("initial");
            // }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontractviction.methods
            .allowance(coinbase, victionsubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 167000) {
        if (nftPremium_totalTaiko > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
            window.config.nft_dypius_premium_taiko_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdTaiko)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, taikosubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === taikosubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageTaiko === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
            // if (discountPercentageTaiko < 100) {
            //   setloadspinner(false);
            //   setisApproved(true);
            //   setapproveStatus("approveAmount");
            // } else {
            //   setloadspinner(false);
            //   setisApproved(false);
            //   setapproveStatus("initial");
            // }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontracttaiko.methods
            .allowance(coinbase, taikosubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 698) {
        if (nftPremium_totalMat > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            window.config.nft_dypius_premium_mat_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdMat)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, matsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === matsubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageMat === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontractmat.methods
            .allowance(coinbase, matsubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 43114) {
        const result = await subscribeTokencontractavax.methods
          .allowance(coinbase, avaxsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1482601649) {
        const result = await subscribeTokencontractskale.methods
          .allowance(coinbase, skalesubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1030) {
        const result = await subscribeTokencontractcfx.methods
          .allowance(coinbase, confluxsubscribeAddress)
          .call()
          .then();

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 8453) {
        const result = await subscribeTokencontractbase.methods
          .allowance(coinbase, basesubscribeAddress)
          .call()
          .then();

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      }
    }
  };

  const getContractBinance = async ({ key, address = null, ABI = null }) => {
    ABI = window[key + "_ABI"];
    address = window.config[key.toLowerCase() + "_address"];
    if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
      window.cached_contracts[key + "-" + address?.toLowerCase()] =
        new ethers.Contract(address, ABI, binanceW3WProvider.getSigner());
    }
    return window.cached_contracts[key + "-" + address.toLowerCase()];
  };

  const handleSubscribe = async (e) => {
    // e.preventDefault();
    if (window.WALLET_TYPE !== "binance") {
      let subscriptionContract = await window.getContract({
        key:
          chainId === 1
            ? "SUBSCRIPTION_NEWETH"
            : chainId === 56
            ? "SUBSCRIPTION_NEWBNB2"
            : chainId === 43114
            ? "SUBSCRIPTION_NEWAVAX"
            : chainId === 1030
            ? "SUBSCRIPTION_CFX"
            : chainId === 8453
            ? "SUBSCRIPTION_BASE"
            : chainId === 1482601649
            ? "SUBSCRIPTION_SKALE"
            : chainId === 88
            ? "SUBSCRIPTION_VICTION"
            : chainId === 169
            ? "SUBSCRIPTION_MANTA"
            : chainId === 167000
            ? "SUBSCRIPTION_TAIKO"
            : chainId === 698
            ? "SUBSCRIPTION_MAT"
            : chainId === 1116
            ? "SUBSCRIPTION_CORE"
            : chainId === 1329
            ? "SUBSCRIPTION_SEI"
            : "",
      });
      const today = Date.now();
      setloadspinnerSub(true);

      if (chainId === 56 && nftPremium_total > 0) {
        await window
          .subscribeNFT(
            nftDiscountObject.nftAddress,
            nftPremium_tokenId,
            selectedSubscriptionToken,
            price
          )
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : chainId === 167000
                  ? "taiko"
                  : "";

              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "bnb subscribeNFT",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 2000);
          })
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else if (
        chainId === 56 &&
        selectedSubscriptionToken.toLowerCase() ===
          "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
      ) {
        await subscriptionContract.methods
          .subscribeWithBNB()
          .send({ from: await window.getCoinbase(), value: price })
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : chainId === 167000
                  ? "taiko"
                  : "";
              setselectedChainforPremium(selectedchain);
            }
            setloadspinnerSub(false);
            onSubscribeSuccess();
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "bnb subscribeBNB",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 5000);
            // this.props.onSubscribe();
            // window.location.href = "https://app.dypius.com/account";
          })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else if (chainId === 88 && nftPremium_totalViction > 0) {
        await window
          .subscribeNFTViction(
            nftDiscountObjectViction.nftAddress,
            nftPremium_tokenIdViction,
            selectedSubscriptionToken,
            price
          )
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "viction subscribeNFT",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 2000);
          })
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else if (chainId === 167000 && nftPremium_totalTaiko > 0) {
        await window
          .subscribeNFTTaiko(
            nftDiscountObjectTaiko.nftAddress,
            nftPremium_tokenIdTaiko,
            selectedSubscriptionToken,
            price
          )
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "taiko subscribeNFT",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 2000);
          })
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else if (chainId === 698 && nftPremium_totalMat > 0) {
        await window
          .subscribeNFTMat(
            nftDiscountObjectMat.nftAddress,
            nftPremium_tokenIdMat,
            selectedSubscriptionToken,
            price
          )
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 698
                  ? "matchain"
                  : chainId === 1329
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "tamchain subscribeNFT",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 2000);
          })
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else {
        await subscriptionContract.methods
          .subscribe(selectedSubscriptionToken, price)
          .send({ from: await window.getCoinbase() })
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.transactionHash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : chainId === 167000
                  ? "taiko"
                  : "";
              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
                onSubscribeSuccess();
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: chainId.toString(),
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
            // this.props.onSubscribe();
            // window.location.href = "https://app.dypius.com/account";
          })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      let subscriptionContract = await getContractBinance({
        key:
          chainId === 1
            ? "SUBSCRIPTION_NEWETH"
            : chainId === 56
            ? "SUBSCRIPTION_NEWBNB2"
            : chainId === 43114
            ? "SUBSCRIPTION_NEWAVAX"
            : chainId === 1030
            ? "SUBSCRIPTION_CFX"
            : chainId === 8453
            ? "SUBSCRIPTION_BASE"
            : chainId === 1482601649
            ? "SUBSCRIPTION_SKALE"
            : chainId === 88
            ? "SUBSCRIPTION_VICTION"
            : chainId === 169
            ? "SUBSCRIPTION_MANTA"
            : chainId === 167000
            ? "SUBSCRIPTION_TAIKO"
            : chainId === 1116
            ? "SUBSCRIPTION_CORE"
            : chainId === 1329
            ? "SUBSCRIPTION_SEI"
            : "",
      });
      const today = Date.now();
      setloadspinnerSub(true);

      if (chainId === 56 && nftPremium_total > 0) {
        let subscriptionContract = await getContractBinance({
          key: "SUBSCRIPTION_NEWBNB2",
        });
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObject.nftAddress,
            nftPremium_tokenId,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          if (dailyBonusPopup === true) {
            setPremiumTxHash(txResponse.hash);
            const selectedchain =
              chainId === 1
                ? "eth"
                : chainId === 56
                ? "bnb"
                : chainId === 43114
                ? "avax"
                : chainId === 1030
                ? "cfx"
                : chainId === 8453
                ? "base"
                : chainId === 1482601649
                ? "skale"
                : chainId === 88
                ? "viction"
                : chainId === 169
                ? "manta"
                : chainId === 167000
                ? "taiko"
                : chainId === 1116
                ? "core"
                : chainId === 1329
                ? "sei"
                : "";
            setselectedChainforPremium(selectedchain);
            setTimeout(() => {
              setgetPremiumPopup(false);
            }, 2000);
          }
          setloadspinnerSub(false);
          handleUpdatePremiumUser(coinbase);
          setapproveStatus("successsubscribe");
          // await axios
          //   .patch(
          //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
          //     {
          //       multiplier: "yes",
          //       chain: "bnb subscribeNFT BinanceWallet",
          //       premiumTimestamp: today.toString(),
          //     },
          //     {
          //       headers: { Authorization: `Bearer ${authToken}` },
          //     }
          //   )
          //   .then(() => {
          //     getRankData();
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //   });
          setTimeout(() => {
            setgetPremiumPopup(false);
            onSubscribeSuccess();
          }, 2000);
        }
      } else if (
        chainId === 56 &&
        selectedSubscriptionToken.toLowerCase() ===
          "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
      ) {
        await subscriptionContract
          .subscribeWithBNB({ from: coinbase, value: price })
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.hash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 167000
                  ? "taiko"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
            }
            setloadspinnerSub(false);
            onSubscribeSuccess();
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: "bnb subscribeBNB BinanceWallet",
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
              setgetPremiumPopup(false);
              onSubscribeSuccess();
            }, 5000);
            // this.props.onSubscribe();
            // window.location.href = "https://app.dypius.com/account";
          })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      } else {
        await subscriptionContract
          .subscribe(selectedSubscriptionToken, price, { from: coinbase })
          .then(async (data) => {
            if (dailyBonusPopup === true) {
              setPremiumTxHash(data.hash);
              const selectedchain =
                chainId === 1
                  ? "eth"
                  : chainId === 56
                  ? "bnb"
                  : chainId === 43114
                  ? "avax"
                  : chainId === 1030
                  ? "cfx"
                  : chainId === 8453
                  ? "base"
                  : chainId === 1482601649
                  ? "skale"
                  : chainId === 88
                  ? "viction"
                  : chainId === 169
                  ? "manta"
                  : chainId === 167000
                  ? "taiko"
                  : chainId === 1116
                  ? "core"
                  : chainId === 1329
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
              setTimeout(() => {
                setgetPremiumPopup(false);
                onSubscribeSuccess();
              }, 2000);
            }
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            // await axios
            //   .patch(
            //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
            //     {
            //       multiplier: "yes",
            //       chain: chainId.toString(),
            //       premiumTimestamp: today.toString(),
            //     },
            //     {
            //       headers: { Authorization: `Bearer ${authToken}` },
            //     }
            //   )
            //   .then(() => {
            //     getRankData();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //   });
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
            // this.props.onSubscribe();
            // window.location.href = "https://app.dypius.com/account";
          })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
      }
    }
  };

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(1);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(1);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(1);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

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

  const handleAvaxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0xa86a")
          .then(() => {
            handleSwitchNetwork(43114);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(43114);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(43114);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(43114);
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

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(1030);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(1030);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(1030);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
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
          "This network is not available on Binance Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      window.alertify.error("This network is not available on Binance Wallet");
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleCorePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x45c")
          .then(() => {
            handleSwitchNetwork(1116);
            setChainDropdown(chainDropdowns[6]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleVictionPool = async () => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        await handleSwitchNetworkhook("0x58")
          .then(() => {
            handleSwitchNetwork(88);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        handleSwitchChainGateWallet(88);
      } else if (
        window.ethereum?.isBinance ||
        window.WALLET_TYPE === "binance"
      ) {
        window.alertify.error(
          "This network is not available on Binance Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(88);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleSeiPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x531")
          .then(() => {
            handleSwitchNetwork(1329);
            setChainDropdown(chainDropdowns[11]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
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

  const handleTaikoPool = async () => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        await handleSwitchNetworkhook("0x28c58")
          .then(() => {
            handleSwitchNetwork(167000);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        handleSwitchChainGateWallet(167000);
      } else if (
        window.ethereum?.isBinance ||
        window.WALLET_TYPE === "binance"
      ) {
        window.alertify.error(
          "This network is not available on Binance Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(167000);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  const userTotalScore =
    userBnbScore +
    userSkaleScore +
    userCoreScore +
    userVictionScore +
    userMantaScore +
    userBaseScore +
    userTaikoScore +
    userMatScore;

  const handleMatPool = async () => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        await handleSwitchNetworkhook("0x2ba")
          .then(() => {
            handleSwitchNetwork(698);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        !window.ethereum?.isBinance
      ) {
        handleSwitchChainGateWallet(698);
      } else if (
        window.ethereum?.isBinance ||
        window.WALLET_TYPE === "binance"
      ) {
        window.alertify.error(
          "This network is not available on Binance Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(698);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleRankRewards = () => {
    const totalScore =
      userBnbScore +
      userSkaleScore +
      userCoreScore +
      userVictionScore +
      userMantaScore +
      userBaseScore +
      userTaikoScore +
      userMatScore;

    const totalScore_multiplied =
      rankData && rankData.multiplier === "yes" ? totalScore * 4 : totalScore;
    if (totalScore_multiplied > 15999999 && totalScore_multiplied < 28000000) {
      setUserRankRewards(5);
    } else if (
      totalScore_multiplied >= 28000000 &&
      totalScore_multiplied < 41000000
    ) {
      setUserRankRewards(10);
    } else if (
      totalScore_multiplied >= 41000000 &&
      totalScore_multiplied < 66000000
    ) {
      setUserRankRewards(25);
    } else if (totalScore_multiplied >= 66000000) {
      setUserRankRewards(100);
    }
  };

  const handleUserRank = () => {
    let allScore;
    if (rankData && rankData.multiplier === "yes") {
      allScore = userTotalScore * 4;
    } else if (rankData && rankData.multiplier === "no") {
      allScore = userTotalScore;
    }
    if (allScore > 65999999) {
      setUserRankName({
        name: "unstoppable",
        id: 4,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(4);
      setUserProgress(100);
    } else if (allScore > 40999999) {
      setUserRankName({
        name: "champion",
        id: 3,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(3);
      setUserProgress((allScore / 66000000) * 100);
    } else if (allScore > 27999999) {
      setUserRankName({
        name: "underdog",
        id: 2,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(2);
      setUserProgress((allScore / 41000000) * 100);
    } else if (allScore > 15999999) {
      setUserRankName({
        name: "rookie",
        id: 1,
      });
      sliderRef?.current?.innerSlider?.slickGoTo(1);
      setUserProgress((allScore / 28000000) * 100);
    } else {
      sliderRef?.current?.innerSlider?.slickGoTo(0);
      setUserProgress((allScore / 16000000) * 100);
    }
  };

  const scrollToElement = () => {
    const element = document.getElementById(eventId);
    if (element && element !== "golden-pass") {
      element.scrollIntoView({
        behavior: "smooth",
        // block: "end",
        // inline: "nearest",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (eventId) {
      scrollToElement();
    } else {
      window.scrollTo(0, 0);
    }
  }, [eventId, eventCardCount]);

  const updateUserRank = async () => {
    if (rankData && userRankName) {
      if (rankData.rank == userRankName.id) {
        return;
      } else if (rankData.rank < userRankName.id) {
        await axios.patch(
          `https://api.worldofdypians.com/api/userRanks/rank/${coinbase}`,
          {
            rank: userRankName.id,
          }
        );
        // .then(async () => {
        //   getRankData();
        // });
      }
    }
  };

  const getTreasureChestsInfo = async () => {
    var moneyResult = 0;

    if (openedChests && openedChests.length > 0) {
      openedChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedSkaleChests && openedSkaleChests.length > 0) {
      openedSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedCoreChests && openedCoreChests.length > 0) {
      openedCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedVictionChests && openedVictionChests.length > 0) {
      openedVictionChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedMantaChests && openedMantaChests.length > 0) {
      openedMantaChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedBaseChests && openedBaseChests.length > 0) {
      openedBaseChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedTaikoChests && openedTaikoChests.length > 0) {
      openedTaikoChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedMatChests && openedMatChests.length > 0) {
      openedMatChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedSeiChests && openedSeiChests.length > 0) {
      openedSeiChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }
    setTreasureRewardMoney(moneyResult);
  };

  // useEffect(() => {
  //   handleRankRewards();
  // }, [
  //   userBnbScore,
  //   userSkaleScore,
  //   userCoreScore,
  //   userVictionScore,
  //   userMantaScore,
  //   userBaseScore,
  //   userTaikoScore,
  //   userMatScore,
  //   rankData,
  // ]);

  // useEffect(() => {
  //   updateUserRank();
  // }, [handleUserRank]);

  // useEffect(() => {
  //   if (coinbase) {
  //     getRankData();
  //   }
  // }, [coinbase]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setDummyPremiumChests(shuffle(dummyPremiums));
    fetchReleases();
    window.scrollTo(0, 0);
    // if (username !== undefined && userId !== undefined) {
    fetchDailyRecords();
    // fetchWeeklyRecords();
    // fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchDailyRecordsCore();
    // fetchWeeklyRecordsCore();
    // fetchMonthlyRecordsCore();
    fetchDailyRecordsViction();
    // fetchWeeklyRecordsViction();
    // fetchMonthlyRecordsViction();
    fetchDailyRecordsManta();
    // fetchWeeklyRecordsManta();
    // fetchMonthlyRecordsManta();

    fetchDailyRecordsSei();
    // fetchWeeklyRecordsSei();
    // fetchMonthlyRecordsSei();

    fetchDailyRecordsBase();
    // fetchWeeklyRecordsBase();
    // fetchMonthlyRecordsBase();
    fetchDailyRecordsTaiko();
    // fetchWeeklyRecordsTaiko();
    // fetchMonthlyRecordsTaiko();

    fetchDailyRecordsMat();
    // fetchWeeklyRecordsMat();
    // fetchMonthlyRecordsMat();

    fetchDailyRecordsSkale();
    // fetchWeeklyRecordsSkale();
    // fetchMonthlyRecordsSkale();
    fetchRecordsStar();
    fetchGreatCollection();
    fetchExplorerHunt();
    fetchRecordsStarWeekly();

    // }
  }, []);

  useEffect(() => {
    if (userWallet && chainId === 1 && window.WALLET_TYPE !== "") {
      calculateAllRewardsCawsPremium(userWallet);
      calculateAllRewardsLandPremium(userWallet);
    }
  }, [userWallet, chainId]);

  useEffect(() => {
    if (chainId === 1) {
      setChainDropdown(chainDropdowns[0]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    } else if (chainId === 88) {
      setChainDropdown(chainDropdowns[7]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionviction_tokens)[0]
      );
      handleSubscriptionTokenChange(wvictionAddress);
      handleCheckIfAlreadyApproved(wvictionAddress);
    } else if (chainId === 169) {
      setChainDropdown(chainDropdowns[8]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionmanta_tokens)[0]
      );
      handleSubscriptionTokenChange(wmantaddress);
      handleCheckIfAlreadyApproved(wmantaddress);
    } else if (chainId === 167000) {
      setChainDropdown(chainDropdowns[9]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptiontaiko_tokens)[0]
      );
      handleSubscriptionTokenChange(wtaikoaddress);
      handleCheckIfAlreadyApproved(wtaikoaddress);
    } else if (chainId === 698) {
      setChainDropdown(chainDropdowns[10]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionmat_tokens)[0]
      );
      handleSubscriptionTokenChange(wmataddress);
      handleCheckIfAlreadyApproved(wmataddress);
    } else if (chainId === 1116) {
      setChainDropdown(chainDropdowns[6]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncore_tokens)[0]
      );
      handleSubscriptionTokenChange(wcoreAddress);
      handleCheckIfAlreadyApproved(wcoreAddress);
    } else if (chainId === 1329) {
      setChainDropdown(chainDropdowns[11]);
      setdropdownIcon("usdt");
      setdropdownTitle("usdt");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionsei_tokens)[0]
      );
      handleSubscriptionTokenChange(wseiAddress);
      handleCheckIfAlreadyApproved(wseiAddress);
    } else if (chainId === 56) {
      setChainDropdown(chainDropdowns[1]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wbnbAddress);
      handleCheckIfAlreadyApproved(wbnbAddress);
    } else if (chainId === 1030) {
      setChainDropdown(chainDropdowns[3]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncfx_tokens)[0]
      );
      handleSubscriptionTokenChange(wcfx);
      handleCheckIfAlreadyApproved(wcfx);
    } else if (chainId === 8453) {
      setChainDropdown(chainDropdowns[4]);
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbase_tokens)[0]
      );
      handleSubscriptionTokenChange(wbase);
      handleCheckIfAlreadyApproved(wbase);
    } else if (chainId === 43114) {
      setChainDropdown(chainDropdowns[2]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscription_tokens)[0]
      );
      handleSubscriptionTokenChange(wavaxAddress);
    } else if (chainId === 1482601649) {
      setChainDropdown(chainDropdowns[5]);
      setdropdownIcon("usdc");
      setdropdownTitle("USDC");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionskale_tokens)[0]
      );
      handleSubscriptionTokenChange(wskaleAddress);
    } else {
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    }
  }, [
    chainId,
    nftPremium_total,
    nftPremium_totalViction,
    nftPremium_totalTaiko,
    nftPremium_totalMat,
    discountPercentage,
    discountPercentageViction,
    discountPercentageTaiko,
    discountPercentageMat,
    nftPremium_tokenId,
    nftPremium_tokenIdViction,
    nftPremium_tokenIdTaiko,
    nftPremium_tokenIdMat,
  ]);

  useEffect(() => {
    if (chainId === 1 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioneth_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 56 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbnb_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 43114 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscription_tokens[selectedSubscriptionToken]?.decimals
      );
    } else if (chainId === 1030 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncfx_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 8453 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbase_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1482601649 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionskale_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 88 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionviction_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 169 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionmanta_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 167000 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptiontaiko_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 698 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionmat_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1116 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncore_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1329 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionsei_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    }
  }, [chainId, selectedSubscriptionToken]);

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
    }
  }, [dataVerify]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    if (userWallet && email) {
      getOpenedChestPerWallet();
    }
  }, [
    userWallet,
    email,
    count,
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
    claimedSeiChests,
    claimedSeiPremiumChests,
    claimedTaikoChests,
    claimedTaikoPremiumChests,
    claimedMatChests,
    claimedMatPremiumChests,
  ]);

  useEffect(() => {
    if (userWallet && email && authToken && isConnected && !isTokenExpired) {
      getUserRewardData(userWallet);
    }
  }, [userWallet, email, authToken, isConnected, isTokenExpired]);

  useEffect(() => {
    if ((coinbase && isConnected) || userWallet !== undefined) {
      setsyncStatus("initial");
      fetchAllMyNfts();
      // getmyCawsWodStakes();
      // getmyWodStakes();
    }
  }, [userWallet, isConnected, coinbase]);

  useEffect(() => {
    if (authToken && email && isConnected && !isTokenExpired) {
      fetchUserFavorites(userWallet ? userWallet : coinbase);
    }
  }, [account, userWallet, isConnected, authToken, email, isTokenExpired]);

  useEffect(() => {
    refetchPlayer();
  }, [email]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true ||
      globalLeaderboard === true ||
      genesisLeaderboard === true
    ) {
      html.classList.add("hidescroll");
      // dailyrewardpopup.style.pointerEvents = "auto";
      // leaderboardId.style.pointerEvents = "auto";
    } else {
      html.classList.remove("hidescroll");
    }
  }, [
    dailyBonusPopup,
    dailyrewardpopup,
    leaderboard,
    globalLeaderboard,
    genesisLeaderboard,
  ]);

  const logoutItem = localStorage.getItem("logout");

  useEffect(() => {
    if (email) {
      getAllSkaleChests(email);
      getAllChests(email);
      getAllCoreChests(email);
      getAllVictionChests(email);
      getAllMantaChests(email);
      getAllBaseChests(email);
      getAllTaikoChests(email);
      getAllMatChests(email);
      getAllSeiChests(email);
    }
  }, [email]);

  useEffect(() => {
    if (coinbase && isConnected && email && userWallet) {
      handleRefreshCountdown700();
    }
  }, [coinbase, isConnected, email, userWallet]);

  useEffect(() => {
    if (success === true) {
      setshowWalletModal(false);
    }
  }, [success]);

  useEffect(() => {
    if (dailyBonusPopup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup]);

  useEffect(() => {
    calculatePremiumDiscount(userWallet ? userWallet : coinbase);
  }, [userWallet, coinbase, chainId]);

  const hashValue = window.location.hash;

  const location = useLocation();

  useEffect(() => {
    getTreasureChestsInfo();
  }, [
    openedChests,
    userWallet,
    openedCoreChests,
    openedMatChests,
    openedVictionChests,
    openedSkaleChests,
    openedMantaChests,
    openedSeiChests,
    openedBaseChests,
    openedTaikoChests,
  ]);

  useEffect(() => {
    if (userId && email && username) {
      fetchGenesisAroundPlayer(userId, username);
    }
  }, [userId, username, email]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0 mt-lg-5 pt-lg-5 "
      style={{ minHeight: "72vh", maxWidth: "2400px", overflow: "hidden" }}
    >
      <div className="d-none">
        {goldenPassRemainingTime !== undefined && (
          <Countdown
            date={Number(goldenPassRemainingTime) * 1000}
            onComplete={() => {
              handleSetAvailableTime();
            }}
          />
        )}
        {countdown !== undefined && (
          <Countdown
            date={Number(countdown) * 1000}
            onComplete={() => {
              setcountdown();
            }}
          />
        )}
        {countdown3500 !== undefined && (
          <Countdown
            date={Number(countdown3500) * 1000}
            onComplete={() => {
              setcountdown3500();
            }}
          />
        )}
      </div>
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft2 d-flex flex-column align-items-start px-lg-4 px-2 position-relative">
        {location.pathname === "/account" ||
        location.pathname.includes("/account/challenges") ? (
          <>
            <MyProfile
              wodBalance={wodBalance}
              greatCollectionData={greatCollectionData}
              explorerHuntData={explorerHuntData}
              userDataStar={userDataStar}
              userDataStarWeekly={userDataStarWeekly}
              primeStars={primeStars}
              isgoldenPassActive={goldenPassRemainingTime}
              dragonRuinsCountdown={countdown}
              puzzleMadnessCountdown={countdown3500}
              userActiveEvents={userActiveEvents}
              beastSiegeStatus={beastSiegeStatus}
              puzzleMadnessTimer={puzzleMadnessTimer}
              onGoldenpassClick={() => setgoldenPassPopup(true)}
              allClaimedChests={
                openedBaseChests.length +
                openedChests.length +
                openedCoreChests.length +
                openedMantaChests.length +
                openedSeiChests.length +
                openedSkaleChests.length +
                openedTaikoChests.length +
                openedMatChests.length +
                openedVictionChests.length
              }
              allClaimedChestsPremium={
                claimedBasePremiumChests +
                claimedCorePremiumChests +
                claimedMantaPremiumChests +
                claimedSeiPremiumChests +
                claimedMatPremiumChests +
                claimedTaikoPremiumChests +
                claimedVictionPremiumChests +
                claimedSkalePremiumChests +
                claimedPremiumChests
              }
              allClaimedChestsstd={
                claimedBaseChests +
                claimedCoreChests +
                claimedMantaChests +
                claimedSeiChests +
                claimedMatChests +
                claimedTaikoChests +
                claimedVictionChests +
                claimedSkaleChests +
                claimedChests
              }
              userDailyBundles={userDailyBundles}
              treasureRewardMoney={treasureRewardMoney}
              canBuy={canBuy}
              email={email}
              username={username}
              isPremium={isPremium}
              address={data?.getPlayer?.wallet?.publicAddress}
              coinbase={coinbase}
              totalScore={userTotalScore}
              openChainsLeaderboard={() => setLeaderboard(true)}
              openGlobalLeaderboard={() => setGlobalLeaderboard(true)}
              openGenesisLeaderboard={() => setGenesisLeaderboard(true)}
              openMyRewards={() => setmyRewardsPopup(true)}
              openDailyBonus={() => setdailyBonusPopup(true)}
              openPortfolio={() => setPortfolio(true)}
              openSpecialRewards={() => setSpecialRewardsPopup(true)}
              userRankName={userRankName}
              isConnected={isConnected}
              onConnectWallet={() => {
                setshowWalletModal(true);
              }}
              domainName={domainName}
              onDomainClick={() => {
                handleOpenDomains();
              }}
              liveRewards={
                Number(userSocialRewardsCached) +
                Number(userRank2) +
                Number(genesisRank2) +
                Number(userRankRewards) +
                Number(dataAmountStar) +
                Number(dataAmountStarWeekly) +
                Number(cawsPremiumRewards) +
                Number(landPremiumRewards) +
                Number(immutableEarnUsd) +
                Number(victionEarnUsd) +
                Number(baseEarnUSD) +
                Number(easy2StakeEarnUsd) +
                Number(midleEarnUsd) +
                Number(taikoEarnUsd) +
                Number(skaleEarnUsd) +
                Number(coingeckoEarnUsd) +
                Number(seiEarnUsd) +
                Number(mantaEarnUsd) +
                Number(matEarnUsd) +
                Number(bnbEarnUsd) +
                Number(coreEarnUsd) +
                Number(chainlinkEarnUsd)
              }
              specialRewards={userSocialRewardsCached}
              syncStatus={syncStatus}
              onSyncClick={handleShowSyncModal}
              rankData={rankData}
              userRank={userData?.position ?? 0}
              userRankCore={userDataCore?.position ?? 0}
              userRankSkale={userDataSkale?.position ?? 0}
              userBnbStars={
                (userData?.statValue === 0
                  ? 0
                  : userData?.position > 100
                  ? 0
                  : bnbStars[userData?.position]) ?? 0
              }
              userCoreStars={
                (userDataCore?.statValue === 0
                  ? 0
                  : userDataCore?.position > 100
                  ? 0
                  : baseStars[userDataCore?.position]) ?? 0
              }
              userRankViction={userDataViction?.position ?? 0}
              userVictionStars={
                (userDataViction?.statValue === 0
                  ? 0
                  : userDataViction?.position > 100
                  ? 0
                  : baseStars[userDataViction?.position]) ?? 0
              }
              userRankMat={userDataMat?.position ?? 0}
              userMatStars={
                userDataMat?.statValue === 0
                  ? 0
                  : userDataMat?.position > 100
                  ? 0
                  : matStars[userDataMat?.position]
              }
              userRankSei={userDataSei?.position ?? 0}
              userSeiStars={
                userDataSei?.statValue === 0
                  ? 0
                  : userDataSei?.position > 100
                  ? 0
                  : seiStars[userDataSei?.position]
              }
              userRankManta={userDataManta?.position ?? 0}
              userMantaStars={
                (userDataManta?.statValue === 0
                  ? 0
                  : userDataManta?.position > 100
                  ? 0
                  : baseStars[userDataManta?.position]) ?? 0
              }
              userRankBase={userDataBase?.position ?? 0}
              userBaseStars={
                (userDataBase?.statValue === 0
                  ? 0
                  : userDataBase?.position > 100
                  ? 0
                  : baseStars[userDataBase?.position]) ?? 0
              }
              userRankTaiko={userDataTaiko?.position ?? 0}
              userTaikoStars={
                (userDataTaiko?.statValue === 0
                  ? 0
                  : userDataTaiko?.position > 100
                  ? 0
                  : taikoStars[userDataTaiko?.position]) ?? 0
              }
              userSkaleStars={
                (userDataSkale?.statValue === 0
                  ? 0
                  : userDataSkale?.position > 100
                  ? 0
                  : skaleStars[userDataSkale?.position]) ?? 0
              }
              userBnbScore={userData?.statValue}
              userMatScore={userDataMat?.statValue}
              userSeiScore={userDataSei?.statValue}
              userMantaScore={userDataManta?.statValue}
              userBaseScore={userDataBase?.statValue}
              userTaikoScore={userDataTaiko?.statValue}
              userSkaleScore={userDataSkale?.statValue}
              userCoreScore={userDataCore?.statValue}
              userVictionScore={userDataViction?.statValue}
              onEventCardClick={() => {
                seteventCardCount(eventCardCount + 1);
              }}
              onLinkWallet={connectWallet}
            />
            <NewEvents
              events={dummyBetaPassData2}
              onEventClick={(value) => {
                setselectedEvent(value);
                setshowEventPopup(true);
              }}
              onConnectWallet={() => {
                setshowWalletModal(true);
              }}
              wodBalance={wodBalance}
              setPuzzleMadnessTimer={setPuzzleMadnessTimer}
              greatCollectionData={greatCollectionData}
              explorerHuntData={explorerHuntData}
              availableTime={goldenPassRemainingTime}
              coinbase={coinbase}
              wallet={data?.getPlayer?.wallet?.publicAddress}
              chainId={chainId}
              wodPrice={wodPrice}
              binanceW3WProvider={binanceW3WProvider}
              selectedEvent={eventId}
              eventCardCount={eventCardCount}
              email={email}
              isConnected={isConnected}
              setBeastSiegeStatus={setBeastSiegeStatus}
              genesisUsd={genesisRank2}
            />
          </>
        ) : location.pathname === "/account/my-rewards" ? (
          <MyRewardsPopupNew
            address={userWallet}
            userRank2={userRank2}
            email={email}
            userDataStar={dataAmountStar}
            userDataStarWeekly={dataAmountStarWeekly}
            allChests={allChests}
            allSkaleChests={allSkaleChests}
            allCoreChests={allCoreChests}
            allVictionChests={allVictionChests}
            allMantaChests={allMantaChests}
            allBaseChests={allBaseChests}
            allTaikoChests={allTaikoChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            userSocialRewards={userSocialRewards}
            bnbEarnUsd={bnbEarnUsd}
            skaleEarnUsd={skaleEarnUsd}
            multiversEarnUsd={multiversEarnUsd}
            seiEarnUsd={seiEarnUsd}
            victionEarnUsd={victionEarnUsd}
            mantaEarnUsd={mantaEarnUsd}
            taikoEarnUsd={taikoEarnUsd}
            matEarnUsd={matEarnUsd}
            chainlinkEarnUsd={chainlinkEarnUsd}
            immutableEarnUsd={immutableEarnUsd}
            coreEarnUsd={coreEarnUsd}
            userRankRewards={userRankRewards}
            cawsPremiumRewards={cawsPremiumRewards}
            landPremiumRewards={landPremiumRewards}
            genesisRank2={genesisRank2}
            cookieEarnUsd={cookieEarnUsd}
            baseEarnUSD={baseEarnUSD}
            easy2StakeEarnUsd={easy2StakeEarnUsd}
            midleEarnUsd={midleEarnUsd}
            coingeckoEarnUsd={coingeckoEarnUsd}
          />
        ) : location.pathname === "/account/prime" ? (
          <GetPremiumPopup
            chainId={chainId}
            coinbase={coinbase}
            isPremium={isPremium}
            handleSwitchNetwork={handleSwitchNetwork}
            onSuccessDeposit={() => {
              onSuccessDeposit();
              setTimeout(() => {
                setgetPremiumPopup(false);
              }, 2000);
            }}
            onClose={() => {
              setgetPremiumPopup(false);
            }}
            isConnected={isConnected}
          />
        ) : (
          <></>
        )}
        {(dailyBonusPopup || hashValue === "#dailybonus") && (
          // <OutsideClickHandler
          //   onOutsideClick={() => {
          //     setdailyBonusPopup(false);
          //   }}
          // >
          <NewDailyBonus
            isPremium={isPremium}
            bnbImages={bnbImages}
            skaleImages={skaleImages}
            seiImages={seiImages}
            victionImages={victionImages}
            mantaImages={mantaImages}
            baseImages={baseImages}
            taikoImages={taikoImages}
            matImages={matImages}
            coreImages={coreImages}
            chainId={chainId}
            dypTokenData={dypTokenData}
            ethTokenData={ethTokenData}
            handleSwitchChain={handleSwitchChain}
            handleSwitchNetwork={handleSwitchNetwork}
            listedNFTS={dailyBonuslistedNFTS}
            onclose={() => {
              setdailyBonusPopup(false);
              window.location.hash = "";
            }}
            binanceW3WProvider={binanceW3WProvider}
            coinbase={coinbase}
            claimedChests={claimedChests}
            claimedPremiumChests={claimedPremiumChests}
            claimedSkaleChests={claimedSkaleChests}
            claimedSkalePremiumChests={claimedSkalePremiumChests}
            claimedCoreChests={claimedCoreChests}
            claimedCorePremiumChests={claimedCorePremiumChests}
            claimedVictionChests={claimedVictionChests}
            claimedVictionPremiumChests={claimedVictionPremiumChests}
            claimedMantaChests={claimedMantaChests}
            claimedMantaPremiumChests={claimedMantaPremiumChests}
            claimedBaseChests={claimedBaseChests}
            claimedBasePremiumChests={claimedBasePremiumChests}
            claimedTaikoChests={claimedTaikoChests}
            claimedTaikoPremiumChests={claimedTaikoPremiumChests}
            claimedMatChests={claimedMatChests}
            claimedMatPremiumChests={claimedMatPremiumChests}
            claimedSeiChests={claimedSeiChests}
            claimedSeiPremiumChests={claimedSeiPremiumChests}
            email={email}
            openedChests={openedChests}
            openedSkaleChests={openedSkaleChests}
            openedCoreChests={openedCoreChests}
            openedVictionChests={openedVictionChests}
            openedMantaChests={openedMantaChests}
            openedBaseChests={openedBaseChests}
            openedTaikoChests={openedTaikoChests}
            openedMatChests={openedMatChests}
            openedSeiChests={openedSeiChests}
            address={userWallet}
            allChests={allChests}
            allSkaleChests={allSkaleChests}
            allCoreChests={allCoreChests}
            allVictionChests={allVictionChests}
            allMantaChests={allMantaChests}
            allBaseChests={allBaseChests}
            allTaikoChests={allTaikoChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            onChestClaimed={() => {
              setCount(count + 1);
            }}
            onSkaleChestClaimed={() => {
              setskalecount(skalecount + 1);
            }}
            onCoreChestClaimed={() => {
              setcorecount(corecount + 1);
            }}
            onVictionChestClaimed={() => {
              setvicitoncount(vicitoncount + 1);
            }}
            onMantaChestClaimed={() => {
              setmantacount(mantacount + 1);
            }}
            onBaseChestClaimed={() => {
              setbasecount(basecount + 1);
            }}
            onTaikoChestClaimed={() => {
              settaikocount(taikocount + 1);
            }}
            onMatChestClaimed={() => {
              setmatcount(matcount + 1);
            }}
            onSeiChestClaimed={() => {
              setseicount(seicount + 1);
            }}
            dummypremiumChests={dummypremiumChests}
            onPremiumClick={() => {
              setgetPremiumPopup(true);
            }}
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            onPremiumClickOther={() => {
              setdailyBonusPopup(false);
              setgetPremiumPopup(true);
            }}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
          />
          // </OutsideClickHandler>
        )}
        {(bnbBonusPopup || hashValue === "#bnb-miniapp-dailybonus") && (
          // <OutsideClickHandler
          //   onOutsideClick={() => {
          //     setdailyBonusPopup(false);
          //   }}
          // >
          <BnbDailyBonus
            isPremium={isPremium}
            bnbImages={bnbImages}
            skaleImages={skaleImages}
            seiImages={seiImages}
            victionImages={victionImages}
            mantaImages={mantaImages}
            baseImages={baseImages}
            taikoImages={taikoImages}
            matImages={matImages}
            coreImages={coreImages}
            chainId={chainId}
            dypTokenData={dypTokenData}
            ethTokenData={ethTokenData}
            handleSwitchChain={handleSwitchChain}
            handleSwitchNetwork={handleSwitchNetwork}
            listedNFTS={dailyBonuslistedNFTS}
            onclose={() => {
              setBnbBonusPopup(false);
              window.location.hash = "";
            }}
            binanceW3WProvider={binanceW3WProvider}
            coinbase={coinbase}
            claimedChests={claimedChests}
            claimedPremiumChests={claimedPremiumChests}
            claimedSkaleChests={claimedSkaleChests}
            claimedSkalePremiumChests={claimedSkalePremiumChests}
            claimedCoreChests={claimedCoreChests}
            claimedCorePremiumChests={claimedCorePremiumChests}
            claimedVictionChests={claimedVictionChests}
            claimedVictionPremiumChests={claimedVictionPremiumChests}
            claimedMantaChests={claimedMantaChests}
            claimedMantaPremiumChests={claimedMantaPremiumChests}
            claimedBaseChests={claimedBaseChests}
            claimedBasePremiumChests={claimedBasePremiumChests}
            claimedTaikoChests={claimedTaikoChests}
            claimedTaikoPremiumChests={claimedTaikoPremiumChests}
            claimedMatChests={claimedMatChests}
            claimedMatPremiumChests={claimedMatPremiumChests}
            claimedSeiChests={claimedSeiChests}
            claimedSeiPremiumChests={claimedSeiPremiumChests}
            email={email}
            openedChests={openedChests}
            openedSkaleChests={openedSkaleChests}
            openedCoreChests={openedCoreChests}
            openedVictionChests={openedVictionChests}
            openedMantaChests={openedMantaChests}
            openedBaseChests={openedBaseChests}
            openedTaikoChests={openedTaikoChests}
            openedMatChests={openedMatChests}
            openedSeiChests={openedSeiChests}
            address={userWallet}
            allChests={allChests}
            allSkaleChests={allSkaleChests}
            allCoreChests={allCoreChests}
            allVictionChests={allVictionChests}
            allMantaChests={allMantaChests}
            allBaseChests={allBaseChests}
            allTaikoChests={allTaikoChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            onChestClaimed={() => {
              setCount(count + 1);
            }}
            onSkaleChestClaimed={() => {
              setskalecount(skalecount + 1);
            }}
            onCoreChestClaimed={() => {
              setcorecount(corecount + 1);
            }}
            onVictionChestClaimed={() => {
              setvicitoncount(vicitoncount + 1);
            }}
            onMantaChestClaimed={() => {
              setmantacount(mantacount + 1);
            }}
            onBaseChestClaimed={() => {
              setbasecount(basecount + 1);
            }}
            onTaikoChestClaimed={() => {
              settaikocount(taikocount + 1);
            }}
            onMatChestClaimed={() => {
              setmatcount(matcount + 1);
            }}
            onSeiChestClaimed={() => {
              setseicount(seicount + 1);
            }}
            dummypremiumChests={dummypremiumChests}
            onPremiumClick={() => {
              setgetPremiumPopup(true);
            }}
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            onPremiumClickOther={() => {
              setBnbBonusPopup(false);
              setgetPremiumPopup(true);
            }}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
          />
          // </OutsideClickHandler>
        )}
        {(matBonusPopup || hashValue === "#matchain-miniapp-dailybonus") && (
          // <OutsideClickHandler
          //   onOutsideClick={() => {
          //     setdailyBonusPopup(false);
          //   }}
          // >
          <MatchainDailyBonus
            isPremium={isPremium}
            bnbImages={bnbImages}
            skaleImages={skaleImages}
            seiImages={seiImages}
            victionImages={victionImages}
            mantaImages={mantaImages}
            baseImages={baseImages}
            taikoImages={taikoImages}
            matImages={matImages}
            coreImages={coreImages}
            chainId={chainId}
            dypTokenData={dypTokenData}
            ethTokenData={ethTokenData}
            handleSwitchChain={handleSwitchChain}
            handleSwitchNetwork={handleSwitchNetwork}
            listedNFTS={dailyBonuslistedNFTS}
            onclose={() => {
              setMatBonusPopup(false);
              window.location.hash = "";
            }}
            binanceW3WProvider={binanceW3WProvider}
            coinbase={coinbase}
            claimedChests={claimedChests}
            claimedPremiumChests={claimedPremiumChests}
            claimedSkaleChests={claimedSkaleChests}
            claimedSkalePremiumChests={claimedSkalePremiumChests}
            claimedCoreChests={claimedCoreChests}
            claimedCorePremiumChests={claimedCorePremiumChests}
            claimedVictionChests={claimedVictionChests}
            claimedVictionPremiumChests={claimedVictionPremiumChests}
            claimedMantaChests={claimedMantaChests}
            claimedMantaPremiumChests={claimedMantaPremiumChests}
            claimedBaseChests={claimedBaseChests}
            claimedBasePremiumChests={claimedBasePremiumChests}
            claimedTaikoChests={claimedTaikoChests}
            claimedTaikoPremiumChests={claimedTaikoPremiumChests}
            claimedMatChests={claimedMatChests}
            claimedMatPremiumChests={claimedMatPremiumChests}
            claimedSeiChests={claimedSeiChests}
            claimedSeiPremiumChests={claimedSeiPremiumChests}
            email={email}
            openedChests={openedChests}
            openedSkaleChests={openedSkaleChests}
            openedCoreChests={openedCoreChests}
            openedVictionChests={openedVictionChests}
            openedMantaChests={openedMantaChests}
            openedBaseChests={openedBaseChests}
            openedTaikoChests={openedTaikoChests}
            openedMatChests={openedMatChests}
            openedSeiChests={openedSeiChests}
            address={userWallet}
            allChests={allChests}
            allSkaleChests={allSkaleChests}
            allCoreChests={allCoreChests}
            allVictionChests={allVictionChests}
            allMantaChests={allMantaChests}
            allBaseChests={allBaseChests}
            allTaikoChests={allTaikoChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            onChestClaimed={() => {
              setCount(count + 1);
            }}
            onSkaleChestClaimed={() => {
              setskalecount(skalecount + 1);
            }}
            onCoreChestClaimed={() => {
              setcorecount(corecount + 1);
            }}
            onVictionChestClaimed={() => {
              setvicitoncount(vicitoncount + 1);
            }}
            onMantaChestClaimed={() => {
              setmantacount(mantacount + 1);
            }}
            onBaseChestClaimed={() => {
              setbasecount(basecount + 1);
            }}
            onTaikoChestClaimed={() => {
              settaikocount(taikocount + 1);
            }}
            onMatChestClaimed={() => {
              setmatcount(matcount + 1);
            }}
            onSeiChestClaimed={() => {
              setseicount(seicount + 1);
            }}
            dummypremiumChests={dummypremiumChests}
            onPremiumClick={() => {
              setgetPremiumPopup(true);
            }}
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            onPremiumClickOther={() => {
              setMatBonusPopup(false);
              setgetPremiumPopup(true);
            }}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
          />
          // </OutsideClickHandler>
        )}
        {(leaderboard || hashValue === "#leaderboard") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setLeaderboard(false);
              window.location.hash = "";
            }}
          >
            <div
              className="popup-wrapper leaderboard-popup popup-active p-3"
              id="leaderboard"
              style={{ width: "50%", pointerEvents: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h2
                  className={`market-banner-title mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  `}
                  style={{ fontSize: "24px" }}
                >
                  WOD Leaderboard
                </h2>

                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => {
                    setLeaderboard(false);
                    window.location.hash = "";
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <NewLeaderBoard
                username={username}
                userId={userId}
                dypBalancebnb={dypBalancebnb}
                address={userWallet}
                availableTime={goldenPassRemainingTime}
                email={email}
                isPremium={isPremium}
                allBnbData={allBnbData}
                allSkaleData={allSkaleData}
                allCoreData={allCoreData}
                allVictionData={allVictionData}
                allMantaData={allMantaData}
                allBaseData={allBaseData}
                allTaikoData={allTaikoData}
                allMatData={allMatData}
                allSeiData={allSeiData}
                dailyplayerData={dailyplayerData}
                weeklyplayerData={weeklyplayerData}
                monthlyplayerData={monthlyplayerData}
                genesisData={genesisData}
                onPremiumClick={() => {
                  // setgetPremiumPopup(true);
                  setLeaderboard(false);
                  window.location.hash = "";
                }}
                onGoldenpassClick={() => {
                  setgoldenPassPopup(true);
                  setLeaderboard(false);
                  window.location.hash = "";
                }}
              />
            </div>
          </OutsideClickHandler>
        )}

        {showEventPopup && (
          <EventsPopup
            dummyEvent={selectedEvent}
            onClose={() => {
              setshowEventPopup(false);
            }}
          />
        )}

        {showWalletModal === true && success === false && (
          <WalletModal
            show={showWalletModal}
            handleClose={() => {
              setshowWalletModal(false);
            }}
            handleConnection={handleConnect}
          />
        )}

        {(showSyncModal === true || showSync === true) && (
          <SyncModal
            onCancel={() => {
              setshowSyncModal(false);
              onCloseSync();
            }}
            onclose={() => {
              setshowSyncModal(false);
              onCloseSync();
            }}
            open={showSyncModal === true || showSync === true}
            onConfirm={handleSync}
            syncStatus={syncStatus}
          />
        )}

        {genesisLeaderboard && (
          <OutsideClickHandler
            onOutsideClick={() => setGenesisLeaderboard(false)}
          >
            <div
              className="popup-wrapper leaderboard-popup popup-active p-3"
              id="leaderboard"
              style={{ width: "35%", pointerEvents: "auto" }}
            >
              <div
                className="d-flex align-items-center justify-content-end position-absolute"
                style={{
                  position: "absolute",
                  right: "22px",
                  zIndex: 2,
                  top: "22px",
                }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => setGenesisLeaderboard(false)}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <GenesisLeaderboard
                data={genesisData}
                previousdata={previousgenesisData}
                playerdata={greatCollectionData}
                username={username}
                activePlayer={
                  greatCollectionData[0]?.position < 100 ? true : false
                }
                email={email}
              />
            </div>
          </OutsideClickHandler>
        )}
        {globalLeaderboard && (
          <OutsideClickHandler
            onOutsideClick={() => setGlobalLeaderboard(false)}
          >
            <div
              className="popup-wrapper leaderboard-popup popup-active p-3"
              id="leaderboard"
              style={{
                width: "35%",
                pointerEvents: "auto",
                backgroundSize: "auto",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h2
                  className={`market-banner-title mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center   gap-2`}
                  style={{ fontSize: "24px" }}
                >
                  Global Leaderboards
                </h2>

                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => setGlobalLeaderboard(false)}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="d-flex align-items-center gap-2 mt-3 ">
                <button
                  className={` ${
                    leaderboardBtn === "weekly"
                      ? "getpremium-active-btn"
                      : "getpremium-btn"
                  }  w-100 py-lg-2 py-1`}
                  onClick={() => {
                    setleaderboardBtn("weekly");
                  }}
                >
                  Weekly
                </button>
                <button
                  className={` ${
                    leaderboardBtn === "monthly"
                      ? "getpremium-active-btn"
                      : "getpremium-btn"
                  }  w-100 py-lg-2 py-1`}
                  onClick={() => {
                    setleaderboardBtn("monthly");
                  }}
                >
                  Monthly
                </button>
              </div>
              <GlobalLeaderboard
                leaderboardBtn={leaderboardBtn}
                genesisData={genesisData}
                previousgenesisData={previousgenesisData}
                previousGenesisVersion={previousGenesisVersion}
                allStarData={allStarData}
                screen={"dash"}
                availableTime={goldenPassRemainingTime}
                username={username}
                userId={userId}
                monthlyPlayers={monthlyPlayers}
                percent={percent}
              />
            </div>
          </OutsideClickHandler>
        )}

        {(goldenPassPopup || eventId === "golden-pass") && (
          <GoldenPassPopup
            onClosePopup={() => {
              setgoldenPassPopup(false);
              handleClosePopup();
            }}
            coinbase={coinbase}
            chainId={chainId}
            wodPrice={wodPrice}
            binanceW3WProvider={binanceW3WProvider}
            wallet={data?.getPlayer?.wallet?.publicAddress}
          />
        )}

        {myRewardsPopup && (
          <OutsideClickHandler onOutsideClick={() => setmyRewardsPopup(false)}>
            <div
              className="popup-wrapper popup-active p-4"
              id="leaderboard"
              style={{
                width: "fit-content",
                pointerEvents: "auto",
                overflowX: "auto",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h2
                  className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                >
                  My Rewards
                </h2>
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => setmyRewardsPopup(false)}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
              <MyRewardsPopupNew
                address={userWallet}
                userRank2={userRank2}
                email={email}
                userDataStar={dataAmountStar}
                userDataStarWeekly={dataAmountStarWeekly}
                allChests={allChests}
                allSkaleChests={allSkaleChests}
                allCoreChests={allCoreChests}
                allVictionChests={allVictionChests}
                allMantaChests={allMantaChests}
                allBaseChests={allBaseChests}
                allTaikoChests={allTaikoChests}
                allMatChests={allMatChests}
                allSeiChests={allSeiChests}
                availableTime={goldenPassRemainingTime}
                userSocialRewards={userSocialRewards}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                multiversEarnUsd={multiversEarnUsd}
                seiEarnUsd={seiEarnUsd}
                victionEarnUsd={victionEarnUsd}
                mantaEarnUsd={mantaEarnUsd}
                taikoEarnUsd={taikoEarnUsd}
                matEarnUsd={matEarnUsd}
                chainlinkEarnUsd={chainlinkEarnUsd}
                immutableEarnUsd={immutableEarnUsd}
                coreEarnUsd={coreEarnUsd}
                userRankRewards={userRankRewards}
                cawsPremiumRewards={cawsPremiumRewards}
                landPremiumRewards={landPremiumRewards}
                genesisRank2={genesisRank2}
                cookieEarnUsd={cookieEarnUsd}
                baseEarnUSD={baseEarnUSD}
                easy2StakeEarnUsd={easy2StakeEarnUsd}
                midleEarnUsd={midleEarnUsd}
                coingeckoEarnUsd={coingeckoEarnUsd}
              />
            </div>
          </OutsideClickHandler>
        )}
        {portfolio && (
          <OutsideClickHandler onOutsideClick={() => setPortfolio(false)}>
            <div
              className="popup-wrapper  popup-active p-3"
              id="portfolio"
              style={{ width: "60%", pointerEvents: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h2
                  className={`market-banner-title mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  `}
                  style={{ fontSize: "24px" }}
                >
                  My Portfolio
                </h2>

                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => setPortfolio(false)}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <Portfolio
                wodBalance={wodBalance}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                onOpenNfts={onOpenNfts}
                allListed={listedNFTS}
                address={data?.getPlayer?.wallet?.publicAddress}
                coinbase={account}
                isVerified={data?.getPlayer?.wallet}
                favoritesArray={favorites}
                dypBalance={dypBalance}
                dypBalancebnb={dypBalancebnb}
                dypBalanceavax={dypBalanceavax}
                idypBalance={idypBalance}
                idypBalancebnb={idypBalancebnb}
                idypBalanceavax={idypBalanceavax}
                showNfts={showNfts}
                handleShowWalletPopup={() => {
                  setshowWalletModal(true);
                }}
                email={email}
                userId={data?.getPlayer?.playerId}
                username={data?.getPlayer?.displayName}
                myCawsCollected={MyNFTSCaws}
                myCawsOldCollected={MyNFTSCawsOld}
                myLandCollected={MyNFTSLand}
                myTimepieceCollected={MyNFTSTimepiece}
                landStaked={landstakes}
                myCawsWodStakes={myCawsWodStakesAll}
                myWodWodStakes={myWodWodStakesAll}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                myNFTSopBNB={MyNFTSopBNB}
                myConfluxNfts={myConfluxNfts}
                myBaseNfts={myBaseNfts}
                myDogeNfts={myDogeNfts}
                myCmcNfts={myCmcNfts}
                myCoreNfts={myCoreNfts}
                myVictionNfts={myVictionNfts}
                myMultiversNfts={myMultiversNfts}
                myImmutableNfts={myImmutableNfts}
                myMantaNfts={myMantaNfts}
                myTaikoNfts={myTaikoNfts}
                myCookieNfts={myCookieNfts}
                mySeiNfts={mySeiNfts}
                mySkaleNfts={mySkaleNfts}
                latestBoughtNFTS={latest20BoughtNFTS}
                myOffers={myOffers}
                allActiveOffers={allActiveOffers}
                latestVersion={latestVersion}
                MyNFTSLandBNB={MyNFTSLandBNB}
                MyNFTSCawsBNB={MyNFTSCawsBNB}
                MyNFTSLandAvax={MyNFTSLandAvax}
                MyNFTSCawsAvax={MyNFTSCawsAvax}
                MyNFTSLandBase={MyNFTSLandBase}
                myNFTSBNB={MyNFTSBNB}
                MyNFTSCawsBase={MyNFTSCawsBase}
                myMatNfts={myMatNfts}
              />
            </div>
          </OutsideClickHandler>
        )}

        {(getPremiumPopup ||
          adClicked === "premium" ||
          hashValue === "#prime") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setgetPremiumPopup(false);
              setadClicked("");
              window.location.hash = "";
            }}
          >
            <div
              className="popup-wrapper popup-active p-lg-4 p-2"
              id="subscribe"
              style={{ width: "40%", pointerEvents: "auto" }}
            >
              <div className="subscribe-container p-2 position-relative">
                <div className="" style={{ background: "#8E97CD" }}></div>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="free-plan-title">Prime Subscription</h6>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                    onClick={() => {
                      setgetPremiumPopup(false);
                      setadClicked("");
                      window.location.hash = "";
                    }}
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {discountPercentage > 0 ||
                discountPercentageViction > 0 ||
                discountPercentageTaiko ||
                discountPercentageMat > 0 ||
                nftPremium_total > 0 ||
                nftPremium_totalViction ||
                nftPremium_totalTaiko ||
                nftPremium_totalMat > 0 ? (
                  <div className="premium-gold-popup mt-3 p-3 position-relative d-flex align-items-center justify-content-between">
                    <div className="premiumRedTag position-absolute">
                      <div className="position-relative d-flex flex-column">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/redPremiumTag.svg"
                          }
                          alt=""
                        />
                        <div className="d-flex flex-column position-absolute discountwrap">
                          <span className="discount-price2 font-oxanium">
                            {discountPercentage > 0
                              ? discountPercentage
                              : discountPercentageViction > 0
                              ? discountPercentageViction
                              : discountPercentageTaiko > 0
                              ? discountPercentageTaiko
                              : discountPercentageMat > 0
                              ? discountPercentageMat
                              : discountPercentage}
                            %
                          </span>
                          <span className="discount-price-bottom">
                            Discount
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-2 gap-lg-0 justify-content-between mt-2 mt-lg-0 justify-content-lg-start flex-lg-column flex-md-column flex-sm-column align-items-center align-items-lg-start align-items-md-start align-items-sm-start">
                      <div className="d-flex flex-column">
                        <h6 className="lifetime-plan-text m-0">
                          Lifetime plan
                        </h6>
                        {(nftPremium_total > 0 ||
                          nftPremium_totalViction > 0 ||
                          nftPremium_totalTaiko > 0 ||
                          nftPremium_totalMat > 0) && (
                          <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                            Valid until:{" "}
                            {new Date(
                              nftPremium_total > 0
                                ? nftDiscountObject.expiration * 1000
                                : nftPremium_totalTaiko > 0
                                ? nftDiscountObjectTaiko.expiration * 1000
                                : nftPremium_totalMat > 0
                                ? nftDiscountObjectMat.expiration * 1000
                                : nftDiscountObjectViction.expiration * 1000
                            )
                              .toDateString()
                              .slice(
                                3,
                                new Date(
                                  nftPremium_total > 0
                                    ? nftDiscountObject.expiration * 1000
                                    : nftPremium_totalTaiko > 0
                                    ? nftDiscountObjectTaiko.expiration * 1000
                                    : nftPremium_totalMat > 0
                                    ? nftDiscountObjectMat.expiration * 1000
                                    : nftDiscountObjectViction.expiration * 1000
                                ).toDateString().length
                              )}
                          </h6>
                        )}
                      </div>
                      <div className="d-flex align-items-end gap-2">
                        <h6 className="discount-price">
                          {discountPercentage == 100 ||
                          discountPercentageViction == 100 ||
                          discountPercentageTaiko == 100 ||
                          discountPercentageMat == 100
                            ? "FREE"
                            : "$" +
                              (100 -
                                Number(
                                  discountPercentage > 0
                                    ? discountPercentage
                                    : discountPercentageViction > 0
                                    ? discountPercentageViction
                                    : discountPercentageTaiko > 0
                                    ? discountPercentageTaiko
                                    : discountPercentageMat > 0
                                    ? discountPercentageMat
                                    : discountPercentage
                                ))}
                        </h6>
                        <h6 className="old-price-text">$100</h6>
                      </div>
                      {(nftPremium_total > 0 ||
                        nftPremium_totalViction > 0 ||
                        nftPremium_totalTaiko > 0 ||
                        nftPremium_totalMat > 0) && (
                        <h6 className="token-amount-placeholder m-0 premium-custom-text">
                          Valid until:{" "}
                          {new Date(
                            nftPremium_total > 0
                              ? nftDiscountObject.expiration * 1000
                              : nftPremium_totalTaiko > 0
                              ? nftDiscountObjectTaiko.expiration * 1000
                              : nftPremium_totalMat > 0
                              ? nftDiscountObjectMat.expiration * 1000
                              : nftDiscountObjectViction.expiration * 1000
                          )
                            .toDateString()
                            .slice(
                              3,
                              new Date(
                                nftPremium_total > 0
                                  ? nftDiscountObject.expiration * 1000
                                  : nftPremium_totalTaiko > 0
                                  ? nftDiscountObjectTaiko.expiration * 1000
                                  : nftPremium_totalMat > 0
                                  ? nftDiscountObjectMat.expiration * 1000
                                  : nftDiscountObjectViction.expiration * 1000
                              ).toDateString().length
                            )}
                        </h6>
                      )}
                    </div>
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                      }
                      alt=""
                      className="already-preium-badge"
                    />
                  </div>
                ) : (
                  <div className="premium-gold-popup d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                    <div className="d-flex flex-column gap-2">
                      <span className="lifetime-plan mb-0">Lifetime plan</span>
                      <h6 className="plan-cost mb-0">$100</h6>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-3">
                      <div className="premium-chains-wrapper2">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/eth.svg"}
                            style={{ width: 18, height: 18 }}
                            alt=""
                          />
                          <span className="subscription-chain mb-0">
                            Ethereum
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                            }
                            style={{ width: 18, height: 18 }}
                            alt=""
                          />
                          <span className="subscription-chain mb-0">
                            BNB Chain
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                            }
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">
                            Matchain
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                            }
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">SEI</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/manta.png"}
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">Manta</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">Taiko</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                            }
                            style={{ width: 18, height: 18 }}
                            alt=""
                          />
                          <span className="subscription-chain mb-0">
                            Avalanche
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/base.svg"}
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">Base</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                            }
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">
                            Conflux
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                            }
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">SKALE</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/core.svg"}
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">CORE</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/viction.svg"
                            }
                            alt=""
                            style={{ width: 18, height: 18 }}
                          />
                          <span className="subscription-chain mb-0">
                            Viction
                          </span>
                        </div>
                      </div>
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/premiumIcon.webp"
                        }
                        alt=""
                        className="already-preium-badge"
                      />
                    </div>
                  </div>
                )}
                <div className="d-flex flex-column">
                  <div className="mt-3 p-3 benefits-title-wrapper justify-content-center">
                    <h6 className="premium-benefits-popup-title mb-0">
                      Benefits
                    </h6>
                  </div>
                  <div className="sidebar-separator2 m-0"></div>
                  <div className="premium-benefits-wrapper d-flex gap-3 justify-content-between p-3">
                    {allBenefits.map((item, index) => {
                      return (
                        <div key={index} className="benefit-item">
                          <div className="d-flex flex-column gap-3">
                            <img
                              src={item.image}
                              alt=""
                              className="benefitimg"
                            />
                            <span className="benefittitle p-3">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="form-divider my-4" />
                {isConnected && (
                  <>
                    <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                      {isConnected && (
                        <>
                          <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                            <div className="d-flex flex-column gap-3 subscribe-input-container">
                              <span className="token-amount-placeholder">
                                Select chain
                              </span>
                              <div className="dropdown position relative">
                                <button
                                  class={`btn launchpad-dropdown gap-2 d-flex justify-content-between align-items-center dropdown-toggle`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <div
                                    className="d-flex align-items-center gap-2"
                                    style={{ color: "#fff" }}
                                  >
                                    <img
                                      src={`https://cdn.worldofdypians.com/wod/${chainDropdown.symbol}IconPremium.svg`}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    {chainDropdown.name}
                                  </div>
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                                    }
                                    alt=""
                                  />
                                </button>
                                <ul className="dropdown-menu w-100">
                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleEthPool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/eth.svg"
                                      }
                                      style={{ width: 18, height: 18 }}
                                      alt=""
                                    />
                                    Ethereum
                                  </li>
                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleBnbPool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                      }
                                      style={{ width: 18, height: 18 }}
                                      alt=""
                                    />
                                    BNB Chain
                                  </li>
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleMatPool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                          }
                                          style={{
                                            width: 18,
                                            height: 18,
                                          }}
                                          alt=""
                                        />
                                        Matchain
                                      </li>
                                    )}
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleSeiPool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                                          }
                                          style={{
                                            width: 18,
                                            height: 18,
                                          }}
                                          alt=""
                                        />
                                        SEI
                                      </li>
                                    )}

                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleMantaPool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/manta.png"
                                      }
                                      style={{ width: 18, height: 18 }}
                                      alt=""
                                    />
                                    Manta
                                  </li>
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleTaikoPool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/taiko.svg"
                                          }
                                          style={{ width: 18, height: 18 }}
                                          alt=""
                                        />
                                        Taiko
                                      </li>
                                    )}

                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleAvaxPool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                                      }
                                      style={{ width: 18, height: 18 }}
                                      alt=""
                                    />
                                    Avalanche
                                  </li>
                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleBasePool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/base.svg"
                                      }
                                      alt=""
                                      style={{
                                        width: "18px",
                                        height: "18px",
                                      }}
                                    />
                                    Base Network
                                  </li>
                                  <li
                                    className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                    onClick={handleConfluxPool}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                                      }
                                      alt=""
                                      style={{
                                        width: "18px",
                                        height: "18px",
                                      }}
                                    />
                                    Conflux Network
                                  </li>
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleSkalePool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                                          }
                                          alt=""
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                          }}
                                        />
                                        SKALE
                                      </li>
                                    )}
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleCorePool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/core.svg"
                                          }
                                          alt=""
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                          }}
                                        />
                                        CORE
                                      </li>
                                    )}
                                  {window.WALLET_TYPE !== "binance" &&
                                    !window.ethereum?.isBinance && (
                                      <li
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={handleVictionPool}
                                      >
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/viction.svg"
                                          }
                                          alt=""
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                          }}
                                        />
                                        Viction
                                      </li>
                                    )}
                                </ul>
                              </div>
                            </div>

                            {/* <div className="d-flex flex-column gap-3 subscribe-input-container"></div> */}
                            {discountPercentage < 100 &&
                              discountPercentageViction < 100 &&
                              discountPercentageTaiko < 100 &&
                              discountPercentageMat < 100 && (
                                <div className="d-flex flex-column align-items-end gap-3">
                                  <span className="my-premium-balance-text mb-0">
                                    My balance:{" "}
                                    {getFormattedNumber(
                                      tokenBalance / 10 ** tokenDecimals,
                                      5
                                    )}{" "}
                                    {dropdownIcon?.toUpperCase()}
                                  </span>
                                  <div
                                    className="premium-benefits-wrapper p-2 d-flex align-items-center gap-4"
                                    style={{
                                      height: "34px",
                                      overflow: "unset",
                                    }}
                                  >
                                    <span className="subscription-price-text mb-0">
                                      Subscription Price:
                                    </span>

                                    <div className="d-flex align-items-center gap-2">
                                      <div className="dropdown position relative">
                                        <button
                                          class={`btn launchpad-dropdown d-flex gap-1 justify-content-between align-items-center dropdown-toggle2 w-100`}
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <div
                                            className="d-flex align-items-center gap-2"
                                            style={{ color: "#fff" }}
                                          >
                                            <img
                                              src={`https://cdn.worldofdypians.com/wod/${dropdownIcon.toLowerCase()}IconPremium.svg`}
                                              alt=""
                                              style={{
                                                width: 18,
                                                height: 18,
                                              }}
                                            />
                                            {/* {dropdownTitle} */}
                                          </div>
                                          <img
                                            src={
                                              "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                                            }
                                            alt=""
                                          />
                                        </button>
                                        <ul className="dropdown-menu w-100">
                                          {Object.keys(
                                            chainId === 1
                                              ? window.config
                                                  .subscriptioneth_tokens
                                              : chainId === 56
                                              ? window.config
                                                  .subscriptionbnb_tokens
                                              : chainId === 1030
                                              ? window.config
                                                  .subscriptioncfx_tokens
                                              : chainId === 43114
                                              ? window.config
                                                  .subscription_tokens
                                              : chainId === 8453
                                              ? window.config
                                                  .subscriptionbase_tokens
                                              : chainId === 1482601649
                                              ? window.config
                                                  .subscriptionskale_tokens
                                              : chainId === 88
                                              ? window.config
                                                  .subscriptionviction_tokens
                                              : chainId === 169
                                              ? window.config
                                                  .subscriptionmanta_tokens
                                              : chainId === 167000
                                              ? window.config
                                                  .subscriptiontaiko_tokens
                                              : chainId === 698
                                              ? window.config
                                                  .subscriptionmat_tokens
                                              : chainId === 1116
                                              ? window.config
                                                  .subscriptioncore_tokens
                                              : chainId === 1329
                                              ? window.config
                                                  .subscriptionsei_tokens
                                              : window.config
                                                  .subscriptioneth_tokens
                                          ).map((t, i) => (
                                            <li
                                              key={i}
                                              className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                              onClick={() => {
                                                window.cached_contracts =
                                                  Object.create(null);
                                                setTimeout(() => {
                                                  setdropdownIcon(
                                                    chainId === 1
                                                      ? window.config
                                                          .subscriptioneth_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 56
                                                      ? window.config
                                                          .subscriptionbnb_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 43114
                                                      ? window.config
                                                          .subscription_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 8453
                                                      ? window.config
                                                          .subscriptionbase_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1030
                                                      ? window.config
                                                          .subscriptioncfx_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1482601649
                                                      ? window.config
                                                          .subscriptionskale_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 88
                                                      ? window.config
                                                          .subscriptionviction_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 169
                                                      ? window.config
                                                          .subscriptionmanta_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 167000
                                                      ? window.config
                                                          .subscriptiontaiko_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 698
                                                      ? window.config
                                                          .subscriptionmat_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1116
                                                      ? window.config
                                                          .subscriptioncore_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1329
                                                      ? window.config
                                                          .subscriptionsei_tokens[
                                                          t
                                                        ]?.symbol
                                                      : window.config
                                                          .subscriptioneth_tokens[
                                                          t
                                                        ]?.symbol
                                                  );
                                                  setdropdownTitle(
                                                    chainId === 1
                                                      ? window.config
                                                          .subscriptioneth_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 56
                                                      ? window.config
                                                          .subscriptionbnb_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 43114
                                                      ? window.config
                                                          .subscription_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 8453
                                                      ? window.config
                                                          .subscriptionbase_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1030
                                                      ? window.config
                                                          .subscriptioncfx_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1482601649
                                                      ? window.config
                                                          .subscriptionskale_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 88
                                                      ? window.config
                                                          .subscriptionviction_tokens
                                                      : chainId === 169
                                                      ? window.config
                                                          .subscriptionmanta_tokens
                                                      : chainId === 167000
                                                      ? window.config
                                                          .subscriptiontaiko_tokens
                                                      : chainId === 698
                                                      ? window.config
                                                          .subscriptionmat_tokens
                                                      : chainId === 1116
                                                      ? window.config
                                                          .subscriptioncore_tokens
                                                      : chainId === 1329
                                                      ? window.config
                                                          .subscriptionsei_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1116
                                                      ? window.config
                                                          .subscriptioncore_tokens[
                                                          t
                                                        ]?.symbol
                                                      : window.config
                                                          .subscriptioneth_tokens[
                                                          t
                                                        ]?.symbol
                                                  );

                                                  // console.log(t);
                                                  handleSubscriptionTokenChange(
                                                    t
                                                  );
                                                  handleCheckIfAlreadyApproved(
                                                    t
                                                  );
                                                }, 200);
                                              }}
                                            >
                                              <img
                                                src={
                                                  chainId === 1
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioneth_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 56
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionbnb_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 43114
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscription_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 1030
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioncfx_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 8453
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionbase_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 1482601649
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionskale_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 1116
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioncore_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 88
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionviction_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 169
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionmanta_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 167000
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptiontaiko_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 698
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionmat_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : chainId === 1329
                                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionsei_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                    : `https://cdn.worldofdypians.com/wod/${window.config.subscriptioneth_tokens[
                                                        t
                                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                                }
                                                alt=""
                                                style={{
                                                  width: 18,
                                                  height: 18,
                                                }}
                                              />
                                              {chainId === 1
                                                ? window.config
                                                    .subscriptioneth_tokens[t]
                                                    ?.symbol
                                                : chainId === 56
                                                ? window.config
                                                    .subscriptionbnb_tokens[t]
                                                    ?.symbol
                                                : chainId === 43114
                                                ? window.config
                                                    .subscription_tokens[t]
                                                    ?.symbol
                                                : chainId === 1030
                                                ? window.config
                                                    .subscriptioncfx_tokens[t]
                                                    ?.symbol
                                                : chainId === 8453
                                                ? window.config
                                                    .subscriptionbase_tokens[t]
                                                    ?.symbol
                                                : chainId === 1482601649
                                                ? window.config
                                                    .subscriptionskale_tokens[t]
                                                    ?.symbol
                                                : chainId === 1116
                                                ? window.config
                                                    .subscriptioncore_tokens[t]
                                                    ?.symbol
                                                : chainId === 88
                                                ? window.config
                                                    .subscriptionviction_tokens[
                                                    t
                                                  ]?.symbol
                                                : chainId === 169
                                                ? window.config
                                                    .subscriptionmanta_tokens[t]
                                                    ?.symbol
                                                : chainId === 167000
                                                ? window.config
                                                    .subscriptiontaiko_tokens[t]
                                                    ?.symbol
                                                : chainId === 698
                                                ? window.config
                                                    .subscriptionmat_tokens[t]
                                                    ?.symbol
                                                : chainId === 1329
                                                ? window.config
                                                    .subscriptionsei_tokens[t]
                                                    ?.symbol
                                                : window.config
                                                    .subscriptioneth_tokens[t]
                                                    ?.symbol}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      <span className="subscription-price-token mb-0">
                                        {formattedPrice.slice(0, 7)}
                                      </span>
                                    </div>
                                    <span className="subscription-price-usd mb-0">
                                      $
                                      {100 -
                                        Number(
                                          discountPercentage != 0
                                            ? discountPercentage
                                            : discountPercentageViction != 0
                                            ? discountPercentageViction
                                            : discountPercentageTaiko != 0
                                            ? discountPercentageTaiko
                                            : discountPercentageMat != 0
                                            ? discountPercentageMat
                                            : discountPercentage
                                        )}
                                    </span>
                                  </div>
                                </div>
                              )}

                            {/* <div className="d-flex flex-column align-items-end justify-content-lg-end">
                                <span className="token-balance-placeholder">
                                  Token Balance
                                </span>
                                <h6 className="account-token-amount">
                                  {" "}
                                  {getFormattedNumber(
                                    tokenBalance / 10 ** tokenDecimals,
                                    6
                                  )}
                                </h6>
                              </div> */}
                          </div>
                        </>
                      )}
                      {/* <div
                              className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between  mt-3"
                              style={{ width: "100%" }}
                            >
                              <span className="token-amount-placeholder">
                                Subscription price:
                              </span>
                              <div className="d-flex align-items-center gap-2">
                                <span className="usdt-text">
                                  {formattedPrice.slice(0, 9)}
                                </span>

                                
                              </div>
                            </div> */}
                      {/* <div className="d-flex flex-column align-items-end justify-content-lg-end">
                        <span className="token-balance-placeholder">
                          Token Balance
                        </span>
                        <h6 className="account-token-amount">
                          {" "}
                          {getFormattedNumber(
                            tokenBalance / 10 ** tokenDecimals,
                            6
                          )}
                        </h6>
                      </div> */}
                    </div>
                  </>
                )}
                {/* <div
                      className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between  mt-3"
                      style={{ width: "100%" }}
                    >
                      <span className="token-amount-placeholder">
                        Subscription price:
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <span className="usdt-text">
                          {formattedPrice.slice(0, 9)}
                        </span>

                        
                      </div>
                    </div> */}
                {chainId === 1482601649 && (
                  <div className="gotoNebula-wrapper p-3 mb-3">
                    <div className="d-flex w-100 justify-content-between gap-2">
                      <span className="nebula-wrapper-text">
                        Bridge your USDC to Nebula now!
                      </span>
                      <a
                        className="nebula-bridgebtn"
                        href="https://portal.skale.space/bridge?from=mainnet&to=green-giddy-denebola&token=usdc&type=erc20"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Nebula Bridge
                      </a>
                    </div>
                  </div>
                )}
                {isConnected && discountPercentage > 0 && chainId === 56 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    <button
                      className={`btn ${
                        approveStatus === "fail" || !coinbase || isApproved
                          ? "disabled-btn"
                          : "connectbtn"
                      } px-4`}
                      disabled={
                        approveStatus === "fail" || !coinbase || isApproved
                          ? true
                          : false
                      }
                      onClick={(e) => handleApprove(e)}
                    >
                      {loadspinner === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "deposit" ||
                        approveStatus === "failsubscribe" ||
                        approveStatus === "approveAmount" ||
                        approveStatus === "successsubscribe") ? (
                        <>
                          Approve{" "}
                          {approveStatus === "approveAmount"
                            ? "token"
                            : nftPremium_total > 0
                            ? "NFT"
                            : ""}
                        </>
                      ) : loadspinner === false && approveStatus === "fail" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>

                    <button
                      className={`btn ${
                        isApproved === false ? "disabled-btn" : "connectbtn"
                      } px-4`}
                      onClick={() => handleSubscribe()}
                    >
                      {loadspinnerSub === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "fail" ||
                        approveStatus === "deposit") ? (
                        <>
                          {discountPercentage > 0 || nftPremium_total > 0
                            ? "Redeem"
                            : "Buy"}
                        </>
                      ) : loadspinnerSub === false &&
                        approveStatus === "successsubscribe" ? (
                        "Success"
                      ) : loadspinnerSub === false &&
                        approveStatus === "failsubscribe" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageViction > 0 &&
                  chainId === 88 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    <button
                      className={`btn ${
                        approveStatus === "fail" || !coinbase || isApproved
                          ? "disabled-btn"
                          : "connectbtn"
                      } px-4`}
                      disabled={
                        approveStatus === "fail" || !coinbase || isApproved
                          ? true
                          : false
                      }
                      onClick={(e) => handleApprove(e)}
                    >
                      {loadspinner === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "deposit" ||
                        approveStatus === "failsubscribe" ||
                        approveStatus === "approveAmount" ||
                        approveStatus === "successsubscribe") ? (
                        <>
                          Approve{" "}
                          {approveStatus === "approveAmount"
                            ? "token"
                            : nftPremium_totalViction > 0
                            ? "NFT"
                            : ""}
                        </>
                      ) : loadspinner === false && approveStatus === "fail" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>

                    <button
                      className={`btn ${
                        isApproved === false ? "disabled-btn" : "connectbtn"
                      } px-4`}
                      onClick={() => handleSubscribe()}
                    >
                      {loadspinnerSub === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "fail" ||
                        approveStatus === "deposit") ? (
                        <>
                          {discountPercentageViction > 0 ||
                          nftPremium_totalViction > 0
                            ? "Redeem"
                            : "Buy"}
                        </>
                      ) : loadspinnerSub === false &&
                        approveStatus === "successsubscribe" ? (
                        "Success"
                      ) : loadspinnerSub === false &&
                        approveStatus === "failsubscribe" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageTaiko > 0 &&
                  chainId === 167000 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    <button
                      className={`btn ${
                        approveStatus === "fail" || !coinbase || isApproved
                          ? "disabled-btn"
                          : "connectbtn"
                      } px-4`}
                      disabled={
                        approveStatus === "fail" || !coinbase || isApproved
                          ? true
                          : false
                      }
                      onClick={(e) => handleApprove(e)}
                    >
                      {loadspinner === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "deposit" ||
                        approveStatus === "failsubscribe" ||
                        approveStatus === "approveAmount" ||
                        approveStatus === "successsubscribe") ? (
                        <>
                          Approve{" "}
                          {approveStatus === "approveAmount"
                            ? "token"
                            : nftPremium_totalTaiko > 0
                            ? "NFT"
                            : ""}
                        </>
                      ) : loadspinner === false && approveStatus === "fail" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>

                    <button
                      className={`btn ${
                        isApproved === false ? "disabled-btn" : "connectbtn"
                      } px-4`}
                      onClick={() => handleSubscribe()}
                    >
                      {loadspinnerSub === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "fail" ||
                        approveStatus === "deposit") ? (
                        <>
                          {discountPercentageTaiko > 0 ||
                          nftPremium_totalTaiko > 0
                            ? "Redeem"
                            : "Buy"}
                        </>
                      ) : loadspinnerSub === false &&
                        approveStatus === "successsubscribe" ? (
                        "Success"
                      ) : loadspinnerSub === false &&
                        approveStatus === "failsubscribe" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageMat > 0 &&
                  chainId === 698 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    <button
                      className={`btn ${
                        approveStatus === "fail" || !coinbase || isApproved
                          ? "disabled-btn"
                          : "connectbtn"
                      } px-4`}
                      disabled={
                        approveStatus === "fail" || !coinbase || isApproved
                          ? true
                          : false
                      }
                      onClick={(e) => handleApprove(e)}
                    >
                      {loadspinner === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "deposit" ||
                        approveStatus === "failsubscribe" ||
                        approveStatus === "approveAmount" ||
                        approveStatus === "successsubscribe") ? (
                        <>
                          Approve{" "}
                          {approveStatus === "approveAmount"
                            ? "token"
                            : nftPremium_totalMat > 0
                            ? "NFT"
                            : ""}
                        </>
                      ) : loadspinner === false && approveStatus === "fail" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>

                    <button
                      className={`btn ${
                        isApproved === false ? "disabled-btn" : "connectbtn"
                      } px-4`}
                      onClick={() => handleSubscribe()}
                    >
                      {loadspinnerSub === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "fail" ||
                        approveStatus === "deposit") ? (
                        <>
                          {discountPercentageMat > 0 || nftPremium_totalMat > 0
                            ? "Redeem"
                            : "Buy"}
                        </>
                      ) : loadspinnerSub === false &&
                        approveStatus === "successsubscribe" ? (
                        "Success"
                      ) : loadspinnerSub === false &&
                        approveStatus === "failsubscribe" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>
                  </div>
                ) : isConnected && discountPercentage > 0 && chainId !== 56 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                      onClick={() => {
                        handleBnbPool();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Switch to BNB Chain
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageViction > 0 &&
                  chainId !== 88 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                      onClick={() => {
                        handleVictionPool();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Switch to Viction
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageTaiko > 0 &&
                  chainId !== 167000 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                      onClick={() => {
                        handleTaikoPool();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Switch to Taiko
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageMat > 0 &&
                  chainId !== 698 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                      onClick={() => {
                        handleMatPool();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Switch to Matchain
                    </button>
                  </div>
                ) : isConnected && coinbase ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    <button
                      className={`btn ${
                        approveStatus === "fail" || !coinbase || isApproved
                          ? "disabled-btn"
                          : "connectbtn"
                      } px-4`}
                      disabled={
                        approveStatus === "fail" || !coinbase || isApproved
                          ? true
                          : false
                      }
                      onClick={(e) => handleApprove(e)}
                    >
                      {loadspinner === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "deposit" ||
                        approveStatus === "approveAmount" ||
                        approveStatus === "failsubscribe" ||
                        approveStatus === "successsubscribe") ? (
                        <>Approve token</>
                      ) : loadspinner === false && approveStatus === "fail" ? (
                        "Failed"
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          Processing
                          <div
                            className="spinner-border "
                            role="status"
                            style={{
                              height: "1rem",
                              width: "1rem",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                    </button>

                    <button
                      className={`btn ${
                        isApproved === false ? "disabled-btn" : "connectbtn"
                      } px-4`}
                      onClick={() => handleSubscribe()}
                    >
                      {loadspinnerSub === false &&
                      (approveStatus === "initial" ||
                        approveStatus === "fail" ||
                        approveStatus === "deposit") ? (
                        <>Buy</>
                      ) : loadspinnerSub === false &&
                        approveStatus === "successsubscribe" ? (
                        "Success"
                      ) : loadspinnerSub === false &&
                        approveStatus === "failsubscribe" ? (
                        "Failed"
                      ) : (
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>
                      )}
                    </button>
                  </div>
                ) : (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                      onClick={() => {
                        setshowWalletModal(true);
                        setgetPremiumPopup(false);
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Connect wallet
                    </button>
                  </div>
                )}
                <div
                  className={`d-flex align-items-center justify-content-center`}
                >
                  {!coinbase && (
                    <span style={{ color: "rgb(227, 6 ,19)" }}>
                      Please connect your wallet first
                    </span>
                  )}
                  {/* <div className="d-flex flex-column gap-2 justify-content-end align-items-center">
                        <button
                          className={
                            "btn success-btn px-4 align-self-end"
                          }
                          disabled={
                            approveStatus === "fail" || !coinbase
                              ? true
                              : false
                          }
                          style={{
                            background:
                              approveStatus === "fail"
                                ? "linear-gradient(90.74deg, #f8845b 0%, #f0603a 100%)"
                                : "linear-gradient(90.74deg, #75CAC2 0%, #57B6AB 100%)",
                          }}
                          onClick={(e) =>
                            isApproved === false
                              ? handleApprove(e)
                              : handleSubscribe()
                          }
                        >
                          {isApproved === true &&
                          loadspinner === false &&
                          loadspinnerSub === false &&
                          (approveStatus === "deposit" ||
                            approveStatus === "initial") ? (
                            "Subscribe"
                          ) : isApproved === false &&
                            loadspinner === false &&
                            approveStatus === "initial" &&
                            loadspinnerSub === false ? (
                            "Approve"
                          ) : loadspinner === false &&
                            approveStatus === "fail" &&
                            loadspinnerSub === false ? (
                            "Failed"
                          ) : (
                            <div
                              className="spinner-border "
                              role="status"
                              style={{
                                height: "1.5rem",
                                width: "1.5rem",
                              }}
                            ></div>
                          )}
                        </button>
                        <span style={{ color: "#E30613" }}>
                          {status}
                        </span>
                      </div> */}
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        )}

        {balancePopup && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setBalancePopup(false);
            }}
          >
            <div
              className="popup-wrapper popup-active p-4"
              id="subscribe"
              style={{ width: "40%", pointerEvents: "auto" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h2
                  className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                >
                  My Balance
                </h2>
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => setBalancePopup(false)}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
              <MyBalance
                dypBalance={dypBalance}
                dypBalancebnb={dypBalancebnb}
                dypBalanceavax={dypBalanceavax}
                idypBalance={idypBalance}
                idypBalancebnb={idypBalancebnb}
                idypBalanceavax={idypBalanceavax}
              />
            </div>
          </OutsideClickHandler>
        )}
        {specialRewardsPopup && (
          <OutsideClickHandler
            onOutsideClick={() => setSpecialRewardsPopup(false)}
          >
            <div
              className="popup-wrapper popup-active p-3"
              style={{ width: "30%", pointerEvents: "auto" }}
            >
              {specialRewardsSuccess === "Email sent successfully" ? (
                <>
                  <div className="d-flex align-items-center justify-content-end w-100 mb-4">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSpecialRewardsPopup(false)}
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
                    <h6 className="rewards-success-title font-organetto">
                      Successfully
                    </h6>
                    <h6
                      className="rewards-success-title font-organetto"
                      style={{ color: "#8C56FF" }}
                    >
                      Applied
                    </h6>
                  </div>
                  <div className="d-flex w-100 justify-content-center mb-4">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/successMark.svg"}
                      alt=""
                    />
                  </div>
                  <div className="d-flex w-100 justify-content-center">
                    <p
                      className="popup-paragraph w-50"
                      style={{ textAlign: "center" }}
                    >
                      Congratulations, your Special Reward application request
                      is submitted. Please check back soon when our team reviews
                      your application.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center justify-content-between w-100 mb-4">
                    <h6 className="popup-title-2 mb-0">Special Rewards</h6>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSpecialRewardsPopup(false)}
                      alt=""
                    />
                  </div>
                  <p className="popup-paragraph">
                    The Special Rewards program is designed to recognize and
                    reward players for sharing their World of Dypians gameplay
                    content on various social media platforms, including X
                    (Twitter), Instagram, TikTok, YouTube, Facebook, Reddit, and
                    more.
                    <ul className="mt-3">
                      <li>
                        Minimum requirement of 1,000 followers on social media.
                      </li>
                    </ul>
                  </p>
                  <p className="popup-paragraph mb-4">
                    The WOD Team will review the quality of the content, the
                    engagement of the post, and other details. If you are
                    eligible, they will determine the reward, which is
                    distributed in BNB on a monthly basis.
                  </p>
                  <p className="popup-paragraph mb-4">
                    <b>*Note:</b> You can submit one post per time. The team
                    will not reply in any form, but if you are eligible, you
                    will see the reward here. The display of the rewards will
                    occur every Monday and will be distributed monthly.
                  </p>
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <StyledTextField
                      error={errors?.url ? true : false}
                      size="small"
                      label="URL"
                      id="email"
                      name="email"
                      value={mediaUrl}
                      helperText={errors?.url}
                      required
                      onChange={(e) => {
                        setMediaUrl(e.target.value);
                      }}
                      sx={{ width: "100%" }}
                    />
                    <div
                      className={`${
                        !email || !coinbase
                          ? "linear-border-disabled"
                          : "linear-border"
                      }`}
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <button
                        className={`btn ${
                          !email || !coinbase
                            ? "outline-btn-disabled"
                            : "filled-btn"
                        } px-5`}
                        onClick={handleSubmit}
                        disabled={!email || !coinbase ? true : false}
                      >
                        {loading ? (
                          <div
                            className="spinner-border text-light spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                      <ReCaptchaV2
                        sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
                        style={{ display: "inline-block" }}
                        theme="dark"
                        size="invisible"
                        ref={recaptchaRef}
                      />
                    </div>
                  </div>
                  <hr className="linear-divider" />
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="my-special-rewards mb-0">My Rewards</span>
                    <h6 className="my-special-rewards-value mb-0">
                      ${getFormattedNumber(Number(userSocialRewardsCached), 2)}
                    </h6>
                  </div>
                </>
              )}
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
