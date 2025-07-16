/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import NewEvents from "../../../../../components/NewEvents/NewEvents";
import Web3 from "web3";

import GlobalLeaderboard from "../../../../../components/LeaderBoard/GlobalLeaderboard";
import WalletModal from "../../../../../components/WalletModal/WalletModal";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import axios from "axios";
// import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import OutsideClickHandler from "react-outside-click-handler";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
// import MyBalance from "../../Components/WalletBalance/MyBalance";
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
  // mantaStars,
  monthlyStarPrizes,
  monthlyExtraStarPrizes,
  skaleStars,
  taikoStars,
  weeklyStarPrizes,
  weeklyExtraStarPrizes,
  seiStars,
  matStars,
  vanarStars,
} from "./stars";
import GetPremiumPopup from "../../Components/PremiumPopup/GetPremium";
import BnbDailyBonus from "../../../../../components/NewDailyBonus/BnbDailyBonus";
import MatchainDailyBonus from "../../../../../components/NewDailyBonus/MatchainDailyBonus";
import AIQuestion from "../../../../../components/AIQuestion/AIQuestion";
import ClosePopup from "../../../../../components/AIQuestion/ClosePopup";

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
  syncCount,
  // myCawsWodStakes,
  // landStaked,
  ethTokenData,
  dypTokenData,
  // onSigninClick,
  onSyncClick,
  // onLogoutClick,
  // availableTime,
  success,
  handleSwitchNetwork,
  domainName,
  handleOpenDomains,
  // dogePrice,
  handleSwitchChain,
  onSubscribeSuccess,
  isPremium,
  // dyptokenDatabnb,
  baseEarnUSD,
  logoutCount,
  // handleConnectBinance,
  // handleConnectionPassport,
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
  vanarEarnUsd,
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
  // showSync,
  // onCloseSync,
  easy2StakeEarnUsd,
  midleEarnUsd,
  coingeckoEarnUsd,
  chainlinkEarnUsd,
  isTokenExpired,
  listedNFTS,
  mykucoinNFTs,
  myVanarNFTs,
  kucoinEarnUsd,
  walletClient,
  publicClient,
  network_matchain,
  syncStatus,
    myTeaBnbNfts,
  myTeaOpbnbNfts,
  myTeaSeiNfts,
  myTeaBaseNfts,
}) {
  const { email } = useAuth();
  const { eventId } = useParams();
  // const override = {
  //   display: "block",
  //   margin: "auto",
  //   borderColor: "#554fd8",
  // };
  const suspenseful1Sound =
    "https://cdn.worldofdypians.com/wod/aiOryn/longSuspense.mp3";
  const clockSound = "https://cdn.worldofdypians.com/wod/aiOryn/clockSound.mp3";
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

  const bannedEmails = [
    "hibrahymdaniel@gmail.com",
    "therocklobo@gmail.com",
    "thelunapass@gmail.com",
    "kharu4735@gmail.com",
    "ti14bookmega@gmail.com",
    "atop127@yandex.ru",
    "giftaghedo71@gmail.com",
    "scottevbaru@gmail.com",
    "evbaru2@gmail.com",
    "ogieva.igho@yahoo.com",
    "ryaeiou100199@gmail.com",
    "ciangsabin@gmail.com",
    "izcipara88@gmail.com",
    "therockhidder@gmail.com",
    "deryanuwu7@gmail.com",
    "amox@poczta.fm",
    "hmbsamd@gmail.com",
  ];

  // const chainDropdowns = [
  //   {
  //     name: "Ethereum",
  //     symbol: "eth",
  //   },
  //   {
  //     name: "BNB Chain",
  //     symbol: "bnb",
  //   },

  //   {
  //     name: "Avalanche",
  //     symbol: "wavax",
  //   },
  //   {
  //     name: "Conflux",
  //     symbol: "conflux",
  //   },
  //   {
  //     name: "Base",
  //     symbol: "base",
  //   },
  //   {
  //     name: "SKALE",
  //     symbol: "skale",
  //   },
  //   {
  //     name: "CORE",
  //     symbol: "core",
  //   },
  //   {
  //     name: "Viction",
  //     symbol: "viction",
  //   },

  //   {
  //     name: "Manta",
  //     symbol: "manta",
  //   },

  //   {
  //     name: "Taiko",
  //     symbol: "taiko",
  //   },
  //   {
  //     name: "Matchain",
  //     symbol: "matchain",
  //   },
  //   {
  //     name: "SEI",
  //     symbol: "sei",
  //   },
  // ];

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

  const [loading, setLoading] = useState(false);
  const [showDailyQuestion, setShowDailyQuestion] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const [userRankRewards, setUserRankRewards] = useState(0);
  const [closePopup, setClosePopup] = useState(false);

  const [errors, setErrors] = useState({});

  const [showNfts, setShowNfts] = useState(false);
  const [showWalletModal, setshowWalletModal] = useState(false);
  const [goldenPassRemainingTime, setGoldenPassRemainingTime] = useState();

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
  const [openedVanarChests, setOpenedVanarChests] = useState([]);
  const [openedBaseChests, setOpenedBaseChests] = useState([]);
  const [openedMatChests, setOpenedMatChests] = useState([]);

  const [leaderboard, setLeaderboard] = useState(false);
  const [genesisLeaderboard, setGenesisLeaderboard] = useState(false);
  const [adClicked, setadClicked] = useState("");
  const [goldenPassPopup, setgoldenPassPopup] = useState(false);
  const [aiQuestionCompleted, setAiQuestionCompleted] = useState(false);

  const [globalLeaderboard, setGlobalLeaderboard] = useState(false);

  const [myOffers, setmyOffers] = useState([]);
  const [allActiveOffers, setallOffers] = useState([]);

  const [isonlink, setIsOnLink] = useState(false);
  // const [isPremium, setIsPremium] = useState(false);
  const [myRewardsPopup, setmyRewardsPopup] = useState(false);
  const [getPremiumPopup, setgetPremiumPopup] = useState(false);

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

  const [claimedVictionPremiumChests, setclaimedVictionPremiumChests] =
    useState(0);
  const [claimedSeiPremiumChests, setclaimedSeiPremiumChests] = useState(0);
  const [claimedMantaPremiumChests, setclaimedMantaPremiumChests] = useState(0);
  const [claimedTaikoPremiumChests, setclaimedTaikoPremiumChests] = useState(0);
  const [claimedVanarPremiumChests, setclaimedVanarPremiumChests] = useState(0);
  const [claimedMatPremiumChests, setclaimedMatPremiumChests] = useState(0);

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

  const [rankData, setRankData] = useState({});

  const [userRank2, setUserRank2] = useState("");

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
  const [suspenseSound, setSuspenseSound] = useState(false);
  const [selectedEvent, setselectedEvent] = useState([]);
  const [showEventPopup, setshowEventPopup] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [userRankName, setUserRankName] = useState({
    name: "starter",
    id: 0,
  });

  const [leaderboardBtn, setleaderboardBtn] = useState("weekly");

  const suspenseMusicRef = useRef(null);
  const clockSoundRef = useRef(null);

  const getAiStep = (data) => {
    setAiStep(data);
  };

  useEffect(() => {
    suspenseMusicRef.current = new Audio(suspenseful1Sound);
    clockSoundRef.current = new Audio(clockSound);
  }, []);

  const recaptchaRef = useRef(null);
  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");

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

  const [primeStars, setprimeStars] = useState(false);

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
  const [aiQuestionRewards, setaiQuestionRewards] = useState([]);
  const [aiQuestionObjectAnswered, setAiQuestionObjectAnswered] = useState({
    question: "",
    options: [],
    id: "",
    userIndex: undefined,
    correctIndex: undefined,
    chain: "",
  });
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

  const fetchDailyRecordsCore = async () => {
    if (dailyRecordsCore.length > 0) return;
    setloadingCore(true);

    const data = {
      StatisticName: "LeaderboardCoreDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingCore(false);
      fillRecordsCore([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingCore(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerCore = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardCoreDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard;

      const userPosition = testArray[0].position;
      setUserDataCore(...testArray);
      if (userPosition > 99) {
        setActivePlayerCore(false);
      } else {
        setActivePlayerCore(true);
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

  const fetchPreviousWinnersViction = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardVictionDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsViction([]);
        });
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

  const fetchDailyRecordsViction = async () => {
    if (dailyRecordsViction.length > 0) return;
    setloadingViction(true);

    const data = {
      StatisticName: "LeaderboardVictionDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingViction(false);
      fillRecordsViction([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingViction(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerViction = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardVictionDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;

      const userPosition = testArray[0].position;
      setUserDataViction(...testArray);
      if (userPosition > 99) {
        setActivePlayerViction(false);
      } else {
        setActivePlayerViction(true);
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

  const fetchPreviousWinnersManta = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMantaDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsManta([]);
        });
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

  const fetchDailyRecordsManta = async () => {
    if (dailyRecordsManta.length > 0) return;
    setloadingManta(true);

    const data = {
      StatisticName: "LeaderboardMantaDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingManta(false);
      fillRecordsManta([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingManta(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerManta = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMantaDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataManta(...testArray);
      if (userPosition > 99) {
        setActivePlayerManta(false);
      } else {
        setActivePlayerManta(true);
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

  const fetchPreviousWinnersSei = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSeiDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsSei([]);
        });
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

  const fetchDailyRecordsSei = async () => {
    if (dailyRecordsSei.length > 0) return;
    setloadingSei(true);

    const data = {
      StatisticName: "LeaderboardSeiDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingSei(false);
      fillRecordsSei([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingSei(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerSei = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSeiDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataSei(...testArray);
      if (userPosition > 99) {
        setActivePlayerSei(false);
      } else {
        setActivePlayerSei(true);
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

  const fetchPreviousWinnersBase = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardBaseDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsBase([]);
        });
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

  const fetchDailyRecordsBase = async () => {
    if (dailyRecordsBase.length > 0) return;
    setloadingBase(true);

    const data = {
      StatisticName: "LeaderboardBaseDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingBase(false);
      fillRecordsBase([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingBase(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerBase = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardBaseDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataBase(...testArray);
      if (userPosition > 99) {
        setActivePlayerBase(false);
      } else {
        setActivePlayerBase(true);
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

  const fetchPreviousWinnersVanar = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardVanarDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsVanar([]);
        });
      setPrevDataVanar(result.data.data.leaderboard);
    } else {
      setPrevDataVanar(placeholderplayerData);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };

  const fetchDailyRecordsVanar = async () => {
    if (dailyRecordsVanar.length > 0) return;
    setLoadingVanar(true);

    const data = {
      StatisticName: "LeaderboardVanarDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

      fetchPreviousWinnersVanar(parseInt(result.data.data.version));
      setDailyRecordsVanar(result.data.data.leaderboard);
      fillRecordsVanar(result.data.data.leaderboard);

      if (userId && username) {
        var testArray = result.data.data.leaderboard.filter(
          (item) => item.displayName === username
        );
        if (testArray.length > 0) {
          setActivePlayerVanar(true);
          fetchDailyRecordsAroundPlayerVanar(result.data.data.leaderboard);
        } else if (testArray.length === 0) {
          setActivePlayerVanar(false);
          fetchDailyRecordsAroundPlayerVanar(result.data.data.leaderboard);
        }
      }
    } catch (error) {
      console.error(error);
      setLoadingVanar(false);
      fillRecordsVanar([]);
    } finally {
      const timer = setTimeout(() => {
        setLoadingVanar(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  const fetchDailyRecordsAroundPlayerVanar = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardVanarDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;

      const userPosition = testArray[0].position;

      setUserDataVanar(...testArray);
      if (userPosition > 99) {
        setActivePlayerVanar(false);
      } else {
        setActivePlayerVanar(true);
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

  const fetchPreviousWinnersTaiko = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardTaikoDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsTaiko([]);
        });
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

  const fetchDailyRecordsTaiko = async () => {
    if (dailyRecordsTaiko.length > 0) return;
    setloadingTaiko(true);

    const data = {
      StatisticName: "LeaderboardTaikoDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingTaiko(false);
      fillRecordsTaiko([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingTaiko(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerTaiko = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardTaikoDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataTaiko(...testArray);
      if (userPosition > 99) {
        setActivePlayerTaiko(false);
      } else {
        setActivePlayerTaiko(true);
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

  const fetchPreviousWinnersMat = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardMatchainDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsMat([]);
        });
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

  const fetchDailyRecordsMat = async () => {
    if (dailyRecordsMat.length > 0) return;
    setloadingMat(true);

    const data = {
      StatisticName: "LeaderboardMatchainDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingMat(false);
      fillRecordsMat([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingMat(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerMat = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardMatchainDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataMat(...testArray);
      if (userPosition > 99) {
        setActivePlayerMat(false);
      } else {
        setActivePlayerMat(true);
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

  const fetchPreviousWinnersSkale = async (version) => {
    if (version != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleDaily",
        StartPosition: 0,
        MaxResultsCount: 100,
        Version: version - 1,
      };
      const result = await axios
        .post(`${backendApi}/auth/GetLeaderboard?Version=-1`, data)
        .catch((error) => {
          console.error(error);
          fillRecordsSkale([]);
        });
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

  const fetchDailyRecordsSkale = async () => {
    if (dailyRecordsSkale.length > 0) return;
    setloadingSkale(true);

    const data = {
      StatisticName: "LeaderboardSkaleDaily",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
    } catch (error) {
      console.error(error);
      setloadingSkale(false);
      fillRecordsSkale([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingSkale(false);
      }, 1000);
      return () => clearTimeout(timer);
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

  const fetchDailyRecordsAroundPlayerSkale = async (itemData) => {
    const data = {
      StatisticName: "LeaderboardSkaleDaily",
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserDataSkale(...testArray);
      if (userPosition > 99) {
        setActivePlayerSkale(false);
      } else {
        setActivePlayerSkale(true);
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
        // setuserCollectedStars(testArray[0].statValue);
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
    if (starRecords.length > 0) return;
    setloadingStarMonthly(true);

    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

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
          // setuserCollectedStars(testArray[0].statValue);
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
    } catch (error) {
      console.error(error);
      setloadingStarMonthly(false);
      fillRecordsStar([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingStarMonthly(false);
      }, 1000);
      return () => clearTimeout(timer);
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
    if (starRecordsWeekly.length > 0) return;
    setloadingStarWeekly(true);

    const data = {
      StatisticName: "GlobalStarWeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

      fetchPreviousWinnersStarWeekly(parseInt(result.data.data.version));
      setStarRecordsWeekly(result.data.data.leaderboard);
      fillRecordsStarWeekly(result.data.data.leaderboard);

      if (userId && username) {
        if (userId && username) {
          var testArray = result.data.data.leaderboard.filter(
            (item) => item.displayName === username
          );
          if (testArray.length > 0) {
            setActivePlayerStarWeekly(true);
            const userPosition = testArray[0].position;
            // setuserCollectedStarsWeekly(testArray[0].statValue);
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
      }
    } catch (error) {
      console.error(error);
      setloadingStarWeekly(false);
      fillRecordsStarWeekly([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingStarWeekly(false);
      }, 1000);
      return () => clearTimeout(timer);
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
        // setuserCollectedStarsWeekly(testArray[0].statValue);
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

  //   const fetchDailyRecords = async () => {
  //     const data = {
  //       StatisticName: "DailyLeaderboard",
  //       StartPosition: 0,
  //       MaxResultsCount: 100,
  //     };
  //     const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((error)=>{
  //       console.error(error);
  //       fillRecords([])
  //     });
  //  setloadingBnb(true);
  //     setRecords(result.data.data.leaderboard);
  //     fillRecords(result.data.data.leaderboard);
  //     fetchPreviousWinners(parseInt(result.data.data.version));
  //     if (userId && username) {
  //       var testArray = result.data.data.leaderboard.filter(
  //         (item) => item.displayName === username
  //       );
  //       if (testArray.length > 0) {
  //         setActivePlayer(true);
  //         fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
  //       } else if (testArray.length === 0) {
  //         setActivePlayer(false);
  //         fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
  //       }
  //     }
  //     setTimeout(() => {
  //       setloadingBnb(false);
  //     }, 9000);
  //   };

  const fetchDailyRecords = async () => {
    if (dailyrecords.length > 0) return;
    setloadingBnb(true);

    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };

    try {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      );

      setRecords(result.data.data.leaderboard);
      fillRecords(result.data.data.leaderboard);
      fetchPreviousWinners(parseInt(result.data.data.version));

      if (userId && username) {
        const testArray = result.data.data.leaderboard.filter(
          (item) => item.displayName === username
        );
        setActivePlayer(testArray.length > 0);
        fetchDailyRecordsAroundPlayer(result.data.data.leaderboard);
      }
    } catch (error) {
      console.error(error);
      setloadingBnb(false);
      fillRecords([]);
    } finally {
      const timer = setTimeout(() => {
        setloadingBnb(false);
      }, 1000);
      return () => clearTimeout(timer);
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
  }, [logoutCount]);

  useEffect(() => {
    if (username !== undefined && userId !== undefined) {
      fetchGenesisRecords();
      fetchGreatCollection();
      fetchExplorerHunt();
    }
  }, [username, userId, goldenPassRemainingTime]);

  useEffect(() => {
    if (count !== 0) {
      // fetchDailyRecords();
      getAllChests(email);
    }
  }, [count]);

  useEffect(() => {
    if (corecount !== 0) {
      // fetchDailyRecordsCore();
      getAllCoreChests(email);
    }
  }, [corecount]);

  useEffect(() => {
    if (skalecount !== 0) {
      // fetchDailyRecordsSkale();
      getAllSkaleChests(email);
    }
  }, [skalecount]);

  // const lastUpdated = useRef(false);

  useEffect(() => {
    if (vicitoncount !== 0) {
      // fetchDailyRecordsViction();
      getAllVictionChests(email);
    }
  }, [vicitoncount]);

  useEffect(() => {
    if (mantacount !== 0) {
      // fetchDailyRecordsManta();
      getAllMantaChests(email);
    }
  }, [mantacount]);

  useEffect(() => {
    if (basecount !== 0) {
      // fetchDailyRecordsBase();
      getAllBaseChests(email);
    }
  }, [basecount]);

  useEffect(() => {
    if (taikocount !== 0) {
      // fetchDailyRecordsTaiko();
      getAllTaikoChests(email);
    }
  }, [taikocount]);
  useEffect(() => {
    if (vanarcount !== 0) {
      // fetchDailyRecordsVanar();
      getAllVanarChests(email);
    }
  }, [vanarcount]);

  useEffect(() => {
    if (matcount !== 0) {
      // fetchDailyRecordsMat();
      getAllMatChests(email);
    }
  }, [matcount]);

  useEffect(() => {
    if (seicount !== 0) {
      // fetchDailyRecordsSei();
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
      loading: loadingStarMonthly || loadingStarWeekly,
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
    loadingStarMonthly,
    loadingStarWeekly,
    userId,
    username,
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
      activePlayerSei,
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
    activePlayerSei,
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
        is_active: activePlayerSkale, //change when apis are ready
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
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsCore,
        previousData: prevDataCore,
        player_data: userDataCore,
        is_active: activePlayerCore, //change when apis are ready
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
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: dailyRecordsViction,
        previousData: prevDataViction,
        player_data: userDataViction,
        is_active: activePlayerViction, //change when apis are ready
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
        is_active: activePlayerManta, //change when apis are ready
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
        is_active: activePlayerSei, //change when apis are ready
        loading: loadingSei,
      },
    ]);
  }, [dailyRecordsSei, prevDataSei, userDataSei, activePlayerSei, loadingSei]);

  useEffect(() => {
    setAllBaseData([
      {
        title: "DAILY",
        reset: "Daily (00:00 UTC)",
        type: "stars",
        rewards: baseStars,
        previous_rewards: baseStars,
        activeData: placeholderplayerData.slice(0, 10),
        previousData: placeholderplayerData.slice(0, 10),
        player_data: userDataBase,
        is_active: activePlayerBase, //change when apis are ready
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
        is_active: activePlayerTaiko, //change when apis are ready
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
        is_active: activePlayerMat, //change when apis are ready
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
    } else if (chain === "manta") {
      if (dailyRecordsManta.length === 0) {
        fetchDailyRecordsManta();
      }
    }
    // else if (chain === "base") {
    //   if (dailyRecordsBase.length === 0) {
    //     fetchDailyRecordsBase();
    //   }
    // }
    else if (chain === "core") {
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
      fetchDailyRecordsAroundPlayer([]);
      fetchDailyRecordsAroundPlayerTaiko([]);
      fetchDailyRecordsAroundPlayerVanar([]);
      fetchDailyRecordsAroundPlayerMat([]);
      fetchDailyRecordsAroundPlayerSei([]);
      fetchDailyRecordsAroundPlayerManta([]);
      fetchDailyRecordsAroundPlayerBase([]);
      fetchDailyRecordsAroundPlayerCore([]);
      fetchDailyRecordsAroundPlayerViction([]);
      fetchDailyRecordsAroundPlayerSkale([]);
      fetchDailyRecordsAroundPlayerStar([]);
      fetchWeeklyRecordsAroundPlayerStar([]);
    }
  };

  const handleSetAvailableTime = (value) => {
    setGoldenPassRemainingTime(value);
  };

  const handleRefreshCountdown700 = async (wallet) => {
    if (wallet) {
      const goldenPassContract = new window.bscWeb3.eth.Contract(
        GOLDEN_PASS_ABI,
        golden_pass_address
      );

      const purchaseTimestamp = await goldenPassContract.methods
        .getTimeOfExpireBuff(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const today = new Date();

      if (today.getTime() <= Number(purchaseTimestamp) * 1000) {
        handleSetAvailableTime(purchaseTimestamp);
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
      .get(`https://api.worldofdypians.com/api/dappbay/task2/${wallet}`)
      .catch((e) => {
        console.error(e);
      });

    if (result2 && result2.status === 200) {
      console.log(result2.data.result);
      const timer = setTimeout(() => {
        if (isonlink) {
          window.location.reload();
        }
      }, 2000);
      return () => clearTimeout(timer);
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
      MaxResultsCount: 1,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      // setRecordsAroundPlayer(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard;
      const userPosition = testArray[0].position;
      setUserData(...testArray);
      if (userPosition > 99) {
        setActivePlayer(false);
      } else {
        setActivePlayer(true);
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
          claimedVanarChests + claimedVanarPremiumChests < 20 ||
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
          claimedVanarChests + claimedVanarPremiumChests === 20 &&
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
          claimedVanarChests < 10 ||
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
          claimedVanarChests === 10 &&
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
  // console.log(aiQuestionObjectAnswered, aiQuestionCompleted);
  const handleShowSyncModal = () => {
    onSyncClick();
  };

  const getMyNFTS = async (coinbase, type) => {
    if (coinbase !== undefined) {
      return await window.getMyNFTs(coinbase, type);
    } else {
      return [];
    }
  };
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
        handleSwitchChainGateWallet(chain);
      } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
        network_matchain?.showChangeNetwork();
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(chain);
      }
    } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(chain);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
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

  // const getDypBalance = async (account) => {
  //   const web3eth = new Web3(
  //     "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
  //   );

  //   const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

  //   const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

  //   if (account !== undefined) {
  //     const token_address = "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3";
  //     const token_address_bsc = "0x1a3264f2e7b1cfc6220ec9348d33ccf02af7aaa4";

  //     const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

  //     const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
  //     const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address_bsc);
  //     const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address_bsc);

  //     const contract1_idyp = new web3eth.eth.Contract(
  //       ERC20_ABI,
  //       token_addressIDYP
  //     );
  //     const contract2_idyp = new web3bsc.eth.Contract(
  //       ERC20_ABI,
  //       token_addressIDYP
  //     );
  //     const contract3_idyp = new web3avax.eth.Contract(
  //       ERC20_ABI,
  //       token_addressIDYP
  //     );

  //     const bal1 = await contract1.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3eth.utils.fromWei(data, "ether");
  //       });
  //     setDypBalance(bal1);

  //     const bal2 = await contract2.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3bsc.utils.fromWei(data, "ether");
  //       });
  //     setDypBalanceBnb(bal2);

  //     const bal3 = await contract3.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3avax.utils.fromWei(data, "ether");
  //       });
  //     setDypBalanceAvax(bal3);

  //     const bal1_idyp = await contract1_idyp.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3eth.utils.fromWei(data, "ether");
  //       });
  //     setiDypBalance(bal1_idyp);

  //     const bal2_idyp = await contract2_idyp.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3bsc.utils.fromWei(data, "ether");
  //       });
  //     setiDypBalanceBnb(bal2_idyp);

  //     const bal3_idyp = await contract3_idyp.methods
  //       .balanceOf(account)
  //       .call()
  //       .then((data) => {
  //         return web3avax.utils.fromWei(data, "ether");
  //       });
  //     setiDypBalanceAvax(bal3_idyp);
  //   } else {
  //     setDypBalance(0);
  //     setDypBalanceBnb(0);
  //     setDypBalanceAvax(0);
  //     setiDypBalance(0);
  //     setiDypBalanceBnb(0);
  //     setiDypBalanceAvax(0);
  //   }
  // };

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

  // const handleRankRewards = () => {
  //   const totalScore =
  //     userBnbScore +
  //     userSkaleScore +
  //     userCoreScore +
  //     userVictionScore +
  //     userMantaScore +
  //     userBaseScore +
  //     userTaikoScore +
  //     userMatScore;

  //   const totalScore_multiplied =
  //     rankData && rankData.multiplier === "yes" ? totalScore * 4 : totalScore;
  //   if (totalScore_multiplied > 15999999 && totalScore_multiplied < 28000000) {
  //     setUserRankRewards(5);
  //   } else if (
  //     totalScore_multiplied >= 28000000 &&
  //     totalScore_multiplied < 41000000
  //   ) {
  //     setUserRankRewards(10);
  //   } else if (
  //     totalScore_multiplied >= 41000000 &&
  //     totalScore_multiplied < 66000000
  //   ) {
  //     setUserRankRewards(25);
  //   } else if (totalScore_multiplied >= 66000000) {
  //     setUserRankRewards(100);
  //   }
  // };

  // const handleUserRank = () => {
  //   let allScore;
  //   if (rankData && rankData.multiplier === "yes") {
  //     allScore = userTotalScore * 4;
  //   } else if (rankData && rankData.multiplier === "no") {
  //     allScore = userTotalScore;
  //   }
  //   if (allScore > 65999999) {
  //     setUserRankName({
  //       name: "unstoppable",
  //       id: 4,
  //     });
  //     sliderRef?.current?.innerSlider?.slickGoTo(4);
  //     setUserProgress(100);
  //   } else if (allScore > 40999999) {
  //     setUserRankName({
  //       name: "champion",
  //       id: 3,
  //     });
  //     sliderRef?.current?.innerSlider?.slickGoTo(3);
  //     setUserProgress((allScore / 66000000) * 100);
  //   } else if (allScore > 27999999) {
  //     setUserRankName({
  //       name: "underdog",
  //       id: 2,
  //     });
  //     sliderRef?.current?.innerSlider?.slickGoTo(2);
  //     setUserProgress((allScore / 41000000) * 100);
  //   } else if (allScore > 15999999) {
  //     setUserRankName({
  //       name: "rookie",
  //       id: 1,
  //     });
  //     sliderRef?.current?.innerSlider?.slickGoTo(1);
  //     setUserProgress((allScore / 28000000) * 100);
  //   } else {
  //     sliderRef?.current?.innerSlider?.slickGoTo(0);
  //     setUserProgress((allScore / 16000000) * 100);
  //   }
  // };

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
    document.title = "WOD Account";

    window.scrollTo(0, 0);
    // if (username !== undefined && userId !== undefined) {

    fetchGenesisRecords();

    fetchGreatCollection();
    fetchExplorerHunt();

    // }
  }, []);

  useEffect(() => {
    if (userWallet && chainId === 1 && window.WALLET_TYPE !== "") {
      calculateAllRewardsCawsPremium(userWallet);
      calculateAllRewardsLandPremium(userWallet);
    }
  }, [userWallet, chainId]);

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
    }
  }, [dataVerify]);

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
    claimedVanarChests,
    claimedVanarPremiumChests,
    claimedMatChests,
    claimedMatPremiumChests,
  ]);

  useEffect(() => {
    if (userWallet !== undefined && email !== undefined && email !== "") {
      getUserRewardData(userWallet);
      getAIQuestionStatus(userWallet, email);
    }
  }, [userWallet, email]);

  useEffect(() => {
    if ((coinbase && isConnected) || userWallet !== undefined) {
      fetchAllMyNfts();

      // getmyWodStakes();
    }
  }, [userWallet, isConnected, coinbase]);

  // useEffect(() => {
  //   if (email && userWallet) {
  //     handleFirstTask(userWallet);
  //   }
  // }, [email, userWallet]);

  useEffect(() => {
    if (authToken && email && isConnected && !isTokenExpired) {
      fetchUserFavorites(userWallet ? userWallet : coinbase);
    }
  }, [account, userWallet, isConnected, authToken, email, isTokenExpired]);

  useEffect(() => {
    refetchPlayer();
  }, [email, syncCount]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true ||
      globalLeaderboard === true ||
      genesisLeaderboard === true ||
      showDailyQuestion === true
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
  ]);

  const logoutItem = localStorage.getItem("logout");

  useEffect(() => {
    if (email && userWallet) {
      getAllSkaleChests(email);
      getAllChests(email);
      getAIQuestionRewardStatus(email);
      getAllCoreChests(email);
      getAllVictionChests(email);
      getAllMantaChests(email);
      getAllBaseChests(email);
      getAllTaikoChests(email);
      getAllVanarChests(email);
      getAllMatChests(email);
      getAllSeiChests(email);
    }
  }, [email, userWallet]);

  useEffect(() => {
    handleRefreshCountdown700(
      email ? userWallet : isConnected ? coinbase : window.config.ZERO_ADDRESS
    );
  }, [coinbase, isConnected, email, userWallet]);

  useEffect(() => {
    if (success === true) {
      setshowWalletModal(false);
    }
  }, [success]);

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
  ]);

  useEffect(() => {
    if (userId && email && username) {
      fetchGenesisAroundPlayer(userId, username);
      fetchDailyRecordsAroundPlayerStar([]);
      fetchWeeklyRecordsAroundPlayerStar([]);
    }
  }, [userId, username, email, goldenPassRemainingTime]);

  useEffect(() => {
    if (hashValue === "#prime") {
      navigate("/account/prime");
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
              wodBalance={wodBalance}
              aiQuestionCompleted={aiQuestionCompleted}
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
                claimedMatChests +
                claimedTaikoChests +
                claimedVanarChests +
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
              userRankName={userRankName}
              isConnected={isConnected}
              onConnectWallet={() => {
                // setshowWalletModal(true);
                handleConnect();
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
                // Number(baseEarnUSD) +
                Number(kucoinEarnUsd) +
                Number(bnbEarnUsd) +
                Number(mantaEarnUsd) +
                Number(coreEarnUsd) +
                Number(seiEarnUsd) +
                Number(taikoEarnUsd) +
                Number(vanarEarnUsd)
                // Number(coingeckoEarnUsd) +
                // Number(matEarnUsd) +
                // Number(bnbEarnUsd) +

                // Number(chainlinkEarnUsd)
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
              userRankVanar={userDataVanar?.position ?? 0}
              userVanarStars={
                (userDataVanar?.statValue === 0
                  ? 0
                  : userDataVanar?.position > 100
                  ? 0
                  : vanarStars[userDataVanar?.position]) ?? 0
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
              userVanarScore={userDataVanar?.statValue}
              onEventCardClick={() => {
                seteventCardCount(eventCardCount + 1);
              }}
              onLinkWallet={onManageLogin}
            />
            <NewEvents
              events={dummyBetaPassData2}
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
              walletClient={walletClient}
              publicClient={publicClient}
              network_matchain={network_matchain}
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
            allVanarChests={allVanarChests}
            allMatChests={allMatChests}
            allSeiChests={allSeiChests}
            userSocialRewards={userSocialRewards}
            bnbEarnUsd={bnbEarnUsd}
            skaleEarnUsd={skaleEarnUsd}
            multiversEarnUsd={multiversEarnUsd}
            seiEarnUsd={seiEarnUsd}
            vanarEarnUsd={vanarEarnUsd}
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
            kucoinEarnUsd={kucoinEarnUsd}
            easy2StakeEarnUsd={easy2StakeEarnUsd}
            midleEarnUsd={midleEarnUsd}
            coingeckoEarnUsd={coingeckoEarnUsd}
            aiQuestionRewards={
              aiQuestionRewards.length > 0
                ? aiQuestionRewards.find((item) => {
                    return (
                      item.rewardType === "Money" && item.status === "Claimed"
                    );
                  }) !== undefined
                  ? aiQuestionRewards.find((item) => {
                      return (
                        item.rewardType === "Money" && item.status === "Claimed"
                      );
                    }).reward
                  : 0
                : 0
            }
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
            onConnectWallet={() => {
              handleConnect();
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
            claimedVanarChests={claimedVanarChests}
            claimedVanarPremiumChests={claimedVanarPremiumChests}
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
            openedVanarChests={openedVanarChests}
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
            allVanarChests={allVanarChests}
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
            dummypremiumChests={dummypremiumChests}
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
            walletClient={walletClient}
            publicClient={publicClient}
            network_matchain={network_matchain}
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
            onConnectWallet={() => {
              handleConnect();
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
            claimedVanarChests={claimedVanarChests}
            claimedVanarPremiumChests={claimedVanarPremiumChests}
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
            openedVanarChests={openedVanarChests}
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
            allVanarChests={allVanarChests}
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
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
            walletClient={walletClient}
            publicClient={publicClient}
            network_matchain={network_matchain}
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
            onConnectWallet={() => {
              handleConnect();
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
            claimedVanarChests={claimedVanarChests}
            claimedVanarPremiumChests={claimedVanarPremiumChests}
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
            openedVanarChests={openedVanarChests}
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
            allVanarChests={allVanarChests}
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
            premiumTxHash={premiumTxHash}
            selectedChainforPremium={selectedChainforPremium}
            handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
            handleSwitchChainGateWallet={handleSwitchChainGateWallet}
            binanceWallet={binanceWallet}
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

        {showWalletModal === true && success === false && (
          <WalletModal
            show={showWalletModal}
            handleClose={() => {
              setshowWalletModal(false);
            }}
            handleConnection={handleConnect}
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
            onOutsideClick={() => {
              setGlobalLeaderboard(false);
              handleResetRecordsStars();
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
            walletClient={walletClient}
            publicClient={publicClient}
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
                allVanarChests={allVanarChests}
                allMatChests={allMatChests}
                allSeiChests={allSeiChests}
                availableTime={goldenPassRemainingTime}
                userSocialRewards={userSocialRewards}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                multiversEarnUsd={multiversEarnUsd}
                seiEarnUsd={seiEarnUsd}
                vanarEarnUsd={vanarEarnUsd}
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
                kucoinEarnUsd={kucoinEarnUsd}
                easy2StakeEarnUsd={easy2StakeEarnUsd}
                midleEarnUsd={midleEarnUsd}
                coingeckoEarnUsd={coingeckoEarnUsd}
                aiQuestionRewards={
                  aiQuestionRewards.length > 0
                    ? aiQuestionRewards.find((item) => {
                        return (
                          item.rewardType === "Money" &&
                          item.status === "Claimed"
                        );
                      }) !== undefined
                      ? aiQuestionRewards.find((item) => {
                          return (
                            item.rewardType === "Money" &&
                            item.status === "Claimed"
                          );
                        }).reward
                      : 0
                    : 0
                }
              />
            </div>
          </OutsideClickHandler>
        )}

        {showDailyQuestion && (
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
                                    50 - 250 Stars
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
                                    15,000 - 80,000 Points
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
                                    $5-$10 Rewards
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
                  aiQuestionRewards={aiQuestionRewards}
                  aiQuestionObjectAnswered={aiQuestionObjectAnswered}
                  getAiStep={getAiStep}
                  closePopup={closePopup}
                  setClosePopup={setClosePopup}
                  username={data?.getPlayer?.displayName ?? "Player"}
                  address={data?.getPlayer?.wallet?.publicAddress}
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
                  binanceW3WProvider={binanceW3WProvider}
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
              }}
              setClosePopup={setClosePopup}
            />
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
                showNfts={showNfts}
                handleShowWalletPopup={() => {
                  // setshowWalletModal(true);
                  handleConnect();
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
                mykucoinNFTs={mykucoinNFTs}
                myVanarNFTs={myVanarNFTs}
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
                MyNFTSLandBNB={MyNFTSLandBNB}
                MyNFTSCawsBNB={MyNFTSCawsBNB}
                MyNFTSLandAvax={MyNFTSLandAvax}
                MyNFTSCawsAvax={MyNFTSCawsAvax}
                MyNFTSLandBase={MyNFTSLandBase}
                myNFTSBNB={MyNFTSBNB}
                MyNFTSCawsBase={MyNFTSCawsBase}
                myMatNfts={myMatNfts}
                myTeaBnbNfts={myTeaBnbNfts}
                myTeaOpbnbNfts={myTeaOpbnbNfts}
                myTeaSeiNfts={myTeaSeiNfts}
                myTeaBaseNfts={myTeaBaseNfts} 
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
