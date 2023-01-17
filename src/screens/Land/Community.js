import React, { useEffect, useState } from "react";
import communityDummy from "../../assets/newsAssets/communityDummy.png";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import halfArrow from "../../assets/newsAssets/halfArrow.svg";
import Slider from "react-slick";
import axios from "axios";

const Community = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    axios
      .get("https://api3.dyp.finance/api/communities")
      .then((res) => {
        setNews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   fetchNews()
  }, [])

  return (
    <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
      <Slider {...settings}>
        <div className="community-card d-flex flex-column gap-3 p-3">
          <img src={communityDummy} alt="" className="community-image" />
          <h6 className="community-title font-organetto">
            Metaverse Patch 12.20 notes December edition
          </h6>
          <p className="community-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo...
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src={calendarIcon} alt="calendar" width={24} height={24} />
              <span className="community-date">Sept 10, 2022</span>
            </div>
            <img src={halfArrow} alt="arrow" />
          </div>
        </div>{" "}
        <div className="community-card d-flex flex-column gap-3 p-3">
          <img src={communityDummy} alt="" className="community-image" />
          <h6 className="community-title font-organetto">
            Metaverse Patch 12.20 notes December edition
          </h6>
          <p className="community-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo...
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src={calendarIcon} alt="calendar" width={24} height={24} />
              <span className="community-date">Sept 10, 2022</span>
            </div>
            <img src={halfArrow} alt="arrow" />
          </div>
        </div>{" "}
        <div className="community-card d-flex flex-column gap-3 p-3">
          <img src={communityDummy} alt="" className="community-image" />
          <h6 className="community-title font-organetto">
            Metaverse Patch 12.20 notes December edition
          </h6>
          <p className="community-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo...
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src={calendarIcon} alt="calendar" width={24} height={24} />
              <span className="community-date">Sept 10, 2022</span>
            </div>
            <img src={halfArrow} alt="arrow" />
          </div>
        </div>{" "}
        <div className="community-card d-flex flex-column gap-3 p-3">
          <img src={communityDummy} alt="" className="community-image" />
          <h6 className="community-title font-organetto">
            Metaverse Patch 12.20 notes December edition
          </h6>
          <p className="community-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo...
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img src={calendarIcon} alt="calendar" width={24} height={24} />
              <span className="community-date">Sept 10, 2022</span>
            </div>
            <img src={halfArrow} alt="arrow" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Community;
