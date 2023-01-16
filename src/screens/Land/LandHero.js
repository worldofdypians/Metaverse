import React from "react";
import landBg from "../../assets/landAssets/landBG.svg";
import benefitIcon from "../../assets/landAssets/benefitIcon.svg";

const LandHero = () => {
  const benefits = [
    {
      title: "1 Multi-functional Building",
      icon: "building",
    },
    {
      title: "2 Enviriomental Items",
      icon: "envirioment",
    },
    {
      title: "1 NPC Character",
      icon: "npc",
    },
    {
      title: "Exclusive Land NFT Staking",
      icon: "coin",
    },
    {
      title: "Earn Special Rewards",
      icon: "rewards",
    },
    {
      title: "Monetize Land",
      icon: "monetize",
    },
  ];

  return (
    <>
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
        <div className="col-12 col-lg-5 ps-2 ps-lg-0">
          <h6 className="land-hero-title font-organetto">
            1000 Premium WOD Land
          </h6>
          <h6
            className="land-hero-title font-organetto"
            style={{ color: "#8c56ff" }}
          >
            Genesis Edition NFTS
          </h6>
          <p className="land-hero-content font-poppins">
            The WOD Land Genesis edition is a new type of NFT that offers a
            unique way to own virtual land in the World of Dypians Metaverse
            platform. This genesis edition is limited to 1,000 minted NFTs, each
            of which represents a piece of virtual land. The minted land is
            located in a prime area within the game and provides players with a
            wide range of benefits. The WOD Land Genesis edition is currently
            available for minting on the Ethereum blockchain.
          </p>
        </div>
        <div className="col-12 col-lg-6 pe-2 pe-lg-0 d-flex justify-content-end">
          <img src={landBg} className="land-bg" alt="background" />
        </div>
      </div>
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
        <div className="col-12 ps-2 ps-lg-0">
          <h6 className="land-hero-title font-organetto d-flex gap-2">
            Nft{" "}
            <h6 className="land-hero-title" style={{ color: "#8c56ff" }}>
              Benefits
            </h6>
          </h6>
          <div className="benefits-wrapper p-4">
            {benefits.map((benefit, index) => (
              <div className="d-flex align-items-center gap-2" key={index}>
                <img
                  src={require(`../../assets/landAssets/${benefit.icon}Icon.svg`)}
                  alt=""
                />
                <span className="benefits-title font-poppins">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandHero;
