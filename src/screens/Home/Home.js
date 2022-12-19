import React from "react";
import "./_home.scss";

import MarketPlace from "./GameMarketplace/Marketplace";

const Home = () => {
  return (
    <div className="container-fluid home-main-wrapper">
      <div className="container-lg">
        <MarketPlace />
      </div>
    </div>
  );
};

export default Home;
