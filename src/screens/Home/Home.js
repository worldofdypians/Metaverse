import React, { useEffect } from "react";
import "./_home.scss";

import MarketPlace from "./GameMarketplace/Marketplace";
import VideoWrapper from "./VideoWrapper/VideoWrapper";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
import CawsSociety from "./CawsSociety/CawsSociety";
import CawsWorld from "./CawsSociety/CawsWorld";
import Discord from "./Discord/Discord";
import LandNft from "./LandNFT/LandNft";
import Utilities from "./Utilities/Utilities";
import MarketSection from "../Marketplace/MarketSection";
import MintPopup from "../../components/TimepieceMint/MintPopup";
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
import avalanchePopup from '../../components/TimepieceMint/assets/avalanchePopup.png'
import coin98Popup from '../../components/TimepieceMint/assets/coin98Popup.png'
import basePopup from '../../components/TimepieceMint/assets/basePopup.png'
import confluxPopup from '../../components/TimepieceMint/assets/confluxPopup.png'
import gatePopup from '../../components/TimepieceMint/assets/gatePopup.webp'

import coingeckoPopup from '../../components/TimepieceMint/assets/coingeckoPopup.png'
import treasureHuntPopup from '../../components/TimepieceMint/assets/treasureHuntPopup.png'
import treasureHuntGate from '../../components/TimepieceMint/assets/treasureHuntGate.webp'

import confluxTreasureHunt from '../../components/TimepieceMint/assets/confluxTreasureHunt.png'
import LandFlyout from '../../components/LandFlyout/LandFlyout'
import ChestFlyout from "../../components/LandFlyout/ChestFlyout";

const Home = ({
  handleRegister,
  handleDownload,
  coinbase,
  ethTokenData,
  dyptokenDatabnb,
  idyptokenDatabnb,
}) => {


  const avaxPopupInfo = {
    title: "Avalanche",
    img: avalanchePopup,
    state: "avax",
  }
  const confluxPopupInfo = {
    title: "Conflux",
    img: confluxPopup,
    state: "conflux",
  }

  const gatePopupInfo = {
    title: "Gate",
    img: gatePopup,
    state: "gate",
  }

  const coin98PopupInfo = {
    title: "Coin98", 
    img: coin98Popup,
    state: "coin98",
  }
  const basePopupInfo = {
    title: "Base ",
    img: basePopup,
    state: "base",
  }
  const coingeckoPopupInfo = {
    title: "CoinGecko",
    img: coingeckoPopup,
    state: "coingecko",
  }
  const treasureHuntPopupInfo = {
    title: "Treasure Hunt",
    img: treasureHuntGate,
    state: "gate",
  }


  const [activePopup, setActivePopup] = useState(false)

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#popup");

  useEffect(() => {
    setTimeout(() => {
      setActivePopup(true)
    }, 500);
  }, [])
  


  useEffect(() => {
    if (activePopup) {
      html.classList.add("hidescroll");
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [activePopup]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "World of Dypians";
  }, []);



  return (
  <>
  <OutsideClickHandler id="popup" onOutsideClick={() => setActivePopup(false)}>
  <MintPopup active={activePopup} data={basePopupInfo} onClose={() => setActivePopup(false)} />
  </OutsideClickHandler>
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column home-main-wrapper">
        <VideoWrapper
          handleRegister={handleRegister}
          handleDownload={handleDownload}
        />
        <Utilities />
        <MarketSection
          coinbase={coinbase}
          ethTokenData={ethTokenData}
          dyptokenDatabnb={dyptokenDatabnb}
          idyptokenDatabnb={idyptokenDatabnb}
        />
        <ExplorerGrid />
        <LandNft />
        <CawsSociety
          content="The Cats and Watches Society (CAWS) NFT is a unique collection of
            utility NFTs developed by Dypius. Owners of these NFTs will be able
            to adventure with their CAT companion enhancing the player's
            abilities and increasing rewards."
        />
        <CawsWorld />
        <MarketPlace />
        <Discord />
        {/* <Partners /> */}
      </div>
    </div>
    {/* <LandFlyout /> */}

  </>
  );
};

export default Home;
