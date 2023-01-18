import React from "react";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import genesisBg from "../../assets/landAssets/genesisBg.svg";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import landType from "../../assets/landAssets/landType.svg";
import dimensions from "../../assets/landAssets/dimensions.svg";
import tierCheck from "../../assets/landAssets/tierCheck.svg";

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
      content: 
        {
          type: 'Genesis',
          chain: 'Ethereum',
          dimensions: '125x125m',
          area: '15,625m\u00b2',
          benefits: [
            '1 Multi Functional Land',
            '2 Enviromental Items',
            '1 NPC Character',
            'Exclusive Land NFT Staking', 
            'Earn Special Rewards',
            'Monetize Land'
          ]
        }
      ,
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
              {tier.content && 
              <>
              <div className="tier-specs d-flex flex-column gap-2 p-3">
                <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between">
                  <div className="d-flex align-items-start gap-2">
                    <img src={landType} alt="type"  idth={20} height={20}/>
                    <div className="d-flex flex-column">
                      <span className="spec-value">{tier.content.type}</span>
                      <span className="spec-type">Type</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2">
                    <img src={mintEthIcon} alt="ethereum"  width={20} height={20} />
                    <div className="d-flex flex-column">
                      <span className="spec-value">{tier.content.chain}</span>
                      <span className="spec-type">Chain</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-2">
                    <img src={dimensions} alt="ethereum"  width={20} height={20} />
                    <div className="d-flex flex-column">
                      <span className="spec-value">{tier.content.dimensions} ({tier.content.area})</span>
                      <span className="spec-type">Dimensions</span>
                    </div>
                  </div>
              </div>
              <h6 className="land-benefits-title mt-2">
                Genesis Land Benefits
              </h6>
              {tier.content.benefits.map((item) => (
                <div className="d-flex align-items-center gap-2">
                  <img src={tierCheck} alt="check" />
                  <span className="tier-benefit">{item}</span>
                </div>
              ))}
              </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandTiers;
