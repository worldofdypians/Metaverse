import React from "react";
import emptyCawsWod from "./assets/emptycawswod.svg";

const EmptyCawsWodCard = () => {
  return (
    <div className="nft-modal-card">
      <div className="d-flex flex-column">
        <div className="empty-img-wrapper d-flex align-items-center justify-content-center p-4 w-100">
          <img src={emptyCawsWod} className="empty-image" alt="" />
        </div>
        <div className="empty-card-info p-2 w-100">
          <span className="info-text">
            Get your WoD Land & CAWS NFTs from the WoD Game Shop
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyCawsWodCard;
