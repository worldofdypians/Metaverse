import React from "react";
import "./_home.scss";

import MarketPlace from "./GameMarketplace/Marketplace";
import VideoWrapper from "./VideoWrapper/VideoWrapper";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
import CawsSociety from "./CawsSociety/CawsSociety";
import CawsWorld from "./CawsSociety/CawsWorld";

const Home = () => {
  return (
    <div className="container-fluid ">
      <div className="container-lg d-flex flex-column home-main-wrapper">
        <VideoWrapper />
        <ExplorerGrid />
        <CawsSociety />
        <CawsWorld />
        <MarketPlace/>
      </div>
    </div>
  );
};

export default Home;
