/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { dashboardBackground } from "../../Themes/Images";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { getWalletTokens } from "../../web3/tmp";
import { Grid } from "@mui/material";
import { HashLoader } from "react-spinners";
import { Cart, LoginWrapper, ErrorAlert, Button } from "../../Components";
import LandCart from "../../Components/Cart/LandCart";
import EmptyCard from "../../Components/Cart/EmptyCard";
import classes from "./Dashboard.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";
import WalletBalance from "../../Components/WalletBalance/WalletBalance";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import ChecklistModal from "../../Components/ChecklistModal/ChecklistModal";
import ChecklistLandNftModal from "../../Components/ChecklistModal/ChecklistLandNftModal";
import EmptyGenesisCard from "../../Components/EmptyGenesisCard/EmptyGenesisCard";
import Web3 from "web3";
import { ERC20_ABI } from "../../web3/abis";
import _, { chain } from "lodash";
import GlobalLeaderboard from "../../../../../components/LeaderBoard/GlobalLeaderboard";
import WalletModal from "../../../../../components/WalletModal/WalletModal";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import getListedNFTS from "../../../../../actions/Marketplace";
import axios from "axios";
import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import NewWalletBalance from "../../Components/WalletBalance/NewWalletBalance";
import DailyBonusPopup from "../../Components/WalletBalance/DailyBonusPopup";
import rewardPopup from "../../Components/WalletBalance/assets/rewardspopup3.webp";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "../../Components/WalletBalance/newAssets/xMark.svg";
import MyRewardsPopup from "../../Components/WalletBalance/MyRewardsPopup";
import coinStackIcon from "../../Images/premium/coinStackIcon.svg";
import launchpadIndicator from "../../Images/premium/launchpadIndicator.svg";
import dappsIcon from "../../Images/premium/dappsIcon.svg";
import metaverseIcon from "../../Images/premium/metaverseIcon.svg";
import greenCheck from "../../Images/premium/greenCheck.svg";
import premiumIcon from "../../Images/premium/premiumIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import MyBalance from "../../Components/WalletBalance/MyBalance";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import conflux from "../../Components/WalletBalance/assets/conflux.svg";
import baseLogo from "../../Components/WalletBalance/assets/baseLogo.svg";
import DailyBonusModal from "../../../../Marketplace/DailyBonusModal";
import NewLeaderBoard from "../../Components/LeaderBoard/NewLeaderBoard";
import GenesisLeaderboard from "../../Components/LeaderBoard/GenesisLeaderboard";
import NewDailyBonus from "../../../../../components/NewDailyBonus/NewDailyBonus";
import skaleIcon from "../../../../../components/NewDailyBonus/assets/skaleIcon.svg";
import immutableIcon from "../../../../../components/NewDailyBonus/assets/immutableLogo.svg";

import seiIcon from "../../../../../components/NewDailyBonus/assets/seiIcon.svg";
import coreIcon from "../../../../../components/NewDailyBonus/assets/coreIcon.svg";
import vicitonIcon from "../../../../../components/NewDailyBonus/assets/victionIcon.svg";

