import React from "react";
import "./_marketplace.scss";
import CawsItemCard from "../../../components/CawsItemCard/CawsItemCard";
import useWindowSize from "../../../hooks/useWindowSize";
import Slider from "react-slick";

const MarketPlace = () => {
  var settings = {
    dots: true,
    arrows: false,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const windowSize = useWindowSize();

  return (
    <div className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">Game market place</h2>
        <p className="marketplace-desc font-poppins">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
          elit ut vulputate suscipit, nisi metus gravida justo, nec placerat
          massa est sed ex.
        </p>
      </div>
      {windowSize.width > 786 ? (
        <div className="caws-grid">
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
        </div>
      ) : (
        <Slider {...settings}>
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
          <CawsItemCard />
        </Slider>
      )}
      <div className="d-flex w-100 align-items-center justify-content-center mt-5">
        <div className="linear-border" style={{ width: "fit-content" }}>
          <button className="btn filled-btn px-5">View on marketplace</button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
