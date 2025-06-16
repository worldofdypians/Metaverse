import Home from "./screens/Home/Home";
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./fonts/Organetto.ttf";
import { Amplify } from "aws-amplify";
import { useMutation } from "@apollo/client";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./screens/Account/src/aws-exports";
import "./screens/Account/src/App.css";
import { checkout, passport, config } from "@imtbl/sdk";
import { useAuth } from "./screens/Account/src/Utils.js/Auth/AuthDetails.js";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.js";
import Dashboard from "./screens/Account/src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";
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
import axios from "axios";
import Unsubscribe from "./screens/Unsubscribe/Unsubscribe";
import Marketplace from "./screens/Marketplace/Marketplace";
import getListedNFTS from "./actions/Marketplace";
import {
  getAllNfts,
  getCawsNfts,
  getTimepieceNfts,
  getWodNfts,
} from "./actions/convertUsd.js";
import CawsNFT from "./screens/Marketplace/MarketNFTs/CawsNFT";
import WoDNFT from "./screens/Marketplace/MarketNFTs/WoDNFT";
import TimepieceNFT from "./screens/Marketplace/MarketNFTs/TimepieceNFT";
import SingleNft from "./screens/Marketplace/MarketNFTs/SingleNft";
import { useLocation, useNavigate } from "react-router-dom";
import MarketMint from "./screens/Marketplace/MarketMint";
import Notifications from "./screens/Marketplace/Notifications/Notifications";
import BetaPassNFT from "./screens/Marketplace/MarketNFTs/BetaPassNFT";
import SIDRegister from "@web3-name-sdk/register";
import { createWeb3Name } from "@web3-name-sdk/core";
import { ethers, providers } from "ethers";
import { getWeb3Connector } from "@binance/w3w-web3-connector";
import { useWeb3React } from "@web3-react/core";
import DomainModal from "./components/DomainModal/DomainModal.js";
import Web3 from "web3";
import Caws from "./screens/Caws/Caws.js";
import AuthBNB from "./screens/Account/src/Containers/Auth/AuthBNB.js";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import Bridge from "./screens/Wod/Bridge/Bridge.js";
import Earn from "./screens/Wod/Earn/Earn.js";
import Governance from "./screens/Community/Governance/Governance.js";
import GovernanceInner from "./screens/Community/Governance/GovernanceContent/GovernanceInner.js";
import GameUpdates from "./screens/Community/GameUpdates/GameUpdates.js";
import { useQuery } from "@apollo/client";
import {
  GENERATE_NONCE,
  GET_PLAYER,
  VERIFY_WALLET,
} from "./screens/Account/src/Containers/Dashboard/Dashboard.schema.js";
import ResetPasswordTest from "./screens/ResetPassword/ResetPassword.js";
import Redirect from "./screens/Home/Redirect";
import Token from "./screens/Token/Token";
import LoyaltyProgram from "./screens/LoyaltyProgram/LoyaltyProgram.js";
import { monthlyStarPrizes } from "./screens/Account/src/Containers/Dashboard/stars.js";
import { isMobile } from "react-device-detect";
import About from "./screens/About/About.js";
import Game from "./screens/Game/Game.js";
import Campaigns from "./screens/Community/Campaigns/Campaigns.js";
import Map from "./screens/Map/Map.js";
import { markers } from "./screens/Map/mapdata/markers.js";
import Whitelist from "./screens/Whitelist/Whitelist.js";
import Release from "./screens/Release/Release.js";
import BinanceCampaignRules from "./screens/TermsConditions/BinanceCampaignRules.js";
import Launchpool from "./screens/Launchpool/Launchpool.js";
import ListNFT from "./screens/Marketplace/MarketNFTs/ListNFT";
import NFTBridge from "./screens/NFTBridge/NftBridge";
import Agent from "./screens/NewAgent/Agent.js";
import OrynFly from "./components/OrynFly/OrynFly.js";
import "@matchain/matchid-sdk-react/index.css";
import { Hooks } from "@matchain/matchid-sdk-react";
import { useMatchChain } from "@matchain/matchid-sdk-react/hooks";
import { http, createPublicClient } from "viem";
import SyncModal from "./screens/Marketplace/MarketNFTs/SyncModal.js";
import TradingComp from "./screens/Community/Campaigns/TradingComp/TradingComp.js";
import WodBitGet from "./screens/Community/Campaigns/WodBitGet/WodBitGet.js";

const PUBLISHABLE_KEY = "pk_imapik-BnvsuBkVmRGTztAch9VH"; // Replace with your Publishable Key from the Immutable Hub
const CLIENT_ID = "FgRdX0vu86mtKw02PuPpIbRUWDN3NpoE"; // Replace with your passport client ID

const baseConfig = {
  environment: config.Environment.PRODUCTION,
  publishableKey: PUBLISHABLE_KEY,
};

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.PRODUCTION,
    publishableKey: PUBLISHABLE_KEY,
  },
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

const Connector = getWeb3Connector();
const binanceConnector = new Connector({
  lng: "en-US",
  supportedChainIds: [1, 56, 204, 169, 1030, 8453, 43114],
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
    1: "https://mainnet.infura.io/v3/04ee2486b5344943b461abeb58fbffaf",
    204: window.config.opbnb_endpoint,
    169: window.config.manta_endpoint,
    1030: window.config.conflux_endpoint,
    8453: window.config.base_endpoint,
    43114: window.config.avax_endpoint,
  },
});

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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 6 * 60 * 1000,
    refetchOnWindowFocus: true,
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
    refetchOnWindowFocus: true,
    refetchInterval: false,
    enabled: !!wallet,
  });
};

