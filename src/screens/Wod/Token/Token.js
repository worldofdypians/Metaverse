import React, {useEffect} from "react";
import "./_token.scss";
import TokenUtility from "./TokenUtility/TokenUtility";
import MainHero from "./MainHero/MainHero";
import Tokenomics from "./Tokenomics/Tokenomics";
import Utility from "./Utility/Utility";

const Token = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "WOD Token";
  }, []);

  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column gap-5"> 
        <MainHero />
        <TokenUtility />
        <Tokenomics />
        {/* <Utility /> */}
      </div>
    </div>
  );
};

export default Token;
