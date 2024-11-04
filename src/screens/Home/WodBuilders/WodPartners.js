import React from "react";
import "./_wodbuilders.scss";
import partnersRight from "./assets/partnersRight.svg";
import { NavLink } from "react-router-dom";

const WodPartners = ({ full }) => {
  const partners = [
    {
      name: "Chainlink",
      icon: "chainlink.svg",
    },
    {
      name: "Bnb Chain",
      icon: "bnb.svg",
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
      name: "Avalanche",
      icon: "avalanche.svg",
    },
    {
      name: "CMC",
      icon: "cmc.svg",
    },
    {
      name: "Coingecko",
      icon: "coingecko.svg",
    },
    {
      name: "KuCoin",
      icon: "kucoin.svg",
    },
    {
      name: "Coin98",
      icon: "coin98.svg",
    },
    {
      name: "Conflux",
      icon: "conflux.svg",
    },
    {
      name: "DogeCoin",
      icon: "dogecoinIcon.svg",
    },
    {
      name: "Binance Web3",
      icon: "binanceWeb3.png",
    },
    {
      name: "SEI",
      icon: "seiLogo.svg",
    },
    {
      name: "Immutable",
      icon: "immutable.svg",
    },
    {
      name: "SKALE",
      icon: "skale.svg",
    },
    {
      name: "Manta",
      icon: "manta.png",
    },
    {
      name: "Taiko",
      icon: "taiko.svg",
    },
    {
      name: "Gate.Io",
      icon: "gateio.svg",
    },
    {
      name: "Mexc Global",
      icon: "mexc.svg",
    },
    {
      name: "Castrum Capital",
      icon: "castrum.png",
    },
    {
      name: "Financial Move",
      icon: "financialmove.svg",
    },
    {
      name: "BabyDoge",
      icon: "babydoge.svg",
    },
    {
      name: "Viction",
      icon: "viction.svg",
    },
    {
      name: "MultiversX",
      icon: "multiversx.svg",
    },
    {
      name: "Easy2Stake",
      icon: "easy2stake.svg",
    },
    {
      name: "Midle",
      icon: "midle.png",
    },
    {
      name: "Cookie3",
      icon: "cookie3.svg",
    },
    {
      name: "Playground",
      icon: "playground.svg",
    },
    {
      name: "KlapAi",
      icon: "klapai.png",
    },
    {
      name: "Magic Store",
      icon: "magicstore.svg",
    },
    {
      name: "GGG",
      icon: "ggg.png",
    },
    {
      name: "MPC Education",
      icon: "mpceducation.svg",
    },
    {
      name: "Crypto Adventure",
      icon: "cryptoadventure.svg",
    },
    {
      name: "KAPGAMES",
      icon: "kapgames.svg",
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
      name: "SpaceID",
      icon: "spaceId.svg",
    },
    {
      name: "Hamster Chain",
      icon: "hamsterChain.png",
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
      icon: "finceptor.svg",
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
      name: "AlterVerse",
      icon: "alterverse.png",
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
  ];

  return (
    <div
      className="w-100 px-3 px-lg-5 mx-0 build-business-wrapper py-4 d-flex justify-content-center"
      id="partners"
    >
      <div className="custom-container">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h2 className="font-montserrat builders-title explorer-grid-title px-0 m-0">
              PARTNERS AND INVESTORS
              {/* <mark className="font-montserrat explore-tag pe-2">INVESTORS</mark> */}
            </h2>
            {!full && (
              <NavLink
                to={"/about#partners"}
                className="d-flex align-items-center gap-2"
              >
                <span className="view-all-partners">View All</span>
                <img src={partnersRight} alt="" />
              </NavLink>
            )}
          </div>
          <div className="new-partners-grid">
            {partners
              .slice(0, full ? partners.length : 14)
              .map((partner, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center flex-column gap-2 mb-3 mb-lg-0"
                  style={{ width: "103px" }}
                >
                  <div className="partner-logo-container">
                    <img
                      src={require(`./assets/partners/${partner.icon}`)}
                      alt=""
                      style={{
                        width: "60px",
                        height: "60px",
                        scale: partner.icon === "hamsterChain.png" ? "1.8" : "",
                      }}
                    />
                  </div>
                  <h6 className="mb-0 small-partners-title">{partner.name}</h6>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WodPartners;
