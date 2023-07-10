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
}) => {
  const [activebtn, setActiveBtn] = useState("land");
  const [cawsListed, setcawsListed] = useState([]);
  const [wodListed, setwodListed] = useState([]);
  const [timepieceListed, settimepieceListed] = useState([]);
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
    {
      eventTitle: "Dragon Ruins",
      eventPrice: "50 DYP",
      eventImg: "dragon",
      state: "dragon",
      price: 50,
      eventId: "dragon-ruins",
    },
    {
      eventTitle: "Puzzle Madness",
      eventPrice: "3,500 iDYP",
      eventImg: "puzzle",
      state: "idyp",
      price: 3500,
      eventId: "puzzle-madness",
    },
    {
      eventTitle: "Golden Pass",
      eventPrice: "700 DYP",
      eventImg: "golden",
      state: "dyp",
      price: 700,
      eventId: "golden-pass",
    },
    {
      eventTitle: "Critical Hit",
      eventPrice: "",
      eventImg: "critical",
      state: "criticalHit",
      eventId: "critical-hit",
    },
  ];

  const fetchCawsNfts = async () => {
    const cawsNft = await getCawsNfts();
    let cawsNft_ETH = cawsNft.filter((item) => item.payment_priceType === 0);

    setcawsListed(cawsNft_ETH);
  };

  const fetchLandNfts = async () => {
    const wodNft = await getWodNfts();
    let wodNft_ETH = wodNft.filter((item) => item.payment_priceType === 0);

    setwodListed(wodNft_ETH);
  };

  const fetchTimepieceNfts = async () => {
    const timepieceNft = await getTimepieceNfts();
    let timepieceNft_ETH = timepieceNft.filter(
      (item) => item.payment_priceType === 0
    );

    settimepieceListed(timepieceNft_ETH);
  };

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
    fetchCawsNfts();
    fetchLandNfts();
    fetchTimepieceNfts();
  }, [activebtn]);

  return (
    <div className="row px-3 px-lg-5 flex-column justify-content-center text-white gap-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto">Marketplace</h2>
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
          <div
            onClick={() => {
              setActiveBtn("events");
            }}
            className={`marketItem ${
              activebtn === "events" && "marketItemActive"
            } text-white d-flex align-items-center justify-content-center`}
          >
            <span className="marketItemText">Events</span>
          </div>
        </div>
        {windowSize.width > 777 ? (
          <div className="marketcardwrapper">
            {activebtn === "events" &&
              eventData &&
              eventData.length > 0 &&
              eventData.slice(0, 4).map((item, index) => {
                return (
                  <NavLink
                    to={`/marketplace/events/${item.eventId}`}
                    state={{ package: item.state }}
                    style={{ textDecoration: "none" }}
                  >
                    <MarketCards
                      activebtn={"events"}
                      key={index}
                      eventTitle={item.eventTitle}
                      eventPrice={item.eventPrice}
                      eventImg={item.eventImg}
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
                    to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                  >
                    <MarketCards
                      activebtn={"land"}
                      key={index}
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
                    to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                  >
                    <MarketCards
                      activebtn={"caws"}
                      key={index}
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
                    to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                  >
                    <MarketCards
                      activebtn={"timepiece"}
                      key={index}
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
                      to={`/marketplace/events/${item.eventId}`}
                      state={{ package: item.state }}
                      style={{ textDecoration: "none" }}
                    >
                      <MarketCards
                        activebtn={"events"}
                        key={index}
                        eventTitle={item.eventTitle}
                        eventPrice={item.eventPrice}
                        eventImg={item.eventImg}
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
                wodListed.map((item, index) => {
                  return (
                    <NavLink
                      to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                    >
                      <MarketCards
                        activebtn={"land"}
                        key={index}
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
                cawsListed.map((item, index) => {
                  return (
                    <NavLink
                      to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                    >
                      <MarketCards
                        activebtn={"caws"}
                        key={index}
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
                timepieceListed.map((item, index) => {
                  return (
                    <NavLink
                      to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
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
                    >
                      <MarketCards
                        activebtn={"timepiece"}
                        key={index}
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
              ? "/marketplace/events/dragon-ruins"
              : activebtn === "timepiece"
              ? "/marketplace/timepiece"
              : activebtn === "land"
              ? "/marketplace/land"
              : "/marketplace/caws"
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
