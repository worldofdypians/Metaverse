import React, { useRef } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { useState } from "react";
import { useEffect } from "react";
import TimepieceChecklistModal from "../Timepiece/TimepieceChecklistModal";
import addActive from "../../assets/landAssets/addActive.svg";
import addInactive from "../../assets/landAssets/addInactive.svg";
import subtractActive from "../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../assets/landAssets/subtractInactive.svg";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import marketMintBanner from "./assets/marketMintBanner.png";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import EventSliderCard from "./components/EventSliderCard";
import Slider from "react-slick";
import nextArrow from "./assets/nextArrow1.svg";
import confluxActive from "./assets/confluxActive.png";
import coin98Active from "./assets/coin98Active.png";
import bnbActive from "./assets/bnbActive.png";
import taikoActive from "./assets/taikoActive.png";
import mantaActive from "./assets/mantaActive.png";
import coingeckoActive from "./assets/coingeckoActive.png";
import skaleActive from "./assets/upcomingSkaleMobile.webp";
import immutableActive from "./assets/immutableActive.webp";
import coreActive from "./assets/coreActive.webp";
import victionActive from "./assets/victionActive.webp";
import seiActive from "./assets/seiActive.webp";
import multiversActive from "./assets/multiversActive.webp";
import taikoLogo from './MarketNFTs/assets/taikoLogo.svg'
import mantaLogo from "./assets/mantaLogo.png";
import timepieceActive from "./assets/timepieceActive.png";
import gateActive from "./assets/gateActive.png";
import kucoinActive from "./assets/kucoinActive.png";
import blockChainIcon from "./assets/blockChainIcon.svg";
import confluxLogo from "./assets/confluxLogo.svg";
import baseLogo from "./assets/baseLogo.svg";
import skaleLogo from "./assets/skaleIcon.svg";
import immutableLogo from "./assets/immutableLogo.svg";
import coreLogo from "./assets/coreLogo.svg";
import victionLogo from "./assets/victionLogo.svg";
import seiLogo from "./assets/seiLogo.svg";
import multiversLogo from "./assets/multiversLogo.svg";
import taikoBg from "./assets/taikoBg.webp";
import seiBg from "./assets/seiBg.webp";
import coreBg from "./assets/coreBg.webp";
import mantaBg from "./assets/mantaBg.webp";
import taikoMobileBg from './assets/taikoActive.png'
import victionBg from "./assets/victionBg.webp";
import multiversBg from "./assets/multiversBg.webp";
import immutableMobileBg from "./assets/immutableActive.webp";
import immutableBg from "./assets/immutableBg.webp";

import seiMobileBg from "./assets/seiActive.webp";
import coreMobileBg from "./assets/coreActive.webp";
import mantaMobileBg from "./assets/mantaMobileBg.png";

import victionMobileBg from "./assets/victionActive.webp";
import multiversMobileBg from "./assets/multiversActive.webp";

import avaxLogo from "./assets/avaxLogo.svg";
import bnbLogo from "./assets/bnbIcon.svg";
import wodLogo from "./assets/wodIcon.png";
import openSeaLogo from "./assets/openSeaLogo.png";
import BetaEventCard from "./components/BetaEventCard";
import { NavLink, useLocation, useParams } from "react-router-dom";
import coin98Upcoming from "./assets/coin98Upcoming.png";

import Countdown from "react-countdown";
import getFormattedNumber from "../Account/src/Utils.js/hooks/get-formatted-number";

const renderer = ({ days, hours, minutes }) => {
  return (
    <h6 className="latest-mint-number mb-0 font-organetto">
      {hours} hours : {minutes} minutesmarketplace/mintnew-upcoming-tag d-flex
      align-items-center justify-content-center px-1
    </h6>
  );
};
const renderer2 = ({ days, hours, minutes }) => {
  return (
    <h6 className="latest-mint-number mb-0">
      {days}d:{hours}h:{minutes}m
    </h6>
  );
};

