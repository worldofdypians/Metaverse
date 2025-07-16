import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
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
  showWalletConnect,
  success,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const [selectedMint, setSelectedMint] = useState([]);
  const [mintTitle, setMintTitle] = useState("base");
  const [nftCount, setNftCount] = useState(1);
  const [viewCollection, setViewCollection] = useState(false);
  const [playerCreation, setplayerCreation] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [linkWallet, setLinkWallet] = useState(false);
  const [alreadyRegistered, setalreadyRegistered] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openConflux, setOpenConflux] = useState(false);

  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnUsdConflux, setuserEarnUsdConflux] = useState(0);
  const [userEarnUsdGate, setUserEarnUsdGate] = useState(0);
  const [userEarnUsdKucoin, setUserEarnUsdKucoin] = useState(0);

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
  const [vanarEarnUsd, setvanarEarnUsd] = useState(0);

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

  const betaPasses = [
    {
      id: "base",
      mainTitle: "Base Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by our partners. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/baseBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/baseBlueLogo.svg",
      buttonTitle: "Base",
      giveawayButton: false,
      isComingSoon: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "base-mint-bg2",
      wrapperClassName: "base-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in ETH rewards",
      rewardType: "ETH",
      userEarned: baseEarnUSD,
      eventType: "Explore & Mine",
      eventStartDate: "Mar. 12, 2025",
      eventEndDate: "Jul. 10, 2025",
    },
    {
      id: "matchain",
      mainTitle: "Matchain Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Matchain. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/matchainBetaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/matchainIcon.svg",
      buttonTitle: "Matchain",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "matchain-mint-bg",
      wrapperClassName: "mat-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in BNB rewards",
      rewardType: "BNB",
      userEarned: matChainEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Dec. 04, 2024",
      eventEndDate: "Apr. 04, 2025",
    },
    {
      id: "cookie3",
      mainTitle: "Cookie3 Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Cookie3. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/cookie3BetaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/cookie3.svg",
      buttonTitle: "Cookie3",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "cookie3-mint-bg",
      wrapperClassName: "cookie-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in COOKIE rewards",
      rewardType: "COOKIE",
      userEarned: cookieEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Aug. 26, 2024",
      eventEndDate: "Nov. 24, 2024",
    },
    {
      id: "taiko",
      mainTitle: "Taiko Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Taiko Network. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/taikoBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/taiko.svg",
      buttonTitle: "Taiko",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "taiko-mint-bg",
      wrapperClassName: "taiko-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$30,000 in Taiko rewards",
      rewardType: "Taiko",
      userEarned: taikoEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Apr. 04, 2025",
      eventEndDate: "Aug. 02, 2025",
    },
    {
      id: "manta",
      mainTitle: "Manta Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Manta Network. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/mantaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/manta.png",
      buttonTitle: "Manta",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "manta-mint-bg",
      wrapperClassName: "manta-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$20,000 in Manta rewards",
      rewardType: "Manta",
      userEarned: mantaEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Apr 15, 2025",
      eventEndDate: "Aug 13, 2025",
    },
    {
      id: "bnb",
      mainTitle: "BNB Chain Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by BNB Chain. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/bnbBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/bnbIcon.svg",
      buttonTitle: "BNB",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "bnb-mint-bg",
      wrapperClassName: "bnb-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$20,000 in BNB rewards",
      rewardType: "BNB",
      userEarned: 0,
      eventType: "Explore & Mine",
      eventStartDate: "Apr 09, 2025",
      eventEndDate: "Aug 07, 2025",
    },
    {
      id: "core",
      mainTitle: "Core Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by CORE. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/coreBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/core.svg",
      buttonTitle: "CORE",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaBase.svg",
      cardClassName: "core-mint-bg",
      wrapperClassName: "core-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$20,000 in CORE rewards",
      rewardType: "CORE",
      userEarned: 0,
      eventType: "Explore & Mine",
      eventStartDate: "Apr 10, 2025",
      eventEndDate: "Aug 08, 2025",
    },
    {
      id: "multiversx",
      mainTitle: "MultiversX Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by MultiversX. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/multiversBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/multiversx.svg",
      buttonTitle: "MultiversX",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaBase.svg",
      cardClassName: "multivers-mint-bg",
      wrapperClassName: "multivers-eventwrapper",
      treasureHuntStatus: "Coming Soon",
      rewardsTitle: "$20,000 in EGLD rewards",
      rewardType: "EGLD",
      userEarned: 0,
      eventType: "Explore & Mine",
      eventStartDate: "Coming Soon",
      eventEndDate: "Coming Soon",
    },
    {
      id: "sei",
      mainTitle: "Sei Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by SEI. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/seiBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/seiLogo.svg",
      buttonTitle: "SEI",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "sei-mint-bg",
      wrapperClassName: "sei-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$20,000 in SEI rewards",
      rewardType: "SEI",
      userEarned: seiEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Apr 18, 2025",
      eventEndDate: "Aug 16, 2025",
    },
    {
      id: "viction",
      mainTitle: "Viction Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by VICTION. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/victionBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/viction.svg",
      buttonTitle: "VICTION",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaBase.svg",
      cardClassName: "viction-mint-bg",
      wrapperClassName: "viction-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in VIC rewards",
      rewardType: "VIC",
      userEarned: victionEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Nov. 29, 2024",
      eventEndDate: "Mar. 29, 2025",
    },
    {
      id: "skale",
      mainTitle: "Skale Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by SKALE. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/skaleBetaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/skaleIcon.svg",
      buttonTitle: "SKALE",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaBase.svg",
      cardClassName: "skale2-mint-bg",
      wrapperClassName: "skl-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in SKL rewards",
      rewardType: "SKL",
      userEarned: skaleEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Dec. 03, 2024",
      eventEndDate: "Apr. 03, 2025",
    },
    {
      id: "coinmarketcap",
      mainTitle: "CoinMarketCap Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by CoinMarketCap. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/cmcBetaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/cmcIcon.svg",
      buttonTitle: "CoinMarketCap",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaCmc.svg",
      cardClassName: "cmc-mint-bg2",
      wrapperClassName: "cmc-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in BNB rewards",
      rewardType: "BNB",
      userEarned: cmcEarnUSD,
      eventType: "Explore & Mine",
      eventStartDate: "Dec. 26, 2023",
      eventEndDate: "Apr. 11, 2024",
    },
    {
      id: "doge",
      mainTitle: "Dogecoin Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted on BNB Chain. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/dogeBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg",
      buttonTitle: "Dogecoin",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaDoge.svg",
      cardClassName: "doge-mint-bg2",
      wrapperClassName: "doge-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in DOGE rewards",
      rewardType: "DOGE",
      userEarned: dogeEarnUSD,
      eventType: "Explore & Mine",
      eventStartDate: "Dec. 22, 2023",
      eventEndDate: "Apr. 02, 2024",
    },
    {
      id: "coingecko",
      mainTitle: "CoinGecko Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by CoinGecko. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/coingeckoBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg",
      buttonTitle: "CoinGecko",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkArea.svg",
      cardClassName: "coingecko-mint-bg",
      wrapperClassName: "coingecko-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in BNB rewards",
      rewardType: "BNB",
      userEarned: userEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "Dec. 03, 2024",
      eventEndDate: "Apr. 03, 2025",
    },
    {
      id: "gate",
      mainTitle: "Gate Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Gate.io. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/gateBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/gateIcon.svg",
      buttonTitle: "Gate",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaConflux.svg",
      cardClassName: "gate-mint-bg",
      wrapperClassName: "gate-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$20,000 in BNB rewards",
      rewardType: "BNB",
      userEarned: userEarnUsdGate,
      eventType: "Explore & Mine",
      eventStartDate: "Oct. 20, 2023",
      eventEndDate: "Nov. 20, 2023",
    },
    {
      id: "conflux",
      mainTitle: "Conflux Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Conflux. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/confluxBetaBanner.png",
      logo: "https://cdn.worldofdypians.com/wod/confluxIcon.svg",
      buttonTitle: "Conflux",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: "https://cdn.worldofdypians.com/wod/pinkAreaConflux.svg",
      cardClassName: "conflux-mint-bg2",
      wrapperClassName: "conflux-eventwrapper",
      treasureHuntStatus: "Expired",
      rewardsTitle: "$2,000 in CFX rewards",
      rewardType: "CFX",
      userEarned: userEarnUsdConflux,
      eventType: "Explore & Mine",
      eventStartDate: "Oct. 06, 2023",
      eventEndDate: "Nov. 06, 2023",
    },
    {
      id: "kucoin",
      mainTitle: "KuCoin Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by KuCoin. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/kucoinhero.webp",
      logo: "https://cdn.worldofdypians.com/wod/kucoinLogoRound.svg",
      buttonTitle: "KuCoin",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "kucoin-mint-bg2",
      wrapperClassName: "kucoin-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$2,000 in KCS rewards",
      rewardType: "KCS",
      userEarned: userEarnUsdKucoin,
      eventType: "Explore & Mine",
      eventStartDate: "Apr. 01, 2025",
      eventEndDate: "Jul. 30, 2025",
    },
    {
      id: "vanar",
      mainTitle: "Vanar Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Vanar. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/vanarHero.webp",
      logo: "https://cdn.worldofdypians.com/wod/vanar.svg",
      buttonTitle: "Vanar",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "vanar-mint-bg",
      wrapperClassName: "vanar-eventwrapper",
      treasureHuntStatus: "Live",
      rewardsTitle: "$20,000 in VANRY rewards",
      rewardType: "VANRY",
      userEarned: vanarEarnUsd,
      eventType: "Explore & Mine",
      eventStartDate: "May. 19, 2025",
      eventEndDate: "Sep. 16, 2025",
    },
    {
      id: "tea-fi",
      mainTitle: "Tea-Fi Beta Pass",
      desc: `The Beta Pass NFT provides you with a special ticket to enter the metaverse and participate in an exclusive event hosted by Tea-Fi. During this event, players have the opportunity to earn Points for their leaderboard rankings, and also collect rewards in different tokens, which are distributed on a monthly basis.`,
      heroImage: "https://cdn.worldofdypians.com/wod/teaBetaBanner.webp",
      logo: "https://cdn.worldofdypians.com/wod/teafiLogo.svg",
      buttonTitle: "Tea-Fi",
      isComingSoon: false,
      giveawayButton: false,
      giveawayButtonTitle: "",
      giveawayLink: "",
      areaImage: undefined,
      cardClassName: "teafi-mint-bg",
      wrapperClassName: "tea-eventwrapper",
      treasureHuntStatus: "Coming Soon",
      rewardsTitle: "$40,000 in TEA rewards",
      rewardType: "TEA",
      userEarned: 0,
      eventType: "Explore & Mine",
      eventStartDate: "Jul. 18, 2025",
      eventEndDate: "Nov. 15, 2025",
    },
  ];

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

          const kucoinEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "kucoin";
          });
          const vanarEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "vanar";
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
          if (kucoinEvent && kucoinEvent[0]) {
            const usdValue =
              kucoinEvent[0].reward.earn.total /
              kucoinEvent[0].reward.earn.multiplier;
            setUserEarnUsdKucoin(usdValue);
          }

          if (vanarEvent && vanarEvent[0]) {
            const usdValue =
              vanarEvent[0].reward.earn.total /
              vanarEvent[0].reward.earn.multiplier;
            setvanarEarnUsd(usdValue);
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
        // handleFirstTask(coinbase);
      });
    } catch (error) {
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
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
    setSelectedMint(
      betaPasses.find(
        (mint) => mint.id === locationState.split("/").slice(-1)[0]
      )
    );
    setMintTitle(
      betaPasses.find(
        (mint) => mint.id === locationState.split("/").slice(-1)[0]
      ).id
    );
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
                      {selectedMint?.mainTitle} Beta Pass
                    </h6>

                    <p className="collection-desc">{selectedMint?.desc}</p>
                  </div>
                </div>
                <div className="col-12 col-lg-4 px-0">
                  <img src={selectedMint?.heroImage} className="w-100" alt="" />
                </div>
              </div>
              <div
                className="filters-container d-flex flex-column align-items-center justify-content-center my-4 p-3 position-relative gap-3"
                style={{ zIndex: 2 }}
              >
                {windowSize.width > 991 ? (
                  <>
                    <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                      {betaPasses.map((item, index) => {
                        return (
                          <NavLink
                            to={`/shop/beta-pass/${item.id}`}
                            key={index}
                            className={`${
                              location.pathname.includes(item.id) &&
                              "selected-beta-pass-item"
                            } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                            onClick={() => {
                              setSelectedMint(item);
                              setMintTitle(item.id);
                            }}
                          >
                            <img
                              src={item.logo}
                              className="beta-pass-chain-img"
                              alt=""
                            />
                            <span>{item.buttonTitle}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="d-flex align-items-center gap-lg-4 gap-2 justify-content-center flex-wrap">
                    {betaPasses.map((item, index) => {
                      return (
                        <NavLink
                          to={`/shop/beta-pass/${item.id}`}
                          key={index}
                          className={`${
                            location.pathname.includes(item.id) &&
                            "selected-beta-pass-item"
                          } beta-pass-item py-2 px-2 px-lg-4 px-md-4 d-flex align-items-center gap-2`}
                          onClick={() => {
                            setSelectedMint(item);
                            setMintTitle(item.id);
                          }}
                        >
                          <img
                            src={item.logo}
                            className="beta-pass-chain-img"
                            alt=""
                          />
                          <span>{item.buttonTitle}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className=" nft-page-wrapper d-flex flex-column flex-xxl-row gap-3 mb-3">
                <div
                  className={"col-12 col-md-12 col-xxl-7 mt-0 px-0"}
                  style={{ overflowX: "hidden" }}
                >
                  <div
                    className={`p-4 mint-wrappernew ${selectedMint.cardClassName} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
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

                      {mintTitle !== "coingecko" && (
                        <>
                          Get your {selectedMint.mainTitle}{" "}
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
                          {benefits.map((item, index) => (
                            <div
                              className="d-flex align-items-center gap-2"
                              key={index}
                            >
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
                        {selectedMint?.areaImage !== undefined && (
                          <div className="position-relative">
                            <img
                              src={selectedMint?.areaImage}
                              alt=""
                              className="area-image"
                            />
                          </div>
                        )}
                      </div>
                      {selectedMint?.giveawayButton === true && (
                        <NavLink
                          className={`cmc-btn text-decoration-none px-3 py-2 d-flex align-items-center justify-content-center gap-2`}
                          to={selectedMint?.giveawayLink}
                        >
                          <img
                            src={selectedMint?.logo}
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />{" "}
                          {selectedMint?.giveawayButtonTitle}
                        </NavLink>
                      )}
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
                      <div className="">
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center position-relative gap-2">
                            <h6 className="coingecko-eventh6 m-0">
                              {selectedMint?.buttonTitle} Treasure Hunt
                            </h6>{" "}
                            {selectedMint?.treasureHuntStatus === "Live" ? (
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
                            ) : selectedMint?.treasureHuntStatus ===
                              "Expired" ? (
                              <div
                                className={`position-relative events-page-status-tag-expired px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <span>Expired</span>
                              </div>
                            ) : (
                              <div
                                className={`position-relative  events-page-status-tag-upcoming px-2 d-flex align-items-center justify-content-center gap-0`}
                                style={{ top: 0 }}
                              >
                                <span>Coming Soon</span>
                              </div>
                            )}
                          </div>
                          <div
                            className={`${selectedMint?.wrapperClassName} p-3`}
                          >
                            <div className="d-flex flex-column gap-4">
                              <div className="d-flex gap-2">
                                <img
                                  src={selectedMint?.logo}
                                  alt=""
                                  style={{ height: 32, width: 32 }}
                                />
                                <div className="d-flex flex-column gap-1">
                                  <span className="coingecko-eventname">
                                    {selectedMint?.buttonTitle}
                                  </span>
                                  <span className="coingecko-eventusd">
                                    {selectedMint?.rewardsTitle}
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
                                      selectedMint?.userEarned,
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
                                      {selectedMint?.eventType}
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
                                      Start: {selectedMint?.eventStartDate}
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
                                      End: {selectedMint?.eventEndDate}
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
                            Earn daily {selectedMint?.rewardType} rewards and
                            global leaderboard points.
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
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/userBetapassWhite.svg"
                                }
                                alt=""
                                className="user2"
                              />
                              My Account
                            </NavLink>
                          </div>
                        </div>
                      </div>

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
                                  className={`col-3 li ${showVerify && "complete"
                                    } `}
                                >
                                  <div className="status">
                                    <h4 className="listtext"> Verify </h4>
                                  </div>
                                </li>
                                <li
                                  className={`col-3 li ${playerCreation && "complete"
                                    } `}
                                >
                                  <div className="status">
                                    <h4 className="listtext"> Profile </h4>
                                  </div>
                                </li>
                                <li
                                  className={`col-2 li ${linkWallet && "complete"}`}
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
                    <img
                      src={"https://cdn.worldofdypians.com/wod/termsArrow.svg"}
                      alt=""
                    />
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
