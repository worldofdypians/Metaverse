import React from "react";
import "./_mainhero.scss";
 
 

const MainHero = ({ scrollInto }) => {


  const exchanges = [
    {
      title: "Kucoin",
      logo: "kucoin.svg",
      link: "https://www.kucoin.com/trade/WOD-USDT",
    },
    {
      title: "Gate.io",
      logo: "gate.svg",
      link: "https://www.gate.io/trade/WOD_USDT",
    },
    {
      title: "MEXC Global",
      logo: "mexc.svg",
      link: "https://www.mexc.com/exchange/WOD_USDT",
    },
    {
      title: "PancakeSwap",
      logo: "pancakeswap.svg",
      link: "https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc",
    },
    {
      title: "TrustWallet",
      logo: "trustwallet.svg",
      link: "https://short.trustwallet.com/app-download",
    },
  ];


  return (
    <div className="px-3 mainhero-wrapper2 px-lg-5 d-flex flex-column justify-content-center align-items-center">
      <div className="custom-container w-100  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
                <h4 className="main-hero-title font-montserrat text-start">
                  WOD Token
                </h4>
                <span className="market-banner-desc font-montserrat">
                  WOD is a utility token issued on BNB Chain, providing the
                  foundation for the World of Dypians ecosystem, integrating
                  DeFi, NFTs, Gaming, and AI all in one place.
                </span>
                <div className="d-flex flex-column flex-lg-row align-items-center  gap-3 mt-2">
                  <button
                    className="getpremium-btn px-3 py-2"
                    onClick={() => {
                      scrollInto("tokenomics");
                    }}
                  >
                    Tokenomics
                  </button>
                  <button
                    className="getpremium-btn px-3 py-2"
                    onClick={() => {
                      scrollInto("backers&partners");
                    }}
                  >
                    Backers & Partners
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0">
              <img src={'https://cdn.worldofdypians.com/wod/newToken.svg'} className="w-100" alt="" />
            </div>
          </div>
          <div className="d-flex flex-column gap-3 mb-4">
            <h6 className="mb-0 investors-title">Exchanges</h6>
            <div className="exchanges-grid">
              {exchanges.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="investors-item py-2"
                  key={index}
                >
                  <img
                    src={(`https://cdn.worldofdypians.com/wod/${item.logo}`)}
                    className="w-auto"
                    alt=""
                    style={{height: item.logo === 'unknown.svg' ? '74px' : ''}}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* <div className="d-flex flex-column gap-3">
            <h6 className="mb-0 investors-title">Launchpads</h6>
            <div className="investors-grid">
              {launchpads.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="investors-item py-2"
                  key={index}
                >
                  <img
                    src={require(`../Investors/assets/${item.logo}`)}
                    className="w-auto"
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
