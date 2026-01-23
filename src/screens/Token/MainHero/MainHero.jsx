import React from "react";
import "./_mainhero.scss";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
const MainHero = ({ scrollInto }) => {
  const exchanges = [
    {
      title: "Binance Alpha",
      logo: "binance-alpha-exchange.png",
      link: "https://www.binance.com/en/alpha/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
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
      title: "Bitget",
      logo: "bitgetExchange.png",
      link: "https://www.bitget.com/on-chain/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "Bitpanda",
      logo: "bitPandaExchange.png",
      link: "https://www.bitpanda.com/en/prices/world-of-dypians-wod",
    },
    {
      title: "Binance Wallet",
      logo: "binance-wallet-exchange.svg",
      link: "https://www.binance.com/en/alpha/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "OKX Wallet",
      logo: "okxExchange.svg",
      link: "https://web3.okx.com/token/bsc/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "PancakeSwap",
      logo: "pancakeswap.svg",
      link: "https://pancakeswap.finance/info/v3/pairs/0xb89a15524ca1cc8810e12880af927b319273d1dc",
    },
    // {
    //   title: "THENA",
    //   logo: "thena.svg",
    //   link: "https://thena.fi/swap?inputCurrency=BNB&outputCurrency=0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8&swapType=1",
    // },
    {
      title: "TrustWallet",
      logo: "trustwallet.svg",
      link: "https://short.trustwallet.com/app-download",
    },
    {
      title: "BingX",
      logo: "bingx-exchange.svg",
      link: "https://bingx.com/en/spot/WODUSDT",
    },
    {
      title: "Uphold",
      logo: "upholdFull.svg",
      link: "https://uphold.com/en-us/prices/crypto/wod",
    },

    {
      title: "Toobit",
      logo: "toobit-exchange.svg",
      link: "https://www.toobit.com/en-US/spot/WOD_USDT",
    },

    {
      title: "KCEX",
      logo: "kcex-exchange.png",
      link: "https://www.kcex.com/exchange/WOD_USDT",
    },
    {
      title: "HiBt",
      logo: "hibt-exchange-white.png",
      link: "https://hibt.com/trade/WOD-USDT",
    },
    {
      title: "Phemex",
      logo: "phemex-exchange.png",
      link: "https://phemex.com/trade/WOD-USDT",
    },

    {
      title: "ChangeNOW",
      logo: "changeNowExchange.svg",
      link: "https://changenow.io/currencies/world-of-dypians",
    },
    {
      title: "BloFin",
      logo: "blofinExchange.png",
      link: "https://blofin.com/spot/WOD-USDT",
    },
    {
      title: "CoinDCX",
      link: "https://coindcx.com/trade/WODUSDT",
      logo: "CoinDCXExchange2.svg",
    },
    {
      title: "WEEX",
      logo: "weex-exchange.svg",
      link: "https://www.weex.com/spot/WOD-USDT",
    },

    {
      title: "Uniswap",
      logo: "uniswap-exchange.png",
      link: "https://app.uniswap.org/explore/tokens/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "BVOX",
      logo: "bvox-exchange.png",
      link: "https://www.bvox.com/exchange/WOD/USDT",
    },
    {
      title: "Bitkan",
      logo: "bitkan-exchange.png",
      link: "https://bitkan.com/trade/WOD-USDT",
    },
    {
      title: "Tothemoon",
      logo: "tothemoon-exchange.png",
      link: "https://tothemoon.com/trading/WOD_USDT",
    },
    {
      title: "OpenOcean",
      logo: "openocean-exchange.png",
      link: "https://app.openocean.finance/swap/bsc/BNB/WOD_0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8",
    },
    {
      title: "Bitexen",
      logo: "bitexen-exchange.png",
      link: "https://global.bitexen.com/instant/trade/USDT_WOD",
    },
    {
      title: "Biconomy",
      logo: "biconomy-exchange.png",
      link: "https://www.biconomy.com/exchange/WOD_USDT",
    },
    {
      title: "SwissBorg",
      logo: "swissborg-exchange.svg",
      link: "https://swissborg.com/crypto-market/coins/world-of-dypians",
    },
    {
      title: "LetsExchange",
      logo: "letsExchange.svg",
      link: "https://letsexchange.io/?coin_from=usdt-bep20&coin_to=wod-bep20&sent_amount=120",
    },
  ];

  return (
    <div className="px-3 mainhero-wrapper2 px-lg-5 d-flex flex-column justify-content-center align-items-center">
      <div className="custom-container w-100  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-end justify-content-between gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0 m-0 my-5">
              <div className="relative d-flex flex-column gap-2 align-items-center align-items-lg-start">
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
                <div
                  className="relative d-none d-lg-flex d-md-flex items-center justify-center z-5 mt-2"
                  style={{ height: "fit-content" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-lg mx-auto"
                  >
                    {/* Compact Announcement Card */}
                    <motion.div
                      className="rounded-xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #5690FF 0%, #8C56FF 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                      initial={{ rotateX: 20 }}
                      animate={{ rotateX: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Shimmer sweep effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)",
                        }}
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 2,
                        }}
                      />

                      {/* Subtle particle overlay */}
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
                          backgroundSize: "25px 25px",
                        }}
                      />

                      {/* Animated gradient orbs */}
                      <motion.div
                        className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-30"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
                        }}
                        animate={{
                          x: [0, 100, 0],
                          y: [0, 80, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-25"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                        }}
                        animate={{
                          x: [0, -80, 0],
                          y: [0, -60, 0],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Title */}
                      <motion.h3
                        className="text-lg line-height-normal md:text-lg font-bold text-white mb-3 relative z-10 drop-shadow-lg"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        Liquidity Catalyst Campaign
                      </motion.h3>

                      {/* Rewards Container */}
                      <motion.div
                        className="inline-block mb-3 relative z-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        <motion.div
                          className="px-3 py-2 rounded-full relative overflow-hidden"
                          style={{
                            background: "rgba(255, 255, 255, 0.25)",
                            border: "2px solid rgba(255, 255, 255, 0.5)",
                            backdropFilter: "blur(10px)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(255, 255, 255, 0.3)",
                              "0 0 30px rgba(255, 255, 255, 0.5)",
                              "0 0 20px rgba(255, 255, 255, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <motion.h5 className="line-height-normal text-lg md:text-lg font-bold text-white drop-shadow-lg mb-0">
                            $250,000 Rewards
                          </motion.h5>
                        </motion.div>
                      </motion.div>

                      {/* Single Action Button */}
                      <motion.div
                        className="flex justify-center relative z-10"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <NavLink
                            to="/liquidity-catalyst"
                            className="font-bold px-3 py-2 rounded-md shadow-xl flex items-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 hover:bg-gray-100"
                          >
                            <span>Join Now</span>
                            {/* <ExternalLink className="w-4 h-4" /> */}
                          </NavLink>
                        </motion.div>
                      </motion.div>

                      {/* Corner decorations */}
                      <motion.div
                        className="absolute top-3 right-3 w-8 h-8 rounded-full z-10 border-2 border-white/40"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-3 left-3 w-6 h-6 rounded-full z-10 border-2 border-white/30"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 bg-white/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Edge glow */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                        }}
                        animate={{
                          boxShadow: [
                            "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                            "inset 0 0 30px rgba(255, 255, 255, 0.25)",
                            "inset 0 0 20px rgba(255, 255, 255, 0.15)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 pe-0">
              <img
                src={"https://cdn.worldofdypians.com/wod/newToken.svg"}
                className="w-100"
                alt=""
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-3 mb-4">
            <h6 className="mb-0 investors-title">Exchanges</h6>
            <div className="exchanges-grid py-2 py-lg-0">
              {exchanges.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="investors-item px-3 px-lg-0 py-2"
                  rel="noreferrer"
                  key={index}
                >
                  <img
                    src={`https://cdn.worldofdypians.com/wod/${item.logo}`}
                    className={` exchange-grid-image ${
                      (index === 0 ||
                        item.title === "KCEX" ||
                        item.title === "HiBt") &&
                      "h-auto"
                    }`}
                    alt=""
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
