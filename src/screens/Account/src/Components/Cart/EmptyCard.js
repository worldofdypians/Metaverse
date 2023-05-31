import React from "react";
import CawsPlaceholder from "../../Images/caws-placeholder.png";
import classes from "./Cart.module.css";

const EmptyCard = () => {
  return (
    <div className={classes.container}>
        <img src={CawsPlaceholder} alt="cat" className={classes.cawsNFT} />
        <div className={classes.detailsWrapper}>
          <p className={classes.placeholder}>
            Get your CAWS NFT from the Opensea marketplace and use it in World
            of Dypians.
          </p>
        </div>
    </div>
  );
};

export default EmptyCard;
