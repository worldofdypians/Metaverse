import React from "react";
import "./_campaigns.scss";
import calendar from "../assets/calendar.svg";
import calendarYellow from "../assets/calendarYellow.svg";
import dummyCampaignBanner from "../assets/dummyCampaignBanner.webp";
import dummyCampaignItem from "../assets/dummyCampaignItem.webp";
import GameEvents from "../../Game/GameEvents";

const Campaigns = () => {

  const dummyArr = [1,2,3,4,5,6,7,8,9];


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

  ]


  return (
    <div className="container-fluid d-flex flex-column w-100 mt-5 align-items-center justify-content-center px-0">
      <div className="custom-container px-2 px-lg-0 my-5 py-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <img
              src={dummyCampaignBanner}
              alt="Campaign Banner"
              className="campaign-banner w-100"
            />
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="campaign-banner-title mb-0">
                  Dypians Global Challenge
                </h6>
                <div
                  className={`position-relative py-1 events-page-status-tag-live px-2 d-flex align-items-center justify-content-center gap-0`}
                  style={{ top: 0 }}
                >
                  <div
                    className="pulsatingDot"
                    style={{
                      width: 7,
                      height: 7,
                      marginRight: 5,
                    }}
                  ></div>

                  <span>Live</span>
                </div>
              </div>
              <hr className="campaign-banner-divider" />
              <div className="d-flex align-items-center gap-2">
                <img src={calendarYellow} alt="" />
                <span className="campaign-banner-date">
                  July 24, 2024 - August 14, 2024
                </span>
              </div>
                <p className="campaign-banner-desc mb-0">
                  Join the Dypians Global Challenge and immerse yourself in a
                  series of exciting tasks inspired by the Summer Olympics and
                  show your dedication and skill by completing the following:
                </p>
                <ul>
                  <li className="campaign-banner-desc">
                  Login or Create a Game Account
                  </li>
                  <li className="campaign-banner-desc">
                  Mint Beta Pass NFT on opBNB
                  </li>
                  <li className="campaign-banner-desc">
                  Open at Least 10 Daily Bonus Chests
                  </li>
                </ul>
                <button className="stake-wod-btn px-4 py-2 mt-4" style={{width: "fit-content"}}>Explore</button>
            </div>
          </div>
        </div>
        <div className="campaign-items-grid mt-5">
        {dummyItems.map((item, index) => (
          <div className="campaign-item d-flex flex-column gap-2" key={index} >
            <img src={dummyCampaignItem} alt="campaign image" className="w-100" style={{opacity: item.status === "Expired" ? "0.5" : "1"}} />
            <div className="d-flex align-items-center gap-2">
              <h6 className="campaign-item-title mb-0">{item.title}</h6>
              <div
                  className={`position-relative py-1 ${item.status === "Live" ? "events-page-status-tag-live" : item.status === "Coming Soon" ? "events-page-status-tag-upcoming" : "events-page-status-tag-expired"} px-2 d-flex align-items-center justify-content-center gap-0`}
                  style={{ top: 0 }}
                >
                 {item.status === "Live" && 
                  <div
                  className="pulsatingDot"
                  style={{
                    width: 7,
                    height: 7,
                    marginRight: 5,
                  }}
                ></div>
                 }

                  <span>{item.status}</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="campaign-item-date">{item.date}</span>
            </div>
            <hr className="campaign-banner-divider" />

          </div>
        ))}
        </div>

      </div>
      <div className="w-100">
      <GameEvents />
      </div>
    </div>
  );
};

export default Campaigns;
