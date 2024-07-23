import React, { useRef } from "react";
import avaxMobileBg from "./assets/avaxMobileBg.png";
import coin98MobileBg from "./assets/coin98MobileBg.png";
import baseMobileBg from "./assets/baseMobileBg.png";
import confluxMobileBg from "./assets/confluxMobileBg.png";
import skaleTreasureHunt from "./assets/skaleTreasureHunt.png";
import closePopup from "../LandPopup/closePopup.svg";
import { Link, NavLink } from "react-router-dom";
import whiteExplore from "../../screens/Account/src/Components/WalletBalance/assets/whiteExplore.svg";
import viction from "./assets/victionPopupImage.webp";
import Slider from "react-slick";
const MintPopup = ({ active, onClose, data }) => {
  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    draggable: true,
  };
  const sliderRef = useRef(null);

  return (
    <div
      className={`mint-popup ${
        active && "popup-active"
      } p-4 d-flex flex-column align-items-center justify-content-center`}
    >
      <div
        className="w-100 d-flex align-items-center mb-3 justify-content-end"
        style={{ height: 1 }}
      >
        <img
          src={closePopup}
          width={20}
          height={20}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>

      {data.title === "CoinGecko" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Live CoinGecko Beta Pass NFT
            </h6>
          </div>
          <h6 className="mint-popup-title">Candy Rewards</h6>
        </>
      ) : data.title === "SKALE" ? (
        <>
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 mb-4 mb-lg-0">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center justify-content-center">
                <div className="pulsatingDot"></div>
                <h6
                  className="mint-popup-title  mb-0"
                  style={{ color: "#18FFFF" }}
                >
                  200,000 WOD Tokens
                </h6>
              </div>
              <h6 className="mint-popup-title m-0">
                $75,000 Premium Subscriptions
              </h6>
            </div>
          </div>
        </>
      ) : data.title === "DogeCoin" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Live Giveaway
            </h6>
          </div>
          <h6 className="mint-popup-title">DogeCoin Beta Pass</h6>
        </>
      ) : data.title === "CORE" ? (
          <div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="pulsatingDot"></div>
              <h6
                className="mint-popup-title  mb-0"
                style={{ color: "#18FFFF" }}
              >
                Free Minting
              </h6>
            </div>
            <h6 className="mint-popup-title">CORE Beta Pass</h6>
            <img
              src={data.img}
              className={`mint-popup-img ${
                data.title === "Daily Bonus" && "bottom-auto-bg"
              } `}
              style={{
                maxWidth: "100%",
                height: data.title === "Daily Bonus" ? 370 : "",
              }}
              alt=""
            />
            <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
              <span className="popup-available-mint">
              Get access to the game and a unique event filled with surprises and rewards!
              </span>
            </div>
          </div>
       
      ) : data.title === "CoinMarketCap" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Live Giveaway
            </h6>
          </div>
          <h6 className="mint-popup-title">CoinMarketCap Beta Pass</h6>
        </>
      ) : data.title === "Viction" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title">Viction Beta Pass</h6>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Free Minting
            </h6>
          </div>
        </>
      ) 
      
      : data.title === "opBNB" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title">opBNB Beta Pass</h6>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Free Minting
            </h6>
          </div>
        </>
      )
      : data.title === "Daily Bonus" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            {/* <div className="pulsatingDot"></div> */}
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              {data.title}
            </h6>
          </div>
          <h6 className="mint-popup-title">{data.subTitle}</h6>
        </>
      ) : data.title === "Treasure Hunt" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              150,000 WOD Tokens & 500 Premium Subscriptions
            </h6>
          </div>
          <h6 className="mint-popup-title">Dypius Treasure Hunt</h6>
        </>
      ) : (
        <div className="d-flex align-items-center gap-2 mb-4 mb-lg-0">
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Live
            </h6>
          </div>
          <h6 className="mint-popup-title m-0"> NFT Giveaway</h6>
        </div>
      )}
      {data.title !== "CORE" && (
        <img
          src={data.img}
          className={`mint-popup-img ${
            data.title === "Daily Bonus" && "bottom-auto-bg"
          } `}
          style={{
            maxWidth: "100%",
            height: data.title === "Daily Bonus" ? 370 : "",
          }}
          alt=""
        />
      )}
      {data.title === "Daily Bonus" && (
        <div className="col-12 mb-3 row mx-0 gap-lg-0 gap-2 align-items-center justify-content-center px-2 py-1">
          <div className="col-lg-4 available-mint-bg d-flex flex-column bottom-auto-bg">
            <span className="uppertext">December 1, 2023</span>
            <span className="bottomtext">Launch Date</span>
          </div>
          <div className="col-lg-4 available-mint-bg d-flex flex-column bottom-auto-bg">
            <span className="uppertext">BNB and opBNB</span>
            <span className="bottomtext">Available Chains</span>
          </div>
          <div className="col-lg-4 available-mint-bg d-flex flex-column bottom-auto-bg">
            <span className="uppertext">6</span>
            <span className="bottomtext">Available Prizes</span>
          </div>
        </div>
      )}
      {data.title === "Treasure Hunt" ? (
        <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
          {data.title === "Treasure Hunt" && (
            <span className="popup-available-mint">
              Explore the downtown area and use your{" "}
              <img src={whiteExplore} className="white-explore" alt="" /> to
              generate rewards!
            </span>
          )}
        </div>
      ) : data.title === "DogeCoin" || data.title === "Viction" || data.title === "opBNB" ? (
        <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
          <span className="popup-available-mint">
            Get access to the game and a unique event filled with surprises and
            rewards!
          </span>
        </div>
      ) 
      : //  : data.title === "Viction" ? (
      //   <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
      //     {data.title === "Viction" && (
      //       <span className="popup-available-mint">
      //         Explore the Viction area and use your{" "}
      //         <img src={whiteExplore} className="white-explore" alt="" /> to
      //         generate rewards!
      //       </span>
      //     )}
      //   </div>
      // ) : data.title === "CORE" ? (
      //   <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
      //     {data.title === "CORE" && (
      //       <span className="popup-available-mint">
      //         Explore the CORE area and use your{" "}
      //         <img src={whiteExplore} className="white-explore" alt="" /> to
      //         generate rewards!
      //       </span>
      //     )}
      //   </div>
      // )
      data.title === "SKALE" ? (
        <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
          {data.title === "SKALE" && (
            // <span className="popup-available-mint">
            //   Explore the downtown area and use your <img src={whiteExplore} className="white-explore" alt=""/> to generate rewards!
            // </span>
            <span className="popup-available-mint">
              Participate in the BNB Chain Airdrop Alliance Program and complete
              the tasks to receive WOD tokens airdrop.
            </span>
          )}
        </div>
      ) : null}
      {
        data.title === "Treasure Hunt" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/events/treasure-hunt"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        ) : data.title === "DogeCoin" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/beta-pass/doge"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        ) : data.title === "CORE" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/mint/core"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        ) 
        : data.title === "opBNB" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/mint/opbnbchain"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        )
        : data.title === "Viction" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/mint/viction"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        ) : data.title === "SKALE" ? (
          <a
            onClick={onClose}
            href="https://dappbay.bnbchain.org/campaign/bnb-chain-airdrop-alliance-program/104-dypians-discovery-quest"
            target="_blank"
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </a>
        ) : data.title === "CoinMarketCap" ? (
          <Link
            onClick={onClose}
            to={"/marketplace/beta-pass/coinmarketcap"}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">More</button>
          </Link>
        ) : (
          <Link
            onClick={onClose}
            to={`/marketplace/events/upcoming`}
            state={{ event: data.state }}
            className="linear-border"
          >
            <button className="btn filled-btn px-4">Explore</button>
          </Link>
        )
        // (
        // <Link
        //   onClick={onClose}
        //   to={`/marketplace/beta-pass/${data.state}`}
        //   state={{ event: data.state }}
        //   className="linear-border"
        // >
        //   <button className="btn filled-btn px-4">More</button>
        // </Link>
        // )
      }
    </div>
  );
};

export default MintPopup;
