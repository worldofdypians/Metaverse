import React, { memo, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { catNFT } from "../../Themes/Images";
import PropTypes from "prop-types";
import { cawsStakeContract } from "../../web3";
import staked from './staked.svg'

const Cart = ({ name, image, stakes }) => {
  const id = name?.slice(6, name.length);
  
  return (
    <div className={`${classes.container} position-relative `}>
        {stakes?.includes(id) && <img src={staked} className="staked" alt="staked"/>}

      <a
        href="https://opensea.io/collection/catsandwatchessocietycaws"
        target={"_blank"}
        rel="noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
        className={classes.placeholder}
      >
        <img src={image || catNFT} alt="cat" className={classes.cawsNFT} />
        <div className={classes.detailsWrapper}>
          <p className={classes.title}>CAWS</p>
          <p className={classes.desc}>{name}</p>
        </div>
      </a>
    </div>
  );
};

Cart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

Cart.defaultProps = {
  image: catNFT,
};

export default memo(Cart);