const MarketMint = ({
  showWalletConnect,
  handleMint,
  checkTotalcaws,
  coinbase,
  isConnected,
  totalCreated,
  mintStatus,
  mintloading,
  chainId,
  nftName,
  textColor,
  cawsArray,
  calculateCaws,
  timepieceMetadata,
  handleBaseNftMint,
  mybaseNFTsCreated,
  baseMintAllowed,
  myskaleNFTsCreated,
  skaleMintAllowed,
  coreMintAllowed,
  victionMintAllowed,
  totalseiNft,
  totalVictionNft,
  totalImmutableNft,
  immutableMintAllowed,
  totalMultiversNft,
  totalCoreNft,
  myVictionNfts,
  myMultiversNfts,
  myImmutableNfts,
  myCoreNfts,
  myseiNfts,
  myBnbNFTsCreated,
  handleBnbNftMint,
  bnbMintAllowed,
  totalBnbNft,
  myBnbNfts,
  myOpbnbNfts,
  myopbnbNFTsCreated,
  opbnbMintAllowed,
  totalopbnbNft,
  totalMantaNft,
  mantaMintAllowed,
  myMantaNfts,
  myMantaNFTsCreated,totalTaikoNft,taikoMintAllowed,myTaikoNfts, myTaikoNFTsCreated
}) => {
  // const avaxData = {
  //   id: "avax",
  //   cardTitle: "Avalanche Beta Pass",
  //   title: "Avalanche Beta Pass",
  //   background: "avax-mint-bg",
  //   mobileBg: "avaxMobileBg.png",
  // };
  // const gateData = {
  //   id: "gate",
  //   cardTitle: "Gate.Io Beta Pass",
  //   title: "Gate.Io Beta Pass",
  //   background: "gate-mint-bg2",
  //   mobileBg: "gateMobileBg.png",
  // };
  // const kucoinData = {
  //   id: "kucoin",
  //   cardTitle: "KuCoin Beta Pass",
  //   title: "KuCoin Beta Pass",
  //   background: "kucoin-mint-bg",
  //   mobileBg: "kucoinMobileBg.png",
  // };
  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: "conflux-mint-bg",
    mobileBg: "confluxMobileBg.png",
  };

  const timepieceData = {
    id: "timepiece",
    cardTitle: "CAWS Timepiece",
    title: "Timepiece",
    background: "market-mint-bg",
    mobileBg: "timepieceMobileBg.png",
  };

  const immutableData = {
    id: "immutable",
    cardTitle: "Immutable Beta Pass",
    title: "Immutable Beta Pass",
    background: "immutable-mint-bg",
    mobileBg: "immutableMobileBg.webp",
  };

  const multiversData = {
    id: "multiversx",
    cardTitle: "MultiversX Beta Pass",
    title: "MultiversX Beta Pass",
    background: "multivers-mint-bg",
    mobileBg: "multiversMobileBg.webp",
  };

  const coreData = {
    id: "core",
    cardTitle: "CORE Beta Pass",
    title: "Core Beta Pass",
    background: "core-mint-bg",
    mobileBg: "coreMobileBg.webp",
  };

  const seiData = {
    id: "sei",
    cardTitle: "SEI Beta Pass",
    title: "SEI Beta Pass",
    background: "sei-mint-bg",
    mobileBg: "seiMobileBg.webp",
  };

  // const victionData = {
  //   id: "viction",
  //   cardTitle: "Viction Beta Pass",
  //   title: "Viction Beta Pass",
  //   background: "viction-mint-bg",
  //   mobileBg: "victionMobileBg.webp",
  // };

  const bnbData = {
    id: "bnb",
    cardTitle: "BNB Chain Beta Pass",
    title: "BNB Chain Beta Pass",
    background: "bnb-mint-bg",
    mobileBg: "bnbMobileBg.webp",
  };

  const opbnbData = {
    id: "opbnb",
    cardTitle: "opBNB Chain Beta Pass",
    title: "opBNB Chain Beta Pass",
    background: "opbnb-mint-bg",
    mobileBg: "opbnbMobile.webp",
  };
  const mantaData = {
    id: "manta",
    cardTitle: "Manta Beta Pass",
    title: "Manta Beta Pass",
    background: "manta-mint-bg",
    mobileBg: "mantaBgMobile.webp",
  };

  const taikoData = {
    id: "taiko",
    cardTitle: "Taiko Beta Pass",
    title: "Taiko Beta Pass",
    background: "taiko-mint-bg",
    mobileBg: "taikoMobileBg.png",
  };

  const windowSize = useWindowSize();
  const params = useParams();
  const location = useLocation();
  const [viewCollection, setViewCollection] = useState(false);
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [status, setStatus] = useState("Connect your wallet.");
  const [showBadge, setshowBadge] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [activeButton, setactiveButton] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [grandPrice, setGrandPrice] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(true);
  const [latestMintId, setlatestMintId] = useState(0);
  const [latestConfluxMintId, setlatestConfluxMintId] = useState(0);

  const [activeTab, setActiveTab] = useState("live");
  const [confluxSold, setconfluxSold] = useState(0);
  const [baseSold, setcBaseSold] = useState(0);
  const [skaleSold, setskaleSold] = useState(0);
  const [bnbNftsSold, setbnbNftsSold] = useState(0);
  const [victionNftsSold, setVictionNftsSold] = useState(0);
  const [coreNftsSold, setCoreNftsSold] = useState(0);
  const [opbnbNftsSold, setopBnbNftsSold] = useState(0);
  const [immutableNftsSold, setimmutableNftsSold] = useState(0);



  const [activeSlide, setActiveSlide] = useState(0);
  const [showFirstNext, setShowFirstNext] = useState(0);
  const [selectedMint, setSelectedMint] = useState(taikoData);
  const [mintTitle, setMintTitle] = useState("taiko");
  const [sliderCut, setSliderCut] = useState();
  const [confluxLive, setConfluxLive] = useState(false);
  const slider = useRef(null);
  const html = document.querySelector("html");

  const getTotalSupply = async () => {
    const confluxContract = new window.confluxWeb3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_base_address
    );

    const baseContract = new window.baseWeb3.eth.Contract(
      window.BASE_NFT_ABI,
      window.config.nft_base_address
    );

    const confluxresult = await confluxContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setconfluxSold(confluxresult);

    const baseresult = await baseContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    setcBaseSold(baseresult);

    const skaleContract = new window.skaleWeb3.eth.Contract(
      window.SKALE_NFT_ABI,
      window.config.nft_skale_address
    );

    const skaleresult = await skaleContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });
    setskaleSold(skaleresult);

    const bnbnftContract = new window.bscWeb3.eth.Contract(
      window.BNB_NFT_ABI,
      window.config.nft_bnb_address
    );

    const bnbresult = await bnbnftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setbnbNftsSold(bnbresult);

    const victionnftContract = new window.victionWeb3.eth.Contract(
      window.VICTION_NFT_ABI,
      window.config.nft_viction_address
    );

    const victionresult = await victionnftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setVictionNftsSold(victionresult);


    const corenftContract = new window.coreWeb3.eth.Contract(
      window.CORE_NFT_ABI,
      window.config.nft_core_address
    );

    const coreresult = await corenftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setCoreNftsSold(coreresult);

    const opbnbnftContract = new window.opBnbWeb3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_opbnb_address
    );

    const opbnbresult = await opbnbnftContract.methods
    .totalSupply()
    .call()
    .catch((e) => {
      console.error(e);
      return 0;
    });

  setopBnbNftsSold(opbnbresult);


  
  const immutableContract = new window.immutableWeb3.eth.Contract(
    window.IMMUTABLE_NFT_ABI,
    window.config.nft_immutable_address
  );

  const immutableresult = await immutableContract.methods
  .totalSupply()
  .call()
  .catch((e) => {
    console.error(e);
    return 0;
  });

