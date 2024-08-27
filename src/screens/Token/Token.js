import React, {useEffect} from "react";
import "./_token.scss";
import TokenUtility from "./TokenUtility/TokenUtility";
import MainHero from "./MainHero/MainHero";
import Tokenomics from "./Tokenomics/Tokenomics";
import Utility from "./Utility/Utility";
import Investors from "./Investors/Investors";
import WodBuilders from "../Home/WodBuilders/WodBuilders";

const Token = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "WoD Token";
  }, []);

  const scrollToView = (viewId) => {
    document.getElementById(viewId).scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };


  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column gap-5"> 
        <MainHero scrollInto={scrollToView}/>
        <TokenUtility />
        <Tokenomics />
        <Investors />
        {/* <Utility /> */}
      </div>
    </div>
  );
};

export default Token;
