import React from "react";

const LandTiers = () => {
  const tiers = [
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
      title: "Genesis Land",
      icon: "dummyBadge.png",
      content: {
        type: "Genesis",
        chain: "Ethereum",
        dimensions: "125x125m",
        area: "15,625m\u00b2",
        benefits: [
          "1 Multi Functional Building",
          "2 Environmental Items",
          "1 AI Powered NPC",
          "Exclusive Land NFT Staking",
          "Earn Special Rewards",
          "Monetize Land",
        ],
      },
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
      <span className="tiers-desc">
        World of Dypians offers 5 tiers of land NFTs. Each tier offers unique
        rewards and benefits within the metaverse.
      </span>
      <div className="tiers-grid mt-5">
        {tiers.map((tier, index) => (
          <div className="d-flex flex-column"  key={index}>
            <div
              className={`genesis-wrapper d-flex justify-content-center align-items-center p-3 position-relative ${tier.title === "Genesis Land" && 'genesis-land'}`}           
            >
 
              <img
                src={`https://cdn.worldofdypians.com/wod/${tier.icon}`}
                className={`genesis-badge ${tier.title === "Genesis Land" && 'd-none'}`}
                alt="badge"
              />
            </div>
            <div
              className="genesis-desc position-relative"
              style={{ bottom: "5px" }}
            >
              <h6 className="font-organetto land-desc w-75">{tier.title}</h6>
              {tier.content && (
                <>
                  <div className="tier-specs d-flex flex-column gap-3 p-3">
                    <div className="d-flex gap-3 align-items-start justify-content-between">
                      <div className="d-flex align-items-start gap-2">
                        <img
                          src={"https://cdn.worldofdypians.com/wod/mintEthIcon.svg"}
                          alt="ethereum"
                          width={20}
                          height={20}
                        />
                        <div className="d-flex flex-column">
                          <span className="spec-value">
                            {tier.content.chain}
                          </span>
                          <span className="spec-type">Chain</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <img src={"https://cdn.worldofdypians.com/wod/landType.svg"} alt="type" idth={20} height={20} />
                        <div className="d-flex flex-column">
                          <span className="spec-value">
                            {tier.content.type}
                          </span>
                          <span className="spec-type">Type</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/dimensions.svg"}
                        alt="ethereum"
                        width={20}
                        height={20}
                      />
                      <div className="d-flex flex-column">
                        <span className="spec-value">
                          {tier.content.dimensions} ({tier.content.area})
                        </span>
                        <span className="spec-type">Dimensions</span>
                      </div>
                    </div>
                  </div>
                  <h6 className="land-benefits-title mt-2 d-flex">
                    Genesis Land Benefits
                  </h6>
                  {tier.content.benefits.map((item, index) => (
                    <div
                      className=" d-flex align-items-center justify-content-start gap-2 mb-2"
                      key={index}
                    >
                      <img src={"https://cdn.worldofdypians.com/wod/tierCheck.svg"} alt="check" />
                      <span className="tier-benefit">{item}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandTiers;
