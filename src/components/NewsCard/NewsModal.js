import React, { useRef, useEffect, useState } from "react";
import AnnouncementMinCard from "./AnnouncementMinCards";
import "./mainNews.scss";
import goBackArrow from "./assets/goBackArrow.svg";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import newsReddit from "./assets/newsReddit.svg";
import newsShare from "./assets/newsShare.svg";
import newsTelegram from "./assets/newsTelegram.svg";
import newsTwitter from "./assets/newsTwitter.svg";
import { NavLink } from "react-router-dom";

const NewsModal = ({
  newsId,
  bgImage,
  title,
  date,
  content,
  otherAnnouncements,
  onModalClose,
  onOtherNewsClick,
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
  }, [newsId, content, elementRef.current?.clientHeight]);

  return (
    <div className="newsModal-wrapper d-flex flex-column flex-xxl-row flex-lg-row gap-3 mb-5">
      <div className="col-xxl-7 col-lg-7 col-12 leftcol">
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
          <div className="news-bottom-wrapper mb-3 justify-content-between">
            <div className="d-flex gap-3">
              <a
                className="resp-sharing-button__link"
                href={`https://twitter.com/intent/tweet/?text=${title}&url=${`https://www.worldofdypians.com/news/${title.replace(
                  /\s/g,
                  "-"
                )}`}`}
                target="_blank"
                rel="noreferrer"
                aria-label=""
              >
                <img src={newsTwitter} alt="twitter share" />
              </a>

              <a
                className="resp-sharing-button__link"
                href={`https://reddit.com/submit/?&url=${`https://www.worldofdypians.com/news/${title.replace(
                  /\s/g,
                  "-"
                )}`}&resubmit=true&title=${title}`}
                target="_blank"
                rel="noreferrer"
                aria-label=""
              >
                <img src={newsReddit} alt="reddit share" />
              </a>

              <a
                className="resp-sharing-button__link"
                href={`https://telegram.me/share/url?url=${`https://www.worldofdypians.com/news/${title.replace(
                  /\s/g,
                  "-"
                )}&text=${title}`}`}
                target="_blank"
                rel="noreferrer"
                aria-label=""
              >
                <img src={newsTelegram} alt="telegram share" />
              </a>
              <img
                src={newsShare}
                alt="share news"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://www.worldofdypians.com/news/${title.replace(
                      /\s/g,
                      "-"
                    )}`
                  )
                }
              />
            </div>
          </div>
          <p
            className="left-col-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
      </div>
      <div className="col-xxl-5 col-lg-5 col-12">
        <div className="d-flex flex-column gap-3 px-3">
          {otherAnnouncements &&
            otherAnnouncements.length > 0 &&
            getItemsWithoutCurrentItem(newsId, otherAnnouncements)
              .slice(0, parseInt(height / 110))
              .map((item, index) => {
                return (
                  <NavLink
                    to={`/news/:news_id?${item.title.replace(/\s/g, "-")}`}
                    style={{ textDecoration: "none" }}
                  >
                    <AnnouncementMinCard
                      bgImage={item.image}
                      title={item.title}
                      content={item.content}
                      date={item.date}
                      key={index}
                      newsId={item.id}
                      onShowModalClick={onOtherNewsClick}
                    />
                  </NavLink>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
