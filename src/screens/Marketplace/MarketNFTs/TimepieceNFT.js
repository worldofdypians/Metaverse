import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import ItemCard from "../../../components/ItemCard/ItemCard";
import MobileNav from "../../../components/MobileNav/MobileNav";
import useWindowSize from "../../../hooks/useWindowSize";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import { NavLink } from "react-router-dom";
import { getTimepieceNfts } from "../../../actions/convertUsd";

const TimepieceNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  timepieceListed,
}) => {
  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };
  const windowSize = useWindowSize();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTitle, setFilterTitle] = useState("Sort");
  const [initialNfts, setInitialNfts] = useState([]);
  const [timepieceNFTS, setTimepieceNFTS] = useState([]);

  const sortNfts = (sortValue) => {
    if (sortValue === "htl") {
      let htl = initialNfts.sort((a, b) => {
        return b.priceUSD - a.priceUSD;
      });
      setTimepieceNFTS(htl);
    } else if (sortValue === "lth") {
      let lth = initialNfts.sort((a, b) => {
        return a.priceUSD - b.priceUSD;
      });
      setTimepieceNFTS(lth);
    } else if (sortValue === "lto") {
      let lto = initialNfts.sort((a, b) => {
        return b.date - a.date;
      });
      setTimepieceNFTS(lto);
    } else if (sortValue === "otl") {
      let otl = initialNfts.sort((a, b) => {
        return a.date - b.date;
      });
      setTimepieceNFTS(otl);
    } else if (sortValue === "dyp") {
      let dyp = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 0;
      });
      setTimepieceNFTS(dyp);
    } else if (sortValue === "eth") {
      let eth = initialNfts.filter((nft) => {
        return nft.payment_priceType !== 1;
      });
      setTimepieceNFTS(eth);
    }
  };

  const fetchInitialTimepiece = async () => {
    if (timepieceListed && timepieceListed.length > 0) {
      let datedNfts = timepieceListed.map((nft) => {
        let date = new Date(nft.blockTimestamp * 1000);
        return { ...nft, date: date };
      });
      setTimepieceNFTS(datedNfts);
      setInitialNfts(datedNfts);
    }
  };

  useEffect(() => {
    fetchInitialTimepiece();
  }, []);

  useEffect(() => {
    if (timepieceNFTS && timepieceNFTS.length === 0) {
      setLoading(true);
    }
    if (timepieceNFTS && timepieceNFTS.length > 0) {
      setLoading(false);
    }
    window.scrollTo(0, 0);
  }, [timepieceNFTS]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft d-flex  align-items-start pe-0 pe-lg-5 position-relative"
        style={{ backgroundSize: "cover" }}
      >
        <div className="container-lg mx-0">
          <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
            CAWS <span style={{ color: "#8c56ff" }}>Timepiece</span>
          </h6>
          <div className="d-flex mt-5 mb-3 flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-end">
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
          <div className="d-flex align-items-center nft-page-wrapper p-4 gap-4 my-4">
            <div
              className={
                loading === false ? "item-cards-wrapper" : "loader-wrapper"
              }
            >
              {timepieceNFTS && timepieceNFTS.length > 0 ? (
                timepieceNFTS.map((nft, index) => (
                  <NavLink
                    to={`/marketplace/nft/${nft.blockTimestamp}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                    state={{
                      nft: nft,
                      type: "timepiece",
                      isOwner:
                        nft.seller?.toLowerCase() === coinbase?.toLowerCase() ||
                        nft.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                        chain: nft.chain,

                    }}
                  >
                    <ItemCard
                      nft={nft}
                      isConnected={isConnected}
                      showConnectWallet={handleConnect}
                      isCaws={false}
                      isTimepiece={true}
                      isWod={false}
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
        </div>
      </div>
    </div>
  );
};

export default TimepieceNFT;
