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
}) => {
  


    const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
 const [dailyrecords, setRecords] = useState([]);


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



   useEffect(() => {
  fetchMonthlyRecordsAroundPlayer();
  fetchGenesisAroundPlayer();
  }, []);

  return (
    <div
      className="container-nft pe-xxl-5 pe-lg-5 position-relative"
      style={{ background: "none", margin: "auto" }}
    >
      <div className="main-wrapper py-4 w-100 d-flex gap-4 mt-5 mt-xxl-0 mt-lg-0 justify-content-center">
        
          <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative col-lg-3">
          <h5 className="bal-txt px-4">My Rankings</h5>
          <div className="d-flex gap-3 justify-content-evenly">
            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
              <img src={globalRank} alt=''/>
              <span className="globaltext" style={{fontSize: 12}}>#{userRank + 1}</span>
              <span className="globaltext">Global</span>
            </div>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
              <img src={genesisImg} alt='' className="genesisimg"/>
              <span className="genesistext" style={{fontSize: 12}}>#{genesisRank + 1}</span>
              <span className="genesistext">Genesis</span>
            </div>

          </div>

          </div>
      

        <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative col-lg-5">
          <h5 className="bal-txt px-4">My Balance</h5>
          <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-3 balancewrapper3">
            <div className="d-flex flex-column gap-2 col-lg-6">
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalance, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd">$22</span>
                <img src={ethIcon} alt="" className="chain-icon" />
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalancebnb, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd">$22</span>
                
                <img src={bnbIcon} alt="" className="chain-icon" />
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
                <div className="d-flex align-items-center gap-2">
                  <img src={dypIcon} alt="dyp" className="dyp-icon" />
                  <h6 className="wallet-amount mb-0">
                    {getFormattedNumber(dypBalanceavax, 2)} DYP
                  </h6>
                </div>
                <span className="nft-price-usd">$22</span>

                <img src={avaxIcon} alt="" className="chain-icon" />
              </div>
            </div>

            <div className="d-flex flex-column gap-2 col-lg-6">
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
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
                <span className="nft-price-usd">$22</span>

                <img src={ethIcon} alt="" className="chain-icon" />
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
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
                <span className="nft-price-usd">$22</span>

                <img src={bnbIcon} alt="" className="chain-icon" />
              </div>
              <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
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
                <span className="nft-price-usd">$22</span>

                <img src={avaxIcon} alt="" className="chain-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
  );
};

export default WalletBalance;
