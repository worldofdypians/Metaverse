import React from "react";
import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";
// const KickstarterBenefits = () => {

// const kickstarterStats = [
//     {
//     icon: "globalExposure",
//     title: "Daily Power Chest Integration",
//     desc: "Your token becomes a daily in-game reward, unlocking consistent user engagement, branded exposure, and measurable on-chain activity.",
//     },
//     {
//     icon: "enhancedLiquidity",
//     title: "The Great Collection Campaigns",
//     desc: "Enable 100M+ players to earn and collect your tokens through gameplay, leveraging real utility inside the game and building loyal user bases.",
//     },
//     {
//     icon: "communityGrowth",
//     title: "Telegram Mini App Exposure",
//     desc: "Your project is added to the viral World of Dypians mini-app ecosystem, fueling exponential growth with built-in referral mechanics and high-volume tasks.",
//     },
//     {
//     icon: "collaborativeOpportunities",
//     title: "Cinematic Video Promotions",
//     desc: "Next-level visual storytelling shared with over 1M YouTube subscribers to generate buzz, hype, and community FOMO.",
//     },
//     {
//     icon: "ecosystemSupport",
//     title: "Brand Integration & PR Power",
//     desc: "Featured inside the game world with location branding, billboards, events, and social campaigns supported by AMAs, PR pushes, and influencer activity.",
//     },
//     {
//     icon: "streamlinedDistribution",
//     title: "Cross-Promotion With Top Networks",
//     desc: "Tap into the strength of an interconnected metaverse supported by BNB Chain, Base, Core, Taiko, Sei, Viction, SKALE, Manta, and more, where your project gains visibility and utility across the ecosystem.",
//     },
// ]

//   return (
//      <div className='launchpool-stats-wrapper py-4'>
//          <div className="container-fluid py-4 px-0 d-flex justify-content-center">
//         <div className="custom-container w-100">
//         <div className="d-flex flex-column gap-4">
//         <h6 className="mb-0 game-feature-title">Why Join Kickstart?</h6>
//           <div className="token-utilities-grid px-3 px-lg-0">
//             {kickstarterStats.map((item, index) => (
//               <div className="d-flex flex-column gap-3" key={index}>
//                 <img
//                   src={`https://cdn.worldofdypians.com/wod/${item.icon}.svg`}
//                   width={60}
//                   height={60}
//                   alt=""
//                 />
//                 <h6 className="token-utility-title mb-0">{item.title}</h6>
//                 <p className="mb-0 token-utility-desc">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default KickstarterBenefits

const KickstarterBenefits = () => {
  const benefits = [
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitRocket.svg",
      title: "Accelerated Growth",
      description:
        "Fast-track your brand visibility and engagement with our proven marketing strategies and community reach.",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitExposure.svg",
      title: "Targeted Exposure",
      description:
        "Reach your ideal audience through our engaged gaming community and strategic placement opportunities.",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitGlobal.svg",
      title: "Global Network",
      description:
        "Access our worldwide community of players, creators, and partners for maximum impact and reach.",
      gradient: "from-purple-400 to-violet-600",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitPremium.svg",
      title: "Premium Features",
      description:
        "Unlock exclusive in-game features, special events, and premium placement opportunities for your brand.",
      gradient: "from-yellow-400 to-orange-600",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitPartnership.svg",
      title: "Free Support",
      description:
        "Launch and grow your early-stage project with zero cost. Gain access to our community, resources, and strategic guidance without any barriers.",
      gradient: "from-cyan-400 to-teal-600",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitStar.svg",
      title: "Creative Freedom",
      description:
        "Express your brand uniquely with custom experiences, events, and interactive content opportunities.",
      gradient: "from-pink-400 to-rose-600",
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="custom-container mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 bordertw border-purple-400/30 rounded-full backdrop-blur-sm mb-8">
            {/* <Sparkles className="w-4 h-4 text-purple-300 mr-2" /> */}
            <span className="text-purple-300 text-sm uppercase tracking-wider">
              Program Benefits
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="text-white metrics-title">WHY CHOOSE</span>
            <br />
            <span className="metrics-title text-uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Keep Building?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative">
              {/* Card */}
              <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 bordertw border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 h-full overflow-hidden">
                {/* Background image */}

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacitytw-0 group-hover:opacitytw-10 transition-opacity duration-500 rounded-2xl`}
                ></div>

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">
                      <img
                        src={benefit.icon}
                        alt={benefit.title}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>

                  <h3
                    className={`text-2xl font-semibold mb-4 bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent group-hover:text-white transition-all duration-300`}
                  >
                    {benefit.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>

                {/* Animated border - simplified without custom keyframes */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.gradient} opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KickstarterBenefits;
