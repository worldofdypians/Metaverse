import React, { useState, useEffect, useRef } from "react";
import MarketCards from "../../components/MarketCards/MarketCards";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import {
  getCawsNfts,
  getWodNfts,
  getTimepieceNfts,
} from "../../actions/convertUsd";
import useWindowSize from "../../hooks/useWindowSize";

const MarketSection = ({
  coinbase,
  ethTokenData,
  dyptokenDatabnb,
  idyptokenDatabnb,
  cawsListed,
  wodListed,
  timepieceListed
}) => {
  const [activebtn, setActiveBtn] = useState("land");
  const [activeSlide, setActiveSlide] = useState(0);
  const [showFirstNext, setShowFirstNext] = useState(false);

  const windowSize = useWindowSize();
  const firstSlider = useRef();

  var settings = {
    dots: true,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 777,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const firstNext = () => {
    firstSlider.current.slickNext();
  };
  const firstPrev = () => {
    firstSlider.current.slickPrev();
  };

  const eventData = [
    // {
    //   eventTitle: "Daily Bonus",
    //   eventPrice: "",
    //   eventDesc: "Daily Bonus Event is available for all users",
    //   eventImg: "dailyBonus",
    //   state: "dailyBonus",
    //   eventId: "account",
    // },
    {
      eventTitle: "Treasure Hunt",
      eventPrice: "",
      eventDesc: "Event available for Beta Pass NFT owners",
      eventImg: "treasureHunt",
      state: "treasurehunt",
      eventId: "treasure-hunt",
    },
    {
      eventTitle: "Dragon Ruins",
      eventPrice: "150 DYP",
      eventImg: "dragon",
      state: "dragon",
      price: 150,
      eventId: "dragon-ruins",
    },
    {
      eventTitle: "Puzzle Madness",
      eventPrice: "12,600 iDYP",
      eventImg: "puzzle",
      state: "idyp",
      price: 12600,
      eventId: "puzzle-madness",
    },
    {
      eventTitle: "Golden Pass",
      eventPrice: "2,100 DYP",
      eventImg: "golden",
      state: "dyp",
      price: 2100,
      eventId: "golden-pass",
    },
    {
      eventTitle: "Critical Hit",
      eventPrice: "",
      eventDesc: "Event available for Genesis Land NFT owners",
      eventImg: "critical",
      state: "critical-hit",
      eventId: "critical-hit",
    },
  ];


  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  useEffect(() => {
    firstSlider?.current?.innerSlider?.slickGoTo(0);
  }, [activebtn]);

  useEffect(() => {
    if (wodListed.length > 0) {
      firstSlider?.current?.innerSlider?.slickGoTo(0);
    }
  }, [wodListed.length]);

  return (
    <div className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">Shop</h2>
        <p className="marketplace-desc font-poppins">
          Discover the power of NFTs for a unique digital experience
        </p>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="row m-0 d-flex align-items-center gap-2 justify-content-center">
          <div
            onClick={() => {
              setActiveBtn("land");
            }}
            className={`marketItem ${
              activebtn === "land" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Land</span>
          </div>
          <div
            onClick={() => {
              setActiveBtn("caws");
            }}
            className={`marketItem ${
              activebtn === "caws" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">CAWS</span>
          </div>
          <div
            onClick={() => {
              setActiveBtn("timepiece");
            }}
            className={`marketItem ${
              activebtn === "timepiece" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Timepiece</span>
          </div>
          {/* <div
            onClick={() => {
              setActiveBtn("events");
            }}
            className={`marketItem ${
              activebtn === "events" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Events</span>
          </div> */}
        </div>
        {windowSize.width > 1400 ? (
          <div className="marketcardwrapper">
            {activebtn === "events" &&
              eventData &&
              eventData.length > 0 &&
              eventData.map((item, index) => {
                return (
                  <NavLink
                    to={item.eventId === "account" ? `/${item.eventId}` : `/account/challenges/${item.eventId}`}
                    state={{ package: item.state }}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <MarketCards
                      activebtn={"events"}
                      eventTitle={item.eventTitle}
                      eventPrice={item.eventPrice}
                      eventImg={item.eventImg}
                      eventDesc={item?.eventDesc}
                      dyptokenDatabnb={dyptokenDatabnb}
                      idyptokenDatabnb={idyptokenDatabnb}
                      price={item.price}
                    />
                  </NavLink>
                );
              })}

            {activebtn === "land" &&
              wodListed &&
              wodListed.length > 0 &&
              wodListed.slice(0, 4).map((item, index) => {
                return (
                  <NavLink
                    to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                    state={{
                      nft: item,
                      type: item.type,
                      isOwner:
                        item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                      chain: item.chain,
                    }}
                    onClick={() => {
                      updateViewCount(item.tokenId, item.nftAddress);
                    }}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <MarketCards
                      activebtn={"land"}
                      nft={item}
                      ethTokenData={ethTokenData}
                      coinbase={coinbase}
                    />
                  </NavLink>
                );
              })}

            {activebtn === "caws" &&
              cawsListed &&
              cawsListed.length > 0 &&
              cawsListed.slice(0, 4).map((item, index) => {
                return (
                  <NavLink
                    to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                    state={{
                      nft: item,
                      type: item.type,
                      isOwner:
                        item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                      chain: item.chain,
                    }}
                    onClick={() => {
                      updateViewCount(item.tokenId, item.nftAddress);
                    }}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <MarketCards
                      activebtn={"caws"}
                      nft={item}
                      ethTokenData={ethTokenData}
                      coinbase={coinbase}
                    />
                  </NavLink>
                );
              })}
            {activebtn === "timepiece" &&
              timepieceListed &&
              timepieceListed.length > 0 &&
              timepieceListed.slice(0, 4).map((item, index) => {
                return (
                  <NavLink
                    to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                    state={{
                      nft: item,
                      type: item.type,
                      isOwner:
                        item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                      chain: item.chain,
                    }}
                    onClick={() => {
                      updateViewCount(item.tokenId, item.nftAddress);
                    }}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <MarketCards
                      activebtn={"timepiece"}
                      nft={item}
                      ethTokenData={ethTokenData}
                      coinbase={coinbase}
                    />
                  </NavLink>
                );
              })}
          </div>
        ) : (
          <div className="slider-container">
            <Slider ref={(c) => (firstSlider.current = c)} {...settings}>
              {activebtn === "events" &&
                eventData &&
                eventData.length > 0 &&
                eventData.map((item, index) => {
                  return (
                    <NavLink
                      to={`/shop/events/${item.eventId}`}
                      state={{ package: item.state }}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <MarketCards
                        activebtn={"events"}
                        eventTitle={item.eventTitle}
                        eventPrice={item.eventPrice}
                        eventImg={item.eventImg}
                        eventDesc={item?.eventDesc}
                        dyptokenDatabnb={dyptokenDatabnb}
                        idyptokenDatabnb={idyptokenDatabnb}
                        price={item.price}
                      />
                    </NavLink>
                  );
                })}

              {activebtn === "land" &&
                wodListed &&
                wodListed.length > 0 &&
                wodListed.slice(0, 4).map((item, index) => {
                  return (
                    <NavLink
                      to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                      state={{
                        nft: item,
                        type: item.type,
                        isOwner:
                          item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                        chain: item.chain,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <MarketCards
                        activebtn={"land"}
                        nft={item}
                        ethTokenData={ethTokenData}
                        coinbase={coinbase}
                      />
                    </NavLink>
                  );
                })}

              {activebtn === "caws" &&
                cawsListed &&
                cawsListed.length > 0 &&
                cawsListed.slice(0, 4).map((item, index) => {
                  return (
                    <NavLink
                      to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                      state={{
                        nft: item,
                        type: item.type,
                        isOwner:
                          item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                        chain: item.chain,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <MarketCards
                        activebtn={"caws"}
                        nft={item}
                        ethTokenData={ethTokenData}
                        coinbase={coinbase}
                      />
                    </NavLink>
                  );
                })}
              {activebtn === "timepiece" &&
                timepieceListed &&
                timepieceListed.length > 0 &&
                timepieceListed.slice(0, 4).map((item, index) => {
                  return (
                    <NavLink
                      to={`/shop/nft/${item.tokenId}/${item.nftAddress}`}
                      state={{
                        nft: item,
                        type: item.type,
                        isOwner:
                          item.buyer?.toLowerCase() === coinbase?.toLowerCase(),
                        chain: item.chain,
                      }}
                      onClick={() => {
                        updateViewCount(item.tokenId, item.nftAddress);
                      }}
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <MarketCards
                        activebtn={"timepiece"}
                        nft={item}
                        ethTokenData={ethTokenData}
                        coinbase={coinbase}
                      />
                    </NavLink>
                  );
                })}
            </Slider>
          </div>
        )}
        <NavLink
          to={
            activebtn === "events"
              ? "/account/challenges/dragon-ruins"
              : activebtn === "timepiece"
              ? "/shop/timepiece"
              : activebtn === "land"
              ? "/shop/land"
              : "/shop/caws"
          }
        >
          <div
            className="linear-border"
            style={{
              width: "fit-content",
              margin: "2rem auto auto auto",
            }}
          >
            <button className="btn filled-btn px-5">View more</button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MarketSection;