import MyRewardsPopupNew from "../../Components/WalletBalance/MyRewardsPopup2";
import { DYP_700_ABI, DYP_700V1_ABI } from "../../web3/abis";
import { dyp700Address, dyp700v1Address } from "../../web3";
import { NavLink } from "react-router-dom";
import premiumRedTag from "../../../../../assets/redPremiumTag.svg";
import TopSection from "./Components/TopSection/TopSection";
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
} from "./stars";

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
  dyptokenData_old,
  handleSwitchChain,
  onSubscribeSuccess,
  isPremium,
  dyptokenDatabnb,
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
  onManageLogin,
  authToken,
}) {
  const { email, logout } = useAuth();

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

    // {
    //   name: "SEI",
    //   symbol: "sei",
    // },
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

  const [tokensState, setTokensState] = useState({});
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [showChecklistLandNftModal, setshowChecklistLandNftModal] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [userRankRewards, setUserRankRewards] = useState(0);
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();
  const [idypBalance, setiDypBalance] = useState();
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
  const [myMatNfts, setmyMatNfts] = useState([]);

  const [latestVersion, setLatestVersion] = useState(0);

  const [userPoints, setuserPoints] = useState(0);
  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnETH, setuserEarnETH] = useState(0);

  const [cmcuserPoints, setcmcuserPoints] = useState(0);
  const [cmcuserEarnUsd, setcmcuserEarnUsd] = useState(0);
  const [cmcuserEarnETH, setcmcuserEarnETH] = useState(0);

  const [confluxUserPoints, setConfluxUserPoints] = useState(0);
  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnCFX, setConfluxEarnCFX] = useState(0);

  const [gateEarnUSD, setGateEarnUSD] = useState(0);
  const [gateUserPoints, setGateUserPoints] = useState(0);
  const [gateEarnBnb, setGateEarnBNB] = useState(0);

  const [matEarnUsd, setmatEarnUsd] = useState(0);
  const [matEarnToken, setmatEarnToken] = useState(0);
  const [matPoints, setmatPoints] = useState(0);

  const [dogeUserPoints, setDogeUserPoints] = useState(0);
  const [dogeEarnUSD, setDogeEarnUSD] = useState(0);
  const [dogeEarnBNB, setDogeEarnBNB] = useState(0);

  const [baseUserPoints, setBaseUserPoints] = useState(0);
  const [baseEarnUSD, setBaseEarnUSD] = useState(0);
  const [baseEarnETH, setBaseEarnETH] = useState(0);

  const [bnbEarnToken, setBnbEarnToken] = useState(0);
  const [bnbEarnUsd, setBnbEarnUsd] = useState(0);
  const [bnbPoints, setBnbPoints] = useState(0);

  const [dypiusEarnTokens, setDypiusEarnTokens] = useState(0);
  const [dypiusEarnUsd, setDypiusEarnUsd] = useState(0);

  const [dypiusPremiumEarnTokens, setdypiusPremiumEarnTokens] = useState(0);
  const [dypiusPremiumEarnUsd, setdypiusPremiumEarnUsd] = useState(0);
  const [dypiusPremiumPoints, setdypiusPremiumPoints] = useState(0);

  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [skaleEarnToken, setSkaleEarnToken] = useState(0);
  const [skalePoints, setSkalePoints] = useState(0);

  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);

  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [MyNFTSCawsOld, setMyNFTSCawsOld] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [listedNFTS, setListedNFTS] = useState([]);

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
  const [dailyBonusInfo, setdailyBonusInfo] = useState(false);

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

  const [countdown700, setcountdown700] = useState();
  const [count, setCount] = useState(0);
  const [skalecount, setskalecount] = useState(0);
  const [vicitoncount, setvicitoncount] = useState(0);
  const [corecount, setcorecount] = useState(0);
  const [mantacount, setmantacount] = useState(0);
  const [taikocount, settaikocount] = useState(0);
  const [basecount, setbasecount] = useState(0);
  const [matcount, setmatcount] = useState(0);


  const [rankData, setRankData] = useState({});
  const [userRank, setUserRank] = useState("");
  const [userRank2, setUserRank2] = useState("");
  const [userBnbScore, setUserBnbScore] = useState(0);
  const [genesisRank, setGenesisRank] = useState("");
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
  const [seiEarnUsd, setSeiEarnUsd] = useState(0);
  const [seiPrice, setSeiPrice] = useState(0);
  const [seiEarnToken, setSeiEarnToken] = useState(0);
  const [seiPoints, setSeiPoints] = useState(0);
  const [coreEarnUsd, setCoreEarnUsd] = useState(0);
  const [corePrice, setCorePrice] = useState(0);
  const [coreEarnToken, setCoreEarnToken] = useState(0);
  const [corePoints, setCorePoints] = useState(0);
  const [victionEarnUsd, setVictionEarnUsd] = useState(0);
  const [victionPrice, setVictionPrice] = useState(0);
  const [victionEarnToken, setVictionEarnToken] = useState(0);
  const [victionPoints, setVictionPoints] = useState(0);

  const [taikoEarnUsd, setTaikoEarnUsd] = useState(0);
  const [taikoPrice, setTaikoPrice] = useState(0);
  const [taikoEarnToken, setTaikoEarnToken] = useState(0);
  const [taikoPoints, setTaikoPoints] = useState(0);

  const [cookieEarnUsd, setCookieEarnUsd] = useState(0);
  const [cookiePrice, setCookiePrice] = useState(0);
  const [cookieEarnToken, setCookieEarnToken] = useState(0);
  const [cookiePoints, setCookiePoints] = useState(0);

  const [immutableEarnUsd, setImmutableEarnUsd] = useState(0);
  const [immutablePrice, setImmutablePrice] = useState(0);
  const [immutableEarnToken, setImmutableEarnToken] = useState(0);
  const [immutablePoints, setImmutablePoints] = useState(0);

  const [mantaEarnUsd, setMantaEarnUsd] = useState(0);
  const [mantaPrice, setMantaPrice] = useState(0);
  const [mantaEarnToken, setMantaEarnToken] = useState(0);
  const [mantaPoints, setMantaPoints] = useState(0);

  const [multiversEarnUsd, setmultiversEarnUsd] = useState(0);
  const [multiversPrice, setmultiversPrice] = useState(0);
  const [multiversEarnToken, setmultiversEarnToken] = useState(0);
  const [multiversPoints, setmultiversPoints] = useState(0);

  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [nftPremium_tokenId, setnftPremium_tokenId] = useState(0);
  const [nftPremium_total, setnftPremium_total] = useState(0);
  const [nftDiscountObject, setnftDiscountObject] = useState([]);

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

  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");
  const leaderboardId = document.querySelector("#leaderboard");
  const { BigNumber } = window;
  const now = new Date();
  const isAfterNovember2nd = now.getUTCMonth() === 10 && now.getUTCDate() >= 2; // November is month 10 (0-indexed)

  //leaderboard calls

  const fetchEgldPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setmultiversPrice(obj.data.tomochain.usd);
      });
  };

  const fetchImmutablePrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=immutable-x&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setImmutablePrice(obj.data["immutable-x"].usd);
      });
  };

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify(
            {
              email: email,
              publicAddress: userAddress,
            }
            // {
            //   "email": "renato@outerlynx.com",
            //   "publicAddress": "0x09e62eB71e29e11a21E1f541750580E45d3Ab7e0"
            // }
          ),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.events) {
          const coingeckoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coingecko";
          });
          const confluxEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "conflux";
          });
          const skaleEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "skale";
          });
          const bnbEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "bnb";
          });

          const coreEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "core";
          });

          const victionEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "viction";
          });

          const mantaEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "manta";
          });

          const matEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "matchain";
          });

          const taikoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "taiko";
          });

          const multiversEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "multivers";
          });

          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });

          const baseEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "base";
          });

          const dypEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "all";
          });

          const dogeEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "dogecoin";
          });

          const cmcEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coinmarketcap";
          });

          const dypPremiumEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "subscriber";
          });

          const immutableEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "immutable";
          });

          const cookieEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "cookie3";
          });

          if (dypPremiumEvent && dypPremiumEvent[0]) {
            const userEarnedusd =
              dypPremiumEvent[0].reward.earn.total /
              dypPremiumEvent[0].reward.earn.multiplier;
            const pointsdypius = dypPremiumEvent[0].reward.earn.totalPoints;

            setdypiusPremiumPoints(pointsdypius);
            setdypiusPremiumEarnUsd(userEarnedusd);
            setdypiusPremiumEarnTokens(userEarnedusd / bnbPrice);
          }
          if (bnbEvent && bnbEvent[0]) {
            const userEarnedusd =
              bnbEvent[0].reward.earn.total /
              bnbEvent[0].reward.earn.multiplier;
            const pointsBnb = bnbEvent[0].reward.earn.totalPoints;

            setBnbPoints(pointsBnb);
            setBnbEarnUsd(userEarnedusd);
            setBnbEarnToken(userEarnedusd / bnbPrice);
          }

          if (immutableEvent && immutableEvent[0]) {
            const userEarnedusd =
              immutableEvent[0].reward.earn.total /
              immutableEvent[0].reward.earn.multiplier;
            const pointsBnb = immutableEvent[0].reward.earn.totalPoints;

            setImmutablePoints(pointsBnb);
            setImmutableEarnUsd(userEarnedusd);
            setImmutableEarnToken(userEarnedusd / immutablePrice);
          }

          if (taikoEvent && taikoEvent[0]) {
            const userEarnedusd =
              taikoEvent[0].reward.earn.total /
              taikoEvent[0].reward.earn.multiplier;
            const pointsTaiko = taikoEvent[0].reward.earn.totalPoints;
            setTaikoPoints(pointsTaiko);
            setTaikoEarnUsd(userEarnedusd);
            setTaikoEarnToken(userEarnedusd / taikoPrice);
          }

          if (cookieEvent && cookieEvent[0]) {
            const userEarnedusd =
              cookieEvent[0].reward.earn.total /
              cookieEvent[0].reward.earn.multiplier;
            const pointsBnb = cookieEvent[0].reward.earn.totalPoints;

            setCookiePoints(pointsBnb);
            setCookieEarnUsd(userEarnedusd);
            setCookieEarnToken(userEarnedusd / cookiePrice);
          }

          if (matEvent && matEvent[0]) {
            const userEarnedusd =
            matEvent[0].reward.earn.total /
            matEvent[0].reward.earn.multiplier;
            const pointsMat = matEvent[0].reward.earn.totalPoints;
            setmatPoints(pointsMat);
            setmatEarnToken(userEarnedusd / bnbPrice);
            setmatEarnUsd(userEarnedusd);
          }

          if (coreEvent && coreEvent[0]) {
            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;
            const pointsCore = coreEvent[0].reward.earn.totalPoints;
            setCorePoints(pointsCore);
            setCoreEarnUsd(userEarnedusd);
            setCoreEarnToken(userEarnedusd / corePrice);
          }

          if (victionEvent && victionEvent[0]) {
            const userEarnedusd =
              victionEvent[0].reward.earn.total /
              victionEvent[0].reward.earn.multiplier;
            const pointsViction = victionEvent[0].reward.earn.totalPoints;
            setVictionPoints(pointsViction);
            setVictionEarnUsd(userEarnedusd);
            setVictionEarnToken(userEarnedusd / victionPrice);
          }

          if (mantaEvent && mantaEvent[0]) {
            const userEarnedusd =
              mantaEvent[0].reward.earn.total /
              mantaEvent[0].reward.earn.multiplier;
            const pointsManta = mantaEvent[0].reward.earn.totalPoints;
            setMantaPoints(pointsManta);
            setMantaEarnUsd(userEarnedusd);
            setMantaEarnToken(userEarnedusd / mantaPrice);
          }

          if (multiversEvent && multiversEvent[0]) {
            const userEarnedusd =
              multiversEvent[0].reward.earn.total /
              multiversEvent[0].reward.earn.multiplier;
            const pointsmultivers = multiversEvent[0].reward.earn.totalPoints;
            setmultiversPoints(pointsmultivers);
            setmultiversEarnUsd(userEarnedusd);
            setmultiversEarnToken(userEarnedusd / multiversPrice);
          }

          if (dypEvent && dypEvent[0]) {
            const userEarnedDyp =
              dypEvent[0].reward.earn.total /
              dypEvent[0].reward.earn.multiplier;
            setDypiusEarnUsd(dyptokenDatabnb * userEarnedDyp);
            setDypiusEarnTokens(userEarnedDyp);
          }

          if (coingeckoEvent && coingeckoEvent[0]) {
            const points = coingeckoEvent[0].reward.earn.totalPoints;
            setuserPoints(points);
            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;
            setuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setuserEarnETH(usdValue / bnbPrice);
            }
          }

          if (cmcEvent && cmcEvent[0]) {
            const points = cmcEvent[0].reward.earn.totalPoints;
            setcmcuserPoints(points);
            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;
            setcmcuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setcmcuserEarnETH(usdValue / bnbPrice);
            }
          }
          if (skaleEvent && skaleEvent[0]) {
            const points = skaleEvent[0].reward.earn.totalPoints;
            setSkalePoints(points);
            const usdValue =
              skaleEvent[0].reward.earn.total /
              skaleEvent[0].reward.earn.multiplier;
            setSkaleEarnUsd(usdValue);
            if (skalePrice !== 0) {
              setSkaleEarnToken(usdValue / skalePrice);
            }
          }

          if (dogeEvent && dogeEvent[0]) {
            const points = dogeEvent[0].reward.earn.totalPoints;
            setDogeUserPoints(points);
            const usdValue =
              dogeEvent[0].reward.earn.total /
              dogeEvent[0].reward.earn.multiplier;
            setDogeEarnUSD(usdValue);
            if (dogePrice !== 0) {
              setDogeEarnBNB(usdValue / dogePrice);
            }
          }

          if (confluxEvent && confluxEvent[0]) {
            const cfxPoints = confluxEvent[0].reward.earn.totalPoints;
            setConfluxUserPoints(cfxPoints);

            if (confluxEvent[0].reward.earn.multiplier !== 0) {
              const cfxUsdValue =
                confluxEvent[0].reward.earn.total /
                confluxEvent[0].reward.earn.multiplier;
              setConfluxEarnUSD(cfxUsdValue);

              if (cfxPrice !== 0) {
                setConfluxEarnCFX(cfxUsdValue / cfxPrice);
              }
            }
          }

          if (gateEvent && gateEvent[0]) {
            const gatePoints = gateEvent[0].reward.earn.totalPoints;
            setGateUserPoints(gatePoints);
            if (gateEvent[0].reward.earn.multiplier !== 0) {
              const gateUsdValue =
                gateEvent[0].reward.earn.total /
                gateEvent[0].reward.earn.multiplier;
              setGateEarnUSD(gateUsdValue);

              if (bnbPrice !== 0) {
                setGateEarnBNB(gateUsdValue / bnbPrice);
              }
            }
          }

          if (baseEvent && baseEvent[0]) {
            const basePoints = baseEvent[0].reward.earn.totalPoints;
            setBaseUserPoints(basePoints);
            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;
              setBaseEarnUSD(baseUsdValue);
              if (ethTokenData !== 0) {
                setBaseEarnETH(baseUsdValue / ethTokenData);
              }
            }
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (email && userWallet) {
      fetchTreasureHuntData(email, userWallet);
    }
  }, [
    email,
    userWallet,
    cfxPrice,
    bnbPrice,
    skalePrice,
    dyptokenDatabnb,
    corePrice,
    mantaPrice,
    victionPrice,
  ]);

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


  const [allBnbData, setAllBnbData] = useState([]);
  const [allSkaleData, setAllSkaleData] = useState([]);
  const [allCoreData, setAllCoreData] = useState([]);
  const [allVictionData, setAllVictionData] = useState([]);
  const [allMantaData, setAllMantaData] = useState([]);
  const [allTaikoData, setAllTaikoData] = useState([]);
  const [allBaseData, setAllBaseData] = useState([]);
  const [allMatData, setAllMatData] = useState([]);


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
  const [activePlayerMatMonthly, setActivePlayerMatMonthly] =
    useState(false);
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        StatisticName: "LeaderboardMatChainDaily",
        StartPosition: 0,
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
                ? Number(monthlyStarPrizes[99]) + Number(monthlyExtraStarPrizes[99])
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
        MaxResultsCount: 10,
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
                ? Number(monthlyStarPrizes[99]) + Number(monthlyExtraStarPrizes[99])
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
        MaxResultsCount: 10,
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
                ? Number(weeklyStarPrizes[99]) + Number(weeklyExtraStarPrizes[99])
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
                ? Number(weeklyStarPrizes[99]) + Number(weeklyExtraStarPrizes[99])
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

  const fetchPreviousWinners = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: isAfterNovember2nd ? 100 : 10,
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
        StatisticName: "GenesisLandRewards",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsGenesis(result.data.data.leaderboard);

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
      StatisticName: "GenesisLandRewards",
      StartPosition: 0,
      MaxResultsCount: 10,
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

  const fetchMonthlyGenesisRecordsAroundPlayer = async (itemData) => {
    const data = {
      StatisticName: "GenesisLandRewards",
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

      if (itemData.length > 0) {
        var testArray2 = itemData.filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerGenesis(true);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerGenesis(false);
          // setUserDataMonthly(...testArray);
          setUserDataGenesis(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerGenesis(false);
        // setUserDataMonthly(...testArray);
        setUserDataGenesis(...testArray);
      }
    }
  };

  const isUserInTop100 = (data, userId) => {
    return data.findIndex((item) => item.playerId === userId) !== -1;
  };

  const addPointsForPremium = (user, points) => {
    if (user && user.statValue !== undefined && user.statValue !== "---") {
      return { ...user, statValue: user.statValue + points };
    }
  };

  const updateLeaderboard = (data, updatedUser) => {
    const updatedData = data.map((item) =>
      item.playerId === updatedUser.playerId ? updatedUser : item
    );
    return updatedData.sort((a, b) => b.statValue - a.statValue).slice(0, 100);
  };

  const updateLeaderboard2 = (data) => {
    return data
      .sort((a, b) => {
        if (a.statValue === "---" || a.playerId === undefined) return 1;
        if (b.statValue === "---" || b.playerId === undefined) return -1;
        return b.statValue - a.statValue;
      })
      .slice(0, 100);
  };

  useEffect(() => {
    if (logoutCount > 0) {
      onSubscribeSuccess();
      setclaimedChests(0);
      setclaimedPremiumChests(0);
      setclaimedCorePremiumChests(0);
      setclaimedCoreChests(0);
      setclaimedVictionPremiumChests(0);
      setclaimedVictionChests(0);
      setallChests([]);
      setallSkaleChests([]);
      setallCoreChests([]);
      setallVictionChests([]);
      setOpenedChests([]);
      setOpenedCoreChests([]);
      setOpenedVictionChests([]);
      setOpenedSkaleChests([]);
      setclaimedSkaleChests(0);
      setclaimedSkalePremiumChests(0);
      refetchPlayer();
    }
  }, [logoutCount]);

  useEffect(() => {
    if (username !== undefined && userId !== undefined) {
      fetchDailyRecords();
      // fetchWeeklyRecords();
      fetchMonthlyRecords();
      fetchGenesisRecords();
      fetchDailyRecordsCore();
      // fetchWeeklyRecordsCore();
      fetchMonthlyRecordsCore();
      fetchDailyRecordsViction();
      // fetchWeeklyRecordsViction();
      fetchMonthlyRecordsViction();
      fetchDailyRecordsManta();
      // fetchWeeklyRecordsManta();
      fetchMonthlyRecordsManta();
      fetchDailyRecordsBase();
      // fetchWeeklyRecordsBase();
      fetchMonthlyRecordsBase();
      fetchDailyRecordsTaiko();
      // fetchWeeklyRecordsTaiko();
      fetchMonthlyRecordsTaiko();
      fetchDailyRecordsSkale();
      // fetchWeeklyRecordsSkale();
      fetchMonthlyRecordsSkale();
      fetchRecordsStar();
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
  const lastUpdated = useRef(false);
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

  // useEffect(() => {
  //   const playerActiveArray = [
  //     activePlayer,
  //     activePlayerBase,
  //     activePlayerCore,
  //     activePlayerManta,
  //     activePlayerSkale,
  //     activePlayerViction,
  //     activePlayerTaiko,
  //   ];
  //   const allFalse = playerActiveArray.every((v) => v === false);

  //   // Exit if critical dependencies aren't available
  //   if (
  //     !allStarData.activeData ||
  //     !userId ||
  //     !isPremium ||
  //     userDataStar.statValue === undefined ||
  //     userDataStarWeekly.statValue === undefined
  //   )
  //     return;

  //   if (!lastUpdated.current) {
  //     let updatedActiveData = [...allStarData.activeData];
  //     let updatedActiveDataWeekly = [...allStarData.activeDataWeekly];

  //     let userUpdated = false;
  //     let userUpdatedWeekly = false;
  //     if (!allFalse && isPremium) {
  //       // Check if user is in top 100 and adjust points if premium
  //       if (isUserInTop100(updatedActiveData, userId)) {
  //         const userIndex = updatedActiveData.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         updatedActiveData[userIndex] = addPointsForPremium(
  //           updatedActiveData[userIndex],
  //           50
  //         );
  //         userUpdated = true;
  //       } else if (
  //         isPremium &&
  //         !allFalse &&
  //         userDataStar.statValue !== undefined &&
  //         userDataStarWeekly.statValue !== undefined
  //       ) {
  //         // User not in top 100, add points and check ranking again

  //         const updatedUser = addPointsForPremium(userDataStar, 50);
  //         updatedActiveData.push(updatedUser);
  //         userUpdated = true;
  //       }

  //       if (isUserInTop100(updatedActiveDataWeekly, userId)) {
  //         const userIndex = updatedActiveDataWeekly.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         updatedActiveDataWeekly[userIndex] = addPointsForPremium(
  //           updatedActiveDataWeekly[userIndex],
  //           50
  //         );
  //         userUpdatedWeekly = true;
  //       } else if (
  //         isPremium &&
  //         !allFalse &&
  //         userDataStarWeekly.statValue !== undefined
  //       ) {
  //         const updatedWeeklyUser = addPointsForPremium(userDataStarWeekly, 50);
  //         updatedActiveDataWeekly.push(updatedWeeklyUser);
  //         userUpdatedWeekly = true;
  //       }

  //       if (userUpdated || userUpdatedWeekly) {
  //         const sortedActiveData = updateLeaderboard2(updatedActiveData);
  //         const playerIndex = sortedActiveData.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         const sortedActiveDataFinal = sortedActiveData.map((item, index) => {
  //           if (index === playerIndex) {
  //             return { ...item, position: playerIndex };
  //           } else return { ...item };
  //         });

  //         const sortedActiveDataWeekly = updateLeaderboard2(
  //           updatedActiveDataWeekly
  //         );

  //         const playerIndexWeekly = sortedActiveDataWeekly.findIndex(
  //           (item) => item.playerId === userId
  //         );

  //         const sortedActiveDataFinalWeekly = sortedActiveDataWeekly.map(
  //           (item, index) => {
  //             if (index === playerIndexWeekly) {
  //               return { ...item, position: playerIndexWeekly };
  //             } else return { ...item };
  //           }
  //         );

  //         setUserDataStar(sortedActiveDataFinal[playerIndex]);
  //         setUserDataStarWeekly(sortedActiveDataFinalWeekly[playerIndexWeekly]);

  //         if (goldenPassRemainingTime) {
  //           setDataAmountStar(
  //             sortedActiveDataFinal[playerIndex].statValue !== 0
  //               ? playerIndex > 100
  //                 ? 0
  //                 : playerIndex === 100
  //                 ? Number(monthlyStarPrizes[99]) +
  //                   Number(monthlyStarPrizes[99])
  //                 : Number(monthlyStarPrizes[playerIndex]) +
  //                   Number(monthlyStarPrizes[playerIndex])
  //               : 0
  //           );
  //           setDataAmountStarWeekly(
  //             sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
  //               ? playerIndexWeekly > 100
  //                 ? 0
  //                 : playerIndexWeekly === 100
  //                 ? Number(weeklyStarPrizes[99]) + Number(weeklyStarPrizes[99])
  //                 : Number(weeklyStarPrizes[playerIndexWeekly]) +
  //                   Number(weeklyStarPrizes[playerIndexWeekly])
  //               : 0
  //           );
  //         } else if (!goldenPassRemainingTime) {
  //           setDataAmountStar(
  //             sortedActiveDataFinal[playerIndex].statValue !== 0
  //               ? playerIndex > 100
  //                 ? 0
  //                 : playerIndex === 100
  //                 ? Number(monthlyStarPrizes[99])
  //                 : Number(monthlyStarPrizes[playerIndex])
  //               : 0
  //           );
  //           setDataAmountStarWeekly(
  //             sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
  //               ? playerIndexWeekly > 100
  //                 ? 0
  //                 : playerIndexWeekly === 100
  //                 ? Number(weeklyStarPrizes[99])
  //                 : Number(weeklyStarPrizes[playerIndexWeekly])
  //               : 0
  //           );
  //         }

  //         setAllStarData((prevData) => ({
  //           ...prevData,
  //           activeData: sortedActiveDataFinal,
  //           activeDataWeekly: sortedActiveDataFinalWeekly,

  //           player_data: sortedActiveDataFinal[playerIndex],
  //           player_data_weekly: sortedActiveDataFinalWeekly[playerIndexWeekly],
  //         }));
  //         lastUpdated.current = true; // Mark as updated to avoid repeated updates
  //       }
  //     } else {
  //       if (isUserInTop100(updatedActiveData, userId)) {
  //         const userIndex = updatedActiveData.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         updatedActiveData[userIndex] = addPointsForPremium(
  //           updatedActiveData[userIndex],
  //           0
  //         );
  //         userUpdated = true;
  //       } else if (
  //         userDataStar.statValue !== undefined &&
  //         userDataStarWeekly.statValue !== undefined
  //       ) {
  //         // User not in top 100, add points and check ranking again

  //         const updatedUser = addPointsForPremium(userDataStar, 0);
  //         updatedActiveData.push(updatedUser);
  //         userUpdated = true;
  //       }

  //       if (isUserInTop100(updatedActiveDataWeekly, userId)) {
  //         const userIndex = updatedActiveDataWeekly.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         updatedActiveDataWeekly[userIndex] = addPointsForPremium(
  //           updatedActiveDataWeekly[userIndex],
  //           0
  //         );
  //         userUpdatedWeekly = true;
  //       } else if (userDataStarWeekly.statValue !== undefined) {
  //         const updatedWeeklyUser = addPointsForPremium(userDataStarWeekly, 0);
  //         updatedActiveDataWeekly.push(updatedWeeklyUser);
  //         userUpdatedWeekly = true;
  //       }

  //       if (userUpdated || userUpdatedWeekly) {
  //         const sortedActiveData = updateLeaderboard2(updatedActiveData);
  //         const playerIndex = sortedActiveData.findIndex(
  //           (item) => item.playerId === userId
  //         );
  //         const sortedActiveDataFinal = sortedActiveData.map((item, index) => {
  //           if (index === playerIndex) {
  //             return { ...item, position: playerIndex };
  //           } else return { ...item };
  //         });

  //         const sortedActiveDataWeekly = updateLeaderboard2(
  //           updatedActiveDataWeekly
  //         );

  //         const playerIndexWeekly = sortedActiveDataWeekly.findIndex(
  //           (item) => item.playerId === userId
  //         );

  //         const sortedActiveDataFinalWeekly = sortedActiveDataWeekly.map(
  //           (item, index) => {
  //             if (index === playerIndexWeekly) {
  //               return { ...item, position: playerIndexWeekly };
  //             } else return { ...item };
  //           }
  //         );

  //         setUserDataStar(sortedActiveDataFinal[playerIndex]);
  //         setUserDataStarWeekly(sortedActiveDataFinalWeekly[playerIndexWeekly]);

  //         if (goldenPassRemainingTime) {
  //           setDataAmountStar(
  //             sortedActiveDataFinal[playerIndex].statValue !== 0
  //               ? playerIndex > 100
  //                 ? 0
  //                 : playerIndex === 100
  //                 ? Number(monthlyStarPrizes[99]) +
  //                   Number(monthlyStarPrizes[99])
  //                 : Number(monthlyStarPrizes[playerIndex]) +
  //                   Number(monthlyStarPrizes[playerIndex])
  //               : 0
  //           );
  //           setDataAmountStarWeekly(
  //             sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
  //               ? playerIndexWeekly > 100
  //                 ? 0
  //                 : playerIndexWeekly === 100
  //                 ? Number(weeklyStarPrizes[99]) + Number(weeklyStarPrizes[99])
  //                 : Number(weeklyStarPrizes[playerIndexWeekly]) +
  //                   Number(weeklyStarPrizes[playerIndexWeekly])
  //               : 0
  //           );
  //         } else if (!goldenPassRemainingTime) {
  //           setDataAmountStar(
  //             sortedActiveDataFinal[playerIndex].statValue !== 0
  //               ? playerIndex > 100
  //                 ? 0
  //                 : playerIndex === 100
  //                 ? Number(monthlyStarPrizes[99])
  //                 : Number(monthlyStarPrizes[playerIndex])
  //               : 0
  //           );
  //           setDataAmountStarWeekly(
  //             sortedActiveDataFinalWeekly[playerIndexWeekly].statValue !== 0
  //               ? playerIndexWeekly > 100
  //                 ? 0
  //                 : playerIndexWeekly === 100
  //                 ? Number(weeklyStarPrizes[99])
  //                 : Number(weeklyStarPrizes[playerIndexWeekly])
  //               : 0
  //           );
  //         }

  //         setAllStarData((prevData) => ({
  //           ...prevData,
  //           activeData: sortedActiveDataFinal.filter((item)=>{return item.statValue!==0}),
  //           activeDataWeekly: sortedActiveDataFinalWeekly.filter((item)=>{return item.statValue!==0}),

  //           player_data: sortedActiveDataFinal[playerIndex],
  //           player_data_weekly: sortedActiveDataFinalWeekly[playerIndexWeekly],
  //         }));
  //         lastUpdated.current = true; // Mark as updated to avoid repeated updates
  //       }
  //     }
  //   }
  // }, [
  //   allStarData.activeData,
  //   allStarData.activeDataWeekly, // Avoid passing all `allStarData` if only activeData is crucial
  //   userDataStar,
  //   userDataStarWeekly,
  //   userId,
  //   isPremium,
  //   activePlayer,
  //   activePlayerBase,
  //   activePlayerCore,
  //   activePlayerManta,
  //   activePlayerSkale,
  //   activePlayerViction,
  //   activePlayerTaiko,
  // ]);

  useEffect(() => {
    setAllBnbData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: bnbStars,
        previous_rewards: isAfterNovember2nd ? bnbStars : bnbStarsPremium,
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
        previous_rewards:  isAfterNovember2nd ? skaleStars : skaleStarsPremium,
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
        previous_rewards:  isAfterNovember2nd ? baseStars : skaleStarsPremium,
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
        previous_rewards:  isAfterNovember2nd ? baseStars :  skaleStarsPremium,
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
        rewards: mantaStars,
        previous_rewards:  isAfterNovember2nd ? mantaStars : skaleStarsPremium,
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
    setAllBaseData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: isAfterNovember2nd ? baseStars : skaleStarsPremium,
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
        previous_rewards: isAfterNovember2nd ? taikoStars : skaleStarsPremium,
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

  const handleSetAvailableTime = (value) => {
    setGoldenPassRemainingTime(value);
  };

  const handleRefreshCountdown700 = async () => {
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

    const remainingTimev1 = await dypv1.methods
      .getTimeOfExpireBuff(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const remainingTimev2 = await dypv2.methods
      .getTimeOfExpireBuff(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setcountdown700(Number(remainingTimev1) + Number(remainingTimev2));
    handleSetAvailableTime(Number(remainingTimev1) + Number(remainingTimev2));
  };

  const fetchSkalePrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=skale&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setSkalePrice(obj.data.skale.usd);
      });
  };
  const fetchSeiPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=sei-network&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setSeiPrice(obj.data["sei-network"].usd);
      });
  };

  const fetchCorePrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=core&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setCorePrice(obj.data.core.usd);
      });
  };

  const fetchMantaPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=manta-network&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setMantaPrice(obj.data["manta-network"].usd);
      });
  };

  const fetchTaikoPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=taiko&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setTaikoPrice(obj.data["taiko"].usd);
      });
  };

  const fetchCookiePrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=cookie&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setCookiePrice(obj.data.cookie.usd);
      });
  };

  const fetchVictionPrice = async () => {
    await axios
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=tomochain&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((obj) => {
        setVictionPrice(obj.data.tomochain.usd);
      });
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
  let wseiAddress = "0xCC205196288B7A26f6D43bBD68AaA98dde97276d";
  let wvictionAddress = "0x381B31409e4D220919B2cFF012ED94d70135A59e";
  let wmantaddress = "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f";
  let wtaikoddress = "0x2DEF195713CF4a606B49D07E520e22C17899a736";

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
    "Early access to upcoming features and updates",
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

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
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

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getWodStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );

    let myStakes = await staking_contract.methods
      .depositsOfWoD(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getCawsStakesIds = async (address) => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );

    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const getLandPremiumStakesIds = async (address) => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDPREMIUM_ABI,
      window.config.nft_land_premiumstake_address
    );

    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
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
      .get(`https://api.worldofdypians.com/api/olympiad/task1/${wallet}`)
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
          }, 1000);
          onSubscribeSuccess(account);

          // if (isonlink) {
          //   handleFirstTask(account);
          // }
        });
      } catch (error) {
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
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
          }, 1000);
          onSubscribeSuccess(binanceWallet);

          // if (isonlink) {
          //   handleFirstTask(binanceWallet);
          // }
        });
      } catch (error) {
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
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

    if (wallet) {
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
      } else {
        setnftPremium_tokenId(0);
        setnftPremium_total(0);
        setnftPremium_tokenIdViction(0);
        setnftPremium_totalViction(0);
        setnftPremium_tokenIdTaiko(0);
        setnftPremium_totalTaiko(0);
        if (discount) {
          setdiscountPercentage(parseInt(discount));
        } else if (discount_viction) {
          setdiscountPercentageViction(parseInt(discount_viction));
        } else if (discount_taiko) {
          setdiscountPercentageTaiko(parseInt(discount_taiko));
        }
      }
    } else {
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
      setnftPremium_tokenIdViction(0);
      setnftPremium_totalViction(0);
      setnftPremium_tokenIdTaiko(0);
      setnftPremium_totalTaiko(0);
    }

    // } else setdiscountPercentage(0);
  };

  const fetchGenesisAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );

    setGenesisRank(testArray[0].position);
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
          claimedTaikoChests + claimedTaikoPremiumChests < 20
        ) {
          setCanBuy(true);
        } else if (
          claimedChests + claimedPremiumChests === 20 &&
          claimedSkaleChests + claimedSkalePremiumChests === 20 &&
          claimedCoreChests + claimedCorePremiumChests === 20 &&
          claimedVictionChests + claimedVictionPremiumChests === 20 &&
          claimedMantaChests + claimedMantaPremiumChests === 20 &&
          claimedBaseChests + claimedBasePremiumChests === 20 &&
          claimedTaikoChests + claimedTaikoPremiumChests === 20
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
          claimedTaikoChests < 10
        ) {
          setCanBuy(true);
        } else if (
          claimedChests === 10 &&
          claimedSkaleChests === 10 &&
          claimedCoreChests === 10 &&
          claimedVictionChests === 10 &&
          claimedMantaChests === 10 &&
          claimedBaseChests === 10 &&
          claimedTaikoChests === 10
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

    try {
      await generateNonce({
        variables: {
          publicAddress: account,
        },
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSyncModal(false);
      }, 3000);
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const getMyNFTS = async (coinbase, type) => {
    if (coinbase !== undefined) {
      return await window.getMyNFTs(coinbase, type);
    } else {
      return [];
    }
  };

  //todo
  const fetchAllMyNfts = async () => {
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

    getMyNFTS(userWallet ? userWallet : coinbase, "cookie3").then((NFTS) =>
      setmyCookieNfts(NFTS)
    );
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];

    const listedNFTS = await getListedNFTS(0, "", "seller", coinbase, "");
    listedNFTS &&
      listedNFTS.length > 0 &&
      listedNFTS.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        }
      });
    setListedNFTS(finalboughtItems1);
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
  };

  const getMyOffers = async () => {
    //setmyOffers

    let allOffers = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const offersQuery = `
    {
      offerMades(first: 100) {
        id
        buyer
        nftAddress
        tokenId
      }
    }
    `;

    await axios
      .post(URL, { query: offersQuery })
      .then(async (result) => {
        allOffers = await result.data.data.offerMades;
        setallOffers(result.data.data.offerMades);
      })
      .catch((error) => {
        console.log(error);
      });

    if (allOffers.length > 0) {
      let finalArray = [];
      await Promise.all(
        allOffers.map(async (nft) => {
          const result = await window
            .getAllOffers(nft.nftAddress, nft.tokenId)
            .catch((e) => {
              console.error(e);
            });

          if (result && result.length > 0) {
            if (coinbase) {
              result.map((item) => {
                if (
                  item.offer.buyer?.toLowerCase() === coinbase.toLowerCase()
                ) {
                  return finalArray.push({
                    offer: item.offer,
                    index: item.index,
                    nftAddress: nft.nftAddress,
                    tokenId: nft.tokenId,
                    type:
                      nft.nftAddress === window.config.nft_caws_address
                        ? "caws"
                        : nft.nftAddress === window.config.nft_timepiece_address
                        ? "timepiece"
                        : "land",
                  });
                }
              });
            }
          }
        })
      );
      let uniqueOffers = finalArray.filter(
        (v, i, a) =>
          a.findIndex(
            (v2) => v2.tokenId === v.tokenId && v2.nftAddress === v.nftAddress
          ) === i
      );

      setmyOffers(uniqueOffers);
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
        : chainId === 713715
        ? window.config.subscriptionsei_tokens[token]?.decimals
        : chainId === 88
        ? window.config.subscriptionviction_tokens[token]?.decimals
        : chainId === 169
        ? window.config.subscriptionmanta_tokens[token]?.decimals
        : chainId === 167000
        ? window.config.subscriptiontaiko_tokens[token]?.decimals
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
        : chainId === 713715
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );
    if (coinbase && window.WALLET_TYPE === "binance") {
      let token_Sc = new ethers.Contract(
        token,
        window.ERC20_ABI,
        binanceW3WProvider.getSigner()
      );
      let tokenBalance2 = await token_Sc.balanceOf(coinbase);
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
              : chainId === 1116
              ? coresubscribeAddress
              : chainId === 713715
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
              : chainId === 713715
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
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 713715
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    if (coinbase) {
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
      } else if (chainId === 713715) {
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
            : chainId === 1116
            ? "SUBSCRIPTION_CORE"
            : chainId === 713715
            ? "SUBSCRIPTION_SKALE"
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: "bnb subscribeNFT",
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: "bnb subscribeBNB",
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: "viction subscribeNFT",
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: "taiko subscribeNFT",
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: chainId.toString(),
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
            : chainId === 713715
            ? "SUBSCRIPTION_SKALE"
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
                : chainId === 713715
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
          await axios
            .patch(
              `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
              {
                multiplier: "yes",
                chain: "bnb subscribeNFT BinanceWallet",
                premiumTimestamp: today.toString(),
              },
              {
                headers: { Authorization: `Bearer ${authToken}` },
              }
            )
            .then(() => {
              getRankData();
            })
            .catch((e) => {
              console.error(e);
            });
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
                  : chainId === 713715
                  ? "sei"
                  : "";
              setselectedChainforPremium(selectedchain);
            }
            setloadspinnerSub(false);
            onSubscribeSuccess();
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: "bnb subscribeBNB BinanceWallet",
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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
                  : chainId === 713715
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
            await axios
              .patch(
                `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
                {
                  multiplier: "yes",
                  chain: chainId.toString(),
                  premiumTimestamp: today.toString(),
                },
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              )
              .then(() => {
                getRankData();
              })
              .catch((e) => {
                console.error(e);
              });
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

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
      });
  };

  const fetchCFXPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=conflux-token&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["conflux-token"] && obj.data["conflux-token"] !== NaN) {
          setCfxPrice(obj.data["conflux-token"].usd);
        }
      });
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
          "This network is not available on Binance Web3 Wallet"
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
        await handleSwitchNetworkhook("0xae3f3")
          .then(() => {
            handleSwitchNetwork(713715);
            setChainDropdown(chainDropdowns[8]);
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
          "This network is not available on Binance Web3 Wallet"
        );
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(167000);
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
      userTaikoScore;

    const totalScore_multiplied =
      rankData && rankData.multiplier === "yes" ? totalScore * 4 : totalScore;
    if (totalScore_multiplied > 13999999 && totalScore_multiplied < 26000000) {
      setUserRankRewards(5);
    } else if (
      totalScore_multiplied >= 26000000 &&
      totalScore_multiplied < 39000000
    ) {
      setUserRankRewards(10);
    } else if (
      totalScore_multiplied >= 39000000 &&
      totalScore_multiplied < 64000000
    ) {
      setUserRankRewards(25);
    } else if (totalScore_multiplied >= 64000000) {
      setUserRankRewards(100);
    }
  };

  useEffect(() => {
    handleRankRewards();
  }, [
    userBnbScore,
    userSkaleScore,
    userCoreScore,
    userVictionScore,
    userMantaScore,
    userBaseScore,
    userTaikoScore,
    rankData,
  ]);

  useEffect(() => {
    if (coinbase) {
      getRankData();
    }
  }, [coinbase]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchSkalePrice();
    fetchSeiPrice();
    fetchMantaPrice();
    fetchTaikoPrice();
    fetchCookiePrice();
    fetchCorePrice();
    fetchVictionPrice();
    fetchEgldPrice();
    fetchImmutablePrice();
    setDummyPremiumChests(shuffle(dummyPremiums));
    fetchReleases();
    window.scrollTo(0, 0);
    getTokenDatabnb();
    fetchCFXPrice();
    // if (username !== undefined && userId !== undefined) {
    fetchDailyRecords();
    // fetchWeeklyRecords();
    fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchDailyRecordsCore();
    // fetchWeeklyRecordsCore();
    fetchMonthlyRecordsCore();
    fetchDailyRecordsViction();
    // fetchWeeklyRecordsViction();
    fetchMonthlyRecordsViction();
    fetchDailyRecordsManta();
    // fetchWeeklyRecordsManta();
    fetchMonthlyRecordsManta();
    fetchDailyRecordsBase();
    // fetchWeeklyRecordsBase();
    fetchMonthlyRecordsBase();
    fetchDailyRecordsTaiko();
    // fetchWeeklyRecordsTaiko();
    fetchMonthlyRecordsTaiko();
    fetchDailyRecordsSkale();
    // fetchWeeklyRecordsSkale();
    fetchMonthlyRecordsSkale();
    fetchRecordsStar();
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
      handleSubscriptionTokenChange(wtaikoddress);
      handleCheckIfAlreadyApproved(wtaikoddress);
    } else if (chainId === 1116) {
      setChainDropdown(chainDropdowns[6]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncore_tokens)[0]
      );
      handleSubscriptionTokenChange(wcoreAddress);
      handleCheckIfAlreadyApproved(wcoreAddress);
    }
    // else if (chainId === 713715) {
    //   setChainDropdown(chainDropdowns[8]);
    //   setdropdownIcon("usdt");
    //   setdropdownTitle("usdt");
    //   setselectedSubscriptionToken(
    //     Object.keys(window.config.subscriptionsei_tokens)[0]
    //   );
    //   handleSubscriptionTokenChange(wseiAddress);
    //   handleCheckIfAlreadyApproved(wseiAddress);
    // }
    else if (chainId === 56) {
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

    discountPercentage,
    discountPercentageViction,
    discountPercentageTaiko,

    nftPremium_tokenId,
    nftPremium_tokenIdViction,
    nftPremium_tokenIdTaiko,
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
    } else if (chainId === 1116 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncore_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    }
    // else if (chainId === 713715 && selectedSubscriptionToken !== "") {
    //   settokenDecimals(
    //     window.config.subscriptionsei_tokens[selectedSubscriptionToken]
    //       ?.decimals
    //   );
    // }
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
    claimedTaikoChests,
    claimedTaikoPremiumChests,
  ]);

  useEffect(() => {
    if (userWallet && email) {
      getUserRewardData(userWallet);
    }
  }, [userWallet, email]);

  useEffect(() => {
    if ((coinbase && isConnected) || userWallet !== undefined) {
      setsyncStatus("initial");
      fetchAllMyNfts();
      // getmyCawsWodStakes();
      // getmyWodStakes();
    }
  }, [userWallet, isConnected, coinbase]);

  useEffect(() => {
    getOtherNfts();
    getDypBalance(userWallet ? userWallet : coinbase);
    fetchUserFavorites(userWallet ? userWallet : coinbase);
  }, [account, userWallet, isConnected]);

  useEffect(() => {
    refetchPlayer();
  }, [email]);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true
    ) {
      html.classList.add("hidescroll");
      // dailyrewardpopup.style.pointerEvents = "auto";
      // leaderboardId.style.pointerEvents = "auto";
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup, dailyrewardpopup, leaderboard]);

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
      // getAllSeiChests(email);
    }
  }, [email]);

  useEffect(() => {
    if (coinbase && isConnected) {
      handleRefreshCountdown700();
    }
  }, [coinbase, isConnected]);

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

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px", overflow: "hidden" }}
    >
      <div className="d-none">
        {goldenPassRemainingTime !== "0" && goldenPassRemainingTime && (
          <Countdown
            date={Number(goldenPassRemainingTime) * 1000}
            onComplete={() => {
              setcountdown700();
              setGoldenPassRemainingTime();
            }}
          />
        )}
      </div>
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative">
        <div className="container-lg mx-0 px-0">
          <LoginWrapper
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              justifyContent: "normal",
              alignItems: "normal",
              flexDirection: "column",
              gap: "30px",
              height: "auto",
              minHeight: "100%",
            }}
            img={dashboardBackground}
          >
            {loadingPlayer ? (
              <>
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override2}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <div className="container-fluid px-0 px-lg-3">
                <div className={""}>
                  <div
                    className={
                      "d-flex flex-column gap-4 justify-content-center align-items-center"
                    }
                    style={{
                      marginTop: 40,
                    }}
                  >
                    <div
                      className={`col-12 d-flex flex-column gap-3  mt-5 mt-lg-0 ${classes.containerPlayer}`}
                    >
                      <ProfileCard
                        authToken={authToken}
                        discountPercentage={discountPercentage}
                        discountPercentageViction={discountPercentageViction}
                        discountPercentageTaiko={discountPercentageTaiko}
                        getRankData={getRankData}
                        setPortfolio={() => setPortfolio(!portfolio)}
                        rankData={rankData}
                        userRank={userRank}
                        userRankCore={userRankCore}
                        userRankSkale={userRankSkale}
                        userBnbScore={userBnbScore}
                        userCoreScore={userCoreScore}
                        userRankViction={userRankViction}
                        userVictionScore={userVictionScore}
                        userRankManta={userRankManta}
                        userMantaScore={userMantaScore}
                        userRankBase={userRankBase}
                        userBaseScore={userBaseScore}
                        userRankTaiko={userRankTaiko}
                        userTaikoScore={userTaikoScore}
                        userSkaleScore={userSkaleScore}
                        genesisRank={genesisRank}
                        email={email}
                        username={username}
                        address={userWallet}
                        userId={userId}
                        balance={dypBalancebnb}
                        availableTime={availableTime}
                        isVerified={data?.getPlayer?.wallet}
                        coinbase={account}
                        setRankData={setRankData}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        userDataStar={allStarData.player_data?.statValue}
                        userDataPosition={allStarData.player_data?.position}
                        onLinkWallet={connectWallet}
                        onSigninClick={onSigninClick}
                        onLogoutClick={() => {
                          logout();
                          // refreshSubscription(coinbase);
                          onSubscribeSuccess();
                          setclaimedChests(0);
                          setclaimedPremiumChests(0);
                          setclaimedCorePremiumChests(0);
                          setclaimedCoreChests(0);
                          setclaimedVictionPremiumChests(0);
                          setclaimedVictionChests(0);
                          setclaimedMantaPremiumChests(0);
                          setclaimedMantaChests(0);
                          setclaimedTaikoPremiumChests(0);
                          setclaimedTaikoChests(0);
                          setallChests([]);
                          setallSkaleChests([]);
                          setallCoreChests([]);
                          setallVictionChests([]);
                          setallMantaChests([]);
                          setallTaikoChests([]);

                          setOpenedChests([]);
                          setOpenedCoreChests([]);
                          setOpenedVictionChests([]);
                          setOpenedMantaChests([]);
                          setOpenedTaikoChests([]);

                          setOpenedSkaleChests([]);
                          setclaimedSkaleChests(0);
                          setclaimedSkalePremiumChests(0);
                          refetchPlayer();
                          setuserCollectedStars(0);
                          setuserCollectedStarsWeekly(0);
                          setDataAmountStar(0);
                          setDataAmountStarWeekly(0);
                        }}
                        onSyncClick={handleShowSyncModal}
                        syncStatus={syncStatus}
                        isPremium={isPremium}
                        isConnected={isConnected}
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        handleSetAvailableTime={(value) => {
                          console.log(value, "yes");
                          setGoldenPassRemainingTime(value);
                        }}
                        handleOpenDomains={handleOpenDomains}
                        domainName={domainName}
                      />

                      {portfolio && (
                        <OutsideClickHandler
                          onOutsideClick={() => setPortfolio(false)}
                        >
                          <div
                            className="popup-wrapper  popup-active p-3"
                            id="portfolio"
                            style={{ width: "60%", pointerEvents: "auto" }}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <h2
                                className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                              >
                                My Portfolio
                              </h2>

                              <img
                                src={xMark}
                                onClick={() => setPortfolio(false)}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </div>

                            <Portfolio
                              ethTokenData={ethTokenData}
                              dypTokenData={dypTokenData}
                              onOpenNfts={onOpenNfts}
                              listedNFTS={listedNFTS}
                              address={userWallet}
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
                              userId={userId}
                              username={username}
                              myCawsCollected={MyNFTSCaws}
                              myCawsOldCollected={MyNFTSCawsOld}
                              myLandCollected={MyNFTSLand}
                              myTimepieceCollected={MyNFTSTimepiece}
                              landStaked={landstakes}
                              myCawsWodStakes={myCawsWodStakesAll}
                              myWodWodStakes={myWodWodStakesAll}
                              myNFTSCoingecko={MyNFTSCoingecko}
                              myGateNfts={myGateNfts}
                              myConfluxNfts={myConfluxNfts}
                              myBaseNfts={myBaseNfts}
                              myDogeNfts={myDogeNfts}
                              myCmcNfts={myCmcNfts}
                              myCoreNfts={myCoreNfts}
                              myVictionNfts={myVictionNfts}
                              myImmutableNfts={myImmutableNfts}
                              myMultiversNfts={myMultiversNfts}
                              mySkaleNfts={mySkaleNfts}
                              myMantaNfts={myMantaNfts}
                              myTaikoNfts={myTaikoNfts}
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
                            />
                          </div>
                        </OutsideClickHandler>
                      )}
                      <TopSection
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onOpenGlobalLeaderboard={() => {
                          setGlobalLeaderboard(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        isPremium={isPremium}
                        handleShowPopup={(value) => {
                          setadClicked(value);
                        }}
                        availableTime={goldenPassRemainingTime}
                        userDataStar={allStarData.player_data?.statValue}
                      />
                      <NewWalletBalance
                        onDailyRewardsPopupOpen={() => {
                          setdailyBonusPopup(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        authToken={authToken}
                        userDataStar={dataAmountStar + dataAmountStarWeekly}
                        bnbEarnUsd={bnbEarnUsd}
                        dogePrice={dogePrice}
                        // weeklyplayerData={weeklyplayerDataAmount}
                        // dailyplayerData={dailyplayerDataAmount}
                        // dailyDataAmountCore={dailyDataAmountCore}
                        // weeklyDataAmountCore={weeklyDataAmountCore}
                        // monthlyDataAmountCore={monthlyDataAmountCore}
                        // dailyDataAmountViction={dailyDataAmountViction}
                        // weeklyDataAmountViction={weeklyDataAmountViction}
                        // monthlyDataAmountViction={monthlyDataAmountViction}
                        // weeklyDataAmountManta={weeklyDataAmountManta}
                        // monthlyDataAmountManta={monthlyDataAmountManta}
                        // weeklyDataAmountBase={weeklyDataAmountBase}
                        // monthlyDataAmountBase={monthlyDataAmountBase}
                        // weeklyDataAmountTaiko={weeklyDataAmountTaiko}
                        // monthlyDataAmountTaiko={monthlyDataAmountTaiko}
                        // dailyDataAmountSkale={dailyDataAmountSkale}
                        // weeklyDataAmountSkale={weeklyDataAmountSkale}
                        // monthlyDataAmountSkale={monthlyDataAmountSkale}
                        skaleEarnToken={skaleEarnToken}
                        skaleEarnUsd={skaleEarnUsd}
                        seiEarnUsd={seiEarnUsd}
                        coreEarnUsd={coreEarnUsd}
                        victionEarnUsd={victionEarnUsd}
                        mantaEarnUsd={mantaEarnUsd}
                        taikoEarnUsd={taikoEarnUsd}
                        cookieEarnUsd={cookieEarnUsd}
                        cookieEarnToken={cookieEarnToken}
                        cookiePoints={cookiePoints}
                        immutableEarnUsd={immutableEarnUsd}
                        immutableEarnToken={immutableEarnToken}
                        immutablePoints={immutablePoints}
                        skalePoints={skalePoints}
                        userRank2={userRank2}
                        genesisRank2={genesisRank2}
                        dailyPopup={dailyBonusPopup}
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        address={userWallet}
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
                        claimedChests={claimedChests}
                        claimedPremiumChests={claimedPremiumChests}
                        claimedSkaleChests={claimedSkaleChests}
                        claimedSkalePremiumChests={claimedSkalePremiumChests}
                        claimedCoreChests={claimedCoreChests}
                        claimedCorePremiumChests={claimedCorePremiumChests}
                        claimedVictionChests={claimedVictionChests}
                        claimedVictionPremiumChests={
                          claimedVictionPremiumChests
                        }
                        claimedMantaChests={claimedMantaChests}
                        claimedMantaPremiumChests={claimedMantaPremiumChests}
                        claimedTaikoChests={claimedTaikoChests}
                        claimedTaikoPremiumChests={claimedTaikoPremiumChests}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        email={email}
                        userId={userId}
                        username={username}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        latestBoughtNFTS={latest20BoughtNFTS}
                        myOffers={myOffers}
                        allActiveOffers={allActiveOffers}
                        isPremium={isPremium}
                        onRewardsClick={() => {
                          setmyRewardsPopup(true);
                        }}
                        rewardsPopup={myRewardsPopup}
                        onBalanceClick={() => {
                          setBalancePopup(true);
                        }}
                        availableTime={goldenPassRemainingTime}
                        canBuy={canBuy}
                        openedChests={openedChests}
                        openedSkaleChests={openedSkaleChests}
                        openedCoreChests={openedCoreChests}
                        openedSeiChests={openedSeiChests}
                        openedVictionChests={openedVictionChests}
                        openedMantaChests={openedMantaChests}
                        openedBaseChests={openedBaseChests}
                        openedTaikoChests={openedTaikoChests}
                        onDailyBonusInfoClick={() => {
                          setdailyBonusInfo(true);
                        }}
                        userSocialRewards={userSocialRewards}
                        userEarnUsd={userEarnUsd}
                        userEarnETH={userEarnETH}
                        userPoints={userPoints}
                        cmcuserPoints={cmcuserPoints}
                        cmcuserEarnETH={cmcuserEarnETH}
                        cmcuserEarnUsd={cmcuserEarnUsd}
                        confluxUserPoints={confluxUserPoints}
                        confluxEarnUSD={confluxEarnUSD}
                        confluxEarnCFX={confluxEarnCFX}
                        gateEarnUSD={gateEarnUSD}
                        gateUserPoints={gateUserPoints}
                        gateEarnBnb={gateEarnBnb}
                        dogeEarnUSD={dogeEarnUSD}
                        dogeEarnBNB={dogeEarnBNB}
                        dogeUserPoints={dogeUserPoints}
                        baseEarnUSD={baseEarnUSD}
                        baseUserPoints={baseUserPoints}
                        baseEarnETH={baseEarnETH}
                        dypiusEarnUsd={dypiusEarnUsd}
                        dypiusEarnTokens={dypiusEarnTokens}
                        dypiusPremiumEarnUsd={dypiusPremiumEarnUsd}
                        dypiusPremiumEarnTokens={dypiusPremiumEarnTokens}
                        dypiusPremiumPoints={dypiusPremiumPoints}
                        corePoints={corePoints}
                        victionPoints={victionPoints}
                        mantaPoints={mantaPoints}
                        taikoPoints={taikoPoints}
                        bnbEarnToken={bnbEarnToken}
                        coreEarnToken={coreEarnToken}
                        victionEarnToken={victionEarnToken}
                        mantaEarnToken={mantaEarnToken}
                        taikoEarnToken={taikoEarnToken}
                        bnbPoints={bnbPoints}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        cawsPremiumRewards={cawsPremiumRewards}
                        landPremiumRewards={landPremiumRewards}
                        userRankRewards={userRankRewards}
                        adClicked={adClicked}
                        onClearAd={() => {
                          setadClicked("");
                        }}
                        multiversPoints={multiversPoints}
                        multiversEarnToken={multiversEarnToken}
                        multiversEarnUsd={multiversEarnUsd}
                      />
                    </div>
                    <WalletBalance
                      ethTokenData={ethTokenData}
                      dypTokenData={dypTokenData}
                      onOpenNfts={onOpenNfts}
                      listedNFTS={listedNFTS}
                      address={userWallet}
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
                      userId={userId}
                      username={username}
                      myCawsCollected={MyNFTSCaws}
                      myCawsOldCollected={MyNFTSCawsOld}
                      myLandCollected={MyNFTSLand}
                      myNFTSBNB={MyNFTSBNB}
                      myNFTSopBNB={MyNFTSopBNB}
                      myTimepieceCollected={MyNFTSTimepiece}
                      landStaked={landstakes}
                      myCawsWodStakes={myCawsWodStakesAll}
                      myWodWodStakes={myWodWodStakesAll}
                      myNFTSCoingecko={MyNFTSCoingecko}
                      myGateNfts={myGateNfts}
                      myConfluxNfts={myConfluxNfts}
                      myBaseNfts={myBaseNfts}
                      myDogeNfts={myDogeNfts}
                      myCmcNfts={myCmcNfts}
                      myCoreNfts={myCoreNfts}
                      myVictionNfts={myVictionNfts}
                      mySkaleNfts={mySkaleNfts}
                      myMantaNfts={myMantaNfts}
                      myTaikoNfts={myTaikoNfts}
                      myCookieNfts={myCookieNfts}
                      latestBoughtNFTS={latest20BoughtNFTS}
                      myOffers={myOffers}
                      allActiveOffers={allActiveOffers}
                      latestVersion={latestVersion}
                      MyNFTSLandBNB={MyNFTSLandBNB}
                      MyNFTSCawsBNB={MyNFTSCawsBNB}
                      MyNFTSLandAvax={MyNFTSLandAvax}
                      MyNFTSCawsAvax={MyNFTSCawsAvax}
                      MyNFTSLandBase={MyNFTSLandBase}
                      MyNFTSCawsBase={MyNFTSCawsBase}
                      myImmutableNfts={myImmutableNfts}
                      myMultiversNfts={myMultiversNfts}
                    />
                    {/* <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex flex-column gap-2 w-100 mb-4">
                  <h2
                    className={`font-organetto d-flex flex-column flex-xl-row gap-1 align-items-center m-0 bundleTitle`}
                  >
                    Premium
                    <mark className={`font-organetto bundletag`}>events</mark>
                  </h2>
              
                </div>
                <div className="d-flex align-items-start align-items-lg-center gap-2 gap-lg-2 w-100 justify-content-start">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dyp-package ${
                        selectedPackage === "dyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dyp")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Golden Pass
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package ${classes.idypicon} ${
                        selectedPackage === "idyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("idyp")}
                    ></div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Puzzle Madness
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dragon-package ${
                        selectedPackage === "dragon" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dragon")}
                    >
                      <img
                        src={dragonIcon}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Dragon Ruins
                    </h6>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package criticalhit-package ${
                        selectedPackage === "criticalHit" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("criticalHit")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      <WalletBalance
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        address={userWallet}
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
                        userId={userId}
                        username={username}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        myDogeNfts={myDogeNfts}
                        myCmcNfts={myCmcNfts}
                        myCoreNfts={myCoreNfts}
                        myVictionNfts={myVictionNfts}
                        myImmutableNfts={myImmutableNfts}
                        myMultiversNfts={myMultiversNfts}
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
                        MyNFTSCawsBase={MyNFTSCawsBase}
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Critical Hit
                    </h6>
                  </div>
                </div>
                <BundleCard
                  coinbase={account}
                  wallet={data?.getPlayer?.wallet?.publicAddress}
                  chainId={chainId}
                  username={username}
                  email={email}
                  getDypBalance={getDypBalance}
                  getiDypBalance={getDypBalance}
                  packageData={
                    selectedPackage === "dragon"
                      ? dragonData
                      : selectedPackage === "dyp"
                      ? dypPackageData
                      : selectedPackage === "criticalHit"
                      ? criticalHitPackageData
                      : iDypPackageData
                  }
                  handleSetAvailableTime={(value) => {
                    setAvailableTime(value);
                  }}
                  availableTime={availableTime}
                />
              </div> */}

                    {leaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{ width: "50%", height: windowSize.width <=560 ? 'fit-content' : '',  pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                CHAIN
                              </mark>{" "}
                              LEADERBOARDS
                            </h2>
                            {/* {windowSize.width > 786 && (
                              <div className="d-flex align-items-center gap-2">
                                {!isPremium && (
                                  <div
                                    className="buy-premium-tag  px-4 py-1 d-flex flex-column justify-content-center align-items-center position-relative"
                                    onClick={() => {
                                      setLeaderboard(false);
                                      setgetPremiumPopup(true);
                                    }}
                                  >
                                    <span>Premium Subscriber</span>
                                    <h6>x2</h6>
                                    <div className="activate-premium-btn px-3 d-flex align-items-center justify-content-center">
                                      Activate
                                    </div>
                                  </div>
                                )}

                                <NavLink
                                  to={"/marketplace/events/golden-pass"}
                                  className="buy-golden-tag  px-4 py-1 d-flex flex-column justify-content-center align-items-center position-relative"
                                >
                                  <span>Golden Pass - Double</span>
                                  <h6>Double Rewards</h6>
                                  <div className="activate-golden-btn px-3 d-flex align-items-center justify-content-center">
                                    Activate
                                  </div>
                                </NavLink>
                              </div>
                            )} */}
                            <img
                              src={xMark}
                              onClick={() => setLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          {/* {windowSize.width < 786 && (
                            <div className="d-flex align-items-center gap-2">
                              {!isPremium && (
                                <div
                                  className="buy-premium-tag px-4 py-1 d-flex flex-column align-items-center justify-content-center position-relative"
                                  onClick={() => {
                                    setLeaderboard(false);
                                    setgetPremiumPopup(true);
                                  }}
                                >
                                  <span>Premium Subscriber</span>
                                  <h6>x2</h6>
                                  <div className="activate-premium-btn px-3 d-flex align-items-center justify-content-center">
                                    Activate
                                  </div>
                                </div>
                              )}
                              <NavLink
                                to={"/marketplace/events/golden-pass"}
                                className="buy-golden-tag px-4 py-1 d-flex flex-column align-items-center justify-content-center position-relative"
                              >
                                <span>Golden Pass - Double</span>
                                <h6>Double Rewards</h6>
                                <div className="activate-golden-btn px-3 d-flex align-items-center justify-content-center">
                                  Activate
                                </div>
                              </NavLink>
                            </div>
                          )} */}
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
                            dailyplayerData={dailyplayerData}
                            weeklyplayerData={weeklyplayerData}
                            monthlyplayerData={monthlyplayerData}
                            genesisData={genesisData}
                            onPremiumClick={() => {
                              setgetPremiumPopup(true);
                            }}
                          />
                        </div>
                      </OutsideClickHandler>
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
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                Genesis
                              </mark>{" "}
                              Rewards
                            </h2>

                            <img
                              src={xMark}
                              onClick={() => setGenesisLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>

                          <GenesisLeaderboard
                            username={username}
                            userId={userId}
                            dypBalancebnb={dypBalancebnb}
                            address={userWallet}
                            availableTime={goldenPassRemainingTime}
                            email={email}
                            isPremium={isPremium}
                            allBnbData={allBnbData}
                            allSkaleData={allSkaleData}
                            dailyplayerData={dailyplayerData}
                            weeklyplayerData={weeklyplayerData}
                            monthlyplayerData={monthlyplayerData}
                            genesisData={genesisData}
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
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitleGlobal gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                GLOBAL
                              </mark>{" "}
                              LEADERBOARDS
                            </h2>

                            <img
                              src={xMark}
                              onClick={() => setGlobalLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-3 ">
                            <button
                              className={` ${
                                leaderboardBtn === "weekly"
                                  ? "leaderboard-active-btn"
                                  : "leaderboard-inactive-btn"
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
                                  ? "leaderboard-active-btn"
                                  : "leaderboard-inactive-btn"
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

                    {myRewardsPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => setmyRewardsPopup(false)}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="leaderboard"
                          style={{
                            width: "fit-content",
                            pointerEvents: "auto",
                            overflowX: "auto",
                            maxWidth: "fit-content",
                            background: "#1a1c39",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Rewards
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setmyRewardsPopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyRewardsPopupNew
                            address={userWallet}
                            // weeklyplayerData={weeklyplayerDataAmount}
                            // dailyDataAmountCore={dailyDataAmountCore}
                            // weeklyDataAmountCore={weeklyDataAmountCore}
                            // monthlyDataAmountCore={monthlyDataAmountCore}
                            // weeklyDataAmountViction={weeklyDataAmountViction}
                            // monthlyDataAmountViction={monthlyDataAmountViction}
                            // weeklyDataAmountManta={weeklyDataAmountManta}
                            // monthlyDataAmountManta={monthlyDataAmountManta}
                            // weeklyDataAmountBase={weeklyDataAmountBase}
                            // monthlyDataAmountBase={monthlyDataAmountBase}
                            // weeklyDataAmountTaiko={weeklyDataAmountTaiko}
                            // monthlyDataAmountTaiko={monthlyDataAmountTaiko}
                            // weeklyDataAmountSkale={weeklyDataAmountSkale}
                            // monthlyDataAmountSkale={monthlyDataAmountSkale}
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
                            immutableEarnUsd={immutableEarnUsd}
                            coreEarnUsd={coreEarnUsd}
                            userRankRewards={userRankRewards}
                            cawsPremiumRewards={cawsPremiumRewards}
                            landPremiumRewards={landPremiumRewards}
                            genesisRank2={genesisRank2}
                            cookieEarnUsd={cookieEarnUsd}
                            baseEarnUSD={baseEarnUSD}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {dailyBonusInfo && (
                      <OutsideClickHandler
                        onOutsideClick={() => setdailyBonusInfo(false)}
                      >
                        <DailyBonusModal
                          data={dailyBonusData}
                          onClose={() => setdailyBonusInfo(false)}
                        />
                      </OutsideClickHandler>
                    )}

                    {(getPremiumPopup ||
                      adClicked === "premium" ||
                      hashValue === "#premium") && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setgetPremiumPopup(false);
                          setadClicked("");
                          window.location.hash = "";
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="subscribe-container p-2 position-relative">
                            <div
                              className=""
                              style={{ background: "#8E97CD" }}
                            ></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="free-plan-title">
                                Premium Subscription
                              </h6>
                              <img
                                src={xMark}
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
                            discountPercentageTaiko > 0 ||
                            nftPremium_total > 0 ||
                            nftPremium_totalViction ||
                            nftPremium_totalTaiko > 0 ? (
                              <div className="premium-discount-bg mt-3 p-4 position-relative">
                                <div className="premiumRedTag position-absolute">
                                  <div className="position-relative d-flex flex-column">
                                    <img src={premiumRedTag} alt="" />
                                    <div className="d-flex flex-column position-absolute discountwrap">
                                      <span className="discount-price2 font-oxanium">
                                        {discountPercentage > 0
                                          ? discountPercentage
                                          : discountPercentageViction > 0
                                          ? discountPercentageViction
                                          : discountPercentageTaiko > 0
                                          ? discountPercentageTaiko
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
                                      nftPremium_totalTaiko > 0) && (
                                      <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                                        Valid until:{" "}
                                        {new Date(
                                          nftPremium_total > 0
                                            ? nftDiscountObject.expiration *
                                              1000
                                            : nftPremium_totalTaiko > 0
                                            ? nftDiscountObjectTaiko.expiration *
                                              1000
                                            : nftDiscountObjectViction.expiration *
                                              1000
                                        )
                                          .toDateString()
                                          .slice(
                                            3,
                                            new Date(
                                              nftPremium_total > 0
                                                ? nftDiscountObject.expiration *
                                                  1000
                                                : nftPremium_totalTaiko > 0
                                                ? nftDiscountObjectTaiko.expiration *
                                                  1000
                                                : nftDiscountObjectViction.expiration *
                                                  1000
                                            ).toDateString().length
                                          )}
                                      </h6>
                                    )}
                                  </div>
                                  <div className="d-flex align-items-end gap-2">
                                    <h6 className="discount-price">
                                      {discountPercentage == 100 ||
                                      discountPercentageViction == 100 ||
                                      discountPercentageTaiko == 100
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
                                                : discountPercentage
                                            ))}
                                    </h6>
                                    <h6 className="old-price-text">$100</h6>
                                  </div>
                                  {(nftPremium_total > 0 ||
                                    nftPremium_totalViction > 0 ||
                                    nftPremium_totalTaiko > 0) && (
                                    <h6 className="token-amount-placeholder m-0 premium-custom-text">
                                      Valid until:{" "}
                                      {new Date(
                                        nftPremium_total > 0
                                          ? nftDiscountObject.expiration * 1000
                                          : nftPremium_totalTaiko > 0
                                          ? nftDiscountObjectTaiko.expiration *
                                            1000
                                          : nftDiscountObjectViction.expiration *
                                            1000
                                      )
                                        .toDateString()
                                        .slice(
                                          3,
                                          new Date(
                                            nftPremium_total > 0
                                              ? nftDiscountObject.expiration *
                                                1000
                                              : nftPremium_totalTaiko > 0
                                              ? nftDiscountObjectTaiko.expiration *
                                                1000
                                              : nftDiscountObjectViction.expiration *
                                                1000
                                          ).toDateString().length
                                        )}
                                    </h6>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                                <div className="d-flex flex-column gap-2">
                                  <span className="lifetime-plan mb-0">
                                    Lifetime plan
                                  </span>
                                  <h6 className="plan-cost mb-0">$100</h6>
                                </div>
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
                                  <div className="premium-chains-wrapper">
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/ethIcon.svg`)
                                            .default
                                        }
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
                                          require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                            .default
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
                                        src={require(`../../../../../components/Header/assets/manta.png`)}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Manta
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../../../../components/Header/assets/taiko.svg`)
                                            .default
                                        }
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Taiko
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                            .default
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
                                        src={baseLogo}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Base
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={conflux}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Conflux
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={skaleIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        SKALE
                                      </span>

                                      {/*   <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={seiIcon}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      SEI
                                    </span>
                                  </div> */}
                                    </div>{" "}
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={coreIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        CORE
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={vicitonIcon}
                                        alt=""
                                        style={{ width: 18, height: 18 }}
                                      />
                                      <span className="subscription-chain mb-0">
                                        Viction
                                      </span>
                                    </div>
                                  </div>
                                  <img src={premiumIcon} alt="" />
                                </div>
                              </div>
                            )}
                            <div className="my-3">
                              <h6 className="popup-subtitle mb-0">Benefits</h6>
                            </div>
                            <div className="premium-benefits-wrapper d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={metaverseIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Metaverse
                                  </h6>
                                </div>
                                {metaverseBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={dappsIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Dapps
                                  </h6>
                                </div>
                                {dappsBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>{" "}
                            <hr className="form-divider my-4" />
                            {isConnected && (
                              <>
                                <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                                  <div className="d-flex flex-column gap-3 subscribe-input-container">
                                    <span className="token-amount-placeholder">
                                      Select chain
                                    </span>
                                    <div className="dropdown position relative">
                                      <button
                                        class={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle`}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <div
                                          className="d-flex align-items-center gap-2"
                                          style={{ color: "#fff" }}
                                        >
                                          <img
                                            src={require(`../../Images/premium/tokens/${chainDropdown.symbol}Icon.svg`)}
                                            alt=""
                                            style={{ width: 18, height: 18 }}
                                          />
                                          {chainDropdown.name}
                                        </div>
                                        <img src={launchpadIndicator} alt="" />
                                      </button>
                                      <ul className="dropdown-menu w-100">
                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleEthPool}
                                        >
                                          <img
                                            src={
                                              require(`../../Images/premium/tokens/ethIcon.svg`)
                                                .default
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
                                              require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                                .default
                                            }
                                            style={{ width: 18, height: 18 }}
                                            alt=""
                                          />
                                          BNB Chain
                                        </li>

                                        <li
                                          className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                          onClick={handleMantaPool}
                                        >
                                          <img
                                            src={
                                              require(`../../Images/premium/tokens/mantaIcon.svg`)
                                                .default
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
                                                  require(`../../Images/premium/tokens/taikoIcon.svg`)
                                                    .default
                                                }
                                                style={{
                                                  width: 18,
                                                  height: 18,
                                                }}
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
                                              require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                                .default
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
                                            src={baseLogo}
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
                                            src={conflux}
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
                                                src={skaleIcon}
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
                                                src={coreIcon}
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
                                                src={vicitonIcon}
                                                alt=""
                                                style={{
                                                  width: "18px",
                                                  height: "18px",
                                                }}
                                              />
                                              Viction
                                            </li>
                                          )}
                                        {/*   <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleSeiPool}
                                    >
                                      <img
                                        src={seiIcon}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      SEI
                                    </li> */}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* <div className="d-flex flex-column gap-3 subscribe-input-container"></div> */}
                                  {discountPercentage < 100 &&
                                    discountPercentageViction < 100 &&
                                    discountPercentageTaiko < 100 && (
                                      <div className="d-flex flex-column align-items-end gap-3">
                                        <span className="my-premium-balance-text mb-0">
                                          My balance:{" "}
                                          {getFormattedNumber(
                                            tokenBalance / 10 ** tokenDecimals,
                                            5
                                          )}{" "}
                                          {dropdownIcon.toUpperCase()}
                                        </span>
                                        <div
                                          className="premium-benefits-wrapper p-2 d-flex align-items-center gap-4"
                                          style={{ height: "34px" }}
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
                                                    src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                                    alt=""
                                                    style={{
                                                      width: 18,
                                                      height: 18,
                                                    }}
                                                  />
                                                  {/* {dropdownTitle} */}
                                                </div>
                                                <img
                                                  src={launchpadIndicator}
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
                                                    : chainId === 1116
                                                    ? window.config
                                                        .subscriptioncore_tokens
                                                    : chainId === 713715
                                                    ? window.config
                                                        .subscriptionsei_tokens
                                                    : window.config
                                                        .subscription_tokens
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
                                                            : chainId ===
                                                              1482601649
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
                                                            : chainId === 1116
                                                            ? window.config
                                                                .subscriptioncore_tokens[
                                                                t
                                                              ]?.symbol
                                                            : chainId === 713715
                                                            ? window.config
                                                                .subscriptionsei_tokens[
                                                                t
                                                              ]?.symbol
                                                            : window.config
                                                                .subscription_tokens[
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
                                                            : chainId ===
                                                              1482601649
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
                                                            : chainId === 713715
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
                                                                .subscription_tokens[
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
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptioneth_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 56
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionbnb_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 43114
                                                          ? require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 1030
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptioncfx_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 8453
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionbase_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId ===
                                                            1482601649
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionskale_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 1116
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptioncore_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 88
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionviction_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 169
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionmanta_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 167000
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptiontaiko_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : chainId === 713715
                                                          ? require(`../../Images/premium/tokens/${window.config.subscriptionsei_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                          : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                              t
                                                            ]?.symbol.toLowerCase()}Icon.svg`)
                                                      }
                                                      alt=""
                                                      style={{
                                                        width: 18,
                                                        height: 18,
                                                      }}
                                                    />
                                                    {chainId === 1
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
                                                      : chainId === 1030
                                                      ? window.config
                                                          .subscriptioncfx_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 8453
                                                      ? window.config
                                                          .subscriptionbase_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1482601649
                                                      ? window.config
                                                          .subscriptionskale_tokens[
                                                          t
                                                        ]?.symbol
                                                      : chainId === 1116
                                                      ? window.config
                                                          .subscriptioncore_tokens[
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
                                                      : chainId === 713715
                                                      ? window.config
                                                          .subscriptionsei_tokens[
                                                          t
                                                        ]?.symbol
                                                      : window.config
                                                          .subscription_tokens[
                                                          t
                                                        ]?.symbol}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            {/* <img
                                      src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                      height={16}
                                      width={16}
                                      alt="usdt"
                                    /> */}
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
                                                  : discountPercentageViction !=
                                                    0
                                                  ? discountPercentageViction
                                                  : discountPercentageTaiko != 0
                                                  ? discountPercentageTaiko
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

                                <img
                                  src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                  height={24}
                                  width={24}
                                  alt="usdt"
                                />
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
                            {isConnected &&
                            discountPercentage > 0 &&
                            chainId === 56 ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
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
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
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
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    onClick={() => handleSubscribe()}
                                  >
                                    {loadspinnerSub === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "fail" ||
                                      approveStatus === "deposit") ? (
                                      <>
                                        {discountPercentage > 0 ||
                                        nftPremium_total > 0
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
                              </div>
                            ) : isConnected &&
                              discountPercentageViction > 0 &&
                              chainId === 88 ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
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
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
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
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
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
                              </div>
                            ) : isConnected &&
                              discountPercentageTaiko > 0 &&
                              chainId === 167000 ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
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
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
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
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
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
                              </div>
                            ) : isConnected &&
                              discountPercentage > 0 &&
                              chainId !== 56 ? (
                              <div
                                className={`d-flex align-items-center justify-content-center mb-2`}
                              >
                                <button
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
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
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
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
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
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
                            ) : isConnected && coinbase ? (
                              <div className="d-flex align-items-center gap-3 justify-content-center">
                                <div
                                  className={` ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    disabled={
                                      approveStatus === "fail" ||
                                      !coinbase ||
                                      isApproved
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
                                      <>
                                        Approve{" "}
                                        {approveStatus === "approveAmount"
                                          ? "token"
                                          : nftPremium_total > 0
                                          ? "NFT"
                                          : ""}
                                      </>
                                    ) : loadspinner === false &&
                                      approveStatus === "fail" ? (
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
                                <div
                                  className={` ${
                                    isApproved === false
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }`}
                                >
                                  <button
                                    className={`btn ${
                                      isApproved === false
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    } px-4`}
                                    onClick={() => handleSubscribe()}
                                  >
                                    {loadspinnerSub === false &&
                                    (approveStatus === "initial" ||
                                      approveStatus === "fail" ||
                                      approveStatus === "deposit") ? (
                                      <>
                                        {discountPercentage > 0 ||
                                        nftPremium_total > 0
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
                              </div>
                            ) : (
                              <div
                                className={`d-flex align-items-center justify-content-center mb-2`}
                              >
                                <button
                                  className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
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
                              src={xMark}
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
                  </div>
                </div>
              </div>
            )}
            {/* {dailyBonusPopup && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setdailyBonusPopup(false);
                }}
              >
                <div
                  className="package-popup-wrapper2"
                  id="dailyrewardpopup"
                  style={{ pointerEvents: "auto" }}
                >
                  <img
                    src={rewardPopup}
                    alt=""
                    className="popup-linear2"
                    loading="eager"
                  />

                  <DailyBonusPopup
                    onclose={() => {
                      setdailyBonusPopup(false);
                    }}
                    isPremium={isPremium}
                    address={userWallet}
                    claimedChests={claimedChests}
                    claimedPremiumChests={claimedPremiumChests}
                    onChestClaimed={() => {
                      setCount(count + 1);
                    }}
                    standardChests={standardChests}
                    premiumChests={premiumChests}
                    email={email}
                    openedChests={openedChests}
                    chainId={chainId}
                    coinbase={coinbase}
                    handleSwitchNetwork={handleSwitchNetwork}
                    myNFTSCaws={MyNFTSCaws.length}
                    myNFTSLand={MyNFTSLand.length}
                    myNFTSTimepiece={MyNFTSTimepiece.length}
                    allChests={allChests}
                    canBuy={canBuy}
                    dummypremiumChests={dummypremiumChests}
                  />
                </div>
              </OutsideClickHandler>
            )} */}
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
                coreImages={coreImages}
                chainId={chainId}
                dypTokenData={dypTokenData}
                ethTokenData={ethTokenData}
                dyptokenData_old={dyptokenData_old}
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
                openedSeiChests={openedSeiChests}
                address={userWallet}
                allChests={allChests}
                allSkaleChests={allSkaleChests}
                allCoreChests={allCoreChests}
                allVictionChests={allVictionChests}
                allMantaChests={allMantaChests}
                allBaseChests={allBaseChests}
                allTaikoChests={allTaikoChests}
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
                onSeiChestClaimed={() => {
                  setCount(count + 1);
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
            {showChecklistModal === true && (
              <ChecklistModal
                show={showChecklistModal}
                handleClose={() => {
                  setshowChecklistModal(false);
                }}
                cawsitem={tokensState?.items?.length > 0 && tokensState.items}
                stakes={stakes}
              />
            )}

            {showWalletModal === true && success === false && (
              <WalletModal
                show={showWalletModal}
                handleClose={() => {
                  setshowWalletModal(false);
                }}
                handleConnection={handleConnect}
                handleConnectBinance={handleConnectBinance}
                handleConnectionPassport={handleConnectionPassport}
              />
            )}

            {showSyncModal === true && (
              <SyncModal
                onCancel={() => {
                  setshowSyncModal(false);
                }}
                onclose={() => {
                  setshowSyncModal(false);
                }}
                open={showSyncModal}
                onConfirm={handleSync}
                syncStatus={syncStatus}
              />
            )}

            {showChecklistLandNftModal === true && (
              <ChecklistLandNftModal
                show={showChecklistLandNftModal}
                handleClose={() => {
                  setshowChecklistLandNftModal(false);
                }}
                cawsitem={
                  tokensState?.landItems?.length > 0 && tokensState.landItems
                }
                stakes={landstakes}
              />
            )}
            {/* <ErrorAlert error={connectedState?.error} /> */}
          </LoginWrapper>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
