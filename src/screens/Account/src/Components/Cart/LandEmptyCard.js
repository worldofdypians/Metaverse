import React from "react";
import LandPlaceholder from "./landplaceholder.svg";
import classes from "./Cart.module.css";

const LandEmptyCard = () => {
  return (
    <div className={classes.container}>
        <img src={LandPlaceholder} alt="cat" className={classes.landNft} />
        <div className={classes.detailsWrapper}>
          <p className={classes.placeholder}>
            Get your World of Dypians Land NFT.
          </p>
        </div>
    </div>
  );
};

export default LandEmptyCard;
