import React, {useRef, useEffect, useState} from "react";
import AnnouncementSideCard from "./AnnouncementSideCards";
import "./mainNews.scss";
import goBackArrow from "./assets/goBackArrow.svg";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";

const NewsModal = ({
  newsId,
  bgImage,
  title,
  date,
  content,
  otherAnnouncements,
  onModalClose,
  onOtherNewsClick
}) => {
  const getItemsWithoutCurrentItem = (currentItemId, arrayOfItems) => {
    return arrayOfItems.filter((item) => item?.id !== currentItemId);
  };
  var options = { year: "numeric", month: "short", day: "numeric" };
  const elementRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (elementRef.current.clientHeight !== 0) {
      setHeight(elementRef.current.clientHeight);
    }

  }, [newsId, content,elementRef.current?.clientHeight]);


  return (
    <div className="newsModal-wrapper d-flex flex-column flex-xxl-row flex-lg-row gap-3 mb-5">
      <div className="col-xxl-7 col-lg-7 col-12">
        <div className="d-flex flex-column gap-3" ref={elementRef}>
          <div className="d-flex align-items-center gap-2 justify-content-between">
            <button
              className="btn go-back-btn d-flex align-items-center gap-2"
              onClick={onModalClose}
            >
              <img src={goBackArrow} alt="goback" />
              <span className="go-back-text">Go Back</span>
            </button>
            <span className="mainNews-date">
              <img src={calendarIcon} alt="calendar" />{" "}
              {date.toLocaleDateString("en-US", options)}
            </span>
          </div>
          <h2 className="left-col-title font-organetto text-white">{title}</h2>
          <img src={bgImage} alt="" className="left-col-image py-3" />
          <p
            className="left-col-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
      </div>
      <div className="col-xxl-4 col-lg-4 col-12">
        <div className="d-flex flex-column gap-3">
          {otherAnnouncements &&
            otherAnnouncements.length > 0 &&
            getItemsWithoutCurrentItem(newsId, otherAnnouncements).slice(0, parseInt(height / 110)).map(
              (item, index) => {
                return (
                  <AnnouncementSideCard
                    bgImage={item.image}
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    key={index}
                    newsId={item.id}
                    onShowModalClick={onOtherNewsClick}
                  />
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
