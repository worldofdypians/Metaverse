import React, { useRef, useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Countdown from "react-countdown";
import getFormattedNumber from "../Account/src/Utils.js/hooks/get-formatted-number";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import EventSliderCard from "./components/EventSliderCard";
import TimepieceChecklistModal from "../Timepiece/TimepieceChecklistModal";
import Slider from "react-slick";

const renderer = ({ days, hours, minutes }) => {
  return (
    <h6 className="latest-mint-number mb-0">
      {hours} hours : {minutes} minutes
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
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  binanceWallet,
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
  totalseiNft,
  myseiNfts,
  totalMantaNft,
  mantaMintAllowed,
  myMantaNfts,
  myMantaNFTsCreated,
  totalMatNfts,
  totalVanarNfts,
  myVanarNFTs,
  matMintAllowed,
  myMatNFTs,
  myMatNFTsCreated,
  seiMintAllowed,
  myKucoinNfts,
  myOpbnbNfts,
  totalOpbnbNft,
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
  const kucoinData = {
    id: "kucoin",
    cardTitle: "KuCoin Beta Pass",
    title: "KuCoin Beta Pass",
    background: "kucoin-mint-bg",
    mobileBg: "kucoinMobileBg.png",
  };
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
    id: "opbnbchain",
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

  const vanarData = {
    id: "vanar",
    cardTitle: "Vanar Beta Pass",
    title: "Vanar Beta Pass",
    background: "vanar-mint-bg",
    mobileBg: "vanarMobileBg.webp",
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
  const [taikoNftsSold, setTaikoNftsSold] = useState(0);
  const [seiNftsSold, setSeiNftsSold] = useState(0);
  const [kucoinNftsSold, setKucoinNftsSold] = useState(0);
  const [vanarNftsSold, setVanarNftsSold] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [showFirstNext, setShowFirstNext] = useState(0);
  const [selectedMint, setSelectedMint] = useState(timepieceData);
  const [mintTitle, setMintTitle] = useState("timepiece");
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

    const kucoinnftContract = new window.opBnbWeb3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_kucoin_address
    );

    const vanarContract = new window.vanarWeb3.eth.Contract(
      window.VANAR_NFT_ABI,
      window.config.nft_vanar_address
    );

    const vanarresult = await vanarContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setVanarNftsSold(vanarresult);
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
      window.config.nft_viction_address.toLowerCase()
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

    const taikonftContract = new window.taikoWeb3.eth.Contract(
      window.TAIKO_NFT_ABI,
      window.config.nft_taiko_address
    );

    const taikoresult = await taikonftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setTaikoNftsSold(taikoresult);

    const seiftContract = new window.seiWeb3.eth.Contract(
      window.SEI_NFT_ABI,
      window.config.nft_sei_address
    );

    const seiresult = await seiftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setSeiNftsSold(seiresult);

    const kucoinresult = await kucoinnftContract.methods
      .totalSupply()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setKucoinNftsSold(kucoinresult);
  };

  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      window.alertify.error("Please connect to another EVM wallet.");
    } else {
      if (window.ethereum) {
        if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
          await handleSwitchNetworkhook("0x1")
            .then(() => {
              handleSwitchNetwork(1);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
          handleSwitchChainGateWallet(1);
        } else if (binanceWallet && window.WALLET_TYPE === "binance") {
          handleSwitchChainBinanceWallet(1);
        }
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(1);
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    }
  };

  const handleOpBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook("0xcc")
          .then(() => {
            handleSwitchNetwork(204);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(204);
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(204);
      }
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(204);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleVanarPool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x7f8")
            .then(() => {
              handleSwitchNetwork(2040);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error("This network is not available on Binance Wallet");
    }
  };

  const handleSeiPool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x531")
            .then(() => {
              handleSwitchNetwork(1329);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error("This network is not available on Binance Wallet");
    }
  };

  const handleTaikoPool = async () => {
    if (window.WALLET_TYPE !== "binance") {
      if (window.ethereum) {
        if (!window.gatewallet) {
          await handleSwitchNetworkhook("0x28c58")
            .then(() => {
              handleSwitchNetwork(167000);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (window.ethereum?.isBinance) {
          window.alertify.error(
            "This network is not available on Binance Wallet"
          );
        }
      } else {
        window.alertify.error("No web3 detected. Please install Metamask!");
      }
    } else {
      window.alertify.error("This network is not available on Binance Wallet");
    }
  };

  useEffect(() => {
    if (
      location.pathname.includes("bnbchain") &&
      !location.pathname.includes("opbnbchain")
    ) {
      setSelectedMint(bnbData);
      setMintTitle("bnbchain");
    }
    // else if (location.pathname.includes("opbnbchain")) {
    //   setSelectedMint(opbnbData);
    //   setMintTitle("opbnbchain");
    // }
    else if (location.pathname.includes("timepiece")) {
      setSelectedMint(timepieceData);
      setMintTitle("timepiece");
    } else if (location.pathname.includes("immutable")) {
      setSelectedMint(immutableData);
      setMintTitle("immutable");
    } else if (location.pathname.includes("manta")) {
      setSelectedMint(mantaData);
      setMintTitle("manta");
    } else if (location.pathname.includes("taiko")) {
      setSelectedMint(taikoData);
      setMintTitle("taiko");
    } else if (location.pathname.includes("sei")) {
      setSelectedMint(seiData);
      setMintTitle("sei");
    } else if (location.pathname.includes("kucoin")) {
      setSelectedMint(kucoinData);
      setMintTitle("kucoin");
    }
    // else if (location.pathname.includes("vanar")) {
    //   setSelectedMint(vanarData);
    //   setMintTitle("vanar");
    // }
    getTotalSupply();
  }, [location]);

  useEffect(() => {
    html.classList.remove("hidescroll");
  }, []);

  let countToExpiresei = new Date("2025-05-23T14:00:00.000+02:00");
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
    //   img: "https://cdn.worldofdypians.com/wod/kucoinMobileBanner.png",
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
    //   id: "sei",
    //   desc: "Gain entry to metaverse, and join exclusive SEI event with special ticket.",
    //   img: 'https://cdn.worldofdypians.com/wod/seiMintActive.webp',
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
    //   img: "https://cdn.worldofdypians.com/wod/opbnbactive.webp",
    //   data: opbnbData,
    //   class: "mint-bnb",
    //   id: "opbnbchain",
    // },
    // {
    //   title: "Taiko Pass",
    //   eventId: "taiko",
    //   desc: "Gain entry to metaverse, and join exclusive Taiko event with special ticket.",
    //   img: taikoActive,
    //   data: taikoData,
    //   class: "mint-taiko",
    //   id: "taiko",
    // },

    // {
    //   title: "Matchain Pass",
    //   eventId: "matchain",
    //   desc: "Gain entry to metaverse, and join exclusive Matchain event with special ticket.",
    //   img: "https://cdn.worldofdypians.com/wod/matchainMintActive.webp",
    //   data: matData,
    //   class: "mint-matchain",
    //   id: "mat",
    // },

    // {
    //   title: "Immutable Pass",
    //   eventId: "immutable",
    //   desc: "Gain entry to metaverse, and join exclusive Immutable event with special ticket.",
    //   img: immutableActive,
    //   data: immutableData,
    //   class: "mint-immutable",
    // },
    // {
    //   title: "Vanar Pass",
    //   eventId: "vanar",
    //   desc: "Gain entry to metaverse, and join exclusive Vanar event with special ticket.",
    //   img: "https://cdn.worldofdypians.com/wod/vanarMintSlide.webp",
    //   data: vanarData,
    //   class: "mint-core",
    //   id: "vanar",
    // },
    {
      title: "CAWS Timepiece",
      eventId: "timepiece",
      desc: "Access the metaverse, experience enhanced interactions, and enjoy diverse benefits.",
      img: "https://cdn.worldofdypians.com/wod/timepieceMintActive.png",
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
        } else if (selectedMint.id === "mat") {
          if (chainId !== 698) {
            setactiveButton(false);
            setStatus("Switch to Matchain to continue minting.");
          } else if (chainId === 698) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (
          selectedMint.id === "opbnbchain" ||
          selectedMint.id === "kucoin"
        ) {
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
        } else if (selectedMint.id === "sei") {
          if (chainId !== 1329) {
            setactiveButton(false);
            setStatus("Switch to Sei to continue minting.");
          } else if (chainId === 1329) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "vanar") {
          if (chainId !== 2040) {
            setactiveButton(false);
            setStatus("Switch to Vanar to continue minting.");
          } else if (chainId === 2040) {
            setactiveButton(true);
            setStatus("");
          }
        }
      }
    }
  }, [isConnected, chainId, coinbase, selectedMint]);

  useEffect(() => {
    getTimepieceLatestMint();
    // getConfluxLatestMint();
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
    }
  }, [coinbase, chainId, isConnected, totalCreated, selectedMint]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Mint";
  }, []);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end p-0 mt-lg-5 pt-lg-5"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
        <div
          className="container-nft2 d-flex  align-items-start px-3 px-lg-5 position-relative"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row justify-content-center align-items-center w-100 mx-0 px-3 py-3 p-lg-0 gap-5 gap-lg-0">
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
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                            }
                            alt=""
                          />
                        </div>
                      )}
                      {showFirstNext === activeSlide
                        ? null
                        : dummyCards.length > sliderCut && (
                            <div className="next-arrow-nft" onClick={firstNext}>
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                                }
                                alt="1"
                              />
                            </div>
                          )}
                      {windowSize.width < 480 && (
                        <>
                          <div className="prev-arrow-nft" onClick={firstPrev}>
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="next-arrow-nft" onClick={firstNext}>
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                              }
                              alt="1"
                            />
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
                              setMintTitle(item.id);
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

                            {/* {showBadge &&
                              myMantaNFTsCreated.length > 0 &&
                              selectedMint.id === "manta" && (
                                <div className="totalcreated">
                                  <span>{myMantaNFTsCreated.length}</span>
                                </div>
                              )} */}

                            {showBadge &&
                              myMatNFTs.length > 0 &&
                              selectedMint.id === "mat" && (
                                <div className="totalcreated">
                                  <span>{myMatNFTs.length}</span>
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
                                  : selectedMint.id === "mat" &&
                                    totalMatNfts > 0
                                  ? "mat-active"
                                  : selectedMint.id === "opbnbchain" &&
                                    totalOpbnbNft > 0
                                  ? "opbnb-active"
                                  : selectedMint.id === "vanar" &&
                                    totalVanarNfts > 0
                                  ? "vanar-active"
                                  : selectedMint.id === "mat" &&
                                    totalMatNfts === 0
                                  ? "conflux-empty"
                                  : selectedMint.id === "manta" &&
                                    totalMantaNft > 0
                                  ? "manta-active"
                                  : selectedMint.id === "kucoin" &&
                                    myKucoinNfts.length > 0
                                  ? "kucoin-active"
                                  : "conflux-empty"
                              } d-flex justify-content-center align-items-center p-3 position-relative`}
                              style={{ height: 312 }}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/dummyBadge.png"
                                }
                                className="genesis-badge"
                                style={{ visibility: "hidden" }}
                                alt="badge"
                              />
                            </div>
                            <div
                              className="genesis-desc position-relative"
                              style={{ bottom: "5px" }}
                            >
                              <h6
                                className="font-montserrat land-desc"
                                style={{ fontSize: 25 }}
                              >
                                {selectedMint?.cardTitle}
                              </h6>
                            </div>
                          </div>

                          {selectedMint.id === "timepiece" && (
                            <button
                              className={`py-2 ${
                                isConnected === false ||
                                activeButton === false ||
                                totalCreated === 0
                                  ? "outline-btn-disabled"
                                  : "stake-wod-btn"
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
                          )}

                          {selectedMint.id === "kucoin" && (
                            <NavLink
                              className={`py-2 ${
                                isConnected === false ||
                                activeButton === false ||
                                myKucoinNfts.length === 0
                                  ? "outline-btn-disabled"
                                  : "stake-wod-btn"
                              } px-5 w-100`}
                              disabled={
                                isConnected === false ||
                                activeButton === false ||
                                myKucoinNfts.length === 0
                              }
                              to={`/shop/nft/${myKucoinNfts[0]}/${window.config.nft_kucoin_address}`}
                              onClick={() => {
                                updateViewCount(
                                  myKucoinNfts[0],
                                  window.config.nft_kucoin_address
                                );
                              }}
                            >
                              View NFT
                            </NavLink>
                          )}

                          {selectedMint.id === "opbnbchain" && (
                            <NavLink
                              className={`py-2 ${
                                isConnected === false ||
                                activeButton === false ||
                                myOpbnbNfts.length === 0
                                  ? "outline-btn-disabled"
                                  : "stake-wod-btn"
                              } px-5 w-100`}
                              disabled={
                                isConnected === false ||
                                activeButton === false ||
                                myOpbnbNfts.length === 0
                              }
                              to={`/shop/nft/${myOpbnbNfts[0]}/${window.config.nft_opbnb_address}`}
                              onClick={() => {
                                updateViewCount(
                                  myOpbnbNfts[0],
                                  window.config.nft_opbnb_address
                                );
                              }}
                            >
                              View NFT
                            </NavLink>
                          )}

                          {selectedMint.id === "vanar" && (
                            <NavLink
                              className={`py-2 ${
                                isConnected === false ||
                                activeButton === false ||
                                myVanarNFTs.length === 0
                                  ? "outline-btn-disabled"
                                  : "stake-wod-btn"
                              } px-5 w-100`}
                              disabled={
                                isConnected === false ||
                                activeButton === false ||
                                myVanarNFTs.length === 0
                              }
                              to={`/shop/nft/${myVanarNFTs[0]}/${window.config.nft_vanar_address}`}
                              onClick={() => {
                                updateViewCount(
                                  myVanarNFTs[0],
                                  window.config.nft_vanar_address
                                );
                              }}
                            >
                              View NFT
                            </NavLink>
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
                              {benefits.map((item, index) => (
                                <div
                                  className="d-flex align-items-center gap-2"
                                  key={index}
                                >
                                  <img
                                    src={`https://cdn.worldofdypians.com/wod/${item.icon}.png`}
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
                              {mintTitle === "manta" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/blockChainIcon.svg"
                                    }
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on Manta
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <img
                            src={`https://cdn.worldofdypians.com/wod/${selectedMint?.mobileBg}`}
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
                                      ? "https://cdn.worldofdypians.com/wod/subtractActive.svg"
                                      : "https://cdn.worldofdypians.com/wod/subtractInactive.svg"
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
                                      ? "https://cdn.worldofdypians.com/wod/addActive.svg"
                                      : "https://cdn.worldofdypians.com/wod/addInactive.svg"
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
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "manta" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Manta
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/manta.png"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "taiko" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Taiko
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/taiko.svg"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "avax" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Avalanche Network
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                                  }
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
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "opbnbchain" ||
                              mintTitle === "kucoin" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on opBNB Chain
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "multiversx" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on MultiversX
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/multiversx.svg"
                                  }
                                  alt=""
                                />
                              </span>
                            ) : mintTitle === "coin98" ||
                              mintTitle === "coingecko" ||
                              mintTitle === "kucoin" ||
                              mintTitle === "gate" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on opBNB Chain
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                  }
                                  alt=""
                                />
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
                                  <button
                                    className={`py-2 ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : isConnected === true &&
                                          cawsArray.length === 0 &&
                                          chainId === 1
                                        ? "outline-btn-disabled"
                                        : "stake-wod-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true && chainId === 1
                                        ? handleCreate()
                                        : isConnected === true && chainId !== 1
                                        ? handleEthPool()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        cawsArray.length === 0 &&
                                        chainId === 1)
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
                                    {isConnected === false && (
                                      <img
                                        src={
                                          mouseOver === true
                                            ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                            : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                          style={{
                                            height: "1rem",
                                            width: "1rem",
                                          }}
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

                            <>
                              <div className="dark-wrapper d-flex align-items-center justify-content-between p-2">
                                <span className="mb-0 latest-mint">
                                  Available to Mint
                                </span>
                                <div className="d-flex align-items-center gap-2">
                                  <h6 className="latest-mint-number mb-0">
                                    {mintTitle === "vanar"
                                      ? totalVanarNfts > 0
                                        ? 0
                                        : 1
                                      : mintTitle === "opbnbchain"
                                      ? myOpbnbNfts.length > 0
                                        ? 0
                                        : 1
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
                                    date={countToExpiresei}
                                    renderer={renderer2}
                                  />
                                </div>
                              </div>
                            </>
                            {/* )} */}

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
                              {mintTitle === "opbnbchain"
                                ? "opBnb Chain"
                                : "Vanar"}
                              <img
                                style={{ width: 24, height: 24 }}
                                src={
                                  mintTitle === "opbnbchain"
                                    ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                                    : "https://cdn.worldofdypians.com/wod/vanar.svg"
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
                              {selectedMint.id === "sei" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "fail-button"
                                      : (isConnected === true &&
                                          chainId !== 1329) ||
                                        (status !== "Connect your wallet." &&
                                          status !== "") ||
                                        totalseiNft > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 1329
                                      ? handleMint()
                                      : isConnected === true && chainId !== 1329
                                      ? handleSeiPool()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    (isConnected === true &&
                                      chainId !== 1329) ||
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
                                  {isConnected === false && (
                                    <img
                                      src={
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                  chainId === 1329 ? (
                                    "Mint"
                                  ) : mintloading === "mint" &&
                                    isConnected === true &&
                                    chainId === 1329 ? (
                                    <>
                                      <div
                                        className="spinner-border "
                                        role="status"
                                        style={{
                                          height: "1rem",
                                          width: "1rem",
                                        }}
                                      ></div>
                                    </>
                                  ) : mintloading === "error" &&
                                    isConnected === true &&
                                    chainId === 1329 ? (
                                    "Failed"
                                  ) : mintloading === "success" &&
                                    isConnected === true &&
                                    activeButton ===
                                      (isConnected === true &&
                                        chainId === 1329) ? (
                                    "Success"
                                  ) : isConnected === true &&
                                    chainId !== 1329 ? (
                                    " Switch Chain"
                                  ) : (
                                    "Connect wallet"
                                  )}
                                </button>
                              )}
                              {selectedMint.id === "opbnbchain" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "fail-button"
                                      : myOpbnbNfts.length > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 204
                                      ? handleMint()
                                      : isConnected === true && chainId !== 204
                                      ? handleOpBnbPool()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    mintloading === "mint" ||
                                    myOpbnbNfts.length > 0
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
                                  {isConnected === false && (
                                    <img
                                      src={
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                          height: "1rem",
                                          width: "1rem",
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
                              )}
                              {selectedMint.id === "kucoin" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "fail-button"
                                      : myKucoinNfts.length > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 204
                                      ? handleMint()
                                      : isConnected === true && chainId !== 204
                                      ? handleOpBnbPool()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    mintloading === "mint" ||
                                    myKucoinNfts.length > 0
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
                                  {isConnected === false && (
                                    <img
                                      src={
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                          height: "1rem",
                                          width: "1rem",
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
                              )}

                              {selectedMint.id === "mat" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "filled-error-btn"
                                      : (isConnected === true &&
                                          chainId !== 698) ||
                                        (status !== "Connect your wallet." &&
                                          status !== "") ||
                                        totalMatNfts > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 698
                                      ? handleMint()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    (isConnected === true && chainId !== 698) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    totalMatNfts > 0
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
                                    chainId !== 698) && (
                                    <img
                                      src={
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                  chainId === 698 ? (
                                    "Mint"
                                  ) : mintloading === "mint" &&
                                    isConnected === true &&
                                    chainId === 698 ? (
                                    <>
                                      <div
                                        className="spinner-border "
                                        role="status"
                                        style={{
                                          height: "1rem",
                                          width: "1rem",
                                        }}
                                      ></div>
                                    </>
                                  ) : mintloading === "error" &&
                                    isConnected === true &&
                                    chainId === 698 ? (
                                    "Failed"
                                  ) : mintloading === "success" &&
                                    isConnected === true &&
                                    activeButton ===
                                      (isConnected === true &&
                                        chainId === 698) ? (
                                    "Success"
                                  ) : isConnected === true &&
                                    chainId !== 698 ? (
                                    " Switch Chain"
                                  ) : (
                                    "Connect wallet"
                                  )}
                                </button>
                              )}

                              {selectedMint.id === "manta" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "filled-error-btn"
                                      : (isConnected === true &&
                                          chainId !== 169) ||
                                        (status !== "Connect your wallet." &&
                                          status !== "") ||
                                        totalMantaNft > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 169
                                      ? handleMint()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    (isConnected === true && chainId !== 169) ||
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
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                          height: "1rem",
                                          width: "1rem",
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
                              )}
                              {selectedMint.id === "vanar" && (
                                <button
                                  className={`py-2 ${
                                    mintloading === "error"
                                      ? "fail-button"
                                      : myVanarNFTs.length > 0
                                      ? "outline-btn-disabled"
                                      : "stake-wod-btn"
                                  }  px-4 w-100`}
                                  onClick={() => {
                                    isConnected === true && chainId === 2040
                                      ? handleMint()
                                      : isConnected === true && chainId !== 2040
                                      ? handleVanarPool()
                                      : showWalletConnect();
                                  }}
                                  disabled={
                                    mintloading === "error" ||
                                    mintloading === "success" ||
                                    mintloading === "mint" ||
                                    myVanarNFTs.length > 0
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
                                  {isConnected === false && (
                                    <img
                                      src={
                                        mouseOver === true
                                          ? "https://cdn.worldofdypians.com/wod/wallet-black.svg"
                                          : "https://cdn.worldofdypians.com/wod/wallet-white.svg"
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
                                  chainId === 2040 ? (
                                    "Mint"
                                  ) : mintloading === "mint" &&
                                    isConnected === true &&
                                    chainId === 2040 ? (
                                    <>
                                      <div
                                        className="spinner-border "
                                        role="status"
                                        style={{
                                          height: "1rem",
                                          width: "1rem",
                                        }}
                                      ></div>
                                    </>
                                  ) : mintloading === "error" &&
                                    isConnected === true &&
                                    chainId === 2040 ? (
                                    "Failed"
                                  ) : mintloading === "success" &&
                                    isConnected === true &&
                                    activeButton ===
                                      (isConnected === true &&
                                        chainId === 2040) ? (
                                    "Success"
                                  ) : isConnected === true &&
                                    chainId !== 2040 ? (
                                    " Switch Chain"
                                  ) : (
                                    "Connect wallet"
                                  )}
                                </button>
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
                <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <h6 className="upcoming-stake">Mints are coming...</h6>
                    <span className="upcoming-stake-desc">
                      Check back soon!
                    </span>
                  </div>
                </div>

                // <div className="upcoming-mint-wrapper upcoming-vanar-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //   <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //     <h6 className="upcoming-mint-title">Vanar Beta Pass</h6>
                //     <p className="upcoming-mint-desc">
                //       Get access to a special ticket to enter the metaverse and
                //       participate in an exclusive event hosted by Vanar
                //     </p>
                //   </div>
                //   <img
                //     src={"https://cdn.worldofdypians.com/wod/vanarEventBg.webp"}
                //     alt=""
                //     className="upcoming-mint-img d-none d-lg-block"
                //   />
                //   <img
                //     src={
                //       "https://cdn.worldofdypians.com/wod/vanarMintMobileBg.webp"
                //     }
                //     alt=""
                //     className="upcoming-mint-img d-block d-lg-none d-md-none"
                //   />
                // </div>
                //   <div className="upcoming-mint-wrapper upcoming-matchain-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         Matchain Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Matchain
                //       </p>
                //     </div>
                //     <img
                //       src={'https://cdn.worldofdypians.com/wod/matchainMintBg.webp'}
                //       alt=""
                //       className="upcoming-mint-img d-none d-lg-block"
                //     />
                //     <img
                //       src={"https://cdn.worldofdypians.com/wod/matchainMintActive.webp"}
                //       alt=""
                //       className="upcoming-mint-img d-block d-lg-none d-md-none"
                //     />
                //   </div>

                //   <div className="upcoming-mint-wrapper upcoming-multivers-event d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         MultiversX Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by
                //         MultiversX
                //       </p>
                //     </div>
                //     <img
                //       src={'https://cdn.worldofdypians.com/wod/multiversMintBg.webp'}
                //       alt=""
                //       className="upcoming-mint-img d-none d-lg-block"
                //     />
                //     <img
                //       src={'https://cdn.worldofdypians.com/wod/multiversMintActive.webp'}
                //       alt=""
                //       className="upcoming-mint-img d-block d-lg-none d-md-none"
                //     />
                //   </div>
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
                            {getFormattedNumber(victionNftsSold, 0)}
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
                          <h6 className="past-core-mint-amount">
                            {getFormattedNumber(coreNftsSold, 0)}
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
                          <h6 className="past-bnb-mint-amount">
                            {getFormattedNumber(opbnbNftsSold, 0)}
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
                          <h6 className="past-immutable-mint-amount">
                            {getFormattedNumber(immutableNftsSold, 0)}
                          </h6>
                          <span className="past-immutable-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-taiko-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Taiko Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-taiko-mint-amount">
                            {getFormattedNumber(taikoNftsSold, 0)}
                          </h6>
                          <span className="past-taiko-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-sei-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">SEI Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-sei-mint-amount">
                            {getFormattedNumber(seiNftsSold, 0)}
                          </h6>
                          <span className="past-sei-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-kucoin-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">KuCoin Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-kucoin-mint-amount">
                            {getFormattedNumber(kucoinNftsSold, 0)}
                          </h6>
                          <span className="past-kucoin-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-vanar-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Vanar Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-vanar-mint-amount">
                            {getFormattedNumber(vanarNftsSold, 0)}
                          </h6>
                          <span className="past-vanar-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-vanar-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Vanar Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-vanar-mint-amount">
                            {getFormattedNumber(kucoinNftsSold, 0)}
                          </h6>
                          <span className="past-vanar-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
