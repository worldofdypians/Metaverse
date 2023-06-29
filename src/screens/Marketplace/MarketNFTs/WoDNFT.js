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

const WoDNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  wodBought,
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
  const [favItems, setfavItems] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [next, setNext] = useState(0);
  const [paginatedData, setpaginatedData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  const [allwodNfts, setAllwod] = useState([]);

  const listInnerRef = useRef();
  const nftsPerRow = 18;
  const allLandpiece = 999;

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

  const onScroll = () => {
    const wrappedElement = document.getElementById("header");
    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect()?.bottom <= window.innerHeight;
      if (isBottom) {
        if (next < allLandpiece) {
          loadMore();
        }
        document.removeEventListener("scroll", onScroll);
      }
    }
  };

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
  }, [wodBought]);

  useEffect(() => {
    // if (wodBought && allwodNfts.length > 0 && finalData.length > 0) {
      fetchInitialWod();
    // }
  }, [allwodNfts.length, finalData.length, wodBought]);

  useEffect(() => {
    getWodCollection();
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
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft  d-flex  align-items-start px-3 px-lg-5 position-relative"
        style={{ backgroundSize: "cover" }}
      >
        <div className="container-lg mx-0">
          <h6 className="nft-page-title font-raleway  pt-4 pt-lg-0 mt-5 mt-lg-4">
            World of Dypians <span style={{ color: "#8c56ff" }}>Land</span>
          </h6>
          <div className="d-flex mt-5 mb-3 flex-column flex-lg-row gap-3 gap-lg-0 align-items-start align-items-lg-center justify-content-start justify-content-lg-end">
            <div class="dropdown" style={{ width: "200px" }}>
              <button
                class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filterTitle}
                <img src={dropdownIcon} alt="" />
              </button>
              <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price low to high");
                    sortNfts("lth");
                  }}
                >
                  <span>Price low to high</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Price high to low");
                    sortNfts("htl");
                  }}
                >
                  <span>Price high to low</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Oldest to newest");
                    sortNfts("otl");
                  }}
                >
                  <span>Oldest to newest</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilterTitle("Newest To Oldest");
                    sortNfts("lto");
                  }}
                >
                  <span>Newest To Oldest</span>
                </li>
                <li
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
                </li>
              </ul>
            </div>
          </div>
          <div className=" nft-page-wrapper d-flex flex-column gap-3 pb-3">
            <div
              className="d-flex align-items-center p-4 gap-4 justify-content-center"
              id="header"
              onScroll={onScroll}
              ref={listInnerRef}
            >
              <div
                className={
                  loading === false || landNfts.length > 0
                    ? "item-cards-wrapper"
                    : "loader-wrapper"
                }
              >
                {landNfts && landNfts.length > 0 ? (
                  landNfts.map((nft, index) => (
                    <NavLink
                      to={`/marketplace/nft/${nft.blockTimestamp ?? index}`}
                      style={{ textDecoration: "none" }}
                      key={index}
                      state={{
                        nft: nft,
                        type: "land",
                        isOwner:
                          nft.seller?.toLowerCase() ===
                            coinbase?.toLowerCase() ||
                          nft.buyer?.toLowerCase() === coinbase?.toLowerCase(),
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
                      />
                    </NavLink>
                  ))
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
              {!loading && next < allLandpiece ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoDNFT;
