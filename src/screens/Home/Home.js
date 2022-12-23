import React, {useEffect} from "react";
import "./_home.scss";

import MarketPlace from "./GameMarketplace/Marketplace";
import VideoWrapper from "./VideoWrapper/VideoWrapper";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
import CawsSociety from "./CawsSociety/CawsSociety";
import CawsWorld from "./CawsSociety/CawsWorld";
import Discord from "./Discord/Discord";
// import Partners from "./Partners/Partners";

const Home = ({handleRegister}) => {

  useEffect(()=>{
    window.scrollTo(0,0)
},[])


  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column home-main-wrapper">
        <VideoWrapper handleRegister={handleRegister}/>
        <ExplorerGrid />
        <CawsSociety content="The Cats and Watches Society (CAWS) NFT is a unique collection of
            utility NFTs developed by Dypius. Owners of these NFTs will be able
            to adventure with their CAT companion enhancing the player’s
            abilities and increasing rewards." />
        <CawsWorld />
        <MarketPlace/>
        <Discord />
        {/* <Partners /> */}
      </div>
    </div>
  );
};

export default Home;
