import React from "react";
import timepieceBanner1 from "./assets/timepieceBanner1.webp";

const TimePieceSticker = () => {
  return (
    <div className="row flex-column-reverse flex-lg-row px-3 px-lg-5 mt-0 caws-world-wrapper py-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6 d-flex align-items-center">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column">
            <h2 className="font-organetto caws-hero-title">Caws Timepiece</h2>
            <h2
              className="font-organetto caws-hero-title"
              style={{ color: "#8C56FF" }}
            >
              NFT Collection
            </h2>
          </div>
          <p className="caws-hero-content">
            The CAWS Timepiece NFT collection is the second official NFT
            collection created and produced by Dypius. Holders of the original
            CAWS NFT will be able to mint a Timepiece NFT for FREE for each
            original CAWS NFT held. In Addition, the Timepiece NFTs will provide
            users additional utility and perks in the World of Dypians Metaverse
            platform. Finally, Timepiece NFTs will have access to the CAWS NFT
            staking pool generating real ETH rewards.
          </p>
        </div>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <img src={timepieceBanner1} alt="caws banner" className="caws-banner" />
      </div>
    </div>
  );
};

export default TimePieceSticker;
