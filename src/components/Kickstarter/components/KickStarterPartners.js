import "../_kickstarter.scss";
import "./kickstarter_newcss.scss";

const KickstarterPartners = () => {
  const partners = [
    {
      name: "Bnb Chain",
      icon: "bnbIcon.svg",
    },
    {
      name: "Binance Alpha",
      icon: "binance-alpha.png",
    },
    {
      name: "Trust Wallet",
      icon: "trustWalletLogo.svg",
    },
    {
      name: "Matchain",
      icon: "matchainIcon.svg",
    },
    {
      name: "Core",
      icon: "core.svg",
    },
    {
      name: "Base",
      icon: "base.svg",
    },
    {
      name: "MultiversX",
      icon: "multiversx.svg",
    },
    {
      name: "CMC",
      icon: "cmcIcon.svg",
    },
    {
      name: "Coingecko",
      icon: "coingeckoIcon.svg",
    },
    {
      name: "Viction",
      icon: "viction.svg",
    },
    {
      name: "SKALE",
      icon: "skaleIcon.svg",
    },
    {
      name: "Manta",
      icon: "mantaLogoBig.png",
    },
    {
      name: "Taiko",
      icon: "taiko.svg",
    },
    {
      name: "KuCoin",
      icon: "kucoinLogoRound.svg",
    },
    {
      name: "Taraxa",
      icon: "taraxa.svg",
    },
    {
      name: "Binance Wallet",
      icon: "binanceWalletUpdated.svg",
    },
    {
      name: "OKX Wallet",
      icon: "okxConnect.svg",
    },
    {
      name: "Immutable",
      icon: "immutable.svg",
    },
    {
      name: "Coin98",
      icon: "coin98Icon.svg",
    },
    {
      name: "Avalanche",
      icon: "avaxIcon.svg",
    },
    {
      name: "Chainlink",
      icon: "chainlinkIcon.svg",
    },

    {
      name: "Gate.Io",
      icon: "gateIcon.svg",
    },
    {
      name: "Mexc Global",
      icon: "mexcIcon.svg",
    },
    {
      name: "Bitget",
      icon: "bitgetRound.png",
    },
    {
      name: "Easy2Stake",
      icon: "easy2stakeIcon.svg",
    },

    {
      name: "Conflux",
      icon: "confluxIcon.svg",
    },
    {
      name: "SEI",
      icon: "seiLogo.svg",
    },

    {
      name: "Cookie DAO",
      icon: "cookie3.svg",
    },
    {
      name: "Midle",
      icon: "midle.svg",
    },
    {
      name: "Financial Move",
      icon: "financialmoveLogo.svg",
    },
    // {
    //   name: "Playground",
    //   icon: "playground.svg",
    // },
    {
      name: "AlterVerse",
      icon: "alterverse.png",
    },
    {
      name: "KlapAi",
      icon: "klapai.png",
    },
    {
      name: "Magic Store",
      icon: "magic.svg",
    },
    {
      name: "BabyDoge",
      icon: "babydogeIcon.svg",
    },
    {
      name: "GGG",
      icon: "ggplay.svg",
    },
    {
      name: "KAPGAMES",
      icon: "kapgames.svg",
    },
    {
      name: "Bitpanda",
      icon: "bitpandaLogo.svg",
    },
    {
      name: "Castrum Capital",
      icon: "castrumLogo.png",
    },
    {
      name: "Micro3",
      icon: "micro3.svg",
    },
    {
      name: "Cyborg",
      icon: "cyborg.svg",
    },
    {
      name: "Space ID",
      icon: "spaceId.svg",
    },

    {
      name: "StealthEX",
      icon: "stealthEx.svg",
    },
    {
      name: "Balance",
      icon: "balance.svg",
    },
    {
      name: "WorldShards",
      icon: "worldshards.png",
    },
    {
      name: "Poolz",
      icon: "poolz.svg",
    },
    {
      name: "WeWay",
      icon: "weway.svg",
    },
    {
      name: "Ordify",
      icon: "ordify.svg",
    },
    {
      name: "Finceptor",
      icon: "finceptorLogo.svg",
    },
    {
      name: "Creo Engine",
      icon: "creoengine.png",
    },
    {
      name: "IBC Group",
      icon: "ibc.svg",
    },
    {
      name: "UQUID",
      icon: "uquid.svg",
    },
    {
      name: "Saving DAO",
      icon: "savingDao.png",
    },
    {
      name: "GameSwift",
      icon: "gameswift.svg",
    },
    {
      name: "Dyor Exchange",
      icon: "dyor.svg",
    },

    {
      name: "MPC Education",
      icon: "mpceducationLogo.svg",
    },
    {
      name: "Mintpad",
      icon: "mintpad.svg",
    },
    {
      name: "Dypius",
      icon: "dypius.svg",
    },
    {
      name: "OpenFlux",
      icon: "openflux.svg",
    },
    {
      name: "PancakeSwap",
      icon: "pancakeBuyWod.svg",
    },
    {
      name: "CertiK",
      icon: "certik.svg",
    },
    {
      name: "SWFT",
      icon: "swft.png",
    },
    {
      name: "NFA",
      icon: "nfaIcon.svg",
    },
    {
      name: "DAR Open Network",
      icon: "daron.svg",
    },
    {
      name: "BlockusGG",
      icon: "blockus.svg",
    },
    {
      name: "Xterio",
      icon: "xterio.svg",
    },
    {
      name: "Layer3",
      icon: "layer3.svg",
    },
    {
      name: "Metacade",
      icon: "metacade.png",
    },
    {
      name: "BGA",
      icon: "bga.png",
    },
    {
      name: "Veera Browser",
      icon: "veera.svg",
    },
    {
      name: "Eragon",
      icon: "eragon.svg",
    },
    {
      name: "THENA",
      icon: "thenalogo.svg",
    },
    {
      name: "Gaimin",
      icon: "gaimin.svg",
    },
    {
      name: "Vanar",
      icon: "vanar.svg",
    },
    {
      name: "ChangeNOW",
      icon: "changeNow.webp",
    },
    {
      name: "BloFin",
      icon: "blofinBuywod.png",
    },
    {
      name: "JOY",
      icon: "joy.png",
    },
    {
      name: "CARV",
      icon: "carv.png",
    },
    {
      name: "XPIN Network",
      icon: "xpin.png",
    },
    {
      name: "Coinomi Wallet",
      icon: "coinomi.svg",
    },
    {
      name: "Fair3",
      icon: "fair3.png",
    },
    {
      name: "Tea-Fi",
      icon: "teafi.svg",
    },
    {
      name: "Melitho Ventures",
      icon: "melitho.png",
    },
    {
      name: "CoinRabbit",
      icon: "coinrabbit.png",
    },
    {
      name: "Vameon",
      icon: "vameon.svg",
    },
    {
      name: "Phemex",
      icon: "phemex.png",
    },
    {
      name: "HiBt",
      icon: "hibt.png",
    },
    {
      name: "KCEX",
      icon: "kcex.png",
    },
    {
      name: "SUPERFORTUNE",
      icon: "superfortune.png",
    },
    {
      name: "WEEX",
      icon: "weex.svg",
    },
    {
      name: "Toobit",
      icon: "toobit.svg",
    },
    {
      name: "BingX",
      icon: "bingx.svg",
    },
    {
      name: "Uphold",
      icon: "uphold.svg",
    },
    {
      name: "Uniswap",
      icon: "uniswapBuyWod.png",
    },
    {
      name: "BVOX",
      icon: "bvoxBuyWod.png",
    },
    {
      name: "Bitkan",
      icon: "bitkanBuyWod.png",
    },
    {
      name: "Tothemoon",
      icon: "tothemoonBuyWod.png",
    },
    {
      name: "OpenOcean",
      icon: "openoceanBuyWod.png",
    },
    {
      name: "Bitexen",
      icon: "bitexen.png",
    },
    {
      name: "Biconomy",
      icon: "biconomy.png",
    },
    {
      name: "BTCC",
      icon: "btcc.svg",
    },
  ];

  return (
    <section
      className="py-20 px-lg-6 px-2 relative overflow-hidden bordertw-3 border-black"
      id="partners"
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-yellow-900/20 to-amber-900/20"></div>
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="custom-container mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 bordertw border-orange-400/30 rounded-full backdrop-blur-sm mb-8">
            {/* <Shield className="w-4 h-4 text-orange-300 mr-2" /> */}
            <span className="text-orange-300 font-semibold text-sm uppercase tracking-wider">
              Trusted Ecosystem
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="text-white metrics-title">TRUSTED BY</span>
            <br />
            <span className="bg-gradient-to-r metrics-title from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              INDUSTRY LEADERS
            </span>
          </h2>
        </div>

        {/* Partners showcase container */}
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-lg-8 p-3 bordertw border-white/20 mb-12 relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-amber-500/10 rounded-3xl"></div>

          <div className="relative">
            {/* Compact logo grid */}
            <div className="grid kickstart-partner-grid md:grid-cols-8 lg:grid-cols-12 gap-6 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect for individual logos */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacitytw-0 group-hover:opacitytw-100 rounded-xl blur-lg transition-all duration-500 scale-150"></div>

                  <div className="relative w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm bordertw border-orange-400/50 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden group-hover:bg-black/60">
                    <img
                      src={`https://cdn.worldofdypians.com/wod/${partner.icon}`}
                      alt={partner.name}
                      className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Enhanced tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500/90 to-yellow-500/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacitytw-0 group-hover:opacitytw-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 bordertw border-orange-400/30 shadow-lg shadow-orange-500/25">
                    {partner.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-orange-500/90"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles matching the theme */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping opacitytw-40"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default KickstarterPartners;
