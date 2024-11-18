import React, { useEffect, useState } from "react";
import "./_campaigns.scss";
import calendar from "../assets/calendar.svg";
import calendarYellow from "../assets/calendarYellow.svg";
import dummyCampaignBanner from "../assets/dummyCampaignBanner.webp";
import dummyCampaignItem from "../assets/dummyCampaignItem.webp";
import GameEvents from "../../Game/GameEvents";
import opbnbCampaign from "../../Community/assets/opbnbCampaign.png";
import bnbExpedition from "../../Community/assets/bnbExpedition.webp";
import entryCampaign from "../../Community/assets/entryCampaign.webp";
import dailyGameDelight from "../../Community/assets/dailyGameDelight.webp";
import wodFestive from "../../Community/assets/wodfestive.webp";
import dypiansDiscovery from "../../Community/assets/dypiansDiscovery.webp";
import { NavLink } from "react-router-dom";
import NewChallenges from "../../Game/NewChallenges";

const Campaigns = () => {
  const [popupEvent, setPopupEvent] = useState(null);
  const [popupActive, setPopupActive] = useState(false);

  const dummyData = [
    {
      title: "Dypians Global Challenge",
      status: "Expired",
      start_date: "July 24, 2024",
      end_date: "August 14, 2024",
      image: opbnbCampaign,
      link: "https://dappbay.bnbchain.org/campaign/train-like-a-champion-with-bnb-chain-and-share-$250K/11",
    },
    {
      title: "BNB Chain Game Expedition",
      status: "Expired",
      start_date: "June 12, 2024",
      end_date: "June 28, 2024",
      image: bnbExpedition,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/105-bnb-chain-game-expedition",
    },
    {
      title: "Entry Campaign",
      status: "Expired",
      start_date: "May 1, 2024",
      end_date: "May 15, 2024",
      image: entryCampaign,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/102-world-of-dypians-entry-campaign",
    },
    {
      title: "Daily Game Delight",
      status: "Expired",
      start_date: "May 15, 2024",
      end_date: "May 29, 2024",
      image: dailyGameDelight,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/103-daily-game-delight",
    },
    {
      title: "Dypians Discovery Quest",
      status: "Expired",
      start_date: "May 29, 2024",
      end_date: "June 12, 2024",
      image: dypiansDiscovery,
      link: "https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/104-dypians-discovery-quest",
    },
  ];

  const dummyBanner = {
    title: "Festive 4YA Celebration",
    status: "Expired",
    start_date: "August 26, 2024",
    end_date: "September 08, 2024",
    image: wodFestive,
    desc: `Join the Festive 4YA Celebration campaign and immerse yourself in a series of exciting tasks to celebrate the BNB Chain 4 Year Anniversary. Show your dedication and skill by completing the following:
    <ul class="mt-2">
    <li>Login or Create a Game Account: Get started by logging in or creating a new game account in the World of Dypians.</li>
    <li>Open at Least 10 Daily Bonus Chests: Test your luck and consistency by opening at least 10 Daily Bonus Chests on BNB Chain or opBNB.</li>
    </ul>`,
    link: "https://dappbay.bnbchain.org/campaign/join-bnb-chain-4-year-ecosystem-celebration-with-$300K-in-rewards/2-festive-4ya-celebration",
  };

  const dummyItems = [
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Live",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Coming Soon",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
    {
      title: "Entry Campaign",
      date: "February 27, 2024 - March 26, 2024",
      status: "Expired",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Campaigns";
  }, []);

  return (
    <div className="container-fluid d-flex flex-column w-100 mt-5 align-items-center justify-content-center px-2 px-lg-0">
      <div className="custom-container px-2 my-5 py-0 py-lg-5">
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
                <img src={calendarYellow} alt="" />
                <span className="campaign-banner-date">
                  {dummyBanner.start_date} - {dummyBanner.end_date}
                </span>
              </div>
              <p
                className="campaign-banner-desc mb-0"
                dangerouslySetInnerHTML={{ __html: dummyBanner.desc }}
              ></p>

              <NavLink
                to={dummyBanner.link}
                target="_blank"
                className="stake-wod-btn px-4 py-2 mt-4"
                style={{ width: "fit-content" }}
              >
                Explore
              </NavLink>
            </div>
          </div>
        </div>
        <div className="campaign-items-grid mt-5">
          {dummyData.map((item, index) => (
            <div className="campaign-item d-flex flex-column gap-2" key={index}>
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
                <img src={calendar} alt="" />
                <span className="campaign-item-date">
                  {item.start_date} - {item.end_date}
                </span>
              </div>
              <hr className="campaign-banner-divider" />
            </div>
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
