import React from "react";
import "./_timepiece.scss";
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
      <div
        className="d-flex w-100 flex-column news-main-wrapper"
        style={{ gap: 0 }}
      >
        <div className="full-screen-main-hero">
          <div className="container-fluid px-0">
            {/* <div className="col-12 px-0"> */}
            <img
              src={cawsBanner}
              alt=""
              className="w-100 timepiece-bannerimg"
            />
            {/* </div> */}
          </div>
        </div>
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
