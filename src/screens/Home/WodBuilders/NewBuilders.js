import React from "react";
import "./_wodbuilders.scss";

const NewBuilders = () => {
  const builders = [
    {
      name: "BNB Chain",
      icon: "bnbIcon.svg",
      banner: "bnbBanner.png",
      link: "https://x.com/BNBCHAIN/status/1821018678550306906",
      backer: true,
    },
    {
      name: "Binance Alpha",
      icon: "binance-alpha.png",
    },
    {
      name: "Trust Wallet",
      icon: "trustWalletLogo.svg",
      banner: "trustwalletBanner.webp",
      link: "https://x.com/TrustWallet/status/1972662705426165966",
      backer: true,
    },
    {
      name: "Matchain",
      icon: "matchainIcon.svg",
      // banner: "bnbBanner.png",
      link: "https://x.com/BNBCHAIN/status/1821018678550306906",
      backer: false,
    },

    {
      name: "CORE",
      icon: "core.svg",
      banner: "coreBanner.png",
      link: "https://x.com/Coredao_Org/status/1790336632823910804",
      backer: true,
    },
    {
      name: "Base",
      icon: "base.svg",
      banner: "baseBanner.png",
      // link: "https://x.com/Coredao_Org/status/1790336632823910804",
      backer: false,
    },
    {
      name: "MultiversX",
      icon: "multiversx.svg",
      banner: "multiversxBanner.png",
      link: "https://x.com/MultiversX/status/1790422563849466280",
      backer: false,
    },
    {
      name: "CoinMarketCap",
      icon: "cmcIcon.svg",
      banner: "coinmarketcapBanner.png",
      link: "https://twitter.com/CoinMarketCap/status/1736697110073119098",
      backer: false,
    },
    {
      name: "CoinGecko",
      icon: "coingeckoIcon.svg",
      banner: "coingeckoBanner.png",
      link: "https://twitter.com/coingecko/status/1702286607846682909",
      backer: false,
    },

    {
      name: "Viction",
      icon: "viction.svg",
      banner: "victionBanner.png",
      link: "https://x.com/VictionEco/status/1789987120083562640",
      backer: true,
    },
    {
      name: "SKALE",
      icon: "skaleIcon.svg",
      banner: "skaleBanner.png",
      link: "https://twitter.com/SkaleNetwork/status/1777372050832658644",
      backer: true,
    },
    {
      name: "Manta",
      icon: "mantaLogoBig.png",
      banner: "mantaBanner.png",
      link: "https://x.com/MantaNetwork/status/1819260085945749903",
      backer: true,
    },
    {
      name: "Taiko",
      icon: "taiko.svg",
      banner: "taikoBanner.png",
      // link: "https://x.com/MantaNetwork/status/1819260085945749903",
      backer: true,
    },
    {
      name: "Conflux",
      icon: "confluxIcon.svg",
      banner: "confluxBanner.png",
      link: "https://twitter.com/Conflux_Network/status/1677017988497563660",
      backer: true,
    },
    {
      name: "BabyDoge",
      icon: "babydogeIcon.svg",
      banner: "babydogeBanner.png",
      link: "https://twitter.com/BabyDogeCoin/status/1777714397667893544",
      backer: false,
    },
    {
      name: "Avalanche",
      icon: "avaxIcon.svg",
      banner: "avalancheBanner.png",
      link: "https://twitter.com/ArtOnAvax/status/1666852593480658944",
      backer: false,
    },
    {
      name: "Chainlink",
      icon: "chainlinkIcon.svg",
      banner: "chainlinkBanner.png",
      link: "https://twitter.com/smartcontract/status/1639280913870893056?s=46&t=nb0doR-1o7k9PQ3EaZE8aw",
      backer: false,
    },

    {
      name: "Coin98",
      icon: "coin98Icon.svg",
      banner: "coin98Banner.png",
      link: "https://twitter.com/coin98_wallet/status/1628742662047272961",
      backer: false,
    },
    {
      name: "Gate.io",
      icon: "gateIcon.svg",
      banner: "gateioBanner.png",
      link: "https://twitter.com/gate_io/status/1628384476496527361?s=20",
      backer: false,
    },
    {
      name: "MEXC Global",
      icon: "mexcIcon.svg",
      banner: "mexcBanner.png",
      link: "https://twitter.com/MEXC_Official/status/1651888989098455043",
      backer: false,
    },
    {
      name: "Bitget",
      icon: "bitgetRound.png",
      // banner: "bitgetBanner.png",
      // link: "https://twitter.com/BitgetGlobal/status/1651888989098455043",
      backer: false,
    },
    {
      name: "Easy2Stake",
      icon: "easy2stakeIcon.svg",
      banner: "easy2stakeBanner.png",
      link: "https://twitter.com/Easy2Stake/status/1654120741221326850",
      backer: false,
    },

    {
      name: "KuCoin",
      icon: "kucoinLogoRound.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Taraxa",
      icon: "taraxa.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },

    {
      name: "SEI",
      icon: "seiLogo.svg",
      banner: "seiBanner.png",
      link: "https://x.com/worldofdypians/status/1795177907821617607",
      backer: false,
    },
    {
      name: "OKX Wallet",
      icon: "okxConnect.svg",
      backer: false,
    },
    {
      name: "Immutable",
      icon: "immutable.svg",
      banner: "immutableBanner.png",
      link: "https://x.com/Immutable/status/1813966964957884795",
      backer: false,
    },
    {
      name: "Cookie Dao",
      icon: "cookie3.svg",
      banner: "cookie3Banner.webp",
      link: "https://x.com/Cookie3_com/status/1824052238404255889",
      backer: true,
    },
    {
      name: "Midle",
      icon: "midle.svg",
      banner: "midleBanner.png",
      link: "https://x.com/midle_official/status/1819705076966940996",
      backer: false,
    },
    // {
    //   name: "DogeCoin",
    //   icon: "dogecoinIcon",
    //   banner: "dogecoinBanner.png",
    //   backer: false,
    // },
    {
      name: "Binance Wallet",
      icon: "binanceWalletUpdated.svg",
      banner: "bnbChainBanner.png",
      // link: "https://x.com/Web3WithBinance/status/1834512410041831902",
      backer: true,
    },
    {
      name: "AlterVerse",
      icon: "alterverse.png",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "KlapAI",
      icon: "klapai.png",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Magic Store",
      icon: "magic.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "GGPLAY",
      icon: "ggplay.svg",
      banner: "kucoinBanner.png",
      link: "https://x.com/GGPlayOfficial/status/1801263235221647731",
      backer: false,
    },
    {
      name: "KAPGAMES",
      icon: "kapgames.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Bitpanda",
      icon: "bitpandaLogo.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Micro3",
      icon: "micro3.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Cyborg",
      icon: "cyborg.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Space ID",
      icon: "spaceId.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "StealthEX",
      icon: "stealthEx.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Balance",
      icon: "balance.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "WorldShards",
      icon: "worldshards.png",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Finceptor",
      icon: "finceptorLogo.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Creo Engine",
      icon: "creoengine.png",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "IBC Group",
      icon: "ibc.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "UQUID",
      icon: "uquid.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Saving DAO",
      icon: "savingDao.png",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "GameSwift",
      icon: "gameswift.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Dyor Exchange",
      icon: "dyor.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "KOLS.HOUSE",
      icon: "kols.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "MintPad",
      icon: "mintpad.svg",
      banner: "kucoinBanner.png",
      backer: false,
    },
    {
      name: "Dypius",
      icon: "dypius.svg",
      backer: false,
    },
    {
      name: "OpenFlux",
      icon: "openflux.svg",
      backer: false,
    },
    {
      name: "PancakeSwap",
      icon: "pancakeBuyWod.svg",
      backer: false,
    },
    {
      name: "CertiK",
      icon: "certik.svg",
      backer: false,
    },
    {
      name: "SWFT",
      icon: "swft.png",
      backer: false,
    },
    {
      name: "NFA",
      icon: "nfaIcon.svg",
      backer: false,
    },
    {
      name: "DAR Open Network",
      icon: "daron.svg",
      backer: false,
    },
    {
      name: "BlockusGG",
      icon: "blockus.svg",
      backer: false,
    },
    {
      name: "Xterio",
      icon: "xterio.svg",
      backer: false,
    },
    {
      name: "Layer3",
      icon: "layer3.svg",
      backer: false,
    },
    {
      name: "Metacade",
      icon: "metacade.png",
      backer: false,
    },
    {
      name: "BGA",
      icon: "bga.png",
      backer: false,
    },
    {
      name: "Veera Browser",
      icon: "veera.svg",
      backer: false,
    },
    {
      name: "Eragon",
      icon: "eragon.svg",
      backer: false,
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
      name: "LetsExchange",
      icon: "letsexchangeLogo.svg",
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
    {
      name: "SwissBorg",
      icon: "swissborg.svg",
    },
    {
      name: "LetsExchange",
      icon: "letsexchangeLogo.svg",
    },
    {
      name: "Equity Block",
      icon: "euqityblock.png",
    },
  ];
  return (
    <div className={`w-100  mx-0 `}>
      <div className="d-flex flex-column gap-2">
        <div className="row mx-0 w-100 gap-4 gap-lg-0 d-flex flex-column flex-lg-row flex-md-column align-items-center justify-content-between">
          <div
            className={`builder-item p-3 d-flex flex-column gap-3 gap-lg-0 justify-content-between `}
          >
            <div className="builders-first-half"></div>
            <div className="new-builders-second-half">
              {builders.map((item, index) => (
                <div
                  key={index}
                  className={`d-flex flex-column align-items-center gap-2`}
                >
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${item.icon}`}
                    width={45}
                    height={45}
                    alt=""
                  />

                  <span
                    className={`new-builder-title mb-0`}
                    style={{ fontWeight: "400" }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row gap-2 col-lg-5"></div>
        </div>
      </div>
    </div>
  );
};

export default NewBuilders;
