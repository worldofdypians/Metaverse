import React from "react";
import "./_bridge.scss";
import BridgeHero from "./BridgeHero/BridgeHero";
import BridgeContent from "./BridgeContent/BridgeContent";

const Bridge = () => {
  return (
    <div className="container-fluid token-wrapper px-0 mt-5 pt-5">
      <div className="d-flex flex-column gap-5">
        <BridgeHero/>
        <BridgeContent/>
      </div>
    </div>
  );
};

export default Bridge;
