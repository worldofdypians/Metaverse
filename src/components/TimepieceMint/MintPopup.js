import React from "react";
import avaxMobileBg from "./assets/avaxMobileBg.png";
import coin98MobileBg from "./assets/coin98MobileBg.png";
import baseMobileBg from "./assets/baseMobileBg.png";
import confluxMobileBg from "./assets/confluxMobileBg.png";
import closePopup from "../LandPopup/closePopup.svg";
import { Link, NavLink } from "react-router-dom";

const MintPopup = ({ active, onClose, data }) => {
  return (
    <div
      className={`mint-popup ${
        active && "popup-active"
      } p-4 d-flex flex-column align-items-center justify-content-center`}
    >
      <div className="w-100 d-flex align-items-center justify-content-end">
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
      ) : (
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center">
            <div className="pulsatingDot"></div>
            <h6 className="mint-popup-title  mb-0" style={{ color: "#18FFFF" }}>
              Live
            </h6>
          </div>
          <h6 className="mint-popup-title m-0">{data.title} Beta Pass</h6>
        </div>
      )}

      <img
        src={data.img}
        className="mint-popup-img"
        style={{ maxWidth: "100%" }}
        alt=""
      />
      <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
        <span className="popup-available-mint">
          Get access to the game and a unique event filled with surprises and
          rewards!
        </span>
      </div>
      <Link
        onClick={onClose}
        to={`/marketplace/beta-pass/${data.state}`}
        state={{ event: data.state }}
        className="linear-border"
      >
        <button className="btn filled-btn px-4">More</button>
      </Link>
    </div>
  );
};

export default MintPopup;
