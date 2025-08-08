import { NavLink } from "react-router-dom";

const KickstarterGameplay = () => {
  const gameImages = [
    {
      src: "https://cdn.worldofdypians.com/wod/kickstarterTreasurehunt.webp",
      alt: "Treasure Hunt",
      //   icon: Coins,
      rarity: "Treasure Hunt",
      link: "/account/challenges/treasure-hunt",
    },
    {
      src: "https://cdn.worldofdypians.com/wod/kickstarterGreatCollection.webp",
      alt: "The Great Collection",
      //   icon: Star,
      rarity: "The Great Collection",
      link: "/account/challenges/great-collection",
    },
    {
      src: "https://cdn.worldofdypians.com/wod/kickstarterDailyBonus.webp",
      alt: "Daily Bonus",
      //   icon: Gem,
      rarity: "Daily Bonus",
      link: "/account#dailybonus",
    },
    {
      src: "https://cdn.worldofdypians.com/wod/kickstarterExplorerHunt.webp",
      alt: "Explorer Hunt",
      //   icon: Star,
      rarity: "Explorer Hunt",
      link: "/account/challenges/explorer-hunt",
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Enhanced background with gaming imagery */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.worldofdypians.com/wod/kickstarterGameplayBg.webp"
          alt="Gaming Fantasy World"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
        {/* Dynamic gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="custom-container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-400/30 rounded-full backdrop-blur-sm mb-8">
            {/* <Gamepad2 className="w-4 h-4 text-blue-300 mr-2" /> */}
            <span className="text-blue-300 text-sm uppercase tracking-wider">
              Game Features
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-4">
            <span className="uppercase bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent metrics-title">
              Real Gameplay
            </span>
            <br />
            <span className="uppercase text-white metrics-title">
              Seamless Integration
            </span>
          </h2>
        </div>

        {/* 4 Game Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {gameImages.map((game, index) => {
            // const IconComponent = game.icon;
            return (
              <NavLink to={game.link} key={index} className="relative group">
                {/* Glow effect behind each image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-cyan-500/30 to-purple-400/30 blur-2xl rounded-2xl scale-110 opacitytw-60 group-hover:opacitytw-100 transition-opacity duration-500"></div>

                <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 bordertw border-white/20 overflow-hidden hover:scale-105 transition-all duration-300">
                  <img
                    src={game.src}
                    alt={game.alt}
                    className="w-full h-64 object-cover rounded-xl"
                  />

                  {/* Rarity indicator */}
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-cyan-500 to-blue-600 backdrop-blur-sm rounded-lg p-2 bordertw border-purple-300/50 animate-pulse">
                    <span className="text-white text-sm">{game.rarity}</span>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping opacitytw-40"
            style={{
              top: `${15 + i * 8}%`,
              left: `${10 + i * 7}%`,
              animationDelay: `${i * 400}ms`,
              animationDuration: "2.5s",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default KickstarterGameplay;
