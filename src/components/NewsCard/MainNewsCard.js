import React, { useState } from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import "./mainNews.scss";

const MainNewsCard = ({ newsImage, title, date, onShowModalClick, newsId }) => {
  const [bannerShadow, setBannerShadow] = useState(false);
  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div
      className={`col-7 main-news-wrapper`}
      onClick={(e) => {
        e.preventDefault();
        onShowModalClick();
      }}
    >
      <div className="main-news-inner">
        <div
          className="position-relative"
          onMouseEnter={() => setBannerShadow(true)}
          onMouseLeave={() => setBannerShadow(false)}
        >
          <div
            className={`position-absolute featured-shadow w-100 ${
              bannerShadow && "featured-shadow-hover"
            }`}
          ></div>
          <img
            src={newsImage}
            alt="Image not found"
            className={`mainNews-image`}
          />
        </div>
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <h2 className="mainNews-title update-title font-organetto m-0">
            {`${title?.slice(0, 22)}...`}
          </h2>
          <span className="mainNews-date">
            <img src={calendarIcon} alt="calendar" />{" "}
            {date.toLocaleDateString("en-US", options)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainNewsCard;
