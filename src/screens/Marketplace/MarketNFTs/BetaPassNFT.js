import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import arrowRight from "./assets/arrowRight.svg";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import cmc from "./assets/cmc.svg";

import gateWhite from "./assets/gateWhite.svg";
import rightArrow from "./assets/rightArrow.svg";
import coinbaseimg from "./assets/base.svg";
import { useLocation } from "react-router-dom";
import blockChainIcon from "../assets/blockChainIcon.svg";
import confluxLogo from "../assets/confluxLogo.svg";
import baseLogo from "../assets/baseLogo.svg";
import bnbLogo from "../assets/bnbLogo.svg";
import skaleLogo from "../assets/skaleLogo.svg";
import coreLogo from "../assets/coreLogo.svg";
import immutableLogo from "../assets/immutableLogo.svg";
import multiversLogo from "../assets/multiversLogo.svg";

import victionLogo from "../assets/victionLogo.svg";
import seiLogo from "../assets/seiLogo.svg";

import comingSoon from "../assets/comingSoon.svg";

import wodLogo from "../assets/wodIcon.png";
import blackWallet from "../../../assets/wallet-black.svg";
import whitewallet from "../../../assets/wallet-white.svg";
import addActive from "../../../assets/landAssets/addActive.svg";
import addInactive from "../../../assets/landAssets/addInactive.svg";
import subtractActive from "../../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../../assets/landAssets/subtractInactive.svg";
import dummyBadge from "../../../assets/landAssets/dummyBadge.png";
import avaxLogo from "./assets/avaxLogo.svg";
import dogeLogo from "./assets/dogeLogo.svg";
import dogeBetaBanner from "./assets/dogeBetaBanner.png";
import betapassBanner from "./assets/betaPassBanner.png";
import betapassBannerConflux from "./assets/betaPassBannerConflux.webp";
import betapassBannerGate from "./assets/betaPassBannerGate.webp";
import seiBanner from "./assets/seiBanner.webp";
import victionBanner from "./assets/victionBanner.webp";
import immutableBanner from "./assets/immutableBanner.webp";
import multiversBanner from "./assets/multiversBanner.webp";
import coreBanner from "./assets/coreBanner.webp";


import avaxbetapassBanner from "./assets/betapassAvax.png";
import geckobetapassBanner from "./assets/betaPassBannerGecko.png";
import SignUpGecko from "../../Account/src/Containers/SingUp/SignUpGecko";
import PlayerCreationGecko from "../../Account/src/Containers/PlayerCreation/PlayerCreationGecko";
import pinkArea from "./assets/pinkArea.svg";
import pinkAreaConflux from "./assets/pinkAreaConflux.svg";
import pinkAreaGate from "./assets/pinkAreaGate.svg";
import pinkAreaBase from "./assets/pinkAreaBase.svg";
import pinkAreaDoge from "./assets/pinkAreaDoge.svg";
import pinkAreaCmc from "./assets/pinkAreaCmc.svg";
import avaxBetaBanner from "./assets/avaxBetaBanner.png";
import coingeckoBetaBanner from "./assets/coingeckoBetaBanner.png";
import confluxBetaBanner from "./assets/confluxBetaBanner.png";
import cmcBetaBanner from "./assets/cmcBetaBanner.webp";
import skaleBetaBanner from "./assets/skaleBetaBanner.webp";

import baseBetaBanner from "./assets/baseBetaBanner.png";

import gateBetaBanner from "./assets/gateBetaBanner.png";
import coin98BetaBanner from "./assets/coin98BetaBanner.png";

import walletImg from "./assets/wallet.svg";
import circleArrow from "./assets/arrow-circle.svg";
import termsArrow from "./assets/termsArrow.svg";
import popupXmark from "../assets/popupXmark.svg";
import user from "./assets/user.svg";
import windowIcon from "./assets/windowIcon.svg";
import windowsIconWhite from "../../../assets/windowsIconWhite.svg";
import getFormattedNumber from "../../Account/src/Utils.js/hooks/get-formatted-number";
import {
  GENERATE_NONCE,
  GET_PLAYER,
  VERIFY_WALLET,
} from "../../Account/src/Containers/Dashboard/Dashboard.schema";
import OutsideClickHandler from "react-outside-click-handler";
import switchIcon from "./assets/switchIcon.svg";
import metamaskIcon from "./assets/metamaskIcon.svg";
import coin98Wallet from "./wallets/coin98.png";
import trustWallet from "./wallets/trustwallet.png";
import coinbaseWallet from "./wallets/coinbase.png";
import safepalWallet from "./wallets/safepal.png";
import gateWallet from "./wallets/gateWallet.png";
import mintNowIcon from "./assets/mintNowIcon.svg";

import { shortAddress } from "../../Caws/functions/shortAddress";
import { handleSwitchNetworkhook } from "../../../hooks/hooks";
import avaxMobileBg from "../../../components/TimepieceMint/assets/avaxMobileBg.png";
import coin98MobileBg from "../../../components/TimepieceMint/assets/coin98MobileBg.png";
import baseMobileBg from "../../../components/TimepieceMint/assets/baseMobileBg.png";
import confluxMobileBg from "../../../components/TimepieceMint/assets/confluxMobileBg.png";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Account/src/Utils.js/Auth/AuthDetails";
import SignUpConflux from "../../Account/src/Containers/SingUp/SignUpConflux";
import PlayerCreationConflux from "../../Account/src/Containers/PlayerCreation/PlayerCreationConflux";
import whitePickaxe from "../assets/whitePickAxe.svg";
import whiteCalendar from "../assets/whiteCalendar.svg";
import epicwhite from "../assets/epicwhite.svg";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="livein-timer">
      {days}d : {hours}h : {minutes}m
    </span>
  );
};

const BetaPassNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  cawsBought,
  handleRefreshListing,
  chainId,
  totalCreated,
  totalCoingeckoNft,
  myGateNfts,
  totalGateNft,
  totalBaseNft,
  mintloading,
  showWalletConnect,
  cawsArray,
  textColor,
  mintStatus,
  nftName,
  handleMint,
  totalConfluxNft,
  myConfluxNfts,
  myNFTSCoingecko,
  handleSwitchNetwork,
  success,
  myBaseNFTs,
  totalDogeNft,
  myDogeNFTs,
  totalCmcNft,
  myCmcNFTs,
  totalSkaleNft,
  mySkaleNfts,
  totalCoreNft,
  myCoreNfts,
  totalseiNft,
  myseiNfts,
  totalVictionNft,
  myVictionNfts,
  totalImmutableNft,
  totalMultiversNft,
  myImmutableNfts,
  myMultiversNfts,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const benefits = [
    {
      title: "Exclusive Access",
      icon: "draft",
    },
    {
      title: "Enhanced Interactions",
      icon: "user",
    },
    {
      title: "Special Rewards",
      icon: "star",
    },
    {
      title: "Expanded Functionality",
      icon: "expand",
    },
  ];

  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: "conflux-mint-bg2",
  };

  const avaxData = {
    id: "avax",
    cardTitle: "Avalanche Beta Pass",
    title: "Avalanche Beta Pass",
    background: "avalanche-mint-bg",
  };

  const coreData = {
    id: "core",
    cardTitle: "CORE Beta Pass",
    title: "CORE Beta Pass",
    background: "core-mint-bg",
  };

  const victionData = {
    id: "viction",
    cardTitle: "Viction Beta Pass",
    title: "Viction Beta Pass",
    background: "viction-mint-bg",
  };

  const multiversData = {
    id: "multiversx",
    cardTitle: "MultiversX Beta Pass",
    title: "MultiversX Beta Pass",
    background: "multivers-mint-bg",
  };

  const immutableData = {
    id: "immutable",
    cardTitle: "Immutable Beta Pass",
    title: "Immutable Beta Pass",
    background: "immutable-mint-bg",
  };

  const seiData = {
    id: "sei",
    cardTitle: "SEI Beta Pass",
    title: "SEI Beta Pass",
    background: "sei-mint-bg",
  };

  const dogeData = {
    id: "doge",
    cardTitle: "Dogecoin Beta Pass",
    title: "Dogecoin Beta Pass",
    background: "doge-mint-bg2",
  };

  const cmcData = {
    id: "cmc",
    cardTitle: "CoinMarketCap Beta Pass",
    title: "CoinMarketCap Beta Pass",
    background: "cmc-mint-bg2",
  };

  const coin98Data = {
    id: "coin98",
    cardTitle: "Coin98 Beta Pass",
    title: "Coin98 Beta Pass",
    background: "coin98-mint-bg",
  };
  const coingeckoData = {
    id: "coingecko",
    cardTitle: "CoinGecko Beta Pass",
    title: "CoinGecko Beta Pass",
    background: "coingecko-mint-bg",
  };
  const baseData = {
    id: "base",
    cardTitle: "Base Beta Pass",
    title: "Base Beta Pass",
    background: "base-mint-bg2",
  };

  const gateData = {
    id: "gate",
    cardTitle: "Gate Beta Pass",
    title: "Gate Beta Pass",
    background: "gate-mint-bg",
  };

  const skaleData = {
    id: "skale",
    cardTitle: "SKALE Beta Pass",
    title: "SKALE Beta Pass",
    background: "skale2-mint-bg",
  };

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const { email } = useAuth();

  const locationState = location?.pathname;

  const [priceCount, setPriceCount] = useState(0);
  const [filterTitle, setFilterTitle] = useState("Filter");
  const [showBadge, setshowBadge] = useState(false);
  const [latestMintId, setlatestMintId] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const [status, setStatus] = useState("Connect your wallet.");
  const [activeButton, setactiveButton] = useState(false);
  const [selectedMint, setSelectedMint] = useState(baseData);
  const [mintTitle, setMintTitle] = useState("base");
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [viewCollection, setViewCollection] = useState(false);
  const [playerCreation, setplayerCreation] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [linkWallet, setLinkWallet] = useState(false);
  const [alreadyRegistered, setalreadyRegistered] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openConflux, setOpenConflux] = useState(false);
  const [nftSymbol, setnftSymbol] = useState("");
  const [activeTab, setactiveTab] = useState("create");
  const [icons, setIcons] = useState(false);
  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnUsdConflux, setuserEarnUsdConflux] = useState(0);
  const [userEarnUsdGate, setUserEarnUsdGate] = useState(0);
  const [isBaseActive, setisBaseActive] = useState(false);
  const [baseEarnUSD, setBaseEarnUSD] = useState(0);
  const [dogeEarnUSD, setDogeEarnUSD] = useState(0);
  const [cmcEarnUSD, setCmcEarnUSD] = useState(0);
  const [isSkaleLive, setisSkaleLive] = useState(true);
  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);

  const html = document.querySelector("html");
  const bgmenu = document.querySelector("#terms");
  const bgmenu2 = document.querySelector("#switch");
  let skaleLiveDay = new Date("2024-04-10T11:00:00.000+02:00");

  // useEffect(() => {
  //   if (
  //     mintTitle === "conflux" &&
  //     coinbase &&
  //     chainId &&
  //     chainId !== 1030 &&
  //     !email
  //   ) {
  //     setOpenConflux(true);
  //   } else setOpenConflux(false);
  // }, [mintTitle, coinbase, chainId, email]);

  const getNftSymbol = async () => {
    if (mintTitle === "gate") {
      const contract = new window.bscWeb3.eth.Contract(
        window.GATE_NFT_ABI,
        window.config.nft_gate_address
      );
      const symbol = await contract.methods.symbol().call();
      setnftSymbol(symbol);
    } else if (mintTitle === "conflux") {
      const symbol = "CFBP";
      setnftSymbol(symbol);
    } else if (mintTitle === "coingecko") {
      const symbol = "CGBP";
      setnftSymbol(symbol);
    } else if (mintTitle === "base") {
      setnftSymbol("BSBP");
    }
  };

  const handleConfluxPool = async () => {
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0x406")
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    } else {
      handleSwitchNetwork(1030);
    }
  };

  useEffect(() => {
    if (openTerms === true || openConflux === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      bgmenu2.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openTerms, openConflux]);

  const handleViewCollection = () => {
    setViewCollection(true);
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
          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });
          const baseEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "base";
          });

          const dogeEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "dogecoin";
          });

          const cmcEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coinmarketcap";
          });

          if (coingeckoEvent && coingeckoEvent[0]) {
            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;
            setuserEarnUsd(usdValue);
          }

          if (cmcEvent && cmcEvent[0]) {
            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;
            setCmcEarnUSD(usdValue);
          }
          if (skaleEvent && skaleEvent[0]) {
            const usdValue =
              skaleEvent[0].reward.earn.total /
              skaleEvent[0].reward.earn.multiplier;
            setSkaleEarnUsd(usdValue);
          }

          if (dogeEvent && dogeEvent[0]) {
            const usdValue =
              dogeEvent[0].reward.earn.total /
              dogeEvent[0].reward.earn.multiplier;
            setDogeEarnUSD(usdValue);
          }

          if (
            confluxEvent &&
            confluxEvent[0] &&
            confluxEvent[0].reward.earn.multiplier !== 0
          ) {
            const usdValueConflux =
              confluxEvent[0].reward.earn.total /
              confluxEvent[0].reward.earn.multiplier;
            setuserEarnUsdConflux(usdValueConflux);
          }
          if (gateEvent && gateEvent[0]) {
            const gateUsdValue =
              gateEvent[0].reward.earn.total /
              gateEvent[0].reward.earn.multiplier;

            setUserEarnUsdGate(gateUsdValue);
          }

          if (baseEvent && baseEvent[0]) {
            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;
              setBaseEarnUSD(baseUsdValue);
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

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
  };

  async function connectWallet() {
    if (!isConnected) {
      showWalletConnect();
    } else if (isConnected) {
      if (mintTitle === "conflux" && chainId !== 1030) {
        window.alertify.error(
          "You should be on Conflux network to link your account!"
        );
      } else {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          try {
            await window.ethereum?.enable();
            console.log("Connected!");

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
    }
  }

  const signWalletPublicAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(coinbase);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: coinbase,
          signature: signature,
        },
      }).then(() => {
        setalreadyRegistered(true);
      });
    } catch (error) {
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const addNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount < cawsArray.length) {
      setNftCount(nftCount + 1);
    }
  };

  // console.log(totalCaws)
  const subtractNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount > 1) {
      setNftCount(nftCount - 1);
    }
  };

  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  const { terms } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllCawsCollection();
    document.title = "Beta Pass";

    if (terms) {
      setOpenTerms(true);
    }
  }, []);

  useEffect(() => {
    if (locationState.includes("/beta-pass/conflux")) {
      setSelectedMint(confluxData);
      setMintTitle("conflux");
    } else if (locationState.includes("/beta-pass/coingecko")) {
      setSelectedMint(coingeckoData);
      setMintTitle("coingecko");
    } else if (locationState.includes("/beta-pass/coin98")) {
      setSelectedMint(coin98Data);
      setMintTitle("coin98");
    } else if (locationState.includes("/beta-pass/base")) {
      setSelectedMint(baseData);
      setMintTitle("base");
    } else if (locationState.includes("/beta-pass/avalanche")) {
      setSelectedMint(avaxData);
      setMintTitle("avalanche");
    } else if (locationState.includes("/beta-pass/doge")) {
      setSelectedMint(dogeData);
      setMintTitle("doge");
    } else if (locationState.includes("/beta-pass/gate")) {
      setSelectedMint(gateData);
      setMintTitle("gate");
    } else if (locationState.includes("/beta-pass/skale")) {
      setSelectedMint(skaleData);
      setMintTitle("skale");
    } else if (locationState.includes("/beta-pass/coinmarketcap")) {
      setSelectedMint(cmcData);
      setMintTitle("cmc");
    } else if (locationState.includes("/beta-pass/sei")) {
      setSelectedMint(seiData);
      setMintTitle("sei");
    } else if (locationState.includes("/beta-pass/core")) {
      setSelectedMint(coreData);
      setMintTitle("core");
    } else if (locationState.includes("/beta-pass/viction")) {
      setSelectedMint(victionData);
      setMintTitle("viction");
    } else if (locationState.includes("/beta-pass/multiversx")) {
      setSelectedMint(multiversData);
      setMintTitle("multiversx");
    } else if (locationState.includes("/beta-pass/immutable")) {
      setSelectedMint(immutableData);
      setMintTitle("immutable");
    }
  }, [locationState]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      !data.getPlayer.wallet
    ) {
      setLinkWallet(true);
      setEmailVerify(true);
      setplayerCreation(true);
      setShowVerify(true);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      setalreadyRegistered(true);
    }
  }, [data, email]);

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
      fetchTreasureHuntData(email, data.getPlayer.wallet.publicAddress);
    }
  }, [data, email]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce && isConnected) {
      signWalletPublicAddress();
    }
  }, [dataNonce, isConnected]);

  useEffect(() => {
    if (
      success === true &&
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      !data.getPlayer.wallet
    ) {
      setTimeout(() => {
        connectWallet();
      }, 1000);
    }
  }, [success, data]);

  useEffect(() => {
    getNftSymbol();
  }, [mintTitle]);

  return (
    <>
      <div
        id="header"
        // onScroll={onScroll}
        // ref={listInnerRef}
        // style={{ overflow: "scroll" }}
      >
        <div
          className="container-fluid d-flex justify-content-end p-0"
          style={{ minHeight: "72vh", maxWidth: "2400px" }}
        >
          {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

          <div
            className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative flex-column"
            style={{ backgroundSize: "cover" }}
          >
            <div className="container-lg mx-0 position-relative">
              <div
                className="row align-items-center justify-content-between mt-4 mb-5 gap-4 gap-lg-0"
                style={{ minHeight: "232px" }}
              >
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-column gap-3">
                    <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                      {mintTitle === "coingecko"
                        ? "CoinGecko"
                        : mintTitle === "doge"
                        ? "Dogecoin"
                        : mintTitle === "cmc"
                        ? "CoinMarketCap"
                        : mintTitle}{" "}
                      Beta Pass
                    </h6>
                    {mintTitle !== "doge" ? (
                      <p className="collection-desc">
                        The Beta Pass NFT provides you with a special ticket to
                        enter the metaverse and participate in an exclusive
                        event hosted by{" "}
                        {mintTitle === "conflux"
                          ? "Conflux"
                          : mintTitle === "doge"
                          ? "Doge"
                          : mintTitle === "gate"
                          ? "Gate.io"
                          : mintTitle === "core"
                          ? "CORE"
                          : mintTitle === "multiversx"
                          ? "MultiversX"
                          : mintTitle === "immutable"
                          ? "Immutable"
                          : mintTitle === "sei"
                          ? "SEI"
                          : mintTitle === "viction"
                          ? "VICTION"
                          : mintTitle === "coingecko"
                          ? "CoinGecko"
                          : mintTitle === "skale"
                          ? "SKALE"
                          : mintTitle === "cmc"
                          ? "CoinMarketCap"
                          : "our partners"}
                        .{" "}
                        {mintTitle === "skale"
                          ? `During this event, players have the opportunity to
                        earn Points for their leaderboard rankings, and also
                        collect rewards which are distributed on a monthly basis.`
                          : `During this event, players have the opportunity to
                        earn Points for their leaderboard rankings, and also
                        collect rewards in different tokens, which are
                        distributed on a monthly basis.`}
                      </p>
                    ) : (
                      <p className="collection-desc">
                        The Beta Pass NFT provides you with a special ticket to
                        enter the metaverse and participate in an exclusive
                        event hosted on BNB Chain. During this event, players
                        have the opportunity to earn Points for their
                        leaderboard rankings, and also collect rewards in
                        different tokens, which are distributed on a monthly
                        basis.
                      </p>
                    )}
                    {/* {mintTitle === "conflux" && (
                      <NavLink
                        to="/marketplace/mint/conflux"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn mint-now-btn gap-2">
                          <img src={mintNowIcon} alt="" />
                          Available minting
                        </button>
                      </NavLink>
                    )} */}
                  </div>
                </div>
                <div className="col-12 col-lg-4 px-0">
                  <img
                    src={
                      mintTitle === "avalanche"
                        ? avaxBetaBanner
                        : mintTitle === "coingecko"
                        ? coingeckoBetaBanner
                        : mintTitle === "conflux"
                        ? confluxBetaBanner
                        : mintTitle === "gate"
                        ? gateBetaBanner
                        : mintTitle === "coin98"
                        ? coin98BetaBanner
                        : mintTitle === "base"
                        ? baseBetaBanner
                        : mintTitle === "doge"
                        ? dogeBetaBanner
                        : mintTitle === "cmc"
                        ? cmcBetaBanner
                        : mintTitle === "skale"
                        ? skaleBetaBanner
                        : mintTitle === "viction"
                        ? victionBanner
                        : mintTitle === "multiversx"
                        ? multiversBanner
                        : mintTitle === "core"
                        ? coreBanner
                        : mintTitle === "sei"
                        ? seiBanner
                        : mintTitle === "immutable"
                        ? immutableBanner
                        : betapassBanner
                    }
                    className="w-100"
                    alt=""
                  />
                </div>
              </div>
              <div
                className="filters-container d-flex flex-column align-items-center justify-content-center my-4 p-3 position-relative gap-3"
                style={{ zIndex: 2 }}
              >
                <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                  <NavLink
                    to={"/marketplace/beta-pass/core"}
                    className={`${
                      location.pathname.includes("core") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(coreData);
                      setMintTitle("core");
                    }}
                  >
                    <img
                      src={coreLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>CORE</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/viction"}
                    className={`${
                      location.pathname.includes("viction") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(victionData);
                      setMintTitle("viction");
                    }}
                  >
                    <img
                      src={victionLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>VICTION</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/sei"}
                    className={`${
                      location.pathname.includes("sei") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(seiData);
                      setMintTitle("sei");
                    }}
                  >
                    <img src={seiLogo} className="beta-pass-chain-img" alt="" />
                    <span>SEI</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/immutable"}
                    className={`${
                      location.pathname.includes("immutable") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(immutableData);
                      setMintTitle("immutable");
                    }}
                  >
                    <img
                      src={immutableLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>Immutable</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/multiversx"}
                    className={`${
                      location.pathname.includes("multiversx") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(multiversData);
                      setMintTitle("multiversx");
                    }}
                  >
                    <img
                      src={multiversLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>MultiversX</span>
                  </NavLink>
                </div>
                <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                  <NavLink
                    to={"/marketplace/beta-pass/skale"}
                    className={`${
                      location.pathname.includes("skale") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2 position-relative`}
                    onClick={() => {
                      setSelectedMint(skaleData);
                      setMintTitle("skale");
                    }}
                  >
                    {/* <img src={comingSoon} alt='' className="position-absolute comingSoonimg" /> */}
                    <img
                      src={skaleLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>SKALE</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/coinmarketcap"}
                    className={`${
                      location.pathname.includes("coinmarketcap") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(cmcData);
                      setMintTitle("cmc");
                    }}
                  >
                    <img src={cmc} className="beta-pass-chain-img" alt="" />
                    <span>CoinMarketCap</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/doge"}
                    className={`${
                      location.pathname.includes("doge") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(dogeData);
                      setMintTitle("doge");
                    }}
                  >
                    <img
                      src={dogeLogo}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>Dogecoin</span>
                  </NavLink>

                  <NavLink
                    to={"/marketplace/beta-pass/base"}
                    className={`${
                      location.pathname.includes("base") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(baseData);
                      setMintTitle("base");
                    }}
                  >
                    <img
                      src={coinbaseimg}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>Base</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/coingecko"}
                    className={`${
                      location.pathname.includes("coingecko") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(coingeckoData);
                      setMintTitle("coingecko");
                    }}
                  >
                    <img
                      src={coingecko}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>CoinGecko</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/gate"}
                    className={`${
                      location.pathname.includes("gate") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(gateData);
                      setMintTitle("gate");
                    }}
                  >
                    <img
                      src={gateWallet}
                      className="beta-pass-chain-img"
                      alt=""
                    />
                    <span>Gate</span>
                  </NavLink>
                  <NavLink
                    to={"/marketplace/beta-pass/conflux"}
                    className={`${
                      location.pathname.includes("conflux") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(confluxData);
                      setMintTitle("conflux");
                    }}
                  >
                    <img src={conflux} className="beta-pass-chain-img" alt="" />
                    <span>Conflux</span>
                  </NavLink>
                  {/* <NavLink
                    to={"/marketplace/beta-pass/coin98"}
                    className={`${
                      location.pathname.includes("coin98") &&
                      "selected-beta-pass-item"
                    } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                    onClick={() => {
                      setSelectedMint(coin98Data);
                      setMintTitle("coin98");
                    }}
                  >
                    <img src={coin98} className="beta-pass-chain-img" alt="" />
                    <span>Coin98</span>
                  </NavLink> */}
                </div>
              </div>

              <div className=" nft-page-wrapper d-flex flex-column flex-xxl-row gap-3 mb-3">
                {mintTitle !== "coingecko" &&
                  mintTitle !== "conflux" &&
                  mintTitle !== "gate" &&
                  mintTitle !== "base" &&
                  mintTitle !== "doge" &&
                  mintTitle !== "cmc" &&
                  mintTitle !== "skale" &&
                  mintTitle !== "core" &&
                  mintTitle !== "viction" &&
                  mintTitle !== "sei" &&
                  mintTitle !== "multiversx" &&
                  mintTitle !== "immutable" && (
                    <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 staking-height-2">
                      <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
                        <div className="d-flex flex-column position-relative">
                          {showBadge && totalCreated > 0 && (
                            <div className="totalcreated">
                              <span>{totalCreated}</span>
                            </div>
                          )}
                          <div
                            className={`genesis-wrapper ${
                              mintTitle !== "timepiece"
                                ? "conflux-empty"
                                : totalCreated > 0
                                ? "genesis-land"
                                : "genesis-land-empty"
                            } d-flex justify-content-center align-items-center p-3 position-relative`}
                            style={{ height: 312 }}
                          >
                            <img
                              src={dummyBadge}
                              className="genesis-badge"
                              style={{ visibility: "hidden" }}
                              alt="badge"
                            />
                          </div>
                          <div
                            className="genesis-desc position-relative"
                            style={{ bottom: "5px" }}
                          >
                            <h6 className="font-organetto land-desc w-75">
                              {selectedMint.cardTitle}
                            </h6>
                          </div>
                        </div>
                        <div
                          className={
                            isConnected === false ||
                            activeButton === false ||
                            totalCreated === 0
                              ? "linear-border-disabled"
                              : "linear-border"
                          }
                        >
                          <button
                            className={`btn ${
                              isConnected === false ||
                              activeButton === false ||
                              totalCreated === 0
                                ? "outline-btn-disabled"
                                : "outline-btn"
                            } px-5 w-100`}
                            disabled={
                              isConnected === false ||
                              activeButton === false ||
                              totalCreated === 0
                            }
                            onClick={handleViewCollection}
                          >
                            View collection
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                <div
                  className={
                    mintTitle === "coingecko" ||
                    mintTitle === "conflux" ||
                    mintTitle === "gate" ||
                    mintTitle === "doge" ||
                    mintTitle === "base" ||
                    mintTitle === "cmc" ||
                    mintTitle === "skale" ||
                    mintTitle === "viction" ||
                    mintTitle === "core" ||
                    mintTitle === "sei" ||
                    mintTitle === "multiversx" ||
                    mintTitle === "immutable"
                      ? "col-12 col-md-12 col-xxl-7 mt-0 px-0"
                      : "col-12 col-md-12 col-xxl-5 mt-0 px-0"
                  }
                  style={{ overflowX: "hidden" }}
                >
                  <div
                    className={`p-4 mint-wrappernew ${selectedMint.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                    style={{ minHeight: "463px" }}
                  >
                    <h6 className="marketmintnewtitle position-relative">
                      {mintTitle === "coingecko" && (
                        <>
                          Get Your CoinGecko Beta Pass
                          <br className="d-none d-lg-flex" /> via
                          <span className="marketmintnewtitle-marked mx-2">
                            Candy Rewards!
                          </span>
                        </>
                      )}
                      {mintTitle !== "coingecko" &&
                        mintTitle !== "conflux" &&
                        mintTitle !== "gate" &&
                        mintTitle !== "base" &&
                        mintTitle !== "doge" &&
                        mintTitle !== "cmc" &&
                        mintTitle !== "skale" &&
                        mintTitle !== "sei" &&
                        mintTitle !== "core" &&
                        mintTitle !== "viction" &&
                        mintTitle !== "immutable" &&
                        mintTitle !== "multiversx" && (
                          <>
                            Mint your {selectedMint.title}{" "}
                            <br className="d-none d-lg-flex" />
                            NFT
                            <span className="marketmintnewtitle-marked mx-2">
                              now!
                            </span>{" "}
                          </>
                        )}
                      {(mintTitle === "conflux" ||
                        mintTitle === "gate" ||
                        mintTitle === "doge" ||
                        mintTitle === "base" ||
                        mintTitle === "cmc" ||
                        mintTitle === "skale" ||
                        mintTitle === "core" ||
                        mintTitle === "sei" ||
                        mintTitle === "viction" ||
                        mintTitle === "multiversx" ||
                        mintTitle === "immutable") && (
                        <>
                          Get your {selectedMint.title}{" "}
                          <br className="d-none d-lg-flex" />
                          NFT
                          <span className="marketmintnewtitle-marked mx-2">
                            now!
                          </span>{" "}
                        </>
                      )}
                    </h6>
                    <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-center align-items-lg-start position-relative">
                      <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row align-items-sm-start align-items-center gap-2 w-100 justify-content-center justify-content-xxl-between  justify-content-xl-between  justify-content-lg-between ">
                        <div className="mint-benefits-grid">
                          {benefits.map((item) => (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={require(`../../../components/TimepieceMint/assets/${item.icon}.png`)}
                                alt=""
                                style={{
                                  scale: item.icon === "expand" ? "0.8" : "1",
                                }}
                              />
                              <span className="mint-benefits-title">
                                {item.title}
                              </span>
                            </div>
                          ))}

                          {
                            // mintTitle === "base" ? (
                            //   <div className="d-flex align-items-center gap-2">
                            //     <img
                            //       src={blockChainIcon}
                            //       width={32}
                            //       height={32}
                            //       alt=""
                            //     />
                            //     <span className="mint-benefits-title">
                            //       Minting is available on Base Network
                            //     </span>
                            //   </div>
                            // ) :
                            mintTitle === "coin98" ? (
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={blockChainIcon}
                                  width={32}
                                  height={32}
                                  alt=""
                                />
                                <span className="mint-benefits-title">
                                  Minting is available on BNB Chain
                                </span>
                              </div>
                            ) : null
                          }
                        </div>
                        {mintTitle === "coingecko" && (
                          <div className="position-relative">
                            <img src={pinkArea} alt="" />
                          </div>
                        )}
                        {mintTitle === "gate" && (
                          <div className="position-relative">
                            <img src={pinkAreaConflux} alt="" />
                          </div>
                        )}
                        {mintTitle === "conflux" && (
                          <div className="position-relative">
                            <img src={pinkAreaConflux} alt="" />
                          </div>
                        )}
                        {(mintTitle === "base" ||
                          mintTitle === "skale" ||
                          mintTitle === "sei" ||
                          mintTitle === "core" ||
                          mintTitle === "viction" ||
                          mintTitle === "multiversx" ||
                          mintTitle === "immutable") && (
                          <div className="position-relative">
                            <img src={pinkAreaBase} alt="" />
                          </div>
                        )}
                        {mintTitle === "cmc" && (
                          <div className="position-relative">
                            <img src={pinkAreaCmc} alt="" />
                          </div>
                        )}
                        {mintTitle === "doge" && (
                          <div className="position-relative">
                            <img src={pinkAreaDoge} alt="" />
                          </div>
                        )}
                      </div>
                      {/* <img
                        src={
                          mintTitle === "avalanche"
                            ? avaxMobileBg
                            : mintTitle === "base"
                            ? baseMobileBg
                            : mintTitle === "coin98"
                            ? coin98MobileBg
                            : null
                        }
                        className="smaillmintbg d-block d-xl-none d-xxl-none d-lg-none"
                        alt=""
                      /> */}
                      {/* {mintTitle === "coingecko" && (
                        <a
                          className={`btn coingecko-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                          href="https://www.coingecko.com/account/rewards/worldofdypians-nft"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={coingecko}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                          Get Beta Pass
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                        </a>
                      )} */}

                      {/* {mintTitle === "gate" && (
                        <a
                          className={`btn gate-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                          href="https://sweepwidget.com/c/world-of-dypians-nft-giveaway"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Enter the Giveaway
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                        </a>
                      )} */}

                      {/* {mintTitle === "base" && isBaseActive === true && (
                        <a
                          className={`btn base-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                          target="_blank"
                          rel="noreferrer"
                          href="https://sweepwidget.com/c/world-of-dypians-base-nft-giveaway"
                        >
                          Base Giveaway
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />
                        </a>
                      )} */}

                      {/* {mintTitle === "skale" && isSkaleLive === true ? (
                        <a
                          className={`btn cmc-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                          href="https://sweepwidget.com/c/79449-18gusx9f"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={skaleLogo} alt="" /> SKALE Giveaway
                          <img src={arrowRight} alt="" />
                        </a>
                      ) : mintTitle === "skale" && isSkaleLive === false ? (
                        <span
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img src={skaleLogo} alt="" /> Coming Soon
                          <Countdown
                            date={skaleLiveDay}
                            renderer={renderer}
                            onComplete={() => {
                              setisSkaleLive(true);
                            }}
                          />
                        </span>
                      ) : (
                        <></>
                      )} */}
                      {/* {mintTitle === "doge" && (
                        <a
                          className="btn doge-button mt-3 d-flex align-items-center gap-2 p-2"
                          href="https://sweepwidget.com/c/dogecoin-beta-pass-nft-giveaway"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={dogeLogo} alt="" />
                          Dogecoin Giveaway
                          <img src={rightArrow} alt="" />
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    mintTitle === "coingecko" ||
                    mintTitle === "conflux" ||
                    mintTitle === "gate" ||
                    mintTitle === "doge" ||
                    mintTitle === "base" ||
                    mintTitle === "cmc" ||
                    mintTitle === "skale" ||
                    mintTitle === "sei" ||
                    mintTitle === "core" ||
                    mintTitle === "viction" ||
                    mintTitle === "multiversx" ||
                    mintTitle === "immutable"
                      ? "col-12 col-md-12 col-xxl-5 mt-0 px-0 px-lg-2"
                      : "col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2"
                  }
                >
                  {mintTitle !== "coingecko" &&
                  mintTitle !== "conflux" &&
                  mintTitle !== "doge" &&
                  mintTitle !== "gate" &&
                  mintTitle !== "base" &&
                  mintTitle !== "cmc" &&
                  mintTitle !== "skale" &&
                  mintTitle !== "core" &&
                  mintTitle !== "sei" &&
                  mintTitle !== "viction" &&
                  mintTitle !== "multiversx" &&
                  mintTitle !== "immutable" ? (
                    <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                      <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                        <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                          <span className="land-name">
                            Mint your NFT{" "}
                            {/* <span
                          className="addr-text"
                          style={{ color: "rgb(123, 216, 176)" }}
                        >
                          {cawsArray.length}
                        </span> */}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex mt-0 flex-column flex-lg-row align-items-start gap-2 justify-content-center justify-content-xxl-between justify-content-lg-between justify-content-md-between">
                        <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                          <span className="land-name">Name</span>
                          <div
                            className="borderText borderText2"
                            style={{ width: "100%" }}
                          >
                            <h6
                              className="land-placeholder mb-0"
                              style={{ marginLeft: 11 }}
                            >
                              {nftName === "" ? "" : selectedMint.title}
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                          <span className="land-name">Latest Mint</span>
                          <h6
                            className="land-placeholder borderText"
                            style={{
                              fontSize: "12px",
                              paddingLeft: 14,
                              lineHeight: "40px",
                            }}
                          >
                            # {latestMintId}
                          </h6>
                        </div>
                      </div>
                      <hr className="mint-divider m-0" />
                      <div className="d-flex align-items-center justify-content-between position-relative gap-3">
                        <div className="input-container position-relative col-8 col-lg-6">
                          <input
                            type="number"
                            placeholder="Nr. of CAWS Timepiece NFT to create"
                            max={cawsArray.length}
                            min={1}
                            className="land-input w-100"
                            value={parseInt(nftCount)}
                            onChange={(e) =>
                              setNftCount(parseInt(e.target.value))
                            }
                          />
                        </div>

                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={
                              nftCount > 1 &&
                              isConnected === true &&
                              activeButton === true &&
                              status === ""
                                ? subtractActive
                                : subtractInactive
                            }
                            alt="subtract"
                            onClick={subtractNft}
                            style={{
                              cursor:
                                isConnected === true && activeButton === true
                                  ? "pointer"
                                  : "default",
                              pointerEvents:
                                isConnected === true &&
                                activeButton === true &&
                                status === ""
                                  ? "auto"
                                  : "none",
                            }}
                          />
                          <img
                            src={
                              nftCount < cawsArray.length &&
                              nftCount >= 1 &&
                              isConnected === true &&
                              activeButton === true &&
                              status === ""
                                ? addActive
                                : addInactive
                            }
                            alt="add"
                            onClick={addNft}
                            style={{
                              cursor:
                                isConnected === true && activeButton === true
                                  ? "pointer"
                                  : "default",
                              pointerEvents:
                                isConnected === true &&
                                activeButton === true &&
                                status === ""
                                  ? "auto"
                                  : "none",
                            }}
                          />
                        </div>
                      </div>
                      {mintTitle === "timepiece" ? (
                        <span
                          className="limit-span position-relative"
                          style={{
                            color: nftStatus.includes("Exceeded")
                              ? "#D87B7B"
                              : "#FFFFFF",
                            bottom: "auto",
                          }}
                        >
                          {nftStatus}
                        </span>
                      ) : mintTitle === "conflux" ? (
                        <span
                          className="limit-span position-relative d-flex align-items-center gap-2"
                          style={{ bottom: "0px" }}
                        >
                          Available only on Conflux Network
                          <img src={confluxLogo} alt="" />
                        </span>
                      ) : mintTitle === "base" ? (
                        <span
                          className="limit-span position-relative d-flex align-items-center gap-2"
                          style={{ bottom: "0px" }}
                        >
                          Available only on Base Network
                          <img src={baseLogo} alt="" />
                        </span>
                      ) : mintTitle === "coin98" ||
                        mintTitle === "coingecko" ? (
                        <span
                          className="limit-span position-relative d-flex align-items-center gap-2"
                          style={{ bottom: "0px" }}
                        >
                          Available only on BNB Chain
                          <img src={bnbLogo} alt="" />
                        </span>
                      ) : null}
                      <hr className="mint-divider m-0" />
                      {/* {cawsArray.length > 0 && nftCount > 0 && (
            <span className="land-name">
              Number of CAWS NFTs left after minting:{" "}
              <span
                className="addr-text"
                style={{ color: "rgb(123, 216, 176)" }}
              >
                {cawsArray.length - nftCount}
              </span>
            </span>
          )}  */}
                      {mintStatus.length > 0 && (
                        <span
                          style={{ color: textColor }}
                          className={
                            mintStatus.includes("Success")
                              ? "mint-span-success"
                              : "mint-span"
                          }
                        >
                          {mintStatus}
                        </span>
                      )}
                      <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between">
                        <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center justify-content-xxl-end justify-content-lg-end justify-content-center w-100">
                          <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
                            <div
                              className={
                                (isConnected === true && chainId !== 56) ||
                                (status !== "Connect your wallet." &&
                                  status !== "") ||
                                mintloading === "error"
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <button
                                className={`btn ${
                                  mintloading === "error"
                                    ? "filled-error-btn"
                                    : status !== "Connect your wallet." &&
                                      status !== ""
                                    ? "outline-btn-disabled"
                                    : "filled-btn"
                                }  px-4 w-100`}
                                onClick={() => {
                                  isConnected === true && chainId === 56
                                    ? handleCreate()
                                    : showWalletConnect();
                                }}
                                disabled={
                                  mintloading === "error" ||
                                  mintloading === "success" ||
                                  (status !== "Connect your wallet." &&
                                    status !== "")
                                    ? true
                                    : false
                                }
                                onMouseEnter={() => {
                                  setMouseOver(true);
                                }}
                                onMouseLeave={() => {
                                  setMouseOver(false);
                                }}
                              >
                                {(isConnected === false || chainId !== 56) && (
                                  <img
                                    src={
                                      mouseOver === false
                                        ? blackWallet
                                        : whitewallet
                                    }
                                    alt=""
                                    style={{ width: "23px", height: "23px" }}
                                  />
                                )}{" "}
                                {mintloading === "initial" &&
                                isConnected === true &&
                                chainId === 56 ? (
                                  "Mint"
                                ) : mintloading === "mint" &&
                                  isConnected === true &&
                                  chainId === 56 ? (
                                  <>
                                    <div
                                      className="spinner-border "
                                      role="status"
                                    ></div>
                                  </>
                                ) : mintloading === "error" &&
                                  isConnected === true &&
                                  chainId === 56 ? (
                                  "Failed"
                                ) : mintloading === "success" &&
                                  isConnected === true &&
                                  activeButton ===
                                    (isConnected === true && chainId === 56) ? (
                                  "Success"
                                ) : isConnected === true && chainId !== 56 ? (
                                  " Switch Chain"
                                ) : (
                                  "Connect wallet"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`  justify-content-start
                     mint-wrappernew d-flex flex-column staking-height gap-4 gap-lg-2`}
                    >
                      {!alreadyRegistered &&
                        (mintTitle === "core" ||
                          mintTitle === "viction" ||
                          mintTitle === "sei" ||
                          mintTitle === "immutable" ||
                          mintTitle === "multiversx") && (
                          <div className="d-flex align-items-center justify-content-around gap-2">
                            <button
                              className={
                                activeTab === "create"
                                  ? "land-name2-active w-100"
                                  : "land-name2-passive w-100"
                              }
                              onClick={() => {
                                setactiveTab("create");
                              }}
                            >
                              Create Account
                            </button>
                            <button
                              className={
                                activeTab === "login"
                                  ? "land-name2-active w-100"
                                  : "land-name2-passive w-100"
                              }
                              onClick={() => {
                                setactiveTab("login");
                              }}
                            >
                              Sign in
                            </button>
                          </div>
                        )}

                      <div className="p-4 d-flex flex-column gap-3 h-100">
                        {mintTitle === "coingecko" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  CoinGecko Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="coingecko-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2">
                                    <img src={coingecko} alt="" />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        CoinGecko
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $10,000 in BNB rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        ${getFormattedNumber(userEarnUsd, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Sep. 25, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Dec. 24, 2023
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/treasure-hunt">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily BNB rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}
                        {mintTitle === "conflux" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  Conflux Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="conflux-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2">
                                    <img src={conflux} alt="" />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        Conflux
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $2,000 in CFX rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        $
                                        {getFormattedNumber(
                                          userEarnUsdConflux,
                                          2
                                        )}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Oct. 06, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Nov. 06, 2023
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/past">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily CFX rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}
                        {mintTitle === "gate" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  Gate Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="gate-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img
                                      src={gateWallet}
                                      width={32}
                                      height={32}
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        Gate
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $2,000 in BNB rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        $
                                        {getFormattedNumber(userEarnUsdGate, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Oct. 20, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Nov. 20, 2023
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/past">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily BNB rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}

                        {mintTitle === "doge" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  Dogecoin Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="doge-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img
                                      src={dogeLogo}
                                      width={32}
                                      height={32}
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        Dogecoin
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $10,000 in DOGE rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        ${getFormattedNumber(dogeEarnUSD, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Dec. 22, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Apr. 02, 2024
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/treasure-hunt">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily ETH rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}

                        {mintTitle === "base" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  Base Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="base-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img
                                      src={baseLogo}
                                      width={32}
                                      height={32}
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        Base
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $10,000 in ETH rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        ${getFormattedNumber(baseEarnUSD, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Nov. 01, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Feb. 01, 2024
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/past">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily ETH rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}

                        {mintTitle === "cmc" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  CoinMarketCap Treasure Hunt
                                </h6>{" "}
                                {/* <div
                                  className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <div
                                    class="pulsatingDot"
                                    style={{
                                      width: 7,
                                      height: 7,
                                      marginRight: 5,
                                    }}
                                  ></div>

                                  <span>Live</span>
                                </div> */}
                                <div
                                  className={`position-relative  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <span>Expired</span>
                                </div>
                              </div>
                              <div className="cmc-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img
                                      src={cmc}
                                      width={32}
                                      height={32}
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        CoinMarketCap
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $20,000 in BNB rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        ${getFormattedNumber(cmcEarnUSD, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Dec. 26, 2023
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Apr. 11, 2024
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/treasure-hunt">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily ETH rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}
                        {mintTitle === "skale" && (
                          <div className="">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center position-relative gap-2">
                                <h6 className="coingecko-eventh6 m-0">
                                  SKALE Treasure Hunt
                                </h6>{" "}
                                <div
                                  className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                  style={{ top: 0 }}
                                >
                                  <div
                                    class="pulsatingDot"
                                    style={{
                                      width: 7,
                                      height: 7,
                                      marginRight: 5,
                                    }}
                                  ></div>

                                  <span>Live</span>
                                </div>
                              </div>
                              <div className="skl-eventwrapper p-3">
                                <div className="d-flex flex-column gap-4">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img
                                      src={skaleLogo}
                                      width={32}
                                      height={32}
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-1">
                                      <span className="coingecko-eventname">
                                        SKALE
                                      </span>
                                      <span className="coingecko-eventusd">
                                        $20,000 in SKL rewards
                                      </span>
                                    </div>
                                  </div>

                                  <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                    <div
                                      className="mybetaearnings position-relative m-0"
                                      style={{ top: 0, bottom: 0 }}
                                    >
                                      <h6 className="event-my-earnings3 mb-3">
                                        ${getFormattedNumber(skaleEarnUsd, 2)}
                                      </h6>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whitePickaxe} alt="" />
                                        <span class="white-events-text mb-0">
                                          Explore &amp; Mine
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          Start: Apr. 15, 2024
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center">
                                        <img src={whiteCalendar} alt="" />
                                        <span class="white-events-text mb-0">
                                          End: Jul. 14, 2024
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <NavLink to="/marketplace/events/treasure-hunt">
                                      <span className="coingecko-eventdetails">
                                        Event details
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.5 9L7.5 6L4.5 3"
                                          stroke="white"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <span className="footertxt-coingecko">
                                Earn daily SKL rewards and global leaderboard
                                points.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* <h6
                      className="land-placeholder mb-0"
                      style={{ marginLeft: 11 }}
                    >
                      The Beta Pass NFTs are available on CoinGecko Candy
                      Program.
                    </h6>
                    <div className="coingeckonft-wrapper p-3">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1 className="coingecko-nft-number m-0">5,000</h1>
                        <span className="coingecko-nft-desc">
                          Beta Pass NFTs
                        </span>
                      </div>
                    </div>
                    <hr className="mint-divider mt-2 mb-2" />
                    <div className={"linear-border mx-auto"}>
                      <button className={`btn filled-btn px-5 w-auto`}>
                        Get Beta Pass
                      </button>
                    </div> */}

                        {alreadyRegistered &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei") && (
                            <h6 className="land-name">
                              {(mintTitle === "core" && totalCoreNft > 0) ||
                              (mintTitle === "sei" && totalseiNft > 0) ||
                              (mintTitle === "viction" &&
                                totalVictionNft > 0) ||
                              (mintTitle === "immutable" &&
                                totalImmutableNft > 0) ||
                              (mintTitle === "multiversx" &&
                                totalMultiversNft > 0)
                                ? "My NFT"
                                : "Registered"}{" "}
                            </h6>
                          )}
                        {/* {mintTitle === "doge" && (
                          <h6 className="land-name">
                            {mintTitle === "doge" && totalDogeNft > 0
                              ? "My NFT"
                              : "Registered"}{" "}
                          </h6>
                        )} */}
                        {!alreadyRegistered &&
                          activeTab === "create" &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei" ||
                            mintTitle === "multiversx" ||
                            mintTitle === "immutable") && (
                            <div>
                              <ul class="timeline m-0 p-0" id="timeline">
                                <li class="col-3 li complete">
                                  <div class="status">
                                    <h4 className="listtext"> Create </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-3 li ${
                                    showVerify && "complete"
                                  } `}
                                >
                                  <div class="status">
                                    <h4 className="listtext"> Verify </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-3 li ${
                                    playerCreation && "complete"
                                  } `}
                                >
                                  <div class="status">
                                    <h4 className="listtext"> Profile </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-2 li ${linkWallet && "complete"}`}
                                  style={{ width: 0 }}
                                >
                                  <div class="status">
                                    <h4
                                      className="listtext"
                                      style={{ width: 0, whiteSpace: "nowrap" }}
                                    >
                                      Link Wallet
                                    </h4>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          )}
                        {playerCreation === false &&
                          !alreadyRegistered &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei" ||
                            mintTitle === "multiversx" ||
                            mintTitle === "immutable") && (
                            <SignUpGecko
                              onSuccessVerify={(value) => {
                                setplayerCreation(value);
                              }}
                              onEmailVerify={(value) => {
                                setEmailVerify(value);
                              }}
                              onShowVerify={(value) => {
                                setShowVerify(value);
                              }}
                              onSuccessLogin={() => {
                                setalreadyRegistered(true);
                                refetchPlayer();
                              }}
                              mintTitle={selectedMint.cardTitle}
                              chainId={chainId}
                              activeTab={activeTab}
                              isExistingUser={() => {
                                setactiveTab("login");
                              }}
                            />
                          )}

                        {playerCreation === true &&
                          linkWallet === false &&
                          !alreadyRegistered &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei" ||
                            mintTitle === "immutable" ||
                            mintTitle === "multiversx") && (
                            <PlayerCreationGecko
                              onSuccessCreation={() => {
                                setLinkWallet(true);
                              }}
                              mintTitle={selectedMint.cardTitle}
                            />
                          )}

                        {linkWallet === true &&
                          !alreadyRegistered &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei" ||
                            mintTitle === "multiversx" ||
                            mintTitle === "immutable") && (
                            <div className="d-flex flex-column gap-4 justify-content-between p-4">
                              <span className={"createplayertxt"}>
                                *Make sure to connect the same wallet address as
                                the one you used for {selectedMint.cardTitle}{" "}
                                Giveaway.
                              </span>
                              <div
                                className="walletconnectBtn w-100"
                                onClick={connectWallet}
                              >
                                <div className="d-flex gap-2 justify-content-between align-items-center">
                                  <div className="d-flex gap-2 align-items-center">
                                    <img src={walletImg} alt="" />
                                    <div className="d-flex flex-column">
                                      <span className="secondTitle">
                                        Connect wallet
                                      </span>

                                      <span className="firsttitle">
                                        Link your wallet
                                      </span>
                                    </div>
                                  </div>
                                  <img src={circleArrow} alt="" />
                                </div>
                              </div>

                              <span className="footertxt-coingecko mt-4">
                                Users who have claimed the{" "}
                                {selectedMint.cardTitle} NFT are required to
                                create a WoD Account to receive the NFT and
                                participate in the exclusive event.
                              </span>

                              <div className="summaryseparator"></div>
                            </div>
                          )}
                        {alreadyRegistered &&
                          (mintTitle === "core" ||
                            mintTitle === "viction" ||
                            mintTitle === "sei" ||
                            mintTitle === "multiversx" ||
                            mintTitle === "immutable") && (
                            <div className="d-flex flex-column justify-content-between h-100">
                              {(mintTitle === "core" && totalCoreNft === 0) ||
                              (mintTitle === "viction" &&
                                totalVictionNft === 0) ||
                              (mintTitle === "sei" && totalseiNft === 0) ||
                              (mintTitle === "multiversx" &&
                                totalMultiversNft === 0) ||
                              (mintTitle === "immutable" &&
                                totalImmutableNft === 0) ? (
                                <div className="col-12 col-lg-6 d-flex flex-column mx-auto position-relative">
                                  <div
                                    className={`coingeckoempty-wrapper conflux-empty d-flex justify-content-center align-items-center p-3 position-relative`}
                                    style={{
                                      height:
                                        windowSize.width > 991 ? 210 : 295,
                                    }}
                                  ></div>
                                  <div
                                    className="genesis-desc nomask px-3 py-2 position-relative"
                                    style={{
                                      bottom: "5px",
                                      minWidth: "100%",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <h6
                                      className="land-desc w-75 m-auto text-center justify-content-center"
                                      style={{ fontWeight: 500, fontSize: 16 }}
                                    >
                                      {selectedMint.cardTitle}
                                    </h6>
                                  </div>
                                </div>
                              ) : (
                                <NavLink
                                  to={`/marketplace/nft/${
                                    mintTitle === "sei"
                                      ? myseiNfts[0]
                                      : mintTitle === "viction"
                                      ? myVictionNfts[0]
                                      : mintTitle === "core"
                                      ? myCoreNfts[0]
                                      : mintTitle === "immutable"
                                      ? myImmutableNfts[0]
                                      : myMultiversNfts[0]
                                  }/${
                                    mintTitle === "sei"
                                      ? window.config.nft_sei_address
                                      : mintTitle === "viction"
                                      ? window.config.nft_viction_address
                                      : mintTitle === "core"
                                      ? window.config.nft_core_address
                                      : mintTitle === "immutable"
                                      ? window.config.nft_immutable_address
                                      : window.config.nft_multivers_address
                                  }`}
                                  onClick={() => {
                                    updateViewCount(
                                      mintTitle === "sei"
                                        ? myseiNfts[0]
                                        : mintTitle === "viction"
                                        ? myVictionNfts[0]
                                        : mintTitle === "core"
                                        ? myCoreNfts[0]
                                        : mintTitle === "immutable"
                                        ? myImmutableNfts[0]
                                        : myMultiversNfts[0],
                                      mintTitle === "sei"
                                        ? window.config.nft_sei_address
                                        : mintTitle === "viction"
                                        ? window.config.nft_viction_address
                                        : mintTitle === "core"
                                        ? window.config.nft_core_address
                                        : mintTitle === "immutable"
                                        ? window.config.nft_immutable_address
                                        : window.config.nft_multivers_address
                                    );
                                  }}
                                >
                                  <div className="col-12 col-lg-5 d-flex flex-column mx-auto position-relative">
                                    <div
                                      className={`coingeckoempty-wrapper  ${
                                        totalseiNft > 0 && mintTitle === "sei"
                                          ? "sei-active"
                                          : totalVictionNft > 0 &&
                                            mintTitle === "viction"
                                          ? "viction-active"
                                          : totalCoreNft > 0 &&
                                            mintTitle === "core"
                                          ? "core-active"
                                          : totalImmutableNft > 0 &&
                                            mintTitle === "immutable"
                                          ? "immutable-active"
                                          : totalMultiversNft > 0 &&
                                            mintTitle === "multiversx"
                                          ? "multivers-active"
                                          : "conflux-empty"
                                      } d-flex justify-content-center align-items-center p-3 position-relative`}
                                      style={{
                                        height:
                                          windowSize.width > 991 ? 210 : 295,
                                      }}
                                    ></div>
                                    <div
                                      className="genesis-desc nomask px-3 py-2 position-relative"
                                      style={{
                                        bottom: "20px",
                                        minWidth: "100%",
                                        maxWidth: "100%",
                                      }}
                                    >
                                      <h6
                                        className="land-desc w-75 m-auto text-center justify-content-center"
                                        style={{
                                          fontWeight: 500,
                                          fontSize: 16,
                                        }}
                                      >
                                        { mintTitle === "sei"
                                        ? 'SEIBP'
                                        : mintTitle === "viction"
                                        ? 'VCBP'
                                        : mintTitle === "core"
                                        ? 'COBP'
                                        : mintTitle === "immutable"
                                        ? 'IMBP'
                                        : 'MVBP'
                                      }
                                         {`#${mintTitle === "sei"
                                        ? myseiNfts[0]
                                        : mintTitle === "viction"
                                        ? myVictionNfts[0]
                                        : mintTitle === "core"
                                        ? myCoreNfts[0]
                                        : mintTitle === "immutable"
                                        ? myImmutableNfts[0]
                                        : myMultiversNfts[0]}`}
                                      </h6>
                                    </div>
                                  </div>
                                </NavLink>
                              )}
                              <span className="footertxt-coingecko">
                                After NFT distribution, you can view{" "}
                                {selectedMint.cardTitle}.
                              </span>
                              <div className="summaryseparator mt-3 mb-3"></div>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div className="opacitywrapper4 m-0">
                                  <a
                                    className="game-event-download text-white  d-flex align-items-center gap-2"
                                    href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                    target="_blank"
                                  >
                                    <img
                                      src={epicwhite}
                                      alt="icon"
                                      className="epicgame2"
                                    />
                                    Download
                                  </a>
                                </div>
                                <NavLink
                                  to="/account"
                                  className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                                >
                                  <img src={user} alt="" className="user2" />
                                  My Account
                                </NavLink>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {mintTitle === "coingecko" && (
                <div
                  className="d-flex align-items-center gap-2 terms-wrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenTerms(true)}
                >
                  <NavLink to="/marketplace/beta-pass/coingecko/terms-conditions">
                    <span className="terms-and-conditions mb-0">
                      Terms & Conditions
                    </span>
                    <img src={termsArrow} alt="" />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenConflux(false)}>
        <div
          className={`popup-wrapper-2 ${
            openConflux && "popup-active"
          } p-4 gap-3 d-flex flex-column align-items-center`}
          id="switch"
        >
          <div className="d-flex align-items-center justify-content-end w-100">
            <img
              src={popupXmark}
              onClick={() => setOpenConflux(false)}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <img src={confluxLogo} width={40} height={40} alt="" />
          <h6 className="switch-network mb-0">Switch Network</h6>
          <span className="switch-network-desc">
            We've detected that you're connected to{" "}
            {chainId === 1
              ? "Ethereum Network"
              : chainId === 56
              ? "BNB Chain"
              : chainId === 43113
              ? "Avalanche"
              : "Base"}
            .
          </span>
          <div className="metamask-info-wrapper mt-2 w-100 d-flex p-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img
                src={
                  window.ethereum &&
                  window.ethereum.isMetaMask &&
                  !window.gatewallet &&
                  !window.coin98
                    ? metamaskIcon
                    : window.coin98
                    ? coin98Wallet
                    : window.ethereum && window.ethereum.isTrust
                    ? trustWallet
                    : window.ethereum && window.ethereum.isCoinbaseWallet
                    ? coinbaseWallet
                    : window.gatewallet
                    ? gateWallet
                    : safepalWallet
                }
                width={32}
                height={32}
                alt=""
              />
              <div className="d-flex flex-column">
                <h6 className="metamask-info-title">
                  {window.ethereum &&
                  window.ethereum.isMetaMask &&
                  !window.gatewallet &&
                  !window.coin98
                    ? "MetaMask Wallet"
                    : window.coin98
                    ? "Coin98 Wallet"
                    : window.ethereum && window.ethereum.isTrust
                    ? "Trustwallet"
                    : window.ethereum && window.ethereum.isCoinbaseWallet
                    ? "Coinbase Wallet"
                    : window.gatewallet
                    ? "Gate Wallet"
                    : "Safepal Wallet"}
                </h6>
                <span className="metamask-short-address mb-0">
                  {shortAddress(coinbase)}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                className="green-dot"
                style={{ width: "5px", height: "5px" }}
              ></div>
              <span className="popup-chain">
                {chainId === 1
                  ? "Ethereum Network"
                  : chainId === 56
                  ? "BNB Chain"
                  : chainId === 43113
                  ? "Avalanche"
                  : "Base"}
              </span>
            </div>
          </div>
          <button
            className="btn switch-network-btn mt-3 d-flex align-items-center gap-2 px-5 py-2"
            onClick={handleConfluxPool}
          >
            <img src={switchIcon} alt="" />
            Switch to Conflux Network
          </button>
        </div>
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setOpenTerms(false)}>
        <div
          className={`popup-wrapper ${
            openTerms && "popup-active"
          } p-4 d-flex flex-column`}
          style={{ borderRadius: "12px" }}
          id="terms"
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6
              className="nft-page-title mb-0"
              style={{ fontSize: "27px", fontWeight: "600" }}
            >
              Terms & Conditions
            </h6>
            <img
              src={popupXmark}
              onClick={() => setOpenTerms(false)}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <ul className="terms-list">
            <li className="collection-desc mb-2 mb-lg-3">
              Users are required to create a game account using the same email
              and BEP20 wallet address as the one used for CoinGecko Candy
              Rewards.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              Users must maintain ownership of the CoinGecko Beta Pass NFT in
              their wallet address at all times in order to access the game and
              its associated benefits.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The CoinGecko Beta Pass NFT eligibility is limited to one per
              wallet.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              All benefits associated with the Beta Pass NFT are transferable if
              the NFT is transferred to another wallet.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              A total of 5,000 CoinGecko Beta Pass NFTs are eligible to be
              redeemed by users.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The redemption period begins on September 18 and concludes once
              all the NFTs have been distributed.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The special event will be available from September 25 to November
              26.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              World of Dypians reserves the right to organise additional events
              in the future for all Beta Pass NFT holders.
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default BetaPassNFT;
