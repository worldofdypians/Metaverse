import React from "react";
import { NavLink } from "react-router-dom";
import landNftBanner from "../../../assets/landNftBanner.webp";
import "./_landnft.scss";

const LandNft = () => {
  return (
    <div className="row flex-column-reverse align-items-center flex-lg-row px-3 px-lg-5 mt-5 nft-world-wrapper py-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title w-75">
            World of Dypians Genesis Land
          </h2>
          <p className="caws-hero-content">
            The WOD Land Genesis edition is a new type of NFT that offers a
            unique way to own virtual land in the World of Dypians Metaverse
            platform. This genesis edition is limited to 1,000 minted NFTs, each
            of which represents a piece of virtual land. The minted land is
            located in a prime area within the game and provides players with a
            wide range of benefits.
          </p>
          <NavLink to='/land' className="linear-border" style={{ width: "fit-content" }}>
            <button className="btn filled-btn px-5">View more</button>
          </NavLink>
        </div>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        <img
          src={landNftBanner}
          alt="caws banner"
          className="land-nft-banner"
        />
      </div>
    </div>
  );
};

export default LandNft;
