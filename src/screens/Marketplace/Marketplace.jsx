import React, { useEffect, useRef, useState } from "react";
import "./_marketplace.scss";
import ItemCard from "../../components/ItemCard/ItemCard";
import { NavLink } from "react-router-dom";
import { getOpenSeaLink } from "../../utils/openSeaLink";

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

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    { breakpoint: 1600, settings: { slidesToShow: 5 } },
    { breakpoint: 1500, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const CollectionSection = ({
  title,
  items,
  loading,
  sliderCut,
  onItemClick,
  ethTokenData,
  isConnected,
  handleConnect,
  coinbase,
  chainId,
  onFavorite,
}) => {
  const slider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper2 position-relative p-3 p-lg-5 gap-4 my-4"
      style={{ minHeight: "430px" }}
    >
      {activeSlide > 0 && (
        <div className="prev-arrow-nft" onClick={() => slider.current.slickPrev()}>
          <img src={"https://cdn.worldofdypians.com/wod/nextArrow1.svg"} alt="" />
        </div>
      )}
      {activeSlide + sliderCut < items.length && (
        <div className="next-arrow-nft" onClick={() => slider.current.slickNext()}>
          <img src={"https://cdn.worldofdypians.com/wod/nextArrow1.svg"} alt="" />
        </div>
      )}
      <h6 className="nft-wrapper-title font-raleway mb-0">{title}</h6>
      {loading ? (
        <div className="loader-wrapper gap-3 justify-content-start mt-3">
          {[...Array(sliderCut || 1)].map((obj, indx) => (
            <Skeleton
              animation="wave"
              width={sliderCut === 1 ? "100%" : 178}
              variant="rounded"
              height={230}
              sx={{ bgcolor: "black.700" }}
              key={indx}
            />
          ))}
        </div>
      ) : (
        <div className="slider-container">
          <Slider
            ref={slider}
            {...sliderSettings}
            afterChange={(current) => setActiveSlide(current)}
          >
            {items.map((nft, index) => (
              <a
                href={getOpenSeaLink(nft.type, nft.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                key={index}
                onClick={() => onItemClick(nft.tokenId, nft.nftAddress)}
              >
                <ItemCard
                  ethTokenData={ethTokenData}
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
                  onFavorite={onFavorite}
                  chainId={chainId}
                />
              </a>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

const Marketplace = ({
  listedNFTS,
  isConnected,
  handleConnect,
  totalListed,
  totalBoughtNFTSCount,
  coinbase,
  recentSales,
  nftCount,
  ethTokenData,
  totalTx,
  totalvolume,
  totalSupply,
  chainId,
  wodHolders,
  totalVolumeNew,
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
  // const [topSold, setTopSold] = useState(shuffle(recentSales) ?? []);
  const [topSalesFilter, setTopSalesFilter] = useState("all");
  const openSeaLogsFetchedRef = useRef(false);
  const [loadingOpenSea, setLoadingOpenSea] = useState(true);
  const [loadingTopSales, setLoadingTopSales] = useState(false);
  // const [loadingRecentSales, setLoadingRecentSales] = useState(false);
  const [activeLink, setActiveLink] = useState("collections");
  const windowSize = useWindowSize();
  const [totalTx2, setTotalTx] = useState(0);
  const [totalvolume2, setTotalVolume] = useState(0);
  const [sliderCut, setSliderCut] = useState();
  const [favItems, setfavItems] = useState(0);
  const [openSeaRecentListings, setOpenSeaRecentListings] = useState({
    all: [],
    caws: [],
    land: [],
    timepiece: [],
  });
  const [openSeaRecentSales, setOpenSeaRecentSales] = useState({
    all: [],
    caws: [],
    land: [],
    timepiece: [],
  });

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
      tokenId: "20",
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
    {
      nftAddress: "0xcd60d912655281908ee557ce1add61e983385a03",
      buyer: "0xD324A03BF17Eee8D34A8843D094a76FF8f561e38",
      tokenId: "21",
      type: "land",
      chain: 1,
    },
    {
      nftAddress: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "17",
      type: "timepiece",
      chain: 1,
      isListed: false,
    },
  ];

  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);

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

    if (
      result &&
      result.status === 200 &&
      result.data &&
      result.data !== "NaN"
    ) {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (
      result2 &&
      result2.status === 200 &&
      result2.data &&
      result2.data !== "NaN"
    ) {
      setTotalVolume(result2.data.totalVolume);
      localStorage.setItem("cachedVolume", result2.data.totalVolume);
    }
  };

  const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";
  const OPENSEA_LIMIT = 7;
  const OPENSEA_COLLECTION_SLUGS = [
    "catsandwatchessocietycaws",
    "cawstimepiece",
    "worldofdypians",
  ];
  const OPENSEA_COLLECTION_CONFIG = {
    catsandwatchessocietycaws: {
      type: "caws",
      chain: 1,
      configAddressKey: "nft_caws_address",
    },
    cawstimepiece: {
      type: "timepiece",
      chain: 1,
      configAddressKey: "nft_timepiece_address",
    },
    worldofdypians: {
      type: "land",
      chain: 1,
      configAddressKey: "nft_land_address",
    },
  };

  const getTypeByAddress = (nftAddress = "") => {
    const normalizedAddress = nftAddress.toLowerCase();

    if (
      normalizedAddress === window.config.nft_caws_address?.toLowerCase() ||
      normalizedAddress === window.config.nft_cawsold_address?.toLowerCase()
    ) {
      return "caws";
    }

    if (normalizedAddress === window.config.nft_land_address?.toLowerCase()) {
      return "land";
    }

    if (
      normalizedAddress === window.config.nft_timepiece_address?.toLowerCase()
    ) {
      return "timepiece";
    }

    return "caws";
  };

  const withResolvedType = (items = []) => {
    return items.map((item) => {
      const resolvedType = item?.type || getTypeByAddress(item?.nftAddress || "");

      return {
        ...item,
        type: resolvedType,
      };
    });
  };

  const normalizeOpenSeaListing = (listing, collectionSlug) => {
    const config = OPENSEA_COLLECTION_CONFIG[collectionSlug];

    if (!config) {
      return null;
    }

    const offerItem = listing?.protocol_data?.parameters?.offer?.[0] || {};
    const fallbackAddress = window?.config?.[config.configAddressKey] || "";
    const nftAddress = (
      offerItem?.token ||
      listing?.asset_contract?.address ||
      listing?.asset?.contract ||
      fallbackAddress
    )
      ?.toString()
      ?.toLowerCase();

    const tokenId =
      offerItem?.identifierOrCriteria ||
      listing?.asset?.token_id ||
      listing?.asset?.identifier ||
      "";

    if (!nftAddress || tokenId === "") {
      return null;
    }

    const currentPriceWei =
      listing?.price?.current?.value ||
      listing?.current_price ||
      listing?.protocol_data?.parameters?.consideration?.[0]?.startAmount ||
      "0";

    const listedTimestamp =
      Math.floor(new Date(listing?.created_date || listing?.listing_time || 0).getTime() / 1000) ||
      Math.floor(Date.now() / 1000);

    return {
      nftAddress,
      tokenId: tokenId.toString(),
      seller: listing?.maker?.address || listing?.maker || "",
      price: currentPriceWei,
      payment_priceType: 0,
      payment_tokenAddress: "0x0000000000000000000000000000000000000000",
      blockTimestamp: listedTimestamp,
      type: config.type,
      chain: config.chain,
      isListed: true,
    };
  };

  const normalizeOpenSeaSale = (saleEvent, collectionSlug) => {
    const config = OPENSEA_COLLECTION_CONFIG[collectionSlug];

    if (!config) {
      return null;
    }

    const nftAddress = (
      saleEvent?.nft?.contract ||
      saleEvent?.asset_contract?.address ||
      saleEvent?.asset?.contract ||
      window?.config?.[config.configAddressKey] ||
      ""
    )
      .toString()
      .toLowerCase();

    const tokenId =
      saleEvent?.nft?.identifier ||
      saleEvent?.asset?.token_id ||
      saleEvent?.asset?.identifier ||
      "";

    if (!nftAddress || tokenId === "") {
      return null;
    }

    const salePriceWei =
      saleEvent?.payment?.quantity ||
      saleEvent?.total_price ||
      saleEvent?.payment_token?.quantity ||
      "0";

    const saleTimestamp =
      Math.floor(
        new Date(
          saleEvent?.event_timestamp ||
            saleEvent?.created_date ||
            saleEvent?.transaction?.timestamp ||
            0
        ).getTime() / 1000
      ) || Math.floor(Date.now() / 1000);

    return {
      nftAddress,
      tokenId: tokenId.toString(),
      buyer:
        saleEvent?.to_account?.address ||
        saleEvent?.winner_account?.address ||
        saleEvent?.buyer ||
        "",
      seller:
        saleEvent?.from_account?.address ||
        saleEvent?.seller ||
        saleEvent?.maker?.address ||
        "",
      price: salePriceWei,
      payment_priceType: 0,
      payment_tokenAddress: "0x0000000000000000000000000000000000000000",
      blockTimestamp: saleTimestamp,
      type: config.type,
      chain: config.chain,
      isListed: true,
    };
  };

  const fetchOpenSeaApiKey = async () => {
    try {
      // Temporary key creation request as requested.
      const response = await axios.post(
        `${OPENSEA_BASE_URL}/auth/keys`,
        {
          name: "wod-marketplace-temp",
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OpenSea auth key response:", response.data);

      return (
        response?.data?.api_key ||
        response?.data?.key ||
        response?.data?.data?.api_key ||
        ""
      );
    } catch (error) {
      console.error("OpenSea auth key request failed:", error);
      return "";
    }
  };

  const fetchOpenSeaCollectionData = async () => {
    try {
      const generatedApiKey = await fetchOpenSeaApiKey();
      const fallbackApiKey = process.env.REACT_APP_OPENSEA_API_KEY || "";
      const apiKey = generatedApiKey || fallbackApiKey;

      if (!apiKey) {
        console.warn(
          "No OpenSea API key available. Set REACT_APP_OPENSEA_API_KEY if key creation fails."
        );
        return;
      }

      const headers = {
        accept: "application/json",
        "X-API-KEY": apiKey,
      };

      const listingBuckets = {
        all: [],
        caws: [],
        land: [],
        timepiece: [],
      };
      const salesBuckets = {
        all: [],
        caws: [],
        land: [],
        timepiece: [],
      };

      await Promise.all(
        OPENSEA_COLLECTION_SLUGS.map(async (collectionSlug) => {
          try {
            const [collectionResponse, listingsResponse, salesResponse] =
              await Promise.all([
                axios.get(`${OPENSEA_BASE_URL}/collections/${collectionSlug}`, {
                  headers,
                }),
                axios.get(
                  `${OPENSEA_BASE_URL}/listings/collection/${collectionSlug}/all?limit=${OPENSEA_LIMIT}`,
                  { headers }
                ),
                axios.get(
                  `${OPENSEA_BASE_URL}/events/collection/${collectionSlug}?event_type=sale&limit=${OPENSEA_LIMIT}`,
                  { headers }
                ),
              ]);

            console.log(
              `OpenSea collection response (${collectionSlug}):`,
              collectionResponse.data
            );
            console.log(
              `OpenSea recent 20 listings response (${collectionSlug}):`,
              listingsResponse.data
            );
            console.log(
              `OpenSea recent 20 sales response (${collectionSlug}):`,
              salesResponse.data
            );

            const rawListings =
              listingsResponse?.data?.listings ||
              listingsResponse?.data?.orders ||
              [];

            const normalizedListings = rawListings
              .map((listing) => normalizeOpenSeaListing(listing, collectionSlug))
              .filter(Boolean)
              .map((listing) => ({
                ...listing,
                type: listing.type || getTypeByAddress(listing.nftAddress),
              }))
              .slice(0, OPENSEA_LIMIT);

            const listingType = OPENSEA_COLLECTION_CONFIG[collectionSlug]?.type;

            if (listingType && listingBuckets[listingType]) {
              listingBuckets[listingType] = normalizedListings;
            }

            const rawSalesEvents =
              salesResponse?.data?.asset_events ||
              salesResponse?.data?.events ||
              [];

            const normalizedSales = rawSalesEvents
              .map((saleEvent) => normalizeOpenSeaSale(saleEvent, collectionSlug))
              .filter(Boolean)
              .map((sale) => ({
                ...sale,
                type: sale.type || getTypeByAddress(sale.nftAddress),
              }))
              .slice(0, OPENSEA_LIMIT);

            if (listingType && salesBuckets[listingType]) {
              salesBuckets[listingType] = normalizedSales;
            }
          } catch (error) {
            console.error(`OpenSea request failed (${collectionSlug}):`, error);
          }
        })
      );

      const combinedListings = [
        ...listingBuckets.caws,
        ...listingBuckets.land,
        ...listingBuckets.timepiece,
      ]
        .sort((a, b) => b.blockTimestamp - a.blockTimestamp)
        .slice(0, OPENSEA_LIMIT);

      const nextListingState = {
        all: withResolvedType(combinedListings),
        caws: withResolvedType(listingBuckets.caws),
        land: withResolvedType(listingBuckets.land),
        timepiece: withResolvedType(listingBuckets.timepiece),
      };

      const combinedSales = [
        ...salesBuckets.caws,
        ...salesBuckets.land,
        ...salesBuckets.timepiece,
      ]
        .sort((a, b) => b.blockTimestamp - a.blockTimestamp)
        .slice(0, OPENSEA_LIMIT);

      const nextSalesState = {
        all: withResolvedType(combinedSales),
        caws: withResolvedType(salesBuckets.caws),
        land: withResolvedType(salesBuckets.land),
        timepiece: withResolvedType(salesBuckets.timepiece),
      };

      setOpenSeaRecentListings(nextListingState);
      setOpenSeaRecentSales(nextSalesState);
    } catch (error) {
      console.error("OpenSea collection/listings/sales request failed:", error);
    } finally {
      setLoadingOpenSea(false);
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
    getAllData();
    fetchCachedData();
    window.scrollTo(0, 0);
    document.title = "Shop";

    if (!openSeaLogsFetchedRef.current) {
      openSeaLogsFetchedRef.current = true;
      fetchOpenSeaCollectionData();
    }
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
          item.nftAddress === window.config.nft_cawsold_address,
      );
      // setTopSold(cawsFilter);
    } else if (topSalesFilter === "land") {
      setTopSalesFilter("land");

      let wodFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_land_address,
      );
      // setTopSold(wodFilter);
    } else if (topSalesFilter === "timepiece") {
      setTopSalesFilter("timepiece");

      let timepieceFilter = filteredDateSales.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address,
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
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`,
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

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
                        getFormattedNumber(totalTx2).length - 3,
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
            {[
              { type: "caws", title: "Cats and Watches Society" },
              { type: "land", title: "World of Dypians Land" },
              { type: "timepiece", title: "CAWS Timepiece" },
            ].map(({ type, title }) => (
              <CollectionSection
                key={type}
                title={title}
                items={[
                  ...openSeaRecentListings[type],
                  ...openSeaRecentSales[type],
                  ...dummyData.filter((nft) => nft.type === type),
                ]
                  .filter(
                    (nft, index, arr) =>
                      arr.findIndex((n) => n.tokenId === nft.tokenId) === index
                  )
                  .slice(0, OPENSEA_LIMIT)}
                loading={loadingOpenSea}
                sliderCut={sliderCut}
                onItemClick={updateViewCount}
                ethTokenData={ethTokenData}
                isConnected={isConnected}
                handleConnect={handleConnect}
                coinbase={coinbase}
                chainId={chainId}
                onFavorite={updateFavs}
              />
            ))}

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
                      to={"/shop/mint/bnbchain-5ya"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-5ya w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            BNB Chain
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            5YA Beta Pass
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/shop/mint/bnbchain-5ya">
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
                      to={"/shop/mint/timepiece"}
                      className="w-100 m-0 d-flex flex-column gap-5 h-100"
                    >
                      <div className="p-4 mint-wrappernew market-mint-timepiece w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-100">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-mint-tag px-3 py-1">
                          <span>NFT Minting</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            CAWS TimePiece
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Beta Pass
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
                  </div>*/}
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
                      to={"/account/prime"}
                      className="w-100 m-0 d-flex flex-column gap-5"
                    >
                      <div className="p-4 mint-wrappernew market-premium-bg w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-auto">
                        <div className="d-flex align-items-center justify-content-center homepage-prime-tag px-3 py-1">
                          <span>Prime Subscription</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            Become a Prime
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Member
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/account/prime">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Activate now{" "}
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
                      to={"/account#golden-pass"}
                      className="w-100 m-0 d-flex flex-column gap-5"
                    >
                      <div className="p-4 mint-wrappernew market-goldenpass-bg w-100 m-0 d-flex flex-column gap-4 justify-content-start staking-height staking-height2 h-auto">
                        <div className="d-flex align-items-center justify-content-center homepage-nft-stake-tag px-3 py-1">
                          <span>Golden Pass</span>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                          <h6 className="newminttitlehome m-0 position-relative">
                            Get Extra
                          </h6>
                          <h6 className="newminttitlehome m-0 position-relative">
                            Rewards
                          </h6>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/account#golden-pass">
                      <span
                        className="detailsgreen-txt d-flex align-items-center gap-2 justify-content-center m-auto"
                        style={{ width: "fit-content" }}
                      >
                        Activate now{" "}
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
