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

function Dashboard({
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
}) {
  const { email, logout } = useAuth();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

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
  const firstSlider = useRef();
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
  const [playerRank, setPlayerRank] = useState({});
  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);

  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [MyNFTSCawsOld, setMyNFTSCawsOld] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [listedNFTS, setListedNFTS] = useState([]);
  const [myBoughtNfts, setmyBoughtNfts] = useState([]);
  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [standardChests, setStandardChests] = useState([]);
  const [premiumChests, setPremiumChests] = useState([]);
  const [openedChests, setOpenedChests] = useState([]);

  const [standardSkaleChests, setStandardSkaleChests] = useState([]);
  const [premiumSkaleChests, setPremiumSkaleChests] = useState([]);

  const [standardVictionChests, setStandardVictionChests] = useState([]);
  const [premiumVictionChests, setPremiumVictionChests] = useState([]);
  const [standardSeiChests, setStandardSeiChests] = useState([]);
  const [premiumSeiChests, setPremiumSeiChests] = useState([]);
  const [standardCoreChests, setStandardCoreChests] = useState([]);
  const [premiumCoreChests, setPremiumCoreChests] = useState([]);

  const [openedSkaleChests, setOpenedSkaleChests] = useState([]);
  const [openedVictionChests, setOpenedVictionChests] = useState([]);
  const [openedCoreChests, setOpenedCoreChests] = useState([]);
  const [openedSeiChests, setOpenedSeiChests] = useState([]);

  const [kittyDashRecords, setkittyDashRecords] = useState([]);
  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [skaleEarnToken, setSkaleEarnToken] = useState(0);
  const [skalePoints, setSkalePoints] = useState(0);
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
  const [userWallet, setuserWallet] = useState("");
  const [dummypremiumChests, setDummyPremiumChests] = useState([]);

  const [claimedChests, setclaimedChests] = useState(0);
  const [claimedPremiumChests, setclaimedPremiumChests] = useState(0);

  const [claimedSkaleChests, setclaimedSkaleChests] = useState(0);
  const [claimedSkalePremiumChests, setclaimedSkalePremiumChests] = useState(0);

  const [claimedCoreChests, setclaimedCoreChests] = useState(0);
  const [claimedCorePremiumChests, setclaimedCorePremiumChests] = useState(0);

  const [claimedVictionChests, setclaimedVictionChests] = useState(0);
  const [claimedSeiChests, setclaimedSeiChests] = useState(0);

  const [claimedVictionPremiumChests, setclaimedVictionPremiumChests] =
    useState(0);
  const [claimedSeiPremiumChests, setclaimedSeiPremiumChests] = useState(0);

  const [userSocialRewards, setuserSocialRewards] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);

  const [canBuy, setCanBuy] = useState(false);

  const [allChests, setallChests] = useState([]);
  const [allSkaleChests, setallSkaleChests] = useState([]);
  const [allCoreChests, setallCoreChests] = useState([]);
  const [allVictionChests, setallVictionChests] = useState([]);
  const [allSeiChests, setallSeiChests] = useState([]);

  const [countdown700, setcountdown700] = useState();
  const [bundlesBought, setbundlesBought] = useState(0);
  const [count, setCount] = useState(0);
  const [skalecount, setskalecount] = useState(0);
  const [rankData, setRankData] = useState({});
  const [userRank, setUserRank] = useState("");
  const [userRank2, setUserRank2] = useState("");
  const [userRank2Skale, setUserRank2Skale] = useState("");
  const [userBnbScore, setUserBnbScore] = useState(0);
  const [genesisRank, setGenesisRank] = useState("");
  const [genesisRank2, setGenesisRank2] = useState("");
  const [premiumTxHash, setPremiumTxHash] = useState("");
  const [selectedChainforPremium, setselectedChainforPremium] = useState("");
  const [cawsPremiumRewards, setcawsPremiumRewards] = useState(0);
  const [dateofBundle, setdateofBundle] = useState(0);
  const [dateofBundlev1, setdateofBundlev1] = useState(0);
  const [portfolio, setPortfolio] = useState(false);
  const [datewhenBundleBought, setdatewhenBundleBought] = useState(0);
  const [datewhenBundleBoughtv1, setdatewhenBundleBoughtv1] = useState(0);
  const [bnbImages, setBnbImages] = useState(shuffle(chestImagesBnb));
  const [skaleImages, setSkaleImages] = useState(shuffle(chestImagesSkale));
  const [coreImages, setCoreImages] = useState(shuffle(chestImagesCore));
  const [victionImages, setVictionImages] = useState(
    shuffle(chestImagesViction)
  );
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

  const [multiversEarnUsd, setmultiversEarnUsd] = useState(0);
  const [multiversPrice, setmultiversPrice] = useState(0);
  const [multiversEarnToken, setmultiversEarnToken] = useState(0);
  const [multiversPoints, setmultiversPoints] = useState(0);

  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [nftPremium_tokenId, setnftPremium_tokenId] = useState(0);
  const [nftPremium_total, setnftPremium_total] = useState(0);
  const [nftDiscountObject, setnftDiscountObject] = useState([]);

  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");
  const leaderboardId = document.querySelector("#leaderboard");
  const { BigNumber } = window;

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
    if (
      email &&
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress
    ) {
      fetchTreasureHuntData(email, data.getPlayer.wallet.publicAddress);
    }
  }, [
    email,
    data,
    cfxPrice,
    bnbPrice,
    skalePrice,
    dyptokenDatabnb,
    corePrice,
    victionPrice,
  ]);

  const bnbStars = ["50", "40", "30", "20", "20", "20", "20", "20", "20", "20"];
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
  const skaleStars = [
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

  const starPrizes = [200, 100, 60, 30, 20, 20, 20, 20, 20, 20];
  const starPrizesGolden = [400, 200, 140, 70, 30, 30, 30, 30, 30, 30];

  const userId = data?.getPlayer?.playerId;
  const username = data?.getPlayer?.displayName;

  const [allData, setAllData] = useState([]);
  const [allBnbData, setAllBnbData] = useState([]);
  const [allSkaleData, setAllSkaleData] = useState([]);
  const [allCoreData, setAllCoreData] = useState([]);
  const [allVictionData, setAllVictionData] = useState([]);
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
  const [prevVersionCore, setPrevVersionCore] = useState(0);
  const [prevVersionCoreWeekly, setPrevVersionCoreWeekly] = useState(0);
  const [prevVersionCoreMonthly, setPrevVersionCoreMonthly] = useState(0);
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
  const [prevVersionSkale, setPrevVersionSkale] = useState(0);
  const [prevVersionSkaleWeekly, setPrevVersionSkaleWeekly] = useState(0);
  const [prevVersionSkaleMonthly, setPrevVersionSkaleMonthly] = useState(0);
  const [dailyDataAmountSkale, setDailyDataAmountSkale] = useState([]);
  const [weeklyDataAmountSkale, setWeeklyDataAmountSkale] = useState([]);
  const [monthlyDataAmountSkale, setMonthlyDataAmountSkale] = useState([]);
  const [userRankSkale, setUserRankSkale] = useState("");
  const [userSkaleScore, setUserSkaleScore] = useState(0);
  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);
  const [activePlayerStar, setActivePlayerStar] = useState([]);
  const [userDataStar, setUserDataStar] = useState({});
  const [prevDataStar, setPrevDataStar] = useState([]);
  const [prevVersionStar, setPrevVersionStar] = useState(0);
  const [dataAmountStar, setDataAmountStar] = useState([]);
  const [userCollectedStars, setuserCollectedStars] = useState(0);

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
  const [prevVersionViction, setPrevVersionViction] = useState(0);
  const [prevVersionVictionWeekly, setPrevVersionVictionWeekly] = useState(0);
  const [prevVersionVictionMonthly, setPrevVersionVictionMonthly] = useState(0);
  const [dailyDataAmountViction, setDailyDataAmountViction] = useState([]);
  const [weeklyDataAmountViction, setWeeklyDataAmountViction] = useState([]);
  const [monthlyDataAmountViction, setMonthlyDataAmountViction] = useState([]);
  const [userRankViction, setUserRankViction] = useState("");
  const [userVictionScore, setUserVictionScore] = useState(0);
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
  const fillRecordsWeekly = (itemData) => {
    if (itemData.length === 0) {
      setWeeklyRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setWeeklyRecords(finalData);
    }
  };
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
  const fillRecordsWeeklyCore = (itemData) => {
    if (itemData.length === 0) {
      setWeeklyRecordsCore(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setWeeklyRecordsCore(finalData);
    }
  };
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
  const fetchPreviousWinnersCore = async () => {
    if (prevVersionCore != 0) {
      const data = {
        StatisticName: "LeaderboardCoreDaily",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionCore - 1,
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
  const fetchPreviousWeeklyWinnersCore = async () => {
    if (prevVersionCoreWeekly != 0) {
      const data = {
        StatisticName: "LeaderboardCoreWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionCoreWeekly - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataCoreWeekly(result.data.data.leaderboard);
    } else {
      setPrevDataCoreWeekly(placeholderplayerData);
    }
  };
  const fetchPreviousMonthlyWinnersCore = async () => {
    // if (prevVersionCoreMonthly != 0) {
    //   const data = {
    //     StatisticName: "LeaderboardCoreMonthly",
    //     StartPosition: 0,
    //     MaxResultsCount: 10,
    //     Version: prevVersionCoreMonthly - 1,
    //   };
    //   const result = await axios.post(
    //     `${backendApi}/auth/GetLeaderboard?Version=-1`,
    //     data
    //   );

    //   setPrevDataCoreMonthly(result.data.data.leaderboard);
    // } else {
    setPrevDataCoreMonthly(placeholderplayerData);
    // }
  };
  const fetchDailyRecordsCore = async () => {
    const data = {
      StatisticName: "LeaderboardCoreDaily",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setPrevVersionCore(parseInt(result.data.data.version));
    setDailyRecordsCore(result.data.data.leaderboard);
    fillRecordsCore(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerCore(true);
    } else if (testArray.length === 0) {
      setActivePlayerCore(false);
      fetchDailyRecordsAroundPlayerCore(result.data.data.leaderboard);
    }
  };
  const fetchWeeklyRecordsCore = async () => {
    const data = {
      StatisticName: "LeaderboardCoreWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecordsCore(result.data.data.leaderboard);
    setPrevVersionCoreWeekly(result.data.data.version);

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecordsWeeklyCore(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayerCoreWeekly(true);
    }
    if (testArray.length === 0) {
      setActivePlayerCoreWeekly(false);
      fetchWeeklyRecordsAroundPlayerCore(result.data.data.leaderboard);
    }
  };
  const fetchMonthlyRecordsCore = async () => {
    const data = {
      StatisticName: "LeaderboardCoreMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsCore(result.data.data.leaderboard);
    setPrevVersionCoreMonthly(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerCoreMonthly(true);
    }
    fillRecordsMonthlyCore(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayerCoreMonthly(false);
      fetchMonthlyRecordsAroundPlayerCore(result.data.data.leaderboard);
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
  const fetchWeeklyRecordsAroundPlayerCore = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardCoreWeekly",
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
      if (goldenPassRemainingTime && testArray[0].statValue != 0) {
        setWeeklyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9]) +
                Number(skalePrizesWeeklyGolden[9])
              : Number(skalePrizesWeekly[userPosition]) +
                Number(skalePrizesWeeklyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
        setWeeklyDataAmountCore(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9])
              : Number(skalePrizesWeekly[userPosition])
            : 0
        );
      } else setWeeklyDataAmountCore(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerCoreWeekly(true);
          setUserDataCoreWeekly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerCoreWeekly(false);
          setUserDataCoreWeekly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerCoreWeekly(false);
        setUserDataCoreWeekly(...testArray);
      }
    }
  };

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
  const fillRecordsWeeklyViction = (itemData) => {
    if (itemData.length === 0) {
      setWeeklyRecordsViction(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setWeeklyRecordsViction(finalData);
    }
  };
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
  const fetchPreviousWinnersViction = async () => {
    if (prevVersionViction != 0) {
      const data = {
        StatisticName: "LeaderboardVictionDaily",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionViction - 1,
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
  const fetchPreviousWeeklyWinnersViction = async () => {
    if (prevVersionVictionWeekly != 0) {
      const data = {
        StatisticName: "LeaderboardVictionWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionVictionWeekly - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataVictionWeekly(result.data.data.leaderboard);
    } else {
      setPrevDataVictionWeekly(placeholderplayerData);
    }
  };
  const fetchPreviousMonthlyWinnersViction = async () => {
    // if (prevVersionVictionMonthly != 0) {
    //   const data = {
    //     StatisticName: "LeaderboardVictionMonthly",
    //     StartPosition: 0,
    //     MaxResultsCount: 10,
    //     Version: prevVersionVictionMonthly - 1,
    //   };
    //   const result = await axios.post(
    //     `${backendApi}/auth/GetLeaderboard?Version=-1`,
    //     data
    //   );

    //   setPrevDataVictionMonthly(result.data.data.leaderboard);
    // } else {
    setPrevDataVictionMonthly(placeholderplayerData);
    // }
  };
  const fetchDailyRecordsViction = async () => {
    const data = {
      StatisticName: "LeaderboardVictionDaily",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setPrevVersionViction(parseInt(result.data.data.version));
    setDailyRecordsViction(result.data.data.leaderboard);
    fillRecordsViction(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerViction(true);
    } else if (testArray.length === 0) {
      setActivePlayerViction(false);
      fetchDailyRecordsAroundPlayerViction(result.data.data.leaderboard);
    }
  };
  const fetchWeeklyRecordsViction = async () => {
    const data = {
      StatisticName: "LeaderboardVictionWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecordsViction(result.data.data.leaderboard);
    setPrevVersionVictionWeekly(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecordsWeeklyViction(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayerVictionWeekly(true);
    }
    if (testArray.length === 0) {
      setActivePlayerVictionWeekly(false);
      fetchWeeklyRecordsAroundPlayerViction(result.data.data.leaderboard);
    }
  };
  const fetchMonthlyRecordsViction = async () => {
    const data = {
      StatisticName: "LeaderboardVictionMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsViction(result.data.data.leaderboard);
    setPrevVersionVictionMonthly(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerVictionMonthly(true);
    }
    fillRecordsMonthlyViction(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayerVictionMonthly(false);
      fetchMonthlyRecordsAroundPlayerViction(result.data.data.leaderboard);
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
  const fetchWeeklyRecordsAroundPlayerViction = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardVictionWeekly",
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
      if (goldenPassRemainingTime && testArray[0].statValue != 0) {
        setWeeklyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9]) +
                Number(skalePrizesWeeklyGolden[9])
              : Number(skalePrizesWeekly[userPosition]) +
                Number(skalePrizesWeeklyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime && testArray[0].statValue != 0) {
        setWeeklyDataAmountViction(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9])
              : Number(skalePrizesWeekly[userPosition])
            : 0
        );
      } else setWeeklyDataAmountViction(0);

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerVictionWeekly(true);
          setUserDataVictionWeekly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerVictionWeekly(false);
          setUserDataVictionWeekly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerVictionWeekly(false);
        setUserDataVictionWeekly(...testArray);
      }
    }
  };

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
  const fillRecordsWeeklySkale = (itemData) => {
    if (itemData.length === 0) {
      setWeeklyRecordsSkale(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setWeeklyRecordsSkale(finalData);
    }
  };
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
  const fetchPreviousWinnersSkale = async () => {
    if (prevVersionSkale != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleDaily",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionSkale - 1,
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
  const fetchPreviousWeeklyWinnersSkale = async () => {
    if (prevVersionSkaleWeekly != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionSkaleWeekly - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setPrevDataSkaleWeekly(result.data.data.leaderboard);
    } else {
      setPrevDataSkaleWeekly(placeholderplayerData);
    }
  };
  const fetchPreviousMonthlyWinnersSkale = async () => {
    // if (prevVersionSkaleMonthly != 0) {
    //   const data = {
    //     StatisticName: "LeaderboardSkaleMonthly",
    //     StartPosition: 0,
    //     MaxResultsCount: 10,
    //     Version: prevVersionSkaleMonthly - 1,
    //   };
    //   const result = await axios.post(
    //     `${backendApi}/auth/GetLeaderboard?Version=-1`,
    //     data
    //   );

    //   setPrevDataSkaleMonthly(result.data.data.leaderboard);
    // } else {
    setPrevDataSkaleMonthly(placeholderplayerData);
    // }
  };
  const fetchDailyRecordsSkale = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleDaily",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setPrevVersionSkale(parseInt(result.data.data.version));
    setDailyRecordsSkale(result.data.data.leaderboard);
    fillRecordsSkale(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerSkale(true);
    } else if (testArray.length === 0) {
      setActivePlayerSkale(false);
      fetchDailyRecordsAroundPlayerSkale(result.data.data.leaderboard);
    }
  };
  const fetchWeeklyRecordsSkale = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecordsSkale(result.data.data.leaderboard);
    setPrevVersionSkaleWeekly(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecordsWeeklySkale(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayerSkaleWeekly(true);
    }
    if (testArray.length === 0) {
      setActivePlayerSkaleWeekly(false);
      fetchWeeklyRecordsAroundPlayerSkale(result.data.data.leaderboard);
    }
  };
  const fetchMonthlyRecordsSkale = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecordsSkale(result.data.data.leaderboard);
    setPrevVersionSkaleMonthly(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerSkaleMonthly(true);
    }
    fillRecordsMonthlySkale(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayerSkaleMonthly(false);
      fetchMonthlyRecordsAroundPlayerSkale(result.data.data.leaderboard);
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
  const fetchWeeklyRecordsAroundPlayerSkale = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
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
      if (goldenPassRemainingTime) {
        setWeeklyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9]) +
                Number(skalePrizesWeeklyGolden[9])
              : Number(skalePrizesWeekly[userPosition]) +
                Number(skalePrizesWeeklyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setWeeklyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesWeekly[9])
              : Number(skalePrizesWeekly[userPosition])
            : 0
        );
      }

      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerSkaleWeekly(true);
          setUserDataSkaleWeekly([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerSkaleWeekly(false);
          setUserDataSkaleWeekly(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerSkaleWeekly(false);
        setUserDataSkaleWeekly(...testArray);
      }
    }
  };
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
              ? Number(skalePrizesMonthly[9]) +
                Number(skalePrizesMonthlyGolden[9])
              : Number(skalePrizesMonthly[userPosition]) +
                Number(skalePrizesMonthlyGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setMonthlyDataAmountSkale(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(skalePrizesMonthly[9])
              : Number(skalePrizesMonthly[userPosition])
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
  const fetchPreviousWinnersStar = async () => {
    if (prevVersionStar != 0) {
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionStar - 1,
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
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data); 
    setPrevVersionStar(parseInt(result.data.data.version));
    setStarRecords(result.data.data.leaderboard);
    fillRecordsStar(result.data.data.leaderboard);
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
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(starPrizes[9]) + Number(starPrizesGolden[9])
              : Number(starPrizes[userPosition]) +
                Number(starPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setDataAmountStar(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(starPrizes[9])
              : Number(starPrizes[userPosition])
            : 0
        );
      }

      
    } else if (testArray.length === 0) {
      setActivePlayerStar(false);
      fetchDailyRecordsAroundPlayerStar(result.data.data.leaderboard);
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
              ? userPosition > 10
                ? 0
                : userPosition === 10
                ? Number(starPrizes[9]) + Number(starPrizesGolden[9])
                : Number(starPrizes[userPosition]) +
                  Number(starPrizesGolden[userPosition])
              : 0
          );
        } else if (!goldenPassRemainingTime) {
          setDataAmountStar(
            testArray[0].statValue !== 0
              ? userPosition > 10
                ? 0
                : userPosition === 10
                ? Number(starPrizes[9])
                : Number(starPrizes[userPosition])
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

  const getBundles = async (address) => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const fetchPreviousWinners = async () => {
    if (previousVersion != 0) {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsDaily(result.data.data.leaderboard);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchGenesisPreviousWinners = async () => {
    if (previousGenesisVersion != 0) {
      const data = {
        StatisticName: "GenesisLandRewards",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousGenesisVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      fillRecordsGenesis(result.data.data.leaderboard);

      setpreviousgenesisData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousWeeklyWinners = async () => {
    if (previousWeeklyVersion != 0) {
      const data = {
        StatisticName: "WeeklyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousWeeklyVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );

      setweeklyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousMonthlyWinners = async () => {
    if (previousMonthlyVersion != 0) {
      const data = {
        StatisticName: "MonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousMonthlyVersion - 1,
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
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    setpreviousVersion(parseInt(result.data.data.version));
    setRecords(result.data.data.leaderboard);
    fillRecords(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    } else if (testArray.length === 0) {
      setActivePlayer(false);
      fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };

  const fetchWeeklyRecords = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setWeeklyRecords(result.data.data.leaderboard);
    setpreviousWeeklyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecordsWeekly(result.data.data.leaderboard);

    if (testArray.length > 0) {
      setActivePlayerWeekly(true);
    }
    if (testArray.length === 0) {
      setActivePlayerWeekly(false);
      fetchWeeklyRecordsAroundPlayer(result.data.data.leaderboard);
    }
  };
  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setMonthlyRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerMonthly(true);
    }
    fillRecordsMonthly(result.data.data.leaderboard);

    if (testArray.length === 0) {
      setActivePlayerMonthly(false);
      fetchMonthlyRecordsAroundPlayer(result.data.data.leaderboard);
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

    fetchMonthlyGenesisRecordsAroundPlayer(result2.data.data.leaderboard);
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
    fetchDailyRecords();
    fetchWeeklyRecords();
    fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchDailyRecordsCore();
    fetchWeeklyRecordsCore();
    fetchMonthlyRecordsCore();
    fetchDailyRecordsViction();
    fetchWeeklyRecordsViction();
    fetchMonthlyRecordsViction();
    fetchDailyRecordsSkale();
    fetchWeeklyRecordsSkale();
    fetchMonthlyRecordsSkale();

    fetchRecordsStar();
  }, [username, count, userId,goldenPassRemainingTime]);

  useEffect(() => {
    fetchGenesisPreviousWinners();
    fetchPreviousWinners();
    fetchPreviousWeeklyWinners();
    fetchPreviousMonthlyWinners();
    fetchPreviousWinnersCore();
    fetchPreviousWeeklyWinnersCore();
    fetchPreviousMonthlyWinnersCore();
    fetchPreviousWinnersViction();
    fetchPreviousWeeklyWinnersViction();
    fetchPreviousMonthlyWinnersViction();
    fetchPreviousWinnersSkale();
    fetchPreviousWeeklyWinnersSkale();
    fetchPreviousMonthlyWinnersSkale();
    fetchPreviousWinnersStar();
  }, [
    previousGenesisVersion,
    previousMonthlyVersion,
    previousVersion,
    previousWeeklyVersion,
    userId,
    prevVersionSkale,
    prevVersionSkaleWeekly,
    prevVersionStar,
    prevVersionSkaleMonthly,
    prevVersionCore,
    prevVersionVictionMonthly,
    prevVersionCoreWeekly,
    prevVersionCoreMonthly,
    prevVersionViction,
    prevVersionVictionWeekly,
  ]);

  useEffect(() => {
    setAllStarData({
      rewards: starPrizes,
      premium_rewards: starPrizesGolden,
      activeData: starRecords,
      previousData: prevDataStar,
      player_data: userDataStar,
      is_active: activePlayerStar, //change when apis are ready
    });
  }, [starRecords, prevDataStar, userDataStar, activePlayerStar]);

  useEffect(() => {
    setAllBnbData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: bnbStars,
        premium_rewards: bnbStarsPremium,
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
        premium_rewards: weeklyPrizesGolden,
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
        premium_rewards: monthlyPrizesGolden,
        activeData: monthlyrecords,
        previousData: monthlyplayerData,
        player_data: userDataMonthly,
        is_active: activePlayerMonthly,
      },
    ]);
    setAllData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: bnbStars,
        premium_rewards: bnbStarsPremium,
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
        premium_rewards: weeklyPrizesGolden,
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
        premium_rewards: monthlyPrizesGolden,
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
        premium_rewards: skaleStarsPremium,
        activeData: dailyRecordsSkale,
        previousData: prevDataSkale,
        player_data: userDataSkale,
        is_active: activePlayerSkale, //change when apis are ready
      },
      {
        title: "WEEKLY",
        reset: "Monday (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesWeekly,
        premium_rewards: skalePrizesWeeklyGolden,
        activeData: weeklyRecordsSkale,
        previousData: prevDataSkaleWeekly,
        player_data: userDataSkaleWeekly,
        is_active: activePlayerSkaleWeekly,
      },
      {
        title: "MONTHLY",
        reset: "Monthly (00:00 UTC)",
        type: "cash",
        rewards: skalePrizesMonthly,
        premium_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsSkale,
        previousData: prevDataSkaleMonthly,
        player_data: userDataSkaleMonthly,
        is_active: activePlayerSkaleMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsSkale,
    prevDataSkale,
    userDataSkale,
    activePlayerSkale,
    monthlyRecordsSkale,
    prevDataSkaleMonthly,
    userDataSkaleMonthly,
  ]);
  useEffect(() => {
    setAllCoreData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: skaleStars,
        premium_rewards: skaleStarsPremium,
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
        premium_rewards: skalePrizesWeeklyGolden,
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
        premium_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsCore,
        previousData: prevDataCoreMonthly,
        player_data: userDataCoreMonthly,
        is_active: activePlayerCoreMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsCore,
    prevDataCore,
    userDataCore,
    activePlayerCore,
    monthlyRecordsCore,
    prevDataCoreMonthly,
    userDataCoreMonthly,
  ]);
  useEffect(() => {
    setAllVictionData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: skaleStars,
        premium_rewards: skaleStarsPremium,
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
        premium_rewards: skalePrizesWeeklyGolden,
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
        premium_rewards: skalePrizesMonthlyGolden,
        activeData: monthlyRecordsViction,
        previousData: prevDataVictionMonthly,
        player_data: userDataVictionMonthly,
        is_active: activePlayerVictionMonthly, //change when apis are ready
      },
    ]);
  }, [
    dailyRecordsViction,
    prevDataViction,
    userDataViction,
    activePlayerViction,
    monthlyRecordsViction,
    prevDataVictionMonthly,
    userDataVictionMonthly,
  ]);

  const handleSetAvailableTime = (value) => {
    setGoldenPassRemainingTime(value);
  };

  const handleRefreshCountdown700 = async () => {
    if (bundlesBought === 0) {
      setcountdown700();
      handleSetAvailableTime();
    } else if (bundlesBought > 0) {
      const dypv1 = new window.infuraWeb3.eth.Contract(
        DYP_700V1_ABI,
        dyp700v1Address
      );

      const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

      const remainingTimev1 = await dypv1.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      const remainingTimev2 = await dypv2.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      var remainingTime_milisecondsv2 = remainingTimev2 * 1000;

      var remainingTime_milisecondsv1 = remainingTimev1 * 1000;
      const timeofDepositv1 = await dypv1.methods
        .getTimeOfDeposit(coinbase)
        .call();

      const timeofDepositv2 = await dypv2.methods
        .getTimeOfDeposit(coinbase)
        .call();

      if (timeofDepositv1 !== 0 || timeofDepositv2 !== 0) {
        remainingTime_milisecondsv1 = timeofDepositv1 * 1000;
        remainingTime_milisecondsv2 = timeofDepositv2 * 1000;

        const timeofDeposit_Datev1 = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(remainingTime_milisecondsv1);

        const timeofDeposit_Date_formattedv1 = new Date(timeofDeposit_Datev1);

        const timeofDeposit_Hoursv1 = timeofDeposit_Date_formattedv1.getHours();
        const timeofDeposit_Minutesv1 =
          timeofDeposit_Date_formattedv1.getMinutes();
        const finalHoursv1 = timeofDeposit_Hoursv1 - 11;

        const finalMinutesv1 = timeofDeposit_Minutesv1 - 11;

        const resultv1 =
          remainingTimev1 - finalHoursv1 * 60 * 60 - finalMinutesv1 * 60;

        const timeofDeposit_Datev2 = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(remainingTime_milisecondsv2);

        const timeofDeposit_Date_formattedv2 = new Date(timeofDeposit_Datev2);
        const timeofDeposit_day = timeofDeposit_Date_formattedv2.getDate();
        const timeofDeposit_Hoursv2 = timeofDeposit_Date_formattedv2.getHours();
        const timeofDeposit_Minutesv2 =
          timeofDeposit_Date_formattedv2.getMinutes();
        const finalHoursv2 = timeofDeposit_Hoursv2 - 11;

        const finalMinutesv2 = timeofDeposit_Minutesv2 - 11;

        const resultv2 =
          remainingTimev2 - finalHoursv2 * 60 * 60 - finalMinutesv2 * 60;
        setcountdown700((resultv2 + resultv1) * 1000);
        handleSetAvailableTime((resultv2 + resultv1) * 1000);
        // setcountdown700(result * 1000);
        //}
      } else {
        setcountdown700();
        handleSetAvailableTime();
      }
    }
  };

  const fetchSkalePrice = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=skale&vs_currencies=usd`
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
        setSeiPrice(obj.data["sei-network"].usd.usd);
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
      .get(`https://api.worldofdypians.com/api/userRanks/${coinbase}`)
      .then((data) => {
        setRankData(data.data);
      })
      .catch(async (err) => {
        if (err.response.status === 404) {
          await axios
            .post(`https://api.worldofdypians.com/api/addUserRank`, {
              walletAddress: coinbase,
            })
            .then(async (data) => {
              const response2 = await axios.get(
                `https://api.worldofdypians.com/api/userRanks/${coinbase}`
              );
              setRankData(response2.data.data);
            });
        }
      });

    // if(response.status === 404){
    //    await axios.post(`https://api.worldofdypians.com/api/addUserRank/0xbf8bc0660f96b1068e21e0f28614148dfa758cec`,
    // {
    //   walletAddress: "0xbf8bc0660f96b1068e21e0f28614148dfa758cec"
    // }).then(async() => {
    //   const response2 = await axios.get(`https://api.worldofdypians.com/api/userRanks/0xbf8bc0660f96b1068e21e0f28614148dfa758cec`)
    //   console.log(response2.data, "data");
    // })
    // }
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

  const getCawsStakesIds = async () => {
    const address = coinbase;

    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
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

  const calculateAllRewardsCawsPremium = async () => {
    const address = coinbase;

    let myStakes = await getCawsStakesIds(address);
    let result = 0;
    let calculateRewards = [];
    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
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
      .get(
        `https://api.worldofdypians.com/api/airdrop-alliance/task7/${wallet}`
      )
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
        setsyncStatus("success");
        setTimeout(() => {
          setshowSyncModal(false);
          setsyncStatus("initial");
        }, 1000);
        onSubscribeSuccess(account);

        if (isonlink) {
          // handleFirstTask(account);
        }
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
      }, 3000);

      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
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
      // console.log(userPosition)

      if (goldenPassRemainingTime) {
        setUserRank2(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(monthlyPrizes[9]) + Number(monthlyPrizesGolden[9])
              : Number(monthlyPrizes[userPosition]) +
                Number(monthlyPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setUserRank2(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(monthlyPrizes[9])
              : Number(monthlyPrizes[userPosition])
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

    const nftContract = new window.bscWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    if (wallet) {
      const result = await nftContract.methods
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

      const nftObject = await premiumSc.methods
        .nftDiscounts(window.config.nft_dypius_premium_address)
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
      } else {
        setnftPremium_tokenId(0);
        setnftPremium_total(0);

        if (discount) {
          setdiscountPercentage(parseInt(discount));
        }
      }
    } else {
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
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

  const fetchKittyDashAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "MobileGameDailyLeaderboard",
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
    setkittyDashRecords(testArray);
    // setGenesisRank(testArray[0].position);
    // setGenesisRank2(testArray[0].statValue);
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
              ? Number(weeklyPrizes[9]) + Number(weeklyPrizesGolden[9])
              : Number(weeklyPrizes[userPosition]) +
                Number(weeklyPrizesGolden[userPosition])
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setweeklyplayerDataAmount(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(weeklyPrizes[9])
              : Number(weeklyPrizes[userPosition])
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
          claimedVictionChests + claimedVictionPremiumChests < 20
        ) {
          setCanBuy(true);
        } else if (
          claimedChests + claimedPremiumChests === 20 &&
          claimedSkaleChests + claimedSkalePremiumChests === 20 &&
          claimedCoreChests + claimedCorePremiumChests === 20 &&
          claimedVictionChests + claimedVictionPremiumChests === 20
        ) {
          setCanBuy(false);
        }
      } else if (!isPremium) {
        if (
          claimedChests < 10 ||
          claimedSkaleChests < 10 ||
          claimedCoreChests < 10 ||
          claimedVictionChests < 10
        ) {
          setCanBuy(true);
        } else if (
          claimedChests === 10 &&
          claimedSkaleChests === 10 &&
          claimedCoreChests === 10 &&
          claimedVictionChests === 10
        ) {
          setCanBuy(false);
        }
      }
    } else {
      setCanBuy(false);
    }
  };

  const getAllChests = async (userEmail) => {
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
        setStandardChests(standardChestsArray);
        setPremiumChests(premiumChestsArray);
        setclaimedChests(openedStandardChests.length);
        setclaimedPremiumChests(openedPremiumChests.length);
        setallChests(chestOrder);
      }
    }
  };

  const getAllSkaleChests = async (userEmail) => {
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
        setStandardSkaleChests(standardChestsArray);
        setPremiumSkaleChests(premiumChestsArray);

        setclaimedSkaleChests(openedStandardChests.length);
        setclaimedSkalePremiumChests(openedPremiumChests.length);
        setallSkaleChests(chestOrder);
      }
    }
  };

  const getAllCoreChests = async (userEmail) => {
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
        setStandardCoreChests(standardChestsArray);
        setPremiumCoreChests(premiumChestsArray);

        setclaimedCoreChests(openedStandardChests.length);
        setclaimedCorePremiumChests(openedPremiumChests.length);
        setallCoreChests(chestOrder);
      }
    }
  };

  const getAllVictionChests = async (userEmail) => {
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
        setStandardVictionChests(standardChestsArray);
        setPremiumVictionChests(premiumChestsArray);

        setclaimedVictionChests(openedStandardChests.length);
        setclaimedVictionPremiumChests(openedPremiumChests.length);
        setallVictionChests(chestOrder);
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
        setStandardSeiChests(standardChestsArray);
        setPremiumSeiChests(premiumChestsArray);

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
    return await window.getMyNFTs(coinbase, type);
  };

  //todo
  const fetchAllMyNfts = async () => {
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "caws").then((NFTS) =>
      setMyNFTSCaws(NFTS)
    );

    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsbnb").then(
    //   (NFTS) => setMyNFTSCawsBNB(NFTS)
    // );
    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsbase").then(
    //   (NFTS) => setMyNFTSCawsBase(NFTS)
    // );
    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsavax").then(
    //   (NFTS) => setMyNFTSCawsAvax(NFTS)
    // );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "timepiece").then(
      (NFTS) => setMyNFTSTimepiece(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "land").then((NFTS) =>
      setMyNFTSLand(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "bnb").then((NFTS) =>
      setMyNFTSBNB(NFTS)
    );
    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landbnb").then(
    //   (NFTS) => setMyNFTSLandBNB(NFTS)
    // );
    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landbase").then(
    //   (NFTS) => setMyNFTSLandBase(NFTS)
    // );
    // getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landavax").then(
    //   (NFTS) => setMyNFTSLandAvax(NFTS)
    // );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "coingecko").then(
      (NFTS) => setMyNFTSCoingecko(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "gate").then((NFTS) =>
      setmyGateNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "conflux").then(
      (NFTS) => setmyConfluxNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "base").then((NFTS) =>
      setmyBaseNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "doge").then((NFTS) =>
      setmyDogeNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cmc").then((NFTS) =>
      setmyCmcNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "core").then((NFTS) =>
      setmyCoreNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "viction").then(
      (NFTS) => setmyVictionNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "multivers").then(
      (NFTS) => setmyMultiversNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "skale").then((NFTS) =>
      setmySkaleNfts(NFTS)
    );
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];

    const listedNFTS = await getListedNFTS(0, "", "buyer", coinbase, "");
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
    setmyBoughtNfts(finalboughtItems1);
    setListedNFTS(finalboughtItems1);
  };

  const windowSize = useWindowSize();

  const getDypBalance = async () => {
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
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(coinbase)
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
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(coinbase)
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
          `https://api.worldofdypians.com/user-favorites/${userId}`
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

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("boughtItems", boughtItems);

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });
    return finalboughtItems;
  };

  const getUserRewardData = async (addr) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/api/specialreward/${addr}`)
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
        ? await window.getEstimatedTokenSubscriptionAmountViction(token)
        : chainId === 713715
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );
    let tokenBalance2 = await window.getTokenHolderBalance(token, coinbase);
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
    setTokenBalance(tokenBalance2);
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
    const coresubscribeAddress = window.config.subscription_core_address;

    const web3 = new Web3(window.ethereum);

    let tokenContract = new web3.eth.Contract(
      window.ERC20_ABI,
      selectedSubscriptionToken
    );
    setloadspinner(true);
    let nftContract = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    if (chainId === 56 && nftPremium_total > 0) {
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
    } else {
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
    }
  };

  const handleUpdatePremiumUser = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/sub/${wallet}`)
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

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const coresubscribeAddress = window.config.subscription_core_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;

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
        ? await window.getEstimatedTokenSubscriptionAmountViction(token)
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
      } else if (chainId === 88) {
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

  const handleSubscribe = async (e) => {
    // e.preventDefault();
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
                chain: chainId.toString(),
                premiumTimestamp: today.toString(),
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
                chain: chainId.toString(),
                premiumTimestamp: today.toString(),
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
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
            setChainDropdown(chainDropdowns[0]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
            setChainDropdown(chainDropdowns[1]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleAvaxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xa86a")
          .then(() => {
            handleSwitchNetwork(43114);
            setChainDropdown(chainDropdowns[2]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBasePool = async () => {
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0x2105")
        .then(() => {
          handleSwitchNetwork(8453);
          setChainDropdown(chainDropdowns[4]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
            setChainDropdown(chainDropdowns[3]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleSkalePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x585eb4b1")
          .then(() => {
            handleSwitchNetwork(1482601649);
            setChainDropdown(chainDropdowns[5]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
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
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x58")
          .then(() => {
            handleSwitchNetwork(88);
            setChainDropdown(chainDropdowns[7]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
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
  const handleRankRewards = () => {
    let totalScore = userBnbScore + userSkaleScore;
    if (totalScore > 6000000) {
      setUserRankRewards(5);
    } else if (totalScore > 12000000) {
      setUserRankRewards(10);
    } else if (totalScore > 24000000) {
      setUserRankRewards(25);
    } else if (totalScore > 40000000) {
      setUserRankRewards(100);
    }
  };

  useEffect(() => {
    handleRankRewards();
  }, [userBnbScore, userSkaleScore]);

  useEffect(() => {
    if (coinbase) {
      getRankData();
      getBundles(coinbase);
    }
  }, [coinbase, bundlesBought]);

  useEffect(() => {
    fetchSkalePrice();
    fetchSeiPrice();
    fetchCorePrice();
    fetchVictionPrice();
    fetchEgldPrice();
  }, []);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      chainId === 1
    ) {
      calculateAllRewardsCawsPremium(data.getPlayer.wallet.publicAddress);
    }
  }, [data, chainId]);

  useEffect(() => {
    setDummyPremiumChests(shuffle(dummyPremiums));
    fetchReleases();
  }, []);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setDummyPremiumChests(shuffle(dummyPremiums));
        setBnbImages(shuffle(chestImagesBnb));
        setSkaleImages(shuffle(chestImagesSkale));
        setVictionImages(shuffle(chestImagesViction));
        setCoreImages(shuffle(chestImagesCore));
        setSeiImages(shuffle(chestImagesSei));

        clearInterval(interval);
      }
    };
    const interval = setInterval(checkMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

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
    getPremiumPopup,
    discountPercentage,
    nftPremium_total,
    nftPremium_tokenId,
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
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      fetchMonthlyRecordsAroundPlayer(monthlyrecords);
      fetchGenesisAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchWeeklyRecordsAroundPlayer(weeklyrecords);
      fetchDailyRecordsAroundPlayer(dailyrecords);
      fetchKittyDashAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchDailyRecordsAroundPlayerCore(dailyRecordsCore);
      fetchWeeklyRecordsAroundPlayerCore(weeklyRecordsCore);
      fetchMonthlyRecordsAroundPlayerCore(monthlyRecordsCore);
      fetchDailyRecordsAroundPlayerViction(dailyRecordsViction);
      fetchWeeklyRecordsAroundPlayerViction(weeklyRecordsViction);
      fetchMonthlyRecordsAroundPlayerViction(monthlyRecordsViction);
      fetchDailyRecordsAroundPlayerSkale(dailyRecordsSkale);
      fetchWeeklyRecordsAroundPlayerSkale(weeklyRecordsSkale);
      fetchMonthlyRecordsAroundPlayerSkale(monthlyRecordsSkale);
    }
  }, [
    data,
    email,
    weeklyrecords,
    dailyRecordsSkale,
    goldenPassRemainingTime,
    monthlyrecords,
    dailyrecords,
    userId,
    username,
    isPremium,
    dailyRecordsCore,
    weeklyRecordsCore,
    monthlyRecordsCore,
    dailyRecordsViction,
    weeklyRecordsViction,
    monthlyRecordsViction,
  ]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      getOpenedChestPerWallet();
    }
  }, [
    data,
    email,
    count,
    isPremium,
    claimedChests,
    claimedPremiumChests,
    claimedSkaleChests,
    claimedSkalePremiumChests,
  ]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      getUserRewardData(data.getPlayer.wallet.publicAddress);
    }
  }, [data, email]);

  useEffect(() => {
    if (coinbase) {
      setsyncStatus("initial");
      fetchAllMyNfts();
      getmyCawsWodStakes();
      getmyWodStakes();
    }
  }, [userWallet, data?.getPlayer?.wallet?.publicAddress, coinbase]);

  useEffect(() => {
    getOtherNfts();
    getDypBalance();
    fetchUserFavorites(coinbase);
  }, [account, email, data?.getPlayer?.wallet]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenDatabnb();
    fetchCFXPrice();
  }, []);

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

  useEffect(() => {
    // if (coinbase) {
    getLatest20BoughtNFTS().then((NFTS) => setLatest20BoughtNFTS(NFTS));
    // getMyOffers();
    // }
  }, [coinbase, isConnected]);

  const logoutItem = localStorage.getItem("logout");

  useEffect(() => {
    if (email) {
      getAllSkaleChests(email);
      getAllChests(email);
      getAllCoreChests(email);
      getAllVictionChests(email);
      // getAllSeiChests(email);
    }
  }, [email, count]);

  useEffect(() => {
    if (bundlesBought === 1) {
      handleRefreshCountdown700();
    }
  }, [bundlesBought]);

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
    calculatePremiumDiscount(userWallet !== "" ? userWallet : coinbase);
  }, [userWallet, coinbase, chainId]);

  const hashValue = window.location.hash;

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px", overflow: "hidden" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative">
        <div className="container-lg mx-0">
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
                        discountPercentage={discountPercentage}
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
                        userSkaleScore={userSkaleScore}
                        genesisRank={genesisRank}
                        email={email}
                        username={data?.getPlayer?.displayName}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        userId={data?.getPlayer?.playerId}
                        balance={dypBalancebnb}
                        availableTime={availableTime}
                        isVerified={data?.getPlayer?.wallet}
                        coinbase={account}
                        setRankData={setRankData}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        userDataStar={userCollectedStars}
                        userDataPosition={userDataStar?.position}
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
                              myBoughtNfts={myBoughtNfts}
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
                              myConfluxNfts={myConfluxNfts}
                              myBaseNfts={myBaseNfts}
                              myDogeNfts={myDogeNfts}
                              myCmcNfts={myCmcNfts}
                              myCoreNfts={myCoreNfts}
                              myVictionNfts={myVictionNfts}
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
                      />
                      <NewWalletBalance
                        onDailyRewardsPopupOpen={() => {
                          setdailyBonusPopup(true);
                        }}
                        onOpenGenesisLeaderboard={() => {
                          setGenesisLeaderboard(true);
                        }}
                        bnbEarnUsd={bnbEarnUsd}
                        dogePrice={dogePrice}
                        weeklyplayerData={weeklyplayerDataAmount}
                        dailyplayerData={dailyplayerDataAmount}
                        dailyDataAmountCore={dailyDataAmountCore}
                        weeklyDataAmountCore={weeklyDataAmountCore}
                        monthlyDataAmountCore={monthlyDataAmountCore}
                        dailyDataAmountViction={dailyDataAmountViction}
                        weeklyDataAmountViction={weeklyDataAmountViction}
                        monthlyDataAmountViction={monthlyDataAmountViction}
                        dailyDataAmountSkale={dailyDataAmountSkale}
                        weeklyDataAmountSkale={weeklyDataAmountSkale}
                        monthlyDataAmountSkale={monthlyDataAmountSkale}
                        skaleEarnToken={skaleEarnToken}
                        skaleEarnUsd={skaleEarnUsd}
                        seiEarnUsd={seiEarnUsd}
                        coreEarnUsd={coreEarnUsd}
                        victionEarnUsd={victionEarnUsd}
                        skalePoints={skalePoints}
                        userRank2={userRank2}
                        genesisRank2={genesisRank2}
                        dailyPopup={dailyBonusPopup}
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
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
                        bnbEarnToken={bnbEarnToken}
                        coreEarnToken={coreEarnToken}
                        victionEarnToken={victionEarnToken}
                        bnbPoints={bnbPoints}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        cawsPremiumRewards={cawsPremiumRewards}
                        userRankRewards={userRankRewards}
                        adClicked={adClicked}
                        onClearAd={() => {
                          setadClicked("");
                        }}
                        multiversPoints={multiversPoints}
                        multiversEarnToken={multiversEarnToken}
                        multiversEarnUsd={multiversEarnUsd}
                      />
                      <WalletBalance
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
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
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        myDogeNfts={myDogeNfts}
                        myCmcNfts={myCmcNfts}
                        myCoreNfts={myCoreNfts}
                        myVictionNfts={myVictionNfts}
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

                    {leaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{ width: "80%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                WOD
                              </mark>{" "}
                              Leaderboard
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
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            availableTime={goldenPassRemainingTime}
                            email={email}
                            isPremium={isPremium}
                            allBnbData={allBnbData}
                            allSkaleData={allSkaleData}
                            allCoreData={allCoreData}
                            allVictionData={allVictionData}
                            dailyplayerData={dailyplayerData}
                            weeklyplayerData={weeklyplayerData}
                            monthlyplayerData={monthlyplayerData}
                            genesisData={genesisData}
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
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
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
                          <div className="d-flex align-items-center justify-content-end">
                            <img
                              src={xMark}
                              onClick={() => setGlobalLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>

                          <GlobalLeaderboard
                            genesisData={genesisData}
                            previousgenesisData={previousgenesisData}
                            previousGenesisVersion={previousGenesisVersion}
                            allStarData={allStarData}
                            screen={"dash"}
                            availableTime={goldenPassRemainingTime}
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            userDataStar={userDataStar}
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
                            address={data?.getPlayer?.wallet?.publicAddress}
                            weeklyplayerData={weeklyplayerDataAmount}
                            dailyplayerData={dailyplayerDataAmount}
                            dailyDataAmountCore={dailyDataAmountCore}
                            weeklyDataAmountCore={weeklyDataAmountCore}
                            monthlyDataAmountCore={monthlyDataAmountCore}
                            dailyDataAmountViction={dailyDataAmountViction}
                            weeklyDataAmountViction={weeklyDataAmountViction}
                            monthlyDataAmountViction={monthlyDataAmountViction}
                            dailyDataAmountSkale={dailyDataAmountSkale}
                            weeklyDataAmountSkale={weeklyDataAmountSkale}
                            monthlyDataAmountSkale={monthlyDataAmountSkale}
                            userRank2={userRank2}
                            email={email}
                            userDataStar={dataAmountStar}
                            allChests={allChests}
                            allSkaleChests={allSkaleChests}
                            allCoreChests={allCoreChests}
                            allVictionChests={allVictionChests}
                            allSeiChests={allSeiChests}
                            availableTime={goldenPassRemainingTime}
                            userSocialRewards={userSocialRewards}
                            bnbEarnUsd={bnbEarnUsd}
                            skaleEarnUsd={skaleEarnUsd}
                            multiversEarnUsd={multiversEarnUsd}
                            seiEarnUsd={seiEarnUsd}
                            victionEarnUsd={victionEarnUsd}
                            coreEarnUsd={coreEarnUsd}
                            kittyDashRecords={kittyDashRecords}
                            userRankRewards={userRankRewards}
                            cawsPremiumRewards={cawsPremiumRewards}
                            genesisRank2={genesisRank2}
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

                    {(getPremiumPopup || adClicked === "premium" || hashValue === "#premium") && (
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
                            {discountPercentage > 0 || nftPremium_total > 0 ? (
                              <div className="premium-discount-bg mt-3 p-4 position-relative">
                                <div className="premiumRedTag position-absolute">
                                  <div className="position-relative d-flex flex-column">
                                    <img src={premiumRedTag} alt="" />
                                    <div className="d-flex flex-column position-absolute discountwrap">
                                      <span className="discount-price2 font-oxanium">
                                        {discountPercentage}%
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
                                    {nftPremium_total > 0 && (
                                      <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                                        Valid until:{" "}
                                        {new Date(
                                          nftDiscountObject.expiration * 1000
                                        )
                                          .toDateString()
                                          .slice(
                                            3,
                                            new Date(
                                              nftDiscountObject.expiration *
                                                1000
                                            ).toDateString().length
                                          )}
                                      </h6>
                                    )}
                                  </div>
                                  <div className="d-flex align-items-end gap-2">
                                    <h6 className="discount-price">
                                      {discountPercentage == 100
                                        ? "FREE"
                                        : "$" +
                                          (100 - Number(discountPercentage))}
                                    </h6>
                                    <h6 className="old-price-text">$100</h6>
                                  </div>
                                  {nftPremium_total > 0 && (
                                    <h6 className="token-amount-placeholder m-0 premium-custom-text">
                                      Valid until:{" "}
                                      {new Date(
                                        nftDiscountObject.expiration * 1000
                                      )
                                        .toDateString()
                                        .slice(
                                          3,
                                          new Date(
                                            nftDiscountObject.expiration * 1000
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
                                        alt=""
                                      />
                                      <span className="subscription-chain mb-0">
                                        BNB Chain
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                            .default
                                        }
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
                                  {discountPercentage < 100 && (
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
                                                        : chainId === 1482601649
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
                                                        .subscription_tokens[t]
                                                        ?.symbol
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
                                                    : chainId === 713715
                                                    ? window.config
                                                        .subscriptionsei_tokens[
                                                        t
                                                      ]?.symbol
                                                    : window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol}
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
                                          ${100 - Number(discountPercentage)}
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
                            ) : isConnected && discountPercentage === 0 ? (
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
                    address={data?.getPlayer?.wallet?.publicAddress}
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
                coreImages={coreImages}
                chainId={chainId}
                dypTokenData={dypTokenData}
                ethTokenData={ethTokenData}
                dyptokenData_old={dyptokenData_old}
                handleSwitchChain={handleSwitchChain}
                handleSwitchNetwork={handleSwitchNetwork}
                listedNFTS={listedNFTS}
                onclose={() => {
                  setdailyBonusPopup(false);
                  window.location.hash = "";
                }}
                coinbase={coinbase}
                standardChests={standardChests}
                premiumChests={premiumChests}
                standardSkaleChests={standardSkaleChests}
                premiumSkaleChests={premiumSkaleChests}
                standardCoreChests={standardCoreChests}
                premiumCoreChests={premiumCoreChests}
                standardVictionChests={standardVictionChests}
                premiumVictionChests={premiumVictionChests}
                standardSeiChests={standardSeiChests}
                premiumSeiChests={premiumSeiChests}
                claimedChests={claimedChests}
                claimedPremiumChests={claimedPremiumChests}
                claimedSkaleChests={claimedSkaleChests}
                claimedSkalePremiumChests={claimedSkalePremiumChests}
                claimedCoreChests={claimedCoreChests}
                claimedCorePremiumChests={claimedCorePremiumChests}
                claimedVictionChests={claimedVictionChests}
                claimedVictionPremiumChests={claimedVictionPremiumChests}
                claimedSeiChests={claimedSeiChests}
                claimedSeiPremiumChests={claimedSeiPremiumChests}
                email={email}
                openedChests={openedChests}
                openedSkaleChests={openedSkaleChests}
                openedCoreChests={openedCoreChests}
                openedVictionChests={openedVictionChests}
                openedSeiChests={openedSeiChests}
                canBuy={canBuy}
                address={data?.getPlayer?.wallet?.publicAddress}
                allChests={allChests}
                allSkaleChests={allSkaleChests}
                allCoreChests={allCoreChests}
                allVictionChests={allVictionChests}
                allSeiChests={allSeiChests}
                onChestClaimed={() => {
                  setCount(count + 1);
                }}
                onSkaleChestClaimed={() => {
                  setCount(count + 1);
                }}
                onCoreChestClaimed={() => {
                  setCount(count + 1);
                }}
                onVictionChestClaimed={() => {
                  setCount(count + 1);
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
