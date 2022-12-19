import React from "react";
import cawsImg from "../../assets/caws-img.png";
import "./_cawsitemcard.scss";

const CawsItemCard = ({ cawsID, price }) => {
  return (
    <div className="position-relative">
      <div className="itemcard-wrapper">
        <img src={cawsImg} alt="" className="w-100"/>
      </div>
      <div className="purple-bottom-wrapper">
        <div className="d-flex flex-column gap-1">
          <p className="cawsitem-title m-0">caws 1234</p>
          <p className="cawsitem-title m-0">NFT details</p>
          <div className="d-flex justify-content-between gap-2 align-items-center">
            <p className="pricetext m-0">Price</p>
            <div className="d-flex flex-column gap-1">
              <p className="priceamount-eth m-0">0.08 ETH</p>
              <p className="priceamount-usd m-0">$80.62</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsItemCard;
