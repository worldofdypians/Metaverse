import React, { memo } from "react";
import classes from "./Cart.module.css";
import { catNFT } from "../../Themes/Images";
import PropTypes from "prop-types";
import staked from './staked.svg'

const LandCart = ({ name, image, stakes }) => {
  const id = name.slice(1, name.length);

  return (
    <div className={`${classes.container} position-relative `}>
        {stakes?.includes(id) && <img src={staked} className="staked" alt="staked"/>}

      <a
        href="https://www.worldofdypians.com/land"
        target={"_blank"}
        rel="noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
        className={classes.placeholder}
      >
        <img src={image} alt="cat" className={classes.cawsNFT} />
        <div className={classes.detailsWrapper}>
          <p className={classes.title}>{name}</p>
          <p className={classes.desc}>{name}</p>
        </div>
      </a>
    </div>
  );
};

LandCart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};


export default memo(LandCart);
