import React from "react";
import avaxMobileBg from "./assets/avaxMobileBg.png";
import coin98MobileBg from "./assets/coin98MobileBg.png";
import baseMobileBg from "./assets/baseMobileBg.png";
import confluxMobileBg from "./assets/confluxMobileBg.png";
import closePopup from '../LandPopup/closePopup.svg'
import { Link, NavLink } from "react-router-dom";

const MintPopup = ({active, onClose}) => {
  return (
    <div className={`mint-popup ${active && "popup-active"} p-4 d-flex flex-column align-items-center justify-content-center`}>
        <div className="w-100 d-flex align-items-center justify-content-end">
        <img src={closePopup} width={20} height={20} alt="" style={{cursor: "pointer"}} onClick={onClose} />
        </div>
      <h6 className="mint-popup-title font-organetto" style={{color: "#8C56FF"}}>Conflux</h6>
      <h6 className="mint-popup-title font-organetto">Beta Pass NFT Minting</h6>
      <p className="mint-popup-desc">
        Step into the metaverse and unlock a world of exclusive rewards in CFX
        with your Beta Pass NFT at the event hosted by Conflux Network – an
        adventure like no other awaits!
      </p>
      <img src={confluxMobileBg} className="mint-popup-img" alt="" />
        <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
        <span className="popup-available-mint">Available Free Conflux Beta Pass Minting</span>
        </div>
        <Link onClick={onClose} to={'/marketplace/mint'} state={{event: "conflux"}} className="linear-border" >
            <button className="btn filled-btn px-4">
                Mint now
            </button>
        </Link>
    </div>
  );
};

export default MintPopup;
