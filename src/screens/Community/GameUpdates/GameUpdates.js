import React, { useEffect, useRef, useState } from "react";
import "./_gameupdates.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "react-slick";
import NewsCard from "../../../components/NewsCard/NewsCard";
import nextButton from "../../../assets/landAssets/nextButton.svg";
import calendarIcon from "../../../assets/newsAssets/calendarIcon.svg";

const GameUpdates = () => {
  const [announcementsNews, setAnnouncementsNews] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState();
  const [releases, setReleases] = useState([]);
  const [latestVersion, setLatestVersion] = useState();
  const releaseContent = useRef();

  const slider = useRef();

  var options = { year: "numeric", month: "long", day: "numeric" };

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    dotsClass: "button__bar slick-dots w-100",
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          initialSlide: 0,
          dots: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: false,

          initialSlide: 0,
        },
      },
    ],
  };

  const fetchReleases = async () => {
    const newReleases = await axios
      .get("https://api3.dyp.finance/api/wod_releases")
      .then((res) => {
        return res.data;
      });

    const datedReleasedNews = newReleases.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    setReleases(datedReleasedNews);
    setLatestVersion(datedReleasedNews[0]?.version);
  };

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  const selectRelease = (id) => {
    if (id === selectedRelease?.id) {
      setSelectedRelease(null);
    } else {
      const firstIndex = releases.filter((item) => item.id === id);
      setSelectedRelease(firstIndex[0]);
    }
  };

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

  const windowSize = useWindowSize();

  useEffect(() => {
    fetchReleases();
    fetchNews();
  }, []);

  useEffect(() => {
    if (selectedRelease) {
      releaseContent.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [selectedRelease]);

  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-5">
      <div className="d-flex w-100 flex-column align-items-center justify-content-center mt-5 py-4 game-updates-title-wrapper">
        <h2 className="font-montserrat builders-title explorer-grid-title px-0 mb-0">
          UPDATES, STORIES AND ANNOUNCEMENTS FROM
        </h2>
        <h2
          className="font-montserrat builders-title explorer-grid-title px-0"
          style={{ color: "#8C56FF" }}
        >
          WORLD OF DYPIANS
        </h2>
      </div>
      <div className="custom-container mt-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            {announcementsNews &&
              announcementsNews.length > 0 &&
              announcementsNews.slice(0, 1).map((item, index) => {
                return (
                  <div
                    style={{ textDecoration: "none" }}
                    className="d-flex flex-column gap-2"
                  >
                    <NavLink
                      className="game-update-card position-relative"
                      style={{ height: "420px" }}
                      to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                    >
                      <img
                        src={item.image}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt=""
                      />
                    </NavLink>
                    <h6 className="game-update-title mb-0">{item.title}</h6>
                    <span
                      className="announcement-side-content font-montserrat gap-1 mb-0"
                      dangerouslySetInnerHTML={{
                        __html: item.content.slice(
                          0,
                          windowSize.width > 786 ? 430 : 215
                        ),
                      }}
                    ></span>
                    <hr className="update-divider mt-0 mb-2" />
                    <span className="announcement-side-content font-montserrat gap-1 mb-0">
                      {item.date.toLocaleDateString("en-US", options)}
                    </span>
                  </div>
                );
              })}{" "}
          </div>
          <div className="col-12 col-lg-6">
            <div className="announcement-side-wrapper col-12">
              {announcementsNews &&
                announcementsNews.length > 0 &&
                announcementsNews.slice(1, 5).map((item, index) => {
                  return (
                    <NavLink
                      to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                      style={{ textDecoration: "none" }}
                      className="d-flex flex-column gap-1"
                    >
                      <div className="game-update-card position-relative">
                        <img
                          src={item.image}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                      <span className="announcement-side-content font-montserrat gap-1 mb-0" style={{fontSize: "14px", color: "#9D9DAB"}}>
                        {item.date.toLocaleDateString("en-US", options)}
                      </span>
                      <h6 className="game-update-title mb-0">
                        {item.title.slice(0, 30) + "..."}
                      </h6>
                      <span
                        className="announcement-side-content font-montserrat gap-1 mb-0"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.content.slice(
                              0,
                              windowSize.width > 786 ? 120 : 215
                            ) + "...",
                        }}
                      ></span>
                    </NavLink>
                  );
                })}{" "}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="row w-100  mx-0 news-container">
            <div className="d-flex flex-column flex-lg-row align-items-start gap-3 gap-lg-0 align-items-lg-center justify-content-between px-0">
              <h2 className="font-montserrat builders-title explorer-grid-title px-0">
                PATCH{" "}
                <mark className="font-montserrat explore-tag pe-2">NOTES</mark>
              </h2>
              <div
                className="d-flex align-items-center gap-3 slider-buttons-wrapper mb-3 mb-lg-0"
                style={{ position: "static" }}
              >
                <img
                  src={nextButton}
                  className="prev-button"
                  width={40}
                  height={40}
                  style={{ opacity: "0.8" }}
                  alt=""
                  onClick={previous}
                />
                <img
                  src={nextButton}
                  className="next-button"
                  width={40}
                  height={40}
                  style={{ opacity: "0.8" }}
                  alt=""
                  onClick={next}
                />
              </div>
            </div>

            <Slider
              ref={(c) => (slider.current = c)}
              {...settings}
              className="px-0"
            >
              {releases.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectRelease(item.id)}
                  style={{ textDecoration: "none" }}
                >
                  <div className="game-update-card position-relative">
                    <img
                      src={item.image}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                    <div className="d-flex align-items-center justify-content-between p-3 w-100 bottom-dark-wrapper updates-text-wrapper">
                      <div className="d-flex flex-column">
                        <h6 className="events-page-title-home mb-0">
                          {item.title}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                // <NewsCard
                //   key={index}
                //   date={item.date}
                //   title={item.title}
                //   content={item.content}
                //   link={item.link}
                //   image={item.image}
                //   id={item.id}
                //   newsId={item.id}
                //   onNewsClick={selectRelease}
                //   cardType={"release"}
                //   releaseId={selectedRelease?.id}
                // />
              ))}
            </Slider>
            {windowSize.width < 786 && (
              <div className="d-flex justify-content-end mt-3">
                <div className="d-flex align-items-center gap-3 slider-buttons-wrapper mb-3 mb-lg-0">
                  <img
                    src={nextButton}
                    className="prev-button"
                    style={{ opacity: "0.8" }}
                    width={40}
                    height={40}
                    alt=""
                    onClick={previous}
                  />
                  <img
                    src={nextButton}
                    className="next-button"
                    style={{ opacity: "0.8" }}
                    width={40}
                    height={40}
                    alt=""
                    onClick={next}
                  />
                </div>
              </div>
            )}

            {selectedRelease && (
              <div
                ref={releaseContent}
                className="selected-release d-flex p-3 news-card-active flex-column flex-xl-row gap-4 gap-lg-0 px-2 py-4 mt-5"
              >
                <div className="leftside col-12 col-xl-4 d-flex flex-column gap-3 justify-content-center">
                  <img
                    src={selectedRelease.image}
                    alt=""
                    className="selected-release-image"
                  />
                </div>
                <div className="col-12 col-xl-8 rightside h-100">
                  <div className="d-flex flex-column justify-content-between gap-3 h-100">
                    <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
                      <h6 className="selected-release-title font-organetto mb-0">
                        {selectedRelease.title}
                      </h6>
                      <div className="d-flex align-items-center gap-2">
                        <img src={calendarIcon} alt="calendar" />
                        <span className="news-date font-poppins">
                          {selectedRelease.date.toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </span>
                      </div>
                    </div>
                    <p
                      className="news-content font-poppins d-flex flex-column justify-content-center"
                      dangerouslySetInnerHTML={{
                        __html: selectedRelease.content,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameUpdates;
