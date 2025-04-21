import React, { useEffect, useState } from "react";
import "./_campaigns.scss";
import { NavLink } from "react-router-dom";
import NewChallenges from "../../Game/NewChallenges";
import TradingComp from "./TradingComp/TradingComp";
import tradingCompBanner from './TradingComp/assets/tradingCompBanner.png'

const Campaigns = ({coinbase}) => {
  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);


  const dummyBanner = {
    title: "The Gathering Storm",
    status: "Live",
    start_date: "Apr 21, 2025",
    end_date: "Jul 14, 2025",
    image: tradingCompBanner,
    desc: `Prepare for an unforgettable showdown! The Grand Battle Challenge is here, bringing players together to compete, strategize, and claim victory to share $30,000 Rewards<br/>
    <ul><li>Login or Create a Game Account</li>
    <li>Stake min 100 WOD tokens </li>
    <li>Open at least 10 Daily Bonus Chests </li>  </ul>
   `,
    link: "/trading-competition",
  };

  const dummyData = [
    {
      title: "$The Grand Battle Challenge",
      status: "Expired",
      start_date: "Mar 17, 2025",
      end_date: "Mar 31, 2025",
      image: "https://cdn.worldofdypians.com/wod/grand_battle_challenge.webp",
      link: "https://dappbay.bnbchain.org/campaign/377-join-world-of-dypians-grand-battle-challenge-to-share-30-000-rewards",
    },
    {
      title: "$25,000 WOD Trading Competition",
      status: "Expired",
      start_date: "Mar 13, 2025",
      end_date: "Mar 20, 2025",
      image: "https://cdn.worldofdypians.com/wod/trading-competition.webp",
      link: "https://pancakeswap.finance/?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8",
    },
    {
      title: "World of Dypians x Binance Wallet",
      status: "Expired",
      start_date: "Jan 23, 2025",
      end_date: "Feb 06, 2025",
      image: "https://cdn.worldofdypians.com/wod/wodxbinanceBanner.webp",
      link: "https://www.binance.com/en/web3-campaign/airdrop/4343337326001918209",
    },
    {
      title: "BNB Chain Red Envelope Carnival!",
      status: "Expired",
      start_date: "January 27, 2025",
      end_date: "February 3, 2025",
      image: "https://cdn.worldofdypians.com/wod/wodredEnvelope.jpg",
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-red-envelope-carnival",
    },
    {
      title: "KuCoin WOD GemSlot Campaign",
      status: "Expired",
      start_date: "January 08, 2025",
      end_date: "January 22, 2025",
      image: "https://cdn.worldofdypians.com/wod/kucoin-gemslot-campaign.png",
      link: "https://www.kucoin.com/gemslot/detail/code/world-of-dypians-2",
    },
    {
      title: "PancakeSwap Trading Competition",
      status: "Expired",
      start_date: "January 02, 2025",
      end_date: "January 21, 2025",
      image:
        "https://cdn.worldofdypians.com/wod/pancakeswap-trading-competition.png",
      link: "https://pancakeswap.finance/?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8",
    },
    {
      title: "Winter Wonderland Challenge",
      status: "Expired",
      start_date: "December 09, 2024",
      end_date: "December 23, 2024",
      image: "https://cdn.worldofdypians.com/wod/winterChallenge2.webp",
      link: "https://dappbay.bnbchain.org/campaign/352-winter-wonderland-challenge-to-share-a-50-000-prize-pool",
    },
    {
      title: "Trust Wallet WOD Swap Competition",
      status: "Expired",
      start_date: "December 06, 2024",
      end_date: "December 13, 2024",
      image:
        "https://cdn.worldofdypians.com/wod/trust-wallet-swap-campaign.jpg",
      link: "https://short.trustwallet.com/Swap-WOD",
    },
    {
      title: "WOD on Trust Wallet Launchpool",
      status: "Expired",
      start_date: "November 27, 2024",
      end_date: "December 04, 2024",
      image: "https://cdn.worldofdypians.com/wod/trust-launchpool.jpg",
      link: "https://short.trustwallet.com/launchpool3-blog",
    },
    {
      title: "Festive 4YA Celebration",
      status: "Expired",
      start_date: "August 26, 2024",
      end_date: "September 08, 2024",
      image: "https://cdn.worldofdypians.com/wod/wodfestive.webp",
      link: "https://dappbay.bnbchain.org/campaign/join-bnb-chain-4-year-ecosystem-celebration-with-$300K-in-rewards/2-festive-4ya-celebration",
    },
    {
      title: "Dypians Global Challenge",
      status: "Expired",
      start_date: "July 24, 2024",
      end_date: "August 14, 2024",
      image: "https://cdn.worldofdypians.com/wod/opbnbCampaign.png",
      link: "https://dappbay.bnbchain.org/campaign/train-like-a-champion-with-bnb-chain-and-share-$250K/11",
    },
    {
      title: "BNB Chain Game Expedition",
      status: "Expired",
      start_date: "June 12, 2024",
      end_date: "June 28, 2024",
      image: "https://cdn.worldofdypians.com/wod/bnbExpedition.webp",
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/105-bnb-chain-game-expedition",
    },
    {
      title: "Entry Campaign",
      status: "Expired",
      start_date: "May 1, 2024",
      end_date: "May 15, 2024",
      image: "https://cdn.worldofdypians.com/wod/entryCampaign.webp",
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/102-world-of-dypians-entry-campaign",
    },
    {
      title: "Daily Game Delight",
      status: "Expired",
      start_date: "May 15, 2024",
      end_date: "May 29, 2024",
      image: "https://cdn.worldofdypians.com/wod/dailyGameDelight.webp",
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/103-daily-game-delight",
    },
    {
      title: "Dypians Discovery Quest",
      status: "Expired",
      start_date: "May 29, 2024",
      end_date: "June 12, 2024",
      image: "https://cdn.worldofdypians.com/wod/dypiansDiscovery.webp",
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/104-dypians-discovery-quest",
    },
  ];



  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Campaigns";
  }, []);

  return (
    <div className="container-fluid d-flex flex-column w-100 mt-5 align-items-center justify-content-center px-2 px-lg-0">
      <div className="custom-container  my-5 py-0 py-lg-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <img
              src={dummyBanner.image}
              alt="Campaign Banner"
              className="campaign-banner w-100"
            />
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between mt-3 mt-lg-0">
                <h6 className="campaign-banner-title mb-0">
                  {dummyBanner.title}
                </h6>
                <div
                  className={`position-relative py-1 ${
                    dummyBanner.status === "Live"
                      ? "events-page-status-tag-live"
                      : dummyBanner.status === "Coming Soon"
                      ? "events-page-status-tag-upcoming"
                      : "events-page-status-tag-expired"
                  } px-2 d-flex align-items-center justify-content-center gap-0`}
                  style={{ top: 0 }}
                >
                  {dummyBanner.status === "Live" && (
                    <div
                      className="pulsatingDot"
                      style={{
                        width: 7,
                        height: 7,
                        marginRight: 5,
                      }}
                    ></div>
                  )}

                  <span>{dummyBanner.status}</span>
                </div>
              </div>
              <hr className="campaign-banner-divider" />
              <div className="d-flex align-items-center gap-2">
                <img
                  src={"https://cdn.worldofdypians.com/wod/calendarYellow.svg"}
                  alt=""
                />
                <span className="campaign-banner-date">
                  {dummyBanner.start_date} - {dummyBanner.end_date}
                </span>
              </div>
              <p
                className="campaign-banner-desc mb-0"
                dangerouslySetInnerHTML={{ __html: dummyBanner.desc }}
              ></p>

              <div className="d-flex w-100 justify-content-center justify-content-lg-start">
                <NavLink
                  to={dummyBanner.link}
                  target="_blank"
                  className="explore-btn px-4 py-2 mt-4"
                  style={{ width: "fit-content" }}
                >
                  Explore
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {/* <TradingComp
        coinbase={coinbase}
        /> */}
        <div className="campaign-items-grid mt-5">
          {dummyData.map((item, index) => (
            <a href={item.link} rel="noreferrer" target="_blank">
              <div
                className="campaign-item d-flex flex-column gap-2"
                key={index}
              >
                <img
                  src={item.image}
                  alt="campaign image"
                  className="w-100 campaign-item-image"
                  style={{ opacity: item.status === "Expired" ? "0.5" : "1" }}
                />
                <div className="d-flex align-items-center gap-2">
                  <h6 className="campaign-item-title mb-0">{item.title}</h6>
                  <div
                    className={`position-relative py-1 ${
                      item.status === "Live"
                        ? "events-page-status-tag-live"
                        : item.status === "Coming Soon"
                        ? "events-page-status-tag-upcoming"
                        : "events-page-status-tag-expired"
                    } px-2 d-flex align-items-center justify-content-center gap-0`}
                    style={{ top: 0 }}
                  >
                    {item.status === "Live" && (
                      <div
                        className="pulsatingDot"
                        style={{
                          width: 7,
                          height: 7,
                          marginRight: 5,
                        }}
                      ></div>
                    )}

                    <span>{item.status}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/calendar.svg"}
                    alt=""
                    style={{ width: 24, height: 24 }}
                  />
                  <span className="campaign-item-date">
                    {item.start_date} - {item.end_date}
                  </span>
                </div>
                <hr className="campaign-banner-divider" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="w-100">
        {/* <GameEvents /> */}
        <NewChallenges
          screen={"campaigns"}
          popupEvent={popupEvent}
          setPopupEvent={setPopupEvent}
          popupActive={popupActive}
          setPopupActive={setPopupActive}
        />
      </div>
    </div>
  );
};

export default Campaigns;
