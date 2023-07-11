import React from "react";
import PropTypes from 'prop-types'
import { Divider } from "@mui/material";
import classes from "./CurrencyList.module.css";

const CurrencyList = ({ name, price }) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.itemsContainer}>
          <p className={classes.text}>{name}</p>
          <p className={classes.text} style={{ marginRight: 80 }}>{price}</p>

        </div>
      </div>
      <Divider sx={{ color: "#080B2A", width: "75%", fontWeight: 600 }} />
    </>
  );
};

CurrencyList.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,

}

CurrencyList.defaultProps = {
}
export default CurrencyList;
