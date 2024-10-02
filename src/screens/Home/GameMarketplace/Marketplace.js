import React, { useState } from "react";
import "./_marketplace.scss";
import CawsItemCard from "../../../components/CawsItemCard/CawsItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
import marketDummy from "../../../assets/marketDummy.png";

const MarketPlace = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide2(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const mediaItems = [
    "media1.png",
    "media2.png",
    "media3.png",
    "media4.png",
    "media5.png",
    "media6.png",
    "media7.png",
    "media8.png",
    "media9.png",
    "media10.png",
    "media11.png",
    "media12.png",
    "media13.png",
    "media14.png",
    "media15.png",
    "media16.png",
    "media17.png",
    "media18.png",
    "media19.png",
    "media20.png",
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const shuffledMedia = shuffle(mediaItems);

  const windowSize = useWindowSize();

  return (
    <div className="d-flex container-fluid justify-content-center px-3 px-lg-5" id="marketplace">
      <div className="custom-container ">
      <div className="flex-column justify-content-center text-white gap-4 mx-2">
        <div className="d-flex justify-content-center align-items-center flex-column gap-2">
          <h2 className="font-montserrat builders-title explorer-grid-title px-0">
            GAME{" "}
            <mark className="font-montserrat explore-tag pe-2">GALLERY</mark>
          </h2>
        </div>
        {windowSize.width > 786 ? (
          <>
            <Marquee gradient={false} className="mb-4">
              {shuffledMedia
                .slice(0, shuffledMedia.length / 2)
                .map((item, index) => (
                  <div className="px-4">
                    <img
                      key={index}
                      src={require(`../../../assets/mediaAssets/${item}`)}
                      alt=""
                    />
                  </div>
                ))}
            </Marquee>
            <Marquee gradient={false} direction="right">
              {shuffledMedia
                .slice(shuffledMedia.length / 2, shuffledMedia.length)
                .map((item, index) => (
                  <div className="px-4">
                    <img
                      key={index}
                      src={require(`../../../assets/mediaAssets/${item}`)}
                      alt=""
                    />
                  </div>
                ))}
            </Marquee>
          </>
        ) : (
          <Slider {...settings}>
            {shuffledMedia.slice(0, 8).map((item, index) => (
              <CawsItemCard hero={item} key={index} />
            ))}
          </Slider>
        )}
        <div className="d-flex w-100 align-items-center justify-content-center mt-5">
          {/* <div className="linear-border" style={{ width: "fit-content" }}>
          <button className="btn filled-btn px-5">View on marketplace</button>
        </div> */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MarketPlace;
