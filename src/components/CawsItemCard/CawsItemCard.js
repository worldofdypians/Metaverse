import React from "react";
import cawsImg from "../../assets/caws-img.png";
import "./_cawsitemcard.scss";

const CawsItemCard = ({ cawsID, price }) => {
  return (
    <div className="position-relative px-0">
      <div className="itemcard-wrapper">
        <img src={cawsImg} alt="" className="w-100"/>
      </div>
      <div className="purple-bottom-wrapper">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-column gap-1">
          <p className="cawsitem-title font-poppins text-uppercase m-0">caws 1234</p>
          <p className="cawsitem-details font-poppins m-0">NFT details</p>
          </div>
          <div className="d-flex justify-content-between gap-2 align-items-start">
            <p className="pricetext font-poppins m-0">Price</p>
            <div className="d-flex flex-column gap-1">
              <p className="priceamount-eth font-poppins m-0">0.08 ETH</p>
              <p className="priceamount-usd font-poppins m-0">$80.62</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsItemCard;
