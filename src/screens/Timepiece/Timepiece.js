import React, { useEffect } from "react";
import "./_timepiece.scss";
import timepieceBanner from "./assets/timePieceBanner.webp";
import TimepieceHero from "./TimepieceHero";
import TimePieceSticker from "./TimePieceSticker";
import cawsBanner from "../../screens/Caws/assets/Nft/nft-main-image2.jpg";
import TimePieceTraits from "../../components/TimepieceBenefits/TimepieceTraits";
import TimepieceBenefits from "../../components/TimepieceBenefits/TimepieceBenefits";
import TimePieceMint from "../../components/TimepieceMint/TimepieceMint";

const TimePiece = ({
  showWalletConnect,
  handleViewCollection,
  coinbase,
  isConnected,
  totalCreated,
  mintStatus,
  mintloading,
  chainId,
  nftName,
  textColor,
  handleMint,
  cawsArray,
  calculateCaws
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Timepiece";
  }, []);

  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
      <div
        className="d-flex w-100 flex-column home-main-wrapper"
        style={{ gap: 0, backgroundSize: "cover" }}
      >
        <TimepieceHero />
        <TimePieceSticker />
        <TimePieceMint
          showWalletConnect={showWalletConnect}
          handleViewCollection={handleViewCollection}
          coinbase={coinbase}
          isConnected={isConnected}
          totalCreated={totalCreated}
          mintStatus={mintStatus}
          mintloading={mintloading}
          chainId={chainId}
          nftName={nftName}
          textColor={textColor}
          handleMint={handleMint}
          cawsArray={cawsArray}
          calculateCaws={calculateCaws}
        />
        <TimePieceTraits />
        <TimepieceBenefits />
      </div>
    </div>
  );
};

export default TimePiece;
