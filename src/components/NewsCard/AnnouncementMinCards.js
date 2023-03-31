import React from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";

const AnnouncementMinCard = ({
  bgImage,
  title,
  date,
  content,
  onShowModalClick,
  newsId,
}) => {
  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div
      className="d-flex flex-xxl-row flex-lg-row flex-md-row flex-sm-row flex-column gap-2 align-items-center top-rated-news"
      style={{ cursor: "pointer" }}
      onClick={() => {
        onShowModalClick(newsId);
      }}
    >
      <img src={bgImage} className="announcement-min-img" alt="" />
      <div className="d-flex flex-column gap-2 justify-content-between w-100">
        <span className="announcement-side-title font-poppins">{title}</span>
        <div className="d-flex justify-content-between gap-2 align-items-center">
          <span
            className="announcement-side-content font-poppins d-flex gap-1 mb-0"
            dangerouslySetInnerHTML={{
              __html: content.slice(0, 130) + "...",
            }}
          ></span>
          <span className="mainNews-date">
            <img src={calendarIcon} alt="calendar" />
            {date.toLocaleDateString("en-US", options)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementMinCard;