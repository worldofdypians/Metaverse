import React from "react";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import genesisBg from "../../assets/landAssets/genesisBg.svg";

const LandTiers = () => {
  const tiers = [
    {
      title: "Genesis Land",
      icon: "dummyBadge.png",
    },
    {
      title: "WOD Land tier 1",
      icon: "tierOneLand.svg",
    },
    {
      title: "WOD Land tier 2",
      icon: "tierTwoLand.svg",
    },
    {
      title: "WOD Land tier 3",
      icon: "tierThreeLand.svg",
    },
    {
      title: "WOD Land tier 4",
      icon: "tierFourLand.svg",
    },
  ];

  return (
    <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5">
      <h6 className="land-tiers font-organetto">
        World of Dypians Land{" "}
        <span
          className="land-tiers font-organetto"
          style={{ color: "#8c56ff" }}
        >
          tiers
        </span>
      </h6>
      <span className="w-50 tiers-desc">
        World of Dypians offers 5 tiers of land NFTs. Each tier offers unique
        rewards and benefits within the metaverse.
      </span>
      <div className="tiers-grid mt-5">
        {tiers.map((tier, index) => (
          <div className="genesis-wrapper position-relative" key={index}>
            <img src={genesisBg} alt="genesis" className="w-100" />
            <img
              src={require(`../../assets/landAssets/${tier.icon}`)}
              className="genesis-badge"
              alt="badge"
            />
            <div className="genesis-desc">
              <h6 className="font-organetto land-desc w-75">{tier.title}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandTiers;
