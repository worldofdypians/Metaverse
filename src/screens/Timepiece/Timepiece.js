import React from "react";
import './_timepiece.scss'
import timepieceBanner from "./assets/timePieceBanner.webp"
import TimepieceHero from "./TimepieceHero";
import TimePieceSticker from "./TimePieceSticker";

const TimePiece = () => {
  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
     <div className="d-flex w-100 flex-column home-main-wrapper" style={{gap: 0, backgroundSize: 'cover'}}>
        <TimepieceHero />
        <TimePieceSticker />
      </div>
    </div>
  );
};

export default TimePiece;
