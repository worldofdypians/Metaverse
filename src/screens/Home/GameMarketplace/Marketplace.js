import React from "react";
import "./_marketplace.scss";
import CawsItemCard from "../../../components/CawsItemCard/CawsItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
import marketDummy from '../../../assets/marketDummy.png'

const MarketPlace = () => {
  var settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: false,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
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

  const firstMarquee = [
    'firstMedia.webp',
    'secondMedia.webp',
    'thirdMedia.webp',
    'fourthMedia.webp',
    'fifthMedia.webp',
  ]

  const second = [
    'sixthMedia.webp',
    'seventhMedia.webp',
    'eightMedia.webp',
    'ninthMedia.webp',
    'tenthMedia.webp',
  ]

  const windowSize = useWindowSize();

  return (
    <div className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4" id="marketplace">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">world of dypians official media</h2>
        <p className="marketplace-desc font-poppins">
        The world of dypians awaits you. experience gameplay like never seen before.
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
        <Marquee gradient={false} style={{gap: '45px'}} >
         {firstMarquee.map((item, index) => (
          <img key={index} src={require(`../../../assets/mediaAssets/${item}`)} alt="" />
         ) )}
        </Marquee>
        <Marquee gradient={false} style={{gap: '45px'}} direction="right" >
        {second.map((item, index) => (
          <img key={index} src={require(`../../../assets/mediaAssets/${item}`)} alt="" />
         ) )}
        </Marquee>
       </>
      ) : (
        <Slider {...settings}>
          <CawsItemCard hero={'firstMedia.webp'}/>
          <CawsItemCard hero={'secondMedia.webp'}/>
          <CawsItemCard hero={'thirdMedia.webp'}/>
          <CawsItemCard hero={'fourthMedia.webp'}/>
          <CawsItemCard hero={'fifthMedia.webp'}/>
          <CawsItemCard hero={'seventhMedia.webp'}/>
          <CawsItemCard hero={'eightMedia.webp'}/>
          <CawsItemCard hero={'ninthMedia.webp'}/>
          <CawsItemCard hero={'tenthMedia.webp'}/>

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
