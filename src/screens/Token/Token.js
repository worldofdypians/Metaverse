import React, {useEffect} from "react";
import "./_token.scss";
import TokenUtility from "./TokenUtility/TokenUtility";
import MainHero from "./MainHero/MainHero";
import Tokenomics from "./Tokenomics/Tokenomics";
import Utility from "./Utility/Utility";
import Investors from "./Investors/Investors";
import WodBuilders from "../Home/WodBuilders/WodBuilders";
import InGameEconomy from "./InGameEconomy";

const Token = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "WOD Token";
  }, []);

  const scrollToView = (viewId) => {
    document.getElementById(viewId).scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };


  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column"> 
        <MainHero scrollInto={scrollToView}/>
        <TokenUtility />
        <Tokenomics />
        <InGameEconomy />
        <Investors page={"token"} />
        {/* <Utility /> */}
      </div>
    </div>
  );
};

export default Token;
