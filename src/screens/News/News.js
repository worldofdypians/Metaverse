import React, { useEffect, useState } from "react";
import "./_news.scss";
import NewsCard from "../../components/NewsCard/NewsCard";
import newsletterIcon from "../../assets/newsAssets/newsletterIcon.svg";
import { TextField } from "@mui/material";
import newsLetterImage from "../../assets/newsAssets/newsLetterImage.svg";
import styled from "@emotion/styled";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validateEmail from "../../hooks/validateEmail";
import modalClose from "../../assets/newsAssets/modalClose.svg";
import newsLetterModal from "../../assets/newsAssets/newsLetterModal.svg";
import OutsideClickHandler from "react-outside-click-handler";
import MainNewsCard from "../../components/NewsCard/MainNewsCard";
import AnnouncementSideCard from "../../components/NewsCard/AnnouncementSideCards";
import NewsModal from "../../components/NewsCard/NewsModal";
import Slider from "react-slick";
import { useRef } from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import useWindowSize from "../../hooks/useWindowSize";
import nextButton from "../../assets/landAssets/nextButton.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#080b2a",
    },
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#080B2A",
    fontWeight: 400,
    fontFamily: "Poppins",
  },
}));

const News = (props) => {
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

  var options = { year: "numeric", month: "short", day: "numeric" };

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
  const [allNews, setAllNews] = useState([])
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

  const { newsId, titleId } = useParams();

  const handleNewsWithParams = () => {
    if (titleId) {
      const objId = allNews.find((obj) => obj.id === newsId);

      if (objId) {
        setActiveNews(objId);
        setShowModal(true);
      }
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setError(validateEmail(email));
    if (Object.keys(validateEmail(email)).length === 0) {
      const postEmail = {
        email: email,
      };

      if (email !== "") {
        axios
          .post("https://api3.dyp.finance/api/newsletter/insert", postEmail)
          .then((result) => {
            if (result.data.status === 1) {
              setSuccess(true);
            } else {
              setSuccess(false);
              setError({ email: result.data.message });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "News";
  }, []);

  useEffect(() => {
    slider.current.innerSlider.slickGoTo(0);
  }, [releases.length])
  

  useEffect(() => {
    fetchNews();
    fetchReleases();
    fetchAllNews();
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
  }, [titleId, newsId, allNews.length]);

  // console.log(titleId)

  return (
    <>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex w-100 flex-column news-main-wrapper gap-0">
          <div
            className="row w-100 px-3 px-lg-5 mx-0 pt-5 pt-lg-0 mt-5 mt-lg-0 news-container"
            style={{ justifyContent: loadMore === true ? "center" : "end" }}
          >
            <div className="d-flex  align-items-center mb-3 mb-lg-0 align-items-lg-center justify-content-between w-100 px-0">
              <h2 className="news-header font-organetto px-0 py-3 pt-lg-5 d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
                What's{" "}
                <h2 className="mb-0 news-header" style={{ color: "#8c56ff" }}>
                  new
                </h2>
              </h2>
              <a href="#slider-row" className="sys-req">
                Patch Notes ({latestVersion})
              </a>
            </div>

            {showModal === true ? (
              <>
                <NewsModal
                  newsId={activeNews.id}
                  bgImage={activeNews.image_second}
                  title={activeNews.title}
                  date={activeNews.date}
                  content={activeNews.content}
                  onModalClose={() => {
                    setShowModal(false);
                    handleGoBack();
                  }}
                  otherAnnouncements={allNews}
                  onOtherNewsClick={handleSideAnnouncementClick}
                />
              </>
            ) : (
              <>
                {loadingMain === true ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column flex-xxl-row flex-lg-row justify-content-between align-items-center p-0 gap-3 mb-3 topnews-wrapper">
                    {announcementsNews &&
                      announcementsNews.length > 0 &&
                      announcementsNews.slice(0, 1).map((item, index) => {
                        return (
                          <NavLink
                            to={`/news/${item.id}/${item.title.replace(
                              /\s/g,
                              "-"
                            )}`}
                            className={
                              " col-xxl-7 col-lg-7 col-12 main-news-wrapper"
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <MainNewsCard
                              key={index}
                              title={item.title}
                              newsImage={item.image_second}
                              date={item.date}
                              newsId={item.id}
                              onShowModalClick={() => {
                                handlemodalClick(item.id, index);
                              }}
                              content={item.content}
                            />
                          </NavLink>
                        );
                      })}
                    <div className="announcement-side-wrapper col-xxl-5 col-lg-5 col-12">
                      {announcementsNews &&
                        announcementsNews.length > 0 &&
                        announcementsNews.slice(1, 5).map((item, index) => {
                          return (
                            <NavLink
                              to={`/news/${item.id}/${item.title.replace(
                                /\s/g,
                                "-"
                              )}`}
                              style={{ textDecoration: "none" }}
                            >
                              <AnnouncementSideCard
                                key={index}
                                title={item.title}
                                bgImage={item.image_second}
                                imageSquare={item.image}
                                date={item.date}
                                // content={item.content}
                                newsId={item.id}
                                onShowModalClick={handleSideAnnouncementClick}
                              />
                            </NavLink>
                          );
                        })}{" "}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="d-grid news-grid px-0 mt-3" ref={showAll}>
              {showModal === false &&
                loadMore === true &&
                announcementsNews &&
                announcementsNews.length > 0 &&
                announcementsNews
                  .slice(5, announcementsNews.length)
                  .map((item, index) => {
                    return (
                      <NavLink
                        to={`/news/${item.id}/${item.title.replace(
                          /\s/g,
                          "-"
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <NewsCard
                          title={item.title}
                          content={item.content}
                          image={item.image_second}
                          date={item.date}
                          newsId={item.id}
                          onNewsClick={handleSideAnnouncementClick}
                          key={index}
                          cardType={"announcement"}
                        />
                      </NavLink>
                    );
                  })}
            </div>
            {fullLenth === false &&
              showModal === false &&
              announcementsNews &&
              announcementsNews.length && (
                <div className="col-xxl-12 col-lg-12 col-12 d-flex flex-column align-items-center gap-2 mt-2 justify-content-center">
                  {loadingOther === true ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : null}
                  <button
                    className="loadmore-btn btn"
                    onClick={() => {
                      setloadMore(true);
                      fetchOtherNews();
                      showAll.current?.scrollIntoView({ block: "nearest" });
                    }}
                  >
                    More
                  </button>
                </div>
              )}
            {/* {fullLenth === true &&
              showModal === false &&
              announcementsNews &&
              announcementsNews.length && (
                <button
                  className="loadmore-btn btn my-auto mt-4"
                  onClick={() => {
                    setloadMore(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  View less
                </button>
              )} */}
          </div>
          <div
            className="row w-100  mx-0 news-container slider-row"
            id="slider-row"
          >
            <div className="d-flex flex-column flex-lg-row align-items-start gap-3 gap-lg-0 align-items-lg-center justify-content-between">
              <h2 className="news-header font-organetto px-0 py-3 pt-lg-5 d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
                Patch{" "}
                <h2 className="mb-0 news-header" style={{ color: "#8c56ff" }}>
                  Notes
                </h2>
              </h2>
                <div className="d-flex align-items-center gap-3 slider-buttons-wrapper mb-3 mb-lg-0" style={{position: 'static'}}>
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

            <Slider ref={(c) => (slider.current = c)} {...settings}>
              {releases.map((item, index) => (
                <NewsCard
                  key={index}
                  date={item.date}
                  title={item.title}
                  content={item.content}
                  link={item.link}
                  image={item.image}
                  id={item.id}
                  newsId={item.id}
                  onNewsClick={selectRelease}
                  cardType={"release"}
                  releaseId={selectedRelease?.id}
                />
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
          </div>
          {selectedRelease && (
            <div
              ref={releaseContent}
              className="selected-release news-card-active flex-column flex-xl-row gap-4 gap-lg-0 mx-3 mx-lg-5 px-2 row py-4 mt-5"
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
          <div
            className="newsletter-wrapper row mx-3 mx-lg-5 mb-5 p-3"
            style={{ marginTop: 80 }}
          >
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <img
                  src={newsletterIcon}
                  width={56}
                  height={56}
                  alt="newsletter icon"
                />
                <h3 className="newsletter-title font-organetto">
                  Subscribe to our{" "}
                  <h3 style={{ color: "#8c56ff" }}>newsletter</h3>
                </h3>
                <p className="newsletter-content">
                  Stay up-to-date with our latest news, amazing features, and
                  exciting events delivered straight to your inbox.
                </p>
                <div className="d-flex flex-column flex-lg-row align-items-start justify-content-start gap-3 gap-lg-5">
                  <div className="newsletter-input-container">
                    <ThemeProvider theme={theme}>
                      <StyledTextField
                        style={{ width: "100%" }}
                        error={error.email ? true : false}
                        label="Email Address"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={error.email}
                      />
                    </ThemeProvider>
                  </div>
                  <button
                    className="btn filled-btn px-5"
                    style={{ background: "black", color: "white" }}
                    onClick={subscribe}
                  >
                    Register
                  </button>
                </div>
                <span className="newsletter-span">
                  By submitting this form, you are consenting to receive
                  marketing emails from Dypius. You may unsubscribe at anytime.
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
              <img src={newsLetterImage} alt="newsletter" />
            </div>
          </div>
        </div>
      </div>
      {success && (
        <OutsideClickHandler onOutsideClick={() => setSuccess(false)}>
          <div className="success-modal d-flex flex-column p-3 justify-content-center align-items-center gap-4">
            <div className="d-flex w-100 justify-content-end">
              <img
                src={modalClose}
                alt="close modal"
                onClick={() => setSuccess(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img src={newsLetterModal} alt="success" />
            <h6 className="newsletter-modal-title font-poppins">Thank you</h6>
            <span className="newsletter-modal-span font-poppins">
              You’ve subscribed to World of Dypians newsletter
            </span>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default News;
