import React from "react";
import ethLogo from "../../assets/eth.svg";

const NftCardSoldOut = ({ image, title, content, id }) => {
  return (
    <div className="news-card-wrapper soldout" style={{ width: "fit-content" }}>
      <div className={`news-card soldout p-3 d-flex flex-column gap-3`}>
        <div className="d-flex flex-column align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-start">
            <img
              src={`https://mint.worldofdypians.com/images/${id}.png`}
              alt="news image"
              className="nft-image"
              style={{filter: 'grayscale(0.9)'}}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column gap-0 w-100">
            <div className="update-title font-organetto m-0">{title}</div>
            <div className="news-content font-poppins d-flex flex-column justify-content-center"  style={{filter: 'grayscale(0.9)'}}>
                <span className="pricetxt">Price:</span>
                <p className="d-flex align-items-center gap-1 m-0">
                  0.95 <img src={ethLogo} alt="" className="ethlogo" />
                </p>
              </div>
          </div>
          <div className="update-title font-organetto m-0" style={{ color: '#FE005B'}}>Sold out!</div>
        </div>
       
      </div>
    </div>
  );
};

export default NftCardSoldOut;