setimmutableNftsSold(immutableresult);


  };

  useEffect(() => {
    if (
      location.pathname.includes("bnbchain") &&
      !location.pathname.includes("opbnbchain")
    ) {
      setSelectedMint(bnbData);
      setMintTitle("bnbchain");
    } else if (location.pathname.includes("opbnbchain")) {
      setSelectedMint(opbnbData);
      setMintTitle("opbnbchain");
    } else if (location.pathname.includes("timepiece")) {
      setSelectedMint(timepieceData);
      setMintTitle("timepiece");
    } else if (location.pathname.includes("immutable")) {
      setSelectedMint(immutableData);
      setMintTitle("immutable");
    } else if (location.pathname.includes("manta")) {
      setSelectedMint(mantaData);
      setMintTitle("manta");
    }
    else if (location.pathname.includes("taiko")) {
      setSelectedMint(taikoData);
      setMintTitle("taiko");
    }
    getTotalSupply();
  }, [location]);

  useEffect(() => {
    html.classList.remove("hidescroll");
  }, []);

  let countToLiveConflux = new Date("2023-10-10T11:00:00.000+02:00");
  let countToExpireConflux = new Date("2024-08-05T16:00:00.000+02:00");
  let countToExpireOpbnb = new Date("2024-08-14T24:00:00.000+02:00");
  let countToExpireImmutable = new Date("2024-08-15T24:00:00.000+02:00");

  let countToExpireManta = new Date("2024-08-15T24:00:00.000+02:00");
  let countToExpireTaiko = new Date("2024-09-13T24:00:00.000+02:00");


  const dummyCards = [
    // {
    //   title: "Avalanche Pass",
    //   eventId: "avax",
    //   desc: "Gain entry to metaverse, and join exclusive Avalanche event with special ticket.",
    //   img: skaleActive,
    //   data: avaxData,
    //   class: "mint-1",
    // },
    // {
    //   title: "KuCoin Pass",
    //   eventId: "kucoin",
    //   desc: "Gain entry to metaverse, and join exclusive KuCoin event with special ticket.",
    //   img: kucoinActive,
    //   data: kucoinData,
    //   class: "mint-2",
    // },
    // {
    //   title: "Gate.Io Pass",
    //   eventId: "gate",
    //   desc: "Gain entry to metaverse, and join exclusive Gate.Io event with special ticket.",
    //   img: gateActive,
    //   data: gateData,
    //   class: "mint-3",
    // },

    // {
    //   title: "Conflux Pass",
    //   eventId: "conflux",
    //   desc: "Gain entry to metaverse, and join exclusive Conflux event with special ticket.",
    //   img: confluxActive,
    //   data: confluxData,
    //   class: "mint-4",
    //   id: "conflux",
    // },
    // {
    //   title: "Coin98 Pass",
    //   eventId: "coin98",
    //   desc: "Gain entry to metaverse, and join exclusive Coin98 event with special ticket.",
    //   img: coin98Active,
    //   data: coin98Data,
    //   class: "mint-5",
    // },
    // {
    //   title: "Coingecko Pass",
    //   eventId: "coingecko",
    //   desc: "Gain entry to metaverse, and join exclusive Coingecko event with special ticket.",
    //   img: coingeckoActive,
    //   data: coingeckoData,
    //   class: "mint-6",
    // },
    // {
    //   title: "SKALE Pass",
    //   eventId: "skale",
    //   desc: "Gain entry to metaverse, and join exclusive SKALE event with special ticket.",
    //   img: skaleActive,
    //   data: baseData,
    //   class: "mint-skale",
    // },

    // {
    //   title: "MultiversX Pass",
    //   eventId: "multiversx",
    //   desc: "Gain entry to metaverse, and join exclusive MultiversX event with special ticket.",
    //   img: multiversActive,
    //   data: multiversData,
    //   class: "mint-multivers",
    // },

    // {
    //   title: "Viction Pass",
    //   eventId: "viction",
    //   desc: "Gain entry to metaverse, and join exclusive Viction event with special ticket.",
    //   img: victionActive,
    //   data: victionData,
    //   class: "mint-viction",
    // },

    // {
    //   title: "SEI Pass",
    //   eventId: "sei",
    //   desc: "Gain entry to metaverse, and join exclusive SEI event with special ticket.",
    //   img: seiActive,
    //   data: seiData,
    //   class: "mint-sei",
    // },
    // {
    //   title: "BNB Chain Pass",
    //   eventId: "bnbchain",
    //   desc: "Gain entry to metaverse, and join exclusive BNB Chain event with special ticket.",
    //   img: bnbActive,
    //   data: bnbData,
    //   class: "mint-bnb",
    //   id: "bnb",
    // },

    // {
    //   title: "Manta Pass",
    //   eventId: "manta",
    //   desc: "Gain entry to metaverse, and join exclusive Manta event with special ticket.",
    //   img: mantaActive,
    //   data: mantaData,
    //   class: "mint-manta",
    //   id: "manta",
    // },
    // {
    //   title: "opBNB Chain Pass",
    //   eventId: "opbnbchain",
    //   desc: "Gain entry to metaverse, and join exclusive opBNB Chain event with special ticket.",
    //   img: bnbActive,
    //   data: opbnbData,
    //   class: "mint-bnb",
    //   id: "opbnb",
    // },
    {
      title: "Taiko Pass",
      eventId: "taiko",
      desc: "Gain entry to metaverse, and join exclusive Taiko event with special ticket.",
      img: taikoActive,
      data: taikoData,
      class: "mint-taiko",
      id: "taiko",
    },
    // {
    //   title: "Immutable Pass",
    //   eventId: "immutable",
    //   desc: "Gain entry to metaverse, and join exclusive Immutable event with special ticket.",
    //   img: immutableActive,
    //   data: immutableData,
    //   class: "mint-immutable",
    // },
    // {
    //   title: "CORE Pass",
    //   eventId: "core",
    //   desc: "Gain entry to metaverse, and join exclusive CORE event with special ticket.",
    //   img: coreActive,
    //   data: coreData,
    //   class: "mint-core",
    // },
    {
      title: "CAWS Timepiece",
      eventId: "timepiece",
      desc: "Access the metaverse, experience enhanced interactions, and enjoy diverse benefits.",
      img: timepieceActive,
      data: timepieceData,
      class: "mint-8",
      id: "timepiece",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const firstNext = () => {
    slider.current.slickNext();
  };
  const firstPrev = () => {
    slider.current.slickPrev();
  };

  const handleViewCollection = () => {
    setViewCollection(true);
  };

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
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

  const getTimepieceLatestMint = async () => {
    const result = await window.caws_timepiece.getTimepieceLatestMint();
    setlatestMintId(result - 1);
  };

  const getConfluxLatestMint = async () => {
    const result = await window.conflux_nft.getConfluxLatestMint();
    setlatestConfluxMintId(result - 1);
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

  useEffect(() => {
    if (coinbase && chainId === 1) {
      if (cawsArray.length === 0) {
        setNftStatus("*You are not holding any CAWS NFT.");
      } else if (cawsArray.length > 0) {
        if (cawsArray.length < nftCount && cawsArray.length > 0) {
          setNftStatus("*You don't have enough CAWS NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        } else if (nftCount > 50 && cawsArray.length === 50) {
          setNftStatus("*Exceeded mint limit of 10 NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        } else if (cawsArray.length > 0 && cawsArray.length >= nftCount) {
          setNftStatus("*50 NFT limit.");
        }
      }
    }
  }, [nftCount, coinbase, cawsArray.length]);

  useEffect(() => {
    if (isConnected) {
      if (chainId !== undefined) {
        if (selectedMint.id === "timepiece") {
          if (chainId !== 1) {
            setactiveButton(false);
            setStatus("Switch to Ethereum Chain to continue minting.");
          } else if (chainId === 1) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "skale") {
          if (chainId !== 1482601649) {
            setactiveButton(false);
            setStatus("Switch to SKALE to continue minting.");
          } else if (chainId === 1482601649) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "bnb") {
          if (chainId !== 56) {
            setactiveButton(false);
            setStatus("Switch to BNB to continue minting.");
          } else if (chainId === 56) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "opbnb") {
          if (chainId !== 204) {
            setactiveButton(false);
            setStatus("Switch to opBNB Chain to continue minting.");
          } else if (chainId === 204) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "core") {
          if (chainId !== 1116) {
            setactiveButton(false);
            setStatus("Switch to CORE to continue minting.");
          } else if (chainId === 1116) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "viction") {
          if (chainId !== 88) {
            setactiveButton(false);
            setStatus("Switch to Viction to continue minting.");
          } else if (chainId === 88) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "immutable") {
          if (chainId !== 13371) {
            setactiveButton(false);
            setStatus("Switch to Immutable to continue minting.");
          } else if (chainId === 13371) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "manta") {
          if (chainId !== 169) {
            setactiveButton(false);
            setStatus("Switch to Manta to continue minting.");
          } else if (chainId === 169) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "taiko") {
          if (chainId !== 167000) {
            setactiveButton(false);
            setStatus("Switch to Taiko to continue minting.");
          } else if (chainId === 167000) {
            setactiveButton(true);
            setStatus("");
          }
        }
      }
    }
  }, [isConnected, chainId, coinbase, selectedMint]);

  useEffect(() => {
    getTimepieceLatestMint();
    getConfluxLatestMint();
  }, [mybaseNFTsCreated, totalCreated]);

  useEffect(() => {
    if (isConnected) {
      calculateCaws({
        numberOfTokens: parseInt(nftCount),
      });
    }
  }, [nftCount, isConnected, coinbase, chainId, cawsArray.length]);

  useEffect(() => {
    if (coinbase && isConnected && chainId === 1) {
      if (totalCreated > 0) {
        setshowBadge(true);
      }
    } else if (coinbase && isConnected && selectedMint.id === "skale") {
      if (myskaleNFTsCreated > 0) {
        setshowBadge(true);
      }
    }
  }, [coinbase, chainId, isConnected, totalCreated, selectedMint]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Mint";
  }, []);

  

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
        <div
          className="container-nft d-flex align-items-start flex-column gap-2 px-3 px-lg-5 my-4 position-relative"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 px-0">
            <div className="row justify-content-center align-items-center w-100 mx-0 px-3 py-3 p-lg-0 gap-5 gap-lg-0">
              {/* <div className="row align-items-center mb-5">
        <div className="col-12 col-lg-7">
          <div className="d-flex flex-column gap-2">
          <h6 className="market-mint-title d-flex
           gap-2 flex-lg-row align-items-center">
          NFT{" "}
          <span
            className="market-mint-title"
            style={{ color: "#8c56ff" }}
          >
            Minting
          </span>
        </h6>
          <p className="market-mint-desc">
          Mint your CAWS Timepiece NFT for free using your original CAWS NFT and unlock exclusive metaverse benefits.
          </p>
        </div>          
        </div>
        <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
          <img src={marketMintBanner} alt="" className="w-75" />
        </div>
        </div> */}

              <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
                NFT <span style={{ color: "#8c56ff" }}> Minting</span>
              </h6>
              <div className="d-flex flex-column">
                <div className="d-flex w-100 align-items-center justify-content-center gap-4">
                  <h6
                    className={`new-stake-tab position-relative ${
                      activeTab === "live" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("live")}
                  >
                     <div className="new-upcoming-tag d-flex align-items-center justify-content-center px-1">
                      <span className="mb-0">New</span>
                    </div>
                    Live
                  </h6>
                  <h6
                    className={`new-stake-tab position-relative ${
                      activeTab === "upcoming" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                   
                    Upcoming
                  </h6>
                  <h6
                    className={`new-stake-tab ${
                      activeTab === "past" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("past")}
                  >
                    Past
                  </h6>
                </div>
                <span className="w-100 new-stake-divider mt-3 mb-5"></span>
              </div>

              {activeTab === "live" && (
                <>
                  {dummyCards.length > 1 && (
                    <div className="pb-5 px-0 position-relative">
                      {activeSlide > 0 && (
                        <div className="prev-arrow-nft" onClick={firstPrev}>
                          <img src={nextArrow} alt="" />
                        </div>
                      )}
                      {showFirstNext === activeSlide
                        ? null
                        : dummyCards.length > sliderCut && (
                            <div className="next-arrow-nft" onClick={firstNext}>
                              <img src={nextArrow} alt="1" />
                            </div>
                          )}
                      {windowSize.width < 480 && (
                        <>
                          <div className="prev-arrow-nft" onClick={firstPrev}>
                            <img src={nextArrow} alt="" />
                          </div>
                          <div className="next-arrow-nft" onClick={firstNext}>
                            <img src={nextArrow} alt="1" />
                          </div>
                        </>
                      )}
                      <Slider ref={(c) => (slider.current = c)} {...settings}>
                        {dummyCards.map((item, index) => (
                          <EventSliderCard
                            key={index}
                            data={item}
                            onSelectCard={() => {
                              setSelectedMint(item.data);
                              setMintTitle(item.eventId);
                            }}
                            mintTitle={mintTitle}
                          />
                        ))}
                      </Slider>
                    </div>
                  )}
                  {selectedMint && (
                    <>
                      <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 staking-height-2">
                        <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
                          <div className="d-flex flex-column position-relative">
                            {showBadge &&
                              totalCreated > 0 &&
                              selectedMint.id === "timepiece" && (
                                <div className="totalcreated">
                                  <span>{totalCreated}</span>
                                </div>
                              )}
                            {showBadge &&
                              myskaleNFTsCreated.length > 0 &&
                              selectedMint.id === "skale" && (
                                <div className="totalcreated">
                                  <span>{myskaleNFTsCreated.length}</span>
                                </div>
                              )}
                            {showBadge &&
                              myopbnbNFTsCreated.length > 0 &&
                              selectedMint.id === "opbnb" && (
                                <div className="totalcreated">
                                  <span>{myopbnbNFTsCreated.length}</span>
                                </div>
                              )}
                            {showBadge &&
                              myMantaNFTsCreated.length > 0 &&
                              selectedMint.id === "manta" && (
                                <div className="totalcreated">
                                  <span>{myMantaNFTsCreated.length}</span>
                                </div>
                              )}
                               {showBadge &&
                              myTaikoNFTsCreated.length > 0 &&
                              selectedMint.id === "taiko" && (
                                <div className="totalcreated">
                                  <span>{myTaikoNFTsCreated.length}</span>
                                </div>
                              )}
                            <div
                              className={`genesis-wrapper ${
                                selectedMint.id === "timepiece" &&
                                totalCreated > 0
                                  ? "genesis-land"
                                  : selectedMint.id === "timepiece" &&
                                    totalCreated === 0
                                  ? "genesis-land-empty"
                                  : selectedMint.id === "sei" && totalseiNft > 0
                                  ? "sei-active"
                                  : selectedMint.id === "sei" &&
                                    totalseiNft === 0
                                  ? "conflux-empty"
                                  : selectedMint.id === "core" &&
                                    totalCoreNft === 0
                                  ? "conflux-empty"
                                  : selectedMint.id === "core" &&
                                    totalCoreNft > 0
                                  ? "core-active"
                                  : selectedMint.id === "manta" &&
                                    totalMantaNft > 0
                                  ? "manta-active"
                                  : selectedMint.id === "taiko" &&
                                    totalTaikoNft > 0
                                  ? "taiko-active"
                                  : selectedMint.id === "viction" &&
                                    totalVictionNft > 0
                                  ? "viction-active"
                                  : selectedMint.id === "viction" &&
                                    totalVictionNft === 0
                                  ? "conflux-empty"
                                  : selectedMint.id === "immutable" &&
                                    totalImmutableNft === 0
                                  ? "conflux-empty"
                                  : selectedMint.id === "immutable" &&
                                    totalImmutableNft > 0
                                  ? "immutable-active"
                                  : selectedMint.id === "multiversx" &&
                                    totalMultiversNft > 0
                                  ? "multivers-active"
                                  : selectedMint.id === "bnb" && totalBnbNft > 0
                                  ? "bnb-active"
                                  : selectedMint.id === "opbnb" &&
                                    totalopbnbNft > 0
                                  ? "opbnb-active"
                                  : selectedMint.id === "multiversx" &&
                                    totalMultiversNft === 0
                                  ? "conflux-empty"
                                  : "conflux-empty"
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
                              <h6 className="font-organetto land-desc">
                                {selectedMint?.cardTitle}
                              </h6>
                            </div>
                          </div>

                          {selectedMint.id === "timepiece" && (
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
                          )}
                          {selectedMint.id === "bnb" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                totalBnbNft === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalBnbNft === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalBnbNft === 0
                                }
                                to={`/marketplace/nft/${myBnbNfts[0]}/${window.config.nft_bnb_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myBnbNfts[0],
                                    window.config.nft_bnb_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}

                          {selectedMint.id === "opbnb" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                totalopbnbNft === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalopbnbNft === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalopbnbNft === 0
                                }
                                to={`/marketplace/nft/${myOpbnbNfts[0]}/${window.config.nft_opbnb_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myOpbnbNfts[0],
                                    window.config.nft_opbnb_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}

                          {selectedMint.id === "core" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myCoreNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myCoreNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myCoreNfts.length === 0
                                }
                                to={`/marketplace/nft/${myCoreNfts[0]}/${window.config.nft_core_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myCoreNfts[0],
                                    window.config.nft_core_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                          {selectedMint.id === "sei" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myseiNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myseiNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myseiNfts.length === 0
                                }
                                to={`/marketplace/nft/${myseiNfts[0]}/${window.config.nft_sei_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myseiNfts[0],
                                    window.config.nft_sei_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                          {selectedMint.id === "immutable" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myImmutableNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myImmutableNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myImmutableNfts.length === 0
                                }
                                to={`/marketplace/nft/${totalImmutableNft}/${window.config.nft_immutable_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    totalImmutableNft,
                                    window.config.nft_immutable_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                          {selectedMint.id === "viction" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myVictionNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myVictionNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myVictionNfts.length === 0
                                }
                                to={`/marketplace/nft/${myVictionNfts[0]}/${window.config.nft_viction_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myVictionNfts[0],
                                    window.config.nft_viction_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                          {selectedMint.id === "manta" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myMantaNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myMantaNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myMantaNfts.length === 0
                                }
                                to={`/marketplace/nft/${myMantaNfts[0]}/${window.config.nft_manta_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myMantaNfts[0],
                                    window.config.nft_manta_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}

{selectedMint.id === "taiko" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myTaikoNfts.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myTaikoNfts.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myTaikoNfts.length === 0
                                }
                                to={`/marketplace/nft/${myTaikoNfts[0]}/${window.config.nft_taiko_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myTaikoNfts[0],
                                    window.config.nft_taiko_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-12 col-xxl-5 mt-0 px-0"
                        style={{ overflowX: "hidden" }}
                      >
                        <div
                          className={`p-4 mint-wrappernew ${selectedMint?.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                          style={{ minHeight: "463px" }}
                        >
                          <h6 className="marketmintnewtitle position-relative">
                            Mint your {selectedMint?.title} <br />
                            NFT
                            <span className="marketmintnewtitle-marked mx-2">
                              now!
                            </span>
                          </h6>
                          <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
                            <div className="mint-benefits-grid">
                              {benefits.map((item) => (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={require(`../../components/TimepieceMint/assets/${item.icon}.png`)}
                                    alt=""
                                    style={{
                                      scale:
                                        item.icon === "expand" ? "0.8" : "1",
                                    }}
                                  />
                                  <span className="mint-benefits-title">
                                    {item.title}
                                  </span>
                                </div>
                              ))}
                              {mintTitle === "skale" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on SKALE
                                  </span>
                                </div>
                              ) : mintTitle === "manta" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on Manta
                                  </span>
                                </div>
                              ): mintTitle === "taiko" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on Taiko
                                  </span>
                                </div>
                              ) : mintTitle === "coingecko" ||
                                mintTitle === "coin98" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on BNB Chain
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <img
                            src={require(`../../components/TimepieceMint/assets/${selectedMint?.mobileBg}`)}
                            className="smaillmintbg d-block d-xl-none d-xxl-none d-lg-none"
                            alt=""
                          />
                        </div>
                      </div>
                      {mintTitle === "timepiece" ? (
                        <div className="col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2">
                          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                              <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                                <span className="land-name">
                                  Available NFTs to mint:{" "}
                                  <span
                                    className="addr-text"
                                    style={{ color: "rgb(123, 216, 176)" }}
                                  >
                                    {cawsArray.length}
                                  </span>
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
                                    {nftName === "" ? "" : selectedMint?.title}
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
                                      isConnected === true &&
                                      activeButton === true
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
                                      isConnected === true &&
                                      activeButton === true
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
                            {mintTitle === "timepiece" ||
                            mintTitle === "bnbchain" ? (
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
                            ) : mintTitle === "manta" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Manta
                                <img src={mantaLogo} alt="" />
                              </span>
                            ) : mintTitle === "taiko" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Taiko
                                <img src={taikoLogo} alt="" />
                              </span>
                            ) : mintTitle === "avax" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Avalanche Network
                                <img
                                  src={avaxLogo}
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </span>
                            ) : // : mintTitle === "skale" ? (
                            //   <span
                            //     className="limit-span position-relative d-flex align-items-center gap-2"
                            //     style={{ bottom: "0px" }}
                            //   >
                            //     Available only on SEI
                            //     <img src={seiLogo} alt="" />
                            //   </span>
                            // )
                            mintTitle === "bnbchain" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on BNB Chain
                                <img src={bnbLogo} alt="" />
                              </span>
                            ) : mintTitle === "opbnbchain" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on opBNB Chain
                                <img src={bnbLogo} alt="" />
                              </span>
                            ) : mintTitle === "multiversx" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on MultiversX
                                <img src={multiversLogo} alt="" />
                              </span>
                            ) : mintTitle === "coin98" ||
                              mintTitle === "coingecko" ||
                              mintTitle === "kucoin" ||
                              mintTitle === "gate" ? (
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
                                      (isConnected === true &&
                                        chainId !== 1 &&
                                        cawsArray.length === 0) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      mintloading === "error" ||
                                      (isConnected === true &&
                                        chainId === 1 &&
                                        cawsArray.length === 0)
                                        ? "linear-border-disabled"
                                        : "linear-border"
                                    }
                                  >
                                    <button
                                      className={`btn ${
                                        mintloading === "error"
                                          ? "filled-error-btn"
                                          : (isConnected === true &&
                                              chainId !== 1 &&
                                              cawsArray.length === 0) ||
                                            (status !==
                                              "Connect your wallet." &&
                                              status !== "") ||
                                            (isConnected === true &&
                                              chainId === 1 &&
                                              cawsArray.length === 0)
                                          ? "outline-btn-disabled"
                                          : "filled-btn"
                                      }  px-4 w-100`}
                                      onClick={() => {
                                        isConnected === true && chainId === 1
                                          ? handleCreate()
                                          : showWalletConnect();
                                      }}
                                      disabled={
                                        mintloading === "error" ||
                                        mintloading === "success" ||
                                        (isConnected === true &&
                                          chainId !== 1) ||
                                        (status !== "Connect your wallet." &&
                                          status !== "") ||
                                        (isConnected === true &&
                                          chainId === 1 &&
                                          cawsArray.length === 0)
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
                                      {(isConnected === false ||
                                        chainId !== 1) && (
                                        <img
                                          src={
                                            mouseOver === false
                                              ? blackWallet
                                              : whitewallet
                                          }
                                          alt=""
                                          style={{
                                            width: "23px",
                                            height: "23px",
                                          }}
                                        />
                                      )}{" "}
                                      {mintloading === "initial" &&
                                      isConnected === true &&
                                      chainId === 1 ? (
                                        "Mint"
                                      ) : mintloading === "mint" &&
                                        isConnected === true &&
                                        chainId === 1 ? (
                                        <>
                                          <div
                                            className="spinner-border "
                                            role="status"
                                          ></div>
                                        </>
                                      ) : mintloading === "error" &&
                                        isConnected === true &&
                                        chainId === 1 ? (
                                        "Failed"
                                      ) : mintloading === "success" &&
                                        isConnected === true &&
                                        activeButton ===
                                          (isConnected === true &&
                                            chainId === 1) ? (
                                        "Success"
                                      ) : isConnected === true &&
                                        chainId !== 1 ? (
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
                        </div>
                      ) : (
                        <div className="col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2">
                          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                              <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                                <span className="land-name">
                                  Mint your NFT{" "}
                                </span>
                              </div>
                            </div>
                            {confluxLive === false ? (
                              <>
                                <div
                                  className="dark-wrapper d-flex flex-column gap-2 py-5 align-items-center justify-content-center p-2"
                                  style={{ position: "relative", top: "20px" }}
                                >
                                  <span className="mb-0 latest-mint">
                                    Minting opens in
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <Countdown
                                      date={countToLiveConflux}
                                      onComplete={() => setConfluxLive(true)}
                                      renderer={renderer}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="dark-wrapper d-flex align-items-center justify-content-between p-4"
                                  style={{ visibility: "hidden" }}
                                ></div>
                              </>
                            ) : (
                              <>
                                <div className="dark-wrapper d-flex align-items-center justify-content-between p-2">
                                  <span className="mb-0 latest-mint">
                                    Available to Mint
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <h6 className="latest-mint-number mb-0">
                                      {mintTitle === "core"
                                        ? coreMintAllowed
                                        : mintTitle === "viction"
                                        ? victionMintAllowed
                                        : mintTitle === "bnbchain"
                                        ? bnbMintAllowed
                                        : mintTitle === "manta"
                                        ? mantaMintAllowed
                                        : mintTitle === "taiko"
                                        ? taikoMintAllowed
                                        : mintTitle === "multiversx"
                                        ? 1
                                        : mintTitle === "immutable"
                                        ? immutableMintAllowed
                                        : 0}{" "}
                                      NFT
                                    </h6>
                                  </div>
                                </div>
                                <div className="dark-wrapper d-flex align-items-center justify-content-between p-2">
                                  <span className="mb-0 latest-mint">
                                    Minting ends in
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <Countdown
                                      date={
                                        mintTitle === "core"
                                          ? countToExpireConflux
                                          : mintTitle === "manta"
                                          ? countToExpireManta
                                          : mintTitle === "immutable"
                                          ? countToExpireImmutable
                                          : mintTitle === "taiko"
                                          ? countToExpireTaiko
                                          : countToExpireOpbnb
                                      }
                                      renderer={renderer2}
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <span className="latest-mint-currency mb-0">
                              *Important: You can only mint one{" "}
                              {selectedMint.title} NFT per wallet.
                            </span>
                            <hr className="gray-divider" />
                            <span
                              className="limit-span position-relative d-flex align-items-center gap-2"
                              style={{ bottom: "0px" }}
                            >
                              Available only on{" "}
                              {mintTitle === "core"
                                ? "CORE"
                                : mintTitle === "viction"
                                ? "Viction"
                                : mintTitle === "immutable"
                                ? "Immutable"
                                : mintTitle === "multiversx"
                                ? "MultiversX"
                                : mintTitle === "bnbchain"
                                ? "BNB Chain"
                                : mintTitle === "opbnbchain"
                                ? "opBNB Chain"
                                : mintTitle === "manta"
                                ? "Manta"
                                : mintTitle === "taiko"
                                ? "Taiko"
                                : "SEI"}
                              <img
                                style={{ width: 24, height: 24 }}
                                src={
                                  mintTitle === "multiversx"
                                    ? multiversLogo
                                    : mintTitle === "sei"
                                    ? seiLogo
                                    : mintTitle === "viction"
                                    ? victionLogo
                                    : mintTitle === "core"
                                    ? coreLogo
                                    : mintTitle === "immutable"
                                    ? immutableLogo
                                    : mintTitle === "manta"
                                    ? mantaLogo
                                    : mintTitle === "taiko"
                                    ? taikoLogo
                                    : mintTitle === "bnbchain" ||
                                      mintTitle === "opbnbchain"
                                    ? bnbLogo
                                    : seiLogo
                                }
                                alt=""
                              />
                            </span>
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
                            <hr className="gray-divider" />
                            <div className="d-flex w-100 justify-content-center">
                              {selectedMint.id === "bnb" && (
                                <div
                                  className={
                                    (isConnected === true && chainId !== 56) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    bnbMintAllowed === 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 56) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          bnbMintAllowed === 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 56
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 56) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      bnbMintAllowed === 0
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
                                    {(isConnected === false ||
                                      chainId !== 56) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
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
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 56 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 56) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 56 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "opbnb" && (
                                <div
                                  className={
                                    (isConnected === true && chainId !== 204) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    opbnbMintAllowed === 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 204) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          opbnbMintAllowed === 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 204
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 204) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      opbnbMintAllowed === 0
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
                                    {(isConnected === false ||
                                      chainId !== 204) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 204 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 204 ? (
                                      <>
                                        <div
                                          className="spinner-border "
                                          role="status"
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 204 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 204) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 204 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "core" && (
                                <div
                                  className={
                                    (isConnected === true &&
                                      chainId !== 1116) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalCoreNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 1116) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalCoreNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 1116
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 1116) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalCoreNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 1116) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 1116 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 1116 ? (
                                      <>
                                        <div
                                          className="spinner-border"
                                          role="status"
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 1116 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 1116) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 1116 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "viction" && (
                                <div
                                  className={
                                    (isConnected === true && chainId !== 88) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalVictionNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 88) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalVictionNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 88
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 88) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalVictionNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 88) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 88 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 88 ? (
                                      <>
                                        <div
                                          className="spinner-border"
                                          role="status"
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 88 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 88) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 88 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "sei" && (
                                <div
                                  className={
                                    (isConnected === true &&
                                      chainId !== 713715) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalseiNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 713715) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalseiNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 713715
                                        ? handleBaseNftMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 713715) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalseiNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 713715) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 713715 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 713715 ? (
                                      <>
                                        <div
                                          className="spinner-border "
                                          role="status"
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 713715 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 713715) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 713715 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "immutable" && (
                                <div
                                  className={
                                    (isConnected === true &&
                                      chainId !== 13371) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalImmutableNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 13371) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalImmutableNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 13371
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 13371) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalImmutableNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 13371) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 13371 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 13371 ? (
                                      <>
                                        <div
                                          className="spinner-border "
                                          role="status"
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 13371 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 13371) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 13371 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "multiversx" && (
                                <div
                                  className={
                                    (isConnected === true && chainId !== 1) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalMultiversNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 1) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalMultiversNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 1
                                        ? handleBaseNftMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true && chainId !== 1) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalMultiversNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 1) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 1 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 1 ? (
                                      <>
                                        <div
                                          className="spinner-border "
                                          role="status"
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 1 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 1) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 1 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                              {selectedMint.id === "manta" && (
                                <div
                                  className={
                                    (isConnected === true && chainId !== 169) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    totalMantaNft > 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 169) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          totalMantaNft > 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 169
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 169) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      totalMantaNft > 0
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
                                    {(isConnected === false ||
                                      chainId !== 169) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 169 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 169 ? (
                                      <>
                                        <div
                                          className="spinner-border"
                                          role="status"
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 169 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 169) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 169 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}

{selectedMint.id === "taiko" && (
                                <div
                                  className={
                                    "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn 
                                  filled-btn
                                      px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true
                                        ? handleMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                     false
                                    }
                                    onMouseEnter={() => {
                                      setMouseOver(true);
                                    }}
                                    onMouseLeave={() => {
                                      setMouseOver(false);
                                    }}
                                  >
                                    {(isConnected === false ||
                                      chainId !== 167000) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 167000 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 167000 ? (
                                      <>
                                        <div
                                          className="spinner-border"
                                          role="status"
                                          style={{
                                            height: "1.5rem",
                                            width: "1.5rem",
                                          }}
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 167000 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 167000) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 167000 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}

                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {activeTab === "upcoming" && (
                // <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                //   <div className="d-flex flex-column align-items-center gap-2">
                //     <h6 className="upcoming-stake">Mints are coming...</h6>
                //     <span className="upcoming-stake-desc">
                //       Check back soon!
                //     </span>
                //   </div>
                // </div>
                <div className="d-flex flex-column gap-4">
                    {/* <div className="upcoming-mint-wrapper upcoming-taiko-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Taiko Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by Taiko
                      </p>
                    </div>
                    <img
                      src={taikoBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={taikoMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}
                  <div className="upcoming-mint-wrapper upcoming-manta-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Manta Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by Manta
                      </p>
                    </div>
                    <img
                      src={mantaBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={mantaMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>
                
                  {/* <div className="upcoming-mint-wrapper upcoming-immutable-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">Immutable Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by Immutable
                      </p>
                    </div>
                    <img
                      src={immutableBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={immutableMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div> */}
                

                  <div className="upcoming-mint-wrapper upcoming-sei-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">SEI Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by SEI
                      </p>
                    </div>
                    <img
                      src={seiBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={seiMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>

                  <div className="upcoming-mint-wrapper upcoming-multivers-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                      <h6 className="upcoming-mint-title">
                        MultiversX Beta Pass
                      </h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by
                        MultiversX
                      </p>
                    </div>
                    <img
                      src={multiversBg}
                      alt=""
                      className="upcoming-mint-img d-none d-lg-block"
                    />
                    <img
                      src={multiversMobileBg}
                      alt=""
                      className="upcoming-mint-img d-block d-lg-none d-md-none"
                    />
                  </div>
                </div>

                // <div className="d-flex flex-column gap-4">
                //   {/* <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Conflux Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Conflux
                //       </p>
                //     </div>
                //     <img
                //       src={confluxUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>

                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         CoinGecko Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by
                //         CoinGecko
                //       </p>
                //     </div>
                //     <img
                //       src={coingeckoUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div> */}

                // </div>
                // <div className="d-flex flex-column gap-4">
                //   <div className="upcoming-mint-wrapper-conflux upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Conflux Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Conflux
                //       </p>
                //     </div>
                //     <img
                //       src={confluxUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   {/* <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Coin98 Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Coin98
                //       </p>
                //     </div>
                //     <img
                //       src={coin98Upcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         CoinGecko Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by
                //         CoinGecko
                //       </p>
                //     </div>
                //     <img
                //       src={coingeckoUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Base Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted on Base
                //         Network
                //       </p>
                //     </div>
                //     <img
                //       src={baseUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div> */}
                // </div>
              )}
              {activeTab === "past" && (
                <div className="row w-100 align-items-center gap-4 gap-lg-0 px-0">
                  <div className="col-12 col-lg-6">
                    <div className="past-land-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper">
                        <h6 className="past-mint-title">Genesis Land</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-land-mint-amount">1,000</h6>
                          <span className="past-land-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="past-caws-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">
                          Cats and Watches Society
                        </h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-caws-mint-amount">10,000</h6>
                          <span className="past-caws-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-conflux-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper">
                        <h6 className="past-mint-title">Conflux Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-conflux-mint-amount">
                            {getFormattedNumber(confluxSold, 0)}
                          </h6>
                          <span className="past-conflux-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-base-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Base Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-base-mint-amount">
                            {getFormattedNumber(baseSold, 0)}
                          </h6>
                          <span className="past-conflux-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-skale-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">SKALE Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-skale-mint-amount">
                            {getFormattedNumber(skaleSold, 0)}
                          </h6>
                          <span className="past-skale-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-bnb-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">BNB Chain Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-bnb-mint-amount">
                            {getFormattedNumber(bnbNftsSold, 0)}
                          </h6>
                          <span className="past-bnb-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-viction-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">VICTION Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6
                            className="past-bnb-mint-amount"
                            style={{ color: "#901C77" }}
                          >
                            {getFormattedNumber(victionNftsSold,0)}
                          </h6>
                          <span className="past-bnb-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-core-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">CORE Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6
                            className="past-core-mint-amount"
                          >
                            {getFormattedNumber(coreNftsSold,0)}
                          </h6>
                          <span className="past-core-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-opbnb-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">opBNB Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6
                            className="past-bnb-mint-amount"
                          >
                            {getFormattedNumber(opbnbNftsSold,0)}
                          </h6>
                          <span className="past-bnb-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-immutable-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Immutable Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6
                            className="past-immutable-mint-amount"
                          >
                            {getFormattedNumber(immutableNftsSold,0)}
                          </h6>
                          <span className="past-immutable-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {viewCollection === true && (
        <TimepieceChecklistModal
          coinbase={coinbase}
          isConnected={isConnected}
          onClose={() => {
            setViewCollection(false);
          }}
          nftItem={
            selectedMint.id === "timepiece"
              ? timepieceMetadata
              : mybaseNFTsCreated
          }
          open={viewCollection}
          type={selectedMint.id}
        />
      )}
    </>
  );
};

export default MarketMint;
