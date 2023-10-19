import React, { useState } from "react";
import avaxIcon from "./newAssets/avaxIcon.svg";
import ethIcon from "./newAssets/ethIcon.svg";
import bnbIcon from "./newAssets/bnbIcon.svg";
import dypIcon from "./newAssets/dypIcon.svg";
import iDypIcon from "./newAssets/iDypIcon.svg";
import genesisRankImg from "./newAssets/genesisRank.svg";
import globalRank from "./newAssets/globalRank.svg";
import rightIcon from "./newAssets/rightIcon.svg";
import premium from "./newAssets/premium.svg";
import nonPremium from "./newAssets/nonPremium.svg";
import myRewards from "./newAssets/myRewards.svg";
import "./_walletbalance.scss";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import { NavLink } from "react-router-dom";

const NewWalletBalance = ({
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
  onDailyRewardsPopupOpen,
  onOpenLeaderboard,
  isPremium,
}) => {
  const [userRank, setUserRank] = useState("N/A");
  const [genesisRank, setGenesisRank] = useState("N/A");
  const [records, setRecords] = useState([]);
  const [activeSlide, setActiveSlide] = useState();
  const [showNext, setShowNext] = useState();
  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [bnbPrice, setBnbPrice] = useState(0);

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
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
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

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar-2",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowNext(current);
    },
    afterChange: (current) => {
      setActiveSlide(current);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDatabnb();
    getTokenDataavax();
  }, []);

  return (
    <div className="container px-0">
      <div className="row gap-3 gap-lg-0">
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-2">
            <div
              className="purple-container position-relative p-3 d-flex align-items-center justify-content-between"
              onClick={onOpenLeaderboard}
              style={{ cursor: "pointer" }}
            >
              <div className="green-div"></div>
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "90px" }}
              >
                <h6 className="profile-div-title mb-0">Leaderboard Rankings</h6>
                <div className="d-flex align-items-center gap-2 green-link">
                  <span className="profile-div-link mb-0">View</span>
                  <img src={rightIcon} alt="" />
                </div>
              </div>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={globalRank} alt="" />
                  <span className="font-iceland profile-rank mb-0">
                    #{userRank}
                  </span>
                  <span className="font-iceland profile-rank mb-0">Global</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={genesisRankImg} alt="" />
                  <span className="font-iceland profile-rank mb-0">
                    #{genesisRank}
                  </span>
                  <span className="font-iceland profile-rank mb-0">
                    Genesis
                  </span>
                </div>
              </div>
            </div>
            <div className="purple-container p-3 position-relative d-flex flex-column gap-3">
              <div className="green-div"></div>

              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0 profile-div-title">My Balance</h6>
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="profile-div-chain mb-0"
                    style={{
                      color:
                        activeSlide === 0
                          ? "#5871D2"
                          : activeSlide === 1
                          ? "#D9A908"
                          : "#DF2C2D",
                    }}
                  >
                    {activeSlide === 0
                      ? "Ethereum Network"
                      : activeSlide === 1
                      ? "BNB Chain"
                      : "Avalanche Network"}
                  </span>
                  <img
                    src={
                      activeSlide === 0
                        ? ethIcon
                        : activeSlide === 1
                        ? bnbIcon
                        : avaxIcon
                    }
                    width={12}
                    height={12}
                    alt=""
                  />
                </div>
              </div>
              <Slider {...settings}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(dypBalance, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      ${getFormattedNumber(dypBalance * dyptokenData, 2)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={iDypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(idypBalance, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      ${getFormattedNumber(idypBalance * idyptokenData, 2)}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(dypBalancebnb, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      ${getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={iDypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(idypBalancebnb, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      $
                      {getFormattedNumber(idypBalancebnb * idyptokenDatabnb, 2)}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={dypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(dypBalanceavax, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      ${" "}
                      {getFormattedNumber(dypBalanceavax * dyptokenDataAvax, 2)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <img src={iDypIcon} alt="" />
                      <span className="profile-div-tokens mb-0">
                        {getFormattedNumber(idypBalanceavax, 2)}
                      </span>
                    </div>
                    <span className="profile-div-usd mb-0">
                      $
                      {getFormattedNumber(
                        idypBalanceavax * idyptokenDataAvax,
                        2
                      )}
                    </span>
                  </div>
                </div>
              </Slider>
            </div>
            {!isPremium ? (
              <a
                href="https://app.dypius.com/plans"
                target="_blank"
                className="red-container position-relative p-3 d-flex align-items-center justify-content-between"
              >
                <div className="green-div"></div>

                <div className="d-flex flex-column gap-4">
                  <h6 className="profile-div-title mb-0">Upgrade to Premium</h6>
                  <a
                    href="https://app.dypius.com/plans"
                    target="_blank"
                    className="d-flex align-items-center gap-2 green-link"
                  >
                    <span className="profile-div-link mb-0">Subscribe</span>
                    <img src={rightIcon} alt="" />
                  </a>
                </div>
                <img src={nonPremium} alt="" />
              </a>
            ) : (
              <div className="premium-active-container position-relative p-3 d-flex align-items-center justify-content-between">
                <div className="green-div"></div>

                <div className="d-flex flex-column gap-2">
                  <h6 className="profile-div-title mb-0">Premium Member</h6>
                  <div className="d-flex align-items-center gap-2 col-7 ">
                    <span className="profile-div-link mb-0 text-white">
                      Enjoy premium access in World of Dypians
                    </span>
                  </div>
                </div>
                <img src={premium} alt="" className="premium-img"/>
              </div>
            )}
          </div>
        </div>
        <div
          className="col-12 col-lg-8 d-flex flex-column justify-content-between gap-3 gap-lg-0"
          onClick={onDailyRewardsPopupOpen}
        >
          <div className="row gap-3 gap-lg-0">
            <div className="col-12 col-lg-4">
              <div className="daily-bonus-wrapper">
                <div className="green-div"></div>

                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <h6 className="profile-div-title mb-0">Daily Bonus</h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">View</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <NavLink
                to="/marketplace/events/treasure-hunt"
                className="game-events-wrapper d-flex"
              >
                <div className="green-div"></div>

                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <h6 className="profile-div-title mb-0">Game Events</h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">View</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-lg-4">
              <NavLink
                to={"/marketplace/stake"}
                className="profile-staking-wrapper d-flex"
              >
                <div className="green-div"></div>

                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <h6 className="profile-div-title mb-0">NFT Staking</h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">Stake Now</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="row gap-3 gap-lg-0">
            <div className="col-12 col-lg-8">
              <div className="my-rewards-wrapper">
                <div className="green-div"></div>

                <div className="my-total-rewards-wrapper d-flex flex-column align-items-center.gap-2">
                  <h6 className="my-total-rewards mb-0 font-iceland">
                    $435.25
                  </h6>
                  <span className="my-total-earned mb-0 font-iceland">
                    Total Earned
                  </span>
                </div>
                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <h6 className="profile-div-title mb-0 ">My Rewards</h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">View All</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="special-rewards-wrapper">
                <div className="green-div"></div>

                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <h6 className="profile-div-title mb-0">Special Rewards</h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">Apply</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWalletBalance;
