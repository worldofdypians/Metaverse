import React from "react";
import "./_mynfts.scss";

const MyNFTs = () => {
  return (
    <div className="container-nft pe-xxl-5 pe-lg-5 position-relative">
      <div className="main-wrapper py-4 w-100 mt-5 mt-xxl-0 mt-lg-0">
        <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
          <h5 className="bal-txt px-4 text-white">My NFTs</h5>
        </div>
      </div>
    </div>
  );
};

export default MyNFTs;
