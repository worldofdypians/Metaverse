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
    "media1.webp",
    "media2.webp",
    "media3.webp",
    "media4.webp",
    "media5.webp",
    "media6.webp",
    "media7.webp",
    "media8.webp",
    "media9.webp",
    "media10.webp",
    "media11.webp",
    "media12.webp",
    "media13.webp",
    "media14.webp",
    "media15.webp",
    "media16.webp",
    "media17.webp",
    "media18.webp",
    "media19.webp",
    "media20.webp",
    "media21.webp",
    "media22.webp",
  ]


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  } 


  const shuffledMedia = shuffle(mediaItems)
  
  const firstMarquee = [
    "firstMedia.webp",
    "secondMedia.webp",
    "thirdMedia.webp",
    "fourthMedia.webp",
    "fifthMedia.webp",
  ];

  const second = [
    "sixthMedia.webp",
    "seventhMedia.webp",
    "eightMedia.webp",
    "ninthMedia.webp",
    "tenthMedia.webp",
  ];

  const windowSize = useWindowSize();

  return (
    <div
      className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4"
      id="marketplace"
    >
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">
          world of dypians official media
        </h2>
        <p className="marketplace-desc font-poppins">
          The world of dypians awaits you. experience gameplay like never seen
          before.
        </p>
      </div>
      {windowSize.width > 786 ? (
        // <div className="caws-grid">
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        //   <CawsItemCard />
        // </div>
        <>
          <Marquee gradient={false} >
            {shuffledMedia.slice(0, shuffledMedia.length / 2).map((item, index) => (
             <div className="px-4">
               <img
                key={index}
                src={require(`../../../assets/mediaAssets/${item}`)}
                alt=""
              />
             </div>
            ))}
          </Marquee>
          <Marquee  gradient={false}  direction="right">
            {shuffledMedia.slice(shuffledMedia.length / 2, shuffledMedia.length).map((item, index) => (
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
  );
};

export default MarketPlace;
