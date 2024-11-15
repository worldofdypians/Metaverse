import React, { useEffect } from "react";
import "./_bridge.scss";
import BridgeHero from "./BridgeHero/BridgeHero";
import BridgeContent from "./BridgeContent/BridgeContent";

const Bridge = ({
  isConnected,
  chainId,
  handleSwitchChain,
  onConnect,
  coinbase,
  wodBalance
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "WOD Bridge";
  }, []);

  const scrollToElement = (eventId) => {
    const element = document.getElementById(eventId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container-fluid bridge-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <BridgeHero onScroll={scrollToElement} />
        <BridgeContent
          isConnected={isConnected}
          chainId={chainId}
          handleSwitchChain={handleSwitchChain}
          onConnect={onConnect}
          coinbase={coinbase}
          wodBalance={wodBalance}
        />
      </div>
    </div>
  );
};

export default Bridge;
