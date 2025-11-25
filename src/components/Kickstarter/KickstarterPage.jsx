import React, { useEffect } from "react";
import "./_kickstarter.scss";
import KickstarterHero from "./components/KickstarterHero";
import KickstarterBenefits from "./components/KickstarterBenefits";
import KickstarterStats from "./components/KickstarterStats";
// import KickstarterOnboarding from "./components/KickstarterOnboarding";
import KickstarterApply from "./components/KickstarterApply";
import KickstarterPartners from "./components/KickStarterPartners";
import KickstarterVideoContent from "./components/KickstarterVideoContent";
import KickstarterMobile from "./components/KickstarterMobile";
import KickstarterGameplay from "./components/KickstarterGameplay";
import KickstarterLaunchpool from "./components/KickstarterLaunchpool";
import { useLocation } from "react-router-dom";

const KickstarterPage = ({ monthlyPlayers, totalVolumeNew, wodHolders }) => {
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

  const location = useLocation();

  const scrollToElement = () => {
    const element = document.getElementById(
      location.hash.slice(1, location.hash.length)
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    scrollToElement();
  }, [location]);

  useEffect(() => {
    document.title = "Keep Building Program";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="d-flex flex-column w-100">
      <KickstarterHero />
      <KickstarterStats
        monthlyPlayers={monthlyPlayers}
        totalVolumeNew={totalVolumeNew}
        totalPartners={partners.length}
      />
      <KickstarterBenefits />
      <KickstarterPartners partners={partners} />
      <KickstarterVideoContent />
      <KickstarterGameplay />
      <KickstarterLaunchpool wodHolders={wodHolders} />
      <KickstarterMobile />
      <KickstarterApply />
    </div>
  );
};

export default KickstarterPage;