function App() {
  const dataFetchedRef = useRef(false);

  const CHAINLIST = {
    1: {
      chainId: 1,
      chainName: "Ethereum",
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      nativeCurrency: {
        symbol: "eth",
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io"],
    },
    56: {
      chainId: 56,
      chainName: "BSC",
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
    1030: {
      chainId: 1030,
      chainName: "CFX",
      rpcUrls: ["https://evm.confluxrpc.com"],
      nativeCurrency: {
        symbol: "cfx",
        decimals: 18,
      },
      blockExplorerUrls: ["https://evm.confluxscan.net"],
    },
    204: {
      chainId: 204,
      chainName: "opBNB",
      rpcUrls: ["https://opbnb.publicnode.com"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },

      blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
    },

    167000: {
      chainId: 167000,
      chainName: "Taiko Mainnet",
      rpcUrls: ["https://rpc.mainnet.taiko.xyz"],
      nativeCurrency: {
        symbol: "eth",
        decimals: 18,
      },

      blockExplorerUrls: ["https://taikoscan.io"],
    },

    1482601649: {
      chainId: 1482601649,
      chainName: "SKALE Nebula Hub",
      nativeCurrency: {
        symbol: "sFUEL",
        decimals: 18,
      },

      rpcUrls: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      blockExplorerUrls: [
        "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
      ],
    },
    1116: {
      chainId: 1116,
      chainName: "CORE",
      rpcUrls: ["https://core.drpc.org"],
      nativeCurrency: {
        symbol: "CORE",
        decimals: 18,
      },
      blockExplorerUrls: ["https://scan.coredao.org"],
    },
    88: {
      chainId: 88,
      chainName: "Viction",
      rpcUrls: ["https://rpc.viction.xyz"],
      nativeCurrency: {
        symbol: "VIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https:/vicscan.xyz"],
    },
    1329: {
      chainId: 1329,
      chainName: "Sei Network",
      rpcUrls: ["https://evm-rpc.sei-apis.com"],
      nativeCurrency: {
        symbol: "SEI",
        decimals: 18,
      },
      blockExplorerUrls: ["https://seitrace.com"],
    },
    13371: {
      chainId: 13371,
      chainName: "Immutable zkEVM",
      rpcUrls: ["https://rpc.immutable.com"],
      nativeCurrency: {
        symbol: "IMX",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.immutable.com"],
    },
    169: {
      chainId: 169,
      chainName: "Manta Pacific Mainnet",
      rpcUrls: ["https://pacific-rpc.manta.network/http"],
      nativeCurrency: {
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://pacific-explorer.manta.network/"],
    },
    698: {
      chainId: 698,
      chainName: "Matchain",
      rpcUrls: ["https://rpc.matchain.io"],
      nativeCurrency: {
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://matchscan.io"],
    },
    2040: {
      chainId: 2040,
      chainName: "Vanar Mainnet",
      rpcUrls: ["https://rpc.vanarchain.com"],
      nativeCurrency: {
        symbol: "VANRY",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.vanarchain.com/"],
    },
  };

  const { useUserInfo, useWallet } = Hooks;
  const { login, address, username, logout: logoutUser } = useUserInfo();
  const { signMessage, createWalletClient } = useWallet();
  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });
  

  const [monthlyPlayers, setMonthlyPlayers] = useState(0);
  const [percent, setPercent] = useState(0);
  const authToken = localStorage.getItem("authToken");
  const [orynPop, setOrynPop] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [betaModal, setBetaModal] = useState(false);

  const [totalSupply, setTotalSupply] = useState(0);

  const [isConnected, setIsConnected] = useState(false);
  const [loginListener, setloginListener] = useState(0);
  const [totalVolumeNew, setTotalVolumeNew] = useState(0);
  const [wodHolders, setWodHolders] = useState(0);
  const [coinbase, setCoinbase] = useState();
  const [gameAccount, setGameAccount] = useState();

  const [networkId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState();
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [count44, setCount44] = useState(0);
  const [count55, setCount55] = useState(0);
  const [cawsListed, setcawsListed] = useState([]);
  const [wodListed, setwodListed] = useState([]);
  const [timepieceListed, settimepieceListed] = useState([]);
  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);

  const [mybaseNFTsCreated, setmybaseNFTsCreated] = useState([]);
  const [myMantaNFTsCreated, setMyMantaNFTsCreated] = useState([]);

  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);
  const [walletModal, setwalletModal] = useState(false);
  const [walletId, setwalletId] = useState("connect");

  const [mintloading, setmintloading] = useState("initial");
  const [mintStatus, setmintStatus] = useState("");
  const [textColor, settextColor] = useState("#fff");
  const [finalCaws, setFinalCaws] = useState([]);
  const [limit, setLimit] = useState(0);
  const [allCawsForTimepieceMint, setAllCawsForTimepieceMint] = useState([]);
  const [timepieceMetadata, settimepieceMetadata] = useState([]);

  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);
  const [totalBaseNft, settotalBaseNft] = useState(0);
  const [totalMantaNft, setTotalMantaNft] = useState(0);

  const [totalseiNft, setTotalseiNft] = useState(0);

  const [baseMintAllowed, setbaseMintAllowed] = useState(1);

  const [mantaMintAllowed, setMantaMintAllowed] = useState(1);

  const [fireAppcontent, setFireAppContent] = useState(false);

  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [socials, setSocials] = useState([]);

  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);

  const [availTime, setavailTime] = useState();

  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);

  const [MyNFTSCaws2, setMyNFTSCaws2] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);

  const [MyNFTSCawsBnb, setMyNFTSCawsBnb] = useState([]);
  const [myLandNFTsBnb, setMyLandNFTsBnb] = useState([]);

  const [MyNFTSCawsAvax, setMyNFTSCawsAvax] = useState([]);
  const [myLandNFTsAvax, setMyLandNFTsAvax] = useState([]);

  const [MyNFTSCawsBase, setMyNFTSCawsBase] = useState([]);
  const [myLandNFTsBase, setMyLandNFTsBase] = useState([]);

  const [myBaseNFTs, setmyBaseNFTs] = useState([]);
  const [myseiNfts, setMyseiNfts] = useState([]);
  const [myMatNFTs, setMyMatNfts] = useState([]);
  const [mykucoinNFTs, setMykucoinNFTs] = useState([]);
  const [myOpbnbNfts, setmyOpbnbNfts] = useState([]);
  const [myVanarNFTs, setmyVanarNFTs] = useState([]);

  const [myMantaNfts, setMyMantaNfts] = useState([]);

  const [isBnb, setisBnb] = useState(false);
  const [isBnbSuccess, setisBnbSuccess] = useState(false);
  const [logoutCount, setLogoutCount] = useState(0);

  const [nftCount, setNftCount] = useState(1);
  const [countBalance, setcountBalance] = useState(1);

  const [count, setCount] = useState(1);

  const [dypTokenData, setDypTokenData] = useState(0);
  const [ethTokenData, setEthTokenData] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [binanceData, setbinanceData] = useState();

  const [isPremium, setIsPremium] = useState(false);
  const [premiumOryn, setPremiumOryn] = useState(false);

  const [domainPopup, setDomainPopup] = useState(false);
  const [showSync, setshowSync] = useState(false);
  const [syncStatus, setsyncStatus] = useState("initial");
  const [availableDomain, setAvailableDomain] = useState("initial");
  const [domainPrice, setDomainPrice] = useState(0);
  const [bnbUSDPrice, setBnbUSDPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDomain, setSuccessDomain] = useState(false);
  const [dogePrice, setDogePrice] = useState(0);

  const [domainName, setDomainName] = useState(null);
  const [loadingDomain, setLoadingDomain] = useState(false);
  const [domainMetaData, setDomainMetaData] = useState(null);
  const [totalTx, setTotalTx] = useState(0);
  const [totalvolume, setTotalVolume] = useState(0);
  const [bscAmount, setBscAmount] = useState(0);
  const [skaleAmount, setSkaleAmount] = useState(0);
  const [isCheckedNewsLetter, setisCheckedNewsLetter] = useState(false);
  const [wodPrice, setWodPrice] = useState(0);
  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  const location = useLocation();
  const navigate = useNavigate();
  const { BigNumber } = window;
  const { connector, account, chainId, active, isActive, isActivating, error } =
    useWeb3React();

  const { activate, deactivate, library, provider } = useWeb3React();

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2025-07-10T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dogeLastDay = new Date("2024-03-21T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");
  let skaleLastDay = new Date("2024-07-14T13:00:00.000+02:00");
  let bnbLastDay = new Date("2025-08-07T14:00:00.000+02:00");
  let coreLastDay = new Date("2025-04-04T14:00:00.000+02:00");
  let victionLastDay = new Date("2025-03-29T14:00:00.000+02:00");
  let coreLastDay2 = new Date("2025-08-08T14:00:00.000+02:00");

  let mantaLastDay = new Date("2025-08-13T14:00:00.000+02:00");
  let taikoLastDay = new Date("2025-08-02T14:00:00.000+02:00");
  let kucoinLastDay = new Date("2025-07-30T14:00:00.000+02:00");
  let cookieLastDay = new Date("2024-11-24T14:00:00.000+02:00");
  let chainlinkLastDay = new Date("2025-04-06T14:00:00.000+02:00");
  let seiLastDay = new Date("2025-08-16T14:00:00.000+02:00");

  let vanarLastDay = new Date("2025-09-16T14:00:00.000+02:00");

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

  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);
  const [activePlayerStar, setActivePlayerStar] = useState([]);
  const [userDataStar, setUserDataStar] = useState({});
  const [prevDataStar, setPrevDataStar] = useState([]);
  const [prevVersionStar, setPrevVersionStar] = useState(0);
  const [dataAmountStar, setDataAmountStar] = useState([]);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);

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

  const [coreEarnUsd, setCoreEarnUsd] = useState(0);
  const [corePrice, setCorePrice] = useState(0);
  const [coreEarnToken, setCoreEarnToken] = useState(0);
  const [corePoints, setCorePoints] = useState(0);
  const [victionEarnUsd, setVictionEarnUsd] = useState(0);
  const [victionPrice, setVictionPrice] = useState(0);
  const [victionEarnToken, setVictionEarnToken] = useState(0);
  const [victionPoints, setVictionPoints] = useState(0);

  const [vanarEarnUsd, setvanarEarnUsd] = useState(0);
  const [vanarPrice, setvanarPrice] = useState(0);
  const [vanarEarnToken, setvanarEarnToken] = useState(0);
  const [vanarPoints, setvanarPoints] = useState(0);

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

  const [easy2StakeEarnUsd, setEasy2StakeEarnUsd] = useState(0);
  const [easy2StakeEarnToken, setEasy2StakeEarnToken] = useState(0);
  const [easy2StakePoints, setEasy2StakePoints] = useState(0);

  const [midleEarnUsd, setMidleEarnUsd] = useState(0);
  const [midleEarnToken, setMidleEarnToken] = useState(0);
  const [midlePoints, setMidlePoints] = useState(0);

  const [kucoinEarnUsd, setKucoinEarnUsd] = useState(0);
  const [kucoinEarnToken, setKucoinEarnToken] = useState(0);
  const [kucoinPoints, setKucoinPoints] = useState(0);
  const [kucoinPrice, setKucoinPrice] = useState(0);

  const [mantaEarnUsd, setMantaEarnUsd] = useState(0);
  const [mantaPrice, setMantaPrice] = useState(0);
  const [mantaEarnToken, setMantaEarnToken] = useState(0);
  const [mantaPoints, setMantaPoints] = useState(0);

  const [multiversEarnUsd, setmultiversEarnUsd] = useState(0);
  const [multiversPrice, setmultiversPrice] = useState(0);
  const [multiversEarnToken, setmultiversEarnToken] = useState(0);
  const [multiversPoints, setmultiversPoints] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);
  const [seiEarnUsd, setSeiEarnUsd] = useState(0);
  const [seiEarnToken, setSeiEarnToken] = useState(0);
  const [seiEarnPoints, setSeiEarnPoints] = useState(0);

  const [chainlinkEarnUsd, setChainlinkEarnUsd] = useState(0);
  const [chainlinkEarnToken, setChainlinkEarnToken] = useState(0);
  const [chainlinkEarnPoints, setChainlinkEarnPoints] = useState(0);

  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [skaleEarnToken, setSkaleEarnToken] = useState(0);
  const [skalePoints, setSkalePoints] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);

  const [matEarnUsd, setmatEarnUsd] = useState(0);
  const [matEarnToken, setmatEarnToken] = useState(0);
  const [matPoints, setmatPoints] = useState(0);
  const [matPrice, setMatPrice] = useState(0);

  const [seiPrice, setSeiPrice] = useState(0);
  const [userEvents, setuserEvents] = useState(0);
  const [wodBalance, setwodBalance] = useState(0);
  const [nftPools, setnftPools] = useState([]);
  const [tokenPools, settokenPools] = useState([]);
  const [userPools, setUserPools] = useState([]);

  const [stakeCount, setstakeCount] = useState(0);

  const [nftTvl, setnftTvl] = useState(0);

  const userId = data?.getPlayer?.playerId;
  const userWallet = data?.getPlayer?.wallet?.publicAddress;
  const chain = useMatchChain();

  const walletClient = createWalletClient({
    chain: chain?.chain,
    transport: http(`${chain?.chain?.rpcUrls?.default?.http[0]}`),
  });

  const publicClient = createPublicClient({
    chain: chain?.chain,
    transport: http(`${chain?.chain?.rpcUrls?.default?.http[0]}`),
  });

  const handleFirstTask = async (wallet) => {
    if (wallet) {
      const result2 = await axios
        .get(`https://api.worldofdypians.com/api/dappbay/task2/${wallet}`)
        .catch((e) => {
          console.error(e);
        });
      if (result2 && result2.status === 200) {
        console.log(result2);
      }
    }
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
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 3000);
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
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
      ];

      let resultWodToken = bnb_result.data.stakingInfoWODBnb;
      let resultWodTokenTVL = bnb_result.data.totalTVL;

      let resultCaws = eth_result.data.stakingInfoCAWS;
      let resultLand = eth_result.data.stakingInfoLAND;
      let resultCawsLand = eth_result.data.stakinginfoCAWSLAND;

      let resultWodToken2 = resultWodToken.map((item) => {
        return {
          ...item,
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
    const userpools_result = await axios
      .get(`https://api.dyp.finance/api/user_pools_wod/${addr}`)
      .catch((err) => {
        console.log(err);
      });

    if (userpools_result && userpools_result.status === 200) {
      const allpools = userpools_result.data.PoolsUserIn;
      setUserPools(allpools);
    }
  };

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
            return obj.id === "bnbChainEvent10";
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

          const kucoinEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "kucoin";
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
            if (bnbEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              bnbEvent[0].reward.earn.total /
              bnbEvent[0].reward.earn.multiplier;
            const pointsBnb = bnbEvent[0].reward.earn.totalPoints;

            setBnbPoints(pointsBnb);
            setBnbEarnUsd(userEarnedusd);
            setBnbEarnToken(userEarnedusd / bnbPrice);
          }

          if (immutableEvent && immutableEvent[0]) {
            // if (immutableEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              immutableEvent[0].reward.earn.total /
              immutableEvent[0].reward.earn.multiplier;
            const pointsBnb = immutableEvent[0].reward.earn.totalPoints;

            setImmutablePoints(pointsBnb);
            setImmutableEarnUsd(userEarnedusd);
            setImmutableEarnToken(userEarnedusd / immutablePrice);
          }

          if (kucoinEvent && kucoinEvent[0]) {
            if (kucoinEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              kucoinEvent[0].reward.earn.total /
              kucoinEvent[0].reward.earn.multiplier;
            const pointskucoin = kucoinEvent[0].reward.earn.totalPoints;

            setKucoinPoints(pointskucoin);
            setKucoinEarnUsd(userEarnedusd);
            setKucoinEarnToken(userEarnedusd / kucoinPrice);
          }

          if (easy2stakeEvent && easy2stakeEvent[0]) {
            // if (easy2stakeEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }
            const userEarnedusd =
              easy2stakeEvent[0].reward.earn.total /
              easy2stakeEvent[0].reward.earn.multiplier;
            const pointsBnb = easy2stakeEvent[0].reward.earn.totalPoints;

            setEasy2StakePoints(pointsBnb);
            setEasy2StakeEarnUsd(userEarnedusd);
            setEasy2StakeEarnToken(userEarnedusd / bnbPrice);
          }

          if (taikoEvent && taikoEvent[0]) {
            if (taikoEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              taikoEvent[0].reward.earn.total /
              taikoEvent[0].reward.earn.multiplier;
            const pointsTaiko = taikoEvent[0].reward.earn.totalPoints;
            setTaikoPoints(pointsTaiko);
            setTaikoEarnUsd(userEarnedusd);
            setTaikoEarnToken(userEarnedusd / taikoPrice);
          }

          if (midleEvent && midleEvent[0]) {
            // if (midleEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              midleEvent[0].reward.earn.total /
              midleEvent[0].reward.earn.multiplier;
            const pointsMidle = midleEvent[0].reward.earn.totalPoints;
            setMidlePoints(pointsMidle);
            setMidleEarnUsd(userEarnedusd);
            setMidleEarnToken(userEarnedusd / bnbPrice);
          }
          if (chainlinkEvent && chainlinkEvent[0]) {
            if (chainlinkEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              chainlinkEvent[0].reward.earn.total /
              chainlinkEvent[0].reward.earn.multiplier;
            const pointschainlink = chainlinkEvent[0].reward.earn.totalPoints;
            setChainlinkEarnPoints(pointschainlink);
            setChainlinkEarnUsd(userEarnedusd);
            setChainlinkEarnToken(userEarnedusd / bnbPrice);
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

          if (coreEvent && coreEvent[0]) {
            if (coreEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;
            const pointsCore = coreEvent[0].reward.earn.totalPoints;
            setCorePoints(pointsCore);
            setCoreEarnUsd(userEarnedusd);
            setCoreEarnToken(userEarnedusd / corePrice);
          }

          if (seiEvent && seiEvent[0]) {
            if (seiEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              seiEvent[0].reward.earn.total /
              seiEvent[0].reward.earn.multiplier;
            const pointsSei = seiEvent[0].reward.earn.totalPoints;
            setSeiEarnPoints(pointsSei);
            setSeiEarnUsd(userEarnedusd);
            setSeiEarnToken(userEarnedusd / seiPrice);
          }

          if (vanarEvent && vanarEvent[0]) {
            if (vanarEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

            const userEarnedusd =
              vanarEvent[0].reward.earn.total /
              vanarEvent[0].reward.earn.multiplier;
            const pointsVanar = vanarEvent[0].reward.earn.totalPoints;
            setvanarPoints(pointsVanar);
            setvanarEarnUsd(userEarnedusd);
            setvanarEarnToken(userEarnedusd / vanarPrice);
          }
          if (matEvent && matEvent[0]) {
            // if (matEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              matEvent[0].reward.earn.total /
              matEvent[0].reward.earn.multiplier;
            const pointsMat = matEvent[0].reward.earn.totalPoints;
            setmatPoints(pointsMat);
            setmatEarnToken(userEarnedusd / bnbPrice);
            setmatEarnUsd(userEarnedusd);
          }

          if (victionEvent && victionEvent[0]) {
            // if (victionEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

            const userEarnedusd =
              victionEvent[0].reward.earn.total /
              victionEvent[0].reward.earn.multiplier;
            const pointsViction = victionEvent[0].reward.earn.totalPoints;
            setVictionPoints(pointsViction);
            setVictionEarnUsd(userEarnedusd);
            setVictionEarnToken(userEarnedusd / victionPrice);
          }

          if (mantaEvent && mantaEvent[0]) {
            if (mantaEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

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
            // if (coingeckoEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

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
            // if (skaleEvent[0].reward.earn.totalPoints > 0) {
            //   userActiveEvents = userActiveEvents + 1;
            // }

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
            if (baseEvent[0].reward.earn.totalPoints > 0) {
              userActiveEvents = userActiveEvents + 1;
            }

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
          setuserEvents(userActiveEvents);
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
    setPrevVersionStar(parseInt(result.data.data.version));
    setStarRecords(result.data.data.leaderboard);
    fillRecordsStar(result.data.data.leaderboard);
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
    const infura_web3 = window.infuraWeb3;
    let timepiece_contract = new infura_web3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );
    let result_base = 0;
    const result = await timepiece_contract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    for (let i = 0; i < 3; i++) {
      try {
        let web3 = new Web3(window.config.all_base_endpoints[i]);

        let base_contract = new web3.eth.Contract(
          window.BASE_NFT_ABI,
          window.config.nft_base_address
        );

        result_base = await base_contract.methods
          .totalSupply()
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });
      } catch (err) {
        const message = err?.message || "";

        console.warn(
          `Error with ${window.config.all_base_endpoints[i]}: ${message}`
        );

        const isRateLimited =
          message.toLowerCase().includes("rate limit") ||
          message.toLowerCase().includes("too many requests") ||
          message.toLowerCase().includes("over rate limit");

        if (isRateLimited) {
          console.log(
            `Rate limited on totalSupply ${window.config.all_base_endpoints[i]}. Trying next...`
          );
        }
      }
    }

    const confluxContract = new window.confluxWeb3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_conflux_address
    );
    const gateContract = new window.bscWeb3.eth.Contract(
      window.GATE_NFT_ABI,
      window.config.nft_gate_address
    );

    const dogeContract = new window.bscWeb3.eth.Contract(
      window.DOGE_NFT_ABI,
      window.config.nft_doge_address
    );

    const cmcContract = new window.bscWeb3.eth.Contract(
      window.CMC_NFT_ABI,
      window.config.nft_cmc_address
    );

    const skaleContract = new window.skaleWeb3.eth.Contract(
      window.SKALE_NFT_ABI,
      window.config.nft_skale_address
    );

    const bnbContract = new window.bscWeb3.eth.Contract(
      window.BNB_NFT_ABI,
      window.config.nft_bnb_address
    );

    const opbnbContract = new window.opBnbWeb3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_opbnb_address
    );

    const kucoinbContract = new window.opBnbWeb3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_kucoin_address
    );

    const victionContract = new window.victionWeb3.eth.Contract(
      window.VICTION_NFT_ABI,
      window.config.nft_viction_address.toLowerCase()
    );

    const coreContract = new window.coreWeb3.eth.Contract(
      window.CORE_NFT_ABI,
      window.config.nft_core_address
    );

    const multiversContract = new window.bscWeb3.eth.Contract(
      window.MULTIVERS_NFT_ABI,
      window.config.nft_multivers_address
    );

    const mantaContract = new window.mantaWeb3.eth.Contract(
      window.MANTA_NFT_ABI,
      window.config.nft_manta_address
    );

    const taikoContract = new window.taikoWeb3.eth.Contract(
      window.TAIKO_NFT_ABI,
      window.config.nft_taiko_address
    );

    const cookieContract = new window.bscWeb3.eth.Contract(
      window.COOKIE3_NFT_ABI,
      window.config.nft_cookie3_address
    );

    const matchainContract = new window.matWeb3.eth.Contract(
      window.MAT_NFT_ABI,
      window.config.nft_mat_address
    );

    const seiContract = new window.seiWeb3.eth.Contract(
      window.SEI_NFT_ABI,
      window.config.nft_sei_address
    );

    const vanarContract = new window.vanarWeb3.eth.Contract(
      window.VANAR_NFT_ABI,
      window.config.nft_vanar_address
    );

    const confluxresult = await confluxContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    const gateresult = await gateContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    const dogeresult = await dogeContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    const cmcresult = await cmcContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    const skaleresult = await skaleContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const bnbresult = await bnbContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const opbnbresult = await opbnbContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const kucoinresult = await kucoinbContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const coreresult = await coreContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const victionresult = await victionContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const multiversresult = await multiversContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const mantaresult = await mantaContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const taikoresult = await taikoContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const cookieresult = await cookieContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const matresult = await matchainContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const seiresult = await seiContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const vanarresult = await vanarContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    //20002 = 10000 caws + 1000 genesis + 9002 coingecko

    setTotalSupply(
      parseInt(result) +
        parseInt(result_base) +
        parseInt(confluxresult) +
        parseInt(gateresult) +
        parseInt(dogeresult) +
        parseInt(cmcresult) +
        parseInt(skaleresult) +
        parseInt(bnbresult) +
        parseInt(opbnbresult) +
        parseInt(coreresult) +
        parseInt(victionresult) +
        parseInt(multiversresult) +
        parseInt(mantaresult) +
        parseInt(taikoresult) +
        parseInt(cookieresult) +
        parseInt(matresult) +
        parseInt(seiresult) +
        parseInt(kucoinresult) +
        Number(vanarresult) +
        20002
    );
  };

  useEffect(() => {
    setAllStarData({
      rewards: monthlyStarPrizes,
      premium_rewards: monthlyStarPrizes,
      activeData: starRecords,
      previousData: prevDataStar,
      player_data: userDataStar,
      is_active: activePlayerStar, //change when apis are ready
    });
  }, [starRecords, prevDataStar, userDataStar, activePlayerStar]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (domainPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [domainPopup]);

  // const web3Name = createWeb3Name();

  const searchDomain = async (domain) => {
    if (window.ethereum && window.WALLET_TYPE !== "binance") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const register = new SIDRegister({ signer, chainId: 56 });
      const available = await register.getAvailable(domain).catch((e) => {
        console.error(e);
      });
      const price = await register.getRentPrice(domain, 1);
      const newPrice = new BigNumber(price._hex / 1e18).toFixed();
      setDomainPrice(newPrice);
      if (domain == "") {
        setAvailableDomain("initial");
      } else {
        setAvailableDomain(available);
      }
    } else if (window.WALLET_TYPE === "binance" && library) {
      const provider = library;
      const signer = provider.getSigner();
      const register = new SIDRegister({ signer, chainId: 56 });
      const available = await register.getAvailable(domain);
      const price = await register.getRentPrice(domain, 1);
      const newPrice = new BigNumber(price._hex / 1e18).toFixed();
      setDomainPrice(newPrice);
      if (domain == "") {
        setAvailableDomain("initial");
      } else {
        setAvailableDomain(available);
      }
    }
  };

  const registerDomain = async (label, years) => {
    if (window.ethereum && window.WALLET_TYPE !== "binance") {
      setLoadingDomain(true);
      const provider = ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const register = new SIDRegister({ signer, chainId: 56 });
      await register
        .register(label, address, years, {
          setPrimaryName: true,
          referrer: "dyp.bnb",
        })
        .then(() => {
          setSuccessMessage(
            "You have successfully registered your .bnb domain"
          );
          setSuccessDomain(true);
          setTimeout(() => {
            setSuccessMessage("");
            setSuccessDomain(false);
          }, 5000);
          setLoadingDomain(false);
        })
        .catch((e) => {
          setLoadingDomain(false);
          setSuccessDomain(false);
          setSuccessMessage(`Something went wrong: ${e?.data?.message}`);
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
          console.log(e);
        });
    } else if (window.WALLET_TYPE === "binance" && library) {
      setLoadingDomain(true);
      const provider = library;
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const register = new SIDRegister({ signer, chainId: 56 });
      await register
        .register(label, address, years, {
          setPrimaryName: true,
          referrer: "dyp.bnb",
        })
        .then(() => {
          setSuccessMessage(
            "You have successfully registered your .bnb domain"
          );
          setSuccessDomain(true);
          setTimeout(() => {
            setSuccessMessage("");
            setSuccessDomain(false);
          }, 5000);
          setLoadingDomain(false);
        })
        .catch((e) => {
          setLoadingDomain(false);
          setSuccessDomain(false);
          setSuccessMessage(
            `Something went wrong: ${{ e }.e.reason ?? "try again later"}`
          );
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
          console.log({ e }.e.reason);
        });
    }
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/ethereum")
      .then((obj) => {
        if (obj.data) {
          setEthTokenData(obj.data.price);
        }
      });
  };

  const getPriceDYP = async () => {
    const dypprice = await axios
      .get(
        "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x7c81087310a228470db28c1068f0663d6bf88679"
      )
      .then((res) => {
        return res.data.data.attributes.base_token_price_usd;
      })
      .catch((e) => {
        console.log(e);
      });

    setDypTokenData(dypprice);
    setDypTokenDatabnb(dypprice);
  };

  const fetchWodPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/world-of-dypians`)
      .then((res) => {
        if (res.data) {
          setWodPrice(res.data.price);
        }
      });
  };

  const fetchDogeCoinPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/dogecoin")
      .then((obj) => {
        if (obj.data) {
          setDogePrice(obj.data.price);
        }
      });
  };

  const fetchKucoinCoinPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/kucoin-shares")
      .then((obj) => {
        if (obj.data) {
          setKucoinPrice(obj.data.price);
        }
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/dogecoin")
      .then((obj) => {
        if (obj.data) {
          setBnbUSDPrice(obj.data.price);
          setBnbPrice(obj.data.price);
        }
      });

    await axios
      .get("https://api.worldofdypians.com/api/price/idefiyieldprotocol")
      .then((obj) => {
        if (obj.data) {
          setIDypTokenDatabnb(obj.data.price);
        }
      });
  };

  const handleSwitchChain = async () => {
    const { ethereum } = window;
    const ETHPARAMS = {
      chainId: "0x1", // A 0x-prefixed hexadecimal string
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
    };

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log(switchError, "switch");
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ETHPARAMS],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      // handle other "switch" errors
    }
  };

  const fetchAvatar = async (userAddr) => {
    const response = axios
      .get(`https://api-image.dyp.finance/api/v1/avatar/${userAddr}`)
      .then((data) => {
        if (data.data.avatar) {
          setAvatar(data.data.avatar);
        } else {
          setAvatar(null);
        }
      })
      .catch(console.error);

    return response;
  };

  const checkConnection = async () => {
    await window.getCoinbase().then((data) => {
      setCoinbase(data);
      // axios
      //   .get(`https://api-image.dyp.finance/api/v1/username/${data}`)
      //   .then((res) => {
      //     if (res.data?.username) {
      //       setUsername(res.data?.username);
      //     } else {
      //       setUsername("");
      //     }
      //   });
    });
  };
  // console.log(isConnected, coinbase);
  const checkConnection2 = async () => {
    const logout = localStorage.getItem("logout");
    if (logout !== "true") {
      if (window.gatewallet) {
        setCoinbase(account);
        setIsConnected(isActive);
        // fetchAvatar(account);
      } else {
        await window.getCoinbase().then((data) => {
          if (data) {
            // fetchAvatar(data);
            setCoinbase(data);
            setIsConnected(true);
          } else {
            setCoinbase();
            setIsConnected(false);
          }
        });
      }
    } else {
      setIsConnected(false);
      setCoinbase();
    }
  };

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
  };

  const handleConnection = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(true);
      });
      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms(true);
      setSuccess(true);
      // connectWallet(ConnectionType.WALLET_CONNECT_NOTQR);
    } catch (e) {
      setShowWalletModal(false);
      setSuccess(true);

      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const checkNetworkId = async () => {
    if (window.WALLET_TYPE === "matchId") {
      if (chain && chain?.chainId !== null) {
        setChainId(chain?.chainId ?? 56);
      }
    } else if (
      window.ethereum &&
      !window.gatewallet &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId" &&
      window.WALLET_TYPE !== ""
    ) {
      // console.log("window.ethereumwindow.ethereum", window.ethereum);
      window.ethereum
        .request({ method: "eth_chainId" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch((e) => {
          console.log(e);
          window.alertify.message((e?.message).toString());
          setChainId(56);
        });
    } else if (
      window.ethereum &&
      window.gatewallet &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId"
    ) {
      await provider
        ?.detectNetwork()
        .then((data) => {
          setChainId(data.chainId);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (
      window.WALLET_TYPE === "binance" ||
      (binanceData !== undefined && binanceData !== null)
    ) {
      if (binanceData !== undefined && binanceData !== null) {
        setChainId(parseInt(binanceData.chainId));
      } else {
        setChainId(chainId);
      }
    } else {
      setChainId(1);
    }
  };

  // console.log(account, isInBinance(), library);
  const handleConnectWallet = async () => {
    try {
      if (!window.gatewallet) {
        if (window.ethereum) {
          localStorage.setItem("logout", "false");
          // await window.connectWallet().then((data) => {
          //   setIsConnected(data);
          // });
          await window.ethereum?.enable();
          console.log("Connected!");

          // await window.getCoinbase().then((data) => {
          //   window.alertify.message(data.toString());

          //   setCoinbase(data);
          // });

          const coinbase = await window.ethereum
            .request({
              method: "eth_accounts",
            })
            .catch((e) => {
              console.error(e);
              return [];
            });

          if (coinbase && coinbase.length > 0) {
            window.coinbase_address = coinbase[0];
            setCoinbase(coinbase[0].toLowerCase());
            setIsConnected(true);
          }

          if (isBnb === true) {
            setisBnbSuccess(true);
          }
          setwalletModal(false);
          setShowForms2(true);
          setSuccess(true);
          // checkConnection();
        } else
          window.alertify.error("No web3 detected. Please install Metamask!");
      }

      //
      // window.gatewallet.enable()
      // setCoinbase(account);
      //
      //
      // setIsConnected(isActive);
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const handleConnectBinance = async () => {
    await activate(binanceConnector)
      .then(async () => {
        setSuccess(true);
        setwalletModal(false);
        window.WALLET_TYPE = "binance";
        if (isMobile) {
          window.getCoinbase();
          const data = JSON.parse(localStorage.getItem("connect-session"));
          if (data && data !== null) {
            setbinanceData(data);
          } else {
            window.WALLET_TYPE = "binance";
            await window.ethereum?.enable();
            let coinbase_address = await window.ethereum?.request({
              method: "eth_accounts",
            });

            if (coinbase_address && coinbase_address.length > 0) {
              setCoinbase(coinbase_address[0]);
              setIsConnected(true);
              window.ethereum
                .request({ method: "net_version" })
                .then((data) => {
                  setChainId(parseInt(data));
                })
                .catch(console.error);
            }
          }
        }
      })
      .catch((e) => {
        console.error(e);
        window.WALLET_TYPE = "";
      });
  };

  const checkBinanceData = async () => {
    const data = JSON.parse(localStorage.getItem("connect-session"));
    setbinanceData(data);
  };

  const handleConnectPassport = async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const connect = widgets.create(checkout.WidgetType.CONNECT);

    if (!connect) return;

    connect.mount("connect");

    connect.addListener(checkout.ConnectEventType.SUCCESS, async (data) => {
      const passportProvider = passportInstance.connectEvm();
      const accounts = await passportProvider.request({
        method: "eth_requestAccounts",
      });
      handleConnectWallet();
    });
    connect.addListener(checkout.ConnectEventType.FAILURE, (data) => {
      console.log("failure", data);
    });
    connect.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect.unmount();
      setwalletModal(false);
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

  const handleConnectionMatchId = async (method) => {
    await login(method).then(() => {
      localStorage.setItem("logout", "false");
      setwalletModal(false);
      console.log("Logged in with method:", method);
      window.WALLET_TYPE = "matchId";
      setIsConnected(true);
      setCoinbase(address);
    });
  };
  const myNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.LANDMINTING_ABI,
        window.config.landnft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getLandNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setMyNFTs(nfts);
    }
  };

  const myLandNftBNB = async () => {
    let myNft = await window.myNftLandListContractCCIP(
      coinbase,
      window.config.nft_land_bnb_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBnb(nfts);
    } else setMyLandNFTsBnb([]);
  };

  const myNftBNB = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_bnb_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBnb(nfts);
    } else setMyNFTSCawsBnb([]);
  };

  const myLandNftAVAX = async () => {
    let myNft = await window.myNftLandListContractCCIPAvax(
      coinbase,
      window.config.nft_land_avax_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsAvax(nfts);
    } else setMyLandNFTsAvax([]);
  };

  const myNft2Avax = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_avax_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsAvax(nfts);
    } else setMyNFTSCawsAvax([]);
  };

  const myLandNftsBase = async () => {
    let myNft = await window.myNftLandListContractCCIPBase(
      coinbase,
      window.config.nft_land_base_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBase(nfts);
    } else setMyLandNFTsBase([]);
  };

  const myNftsBase = async () => {
    let myNft = await window.myNftListContractCCIPBase(
      coinbase,
      window.config.nft_caws_base_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBase(nfts);
    } else setMyNFTSCawsBase([]);
  };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  const fetchAllMyNfts = async () => {
    if (coinbase) {
      getMyNFTS(coinbase, "caws").then((NFTS) => {
        setMyNFTSCaws(NFTS);
        setMyNFTSCaws2(NFTS);
        setMyCAWNFTs(NFTS);
      });

      getMyNFTS(coinbase, "timepiece").then((NFTS) => setMyNFTSTimepiece(NFTS));
      getMyNFTS(coinbase, "mat").then((NFTS) => setMyMatNfts(NFTS));

      getMyNFTS(coinbase, "land").then((NFTS) => {
        setMyNFTSLand(NFTS);
        setMyLandNFTs(NFTS);
        setMyNFTs(NFTS);
      });

      getMyNFTS(coinbase, "base").then((NFTS) => {
        settotalBaseNft(NFTS.length);
        setmyBaseNFTs(NFTS);
        setbaseMintAllowed(NFTS ? (NFTS.length > 0 ? 0 : 1) : 0);
        setmybaseNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "manta").then((NFTS) => {
        setTotalMantaNft(NFTS.length);
        setMyMantaNfts(NFTS);
        setMantaMintAllowed(NFTS.length > 0 ? 0 : 1);
        setMyMantaNFTsCreated(NFTS);
      });
      getMyNFTS(coinbase, "sei").then((NFTS) => {
        setTotalseiNft(NFTS.length);
        setMyseiNfts(NFTS);
      });

      getMyNFTS(coinbase, "kucoin").then((NFTS) => {
        setMykucoinNFTs(NFTS);
      });
      getMyNFTS(coinbase, "opbnb").then((NFTS) => {
        setmyOpbnbNfts(NFTS);
      });
      getMyNFTS(coinbase, "vanar").then((NFTS) => {
        setmyVanarNFTs(NFTS);
      });
      //setmyBaseNFTs
    } else {
      setMyNFTSCaws([]);
      setMyNFTSTimepiece([]);
      setMyNFTSLand([]);

      setMyMantaNfts([]);
      setTotalMantaNft(0);
    }
  };

  const fetchSocialData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/socialUsers")
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      const socialsData = result.data;
      setSocials(socialsData);
    }
  };

  const getStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const allCawsStakes = await window.wod_caws
      .depositsOf(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft_cawsWod.push(parseInt(result[i]));
          return stakenft_cawsWod;
        }
      });

    return allCawsStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myStakes = await getStakesIdsCawsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyCawsWodStakes(stakes);
    } else setMyCawsWodStakes([]);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    if (address !== null && address !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
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
    }
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    if (address !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
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
    }
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));
      stakes = await Promise.all(stakes);
      setMyCAWSNFTsTotalStaked(stakes);
      stakes.reverse();
      setCAWMystakes(stakes);
    }
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    }
  };

  const checkCawsToUse = async () => {
    const testArray = [];
    const cawsArray = [...myCAWNFTs, ...myCAWstakes, ...myCawsWodStakesAll];

    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address
    );

    if (cawsArray.length > 0) {
      for (let i = 0; i < cawsArray.length; i++) {
        let cawsName = await window.getNft(cawsArray[i]);

        const cawsId = parseInt(cawsName.name.slice(6, cawsName.name.length));

        const result = await nft_contract.methods.cawsUsed(cawsId).call();

        if (result === false) {
          testArray.push(cawsId);
        }
      }

      setcawsToUse(testArray);
      setAllCawsForTimepieceMint(testArray);
    } else if (cawsArray.length === 0) {
      setcawsToUse([]);
      setAllCawsForTimepieceMint([]);
    }
  };

  const calculateCaws = (data) => {
    if (data.numberOfTokens === cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse);
    } else if (
      data.numberOfTokens >= cawsToUse.length &&
      cawsToUse.length > 0
    ) {
      setLimit(cawsToUse.length);
      setFinalCaws(cawsToUse);
    } else if (cawsToUse.length === 0) {
      setLimit(0);
      setFinalCaws([]);
    } else if (data.numberOfTokens <= cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse.slice(0, data.numberOfTokens));
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

  const handleTimepieceMint = async (data) => {
    if (window.WALLET_TYPE === "matchId") {
      window.alertify.error("Please connect to another EVM wallet.");
    } else {
      if (isConnected) {
        try {
          //Check Whitelist
          let whitelist = 1;

          if (parseInt(whitelist) === 1) {
            setmintloading("mint");
            setmintStatus("Minting in progress...");
            settextColor("rgb(123, 216, 176)");
            // console.log(data,finalCaws, totalCawsDiscount);
            let tokenId = await window.caws_timepiece
              .claimTimepiece(finalCaws)
              .then(() => {
                setmintStatus("Success! Your Nft was minted successfully!");
                setmintloading("success");
                settextColor("rgb(123, 216, 176)");
                setTimeout(() => {
                  setmintStatus("");
                  setmintloading("initial");
                }, 5000);
                checkCawsToUse();
              })
              .catch((e) => {
                console.error(e);
                setmintloading("error");
                settextColor("#d87b7b");

                if (typeof e == "object" && e.message) {
                  setmintStatus(e.message);
                } else {
                  setmintStatus(
                    "Oops, something went wrong! Refresh the page and try again!"
                  );
                }
                setTimeout(() => {
                  setmintloading("initial");
                  setmintStatus("");
                }, 5000);
              });

            if (tokenId) {
              let getNftData = await window.getNft(tokenId);
              setMyNFTsCreated(getNftData);
            }
          } else {
            // setShowWhitelistLoadingModal(true);
          }
        } catch (e) {
          setmintloading("error");

          if (typeof e == "object" && e.message) {
            setmintStatus(e.message);
          } else {
            setmintStatus(
              "Oops, something went wrong! Refresh the page and try again!"
            );
          }
          window.alertify.error(
            typeof e == "object" && e.message
              ? e.message
              : typeof e == "string"
              ? String(e)
              : "Oops, something went wrong! Refresh the page and try again!"
          );
          setTimeout(() => {
            setmintloading("initial");
            setmintStatus("");
          }, 5000);
        }
      } else {
        try {
          handleConnectWallet();
        } catch (e) {
          window.alertify.error("No web3 detected! Please Install MetaMask!");
        }
      }
    }
  };
  const handleMintVanarNft = async () => {
    if (isConnected && coinbase) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        try {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          let web3 = new Web3(window.ethereum);
          let vanar_contract = new web3.eth.Contract(
            window.VANAR_NFT_ABI,
            window.config.nft_vanar_address
          );

          await vanar_contract.methods
            .mintBetaPass()
            .send({ from: coinbase })
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "vanar").then((NFTS) => {
                setmyVanarNFTs(NFTS);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } catch (e) {
          setmintloading("error");

          if (typeof e == "object" && e.message) {
            setmintStatus(e.message);
          } else {
            setmintStatus(
              "Oops, something went wrong! Refresh the page and try again!"
            );
          }
          window.alertify.error(
            typeof e == "object" && e.message
              ? e.message
              : typeof e == "string"
              ? String(e)
              : "Oops, something went wrong! Refresh the page and try again!"
          );
          setTimeout(() => {
            setmintloading("initial");
            setmintStatus("");
          }, 5000);
        }
      } else if (window.WALLET_TYPE === "binance") {
        try {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");

          const vanarsc = new ethers.Contract(
            window.config.nft_vanar_address,
            window.VANAR_NFT_ABI,
            library.getSigner()
          );

          let txResponse = await vanarsc.mintBetaPass().catch((e) => {
            console.error(e);
            setmintloading("error");
            settextColor("#d87b7b");

            if (typeof e == "object" && e.message) {
              setmintStatus(e.message);
            } else {
              setmintStatus(
                "Oops, something went wrong! Refresh the page and try again!"
              );
            }
            setTimeout(() => {
              setmintloading("initial");
              setmintStatus("");
            }, 5000);
          });

          const txReceipt = txResponse.wait();
          if (txReceipt) {
            setmintStatus("Success! Your Nft was minted successfully!");
            setmintloading("success");
            settextColor("rgb(123, 216, 176)");
            setTimeout(() => {
              setmintStatus("");
              setmintloading("initial");
            }, 5000);
            getMyNFTS(coinbase, "vanar").then((NFTS) => {
              setmyVanarNFTs(NFTS);
            });
          }
        } catch (e) {
          setmintloading("error");

          if (typeof e == "object" && e.message) {
            setmintStatus(e.message);
          } else {
            setmintStatus(
              "Oops, something went wrong! Refresh the page and try again!"
            );
          }
          window.alertify.error(
            typeof e == "object" && e.message
              ? e.message
              : typeof e == "string"
              ? String(e)
              : "Oops, something went wrong! Refresh the page and try again!"
          );
          setTimeout(() => {
            setmintloading("initial");
            setmintStatus("");
          }, 5000);
        }
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient
            .writeContract({
              address: window.config.nft_vanar_address,
              abi: window.VANAR_NFT_ABI,
              functionName: "mintBetaPass",
              args: [],
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e?.shortMessage);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
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
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "vanar").then((NFTS) => {
                setmyVanarNFTs(NFTS);
              });
            }
          }
        }
      }
    }
  };

  const handleBaseNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.skale_nft
            .mintSkaleNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              // getMyNFTS(coinbase, "skale").then((NFTS) => {
              //   setmyskaleNFTsCreated(NFTS);
              //   settotalSkaleNft(NFTS.length);
              //   setSkaleMintAllowed(0);
              // });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleopbnbNftMint = async () => {
    if (isConnected && coinbase) {
      setmintloading("mint");
      setmintStatus("Minting in progress...");
      settextColor("rgb(123, 216, 176)");
      if (window.WALLET_TYPE !== "binance") {
        await window.opbnb_nft
          .mintOPBNBNFT()
          .then(() => {
            setmintStatus("Success! Your Nft was minted successfully!");
            setmintloading("success");
            settextColor("rgb(123, 216, 176)");
            setTimeout(() => {
              setmintStatus("");
              setmintloading("initial");
            }, 5000);
            getMyNFTS(coinbase, "opbnb").then((NFTS) => {
              setmyOpbnbNfts(NFTS);
            });
          })
          .catch((e) => {
            console.error(e);
            setmintloading("error");
            settextColor("#d87b7b");

            if (typeof e == "object" && e.message) {
              setmintStatus(e.message);
            } else {
              setmintStatus(
                "Oops, something went wrong! Refresh the page and try again!"
              );
            }
            setTimeout(() => {
              setmintloading("initial");
              setmintStatus("");
            }, 5000);
          });
      } else if (window.WALLET_TYPE === "binance") {
        const nft_contract = new ethers.Contract(
          window.config.nft_opbnb_address,
          window.OPBNB_NFT_ABI,
          library.getSigner()
        );
        const txResponse = await nft_contract.mintBetaPass().catch((e) => {
          console.error(e);
          setmintloading("error");
          settextColor("#d87b7b");

          if (typeof e == "object" && e.message) {
            setmintStatus(e.message);
          } else {
            setmintStatus(
              "Oops, something went wrong! Refresh the page and try again!"
            );
          }
          setTimeout(() => {
            setmintloading("initial");
            setmintStatus("");
          }, 5000);
        });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setmintStatus("Success! Your Nft was minted successfully!");
          setmintloading("success");
          settextColor("rgb(123, 216, 176)");
          setTimeout(() => {
            setmintStatus("");
            setmintloading("initial");
          }, 5000);
          getMyNFTS(coinbase, "opbnb").then((NFTS) => {
            setmyOpbnbNfts(NFTS);
          });
        }
      }
    }
  };

  useEffect(() => {
    if (
      binanceData &&
      binanceData !== null &&
      window.WALLET_TYPE === "binance"
    ) {
      setCoinbase(binanceData.accounts[0]);
      setIsConnected(binanceData.connected);
      setChainId(parseInt(binanceData.chainId));
      window.coinbase_address = binanceData.accounts[0];
      window.WALLET_TYPE = "binance";
    } else if (
      window.WALLET_TYPE === "binance" ||
      account ||
      (binanceData != null && binanceData !== undefined)
    ) {
      if (binanceData != null && binanceData !== undefined) {
        activate(binanceConnector);

        setCoinbase(binanceData.accounts[0]);
        setIsConnected(binanceData.connected);
        setChainId(parseInt(binanceData.chainId));
        window.coinbase_address = binanceData.accounts[0];
        window.WALLET_TYPE = "binance";
      } else if (account !== undefined && chainId !== undefined) {
        window.WALLET_TYPE = "binance";
        setCoinbase(account);
        setIsConnected(true);
        setChainId(chainId);
      }
    }
  }, [binanceData, account, chainId]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() ===
        data.getPlayer.wallet.publicAddress.toLowerCase()
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
      checkPremiumOryn(data.getPlayer.wallet.publicAddress);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() !==
        data.getPlayer.wallet.publicAddress.toLowerCase()
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
      checkPremiumOryn(data.getPlayer.wallet.publicAddress);
    } else if (coinbase && isConnected && !data) {
      refreshSubscription(coinbase);
      checkPremiumOryn(coinbase);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      !isConnected
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
      checkPremiumOryn(data.getPlayer.wallet.publicAddress);
    }
  }, [data, coinbase, isConnected, count55]);

  useEffect(() => {
    if (
      authToken !== undefined &&
      isTokenExpired(authToken) &&
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() ===
        data.getPlayer.wallet.publicAddress.toLowerCase()
    ) {
      onSuccessLogin();
    }
  }, [authToken, data, isConnected, coinbase]);

  const { isPending: loadingRecentSales, data: latest20BoughtNFTS } =
    useSharedDataLatest20BoughtNFTs();

  const handleRefreshList = () => {
    setNftCount(nftCount + 1);
  };

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

  Amplify.configure(awsExports);

  function UnAuthenticatedContent() {
    setFireAppContent(false);

    return (
      <React.Fragment>
        <Navigate to="/account" />
      </React.Fragment>
    );
  }

  const AppContent = () => {
    const { isLoading, isAuthenticated, playerId } = useAuth();

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

      return (
        <React.Fragment>
          <Navigate to="/account" />
        </React.Fragment>
      );
    }

    return <UnAuthenticatedContent />;
  };

  const { ethereum } = window;
  const { email } = useAuth();

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

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    const payloadBase64 = token.split(".")[1];

    const decodedPayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);

    return decodedPayload.exp < currentTime;
  };

  const signWalletPublicAddress = async () => {
    if (
      window.ethereum &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId"
    ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(coinbase);
        let signatureData = "";

        await signer
          .signMessage(
            `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
          )
          .then((data) => {
            verifyWallet({
              variables: {
                publicAddress: coinbase,
                signature: data,
              },
            });

            refreshSubscription(coinbase);
            signatureData = data;
            handleManageLogin(
              signatureData,
              `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
            );
          });

        handleFirstTask(userWallet);
      } catch (error) {
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          setshowSync(false);
        }, 3000);
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
      }
    } else if (window.WALLET_TYPE === "matchId" && address) {
      try {
        let signatureData = "";
        if (walletClient) {
          setshowSync(false);
          const res = await signMessage({
            message: `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`,
            account: address,
          }).catch((e) => {
            console.log(e);
            setsyncStatus("error");
            setTimeout(() => {
              setsyncStatus("initial");
              setshowSync(false);
            }, 3000);
          });

          if (res) {
            signatureData = res;

            verifyWallet({
              variables: {
                publicAddress: address,
                signature: signatureData,
              },
            });

            handleManageLogin(
              signatureData,
              `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
            );

            // setsyncStatus("success");
            // setTimeout(() => {
            //   setsyncStatus("initial");
            //   setshowSync(false);
            // }, 3000);
            // handleFirstTask(address);
          }
        }
      } catch (error) {
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          setshowSync(false);
        }, 3000);
      }
    } else if (coinbase && library) {
      try {
        const provider = library;
        const signer = provider.getSigner();
        const signature = await signer.signMessage(
          `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
        );
        verifyWallet({
          variables: {
            publicAddress: coinbase,
            signature: signature,
          },
        }).then(() => {
          // setsyncStatus("success");
          // setTimeout(() => {
          //   setsyncStatus("initial");
          //   setshowSync(false);
          // }, 1000);
          // handleFirstTask(coinbase);
        });
      } catch (error) {
        console.log("🚀 ~ file: App.js:2248 ~ getTokens ~ error", error);
        setsyncStatus("error");
        setTimeout(() => {
          setsyncStatus("initial");
          setshowSync(false);
        }, 3000);
      }
    }
  };

  const onSuccessLogin = async () => {
    if (
      isConnected &&
      coinbase !== undefined &&
      data?.getPlayer?.wallet?.publicAddress !== undefined &&
      coinbase.toLowerCase() ===
        data?.getPlayer?.wallet?.publicAddress.toLowerCase()
    ) {
      await generateNonce({
        variables: {
          publicAddress: coinbase,
        },
      });
    }
  };

  ethereum?.on("chainChanged", handleRefreshList);
  ethereum?.on("accountsChanged", handleRefreshList);
  ethereum?.on("accountsChanged", checkConnection2);
  // ethereum?.on("accountsChanged", fetchAllMyNfts);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce, address]);

  useEffect(() => {
    if (isConnected && coinbase) {
      if (ethereum && !window.gatewallet) {
        ethereum.on("chainChanged", checkNetworkId);
      }
      if (window.gatewallet) {
        window.gatewallet.on("changed", checkNetworkId);
      }
    }
  }, [ethereum, nftCount, isConnected, coinbase]);

  const logout = localStorage.getItem("logout");

  useEffect(() => {
    if (
      !window.coin98 &&
      window.ethereum &&
      (window.ethereum.isMetaMask === true ||
        window.ethereum.isTrust === true ||
        window.etherem.isOkxWallet === true) &&
      !window.gatewallet &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId" &&
      !address
    ) {
      window.WALLET_TYPE = "metamask";
      if (
        logout === "false" ||
        window.coinbase_address === "0x0000000000000000000000000000000000000000"
      ) {
        checkConnection2();
      } else {
        setIsConnected(false);
        setCoinbase();
        localStorage.setItem("logout", "true");
      }
    } else if (
      (logout === "false" ||
        window.coinbase_address ===
          "0x0000000000000000000000000000000000000000" ||
        window.coin98) &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId" &&
      window.WALLET_TYPE !== ""
    ) {
      checkConnection2();
    } else if (
      window.gatewallet &&
      isActive &&
      window.WALLET_TYPE !== "binance"
    ) {
      setIsConnected(isActive);
      if (account) {
        setCoinbase(account);
      }
    } else if (address) {
      setIsConnected(true);
      setCoinbase(address);
      window.WALLET_TYPE = "matchId";
    } else if (window.WALLET_TYPE !== "binance") {
      setIsConnected(false);
      setCoinbase();
      localStorage.setItem("logout", "true");
    } else if (
      window.ethereum &&
      window.WALLET_TYPE === "binance" &&
      window.ethereum?.isBinance &&
      logout === "false"
    ) {
      if (account) {
        setCoinbase(account);
        setIsConnected(true);
      } else {
        setCoinbase();
        setIsConnected(false);
      }
    }
  }, [coinbase, networkId, active, account, address]);

  useEffect(() => {
    if (isConnected === true && coinbase && networkId === 1) {
      myCAWStakes();
      myLandStakes();
      getmyCawsWodStakes();
      // myNft2();
      // myLandNft();
    }
    if (isConnected === true && coinbase) {
      // myNft();
      // myCAWNft();
      fetchAllMyNfts();
    }

    // if (isConnected === true && coinbase && networkId === 56) {
    //   myNftBNB();
    //   myLandNftBNB();
    // } else if (isConnected === true && coinbase && networkId === 43114) {
    //   myNft2Avax();
    //   myLandNftAVAX();
    // } else if (isConnected === true && coinbase && networkId === 8453) {
    //   myNftsBase();
    //   myLandNftsBase();
    // }
  }, [isConnected, networkId, coinbase, count]);

  // useEffect(() => {
  //   if (
  //     MyNFTSCaws.length > 0 ||
  //     MyNFTSTimepiece.length > 0 ||
  //     MyNFTSLand.length > 0
  //   ) {
  //     getmyCollectedNfts();
  //   }
  // }, [MyNFTSCaws?.length, MyNFTSTimepiece?.length, MyNFTSLand?.length]);

  useEffect(() => {
    if (isConnected === true && coinbase && networkId === 1) {
      checkCawsToUse();
      getTimepieceNftMinted();
    }
  }, [
    myCAWNFTs.length,
    myCAWstakes.length,
    myCawsWodStakesAll.length,
    allCawsForTimepieceMint.length,
    isConnected,
    networkId,
    coinbase,
  ]);

  const handleShowWalletModal = () => {
    setwalletModal(true);
  };

  async function fetchUserFavorites(userId) {
    if (
      userId !== undefined &&
      userId !== null &&
      authToken !== undefined &&
      email &&
      isConnected
    ) {
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
    }
  }

  const fetchEgldPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/tomochain`)
      .then((obj) => {
        setmultiversPrice(obj.data.price);
      });
  };

  const fetchImmutablePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/immutable`)
      .then((obj) => {
        setImmutablePrice(obj.data.price);
      });
  };

  const fetchSkalePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/skale`)
      .then((obj) => {
        setSkalePrice(obj.data.price);
      });
  };
  const fetchSeiPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/sei-network`)
      .then((obj) => {
        setSeiPrice(obj.data.price);
      });
  };

  const fetchCorePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/coredaoorg`)
      .then((obj) => {
        setCorePrice(obj.data.price);
      });
  };
  const fetchCFXPrice = async () => {
    await axios
      .get("https://api.worldofdypians.com/api/price/conflux-token")
      .then((obj) => {
        if (obj.data) {
          setCfxPrice(obj.data.price);
        }
      });
  };
  const fetchMantaPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/manta-network`)
      .then((obj) => {
        setMantaPrice(obj.data.price);
      });
  };

  const fetchTaikoPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/taiko`)
      .then((obj) => {
        setTaikoPrice(obj.data.price);
      });
  };

  const fetchCookiePrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/cookie`)
      .then((obj) => {
        setCookiePrice(obj.data.price);
      });
  };

  const fetchVictionPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/tomochain`)
      .then((obj) => {
        setVictionPrice(obj.data.price);
      });
  };

  const fetchVanarPrice = async () => {
    await axios
      .get(`https://api.worldofdypians.com/api/price/vanar-chain`)
      .then((obj) => {
        setvanarPrice(obj.data.price);
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
    fetchCookiePrice();
    fetchCorePrice();
    fetchCFXPrice();
    // fetchMatchainPrice();
    fetchVictionPrice();
    fetchVanarPrice();
    fetchEgldPrice();
    fetchImmutablePrice();
  }, []);

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
    mantaPrice,
    victionPrice,
  ]);

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
      setGameAccount(data.getPlayer.wallet.publicAddress);
    }
  }, [data, email]);

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
      setsyncStatus("success");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSync(false);
      }, 1000);
    }
  }, [dataVerify]);

  const dummyBetaPassData2 = [
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
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      location: [-0.06735561726792588, 0.08666753768920898],
      eventType: "Explore & Mine",
      eventDate: "Apr 09, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingBnb.png",
      userEarnUsd: bnbEarnUsd,
      userEarnCrypto: bnbEarnToken,
      userEarnPoints: bnbPoints,
      image: "bnbBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "bnb",
        rewards: "BNB",
        status: "Live",
        id: "event20",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: bnbLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Apr 09, 2025",
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
      userEarnUsd: matEarnUsd,
      userEarnCrypto: matEarnToken,
      userEarnPoints: matPoints,
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
      },
    },
    {
      title: "Base",
      logo: "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg",
      eventStatus: "Live",
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
        status: "Live",
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
      },
    },
    {
      title: "KuCoin",
      logo: "https://cdn.worldofdypians.com/wod/kucoinLogoRound.svg",
      eventStatus: "Live",
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
      userEarnUsd: kucoinEarnUsd,
      userEarnCrypto: kucoinEarnToken,
      userEarnPoints: kucoinPoints,
      popupInfo: {
        title: "KuCoin",
        chain: "opBNB Chain",
        linkState: "kucoin",
        rewards: "KCS",
        status: "Live",
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
      totalRewards: "$30,000 in TAIKO Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 04, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/taikoBg.webp",
      userEarnUsd: taikoEarnUsd,
      userEarnCrypto: taikoEarnToken,
      userEarnPoints: taikoPoints,
      popupInfo: {
        title: "TAIKO",
        chain: "Taiko",
        linkState: "taiko",
        rewards: "TAIKO",
        status: "Live",
        id: "event22",
        eventType: "Explore & Mine",
        totalRewards: "$30,000 in TAIKO Rewards",
        eventDuration: taikoLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Apr 04, 2025",
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
      userEarnUsd: userEarnUsd,
      userEarnCrypto: userEarnETH,
      userEarnPoints: userPoints,
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
      userEarnUsd: immutableEarnUsd,
      userEarnCrypto: immutableEarnToken,
      userEarnPoints: immutablePoints,
      image: "immutableBanner.png",

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
      },
    },
    {
      title: "CORE",
      logo: "https://cdn.worldofdypians.com/wod/core.svg",
      eventStatus: "Live",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 10, 2025",
      backgroundImage: "https://cdn.worldofdypians.com/wod/coreBg.webp",
      image: "coreBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      location: [-0.06862698344579729, 0.08752048015594482],
      marker: markers.treasureMarker,
      userEarnUsd: coreEarnUsd,
      userEarnCrypto: coreEarnToken,
      userEarnPoints: corePoints,
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
        eventDate: "Apr 10, 2025",
      },
    },
    {
      title: "SEI",
      logo: "https://cdn.worldofdypians.com/wod/seiLogo.svg",
      eventStatus: "Live",
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
      userEarnUsd: seiEarnUsd,
      userEarnCrypto: seiEarnToken,
      userEarnPoints: seiEarnPoints,
      popupInfo: {
        title: "SEI",
        chain: "Sei Network",
        linkState: "sei",
        rewards: "SEI",
        status: "Live",
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
      userEarnUsd: chainlinkEarnUsd,
      userEarnCrypto: chainlinkEarnToken,
      userEarnPoints: chainlinkEarnPoints,
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
      },
    },
    {
      title: "Easy2Stake",
      logo: "https://cdn.worldofdypians.com/wod/easy2stakeLogo.svg",
      eventStatus: "Expired",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.05935191046684262, 0.03785133361816407],
      image: "easy2stakeBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Nov 29, 2024",
      backgroundImage: "https://cdn.worldofdypians.com/wod/easy2stakeBg.webp",
      userEarnUsd: easy2StakeEarnUsd,
      userEarnCrypto: easy2StakeEarnToken,
      userEarnPoints: easy2StakePoints,
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
      userEarnUsd: midleEarnUsd,
      userEarnCrypto: midleEarnToken,
      userEarnPoints: midlePoints,
      image: "midleBanner.png",
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
      userEarnUsd: cookieEarnUsd,
      userEarnCrypto: cookieEarnToken,
      userEarnPoints: cookiePoints,
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
      userEarnUsd: victionEarnUsd,
      userEarnCrypto: victionEarnToken,
      userEarnPoints: victionPoints,
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
      },
    },
    {
      title: "Manta",
      logo: "https://cdn.worldofdypians.com/wod/mantaLogoBig.png",
      eventStatus: "Live",
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
      userEarnUsd: mantaEarnUsd,
      userEarnCrypto: mantaEarnToken,
      userEarnPoints: mantaPoints,
      popupInfo: {
        title: "Manta",
        chain: "Manta",
        linkState: "manta",
        rewards: "MANTA",
        status: "Live",
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
      userEarnUsd: skaleEarnUsd,
      userEarnCrypto: skaleEarnToken,
      userEarnPoints: skalePoints,
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
      userEarnUsd: dypiusPremiumEarnUsd,
      userEarnCrypto: dypiusPremiumEarnTokens,
      userEarnPoints: dypiusPremiumPoints,
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
      userEarnUsd: cmcuserEarnUsd,
      userEarnCrypto: cmcuserEarnETH,
      userEarnPoints: cmcuserPoints,
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
      eventDuration: dogeLastDay,
      userEarnCrypto: dogeEarnBNB,
      userEarnPoints: dogeUserPoints,
      backgroundImage: "https://cdn.worldofdypians.com/wod/upcomingDoge.webp",
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore: "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
      userEarnUsd: dogeEarnUSD,
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
      userEarnUsd: dypiusEarnUsd,
      userEarnCrypto: dypiusEarnTokens,
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
      userEarnUsd: gateEarnUSD,
      userEarnCrypto: gateEarnBnb,
      userEarnPoints: gateUserPoints,
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
      userEarnUsd: confluxEarnUSD,
      userEarnCrypto: confluxEarnCFX,
      userEarnPoints: confluxUserPoints,
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
      eventDate: "May 19, 2025",
      type: "Treasure Hunt",
      rewardType: "VANRY",
      rewardAmount: "$20,000",
      infoType: "Treasure Hunt",
      backgroundImage: "https://cdn.worldofdypians.com/wod/vanarEventBg.webp",
      image: "vanarArea.webp",
      userEarnUsd: vanarEarnUsd,
      userEarnCrypto: vanarEarnToken,
      userEarnPoints: vanarPoints,
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
      },
    },
  ];

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

  const refreshSubscription = async (addr) => {
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
        setIsPremium(true);
      } else {
        const isPremium_opbnb = await daily_bonus_contract.methods
          .isPremiumUser(addr)
          .call()
          .catch((e) => {
            console.error(e);
            return false;
          });
        if (isPremium_opbnb === true) {
          setIsPremium(true);
        } else {
          const isPremium_core = await daily_bonus_contract_core.methods
            .isPremiumUser(addr)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });
          if (isPremium_core === true) {
            setIsPremium(true);
          } else {
            const isPremium_viction = await daily_bonus_contract_viction.methods
              .isPremiumUser(addr)
              .call()
              .catch((e) => {
                console.error(e);
                return false;
              });
            if (isPremium_viction === true) {
              setIsPremium(true);
            } else {
              const isPremium_skale = await daily_bonus_contract_skale.methods
                .isPremiumUser(addr)
                .call()
                .catch((e) => {
                  console.error(e);
                  return false;
                });
              if (isPremium_skale === true) {
                setIsPremium(true);
              } else {
                const isPremium_taiko = await daily_bonus_contract_taiko.methods
                  .isPremiumUser(addr)
                  .call()
                  .catch((e) => {
                    console.error(e);
                    return false;
                  });
                if (isPremium_taiko === true) {
                  setIsPremium(true);
                } else {
                  const isPremium_base = await daily_bonus_contract_base.methods
                    .isPremiumUser(addr)
                    .call()
                    .catch((e) => {
                      console.error(e);
                      return false;
                    });
                  if (isPremium_base === true) {
                    setIsPremium(true);
                  } else {
                    const isPremium_mat = await daily_bonus_contract_mat.methods
                      .isPremiumUser(addr)
                      .call()
                      .catch((e) => {
                        console.error(e);
                        return false;
                      });
                    if (isPremium_mat === true) {
                      setIsPremium(true);
                    } else {
                      setIsPremium(false);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      setIsPremium(false);
    }
  };

  const checkPremiumOryn = async (addr) => {
    const oryn_premium_contract = new window.bscWeb3.eth.Contract(
      window.ORYN_PREMIUM_ABI,
      window.config.oryn_premium_address
    );

    const result = await oryn_premium_contract.methods
      .hasLocked(addr)
      .call()
      .catch((err) => {
        return false;
      });

    setPremiumOryn(result);
  };

  const handleSwitchNetwork = async (chain) => {
    if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
      setChainId(chain);
    } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
      // const params = CHAINLIST[Number(chain)];
      // connector?.activate(params);
      setChainId(chain);
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId:
                chain === 1
                  ? "0x1"
                  : chain === 56
                  ? "0x38"
                  : chain === 204
                  ? "0xcc"
                  : chain === 1482601649
                  ? "0x585eb4b1"
                  : "0x406",
            },
          ],
        });
        // if (window.ethereum && window.gatewallet) {
        //   window.location.reload();
        // }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(switchError, "switch");
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: CHAINLIST[Number(chain)],
            });
            // if (window.ethereum && window.gatewallet) {
            //   window.location.reload();
            // }
          } catch (addError) {
            console.log(addError);
          }
        }
        // handle other "switch" errors
      }
      // window.location.reload();
    } else if (window.WALLET_TYPE === "binance" && binanceData) {
      console.log("yes");
      try {
        await binanceConnector.binanceW3WProvider
          .request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId:
                  chain === 1
                    ? "0x1"
                    : chain === 56
                    ? "0x38"
                    : chain === 204
                    ? "0xcc"
                    : chain === 1116
                    ? "0x45c"
                    : chain === 169
                    ? "0xa9"
                    : chain === 88
                    ? "0x58"
                    : chain === 43114
                    ? "0xa86a"
                    : chain === 8453
                    ? "0x2105"
                    : chain === 1030
                    ? "0x406"
                    : chain === 13371
                    ? "0x343b"
                    : chain === 2040
                    ? "0x7f8"
                    : chain === 1482601649
                    ? "0x585eb4b1"
                    : "0x406",
              },
            ],
          })
          .then(async () => {
            setChainId(chain);
            checkBinanceData();
          })
          .catch((e) => {
            console.error(e);
            setChainId(chainId);
          });
        // if (window.ethereum && window.gatewallet) {
        //   window.location.reload();
        // }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(switchError, "switch");

        if (switchError.code === 4902) {
          try {
            await library.request({
              method: "wallet_addEthereumChain",
              params: CHAINLIST[Number(chain)],
            });
            // if (window.ethereum && window.gatewallet) {
            //   window.location.reload();
            // }
          } catch (addError) {
            console.log(addError);
            setChainId(chainId);
          }
        }
        // handle other "switch" errors
      }
    } else if (
      window.WALLET_TYPE === "binance" &&
      !binanceData &&
      window.ethereum?.isBinance
    ) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId:
                chain === 1
                  ? "0x1"
                  : chain === 56
                  ? "0x38"
                  : chain === 204
                  ? "0xcc"
                  : chain === 1116
                  ? "0x45c"
                  : chain === 169
                  ? "0xa9"
                  : chain === 88
                  ? "0x58"
                  : chain === 43114
                  ? "0xa86a"
                  : chain === 8453
                  ? "0x2105"
                  : chain === 1030
                  ? "0x406"
                  : chain === 13371
                  ? "0x343b"
                  : chain === 1482601649
                  ? "0x585eb4b1"
                  : "0x406",
            },
          ],
        });
        // if (window.ethereum && window.gatewallet) {
        //   window.location.reload();
        // }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(switchError, "switch");
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: CHAINLIST[Number(chain)],
            });
            // if (window.ethereum && window.gatewallet) {
            //   window.location.reload();
            // }
          } catch (addError) {
            console.log(addError);
          }
        }
        // handle other "switch" errors
      }
    }
  };

  const handleDisconnect = async () => {
    if (!window.gatewallet) {
      localStorage.removeItem("connect-session");
      if (window.WALLET_TYPE === "matchId") {
        await logoutUser();
      }
      setTimeout(() => {
        window.disconnectWallet();
        if (window.WALLET_TYPE === "matchId") {
          deactivate();
          checkBinanceData();
        }

        localStorage.setItem("logout", "true");
        setSuccess(false);
        setCoinbase();
        setIsConnected(false);
        setIsPremium(false);
        window.WALLET_TYPE = "";
      }, 500);
    } else {
      localStorage.setItem("logout", "true");
    }
  };

  const API_BASE_URL = "https://api.worldofdypians.com";

  async function addNewUserIfNotExists(
    walletAddress,
    title,
    description,
    redirect_link
  ) {
    try {
      const response = await axios
        .get(
          `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
            walletAddress
          )}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .catch((e) => {
          console.error(e);
        });

      if (response.data.length === 0) {
        const newUserResponse = await axios
          .post(
            `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
              walletAddress
            )}`,
            {
              tokenId: "",
              nftAddress: "",
              timestamp: Date.now(),
              read: false,
              offer: "no",
              offerAccepted: "no",
              buy: "no",
              event: "no",
              news: "no",
              welcome: "yes",
              update: "no",
              title: "Welcome",
              description:
                "Welcome to the immersive World of Dypians! Take a moment to step into our NFT Shop, where a mesmerizing collection of digital art await your exploration. Happy browsing!",
              redirect_link: "",
            },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          )
          .catch((e) => {
            console.error(e);
          });

        console.log("New user added:", newUserResponse.data);
        let lso = newUserResponse.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      } else {
        console.log("User already exists:", response.data);

        const notifications = response.data[0]?.notifications || [];
        let lso = notifications.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      }
    } catch (error) {
      console.error("Error adding new user:", error.message);
    }
  }

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

  // const getDomains = async () => {
  //   if (coinbase) {
  //     const name = await web3Name
  //       .getDomainName({
  //         address: coinbase,
  //         queryChainIdList: [56],
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });

  //     if (name && name !== null) {
  //       setDomainName(name);
  //       const metadata = await web3Name.getMetadata({ name: name });
  //       setDomainMetaData(metadata);
  //     } else {
  //       setDomainMetaData(null);
  //       setDomainName(null);
  //     }
  //   }

  // };
  const fetchBscBalance = async () => {
    if (coinbase && networkId === 56 && window.ethereum) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const bscWeb3 = new Web3(window.config.bsc_endpoint);
      const stringBalance = bscWeb3.utils.hexToNumberString(balance);

      const amount = bscWeb3.utils.fromWei(stringBalance, "ether");
      setBscAmount(amount.slice(0, 7));
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
    if (coinbase && window.ethereum && networkId === 1482601649) {
      const skaleWeb3 = new Web3(window.config.skale_endpoint);

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const stringBalance = skaleWeb3.utils.hexToNumberString(balance);

      const amount = skaleWeb3.utils.fromWei(stringBalance, "ether");
      const formatted_amount = Number(amount);

      if (formatted_amount <= 0.000005) {
        handleSkaleRefill(coinbase);
      } else {
        console.log("formatted_amount", formatted_amount);
      }

      setSkaleAmount(amount.slice(0, 7));
    }
  };

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data && result.data != "NAN") {
        setTotalTx(result.data);
        localStorage.setItem("cachedTvl", result.data);
      }
    }
  };

  useEffect(() => {
    getAllData();
    fetchTotalVolume();
    fetchTotalWodHolders();
  }, [coinbase, count55, isConnected]);

  useEffect(() => {
    // getDomains();
    fetchBscBalance();
  }, [coinbase, isConnected, logout, successMessage, loadingDomain]);

  useEffect(() => {
    fetchSkaleBalance();
    getWodBalance(coinbase);
  }, [coinbase, isConnected, networkId, countBalance]);

  useEffect(() => {
    if (authToken && !isTokenExpired(authToken) && email) {
      fetchUserFavorites(coinbase);
    }
    // refreshSubscription();
  }, [coinbase, data, authToken, isConnected, email]);

  const checkData = async () => {
    // if (coinbase) {
    navigate("/auth");
    // }
  };

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
    if (coinbase) {
      fetchUserPools(coinbase);

      // getNotifications(coinbase);
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    if (
      coinbase &&
      isConnected &&
      authToken &&
      email &&
      userWallet &&
      userWallet.toLowerCase() === coinbase.toLowerCase()
    )
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT Shop, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
  }, [coinbase, isConnected, authToken, email, userWallet]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchSocialData();
    fetchRecordsStar();
    fetchMonthlyPlayers();
    getTotalSupply();
    checkBinanceData();
    getTokenData();
    getTokenDatabnb();
    getPriceDYP();
    fetchDogeCoinPrice();
    fetchWodPrice();
    fetchKucoinCoinPrice();
  }, []);

  useEffect(() => {
    if (isConnected && coinbase) {
      checkNetworkId();
    }
  }, [chain?.chainId, window.WALLET_TYPE, isConnected, coinbase]);

  useEffect(() => {
    fetchEthStaking();
  }, [stakeCount]);

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
    if (loginListener !== 0 || userWallet !== undefined) {
      handleFirstTask(userWallet);
    }
  }, [loginListener, userWallet]);

  // useEffect(() => {
  //   if (address && address.length > 0) {
  //     if (window.WALLET_TYPE === "matchId") {
  //       setIsConnected(true);
  //       setCoinbase(address);
  //     }
  //   } else {
  //     setIsConnected(false);
  //     setCoinbase();
  //   }
  // }, [address, window.WALLET_TYPE]);

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
          !location.pathname.includes("pool") &&
          !location.pathname.includes("pool2") &&
          !location.pathname.includes("auth") &&
          !location.pathname.includes("map") &&
          !location.pathname.includes("player") &&
          !location.pathname.includes("ResetPassword") &&
          !location.pathname.includes("forgotPassword") &&
          orynPop && <OrynFly onClose={() => setOrynPop(false)} />}
        <Header
          authToken={authToken}
          handleSignUp={handleShowWalletModal}
          coinbase={coinbase}
          avatar={avatar}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          isConnected={isConnected}
          chainId={networkId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleSwitchChainBinanceWallet={handleSwitchNetwork}
          binanceWallet={coinbase}
          handleOpenDomains={() => setDomainPopup(true)}
          domainName={domainName}
          onLogout={() => {
            setCount55(count55 + 1);
          }}
          onSigninClick={checkData}
          gameAccount={gameAccount}
          email={email}
          username={data?.getPlayer?.displayName}
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
          avatar={avatar}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          onLogout={() => {
            setCount55(count55 + 1);
          }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          chainId={networkId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleOpenDomains={() => setDomainPopup(true)}
          domainName={domainName}
          handleSwitchChainBinanceWallet={handleSwitchNetwork}
          binanceWallet={coinbase}
          username={data?.getPlayer?.displayName}
          network_matchain={chain}
        />

        <Routes>
          <Route path="/news/:newsId?/:titleId?" element={<News />} />
          <Route
            path="shop/nft/:nftId/:nftAddress?"
            element={
              <SingleNft
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                authToken={authToken}
                isConnected={isConnected}
                chainId={networkId}
                handleSwitchChain={handleSwitchNetwork}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                favorites={favorites}
                dyptokenData={dypTokenData}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
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
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                myCawsCollected={MyNFTSCaws}
                myLandCollected={MyNFTSLand}
                myTimepieceCollected={MyNFTSTimepiece}
                screen={"list"}
                authToken={authToken}
                isConnected={isConnected}
                chainId={networkId}
                handleSwitchChain={handleSwitchNetwork}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                favorites={favorites}
                dyptokenData={dypTokenData}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
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
                dyptokenDatabnb={dyptokenDatabnb}
                idyptokenDatabnb={idyptokenDatabnb}
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
                handleConnectWallet={() => {
                  setwalletModal(true);
                }}
                email={email}
                premiumOryn={premiumOryn}
                chainId={networkId}
                handleSwitchNetwork={handleSwitchNetwork}
                checkPremiumOryn={checkPremiumOryn}
                walletClient={walletClient}
                publicClient={publicClient}
                network_matchain={chain}
                binanceW3WProvider={library}
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
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
              />
            }
          />

          <Route
            exact
            path="/pool"
            element={
              <Whitelist
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                type="pool"
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
              />
            }
          />

          <Route
            exact
            path="/pool2"
            element={
              <Whitelist
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                type="pool2"
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
              />
            }
          />

          <Route
            exact
            path="/special-otc"
            element={
              <Whitelist
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                type="special-otc"
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
              />
            }
          />

          <Route
            exact
            path="/bonus-otc"
            element={
              <Whitelist
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                type="bonus-otc"
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
              />
            }
          />

          <Route
            exact
            path="/token-claim"
            element={
              <Release
                chainId={networkId}
                isConnected={isConnected}
                handleConnection={() => {
                  setwalletModal(true);
                }}
                coinbase={coinbase}
                handleSwitchNetwork={handleSwitchNetwork}
                network_matchain={chain}
                walletClient={walletClient}
                binanceW3WProvider={library}
                publicClient={publicClient}
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
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
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

          <Route
            exact
            path="/shop/nft-bridge"
            element={
              <NFTBridge
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
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
                binanceWallet={coinbase}
                binanceW3WProvider={library}
                network_matchain={chain}
              />
            }
          />

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
                isConnected={isConnected}
                coinbase={coinbase}
                onNewsLetterClick={(value) => {
                  setisCheckedNewsLetter(value);
                }}
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
                isConnected={isConnected}
                coinbase={coinbase}
                isSuccess={isBnbSuccess}
                onWalletLinkComplete={() => {
                  setisBnbSuccess(false);
                }}
                handleConnect={() => {
                  setisBnb(true);
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="/player" element={<PlayerCreation />} />

          <Route
            exact
            path="/account"
            element={
              <Dashboard
                wodBalance={wodBalance}
                authToken={authToken}
                dailyBonuslistedNFTS={listedNFTS}
                wodPrice={wodPrice}
                onSuccessDeposit={() => {
                  // setCount55(count55 + 1);
                  setTimeout(() => {
                    setIsPremium(true);
                  }, 2000);
                }}
                onSyncClick={() => {
                  setshowSync(true);
                }}
                syncStatus={syncStatus}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                vanarEarnUsd={vanarEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
                chainlinkEarnUsd={chainlinkEarnUsd}
                victionEarnUsd={victionEarnUsd}
                taikoEarnUsd={taikoEarnUsd}
                cookieEarnUsd={cookieEarnUsd}
                immutableEarnUsd={immutableEarnUsd}
                mantaEarnUsd={mantaEarnUsd}
                multiversEarnUsd={multiversEarnUsd}
                ethTokenData={ethTokenData}
                dyptokenDatabnb={dyptokenDatabnb}
                dypTokenData={dypTokenData}
                handleSwitchChain={handleSwitchChain}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={() => {
                  setwalletModal(true);
                }}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={(account) => {
                  // refetchPlayer();
                  // setCount55(count55 + 1);
                  refreshSubscription(account);
                }}
                isPremium={isPremium}
                handleConnectionPassport={handleConnectPassport}
                handleConnectionMatchId={handleConnectionMatchId}
                handleConnectBinance={handleConnectBinance}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                latest20BoughtNFTS={latest20BoughtNFTS}
                monthlyPlayers={monthlyPlayers}
                percent={percent}
                baseEarnUSD={baseEarnUSD}
                easy2StakeEarnUsd={easy2StakeEarnUsd}
                midleEarnUsd={midleEarnUsd}
                kucoinEarnUsd={kucoinEarnUsd}
                onManageLogin={handleSync}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
                coingeckoEarnUsd={userEarnUsd}
                isTokenExpired={() => {
                  isTokenExpired(authToken);
                }}
                listedNFTS={allListedByUser}
                mykucoinNFTs={mykucoinNFTs}
                myVanarNFTs={myVanarNFTs}
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
                isTokenExpired={() => {
                  isTokenExpired(authToken);
                }}
                syncStatus={syncStatus}
                wodBalance={wodBalance}
                authToken={authToken}
                wodPrice={wodPrice}
                dailyBonuslistedNFTS={listedNFTS}
                onSuccessDeposit={() => {
                  // setCount55(count55 + 1);
                  setTimeout(() => {
                    setIsPremium(true);
                  }, 2000);
                }}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                vanarEarnUsd={vanarEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
                chainlinkEarnUsd={chainlinkEarnUsd}
                victionEarnUsd={victionEarnUsd}
                taikoEarnUsd={taikoEarnUsd}
                cookieEarnUsd={cookieEarnUsd}
                immutableEarnUsd={immutableEarnUsd}
                mantaEarnUsd={mantaEarnUsd}
                multiversEarnUsd={multiversEarnUsd}
                ethTokenData={ethTokenData}
                dyptokenDatabnb={dyptokenDatabnb}
                dypTokenData={dypTokenData}
                handleSwitchChain={handleSwitchChain}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={() => {
                  setwalletModal(true);
                }}
                handleConnectionMatchId={handleConnectionMatchId}
                onSigninClick={checkData}
                onSyncClick={() => {
                  setshowSync(true);
                }}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={(account) => {
                  // refetchPlayer();
                  // setCount55(count55 + 1);
                  refreshSubscription(account);
                }}
                isPremium={isPremium}
                handleConnectionPassport={handleConnectPassport}
                handleConnectBinance={handleConnectBinance}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                latest20BoughtNFTS={latest20BoughtNFTS}
                monthlyPlayers={monthlyPlayers}
                percent={percent}
                baseEarnUSD={baseEarnUSD}
                easy2StakeEarnUsd={easy2StakeEarnUsd}
                midleEarnUsd={midleEarnUsd}
                kucoinEarnUsd={kucoinEarnUsd}
                onManageLogin={handleSync}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
                coingeckoEarnUsd={userEarnUsd}
                listedNFTS={allListedByUser}
                mykucoinNFTs={mykucoinNFTs}
                myVanarNFTs={myVanarNFTs}
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
                balance={currencyAmount}
                socials={socials}
              />
            }
          />
          <Route exact path="/terms-of-service" element={<TermsConditions />} />
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
                binanceW3WProvider={library}
                chainId={networkId}
                hasNft={
                  MyNFTSCaws.length > 0 ||
                  MyNFTSLand.length > 0 ||
                  MyNFTSTimepiece.length > 0
                }
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
                binanceW3WProvider={library}
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
                binanceW3WProvider={library}
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
                binanceW3WProvider={library}
                chainId={networkId}
                timepiece={timepieceListed}
              />
            }
          />

          <Route exact path="/reset-password" element={<ResetPasswordTest />} />

          <Route
            exact
            path="/shop/beta-pass/bnb"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/vanar"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/kucoin"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/matchain"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/cookie3"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/manta"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/taiko"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
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
              />
            }
          />
          {/* )} */}
          <Route
            exact
            path="/shop/beta-pass/conflux"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/sei"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/core"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/multiversx"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/viction"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/skale"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/doge"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/coinmarketcap"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/shop/beta-pass/gate"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          {/* <Route
                exact
                path="/shop/beta-pass/avalanche"
                element={
                 <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
                }
              /> */}
          {/* <Route
                exact
                path="/shop/beta-pass/coin98"
                element={
                  <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
                }
              /> */}
          <Route
            exact
            path="/shop/beta-pass/coingecko/:terms?"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route
            exact
            path="/shop/beta-pass/base"
            element={
              <BetaPassNFT
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route exact path="/caws" element={<Caws />} />

          <Route
            exact
            path="/account/challenges/:eventId"
            element={
              <Dashboard
                isTokenExpired={() => {
                  isTokenExpired(authToken);
                }}
                syncStatus={syncStatus}
                wodBalance={wodBalance}
                authToken={authToken}
                wodPrice={wodPrice}
                dailyBonuslistedNFTS={listedNFTS}
                onSuccessDeposit={() => {
                  // setCount55(count55 + 1);
                  setTimeout(() => {
                    setIsPremium(true);
                  }, 2000);
                }}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                vanarEarnUsd={vanarEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
                chainlinkEarnUsd={chainlinkEarnUsd}
                victionEarnUsd={victionEarnUsd}
                taikoEarnUsd={taikoEarnUsd}
                cookieEarnUsd={cookieEarnUsd}
                immutableEarnUsd={immutableEarnUsd}
                mantaEarnUsd={mantaEarnUsd}
                multiversEarnUsd={multiversEarnUsd}
                ethTokenData={ethTokenData}
                dyptokenDatabnb={dyptokenDatabnb}
                dypTokenData={dypTokenData}
                handleSwitchChain={handleSwitchChain}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={() => {
                  setwalletModal(true);
                }}
                onSyncClick={() => {
                  setshowSync(true);
                }}
                handleConnectionMatchId={handleConnectionMatchId}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={(account) => {
                  // refetchPlayer();
                  // setCount55(count55 + 1);
                  refreshSubscription(account);
                }}
                isPremium={isPremium}
                handleConnectionPassport={handleConnectPassport}
                handleConnectBinance={handleConnectBinance}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                latest20BoughtNFTS={latest20BoughtNFTS}
                monthlyPlayers={monthlyPlayers}
                percent={percent}
                baseEarnUSD={baseEarnUSD}
                easy2StakeEarnUsd={easy2StakeEarnUsd}
                midleEarnUsd={midleEarnUsd}
                coingeckoEarnUsd={userEarnUsd}
                kucoinEarnUsd={kucoinEarnUsd}
                onManageLogin={handleSync}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
                listedNFTS={allListedByUser}
                mykucoinNFTs={mykucoinNFTs}
                myVanarNFTs={myVanarNFTs}
                walletClient={walletClient}
                publicClient={publicClient}
                network_matchain={chain}
              />
            }
          />
          {/* <Route
            exact
            path="/shop/events/upcoming"
            element={
              <MarketEvents
                tabState={"upcoming"}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                account={coinbase?.toLowerCase()}
                chainId={networkId}
                dyptokenDatabnb={dyptokenDatabnb}
                idyptokenDatabnb={idyptokenDatabnb} 
                dyptokenData_old={dypTokenData_old}
                handleAvailableTime={(value) => {
                  setavailTime(value);
                }}
                ethTokenData={ethTokenData}
                dogePrice={dogePrice}
                binanceW3WProvider={library}
              />
            }
          /> */}
          {/* <Route
            exact
            path="/shop/events/past"
            element={
              <MarketEvents
                tabState={"past"}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                account={coinbase?.toLowerCase()}
                chainId={networkId}
                dyptokenDatabnb={dyptokenDatabnb} 
                idyptokenDatabnb={idyptokenDatabnb}
                handleAvailableTime={(value) => {
                  setavailTime(value);
                }}
                dyptokenData_old={dypTokenData_old}
                ethTokenData={ethTokenData}
                dogePrice={dogePrice}
                binanceW3WProvider={library}
              />
            }
          /> */}
          {/* <Route
            exact
            path="/shop/stake"
            element={
              <MarketStake
                authToken={authToken}
                isConnected={isConnected}
                handleConnect={() => {
                  setwalletModal(true);
                }}
                chainId={networkId}
                coinbase={coinbase}
                isPremium={isPremium}
                handleSwitchNetwork={handleSwitchNetwork}
                onSuccessDeposit={() => {
                  setCount55(count55 + 1);
                }}
                binanceW3WProvider={library}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
              />
            }
          /> */}
          <Route
            exact
            path="/shop/mint/timepiece"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalMatNfts={myMatNFTs.length}
                matMintAllowed={1 - myMatNFTs.length}
                seiMintAllowed={1 - myseiNfts.length}
                myMatNFTs={myMatNFTs}
                myMatNFTsCreated={myMatNFTs}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
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
                mybaseNFTsCreated={mybaseNFTsCreated}
                handleBaseNftMint={handleBaseNftMint}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                myKucoinNfts={mykucoinNFTs}
                myOpbnbNfts={myOpbnbNfts}
                totalOpbnbNft={myOpbnbNfts?.length}
                myVanarNFTs={myVanarNFTs}
                totalVanarNfts={myVanarNFTs?.length ?? 0}
              />
            }
          />
          {/* <Route
            exact
            path="/shop/mint/vanar"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalMatNfts={myMatNFTs.length}
                matMintAllowed={1 - myMatNFTs.length}
                seiMintAllowed={1 - myseiNfts.length}
                myMatNFTs={myMatNFTs}
                myMatNFTsCreated={myMatNFTs}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleMintVanarNft}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                mybaseNFTsCreated={mybaseNFTsCreated}
                handleBaseNftMint={handleBaseNftMint}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                myKucoinNfts={mykucoinNFTs}
                myOpbnbNfts={myOpbnbNfts}
                totalOpbnbNft={myOpbnbNfts?.length}
                myVanarNFTs={myVanarNFTs}
                totalVanarNfts={myVanarNFTs?.length ?? 0}
              />
            }
          />
          <Route
            exact
            path="/shop/mint/matchain"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalMatNfts={myMatNFTs.length}
                matMintAllowed={1 - myMatNFTs.length}
                myMatNFTs={myMatNFTs}
                myMatNFTsCreated={myMatNFTs}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleMatNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                mybaseNFTsCreated={mybaseNFTsCreated}
                handleBaseNftMint={handleBaseNftMint}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
              />
            }
          /> */}
          <Route exact path="/token" element={<Token />} />
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
                  setwalletModal(true);
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
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                handleSwitchNetwork={handleSwitchNetwork}
                onConnectWallet={() => {
                  setwalletModal(true);
                }}
                nftPools={nftPools}
                tokenPools={tokenPools}
                binanceW3WProvider={library}
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
              />
            }
          />
          {/* <Route exact path="/buy" element={<Buy />} /> */}
          <Route
            exact
            path="/governance"
            element={
              <Governance
                isConnected={isConnected}
                coinbase={coinbase}
                chainId={networkId}
                binanceW3WProvider={library}
                wodBalance={wodBalance}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                handleConnection={() => {
                  setwalletModal(true);
                }}
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
                handleConnection={() => {
                  setwalletModal(true);
                }}
                wodBalance={wodBalance}
                refreshBalance={() => {
                  setcountBalance(countBalance + 1);
                }}
                walletClient={walletClient}
                publicClient={publicClient}
                network_matchain={chain}
                binanceW3WProvider={library}
              />
            }
          />

          <Route
            exact
            path="/game"
            element={<Game allStarData={allStarData} />}
          />
          <Route exact path="/game-updates" element={<GameUpdates />} />
          <Route exact path="/about" element={<About />} />

          {/* <Route
            exact
            path="/shop/mint/bnbchain"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleBnbNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                myBnbNFTsCreated={myBnbNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                handleBnbNftMint={handleBnbNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                bnbMintAllowed={bnbMintAllowed}
                victionMintAllowed={victionMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                totalBnbNft={totalBnbNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myBnbNfts={myBnbNfts}
              />
            }
          /> */}

          {/* <Route
            exact
            path="/shop/mint/opbnbchain"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalMatNfts={myMatNFTs.length}
                matMintAllowed={1 - myMatNFTs.length}
                seiMintAllowed={1 - myseiNfts.length}
                myMatNFTs={myMatNFTs}
                myMatNFTsCreated={myMatNFTs}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleopbnbNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                mybaseNFTsCreated={mybaseNFTsCreated}
                handleBaseNftMint={handleBaseNftMint}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                myKucoinNfts={mykucoinNFTs}
                myOpbnbNfts={myOpbnbNfts}
                totalOpbnbNft={myOpbnbNfts?.length}
                myVanarNFTs={myVanarNFTs}
                totalVanarNfts={myVanarNFTs?.length ?? 0}
              />
            }
          /> */}
          {/* <Route
            exact
            path="/shop/mint/manta"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleMantaNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
                 totalTaikoNft={totalTaikoNft}
                taikoMintAllowed={taikoMintAllowed}
                myTaikoNfts={myTaikoNfts}
                myTaikoNFTsCreated={myTaikoNFTsCreated}
              />
            }
          /> */}

          {/* <Route
            exact
            path="/shop/mint/immutable"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleImmutableNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalBnbNft={totalBnbNft}
                totalTaikoNft={totalTaikoNft}
                taikoMintAllowed={taikoMintAllowed}
                myTaikoNfts={myTaikoNfts}
                myTaikoNFTsCreated={myTaikoNFTsCreated}
              />
            }
          /> */}

          {/* <Route
            exact
            path="/shop/mint/taiko"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleTaikoNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalBnbNft={totalBnbNft}
                totalTaikoNft={totalTaikoNft}
                taikoMintAllowed={taikoMintAllowed}
                myTaikoNfts={myTaikoNfts}
                myTaikoNFTsCreated={myTaikoNFTsCreated}
              />
            }
          /> */}

          {/* <Route
            exact
            path="/shop/mint/viction"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleVictionNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                immutableMintAllowed={immutableMintAllowed}
              />
            }
          />

        */}

          {/* <Route
              exact
              path="/shop/mint/multiversx"
              element={
                <MarketMint
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={networkId}
                  handleMint={handleVictionNftMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  timepieceMetadata={timepieceMetadata}
                  myConfluxNFTsCreated={myConfluxNFTsCreated}
                  mybaseNFTsCreated={mybaseNFTsCreated}
                  myskaleNFTsCreated={myskaleNFTsCreated}
                  handleConfluxMint={handleConfluxNftMint}
                  handleBaseNftMint={handleBaseNftMint}
                  confluxMintAllowed={confluxMintAllowed}
                  baseMintAllowed={baseMintAllowed}
                  skaleMintAllowed={skaleMintAllowed}
                  coreMintAllowed={coreMintAllowed}
                  victionMintAllowed={victionMintAllowed}
                  totalCoreNft={totalCoreNft}
                  myCoreNfts={myCoreNfts}
                  totalMultiversNft={totalMultiversNft}
                  totalImmutableNft={totalImmutableNft}
                  myImmutableNfts={myImmutableNfts}
                  myMultiversNfts={myMultiversNfts}
                  totalseiNft={totalseiNft}
                  myseiNfts={myseiNfts}
                  totalVictionNft={totalVictionNft}
                  myVictionNfts={myVictionNfts}
                />
              }
            /> */}

          {/* <Route
            exact
            path="/shop/mint/core"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleCoreNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                />
              }
            /> 
          <Route
            exact
            path="/shop/mint/sei"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalMatNfts={myMatNFTs.length}
                matMintAllowed={1 - myMatNFTs.length}
                seiMintAllowed={1 - myseiNfts.length}
                myMatNFTs={myMatNFTs}
                myMatNFTsCreated={myMatNFTs}
                handleSwitchNetwork={handleSwitchNetwork}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                binanceWallet={coinbase}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleSeiNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                mybaseNFTsCreated={mybaseNFTsCreated}
                handleBaseNftMint={handleBaseNftMint}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
              />
            }
          />*/}
          <Route
            exact
            path="/map"
            element={<Map dummyBetaPassData2={dummyBetaPassData2} />}
          />
        </Routes>

        {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
        <ScrollTop />
        <Footer />
      </div>
      {domainPopup && (
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
      )}

      {showWalletModal === true && (
        <RegisterModal
          open={showWalletModal}
          onClose={() => {
            setShowWalletModal(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          myCawsWodStakes={myCawsWodStakesAll}
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
          showForms={showForms}
        />
      )}

      {walletModal === true && walletId === "connect" && (
        <WalletModal
          show={walletId === "connect" && walletModal === true}
          handleClose={() => {
            setwalletModal(false);
          }}
          handleConnection={() => {
            handleConnectWallet();
          }}
          handleConnectionPassport={handleConnectPassport}
          handleConnectBinance={handleConnectBinance}
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

      {fireAppcontent === true && <AppContent />}
    </>
  );
}

export default App;
