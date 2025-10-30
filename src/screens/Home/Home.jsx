import React, { useEffect } from "react";
import "./_home.scss";
import MarketPlace from "./GameMarketplace/Marketplace";
import VideoWrapper from "./VideoWrapper/VideoWrapper";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
import WodBuilders from "./WodBuilders/WodBuilders";
import GameStats from "./GameStats/GameStats";
import Investors from "../Token/Investors/Investors";

const Home = ({
  handleRegister,
  handleDownload,
  monthlyPlayers,
  percent,
  allStarData,
  totalSupply,
  wodHolders,
totalVolumeNew
}) => {
  // const mantaInfo = {
  //   title: "Manta",
  //   img: mantaPopup,
  //   state: "manta",
  // };

  // const [activePopup, setActivePopup] = useState(false);

  // const html = document.querySelector("html");
  // const hamburger = document.querySelector("#popup");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setActivePopup(true);
  //   }, 500);
  // }, []);

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
    // randomPopup();
  }, []);

  return (
    <>

      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column home-main-wrapper">
          <VideoWrapper
            handleRegister={handleRegister}
            handleDownload={handleDownload}
            allStarData={allStarData}
            monthlyPlayers={monthlyPlayers}
            percent={percent}
          />
          {/* <LiveEvents /> */}
          {/* <WodPartners full={false} /> */}
          <GameStats totalSupply={totalSupply} monthlyPlayers={monthlyPlayers}/>
          <WodBuilders />
          {/* <MarketSection
            coinbase={coinbase}
            ethTokenData={ethTokenData}
            
          /> */}
          <ExplorerGrid totalSupply={totalSupply} monthlyPlayers={monthlyPlayers}
             wodHolders={wodHolders}
             totalVolumeNew={totalVolumeNew}
          />
          <Investors page={"home"} />
          {/* <GameUpdates /> */}
          {/* <LandNft /> */}
          {/* <CawsSociety
            content="The Cats and Watches Society (CAWS) NFT is a unique collection of
            utility NFTs developed by Dypius. Owners of these NFTs will be able
            to adventure with their CAT companion enhancing the player's
            abilities and increasing rewards."
          /> */}
          {/* <CawsWorld /> */}
          <MarketPlace />
          {/* <Discord /> */}
          {/* <Partners /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
