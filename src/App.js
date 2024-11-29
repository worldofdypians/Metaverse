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
import CheckWhitelistModal from "./components/CheckWhitelistModal/CheckWhitelistModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Explorer from "./screens/Explorer/Explorer";
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
import CheckAuthUserModal from "./components/CheckWhitelistModal/CheckAuthUserModal";
import Notifications from "./screens/Marketplace/Notifications/Notifications";
import BetaPassNFT from "./screens/Marketplace/MarketNFTs/BetaPassNFT";
import { useEagerlyConnect } from "web3-connector";
import SIDRegister from "@web3-name-sdk/register";
import { createWeb3Name } from "@web3-name-sdk/core";
import { ethers, providers } from "ethers";
import { disconnect, connectWallet, ConnectionType } from "web3-connector";
import { getWeb3Connector } from "@binance/w3w-web3-connector";
import { useWeb3React } from "@web3-react/core";
import DomainModal from "./components/DomainModal/DomainModal.js";
import Web3 from "web3";
import ChestFlyout from "./components/LandFlyout/ChestFlyout";
import NFTBridge from "./screens/NFTBridge/NftBridge.js";
import AuthBNB from "./screens/Account/src/Containers/Auth/AuthBNB.js";
import Community from "./screens/Community/Community.js";
import OurTeam from "./screens/OurTeam/OurTeam.js";
import Bridge from "./screens/Wod/Bridge/Bridge.js";
import Earn from "./screens/Wod/Earn/Earn.js";
import Buy from "./screens/Wod/Buy/Buy.js";
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
import WalletModal2 from "./components/WalletModal/WalletModal2";
import Token from "./screens/Token/Token";
import LoyaltyProgram from "./screens/LoyaltyProgram/LoyaltyProgram.js";
import { monthlyStarPrizes } from "./screens/Account/src/Containers/Dashboard/stars.js";
import { isMobile } from "react-device-detect";
import About from "./screens/About/About.js";
import Game from "./screens/Game/Game.js";
import Campaigns from "./screens/Community/Campaigns/Campaigns.js";
import Map from "./screens/Map/Map.js";
import coreLogo from "./screens/Account/src/Components/WalletBalance/assets/coreLogo.svg";
import bnbLogo from "./screens/Account/src/Components/WalletBalance/assets/bnbIcon.svg";
import matchainLogo from "./components/Header/assets/matchain.svg";
import seiLogo from "./components/Header/assets/sei.svg";

import taikoLogo from "./screens/Account/src/Components/WalletBalance/assets/taikoLogo.svg";
import victionLogo from "./screens/Account/src/Components/WalletBalance/assets/victionLogo.svg";
import baseLogo from "./screens/Account/src/Components/WalletBalance/assets/baseLogo.svg";
import baseLogo2 from "./screens/Home/VideoWrapper/assets/baseLogo.svg";

import dypius from "./screens/Account/src/Components/WalletBalance/assets/dypIcon.svg";
import skaleLogo from "./screens/Account/src/Components/WalletBalance/assets/skaleLogo.svg";
import coingecko from "./screens/Account/src/Components/WalletBalance/assets/coingecko.svg";
import immutableLogo from "./screens/Account/src/Components/WalletBalance/assets/immutableLogo.svg";
import easy2stakeLogo from "./screens/Account/src/Components/WalletBalance/assets/easy2stakeLogo.svg";

import mantaLogo from "./screens/Account/src/Components/WalletBalance/assets/mantaLogo2.png";
import coreBg from "./screens/Account/src/Components/WalletBalance/assets/coreBg.webp";
import victionBg from "./screens/Account/src/Components/WalletBalance/assets/victionBg.webp";
import immutableBg from "./screens/Account/src/Components/WalletBalance/assets/immutableBg.webp";
import easy2stakeBg from "./screens/Account/src/Components/WalletBalance/assets/easy2stakeBg.webp";

import dypiusPremium from "./screens/Account/src/Components/WalletBalance/assets/dypiusPremium16.svg";
import baseUpcoming from "./screens/Account/src/Components/WalletBalance/assets/baseUpcoming.webp";
import upcomingDyp from "./screens/Account/src/Components/WalletBalance/assets/upcomingDyp.webp";
import upcomingBase2 from "./screens/Marketplace/assets/upcomingBase2.webp";
import upcomingBnb from "./screens/Marketplace/assets/upcomingBnb.png";
import coingeckoUpcoming from "./screens/Marketplace/assets/coingeckoUpcoming.png";
import upcomingCookie from "./screens/Marketplace/assets/cookieBg.webp";
import upcomingMatchain from "./screens/Marketplace/assets/matchainBg.webp";
import seiBg from "./screens/Marketplace/assets/seiBg.webp";

