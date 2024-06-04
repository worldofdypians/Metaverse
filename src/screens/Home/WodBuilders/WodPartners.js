import React from 'react'
import "./_wodbuilders.scss";


const WodPartners = () => {

    const builders = [
        {
          name: "BNB Chain",
          icon: "bnbIcon",
          banner: "bnbChainBanner.png",
          link: "https://twitter.com/BNBCHAIN/status/1705265706747548051?t=7iSDimripaRiwq6A_Z6ViQ&s=19",
        },
        {
          name: "CORE",
          icon: "core",
          banner: "coreBanner.png",
          link: "https://x.com/Coredao_Org/status/1790336632823910804",
        },
        {
          name: "MultiversX",
          icon: "multiversx",
          banner: "multiversBanner.png",
          link: "https://x.com/MultiversX/status/1790422563849466280",
        },
        {
          name: "CoinMarketCap",
          icon: "cmcIcon",
          banner: "coinmarketcapBanner.png",
          link: "https://twitter.com/CoinMarketCap/status/1736697110073119098",
        },
        {
          name: "CoinGecko",
          icon: "coingeckoIcon",
          banner: "coingeckoBanner.png",
          link: "https://twitter.com/coingecko/status/1702286607846682909",
        },
        {
          name: "Viction",
          icon: "viction",
          banner: "victionBanner.png",
          link: "https://x.com/VictionEco/status/1789987120083562640",
        },
        {
          name: "SKALE",
          icon: "skaleIcon",
          banner: "skaleBanner.webp",
          link: "https://twitter.com/SkaleNetwork/status/1777372050832658644",
        },
        {
          name: "Conflux",
          icon: "confluxIcon",
          banner: "confluxBanner.png",
          link: "https://twitter.com/Conflux_Network/status/1677017988497563660",
        },
        {
          name: "BabyDoge",
          icon: "babydogeIcon",
          banner: "babyDogeBanner.webp",
          link: "https://twitter.com/BabyDogeCoin/status/1777714397667893544",
        },
        {
          name: "Avalanche",
          icon: "avaxIcon",
          banner: "avalancheBanner.png",
          link: "https://twitter.com/ArtOnAvax/status/1666852593480658944",
        },
        {
          name: "Chainlink",
          icon: "chainlinkIcon",
          banner: "chainlinkBanner.png",
          link: "https://twitter.com/smartcontract/status/1639280913870893056?s=46&t=nb0doR-1o7k9PQ3EaZE8aw",
        },
    
        {
          name: "Coin98",
          icon: "coin98Icon",
          banner: "coin98Banner.png",
          link: "https://twitter.com/coin98_wallet/status/1628742662047272961",
        },
        {
          name: "Gate.io",
          icon: "gateIcon",
          banner: "gateBanner.png",
          link: "https://twitter.com/gate_io/status/1628384476496527361?s=20",
        },
        {
          name: "MEXC Global",
          icon: "mexcIcon",
          banner: "mexcBanner.png",
          link: "https://twitter.com/MEXC_Official/status/1651888989098455043",
        },
        {
          name: "Easy2Stake",
          icon: "easy2stakeIcon",
          banner: "easy2stakeBanner.png",
          link: "https://twitter.com/Easy2Stake/status/1654120741221326850",
        },
        {
          name: "KuCoin",
          icon: "kucoinIcon",
          banner: "kucoinBanner.png",
        },
    
        {
          name: "SEI",
          icon: "seiLogo",
          banner: "seiBanner.webp",
          link: "https://x.com/worldofdypians/status/1795177907821617607",
        },
        {
          name: "Midle",
          icon: "midle",
          banner: "kucoinBanner.png",
        },
        {
          name: "Playground",
          icon: "playground",
          banner: "kucoinBanner.png",
        },
        {
          name: "Cookie3",
          icon: "cookie3",
          banner: "kucoinBanner.png",
        },
      ];
    

  return (
<div className="w-100 px-3 px-lg-5 mx-0 build-business-wrapper py-4">
        <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-between">
            <h6 className="builder-title mb-0" style={{ fontWeight: "800" }}>
            Building In World of Dypians
          </h6>
            </div>
          <div className="row mx-0 w-100 gap-4 gap-lg-0 d-flex flex-column flex-lg-row flex-md-column align-items-center justify-content-between">
            <div className="builder-item p-3 col-lg-7 d-flex flex-column gap-3 gap-lg-0 justify-content-between">
              <div className="builders-first-half"></div>
              <div className="builders-second-half">
                {builders.map((item, index) => (
                  <div key={index} className="d-flex align-items-center gap-2">
                    <img src={require(`./assets/${item.icon}.svg`)} alt="" />

                    <span
                      className="builder-title mb-0"
                      style={{ fontWeight: "400" }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row gap-2 col-lg-5">
              <div className="build-business-title-wrapper">
                <h6 className="mb-0 font-organetto">
                  Bring your business to World of Dypians
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <a
                  href="https://docs.google.com/forms/d/1s565QWMoCvkKwAWzkXzVPdixN_fLFlnEstya_k7caqs/viewform?edit_requested=true"
                  target="_blank"
                  className="linear-border"
                >
                  <button className="btn filled-btn px-5">Apply</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WodPartners