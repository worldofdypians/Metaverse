import React from 'react'

const LaunchpoolStats = () => {

const launchpoolStats = [
    {
    icon: "globalExposure",
    title: "Global Exposure",
    desc: "Showcase your project to a massive global user base.",
    },
    {
    icon: "enhancedLiquidity",
    title: "Enhanced Liquidity",
    desc: "Gain instant liquidity to boost your project's market potential.",
    },
    {
    icon: "communityGrowth",
    title: "Community Growth",
    desc: "Build an engaged and loyal community of supporters.",
    },
    {
    icon: "collaborativeOpportunities",
    title: "Collaborative Opportunities",
    desc: "Collaborate with leading players across the blockchain space.",
    },
    {
    icon: "ecosystemSupport",
    title: "Ecosystem  Support",
    desc: "Leverage tools and advice for long-term project success.",
    },
    {
    icon: "streamlinedDistribution",
    title: "Streamlined Distribution",
    desc: "Ensure efficient token allocation to a wide audience.",
    },
]

  return (
    <div className='launchpool-stats-wrapper py-4'>
         <div className="container-fluid py-4 px-0 d-flex justify-content-center">
        <div className="custom-container w-100  ">
        <div className="d-flex flex-column gap-4">
        <h6 className="mb-0 game-feature-title">Why choose us?</h6>
          <div className="token-utilities-grid px-3 px-lg-0">
            {launchpoolStats.map((item, index) => (
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

export default LaunchpoolStats