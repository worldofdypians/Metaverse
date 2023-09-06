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

const Home = ({
  handleRegister,
  handleDownload,
  coinbase,
  ethTokenData,
  dyptokenDatabnb,
  idyptokenDatabnb,
}) => {


  const [activePopup, setActivePopup] = useState(true)

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#popup");


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
  <MintPopup active={activePopup} onClose={() => setActivePopup(false)} />
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
            to adventure with their CAT companion enhancing the player’s
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
