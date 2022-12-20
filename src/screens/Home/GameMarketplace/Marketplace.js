import React from "react";
import "./_marketplace.scss";

import CawsItemCard from "../../../components/CawsItemCard/CawsItemCard";

const MarketPlace = () => {
  return (
    <div className="row px-5 flex-column justify-content-center text-white gap-4">
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <h2 className="marketplace-title font-organetto w-50">
          Game market place
        </h2>
        <p className="marketplace-desc font-poppins w-50">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
          elit ut vulputate suscipit, nisi metus gravida justo, nec placerat
          massa est sed ex.
        </p>
      </div>
      <div className="caws-grid">
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
        <CawsItemCard />
      </div>
      <div className="d-flex w-100 align-items-center justify-content-center mt-5">
        <div className="linear-border" style={{ width: "fit-content" }}>
          <button className="btn filled-btn px-5">View on marketplace</button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
