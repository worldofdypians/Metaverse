import React, { useState, useEffect } from "react";
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
import { HashLoader } from "react-spinners";

const WalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  userId,
  username,
  listedNFTS,
  onOpenNfts,
  showNfts,
  landStaked,
  myCawsWodStakes
}) => {
  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  const [dailyrecords, setRecords] = useState([]);

  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [filterTitle, setFilterTitle] = useState("Balance");
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
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
      getCollected();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "staked") {
      setFilterTitle("Staked");
      setLoading(true);
      getStakes();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "eth") {
      setFilterTitle("");
    }
  };

  const getCollected = async () => {
    let finalItems = [];

    const listedNFTS = await getListedNFTS(0, "", "seller", address, "");
    listedNFTS &&
      listedNFTS.length > 0 &&
      listedNFTS.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_cawsold_address) {
          nft.type = "cawsold";
          nft.chain = 1;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalItems.push(nft);
        }
      });
    setNftItems(finalItems);
  };

  const getAllFavs = async () => {
    let favorites = await window.getFavoritesETH2();
    if (favorites && favorites.length > 0) {
      setNftItems(favorites);
    } else setNftItems([]);
  };

  const getStakes = ()=>{
    if(coinbase) {
      let total =[]
      if(landStaked.length === 0 && myCawsWodStakes.length === 0 ) {
        setNftItems([])
      }

      else if(landStaked.length === 0 && myCawsWodStakes.length !== 0 ) {
      total = [...myCawsWodStakes];
        setNftItems(total)
      }
      else if(landStaked.length !== 0 && myCawsWodStakes.length === 0 ) {
      total = [...landStaked];
        setNftItems(total)
      }
      else if(landStaked.length !== 0 && myCawsWodStakes.length !== 0 ) {
        total = [...landStaked, ...myCawsWodStakes]
        setNftItems(total)
      }
      // const allstakes = [...landStaked, ...myCawsWodStakes]
      console.log(total)
    }
  }

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );
    setRecords(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    setUserRank(testArray[0].position);
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    setGenesisRank(testArray[0].position);
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

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
        setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

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
        setDypTokenDataAvax(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDataavax();
    getTokenDatabnb();
    getAllFavs();
  }, []);

  return (
    <div className="main-wrapper py-4 w-100 d-flex gap-4 mt-5 mt-xxl-0 mt-lg-0 justify-content-center">
      <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative col-lg-5">
        <h5 className="bal-txt px-4">My Rankings</h5>
        <div className="d-flex gap-3 justify-content-evenly">
          <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
            <img src={globalRank} alt="" />
            <span className="globaltext" style={{ fontSize: 12 }}>
              #{userRank + 1}
            </span>
            <span className="globaltext">Global</span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
            <img src={genesisImg} alt="" className="genesisimg" />
            <span className="genesistext" style={{ fontSize: 12 }}>
              #{genesisRank + 1}
            </span>
            <span className="genesistext">Genesis</span>
          </div>
        </div>
      </div>

      <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative col-lg-7">
        <div className="d-flex align-items-center gap-3 px-3 py-2">
          <h6
            className={`account-nft-sort ${
              filterTitle === "Balance" && "nft-sort-selected"
            } `}
            onClick={() => {
              sortNfts("balance");
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
            }}
          >
            Staked
          </h6>
        </div>

        {filterTitle === "Favorites" && loading === false && (
          <div className="row px-3">
            {nftItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/nft/${item.blockTimestamp}`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type: item.type,
                  isOwner:
                    (item.buyer &&
                      item.buyer.toLowerCase() === coinbase?.toLowerCase()) ||
                    (item.seller &&
                      item.seller.toLowerCase() === coinbase?.toLowerCase()),
                  chain: item.chain,
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-4">
                    <img
                      src={
                        item.type === "caws" || item.type === "cawsold"
                          ? `https://mint.dyp.finance/thumbs/${item.tokenId}.png`
                          : item.type === "land"
                          ? `https://mint.worldofdypians.com/thumbs/${item.tokenId}.png`
                          : `https://timepiece.worldofdypians.com/images/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.type === "caws" || item.type === "cawsold"
                          ? "CAWS"
                          : item.type === "land"
                          ? "Genesis Land"
                          : "CAWS Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                      <span className="account-nft-type">
                        {item.type === "caws" || item.type === "cawsold"
                          ? "CAWS"
                          : item.type === "land"
                          ? "Genesis Land"
                          : "Timepiece"}
                      </span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {filterTitle === "Listed" && loading === false && (
          <div className="row px-3">
            {nftItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/nft/${item.blockTimestamp}`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type: item.type,
                  isOwner:
                    item.seller &&
                    item.seller.toLowerCase() === coinbase?.toLowerCase(),
                  chain: item.chain,
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-4">
                    <img
                      src={
                        item.type === "caws" || item.type === "cawsold"
                          ? `https://mint.dyp.finance/thumbs/${item.tokenId}.png`
                          : item.type === "land"
                          ? `https://mint.worldofdypians.com/thumbs/${item.tokenId}.png`
                          : `https://timepiece.worldofdypians.com/images/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.type === "caws" || item.type === "cawsold"
                          ? "CAWS"
                          : item.type === "land"
                          ? "Genesis Land"
                          : "CAWS Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                      <span className="account-nft-type">
                        {item.type === "caws" || item.type === "cawsold"
                          ? "CAWS"
                          : item.type === "land"
                          ? "Genesis Land"
                          : "Timepiece"}
                      </span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {filterTitle === "Balance" && loading === false && (
          <div className="d-flex flex-column align-items-center gap-3 balancewrapper3">
            <div className="d-flex gap-2 col-lg-12 justify-content-between">
              <div className="d-flex py-2 align-items-center gap-2 position-relative col-lg-3">
                <img src={ethIcon} alt="" className="" />
                <span className="eth-chain-text">Ethereum</span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalance, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(dypBalance * dyptokenData, 2)}
                </span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={idyp}
                    alt="dyp"
                    className="dyp-icon"
                    style={{ height: 16, width: 16 }}
                  />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(idypBalance, 2)} iDYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(idypBalance * idyptokenData, 2)}
                </span>
              </div>
            </div>
            <div className="balanceseparator"></div>
            <div className="d-flex gap-2 col-lg-12 justify-content-between">
              <div className="d-flex py-2 align-items-center gap-2 position-relative col-lg-3">
                <img src={bnbIcon} alt="" className="" />
                <span className="bnb-chain-text">BNB Chain</span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalancebnb, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
                </span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={idyp}
                    alt="dyp"
                    className="dyp-icon"
                    style={{ height: 16, width: 16 }}
                  />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(idypBalancebnb, 2)} iDYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(idypBalancebnb * idyptokenDatabnb, 2)}
                </span>
              </div>
            </div>
            <div className="balanceseparator"></div>
            <div className="d-flex gap-2 col-lg-12 justify-content-between">
              <div className="d-flex py-2 align-items-center gap-2 position-relative col-lg-3">
                <img src={avaxIcon} alt="" className="" />
                <span className="avax-chain-text">Avalanche</span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalanceavax, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(dypBalanceavax * dyptokenDataAvax, 2)}
                </span>
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-lg-4">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={idyp}
                    alt="dyp"
                    className="dyp-icon"
                    style={{ height: 16, width: 16 }}
                  />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(idypBalanceavax, 2)} iDYP
                  </h6>
                </div>
                <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
                  ${getFormattedNumber(idypBalanceavax * idyptokenDataAvax, 2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {filterTitle !== "Balance" && loading === false && nftItems.length > 6 &&  (
          <div className="row w-100 justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={onOpenNfts}
              style={{ cursor: "pointer", width: "fit-content" }}
            >
              <span className="account-view-all">
                {showNfts ? "View Less" : "View All"}
              </span>
              <img
                src={viewAllArrow}
                style={{ rotate: showNfts ? "0deg" : "180deg" }}
                alt=""
              />
            </div>
          </div>
        )}

        {loading === true && (
          <div className="loader-wrapper">
            <HashLoader
              color={"#554fd8"}
              loading={loading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
