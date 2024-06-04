import React from "react";
import "./_token.scss";
import Ecosystem from "./Ecosystem/Ecosystem";
import MainHero from "./MainHero/MainHero";
import Tokenomics from "./Tokenomics/Tokenomics";
import Utility from "./Utility/Utility";

const Token = () => {
  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column gap-5"> 
        <MainHero />
        <Ecosystem />
        <Tokenomics />
        <Utility />
      </div>
    </div>
  );
};

export default Token;
