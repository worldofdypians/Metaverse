// App.jsx
import React, { useEffect, useState, Suspense } from "react";
import { useMemoryOptimization } from "./hooks/useMemoryOptimization";
import MemoryMonitor from "./components/MemoryMonitor/MemoryMonitor";
import { ThemeProvider } from "./contexts/ThemeContext";
import FestiveElements from "./components/FestiveElements/FestiveElements";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "@matchain/matchid-sdk-react/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useUser, useWallet } from "./redux/hooks/useWallet.js";
import { setUserProgress } from "./redux/slices/userSlice";
import { useConnect } from "wagmi";
import { signMessage as signMessageWagmi, getBalance } from "@wagmi/core";
import { formatEther } from "viem";

import { createWalletClient as createWalletClientWagmi, custom } from "viem";
import { http, createPublicClient } from "viem";
import { bsc } from "viem/chains";
import axios from "axios";
import {
  disconnect,
  getAccount,
  getBytecode,
  watchAccount,
  watchConnections,
} from "@wagmi/core";
import {
  writeContract as wagmiWriteContract,
  waitForTransactionReceipt as wagmiWaitForTransactionReceipt,
} from "@wagmi/core";
import { Hooks } from "@matchain/matchid-sdk-react";
import { monthlyStarPrizes } from "./screens/Account/src/Containers/Dashboard/stars.js";
import { useAuth } from "./screens/Account/src/Utils.js/Auth/AuthDetails.jsx";
import { markers } from "./screens/Map/mapdata/markers.jsx";
import { HashLoader } from "react-spinners";
// Screens
import Home from "./screens/Home/Home";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.jsx";

import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import News from "./screens/News/News";
// import RegisterModal from "./components/RegisterModal/RegisterModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Land from "./screens/Land/Land";
import Roadmap from "./screens/Roadmap/Roadmap";
import ScrollTop from "./components/ScrollTop";
import JoinBeta from "./screens/JoinBeta/JoinBeta";
import JoinBetaModal from "./components/JoinBetaModal/JoinBetaModal";
import PartnerForm from "./screens/PartnerForm/PartnerForm";
import WalletModal from "./components/WalletModal/WalletModal";
import TimePiece from "./screens/Timepiece/Timepiece";
import Unsubscribe from "./screens/Unsubscribe/Unsubscribe";
import MarketMint from "./screens/Marketplace/MarketMint";
import ResetPasswordTest from "./screens/ResetPassword/ResetPassword.jsx";

import OrynFly from "./components/OrynFly/OrynFly.jsx";
import SyncModal from "./screens/Marketplace/MarketNFTs/SyncModal.jsx";
import TradingComp from "./screens/Community/Campaigns/TradingComp/TradingComp.jsx";
import WodBitGet from "./screens/Community/Campaigns/WodBitGet/WodBitGet.jsx";
import Kickstarter from "./components/Kickstarter/Kickstarter.jsx";
import KickstarterPage from "./components/Kickstarter/KickstarterPage.jsx";
// ... add other screens here

import "@aws-amplify/ui-react/styles.css";

import { useQuery as useReactQuery } from "@tanstack/react-query";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GENERATE_NONCE,
  GET_PLAYER,
  VERIFY_WALLET,
} from "./screens/Account/src/Containers/Dashboard/Dashboard.schema.js";
// Styles
import "./app.scss";
import { betaPasses } from "./constants/constants.js";
import { useMatchChain } from "@matchain/matchid-sdk-react/hooks";
// @imtbl/sdk is dynamically imported within handlers to reduce bundle size
import getListedNFTS from "./actions/Marketplace";
import {
  getAllNfts,
  getCawsNfts,
  getTimepieceNfts,
  getWodNfts,
} from "./actions/convertUsd.js";
import { useChainId } from "wagmi";
import {
  setAddress,
  setChainId,
  setIsConnected,
} from "./redux/slices/walletSlice";
import { wagmiClient } from "./wagmiConnectors.js";
import { CandlelightCursor } from "./components/FestiveElements/CandleLightCursor.jsx";

const Marketplace = React.lazy(() =>
  import("./screens/Marketplace/Marketplace")
);
const CawsNFT = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/CawsNFT")
);
const WoDNFT = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/WoDNFT")
);
const TimepieceNFT = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/TimepieceNFT")
);
const SingleNft = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/SingleNft")
);
const Notifications = React.lazy(() =>
  import("./screens/Marketplace/Notifications/Notifications")
);
const BetaPassNFT = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/BetaPassNFT")
);
const Caws = React.lazy(() => import("./screens/Caws/Caws.jsx"));
const AuthBNB = React.lazy(() =>
  import("./screens/Account/src/Containers/Auth/AuthBNB.jsx")
);
const Bridge = React.lazy(() => import("./screens/Wod/Bridge/Bridge.jsx"));
const Earn = React.lazy(() => import("./screens/Wod/Earn/Earn.jsx"));
const Governance = React.lazy(() =>
  import("./screens/Community/Governance/Governance.jsx")
);
const GovernanceInner = React.lazy(() =>
  import("./screens/Community/Governance/GovernanceContent/GovernanceInner.jsx")
);

const Redirect = React.lazy(() => import("./screens/Home/Redirect"));
const Token = React.lazy(() => import("./screens/Token/Token"));
const LoyaltyProgram = React.lazy(() =>
  import("./screens/LoyaltyProgram/LoyaltyProgram.jsx")
);
const About = React.lazy(() => import("./screens/About/About.jsx"));
const Game = React.lazy(() => import("./screens/Game/Game.jsx"));
const Campaigns = React.lazy(() =>
  import("./screens/Community/Campaigns/Campaigns.jsx")
);
const Map = React.lazy(() => import("./screens/Map/Map.jsx"));
const Whitelist = React.lazy(() => import("./screens/Whitelist/Whitelist.jsx"));
const Release = React.lazy(() => import("./screens/Release/Release.jsx"));
const BinanceCampaignRules = React.lazy(() =>
  import("./screens/TermsConditions/BinanceCampaignRules.jsx")
);
const Launchpool = React.lazy(() =>
  import("./screens/Launchpool/Launchpool.jsx")
);
const ListNFT = React.lazy(() =>
  import("./screens/Marketplace/MarketNFTs/ListNFT")
);
// const NFTBridge = React.lazy(() => import("./screens/NFTBridge/NftBridge"));
// const NewEvents = React.lazy(() =>
//   import("./components/NewEvents/NewEvents.jsx")
// );
const Dashboard = React.lazy(() =>
  import("./screens/Account/src/Containers/Dashboard/Dashboard.jsx")
);
const Agent = React.lazy(() => import("./screens/NewAgent/Agent.jsx"));

// Immutable SDK is heavy; load only when needed
const PUBLISHABLE_KEY = "pk_imapik-BnvsuBkVmRGTztAch9VH";
const CLIENT_ID = "FgRdX0vu86mtKw02PuPpIbRUWDN3NpoE";

let immutableRefs = /** @type {null | {
  checkout: any;
  passport: any;
  config: any;
  passportInstance: any;
  checkoutSDK: any;
}} */ (null);

async function ensureImmutable() {
  if (immutableRefs) return immutableRefs;
  const { checkout, passport, config } = await import("@imtbl/sdk");
  const baseConfig = {
    environment: config.Environment.PRODUCTION,
    publishableKey: PUBLISHABLE_KEY,
  };
  const passportInstance = new passport.Passport({
    baseConfig,
    clientId: CLIENT_ID,
    redirectUri: "https://www.worldofdypians.com/redirect",
    logoutRedirectUri: "https://www.worldofdypians.com/logout",
    audience: "platform_api",
    scope: "openid offline_access email transact",
  });
  const checkoutSDK = new checkout.Checkout({
    baseConfig,
    passport: passportInstance,
  });
  immutableRefs = { checkout, passport, config, passportInstance, checkoutSDK };
  return immutableRefs;
}