import upcomingDoge from "./screens/Marketplace/assets/upcomingDoge.webp";
import upcomingSkale from "./screens/Marketplace/assets/upcomingSkale.webp";
import upcomingDyp2 from "./screens/Marketplace/assets/dypiusBgPic2.webp";
import cmcUpcoming from "./screens/Marketplace/assets/upcomingCmc.webp";
import taikoBg from "./screens/Marketplace/assets/taikoBg.webp";
import mantaBg from "./screens/Marketplace/assets/mantaBg.webp";
import cookie3Logo from "./screens/Marketplace/assets/cookie3Logo.svg";
import cmc from "./screens/Marketplace/MarketNFTs/assets/cmc.svg";
import doge from "./screens/Marketplace/MarketNFTs/assets/dogeLogo.svg";
import gate from "./screens/Account/src/Components/WalletBalance/assets/gate.svg";
import gateUpcoming from "./screens/Account/src/Components/WalletBalance/assets/gateUpcoming.webp";
import conflux from "./screens/Account/src/Components/WalletBalance/assets/conflux.svg";
import confluxUpcoming from "./screens/Account/src/Components/WalletBalance/assets/confluxUpcoming.png";
import { markers } from "./screens/Map/mapdata/markers.js";
import Whitelist from "./screens/Whitelist/Whitelist.js";
import Release from "./screens/Release/Release.js";

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
    1: window.config.infura_endpoint,
    204: window.config.opbnb_endpoint,
    169: window.config.manta_endpoint,
    1030: window.config.conflux_endpoint,
    8453: window.config.base_endpoint,
    43114: window.config.avax_endpoint,
  },
});

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
      rpcUrls: ["https://rpc.taiko.xyz"],
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
  };

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

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [showWalletModalRegister2, setShowWalletModalRegister2] =
    useState(false);

  const [betaModal, setBetaModal] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);

  const [isConnected, setIsConnected] = useState(false);
  const [loginListener, setloginListener] = useState(0);
  const [totalVolumeNew, setTotalVolumeNew] = useState(0);
  const [wodHolders, setWodHolders] = useState(0);
  const [coinbase, setCoinbase] = useState();
  const [networkId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [count2, setCount2] = useState(0);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState();
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [recentListedNFTS2, setrecentListedNFTS2] = useState([]);
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
  const [username, setUsername] = useState("");
  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);
  const [totalBaseNft, settotalBaseNft] = useState(0);
  const [totalMantaNft, setTotalMantaNft] = useState(0);

  const [totalseiNft, setTotalseiNft] = useState(0);
  const [userWallet, setuserWallet] = useState("");

  const [baseMintAllowed, setbaseMintAllowed] = useState(1);

  const [mantaMintAllowed, setMantaMintAllowed] = useState(1);

  const [fireAppcontent, setFireAppContent] = useState(false);
  const [activeUser, setactiveUser] = useState(false);
  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb_old, setDypTokenDatabnb_old] = useState([]);
  const [socials, setSocials] = useState([]);

  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);

  const [totalBoughtNFTSCount, setTotalBoughtNFTSCount] = useState(0);

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

  const [myMantaNfts, setMyMantaNfts] = useState([]);

  const [isBnb, setisBnb] = useState(false);
  const [isBnbSuccess, setisBnbSuccess] = useState(false);
  const [logoutCount, setLogoutCount] = useState(0);

  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);

  const [nftCount, setNftCount] = useState(1);
  const [count, setCount] = useState(1);

  const [dypTokenData, setDypTokenData] = useState(0);
  const [dypTokenData_old, setDypTokenData_old] = useState();
  const [ethTokenData, setEthTokenData] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [binanceData, setbinanceData] = useState();

  const [isPremium, setIsPremium] = useState(false);
  const [domainPopup, setDomainPopup] = useState(false);
  const [showSync, setshowSync] = useState(false);

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

  useEagerlyConnect();
  const { activate, deactivate, library, provider } = useWeb3React();

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2025-02-18T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dogeLastDay = new Date("2024-03-21T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");
  let skaleLastDay = new Date("2024-07-14T13:00:00.000+02:00");
  let bnbLastDay = new Date("2024-09-10T13:00:00.000+02:00");
  let coreLastDay = new Date("2024-10-01T14:00:00.000+02:00");
  let victionLastDay = new Date("2025-03-29T14:00:00.000+02:00");

  let mantaLastDay = new Date("2024-11-18T14:00:00.000+02:00");
  let taikoLastDay = new Date("2024-11-17T14:00:00.000+02:00");
  let immutableLastDay = new Date("2024-11-13T14:00:00.000+02:00");
  let cookieLastDay = new Date("2024-11-24T14:00:00.000+02:00");
  let matchainLastDay = new Date("2025-04-03T14:00:00.000+02:00");
  let seiLastDay = new Date("2025-04-04T14:00:00.000+02:00");

  const starPrizes = [200, 100, 60, 30, 20, 20, 20, 20, 20, 20];
  const starPrizesGolden = [400, 200, 140, 70, 30, 30, 30, 30, 30, 30];
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

  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [skaleEarnToken, setSkaleEarnToken] = useState(0);
  const [skalePoints, setSkalePoints] = useState(0);
  const [skalePrice, setSkalePrice] = useState(0);

  const [matEarnUsd, setmatEarnUsd] = useState(0);
  const [matEarnToken, setmatEarnToken] = useState(0);
  const [matPoints, setmatPoints] = useState(0);

  const [seiPrice, setSeiPrice] = useState(0);
  const [userEvents, setuserEvents] = useState(0);
  const [wodBalance, setwodBalance] = useState(0);
  const [nftPools, setnftPools] = useState([]);
  const [tokenPools, settokenPools] = useState([]);
  const [userPools, setUserPools] = useState([]);

  const [stakeCount, setstakeCount] = useState(0);

  const [nftTvl, setnftTvl] = useState(0);

  const userId = data?.getPlayer?.playerId;

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
      const totaldesposited_wod4_formatted = new window.BigNumber(
        totaldesposited_wod4
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

          const seiEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "sei";
          });

          const easy2stakeEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "easy2stake";
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
            userActiveEvents = userActiveEvents + 1;

            const userEarnedusd =
              immutableEvent[0].reward.earn.total /
              immutableEvent[0].reward.earn.multiplier;
            const pointsBnb = immutableEvent[0].reward.earn.totalPoints;

            setImmutablePoints(pointsBnb);
            setImmutableEarnUsd(userEarnedusd);
            setImmutableEarnToken(userEarnedusd / immutablePrice);
          }


          if (easy2stakeEvent && easy2stakeEvent[0]) {
            userActiveEvents = userActiveEvents + 1;

            const userEarnedusd =
              easy2stakeEvent[0].reward.earn.total /
              easy2stakeEvent[0].reward.earn.multiplier;
            const pointsBnb = easy2stakeEvent[0].reward.earn.totalPoints;

            setEasy2StakePoints(pointsBnb);
            setEasy2StakeEarnUsd(userEarnedusd);
            setEasy2StakeEarnToken(userEarnedusd / bnbPrice);
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

          if (coreEvent && coreEvent[0]) {
            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;
            const pointsCore = coreEvent[0].reward.earn.totalPoints;
            setCorePoints(pointsCore);
            setCoreEarnUsd(userEarnedusd);
            setCoreEarnToken(userEarnedusd / corePrice);
          }

          if (seiEvent && seiEvent[0]) {
            const userEarnedusd =
              seiEvent[0].reward.earn.total /
              seiEvent[0].reward.earn.multiplier;
            const pointsSei = seiEvent[0].reward.earn.totalPoints;
            setSeiEarnPoints(pointsSei);
            setSeiEarnUsd(userEarnedusd);
            setSeiEarnToken(userEarnedusd / seiPrice);
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

          if (victionEvent && victionEvent[0]) {
            userActiveEvents = userActiveEvents + 1;

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
            userActiveEvents = userActiveEvents + 1;

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTotalWodHolders = async () => {
    await axios
      .get(`https://api.dyp.finance/api/getWodHolders`)
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

    const result = await timepiece_contract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    let base_contract = new window.baseWeb3.eth.Contract(
      window.BASE_NFT_ABI,
      window.config.nft_base_address
    );

    const result_base = await base_contract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

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

    const victionContract = new window.victionWeb3.eth.Contract(
      window.VICTION_NFT_ABI,
      window.config.nft_viction_address
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

  const web3Name = createWeb3Name();

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
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );

        setDypTokenData_old(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
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
      .get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=world-of-dypians&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev`
      )
      .then((res) => {
        if (
          res.data["world-of-dypians"] &&
          res.data["world-of-dypians"] !== NaN
        ) {
          setWodPrice(res.data["world-of-dypians"].usd);
        }
      });
  };

  const fetchDogeCoinPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["dogecoin"] && obj.data["dogecoin"] !== NaN) {
          setDogePrice(obj.data["dogecoin"].usd);
        }
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );

        setDypTokenDatabnb_old(propertyDyp[0][1].token_price_usd);

        setBnbUSDPrice(data.data.the_graph_bsc_v2.usd_per_eth);
        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
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
      axios
        .get(`https://api-image.dyp.finance/api/v1/username/${data}`)
        .then((res) => {
          if (res.data?.username) {
            setUsername(res.data?.username);
          } else {
            setUsername("");
          }
        });
    });
  };
  // console.log(isConnected, coinbase);
  const checkConnection2 = async () => {
    const logout = localStorage.getItem("logout");
    if (logout !== "true") {
      if (window.gatewallet) {
        setCoinbase(account);
        setIsConnected(isActive);
        fetchAvatar(account);
      } else {
        await window.getCoinbase().then((data) => {
          if (data) {
            fetchAvatar(data);
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
        console.log(data);
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
    if (
      window.ethereum &&
      !window.gatewallet &&
      window.WALLET_TYPE !== "binance"
    ) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else if (
      window.ethereum &&
      window.gatewallet &&
      window.WALLET_TYPE !== "binance"
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
          await window.connectWallet().then((data) => {
            setIsConnected(data);
          });

          await window.getCoinbase().then((data) => {
            setCoinbase(data);
          });
          if (isBnb === true) {
            setisBnbSuccess(true);
          }
          setwalletModal(false);
          setShowForms2(true);
          setSuccess(true);
          checkConnection();
        } else
          window.alertify.error("No web3 detected. Please install Metamask!");
      } else {
        await connectWallet(ConnectionType.INJECTED);
        setCoinbase(account);
        setIsConnected(isActive);
        setwalletModal(false);
        setShowForms2(true);
        setSuccess(true);
        setChainId(parseInt(window.gatewallet.chainId));
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

  const handleConnectWalletPassport = async () => {
    setwalletModal(true);

    const checkoutSDK_simple = new checkout.Checkout();

    const widgets_simple = await checkoutSDK_simple.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });

    const connect_simple = widgets_simple.create(checkout.WidgetType.CONNECT, {
      config: { theme: checkout.WidgetTheme.DARK },
    });

    if (!connect_simple) return;

    connect_simple.mount("connect_simple");

    connect_simple.addListener(checkout.ConnectEventType.SUCCESS, (data) => {
      console.log("success_simple", data);
      handleConnectWallet();
    });
    connect_simple.addListener(checkout.ConnectEventType.FAILURE, (data) => {
      console.log("failure_simple", data);
    });
    connect_simple.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect_simple.unmount();
    });
    setSuccess(true);
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
        setbaseMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmybaseNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "manta").then((NFTS) => {
        setTotalMantaNft(NFTS.length);
        setMyMantaNfts(NFTS);
        setMantaMintAllowed(NFTS.length > 0 ? 0 : 1);
        setMyMantaNFTsCreated(NFTS);
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

  const handleMatNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.mat_nft
            .mintMatNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "mat").then((NFTS) => {
                setMyMatNfts(NFTS);
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
    } else if (coinbase && isConnected && !data) {
      refreshSubscription(coinbase);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      !isConnected
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
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

  const getBoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts {
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

    // console.log("finalboughtItems", finalboughtItems);

    return finalboughtItems;
  };

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
    setLatest20BoughtNFTS(finalboughtItems);
  };

  const handleRefreshList = () => {
    setNftCount(nftCount + 1);
  };
  const getTop20BoughtByPriceAndPriceTypeNFTS = async (type) => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
      {
          itemBoughts(first: 20, orderBy: price, orderDirection: desc, where: {payment_priceType: ${type}}) {
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
    // console.log("boughtItems2", finalboughtItems);

    return finalboughtItems;
  };

  const getListedNfts2 = async () => {
    getListedNFTS(0, "", "recentListedNFTS")
      .then((data) => {
        setrecentListedNFTS2(data);
        setCount44(count44 + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];
    let finalboughtItems2 = [];
    const nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );
    const nft_contract_land = new window.infuraWeb3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    const nft_contract_timepiece = new window.infuraWeb3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );
    finalboughtItems1 = await getAllNfts();

    if (finalboughtItems1 && finalboughtItems1.length > 0) {
      setListedNFTS(finalboughtItems1);
      setListedNFTSCount(finalboughtItems1.length);
    }
    if (recentListedNFTS2 && recentListedNFTS2.length > 0) {
      await Promise.all(
        recentListedNFTS2.map(async (nft) => {
          if (nft.nftAddress === window.config.nft_caws_address) {
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "caws";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_land_address) {
            const nftowner_land = await nft_contract_land.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner_land &&
              nftowner_land.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "land";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_timepiece_address) {
            const nftowner_timepiece = await nft_contract_timepiece.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });

            if (
              nftowner_timepiece &&
              nftowner_timepiece.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "timepiece";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          }
        })
      );

      setLatest20RecentListedNFTS(finalboughtItems2);
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
    if (window.ethereum && window.WALLET_TYPE !== "binance") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(coinbase);
        let signatureData = "";
        await signer
          .signMessage(
            `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
          )
          .then((data) => {
            signatureData = data;

            handleManageLogin(
              signatureData,
              `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
            );
          });
      } catch (error) {
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
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
          // if (isonlink) {
          //   handleFirstTask(binanceWallet);
          // }
        });
      } catch (error) {
        console.log("🚀 ~ file: App.js:2248 ~ getTokens ~ error", error);
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
  }, [dataNonce]);

  useEffect(() => {
    if (ethereum && !window.gatewallet) {
      ethereum.on("chainChanged", checkNetworkId);
    }
    if (window.gatewallet) {
      window.gatewallet.on("changed", checkNetworkId);
    }
  }, [ethereum, nftCount]);

  const logout = localStorage.getItem("logout");
  // console.log(connector, library)
  useEffect(() => {
    if (
      !window.coin98 &&
      window.ethereum &&
      (window.ethereum.isMetaMask === true ||
        window.ethereum.isTrust === true) &&
      !window.gatewallet &&
      window.WALLET_TYPE !== "binance"
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
      window.WALLET_TYPE !== "binance"
    ) {
      checkConnection2();
    } else if (
      window.gatewallet &&
      isActive &&
      window.WALLET_TYPE !== "binance"
    ) {
      setIsConnected(isActive);
      if (account) {
        fetchAvatar(account);
        setCoinbase(account);
      }
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
        fetchAvatar(account);
        setCoinbase(account);
        setIsConnected(true);
      } else {
        setCoinbase();
        setIsConnected(false);
      }
    }
    // checkNetworkId();
  }, [coinbase, networkId, active, account]);

  // useEffect(() => {
  //   checkNetworkId();
  // }, [isConnected, coinbase, networkId, provider]);

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

    if (isConnected === true && coinbase && networkId === 56) {
      myNftBNB();
      myLandNftBNB();
    } else if (isConnected === true && coinbase && networkId === 43114) {
      myNft2Avax();
      myLandNftAVAX();
    } else if (isConnected === true && coinbase && networkId === 8453) {
      myNftsBase();
      myLandNftsBase();
    }
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
    fetchVictionPrice();
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
      title: "VICTION",
      logo: victionLogo,
      eventStatus: "Live",
      totalRewards: "$20,000 in VIC Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Nov 29, 2024",
      backgroundImage: victionBg,
      image: "victionBanner.png",
      userEarnUsd: victionEarnUsd,
      userEarnCrypto: victionEarnToken,
      userEarnPoints: victionPoints,
      popupInfo: {
        title: "VICTION",
        chain: "VICTION Chain",
        linkState: "viction",
        rewards: "VIC",
        status: "Live",
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
      title: "Immutable",
      logo: immutableLogo,
      eventStatus: "Live",
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
      backgroundImage: immutableBg,
      userEarnUsd: immutableEarnUsd,
      userEarnCrypto: immutableEarnToken,
      userEarnPoints: immutablePoints,
      image: "immutableBanner.png",

      popupInfo: {
        title: "Immutable",
        chain: "Immutable",
        linkState: "immutable",
        rewards: "IMX",
        status: "Live",
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
      title: "Easy2Stake",
      logo: easy2stakeLogo,
      eventStatus: "Live",
      rewardType: "BNB",
      rewardAmount: "$20,000",
      location: [-0.05935191046684262, 0.03785133361816407],
      image: "immutableBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Nov 29, 2024",
      backgroundImage: easy2stakeBg,
      userEarnUsd: easy2StakeEarnUsd,
      userEarnCrypto: easy2StakeEarnToken,
      userEarnPoints: easy2StakePoints,
      image: "immutableBanner.png",

      popupInfo: {
        title: "Easy2Stake",
        chain: "BNB Chain",
        linkState: "easy2stake",
        rewards: "BNB",
        status: "Live",
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
      title: "CORE",
      logo: coreLogo,
      eventStatus: "Expired",
      totalRewards: "$20,000 in CORE Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Jul 01, 2024",
      backgroundImage: coreBg,
      image: "coreBanner.png",

      userEarnUsd: coreEarnUsd,
      userEarnCrypto: coreEarnToken,
      userEarnPoints: corePoints,
      popupInfo: {
        title: "CORE",
        chain: "CORE Chain",
        linkState: "core",
        rewards: "CORE",
        status: "Expired",
        id: "event12",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in CORE Rewards",
        eventDuration: coreLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Jul 01, 2024",
      },
    },

    {
      title: "Base",
      logo: baseLogo2,
      eventStatus: "Live",
      totalRewards: "$20,000 in ETH Rewards",
      location: [-0.06787060104021504, 0.08728981018066406],
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Oct 21, 2024",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      backgroundImage: upcomingBase2,
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
        eventDate: "Oct 21, 2024",
      },
    },
    {
      title: "BNB Chain",
      logo: bnbLogo,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Jun 12, 2024",
      backgroundImage: upcomingBnb,
      userEarnUsd: bnbEarnUsd,
      userEarnCrypto: bnbEarnToken,
      userEarnPoints: bnbPoints,
      image: "bnbBanner.png",

      popupInfo: {
        title: "BNB Chain",
        chain: "BNB Chain",
        linkState: "bnb",
        rewards: "BNB",
        status: "Expired",
        id: "event20",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: bnbLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "/news",
        eventDate: "Jun 12, 2024",
      },
    },

    {
      title: "Taiko",
      logo: taikoLogo,
      eventStatus: "Expired",
      rewardType: "TAIKO",
      rewardAmount: "$20,000",
      location: [-0.06124018456762751, 0.11788845062255861],
      image: "taikoBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in TAIKO Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 19, 2024",
      backgroundImage: taikoBg,
      userEarnUsd: taikoEarnUsd,
      userEarnCrypto: taikoEarnToken,
      userEarnPoints: taikoPoints,
      popupInfo: {
        title: "TAIKO",
        chain: "Taiko",
        linkState: "taiko",
        rewards: "TAIKO",
        status: "Expired",
        id: "event22",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in TAIKO Rewards",
        eventDuration: taikoLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Aug 19, 2024",
      },
    },
    {
      title: "Manta",
      logo: mantaLogo,
      eventStatus: "Expired",
      rewardType: "MANTA",
      rewardAmount: "$20,000",
      location: [-0.033817289296309505, 0.09595870971679689],
      image: "mantaBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",

      marker: markers.treasureMarker,
      totalRewards: "$20,000 in MANTA Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Aug 20, 2024",
      backgroundImage: mantaBg,
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
        eventDate: "Aug 20, 2024",
      },
    },
    {
      title: "Cookie3",
      logo: cookie3Logo,
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
      backgroundImage: upcomingCookie,
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
      title: "Matchain",
      logo: matchainLogo,
      eventStatus: "Coming Soon",
      rewardType: "MAT",
      rewardAmount: "$20,000",
      location: [-0.06787060104021504, 0.08728981018066406],
      image: "matchainBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in MAT Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 04, 2024",
      backgroundImage: upcomingMatchain,
      userEarnUsd: matEarnUsd,
      userEarnCrypto: matEarnToken,
      userEarnPoints: matPoints,
      popupInfo: {
        title: "Matchain",
        chain: "Matchain",
        linkState: "matchain",
        rewards: "MAT",
        status: "Coming Soon",
        id: "event25",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in MAT Rewards",
        eventDuration: matchainLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Dec 04, 2024",
      },
    },

    {
      title: "SEI",
      logo: seiLogo,
      eventStatus: "Coming Soon",
      rewardType: "SEI",
      rewardAmount: "$20,000",
      location: [-0.06787060104021504, 0.08728981018066406],
      image: "matchainBanner.png",
      type: "Treasure Hunt",
      infoType: "Treasure Hunt",
      marker: markers.treasureMarker,
      totalRewards: "$20,000 in SEI Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 05, 2024",
      backgroundImage: seiBg,
      userEarnUsd: seiEarnUsd,
      userEarnCrypto: seiEarnToken,
      userEarnPoints: seiEarnPoints,
      popupInfo: {
        title: "SEI",
        chain: "Sei Network",
        linkState: "sei",
        rewards: "SEI",
        status: "Coming Soon",
        id: "event13",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SEI Rewards",
        eventDuration: seiLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore: "",
        eventDate: "Dec 05, 2024",
      },
    },
    {
      title: "SKALE",
      logo: skaleLogo,
      eventStatus: "Expired",
      totalRewards: "$20,000 in SKL Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Apr 15, 2024",
      backgroundImage: upcomingSkale,
      userEarnUsd: skaleEarnUsd,
      userEarnCrypto: skaleEarnToken,
      userEarnPoints: skalePoints,
      popupInfo: {
        title: "SKALE",
        chain: "SKALE Nebula Hub",
        linkState: "skale",
        rewards: "SKL",
        status: "Expired",
        id: "event11",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in SKL Rewards",
        eventDuration: skaleLastDay,
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/661d1671299713edd050794b/SKALE-Treasure-Hunt-Event-Live-in-the-World-of-Dypians",
        eventDate: "Apr 15, 2024",
      },
    },
    {
      title: "Dypius Premium",
      logo: dypiusPremium,
      eventStatus: "Expired",
      totalRewards: "$50,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Feb 26, 2024",
      backgroundImage: upcomingDyp2,
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
      logo: cmc,
      eventStatus: "Expired",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
      userEarnUsd: cmcuserEarnUsd,
      userEarnCrypto: cmcuserEarnETH,
      userEarnPoints: cmcuserPoints,
      backgroundImage: cmcUpcoming,
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
      logo: doge,
      totalRewards: "$10,000 in DOGE Rewards",
      eventDuration: dogeLastDay,
      userEarnCrypto: dogeEarnBNB,
      userEarnPoints: dogeUserPoints,
      backgroundImage: upcomingDoge,
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
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Expired",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: coingeckoUpcoming,
      userEarnUsd: userEarnUsd,
      userEarnCrypto: userEarnETH,
      userEarnPoints: userPoints,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Expired",
        id: "event3",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in BNB Rewards",
        eventDuration: coingeckoLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      },
    },
    {
      title: "Dypius",
      logo: dypius,
      eventStatus: "Expired",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Ended",
      backgroundImage: upcomingDyp,
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
      logo: gate,
      eventStatus: "Expired",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: gateUpcoming,
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
      logo: conflux,
      eventStatus: "Expired",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: confluxUpcoming,
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

  const fetchCawsNfts = async () => {
    const cawsNft = await getCawsNfts();
    let cawsNft_ETH = cawsNft.filter((item) => item.payment_priceType === 0);
    let latestCaws = cawsNft_ETH.sort((a, b) => {
      return (
        new Date(Number(b.blockTimestamp) * 1000) -
        new Date(Number(a.blockTimestamp) * 1000)
      );
    });
    setcawsListed(latestCaws);
  };

  const fetchLandNfts = async () => {
    const wodNft = await getWodNfts();
    let wodNft_ETH = wodNft.filter((item) => item.payment_priceType === 0);
    let latestWod = wodNft_ETH.sort((a, b) => {
      return (
        new Date(Number(b.blockTimestamp) * 1000) -
        new Date(Number(a.blockTimestamp) * 1000)
      );
    });
    setwodListed(latestWod);
  };

  const fetchTimepieceNfts = async () => {
    const timepieceNft = await getTimepieceNfts();
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

    const daily_bonus_contract_manta = new window.mantaWeb3.eth.Contract(
      window.DAILY_BONUS_MANTA_ABI,
      window.config.daily_bonus_manta_address
    );

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
                const isPremium_manta = await daily_bonus_contract_manta.methods
                  .isPremiumUser(addr)
                  .call()
                  .catch((e) => {
                    console.error(e);
                    return false;
                  });
                if (isPremium_manta === true) {
                  setIsPremium(true);
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
                    setIsPremium(true);
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
                      setIsPremium(true);
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
      }
    } else {
      setIsPremium(false);
    }
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

      setTimeout(() => {
        checkBinanceData();
        window.disconnectWallet();
        deactivate();
        localStorage.setItem("logout", "true");
        setSuccess(false);
        setCoinbase();
        setIsConnected(false);
        setIsPremium(false);
        window.WALLET_TYPE = "";
      }, 500);
    } else {
      disconnect(connector);
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
      const response = await axios.get(
        `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.data.length === 0) {
        const newUserResponse = await axios.post(
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
        );

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

  const getDomains = async () => {
    if (coinbase) {
      const name = await web3Name.getDomainName({
        address: coinbase,
        queryChainIdList: [56],
      });

      if (name && name !== null) {
        setDomainName(name);
        const metadata = await web3Name.getMetadata({ name: name });
        setDomainMetaData(metadata);
      } else {
        setDomainMetaData(null);
        setDomainName(null);
      }
    }

    // console.log(name, "domain")
  };
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

    const result2 = await axios
      .get("https://api.worldofdypians.com/api/totalVolumes")
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data && result.data != "NAN") {
        setTotalTx(result.data);
        localStorage.setItem("cachedTvl", result.data);
      }
    }
    if (result2 && result2.status === 200) {
      if (result2.data && result2.data !== "NaN") {
        setTotalVolume(result2.data);
        localStorage.setItem("cachedVolume", result2.data);
      }
    }
  };

  useEffect(() => {
    getAllData();
    fetchTotalVolume();
    fetchTotalWodHolders();
  }, [coinbase, count55, isConnected]);

  useEffect(() => {
    getDomains();
    fetchBscBalance();
  }, [coinbase, isConnected, logout, successMessage, loadingDomain]);

  useEffect(() => {
    fetchSkaleBalance();
    getWodBalance(coinbase);
  }, [coinbase, isConnected, networkId]);

  useEffect(() => {
    fetchUserFavorites(coinbase);
    // refreshSubscription();
  }, [coinbase, nftCount, authToken, isConnected, email]);

  useEffect(() => {
    getListedNfts2();
    getLatest20BoughtNFTS();
    // getTop20BoughtByPriceAndPriceTypeNFTS(0).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeETHNFTS(NFTS)
    // );
    // getTop20BoughtByPriceAndPriceTypeNFTS(1).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeDYPNFTS(NFTS)
    // );
  }, [nftCount]);

  const checkData = async () => {
    // if (coinbase) {
    navigate("/auth");
    // }
  };

  useEffect(() => {
    if (count44 !== 0) {
      getOtherNfts();
    }
  }, [count44, nftCount]);

  useEffect(() => {
    if (latest20BoughtNFTS.length > 0) {
      getCawsSold();
    }
  }, [latest20BoughtNFTS.length]);

  useEffect(() => {
    if (coinbase) {
      fetchUserPools(coinbase);

      // getNotifications(coinbase);
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    if (coinbase && isConnected && authToken && email)
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT Shop, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
  }, [coinbase, isConnected, authToken, email]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setCount2(0);
      return () => clearInterval(interval);
    }, 300000);
  }, [count2]);

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
    fetchCawsNfts();
    fetchLandNfts();
    fetchTimepieceNfts();
    checkNetworkId();
  }, []);

  useEffect(() => {
    fetchEthStaking();
  }, [stakeCount]);

  return (
    <>
      <div
        className={`container-fluid ${
          location.pathname.includes("map") && "px-0"
        } main-wrapper2 px-0 position-relative`}
      >
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
          gameAccount={data?.getPlayer?.wallet?.publicAddress}
          email={email}
          username={data?.getPlayer?.displayName}
          loginListener={loginListener}
          onSyncClick={() => {
            setshowSync(true);
          }}
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
                dyptokenData_old={dypTokenData_old}
                dyptokenData={dypTokenData}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                handleSwitchChainGateWallet={handleSwitchNetwork}
                handleSwitchChainBinanceWallet={handleSwitchNetwork}
                ethTokenData={ethTokenData}
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
                dyptokenDatabnb_old={dyptokenDatabnb_old}
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
                isPremium={isPremium}
                // userPools={userPools}
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
                isPremium={isPremium}
                // userPools={userPools}
              />
            }
          />

          <Route exact path="/roadmap" element={<Roadmap />} />
          <Route
            exact
            path="/community"
            element={
              <Community
                socials={socials}
                monthlyPlayers={monthlyPlayers}
                percent={percent}
              />
            }
          />
          {/* <Route exact path="/team" element={<OurTeam />} /> */}
          <Route
            exact
            path="/explorer"
            element={<Explorer count={count2} setCount={setCount2} />}
          />
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
          {/* 
          <Route
            exact
            path="/marketplace/nft-bridge"
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
              />
            }
          /> */}

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
                  setCount55(count55 + 1);
                }}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
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
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={handleConnectWallet}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={() => {
                  refetchPlayer();
                  setCount55(count55 + 1);
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

                onManageLogin={(value1, value2) => {
                  handleManageLogin(value1, value2);
                }}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
              />
            }
          />

          <Route
            exact
            path="/account/prime"
            element={
              <Dashboard
                wodBalance={wodBalance}
                authToken={authToken}
                wodPrice={wodPrice}
                dailyBonuslistedNFTS={listedNFTS}
                onSuccessDeposit={() => {
                  setCount55(count55 + 1);
                }}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
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
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={handleConnectWallet}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={() => {
                  refetchPlayer();
                  setCount55(count55 + 1);
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

                onManageLogin={(value1, value2) => {
                  handleManageLogin(value1, value2);
                }}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
              />
            }
          />

          <Route
            exact
            path="/land"
            element={
              <Land
                count={count2}
                setCount={setCount2}
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
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/shop"
            element={
              <Marketplace
                totalSupply={totalSupply}
                count={count2}
                wodHolders={wodHolders}
                totalVolumeNew={totalVolumeNew}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                latest20RecentListedNFTS={latest20RecentListedNFTS}
                recentSales={latest20BoughtNFTS}
                nftCount={nftCount}
                binanceW3WProvider={library}
                chainId={networkId}
              />
            }
          />
          <Route
            exact
            path="/shop/caws"
            element={
              <CawsNFT
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
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
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
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
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
                cawsArray={allCawsForTimepieceMint}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
              />
            }
          />

          {/* <Route
                exact
                path="/shop/beta-pass/avalanche"
                element={
                  <BetaPassNFT
                    type={"avalanche"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    isConnected={isConnected}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    chainId={networkId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    totalCookieNft={totalCookieNft}
                myCookieNfts={myCookieNfts}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              /> */}
          {/* <Route
                exact
                path="/shop/beta-pass/coin98"
                element={
                  <BetaPassNFT
                    type={"coin98"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    isConnected={isConnected}
                    chainId={networkId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    handleSwitchNetwork={handleSwitchNetwork}
                    totalCookieNft={totalCookieNft}
                myCookieNfts={myCookieNfts}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
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
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                myseiNfts={myseiNfts}
                totalseiNft={totalseiNft}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                cawsArray={allCawsForTimepieceMint}
                myMatNFTs={myMatNFTs}
                totalMatNfts={myMatNFTs.length}
              />
            }
          />
          <Route
            exact
            path="/account/challenges/:eventId"
            element={
              <Dashboard
                wodBalance={wodBalance}
                authToken={authToken}
                wodPrice={wodPrice}
                dailyBonuslistedNFTS={listedNFTS}
                onSuccessDeposit={() => {
                  setCount55(count55 + 1);
                }}
                userActiveEvents={userEvents}
                dummyBetaPassData2={dummyBetaPassData2}
                bnbEarnUsd={bnbEarnUsd}
                skaleEarnUsd={skaleEarnUsd}
                seiEarnUsd={seiEarnUsd}
                coreEarnUsd={coreEarnUsd}
                matEarnUsd={matEarnUsd}
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
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                account={coinbase}
                binanceW3WProvider={library}
                binanceWallet={coinbase}
                isConnected={isConnected}
                chainId={networkId}
                handleConnect={handleConnectWallet}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={() => {
                  refetchPlayer();
                  setCount55(count55 + 1);
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

                onManageLogin={(value1, value2) => {
                  handleManageLogin(value1, value2);
                }}
                showSync={showSync}
                onCloseSync={() => {
                  setshowSync(false);
                }}
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
                dyptokenDatabnb_old={dyptokenDatabnb_old}
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
                dyptokenDatabnb_old={dyptokenDatabnb_old}
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
              />
            }
          />
          {/* <Route
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
              />
            }
          />
          {/* <Route exact path="/buy" element={<Buy />} /> */}
          <Route exact path="/governance" element={<Governance />} />
          <Route exact path="/campaigns" element={<Campaigns />} />
          <Route
            exact
            path="/governance/proposal/:proposalId"
            element={<GovernanceInner />}
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
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={networkId}
                handleMint={handleOpbnbNftMint}
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
                totalTaikoNft={totalTaikoNft}
                taikoMintAllowed={taikoMintAllowed}
                myTaikoNfts={myTaikoNfts}
                myTaikoNFTsCreated={myTaikoNFTsCreated}
              />
            }
          />
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
            /> */}
          {/* <Route
              exact
              path="/shop/mint/sei"
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
                  handleMint={handleTimepieceMint}
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

      {/* {!location.pathname.includes("account") &&
        !location.pathname.includes("auth") &&
        !location.pathname.includes("explorer") &&
        !location.pathname.includes("map") &&
        !location.pathname.includes("bnbchain-alliance-program") && (
          <ChestFlyout />
        )} */}
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
        />
      )}

      {fireAppcontent === true && <AppContent />}
    </>
  );
}

export default App;
