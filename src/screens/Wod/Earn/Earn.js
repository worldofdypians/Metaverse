import React from "react";
import "./_earn.scss";
import EarnHero from "./EarnHero/EarnHero";
import EarnContent from "./EarnContent/EarnContent";

const Earn = ({ isConnected, coinbase, chainId, handleSwitchNetwork, onConnectWallet }) => {
  return (
    <div className="container-fluid token-wrapper px-0 mt-5 pt-5">
      <div className="d-flex flex-column gap-5">
        <EarnHero />
        <EarnContent
          isConnected={isConnected}
          coinbase={coinbase}
          chainId={chainId}
          handleSwitchNetwork={handleSwitchNetwork}
          onConnectWallet={onConnectWallet}
        />
      </div>
    </div>
  );
};

export default Earn;
