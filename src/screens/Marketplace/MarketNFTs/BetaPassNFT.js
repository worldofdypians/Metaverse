import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import coinbaseimg from "./assets/base.svg";
import { useLocation } from "react-router-dom";
import dropdownIcon from "../assets/dropdownIcon.svg";
import traitIcon from "./assets/traitIcon.svg";
import priceIconUp from "./assets/priceIconUp.svg";
import priceIconDown from "./assets/priceIconDown.svg";
import priceIconNeutral from "./assets/priceIconNeutral.svg";
import filterIcon from "./assets/filterIcon.svg";
import ItemCard from "../../../components/ItemCard/ItemCard";
import mintNowIcon from "./assets/mintNowIcon.svg";

const BetaPassNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  cawsBought,
  handleRefreshListing,
  nftCount,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const [priceCount, setPriceCount] = useState(0);
  const [filterTitle, setFilterTitle] = useState("Filter");

  const dummyData = [
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "0",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x38735bE0B0E44BF0B8Da1dD5aA96B787879F1c72",
      tokenId: "1",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x9058FF24462B6fe98a73781c6EEdad9D4e550c7a",
      tokenId: "2",
      type: "caws",
      chain: 1,
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
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
      tokenId: "6",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "7",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "8",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xb8CAC1C259bA3a73e26744fB8D09B5Bd77c2207B",
      tokenId: "9",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",
      tokenId: "10",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0xcE8Bb137Ed6204a8259e9bD44197D4BD1184344B",
      tokenId: "11",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "12",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x86aBfF52425D7159C1220BA7532eD69674DCef45",
      tokenId: "13",
      type: "caws",
      chain: 1,
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
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "16",
      type: "caws",
      chain: 1,
    },
    {
      nftAddress: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
      buyer: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
      tokenId: "17",
      type: "caws",
      chain: 1,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllCawsCollection();
    // fetchFilters();
    document.title = "Beta Pass";
  }, []);

  return (
    <div
      id="header"
      // onScroll={onScroll}
      // ref={listInnerRef}
      // style={{ overflow: "scroll" }}
    >
      <div
        className="container-fluid d-flex justify-content-end p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative flex-column"
          style={{ backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 position-relative">
            <div className="row align-items-center justify-content-between mt-4 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                    Beta Pass
                  </h6>
                  <p className="collection-desc">
                    The Beta Pass NFT provides you with a special ticket to
                    enter the metaverse and participate in an exclusive event
                    hosted by our partners. During this event, players have the
                    opportunity to earn Points for their leaderboard rankings,
                    and also collect rewards in different tokens, which are
                    distributed on a monthly basis.
                  </p>
                 
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={require("./assets/betaPassBanner.png")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
            <div
              className="filters-container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between my-4 p-3 position-relative gap-3"
              style={{ zIndex: 2 }}
            >


              <div className="d-flex align-items-center gap-4 justify-content-center flex-wrap">
                <NavLink
                  to={"/marketplace/beta-pass/conflux"}
                  className={`${
                    location.pathname.includes("conflux") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                >
                  <img src={conflux} className="beta-pass-chain-img" alt="" />
                  <span>Conflux</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coin98"}
                  className={`${
                    location.pathname.includes("coin98") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                >
                  <img src={coin98} className="beta-pass-chain-img" alt="" />
                  <span>Coin98</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coingecko"}
                  className={`${
                    location.pathname.includes("coingecko") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                >
                  <img src={coingecko} className="beta-pass-chain-img" alt="" />
                  <span>CoinGecko</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/base"}
                  className={`${
                    location.pathname.includes("base") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                >
                  <img
                    src={coinbaseimg}
                    className="beta-pass-chain-img"
                    alt=""
                  />
                  <span>Base</span>
                </NavLink>
              </div>

            </div>

            <div className=" nft-page-wrapper d-flex flex-column gap-3 pb-3">
              <div className="d-flex align-items-center p-4 gap-4 justify-content-center">
                <div className="item-cards-wrapper w-100">
                  {dummyData.map((nft, index) => {
                    return (
                      <NavLink
                        to={`/marketplace/nft/${nft.tokenId}/${nft.nftAddress}`}
                        style={{ textDecoration: "none" }}
                        key={index}
                        state={{
                          nft: nft,
                          type: "caws",
                          isOwner:
                            nft.seller?.toLowerCase() ===
                              coinbase?.toLowerCase() ||
                            nft.buyer?.toLowerCase() ===
                              coinbase?.toLowerCase(),
                          chain: nft.chain,
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
                          lastSold={nft.LastSold}
                          isLatestSale={nft.isLatestSale}
                          isListed={nft.isListed}
                          soldPriceType={nft.soldPriceType}
                        />
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaPassNFT;
