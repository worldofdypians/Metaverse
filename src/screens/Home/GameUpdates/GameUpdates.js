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
    <div className="px-3 px-lg-5" id="explorer">
      <div className="w-100">
        <h2 className="font-organetto explorer-grid-title px-0 w-50">
          Game Updates
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
              >
                <AnnouncementSideCard
                  key={index}
                  title={item.title}
                  bgImage={item.image_second}
                  imageSquare={item.image}
                  date={item.date}
                  // content={item.content}
                  newsId={item.id}
                  
                />
              </NavLink>
            );
          })}{" "}
      </div>
    </div>
  );
};

export default GameUpdates;
