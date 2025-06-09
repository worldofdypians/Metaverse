import React, { useState } from "react";
import "./_wodbuilders.scss";
import { NavLink } from "react-router-dom";

const WodPartners = ({ full }) => {
  const partners = [
    {
      name: "Bnb Chain",
      icon: "bnbIcon.svg",
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
  ];

  const [slice, setSlice] = useState(14);

  return (
    <div
      className="w-100 px-3 px-lg-5 pb-5 pt-4 mx-0 build-business-wrapper d-flex justify-content-center position-relative"
      id="partners"
    >
      <div className="custom-container">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
            <h2 className="font-montserrat builders-title explorer-grid-title px-0 m-0 text-start">
              Partners and Backers
              {/* <mark className="font-montserrat explore-tag pe-2">INVESTORS</mark> */}
            </h2>
            {!full && (
              <NavLink
                to={"/about#partners"}
                className="d-flex align-items-center gap-2"
              >
                {/* <span className="view-all-partners">View All</span>
                <img src={partnersDropdown} alt="" /> */}
              </NavLink>
            )}
          </div>
          <div className="new-partners-grid">
            {partners
              .slice(0, full ? partners.length : slice)
              .map((partner, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center flex-column gap-2 mb-3 mb-lg-0"
                  style={{ width: "103px" }}
                >
                  <div className="partner-logo-container">
                    <img
                      src={
                        partner.icon.includes("changeNow")
                           `https://cdn.worldofdypians.com/wod/${partner.icon}`
                      }
                      alt=""
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    />
                  </div>
                  <h6 className="mb-0 small-partners-title">{partner.name}</h6>
                </div>
              ))}
          </div>
        </div>
      </div>

      {!full && (
        <>
          {slice === 14 ? (
            <div
              className="d-flex align-items-center gap-2 view-more-partners"
              onClick={() => setSlice(partners.length)}
            >
              <span className="view-all-partners ">View All</span>
              <img
                src={"https://cdn.worldofdypians.com/wod/partnersDropdown.svg"}
                width={20}
                height={20}
                alt=""
              />
            </div>
          ) : (
            <div
              className="d-flex align-items-center gap-2 view-more-partners"
              onClick={() => setSlice(14)}
            >
              <span className="view-all-partners ">View Less</span>
              <img
                src={"https://cdn.worldofdypians.com/wod/partnersDropdown.svg"}
                width={20}
                height={20}
                style={{ transform: "rotate(180deg)" }}
                alt=""
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WodPartners;
