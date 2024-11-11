import React from "react";
import "./_tokenutility.scss";

const TokenUtility = () => {
  const utilities = [
    {
      icon: "gameCurrency",
      title: "In-Game Currency",
      desc: "Use the token as the main currency for buying virtual goods and upgrades",
    },
    {
      icon: "earnSolutions",
      title: "Earn Solutions",
      desc: "Reward players with tokens for achievements and engagement",
    },
    {
      icon: "rewardsIncentives",
      title: "Rewards and Incentives",
      desc: "Stake tokens for rewards and benefits in the game",
    },
    {
      icon: "nftMarketplace",
      title: "NFT Marketplace",
      desc: "Use the token to buy, sell, and trade NFTs within the marketplace",
    },
    {
      icon: "governanceDecisions",
      title: "Governance Decisions",
      desc: "Participate in platform decisions as a token holder ",
    },
    {
      icon: "platformFees",
      title: "Platform Fees",
      desc: "Use the token for transactions and premium features",
    },
  ];

  return (
    <div className="position-relative d-flex flex-column gap-5 align-items-center">
      <div className="container-lg">
        <div className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <h4 className="explorer-grid-title font-montserrat text-center">
              Token Utility
            </h4>
          </div>
          <p className="mb-0 token-utility-desc-header">
            The WOD token is at the heart of the World of Dypians ecosystem,
            crafted to enhance your experience and engagement. It unlocks a
            range of features and benefits on our platform, making it essential
            for all players.
          </p>
        </div>
      </div>
      <div className="container-fluid py-4 px-0 d-flex justify-content-center buy-wod-bg">
        <div className="custom-container w-100  ">
          <div className="token-utilities-grid">
            {utilities.map((item, index) => (
              <div className="d-flex flex-column gap-3" key={index}>
                <img
                  src={require(`./utilityIcons/${item.icon}.svg`)}
                  width={60}
                  height={60}
                  alt=""
                />
                <h6 className="token-utility-title mb-0">{item.title}</h6>
                <p className="mb-0 token-utility-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenUtility;
