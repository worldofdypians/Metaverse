import React, { useEffect, useRef, useState } from "react";
import "./_marketplace.scss";
import ItemCard from "../../components/ItemCard/ItemCard";
import { NavLink } from "react-router-dom";

import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import Slider from "react-slick";
import axios from "axios";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import StakeLandModal from "../../components/StakeModal/StakeLandModal";
import moment from "moment";
import { Skeleton } from "@mui/material";

import NewChallenges from "../Game/NewChallenges";

const Marketplace = ({
  listedNFTS,
  isConnected,
  handleConnect,
  totalListed,
  latest20RecentListedNFTS,
  totalBoughtNFTSCount,
  coinbase,
  recentSales,
  nftCount,
  ethTokenData,
  totalTx,
  totalvolume,
  totalSupply,
  binanceW3WProvider,
  chainId,
  wodHolders,
  totalVolumeNew,
  loadingRecentListings,
  loadingRecentSales,
  monthlyPlayers,
  hasNft,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [recentListed, setRecentListed] = useState([]);
  const [recentSold, setRecentSold] = useState([]);
  // const [topSold, setTopSold] = useState(shuffle(recentSales) ?? []);
  const [topSalesFilter, setTopSalesFilter] = useState("all");
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [recentSalesFilter, setRecentSalesFilter] = useState("all");
  const firstSlider = useRef();
  const secondSlider = useRef();
  const [loadingTopSales, setLoadingTopSales] = useState(false);
  // const [loadingRecentSales, setLoadingRecentSales] = useState(false);
  const [activeLink, setActiveLink] = useState("collections");
  const windowSize = useWindowSize();
  const [totalTx2, setTotalTx] = useState(0);
  const [totalvolume2, setTotalVolume] = useState(0);
  const [sliderCut, setSliderCut] = useState();
  const [showFirstNext, setShowFirstNext] = useState(false);
  const [showSecondNext, setShowSecondNext] = useState(false);
  const [favItems, setfavItems] = useState(0);

  const dummyData = [
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "0",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xF4914F025b45798F634fBE638d33701FBff3274A",
      tokenId: "10",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xF4914F025b45798F634fBE638d33701FBff3274A",
      tokenId: "25",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "0",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x76E60102AE09386eE0c848F2Ee36ede6d03ad4B3",
      tokenId: "3",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xf6180221a94aCA479f71e2A3a48e9A65E0dF179c",
      tokenId: "4",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xd577E2b4C4B85Cc28B35DA6bC8475729b7197a50",
      tokenId: "5",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "2",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "3",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "7",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xb8CAC1C259bA3a73e26744fB8D09B5Bd77c2207B",
      tokenId: "9",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1",
      tokenId: "3",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1",
      tokenId: "5",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "12",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "13",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
      tokenId: "14",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x105704a52DEB48895226f2C6C47Fb4cc353A4560",
      tokenId: "15",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6310D0aD15c12a42d278E1234d3B087e140aEaa0",
      tokenId: "10",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xD324A03BF17Eee8D34A8843D094a76FF8f561e38",
      tokenId: "11",
      type: "land",
      chain: 1,
    },
  ];

  const dummyDataSales = [
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x76E60102AE09386eE0c848F2Ee36ede6d03ad4B3",
      tokenId: "300",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xf6180221a94aCA479f71e2A3a48e9A65E0dF179c",
      tokenId: "14",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xd577E2b4C4B85Cc28B35DA6bC8475729b7197a50",
      tokenId: "25",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "221",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "30",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "227",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xb8CAC1C259bA3a73e26744fB8D09B5Bd77c2207B",
      tokenId: "90",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1",
      tokenId: "30",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1",
      tokenId: "51",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "220",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xF4914F025b45798F634fBE638d33701FBff3274A",
      tokenId: "140",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xF4914F025b45798F634fBE638d33701FBff3274A",
      tokenId: "245",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
      tokenId: "70",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "122",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "73",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
      tokenId: "149",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x105704a52DEB48895226f2C6C47Fb4cc353A4560",
      tokenId: "115",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0x6310D0aD15c12a42d278E1234d3B087e140aEaa0",
      tokenId: "100",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xD324A03BF17Eee8D34A8843D094a76FF8f561e38",
      tokenId: "161",
      type: "land",
      chain: 1,
    },
  ];

  const firstNext = () => {
    firstSlider.current.slickNext();
  };
  const secondNext = () => {
    secondSlider.current.slickNext();
  };
  const firstPrev = () => {
    firstSlider.current.slickPrev();
  };
  const secondPrev = () => {
    secondSlider.current.slickPrev();
  };

  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 6,
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
          slidesToShow: 5,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
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
  var settings2 = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide2(next);
      setShowSecondNext(current);
    },
    afterChange: (current) => setActiveSlide2(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
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

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    const result2 = await axios
      .get("https://api.worldofdypians.com/api/getWodVolume")
      .catch((e) => {
        console.error(e);
      });

    if (result.data && result.data !== "NaN") {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (result2.data && result2.data !== "NaN") {
      setTotalVolume(result2.data.totalVolume);
      localStorage.setItem("cachedVolume", result2.data.totalVolume);
    }
  };

  const cachedVolume = localStorage.getItem("cachedVolume");
  const cachedTvl = localStorage.getItem("cachedTvl");

  const fetchCachedData = () => {
    if (cachedTvl && cachedVolume) {
      setTotalTx(cachedTvl);
      setTotalVolume(cachedVolume);
    }
  };

  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = nftTimestamp;
    const difference = seconds - oldTimestamp;
    let output = ``;

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };

  useEffect(() => {
    // initialSales();
    if (latest20RecentListedNFTS && latest20RecentListedNFTS.length > 0) {
      const result = shuffle(latest20RecentListedNFTS);
      if (result && result.length === latest20RecentListedNFTS.length) {
        setRecentListed(result);
      }
    }
    setRecentSalesFilter("all");

    // if (recentSales && recentSales.length === 0) {
    //   setLoadingRecentSales(true);
    // }
    // if (recentSales && recentSales.length > 0) {
    //   setLoadingRecentSales(false);
    // }
  }, [listedNFTS, nftCount, latest20RecentListedNFTS]);

  useEffect(() => {
    getAllData();
    fetchCachedData();
    window.scrollTo(0, 0);
    document.title = "Shop";
  }, []);

  useEffect(() => {
    fetchCachedData();
  }, [cachedVolume, cachedTvl]);

  const updateFavs = () => {
    setfavItems(favItems + 1);
  };

  useEffect(() => {
    updateFavs();
  }, [nftCount]);

  var today = moment();
  var hours = moment().subtract(1, "days");
  var week = moment().subtract(7, "days");
  var month = moment().subtract(30, "days");
  const [topSalesDate, setTopSalesDate] = useState("week");

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

  const initialSales = () => {
    if (recentSales) {
      let datedSales = recentSales.map((item) => {
        return {
          ...item,
          date: new Date(parseInt(item.blockTimestamp * 1000)),
        };
      });

      const filteredDateSales = datedSales.filter(function (item) {
        return item.date > week._d && item.date < today._d;
      });

      // setTopSold(filteredDateSales);
    }
  };

  const filterTopSales = () => {
    setLoadingTopSales(true);
    let datedSales = recentSales.map((item) => {
      return { ...item, date: new Date(parseInt(item.blockTimestamp * 1000)) };
    });

    let filteredDateSales;
    if (topSalesDate === "24h") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > hours._d && item.date < today._d;
      });
    } else if (topSalesDate === "week") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > week._d && item.date < today._d;
      });
    } else if (topSalesDate === "month") {
      filteredDateSales = datedSales.filter(function (item) {
        return item.date > month._d && item.date < today._d;
      });
    }

    if (topSalesFilter === "caws") {
      setTopSalesFilter("caws");
      let cawsFilter = filteredDateSales.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address ||
          item.nftAddress === window.config.nft_cawsold_address
      );
      // setTopSold(cawsFilter);
    } else if (topSalesFilter === "land") {
      setTopSalesFilter("land");

      let wodFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      // setTopSold(wodFilter);
    } else if (topSalesFilter === "timepiece") {
      setTopSalesFilter("timepiece");

      let timepieceFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      // setTopSold(timepieceFilter);
    } else if (topSalesFilter === "all") {
      setTopSalesFilter("all");

      // setTopSold(shuffle(filteredDateSales));
    }
    // setTimeout => {
    setLoadingTopSales(false);
    // }, 1000);
  };

  // useEffect(() => {
  //   filterTopSales();
  // }, [topSalesFilter, topSalesDate]);

  const filterRecentListings = (filter) => {
    // setLoadingRecentListings(true);
    if (latest20RecentListedNFTS && latest20RecentListedNFTS.length > 0) {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = latest20RecentListedNFTS.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setRecentListed(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = latest20RecentListedNFTS.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setRecentListed(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = latest20RecentListedNFTS.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setRecentListed(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setRecentListed(shuffle(latest20RecentListedNFTS));
      }
    } else {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = dummyData.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setRecentListed(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = dummyData.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setRecentListed(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = dummyData.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setRecentListed(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setRecentListed(shuffle(dummyData));
      }
    }
    // setTimeout(() => {
    // setLoadingRecentListings(false);
    // }, 1000);
  };

  const filterRecentSales = (filter) => {
    // setLoadingRecentSales(true);dummyDataSales
    if (recentSales && recentSales.length > 0) {
      if (filter === "caws") {
        setRecentSalesFilter("caws");
        let cawsFilter = recentSales.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setRecentSold(cawsFilter);
      } else if (filter === "land") {
        setRecentSalesFilter("land");
        let wodFilter = recentSales.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setRecentSold(wodFilter);
      } else if (filter === "timepiece") {
        setRecentSalesFilter("timepiece");
        let timepieceFilter = recentSales.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setRecentSold(timepieceFilter);
      } else if (filter === "all") {
        setRecentSalesFilter("all");
        setRecentSold(shuffle(recentSales));
      }
    } else {
      if (filter === "caws") {
        setRecentSalesFilter("caws");
        let cawsFilter = dummyDataSales.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setRecentSold(cawsFilter);
      } else if (filter === "land") {
        setRecentSalesFilter("land");
        let wodFilter = dummyDataSales.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setRecentSold(wodFilter);
      } else if (filter === "timepiece") {
        setRecentSalesFilter("timepiece");
        let timepieceFilter = dummyDataSales.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setRecentSold(timepieceFilter);
      } else if (filter === "all") {
        setRecentSalesFilter("all");
        setRecentSold(shuffle(dummyDataSales));
      }
    }
    // setTimeout(() => {
    //   setLoadingRecentSales(false);
    // }, 1000);
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

  useEffect(() => {
    setRecentSalesFilter("all");
    if (recentSales && recentSales.length > 0) {
      const result = shuffle(recentSales);
      if (result && result.length === recentSales.length) {
        setRecentSold(result);
      }
    }
  }, [recentSales]);

  const cutLength = () => {
    if (windowSize.width > 1600) {
      setSliderCut(6);
    } else if (windowSize.width > 1500) {
      setSliderCut(5);
    } else if (windowSize.width > 1024) {
      setSliderCut(4);
    } else if (windowSize.width > 600) {
      setSliderCut(3);
    } else if (windowSize.width > 480) {
      setSliderCut(2);
    } else {
      setSliderCut(1);
    }
  };

  useEffect(() => {
    cutLength();
  }, [windowSize.width]);

  return (
    <div
      className="container-fluid mt-lg-5 pt-lg-5 d-flex flex-column-reverse flex-lg-row justify-content-center justify-content-lg-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft2 mt-lg-5 d-flex align-items-start px-0 px-lg-4 position-relative">
        <div className="custom-container mx-0">
          <div className="market-upper-wrapper pb-5">
            <div className="d-flex flex-column gap-4 gap-lg-5 mt-3 mt-lg-0">
              <div className="row mx-0 justify-content-center p-4  marketplace-banner align-items-center mt-5 mt-lg-0">
                <div className="col-12 col-lg-6">
                  <h6 className="market-banner-title text-uppercase text-center">
                    {/* Explore the World of Dypians{" "} */}
                    Shop
                    <mark
                      className="p-0 text-uppercase"
                      style={{
                        color: "#DCFB85",
                        lineHeight: "80%",
                        background: "transparent",
                      }}
                    >
                      {/* Shop */}
                    </mark>
                  </h6>

                  {/* <div className="my-4 d-flex flex-column align-items-center gap-2">
                    <span className="market-banner-desc">Available on</span>
                    <span className="d-flex gap-2 align-items-center">
                      <img
                        src={ethIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={bnbIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={coreIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={skaleIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={baseIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={confluxIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <img
                        src={vicitonIcon}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                    </span>
                  </div> */}
                </div>
              </div>
              <div className="row gap-4 mx-0 gap-lg-0 align-items-center">
                <div className="col-12 col-lg-4">
                  <div className="stats-container-1 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {getFormattedNumber(totalTx2).slice(
                        0,
                        getFormattedNumber(totalTx2).length - 3
                      )}
                    </h6>
                    <span className="stats-desc">
                      Total on-chain transactions
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="stats-container-2 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {/* {abbreviateNumber(totalvolume,4)}+ */}$
                      {getFormattedNumber(totalVolumeNew, 0)}
                    </h6>
                    <span className="stats-desc">Total Volume (USD)</span>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="stats-container-3 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {" "}
                      {getFormattedNumber(wodHolders, 0)}
                    </h6>
                    <span className="stats-desc">WOD Holders</span>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-0 mt-lg-4">
                  <div className="stats-container-1 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {getFormattedNumber(monthlyPlayers, 0)}
                    </h6>
                    <span className="stats-desc">Monthly on-chain Players</span>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-0 mt-lg-4">
                  <div className="stats-container-2 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {/* {abbreviateNumber(totalvolume,4)}+ */}
                      {getFormattedNumber(totalSupply, 0)}
                    </h6>
                    <span className="stats-desc">Total NFTs Sold</span>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-0 mt-lg-4">
                  <div className="stats-container-3 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h6 className="stats-value">
                      {getFormattedNumber(1500531, 0)}
                    </h6>
                    <span className="stats-desc">Total NFT Holders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-wrapper w-100">
            {/* <GameEvents/> */}
            <div
              className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper2 position-relative p-3 p-lg-5 gap-4 my-4"
              style={{ minHeight: "430px" }}
            >
              {activeSlide > 0 && (
                <div className="prev-arrow-nft" onClick={firstPrev}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/nextArrow1.svg"}
                    alt=""
                  />
                </div>
              )}
              {showFirstNext === activeSlide
                ? null
                : recentListed.length > sliderCut && (
                    <div className="next-arrow-nft" onClick={firstNext}>
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                        }
                        alt="1"
                      />
                    </div>
                  )}
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <h6 className="nft-wrapper-title font-raleway mb-0">
                  Recent Listings
                </h6>

                <div className="d-flex align-items-center gap-4">
                  {isConnected && coinbase && hasNft === true && (
                    <NavLink className="stake-wod-btn" to="/list-my-nft">
                      List NFT
                    </NavLink>
                  )}

                  <h6
                    className={`filter-title m-0 ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("all");
                      cutLength();
                      firstSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide(0);
                    }}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title m-0 ${
                      recentListingsFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("caws");
                      cutLength();
                      firstSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide(0);
                    }}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title m-0 ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("land");
                      cutLength();
                      firstSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide(0);
                    }}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title m-0 ${
                      recentListingsFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("timepiece");
                      cutLength();
                      firstSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide(0);
                    }}
                  >
                    Timepiece
                  </h6>
                </div>
              </div>
              {loadingRecentListings === false ? (
                <div className="slider-container">
                  {recentListed && recentListed.length > 0 ? (
                    <Slider
                      ref={(c) => (firstSlider.current = c)}
                      {...settings}
                    >
                      {recentListed.map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.seller?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={nft.type === "caws"}
                            isTimepiece={nft.type === "timepiece"}
                            isWod={nft.type === "land"}
                            coinbase={coinbase}
                            isListed={
                              latest20RecentListedNFTS.length > 0 ? true : false
                            }
                            binanceW3WProvider={binanceW3WProvider}
                            chainId={chainId}
                          />
                        </NavLink>
                      ))}
                    </Slider>
                  ) : (
                    // <div className="d-flex w-100 align-items-center justify-content-center">
                    //   <h3 className="text-white">
                    //     There are no listed items for that category.
                    //   </h3>
                    // </div>

                    <Slider
                      ref={(c) => (firstSlider.current = c)}
                      {...settings}
                    >
                      {dummyData.map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.seller?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <ItemCard
                            ethTokenData={ethTokenData}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={nft.type === "caws"}
                            isTimepiece={nft.type === "timepiece"}
                            isWod={nft.type === "land"}
                            coinbase={coinbase}
                            lastSold={nft.LastSold}
                            isLatestSale={nft.isLatestSale}
                            isListed={nft.isListed}
                            soldPriceType={nft.soldPriceType}
                            binanceW3WProvider={binanceW3WProvider}
                            chainId={chainId}
                          />
                        </NavLink>
                      ))}
                    </Slider>
                  )}
                </div>
              ) : (
                <div className="loader-wrapper gap-3 justify-content-start  mt-3">
                  {/* <HashLoader
                    color={"#554fd8"}
                    loading={loadingRecentListings}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> */}
                  {windowSize.width > 1600 ? (
                    <>
                      {[...Array(10)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 1500 ? (
                    <>
                      {[...Array(5)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 1024 ? (
                    <>
                      {[...Array(4)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 600 ? (
                    <>
                      {[...Array(3)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 480 ? (
                    <>
                      {[...Array(2)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <Skeleton
                      animation="wave"
                      width={"100%"}
                      variant="rounded"
                      height={230}
                      sx={{ bgcolor: "black.700" }}
                    />
                  )}
                </div>
              )}
            </div>
            <div
              className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper2 position-relative p-3 p-lg-5 gap-4 my-4"
              style={{ minHeight: "430px" }}
            >
              {activeSlide2 > 0 && (
                <div className="prev-arrow-nft" onClick={secondPrev}>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/nextArrow1.svg"}
                    alt=""
                  />
                </div>
              )}
              {showSecondNext === activeSlide2
                ? null
                : recentSold?.length > sliderCut && (
                    // <img
                    //   src={'https://cdn.worldofdypians.com/wod/nextArrow1.svg'}
                    //   width={40}
                    //   height={40}
                    //   onClick={secondNext}
                    //   className="next-arrow-nft"
                    //   alt=""
                    // />
                    <div className="next-arrow-nft" onClick={secondNext}>
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/nextArrow1.svg"
                        }
                        alt=""
                      />
                    </div>
                  )}

              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                <h6 className="nft-wrapper-title font-raleway mb-0">
                  Recent Sales
                </h6>
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentSales("all");
                      cutLength();
                      secondSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide2(0);
                    }}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentSales("caws");
                      cutLength();
                      secondSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide2(0);
                    }}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentSales("land");
                      cutLength();
                      secondSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide2(0);
                    }}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentSalesFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentSales("timepiece");
                      cutLength();
                      secondSlider.current.innerSlider.slickGoTo(0);
                      setActiveSlide2(0);
                    }}
                  >
                    Timepiece
                  </h6>
                </div>
              </div>
              {loadingRecentSales === false ? (
                <div className="slider-container">
                  <Slider
                    ref={(c) => (secondSlider.current = c)}
                    {...settings2}
                  >
                    {recentSold && recentSold.length > 0
                      ? recentSold.map((nft, index) => (
                          <NavLink
                            to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                            style={{ textDecoration: "none" }}
                            key={index}
                            state={{
                              nft: nft,
                              type: nft.type,
                              isOwner:
                                nft.buyer?.toLowerCase() ===
                                coinbase?.toLowerCase(),
                              chain: nft.chain,
                            }}
                            onClick={() => {
                              updateViewCount(nft.tokenId, nft.nftAddress);
                            }}
                          >
                            <ItemCard
                              ethTokenData={ethTokenData}
                              key={nft.id}
                              nft={nft}
                              isConnected={isConnected}
                              showConnectWallet={handleConnect}
                              isCaws={nft.type === "caws"}
                              isTimepiece={nft.type === "timepiece"}
                              isWod={nft.type === "land"}
                              coinbase={coinbase}
                              isListed={recentSales.length > 0 ? true : false}
                              onFavorite={updateFavs}
                              binanceW3WProvider={binanceW3WProvider}
                              chainId={chainId}
                            />
                          </NavLink>
                        ))
                      : dummyDataSales.map((nft, index) => (
                          <NavLink
                            to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                            style={{ textDecoration: "none" }}
                            key={index}
                            state={{
                              nft: nft,
                              type: nft.type,
                              isOwner:
                                nft.seller?.toLowerCase() ===
                                coinbase?.toLowerCase(),
                              chain: nft.chain,
                            }}
                            onClick={() => {
                              updateViewCount(nft.tokenId, nft.nftAddress);
                            }}
                          >
                            <ItemCard
                              ethTokenData={ethTokenData}
                              key={nft.id}
                              nft={nft}
                              isConnected={isConnected}
                              showConnectWallet={handleConnect}
                              isCaws={nft.type === "caws"}
                              isTimepiece={nft.type === "timepiece"}
                              isWod={nft.type === "land"}
                              coinbase={coinbase}
                              lastSold={nft.LastSold}
                              isLatestSale={nft.isLatestSale}
                              isListed={nft.isListed}
                              soldPriceType={nft.soldPriceType}
                              binanceW3WProvider={binanceW3WProvider}
                              chainId={chainId}
                            />
                          </NavLink>
                        ))}
                  </Slider>
                </div>
              ) : (
                <div className="loader-wrapper mt-3 justify-content-start gap-3">
                  {/* <HashLoader
                    color={"#554fd8"}
                    loading={loadingRecentListings}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> */}
                  {windowSize.width > 1600 ? (
                    <>
                      {[...Array(10)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 1500 ? (
                    <>
                      {[...Array(5)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 1024 ? (
                    <>
                      {[...Array(4)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 600 ? (
                    <>
                      {[...Array(3)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : windowSize.width > 480 ? (
                    <>
                      {[...Array(2)].map((obj, indx) => {
                        return (
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                            key={indx}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <Skeleton
                      animation="wave"
                      width={"100%"}
                      variant="rounded"
                      height={360}
                      sx={{ bgcolor: "black.700" }}
                    />
                  )}
                </div>
              )}
            </div>

            <div
              className="row mx-0 justify-content-center d-flex my-4 align-items-start py-5 gap-4 my-4"
              style={{ minHeight: "420px" }}
            >
              <div className="d-flex col-12 flex-column px-3 py-4 nft-outer-wrapper3 flex-lg-row gap-4 justify-content-between w-100 position-relative">
                <div className=" events-page-status-tag-live px-2 d-flex align-items-center justify-content-center">
                  <div className="pulsatingDot"></div>
                  <span>Live</span>
                </div>
                <div className="w-100 mt-0 px-0 d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-2 w-100 h-100">
                    <NavLink
                      to={"/shop/mint/timepiece"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-bg w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            CAWS Timepiece
                          </h6>
                        </div>
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
                                    scale: item.icon === "expand" ? "0.8" : "1",
                                  }}
                                />
                                <span className="mint-benefits-title">
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/shop/mint/timepiece">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Mint now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div>
                  {/* <div className="d-flex flex-column gap-2 w-100 h-100">
                    <NavLink
                      to={"/shop/mint/timepiece"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-timepiece w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            CAWS
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Timepiece
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/shop/mint/timepiece">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Mint now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div>
                  <div className="d-flex flex-column gap-2 w-100 h-100">
                    <NavLink
                      to={"/shop/mint/vanar"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-vanar w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            Vanar
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Beta Pass
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/shop/mint/vanar">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Mint now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div> */}
                  {/* <div className="d-flex flex-column gap-2 w-100 h-100">
                    <NavLink
                      to={"/shop/mint/opbnbchain"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-opbnb w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>

                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            opBnb Chain
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Beta Pass
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/shop/mint/opbnbchain">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Mint now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div> */}
                </div>
                <div className="w-100 mt-0 px-0 d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-2 w-100 flex-wrapper">
                    <NavLink
                      to={"/staking"}
                      className="w-100 m-0 d-flex flex-column gap-5"
                    >
                      <div className="p-4 mint-wrappernew market-stake-bg w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-auto">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-stake-tag px-3 py-1">
                          <span>NFT Staking</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            CAWS NFT
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Staking
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/staking">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Stake now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div>
                  <div className="d-flex flex-column gap-2 w-100 flex-wrapper">
                    <NavLink
                      to={"/staking"}
                      className="w-100 m-0 d-flex flex-column gap-5"
                    >
                      <div className="p-4 mint-wrappernew market-land-stake-bg w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-auto">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-stake-tag px-3 py-1">
                          <span>NFT Staking</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            Genesis NFT
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Staking
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/staking">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Stake now{" "}
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/greenArrowMarket.svg"
                          }
                          alt=""
                        />{" "}
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <NewChallenges
              screen={"marketplace"}
              popupEvent={popupEvent}
              setPopupEvent={setPopupEvent}
              popupActive={popupActive}
              setPopupActive={setPopupActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
