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
import avalanchePopup from "../../components/TimepieceMint/assets/avalanchePopup.png";
import coin98Popup from "../../components/TimepieceMint/assets/coin98Popup.png";
import basePopup from "../../components/TimepieceMint/assets/basePopup.png";
import confluxPopup from "../../components/TimepieceMint/assets/confluxPopup.png";
import entryCampaignBanner from "../../components/TimepieceMint/assets/entryCampaignBanner.png";
import dailyGameDelightBanner from "../../components/TimepieceMint/assets/dailyGameDelightBanner.png";
import dypiansDiscoveryQuest from "../../components/TimepieceMint/assets/dypiansDiscoveryQuest.webp";

import dogePopup from "../../components/TimepieceMint/assets/dogePopup.png";
import mantaPopup from "../../components/TimepieceMint/assets/mantaPopup.png";
import gatePopup from "../../components/TimepieceMint/assets/gatePopup.webp";
import cmcPopup from "../../components/TimepieceMint/assets/cmcPopup.webp";

import dypiusPopup from "../../components/TimepieceMint/assets/dypiuspremiumPopup.webp";
import opbnbPopup from "../../components/TimepieceMint/assets/opbnbPopup.webp";

import coingeckoPopup from "../../components/TimepieceMint/assets/coingeckoPopup.png";
import treasureHuntPopup from "../../components/TimepieceMint/assets/treasureHuntPopup.png";
import treasureHuntGate from "../../components/TimepieceMint/assets/treasureHuntGate.webp";
import baseTreasureHuntPopup from "../../components/TimepieceMint/assets/baseTreasureHuntPopup.webp";
import dogeTreasureHuntPopup from "../../components/TimepieceMint/assets/dogeTreasureHunt.webp";
import skalePopup from "../../components/TimepieceMint/assets/skalePopup.webp";

import cmcTreasureHuntPopup from "../../components/TimepieceMint/assets/cmcTreasureHunt.webp";
import corePopupBg from "../../components/TimepieceMint/assets/corePopupBg.webp";
import victionPopupBg from "../../components/TimepieceMint/assets/victionPopupBg.webp";
import immutablePopup from "../../components/TimepieceMint/assets/immutablePopup.webp";
import taikoPopup from "../../components/TimepieceMint/assets/taikoPopup.png";
import taikoTreasureHunt from "../../components/TimepieceMint/assets/taikoTreasureHunt.png";
import bnbcampaign from "../../components/TimepieceMint/assets/bnbcampaign.webp";


import multiversXPopupBg from "../../components/TimepieceMint/assets/multiversXPopupBg.webp";
import bnbPhase4 from "./WodBuilders/assets/bnbPhase4.png";

import confluxTreasureHunt from "../../components/TimepieceMint/assets/confluxTreasureHunt.png";
import LiveEvents from "./LiveEvents/LiveEvents";
import WodBuilders from "./WodBuilders/WodBuilders";

const Home = ({
  handleRegister,
  handleDownload,
  coinbase,
  ethTokenData,
  dyptokenDatabnb,
  allStarData,
  idyptokenDatabnb,
  dyptokenDatabnb_old,
}) => {
  const avaxPopupInfo = {
    title: "Avalanche",
    img: avalanchePopup,
    state: "avax",
  };
  const confluxPopupInfo = {
    title: "Conflux",
    img: confluxPopup,
    state: "conflux",
  };

  const gatePopupInfo = {
    title: "Gate",
    img: gatePopup,
    state: "gate",
  };

  const coin98PopupInfo = {
    title: "Coin98",
    img: coin98Popup,
    state: "coin98",
  };
  const basePopupInfo = {
    title: "Base ",
    img: basePopup,
    state: "base",
  };
  const coingeckoPopupInfo = {
    title: "CoinGecko",
    img: coingeckoPopup,
    state: "coingecko",
  };

  const skalePopupInfo = {
    title: "SKALE",
    img: skalePopup,
    state: "skale",
  };
  const entryCampaignPopup = {
    title: "SKALE",
    img: dypiansDiscoveryQuest,
    state: "skale",
  };

  const treasureHuntPopupInfo = {
    title: "Treasure Hunt",
    img: dypiusPopup,
    state: "dypius",
  };
  const immutablePopupInfo = {
    title: "Immutable",
    img: immutablePopup,
    state: "immutable",
  };

  const corePopupInfo = {
    title: "CORE",
    img: corePopupBg,
    state: "core",
  };
  const opbnbInfo = {
    title: "opBNB",
    img: bnbcampaign,
    state: "opbnb",
  };
  const mantaInfo = {
    title: "Manta",
    img: mantaPopup,
    state: "manta",
  };
  const taikoInfo = {
    title: "Taiko",
    img: taikoTreasureHunt,
    state: "taiko",
  };

  const [activePopup, setActivePopup] = useState(false);

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#popup");

  useEffect(() => {
    setTimeout(() => {
      setActivePopup(true);
    }, 500);
  }, []);

  // useEffect(() => {
  //   if (activePopup) {
  //     html.classList.add("hidescroll");
  //   } else {
  //     html.classList.remove("hidescroll");
  //   }
  // }, [activePopup]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "World of Dypians";
  }, []);

  return (
    <>
      <OutsideClickHandler
        id="popup"
        onOutsideClick={() => setActivePopup(false)}
      >
        <MintPopup
          active={activePopup}
          data={taikoInfo}
          onClose={() => setActivePopup(false)}
        />
      </OutsideClickHandler>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column home-main-wrapper">
          <VideoWrapper
            handleRegister={handleRegister}
            handleDownload={handleDownload}
            allStarData={allStarData}
          />
          <LiveEvents />
          <WodBuilders page={"home"} />
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
    </>
  );
};

export default Home;
