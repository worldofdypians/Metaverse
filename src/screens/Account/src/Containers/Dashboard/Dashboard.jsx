/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import NewEvents from "../../../../../components/NewEvents/NewEvents";

import GlobalLeaderboard from "../../../../../components/LeaderBoard/GlobalLeaderboard";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import axios from "axios";
// import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import OutsideClickHandler from "react-outside-click-handler";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
// import MyBalance from "../../Components/WalletBalance/MyBalance";

import { switchNetworkWagmi } from "../../../../../utils/wagmiSwitchChain";
import { readContract } from "@wagmi/core";
import { wagmiClient } from "../../../../../wagmiConnectors";

import NewLeaderBoard from "../../Components/LeaderBoard/NewLeaderBoard";
import GenesisLeaderboard from "../../Components/LeaderBoard/GenesisLeaderboard";
import NewDailyBonus from "../../../../../components/NewDailyBonus/NewDailyBonus";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ReCaptchaV2 from "react-google-recaptcha";
import GoldenPassPopup from "../../../../../components/PackagePopups/GoldenPassPopup";
import {
  golden_pass2_address,
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
  monthlyStarPrizes,
  monthlyExtraStarPrizes,
  skaleStars,
  taikoStars,
  weeklyStarPrizes,
  weeklyExtraStarPrizes,
  seiStars,
  taraxaStars,
  matStars,
  vanarStars,
  coreStars,
} from "./stars";
import { bannedEmails, placeholderplayerData, dummyPremiums } from "./data";
import GetPremiumPopup from "../../Components/PremiumPopup/GetPremium";
import AIQuestion from "../../../../../components/AIQuestion/AIQuestion";
import ClosePopup from "../../../../../components/AIQuestion/ClosePopup";
import BoosterPopup from "../../../../../components/Booster/BoosterPopup";
import { useUser } from "../../../../../redux/hooks/useWallet";
import { useDispatch, useSelector } from "react-redux";
import { setUserProgress } from "../../../../../redux/slices/userSlice";
import { useQuery as useReactQuery } from "@tanstack/react-query";

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
  isEOA,
  dailyBonuslistedNFTS,
  isConnected,
  chainId,
  coinbase,
  handleConnect,
  ethTokenData,
  onSyncClick,
  handleSwitchNetwork,
  handleSwitchChain,
  logoutCount,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  latest20BoughtNFTS,

  onSuccessDeposit,
  treasureHuntEvents,
  onManageLogin,
  authToken,
  wodBalance,
  isTokenExpired,
  listedNFTS,
  walletClient,
  publicClient,
  network_matchain,
  syncStatus,
  openKickstarter,
  royaltyCount,
  onOpenRoyaltyChest,
  setRoyalChestIndex,
  onOpenRoyaltyChestTaiko,
  setRoyalChestIndexTaiko,
  userTreasureHuntStats,
  userCollectedNFTS,
  email,
  userId,
  username,
  userWallet,
  isPremium,
}) {
  const { setUserNFTs } = useUser();
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const hasUserId = userId !== undefined && userId !== null;

  // Get isPremium and primeStars from Redux store
  const primeStars = useSelector((state) => state.user.userProgress.primeStars);

  // const override = {
  //   display: "block",
  //   margin: "auto",
  //   borderColor: "#554fd8",
  // };
  const suspenseful1Sound =
    "https://cdn.worldofdypians.com/wod/aiOryn/longSuspense.mp3";
  const clockSound = "https://cdn.worldofdypians.com/wod/aiOryn/clockSound.mp3";

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

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showDailyQuestion, setShowDailyQuestion] = useState(false);
  const [booster, setBooster] = useState(false);

  const [tooltip, setTooltip] = useState(false);

  const [closePopup, setClosePopup] = useState(false);

  const [errors, setErrors] = useState({});

  const [showNfts, setShowNfts] = useState(false);
  const [goldenPassRemainingTime, setGoldenPassRemainingTime] = useState();

  const [landstakes, setLandStakes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [specialRewardsPopup, setSpecialRewardsPopup] = useState(false);
  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);

  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [openedChests, setOpenedChests] = useState([]);
  const [openedSkaleChests, setOpenedSkaleChests] = useState([]);
  const [openedVictionChests, setOpenedVictionChests] = useState([]);
  const [openedCoreChests, setOpenedCoreChests] = useState([]);
  const [openedSeiChests, setOpenedSeiChests] = useState([]);
  const [openedMantaChests, setOpenedMantaChests] = useState([]);
  const [openedTaikoChests, setOpenedTaikoChests] = useState([]);
  const [openedVanarChests, setOpenedVanarChests] = useState([]);
  const [openedBaseChests, setOpenedBaseChests] = useState([]);
  const [openedMatChests, setOpenedMatChests] = useState([]);
  const [openedTaraxaChests, setOpenedTaraxaChests] = useState([]);

  const [leaderboard, setLeaderboard] = useState(false);
  const [genesisLeaderboard, setGenesisLeaderboard] = useState(false);

  const [goldenPassPopup, setgoldenPassPopup] = useState(false);
  const [aiQuestionCompleted, setAiQuestionCompleted] = useState(false);

  const [globalLeaderboard, setGlobalLeaderboard] = useState(false);

  const [myOffers, setmyOffers] = useState([]);
  const [allActiveOffers, setallOffers] = useState([]);

  const [isonlink, setIsOnLink] = useState(false);
  const [myRewardsPopup, setmyRewardsPopup] = useState(false);

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
  const [claimedVanarChests, setclaimedVanarChests] = useState(0);
  const [claimedMatChests, setclaimedMatChests] = useState(0);
  const [claimedTaraxaChests, setclaimedTaraxaChests] = useState(0);

  const [claimedVictionPremiumChests, setclaimedVictionPremiumChests] =
    useState(0);
  const [claimedSeiPremiumChests, setclaimedSeiPremiumChests] = useState(0);
  const [claimedMantaPremiumChests, setclaimedMantaPremiumChests] = useState(0);
  const [claimedTaikoPremiumChests, setclaimedTaikoPremiumChests] = useState(0);
  const [claimedVanarPremiumChests, setclaimedVanarPremiumChests] = useState(0);
  const [claimedMatPremiumChests, setclaimedMatPremiumChests] = useState(0);
  const [claimedTaraxaPremiumChests, setclaimedTaraxaPremiumChests] =
    useState(0);

  const [userSocialRewards, setuserSocialRewards] = useState(0);

  const [canBuy, setCanBuy] = useState(false);

  const [allChests, setallChests] = useState([]);
  const [allSkaleChests, setallSkaleChests] = useState([]);
  const [allCoreChests, setallCoreChests] = useState([]);
  const [allVictionChests, setallVictionChests] = useState([]);
  const [allTaikoChests, setallTaikoChests] = useState([]);
  const [allVanarChests, setallVanarChests] = useState([]);
  const [allSeiChests, setallSeiChests] = useState([]);
  const [allMantaChests, setallMantaChests] = useState([]);
  const [allBaseChests, setallBaseChests] = useState([]);
  const [allMatChests, setallMatChests] = useState([]);
  const [allTaraxaChests, setallTaraxaChests] = useState([]);

  const [countdown, setcountdown] = useState();
  const [countdown3500, setcountdown3500] = useState();

  const [userDailyBundles, setuserDailyBundles] = useState([]);

  const [count, setCount] = useState(0);
  const [skalecount, setskalecount] = useState(0);
  const [vicitoncount, setvicitoncount] = useState(0);
  const [corecount, setcorecount] = useState(0);
  const [mantacount, setmantacount] = useState(0);
  const [taikocount, settaikocount] = useState(0);
  const [vanarcount, setVanarcount] = useState(0);
  const [basecount, setbasecount] = useState(0);
  const [matcount, setmatcount] = useState(0);
  const [seicount, setseicount] = useState(0);
  const [taraxacount, settaraxacount] = useState(0);

  const [genesisRank2, setGenesisRank2] = useState(0);

  const [cawsPremiumRewards, setcawsPremiumRewards] = useState(0);
  const [landPremiumRewards, setlandPremiumRewards] = useState(0);

  const [portfolio, setPortfolio] = useState(false);

  const [bnbImages] = useState(shuffle(chestImagesBnb));
  const [skaleImages] = useState(shuffle(chestImagesSkale));
  const [coreImages] = useState(shuffle(chestImagesCore));
  const [victionImages] = useState(shuffle(chestImagesViction));
  const [taikoImages] = useState(shuffle(chestImagesTaiko));
  const [mantaImages] = useState(shuffle(chestImagesViction));
  const [baseImages] = useState(shuffle(chestImagesBase));
  const [matImages] = useState(shuffle(chestImagesMat));
  const [taraxaImages] = useState(shuffle(chestImagesMat));

  const [seiImages] = useState(shuffle(chestImagesSei));

  const [mediaUrl, setMediaUrl] = useState("");
  const [userSocialRewardsCached, setuserSocialRewardsCached] = useState(0);
  const [suspenseSound, setSuspenseSound] = useState(false);
  const [selectedEvent, setselectedEvent] = useState([]);
  const [showEventPopup, setshowEventPopup] = useState(false);
  const [aiStep, setAiStep] = useState(0);

  const [leaderboardBtn, setleaderboardBtn] = useState("weekly");

  const suspenseMusicRef = useRef(null);
  const clockSoundRef = useRef(null);
  const totalTreasureHuntUsd = Object.entries(userTreasureHuntStats)
    .filter(
      ([key, value]) => key.toLowerCase().includes("earnusd") && value > 0
    )
    .reduce((sum, [, value]) => sum + value, 0);

  const getAiStep = (data) => {
    setAiStep(data);
  };

  // Function to update Redux store with user progress data
  const updateUserProgressInRedux = () => {
    const userProgressData = {
      // Global Rankings
      globalMonthly:
        userDataStar?.statValue !== undefined && userDataStar?.statValue > 0
          ? userDataStar.position + 1
          : "---",
      globalWeekly:
        userDataStarWeekly?.statValue !== undefined &&
        userDataStarWeekly?.statValue > 0
          ? userDataStarWeekly.position + 1
          : "---",
      totalStars: userDataStar?.statValue || 0,

      // BNB Chain
      userRank:
        userData?.statValue !== undefined && userData?.statValue > 0
          ? userData.position
          : "---",
      userBnbStars:
        (userData?.statValue === 0
          ? 0
          : userData?.position > 100
          ? 0
          : bnbStars[userData?.position]) ?? 0,
      userBnbScore:
        userData?.statValue !== undefined && userData?.statValue > 0
          ? userData?.statValue
          : 0,

      // Skale Chain
      userRankSkale:
        userDataSkale?.statValue !== undefined && userDataSkale?.statValue > 0
          ? userDataSkale.position
          : "---",
      userSkaleStars:
        (userDataSkale?.statValue === 0
          ? 0
          : userDataSkale?.position > 100
          ? 0
          : skaleStars[userDataSkale?.position]) ?? 0,
      userSkaleScore:
        userDataSkale?.statValue !== undefined && userDataSkale?.statValue > 0
          ? userDataSkale?.statValue
          : 0,

      // Core Chain
      userRankCore:
        userDataCore?.statValue !== undefined && userDataCore?.statValue > 0
          ? userDataCore.position
          : "---",
      userCoreStars:
        (userDataCore?.statValue === 0
          ? 0
          : userDataCore?.position > 100
          ? 0
          : coreStars[userDataCore?.position]) ?? 0,
      userCoreScore:
        userDataCore?.statValue !== undefined && userDataCore?.statValue > 0
          ? userDataCore?.statValue
          : 0,

      // Viction Chain
      userRankViction:
        userDataViction?.statValue !== undefined &&
        userDataViction?.statValue > 0
          ? userDataViction.position
          : "---",
      userVictionStars:
        (userDataViction?.statValue === 0
          ? 0
          : userDataViction?.position > 100
          ? 0
          : matStars[userDataViction?.position]) ?? 0,
      userVictionScore:
        userDataViction?.statValue !== undefined &&
        userDataViction?.statValue > 0
          ? userDataViction?.statValue
          : 0,

      // Manta Chain
      userRankManta:
        userDataManta?.statValue !== undefined && userDataManta?.statValue > 0
          ? userDataManta.position
          : "---",
      userMantaStars:
        (userDataManta?.statValue === 0
          ? 0
          : userDataManta?.position > 100
          ? 0
          : baseStars[userDataManta?.position]) ?? 0,
      userMantaScore:
        userDataManta?.statValue !== undefined && userDataManta?.statValue > 0
          ? userDataManta?.statValue
          : 0,

      // Base Chain
      userRankBase:
        userDataBase?.statValue !== undefined && userDataBase?.statValue > 0
          ? userDataBase.position
          : "---",
      userBaseStars:
        (userDataBase?.statValue === 0
          ? 0
          : userDataBase?.position > 100
          ? 0
          : baseStars[userDataBase?.position]) ?? 0,
      userBaseScore:
        userDataBase?.statValue !== undefined && userDataBase?.statValue > 0
          ? userDataBase?.statValue
          : 0,

      // Taiko Chain
      userRankTaiko:
        userDataTaiko?.statValue !== undefined && userDataTaiko?.statValue > 0
          ? userDataTaiko.position
          : "---",
      userTaikoStars:
        (userDataTaiko?.statValue === 0
          ? 0
          : userDataTaiko?.position > 100
          ? 0
          : taikoStars[userDataTaiko?.position]) ?? 0,
      userTaikoScore:
        userDataTaiko?.statValue !== undefined && userDataTaiko?.statValue > 0
          ? userDataTaiko?.statValue
          : 0,

      // MAT Chain
      userRankMat:
        userDataMat?.statValue !== undefined && userDataMat?.statValue > 0
          ? userDataMat.position
          : "---",
      userMatStars:
        userDataMat?.statValue === 0
          ? 0
          : userDataMat?.position > 100
          ? 0
          : matStars[userDataMat?.position],
      userMatScore:
        userDataMat?.statValue !== undefined && userDataMat?.statValue > 0
          ? userDataMat?.statValue
          : 0,

      // Sei Chain
      userRankSei:
        userDataSei?.statValue !== undefined && userDataSei?.statValue > 0
          ? userDataSei.position
          : "---",
      userSeiStars:
        userDataSei?.statValue === 0
          ? 0
          : userDataSei?.position > 100
          ? 0
          : seiStars[userDataSei?.position],
      userSeiScore:
        userDataSei?.statValue !== undefined && userDataSei?.statValue > 0
          ? userDataSei?.statValue
          : 0,

      // Vanar Chain
      userRankVanar:
        userDataVanar?.statValue !== undefined && userDataVanar?.statValue > 0
          ? userDataVanar.position
          : "---",
      userVanarStars:
        (userDataVanar?.statValue === 0
          ? 0
          : userDataVanar?.position > 100
          ? 0
          : vanarStars[userDataVanar?.position]) ?? 0,
      userVanarScore:
        userDataVanar?.statValue !== undefined && userDataVanar?.statValue > 0
          ? userDataVanar?.statValue
          : 0,

      // Taraxa Chain
      userRankTaraxa:
        userDataTaraxa?.statValue !== undefined && userDataTaraxa?.statValue > 0
          ? userDataTaraxa.position
          : "---",
      userTaraxaStars:
        userDataTaraxa?.statValue === 0
          ? 0
          : userDataTaraxa?.position > 100
          ? 0
          : taraxaStars[userDataTaraxa?.position],
      userTaraxaScore:
        userDataTaraxa?.statValue !== undefined && userDataTaraxa?.statValue > 0
          ? userDataTaraxa?.statValue
          : 0,

      // Prime Status
      // primeStars: primeStars,
      isPremium: isPremium,
    };

    dispatch(setUserProgress(userProgressData));
  };

  useEffect(() => {
    suspenseMusicRef.current = new Audio(suspenseful1Sound);
    clockSoundRef.current = new Audio(clockSound);
  }, []);

  const recaptchaRef = useRef(null);
  const effectRan = useRef(false);
  const effectRan2 = useRef(false);

  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");

  const updateRewardApis = async (data) => {
    const result = await axios
      .post("https://api.worldofdypians.com/api/post-event", data)
      .catch((e) => {
        console.error(e);
      });
    if (result && result.status === 200) {
      console.log(result);
    }
  };

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
        await axios
          .post("https://api.worldofdypians.com/api/submissions", data, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then(function (result) {
            // console.log(result.data);
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

  const dataFetchedRef = useRef(false);
  const dataFetchedRef2 = useRef(false);

  const [allBnbData, setAllBnbData] = useState([]);
  const [allSkaleData, setAllSkaleData] = useState([]);
  const [allCoreData, setAllCoreData] = useState([]);
  const [allVictionData, setAllVictionData] = useState([]);
  const [allVanarData, setAllVanarData] = useState([]);
  const [allMantaData, setAllMantaData] = useState([]);
  const [allTaikoData, setAllTaikoData] = useState([]);
  const [allBaseData, setAllBaseData] = useState([]);
  const [allMatData, setAllMatData] = useState([]);
  const [allSeiData, setAllSeiData] = useState([]);
  const [allTaraxaData, setAllTaraxaData] = useState([]);

  const [dailyRecordsCore, setDailyRecordsCore] = useState([]);
  const [activePlayerCore, setActivePlayerCore] = useState(false);
  const [activePlayerVanar, setActivePlayerVanar] = useState(false);
  const [userDataCore, setUserDataCore] = useState({});
  const [prevDataCore, setPrevDataCore] = useState([]);
  const [prevDataVanar, setPrevDataVanar] = useState([]);
  const [userDataVanar, setUserDataVanar] = useState({});

  const [dailyRecordsSkale, setDailyRecordsSkale] = useState([]);

  const [activePlayerSkale, setActivePlayerSkale] = useState(false);

  const [userDataSkale, setUserDataSkale] = useState({});

  const [prevDataSkale, setPrevDataSkale] = useState([]);

  const [loadingBnb, setloadingBnb] = useState(false);
  const [loadingMat, setloadingMat] = useState(false);
  const [loadingSkale, setloadingSkale] = useState(false);
  const [loadingCore, setloadingCore] = useState(false);
  const [loadingViction, setloadingViction] = useState(false);
  const [loadingManta, setloadingManta] = useState(false);
  const [loadingTaiko, setloadingTaiko] = useState(false);
  const [loadingBase, setloadingBase] = useState(false);
  const [loadingSei, setloadingSei] = useState(false);
  const [loadingVanar, setLoadingVanar] = useState(false);
  const [loadingStarWeekly, setloadingStarWeekly] = useState(false);
  const [loadingStarMonthly, setloadingStarMonthly] = useState(false);

  const [eventCardCount, seteventCardCount] = useState(0);
  const [explorerHuntData, setexplorerHuntData] = useState([]);
  const [greatCollectionData, setgreatCollectionData] = useState([]);

  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);
  const [starRecordsWeekly, setStarRecordsWeekly] = useState([]);
  const [activePlayerStar, setActivePlayerStar] = useState([]);
  const [activePlayerStarWeekly, setActivePlayerStarWeekly] = useState([]);
  const [userDataStar, setUserDataStar] = useState({});
  const [userPreviousDataStar, setUserPreviousDataStar] = useState({});
  const [userPreviousDataStar2, setUserPreviousDataStar2] = useState({});

  const [userDataStarWeekly, setUserDataStarWeekly] = useState({});
  const [prevDataStar, setPrevDataStar] = useState([]);
  const [prevDataStarWeekly, setPrevDataStarWeekly] = useState([]);
  const [dataAmountStar, setDataAmountStar] = useState([]);
  const [dataAmountStarWeekly, setDataAmountStarWeekly] = useState([]);
  // const [userCollectedStars, setuserCollectedStars] = useState(0);
  // const [userCollectedStarsWeekly, setuserCollectedStarsWeekly] = useState(0);

  const [dailyRecordsViction, setDailyRecordsViction] = useState([]);

  const [activePlayerViction, setActivePlayerViction] = useState(false);

  const [userDataViction, setUserDataViction] = useState({});

  const [prevDataViction, setPrevDataViction] = useState([]);

  // const [dailyDataAmountViction, setDailyDataAmountViction] = useState([]);

  const [dailyRecordsManta, setDailyRecordsManta] = useState([]);

  const [activePlayerManta, setActivePlayerManta] = useState(false);

  const [userDataManta, setUserDataManta] = useState({});

  const [prevDataManta, setPrevDataManta] = useState([]);

  // const [dailyDataAmountManta, setDailyDataAmountManta] = useState([]);

  const [dailyRecordsSei, setDailyRecordsSei] = useState([]);

  const [activePlayerSei, setActivePlayerSei] = useState(false);

  const [userDataSei, setUserDataSei] = useState({});

  const [prevDataSei, setPrevDataSei] = useState([]);

  const [dailyRecordsTaraxa, setDailyRecordsTaraxa] = useState([]);

  const [activePlayerTaraxa, setActivePlayerTaraxa] = useState(false);

  const [userDataTaraxa, setUserDataTaraxa] = useState({});

  const [prevDataTaraxa, setPrevDataTaraxa] = useState([]);

  const [loadingTaraxa, setLoadingTaraxa] = useState(false);

  const [dailyRecordsBase, setDailyRecordsBase] = useState([]);

  const [activePlayerBase, setActivePlayerBase] = useState(false);

  const [userDataBase, setUserDataBase] = useState({});
  const [prevDataBase, setPrevDataBase] = useState([]);
  const [dailyRecordsTaiko, setDailyRecordsTaiko] = useState([]);
  const [activePlayerTaiko, setActivePlayerTaiko] = useState(false);
  const [userDataTaiko, setUserDataTaiko] = useState({});

  const [prevDataTaiko, setPrevDataTaiko] = useState([]);

  const [dailyRecordsMat, setDailyRecordsMat] = useState([]);
  const [activePlayerMat, setActivePlayerMat] = useState(false);
  const [userDataMat, setUserDataMat] = useState({});

  const [prevDataMat, setPrevDataMat] = useState([]);

  const [dailyrecords, setRecords] = useState([]);
  const [dailyRecordsVanar, setDailyRecordsVanar] = useState([]);
  // const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [activePlayer, setActivePlayer] = useState(false);
  // const [activePlayerWeekly, setActivePlayerWeekly] = useState(false);

  const [userData, setUserData] = useState({});

  const [dailyplayerData, setdailyplayerData] = useState([]);

  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);

  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);
  const [specialRewardsSuccess, setSpecialRewardsSuccess] = useState(false);
  const [treasureRewardMoney, setTreasureRewardMoney] = useState({
    bnb: 0,
    skale: 0,
    sei: 0,
    core: 0,
    vanar: 0,
    viction: 0,
    manta: 0,
    base: 0,
    taiko: 0,
    taraxa: 0,
    mat: 0,
  });
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
  const [aiQuestionRewards, setaiQuestionRewards] = useState([]);
  const [aiQuestionObjectAnswered, setAiQuestionObjectAnswered] = useState({
    question: "",
    options: [],
    id: "",
    userIndex: undefined,
    correctIndex: undefined,
    chain: "",
  });

  const [aiQuestionObject2, setAiQuestionObject2] = useState({
    question: "",
    options: [],
    id: "",
  });

  const totalDailyBonusSum = Object.values(treasureRewardMoney).reduce(
    (sum, value) => sum + value,
    0
  );

  const claimedMoneyReward = aiQuestionRewards.find(
    (item) => item.rewardType === "Money" && item.status === "Claimed"
  );

  const useWarnOnRefresh = (shouldWarn) => {
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (shouldWarn === 0) return; // Do nothing if the condition is false

        event.preventDefault();
        event.returnValue = ""; // Required for the dialog to appear
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [shouldWarn]);
  };

  useWarnOnRefresh(aiStep);

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

  const LEADERBOARD_CACHE_MS = 5 * 60 * 1000;

  // Calculate milliseconds until 00:30 UTC
  const getMillisecondsUntil0030UTC = () => {
    const now = new Date();

    // Create target time for 00:30 UTC today
    const targetToday = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, // hour
        30, // minute
        0, // second
        0 // millisecond
      )
    );

    // If current time is before 00:30 UTC today, use today's target
    // Otherwise, use tomorrow's 00:30 UTC
    if (now.getTime() < targetToday.getTime()) {
      return targetToday.getTime() - now.getTime();
    } else {
      // Calculate until 00:30 UTC tomorrow
      const targetTomorrow = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0, // hour
          30, // minute
          0, // second
          0 // millisecond
        )
      );
      return targetTomorrow.getTime() - now.getTime();
    }
  };

  const isQueryFresh = (query) =>
    Boolean(query?.data && query?.dataUpdatedAt) &&
    Date.now() - query.dataUpdatedAt < LEADERBOARD_CACHE_MS;

  const fetchQueryData = async (query, { force = false } = {}) => {
    if (!query) {
      return { data: null, fromCache: false, error: null };
    }

    if (!force && isQueryFresh(query)) {
      return { data: query.data, fromCache: true, error: null };
    }

    // If query is enabled and already fetching, wait for the existing fetch
    // instead of triggering a duplicate refetch
    // React Query deduplicates requests with the same queryKey, but refetch()
    // can bypass that, so we check here first
    if (query.isFetching || query.isLoading) {
      // Wait for the query to finish by polling its status
      // This prevents duplicate API calls when queries are auto-enabled
      let attempts = 0;
      const maxAttempts = 100; // ~10 seconds max wait (100 * 100ms)
      while ((query.isFetching || query.isLoading) && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      // After waiting, return the data if available
      if (query.data) {
        return {
          data: query.data,
          fromCache: false,
          error: query.error ?? null,
        };
      }
      // If still no data after waiting, fall through to refetch below
    }

    const result = await query.refetch({ throwOnError: false });
    if (!result?.data) {
      if (query?.data) {
        return {
          data: query.data,
          fromCache: true,
          error: result?.error ?? null,
        };
      }
      return { data: null, fromCache: false, error: result?.error ?? null };
    }

    return { data: result.data, fromCache: false, error: result.error ?? null };
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

  const previousWinnersCoreVersionRef = useRef(null);
  const previousWinnersCoreFetchedVersionRef = useRef(null);
  const previousWinnersCoreFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef = useRef(null);

  const previousWinnersCoreQuery = useReactQuery({
    queryKey: ["previousWinnersCore"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersCoreVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsCoreQuery = useReactQuery({
    queryKey: ["dailyRecordsCore"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardCoreDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerCoreQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerCore", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardCoreDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersCore = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataCore(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersCoreFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersCoreFetchingPromiseRef.current &&
      previousWinnersCoreVersionRef.current === version
    ) {
      try {
        await previousWinnersCoreFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersCoreFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersCoreVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersCoreQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataCore(placeholderplayerData);
          return;
        }
        setPrevDataCore(data);
        previousWinnersCoreFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersCoreFetchingPromiseRef.current === fetchPromise) {
          previousWinnersCoreFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersCoreFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerCore = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerCoreQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerCore(false);
          return;
        }
        const [userRecord] = data;
        setUserDataCore(userRecord);
        setActivePlayerCore(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerCoreFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsCore = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsCoreQuery);
    if (!useCache) {
      setloadingCore(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsCoreQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsCore([]);
      setPrevDataCore(placeholderplayerData);
      setloadingCore(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsCore(leaderboard);
    fillRecordsCore(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersCore(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerCore(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingCore(false);
      }, 1000);
    } else {
      setloadingCore(false);
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

  const previousWinnersVictionVersionRef = useRef(null);
  const previousWinnersVictionFetchedVersionRef = useRef(null);
  const previousWinnersVictionFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef = useRef(null);

  const previousWinnersVictionQuery = useReactQuery({
    queryKey: ["previousWinnersViction"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersVictionVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsVictionQuery = useReactQuery({
    queryKey: ["dailyRecordsViction"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardVictionDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerVictionQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerViction", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardVictionDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersViction = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataViction(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersVictionFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersVictionFetchingPromiseRef.current &&
      previousWinnersVictionVersionRef.current === version
    ) {
      try {
        await previousWinnersVictionFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersVictionFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersVictionVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersVictionQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataViction(placeholderplayerData);
          return;
        }
        setPrevDataViction(data);
        previousWinnersVictionFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersVictionFetchingPromiseRef.current === fetchPromise) {
          previousWinnersVictionFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersVictionFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerViction = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerVictionQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerViction(false);
          return;
        }
        const [userRecord] = data;
        setUserDataViction(userRecord);
        setActivePlayerViction(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerVictionFetchingPromiseRef.current =
      fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsViction = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsVictionQuery);
    if (!useCache) {
      setloadingViction(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsVictionQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsViction([]);
      setPrevDataViction(placeholderplayerData);
      setloadingViction(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsViction(leaderboard);
    fillRecordsViction(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersViction(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerViction(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingViction(false);
      }, 1000);
    } else {
      setloadingViction(false);
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

  const previousWinnersMantaVersionRef = useRef(null);
  const previousWinnersMantaFetchedVersionRef = useRef(null);
  const previousWinnersMantaFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef = useRef(null);

  const previousWinnersMantaQuery = useReactQuery({
    queryKey: ["previousWinnersManta"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersMantaVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsMantaQuery = useReactQuery({
    queryKey: ["dailyRecordsManta"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardMantaDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerMantaQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerManta", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardMantaDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersManta = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataManta(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersMantaFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersMantaFetchingPromiseRef.current &&
      previousWinnersMantaVersionRef.current === version
    ) {
      try {
        await previousWinnersMantaFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersMantaFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersMantaVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersMantaQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataManta(placeholderplayerData);
          return;
        }
        setPrevDataManta(data);
        previousWinnersMantaFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersMantaFetchingPromiseRef.current === fetchPromise) {
          previousWinnersMantaFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersMantaFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerManta = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerMantaQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerManta(false);
          return;
        }
        const [userRecord] = data;
        setUserDataManta(userRecord);
        setActivePlayerManta(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerMantaFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsManta = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsMantaQuery);
    if (!useCache) {
      setloadingManta(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsMantaQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsManta([]);
      setPrevDataManta(placeholderplayerData);
      setloadingManta(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsManta(leaderboard);
    fillRecordsManta(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersManta(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerManta(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingManta(false);
      }, 1000);
    } else {
      setloadingManta(false);
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

  const previousWinnersSeiVersionRef = useRef(null);
  const previousWinnersSeiFetchedVersionRef = useRef(null);
  const previousWinnersSeiFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef = useRef(null);

  const previousWinnersSeiQuery = useReactQuery({
    queryKey: ["previousWinnersSei"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersSeiVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsSeiQuery = useReactQuery({
    queryKey: ["dailyRecordsSei"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardSeiDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerSeiQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerSei", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardSeiDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersSei = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataSei(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersSeiFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersSeiFetchingPromiseRef.current &&
      previousWinnersSeiVersionRef.current === version
    ) {
      try {
        await previousWinnersSeiFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersSeiFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersSeiVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersSeiQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataSei(placeholderplayerData);
          return;
        }
        setPrevDataSei(data);
        previousWinnersSeiFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersSeiFetchingPromiseRef.current === fetchPromise) {
          previousWinnersSeiFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersSeiFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerSei = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerSeiQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerSei(false);
          return;
        }
        const [userRecord] = data;
        setUserDataSei(userRecord);
        setActivePlayerSei(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerSeiFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsSei = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsSeiQuery);
    if (!useCache) {
      setloadingSei(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsSeiQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsSei([]);
      setPrevDataSei(placeholderplayerData);
      setloadingSei(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsSei(leaderboard);
    fillRecordsSei(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersSei(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerSei(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingSei(false);
      }, 1000);
    } else {
      setloadingSei(false);
    }
  };

  //TARAXA
  const fillRecordsTaraxa = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsTaraxa(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsTaraxa(finalData);
    }
  };

  const previousWinnersTaraxaVersionRef = useRef(null);
  const previousWinnersTaraxaFetchedVersionRef = useRef(null);
  const previousWinnersTaraxaFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef = useRef(null);

  const previousWinnersTaraxaQuery = useReactQuery({
    queryKey: ["previousWinnersTaraxa"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersTaraxaVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
      const data = {
        StatisticName: "LeaderboardTaraxaDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsTaraxaQuery = useReactQuery({
    queryKey: ["dailyRecordsTaraxa"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardTaraxaDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerTaraxaQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerTaraxa", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardTaraxaDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersTaraxa = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataTaraxa(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersTaraxaFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersTaraxaFetchingPromiseRef.current &&
      previousWinnersTaraxaVersionRef.current === version
    ) {
      try {
        await previousWinnersTaraxaFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersTaraxaFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersTaraxaVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersTaraxaQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataTaraxa(placeholderplayerData);
          return;
        }
        setPrevDataTaraxa(data);
        previousWinnersTaraxaFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersTaraxaFetchingPromiseRef.current === fetchPromise) {
          previousWinnersTaraxaFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersTaraxaFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerTaraxa = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerTaraxaQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerTaraxa(false);
          return;
        }
        const [userRecord] = data;
        setUserDataTaraxa(userRecord);
        setActivePlayerTaraxa(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerTaraxaFetchingPromiseRef.current =
      fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsTaraxa = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsTaraxaQuery);
    if (!useCache) {
      setLoadingTaraxa(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsTaraxaQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsTaraxa([]);
      setPrevDataTaraxa(placeholderplayerData);
      setLoadingTaraxa(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsTaraxa(leaderboard);
    fillRecordsTaraxa(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersTaraxa(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerTaraxa(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setLoadingTaraxa(false);
      }, 1000);
    } else {
      setLoadingTaraxa(false);
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

  const previousWinnersBaseVersionRef = useRef(null);
  const previousWinnersBaseFetchedVersionRef = useRef(null);
  const previousWinnersBaseFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef = useRef(null);

  const previousWinnersBaseQuery = useReactQuery({
    queryKey: ["previousWinnersBase"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersBaseVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsBaseQuery = useReactQuery({
    queryKey: ["dailyRecordsBase"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardBaseDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerBaseQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerBase", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardBaseDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersBase = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataBase(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersBaseFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersBaseFetchingPromiseRef.current &&
      previousWinnersBaseVersionRef.current === version
    ) {
      try {
        await previousWinnersBaseFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersBaseFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersBaseVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersBaseQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataBase(placeholderplayerData);
          return;
        }
        setPrevDataBase(data);
        previousWinnersBaseFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersBaseFetchingPromiseRef.current === fetchPromise) {
          previousWinnersBaseFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersBaseFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerBase = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerBaseQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerBase(false);
          return;
        }
        const [userRecord] = data;
        setUserDataBase(userRecord);
        setActivePlayerBase(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerBaseFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsBase = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsBaseQuery);
    if (!useCache) {
      setloadingBase(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsBaseQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsBase([]);
      setPrevDataBase(placeholderplayerData);
      setloadingBase(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsBase(leaderboard);
    fillRecordsBase(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersBase(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerBase(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingBase(false);
      }, 1000);
    } else {
      setloadingBase(false);
    }
  };

  const fillRecordsVanar = (itemData) => {
    if (itemData.length === 0) {
      setDailyRecordsVanar(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setDailyRecordsVanar(finalData);
    }
  };

  const previousWinnersVanarVersionRef = useRef(null);
  const previousWinnersVanarFetchedVersionRef = useRef(null);
  const previousWinnersVanarFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef = useRef(null);

  const previousWinnersVanarQuery = useReactQuery({
    queryKey: ["previousWinnersVanar"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersVanarVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
      const data = {
        StatisticName: "LeaderboardVanarDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsVanarQuery = useReactQuery({
    queryKey: ["dailyRecordsVanar"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardVanarDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerVanarQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerVanar", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardVanarDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersVanar = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataVanar(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersVanarFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersVanarFetchingPromiseRef.current &&
      previousWinnersVanarVersionRef.current === version
    ) {
      try {
        await previousWinnersVanarFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersVanarFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersVanarVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersVanarQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataVanar(placeholderplayerData);
          return;
        }
        setPrevDataVanar(data);
        previousWinnersVanarFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersVanarFetchingPromiseRef.current === fetchPromise) {
          previousWinnersVanarFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersVanarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerVanar = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerVanarQuery,
          {
            force: forceRefresh,
          }
        );

        if ((error && !fromCache) || !data?.length) {
          setActivePlayerVanar(false);
          return;
        }

        const [userRecord] = data;
        setUserDataVanar(userRecord);
        setActivePlayerVanar(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerVanarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsVanar = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsVanarQuery);
    if (!useCache) {
      setLoadingVanar(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsVanarQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsVanar([]);
      setPrevDataVanar(placeholderplayerData);
      setLoadingVanar(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsVanar(leaderboard);
    fillRecordsVanar(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersVanar(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerVanar(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setLoadingVanar(false);
      }, 1000);
    } else {
      setLoadingVanar(false);
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

  const previousWinnersTaikoVersionRef = useRef(null);
  const previousWinnersTaikoFetchedVersionRef = useRef(null);
  const previousWinnersTaikoFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef = useRef(null);

  const previousWinnersTaikoQuery = useReactQuery({
    queryKey: ["previousWinnersTaiko"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersTaikoVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsTaikoQuery = useReactQuery({
    queryKey: ["dailyRecordsTaiko"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardTaikoDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerTaikoQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerTaiko", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardTaikoDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersTaiko = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataTaiko(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersTaikoFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersTaikoFetchingPromiseRef.current &&
      previousWinnersTaikoVersionRef.current === version
    ) {
      try {
        await previousWinnersTaikoFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersTaikoFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersTaikoVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersTaikoQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataTaiko(placeholderplayerData);
          return;
        }
        setPrevDataTaiko(data);
        previousWinnersTaikoFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersTaikoFetchingPromiseRef.current === fetchPromise) {
          previousWinnersTaikoFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersTaikoFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerTaiko = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerTaikoQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerTaiko(false);
          return;
        }
        const [userRecord] = data;
        setUserDataTaiko(userRecord);
        setActivePlayerTaiko(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerTaikoFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsTaiko = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsTaikoQuery);
    if (!useCache) {
      setloadingTaiko(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsTaikoQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsTaiko([]);
      setPrevDataTaiko(placeholderplayerData);
      setloadingTaiko(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsTaiko(leaderboard);
    fillRecordsTaiko(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersTaiko(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerTaiko(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingTaiko(false);
      }, 1000);
    } else {
      setloadingTaiko(false);
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

  const previousWinnersMatVersionRef = useRef(null);
  const previousWinnersMatFetchedVersionRef = useRef(null);
  const previousWinnersMatFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerMatFetchingPromiseRef = useRef(null);

  const previousWinnersMatQuery = useReactQuery({
    queryKey: ["previousWinnersMat"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersMatVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsMatQuery = useReactQuery({
    queryKey: ["dailyRecordsMat"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardMatchainDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerMatQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerMat", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardMatchainDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersMat = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataMat(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersMatFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersMatFetchingPromiseRef.current &&
      previousWinnersMatVersionRef.current === version
    ) {
      try {
        await previousWinnersMatFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersMatFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersMatVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersMatQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataMat(placeholderplayerData);
          return;
        }
        setPrevDataMat(data);
        previousWinnersMatFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersMatFetchingPromiseRef.current === fetchPromise) {
          previousWinnersMatFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersMatFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerMat = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerMatFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerMatFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerMatQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerMat(false);
          return;
        }
        const [userRecord] = data;
        setUserDataMat(userRecord);
        setActivePlayerMat(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerMatFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerMatFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerMatFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsMat = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsMatQuery);
    if (!useCache) {
      setloadingMat(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsMatQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsMat([]);
      setPrevDataMat(placeholderplayerData);
      setloadingMat(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsMat(leaderboard);
    fillRecordsMat(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersMat(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerMat(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingMat(false);
      }, 1000);
    } else {
      setloadingMat(false);
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

  const previousWinnersSkaleVersionRef = useRef(null);
  const previousWinnersSkaleFetchedVersionRef = useRef(null);
  const previousWinnersSkaleFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef = useRef(null);

  const previousWinnersSkaleQuery = useReactQuery({
    queryKey: ["previousWinnersSkale"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersSkaleVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const dailyRecordsSkaleQuery = useReactQuery({
    queryKey: ["dailyRecordsSkale"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "LeaderboardSkaleDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerSkaleQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayerSkale", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "LeaderboardSkaleDaily",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data.leaderboard || [];
    },
  });

  const fetchPreviousWinnersSkale = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataSkale(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersSkaleFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersSkaleFetchingPromiseRef.current &&
      previousWinnersSkaleVersionRef.current === version
    ) {
      try {
        await previousWinnersSkaleFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersSkaleFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersSkaleVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersSkaleQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataSkale(placeholderplayerData);
          return;
        }
        setPrevDataSkale(data);
        previousWinnersSkaleFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersSkaleFetchingPromiseRef.current === fetchPromise) {
          previousWinnersSkaleFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersSkaleFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerSkale = async (forceRefresh = false) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerSkaleQuery,
          {
            force: forceRefresh,
          }
        );
        if ((error && !fromCache) || !data?.length) {
          setActivePlayerSkale(false);
          return;
        }
        const [userRecord] = data;
        setUserDataSkale(userRecord);
        setActivePlayerSkale(
          (userRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
        );
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerSkaleFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsSkale = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsSkaleQuery);
    if (!useCache) {
      setloadingSkale(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      dailyRecordsSkaleQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsSkale([]);
      setPrevDataSkale(placeholderplayerData);
      setloadingSkale(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setDailyRecordsSkale(leaderboard);
    fillRecordsSkale(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersSkale(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      await fetchDailyRecordsAroundPlayerSkale(forceRefresh);
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingSkale(false);
      }, 1000);
    } else {
      setloadingSkale(false);
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

  const previousWinnersStarVersionRef = useRef(null);
  const previousWinnersStarFetchedVersionRef = useRef(null);
  const previousWinnersStarFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerStarFetchingPromiseRef = useRef(null);
  const fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef = useRef(null);

  const previousWinnersStarQuery = useReactQuery({
    queryKey: ["previousWinnersStar"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersStarVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const recordsStarQuery = useReactQuery({
    queryKey: ["recordsStar"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const recordsAroundPlayerStarQuery = useReactQuery({
    queryKey: ["recordsAroundPlayerStar", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data;
    },
  });

  const fetchPreviousUserDataStar = async (
    version,
    userIdParam,
    forceRefresh = false
  ) => {
    if (version === 0 || !userIdParam) {
      setUserPreviousDataStar([]);
      setUserPreviousDataStar2([]);
      return;
    }

    // Check if we already have the data for this version and userId
    if (
      !forceRefresh &&
      previousUserDataStarFetchedVersionRef.current === version &&
      previousUserDataStarUserRef.current === userIdParam
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version and userId, wait for it
    if (
      previousUserDataStarFetchingPromiseRef.current &&
      previousUserDataStarVersionRef.current === version &&
      previousUserDataStarUserRef.current === userIdParam
    ) {
      try {
        await previousUserDataStarFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (
          previousUserDataStarFetchedVersionRef.current === version &&
          previousUserDataStarUserRef.current === userIdParam
        ) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    previousUserDataStarVersionRef.current = version;
    previousUserDataStarUserRef.current = userIdParam;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousUserDataStarQuery,
          { force: shouldForce }
        );

        if ((error && !fromCache) || !data) {
          setUserPreviousDataStar([]);
          setUserPreviousDataStar2([]);
          return;
        }

        const [previousEntry] = data;
        if (!previousEntry) {
          setUserPreviousDataStar([]);
          setUserPreviousDataStar2([]);
          return;
        }

        setUserPreviousDataStar(previousEntry);
        setUserPreviousDataStar2([]);
        previousUserDataStarFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousUserDataStarFetchingPromiseRef.current === fetchPromise) {
          previousUserDataStarFetchingPromiseRef.current = null;
        }
      }
    })();

    previousUserDataStarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayerStar = async (
    forceRefresh = false,
    leaderboardData = starRecords
  ) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerStarFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerStarFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          recordsAroundPlayerStarQuery,
          {
            force: forceRefresh,
          }
        );

        const aroundData = data?.leaderboard || [];
        const version = data?.version;

        if ((error && !fromCache) || aroundData.length === 0) {
          setActivePlayerStar(false);
          return;
        }

        if (version) {
          fetchPreviousUserDataStar(parseInt(version, 10), userId);
        }

        const [userRecord] = aroundData;
        if (!userRecord) {
          setActivePlayerStar(false);
          return;
        }

        const userPosition = userRecord.position ?? Number.MAX_SAFE_INTEGER;
        setUserDataStar(userRecord);

        if (goldenPassRemainingTime) {
          setDataAmountStar(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99]) +
                  Number(monthlyExtraStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition]) +
                  Number(monthlyExtraStarPrizes[userPosition])
              : 0
          );
        } else {
          setDataAmountStar(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition])
              : 0
          );
        }

        const isUserInLeaderboard = Array.isArray(leaderboardData)
          ? leaderboardData.some((item) => item?.displayName === username)
          : false;

        setActivePlayerStar(isUserInLeaderboard && userPosition <= 99);
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerStarFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerStarFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerStarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchPreviousWinnersStar = async (version, forceRefresh = false) => {
    if (version === 0) {
      setPrevDataStar(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersStarFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersStarFetchingPromiseRef.current &&
      previousWinnersStarVersionRef.current === version
    ) {
      try {
        await previousWinnersStarFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersStarFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersStarVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersStarQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataStar(placeholderplayerData);
          return;
        }
        setPrevDataStar(data);
        previousWinnersStarFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersStarFetchingPromiseRef.current === fetchPromise) {
          previousWinnersStarFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersStarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchExplorerHunt = async (forceRefresh = false) => {
    if (!userId) return;
    const { data, error, fromCache } = await fetchQueryData(explorerHuntQuery, {
      force: forceRefresh,
    });

    if ((error && !fromCache) || !data) {
      setexplorerHuntData([]);
      return;
    }

    setexplorerHuntData(data);
  };

  const fetchGreatCollection = async (forceRefresh = false) => {
    if (!userId) return;
    const { data, error, fromCache } = await fetchQueryData(
      greatCollectionQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      setgreatCollectionData([]);
      return;
    }

    setgreatCollectionData(data);
  };

  const fetchRecordsStar = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(recordsStarQuery);
    if (!useCache) {
      setloadingStarMonthly(true);
    }

    const { data, error, fromCache } = await fetchQueryData(recordsStarQuery, {
      force: forceRefresh,
    });

    if ((error && !fromCache) || !data) {
      fillRecordsStar([]);
      setPrevDataStar(placeholderplayerData);
      setloadingStarMonthly(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setStarRecords(leaderboard);
    fillRecordsStar(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersStar(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId) {
      const testArray = leaderboard.filter(
        (item) => item.displayName === username
      );

      if (testArray.length > 0) {
        setActivePlayerStar(true);
        const userRecord = testArray[0];
        const userPosition = userRecord.position;
        setUserDataStar(userRecord);
        if (goldenPassRemainingTime) {
          setDataAmountStar(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99]) +
                  Number(monthlyExtraStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition]) +
                  Number(monthlyExtraStarPrizes[userPosition])
              : 0
          );
        } else {
          setDataAmountStar(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(monthlyStarPrizes[99])
                : Number(monthlyStarPrizes[userPosition])
              : 0
          );
        }
      } else {
        setActivePlayerStar(false);
        await fetchDailyRecordsAroundPlayerStar(forceRefresh, leaderboard);
      }
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingStarMonthly(false);
      }, 1000);
    } else {
      setloadingStarMonthly(false);
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

  const previousWinnersStarWeeklyVersionRef = useRef(null);
  const previousWinnersStarWeeklyFetchedVersionRef = useRef(null);
  const previousWinnersStarWeeklyFetchingPromiseRef = useRef(null);

  const previousWinnersStarWeeklyQuery = useReactQuery({
    queryKey: ["previousWinnersStarWeekly"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersStarWeeklyVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard;
    },
  });

  const recordsStarWeeklyQuery = useReactQuery({
    queryKey: ["recordsStarWeekly"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "GlobalStarWeeklyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const recordsAroundPlayerStarWeeklyQuery = useReactQuery({
    queryKey: ["recordsAroundPlayerStarWeekly", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "GlobalStarWeeklyLeaderboard",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data;
    },
  });

  const fetchPreviousWinnersStarWeekly = async (
    version,
    forceRefresh = false
  ) => {
    if (version === 0) {
      setPrevDataStarWeekly(placeholderplayerData);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersStarWeeklyFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersStarWeeklyFetchingPromiseRef.current &&
      previousWinnersStarWeeklyVersionRef.current === version
    ) {
      try {
        await previousWinnersStarWeeklyFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersStarWeeklyFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersStarWeeklyVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersStarWeeklyQuery,
          {
            force: shouldForce,
          }
        );
        if ((error && !fromCache) || !data) {
          setPrevDataStarWeekly(placeholderplayerData);
          return;
        }
        setPrevDataStarWeekly(data);
        previousWinnersStarWeeklyFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          previousWinnersStarWeeklyFetchingPromiseRef.current === fetchPromise
        ) {
          previousWinnersStarWeeklyFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersStarWeeklyFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchRecordsStarWeekly = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(recordsStarWeeklyQuery);
    if (!useCache) {
      setloadingStarWeekly(true);
    }

    const { data, error, fromCache } = await fetchQueryData(
      recordsStarWeeklyQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsStarWeekly([]);
      setPrevDataStarWeekly(placeholderplayerData);
      setloadingStarWeekly(false);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setStarRecordsWeekly(leaderboard);
    fillRecordsStarWeekly(leaderboard);

    const version = parseInt(data?.version);
    await fetchPreviousWinnersStarWeekly(
      Number.isNaN(version) ? 0 : version,
      forceRefresh
    );

    if (userId && username && leaderboard) {
      const testArray = leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        setActivePlayerStarWeekly(true);
        const userRecord = testArray[0];
        const userPosition = userRecord.position;
        setUserDataStarWeekly(userRecord);
        if (goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99]) +
                  Number(weeklyExtraStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition]) +
                  Number(weeklyExtraStarPrizes[userPosition])
              : 0
          );
        } else {
          setDataAmountStarWeekly(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition])
              : 0
          );
        }
      } else {
        setActivePlayerStarWeekly(false);
        await fetchWeeklyRecordsAroundPlayerStar(forceRefresh, leaderboard);
      }
    }

    if (!useCache) {
      setTimeout(() => {
        setloadingStarWeekly(false);
      }, 1000);
    } else {
      setloadingStarWeekly(false);
    }
  };

  const fetchWeeklyRecordsAroundPlayerStar = async (
    forceRefresh = false,
    leaderboardData = starRecordsWeekly
  ) => {
    if (!userId) return;

    // If there's already a fetch in progress, wait for it
    if (fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef.current) {
      try {
        await fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          recordsAroundPlayerStarWeeklyQuery,
          {
            force: forceRefresh,
          }
        );

        const aroundData = data?.leaderboard || [];

        if ((error && !fromCache) || aroundData.length === 0) {
          setActivePlayerStarWeekly(false);
          return;
        }

        const [userRecord] = aroundData;
        if (!userRecord) {
          setActivePlayerStarWeekly(false);
          return;
        }

        const userPosition = userRecord.position ?? Number.MAX_SAFE_INTEGER;
        setUserDataStarWeekly(userRecord);

        if (goldenPassRemainingTime) {
          setDataAmountStarWeekly(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99]) +
                  Number(weeklyExtraStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition]) +
                  Number(weeklyExtraStarPrizes[userPosition])
              : 0
          );
        } else {
          setDataAmountStarWeekly(
            userRecord.statValue !== 0
              ? userPosition > 100
                ? 0
                : userPosition === 100
                ? Number(weeklyStarPrizes[99])
                : Number(weeklyStarPrizes[userPosition])
              : 0
          );
        }

        const isUserInLeaderboard = Array.isArray(leaderboardData)
          ? leaderboardData.some((item) => item?.displayName === username)
          : false;

        setActivePlayerStarWeekly(isUserInLeaderboard && userPosition <= 99);
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchWeeklyRecordsAroundPlayerStarFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
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

  const previousWinnersDailyVersionRef = useRef(null);
  const previousWinnersDailyFetchedVersionRef = useRef(null);
  const previousWinnersDailyFetchingPromiseRef = useRef(null);
  const fetchDailyRecordsAroundPlayerFetchingPromiseRef = useRef(null);
  const fetchGenesisAroundPlayerFetchingPromiseRef = useRef(null);

  const previousWinnersDailyQuery = useReactQuery({
    queryKey: ["previousWinnersDaily"],
    enabled: false,
    staleTime: getMillisecondsUntil0030UTC(),
    cacheTime: getMillisecondsUntil0030UTC(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
    queryFn: async () => {
      const version = previousWinnersDailyVersionRef.current;
      if (!version || version === 0) {
        return placeholderplayerData;
      }
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
      return result.data.data.leaderboard ?? [];
    },
  });

  const dailyRecordsQuery = useReactQuery({
    queryKey: ["dailyRecords"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //LEADERBOARD_CACHE_MS,
    queryFn: async () => {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const dailyRecordsAroundPlayerQuery = useReactQuery({
    queryKey: ["dailyRecordsAroundPlayer", userId],
    enabled: Boolean(userId),
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, //userId ? LEADERBOARD_CACHE_MS : false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "DailyLeaderboard",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data.data?.leaderboard ?? [];
    },
  });

  const genesisRecordsQuery = useReactQuery({
    queryKey: ["genesisRecords"],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      const data = {
        StatisticName: "TheGreatCollection",
        StartPosition: 0,
        MaxResultsCount: 100,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );
      return result.data.data;
    },
  });

  const greatCollectionQuery = useReactQuery({
    queryKey: ["greatCollection", userId],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      if (!userId) return [];
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
      return result.data.data?.leaderboard ?? [];
    },
  });

  const explorerHuntQuery = useReactQuery({
    queryKey: ["explorerHunt", userId],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      if (!userId) return [];
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
      return result.data.data?.leaderboard ?? [];
    },
  });

  const previousUserDataStarVersionRef = useRef(null);
  const previousUserDataStarFetchedVersionRef = useRef(null);
  const previousUserDataStarUserRef = useRef(null);
  const previousUserDataStarFetchingPromiseRef = useRef(null);

  const previousUserDataStarQuery = useReactQuery({
    queryKey: ["previousUserDataStar", userId],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      const version = previousUserDataStarVersionRef.current;
      const targetUserId = previousUserDataStarUserRef.current;
      if (!version || version === 0 || !targetUserId) {
        return [];
      }
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        MaxResultsCount: 1,
        Version: version - 1,
        PlayerId: targetUserId,
      };
      const result = await axios.post(
        `https://worldofdypiansutilities.azurewebsites.net/api/GetLeaderboardAroundMe?code=PvuUnNv28vxey5X48EaNidm5E6gN3r6V8wuccb0SLO82AzFukRBaqA==`,
        data
      );
      return result.data?.data?.leaderboard ?? [];
    },
  });

  const fetchPreviousWinners = async (version, forceRefresh = false) => {
    if (version === 0) {
      fillRecordsDaily([]);
      setdailyplayerData([]);
      return;
    }

    // Check if we already have the data for this version
    if (
      !forceRefresh &&
      previousWinnersDailyFetchedVersionRef.current === version
    ) {
      return;
    }

    // If there's already a fetch in progress for the same version, wait for it
    if (
      previousWinnersDailyFetchingPromiseRef.current &&
      previousWinnersDailyVersionRef.current === version
    ) {
      try {
        await previousWinnersDailyFetchingPromiseRef.current;
        // After waiting, check if the version was fetched
        if (previousWinnersDailyFetchedVersionRef.current === version) {
          return;
        }
      } catch (error) {
        // If the previous fetch failed, just stop there
        console.error("Previous fetch failed, stopping:", error);
        return;
      }
    }

    // Start a new fetch
    previousWinnersDailyVersionRef.current = version;

    const fetchPromise = (async () => {
      try {
        const shouldForce = forceRefresh;
        const { data, error, fromCache } = await fetchQueryData(
          previousWinnersDailyQuery,
          { force: shouldForce }
        );

        if ((error && !fromCache) || !data) {
          fillRecordsDaily([]);
          setdailyplayerData([]);
          return;
        }

        fillRecordsDaily(data);
        setdailyplayerData(data);
        previousWinnersDailyFetchedVersionRef.current = version;
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (previousWinnersDailyFetchingPromiseRef.current === fetchPromise) {
          previousWinnersDailyFetchingPromiseRef.current = null;
        }
      }
    })();

    previousWinnersDailyFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecords = async (forceRefresh = false) => {
    const useCache = !forceRefresh && isQueryFresh(dailyRecordsQuery);
    if (!useCache) {
      setloadingBnb(true);
    }

    try {
      const { data, error, fromCache } = await fetchQueryData(
        dailyRecordsQuery,
        {
          force: forceRefresh,
        }
      );

      if ((error && !fromCache) || !data) {
        fillRecords([]);
        setRecords([]);
        return;
      }

      const leaderboard = data?.leaderboard ?? [];
      setRecords(leaderboard);
      fillRecords(leaderboard);

      const version = Number.parseInt(data?.version, 10);
      await fetchPreviousWinners(
        Number.isNaN(version) ? 0 : version,
        forceRefresh
      );

      if (userId) {
        await fetchDailyRecordsAroundPlayer(forceRefresh, leaderboard);
      }
    } catch (error) {
      console.error(error);
      fillRecords([]);
    } finally {
      setloadingBnb(false);
    }
  };

  const fetchGenesisRecords = async (forceRefresh = false) => {
    const { data, error, fromCache } = await fetchQueryData(
      genesisRecordsQuery,
      {
        force: forceRefresh,
      }
    );

    if ((error && !fromCache) || !data) {
      fillRecordsGenesis([]);
      setgenesisData([]);
      setpreviousGenesisVersion(0);
      return;
    }

    const leaderboard = data?.leaderboard ?? [];
    setpreviousGenesisVersion(data?.version ?? 0);
    setgenesisData(leaderboard);
    fillRecordsGenesis(leaderboard);
  };
  // const fetchGenesisPreviousWinners = async (version) => {
  //   if (version !== 0) {
  //     const data = {
  //       StatisticName: "TheGreatCollection",
  //       StartPosition: 0,
  //       MaxResultsCount: 10,
  //       Version: version - 1,
  //     };
  //     const result = await axios.post(
  //       `${backendApi}/auth/GetLeaderboard?Version=-1`,
  //       data
  //     );

  //     setpreviousgenesisData(result.data.data.leaderboard);
  //   }
  // };

  useEffect(() => {
    if (!email) {
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
      setaiQuestionRewards([]);
      setAiQuestionCompleted(false);
      setAiQuestionObjectAnswered({
        question: "",
        options: [],
        id: "",
        userIndex: undefined,
        correctIndex: undefined,
        chain: "",
      });
    }
  }, [email]);

  useEffect(() => {
    if (dataFetchedRef2.current) return;

    fetchGenesisRecords();
    fetchGreatCollection();
    fetchExplorerHunt();
    dataFetchedRef2.current = true;
  }, [userId]);

  useEffect(() => {
    if (
      count !== 0 ||
      (royaltyCount !== 0 && (chainId === 56 || chainId === 204))
    ) {
      getAllChests(email);
    }
  }, [count, royaltyCount, chainId]);

  useEffect(() => {
    if (corecount !== 0) {
      getAllCoreChests(email);
    }
  }, [corecount]);

  useEffect(() => {
    if (skalecount !== 0) {
      getAllSkaleChests(email);
    }
  }, [skalecount]);

  useEffect(() => {
    if (vicitoncount !== 0) {
      getAllVictionChests(email);
    }
  }, [vicitoncount]);

  useEffect(() => {
    if (mantacount !== 0) {
      getAllMantaChests(email);
    }
  }, [mantacount]);

  useEffect(() => {
    if (basecount !== 0) {
      getAllBaseChests(email);
    }
  }, [basecount]);

  useEffect(() => {
    if (taikocount !== 0 || (royaltyCount !== 0 && chainId === 167000)) {
      getAllTaikoChests(email);
    }
  }, [taikocount, royaltyCount, chainId]);
  useEffect(() => {
    if (vanarcount !== 0) {
      getAllVanarChests(email);
    }
  }, [vanarcount]);

  useEffect(() => {
    if (matcount !== 0) {
      getAllMatChests(email);
    }
  }, [matcount]);

  useEffect(() => {
    if (seicount !== 0) {
      getAllSeiChests(email);
    }
  }, [seicount]);

  useEffect(() => {
    if (taraxacount !== 0) {
      getAllTaraxaChests(email);
    }
  }, [taraxacount]);

  useEffect(() => {
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
      loading: loadingStarMonthly || loadingStarWeekly,
    });
  }, [
    starRecords,
    starRecordsWeekly,
    prevDataStar,
    prevDataStarWeekly,
    userDataStar,
    userDataStarWeekly,
    activePlayerStar,
    activePlayerStarWeekly,
    loadingStarMonthly,
    loadingStarWeekly,
    userId,
    username,
  ]);

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
      activePlayerSei,
      activePlayerVanar,
      activePlayerTaraxa,
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
      dispatch(setUserProgress({ primeStars: true }));
    } else {
      dispatch(setUserProgress({ primeStars: false }));
    }
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
    activePlayerSei,
    activePlayerVanar,
    activePlayerTaraxa,
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
        loading: loadingBnb,
      },
    ]);
  }, [dailyrecords, dailyplayerData, userData, activePlayer, loadingBnb]);
  useEffect(() => {
    setAllVanarData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: vanarStars,
        previous_rewards: vanarStars,
        activeData: dailyRecordsVanar,
        previousData: prevDataVanar,
        player_data: userDataVanar,
        is_active: activePlayerVanar,
        loading: loadingVanar,
      },
    ]);
  }, [
    dailyRecordsVanar,
    prevDataVanar,
    userDataVanar,
    activePlayerVanar,
    loadingVanar,
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
        is_active: activePlayerSkale,
        loading: loadingSkale,
      },
    ]);
  }, [
    dailyRecordsSkale,
    userDataSkale,
    activePlayerSkale,
    prevDataSkale,
    loadingSkale,
  ]);

  useEffect(() => {
    setAllCoreData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: coreStars,
        previous_rewards: coreStars,
        activeData: dailyRecordsCore,
        previousData: prevDataCore,
        player_data: userDataCore,
        is_active: activePlayerCore,
        loading: loadingCore,
      },
    ]);
  }, [
    dailyRecordsCore,
    prevDataCore,
    userDataCore,
    activePlayerCore,
    loadingCore,
  ]);

  useEffect(() => {
    setAllVictionData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: matStars,
        previous_rewards: matStars,
        activeData: dailyRecordsViction,
        previousData: prevDataViction,
        player_data: userDataViction,
        is_active: activePlayerViction,
        loading: loadingViction,
      },
    ]);
  }, [
    dailyRecordsViction,
    prevDataViction,
    userDataViction,
    activePlayerViction,
    loadingViction,
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
        is_active: activePlayerManta,
        loading: loadingManta,
      },
    ]);
  }, [
    dailyRecordsManta,
    prevDataManta,
    userDataManta,
    activePlayerManta,
    loadingManta,
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
        is_active: activePlayerSei,
        loading: loadingSei,
      },
    ]);
  }, [dailyRecordsSei, prevDataSei, userDataSei, activePlayerSei, loadingSei]);
  useEffect(() => {
    setAllTaraxaData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: taraxaStars,
        previous_rewards: taraxaStars,
        activeData: dailyRecordsTaraxa,
        previousData: prevDataTaraxa,
        player_data: userDataTaraxa,
        is_active: activePlayerTaraxa,
        loading: loadingTaraxa,
      },
    ]);
  }, [
    dailyRecordsTaraxa,
    prevDataTaraxa,
    userDataTaraxa,
    activePlayerTaraxa,
    loadingTaraxa,
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
        is_active: activePlayerBase,
        loading: loadingBase,
      },
    ]);
  }, [
    dailyRecordsBase,
    prevDataBase,
    userDataBase,
    activePlayerBase,
    loadingBase,
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
        is_active: activePlayerTaiko,
        loading: loadingTaiko,
      },
    ]);
  }, [
    dailyRecordsTaiko,
    prevDataTaiko,
    userDataTaiko,
    activePlayerTaiko,
    loadingTaiko,
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
        is_active: activePlayerMat,
        loading: loadingMat,
      },
    ]);
  }, [dailyRecordsMat, prevDataMat, userDataMat, activePlayerMat, loadingMat]);

  const handleResetRecords = () => {
    setRecords([]);
    setDailyRecordsTaiko([]);
    setDailyRecordsMat([]);
    setDailyRecordsSei([]);
    setDailyRecordsManta([]);
    setDailyRecordsBase([]);
    setDailyRecordsCore([]);
    setDailyRecordsViction([]);
    setDailyRecordsSkale([]);
    setDailyRecordsVanar([]);
    setDailyRecordsTaraxa([]);
  };

  const handleResetRecordsStars = () => {
    setStarRecords([]);
    setStarRecordsWeekly([]);
  };
  const handleFetchRecordsStars = (type) => {
    if (type === "weekly") {
      if (starRecordsWeekly.length === 0) {
        fetchRecordsStarWeekly();
      }
    } else if (type === "monthly") {
      if (starRecords.length === 0) {
        fetchRecordsStar();
      }
    }
  };
  const handleFetchRecords = async (chain) => {
    if (chain === "bnb") {
      if (dailyrecords.length === 0) {
        fetchDailyRecords();
      }
    } else if (chain === "taiko") {
      if (dailyRecordsTaiko.length === 0) {
        fetchDailyRecordsTaiko();
      }
    } else if (chain === "vanar") {
      if (dailyRecordsVanar.length === 0) {
        fetchDailyRecordsVanar();
      }
    } else if (chain === "matchain") {
      if (dailyRecordsMat.length === 0) {
        fetchDailyRecordsMat();
      }
    } else if (chain === "sei") {
      if (dailyRecordsSei.length === 0) {
        fetchDailyRecordsSei();
      }
    } else if (chain === "taraxa") {
      if (dailyRecordsTaraxa.length === 0) {
        fetchDailyRecordsTaraxa();
      }
    } else if (chain === "manta") {
      if (dailyRecordsManta.length === 0) {
        fetchDailyRecordsManta();
      }
    } else if (chain === "base") {
      if (dailyRecordsBase.length === 0) {
        fetchDailyRecordsBase();
      }
    } else if (chain === "core") {
      if (dailyRecordsCore.length === 0) {
        fetchDailyRecordsCore();
      }
    } else if (chain === "viction") {
      if (dailyRecordsViction.length === 0) {
        fetchDailyRecordsViction();
      }
    } else if (chain === "skale") {
      if (dailyRecordsSkale.length === 0) {
        fetchDailyRecordsSkale();
      }
    } else if (chain === "all") {
      if (!hasUserId) {
        return;
      }
      fetchDailyRecordsAroundPlayer(false, dailyrecords);
      fetchDailyRecordsAroundPlayerTaiko(false);
      fetchDailyRecordsAroundPlayerVanar(false);
      fetchDailyRecordsAroundPlayerMat(false);
      fetchDailyRecordsAroundPlayerSei(false);
      fetchDailyRecordsAroundPlayerManta(false);
      fetchDailyRecordsAroundPlayerBase(false);
      fetchDailyRecordsAroundPlayerCore(false);
      fetchDailyRecordsAroundPlayerViction(false);
      fetchDailyRecordsAroundPlayerSkale(false);
      fetchDailyRecordsAroundPlayerStar(false, starRecords);
      fetchWeeklyRecordsAroundPlayerStar(false, starRecordsWeekly);
      fetchDailyRecordsAroundPlayerTaraxa(false);
    }
  };

  const handleSetAvailableTime = (value) => {
    setGoldenPassRemainingTime(value);
  };

  const handleRefreshCountdown700 = async (wallet) => {
    if (wallet) {
      try {
        const purchaseTimestamp = await readContract(wagmiClient, {
          address: golden_pass_address,
          abi: GOLDEN_PASS_ABI,
          functionName: "getTimeOfExpireBuff",
          args: [wallet],
          chainId: 56,
        }).catch((e) => {
          console.error(e);
          return 0;
        });

        const purchaseTimestamp2 = await readContract(wagmiClient, {
          address: golden_pass2_address,
          abi: GOLDEN_PASS_ABI,
          functionName: "getTimeOfExpireBuff",
          args: [wallet],

          chainId: 56,
        }).catch((e) => {
          console.error(e);
          return 0;
        });

        const today = new Date();

        if (today.getTime() <= Number(purchaseTimestamp) * 1000) {
          handleSetAvailableTime(purchaseTimestamp);
        }
        if (today.getTime() <= Number(purchaseTimestamp2) * 1000) {
          handleSetAvailableTime(purchaseTimestamp2);
        }
      } catch (e) {
        console.error("Error refreshing countdown:", e);
      }
    }
  };

  const countUserDailyBundles = async (address) => {
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
  };

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const onOpenNfts = () => {
    setShowNfts(!showNfts);
  };

  //land only stakes
  const getStakesIdsWod = async () => {
    const address = coinbase;
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.landnftstake_address,
        abi: window.LANDSTAKING_ABI,
        functionName: "depositsOf",
        args: [address],
        chainId: 1,
      });

      let stakenft_cawsWod = [];
      for (let i = 0; i < result.length; i++) {
        stakenft_cawsWod.push(parseInt(result[i]));
      }
      return stakenft_cawsWod;
    } catch (e) {
      console.error("Error getting WOD stakes:", e);
      return [];
    }
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
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.wod_caws_address,
        abi: window.WOD_CAWS_ABI,
        functionName: "depositsOf",
        args: [address],
        chainId: 1,
      });

      let stakenft_cawsWod = [];
      for (let i = 0; i < result.length; i++) {
        stakenft_cawsWod.push(parseInt(result[i]));
      }
      return stakenft_cawsWod;
    } catch (e) {
      console.error("Error getting CAWS WOD stakes:", e);
      return [];
    }
  };

  const getWodStakesIdsCawsWod = async () => {
    const address = coinbase;
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.wod_caws_address,
        abi: window.WOD_CAWS_ABI,
        functionName: "depositsOfWoD",
        args: [address],
        chainId: 1,
      });

      let stakenft_cawsWod = [];
      for (let i = 0; i < result.length; i++) {
        stakenft_cawsWod.push(parseInt(result[i]));
      }
      return stakenft_cawsWod;
    } catch (e) {
      console.error("Error getting WOD CAWS stakes:", e);
      return [];
    }
  };

  const getCawsStakesIds = async (address) => {
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.nft_caws_premiumstake_address,
        abi: window.CAWSPREMIUM_ABI,
        functionName: "depositsOf",
        args: [address],
        chainId: 1,
      });

      let stakenft = [];
      for (let i = 0; i < result.length; i++) {
        stakenft.push(parseInt(result[i]));
      }
      return stakenft;
    } catch (e) {
      console.error("Error getting CAWS premium stakes:", e);
      return [];
    }
  };

  const getLandPremiumStakesIds = async (address) => {
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.nft_land_premiumstake_address,
        abi: window.LANDPREMIUM_ABI,
        functionName: "depositsOf",
        args: [address],
        chainId: 1,
      });

      let stakenft = [];
      for (let i = 0; i < result.length; i++) {
        stakenft.push(parseInt(result[i]));
      }
      return stakenft;
    } catch (e) {
      console.error("Error getting Land premium stakes:", e);
      return [];
    }
  };

  const calculateAllRewardsCawsPremium = async (address) => {
    try {
      let myStakes = await getCawsStakesIds(address);
      let result = 0;

      if (address !== null && myStakes && myStakes.length > 0) {
        const calculateRewards = await readContract(wagmiClient, {
          address: window.config.nft_caws_premiumstake_address,
          abi: window.CAWSPREMIUM_ABI,
          functionName: "calculateRewards",
          args: [address, myStakes],
          chainId: 1,
        });

        for (let i = 0; i < calculateRewards.length; i++) {
          const rewardInEth = Number(calculateRewards[i]) / 1e18;
          result = result + rewardInEth;
        }
      }
      setcawsPremiumRewards(result);
    } catch (e) {
      console.error("Error calculating CAWS premium rewards:", e);
      setcawsPremiumRewards(0);
    }
  };

  const calculateAllRewardsLandPremium = async (address) => {
    try {
      let myStakes = await getLandPremiumStakesIds(address);
      let result = 0;

      if (address !== null && myStakes && myStakes.length > 0) {
        const calculateRewards = await readContract(wagmiClient, {
          address: window.config.nft_land_premiumstake_address,
          abi: window.LANDPREMIUM_ABI,
          functionName: "calculateRewards",
          args: [address, myStakes],
          chainId: 1,
        });

        for (let i = 0; i < calculateRewards.length; i++) {
          const rewardInEth = Number(calculateRewards[i]) / 1e18;
          result = result + rewardInEth;
        }
      }
      setlandPremiumRewards(result);
    } catch (e) {
      console.error("Error calculating Land premium rewards:", e);
      setlandPremiumRewards(0);
    }
  };

  const genesisAroundPlayerQuery = useReactQuery({
    queryKey: ["genesisAroundPlayer", userId],
    enabled: false,
    staleTime: LEADERBOARD_CACHE_MS,
    cacheTime: 5 * LEADERBOARD_CACHE_MS,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      if (!userId) return [];
      const data = {
        StatisticName: "GenesisLandRewards",
        MaxResultsCount: 1,
        PlayerId: userId,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      return result.data?.data?.leaderboard ?? [];
    },
  });

  const fetchGenesisAroundPlayer = async (forceRefresh = false) => {
    if (!userId) {
      setGenesisRank2(0);
      return;
    }

    // If there's already a fetch in progress, wait for it
    if (fetchGenesisAroundPlayerFetchingPromiseRef.current) {
      try {
        await fetchGenesisAroundPlayerFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          genesisAroundPlayerQuery,
          { force: forceRefresh }
        );

        const aroundData = Array.isArray(data) ? data : [];

        if ((error && !fromCache) || aroundData.length === 0) {
          setGenesisRank2(0);
          return;
        }

        const matchingEntry =
          aroundData.find((item) => item?.displayName === username) ||
          aroundData[0];

        setGenesisRank2(matchingEntry?.statValue ?? 0);
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchGenesisAroundPlayerFetchingPromiseRef.current === fetchPromise
        ) {
          fetchGenesisAroundPlayerFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchGenesisAroundPlayerFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
  };

  const fetchDailyRecordsAroundPlayer = async (
    forceRefresh = false,
    leaderboardData = dailyrecords
  ) => {
    if (!userId) {
      setActivePlayer(false);
      setUserData({});
      return;
    }

    // If there's already a fetch in progress, wait for it
    if (fetchDailyRecordsAroundPlayerFetchingPromiseRef.current) {
      try {
        await fetchDailyRecordsAroundPlayerFetchingPromiseRef.current;
        return;
      } catch (error) {
        // If the previous fetch failed, continue with a new fetch
        console.error("Previous fetch failed, retrying:", error);
      }
    }

    // Start a new fetch
    const fetchPromise = (async () => {
      try {
        const { data, error, fromCache } = await fetchQueryData(
          dailyRecordsAroundPlayerQuery,
          { force: forceRefresh }
        );

        const aroundData = Array.isArray(data) ? data : [];

        if ((error && !fromCache) || aroundData.length === 0) {
          const fallbackRecord = Array.isArray(leaderboardData)
            ? leaderboardData.find((entry) => entry?.displayName === username)
            : undefined;

          if (fallbackRecord) {
            setUserData(fallbackRecord);
            setActivePlayer(
              (fallbackRecord?.position ?? Number.MAX_SAFE_INTEGER) <= 99
            );
            return;
          }

          setActivePlayer(false);
          return;
        }

        const [userRecord] = aroundData;
        if (!userRecord) {
          setActivePlayer(false);
          return;
        }

        setUserData(userRecord);

        const userPosition = userRecord?.position ?? Number.MAX_SAFE_INTEGER;
        const isUserInLeaderboard = Array.isArray(leaderboardData)
          ? leaderboardData.some((entry) => entry?.displayName === username)
          : true;

        setActivePlayer(isUserInLeaderboard && userPosition <= 99);
      } finally {
        // Clear the promise ref if this is still the current fetch
        if (
          fetchDailyRecordsAroundPlayerFetchingPromiseRef.current ===
          fetchPromise
        ) {
          fetchDailyRecordsAroundPlayerFetchingPromiseRef.current = null;
        }
      }
    })();

    fetchDailyRecordsAroundPlayerFetchingPromiseRef.current = fetchPromise;
    await fetchPromise;
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
          claimedVanarChests + claimedVanarPremiumChests < 20 ||
          claimedMatChests + claimedMatPremiumChests < 20 ||
          claimedSeiChests + claimedSeiPremiumChests < 20 ||
          claimedTaraxaChests + claimedTaraxaPremiumChests < 20
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
          claimedVanarChests + claimedVanarPremiumChests === 20 &&
          claimedMatChests + claimedMatPremiumChests === 20 &&
          claimedSeiChests + claimedSeiPremiumChests === 20 &&
          claimedTaraxaChests + claimedTaraxaPremiumChests === 20
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
          claimedVanarChests < 10 ||
          claimedMatChests < 10 ||
          claimedSeiChests < 10 ||
          claimedTaraxaChests < 10
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
          claimedVanarChests === 10 &&
          claimedMatChests === 10 &&
          claimedSeiChests === 10 &&
          claimedTaraxaChests === 10
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
            if (chestOrder[item].chestId === 99) {
              setRoyalChestIndex(item);
              if (chestOrder[item].isOpened === true) {
                onOpenRoyaltyChest(chestOrder[item]);
              }
            }
            if (chestOrder[item].chestType === "Standard") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
              openedChests.push(chestOrder[item]);
              openedStandardChests.push(chestOrder[item]);
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              openedChests.push(chestOrder[item]);
              openedPremiumChests.push(chestOrder[item]);
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
              if (chestOrder[item].chestId === 99) {
                setRoyalChestIndexTaiko(item);
                if (chestOrder[item].isOpened === true) {
                  onOpenRoyaltyChestTaiko(chestOrder[item]);
                }
              }
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
  const getAllVanarChests = async (userEmail) => {
    if (userEmail) {
      const emailData = { emailAddress: userEmail, chainId: "vanar" };

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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
              standardChestsArray.push(chestOrder[item]);
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
              }
              premiumChestsArray.push(chestOrder[item]);
            }
          }
          setOpenedVanarChests(openedChests);
          setclaimedVanarChests(openedStandardChests.length);
          setclaimedVanarPremiumChests(openedPremiumChests.length);
          setallVanarChests(chestOrder);
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
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
            } else if (chestOrder[item].chestType === "Premium") {
              if (chestOrder[item].isOpened === true) {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
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
              openedChests.push(chestOrder[item]);
              openedStandardChests.push(chestOrder[item]);
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              openedChests.push(chestOrder[item]);
              openedPremiumChests.push(chestOrder[item]);
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
  const getAllTaraxaChests = async (userEmail) => {
    const emailData = { emailAddress: userEmail, chainId: "taraxa" };

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
              openedChests.push(chestOrder[item]);
              openedStandardChests.push(chestOrder[item]);
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              openedChests.push(chestOrder[item]);
              openedPremiumChests.push(chestOrder[item]);
            }
            premiumChestsArray.push(chestOrder[item]);
          }
        }
        setOpenedTaraxaChests(openedChests);

        setclaimedTaraxaChests(openedStandardChests.length);
        setclaimedTaraxaPremiumChests(openedPremiumChests.length);
        setallTaraxaChests(chestOrder);
      }
    }
  };

  const getAIQuestionRewardStatus = async (email) => {
    const data = {
      emailAddress: email,
      chainId: "bnb",
    };
    const result = await axios
      .post(
        `https://worldofdypiansdailybonus.azurewebsites.net/api/GetDailyQuestionAnswer?code=YaQr78883ptswtmsk4Oyfl3QK_ni3SN2E5okDerTxsxwAzFurSAsvQ==`,
        data
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data.status === "Success") {
        setaiQuestionRewards(result.data.reward);
      }
    } else {
      const data = {
        emailAddress: email,
        chainId: "opbnb",
      };
      const result = await axios
        .post(
          `https://worldofdypiansdailybonus.azurewebsites.net/api/GetDailyQuestionAnswer?code=YaQr78883ptswtmsk4Oyfl3QK_ni3SN2E5okDerTxsxwAzFurSAsvQ==`,
          data
        )
        .catch((e) => {
          console.error(e);
        });

      if (result && result.status === 200) {
        if (result.data.status === "Success") {
          setaiQuestionRewards(result.data.reward);
        }
      }
    }
  };

  const getAIQuestionStatus = async (wallet, email) => {
    const result = await axios
      .get(
        `https://api.worldofdypians.com/api/qa/profile?walletAddress=${wallet}&email=${email}`
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      const today = new Date();

      const isToday = result.data.alreadyAnsweredToday;

      const todayObj = result.data.todayResult;

      if (
        todayObj &&
        todayObj.correct === true &&
        todayObj.userIndex === todayObj.correctIndex
      ) {
        getAIQuestionRewardStatus(email);
      }
      if (isToday === true) {
        const cleanedAnswers = todayObj.answers.map((answer) =>
          answer.replace(/^[A-D][.)]\s*/, "")
        );

        setAiQuestionObjectAnswered({
          question: todayObj.questionText,
          options: cleanedAnswers,
          id: "",
          userIndex: todayObj.userIndex,
          correctIndex: todayObj.correctIndex,
          chain: todayObj.chain,
        });
        setAiQuestionCompleted(true);
      }

      //   if (result.data.totalAnswered > 0) {
      //     getAIQuestion(chainId === 204 ? "opbnb" : "bnb", wallet);
      //   }
    }
  };

  const checkAnswerTimeout = async () => {
    const data = {
      walletAddress: coinbase,
      email: email,
      chain: chainId === 56 ? "bnb" : "opbnb",
      questionId: aiQuestionObject2.id,
      answerIndex: 4,
    };

    const result = await axios
      .post(`https://api.worldofdypians.com/api/qa/answer`, data)
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      console.log(result.data);
      getAIQuestionStatus(coinbase, email);
    }
  };

  const handleShowSyncModal = () => {
    onSyncClick();
  };

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
  // Fallback local fetching when parent does not provide NFTs

  const windowSize = useWindowSize();

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

  const getTreasureChestsInfo = async () => {
    // Recompute from zero to avoid accumulating and reduce unnecessary updates
    let temp = {
      bnb: 0,
      skale: 0,
      core: 0,
      viction: 0,
      manta: 0,
      base: 0,
      taiko: 0,
      vanar: 0,
      mat: 0,
      sei: 0,
      taraxa: 0,
    };

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
                temp.bnb += Number(innerChest.reward);
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
                temp.skale += Number(innerChest.reward);
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
                temp.core += Number(innerChest.reward);
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
                temp.viction += Number(innerChest.reward);
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
                temp.manta += Number(innerChest.reward);
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
                temp.base += Number(innerChest.reward);
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
                temp.taiko += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }
    if (openedVanarChests && openedVanarChests.length > 0) {
      openedVanarChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                temp.vanar += Number(innerChest.reward);
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
                temp.mat += Number(innerChest.reward);
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
                temp.sei += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }
    if (openedTaraxaChests && openedTaraxaChests.length > 0) {
      openedTaraxaChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                temp.taraxa += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    // Update state only when values actually changed
    setTreasureRewardMoney((prev) => {
      const equal =
        prev.bnb === temp.bnb &&
        prev.skale === temp.skale &&
        prev.core === temp.core &&
        prev.viction === temp.viction &&
        prev.manta === temp.manta &&
        prev.base === temp.base &&
        prev.taiko === temp.taiko &&
        prev.vanar === temp.vanar &&
        prev.mat === temp.mat &&
        prev.sei === temp.sei &&
        prev.taraxa === temp.taraxa;
      return equal ? prev : temp;
    });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setDummyPremiumChests(shuffle(dummyPremiums));
    document.title = "WOD Account";

    window.scrollTo(0, 0);

    // fetchGenesisRecords();

    // fetchGreatCollection();
    // fetchExplorerHunt();
  }, []);

  useEffect(() => {
    if (userWallet && chainId === 1 && window.WALLET_TYPE !== "") {
      calculateAllRewardsCawsPremium(userWallet);
      calculateAllRewardsLandPremium(userWallet);
    }
  }, [userWallet, chainId]);

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
    claimedTaraxaChests,
    claimedTaraxaPremiumChests,
    claimedTaikoChests,
    claimedTaikoPremiumChests,
    claimedVanarChests,
    claimedVanarPremiumChests,
    claimedMatChests,
    claimedMatPremiumChests,
  ]);

  useEffect(() => {
    if (userWallet !== undefined && email !== undefined && email !== "") {
      // getUserRewardData(userWallet);
      getAIQuestionStatus(userWallet, email);
    }
  }, [userWallet, email]);

  useEffect(() => {
    if (authToken && email && isConnected && !isTokenExpired) {
      fetchUserFavorites(userWallet ? userWallet : coinbase);
    }
  }, [coinbase, userWallet, isConnected, authToken, email, isTokenExpired]);

  // Update Redux store with user progress data whenever the data changes
  useEffect(() => {
    if (
      userData ||
      userDataSkale ||
      userDataCore ||
      userDataViction ||
      userDataManta ||
      userDataBase ||
      userDataTaiko ||
      userDataMat ||
      userDataSei ||
      userDataVanar ||
      userDataTaraxa ||
      userDataStar
    ) {
      updateUserProgressInRedux();
    }
  }, [
    userData,
    userDataSkale,
    userDataCore,
    userDataViction,
    userDataManta,
    userDataBase,
    userDataTaiko,
    userDataMat,
    userDataSei,
    userDataVanar,
    userDataTaraxa,
    userDataStar,
    userDataStarWeekly,
    isPremium,
    primeStars,
  ]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true ||
      globalLeaderboard === true ||
      genesisLeaderboard === true ||
      showDailyQuestion === true ||
      booster === true
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
    showDailyQuestion,
    booster,
  ]);

  const logoutItem = localStorage.getItem("logout");

  useEffect(() => {
    if (email && userWallet) {
      getAllSkaleChests(email);
      getAllChests(email);
      // getAIQuestionRewardStatus(email);
      getAllCoreChests(email);
      getAllVictionChests(email);
      getAllMantaChests(email);
      getAllBaseChests(email);
      getAllTaikoChests(email);
      getAllVanarChests(email);
      getAllMatChests(email);
      getAllSeiChests(email);
      getAllTaraxaChests(email);
    }
  }, [email, userWallet]);

  useEffect(() => {
    handleRefreshCountdown700(
      email ? userWallet : isConnected ? coinbase : window.config.ZERO_ADDRESS
    );
  }, [coinbase, isConnected, email, userWallet]);

  // Wallet modal visibility is globally managed via Redux in App.

  useEffect(() => {
    if (dailyBonusPopup || closePopup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup, closePopup]);

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
    openedVanarChests,
    openedTaraxaChests,
  ]);

  useEffect(() => {
    if (effectRan2.current) return;
    if (userId !== undefined && userId !== null) {
      fetchGenesisAroundPlayer(false);
      fetchDailyRecordsAroundPlayerStar(false, []);
      fetchWeeklyRecordsAroundPlayerStar(false, []);
      effectRan2.current = true;
    }
  }, [userId, goldenPassRemainingTime]);

  useEffect(() => {
    if (effectRan.current) return;
    if (userId !== undefined && userId !== null) {
      fetchDailyRecordsAroundPlayer(false, []);
      fetchDailyRecordsAroundPlayerBase(false, []);
      fetchDailyRecordsAroundPlayerCore(false, []);
      fetchDailyRecordsAroundPlayerManta(false, []);
      fetchDailyRecordsAroundPlayerSei(false, []);
      fetchDailyRecordsAroundPlayerTaiko(false, []);
      fetchDailyRecordsAroundPlayerVanar(false, []);
      fetchDailyRecordsAroundPlayerMat(false, []);
      fetchDailyRecordsAroundPlayerViction(false, []);
      fetchDailyRecordsAroundPlayerSkale(false, []);
      fetchDailyRecordsAroundPlayerTaraxa(false, []);
      effectRan.current = true;
    }
  }, [userId]);

  useEffect(() => {
    if (hashValue === "#prime") {
      navigate("/account/prime");
    }

    if (hashValue === "#global-leaderboard") {
      fetchRecordsStarWeekly();
      setleaderboardBtn("weekly");
    }
  }, [hashValue]);

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
        {bannedEmails.includes(email) && (
          <div className="custom-container mt-5 mt-lg-0">
            <div className="banned-account-wrapper w-100 px-2 py-3 mt-5 mt-lg-2 d-flex align-items-center justify-content-center">
              <h6 className="banned-account-message mb-0 text-white text-center">
                This account has been banned permanently. Check your email for
                more information.
              </h6>
            </div>
          </div>
        )}
        {location.pathname === "/account" ||
        location.pathname.includes("/account/challenges") ? (
          <>
            <MyProfile
              onOpenBooster={() => setBooster(true)}
              openKickstarter={openKickstarter}
              aiQuestionCompleted={aiQuestionCompleted}
              greatCollectionData={greatCollectionData}
              explorerHuntData={explorerHuntData}
              isgoldenPassActive={goldenPassRemainingTime}
              userActiveEvents={userTreasureHuntStats.userEvents}
              beastSiegeStatus={beastSiegeStatus}
              puzzleMadnessTimer={puzzleMadnessTimer}
              onGoldenpassClick={() => setgoldenPassPopup(true)}
              onDailyQuestionClick={() => {
                setShowDailyQuestion(true);
              }}
              onShowRankPopup={() => {
                handleFetchRecords("all");
              }}
              onCloseRankPopup={() => {
                handleResetRecords();
                handleResetRecordsStars();
              }}
              allClaimedChests={
                openedBaseChests.length +
                openedChests.length +
                openedCoreChests.length +
                openedMantaChests.length +
                openedSeiChests.length +
                openedTaraxaChests.length +
                openedSkaleChests.length +
                openedTaikoChests.length +
                openedVanarChests.length +
                openedMatChests.length +
                openedVictionChests.length
              }
              allClaimedChestsPremium={
                claimedBasePremiumChests +
                claimedCorePremiumChests +
                claimedMantaPremiumChests +
                claimedSeiPremiumChests +
                claimedTaraxaPremiumChests +
                claimedMatPremiumChests +
                claimedTaikoPremiumChests +
                claimedVanarPremiumChests +
                claimedVictionPremiumChests +
                claimedSkalePremiumChests +
                claimedPremiumChests
              }
              allClaimedChestsstd={
                claimedBaseChests +
                claimedCoreChests +
                claimedMantaChests +
                claimedSeiChests +
                claimedTaraxaChests +
                claimedMatChests +
                claimedTaikoChests +
                claimedVanarChests +
                claimedVictionChests +
                claimedSkaleChests +
                claimedChests
              }
              userDailyBundles={userDailyBundles}
              treasureRewardMoney={totalDailyBonusSum}
              totalTreasureHuntUsd={totalTreasureHuntUsd}
              canBuy={canBuy}
              email={email}
              username={username}
              isPremium={isPremium}
              address={userWallet}
              coinbase={coinbase}
              // totalScore={userTotalScore}
              openChainsLeaderboard={() => setLeaderboard(true)}
              openGlobalLeaderboard={() => {
                setGlobalLeaderboard(true);
                handleFetchRecordsStars("weekly");
              }}
              openGenesisLeaderboard={() => setGenesisLeaderboard(true)}
              openMyRewards={() => setmyRewardsPopup(true)}
              openDailyBonus={() => setdailyBonusPopup(true)}
              openPortfolio={() => setPortfolio(true)}
              openSpecialRewards={() => setSpecialRewardsPopup(true)}
              isConnected={isConnected}
              onConnectWallet={handleConnect}
              liveRewards={
                Number(userSocialRewardsCached) +
                Number(genesisRank2) +
                Number(dataAmountStar) +
                Number(dataAmountStarWeekly) +
                Number(cawsPremiumRewards) +
                Number(landPremiumRewards) +
                (claimedMoneyReward ? Number(claimedMoneyReward.reward) : 0)
                // Number(mantaEarnUsd) +
                // Number(seiEarnUsd) +

                // Number(coingeckoEarnUsd) +
                // Number(matEarnUsd) +
                // Number(bnbEarnUsd) +

                // Number(chainlinkEarnUsd)
              }
              specialRewards={userSocialRewardsCached}
              syncStatus={syncStatus}
              onSyncClick={handleShowSyncModal}
              onEventCardClick={() => {
                seteventCardCount(eventCardCount + 1);
              }}
              onLinkWallet={onManageLogin}
            />
            <NewEvents
              isEOA={isEOA}
              events={treasureHuntEvents}
              onEventClick={(value) => {
                setselectedEvent(value);
                setshowEventPopup(true);
              }}
              onConnectWallet={() => {
                handleConnect();
              }}
              wodBalance={wodBalance}
              setPuzzleMadnessTimer={setPuzzleMadnessTimer}
              greatCollectionData={greatCollectionData}
              explorerHuntData={explorerHuntData}
              availableTime={goldenPassRemainingTime}
              coinbase={coinbase}
              wallet={userWallet}
              chainId={chainId}
              selectedEvent={eventId}
              eventCardCount={eventCardCount}
              email={email}
              isConnected={isConnected}
              setBeastSiegeStatus={setBeastSiegeStatus}
              genesisUsd={genesisRank2}
              walletClient={walletClient}
              publicClient={publicClient}
              network_matchain={network_matchain}
            />
          </>
        ) : location.pathname === "/account/prime" ? (
          <GetPremiumPopup
            isEOA={isEOA}
            chainId={chainId}
            coinbase={coinbase}
            isPremium={isPremium}
            handleSwitchNetwork={handleSwitchNetwork}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            onSuccessDeposit={() => {
              onSuccessDeposit();
            }}
            isConnected={isConnected}
            walletClient={walletClient}
            publicClient={publicClient}
            network_matchain={network_matchain}
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
            username={username}
            openKickstarter={openKickstarter}
            isPremium={isPremium}
            bnbImages={bnbImages}
            skaleImages={skaleImages}
            seiImages={seiImages}
            victionImages={victionImages}
            mantaImages={mantaImages}
            baseImages={baseImages}
            taikoImages={taikoImages}
            matImages={matImages}
            taraxaImages={taraxaImages}
            coreImages={coreImages}
            chainId={chainId}
            ethTokenData={ethTokenData}
            handleSwitchChain={handleSwitchChain}
            handleSwitchNetwork={handleSwitchNetwork}
            listedNFTS={dailyBonuslistedNFTS}
            onclose={() => {
              setdailyBonusPopup(false);
              window.location.hash = "";
            }}
            onConnectWallet={() => {
              handleConnect();
            }}
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
            claimedVanarChests={claimedVanarChests}
            claimedVanarPremiumChests={claimedVanarPremiumChests}
            claimedMatChests={claimedMatChests}
            claimedMatPremiumChests={claimedMatPremiumChests}
            claimedSeiChests={claimedSeiChests}
            claimedSeiPremiumChests={claimedSeiPremiumChests}
            claimedTaraxaChests={claimedTaraxaChests}
            claimedTaraxaPremiumChests={claimedTaraxaPremiumChests}
            email={email}
            openedChests={openedChests}
            openedSkaleChests={openedSkaleChests}
            openedCoreChests={openedCoreChests}
            openedVictionChests={openedVictionChests}
            openedMantaChests={openedMantaChests}
            openedBaseChests={openedBaseChests}
            openedTaikoChests={openedTaikoChests}
            openedVanarChests={openedVanarChests}
            openedMatChests={openedMatChests}
            openedSeiChests={openedSeiChests}
            openedTaraxaChests={openedTaraxaChests}
            address={userWallet}
            allChests={allChests}
            allSkaleChests={allSkaleChests}
            allCoreChests={allCoreChests}
            allVictionChests={allVictionChests}
            allMantaChests={allMantaChests}
            allBaseChests={allBaseChests}
            allTaikoChests={allTaikoChests}
            allVanarChests={allVanarChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            allTaraxaChests={allTaraxaChests}
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
            onVanarChestClaimed={() => {
              setVanarcount(vanarcount + 1);
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
            onTaraxaChestClaimed={() => {
              settaraxacount(taraxacount + 1);
            }}
            dummypremiumChests={dummypremiumChests}
            // premiumTxHash={premiumTxHash}
            // selectedChainforPremium={selectedChainforPremium}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            walletClient={walletClient}
            publicClient={publicClient}
            network_matchain={network_matchain}
          />
          // </OutsideClickHandler>
        )}

        {(leaderboard || hashValue === "#leaderboard") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setLeaderboard(false);
              window.location.hash = "";
              handleResetRecords();
            }}
          >
            <div
              className="popup-wrapper leaderboard-popup popup-active p-3"
              id="leaderboard"
              style={{ width: "55%", pointerEvents: "auto" }}
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
                    handleResetRecords();
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <NewLeaderBoard
                username={username}
                userId={userId}
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
                allTaraxaData={allTaraxaData}
                allVanarData={allVanarData}
                dailyplayerData={dailyplayerData}
                genesisData={genesisData}
                onPremiumClick={() => {
                  setLeaderboard(false);
                  handleResetRecords();

                  window.location.hash = "";
                }}
                onFetchRecords={(value) => {
                  handleFetchRecords(value);
                }}
                onGoldenpassClick={() => {
                  setgoldenPassPopup(true);
                  handleResetRecords();
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

        {/* Wallet modal handled at App level */}

        {(genesisLeaderboard ||
          hashValue === "#great-collection-leaderboard") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setGenesisLeaderboard(false);
              window.location.hash = "";
            }}
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
                  onClick={() => {
                    setGenesisLeaderboard(false);
                    window.location.hash = "";
                  }}
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
        {(globalLeaderboard || hashValue === "#global-leaderboard") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setGlobalLeaderboard(false);
              handleResetRecordsStars();
              window.location.hash = "";
            }}
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
                  onClick={() => {
                    setGlobalLeaderboard(false);
                    handleResetRecordsStars();
                    window.location.hash = "";
                  }}
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
                    handleFetchRecordsStars("weekly");
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
                    handleFetchRecordsStars("monthly");
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
              />
            </div>
          </OutsideClickHandler>
        )}

        {(booster || hashValue === "#booster-1001") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setBooster(false);
              window.location.hash = "";
            }}
          >
            <div className="popup-wrapper booster-popup popup-active p-3">
              <div className="d-flex align-items-center justify-content-end">
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => {
                    setBooster(false);
                    window.location.hash = "";
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <BoosterPopup
                userDataStar={
                  !userDataStar?.statValue || userDataStar?.statValue === 0
                    ? 0
                    : userDataStar.position
                    ? userDataStar.position + 1
                    : 0
                }
                userPreviousDataStar={
                  !userPreviousDataStar?.StatValue ||
                  userPreviousDataStar?.StatValue === 0
                    ? 0
                    : userPreviousDataStar.Position !== undefined
                    ? userPreviousDataStar.Position + 1
                    : 0
                }
                userPreviousDataStar2={
                  !userPreviousDataStar2?.StatValue ||
                  userPreviousDataStar2?.StatValue === 0
                    ? 0
                    : userPreviousDataStar2.Position !== undefined
                    ? userPreviousDataStar2.Position + 1
                    : 0
                }
              />
            </div>
          </OutsideClickHandler>
        )}

        {(goldenPassPopup ||
          eventId === "golden-pass" ||
          hashValue === "#golden-pass") && (
          <GoldenPassPopup
            onClosePopup={() => {
              setgoldenPassPopup(false);
              // handleClosePopup();
              window.location.hash = "";
            }}
            onConnectWallet={() => {
              handleConnect();
              setgoldenPassPopup(false);
              handleClosePopup();
              window.location.hash = "";
            }}
            isConnected={isConnected}
            coinbase={coinbase}
            chainId={chainId}
            wallet={userWallet}
            walletClient={walletClient}
            publicClient={publicClient}
            isEOA={isEOA}
            onSuccessDeposit={() => {
              handleRefreshCountdown700(coinbase);
            }}
            goldenPassRemainingTime={goldenPassRemainingTime}
            email={email}
          />
        )}

        {(myRewardsPopup || hashValue === "#my-rewards") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setmyRewardsPopup(false);
              window.location.hash = "";
            }}
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
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  onClick={() => {
                    setmyRewardsPopup(false);
                    window.location.hash = "";
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
              <MyRewardsPopupNew
                userTreasureHuntStats={userTreasureHuntStats}
                totalTreasureHuntUsd={totalTreasureHuntUsd}
                address={userWallet}
                email={email}
                userDataStar={dataAmountStar}
                userDataStarWeekly={dataAmountStarWeekly}
                treasureRewardMoney={treasureRewardMoney}
                totalDailyBonusSum={totalDailyBonusSum}
                userSocialRewards={userSocialRewards}
                cawsPremiumRewards={cawsPremiumRewards}
                landPremiumRewards={landPremiumRewards}
                genesisRank2={genesisRank2}
                aiQuestionRewards={
                  claimedMoneyReward ? Number(claimedMoneyReward.reward) : 0
                }
              />
            </div>
          </OutsideClickHandler>
        )}

        {(showDailyQuestion || hashValue === "#daily-question") && (
          // <OutsideClickHandler
          //   onOutsideClick={() => setShowDailyQuestion(false)}
          // >
          // <div
          //   className="popup-wrapper popup-active p-4 ai-question-outer-wrapper d-flex flex-column"
          //   id="aiQuestion"
          //   style={{
          //     minHeight: "460px",
          //     pointerEvents: "auto",
          //     overflowX: "auto",
          //     width: "460px",
          //   }}
          // >
          <div className={`package-popup-wrapper2 `}>
            <div
              className={`new-daily-bonus-popup overflow-visible d-flex flex-column gap-2 custom-container-width2 justify-content-center`}
            >
              <div className="ai-question-outer-wrapper custom-container-width2 position-relative p-lg-5 p-3 d-flex">
                <div className="ai-question-header-wrapper">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/ai-question-header-img2.webp"
                    }
                    className="ai-question-header-img"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between w-100 ai-popup-x-wrapper">
                  <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
                    <div className="d-lg-none d-md-none d-flex position-relative top-0 start-0">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/ai-tooltip.png"
                        }
                        alt=""
                        className="tooltip-icon"
                        style={{
                          cursor: "pointer",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => setTooltip(!tooltip)}
                      />
                      <div
                        className={`tooltip-wrapper p-3 ${
                          tooltip && "tooltip-active"
                        }`}
                        style={{
                          width: 260,
                          left: "40%",
                          background: "#091235",
                        }}
                      >
                        <div className=" gap-2 d-flex flex-column">
                          <span className="ai-oryn-bottom-txt">
                            A daily challenge where each player can unlock a AI
                            question for a chance to win!
                          </span>
                          <span className="ai-oryn-bottom-txt">Notes:</span>
                          <ul className="ai-oryn-bottom-txt ps-0">
                            <li>🔹 Daily opportunity </li>
                            <li>🔹 Available on BNB & opBNB</li>
                            <li>🔹 Sign the transaction </li>
                            <li>🔹 Answer in 20 seconds</li>
                            <li>🔹 Win different rewards</li>
                          </ul>

                          <div
                            className={"ai-rewards-info-active"}
                            // onMouseOver={() => {
                            //   setActiveClass("stars");
                            // }}
                            // onMouseLeave={() => {
                            //   setActiveClass("");
                            // }}
                          >
                            <div className="d-flex align-items-center px-3 py-2 gap-2">
                              <div className="d-flex align-items-center gap-1">
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp"
                                  }
                                  alt=""
                                  className={"ai-reward-logo-active"}
                                />
                                <div className="d-flex flex-column">
                                  {/* <span className={"ai-rewards-stars"}>180</span> */}
                                  <span
                                    className={"ai-rewards-title-active ps-3"}
                                  >
                                    Up to 500 Stars
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="ai-rewards-info-active"
                            // onMouseOver={() => {
                            //   setActiveClass("points");
                            // }}
                            // onMouseLeave={() => {
                            //   setActiveClass("");
                            // }}
                          >
                            <div className="d-flex align-items-center px-3 py-2 gap-2">
                              <div className="d-flex align-items-center gap-1">
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp"
                                  }
                                  alt=""
                                  className={"ai-reward-logo-active"}
                                />
                                <div className="d-flex flex-column">
                                  {/* <span className={"ai-rewards-points"}>
                      {getFormattedNumber(23200, 0)}
                    </span> */}
                                  <span
                                    className={"ai-rewards-title-active ps-3"}
                                  >
                                    Up to 30,000 Points
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="ai-rewards-info-active"
                            // onMouseOver={() => {
                            //   setActiveClass("rewards");
                            // }}
                            // onMouseLeave={() => {
                            //   setActiveClass("");
                            // }}
                          >
                            <div className="d-flex align-items-center px-3 py-2 gap-2">
                              <div className="d-flex align-items-center gap-1">
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/ai-reward-active.webp"
                                  }
                                  alt=""
                                  className={"ai-reward-logo-active"}
                                />
                                <div className="d-flex flex-column">
                                  {/* <span className={"ai-rewards-money"}>$1.5</span> */}
                                  <span
                                    className={"ai-rewards-title-active ps-3"}
                                  >
                                    Up to $300 Rewards
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </OutsideClickHandler>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/ai-popupx.png"}
                    onClick={() => {
                      if (aiStep === 0) {
                        setSuspenseSound(true);
                        setShowDailyQuestion(false);
                        suspenseMusicRef.current?.pause();
                        suspenseMusicRef.current.currentTime = 0;
                        clockSoundRef.current?.pause();
                        clockSoundRef.current.currentTime = 0;
                        html.classList.remove("hidescroll");
                        window.location.hash = "";
                      } else {
                        setClosePopup(true);
                      }
                    }}
                    alt=""
                    className="ai-x"
                  />
                </div>
                <AIQuestion
                  onQuestionComplete={(value) => {
                    setAiQuestionCompleted(value);
                    getAIQuestionRewardStatus(email);
                    getAIQuestionStatus(coinbase, email);
                  }}
                  onAddRewards={(value) => {
                    updateRewardApis(value);
                  }}
                  aiQuestionRewards={aiQuestionRewards}
                  aiQuestionObjectAnswered={aiQuestionObjectAnswered}
                  getAiStep={getAiStep}
                  closePopup={closePopup}
                  setClosePopup={setClosePopup}
                  username={username ?? "Player"}
                  address={userWallet}
                  isConnected={isConnected}
                  coinbase={coinbase}
                  chainId={chainId}
                  suspenseMusicRef={suspenseMusicRef}
                  clockSoundRef={clockSoundRef}
                  suspenseSound={suspenseSound}
                  setSuspenseSound={setSuspenseSound}
                  onConnectWallet={() => {
                    setShowDailyQuestion(false);
                    handleConnect();
                  }}
                  onQuestionReveal={(value) => {
                    setAiQuestionObject2(value);
                  }}
                  onClose={() => {
                    setSuspenseSound(true);
                    setShowDailyQuestion(false);
                    suspenseMusicRef.current?.pause();
                    suspenseMusicRef.current.currentTime = 0;
                    clockSoundRef.current?.pause();
                    clockSoundRef.current.currentTime = 0;
                    html.classList.remove("hidescroll");
                    setAiStep(0);
                  }}
                  handleBnbPool={(hex, dec) => {
                    switchNetwork(hex, dec);
                  }}
                  email={email}
                  walletClient={walletClient}
                  publicClient={publicClient}
                />
              </div>
            </div>
          </div>

          // </OutsideClickHandler>
        )}
        {closePopup && (
          <OutsideClickHandler onOutsideClick={() => setClosePopup(false)}>
            <ClosePopup
              onClose={() => {
                setSuspenseSound(true);
                setShowDailyQuestion(false);
                suspenseMusicRef.current?.pause();
                suspenseMusicRef.current.currentTime = 0;
                clockSoundRef.current?.pause();
                clockSoundRef.current.currentTime = 0;
                html.classList.remove("hidescroll");
                setAiStep(0);
                checkAnswerTimeout();
              }}
              setClosePopup={setClosePopup}
            />
          </OutsideClickHandler>
        )}
        {(portfolio || hashValue === "#portfolio") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setPortfolio(false);
              window.location.hash = "";
            }}
          >
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
                  onClick={() => {
                    setPortfolio(false);
                    window.location.hash = "";
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>

              <Portfolio
                wodBalance={wodBalance}
                allListed={listedNFTS}
                address={userWallet}
                coinbase={coinbase}
                isVerified={userWallet !== undefined && userId !== undefined}
                favoritesArray={favorites}
                email={email}
                userId={userId}
                username={username}
                landStaked={landstakes}
                myCawsWodStakes={myCawsWodStakesAll}
                myWodWodStakes={myWodWodStakesAll}
                latestBoughtNFTS={latest20BoughtNFTS}
                myOffers={myOffers}
                userCollectedNFTS={userCollectedNFTS}
              />
            </div>
          </OutsideClickHandler>
        )}

        {(specialRewardsPopup || hashValue === "#special-rewards") && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setSpecialRewardsPopup(false);
              window.location.hash = "";
            }}
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
                      onClick={() => {
                        setSpecialRewardsPopup(false);
                        window.location.hash = "";
                      }}
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
                      onClick={() => {
                        setSpecialRewardsPopup(false);
                        window.location.hash = "";
                      }}
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
                    distributed in WOD on a monthly basis.
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
