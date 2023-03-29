import React from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";

const AnnouncementSideCard = ({
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
      className="d-flex flex-column gap-2 align-items-center announcement-card"
      style={{ cursor: "pointer" }}
      onClick={() => {
        onShowModalClick(newsId);
      }}
    >
      <div className="overflow-hidden w-100 side-img-wrapper">
      <img src={bgImage} className="announcement-side-img" alt="" /></div>
      <div className="d-flex flex-column gap-2 justify-content-between w-100">
        <span className="announcement-side-title font-poppins">{title?.slice(0, 35)}...</span>
        <div className="d-flex justify-content-between gap-2 align-items-center">
          <span
            className="announcement-side-content font-poppins d-flex gap-1 mb-0"
            dangerouslySetInnerHTML={{
              __html: content.slice(0, 30) + "...",
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

export default AnnouncementSideCard;
