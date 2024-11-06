import React, { useEffect, useState } from "react";
import "./_gameupdates.scss";
import AnnouncementSideCard from "../../../components/NewsCard/AnnouncementSideCards";
import { NavLink } from "react-router-dom";
import axios from "axios";

const GameUpdates = () => {
  const [announcementsNews, setAnnouncementsNews] = useState([]);

  const fetchNews = async () => {
    // setLoadingMain(true);
    const announcements = await axios
      .get("https://api3.dyp.finance/api/wod_announcements?page=1")
      .then((res) => {
        return res.data;
      });

    const announcementsDatedNews = announcements.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    const sortedAnnouncementsNews = announcementsDatedNews.sort(function (
      a,
      b
    ) {
      return b.date - a.date;
    });
    setAnnouncementsNews(sortedAnnouncementsNews);
    // setLoadingMain(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="px-3 px-lg-5 d-flex justify-content-center mb-4" id="explorer">
      <div className="custom-container">
      <div className="w-100">
      <h2 className="font-montserrat builders-title explorer-grid-title px-0 my-4">
           Game Updates{" "}
          </h2>
      </div>{" "}
      <div className="announcement-side-wrapper-2 col-12">
        {announcementsNews &&
          announcementsNews.length > 0 &&
          announcementsNews.slice(0, 4).map((item, index) => {
            return (
              <NavLink
                to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
             
                <div className="game-update-card position-relative">
                  <img src={item.image} className="w-100 h-100" style={{objectFit: "cover"}} alt="" />
                  <div className="d-flex align-items-center justify-content-between p-3 w-100 bottom-dark-wrapper updates-text-wrapper">
                    <div className="d-flex flex-column">
                      <h6 className="events-page-title-home mb-0">
                        {item.title.slice(0, 40) + "..."}
                      </h6>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}{" "}
      </div>
      </div>
    </div>
  );
};

export default GameUpdates;
