import React, { useEffect, useState } from "react";
import "./_campaigns.scss";
import { NavLink } from "react-router-dom";
import NewChallenges from "../../Game/NewChallenges";
import TradingComp from "./TradingComp/TradingComp";

const Campaigns = ({ coinbase }) => {
  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  let today = new Date();
  let wod_campaign_end_timestamp = 1749477533000;
  let wod_bitget_campaign_end_timestamp = 1752148728000;
  // let okx_campaign_end_timestamp = 17528292000;

  const dummyBanner = [
    {
      title: "$150,000 Rewards with OKX Wallet",
      status: "Live",
      start_date: "Jun 18, 2025",
      end_date: "Jul 18, 2025",
      image: "https://cdn.worldofdypians.com/wod/wod-x-wallet2.webp",
      desc: `To celebrate our campaign with OKX Wallet, we're giving away $150,000 in WOD to the first 15,000 users who complete all steps:<br/>
    <ul><li>Follow World of Dypians on X</li>
    <li>Swap at least $25 in WOD using OKX Wallet</li>
    <li>Login or create a game account and link your wallet </li>
    </ul>
   `,
      link: "https://web3.okx.com/ul/qa6RR4",
      target: "_blank",
    },
    {
      title: "World of Dypians Rising Heat Challenge",
      status: today.getTime() > wod_campaign_end_timestamp ? "Expired" : "Live",
      start_date: "May 26, 2025",
      end_date: "Jun 09, 2025",
      image: "https://cdn.worldofdypians.com/wod/wod-x-bnb-2.webp",
      desc: `The World of Dypians: Rising Heat challenge is kicking off with $35,000 in rewards up for grabs. As temperatures climb, so does the competition. Take on exciting tasks, show your dedication, and unlock exclusive prizes as you gear up for a blazing summer ahead.<br/>
    <ul><li>Trade a minimum of $20 in WOD</li>
    <li>Login or Create a Game Account</li>
    <li>Open at Least 10 Daily Bonus Chests </li>  
     
    </ul>
    This campaign is your chance to get ahead of the heat, earn massive rewards, and connect with a growing community of players. Are you ready to rise with the season?
   `,
      link: "https://dappbay.bnbchain.org/campaign/389",
      target: "_blank",
    },
    {
      title: "First 5,000 new users share $50,000",
      status:
        today.getTime() > wod_bitget_campaign_end_timestamp
          ? "Expired"
          : "Live",
      start_date: "Jun 10, 2025",
      end_date: "Jul 10, 2025",
      image: "https://cdn.worldofdypians.com/wod/wodBitgetBanner.webp",
      desc: `To celebrate the WOD on-chain listing on Bitget, we have launched an exclusive campaign for new users! <br/>
      <ul><li>Register a new account on Bitget and complete verification.</li>
      <li>Trade at least $5 worth of WOD on Bitget Onchain.</li>
      <li>Submit your UID so we can verify your participation.</li>
      </ul>
     The first 5,000 users to complete all tasks will each receive $10 guaranteed!
     `,
      link: "/wod-bitget",
    },
    {
      title: "World of Dypians x Binance Wallet Campaign!",
      status: "Expired",
      start_date: "Apr 24, 2025",
      end_date: "Apr 27, 2025",
      image: "https://cdn.worldofdypians.com/wod/binance-campagin-v2.webp",
      desc: `Our second $50,000 $WOD Airdrop Campaign with Binance Wallet is officially live! <br/>
    <ul><li>Follow Binance on X</li>
    <li> Follow World of Dypians on X</li>
    <li> Like and Retweet the Pinned Post</li>  
    <li> Swap a minimum of $20 in WOD on BNB Chain</li>  
    </ul>
    
   `,
      link: "https://www.binance.com/en/web3-campaign/airdrop/4484095621998736896",
      target: "_blank",
    },
   
  ];

  const dummyData = [
     {
      title: "The Gathering Storm",
      status: "Expired",
      start_date: "Apr 21, 2025",
      end_date: "Jul 14, 2025",
      image: "https://cdn.worldofdypians.com/wod/tradingCompBanner.webp",
      desc: `Welcome to the Gathering Storm $WOD Trading Competition, a 12-week battle where only the best rise.<br/>
    <ul><li>$300,000 in total rewards</li>
    <li>Weekly prizes for the Top 30 traders</li>
    <li>Airdrops for eligible volume warriors </li>  
    <li>Every trade counts. Every week matters.</li>  
    </ul>
    Join the storm. Conquer the charts. Earn your WOD.
   `,
      link: "/trading-competition",
    },
       {
      title: "First 5,000 new users share $50,000",
      status:
        today.getTime() > wod_bitget_campaign_end_timestamp
          ? "Expired"
          : "Live",
      start_date: "Jun 10, 2025",
      end_date: "Jul 10, 2025",
      image: "https://cdn.worldofdypians.com/wod/wodBitgetBanner.webp",
      desc: `To celebrate the WOD on-chain listing on Bitget, we have launched an exclusive campaign for new users! <br/>
      <ul><li>Register a new account on Bitget and complete verification.</li>
      <li>Trade at least $5 worth of WOD on Bitget Onchain.</li>
      <li>Submit your UID so we can verify your participation.</li>
      </ul>
     The first 5,000 users to complete all tasks will each receive $10 guaranteed!
     `,
      link: "/wod-bitget",
    },
    {
      title: "World of Dypians Rising Heat Challenge",
      status: today.getTime() > wod_campaign_end_timestamp ? "Expired" : "Live",
      start_date: "May 26, 2025",
      end_date: "Jun 09, 2025",
      image: "https://cdn.worldofdypians.com/wod/wod-x-bnb-2.webp",

      link: "https://dappbay.bnbchain.org/campaign/389",
      target: "_blank",
    },
    {
      title: "World of Dypians x Binance Wallet Campaign!",
      status: "Expired",
      start_date: "Apr 24, 2025",
      end_date: "Apr 27, 2025",
      image: "https://cdn.worldofdypians.com/wod/binance-campagin-v2.webp",

      link: "https://www.binance.com/en/web3-campaign/airdrop/4484095621998736896",
      target: "_blank",
    },
    {
      title: "The Grand Battle Challenge",
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

  // const dummyBanner = {
  //   title: "The Grand Battle Challenge",
  //   status: "Expired",
  //   start_date: "Mar 17, 2025",
  //   end_date: "Mar 31, 2025",
  //   image: "https://cdn.worldofdypians.com/wod/grand_battle_challenge.webp",
  //   desc: `Prepare for an unforgettable showdown! The Grand Battle Challenge is here, bringing players together to compete, strategize, and claim victory to share $30,000 Rewards<br/>
  //   <ul><li>Login or Create a Game Account</li>
  //   <li>Stake min 100 WOD tokens </li>
  //   <li>Open at least 10 Daily Bonus Chests </li>  </ul>
  //  `,
  //   link: "https://dappbay.bnbchain.org/campaign/377-join-world-of-dypians-grand-battle-challenge-to-share-30-000-rewards",
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Campaigns";
  }, []);

  return (
    <div className="container-fluid d-flex flex-column w-100 mt-5 align-items-center justify-content-center px-2 px-lg-0">
      <div className="custom-container  my-5 py-0 py-lg-5">
        {dummyBanner
          .filter((item) => {
            return item.status === "Live";
          })
          .map((item, index) => {
            return (
              <div className="row mb-5 pb-5" key={index}>
                <div className="col-12 col-lg-6">
                  <img
                    src={item.image}
                    alt="Campaign Banner"
                    className="campaign-banner w-100 h-100"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="d-flex align-items-center justify-content-between mt-3 mt-lg-0">
                      <h6 className="campaign-banner-title mb-0">
                        {item.title}
                      </h6>
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
                    <hr className="campaign-banner-divider" />
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/calendarYellow.svg"
                        }
                        alt=""
                      />
                      <span className="campaign-banner-date">
                        {item.start_date} - {item.end_date}
                      </span>
                    </div>
                    <p
                      className="campaign-banner-desc mb-0"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    ></p>

                    <div className="d-flex w-100 justify-content-center justify-content-lg-start">
                      <NavLink
                        to={item.link}
                        target={item.target}
                        className="explore-btn px-4 py-2 mt-4"
                        style={{ width: "fit-content" }}
                      >
                        Explore
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* <TradingComp
        coinbase={coinbase}
        /> */}
        <div className="campaign-items-grid mt-5">
          {dummyData
            .filter((item) => {
              return item.status === "Expired";
            })
            .map((item, index) => (
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
