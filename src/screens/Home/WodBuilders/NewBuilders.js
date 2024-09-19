import React from 'react'
import "./_wodbuilders.scss";



const NewBuilders = () => {

    const builders = [
       
        {
          name: "MultiversX",
          icon: "multiversx",
          banner: "multiversBanner.png",
          link: "https://x.com/MultiversX/status/1790422563849466280",
          backer: false,
        },
        {
          name: "CoinMarketCap",
          icon: "cmcIcon",
          banner: "coinmarketcapBanner.png",
          link: "https://twitter.com/CoinMarketCap/status/1736697110073119098",
          backer: false,
        },
        {
          name: "CoinGecko",
          icon: "coingeckoIcon",
          banner: "coingeckoBanner.png",
          link: "https://twitter.com/coingecko/status/1702286607846682909",
          backer: false,
        },
        {
          name: "BabyDoge",
          icon: "babydogeIcon",
          banner: "babyDogeBanner.webp",
          link: "https://twitter.com/BabyDogeCoin/status/1777714397667893544",
          backer: false,
        },
        {
          name: "Avalanche",
          icon: "avaxIcon",
          banner: "avalancheBanner.png",
          link: "https://twitter.com/ArtOnAvax/status/1666852593480658944",
          backer: false,
        },
        {
          name: "Chainlink",
          icon: "chainlinkIcon",
          banner: "chainlinkBanner.png",
          link: "https://twitter.com/smartcontract/status/1639280913870893056?s=46&t=nb0doR-1o7k9PQ3EaZE8aw",
          backer: false,
        },
    
        {
          name: "Coin98",
          icon: "coin98Icon",
          banner: "coin98Banner.png",
          link: "https://twitter.com/coin98_wallet/status/1628742662047272961",
          backer: false,
        },
        {
          name: "Gate.io",
          icon: "gateIcon",
          banner: "gateBanner.png",
          link: "https://twitter.com/gate_io/status/1628384476496527361?s=20",
          backer: false,
        },
        {
          name: "MEXC Global",
          icon: "mexcIcon",
          banner: "mexcBanner.png",
          link: "https://twitter.com/MEXC_Official/status/1651888989098455043",
          backer: false,
        },
        {
          name: "Easy2Stake",
          icon: "easy2stakeIcon",
          banner: "easy2stakeBanner.png",
          link: "https://twitter.com/Easy2Stake/status/1654120741221326850",
          backer: false,
        },
    
        {
          name: "KuCoin",
          icon: "kucoinIcon",
          banner: "kucoinBanner.png",
          backer: false,
        },
    
        {
          name: "SEI",
          icon: "seiLogo",
          banner: "seiBanner.webp",
          link: "https://x.com/worldofdypians/status/1795177907821617607",
          backer: false,
        },
        {
          name: "Immutable",
          icon: "immutable",
          banner: "immutableBanner.png",
          link: "https://x.com/Immutable/status/1813966964957884795",
          backer: false,
        },
    
        {
          name: "Midle",
          icon: "midle",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "Playground",
          icon: "playground",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "KlapAI",
          icon: "klapai",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "Magic Store",
          icon: "magic",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "GGPLAY",
          icon: "ggplay",
          banner: "kucoinBanner.png",
          link: "https://x.com/GGPlayOfficial/status/1801263235221647731",
          backer: false,
        },
        {
          name: "KAPGAMES",
          icon: "kapgames",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "Micro3",
          icon: "micro3",
          banner: "kucoinBanner.png",
          backer: false,
        },
    
        {
          name: "Cyborg",
          icon: "cyborg",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "SpaceID",
          icon: "spaceId",
          banner: "kucoinBanner.png",
          backer: false,
        },
        {
          name: "Hamster Chain",
          icon: "hamsterChain",
          banner: "kucoinBanner.png",
          backer: false,
        },
      ];

  return (
    <div className={`w-100  mx-0 `}>
    <div className="d-flex flex-column gap-2">
  
      <div className="row mx-0 w-100 gap-4 gap-lg-0 d-flex flex-column flex-lg-row flex-md-column align-items-center justify-content-between">
        <div className={`builder-item p-3 d-flex flex-column gap-3 gap-lg-0 justify-content-between `}>
          <div className="builders-first-half"></div>
          <div className="new-builders-second-half">
            {builders.map((item, index) => (
              <div key={index} className={`d-flex flex-column align-items-center gap-2`}>
                {item.icon === "klapai" || item.icon === "manta" || item.icon === "hamsterChain" ? (
                  <img
                    src={require(`./assets/${item.icon}.png`)}
                    width={45}
                    height={45}
                    alt=""
                  />
                ) : (
                  <img
                    src={require(`./assets/${item.icon}.svg`)}
                    width={45}
                    height={45}
                    alt=""
                  />
                )}

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
        <div className="d-flex flex-column flex-lg-row gap-2 col-lg-5">
         
        </div>
      </div>
    </div>
  </div>
  )
}

export default NewBuilders