import React, { useState, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import MobileNav from "../../../components/MobileNav/MobileNav";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import { NavLink } from "react-router-dom";
import { getWodNfts } from "../../../actions/convertUsd";
import OutsideClickHandler from "react-outside-click-handler";
import traitIcon from "./assets/traitIcon.svg";
import priceIconUp from "./assets/priceIconUp.svg";
import priceIconDown from "./assets/priceIconDown.svg";
import filterIcon from "./assets/filterIcon.svg";
import ethIcon from "./assets/ethIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import emptyCheck from "./assets/emptyCheck.svg";
import fullCheck from "./assets/fullCheck.svg";
import FilterCard from "./FilterCard";
import traitXmark from "./assets/traitXmark.svg";
import filtersXmark from "./assets/filtersXmark.svg";
import axios from "axios";
import landmetadata from "../../../actions/landmetadata.json";
import { searchNFTsByTraits } from "../../../actions/filterTraits";
import { Skeleton } from "@mui/material";

const WoDNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  wodBought,
  handleRefreshListing,
  nftCount,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const windowSize = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTitle, setFilterTitle] = useState("Price low to high");
  const [initialNfts, setInitialNfts] = useState([]);
  const [landNfts, setLandNfts] = useState([]);
  const [landNfts2, setLandNfts2] = useState([]);

  const [favItems, setfavItems] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [next, setNext] = useState(0);
  const [next2, setNext2] = useState(0);

  const [paginatedData, setpaginatedData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  const [allwodNfts, setAllwod] = useState([]);
  const [openTraits, setOpenTraits] = useState(false);
  const [filters, setFilters] = useState([]);
  const [count, setCount] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [pricePoint, setPricePoint] = useState("lth");

  const [artifacts, setArtifacts] = useState({
    trait_type: "Artifacts",
    value: [],
  });
  const [multifunctionalBuilding, setMultifunctionalBuilding] = useState({
    trait_type: "Multi Functional Building",
    value: [],
  });
  const [npc, setNpc] = useState({ trait_type: "NPC", value: [] });
  const [aiNpc, setAiNpc] = useState({
    trait_type: "NPC - AI Powered",
    value: [],
  });
  const [tier, setTier] = useState({ trait_type: "Tier", value: [] });
  const [size, setSize] = useState({ trait_type: "Size", value: [] });
  const [building, setBuilding] = useState({
    trait_type: "Building",
    value: [],
  });
  const [workbench, setWorkbench] = useState({
    trait_type: "Workbench",
    value: [],
  });
  const [npcAttire, setNpcAttire] = useState({
    trait_type: "NPC - Attire",
    value: [],
  });
  const [gemstone, setGemstone] = useState({
    trait_type: "Gemstone",
    value: [],
  });
  const [selectedFilters, setSelectedFilters] = useState([
    artifacts,
    multifunctionalBuilding,
    npc,
    aiNpc,
    tier,
    size,
    building,
    workbench,
    npcAttire,
    gemstone,
  ]);

  const [displayFilters, setDisplayFilters] = useState([]);
  const [filterIds, setFilterIds] = useState(
    searchNFTsByTraits(selectedFilters, landmetadata)
  );
  let emptyFilters = [
    {
      trait_type: "Artifacts",
      value: [],
    },
    {
      trait_type: "Multi Functional Building",
      value: [],
    },
    { trait_type: "NPC", value: [] },
    {
      trait_type: "NPC - AI Powered",
      value: [],
    },
    { trait_type: "Tier", value: [] },
    { trait_type: "Size", value: [] },
    {
      trait_type: "Building",
      value: [],
    },
    {
      trait_type: "Workbench",
      value: [],
    },
    {
      trait_type: "NPC - Attire",
      value: [],
    },
    {
      trait_type: "Gemstone",
      value: [],
    },
  ];

  const listInnerRef = useRef();
  const nftsPerRow = 18;
  const allLandpiece = 999;

  const clearAll = () => {
    setArtifacts({ trait_type: "Artifacts", value: [] });
    setMultifunctionalBuilding({
      trait_type: "Multi Functional Building",
      value: [],
    });
    setNpc({ trait_type: "NPC", value: [] });
    setAiNpc({ trait_type: "NPC - AI Powered", value: [] });
    setTier({ trait_type: "Tier", value: [] });
    setSize({ trait_type: "Size", value: [] });
    setBuilding({ trait_type: "Building", value: [] });
    setWorkbench({ trait_type: "Workbench", value: [] });
    setNpcAttire({ trait_type: "NPC - Attire", value: [] });
    setGemstone({ trait_type: "Gemstone", value: [] });
    setSelectedFilters(emptyFilters);
    setDisplayFilters([]);
    setCount(0);
    setFilterIds(searchNFTsByTraits(emptyFilters, landmetadata));
  };

  const addProducts = (product, category) => {
    if (category === 0) {
      let testarr = artifacts;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setArtifacts(testarr);
      } else {
        testarr.value.push(product);
        setArtifacts(testarr);
      }

      setCount(count + 1);
    } else if (category === 1) {
      let testarr = multifunctionalBuilding;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setMultifunctionalBuilding(testarr);
      } else {
        testarr.value.push(product);
        setMultifunctionalBuilding(testarr);
      }

      setCount(count + 1);
    } else if (category === 2) {
      let testarr = npc;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setNpc(testarr);
      } else {
        testarr.value.push(product);
        setNpc(testarr);
      }

      setCount(count + 1);
    } else if (category === 3) {
      let testarr = aiNpc;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setAiNpc(testarr);
      } else {
        testarr.value.push(product);
        setAiNpc(testarr);
      }

      setCount(count + 1);
    } else if (category === 5) {
      let testarr = tier;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setTier(testarr);
      } else {
        testarr.value.push(product);
        setTier(testarr);
      }

      setCount(count + 1);
    } else if (category === 6) {
      let testarr = size;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setSize(testarr);
      } else {
        testarr.value.push(product);
        setSize(testarr);
      }

      setCount(count + 1);
    } else if (category === 7) {
      let testarr = building;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setBuilding(testarr);
      } else {
        testarr.value.push(product);
        setBuilding(testarr);
      }

      setCount(count + 1);
    } else if (category === 8) {
      let testarr = workbench;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setWorkbench(testarr);
      } else {
        testarr.value.push(product);
        setWorkbench(testarr);
      }

      setCount(count + 1);
    } else if (category === 9) {
      let testarr = npcAttire;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setNpcAttire(testarr);
      } else {
        testarr.value.push(product);
        setNpcAttire(testarr);
      }

      setCount(count + 1);
    } else if (category === 10) {
      let testarr = gemstone;
      let firstIndex = null;
      testarr.value.map((item, index) => {
        if (item === product) {
          firstIndex = index;
        }
      });
      if (firstIndex !== null) {
        testarr.value.splice(firstIndex, 1);
        setGemstone(testarr);
      } else {
        testarr.value.push(product);
        setGemstone(testarr);
      }

      setCount(count + 1);
    }

    let primarySelected = [
      artifacts,
      multifunctionalBuilding,
      npc,
      aiNpc,
      tier,
      size,
      building,
      workbench,
      npcAttire,
      gemstone,
    ];

    primarySelected = primarySelected.filter((item) => item.value.length !== 0);

    setSelectedFilters([
      artifacts,
      multifunctionalBuilding,
      npc,
      aiNpc,
      tier,
      size,
      building,
      workbench,
      npcAttire,
      gemstone,
    ]);

    let testDisplay = [];
    selectedFilters.map((item, index) => {
      item.value.map((item2) => {
        testDisplay.push({
          trait_type: item.trait_type,
          value: item2,
          id: index,
        });
      });
    });
    setDisplayFilters(testDisplay);

    // console.log(searchNFTsByTraits(primarySelected, cawsmetadata), "PLEASE WORK OMFG");
    setFilterIds(searchNFTsByTraits(primarySelected, landmetadata));
    // console.log(searchNFTsByTraits(primarySelected, landmetadata));
  };

  const fetchFilters = async () => {
    await axios
      .get("https://api.opensea.io/api/v1/collection/worldofdypians", {
        headers: {
          "X-API-KEY": "b132fcc52ab540f0b13a319bf57b34f0",
        },
      })
      .then((res) => {
        setFilters(res.data.collection.traits);
      });
  };

  const removeTrait = (trait) => {
    setSelectedFilters((current) =>
      current.filter((item) => item.value !== trait)
    );
    setCount(count + 1);
  };

  const sortNfts = (sortValue) => {
    if (sortValue === "htl") {
      let htl = initialNfts.sort((a, b) => {
        return b.priceUSD - a.priceUSD;
      });
      setLandNfts(htl);
    } else if (sortValue === "lth") {
      let lth = initialNfts.sort((a, b) => {
        return a.priceUSD - b.priceUSD;
      });
      setLandNfts(lth);
    } else if (sortValue === "lto") {
      let lto = initialNfts.sort((a, b) => {
        return b.date - a.date;
      });
      setLandNfts(lto);
    } else if (sortValue === "otl") {
      let otl = initialNfts.sort((a, b) => {
        return a.date - b.date;
      });
      setLandNfts(otl);
    } else if (sortValue === "dyp") {
      let dyp = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 0;
      });
      setLandNfts(dyp);
    } else if (sortValue === "eth") {
      let eth = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 1;
      });
      setLandNfts(eth);
    }
  };

  const getListedWod = async () => {
    const wod = await getWodNfts().catch((e) => {
      console.error(e);
    });

    const wodArray = [...wod, ...wodBought];
    const wodArray2 = [...wod];

    let uniquewod = wodArray.filter(
      (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
    );

    if (uniquewod && uniquewod.length > 0) {
      let datedNfts = uniquewod.map((nft, index) => {
        if (nft.tokenId == wodArray2[index]?.tokenId) {
          let date = new Date(nft?.blockTimestamp * 1000);

          return {
            ...nft,
            date: date,
            isListed: true,
            isLatestSale: true,
            LastSold: wodArray2[index]?.price,
            soldPriceType: wodArray2[index]?.payment_priceType,
          };
        } else if (nft.tokenId != wodArray2[index]?.tokenId && nft?.buyer) {
          let date = new Date(nft?.blockTimestamp * 1000);

          return {
            ...nft,
            date: date,
            isListed: false,
            isLatestSale: true,
            LastSold: nft?.price,
            soldPriceType: nft.payment_priceType,
          };
        }
      });

      setAllwod(datedNfts);
    }
  };

  const getWodCollection = async () => {
    let finalArray = [];
    let paginatedArray = paginatedData;

    for (
      let i = next;
      i < next + nftsPerRow && next + nftsPerRow < allLandpiece;
      i++
    ) {
      const owner = await window.landnft.ownerOf(i).catch((e) => {
        console.log(e);
      });

      finalArray.push({
        nftAddress: window.config.landnft_address,
        buyer: owner,
        tokenId: i.toString(),
        type: "land",
        chain: 1,
      });
    }
    const finaldata = [...paginatedArray, ...finalArray];

    setpaginatedData(finaldata);

    setfinalData(finaldata);
    return finaldata;
  };

  const testFunc = async () => {
    const array = Array.from({ length: 998 }, (_, index) => index + 1);

    const objArr = await Promise.all(
      array.map(async (i) => {
        const owner = await window.landnft.ownerOf(i).catch((e) => {
          console.log(e);
        });
        const attributes = await window.getLandNft(i);

        return {
          nftAddress: window.config.landnft_address,
          buyer: owner,
          tokenId: i.toString(),
          type: "land",
          chain: 1,
          attributes: attributes.attributes,
        };
      })
    );

    const objArrFiltered = objArr.filter(
      ({ tokenId: id1 }) => !allwodNfts.some(({ tokenId: id2 }) => id2 == id1)
    );

    const finalUnique = [...allwodNfts, ...objArrFiltered];
    setLandNfts2(finalUnique);
  };

  const fetchInitialWod = async () => {
    const collectionItems = finalData;
    const uniqueArray = collectionItems.filter(
      ({ tokenId: id1 }) => !allwodNfts.some(({ tokenId: id2 }) => id2 === id1)
    );
    const finalUnique = [...allwodNfts, ...uniqueArray];
    setLandNfts(finalUnique);
    setInitialNfts(finalUnique);
    setLoading(false);
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

  const loadMore = () => {
    setLoading(true);
    setNext(next + 12);
  };

  const loadMore2 = () => {
    setLoading(true);
    setNext2(next2 + 12);
  };

  const onScroll = () => {
    const wrappedElement = document.getElementById("header");
    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect()?.bottom <= window.innerHeight;
      if (isBottom) {
        if (count === 0) {
          if (next < allLandpiece) {
            loadMore();
          }
        } else {
          if (next2 < filterIds.length) {
            loadMore2();
          }
        }
        document.removeEventListener("scroll", onScroll);
      }
    }
  };

  useEffect(() => {
    sortNfts(pricePoint);
  }, [pricePoint]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  useEffect(() => {
    sortNfts("lth");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getWodCollection();
    document.title = "Genesis Land NFT";
  }, []);

  useEffect(() => {
    if (wodBought) {
      getListedWod();
    }
  }, [wodBought, nftCount]);

  useEffect(() => {
    loadMore2();
  }, [count]);

  useEffect(() => {
    if (landNfts && landNfts.length > 0 && loading === false) {
      testFunc();
    }
  }, [landNfts]);

  useEffect(() => {
    if (wodBought && allwodNfts.length > 0 && finalData.length > 0) {
      fetchInitialWod();
    }
  }, [allwodNfts.length, finalData.length, wodBought]);

  useEffect(() => {
    getWodCollection();
    fetchFilters();
  }, [next]);

  useEffect(() => {
    if (landNfts && landNfts.length === 0) {
      setLoading(true);
    }
    if (landNfts && landNfts.length > 0) {
      setLoading(false);
    }
  }, [landNfts]);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft  d-flex  align-items-start px-3 px-lg-5 position-relative"
          style={{ backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title font-raleway pt-4 pt-lg-0 mt-5 mt-lg-4">
                    Genesis <span style={{ color: "#8c56ff" }}>Land</span>
                  </h6>

                  <p className="collection-desc">
                    The Genesis Land offers <b>Access</b> to the metaverse,{" "}
                    <b>Ownership</b> to land in WoD, participate on different{" "}
                    <b>on-chain Events,</b> have a dedicated{" "}
                    <b> NFT Staking Pool,</b> ranking on <b>Leaderboard</b>, and
                    earn multiple <b>Rewards</b> by playing the game.
                  </p>
                  <NavLink to="/land" style={{ width: "fit-content" }}>
                    <button className="btn pill-btn">Explore</button>
                  </NavLink>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={require("./assets/landCollectionBanner.webp")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
            <div
              className="filters-container d-flex align-items-center justify-content-between my-4 p-3 position-relative"
              style={{ zIndex: 2 }}
            >
              <div class="dropdown" style={{ width: "150px" }}>
                <button
                  class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-2">
                    <img src={filterIcon} alt="" />
                    <h6 className="filter-nav-title mb-0">Filter</h6>
                  </div>
                  <img src={dropdownIcon} alt="" />
                </button>
                <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Oldest to newest");
                      sortNfts("otl");
                    }}
                  >
                    <span>Recently listed</span>
                  </li>
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Newest To Oldest");
                      sortNfts("lto");
                    }}
                  >
                    <span>Recently sold</span>
                  </li>
                  {/* <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Price: ETH");
                      sortNfts("eth");
                    }}
                  >
                    <span>Price: ETH</span>
                  </li>
                  <li
                    className="nft-dropdown-item"
                    onClick={() => {
                      setFilterTitle("Price: DYP");
                      sortNfts("dyp");
                    }}
                  >
                    <span>Price: DYP</span>
                  </li> */}
                  {/* <div className="d-flex w-100 align-items-center justify-content-around mt-2 py-2">
                    <div className="collection-price position-relative d-flex align-items-center gap-1  py-1 px-3">
                      <img
                        src={emptyCheck}
                        alt=""
                        className="collection-price-check"
                      />
                      <img src={ethIcon} width={12} height={12} alt="" />
                      <span className="collection-price-span mb-0">ETH</span>
                    </div>
                    <div className="collection-price position-relative d-flex align-items-center gap-1 py-1 px-3">
                      <img
                        src={emptyCheck}
                        alt=""
                        className="collection-price-check"
                      />
                      <img src={dypIcon} width={12} height={12} alt="" />
                      <span className="collection-price-span mb-0">DYP</span>
                    </div>
                  </div> */}
                </ul>
              </div>
              <div className="d-flex align-items-center gap-3 gap-lg-5">
                <div
                  className="filter-nav d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPricePoint(pricePoint === "lth" ? "htl" : "lth");
                  }}
                >
                  <img
                    src={pricePoint === "lth" ? priceIconUp : priceIconDown}
                    alt=""
                  />
                  <h6
                    className="filter-nav-title mb-0"
                    style={{
                      color: pricePoint === "lth" ? "#09F3D2" : "#FF6232",
                    }}
                  >
                    Price
                  </h6>
                </div>
                <div
                  className="filter-nav d-flex align-items-center gap-2"
                  onClick={() => setOpenTraits(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={traitIcon} alt="" />
                  <h6 className="filter-nav-title mb-0">Traits</h6>
                </div>
              </div>
            </div>
            <div className="selected-traits-wrapper d-flex align-items-center my-4 gap-2">
              {displayFilters.map((item, index) => (
                <div
                  className="selected-trait-item d-flex align-items-center p-2 gap-4"
                  key={index}
                >
                  <div className="d-flex align-items-center gap-1">
                    <span className="selected-trait-key">
                      {item.trait_type} :
                    </span>
                    <span className="selected-trait-value">{item.value}</span>
                  </div>
                  <img
                    src={traitXmark}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      displayFilters.length === 1
                        ? clearAll()
                        : addProducts(item.value, item.id)
                    }
                    alt=""
                  />
                </div>
              ))}
              {displayFilters.length > 0 && (
                <button
                  className="btn clear-all-btn p-2"
                  onClick={() => {
                    clearAll();
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className=" nft-page-wrapper d-flex flex-column gap-3 pb-3">
              <div
                className="d-flex align-items-center p-4 gap-4 justify-content-center"
                id="header"
                onScroll={onScroll}
                ref={listInnerRef}
              >
                <div className={"item-cards-wrapper"}>
                  {landNfts && landNfts.length > 0 && count === 0 ? (
                    <>
                      {landNfts.map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.blockTimestamp ?? index}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.seller?.toLowerCase() ===
                                coinbase?.toLowerCase() ||
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
                            dypTokenData={dypTokenData}
                            key={nft.id}
                            nft={nft}
                            isConnected={isConnected}
                            showConnectWallet={handleConnect}
                            isCaws={false}
                            isTimepiece={false}
                            isWod={true}
                            coinbase={coinbase}
                            lastSale={nft.buyer ? true : false}
                            lastSold={nft.LastSold}
                            isLatestSale={nft.isLatestSale}
                            isListed={nft.isListed}
                            soldPriceType={nft.soldPriceType}
                            handleRefreshListing={handleRefreshListing}
                          />
                        </NavLink>
                      ))}
                      {count === 0 && !loading && next < allLandpiece ? (
                        <button
                          className="btn py-2 px-3 nft-load-more-btn"
                          onClick={() => {
                            loadMore();
                          }}
                        >
                          Load more
                        </button>
                      ) : count === 0 && loading && next < allLandpiece ? (
                        <>
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : landNfts && landNfts.length === 0 && count === 0 ? (
                    <>
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {count > 0 && landNfts2 && landNfts2.length > 0 ? (
                    <>
                      {landNfts2
                        .filter(function (item) {
                          return filterIds.includes(item.tokenId);
                        })
                        .slice(0, next2)
                        .map((nft, index) => (
                          <NavLink
                            to={`/marketplace/nft/${index}`}
                            style={{ textDecoration: "none" }}
                            key={index}
                            state={{
                              nft: nft,
                              type: "land",
                              isOwner:
                                nft.seller?.toLowerCase() ===
                                  coinbase?.toLowerCase() ||
                                nft.buyer?.toLowerCase() ===
                                  coinbase?.toLowerCase(),
                              chain: nft.chain,
                            }}
                            onClick={() => {
                              updateViewCount(nft, window.config.nft_address);
                            }}
                          >
                            <ItemCard
                              ethTokenData={ethTokenData}
                              dypTokenData={dypTokenData}
                              key={nft.id}
                              nft={nft}
                              isConnected={isConnected}
                              showConnectWallet={handleConnect}
                              isCaws={false}
                              isTimepiece={false}
                              isWod={true}
                              coinbase={coinbase}
                              lastSold={nft.LastSold}
                              isLatestSale={nft.isLatestSale}
                              isListed={nft.isListed}
                              soldPriceType={nft.soldPriceType}
                            />
                          </NavLink>
                        ))}
                      {count > 0 && !loading && next2 < filterIds.length ? (
                        <button
                          className="btn py-2 px-3 nft-load-more-btn"
                          onClick={() => {
                            loadMore2();
                          }}
                        >
                          Load more
                        </button>
                      ) : count > 0 &&
                        loading &&
                        next2 < filterIds.length &&
                        filterIds.length > 0 ? (
                        <>
                         
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                          <Skeleton
                            animation="wave"
                            width={178}
                            variant="rounded"
                            height={230}
                            sx={{ bgcolor: "black.700" }}
                          />
                         
                          
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : count > 0 && landNfts2 && landNfts2.length === 0 ? (
                    <>
                      {" "}
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                      <Skeleton
                        animation="wave"
                        width={178}
                        variant="rounded"
                        height={230}
                        sx={{ bgcolor: "black.700" }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center w-100">
                {/* {!loading && next < allLandpiece ? (
                  <button
                    className="btn py-2 px-3 nft-load-more-btn"
                    onClick={() => loadMore()}
                  >
                    Load more
                  </button>
                ) : loading && next < allLandpiece && landNfts.length > 0 ? (
                  <HashLoader
                    color={"#554fd8"}
                    loading={loading}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenTraits(false)}>
        <div
          className={`filters-wrapper col-12 col-md-10 col-lg-8 col-xxl-5 ${
            openTraits && "filters-active"
          } p-4`}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="filters-title mb-0">Filters</h6>
            <img
              src={filtersXmark}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenTraits(false)}
              alt=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="select-category mb-0">Select Category</span>
            <span
              className="clear-all mb-0"
              style={{ cursor: "pointer" }}
              onClick={() => {
                clearAll();
              }}
            >
              Clear all
            </span>
          </div>
          <div className="filter-tabs d-flex align-items-center justify-content-start gap-4">
            {filters &&
              Object.entries(filters).map(([key, value], i) => (
                <div
                  className={`filter-tab px-2 py-1 d-flex align-items-center ${
                    categoryIndex === i && "filter-tab-active"
                  }`}
                  onClick={() => setCategoryIndex(i)}
                  key={i}
                >
                  <h6 className="filter-tab-title mb-0">
                    {key} ({Object.keys(value)?.length})
                  </h6>
                </div>
              ))}
          </div>
          <span className="filters-divider my-4"></span>
          {categoryIndex === 0 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[0] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[0]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 1 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[1] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[1]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 2 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[2] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[2]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 3 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[3] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[3]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 4 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[4] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[4]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 5 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[5] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[5]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 6 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[6] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[6]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 7 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[7] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[7]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 8 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[8] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[8]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 9 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[9] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[9]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
          {categoryIndex === 10 ? (
            <div
              className={`row align-items-center traits-wrapper `}
              style={{ rowGap: "20px" }}
            >
              {Object.values(filters)[10] &&
                Object.values(filters) &&
                Object.entries(Object.values(filters)[10]).map(
                  ([key, value], i) => (
                    // <span key={i}>{key} ({value})</span>
                    <FilterCard
                      title={key}
                      value={value}
                      categoryIndex={categoryIndex}
                      filters={filters}
                      addProducts={addProducts}
                      selectedFilters={selectedFilters}
                      count={count}
                    />
                  )
                )}
            </div>
          ) : null}
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default WoDNFT;
