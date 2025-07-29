import React from 'react'
import '../_kickstarter.scss'

const KickstarterBenefits = () => {

const kickstarterStats = [
    {
    icon: "globalExposure",
    title: "Daily Power Chest Integration",
    desc: "Your token becomes a daily in-game reward, unlocking consistent user engagement, branded exposure, and measurable on-chain activity.",
    },
    {
    icon: "enhancedLiquidity",
    title: "The Great Collection Campaigns",
    desc: "Enable 100M+ players to earn and collect your tokens through gameplay, leveraging real utility inside the game and building loyal user bases.",
    },
    {
    icon: "communityGrowth",
    title: "Telegram Mini App Exposure",
    desc: "Your project is added to the viral World of Dypians mini-app ecosystem, fueling exponential growth with built-in referral mechanics and high-volume tasks.",
    },
    {
    icon: "collaborativeOpportunities",
    title: "Cinematic Video Promotions",
    desc: "Next-level visual storytelling shared with over 1M YouTube subscribers to generate buzz, hype, and community FOMO.",
    },
    {
    icon: "ecosystemSupport",
    title: "Brand Integration & PR Power",
    desc: "Featured inside the game world with location branding, billboards, events, and social campaigns supported by AMAs, PR pushes, and influencer activity.",
    },
    {
    icon: "streamlinedDistribution",
    title: "Cross-Promotion With Top Networks",
    desc: "Tap into the strength of an interconnected metaverse supported by BNB Chain, Base, Core, Taiko, Sei, Viction, SKALE, Manta, and more, where your project gains visibility and utility across the ecosystem.",
    },
]

  return (
     <div className='launchpool-stats-wrapper py-4'>
         <div className="container-fluid py-4 px-0 d-flex justify-content-center">
        <div className="custom-container w-100">
        <div className="d-flex flex-column gap-4">
        <h6 className="mb-0 game-feature-title">Why Join Kickstart?</h6>
          <div className="token-utilities-grid px-3 px-lg-0">
            {kickstarterStats.map((item, index) => (
              <div className="d-flex flex-column gap-3" key={index}>
                <img
                  src={`https://cdn.worldofdypians.com/wod/${item.icon}.svg`}
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
    </div>
  )
}

export default KickstarterBenefits