import { abbreviateNumber } from "js-abbreviation-number";

const KickstarterLaunchpool = ({ wodHolders }) => {
  const valueProps = [
    {
      icon: "https://cdn.worldofdypians.com/wod/benefitGlobal.svg",
      title: "Global Reach",
      description:
        "Instant access to 112+ million engaged players across multiple blockchain networks",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/chartStats.svg",
      title: "Accelerated Growth",
      description:
        "Fast-track your project's adoption with our proven ecosystem and user acquisition strategies",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/userStats.svg",
      title: "Community Building",
      description:
        "Tap into the most active gaming and crypto community to build lasting user relationships",
    },
  ];

  return (
    <section className="py-20 px-lg-6 px-2 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHJvY2tldHxlbnwxfHx8fDE3NTQ0ODU5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Space Launch"
          className="w-full h-full object-cover opacitytw-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-emerald-900/40 to-cyan-900/30"></div>
        {/* Dynamic gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="custom-container mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 bordertw border-green-400/30 rounded-full backdrop-blur-sm mb-8">
            {/* <Rocket className="w-4 h-4 text-green-300 mr-2" /> */}
            <span className="text-green-300 text-sm uppercase tracking-wider">
              Launchpool Opportunity
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="text-white metrics-title">EMPOWERING</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent metrics-title">
              BNB CHAIN PROJECTS
            </span>
          </h2>
        </div>

        {/* Main Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Value propositions */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 backdrop-blur-sm d-flex align-items-center justify-content-center rounded-xl p-6 bordertw border-white/20 hover:scale-105 transition-all duration-300 hover:border-green-400/30 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-white  text-center">
                      {abbreviateNumber(wodHolders, 0)}+
                    </h2>
                    <p className="text-gray-300 mb-0 leading-relaxed text-center">
                      WOD Holders
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 d-flex align-items-center justify-content-center bordertw border-white/20 hover:scale-105 transition-all duration-300 hover:border-green-400/30 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-white text-center">2.5M+</h2>
                    <p className="text-gray-300 leading-relaxed mb-0 text-center">
                      Community Members
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl d-flex align-items-center justify-content-center p-6 bordertw border-white/20 hover:scale-105 transition-all duration-300 hover:border-green-400/30 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-white  text-center">320%</h2>
                    <p className="text-gray-300 mb-0 leading-relaxed text-center">
                      Average Growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {valueProps.map((prop, index) => {
              return (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 bordertw border-white/20 hover:scale-105 transition-all duration-300 hover:border-green-400/30 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={prop.icon}
                        alt={prop.title}
                        className="w-6 h-6 text-white"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xl text-white mb-3">{prop.title}</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual representation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-cyan-400/30 blur-3xl rounded-2xl scale-110"></div>

            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 bordertw border-white/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <img
                    src="https://cdn.worldofdypians.com/wod/kickstarterWhitebnb.svg"
                    alt="Kickstarter BNB"
                    className="w-8 h-8"
                  />
                </div>
                <h4 className="text-2xl text-white mb-4">
                  Built for BNB Chain
                </h4>
                <p className="text-gray-300">
                  Supporting the next generation of blockchain innovation
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 bordertw border-green-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                      alt=""
                      className="w-5 h-5 text-yellow-400"
                    />
                    <span className="text-white">Fast Launch</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Setup the launchpool quickly and get your project live with
                    a smooth, streamlined process from start to finish.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-6 bordertw border-emerald-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src="https://cdn.worldofdypians.com/wod/cyanUser.svg"
                      alt=""
                      className="w-5 h-5 text-yellow-400"
                    />
                    <span className="text-white">Dedicated Support Team</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Get personalized guidance from our experts who understand
                    the unique challenges of early-stage projects.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 bordertw border-cyan-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src="https://cdn.worldofdypians.com/wod/benefitGlobalBlue.svg"
                      alt=""
                      className="w-5 h-5 text-yellow-400"
                    />
                    <span className="text-white">Ecosystem Access</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Connect with other projects, partners, and resources within
                    our thriving gaming and DeFi ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-ping opacitytw-40"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + i * 10}%`,
              animationDelay: `${i * 600}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default KickstarterLaunchpool;