const fetchAllNFTs = async () => {
  try {
    const data = await getAllNfts();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedData = () => {
  return useReactQuery({
    queryKey: ["nfts"],
    queryFn: fetchAllNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const fetchListedNFTs = async () => {
  try {
    const data = await getListedNFTS(0, "", "recentListedNFTS");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedDataListedNfts = () => {
  return useReactQuery({
    queryKey: ["recentListedNFTS"],
    queryFn: fetchListedNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const fetchLatest20BoughtNFTs = async () => {
  const URL = `https://graphql.worldofdypians.com/subgraphs/name/wod`;
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

  try {
    const result = await axios.post(URL, { query: itemBoughtQuery });
    const boughtItems = result.data.data.itemBoughts || [];
    const finalBoughtItems = boughtItems
      .map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          return { ...nft, type: "caws", chain: 1 };
        } else if (nft.nftAddress === window.config.nft_land_address) {
          return { ...nft, type: "land", chain: 1 };
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          return { ...nft, type: "timepiece", chain: 1 };
        }
        return null;
      })
      .filter(Boolean); // Remove null values
    return finalBoughtItems;
  } catch (error) {
    console.error("Error fetching latest NFTs:", error);
    throw error;
  }
};

const useSharedDataLatest20BoughtNFTs = () => {
  return useReactQuery({
    queryKey: ["latestBoughtNFTs"],
    queryFn: fetchLatest20BoughtNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const fetchAllCawsNFTs = async () => {
  try {
    const data = await getCawsNfts();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedDataCawsNfts = () => {
  return useReactQuery({
    queryKey: ["cawsnfts"],
    queryFn: fetchAllCawsNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const fetchAllWodNFTs = async () => {
  try {
    const data = await getWodNfts();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedDataWodNfts = () => {
  return useReactQuery({
    queryKey: ["wodnfts"],
    queryFn: fetchAllWodNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const fetchAllTimepieceNFTs = async () => {
  try {
    const data = await getTimepieceNfts();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedDataTimepieceNfts = () => {
  return useReactQuery({
    queryKey: ["timepiecenfts"],
    queryFn: fetchAllTimepieceNFTs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const getListedNtsAsc = async () => {
  const ethNfts = await getListedNFTS(0, "", "payment_priceType", "ETH", "");
  let ethNftsAsc = ethNfts.sort((a, b) => {
    return a.price - b.price;
  });
  return ethNftsAsc;
};

const useSharedListedNtsAsc = () => {
  return useReactQuery({
    queryKey: ["payment_priceType"],
    queryFn: getListedNtsAsc,
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

const getAllnftsListed = async (wallet) => {
  if (wallet) {
    const listedNFTS = await getListedNFTS(0, "", "seller", wallet, "");
    return listedNFTS;
  } else return [];
};

const useSharedDataListedByUser = (wallet) => {
  return useReactQuery({
    queryKey: ["seller", wallet],
    queryFn: () => getAllnftsListed(wallet),
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!wallet,
  });
};

// In App.jsx or a separate WalletSync.js

function WalletSync() {
  const dispatch = useDispatch();
  const chain = useMatchChain();
  const { setWalletType, setWalletModal } = useWallet();
  const { useUserInfo } = Hooks;
  const { address: matchainAddress } = useUserInfo();

  // Watch account changes with cleanup
  useEffect(() => {
    const unwatch = watchAccount(wagmiClient, (account) => {
      console.log(
        "👀 WalletSync - Account changed:",
        account.status,
        account.address
      );

      switch (account.status) {
        case "connected":
          if (account.address && account.chainId) {
            console.log("✅ Wallet connected:", account.address);
            dispatch(setAddress(account.address));
            dispatch(setChainId(account.chainId));
            dispatch(setIsConnected(true));
            setWalletModal(false);
          }
          break;

        case "reconnecting":
          console.log("🔄 Wallet reconnecting... (blocking transactions)");
          dispatch(setIsConnected(false)); // Block transactions during reconnect
          break;

        case "connecting":
          console.log("🔌 Wallet connecting...");
          dispatch(setIsConnected(false)); // Block transactions while connecting
          break;

        case "disconnected":
          console.log("⚠️ Wallet disconnected - clearing Redux state");
          dispatch(setAddress(null));
          dispatch(setIsConnected(false));
          window.WALLET_TYPE = null;
          break;

        default:
          console.log("⚠️ Wallet disconnected - clearing Redux state");
          dispatch(setAddress(null));
          dispatch(setIsConnected(false));
          window.WALLET_TYPE = null;
          break;
      }
    });

    // Cleanup watcher on unmount
    return () => unwatch();
  }, [dispatch, setWalletModal]);

  // Watch connections to track active connections
  useEffect(() => {
    const unwatch = watchConnections(wagmiClient, {
      onChange(connections) {
        console.log(
          "🔗 Connections changed:",
          connections.length,
          "active connection(s)"
        );

        if (connections.length === 0) {
          console.log("⚠️ No active connections - clearing state");
          dispatch(setAddress(null));
          dispatch(setIsConnected(false));
          window.WALLET_TYPE = null;
        } else {
          // Get the active connection
          const activeConnection = connections[0];

          console.log("✅ Active connection:", activeConnection.connector.name);
          dispatch(setAddress(activeConnection.accounts[0]));
          dispatch(setChainId(activeConnection.chainId));
          dispatch(setIsConnected(true));
          setWalletModal(false);
          // Set wallet type based on connector
          if (activeConnection.connector.type === "binanceWallet") {
            window.WALLET_TYPE = "binance";
            setWalletType("binance");
          } else {
            window.WALLET_TYPE = activeConnection.connector.type;
            setWalletType(activeConnection.connector.type);
          }
        }
      },
    });

    // Cleanup watcher on unmount
    return () => unwatch();
  }, [dispatch, setWalletType, setWalletModal]);

  // Handle MatchID wallet separately (not managed by wagmi)
  useEffect(() => {
    if (matchainAddress) {
      console.log("✅ MatchID wallet detected:", matchainAddress);
      window.WALLET_TYPE = "matchId";
      setWalletType("matchId");
      dispatch(setChainId(chain.chainId));
      dispatch(setAddress(matchainAddress));
      dispatch(setIsConnected(true));
    }
  }, [matchainAddress, chain.chainId, dispatch, setWalletType]);

  // Handle window.ethereum events for account/chain changes (backwards compatibility)
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      console.log("🔄 window.ethereum - Account changed:", accounts[0]);
      if (!accounts[0]) {
        dispatch(setAddress(null));
        dispatch(setIsConnected(false));
      }
    };

    const handleChainChanged = (chainHex) => {
      const newChainId = parseInt(chainHex, 16);
      console.log("🔄 window.ethereum - Chain changed:", newChainId);
      dispatch(setChainId(newChainId));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [dispatch]);

  return null;
}

function AppRoutes() {
  const { email, logout: logoutAuth } = useAuth();
  const dispatch = useDispatch();
  const { connect, error } = useConnect();
  const chainId = useChainId();
  const [verifyWallet, { data: dataVerify }] = useMutation(VERIFY_WALLET);
  const [generateNonce, { data: dataNonce }] = useMutation(GENERATE_NONCE);
  const { data, refetch: refetchPlayer } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  const html = document.querySelector("html");

  const [orynPop, setOrynPop] = useState(true);
  const [loginListener, setloginListener] = useState(0);
  const [monthlyPlayers, setMonthlyPlayers] = useState(0);
  const [percent, setPercent] = useState(0);
  const [royaltyCount, setRoyaltyCount] = useState(0);
  const [betaModal, setBetaModal] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalVolumeNew, setTotalVolumeNew] = useState(0);
  const [wodHolders, setWodHolders] = useState(0);

  const [showForms2, setShowForms2] = useState(false);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [cawsListed, setcawsListed] = useState([]);
  const [wodListed, setwodListed] = useState([]);
  const [timepieceListed, settimepieceListed] = useState([]);

  const [mintloading, setmintloading] = useState("initial");
  const [mintStatus, setmintStatus] = useState("");
  const [textColor, settextColor] = useState("#fff");
  const [finalCaws, setFinalCaws] = useState([]);

  const [cawsToUse, setcawsToUse] = useState([]);

  const [limit, setLimit] = useState(0);

  const [allCawsForTimepieceMint, setAllCawsForTimepieceMint] = useState([]);
  const [myCAWstakes, setMyCAWstakes] = useState([]);
  const [timepieceMetadata, settimepieceMetadata] = useState([]);

  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);

  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);

  const [isBnb, setisBnb] = useState(false);

  const [socials, setSocials] = useState([]);
  const [isBnbSuccess, setisBnbSuccess] = useState(false);
  const [syncCount, setsyncCount] = useState(1);

  const [logoutCount, setlogoutCount] = useState(1);
  const [nftCount, setNftCount] = useState(1);
  const [countBalance, setcountBalance] = useState(1);

  const [ethTokenData, setEthTokenData] = useState(0);

  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);

  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [premiumOryn, setPremiumOryn] = useState(false);
  const [openedRoyaltyChest, setOpenedRoyaltyChest] = useState([]);
  const [royalChestIndex, setRoyalChestIndex] = useState();

  const [openedRoyaltyChestTaiko, setOpenedRoyaltyChestTaiko] = useState([]);

  const [royalChestIndexTaiko, setRoyalChestIndexTaiko] = useState();

  const [showSync, setshowSync] = useState(false);
  const [syncStatus, setsyncStatus] = useState("initial");
  const [bnbUSDPrice, setBnbUSDPrice] = useState(0);
  const [dogePrice, setDogePrice] = useState(0);
  const [isEOA, setIsEOA] = useState(true);

  const [isCheckedNewsLetter, setisCheckedNewsLetter] = useState(false);

  const [kickstarter, setKickstarter] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let taraxaLastDay = new Date("2025-12-13T14:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2025-07-10T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dogeLastDay = new Date("2024-03-21T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");
  let teaLastDay = new Date("2025-10-16T13:00:00.000+02:00");
  let bnbLastDay = new Date("2025-12-11T14:00:00.000+02:00");
  let coreLastDay = new Date("2025-04-04T14:00:00.000+02:00");
  let victionLastDay = new Date("2025-03-29T14:00:00.000+02:00");
  let coreLastDay2 = new Date("2025-12-12T14:00:00.000+02:00");
  let mantaLastDay = new Date("2025-08-13T14:00:00.000+02:00");
  let taikoLastDay = new Date("2025-08-02T14:00:00.000+02:00");
  let taikoLastDay2 = new Date("2025-12-06T14:00:00.000+02:00");
  let kucoinLastDay = new Date("2025-07-30T14:00:00.000+02:00");
  let cookieLastDay = new Date("2024-11-24T14:00:00.000+02:00");
  let chainlinkLastDay = new Date("2025-04-06T14:00:00.000+02:00");
  let seiLastDay = new Date("2025-08-18T14:00:00.000+02:00");
  let vanarLastDay = new Date("2026-01-14T14:00:00.000+02:00");
  let trustwalletLastDay = new Date("2026-01-29T14:00:00.000+02:00");

  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);

  const [loadingRecentListings, setLoadingRecentListings] = useState(false);

  const [corePrice, setCorePrice] = useState(0);
  const [victionPrice, setVictionPrice] = useState(0);
  const [vanarPrice, setvanarPrice] = useState(0);
  const [taikoPrice, setTaikoPrice] = useState(0);
  const [taraxaPrice, setTaraxaPrice] = useState(0);
  const [cookiePrice, setCookiePrice] = useState(0);
  const [immutablePrice, setImmutablePrice] = useState(0);
  const [kucoinPrice, setKucoinPrice] = useState(0);
  const [wodPrice, setWodPrice] = useState(0);
  const [mantaPrice, setMantaPrice] = useState(0);
  const [multiversPrice, setmultiversPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [trustPrice, setTrustPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);
  const [seiPrice, setSeiPrice] = useState(0);
  const [wodBalance, setwodBalance] = useState(0);
  const [nftPools, setnftPools] = useState([]);
  const [tokenPools, settokenPools] = useState([]);
  const [userPools, setUserPools] = useState([]);
  const [stakeCount, setstakeCount] = useState(0);
  const [nftTvl, setnftTvl] = useState(0);

  // const [gameAccount, setGameAccount] = useState();

  const userId = data?.getPlayer?.playerId;
  const username = data?.getPlayer?.displayName;
  const userWallet = data?.getPlayer?.wallet?.publicAddress;
  const authToken = localStorage.getItem("authToken");
  const chain = useMatchChain();

  const { wallet, setWalletModal, setWalletType, setWalletId } = useWallet();
  // const { disconnect } = useDisconnect();
  const { connector } = getAccount(wagmiClient);

  const walletAddressSelector = (state) => state.wallet.address;
  const walletConnectedSelector = (state) => state.wallet.isConnected;
  const walletChainIdSelector = (state) => state.wallet.chainId;
  const isPremiumSelector = (state) => state.user.userProgress.isPremium;
  let coinbase = useSelector(walletAddressSelector);
  let isConnected = useSelector(walletConnectedSelector);
  let networkId = useSelector(walletChainIdSelector);
  let isPremium = useSelector(isPremiumSelector);

  const getCawsSold = async () => {
    const allSold = latest20BoughtNFTS;
    if (allSold && allSold.length > 0) {
      let cawsFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      let uniqueCaws = cawsFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let wodFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      let uniqueWod = wodFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let timepieceFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );

      let uniqueTimepiece = timepieceFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      setCawsBought(uniqueCaws);
      setLandBought(uniqueWod);
      setTimepieceBought(uniqueTimepiece);
    }
  };

  const { data: allCawsNfts } = useSharedDataCawsNfts();
  const { data: allWodNfts } = useSharedDataWodNfts();
  const { data: allTimepieceNfts } = useSharedDataTimepieceNfts();
  const { data: lowestPriceNftListed } = useSharedListedNtsAsc();
  const { data: allListedByUser } = useSharedDataListedByUser(coinbase);
  const { isPending: loadingRecentSales, data: latest20BoughtNFTS } =
    useSharedDataLatest20BoughtNFTs();

  const { data: recentListedNFTS2 } = useSharedDataListedNfts();
  const { data: allNfts } = useSharedData();
  const getOtherNfts = async () => {
    let finalboughtItems1 = [];
    setLoadingRecentListings(true);

    finalboughtItems1 = allNfts;

    if (finalboughtItems1 && finalboughtItems1.length > 0) {
      setListedNFTS(finalboughtItems1);
      setListedNFTSCount(finalboughtItems1.length);
    } else {
      setListedNFTS([]);
      setListedNFTSCount([]);
    }
    if (recentListedNFTS2 && recentListedNFTS2.length > 0) {
      const updatedItems = await Promise.all(
        recentListedNFTS2.map(async (nft) => {
          return {
            ...nft,
            type:
              nft.nftAddress === window.config.nft_timepiece_address
                ? "timepiece"
                : nft.nftAddress === window.config.nft_land_address
                ? "land"
                : "caws",
            chain: 1,
          };
        })
      );

      setLatest20RecentListedNFTS(updatedItems);
      setLoadingRecentListings(false);
    } else {
      setLatest20RecentListedNFTS([]);
      setLoadingRecentListings(false);
    }
  };

  const fetchCawsNfts = async () => {
    const cawsNft = allCawsNfts;
    if (cawsNft && cawsNft.length > 0) {
      let cawsNft_ETH = cawsNft.filter((item) => item.payment_priceType === 0);
      let latestCaws = cawsNft_ETH.sort((a, b) => {
        return (
          new Date(Number(b.blockTimestamp) * 1000) -
          new Date(Number(a.blockTimestamp) * 1000)
        );
      });
      setcawsListed(latestCaws);
    }
  };

  const fetchLandNfts = async () => {
    const wodNft = allWodNfts;
    if (wodNft && wodNft.length > 0) {
      let wodNft_ETH = wodNft.filter((item) => item.payment_priceType === 0);
      let latestWod = wodNft_ETH.sort((a, b) => {
        return (
          new Date(Number(b.blockTimestamp) * 1000) -
          new Date(Number(a.blockTimestamp) * 1000)
        );
      });
      setwodListed(latestWod);
    }
  };

  const fetchTimepieceNfts = async () => {
    const timepieceNft = allTimepieceNfts;
    if (timepieceNft && timepieceNft.length > 0) {
      let timepieceNft_ETH = timepieceNft.filter(
        (item) => item.payment_priceType === 0
      );
      let latestTimepiece = timepieceNft_ETH.sort((a, b) => {
        return (
          new Date(Number(b.blockTimestamp) * 1000) -
          new Date(Number(a.blockTimestamp) * 1000)
        );
      });

      settimepieceListed(latestTimepiece);
    }
  };

  const handleSkaleRefill = async (address) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/claim/${address}`)
      .catch((e) => {
        console.error(e);
      });

    console.log(result);
  };

  const fetchSkaleBalance = async () => {
    const { address, chainId, isConnected } = getAccount(wagmiClient);

    if (!isConnected || !address) return;
    if (chainId !== 1482601649) return;

    const balanceBigInt = await getBalance(wagmiClient, {
      address,
    });

    const formattedAmount = parseFloat(formatEther(balanceBigInt.value));

    if (formattedAmount <= 0.000005) {
      handleSkaleRefill(address);
    } else {
      console.log("formatted_amount", formattedAmount);
    }
  };

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data && result.data !== "NAN") {
        localStorage.setItem("cachedTvl", result.data);
      }
    }
  };

  const checkIfEOA = async (address) => {
    try {
      if (!address) return;

      const bytecode = await getBytecode(wagmiClient, { address });

      const isEOA = !bytecode || bytecode === "0x";
      setIsEOA(isEOA);
      // return isEOA; // true = EOA, false = contract
    } catch (error) {
      console.error(error);
    }
  };

  const { user, setUserStats, setUserNFTs } = useUser();
  const { useUserInfo, useWallet: useWalletMatchain } = Hooks;
  const {
    address: matchainAddress,
    login: loginMatchain,
    logout: logoutMatchain,
  } = useUserInfo();
  const { signMessage, createWalletClient } = useWalletMatchain();
  const walletClient = createWalletClient({
    chain: chain?.chain,
    transport: http(`${chain?.chain?.rpcUrls?.default?.http[0]}`),
  });

  const publicClient = createPublicClient({
    chain: chain?.chain,
    transport: http(`${chain?.chain?.rpcUrls?.default?.http[0]}`),
  });

  // Wagmi clients for non-MatchID wallets
  const wagmiWalletClient = createWalletClientWagmi({
    chain: bsc,
    transport: window.ethereum
      ? custom(window.ethereum)
      : http("https://bsc-dataseed.binance.org/"),
  });

  const wagmiPublicClient = createPublicClient({
    chain: bsc,
    transport: http("https://bsc-dataseed.binance.org/"),
  });

  const handleLogout = async () => {
    logoutAuth();
    refetchPlayer();
  };
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

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

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

  const fetchRecordsStar = async () => {
    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 100,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);

    // setStarRecords(result.data.data.leaderboard);
    fillRecordsStar(result.data.data.leaderboard);
  };

  const treasureHuntEvents = [
    // {
    //   title: "MultiversX",
    //   logo: multiversLogo,
    //   eventStatus: "Live",
    //   totalRewards: "$20,000 in EGLD Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Find",
    //   eventDate: "Jul 01, 2024",
    //   backgroundImage: multiversBg,
    //   popupInfo: {
    //     title: "MultiversX",
    //     chain: "MultiversX Chain",
    //     linkState: "multiversx",
    //     rewards: "EGLD",
    //     status: "Live",
    //     id: "event16",
    //     eventType: "Explore & Find",
    //     totalRewards: "$20,000 in EGLD Rewards",
    //     eventDuration: coreLastDay,
    //     minRewards: "1",
    //     maxRewards: "100",
    //     minPoints: "5,000",
    //     maxPoints: "50,000",
    //     learnMore:
    //       "",
    //     eventDate: "Jul 01, 2024",
    //   },
    // },

    {
      title: "BNB Chain",
      logo: "https://cdn.worldofdypians.com/wod/bnbIcon.svg",
      eventStatus: "Live",
      totalRewards: "$30,000 in BNB Rewards",
      rewardAmount: "$30,000",
      myEarnings: 0.0,
      location: [-0.06735561726792588, 0.08666753768920898],
      eventType: "Explore & Mine",
      eventDate: "Aug 13, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingBnb.png",
      userEarnUsd: user.userStats.bnbEarnUsd,
      userEarnCrypto: user.userStats.bnbEarnToken,
      userEarnPoints: user.userStats.bnbPoints,
      image: "bnbBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      rewardType: "BNB",

      marker: markers.treasureMarker,
      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "bnb",
        rewards: "BNB",
        status: "Live",
        id: "event20",
        eventType: "Explore & Mine",
        totalRewards: "$30,000 in BNB Rewards",
        eventDuration: bnbLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 13, 2025",
        detailsText: `To participate in the event, players are required to
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the BNB
                  Chain area, players not only stand a chance to secure daily
                  rewards in BNB, but also earn points for their placement on
                  the global leaderboard. Remember to log in to the game daily 
                  and venture into the BNB Chain area to uncover hidden
                  treasures.`,
        about: `BNB Chain is a high-performance blockchain designed to support the
            expansive growth of decentralized applications. It offers a robust
            infrastructure that combines high throughput, low latency, and low
            fees, making it the ideal platform for DeFi, NFTs, and gaming. With
            BNB Chain, developers can leverage advanced functionalities such as
            cross-chain compatibility, on-chain governance, and scalable smart
            contracts. The ecosystem empowers projects to build and scale
            efficiently, ensuring fast, secure, and decentralized solutions
            without compromising on user experience or innovation.`,
        twitterLink: "https://x.com/BNBChain",
        telegramLink: "https://t.me/bnbchain",
        websiteLink: "https://www.bnbchain.org/en",
        thumbImage: "https://cdn.worldofdypians.com/wod/bnbPopupImage.png",
      },
    },
    {
      title: "Trust Wallet",
      logo: "https://cdn.worldofdypians.com/wod/trustwalletBuyWod.svg",
      eventStatus: "Live",
      totalRewards: "$20,000 in TWT Rewards",
      rewardAmount: "$20,000",
      myEarnings: 0.0,
      location: [-0.06912771797944854, 0.0847846269607544],
      eventType: "Explore & Mine",
      eventDate: "Oct 01, 2025",
      backgroundImage:
        "https://cdn.worldofdypians.com/wod/trustwalletEventBg.webp",
      userEarnUsd: user.userStats.trustEarnUsd,
      userEarnCrypto: user.userStats.trustEarnToken,
      userEarnPoints: user.userStats.trustPoints,
      image: "trustwalletBanner.webp",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      rewardType: "TWT",

      marker: markers.treasureMarker,
      popupInfo: {
        title: "Trust Wallet",
        chain: "BNB Chain",
        linkState: "trust",
        rewards: "TWT",
        status: "Live",
        id: "event200",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in TWT Rewards",
        eventDuration: trustwalletLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Oct 01, 2025",
        detailsText: `To participate in the event, players are required to own at
                least one of the Beta Pass NFTs (opBNB Beta Pass or BNB Chain Beta Pass).
                   You can get the opBNB Beta Pass or BNB Chain Beta Pass NFT from the World of Dypians Shop.
                    By engaging in the game on a daily basis and exploring the Trustwallet area,
                     players not only stand a chance to secure daily
                  rewards, but also earn points for their placement on
                  the global leaderboard. Remember to log in to the game daily 
                  and venture into the Trustwalle area to uncover hidden
                  treasures.`,
        about: ` Trust Wallet is a secure multi-chain self-custody wallet and your
           gateway to 10+ million digital assets, NFTs, and thousands of Web3
          dApps.`,
        twitterLink: "https://x.com/TrustWallet",
        telegramLink: "https://t.me/trustwallet",
        websiteLink: "https://trustwallet.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/trustwalletThumb.webp",
      },
    },
    {
      title: "Tea-Fi",
      logo: "https://cdn.worldofdypians.com/wod/teafi.svg",
      eventStatus: "Expired",
      totalRewards: "$50,000 in TEA Rewards",
      myEarnings: 0.0,
      rewardAmount: "$50,000",
      location: [-0.06892739063903598, 0.08374929428100586],
      eventType: "Explore & Mine",
      eventDate: "Jul 18, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/teafiEventBg.webp",
      userEarnUsd: user.userStats.teaEarnUsd,
      userEarnCrypto: user.userStats.teaEarnToken,
      userEarnPoints: user.userStats.teaPoints,
      image: "teafiBuilderBanner.webp",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      rewardType: "TEA",
      marker: markers.treasureMarker,
      popupInfo: {
        title: "Tea-Fi",
        chain: "BNB Chain",
        linkState: "tea-fi",
        rewards: "TEA",
        status: "Expired",
        id: "event4",
        eventType: "Explore & Mine",
        totalRewards: "$50,000 in TEA Rewards",
        eventDuration: teaLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Jul 18, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Tea-Fi Beta Pass NFT</b>. You can get the Tea-Fi
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Tea-Fi area,
                  players not only stand a chance to secure daily rewards in
                  TEA, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Tea-Fi area to uncover hidden treasures.`,
        about: ` Tea-Fi eliminates the hassle of crypto management by providing a
            seamless, all-in-one platform to manage and grow digital assets. Its
            Yield Engine offers effortless access to tailored growth
            opportunities by integrating a wide variety of yield tools into a
            unified ecosystem.`,
        twitterLink: "https://x.com/TeaFi_Official",
        telegramLink: "https://t.me/TeaFi_Official",
        websiteLink: "https://tea-fi.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/teafiThumb.webp",
      },
    },
    {
      title: "Vanar",
      logo: "https://cdn.worldofdypians.com/wod/vanar.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in VANRY Rewards",
      location: [-0.06784377896887378, 0.0839531421661377],
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "May 19, 2025",
      type: "Treasure Hunt",
      rewardType: "VANRY",
      rewardAmount: "$20,000",
      infoType: "Treasure Hunt",
      backgroundImage: "https://cdn.worldofdypians.com/wod/vanarEventBg.webp",
      image: "vanarArea.webp",
      userEarnUsd: 0,
      userEarnCrypto: 0,
      userEarnPoints: 0,
      popupInfo: {
        title: "Vanar",
        chain: "Vanar Network",
        linkState: "vanar",
        rewards: "VANRY",
        status: "Expired",
        id: "event2",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in VANRY Rewards",
        eventDuration: vanarLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "May 19, 2025",
        detailsText: `To participate in the event, players are required to
                  <b>hold a Vanar Beta Pass NFT</b>. You can get the Vanar Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                 game on a daily basis and exploring the Vanar area, players
                  not only stand a chance to secure daily rewards in VANRY, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Vanar area to uncover hidden treasures.`,
        about: ` Vanar offers a suite of solutions for brands built on years of
            experience. From new engagement experiences to AI-driven IP
           tracking.`,
        twitterLink: "https://x.com/vanarchain",
        telegramLink: "https://t.me/vanarofficial",
        websiteLink: "https://vanarchain.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/vanarThumb.webp",
      },
    },
    {
      title: "Matchain",
      logo: "https://cdn.worldofdypians.com/wod/matchainIcon.svg",
      eventStatus: "Expired",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.06787060104021504, 0.08728981018066406],
      image: "matchainBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 04, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/matchainMintBg.webp",
      userEarnUsd: user.userStats.matEarnUsd,
      userEarnCrypto: user.userStats.matEarnToken,
      userEarnPoints: user.userStats.matPoints,
      popupInfo: {
        title: "Matchain",
        chain: "Matchain",
        linkState: "matchain",
        rewards: "BNB",
        status: "Expired",
        id: "event25",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: coreLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Dec 04, 2024",
        detailsText: ` To participate in the event, players are required to&nbsp;
                  <b>hold a Matchain Beta Pass NFT</b>. You can get the Matchain
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Matchain area,
                  players not only stand a chance to secure daily rewards in
                  MAT, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Matchain area to uncover hidden treasures.`,
        about: `Matchain is a decentralized AI blockchain focused on data and
            identity sovereignty, utilizing advanced AI for data aggregation,
            analytics, and user profiling to enhance decentralized identity
            solutions and data management.`,
        twitterLink: "https://x.com/matchain_io",
        telegramLink: "https://t.me/matchain_fam",
        websiteLink: "https://www.matchain.io/",
        thumbImage:
          "https://cdn.worldofdypians.com/wod/eventPopupImageMatchain.webp",
      },
    },
    {
      title: "Base",
      logo: "https://cdn.worldofdypians.com/wod/base.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in ETH Rewards",
      location: [-0.0694799252930712, 0.08724689483642578],
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Mar 12, 2025",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingBase2.webp",
      image: "baseBanner.png",
      userEarnUsd: 0,
      userEarnCrypto: 0,
      userEarnPoints: 0,
      popupInfo: {
        title: "Base",
        chain: "Base",
        linkState: "base",
        rewards: "ETH",
        status: "Expired",
        id: "event24",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in ETH Rewards",
        eventDuration: baseLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Mar 12, 2025",
        detailsText: ` To participate in the event, players are required to&nbsp;
                 <b>hold a Base Beta Pass NFT</b>. You can get the Base Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the downtown area, players
                  not only stand a chance to secure daily rewards in ETH, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the downtown area to uncover hidden treasures.`,
        about: `Base is built as an Ethereum L2, with the security, stability,
        and scalability you need to power your dapps.Base is an easy way for decentralized
        apps to leverage Coinbase's products and distribution. Seamless Coinbase integrations,
        easy fiat onramps, and access to the $130B assets on platform in the Coinbase ecosystem.`,
        twitterLink: "https://twitter.com/buildonbase",
        telegramLink: "https://base.org/discord",
        websiteLink: "https://base.org/",
        thumbImage:
          "https://cdn.worldofdypians.com/wod/eventPopupImageBase.png",
      },
    },
    {
      title: "KuCoin",
      logo: "https://cdn.worldofdypians.com/wod/kucoinLogoRound.svg",
      eventStatus: "Expired",
      rewardType: "KCS",
      rewardAmount: "$20,000",
      location: [-0.06778661442929296, 0.08464515209198],
      image: "kucoinBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in KCS Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 01, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/kucoinBg.png",
      userEarnUsd: user.userStats.kucoinEarnUsd,
      userEarnCrypto: user.userStats.kucoinEarnToken,
      userEarnPoints: user.userStats.kucoinPoints,
      popupInfo: {
        title: "KuCoin",
        chain: "opBNB Chain",
        linkState: "kucoin",
        rewards: "KCS",
        status: "Expired",
        id: "event29",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in KCS Rewards",
        eventDuration: kucoinLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Apr 01, 2025",
        detailsText: ` To participate in the event, players are required to&nbsp;
                  <b>hold a KuCoin Beta Pass NFT</b>. You can get the KuCoin
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the KuCoin area,
                  players not only stand a chance to secure daily rewards in
                  KCS, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the KuCoin area to uncover hidden treasures.`,
        about: `Kucoin is a Seychelles-based cryptocurrency exchange. It was founded
            in China in 2017, but was later moved to Singapore following the
            Chinese government's restrictions on cryptocurrency companies, and
            subsequently to the Seychelles. Kucoin also operates its own crypto
            token known as Kucoin Shares.`,
        twitterLink: "https://x.com/KuCoinCom",
        telegramLink: "https://t.me/Kucoin_Exchange",
        websiteLink: "https://www.kucoin.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/kucoinThumb.png",
      },
    },
    {
      title: "Taiko",
      logo: "https://cdn.worldofdypians.com/wod/taiko.svg",
      eventStatus: "Live",
      rewardType: "TAIKO",
      rewardAmount: "$20,000",
      location: [-0.06942812516951939, 0.08510112762451173],
      image: "taikoBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in TAIKO Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 08, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/taikoBg.webp",
      userEarnUsd: user.userStats.taikoEarnUsd,
      userEarnCrypto: user.userStats.taikoEarnToken,
      userEarnPoints: user.userStats.taikoPoints,
      popupInfo: {
        title: "TAIKO",
        chain: "Taiko",
        linkState: "taiko",
        rewards: "TAIKO",
        status: "Live",
        id: "event22",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in TAIKO Rewards",
        eventDuration: taikoLastDay2,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 08, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Taiko Beta Pass NFT</b>. You can get the Taiko Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Taiko area, players
                  not only stand a chance to secure daily rewards in ETH, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Taiko area to uncover hidden treasures.`,
        about: `Taiko is an Ethereum-equivalent (Type 1) ZK-EVM, maximally
            compatible with Ethereum. No additional compiling, reaudits, or
            tooling needed. Everything works out of the box, guaranteed.`,
        twitterLink: "https://x.com/taikoxyz",
        telegramLink: "https://t.me/TaikoEcosystem",
        websiteLink: "https://taiko.xyz/",
        thumbImage: "https://cdn.worldofdypians.com/wod/taikoThumb.webp",
      },
    },
    {
      title: "Taraxa",
      logo: "https://cdn.worldofdypians.com/wod/taraxa.svg",
      eventStatus: "Live",
      rewardType: "TARA",
      rewardAmount: "$20,000",
      location: [-0.06917415368919773, 0.08433401584625246],
      image: "taraxaArea.webp",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in TARA Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 15, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/taraxaEventBg.webp",
      userEarnUsd: user.userStats.taraxaEarnUsd,
      userEarnCrypto: user.userStats.taraxaEarnToken,
      userEarnPoints: user.userStats.taraxaPoints,
      popupInfo: {
        title: "Taraxa",
        chain: "Taraxa",
        linkState: "taraxa",
        rewards: "TARA",
        status: "Live",
        id: "event30",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in TARA Rewards",
        eventDuration: taraxaLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 15, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Taraxa Beta Pass NFT</b>. You can get the Taraxa
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Taraxa area,
                  players not only stand a chance to secure daily rewards in
                  Taraxa, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Taraxa area to uncover hidden treasures.`,
        about: `Taraxa is a public, EVM-compatible blockchain designed to support
            fast, scalable, and cost-efficient decentralized applications
            (dApps). It was originally created to address audit logging for
            off-chain data and real-world events, but has since evolved into a
            general-purpose platform.`,
        twitterLink: "https://x.com/taraxa_project",
        telegramLink: "https://t.me/taraxa_project",
        websiteLink: "https://taraxa.io/",
        thumbImage: "https://cdn.worldofdypians.com/wod/taraxaThumb.webp",
      },
    },
    {
      title: "CoinGecko",
      image: "coingeckoBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 03, 2024",
      backgroundImage:
        "https://cdn.worldofdypians.com/wod/coingeckoUpcoming.png",
      userEarnUsd: user.userStats.userEarnUsd,
      userEarnCrypto: user.userStats.userEarnETH,
      userEarnPoints: user.userStats.userPoints,
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Expired",
        id: "event3",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: taikoLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        // learnMore:
        //   "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
        learnMore: "",
        eventDate: "Dec 03, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a CoinGecko Beta Pass NFT</b>. You can get the
                  CoinGecko Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  CoinGecko area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the CoinGecko area to uncover hidden
                  treasures.`,
        about: `CoinGecko is the world's largest independent cryptocurrency data
            aggregator with over 10,000+ different cryptoassets tracked across
            more than 800+ exchanges worldwide. CoinGecko provides a fundamental
            analysis of the digital currency market. In addition to tracking
            price, volume, and market capitalization, CoinGecko tracks community
            growth, open source code development, major events, and on-chain
            metrics.`,
        twitterLink: "https://x.com/coingecko",
        telegramLink: "https://t.me/coingecko",
        websiteLink: "https://www.coingecko.com/",
        thumbImage:
          "https://cdn.worldofdypians.com/wod/eventPopupImageGecko.png",
      },
    },
    {
      title: "Immutable",
      logo: "https://cdn.worldofdypians.com/wod/immutable.svg",
      eventStatus: "Expired",
      rewardType: "IMX",
      rewardAmount: "$20,000",
      location: [-0.05935191046684262, 0.03785133361816407],
      image: "immutableBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in IMX Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Nov 29, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/immutableBg.webp",
      userEarnUsd: user.userStats.immutableEarnUsd,
      userEarnCrypto: user.userStats.immutableEarnToken,
      userEarnPoints: user.userStats.immutablePoints,

      popupInfo: {
        title: "Immutable",
        chain: "Immutable",
        linkState: "immutable",
        rewards: "IMX",
        status: "Expired",
        id: "event15",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in IMX Rewards",
        eventDuration: victionLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "https://medium.com/@worldofdypians/625a2926c94b",
        eventDate: "Nov 29, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Immutable Beta Pass NFT</b>. You can get the
                  Immutable Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Immutable area, players not only stand a chance to secure
                  daily rewards in IMX, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Immutable area to uncover hidden
                  treasures.`,
        about: `Immutable is a global leader in gaming on a mission to bring
            digital ownership to every player by making it safe and easy to
            build great web3 games.`,
        twitterLink: "https://twitter.com/Immutable",
        telegramLink: "https://discord.gg/CYsjMdctsP",
        websiteLink: "https://www.immutable.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/immutableThumb.png",
      },
    },
    {
      title: "CORE",
      logo: "https://cdn.worldofdypians.com/wod/core.svg",
      eventStatus: "Live",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 14, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/coreBg.webp",
      image: "coreBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      location: [-0.06862698344579729, 0.08752048015594482],
      marker: markers.treasureMarker,
      userEarnUsd: user.userStats.coreEarnUsd,
      userEarnCrypto: user.userStats.coreEarnToken,
      userEarnPoints: user.userStats.corePoints,
      popupInfo: {
        title: "CORE",
        chain: "CORE Chain",
        linkState: "core",
        rewards: "CORE",
        status: "Live",
        id: "event12",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in CORE Rewards",
        eventDuration: coreLastDay2,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 14, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a CORE Beta Pass NFT</b>. You can get the CORE Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the CORE area, players not
                  only stand a chance to secure daily rewards in CORE, but also
                  earn points for their placement on the global leaderboard.
                  Remember to log in to the game daily and venture into the
                  CORE area to uncover hidden treasures.`,
        about: `Core DAO started as a community looking for better solutions,
            and that's what it remains. With principles grounded in the
            premises of both Bitcoin and Ethereum, our power comes from
            embracing multiple ideas and communities. The opposite of a
            winner-take-all mentality - Core is focused instead on platform
            growth and driving the global adoption of blockchain technology.`,
        twitterLink: "https://twitter.com/Coredao_Org",
        telegramLink: "https://t.me/CoreDAOTelegram",
        websiteLink: "https://coredao.org/",
        thumbImage: "https://cdn.worldofdypians.com/wod/coreThumb.png",
      },
    },
    {
      title: "SEI",
      logo: "https://cdn.worldofdypians.com/wod/seiLogo.svg",
      eventStatus: "Expired",
      rewardType: "SEI",
      rewardAmount: "$20,000",
      location: [-0.06734488843929015, 0.08361518383026124],
      image: "seiBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in SEI Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 18, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/seiBg.webp",
      userEarnUsd: user.userStats.seiEarnUsd,
      userEarnCrypto: user.userStats.seiEarnToken,
      userEarnPoints: user.userStats.seiEarnPoints,
      popupInfo: {
        title: "SEI",
        chain: "Sei Network",
        linkState: "sei",
        rewards: "SEI",
        status: "Expired",
        id: "event13",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SEI Rewards",
        eventDuration: seiLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Apr 18, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a SEI Beta Pass NFT</b>. You can get the SEI Beta Pass
                  NFT from the World of Dypians Shop. By engaging in the game on
                  a daily basis and exploring the SEI area, players not only
                  stand a chance to secure daily rewards in SEI, but also earn
                  points for their placement on the global leaderboard. Remember
                  to log in to the game daily and venture into the SEI area to
                  uncover hidden treasures.`,
        about: `Sei is at the pinnacle of high-speed blockchain platforms, ideal
            for web2 like experiences, high-frequency trading and real-time
            digital exchanges.`,
        twitterLink: "https://x.com/SeiNetwork",
        telegramLink: "https://t.me/seinetwork?ref=blog.sei.io",
        websiteLink: "https://www.sei.io/",
        thumbImage: "https://cdn.worldofdypians.com/wod/seiThumb.png",
      },
    },
    {
      title: "Chainlink",
      logo: "https://cdn.worldofdypians.com/wod/chainlinkIcon.svg",
      eventStatus: "Expired",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.06912771797944854, 0.0847846269607544],
      image: "chainlinkBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 06, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/chainlinkBg.webp",
      userEarnUsd: user.userStats.chainlinkEarnUsd,
      userEarnCrypto: user.userStats.chainlinkEarnToken,
      userEarnPoints: user.userStats.chainlinkEarnPoints,
      popupInfo: {
        title: "Chainlink",
        chain: "BNB Chain",
        linkState: "chainlink",
        rewards: "BNB",
        status: "Expired",
        id: "event28",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: chainlinkLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Dec 06, 2024",
        detailsText: ` To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Chainlink area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Chainlink area to uncover hidden
                  treasures.`,
        about: `Chainlink connects existing systems to any public or private
            blockchain and enables secure cross-chain communication. World-class
            developer experience.`,
        twitterLink: "https://x.com/chainlink",
        telegramLink: "https://t.me/chainlinkofficial",
        websiteLink: "https://chain.link/",
        thumbImage: "https://cdn.worldofdypians.com/wod/chainlinkThumb.webp",
      },
    },
    {
      title: "Easy2Stake",
      logo: "https://cdn.worldofdypians.com/wod/easy2stakeLogo.svg",
      eventStatus: "Expired",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.05935191046684262, 0.03785133361816407],

      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Nov 29, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/easy2stakeBg.webp",
      userEarnUsd: user.userStats.easy2StakeEarnUsd,
      userEarnCrypto: user.userStats.easy2StakeEarnToken,
      userEarnPoints: user.userStats.easy2StakePoints,
      image: "easy2stakeBanner.png",

      popupInfo: {
        title: "Easy2Stake",
        chain: "BNB Chain",
        linkState: "easy2stake",
        rewards: "BNB",
        status: "Expired",
        id: "event26",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: victionLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Nov 29, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Easy2Stake area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Easy2Stake area to uncover hidden
                  treasures.`,
        about: `Easy2Stake is a trusted staking service provider that enables
            secure and efficient staking for multiple blockchains, ensuring
            users can earn rewards while supporting web3 ecosystems.`,
        twitterLink: "https://x.com/easy2stake",
        telegramLink: "https://t.me/easy2stake",
        websiteLink: "https://www.easy2stake.com",
        thumbImage: "https://cdn.worldofdypians.com/wod/easy2stakeThumb.webp",
      },
    },
    {
      title: "Midle",
      logo: "https://cdn.worldofdypians.com/wod/midle.svg",
      eventStatus: "Expired",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.05935191046684262, 0.03785133361816407],
      image: "midleBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Nov 29, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/midleBg.webp",
      userEarnUsd: user.userStats.midleEarnUsd,
      userEarnCrypto: user.userStats.midleEarnToken,
      userEarnPoints: user.userStats.midlePoints,

      popupInfo: {
        title: "Midle",
        chain: "BNB Chain",
        linkState: "midle",
        rewards: "BNB",
        status: "Expired",
        id: "event27",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: victionLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Nov 29, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the Midle
                  area, players not only stand a chance to secure daily rewards
                  in BNB, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Midle area to uncover hidden treasures.`,
        about: `Midle is the web and mobile app that boosts user acquisition,
            retention and engagement.`,
        twitterLink: "https://x.com/midle_official",
        telegramLink: "https://t.me/midlecommunity",
        websiteLink: "https://app.midle.io/",
        thumbImage: "https://cdn.worldofdypians.com/wod/midleThumb.webp",
      },
    },
    {
      title: "Cookie3",
      logo: "https://cdn.worldofdypians.com/wod/cookie3.svg",
      eventStatus: "Expired",
      rewardType: "COOKIE",
      rewardAmount: "$20,000",
      location: [-0.06787060104021504, 0.08728981018066406],
      image: "cookie3Banner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in COOKIE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 26, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/cookieBg.webp",
      userEarnUsd: user.userStats.cookieEarnUsd,
      userEarnCrypto: user.userStats.cookieEarnToken,
      userEarnPoints: user.userStats.cookiePoints,
      popupInfo: {
        title: "Cookie3",
        chain: "BNB Chain",
        linkState: "cookie3",
        rewards: "Cookie3",
        status: "Expired",
        id: "event23",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in COOKIE Rewards",
        eventDuration: cookieLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 26, 2024",
        detailsText: ` To participate in the event, players are required to&nbsp;
                  <b>hold a Cookie3 Beta Pass NFT</b>. You can get the Cookie3
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Cookie3 area,
                  players not only stand a chance to secure daily rewards in
                  COOKIE, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Cookie3 area to uncover hidden treasures.`,
        about: `Cookie3 is the first MarketingFi protocol and AI-powered data
            layer, built to revolutionize how users, creators, and businesses
            interact. By leveraging AI and blockchain, Cookie3 enhances
            marketing strategies and data insights, empowering everyone in the
            digital ecosystem to thrive with smarter, more efficient tools.`,
        twitterLink: "https://x.com/cookie3_com",
        telegramLink: "https://t.me/cookie3_co",
        websiteLink: "https://www.cookie3.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/cookie3Thumb.png",
      },
    },
    {
      title: "VICTION",
      logo: "https://cdn.worldofdypians.com/wod/viction.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in VIC Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Nov 29, 2024",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      backgroundImage: "https://cdn.worldofdypians.com/wod/victionBg.webp",
      image: "victionBanner.png",
      userEarnUsd: user.userStats.victionEarnUsd,
      userEarnCrypto: user.userStats.victionEarnToken,
      userEarnPoints: user.userStats.victionPoints,
      popupInfo: {
        title: "VICTION",
        chain: "VICTION Chain",
        linkState: "viction",
        rewards: "VIC",
        status: "Expired",
        id: "event14",
        eventType: "Explore & Find",
        totalRewards: "$20,000 in VIC Rewards",
        eventDuration: victionLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Nov 29, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Viction Beta Pass NFT</b>. You can get the Viction
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Viction area,
                  players not only stand a chance to secure daily rewards in
                  VIC, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Viction area to uncover hidden treasures.`,
        about: `Viction, previously known as TomoChain, is a people-centric
            layer-1 blockchain that provides zero-gas transactions and
            heightened security, making Web3 accessible and safe for everyone.
            With a design emphasis on user experience, Viction prioritizes
            zero-gas transactions through the innovative TRC25 token standard,
            alongside speed, security, and scalability, all contributing to a
            more secure and open world.`,
        twitterLink: "https://viction.link/twitter",
        telegramLink: "https://viction.link/telegram",
        websiteLink: "https://www.viction.xyz/",
        thumbImage: "https://cdn.worldofdypians.com/wod/victionThumb.png",
      },
    },
    {
      title: "Manta",
      logo: "https://cdn.worldofdypians.com/wod/mantaLogoBig.png",
      eventStatus: "Expired",
      rewardType: "MANTA",
      rewardAmount: "$20,000",
      location: [-0.07001821071588557, 0.08503675460815431],
      image: "mantaBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in MANTA Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 15, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/mantaMintBg.webp",
      userEarnUsd: user.userStats.mantaEarnUsd,
      userEarnCrypto: user.userStats.mantaEarnToken,
      userEarnPoints: user.userStats.mantaPoints,
      popupInfo: {
        title: "Manta",
        chain: "Manta",
        linkState: "manta",
        rewards: "MANTA",
        status: "Expired",
        id: "event21",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in MANTA Rewards",
        eventDuration: mantaLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Apr 15, 2025",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Manta Beta Pass NFT</b>. You can get the Manta Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Manta area, players
                  not only stand a chance to secure daily rewards in MANTA, but
                  also earn points for their placement on the global leaderboard.
                  Remember to log in to the game daily and venture into the
                  Manta area to uncover hidden treasures.`,
        about: `Manta is the multi-modular ecosystem for zero-knowledge (ZK)
            applications. Manta was created by a team of experienced founders
            from prestigious institutions, including Harvard, MIT, and
            Algorand. Manta has received investments from many top web3
            investment funds, including Binance Labs and Polychain Capital. It
            has grown through participation in the best web3 accelerators,
            including Alliance DAO and Berkeley Blockchain Xcelerator. Manta is
            poised to bring the next generation of web3 users and usher in a
            new chapter of web3 zkApp applications.`,
        twitterLink: "https://x.com/mantanetwork",
        telegramLink: "https://www.t.me/mantanetworkofficial",
        websiteLink: "https://manta.network/",
        thumbImage: "https://cdn.worldofdypians.com/wod/mantaThumb.png",
      },
    },
    {
      title: "SKALE",
      logo: "https://cdn.worldofdypians.com/wod/skaleIcon.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in SKL Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 03, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingSkale.webp",
      userEarnUsd: user.userStats.skaleEarnUsd,
      userEarnCrypto: user.userStats.skaleEarnToken,
      userEarnPoints: user.userStats.skalePoints,
      image: "skaleBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      popupInfo: {
        title: "SKALE",
        chain: "SKALE Nebula Hub",
        linkState: "skale",
        rewards: "SKL",
        status: "Expired",
        id: "event11",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SKL Rewards",
        eventDuration: taikoLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        // learnMore:
        //   "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        learnMore: "",
        eventDate: "Dec 03, 2024",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a SKALE Beta Pass NFT</b>. You can get the SKALE Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the SKALE area, players
                  not only stand a chance to secure daily rewards in SKL, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the SKALE area to uncover hidden treasures.`,
        about: `SKALE stands as the world's fastest blockchain, meticulously
            engineered to enable secure Ethereum scaling. With SKALE AppChains,
            users enjoy ZERO gas fees and access advanced functionalities like
            AI/ML smart contracts, on-chain file storage, interchain messaging,
            and zero-cost minting. This empowers developers to swiftly deploy
            their own configurable EVM blockchains without compromising on
            speed, security, or decentralization.`,
        twitterLink: "https://twitter.com/SkaleNetwork",
        telegramLink: "https://t.me/skaleofficial",
        websiteLink: "https://skale.space/",
        thumbImage: "https://cdn.worldofdypians.com/wod/skalePopupImage.png",
      },
    },
    {
      title: "Dypius Premium",
      logo: "https://cdn.worldofdypians.com/wod/dypiusPremium16.svg",
      eventStatus: "Expired",
      totalRewards: "$50,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Feb 26, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/dypiusBgPic2.webp",
      activeTab: "dypiusv2",
      userEarnUsd: user.userStats.dypiusPremiumEarnUsd,
      userEarnCrypto: user.userStats.dypiusPremiumEarnTokens,
      userEarnPoints: user.userStats.dypiusPremiumPoints,
      popupInfo: {
        title: "Dypius Premium",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "BNB",
        status: "Expired",
        id: "event9",
        eventType: "Explore & Find",
        totalRewards: "$50,000 in BNB Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "Feb 26, 2024",
        detailsText: `To participate in the event, players are required to be
                  <b>Prime Users.</b> By actively participating in the game on a
                  daily basis and exploring the downtown area, players have the
                  opportunity to secure daily rewards in WOD. Remember to log in
                  to the game daily and venture into the downtown area to
                  uncover hidden treasures.`,
        about: `Dypius is a powerful, decentralized ecosystem with a focus on
            scalability, security, and global adoption through next-gen
            infrastructure. We offer a variety of products and services that
            cater to both beginners and advanced users in the crypto space
            including Earn solutions, analytical tools, NFTs, Metaverse and
            more!`,
        twitterLink: "https://twitter.com/dypius",
        telegramLink: "https://t.me/worldofdypians",
        websiteLink: "https://www.dypius.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/dypiuspopup2.png",
        activeTab: "dypiusv2",
      },
    },
    {
      title: "CMC",
      logo: "https://cdn.worldofdypians.com/wod/cmcIcon.svg",
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
      userEarnUsd: user.userStats.cmcuserEarnUsd,
      userEarnCrypto: user.userStats.cmcuserEarnETH,
      userEarnPoints: user.userStats.cmcuserPoints,
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingCmc.webp",
      popupInfo: {
        title: "CoinMarketCap",
        chain: "BNB Chain",
        linkState: "coinmarketcap",
        rewards: "BNB",
        status: "Expired",
        id: "event8",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: cmcLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        eventDate: "Dec 26, 2023",
        learnMore:
          "/news/658ae3cc148c5ffee9c4ffa7/CoinMarketCap-Treasure-Hunt-Event",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a CoinMarketCap Beta Pass NFT</b>. You can get the
                  CoinMarketCap Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  CoinMarketCap area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the CoinMarketCap area to uncover
                  hidden treasures.`,
        about: `CoinMarketCap provides cryptocurrency market cap rankings, charts,
            and more. We tracks capitalization of various cryptocurrencies by
            listing prices, available supply (amount of coins that is currently
            in circulation), trade volume over last 24 hours, or market
            capitalizations. CoinMarketCap was founded in May 2013 by Brandon
            Chez in Long Island City, Queens, New York.`,
        twitterLink: "https://twitter.com/CoinMarketCap",
        telegramLink: "https://t.me/CoinMarketCapAnnouncements",
        websiteLink: "https://coinmarketcap.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/cmcPopupImage.png",
      },
    },
    {
      title: "Dogecoin",
      chain: "BNB Chain",
      linkState: "doge",
      rewards: "DOGE",
      status: "Expired",
      eventStatus: "Expired",
      id: "event7",
      eventType: "Explore & Mine",
      date: "Dec 22, 2023",
      eventDate: "Dec 22, 2023",
      logo: "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg",
      totalRewards: "$10,000 in DOGE Rewards",
      eventDuration: user.userStats.dogeLastDay,
      userEarnCrypto: user.userStats.dogeEarnBNB,
      userEarnPoints: user.userStats.dogeUserPoints,
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingDoge.webp",
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore: "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
      userEarnUsd: user.userStats.dogeEarnUSD,
      popupInfo: {
        title: "Dogecoin",
        chain: "BNB Chain",
        linkState: "doge",
        rewards: "DOGE",
        status: "Expired",
        id: "event7",
        eventStatus: "Expired",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in DOGE Rewards",
        eventDuration: dogeLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "Dec 22, 2023",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Dogecoin Beta Pass NFT</b>. You can get the Dogecoin
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Dogecoin area,
                  players not only stand a chance to secure daily rewards in
                  DOGE, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Dogecoin area to uncover hidden treasures.`,
        about: `An open-source peer-to-peer digital currency, favoured by Shiba
            Inus worldwide.At its heart, Dogecoin is the accidental crypto
            movement that makes people smile! It is also an opensource
            peer-to-peer cryptocurrency that utilises blockchain technology, a
            highly secure decentralised system of storing information as a
            public ledger that is maintained by a network of computers called
            nodes.`,
        twitterLink: "https://twitter.com/dogecoin",
        telegramLink: "https://discord.gg/dogecoin",
        websiteLink: "https://dogecoin.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/dogePopupImage.png",
      },
    },
    {
      title: "Dypius",
      logo: "https://cdn.worldofdypians.com/wod/dypius.svg",
      eventStatus: "Expired",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Ended",
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingDyp.webp",
      userEarnUsd: user.userStats.dypiusEarnUsd,
      userEarnCrypto: user.userStats.dypiusEarnTokens,
      userEarnPoints: 0,
      popupInfo: {
        title: "Dypius",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "DYP",
        status: "Expired",
        id: "event5",
        eventType: "Explore & Find",
        totalRewards: "300,000 in DYPv2 Rewards",
        eventDuration: dypiusLastDay,
        minRewards: "25",
        maxRewards: "50",
        learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
        eventDate: "Ended",
        detailsText: `To participate in the event, players are required to own at
                  least one of the Beta Pass NFTs. By actively participating in
                  the game on a daily basis and exploring the downtown area,
                  players have the opportunity to secure daily rewards.
                  Remember to log in to the game daily and venture into the
                  downtown area to uncover hidden treasures.`,
        about: `Dypius is a powerful, decentralized ecosystem with a focus on
            scalability, security, and global adoption through next-gen
            infrastructure. We offer a variety of products and services that
            cater to both beginners and advanced users in the crypto space
            including Earn solutions, analytical tools, NFTs, Metaverse and
            more!`,
        twitterLink: "https://twitter.com/dypius",
        telegramLink: "https://t.me/worldofdypians",
        websiteLink: "https://www.dypius.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/dypEventImage.png",
      },
    },
    {
      title: "Gate.io",
      logo: "https://cdn.worldofdypians.com/wod/gateTreasureHunt.svg",
      eventStatus: "Expired",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: "https://cdn.worldofdypians.com/wod/gateUpcoming.webp",
      userEarnUsd: user.userStats.gateEarnUSD,
      userEarnCrypto: user.userStats.gateEarnBnb,
      userEarnPoints: user.userStats.gateUserPoints,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "BNB",
        status: "Expired",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "Ended",
        date: "Oct 20, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/653290f5b3f3545e9500f557/Gate-Treasure-Hunt-Event",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Gate Beta Pass NFT</b>. You can get the Gate Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Gate.io area, players
                  not only stand a chance to secure daily rewards in BNB, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Gate.io area to uncover hidden treasures.`,
        about: `Gate.io is a full-service digital asset exchange platform
            covering millions of users around the world.The company prides
            itself on providing industry-leading security in addition to having
            been audited to show 100% proof of reserves. Gate.io operates in
            most countries across the world, and is always committed to
            complying with the applicable laws where it operates.`,
        twitterLink: "https://twitter.com/gate_io",
        telegramLink: "https://t.me/gateio_en",
        websiteLink: "https://www.gate.io/",
        thumbImage: "https://cdn.worldofdypians.com/wod/gatePopupImage.png",
      },
    },
    {
      title: "Conflux",
      logo: "https://cdn.worldofdypians.com/wod/confluxIcon.svg",
      eventStatus: "Expired",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: "https://cdn.worldofdypians.com/wod/confluxUpcoming.png",
      userEarnUsd: user.userStats.confluxEarnUSD,
      userEarnCrypto: user.userStats.confluxEarnCFX,
      userEarnPoints: user.userStats.confluxUserPoints,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Expired",
        id: "event1",
        totalRewards: "$2,000 in CFX Rewards",
        eventDuration: confluxLastDay,
        eventDate: "Ended",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
        detailsText: `To participate in the event, players are required to&nbsp;
                  <b>hold a Conflux Beta Pass NFT</b>. You can get the Conflux
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Conflux area,
                  players not only stand a chance to secure daily rewards in
                  CFX, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Conflux area to uncover hidden treasures.`,
        about: `Conflux Network stands as a Layer 1 public blockchain solution,
            uniquely blending the advantages of both public and private
            blockchains within its hybrid architecture. It aims to establish a
            diverse multi-chain ecosystem, fostering seamless global
            connectivity for creators, communities, and markets across different
            borders and protocols.`,
        twitterLink: "https://twitter.com/Conflux_Network",
        telegramLink: "https://t.me/Conflux_English",
        websiteLink: "https://confluxnetwork.org/",
        thumbImage: "https://cdn.worldofdypians.com/wod/eventPopupImage.png",
      },
    },

    {
      title: "Vanar",
      logo: "https://cdn.worldofdypians.com/wod/vanar.svg",
      eventStatus: "Live",
      totalRewards: "$20,000 in VANRY Rewards",
      location: [-0.06784377896887378, 0.0839531421661377],
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Sep 17, 2025",
      type: "Treasure Hunt",
      rewardType: "VANRY",
      rewardAmount: "$20,000",
      infoType: "Treasure Hunt",
      backgroundImage: "https://cdn.worldofdypians.com/wod/vanarEventBg.webp",
      image: "vanarArea.webp",
      userEarnUsd: user.userStats.vanarEarnUsd,
      userEarnCrypto: user.userStats.vanarEarnToken,
      userEarnPoints: user.userStats.vanarPoints,
      popupInfo: {
        title: "Vanar",
        chain: "Vanar Network",
        linkState: "vanar",
        rewards: "VANRY",
        status: "Live",
        id: "event2",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in VANRY Rewards",
        eventDuration: vanarLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "May 19, 2025",
        detailsText: `To participate in the event, players are required to
                  <b>hold a Vanar Beta Pass NFT</b>. You can get the Vanar Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Vanar area, players
                  not only stand a chance to secure daily rewards in VANRY, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Vanar area to uncover hidden treasures.`,
        about: ` Vanar offers a suite of solutions for brands built on years of
            experience. From new engagement experiences to AI-driven IP
           tracking.`,
        twitterLink: "https://x.com/vanarchain",
        telegramLink: "https://t.me/vanarofficial",
        websiteLink: "https://vanarchain.com/",
        thumbImage: "https://cdn.worldofdypians.com/wod/vanarThumb.webp",
      },
    },
  ];

  const fetchBSCCoinPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/wbnb")
      .then((obj) => {
        if (obj.data) {
          setBnbUSDPrice(obj.data.price);
          setBnbPrice(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchDogeCoinPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/dogecoin")
      .then((obj) => {
        if (obj.data) {
          setDogePrice(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchEgldPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/tomochain`)
      .then((obj) => {
        setmultiversPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchImmutablePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/immutable`)
      .then((obj) => {
        setImmutablePrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchKucoinCoinPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/kucoin-shares")
      .then((obj) => {
        if (obj.data) {
          setKucoinPrice(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchEthereumPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/ethereum")
      .then((obj) => {
        if (obj.data) {
          setEthTokenData(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchWodPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/world-of-dypians`)
      .then((res) => {
        if (res.data) {
          setWodPrice(res.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchSkalePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/skale`)
      .then((obj) => {
        setSkalePrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchTWTPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/trust-wallet-token")
      .then((obj) => {
        if (obj.data) {
          setTrustPrice(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchSeiPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/sei-network`)
      .then((obj) => {
        setSeiPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchCorePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/coredaoorg`)
      .then((obj) => {
        setCorePrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchCFXPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/conflux-token")
      .then((obj) => {
        if (obj.data) {
          setCfxPrice(obj.data.price);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchMantaPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/manta-network`)
      .then((obj) => {
        setMantaPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchTaikoPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/taiko`)
      .then((obj) => {
        setTaikoPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fetchTaraxaPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/taraxa`)
      .then((obj) => {
        setTaraxaPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchCookiePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/cookie`)
      .then((obj) => {
        setCookiePrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchVictionPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/tomochain`)
      .then((obj) => {
        setVictionPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchVanarPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/vanar-chain`)
      .then((obj) => {
        setvanarPrice(obj.data.price);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getWodBalance = async (address) => {
    if (address) {
      const tokenContract = new window.bscWeb3.eth.Contract(
        window.TOKEN_ABI,
        window.config.wod_token_address
      );
      const tokenBalance = await tokenContract.methods
        .balanceOf(address)
        .call()
        .then((data) => {
          let depositedTokens = new window.BigNumber(data)
            .div(1e18)
            .toString(10);
          return depositedTokens;
        })
        .catch((e) => {
          console.error(e);
        });

      if (tokenBalance !== undefined) {
        setwodBalance(tokenBalance);
      }
    }
  };

  useEffect(() => {
    fetchSkalePrice();
    fetchSeiPrice();
    fetchMantaPrice();
    fetchTaikoPrice();
    fetchTaraxaPrice();
    fetchCookiePrice();
    fetchCorePrice();
    fetchCFXPrice();
    fetchTWTPrice();
    fetchVictionPrice();
    fetchVanarPrice();
    fetchEgldPrice();
    fetchImmutablePrice();
    fetchKucoinCoinPrice();
    fetchEthereumPrice();
    fetchDogeCoinPrice();
    getAllData();
    fetchSkaleBalance();
    fetchWodPrice();
  }, []);

  const checkPremiumOryn = async (addr) => {
    try {
      if (!addr) {
        setPremiumOryn(false);
        return;
      }
      const oryn_premium_contract = new window.bscWeb3.eth.Contract(
        window.ORYN_PREMIUM_ABI,
        window.config.oryn_premium_address
      );
      const result = await oryn_premium_contract.methods
        .hasLocked(addr)
        .call()
        .catch(() => false);
      setPremiumOryn(Boolean(result));
    } catch (e) {
      setPremiumOryn(false);
    }
  };
  const handleRegister = () => {
    setWalletId("register");
    setWalletModal(true);
  };
  const checkData = async () => {
    navigate("/auth");
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
  };

  const getStakesIds = async () => {
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

  const myCAWStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyCAWstakes(stakes);
    }
  };

  const getTimepieceNftMinted = async () => {
    const result = await window.caws_timepiece.calculateTimepieceBalance(
      coinbase
    );
    setTotalTimepieceCreated(result);
    let metadataArray = [];
    if (result && result > 0) {
      for (let index = 0; index < result; index++) {
        const tokenId =
          +(await window.caws_timepiece.getCawsTimepieceTokenByIndex(
            coinbase,
            index
          ));

        metadataArray.push({
          name: `CAWS Timepiece #${tokenId}`,
          image: `https://timepiece.worldofdypians.com/thumbs150/${tokenId}.png`,
        });
      }
      settimepieceMetadata(metadataArray);
    } else {
      settimepieceMetadata(metadataArray);
      setTotalTimepieceCreated(0);
    }
  };

  const handleTimepieceMint = async () => {
    if (window.WALLET_TYPE === "matchId") {
      window.alertify?.error("Please connect to another EVM wallet.");
      return;
    }
    if (!isConnected || !coinbase) {
      setWalletId("connect");
      setWalletModal(true);
      return;
    }

    try {
      const txHash = await wagmiWriteContract(wagmiClient, {
        address: window.config.caws_timepiece_address,
        abi: window.CAWS_TIMEPIECE_ABI,
        functionName: "claimTimepiece",
        args: [finalCaws],
        account: coinbase, // optional, connector will provide
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
        setmintStatus("Success! Your Nft was minted successfully!");
        setmintloading("success");
        settextColor("rgb(123, 216, 176)");
        checkCawsToUse();
      }

      return;
    } catch (e) {
      setmintloading("error");
      settextColor("#d87b7b");
      const message =
        (typeof e === "object" && e?.message) ||
        "Oops, something went wrong! Refresh the page and try again!";
      setmintStatus(message);
      window.alertify?.error(message);
    } finally {
      setTimeout(() => {
        setmintStatus("");
        setmintloading("initial");
      }, 5000);
    }
  };

  const calculateCaws = (data) => {
    const requested = Number(data?.numberOfTokens || 0);
    const selectedCount = cawsToUse.length;
    if (requested <= 0 || selectedCount === 0) {
      setLimit(0);
      setFinalCaws([]);
      return;
    }
    if (requested >= selectedCount) {
      setLimit(selectedCount);
      setFinalCaws(cawsToUse);
      return;
    }
    setLimit(requested);
    setFinalCaws(cawsToUse.slice(0, requested));
  };

  const checkCawsToUse = async () => {
    const testArray = [];
    const cawsArray = [...user.userNFTs.myNFTSCaws, ...myCAWstakes];

    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address
    );

    if (cawsArray.length > 0) {
      for (let i = 0; i < cawsArray.length; i++) {
        // let cawsName = cawsArray[i].nftName;

        // const cawsId = parseInt(cawsName.name.slice(6, cawsName.name.length));

        const result = await nft_contract.methods
          .cawsUsed(cawsArray[i].tokenId)
          .call()
          .catch((e) => {
            console.error(e);
            return false;
          });

        if (result === false) {
          testArray.push(cawsArray[i].tokenId);
        }
      }

      setcawsToUse(testArray);
      setAllCawsForTimepieceMint(testArray);
    } else if (cawsArray.length === 0) {
      setcawsToUse([]);
      setAllCawsForTimepieceMint([]);
    }
  };

  const fetchEthStaking = async () => {
    const eth_result = await axios
      .get(`https://api.dyp.finance/api/get_staking_info_wod_nft`)
      .catch((err) => {
        console.log(err);
      });

    const bnb_result = await axios
      .get(`https://api.dyp.finance/api/get_staking_info_wod_bnb`)
      .catch((err) => {
        console.log(err);
      });

    if (
      eth_result &&
      eth_result.status === 200 &&
      bnb_result &&
      bnb_result.status === 200
    ) {
      const tokenSc = new window.bscWeb3.eth.Contract(
        window.TOKEN_ABI,
        window.config.wod_token_address
      );

      const totaldesposited_wod1 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod1._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod1_formatted = new window.BigNumber(
        totaldesposited_wod1
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod2 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod2._address)
        .call()
        .catch((e) => {
          console.error(e);
        });
      const totaldesposited_wod2_formatted = new window.BigNumber(
        totaldesposited_wod2
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod3 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod3._address)
        .call()
        .catch((e) => {
          console.error(e);
        });
      const totaldesposited_wod3_formatted = new window.BigNumber(
        totaldesposited_wod3
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod4 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod4._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod5 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod5._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod6 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod6._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod7 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod7._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod8 = await tokenSc.methods
        .balanceOf(window.constant_staking_wod8._address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const totaldesposited_wod4_formatted = new window.BigNumber(
        totaldesposited_wod4
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod5_formatted = new window.BigNumber(
        totaldesposited_wod5
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod6_formatted = new window.BigNumber(
        totaldesposited_wod6
      )
        .div(1e18)
        .toFixed(6);

      const totaldesposited_wod7_formatted = new window.BigNumber(
        totaldesposited_wod7
      )
        .div(1e18)
        .toFixed(6);
      const totaldesposited_wod8_formatted = new window.BigNumber(
        totaldesposited_wod8
      )
        .div(1e18)
        .toFixed(6);

      const poolcapArray = [
        {
          id: "0xefeFE07D9789cEf9BF6169F4d87fbE7DD297500C",
          poolCap: 13000000,
          totaldeposited: totaldesposited_wod1_formatted,
        },
        {
          id: "0xD2332f55BF83e83C3E14352FB4039c6B534C4B7e",
          poolCap: 12000000,
          totaldeposited: totaldesposited_wod2_formatted,
        },
        {
          id: "0xB199DE216Ca2012a5A75614B276a38E3CeC9FA0C",
          poolCap: 20000000,
          totaldeposited: totaldesposited_wod3_formatted,
        },
        {
          id: "0x0675B497f52a0426874151c1e3267801fAA15C18",
          poolCap: 9000000,
          totaldeposited: totaldesposited_wod4_formatted,
        },
        {
          id: "0x5d35E4fC8624453A539eB261728aF5CDAbF4F652",
          poolCap: 5000000,
          totaldeposited: totaldesposited_wod5_formatted,
        },
        {
          id: "0xC5432cbf613aaE8626bC4301f29e6eE8e3d2a1b3",
          poolCap: 10000000,
          totaldeposited: totaldesposited_wod6_formatted,
        },
        {
          id: "0x6A4057d68C10f450e306F191728ffa926E6c30F0",
          poolCap: 10000000,
          totaldeposited: totaldesposited_wod7_formatted,
        },
        {
          id: "0xE91944cB7fd18Fec0fD6e5eC0Ff3d9a88f5C1600",
          poolCap: 6500000,
          totaldeposited: totaldesposited_wod8_formatted,
        },
      ];

      let resultWodToken = bnb_result.data.stakingInfoWODBnb;
      let resultWodTokenTVL = bnb_result.data.totalTVL;

      let resultCaws = eth_result.data.stakingInfoCAWS;
      let resultLand = eth_result.data.stakingInfoLAND;
      let resultCawsLand = eth_result.data.stakinginfoCAWSLAND;

      let resultWodToken2 = resultWodToken.map((item) => {
        return {
          ...item,
          // expired:
          //   item.id === "0xB199DE216Ca2012a5A75614B276a38E3CeC9FA0C" ||
          //   item.id === "0x0675B497f52a0426874151c1e3267801fAA15C18"
          //     ? "Yes"
          //     : item.expired,
          // new_pool:
          //   item.id === "0xB199DE216Ca2012a5A75614B276a38E3CeC9FA0C" ||
          //   item.id === "0x0675B497f52a0426874151c1e3267801fAA15C18" ||
          //   item.id === "0xefeFE07D9789cEf9BF6169F4d87fbE7DD297500C" ||
          //   item.id === "0xD2332f55BF83e83C3E14352FB4039c6B534C4B7e"
          //     ? "No"
          //     : item.new_pool,
          type: "token",
          chain: "bnb",
          tokenURL: ["wodToken"],
          poolCap: poolcapArray.find((item2) => {
            return item2.id.toLowerCase() === item.id.toLowerCase();
          })?.poolCap,
          totalDeposited: poolcapArray.find((item2) => {
            return item2.id.toLowerCase() === item.id.toLowerCase();
          })?.totaldeposited,
        };
      });

      let resultCaws2 = resultCaws.map((item) => {
        return {
          ...item,
          type: "nft",
          chain: "eth",
        };
      });

      let resultLand2 = resultLand.map((item) => {
        return {
          ...item,
          type: "nft",
          chain: "eth",
        };
      });

      let resultCawsLand2 = resultCawsLand.map((item) => {
        return {
          ...item,
          type: "nft",
          chain: "eth",
        };
      });

      const allPools = [...resultCaws2, ...resultLand2, ...resultCawsLand2];
      let tvl = 0;
      allPools.forEach((item) => {
        tvl += Number(item.tvl_usd);
      });
      localStorage.setItem("tvl", Number(tvl) + Number(resultWodTokenTVL));
      setnftTvl(Number(tvl) + Number(resultWodTokenTVL));
      setnftPools([...resultCaws2, ...resultLand2, ...resultCawsLand2]);

      settokenPools(resultWodToken2);
    }
  };

  const fetchUserPools = async (addr) => {
    if (addr) {
      const userpools_result = await axios
        .get(`https://api.dyp.finance/api/user_pools_wod/${addr}`)
        .catch((err) => {
          console.log(err);
        });

      if (userpools_result && userpools_result.status === 200) {
        const allpools = userpools_result.data.PoolsUserIn;
        setUserPools(allpools);
      }
    }
  };

  const fetchMonthlyPlayers = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/get-wod-uaw`)
      .then((data) => {
        setMonthlyPlayers(data.data.uaw);
        setPercent(data.data.percent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTotalVolume = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/getwodvolume`)
      .then((res) => {
        setTotalVolumeNew(res.data.totalVolume);
        localStorage.setItem("cachedVolume", res.data.totalVolume);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTotalWodHolders = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/getwodholders`)
      .then((res) => {
        setWodHolders(res.data.holders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalSupply = async () => {
    const makeClient = (url) =>
      createPublicClient({
        transport: http(url),
      });
    const safeReadTotalSupply = async (client, address, abi) => {
      try {
        const value = await client.readContract({
          address,
          abi,
          functionName: "totalSupply",
        });
        return value ?? 0n;
      } catch (e) {
        console.error(e);
        return 0n;
      }
    };

    // Ethereum (Infura) - Timepiece
    const timepieceClient = makeClient(window.config.infura_endpoint);
    let result = await safeReadTotalSupply(
      timepieceClient,
      window.config.nft_timepiece_address,
      window.CAWS_TIMEPIECE_ABI
    );

    // Base (cycle multiple endpoints to mitigate rate limits)
    let result_base = 0n;
    for (let i = 0; i < 3; i++) {
      try {
        const baseClient = makeClient(window.config.all_base_endpoints[i]);
        result_base = await safeReadTotalSupply(
          baseClient,
          window.config.nft_base_address,
          window.BASE_NFT_ABI
        );
      } catch (err) {
        const message = err?.message || "";
        console.warn(
          `Error with ${window.config.all_base_endpoints[i]}: ${message}`
        );
        const lower = message.toLowerCase();
        const isRateLimited =
          lower.includes("rate limit") ||
          lower.includes("too many requests") ||
          lower.includes("over rate limit");
        if (isRateLimited) {
          console.log(
            `Rate limited on totalSupply ${window.config.all_base_endpoints[i]}. Trying next...`
          );
        }
      }
    }

    // Create clients per chain
    const confluxClient = makeClient(window.config.conflux_endpoint);
    const bscClient = makeClient(window.config.bsc_endpoint);
    const skaleClient = makeClient(window.config.skale_endpoint);
    const opbnbClient = makeClient(window.config.opbnb_endpoint);
    const victionClient = makeClient(window.config.viction_endpoint);
    const coreClient = makeClient(window.config.core_endpoint);
    const multiversClient = bscClient;
    const mantaClient = makeClient(window.config.manta_endpoint);
    const taikoClient = makeClient(window.config.taiko_endpoint);
    const matClient = makeClient(window.config.mat_endpoint);
    const seiClient = makeClient(window.config.sei_endpoint);
    const vanarClient = makeClient(window.config.vanar_endpoint);
    const taraxaClient = makeClient(window.config.taraxa_endpoint);

    // Parallel reads with safe fallbacks
    const [
      confluxresult,
      gateresult,
      dogeresult,
      cmcresult,
      skaleresult,
      bnbresult,
      opbnbresult,
      kucoinresult,
      bnb_5ya_result,
      victionresult,
      coreresult,
      multiversresult,
      mantaresult,
      taikoresult,
      cookieresult,
      matresult,
      seiresult,
      vanarresult,
      taraxaResult,
      teaseiResult,
    ] = await Promise.all([
      safeReadTotalSupply(
        confluxClient,
        window.config.nft_conflux_address,
        window.CONFLUX_NFT_ABI
      ),
      safeReadTotalSupply(
        bscClient,
        window.config.nft_gate_address,
        window.GATE_NFT_ABI
      ),
      safeReadTotalSupply(
        bscClient,
        window.config.nft_doge_address,
        window.DOGE_NFT_ABI
      ),
      safeReadTotalSupply(
        bscClient,
        window.config.nft_cmc_address,
        window.CMC_NFT_ABI
      ),
      safeReadTotalSupply(
        skaleClient,
        window.config.nft_skale_address,
        window.SKALE_NFT_ABI
      ),
      safeReadTotalSupply(
        bscClient,
        window.config.nft_bnb_address,
        window.BNB_NFT_ABI
      ),
      safeReadTotalSupply(
        opbnbClient,
        window.config.nft_opbnb_address,
        window.OPBNB_NFT_ABI
      ),
      safeReadTotalSupply(
        opbnbClient,
        window.config.nft_kucoin_address,
        window.OPBNB_NFT_ABI
      ),
      safeReadTotalSupply(
        opbnbClient,
        window.config.nft_bnb5ya_address,
        window.OPBNB_NFT_ABI
      ),
      safeReadTotalSupply(
        victionClient,
        window.config.nft_viction_address.toLowerCase(),
        window.VICTION_NFT_ABI
      ),
      safeReadTotalSupply(
        coreClient,
        window.config.nft_core_address,
        window.CORE_NFT_ABI
      ),
      safeReadTotalSupply(
        multiversClient,
        window.config.nft_multivers_address,
        window.MULTIVERS_NFT_ABI
      ),
      safeReadTotalSupply(
        mantaClient,
        window.config.nft_manta_address,
        window.MANTA_NFT_ABI
      ),
      safeReadTotalSupply(
        taikoClient,
        window.config.nft_taiko_address,
        window.TAIKO_NFT_ABI
      ),
      safeReadTotalSupply(
        bscClient,
        window.config.nft_cookie3_address,
        window.COOKIE3_NFT_ABI
      ),
      safeReadTotalSupply(
        matClient,
        window.config.nft_mat_address,
        window.MAT_NFT_ABI
      ),
      safeReadTotalSupply(
        seiClient,
        window.config.nft_sei_address,
        window.SEI_NFT_ABI
      ),
      safeReadTotalSupply(
        vanarClient,
        window.config.nft_vanar_address,
        window.VANAR_NFT_ABI
      ),
      safeReadTotalSupply(
        taraxaClient,
        window.config.nft_taraxa_address,
        window.TARAXA_NFT_ABI
      ),
      safeReadTotalSupply(
        seiClient,
        window.config.nft_teasei_address,
        window.SEI_NFT_ABI
      ),
    ]);

    // TEA trackers (non-viem), fetch in parallel and fall back to 0
    const [teaBNBResult, teaOPBNBResult, teaBaseResult] = await Promise.all([
      (async () => {
        try {
          return await window.teabnb_nft.getTeaBNBLatestMint();
        } catch (e) {
          console.error(e);
          return 0;
        }
      })(),
      (async () => {
        try {
          return await window.teaopbnb_nft.getTeaOPBNBLatestMint();
        } catch (e) {
          console.error(e);
          return 0;
        }
      })(),
      (async () => {
        try {
          return await window.teabase_nft.getTeaBaseLatestMint();
        } catch (e) {
          console.error(e);
          return 0;
        }
      })(),
    ]);

    //20002 = 10000 caws + 1000 genesis + 9002 coingecko

    setTotalSupply(
      Number(result) +
        Number(result_base) +
        Number(confluxresult) +
        Number(gateresult) +
        Number(dogeresult) +
        Number(cmcresult) +
        Number(skaleresult) +
        Number(bnbresult) +
        Number(opbnbresult) +
        Number(coreresult) +
        Number(victionresult) +
        Number(multiversresult) +
        Number(mantaresult) +
        Number(taikoresult) +
        Number(cookieresult) +
        Number(matresult) +
        Number(seiresult) +
        Number(kucoinresult) +
        Number(vanarresult) +
        Number(teaBNBResult) +
        Number(teaOPBNBResult) +
        Number(teaBaseResult) +
        Number(teaseiResult) +
        Number(taraxaResult) +
        Number(bnb_5ya_result) +
        20002
    );
  };

  const handleSwitchNetwork = async (targetChainId) => {
    try {
      if (!window?.ethereum) return;
      const hex =
        targetChainId === 1
          ? "0x1"
          : targetChainId === 56
          ? "0x38"
          : targetChainId === 204
          ? "0xcc"
          : targetChainId === 8453
          ? "0x2105"
          : targetChainId === 43114
          ? "0xa86a"
          : targetChainId === 1482601649
          ? "0x585eb4b1"
          : targetChainId === 1030
          ? "0x406"
          : `0x${targetChainId.toString(16)}`;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      });
    } catch (switchError) {
      console.log("switchError", switchError);
    }
  };
  const handleSwitchChain = async () => {};
  const handleConnectPassport = async () => {
    const { checkout, passportInstance, checkoutSDK } = await ensureImmutable();
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const connect = widgets.create(checkout.WidgetType.CONNECT);

    if (!connect) return;

    connect.mount("connect");

    connect.addListener(checkout.ConnectEventType.SUCCESS, async () => {
      const passportProvider = passportInstance.connectEvm();
      await passportProvider.request({
        method: "eth_requestAccounts",
      });
      handleConnectWallet();
    });
    connect.addListener(checkout.ConnectEventType.FAILURE, (data) => {
      console.log("failure", data);
    });
    connect.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect.unmount();
      setWalletModal(false);
      // setTimeout(() => {
      //   setwalletId("connect_simple");
      //   handleConnectWalletPassport();
      // }, 1000);
      setSuccess(true);
    });

    //   await passportInstance.login().then(async()=>{
    //     if(accounts && accounts.length > 0) {
    //       handleConnection();
    //       console.log(window)
    //     }
    // })

    // const provider = new ethers.providers.Web3Provider(passportProvider);
    // console.log('provider',provider)
    // const accounts = await provider.request({ method: "eth_requestAccounts" });
  };
  const handleConnection = async (option) => {
    const connectors = wagmiClient.connectors;
    const connector = connectors.find((c) =>
      c.name.toLowerCase().includes(option.toLowerCase())
    );
    if (connector) {
      connect({ connector, chainId });
      window.WALLET_TYPE = option.walletType;
      setWalletType(option.walletType);
    }
  };
  const handleConnectionMatchId = async (method) => {
    await loginMatchain(method).then(() => {
      
      setWalletModal(false);
      console.log("Logged in with method:", method);
      window.WALLET_TYPE = "matchId";

      dispatch(setAddress(matchainAddress));
      dispatch(setIsConnected(true));
    });
  };

  const handleSync = async () => {
    setsyncStatus("loading");

    try {
      await generateNonce({
        variables: {
          publicAddress: coinbase,
        },
      });
    } catch (error) {
      setsyncStatus("error");
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
      const timer = setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const handleConnectWallet = async () => {};
  const hashValue = window.location.hash;

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify({
            email: email,
            publicAddress: userAddress,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        let userActiveEvents = 0;
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
            return obj.id === "bnbChainEvent31";
          });

          const trustwalletEvent = responseData.events.filter((obj) => {
            return obj.name === "Trust Wallet Treasure Hunt";
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
          const taraxaEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "taraxa";
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

          const seiEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "sei";
          });

          const vanarEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "vanar";
          });

          const easy2stakeEvent = responseData.events.filter((obj) => {
            return obj.id === "easy2stakeEvent1";
          });

          const midleEvent = responseData.events.filter((obj) => {
            return obj.id === "midleEvent1";
          });

          const chainlinkEvent = responseData.events.filter((obj) => {
            return obj.id === "chainlinkEvent10";
          });

          const teafiEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "teafi";
          });

          const kucoinEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "kucoin";
          });

          if (dypPremiumEvent && dypPremiumEvent[0]) {
            const userEarnedusd =
              dypPremiumEvent[0].reward.earn.total /
              dypPremiumEvent[0].reward.earn.multiplier;
            const pointsdypius = dypPremiumEvent[0].reward.earn.totalPoints;

            setUserStats({
              dypiusPremiumPoints: pointsdypius,
              dypiusPremiumEarnUsd: userEarnedusd,
              dypiusPremiumEarnTokens: userEarnedusd / bnbPrice,
            });
          }
          if (bnbEvent && bnbEvent[0]) {
            if (bnbEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              bnbEvent[0].reward.earn.total /
              bnbEvent[0].reward.earn.multiplier;
            const pointsBnb = bnbEvent[0].reward.earn.totalPoints;

            setUserStats({
              bnbPoints: pointsBnb,
              bnbEarnUsd: userEarnedusd,
              bnbEarnToken: userEarnedusd / bnbPrice,
            });
          }

          if (trustwalletEvent && trustwalletEvent[0]) {
            if (trustwalletEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              trustwalletEvent[0].reward.earn.total /
              trustwalletEvent[0].reward.earn.multiplier;
            const pointstrust = trustwalletEvent[0].reward.earn.totalPoints;

            setUserStats({
              trustPoints: pointstrust,
              trustEarnUsd: userEarnedusd,
              trustEarnToken: userEarnedusd / trustPrice,
            });
          }

          if (teafiEvent && teafiEvent[0]) {
            // if (teafiEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              teafiEvent[0].reward.earn.total /
              teafiEvent[0].reward.earn.multiplier;
            const pointsTea = teafiEvent[0].reward.earn.totalPoints;

            setUserStats({
              teaPoints: pointsTea,
              teaEarnUsd: userEarnedusd,
              teaEarnToken: userEarnedusd / 1,
            });
          }

          if (immutableEvent && immutableEvent[0]) {
            // if (immutableEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              immutableEvent[0].reward.earn.total /
              immutableEvent[0].reward.earn.multiplier;
            const pointsBnb = immutableEvent[0].reward.earn.totalPoints;

            setUserStats({
              immutablePoints: pointsBnb,
              immutableEarnUsd: userEarnedusd,
              immutableEarnToken: userEarnedusd / immutablePrice,
            });
          }

          if (kucoinEvent && kucoinEvent[0]) {
            // if (kucoinEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              kucoinEvent[0].reward.earn.total /
              kucoinEvent[0].reward.earn.multiplier;
            const pointskucoin = kucoinEvent[0].reward.earn.totalPoints;

            setUserStats({
              kucoinPoints: pointskucoin,
              kucoinEarnUsd: userEarnedusd,
              kucoinEarnToken: userEarnedusd / kucoinPrice,
            });
          }

          if (easy2stakeEvent && easy2stakeEvent[0]) {
            // if (easy2stakeEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }
            const userEarnedusd =
              easy2stakeEvent[0].reward.earn.total /
              easy2stakeEvent[0].reward.earn.multiplier;
            const pointsBnb = easy2stakeEvent[0].reward.earn.totalPoints;

            setUserStats({
              easy2StakePoints: pointsBnb,
              easy2StakeEarnUsd: userEarnedusd,
              easy2StakeEarnToken: userEarnedusd / bnbPrice,
            });
          }

          if (taikoEvent && taikoEvent[0]) {
            if (taikoEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              taikoEvent[0].reward.earn.total /
              taikoEvent[0].reward.earn.multiplier;
            const pointsTaiko = taikoEvent[0].reward.earn.totalPoints;

            setUserStats({
              taikoPoints: pointsTaiko,
              taikoEarnUsd: userEarnedusd,
              taikoEarnToken: userEarnedusd / taikoPrice,
            });
          }

          if (taraxaEvent && taraxaEvent[0]) {
            if (taraxaEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              taraxaEvent[0].reward.earn.total /
              taraxaEvent[0].reward.earn.multiplier;
            const pointsTaraxa = taraxaEvent[0].reward.earn.totalPoints;

            setUserStats({
              taraxaPoints: pointsTaraxa,
              taraxaEarnUsd: userEarnedusd,
              taraxaEarnToken: userEarnedusd / taraxaPrice,
            });
          }

          if (midleEvent && midleEvent[0]) {
            // if (midleEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              midleEvent[0].reward.earn.total /
              midleEvent[0].reward.earn.multiplier;
            const pointsMidle = midleEvent[0].reward.earn.totalPoints;

            setUserStats({
              midlePoints: pointsMidle,
              midleEarnUsd: userEarnedusd,
              midleEarnToken: userEarnedusd / bnbPrice,
            });
          }
          if (chainlinkEvent && chainlinkEvent[0]) {
            if (chainlinkEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              chainlinkEvent[0].reward.earn.total /
              chainlinkEvent[0].reward.earn.multiplier;
            const pointschainlink = chainlinkEvent[0].reward.earn.totalPoints;

            setUserStats({
              chainlinkPoints: pointschainlink,
              chainlinkEarnUsd: userEarnedusd,
              chainlinkEarnToken: userEarnedusd / bnbPrice,
            });
          }
          if (cookieEvent && cookieEvent[0]) {
            const userEarnedusd =
              cookieEvent[0].reward.earn.total /
              cookieEvent[0].reward.earn.multiplier;
            const pointsBnb = cookieEvent[0].reward.earn.totalPoints;

            setUserStats({
              cookiePoints: pointsBnb,
              cookieEarnUsd: userEarnedusd,
              cookieEarnToken: userEarnedusd / cookiePrice,
            });
          }

          if (coreEvent && coreEvent[0]) {
            if (coreEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;
            const pointsCore = coreEvent[0].reward.earn.totalPoints;

            setUserStats({
              corePoints: pointsCore,
              coreEarnUsd: userEarnedusd,
              coreEarnToken: userEarnedusd / corePrice,
            });
          }

          if (seiEvent && seiEvent[0]) {
            // if (seiEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              seiEvent[0].reward.earn.total /
              seiEvent[0].reward.earn.multiplier;
            const pointsSei = seiEvent[0].reward.earn.totalPoints;

            setUserStats({
              seiPoints: pointsSei,
              seiEarnUsd: userEarnedusd,
              seiEarnToken: userEarnedusd / seiPrice,
            });
          }

          if (vanarEvent && vanarEvent[0]) {
            if (vanarEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              vanarEvent[0].reward.earn.total /
              vanarEvent[0].reward.earn.multiplier;
            const pointsVanar = vanarEvent[0].reward.earn.totalPoints;

            setUserStats({
              vanarPoints: pointsVanar,
              vanarEarnUsd: userEarnedusd,
              vanarEarnToken: userEarnedusd / vanarPrice,
            });
          }
          if (matEvent && matEvent[0]) {
            // if (matEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              matEvent[0].reward.earn.total /
              matEvent[0].reward.earn.multiplier;
            const pointsMat = matEvent[0].reward.earn.totalPoints;

            setUserStats({
              matPoints: pointsMat,
              matEarnUsd: userEarnedusd,
              matEarnToken: userEarnedusd / bnbPrice,
            });
          }

          if (victionEvent && victionEvent[0]) {
            // if (victionEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              victionEvent[0].reward.earn.total /
              victionEvent[0].reward.earn.multiplier;
            const pointsViction = victionEvent[0].reward.earn.totalPoints;

            setUserStats({
              victionPoints: pointsViction,
              victionEarnUsd: userEarnedusd,
              victionEarnToken: userEarnedusd / victionPrice,
            });
          }

          if (mantaEvent && mantaEvent[0]) {
            // if (mantaEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              mantaEvent[0].reward.earn.total /
              mantaEvent[0].reward.earn.multiplier;
            const pointsManta = mantaEvent[0].reward.earn.totalPoints;

            setUserStats({
              mantaPoints: pointsManta,
              mantaEarnUsd: userEarnedusd,
              mantaEarnToken: userEarnedusd / mantaPrice,
            });
          }

          if (multiversEvent && multiversEvent[0]) {
            const userEarnedusd =
              multiversEvent[0].reward.earn.total /
              multiversEvent[0].reward.earn.multiplier;
            const pointsmultivers = multiversEvent[0].reward.earn.totalPoints;

            setUserStats({
              multiversPoints: pointsmultivers,
              multiversEarnUsd: userEarnedusd,
              multiversEarnToken: userEarnedusd / multiversPrice,
            });
          }

          if (dypEvent && dypEvent[0]) {
            const userEarnedDyp =
              dypEvent[0].reward.earn.total /
              dypEvent[0].reward.earn.multiplier;

            setUserStats({
              dypiusEarnUsd: userEarnedDyp,
              dypiusEarnTokens: userEarnedDyp,
            });
          }

          if (coingeckoEvent && coingeckoEvent[0]) {
            // if (coingeckoEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const points = coingeckoEvent[0].reward.earn.totalPoints;

            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;

            setUserStats({
              userPoints: points,
              userEarnUsd: usdValue,
              userEarnETH: usdValue / bnbPrice,
            });
          }

          if (cmcEvent && cmcEvent[0]) {
            const points = cmcEvent[0].reward.earn.totalPoints;

            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;

            setUserStats({
              cmcuserPoints: points,
              cmcuserEarnUsd: usdValue,
              cmcuserEarnETH: usdValue / bnbPrice,
            });
          }
          if (skaleEvent && skaleEvent[0]) {
            // if (skaleEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const points = skaleEvent[0].reward.earn.totalPoints;

            const usdValue =
              skaleEvent[0].reward.earn.total /
              skaleEvent[0].reward.earn.multiplier;

            setUserStats({
              skalePoints: points,
              skaleEarnUsd: usdValue,
              skaleEarnToken: usdValue / skalePrice,
            });
          }

          if (dogeEvent && dogeEvent[0]) {
            const points = dogeEvent[0].reward.earn.totalPoints;

            const usdValue =
              dogeEvent[0].reward.earn.total /
              dogeEvent[0].reward.earn.multiplier;

            setUserStats({
              dogePoints: points,
              dogeEarnUsd: usdValue,
              dogeEarnToken: usdValue / dogePrice,
            });
          }

          if (confluxEvent && confluxEvent[0]) {
            const cfxPoints = confluxEvent[0].reward.earn.totalPoints;

            if (confluxEvent[0].reward.earn.multiplier !== 0) {
              const cfxUsdValue =
                confluxEvent[0].reward.earn.total /
                confluxEvent[0].reward.earn.multiplier;

              setUserStats({
                confluxPoints: cfxPoints,
                confluxEarnUSD: cfxUsdValue,
                confluxEarnCFX: cfxUsdValue / cfxPrice,
              });
            }
          }

          if (gateEvent && gateEvent[0]) {
            const gatePoints = gateEvent[0].reward.earn.totalPoints;

            if (gateEvent[0].reward.earn.multiplier !== 0) {
              const gateUsdValue =
                gateEvent[0].reward.earn.total /
                gateEvent[0].reward.earn.multiplier;

              setUserStats({
                gatePoints: gatePoints,
                gateEarnUSD: gateUsdValue,
                gateEarnBNB: gateUsdValue / bnbPrice,
              });
            }
          }

          if (baseEvent && baseEvent[0]) {
            // if (baseEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const basePoints = baseEvent[0].reward.earn.totalPoints;

            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;

              setUserStats({
                baseUserPoints: basePoints,
                baseEarnUSD: baseUsdValue,
                baseEarnETH: baseUsdValue / ethTokenData,
              });
            }
          }
          setUserStats({
            userEvents: userActiveEvents,
          });
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleRefreshList = () => {
    setNftCount((prev) => prev + 1);
  };
  const handleShowWalletModal = () => {
    // setWalletId("connect");
    setWalletModal(true);
  };
  // const handleConnection = () => {
  //   setWalletId("connect");
  //   setWalletModal(true);
  // };
  const handleDisconnect = async () => {
    await disconnect(wagmiClient, {
      connector,
    });
    if (window.WALLET_TYPE === "matchId") {
      await logoutMatchain();
    }

    console.log(error);
    // disconnect(wagmiClient)
    // .then(() => {
    dispatch(setAddress(null));
    dispatch(setChainId(null));
    dispatch(setIsConnected(false));
    // });
  };

  const getMyNFTS = async (coinbase, type) => {
    if (coinbase) {
      return await window.getMyNFTs(coinbase, type);
    }
  };

  const fetchAllMyNfts = async (wallet) => {
    getMyNFTS(wallet, "caws").then((NFTS) =>
      setUserNFTs({ myNFTSCaws: NFTS ?? [] })
    );

    getMyNFTS(wallet, "cawsbnb").then((NFTS) =>
      setUserNFTs({ myNFTSCawsBNB: NFTS ?? [] })
    );
    getMyNFTS(wallet, "cawsbase").then((NFTS) =>
      setUserNFTs({ myNFTSCawsBase: NFTS ?? [] })
    );
    getMyNFTS(wallet, "cawsavax").then((NFTS) =>
      setUserNFTs({ myNFTSCawsAvax: NFTS ?? [] })
    );

    getMyNFTS(wallet, "timepiece").then((NFTS) =>
      setUserNFTs({ myNFTSTimepiece: NFTS ?? [] })
    );

    getMyNFTS(wallet, "land").then((NFTS) =>
      setUserNFTs({ myNFTSLand: NFTS ?? [] })
    );

    getMyNFTS(wallet, "bnb").then((NFTS) => {
      setUserNFTs({ myNFTSBNB: NFTS ?? [] });
    });

    getMyNFTS(wallet, "opbnb").then((NFTS) =>
      setUserNFTs({ myNFTSOpBNB: NFTS ?? [] })
    );

    getMyNFTS(wallet, "landbnb").then((NFTS) =>
      setUserNFTs({ myNFTSLandBNB: NFTS ?? [] })
    );
    getMyNFTS(wallet, "landbase").then((NFTS) =>
      setUserNFTs({ myNFTSLandBase: NFTS ?? [] })
    );
    getMyNFTS(wallet, "landavax").then((NFTS) =>
      setUserNFTs({ myNFTSLandAvax: NFTS ?? [] })
    );
    getMyNFTS(wallet, "coingecko").then((NFTS) =>
      setUserNFTs({ myNFTSCoingecko: NFTS ?? [] })
    );
    getMyNFTS(wallet, "gate").then((NFTS) =>
      setUserNFTs({ myGateNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "conflux").then((NFTS) =>
      setUserNFTs({ myConfluxNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "base").then((NFTS) =>
      setUserNFTs({ myBaseNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "doge").then((NFTS) =>
      setUserNFTs({ myDogeNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "cmc").then((NFTS) =>
      setUserNFTs({ myCmcNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "core").then((NFTS) =>
      setUserNFTs({ myCoreNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "viction").then((NFTS) =>
      setUserNFTs({ myVictionNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "immutable").then((NFTS) =>
      setUserNFTs({ myImmutableNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "multivers").then((NFTS) =>
      setUserNFTs({ myMultiversNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "skale").then((NFTS) =>
      setUserNFTs({ mySkaleNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "manta").then((NFTS) =>
      setUserNFTs({ myMantaNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "taiko").then((NFTS) =>
      setUserNFTs({ myTaikoNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "mat").then((NFTS) =>
      setUserNFTs({ myMatNfts: NFTS ?? [] })
    );

    getMyNFTS(wallet, "cookie3").then((NFTS) =>
      setUserNFTs({ myCookieNfts: NFTS ?? [] })
    );
    getMyNFTS(wallet, "sei").then((NFTS) =>
      setUserNFTs({ mySeiNfts: NFTS ?? [] })
    );
  };

  const refreshSubscription = async (addr) => {
    if (addr) {
      const daily_bonus_contract = new window.opBnbWeb3.eth.Contract(
        window.DAILY_BONUS_ABI,
        window.config.daily_bonus_address
      );

      const daily_bonus_contract_bnb = new window.bscWeb3.eth.Contract(
        window.DAILY_BONUS_BNB_ABI,
        window.config.daily_bonus_bnb_address
      );

      const daily_bonus_contract_skale = new window.skaleWeb3.eth.Contract(
        window.DAILY_BONUS_SKALE_ABI,
        window.config.daily_bonus_skale_address
      );

      const daily_bonus_contract_core = new window.coreWeb3.eth.Contract(
        window.DAILY_BONUS_CORE_ABI,
        window.config.daily_bonus_core_address
      );

      const daily_bonus_contract_viction = new window.victionWeb3.eth.Contract(
        window.DAILY_BONUS_VICTION_ABI,
        window.config.daily_bonus_viction_address
      );

      // const daily_bonus_contract_manta = new window.mantaWeb3.eth.Contract(
      //   window.DAILY_BONUS_MANTA_ABI,
      //   window.config.daily_bonus_manta_address
      // );

      const daily_bonus_contract_taiko = new window.taikoWeb3.eth.Contract(
        window.DAILY_BONUS_TAIKO_ABI,
        window.config.daily_bonus_taiko_address
      );

      const daily_bonus_contract_base = new window.baseWeb3.eth.Contract(
        window.DAILY_BONUS_BASE_ABI,
        window.config.daily_bonus_base_address
      );

      const daily_bonus_contract_mat = new window.matWeb3.eth.Contract(
        window.DAILY_BONUS_MAT_ABI,
        window.config.daily_bonus_mat_address
      );

      if (addr) {
        const isPremium_bnb = await daily_bonus_contract_bnb.methods
          .isPremiumUser(addr)
          .call()
          .catch((e) => {
            console.error(e);
            return false;
          });
        if (isPremium_bnb === true) {
          dispatch(setUserProgress({ isPremium: true }));
        } else {
          const isPremium_opbnb = await daily_bonus_contract.methods
            .isPremiumUser(addr)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });
          if (isPremium_opbnb === true) {
            dispatch(setUserProgress({ isPremium: true }));
          } else {
            const isPremium_core = await daily_bonus_contract_core.methods
              .isPremiumUser(addr)
              .call()
              .catch((e) => {
                console.error(e);
                return false;
              });
            if (isPremium_core === true) {
              dispatch(setUserProgress({ isPremium: true }));
            } else {
              const isPremium_viction =
                await daily_bonus_contract_viction.methods
                  .isPremiumUser(addr)
                  .call()
                  .catch((e) => {
                    console.error(e);
                    return false;
                  });
              if (isPremium_viction === true) {
                dispatch(setUserProgress({ isPremium: true }));
              } else {
                const isPremium_skale = await daily_bonus_contract_skale.methods
                  .isPremiumUser(addr)
                  .call()
                  .catch((e) => {
                    console.error(e);
                    return false;
                  });
                if (isPremium_skale === true) {
                  dispatch(setUserProgress({ isPremium: true }));
                } else {
                  const isPremium_taiko =
                    await daily_bonus_contract_taiko.methods
                      .isPremiumUser(addr)
                      .call()
                      .catch((e) => {
                        console.error(e);
                        return false;
                      });
                  if (isPremium_taiko === true) {
                    dispatch(setUserProgress({ isPremium: true }));
                  } else {
                    const isPremium_base =
                      await daily_bonus_contract_base.methods
                        .isPremiumUser(addr)
                        .call()
                        .catch((e) => {
                          console.error(e);
                          return false;
                        });
                    if (isPremium_base === true) {
                      dispatch(setUserProgress({ isPremium: true }));
                    } else {
                      const isPremium_mat =
                        await daily_bonus_contract_mat.methods
                          .isPremiumUser(addr)
                          .call()
                          .catch((e) => {
                            console.error(e);
                            return false;
                          });
                      if (isPremium_mat === true) {
                        dispatch(setUserProgress({ isPremium: true }));
                      } else {
                        dispatch(setUserProgress({ isPremium: false }));
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        dispatch(setUserProgress({ isPremium: false }));
      }
    } else dispatch(setUserProgress({ isPremium: false }));
  };

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    const payloadBase64 = token.split(".")[1];

    const decodedPayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);

    return decodedPayload.exp < currentTime;
  };

  const handleAddUserToNewsLetter = async (token) => {
    const data2 = {
      email: email,
      walletAddress: data?.getPlayer?.wallet?.publicAddress ?? coinbase,
    };

    await axios
      .post(`https://api.worldofdypians.com/api/newsletter/add`, data2, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleManageLogin = async (signature, message) => {
    setsyncCount(syncCount + 1);
    const data2 = {
      email: email,
      walletAddress: data?.getPlayer?.wallet?.publicAddress ?? coinbase,
      signature: signature,
      message: message,
    };

    await axios
      .post(`https://api.worldofdypians.com/api/login`, data2)
      .then((data) => {
        const authToken = data.data.token;
        localStorage.setItem("authToken", authToken);
        if (isCheckedNewsLetter === true) {
          handleAddUserToNewsLetter(authToken);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const signWalletPublicAddress = async () => {
    const nonce = dataNonce?.generateWalletNonce?.nonce;
    const message = `Signing one-time nonce: ${nonce}`;

    if (!nonce) {
      console.error("Missing nonce");
      return;
    }

    try {
      setsyncStatus?.("loading");

      let userAddress = coinbase;
      let signature = "";
      if (window.WALLET_TYPE === "matchId" && userAddress) {
        let signatureData = "";
        if (walletClient) {
          setshowSync(false);
          const res = await signMessage({
            message: `Signing one-time nonce: ${nonce}`,
            account: userAddress,
          }).catch((e) => {
            console.log(e);
            setsyncStatus("error");
            const timer = setTimeout(() => {
              setsyncStatus("initial");
              setshowSync(false);
            }, 3000);
            return () => clearTimeout(timer);
          });

          if (res) {
            signatureData = res;

            verifyWallet({
              variables: {
                publicAddress: userAddress,
                signature: signatureData,
              },
            });

            handleManageLogin(
              signatureData,
              `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
            );
          }
        }
      }
      if (isConnected && userAddress) {
        signature = await signMessageWagmi(wagmiClient, { message: message });
        //  await signMessageAsync({ message, account: userAddress });
      } else if (
        typeof window !== "undefined" &&
        (window.ethereum || window.BinanceChain)
      ) {
        const transport = window.ethereum ?? window.BinanceChain;
        const client = createWalletClientWagmi({
          transport: custom(transport),
        });

        let accounts = await client.getAddresses();
        if (!accounts.length && "requestAddresses" in client) {
          accounts = await client.requestAddresses();
        }
        const [account] = accounts;
        if (!account) throw new Error("No wallet account available");

        userAddress = account;
        signature = await client.signMessage({ account, message });
      } else {
        throw new Error("No wallet available. Connect a wallet first.");
      }

      await verifyWallet({
        variables: {
          publicAddress: userAddress,
          signature,
        },
      });

      refreshSubscription(userAddress);
      handleManageLogin(signature, message);

      setsyncStatus("success");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 1000);
    } catch (error) {
      console.error("signWalletPublicAddress error", error);
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 3000);
    }
  };

  const onSuccessLogin = async () => {
    await generateNonce({
      variables: {
        publicAddress: coinbase,
      },
    });
  };

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
      setsyncStatus("success");
      const timer = setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dataVerify, refetchPlayer]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce, matchainAddress]);

  useEffect(() => {
    if (
      authToken !== undefined &&
      isTokenExpired(authToken) &&
      userWallet &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() === userWallet.toLowerCase()
    ) {
      onSuccessLogin();
    }
  }, [authToken, userWallet, isConnected, coinbase]);

  useEffect(() => {
    fetchEthStaking();
    fetchMonthlyPlayers();
    fetchTotalVolume();
    fetchTotalWodHolders();
    getTotalSupply();
    fetchBSCCoinPrice();
    fetchRecordsStar();
  }, []);

  useEffect(() => {
    fetchUserPools(coinbase);
    getWodBalance(coinbase);
    checkIfEOA(coinbase);
  }, [coinbase]);

  useEffect(() => {
    if (isConnected && coinbase) {
      fetchAllMyNfts(coinbase);
    }
  }, [coinbase, isConnected]);

  useEffect(() => {
    if (isConnected === true && coinbase && networkId === 1) {
      checkCawsToUse();
      getTimepieceNftMinted();
      myCAWStakes();
    }
  }, [
    user.userNFTs.myNFTSCaws.length,
    myCAWstakes.length,
    allCawsForTimepieceMint.length,
    isConnected,
    networkId,
    coinbase,
  ]);

  useEffect(() => {
    if (email && userWallet) {
      refreshSubscription(userWallet);
      fetchTreasureHuntData(email, userWallet);
    } else if (coinbase) {
      refreshSubscription(coinbase);
    } else refreshSubscription();
  }, [email, userWallet, coinbase]);

  useEffect(() => {
    if (recentListedNFTS2 && recentListedNFTS2.length > 0) {
      getOtherNfts();
    }
  }, [recentListedNFTS2]);

  useEffect(() => {
    if (latest20BoughtNFTS && latest20BoughtNFTS.length > 0) {
      getCawsSold();
    }
  }, [latest20BoughtNFTS]);

  useEffect(() => {
    if (allCawsNfts && allCawsNfts.length > 0) {
      fetchCawsNfts();
    }
  }, [allCawsNfts]);

  useEffect(() => {
    if (allWodNfts && allWodNfts.length > 0) {
      fetchLandNfts();
    }
  }, [allWodNfts]);

  useEffect(() => {
    if (allTimepieceNfts && allTimepieceNfts.length > 0) {
      fetchTimepieceNfts();
    }
  }, [allTimepieceNfts]);

  useEffect(() => {
    setAllStarData({
      rewards: monthlyStarPrizes,
      premium_rewards: monthlyStarPrizes,
      activeData: starRecords,
      previousData: [],
      player_data: [],
      is_active: [],
    });
  }, [starRecords]);

  return (
    <>
      <div
        className={`container-fluid ${
          location.pathname.includes("map") && "px-0"
        } main-wrapper2 px-0 position-relative`}
      >
        {!location.pathname.includes("ai-agent") &&
          !location.pathname.includes("staking") &&
          !location.pathname.includes("bridge") &&
          !location.pathname.includes("token-claim") &&
          !location.pathname.includes("account") &&
          !location.pathname.includes("trading-competition") &&
          !location.pathname.includes("bonus-otc") &&
          !location.pathname.includes("special-otc") &&
          !location.pathname.includes("special-otc-4") &&
          !location.pathname.includes("pool") &&
          !location.pathname.includes("pool2") &&
          !location.pathname.includes("auth") &&
          !location.pathname.includes("map") &&
          !location.pathname.includes("player") &&
          !location.pathname.includes("ResetPassword") &&
          !location.pathname.includes("forgotPassword") &&
          !location.pathname.includes("wod-okxwallet") &&
          !location.pathname.includes("keep-building") &&
          orynPop && <OrynFly onClose={() => setOrynPop(false)} />}
        <Header
          authToken={authToken}
          handleSignUp={handleShowWalletModal}
          coinbase={coinbase}
          // handleRedirect={() => {
          //   setFireAppContent(true);
          // }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          isConnected={isConnected}
          chainId={networkId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleSwitchChainBinanceWallet={handleSwitchNetwork}
          onLogout={() => {
            // setCount55(count55 + 1);
            // setlogoutCount(logoutCount + 1);
            handleLogout();
          }}
          onSigninClick={checkData}
          gameAccount={userWallet}
          email={email}
          username={username}
          loginListener={loginListener}
          onSyncClick={() => {
            setshowSync(true);
          }}
          network_matchain={chain}
        />
        <MobileNavbar
          isConnected={isConnected}
          email={email}
          authToken={authToken}
          handleSignUp={handleShowWalletModal}
          coinbase={coinbase}
          // handleRedirect={() => {
          //   setFireAppContent(true);
          // }}
          onLogout={() => {
            // setCount55(count55 + 1);
            // setlogoutCount(logoutCount + 1);
            handleLogout();
          }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          chainId={networkId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleSwitchChainBinanceWallet={handleSwitchNetwork}
          username={username}
          network_matchain={chain}
        />

        <Suspense
          fallback={
            <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
              <HashLoader
                color={"#554fd8"}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
        >
          <Routes>
            <Route path="/news/:newsId?/:titleId?" element={<News />} />

            <Route
              path="shop/nft/:nftId/:nftAddress?"
              element={
                <SingleNft
                  email={email}
                  coinbase={coinbase}
                  userWallet={userWallet}
                  isEOA={isEOA}
                  showWalletConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  authToken={authToken}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleSwitchChain={handleSwitchNetwork}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  favorites={favorites}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  ethTokenData={ethTokenData}
                  lowestPriceNftListed={lowestPriceNftListed}
                />
              }
            />

            <Route
              path="/list-my-nft"
              element={
                <ListNFT
                  email={email}
                  userWallet={userWallet}
                  isEOA={isEOA}
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  myCawsCollected={user.userNFTs.myNFTSCaws}
                  myLandCollected={user.userNFTs.myNFTSLand}
                  myTimepieceCollected={user.userNFTs.myNFTSTimepiece}
                  screen={"list"}
                  authToken={authToken}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleSwitchChain={handleSwitchNetwork}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  favorites={favorites}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  ethTokenData={ethTokenData}
                  lowestPriceNftListed={lowestPriceNftListed}
                  allListed={allListedByUser}
                />
              }
            />

            <Route
              exact
              path="/"
              element={
                <Home
                  handleRegister={handleRegister}
                  allStarData={allStarData}
                  wodHolders={wodHolders}
                  totalVolumeNew={totalVolumeNew}
                  coinbase={coinbase}
                  ethTokenData={ethTokenData}
                  cawsListed={cawsListed}
                  wodListed={wodListed}
                  timepieceListed={timepieceListed}
                  totalSupply={totalSupply}
                  monthlyPlayers={monthlyPlayers}
                  percent={percent}
                  socials={socials}
                />
              }
            />
            <Route exact path="/tokenomics" element={<Token />} />
            {/* <Route exact path="/agent" element={<AiAgent />} /> */}
            <Route
              exact
              path="/ai-agent"
              element={
                <Agent
                  isConnected={isConnected}
                  coinbase={coinbase}
                  handleConnectWallet={() => setWalletModal(true)}
                  email={email}
                  isEOA={isEOA}
                  premiumOryn={premiumOryn}
                  chainId={networkId}
                  handleSwitchNetwork={handleSwitchNetwork}
                  checkPremiumOryn={checkPremiumOryn}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />
            <Route
              exact
              path="/notifications"
              element={
                <Notifications
                  handleRefreshList={handleRefreshList}
                  coinbase={coinbase}
                  nftCount={nftCount}
                  isConnected={isConnected}
                  authToken={authToken}
                />
              }
            />
            <Route
              exact
              path="/cliff-and-vesting"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/pool"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="pool"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/pool2"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="pool2"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/pool-bonus"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="pool-bonus"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/pool-dynamic"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="pool-dynamic"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/pool2-dynamic"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="pool2-dynamic"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/wod-dynamic"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="wod-dynamic"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/special-otc"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="special-otc"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/special-otc-4"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="special-otc-4"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/cliff-otc"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="cliff-otc"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/cliff1-otc4"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="cliff1-otc4"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/cliff-otc2"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="cliff-otc2"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/bonus-otc"
              element={
                <Whitelist
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  type="bonus-otc"
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route
              exact
              path="/token-claim"
              element={
                <Release
                  isEOA={isEOA}
                  chainId={networkId}
                  isConnected={isConnected}
                  handleConnection={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  coinbase={coinbase}
                  handleSwitchNetwork={handleSwitchNetwork}
                  network_matchain={chain}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  wagmiWalletClient={wagmiWalletClient}
                  wagmiPublicClient={wagmiPublicClient}
                />
              }
            />

            <Route exact path="/roadmap" element={<Roadmap />} />

            <Route
              exact
              path="/launchpool"
              element={
                <Launchpool
                  wodHolders={wodHolders}
                  totalVolumeNew={totalVolumeNew}
                  totalSupply={totalSupply}
                  monthlyPlayers={monthlyPlayers}
                />
              }
            />
            {/* <Route exact path="/team" element={<OurTeam />} /> */}
            {/* <Route
            exact
            path="/explorer"
            element={<Explorer />}
          /> */}
            {/* <Route exact path="/stake" element={<NftMinting />} /> */}
            <Route exact path="/contact-us" element={<PartnerForm />} />
            <Route exact path="/unsubscribe/:email" element={<Unsubscribe />} />
            <Route
              exact
              path="/caws-timepiece"
              element={
                <TimePiece
                  coinbase={coinbase}
                  showWalletConnect={() => setWalletModal(true)}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  timepieceMetadata={timepieceMetadata}
                />
              }
            />
            {/*
          <Route
            exact
            path="/shop/nft-bridge"
            element={
              <NFTBridge
                coinbase={coinbase}
                showWalletConnect={() => setWalletModal(true)}
                chainId={networkId}
                isConnected={isConnected}
                myNFTSLand={
                  networkId === 1
                    ? myLandNFTs
                    : networkId === 56
                    ? myLandNFTsBnb
                    : networkId === 43114
                    ? myLandNFTsAvax
                    : networkId === 8453
                    ? myLandNFTsBase
                    : myLandNFTs
                }
                myNFTSCaws={
                  networkId === 1
                    ? MyNFTSCaws2
                    : networkId === 56
                    ? MyNFTSCawsBnb
                    : networkId === 43114
                    ? MyNFTSCawsAvax
                    : networkId === 8453
                    ? MyNFTSCawsBase
                    : MyNFTSCaws2
                }
                handleSwitchNetwork={handleSwitchNetwork}
                onSuccessTransfer={() => {
                  setCount(count + 1);
                }}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                
                
                network_matchain={chain}
              />
            }
          />*/}

            <Route
              exact
              path="/join-beta"
              element={
                <JoinBeta
                  coinbase={coinbase}
                  handleRegister={handleBetaRegister}
                />
              }
            />

            <Route
              exact
              path="/auth"
              element={
                <Auth
                  onSuccessLogin={() => {
                    setloginListener(loginListener + 1);
                    refetchPlayer();
                  }}
                />
              }
            />

            <Route exact path="/redirect" element={<Redirect />} />

            <Route
              exact
              path="/bnbchain-alliance-program"
              element={
                <AuthBNB
                  onLinkWallet={onSuccessLogin}
                  type="bnb"
                  onSuccessLogin={() => {
                    refetchPlayer();
                  }}
                  data={data}
                  syncStatus={syncStatus}
                />
              }
            />

            <Route
              exact
              path="/wod-okxwallet"
              element={
                <AuthBNB
                  onSuccessLogin={() => {
                    refetchPlayer();
                  }}
                  onLinkWallet={onSuccessLogin}
                  type="okx"
                  data={data}
                  syncStatus={syncStatus}

                />
              }
            />

            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/ResetPassword" element={<ResetPassword />} />
            <Route
              exact
              path="/player"
              element={
                <PlayerCreation
                  onPlayerSuccessfulCreate={() => {
                    refetchPlayer();
                  }}
                />
              }
            />

            <Route
              exact
              path="/account"
              element={
                <Dashboard
                  email={email}
                  userId={userId}
                  username={username}
                  userWallet={userWallet}
                  setRoyalChestIndex={(value) => {
                    setRoyalChestIndex(value);
                  }}
                  setRoyalChestIndexTaiko={(value) => {
                    setRoyalChestIndexTaiko(value);
                  }}
                  royaltyCount={royaltyCount}
                  onOpenRoyaltyChest={(value) => {
                    setOpenedRoyaltyChest(value);
                  }}
                  onOpenRoyaltyChestTaiko={(value) => {
                    setOpenedRoyaltyChestTaiko(value);
                  }}
                  isEOA={isEOA}
                  wodBalance={wodBalance}
                  authToken={authToken}
                  dailyBonuslistedNFTS={listedNFTS}
                  openKickstarter={() => setKickstarter(true)}
                  onSuccessDeposit={() => {
                    // setCount55(count55 + 1);
                    setTimeout(() => {
                      dispatch(setUserProgress({ isPremium: true }));
                    }, 2000);
                  }}
                  onSyncClick={() => {
                    setshowSync(true);
                  }}
                  syncStatus={syncStatus}
                  syncCount={syncCount}
                  logoutCount={logoutCount}
                  userTreasureHuntStats={user.userStats}
                  userCollectedNFTS={user.userNFTs}
                  treasureHuntEvents={treasureHuntEvents}
                  handleSwitchChain={handleSwitchChain}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  onSigninClick={checkData}
                  handleSwitchNetwork={handleSwitchNetwork}
                  isPremium={isPremium}
                  handleConnectionPassport={handleConnectPassport}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  latest20BoughtNFTS={latest20BoughtNFTS}
                  onManageLogin={handleSync}
                  isTokenExpired={() => {
                    isTokenExpired(authToken);
                  }}
                  listedNFTS={allListedByUser}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />

            <Route
              exact
              path="/account/prime"
              element={
                <Dashboard
                  email={email}
                  userId={userId}
                  username={username}
                  userWallet={userWallet}
                  setRoyalChestIndex={(value) => {
                    setRoyalChestIndex(value);
                  }}
                  setRoyalChestIndexTaiko={(value) => {
                    setRoyalChestIndexTaiko(value);
                  }}
                  royaltyCount={royaltyCount}
                  onOpenRoyaltyChest={(value) => {
                    setOpenedRoyaltyChest(value);
                  }}
                  onOpenRoyaltyChestTaiko={(value) => {
                    setOpenedRoyaltyChestTaiko(value);
                  }}
                  isEOA={isEOA}
                  wodBalance={wodBalance}
                  authToken={authToken}
                  dailyBonuslistedNFTS={listedNFTS}
                  openKickstarter={() => setKickstarter(true)}
                  onSuccessDeposit={() => {
                    // setCount55(count55 + 1);
                    setTimeout(() => {
                      dispatch(setUserProgress({ isPremium: true }));
                    }, 2000);
                  }}
                  onSyncClick={() => {
                    setshowSync(true);
                  }}
                  syncStatus={syncStatus}
                  syncCount={syncCount}
                  logoutCount={logoutCount}
                  userTreasureHuntStats={user.userStats}
                  userCollectedNFTS={user.userNFTs}
                  treasureHuntEvents={treasureHuntEvents}
                  handleSwitchChain={handleSwitchChain}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  onSigninClick={checkData}
                  handleSwitchNetwork={handleSwitchNetwork}
                  isPremium={isPremium}
                  handleConnectionPassport={handleConnectPassport}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  latest20BoughtNFTS={latest20BoughtNFTS}
                  onManageLogin={handleSync}
                  isTokenExpired={() => {
                    isTokenExpired(authToken);
                  }}
                  listedNFTS={allListedByUser}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />

            <Route
              exact
              path="/land"
              element={
                <Land
                  handleConnectWallet={handleConnectWallet}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  handleRegister={handleRegister}
                  chainId={networkId}
                  showForms={showForms2}
                  socials={socials}
                />
              }
            />
            <Route
              exact
              path="/terms-of-service"
              element={<TermsConditions />}
            />
            <Route
              exact
              path="/binancewallet-campaign-rules"
              element={<BinanceCampaignRules />}
            />

            <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              exact
              path="/shop"
              element={
                <Marketplace
                  totalSupply={totalSupply}
                  wodHolders={wodHolders}
                  totalVolumeNew={totalVolumeNew}
                  ethTokenData={ethTokenData}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  latest20RecentListedNFTS={latest20RecentListedNFTS}
                  loadingRecentListings={loadingRecentListings}
                  loadingRecentSales={loadingRecentSales}
                  monthlyPlayers={monthlyPlayers}
                  recentSales={latest20BoughtNFTS ?? []}
                  nftCount={nftCount}
                  chainId={networkId}
                  hasNft={
                    user.userNFTs.myNFTSCaws.length > 0 ||
                    user.userNFTs.myNFTSLand.length > 0 ||
                    user.userNFTs.myNFTSTimepiece.length > 0
                  }
                />
              }
            />

            <Route
              exact
              path="/shop/mint/timepiece"
              element={
                <MarketMint
                  isEOA={isEOA}
                  coinbase={coinbase}
                  showWalletConnect={() => setWalletModal(true)}
                  handleSwitchNetwork={handleSwitchNetwork}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  timepieceMetadata={timepieceMetadata}
                  nftCreated={totalTimepieceCreated}
                  totalCreated={totalTimepieceCreated}
                  network_matchain={chain}
                />
              }
            />
            <Route
              exact
              path="/shop/caws"
              element={
                <CawsNFT
                  ethTokenData={ethTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  cawsBought={cawsBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  chainId={networkId}
                  caws={cawsListed}
                />
              }
            />
            <Route
              exact
              path="/shop/land"
              element={
                <WoDNFT
                  ethTokenData={ethTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  wodBought={landBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  chainId={networkId}
                  wod={wodListed}
                />
              }
            />
            <Route
              exact
              path="/shop/timepiece"
              element={
                <TimepieceNFT
                  ethTokenData={ethTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  chainId={networkId}
                  timepiece={timepieceListed}
                />
              }
            />

            <Route
              exact
              path="/reset-password"
              element={<ResetPasswordTest />}
            />

            {/* {email &&
            data &&
            data.getPlayer &&
            data.getPlayer.displayName &&
            data.getPlayer.playerId &&
            data.getPlayer.wallet &&
            data.getPlayer.wallet.publicAddress && ( */}
            <Route
              exact
              path="/loyalty-program"
              element={
                <LoyaltyProgram
                  coinbase={coinbase}
                  isConnected={isConnected}
                  handleConnection={handleConnectWallet}
                  email={email}
                  onConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                />
              }
            />
            {/* )} */}

            {betaPasses.map((item) => {
              return (
                <Route
                  exact
                  key={item.path}
                  path={item}
                  element={
                    <BetaPassNFT
                      isConnected={isConnected}
                      coinbase={coinbase}
                      chainId={networkId}
                      success={success}
                      showWalletConnect={() => setWalletModal(true)}
                      email={email}
                      userTreasureHuntStats={user.userStats}
                    />
                  }
                />
              );
            })}

            <Route exact path="/caws" element={<Caws />} />

            <Route
              exact
              path="/account/challenges/:eventId"
              element={
                <Dashboard
                  email={email}
                  userId={userId}
                  username={username}
                  userWallet={userWallet}
                  setRoyalChestIndex={(value) => {
                    setRoyalChestIndex(value);
                  }}
                  setRoyalChestIndexTaiko={(value) => {
                    setRoyalChestIndexTaiko(value);
                  }}
                  royaltyCount={royaltyCount}
                  onOpenRoyaltyChest={(value) => {
                    setOpenedRoyaltyChest(value);
                  }}
                  onOpenRoyaltyChestTaiko={(value) => {
                    setOpenedRoyaltyChestTaiko(value);
                  }}
                  isEOA={isEOA}
                  wodBalance={wodBalance}
                  authToken={authToken}
                  dailyBonuslistedNFTS={listedNFTS}
                  openKickstarter={() => setKickstarter(true)}
                  onSuccessDeposit={() => {
                    // setCount55(count55 + 1);
                    setTimeout(() => {
                      dispatch(setUserProgress({ isPremium: true }));
                    }, 2000);
                  }}
                  onSyncClick={() => {
                    setshowSync(true);
                  }}
                  syncStatus={syncStatus}
                  syncCount={syncCount}
                  logoutCount={logoutCount}
                  userTreasureHuntStats={user.userStats}
                  userCollectedNFTS={user.userNFTs}
                  treasureHuntEvents={treasureHuntEvents}
                  handleSwitchChain={handleSwitchChain}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  onSigninClick={checkData}
                  handleSwitchNetwork={handleSwitchNetwork}
                  isPremium={isPremium}
                  handleConnectionPassport={handleConnectPassport}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  latest20BoughtNFTS={latest20BoughtNFTS}
                  onManageLogin={handleSync}
                  isTokenExpired={() => {
                    isTokenExpired(authToken);
                  }}
                  listedNFTS={allListedByUser}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />

            <Route
              exact
              path="/token"
              element={<Token wodPrice={wodPrice} />}
            />
            <Route
              exact
              path="/bridge"
              element={
                <Bridge
                  isConnected={isConnected}
                  coinbase={coinbase}
                  chainId={networkId}
                  handleSwitchNetwork={handleSwitchNetwork}
                  onConnect={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  wodBalance={wodBalance}
                />
              }
            />
            <Route
              exact
              path="/staking"
              element={
                <Earn
                  isEOA={isEOA}
                  isConnected={isConnected}
                  coinbase={coinbase}
                  chainId={networkId}
                  handleSwitchNetwork={handleSwitchNetwork}
                  onConnectWallet={() => {
                    setWalletId("connect");
                    setWalletModal(true);
                  }}
                  nftPools={nftPools}
                  tokenPools={tokenPools}
                  isPremium={isPremium}
                  tvl={nftTvl}
                  wodBalance={wodBalance}
                  userPools={userPools}
                  onSuccessfulStake={() => {
                    setstakeCount(stakeCount + 1);
                  }}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  bnbUSDPrice={bnbUSDPrice}
                />
              }
            />

            <Route
              exact
              path="/governance"
              element={
                <Governance
                  isConnected={isConnected}
                  coinbase={coinbase}
                  chainId={networkId}
                  wodBalance={wodBalance}
                  handleSwitchNetwork={handleSwitchNetwork}
                  handleSwitchChainGateWallet={handleSwitchNetwork}
                  handleSwitchChainBinanceWallet={handleSwitchNetwork}
                  handleConnection={() => setWalletModal(true)}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />
            <Route
              exact
              path="/campaigns"
              element={<Campaigns coinbase={coinbase} />}
            />
            <Route
              exact
              path="/trading-competition"
              element={
                <TradingComp coinbase={coinbase} isConnected={isConnected} />
              }
            />

            <Route exact path="/wod-bitget" element={<WodBitGet />} />
            <Route
              exact
              path="/governance/proposal/:proposalId"
              element={
                <GovernanceInner
                  isConnected={isConnected}
                  coinbase={coinbase}
                  chainId={networkId}
                  handleConnection={() => setWalletModal(true)}
                  wodBalance={wodBalance}
                  refreshBalance={() => {
                    setcountBalance(countBalance + 1);
                  }}
                  walletClient={walletClient}
                  publicClient={publicClient}
                  network_matchain={chain}
                />
              }
            />

            <Route
              exact
              path="/game"
              element={<Game allStarData={allStarData} />}
            />
            <Route
              exact
              path="/about"
              element={<About wodPrice={wodPrice} />}
            />
            <Route
              exact
              path="/map"
              element={<Map treasureHuntEvents={treasureHuntEvents} />}
            />
            <Route
              exact
              path="/keep-building"
              element={
                <KickstarterPage
                  monthlyPlayers={monthlyPlayers}
                  totalVolumeNew={totalVolumeNew}
                  wodHolders={wodHolders}
                />
              }
            />
          </Routes>
        </Suspense>

        <ScrollTop />
        <Footer />
      </div>
      {/*{domainPopup && (
        <DomainModal
          onClose={() => setDomainPopup(false)}
          onSearch={searchDomain}
          available={availableDomain}
          price={domainPrice}
          chainId={networkId}
          bnbUSDPrice={bnbUSDPrice}
          onRegister={registerDomain}
          loading={loadingDomain}
          successMessage={successMessage}
          successDomain={successDomain}
          metadata={domainMetaData}
          bscAmount={bscAmount}
        />
      )}*/}

      {/* Register flow now unified via global WalletModal */}
      {/* Beta modal deprecated in favor of dedicated route */}

      {wallet.walletModal === true && wallet.walletId === "connect" && (
        <WalletModal
          show={wallet.walletId === "connect" && wallet.walletModal === true}
          handleClose={() => setWalletModal(false)}
          // handleConnection={() => {
          //   handleConnectWallet();
          // }}
          handleConnectionPassport={handleConnectPassport}
          handleConnectionMatchId={handleConnectionMatchId}
        />
      )}

      {showSync === true && (
        <SyncModal
          onCancel={() => {
            setshowSync(false);
          }}
          onclose={() => {
            setshowSync(false);
          }}
          open={showSync === true}
          onConfirm={handleSync}
          syncStatus={syncStatus}
        />
      )}
      {betaModal === true && (
        <JoinBetaModal
          open={betaModal}
          onClose={() => {
            setBetaModal(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={isConnected}
        />
      )}
      {(kickstarter || hashValue === "#royalty-chest") &&
        window.location.pathname.includes("/account") && (
          <Kickstarter
            royalChestIndex={royalChestIndex}
            // royalChestIndexTaiko={royalChestIndexTaiko}
            publicClient={publicClient}
            onClaimRewards={() => setRoyaltyCount(royaltyCount + 1)}
            walletClient={walletClient}
            onClose={() => {
              setKickstarter(false);
              html.classList.remove("hidescroll");
              window.location.hash = "";
            }}
            isOpen={
              kickstarter ||
              (hashValue === "#royalty-chest" &&
                window.location.pathname.includes("/account"))
            }
            username={username}
            coinbase={coinbase}
            chainId={networkId}
            handleSwitchNetwork={handleSwitchNetwork}
            isConnected={isConnected}
            email={email}
            address={userWallet}
            onConnectWallet={() => setWalletModal(true)}
            openedRoyaltyChest={openedRoyaltyChest}
            // openedRoyaltyChestTaiko={openedRoyaltyChestTaiko}
          />
        )}
    </>
  );
}

export default function App() {
  const [fireAppcontent, setFireAppContent] = useState(false);

  // Memory optimization for the main App component
  useMemoryOptimization({
    enableLogging: process.env.NODE_ENV === "development",
    logInterval: 120000, // Log every 2 minutes in development
  });

  function UnAuthenticatedContent() {
    setFireAppContent(false);

    return (
      <React.Fragment>
        <Navigate to="/account" />
      </React.Fragment>
    );
  }

  const AccountAppContent = () => {
    const { isLoading, isAuthenticated, playerId, email } = useAuth();
    console.log(isLoading, isAuthenticated, playerId, email);
    useEffect(() => {
      if (!isLoading || !isAuthenticated || !playerId) {
        setFireAppContent(false);
      }
    }, [isLoading, isAuthenticated, playerId]);

    if (isLoading) {
      return <LandingScreen />;
    }

    if (isAuthenticated) {
      if (!playerId) {
        return (
          <React.Fragment>
            <Navigate to="/player" />
          </React.Fragment>
        );
      }
      if (email) {
        return (
          <React.Fragment>
            <Navigate to="/account" />
          </React.Fragment>
        );
      }
    }

    return <UnAuthenticatedContent />;
  };

  return (
    <ThemeProvider>
      <CandlelightCursor />
      <WalletSync /> {/* keeps Redux wallet state in sync */}
      <AppRoutes />
      {fireAppcontent === true && <AccountAppContent />}
      <MemoryMonitor enabled={process.env.NODE_ENV === "development"} />
      <FestiveElements />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
