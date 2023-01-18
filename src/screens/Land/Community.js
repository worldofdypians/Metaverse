import React, { useEffect, useState } from "react";
import communityDummy from "../../assets/newsAssets/communityDummy.png";
import ComunityNewsCard from "../../components/CommunityNewsCard/ComunityNewsCard";
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

  useEffect(() => {
    fetchNews();
  }, []);
  console.log(news);

  return (
    <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
      <h6 className="community-title font-organetto">The World of dypians <span
            className="community-title font-organetto"
            style={{ color: "#8c56ff" }}
          >
            community
          </span></h6>
      <Slider {...settings}>
       {news.map((item, index) => (
        <ComunityNewsCard key={index} date={item.date} content={item.content} link={item.link} video={item.video} image={item.image} id={item.id} />
       ))}
      </Slider>
    </div>
  );
};

export default Community;
