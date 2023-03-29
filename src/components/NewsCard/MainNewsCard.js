import React, { useState } from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import "./mainNews.scss";

const MainNewsCard = ({
  newsImage,
  title,
  date,
  onShowModalClick,
  newsId,
  content,
}) => {
  const [bannerShadow, setBannerShadow] = useState(false);
  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div
      className={`col-xxl-7 col-lg-7 col-12 main-news-wrapper`}
      onClick={(e) => {
        // e.preventDefault();
        onShowModalClick();
      }}
    >
      <div className="main-news-inner">
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <h2 className="mainNews-title update-title font-organetto m-0 w-100">
            {`${title?.slice(0, 22)}...`}
          </h2>
        </div>
        <div
          className="position-relative overflow-hidden"
          onMouseEnter={() => setBannerShadow(true)}
          onMouseLeave={() => setBannerShadow(false)}
        >
          {" "}
          <div
            className={`position-absolute featured-shadow w-100 ${
              bannerShadow && "featured-shadow-hover"
            }`}
          ></div>
          <img
            src={newsImage}
            alt="Image not found"
            className={`mainNews-image ${
              bannerShadow && "mainNews-image-hover"
            }`}
          />
        </div>
        <span
          className="announcement-side-content font-poppins gap-1 mb-0"
          dangerouslySetInnerHTML={{
            __html: content.slice(0, 430),
          }}
        ></span>
        <span className="mainNews-date" style={{ alignSelf: "flex-end" }}>
          <img src={calendarIcon} alt="calendar" />{" "}
          {date.toLocaleDateString("en-US", options)}
        </span>
      </div>
    </div>
  );
};

export default MainNewsCard;
