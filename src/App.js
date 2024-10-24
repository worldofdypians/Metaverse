import Home from "./screens/Home/Home";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./fonts/Organetto.ttf";
import { Amplify } from "aws-amplify";
import { ApolloProvider, useMutation } from "@apollo/client";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./screens/Account/src/aws-exports";
import "./screens/Account/src/App.css";
import { checkout, passport, config } from "@imtbl/sdk";
import AuthProvider, {
  useAuth,
} from "./screens/Account/src/Utils.js/Auth/AuthDetails.js";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.js";
import client from "./screens/Account/src/apolloConfig.js";
import Dashboard from "./screens/Account/src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MarketplaceFooter from "./components/Footer/MarketplaceFooter";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
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
import MarketStake from "./screens/Marketplace/MarketStake";
import MarketEvents from "./screens/Marketplace/MarketEvents";
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
import { isMobile } from "react-device-detect";
import LoyaltyProgram from "./screens/LoyaltyProgram/LoyaltyProgram.js";

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
      rpcUrls: ["https://rpc.coredao.org/"],
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
    713715: {
      chainId: 713715,
      chainName: "Sei EVM Devnet",
      rpcUrls: ["https://evm-rpc-arctic-1.sei-apis.com"],
      nativeCurrency: {
        symbol: "SEI",
        decimals: 18,
      },
      blockExplorerUrls: ["https://seistream.app/"],
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

  const userId = data?.getPlayer?.playerId;

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
    fetchRecordsStar();
  }, [username, userId]);

  useEffect(() => {
    fetchPreviousWinnersStar();
  }, [prevVersionStar]);

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

  const handleDownload = () => {
    setdownloadSelected(true);
    setShowWalletModalDownload(true);
  };

  const handleSignUp = () => {
    if (activeUser === true) {
      setFireAppContent(true);
    } else {
      setShowWalletModalRegister(true);
    }
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
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`, {
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
        )}`, {
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
              "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!",
            redirect_link: "",
          }, {
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

    if (result.data && result.data !== "NaN") {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (result2.data && result2.data !== "NaN") {
      setTotalVolume(result2.data);
      localStorage.setItem("cachedVolume", result2.data);
    }
  };

  useEffect(() => {
    getAllData();
  }, [coinbase, count55, isConnected]);

  useEffect(() => {
    getDomains();
    fetchBscBalance();
  }, [coinbase, isConnected, logout, successMessage, loadingDomain]);

  useEffect(() => {
    fetchSkaleBalance();
  }, [coinbase, isConnected, networkId]);

  useEffect(() => {
    fetchUserFavorites(coinbase);
    // refreshSubscription();
  }, [coinbase, nftCount]);

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
      // getNotifications(coinbase);
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
    }
  }, [coinbase, nftCount]);

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
    fetchMonthlyPlayers();
    getTotalSupply();
    checkBinanceData();
    getTokenData();
    getTokenDatabnb();
    getPriceDYP();
    fetchDogeCoinPrice();
    fetchCawsNfts();
    fetchLandNfts();
    fetchTimepieceNfts();
    checkNetworkId();
  }, []);

  return (
    <>
      <div className="container-fluid p-0 main-wrapper2 position-relative">
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
        />
        <MobileNavbar
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
          handleOpenDomains={() => setDomainPopup(true)}
          domainName={domainName}
          handleSwitchChainBinanceWallet={handleSwitchNetwork}
          binanceWallet={coinbase}
        />

        <Routes>
          <Route path="/news/:newsId?/:titleId?" element={<News />} />
          <Route
            path="marketplace/nft/:nftId/:nftAddress?"
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
                handleDownload={handleDownload}
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
                totalTx={totalTx}

              />
            }
          />
          <Route exact path="/caws" element={<Caws />} />
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
          <Route exact path="/roadmap" element={<Roadmap />} />
          <Route
            exact
            path="/community"
            element={<Community socials={socials} monthlyPlayers={monthlyPlayers} percent={percent} />}
          />
          <Route exact path="/team" element={<OurTeam />} />
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
                onSuccessLogin={refetchPlayer}
                onNewsLetterClick={(value) => {
                  setisCheckedNewsLetter(value);
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
              authToken={authToken}
              dailyBonuslistedNFTS={listedNFTS}
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
                onManageLogin={(value1, value2) => {
                  handleManageLogin(value1, value2);
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
            path="/marketplace"
            element={
              <Marketplace
                totalSupply={totalSupply}
                count={count2}
                setCount={setCount2}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                totalListed={listedNFTSCount}
                latest20RecentListedNFTS={latest20RecentListedNFTS}
                totalBoughtNFTSCount={totalBoughtNFTSCount}
                recentSales={latest20BoughtNFTS}
                nftCount={nftCount}
                totalTx={totalTx}
                totalvolume={totalvolume}
                binanceW3WProvider={library}
                chainId={networkId}
              />
            }
          />
          <Route
            exact
            path="/marketplace/caws"
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
            path="/marketplace/land"
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
            path="/marketplace/timepiece"
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
            path="/marketplace/beta-pass/bnb"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/cookie3"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/manta"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/taiko"
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
              />
            }
          />

          {email &&
            data &&
            data.getPlayer &&
            data.getPlayer.displayName &&
            data.getPlayer.playerId &&
            data.getPlayer.wallet &&
            data.getPlayer.wallet.publicAddress && (
              <Route
                exact
                path="/loyalty-program"
                element={
                  <LoyaltyProgram
                    coinbase={coinbase}
                    isConnected={isConnected}
                    handleConnection={handleConnectWallet}
                  />
                }
              />
            )}
          <Route
            exact
            path="/marketplace/beta-pass/conflux"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/sei"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/core"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/multiversx"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/viction"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/skale"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/doge"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/coinmarketcap"
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
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/gate"
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
              />
            }
          />

          {/* <Route
                exact
                path="/marketplace/beta-pass/avalanche"
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
                path="/marketplace/beta-pass/coin98"
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
            path="/marketplace/beta-pass/coingecko/:terms?"
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
              />
            }
          />
          <Route
            exact
            path="/marketplace/beta-pass/base"
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
              />
            }
          />
          <Route
            exact
            path="/marketplace/events/:eventId"
            element={
              <MarketEvents
                tabState={"live"}
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
                ethTokenData={ethTokenData}
                dyptokenData_old={dypTokenData_old}
                dogePrice={dogePrice}
                binanceW3WProvider={library}
              />
            }
          />
          <Route
            exact
            path="/marketplace/events/upcoming"
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
          />
          <Route
            exact
            path="/marketplace/events/past"
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
          />
          <Route
            exact
            path="/marketplace/stake"
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
          />
          <Route
            exact
            path="/marketplace/mint/timepiece"
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
            path="/marketplace/mint/bnbchain"
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
            path="/marketplace/mint/opbnbchain"
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
            path="/marketplace/mint/manta"
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
            path="/marketplace/mint/immutable"
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
            path="/marketplace/mint/taiko"
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
            path="/marketplace/mint/viction"
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
              path="/marketplace/mint/multiversx"
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
            path="/marketplace/mint/core"
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
              path="/marketplace/mint/sei"
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
        </Routes>
        {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
        <ScrollTop />
        {location.pathname.includes("marketplace") ||
        location.pathname.includes("notifications") ||
        location.pathname.includes("account") ||
        location.pathname.includes("loyalty-program") ? (
          location.pathname.includes("caws") ||
          location.pathname.includes("land") ? null : (
            <MarketplaceFooter />
          )
        ) : (
          <Footer />
        )}
      </div>

      {!location.pathname.includes("account") &&
        !location.pathname.includes("auth") &&
        !location.pathname.includes("explorer") &&
        !location.pathname.includes("bnbchain-alliance-program") && (
          <ChestFlyout />
        )}
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

      {showWalletModalDownload === true && (
        <CheckWhitelistModal
          open={showWalletModalDownload}
          onClose={() => {
            setdownloadSelected(false);
            setShowWalletModalDownload(false);
          }}
          isPremium={isPremium}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}

      {fireAppcontent === true && <AppContent />}

      {showWalletModalRegister === true && (
        <CheckWhitelistModal
          open={showWalletModalRegister}
          onClose={() => {
            setShowWalletModalRegister(false);
          }}
          isPremium={isPremium}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}

      {showWalletModalRegister2 === true && (
        <CheckAuthUserModal
          open={showWalletModalRegister2}
          onClose={() => {
            setShowWalletModalRegister2(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}
    </>
  );
}

export default App;
