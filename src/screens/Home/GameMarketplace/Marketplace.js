import React from "react";
import "./_marketplace.scss";

import CawsItemCard from "../../../components/CawsItemCard/CawsItemCard";

const MarketPlace = () => {
  return (
    <div className="d-flex flex-column justify-content-center pt-2 text-white col-3 m-auto">
      <div>
      <h2 className="marketplace-title">Game market place</h2>
      <p className="marketplace-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, elit
        ut vulputate suscipit, nisi metus gravida justo, nec placerat massa est
        sed ex.
      </p>
      </div>
      <CawsItemCard/>
    </div>
  );
};

export default MarketPlace;
