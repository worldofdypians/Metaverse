import React, { useEffect, useRef, useState } from "react";
import "./_gameupdates.scss";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "react-slick";
import NewsCard from "../../../components/NewsCard/NewsCard";
import nextButton from "../../../assets/landAssets/nextButton.svg";
import calendarIcon from "../../../assets/newsAssets/calendarIcon.svg";

const GameUpdates = () => {
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

  var options = { year: "numeric", month: "long", day: "numeric" };

  const [announcementsNews, setAnnouncementsNews] = useState([]);
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setloadMore] = useState(false);
  const [count, setCount] = useState(2);
  const [activeNews, setActiveNews] = useState([]);
  const [latestVersion, setLatestVersion] = useState();
  const slider = useRef();
  const windowSize = useWindowSize();
  const [fullLenth, setFullLenth] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [loadingOther, setLoadingOther] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const navigate = useNavigate();
  function handleGoBack() {
    navigate("/news");
  }

  const fetchNews = async () => {
    setLoadingMain(true);
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
    setLoadingMain(false);
  };
  const fetchAllNews = async () => {
    const announcements = await axios
      .get("https://api3.dyp.finance/api/wod_announcements")
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
    setAllNews(sortedAnnouncementsNews);
  };
  const fetchOtherNews = async () => {
    if (fullLenth === false) {
      setLoadingOther(true);
      const announcements = await axios
        .get(`https://api3.dyp.finance/api/wod_announcements?page=${count}`)
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
      setAnnouncementsNews((prev) => prev.concat(sortedAnnouncementsNews));
      setCount((prev) => prev + 1);
      setLoadingOther(false);
      if (sortedAnnouncementsNews.length < 4) {
        setFullLenth(true);
      }
    }
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

  const { newsId } = useParams();

  const handleNewsWithParams = () => {
    if (newsId && allNews.length > 0) {
      const objId = allNews.find((obj) => obj.id === newsId);

      if (objId) {
        setActiveNews(objId);
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "News";
  }, []);

  useEffect(() => {
    slider.current.innerSlider.slickGoTo(0);
  }, [releases.length]);

  useEffect(() => {
    fetchNews();
    fetchReleases();
    fetchAllNews();
    fetchOtherNews();
  }, [newsId]);

  const handlemodalClick = (itemId, itemIndex) => {
    setShowModal(true);
    setActiveNews(announcementsNews[itemIndex]);
  };

  const handleSideAnnouncementClick = (itemId) => {
    const objId = announcementsNews.find((obj) => obj.id === itemId);
    if (objId) {
      window.scrollTo(0, 0);
      setShowModal(true);
      setActiveNews(objId);
    }
  };

  const selectRelease = (id) => {
    if (id === selectedRelease?.id) {
      setSelectedRelease(null);
    } else {
      const firstIndex = releases.filter((item) => item.id === id);
      setSelectedRelease(firstIndex[0]);
    }
  };

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  const showAll = useRef();
  const releaseContent = useRef();

  useEffect(() => {
    if (selectedRelease) {
      releaseContent.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [selectedRelease]);

  useEffect(() => {
    handleNewsWithParams();
  }, [newsId, allNews.length]);


  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="d-flex w-100 flex-column align-items-center justify-content-center mt-5 py-4 game-updates-title-wrapper">
        <h2 className="font-montserrat main-hero-title px-0 mb-0">
          Updates, Stories and Announcements
        </h2>
      </div>
      <div className="custom-container mt-5">
        <div className="row">
          <div className="col-12 col-lg-8">
            {announcementsNews &&
              announcementsNews.length > 0 &&
              announcementsNews.slice(0, 1).map((item, index) => {
                return (
                  <NavLink
                    to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <div
                      className="game-update-card position-relative"
                      style={{ height: "600px" }}
                    >
                      <img
                        src={item.image_second}
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
                  </NavLink>
                );
              })}{" "}
          </div>
          <div className="col-12 col-lg-4">
            <div className="announcement-side-wrapper col-12">
              {announcementsNews &&
                announcementsNews.length > 0 &&
                announcementsNews.slice(1, 3).map((item, index) => {
                  return (
                    <NavLink
                      to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                      style={{ textDecoration: "none" }}
                      key={index}
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
                    </NavLink>
                  );
                })}{" "}
            </div>
          </div>
        </div>
        <div className="d-grid news-grid px-0 mt-3" ref={showAll}>
          {announcementsNews &&
            announcementsNews.length > 0 &&
            announcementsNews.slice(3, 6).map((item, index) => {
              return (
                <NavLink
                  to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                  style={{ textDecoration: "none" }}
                  key={index}
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
                </NavLink>
              );
            })}
        </div>
        <div className="d-flex flex-column w-100 mt-4">
          {announcementsNews &&
            announcementsNews.length > 0 &&
            announcementsNews
              .slice(6, announcementsNews.length)
              .map((item, index) => {
                return (
                  <NavLink
                    to={`/news/${item.id}/${item.title.replace(/\s/g, "-")}`}
                    className="other-news-item py-4 ps-3"
                    key={index}
                  >
                    <div className="d-flex flex-column flex-lg-row align-items-start gap-3">
                      <img
                        src={item.image_second}
                        height={170}
                        width={300}
                        alt=""
                      />
                      <div className="d-flex flex-column gap-3">
                        <h6 className="other-news-title mb-0">{item.title}</h6>
                        <span
                          className="announcement-side-content font-poppins gap-1 mb-0"
                          dangerouslySetInnerHTML={{
                            __html: item.content.slice(
                              0,
                              windowSize.width > 786 ? 300 : 215
                            ),
                          }}
                        ></span>
                        <span className="mainNews-date">
                          {item.date.toLocaleDateString("en-US", options)}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
        </div>
        <div className="d-flex w-100 mt-3 justify-content-center">
          <button className="action-btn" onClick={fetchOtherNews}>
            Load More
          </button>
        </div>
        <div className="mt-5">
          <div className="row w-100  mx-0 news-container">
            <div className="d-flex flex-column flex-lg-row align-items-start gap-3 gap-lg-0 align-items-lg-center justify-content-between px-0">
              <h2 className="explorer-grid-title px-0">
                Patch Notes
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
