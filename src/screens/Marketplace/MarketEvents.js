import React, { useState, useEffect } from "react";
import BundleCard from "../Account/src/Components/BundleCard/BundleCard";
import { ERC20_ABI } from "../Account/src/web3/abis";
import Web3 from "web3";
import classes from "../Account/src/Containers/Dashboard/Dashboard.module.css";
import dypius from "../Account/src/Images/userProfile/dypius.svg";
import dragonIcon from "../Account/src/Images/userProfile/dragonIcon.svg";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "../Account/src/Containers/Dashboard/Dashboard.schema";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import criticalHit from './assets/criticalHit.webp'
import goldenPass from './assets/goldenPass.png'
import puzzleMadness from './assets/puzzleMadness.png'
import dragonPackage from '../Account/src/Components/BundleCard/assets/dragonPackageIcon.webp'
import NewBundleCard from "../Account/src/Components/BundleCard/NewBundleCard";


const MarketEvents = ({ account, chainId }) => {

  const location = useLocation();
  const windowSize = useWindowSize();
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();

  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [selectedPackage, setSelectedPackage] = useState(location.state?.package ? location.state?.package : "dyp");

  const dragonData = {
    title: "Dragon Ruins",
    benefits: [
      "Ability to fight a special creature",
      "A chance to win an unique CAWS NFT",
      "Score multiplier",
    ],
    price: "50 DYP",
    link: "https://www.worldofdypians.com/news/644a3089aa4deb26fe4dac90/Dragon-Ruins-Event",
  };

  const iDypPackageData = {
    title: "Puzzle Madness",
    benefits: [
      "Enhance your puzzle-solving skills",
      "Ability to earn high value rewards",
      "Compete against other players on the leaderboard",
    ],
    price: "3,500 iDYP",
    link: "https://www.worldofdypians.com/news/644ce83e7f931ac9706b515e/Puzzle-Madness-Event",
  };
  const dypPackageData = {
    title: "Golden Pass",
    benefits: [
      "Double your rewards",
      "Compete and climb higher in the rankings",
      "Unlock unique rewards during the event",
    ],
    price: "700 DYP",
    link: "https://www.worldofdypians.com/news/644e343627cca74b2d4a60b1/Golden-Pass-Event",
  };

  const criticalHitPackageData = {
    title: "Critical Hit",
    benefits: [
      "Exclusive access for Genesis Land NFT owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: "700 DYP",
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );

      const bal1 = await contract1.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0">
           {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft d-flex flex-column gap-2 px-3 px-lg-5 my-4" style={{minHeight: '72vh'}}>
        <div className={`col-12 col-lg-10 col-xxl-8 d-flex flex-column gap-5`}>
          <div className="row align-items-center">
            {/* <div className="event-package d-flex flex-column align-items-center gap-2">
              <div
                className={`premium-package dyp-package ${
                  selectedPackage === "dyp" && "selected-premium"
                } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                onClick={() => setSelectedPackage("dyp")}
              >
                <img
                  src={dypius}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Golden Pass
              </h6>
            </div>
            <div className="event-package d-flex flex-column align-items-center gap-2">
              <div
                className={`premium-package ${classes.idypicon} ${
                  selectedPackage === "idyp" && "selected-premium"
                } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                onClick={() => setSelectedPackage("idyp")}
              ></div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Puzzle Madness
              </h6>
            </div>
            <div className="event-package d-flex flex-column align-items-center gap-2">
              <div
                className={`premium-package dragon-package ${
                  selectedPackage === "dragon" && "selected-premium"
                } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                onClick={() => setSelectedPackage("dragon")}
              >
                <img
                  src={dragonIcon}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Dragon Ruins
              </h6>
            </div>
            <div className="event-package d-flex flex-column align-items-center gap-2">
              <div
                className={`premium-package criticalhit-package ${
                  selectedPackage === "criticalHit" && "selected-premium"
                } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                onClick={() => setSelectedPackage("criticalHit")}
              >
                <img
                  src={dypius}
                  width={40}
                  height={40}
                  alt="premium package icon"
                  className="premium-package-icon"
                />
              </div>
              <h6
                className="bundleTitle mb-0 fw-normal text-center"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                Critical Hit
              </h6>
            </div> */}
             <div className="col-12 col-md-6 col-lg-3">
              <div className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${selectedPackage === "dragon" && "selected-event-package"}`} onClick={() => setSelectedPackage("dragon")}>
                  <img src={dragonPackage} className="w-100" style={{borderRadius: '16px'}} alt="" />
                  <span className="event-package-title">Dragon Ruins</span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${selectedPackage === "dyp" && "selected-event-package"}`} onClick={() => setSelectedPackage("dyp")}>
                  <img src={goldenPass} className="w-100" style={{borderRadius: '16px'}} alt="" />
                  <span className="event-package-title">Golden Pass</span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${selectedPackage === "idyp" && "selected-event-package"}`} onClick={() => setSelectedPackage("idyp")}>
                  <img src={puzzleMadness} className="w-100" style={{borderRadius: '16px'}} alt="" />
                  <span className="event-package-title">Puzzle Madness</span>
              </div>
            </div>
           
            <div className="col-12 col-md-6 col-lg-3">
              <div className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${selectedPackage === "criticalHit" && "selected-event-package"}`} onClick={() => setSelectedPackage("criticalHit")}>
                  <img src={criticalHit} className="w-100" style={{borderRadius: '16px'}} alt="" />
                  <span className="event-package-title">Critical Hit</span>
              </div>
            </div>

          </div>
          <NewBundleCard
            coinbase={account}
            wallet={data?.getPlayer?.wallet?.publicAddress}
            chainId={chainId}
            getDypBalance={getDypBalance}
            getiDypBalance={getDypBalance}
            packageData={
              selectedPackage === "dragon"
                ? dragonData
                : selectedPackage === "dyp"
                ? dypPackageData
                : selectedPackage === "criticalHit"
                ? criticalHitPackageData
                : iDypPackageData
            }
            handleSetAvailableTime={(value) => {
              setAvailableTime(value);
            }}
            availableTime={availableTime}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketEvents;
