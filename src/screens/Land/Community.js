import React, { useEffect, useRef, useState } from "react";
import nextButton from "../../assets/landAssets/nextButton.svg";
import ComunityNewsCard from "../../components/CommunityNewsCard/ComunityNewsCard";
import Slider from "react-slick";
import axios from "axios";
import './_community.scss'

const Community = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    dotsClass: "button__bar slick-dots w-100",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
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
        breakpoint: 1200,
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
          dots: false
        },
      },
    ],
  };

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const communityNews = await axios
      .get("https://api3.dyp.finance/api/communities")
      .then((res) => {
        return res.data;
      });

      const datedNews = communityNews.map((item) => {
        return { ...item, date: new Date(item.date) };
      });
      const sortedNews = datedNews.sort(function (a, b) {
        return b.date - a.date;
      });
      
    setNews(sortedNews)
  };

  
  const slider = useRef();

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const ref=useRef()

  // console.log(ref);
  return (
    <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5 position-relative">
      <h6 className="community-title font-organetto d-flex flex-column flex-lg-ro">The World of dypians <span
            className="community-title font-organetto"
            style={{ color: "#8c56ff" }}
          >
            community
          </span></h6>
      <Slider  ref={(c) => (slider.current = c)} {...settings}>
       {news.map((item, index) => (
        <ComunityNewsCard key={index} date={item.date} content={item.content} link={item.link} video={item.video} image={item.image} id={item.id} />
       ))}
      </Slider>
      <div className="d-flex align-items-center gap-3 slider-buttons-wrapper">
      <img src={nextButton} className="prev-button" width={40} height={40} alt="" onClick={previous} />
      <img src={nextButton} className="next-button" width={40} height={40} alt="" onClick={next} />
      </div>

    </div>
  );
};

export default Community;
