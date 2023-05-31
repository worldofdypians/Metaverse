import React, { memo } from "react";
import classes from "./Cart.module.css";
import { catNFT } from "../../Themes/Images";
import PropTypes from 'prop-types'

const Cart = ({ name, image }) => {
  return (
    <div className={classes.container}>
      <img src={image || catNFT} alt="cat" width='100%' height='250px' />
      <div className={classes.detailsWrapper}>
        <p className={classes.title}>{name}</p>
        <p className={classes.desc}> NFT Details</p>
      </div>
    </div>
  );
};

Cart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,

}

Cart.defaultProps = {
  image: catNFT
}


export default memo(Cart);
