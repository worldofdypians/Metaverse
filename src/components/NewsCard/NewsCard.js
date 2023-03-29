import React, { useEffect, useState } from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";

const NewsCard = ({
  newsId,
  image,
  title,
  content,
  date,
  onNewsClick,
  cardType,
  releaseId,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [dots, setDots] = useState("...");

  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div
      className="news-card-wrapper"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
      onClick={() => {
        onNewsClick(newsId);
      }}
    >
      <div
        className={`singlenews-card ${
          showContent && "news-card-active"
        } p-3 d-flex flex-column gap-3 ${
          cardType === "release" && releaseId === newsId
            ? "news-card-active"
            : null
        }`}
      >
        <div className="d-flex flex-column align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-start w-100">
            <img src={image} alt="news image" className="news-image" />
          </div>
          <div className="d-flex flex-column gap-3 w-100">
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-white font-organetto m-0">
                {cardType === "release" ? title : title?.slice(0, 21)}
                {cardType !== "release" && dots}
              </div>
            </div>
          </div>
        </div>
        <p
          className="news-content font-poppins d-flex flex-column justify-content-center"
          dangerouslySetInnerHTML={{
            __html: content?.slice(0, 96) + dots,
          }}
        ></p>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img src={calendarIcon} alt="calendar" />
            <span className="news-date font-poppins">
              {date?.toLocaleDateString("en-US", options)}
            </span>
          </div>
          {cardType === "release" ? (
            newsId === releaseId ? (
              <span className="news-content font-poppins" style={{fontSize: '32px', color: '#d9fa86'}}>-</span>
            ) : (
              <span className="news-content font-poppins" style={{fontSize: '32px', color: '#d9fa86'}}>+</span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
