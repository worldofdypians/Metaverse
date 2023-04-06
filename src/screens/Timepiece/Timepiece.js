import React from "react";
import './_timepiece.scss'
import timepieceBanner from "./assets/timePieceBanner.webp"
import TimepieceHero from "./TimepieceHero";
import TimePieceSticker from "./TimePieceSticker";
import cawsBanner from "../../screens/Caws/assets/Nft/nft-main-image2.jpg";
import TimePieceBenefits from "../../components/TimepieceBenefits/TimepieceBenefits";
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
}) => {
  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
     <div className="d-flex w-100 flex-column home-main-wrapper" style={{gap: 0, backgroundSize: 'cover'}}>
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
        />
        <TimePieceBenefits />
      </div>
    </div>
  );
};

export default TimePiece;
