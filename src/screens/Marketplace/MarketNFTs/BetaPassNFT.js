import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import { handleSwitchNetworkhook } from "../../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Account/src/Utils.js/Auth/AuthDetails";
import {
  GENERATE_NONCE,
  GET_PLAYER,
  VERIFY_WALLET,
} from "../../Account/src/Containers/Dashboard/Dashboard.schema";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import getFormattedNumber from "../../Account/src/Utils.js/hooks/get-formatted-number";
// import SignUpGecko from "../../Account/src/Containers/SingUp/SignUpGecko";
// import PlayerCreationGecko from "../../Account/src/Containers/PlayerCreation/PlayerCreationGecko";
 
 

// import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes }) => {
  return (
    <span className="livein-timer">
      {days}d : {hours}h : {minutes}m
    </span>
  );
};

const BetaPassNFT = ({
  isConnected,
  coinbase,
  chainId,
  totalCreated,
  totalBaseNft,
  mintloading,
  showWalletConnect,
  cawsArray,
  textColor,
  mintStatus,
  nftName,
  handleMint,
  handleSwitchNetwork,
  success,
  myBaseNFTs,
  totalseiNft,
  myseiNfts,
  myMatNFTs,
  totalMatNfts,
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
      icon: "userMint",
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
    mainTitle: "Conflux",
  };
  const bnbData = {
    id: "bnb",
    cardTitle: "BNB Chain Beta Pass",
    title: "BNB Chain Beta Pass",
    background: "bnb-mint-bg",
    mainTitle: "BNB Chain",
  };

  const avaxData = {
    id: "avax",
    cardTitle: "Avalanche Beta Pass",
    title: "Avalanche Beta Pass",
    background: "avax-mint-bg",
    mainTitle: "Avalanche",
  };

  const coreData = {
    id: "core",
    cardTitle: "CORE Beta Pass",
    title: "CORE Beta Pass",
    background: "core-mint-bg",
    mainTitle: "CORE",
  };

  const victionData = {
    id: "viction",
    cardTitle: "Viction Beta Pass",
    title: "Viction Beta Pass",
    background: "viction-mint-bg",
    mainTitle: "VICTION",
  };

  const multiversData = {
    id: "multiversx",
    cardTitle: "MultiversX Beta Pass",
    title: "MultiversX Beta Pass",
    background: "multivers-mint-bg",
    mainTitle: "MultiversX",
  };

  const seiData = {
    id: "sei",
    cardTitle: "SEI Beta Pass",
    title: "SEI Beta Pass",
    background: "sei-mint-bg",
    mainTitle: "SEI",
  };
  const matData = {
    id: "mat",
    cardTitle: "Matchain Beta Pass",
    title: "Matchain Beta Pass",
    background: "matchain-mint-bg",
    mainTitle: "Matchain",
  };

  const dogeData = {
    id: "doge",
    cardTitle: "Dogecoin Beta Pass",
    title: "Dogecoin Beta Pass",
    background: "doge-mint-bg2",
    mainTitle: "Dogecoin",
  };

  const cmcData = {
    id: "cmc",
    cardTitle: "CoinMarketCap Beta Pass",
    title: "CoinMarketCap Beta Pass",
    background: "cmc-mint-bg2",
    mainTitle: "CoinMarketCap",
  };

  const coin98Data = {
    id: "coin98",
    cardTitle: "Coin98 Beta Pass",
    title: "Coin98 Beta Pass",
    background: "coin98-mint-bg",
    mainTitle: "Coin98",
  };
  const coingeckoData = {
    id: "coingecko",
    cardTitle: "CoinGecko Beta Pass",
    title: "CoinGecko Beta Pass",
    background: "coingecko-mint-bg",
    mainTitle: "CoinGecko",
  };
  const baseData = {
    id: "base",
    cardTitle: "Base Beta Pass",
    title: "Base Beta Pass",
    background: "base-mint-bg2",
    mainTitle: "our partners",
  };

  const gateData = {
    id: "gate",
    cardTitle: "Gate Beta Pass",
    title: "Gate Beta Pass",
    background: "gate-mint-bg",
    mainTitle: "Gate.io",
  };

  const skaleData = {
    id: "skale",
    cardTitle: "SKALE Beta Pass",
    title: "SKALE Beta Pass",
    background: "skale2-mint-bg",
    mainTitle: "SKALE",
  };

  const mantaData = {
    id: "manta",
    cardTitle: "Manta Beta Pass",
    title: "Manta Beta Pass",
    background: "manta-mint-bg",
    mainTitle: "Manta Network",
  };
  const taikoData = {
    id: "taiko",
    cardTitle: "Taiko Beta Pass",
    title: "Taiko Beta Pass",
    background: "taiko-mint-bg",
    mainTitle: "Taiko Network",
  };

  const cookie3Data = {
    id: "cookie3",
    cardTitle: "Cookie3 Beta Pass",
    title: "Cookie3 Beta Pass",
    background: "cookie3-mint-bg",
    mainTitle: "Cookie3",
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
  const [selectedMint, setSelectedMint] = useState(mantaData);
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
  const [bnbEarnUSD, setbnbEarnUSD] = useState(0);
  const [seiEarnUsd, setSeiEarnUsd] = useState(0);

  const [coreEarnUsd, setCoreEarnUsd] = useState(0);
  const [multiversEarnUsd, setmultiversEarnUsd] = useState(0);
  const [victionEarnUsd, setVictionEarnUsd] = useState(0);

  const [cmcEarnUSD, setCmcEarnUSD] = useState(0);
  const [skaleEarnUsd, setSkaleEarnUsd] = useState(0);
  const [mantaEarnUsd, setMantaEarnUsd] = useState(0);
  const [taikoEarnUsd, setTaikoEarnUsd] = useState(0);
  const [cookieEarnUsd, setCookieEarnUsd] = useState(0);
  const [matChainEarnUsd, setmatChainEarnUsd] = useState(0);

  const html = document.querySelector("html");
  const bgmenu = document.querySelector("#terms");
  const bgmenu2 = document.querySelector("#switch"); 

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

          const mantaEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "manta";
          });

          const taikoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "taiko";
          });

          const cookieEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "cookie3";
          });
          const matEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "matchain";
          });
          const seiEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "sei";
          });
          if (coingeckoEvent && coingeckoEvent[0]) {
            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;
            setuserEarnUsd(usdValue);
          }

          if (seiEvent && seiEvent[0]) {
            const userEarnedusd =
              seiEvent[0].reward.earn.total /
              seiEvent[0].reward.earn.multiplier;
            setSeiEarnUsd(userEarnedusd);
          }

          if (cmcEvent && cmcEvent[0]) {
            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;
            setCmcEarnUSD(usdValue);
          }
          if (matEvent && matEvent[0]) {
            const userEarnedusd =
              matEvent[0].reward.earn.total /
              matEvent[0].reward.earn.multiplier;

            setmatChainEarnUsd(userEarnedusd);
          }

          if (bnbEvent && bnbEvent[0]) {
            const userEarnedusd =
              bnbEvent[0].reward.earn.total /
              bnbEvent[0].reward.earn.multiplier;

            setbnbEarnUSD(userEarnedusd);
          }

          if (coreEvent && coreEvent[0]) {
            const userEarnedusd =
              coreEvent[0].reward.earn.total /
              coreEvent[0].reward.earn.multiplier;

            setCoreEarnUsd(userEarnedusd);
          }

          if (victionEvent && victionEvent[0]) {
            const userEarnedusd =
              victionEvent[0].reward.earn.total /
              victionEvent[0].reward.earn.multiplier;

            setVictionEarnUsd(userEarnedusd);
          }

          if (multiversEvent && multiversEvent[0]) {
            const userEarnedusd =
              multiversEvent[0].reward.earn.total /
              multiversEvent[0].reward.earn.multiplier;

            setmultiversEarnUsd(userEarnedusd);
          }

          if (skaleEvent && skaleEvent[0]) {
            const usdValue =
              skaleEvent[0].reward.earn.total /
              skaleEvent[0].reward.earn.multiplier;
            setSkaleEarnUsd(usdValue);
          }

          if (mantaEvent && mantaEvent[0]) {
            const usdValue =
              mantaEvent[0].reward.earn.total /
              mantaEvent[0].reward.earn.multiplier;
            setMantaEarnUsd(usdValue);
          }

          if (taikoEvent && taikoEvent[0]) {
            const usdValue =
              taikoEvent[0].reward.earn.total /
              taikoEvent[0].reward.earn.multiplier;
            setTaikoEarnUsd(usdValue);
          }

          if (cookieEvent && cookieEvent[0]) {
            const usdValue =
              cookieEvent[0].reward.earn.total /
              cookieEvent[0].reward.earn.multiplier;
            setCookieEarnUsd(usdValue);
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

  const handleFirstTask = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/olympiad/task1/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
  };

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
        // handleFirstTask(coinbase);
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
    } else if (locationState.includes("/beta-pass/bnb")) {
      setSelectedMint(bnbData);
      setMintTitle("bnb");
    } else if (locationState.includes("/beta-pass/manta")) {
      setSelectedMint(mantaData);
      setMintTitle("manta");
    } else if (locationState.includes("/beta-pass/taiko")) {
      setSelectedMint(taikoData);
      setMintTitle("taiko");
    } else if (locationState.includes("/beta-pass/cookie3")) {
      setSelectedMint(cookie3Data);
      setMintTitle("cookie3");
    } else if (locationState.includes("/beta-pass/matchain")) {
      setSelectedMint(matData);
      setMintTitle("mat");
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
          className="container-fluid d-flex justify-content-end p-0 mt-lg-5 pt-lg-5 "
          style={{ minHeight: "72vh", maxWidth: "2400px" }}
        >
          {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

          <div
            className="container-nft2 d-flex  align-items-start px-3 px-lg-5 position-relative"
            style={{ backgroundSize: "cover" }}
          >
            <div className="custom-container mx-0 position-relative">
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
                        : mintTitle === "cookie3"
                        ? "Cookie3"
                        : mintTitle === "cmc"
                        ? "CoinMarketCap"
                        : mintTitle === "bnb"
                        ? "BNB Chain"
                        : mintTitle === "manta"
                        ? "Manta"
                        : mintTitle === "taiko"
                        ? "Taiko"
                        : mintTitle === "mat"
                        ? "Matchain"
                        : mintTitle}{" "}
                      Beta Pass
                    </h6>
                    {mintTitle !== "doge" ? (
                      <p className="collection-desc">
                        The Beta Pass NFT provides you with a special ticket to
                        enter the metaverse and participate in an exclusive
                        event hosted by {selectedMint.mainTitle}.{" "}
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
                   
                  </div>
                </div>
                <div className="col-12 col-lg-4 px-0">
                  <img
                    src={
                      mintTitle === "avalanche"
                        ? "https://cdn.worldofdypians.com/wod/avaxBetaBanner.png"
                        : mintTitle === "coingecko"
                        ? "https://cdn.worldofdypians.com/wod/coingeckoBetaBanner.png"
                        : mintTitle === "conflux"
                        ? "https://cdn.worldofdypians.com/wod/confluxBetaBanner.png"
                        : mintTitle === "gate"
                        ? "https://cdn.worldofdypians.com/wod/gateBetaBanner.png"
                        : mintTitle === "coin98"
                        ? "https://cdn.worldofdypians.com/wod/coin98BetaBanner.png"
                        : mintTitle === "base"
                        ? "https://cdn.worldofdypians.com/wod/baseBetaBanner.png"
                        : mintTitle === "doge"
                        ? "https://cdn.worldofdypians.com/wod/dogeBetaBanner.png"
                        : mintTitle === "cmc"
                        ? "https://cdn.worldofdypians.com/wod/cmcBetaBanner.webp"
                        : mintTitle === "skale"
                        ? "https://cdn.worldofdypians.com/wod/skaleBetaBanner.webp"
                        : mintTitle === "viction"
                        ? "https://cdn.worldofdypians.com/wod/victionBanner.webp"
                        : mintTitle === "multiversx"
                        ? "https://cdn.worldofdypians.com/wod/multiversBanner.webp"
                        : mintTitle === "core"
                        ? "https://cdn.worldofdypians.com/wod/coreBanner.webp"
                        : mintTitle === "sei"
                        ? "https://cdn.worldofdypians.com/wod/seiBanner.webp"
                        : mintTitle === "mat"
                        ? "https://cdn.worldofdypians.com/wod/matchainBetaBanner.webp"
                        : mintTitle === "bnb"
                        ? "https://cdn.worldofdypians.com/wod/bnbBetaBanner.png"
                        : mintTitle === "manta"
                        ? "https://cdn.worldofdypians.com/wod/mantaBanner.webp"
                        : mintTitle === "taiko"
                        ? "https://cdn.worldofdypians.com/wod/taikoBanner.webp"
                        : mintTitle === "cookie3"
                        ? "https://cdn.worldofdypians.com/wod/cookie3BetaBanner.webp"
                        : "https://cdn.worldofdypians.com/wod/betaPassBanner.png"
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
                {windowSize.width > 991 ? (
                  <>
                    <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                      <NavLink
                        to={"/shop/beta-pass/base"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Base</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/matchain"}
                        className={`${
                          location.pathname.includes("matchain") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(matData);
                          setMintTitle("mat");
                        }}
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Matchain</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/cookie3"}
                        className={`${
                          location.pathname.includes("cookie3") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(cookie3Data);
                          setMintTitle("cookie3");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/cookie3.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Cookie3</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/taiko"}
                        className={`${
                          location.pathname.includes("taiko") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(taikoData);
                          setMintTitle("taiko");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Taiko</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/manta"}
                        className={`${
                          location.pathname.includes("manta") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(mantaData);
                          setMintTitle("manta");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/manta.png"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Manta</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/bnb"}
                        className={`${
                          location.pathname.includes("bnb") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(bnbData);
                          setMintTitle("bnb");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>BNB</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/core"}
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
                          src={"https://cdn.worldofdypians.com/wod/core.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>CORE</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/multiversx"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/multiversx.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>MultiversX</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/sei"}
                        className={`${
                          location.pathname.includes("sei") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(seiData);
                          setMintTitle("sei");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>SEI</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/viction"}
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
                          src={"https://cdn.worldofdypians.com/wod/viction.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>VICTION</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/skale"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>SKALE</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/coinmarketcap"}
                        className={`${
                          location.pathname.includes("coinmarketcap") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(cmcData);
                          setMintTitle("cmc");
                        }}
                      >
                        <img
                          src={"https://cdn.worldofdypians.com/wod/cmcIcon.svg"}
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>CoinMarketCap</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/doge"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Dogecoin</span>
                      </NavLink>

                      <NavLink
                        to={"/shop/beta-pass/coingecko"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>CoinGecko</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/gate"}
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
                          src={
                            "https://cdn.worldofdypians.com/wod/gateIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Gate</span>
                      </NavLink>
                      <NavLink
                        to={"/shop/beta-pass/conflux"}
                        className={`${
                          location.pathname.includes("conflux") &&
                          "selected-beta-pass-item"
                        } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                        onClick={() => {
                          setSelectedMint(confluxData);
                          setMintTitle("conflux");
                        }}
                      >
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                          }
                          className="beta-pass-chain-img"
                          alt=""
                        />
                        <span>Conflux</span>
                      </NavLink>
                      {/* <NavLink
                    to={"/shop/beta-pass/coin98"}
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
                  </>
                ) : (
                  <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                    <NavLink
                      to={"/shop/beta-pass/base"}
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
                        src={
                          "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Base</span>
                    </NavLink>

                    <NavLink
                      to={"/shop/beta-pass/matchain"}
                      className={`${
                        location.pathname.includes("matchain") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(matData);
                        setMintTitle("mat");
                      }}
                    >
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Matchain</span>
                    </NavLink>

                    <NavLink
                      to={"/shop/beta-pass/cookie3"}
                      className={`${
                        location.pathname.includes("cookie3") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(cookie3Data);
                        setMintTitle("cookie3");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/cookie3.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Cookie3</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/taiko"}
                      className={`${
                        location.pathname.includes("taiko") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(taikoData);
                        setMintTitle("taiko");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Taiko</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/manta"}
                      className={`${
                        location.pathname.includes("manta") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(mantaData);
                        setMintTitle("manta");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/manta.png"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Manta</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/bnb"}
                      className={`${
                        location.pathname.includes("bnb") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(bnbData);
                        setMintTitle("bnb");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>BNB</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/core"}
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
                        src={"https://cdn.worldofdypians.com/wod/core.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>CORE</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/multiversx"}
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
                        src={
                          "https://cdn.worldofdypians.com/wod/multiversx.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>MultiversX</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/sei"}
                      className={`${
                        location.pathname.includes("sei") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(seiData);
                        setMintTitle("sei");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>SEI</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/viction"}
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
                        src={"https://cdn.worldofdypians.com/wod/viction.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>VICTION</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/skale"}
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
                        src={"https://cdn.worldofdypians.com/wod/skaleIcon.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>SKALE</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/coinmarketcap"}
                      className={`${
                        location.pathname.includes("coinmarketcap") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(cmcData);
                        setMintTitle("cmc");
                      }}
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/cmcIcon.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>CoinMarketCap</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/doge"}
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
                        src={
                          "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Dogecoin</span>
                    </NavLink>

                    <NavLink
                      to={"/shop/beta-pass/coingecko"}
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
                        src={
                          "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>CoinGecko</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/gate"}
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
                        src={"https://cdn.worldofdypians.com/wod/gateIcon.svg"}
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Gate</span>
                    </NavLink>
                    <NavLink
                      to={"/shop/beta-pass/conflux"}
                      className={`${
                        location.pathname.includes("conflux") &&
                        "selected-beta-pass-item"
                      } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                      onClick={() => {
                        setSelectedMint(confluxData);
                        setMintTitle("conflux");
                      }}
                    >
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                        }
                        className="beta-pass-chain-img"
                        alt=""
                      />
                      <span>Conflux</span>
                    </NavLink>
                  </div>
                )}
              </div>

              <div className=" nft-page-wrapper d-flex flex-column flex-xxl-row gap-3 mb-3">
                <div
                  className={"col-12 col-md-12 col-xxl-7 mt-0 px-0"}
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

                      {(mintTitle === "conflux" ||
                        mintTitle === "gate" ||
                        mintTitle === "doge" ||
                        mintTitle === "cookie3" ||
                        mintTitle === "base" ||
                        mintTitle === "cmc" ||
                        mintTitle === "skale" ||
                        mintTitle === "core" ||
                        mintTitle === "manta" ||
                        mintTitle === "taiko" ||
                        mintTitle === "bnb" ||
                        mintTitle === "sei" ||
                        mintTitle === "viction" ||
                        mintTitle === "multiversx" ||
                        mintTitle === "mat") && (
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
                                src={`https://cdn.worldofdypians.com/wod/${item.icon}.png`}
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
                        </div>
                        {mintTitle === "coingecko" && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkArea.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {mintTitle === "gate" && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkAreaConflux.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {mintTitle === "conflux" && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkAreaConflux.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {(mintTitle === "base" ||
                          mintTitle === "skale" ||
                          mintTitle === "sei" ||
                          mintTitle === "core" ||
                          mintTitle === "viction" ||
                          mintTitle === "multiversx" ||
                          mintTitle === "mat") && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkAreaBase.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {mintTitle === "cmc" && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkAreaCmc.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {mintTitle === "doge" && (
                          <div className="position-relative">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/pinkAreaDoge.svg"
                              }
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                      {mintTitle === "sei" && (
                        <span
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                            }
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />{" "}
                          Coming Soon
                        </span>
                      )}
                      {mintTitle === "base" && (
                        <span
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg"
                            }
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />{" "}
                          Coming Soon
                        </span>
                      )}
                      {mintTitle === "mat" && (
                        <span
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                            }
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />{" "}
                          Coming Soon
                        </span>
                      )}

                      {/* {mintTitle === "taiko" && (
                        <a
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                          href="https://sweepwidget.com/c/taiko-wod-giveaway"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={taikoLogo}
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />{" "}
                          Taiko Giveaway
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className={"col-12 col-md-12 col-xxl-5 mt-0 px-0 px-lg-2"}>
                  <div
                    className={`  justify-content-start
                     mint-wrappernew d-flex flex-column staking-height gap-4 gap-lg-2`}
                  >
                    {/* {!alreadyRegistered &&
                        (mintTitle === "sei") && (
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
                        )} */}

                    <div className="p-4 d-flex flex-column gap-3 h-100">
                      {mintTitle === "coingecko" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                CoinGecko Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="coingecko-eventwrapper p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg"
                                    }
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      CoinGecko
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
                                      ${getFormattedNumber(userEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 03, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 03, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className=" text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                                    }
                                    alt=""
                                  />
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
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Oct. 06, 2023
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Nov. 06, 2023
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className=" text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                    src={
                                      "https://cdn.worldofdypians.com/wod/gateIcon.svg"
                                    }
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
                                      ${getFormattedNumber(userEarnUsdGate, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Oct. 20, 2023
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Nov. 20, 2023
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className=" text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                    src={
                                      "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg"
                                    }
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
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 22, 2023
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 02, 2024
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily DOGE rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}
                      {mintTitle === "bnb" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                BNB Chain Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="bnb-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      BNB Chain
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
                                      ${getFormattedNumber(bnbEarnUSD, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 04, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 04, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}
                      {mintTitle === "mat" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                Matchain Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="mat-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Matchain
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
                                      ${getFormattedNumber(matChainEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 04, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 04, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}
                      {mintTitle === "sei" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                SEI Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="sei-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      SEI
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in SEI rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(seiEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 05, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 05, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily SEI rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}

                      {mintTitle === "core" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                CORE Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="core-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/core.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      CORE
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in CORE rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(coreEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 04, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 04, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily CORE rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}
                      {mintTitle === "viction" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                Viction Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="viction-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/viction.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Viction
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in VIC rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(victionEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Nov. 29, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Mar. 29, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily VIC rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}
                      {mintTitle === "multiversx" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                MultiversX Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-upcoming px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                {/* <div
                                    className="pulsatingDot"
                                    style={{
                                      width: 7,
                                      height: 7,
                                      marginRight: 5,
                                    }}
                                  ></div> */}

                                <span>Coming Soon</span>
                              </div>
                            </div>
                            <div className="multivers-eventwrapper  p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/multiversx.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      MultiversX
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in EGLD rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(multiversEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Coming Soon
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Coming Soon
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily EGLD rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="base-eventwrapper p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Base
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in ETH rewards
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
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Oct. 07, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Feb. 18, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                    className="pulsatingDot"
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
                                    src={
                                      "https://cdn.worldofdypians.com/wod/cmcIcon.svg"
                                    }
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
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 26, 2023
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 11, 2024
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                                  className="pulsatingDot"
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
                                    src={
                                      "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                                    }
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
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 03, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 03, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}

                      {mintTitle === "manta" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                Manta Treasure Hunt
                              </h6>{" "}
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="manta-eventwrapper p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/manta.png"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Manta
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in Manta rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(mantaEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 05, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 05, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily Manta rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}

                      {mintTitle === "taiko" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                Taiko Treasure Hunt
                              </h6>
                              <div
                                className={`position-relative  events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <div
                                  className="pulsatingDot"
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginRight: 5,
                                  }}
                                ></div>

                                <span>Live</span>
                              </div>
                            </div>
                            <div className="taiko-eventwrapper p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/taiko.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Taiko
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in Taiko rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(taikoEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Dec. 03, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Apr. 03, 2025
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily Taiko rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      )}

                      {mintTitle === "cookie3" && (
                        <div className="">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center position-relative gap-2">
                              <h6 className="coingecko-eventh6 m-0">
                                Cookie3 Treasure Hunt
                              </h6>
                              <div
                                className={`position-relative  events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <span>Expired</span>
                              </div>
                            </div>
                            <div className="cookie-eventwrapper p-3">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-2 align-items-center">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/cookie3.svg"
                                    }
                                    width={32}
                                    height={32}
                                    alt=""
                                  />
                                  <div className="d-flex flex-column gap-1">
                                    <span className="coingecko-eventname">
                                      Cookie3
                                    </span>
                                    <span className="coingecko-eventusd">
                                      $20,000 in COOKIE rewards
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                                  <div
                                    className="mybetaearnings position-relative m-0"
                                    style={{ top: 0, bottom: 0 }}
                                  >
                                    <h6 className="event-my-earnings3 mb-3">
                                      ${getFormattedNumber(cookieEarnUsd, 2)}
                                    </h6>
                                  </div>
                                  <div className="d-flex flex-column gap-2">
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whitePickAxe.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Explore &amp; Mine
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        Start: Aug. 26, 2024
                                      </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                      <img
                                        src={
                                          "https://cdn.worldofdypians.com/wod/whiteCalendar.svg"
                                        }
                                        alt=""
                                      />
                                      <span className="white-events-text mb-0">
                                        End: Nov. 24, 2024
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  <NavLink to="/account/challenges/treasure-hunt">
                                    <span className="coingecko-eventdetails">
                                      Event details
                                    </span>
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/arrowRight.svg"
                                      }
                                      alt=""
                                    />
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <span className="footertxt-coingecko">
                              Earn daily COOKIE rewards and global leaderboard
                              points.
                            </span>
                            <div className="summaryseparator mt-3 mb-3"></div>
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                              <div className="opacitywrapper4 m-0">
                                <a
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/epicwhite.svg"
                                    }
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
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
                    
                    <hr className="mint-divider mt-2 mb-2" />
                    <div className={"linear-border mx-auto"}>
                      <button className={`btn filled-btn px-5 w-auto`}>
                        Get Beta Pass
                      </button>
                    </div> */}

                      {/* {alreadyRegistered && (mintTitle === "sei") && (
                          <h6 className="land-name">
                            {((mintTitle === "sei" && totalseiNft > 0)) 
                              ? "My NFT"
                              : "Registered"}{" "}
                          </h6>
                        )} */}
                      {/* {mintTitle === "doge" && (
                          <h6 className="land-name">
                            {mintTitle === "doge" && totalDogeNft > 0
                              ? "My NFT"
                              : "Registered"}{" "}
                          </h6>
                        )} */}
                      {/* {!alreadyRegistered &&
                          activeTab === "create" &&
                          (mintTitle === "sei" ) && (
                            <div>
                              <ul className="timeline m-0 p-0" id="timeline">
                                <li className="col-3 li complete">
                                  <div className="status">
                                    <h4 className="listtext"> Create </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-3 li ${showVerify && "complete"
                                    } `}
                                >
                                  <div className="status">
                                    <h4 className="listtext"> Verify </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-3 li ${playerCreation && "complete"
                                    } `}
                                >
                                  <div className="status">
                                    <h4 className="listtext"> Profile </h4>
                                  </div>
                                </li>
                                <li
                                  class={`col-2 li ${linkWallet && "complete"}`}
                                  style={{ width: 0 }}
                                >
                                  <div className="status">
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
                          )} */}
                      {/* {playerCreation === false &&
                          !alreadyRegistered &&
                          (mintTitle === "sei" ) && (
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
                                // handleFirstTask(coinbase);
                              }}
                              mintTitle={selectedMint.cardTitle}
                              chainId={chainId}
                              activeTab={activeTab}
                              isExistingUser={() => {
                                setactiveTab("login");
                              }}
                            />
                          )} */}

                      {/* {playerCreation === true &&
                          linkWallet === false &&
                          !alreadyRegistered &&
                          (mintTitle === "sei") && (
                            <PlayerCreationGecko
                              onSuccessCreation={() => {
                                setLinkWallet(true);
                              }}
                              mintTitle={selectedMint.cardTitle}
                            />
                          )} */}

                      {/* {linkWallet === true &&
                          !alreadyRegistered &&
                          (mintTitle === "sei" ) && (
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
                                create a WOD Account to receive the NFT and
                                participate in the exclusive event.
                              </span>

                              <div className="summaryseparator"></div>
                            </div>
                          )}
                        {alreadyRegistered && mintTitle === "sei" && (
                          <div className="d-flex flex-column justify-content-between h-100">
                            {mintTitle === "sei" && totalseiNft === 0 ? (
                              <div className="col-12 col-lg-6 d-flex flex-column mx-auto position-relative">
                                <div
                                  className={`coingeckoempty-wrapper conflux-empty d-flex justify-content-center align-items-center p-3 position-relative`}
                                  style={{
                                    height: windowSize.width > 991 ? 210 : 295,
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
                                to={`/shop/nft/${myseiNfts[0]}/${window.config.nft_sei_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myseiNfts[0],
                                    window.config.nft_sei_address
                                  );
                                }}
                              >
                                <div className="col-12 col-lg-5 d-flex flex-column mx-auto position-relative">
                                  <div
                                    className={`coingeckoempty-wrapper  ${totalseiNft > 0 && mintTitle === "sei"
                                        ? "sei-active"
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
                                      {"SEIBP"}
                                      {`#${myseiNfts[0]}`}
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={"https://cdn.worldofdypians.com/wod/epicwhite.svg"}
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        )} */}

                      {/* {alreadyRegistered && mintTitle === "base" && (
                          <div className="d-flex flex-column justify-content-between h-100">
                            {mintTitle === "base" && totalBaseNft === 0 ? (
                              <div className="col-12 col-lg-6 d-flex flex-column mx-auto position-relative">
                                <div
                                  className={`coingeckoempty-wrapper conflux-empty d-flex justify-content-center align-items-center p-3 position-relative`}
                                  style={{
                                    height: windowSize.width > 991 ? 210 : 295,
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
                                to={`/shop/nft/${myBaseNFTs[0]}/${window.config.nft_base_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myBaseNFTs[0],
                                    window.config.nft_base_address
                                  );
                                }}
                              >
                                <div className="col-12 col-lg-5 d-flex flex-column mx-auto position-relative">
                                  <div
                                    className={`coingeckoempty-wrapper  ${totalBaseNft > 0 && mintTitle === "base"
                                        ? "base-active"
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
                                      {"BSBP"}
                                      {`#${myBaseNFTs[0]}`}
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
                                  className="text-white  d-flex align-items-center gap-2"
                                  href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                                  target="_blank"
                                >
                                  <img
                                    src={"https://cdn.worldofdypians.com/wod/epicwhite.svg"}
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
                                <img src={'https://cdn.worldofdypians.com/wod/userBetapassWhite.svg'} alt="" className="user2" />
                                My Account
                              </NavLink>
                            </div>
                          </div>
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
              {mintTitle === "coingecko" && (
                <div
                  className="d-flex align-items-center gap-2 terms-wrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenTerms(true)}
                >
                  <NavLink to="/shop/beta-pass/coingecko/terms-conditions">
                    <span className="terms-and-conditions mb-0">
                      Terms & Conditions
                    </span>
                    <img src={'https://cdn.worldofdypians.com/wod/termsArrow.svg'} alt="" />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


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
              src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
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
