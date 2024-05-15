import React, { useState, useEffect, useRef } from "react";
import "./_walletbalance.scss";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import avaxIcon from "./assets/avaxIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import idyp from "../../Images/userProfile/idyp.svg";
import globalRank from "./assets/globalRank.svg";
import genesisImg from "./assets/genesisRank.svg";
import axios from "axios";
import viewAllArrow from "./assets/viewAllArrow.svg";
import { NavLink } from "react-router-dom";
import getListedNFTS from "../../../../../actions/Marketplace";
import { getAllNfts } from "../../../../../actions/convertUsd";
import { HashLoader } from "react-spinners";
import nextArrow from "../../../../Marketplace/assets/nextArrow1.svg";
import Slider from "react-slick";
import ItemCard from "../../../../../components/ItemCard/ItemCard";
import CawsWodItem from "../../../../../components/ItemCard/CawsWodItem";
import accountEmptyCaws from "./assets/accountEmptyCaws.svg";
import accountEmptyLand from "./assets/accountEmptyLand.svg";
import filterIcon from "./assets/filterIcon.svg";
import emptyCheck from "./assets/emptyCheck.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";
import Pagination from "@mui/material/Pagination";
import { Skeleton } from "@mui/material";
import ActiveProfileEvent from "./ActiveProfileEvent";
import UpcomingProfileEvent from "./UpcomingProfileEvent";
import ExpiredProfileEvent from "./ExpiredProfileEvent";
import eventPopupImage from "./assets/eventPopupImage.png";
import OutsideClickHandler from "react-outside-click-handler";
import confluxActive from "../../../../Marketplace/assets/confluxActive.png";
import coin98Active from "../../../../Marketplace/assets/coin98Active.png";
import coingeckoActive from "../../../../Marketplace/assets/coingeckoActive.png";
import baseActive from "../../../../Marketplace/assets/baseActive.png";
import timepieceActive from "../../../../Marketplace/assets/timepieceActive.png";
import useWindowSize from "../../../../../hooks/useWindowSize";
import grayCalendar from "./assets/grayCalendar.svg";
import eventSkeleton from "./assets/eventSkeleton.png";
import sliderEventSkeleton from "./assets/sliderEventSkeleton.svg";
import BetaEventCard from "../../../../Marketplace/components/BetaEventCard";
import NewBetaEventCard from "../../../../Marketplace/components/NewBetaEventCard";
import conflux from "./assets/conflux.svg";
import gate from "./assets/gate.svg";
import dypius from "./assets/dypIcon.svg";
import upcomingDyp from "./assets/upcomingDyp.webp";
import closeMark from "./assets/closeMark.svg";
import eventPopupImageGecko from "./assets/eventPopupImageGecko.png";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import gateUpcoming from "../../../../Marketplace/assets/gateUpcoming.webp";
import dypeventPopupImage from "./assets/dypEventImage.png";

import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "../../../../Marketplace/assets/coingeckoUpcoming.png";
import baseUpcoming from "../../../../Marketplace/assets/baseUpcoming.webp";
import halfCircleArrow from "./newAssets/halfCircleArrow.svg";
import arrowCircle from "./newAssets/arrowCircle.svg";
import epicblack from "./newAssets/epicblack.svg";
import epicwhite from "./newAssets/epicwhite.svg";
import multiplayer from "../../../../../assets/multiplayer.svg";

const WalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  email,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  userId,
  username,
  listedNFTS,
  landStaked,
  myCawsWodStakes,
  myWodWodStakes,
  myCawsCollected,
  myCawsOldCollected,
  myLandCollected,
  myTimepieceCollected,
  myBoughtNfts,
  isConnected,
  handleConnect,
  ethTokenData,
  dypTokenData,
  favoritesArray,
  latestBoughtNFTS,
  myOffers,
  allActiveOffers,
  myNFTSCoingecko,
  myGateNfts,
  myConfluxNfts,
  myBaseNfts,
  myDogeNfts,
  myCmcNfts,
  mySkaleNfts,
  myCoreNfts,
  myVictionNfts,
  latestVersion,
  MyNFTSLandBNB,
  MyNFTSCawsBNB,
  MyNFTSLandAvax,
  MyNFTSCawsAvax,
  MyNFTSLandBase,
  MyNFTSCawsBase,
}) => {
  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  const [dailyrecords, setRecords] = useState([]);
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [collectedItemsFiltered, setcollectedItemsFiltered] = useState([]);

  const [favItemsFiltered, setfavItemsFiltered] = useState([]);
  const [favoriteItems, setfavoriteItems] = useState([]);

  const [listedItemsFiltered, setlistedItemsFiltered] = useState([]);
  const [listedItems, setlistedItems] = useState([]);

  const [bnbPrice, setBnbPrice] = useState(0);

  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [filterTitle, setFilterTitle] = useState("Balance");
  const [nftItems, setNftItems] = useState([]);

  const [collectedItems, setcollectedItems] = useState([]);
  const [showNfts, setShowNfts] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);
  const [allListed, setAllListed] = useState([]);

  const [filter1, setFilter1] = useState("all");
  const [filter2, setFilter2] = useState("all");
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [favoritesSliceValue, setFavoritesSliceValue] = useState(9);
  const [listedPage, setListedPage] = useState(1);
  const [listedPageSlice, setListedPageSlice] = useState(9);
  const [collectedPage, setCollectedPage] = useState(1);
  const [collectedPageSlice, setCollectedPageSlice] = useState(9);
  const [stakedPage, setStakedPage] = useState(1);
  const [stakedPageSlice, setStakedPageSlice] = useState(9);
  const [offersPageSlice, setoffersPageSlice] = useState(9);
  const [offersPage, setoffersPage] = useState(1);
  const [myOffersFiltered, setmyOffersFiltered] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [eventPopup, setEventPopup] = useState(false);
  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [announcementsNews, setAnnouncementsNews] = useState([]);

  const [showAllEvents, setShowAllEvents] = useState(false);
  const slider = useRef(null);
  const windowSize = useWindowSize();
  const [sliderCut, setSliderCut] = useState();
  const [showFirstNext, setShowFirstNext] = useState(false);
  const [icon, setIcon] = useState(false);

  const cutLength = () => {
    if (windowSize.width > 1600) {
      setSliderCut(4);
    } else if (windowSize.width > 1500) {
      setSliderCut(4);
    } else if (windowSize.width > 1400) {
      setSliderCut(3);
    } else if (windowSize.width > 1050) {
      setSliderCut(2);
    } else if (windowSize.width > 480) {
      setSliderCut(1);
    } else {
      setSliderCut(1);
    }
  };

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
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

  const handleFavoritesPage = (e, value) => {
    setFavoritesPage(value);
    setFavoritesSliceValue(value * 9);
  };
  const handleListedPage = (e, value) => {
    setListedPage(value);
    setListedPageSlice(value * 9);
  };
  const handleCollectedPage = (e, value) => {
    setCollectedPage(value);
    setCollectedPageSlice(value * 9);
  };

  const handleOffersPage = (value) => {
    setoffersPageSlice(value * 9);
    setoffersPage(value);
  };
  const handleStakedPage = (e, value) => {
    setStakedPage(value);
    setStakedPageSlice(value * 9);
  };

  const firstSlider = useRef();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const getAllnftsListed = async () => {
    const listedNFTS = await getListedNFTS(0, "", "seller", coinbase, "");

    setAllListed(listedNFTS);
  };

  const sortNfts = (sortValue) => {
    if (sortValue === "balance") {
      setFilterTitle("Balance");
    } else if (sortValue === "collected") {
      setFilterTitle("Collected");
    } else if (sortValue === "favorites") {
      setFilterTitle("Favorites");
      getAllFavs();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "listed") {
      setFilterTitle("Listed");
      setLoading(true);
      getListed();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "staked") {
      setFilterTitle("Staked");
      setLoading(true);
      // getStakes();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "eth") {
      setFilterTitle("");
    } else if (sortValue === "offers") {
      setLoading(true);
      setFilterTitle("Offers");
      setmyOffersFiltered(myOffers);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const filterRecentListings = (filter) => {
    setLoadingRecentListings(true);

    if (filterTitle === "Favorites") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_caws_address
        );
        setfavItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setfavItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setfavItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setfavItemsFiltered(favoriteItems);
      }
    }
    if (filterTitle === "Listed") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = listedItems.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setlistedItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setlistedItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setlistedItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setcollectedItemsFiltered(listedItems);
      }
    }
    if (filterTitle === "Staked") {
      if (filter === "land") {
        setRecentListingsFilter("land");
      } else if (filter === "cawswod") {
        setRecentListingsFilter("cawswod");
      } else if (filter === "all") {
        setRecentListingsFilter("all");
      }
    }
    if (filterTitle === "Offers") {
      if (filter === "land") {
        setRecentListingsFilter("land");
        setRecentListingsFilter("land");
        let timepieceFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setmyOffersFiltered(timepieceFilter);
      } else if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_caws_address
        );
        setmyOffersFiltered(cawsFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setmyOffersFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setmyOffersFiltered(myOffers);
      }
    }
    setTimeout(() => {
      setLoadingRecentListings(false);
    }, 1000);
  };

  const getListed = async () => {
    let finalItems = [];

    allListed &&
      allListed.length > 0 &&
      allListed.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          nft.isListed = true;
          finalItems.push(nft);
          nft.isStaked = false;
        }
      });
    setlistedItems(finalItems);
    setlistedItemsFiltered(finalItems);
  };

  const getCollected = async () => {
    var finalTimepieceArray = [];
    let finalLandArray = [];
    let finalCawsArray = [];
    let finalCollection = [];
    let stakeArray = [];
    let recievedOffers = [];
    let coingeckoNftsArray = [];
    let gateNftsArray = [];
    let confluxNftsArray = [];
    let baseNftsArray = [];
    let dogeNftsArray = [];
    let cmcNftsArray = [];
    let victionNftsArray = [];
    let coreNftsArray = [];
    let cawsBnbArray = [];
    let cawsAvaxArray = [];
    let cawsBaseArray = [];
    let landAvaxArray = [];
    let landBnbArray = [];
    let landBaseArray = [];
    let skaleNftsArray = [];

    // console.log(allListed, "allListed");

    //bought [latestBoughtNFTS]
    //listed [listedItems]
    //staked [myWodWodStakes,myCawsWodStakes,landStaked]
    //final [listed, to list, staked]
    if (coinbase) {
      if (myTimepieceCollected && myTimepieceCollected.length > 0) {
        await Promise.all(
          myTimepieceCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_timepiece_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_timepiece_address,
                  tokenId: i,
                  type: "timepiece",
                });
              });
            }

            finalTimepieceArray.push({
              nftAddress: window.config.nft_timepiece_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "timepiece",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_timepiece_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (MyNFTSLandBNB && MyNFTSLandBNB.length > 0) {
        await Promise.all(
          MyNFTSLandBNB.map(async (i) => {
            landBnbArray.push({
              nftAddress: window.config.nft_land_bnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "landbnb",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (MyNFTSLandAvax && MyNFTSLandAvax.length > 0) {
        await Promise.all(
          MyNFTSLandAvax.map(async (i) => {
            landAvaxArray.push({
              nftAddress: window.config.nft_land_avax_address,
              buyer: coinbase,
              tokenId: i,
              type: "landavax",
              chain: 43114,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (MyNFTSLandBase && MyNFTSLandBase.length > 0) {
        await Promise.all(
          MyNFTSLandBase.map(async (i) => {
            landBaseArray.push({
              nftAddress: window.config.nft_land_base_address,
              buyer: coinbase,
              tokenId: i,
              type: "landbase",
              chain: 8453,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (MyNFTSCawsBNB && MyNFTSCawsBNB.length > 0) {
        await Promise.all(
          MyNFTSCawsBNB.map(async (i) => {
            cawsBnbArray.push({
              nftAddress: window.config.nft_caws_bnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "cawsbnb",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (MyNFTSCawsAvax && MyNFTSCawsAvax.length > 0) {
        await Promise.all(
          MyNFTSCawsAvax.map(async (i) => {
            cawsAvaxArray.push({
              nftAddress: window.config.nft_caws_avax_address,
              buyer: coinbase,
              tokenId: i,
              type: "cawsavax",
              chain: 43114,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (MyNFTSCawsBase && MyNFTSCawsBase.length > 0) {
        await Promise.all(
          MyNFTSCawsBase.map(async (i) => {
            cawsBaseArray.push({
              nftAddress: window.config.nft_caws_base_address,
              buyer: coinbase,
              tokenId: i,
              type: "cawsbase",
              chain: 8453,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myNFTSCoingecko && myNFTSCoingecko.length > 0) {
        await Promise.all(
          myNFTSCoingecko.map(async (i) => {
            coingeckoNftsArray.push({
              nftAddress: window.config.nft_coingecko_address,
              buyer: coinbase,
              tokenId: i,
              type: "coingecko",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myGateNfts && myGateNfts.length > 0) {
        await Promise.all(
          myGateNfts.map(async (i) => {
            gateNftsArray.push({
              nftAddress: window.config.nft_gate_address,
              buyer: coinbase,
              tokenId: i,
              type: "gate",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myConfluxNfts && myConfluxNfts.length > 0) {
        await Promise.all(
          myConfluxNfts.map(async (i) => {
            confluxNftsArray.push({
              nftAddress: window.config.nft_conflux_address,
              buyer: coinbase,
              tokenId: i,
              type: "conflux",
              chain: 1030,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myBaseNfts && myBaseNfts.length > 0) {
        await Promise.all(
          myBaseNfts.map(async (i) => {
            baseNftsArray.push({
              nftAddress: window.config.nft_base_address,
              buyer: coinbase,
              tokenId: i,
              type: "base",
              chain: 8453,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myDogeNfts && myDogeNfts.length > 0) {
        await Promise.all(
          myDogeNfts.map(async (i) => {
            dogeNftsArray.push({
              nftAddress: window.config.nft_doge_address,
              buyer: coinbase,
              tokenId: i,
              type: "doge",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myCmcNfts && myCmcNfts.length > 0) {
        await Promise.all(
          myCmcNfts.map(async (i) => {
            cmcNftsArray.push({
              nftAddress: window.config.nft_cmc_address,
              buyer: coinbase,
              tokenId: i,
              type: "cmc",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myCoreNfts && myCoreNfts.length > 0) {
        await Promise.all(
          myCoreNfts.map(async (i) => {
            coreNftsArray.push({
              nftAddress: window.config.nft_core_address,
              buyer: coinbase,
              tokenId: i,
              type: "core",
              chain: 1116,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myVictionNfts && myVictionNfts.length > 0) {
        await Promise.all(
          myVictionNfts.map(async (i) => {
            victionNftsArray.push({
              nftAddress: window.config.nft_viction_address,
              buyer: coinbase,
              tokenId: i,
              type: "viction",
              chain: 88,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (mySkaleNfts && mySkaleNfts.length > 0) {
        await Promise.all(
          mySkaleNfts.map(async (i) => {
            skaleNftsArray.push({
              nftAddress: window.config.nft_skale_address,
              buyer: coinbase,
              tokenId: i,
              type: "skale",
              chain: 1482601649,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myLandCollected && myLandCollected.length > 0) {
        await Promise.all(
          myLandCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_land_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_land_address,
                  tokenId: i,
                  type: "land",
                });
              });
            }

            finalLandArray.push({
              nftAddress: window.config.nft_land_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "land",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_land_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (myCawsCollected && myCawsCollected.length > 0) {
        await Promise.all(
          myCawsCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_caws_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_caws_address,
                  tokenId: i,
                  type: "caws",
                });
              });
            }

            finalCawsArray.push({
              nftAddress: window.config.nft_caws_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "caws",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_caws_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (myWodWodStakes && myWodWodStakes.length > 0) {
        myWodWodStakes.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_land_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(1, i.name.length),
            type: "land",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }

      if (myCawsWodStakes && myCawsWodStakes.length > 0) {
        myCawsWodStakes.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_caws_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(6, i.name.length),
            type: "caws",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }

      if (landStaked && landStaked.length > 0) {
        landStaked.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_land_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(1, i.name.length),
            type: "land",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }
      setmyNftsOffer(recievedOffers);

      finalCollection = [
        ...cawsAvaxArray,
        ...cawsBnbArray,
        ...cawsBaseArray,
        ...landAvaxArray,
        ...landBnbArray,
        ...landBaseArray,
        ...coingeckoNftsArray,
        ...victionNftsArray,
        ...coreNftsArray,
        ...confluxNftsArray,
        ...gateNftsArray,
        ...baseNftsArray,
        ...dogeNftsArray,
        ...cmcNftsArray,
        ...skaleNftsArray,
        ...finalTimepieceArray,
        ...finalLandArray,
        ...finalCawsArray,
        ...stakeArray,
      ];

      setcollectedItems(finalCollection);
      setcollectedItemsFiltered(finalCollection);
    } else {
      setcollectedItems([]);
      setcollectedItemsFiltered([]);
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

  const getAllFavs = async () => {
    if (favoritesArray && favoritesArray.length > 0) {
      const unique = [...new Set(favoritesArray.map((item) => {}))];
      setfavoriteItems(favoritesArray);
      setfavItemsFiltered(favoritesArray);
    } else {
      setfavoriteItems([]);
      setfavItemsFiltered([]);
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecords(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setUserRank(testArray[0].position);
    }
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };

    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setGenesisRank(testArray[0].position);
    }
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
    setDypTokenDataAvax(dypprice);
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );

        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDataavax = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTwonfts = () => {
    const allnft = [...myCawsWodStakes, ...landStaked];
    setNftItems(allnft);
  };

  const handleSortCollection = (value1, value2) => {
    if (filter1 === "all" && filter2 === "all") {
      setcollectedItemsFiltered(collectedItems);
    } else if (filter1 === "land" && filter2 === "all") {
      let wodFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );

      let wodFilterbnb = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_land_bnb_address
      );

      let wodFilteravax = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_land_avax_address
      );

      let wodFilterbase = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_wod_base_address
      );

      const allcawsArray = [
        ...wodFilter,
        ...wodFilterbnb,
        ...wodFilteravax,
        ...wodFilterbase,
      ];
      setcollectedItemsFiltered(allcawsArray);
    } else if (filter1 === "betapass" && filter2 === "all") {
      let coingeckoFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_coingecko_address
      );
      let gateFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_gate_address
      );
      let dogeFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_doge_address
      );
      let cmcFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_cmc_address
      );
      let confluxFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_conflux_address
      );
      let baseFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_base_address
      );

      let skaleFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_skale_address
      );

      let coreFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_core_address
      );

      let victionFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_viction_address
      );

      const allBetapassArray = [
        ...coingeckoFilter,
        ...confluxFilter,
        ...gateFilter,
        ...dogeFilter,
        ...cmcFilter,
        ...baseFilter,
        ...skaleFilter,
        ...victionFilter,
        ...coreFilter,

      ];
      setcollectedItemsFiltered(allBetapassArray);
    } else if (filter1 === "timepiece" && filter2 === "all") {
      let timepieceFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setcollectedItemsFiltered(timepieceFilter);
    } else if (filter1 === "caws" && filter2 === "all") {
      let cawsFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );

      let cawsFilterbnb = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_bnb_address
      );

      let cawsFilteravax = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_avax_address
      );

      let cawsFilterbase = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_base_address
      );

      const allcawsArray = [
        ...cawsFilter,
        ...cawsFilterbnb,
        ...cawsFilteravax,
        ...cawsFilterbase,
      ];

      setcollectedItemsFiltered(allcawsArray);
    } else if (filter1 === "all" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === false && item.isStaked === false
      );

      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "betapass" && filter2 === "to list") {
      setcollectedItemsFiltered([]);
    } else if (filter1 === "all" && filter2 === "has offers") {
      setcollectedItemsFiltered(myNftsOffer);
    } else if (filter1 === "betapass" && filter2 === "has offers") {
      setcollectedItemsFiltered([]);
    } else if (filter1 === "all" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === true && item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "betapass" && filter2 === "listed") {
      setcollectedItemsFiltered([]);
    } else if (filter1 === "all" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter((item) => item.isStaked === true);
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "betapass" && filter2 === "in stake") {
      setcollectedItemsFiltered([]);
    } else if (filter1 === "land" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getPriceDYP();
    getTokenDataavax();
    getTokenDatabnb();
    getListed();
  }, []);

  useEffect(() => {
    getCollected();
    cutLength();
  }, [allListed, coinbase]);

  useEffect(() => {
    handleSortCollection();
  }, [filter1, filter2]);

  useEffect(() => {
    getAllFavs();
  }, [favoritesArray, latestBoughtNFTS]);

  // useEffect(() => {
  //   if (myTimepieceCollected || myCawsCollected || myLandCollected) {
  //     getCollected();
  //   }
  // }, [myTimepieceCollected, myCawsCollected, myLandCollected, coinbase]);

  useEffect(() => {
    getAllnftsListed();
  }, [listedNFTS]);

  useEffect(() => {
    getTwonfts();
  }, [landStaked, myCawsWodStakes]);

  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2024-02-01T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");

  const [dummyEvent, setDummyEvent] = useState({});
  const [reqModal, setReqModal] = useState(false);
  const [multiplayerModal, setmultiplayerModal] = useState(false);

  const releaseContent = useRef();

  const releaseContent2 = useRef();

  const openEvents = () => {
    setShowAllEvents(!showAllEvents);
    setShowNfts(false);
  };

  const fetchNews = async () => {
    const announcements = await axios
      .get("https://api3.dyp.finance/api/wod_announcements?page=1")
      .then((res) => {
        return res.data;
      });

    const announcementsDatedNews = announcements.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    const sortedAnnouncementsNews = announcementsDatedNews.sort(function (
      a,
      b
    ) {
      return b.date - a.date;
    });

    setAnnouncementsNews(sortedAnnouncementsNews[0]);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (showAllEvents && windowSize.width > 786) {
      releaseContent.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }

    if (showAllEvents && windowSize.width < 786) {
      releaseContent2.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [showAllEvents]);

  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <>
      <div className="main-wrapper py-4 w-100 d-flex flex-column gap-4 justify-content-center align-items-center">
        <div className="row w-100 gap-5 gap-lg-0 mx-0">
          <div className="col-12 col-lg-4 px-0 pe-lg-3 position-relative mt-3 mt-lg-3">
            <h6
              className="new-bundle-title ms-0 ms-lg-4"
              style={{ position: "absolute", top: "-35px" }}
            >
              Game activity
            </h6>
            <div className="game-activity-wrapper h-100">
              <div className="d-flex flex-column gap-5 justify-content-between h-100">
                <div className="d-flex flex-column gap-2 p-3">
                  <div className="d-flex flex-column gap-1">
                    <span className="text-white game-event-title">
                      World of Dypians
                    </span>
                    <span className="game-event-patchtitle d-flex algin-items-center gap-1">
                      Latest Patch: {latestVersion}{" "}
                      <img
                        src={require("./newAssets/orangePatch.svg").default}
                      />
                    </span>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="opacitywrapper4">
                      <a
                        className="game-event-download text-white d-flex align-items-center gap-2"
                        href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                        target="_blank"
                      >
                        <img
                          src={epicwhite}
                          alt="icon"
                          style={{ width: 20, height: 24 }}
                        />
                        Download
                      </a>
                    </div>
                    <div
                      className="opacitywrapper4"
                      onClick={() => {
                        setmultiplayerModal(true);
                      }}
                    >
                      <div
                        className="game-event-download text-white d-flex align-items-center gap-2"
                        // href="https://drive.google.com/drive/folders/1nS4HB9K9KZcJZWjS_AXV18At5gC0N96Z?usp=sharing"
                        target="_blank"
                      >
                        <img
                          src={multiplayer}
                          alt="icon"
                          style={{ width: 16, height: 16 }}
                        />
                        Multiplayer
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div
                    className="requirements-wrapper"
                    onClick={() => {
                      setReqModal(true);
                    }}
                  >
                    <span className="sys-req-text">
                      Check system requirements
                    </span>
                    <img src={arrowCircle} alt="" />
                  </div>

                  <div className="news-game-wrapper p-3">
                    <NavLink
                      to={`/news/${
                        announcementsNews?.id
                      }/${announcementsNews?.title?.replace(/\s/g, "-")}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <img
                            src={announcementsNews?.image}
                            className="game-img-second"
                          />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <span className="game-news-title">
                            {announcementsNews?.title}
                          </span>
                          <span
                            className="game-news-desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                announcementsNews?.content?.slice(0, 200) +
                                "...",
                            }}
                          ></span>
                          <div className="d-flex align-items-center gap-2 justify-content-between">
                            <span className="game-news-date d-flex align-items-center gap-1 ">
                              <img alt="" src={grayCalendar} />
                              {announcementsNews?.date?.toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </span>
                            <img src={arrowCircle} alt="" />
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      
      </div>
    </>
  );
};

export default WalletBalance;
