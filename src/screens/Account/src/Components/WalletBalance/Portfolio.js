import React, { useState, useEffect, useRef } from "react";
import "./_walletbalance.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";

import CawsWodItem from "../../../../../components/ItemCard/CawsWodItem";
import Pagination from "@mui/material/Pagination";
import { Skeleton } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import useWindowSize from "../../../../../hooks/useWindowSize";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

const Portfolio = ({
  address,
  coinbase,

  isVerified,
  email,
  // handleConnectWallet,
  handleShowWalletPopup,

  userId,
  username,
  allListed,
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
  myImmutableNfts,
  latestVersion,
  MyNFTSLandBNB,
  MyNFTSCawsBNB,
  MyNFTSLandAvax,
  MyNFTSCawsAvax,
  MyNFTSLandBase,
  myNFTSBNB,
  myMatNfts,
  myNFTSopBNB,
  MyNFTSCawsBase,
  myMultiversNfts,
  myMantaNfts,
  myTaikoNfts,
  myCookieNfts,
  wodBalance,
  mySeiNfts,
  mykucoinNFTs,
  myVanarNFTs,
  myTeaBnbNfts,
  myTeaOpbnbNfts,
  myTeaSeiNfts,
  myTaraxaNfts,
  myTeaBaseNfts,
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

  const [filterTitle, setFilterTitle] = useState("Balance");
  const [nftItems, setNftItems] = useState([]);
  const [collectedItems, setcollectedItems] = useState([]);
  const [showNfts, setShowNfts] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);

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
  const [balanceView, setBalanceView] = useState(true);
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

  const sortNfts = (sortValue) => {
    if (sortValue === "collected") {
      setFilterTitle("Collected");
      setBalanceView(false);
    } else if (sortValue === "favorites") {
      setFilterTitle("Favorites");
      setBalanceView(false);

      getAllFavs();
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (sortValue === "balance") {
      setFilterTitle("Balance");
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (sortValue === "listed") {
      setFilterTitle("Listed");
      setBalanceView(false);

      setLoading(true);
      getListed();
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (sortValue === "staked") {
      setFilterTitle("Staked");
      setBalanceView(false);

      setLoading(true);
      // getStakes();
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (sortValue === "eth") {
      setFilterTitle("");
      setBalanceView(false);
    }
    //  else if (sortValue === "balance") {
    //   setFilterTitle("Balance");
    // }
    else if (sortValue === "offers") {
      setBalanceView(false);

      setLoading(true);
      setFilterTitle("Offers");
      setmyOffersFiltered(myOffers);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
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
    const timer = setTimeout(() => {
      setLoadingRecentListings(false);
    }, 1000);
    return () => clearTimeout(timer);
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
    let immutableNftsArray = [];
    let coreNftsArray = [];
    let cawsBnbArray = [];
    let cawsAvaxArray = [];
    let cawsBaseArray = [];
    let landAvaxArray = [];
    let landBnbArray = [];
    let landBaseArray = [];
    let skaleNftsArray = [];
    let bnbNftsArray = [];
    let opbnbNftsArray = [];
    let multiversNftsArray = [];
    let mantaNftsArray = [];
    let taikoNftsArray = [];
    let cookieNftsArray = [];
    let seiNftsArray = [];

    let matNftsArray = [];
    let kucoinNftsArray = [];
    let vanarNftsArray = [];
    let teaBnbArray = [];
    let teaopBnbArray = [];
    let teaBaseArray = [];
    let teaSeiArray = [];
    let taraxaArray = [];

    // console.log(allListed, "allListed");

    //bought [latestBoughtNFTS]
    //listed [listedItems]
    //staked [myWodWodStakes,myCawsWodStakes,landStaked]
    //final [listed, to list, staked]
    if (coinbase || address) {
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

      if (myNFTSBNB && myNFTSBNB.length > 0) {
        await Promise.all(
          myNFTSBNB.map(async (i) => {
            bnbNftsArray.push({
              nftAddress: window.config.nft_bnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "bnb",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myNFTSopBNB && myNFTSopBNB.length > 0) {
        await Promise.all(
          myNFTSopBNB.map(async (i) => {
            opbnbNftsArray.push({
              nftAddress: window.config.nft_opbnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "opbnb",
              chain: 204,
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

      if (myMatNfts && myMatNfts.length > 0) {
        await Promise.all(
          myMatNfts.map(async (i) => {
            matNftsArray.push({
              nftAddress: window.config.nft_mat_address,
              buyer: coinbase,
              tokenId: i,
              type: "mat",
              chain: 698,
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
      if (myImmutableNfts && myImmutableNfts > 0) {
        await Promise.all(
          [...Array(myImmutableNfts)].map((i) => {
            immutableNftsArray.push({
              nftAddress: window.config.nft_immutable_address,
              buyer: coinbase,
              tokenId: i,
              type: "immutable",
              chain: 13371,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myMultiversNfts && myMultiversNfts.length > 0) {
        await Promise.all(
          myMultiversNfts.map(async (i) => {
            multiversNftsArray.push({
              nftAddress: window.config.nft_multivers_address,
              buyer: coinbase,
              tokenId: i,
              type: "multivers",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myMantaNfts && myMantaNfts.length > 0) {
        await Promise.all(
          myMantaNfts.map(async (i) => {
            mantaNftsArray.push({
              nftAddress: window.config.nft_manta_address,
              buyer: coinbase,
              tokenId: i,
              type: "manta",
              chain: 169,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (mykucoinNFTs && mykucoinNFTs.length > 0) {
        await Promise.all(
          mykucoinNFTs.map(async (i) => {
            kucoinNftsArray.push({
              nftAddress: window.config.nft_kucoin_address,
              buyer: coinbase,
              tokenId: i,
              type: "kucoin",
              chain: 204,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myVanarNFTs && myVanarNFTs.length > 0) {
        await Promise.all(
          myVanarNFTs.map(async (i) => {
            vanarNftsArray.push({
              nftAddress: window.config.nft_vanar_address,
              buyer: coinbase,
              tokenId: i,
              type: "vanar",
              chain: 2040,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myTeaBnbNfts && myTeaBnbNfts.length > 0) {
        await Promise.all(
          myTeaBnbNfts.map(async (i) => {
            teaBnbArray.push({
              nftAddress: window.config.nft_teabnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "tea-bnb",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myTeaOpbnbNfts && myTeaOpbnbNfts.length > 0) {
        await Promise.all(
          myTeaOpbnbNfts.map(async (i) => {
            teaopBnbArray.push({
              nftAddress: window.config.nft_teaopbnb_address,
              buyer: coinbase,
              tokenId: i,
              type: "tea-opbnb",
              chain: 204,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myTeaBaseNfts && myTeaBaseNfts.length > 0) {
        await Promise.all(
          myTeaBaseNfts.map(async (i) => {
            teaBaseArray.push({
              nftAddress: window.config.nft_teabase_address,
              buyer: coinbase,
              tokenId: i,
              type: "tea-base",
              chain: 8453,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myTeaSeiNfts && myTeaSeiNfts.length > 0) {
        await Promise.all(
          myTeaSeiNfts.map(async (i) => {
            teaSeiArray.push({
              nftAddress: window.config.nft_teasei_address,
              buyer: coinbase,
              tokenId: i,
              type: "tea-sei",
              chain: 1329,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }
      if (myTaraxaNfts && myTaraxaNfts.length > 0) {
        await Promise.all(
          myTaraxaNfts.map(async (i) => {
            taraxaArray.push({
              nftAddress: window.config.nft_taraxa_address,
              buyer: coinbase,
              tokenId: i,
              type: "taraxa",
              chain: 841,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myTaikoNfts && myTaikoNfts.length > 0) {
        await Promise.all(
          myTaikoNfts.map(async (i) => {
            taikoNftsArray.push({
              nftAddress: window.config.nft_taiko_address,
              buyer: coinbase,
              tokenId: i,
              type: "taiko",
              chain: 167000,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }

      if (myCookieNfts && myCookieNfts.length > 0) {
        await Promise.all(
          myCookieNfts.map(async (i) => {
            cookieNftsArray.push({
              nftAddress: window.config.nft_cookie3_address,
              buyer: coinbase,
              tokenId: i,
              type: "cookie3",
              chain: 56,
              isStaked: false,
              isListed: false,
            });
          })
        );
      }
      if (mySeiNfts && mySeiNfts.length > 0) {
        await Promise.all(
          mySeiNfts.map(async (i) => {
            seiNftsArray.push({
              nftAddress: window.config.nft_sei_address,
              buyer: coinbase,
              tokenId: i,
              type: "sei",
              chain: 1329,
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
        ...teaBaseArray,
        ...teaBnbArray,
        ...teaSeiArray,
        ...taraxaArray,
        ...teaopBnbArray,
        ...kucoinNftsArray,
        ...vanarNftsArray,
        ...baseNftsArray,
        ...bnbNftsArray,
        ...matNftsArray,
        ...seiNftsArray,
        ...opbnbNftsArray,
        ...cookieNftsArray,
        ...multiversNftsArray,
        ...victionNftsArray,
        ...immutableNftsArray,
        ...mantaNftsArray,
        ...taikoNftsArray,
        ...coreNftsArray,
        ...confluxNftsArray,
        ...gateNftsArray,
        ...dogeNftsArray,
        ...cmcNftsArray,
        ...coingeckoNftsArray,
        ...skaleNftsArray,
        ...finalTimepieceArray,
        ...finalLandArray,
        ...finalCawsArray,
        ...stakeArray,
        ...coingeckoNftsArray,
        ...cawsAvaxArray,
        ...cawsBnbArray,
        ...cawsBaseArray,
        ...landAvaxArray,
        ...landBnbArray,
        ...landBaseArray,
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
      let kucoinFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_kucoin_address
      );
      let vanarFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_vanar_address
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

      let bnbFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_bnb_address
      );

      let opbnbFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_opbnb_address
      );

      let coreFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_core_address
      );

      let victionFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_viction_address
      );

      let immutableFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_immutable_address
      );

      let multiversFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_multivers_address
      );

      let mantaFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_manta_address
      );

      let taikoFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_taiko_address
      );

      let cookie3Filter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_cookie3_address
      );

      let seiFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_sei_address
      );

      let matFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_mat_address
      );

      let taraxaFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_taraxa_address
      );

      let teaFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_teabnb_address ||
          item.nftAddress === window.config.nft_teaopbnb_address ||
          item.nftAddress === window.config.nft_teabase_address ||
          item.nftAddress === window.config.nft_teasei_address
      );

      const allBetapassArray = [
        ...teaFilter,
        ...taraxaFilter,
        ...coingeckoFilter,
        ...vanarFilter,
        ...confluxFilter,
        ...gateFilter,
        ...dogeFilter,
        ...mantaFilter,
        ...taikoFilter,
        ...cookie3Filter,
        ...seiFilter,
        ...kucoinFilter,
        ...cmcFilter,
        ...matFilter,
        ...baseFilter,
        ...skaleFilter,
        ...victionFilter,
        ...immutableFilter,
        ...multiversFilter,
        ...coreFilter,
        ...bnbFilter,
        ...opbnbFilter,
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
    getTwonfts();
  }, [landStaked, myCawsWodStakes]);

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
          <div className="col-12 px-0 position-relative mt-lg-0">
            <div className="nft-outer-wrapper2 nft-outer-wrapper22 p-4  d-flex flex-column gap-2 position-relative h-100">
              <div className="account-nft-sort-wrapper d-flex align-items-center gap-3 px-3 py-2 ms-0">
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Balance" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("balance");
                    setShowNfts(false);
                  }}
                >
                  Balance
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Collected" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("collected");
                    setShowNfts(false);
                  }}
                >
                  Collected
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Favorites" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("favorites");
                    setShowNfts(false);
                  }}
                >
                  Favorites
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Listed" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("listed");
                    setShowNfts(false);
                  }}
                >
                  Listed
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Staked" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("staked");
                    setShowNfts(false);
                  }}
                >
                  Staked
                </h6>

                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Offers" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("offers");
                    setShowNfts(false);
                  }}
                >
                  Offers made
                </h6>
                {/* <h6
                  className={`account-nft-sort ${
                    filterTitle === "Balance" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("balance");
                    setShowNfts(false);
                  }}
                >
                  Balance
                </h6> */}
              </div>
              {filterTitle === "Balance" && loading === false && (
                <div className="row px-3 flex-column">
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0 wod-balance-txt">My Balance:</h6>
                    <img
                      src={"https://cdn.worldofdypians.com/wod/wodToken.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                    <h6 className="mb-0 wod-balance-txt">
                      {getFormattedNumber(wodBalance, 2)}
                    </h6>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <h6 className="mb-0 wod-balance-txt w-100 text-center mt-3">
                      Get WOD on
                    </h6>
                    <div className="sidebar-separator2 my-1"></div>
                  </div>

                  <div className="get-wod-portfolio-grid mt-2">
                    <a
                      href="https://www.binance.com/en/alpha/bsc/0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/binance-alpha.png"
                          }
                          className="buywodimg"
                        />
                        Binance Alpha
                      </h6>
                    </a>

                    <a
                      href="https://www.kucoin.com/trade/WOD-USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/kucoinBuyWod.svg"
                          }
                          className="buywodimg"
                        />
                        KuCoin
                      </h6>
                    </a>
                    <a
                      href="https://www.gate.io/trade/WOD_USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/gateBuyWod.svg"
                          }
                          className="buywodimg"
                        />
                        Gate.io
                      </h6>
                    </a>
                    <a
                      href="https://www.mexc.com/exchange/WOD_USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/mexcBuyWod.svg"
                          }
                          className="buywodimg"
                        />
                        MEXC Global
                      </h6>
                    </a>
                    <a
                      href="https://www.bitget.com/on-chain/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/bitgetRound.png"
                          }
                          className="buywodimg"
                        />
                        Bitget
                      </h6>
                    </a>
                    <a
                      href="https://www.bitpanda.com/en/prices/world-of-dypians-wod"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/bitpandaLogo.svg"
                          }
                          className="buywodimg"
                        />
                        Bitpanda
                      </h6>
                    </a>
                    <a
                      href="https://www.binance.com/en/download"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/binanceWalletUpdated.svg"
                          }
                          className="buywodimg"
                        />
                        Binance Wallet
                      </h6>
                    </a>
                    <a
                      href="https://web3.okx.com/token/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/okxConnect.svg"
                          }
                          className="buywodimg"
                        />
                        OKX Wallet
                      </h6>
                    </a>
                    <a
                      href="https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/pancakeBuyWod.svg"
                          }
                          className="buywodimg"
                        />
                        PancakeSwap
                      </h6>
                    </a>

                    <a
                      href="https://short.trustwallet.com/app-download"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/trustwalletBuyWod.svg"
                          }
                          className="buywodimg"
                        />
                        TrustWallet
                      </h6>
                    </a>
                    <a
                      href="https://changenow.io/currencies/world-of-dypians"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/changeNow.webp"
                          }
                          className="buywodimg"
                        />
                        ChangeNOW
                      </h6>
                    </a>
                    <a
                      href="https://blofin.com/spot/WOD-USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/blofinBuywod.png"
                          }
                          className="buywodimg"
                        />
                        BloFin
                      </h6>
                    </a>
                    <a
                      href="https://coinrabbit.io/exchange/"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/coinrabbit.png"
                          }
                          className="buywodimg"
                        />
                        CoinRabbit
                      </h6>
                    </a>
                    <a
                      href="https://hibt.com/trade/WOD-USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/hibt.png"}
                          className="buywodimg"
                        />
                        HiBt
                      </h6>
                    </a>
                    <a
                      href="https://www.kcex.com/exchange/WOD_USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/kcex.png"}
                          className="buywodimg"
                        />
                        KCEX
                      </h6>
                    </a>
                    <a
                      href="https://phemex.com/trade/WOD-USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/phemex.png"}
                          className="buywodimg"
                        />
                        Phemex
                      </h6>
                    </a>
                    <a
                      href="https://www.weex.com/spot/WOD-USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/phemex.png"}
                          className="buywodimg"
                        />
                        WEEX
                      </h6>
                    </a>
                    <a
                      href="https://www.toobit.com/en-US/spot/WOD_USDT"
                      target="_blank"
                      rel="noreferrer"
                      className="getwod-item"
                    >
                      <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/toobit.svg"}
                          className="buywodimg"
                        />
                        Toobit
                      </h6>
                    </a>
                  </div>
                </div>
              )}
              {filterTitle === "Favorites" && loading === false && (
                <div
                  className="row px-3 mt-3"
                  style={{ margin: favoriteItems.length === 0 ? "auto" : 0 }}
                >
                  {favoriteItems.length > 0 &&
                    favoriteItems.slice(0, 6).map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                        state={{
                          nft: item,
                          type:
                            item.nftAddress === window.config.nft_caws_address
                              ? "caws"
                              : item.nftAddress ===
                                window.config.nft_land_address
                              ? "land"
                              : "timepiece",
                          isOwner:
                            isVerified && email
                              ? item.buyer
                                ? item.buyer?.toLowerCase() ===
                                  address?.toLowerCase()
                                  ? item.buyer?.toLowerCase() ===
                                    coinbase?.toLowerCase()
                                  : item.seller?.toLowerCase() ===
                                    address?.toLowerCase()
                                : item.seller?.toLowerCase() ===
                                  coinbase?.toLowerCase()
                              : false,
                          chain: 1,
                        }}
                        onClick={() => {
                          updateViewCount(item.tokenId, item.nftAddress);
                        }}
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                item.nftAddress ===
                                  window.config.nft_cawsold_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_bnb_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_base_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_avax_address
                                  ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                                  : item.nftAddress ===
                                      window.config.nft_land_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_bnb_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_base_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_avax_address
                                  ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                  : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <h6 className="account-nft-title">
                                {item.nftAddress ===
                                  window.config.nft_cawsold_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_bnb_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_base_address ||
                                item.nftAddress ===
                                  window.config.nft_caws_avax_address
                                  ? "CAWS"
                                  : item.nftAddress ===
                                      window.config.nft_land_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_bnb_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_base_address ||
                                    item.nftAddress ===
                                      window.config.nft_land_avax_address
                                  ? "Genesis Land"
                                  : "CAWS Timepiece"}{" "}
                                #{item.tokenId}
                              </h6>
                              {/* <span className="account-nft-type">
                              {item.nftAddress ===
                                window.config.nft_cawsold_address ||
                              item.nftAddress === window.config.nft_caws_address
                                ? "CAWS"
                                : item.nftAddress ===
                                  window.config.nft_land_address
                                ? "Genesis Land"
                                : "Timepiece"}
                            </span> */}
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {favoriteItems.length === 0 && (coinbase || address) && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      You do not have any favorite NFTs
                    </span>
                  )}
                  {favoriteItems.length === 0 && !coinbase && !address && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      Connect your wallet to view your favorite NFTs.
                    </span>
                  )}
                </div>
              )}

              {filterTitle === "Offers" && loading === false && (
                <div
                  className="row px-3 mt-3"
                  style={{ margin: myOffers.length === 0 ? "auto" : 0 }}
                >
                  {myOffers.length > 0 &&
                    myOffers.slice(0, 6).map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                        state={{
                          nft: item,
                          type: item.type,
                          isOwner:
                            item.offer.buyer?.toLowerCase() ===
                            coinbase?.toLowerCase(),
                          chain: 1,
                        }}
                        onClick={() => {
                          updateViewCount(item.tokenId, item.nftAddress);
                        }}
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                item.type === "caws"
                                  ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                                  : item.type === "land"
                                  ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                  : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <h6 className="account-nft-title">
                                {item.type === "caws"
                                  ? "CAWS"
                                  : item.type === "land"
                                  ? "Genesis Land"
                                  : "CAWS Timepiece"}{" "}
                                #{item.tokenId}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {myOffers.length === 0 && (coinbase || address) && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      You have not made any offers
                    </span>
                  )}
                  {myOffers.length === 0 && !coinbase && !address && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      Connect your wallet to view the offers you have made.
                    </span>
                  )}
                </div>
              )}

              {filterTitle === "Collected" && loading === false && (
                <div
                  className="row px-3 mt-3"
                  style={{ margin: collectedItems.length === 0 ? "auto" : 0 }}
                >
                  {collectedItems.length > 0 &&
                    collectedItems.slice(0, 6).map((item, index) => (
                      <NavLink
                        key={index}
                        to={
                          item.isStaked === true
                            ? `/staking`
                            : `/shop/nft/${item.tokenId}/${item.nftAddress}`
                        }
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                        state={{
                          nft: item,
                          type:
                            item.nftAddress ===
                              window.config.nft_caws_address ||
                            item.nftAddress ===
                              window.config.nft_caws_bnb_address ||
                            item.nftAddress ===
                              window.config.nft_caws_base_address ||
                            item.nftAddress ===
                              window.config.nft_caws_avax_address
                              ? "caws"
                              : item.nftAddress ===
                                  window.config.nft_land_address ||
                                item.nftAddress ===
                                  window.config.nft_land_bnb_address ||
                                item.nftAddress ===
                                  window.config.nft_land_base_address ||
                                item.nftAddress ===
                                  window.config.nft_land_avax_address
                              ? "land"
                              : "timepiece",
                          isOwner:
                            (item.buyer &&
                              item.buyer.toLowerCase() ===
                                coinbase?.toLowerCase()) ||
                            (item.seller &&
                              item.seller.toLowerCase() ===
                                coinbase?.toLowerCase()),
                          chain: item.chain,
                        }}
                        onClick={() => {
                          updateViewCount(item.tokenId, item.nftAddress);
                        }}
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                item.type === "caws" ||
                                item.type === "cawsbnb" ||
                                item.type === "cawsavax" ||
                                item.type === "cawsbase"
                                  ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                                  : item.type === "land" ||
                                    item.type === "landbnb" ||
                                    item.type === "landavax" ||
                                    item.type === "landbase"
                                  ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                  : item.type === "coingecko"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/50x50_cg_pass.png`
                                  : item.type === "conflux"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+50px.png`
                                  : item.type === "doge"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+50x50.png`
                                  : item.type === "tea-bnb" ||
                                    item.type === "tea-base" ||
                                    item.type === "tea-opbnb" ||
                                    item.type === "tea-sei"
                                  ? `https://cdn.worldofdypians.com/wod/tea-fi-nft-50.webp`
                                  : item.type === "skale"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/SKALE+Beta+Pass+50x50.png`
                                  : item.type === "bnb"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+50.png`
                                  : item.type === "opbnb"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/opBNB+NFT+50.png`
                                  : item.type === "manta"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/manta+nft+50.png`
                                  : item.type === "cmc"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+50x50px.png`
                                  : item.type === "core"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/CORE+50.png`
                                  : item.type === "viction"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/Viction+50.png`
                                  : item.type === "immutable"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/immutable+50.png`
                                  : item.type === "multivers"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/MultiversX+NFT+50.png`
                                  : item.type === "taiko"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/taiko+nft+50.png`
                                  : item.type === "mat"
                                  ? `https://cdn.worldofdypians.com/media/matchbp50x50.png`
                                  : item.type === "cookie3"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/C3+50.png`
                                  : item.type === "sei"
                                  ? `https://cdn.worldofdypians.com/media/seibp50x50.png`
                                  : item.type === "base"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+50px.png`
                                  : item.type === "gate"
                                  ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate50.png`
                                  : item.type === "kucoin"
                                  ? `https://cdn.worldofdypians.com/wod/kucoin-bp-50.png`
                                  : item.type === "vanar"
                                  ? `https://cdn.worldofdypians.com/wod/vanar-50.png`
                                  : item.type === "taraxa"
                                  ? `https://cdn.worldofdypians.com/wod/taraxa-nft-50.png`
                                  : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <h6 className="account-nft-title">
                                {item.type === "caws" ||
                                item.type === "cawsbnb" ||
                                item.type === "cawsavax" ||
                                item.type === "cawsbase"
                                  ? "CAWS"
                                  : item.type === "land" ||
                                    item.type === "landbnb" ||
                                    item.type === "landavax" ||
                                    item.type === "landbase"
                                  ? "Genesis"
                                  : item.type === "coingecko"
                                  ? "CGBP"
                                  : item.type === "conflux"
                                  ? "CFBP"
                                  : item.type === "base"
                                  ? "BSBP"
                                  : item.type === "doge"
                                  ? "DCBP"
                                  : item.type === "tea-bnb" ||
                                    item.type === "tea-base" ||
                                    item.type === "tea-opbnb" ||
                                    item.type === "tea-sei"
                                  ? "TFBP"
                                  : item.type === "skale"
                                  ? "SKBP"
                                  : item.type === "cmc"
                                  ? "CMCBP"
                                  : item.type === "core"
                                  ? "COBP"
                                  : item.type === "viction"
                                  ? "VCBP"
                                  : item.type === "kucoin"
                                  ? "KCBP"
                                  : item.type === "vanar"
                                  ? "VNBP"
                                  : item.type === "taraxa"
                                  ? "TXBP"
                                  : item.type === "immutable"
                                  ? "IMXBP"
                                  : item.type === "multivers"
                                  ? "MXBP"
                                  : item.type === "manta"
                                  ? "MNBP"
                                  : item.type === "taiko"
                                  ? "TKBP"
                                  : item.type === "mat"
                                  ? "MCBP"
                                  : item.type === "cookie3"
                                  ? "CKBP"
                                  : item.type === "sei"
                                  ? "SEBP"
                                  : item.type === "gate"
                                  ? "GTBP"
                                  : item.type === "bnb"
                                  ? "BNBBP"
                                  : item.type === "opbnb"
                                  ? "opBNBBP"
                                  : "Timepiece"}

                                {item.type === "immutable"
                                  ? ""
                                  : `#${item.tokenId}`}
                              </h6>
                              {/* <span className="account-nft-type">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Land"
                                : "CAWS Timepiece"}
                            </span> */}
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {collectedItems.length === 0 && (coinbase || address) && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      You do not have any NFTs in your wallet
                    </span>
                  )}

                  {collectedItems.length === 0 && !coinbase && !address && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      Connect your wallet to view your NFTs.
                    </span>
                  )}
                </div>
              )}

              {filterTitle === "Staked" && loading === false && (
                <div
                  className="row px-3 mt-3"
                  style={{
                    margin:
                      myCawsWodStakes.length === 0 && landStaked.length === 0
                        ? "auto"
                        : 0,
                  }}
                >
                  {landStaked &&
                    landStaked.length > 0 &&
                    landStaked.slice(0, 4).map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/staking`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-6 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={`https://mint.worldofdypians.com/thumbs50/${item.name?.slice(
                                1,
                                landStaked[index].name?.length
                              )}.png`}
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <h6 className="account-nft-title">
                                {"Genesis"} {item.name}
                              </h6>
                              {/* <span className="account-nft-type">{"Land"}</span> */}
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {myCawsWodStakes &&
                    myCawsWodStakes.length > 0 &&
                    myCawsWodStakes.slice(0, 4).map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/staking`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-6 mb-3"
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <div className="d-flex">
                              <img
                                src={`https://mint.worldofdypians.com/thumbs50/${myWodWodStakes[
                                  index
                                ].name?.slice(
                                  1,
                                  myWodWodStakes[index].name?.length
                                )}.png`}
                                alt=""
                                className="account-card-img"
                              />
                              <img
                                src={`https://mint.dyp.finance/thumbs50/${item.name?.slice(
                                  6,
                                  item.name?.length
                                )}.png`}
                                alt=""
                                className="account-card-img"
                              />
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-center">
                              <h6 className="account-nft-title">
                                Genesis Land {myWodWodStakes[index].name}
                              </h6>
                              <h6 className="account-nft-title">{item.name}</h6>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {myCawsWodStakes.length === 0 &&
                    (coinbase || address) &&
                    landStaked.length === 0 && (
                      <span
                        className="seller-addr"
                        style={{ textAlign: "center" }}
                      >
                        You do not have any NFTs in stake
                      </span>
                    )}
                  {myCawsWodStakes.length === 0 && !coinbase && !address && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      Connect your wallet to view your staked NFTs.
                    </span>
                  )}
                </div>
              )}

              {filterTitle === "Listed" && loading === false && (
                <div
                  className="row px-3 mt-3"
                  style={{ margin: listedItems.length === 0 ? "auto" : 0 }}
                >
                  {listedItems.length > 0 &&
                    listedItems.slice(0, 6).map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                        style={{ textDecoration: "none" }}
                        className="col-12 col-lg-6 col-xxl-4 mb-3"
                        state={{
                          nft: item,
                          type: item.type,
                          isOwner:
                            item.seller &&
                            item.seller.toLowerCase() ===
                              coinbase?.toLowerCase(),
                          chain: item.chain,
                        }}
                        onClick={() => {
                          updateViewCount(item.tokenId, item.nftAddress);
                        }}
                      >
                        <div className="">
                          <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                            <img
                              src={
                                item.type === "caws"
                                  ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                                  : item.type === "land"
                                  ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                                  : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                              }
                              alt=""
                              className="account-card-img"
                            />
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <h6 className="account-nft-title">
                                {item.type === "caws"
                                  ? "CAWS"
                                  : item.type === "land"
                                  ? "Genesis Land"
                                  : "CAWS Timepiece"}{" "}
                                #{item.tokenId}
                              </h6>
                              {/* <span className="account-nft-type">
                              {item.type === "caws"
                                ? "CAWS"
                                : item.type === "land"
                                ? "Genesis Land"
                                : "Timepiece"}
                            </span> */}
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  {listedItems.length === 0 && (coinbase || address) && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      You do not have any listed NFTs
                    </span>
                  )}
                  {listedItems.length === 0 && !coinbase && !address && (
                    <span
                      className="seller-addr"
                      style={{ textAlign: "center" }}
                    >
                      Connect your wallet to view your listed NFTs.
                    </span>
                  )}
                </div>
              )}
              {/* 
              {filterTitle === "Balance" && loading === false && (
                <div className="d-flex flex-column  justify-content-center gap-2">
                  <div className="d-flex flex-row gap-2 align-items-center">
                    <h6 className="account-nft-title">Wallet Balance: </h6>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/wodToken.svg"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h6 className="account-nft-title">
                        {getFormattedNumber(wodBalance, 2)}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex w-100 flex-column gap-2 align-items-start">
                    <div className="d-flex justify-content-center align-items-center flex-column w-100">
                      <h6 className="getwodon-title mb-0">Get WOD on</h6>
                      <div className="sidebar-separator2 my-1"></div>
                    </div>
                    <div className="row mx-0 w-100">
                      <a
                        href="https://www.kucoin.com/trade/WOD-USDT"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/kucoinBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          KuCoin
                        </h6>
                      </a>
                      <a
                        href="https://www.gate.io/trade/WOD_USDT"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/gateBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          Gate.io
                        </h6>
                      </a>

                      <a
                        href="https://www.mexc.com/exchange/WOD_USDT"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/mexcBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          MEXC Global
                        </h6>
                      </a>
                      <a
                        href="https://www.bitpanda.com/en/prices/world-of-dypians-wod"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/bitpandaLogo.svg"
                            }
                            className="buywodimg"
                          />
                          Bitpanda
                        </h6>
                      </a>
                      <a
                        href="https://www.binance.com/en/download"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/binanceWalletUpdated.svg"
                            }
                            className="buywodimg"
                          />
                          Binance Wallet
                        </h6>
                      </a>
                      <a
                        href="https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/pancakeBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          PancakeSwap
                        </h6>
                      </a>
                      <a
                        href="https://thena.fi/swap?inputCurrency=BNB&outputCurrency=0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8&swapType=1"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/thenaBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          THENA
                        </h6>
                      </a>
                      <a
                        href="https://short.trustwallet.com/app-download"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/trustwalletBuyWod.svg"
                            }
                            className="buywodimg"
                          />
                          TrustWallet
                        </h6>
                      </a>
                      <a
                        href="https://changenow.io/currencies/world-of-dypians"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/changeNow.webp"
                            }
                            className="buywodimg"
                          />
                          ChangeNOW
                        </h6>
                      </a>
                      <a
                        href="https://blofin.com/spot/WOD-USDT"
                        target="_blank"
                        rel="noreferrer"
                        className="getwod-item"
                      >
                        <h6 className="bottomitems buy-wod-portfolio-text mb-0">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/blofinBuywod.png"
                            }
                            className="buywodimg"
                          />
                          BloFin
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              )} */}

              {loading === false &&
                ((filterTitle === "Collected" && collectedItems.length > 0) ||
                  (filterTitle === "Listed" && listedItems.length > 0) ||
                  (filterTitle === "Offers" && myOffers.length > 6) ||
                  (filterTitle === "Staked" &&
                    myCawsWodStakes.length + landStaked.length > 4) ||
                  (filterTitle === "Favorites" &&
                    favoriteItems.length > 0)) && (
                  <div
                    className="row w-100 justify-content-center position-absolute"
                    style={{ bottom: "15px" }}
                  >
                    {filterTitle === "Collected" &&
                    collectedItems.length >= 3 ? (
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          setShowNfts(!showNfts);
                          setShowAllEvents(false);
                        }}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <span className="account-view-all">
                          {showNfts ? "View Less" : "View All"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                          }
                          style={{ rotate: showNfts ? "0deg" : "180deg" }}
                          alt=""
                        />
                      </div>
                    ) : filterTitle === "Favorites" &&
                      favItemsFiltered.length > 6 ? (
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          setShowNfts(!showNfts);
                          setShowAllEvents(false);
                        }}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <span className="account-view-all">
                          {showNfts ? "View Less" : "View All"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                          }
                          style={{ rotate: showNfts ? "0deg" : "180deg" }}
                          alt=""
                        />
                      </div>
                    ) : filterTitle === "Offers" &&
                      favItemsFiltered.length > 6 ? (
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          setShowNfts(!showNfts);
                          setShowAllEvents(false);
                        }}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <span className="account-view-all">
                          {showNfts ? "View Less" : "View All"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                          }
                          style={{ rotate: showNfts ? "0deg" : "180deg" }}
                          alt=""
                        />
                      </div>
                    ) : filterTitle === "Listed" &&
                      listedItemsFiltered.length > 6 ? (
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          setShowNfts(!showNfts);
                          setShowAllEvents(false);
                        }}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <span className="account-view-all">
                          {showNfts ? "View Less" : "View All"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                          }
                          style={{ rotate: showNfts ? "0deg" : "180deg" }}
                          alt=""
                        />
                      </div>
                    ) : filterTitle === "Staked" &&
                      myCawsWodStakes.length > 6 ? (
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          setShowNfts(!showNfts);
                          setShowAllEvents(false);
                        }}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <span className="account-view-all">
                          {showNfts ? "View Less" : "View All"}
                        </span>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/viewAllArrow.svg"
                          }
                          style={{ rotate: showNfts ? "0deg" : "180deg" }}
                          alt=""
                        />
                      </div>
                    ) : null}
                  </div>
                )}

              {loading === true && (
                // <div className="loader-wrapper">
                //   <HashLoader
                //     color={"#554fd8"}
                //     loading={loading}
                //     cssOverride={override}
                //     aria-label="Loading Spinner"
                //     data-testid="loader"
                //   />
                // </div>
                <div className="row justify-content-center mt-3 px-3">
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                  <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={60}
                      animation="wave"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showNfts && (
          <div
            className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper2 nft-outer-wrapper22 position-relative p-3 p-lg-5 gap-2 col-lg-12"
            style={{ minHeight: "420px" }}
          >
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-end w-100 position-relative">
              {filterTitle !== "Staked" && filterTitle !== "Collected" ? (
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("caws")}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("land")}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("timepiece")}
                  >
                    Timepiece
                  </h6>
                </div>
              ) : filterTitle === "Staked" ? (
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "cawswod" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("cawswod")}
                  >
                    Land+CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("land");
                    }}
                  >
                    Land
                  </h6>
                </div>
              ) : (
                <div className="d-flex flex-column mb-3 flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                  <span className="totalcollection">
                    Total NFTs: {collectedItemsFiltered.length}
                  </span>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="dropdown" style={{ width: "150px" }}>
                      <button
                        className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="filter-nav-title mb-0">
                            {filter1 === "" ? "Collections" : filter1}
                          </h6>
                        </div>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/dropdownIcon.svg"
                          }
                          alt=""
                        />
                      </button>
                      <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("all");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>All</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("betapass");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Beta Pass</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("land");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Land</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("caws");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>CAWS</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("timepiece");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Timepiece</span>
                        </li>
                      </ul>
                    </div>

                    <div className="dropdown" style={{ width: "150px" }}>
                      <button
                        className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="filter-nav-title mb-0">
                            {filter2 === "" ? "Status" : filter2}
                          </h6>
                        </div>
                        <img
                          src={
                            "https://cdn.worldofdypians.com/wod/dropdownIcon.svg"
                          }
                          alt=""
                        />
                      </button>
                      <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("all");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>All</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("has offers");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Has offers</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("to list");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>To List</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("listed");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Listed</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("in stake");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>In Stake</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {loadingRecentListings === false && filterTitle === "Collected" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {collectedItemsFiltered &&
                    collectedItemsFiltered.length > 0 &&
                    collectedItemsFiltered
                      .slice(collectedPageSlice - 9, collectedPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={
                            nft.isStaked === true
                              ? `/staking`
                              : `/shop/nft/${nft.tokenId}/${nft.nftAddress}`
                          }
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft.nftAddress ===
                                window.config.nft_caws_address ||
                              nft.nftAddress ===
                                window.config.nft_caws_bnb_address ||
                              nft.nftAddress ===
                                window.config.nft_caws_base_address ||
                              nft.nftAddress ===
                                window.config.nft_caws_avax_address
                                ? "caws"
                                : nft.nftAddress ===
                                    window.config.nft_land_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_avax_address
                                ? "land"
                                : nft.nftAddress ===
                                  window.config.nft_gate_address
                                ? "gate"
                                : nft.nftAddress ===
                                  window.config.nft_conflux_address
                                ? "conflux"
                                : nft.nftAddress ===
                                  window.config.nft_base_address
                                ? "base"
                                : nft.nftAddress ===
                                  window.config.nft_doge_address
                                ? "doge"
                                : nft.nftAddress ===
                                  window.config.nft_teabnb_address
                                ? "tea-bnb"
                                : nft.nftAddress ===
                                  window.config.nft_teabase_address
                                ? "tea-base"
                                : nft.nftAddress ===
                                  window.config.nft_teaopbnb_address
                                ? "tea-opbnb"
                                : nft.nftAddress ===
                                  window.config.nft_teasei_address
                                ? "tea-sei"
                                : nft.nftAddress ===
                                  window.config.nft_skale_address
                                ? "skale"
                                : nft.nftAddress ===
                                  window.config.nft_bnb_address
                                ? "bnb"
                                : nft.nftAddress ===
                                  window.config.nft_opbnb_address
                                ? "opbnb"
                                : nft.nftAddress ===
                                  window.config.nft_cmc_address
                                ? "cmc"
                                : nft.nftAddress ===
                                  window.config.nft_coingecko_address
                                ? "coingecko"
                                : nft.nftAddress ===
                                  window.config.nft_core_address
                                ? "core"
                                : nft.nftAddress ===
                                  window.config.nft_bnb_address
                                ? "bnb"
                                : nft.nftAddress ===
                                  window.config.nft_viction_address
                                ? "viction"
                                : nft.nftAddress ===
                                  window.config.nft_kucoin_address
                                ? "kucoin"
                                : nft.nftAddress ===
                                  window.config.nft_vanar_address
                                ? "vanar"
                                : nft.nftAddress ===
                                  window.config.nft_immutable_address
                                ? "immutable"
                                : nft.nftAddress ===
                                  window.config.nft_multivers_address
                                ? "multivers"
                                : nft.nftAddress ===
                                  window.config.nft_manta_address
                                ? "manta"
                                : nft.nftAddress ===
                                  window.config.nft_taiko_address
                                ? "taiko"
                                : nft.nftAddress ===
                                  window.config.nft_mat_address
                                ? "mat"
                                : nft.nftAddress ===
                                  window.config.nft_cookie3_address
                                ? "cookie3"
                                : nft.nftAddress ===
                                  window.config.nft_sei_address
                                ? "sei"
                                : nft.nftAddress ===
                                  window.config.nft_taraxa_address
                                ? "taraxa"
                                : "timepiece",
                            // isOwner:
                            //   isVerified && email
                            //     ? nft.buyer
                            //       ? nft.buyer?.toLowerCase() ===
                            //         address?.toLowerCase()
                            //         ? nft.buyer?.toLowerCase() ===
                            //           coinbase?.toLowerCase()
                            //         : nft.seller?.toLowerCase() ===
                            //           address?.toLowerCase()
                            //       : nft.seller?.toLowerCase() ===
                            //         coinbase?.toLowerCase()
                            //     : false,
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                    window.config.nft_caws_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_avax_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                        window.config.nft_land_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_bnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_base_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_avax_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_gate_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_conflux_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_base_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_doge_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+50x50.png`
                                    : nft.nftAddress ===
                                        window.config.nft_teabnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teaopbnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teabase_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teasei_address
                                    ? `https://cdn.worldofdypians.com/wod/tea-fi-nft-50.webp`
                                    : nft.nftAddress ===
                                      window.config.nft_skale_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/SKALE+Beta+Pass+50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_bnb_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_manta_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/manta+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_taiko_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/taiko+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_mat_address
                                    ? `https://cdn.worldofdypians.com/media/matchbp50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_cookie3_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/C3+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_sei_address
                                    ? `https://cdn.worldofdypians.com/media/seibp50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_opbnb_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/opBNB+NFT+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_cmc_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+50x50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_core_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/CORE+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_bnb_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_viction_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Viction+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_kucoin_address
                                    ? `https://cdn.worldofdypians.com/wod/kucoin-bp-50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_vanar_address
                                    ? `https://cdn.worldofdypians.com/wod/vanar-50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_immutable_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/immutable+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_multivers_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/MultiversX+NFT+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_coingecko_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/50x50_cg_pass.png`
                                    : nft.nftAddress ===
                                      window.config.nft_taraxa_address
                                    ? `https://cdn.worldofdypians.com/wod/taraxa-nft-50.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                    window.config.nft_caws_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_avax_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                        window.config.nft_land_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_bnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_base_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_avax_address
                                    ? "Genesis Land"
                                    : nft.nftAddress ===
                                      window.config.nft_coingecko_address
                                    ? "CGBP"
                                    : nft.nftAddress ===
                                      window.config.nft_gate_address
                                    ? "GTBP"
                                    : nft.nftAddress ===
                                      window.config.nft_conflux_address
                                    ? "CFBP"
                                    : nft.nftAddress ===
                                      window.config.nft_base_address
                                    ? "BSBP"
                                    : nft.nftAddress ===
                                      window.config.nft_doge_address
                                    ? "DCBP"
                                    : nft.nftAddress ===
                                        window.config.nft_teabnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teaopbnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teabase_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teasei_address
                                    ? "TFBP"
                                    : nft.nftAddress ===
                                      window.config.nft_skale_address
                                    ? "SKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_bnb_address
                                    ? "BNBBP"
                                    : nft.nftAddress ===
                                      window.config.nft_opbnb_address
                                    ? "opBNBBP"
                                    : nft.nftAddress ===
                                      window.config.nft_cmc_address
                                    ? "CMCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_core_address
                                    ? "COBP"
                                    : nft.nftAddress ===
                                      window.config.nft_viction_address
                                    ? "VCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_kucoin_address
                                    ? "KCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_vanar_address
                                    ? "VNBP"
                                    : nft.nftAddress ===
                                      window.config.nft_immutable_address
                                    ? "IMXBP"
                                    : nft.nftAddress ===
                                      window.config.nft_multivers_address
                                    ? "MXBP"
                                    : nft.nftAddress ===
                                      window.config.nft_manta_address
                                    ? "MNBP"
                                    : nft.nftAddress ===
                                      window.config.nft_taiko_address
                                    ? "TKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_mat_address
                                    ? "MCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_cookie3_address
                                    ? "CKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_sei_address
                                    ? "SEBP"
                                    : nft.nftAddress ===
                                      window.config.nft_taraxa_address
                                    ? "TXBP"
                                    : "CAWS Timepiece"}{" "}
                                  {nft.nftAddress ===
                                  window.config.nft_immutable_address
                                    ? ""
                                    : `#${nft.tokenId}`}
                                </h6>
                                {/* <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Timepiece"}
                          </span> */}
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(collectedItemsFiltered.length / 9)}
                    page={collectedPage}
                    onChange={(e, value) => {
                      handleCollectedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Offers" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {myOffersFiltered &&
                    myOffersFiltered.length > 0 &&
                    myOffersFiltered
                      .slice(offersPageSlice - 9, offersPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.offer.buyer.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.type === "caws"
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.type === "land"
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.type === "caws"
                                    ? "CAWS"
                                    : nft.type === "land"
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(myOffersFiltered.length / 9)}
                    page={offersPage}
                    onChange={(e, value) => {
                      handleOffersPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false &&
              filterTitle === "Favorites" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {favItemsFiltered &&
                    favItemsFiltered.length > 0 &&
                    favItemsFiltered
                      .slice(favoritesSliceValue - 9, favoritesSliceValue)
                      .map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft?.type !== undefined &&
                              (nft.nftAddress ===
                                window.config.nft_caws_address ||
                                nft.nftAddress ===
                                  window.config.nft_caws_bnb_address ||
                                nft.nftAddress ===
                                  window.config.nft_caws_base_address ||
                                nft.nftAddress ===
                                  window.config.nft_caws_avax_address)
                                ? "caws"
                                : nft.nftAddress ===
                                    window.config.nft_land_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_land_avax_address
                                ? "land"
                                : nft.nftAddress ===
                                  window.config.nft_gate_address
                                ? "gate"
                                : nft.nftAddress ===
                                  window.config.nft_conflux_address
                                ? "conflux"
                                : nft.nftAddress ===
                                  window.config.nft_base_address
                                ? "base"
                                : nft.nftAddress ===
                                  window.config.nft_doge_address
                                ? "doge"
                                : nft.nftAddress ===
                                  window.config.nft_teabnb_address
                                ? "tea-bnb"
                                : nft.nftAddress ===
                                  window.config.nft_teaopbnb_address
                                ? "tea-opbnb"
                                : nft.nftAddress ===
                                  window.config.nft_teabase_address
                                ? "tea-base"
                                : nft.nftAddress ===
                                  window.config.nft_teasei_address
                                ? "tea-sei"
                                : nft.nftAddress ===
                                  window.config.nft_skale_address
                                ? "skale"
                                : nft.nftAddress ===
                                  window.config.nft_bnb_address
                                ? "bnb"
                                : nft.nftAddress ===
                                  window.config.nft_opbnb_address
                                ? "opbnb"
                                : nft.nftAddress ===
                                  window.config.nft_cmc_address
                                ? "cmc"
                                : nft.nftAddress ===
                                  window.config.nft_coingecko_address
                                ? "coingecko"
                                : nft.nftAddress ===
                                  window.config.nft_core_address
                                ? "core"
                                : nft.nftAddress ===
                                  window.config.nft_viction_address
                                ? "viction"
                                : nft.nftAddress ===
                                  window.config.nft_kucoin_address
                                ? "kucoin"
                                : nft.nftAddress ===
                                  window.config.nft_vanar_address
                                ? "vanar"
                                : nft.nftAddress ===
                                  window.config.nft_immutable_address
                                ? "immutable"
                                : nft.nftAddress ===
                                  window.config.nft_multivers_address
                                ? "multivers"
                                : nft.nftAddress ===
                                  window.config.nft_manta_address
                                ? "manta"
                                : nft.nftAddress ===
                                  window.config.nft_taiko_address
                                ? "taiko"
                                : nft.nftAddress ===
                                  window.config.nft_mat_address
                                ? "mat"
                                : nft.nftAddress ===
                                  window.config.nft_cookie3_address
                                ? "cookie3"
                                : nft.nftAddress ===
                                  window.config.nft_sei_address
                                ? "sei"
                                : nft.nftAddress ===
                                  window.config.nft_taraxa_address
                                ? "taraxa"
                                : "timepiece",
                            // isOwner:
                            //   isVerified && email
                            //     ? nft.buyer
                            //       ? nft.buyer?.toLowerCase() ===
                            //         address?.toLowerCase()
                            //         ? nft.buyer?.toLowerCase() ===
                            //           coinbase?.toLowerCase()
                            //         : nft.seller?.toLowerCase() ===
                            //           address?.toLowerCase()
                            //       : nft.seller?.toLowerCase() ===
                            //         coinbase?.toLowerCase()
                            //     : false,
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_avax_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                        window.config.nft_land_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_bnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_base_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_avax_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_gate_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_conflux_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_base_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_doge_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+50x50.png`
                                    : nft.nftAddress ===
                                        window.config.nft_teabnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teaopbnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teabase_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teasei_address
                                    ? `https://cdn.worldofdypians.com/wod/tea-fi-nft-50.webp`
                                    : nft.nftAddress ===
                                      window.config.nft_skale_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/SKALE+Beta+Pass+50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_bnb_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_opbnb_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/opBNB+NFT+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_cmc_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+50x50px.png`
                                    : nft.nftAddress ===
                                      window.config.nft_core_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/CORE+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_viction_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/Viction+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_kucoin_address
                                    ? `https://cdn.worldofdypians.com/wod/kucoin-bp-50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_vanar_address
                                    ? `https://cdn.worldofdypians.com/wod/vanar-50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_immutable_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/immutable+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_multivers_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/MultiversX+NFT+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_manta_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/manta+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_taiko_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/taiko+nft+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_mat_address
                                    ? `https://cdn.worldofdypians.com/media/matchbp50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_cookie3_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/C3+50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_sei_address
                                    ? `https://cdn.worldofdypians.com/media/seibp50x50.png`
                                    : nft.nftAddress ===
                                      window.config.nft_coingecko_address
                                    ? `https://dypmeta.s3.us-east-2.amazonaws.com/50x50_cg_pass.png`
                                    : nft.nftAddress ===
                                      window.config.nft_taraxa_address
                                    ? `https://cdn.worldofdypians.com/wod/taraxa-nft-50.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_bnb_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_base_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_avax_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                        window.config.nft_land_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_bnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_base_address ||
                                      nft.nftAddress ===
                                        window.config.nft_land_avax_address
                                    ? "Genesis Land"
                                    : nft.nftAddress ===
                                      window.config.nft_coingecko_address
                                    ? "CGBP"
                                    : nft.nftAddress ===
                                      window.config.nft_gate_address
                                    ? "GTBP"
                                    : nft.nftAddress ===
                                      window.config.nft_conflux_address
                                    ? "CFBP"
                                    : nft.nftAddress ===
                                      window.config.nft_base_address
                                    ? "BSBP"
                                    : nft.nftAddress ===
                                      window.config.nft_doge_address
                                    ? "DCBP"
                                    : nft.nftAddress ===
                                        window.config.nft_teabnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teaopbnb_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teabase_address ||
                                      nft.nftAddress ===
                                        window.config.nft_teasei_address
                                    ? "TFBP"
                                    : nft.nftAddress ===
                                      window.config.nft_skale_address
                                    ? "SKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_bnb_address
                                    ? "BNBBP"
                                    : nft.nftAddress ===
                                      window.config.nft_opbnb_address
                                    ? "opBNBBP"
                                    : nft.nftAddress ===
                                      window.config.nft_cmc_address
                                    ? "CMCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_core_address
                                    ? "COBP"
                                    : nft.nftAddress ===
                                      window.config.nft_viction_address
                                    ? "VCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_kucoin_address
                                    ? "KCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_vanar_address
                                    ? "VNBP"
                                    : nft.nftAddress ===
                                      window.config.nft_immutable_address
                                    ? "IMXBP"
                                    : nft.nftAddress ===
                                      window.config.nft_multivers_address
                                    ? "MXBP"
                                    : nft.nftAddress ===
                                      window.config.nft_manta_address
                                    ? "MNBP"
                                    : nft.nftAddress ===
                                      window.config.nft_taiko_address
                                    ? "TKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_mat_address
                                    ? "MCBP"
                                    : nft.nftAddress ===
                                      window.config.nft_cookie3_address
                                    ? "CKBP"
                                    : nft.nftAddress ===
                                      window.config.nft_sei_address
                                    ? "SEBP"
                                    : nft.nftAddress ===
                                      window.config.nft_taraxa_address
                                    ? "TXBP"
                                    : "CAWS Timepiece"}{" "}
                                  {nft.nftAddress ===
                                  window.config.nft_immutable_address
                                    ? ""
                                    : `#${nft.tokenId}`}
                                </h6>
                                {/* <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Caws Timepiece"}
                          </span> */}
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(favItemsFiltered.length / 9)}
                    page={favoritesPage}
                    onChange={(e, value) => {
                      handleFavoritesPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Listed" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {listedItemsFiltered &&
                    listedItemsFiltered.length > 0 &&
                    listedItemsFiltered
                      .slice(listedPageSlice - 9, listedPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={`/shop/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft.type ??
                              nft.nftAddress === window.config.nft_caws_address
                                ? "caws"
                                : nft.nftAddress ===
                                  window.config.nft_land_address
                                ? "land"
                                : "timepiece",
                            // isOwner:
                            //   isVerified && email
                            //     ? nft.buyer
                            //       ? nft.buyer?.toLowerCase() ===
                            //         address?.toLowerCase()
                            //         ? nft.buyer?.toLowerCase() ===
                            //           coinbase?.toLowerCase()
                            //         : nft.seller?.toLowerCase() ===
                            //           address?.toLowerCase()
                            //       : nft.seller?.toLowerCase() ===
                            //         coinbase?.toLowerCase()
                            //     : false,
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
                                {/* <span className="account-nft-type">
                            {nft.nftAddress ===
                              window.config.nft_cawsold_address ||
                            nft.nftAddress === window.config.nft_caws_address
                              ? "CAWS"
                              : nft.nftAddress ===
                                window.config.nft_land_address
                              ? "Genesis Land"
                              : "Timepiece"}
                          </span> */}
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(listedItemsFiltered.length / 9)}
                    page={listedPage}
                    onChange={(e, value) => {
                      handleListedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Staked" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {recentListingsFilter === "cawswod"
                    ? myCawsWodStakes &&
                      myCawsWodStakes.length > 0 &&
                      myCawsWodStakes
                        .slice(stakedPageSlice - 9, stakedPageSlice)
                        .map((nft, index) => (
                          <NavLink
                            to={`/staking`}
                            style={{ textDecoration: "none" }}
                            key={index}
                            className="col-12 col-lg-6 col-xxl-4 mb-3"
                          >
                            <div className="">
                              <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                                <div className="d-flex">
                                  <img
                                    src={nft.image}
                                    alt=""
                                    className="account-card-img"
                                  />
                                  <img
                                    src={myWodWodStakes[index].image}
                                    alt=""
                                    className="account-card-img"
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <h6 className="account-nft-title">
                                    Land {myWodWodStakes[index].name}
                                  </h6>
                                  <h6 className="account-nft-title">
                                    {nft.name}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            {/* <CawsWodItem
                        cawsImg={nft.image}
                        wodImg={myWodWodStakes[index].image}
                        cawsName={nft.name}
                        wodName={myWodWodStakes[index].name}
                      /> */}
                          </NavLink>
                        ))
                    : recentListingsFilter === "land"
                    ? landStaked &&
                      landStaked.length > 0 &&
                      landStaked.map((nft, index) => (
                        <NavLink
                          to={`/staking`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <div className="d-flex">
                                <img
                                  src={nft.image}
                                  alt=""
                                  className="account-card-img"
                                />
                              </div>
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  Land {nft.name}
                                </h6>
                                {/* <span className="account-nft-type">
                              Genesis Land
                            </span> */}
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))
                    : nftItems &&
                      nftItems.length > 0 &&
                      nftItems.map((nft, index) => (
                        <NavLink
                          to={`/staking`}
                          style={{ textDecoration: "none" }}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          key={index}
                        >
                          <CawsWodItem
                            cawsImg={nft?.name.includes("CAWS") && nft?.image}
                            wodImg={myWodWodStakes[index]?.image ?? nft?.image}
                            cawsName={nft?.name.includes("CAWS") && nft?.name}
                            wodName={myWodWodStakes[index]?.name ?? nft?.name}
                          />
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(myCawsWodStakes.length / 9)}
                    page={stakedPage}
                    onChange={(e, value) => {
                      handleStakedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : (
              // <div className="loader-wrapper">
              //   <HashLoader
              //     color={"#554fd8"}
              //     loading={loadingRecentListings}
              //     cssOverride={override}
              //     aria-label="Loading Spinner"
              //     data-testid="loader"
              //   />
              // </div>
              <div className="row justify-content-center px-3">
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 mb-3">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={60}
                    animation="wave"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {reqModal === true && (
          <OutsideClickHandler onOutsideClick={() => setReqModal(false)}>
            <div className="system-requirements-modal p-3" id="reqmodal">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex flex-column gap-2">
                  <h6 className="sys-req-title font-organetto">System</h6>
                  <h6
                    className="sys-req-title font-organetto mb-3"
                    style={{ color: "#8c56ff" }}
                  >
                    Requirements
                  </h6>
                </div>
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  alt="x mark"
                  style={{ cursor: "pointer" }}
                  onClick={() => setReqModal(false)}
                />
              </div>

              <hr className="requirements-divider" />
              <div className="overall-requirements">
                <h6 className="requirements-title">World of Dypians</h6>
                <p className="requirements-content">
                  A unique digital world where players can explore through
                  endless maps hunting for rewards, special items and digital
                  currency. The game features the main character and a cat (NFT)
                  which will begin the journey to explore different lands
                  together. World of Dypians is a game where players
                  continuously shape the game and capture value from their
                  achievements.
                </p>
                <h6 className="requirements-title">
                  World of Dypians Minimum System Requirements
                </h6>
                <ul>
                  <li className="requirements-content">
                    Requires a 64-bit processor and operating system
                  </li>
                  <li className="requirements-content">OS: Windows 10</li>
                  <li className="requirements-content">
                    Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X
                  </li>
                  <li className="requirements-content">Memory: 8 GB RAM</li>
                  <li className="requirements-content">
                    Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580
                    4 GB
                  </li>
                  <li className="requirements-content">DirectX: Version 12</li>
                  <li className="requirements-content">
                    Storage: 12 GB available space
                  </li>
                  <li className="requirements-content">
                    Sound Card: Windows Compatible Audio Device
                  </li>
                </ul>
                <hr className="requirements-divider" />
                <h6 className="requirements-title">
                  World of Dypians Recommended Requirements
                </h6>
                <ul>
                  <li className="requirements-content">
                    Requires a 64-bit processor and operating system
                  </li>
                  <li className="requirements-content">OS: Windows 10/11</li>
                  <li className="requirements-content">
                    Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X
                  </li>
                  <li className="requirements-content">Memory: 12 GB RAM</li>
                  <li className="requirements-content">
                    Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA
                    56 8 GB
                  </li>
                  <li className="requirements-content">DirectX: Version 12</li>
                  <li className="requirements-content">
                    Storage: 20 GB available space
                  </li>
                  <li className="requirements-content">
                    Sound Card: Windows Compatible Audio Device
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center justify-content-center py-3">
                <h6 className="close-modal" onClick={() => setReqModal(false)}>
                  Close
                </h6>
              </div>
            </div>
          </OutsideClickHandler>
        )}

        {multiplayerModal === true && (
          <OutsideClickHandler
            onOutsideClick={() => setmultiplayerModal(false)}
          >
            <div className="system-requirements-modal p-3" id="reqmodal">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column gap-2">
                  <h6 className="sys-req-title">
                    World of Dypians Multiplayer
                  </h6>
                </div>
                <img
                  src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
                  alt="x mark"
                  style={{ cursor: "pointer" }}
                  onClick={() => setmultiplayerModal(false)}
                />
              </div>

              <div className="overall-requirements">
                <h6 className="requirements-title">Closed Demo</h6>
                <p className="requirements-content">
                  The World of Dypians Multiplayer you are about to experience
                  is a closed demo specifically designed for testing purposes.
                  This means that you are stepping into an environment that is
                  still under development and not the final version of the game.
                </p>
                <h6 className="requirements-title">Basic Functionalities</h6>
                <p className="requirements-content">
                  While the closed demo offers a glimpse into the vast potential
                  of the World of Dypians Multiplayer, please be aware that some
                  features and functionalities may be limited or subject to
                  changes. The game is a work in progress, and your feedback
                  will play a crucial role in shaping its final form.
                </p>

                <h6 className="requirements-title">Text and Voice Chat</h6>
                <p className="requirements-content">
                  Communication is key in the World of Dypians Multiplayer, and
                  during this closed demo, you can interact with fellow players
                  through both text and voice chat functionalities.
                </p>

                <h6 className="requirements-title">
                  Reporting Bugs and Feedback
                </h6>
                <p className="requirements-content">
                  As you explore the world and encounter various elements,
                  please keep an eye out for any bugs or issues. If you come
                  across something unexpected or have suggestions for
                  improvement, don't hesitate to provide feedback. Your input is
                  immensely valuable in ensuring a smooth gaming experience for
                  all.
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center py-3">
                <a
                  href="https://drive.google.com/drive/folders/1nS4HB9K9KZcJZWjS_AXV18At5gC0N96Z?usp=sharing"
                  target={"_blank"}
                  rel="noreferrer"
                  onClick={() => {
                    setmultiplayerModal(false);
                  }}
                >
                  <div
                    className="linear-border"
                    style={{
                      width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <button className="btn filled-btn px-5">Download</button>
                  </div>
                </a>
              </div>
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </>
  );
};

export default Portfolio;
