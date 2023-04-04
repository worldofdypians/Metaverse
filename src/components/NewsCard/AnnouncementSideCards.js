import React from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import useWindowSize from "../../hooks/useWindowSize";

const AnnouncementSideCard = ({
  bgImage,
  title,
  date,
  content,
  onShowModalClick,
  newsId,
  imageSquare
}) => {
  var options = { year: "numeric", month: "short", day: "numeric" };
  const windowSize = useWindowSize()

  return (
    <div
      className="d-flex flex-column gap-2 align-items-center announcement-card h-100"
      style={{ cursor: "pointer" }}
      onClick={() => {
        onShowModalClick(newsId);
      }}
    >
      <div className="overflow-hidden w-100 side-img-wrapper">
        <img src={ windowSize.width > 1725 ? bgImage : windowSize.width < 1725 && windowSize.width>600 ? imageSquare : imageSquare } className="announcement-side-img" alt="" />
      </div>
      <div className="d-flex flex-column gap-2 justify-content-between w-100">
      <span className="mainNews-date">
            <img src={calendarIcon} width={20} height={20} alt="calendar" />
            {date.toLocaleDateString("en-US", options)}
          </span>
        <span className="announcement-side-title font-poppins" style={{color: '#DBD9FF'}}>
          {/* {title?.slice(0, 35)}... */}
          {title}
        </span>
        <div
          className="d-flex gap-2 align-items-center"
          style={{ justifyContent: content ? "space-between" : "end" }}
        >
          {content && (
            <span
              className="announcement-side-content font-poppins d-flex gap-1 mb-0"
              dangerouslySetInnerHTML={{
                __html: content.slice(0, 95) + "...",
              }}
            ></span>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSideCard;
