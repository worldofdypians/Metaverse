import React from 'react'
import './_liveevents.scss'
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

const LiveEvents = () => {

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar",
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => setActiveSlide(next),
    // afterChange: (current) => setActiveSlide2(current),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 750,
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

  const events = [
    {
      name: "Treasure Hunt",
      image: "treasureHunt.png",
      id: "treasure-hunt",
    },
    {
      name: "Daily Bonus",
      image: "dailyBonus.png",
      id: "daily-bonus",
    },
    {
      name: "Dragon Ruins",
      image: "dragonRuins.png",
      id: "dragon-ruins",
    },
    {
      name: "Puzzle Madness",
      image: "puzzleMadness.png",
      id: "puzzle-madness",
    },
    {
      name: "Golden Pass",
      image: "goldenPass.png",
      id: "golden-pass",
    },
    {
      name: "Critical Hit",
      image: "criticalHit.png",
      id: "critical-hit",
    },
  ]

  return (
    <div className='px-3 px-lg-5 d-flex flex-column justify-content-center align-items-center  ' id='liveEvents'>
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <h2 className="font-organetto explorer-grid-title px-0">
          Live{" "}
          <mark className="font-organetto explore-tag">Events</mark>
        </h2>
        <span className="marketplace-desc">Experience the thrill of live game events</span>
        </div>
        <div className="live-events-container mt-4">
          <Slider {...settings}>
            {events.map((item, index) => (
              <NavLink to={`/marketplace/events/${item.id}`} className="live-event-card p-3 d-flex flex-column align-items-center justify-content-center gap-3">
              <img src={require(`./assets/${item.image}`)} className='w-100' alt="" />
              <h6 className="live-event-card-title mb-0">{item.name}</h6>
             </NavLink>
            ))}
          </Slider>
        </div>
    </div>
  )
}

export default LiveEvents