import React, { useState, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import MobileNav from "../../../components/MobileNav/MobileNav";
import searchIcon from "../assets/search.svg";
import dropdownIcon from "../assets/dropdownIcon.svg";
import { NavLink } from "react-router-dom";
import { getCawsNfts, getCawsOldNfts } from "../../../actions/convertUsd";
import "./_filters.scss";
import filtersXmark from "./assets/filtersXmark.svg";
import axios from "axios";
import { Checkbox } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import traitIcon from "./assets/traitIcon.svg";
import priceIcon from "./assets/priceIcon.svg";
import filterIcon from "./assets/filterIcon.svg";
import ethIcon from "./assets/ethIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import emptyCheck from "./assets/emptyCheck.svg";
import fullCheck from "./assets/fullCheck.svg";
import FilterCard from "./FilterCard";

const CawsNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  const windowSize = useWindowSize();
  const nftsPerRow = 18;
  const allCaws = 10000;

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTitle, setFilterTitle] = useState("Price low to high");
  const [initialNfts, setInitialNfts] = useState([]);
  const [cawsNFTS, setCawsNFTS] = useState([]);
  const [favItems, setfavItems] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [next, setNext] = useState(0);
  const [filters, setFilters] = useState([]);
  const [paginatedData, setpaginatedData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  const [allCawsNfts, setAllcaws] = useState([]);
  const listInnerRef = useRef();
  const [openTraits, setOpenTraits] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const addProducts = (product) => {
    let testarr = selectedFilters;
    let firstIndex = null;
    testarr.map((item, index) => {
      if (item.key === product.key && item.value === product.value) {
        firstIndex = index;
      }
    });
    console.log(firstIndex, "Index");
    if (firstIndex !== null) {
      testarr.splice(firstIndex, 1);
      setSelectedFilters(testarr);
    } else {
      testarr.push(product);
      setSelectedFilters(testarr);
    }
    console.log(selectedFilters);
  };
  const fetchFilters = async () => {
    await axios
      .get(
        "https://api.opensea.io/api/v1/collection/catsandwatchessocietycaws",
        {
          headers: {
            "X-API-KEY": "b132fcc52ab540f0b13a319bf57b34f0",
          },
        }
      )
      .then((res) => {
        setFilters(res.data.collection.traits);
      });
  };

  const sortNfts = (sortValue) => {
    if (sortValue === "htl") {
      let htl = initialNfts.sort((a, b) => {
        return b.priceUSD - a.priceUSD;
      });
      setCawsNFTS(htl);
    } else if (sortValue === "lth") {
      let lth = initialNfts.sort((a, b) => {
        return a.priceUSD - b.priceUSD;
      });
      setCawsNFTS(lth);
    } else if (sortValue === "lto") {
      let lto = initialNfts.sort((a, b) => {
        return b.date - a.date;
      });
      setCawsNFTS(lto);
    } else if (sortValue === "otl") {
      let otl = initialNfts.sort((a, b) => {
        return a.date - b.date;
      });
      setCawsNFTS(otl);
    } else if (sortValue === "dyp") {
      let dyp = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 0;
      });
      setCawsNFTS(dyp);
    } else if (sortValue === "eth") {
      let eth = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 1;
      });
      setCawsNFTS(eth);
    }
  };

  const getListedCaws = async () => {
    const cawsnew = await getCawsNfts().catch((e) => {
      console.error(e);
    });
    const cawsold = await getCawsOldNfts().catch((e) => {
      console.error(e);
    });
    const cawsArray = [...cawsnew, ...cawsold];

    if (cawsArray && cawsArray.length > 0) {
      let datedNfts = cawsArray.map((nft) => {
        let date = new Date(nft?.blockTimestamp * 1000);
        return { ...nft, date: date };
      });

      setAllcaws(datedNfts);
    }
  };

  const getCawsCollection = async () => {
    let finalArray = [];
    let paginatedArray = paginatedData;

    console.log(next);
    for (
      let i = next;
      i < nftsPerRow + next && next + nftsPerRow < allCaws;
      i++
    ) {
      const owner = await window.nft.ownerOf(i).catch((e) => {
        console.log(e);
      });

      finalArray.push({
        nftAddress: window.config.nft_address,
        buyer: owner,
        tokenId: i.toString(),
        type: "caws",
        chain: 1,
      });
    }

    const finaldata = [...paginatedArray, ...finalArray];

    setpaginatedData(finaldata);

    setfinalData(finaldata);
    return finaldata;
  };

  const fetchInitialCaws = async () => {
    const cawsArray = allCawsNfts;
    const collectionItems = finalData;
    const uniqueArray = collectionItems.filter(
      ({ tokenId: id1 }) => !cawsArray.some(({ tokenId: id2 }) => id2 === id1)
    );
    const finalUnique = [...cawsArray, ...uniqueArray];
    setCawsNFTS(finalUnique);
    setInitialNfts(finalUnique);
    setLoading(false);
  };

  async function fetchUserFavorites(userId) {
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching user favorites");
        }
        const data = await response.json();
        // console.log(data.favorites);

        setFavorites(data.favorites);
        return data.favorites;
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
      }
    }
  }

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
    setNext(next + nftsPerRow);
    setLoading(true);
  };

  const onScroll = () => {
    const wrappedElement = document.getElementById("header");
    console.log(wrappedElement);
    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect()?.bottom <= window.innerHeight;
      if (isBottom) {
        if (next < allCaws) {
          loadMore();
        }
        document.removeEventListener("scroll", onScroll);
      }
    }
  };

  const updateFavs = () => {
    setfavItems(favItems + 1);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  });

  useEffect(() => {
    fetchUserFavorites(coinbase);
  }, [coinbase, favItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCawsCollection();
    getListedCaws();
    fetchFilters();
    fetchInitialCaws();
    document.title = "CAWS NFT";
  }, []);

  useEffect(() => {
    getCawsCollection();
  }, [next]);

  useEffect(() => {
    fetchInitialCaws();
  }, [paginatedData]);

  useEffect(() => {
    if (cawsNFTS && cawsNFTS.length === 0) {
      setLoading(true);
    }
    if (cawsNFTS && cawsNFTS.length > 0) {
      setLoading(false);
    }
    sortNfts("lth");
  }, [cawsNFTS]);

  // console.log(filters);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
        id="header"
        onScroll={onScroll}
        ref={listInnerRef}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative"
          style={{ backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title font-raleway pt-4 pt-lg-0 mt-5 mt-lg-4">
                    Cats And Watches Society{" "}
                    <span style={{ color: "#8c56ff" }}>(CAWS)</span>
                  </h6>
                  <p className="collection-desc">
                    The Timepiece NFTs offer different benefits in Metaverse
                    like: <b>Exclusive Access</b> to new and exciting events,{" "}
                    <b>Enhanced Interactions</b> with available activities,{" "}
                    <b>Expanded Functionality</b> on performing new actions, and
                    earn multiple
                    <b>Rewards</b>.
                  </p>
                  <NavLink>
                    <button className="btn pill-btn">Explore</button>
                  </NavLink>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={require("./assets/cawsCollectionBanner.webp")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
            <div
              className="filters-container d-flex align-items-center justify-content-between my-4 p-3 position-relative"
              style={{ zIndex: 2 }}
            >
              <div class="dropdown" style={{ width: "200px" }}>
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
                  <div className="d-flex w-100 align-items-center justify-content-around mt-2 py-2">
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
                  </div>
                </ul>
              </div>
              <div className="d-flex align-items-center gap-5">
                <div
                  className="filter-nav d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <img src={priceIcon} alt="" />
                  <h6 className="filter-nav-title mb-0">Price</h6>
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
            <div className=" nft-page-wrapper d-flex flex-column gap-3 pb-3">
              <div className="d-flex align-items-center p-4 gap-4 justify-content-center">
                <div
                  className={
                    loading === false || cawsNFTS.length > 0
                      ? "item-cards-wrapper"
                      : "loader-wrapper"
                  }
                >
                  {cawsNFTS && cawsNFTS.length > 0 ? (
                    <>
                      {cawsNFTS.map((nft, index) => (
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
                            isCaws={true}
                            isTimepiece={false}
                            isWod={false}
                            coinbase={coinbase}
                            isFavorite={
                              favorites.length > 0
                                ? favorites.find(
                                    (obj) =>
                                      obj.nftAddress === nft.nftAddress &&
                                      obj.tokenId === nft.tokenId
                                  )
                                  ? true
                                  : false
                                : false
                            }
                            onFavorite={updateFavs}
                          />
                        </NavLink>
                      ))}
                    </>
                  ) : (
                    <HashLoader
                      color={"#554fd8"}
                      loading={loading}
                      cssOverride={override}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center w-100">
                {!loading && next < allCaws ? (
                  <button
                    className="btn py-2 px-3 nft-load-more-btn"
                    onClick={() => loadMore()}
                  >
                    Load more
                  </button>
                ) : loading && next < allCaws && cawsNFTS.length > 0 ? (
                  <HashLoader
                    color={"#554fd8"}
                    loading={loading}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>{" "}
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
                window.location.reload();
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
          <div
            className={`row align-items-center traits-wrapper `}
            style={{ rowGap: "20px" }}
          >
            {Object.values(filters)[categoryIndex] &&
              Object.values(filters) &&
              Object.entries(Object.values(filters)[categoryIndex]).map(
                ([key, value], i) => (
                  // <span key={i}>{key} ({value})</span>
                  <FilterCard title={key} value={value} categoryIndex={categoryIndex} filters={filters} addProducts={addProducts}  selectedFilters={selectedFilters} />
                )
              )}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default CawsNFT;
