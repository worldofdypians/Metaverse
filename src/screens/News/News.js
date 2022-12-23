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

const News = () => {
  const [news, setNews] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const fetchNews = async () => {
    const announcements = await axios
      .get("https://api3.dyp.finance/api/announcements")
      .then((res) => {
        return res.data;
      });
    const newReleases = await axios
      .get("https://api3.dyp.finance/api/new_releases")
      .then((res) => {
        return res.data;
      });

    const newAnnouncements = announcements.map((item) => ({
      ...item,
      type: "announcement",
    }));
    const typeReleases = newReleases.map((item) => ({
      ...item,
      type: "new_release",
    }));
    const joinedNews = newAnnouncements.concat(typeReleases);
    const datedNews = joinedNews.map((item) => {
      return { ...item, date: new Date(item.date) };
    });
    const sortedNews = datedNews.sort(function (a, b) {
      return b.date - a.date;
    });
    setNews(sortedNews);
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
            if(result.data.status === 1){
              setSuccess(true)
            }else{
              setSuccess(false)
              setError({email: result.data.message})
            }
          })
          .catch(function (error) {
            console.error(error);
          });
       
      }
    }
  };

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex w-100 flex-column news-main-wrapper">
          <div className="row w-100 px-3 px-lg-5 mx-0 news-container">
            <h2 className="news-header font-organetto px-0 py-3 py-lg-5 d-flex align-items-center gap-2">
              What's{" "}
              <h2 className="mb-0" style={{ color: "#8c56ff" }}>
                new
              </h2>
            </h2>
            {news.length > 0 ? (
              <div className="d-grid news-grid px-0">
                {news.map((newsItem) => (
                  <NewsCard
                    type={newsItem.type}
                    title={newsItem.title}
                    content={newsItem.content}
                    image={newsItem.image}
                    date={newsItem.date}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="newsletter-wrapper row mx-3 mx-lg-5 p-3">
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
            <img src={modalClose} alt="close modal" onClick={() => setSuccess(false)} style={{cursor: 'pointer'}} />
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
